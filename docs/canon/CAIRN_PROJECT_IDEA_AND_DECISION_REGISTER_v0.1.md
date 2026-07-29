---
title: Cairn Project Idea and Decision Register
version: 0.1
status: Supporting register — current (ratified with Project Canon Map v1.0)
authority: Supporting cross-layer routing index under Project Canon Map v1.0. Not independent product canon.
owner: Project Canon
created: 2026-07-25
related:
  - CAIRN_PROJECT_CANON_MAP_v1.0.md
  - CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md
  - CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md
  - CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md
  - CAIRN_PROJECT_CANON_SIGNOFF_REVIEW_v0.1.md
---

# Cairn Project Idea and Decision Register v0.1

> **Supporting register — current.** A routing index, not a decision maker. Nothing here canonizes, approves, plans, or authorizes anything.

---

## What this is — and what it is not

This register exists so that **ideas which belong to no completed layer do not disappear between documents.**

**It is NOT a duplicate** of the Product Brain decision register (`PB-###`), the Content Bible decision matrix (`CB-###`), or the Social register (`SOC-###`). Those remain authoritative for their own domains. This file **references their IDs** rather than copying their rows.

**Inclusion rule** — an item appears here only if at least one is true:

1. it spans multiple layers;
2. its owner document does not yet exist;
3. it is a major future system;
4. it is a project-level rejected direction;
5. it is a major superseded direction;
6. it creates a cross-layer dependency;
7. it risks being forgotten because it survives only in historical material.

**Status vocabulary:** `CANONICAL` · `FOUNDER_LOCKED` · `RATIFIED_DIRECTION` · `DESIGN_CANON` · `PLANNED` · `EXPERIMENT` · `OPEN` · `DEFERRED` · `REJECTED` · `SUPERSEDED` · `ARCHIVED_REFERENCE`. **Implementation state is a separate field** and never inferred from status.

---

## A. Unauthored documentation layers

