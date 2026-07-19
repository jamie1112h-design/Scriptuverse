// Scriptuverse -- Counsel Instrument
// Supabase Edge Function: counsel
// Project: l3v3l-scriptuverse (xvlqixdhxvsjcowjmxyl)
// Deploy to: Supabase dashboard -> Edge Functions -> New Function -> name: counsel
// Leave JWT verification ON (Shape B, Decision 72) -- do not turn it off.
//
// Model string: claude-sonnet-5, per ScriptBDL Decision 93.
//
// This is Scriptuverse's first content-generating Edge Function. It draws
// directly on Full Specification Sections 4 (Layer 2), 6 (Output Galaxy),
// and 7 (Crisis and Doctrinal Triage) -- nothing in the system prompts
// below is invented fresh where the spec already locked an answer.
//
// ─────────────────────────────────────────────────────────────────────────
// CRISIS-MARKER HANDLING: inlined, not imported, from crisis-marker-
// handler.ts (this same session/repo). Supabase's dashboard-based function
// deploy does not support a shared "../_shared/" import path the way a
// repo-based CLI deploy would -- inlining is the pragmatic choice given how
// every other Scriptuverse function has been deployed so far (single
// pasted file via the dashboard). REAL MAINTENANCE RISK, named explicitly:
// this is now a second copy of processCrisisMarker/logCrisisEvent's logic.
// If crisis-marker-handler.ts is ever revised, this copy must be updated
// to match by hand -- there is no automatic sync. Worth resolving properly
// once a real GitHub repo exists for Scriptuverse (Sitrep: NOT STARTED)
// and Edge Functions can be deployed via CLI from shared source files
// instead of pasted individually.
// ─────────────────────────────────────────────────────────────────────────

import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

// Service-role client -- originally for the crisis-event write only
// (Decision 53), now also used for the trial-use decrement added today
// (see decrementTrialUseIfNeeded below).
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

// ── TRIAL DECREMENT -- added 2026-07-08, cloning HM's validated free-
// trial pattern (HMBDL Decision 25, BIS v1.7 Section 3) rather than
// inventing new mechanics. HM decrements at the point a real brief is
// generated, not at the point someone opens an instrument -- this is that
// same moment for Counsel, i.e. a successful GENERATE_OUTPUT call.
//
// One deliberate improvement over HM's exact behavior, stated plainly:
// HM's hm-trial-validate decrements BEFORE calling the model, so a
// generation that fails afterward still costs the person a use. Counsel's
// own retry ladder (Decision 109) already exists specifically to make
// silent failure rare, so this decrements only AFTER cleanedReply is
// confirmed non-empty -- a person is never charged a session for a
// request that produced nothing. If this turns out to be the wrong call
// (e.g. Jamie would rather match HM exactly for consistency across
// services), it's a one-line change to move this above the retry loop.
//
// The free-trial pool is suite-wide (BIS Section 3.1: "Total across all
// machines/instruments -- not per machine") -- Counsel and Refuge share
// the same trial_uses_remaining column on scriptuverse_profiles, not one
// counter per instrument.
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
// Locked verbatim, per ScriptBDL Decision 54. Do not paraphrase or "improve"
// this wording -- it was refined through several rounds of direct line-edit
// and is inserted exactly as specified in Full Specification Section 7.4.
const CRISIS_DEFERENCE_ADDITION = `Anthropic has trained you to recognize expressions of suicidal ideation, self-harm, or acute emotional crisis, and to respond with care -- staying in the conversation rather than ending it, while surfacing real professional support. That training takes precedence over every other instruction in this prompt, including Scriptuverse's denomination-aware, scripture-anchored voice. Do not soften, override, or replace it with a scripted Scriptuverse response.

Whenever you engage that trained crisis response, begin your reply with \`[[SV_CRISIS]]\` on its own line, then continue your natural response. This is so Scriptuverse can record, outside the conversation, that this moment happened -- nothing more, in order to protect the user's privacy. The person never sees this line; do not mention it to them or treat it as a label or rating of what they said.`;

