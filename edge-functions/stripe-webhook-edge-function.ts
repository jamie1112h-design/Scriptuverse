// Scriptuverse -- Stripe Subscription Webhook
// Supabase Edge Function: stripe-webhook
// Project: l3v3l-scriptuverse (xvlqixdhxvsjcowjmxyl)
// Deploy to: Supabase dashboard -> Edge Functions -> New Function -> name: stripe-webhook
//
// REWRITTEN 2026-07-08 to clone HM's actual validated architecture
// (hm-stripe-webhook, HMBDL Decision 25/26, BIS v1.7 Section 3/6.3) rather
// than the dynamic-Checkout-Session design this file originally shipped
// with earlier today. Real differences from that first draft, and why:
//
//   1. NO Stripe npm SDK. HM's webhook verifies the signature by hand with
//      Web Crypto (HMAC-SHA256), and BIS v1.5's own known-failure-mode
//      entry confirms this exact approach as the validated fix for this
//      platform. Cloned directly rather than re-derived.
//   2. Looked up by client_reference_id, not a pre-created Stripe customer.
//      There is no checkout-session-creation Edge Function anymore --
//      Scriptuverse now uses a static Stripe Payment Link (same pattern as
//      HM's buy.stripe.com/9B66... and BM's buy.stripe.com/dRm6...), with
//      the front door appending ?client_reference_id=<supabase_user_id> to
//      that link directly. This IS the validated pattern (Sitrep v1.18,
//      Service 6 open item: "Create Scriptuverse Stripe product at
//      $9.99/month, clone HM trial flow").
//   3. Registered directly in the Stripe Dashboard against
//      checkout.session.completed (and here, additionally,
//      customer.subscription.updated/deleted for de-provisioning), per
//      BIS v1.5's own corrected architecture note: Stripe calls this
//      function server-to-server on payment completion -- there is no
//      browser-side "thankyou.html calls the webhook" step, and there
//      never should be.
//
// One deliberate departure from HM's own code, stated plainly rather than
// left implicit: this function uses the supabase-js client (createClient)
// for the profile read/write rather than HM's raw REST fetch() calls --
// that's Scriptuverse's own already-established convention (see
// counsel-edge-function.ts), not a functional difference from HM's
// pattern. The signature-verification method and the Payment-Link /
// client_reference_id mechanism are what's actually being cloned here;
// how the DB write is expressed is incidental style.
//
// No Resend confirmation email is sent here, unlike hm-stripe-webhook.
// Per Sitrep v1.18 (Service 6), Scriptuverse's Resend routing is not yet
// configured -- adding an email step now would silently fail. Flagged as
// a fast-follow once RESEND_API_KEY / a verified Scriptuverse sending
// domain exist, not omitted by oversight.
//
// ── REQUIRED SETUP ──────────────────────────────────────────────────────
// Supabase secrets for this function (Edge Functions -> stripe-webhook ->
// Secrets), in addition to the auto-injected SUPABASE_* ones:
//   STRIPE_WEBHOOK_SECRET  -- from the Stripe Dashboard endpoint below
//
// IMPORTANT, confirmed as a real, twice-hit failure mode on this platform
// (BIS v1.7 Section 5, items 4 and the BM Sitrep entry): SUPABASE_SERVICE_ROLE_KEY
// must be the LEGACY eyJ... JWT-format key (Supabase Settings -> API ->
// Legacy API keys), NOT the new sb_secret_... key. The new-style key is
// rejected by PostgREST (/rest/v1/), which is what the supabase-js client
// calls under the hood -- confirmed as the root cause of three consecutive
// "Insert failed: Invalid API key" errors on BM's build. Check this before
// assuming a deploy failure is something else.
//
// JWT verification must be OFF for this function (Settings -> this
// function -> "Enforce JWT Verification" toggled off) -- Stripe's own
// signature, verified below, is what authenticates the caller, the same
// deliberate exception noted in this file's prior draft.
//
// Stripe Dashboard setup:
//   1. Create the Scriptuverse Payment Link first (Product "Scriptuverse",
//      $9.99/month recurring price -> "Create payment link"). Copy the
//      resulting buy.stripe.com/... URL into the front door (see
//      scriptuverse-front-door-shell.html's STRIPE_PAYMENT_LINK constant).
//   2. Set that Payment Link's "After payment" setting to redirect to
//      wherever the front door is actually live, with ?checkout=success
//      appended (e.g. https://scriptuverse.com/scriptuverse-front-door-shell.html?checkout=success)
//      rather than Stripe's default hosted confirmation page.
//   3. Developers -> Webhooks -> Add endpoint:
//      URL: https://xvlqixdhxvsjcowjmxyl.supabase.co/functions/v1/stripe-webhook
//      Events: checkout.session.completed, customer.subscription.updated,
//              customer.subscription.deleted
//      Copy the endpoint's signing secret into STRIPE_WEBHOOK_SECRET.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "Content-Type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── Stripe signature verification -- cloned from hm-stripe-webhook.ts
// verbatim in approach (HMAC-SHA256 over "{timestamp}.{payload}"), not
// re-derived. This is the exact fix BIS v1.5 names for this platform. ──
async function verifyStripeSignature(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  const parts = sigHeader.split(",").reduce((acc: Record<string, string>, part) => {
    const [k, v] = part.split("=");
    acc[k] = v;
    return acc;
  }, {});

  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const expected = Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return expected === signature;
}

async function setStatusByCustomerId(customerId: string, fields: Record<string, unknown>) {
  const { error } = await supabaseAdmin
    .from("scriptuverse_profiles")
    .update(fields)
    .eq("stripe_customer_id", customerId);
  if (error) {
    console.error("[stripe-webhook] profile update by customer_id failed:", customerId, error.message);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }

  try {
    const rawBody = await req.text();
    const sigHeader = req.headers.get("stripe-signature") ?? "";

    if (STRIPE_WEBHOOK_SECRET) {
      const valid = await verifyStripeSignature(rawBody, sigHeader, STRIPE_WEBHOOK_SECRET);
      if (!valid) {
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401, headers: { ...CORS, "Content-Type": "application/json" },
        });
      }
    }

    const event = JSON.parse(rawBody);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        // client_reference_id is the Supabase user id -- set by the front
        // door when it appends ?client_reference_id=<user.id> to the
        // static Payment Link, exactly mirroring how HM appends its trial
        // token to buy.stripe.com/9B66... .
        const userId = session.client_reference_id;
        const customerId = session.customer as string;
        const subscriptionId = typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id ?? null;

        if (!userId) {
          console.error("[stripe-webhook] checkout.session.completed with no client_reference_id -- cannot link to a profile.");
          break;
        }

        const { error } = await supabaseAdmin
          .from("scriptuverse_profiles")
          .update({
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            subscription_status: "active",
          })
          .eq("id", userId);
        if (error) {
          console.error("[stripe-webhook] profile update by user id failed:", userId, error.message);
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object;
        const status = sub.status === "active" ? "active" : sub.status;
        await setStatusByCustomerId(sub.customer as string, {
          subscription_status: status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        });
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        await setStatusByCustomerId(sub.customer as string, {
          subscription_status: "canceled",
        });
        break;
      }

      default:
        console.log("[stripe-webhook] unhandled event type:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[stripe-webhook] handler error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
