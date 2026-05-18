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

### 2026-05-18 — Merged Claude branches need operator-side deletion

- Date: 2026-05-18
- Cloud branch: n/a (housekeeping for three already-merged branches)
- Decision/change: Three Claude branches were merged into `main` but remain on the remote because the cloud git proxy returned HTTP 403 on `git push --delete` from this session. The merge commits themselves are intact on `main`; only the source branches linger.
  - `claude/docs-pipeline-migration-v1.2.1` @ `953e39e` (merged via PR #1)
  - `claude/sprint12-ws8-lesson-001-path-a` @ `9139cf4` (merged via PR #2)
  - `claude/sprint12-prc-passive-mirror-copy-cleanup` @ `ba76d68` (merged via PR #3)
- Source PR or commit: PRs #1, #2, #3 (all merged)
- Obsidian target: n/a
- Mempalace action: n/a
- Operator action: branch cleanup — either delete via GitHub UI (Branches → trash icon for each) or via local CLI (`git push origin --delete <branch>` for each). No code change required.
- Status: PENDING
- Operator notes:

## Archive

(drained rows older than the current sprint can be moved here in a docs-only PR)
