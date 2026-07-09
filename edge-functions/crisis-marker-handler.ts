// crisis-marker-handler.ts
//
// Scriptuverse Crisis-Triage Marker Handling
// Implements ScriptBDL Decisions 52, 53, 54.
//
// This module is a focused addition layer, not a full Edge Function rewrite.
// It does NOT assume the exact shape of Scriptuverse's instrument handler code,
// since that code has not been supplied or confirmed against this build session
// (the most recent Human Mastery Edge Function pattern -- the [GENERATE_LAYER2]
// / [GENERATE_BRIEF] trigger-phrase branching referenced in Specification
// Section 9.3 -- lives in a version of HMBDL not available in this session).
//
// Wire this in at the single point where a Scriptuverse instrument's Edge
// Function receives the model's text response, right before that response is
// returned to the client. See "INTEGRATION POINT" below for the one-line call.
//
// Locked content this module implements -- do not alter without a new
// ScriptBDL decision:
//   - Decision 54: the exact marker string is "[[SV_CRISIS]]", expected as the
//     first line of the model's reply when the trained crisis-response
//     behavior is engaged.
//   - Decision 53: on detection, the database write captures ONLY a boolean
//     fact, a timestamp, a pseudonymous session/user identifier, and the
//     instrument name. Never the person's words. Never the model's reply
//     text. No risk-category taxonomy.
//   - Decision 52: the trigger for logging is the marker's presence alone --
//     no secondary classification step is added on top of the model's own
//     judgment.

import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * The literal marker string, locked under Decision 54. This is intentionally
 * a constant, not a configurable value -- the system prompt and this parser
 * must always agree on the exact string.
 */
const CRISIS_MARKER = "[[SV_CRISIS]]";

/**
 * Table name for the crisis-event log. Per Decision 53, this table's columns
 * must remain limited to exactly what is specified below -- adding a
 * transcript, reply-text, or risk-category column would violate the locked
 * data-minimization decision and should not be done without a new decision
 * superseding it.
 *
 * Suggested schema (run once per Supabase project, not part of this file):
 *
 *   create table scriptuverse_crisis_events (
 *     id uuid primary key default gen_random_uuid(),
 *     occurred_at timestamptz not null default now(),
 *     session_id text not null,        -- pseudonymous, not the person's name/email
 *     instrument text not null         -- 'counsel' | 'refuge' | 'reflection' | 'study'
 *   );
 *
 * No other columns. No foreign key to a content or message table. This is a
 * deliberate, locked design choice (Decision 53) -- resist the urge to "just
 * add one more field for debugging," since that is exactly the scope creep
 * Decision 53's rejection of paraphrase-capture and reply-capture was meant
 * to prevent.
 */
const CRISIS_EVENTS_TABLE = "scriptuverse_crisis_events";

// ---------------------------------------------------------------------------
// Core marker handling
// ---------------------------------------------------------------------------

export interface CrisisMarkerResult {
  /** The model's reply with the marker line removed, if present. Always safe
   *  to send to the client -- the person must never see the raw marker. */
  cleanedReply: string;
  /** True if the marker was detected on this response. */
  crisisDetected: boolean;
}

/**
 * RESIDUAL RISK, NAMED EXPLICITLY (not closed by this module, and not
 * closeable by parser logic alone): this function only ever inspects the
 * MODEL's reply text -- it is never called against the person's own input.
 * A person typing the literal string "[[SV_CRISIS]]" into a Layer 1 or
 * Layer 2 answer cannot trigger this function directly. The real residual
 * risk is prompt injection: a person attempting to manipulate the model
 * into emitting the marker string verbatim without genuinely engaging its
 * trained crisis-response behavior (for example, asking the model to begin
 * its next reply with that exact text). This parser cannot distinguish
 * "the model genuinely engaged trained crisis behavior" from "the model was
 * manipulated into emitting the string" -- that distinction, if it matters,
 * has to be addressed at the model-behavior level (how robust Claude's own
 * trained behavior is against this kind of injection), not at this parsing
 * layer. This is named here so it is not mistaken for something this module
 * already handles.
 */

