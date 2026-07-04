# STATUS

Current execution state for cloud sessions and the operator. Short by design.
Scope canon: `docs/DEV_APK_MVP_CANON.md`. Pipeline: `docs/MASTER_PIPELINE_v1.2.1.md`.
Docs map and precedence: `docs/README.md` (navigation, precedence, and public-safe Git vs private Obsidian boundary).
Long-term product/build intent: `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` (imported 2026-07-02; supersedes the v0.1 Cairn docs; planning/intent — does not authorize implementation outside PR scope).
Cairn execution roadmap (July 2026): `docs/CAIRN_ROADMAP_202607.md` (phase order Faz 0–7). Open-gap inventory: `docs/KNOWN_GAPS.md`.
Precedence for Cairn work: `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 spec`. The v0.1 Cairn docs (`CAIRN_PRODUCT_DEFINITION_v0.1.md`, `CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md`) are SUPERSEDED reference only.

## Cairn content line — current state (2026-07-04)

The July content line has advanced well past the Round 1 sections below (kept as
history). Current state:

- L0-L15 v1 lessons are authored, registered, and validating on main
  (L7-L15 landed via PRs #164-#169).
- PR #170 merged: L1-L15 chip / vocabulary / candidate inventory audit
  (`docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md` + CSVs), including the
  conversation-based extended inventory and the spine-narrowness analysis.
- PR #171 merged: registry hygiene (word-ici, noun-faim wired; oui scope note;
  dormant-item annotation).
- PR #172 merged: Payload Economy v0 (`docs/PAYLOAD_ECONOMY_v0.md`) and the
  product Q&A canon (`docs/CAIRN_PRODUCT_ANSWERS_2026_07.md`).
- PR #173 merged: Exercise Canon v0.4 (`docs/EXERCISE_CANON_v0.4.md`) with the
  locked Practice Hub progression policy (§5.4).
- **PR #174 (draft, current workstream): L1-L5 Kademe 2 payload enrichment.**
  Smoke-bearing (touches the visible dev-APK lessons); merge requires Haktan
  pedagogical review + Operator device smoke. Includes
  `docs/AUDIO_RECORDING_QUEUE_v0.md` (planning-only human-audio queue).
- Practice Hub and Exercise System v1 remain FUTURE workstreams (hub-first,
  Tier D deterministic; per Exercise Canon v0.4). Not started.
- L16 is NOT started in this batch; the L16+ content line resumes after #174.

## Round 1 runtime closeout — ACCEPTED (2026-06-17)

Round 1 L0-L6 runtime smoke is COMPLETE and ACCEPTED. The runtime baseline is
accepted as the frozen Round 1 surface.

- Final commit under test: `8cefe81c1ec1feef7fa1c0f0caccbb172722cf14`
  — `fix(home): use time-aware greeting header (#136)`.
- Smoke device: AVD `lemot_pixel5` (Pixel 5, Android 14, `emulator-5554`).
- Live mini re-smoke result: PASS. Severity tally: **P0 0 / P1 0 / P2 0 / P3 0.**
- PR #136 resolved the only remaining P3 (the old "Le Mot · Day" Home header).
  The header is now a correct time-aware greeting ("Bonsoir." after 18:00),
  verified live.
- Verified live: clean launch; no red screen; no crash; no fatal Metro/logcat
  errors; correct time-aware greeting; old "Le Mot · Day" header removed; only
  the Journey tab visible; Daily Review hidden; Progress hidden; L1-L6 only; no
  L7+; no legacy 24-lesson list; no paywall/subscription/trial/pricing;
  completion/unlock state intact; lesson opens; Weave starts empty; "Need a
  hint?" support works; input remains editable; no state bleed; persistence
  survives force-stop/relaunch.
- Honest coverage caveat (preserved): L2 and L3 were not fully completed
  sequentially in the original smoke; L4-L6 were sampled by deep link. The
  shared LessonRendererV1, the sequential unlock mechanism, persistence, and the
  262 passing learning-engine tests reduce the remaining risk. A full sequential
  L2-L6 run remains OPTIONAL pre-release exhaustive QA — it is not a Round 1
  runtime blocker.
- Disposition: Round 1 runtime is ACCEPTED and CLOSED. Runtime code is FROZEN
  and must not change unless a new defect is found. Merged Round 1 branches are
  NOT deleted yet.
- Next phase: **Round 1 Pedagogy Polish** (not started under this closeout — no
  pedagogy/design/content implementation here). The EAS preview build and the
  physical-device tester wave remain separate Operator-only pre-distribution
  steps and are unaffected by this runtime acceptance.
- **Baseline advanced after this closeout (read before device smoke):** the
  emulator smoke above ran at `8cefe81`. Defect fixes merged afterward changed
  runtime — most importantly #139 **rebuilt the Lesson Zero first-run flow** and
  #141 **capped its rebuild nudge hints** (also #138, the Weave cloze fix). The
  Lesson Zero flow the operator device smoke will exercise at current main
  `91f1b04` is therefore the rebuilt one, which the original `8cefe81` smoke
  never saw. The operator device smoke must re-cover the Lesson Zero first-run
  chain (clean install → Lesson Zero → Lesson 1; How Weave Works is no longer in
  the automatic chain, #139) at current main,
  not assume the `8cefe81` coverage carries over.

## Current main

- At `91f1b04` (PR #142, `docs(syllabus): record accepted compact L7 doorway,
  defer full aller spec`). Full hash:
  `91f1b04caf862b88acabc3d74ca15c1f4d80ed87`.
- Guardrail and Round 1 PRs #100 to #142 are merged.
- Post-#136 changes (merged after the 8cefe81 runtime closeout baseline):
  - #138 `fix(weave)`: collapse pieces at the cloze hint step (runtime).
  - #139 `feat(lesson-zero)`: rebuild the first-run production flow (runtime —
    `app/lesson-zero.tsx`, `app/(tabs)/index.tsx`, `lib/lessonZeroAnswers.ts`).
  - #140 `chore(workflow)`: add the Android smoke helper
    (`scripts/dev/android-smoke.sh`, operator convenience).
  - #141 `fix(lesson-zero)`: cap the rebuild nudge hints (runtime).
  - #142 `docs(syllabus)`: compact L7 planning doc (docs-only; L7 implementation
    stays blocked until Round 1 results).
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
- Validation status is stale: the last recorded run was at main `66d7aa7`
  (`npm run typecheck` clean; `npm run test:learning-engine` 246 passed / 0
  failed; `npm run validate:pools` exit 0 with 6 known legacy warnings;
  `npm run validate:content` 0 hard errors / 0 warnings / 0 info). Runtime PRs
  #138/#139/#141 and their tests (`lessonZeroAnswers.test.ts`) landed afterward,
  so the current learning-engine test count differs from 246 (the runtime
  closeout note above cites 262). This was NOT re-run in the docs refresh — the
  operator/pre-build step must re-run validation at current main `91f1b04` and
  record the current counts before the build.
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

Post-smoke interpretation: `docs/workstreams/round1-post-smoke-decision-framework.md` (planning/decision framework only; does not authorize implementation).

Round 1 runtime closeout gate: PASSED — see "Round 1 runtime closeout —
ACCEPTED (2026-06-17)" above. The L0-L6 runtime smoke passed on AVD
`lemot_pixel5` (`emulator-5554`) at `8cefe81` / #136 with P0-P3 all zero, and
the runtime baseline is accepted and frozen. Next phase is Round 1 Pedagogy
Polish (not started). A physical-device tester-wave pass and the EAS preview
build remain separate Operator-only pre-distribution steps; they do not reopen
the runtime baseline.

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
