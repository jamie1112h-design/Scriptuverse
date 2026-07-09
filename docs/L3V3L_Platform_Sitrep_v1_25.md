**L3V3L PLATFORM**

**SITUATION REPORT  |  SITREP**

*Version 1.25   |   Updated: 2026-07-09   |   The Good Gate Publishing / Wadontei:io*

# **VERSION CONTROL**

## **Convention**

| **FORMAT** | **TYPE** | **WHEN TO USE** | **EXAMPLE** |
| --- | --- | --- | --- |
| v X.Y | Major / Structural | Multi-service updates, new sections added, registry changes, strategic decisions | v1.6 -- Platform Feature Roadmap added; free trial decisions confirmed; Supabase Pro upgrade logged |
| v X.Y.Z | Single-Service Patch | One service updated. Third digit = service number (see key below). | v1.1.2 -- Corporate Prediction: first prediction confirmed complete |

## **Service Number Key**

| **DIGIT** | **SERVICE** | **EXAMPLE PATCH TRIGGER** |
| --- | --- | --- |
| 1 | PrecisionSteps Tutorials | Supabase project confirmed, promotion activated |
| 2 | Corporate Prediction Service | First prediction complete, Stripe activated |
| 3 | Business Mastermind | Machine built and tested |
| 4 | Human Mastery Service | Intake layer built, instrument added |
| 5 | Causal Parallax | Build phase completed |
| 0 | Platform / Infrastructure / Registry | Supabase project added, repo confirmed |

## **Update Protocol**

At the close of any working session where a milestone is achieved or infrastructure is confirmed, upload this document to a new Claude session, state what changed, and request a version update. Claude will update the relevant tables, increment the version number, and add a row to the Version History table below.

**Never manually edit status cells -- always update via Claude to maintain consistency across all tables.**

## **Version History**

