---
title: Cairn Curriculum Capability Arcs
version: 0.1
status: Draft — awaiting founder sign-off
authority: Draft Curriculum Arc composition. Becomes binding only after explicit founder sign-off and promotion; authors no post-L17 sequence and confers no implementation authority.
owner: Curriculum
date: 2026-07-30
implementation_authority: none
prj_status: OPEN
source_discovery: CAPABILITY_ARCS_DISCOVERY_v0.1.md
---

# Cairn Curriculum Capability Arcs v0.1

## 1. Status and authority

- **Draft.** Nothing here is Canonical until explicit founder sign-off
  and promotion.
- **PRJ-001 remains OPEN.** Composing these records is a PRJ-001
  increment, not its closure.
- **No post-L17 sequence is authored.** No lesson beyond L17 is placed
  or numbered anywhere in this document.
- **No tense is placed.** Futur proche, passé composé, and imparfait
  appear only as recorded open dependencies.
- **No implementation is authorized.** No runtime object, schema,
  validator, or registry work follows from this document.
- **Arcs are internal and learner-invisible** (PB-014). The learner
  sees Journeys, lessons, and checkpoints — never an Arc.

The five founder decisions of 2026-07-30 (FQ-A1…A5, folded into
`CAPABILITY_ARCS_DISCOVERY_v0.1.md` §18) authorize this draft and fix
its model, arc set, membership rule, and record structure.

## 2. Arc model

**Function-named Capability Arcs constrained by capability-system
durability tests** (FQ-A1, approved). Arc names speak the learner's
can-do language; each Arc must pass all eight durability tests:

1. describes something the **learner can do**;
2. **spans multiple lessons**;
3. **owns a meaningful dependency chain**;
4. remains useful **beyond one setting or topic**;
5. remains meaningful **toward the destination band**;
6. does **not reduce** to one grammar system, vocabulary theme, or
   exercise;
7. remains **distinct from mastery evidence**;
8. permits **legitimate overlap** with other Arcs.

Journey-phase names remain Journey-layer material (Product/Brand) and
are never used as Arc architecture. There is no separate system
taxonomy and no three-layer hybrid.

## 3. Global ownership and boundaries

Stated once for every record below (FQ-A4 — not repeated per Arc):

- **Curriculum** owns Arc composition.
- **Product** owns the Journey layer.
- **Content** owns lesson payload.
- **Mastery & Evidence** owns evidence meaning — what any attempt
  inside an Arc *proves* is never answered by an Arc record.
- **Engineering** owns any future representation.
- **Learner visibility: none.**

## 4. Lesson membership rule

Per FQ-A3 (approved with guardrail):

- A **normal (non-integration) lesson** has **one primary Arc
  contribution**. A secondary Arc is listed only when the lesson
  creates a **real entry, extension, transfer, or active
  recombination** for that Arc. Incidental vocabulary, context, or
  presentation does **not** create Arc membership.
- An **integration lesson** may have **multiple co-primary Arcs**, each
  with its specific recombination role recorded. Integration itself is
  a mechanism, not an Arc.
- Every lesson-to-Arc relationship uses exactly one role:
  **entry · extension · integration · transfer · preview**.
- **Preview does not establish owned capability.**
- No weights, percentages, or ranking scores.

## 5. ARC-α — Getting What You Need

| Field | Content |
|---|---|
| Working name / label | Getting What You Need (**ARC-α**, provisional) |
| Capability statement | The learner can politely obtain what they want or need — order, request an object, ask permission to act, and express need and necessity. |
| Entry lesson | **L1** (L0 gives an uncounted preview taste) |
| Contributing lessons & roles | L0 preview → **L1 entry** → L4 extension (need→request bridge) → L5 extension (object requesting) → L9 extension (request a pause) → L11 extension (permission) → L15 extension (necessity) · L6 / L10 / L13 integration |
| Current maturity | **Established** |
| Prerequisites | None upstream; α's politeness frame feeds most other arcs |
| Next unresolved expansion | Transactions beyond the micro-scene (quantity, money, time, service situations; negotiating alternatives) — open, unplaced |

*Scope boundary:* the test is **obtaining** — not every desire or
action sentence. Desire vocabulary and general verbs of doing belong to
their lessons, not to this Arc.

## 6. ARC-β — Saying Who and How You Are

