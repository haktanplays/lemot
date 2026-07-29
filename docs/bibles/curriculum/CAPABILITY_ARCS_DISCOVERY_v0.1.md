---
title: Cairn Curriculum Capability Arcs Discovery
version: 0.1
status: Discovery — no Arc model ratified
authority: None. Maps existing capability progression and prepares founder decisions; authors no post-L17 sequence and authorizes no implementation.
owner: Curriculum
date: 2026-07-29
audited_head: f56e82e4d5d24a4ab055d04ab60fffe017535e04
implementation_authority: none
related:
  - CURRICULUM_CHARTER_v1.0.md
  - PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md
  - CURRICULUM_LAYER_DISCOVERY_v0.1.md
---

# Cairn Curriculum Capability Arcs Discovery v0.1

> **Discovery only — no Arc model is ratified here.** Composing Capability
> Arcs is a Charter §14 stop condition until the founder answers the §18
> cards; this document maps what exists, tests candidate models, and
> proposes a first Arc set for decision. It authors no L18+ sequence,
> places no tense, creates no CEFR ladder, defines no mastery threshold,
> and edits nothing Canonical. Arc labels below (ARC-α…ε) are
> **provisional discovery labels only** — no stable Canonical Arc IDs are
> allocated.

---

## 1. Executive verdict

1. **A Capability Arc has never been composed** — confirmed at every
   authority level (Product Brain PB-013/014 define only the hierarchy;
   Charter §4 "None exists yet"; §13/§14 make composition open work and a
   stop condition; §16 makes "first Capability Arcs composed" the first
   Curriculum-Bible maturity bar). This discovery is the authorized
   preparation step, not the composition itself.
2. **The working definition holds** (§4): a durable learner capability
   that begins in one lesson, develops across multiple lessons,
   recombines through integration, and outlives any single grammar or
   vocabulary topic. Eight testable properties survive the L0–L17 trace.
3. **The spine already contains ~9–10 implicit capability threads** (§7),
   visible consistently across four independent source layers (Charter §5
   purposes, Coverage-Matrix functions, the owned-forms ladder, the
   build-matrix outcomes). They cluster naturally into **five arcs** (§12)
   without inventing anything.