| **VERSION** | **DATE** | **TYPE** | **CHANGES** |
| --- | --- | --- | --- |
| v1.0 | 2026-05-25 | Initial issue | First Sitrep created. Five services, platform overview, infrastructure tables, MVL sequence. |
| v1.1 | 2026-05-25 | Structural | GitHub Repository Registry added. Supabase Project Registry added. Corporate Prediction infrastructure corrected. Human Mastery corrected to IN BUILD. |
| v1.1.1 | 2026-05-25 | Patch -- Svc 1 + Platform | PrecisionSteps Supabase confirmed as qtnnaeozugmcjlwrntwn. Critical finding: three services share one Supabase project. Dedicated project separation flagged. |
| v1.2 | 2026-05-25 | Structural | Governing Documents tables added to each service. Living document versioning established. BDL updated to v5. |
| v1.3 | 2026-05-26 | Structural | Machine rosters updated from Select Machines 2.xlsx. Business Mastermind machine names corrected. Negotiation Machine build confirmed COMPLETE (v10). Platform Decisions section added. |
| v1.4 | 2026-05-28 | Structural | Service 4 Human Mastery: HMBDL v2 initiated. Index HTML built. 5L1/5L2 intake architecture confirmed. Full 15-instrument roster confirmed. CRAP design standard adopted. |
| v1.5 | 2026-05-28 | Structural | Service 4 Human Mastery: Row I complete. All three Row I instruments built and live. level33humanmastery.com domain registered and live. Dedicated Supabase project spjzyrotuiqgdmtldswb created (Pro upgrade). Three Edge Functions deployed. GitHub repo renamed to level33humanmastery. In Development banner deployed on index. HMBDL updated to v3 (Decisions 17--24). |
| v1.6 | 2026-05-28 | Structural | Platform Feature Roadmap section added: PDF export, session history, landing pages. Free trial architecture confirmed: use-count gating, email-gated like PrecisionSteps, Stripe/Resend stack. Trial limits confirmed: BM 4 uses, HM 5 uses, total across all machines. Free trial flow decisions logged. Supabase Pro upgrade confirmed 2026-05-28 (jamie1112h-design Org). BM landing page decision: no separate landing page -- email modal on index. HM landing page decision: dedicated consumer landing page required before launch. HM infrastructure table corrected to reflect live state. |
| v1.7 | 2026-05-28 | Structural | Session 2026-05-28 (evening). PDF export added to all three BM machines (Strategy v4, Marketing v4, Negotiation v10) -- html2pdf.js, Export Brief as PDF button, page-break clipping fix. All three pushed to GitHub and live. Machine Build Instruction Set (BIS) v1.0 produced -- canonical three-document build protocol (BIS + BDL/HMBDL + Sitrep) for deploying any machine with a new Claude instance. BIS first live test flagged as post-June-1 task. Platform Communications section added to Sitrep (partner update task, per-service coverage brief). Post-June-1 task list confirmed: HM free trial system, HM Stripe activation, BM free trial modal, BM Stripe activation, BIS first live machine build test. NOTE: Internal version header incorrectly read Version 1.6 -- corrected in v1.8. |
| v1.8 | 2026-05-29 | Structural | Session 2026-05-29. HM free trial system fully built and validated end-to-end: landing page live (index.html, parchment/blue design, Radio Short Speak copy), Resend domain level33humanmastery.com verified, Resend Pro upgraded ($20/month, 10 domains), hm_trials Supabase table live with GRANT ALL confirmed, hm-trial-signup and hm-trial-validate Edge Functions deployed (JWT off), instruments.html token passthrough confirmed working, uses_remaining decrement validated (5 to 4 confirmed in Supabase SQL query). Stripe HM product confirmed: L3V3L Human Mastery Service $7.99 USD/month, payment link https://buy.stripe.com/9B66oJb4N1j52225WxdQQ01, created 2026-05-29 2:29 AM. Stripe URL wired into paywall screen of all three Row I instruments. thankyou.html not yet created -- required before full Stripe flow test (resolved in v1.9). Three instrument files (Parenting, Relationships, PersonalSupport v1) updated with token validation + paywall + session counter + Stripe URL -- resolved in v1.9. Session protocol formalised (Decision 27 in HMBDL v4): short sessions, three-document update at session close, new version numbers only. Internal v1.7 header error corrected. BIS v1.2 produced this session. |
| v1.9 | 2026-05-29 | Structural | Session 2026-05-29 (morning). Three HM instrument files (Parenting, Relationships, PersonalSupport v1) verified and uploaded to GitHub -- Parenting em dash fix applied (Q1-Q5 subscriber-visible labels corrected, Decision 3 compliance). thankyou.html verified and uploaded to GitHub -- LIVE at level33humanmastery.com/thankyou.html. hm-stripe-webhook forensic verification: confirmed LIVE, JWT off, code correct -- deployed prior session, not logged in v1.8 (documentation gap corrected here). Decision 28 confirmed (HMBDL v5): URL pre-fill test acceleration (?prefill=1 parameter), permanent fixture in all instruments and BIS canonical template, test answers defined per instrument at spec stage. HM Stripe full subscription flow end-to-end complete -- pending first live payment test. HMBDL updated to v5. BIS updated to v1.3. |
| v1.10 | 2026-05-29 | Session 2026-05-29 (afternoon). Pre-fill Option C confirmed live and working on all three Row I HM instruments. Critical Stripe URL fix applied to all three instruments -- STRIPE_SUBSCRIBE_URL_PLACEHOLDER replaced with live payment link plus dynamic token append. Paywall confirmed firing correctly after trial exhaustion -- decrement confirmed: brief allowed on session 5 (0 remaining shown), paywall fires on 6th request. Open issue: Subscribe button on live deployed instruments routes to root (index.html) instead of Stripe -- netlify.toml has no catch-all redirect -- Netlify 404 fallback suspected -- unresolved at session close. Next session: diagnose Netlify file-serving issue for instrument HTML files. HMBDL updated to v6. BIS updated to v1.4. |
| v1.11 | 2026-05-30 | Structural | Session 2026-05-30. HM Stripe payments conduit fully established and confirmed end-to-end. Netlify file-serving issue resolved: Netlify cached deploy (All files already uploaded) prevented updated instrument files from going live -- delete/re-upload method confirmed as the reliable fix. Stripe webhook architecture redesigned from browser-side thankyou.html call to Stripe-direct webhook event: new endpoint L3V3L Human Mastery Webhook (we_1TcfCqPT8MspgQa4vVsqHNu2) registered in Stripe dashboard, listening to checkout.session.completed. STRIPE_WEBHOOK_SECRET (whsec_yti7Zjj9m0qMrayBj3hebXkggQsYDuLg) added to Supabase HM project secrets. hm-stripe-webhook Edge Function rewritten -- verifies Stripe signature, reads client_reference_id from event, upgrades hm_trials to subscribed (uses_remaining: 99999), sends confirmation email. Full payment flow confirmed live: paywall fires correctly -- Subscribe routes to Stripe checkout -- real payment processed -- hm_trials upgraded to subscribed -- confirmation email delivered with access code and instrument link. Three test subscriptions created and cancelled. HM Service 4 infrastructure table: Stripe subscription updated to LIVE. HMBDL updated to v7. BIS updated to v1.5. |
| v1.12 | Structural | Session 2026-05-31. BM Stripe payments conduit built. bm_trials table created in Supabase wljxufilyobwpbavvwsr (4 uses, suite-wide count). Edge Functions deployed: bm-trial-signup, bm-trial-validate, bm-stripe-webhook (all JWT off). Resend domain level33businessmastermind.com verified. Five BM Supabase secrets confirmed. Stripe BM product: L3V3L Business Mastermind Suite $59 USD/month, payment link https://buy.stripe.com/dRm6oJ7SB1j5366gBbdQQ02. Stripe webhook registered (checkout.session.completed). Strategy v5, Marketing v5, Negotiation v10 built with token validation, paywall, ?prefill=1 full acceleration, session counter badge in header. BM index updated with email modal and token passthrough. Paywall confirmed firing and routing to Stripe. Known failure: SB_SERVICE_ROLE_KEY must be legacy eyJ JWT format -- new-style sb_secret_ key rejected by PostgREST. Open: prefill from index email link token stops at intake (fix next session). BM Service 2 infrastructure: free trial LIVE, Stripe subscription PENDING end-to-end confirmation. BDL updated to v10. BIS updated to v1.6. |
| v1.13 | Structural | Session 2026-05-31 (second session). Decision 17: prefill acceleration fully resolved across all three BM machines -- root cause was inferior inline pattern vs HM-proven load+intercept pattern; three distinct failures identified and fixed. Decision 18: session counter resolved -- bm-trial-validate updated with peek mode ({ peek: true } returns uses_remaining without decrementing); all three machines updated with peek-on-load call; Marketing Machine confirmed: 4 SESSIONS REMAINING on load, 3 SESSIONS REMAINING after brief. Full BM trial flow confirmed end-to-end: email modal, token, machine access, counter on load, prefill to brief, counter decrement, paywall, Subscribe to Stripe. Open: post-payment webhook flow not yet live-tested. BDL updated to v11. BIS updated to v1.7. |
| v1.13.4 | Patch -- Svc 4 | 2026-06-16. CORRECTION (Document Integrity Protocol) -- not a new build session, a reconciliation pass during Scriptuverse architecture work. Platform Overview table (Service 4 row) was showing Stack Status: IN BUILD and Launch Status: PENDING -- stale relative to this document's own v1.11 entry, which already recorded the HM Stripe payments conduit as fully live end-to-end (free trial, subscription, and webhook all confirmed working on 2026-05-30). Jamie confirmed direct, current access at https://level33humanmastery.com/ this session. Both cells corrected to LIVE / LIVE. No other content in this document was changed -- this is a status-cell update per the Update Protocol, not a structural revision. |
| v1.14 | Structural | Session 2026-06-18, Scriptuverse Section 7 crisis-triage architecture work. New PLATFORM ALERTS section added -- a standing-issue tracker distinct from Platform Decisions, for items requiring periodic re-verification rather than one-time resolution. First Alert logged: crisis-triage detection and response design across all three services with live or designed crisis-routing logic (Personal Support, No More Mistakes, Scriptuverse) was found to rely on an unexamined single-instruction approach with no grounding in real crisis-intervention protocol. Researched and adopted as the new floor: the published 988 Suicide and Crisis Lifeline imminent-risk definition (desire, intent, capability; plan/means/timeframe/intent) as the detection reference point, with Scriptuverse’s actual trigger threshold set deliberately lower given adaptive multi-turn intake’s greater conversational surface; Crisis Text Line’s stay-present model (continue the conversation rather than hard-exit to a static screen) adopted in place of the full-pipeline-exit pattern Scriptuverse’s Refuge test had used; a hard database write on threshold crossing for liability and continuity, independent of conversation flow; automated emergency-services alerting explicitly out of scope given no service maintains verified personal or location data. Adopted as alignment to current published state-of-the-art protocol rather than a one-time individual clinical sign-off, per Jamie’s reasoning that individual clinical calibration opinions genuinely vary and an unreachable single-expert consensus should not gate launch. Logged as a recurring Alert specifically so this research does not go stale as crisis-intervention best practice itself continues to evolve. |
| v1.15 | Structural | Session 2026-06-18, continued -- Scriptuverse Section 7 fully closed out (both crisis-triage and doctrinally-contested-topic triage halves) and ScriptBDL reached v21. Crisis-triage system-prompt language (deference to Claude’s own trained crisis-response behavior, the [[SV_CRISIS]] marker scheme) drafted, line-edited, and locked. Database-logging design finalized to the narrowest privacy-protective form: only the fact that crisis resources were surfaced is recorded, never message content in any form. Doctrinally-contested-topic triage designed from research into YouVersion’s editorial policy, church-leadership AI-adoption data, and the NEDA/Tessa chatbot failure -- resolving a real tension between not introducing contested battlegrounds unprompted and answering genuine doctrinal questions completely, with documented scriptural harm (spiritual abuse, exploitative prosperity theology) carved out as a boundary condition requiring direct moral clarity rather than neutral both-sidesing. Hedged, diplomatic language adopted as a hallucination-consequence mitigation in contested-doctrine territory specifically. New PLATFORM ALERTS entry added this version: a platform-wide accuracy/fact-checking mitigation mechanism was flagged as needed -- not a uniform check on every response given token cost, but triggered with prudence at critical junctures -- referencing PrecisionSteps’ existing ’weapons-free’ rules of engagement as the starting precedent rather than a mechanism invented from scratch. Two implementation tasks remain formally tracked but deferred: Edge Function marker-handling logic (Section 9 / build-time), and carrying the new crisis-triage system-prompt language into Personal Support’s and No More Mistakes’ own governing documents. Taxonomy v0.3 renumbering remains separately outstanding. Forward plan: the full ten-section Scriptuverse specification draft is the next major undertaking, with all four instruments tested and Section 7 fully designed. |
| v1.16 | 2026-07-02 | Structural | Session 2026-07-02, Scriptuverse retrieval and launch-planning reconciliation. Scriptuverse added as Service 6 -- Governing Documents, Infrastructure, and Outstanding Actions sections added, mirroring the existing per-service pattern. Platform Overview table updated with Scriptuverse's row (NOT STARTED / PENDING, consistent with Causal Parallax's existing NOT STARTED entry, since no deployment infrastructure exists yet despite the specification and design work being extensive). ScriptBDL reached v31 this session: Decision 75 locks the $9.99/month launch price; Decision 76 confirms the true-blitzscale minimum-viable build path to first paid subscriber (Counsel Instrument HTML, crisis-marker Edge Function integration, Shape B auth build-out, Stripe live under "Jamie Hill" with a parallel Ontario trade-name registration for Scriptuverse, and one live end-to-end crisis-path test held as the single non-negotiable gate), with Refuge included in the launch row per the already-locked Decision 66. Stripe legal-entity sequencing (launch under "Jamie Hill" now versus holding for Grand River Hills Technologies Inc. incorporation) remains genuinely open, tracked below. |
| v1.17 | 2026-07-02 | Alert | Session 2026-07-02, continued. Confirmed directly at the Supabase dashboard: qtnnaeozugmcjlwrntwn (previously flagged in Service 2 Infrastructure as requiring separation before CP launch) contains both Corporate Prediction Service tables and pre-rebrand Level 33 Tutorials tables -- one project serving two services. Service 2 Infrastructure row updated with direct confirmation. New Platform Alert added, broadening this from a CP-launch gate to a platform-wide scaling-hygiene item, since Jamie named it as exactly that ("too messy for scaling"), not something scoped only to Corporate Prediction. Cross-referenced to ScriptBDL v39, Decision 84. |
| v1.18 | 2026-07-03 | Alert | Session 2026-07-03. New Platform Alert: PrecisionSteps Tutorials' Resend domain still shows level33tutorials.com, not precisionstepstutorials.com, surfaced incidentally while configuring Scriptuverse's own Resend domain. Not investigated further -- flagged as its own separate item per Jamie's instruction. Cross-referenced to ScriptBDL v45, Decision 92. |
| v1.19 | 2026-07-08 | Structural | Session 2026-07-08. Scriptuverse's Stripe payment architecture built for the first time, then rebuilt mid-session to clone HM's own validated Payment-Link + manual-signature-verification pattern rather than keep a first draft based on general Stripe practice (ScriptBDL Decision 114). Refuge's Output structure and Layer 1 wording corrected against the actual Refuge Run 1 worked example, superseding an earlier decision-only synthesis (Decision 115). ?prefill=1 test acceleration added to Counsel and Refuge for the first time -- a real BIS v1.7 Section 3.8 compliance gap, now closed -- requiring a module-script adaptation flagged back to BIS itself, now v1.8 (Decision 116). That block's canonical test content was then genericized ahead of live deployment after a real risk was identified (Decision 117); the feature itself was evaluated for removal and deliberately retained, consistent with BIS's own standing precedent. Service 6 table and outstanding-actions updated accordingly below: Stripe product moved from NOT STARTED to PARTIAL (code ready, Payment Link creation still pending in the Stripe Dashboard); Ontario Business Name Registration and the Stripe legal-entity-sequencing question both closed out, per Jamie's direct confirmation this session that OBR registration has landed; one new standing pre-launch gate added (manual full test of both instruments, no prefill, to be flagged to Jamie for explicit confirmation before going live). |
| v1.20 | 2026-07-08 | Alert | Session 2026-07-08, continued. Refuge's intake screen given a blue action-label instruction line ("Please provide your answers to these questions") and a small Crimson Pro footer identifier ("SCRIPTUVERSE · Refuge") below the Continue button -- both added to scriptuverse-shared.css so they're available platform-wide, not Refuge-specific. New Platform Alert added: scriptuverse-shared.css's @media print block (ScriptBDL Decision 113) appears missing from the file, surfaced incidentally during this same edit -- see Platform Alerts. Also newly open, tracked but not resolved: whether the platform's blue "action colour" convention should be reserved strictly for active prompts rather than passive status confirmations, surfaced when today's new trial/session-counter line became a third blue element on the front door's post-sign-in state. |
| v1.21 | 2026-07-08 | Structural | Session 2026-07-08, continued. Refuge run live for the first time on record, full pipeline, confirmed successful (ScriptBDL Decision 118) -- this satisfies Decision 117's manual-test gate for Refuge specifically; Counsel's own equivalent test remains open. The print-CSS Platform Alert logged in v1.20 is now CLOSED: Refuge's own PDF export confirmed the @media print block was genuinely missing, restored per Decision 113's original spec (Decision 119). Refuge's reset-button label changed from the ambiguous "Come Back Again" to "Share Something New"; Counsel's "Bring Another Question" confirmed as the standing cross-instrument pattern for that button rather than replaced (Decision 120). |
| v1.22 | 2026-07-09 | Structural | Session 2026-07-09. Counsel's manual pre-launch test confirmed closed by Jamie -- Decision 117's standing gate is now fully satisfied for both instruments (ScriptBDL Decision 133). A real regression against Decision 96 was found and fixed: the front door's sign-in/tradition/session-count status lines had been carrying the blue action-colour treatment unconditionally instead of clearing to a passive confirmation once resolved (ScriptBDL Decision 125), and a matching "veteran" rule now un-bolds those same lines, plus the value-prop headline's color, once a user is subscribed or down to their last free session (Decisions 126, 132). Instrument-switching resolved as front-door-only, per Jamie's explicit choice given more instruments are coming; both instruments' header wordmarks now link back (Decision 124). Several smaller UI fixes closed out in the same pass: Counsel brought to visual parity with Refuge (Decision 122), a title-case convention established for non-sentence status copy (Decision 128), the exhausted-trial message's subscribe text made a real clickable link (Decision 129), the front door's stale "Visual shell" footer replaced with permanent brand copy and corrected spacing (Decisions 127, 130), and a vestigial, non-functional dropdown chevron removed from the Counsel/Refuge tiles (Decision 131). Separately, and most consequential for what comes next: Jamie confirmed Netlify has never been part of Scriptuverse's build (all testing to date, including this session's, has run against a local Python dev server) and the GitHub repo proposed earlier still doesn't exist -- both now locked as required *before* Stripe activation, reordering the Stripe-phase-next assumption this document's own outstanding-actions table had been carrying (ScriptBDL Decision 134). Service 6's own Governing Documents and Infrastructure tables, found stale relative to this document's own top-level changelog (a real inconsistency, flagged by a prior session's Claude instance and reconciled here), are corrected below to reflect actual current state. |
| v1.23 | 2026-07-09 | Structural | Session 2026-07-09, continued. Jamie corrected v1.22's sequencing: the live crisis-path test does not need to precede Stripe activation -- it belongs immediately before the first promotional effort, since that is what constitutes "launch" (everything technically live, plus active promotion beginning) -- the first time this document has given "launch" an explicit definition (ScriptBDL Decision 135). Corrected sequence: Netlify -> GitHub -> Stripe -> final integrated pass -> live crisis-path test -> launch. Claude now leads execution of this sequence directly, one confirmed increment at a time, per Jamie's standing instruction. Outstanding Actions table below reordered accordingly. |
| v1.24 | 2026-07-09 | Structural | Session 2026-07-09, continued. Decision 135's corrected sequence executed through its first two steps. GitHub repo created (`Scriptuverse`, no `l3v3l-` prefix -- consistent with Decision 68's jettison aspiration, not the older platform convention) and populated: `docs/ScriptBDL`, root HTML/CSS/SQL files, and an `edge-functions/` folder of version-controlled reference copies (ScriptBDL Decisions 136-139). A real Netlify entry-point gap was found before it could cause a live 404 -- the front door renamed `scriptuverse-front-door-shell.html` -> `index.html`, matching HM's own existing precedent, with four internal links updated to match (Decision 140). Netlify site created after a GitHub-App repository-visibility snag (Decision 141); build settings confirmed blank across the board, with the Functions-directory field deliberately left empty since that field means Netlify Functions specifically -- not a home for the Supabase Edge Function reference copies -- and Netlify Functions are explicitly rejected platform-wide per BIS's own 20-22 second timeout finding (Decision 142). First live deploy confirmed at `scriptuverse.netlify.app`; Supabase's auth redirect allow-list updated to include the live URL alongside `localhost:8000` (Decision 143). Signed-out state confirmed correct on the live host; a full instrument re-test was judged unnecessary since no application logic changed tonight, but two specific never-tested live paths were named instead: the auth redirect itself, and Decision 129's clickable subscribe link (Decision 144). Custom domain (`scriptuverse.com`) confirmed still not pointed at Netlify -- named as the next concrete step, ahead of Stripe, so its redirect URLs only need configuring once (Decision 145). One unrelated item surfaced and parked, logged below as a new Platform Alert rather than a Scriptuverse decision: whether `l3v3l-Negotiation-Machine` is genuinely the deploy source for BM's live Negotiation machine, tied to BM's pending rename to QuVivant Business Clarity. |
| v1.25 | 2026-07-09 | Structural | Session 2026-07-09, continued and closing. Custom domain fully wired: DNS records added in Cloudflare (CNAME flattening on the apex to `apex-loadbalancer.netlify.com`, plain CNAME for `www` to `scriptuverse.netlify.app`), propagation and Let's Encrypt certificate confirmed, and `www.scriptuverse.com` set as primary per Jamie's explicit choice to avoid a later performance-vs-rework tradeoff (ScriptBDL Decisions 146-149). Both `scriptuverse.com` and `www.scriptuverse.com` confirmed live with a valid certificate. Session closes with two items explicitly flagged as still open, not quietly resolved: Supabase's redirect allow-list was never confirmed updated for the custom domain, and the live sign-in test itself remains unconfirmed -- both are the correct opening items for the next session, before Stripe activation begins (Decision 150). Service 6's Infrastructure table and Outstanding Actions below updated accordingly. Separately, Jamie confirmed he now owns CorporatePrediction.com, intended to eventually replace level33corporatepredictions.com -- logged as a note in Service 2's Outstanding Actions, no DNS/Netlify work done, deliberately deferred to the next session actually touching Corporate Prediction. |

