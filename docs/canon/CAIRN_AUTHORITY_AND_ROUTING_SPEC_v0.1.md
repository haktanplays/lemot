---
title: Cairn Authority and Routing Spec
version: 0.1
status: Supporting specification — ratified with Project Canon Map v1.0
authority: Supporting conflict and routing specification under Project Canon Map v1.0. Not independent product canon. Procedural only; authorizes no implementation.
owner: Project Canon
created: 2026-07-25
related:
  - CAIRN_PROJECT_CANON_MAP_v1.0.md
  - CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md
  - CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md
  - CAIRN_PROJECT_CANON_FOUNDER_RATIFICATION_v0.1.md
  - CAIRN_PROJECT_CANON_SIGNOFF_REVIEW_v0.1.md
---

# Cairn Authority and Routing Spec v0.1

> **Supporting specification — ratified with Project Canon Map v1.0.** The detailed conflict, ownership, and routing specification behind the Project Canon Map (DOC-045). Not independent canon. Decides no domain content; authorizes no implementation.

---

## 1. Purpose and authority

This spec answers one question precisely: **when two sources disagree, which one governs — and when does nobody govern?**

Its authority is **procedural only**. It may say *who decides* and *in what order sources are weighed*. It may never decide a product, content, curriculum, brand, UX, engineering, privacy, or social question itself. Where it appears to resolve substance, it is routing to the owner, not ruling.

It also does not create implementation permission. Nothing in this document — and nothing routed by it — authorizes code.

## 2. Domain ownership model

| Domain | Owner document | State | Notes |
|---|---|---|---|
| **Product** | DOC-001 Product Brain v1.0 | ✅ Canonical | Purpose, promise, audience, non-goals, AI role, monetization stance, tone |
| **Content** | DOC-004 Content Bible v1.0 | ✅ Canonical | Authoring policy, item roles, prerequisite safety, French QA standard |
| **Curriculum** | **Curriculum Charter v1.0 (DOC-058)** | 🟡 **PARTIALLY AUTHORED** — Charter Canonical (founder-signed 2026-07-28); the **Curriculum Bible remains unauthored** | Charter governs the current L0–L17 tiered spine, thesis, cadence, and stop conditions. Post-L17 sequencing, Capability Arcs, item counting (PRJ-015) remain open. Fragments: DOC-027, DOC-028 (reference beneath the Charter) |
| **Brand** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Voice, naming, visual identity. Fragments in DOC-029, DOC-037 |
| **UX** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Screen states, flows, controls. Fragments in DOC-029 |
| **Engineering** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Data model, runtime, sync, validators. **Several ADRs already bind** (DOC-015) |
| **Mastery / Evidence** | **DOC-051 Mastery & Evidence Bible v1.0** | ✅ Canonical (signed off 2026-07-27) | Single authoritative owner of evidence semantics; supporting records DOC-052…DOC-057. **Canonical ≠ implemented** — runtime remains non-conforming (DOC-054). See §2.1 |
| **Social** | DOC-010 Social Layer Charter v1.0 | ✅ Canonical | Boundaries, prohibited forms, direction, Social governance |
| **Privacy / Legal** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | **Split ownership, not dual ownership (E1):** ADR-0023 **binds the current privacy/data model within its technical scope**; the future Privacy / Legal layer **owns interpretation** — retention, jurisdiction, consent policy, minors, and legal posture. **Implementation facts never decide legal interpretation.** Same ADR-binds/layer-owns pattern as Engineering. |
| **Operations / QA** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Validation gates, moderation ops, release. Fragments: DOC-031, DOC-042, DOC-021 |
| **Project Canon** | **DOC-045 Project Canon Map v1.0** | ✅ Canonical (signed off 2026-07-26) | Routing only — **Canonical routing authority confers no implementation authority** |

### 2.1 Mastery & Evidence — owner assigned (Q2, 2026-07-26); authored and Canonical (2026-07-27)

**Founder decision (Q2):** a distinct **Cairn Mastery & Evidence Bible** is the single authoritative owner of the semantic evidence and mastery model. **That document now exists and is Canonical: DOC-051, `docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md`, promoted Draft → Canonical on 2026-07-27** after founder ratification (FQ-1…FQ-8), source reconciliation, and an independent adversarial review that passed on follow-up (`PASS WITH NON-BLOCKING FINDINGS`, DOC-057). It must **not** be merged into Content, Curriculum, or Engineering.

