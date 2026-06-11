# Round 1 Test Plan (workstream doc)

Status: ACTIVE plan for the Round 1 tester wave.
Owner: Operator.
Companion docs: `docs/workstreams/round1-founder-learning-slice.md` (what gets
built), `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` (operator smoke runbook),
`docs/STATUS.md` (execution state).
This document defines what Round 1 is supposed to prove before more content
is added beyond the current slice.

---

## 1. Purpose

Round 1 tests first-session learning activation, not long-term retention.

The question Round 1 answers: can a new tester enter Le Mot, understand the
flow without help, use French immediately, and want to continue?

Round 1 is a decision gate for the L1-L6 slice. It is not a study of whether
the app teaches French durably. Retention systems (Practice Hub, Daily
Review, spaced repetition) are not on the tester surface and are not being
evaluated.

## 2. What Round 1 tests

- First-use clarity: a tester opens a fresh install and knows what to do
  without instructions.
- The entry path: Lesson Zero, then How Weave Works, then Home, then L1.
- L1-L6 sequence comprehension once L3-L6 are implemented: the lesson list
  reads as a path, and the next step is always obvious.
- Lesson screen mechanics: meet, insight, fill, weave, say-it-your-way,
  recap. Each screen type is understood on first or second contact.
- Immediate production inside lessons: the tester types or says French
  during the lesson, not only recognizes it.
- Pacing and cognitive load: screen count and item load per lesson feel
  light enough to finish and continue.
- Tone and confidence shift: the experience reads as calm and capable,
  and the tester ends feeling they used French.
- Android stability on the intended path: no crash, no dead end, no broken
  state across restart.
- Safe tester surface: no scope leaks. Practice, Chat, Paywall, XP/streak
  language, broken Auth entries, and dev routes must not appear.

## 3. What Round 1 does not test

- Long-term retention.
- Spaced repetition effectiveness.
- Practice Hub value.
- Daily Review habit formation.
- Full Mon Lexique value.
- Subscription willingness or pricing.
- 30-day mastery.
- Full Founder product-market fit.
- The full AI learning experience (AI is closed in this build).

Feedback touching these areas is recorded but does not pass or fail Round 1.

## 4. Core hypotheses

- H1: a tester can complete the first learning loop (Lesson Zero through L1)
  without confusion.
- H2: a tester produces French during the first session.
- H3: a tester understands the lesson interaction patterns by the second or
  third lesson without re-explanation.
- H4: L1-L6 pacing feels light enough that the tester wants to continue
  after each lesson.
- H5: a tester reports the session as "I used French" rather than
  "I studied grammar".
- H6: no out-of-scope product surface distracts the tester or breaks trust.

Each hypothesis maps to the signals in section 5 and the feedback questions
in sections 6 and 9.

## 5. Success signals

### Must-pass

- Fresh install path works end to end.
- Tester reaches L1 from a fresh install without help.
- Tester completes at least L1.
- No broken Auth, dev, AI, paywall, or Practice leaks on the tester surface.
- No crash in the intended path, including one restart.

Any must-pass miss blocks the wave or invalidates that tester's session.

### Good

- Tester completes 2 or more lessons.
- Tester can recall at least one French chunk immediately after the session.
- Tester says they understood what to do.
- Tester describes the experience as calm or usable.

### Warning

- Tester taps around looking for what to do.
- Tester thinks it is a grammar quiz.
- Tester cannot explain what they learned.
- Tester stops before finishing L1.

Warnings do not block Round 1 on their own, but two or more warnings from
one tester count as a failed hypothesis for that session.

### Fail

- Tester cannot enter the intended path.
- An obviously broken surface appears.
- Tester reports feeling punished, scored, or gamified.
- App crashes or blocks progression.

## 6. Manual learning check

Practice Hub is out of scope, so Round 1 uses a manual recall check run by
the operator. This is a learning signal, not proof of long-term retention.

Immediate post-session questions (within minutes of finishing):

- Ask politely for a coffee in French.
- Say "I am here" in French.
- What does "s'il vous plaît" do in tone?
- What can you say to thank someone?
- Which moment felt easiest or hardest?