# **PLATFORM OVERVIEW -- FIVE SERVICES**

| **SERVICE** | **SUITE** | **DOMAIN URL** | **STACK STATUS** | **LAUNCH STATUS** |
| --- | --- | --- | --- | --- |
| PrecisionSteps Tutorials | Consumer / EdTech | level33tutorials.com | LIVE | LIVE |
| Corporate Prediction Service | Enterprise | level33corporatepredictions.com | NEAR READY | PENDING |
| Business Mastermind | B2B / Corporate | level33businessmastermind.com | IN BUILD | PENDING |
| Human Mastery Service | Consumer | level33humanmastery.com | LIVE | LIVE |
| Causal Parallax | Pro / Institutional | level33parallax.com | NOT STARTED | PENDING |
| Scriptuverse | Wisdom Instrument / Consumer | scriptuverse.com | IN BUILD | PENDING |

MVL Launch Strategy: Simultaneous promotion of four services -- PrecisionSteps (live) + Corporate Prediction + Business Mastermind (Tiers 1+2, 3 machines) + Human Mastery (Tiers 1+2, 3 instruments live). Causal Parallax launches independently on its own timeline.

# **PLATFORM FEATURE ROADMAP**

*This section tracks planned features that apply across multiple services. These are not machine builds -- they are UX and infrastructure additions to be layered on top of the deployed machine/instrument architecture. Logged here to prevent omission at launch and to guide post-launch build cadence.*

## **Feature 1 -- PDF Export of Machine / Instrument Output Briefs**

| **PARAMETER** | **DETAIL** |
| --- | --- |
| Feature | User can export any generated brief as a formatted PDF from within the machine/instrument page |
| Rationale | B2B use case: a BM user needs to print or email a brief to a manager or stakeholder (e.g. for subscription approval or board presentation). Consumer use case: an HM user wants a permanent record of guidance received. |
| Applies to | All services -- Business Mastermind (priority), Human Mastery, Corporate Prediction |
| Implementation approach | Client-side PDF generation using a JS library (e.g. jsPDF or html2pdf.js) triggered by a Print / Export PDF button on the brief output screen. No server-side component required. Formatted output should preserve phase headings, citation block, and L3V3L branding. |
| UX placement | Button appears on brief output screen only -- not during intake. Label: Export Brief as PDF. |
| Priority | HIGH -- required before BM launch. A BM subscriber presenting a brief to her manager needs this at first use. |
| Status | PENDING -- not yet built on any service |

## **Feature 2 -- Session History with Response Archive**

| **PARAMETER** | **DETAIL** |
| --- | --- |
| Feature | Users can view and retrieve their past machine/instrument sessions and the briefs generated |
| Rationale | A parent who received parenting guidance three sessions ago but did not download or print the brief needs to be able to retrieve it. A BM user running multiple strategy scenarios over several weeks needs a session log. Without history, every brief is ephemeral and valuable output is lost. |
| Applies to | All services -- Human Mastery (priority for consumer retention), Business Mastermind, Corporate Prediction |
| Implementation approach | Supabase table per service storing: user email (or session token), machine/instrument name, timestamp, brief HTML or text. Retrieval UI on the service index page: a My Sessions link that opens a modal or page showing session history with date, machine used, and a View / Re-export option. |
| Data retention | TBD -- minimum 90 days recommended. Longer retention is a premium subscription differentiator. |
| Authentication dependency | Full history requires linking sessions to a user account. Free trial users could have limited history (current session only). Paid subscribers get full persistent history tied to their email. |
| Priority | HIGH -- required for consumer trust on HM. Medium for BM (B2B users tend to self-document). Critical for Corporate Prediction where each prediction is a significant deliverable. |
| Status | PENDING -- not yet built on any service. Supabase schema design required before implementation. |

## **Feature 3 -- Consumer Landing Pages**

| **PARAMETER** | **DETAIL** |
| --- | --- |
| Feature | Dedicated marketing landing page per service that converts cold visitors into trial email submissions before showing the service index |
| Decision confirmed | Human Mastery: REQUIRES a dedicated landing page. Consumer audience needs orientation before handing over an email. Value proposition must be visceral and personal. Business Mastermind: NO separate landing page. B2B audience responds better to seeing the product directly. The BM index page with its 12 machines in a dark gold grid is the pitch. Email input appears as a modal triggered when a locked machine is clicked. |
| HM landing page requirements | Warm parchment/gold design system. Above the fold: single resonant line about the service. One CTA: Enter your email for 5 free sessions. Below fold: brief description of what each row of instruments offers. No lengthy copy. |
| BM email modal requirements | Triggered by clicking any locked machine on the index. Dark gold design system. Minimal: email input + Submit for 4 free sessions + brief one-line description. |
| Priority | HIGH -- HM landing page required before HM launch promotion begins. |
| Status | PENDING -- not yet built on any service |

## **Feature 4 -- Free Trial Architecture (All Services)**

