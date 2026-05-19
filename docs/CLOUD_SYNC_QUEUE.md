# Cloud Sync Queue

Queue of durable decisions and follow-ups that cloud Claude Code sessions cannot complete on their own. The operator drains this queue from the local machine — Obsidian writes, mempalace updates, physical device tests, EAS / Supabase deploys, and APK rebuilds all land here first.

## Purpose

Cloud sessions run without access to the operator's `~/Desktop/Le Mot .md/`, the Obsidian vault, mempalace MCP tools, EAS CLI, Supabase Dashboard, or a physical Android device. When a cloud session reaches a step that the master pipeline (`docs/MASTER_PIPELINE_v1.2.1.md` §P.6, §P.7) says should result in Obsidian / mempalace / Operator action, the session appends a row here instead of attempting the action.

## What this file is NOT

- **Not the source of truth.** Active canon lives in `CLAUDE.md`, `docs/DEV_APK_MVP_CANON.md`, the operator's v1 Canon TOP / User Journey, and the merged product canon. This file is a worklist, not a decision log.
- **Not a backlog of feature ideas.** Use workstream specs (`docs/workstreams/`) for product scope.
- **Not a substitute for code review.** Code-side review still happens in PR.

## How to use

1. Cloud Claude appends a row using the template below when a step in §P.6 / §P.7 would have required Obsidian, mempalace, EAS, Supabase, APK, or physical-device action.
2. Operator opens this file, picks rows with `Status: PENDING`, performs the action locally, then sets `Status: DONE` with a date and short note.
3. Rows older than a sprint with `Status: DONE` may be moved into a `## Archive` section at the bottom or removed in a docs-only PR — but never overwritten or silently deleted while still pending.
4. If the same decision is queued twice, the second row should reference the first (`See row N`) and be marked `Status: SUPERSEDED`. Do not double-queue the same mempalace write.

## Row template

```md
### {YYYY-MM-DD} — {short title}

- Date: {YYYY-MM-DD}
- Cloud branch: {branch name}
- Decision/change: {one or two sentences}
- Source PR or commit: {PR # or commit sha}
- Obsidian target: {vault path, or "n/a"}
- Mempalace action: {add_drawer / kg_add / check_duplicate / n/a}
- Operator action: {APK rebuild / EAS env push / Supabase deploy / secrets verify / physical smoke / docs sync / n/a}
- Status: PENDING | IN PROGRESS | DONE | SUPERSEDED
- Operator notes: {filled in by operator on drain}
```

## Queue

### 2026-05-18 — PR #1 cloud pipeline migration landed

- Date: 2026-05-18
- Cloud branch: `claude/docs-pipeline-migration-v1.2.1`
- Decision/change: Repo-contained cloud-adapted Master Pipeline v1.2.1 is now `docs/MASTER_PIPELINE_v1.2.1.md` and is `@`-included from root `CLAUDE.md`. Cloud sessions treat Obsidian, mempalace, GSD commands, EAS, Supabase Dashboard, APK rebuild, and physical Android smoke as Operator-only; cloud emits Sync Queue rows instead of attempting local-only writes. Repo copy wins for any cloud / web / CI session if it diverges from the operator-vault mirror.
- Source PR or commit: PR #1 / merge `b155fc5`
- Obsidian target: `LeMot.md` (sprint log entry for the cloud-pipeline workflow change); `~/Desktop/Le Mot .md/MASTER_PIPELINE_v1.2.1.md` (keep operator-vault mirror aligned with the repo copy, or accept divergence and note it)
- Mempalace action: `add_drawer` — durable workflow decision: "cloud sessions follow `docs/MASTER_PIPELINE_v1.2.1.md`; repo copy wins on divergence; Obsidian/mempalace/GSD/EAS/Supabase/APK smoke = Operator-only"
- Operator action: docs sync (update `LeMot.md` sprint log; confirm or update operator-vault mirror)
- Status: PENDING
- Operator notes:

### 2026-05-18 — PR #2 WS8 / Lesson 001 Path A landed

