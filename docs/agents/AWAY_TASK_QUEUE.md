# Le Mot Away Task Queue

> First low-risk tasks for the Hermes / Claude away workflow. Governed by `docs/agents/LE_MOT_AGENT_CONSTITUTION.md`.
> **Local reports only.** No messaging integration, no merge/build/deploy/delete/secrets/package mutation. Every run produces a report at `.agent-runs/YYYY-MM-DD/<task-id>_report.md` (see `docs/agents/AWAY_AGENT_RUN_TEMPLATE.md`).

---

## How this queue works

1. Hermes picks the topmost task with `Status: READY`.
2. Claude executes it inside its `allowed files`, obeying `forbidden files/actions`, until the `stop condition` is met.
3. Hermes writes the run report into `.agent-runs/`.
4. Operator reviews the report, performs any `ACTION_REQUIRED`, then sets the task `Status: DONE` (or `BLOCKED` / `SUPERSEDED` with a note).

Modes are defined in the constitution §2: `report-only` (writes only to `.agent-runs/`) and `propose-only` (writes a report + inline proposed content, never applies it to canon).

Status values: `READY` | `IN PROGRESS` | `BLOCKED` | `DONE` | `SUPERSEDED`.

---

## TASK-001 — Post-APK docs backfill proposal

- **Status:** READY
- **Mode:** `propose-only`
- **Goal:** After an APK rebuild/smoke cycle, draft the documentation backfill the Operator will need to land: which `docs/` files and Sync Queue rows must be updated to reflect the build (build ID, profile, commit hash, known-fails, tester instructions). Produce the proposed text; do **not** apply it.
- **Allowed files:**
  - Read: `docs/**`, `CLAUDE.md`, `lemot-app/eas.json` (read-only), git history.
  - Write: only `.agent-runs/YYYY-MM-DD/TASK-001_report.md` (with proposed edits inline).
- **Forbidden files/actions:**
  - Editing any canonical doc (`docs/DEV_APK_MVP_CANON.md`, `docs/CLOUD_SYNC_QUEUE.md`, `CLAUDE.md`, etc.) — propose, do not apply.
  - Any app code, package manifest, Supabase, EAS, build, deploy, commit.
- **Stop condition:** A report exists at `.agent-runs/.../TASK-001_report.md` containing (a) the list of docs/Sync-Queue targets to update, (b) proposed text for each, (c) an `ACTION_REQUIRED` line telling the Operator to apply the approved edits. Stop after writing the report.

---

## TASK-002 — Physical APK smoke checklist finalization

- **Status:** READY
- **Mode:** `propose-only`
- **Goal:** Review `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` against current dev-apk canon (L1–L5 only, no paywall, chat gated, no XP/streak language, TTS FR-only, Weave Fill no placeholder speech, Daily Review eligible-pool-only, offline-safe, Android-overflow-safe) and propose a finalized, ready-to-run checklist. Produce the proposed checklist body; do **not** overwrite the file.
- **Allowed files:**
  - Read: `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md`, `docs/DEV_APK_MVP_CANON.md`, `docs/MASTER_PIPELINE_v1.2.1.md`, `CLAUDE.md`.
  - Write: only `.agent-runs/YYYY-MM-DD/TASK-002_report.md` (with the proposed finalized checklist inline).
- **Forbidden files/actions:**
  - Overwriting or editing `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` directly — propose only; the Operator applies it.
  - Any app code, package manifest, Supabase, EAS, build, deploy, commit.
  - Inventing test steps for features outside dev-apk scope (paywall, Mon Lexique, public-beta).
- **Stop condition:** A report exists with the proposed finalized checklist, a diff/summary of what changed vs the current placeholder, and an `ACTION_REQUIRED` line for the Operator to apply it. Stop after writing the report.

---

## TASK-003 — Branch cleanup audit

- **Status:** READY
- **Mode:** `report-only`
- **Goal:** Audit local and remote branches and classify each as `merged-into-main` (safe to delete), `unmerged` (keep), or `unknown/needs-review`. Cross-check against the already-queued deletion row in `docs/CLOUD_SYNC_QUEUE.md` (2026-05-18 "Merged Claude branches need operator-side deletion"). Report findings only.
- **Allowed files:**
  - Read: git refs, `docs/CLOUD_SYNC_QUEUE.md`.
  - Run (read-only): `git branch -a`, `git for-each-ref`, `git log --oneline`, `git branch --merged main`, `git branch --no-merged main`.
  - Write: only `.agent-runs/YYYY-MM-DD/TASK-003_report.md`.
- **Forbidden files/actions:**
  - **Deleting any branch** (local or remote) — deletion is Operator-only. The audit recommends; it never executes.
  - `git push`, `git push --delete`, any merge, any commit.
  - Any app code, package manifest, Supabase, EAS, build, deploy.
- **Stop condition:** A report exists listing every branch with its classification and a recommended (not executed) deletion list, reconciled against the existing Sync Queue row, with an `ACTION_REQUIRED` line. Stop after writing the report.

---

## TASK-004 — Sprint 12 closure readiness report

- **Status:** READY
- **Mode:** `report-only`
- **Goal:** Assess how close Sprint 12 is to closure per `docs/MASTER_PIPELINE_v1.2.1.md` §14. Map landed work (workstream specs + Sync Queue rows) against the recommended Sprint 12 shape (PR-A…PR-E) and the open Operator-only blockers (APK rebuild, EAS env push, Supabase deploy, secrets verify, physical smoke, build ID recorded). State what is code-side ready and what remains Operator-only. **Do not declare the sprint complete** while any Operator blocker is open (constitution §4, pipeline Rule 11).
- **Allowed files:**
  - Read: `docs/MASTER_PIPELINE_v1.2.1.md`, `docs/workstreams/**`, `docs/CLOUD_SYNC_QUEUE.md`, `CLAUDE.md`, git history.
  - Write: only `.agent-runs/YYYY-MM-DD/TASK-004_report.md`.
- **Forbidden files/actions:**
  - Marking Sprint 12 "complete/shipped/done" while Operator blockers remain open — "code-side ready" is the strongest allowed claim.
  - Any app code, package manifest, Supabase, EAS, build, deploy, merge, branch deletion, commit.
- **Stop condition:** A report exists with: landed-vs-recommended PR mapping, code-side-ready list, open Operator-only blocker list, and an explicit readiness verdict (`code-side ready, awaiting operator` or `not ready — reasons`). Stop after writing the report.

---

## Adding new tasks

Keep tasks LM-1 / LM-2 in autonomy: single intention, read-only or propose-only, tight `allowed files`, clear `stop condition`. Anything that needs to edit app code, touch a manifest, deploy, build, merge, or delete is **not** away-eligible — route it to an attended session instead.