| **PARAMETER** | **DETAIL** |
| --- | --- |
| Confirmed model | Email-gated free trial -- same pattern as PrecisionSteps. User submits email, Resend delivers access token, Supabase validates token on each machine/instrument call. |
| Trial limits confirmed | Business Mastermind: 4 uses total across all machines. Human Mastery: 5 uses total across all instruments. |
| Counting unit | Each machine/instrument run that produces a brief = 1 use. Partial sessions (L1 answered but no brief generated) do not count. |
| Scope of trial access | Trial token grants access to ALL machines/instruments on the service index, including those marked In Development. The index page communicates which are live vs. in development -- the trial does not restrict by tier. |
| Conversion path | Trial exhausted → Stripe subscription page. In-progress brief completes; paywall appears on next session attempt. |
| Stack | Resend (email delivery) + Supabase (token storage and use-count tracking) + Stripe (subscription activation). No Render server required for BM or HM -- Supabase Edge Functions handle AI proxy. Render is Corporate Prediction only (Node.js/Express architecture). |
| Priority | CRITICAL -- required before any launch promotion begins. |
| Status | PENDING -- not yet built on any service. HM free trial to be built first. |

# **GITHUB REPOSITORY REGISTRY**

Account: github.com/jamie1112h-design   |   Verified: 2026-05-25

| **REPOSITORY** | **LANG** | **SERVICE** | **NOTES** |
| --- | --- | --- | --- |
| Level33Tutorials | HTML | PrecisionSteps Tutorials | Public. Live production. |
| l3v3l-prediction-machine | JS | Corporate Prediction Service | Private. Netlify static + Render API. Last commit May 16. |
| l3v3l-business-mastermind | HTML | Business Mastermind | Main service repo -- level33businessmastermind.com |
| l3v3l-business-mastermind-index | HTML | Business Mastermind | Machine selection index page -- level33businessmastermind.com root |
| l3v3l-Negotiation-Machine | HTML | Business Mastermind | Negotiation Machine v10 (live). Build Decisions Log in /docs -- MANDATORY READ before every BM session. |
| level33humanmastery | HTML | Human Mastery Service | Renamed from Level33MastermindPersonal 2026-05-28. HMBDL v3 and Index live. Three Row I instrument HTML files deployed. |

# **SUPABASE PROJECT REGISTRY**

Dashboard: supabase.com/dashboard   |   Provider: AWS ca-central-1   |   Verified: 2026-05-25

**⚠ SUPABASE PRO UPGRADE CONFIRMED: jamie1112h-design Org upgraded to Pro 2026-05-28. Free tier 2-project limit removed. All future project creation proceeds without limit constraint.**

| **PROJECT NAME** | **REFERENCE ID** | **SERVICE(S)** | **NOTES** |
| --- | --- | --- | --- |
| jamie1112h-design's Project | qtnnaeozugmcjlwrntwn | SHARED | Shared: PrecisionSteps + Corporate Prediction. NOTE: Human Mastery has been separated into dedicated project below. Corporate Prediction separation still required before CP launch. |
| l3v3l-business-mastermind | wljxufilyobwpbavvwsr | Business Mastermind | Dedicated. All AI proxy calls via Supabase Edge Functions -- NOT Netlify. negotiate, strategy, marketing Edge Functions confirmed working. |
| l3v3l-human-mastery | spjzyrotuiqgdmtldswb | Human Mastery Service | Dedicated. Created 2026-05-28 post Pro upgrade. AWS ca-central-1. parenting, relationships, personal-support Edge Functions live. JWT off on all three. ANTHROPIC_API_KEY confirmed in secrets. |

## **Supabase Open Items**

| **ITEM** | **STATUS** | **ACTION REQUIRED** |
| --- | --- | --- |
| Create dedicated Supabase project for Corporate Prediction | PENDING | qtnnaeozugmcjlwrntwn currently shared with PrecisionSteps. Separate before Corporate Prediction launch. |
| Causal Parallax Supabase project | NOT STARTED | New project required at build start. |

# **SPECIFICATION DOCUMENT REGISTRY**

## **Corporate Prediction Service -- 10-Document IP Portfolio**

| **DOCUMENT** | **VERSION** | **STATUS** |
| --- | --- | --- |
| PSS Multi-dimensional Confidence Framework | v1.0 | COMPLETE |
| Signal Taxonomy and Signal Density Architecture | v1.0 | COMPLETE |
| Prediction Provenance Configuration Fingerprinting System | v1.0 | COMPLETE |
| Butterfly Trigger Chain Excavation Methodology | v1.0 | COMPLETE |
| Causal Node Architecture: CCM + DCC | v1.0 | COMPLETE |
| PSS Recalibration Governance Framework | v1.0 | COMPLETE |
| Dynamic Indicator Discovery | v1.0 | COMPLETE |
| Prediction Monitoring and Alert System | v1.0 | COMPLETE |
| Prediction Lineage Chain -- Amendment A | v1.0 | COMPLETE |
| BTCE Industry Sensitivity Ranking | v1.0 | COMPLETE |

## **Causal Parallax Service**

| **DOCUMENT** | **VERSION** | **STATUS** |
| --- | --- | --- |
| Causal Parallax Service Specification | v2.0 | COMPLETE |

## **Business Mastermind Service**

| **DOCUMENT** | **VERSION** | **STATUS** |
| --- | --- | --- |
| L3V3L Business Mastermind Build Decisions Log (BDL) | v9 -- Living | CURRENT |
| Negotiation Machine Specification | v2.0 | COMPLETE |
| Negotiation Machine RTTR Specification | v1.0 | COMPLETE |
| Strategy Machine Specification | v1.0 | COMPLETE |
| Marketing Machine Specification | v1.0 | COMPLETE |
| Machine Selection Index | -- Living | CURRENT |
| Machine Delineation Documents (all 12) | v1.0 each | COMPLETE |

## **Human Mastery Service**

| **DOCUMENT** | **VERSION** | **STATUS** |
| --- | --- | --- |
| Human Mastery Build Decisions Log (HMBDL) | v3 -- Living | CURRENT -- 24 decisions. Uploaded to GitHub /docs required. |
| Instrument Selection Index | -- Living | LIVE -- deployed as index.html 2026-05-28 |
| Parenting Instrument Specification | v2.0 | COMPLETE -- 2026-05-28 |
| Relationships Instrument Specification | v2.0 | COMPLETE -- 2026-05-28 |
| Personal Support Instrument Specification | v2.0 | COMPLETE -- 2026-05-28 |

## **Planned -- Not Yet Started**

| **DOCUMENT** | **SERVICE** | **STATUS** |
| --- | --- | --- |
| Human Mastery Service Specification | Human Mastery | NOT STARTED |
| Platform Subscription and Pricing Architecture | Platform | NOT STARTED |
| Cross-Service Promotion Strategy | Platform | NOT STARTED |
| PrecisionSteps Tutorials Product Specification | PrecisionSteps | NOT STARTED |

## **IP Asset Portfolio -- Invention Machine and Supporting Frameworks**

| **DOCUMENT / ASSET** | **VERSION** | **STATUS** | **NOTES** |
| --- | --- | --- | --- |
| APLEXP Delta Forge -- Formal Apparatus | v1.1 | COMPLETE | Physical invention reasoning protocol. Underpins Invention Machine. |
| LambFars (LAMRFS) | v1.0 | COMPLETE | 11-dimension mathematical workaround framework for LLM physical reasoning. |
| Interface PDO -- Threshold Physics Framework | v1.0 | COMPLETE | 11-dimension threshold/liminal zone delineation. Companion to LambFars. |
| Progressive Dimensional Optimization (PDO) -- Seven-Dimensional Law | v1.0 | COMPLETE | Meta-framework for domain dimensionality. |
| Invention Machine -- 30-Parameter Questionnaire Framework | v1.0 | COMPLETE | 25 core + domain classifier + 5 conditional. Two full simulations validated. |
| Vibe-Engineering to CAD -- Concept Paper | v1.0 | CONCEPT | Invention Machine to OpenSCAD batch command generation. Not yet built. |
| Machine Delineation Documents (all referenced) | v1.0 each | COMPLETE | Human Mastery and Business Mastermind suite machine delineations. |

# **PLATFORM DECISIONS**

This section records strategic platform-level decisions made across sessions. These are confirmed, not provisional.

