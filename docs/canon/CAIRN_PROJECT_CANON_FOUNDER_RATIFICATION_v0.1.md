---
title: Cairn Project Canon — Founder Ratification Record
version: 0.1
status: Founder-ratified supporting decision record (Project Canon Map promoted v1.0 / Canonical 2026-07-26)
authority: Highest-authority Project Canon source for routing, ownership, sequence, and code-return governance. Authorizes no implementation.
owner: Project Canon
decision_date: 2026-07-26
depends_on:
  - Cairn Product Brain v1.0
  - Cairn Content Bible v1.0
  - Cairn Social Layer Charter v1.0
related:
  - CAIRN_PROJECT_CANON_MAP_v1.0.md
  - CAIRN_AUTHORITY_AND_ROUTING_SPEC_v0.1.md
  - CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md
  - CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md
  - CAIRN_PROJECT_CANON_SIGNOFF_REVIEW_v0.1.md
---

# Cairn Project Canon — Founder Ratification Record v0.1

> **Read this first.** This record ratifies the **project-level routing model**, the **Mastery & Evidence ownership assignment**, the **authoring sequence**, and the **code-return governance**. It **authorizes no implementation** and **authors no missing Bible**.
>
> **Status update 2026-07-26:** the Project Canon Map was subsequently promoted to **v1.0 / Canonical** by a separate sign-off review and atomic promotion. That promotion changed **no decision below** and authorized **no implementation**.
>
> **Decision date: 2026-07-26.** Decisions recorded: **Q1–Q4**, all `FOUNDER_LOCKED`.

---

## 1. Scope

**What is ratified:** the global precedence and routing model (Q1) · the owner of the semantic evidence and mastery model (Q2) · the order in which remaining documentation layers are authored (Q3) · the definition of paper completeness and the gate governing return to code (Q4).

**What is NOT ratified:** any product, content, curriculum, brand, UX, engineering, privacy, operations, or social decision · the contents of any unwritten Bible · any implementation, schedule, or roadmap item · promotion of the Project Canon package to Canonical.

## 2. Q1 decision — precedence and routing

**Adopt a domain-first, two-axis precedence model.**

**Axis A — intent and authority.** For "what should Cairn be?" / "how should this owned domain behave?":
1. Begin with the **Project Canon Map** to identify the question, domain, owner, required dependencies, and task-specific read route.
2. Apply **explicit current founder decisions**.
3. Within the identified domain, use the **current Canonical owner document**.
4. Apply **accepted ADRs** within their technical/system domain.
5. Apply founder-ratified records, design canon, operational contracts, and approved specifications per the Authority Spec.
6. **Stop** on missing-owner or unresolved cross-domain conflicts.

> The Project Canon Map is the **controlling routing authority**, but is **not the substantive owner** of Product, Content, Social, Curriculum, Brand, UX, Engineering, Privacy, Operations, or Mastery decisions.

**Axis B — current implementation reality.** For "what currently runs?": **code · tests · current status records · implementation ledgers · deployed-system evidence** govern factual reality. **Implementation evidence does not determine product intent.**

**Existing current-build chain.** `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 specification` remains valid **only** for current-build execution scope · current branch and release constraints · current operator state · what an implementation task may touch **after it has already been explicitly opened**.

It is **no longer the global product/canon precedence chain**, and it **must not route around** Product Brain v1.0, Content Bible v1.0, Social Layer Charter v1.0, or future Canonical domain owners.

### PRJ-033 treatment

`FOUNDER_LOCKED — decision resolved and source patches applied 2026-07-26`.

> **State at ratification (historical, preserved).** At the moment these decisions were recorded the position was: *the decision is resolved; the stale source documents still require a supersession/routing banner; those patches must occur no later than Project Canon Canonical promotion; PRJ-033 is not fully operationally closed until the old routing sources link forward to the new Canonical map.* **ADR-0024 and `08 Source of Truth Map` were deliberately NOT edited in the ratification task**, and their patch was recorded as a promotion prerequisite (§11).