Optional 24-hour follow-up (same questions, asked once, no coaching):

- Repeat the first four prompts above.
- Add: "Without opening the app, what do you remember saying in French?"

Record answers verbatim. A tester who produces an imperfect but usable
French chunk counts as a positive signal. A tester who answers in English
grammar terms counts as a warning for H5.

## 7. Emulator / device gate

Minimum operator gate before any tester sees a build. This summarizes the
authoritative runbook in `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`; if the two
diverge, the checklist wins.

- Build metadata recorded (commit hash, EAS build ID, device, date).
- Correct product stage: dev-apk, with sandbox surfaces absent.
- Fresh install path verified.
- L0 bridge (Lesson Zero) opens on first launch.
- How Weave Works follows Lesson Zero.
- Home loads and exposes the lesson entry.
- L1 completed end to end on the device.
- Restart checked: mid-lesson kill and post-completion relaunch, no
  repeated onboarding, no broken state.
- No out-of-scope tabs or routes reachable (Practice, Chat, auth, dev
  routes).
- AI closed or safely fallback-only per current config; no network needed
  on the tester path.
- Supabase absence does not create a tester dead end.
- Android layout acceptable for Round 1: keyboard, tap targets, small
  viewport, no clipped text on key screens.

## 8. Round 1 build rule

No tester APK is distributed before all of the following hold:

- The L0 bridge path exists and works.
- The L1-L6 content slice exists and validates (through PR J in the slice
  spec). The arc must end on the L6 integration payoff, not on a system
  lesson.
- `npm run typecheck` is clean.
- `npm run test:learning-engine` is green.
- `npm run validate:pools` is acceptable (currently 6 known legacy
  warnings, no new ones).
- `npm run validate:content` reports 0 hard errors, 0 warnings, 0 info.
- One full emulator or physical-device pass is completed (section 7).
- Known smoke-bucket blockers are resolved or explicitly accepted in
  writing by the operator.

## 9. Feedback collection

Keep collection light. Two instruments only.

5-minute post-session form (or spoken interview), capturing:

- Where the tester was confused, stopped, or tapped around (confusion
  points, with the screen named).
- Emotional tone in their own words (calm, stressed, bored, curious).
- Perceived usefulness: "Could you use any of this tomorrow?"
- Desire to continue: "Would you open the next lesson?"
- Any broken or odd surface they noticed.
- The core question from the smoke checklist, recorded verbatim: "At which
  point did you feel bored, confused, or tempted to stop?"

Optional 24-hour follow-up:

- The recall prompts from section 6.
- Whether they reopened the app unprompted.

## 10. Explicit non-goals

- Do not use Round 1 feedback to overbuild v1. v1 is a temporary Dev APK
  surface; learning-engine is the long-term foundation.
- Good ideas that do not block the Round 1 test go to
  `docs/status/v1-to-learning-engine-migration-notes.md` or the later
  Founder backlog, not into v1 work.
- No new lesson mechanics, no renderer changes, no Home polish, and no
  retention features are justified by Round 1 findings alone.
- Round 1 cannot be passed by fixing testers' wishes; it is passed by the
  signals in section 5.

## 11. Current implementation status

As of main `b6ffad7` (2026-06-12):

- PR #121 merged: L1 Survival Kit migration landed atomically.
- `v1-lesson-000`: L0 bridge twin (the hardcoded Lesson Zero screen remains
  the real first-use bridge).
- `v1-lesson-001`: L1 Survival Kit (canon-aligned, live).
- `v1-lesson-002`: L2 Être seed (migrated Je suis content; c'est extension
  pending per PR E).
- L3-L6 (`v1-lesson-003` to `v1-lesson-006`): not implemented.
- Practice, Chat, Paywall, and Daily Review full loops: out of Round 1
  scope and gated off the tester surface.
- Next likely step after this document: L3-L6 content planning or
  implementation (PR G to PR J in the slice spec), bounded by what this
  test plan says Round 1 must prove. Nothing beyond the slice is justified
  before Round 1 results are in.