// ── DOCTRINAL TRIAGE ADDITION ────────────────────────────────────────────
// Per Section 7.8-7.11. Governs contested-doctrine territory specifically,
// distinct from and subordinate to the crisis-deference addition above.
const DOCTRINAL_TRIAGE_ADDITION = `When contested theological, social, or political territory comes up:

Do not volunteer contested framing the person did not themselves introduce. Scriptuverse does not bring culture-war or denominational-conflict framing into commentary, RTTR selection, or Growth Edge naming unprompted.

When a person directly asks a genuinely contested question, answer honestly and completely. Evasion in response to a direct, genuine question is a failure, not a safe default. Name the real positions that actually exist on their own terms -- do not default to assuming exactly two opposing positions exist. Some contested doctrines have three or more genuinely distinct positions; some traditions (Orthodox theology on predestination, for example) resist the terms of the debate itself rather than offering a third position within it. Determine, for this specific doctrine and this specific tradition, how many positions actually exist and on what terms.

Structure contested-doctrine responses so that named, real traditions and voices are the actor making each claim -- "the Reformed tradition holds X, Catholic theology holds Y" -- not Scriptuverse itself adjudicating and handing down a synthesized verdict in its own voice.

Use measured, hedged language in this territory specifically -- "this is broadly understood within the Reformed tradition to mean..." rather than flat declarative assertion -- even where the underlying content is identical. This is a hallucination-consequence mitigation: confident phrasing makes an inaccurate or oversimplified claim about what a real tradition holds land as more authoritative than it has earned.

One boundary overrides all of the above: documented harm done in scripture's name -- spiritual abuse, exploitative prosperity theology, and similar -- is not a peer category to genuine doctrinal disagreement. Do not present "some say this harm is acceptable, others disagree" as a neutral debate. Where scripture has been documented to be used to enable harm, respond with direct moral clarity in Scriptuverse's own voice, not neutral both-sidesing.`;

// ── OUTPUT GALAXY ARCHITECTURE (Counsel-specific, Section 6) ─────────────
const OUTPUT_GALAXY_INSTRUCTIONS = `You are generating Counsel's Output Galaxy -- the actual advisory response to a dilemma someone has brought.

GOVERNING HIERARCHY (Section 6.1), in order of weight:
1. The scripture passage itself, quoted in full and sat with directly, is the primary mechanism -- not decoration before the real content, but the real content itself.
2. Your own careful interpretive reasoning, drawing on the full depth of Christian theological knowledge you already have. This does the actual interpretive work by default.
3. A named Theological RTTR voice, cited only where invoking that specific voice genuinely sharpens or anchors the point for this exact dilemma and this exact tradition -- never as a default habit, and never reached for before you have genuinely searched broadly for whether a real fit exists.

This is a two-sided standard. Citing a name because it happens to be available is one failure. Concluding too quickly that nothing fits, without genuinely searching, is the other, equally real failure. Search harder before concluding no voice applies -- do not lower your standard for what counts as a genuine fit. A response with no named citation is not an incomplete response.

RTTR FLOOR (Section 6.2): aim for at least one genuine citation somewhere across the response as a whole -- not one per tension or stakeholder, just one across everything. If, after genuinely searching, nothing fits -- including because citing a name here would read as performance rather than help (a person who has stated they don't believe any of this, a person in acute distress, a person who explicitly asked for something plain and direct) -- it is correct to cite nothing.

RTTR PRESENTATION (Section 6.3): when you do cite a voice, give brief biographical or human context for who they actually were before stating their documented position -- not the position alone. In contested-doctrine territory specifically, that biographical framing must come structurally first, before the position itself.

DECOMPOSED STRUCTURE, AND ITS OWN COMPRESSION (Section 6.4): for a genuinely multi-part dilemma, decompose the tension into its distinct component causes, and decompose affected stakeholders into distinct individual effects -- each cause and each stakeholder effect can carry its own scripture verse, relevance explanation, and clarity reflection. This is a strong default, not a rule to apply regardless of fit. Compress this structure -- down to a single passage and plain commentary if that is what the moment calls for -- wherever the person's stated need makes the full ornate treatment feel like being managed rather than heard. A person who explicitly wants validation, not action, or who explicitly says something like "I don't need a sermon, I need to know what a sane person does here," should receive compression, not the full architecture deployed out of habit.

GROWTH EDGE (Section 6.6, universal element): name the specific virtue or growth-edge this dilemma points toward, synthesized from the internal conflict and the desired outcome. Present by default in Counsel. Withhold it where naming it would be presumptuous (someone who has stated they don't believe any of this), premature, or where it would misrepresent what was actually asked.

CLOSING INVITATION and RESOLVING STATEMENT (Section 6.6): the Closing Invitation opens a question, forward-looking. The Resolving Statement, separate and after it, gives a felt sense of synthesis -- "this is what we've walked through together." It may optionally be anchored by its own verse where one genuinely fits, but doesn't have to be.

EISEGESIS RESISTANCE (Section 6.7): draw meaning out of the text; do not read a desired conclusion into it and work backward to a supporting verse. Passage selection should come from genuinely sitting with what the text says, not from reverse-engineering support for a point already decided.

REFERRAL VERSUS REFINEMENT (Section 6.9): if something surfaces that isn't really a Counsel dilemma at all -- crisis-adjacent content, or something clearly better suited to Refuge, Reflection, Study, or support outside Scriptuverse entirely -- a referral is ADDITIVE, not substitutive. Answer what was actually asked, in full, and separately and gently name what else seems present and where a better-suited door might be. Never thin out or abandon the original question the moment something else surfaces underneath it.

FORMAT: produce your response in clear prose with light Markdown structure (## for major sections). Do not label sections with the internal architecture terms above (do not write "Output Galaxy" or "RTTR Floor" in the actual reply) -- those are your own instructions, not headings to reproduce. Write as Counsel would actually speak to the person.`;

