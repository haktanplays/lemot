# STATUS

Current execution state for cloud sessions and the operator. Short by design.
Scope canon: `docs/DEV_APK_MVP_CANON.md`. Pipeline: `docs/MASTER_PIPELINE_v1.2.1.md`.

## Current main

- At or after `66d7aa7` (PR #131).
- Guardrail and Round 1 PRs #100 to #131 are merged.
- The Round 1 L0-L6 v1 content slice is COMPLETE on main. All seven lessons
  (`v1-lesson-000` through `v1-lesson-006`) are authored, registered, and
  validating.
- PR #121 merged: L1 = Survival Kit (`v1-lesson-001`), L2 = Être seed
  (`v1-lesson-002`).
- PR #122 merged: the Round 1 test plan is canon at
  `docs/workstreams/round1-test-plan.md`.
- PR #124 merged: the Round 1 L3-L6 content plan is on main at
  `docs/workstreams/round1-l3-l6-content-plan.md`.
- PR #125 merged: the Round 1 Training Content Factory contract is on main at
  `docs/workstreams/round1-training-content-factory.md`.
- PR #126 merged: L3 = Non (`v1-lesson-003`), the first lesson built under the
  Training Content Factory contract. L4 (J'ai) and L5 (Un, une) followed as
  Training Pack content PRs and are live.
- PR #130 merged: L6 = Un petit moment (`v1-lesson-006`), commit
  `abb0b103291670cd1f96be2a6c15a0ab1bf28aab`. The Round 1 integration payoff —
  a small human scene that recombines L1-L5. One new item, `chunk-au-revoir`;
  guided deterministic payoff (no AI roleplay); no runtime changes.
- PR #131 merged: L1-L5 anti-memorization variation pass, commit
  `66d7aa7582b3fc5756230133126280146af90efb`. Zero registry changes; L4 and L5
  each gained one interactive `fill-with-traps` meaning-choice screen; L1-L3
  received minimal example/reveal enrichment. Content-only, no runtime changes.
- `V1_LESSONS = [lesson000, lesson001, lesson002, lesson003, lesson004,
  lesson005, lesson006]`.
- Latest known validation status (main `66d7aa7`): `npm run typecheck` clean;
  `npm run test:learning-engine` 246 passed / 0 failed; `npm run validate:pools`
  exit 0 with 6 known legacy warnings; `npm run validate:content` 0 hard
  errors / 0 warnings / 0 info.
- Code-side: the Round 1 content slice is complete and green. Per the test plan
  build rule, the tester APK still waits on the Round 1 closeout gate and an
  operator device smoke pass before distribution.

## Round 1 Dev APK readiness

- Round 1 assumptions: Dev APK only, no Supabase env, AI closed (fallback-only).
- Authoritative smoke checklist: `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`.
- Build path: `eas build --platform android --profile preview` (run from `lemot-app/`).
- The L0-L6 content slice is complete (the test plan build rule's content
  requirement is met). Remaining work before the tester wave: the Round 1
  closeout gate, then operator-side checklist pre-build checks, EAS build,
  and the device smoke pass.

## Next steps (Round 1 closeout)

1. Round 1 closeout gate: confirm the L0-L6 slice against the test plan
   build rule and smoke checklist; resolve or explicitly accept any
   smoke-bucket blockers (operator).
2. Operator device smoke pass: fresh-install path, L0 bridge, How Weave
   Works, Home, an end-to-end lesson run, restart persistence, scope-leak
   and Android-layout checks per `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`
   (operator-only).
3. Then decide the next implementation track (e.g. L7+ content or a
   learning-engine migration step). Nothing beyond the slice is justified
   before Round 1 results are in.

Round 1 is NOT fully closed until the closeout gate and the operator device
smoke pass are both complete. Until then, code-side is "content slice
complete, awaiting operator closeout".

## Dev APK guardrail status (all merged)

- Feature scope locked by test (#100), extended for practice and aiEnabled.
- v1 learner-facing copy guard (#101); component copy guard for
  LessonRendererV1, Lesson Zero, How Weave Works (#110).
- Bug closure checkpoint recorded (#102).
- `validate:pools` runs in CI (#103).
- Product stage resolution fails closed to dev-apk (#104).
- Practice tab hidden in dev-apk (#106); legacy Practice CTA gated (#107).
- `app/dev/*` routes gated to sandbox dev builds (#108).
- Learning-engine test depth: grade and answer-check (#109), boundary and
  due-check (#111), Mon Lexique and Practice Pool selectors (#112).
- Temporary AI diagnostics removed (#113).
- Explicit AI master switch (#114): `aiEnabled` true only in sandbox;
  dev-apk and public-beta fail closed to deterministic fallbacks.
- Auth entry hidden and `/auth` route guarded when Supabase env is absent (#115).
- Smoke checklist placeholder replaced with the Round 1 checklist (#116).

## Product stage note

- "sandbox" is no longer the fallback stage.
- Local sandbox development now requires `EXPO_PUBLIC_PRODUCT_STAGE=sandbox` explicitly.
- An unset or mistyped env intentionally boots "dev-apk", the minimal tester surface.
- EAS preview sets `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk` explicitly.

## Still open (Round 1 notes)

- Home completion label (F5): Home still says "Begin the first lesson" after
  completion. Held; review during the device smoke pass.
- Smoke bucket: first-run and restart persistence, Android viewport, keyboard,
  tap targets, TTS pass, fallback behavior on device. All covered by the
  Round 1 checklist sections 4 to 10.
- G3 (Supabase email confirmation) is moot for the no-env Round 1 build.
  It becomes mandatory again before any env-bearing tester build.

## Deferred (not Round 1)

- E2 console stripping.
- E4 legacy lesson route gating (deep-link residual, not in the Round 1 path).
- AI-enabled beta gate: server-side hardening, rate limits, then flip
  `aiEnabled` outside sandbox.
- Privacy and data-handling note for AI traffic.
- Founder / public-beta features: paywall, RevenueCat, Word Graph, Mon Lexique
  runtime, Le Carnet, public-beta EAS profile.

## Hard no

- No v1 feature expansion.
- No v1 polish-only work.
- No Home visual polish without smoke.
- No PR2C visual pass.
- No V4-B implementation.
- No Daily Review rewrite.
- No Progress rewrite.
- No Practice or Chat expansion.
- No Mon Lexique runtime integration.
- No new lesson mechanics.
- No multi-lesson content expansion beyond the Round 1 L1-L6 slice.
- No paywall work.
