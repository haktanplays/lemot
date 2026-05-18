# Sprint 12 SW.8 — Lesson 001 Path A content

## Workstream name
Sprint 12 SW.8 — v1 Lesson 001 ("Je suis") Path A content + supporting copy polish.

## Branch
`claude/sprint12-ws8-lesson-001-path-a`

## Commit
`df4d07497918175ada1069e3bab607f90f2f78e3` — `feat(ws8): add Lesson 001 Path A content` (sole commit; ahead of `main` by 1).

## Status of this spec
Retroactive. WS8 was implemented and pushed before `docs/workstreams/` existed in the repo (the workstreams scaffolding landed on `main` via PR #1, merge commit `b155fc5`, while WS8 was branched from the pre-PR-#1 base `658a321`). This spec documents the already-shipped workstream so PR review has context. It does not redefine product decisions; everything below reflects what the WS8 diff actually does.

## Objective
Add the first concrete v1 lesson — `lesson-001` ("Je suis") — under `lemot-app/content/lessons/v1/`, register it in the v1 lesson index, flip the registry status of `chunk-je-suis-ici` from `recognition` to `active` so the new lesson can teach it as production content, and polish three end-of-section copy strings to passive-mirror tone (`Complete!` → `done.`). Adds documentation-only legacy annotations to two existing files to clarify Tier B / v1-syllabus split.

## Scope
Tier LM-3 — feature slice / PR-sized workstream (per `docs/MASTER_PIPELINE_v1.2.1.md` §3).

Single product intention: ship v1 L1 Path A as one PR. Copy-polish is admitted into the same PR because the three `Complete!` strings are part of the same passive-mirror tone discipline encoded in the new lesson's `qaChecks` (no theatrical positivity), not an unrelated cleanup.

## Files changed by WS8
Nine files, +259 / −6 versus `main` (post-PR-#1 base `658a321`; PR #1 docs do not overlap WS8's surface).

### New
- `lemot-app/content/lessons/v1/lesson-001.ts` (+223)
  - Nine `LessonScreen`s: meet-card → insight-card (grammar nugget) → meet-card → fill-with-traps → weave (supported) → weave (supported, second context) → insight-card (shape noticed) → say-it-your-way → recap.
  - Target items: `chunk-je-suis`, `chunk-je-suis-ici`, `chunk-bonjour`.
  - `Lesson` metadata: `id: "v1-lesson-001"`, `number: 1`, `phase: "first-ascent"`, `primaryArchetype: "architecture-verb"`, `estimatedMinutes: 5`, `monolingualMode: "english-guided"`, `prerequisites: ["v1-lesson-000"]`, `canDo: "Say I am here, in French."`
  - `offlineBehavior.canRunOffline: true` with `fallbackMode: "model-answer-only"`.
  - Embedded `designNotes` (7 entries) and `qaChecks` (7 entries) act as in-file acceptance signals.

### Modified
- `lemot-app/content/lessons/v1/index.ts` (+2 / −1) — imports `lesson001` and appends it to `V1_LESSONS`. No other registry change.
- `lemot-app/content/itemRegistry.ts` (+1 / −1) — `chunk-je-suis-ici` status: `recognition` → `active`. No other field changed.
- `lemot-app/app/(tabs)/practice.tsx` (+2 / −2) — `Scenarios Complete!` → `Scenarios done.`; `Quiz Complete!` → `Quiz done.` Both are end-of-section completion screens.
- `lemot-app/app/(tabs)/stats.tsx` (+1 / −1) — `Completed!` → `Done.` in milestone tile.
- `lemot-app/components/LessonPractice.tsx` (+1 / −1) — `Practice Complete!` → `Practice done.`
- `lemot-app/config/productStage.ts` (+6 / −0) — adds a six-line `LEGACY TEST BUILD` comment above `DEV_APK_LESSON_LIMIT`. No code change, no flag flip; documents that the 5-lesson limit assumes the 24-lesson syllabus and migrates in Sprint 12. References operator-vault Canon Merge Report.
- `lemot-app/data/lessons/index.ts` (+13 / −0) — adds a 13-line `LEGACY TEST BUILD` comment block at the top of the file documenting the legacy 24-lesson syllabus vs v1 syllabus, and the Sprint 12 migration plan. No code change.
- `lemot-app/data/pools/pool1.ts` (+10 / −0) — adds a 10-line legacy comment inside the existing top docblock explaining that Pool 1 (~270 items) is tied to legacy L1 = "Survival Kit" and migration to v1 L1 = "Je suis" is Sprint 12 scope. No content change.

## Active canon basis
- `CLAUDE.md` — confirms "Killer trinity: Weave + Say It Your Way + Natural Reveal" as core mechanics. WS8's lesson uses Weave (screens 4–5) and Say It Your Way (screen 7); Natural Reveal is encoded as the `reveal` block on Weave and Say-It screens.
- `CLAUDE.md` — confirms streak/XP language is banned canon-wide ("locked decision 2026-04-23 — UX.1"). WS8's copy-polish (`Complete!` → `done.`) is consistent with that rule.
- `docs/DEV_APK_MVP_CANON.md` — confirms "No XP. No streaks. No lives. No punishment. … Weave is the core mechanic. AI is supportive, not the core product." WS8 honors all five.
- `docs/MASTER_PIPELINE_v1.2.1.md` §9 Rule 3 — "Forbidden unless explicitly requested: streak / XP / level up / achievement / amazing / perfect score / goal complete / come back tomorrow pressure." WS8 removes three "Complete!" theatrical tokens, none added. `lesson-001.ts` `qaChecks` explicitly assert "No theatrical positivity tokens appear."
- `docs/MASTER_PIPELINE_v1.2.1.md` §5 — workstream `.md` belongs under `docs/workstreams/`. This file is that record.
- v1 Canon §5 (operator-vault, not in repo): L1 = "Je suis" / être integration. The repo-side reflection is the new `lesson-001.ts` itself. The legacy comment blocks added to `lemot-app/data/lessons/index.ts`, `lemot-app/data/pools/pool1.ts`, and `lemot-app/config/productStage.ts` annotate the split so a reader does not confuse the legacy 24-lesson Dev APK files with v1 content.

## Forbidden scope (verified untouched)
| Area | Touched? | How verified |
|---|---|---|
| Mon Lexique | No | No file under `lemot-app/content/lessons/mon-lexique` or similar; no flag flip in `productStage.ts` `FEATURES_BY_STAGE`. |
| Paywall | No | `FEATURES_BY_STAGE.paywall` unchanged across all three stages. |
| Word Graph | No | No file under graph/* touched. |
| V4-B redesign | No | No design token, theme, or component shell touched. |
| AI behavior | No | No AI proxy, no `useChat`/`useErrors` edits, no new prompts, no model routing changes. |
| Supabase | No | No `lib/supabase.ts` edit, no `supabase/` directory edits, no schema changes. |
| EAS | No | No `eas.json`, `app.json`, or EAS profile edits. |
| Routes | No | No new file under `lemot-app/app/`; existing route files only have copy-string edits, no navigation/router changes. |
| `package.json` / `package-lock.json` | No | No dependency change. |
| Lesson engine internals | No | `lessonTypes`, `LessonRunner`, `mk()`, `SECS` arrays untouched. WS8 only adds new content into existing types. |

## Acceptance criteria
Reproduced from the `qaChecks` array inside `lesson-001.ts` plus copy-polish file checks.

### From `lesson-001.ts` `qaChecks`
1. TTS reads `Je suis ici.` and `Bonjour, je suis ici.` cleanly.
2. Casing variants pass Weave via `acceptedAlternatives` (`Je suis ici`, `je suis ici.`, `je suis ici`).
3. Screen `s03` (`fill-with-traps`) trap reasons fire on `voudrais` and `bonjour` selections.
4. No theatrical positivity tokens appear in the lesson.
5. No mention of `streak`, `XP`, `level`, or `mission`.
6. Recap (`s08`) uses passive mirror tone.
7. The `shape-noticed` insight (`s06`) references prior weaves on the same screen flow, not future content.

### From the copy-polish files
8. `lemot-app/app/(tabs)/practice.tsx` shows `Scenarios done.` and `Quiz done.` — no `Complete!`.
9. `lemot-app/app/(tabs)/stats.tsx` shows `Done.` on completed milestone tiles — no `Completed!`.
10. `lemot-app/components/LessonPractice.tsx` shows `Practice done.` — no `Practice Complete!`.

### From the registry change
11. `chunk-je-suis-ici` resolves with `status: "active"` everywhere it is rendered; nothing else in `itemRegistry.ts` changed.

### From the legacy-doc additions
12. `lemot-app/config/productStage.ts`, `lemot-app/data/lessons/index.ts`, and `lemot-app/data/pools/pool1.ts` carry the new legacy/v1-split comment blocks; no code in those files behaves differently.

## Verification commands
```bash
cd lemot-app
npm run typecheck
npm run validate:pools
```

## Manual QA needed (Operator-only)
- Run v1 lesson-001 on a physical Android device through the Dev APK build (requires `v1LessonEngine` flag on; currently `false` in `dev-apk` per `productStage.ts`). Cloud cannot perform this step.
- Listen to TTS for `Je suis ici.` and `Bonjour, je suis ici.`
- Verify trap reasons fire on `s03` (`voudrais` and `bonjour` options).
- Verify passive-mirror copy on Practice, Quiz, Stats, and Lesson Practice end states.
- Verify the recap (`s08`) renders the three lines in order, with `Continue` as the next-action label.

## Risks
1. **`v1LessonEngine` is gated off in `dev-apk`** (`productStage.ts` line 77 ≈ `v1LessonEngine: false`). On a `dev-apk` build, lesson-001 will not be reachable through the v1 surface. This is consistent with WS.3 scaffold language ("Not consumed anywhere in Sprint 12 yet") and is therefore *not* a WS8 regression, but the operator and PR reviewer should know that physical QA of the new lesson requires either the `sandbox` stage or an explicit flag flip — neither of which WS8 changes.
2. **Comment blocks reference operator-vault `~/Desktop` paths** in `config/productStage.ts`, `data/lessons/index.ts`, and `data/pools/pool1.ts`. Per the cloud pipeline (§ Cloud Mode Addendum), those paths are operator-only; they are documentary breadcrumbs and not read at runtime. No cloud-execution risk, but they will read as dead links in any cloud-only sweep — acceptable as long as they remain annotations and not active dependencies.
3. **No test added.** The `qaChecks` array inside `lesson-001.ts` documents expectations but is not executed by any test runner in this repo. Verification still depends on `npm run typecheck` / `validate:pools` / physical smoke. Not a WS8 regression; the existing repo has no lesson-content unit tests by default.
4. **Forbidden-language scan is narrow.** WS8 removes `Complete!` in three known places. There may be other `Complete!` / `Amazing!` / `Perfect!` strings elsewhere in `lemot-app/` that WS8 does not touch. This is in-scope for a separate workstream, not WS8.
5. **Item registry status flip is irreversible inside the same PR.** `chunk-je-suis-ici` going from `recognition` to `active` could affect other consumers that read `status`. WS8 audit: no other lesson references this chunk as active production today (lesson-000 uses different chunks; v1 index has only lesson-000 + lesson-001 post-WS8). Acceptable, but worth a reviewer's pass.

## Sync Queue notes
None required from WS8 itself. WS8 implements code-side work entirely; no durable canon decision, no archive reclassification, no Obsidian doc, no mempalace fact. If WS8's PR ends with a sprint-state update or canon revision (e.g., declaring v1 L1 "locked"), that update belongs in a separate Sync Queue row at that time — not in this spec.

Cross-reference: `docs/CLOUD_SYNC_QUEUE.md` (landed via PR #1, merge commit `b155fc5`).

## Open blockers (Operator-only)
Per `docs/MASTER_PIPELINE_v1.2.1.md` §14:
- Operator-side APK rebuild after WS8 merges
- EAS environment variable verification (`EXPO_PUBLIC_PRODUCT_STAGE`, `v1LessonEngine` flag wiring)
- Supabase dashboard verification (not directly affected by WS8 but part of the Sprint 12 close-out checklist)
- Supabase secrets verification (same)
- Physical Android device smoke test of v1 Lesson 001
- Build ID / build link recorded in Test Checklist

None of the above block WS8 *PR review*; they block Sprint 12 *closure*.

## Review status
- Step 1 — Lesson 001 content + registry flip + copy polish: implemented, pushed as `df4d074`.
- Spec (this file): created retroactively, **pending operator approval** before commit on WS8 branch.
- Tests: `typecheck` + `validate:pools` deferred — cloud sandbox has no `node_modules` and the task ruleset forbids `npm install`. Both must be run locally by the operator (or in CI with deps installed) before PR merge.
- PR: not yet opened.

## Suggested PR title
`feat(content-v1): add v1 Lesson 001 "Je suis" Path A content`

## Suggested PR body shape
- **Summary:** adds `lesson-001` to the v1 lesson set, flips `chunk-je-suis-ici` to `active`, polishes three end-of-section copy strings to passive-mirror tone, and adds legacy/v1-split annotations to three existing files.
- **Scope:** Tier LM-3, Sprint 12 SW.8, one product intention (v1 L1 Path A).
- **Files changed:** 9 files (+259 / −6) under `lemot-app/content/`, `lemot-app/data/`, `lemot-app/app/(tabs)/`, `lemot-app/components/`, `lemot-app/config/`.
- **Safety:** no paywall, RevenueCat, Word Graph, Mon Lexique, V4-B, Supabase, EAS, or route change. `package.json` untouched. No AI behavior change.
- **Verification:** `npm run typecheck` and `npm run validate:pools` to be re-run by operator with deps installed; physical Android smoke is operator-only.
- **Forbidden language scan:** removed three `Complete!` strings; none added. `qaChecks` in `lesson-001.ts` codify the passive-mirror discipline.
- **Operator blockers (do not block merge):** APK rebuild, EAS env verification, Supabase deploy, physical smoke. Tracked in `docs/MASTER_PIPELINE_v1.2.1.md` §14.
