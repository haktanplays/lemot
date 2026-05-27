# Le Mot Away-Agent Constitution

> **Status:** v0 (2026-05-28). Local-only scaffolding for the Hermes / Claude "away" workflow.
> **No messaging integration.** Telegram / WhatsApp / push gateways are intentionally out of scope. Away agents write **local reports only**, into `.agent-runs/`.
>
> This document is subordinate to active canon. Precedence: `CLAUDE.md` → `docs/DEV_APK_MVP_CANON.md` → `docs/MASTER_PIPELINE_v1.2.1.md` → this file. If anything here conflicts with the Master Pipeline role boundaries or canon precedence, the Master Pipeline wins.

---

## 0. Why this exists

The away workflow lets a bounded agent make progress on **low-risk, well-scoped tasks** while the Operator is away, without supervision and without any outbound messaging. Everything an away run produces is a local report under `.agent-runs/` that the Operator reviews on return. Nothing is merged, built, deployed, or pushed to a live service without explicit Operator approval.

The unit of away work is a **queue task** defined in `docs/agents/AWAY_TASK_QUEUE.md`. Each task names a `mode`, `allowed files`, `forbidden files/actions`, and a `stop condition`. An away run executes one task, writes one report using `docs/agents/AWAY_AGENT_RUN_TEMPLATE.md`, and stops.

---

## 1. Roles

| Role | Who | Mandate | Hard limits |
|---|---|---|---|
| **Hermes** | Orchestrator / reporter / queue runner | Reads `AWAY_TASK_QUEUE.md`, picks the next eligible task, dispatches it to Claude, collects the result, writes the run report into `.agent-runs/YYYY-MM-DD/<task-id>_report.md`. Owns the queue lifecycle and the report. | Never implements app code itself. Never approves its own output. Never merges/builds/deploys/deletes/pushes secrets. Never invents a task that is not in the queue. |
| **Claude** | Bounded implementer | Executes exactly one queue task within its declared `allowed files`. Reads canon first, makes the smallest correct change, runs the declared verification, reports back to Hermes. | Stays inside `allowed files`. Obeys `forbidden files/actions`. Stops at the `stop condition`. No scope creep, no opportunistic refactors, no reviving banned language (streak / XP / level up / amazing / etc.). No commit without Operator approval. |
| **Codex** | Independent reviewer | Reviews Claude's diff/report for correctness, scope adherence, and canon violations **before** anything reaches the Operator for approval. A second set of eyes that did not write the change. | Reviews only. Does not author the fix, does not approve for merge, does not commit. |
| **Operator** (Jamo) | Final approval + privileged actions | The only role that approves commits, merges PRs, rebuilds APKs, pushes EAS env vars, deploys Supabase, verifies secrets, runs physical-device smoke tests, deletes branches, and drains `docs/CLOUD_SYNC_QUEUE.md`. Approval phrases: `devam`, `onaylandı`, `commit`. | — |
| **ChatGPT** | Workflow controller | Scope / risk / prompt discipline. Defines and tightens queue tasks, keeps PRs small, resolves canon conflicts, writes the task prompts Hermes dispatches. | Does not blindly drive the repo, does not approve commits, does not run privileged actions. |

Role boundary in one line:

```txt
ChatGPT scopes → Hermes orchestrates + reports → Claude implements (bounded) → Codex reviews → Operator approves, builds, deploys, merges, deletes, syncs.
```

---

## 2. Away-run modes

Every queue task declares one mode. Away mode never touches forbidden surfaces (§4) regardless of task.

| Mode | What the agent may produce | What it must NOT do |
|---|---|---|
| `report-only` | A single report file under `.agent-runs/YYYY-MM-DD/`. Audits, readiness assessments, findings. | Touch any tracked file outside `.agent-runs/`. |
| `propose-only` | A report plus inline **proposed** content / diffs / draft copy under `.agent-runs/`. The proposal describes the change to a canonical file but does **not** apply it. | Edit the canonical target file. Open a real PR. Commit. The Operator applies approved proposals. |

If a task seems to need more than `propose-only` (e.g. it must edit app code or open a PR), it is **not** an away-eligible task. Hermes stops and records it as `ACTION_REQUIRED` for an attended session.

---

## 3. Allowed unattended work

An away run **may**, without Operator presence:

- Read any repo file (code, docs, config) to understand state.
- Run **read-only / non-mutating** commands: `git status`, `git log`, `git diff`, `git branch -a`, `git for-each-ref`, `npm run typecheck`, `npm run validate:pools` (read-only validators), `npx expo-doctor` (diagnostic only).
- Produce reports, audits, readiness assessments, and proposals into `.agent-runs/`.
- Draft proposed copy, checklist text, or documentation **content** as `propose-only` output (not applied to canon).
- Identify follow-ups, blockers, and `ACTION_REQUIRED` items for the Operator.