**The Mastery & Evidence Bible owns:** what qualifies as learning evidence · evidence admissibility · evidence strength and confidence · assistance-level effects · attribution requirements · weakness evidence · near-miss consequences · mastery-state meaning · state transitions · decay/review consequences where applicable · aggregation of multiple evidence events · invalidation caused by content, AI, peer, validator, UI, or system error · equivalence requirements across solo, AI-supported, and any future social pedagogical actions · the semantic contract consumed by runtime.

**It does not own:**

| Layer | Owns instead |
|---|---|
| **Content Bible** | Authored item and role definitions; learner-facing exercise and feedback policy; the intended pedagogical target of an authored action; prerequisite-safe presentation |
| **Curriculum Bible** | Sequencing; readiness; when evidence opportunities are introduced; expected evidence distribution by level or band |
| **Engineering / System Bible** | Event schemas; storage; validators; algorithms; sync; runtime enforcement; implementation of the semantic contract |
| **Social Layer** | Social boundaries; the **negative** rule that engagement signals never become evidence; Social opening governance. **Social never owns positive evidence semantics.** |
| **Operations & QA** | Evidence-system QA execution; audit procedure; incident handling; release gates |

**Current state.** Recorded as **PRJ-014**, now `CANONICAL — authored and promoted 2026-07-27`. **Mastery/evidence questions that require a *semantic ruling* route directly to DOC-051** — the missing-owner conflict path (§8.12, §9 step 3) no longer applies to this domain. Implementation state remains **Partially Implemented / fragmented**, because ADRs (0009/0020/0021), events, matrices, and runtime behaviour already exist; **existing runtime divergences are recorded (DOC-054), not resolved** — the shipped evidence behaviour remains non-conforming, legacy systems remain frozen, and **Canonical status opened no implementation** (a new founder scoped opening under §10 is still required for any build work).

## 3. Source-authority classes

| Class | Definition | Examples |
|---|---|---|
| **A. Explicit current founder decision** | A decision stated by the founder now, for this question | Social Q1/R1–R11 (2026-07-25) |
| **B. Current Canonical document** | Promoted, signed-off, within its owned domain | DOC-001, DOC-004, DOC-010 |
| **C. Accepted ADR** | Technical/system decision, within its domain — **individually accepted or active ADRs, according to each ADR's own metadata and decision status** | e.g. ADR-0001 (anti-gamification), ADR-0002 (passive mirror), ADR-0009/0020 (events canonical), ADR-0010 (engine purity), ADR-0023 (privacy model), ADR-0024 (*within its retained scope*) |
| **D. Founder-ratified decision record** | Durable log of founder answers | DOC-011, DOC-009 |
| **E. Design canon** | Settled design principle, derived and accepted | `07_DESIGN/*`, `Visual_Design_Canon` |
| **F. Operational contract** | Binds how work is done | DOC-021, DOC-041, DOC-031, DOC-042 |
| **G. Approved specification** | Detailed intent, not build authority | DOC-020, DOC-024, DOC-025, DOC-026, DOC-028 |
| **H. Derived synthesis** | Assembled by an agent from other sources | This package; DOC-013 |
| **I. Historical proposal** | Once proposed, not currently active | `90_HISTORY/*`, old sprint plans |
| **J. Archive / superseded** | Explicitly replaced | DOC-044, legacy v7, `Superseded Specs` |
| **K. Implementation evidence** | What the system actually does | code, tests, DOC-018, DOC-032 |

