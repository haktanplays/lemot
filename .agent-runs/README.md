# .agent-runs

Local output directory for the Le Mot away-agent workflow (Hermes / Claude).

## What lives here

Dated run reports, one per away task:

```txt
.agent-runs/YYYY-MM-DD/<task-id>_report.md
```

Example: `.agent-runs/2026-05-28/TASK-003_report.md`.

The report format is defined in `docs/agents/AWAY_AGENT_RUN_TEMPLATE.md`. The tasks that produce them live in `docs/agents/AWAY_TASK_QUEUE.md`. The rules that bound every run are in `docs/agents/LE_MOT_AGENT_CONSTITUTION.md`.

## Tracking

These are **local reports only** — no messaging integration, no outbound notifications. The dated `YYYY-MM-DD/` subfolders are git-ignored (see `.gitignore` in this directory) so run output stays local. Only this `README.md` and the `.gitignore` are tracked, so the scaffold itself survives in the repo.

If a run produces something durable the Operator should keep (a decision, a doc change to apply), that belongs in `docs/CLOUD_SYNC_QUEUE.md` or the report's `## ACTION_REQUIRED` section — not as a committed run report.