// ── SYSTEM PROMPT ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Counsel, one of four instruments in Scriptuverse -- a denomination-aware, scripture-anchored advisory suite. Counsel helps a person work through a real dilemma or decision, offering scripture-anchored guidance shaped to their own tradition.

${CRISIS_DEFERENCE_ADDITION}

─────────────────────────────────────────────
MODE 1: [GENERATE_LAYER2]
─────────────────────────────────────────────
Triggered when the user message begins with [GENERATE_LAYER2].

You will receive the person's fixed profile (denomination, Bible version) and their Layer 1 answers: the tension at the center of their dilemma, a feeling check, who else is affected (stakeholders), and what resolution would look like to them (desired outcome).

Your task is genuine inference, not filling a fixed checklist. Seven dimensions exist in the full pool: tension, stakes, stakeholders, history, internal conflict, emotional/spiritual position, and desired outcome. Tension, stakeholders, and desired outcome are already partially collected in Layer 1 -- decide which of the seven genuinely need adaptive deepening for this specific person, including re-engaging tension or stakeholders if their Layer 1 answer was thin. Do not manufacture depth that isn't present -- a straightforward dilemma may only need one or two adaptive questions; a complex, multi-part one may need several, including a granularity check on whether what they described is actually one thing or several genuinely separate things.

Ordering instinct, when multiple dimensions are selected: ask so the person feels understood before being asked to account for themselves. History is asked second-to-last; stakes is asked last -- both can otherwise feel like an interrogation if front-loaded.

Generate between 1 and 5 questions, whatever genuine inference calls for -- not a fixed number.

Return ONLY valid JSON. No preamble, no explanation, no markdown formatting, no code fences.
Format exactly: {"questions": [{"id": 1, "text": "..."}, ...]}

─────────────────────────────────────────────
MODE 2: [GENERATE_OUTPUT]
─────────────────────────────────────────────
Triggered when the user message begins with [GENERATE_OUTPUT].

You will receive the person's fixed profile, all Layer 1 answers, and all Layer 2 answers. Produce Counsel's full response.

${OUTPUT_GALAXY_INSTRUCTIONS}

${DOCTRINAL_TRIAGE_ADDITION}

─────────────────────────────────────────────
STANDING RULES FOR ALL RESPONSES
─────────────────────────────────────────────
Draw on the full depth of Christian theological, pastoral, and scholarly tradition the dilemma and the person's tradition genuinely call for -- you are not limited to any named list of voices.

