# Dev APK v1 Freeze Checkpoint

**Date:** 2026-06-09
**Current `main` HEAD:** `7186377` (or newer)
**Status:** Docs-only checkpoint. No runtime change. Records that the **v1 lesson surface is a
temporary Dev APK smoke surface for first user testing** and should now move toward freeze, while
the **`learning-engine` remains the long-term product foundation.**

This note sits alongside the learning-engine status notes
([`learning-engine-v0.1-baseline.md`](./learning-engine-v0.1-baseline.md),
[`learning-engine-interactive-baseline.md`](./learning-engine-interactive-baseline.md),
[`learning-engine-l11-l12-l16-chain-smoke-baseline.md`](./learning-engine-l11-l12-l16-chain-smoke-baseline.md))
and the founder-self-learning checkpoints in this folder. It is written against the
[`DEV_APK_MVP_CANON`](../DEV_APK_MVP_CANON.md) scope and Rule 7 (Dev APK scope is sacred) of
[`MASTER_PIPELINE_v1.2.1`](../MASTER_PIPELINE_v1.2.1.md).

---

## 1. Decision

- **v1 is a temporary Dev APK smoke surface for first user testing.** It is the lesson experience
  routed into the first-run path so a real tester can play a lesson end to end today.
- **`learning-engine` remains the long-term product foundation.** The contract-driven content
  engine (Item Registry to Lesson Contract to Exercise Blueprint to Validator, plus the learner
  renderer work) is the system the product is built on. v1 does not replace it.
- **v1 should now move toward freeze.** With the Dev APK Home-state smoke passing, v1 has served
  its purpose as a playable first-test surface. Further investment in v1 is debt unless it
  protects the test path.
- **Future v1 work is limited to:** blocker bugs, smoke-path breaks, learner-facing banned-copy
  leaks, and Dev APK test-path issues. Everything else belongs to `learning-engine`, not v1.

## 2. Why v1 was used

- **v1 was routed into the first-run path because it is currently playable end to end.** The
  `learning-engine` renderer is still maturing; v1 is the surface that already supports a complete
  Lesson 1 (recognition, insight, fill, Supported Weave, open production, recap, completion) with
  onboarding and restart.
- **This was a pragmatic first-user-test decision**, not a product reversal. The goal is to get a
  real human through a calm, complete first lesson on a real device as early as possible.
- **It does not mean `learning-engine` is shelved.** The engine remains the foundation; v1 is a
  stopgap test skin.
- **The risk is two parallel lesson systems receiving ongoing investment.** If v1 keeps attracting
  feature work alongside `learning-engine`, the codebase carries two evolving lesson engines and
  the debt becomes chronic.
- **This checkpoint exists to prevent that.** By freezing v1 to a narrow maintenance contract,
  ongoing product investment stays pointed at `learning-engine`.

## 3. Current merged baseline

| PR | Intent |
|----|--------|
| **#80** | First-run path into v1 |
| **#81** | v1 lesson frame and completion cleanup |
| **#82** | Lesson 001 learner-facing dash cleanup |
| **#83** | MeetCard and InsightCard spacing consistency |
| **#84** | Same-type screen state bleed fix (`LessonRendererV1` re-keyed per screen) |

**Current `main`:** `7186377` (or newer), `fix(lesson-v1): reset screen state between steps (#84)`.
`typecheck` and `validate:content` clean at this baseline.

## 4. Freeze criteria status

Verdicts use two sources: the earlier first-run emulator smoke that accompanied PR #80 and PR #81,
and the **Dev APK Home State Emulator Smoke (2026-06-09, Pixel_8 AVD, Expo Go 55,
`EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`)**. The 2026-06-09 smoke ran against existing post-onboarding
storage (no reset), so it did not replay the from-scratch onboarding chain; see criteria 1 and 2.

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Fresh install path works | **PASS**, based on the earlier first-run emulator smoke for PR #80 / #81. Not replayed during the 2026-06-09 Home-state smoke because storage was already post-onboarding. Revalidate once during the physical APK smoke. |
| 2 | Lesson Zero to How Weave Works to Home to Lesson 1 works | **PASS**, based on the earlier first-run emulator smoke. Not replayed during the 2026-06-09 Home-state smoke (post-onboarding storage). The restart leg of the 2026-06-09 smoke did confirm the app correctly skips Lesson Zero and How Weave Works and lands on Home, and Home to Lesson 1 routing passed. Revalidate the full from-scratch chain once during the physical APK smoke. |
| 3 | Lesson 1 can be completed end to end | **PASS.** All 9 parts completed (recognition, insight, fill, two Supported Weave writes, second insight, Say It Your Way open production, recap). |
| 4 | Completion and restart work | **PASS.** "You reached the end of Lesson 1." then Back to Home; kill and relaunch opens Home with coherent state. |
| 5 | Same-type screen state isolation and similar blocker interaction bugs are closed | **PASS.** Parts 5 and 6 are both Supported Weave; Part 6 mounted with an empty input and a disabled Check, so no text or graded state carried over from Part 5. PR #84 confirmed working. |
| 6 | Learner-facing banned copy is absent from the visible Dev APK path | **PASS.** The Home, Lesson, and Completion path is clean of the motivational and progress-pressure copy barred by canon (Rule 3 / UX.1). Milestone labels and the Daily Review counter are allowed, not banned. |
| 7 | Home after Lesson 1 completion is good enough for the Dev APK test path | **PASS.** Home returns safely, stays coherent, and does not imply an unavailable Lesson 2. No Home fix needed. See section 8, Known non-blockers. |

