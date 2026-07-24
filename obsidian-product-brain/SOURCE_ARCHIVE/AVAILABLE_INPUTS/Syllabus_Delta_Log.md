---
status: active
type: log
owner: mixed
last_reviewed: 2026-06-29
related_notes:
  - "[[Learning Engine & Exercise Types]]"
  - "[[Content Authoring Rules]]"
  - "[[Backlog and Deferred]]"
  - "[[PR and Smoke Log]]"
---

# Syllabus Delta Log

## Purpose

Append-only log for syllabus/product lesson decisions and why they changed. This is not the full syllabus.

## Current Scope

- Round 1.1 focused L0-L6 tester-ready flow.
- Current main after #154: `8cfdce7508b4bc26eb78468fb59de7d236b5ae49` (Round 1.1 baseline).
- Current main after Round 1.2 (#155, #156): `2df346996e31774c3c1e7ba4e07274963865116a`. Round 1.2 is merged but **not yet APK/smoke-validated**.
- L7+ planning should not distract from Round 1.1/1.2 smoke/tester readiness.

## Delta Entry Format

Use this shape for future entries:

| Date | Lessons | Decision | Why | Active/passive impact | Engine impact | Status | Link |
|---|---|---|---|---|---|---|---|

Status values: accepted, deferred, rejected, needs test.

## Round 1.1 Deltas

| Date | Lessons | Decision | Why | Active/passive impact | Engine impact | Status | Link |
|---|---|---|---|---|---|---|---|
| 2026-06-29 | Weave | Label/tone fix. | Make bridge attempts feel supported, not punished. | Production attempt remains active; compare is neutral. | Validator remains judge. | accepted | [[PR and Smoke Log]] #151 |
| 2026-06-29 | Say It | Add confirmation before reveal. | Preserve learner agency before model answer. | Open production remains attempt-first. | Reveal timing adjusted. | accepted | [[PR and Smoke Log]] #152 |
| 2026-06-29 | L4 | Add/confirm `faim` chip coverage. | Active target needed visible learner piece. | `faim` is treated as an active reusable piece. | Content/schema fix. | accepted | [[PR and Smoke Log]] #153 |
| 2026-06-29 | L5 | Trap cleanup. | `merci` was a poor distractor for the `un`/`une` contrast. | Keeps trap scope tied to active contrast. | Content/schema fix. | accepted | [[PR and Smoke Log]] #153 |
| 2026-06-29 | L2 | Add `ici` chip coverage. | Active target was visible in sentence but not as reusable piece. | `ici` becomes properly surfaced. | Content/schema fix. | accepted | [[PR and Smoke Log]] #154 |
| 2026-06-29 | Early lessons | `pret` / `prete` decision deferred. | Needs product call on gender/variant load. | Avoids premature active requirement. | None yet. | deferred | [[Open Questions]] |
| 2026-06-29 | L3 | Oui/non chips deferred. | Small polish, not Round 1.1 blocker. | Future active/recognition cleanup. | Possible content pass. | deferred | [[Backlog and Deferred]] |
| 2026-06-29 | Early flow | "What was Weave?" reminder deferred. | Add only if tester evidence shows confusion. | Could add metacognitive support. | Possible new card. | deferred | [[Backlog and Deferred]] |
| 2026-06-29 | Runtime | Mid-lesson resume pointer deferred. | Useful, but outside closeout scope. | No lesson-content change. | Runtime/UX later. | deferred | [[Backlog and Deferred]] |

## Round 1.2 Deltas

| Date | Lessons | Decision | Why | Active/passive impact | Engine impact | Status | Link |
|---|---|---|---|---|---|---|---|
| 2026-06-29 | Weave (all L0-L6) | Restore `Weave` brand + raise target salience: badge, `Say this:` (standard) / suppressed (open), dominant target, helper copy, input label `Your try`. | Tester 1 repeated previous answers on consecutive Weaves (salience signal); brand name had been flattened in #151. | Production attempt stays active; compare stays neutral; mixed attempts not "wrong". | Copy/label/UI only; evaluator + schema unchanged. | accepted (merged, **not yet APK/smoke-validated**) | [[PR and Smoke Log]] #155 |
| 2026-06-29 | L3 | Remove passive `oui` from L3 recap `piecesUsed`. | "Pieces you used" should list produced pieces; `oui` is recognition-only/trap in L3, `non` is produced. | Recap chips now reflect produced pieces only; `oui` recognition unchanged elsewhere. | Content-only; no schema/registry change. | accepted (merged, **not yet APK/smoke-validated**) | [[PR and Smoke Log]] #156 |

> [!note] Supersedes an earlier deferral
> The Round 1.1 row "L3 Oui/non chips deferred" is now partially actioned: the recap `oui` cleanup shipped via #156. The broader oui/non chip question needed no further change (adding meet-card chips would over-teach; `non` already surfaces as a Weave/Say It piece). History above is unchanged; this is the clarifying note.

## Syllabus Principles

- Spiral, do not dump.
- Integration should dominate novelty.
- Keep active-new load low.
- Recognition before production where possible.
- Mon Lexique should align with item/chunk mastery, not vague exposure.
- Avoid grammar expansion during smoke/hotfix work.

## Future Entries

Append new deltas below this line. Do not rewrite history; add clarifying notes if an earlier decision changes.