> **The `ADR-####` naming convention and directory membership do not confer Canonical status.** Each ADR carries its own `status` / `canon_status` / `implementation_status` and must be read individually. An ADR that is `deferred`, `proposed`, `superseded`, `rejected`, or `historical` is an **input or an open decision — not class C authority**. *(Live example: **ADR-0025** is `status: deferred` / `canon_status: proposed` and does **not** bind the paywall position — PRJ-036 remains `OPEN`.)*
>
> **Class K is special.** It has *no* authority over intent and *total* authority over fact. "What does it do?" is answered by K. "What should it do?" is never answered by K.
>
> **Q1 (2026-07-26) formalizes this as the two-axis model.** Classes A–J serve **Axis A** (intent and authority); class K *is* **Axis B** (current implementation reality). The re-scoped current-build chain (`CLAUDE.md → STATUS.md → DEV_APK_MVP_CANON.md → Cairn v1.0 spec`) operates on Axis B and on already-opened execution scope only — it is **no longer a global product/canon precedence chain** and must not route around a Canonical domain owner.

## 4. Decision-status model

`CANONICAL` · `FOUNDER_LOCKED` · `RATIFIED_DIRECTION` · `DESIGN_CANON` · `PLANNED` · `EXPERIMENT` · `OPEN` · `DEFERRED` · `REJECTED` · `SUPERSEDED` · `ARCHIVED_REFERENCE`.

Rules: a positive feature may be recorded by an agent only as `OPEN`, `DEFERRED`, or `REJECTED`. Promotion to `PLANNED`, `EXPERIMENT`, `CANONICAL`, `FOUNDER_LOCKED`, or `RATIFIED_DIRECTION` requires a founder act. `RATIFIED_DIRECTION` explicitly **does not** imply `PLANNED`.

## 5. Document-status model

`Draft` · `Proposed` · `Review` · `Canonical` · `Superseded` · `Archived`.

A **supporting record** (ratification log, sign-off review, source map, decision matrix) never inherits the Canonical status of the document it supports.

## 6. Implementation-status model

`Implemented` · `Partially Implemented` · `Not Implemented` · `Spec-only` · `Fixture-only` · `Legacy-active` · `Legacy-unreachable`.

Compatible with the vault model (DOC-023). **Independent of decision status in both directions**: Canonical-and-unimplemented is normal (Social); implemented-and-non-canonical is also real (legacy v7 quarantine).

## 7. Enforcement-status model

`Runtime Enforced` · `Validator Enforced` · `Test Enforced` · `Authoring Policy Only` · `Unenforced`.

This field prevents a specific error: assuming a written rule is mechanically prevented. Most Content Bible authoring rules are `Authoring Policy Only`. The Content Bible's French-QA gate is currently `Unenforced` — no style guide, no reviewer.

## 8. Conflict types

1. **Same-domain contradiction** — two sources, one domain, incompatible claims. → §9.
2. **Cross-domain overlap** — two owners each partly right. Split the question; each owns its part.
3. **Old-versus-new** — later source generally wins *within the same class and domain*; never across classes automatically.
4. **Canonical-versus-code divergence** — spec is plan, code is fact. Record in `Spec Runtime Divergences`; escalate which should change.
5. **Canonical-versus-ADR** — if the ADR is technical and the Canonical claim is product intent, both can be true. If they genuinely collide, founder decides; do not silently prefer either.
6. **Founder-decision-versus-document lag** — founder decision (class A) wins; the document must be updated *and* its downstream gates re-audited (§13).
7. **Implementation-fact-versus-product-direction confusion** — the most common Cairn error. "Not built" ≠ "not wanted". "Built" ≠ "canonical".
8. **Supporting-record-versus-primary drift** — the primary document governs; the supporting record is corrected. *Real instance:* the Social Ratification record asserted the Charter was Draft after promotion.
9. **Source-map staleness** — a provenance map still calls something "inferred" after it was directly decided. *Real instance:* SOC-021 remained "lean rejected" after R6 rejected it outright.
10. **Status-count staleness** — totals no longer match rows after edits.
11. **Gate-reference staleness** — a gate references a decision whose state changed. → §13, and Canon Map §13.
11b. **Axis confusion (Q1)** — an intent question answered with implementation evidence, or a reality question answered with a spec. Name the axis first; neither may settle the other's question.
12. **Missing-owner conflict** — the question's owner document does not exist. **Escalate; never improvise a ruling.**

## 9. Conflict-resolution algorithm