4. **Recommended model: function arcs with capability-system discipline**
   (Model A refined by Model B's durability tests; §9). Journey-phase
   labels (Model C) belong to the *Journey* layer — Product/Brand
   material, not Arc names — because PB-014 already makes Arcs internal.
5. **The sharpest post-L17 finding** (§13): the historically assumed next
   step (L18 futur-proche preview) is **plan-inherited, not
   maturity-derived**. By Arc maturity, the weakest established
   capabilities after L17 are **communication repair** (the vault's four
   functional holes; the unshipped repair pair; FQ-C8's L1-redesign home)
   and **comprehension-to-response** (one bounded reading seed; no
   listening progression, PRJ-018 OPEN). Which arc gets the next
   expansion is a founder card, not a conclusion.

---

## 2. Scope and authority

Boundary preserved throughout (Charter §2; Product Brain §19; Mastery
Bible §28; Item-Counting Contract §1):

- **Product** owns the learner promise, target learner, destination
  (~A0→B2 / ~3,000 words as planning bands), Journey-level intent, the
  Journey → Capability Arc → Lesson hierarchy itself, and Journey
  Reinforcement's existence (PB-013…PB-024).
- **Curriculum** owns Arc composition; when arcs begin, deepen,
  integrate, and remain open; which lessons contribute to each arc; and
  post-L17 sequencing decisions (all currently open).
- **Content** owns lesson payload, active-new 1–4 (unit per the
  Item-Counting Contract), exercise and presentation rules, and
  linguistic quality. An Arc never changes a payload rule.
- **Mastery & Evidence** owns what evidence proves, mastery-state
  meaning, attribution, readiness and confidence semantics. An Arc
  describes curriculum progression — it is **not** a mastery score, an
  evidence ladder, a screen flow, a runtime object, a CEFR checklist, or
  a grammar syllabus, and nothing here defines how Journey
  Reinforcement's "demonstrated capability" is measured (deferred,
  PB-024).
- **Engineering** owns any future representation. No runtime object is
  proposed. The shipped `JOURNEY_PHASES` list (14 artwork phases,
  legacy-24-lesson-calibrated) is Axis-B display reality, not an Arc
  source (§5).

## 3. Source method

Audited read-only at main `f56e82e`. Canonical: Product Brain v1.0 (§2,
§5–§7, §12, PB-013…026/032/055), Content Bible v1.0, Mastery Bible v1.0
(§26–§28), Curriculum Charter v1.0 (§3 thesis, §5 spine, CC-008, §10
spiral, §6 rhythm, §13–§16), Item-Counting Contract v1.0 (IC-002/003),
Canon Map, Authority Spec, Coverage & Gaps, Project Register, Source of
Truth Map, docs/README. Fragments: all L0–L17 specs + gate reviews
(including every spec's `Main can-do outcome` line, verbatim), Syllabus
Design Rules, Level and Band Map, Grammar/Vocabulary Progression
(owned-forms ladder; four functional holes), Integration Lesson Logic,
archetypes, Lesson Flow Canon, L18–L24 Roadmap, founder build matrix
(the `Primary learner outcome` column), Syllabus Coverage Matrix
(the `Fonksiyon` grid), the demoted Build Spec §38 map. Runtime
(evidence only): registered v1 lessons and objectives, the 8
learning-engine contracts' `goal.canDo`/`notGoal` strings,
`constants/journey.ts`, current visibility (L6 cap). Prior discoveries
(DOC-059, DOC-063) supply the spine, cadence, and counting facts without
re-derivation. Full map §20.

## 4. What a Capability Arc is

**Canonical floor (Product Brain §6, the only existing definition):** a
Capability Arc is "the internal organizing spine that groups lessons by
the capability they build"; Arcs are **internal and never surfaced to the
learner** (PB-014); the curriculum is organized **by capability, not by
topic or setting** (PB-016 — "a café or a hotel is a delivery vehicle for
a capability, never the reason a lesson exists").

**Working definition tested here:**

> A Capability Arc is a durable learner capability that begins in one
> lesson, develops across multiple lessons, recombines through
> integration, and remains usable beyond a single grammar or vocabulary
> topic.

**Audit: sufficient**, provided the eight properties below are treated as
the test, not decoration. Every property is exercised by the L0–L17
trace (§6):

1. expresses something the **learner can do** (the specs' own
   `Main can-do outcome` genre);
2. **spans more than one lesson** (single-lesson capabilities are lesson
   outcomes, not arcs);
3. **combines language material** rather than equalling one item
   (an arc ≠ a chip, frame, or linked concept-cluster — those are
   Item-Counting Contract identity units);
4. has an **entry point** (a doorway lesson);
5. has later **expansion or recombination** (extension lessons and
   integration beats);
6. **survives transfer** into new contexts (the café-centricity
   reduction is the recorded transfer test);
7. remains **distinct from mastery proof** (an arc says where the
   capability is built; the Mastery Bible says what any attempt proves);
8. permits **multiple arcs to overlap in one lesson** (every integration
   lesson demonstrably serves several).

One repo-specific gap the definition must tolerate: **"capability
checkpoint" is undefined** (a single occurrence, PB-014's learner-visible
triad; its only concrete instance is L20's planned "L1–L19 capability
proof"). This discovery does not define checkpoints; it records that a
future Journey/checkpoint design will need composed Arcs to point at.

## 5. What it is not

Rejected as arc material, with the repo's own counter-examples:

- **Not one grammar structure.** `est-ce que` (L12) is a control layer
  inside the questioning capability, not an arc; a "negation arc" would
  re-create the grammar-topic syllabus the thesis forbids.
- **Not one vocabulary topic.** "Feelings words" is exactly the
  emotion-vocab dump the L17 gate review cut (7–9 → 3–5).
- **Not one lesson title.** "Faire une pause" is an entry point, not an
  arc.
- **Not one exercise type or UI feature.** Weave, Say-It, and the
  reading screen are Content/Engineering surfaces.
- **Not a mastery state or evidence ladder.** FQ-5: no universal named
  ladder exists; arcs must not become one by the back door.
- **Not a CEFR descriptor copied without adaptation.** The demoted
  12-unit map organized by CEFR-band + topic is the recorded
  anti-pattern (FQ-C2).
- **Not the shipped `JOURNEY_PHASES` artwork list** — 14 display phases
  calibrated to the quarantined 24-lesson syllabus, with a recorded
  recalibration debt; narrative dressing, not capability structure.

## 6. L0–L17 capability trace

Statuses: **EST** = genuinely established (shipped or locked spec) ·
**PRE** = preview/supported only · **SPEC** = spec-only intent ·
**FUT** = future implication. Can-do lines are the specs' own (verbatim
in the source sweep); no post-L17 placement is invented.

| Lesson | Status | Learner-facing purpose (sourced) | Capabilities introduced | Extended | Recombined | Candidate arcs | Confidence |
|---|---|---|---|---|---|---|---|
| L0 | shipped bridge | first-contact café taste; "no measurable mastery goal" | polite-request *taste* (PRE) | — | — | α (entry taste) | High |
| L1 | locked/shipped | greet, ask politely, recover, leave | polite request (EST); greeting/leave ritual (EST); rescue/repair *chunks* (EST as frozen wholes; repair *pair* unshipped — hole R-A) | L0 request | — | α entry; δ entry; β seed | High |
| L2 | locked/shipped | say who/what I am; `c'est` react | self-identification (EST); reacting/evaluating (PRE via `c'est` chunks) | — | — | β entry | High |
| L3 | locked/shipped | say no, what I'm not, yes/no ask, tu/vous, refuse politely | negation/refusal (EST); yes/no questioning by intonation (EST); register choice (PRE) | β (not-being), δ (control) | — | δ extension; β | High |
| L4 | locked/shipped | say how I feel / what I need with avoir | state & need expression (EST) | β; α (need→request bridge) | — | β extension; α | High |
| L5 | locked/shipped | ask for/name objects with un/une packages | object naming/requesting (EST) | α | — | α extension | High |
| L6 | shipped, last visible | recombine to explain myself as a person, beyond the café | **integration**; human-context broadening (EST); `je voudrais + inf.` (PRE) | β, δ | α+β+δ chained | multi-arc integration | High |
| L7 | REG-hidden (compact) | close a moment and head off — `je vais à la maison` | movement/departure doorway (EST-narrow: 2 chunks) | δ (leave ritual) | — | γ entry | High (slot) |
| L8 | REG-hidden | ask/answer "where?", recover politely | location asking (EST) | γ; δ (recover) | — | γ extension; δ | Medium |
| L9 | REG-hidden | small action/pause with faire | small-action management (EST) | α (request a pause) | — | α extension | Medium |
| L10 | REG-hidden | "after class" one natural human flow | **integration**; flow chaining (EST) | — | α+β+γ+δ | multi-arc integration | Medium |
| L11 | REG-hidden | ask help, ask permission, say I can't | help/permission asking (EST); ability-negation (EST) | δ (help ask), α (permission-to-act) | — | δ extension; α | Medium |
| L12 | REG-hidden | standard yes/no wrapper over owned clauses | question upgrading (EST-narrow) | δ (L3 intonation → wrapper) | — | δ extension | Medium |
| L13 | REG-hidden | can-do & asking in one flow; `j'y vais` seed | **integration**; chaining meta (`phen:can-do-asking`) | — | δ+α+γ | multi-arc; γ seed (PRE) | Medium |
| L14 | REG-hidden | `j'y vais / on y va` — go without repeating the place | place-shortcut reference (EST-narrow) | γ | — | γ extension | Medium |
| L15 | REG-hidden | what one must / I have to; can-vs-must feel | obligation expression (EST-narrow, asymmetric) | α (acting under necessity) | — | α extension | Medium |
| L16 | SPEC-only | read a small situation, understand, respond simply | reading-for-action seed (SPEC); model-answer response | — | δ+α+γ recombined under a text | ε entry (SPEC) | Medium |
| L17 | SPEC-only | ask how someone is, say how I am, respond kindly — no advice | social check-in (SPEC) | β (feelings), δ (open/close a human moment) | β+δ | β extension; δ | Medium |
| — | FUT | passé composé / imparfait / futur (unplaced; Campfire-promised) | — | — | — | future arcs' dependencies only | — |

Micro-paragraph reading exposure in L6–L10 is **PRE** for ε (optional,
present-only). The repair *pair* (`je ne comprends pas` /
`vous pouvez répéter ?`) is EST as frozen L1 chunks in the spec layer but
**unshipped in runtime** and assumed-owned by L13 — the recorded
inconsistency (FQ-C8; home = L1 redesign). That gap sits inside δ.

## 7. Existing implicit arcs

Four independent source layers name the same threads (descending
authority): Charter §5 purposes (Canonical) → Coverage Matrix `Fonksiyon`
column → Vocabulary Progression's intent-function ladder ("greet · ask
politely · rescue · state identity · refuse · state need · request
object · move · ask where · small action/pause · recombine") → build
matrix `Primary learner outcome` column. Distinct recurring threads
found: **polite obtaining** · **greeting/leave-taking** · **rescue/
repair** · **self-identification** · **state/feeling expression** ·
**negation/refusal** · **questioning** (intonation → où → wrapper) ·
**movement/location** · **small-action & permission/obligation
management** · **reading-for-action** (seed) — **~9–10 implicit
threads**, plus the cross-cutting integration/chaining practice that is a
*mechanism*, not an arc. No source names an arc as such; the clustering
in §12 is DERIVED_SYNTHESIS and is presented for decision, not as fact.

## 8. Candidate Arc models

**Model A — Function arcs** (obtain/request · identify/describe ·
locate/move · manage interaction · repair communication · express
state/feeling). *Strength:* learner-facing, matches the specs' can-do
genre and the intent-function ladder — the sources already speak this
language. *Risk:* breadth and overlap (is "manage interaction" one arc or
three?); a lazy function list drifts toward topics.

**Model B — Capability-system arcs** (self/world reference · state and
evaluation · action and agency · question and response · interaction
management · comprehension and repair · narrative/reading). *Strength:*
durable architecture; systems survive to B2. *Risk:* abstract labels
authors won't reliably apply ("action and agency" vs "I can get what I
need"); no source uses this vocabulary.

**Model C — Journey-phase arcs** (survive first contact · stabilize the
exchange · expand choice · manage misunderstanding · connect ideas ·
recount and project). *Strength:* narrative alignment with the learner
journey. *Risk:* phases hide pedagogical dependencies (repair is needed
in *every* phase, not one); and phases are **Journey material** — PB-013
already separates Journeys (visible chapters) from Arcs (internal spine),
so using phases as arcs collapses two canonical layers into one.

**Hybrid assessment.** Cairn does not need a heavy hybrid. What the
sources support: a **small set of durable arcs named as functions but
tested with system-durability questions** (does this arc still make sense
at B2? does it own a dependency chain?), with **journey labels living in
the Journey layer** (Product/Brand; the ~7-journeys planning band), and
**lessons contributing to multiple arcs** (every integration lesson
already does). A full three-layer hybrid (arcs + system taxonomy +
journey overlay) is rejected as bureaucracy — nothing in the sources
requires it.

## 9. Comparative evaluation

| Criterion | A (function) | B (system) | C (journey-phase) |
|---|---|---|---|
| Grounded in existing source vocabulary | ✓ (ladder, can-do lines) | ✗ | ~ (narrative only) |
| Author usability | ✓ | ✗ | ✓ |
| Durability to B2 | ~ (needs B's tests) | ✓ | ✗ (phases end) |
| Keeps capability-not-topic (PB-016) | ✓ if tested | ✓ | ~ |
| Respects Journey/Arc layer split (PB-013/014) | ✓ | ✓ | ✗ (collapses layers) |
| Exposes pedagogical dependencies | ~ | ✓ | ✗ |
| Multi-arc lesson membership | ✓ | ✓ | ~ |
| Avoids CEFR/grammar drift | ✓ | ✓ | ✓ |
| Bureaucracy risk | low | medium | low |

**Recommendation (for FQ-A1): Model A refined by Model B's durability
tests** — function-named arcs, each required to pass: (i) still
meaningful at the destination band, (ii) owns a dependency chain, (iii)
not reducible to one grammar system or topic. Model C's labels are
reserved for the Journey layer.

## 10. Required edge cases

| Case | Owning arc(s) | Lesson role | Verdict on the model |
|---|---|---|---|
| L0 café order | α | entry *taste* (bridge, uncounted) | model tolerates a pre-arc bridge ✓ |
| L1 Survival Kit | α + δ (+β seed) | entry ×2 | multi-arc entry is real; model must allow it ✓ |
| L3 negation | δ (control) + β (what I'm not) | extension | negation is material *inside* arcs, not an arc — prevents grammar-syllabus drift ✓ |
| L6 integration | α+β+δ | integration | integrations are multi-arc recombination points, not arc members-of-one ✓ |
| L7 movement doorway | γ | entry (deliberately narrow) | an arc may open with a 2-chunk doorway ✓ |
| L8 location | γ + δ (recover) | extension | overlap handled ✓ |
| L11 pouvoir/help | δ (help ask) + α (permission) | extension ×2 | one lesson, two arcs — matches its own can-do line ✓ |
| L12 est-ce que | δ | extension (upgrade of L3) | grammar serves the arc ✓ |
| L13 integration | δ+α+γ | integration + γ seed | preview-hook ≠ arc membership until owned ✓ |
| L14 y | γ | extension | ✓ |
| L15 devoir/falloir | α (acting under necessity) | extension | obligation is not its own arc — too narrow ✓ |
| L16 reading seed | ε (+δ, α recombined) | entry (SPEC) | an arc may enter spec-first ✓ |
| L17 social check-in | β + δ | extension ×2 | ✓ |
| future passé composé | no current arc — a *recount* capability has no entry point | FUT | model correctly exposes the gap instead of hiding it ✓ |
| future imparfait | same recount/describe-past gap | FUT | ✓ |
| future listening progression | ε dependency (PRJ-018 OPEN) | FUT | model routes, does not invent ✓ |
| communication repair | δ core — currently the *weakest* established thread (holes R-A…; unshipped pair) | gap inside an existing arc | model surfaces the L13 assumption defect ✓ |
| A Small Moment | ε (the device); `phen:a-small-moment-seed` is a mechanism, not an arc | L16 entry, L19 planned recurrence | ✓ |

Answering the standing questions: one lesson can belong to multiple arcs
(demonstrated, not optional); the model helps decide post-L17 by
maturity-per-arc (§13); it prevents a grammar-topic syllabus (negation/
est-ce que/y/devoir all land *inside* arcs); bureaucracy stays low if the
record structure stays at §11's nine fields.

## 11. Smallest viable Arc structure

Sufficient per-arc record (nothing more):

| Field | Content |
|---|---|
| Arc ID | provisional until the Bible allocates stable IDs |
| Learner capability statement | one "the learner can …" sentence |
| Entry lesson | the doorway |
| Contributing lessons | entry / extension / integration roles |
| Current maturity | e.g. established / narrow / seed / spec-only |
| Prerequisites | upstream arcs or owned material |
| Next unresolved expansion | one named question, no lesson number |
| Owner | Curriculum |
| Evidence-boundary pointer | one line: "proof semantics → Mastery Bible" |

Explicitly excluded (tested and rejected): runtime schemas, percentages,
mastery thresholds, analytics, CEFR matrices, screen mappings, full
lesson inventories. An author must be able to maintain an arc record in
under a page.

## 12. Proposed first Arcs (5 — provisional labels)

**ARC-α — Getting What You Need.**
*Capability:* the learner can politely obtain what they want or need —
order, request an object, ask permission to act, express need and
necessity. *Contributing:* L0 (taste) → **L1 entry** → L4 (need) → L5
(objects) → L9 (request a pause) → L11 (permission) → L15 (necessity);
integrations L6/L10/L13. *Unowned after L17:* transactions beyond the
micro-scene (quantity, money, time, service situations — all currently
only in demoted/reference maps); negotiating alternatives. *Dependency:*
none upstream; feeds most others. *Confidence:* High. *Breadth risk:*
medium — must not swallow every "want" sentence; the test is
*obtaining*, not desire vocabulary.

**ARC-β — Saying Who and How You Are.**
*Capability:* the learner can say who they are, how they feel, what
state they're in — and ask/respond to the same about another person.
*Contributing:* **L2 entry** → L3 (what I'm not) → L4 (states) → L6
(explain myself as a person) → L17 (check-in, feelings — SPEC).
*Unowned after L17:* describing others in any depth; opinions/evaluation
beyond `c'est` chunks; past states (a future imparfait dependency —
recorded, not placed). *Dependency:* α's politeness frame. *Confidence:*
High to L6; Medium at L17 (spec-only). *Narrowness risk:* low.

**ARC-γ — Moving Through Places.**
*Capability:* the learner can say where they're going, ask where things
are, and refer to a known place the short way. *Contributing:* **L7
entry** (narrow doorway) → L8 (où) → L13 (seed) → L14 (`y`);
recombined L16. *Unowned after L17:* directions, travel, arranging to
meet; future plans (the futur-proche dependency lives here — recorded,
not placed). *Dependency:* α (requests carry destinations), δ
(questions). *Confidence:* Medium (all REG-hidden). *Narrowness risk:*
medium — currently the thinnest established arc by material.

**ARC-δ — Keeping the Conversation Alive.**
*Capability:* the learner can open, steer, repair, and close a small
exchange — greet and leave, refuse politely, ask and upgrade questions,
ask for help, recover when lost, check in humanly. *Contributing:* **L1
entry** (ritual + rescue chunks) → L3 (control: no / yes-no / tu-vous) →
L8 (recover) → L11 (help ask) → L12 (question wrapper) → L17 (open/close
a human moment — SPEC); integrations L6/L10/L13 chain it. *Unowned after
L17:* the **repair pair itself is unshipped** (FQ-C8 home: L1 redesign);
misunderstanding management beyond one frozen exchange; the vault's four
functional holes (repair pair, "oui paradox", `excusez-moi`,
state/feeling gap) all sit here or on the β border. *Dependency:* none —
it is everyone else's safety net. *Confidence:* High as a thread;
**the maturity claim is the weakest** (assumed-owned material). *Breadth
risk:* highest of the five — must be held to interaction *management*,
not "everything conversational".

**ARC-ε — Understanding and Responding.**
*Capability:* the learner can take in a small piece of real French — a
tiny written moment — and respond with what they own. *Contributing:*
L6–L10 optional micro-paragraphs (PRE) → **L16 entry (SPEC,
model-answer-only)**; L19 recurrence is PLANNED only. *Unowned after
L17:* everything beyond one bounded seed — reading depth, any listening
progression (PRJ-018 OPEN), any spoken-comprehension ramp. *Dependency:*
δ and α supply the response material; Content Bible's Reading rule
governs the action shape. *Confidence:* Medium-low (nothing shipped).
*Narrowness risk:* low now; this is deliberately the smallest arc.

*(Coverage note: greeting/leave ritual is carried inside δ; obligation
inside α; negation splits across β/δ as material. Rejected as separate
arcs: negation, questions, obligation, feelings-vocabulary, reading-as-
topic — each fails property 3 or the §5 rejection list. 3-arc
alternative for FQ-A2: merge γ into α and ε into δ — workable but hides
the two clearest post-L17 gaps.)*

## 13. Post-L17 implications

No lesson numbers are fixed. Statuses per the task vocabulary:

- **Repair is the most underdeveloped established capability** —
  `SUPPORTED BY CURRENT SOURCES` (unshipped pair, R-A…R-E holes, L13's
  recorded false assumption, L19's planned "weak-point repair" role).
- **Comprehension (ε) is one bounded seed with no listening ramp** —
  `SUPPORTED BY CURRENT SOURCES` (L16 spec-only; PRJ-018 OPEN; audio
  explicitly not blocking authoring).
- **Which arc gets the next expansion** — `PLAUSIBLE — FOUNDER DECISION
  REQUIRED` (FQ-A5): by Arc maturity, δ (repair) and ε lead; by the
  inherited Option-C working arc, L18 futur-proche preview leads.
- **"Futur proche is next"** — `PLAUSIBLE — FOUNDER DECISION REQUIRED`,
  and honestly labeled **historically assumed**: it derives from the
  band map's Option C and the commercial-depth split (preview-free /
  paid-owned), not from any capability-maturity analysis. Gate 4 remains
  OPEN. Arc analysis neither confirms nor kills it.
- **Where repair belongs** — `SUPPORTED`: inside ARC-δ, with the pair's
  content home already founder-decided (FQ-C8 → L1 Survival Kit
  redesign); its curriculum *expansion* point is open.
- **Reading/listening/speaking/writing progression** — `OPEN`; no ladder
  exists and none is invented; ε is the container that makes the gap
  visible.
- **Tense systems depend on arc maturity** — `OPEN`: passé composé /
  imparfait presuppose a *recount/describe-past* capability that has
  **no entry point in any current arc**; futur proche extends γ
  (plans/movement) and α (intentions). Recording this dependency is not
  placing a tense.
- **Arc questions that must be answered before any L18–L24 sequencing**
  — `SUPPORTED`: the §18 cards (model, count, membership, structure,
  first expansion). Sequencing before them re-creates plan-inheritance.
- **Rejected**: composing arcs from the demoted 12-unit CEFR-topic map
  (`REJECTED` — FQ-C2 demotion; PB-016).

## 14. Risks and failure modes

- **R1 — Arc-as-topic drift**: function names decay into vocabulary
  themes (δ → "conversation words"). Mitigation: the §5 rejection list +
  Model-B durability tests.
- **R2 — Arc-as-mastery drift**: arcs quietly become evidence ladders or
  checkpoint scores. Mitigation: property 7; evidence-boundary pointer
  field; PB-025 (no visible mastery %).
- **R3 — δ over-breadth**: "interaction management" absorbs everything.
  Mitigation: hold to open/steer/repair/close; questioning *mechanics*
  live in lessons, the *capability* in the arc.
- **R4 — Maturity overstatement**: the spec layer says repair is owned;
  the runtime says it isn't. Arc records must carry honest maturity
  (that's why the field exists).
- **R5 — Plan inheritance**: treating Option C / L18-preview as
  arc-derived. This discovery explicitly labels it historically assumed.
- **R6 — Checkpoint vacuum**: "capability checkpoints" are undefined;
  someone will eventually want arcs to *be* checkpoints. They are not —
  checkpoints are a future Journey-layer design that will *consume* arcs.
- **R7 — Bureaucracy**: more than ~5 arcs or more than the §11 fields
  makes the structure unmaintainable at the current corpus size.

## 15. Ownership and routing

| Question | Route |
|---|---|
| May an Arc be composed now? | **No** — Charter §14 stop condition until the §18 founder cards are answered |
| Who composes Arcs? | Curriculum (Charter §4, CC-003) |
| Are Arcs learner-visible? | No — PB-014 (Canonical); learner sees Journeys, lessons, checkpoints |
| What do Journey names look like? | Journey layer — Product/Brand (~7 journeys planning band, PB-055); not this discovery |
| What does an attempt inside an arc *prove*? | Mastery & Evidence Bible — never the arc record |
| How is arc material counted? | Item-Counting Contract v1.0 (arcs are not counting units) |
| Does an arc change lesson payload rules? | Never — Content Bible |
| Post-L17 sequencing? | Still open (PRJ-001 narrowed scope); arcs are its prerequisite, not its answer |

## 16. Settled constraints (must not be re-decided)

Journey → Capability Arc → Lesson hierarchy; Arcs internal; capability-
not-topic (PB-013/014/016) · learner sees Journeys/lessons/checkpoints ·
Journey Reinforcement exists, outcome-based, algorithm deferred
(PB-022…024) · L0–L17 tiered spine and its purposes (Charter §5) ·
integration rhythm contract (FQ-C4) · active-new counting (IC-002/003) ·
the 12-unit map and Core 150 are historical/reference (FQ-C2) · repair
pair's content home = L1 redesign (FQ-C8) · L18 preview is provisional,
ownership open (gate 4) · Reading action rule (Content Bible §11) ·
no social evidence (PRJ-009) · ~120–180 lessons / ~7 journeys / ~3,000
words remain planning bands.

## 17. Genuinely open decisions

1. The Arc model (function / system / journey-phase / hybrid degree).
2. The initial Arc count (5 proposed vs a 3-arc merge).
3. Multi-arc lesson membership as a rule.
4. Arc naming and record conventions (internal; provisional → stable ID
   path is Bible work).
5. The minimum Arc record structure (§11's nine fields).
6. Which arc receives the first post-L17 expansion (maturity-led vs
   plan-inherited).
7. (Downstream, recorded only) checkpoint definition; Journey
   composition; recount-capability entry for past tenses; listening
   ramp (PRJ-018).

## 18. Founder decision cards

Five cards (target 4–6). None asks for lesson numbers.

**FQ-A1 — Arc model.** `BLOCKING FOR ARC COMPOSITION`
*Conflict:* PB defines only the hierarchy; three incompatible modeling
instincts exist in the corpus (function ladder, system durability,
journey narrative). *Example:* L11's own can-do line spans two functions
("ask for help" / "ask if I can") — a function model must handle overlap;
a phase model would file it under "stabilize the exchange" and hide the
permission dependency. *Recommendation:* **function arcs with
capability-system durability tests**; journey-phase labels reserved for
the Journey layer. *Alternative:* pure Model B (durable but author-
hostile). *Consequence:* fixes the vocabulary every later Curriculum
document uses. *Founder because:* it interprets Canonical PB-013/016 for
all future composition.

**FQ-A2 — Initial Arc count.** `BLOCKING FOR ARC COMPOSITION`
*Conflict:* ~9–10 implicit threads vs the lean-structure requirement.
*Example:* obligation (L15) as its own arc fails the multi-lesson test;
merged into α it strengthens an existing chain. *Recommendation:* **the
five arcs of §12**. *Alternative:* three (γ→α, ε→δ merges) — leaner but
hides the two clearest post-L17 gaps. *Consequence:* determines how
visible the repair and comprehension gaps stay. *Founder because:* Arc
composition is expressly reserved (Charter §4).

**FQ-A3 — Multi-arc membership.** `BLOCKING FOR ARC COMPOSITION`
*Conflict:* every integration lesson serves several threads; a
primary-arc-only rule would misfile L6/L10/L13/L16 and split L11/L17
artificially. *Example:* L17 extends β (feelings) *and* δ (open/close a
moment) per its own spec. *Recommendation:* **one lesson may contribute
to multiple arcs**, with roles (entry/extension/integration) per arc.
*Alternative:* primary-arc-only with cross-references (simpler queries,
false structure). *Consequence:* shapes the arc-record format and every
future trace. *Founder because:* it is a composition rule, not a
derivable fact.

**FQ-A4 — Arc record structure and naming.** `REQUIRED BEFORE FIRST
COMPOSITION`
*Conflict:* nothing exists; the failure modes are bureaucracy (R7) and
mastery drift (R2). *Example:* adding a "maturity %" field would
instantly violate PB-025's spirit. *Recommendation:* ratify §11's
nine-field record; internal working-English names; provisional IDs until
the Curriculum Bible allocates stable ones; no learner-facing surface
(PB-014 already settles visibility). *Alternative:* fuller records with
per-lesson inventories (rejected as unmaintainable). *Consequence:*
bounds all future arc paperwork. *Founder because:* it sets the durable
convention.

**FQ-A5 — First post-L17 expansion arc.** `BLOCKING FOR ANY L18+
PLANNING` — *decision, not sequencing*
*Conflict:* maturity analysis points at δ (repair — unshipped pair,
four holes, L19's planned repair role) and ε (one seed, no listening);
the inherited Option-C plan points at the L18 futur-proche preview
(γ/α-adjacent), which is historically assumed and gate-4-open.
*Example:* L13 already assumes repair the runtime never shipped — the
spine's one recorded capability debt. *Recommendation:* **δ (repair)
receives the first expansion focus**, consistent with FQ-C8's L1-redesign
home; the futur-proche preview question stays open at gate 4 and is not
displaced by this card. *Alternative:* keep Option C's L18 preview as
the next step (plan continuity over maturity). *Consequence:* orients —
without numbering — the first post-L17 authoring horizon. *Founder
because:* it chooses between two legitimately sourced priorities.

## 19. Recommended smallest next action

Founder review of FQ-A1…A5. After answers: compose the first Arc records
(a lean, reviewed Curriculum document under the Charter — likely the next
PRJ-001 increment), then revisit post-L17 sequencing with arcs in hand.
No Arc Contract, no Bible, no L18+ sequence, and no checkpoint design
until then. L17's cluster classification and the L1 redesign remain their
own tracks.

## 20. Source map

Canonical: `CAIRN_PRODUCT_BRAIN_v1.0.md` §2/§5–§7/§12 + DECISION_REGISTER
PB-013…026/032/045/055 + OPEN_QUESTIONS · `CURRICULUM_CHARTER_v1.0.md`
§2–§5 (incl. the ratified L0–L17 purposes), §6, §13–§16, CC-003/008 ·
`CONTENT_BIBLE_v1.0.md` (§5–§6, §11, §16) ·
`MASTERY_EVIDENCE_BIBLE_v1.0.md` §26–§28 ·
`PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md` IC-002/003 · Canon Map ·
Authority Spec · Coverage & Gaps · Project Register (PRJ-001/009/018/029)
· Source of Truth Map · docs/README.
Fragments: all `docs/syllabus/` L01–L17 specs (`Main can-do outcome`
lines) + gate reviews + template + archetypes ·
`04_SYLLABUS/`: Syllabus Design Rules · Level and Band Map (milestones;
commercial-depth) · Grammar/Vocabulary Progression (owned-forms ladder;
intent-function principle; four functional holes) · Integration Lesson
Logic · L0 note · L18-L24 Roadmap · `05_MATRICES/Syllabus Coverage
Matrix` (Fonksiyon grid) · `docs/architecture/l0-l24-founder-build-matrix-v0.md`
(Primary learner outcome column) · `docs/CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md`
§38/§60.1 (demoted reference) · Lesson Flow Canon.
Runtime (Axis B): `lemot-app/content/lessons/v1/*` ·
`content/learning-engine/lessons/*.contract.ts` (goal.canDo/notGoal ×8)
· `constants/journey.ts` (JOURNEY_PHASES, legacy-calibrated) · Home L6
cap. Prior discoveries: `CURRICULUM_LAYER_DISCOVERY_v0.1.md` (spine,
CUR-012, FQ-C2/C8) · `PRJ_015_ITEM_COUNTING_DISCOVERY_v0.1.md`.

---

*End of Capability Arcs Discovery v0.1. No Arc model is ratified; no
post-L17 sequence, tense placement, checkpoint definition, or
implementation is authorized. PRJ-001 remains OPEN; PRJ-015 remains
CANONICAL; Arc composition remains a Charter §14 stop condition until
the §18 cards are answered.*
