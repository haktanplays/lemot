---
status: active
type: workflow
owner: mixed
last_reviewed: 2026-06-29
related_notes:
  - "[[PR and Smoke Log]]"
  - "[[User Testing Protocol]]"
  - "[[Backlog and Deferred]]"
  - "[[Open Questions]]"
---

# Tester Feedback Log

> [!runtime] Purpose
> Append-only log of real-device tester and operator feedback. One entry per session. Keep raw reactions; route durable decisions to [[Backlog and Deferred]] / [[Open Questions]] and build/smoke facts to [[PR and Smoke Log]].

## Entries

### 2026-06-29 - Operator spot-check #1 (Haktan)

- **Tester / operator:** Haktan (operator self spot-check, not an external tester).
- **Type:** Physical device spot-check of the Round 1.1 preview APK.
- **Build under test:** Round 1.1 preview APK, commit `8cfdce7508b4bc26eb78468fb59de7d236b5ae49` (artifact links are private — see [[PR and Smoke Log]]).
- **Result:** APK in good condition; no immediate blocker reported.
- **TTS:** **OK on physical device** (audio confirmed by operator). Closes the emulator-only TTS caveat from the automated loop.
- **Verdict impact:** Round 1.1 stays **GO / tester-ready**.
- **Product observation (non-blocking):** Weave label currently reads `Try it in French`; operator wants the branded **`Weave`** name restored with clear helper copy. Captured as the Round 1.2 "Weave brand restoration + What is Weave explanation" candidate in [[Backlog and Deferred]], with open design questions in [[Open Questions]].

### 2026-06-29 - Tester 1 (first real external tester)

- **Tester:** Tester 1 (first true external tester; not operator).
- **Build under test:** Round 1.1 preview APK, commit `8cfdce7508b4bc26eb78468fb59de7d236b5ae49` (artifact links private — see [[PR and Smoke Log]]).
- **Session:** Completed **6 lessons in ~20-25 minutes**.
- **Overall result:** **Positive, no blockers.** Round 1.1 stays **GO / tester-ready**.
- **Weave UX signal (non-blocking):** During **consecutive Weave** exercises, the tester sometimes re-typed the **previous Weave answer** instead of reading the new target prompt.
  - Example: one Weave expected `je ne suis pas ici`; a later target was closer to `ce n'est pas ici`, but the tester repeated `je ne suis pas ici`.
  - **Interpretation:** likely **not** a French-knowledge blocker — a **Weave prompt-salience / UI-attention** issue. Possible factors: user may not realize each Weave has a new target meaning; the current target prompt may not be visually dominant enough; consecutive Weaves feel too similar; previous-answer pattern carries over.
- **Classification:** Blocker = no. Fix-before-next-tester = optional (observe one more tester first). Round 1.2 candidate = yes. Category = **UI/UX + learning-flow signal**. Related to the existing Weave candidate.
- **Routed to:** Round 1.2 candidate refined in [[Backlog and Deferred]] (now "Weave brand restoration + prompt salience + What is Weave explanation"); design questions in [[Open Questions]]; measurement framing in [[Learning Engine & Exercise Types]] (§1.3 Guided Production).
- **Follow-up status (2026-06-29 stopping point):** the *salience* direction of this signal was addressed in **#155** (visible `Weave` badge, dominant target meaning, `Say this:` label, suppressed on open Weaves) — **merged to main but not yet APK/smoke-validated**, so it is **not yet confirmed** to resolve the carry-over behavior. The repeated-previous-answer *detection* nudge remains **deferred** pending more tester evidence. No claim about learning retention is made from this single session; classification stands: **positive first-flow signal, no blocker, Weave UX signal.**

## Maintenance

For each session append: date, tester/operator, build/commit, what they did, raw reactions, what worked, what confused them, verdict impact, and where durable follow-ups were routed. Keep external real-tester sessions distinct from operator self spot-checks.