| **DECISION** | **DETAIL** | **DATE CONFIRMED** |
| --- | --- | --- |
| MVL simultaneous launch -- four services | PrecisionSteps (live) + Corporate Prediction + Business Mastermind (Tiers 1+2) + Human Mastery (Tiers 1+2). Causal Parallax independent. | 2026-05-25 |
| Causal Parallax independent launch | Launches on its own timeline separate from the four-service MVL bundle. | 2026-05-25 |
| Document Reference Protocol | BDL (living) and Platform Sitrep (living) remain separate documents. Fixed specs carry permanent version numbers. Living documents show 'vN -- Living'. | 2026-05-25 |
| Supabase Edge Functions -- mandatory architecture | All BM and HM AI proxy calls via Supabase Edge Functions. Netlify serverless functions have a hard ~20-22 second timeout. Supabase Edge Functions have no meaningful timeout. | 2026-05-25 |
| Netlify direct API calls -- DO NOT USE for AI proxy | Attempted and failed. 504 Inactivity Timeout at ~20-22 seconds regardless of plan. All Anthropic API calls for BM and HM must route through Supabase Edge Functions. | 2026-05-25 |
| Render -- Corporate Prediction only | Render ($7/month Node.js Express server) is used exclusively for the Corporate Prediction Service 4-call chain architecture. BM and HM do not use Render. Render is not a replacement for Resend -- they serve different functions: Render hosts the CP API server; Resend sends transactional email. | 2026-05-28 |
| Trilingual sequencing policy | Human Mastery first (post-MVL launch, simpler architecture). Business Mastermind second. Corporate Prediction third (complex 4-call chain). Causal Parallax fourth. | 2026-05-25 |
| Machine rosters -- authoritative source | Select Machines 2.xlsx is the authoritative machine roster. Business Mastermind: 12 machines / 4 tiers. Human Mastery: 15 instruments / 5 tiers. | 2026-05-26 |
| Invention Machine -- IP asset, not current build | The Invention Machine is fully delineated and simulation-validated IP. Not part of current MVL build sequence. | 2026-05-26 |
| L3V3L Demo v8 -- investor demo artefact | Standalone HTML file for investor demos. 9 machines in a 3x3 grid. Calls Anthropic API directly from browser -- NOT a production service. Architecturally separate from all five deployed services. | 2026-05-26 |
| Human Mastery -- no separate Sitrep | The Platform Sitrep covers all five services. HMBDL covers HM build decisions; Sitrep covers HM status. No separate HM Sitrep. | 2026-05-27 |
| Human Mastery -- terminology convention | "machine" is used internally. "Instrument" is used in all subscriber-facing UI, marketing, and consumer-facing pages. Never expose "machine" to subscribers. | 2026-05-27 |
| Free trial model -- use-count gating | Trial limits enforced by use-count (each brief generated = 1 use), not time-limited. Use-count follows the user's actual rhythm and delivers value before the paywall. | 2026-05-28 |
| Free trial limits confirmed | Business Mastermind: 4 uses total across all machines. Human Mastery: 5 uses total across all instruments. Uses are counted suite-wide, not per machine. | 2026-05-28 |
| Free trial scope | Trial token grants access to ALL machines/instruments on the service index. The index page communicates which are live vs. in development -- the trial does not restrict by tier. | 2026-05-28 |
| BM -- no dedicated landing page | Business Mastermind does not require a separate landing page. The BM index with 12 machines in a dark gold grid is the pitch for a B2B audience. Email input appears as a modal triggered when a locked machine is clicked: 'Enter your email for 4 free sessions.' | 2026-05-28 |
| HM -- dedicated consumer landing page required | Human Mastery requires a dedicated landing page before launch promotion begins. Consumer audience needs orientation before submitting an email. HM landing page: warm parchment/gold design, single resonant headline, one CTA (Enter your email for 5 free sessions), brief instrument row descriptions below fold. | 2026-05-28 |
| Supabase Pro upgrade -- confirmed | jamie1112h-design Org upgraded to Supabase Pro 2026-05-28. Free tier 2-project limit removed. Three active projects now live: qtnnaeozugmcjlwrntwn (shared: PrecisionSteps + CP), wljxufilyobwpbavvwsr (BM dedicated), spjzyrotuiqgdmtldswb (HM dedicated). | 2026-05-28 |

# **PLATFORM ALERTS**

*This section tracks standing, recurring issues that require periodic re-verification rather than a one-time resolution -- distinct from Platform Decisions above, which are confirmed and closed. An Alert stays open across versions until explicitly retired, and should be actively raised for review at session starts touching the affected service(s), not just discovered by re-reading this document.*

| **ALERT** | **DETAIL** | **STATUS** | **RAISED** |
| --- | --- | --- | --- |
| Crisis-triage state-of-the-art alignment | Scriptuverse’s Section 7 crisis-triage design work (2026-06-18) surfaced that this is not a Scriptuverse-specific gap: Personal Support’s crisis-routing logic (a single override instruction, no defined detection threshold, hardcoded 988 number) and No More Mistakes’ Stage 0 Emotional First Response (anchor-phrase pacing only, no detection architecture) rely on the identical unexamined approach -- the model’s in-context judgment alone, with no grounding in real crisis-intervention protocol. Research this session (988 Suicide and Crisis Lifeline Suicide Safety Policy; Crisis Text Line’s published triage methodology; the Columbia-Suicide Severity Rating Scale) established the following as the adopted floor, in place of an invented or individually-sourced threshold: (1) detection is grounded in the real operational ’imminent risk’ definition used by crisis services -- stated desire/intent plus capability, or the plan/means/timeframe/intent combination -- with Scriptuverse’s own trigger set deliberately lower than that bar, since adaptive multi-turn intake (Layer 2) gives more conversational surface to read a person’s situation than a single static message would; (2) the action taken after detection follows the Crisis Text Line / Therabot precedent of staying conversationally present rather than hard-exiting to a static resource screen, since ending the conversation can itself produce a worse outcome; (3) a hard, non-conversational record is written to the user’s database the moment a threshold crossing is detected, for liability and continuity purposes, independent of how the conversation itself proceeds; (4) automated alerting of emergency services is explicitly out of scope at this stage, since none of the three services maintain the kind of verified personal or location data that would make automated dispatch responsible -- logged as a possible future direction only if that data posture changes. This was adopted as a published-protocol floor rather than a one-time individual clinical sign-off, per Jamie’s direct reasoning: individual clinical opinions on exact threshold calibration genuinely vary (the same way a second doctor’s diagnosis can differ from a first), so chasing a single authoritative sign-off risks both an unreachable standard and a false sense of final resolution. Aligning to the current published state of the art, and re-verifying that alignment periodically as the field’s own practice evolves, is the more honest and more achievable standard. This Alert exists so the obligation to re-verify is not lost to a single session’s research becoming silently stale -- crisis-intervention best practice itself has changed materially even within the last decade (Crisis Text Line’s own published history moved from a 50-word manual keyword list to a trained ML triage model as real conversation volume accumulated), and a frozen snapshot of 2026-06-18’s research should not be treated as a permanent design foundation. | OPEN -- recurring | 2026-06-18 |
| Platform-wide accuracy / fact-checking mitigation mechanism | Scriptuverse’s Section 7 doctrinally-contested-topic triage work (2026-06-18) surfaced a broader, platform-wide need: a provision for accuracy/fact-checking mitigation that is not applied uniformly to every response (token cost makes that impractical) but is triggered with real prudence at genuinely critical junctures -- contested theological attribution, factual claims with real consequence, and similar high-stakes moments across any L3V3L service, not Scriptuverse alone. Jamie named PrecisionSteps’ existing ’weapons-free’ rules of engagement as a working precedent already in production, and flagged the foreseeable risk of the platform eventually facing an accuracy or misinformation complaint without such a mechanism formally in place. This was deliberately logged rather than designed in the same session it was raised, consistent with the discipline already applied to crisis-detection threshold calibration: a platform-wide accuracy mechanism deserves its own dedicated session, starting from a real review of PrecisionSteps’ actual current rules of engagement as the pattern to extend, rather than being invented from first principles inside an unrelated Scriptuverse design session. This Alert exists to ensure the item is actively raised for a dedicated session rather than left to be rediscovered later -- logged as a recurring Alert, like the crisis-triage item above, rather than a one-time decision, since ’what counts as a critical juncture warranting a check’ and ’what the check itself should be’ both may reasonably evolve as the platform’s own services and their accuracy track record develop. | OPEN -- recurring | 2026-06-18 |
| Shared Supabase project not scaling-ready | qtnnaeozugmcjlwrntwn, previously logged in Service 2's own Infrastructure table as requiring separation before Corporate Prediction launch, was directly confirmed at the Supabase dashboard (2026-07-02) to contain both Corporate Prediction Service tables and tables from the pre-rebrand Level 33 Tutorials -- one project serving two services at once, a real departure from the one-project-per-service pattern every other live service (PrecisionSteps' own current infrastructure, HM, BM) follows. Jamie names this directly as "too messy for scaling," broadening the concern beyond a CP-launch gate to a platform-hygiene question: whether the Tutorials tables in this project are still live and load-bearing for PrecisionSteps' current site, or orphaned residue from before its own migration, is not yet determined (ScriptBDL Decision 84). This Alert exists so the separation work does not stay attached only to Service 2's own Outstanding Actions, where it could be read as CP-specific rather than as the platform-wide infrastructure-hygiene item it actually is. | OPEN -- recurring | 2026-07-02 |
| PrecisionSteps Resend domain mismatch | Surfaced while adding Scriptuverse's domain to the shared Resend account (2026-07-03): PrecisionSteps Tutorials' Resend domain entry is still registered as level33tutorials.com, not precisionstepstutorials.com, despite the PrecisionSteps rebrand (access codes, cookies, localStorage, live domain) being otherwise complete. Not investigated further per Jamie's own framing -- flagged as a separate thread, not urgent today. Open question: whether PrecisionSteps' actual live trial/confirmation emails still correctly route through this differently-named domain entry, or whether this is a real gap left over from the rebrand. | OPEN -- not investigated | 2026-07-03 |
| Scriptuverse print-CSS block possibly missing/reverted | Surfaced 2026-07-08 while adding a footer identifier to Refuge's intake screen: scriptuverse-shared.css's @media print block -- which ScriptBDL Decision 113 (2026-07-06) describes as already built, hiding .hero/.btn-row/.progress-wrap/.status-line so Counsel's Download PDF button produces a clean printout -- is not present in the copy of that file this session worked from. Not investigated further this session, since it surfaced incidentally and is outside the Stripe/Refuge/prefill thread already in progress. Open question: whether this is a real regression (the block was built 2026-07-06 and something since removed it) or the uploaded file simply predates that change. Flagged specifically to be raised again next time Counsel's Output screen is being worked on, not left to be rediscovered silently. | CLOSED -- confirmed via Refuge's first live PDF export (ScriptBDL Decision 118) that .hero/.btn-row/.progress-wrap/.status-line were printing; @media print block restored per Decision 113's original spec (Decision 119) | 2026-07-08 |
| BM's l3v3l-Negotiation-Machine repo: unclear whether it's the actual deploy source for the live Negotiation machine | Surfaced 2026-07-09 while diagnosing a Netlify GitHub-import visibility issue for an unrelated repo (Scriptuverse's own). Claude's first-pass assumption -- that this repo exists solely to hold the BM BDL in /docs and was never meant to be deployed, per its own description in BIS's repo table (Section 1.3: "BM / BDL... BDL in /docs -- MANDATORY READ before every BM session") -- was corrected by Jamie directly: Negotiation is one of BM's three live Row I machines (Strategy, Marketing, Negotiation), so this repo may need live Netlify access after all, contrary to Claude's assumption. Genuinely unresolved: whether the live Negotiation machine is actually served from l3v3l-Negotiation-Machine itself, or from l3v3l-business-mastermind (which BIS's table separately describes as holding "machine HTML files" generally), with the Negotiation-named repo serving only the BDL as BIS currently documents. Jamie explicitly deferred investigation to the session covering BM's pending rebrand to QuVivant Business Clarity, rather than resolving it as a side effect of Scriptuverse's own Netlify work. | OPEN -- not investigated | 2026-07-09 |