```text
1. STATE THE QUESTION precisely, THEN PICK THE AXIS (Q1, 2026-07-26).
   ├─ AXIS B "what does it do today?" → class K governs (code, tests,
   │  status records, ledgers, deployed evidence). STOP. Record divergence
   │  if it contradicts a spec. The current-build chain applies here.
   └─ AXIS A "what should it be / how should this domain behave?" → continue.
      Implementation evidence NEVER settles Axis A.

2. IDENTIFY THE OWNER (Canon Map §5).
   ├─ Owner exists and is Canonical ────────────────► go to 4
   └─ Owner unauthored / distributed ───────────────► go to 3

3. MISSING-OWNER PATH
   ├─ Can the question be answered by an already-binding source
   │  (ADR, operational contract) WITHOUT inventing the missing layer?
   │     ├─ yes → answer narrowly, mark it provisional, record the
   │     │        dependency in the Project Register (PRJ-###)
   │     └─ no  → STOP. Report: "requires <layer> — NOT YET AUTHORED."
   └─ NEVER draft the missing layer inline to unblock yourself.

4. WEIGH SOURCES **within the owned domain only**:
   A explicit current founder decision
   > B current Canonical document
   > C accepted ADR (technical/system domain)
   > D founder-ratified decision record
   > E design canon
   > F operational contract
   > G approved specification
   > H derived synthesis
   > I historical proposal
   > J archive / superseded
   ⚠️ A higher class does NOT win outside its domain.
      (Product Brain does not decide sequencing; an ADR does not decide tone.)

5. CHECK SUPERSESSION.
   └─ Is the "winner" superseded_by something? Follow the chain to the end.

6. CHECK DOWNSTREAM GATES (§13).
   └─ Does the resolution make any gate accidentally pass or become
      impossible? If yes, fix the gate in the same change.

7. SEPARATE INTENT FROM REALITY in the answer.
   └─ Always report both: intended direction AND current implementation state.

8. IF UNRESOLVED → PRESERVE IT.
   └─ Record the conflict explicitly with both positions and the missing
      decision. NEVER fabricate a reconciliation. Route to the founder ONLY
      if no owner can resolve it.
```

## 10. Implementation-opening protocol

**Project-wide contract.** Documentation never opens implementation. Only a founder's scoped opening does.

An implementation opening must state all fourteen:

1. exact feature or system
2. owning layer
3. target user
4. intended value
5. source decision (ID)
6. current status (decision + implementation + enforcement)
7. implementation boundary
8. affected documents
9. prerequisite decisions
10. privacy and safety constraints
11. evidence relationship
12. validation plan
13. stop condition
14. explicit out-of-scope list

**Insufficient authority — these do not open anything:**

- "continue the project"
- "build the final version"
- "implement future systems"
- "finish the app"
- "proceed with the roadmap"
- "it's already documented / ratified / canonical"
- "the map says it belongs to layer X"

> Consistent with Social Charter §19 / R11 (SOC-025), generalized to every layer. Where a layer has its own stricter opening contract, **the stricter one applies**.

## 11. Documentation-change protocol

1. Identify the owning layer; changes to a domain decision are made **in the owner document**, not in a routing file.
2. Classify the change: editorial · clarification · new decision · supersession · structural move.
3. Editorial/structural changes must not alter meaning — if they do, they are decisions.
4. New decisions require the lifecycle (Canon Map §11) and a recorded authority (who, when).
5. Update the change log of every document touched.
6. Run the stale-reference audit (§13).
7. Re-check status counts and summaries.
8. Do not commit until review is complete; do not promote status as a side effect of an edit.

## 12. Supersession protocol