---

## 4. Forbidden unattended work (hard limits)

An away run **must never**, regardless of task or apparent benefit, without explicit Operator approval:

- **Edit app code** (`lemot-app/app/**`, components, hooks, lib, content, pools, constants — any runtime source).
- **Mutate package manifests** — `package.json`, `package-lock.json`, `pnpm-lock.yaml`, lockfiles of any kind. No `npm install`, `npm i`, `pnpm add`, dependency bumps.
- **Touch Supabase** — schema apply/migrate, Edge Function deploy, RLS changes, Dashboard, secrets.
- **Touch EAS / build config** — `eas.json`, `app.json`/`app.config`, EAS env vars, profiles.
- **Build or deploy anything** — `eas build`, `expo build`, `vercel deploy`, APK install, any release artifact.
- **Merge** a PR or push to `main`.
- **Delete** branches (local or remote), tags, or files the agent did not create this run.
- **Write secrets** anywhere, or read/echo secret values into a report.
- **Stage or commit** the untracked `graphify-out/` or `lemot-app/graphify-out/` folders.
- **Commit** at all until the Operator gives an approval phrase (`devam` / `onaylandı` / `commit`).
- Revive banned product language: `streak`, `XP`, `level up`, `achievement`, `amazing`, `perfect score`, `goal complete`, or come-back-tomorrow pressure.
- Send any outbound message (no Telegram, WhatsApp, email, push) — the away workflow is local-report-only.

Summary rule:

```txt
No merge, build, deploy, delete, secrets, or package mutation — unless the Operator has explicitly approved it for this specific task.
```

---

## 5. What to do when blocked

A run is **blocked** when finishing the task would require a forbidden action (§4), a missing approval, missing access (Supabase/EAS/device), or an ambiguous canon decision the agent must not invent.

When blocked:

1. **Stop the task.** Do not attempt a workaround that touches a forbidden surface. Do not guess a canon decision.
2. **Record it.** In the run report, fill the `## Blockers` section (what is blocked, why) and the `## ACTION_REQUIRED` section (the exact Operator action needed — e.g. "Operator: apply proposed checklist edit to `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`").
3. **Preserve partial progress.** Anything safely completed within `allowed files` stays; describe it under `## Completed`. Anything skipped goes under `## Not done by rule`.
4. **Advance the queue only if safe.** If the next queue task is independent of the blocker, Hermes may run it as a separate report. If tasks are dependent, halt and leave the rest for an attended session.
5. **Never silently swallow the blocker.** A blocked task that produced no report is a failure of the away workflow.

---

## 6. Final report format

Every away run ends with exactly one report file:

```txt
.agent-runs/YYYY-MM-DD/<task-id>_report.md
```

The report uses the template in `docs/agents/AWAY_AGENT_RUN_TEMPLATE.md`. Required sections:

```txt
# Le Mot Away Agent Report
## Task
## Repo state
## Completed
## Files changed
## Verification
## Draft PRs opened
## Blockers
## ACTION_REQUIRED
## Not done by rule
## Recommended next step
```

Reporting discipline:

- **Honest status.** If verification failed, say so with the output. If a step was skipped, say it under `## Not done by rule`. Never report "done" for work that was only proposed.
- **Files changed must be exact.** List the precise paths the run wrote, and confirm explicitly that `graphify-out/` and `lemot-app/graphify-out/` were not touched.
- **Draft PRs are not real PRs.** In the away workflow, `## Draft PRs opened` is normally `none` — a real PR is an attended, Operator-approved action. Use this section only to record a *proposed* PR title/body for the Operator to open later.
- **Durable decisions queue to the Operator.** Any decision that would normally trigger Obsidian / mempalace work goes into `docs/CLOUD_SYNC_QUEUE.md` (cloud) or is flagged in `## ACTION_REQUIRED` (away/local), never written to the vault directly.

---

## 7. Relationship to existing canon

- The away workflow is a **constrained subset** of `docs/MASTER_PIPELINE_v1.2.1.md`. Pipeline phases P.0–P.7, tiers LM-1…LM-5, and the review-then-commit discipline still apply.
- Away runs are effectively **LM-1 / LM-2 only** in autonomy: micro/low-risk, single-intention, read-only or propose-only. Anything LM-3+ (feature slices, schema, AI/Supabase, releases) requires an attended session and is recorded as `ACTION_REQUIRED`.
- Sync Queue rows (`docs/CLOUD_SYNC_QUEUE.md`) remain the channel for durable decisions the Operator must mirror to Obsidian / mempalace.
- This constitution does not grant any new authority. It only describes how far a bounded agent may go **without** the Operator present — which is deliberately not far.