/**
 * Detects and strips the Decision 54 crisis marker from a model response.
 *
 * Per Decision 54's own text, the marker is expected "on its own line" at
 * the start of the reply, followed by the model's natural continuing
 * response. This function is deliberately tolerant of minor whitespace
 * variation (leading/trailing spaces around the marker line, an optional
 * blank line immediately after it) since model output formatting can vary
 * slightly between calls even with the instruction held constant -- but it
 * does NOT do fuzzy or partial matching on the marker string itself. The
 * marker must appear as an exact, literal match. A near-miss (extra
 * characters inside the brackets, a typo) is treated as the marker being
 * ABSENT, not as a crisis event with imperfect formatting -- this is a
 * conservative choice that favors not silently logging the wrong thing over
 * favoring catching every possible malformed output. If false negatives
 * here become a real concern in practice, that is a signal to tighten the
 * system-prompt instruction itself, not to loosen this parser's matching.
 *
 * CONFIRMED LIMITATION (found via test-crisis-marker.js, not hypothetical):
 * a malformed marker -- the model emitting "[[SV_CRISIS]" with a missing
 * bracket, or any near-miss variant -- is correctly treated as "no marker
 * present" by this conservative design, but that also means the malformed
 * string itself is NOT stripped and will appear as visible, confusing text
 * in the person's reply, AND no crisis event will be logged for that turn.
 * This is a real, demonstrated edge case, not a theoretical one. It is an
 * acceptable tradeoff given Decision 51's reliance on Claude's own trained
 * behavior (a malformed marker is vanishingly unlikely if the system prompt
 * text is inserted correctly and unmodified), but it should be watched for
 * in early production logs -- if malformed-marker leakage is ever observed
 * in practice, that is a signal to investigate the system prompt's exact
 * wording at the deployed Edge Function, not to weaken this parser's exact-
 * match requirement to compensate.
 */
export function processCrisisMarker(rawReply: string): CrisisMarkerResult {
  const lines = rawReply.split("\n");
  const firstNonEmptyIndex = lines.findIndex((line) => line.trim().length > 0);

  if (firstNonEmptyIndex === -1) {
    // Empty or whitespace-only reply -- nothing to detect, nothing to strip.
    return { cleanedReply: rawReply, crisisDetected: false };
  }

  const firstLine = lines[firstNonEmptyIndex].trim();

  if (firstLine !== CRISIS_MARKER) {
    return { cleanedReply: rawReply, crisisDetected: false };
  }
  // Marker found. Remove that line (and a single immediately-following blank
  // line, if present, so the cleaned reply doesn't start with stray
  // whitespace) and return the remainder as the cleaned reply.
  let remainder = lines.slice(firstNonEmptyIndex + 1);
  if (remainder.length > 0 && remainder[0].trim() === "") {
    remainder = remainder.slice(1);
  }

  return {
    cleanedReply: remainder.join("\n"),
    crisisDetected: true,
  };
}

// ---------------------------------------------------------------------------
// Database write (Decision 53)
// ---------------------------------------------------------------------------

/**
 * Fires the Decision 53 database write. Captures only the fact, a
 * timestamp (handled by the table's default), a pseudonymous session
 * identifier, and the instrument name.
 *
 * This function intentionally takes only `sessionId` and `instrument` as
 * parameters -- it has no parameter for message content, reply text, or
 * any severity/category value, by design. If a future caller needs to pass
 * additional context, that is a signal to raise a new ScriptBDL decision
 * first, not to extend this function's signature unilaterally.
 *
 * Failure handling: per the safety stakes here, a failed write should not
 * silently disappear, but it also must not block or delay the reply
 * actually reaching the person -- Decision 48 (stay present, do not exit
 * the conversation) takes priority over logging completing successfully.
 * This function is written to be called without `await`-blocking the
 * response path; see INTEGRATION POINT below.
 */
export async function logCrisisEvent(
  supabase: SupabaseClient,
  sessionId: string,
  instrument: "counsel" | "refuge" | "reflection" | "study",
): Promise<void> {
  const { error } = await supabase.from(CRISIS_EVENTS_TABLE).insert({
    session_id: sessionId,
    instrument: instrument,
  });

  if (error) {
    // Logged server-side only, for operational visibility. Never surfaced
    // to the client, and never causes the reply to the person to fail or
    // delay -- see INTEGRATION POINT for why this is fire-and-forget.
    console.error(
      `[scriptuverse-crisis-log] Failed to write crisis event for session ${sessionId} (${instrument}):`,
      error.message,
    );
  }
}