- Mark the old content `SUPERSEDED`; state **what** replaced it and **when**.
- Record `supersedes:` / `superseded_by:` on both sides where frontmatter exists.
- **Keep the old wording discoverable** — quarantine with a banner (ADR-0024's pattern); never delete.
- Preserve the reasoning, not just the outcome — future reopening needs the *why*.
- Re-audit gates that referenced the superseded state (§13).
- A supersession is an authority event and needs traceability; a rename is not.

## 13. Stale-reference audit

Run after **any** decision change, promotion, supersession, or structural move.

| Scan | What it checks |
|---|---|
| **Inbound-reference scan** | Every document mentioning the changed ID |
| **Gate scan** | Every checklist / prerequisite / "what must be true" list using it — does it now pass accidentally, or become impossible? |
| **Count scan** | Status totals vs actual rows; ID contiguity |
| **Status-summary scan** | Headlines, executive findings, "current state" blocks in *supporting* records |
| **Source-provenance scan** | Items still marked "inferred" that are now directly decided |
| **Link scan** | Internal links after any rename |
| **Exact-head review** | Re-validate against the precise commit under review, not an earlier one |

**Project-level finding — CLOSED 2026-07-26.** The precedence chain in DOC-022 and ADR-0024 omitted all three Bibles (**PRJ-033**). Founder decision Q1 resolved the *model* (domain-first global routing; that chain re-scoped to current-build execution), and both source files were **scope-amended atomically with Project Canon Map v1.0 promotion**. PRJ-033 now **passes the inbound-reference scan** and is operationally closed.

> **Retained, not repealed:** DOC-022 remains Canonical for current-build source routing; ADR-0024 remains active with its legacy-v7 quarantine and v0.1 supersession fully intact. Both now carry a forward link to Project Canon Map v1.0.

## 14. Agent stop conditions

Stop work and report when:

1. **Two owners claim the same decision.**
2. **A Canonical document conflicts with a newer explicit founder decision.**
3. **Implementation is requested for an `OPEN` / `DEFERRED` / `RATIFIED_DIRECTION` / `EXPERIMENT` item without a scoped authorization** (§10).
4. **A required dependency document is missing** and the task would require inventing it.
5. **Privacy, safety, or legal prerequisites are absent.**
6. **A build gate is satisfied only because of stale wording** (§13).
7. **Code and canon diverge materially** and no source resolves which should change.
8. A task asks to promote a status without a founder act.
9. A task asks to delete rather than supersede history.

Reporting a blocker is a **successful** outcome. Improvising past one is not.

## 15. Examples

All drawn from repository-supported material.

**Content authoring vs runtime enforcement.** The Content Bible sets authoring policy (`Authoring Policy Only`). Whether the runtime *enforces* it is an Engineering question; `08_IMPLEMENTATION/Spec Runtime Divergences` records where they differ. Neither document overrides the other — they answer different questions.

**Social direction vs Social implementation.** SOC-029 is `RATIFIED_DIRECTION`; Social `PLANNED` = 0 and nothing is built. Reading the Charter is not permission to build a community.

**Social engagement vs pedagogical evidence.** Engagement signals are never evidence. A pedagogical action *may* be — but only under a separately ratified evidence contract that **does not exist** (PRJ-009). So today, no social action is evidence.

**Evidence semantics vs evidence enforcement (Q2).** "Is this action admissible as evidence, and at what strength?" → **Mastery & Evidence Bible v1.0 (DOC-051, Canonical)**. "How is that event stored and validated?" → Engineering. "What was this authored action meant to teach?" → Content. "May a social signal count?" → Social supplies the negative bound only. Four layers, four different questions. *(DOC-051 answers the semantic question; it never authorizes changing what runs — current reality stays in DOC-054.)*

**Axis A vs Axis B (Q1).** "Should Daily Review surface weak items first?" is Axis A → Product/Curriculum intent. "Does it surface them today?" is Axis B → code and tests. Answering the first with the second is the error the two-axis model exists to stop.

**Lesson sequencing vs lesson authoring.** "How do I author L12?" → Content Bible + the L12 spec. "Should L12 come before L13?" → **Curriculum Charter v1.0 (DOC-058)** — inside the ratified L0–L17 spine the current order answers it; a **post-L17** sequencing question still has no owner → stop and report. The Content Bible must not answer sequencing merely because it is Canonical.

**Human-audio direction vs current TTS reality.** Vault material treats audio/TTS/shadowing as a future layer (`Future Features`), while the shipped app uses TTS. Direction and reality coexist; neither cancels the other (PRJ-017, PRJ-018).

**Canonical document vs supporting review record.** DOC-010 governs; DOC-011/012/013/014 support it. When they drifted (the record still calling the Charter "Draft"), the **supporting record was corrected**, not the Charter.

## 16. Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-25 | 0.1 | Initial draft. Defined the domain-ownership model (including the explicit finding that **Mastery/Evidence has no single owner**), eleven source-authority classes, four independent status models, twelve conflict types, an eight-step resolution algorithm with a dedicated missing-owner path, the fourteen-element implementation-opening contract, documentation-change and supersession protocols, the seven-scan stale-reference audit, nine agent stop conditions, and six repository-supported worked examples. Decides no domain content; authorizes no implementation. | Cloud session (project canon mapping) |

| 2026-07-26 | 0.1 (founder ratification Q1–Q2) | **Q1** — formalized the two-axis model in §3 and §9 step 1; added conflict type 11b (axis confusion); re-scoped the current-build chain; updated the §13 standing finding to *decision-resolved, operationally open* with an explicit promotion prerequisite. **Q2** — rewrote §2 and §2.1: **Mastery & Evidence Bible** assigned as the single authoritative owner of evidence semantics (`DEPENDENCY — DOCUMENT NOT YET AUTHORED`), with an explicit owns / does-not-own split across Content, Curriculum, Engineering, Social, and Operations. Added two worked examples (§15). **No missing Bible authored; no implementation authorized.** | Cloud session (founder ratification) |

| 2026-07-26 | 0.1 (promotion corrections) | **E1** — §2 Privacy row now states the **split ownership** explicitly: ADR-0023 binds the technical data model, the future Privacy/Legal layer owns interpretation (retention, jurisdiction, consent policy, minors, legal posture); **not dual ownership**, and implementation facts never decide legal interpretation. Project Canon row → **Canonical (Map v1.0)** with the no-implementation-authority note. §13 standing finding → **CLOSED** (PRJ-033 source patches applied; both sources retained, not repealed). Status changed from Draft to **supporting specification — ratified with Project Canon Map v1.0**; not independently Canonical. | Cloud session (atomic promotion) |

| 2026-07-26 | 0.1 (ADR status-collection correction) | **PR-review finding (Codex P2).** §3 class C no longer enumerates `ADR-0001…ADR-0025` as if uniformly accepted; it now reads *"individually accepted or active ADRs, according to each ADR's own metadata and decision status"* with concrete active examples. Added the explicit rule that **the `ADR-####` naming convention and directory membership confer no Canonical status**, and that deferred/proposed/superseded/rejected/historical ADRs are inputs or open decisions rather than class C authority — citing **ADR-0025** (`deferred`/`proposed`) as the live example, with PRJ-036 still `OPEN`. **No founder decision changed; no ADR status changed; no implementation authorized.** | Cloud session (PR-review correction) |

| 2026-07-27 | 0.1 (Mastery & Evidence promotion) | **§2 / §2.1 updated:** the Mastery & Evidence domain row now routes to **DOC-051 Mastery & Evidence Bible v1.0 (`Canonical`, signed off 2026-07-27)**; the "document does not yet exist" dependency wording removed from live routing; the missing-owner conflict path no longer applies to this domain; §15 worked example updated. **PRJ-014 → `CANONICAL`; PRJ-009 remains `OPEN` (no Social evidence contract).** Founder-only implementation opening (§10), Axis A/B separation, conflict-stop rules and supporting-record boundaries all **unchanged**. **Canonical ≠ implemented: the evidence runtime remains non-conforming (DOC-054); no implementation authorized.** | Cloud session (founder-authorized promotion) |

| 2026-07-28 | 0.1 (Curriculum Charter promotion) | **§2 updated:** the Curriculum domain row now routes to **DOC-058 Curriculum Charter v1.0 (`Canonical`, founder-signed 2026-07-28)** — 🟡 PARTIALLY AUTHORED: the Charter governs the current L0–L17 tiered spine, thesis, cadence, and stop conditions; **the Curriculum Bible remains unauthored**, so post-L17 sequencing, Capability Arc composition, and PRJ-015 counting keep the missing-owner path. §15 lesson-sequencing worked example updated (in-spine questions answered by the Charter; post-L17 → stop). **PRJ-001 remains `OPEN` with narrowed scope; PRJ-015/029/036 remain `OPEN`. Canonical ≠ implemented; no implementation authorized.** | Cloud session (founder-signed promotion) |

*End of Authority and Routing Spec v0.1. Supporting specification; procedural only; authorizes no build.*
