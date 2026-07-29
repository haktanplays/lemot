---
title: Cairn Project Canon Map v1.0
version: 1.0
status: Canonical
signed_off: 2026-07-26
authority: Canonical project-level routing, ownership, and governance contract
owner: Project Canon
supersedes: CAIRN_PROJECT_CANON_MAP_v0.1.md
partially_supersedes: ["08 Source of Truth Map (global routing only)", "ADR-0024 (global routing only)"]
founder_decisions: Q1–Q4 ratified 2026-07-26 (FOUNDER_LOCKED)
created: 2026-07-25
related:
  - CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md
  - CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md
  - CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md
  - CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md
  - CAIRN_PROJECT_CANON_SIGNOFF_REVIEW_v0.1.md
---

# Cairn Project Canon Map v1.0

> ## **Canonical — signed off 2026-07-26.**
>
> ### **Canonical routing authority does not confer implementation authority.**
>
> **This Map:** routes questions to domain owners · governs conflict resolution and document lifecycle · **owns project-level routing only** · **does not own domain substance** · **partially supersedes** `08 Source of Truth Map` (DOC-022) and `ADR-0024` **for global routing only**, retaining both for **current-build execution scope**.
>
> **It does not:** decide product, content, curriculum, brand, UX, engineering, privacy, operations, or mastery substance · authorize code, features, schedules, or prototypes · declare paper completeness · open any documentation layer.

---

## 1. Purpose

Cairn is not short of documentation. As of `origin/main` @ `e0f5801` the repository holds **~400 Markdown documents**, including a mature Product-Brain vault, 25 ADRs, 30 lesson specs, and three Canonical layers. The problem this map solves is not absence — it is **routing**.

**What this map exists to prevent:**

1. **Authority ambiguity — resolved (E2).** Three sub-statements, kept distinct:
   - **Historical problem.** The repository's pre-existing routing notes — `08 Source of Truth Map` and `ADR-0024` — were written *before* Product Brain v1.0, Content Bible v1.0, and Social Layer Charter v1.0, and referenced none of them. An agent following the old chain would route around all three.
   - **Current resolution.** Founder decision **Q1 (2026-07-26)** adopted **domain-first, two-axis routing**; the old chain is re-scoped to **current-build execution scope**.
   - **Operational closure.** Both source documents were **scope-amended atomically with this Map's v1.0 promotion (2026-07-26)**, so **PRJ-033 is operationally closed**. Neither source was repealed.
2. **Cross-layer orphaning.** Ideas that belong to no completed layer (evidence contract, French style guide, human audio, moderation capacity) risk vanishing between documents.
3. **Silent domain overreach.** A high-authority document answering a question it does not own.
4. **Stale gates.** A build gate that references a decision which has since changed, and therefore passes — or fails — accidentally.

**What this map is not.** It **routes** authority; it does not replace domain documents. It contains no product decision, no lesson content, no Social boundary, and no engineering contract. Where it summarizes, it summarizes *for navigation* and points to the owning document.

> **Documentation authority is not implementation authority.** A complete documentation stack tells an agent what is true and who decides. It never, by itself, authorizes writing code.

## 2. Agent entry protocol

> **Founder-ratified 2026-07-26 (Q1): the two-axis precedence model.** Before anything else, decide **which axis** the question sits on.
>
> **Axis A — intent and authority.** *"What should Cairn be? How should this owned domain behave?"* Route through this map to the domain owner, then apply: explicit current founder decision → the domain's current Canonical owner document → accepted ADRs within their technical/system domain → founder-ratified records, design canon, operational contracts, approved specifications (per Authority Spec §9). **Stop** on a missing owner or an unresolved cross-domain conflict.
>
> **Axis B — current implementation reality.** *"What actually runs today?"* Code, tests, current status records, implementation ledgers, and deployed-system evidence **govern factual reality**. Implementation evidence never determines product intent.
>
> **The current-build chain is now scoped, not global.** `CLAUDE.md → docs/STATUS.md → docs/DEV_APK_MVP_CANON.md → Cairn v1.0 specification` remains valid **only** for current-build execution scope, current branch/release constraints, current operator state, and what an already-opened implementation task may touch. **It is no longer the global product/canon precedence chain, and it must not route around Product Brain v1.0, Content Bible v1.0, Social Layer Charter v1.0, or any future Canonical domain owner.**
>
> **This map is the controlling routing authority — and is never the substantive owner** of Product, Content, Social, Curriculum, Brand, UX, Engineering, Privacy, Operations, or Mastery & Evidence decisions.

Every agent, every task, in order:

