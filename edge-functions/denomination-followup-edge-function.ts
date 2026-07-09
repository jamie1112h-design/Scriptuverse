// Scriptuverse -- Denomination Follow-Up Instrument
// Supabase Edge Function: denomination-followup
// Project: l3v3l-scriptuverse (xvlqixdhxvsjcowjmxyl)
// Deploy to: Supabase dashboard -> Edge Functions -> New Function -> name: denomination-followup
// Turn off JWT verification in function Settings after deployment -- this
// function receives no user-identifying data, only free text about a
// tradition, so it follows HM/BM's stateless pattern rather than Shape B's
// authenticated pattern used elsewhere in Scriptuverse. If that changes
// (e.g. rate-limiting by user becomes necessary), revisit this choice
// explicitly rather than silently carrying it forward.
//
// Model string: claude-sonnet-5, per ScriptBDL Decision 93.
//
// Purpose: implements Taxonomy v0.3's "How the Unlisted / Free-Text Option
// Works" section -- when a user selects/types an unlisted tradition, this
// asks ONE brief, respectful follow-up question calibrated to what they
// actually wrote, rather than a generic "tell us more" prompt. This is the
// piece ScriptBDL Decision 87 explicitly flagged as not yet built.

import Anthropic from "npm:@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: Deno.env.get("ANTHROPIC_API_KEY"),
});

// ── SYSTEM PROMPT ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You generate exactly one follow-up question for someone who has just described their faith tradition in their own words, because it was not on Scriptuverse's list of named denominations.

Your goal: show the person that what they wrote was actually read and understood, not just logged. A good follow-up question surfaces a genuine nuance in what they wrote -- something specific to their situation -- rather than repeating a generic "tell us more" that would fit literally anyone's answer.

Example: if someone writes "Coptic Orthodox but raised in the diaspora," a good follow-up asks whether their relationship to the tradition is closer to how it's practiced in its home region, or has adapted to their experience growing up outside it. A bad follow-up would be "Can you tell us more about your tradition?" -- that ignores everything specific about what they actually said.

Guidelines:
- Ask about identity, practice, or relationship to the tradition -- not about theology or doctrine itself. This informs how Scriptuverse addresses them, not what it argues.
- If what they wrote is already fully clear and leaves no genuine ambiguity worth asking about (e.g. "Coptic Orthodox" with no further detail), ask a brief, warm question that still shows attentiveness -- for example, whether there's anything about how they practice that Scriptuverse should know, rather than forcing a contrived question where none is needed.
- Never ask something that presumes disbelief, lapsed practice, or crisis -- only respond to what the person actually wrote. Do not diagnose or narrate back what their answer "really means."
- One question only. No preamble, no explanation of why you're asking, no multiple questions.
- Keep it brief -- one or two sentences, conversational, warm. Not clinical, not a form.

Return ONLY valid JSON, no markdown formatting, no code fences, no preamble.
Format exactly: {"question": "..."}`;

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
    const { tradition } = await req.json();

    if (!tradition || typeof tradition !== "string" || !tradition.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing or empty 'tradition' field." }),
        { status: 400, headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    const response = await client.messages.create({
      model:      "claude-sonnet-5",
      max_tokens: 300,
      system:     SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `The person wrote: "${tradition.trim()}"` }
      ],
    });

    const rawText = response.content
      .filter(block => block.type === "text")
      .map(block => block.text)
      .join("");

    let parsed;
    try {
      parsed = JSON.parse(rawText.trim());
    } catch {
      // Model didn't return clean JSON -- fail gracefully rather than
      // surfacing a raw parse error to the frontend. The frontend should
      // treat a missing 'question' field as "skip the follow-up," not as
      // a hard error blocking the save.
      console.error("[denomination-followup] Failed to parse model output as JSON:", rawText);
      return new Response(
        JSON.stringify({ question: null, raw: rawText }),
        { headers: { ...CORS, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } }
    );
  }
});
