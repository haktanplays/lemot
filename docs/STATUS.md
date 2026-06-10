# STATUS

Current execution state for cloud sessions and the operator. Short by design.
Scope canon: `docs/DEV_APK_MVP_CANON.md`. Pipeline: `docs/MASTER_PIPELINE_v1.2.1.md`.

## Current main

- At or after `99a9188`.
- Guardrail PRs #100 to #104 are merged.

## Dev APK guardrail status

- Feature scope locked by test (#100, `scripts/tests/devApkScope.test.ts`).
- v1 learner-facing copy guard added (#101, lesson-001 structured screens).
- Bug closure checkpoint recorded (#102, `docs/status/dev-apk-bug-closure-checkpoint.md`).
- `validate:pools` now runs in CI (#103).
- Product stage resolution now fails closed (#104).

## Product stage note

- "sandbox" is no longer the fallback stage.
- Local sandbox development now requires `EXPO_PUBLIC_PRODUCT_STAGE=sandbox` explicitly.
- An unset or mistyped env intentionally boots "dev-apk", the minimal tester surface.
- EAS preview sets `EXPO_PUBLIC_PRODUCT_STAGE=dev-apk` explicitly.

## Still open

- Practice tab product decision: hide in dev-apk, or accept and document. Not settled.
- Home Auth and Account decision (F3). Held until product decision or smoke.
- Home completion label (F5). Held.
- `app/dev/*` route gating residue from the PR-D plan. Routes are deep-link reachable.
- G3 operator gate: re-enable Supabase email confirmation before any external tester APK.
- Smoke bucket: F6 SayIt AI and offline, F7 first-run and restart and storage-reset,
  F8 Android viewport and keyboard and tap targets, TTS pass, Home visual review.
- Smoke checklist import from the operator vault. The repo file is still a placeholder.

## Next recommended queue

1. PR-C docs sync (this change).
2. PR-D2: gate `app/dev/*` routes to sandbox stage.
3. PR-T1: grade and answer-check tests (learning-engine).
4. PR-T2: Mon Lexique and boundary tests, plus lesson-000 copy guard extension.
5. PR-T3: graph tests (learning-engine).
6. Practice hide PR, only if the operator approves the decision.

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
- No multi-lesson content expansion.
- No paywall work.
