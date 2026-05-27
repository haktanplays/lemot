# Le Mot Away Agent Run Template

> Template every away run uses for its final report. Governed by `docs/agents/LE_MOT_AGENT_CONSTITUTION.md`. Tasks live in `docs/agents/AWAY_TASK_QUEUE.md`.

---

## Report path

Each away run writes exactly one report to:

```txt
.agent-runs/YYYY-MM-DD/<task-id>_report.md
```

- `YYYY-MM-DD` — the run date (e.g. `2026-05-28`).
- `<task-id>` — the queue task id (e.g. `TASK-003`).

Example:

```txt
.agent-runs/2026-05-28/TASK-003_report.md
```

The dated subfolders hold **local reports only** — they are not committed by default (see `.agent-runs/.gitignore`). The `.agent-runs/` scaffold (its `README.md` and `.gitignore`) is tracked; the run reports are not.

---

## Report format

Copy the block below into the report file and fill every section. Do not delete sections — if one is empty, write `none` or `n/a` so the Operator can see it was considered.

```md
# Le Mot Away Agent Report

## Task
<!-- Task id + title from AWAY_TASK_QUEUE.md, the mode, and a one-line restatement of the goal. -->

## Repo state
<!-- Branch, latest commit (sha + subject), `git status --short` summary at run start. Note untracked graphify-out/ folders as untouched. -->

## Completed
<!-- What was actually finished, within allowed files. Be specific and honest. -->

## Files changed
<!-- Exact paths written this run. For report-only/propose-only this should be just the report file under .agent-runs/. Explicitly confirm graphify-out/ and lemot-app/graphify-out/ were NOT touched. -->

## Verification
<!-- Read-only checks run and their result (e.g. `npm run typecheck` ✅/❌, `npm run validate:pools` ✅/❌, git read-only commands). Paste failing output if any. If nothing was verified, say why. -->

## Draft PRs opened
<!-- Normally `none` in the away workflow. A real PR is Operator-approved and attended. If a PR was *proposed*, give the suggested title + body here for the Operator to open later. -->

## Blockers
<!-- Anything that stopped progress: forbidden action required, missing approval, missing access (Supabase/EAS/device), ambiguous canon. `none` if clean. -->

## ACTION_REQUIRED
<!-- Exact Operator actions needed, one per line. e.g. "Operator: apply proposed checklist edit to docs/DEV_APK_SMOKE_TEST_CHECKLIST.md". `none` if clean. -->

## Not done by rule
<!-- Things deliberately skipped because the constitution forbids them unattended (edits to canon, app code, deploys, merges, branch deletes, commits). `none` if nothing was skipped. -->

## Recommended next step
<!-- The single most useful next action — for the Operator, or the next away task to run. -->
```

---

## Discipline reminders (from the constitution)

- **Report-only / propose-only never edit canon or app code.** Proposals stay inline in the report; the Operator applies approved ones.
- **No commit, merge, build, deploy, branch delete, secret write, or package mutation** without an explicit Operator approval phrase (`devam` / `onaylandı` / `commit`).
- **Never stage** `graphify-out/` or `lemot-app/graphify-out/`.
- **Honest status only.** "Proposed" is not "done". Failing verification is reported with its output, not hidden.
- **Durable decisions** go to `docs/CLOUD_SYNC_QUEUE.md` or `## ACTION_REQUIRED` — never written straight to Obsidian / mempalace.