1. **Identify the task type** (product / content / curriculum / brand / UX / engineering / mastery / social / privacy / AI / release / future-exploration / documentation).
2. **Identify the affected domain**, then find its owner in §5. If two owners appear to claim it, **stop** (§10).
3. **Read the Canonical owner document** for that domain — not a supporting record, not a summary.
4. **Read its declared dependencies** (`depends_on`, and §9's graph).
5. **Inspect relevant ADRs and active implementation contracts.** For runtime questions, code and tests outrank spec (§8).
6. **Inspect open / deferred / rejected / superseded records** so a settled negative is not re-proposed as new.
7. **Check whether implementation is explicitly authorized.** Default answer is no.
8. **Check whether a prerequisite document is unauthored** (§4). If the task would require inventing it, stop.
9. **Stop and report unresolved authority conflicts.** Never fabricate a reconciliation.
10. **Do not infer permission from documentation presence.**

> **"Continue the project" is not sufficient authority to implement an `OPEN`, `DEFERRED`, `EXPERIMENT`, or `RATIFIED_DIRECTION` item.** Neither is "build the final version", "implement the future systems", "finish the app", or "proceed with the roadmap." Implementation requires a scoped opening (Authority Spec §10).

**Worked routing examples (Q1, 2026-07-26):**

| Question | Axis | Routes to |
|---|---|---|
| "How do I author lesson L12?" | A | **Content Bible v1.0** (DOC-004) |
| "Should L12 come before L13?" | A | **Curriculum Charter v1.0 (DOC-058, Canonical 2026-07-28)** — L12→L13 sits inside the ratified L0–L17 tiered spine, so the current order answers it. A **post-L17** sequencing question still has no owner → **stop and report** |
| "What is in the current APK scope?" | B | **`docs/STATUS.md` + `docs/DEV_APK_MVP_CANON.md`** (current-build chain, still valid here) |
| "What does the renderer actually do today?" | B | **Code and tests** establish the fact; record any divergence |
| "What problem does Cairn solve?" | A | **Product Brain v1.0** (DOC-001) |
| "Does a forum reply count as evidence?" | A | **Mastery & Evidence Bible v1.0 (DOC-051, Canonical)** — engagement is never evidence; a pedagogical action would require the separately ratified evidence contract that does not exist (PRJ-009); Social Charter §13 supplies the negative bound → **today the answer is no** |

## 3. Canonical document registry

IDs are stable. A document may be renamed, moved, merged, or split; its `DOC-###` survives (§12).

**Implementation authority** column: `NONE` = document confers no permission to build; `CONTRACT` = document constrains how existing runtime must behave; `EVIDENCE` = document records what runtime actually does.

| ID | Document | Path | Version | Status | Owner | Owns | Does not own | Dependencies | Supporting records | Impl. authority |
|---|---|---|---|---|---|---|---|---|---|---|
| DOC-001 | **Cairn Product Brain v1.0** | `obsidian-product-brain/ACTIVE_CODEX/00_CAIRN_PRODUCT_BRAIN/CAIRN_PRODUCT_BRAIN_v1.0.md` | 1.0 | `CANONICAL` | Product Brain | Product purpose, promise, non-goals, audience, AI philosophy, Campfire concept, monetization stance, tone | Lesson authoring, sequencing, exact flows, runtime | ADRs | DOC-002, DOC-003 | NONE |
| DOC-002 | PB Decision Register | `…/00_CAIRN_PRODUCT_BRAIN/DECISION_REGISTER.md` | — | Supporting record | Product Brain | PB-### decision index | Making decisions | DOC-001 | — | NONE |
| DOC-003 | PB Open Questions | `…/00_CAIRN_PRODUCT_BRAIN/OPEN_QUESTIONS.md` | — | Supporting record | Product Brain | Unresolved product questions | Resolving them | DOC-001 | — | NONE |
| DOC-004 | **Cairn Content Bible v1.0** | `docs/bibles/content/CONTENT_BIBLE_v1.0.md` | 1.0 | `CANONICAL` (signed off 2026-07-24) | Content Bible | Content authoring policy, item roles, prerequisite safety, French QA gate, exercise authoring | Sequencing (Curriculum), runtime enforcement (Engineering), Social | DOC-001 | DOC-005…DOC-009 | NONE |
| DOC-005 | CB Ratification Pack | `docs/bibles/content/CONTENT_BIBLE_RATIFICATION_PACK_v0.1.md` | 0.1 | Supporting record | Content Bible | Ratification evidence | Content policy | DOC-004 | — | NONE |
| DOC-006 | CB Decision Matrix | `docs/bibles/content/CONTENT_BIBLE_DECISION_MATRIX_v0.1.md` | 0.1 | Supporting record | Content Bible | CB-### decision index | Content policy | DOC-004 | — | NONE |
| DOC-007 | CB Source Gaps | `docs/bibles/content/CONTENT_BIBLE_SOURCE_GAPS_v0.1.md` | 0.1 | Supporting record | Content Bible | G1–G5 blocking gaps | Content policy | DOC-004 | — | NONE |
| DOC-008 | CB Founder Sign-Off Review | `docs/bibles/content/CONTENT_BIBLE_FOUNDER_SIGNOFF_REVIEW_v0.1.md` | 0.1 | Supporting record | Content Bible | Review verdict | Content policy | DOC-004 | — | NONE |
| DOC-009 | CB Founder Read-Through | `docs/bibles/content/CONTENT_BIBLE_FOUNDER_READTHROUGH_v0.1.md` | 0.1 | Supporting record | Content Bible | Founder card responses | Content policy | DOC-004 | — | NONE |
| DOC-010 | **Cairn Social Layer Charter v1.0** | `docs/bibles/social/SOCIAL_LAYER_CHARTER_v1.0.md` | 1.0 | `CANONICAL` (signed off 2026-07-25) | Social Layer | Social boundaries, prohibited forms, ratified direction, Social governance, Social privacy defaults, Social evidence limits | Content, Curriculum, runtime, moderation ops | DOC-001, DOC-004 | DOC-011…DOC-014 | NONE |
| DOC-011 | Social Founder Ratification | `docs/bibles/social/SOCIAL_LAYER_FOUNDER_RATIFICATION_v0.1.md` | 0.1 | Supporting record (highest-authority Social decision log) | Social Layer | Q1, R1–R11 decisions | Social policy narrative | DOC-010 | — | NONE |
| DOC-012 | Social Idea & Decision Register | `docs/bibles/social/SOCIAL_LAYER_IDEA_AND_DECISION_REGISTER_v0.1.md` | 0.1 | Supporting record | Social Layer | SOC-001…SOC-034 | Social policy | DOC-010 | — | NONE |
| DOC-013 | Social Source & Gap Map | `docs/bibles/social/SOCIAL_LAYER_SOURCE_AND_GAP_MAP_v0.1.md` | 0.1 | Supporting record | Social Layer | Social provenance/gaps | Social policy | DOC-010 | — | NONE |
| DOC-014 | Social Sign-Off Review | `docs/bibles/social/SOCIAL_LAYER_SIGNOFF_REVIEW_v0.1.md` | 0.1 | Supporting record | Social Layer | Review verdict | Social policy | DOC-010 | — | NONE |
| DOC-015 | **ADR collection** (`ADR-0001`…`ADR-0025`) — *a directory, not one decision* | `obsidian-product-brain/ACTIVE_CODEX/09_DECISIONS/ADR-*.md` | — | **Mixed-status ADR collection — consult each ADR's own status; accepted/active Canonical ADRs bind within their declared domain.** Directory membership and the `ADR-####` naming convention **confer no status**. *Current state (2026-07-26): 24 `active`/`canonical`; **ADR-0025 is `status: deferred` / `canon_status: proposed` / `implementation_status: not-started`** and does **not** bind the paywall position (see PRJ-036, still `OPEN`).* ADR-0024 remains **active and Canonical within its retained scope** (legacy-v7 quarantine and current-build execution role intact; global routing scope-amended 2026-07-26). | Decisions | Per-ADR technical & system decisions **within each ADR's own declared domain** | Content authoring · Social boundaries · **global cross-domain routing (DOC-045)** · **product/monetization intent (DOC-001)** · anything outside an individual ADR's declared domain. **Deferred, proposed, superseded, rejected or historical ADRs are inputs or open decisions — never binding authority.** | DOC-001, DOC-045 | DOC-016 | **`CONTRACT` only for individually accepted/active binding ADRs** — never collection-wide |
| DOC-016 | Decision Index + Active/Deferred/Rejected/Superseded | `…/09_DECISIONS/{Decision Index, Active, Deferred, Rejected, Superseded} Decisions.md` | — | Supporting record | Decisions | Decision routing + negative history | Making decisions | DOC-015 | — | NONE |
| DOC-017 | `CLAUDE.md` | `CLAUDE.md` | — | Agent instruction + current-scope canon (banner-gated) | Project Canon | Agent behaviour rules, current scope banner | Product intent (body is legacy v7, quarantined) | DOC-018, DOC-019 | — | `CONTRACT` |
| DOC-018 | Status | `docs/STATUS.md` | — | Current-build canon | Operations | Current execution state | Product intent | — | — | `EVIDENCE` |
| DOC-019 | Dev APK MVP Canon | `docs/DEV_APK_MVP_CANON.md` | — | Current-build canon | Operations | Dev-APK scope | Long-term product | DOC-018 | — | `CONTRACT` |
| DOC-020 | Cairn Full App One-Shot Build Spec v1.0 | `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md` | 1.0 | Approved specification (intent, not build authority) | Product Brain | Long-term product intent | Current build reality | DOC-001 | — | NONE |
| DOC-021 | Master Pipeline v1.2.1 | `docs/MASTER_PIPELINE_v1.2.1.md` | 1.2.1 | Operational contract | Operations | Workflow, tiers, review-then-commit, cloud rules | Product/content decisions | — | — | `CONTRACT` |
| DOC-022 | Source of Truth Map | `…/00_START_HERE/08 Source of Truth Map.md` | — | **Canonical routing note within current-build execution scope — globally scope-amended 2026-07-26 by Project Canon Map v1.0** | Project Canon | Vault-level source routing **for current-build questions**; current-implementation-fact routing | Global product/canon precedence; Bible-level authority | DOC-015, DOC-045 | — | NONE |
| DOC-023 | Canon and Status Legend | `…/00_START_HERE/06 Canon and Status Legend.md` | — | `CANONICAL` status vocabulary | Project Canon | Three-dimensional status model | Domain decisions | — | — | NONE |
| DOC-024 | Lesson Flow Canon v1 | `docs/canon/LESSON_FLOW_CANON_v1.md` | 1 | Approved specification | Content/Engineering (shared) | Lesson flow spec | Runtime truth | DOC-004 | — | `CONTRACT` |
| DOC-025 | Learning Engine v1 | `docs/learning-engine-v1.md` | 1 | Approved specification | Engineering (pending) | Learning-object spec | Runtime truth | — | — | `CONTRACT` |
| DOC-026 | Exercise Canon v0.4 | `docs/EXERCISE_CANON_v0.4.md` | 0.4 | Approved specification | Content Bible | Exercise families | Sequencing | DOC-004 | — | NONE |
| DOC-027 | Syllabus vault collection | `…/ACTIVE_CODEX/04_SYLLABUS/*` (26) | — | Design canon / fragmented | Curriculum *(unauthored owner)* | L0–L17 design, band map, progression rules | — | DOC-001 | DOC-028 | NONE |
| DOC-028 | Lesson & compact specs | `docs/syllabus/*` (30) | — | Approved specifications | Curriculum *(unauthored owner)* | Per-lesson specs | Sequencing policy | DOC-027 | — | `CONTRACT` |
| DOC-029 | Design vault collection | `…/ACTIVE_CODEX/07_DESIGN/*` (17) | — | Design canon / fragmented | Brand + UX *(unauthored owners)* | Brand direction, visual language, tone, navigation, design inventory | Product intent | DOC-001 | DOC-037 | NONE |
| DOC-030 | Architecture vault collection | `…/ACTIVE_CODEX/06_ARCHITECTURE/*` (15) | — | Design canon / fragmented | Engineering *(unauthored owner)* | System, storage, sync, Supabase, AI, privacy/deletion, legal governance | Product intent | DOC-015 | — | NONE |
| DOC-031 | Operations vault collection | `…/ACTIVE_CODEX/10_OPERATIONS/*` (14) | — | Operational contracts | Operations & QA *(unauthored owner)* | Workflows, validation gates, French Linguistic QA process | Content policy | DOC-021 | — | `CONTRACT` |
| DOC-032 | Implementation vault collection | `…/ACTIVE_CODEX/08_IMPLEMENTATION/*` (16) | — | Implementation evidence | Engineering *(unauthored owner)* | Ledger, known gaps, spec-runtime divergences, technical debt, feature flags | Product intent | DOC-018 | — | `EVIDENCE` |
| DOC-033 | Gaps registers | `…/ACTIVE_CODEX/98_GAPS/*` (5) | — | Supporting record | Project Canon | Contradictions, missing docs, unknowns, unmapped ideas, needs-verification | Resolving them | — | — | NONE |
| DOC-034 | Source ledger | `…/ACTIVE_CODEX/95_SOURCE_LEDGER/*` (6) | — | Supporting record | Project Canon | Source inventory, missing inputs, external artifacts | Domain decisions | — | — | NONE |
| DOC-035 | Research & ideas | `…/ACTIVE_CODEX/12_RESEARCH_AND_IDEAS/*` (8) | — | Idea registers | Future Systems *(unauthored owner)* | Future features, idea index/inbox, experiments, watchlist | Approving features | — | — | NONE |
| DOC-036 | History collection | `…/ACTIVE_CODEX/90_HISTORY/*` (10) | — | `ARCHIVED_REFERENCE` | Project Canon | Historical canon/designs/syllabus/prompt logs, superseded specs | Anything active | — | — | NONE |
| DOC-037 | Source archive (available inputs) | `obsidian-product-brain/SOURCE_ARCHIVE/AVAILABLE_INPUTS/*` (16) | — | `ARCHIVED_REFERENCE` (ingested originals) | Project Canon | Tasarım Envanteri, Round1 Handoff, Test Checklist, Visual Design Canon, Tech & Privacy Decisions, Home – Le Mot, etc. | Active canon | — | — | NONE |
| DOC-038 | Known Gaps | `docs/KNOWN_GAPS.md` | — | Supporting record | Operations | Open engineering/product gaps | Resolving them | — | — | NONE |
| DOC-039 | Roadmaps | `docs/ROADMAP.md`, `docs/CAIRN_ROADMAP_202607.md` | — | Planning documents (**two, in tension — PRJ-032**) | Operations | Execution order | Product intent | DOC-018 | — | NONE |
| DOC-040 | Cloud Sync Queue | `docs/CLOUD_SYNC_QUEUE.md` | — | Operational contract | Operations | Operator-side sync backlog | Decisions | DOC-021 | — | NONE |
| DOC-041 | Agent Constitution | `docs/agents/LE_MOT_AGENT_CONSTITUTION.md` | — | Operational contract | Operations | Agent conduct | Product/content decisions | DOC-021 | — | `CONTRACT` |
| DOC-042 | Dev APK Smoke Checklist | `docs/DEV_APK_SMOKE_TEST_CHECKLIST.md` | — | Operational contract | Operations & QA *(unauthored owner)* | Release smoke steps | Product intent | DOC-019 | DOC-037 | `CONTRACT` |
| DOC-043 | Engineering house rules | `docs/engineering/karpathy.md` | — | Operational contract | Engineering *(unauthored owner)* | Engine purity, simplicity rules | Product intent | DOC-015 (ADR-0010) | — | `CONTRACT` |
| DOC-044 | Cairn v0.1 definition + system map | `docs/CAIRN_PRODUCT_DEFINITION_v0.1.md`, `docs/CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md` | 0.1 | `SUPERSEDED` (reference only, per ADR-0024) | Project Canon | Historical product framing | Anything active | — | — | NONE |
| DOC-045 | **Cairn Project Canon Map v1.0** (this file) | `docs/canon/CAIRN_PROJECT_CANON_MAP_v1.0.md` | **1.0** | **`Canonical`** (signed off 2026-07-26) | Project Canon | Project-level routing, registry, lifecycle, stale-gate protocol | Any domain decision | DOC-001, DOC-004, DOC-010 | DOC-046…DOC-050 | NONE |
| DOC-046 | Authority & Routing Spec v0.1 | `docs/canon/CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md` | 0.1 | Supporting specification | Project Canon | Conflict algorithm, ownership model, implementation-opening contract | Domain decisions | DOC-045 | — | NONE |
| DOC-047 | Project Idea & Decision Register v0.1 | `docs/canon/CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md` | 0.1 | Supporting register | Project Canon | PRJ-### cross-layer ideas | Domain registers | DOC-045 | — | NONE |
| DOC-048 | Canon Coverage & Gaps v0.1 | `docs/canon/CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md` | 0.1 | Supporting assessment | Project Canon | Coverage matrix, authoring sequence, paper-completeness | Domain decisions | DOC-045 | — | NONE |
| DOC-049 | **Project Canon Founder Ratification v0.1** | `docs/canon/CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md` | 0.1 | Supporting record (**`FOUNDER_LOCKED` decisions**, 2026-07-26) | Project Canon | Founder decisions Q1–Q4 | Any domain decision; authoring any Bible | DOC-045 | — | NONE |
| DOC-050 | **Project Canon Sign-Off Review v0.1** | `docs/canon/CAIRN_PROJECT_CANON_SIGNOFF_REVIEW_v0.1.md` | 0.1 | Supporting review record — **not independent product canon** | Project Canon | Independent sign-off findings; reviewed head `50a8ddd`; verdict `READY WITH TARGETED CORRECTIONS`; **promotion corrections subsequently applied** | Any domain decision; promotion authority | DOC-045 | — | NONE |
| DOC-051 | **Cairn Mastery & Evidence Bible v1.0** | `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md` | 1.0 | **`CANONICAL`** (signed off 2026-07-27, after independent adversarial review `PASS WITH NON-BLOCKING FINDINGS`) | Mastery & Evidence | Evidence semantics across every evidence-bearing Cairn system (FQ-8): admissibility · attribution · polarity · evidence strength and confidence · assistance effects · weakness and repair semantics · mastery-representation meaning and transitions · aggregation · invalidation · solo/AI/future-social equivalence · the semantic contract consumed by runtime | Content authoring and pedagogical targets (DOC-004) · sequencing/readiness (Curriculum, unauthored) · schemas, storage, algorithms, enforcement (Engineering, unauthored; in-domain ADRs bind) · Social boundaries (DOC-010 — §13 negative evidence bound only) · privacy interpretation · ops execution. **Canonical ≠ implemented: legacy systems remain non-conforming Axis-B reality, frozen, not authorized for modification** | DOC-001, DOC-004, DOC-010 (§13 negative bound), DOC-015 (active in-domain ADRs 0009/0010/0013/0016/0020/0021/0022/0023) | DOC-052…DOC-057 | NONE |
| DOC-052 | M&E Decision Matrix | `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_DECISION_MATRIX_v0.1.md` | 0.1 | Supporting record | Mastery & Evidence | ME-001…ME-060 decision register | Evidence policy | DOC-051 | — | NONE |
| DOC-053 | M&E Source Conflict & Gap Map | `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_SOURCE_CONFLICT_AND_GAP_MAP_v0.1.md` | 0.1 | Supporting record | Mastery & Evidence | Provenance, conflicts, gaps, polarity-family inventory (§20.1) | Evidence policy | DOC-051 | — | NONE |
| DOC-054 | M&E Current Reality & Enforcement Map | `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_CURRENT_REALITY_AND_ENFORCEMENT_MAP_v0.1.md` | 0.1 | Supporting record (Axis B only) | Mastery & Evidence | Runtime facts, divergences, enforcement state | Evidence policy; any intent | DOC-051 | — | `EVIDENCE` |
| DOC-055 | M&E Founder Review Surface | `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_REVIEW_SURFACE_v0.1.md` | 0.1 | Supporting record (question-card provenance) | Mastery & Evidence | FQ-1…FQ-8 question cards | Evidence policy | DOC-051 | — | NONE |
| DOC-056 | M&E Founder Ratification | `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_FOUNDER_RATIFICATION_v0.1.md` | 0.1 | Supporting record (highest-authority M&E decision log) | Mastery & Evidence | FQ-1…FQ-8 founder decisions + clarification | Evidence policy narrative | DOC-051 | — | NONE |
| DOC-057 | **M&E Independent Adversarial Review** | `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_INDEPENDENT_REVIEW_v0.1.md` | 0.1 | Supporting review record — verdict `PASS WITH NON-BLOCKING FINDINGS` (2026-07-27, reviewed tip `db65db0`) | Mastery & Evidence | Independent-review evidence for the DOC-051 promotion | Any domain decision; promotion authority | DOC-051 | — | NONE |

| DOC-058 | **Cairn Curriculum Charter v1.0** | `docs/bibles/curriculum/CURRICULUM_CHARTER_v1.0.md` | 1.0 | **`CANONICAL`** (founder-signed 2026-07-28, after sign-off review `READY WITH NON-BLOCKING NOTES`) | Curriculum | **Charter-stage Curriculum governance**: the current **L0–L17 tiered spine** (L0–L6 locked/shipped/frozen · L7–L15 approved working sequence, revisable · L16–L17 spec-only · **L18+ unratified**), curriculum thesis, Journey→Capability-Arc macro-map disposition (12-unit/180 map and "Core 150" demoted to historical/reference), integration rhythm contract, prerequisite/promotion boundary, repair-pair conceptual home (L1 redesign), stop conditions and open dependencies | The full Curriculum Bible's scope: post-L17 sequencing, Capability Arc composition, item counting (PRJ-015), tense architecture, skill progression, assessment/remediation; Content/Mastery/Social/Engineering substance; any implementation. **Canonical ≠ implemented. Not the Curriculum Bible — Curriculum remains incomplete beyond Charter scope. PRJ-001 remains `OPEN` (narrowed scope); PRJ-015/029/036 remain `OPEN`.** | DOC-001, DOC-004, DOC-051, DOC-010 (negative bounds), DOC-045 | DOC-059…DOC-061 | NONE |
| DOC-059 | Curriculum Layer Discovery | `docs/bibles/curriculum/CURRICULUM_LAYER_DISCOVERY_v0.1.md` | 0.1 | Supporting record (discovery/provenance; CUR-001…CUR-042 inventory) | Curriculum | Curriculum authority reconstruction | Curriculum policy | DOC-058 | — | NONE |
| DOC-060 | Curriculum Founder Ratification | `docs/bibles/curriculum/CURRICULUM_FOUNDER_RATIFICATION_v0.1.md` | 0.1 | Supporting record (highest-authority Curriculum decision log: FQ-C0/C1/C2/C4/C8 + sign-off) | Curriculum | Founder decisions binding the Charter | Curriculum policy narrative | DOC-058 | — | NONE |
| DOC-061 | Curriculum Charter Sign-Off Review | `docs/bibles/curriculum/CURRICULUM_CHARTER_SIGNOFF_REVIEW_v0.1.md` | 0.1 | Supporting review record — verdict `READY WITH NON-BLOCKING NOTES` (N1–N3 open follow-ups) | Curriculum | Promotion review evidence | Any domain decision; promotion authority | DOC-058 | — | NONE |
| DOC-062 | **PRJ-015 Item-Counting Contract v1.0** | `docs/bibles/curriculum/PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md` | 1.0 | **`CANONICAL`** (founder-signed 2026-07-29, after sign-off review `READY WITH NON-BLOCKING NOTES`, DOC-064) — **subordinate Canonical Curriculum authority under DOC-058, not a top-level layer** | Curriculum | Counting governance: the three counting contexts and their unit definitions (identity / acquisition / presentation-load) · the active-new **1–4** interpretation (**new learner-facing active production demands**; normal 1–3, hard max 4 with rationale; integrations 0; meta/`phen:` and `sent:` anchors never count) · frame/filler and linked-cluster treatment · primary-acquisition-identity policy (linked sub-identities; YASA-2-compatible) · sense/inflection/gender counting · historical-number dispositions (8–15 `SUPERSEDED`; 52/54/56/59 classified) · authoring stop conditions | Content's 1–4 invariant itself (Content-owned) · mastery/evidence consequences (DOC-051) · runtime identity, ID syntax, linking, migration, validators (Engineering) · lexical-destination counting and the ~3,000-word band (Product; deferred) · L17's lesson-level cluster classification (separate task). **Canonical ≠ implemented — Not Implemented; no enforcement exists** | DOC-058, DOC-004, DOC-051 | DOC-063, DOC-064 | NONE |
| DOC-063 | PRJ-015 Item-Counting Discovery | `docs/bibles/curriculum/PRJ_015_ITEM_COUNTING_DISCOVERY_v0.1.md` | 0.1 | Supporting record (discovery/provenance; CNT-001…032 inventory; 52/54/56/59 audit) | Curriculum | Counting-unit reconstruction | Counting policy | DOC-062 | — | NONE |
| DOC-064 | PRJ-015 Item-Counting Sign-Off Review | `docs/bibles/curriculum/PRJ_015_ITEM_COUNTING_SIGNOFF_REVIEW_v0.1.md` | 0.1 | Supporting review record — verdict `READY WITH NON-BLOCKING NOTES`; disposition: signed off and promoted 2026-07-29 | Curriculum | Promotion review evidence | Any domain decision; promotion authority | DOC-062 | — | NONE |

> **Supporting ≠ Canonical.** DOC-002/003, DOC-005…DOC-009, DOC-011…DOC-014, DOC-052…DOC-057, DOC-059…DOC-061, and DOC-063/DOC-064 support Canonical documents but are **not themselves product canon**. They are evidence and decision records.

## 4. Documentation layers

| Layer | State | Primary document | Notes |
|---|---|---|---|
| **Product Brain** | ✅ Authored | DOC-001 | Canonical v1.0 |
| **Content Bible** | ✅ Authored | DOC-004 | Canonical v1.0, signed off 2026-07-24 |
| **Social Layer** | ✅ Authored | DOC-010 | Canonical v1.0, signed off 2026-07-25 |
| **Mastery & Evidence Bible** | ✅ **Authored — Canonical v1.0** (signed off 2026-07-27) | DOC-051 | **Founder-created layer (Q2, 2026-07-26); authored and promoted 2026-07-27** after founder ratification (FQ-1…FQ-8), source reconciliation, and an independent adversarial review (`PASS WITH NON-BLOCKING FINDINGS`, DOC-057). Single authoritative owner of the semantic evidence and mastery model, across every evidence-bearing system (FQ-8). Supporting records DOC-052…DOC-057. **Canonical ≠ implemented: the shipped runtime remains non-conforming Axis-B reality (DOC-054), and no implementation is authorized.** **Must not be merged into Curriculum or Engineering.** |
| **Curriculum** | 🟡 **PARTIALLY AUTHORED — Canonical Charter v1.0** (founder-signed 2026-07-28) | DOC-058 | **Charter-stage authority exists**: DOC-058 governs the current L0–L17 tiered spine, curriculum thesis, macro-map hierarchy, integration cadence, prerequisite/promotion boundary, and stop conditions (supporting records DOC-059…DOC-061). **The full Curriculum Bible does not yet exist** — post-L17 sequencing, Capability Arc composition, counting methodology (PRJ-015), tense architecture, skill progression, and assessment/remediation remain open; **PRJ-001 remains `OPEN` with narrowed scope**. Fragments DOC-027/028 remain reference beneath the Charter. |
| **Brand Bible** | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | — | Fragments in DOC-029: `Cairn Brand Direction`, `Visual Language`, `Copy and Tone`, `Naming and Brand Registry`; plus `Visual_Design_Canon.md` (DOC-037). Le Mot → Cairn naming migration unresolved (PRJ-030). |
| **UX / Experience Bible** | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | — | Fragments in DOC-029: `Navigation Model`, `Lesson Player`, `Home and Journey`, `Design Inventory`, `Mon Lexique UI`, `Interaction Patterns`, `Accessibility`, `V4 Studies Disposition`. V4-B direction selected but deferred. |
| **Engineering / System Bible** | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | — | Fragments in DOC-030 (15 architecture notes), DOC-025, DOC-043, and ADRs. Several ADRs already act as binding engineering contracts. |
| **Operations & QA Bible** | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | — | Fragments in DOC-031 (validation gates, French Linguistic QA process, workflows), DOC-042, DOC-021. |
| **Privacy / Legal layer** | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | — | Fragments: ADR-0023, `06_ARCHITECTURE/Privacy and Data Deletion`, `Legal Compliance and Data Governance`, `docs/status/founder-self-learning-privacy-kvkk-gdpr-architecture-note.md`, `…-remote-schema-rls-draft.md`. |
| **Future Systems Register** | `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | — | Fragments in DOC-035 (`Future Features`, `Idea Index`, `Idea Inbox`, `Watchlist`) and `98_GAPS/Unmapped Ideas`. |
| **Project Canon** | ✅ **Canonical v1.0** (signed off 2026-07-26) | DOC-045 (Map) + DOC-046…DOC-050 supporting | Routing only — confers no implementation authority |

> **Nuance that matters:** none of the unauthored layers is *empty*. Each has real source material. What is missing is a **single authoritative owner** that resolves contradictions inside the domain. See Coverage & Gaps §3.

## 5. Ownership matrix

| Question | Primary owner | Consulted | Must **not** decide it | Current state |
|---|---|---|---|---|
| What problem does Cairn solve? | Product Brain (DOC-001) | — | Content, Social, Engineering | ✅ Owned |
| Who is the target learner? | Product Brain | — | Content, Curriculum | ✅ Owned |
| Is a feature part of the product? | Product Brain | Owning domain layer | Any single spec or code file | ✅ Owned |
| How is a lesson authored? | Content Bible (DOC-004) | Exercise Canon, Lesson Flow Canon | Curriculum, Engineering | ✅ Owned |
| When is a concept introduced? | **Curriculum Charter v1.0 (DOC-058)** within the ratified L0–L17 spine; **Curriculum Bible (unauthored)** beyond it | Content Bible, PB | Content Bible alone | 🟡 Charter-stage owned (2026-07-28) — post-L17 `NOT YET AUTHORED` |
| What tone and visual language are used? | **Brand Bible** | PB (tone canon), ADR-0002 | Content Bible | ⚠️ `NOT YET AUTHORED` — fragments DOC-029 |
| What screen or flow should exist? | **UX / Experience Bible** | Brand, Content, Engineering | Content Bible, ADRs alone | ⚠️ `NOT YET AUTHORED` — fragments DOC-029 |
| How is data stored? | **Engineering / System Bible** | ADRs (binding), Privacy | Product Brain | ⚠️ `NOT YET AUTHORED` — ADRs partially bind |
| What counts as mastery evidence? | **Mastery & Evidence Bible v1.0 (DOC-051)** | Content (pedagogical target), Curriculum (readiness), Engineering (enforcement), ADR-0009/0020/0021, Social §13 (negative bound) | Content, Curriculum, Engineering, or Social **alone**; Social never owns positive evidence semantics | ✅ Owned — Canonical 2026-07-27 (**PRJ-014** complete as a documentation-owner item) |
| Is an action admissible as evidence, and at what strength? | **Mastery & Evidence Bible v1.0 (DOC-051)** | Content, Curriculum, Engineering | Social Layer | ✅ Owned — semantics Canonical; exact numeric strengths remain `TUNABLE`, none founder-locked |
| How is French QA performed? | Content Bible (policy) + **Operations & QA** (execution) | Operations fragments | Curriculum | 🟡 Policy owned; executable gate blocked (PRJ-010, PRJ-011) |
| What is required before invited-learner exposure? | Content Bible (Stage C) + **Operations & QA** | Privacy/Legal | Social | 🟡 Partly owned |
| Are users allowed to interact socially? | Social Layer (DOC-010) | PB, Privacy | Content, Engineering | ✅ Owned |
| Who handles moderation? | **Operations & QA** | Social Charter §7.2 (requires human capacity) | Social Layer alone | ⚠️ `NOT YET AUTHORED` — **PRJ-013** |
| What privacy default applies? | **Privacy / Legal** | ADR-0023 (binding), Social SOC-033 | Product Brain | 🟡 ADR binds; layer unauthored |
| What is current implementation reality? | Implementation evidence (DOC-032, DOC-018) + code + tests | — | Any spec | ✅ Owned (evidence layer) |
| What is deferred? | Owning layer's register + DOC-016 | Project register (DOC-047) | — | ✅ Owned |
| What is rejected? | Owning layer's register + `Rejected Decisions` | Project register | — | ✅ Owned |
| Who may open implementation? | **Founder only**, via scoped opening | Authority Spec §10 | Every document, including this one | ✅ Owned |

## 6. Task-specific reading routes

Each route: **(1) first read · (2) supporting · (3) authority check · (4) implementation check · (5) stop conditions.**

**Product strategy** — (1) DOC-001. (2) DOC-002/003, `01_PRODUCT/*`, DOC-020. (3) PB owns; ADRs bind technical consequences. (4) None — strategy authorizes nothing. (5) Stop if a founder statement contradicts DOC-001.

**Lesson authoring** — (1) DOC-004. (2) DOC-026, DOC-024, DOC-006/007, relevant `docs/syllabus/*` spec. (3) Content Bible owns authoring; **sequencing questions escape to Curriculum (Charter v1.0 / DOC-058 for the ratified L0–L17 spine; unauthored beyond it)**. (4) Authoring policy ≠ runtime; check DOC-032 for divergence. (5) Stop if the task needs a sequencing decision, an unwritten French style rule (PRJ-010), or a Reading taxonomy (PRJ-012).

**Curriculum sequencing** — (1) **DOC-058 Curriculum Charter v1.0 (Canonical, 2026-07-28)** — the L0–L17 tiered spine, thesis, cadence rule, and stop conditions. (2) DOC-060 (founder decisions), DOC-059 (discovery/inventory), DOC-027 (`Syllabus Design Rules`, `Level and Band Map`) and DOC-028 as reference fragments beneath the Charter, DOC-004. (3) The Charter owns Charter-stage sequencing governance; **counting questions route to the Item-Counting Contract v1.0 (DOC-062 — what does active-new 1–4 count, frames + linked IDs once or several, do fillers count, chunks/packages/senses/inflection/gender, which historical numbers remain valid)**; **post-L17 sequencing and Capability Arcs have no owner**. (4) Specs remain contracts for authored lessons only; Canonical ≠ implemented — L7+ visibility, all freezes, and the no-enforcement state of DOC-062 unchanged. (5) **Stop and report** if the task requires a post-L17 placement, a Capability Arc composition, a counting question not answered by DOC-062 (or inferring runtime enforcement from it), or any Charter §14 stop condition.

**French QA** — (1) DOC-004 §French QA gate. (2) `10_OPERATIONS/French Linguistic QA`, DOC-007 (G2/G3). (3) Content Bible owns the standard; Operations owns execution. (4) The gate is **not executable** — no style guide, no named reviewer. (5) Stop before claiming a lesson passed QA.

**UX design** — (1) DOC-029 (`Navigation Model`, `Design Inventory`). (2) DOC-001 tone, ADR-0002, `V4 Studies Disposition`. (3) ⚠️ No Canonical UX owner. (4) V4-B selected but **deferred**; do not implement globally. (5) Stop if the task implies a binding flow decision.

**Runtime engineering** — (1) ADRs (DOC-015) — several are binding. (2) DOC-030, DOC-025, DOC-043, DOC-032 (`Spec Runtime Divergences`, `Technical Debt`). (3) For "what does it do?", **code and tests outrank spec**. (4) Existing contracts constrain; they do not authorize new features. (5) Stop if canon and code diverge with no source resolving which changes.

**Mastery / evidence** — (1) **DOC-051 Mastery & Evidence Bible v1.0 (Canonical, signed off 2026-07-27)**. (2) DOC-052 (ME-### register), DOC-054 (Axis-B reality and divergences), DOC-053 (provenance/gaps), DOC-056 (founder decisions), DOC-057 (independent review); in-domain ADRs 0009/0020/0021 (binding); Social §13 (negative bound). (3) DOC-051 owns admissibility, strength, attribution, state semantics and transitions; **no other layer may decide them**. (4) Events are the source of truth; Engineering owns enforcement; **the Bible is Canonical but unimplemented — the shipped runtime is non-conforming (DOC-054), and Canonical status opens no code work**. (5) **Stop** if the task would let a non-pedagogical signal become evidence, requires the non-existent Social evidence contract (PRJ-009), or would modify any evidence-bearing runtime (legacy systems are frozen; implementation requires a new founder scoped opening).

**Social work** — (1) DOC-010. (2) DOC-011 (decisions), DOC-012 (SOC-###), DOC-013/014. (3) Social owns boundaries; Operations owns moderation; Privacy owns data. (4) **`PLANNED` = 0. Nothing is authorized.** (5) Stop unless a founder scoped opening with all ten elements exists (Charter §19 / R11).

**Privacy / deletion** — (1) ADR-0023. (2) `06_ARCHITECTURE/Privacy and Data Deletion`, `Legal Compliance and Data Governance`, `docs/status/founder-self-learning-privacy-kvkk-gdpr-*`, `…remote-schema-rls-draft`. (3) ADR binds; **Privacy/Legal layer unauthored**. (4) Deployed-DB migrations are operator-only. (5) Stop if legal interpretation is required.

**AI-system work** — (1) DOC-001 §AI philosophy. (2) `06_ARCHITECTURE/AI Architecture`, `02_LEARNING_SYSTEM/AI Role and Guardrails`, `docs/runbooks/ai-edge-hardening-pr-c.md`, DOC-019 (Chat gating). (3) PB owns AI's role; ADRs bind implementation. (4) AI is bounded support; open companion is founder-locked out. (5) Stop if the task drifts toward open-ended chat or AI-as-authority.

**Release / operator** — (1) DOC-019, DOC-042. (2) DOC-018, DOC-021, `10_OPERATIONS/Validation Gates`, `08_IMPLEMENTATION/Release and Build Process`. (3) Operations owns gates. (4) **Operator-only**: EAS builds, Supabase deploys, secrets, device smoke. (5) Stop before declaring a release complete while operator blockers are open.

**Future-system exploration** — (1) DOC-047 (this package). (2) DOC-035, `98_GAPS/Unmapped Ideas`, owning layer register. (3) No future system has implementation authority. (4) `PLANNED` ≠ implemented; `RATIFIED_DIRECTION` ≠ `PLANNED`. (5) Stop before promoting any status.

**Documentation maintenance** — (1) DOC-045 (this file). (2) DOC-046, DOC-033, DOC-034, DOC-021. (3) Project Canon owns routing only. (4) None. (5) Stop if a change would alter a domain decision — that is the owning layer's call.

## 7. Status vocabulary

Cairn carries **two coexisting vocabularies**, and this map deliberately preserves both rather than flattening them.

**(a) Vault three-dimensional model (DOC-023, Canonical):** `canon_status` ∈ {canonical, provisional, proposed, historical, superseded, unknown} · `implementation_status` ∈ {implemented, partial, spec-only, fixture-only, legacy-active, legacy-unreachable, not-started, unknown} · `verification_status` ∈ {device-verified, integration-tested, unit-tested, source-inspected, reported-only, unverified}.

**(b) Bible decision vocabulary (Content CB-###, Social SOC-###):** `CANONICAL`, `FOUNDER_LOCKED`, `RATIFIED_DIRECTION`, `DESIGN_CANON`, `PLANNED`, `EXPERIMENT`, `OPEN`, `DEFERRED`, `REJECTED`, `SUPERSEDED`, `ARCHIVED_REFERENCE`.

**Project-level reconciliation — four independent fields. Never collapse them.**

| Field | Question | Values |
|---|---|---|
| **Decision status** | Is it agreed? | `CANONICAL` · `FOUNDER_LOCKED` · `RATIFIED_DIRECTION` · `DESIGN_CANON` · `PLANNED` · `EXPERIMENT` · `OPEN` · `DEFERRED` · `REJECTED` · `SUPERSEDED` · `ARCHIVED_REFERENCE` |
| **Document status** | Is the document itself settled? | `Draft` · `Proposed` · `Review` · `Canonical` · `Superseded` · `Archived` |
| **Implementation status** | Does code exist and run? | `Implemented` · `Partially Implemented` · `Not Implemented` · `Spec-only` · `Fixture-only` · `Legacy-active` · `Legacy-unreachable` |
| **Enforcement status** | Is it mechanically enforced? | `Runtime Enforced` · `Validator Enforced` · `Test Enforced` · `Authoring Policy Only` · `Unenforced` |

Mapping note: vault `canon_status: canonical` ≈ decision status `CANONICAL`; `proposed` ≈ `OPEN`/`Proposed`; `historical` ≈ `ARCHIVED_REFERENCE`. The Bible vocabulary is **finer-grained on intent** (it distinguishes `RATIFIED_DIRECTION` from `PLANNED`), which the vault model does not express. Both remain valid in their own documents.

## 8. Canon versus implementation

- **Canonical does not mean implemented.** Social Charter v1.0 is Canonical; Social `PLANNED` = 0 and nothing is built.
- **Documented does not mean approved.** `98_GAPS/Unmapped Ideas` and `Future Features` describe ideas that are explicitly not approved.
- **Ratified Direction does not mean Planned.** The structured community (SOC-029) is a ratified *direction* with implementation state "not built · not planned for current build".
- **Planned does not mean implemented.** Several `Future Features` entries are `PLANNED`/`DEFERRED` with no code, or code that exists but is not wired.
- **Existing code does not automatically mean Canonical.** Legacy v7 (24 lessons, L14 paywall, XP/streak) exists in quarantine under `LEGACY — DO NOT BUILD ON THIS` banners and is *not* canon (ADR-0024).
- **Repository silence does not prove rejection.** The Social layer's own history is the worked example: a repo-only sweep concluded "permanently solo is canonical", which was wrong — a real founder-discussed community direction existed outside the repo.
- **Missing implementation does not prove a negative product decision.** "No community plugin exists" is an implementation fact, not a product decision.
- **Intent and reality are separate axes (Q1).** Axis A answers "what should it be?"; Axis B answers "what runs today?" Neither may be used to settle the other's question.
- **A historical founder decision does not automatically satisfy a future build gate.** Worked example: Social Q1 answered `SOC-017` YES (direction only); a build-gate line reading "Founder answers SOC-017 with a scoped YES" was therefore *already satisfied* and had to be rewritten to require a **new** scoped opening. See §13.

## 9. Dependency graph

```text
                          ┌──────────────────────────────┐
                          │ DOC-001 Product Brain v1.0   │  CANONICAL
                          │ purpose · promise · non-goals│
                          └──────┬───────────────┬───────┘
                                 │               │
              ┌──────────────────┘               └──────────────────┐
              ▼                                                     ▼
   ┌───────────────────────┐                            ┌────────────────────────┐
   │ DOC-004 Content Bible │ CANONICAL                  │ DOC-010 Social Charter │ CANONICAL
   │ authoring policy      │                            │ boundaries · direction │
   └───┬───────────┬───────┘                            └───┬──────────┬─────────┘
       │           │                                        │          │
       │           └─── needs ──► [French style guide]       │          └─ needs ─► [moderation
       │                          PRJ-010  NOT AUTHORED      │                      capacity]
       │           └─── needs ──► [named FR reviewer]        │                      PRJ-013
       │                          PRJ-011  ABSENT            │                      NOT AUTHORED
       │           └─── needs ──► [Reading taxonomy]         │
       │                          PRJ-012  NOT AUTHORED      └─ needs ─► [Social evidence contract]
       │                                                                 PRJ-009  DOES NOT EXIST
       │                                                                    │
       ▼                                                                    ▼
   ┌────────────────────────────┐                ┌──────────────────────────────────────┐
   │ Curriculum Bible           │  DEPENDENCY —  │ ★ DOC-051 MASTERY & EVIDENCE BIBLE   │
   │ sequencing · readiness     │  NOT YET       │   v1.0 — CANONICAL (2026-07-27)      │
   │ frags: DOC-027, DOC-028    │  AUTHORED      │   owns: admissibility · strength ·   │
   └─────────────┬──────────────┘                │   attribution · state semantics ·    │
                 │                               │   transitions · equivalence          │
                 │ consumes semantics            │   supporting: DOC-052…DOC-057        │
                 └──────────────────────────────►│   deps: DOC-001, DOC-004, in-domain  │
                                                 │   ADRs, DOC-010 §13 (negative bound) │
   ┌────────────────────────────┐                │   PRJ-014 ✅ · feeds PRJ-009 (open)  │
   │ Engineering / System       ├───enforces────►│   Canonical ≠ implemented: runtime   │
   └────────────────────────────┘                │   remains non-conforming (DOC-054)   │
                                                 └──────────────────────────────────────┘

   ┌────────────────────┐   ┌────────────────────┐   ┌──────────────────────┐
   │ Brand Bible        │   │ UX / Experience    │   │ Engineering / System │   all three:
   │ frags: DOC-029     │   │ frags: DOC-029     │   │ frags: DOC-030,      │   DEPENDENCY —
   │ + Visual_Design_   │   │ + V4 Studies       │   │ DOC-025, DOC-043     │   NOT YET AUTHORED
   │   Canon (DOC-037)  │   │   Disposition      │   │ + ADRs (binding)     │
   └────────────────────┘   └────────────────────┘   └──────────────────────┘

   ┌────────────────────┐   ┌────────────────────┐   ┌──────────────────────┐
   │ Operations & QA    │   │ Privacy / Legal    │   │ Future Systems Reg.  │   all three:
   │ frags: DOC-031,    │   │ frags: ADR-0023,   │   │ frags: DOC-035,      │   DEPENDENCY —
   │ DOC-042, DOC-021   │   │ DOC-030, status/*  │   │ Unmapped Ideas       │   NOT YET AUTHORED
   └────────────────────┘   └────────────────────┘   └──────────────────────┘

   IMPLEMENTATION EVIDENCE (never product intent):
   DOC-018 STATUS · DOC-032 Implementation ledger / divergences · code · tests

   ROUTING (this layer):
   DOC-045 Project Canon Map ──► DOC-046 Authority Spec
                            ├──► DOC-047 Project Idea Register
                            └──► DOC-048 Coverage & Gaps
   ⚠️ DOC-022 Source of Truth Map + ADR-0024 precedence chain PREDATE the three
      Bibles and do not reference them → stale routing, PRJ-033.
```

> **Graph update note (2026-07-28):** the "Curriculum Bible — DEPENDENCY —
> NOT YET AUTHORED" box above now reads with this amendment: Curriculum is
> **PARTIALLY AUTHORED** — the **Canonical Curriculum Charter v1.0
> (DOC-058)** governs the current L0–L17 tiered spine and Charter-stage
> sequencing principles, consuming DOC-051's semantics as drawn. The
> **Curriculum Bible box remains accurate for Bible-scope work** (post-L17
> sequencing, Capability Arcs), which is still unauthored. *(PRJ-015
> counting was resolved 2026-07-29 by the Item-Counting Contract v1.0,
> DOC-062 — a subordinate Canonical Curriculum authority; implementation
> deferred.)*

## 10. Conflict-resolution protocol

Project-level summary; the full algorithm, conflict taxonomy, and stop conditions live in **DOC-046 (Authority & Routing Spec §8–§9, §14)**.

1. **Name the actual question and pick the axis (Q1)** — Axis A ("what should the product do?") or Axis B ("what does it do today?"). Axis B is settled by code/tests/status records and never by intent documents; Axis A is settled by the domain owner and never by implementation evidence.
2. **Find the owner** (§5). Authority is applied *within the owned domain first*.
3. If the owner is unauthored → the conflict is a **missing-owner conflict**; escalate, do not improvise.
4. **Apply the baseline authority order** only inside the owned domain: explicit current founder decision → current Canonical document → accepted ADR (technical/system) → founder-ratified decision record → design canon → operational contract → approved specification → derived synthesis → historical proposal → archive.
5. **Spec vs code:** spec is plan, code is reality. Record divergence in `Spec Runtime Divergences`; never silently rewrite either.
6. **Check supersession and downstream gates** before concluding (§13).
7. **Preserve unresolved conflicts explicitly.** Fabricated reconciliation is the worst outcome.

## 11. Document lifecycle

`Draft` → `Review` → `Founder Ratification` → `Sign-Off Review` → `Canonical Promotion` → (optionally) `Implementation Contract` → `Supersession` → `Archive`.

- **Draft** — authored, no authority.
- **Review** — checked for internal consistency and source fidelity.
- **Founder Ratification** — founder answers the decision surface; decisions recorded durably.
- **Sign-Off Review** — independent pass for contradictions, stale gates, and status accuracy.
- **Canonical Promotion** — status/version/sign-off date set; supporting records stay at their own version.
- **Implementation Contract** — a *separate* act; only some documents ever acquire it.
- **Supersession / Archive** — replaced content stays discoverable with `supersedes` / `superseded_by`.

Not every small document needs the full lifecycle. **Every authority-bearing change needs traceability**: what changed, on whose authority, on what date, and which documents were re-checked.

## 12. Rename, merge, split, and consolidation rules

- **Filename and title do not create authority.** `SOCIAL_LAYER_CHARTER_v1.0.md` is authoritative because it was ratified and promoted, not because of its name.
- Documents **may** be renamed, merged, split, moved, or promoted (Charter → Bible).
- **Stable IDs survive**: `DOC-###`, `PRJ-###`, `PB-###`, `CB-###`, `SOC-###`, `ADR-####`.
- **Old-to-new mapping must be recorded** (`supersedes:` / `superseded_by:` frontmatter + change log). Worked example: `SOCIAL_LAYER_CHARTER_v0.1.md` → `SOCIAL_LAYER_CHARTER_v1.0.md` carries `supersedes:` and is logged as *organization, not a new authority event*.
- **Source provenance must survive** a move.
- **Superseded content stays discoverable** — quarantine with banners (ADR-0024's approach), never delete history.
- **A structural move is not a product decision.** If a reorganization changes meaning, it is a decision and needs the lifecycle.

## 13. Stale decision and stale gate prevention

**Mandatory.** This is the highest-value section of this map, because it describes a failure Cairn has already experienced twice.

**The failure pattern:**
1. A decision changes (or is answered for the first time).
2. An older gate, checklist, validator, or prerequisite still references the *former* state of that decision.
3. The gate silently becomes **accidentally satisfied** — or **impossible** — without anyone editing it.

**Worked example (real, 2026-07-25).** Social Charter §22's build gate began "Founder answers SOC-017 with a scoped YES." When the founder answered Q1 YES — a *direction-only* decision that explicitly authorized nothing — that gate line became **already true**. A future agent could have walked the checklist and concluded the build gate had passed. It was rewritten to require a **new** ten-element scoped opening. A second instance in the same review: the gate demanded "all six §5 invariants" after §5 had grown to seven, so a binding invariant could have been skipped.

**Required protocol after ANY decision change:**

1. **Inbound-reference scan** — find every document referencing the changed decision ID.
2. **Gate scan** — find every gate, checklist, validator, prerequisite, or "what must be true" list using it.
3. **Accidental-pass check** — would any gate now pass without new work?
4. **Impossibility check** — did any gate become unsatisfiable?
5. **Status-summary update** — headline findings, executive summaries, "current state" blocks.
6. **Source-map and count update** — provenance classes, status counts, ID totals.
7. **Supersession preservation** — mark old wording superseded; do not delete it.
8. **Exact-head re-validation** — re-run checks against the precise commit under review, not an earlier one.

> **Design rule:** a build gate should depend on a **future scoped authorization event**, never merely on the existence of a previously ratified direction. "The founder decided X" is history; "the founder has opened work on X with scope Y" is authority.

**Project-level stale reference — ✅ CLOSED 2026-07-26.** DOC-022 (`Source of Truth Map`) and ADR-0024 defined the precedence chain `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 spec`. Both predated Product Brain v1.0, Content Bible v1.0, and Social Charter v1.0 and referenced none of them.

**Founder decision Q1 (2026-07-26) resolved the model** — that chain is re-scoped to **current-build execution only**; global routing is domain-first via this Map. **Both source documents were then scope-amended atomically with this Map's v1.0 promotion**, so **PRJ-033 is operationally closed.**

> **Retained, not repealed.** DOC-022 remains **Canonical for current-build source routing** and now carries a scope banner, a re-scoped authority-order heading, a no-bypass warning on the chain, a re-routed question table (product intent → Product Brain v1.0; authoring → Content Bible v1.0; sequencing → Curriculum *unauthored*; evidence → Mastery & Evidence *unauthored*; social → Social Charter v1.0), and a forward link to this Map. ADR-0024 remains **active and Canonical in its retained scope**, with its **legacy-v7 quarantine and v0.1 supersession fully intact**, plus a scope-amendment banner, an appended Decision amendment, and a partial-supersession record covering global routing only.
>
> **This is the worked example of the protocol above:** a decision changed, every inbound reference and gate was re-scanned, and the source documents were patched in the same atomic change rather than left to drift.

## 14. Adding a new idea

Record it; do not promote it. Required fields:

| Field | Rule |
|---|---|
| **ID** | Next `PRJ-###` (project-level) or the owning layer's ID series |
| **Description** | One sentence, neutral |
| **Source** | Exact document, conversation, or commit — never "inferred" without saying so |
| **Date** | Recording date |
| **Owner** | Owning layer, or `NOT YET AUTHORED` |
| **Status** | Default `OPEN`. A positive feature may **never** be entered as `PLANNED`/`CANONICAL`/`EXPERIMENT` on an agent's own initiative |
| **Implementation state** | Default `Not Implemented` |
| **Dependencies** | Upstream decisions or unauthored layers |
| **Risks** | What breaks if it is done wrong or too early |
| **Reopen trigger** | The specific event that makes it live again |
| **Replaces / superseded by** | Preserve negative history |
| **Next decision required** | The precise question the founder or owner must answer |

## 15. Adding a new document

1. Choose the layer; confirm it does not duplicate an existing owner.
2. Assign the next `DOC-###`.
3. Declare frontmatter: `title`, `version`, `status`, `authority`, `owner`, `depends_on`, `related`.
4. State explicitly whether it carries **implementation authority** (default: `NONE`).
5. Register it in §3 with owns / does-not-own.
6. Add dependency edges to §9.
7. If it supports a Canonical document, mark it **supporting record — not product canon**.
8. Enter the lifecycle (§11); Draft ≠ authority.
9. Run the stale-reference audit (§13) against anything it changes.

## 16. Current project-level open dependencies

Summary only — details in DOC-047 and DOC-048.

- **Five wholly unauthored layers**: Brand, Engineering/System, Privacy/Legal, UX/Experience, Operations & QA (plus Future Systems Register). *(Mastery & Evidence left this list on 2026-07-27; Curriculum moved to PARTIALLY AUTHORED on 2026-07-28 — see next items.)*
- **Mastery & Evidence Bible authored and Canonical** (DOC-051, signed off 2026-07-27, after independent review DOC-057) — **PRJ-014 complete as a documentation-owner item**. Implementation reality remains partial/fragmented and non-conforming (DOC-054); no implementation opened.
- **Curriculum PARTIALLY AUTHORED** — **Cairn Curriculum Charter v1.0 (DOC-058, Canonical, founder-signed 2026-07-28)** is the Charter-stage governance vehicle of Step 2 (FQ-C0): it governs the current L0–L17 tiered spine, thesis, macro-map hierarchy, cadence, and stop conditions. **The Curriculum Bible — Step 2's full end-state — remains unauthored and is not automatically opened**; post-L17 sequencing, Capability Arc composition, and tense architecture remain open, while **PRJ-015 counting was resolved 2026-07-29** by the subordinate Canonical **Item-Counting Contract v1.0 (DOC-062)** — Canonical ≠ implemented; no validator or enforcement exists. **PRJ-001 remains `OPEN` with narrowed scope.**
- ~~**Promotion prerequisite:** DOC-022 and ADR-0024 need supersession/routing banners~~ — **✅ applied 2026-07-26; PRJ-033 operationally closed.**
- **Content Bible executable blockers**: French style guide (PRJ-010), named reviewer (PRJ-011), Reading taxonomy/validator (PRJ-012). *(Item-counting methodology — PRJ-015 — left this list 2026-07-29: semantics resolved by DOC-062; the validator that would mechanize it remains unbuilt Engineering work.)*
- **Social prerequisites that do not exist**: evidence contract (PRJ-009), moderation capacity (PRJ-013).
- **Stale project routing**: precedence chain omits all three Bibles (PRJ-033).
- **Two roadmaps in tension** (PRJ-032); paywall position tension (PRJ-036).
- **Genuinely absent operator-vault sources** (PRJ-034), including `L1-L5 Proofreading.md` — an input to PRJ-010.

## 17. Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-25 | 0.1 | Initial draft. Inventoried ~400 repository documents; registered **48 `DOC-###`** records; defined the agent entry protocol, ownership matrix, 13 task reading routes, four-field status reconciliation, dependency graph, lifecycle, rename/merge/split provenance rules, stale-gate protocol, and idea/document intake. Identified six unauthored layers with their existing source fragments and one stale project-level routing chain (PRJ-033). Canonizes no domain content; authorizes no implementation. | Cloud session (project canon mapping) |

| 2026-07-26 | 0.1 (founder ratification Q1–Q4) | **Founder decisions applied.** **Q1** — adopted the two-axis, domain-first precedence model (§2); re-scoped the `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 spec` chain to current-build execution only; added six worked routing examples; updated DOC-015/DOC-022 registry rows; **PRJ-033 decision-resolved with a promotion-time banner patch still required** (§13). **Q2** — created the **Mastery & Evidence Bible** as a distinct unauthored layer and single authoritative owner of evidence semantics (§4, §5, §6, §9, §16); it must not be merged into Curriculum or Engineering. **Q3/Q4** — sequence and gate changes recorded in Coverage & Gaps. Registered **DOC-049** (founder ratification record). Package **remains Draft**; no Bible authored; no implementation authorized. | Cloud session (founder ratification) |

**Founder decision record — Q1–Q4 (2026-07-26):** full text in [`CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md`](CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md) (DOC-049). Decisions are `FOUNDER_LOCKED`. **At that point in the process the package still stood at `Draft — awaiting founder sign-off review` and had not yet been promoted to Canonical.** It was promoted to `Canonical` later the same day (2026-07-26) — see the sign-off review and atomic-promotion row below, and the ratification status at the end of this section.

| 2026-07-26 | **1.0 (Canonical promotion)** | **Independent sign-off review** (DOC-050, verdict `READY WITH TARGETED CORRECTIONS`; 0 BLOCKER, 1 MAJOR, 4 MINOR, 2 EDITORIAL) followed by **atomic promotion**. Corrections applied: **C1** Coverage-matrix Mastery owner `DISTRIBUTED` → `Mastery & Evidence Bible — NOT YET AUTHORED` (the MAJOR); **C2** Project Canon coverage row → final promoted state; **C3** founder-fixed step numbers on every unauthored-layer next action; **C4** counting convention stated, `Operations` normalized into `Operations & QA`; **C5** registry final-state wording for DOC-022 and the ADR set; **C6** paper-complete standing corrected to **4 of 12 layer criteria satisfied, 8 remaining**; **C7** sign-off review's inaccurate "eleven remaining layers" corrected (9 at reviewed head, 8 after promotion) with a post-review application note; **E1** Privacy split-ownership clarified; **E2** purpose paragraph split into historical problem / current resolution / operational closure. **DOC-022 scope-amended (D1–D5)** and **ADR-0024 scope-amended (A1–A4)** — both retained, neither repealed, legacy-v7 quarantine intact → **PRJ-033 operationally closed**. **PRJ-008 → `CANONICAL`** (implementation state `N/A — documentation/routing layer`). Registered **DOC-050**. Counts recomputed from actual rows (`OPEN` 25→24, `CANONICAL` 0→1, Not Implemented 22→21, N/A 3→4; **`PLANNED` = 0, `EXPERIMENT` = 0, Implemented = 0**). **Status `Draft` → `Canonical`; version `0.1` → `1.0`; signed off 2026-07-26.** File renamed `CAIRN_PROJECT_CANON_MAP_v0.1.md` → `CAIRN_PROJECT_CANON_MAP_v1.0.md` (organization, not a new authority event). **Canonical does not mean implemented — normal code work remains frozen and no gate was passed.** | Cloud session (atomic promotion) |

| 2026-07-26 | 1.0 (ADR status-collection correction) | **PR #201 review finding (Codex P2), raised after promotion.** **DOC-015** had assigned Canonical status to the entire ADR collection; **ADR-0025** (`status: deferred`, `canon_status: proposed`, `implementation_status: not-started`) falsified that claim and could have made the Campfire/L24 paywall placement read as binding while **PRJ-036** records it `OPEN`. DOC-015 is now an explicit **mixed-status collection** (each ADR retains its own status; accepted/active ADRs bind only within their declared domain; deferred/proposed/superseded/rejected/historical ADRs are inputs, not authority; `CONTRACT` only for individually binding ADRs). Authority Spec class C de-enumerated with the rule that **`ADR-####` naming and directory membership confer no status**; Source of Truth Map now requires per-ADR status inspection. **ADR-0024 unchanged (active/Canonical, retained scope, quarantine intact); ADR-0025 unchanged (deferred/proposed, not promoted); PRJ-036 still `OPEN`; no paywall decision; no implementation authorized.** | Cloud session (PR-review correction) |

| 2026-07-27 | 1.0 (Mastery & Evidence promotion integration) | **Registered DOC-051…DOC-057** — the **Cairn Mastery & Evidence Bible v1.0** promoted to **`CANONICAL`** (signed off 2026-07-27, founder-authorized) with six supporting records (Decision Matrix, Source Conflict & Gap Map, Current Reality & Enforcement Map, Founder Review Surface, Founder Ratification, **Independent Adversarial Review** — verdict `PASS WITH NON-BLOCKING FINDINGS`, 0 BLOCK / 0 MAJOR / 2 NOTE, recommendation `PROMOTE`). §4 layer table: Mastery & Evidence → ✅ Authored/Canonical (DOC-051). §5 ownership rows → ✅ Owned. §6 Mastery/evidence route now reads DOC-051 first. §2 worked example and §9 graph updated. §16: unauthored layers **7 → 6**; **PRJ-014 complete as a documentation-owner item**; next founder-fixed step is **Step 2 — Curriculum Bible**. Counts re-derived from the §12 layer list in Coverage & Gaps: **5 of 12** paper-complete layer criteria satisfied, **7 remaining**. **PRJ-009 remains `OPEN` — no Social evidence contract exists. Canonical ≠ implemented: the evidence runtime remains non-conforming Axis-B reality (DOC-054); normal code work remains frozen (Q4); no implementation was authorized; paper completeness is NOT reached.** | Cloud session (founder-authorized promotion) |

| 2026-07-28 | 1.0 (Curriculum Charter promotion integration) | **Registered DOC-058…DOC-061** — the **Cairn Curriculum Charter v1.0** promoted to **`CANONICAL`** (founder-signed 2026-07-28, after founder decisions FQ-C0/C1/C2/C4/C8 and a sign-off review verdict `READY WITH NON-BLOCKING NOTES`, DOC-061; N1–N3 preserved as non-blocking follow-ups) with three supporting records (Discovery, Founder Ratification, Sign-Off Review). Scope: Charter-stage Curriculum governance — the current **L0–L17 tiered spine** (L0–L6 locked/shipped/frozen · L7–L15 approved working sequence, revisable · L16–L17 spec-only · **L18+ unratified**), curriculum thesis, Journey→Capability-Arc macro-map disposition (12-unit/180 and "Core 150" demoted to historical/reference), integration rhythm contract, prerequisite/promotion boundary, repair-pair conceptual home, stop conditions. §2 worked example, §4 layer table, §5 ownership row, §6 routes, §9 graph note, and §16 updated. **The Charter is not the Curriculum Bible; Curriculum remains incomplete beyond Charter scope; Canonical ≠ implemented; L18+ unratified; PRJ-001 remains `OPEN` with narrowed scope (explicit register clarification, not closure); PRJ-015/029/036 remain `OPEN`; paper completeness remains 5 of 12 (the §12 criterion names the Bible); no implementation authorized.** | Cloud session (founder-signed promotion) |

| 2026-07-29 | 1.0 (PRJ-015 Item-Counting Contract promotion integration) | **Registered DOC-062…DOC-064** — the **PRJ-015 Item-Counting Contract v1.0** promoted to **`CANONICAL`** (founder-signed 2026-07-29, after founder decisions FQ-P1…P6 and a sign-off review `READY WITH NON-BLOCKING NOTES`, DOC-064; three material P2 findings fixed pre-promotion) as a **subordinate Canonical Curriculum authority under DOC-058** — not a new paper-complete layer. **PRJ-015 `OPEN` → `CANONICAL`** by explicit register decision (implementation state **Not Implemented**; reopen only by Canonical revision or evidence of unusability). Scope: counting contexts (identity/acquisition/presentation), active-new = new learner-facing active production demands (normal 1–3, hard max 4 with rationale; integrations 0), frame/filler and linked-cluster rules, primary-acquisition-identity policy, sense/inflection/gender counting, historical-number dispositions (8–15 `SUPERSEDED`; 52/54/56/59 classified). Minimal source synchronization applied (Design Rules banner, spec-template budget update, archetype #10 integration correction, ADR-0012 clarification note). **Paper completeness remains 5 of 12; Curriculum remains PARTIALLY AUTHORED; the Curriculum Bible remains unauthored; the L17 lesson-level cluster classification remains a separate task; no registry, schema, validator, migration, lesson payload, or runtime change; no implementation authorized.** | Cloud session (founder-signed promotion) |

**Ratification status:** `Canonical` — **signed off 2026-07-26**.

**Canonical does not mean implemented.** This Map is the **primary Canonical document** of the Project Canon layer. Its supporting records — Authority & Routing Spec (DOC-046), Project Idea & Decision Register (DOC-047), Canon Coverage & Gaps (DOC-048), Founder Ratification (DOC-049), and Sign-Off Review (DOC-050) — remain **supporting records at v0.1**, not independent product canon, matching the Content Bible and Social Charter convention. The same convention holds in every domain: **DOC-052…DOC-057 remain supporting records** of the Canonical Mastery & Evidence Bible (DOC-051).

**Still true after the 2026-07-28 Curriculum Charter promotion:** paper completeness is **not** reached (**5 of 12** layer criteria satisfied — Project Canon, Product Brain, Content, Social, Mastery & Evidence; the Curriculum criterion requires the **Bible** Canonical, which the Charter is not — **7 remaining**, per the §12 list in Coverage & Gaps) · **normal code work remains frozen** (Q4) · Step 1 is complete; **Step 2's Charter stage is complete (DOC-058), but the Curriculum Bible — Step 2's full end-state — remains unauthored and is not automatically opened** · `PLANNED` = 0 · `EXPERIMENT` = 0 · **no implementation was authorized** · **PRJ-001 remains `OPEN` with narrowed scope; PRJ-029/036 remain `OPEN`; PRJ-015 is `CANONICAL` (resolved 2026-07-29 by DOC-062, Not Implemented)**.

*End of Project Canon Map v1.0. Canonical; routes authority; authorizes no build.*
