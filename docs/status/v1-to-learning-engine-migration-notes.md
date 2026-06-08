# v1 to learning-engine Migration Notes

**Date:** 2026-06-09
**Current `main` HEAD:** `e73f811` (or newer)
**Status:** Docs-only bridge note. No runtime change. Carries lessons from the temporary v1 Dev APK
smoke surface into the long-term `learning-engine` work. This is the bridge note referenced by
[`dev-apk-v1-freeze-checkpoint.md`](./dev-apk-v1-freeze-checkpoint.md).

It sits alongside the learning-engine status notes
([`learning-engine-v0.1-baseline.md`](./learning-engine-v0.1-baseline.md),
[`learning-engine-interactive-baseline.md`](./learning-engine-interactive-baseline.md),
[`learning-engine-l11-l12-l16-chain-smoke-baseline.md`](./learning-engine-l11-l12-l16-chain-smoke-baseline.md))
and the founder-self-learning checkpoints in this folder.

---

## 1. Purpose

- This document carries lessons from the temporary v1 Dev APK smoke surface into the long-term
  `learning-engine` work.
- It does not extend v1.
- It does not authorize new v1 polish.
- It exists so v1 effort becomes product evidence for `learning-engine`.

## 2. Source checkpoint

Reference: [`dev-apk-v1-freeze-checkpoint.md`](./dev-apk-v1-freeze-checkpoint.md).

- v1 is frozen to maintenance.
- `learning-engine` is the long-term foundation.
- Good idea does not mean v1 work.

## 3. v1 flow learnings

- Lesson Zero to How Weave Works to Home to Lesson 1 is a clear first-run chain.
- Home should feel like one calm next step, not a dashboard.
- A single Lesson 1 path is less confusing than multiple competing lesson paths.
- Completion should return safely to Home.
- Restart should skip onboarding once flags are set.

## 4. Lesson renderer learnings

- Each lesson step needs isolated local state.
- Consecutive same-type screens must remount or reset correctly.
- The PR #84 fix used `key={screenIndex}` in `LessonRendererV1`.
- The `learning-engine` renderer should design state isolation intentionally, not as an
  afterthought.
- Completion-only progress markers are useful for smoke, but not a full progress architecture.

## 5. Exercise learnings

### Fill with traps

- `trapReason` is useful.
- The wrong state should explain gently.
- Options should lock after selection.
- Continue should appear only after an answer.

### Weave

- Input state, exact accepted state, and no-match state all need separate clear phases.
- Natural Reveal should compare without harshness.
- Same-type screen state bleed must be prevented.
- Suggested pieces should be helpful but not visually noisy.

### Say It Your Way

- Free production is valuable.
- AI fallback must be graceful.
- Saved-for-comparison state is acceptable.
- Answer bands can be useful but should not become score pressure.

### Natural Reveal

- Tone should explain, not punish.
- Exact, alternative, and no-match modes should be calm and useful.
- A short Answer Reveal is enough for simpler exercises.

## 6. Home and Progress learnings

Known non-blockers carried from the freeze checkpoint:

- Progress tab still shows the legacy 24-lesson / 264-section taxonomy.
- v1 completion maps to a legacy progress section.
- Home does not visibly acknowledge Lesson 1 completion and still says "Begin the first lesson."
- Daily Review remains 0/5 after completion.

Classification: these are not v1 blockers. They are `learning-engine` Home, Progress, and Daily
Review requirements.

## 7. Learning-engine implications

- `learning-engine` needs a single canonical progress model.
- Home should know whether the first lesson was completed.
- Home should not imply unavailable lessons.
- Daily Review should either be meaningful after first completion, or be hidden or softened.
- Progress should not expose legacy taxonomy.
- The renderer must support step-level state isolation.
- First-run flags must be explicit and testable.
- Banned-copy rules must apply to generated and static copy alike.

## 8. Deferred ideas, not v1 work

- Chip wrap polish.
- Richer Home completion reflection.
- Progress redesign.
- Daily Review rewrite.
- Mon Lexique integration.
- Practice or Chat expansion.
- Multi-lesson expansion.

These are not v1 work unless they become Dev APK test-path blockers.

Physical APK fresh-install revalidation is not listed here because it is a required
pre-external-testing smoke gate, not a deferred idea. It remains test work, not v1 implementation
work.

## 9. Open questions for learning-engine

- What is the canonical unit of completion: lesson, section, screen, or event?
- How should Home represent a completed Lesson 1 without turning into a dashboard?
- When should Daily Review become available?
- How should Natural Reveal data be stored or replayed?
- How should AI fallback be represented in event logs?
- Which v1 screens should map to `learning-engine` exercise blueprints?

## 10. Next recommended work

- Do not reopen the PR2C visual pass.
- Do not extend v1.
- Next code work should inspect `learning-engine` renderer readiness or event-log progress
  integration.
- Physical APK smoke remains pending as a required pre-external-testing gate.