> **Current state.** ✅ **Operationally closed 2026-07-26.** Both sources were scope-amended atomically with Project Canon Map v1.0 promotion. Neither was repealed: DOC-022 remains Canonical for current-build source routing, and ADR-0024 remains active with its legacy-v7 quarantine and v0.1 supersession fully intact. **No further founder decision is required.**

### Worked routing examples

| Question | Axis | Routes to |
|---|---|---|
| Lesson authoring | A | **Content Bible v1.0** |
| Lesson sequencing | A | **Curriculum Bible** — currently unauthored → stop |
| Current APK scope | B | **`STATUS.md` + `DEV_APK_MVP_CANON.md`** |
| Runtime behaviour | B | **Code and tests** establish current fact |
| Product purpose | A | **Product Brain v1.0** |

## 3. Q2 decision — Mastery & Evidence ownership

**Create a distinct future documentation layer: the Cairn Mastery & Evidence Bible** — the single authoritative owner of the semantic evidence and mastery model.

It **does not yet exist** and is marked `DEPENDENCY — DOCUMENT NOT YET AUTHORED`.

**It owns:** what qualifies as learning evidence · evidence admissibility · evidence strength and confidence · assistance-level effects · attribution requirements · weakness evidence · near-miss evidence consequences · mastery-state meaning · state transitions · decay or review consequences where applicable · aggregation of multiple evidence events · invalidation caused by content, AI, peer, validator, UI, or system error · equivalence requirements across solo, AI-supported, and any future social pedagogical actions · **the semantic contract consumed by runtime**.

**It does not own:**

| Layer | Owns instead |
|---|---|
| **Content Bible** | Authored item and role definitions; learner-facing exercise and feedback policy; intended pedagogical target of an authored action; prerequisite-safe content presentation |
| **Curriculum Bible** | Sequencing; readiness; when evidence opportunities are introduced; expected evidence distribution by level or band |
| **Engineering / System Bible** | Event schemas; storage; validators; algorithms; sync; runtime enforcement; implementation of the semantic contract |
| **Social Layer** | Social boundaries; the negative rule that engagement signals do not become evidence; Social opening governance. **Social does not own positive evidence semantics.** |
| **Operations & QA** | Evidence-system QA execution; audit procedure; incident handling; release gates |

**It must not be merged into Engineering or Curriculum.**

### PRJ-014 treatment

`FOUNDER_LOCKED — dedicated Mastery & Evidence owner assigned`. Canonical home: **Mastery & Evidence Bible**. Current owner: `DEPENDENCY — DOCUMENT NOT YET AUTHORED`. Implementation state remains **Partially Implemented / fragmented**, because ADRs, events, matrices, and runtime behaviour already exist.

**No claim is made that the future Bible is written or that current divergences are resolved.**

### PRJ-009 (Social evidence contract) treatment

- **Mastery & Evidence Bible owns** evidence admissibility and semantics.
- **Content and Curriculum are required consulted owners.**
- **Engineering owns enforcement.**
- **Founder ratification remains required.**
- **No contract exists today.**
- **No current Social action is evidence.**

## 4. Q3 decision — authoring sequence

**Optimize for dependency-correct paper completion, not fastest return to code.** The controlling sequence:

| Step | Layer | Why here |
|---|---|---|
| **0** | **Project Canon Map** | Ratify, review, promote, merge — **and patch the PRJ-033 stale routing sources during Canonical promotion** |
| **1** | **Mastery & Evidence Bible** | Curriculum and Engineering consume its semantics; PRJ-009 depends on it; authoring either first would encode an ownership assumption |
| **2** | **Curriculum Bible** | Close/route progression, sequencing, item counting, band map, integration cadence, post-L24, Reading sequencing |
| **3** | **Brand Bible** | Stabilize Cairn naming, Le Mot → Cairn migration, voice, visual identity, learner-facing naming — **must precede final UX authoring** |
| **4** | **Engineering / System Bible** | Adopt binding ADRs by reference; separate intent from runtime; resolve/route the two-store cutover; state enforcement status |
| **5** | **Privacy / Legal layer** | Follows the Engineering data model; owns data categories, consent, retention, deletion, minors, jurisdiction, analytics boundaries, Social data prerequisites |
| **6** | **UX / Experience Bible** | Consumes Product, Content, Curriculum, Brand, Engineering, Privacy; owns surfaces, flows, states, controls, accessibility, offline/error behaviour, activation gates |
| **7** | **Operations & QA Bible** | Makes upstream gates executable: French QA, evidence QA, moderation ops, release gates, operator boundaries, smoke/incident, staffing |
| **8** | **Future Systems Register** | Consolidate overlapping idea homes only after destination layers exist |
| **9** | **Final coverage audit** | Idea coverage, ownership, cross-links, implementation reality, conflicts, stale-reference/stale-gate audit, negative history, deterministic read routes |

**The alternative Engineering/Privacy-first sequence is not retained as an equal recommendation.** It is documented as a rejected optimization for faster code return, with the reason: *rejected for the current documentation phase because founder direction prioritizes completing the interconnected paper model before returning to implementation.*

## 5. Q4 decision — paper completeness and return to code

**Cairn will complete the full defined documentation stack before normal implementation work resumes.**

The general rule permitting a narrow implementation task to resume after only the directly touched layers are authored is **removed and superseded** (§10).

**Paper complete requires** twelve Canonical/ratified layers (Project Canon Map · Product Brain · Content · Social · **Mastery & Evidence** · Curriculum · Brand · Engineering/System · Privacy/Legal · UX/Experience · Operations & QA · Future Systems Register) **plus** eight coverage properties: every meaningful idea has status/owner/implementation-state/home · every future system has a reopen trigger · every rejected and superseded direction remains discoverable · every cross-layer dependency is routed · every active or partially implemented area has a current-reality statement · no known authority conflict is silently unresolved · every build gate requires a new scoped authorization event · final coverage and stale-reference audits pass.

**Normal return-to-code gate.** Implementation resumes only after: paper completeness is **declared by a separate founder sign-off** · the first task receives a **fourteen-element scoped opening** · the area's **current implementation reality and divergences** are documented · **operator constraints** are identified.

**Emergency exception (only pre-paper-complete exception).** Explicitly founder-authorized, involving critical security · imminent data loss · urgent legal/compliance exposure · production outage or similarly severe operational harm. It must state why waiting is unsafe · be narrowly scoped · avoid opportunistic feature work · preserve existing canon · include validation and rollback · receive explicit founder authorization.

**Do not automatically qualify:** existing open PRs · routine operator blockers · feature work · refactors · lesson work · general cleanup.

## 6. Authority consequences

- Global routing is **domain-first and two-axis**; the Project Canon Map is the entry point and never a substantive owner.
- The current-build chain is **scoped**, not repealed — it retains full authority over execution-scope questions.
- Implementation evidence is **authoritative on fact and silent on intent**.
- No Canonical domain owner may be routed around by a chain that predates it.

## 7. Ownership consequences

- The **`DISTRIBUTED` / no-owner category is now empty** at project level: every project item has a named owner, even where that owner is unwritten.
- Mastery & Evidence gains a dedicated owner; Content, Curriculum, Engineering, Social, and Operations each keep a precisely bounded adjacent role.
- Social's role in evidence remains **strictly negative** — it bounds what cannot be evidence and never defines what can.

## 8. Documentation-sequence consequences

- Nine authoring steps plus a final audit are now **founder-fixed**, not advisory.
- **Mastery & Evidence is Step 1** — the only layer with no upstream layer dependency and three downstream consumers.
- **Brand precedes UX**, correcting the earlier draft ordering.
- The faster code-return ordering is preserved only as a **rejected** alternative.

## 9. Implementation-governance consequences