## 5. Allowed future v1 work

Only the following justify touching v1:

- A blocker bug.
- A smoke-path break.
- A learner-facing banned-copy leak.
- An onboarding or first-run path break.
- A Lesson 1 testability issue.
- A completion or restart break.
- A minimal Home issue that blocks the Dev APK test path.

> **Good idea does not mean v1 work.** Improvements, polish, and new capability go to
> `learning-engine`, not v1. If a change is desirable but the Dev APK test path still works without
> it, it is out of scope for v1.

## 6. Disallowed future v1 work

Do not invest the following in v1:

- New lesson architecture.
- New exercise mechanic.
- Full visual redesign.
- Full Daily Review rewrite.
- Full Progress rewrite.
- Mon Lexique integration.
- Practice or Chat expansion.
- Multi-lesson expansion.
- Deep content expansion.
- Polish-only PRs that do not fix a freeze criterion.

These belong to the `learning-engine` foundation, or to later V4-B and public-beta surfaces (and,
where relevant, the deferred V4-B direction; see Rule 9 of
[`MASTER_PIPELINE_v1.2.1`](../MASTER_PIPELINE_v1.2.1.md)), not to the frozen v1 smoke surface.

## 7. Emulator smoke evidence

- **Home-state smoke (2026-06-09): PASS.**
- **No Home fix needed.**
- **No PR2C visual pass needed.**

Environment: Pixel_8 AVD, Android emulator, Expo Go 55 loading from Metro in dev-apk mode on port
8081 via `adb reverse`, `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk`. Storage state: existing
post-onboarding storage, no reset.

Exercised in the 2026-06-09 run: Home current state, Home to Lesson 1 routing, full Lesson 1 across
all 9 parts, completion screen, Back to Home, Progress tab, app kill and relaunch back to Home.
The from-scratch onboarding chain (criteria 1 and 2) was covered by the earlier PR #80 / #81
first-run smoke and is scheduled for one revalidation during the physical APK smoke.

## 8. Known non-blockers

These were observed during the 2026-06-09 smoke. They are migration notes and future
`learning-engine` concerns. None of them is a v1 blocker.

- Progress tab still shows the legacy 24-lesson / 264-section taxonomy.
- v1 completion maps to a legacy progress section (it registered as one section of the legacy
  "Survival Kit" lesson).
- Home does not visibly acknowledge Lesson 1 completion and still says "Begin the first lesson."
- Daily Review remains 0/5 after completion.

Rationale: the Dev APK test path (open Home, play Lesson 1, complete, return, restart) works with
all of the above present. Each item is a property of the legacy progress and Home surfaces, which
the `learning-engine` adoption will own. Fixing them inside v1 would extend the frozen surface and
deepen the two-system debt this checkpoint is meant to stop.

## 9. Migration bridge

- v1 is held at the maintenance contract in sections 5 and 6.
- The non-blockers in section 8 are not fixed in v1. They are carried into a dedicated bridge note
  at `docs/status/v1-to-learning-engine-migration-notes.md` rather than fixed in v1.
- **This task does not create that bridge note.** The file does not exist yet; it should be created
  or updated before v1 is fully retired.
- When the `learning-engine` learner renderer is adopted into the first-run path, v1 retires, and
  completion acknowledgement, progress mapping, and the Daily Review surface are addressed in the
  engine's own Home, Progress, and review surfaces (tracked in that bridge note).
- Until that adoption, the legacy Progress tab and the current Home are accepted as is for the Dev
  APK test path.

## 10. Next step

- Hold v1 at freeze. Apply only the allowed work listed in section 5.
- During the Operator physical APK smoke, revalidate fresh install and the Lesson Zero to How Weave
  Works to Home to Lesson 1 chain once (criteria 1 and 2), then record the result.
- Continue product investment in `learning-engine`, not v1.
- Fold the section 8 non-blockers into `learning-engine` planning rather than v1.
