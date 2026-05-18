# docs/workstreams

Repo-contained workstream specs for Le Mot sprints.

## Purpose

Every LM-3 or larger task (feature slice / PR-sized workstream and above, per `docs/MASTER_PIPELINE_v1.2.1.md` §3) gets a step spec stored here. The spec is the contract between ChatGPT (product orchestrator), Claude Code (implementer), and Operator (approver / deployer). It is the file Claude reads at the start of a task and updates as steps complete.

This folder is the cloud-canonical home for workstreams. The operator's local Obsidian copy at `~/Desktop/Le Mot .md/{Month}/{DD.MM.YYYY}/Sprint{N}_SW{X}_{slug}.md` is a personal mirror; if the two diverge, the repo copy wins for any session running in cloud, web, or CI.

## Naming convention

```txt
Sprint{N}_SW{X}_{slug}.md
```

- `N` — sprint number, no zero-padding. Example: `Sprint12`.
- `X` — sub-workstream number inside that sprint. Example: `SW5`.
- `slug` — short kebab-case description. Example: `l17-l23-v1-syllabus-rewrite`.

Full example:

```txt
docs/workstreams/Sprint12_SW5_l17-l23-v1-syllabus-rewrite.md
```

`SW.X` numbering is for sprint workstreams only. Pipeline phases use `P.0–P.7` instead, per `docs/MASTER_PIPELINE_v1.2.1.md` §5.

## Rules

1. **LM-3+ tasks must have a workstream spec before coding.** If no spec exists for the active task, create or update one first. LM-1 and LM-2 tasks (micro copy, single-component bug fixes) can skip this step.
2. **One PR = one product intention.** A workstream may contain multiple step specs, but each PR maps to a single intention. Do not bundle "fix TTS + redesign Daily Review + clean docs" into one PR even if all three are mentioned in the same workstream.
3. **No scope smuggling.** A workstream spec is not a vault for unrelated future work. If a new idea surfaces mid-task, write it down as a follow-up item or open a separate workstream; do not silently add it to the active spec to justify a larger diff.
4. **Spec lives with the work.** Update the spec as steps complete, mark review status, and record the commit/PR that closed each step. A workstream that disagrees with the merged commits is stale and must be reconciled, not deleted.
5. **Cloud-only sessions follow the cloud-safe paths.** All references inside a workstream spec should point at repo-relative paths (`docs/...`, `lemot-app/...`). Do not reference `~/Desktop/...` or Obsidian-vault paths as if Claude in cloud can read them; if you must reference operator-vault canon, mark the line as "operator-vault (Sync Queue if changed)".

## Suggested step spec shape

```md
# Sprint{N} SW.{X} — {Workstream Title}

## Goal
[One paragraph: what this workstream produces.]

## Tier
LM-{1|2|3|4|5}

## Canon Sources
- docs/MASTER_PIPELINE_v1.2.1.md
- docs/DEV_APK_MVP_CANON.md
- [other repo paths]

## Out of scope
- [things this workstream explicitly does not touch]

## Steps

### Step 1 — {slug}
- Goal:
- Files expected:
- Acceptance criteria:
- Tests:
- Review status: pending | in review | approved | committed
- Commit: {sha or PR# once landed}

### Step 2 — {slug}
...

## Open blockers (Operator-only)
- [APK rebuild / EAS env / Supabase deploy / physical smoke test, if any]

## Sync Queue entries created
- [link to rows in docs/CLOUD_SYNC_QUEUE.md, if any]
```

Keep the spec short. If it grows past two screens, the workstream is probably too big and should be split.
