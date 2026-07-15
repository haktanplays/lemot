---
status: active
type: decision
owner: mixed
last_reviewed: 2026-06-29
---

# Open Questions

> [!gate] Purpose
> Only unresolved decisions live here. Normal tasks and nice-to-have work belong in [[Backlog and Deferred]].

## Product Decisions

| Question | Current leaning | Why it matters | Next decision owner |
|---|---|---|---|
| How should early lessons handle `pret` / `prete`? | Decide product treatment before more content fixes; see [[Content Authoring Rules]]. | Gender variants can either clarify French reality or overload beginners. | Human/product. |
| Should an early "What was Weave?" reminder card exist? | Only if tester evidence shows the concept fades; log any accepted change in [[Syllabus Delta Log]]. | Helps method comprehension, but adds early-flow weight. | Human/product after smoke notes. |
| What is the exact next track after Round 1.1? | Pick one narrow branch after reviewing smoke. | Prevents L7/runtime expansion by drift. | Human/product. |
| For the first Weave "What is Weave?" explanation, what is the exact non-spoiling example? | Open, **lower urgency**: the one-time `how-weave-works` interstitial already shows a non-spoiling example (`Je voudrais a coffee, s'il vous plaît` → natural); a dedicated in-screen card is deferred (see [[Backlog and Deferred]] "Round 1.2 Still Deferred"). | A spoiling example defeats the exercise; a vague one fails to teach the mechanic. | Human/product. |
| Should repeated previous-answer detection (the "looks like your last answer" nudge) be implemented now, or only after more tester evidence? | **Decided for now: deferred.** #155 shipped the salience copy/label instead; revisit detection only after the next tester. No evaluator change either way. | One tester is a weak base for a runtime behavior; salience copy may resolve it without detection logic. | Human/product after next tester. |

## Technical Unknowns

| Question | Current leaning | Why it matters | Next decision owner |
|---|---|---|---|
| Is Android TTS unreliable on target devices? | Need device-specific evidence; see [[Tech & Privacy Decisions]]. | TTS is central to trust; fixes may be platform-specific. | Operator/engineering. |
| What guardrails are required before AI feedback leaves sandbox? | Require hallucination/fallback constraints first; see [[AI Feedback Guardrails]] and [[Tech & Privacy Decisions]]. | AI must not teach unseen forms or invent scope. | Product/engineering. |
| Should chip/`piecesUsed` coverage become a validator metric? | Likely yes, but in a tooling pass; see [[Learning Engine & Exercise Types]] and [[Content Authoring Rules]]. | Prevents missing-chip regressions without manual review. | Engineering/tooling. |

## Related Decision Notes

- Backend/data platform questions are tracked in [[Tech & Privacy Decisions]].
- AI safety constraints are tracked in [[AI Feedback Guardrails]].
- Lesson/content decision impact is tracked in [[Syllabus Delta Log]] and [[Content Authoring Rules]].

## Resolved Elsewhere

- Legacy 24-lesson / L14 paywall is not active: see [[Notes Archive Index]] and [[Canon Merge Report 2026-05-16]].
- Current main for Round 1.1 is `8cfdce7508b4bc26eb78468fb59de7d236b5ae49`: see [[PR and Smoke Log]].
- Private EAS/APK URL for the Round 1.1 loop: **recovered** by the 2026-06-29 Claude loop and recorded (private/sensitive) in [[PR and Smoke Log]]. No longer open.
- Android TTS on a target device: **confirmed OK** in the 2026-06-29 physical spot-check (operator: Haktan) — see [[PR and Smoke Log]] and [[Tester Feedback Log]]. (Broader multi-device reliability still tracked under Technical Unknowns / [[Backlog and Deferred]].)
- Weave target label & layout: **resolved via #155** (2026-06-29). Standard Weaves use **`Say this:`** above a dominant target meaning, with a small **`Weave`** badge and the helper line below; **`open`** Weaves suppress the label; input label is **`Your try`**. (Resolves the prior `Say this:` vs `New meaning:` and title-vs-badge questions.) Merged to main; **not yet APK/smoke-validated.**
- L3 recap `oui`: **resolved via #156** (2026-06-29). "Pieces you used" means actively produced pieces, so passive `oui` was removed from the L3 recap. See [[Syllabus Delta Log]] and [[PR and Smoke Log]].
- Current main is now `2df346996e31774c3c1e7ba4e07274963865116a` (Round 1.2, #155 + #156), superseding the `8cfdce75` (#154) baseline; Round 1.2 is **not yet APK/smoke-validated**.
