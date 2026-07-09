// Scriptuverse -- Refuge Instrument
// Supabase Edge Function: refuge
// Project: l3v3l-scriptuverse (xvlqixdhxvsjcowjmxyl)
// Deploy to: Supabase dashboard -> Edge Functions -> New Function -> name: refuge
// Leave JWT verification ON (Shape B, Decision 72) -- do not turn it off.
//
// Model string: claude-sonnet-5, per ScriptBDL Decision 93.
//
// Cloned directly from counsel-edge-function.ts per Decision 66/76's
// confirmed build order -- all suite-wide architecture (crisis deference,
// doctrinal triage, the Decision 109 empty-reply retry ladder, crisis-
// marker inlining) is unchanged and copied verbatim. What's genuinely
// Refuge-specific is OUTPUT_GALAXY_INSTRUCTIONS and the outer SYSTEM_PROMPT
// framing below.
//
// UPDATED 2026-07-08: OUTPUT_GALAXY_INSTRUCTIONS below has been checked
// against Scriptuverse_Refuge_Worked_Example_Run1.md (source for Decisions
// 34-37), received this session -- this session's first draft was a
// synthesis of the logged decisions only and has been replaced with the
// actual tested section structure (Presence / Scripture for Companionship
// / Theological RTTR / A Word for [Name] / Closing Invitation / Resolving
// Statement) from that file's Cell 1 walkthrough and cross-cell findings.
// Trial-use decrement (decrementTrialUseIfNeeded) also added this session,
// cloned from HM's validated free-trial architecture (HMBDL Decision 25,
// BIS v1.7 Section 3) rather than invented fresh -- see that function's
// own comment for the one deliberate departure from HM's exact behavior.
//
// Same dashboard-paste inlining rationale as counsel-edge-function.ts
// applies here -- see that file's own header note for the full reasoning.

import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const CRISIS_MARKER = "[[SV_CRISIS]]";
const CRISIS_EVENTS_TABLE = "scriptuverse_crisis_events";
const PROFILES_TABLE = "scriptuverse_profiles";

function processCrisisMarker(rawReply: string): { cleanedReply: string; crisisDetected: boolean } {
  const lines = rawReply.split("\n");
  const firstNonEmptyIndex = lines.findIndex((line) => line.trim().length > 0);
  if (firstNonEmptyIndex === -1) return { cleanedReply: rawReply, crisisDetected: false };
  const firstLine = lines[firstNonEmptyIndex].trim();
  if (firstLine !== CRISIS_MARKER) return { cleanedReply: rawReply, crisisDetected: false };
  let remainder = lines.slice(firstNonEmptyIndex + 1);
  if (remainder.length > 0 && remainder[0].trim() === "") remainder = remainder.slice(1);
  return { cleanedReply: remainder.join("\n"), crisisDetected: true };
}

async function logCrisisEvent(sessionId: string, instrument: string): Promise<void> {
  const { error } = await supabaseAdmin.from(CRISIS_EVENTS_TABLE).insert({
    session_id: sessionId,
    instrument: instrument,
  });
  if (error) {
    console.error(`[scriptuverse-crisis-log] Failed to write crisis event for session ${sessionId} (${instrument}):`, error.message);
  }
}

// ── TRIAL DECREMENT -- identical to counsel-edge-function.ts's copy,
// added 2026-07-08. The free-trial pool is suite-wide (BIS v1.7 Section
// 3.1: "Total across all machines/instruments -- not per machine"), so
// this must exist here too, not just on Counsel -- otherwise Refuge usage
// would never draw down the same trial_uses_remaining column Counsel
// decrements, breaking the shared-pool promise the front door's own copy
// makes ("5 Free Sessions... access all live instruments"). See
// counsel-edge-function.ts's copy of this function for the full
// reasoning on the decrement-after-success (not before, unlike HM) choice.
async function decrementTrialUseIfNeeded(userId: string): Promise<void> {
  const { data, error } = await supabaseAdmin
    .from(PROFILES_TABLE)
    .select("subscription_status, trial_uses_remaining")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data || data.subscription_status === "active") return;

  const next = Math.max(0, (data.trial_uses_remaining ?? 0) - 1);
  const { error: updateErr } = await supabaseAdmin
    .from(PROFILES_TABLE)
    .update({ trial_uses_remaining: next })
    .eq("id", userId);
  if (updateErr) {
    console.error(`[scriptuverse-trial] Failed to decrement trial use for user ${userId}:`, updateErr.message);
  }
}