# **SERVICE 1  |  PRECISIONSTEPS TUTORIALS**

level33tutorials.com   |   Repo: Level33Tutorials (Public, HTML)

Stack: Netlify / Supabase qtnnaeozugmcjlwrntwn (SHARED -- see Supabase registry) / Stripe / Resend / Anthropic

## **Infrastructure**

| **COMPONENT** | **DETAIL** | **STATUS** |
| --- | --- | --- |
| Netlify hosting | Live production | LIVE |
| Supabase project | qtnnaeozugmcjlwrntwn -- confirmed. NOTE: shared with Corporate Prediction. Dedicated separation not required for PrecisionSteps -- only CP needs its own project. | CONFIRMED |
| Stripe live mode | Active -- first subscriber payment processed | LIVE |
| Resend transactional email | Post-payment welcome flow active | LIVE |
| Anthropic API (Claude Sonnet) | PrecisionStep generation engine | LIVE |
| Cookie-based session persistence | Safari ITP compatible | LIVE |
| EN / FR (Quebecois) / ES language toggle | Full trilingual support active | LIVE |

## **Outstanding Actions**

| **ITEM** | **PRIORITY** | **STATUS** | **TRIGGERS** |
| --- | --- | --- | --- |
| Promotion / marketing activation | High | PENDING | v1.1.1 |
| PDF export of lesson output | Medium | PENDING -- see Platform Feature Roadmap | Post-launch |
| Session history feature | Low | PENDING -- see Platform Feature Roadmap | Post-launch |

# **SERVICE 2  |  CORPORATE PREDICTION SERVICE**

level33corporatepredictions.com   |   Repo: l3v3l-prediction-machine (Private, JavaScript)

Stack: Netlify (static files) + Render (Node.js Express API) / Supabase qtnnaeozugmcjlwrntwn / Anthropic

Render server: https://l3v3l-prediction-api.onrender.com   |   Netlify: https://l3v3l-prediction-machine.netlify.app

**⚠ Render is used here because Corporate Prediction is a 4-call Node.js/Express chain -- NOT interchangeable with Resend. Resend handles email delivery; Render hosts the Express API server.**

## **Infrastructure**

| **COMPONENT** | **DETAIL** | **STATUS** |
| --- | --- | --- |
| Netlify -- static file hosting | l3v3l-prediction-machine.netlify.app | LIVE |
| Render -- Node.js Express API server | l3v3l-prediction-api.onrender.com -- $7/month Starter | LIVE |
| Supabase qtnnaeozugmcjlwrntwn | 14 tables, 27 RLS policies. Shared with PrecisionSteps. Dedicated project separation required before CP launch. CONFIRMED via direct dashboard check 2026-07-02 (ScriptBDL v39, Decision 84): both prediction-labelled tables and Level 33 Tutorials tables visually verified present in this single project. | LIVE -- SEPARATION REQUIRED |
| Anthropic API -- 4 Claude calls | Questionnaire / Indicator / DID / Prediction | PARTIAL |
| Authentication | Supabase auth confirmed. Org row created. | LIVE |
| Stripe subscription | Payment wall not yet activated | PENDING |

## **4 Claude API Calls -- Build State**

| **CALL** | **PURPOSE** | **LAST KNOWN STATE** | **STATUS** |
| --- | --- | --- | --- |
| 1 | Questionnaire generator -- 38Q adaptive intake | Produced genuine 38-question pharma intake. MAX_TOKENS 8000. | CONFIRMED |
| 2 | Indicator generator -- custom indicator universe | Claude confirmed processing full pharma scenario. Now 8000. | NEAR READY |
| 3 | DID engine -- gap candidate analysis | Not yet reached in testing. MAX_TOKENS 4000. | PENDING |
| 4 | Prediction generator -- PSS / GoodGate / BTCE / DCC | Not yet reached in testing. MAX_TOKENS 8000. | PENDING |

## **Outstanding Actions**

| **ITEM** | **PRIORITY** | **STATUS** | **TRIGGERS** |
| --- | --- | --- | --- |
| Run first complete prediction to completion | Critical | PENDING | v1.1.2 |
| Question numbering fix in index.js _renderQuestion() | High | PENDING | v1.1.2 |
| Output presentation / UX review post first prediction | High | PENDING | v1.1.2 |
| Stripe subscription activation | High | PENDING | v1.1.2 |
| Separate Supabase project from PrecisionSteps | Medium | PENDING | v1.2.0 |
| PDF export of prediction output | Medium | PENDING -- see Platform Feature Roadmap | Post-launch |
| Session history / prediction archive | High | PENDING -- see Platform Feature Roadmap | Post-launch |
| Promotion activation -- coordinate with MVL launch | High | PENDING | v1.1.2 |
| Wire CorporatePrediction.com (newly acquired by Jamie) to replace level33corporatepredictions.com | Medium | NOT STARTED -- domain ownership only, confirmed 2026-07-09; no DNS/Netlify work done yet, deliberately deferred to the next session actually touching this service, per Jamie's own framing | 2026-07-09 |

# **SERVICE 3  |  BUSINESS MASTERMIND SERVICE**

level33businessmastermind.com   |   Repos: l3v3l-business-mastermind + l3v3l-business-mastermind-index + l3v3l-Negotiation-Machine

Stack: Netlify / Supabase wljxufilyobwpbavvwsr / Stripe / Resend / Anthropic

**⚠ MANDATORY: Read Build Decisions Log from GitHub l3v3l-Negotiation-Machine /docs before every build session. All AI proxy calls via Supabase Edge Functions -- NOT Netlify functions.**

## **Governing Documents**

| **DOCUMENT** | **VERSION** | **LOCATION** | **TYPE** |
| --- | --- | --- | --- |
| Build Decisions Log (BDL) | v9 -- Living | GitHub: l3v3l-Negotiation-Machine /docs | MANDATORY -- read every session |
| Negotiation Machine Specification | v2.0 | GitHub: l3v3l-Negotiation-Machine /docs | Completed |
| Negotiation RTTR Specification | v1.0 | GitHub: l3v3l-Negotiation-Machine /docs | Completed |
| Strategy Machine Specification | v1.0 | GitHub: l3v3l-business-mastermind | Completed |
| Marketing Machine Specification | v1.0 | GitHub: l3v3l-business-mastermind | Completed |
| Machine Selection Index | Current | GitHub: l3v3l-business-mastermind-index | Living -- updates per machine |
| Machine Delineation Documents (all 12) | v1.0 each | Local / to be uploaded to GitHub | Completed |

## **Machine Roster -- 12 Machines / 4 Tiers (MVL = Tiers 1+2)**

Authoritative source: Select Machines 2.xlsx

| **T** | **MACHINE** | **FUNCTION** | **PROMPT** | **BUILD** | **MVL** |
| --- | --- | --- | --- | --- | --- |
| 1 | Strategy | Corporate strategy formation and stress-testing | COMPLETE | COMPLETE (v3) | Y |
| 1 | Marketing | Market positioning and campaign analysis | COMPLETE | COMPLETE (v4) | Y |
| 1 | Negotiation | Deal architecture and negotiation frameworks | COMPLETE | COMPLETE (v10) | Y |
| 2 | Market Gaps | Unoccupied market space identification | PENDING | PENDING | Y |
| 2 | Game Theory | Competitive dynamics and strategic sequencing | PENDING | PENDING | Y |
| 2 | Shifts + Trends | Macro trend identification and implication mapping | PENDING | PENDING | Y |
| 3 | Optimization | Process and performance improvement | PENDING | PENDING |  |
| 3 | Business Rescue | Distressed business turnaround analysis | PENDING | PENDING |  |
| 3 | Scenario Planning | Multi-future strategic scenario construction | PENDING | PENDING |  |
| 4 | Extrapolation | Long-range consequence projection | PENDING | PENDING |  |
| 4 | Competition | Competitor intelligence and response modeling | PENDING | PENDING |  |
| 4 | Acceleration | Growth lever identification and sequencing | PENDING | PENDING |  |

## **Infrastructure**

| **COMPONENT** | **DETAIL** | **STATUS** |
| --- | --- | --- |
| Netlify -- index live | level33businessmastermind.com | LIVE |
| Supabase wljxufilyobwpbavvwsr | Dedicated project. AWS ca-central-1. All three Row I Edge Functions confirmed working. | LIVE |
| Supabase Edge Function: negotiate | wljxufilyobwpbavvwsr/functions/v1/negotiate -- JWT off | LIVE |
| Supabase Edge Function: strategy | wljxufilyobwpbavvwsr/functions/v1/strategy -- JWT off | LIVE |
| Supabase Edge Function: marketing | wljxufilyobwpbavvwsr/functions/v1/marketing -- JWT off | LIVE |
| Negotiation Machine v10 | Deployed at monumental-sopapillas-d1862e.netlify.app. Activated from index. | LIVE |
| Strategy Machine v3 | Deployed. Activated from index. | LIVE |
| Marketing Machine v4 | Deployed. Activated from index. | LIVE |
| Stripe subscription | PENDING end-to-end confirmation. Product live: $59 USD/month. Payment link: https://buy.stripe.com/dRm6oJ7SB1j5366gBbdQQ02. Webhook registered. | PENDING |
| Resend transactional email | Post-payment and free trial access flows | PENDING |
| Free trial system | Email-gated. 4 uses total across all machines. Use-count tracked in Supabase. | LIVE |
| Email modal on index (trial entry) | Triggered by clicking any locked machine. No separate landing page. | PENDING |
| PDF export of machine briefs | See Platform Feature Roadmap | PENDING |
| Session history / brief archive | See Platform Feature Roadmap | PENDING |

