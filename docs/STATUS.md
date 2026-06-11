# STATUS

Current execution state for cloud sessions and the operator. Short by design.
Scope canon: `docs/DEV_APK_MVP_CANON.md`. Pipeline: `docs/MASTER_PIPELINE_v1.2.1.md`.

## Current main

- At or after `e95d790`.
- Guardrail and Round 1 PRs #100 to #122 are merged.
- PR #121 merged: L1 = Survival Kit (`v1-lesson-001`), L2 = Être seed
  (`v1-lesson-002`). L3-L6 remain pending.
- PR #122 merged: the Round 1 test plan is canon at
  `docs/workstreams/round1-test-plan.md`.
- Next bounded work: L3-L6 content planning or implementation, guided by
  the test plan.
- Code-side: guardrails and validation green. Per the test plan build rule,
  the tester APK waits for the full L1-L6 slice plus a device pass.

## Round 1 Dev APK readiness

- Round 1 assumptions: Dev APK only, no Supabase env, AI closed (fallback-only).
- Authoritative smoke checklist: `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`.
- Build path: `eas build --platform android --profile preview` (run from `lemot-app/`).
- Remaining work before the tester wave: L3-L6 content (per the test plan
  build rule), then operator-side checklist pre-build checks, EAS build,
  and the device smoke pass.

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