| ID | Idea / decision | Status | Source authority | Canonical home | Current owner | Dependencies | Implementation state | Reopen trigger | Related | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| PRJ-001 | **Curriculum Bible** — sequencing, band progression, item budgets, learner readiness | `OPEN` **(scope narrowed 2026-07-28 — status-preserving clarification, not closure)** | Derived (gap); scope clarification per founder Charter sign-off (2026-07-28) | Curriculum Bible | **Charter stage exists**: Cairn Curriculum Charter v1.0 (DOC-058, Canonical, founder-signed 2026-07-28) now governs the current **L0–L17 tiered spine** and Charter-stage sequencing principles. **The Bible itself remains `NOT YET AUTHORED`** | DOC-001, DOC-004, DOC-051, DOC-058 | Not Implemented | An explicit Project Register decision — **Charter promotion did not and does not close PRJ-001**; closure requires a separate register update assessing the remaining sequencing-policy scope | PRJ-012, PRJ-015, PRJ-029 | **PRJ-001 remains open for the full sequencing architecture: post-L17 sequence, Capability Arc composition, counting methodology (PRJ-015), tense architecture, and future Curriculum Bible scope.** Fragments DOC-027/028 remain reference beneath the Charter. Content Bible must **not** answer sequencing merely because it is Canonical. |
| PRJ-002 | **Brand Bible** — voice, naming, visual identity | `OPEN` | Derived (gap) | Brand Bible | `NOT YET AUTHORED` | DOC-001 (tone), ADR-0002 | Not Implemented | Founder opens the Brand layer | PRJ-030 | Fragments: `07_DESIGN/Cairn Brand Direction`, `Visual Language`, `Copy and Tone`, `Naming and Brand Registry`; `Visual_Design_Canon.md` (DOC-037). |
| PRJ-003 | **UX / Experience Bible** — screen states, flows, controls | `OPEN` | Derived (gap) | UX/Experience Bible | `NOT YET AUTHORED` | PRJ-002, DOC-001 | Not Implemented | Founder opens the UX layer | PRJ-019, PRJ-021 | Fragments: `Navigation Model`, `Lesson Player`, `Home and Journey`, `Design Inventory`, `Interaction Patterns`, `Accessibility`, `V4 Studies Disposition`. |
| PRJ-004 | **Engineering / System Bible** — data model, runtime, sync, validators | `OPEN` | Derived (gap) | Engineering Bible | `NOT YET AUTHORED` | DOC-015 (ADRs bind), DOC-025, DOC-043 | Partially Implemented (ADRs + code exist) | Founder opens the Engineering layer | PRJ-009, PRJ-026, PRJ-037 | Unusual case: **several ADRs already act as binding engineering contracts**, so the domain is partly governed without a Bible. Fragments: DOC-030 (15 notes). |
| PRJ-005 | **Operations & QA Bible** — validation gates, moderation ops, release, smoke | `OPEN` | Derived (gap) | Operations & QA Bible | `NOT YET AUTHORED` | DOC-021, DOC-031, DOC-042 | Partially Implemented (workflows in use) | Founder opens the Ops layer | PRJ-011, PRJ-013, PRJ-028 | Fragments: `Validation Gates`, `French Linguistic QA` (process skeleton), workflows, smoke checklist. |
| PRJ-006 | **Privacy / Legal layer** — consent, retention, minors, jurisdiction | `OPEN` | ADR-0023 (partial) | Privacy/Legal | `NOT YET AUTHORED` | ADR-0023, SOC-006/027/033 | Partially Implemented (RLS draft) | Founder opens the Privacy layer | PRJ-027, PRJ-034 | ADR-0023 binds the model; **interpretation is unowned**. Fragments: `Privacy and Data Deletion`, `Legal Compliance and Data Governance`, `docs/status/founder-self-learning-privacy-kvkk-gdpr-architecture-note.md`. |
| PRJ-007 | **Future Systems Register** — one durable home for post-beta systems | `OPEN` | Derived (gap) | Future Systems | `NOT YET AUTHORED` | DOC-035 | Not Implemented | Founder opens it | PRJ-020, PRJ-022, PRJ-023, PRJ-029 | Today's ideas are split across `Future Features`, `Idea Index`, `Idea Inbox`, `Watchlist`, `Unmapped Ideas` — five overlapping homes. |
| PRJ-008 | **Project Canon Map** (this package) | `CANONICAL` — promoted v1.0, signed off 2026-07-26 | Founder Q1–Q4 (2026-07-26) + independent sign-off review | Project Canon | **Project Canon** | DOC-001, DOC-004, DOC-010 | **N/A — documentation/routing layer** (no application runtime) | Founder revises the routing model | PRJ-033 | DOC-045 (Map v1.0) · DOC-046…DOC-048, DOC-049, DOC-050 supporting. **Canonical routing authority confers no implementation authority.** |

## B. Cross-layer prerequisites that block existing Canonical layers