## **Outstanding Actions**

| **ITEM** | **PRIORITY** | **STATUS** | **TRIGGERS** |
| --- | --- | --- | --- |
| Free trial system -- email modal + Supabase use-count tracking + Resend | Critical | PENDING | v1.1.3 |
| Stripe subscription activation | Critical | PENDING | v1.1.3 |
| PDF export of brief output | High | PENDING -- see Platform Feature Roadmap | Pre-launch |
| Session history / brief archive | Medium | PENDING -- see Platform Feature Roadmap | Post-launch |
| Promotion activation -- coordinate with MVL launch | High | PENDING | v1.1.3 |

# **SERVICE 4  |  HUMAN MASTERY SERVICE**

level33humanmastery.com   |   Repo: level33humanmastery (HTML)

Stack: Netlify / Supabase spjzyrotuiqgdmtldswb (Dedicated) / Stripe / Resend / Anthropic

**⚠ MANDATORY: Read HMBDL from GitHub level33humanmastery /docs before every build session. All AI proxy calls via Supabase Edge Functions -- NOT Netlify functions.**

## **Governing Documents**

| **DOCUMENT** | **VERSION** | **LOCATION** | **TYPE** |
| --- | --- | --- | --- |
| Human Mastery Build Decisions Log (HMBDL) | v3 -- Living | GitHub: level33humanmastery /docs (upload required) | MANDATORY -- read every session |
| Instrument Selection Index | Current -- Living | GitHub: level33humanmastery (root) | Living -- updates per instrument |
| Parenting Instrument Specification | v2.0 | GitHub: level33humanmastery /docs | Completed |
| Relationships Instrument Specification | v2.0 | GitHub: level33humanmastery /docs | Completed |
| Personal Support Instrument Specification | v2.0 | GitHub: level33humanmastery /docs | Completed |

## **Instrument Roster -- 15 Instruments / 5 Tiers (MVL = Tiers 1+2)**

Authoritative source: Select Machines 2.xlsx   |   Note: 'Instrument' is subscriber-facing; 'machine' is internal.

| **T** | **INSTRUMENT** | **FUNCTION** | **PROMPT** | **BUILD** | **MVL** |
| --- | --- | --- | --- | --- | --- |
| 1 | Parenting | Parenting challenges and child development guidance | COMPLETE | LIVE (v1) | Y |
| 1 | Relationships | Interpersonal dynamics and communication | COMPLETE | LIVE (v1) | Y |
| 1 | Personal Support | Personal challenges and emotional support framework | COMPLETE | LIVE (v1) | Y |
| 2 | Ethics + Wisdom | Ethical reasoning and values-based decisions | PENDING | PENDING | Y |
| 2 | Accelerate Learning | Learning acceleration techniques and systems | PENDING | PENDING | Y |
| 2 | Career + Psych Assessment | Career pathway and psychological self-assessment | PENDING | PENDING | Y |
| 3 | Creativity | Creative output and ideation frameworks | PENDING | PENDING |  |
| 3 | Happiness | Wellbeing, fulfilment, and life satisfaction | PENDING | PENDING |  |
| 3 | Personal Nutrition | Personalised nutrition analysis and guidance | PENDING | PENDING |  |
| 4 | Truth | Critical reasoning and belief examination | PENDING | PENDING |  |
| 4 | Enlightenment | Consciousness, meaning, and philosophical depth | PENDING | PENDING |  |
| 4 | Memories & Dreams | Memory, dream interpretation, identity | PENDING | PENDING |  |
| 5 | Preparedness | Personal risk, resilience, and contingency | PENDING | PENDING |  |
| 5 | Self-Understanding | Identity, strengths, and self-knowledge | PENDING | PENDING |  |
| 5 | Homeopathy + Naturopathy | Natural health modalities and integrative wellness | PENDING | PENDING |  |

## **Infrastructure**

| **COMPONENT** | **DETAIL** | **STATUS** |
| --- | --- | --- |
| Netlify -- site live | level33humanmastery.com -- primary domain. level33mastermindpersonal.com retained as alias. | LIVE |
| GitHub repo | github.com/jamie1112h-design/level33humanmastery -- renamed 2026-05-28 | LIVE |
| Supabase spjzyrotuiqgdmtldswb | Dedicated HM project. AWS ca-central-1. Created 2026-05-28 post Pro upgrade. | LIVE |
| Supabase Edge Function: parenting | spjzyrotuiqgdmtldswb/functions/v1/parenting -- JWT off -- ANTHROPIC_API_KEY confirmed | LIVE |
| Supabase Edge Function: relationships | spjzyrotuiqgdmtldswb/functions/v1/relationships -- JWT off | LIVE |
| Supabase Edge Function: personal-support | spjzyrotuiqgdmtldswb/functions/v1/personal-support -- JWT off | LIVE |
| Instrument Index (index.html) | All 3 Row I instruments active. 'Instruments Below Are In Development' banner deployed between Row I and Row II. | LIVE |
| Row I instruments (HTML) | L3V3L_HM_Parenting_v1.html, L3V3L_HM_Relationships_v1.html, L3V3L_HM_PersonalSupport_v1.html -- all deployed | LIVE |
| Domain | level33humanmastery.com -- registered Cloudflare 2026-05-28. DNS live. CNAME records in Cloudflare. SSL via Netlify. | LIVE |
| Stripe subscription | Not yet activated | PENDING |
| Resend transactional email | Post-payment and free trial access flows | PENDING |
| Free trial system | Email-gated. 5 uses total across all instruments. Use-count tracked in Supabase. | PENDING |
| Consumer landing page | Required before launch promotion. Warm parchment/gold design. See Platform Feature Roadmap. | PENDING |
| PDF export of instrument briefs | See Platform Feature Roadmap | PENDING |
| Session history / brief archive | See Platform Feature Roadmap -- HIGH priority for consumer trust | PENDING |

## **Outstanding Actions**

| **ITEM** | **PRIORITY** | **STATUS** | **TRIGGERS** |
| --- | --- | --- | --- |
| Free trial system -- consumer landing page + email + Supabase use-count + Resend | Critical | PENDING -- HM free trial to be built first (before BM) | v1.1.4 |
| Consumer landing page (HM-specific) | Critical | PENDING -- required before launch promotion | v1.1.4 |
| Stripe subscription activation | Critical | PENDING | v1.1.4 |
| PDF export of brief output | High | PENDING -- see Platform Feature Roadmap. Priority: consumer trust. | Pre-launch |
| Session history / brief archive | High | PENDING -- see Platform Feature Roadmap. Higher priority for HM than BM. | Pre-launch |
| Upload HMBDL v3 to GitHub /docs | Medium | PENDING -- document exists locally | Next session |
| Promotion activation -- coordinate with MVL launch | High | PENDING | v1.1.4 |

# **SERVICE 5  |  CAUSAL PARALLAX**

level33parallax.com   |   Stack: NOT STARTED

| **COMPONENT** | **DETAIL** | **STATUS** |
| --- | --- | --- |
| All infrastructure | Not yet started. Specification complete (v2.0). | NOT STARTED |

# **SERVICE 6  |  SCRIPTUVERSE**

scriptuverse.com   |   Repo: NOT YET CREATED

Stack: IN BUILD. Supabase project (xvlqixdhxvsjcowjmxyl) live and in active use since Counsel's build. Counsel and Refuge instruments both live in code with a shared front door (Shape B auth + profile intake), both manually tested end-to-end with real typed answers (ScriptBDL Decisions 118, 133) -- Decision 117's pre-launch manual-test gate is now fully satisfied for both. GitHub repo created this session at github.com/jamie1112h-design/Scriptuverse (Decisions 136-139); Netlify site created, first live deploy confirmed, and the custom domain (www.scriptuverse.com primary, scriptuverse.com redirecting) fully wired with a valid certificate (Decisions 140-149). Stripe webhook and Payment-Link redirect code built and cloned from HM's validated pattern (Decision 114), but the actual Stripe Dashboard Payment Link has not yet been created. Two items explicitly unconfirmed at session close, not to be read as resolved by the domain going live: Supabase's redirect allow-list for the custom domain, and a live sign-in test against it (Decision 150) -- the correct opening items next session. Remaining build sequence, per Decisions 134-135, 150: confirm auth on the real domain -> Stripe activation -> final integrated pass -> live crisis-path test, run last of all, immediately before the first promotional effort ("launch"). Claude leads execution of this sequence one confirmed increment at a time.

⚠ MANDATORY (once repo exists): Read ScriptBDL from repo /docs before every build session. All AI proxy calls via Supabase Edge Functions -- NOT Netlify functions, per the same platform-wide rule already in force for Business Mastermind and Human Mastery.

Governing Documents

| DOCUMENT | VERSION | STATUS |
| --- | --- | --- |
| ScriptBDL | v65 -- Living | CURRENT -- decisions numbered 1-134 (Decision 10 numbering gap remains an open, unresolved historical question, flagged at top of document; 133 actual entries) |
| Scriptuverse Full Specification | v0.2 | STALE -- current through Decision 66 only; Sections 9-10 not yet updated for Decisions 67-134 |
| Denomination and Tradition Taxonomy | v0.3 | CURRENT -- 21 named options, renumbered per Decision 29 |
| Theological RTTR Voices Source Library | v0.3 | CURRENT -- 31 flagship voices, Ignatius of Loyola promotion (Decision 62) included |
| Theological RTTR Heavyweight Citation Build | Batch One | CURRENT -- 16 voices, 19 ID-coded entries (Decision 74); batch two not yet built |
| crisis-marker-handler.ts + test-crisis-marker.js | Shape B confirmed (Decision 72) | LIVE, with a real caveat -- inlined (not imported) into both `counsel-edge-function.ts` and `refuge-edge-function.ts` per each file's own header note, since Supabase's dashboard-based deploy doesn't support shared import paths without a real repo; this is now two hand-synchronized copies of the same logic. The GitHub repo now exists (Decision 137) and both copies are version-controlled within it, which makes the drift at least detectable via diff -- but the underlying duplication itself is not yet resolved; that would require moving to a CLI-based Supabase deploy with a real shared import path, not yet undertaken. Ten-case unit suite passing; a live end-to-end crisis-path test through deployed code -- Decision 76's own single non-negotiable pre-launch gate -- has not yet been confirmed run (see Outstanding Actions) |