// ---------------------------------------------------------------------------
// INTEGRATION POINT (verified against personal_support_edge_function_index.ts,
// the real, deployed Human Mastery Personal Support Edge Function -- retrieved
// 2026-06-20; integration shape confirmed as Shape B per Decision 72)
// ---------------------------------------------------------------------------
//
// HISTORY, kept for context: an earlier version of this file presented two
// open integration shapes (Shape A, mirroring HM's client-passed-token
// pattern; Shape B, server-side session lookup) and left the choice between
// them open for Jamie. Decision 72 confirms Shape B. The build-time and cost
// concerns that might have favored Shape A were tested directly against
// Jamie's two explicit conditions (no weeks/months-scale build expansion; no
// cost expansion threatening venture profitability) and cleared by a wide
// margin -- Supabase Auth's magic-link mode is a built-in feature of the
// Supabase plan already running for this portfolio, not a new system, and
// most of its pieces are smaller variations on infrastructure HM's free-trial
// system (Decision 25) already proves out in production.
//
// REAL, MATERIAL DEPARTURE FROM HM'S PATTERN, STATED PLAINLY: HM's Edge
// Functions all run with JWT verification turned OFF (confirmed directly in
// HMBDL v6's Decision 24 status column: "JWT off" against every live
// instrument). Scriptuverse's Edge Functions turn JWT verification ON. This
// is the whole mechanism Shape B relies on -- with verification on, Supabase
// validates the caller's session JWT before the function body ever runs, and
// the authenticated user's identity is available to the handler without any
// custom token-table lookup. This is a deliberate, confirmed departure
// (Decision 72), not a default to leave as-is out of habit when copying the
// HM pattern forward.
//
// Example integration, shown as a diff against the real personal-support
// pattern's handler shape:
//
//   import { processCrisisMarker, logCrisisEvent } from "../_shared/crisis-marker-handler.ts";
//   import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
//
//   // Service-role client for the crisis-event write itself (Decision 53) --
//   // this still uses the service role key, same as before, since the write
//   // is a server-side action regardless of how the caller was authenticated.
//   const supabaseAdmin = createClient(
//     Deno.env.get("SUPABASE_URL")!,
//     Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
//   );
//
//   Deno.serve(async (req) => {
//     if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
//
//     try {
//       // With JWT verification ON, Supabase has already validated the
//       // request's Authorization header before this code runs. The
//       // caller's identity is read from that header here, NOT passed as a
//       // request-body field the way Shape A would have done it -- there is
//       // no `sessionToken` field in the JSON body under Shape B.
//       const authHeader = req.headers.get("Authorization");
//       const callerClient = createClient(
//         Deno.env.get("SUPABASE_URL")!,
//         Deno.env.get("SUPABASE_ANON_KEY")!,
//         { global: { headers: { Authorization: authHeader ?? "" } } },
//       );
//       const { data: { user } } = await callerClient.auth.getUser();
//       // `user.id` is the pseudonymous, platform-issued identifier -- this
//       // is what gets passed to logCrisisEvent below, never the person's
//       // email or any other directly identifying value, consistent with
//       // Decision 53's pseudonymity requirement.
//
//       const { messages, max_tokens } = await req.json();
//       // Note: no `sessionToken` in the body under Shape B -- only
//       // `messages` and `max_tokens` remain, identical in shape to the
//       // real personal-support function's own request body, since identity
//       // now travels via the Authorization header instead.
//
//       const response = await client.messages.create({
//         model: "claude-sonnet-4-20250514", // match whatever model string
//                                             // Scriptuverse's own build
//                                             // uses -- a separate open
//                                             // item, not resolved by
//                                             // Decision 72 (see note 5
//                                             // below)
//         max_tokens: max_tokens || 4000,
//         system: SYSTEM_PROMPT,              // Scriptuverse's Counsel system
//                                             // prompt, carrying the Decision
//                                             // 54 crisis-deference addition
//         messages: messages,
//       });
//
//       // The real Anthropic SDK response shape: response.content is an
//       // array of content blocks. For a typical text-only reply this is
//       // response.content[0].text -- confirmed against the live
//       // personal-support function, which returns this object unmodified.
//       // Scriptuverse's Edge Function extracts the text here, unlike
//       // personal-support's own code, which passes the whole response
//       // object back to the client raw and lets the frontend pull
//       // .content[0].text out client-side. Scriptuverse must process the
//       // marker SERVER-SIDE instead, since the whole point of Decision 54's
//       // marker scheme is that the raw marker must never reach client-side
//       // code at all -- if the client received the raw Anthropic response
//       // object the way personal-support's frontend currently does, the
//       // marker would be visible in browser devtools / network tab even if
//       // the rendered UI doesn't display it. This is a real, necessary
//       // divergence from the personal-support pattern, not an oversight --
//       // flagged here so it isn't accidentally "fixed" back to match HM's
//       // pattern later.
//       const rawReplyText = response.content[0]?.text ?? "";
//       const { cleanedReply, crisisDetected } = processCrisisMarker(rawReplyText);
//
//       if (crisisDetected && user) {
//         // Fire-and-forget: do not await this before returning the reply.
//         // Decision 48 establishes that staying present in the conversation
//         // takes priority; the database write is a record of what
//         // happened, not a gate the person's reply should wait behind.
//         logCrisisEvent(supabaseAdmin, user.id, "counsel").catch((e) =>
//           console.error("[scriptuverse-crisis-log] unhandled error:", e)
//         );
//       }
//
//       // Return only the cleaned text, not the raw Anthropic response
//       // object -- per the note above, this is required, not optional, for
//       // Decision 54's marker-invisibility requirement to actually hold
//       // under inspection of network traffic.
//       return new Response(JSON.stringify({ reply: cleanedReply }), {
//         headers: { ...CORS, "Content-Type": "application/json" },
//       });
//     } catch (err) {
//       return new Response(JSON.stringify({ error: err.message }), {
//         status: 500,
//         headers: { ...CORS, "Content-Type": "application/json" },
//       });
//     }
//   });
//
// Notes on this integration:
//
// 1. `logCrisisEvent`'s second parameter is `user.id` under Shape B --
//    Supabase Auth's own platform-issued user identifier, pseudonymous by
//    construction (a UUID, not an email or name). This module's exported
//    `logCrisisEvent` function signature is unchanged from earlier versions
//    -- it only ever required a plain string, regardless of where that
//    string came from, so no change to this module's own code was needed to
//    support Shape B, only to the integration example and documentation.
//
// 2. Unlike personal-support's real code, which returns the entire raw
//    Anthropic SDK response object to the client, Scriptuverse's instrument
//    Edge Functions MUST extract and return only the cleaned text. This is
//    a hard requirement of Decision 54's marker-invisibility guarantee, not
//    a style preference -- returning the raw response object would leak the
//    unstripped marker into client-visible network traffic regardless of
//    what the rendered UI displays.
//
// 3. The instrument name ("counsel", "refuge", "reflection", "study") should
//    be hardcoded per Edge Function file, not derived dynamically -- each
//    instrument has its own Edge Function per the confirmed Human Mastery
//    pattern (one function per instrument: parenting, relationships,
//    personal-support), so each file always knows which instrument it is.
//
// 4. Per Decision 66's confirmed build order, only Counsel's and Refuge's
//    Edge Functions need this wired in for first build. Reflection's and
//    Study's integration happens when those instruments enter active build
//    -- this module itself is already suite-wide and needs no changes when
//    that happens, only the two additional integration-point call sites.
//
// 5. REMAINING OPEN ITEM, not resolved by Decision 72: confirmation that
//    any model string used in Scriptuverse's actual deployed code matches
//    Scriptuverse's intended model choice, rather than being carried over
//    unreflectively from HM's current live string (claude-sonnet-4-20250514
//    in the real personal-support code). This is unrelated to the Shape A/B
//    question and still needs Jamie's direct confirmation when actual
//    deployment code is written.
//
// 6. REMAINING BUILD TASK, not yet executed: the actual Supabase Auth
//    configuration (enabling magic-link sign-in, email templates, redirect
//    URLs) and the frontend session-handling code (onAuthStateChange,
//    session persistence) are real, concrete pieces of work that this
//    module does not itself contain -- this module only covers the
//    Edge-Function-side marker handling and database write. Decision 72's
//    build-time estimate accounts for this remaining work; it is not yet
//    done.