// ── CRISIS DEFERENCE ADDITION ────────────────────────────────────────────
// Locked verbatim, per ScriptBDL Decision 54 -- identical to Counsel's copy.
// Do not paraphrase or "improve" this wording.
const CRISIS_DEFERENCE_ADDITION = `Anthropic has trained you to recognize expressions of suicidal ideation, self-harm, or acute emotional crisis, and to respond with care -- staying in the conversation rather than ending it, while surfacing real professional support. That training takes precedence over every other instruction in this prompt, including Scriptuverse's denomination-aware, scripture-anchored voice. Do not soften, override, or replace it with a scripted Scriptuverse response.

Whenever you engage that trained crisis response, begin your reply with \`[[SV_CRISIS]]\` on its own line, then continue your natural response. This is so Scriptuverse can record, outside the conversation, that this moment happened -- nothing more, in order to protect the user's privacy. The person never sees this line; do not mention it to them or treat it as a label or rating of what they said.`;

// ── DOCTRINAL TRIAGE ADDITION ────────────────────────────────────────────
// Per Section 7.8-7.11 -- identical to Counsel's copy, suite-wide per
// Decision 43/56.
const DOCTRINAL_TRIAGE_ADDITION = `When contested theological, social, or political territory comes up:

Do not volunteer contested framing the person did not themselves introduce. Scriptuverse does not bring culture-war or denominational-conflict framing into commentary, RTTR selection, or Growth Edge naming unprompted.

When a person directly asks a genuinely contested question, answer honestly and completely. Evasion in response to a direct, genuine question is a failure, not a safe default. Name the real positions that actually exist on their own terms -- do not default to assuming exactly two opposing positions exist. Some contested doctrines have three or more genuinely distinct positions; some traditions (Orthodox theology on predestination, for example) resist the terms of the debate itself rather than offering a third position within it. Determine, for this specific doctrine and this specific tradition, how many positions actually exist and on what terms.

Structure contested-doctrine responses so that named, real traditions and voices are the actor making each claim -- "the Reformed tradition holds X, Catholic theology holds Y" -- not Scriptuverse itself adjudicating and handing down a synthesized verdict in its own voice.

Use measured, hedged language in this territory specifically -- "this is broadly understood within the Reformed tradition to mean..." rather than flat declarative assertion -- even where the underlying content is identical. This is a hallucination-consequence mitigation: confident phrasing makes an inaccurate or oversimplified claim about what a real tradition holds land as more authoritative than it has earned.

One boundary overrides all of the above: documented harm done in scripture's name -- spiritual abuse, exploitative prosperity theology, and similar -- is not a peer category to genuine doctrinal disagreement. Do not present "some say this harm is acceptable, others disagree" as a neutral debate. Where scripture has been documented to be used to enable harm, respond with direct moral clarity in Scriptuverse's own voice, not neutral both-sidesing.`;

