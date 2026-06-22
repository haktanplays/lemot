# Le Mot / Cairn — Docs Map & Precedence

> **Public-safe index.** This file is navigation only. It authorizes no code,
> no lesson implementation, no Home-visibility change, and does not unblock L7.
> For current build work, `docs/DEV_APK_MVP_CANON.md` + `docs/STATUS.md` win.
> Process and full precedence rules: `docs/MASTER_PIPELINE_v1.2.1.md` §2 (source
> of truth — this file summarizes, it does not replace it).

This is the entry point for the `docs/` tree. Start here, then read the root
`CLAUDE.md` and the canon files below.

---

## Precedence (summary — `MASTER_PIPELINE_v1.2.1.md` §2 is authoritative)

For anything being **built now**, the order is:

1. **Current-build canon** — `docs/DEV_APK_MVP_CANON.md` + `docs/STATUS.md`.
2. **Process canon** — `docs/MASTER_PIPELINE_v1.2.1.md`.
3. **Product vision / index** — `docs/CAIRN_PRODUCT_DEFINITION_v0.1.md`, then
   `docs/CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md` (both sit **below** current-build
   canon; the Dev APK canon wins for anything built now).
4. **Active workstream** for the current sprint (`docs/workstreams/round1-*`).
5. **Syllabus specs / matrices** (`docs/syllabus/*`, `docs/architecture/*`) —
   planning material, not build-ready unless explicitly promoted.
6. **Status / checkpoint docs** (`docs/status/*`) — historical record unless
   `STATUS.md` or current-build canon says otherwise.
7. **Archive / superseded / legacy** — never overrides 1–2.

Conflict rule (from the pipeline): *newer active canon > current codebase canon >
older active canon > design reference > archive.* If two docs disagree, current
build canon wins and the gap is surfaced.

---

## Document categories

| Category | Files | What it is | Authorizes implementation? | Overridden by |
|---|---|---|---|---|
| **Current-build canon** | `DEV_APK_MVP_CANON.md`, `STATUS.md` | The scope and state of what ships now (Round 1 L0-L6) | Within Round 1 scope, yes — this is the build authority | Newer entries in the same files |
| **Process canon** | `MASTER_PIPELINE_v1.2.1.md` | How work is done; precedence; cloud rules | No (process, not feature) | Operator decision |
| **Product vision** | `CAIRN_PRODUCT_DEFINITION_v0.1.md` | Long-term vision, promise, learner, boundaries | **No** — vision only | Current-build canon |
| **Product system map** | `CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md` | Index of systems + gaps, pointing at repo homes | **No** — index/map only | Current-build canon |
| **Operational / release** | `DEV_APK_SMOKE_TEST_CHECKLIST.md`, `EAS_PREVIEW_BUILD.md`, `CLOUD_SYNC_QUEUE.md`, `status/release-guardrail-audit-plan.md` | Build, smoke, release, operator worklist | No (operator runs these) | Current-build canon |
| **Workstream** | `workstreams/*` (see `workstreams/README.md`) | Per-sprint step specs and the Round 1 plan / post-smoke framework | Only the active, in-scope workstream; the rest are historical | Current-build canon |
| **Syllabus / planning** | `syllabus/*`, `architecture/*` | Lesson specs, compact-specs, gate-reviews, matrices, templates, contracts | **No** — planning/spec unless explicitly promoted | Current-build canon |
| **Status / checkpoint** | `status/*` | Point-in-time checkpoints, baselines, decisions | **No** — historical unless STATUS.md says current | `STATUS.md` |
| **Agent docs** | `agents/*` | Agent constitution, away-agent template/queue | No (process) | Operator decision |
| **Obsidian / operator planning** | `obsidian/*` | Operator-side note-tree / dashboard planning | No | Operator decision |
| **Archive / superseded** | any file marked `SUPERSEDED` | Replaced material kept for history | **No** | Already overridden |

### Explicit reminders
- **Product Definition** is vision/promise — not implementation authorization.
- **Product System Map** is index/map only — not implementation authorization.
- **Syllabus specs** are planning/spec material and do **not** override current
  Dev APK canon unless explicitly promoted (see Promotion, below).
- **Status / checkpoint docs** are historical unless `STATUS.md` or current-build
  canon says otherwise. Example: `syllabus/L07-aller-movement-next-step.lesson-spec.md`
  is superseded by `syllabus/L07-compact-doorway.compact-spec.md`, and L7
  remains blocked regardless.

---

## Git (public-safe) vs Obsidian (private)

- **Git holds public-safe build / product / index docs** — what's in this `docs/`
  tree.
- **The real/private Cairn Codex, raw strategy, raw idea dumps, founder notes,
  private tester feedback, competitor/market notes, and sensitive roadmap live
  outside git** (likely in Obsidian / the operator vault).
- **No raw Obsidian note enters git directly.** Any Obsidian-to-repo promotion
  must first be **summarized, sanitized, classified by category, and reviewed**
  before it lands as a public-safe doc.
- Durable cross-over actions that a cloud session cannot complete route through
  `docs/CLOUD_SYNC_QUEUE.md`, not into the docs tree.

---

## Status-banner convention (going forward)

New docs should open with a one-line status banner. Use one of:

- **current-build canon** — authoritative for what ships now.
- **process canon** — how work is done.
- **planning/vision only** — no implementation authorization.
- **system-map/index only** — no implementation authorization.
- **workstream / decision framework** — scoped to a sprint or a decision.
- **archive / superseded** — historical, never authoritative.
- **public-safe index** — navigation only (this file).

This convention applies to **new and edited** docs going forward. It is **not**
retrofitted across existing files in this patch.

---

## Archive / superseded rule

- When a file is later superseded, add **`SUPERSEDED`** at the top and link the
  current alternative when known.
- Archived / superseded files **never authorize implementation**.
- Never silently delete a superseded doc that others may reference; mark it and
  point forward (see `MASTER_PIPELINE_v1.2.1.md` §5 archive tier).

---

## Promotion path (idea → build)

```
raw idea / strategy (Obsidian, private)
  → sanitized + classified into a public-safe planning doc (syllabus / workstream)
  → System Map candidate (named gap, still not built)
  → specialized spec (only when building, in scope, current canon allows)
  → PR → review → implementation
```
Location does not grant authority — promotion to canon happens by editing a
current-build canon doc in a reviewed PR.

---

## Do not infer authorization

Nothing in `docs/` (outside current-build canon, within its stated scope) is a
green light to build. Specifically:

- **No L7 implementation** — blocked until the operator device smoke passes
  **and** an explicit closeout decision is made.
- **No Home-visibility change** (`<=6 → <=7` stays a separate reviewed decision).
- **No runtime changes** inferred from planning, vision, system-map, or status
  docs.
- **No smoke-pass claim** — Android/device smoke is pending and operator-only.
- **No feature implementation** derived from a planning or vision doc.

Current shippable scope remains the Round 1 Dev APK (L0-L6).
