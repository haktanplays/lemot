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

(no rows yet — first cloud session to need an entry should add it here)

## Archive

(drained rows older than the current sprint can be moved here in a docs-only PR)