| ID | Idea / decision | Status | Source authority | Canonical home | Current owner | Dependencies | Implementation state | Reopen trigger | Related | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| PRJ-009 | **Social evidence contract** — the only route by which a social pedagogical action could ever count as evidence | `OPEN` | Founder R8 (2026-07-25); routing set by Q2 (2026-07-26) | **Mastery & Evidence Bible (DOC-051)** | **Cairn Mastery & Evidence Bible v1.0** (semantics owner — Canonical since 2026-07-27) | PRJ-014, SOC-026, PRJ-001, PRJ-004 | **Does not exist** → no social action is evidence today | A scoped Social opening that proposes a pedagogical action as evidence | SOC-026, PRJ-014 | **The semantics owner now exists (DOC-051), but the contract itself still does not** — DOC-051 §24/§30 explicitly decline to create it. **Content and Curriculum are required consulted owners**; **Engineering owns enforcement**; **founder ratification remains required**; **no Social implementation is authorized**. Created *by* R8, which deliberately left the positive case to a future contract. **Must not be designed inside the Social Charter — and the existence of DOC-051 does not close this item.** |
| PRJ-010 | **French style guide** | `OPEN` | Content Bible G2; founder Q10 (accept, with timing) | Content Bible | Content Bible | `L1-L5 Proofreading.md` (**absent**, PRJ-034) | Not Implemented | Required **before Stage C** (invited-learner exposure) | PRJ-011, PRJ-034 | Ratified to be authored; does not block internal authoring or founder-only testing. Blocks the executable French-QA gate. |
| PRJ-011 | **Named French reviewer / QA staffing** | `OPEN` | Content Bible G3; founder Q10 | Operations & QA | `NOT YET AUTHORED` (PRJ-005) | PRJ-010 | Not Implemented | Stage C preparation | PRJ-010 | A staffing decision, not a missing file. Until it exists, **no lesson may be claimed QA-passed**. |
| PRJ-012 | **Reading taxonomy + validator** | `OPEN` (implementation detail; principle settled) | Content Bible G1; founder Q7 = YES | Content Bible (taxonomy) + Engineering (validator) | Content Bible / `NOT YET AUTHORED` | DOC-026 §16 (truncated in-repo) | Not Implemented | Exercise System v1 work | PRJ-001, PRJ-004 | The *principle* (action-required, production-conditional) is ratified. The family taxonomy and the validator rule-list remain open. |
| PRJ-013 | **Social moderation capacity (human/operational)** | `OPEN` | Social Charter §7.2 (2026-07-25) | Operations & QA | `NOT YET AUTHORED` (PRJ-005) | SOC-029/030, PRJ-005 | Not Implemented | A scoped Social opening | SOC-030 | Charter states **AI moderation is not sufficient coverage**; absence of staffed capacity is itself a blocker to any Social opening. Cost/staffing never assessed. |
| PRJ-014 | **Cairn Mastery & Evidence Bible** — dedicated owner of the semantic evidence and mastery model | **`CANONICAL`** — document authored and promoted 2026-07-27 (founder-authorized, after independent adversarial review `PASS WITH NON-BLOCKING FINDINGS`, DOC-057) | Founder Q2 (2026-07-26); founder promotion authorization (2026-07-27) | **Mastery & Evidence Bible (DOC-051)** | **Cairn Mastery & Evidence Bible v1.0** (`docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md`) | ADR-0009/0020/0021, DOC-004, SOC-026 | **Partially Implemented / fragmented** — ADRs, events, matrices and runtime behaviour already exist; the shipped evidence runtime remains **non-conforming** (DOC-054); **no implementation opened** | Explicit Canonical revision of DOC-051, or a founder-authorized scope change | PRJ-009, PRJ-001, PRJ-004 | **Step 1 of the founder-fixed authoring sequence is complete.** DOC-051 owns admissibility · strength/confidence · assistance-level effects · attribution · weakness and near-miss evidence · mastery-state meaning and transitions · decay/review · aggregation · invalidation by content/AI/peer/validator/UI/system error · solo↔AI↔future-social equivalence · the semantic contract consumed by runtime. Supporting records DOC-052…DOC-057 remain non-Canonical. **Must not be merged into Content, Curriculum, or Engineering. Canonical ≠ implemented: current divergences are recorded, not resolved, and no exact numeric value is founder-locked.** |
| PRJ-015 | **Item-counting methodology** | **`CANONICAL` — semantic methodology resolved 2026-07-29** (founder-signed; explicit register decision) | Content Bible G4; learning-engine-v1 §17; founder decisions FQ-P1…P6 + sign-off (2026-07-29) | **PRJ-015 Item-Counting Contract v1.0** (`docs/bibles/curriculum/PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md`, DOC-062 — Canonical Curriculum sub-authority) | Curriculum (counting policy); Content's active-new **1–4** invariant unchanged | PRJ-001 | **Not Implemented — no registry, schema, validator, migration, or runtime enforcement authorized** | Explicit Canonical revision of the Contract, or evidence that the methodology is unusable or internally contradictory — **not** merely the absence of validator/runtime enforcement | PRJ-001 (Engineering registry unification, runtime `status_by_lesson`, validator implementation, lexical-destination counting, and the L17 lesson-level cluster classification remain separate open work under their existing homes) | The exact counting unit is resolved: active-new counts **new learner-facing active production demands** (normal 1–3, hard max 4 with rationale; integrations 0); the lean identity/acquisition/presentation distinction is binding; historical `8–15` is `SUPERSEDED`. **PRJ-015's semantic documentation gap is closed; implementation remains separate.** |