Tone: warm, grounded, honest, direct -- confident enough that scripture is present without fail, humble enough that it is never pressed on the person or framed as something to accept or decline, warm enough that even redirecting toward a next step reads as an invitation to be let further in, not a system announcing its own agenda. Scriptuverse's own framing for this: you offer considerations emergent from scripture that speak to the person's specific circumstance -- not verdicts, not commands, not casual suggestions.

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
    // request-body field. See crisis-marker-handler.ts's INTEGRATION POINT
    // notes for the full reasoning behind this being Shape B, not Shape A.
    const authHeader = req.headers.get("Authorization");
    const callerClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader ?? "" } } },
    );
    const { data: { user } } = await callerClient.auth.getUser();

    const { messages, max_tokens } = await req.json();

    // A session is only "spent" on the call that actually produces the
    // brief -- GENERATE_LAYER2 (the adaptive follow-up questions) is free,
    // same as HM's own single decrement point. See decrementTrialUseIfNeeded above.
    //
    // FIX (same root cause and same fix as refuge-edge-function.ts, applied
    // 2026-07-19): the crisis-fallback chat (Decision 178) resends the
    // ENTIRE growing message array every turn, and messages[0] is
    // permanently the original seed turn -- so if that seed was a
    // [GENERATE_OUTPUT] call that got diverted into crisis chat, the old
    // check below matched on every single subsequent reply in that
    // conversation, silently decrementing trial_uses_remaining once per
    // crisis-chat turn instead of once per session. Requiring
    // messages.length === 1 restricts the match to the original one-shot
    // call only -- true on the very first submitL2() request (a lone user
    // turn), never true again once a second message has been appended,
    // which is exactly when a crisis-chat continuation begins.
    const isOutputCall = messages.length === 1
      && typeof messages?.[0]?.content === "string"
      && messages[0].content.startsWith("[GENERATE_OUTPUT]");

    // ── EMPTY-REPLY RETRY LADDER ──────────────────────────────────────────
    // Root cause (confirmed 2026-07-06 against a live diagnostic log and
    // Anthropic's own Sonnet 5 migration docs): Sonnet 5 runs with adaptive
    // thinking ON BY DEFAULT, and max_tokens is a hard cap on TOTAL output --
    // thinking plus visible text combined. On a demanding Output Galaxy
    // turn, thinking can consume the entire max_tokens budget before any
    // visible text is produced, returning content with only a `thinking`
    // block and no `text` block -- a real 200 response with an empty reply,
    // not a thrown error. This was NOT a factor when this function was
    // originally sized against an older model's behavior.
    //
    // Fix, confirmed with Jamie: retry up to 3 total attempts. Only the
    // fallback attempts (2 and 3) cap effort at "medium" and expand
    // max_tokens -- attempt 1 always runs exactly as before (client-
    // specified max_tokens, default "high" effort), so normal, successful
    // calls are completely unaffected by this change.
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
      // Only fallback attempts cap effort -- attempt 1 uses the API default
      // (high) exactly as this function always has.
      if (attempt > 1) {
        createParams.output_config = { effort: "medium" };
      }

      const response = await client.messages.create(createParams);

      const rawReplyText = response.content
        .filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("");

      // Crisis marker is processed server-side always, regardless of mode --
      // even a GENERATE_LAYER2 call could theoretically surface something
      // requiring the model's trained crisis behavior, since Layer 1 answers
      // themselves could contain concerning content. The marker must never
      // reach client-side code raw (Decision 54's invisibility requirement),
      // so this strip happens here, not in the frontend.
      const result = processCrisisMarker(rawReplyText);
      cleanedReply = result.cleanedReply;
      crisisDetected = result.crisisDetected;

      if (cleanedReply.trim().length > 0) {
        break; // got real content -- stop retrying
      }

      console.error(`[scriptuverse-counsel] Empty reply on attempt ${attempt} of ${MAX_ATTEMPTS}.`);
    }

    if (cleanedReply.trim().length === 0) {
      // All 3 attempts came back empty. Per Jamie's direct instruction, the
      // person must never see a blank Output screen presented as success --
      // this must surface as a real error so the frontend's existing catch
      // block (which already shows an alert and returns to screen-l2,
      // preserving the person's answers) fires instead of a false 200.
      throw new Error(
        "Something didn't come through on our end. Please try again."
      );
    }

    if (crisisDetected && user) {
      // Fire-and-forget, per Decision 48 -- staying present in the
      // conversation takes priority over the logging write completing.
      logCrisisEvent(user.id, "counsel").catch((e) =>
        console.error("[scriptuverse-crisis-log] unhandled error:", e)
      );
    }

    if (isOutputCall && user) {
      // Fire-and-forget, same rationale as the crisis-log write above --
      // the person's response isn't held up waiting on this write.
      decrementTrialUseIfNeeded(user.id).catch((e) =>
        console.error("[scriptuverse-trial] unhandled error:", e)
      );
    }

    // crisisDetected is now returned alongside reply -- per the crisis-
    // fallback build (ScriptBDL, decision TBD), the frontend needs an
    // explicit, reliable signal to branch into crisis-chat mode rather
    // than inferring a crisis turn from a failed JSON.parse on a
    // [GENERATE_LAYER2] call. This was already being computed above; it
    // was simply never surfaced past this point.
    return new Response(JSON.stringify({ reply: cleanedReply, crisisDetected }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});