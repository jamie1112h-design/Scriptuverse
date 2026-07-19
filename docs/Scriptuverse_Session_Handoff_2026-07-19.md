# Scriptuverse Session Handoff -- 2026-07-19

**Purpose of this document:** a fast-start briefing for whichever Claude session picks up the Decision 181 bug fix next -- what's live, what was tested tonight, exactly what's broken, and the debugging method to use. Companion to ScriptBDL v73 (the full decision log) and the 2026-07-16 handoff it directly follows; this document is the summary, not the record of record. Where this document and ScriptBDL v73 ever disagree, ScriptBDL v73 is authoritative.

**This document's own provenance:** it updates and extends the 2026-07-16 handoff rather than replacing its still-valid content. Everything in that document about the platform's general live state (Stripe, legal pages, Supabase project, GitHub repo) still holds and is not repeated in full here -- read that document first if you haven't, then this one for what's changed since.

---

## Current Live State (delta from the 07-16 handoff)

- **Both instruments' crisis-chat build (Decision 178) is no longer just reviewed-and-syntax-checked -- it has now been run live, end to end, on Refuge, and passed on every originally-scoped item.** See Decision 181 for the full test log.
- **A real bug found via code review (not yet live-tested at that point) has been fixed and deployed on both instruments:** `refuge-edge-function.ts` and `counsel-edge-function.ts` both had `isOutputCall` matching on every turn of a crisis-chat continuation instead of only the original one-shot call, silently over-decrementing `trial_uses_remaining` once per crisis-chat turn. Fixed (Decision 180) by requiring `messages.length === 1` alongside the existing prefix check. **Confirmed working under real live conditions in tonight's test** -- `trial_uses_remaining` held at exactly one decrement (5 to 4) across a full 12-turn crisis conversation. Both corrected files are deployed to Supabase and pushed to GitHub.
- **A second, different bug was found during tonight's live test and is NOT yet fixed.** This is the next session's actual work. Full detail below.

## The Open Bug -- Everything Needed to Pick This Up Cold

**Symptom:** during an active crisis-chat conversation, some AI replies abandon plain conversational prose and instead render full Output Galaxy structure (section headers like *Presence* / *Scripture for Companionship*, complete multi-verse citations) -- and when they do, the reply is sometimes truncated mid-sentence, with no error surfaced and no retry triggered.

**Reproduced twice in a single 12-turn run (responses 3 and 4), absent in the other 10, including one other turn that also touched theological content (response 11) but stayed clean.** Full response-by-response data is in ScriptBDL Decision 181's reproduction table -- read that table before forming any hypothesis, since the correlation with theological content in the preceding user turn is real but not a clean deterministic rule (2 of 3 theological-content turns triggered it, not 3 of 3).

**Root cause, already confirmed via code review, not still a hypothesis:** `SYSTEM_PROMPT` is one static string sent unchanged on every Edge Function call, containing both the `[GENERATE_LAYER2]` and `[GENERATE_OUTPUT]` mode sections in full. The model decides which governs by reading the conversation for the literal trigger phrase. Because `enterCrisisChat()` seeds `crisisMessages` from the original triggering call and every later turn only ever appends to that array, `messages[0]` permanently retains the original `[GENERATE_OUTPUT]` trigger text for the entire conversation, turn 1 through 12 alike. The crisis-deference clause (Decision 54, locked verbatim) explicitly overrides the JSON-only *formatting* instruction -- it says nothing about the *structural* conventions in `OUTPUT_GALAXY_INSTRUCTIONS` (headers, full citations). Nothing retracts those once the conversation continues past the original call, so the model isn't malfunctioning when it reaches for them -- it's correctly following an instruction that's still textually present and unretracted. This is the same underlying pattern as Decision 180's bug (the frozen `messages[0]`), showing up on a second, independent axis.

**Why Decision 109's empty-reply retry ladder doesn't catch it:** that mechanism only retries when `cleanedReply.trim().length === 0` -- a fully empty response. A truncated-but-non-empty reply sails through untouched.