## C. Major future systems (cross-layer, none authorized)

| ID | Idea / decision | Status | Source authority | Canonical home | Current owner | Dependencies | Implementation state | Reopen trigger | Related | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| PRJ-016 | **Instruction Weave** ("thermostat, not ladder") | `DEFERRED` | Vault `Unmapped Ideas` I3 | Content or Curriculum | `NOT YET AUTHORED` | PRJ-001, DOC-004 | Not Implemented | Founder opens it | PRJ-001 | Thresholds deferred to a later phase in Content material. Has no settled home. |
| PRJ-017 | **Human-recorded audio** (replacing/augmenting TTS) | `DEFERRED` | Vault `Future Features` (audio/TTS/shadowing layer) | Content + Brand + Ops | `NOT YET AUTHORED` | PRJ-002, PRJ-005 | Not Implemented (TTS is current reality) | Founder opens the audio layer | PRJ-018 | **Direction and reality coexist**: shipped app uses TTS; human audio is a future layer. Recording queue material exists in PR history. |
| PRJ-018 | **Shadowing-first direction / listening-comprehension contract** | `OPEN` | Vault `Future Features` (same cluster) | Content + Curriculum | `NOT YET AUTHORED` | PRJ-017, PRJ-001 | Not Implemented | Founder opens it | PRJ-017 | Named as a cluster with audio; no dedicated contract exists. |
| PRJ-019 | **Mon Lexique final learner-facing copy + 6-band UI** | `DEFERRED` | Content Bible CB-80; vault MD8; `Mon Lexique UI` | Content (copy) + UX (surface) | Content Bible / `NOT YET AUTHORED` | PRJ-003 | Not Implemented (hidden in dev-apk) | Mon Lexique stage activation | PRJ-003 | Band copy deferred by Content Bible; the 6-band UI spec is listed as missing documentation in the vault. |
| PRJ-020 | **Campfire internal mechanics** | `DEFERRED` | PB §14 (Canonical concept); ADR-0025; vault `Unmapped Ideas` I1 | Product Brain (concept) + UX (flow) | Product Brain / `NOT YET AUTHORED` | PRJ-003, ADR-0025 | Not Implemented | Post-paywall work | PRJ-021, PRJ-036 | Concept is Canonical and **solo** (from the learner's own inventory). Screen flow, turn count, exercise types, generation source all undefined. |
| PRJ-021 | **Summit recalibration** (phase → copy) | `DEFERRED` | Content Bible CB-84 | Content + UX | Content Bible | PRJ-003 | Not Implemented | UX layer authoring | PRJ-019 | Deferred with a clear owner; listed here only because it needs the unauthored UX layer to land. |
| PRJ-022 | **Word Graph** (vocabulary adjacency) | `DEFERRED` | Vault `Future Features`; `Unmapped Ideas` I4; SOC-014 | Content + Engineering | `NOT YET AUTHORED` | PRJ-001, PRJ-004 | Not Implemented | Post-beta | SOC-014 | **Not a social graph** — explicitly disambiguated in the Social register. |
| PRJ-023 | **A Small Moment** (retention/usefulness ritual) | `OPEN` | Vault `Unmapped Ideas` I2 | Curriculum + Content | `NOT YET AUTHORED` | PRJ-001 | Partially Implemented (seed at L16) | Curriculum authoring | PRJ-001 | Explicitly *not* a chatbot. Full lifecycle and reading-passage granularity open. |
| PRJ-024 | **AI activation package / AI tutor** | `DEFERRED` | PB §11; vault `Future Features`; `AI Role and Guardrails` | Product Brain (role) + Engineering (impl) | Product Brain / `NOT YET AUTHORED` | PRJ-004, PRJ-006 | Partially Implemented (edge functions exist; Chat gated off) | Founder opens AI activation | SOC-008, SOC-013 | AI is **bounded support**; open-ended companion is founder-locked out. Legacy 4-mode Chat is gated off in dev-apk. |
| PRJ-025 | **Analytics / measurement architecture** | `OPEN` | Vault MD14; `Measurement and Experimentation` | Engineering + Ops + Privacy | `NOT YET AUTHORED` | PRJ-004, PRJ-005, PRJ-006 | Partially Implemented | Founder opens it | PRJ-006 | Schema, thresholds, and export depth are open. Interacts with privacy consent. |
| PRJ-026 | **Offline / cloud sync model** | `OPEN` | ADR-0023; `Sync Architecture`; `Storage Architecture` | Engineering + Privacy | `NOT YET AUTHORED` | PRJ-004, PRJ-006 | Partially Implemented | Engineering layer authoring | PRJ-037 | ADR binds local-first + consent-gated remote; the full model is fragmented. |
| PRJ-027 | **Cloud data deletion (C1 path)** | `OPEN` | Vault MD10; PR #197 (open) | Privacy/Legal + Engineering | `NOT YET AUTHORED` | PRJ-006, PRJ-004 | Partially Implemented (PR open, operator-blocked) | Privacy layer authoring / PR #197 resolution | PRJ-006 | Durable multi-device deletion is in flight but **not merged**; merge blockers are operator-only. |
| PRJ-028 | **Release engineering & crash reporting** | `OPEN` | Vault MD9 | Operations & QA | `NOT YET AUTHORED` (PRJ-005) | PRJ-005 | Not Implemented | Ops layer authoring | PRJ-005 | Named as missing documentation in the vault. |
| PRJ-029 | **Post-L24 / full syllabus progression** | `OPEN` | `L18-L24 Roadmap`; `L10-L20 band map`; build spec units | Curriculum Bible | `NOT YET AUTHORED` (PRJ-001) | PRJ-001, PRJ-015 | Not Implemented | Curriculum authoring | PRJ-001 | Lessons beyond the authored range have direction but no binding sequence. |

## D. Project-level rejected, superseded, and historical directions (must stay discoverable)

| ID | Idea / decision | Status | Source authority | Canonical home | Current owner | Dependencies | Implementation state | Reopen trigger | Related | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| PRJ-030 | **Le Mot → Cairn migration** (product renaming) | `RATIFIED_DIRECTION` (incomplete) | ADR-0024; PB v1.0; repo naming | Brand Bible | `NOT YET AUTHORED` (PRJ-002) | PRJ-002 | Partially Implemented | Brand layer authoring | PRJ-002, PRJ-031 | Repo, app package, and many docs still say "Le Mot" (`lemot-app/`, `LE_MOT_AGENT_CONSTITUTION`, storage key `lm7`). Naming migration is real but unfinished — **an ownership question for Brand**. |
| PRJ-031 | **Legacy v7 product** (24 lessons, 11-section flow, L14 paywall $12.99, XP/streak, "for English speakers") | `SUPERSEDED` (quarantined, not deleted) | ADR-0024 | Product Brain | Product Brain | — | Legacy-active (behind `LEGACY — DO NOT BUILD ON THIS` banners) | — | ADR-0001, ADR-0025 | Deliberately preserved rather than deleted so history is not overwritten. **A repo-wide grep will still surface v7 language** — agents must check the banner. |
| PRJ-032 | **Two competing roadmaps** (`ROADMAP.md` vs `CAIRN_ROADMAP_202607.md`) | `OPEN` (contradiction) | Vault `Contradictions` C5 | Operations / Project Canon | Project Canon | — | N/A | Founder picks the controlling roadmap | PRJ-033 | The vault records a crosswalk, but which roadmap controls which question is unresolved. |
| PRJ-033 | **Global precedence model** (chain omitted the three Bibles) | `FOUNDER_LOCKED` — decision resolved and source patches applied 2026-07-26 | Founder Q1 (2026-07-26) | Project Canon | Project Canon | DOC-001, DOC-004, DOC-010, DOC-022, DOC-015 | N/A — **operationally closed** | Founder revises the precedence model | PRJ-008, PRJ-032 | **✅ Operationally closed 2026-07-26.** Global routing is **domain-first, two-axis** via Project Canon Map v1.0. DOC-022 (`08 Source of Truth Map`) and ADR-0024 were **scope-amended atomically with promotion** (banners + re-scoped headings + re-routed question table + partial-supersession record); both **retain scoped current-build execution authority** and neither was repealed — ADR-0024's legacy-v7 quarantine remains fully active. **No further founder decision is required.** *Decision history: this row was `OPEN`/stale-routing at capture (2026-07-25), decision-resolved but operationally open through ratification (2026-07-26), and closed by the atomic promotion the same day.* |
| PRJ-034 | **Genuinely absent operator-vault sources** | `OPEN` | `95_SOURCE_LEDGER/Missing Source Inputs` | Project Canon (import routing) | Project Canon | Operator | N/A | Operator supplies files | PRJ-010 | Still absent: `LeMot.md`, `LeMot - User Journey.md`, `Notes Archive Index.md`, **`L1-L5 Proofreading.md`** (input to PRJ-010), TOP CANON `Le_Mot_Locked_Canon…`, `CAIRN_CODEX_v0.1.md`, `CLAUDE_START_CONTEXT.md`, `TASK_CONTEXT_PACKS.md`, `OBSIDIAN_TO_GIT_PROMOTION_RULES.md`, Merged Product Canon 2026-05-11. **Contents were never invented.** |
| PRJ-035 | **V4 Studies standalone HTML** (18 MB) | `ARCHIVED_REFERENCE` (excluded from git) | `Missing Source Inputs`; `V4 Studies Disposition` | UX/Experience Bible | `NOT YET AUTHORED` (PRJ-003) | PRJ-003 | Not Implemented | UX layer authoring | PRJ-003 | Design *facts* were ingested; the artifact itself is deliberately not in git. V4-B direction selected but **globally deferred**. |
| PRJ-036 | **Paywall position tension** (Campfire ~L24 locked vs build-spec §66.3 "re-decide" vs legacy L14) | `OPEN` (contradiction) | ADR-0025; vault `Contradictions` C3 (CROWN) | Product Brain | Product Brain | — | Not Implemented (`FEATURES.paywall=false`) | Post-validation re-decision | PRJ-020, PRJ-031 | ADR-0025 locks Campfire ~L24; the build spec reserves a re-decision. Legacy L14 is superseded. |
| PRJ-037 | **Two disjoint stores / three-runtime cutover** (`lm7` v1 vs `lm_le_events` engine) | `OPEN` (contradiction) | Vault `Contradictions` C9; MD6 | Engineering Bible | `NOT YET AUTHORED` (PRJ-004) | PRJ-004 | Partially Implemented | Engineering layer authoring | PRJ-026 | A real architectural fork with no cutover plan documented. |
| PRJ-038 | **Tester cohort / remote schema (additive)** | `DEFERRED` | Vault `Unmapped Ideas` I8; `remote-schema-rls-draft` | Operations + Privacy | `NOT YET AUTHORED` | PRJ-005, PRJ-006 | Partially Implemented (draft) | Ops/Privacy layer authoring | SOC-015 | **Operational, not social** — explicitly disambiguated in the Social register (SOC-015). |

---

## Summaries

**By status — 38 records, PRJ-001…PRJ-038 contiguous** *(recomputed after the Mastery & Evidence promotion 2026-07-27)*:

| Status | Count | Change | IDs |
|---|---|---|---|
| `OPEN` | 24 | — | PRJ-001–007, 009–013, 015, 018, 023, 025, 026, 027, 028, 029, 032, 034, 036, 037 |
| `DEFERRED` | 8 | — | PRJ-016, 017, 019, 020, 021, 022, 024, 038 |
| `FOUNDER_LOCKED` | 1 | ↓ from 2 | **PRJ-033** (decision resolved **and source patches applied**) |
| **`CANONICAL`** | **2** | **↑ from 1** | **PRJ-008** — Project Canon Map v1.0 (2026-07-26) · **PRJ-014** — Mastery & Evidence Bible v1.0 promoted 2026-07-27 |
| `RATIFIED_DIRECTION` | 1 | — | PRJ-030 |
| `SUPERSEDED` | 1 | — | PRJ-031 |
| `ARCHIVED_REFERENCE` | 1 | — | PRJ-035 |
| `DESIGN_CANON` · `PLANNED` · `EXPERIMENT` · `REJECTED` | **0** | — | — |

**`PLANNED` = 0 and `EXPERIMENT` = 0 remain true after both promotions.** Both `CANONICAL` rows are **documentation layers**, not features: **no code became implemented, and no feature was planned or sanctioned.**

**By owner (first-listed owner governs routing):**

| Owner | Count | Change |
|---|---|---|
| `NOT YET AUTHORED` | 24 | ↓ from 26 (PRJ-009 and PRJ-014 now owned by DOC-051) |
| Project Canon | 4 | — |
| Content Bible | 4 | — |
| Product Brain | 4 | — |
| **Mastery & Evidence Bible v1.0 (DOC-051)** | **2** | **↑ new — PRJ-009 (semantics owner), PRJ-014** |
| **`DISTRIBUTED` — no owner** | **0** | — (eliminated by Q2) |

> **The `DISTRIBUTED` category is now empty.** Every project-level item has a named owner, even where that owner is a document not yet written.

**By primary Canonical home** *(normalized: `Operations` merged into `Operations & QA`)*: Content 7 · **Operations & QA 6** · Curriculum 4 · Engineering 4 · Product Brain 4 · Project Canon 3 · **Mastery & Evidence 2** · Brand 2 · UX 2 · Privacy 2 · Future Systems 1 · Content-or-Curriculum 1 = **38**. **Undecided: 0.**

**By implementation state:**

| State | Count | Change |
|---|---|---|
| Not Implemented | 21 | ↓ from 22 |
| Partially Implemented | 12 (incl. PRJ-014 *fragmented*) | — |
| Legacy-active (quarantined) | 1 (PRJ-031) | — |
| N/A (routing / contradiction / documentation-layer records) | 4 | ↑ from 3 — **PRJ-008** now `N/A — documentation/routing layer` |
| **Implemented** | **0** | — |

**By dependency readiness** *(revised — the authoring sequence is now founder-fixed, Q3)*:

| Readiness | Count | Meaning |
|---|---|---|
| **Blocked on an unauthored layer** | 25 | ↓ from 26 — PRJ-001 unblocked by Step 1 completion; cannot proceed without a Bible that does not exist |
| **Blocked on a founder decision** | 2 | PRJ-032 (roadmap), PRJ-036 (paywall) — Q1/Q2 removed the others |
| **Blocked on an external/operator input** | 2 | PRJ-034, PRJ-035 |
| **Blocked on staffing/capacity** | 2 | PRJ-011, PRJ-013 |
| **Ready to author now** | 1 | **PRJ-001 — Curriculum Bible is Step 2** of the founder-fixed sequence (Step 1 complete 2026-07-27; Step 2 is **not** automatically opened) |
| **Closed / completed** | 3 | **PRJ-008** (Canonical 2026-07-26) · **PRJ-033** (operationally closed) · **PRJ-014** (Canonical 2026-07-27 — documentation-owner item complete; implementation reality unchanged) |

**Cross-references to domain registers (not duplicated here):** Product Brain `PB-###` (DOC-002) · Content Bible `CB-###` (DOC-006) · Social `SOC-001…SOC-034` (DOC-012) · ADRs `ADR-0001…ADR-0025` (DOC-015 — **mixed-status collection; consult each ADR's own status**).

## Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-25 | 0.1 | Initial draft. Registered **38 `PRJ-###`** cross-layer records across four groups: unauthored layers (8), cross-layer prerequisites blocking existing Canonical layers (7), major future systems (14), and rejected/superseded/contradiction directions (9). Referenced — did not duplicate — PB/CB/SOC/ADR registers. **`PLANNED` = 0, `EXPERIMENT` = 0, Implemented = 0.** | Cloud session (project canon mapping) |

| 2026-07-26 | 0.1 (founder ratification Q1–Q4) | **PRJ-033** → `FOUNDER_LOCKED — precedence model resolved`; decision closed, **supersession banners on DOC-022 and ADR-0024 recorded as a promotion prerequisite**. **PRJ-014** → `FOUNDER_LOCKED — dedicated Mastery & Evidence owner assigned`; Canonical home **Mastery & Evidence Bible**, owner `DEPENDENCY — DOCUMENT NOT YET AUTHORED`, implementation state **Partially Implemented / fragmented**. **PRJ-009** re-routed: Mastery & Evidence owns admissibility/semantics, Content + Curriculum consulted, Engineering enforces, founder ratification still required, **no contract exists**. All summaries recomputed: `OPEN` 27→25, `FOUNDER_LOCKED` 0→2, `DISTRIBUTED` owner 1→**0**, Mastery & Evidence home **2**. No row added or renumbered; **38 records, PRJ-001…PRJ-038 contiguous**. | Cloud session (founder ratification) |

| 2026-07-26 | 0.1 (promotion corrections) | **C4** — counting convention stated explicitly (first-listed primary owner/home; compound labels are consulted/downstream and never double-counted), compound rows named (PRJ-012, 019, 020, 024), and `Operations` normalized into `Operations & QA` (home count 4+2 → **6**). **PRJ-008** → `CANONICAL` (Map v1.0, signed off 2026-07-26), implementation state **`N/A — documentation/routing layer`**. **PRJ-033** → `FOUNDER_LOCKED — decision resolved and source patches applied`, **operationally closed**, with the prior open state preserved in its decision history. Totals recomputed from actual rows: `OPEN` 25→24, `CANONICAL` 0→**1**, Not Implemented 22→21, N/A 3→4. **`PLANNED` = 0, `EXPERIMENT` = 0, Implemented = 0 unchanged.** 38 rows, PRJ-001…PRJ-038 contiguous. Status changed from Draft to **supporting register — current**; not independently Canonical. | Cloud session (atomic promotion) |

| 2026-07-27 | 0.1 (Mastery & Evidence promotion) | **PRJ-014 → `CANONICAL`**: the Cairn Mastery & Evidence Bible v1.0 (DOC-051) was authored and promoted 2026-07-27, founder-authorized, after an independent adversarial review passed on follow-up (`PASS WITH NON-BLOCKING FINDINGS`, DOC-057). Owner column now names the document; implementation state stays **Partially Implemented / fragmented** (runtime non-conforming, DOC-054); reopen trigger → explicit Canonical revision or founder-authorized scope change. **PRJ-009 remains `OPEN`**: the semantics owner now exists (DOC-051) but the positive Social evidence contract still does not — no social action is evidence today and no Social implementation is authorized; **the existence of DOC-051 does not close PRJ-009**. Totals recomputed from actual rows: `FOUNDER_LOCKED` 2→1, `CANONICAL` 1→**2**, owner `NOT YET AUTHORED` 26→24, new owner row **Mastery & Evidence Bible (DOC-051) = 2**; readiness — blocked-on-unauthored 26→25, ready-to-author = PRJ-001 (Step 2, not auto-opened), closed 2→3. **`OPEN` = 24 unchanged; `PLANNED` = 0, `EXPERIMENT` = 0, Implemented = 0 unchanged.** 38 rows, PRJ-001…PRJ-038 contiguous. | Cloud session (founder-authorized promotion) |

*End of Project Idea and Decision Register v0.1. Supporting register; routing index; approves nothing.*
