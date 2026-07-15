---
status: active
type: workflow
owner: mixed
last_reviewed: 2026-06-29
---

# Backlog and Deferred

> [!next] Purpose
> Deferred work that should not be mistaken for active scope. Promote only through a reviewed workstream or current-build canon update.

## Round 1.1 Deferred

| Item | Type | Why deferred | Promotion trigger |
|---|---|---|---|
| Mid-lesson resume pointer | UX/runtime | Useful for continuity, but not needed for Round 1.1 closeout. | Confirm after tester feedback that resume confusion is real; see [[Agent Workflow Playbook]] for smoke classification. |
| `pret` / `prete` product decision | Product/content | Gendered readiness copy needs a product decision, not a piecemeal content fix. | Decide learner-facing treatment for gender variants in early lessons; see [[Content Authoring Rules]] and [[Syllabus Delta Log]]. |
| L3 oui/non recap cleanup | Content polish | ✅ **Implemented via #156** — passive `oui` removed from L3 recap `piecesUsed`; `non` retained, no chips added. | Done; see "Round 1.2 Implemented" below. |
| Early "What was Weave?" reminder card | Product pedagogy | Could help first-use memory, but risks adding another early card. | Now folded into the Round 1.2 candidate below ("Weave brand restoration + What is Weave explanation"); add only if smoke/tester feedback shows Weave concept is forgotten; log syllabus impact in [[Syllabus Delta Log]]. |
| Android TTS reliability | Technical quality | Needs device evidence and possibly platform-specific handling. | Reproduce on Android device or collect repeated TTS failures; see [[Tech & Privacy Decisions]]. |
| AI feedback hallucination guardrails | AI safety/product | Important before AI-enabled beta; Round 1 dev-apk remains AI-closed/fallback. | Before enabling AI outside sandbox or expanding Say It feedback; see [[AI Feedback Guardrails]]. |
| Validator/metrics for chip and `piecesUsed` coverage | Tooling | Useful for preventing regressions like missing chips; not app runtime. | Add when next content tooling pass is approved; see [[Learning Engine & Exercise Types]] and [[Content Authoring Rules]]. |

## Round 1.2 Implemented (merged to main; not yet APK/smoke-validated)

> [!check] Status
> Merged to main at `2df346996e31774c3c1e7ba4e07274963865116a`. **Code-validated only** (typecheck / validators / unit tests 328/328) — **no Round 1.2 APK build or smoke run yet.**

- **#155 — Weave branding + target salience** (`5f27eee`): visible `Weave` badge (premium ink, not error-toned); `Say this:` label on standard Weaves, **suppressed on `open` Weaves**; target meaning visually dominant; helper copy `Use the French pieces you know. Leave the rest in English for now. Then compare with the model.`; input label `Your try`; new pure `weaveCopy.ts` + copy/transform tests. Evaluator / neutral compare / Say It / schema / progress / gating / AI unchanged.
- **#156 — L3 recap `oui` cleanup** (`2df3469`): removed passive `oui` from L3 recap `piecesUsed`.

## Round 1.2 Still Deferred

- **Repeated-previous-answer detection** (the "looks like your last answer" nudge): **deferred** — not in #155; revisit only after more tester evidence (decision in [[Open Questions]]). No evaluator change either way.
- **Dedicated in-screen "What is Weave?" card:** **deferred / likely unnecessary** — the one-time `app/how-weave-works.tsx` interstitial already gives an early, non-spoiling Weave explanation; #155's always-visible helper reinforces it inline. Only add a dedicated card if tester evidence shows the concept still fades.
- **Round 1.2 visual eyeball:** deferred to the next batch APK + checklist smoke (see [[PR and Smoke Log]] for the specific render checks).

## Round 1.2 Candidates

### Weave brand restoration + prompt salience + What is Weave explanation

> [!check] Largely implemented via #155 (2026-06-29)
> Branding badge, `Say this:` (standard) / suppressed (open), dominant target, helper copy, and `Your try` are **merged**. Remaining open items are the repeated-answer nudge and the dedicated "What is Weave?" card — both tracked under "Round 1.2 Still Deferred" above. Kept here for the original rationale and the deferred remainder.

- **Origin:** 2026-06-29 operator product observation (Round 1.1 physical APK spot-check) **plus** the 2026-06-29 Tester 1 Weave UX signal (see [[PR and Smoke Log]] and [[Tester Feedback Log]]). Does **not** block Round 1.1 GO.
- **Problem A - branding:** PR #151 set the Weave label to plain `Try it in French`. It is understandable, but it drops the branded/trademark-like exercise name. Weave is intended to stay a named, recognizable mechanic (see [[Brand & Naming Canon]] and [[Learning Engine & Exercise Types]]).
- **Problem B - prompt salience (Tester 1):** During consecutive Weaves, Tester 1 sometimes re-typed the previous Weave answer instead of reading the new target (expected `je ne suis pas ici`, later target ~`ce n'est pas ici`, tester repeated `je ne suis pas ici`). Likely a UI-attention issue, not French knowledge: each Weave's new target meaning is not visually dominant enough and consecutive Weaves feel too similar.
- **Goal:** Restore visible **`Weave`** as the exercise name, make the **current target prompt visually dominant**, and add a compact **"What is Weave?"** explanation for early appearances only.
- **Suggested copy:**
  - Title: `Weave`
  - Target label (pick one): `Say this:` **or** `New meaning:` (decision in [[Open Questions]]).
  - Helper line: `Use the French pieces you know. Leave the rest in English for now. Then compare with the model.`
  - Neutral feedback (unchanged): `Compare with the model answer.`
- **Possible future nudge (only if more tester evidence supports it):** `This looks like your last answer. Check the new meaning above, then compare.`
- **Constraints:**
  - Do **not** change evaluator behavior yet. Copy / label / salience / explainer only.
  - Mixed-language attempts must continue to route to the **neutral compare** path (never red / "wrong").
  - "What is Weave?" should show on **early** appearances only; avoid adding permanent flow weight (ties into the former "What was Weave?" backlog row above).
  - Include **one** example, but avoid spoiling the current screen's answer where possible.
  - The previous-answer nudge is a **candidate**, not committed — gate it behind more tester evidence (see [[Open Questions]]).
- **Open design questions (need human call before build):** see [[Open Questions]] — non-spoiling first example; `Weave` title-with-helper vs badge+action-title; `Say this:` vs `New meaning:` target label; whether to implement repeated-previous-answer detection now or after more evidence.
- **Promotion trigger:** Promote into Round 1.2 once the [[Open Questions]] design decisions are answered; then implement as copy/label/salience-only PR(s) against the Weave screen (no evaluator change), with [[Lesson Quality Rubric]] review. Consider observing one more tester before committing the prompt-salience changes.

## Standing Deferred Areas

- L7+ implementation and Home visibility bump.
- Mon Lexique runtime integration.
- Practice/Chat expansion.
- Paywall/RevenueCat.
- Word Graph learner surface.
- V4-B broad visual redesign.
- Generic AI chat or broad conversation mode.

## Maintenance

When an item becomes active, move the concrete decision to [[Open Questions]] if it needs a human call, or to a repo workstream if it is ready for implementation. Do not leave active work hiding in this backlog.