**Three fix options on record (Decision 181), none chosen yet:**
1. Raise crisis-chat's `max_tokens` (currently 1500, hardcoded in `sendCrisisMessage()`) toward the 4000 already used for the original Output call. Fixes the truncation symptom only; the model could still emit full structure mid-conversation, just without getting cut off.
2. Extend the Decision 109 retry ladder to also catch a non-empty reply where `stop_reason === "max_tokens"`, not only a fully empty one. Same mechanism already built, wider trigger. Also symptom-only.
3. **The actual root-cause fix:** give crisis-chat continuation turns a distinct system-prompt treatment that doesn't carry `OUTPUT_GALAXY_INSTRUCTIONS`'s structural expectations forward, while leaving the crisis-deference clause itself completely untouched and unparaphrased. This is a real design call about how Refuge behaves mid-crisis-conversation -- **needs Jamie's direct judgment on the actual wording, not something for Claude to draft and ship unilaterally.**

## Debugging Method Locked for This Session (ScriptBDL Decision 182 -- read before starting)

**Do not iterate by running the full live 12-turn UI test through Supabase for every candidate fix.** That burns real tokens and real time re-confirming things Decision 181 already passed. Instead:

- **Tier 1 (zero cost):** anything deterministic -- does the extended retry ladder actually catch a `max_tokens` stop reason, does `isOutputCall` behave correctly, does the box-rendering schedule still fire right -- gets tested with a fabricated mock Anthropic response object run straight through the real Edge Function code. No network call.
- **Tier 2 (low cost, not zero):** whether a candidate system-prompt variant actually stops the model from reaching for structure is a real behavioral question that has to run against the real model. Instead of a full live test, Jamie pastes the candidate prompt variant plus a short, minimal crafted history (just the crisis-trigger turn plus one theological follow-up -- not all 12 turns), and Claude generates what that prompt would produce, right in the session. Same model, same prompt content, no cost to Scriptuverse's own key, no deploy cycle. **This is a strong proxy, not a guarantee of the deployed function's exact behavior** -- the full live test still needs to run once, at the end, against whatever fix is actually chosen.
- **Line-by-line elimination:** isolate the exact responsible instruction by removing pieces of `OUTPUT_GALAXY_INSTRUCTIONS` individually and re-testing via Tier 2 after each removal -- e.g., strip the whole block first and confirm the structure-reaching behavior stops, then add pieces back one at a time until it returns. One variable per test. The crisis-deference clause itself (Decision 54) is out of scope for this process -- not a candidate for editing or removal.

## Standing Pre-Launch Gate, Still Open

**Decision 76's live crisis-path test is now genuinely, substantially exercised -- but not fully satisfied.** Tonight's run passed everything it set out to test on Refuge, including Decision 180's fix under real conditions. It should not be read as closing Decision 76 while the truncation bug above sits open and unfixed in the exact conversational surface that gate exists to validate. **No promotional push before this bug is fixed and a final live confirmation pass (per the methodology above) is run.**

## Also Still Open, Carried Forward

- **Counsel has not been run through this live test at all.** It shares the identical code patterns behind both the Decision 180 fix and the new bug, so both are expected to apply there too -- neither confirmed.
- `scriptuverse_crisis_events` row count and timestamp spread for tonight's test session -- not checked, would need a fresh query if wanted.
- Independent confirmation of the input/Send-button disabled state specifically after response 12 (as opposed to the already-established per-turn disabled-while-waiting behavior) -- inferred, not separately verified.
- Decisions 151-166 remain the one still-unrecovered ScriptBDL gap, per the 07-16 handoff -- not touched this session, not being actively re-investigated per Jamie's standing instruction.

---

Session paused here at Jamie's request after a full, successful live test and a real bug find. Nothing about tonight's result should be read as pending on anything except the truncation fix above -- everything else tested tonight is solid.
