---
title: Cairn Canon Coverage and Gaps
version: 0.1
status: Supporting coverage assessment — current (ratified with Project Canon Map v1.0)
authority: Supporting coverage assessment under Project Canon Map v1.0. Not independent product canon. Authorizes no implementation.
owner: Project Canon
created: 2026-07-25
related:
  - CAIRN_PROJECT_CANON_MAP_v1.0.md
  - CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md
  - CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md
  - CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md
  - CAIRN_PROJECT_CANON_SIGNOFF_REVIEW_v0.1.md
---

# Cairn Canon Coverage and Gaps v0.1

> **Supporting coverage assessment — current.** Not independent canon; ratified alongside Project Canon Map v1.0. What remains to be authored before returning to code — and what "done on paper" would mean. Assesses coverage; authors no missing layer; authorizes no implementation.

---

## 1. Coverage method

A domain counts as **covered** only when all seven hold:

1. **Owned** — exactly one document is authoritative for it.
2. **Authoritative** — that document has been ratified, not merely written.
3. **Discoverable** — an agent can find it from the entry point without prior knowledge.
4. **Cross-linked** — its dependencies are declared in both directions.
5. **Status-classified** — every claim carries a decision status.
6. **Implementation state stated** — intent and reality are separately recorded.
7. **Conflicts resolved or explicitly open** — no silent contradiction.

Ratings: `COMPLETE` · `SUBSTANTIAL` · `PARTIAL` · `FRAGMENTED` · `ABSENT`. **No percentages** — there is no defensible counting unit across domains of such different shape.

> **`FRAGMENTED` ≠ `ABSENT`.** Cairn's characteristic state is *rich material, no owner*. Six domains have substantial documentation and no authoritative document (Curriculum, Engineering/System, Privacy/Legal, Operations & QA, UX/Experience, Brand — §3). Treating them as empty would be wrong and would invite an agent to rewrite what already exists. *(Mastery & Evidence left this state on 2026-07-27, when its Bible was promoted to Canonical — §2.4.)*

## 2. Current completed Canonical layers

### 2.1 Product Brain v1.0 — `SUBSTANTIAL`