Infrastructure

| COMPONENT | DETAIL | STATUS |
| --- | --- | --- |
| Supabase project | xvlqixdhxvsjcowjmxyl -- auth, scriptuverse_profiles, scriptuverse_crisis_events, counsel and refuge Edge Functions all live | LIVE |
| Netlify hosting | scriptuverse.netlify.app and the custom domain (www.scriptuverse.com primary, scriptuverse.com redirecting to it) both confirmed live with a valid certificate (Decisions 146-149) | LIVE |
| GitHub repo | github.com/jamie1112h-design/Scriptuverse -- created and populated this session, no `l3v3l-` prefix per Decision 137 | LIVE |
| Stripe product | $9.99 USD/month locked (Decision 75); webhook and Payment-Link redirect code built and cloned from HM's validated pattern (Decision 114) | PARTIAL -- code ready; Payment Link itself not yet created in the Stripe Dashboard; activation now sequenced *after* Netlify and GitHub per Decision 134 |
| Domain and email | scriptuverse.com / www.scriptuverse.com live, wired to Netlify via Cloudflare (CNAME flattening + www CNAME), certificate provisioned, www set as primary (Decisions 146-149); Resend routing still not configured | PARTIAL -- domain LIVE, email still pending |
| Counsel Instrument HTML | Built, deployed, manually tested end-to-end with real answers | LIVE (Decision 133) |
| Refuge Instrument HTML | Built, deployed, manually tested end-to-end with real answers | LIVE (Decision 118) |
| Shape B auth (Supabase Auth, magic-link) | Configuration and frontend session code built and confirmed working across multiple live sessions | LIVE |

Outstanding Actions

| ITEM | PRIORITY | STATUS | TRIGGERS |
| --- | --- | --- | --- |
| Create Scriptuverse GitHub repo (jamie1112h-design account) | High | DONE -- created as `Scriptuverse`, no `l3v3l-` prefix (Decision 137); populated in full (Decision 139) | Decision 134, 135, 136-139 |
| Deploy Scriptuverse to Netlify | High | DONE -- first live deploy confirmed at scriptuverse.netlify.app, main@27eb4f0 (Decisions 141-143) | Decision 134, 135, 140-144 |
| Point scriptuverse.com (already in Cloudflare) at the Netlify deploy | High | DONE -- CNAME flattening on the apex, plain CNAME for www, propagation and certificate confirmed, www set as primary (Decisions 146-149) | Decision 145, 146-149 |
| Add the custom domain to Supabase's Auth redirect allow-list, then confirm a live sign-in test against it | High | NOT STARTED -- genuinely unconfirmed, not resolved by the domain going live; correct first action next session, before Stripe work begins | Decision 150 |
| Confirm Decision 129's clickable subscribe link works end-to-end | Medium | NOT STARTED -- folds naturally into Stripe activation itself rather than standing as a separate pre-check, since STRIPE_PAYMENT_LINK is still a placeholder and the link can't meaningfully resolve until the real Payment Link exists | Decision 144, 150 |
| Create Scriptuverse Stripe product at $9.99/month, clone HM trial flow | High | PARTIAL -- webhook and Payment-Link redirect code built and cloned from HM's validated pattern (Decision 114); the Payment Link itself has not yet been created in the Stripe Dashboard; custom domain now live, so this is next after the Supabase/sign-in check above | Decision 75, 76, 114, 134, 145, 150 |
| Live end-to-end crisis-path test through deployed Counsel/Refuge code | High | NOT STARTED -- Decision 76's own single non-negotiable pre-launch gate; per Decision 135, this runs LAST of all, immediately before the first promotional effort ("launch"), not before Stripe activation as v1.22 had implied. Distinct from, and not satisfied by, the ordinary manual tests closed under Decisions 118/133, which used non-crisis test content | Decision 67, 76, 135 |
| Manual full test of Counsel and Refuge with real typed answers, no ?prefill=1 | High | DONE -- Refuge (Decision 118), Counsel (Decision 133); Decision 117's gate fully satisfied for both instruments | Decision 117, 118, 133 |
| File Ontario Business Name Registration for Scriptuverse | Medium | DONE -- OBR registration confirmed obtained (Jamie, 2026-07-08); Stripe descriptor can now flip from Jamie Hill to Scriptuverse per Decision 76's original plan | Decision 76, 114 |
| Resolve Stripe legal-entity sequencing (Jamie Hill vs GRHT) | Medium | RESOLVED -- OBR registration landing (see row above) settles this in favor of proceeding under Jamie Hill with the Scriptuverse descriptor now, per Decision 76's original plan, rather than waiting on Grand River Hills Technologies Inc.'s separate federal incorporation | Decision 76, 114 |
| Build Refuge Instrument HTML and system prompt | Medium | NOT STARTED | Decision 66, 76 |
| RTTR heavyweight citation build, batch two | Low | NOT STARTED | Decision 74 |

# **PLATFORM COMMUNICATIONS**

*This section tracks outbound communications tasks -- partner updates, investor briefings, and public-facing announcements. These are not build tasks. They are logged here to ensure they are not deferred indefinitely as build work consumes attention.*

**Outstanding Communications Actions**

| **TASK** | **DETAIL** | **PRIORITY** | **STATUS** |
| --- | --- | --- | --- |
| **Generate Partner Update -- Five-Service Platform Overview** | A structured partner-facing document delineating all five L3V3L services with a progress update for each. Partners are currently aware of PrecisionSteps Tutorials (live) and the Business Mastermind Service (in build). They are not aware of: (1) Corporate Prediction Service -- a blue-chip enterprise prediction platform with a 10-document IP portfolio and a 4-call Claude chain architecture; (2) Human Mastery Service -- 15-instrument consumer intelligence suite, Row I live as of 2026-05-28; (3) Causal Parallax -- a pro/institutional service in the specification stage; (4) the Invention Machine IP asset and its associated frameworks (APLEXP Delta Forge, LambFars). The update should frame the platform as a coherent five-service intelligence ecosystem, not a collection of separate tools. Tone: confident, concise, executive-level. Not a marketing pitch -- a factual progress briefing for people with a stake in the outcome. | HIGH | PENDING |
| **BIS First Live Machine Build Test** | The Machine Build Instruction Set (BIS) v1.0 was produced 2026-05-28. It is a complete executable build protocol enabling a new Claude instance to build and deploy any L3V3L machine or instrument from specification to live subscription using only three documents: BIS + current BDL/HMBDL + current Sitrep. The first live test must be a full end-to-end build of a new machine (recommended: Market Gaps for BM or Ethics + Wisdom for HM) with a fresh Claude instance, no prior session history, and full deployment to the live domain including Stripe activation. The session will be longer than a standard build session as the BIS is validated and any gaps are identified and patched. After a successful first test the BIS becomes the standard blitzscale build tool for all future machines. | HIGH | POST-JUNE-1 |

**Partner Update -- Coverage Brief per Service**

*The partner update document should cover each service as follows. This brief is the source material for Claude to draft the update when instructed.*

| **SERVICE** | **PARTNER AWARENESS** | **WHAT THE UPDATE MUST CONVEY** |
| --- | --- | --- |
| **PrecisionSteps Tutorials** | KNOWN -- update required | Live and taking paying subscribers. Skinner-methodology programmed learning on any subject, any level, in English / French (Québécois) / Spanish. Stripe payments active. First subscribers confirmed. Positioned as the foundation of a broader consumer and professional learning ecosystem. |
| **Corporate Prediction Service** | NOT KNOWN -- introduction required | Enterprise-tier adaptive prediction platform. A 4-call Claude chain (questionnaire \u2013 indicator universe \u2013 dynamic indicator discovery \u2013 prediction synthesis) producing a structured corporate prediction with full provenance, confidence scoring, and lineage chain. Backed by a 10-document IP portfolio. Positioned as a blue-chip service for corporate strategy, risk, and scenario intelligence. Infrastructure live. First complete prediction run near ready. Stripe activation pending. level33corporatepredictions.com. |
| **Business Mastermind Service** | KNOWN -- update required | B2B and corporate intelligence suite. 12 machines across 4 tiers -- Strategy, Marketing, and Negotiation live. Row I machines produce full multi-phase intelligence briefs with RTTR-attributed frameworks from the published strategy canon. Row II (Market Gaps, Game Theory, Shifts + Trends) in build for MVL. Positioned as an executive-grade strategic intelligence partner, not a chatbot. Free trial (4 sessions) and Stripe activation pending. level33businessmastermind.com. The Invention Machine -- a 30-parameter invention specification framework built on the APLEXP Delta Forge and LambFars mathematical reasoning substrate -- is a fully delineated IP asset intended for eventual deployment in this suite. |
| **Human Mastery Service** | NOT KNOWN -- introduction required | Consumer personal intelligence suite. 15 instruments across 5 tiers covering the full arc of personal life: parenting, relationships, personal support, ethics, learning, career, creativity, happiness, nutrition, truth, enlightenment, memory, preparedness, self-understanding, and integrative health. Row I (Parenting, Relationships, Personal Support) live as of 2026-05-28 at level33humanmastery.com. Parchment/gold design system. 5+5 adaptive intake per instrument. RTTR-attributed frameworks from developmental psychology, attachment science, and personal growth literature. Free trial (5 sessions) and Stripe activation pending. Dedicated consumer landing page in build. |
| **Causal Parallax** | NOT KNOWN -- introduction required | Pro/institutional-tier causal intelligence service. Specification complete (v2.0). Positioned for research institutions, policy bodies, and advanced analytics teams requiring deep causal chain analysis beyond the scope of the Corporate Prediction Service. Launches independently on its own timeline after the four-service MVL bundle. level33parallax.com. Build not yet started. |