- **Normal code work is frozen** until paper completeness is separately signed off.
- Documentation presence, ratification, and Canonical status **still confer no build permission**.
- Every opening requires the fourteen-element contract; emergencies require explicit founder authorization and narrow scope.

## 10. Superseded proposals

| Superseded | Replaced by | Status |
|---|---|---|
| Global precedence chain `CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 spec` as the **project-wide** rule | Domain-first two-axis model; chain re-scoped to current-build execution | `SUPERSEDED` as global routing (2026-07-26); **retained** for execution scope |
| Mastery/evidence as a **distributed** concern with no owner | Dedicated Mastery & Evidence Bible | `SUPERSEDED` (2026-07-26) |
| Curriculum-first authoring sequence with UX before Brand | Founder-fixed sequence, Brand before UX | `SUPERSEDED` (2026-07-26) |
| Engineering/Privacy-first sequence as an **equal** option | Documented rejected optimization | `REJECTED` (2026-07-26) |
| *"A partial gate is legitimate… does not require all seven Bibles"* | Strict full-stack gate + narrow emergency exception | `SUPERSEDED — founder decision 2026-07-26`; **reasoning preserved** |

## 11. Promotion prerequisites

**✅ All satisfied 2026-07-26** by the independent sign-off review and the atomic promotion. Recorded for traceability:

1. ✅ **Patched DOC-022 (`08 Source of Truth Map`) and ADR-0024** with scope-amendment banners pointing to Project Canon Map v1.0 (**PRJ-033 operationally closed**).
2. ✅ **Independent sign-off review** completed (DOC-050; verdict `READY WITH TARGETED CORRECTIONS`).
3. ✅ **Stale-reference audit** run across PRJ-033, PRJ-014, PRJ-009, "distributed owner" wording, the old precedence chain, the old sequence, and the partial return-to-code rule.
4. ✅ Counts and summaries recomputed from actual rows.
5. ✅ No gate passes accidentally; code-return gate remains closed.

## 12. Non-claims

This record does **NOT**:

- author the Mastery & Evidence Bible or any other missing layer;
- authorize implementation, code, prototypes, or scheduling;
- *(satisfied separately 2026-07-26 — promotion was performed by the sign-off + promotion task, not by this ratification)*;
- declare paper completeness reached;
- declare the return-to-code gate passed;
- mark any project feature `PLANNED`;
- *(superseded 2026-07-26 — PRJ-033 is now operationally closed by the atomic promotion; this non-claim applied to the ratification act itself)*;
- claim mastery/evidence divergences are resolved;
- modify Product Brain, Content Bible, Social Charter, ADRs, runtime, lessons, or syllabus.

## 13. Decision date and change history

**Founder decision date: 2026-07-26** (Q1–Q4).

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-26 | 0.1 | **Created.** Records founder decisions Q1 (two-axis domain-first precedence; current-build chain re-scoped; PRJ-033 decision-resolved with promotion-time source patches outstanding), Q2 (dedicated **Mastery & Evidence Bible** as single owner of evidence semantics; PRJ-014 and PRJ-009 re-routed), Q3 (founder-fixed ten-step authoring sequence, Brand before UX, Engineering/Privacy-first rejected), and Q4 (strict twenty-point paper-complete definition; full-stack return-to-code gate; narrow founder-authorized emergency exception; partial-gate rule superseded with reasoning preserved). **No Bible authored; no implementation authorized; package remains Draft.** | Cloud session (founder ratification) |

---

| 2026-07-26 | 0.1 (post-promotion status sync) | Project Canon Map promoted **v1.0 / Canonical**. §11 promotion prerequisites marked satisfied; two non-claims annotated as superseded by the promotion act. **No founder decision in §2–§5 was changed, added, or removed; no implementation authorized.** | Cloud session (atomic promotion) |

*End of Project Canon Founder Ratification Record v0.1. Ratifies routing, ownership, sequence, and governance only. Authorizes no implementation. The Cairn Project Canon Map is **Canonical v1.0 (signed off 2026-07-26)** — and Canonical routing authority still confers no implementation authority.*