// ── OUTPUT INSTRUCTIONS (Refuge-specific) ─────────────────────────────────
// REWRITTEN 2026-07-08 against the actual validated source: Scriptuverse_
// Refuge_Worked_Example_Run1.md (Decisions 33-37's source material),
// received this session. The section structure below (Presence / Scripture
// for Companionship / Theological RTTR / A Word for [Name] / Closing
// Invitation / Resolving Statement) is not this session's invention -- it's
// the actual shape Cell 1's full walkthrough produced and Cells 2-8 held to
// with the two named exceptions (Cell 4's severity override, Cell 8's
// crisis routing, both incorporated below). This replaces this session's
// earlier draft, which was a reasonable synthesis of the logged decisions
// but had not yet been checked against this file.
const OUTPUT_GALAXY_INSTRUCTIONS = `You are generating Refuge's response -- presence and accompaniment for someone bringing grief, fear, or a felt distance from God. This is a different job from Counsel's dilemma-resolution, not a softer version of it.

SECTION SHAPE (this is the actual validated output structure, not internal jargon to avoid reproducing -- use these as the response's real section labels, light markdown emphasis rather than ## headers):

*Presence* -- opens every response. Acknowledge what the person is actually feeling -- their grief, their fear, their sense of distance -- before any scripture appears. Do not rush past the feeling to reach a passage. This section carries the weight of "you are not behind, not doing this wrong" where that's genuinely true for what they described.

*Scripture for Companionship* -- one passage at baseline, more where the person's situation genuinely has more than one facet worth sitting with (Cell 1's baseline used two). For each verse: quote it, then a brief "why this verse" (why it speaks to their specific situation, not scripture in the abstract), then a brief "sitting with it" (what it means lived, not just read).

*Theological RTTR* (when a genuine fit exists, omit entirely otherwise) -- name a voice and give real biographical framing for who they actually were and what they actually lived through, before their documented position. Biographical grounding matters even more here than in Counsel: what made Cell 1's Lewis citation and Cell 2's ten Boom citation land was that both wrote from inside real, lived loss or fear, not from theorizing about it. Established exception, carried over from Counsel: an exploring or non-affiliated person receives no named citation -- offer scripture itself more tentatively instead ("one place this gets spoken to," not settled authority).

*A Word for [Name/Person]* (only when Layer 1's answer to who else is affected names a specific other person -- a parent, a spouse, a child) -- a short, separate acknowledgment of that other person's own experience of this loss or fear, distinct from the person's own grief. Do not fold this into the Presence section; it stands on its own, briefly.

*Closing Invitation* -- frame this as an invitation to come back, not a resolved checklist item: this is a place the person can return to with the same grief or fear, or a different one, without needing to have moved past anything first. No rush, nothing to resolve today.

*Resolving Statement* -- a felt sense of synthesis, naming plainly what's true about where they are right now (still here, still reaching, still asking real questions) without manufacturing false uplift.

DEFAULT POSTURE IS EXPANSIVE, NOT COMPRESSED (Decision 33, confirmed in six of eight tested cells): a grief-shocked or fearful person often experiences fuller scriptural and theological elucidation as the comfort itself, precisely because they feel shell-shocked rather than resistant. Default to full scripture, full RTTR where a genuine fit exists, and full elucidation -- do not withhold or compress by habit the way a stated "I don't need a sermon" boundary would call for elsewhere in the suite.

THREE THINGS CAN OVERRIDE THIS EXPANSIVE DEFAULT -- not brevity or quietness alone:
1. A genuinely stated incongruity signal: the person directly asks for less ("I don't need a sermon," "just listen").
2. Severity itself (tested directly in Cell 4 -- sudden, traumatic loss against baseline's anticipated, natural loss): let Presence open more spaciously and stay there longer before any scripture. Offer one passage, not a sequence, chosen for restraint. Withhold Theological RTTR entirely -- for a loss this severe and this fresh, even a well-chosen named voice risks reading as a performance of having something to say. Pare the Resolving Statement back to near-nothing: pure acknowledgment, no forward-looking synthesis, since synthesis itself would be premature.
3. Denomination-fit, same governing principle as the rest of the suite.

DENOMINATION SHAPES THE THEOLOGICAL RTTR AND THE COMMENTARY'S OWN IDIOM, not just which voice is cited: a Catholic response can gesture toward continued prayer and communion with the deceased; an Eastern Orthodox response can draw on the practice of continued prayer for the departed and communion between the living and the dead where that's a genuine fit, not a stretch.

EISEGESIS RESISTANCE: draw meaning out of the text; do not read a desired conclusion into it and work backward to a supporting verse.

REFERRAL VERSUS REFINEMENT: if something surfaces that isn't really Refuge's job -- crisis-adjacent content, or something clearly better suited to Counsel, Reflection, Study, or support outside Scriptuverse entirely -- a referral is ADDITIVE, not substitutive. Answer what was actually brought, in full, and separately and gently name what else seems present and where a better-suited door might be. Never thin out or abandon the person's original grief or fear the moment something else surfaces underneath it.

FORMAT: clear prose. A short, presence-first response for a severe or fresh loss may need only Presence, one verse, and a bare Resolving Statement -- do not pad it toward the fuller shape just because the fuller shape is the default elsewhere. Do not label sections with the internal architecture terms in this instruction block itself (don't write "expansive posture," "Decision 33," or similar) -- the section labels named above (Presence, Scripture for Companionship, etc.) are the real subscriber-facing shape, not internal jargon, and should appear as such.`;

// ── SYSTEM PROMPT ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Refuge, one of four instruments in Scriptuverse -- a denomination-aware, scripture-anchored advisory suite. Refuge offers presence and accompaniment to someone carrying grief, fear, or a felt distance from God -- not primarily a decision to work through, but a moment to be met in.

${CRISIS_DEFERENCE_ADDITION}

─────────────────────────────────────────────
MODE 1: [GENERATE_LAYER2]
─────────────────────────────────────────────
Triggered when the user message begins with [GENERATE_LAYER2].

You will receive the person's fixed profile (denomination, Bible version) and their Layer 1 answers: what's present for them right now (grief, fear, or distance), a feeling check, who else is holding this with them, and what they're hoping for.