- Date: 2026-05-18
- Cloud branch: `claude/sprint12-ws8-lesson-001-path-a`
- Decision/change: First concrete v1 lesson — `lesson-001` ("Je suis") Path A — landed under `lemot-app/content/lessons/v1/`. Registered in v1 lesson index; `chunk-je-suis-ici` flipped `recognition` → `active`. Three end-of-section "Complete!" strings polished to "done." Three legacy/v1-split documentation comments added to `productStage.ts`, `data/lessons/index.ts`, `data/pools/pool1.ts`. Retroactive workstream spec at `docs/workstreams/Sprint12_SW8_lesson-001-path-a.md`. Verification: `npm ci`, `npm run typecheck`, `npm run validate:pools` all passed in cloud (6 pre-existing legacy warnings unchanged).
- Source PR or commit: PR #2 / merge `ff35013` (content commit `df4d074`, spec commit `9139cf4`)
- Obsidian target: `LeMot.md` (Sprint 12 status: WS8 landed @ `ff35013`); `LeMot - User Journey.md` (confirm v1 L1 = "Je suis" reflected in v6); `Tasarım Envanteri.md` (only if v1 L1 screen states are tracked there)
- Mempalace action: `add_drawer` — durable content milestone: "v1 Lesson 001 'Je suis' Path A shipped, 9-screen Path A complete (meet → insight → meet → fill-with-traps → weave × 2 → insight → say-it-your-way → recap), `chunk-je-suis-ici` now active"
- Operator action: docs sync (LeMot.md + User Journey); decide `v1LessonEngine` flag for dev-apk (current: `false` → physical QA of v1 L1 requires sandbox stage or explicit flag flip before APK rebuild)
- Status: PENDING
- Operator notes:

### 2026-05-18 — PR #3 PR-C passive-mirror copy cleanup landed

- Date: 2026-05-18
- Cloud branch: `claude/sprint12-prc-passive-mirror-copy-cleanup`
- Decision/change: Three remaining user-facing reward-tone residues removed: `<Badge label="You got it" />` removed from Lesson Zero correct MCQ feedback; `Unlocked!` → `Added.` in the lesson unlock callout; `Bonus content unlocked!` → `Extra piece added.` in the same fallback callout. Visual de-gamification of the Sparkles/amber unlock callout treatment is deliberately deferred to a future workstream. Spec at `docs/workstreams/Sprint12_PRC_passive_mirror_copy_cleanup.md`.
- Source PR or commit: PR #3 / merge `ac9d41b` (feature commit `ba76d68`)
- Obsidian target: `LeMot.md` (Sprint 12 status: PR-C landed @ `ac9d41b`)
- Mempalace action: n/a — small copy fix, not a durable product decision. Skip unless operator chooses to treat the passive-mirror discipline itself as a re-locked decision.
- Operator action: docs sync only
- Status: PENDING
- Operator notes:

### 2026-05-19 — PR #5 WS9 v1 Lab entry landed

- Date: 2026-05-19
- Cloud branch: `claude/sprint12-ws9-v1-lab-entry`
- Decision/change: Home now has a sandbox-only "v1 Lab" section below the main Lessons list. Gated by `FEATURES.v1LessonEngine && PRODUCT_STAGE === "sandbox"` (belt-and-braces). Tapping the tile navigates to `/v1-lesson/v1-lesson-001`. `v1LessonEngine` now has its first code-side consumer — was scaffold-only before this PR. `dev-apk` and `public-beta` still hide the section; no flag flip happened; no tester-APK visibility change. Spec at `docs/workstreams/Sprint12_WS9_v1-navigation-entry.md`.
- Source PR or commit: PR #5 / merge `64b9d5d` (feature commit `7275802`)
- Obsidian target: `LeMot.md` (Sprint 12 status: WS9 landed @ `64b9d5d`); `LeMot - User Journey.md` (optional — record that the v1 surface now has a discoverable sandbox entry but remains hidden in dev-apk/public-beta)
- Mempalace action: optional `add_drawer` — durable workflow/product milestone if operator treats "v1LessonEngine first consumer + sandbox-only v1 discoverability" as a locked decision; otherwise `n/a`.
- Operator action: docs sync (`LeMot.md` Sprint 12 status); run sandbox smoke for v1 Lesson 001 via Home → v1 Lab → tile; decide later whether v1 should remain sandbox-only, move to dev-apk, or wait for additional v1 lessons before broadening visibility.
- Status: PENDING
- Operator notes:

### 2026-05-19 — PR #7 SW10A pullFromCloud error semantics landed

- Date: 2026-05-19
- Cloud branch: `claude/sprint12-sw10a-pull-error-semantics`
- Decision/change: `pullFromCloud` in `useProgressSync.ts` switched from `.single()` to `.maybeSingle()`. New-user / no-row case still returns `null` quietly. Real Supabase failures (RLS denial, network, schema drift, JWT invalid) now log `[sync] pullFromCloud failed: { code, message, details, hint }` for operator diagnostics. Caller contract preserved — `AppProvider.tsx` merge effect still exits via `if (!cloud) return` on either failure mode.
- Source PR or commit: PR #7 / merge `5e7ada6` (feature commit `5f97863`)
- Obsidian target: `LeMot.md` (Sprint 12 status: SW10A landed @ `5e7ada6`)
- Mempalace action: n/a — observability fix, not a durable product decision. Skip unless operator chooses otherwise.
- Operator action: docs sync; expect new `[sync] pullFromCloud failed` log lines on next APK build (diagnostic surfacing, not regression — pre-existing silent failures now become visible).
- Status: PENDING
- Operator notes:

### 2026-05-19 — PR #8 SW10B storage comment drift landed

- Date: 2026-05-19
- Cloud branch: `claude/sprint12-sw10b-storage-comment-drift`
- Decision/change: `useStorage.ts` comments corrected from `AsyncStorage` to `kvStorage`. `lib/storage.ts` local binding renamed `AsyncStorage` → `kvStore` (lexical only — import path `expo-sqlite/kv-store` unchanged; exported `kvStorage` unchanged). Root `CLAUDE.md` storage note updated from `MMKV (Expo app)` to `\`expo-sqlite/kv-store\` on native, \`window.localStorage\` on web (Expo app)`. Zero runtime change.
- Source PR or commit: PR #8 / merge `21bf810` (feature commit `559fdf5`)
- Obsidian target: `LeMot.md` (Sprint 12 status: SW10B landed @ `21bf810`); optionally note that the phantom `react-native-mmkv` dependency still lives in `lemot-app/package.json` line 32 — separate chore PR if cleanup desired.
- Mempalace action: n/a — documentation correction, not a durable decision.
- Operator action: docs sync only.
- Status: PENDING
- Operator notes:

### 2026-05-19 — PR #9 SW10C schema.sql idempotency landed

- Date: 2026-05-19
- Cloud branch: `claude/sprint12-sw10c-schema-idempotency`
- Decision/change: `lemot-app/supabase/schema.sql` rewritten as an idempotent setup script. 3 `create table` and 2 `create index` statements gained `if not exists`; 8 policies paired with `drop policy if exists`; 3 triggers paired with `drop trigger if exists`; 2 `create or replace function` blocks and 3 `enable row level security` statements unchanged. Zero schema shape change. **No deploy in this PR** — operator decides when to apply via Supabase Dashboard SQL Editor.
- Source PR or commit: PR #9 / merge `4c3e16f` (feature commit `48a4b0f`)
- Obsidian target: `LeMot.md` (Sprint 12 status: SW10C landed @ `4c3e16f`); if the operator-vault Canon Merge Report tracks schema changes, mirror the note there.
- Mempalace action: optional `add_drawer` — durable infrastructure decision: "`lemot-app/supabase/schema.sql` is a re-runnable idempotent setup script as of `4c3e16f`; future re-apply on an existing DB is safe."
- Operator action: docs sync; decide when to apply via Supabase Dashboard SQL Editor; dry-run on a Supabase branch DB or local Postgres before production application if possible. For higher-traffic deploys, wrap the drop+create policy/trigger pairs in `begin; ... commit;` to avoid even a brief gap.
- Status: PENDING
- Operator notes:

### 2026-05-19 — PR #10 SW10D-1 merge union + latest dailyReview landed