- **Status:** `CANONICAL`. Path: `obsidian-product-brain/ACTIVE_CODEX/00_CAIRN_PRODUCT_BRAIN/CAIRN_PRODUCT_BRAIN_v1.0.md` (DOC-001), with `DECISION_REGISTER.md` (PB-###) and `OPEN_QUESTIONS.md`.
- **Scope:** purpose, promise, audience, deliberate non-goals, AI philosophy, Campfire concept, monetization stance, tone.
- **Strengths:** it is the only document that credibly answers "what is Cairn and what is it deliberately not?" Backed by 25 ADRs and a large `01_PRODUCT` note set. Its non-goals have already proven load-bearing — they are what stopped the Social layer from drifting into gamification.
- **Open dependencies:** paywall position tension (PRJ-036); Campfire internal mechanics undefined (PRJ-020); Le Mot → Cairn naming migration unfinished (PRJ-030); AI activation deferred (PRJ-024).
- **Sufficient for an agent within its domain?** **Yes** for product intent. **No** for anything downstream of intent — it does not and should not answer sequencing, flows, or runtime.

### 2.2 Content Bible v1.0 — `SUBSTANTIAL`

- **Status:** `CANONICAL`, signed off 2026-07-24. Path: `docs/bibles/content/CONTENT_BIBLE_v1.0.md` (DOC-004), plus five supporting records.
- **Scope:** authoring policy, item roles (active/supported/recognition-only/recycled/blocked-production/ghost/exposure), prerequisite safety, insight budgets, French QA standard, Reading principle.
- **Strengths:** unusually explicit about its own limits — its Source Gaps file (DOC-007) names five blocking gaps rather than papering over them. Provenance tagging (`[FL]`, `[ADR-n]`, `[DC]`, `[DR]`, `[TUNABLE]`, `[OPEN]`) means an agent can see *why* each rule holds.
- **Open dependencies:** French style guide absent (PRJ-010); named reviewer absent (PRJ-011); Reading taxonomy/validator open (PRJ-012); item-counting methodology open (PRJ-015); Mon Lexique band copy deferred (PRJ-019).
- **Sufficient for an agent within its domain?** **Yes for authoring**, with one caveat: the French-QA gate is **not executable** today, so no lesson may be claimed QA-passed. Sequencing questions must escape to Curriculum.

### 2.3 Social Layer Charter v1.0 — `COMPLETE` (for its scope)

- **Status:** `CANONICAL`, signed off 2026-07-25. Path: `docs/bibles/social/SOCIAL_LAYER_CHARTER_v1.0.md` (DOC-010), plus four supporting records and SOC-001…SOC-034.
- **Scope:** Social boundaries, prohibited forms, ratified future direction, governance, privacy defaults, evidence limits, cross-layer routing.
- **Strengths:** the most rigorously bounded layer. `PLANNED` = 0, `EXPERIMENT` = 0. Every positive feature is explicitly unapproved; every boundary states its reopen gate. Its governance rule (documentation is not implementation authority) is the model generalized in the Authority Spec.
- **Open dependencies:** evidence contract does not exist (PRJ-009); moderation capacity unstaffed (PRJ-013); loyalty-community in-app surface deferred (SOC-020).
- **Sufficient for an agent within its domain?** **Yes** — and notably it is sufficient *because* it decides so little: it tells an agent to stop, which is the correct answer for an unbuilt layer.

### 2.4 Mastery & Evidence Bible v1.0 — `SUBSTANTIAL`

- **Status:** `CANONICAL`, signed off 2026-07-27 (founder-authorized promotion following independent adversarial review `PASS WITH NON-BLOCKING FINDINGS`). Path: `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md` (DOC-051), plus six supporting records (DOC-052…DOC-057, including the independent-review record).
- **Scope:** evidence semantics across every evidence-bearing Cairn system (FQ-8) — admissibility, attribution, polarity, evidence strength, assistance effects, weakness/repair semantics, mastery-representation meaning, transitions, aggregation, invalidation, solo/AI/future-social equivalence.
- **Strengths:** semantics and current reality are **separately documented** (the Bible owns intent; DOC-054 records Axis-B runtime facts and every `⚠ DIVERGENCE`); all eight founder questions are answered and source conflicts were reconciled across 18 documents before promotion; the promotion gate required — and received — a genuinely independent adversarial review.
- **Open dependencies:** positive Social evidence contract does not exist (PRJ-009, `OPEN`); Curriculum/Engineering/Privacy/Operations routing targets remain unauthored; the two-store divergence (PRJ-037) is recorded, not resolved.
- **Sufficient for an agent within its domain?** **Yes for semantic rulings.** **No** for implementation: **promotion complete ≠ runtime conforming** — the shipped evidence behaviour remains non-conforming Axis-B reality, legacy systems stay frozen, zero exact numeric values are founder-locked, and no implementation is authorized.

## 3. Existing partial layers

Domains with meaningful documents but **no complete Canonical owner**. Inventoried, not assumed absent.

### 3.1 Curriculum — `FRAGMENTED`
- **Source fragments:** DOC-027 (26 vault notes: `Syllabus Overview`, `Syllabus Design Rules`, `Level and Band Map`, `Grammar/Vocabulary/Phenomena Progression`, `Integration Lesson Logic`, `Lesson Status Matrix`, L0–L17 notes, `L18-L24 Roadmap`); DOC-028 (30 lesson/compact specs in `docs/syllabus/`); `docs/architecture/l0-l24-founder-build-matrix-v0.md`.
- **Current authority:** individual lesson specs act as contracts for lessons already authored. **Nothing governs sequencing policy.**
- **Contradictions:** L7 full-aller vs compact-doorway (vault C10); item counts 54/56/52 across registry, manifest, and audit (C6); dev-APK scope L1–L5 canon vs L0–L6 runtime (C2).
- **Risk if an agent acts today:** it would infer a sequencing rule from one lesson spec and generalize it — the exact error the Content Bible avoids by refusing to own sequencing.
- **Recommended final form:** a **Curriculum Bible** owning band progression, prerequisite ordering, item budgets, integration-lesson cadence, and the counting methodology (PRJ-015).

### 3.2 Engineering / System — `PARTIAL`
- **Source fragments:** DOC-030 (15 architecture notes incl. `System`, `Storage`, `Sync`, `Supabase`, `Data Flow`, `AI`, `Registry`, `Route`, `Failure and Recovery`); DOC-025 (`learning-engine-v1`); DOC-043 (engine purity rules); DOC-032 (ledger, divergences, technical debt); **ADRs 0009–0022 already bind**.
- **Current authority:** unusually strong for an unauthored layer — ADRs function as enforceable contracts.
- **Contradictions:** two disjoint stores `lm7` vs `lm_le_events` with no cutover plan (C9 / PRJ-037); AI model routing table vs actual provider chain (C7); rich chip taxonomy in spec vs single status enum in runtime (C8).
- **Risk if an agent acts today:** **moderate-to-high** — an agent could implement against the spec side of a known divergence.
- **Recommended final form:** an **Engineering/System Bible** that adopts the ADRs by reference, resolves the store fork, and states the enforcement status of each rule.

### 3.3 Operations & QA — `PARTIAL`
- **Source fragments:** DOC-031 (14 notes: `Validation Gates`, `French Linguistic QA`, workflows, `PR Discipline`, `Incident and Blocker Handling`); DOC-042 (smoke checklist); DOC-021 (Master Pipeline); `Test_Checklist.md` (DOC-037).
- **Current authority:** workflows are actively followed, so this layer is partly *operational* even while undocumented as a Bible.
- **Missing decisions:** who performs French QA (PRJ-011); moderation staffing (PRJ-013); release engineering and crash reporting (PRJ-028).
- **Risk if an agent acts today:** **moderate** — an agent might declare a gate passed that has no staffed executor.
- **Recommended final form:** an **Operations & QA Bible** owning gate definitions, staffing, and the operator/agent boundary.

### 3.4 Privacy / Legal — `PARTIAL`
- **Source fragments:** ADR-0023 (binding); `06_ARCHITECTURE/Privacy and Data Deletion`, `Legal Compliance and Data Governance`; `docs/status/founder-self-learning-privacy-kvkk-gdpr-architecture-note.md`; `…-remote-schema-rls-draft.md`; `Tech_and_Privacy_Decisions.md` (DOC-037); PR #197 (deletion, open).
- **Current authority:** ADR-0023 binds the model (local-first, consent-gated). **Legal interpretation is unowned.**
- **Missing decisions:** retention periods, jurisdiction posture (KVKK/GDPR depth — vault MD13), cloud deletion path completion (PRJ-027).
- **Risk if an agent acts today:** **high** — privacy errors are not cheaply reversible, and Social/analytics both depend on this layer.
- **Recommended final form:** a **Privacy/Legal layer** owning data categories, consent surfaces, retention, minors, and deletion.

### 3.5 UX / Experience — `FRAGMENTED`
- **Source fragments:** DOC-029 (`Navigation Model`, `Lesson Player`, `Home and Journey`, `Design Inventory`, `Interaction Patterns`, `Mon Lexique UI`, `Daily Review UI`, `Practice`, `Progress`, `Accessibility`, `Motion and Animation`, `V4 Studies Disposition`).
- **Current authority:** design canon fragments; **V4-B direction selected but globally deferred**.
- **Contradictions:** design inventory classification vs current runtime screens; V4 studies artifact excluded from git (PRJ-035).
- **Risk if an agent acts today:** **moderate** — a V4-B token refactor could be smuggled into unrelated work, which the Master Pipeline explicitly forbids.
- **Recommended final form:** a **UX/Experience Bible** owning screen states, flows, empty/error/offline states, and the V4-B activation gate.

### 3.6 Brand — `FRAGMENTED`
- **Source fragments:** `07_DESIGN/Cairn Brand Direction`, `Visual Language`, `Copy and Tone`, `Naming and Brand Registry`; `Visual_Design_Canon.md` (DOC-037).
- **Current authority:** tone is partly owned by Product Brain (ADR-0002 passive mirror, banned-language list) — a genuine **cross-domain overlap**.
- **Missing decisions:** the Le Mot → Cairn naming migration (PRJ-030) is unfinished in repo, package, and storage keys.
- **Risk if an agent acts today:** **low-to-moderate** — mostly cosmetic, but a half-finished rename is a discoverability hazard.
- **Recommended final form:** a **Brand Bible** owning name, voice, visual identity, and the migration completion plan.

## 4. Unauthored layers

All six unauthored layers (plus the Future Systems Register) carry `DEPENDENCY — DOCUMENT NOT YET
AUTHORED`. *(The Mastery & Evidence Bible left this table on 2026-07-27 — authored and Canonical,
§2.4; its former "Step 1" row is complete.)*

| Layer | Why needed | Must answer | Existing material | Upstream deps | Downstream dependents | Blocks return to code? |
|---|---|---|---|---|---|---|
| **Curriculum Bible** | Sequencing is unowned; Content Bible correctly refuses it | When is a concept introduced? What is the band progression? How is an item counted? | DOC-027, DOC-028 | Product Brain, Content Bible, **Mastery & Evidence Bible (DOC-051 — consumes its semantics)** | Content authoring, Reading taxonomy, post-L24 | **Yes** — for new lesson work |
| **Engineering / System Bible** | ADRs bind but no owner resolves divergences | Which store wins? What is the cutover? What is enforced vs advisory? | DOC-030, DOC-025, DOC-043, ADRs | ADRs | Everything runtime | **Yes** — for runtime work |
| **Privacy / Legal** | Highest-consequence unowned domain | Retention? Jurisdiction? Deletion path? Minors? | ADR-0023, DOC-030, `docs/status/*` | ADR-0023 | Social, analytics, sync, release | **Yes** — for any data work |
| **Operations & QA Bible** | Gates exist without staffed executors | Who runs French QA? Who moderates? What blocks release? | DOC-031, DOC-042, DOC-021 | Content Bible, Privacy | Release, Stage C, Social | **Partly** — blocks Stage C, not internal work |
| **UX / Experience Bible** | Flows unowned; V4-B deferred | What screens exist? What are empty/error/offline states? When does V4-B activate? | DOC-029 | Brand, Product Brain | Any UI work | **Partly** — blocks new surfaces |
| **Brand Bible** | Naming migration unfinished | What is the name, voice, visual identity? | DOC-029, DOC-037 | Product Brain (tone) | UX, copy, store presence | **No** — but blocks public-facing polish |
| **Future Systems Register** | Five overlapping idea homes | Where does an unowned future idea live? | DOC-035, `Unmapped Ideas` | — | All future work | **No** |

## 5. Project-wide blind spots

Genuine gaps, not merely deferred work:

1. **~~No owner for mastery/evidence~~ — CLOSED 2026-07-27.** The owner was assigned 2026-07-26 (Q2, PRJ-014) and the document was **authored and promoted to Canonical on 2026-07-27** (DOC-051, after independent review DOC-057). Step 1 of the authoring sequence is complete. *What this does not close:* runtime divergences (recorded in DOC-054) and the downstream items below.
2. **No evidence contract** (PRJ-009) — created as a requirement by R8; routed to the Mastery & Evidence Bible (admissibility/semantics), with Content and Curriculum consulted and Engineering enforcing. **Still does not exist — the semantics owner (DOC-051) now exists, but DOC-051 explicitly declines to create the contract, so PRJ-009 remains `OPEN`.**
3. **No executable French-QA gate** (PRJ-010 + PRJ-011) — a Canonical standard with no standard document and no reviewer.
4. **No moderation capacity assessment** (PRJ-013) — the Social direction's real-world blocker was never costed.
5. **No cutover plan for two disjoint stores** (PRJ-037).
6. **No controlling roadmap** (PRJ-032) — two roadmaps, no precedence.
7. ~~**Project routing predates the Bibles**~~ — **CLOSED 2026-07-26** (PRJ-033): decision resolved by Q1 and both source documents scope-amended atomically with Project Canon Map v1.0 promotion.

## 6. Unrouted historical ideas

Ideas alive in source material with no durable home. **Each has a `PRJ-###` record** (Project Register).

| Idea | Where it survives | Record |
|---|---|---|
| Instruction Weave ("thermostat, not ladder") | `Unmapped Ideas` I3 | PRJ-016 |
| Human-recorded audio | `Future Features` audio cluster | PRJ-017 |
| Shadowing-first / listening comprehension | same cluster | PRJ-018 |
| A Small Moment | `Unmapped Ideas` I2 | PRJ-023 |
| Campfire internal mechanics | `Unmapped Ideas` I1 | PRJ-020 |
| Word Graph | `Future Features`, I4 | PRJ-022 |
| Spine narrowness R-A…R-E | `Unmapped Ideas` I5 | *rolled into PRJ-001* |
| Staged mastery strictness | `Unmapped Ideas` I7 | *rolled into PRJ-014* |
| Additive remote schema / cohort tables | `Unmapped Ideas` I8 | PRJ-038 |
| Post-beta expansion list | `Unmapped Ideas` I9 | PRJ-029 |
| Meet/Insight/Recap interaction upgrade | `Unmapped Ideas` I11 | *rolled into PRJ-003* |
| Learner profile findings (nerd hobbyist) | `Unmapped Ideas` I10 | *rolled into PRJ-002* |

> Items marked *rolled into* are not lost: they are captured inside a broader project record whose Notes name them, so no idea disappears without a home.

## 7. Contradictions and stale references

| # | Contradiction | Source | Record |
|---|---|---|---|
| 1 | ~~Precedence chain omits all three Bibles~~ — **RESOLVED** | DOC-022, ADR-0024 | **PRJ-033 — decision resolved (Q1) and source patches applied 2026-07-26; operationally closed** |
| 2 | Two roadmaps, no precedence | C5 | PRJ-032 |
| 3 | Paywall: Campfire-L24 locked vs §66.3 re-decide vs legacy L14 | C3 (CROWN) | PRJ-036 |
| 4 | `CLAUDE.md` banner vs body vs STATUS reality | C1 (CROWN) | PRJ-031 |
| 5 | STATUS "7 lessons" vs actual file count | C4 (CROWN) | *stale snapshot; Ops* |
| 6 | Two disjoint stores | C9 | PRJ-037 |
| 7 | Dev-APK scope L1–L5 canon vs L0–L6 runtime | C2 | *Ops/Curriculum* |
| 8 | Item counts 54/56/52 | C6 | *rolled into PRJ-015* |
| 9 | AI routing table vs provider chain | C7 | PRJ-024 |
| 10 | Chip taxonomy spec vs runtime enum | C8 | PRJ-037 |
| 11 | L7 full vs compact doorway | C10 | PRJ-001 |

**None of these is resolved here.** Resolution belongs to the owning layer or the founder.

## 8. Implementation-reality gaps

| Category | Examples |
|---|---|
| **Missing documentation** (thing exists, no doc) | Edge-function internals (~519 LOC untested, MD3); storage-key lifecycle (MD4); dead-code inventory (MD5) |
| **Documented but unimplemented** | Social direction entirely; Mon Lexique 6-band UI; Campfire mechanics; Word Graph; v1 pedagogy lint (MD1); deferred validators (MD11) |
| **Implemented but not canonized** | Parts of the learning-engine runtime ahead of `learning-engine-v1`; progress-bridge behaviour (MD2) |
| **Implemented differently from canon** | Chip taxonomy vs runtime enum (C8); dev-APK lesson scope (C2); AI routing (C7) |
| **Intentionally deferred** | V4-B global redesign; paywall/RevenueCat; Mon Lexique surface; AI activation; tester cohort |

## 9. External or inaccessible sources

**Genuinely absent** (contents never invented — PRJ-034): `LeMot.md` · `LeMot - User Journey.md` · `Notes Archive Index.md` · **`L1-L5 Proofreading.md`** (an input to PRJ-010) · TOP CANON `Le_Mot_Locked_Canon…` · `CAIRN_CODEX_v0.1.md` · `CLAUDE_START_CONTEXT.md` · `TASK_CONTEXT_PACKS.md` · `OBSIDIAN_TO_GIT_PROMOTION_RULES.md` · Merged Product Canon 2026-05-11.

**Present in-repo after the 2026-07-14 ingestion** (`SOURCE_ARCHIVE/AVAILABLE_INPUTS/`, DOC-037) — these are **not** missing, contrary to older notes: `Tasarim_Envanteri.md` · `Test_Checklist.md` · `Le_Mot_Round1_Context_Handoff_2026-06-13.md` · `Home_-_Le_Mot.md` · `Visual_Design_Canon.md` · `Tech_and_Privacy_Decisions.md` · `Open_Questions.md` · `Backlog_and_Deferred.md` · `Syllabus_Delta_Log.md` · `Learning_Engine_and_Exercise_Types.md` · `Tester_Feedback_Log.md` · `User_Testing_Protocol.md` · `Agent_Handoff.md` · `PR_and_Smoke_Log.md` · `Sprint_12_Plan_2026-05-16.md` (partial).

**Excluded deliberately:** `Le Mot V4 Studies _standalone_.html` (18 MB, design facts ingested, artifact not in git — PRJ-035).

> **Absence is never treated as rejection.** Each missing file is recorded with the layer that may need it.

## 10. Coverage matrix

| Domain | Canonical owner | Coverage | Source quality | Open decisions | Implementation clarity | Agent-ready | Next action |
|---|---|---|---|---|---|---|---|
| **Product** | DOC-001 v1.0 | `SUBSTANTIAL` | High | 4 (PRJ-020, 024, 030, 036) | High | ✅ Yes | Domain work (outside the authoring sequence): resolve paywall tension |
| **Content** | DOC-004 v1.0 | `SUBSTANTIAL` | High | 5 (PRJ-010, 011, 012, 015, 019) | High | ✅ Yes (authoring) | Domain work (outside the authoring sequence): author French style guide |
| **Social** | DOC-010 v1.0 | `COMPLETE` (for scope) | High | 2 (PRJ-009, 013) | High | ✅ Yes | None — correctly closed |
| **Curriculum** | — | `FRAGMENTED` | Medium-High | 6 | Medium | ❌ No | **Step 2 — Author Curriculum Bible** |
| **Engineering** | — (ADRs bind) | `PARTIAL` | Medium-High | 6 | Medium-Low | ⚠️ Partial | **Step 4 — Author Engineering / System Bible** |
| **Privacy / Legal** | — (ADR-0023 binds) | `PARTIAL` | Medium | 4 | Medium | ⚠️ Partial | **Step 5 — Author Privacy / Legal layer** |
| **Operations & QA** | — | `PARTIAL` | Medium | 5 | Medium | ⚠️ Partial | **Step 7 — Author Operations & QA Bible** |
| **UX / Experience** | — | `FRAGMENTED` | Medium | 4 | Low | ❌ No | **Step 6 — Author UX / Experience Bible** |
| **Brand** | — | `FRAGMENTED` | Medium | 2 | Low | ❌ No | **Step 3 — Author Brand Bible** |
| **Mastery / Evidence** | **DOC-051 v1.0** — `CANONICAL` (signed off 2026-07-27) | `SUBSTANTIAL` | High | 1 (PRJ-009) | High — semantics and Axis-B reality separately documented (DOC-054) | ✅ Yes (semantic rulings; **not** implementation) | Domain work (outside the authoring sequence): none opened — implementation stays closed; sequence proceeds at **Step 2** |
| **Future Systems** | — | `FRAGMENTED` | Medium | 1 | N/A | ⚠️ Partial | **Step 8 — Future Systems Register** (consolidate five idea homes) |
| **Project Canon** | **DOC-045 v1.0** | `COMPLETE` (for routing scope) | High | 0 — **PRJ-033 operationally closed 2026-07-26** | N/A | ✅ Yes | **Step 2 — Curriculum Bible** (Step 1 complete 2026-07-27) |

## 11. Authoring sequence — FOUNDER-FIXED (Q3, 2026-07-26)

> **Founder decision:** optimize for **dependency-correct paper completion**, *not* fastest return to code. This sequence is `FOUNDER_LOCKED`, not a recommendation.

**Step 0 — Project Canon Map. ✅ COMPLETE 2026-07-26** (pending merge). Ratified (Q1–Q4), independently sign-off reviewed, corrected (C1–C7, E1–E2), and promoted to **v1.0 / Canonical**. The stale global-routing sources identified by PRJ-033 (DOC-022 `08 Source of Truth Map`, ADR-0024) were **scope-amended in the same atomic change**, so PRJ-033 is operationally closed. *Unlocked:* a coherent entry point for every later step.

**Step 1 — Mastery & Evidence Bible. ✅ COMPLETE 2026-07-27.** Authored under the founder's Step 1 scoped opening; all eight founder questions answered (Rounds 1–2, 2026-07-26); 18 source documents reconciled; independently adversarially reviewed (initial `FAIL — PROMOTION BLOCKED` → remediated → follow-up **`PASS WITH NON-BLOCKING FINDINGS`**, DOC-057); promoted to **v1.0 / Canonical (DOC-051), signed off 2026-07-27**. *Why it was first:* Curriculum and Engineering both **consume its semantics**; the Social evidence contract (PRJ-009) depends on it. *Unlocked:* Steps 2 and 4 as authoring targets, plus a semantics owner for PRJ-009 (the contract itself still does not exist). *Not unlocked:* any implementation — the evidence runtime remains non-conforming (DOC-054) and frozen. **Step 2 is not automatically opened.**

**Step 2 — Curriculum Bible.** Must close or route: progression and sequencing · item-counting methodology (PRJ-015) · level and band map · integration cadence · post-L24 direction (PRJ-029) · Reading sequencing dependencies (PRJ-012). *Prereqs:* Steps 0–1. *Risk if later:* lesson authoring stays blocked.

**Step 3 — Brand Bible.** Must stabilize: Cairn naming · Le Mot → Cairn migration (PRJ-030) · voice · visual identity · learner-facing naming principles. **Brand must precede final UX authoring.** *Prereqs:* none hard. *Risk if later:* UX is authored against unstable naming and voice.

**Step 4 — Engineering / System Bible.** Must: adopt binding ADRs by reference · separate intent from current runtime · resolve or explicitly route the two-store/cutover conflict (PRJ-037) · state enforcement status · document validators, storage, sync, AI, and failure behaviour. *Prereqs:* Step 1 (semantic contract). *Risk if later:* divergence risk grows with every commit.

**Step 5 — Privacy / Legal layer.** Must follow the Engineering data model and own: data categories · consent · retention · deletion (PRJ-027) · minors · jurisdiction · analytics/privacy boundaries (PRJ-025) · Social data prerequisites. *Prereqs:* Step 4. *Risk if later:* privacy errors are the least reversible.

**Step 6 — UX / Experience Bible.** Must consume Product, Content, Curriculum, **Brand**, Engineering, and Privacy. Owns final surfaces, flows, states, controls, accessibility, offline/error behaviour, and activation gates (V4-B, PRJ-035; Mon Lexique surface, PRJ-019; Summit copy, PRJ-021). *Prereqs:* Steps 2–5.

**Step 7 — Operations & QA Bible.** Must consume the completed upstream layers and make their gates **executable**: French QA (PRJ-010/011) · evidence QA · moderation operations (PRJ-013) · release gates (PRJ-028) · operator boundaries · smoke and incident procedures · staffing requirements. *Prereqs:* Steps 1–6. *Risk if earlier:* gates defined for undecided layers stay decorative.

**Step 8 — Future Systems Register.** Consolidate the five overlapping idea homes **only after** authoritative destination layers exist. *Prereqs:* Steps 1–7.

**Step 9 — Final project-wide coverage audit.** Run: idea coverage · ownership · cross-links · implementation-reality statements · conflict audit · **stale-reference and stale-gate audit** · negative-history preservation · deterministic agent read routes.

### Rejected alternative — Engineering/Privacy-first sequencing

> **`REJECTED` for the current documentation phase.** An earlier draft offered Engineering/Privacy-first ordering as an equal option optimizing for the fastest return to code.
>
> **Reason for rejection:** *founder direction prioritizes completing the interconnected paper model before returning to implementation.* Retained as a documented rejected optimization — **not** as an equal recommendation — so the reasoning stays discoverable if the priority ever changes.

## 12. Definition of "paper complete" — FOUNDER-FIXED (Q4, 2026-07-26)

**Paper complete** requires **all** of the following:

**Canonical layers:**
1. Project Canon Map is Canonical.
2. Product Brain is Canonical.
3. Content Bible is Canonical.
4. Social Layer Charter is Canonical.
5. **Mastery & Evidence Bible is Canonical.**
6. Curriculum Bible is Canonical.
7. Brand Bible is Canonical.
8. Engineering / System Bible is Canonical.
9. Privacy / Legal layer has an authoritative ratified form.
10. UX / Experience Bible is Canonical.
11. Operations & QA Bible is Canonical.
12. Future Systems Register has an authoritative ratified form.

**Coverage properties:**
13. Every meaningful known idea has a status, owner, implementation state, and durable home.
14. Every future system has a reopen trigger.
15. Every rejected and superseded direction remains discoverable.
16. Every cross-layer dependency is routed.
17. Every active or partially implemented area has a current-reality statement.
18. No known authority conflict is silently unresolved.
19. Every build gate requires a **new scoped authorization event**.
20. Final project-wide coverage and stale-reference audits pass.

**Current standing (2026-07-27, post-Mastery-promotion):** **5 of 12 required layers now satisfy the paper-complete layer criterion** — enumerated from the list above: **Project Canon** (1, Map v1.0), **Product Brain** (2, v1.0), **Content Bible** (3, v1.0), **Social Layer** Charter (4, v1.0), and **Mastery & Evidence Bible** (5, v1.0 — Canonical 2026-07-27).

**Seven required layers remain:** Curriculum · Brand · Engineering/System · Privacy/Legal · UX/Experience · Operations & QA · Future Systems Register.

**Paper complete is NOT reached, and no code-return gate is passed.** The layer criteria (6–12 above) remain the binding constraint, and **the next founder-fixed documentation layer is the Curriculum Bible (Step 2)**.

## 13. Return-to-code gate — FOUNDER-FIXED (Q4, 2026-07-26)

> **Founder direction: Cairn will complete the full defined documentation stack before normal implementation work resumes.**

**Normal implementation work resumes only after:**

1. **Paper completeness is declared by a separate founder sign-off** (§12);
2. the intended first implementation task receives a **fourteen-element scoped opening** (Authority Spec §10);
3. the area's **current implementation reality and divergences** are documented;
4. **operator constraints** are identified.

**This gate is NOT declared passed in this task, and cannot be passed by any agent.**

### Emergency exception — narrow and founder-authorized

The **only** pre-paper-complete code exception is an explicitly founder-authorized emergency involving **critical security · imminent data loss · urgent legal/compliance exposure · production outage or similarly severe operational harm.**

An emergency opening must: state **why waiting is unsafe** · be **narrowly scoped** · avoid **opportunistic feature work** · **preserve existing canon** · include **validation and rollback** · receive **explicit founder authorization**.

> **Do not qualify automatically:** existing open PRs · routine operator blockers · feature work · refactors · lesson work · general cleanup.

### `SUPERSEDED — founder decision 2026-07-26`

> The earlier draft proposed: *"A partial gate is legitimate. Returning to code for a narrowly scoped task does not require all seven Bibles — it requires the ones that task depends on, plus a scoped opening."*
>
> **Superseded.** Its reasoning is preserved, not deleted: it optimized for unblocking narrow work early, and would still be the right rule under a different founder priority. It conflicts with the current explicit direction to complete the interconnected paper model first, so it is **no longer in force**.

## 14. Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-25 | 0.1 | Initial draft. Assessed coverage across twelve domains from a ~400-document repository sweep; rated three Canonical layers, six partial/fragmented layers, and seven unauthored layers; recorded seven blind spots, eleven contradictions, five implementation-reality categories, and the external-source inventory (ten genuinely absent, fifteen present-after-ingestion, one deliberately excluded); proposed an eight-step authoring sequence led by the mastery/evidence ownership decision, a ten-point paper-completeness test, and an eight-point return-to-code gate. **Authored no missing layer; declared no gate passed.** | Cloud session (project canon mapping) |

| 2026-07-26 | 0.1 (founder ratification Q1–Q4) | **Q2** — mastery/evidence ownership hole closed in §5 and the §10 matrix; **Mastery & Evidence Bible** added as an unauthored layer to be authored at Step 1. **Q3** — §11 replaced with the **founder-fixed ten-step sequence** (Project Canon → Mastery & Evidence → Curriculum → **Brand** → Engineering → Privacy → **UX** → Operations & QA → Future Systems → final audit); Brand now precedes UX; the Engineering/Privacy-first alternative demoted to a **documented rejected optimization**. **Q4** — §12 replaced with the strict 20-point paper-complete definition (12 Canonical layers + 8 coverage properties); §13 replaced with the strict return-to-code gate plus a **narrow founder-authorized emergency exception**; the former "partial gate is legitimate" rule marked **`SUPERSEDED — founder decision 2026-07-26`** with its reasoning preserved. **Q1** — §7 contradiction row 1 updated to decision-resolved with promotion-time source patches outstanding. **No layer authored; no gate declared passed.** | Cloud session (founder ratification) |

| 2026-07-26 | 0.1 (promotion corrections) | **Sign-off corrections applied atomically with Project Canon Map v1.0 promotion.** **C1** — §10 Mastery / Evidence row: owner `— DISTRIBUTED` → **`Mastery & Evidence Bible — DEPENDENCY — DOCUMENT NOT YET AUTHORED`**, next action → `Step 1 — Author Mastery & Evidence Bible` (the MAJOR finding). **C2** — §10 Project Canon row set to final promoted state (`DOC-045 v1.0`, `COMPLETE` for routing scope, 0 open decisions, agent-ready ✅). **C3** — every unauthored-layer next action now carries its founder-fixed step number (Steps 1–8); Product/Content/Social marked as domain work outside the authoring sequence. **C6** — paper-complete standing corrected to **4 of 12 required layers satisfied** (Project Canon, Product Brain, Content, Social), **8 remaining**, paper complete **not** reached, no gate passed. §5 blind spot 7, §7 contradiction 1, and §11 Step 0 updated to reflect PRJ-033 operational closure. Status changed from Draft to **supporting coverage assessment — current**; **not independently Canonical**. | Cloud session (atomic promotion) |

| 2026-07-27 | 0.1 (Mastery & Evidence promotion) | **Mastery & Evidence moved from unauthored coverage into completed Canonical layers.** New §2.4: **DOC-051 Mastery & Evidence Bible v1.0, `CANONICAL` signed off 2026-07-27** (founder-authorized, after independent adversarial review `PASS WITH NON-BLOCKING FINDINGS`, DOC-057) — semantics and current reality separately documented; source conflicts and promotion blockers resolved; **runtime divergences remain** and PRJ-009 (positive Social evidence contract) **remains open**. §1 note: seven → **six** fragmented-without-owner domains. §4: Mastery row removed from the unauthored table (six layers + Future Systems Register remain). §5 blind spot 1 → CLOSED; blind spot 2 annotated (owner exists, contract does not). §10 matrix: Mastery row → Canonical/agent-ready for semantic rulings, 1 open decision (PRJ-009); Project Canon next action → Step 2. §11: **Step 1 marked ✅ COMPLETE 2026-07-27**; Step 2 (Curriculum) is the next founder-fixed step and is **not** automatically opened. §12 standing re-derived from the layer list: **5 of 12 satisfied, 7 remaining**. **Paper complete NOT reached; no code-return gate passed; normal code work remains frozen; no implementation authorized.** | Cloud session (founder-authorized promotion) |

*End of Canon Coverage and Gaps v0.1. Supporting assessment; assesses coverage; authorizes no build.*