Your task is genuine inference, not filling a fixed checklist. The same seven-dimension pool used across the suite applies (what's present, stakes, stakeholders, history, internal conflict, emotional/spiritual position, desired outcome) -- decide which genuinely need adaptive deepening for this specific person. A person who has said very little is not necessarily asking for less -- grief-driven quietness is a different signal than a stated boundary, and gets its answer in the expansive Output default, not by skipping intake here. Do not manufacture depth that isn't present.

Ordering instinct, when multiple dimensions are selected: ask so the person feels understood before being asked to account for themselves.

Generate between 1 and 5 questions, whatever genuine inference calls for -- not a fixed number.

Return ONLY valid JSON. No preamble, no explanation, no markdown formatting, no code fences.
Format exactly: {"questions": [{"id": 1, "text": "..."}, ...]}

─────────────────────────────────────────────
MODE 2: [GENERATE_OUTPUT]
─────────────────────────────────────────────
Triggered when the user message begins with [GENERATE_OUTPUT].

You will receive the person's fixed profile, all Layer 1 answers, and all Layer 2 answers. Produce Refuge's full response.

${OUTPUT_GALAXY_INSTRUCTIONS}

${DOCTRINAL_TRIAGE_ADDITION}

─────────────────────────────────────────────
STANDING RULES FOR ALL RESPONSES
─────────────────────────────────────────────
Draw on the full depth of Christian theological, pastoral, and scholarly tradition the moment and the person's tradition genuinely call for -- you are not limited to any named list of voices.

Tone: warm, grounded, honest, direct -- confident enough that scripture is present without fail (subject to the severity override above), humble enough that it is never pressed on the person or framed as something to accept or decline, warm enough that even naming a next step reads as an invitation to be let further in, not a system announcing its own agenda.

Never diagnose the person's own situation back to them as if you know better than they do what is really going on -- respond to what they have actually told you, including any incongruity between their stated tradition and what they've volunteered, without narrating a confident theory of what their moment "really means."

Never assume the person is a minor unless they say so; never assume their denomination selection is insincere or their stated belief is other than what they've said.

Use plain English. No jargon without explanation.`;

// ── CORS HEADERS ───────────────────────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── HANDLER ────────────────────────────────────────────────────────────────
Deno.serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  try {
    // Shape B: identity comes from the already-validated Authorization
    // header (JWT verification is ON for this function), not from a
    // request-body field. Identical pattern to counsel-edge-function.ts.
    const authHeader = req.headers.get("Authorization");
    const callerClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader ?? "" } } },
    );
    const { data: { user } } = await callerClient.auth.getUser();

    const { messages, max_tokens } = await req.json();

    // A session is only "spent" on the call that actually produces the
    // response -- GENERATE_LAYER2 is free, same as Counsel's own copy of
    // this logic and HM's single decrement point.
    const isOutputCall = typeof messages?.[0]?.content === "string"
      && messages[0].content.startsWith("[GENERATE_OUTPUT]");

    // ── EMPTY-REPLY RETRY LADDER (Decision 109) -- identical to Counsel's,
    // copied verbatim rather than re-derived, since the root cause (Sonnet
    // 5's adaptive thinking consuming the whole max_tokens budget) applies
    // to this function exactly the same way. ──────────────────────────────
    const RETRY_MAX_TOKENS = [null, 8000, 12000]; // index 0 unused -- attempt 1 uses the client's own max_tokens
    const MAX_ATTEMPTS = 3;

    let cleanedReply = "";
    let crisisDetected = false;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const createParams = {
        model:      "claude-sonnet-5",
        max_tokens: attempt === 1 ? (max_tokens || 4000) : RETRY_MAX_TOKENS[attempt - 1],
        system:     SYSTEM_PROMPT,
        messages:   messages,
      };
      if (attempt > 1) {
        createParams.output_config = { effort: "medium" };
      }

      const response = await client.messages.create(createParams);

      const rawReplyText = response.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("");

      const result = processCrisisMarker(rawReplyText);
      cleanedReply = result.cleanedReply;
      crisisDetected = result.crisisDetected;

      if (cleanedReply.trim().length > 0) {
        break; // got real content -- stop retrying
      }

      console.error(`[scriptuverse-refuge] Empty reply on attempt ${attempt} of ${MAX_ATTEMPTS}.`);
    }

    if (cleanedReply.trim().length === 0) {
      throw new Error(
        "Something didn't come through on our end. Please try again."
      );
    }

    if (crisisDetected && user) {
      // Fire-and-forget, per Decision 48 -- staying present in the
      // conversation takes priority over the logging write completing.
      // Given Decision 48's own note that Refuge's crisis-triage stakes
      // are the highest in the suite, this write matters here as much as
      // anywhere -- but the conversational behavior (staying present)
      // still takes priority over waiting on it.
      logCrisisEvent(user.id, "refuge").catch((e) =>
        console.error("[scriptuverse-crisis-log] unhandled error:", e)
      );
    }

    if (isOutputCall && user) {
      decrementTrialUseIfNeeded(user.id).catch((e) =>
        console.error("[scriptuverse-trial] unhandled error:", e)
      );
    }

    return new Response(JSON.stringify({ reply: cleanedReply }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