- Date: 2026-05-19
- Cloud branch: `claude/sprint12-sw10d1-merge-union-and-latest`
- Decision/change: `AppProvider.tsx` merge effect now uses `mergeProgress` (set-union of completed keys) and `mergeDailyReview` (latest ISO date wins, tie = max count). Storage snapshot read **after** `pullFromCloud()` resolves (mitigation B) so in-flight local edits aren't merged from a stale snapshot. `hasPulled.current = true` moved to end of success path. New `[sync] merged progress/dailyReview` log line fires only on actual divergence. F1 (cloud-count-wins overwrites today's dailyReview), F2 (equal-count different-section split-brain), and F6 (equal-count clobber) all eliminated. F3 (errors round-trip) → SW10F; F4 (anonymous-to-real upgrade) → SW10E; F5 (push-during-pull race) partially mitigated, full serialization → SW10D-3.
- Source PR or commit: PR #10 / merge `fed57a6` (feature commit `8e9082d`)
- Obsidian target: `LeMot.md` (Sprint 12 status: SW10D-1 landed @ `fed57a6`); `LeMot - User Journey.md` (optional — record that multi-device merge is now union-safe with latest-date dailyReview).
- Mempalace action: `add_drawer` recommended — durable sync policy: "Le Mot progress merge = union(local, cloud). DailyReview merge = latest ISO date (tie = max count). Errors local-only until SW10F. Anonymous-to-real migration deferred to SW10E."
- Operator action: docs sync; run F1 and F2 simulations per the SW10D-1 spec manual QA section on a real device before broad rollout; monitor `[sync] merged progress/dailyReview` log frequency on the first APK build that includes PR #10 to confirm expected patterns.
- Status: PENDING
- Operator notes:

### 2026-05-18 — Merged Claude branches need operator-side deletion

- Date: 2026-05-18
- Cloud branch: n/a (housekeeping for ten already-merged branches)
- Decision/change: (Updated 2026-05-19 to include PR #4, PR #5, PR #7, PR #8, PR #9, and PR #10 branches.) Ten Claude branches were merged into `main` but remain on the remote because the cloud git proxy returned HTTP 403 on `git push --delete` from this session. The merge commits themselves are intact on `main`; only the source branches linger.
  - `claude/docs-pipeline-migration-v1.2.1` @ `953e39e` (merged via PR #1, merge `b155fc5`)
  - `claude/sprint12-ws8-lesson-001-path-a` @ `9139cf4` (merged via PR #2, merge `ff35013`)
  - `claude/sprint12-prc-passive-mirror-copy-cleanup` @ `ba76d68` (merged via PR #3, merge `ac9d41b`)
  - `claude/sprint12-cloud-sync-queue-backfill` @ `603cbe6` (merged via PR #4, merge `bb9ce9c`)
  - `claude/sprint12-ws9-v1-lab-entry` @ `7275802` (merged via PR #5, merge `64b9d5d`)
  - `claude/sprint12-cloud-sync-queue-pr5-backfill` @ `c93b6b2` (merged via PR #6, merge `e23c3c2`)
  - `claude/sprint12-sw10a-pull-error-semantics` @ `5f97863` (merged via PR #7, merge `5e7ada6`)
  - `claude/sprint12-sw10b-storage-comment-drift` @ `559fdf5` (merged via PR #8, merge `21bf810`)
  - `claude/sprint12-sw10c-schema-idempotency` @ `48a4b0f` (merged via PR #9, merge `4c3e16f`)
  - `claude/sprint12-sw10d1-merge-union-and-latest` @ `8e9082d` (merged via PR #10, merge `fed57a6`)
- Source PR or commit: PRs #1, #2, #3, #4, #5, #6, #7, #8, #9, #10 (all merged)
- Obsidian target: n/a
- Mempalace action: n/a
- Operator action: branch cleanup — either delete via GitHub UI (Branches → trash icon for each) or via local CLI (`git push origin --delete <branch>` for each). No code change required.
- Status: PENDING
- Operator notes:

## Archive

(drained rows older than the current sprint can be moved here in a docs-only PR)
