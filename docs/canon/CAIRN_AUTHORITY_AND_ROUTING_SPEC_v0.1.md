---
title: Cairn Authority and Routing Spec
version: 0.1
status: Draft — awaiting founder ratification
authority: Proposed project-level conflict and routing specification
owner: Project Canon
created: 2026-07-25
related:
  - CAIRN_PROJECT_CANON_MAP_v0.1.md
  - CAIRN_PROJECT_IDEA_AND_DECISION_REGISTER_v0.1.md
  - CAIRN_CANON_COVERAGE_AND_GAPS_v0.1.md
---

# Cairn Authority and Routing Spec v0.1

> **Draft.** The detailed conflict, ownership, and routing specification behind the Project Canon Map (DOC-045). Decides no domain content; authorizes no implementation.

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
| **Curriculum** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Sequencing, band progression, item budgets. Fragments: DOC-027, DOC-028 |
| **Brand** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Voice, naming, visual identity. Fragments in DOC-029, DOC-037 |
| **UX** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Screen states, flows, controls. Fragments in DOC-029 |
| **Engineering** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Data model, runtime, sync, validators. **Several ADRs already bind** (DOC-015) |
| **Mastery / Evidence** | — | ⚠️ **DISTRIBUTED — no single owner** | See §2.1 |
| **Social** | DOC-010 Social Layer Charter v1.0 | ✅ Canonical | Boundaries, prohibited forms, direction, Social governance |
| **Privacy / Legal** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | ADR-0023 binds the model; interpretation unowned |
| **Operations / QA** | — | ⚠️ `DEPENDENCY — DOCUMENT NOT YET AUTHORED` | Validation gates, moderation ops, release. Fragments: DOC-031, DOC-042, DOC-021 |
| **Project Canon** | DOC-045 (this package) | 🟡 Draft | Routing only |

### 2.1 Mastery / Evidence — explicit ownership finding

**Mastery/Evidence does not currently have a completed owner document.** It is distributed across at least four places:

- **ADR-0009** (events as source of truth), **ADR-0020** (progress bridge events canonical), **ADR-0021** (mastery precision: near-miss is not failure) — binding technical decisions.
- **DOC-004 Content Bible** — what an item *is*, item roles, prerequisite safety.
- **Vault fragments** — `02_LEARNING_SYSTEM/Mastery Model`, `05_MATRICES/Mastery Matrix`, `03_EXERCISES/Exercise Evidence Matrix`.
- **DOC-010 Social Charter §13** — states what *cannot* be evidence, and defers the positive case to a non-existent evidence contract.

This is recorded as **PRJ-014**. It is *not* resolved here, and a missing Bible is **not** invented. Until an owner exists, mastery/evidence questions follow the **missing-owner conflict** path (§8.12, §9 step 3).

## 3. Source-authority classes

| Class | Definition | Examples |
|---|---|---|
| **A. Explicit current founder decision** | A decision stated by the founder now, for this question | Social Q1/R1–R11 (2026-07-25) |
| **B. Current Canonical document** | Promoted, signed-off, within its owned domain | DOC-001, DOC-004, DOC-010 |
| **C. Accepted ADR** | Technical/system decision, within its domain | ADR-0001…ADR-0025 |
| **D. Founder-ratified decision record** | Durable log of founder answers | DOC-011, DOC-009 |
| **E. Design canon** | Settled design principle, derived and accepted | `07_DESIGN/*`, `Visual_Design_Canon` |
| **F. Operational contract** | Binds how work is done | DOC-021, DOC-041, DOC-031, DOC-042 |
| **G. Approved specification** | Detailed intent, not build authority | DOC-020, DOC-024, DOC-025, DOC-026, DOC-028 |
| **H. Derived synthesis** | Assembled by an agent from other sources | This package; DOC-013 |
| **I. Historical proposal** | Once proposed, not currently active | `90_HISTORY/*`, old sprint plans |
| **J. Archive / superseded** | Explicitly replaced | DOC-044, legacy v7, `Superseded Specs` |
| **K. Implementation evidence** | What the system actually does | code, tests, DOC-018, DOC-032 |

> **Class K is special.** It has *no* authority over intent and *total* authority over fact. "What does it do?" is answered by K. "What should it do?" is never answered by K.

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
12. **Missing-owner conflict** — the question's owner document does not exist. **Escalate; never improvise a ruling.**

## 9. Conflict-resolution algorithm

```text
1. STATE THE QUESTION precisely.
   └─ Split "what should it do?" from "what does it do?"
      "What does it do?"  → class K governs. STOP. Record divergence if it
                            contradicts a spec.

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

**Standing project-level finding:** the precedence chain in DOC-022 and ADR-0024 omits all three Bibles (**PRJ-033**). It fails the inbound-reference scan today.

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

**Lesson sequencing vs lesson authoring.** "How do I author L12?" → Content Bible + the L12 spec. "Should L12 come before L13?" → Curriculum, which is **not yet authored**. The Content Bible must not answer the second question merely because it is Canonical.

**Human-audio direction vs current TTS reality.** Vault material treats audio/TTS/shadowing as a future layer (`Future Features`), while the shipped app uses TTS. Direction and reality coexist; neither cancels the other (PRJ-017, PRJ-018).

**Canonical document vs supporting review record.** DOC-010 governs; DOC-011/012/013/014 support it. When they drifted (the record still calling the Charter "Draft"), the **supporting record was corrected**, not the Charter.

## 16. Change log

| Date | Version | Change | By |
|---|---|---|---|
| 2026-07-25 | 0.1 | Initial draft. Defined the domain-ownership model (including the explicit finding that **Mastery/Evidence has no single owner**), eleven source-authority classes, four independent status models, twelve conflict types, an eight-step resolution algorithm with a dedicated missing-owner path, the fourteen-element implementation-opening contract, documentation-change and supersession protocols, the seven-scan stale-reference audit, nine agent stop conditions, and six repository-supported worked examples. Decides no domain content; authorizes no implementation. | Cloud session (project canon mapping) |

*End of Authority and Routing Spec v0.1. Draft; procedural only; authorizes no build.*