| Field | Content |
|---|---|
| Working name / label | Saying Who and How You Are (**ARC-β**, provisional) |
| Capability statement | The learner can say who they are, how they feel, and what state they are in — and ask about and respond to the same for another person. |
| Entry lesson | **L2** |
| Contributing lessons & roles | **L2 entry** → L3 extension (what I'm not) → L4 extension (states and feelings) → L6 integration (explain myself as a person) → L17 extension (check-in and feelings — spec-only) |
| Current maturity | **Established** (shipped through L6; the L17 contribution is spec-only) |
| Prerequisites | α's politeness frame |
| Next unresolved expansion | Describing others in depth; opinion and evaluation beyond `c'est` chunks; past states (an imparfait dependency — recorded, not placed) |

*Scope boundary:* not a generic adjective or description topic. The Arc
is identity, state, feelings, and responding about self and others —
descriptive vocabulary joins only when it serves that capability.

## 7. ARC-γ — Moving Through Places

| Field | Content |
|---|---|
| Working name / label | Moving Through Places (**ARC-γ**, provisional) |
| Capability statement | The learner can say where they are going, ask where things are, and refer to a known place the short way. |
| Entry lesson | **L7** (a deliberately narrow two-chunk doorway) |
| Contributing lessons & roles | **L7 entry** → L8 extension (où) → L13 preview (`j'y vais` seed) + integration → L14 extension (`y` shortcut) → L16 integration (spec-only) |
| Current maturity | **Narrow / developing** (all contributing lessons registered-hidden or spec-only) |
| Prerequisites | α (requests carry destinations); δ (questioning) |
| Next unresolved expansion | Directions, travel, arranging to meet; **future plans are recorded only as an open dependency** (the futur-proche question lives here and is not placed) |

*Scope boundary:* location, destination, movement, and known-place
reference — not a travel-vocabulary theme.

## 8. ARC-δ — Keeping the Conversation Alive

| Field | Content |
|---|---|
| Working name / label | Keeping the Conversation Alive (**ARC-δ**, provisional) |
| Capability statement | The learner can open, steer, repair, and close a small exchange — greet and leave, refuse politely, ask and upgrade questions, ask for help, recover when lost, and check in humanly. |
| Entry lesson | **L1** (ritual + rescue chunks) |
| Contributing lessons & roles | **L1 entry** → L3 extension (refusal, yes/no asking, tu/vous control) → L8 extension (polite recovery) → L11 extension (help asking) → L12 extension (question wrapper) → L17 extension (open/close a human moment — spec-only) · L6 / L10 / L13 integration |
| Current maturity | **Established thread with unresolved foundation debt** |
| Prerequisites | None — δ is the safety net the other arcs rely on |
| Next unresolved expansion | **Repair prerequisite reconciliation first** (see debt below) — this is a prerequisite question, not an L18+ placement |

*Known contradiction / debt (highest-priority unresolved foundation
issue):* the repair pair (`je ne comprends pas` /
`vous pouvez répéter ?`) is spec-layer established but **unshipped in
runtime**, and **L13 assumes capability the runtime did not ship** —
the spine's one recorded capability debt. Its content home is already
founder-decided: **FQ-C8 → the L1 Survival Kit redesign**, which
remains a separate track. Per the FQ-A5 founder correction,
**communication repair is the first Capability prerequisite debt to
reconcile** — and this record assigns **no L18+ expansion** and adds no
repair payload to any post-L17 lesson.

*Scope boundary:* δ is interaction **management** — open, steer,
repair, close. It must not become "everything conversational":
questioning mechanics, negation forms, and social vocabulary live in
their lessons; only the management capability lives here.

## 9. ARC-ε — Understanding and Responding

| Field | Content |
|---|---|
| Working name / label | Understanding and Responding (**ARC-ε**, provisional) |
| Capability statement | The learner can take in a bounded piece of real French — a tiny written moment — and respond with language they own. |
| Entry lesson | **L16** (spec-only; model-answer response) |
| Contributing lessons & roles | L6–L10 optional micro-paragraphs preview → **L16 entry** (spec-only) |
| Current maturity | **Emerging / spec-led** (nothing shipped) |
| Prerequisites | δ and α supply the response material; the Content Bible's reading action rule governs the action shape |
| Next unresolved expansion | Reading depth beyond one bounded seed, and any listening progression (PRJ-018 OPEN) — open, unplaced |

*Scope boundary:* the current seed is **written** only; **no listening
progression exists**. This is deliberately the smallest Arc, and this
record makes **no claim of a mature comprehension Arc** — a planned
recurrence exists only in the unratified roadmap layer and is not
placed here.

## 10. Cross-Arc map (L0–L17)

Status: **shipped** · **REG-hidden** (registered, hidden by the L6 cap)
· **spec-only**. Integration lessons (L6/L10/L13/L16) carry co-primary
contributions per §4. Not every lesson has a secondary Arc.

| Lesson | Primary contribution | Secondary contribution(s) | Role(s) | Status |
|---|---|---|---|---|
| L0 | — | — | ARC-α preview bridge — non-membership | shipped bridge |
| L1 | α | δ | α entry; δ entry | shipped |
| L2 | β | — | entry | shipped |
| L3 | δ | β | δ extension; β extension | shipped |
| L4 | β | α | β extension; α extension | shipped |
| L5 | α | — | extension | shipped |
| L6 | α + β + δ (co-primary) | — | integration | shipped |
| L7 | γ | — | entry | REG-hidden |
| L8 | γ | δ | γ extension; δ extension | REG-hidden |
| L9 | α | — | extension | REG-hidden |
| L10 | α + β + γ + δ (co-primary) | — | integration | REG-hidden |
| L11 | δ | α | δ extension; α extension | REG-hidden |
| L12 | δ | — | extension | REG-hidden |
| L13 | α + δ + γ (co-primary) | — | α/δ/γ integration | REG-hidden |
| L14 | γ | — | extension | REG-hidden |
| L15 | α | — | extension | REG-hidden |
| L16 | ε + (δ, α, γ recombined) | — | ε entry; integration | spec-only |
| L17 | β | δ | β extension; δ extension | spec-only |

Preview annotations may be recorded for continuity, but they do not
create or duplicate Arc membership. Continuity notes: L0 exposes the
learner to α material without entering the formal Arc
membership/accounting spine; L1 carries a **β preview seed** (not β
membership); L13's `j'y vais` is a **γ preview of a later extension
inside an already contributing Arc** — it does not create a second γ
membership.

## 11. Current maturity summary

Qualitative states only (FQ-A2) — never scores or percentages:

| Arc | Maturity |
|---|---|
| ARC-α | established |
| ARC-β | established |
| ARC-γ | narrow / developing |
| ARC-δ | established thread with unresolved foundation debt |
| ARC-ε | emerging / spec-led |

The five arcs are **not equally mature**; treating them as equal would
repeat the L13 assumed-ownership defect at Arc scale.

## 12. Open Curriculum decisions

1. **Repair prerequisite resolution** — how and when the δ foundation
   debt is reconciled (home: L1 redesign track; separate review
   required).
2. **First post-L17 expansion** — deliberately unselected (FQ-A5
   correction); decided only after Arc composition review and the
   repair prerequisite review.
3. **Futur-proche direction** — open (gate 4); recorded as a γ/α
   dependency, not placed.
4. **ε reading/listening development** — no ladder exists (PRJ-018
   OPEN); none is invented here.
5. **Recount/past capability** — passé composé and imparfait presuppose
   a capability that has **no entry point in any current Arc**; the gap
   is recorded, not filled.
6. **Checkpoint meaning** — "capability checkpoint" remains undefined;
   a future Journey-layer design will consume Arcs, not equal them.
7. **Stable Arc IDs** — Greek labels are provisional; stable IDs are
   Curriculum Bible work.
8. **Future Arc additions or splits** — new arcs require capability
   evidence and the §2 durability tests.

## 13. Stop conditions

Stop and report to the founder when any work under this document would
require:

- exact L18+ placement;
- tense ordering;
- a new Arc not grounded in capability evidence;
- learner-facing Arc display;
- mastery thresholds;
- runtime representation;
- an Arc membership based only on incidental vocabulary;
- treating preview as owned capability;
- expanding δ after L17 while ignoring its L1 foundation debt.

## 14. Next step

1. **The Arc composition remains Draft and is paused.**
2. The next Curriculum action is a **global L1–L24 acquisition
   skeleton**, followed by **detailed L1–L6 normalization**.
3. That work will classify material as: **active · supported ·
   recognition · ghost/preview · recycle · meta/trap/sound**.
4. After the acquisition map: **re-check Arc lesson memberships**;
   **re-check Arc maturity statements**; apply only **evidence-driven
   Arc corrections**; then perform **one independent adversarial Arc
   review**.
5. **No Arc promotion or post-L17 sequencing** occurs before this
   reconciliation.
6. **L1 repair remains a separate priority debt** (FQ-C8 home); no
   lesson is edited by this document. **PRJ-001 remains OPEN.**

---

*End of Capability Arcs v0.1 — Draft, non-Canonical, awaiting founder
sign-off. Arcs are internal and learner-invisible; no post-L17
sequence, tense placement, checkpoint, mastery threshold, or
implementation is authorized.*
