---
title: Cairn Acquisition Batch L1–L6
version: 0.1
status: Draft normalization — founder decisions pending
authority: None. Proposes a normalized acquisition map for the shipped L1–L6 foundation slice; changes no lesson, runtime, registry, or mastery state.
owner: Curriculum
date: 2026-07-30
implementation_authority: none
prj_status: OPEN
source_contract: PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md
global_skeleton: ACQUISITION_SKELETON_L0_L24_v0.1.md
---

# Cairn Acquisition Batch L1–L6 v0.1

## 1. Executive verdict

1. **The shipped foundation is drastically leaner than every prior
   accounting suggested.** Under the Item-Counting Contract's unit
   (new learner-facing active production **demands**), the six visible
   lessons carry approximately **1 + 1 + 3 + 2 + 0–1 + 0(+1 tension)
   ≈ 7–9 demands total** — every lesson within the 1–3 normal band,
   most far below it. The historical spec layer intended ~49 active
   item-IDs; the audit's per-lesson "active-new" figures counted IDs.
   Nobody had yet counted demands. This document does.
2. **The batch's real risk is underload and payload thinness, not
   overload.** ~53% of the 75 screens require no learner output;
   12 of 13 graded productions supply every needed piece as a required
   chip; each engine carries ~1.5 payload items ("strong machines,
   little to say").
3. **Three units are owed production that was never demanded:**
   `merci` (learningItem since L1, first required production L6),
   `oui` (registered active, never produced — rehabilitation locked in
   Payload Economy §4.2, unwired), and the repair pair (absent
   entirely; FQ-C8 home = L1 redesign). One unit is taught backwards:
   the learner produces `ce n'est pas` (L3) before affirmative `c'est`
   is ever taught.
4. **L6 carries the batch's one Contract tension:** an integration
   lesson (IC-003: 0 active-new) that introduces `au revoir` and
   demands the close ritual `Merci, au revoir.` in its open weave —
   the only scaffold-faded production in the batch, on material never
   demanded before. Proposed classification (§11) plus a founder card;
   not silently reconciled.
5. **Nothing here re-litigates the freeze.** L1–L6 are founder-locked
   and frozen: this is an accounting map of what IS, kept strictly
   separate from the locked-but-unshipped redesign layer of what is
   INTENDED.

## 2. Scope and boundaries

- Covers L1–L6 in detail, with L0 as a context boundary (§5).
- Ratifies nothing; edits no lesson, spec, registry, runtime, Arc,
  validator, or Canonical file. PRJ-001 OPEN; PRJ-015 CANONICAL.
- Counting semantics per DOC-062; evidence semantics stay with the
  Mastery & Evidence Bible; nothing here is a mastery state or
  threshold.
- All classifications below are **PROPOSED NORMALIZATION** unless
  marked SOURCE-CONFIRMED, RUNTIME/SPEC CONFLICT, FOUNDER DECISION
  REQUIRED, or DEFERRED. No lesson is declared compliant merely
  because a proposal exists.

## 3. Classification method

Two axes per the global skeleton §3:

- **Role** (primary, one per unit): Active · Supported · Recognition ·
  Ghost/preview · Non-acquisition.
- **Novelty** (separate): new · recycled · promoted · demoted ·
  unchanged · not applicable.

Shorthand: `A-N` `A-R` `S-N` `S-R` `R-N` `R-R` `G-N` `NA-N` `—`.
**Documentation shorthand only — not runtime statuses, not schema,
not validator vocabulary, not Mastery states.**

Demand-counting rules applied (DOC-062): count **demands, not IDs**;
linked frame/chunk/word clusters that surface as one production count
once; normal 1–3; a fourth needs a cognitive-load rationale;
integrations 0; promotion into active is a new demand. "Produced"
means a graded production (weave `exact-or-alternative`); model-answer
-only screens are anchors (non-acquisition), and choose-among-options
fills are recognition-level operations, not production.

## 4. Current runtime versus intended design

Two founder-accepted layers exist and are never conflated below:

| Layer | Content | Status |
|---|---|---|
| **Runtime (Axis B)** | `lesson-001…006.ts` as shipped: the narrow slice inventoried in §6–§11 | Frozen, device-verified on its own baseline |
| **Intended design** | Full L01–L06 PILOT specs (~35–42 exposures each) + the founder-locked Payload Economy v0 enrichment table + the 31+3–4-chip L1 redesign pool | Locked at canon level, **unshipped**; smoke-bearing; separate track |

The specs authorize nothing ("no code, content, flag, or runtime
change" banner on all six). The Payload Economy enrichment (rescue
kit, un thé, fatigué, oui-as-answer, soif, une idée, une table…) is
**not on this branch** — verified by inventory: zero occurrences in
runtime files or registry. Where the layers disagree, both are shown.

## 5. L0 context boundary

L0 is a **first-use bridge, not Lesson 1** (ADR-0006). It has no goal
screen, is hidden from Home, and creates **no formal acquisition
ownership**. The learner produces the request line once with all
pieces supplied — classified here as **preview exposure** of the L1
demand set, not carry-in ownership.

**Accounting dispute recorded (RUNTIME/SPEC CONFLICT):** the L1 spec
counts bonjour / je voudrais / un café / s'il vous plaît as "Active —
recycled from L0"; vault canon explicitly rejects L0-carryover
classification. **Proposed normalization: the bridge-blind reading** —
L0 exposure is preview; **L1 issues the batch's first formal
demands.** (Founder card FQ-B1.)

---

## 6. L1 normalization — "Survival Kit"

### A. Identity

- **Learner job (runtime):** "Greet, ask for something politely, and
  thank." 11 screens; archetype chunk-natural-speech.
- **Spec intent:** greet · request · **recover** · **leave politely**
  (4 clauses; 2 unshipped). Full spec wanted 9 active-new IDs.
- **Implementation reality:** five-item inventory — `bonjour`,
  `je voudrais`, `un café`, `s'il vous plaît`, `merci`. No rescue, no
  close, no register variation. "The Survival Kit has no survival in
  it" (audit).
- **Redesign layer:** open L1 redesign (31+3–4 chips; final
  classification OPEN); repair pair home per FQ-C8; SURVIVAL_FORMULAS
  class locked, unshipped. Separate track.

### B. Active-new production demands

| Demand | Constituent items | Why one demand | Novelty | Source | Confidence |
|---|---|---|---|---|---|
| **The polite café request line** — `Bonjour, je voudrais un café(, s'il vous plaît).` | `chunk-bonjour` + `chunk-je-voudrais` + `noun-cafe` (+ optional softener) | One linked chunk-cluster producing one sentence family; the greeting is never demanded apart from the request line | **new** (L0 = preview) | weaves s04/s06 (both graded, required chips) | PROPOSED NORMALIZATION |

**Proposed count: 1** (band 1–3 ✓). Candidate alternative sets, not
ratified: (a) split greeting ritual and request frame → 2 demands
(defensible if the greeting is read as an independent social demand);
(b) audit-style carryover reading → "1 (merci)" — **rejected as
factually wrong under the Contract**: runtime never demands `merci`
production (see D/H). FOUNDER DECISION REQUIRED (card FQ-B1).

### C. Supported material

- `s'il vous plaît` — **S-N.** Scaffold: optional (never `required`)
  chip in one graded weave + say-it chips. Reasoning for not-active:
  no production slot ever requires it; reasoning for not-recognition:
  it is offered for real optional production. Expected to promote in
  the L1 redesign (destination: L1 redesign, provisional). FOUNDER
  DECISION REQUIRED (card FQ-B3).
- `merci` — **S-N (borderline R-N).** Met (s07), optional chip on the
  ungraded model-answer screen only; never graded. Destination of its
  promotion: currently **L6 open weave** — flagged as
  demand-before-foundation (§11.I).

### D. Recognition material

- Register contrast `voudrais` vs `veux` — **R-N** via trap choice
  (s03) with register-explaining feedback (genuine discrimination, not
  incidental).
- `je suis` cannot-request contrast — **R-N** (trap feedback names the
  meaning boundary).

### E. Ghost / preview material

- `Je veux un café.` — G-N. Why now: soft-request contrast. Future
  destination: **unresolved** (no register lesson ratified) — flagged.
- Natural-alternative orderings (`Bonjour, un café s'il vous plaît.`)
  — G-N; destination: natural-variation layer (Content), unresolved.

### F. Recycled material

- L0 preview exposure re-demanded formally (per §5 this is **not**
  recycling; recorded to prevent double-counting). No true recycled
  material — L1 is the formal start.

### G. Non-acquisition material

- Meta: lesson-goal card. Culture: survival-kit-is-enough culture-bite.
- Traps: `veux` (register), `suis` (meaning), `bonjour` (slot).
- Model-answer anchor: s08 say-it (ungraded).
- **Absent though required by the stable purpose:** the repair pair —
  RUNTIME/SPEC CONFLICT; not counted anywhere; home = L1 redesign
  (FQ-C8/CC-007).

### H. Ownership after L1

- **Can produce (chip-scaffolded):** the polite request line.
- **With support:** softener placement; merci (offered, ungraded).
- **Recognizes:** register softness of voudrais.
- **Previewed only:** je veux; alternative orderings.
- **Not entitled to be assumed:** any recovery, any polite close
  (`au revoir` unknown), unsupported production of anything.

### I. Carry-out

- L2 recycles `bonjour` (chip, ungraded). L5 re-produces the request
  frame (A-R). L6 recycles greeting + demands `merci` production
  **without prior demand** — insufficient-foundation flag. L8+ specs
  recycle "repair patterns" that L1 never shipped — the route defect
  (CC-006).

### J. Conflicts and confidence

- Five-item slice: SOURCE-CONFIRMED. Demand set: PROPOSED
  NORMALIZATION + FOUNDER DECISION REQUIRED. Repair absence:
  RUNTIME/SPEC CONFLICT (resolution path locked, unshipped). Can-do
  clause shortfall (recover/leave): SOURCE-CONFIRMED.

---

## 7. L2 normalization — "Être" (shipped as a location seed)

### A. Identity

- **Learner job (runtime):** "Say I am here, in French." 10 screens.
- **Spec intent:** identity — "say who or what I am, describe another
  person, use c'est to react" (10 active-new IDs incl. professions,
  states, the c'est engine).
- **Implementation reality:** `je suis` + `ici`, one completion, no
  c'est, no third person, no identity nouns. Seven spec-tier items sit
  **dormant** in the registry (R4 list).
- **Redesign layer:** Payload Economy adds `fatigué(e)` supported +
  `là` ghost (unshipped).

### B. Active-new production demands

| Demand | Constituent items | Why one demand | Novelty | Source | Confidence |
|---|---|---|---|---|---|
| **The placement statement** — `Je suis ici.` | `chunk-je-suis` + `word-ici` (frame + its only completion) | Engine and sole completion surface as one sentence; producing it twice (s04/s05) in different contexts is one demand exercised twice | **new** | weaves s04/s05 (graded, required chips) | PROPOSED NORMALIZATION |

**Proposed count: 1** (alternative: 2 if engine and completion are
counted apart — rejected because the completion never varies; there is
no slot operation). Note the engine is **not** exercised as an engine:
one fixed sentence.

### C. Supported material

- `Bonjour, je suis ici.` extension — **S-R** (met + modelled,
  ungraded; bonjour chip optional). Expected recombination home: L6
  (landed: L6 s03 graded).

### D. Recognition material

- Engine-slot fill (`Je ___ ici.` → suis, vs voudrais/bonjour) — R-N:
  first verb-slot discrimination.

### E. Ghost / preview material

- `Je suis prêt.` (meta-insight example) — **G-N with unresolved
  destination**: the shape-extension ("how you are") it previews has
  no ratified landing lesson; the matching registry items are dormant.
  Flagged as an **orphaned ghost** (§15).

### F. Recycled material

- `bonjour` — S-R (chip on ungraded screens only).

### G. Non-acquisition material

- Meta: goal card; "shape noticed" reflection insight (explicitly
  declared meta) — the ghost leaks from here. Grammar nugget: "je suis
  = I am." Traps: voudrais (backward-reference), bonjour.
- Model-answer anchor: s07.

### H. Ownership after L2

- **Can produce:** `Je suis ici.` (chip-scaffolded).
- **With support:** greeting + placement combined.
- **Recognizes:** which engine fits a placement slot.
- **Previewed:** state extension (prêt).
- **Not assumed:** identity statements, c'est, any other completion,
  any other person form.

### J. Conflicts and confidence

- Narrow seed: SOURCE-CONFIRMED. Identity layer unshipped + 7 dormant
  registry items: SOURCE-CONFIRMED (RUNTIME/SPEC CONFLICT with spec
  can-do). Expansion decision: FOUNDER DECISION REQUIRED (card FQ-B4).
- **Arc note (no edit):** shipped L2 evidence supports a *location*
  statement, not identity — feeds §18's ARC-β recheck.

---

## 8. L3 normalization — "Non"

### A. Identity

- **Learner job (runtime):** "Say no, and say what is not true, using
  ne … pas." 12 screens.
- **Spec intent:** no · what I'm not · **ask yes/no** · **choose
  tu/vous** · **refuse politely** (5 clauses; 3 unshipped). Spec
  wanted 10 active-new IDs incl. oui, ça, tu.
- **Implementation reality:** negation via two pre-fused frozen chunks
  (PROTECTED_CHUNKS `je ne suis pas`, `ce n'est pas`); `non`; `non
  merci` chosen only. No tu/vous, no ça, no si, no intonation-question
  production.

### B. Active-new production demands

| Demand | Constituent items | Why one demand | Novelty | Source | Confidence |
|---|---|---|---|---|---|
| **Negated being-statement** — `Je ne suis pas ici.` | `chunk-je-ne-suis-pas` (+ recycled ici) | One frozen negative frame over the owned L2 sentence | **new** (frame), transform of recycled base | weave s06 | PROPOSED NORMALIZATION |
| **Negated pointing-statement** — `Ce n'est pas ici.` | `chunk-ce-n-est-pas` (+ ici) | Second, distinct frozen frame; different subject shape | **new** | weave s07 | PROPOSED NORMALIZATION |
| **Answer + negation** — `Non, je ne suis pas ici.` | `chunk-non` prepended to demand 1 | The `non` prepend is the first answer-word production; bundled on an owned frame | **new** (non), recycled frame | weave s08 | PROPOSED NORMALIZATION |

**Proposed count: 3** (top of the normal band — L3 is the batch's
densest lesson; no fourth demand, no rationale needed). Alternative:
2 (fold demand 3 into demand 1 as the same frame with an answer
particle) — defensible; kept at 3 because the answer-word production
is a genuinely new communicative act.

### C. Supported material

- `non merci` — **S-N by choice only**: selected in a social fill,
  recapped, **never typed**. Promotion destination: none ratified
  (L6 re-chooses it; never produced anywhere in the batch). Flagged.

### D. Recognition material

- `ne…pas` as a system — **R-N**: explained (sandwich insight) and
  slot-recognized (s02 fill with ne/pas pre-printed; learner supplies
  only the verb). **Never assembled.** Chunk-first by design
  (SOURCE-CONFIRMED); future promotion destination: composed
  `je ne peux pas` at L11 (spec layer).
- oui-vs-non contrast — R-N (insight + the s05 choice where `Oui
  merci` is the trap).

### E. Ghost / preview material

- `Oui.` — **G-N functionally, though registered active** (see J).
- `C'est ici.` — **G-N, inverted order**: the affirmative engine is
  previewed only as insight text while its negation is produced.
  Destination: c'est surfaces supported ~L8 (spec layer) — provisional.
- `Non, merci.` comma form — G-N, insight only.

### F. Recycled material

- `Je suis ici.` base — **A-R** (transformed under demand 1).
- `ici` — A-R inside all three demands.

### G. Non-acquisition material

- Meta: goal card; sandwich metaphor. Grammar nugget item
  `grammar-ne-pas-sandwich` (concept item, non-producible).
- Traps: voudrais, bonjour (slot); `Oui merci` + bare `Merci`
  (pragmatics — "merci alone can sound like yes please").
- Model-answer anchor: s09.

### H. Ownership after L3

- **Can produce:** both frozen negative frames on the ici base; `non`
  as an answer prefix.
- **With support:** polite refusal **by selection only**.
- **Recognizes:** the ne…pas sandwich shape; oui-vs-non meaning.
- **Previewed:** affirmative c'est; oui as an answer.
- **Not assumed:** negation of anything but the two frames; yes/no
  asking; tu/vous; producing oui, si, or non merci.

### I. Carry-out

- L4 pivots the `je suis` base into the engine contrast. L6 recycles
  `je ne suis pas` and `non merci` **as distractor/choice only** — the
  L3 core transform is exercised in L6 solely as a wrong answer.
  L11 (spec) composes `je ne peux pas` from the recognized sandwich.
  L12–L13 (spec) let the learner **ask** yes/no — while `oui` remains
  unproducible (the oui paradox).

### J. Conflicts and confidence

- **`oui` — RUNTIME/SPEC CONFLICT + FOUNDER DECISION REQUIRED (card
  FQ-B5):** registry status `active`; runtime: insight text + trap
  only, never produced. Rehabilitation as an answer word is locked
  (Payload Economy §4.2) with wrong-slot traps preserved — but
  **unwired**. Proposed interim normalization: **R-N with a locked
  pending promotion** (recorded, not enacted).
- tu/vous, ça, si, refusal production: SOURCE-CONFIRMED unshipped
  (dormant registry items); destination unresolved.

---

## 9. L4 normalization — "J'ai"

### A. Identity

- **Learner job (runtime):** "Say how I feel and what I have, using
  j'ai." 11 screens.
- **Spec intent:** hunger, thirst, need — avoir-states + `j'ai besoin
  de` (8 active-new IDs after deliberate lightening).
- **Implementation reality:** `j'ai` + `faim` + `une question` + the
  être/avoir discrimination. No soif, peur, besoin, possession layer,
  or negated avoir. The spec's headline contrast sentence (`Je suis
  fatigué, mais j'ai faim.`) is unshippable — `fatigué` exists nowhere.
- **Registry history (facts, not counts):** `word-ici` and `noun-faim`
  gained registry identity only in the R3 hygiene pass (`9c799d9`),
  having been produced as identity-less chips since L2/L4; no learner
  -visible change. `noun-idee` remains dormant (earmarked by the
  unshipped enrichment).

### B. Active-new production demands

| Demand | Constituent items | Why one demand | Novelty | Source | Confidence |
|---|---|---|---|---|---|
| **State sentence** — `J'ai faim.` | `chunk-j-ai` + `noun-faim` (via `chunk-j-ai-faim`) | Engine + first state completion as one sentence | **new** | weave s05 | PROPOSED NORMALIZATION |
| **Ask-having sentence** — `Bonjour, j'ai une question.` | `chunk-j-ai` + `noun-question` (via `chunk-j-ai-une-question`) + recycled bonjour | Second completion type (thing-to-ask), distinct communicative act | **new** (completion), engine recycled within lesson | weave s06 | PROPOSED NORMALIZATION |

**Proposed count: 2** (band ✓). The two completions are separate
demands because they are different acts (state vs possession-to-ask),
not slot variants of one family.

### C. Supported material

- None beyond the demand constituents; `faim`/`une question` are
  cluster members inside the demands, not separate supported targets
  (prevents ID-inflation).

### D. Recognition material

- **être-vs-avoir discrimination** — **R-N, the batch's only
  engine-choice operation**: s02 fill (`___ faim.` with `Je suis`
  trap) + s03b three-way meaning choice (location/feeling/have-to-ask).
  Meaningful interpretation demand; promotion destination: the spec
  contrast sentence — blocked on the unshipped state layer.

### E. Ghost / preview material

- **None rendered.** The registry's contrast example (`Je suis
  fatigué…`) lives in a field no runtime surface displays — recorded
  as *invisible*, not ghost. (Prevents phantom-ghost counting.)

### F. Recycled material

- `bonjour` — **A-R** (first time required inside a graded weave since
  L1: s06 requires it). `je suis ici` — R-R (contrast option).

### G. Non-acquisition material

- Meta: goal card; contrast insight (`micro-je-suis-vs-j-ai` concept
  item). **Sound/writing:** elision insight `je + ai → j'ai`
  (`sound-elision`) — the batch's only sound note (NA-N).
- Traps: `Je suis` (core contrast), `Je voudrais`; sentence-level
  distractors on s03b.
- Model-answer anchor: s07.

### H. Ownership after L4

- **Can produce:** `J'ai faim.`; `Bonjour, j'ai une question.`
- **Recognizes:** which engine a state/possession slot needs; the
  elision shape.
- **Previewed:** nothing (no rendered ghosts).
- **Not assumed:** soif, peur, besoin, possession of objects, negated
  avoir, any paradigm form, the contrast sentence.

### I. Carry-out

- L5 re-produces `J'ai une question.` under the package lens (A-R).
  L6 recycles `j'ai une question` (graded) and `j'ai faim`
  (distractor). Spec-layer L9 (`j'ai besoin de` recycled) and L17
  (state pool) assume the **unshipped** broader layer — foundation
  flags for Batch 2/3.

### J. Conflicts and confidence

- Narrow slice: SOURCE-CONFIRMED. Contrast-sentence impossibility +
  state/feeling hole (#4): SOURCE-CONFIRMED (RUNTIME/SPEC CONFLICT).
  Expansion (soif, besoin, idée): locked in Payload Economy,
  unshipped — FOUNDER DECISION REQUIRED only for sequencing/priority
  (card FQ-B6), not for content (already founder-locked).

---

## 10. L5 normalization — "Un, une"

### A. Identity

- **Learner job (runtime):** "Ask for and name objects with the right
  little word in front" — the only runtime can-do matching its spec
  verbatim. 11 screens.
- **Spec intent:** un/une active + le/la supported + pas-de bridge
  (8 active-new IDs).
- **Implementation reality:** two packages (`un café`, `une question`),
  package-concept nugget, binary un/une fills, package-choice fill,
  and two productions **of sentences already produced in L0–L4**.
  No le/la, no table/baguette, no pas-de bridge.

### B. Active-new production demands

**Proposed count: 0** — with one honest alternative of 1.

| Candidate demand | Analysis | Verdict |
|---|---|---|
| `Je voudrais un café.` (s05) | Sentence produced since L0/L1; package now supplied as a single chip; nothing new is demanded of the learner's production | **A-R**, not A-N |
| `J'ai une question.` (s06) | Produced in L4 (with bonjour); same chips | **A-R** |
| The package-selection operation (un vs une) | Exercised only in fills: binary slot choices + one package-vs-package choice. Recognition-level discrimination; in productions the article is never separately selectable | **R-N operation**, not a production demand |

**Answer to the required question:** L5 has **no new lexical
production demand**; it has **a new recognition-level
package-selection operation**; and it **promotes package identity**
on already-produced sentences (novelty = *promoted* at the
understanding level, *recycled* at the production level). Whether that
promotion should count as a production demand under IC promotion rules
is genuinely arguable — **FOUNDER DECISION REQUIRED (card FQ-B7)**:
0 (pure promotion/recognition lesson) vs 1 ("package-qualified
request" as a re-issued demand).

### C. Supported material

- Packages as whole chips in both weaves — the scaffold that keeps the
  operation recognition-level. S-R.

### D. Recognition material

- un-vs-une binary slot fills (2) — R-N.
- Package-vs-package choice (incl. bare-noun and wrong-package
  distractors) — R-N; the batch's cleanest concept-recognition demand.

### E. Ghost / preview material

- `Un café, s'il vous plaît.` natural alternative — G-N; destination:
  natural-variation layer, unresolved.
- Broader article system (le/la, plural, partitive) — **not present
  even as ghost**; deferred at spec level (destination: future article
  lessons, provisional).

### F. Recycled material

- `je voudrais` frame — A-R. `j'ai` frame — A-R. `noun-cafe` /
  `noun-question` — R-R (subsumed inside packages; flagged §15).

### G. Non-acquisition material

- Meta: goal card; package nugget (`grammar-un-une-package`, concept
  item). Traps: anti-rule feedback copy (deliberately non-taxonomic),
  bare `question`, `un question`.
- Model-answer anchor: s07.

### H. Ownership after L5

- **Can produce:** both request/ask sentences (unchanged from L4).
- **Recognizes:** that nouns travel as packages; which package fits.
- **Previewed:** softener-attached variant.
- **Not assumed:** productive article selection, gender rule, le/la,
  any new noun.

### I. Carry-out

- L6 uses `une question` in its graded weave; the café package appears
  only as someone else's offer (ghost). Spec-layer L5→later `pas de`
  bridge: **unshipped on both ends** — the batch's cleanest designed
  handoff never landed.

### J. Conflicts and confidence

- Package-first resolution over article items: SOURCE-CONFIRMED
  (recorded decision Q1 in the round-1 content plan).
- Demand count 0-vs-1: FOUNDER DECISION REQUIRED.

---

## 11. L6 integration normalization — "Un petit moment"

### A. Identity

- **Learner job (runtime):** "Carry a whole small French moment:
  greet, say where you are, ask one thing, thank, and close."
  12 screens; archetype review-integration; phase summit-gate.
- **Spec intent:** human-context integration ("explain myself as a
  person, beyond the café") with `aide`/`comprendre` — **entirely
  unshipped**; the shipped scene is a counter-transaction shape, the
  exact café-centricity the spec was written to break.
  SOURCE-CONFIRMED contradiction, blocked behind the freeze.
- **Implementation reality:** recombination of the L1–L5 pool + one
  new chunk `au revoir`, with the batch's only open weave (s08) and
  its only zero-scaffold screen (s09, ungraded).

### B. Active-new production demands

**Required by IC-003: 0.** Proposed normalization achieves 0 — but
only by classifying the close ritual honestly and flagging the
tension rather than hiding it:

| Candidate | Analysis | Proposed classification |
|---|---|---|
| `Bonjour, je suis ici.` (s03) · `J'ai une question.` (s05) | Owned demands re-issued with required chips | **A-R** (integration recombination ✓) |
| **`Merci, au revoir.` (s08 open weave)** | `merci`: first-ever graded production (never demanded L1–L5); `au revoir`: met two screens earlier, new item. Chips are **visible as hints but not required** — the scaffold is present, ownership is not | **S-N (scaffold-visible close ritual)** — *not* counted as active-new, keeping L6 at 0 — **with a recorded tension**: if the open weave is read as a true unscaffolded production demand, L6 violates integration-0 |
| Multi-sentence moment (s07/s09) | Model-answer-only, ungraded | NA (anchor) |

**RUNTIME/SPEC CONFLICT + FOUNDER DECISION REQUIRED (card FQ-B8):**
whether the close ritual is supported-new (this proposal) or an
active-new demand that breaches IC-003 in the shipped runtime. This
document does **not** declare L6 compliant; it proposes the
classification and surfaces the breach reading.

### C. Supported material

- Close ritual `Merci, au revoir.` — S-N per above; promotion
  destination: unresolved (no later lesson re-demands it before L7's
  departure doorway recycles the closing *function*).

### D. Recognition material

- Right-place micro-choice (`Je suis ici.` vs negation vs j'ai faim)
  — R-R (recycled discrimination).
- Decline-offer micro-choice (`Non merci.`) — R-R (the L3 chain: still
  never typed).

### E. Ghost / preview material

- `un café` as someone else's offer (English prompt text; declined) —
  G-R; deliberate café demotion. `J'ai faim.` / `Je ne suis pas ici.`
  as distractors only — the L3/L4 core material appears in L6 **solely
  as wrong answers** (flagged §15).

### F. Recycled material

- A-R: `bonjour`, `je suis ici`, `j'ai une question`, `une question`.
- R-R: `je ne suis pas`, `non merci`, `j'ai faim`.
- **Legitimately recombined:** greeting + placement + ask + (new)
  close — all but the close are genuine recombinations of owned
  demands. The close is new material inside an integration (the
  tension above).

### G. Non-acquisition material

- Meta: goal card ("no new rule"). Culture: bonjour→au revoir
  culture-bite (announces `au revoir` before it is met — sequencing
  note). Model-answer anchors: s07 and s09 (answer-banded, ungraded);
  s09 is the batch's only zero-chip screen.

### H. Ownership after L6

- **Can produce:** greeting+placement, the ask, both negative frames
  (unexercised here productively), the request line, and — newly, with
  visible hints — the close ritual.
- **With support:** the full five-beat moment (chips on s07; none on
  s09, ungraded).
- **Recognizes:** which owned sentence fits a social slot.
- **Not assumed:** unscaffolded multi-sentence production; `non merci`
  production; negation production in social context; anything from the
  unshipped human-context spec (aide, comprendre, states).

### I. Assumed-without-established-foundation (explicit list)

1. `merci` production (first demand ever, inside the integration).
2. `au revoir` production one screen after first exposure.
3. Multi-sentence sequencing (`Bonjour. Je suis ici. …`) — first
   demanded here, only ungraded.
4. `non merci` recognition chain (L3 choice → L6 choice; never
   produced).
5. `je suis ici` pragmatic extension (literal location → "I have
   arrived / I'm here for it").
6. Negation exercised only as a distractor.

**Integration vs mastery proof:** L6 is an integration *opportunity*;
nothing in it is mastery evidence (Mastery Bible owns proof
semantics), and its "summit-gate" phase label is display language,
not an assessment claim.

### J. Conflicts and confidence

- 0-active-new via S-N close: PROPOSED NORMALIZATION + FOUNDER
  DECISION REQUIRED. Human-context spec unshipped: SOURCE-CONFIRMED.
  Café-shape reversal: SOURCE-CONFIRMED.

---

## 12. Cross-batch acquisition matrix

Pedagogically meaningful units only (traps/UI excluded). Where
representation IDs split one concept, the unit appears once with
linked IDs noted.

| Unit / capability | L1 | L2 | L3 | L4 | L5 | L6 | End-of-batch state | Next destination |
|---|---|---|---|---|---|---|---|---|
| Polite request line (bonjour + je voudrais + un café)¹ | **A-N** | — | — | — | A-R (package lens) | G-R (offer declined) | owned, chip-scaffolded | L7+ recycling; redesign may deepen |
| `s'il vous plaît` | S-N | — | — | — | G-N (alt) | — | supported, never required | founder card FQ-B3; redesign |
| `merci` | S-N | — | NA (trap) | — | — | **S-N→produced (open weave)** | produced once, foundation thin | L1-redesign accounting |
| `au revoir` | — | — | — | — | — | S-N (new in integration) | met + hint-produced | L7 departure recycles function |
| Repair pair | **absent** | — | — | — | — | — | not owned, not present | L1 redesign (FQ-C8) — priority debt |
| `je suis (ici)`² | — | **A-N** | A-R (base) | R-R (contrast) | — | A-R | owned (one completion) | spec identity layer (unshipped) |
| `Je suis prêt.` state shape | — | G-N | — | — | — | — | orphaned ghost | unresolved |
| `je ne suis pas` frame | — | — | **A-N** | — | — | R-R (distractor) | owned frozen frame | L11 composition (spec) |
| `ce n'est pas` frame | — | — | **A-N** | — | — | — | owned frozen frame | affirmative c'est ~L8 (spec) |
| `non` (answer) | — | — | **A-N** | — | — | — | owned as prefix | — |
| `non merci` | — | — | S-N (choice) | — | — | R-R (choice) | chosen, never typed | unresolved |
| `oui` | — | — | **R-N (conflict: registered active)** | — | — | — | never produced; rehabilitation locked, unwired | founder card FQ-B5 |
| `ne…pas` system | — | — | R-N | — | — | — | recognized, never assembled | L11 composed form (spec) |
| `j'ai` + `faim`³ | — | — | — | **A-N** | — | R-R (distractor) | owned | state expansion (locked, unshipped) |
| `j'ai une question`³ | — | — | — | **A-N** | A-R | A-R | owned | — |
| un/une package operation | (packages used) | — | — | — | **R-N (+promotion)** | — | recognized; production unchanged | founder card FQ-B7; article lessons (deferred) |
| être-vs-avoir choice | — | — | — | **R-N** | — | R-R | recognized (2 exercises) | contrast sentence (blocked on states) |
| Multi-sentence moment | — | — | — | — | — | S-N/NA (ungraded) | previewed with support | L10/L13 flows (spec) |

¹ linked IDs: `chunk-bonjour`, `chunk-je-voudrais`, `noun-cafe`,
`chunk-un-cafe` — one demand, counted once.
² linked IDs: `chunk-je-suis`, `chunk-je-suis-ici`, `word-ici`.
³ linked IDs: `chunk-j-ai`, `chunk-j-ai-faim`/`noun-faim`,
`chunk-j-ai-une-question`/`noun-question`.

## 13. Learner ownership after each lesson

Proposed Curriculum accounting summaries (not validators; categories
reported separately, never summed into a false total):

| After | A-N demands | S-N targets | R-N targets | G-N exposures | A-R re-issues | Learner-facing acquisition units (cumulative demands) | NA exposures (tracked apart) |
|---|---|---|---|---|---|---|---|
| L1 | 1 | 2 (svp, merci) | 1 (register) | 2 | 0 | 1 | ~5 (goal, culture, 3 traps, anchor) |
| L2 | 1 | 1 (greeting+placement) | 1 (engine slot) | 1 (prêt) | 0 | 2 | ~5 |
| L3 | 3 | 1 (non merci, choice) | 2 (sandwich; oui/non) | 3 | 1 | 5 | ~6 |
| L4 | 2 | 0 | 1 (engine choice) | 0 | 1 | 7 | ~6 |
| L5 | 0 (proposal; alt 1) | 0 | 2 (article op; package choice) | 1 | 2 | 7 (alt 8) | ~5 |
| L6 | 0 (close ritual = S-N, flagged) | 1 (close ritual) | 0 (2 R-R) | 1 | 4 | 7 (alt 8–9 under breach reading) | ~6 |

Every lesson sits at or under the normal band; no fourth demand
exists; the accounting risk is **underload** (single L6 tension noted).

## 14. Carry-in and carry-out

- **Carry-in to L1:** none formal (L0 = preview; §5).
- **Batch-internal chains that work:** L2 placement → L3 negation
  transform → L4 engine contrast → L5 package lens → L6 recombination.
  The spine is genuinely anticipatory (the L2-planted contrast cashes
  in at L4).
- **Chains that break:** L3 `non merci` never promotes; L5's pas-de
  bridge never existed; L6's close demands unfounded merci; the L2
  prêt ghost dangles.
- **Carry-out beyond the batch (spec layer):** L7 doorway assumes the
  L6 closing function (present); L8 assumes recovery material
  (absent); L9 recycles `j'ai besoin de` (absent); L13 assumes the
  repair pair (absent — the route defect); L17 recycles a state pool
  (absent). Batch-2 normalization must carry these as **foundation
  flags**, not facts.

## 15. Orphaned ghost and recognition audit

| Item | Status | Problem | Disposition |
|---|---|---|---|
| `Je suis prêt.` (L2) | orphaned G-N | previewed state shape; dormant registry items; no ratified destination | flag; destination = identity/state expansion (unscheduled) |
| Affirmative `c'est` | inverted order | negation produced (L3) before the affirmative is ever taught | flag; c'est arrives supported ~L8 (spec layer) |
| `oui` | conflict | registered active, never produced; locked rehabilitation unwired | founder card FQ-B5 |
| `non merci` | stalled S | chosen twice (L3, L6), never typed | flag; no destination |
| `merci` | late-founded | learningItem L1; first demand L6 | founder card FQ-B8 accounting |
| `noun-cafe`, `noun-question` | subsumed | learningItems whose surfaces live only inside package chunks | accounting note (linked-ID rule §12) |
| Concept items (`grammar-*`, `micro-*`, `sound-elision`) | fine | non-producible by design | NA class — correctly not acquisition |
| R4 dormant registry items (11) | dormant | registered, no lesson surface | registry fact; no acquisition standing |
| `Je veux` (L1/L0) | G-N | register contrast; no register lesson ratified | flag; destination unresolved |
| Registry `exampleFr` fields | invisible | rendered by no surface — **not** ghosts | excluded from ghost counts |

Recognition is **not** used as a dumping ground: culture bites (2),
sound note (1), metas, traps, and anchors are all NA-classed.

## 16. Overload and underload audit

- **Overload: none in the shipped batch.** Max 3 demands (L3); no
  lesson approaches the hard max 4; the historical L2–L3 "difficulty
  spike" is an **intent-layer** phenomenon (two ~42-exposure specs) —
  the shipped L2/L3 are light.
- **Underload: the real finding.** 7–9 demands across six lessons;
  ~1.5 payload items per engine; ~53% of screens output-free; 12 of 13
  graded productions fully chip-scaffolded (the single scaffold-fade
  moment is L6 s08); zero unscaffolded graded production exists in the
  batch. The audit's verdict stands: strong machines, little to say —
  and little *asked*.
- **Consequence for the Contract:** the 1–3 band is under-used, not
  threatened; the locked enrichment raises supported/ghost cargo, not
  demand counts.

## 17. Runtime/spec contradictions

1. L1: 2 of 4 can-do clauses unshipped; repair pair absent (ladder
   says owned L1–L2; L13 assumes owned — CC-006 defect; FQ-C8 home).
2. L2: identity spec vs location runtime; 7 dormant registry items.
3. L3: 3 of 5 can-do clauses unshipped; oui registered-active vs
   never-produced; rehabilitation locked-unwired.
4. L4: state/need spec vs faim+question runtime; contrast sentence
   impossible (fatigué nonexistent); enrichment locked-unshipped.
5. L5: le/la + pas-de spec tiers unshipped; designed L4→L5 handoff
   dead on both ends.
6. L6: human-context spec inverted into a counter-transaction scene;
   `aide`/`comprendre` never registered; close-ritual tension vs
   IC-003.
7. Cross-cutting: L0-carryover accounting dispute; spec ID-counts vs
   Contract demand-unit; taxonomy collapse (spec tiers → 4-value
   runtime enum conflating role and novelty); vault notes citing spec
   tables under `implemented` headers; canonical-ID convention split
   (specs `type-slug`/`prefix:slug` vs runtime hyphen-ids); v1 surface
   emits no LearningEvents (spec's pool/review/lexique sections have
   no consumer).

None is resolved here; each is founder-routed (cards) or already
founder-locked awaiting a separate shipped step.

## 18. Arc implications

No Arc edit is made or authorized. Evidence-driven implications for
the paused Arc track:

- **ARC-α** — L1 entry + L5 extension confirmed at demand level;
  L4's α-bridge ("need→request") is weaker than traced (no besoin;
  the ask is `j'ai une question`). `NO ARC CHANGE INDICATED`
  (membership); payload-thinness note for maturity prose.
- **ARC-β** — L2 entry evidence is a **location** statement; identity
  material is spec-only; L3's "what I'm not" extension operates on the
  location base; L4 contributes states only via `faim`.
  `ARC RECHECK REQUIRED` (entry lesson claim and "established"
  maturity for the shipped slice).
- **ARC-γ** — `ici`/`je suis ici` (L2) is shipped location material
  the Arc map does not credit to γ; whether it is real γ entry
  material or incidental is exactly the FQ-A3 guardrail question.
  `INSUFFICIENT EVIDENCE` — decide at reconciliation.
- **ARC-δ** — the batch supplies δ far less than traced: no repair,
  refusal by selection only, no register choice, `non merci` never
  produced, close ritual founded only in L6's flagged weave.
  `ARC RECHECK REQUIRED` (maturity statement's "established thread"
  clause; the debt clause is confirmed and understated).
- **ARC-ε** — no shipped contribution in the batch beyond ungraded
  reading of French screens (not ASM material).
  `NO ARC CHANGE INDICATED`.

## 19. Founder decision cards

Eight cards (limit 5–8). None asks approval of raw registry IDs.

**FQ-B1 — L1 active production core.**
*Conflict:* L1-spec counts 4 items as L0-carryover; ADR-0006/vault
canon reject L0 ownership; the audit's "L1 active-new = 1 (merci)" is
wrong under the Contract (merci is never demanded). *Runtime fact:*
the only graded L1 productions are the request-line weaves.
*Recommendation:* bridge-blind reading — L1 = **1 demand** (the
request line as one linked cluster). *Alternative:* 2 demands
(greeting ritual split out). *Consequence:* fixes the batch's
demand-zero point and every downstream count. *Founder because:* it
interprets ADR-0006 against the spec's own accounting.

**FQ-B2 — Repair pair acquisition classification at landing.**
*Conflict:* home is decided (L1 redesign, FQ-C8/CC-007) but the
acquisition role at landing is not: SURVIVAL_FORMULAS are frozen
sentence-wholes producible under stress. *Runtime fact:* absent today;
L13 assumption stays blocked (CC-006). *Recommendation:* classify at
landing as **active-new demands learned whole** (2 demands, or 1 if
the pair is one rescue cluster) inside the redesigned L1 — which
directly pressures FQ-B1's L1 demand budget. *Alternative:*
supported-new first, promoted later. *Consequence:* determines whether
the redesigned L1 sits at 2–3 demands or needs a hard-max rationale.
*Founder because:* it binds the locked SURVIVAL_FORMULAS class to the
Contract's unit.

**FQ-B3 — `s'il vous plaît` ownership level.**
*Conflict:* culturally near-mandatory softener; never required by any
slot; spec treats it as active-recycled, runtime as optional chip.
*Recommendation:* **supported** in the shipped batch; promotion to
active decided inside the L1 redesign, not before. *Alternative:*
active-recycled from L0 (rejected with the bridge ontology) or
active-new in L1 (adds a demand with no requiring surface).
*Consequence:* keeps demand counts honest; sets the politeness-norm
precedent. *Founder because:* politeness ownership is a product-tone
decision, not derivable.

**FQ-B4 — L2 narrow seed vs identity expansion.**
*Conflict:* spec can-do (identity, c'est, others) vs shipped location
seed; 7 dormant registry items wait; the Arc trace claims β entry at
L2. *Recommendation:* accept the shipped seed as the batch's L2 truth
(1 demand); route identity expansion to an explicit future slice;
correct the β entry evidence at Arc reconciliation. *Alternative:*
treat identity as L2's "real" content pending enrichment (keeps the
Arc story, misstates the runtime). *Consequence:* whether downstream
docs may say "identity begins at L2." *Founder because:* it accepts or
re-scopes a shipped-lesson purpose.

**FQ-B5 — `oui` and yes/no answer ownership.**
*Conflict:* registered `active`; produced nowhere; rehabilitation
locked (Payload Economy §4.2) but unwired; by L12–L13 (spec) the
learner asks yes/no without being able to answer yes. *Recommendation:*
interim normalization **R-N with locked pending promotion**; wiring
lands with the enrichment step (already founder-locked), and the
promotion will count as a new demand when it lands. *Alternative:*
re-status the registry now (forbidden here — registry untouchable) or
accept the paradox indefinitely. *Consequence:* answer-capability
timeline; Batch-2 flags. *Founder because:* it schedules a locked but
smoke-bearing change.

**FQ-B6 — L4 narrow runtime vs need/state expansion priority.**
*Conflict:* the state/feeling hole (#4) blocks the spec's own contrast
target and the L17 spec's recycle pool; enrichment content is locked
(soif, une idée) but unshipped and smoke-bearing. *Recommendation:*
keep L4 = 2 demands now; treat state-layer landing as part of the same
reviewed enrichment wave as FQ-B2/B5, sequenced by the founder.
*Alternative:* pull `soif` forward alone as a minimal fix.
*Consequence:* when "say how I feel" becomes true beyond faim.
*Founder because:* wave sequencing is operator/founder-gated
(smoke-bearing).

**FQ-B7 — L5 package operation demand count.**
*Conflict:* L5 issues no new production sentence, yet performs the
batch's clearest conceptual promotion (package identity + selection
operation). Under IC promotion rules, does understanding-level
promotion on recycled productions count as a demand?
*Recommendation:* **0 active-new** (recognition + promotion lesson);
record the operation as R-N. *Alternative:* 1 (package-qualified
request as a re-issued demand). *Consequence:* precedent for every
future "same sentence, new lens" lesson. *Founder because:* it
interprets IC-002/003's promotion clause for a shipped case.

**FQ-B8 — L6 assumed prerequisites and the close-ritual tension.**
*Conflict:* IC-003 integration-0 vs shipped L6's new `au revoir` +
first-ever `merci` demand in the open weave; five further
assumed-without-foundation items (§11.I). *Recommendation:* classify
the close ritual as **S-N (scaffold-visible)**, keeping L6 at 0, and
route the foundation repair (merci demanded earlier, au revoir spacing)
into the L1-redesign/enrichment wave. *Alternative:* read s08 as
active-new → shipped L6 breaches IC-003 and the breach is recorded
against the frozen runtime (accounting debt, no edit). *Consequence:*
whether the Contract's integration rule holds cleanly over the shipped
spine or with one recorded historical exception. *Founder because:* it
is a Contract-interpretation precedent on frozen content.

## 20. Recommended smallest next action

Founder review of FQ-B1…B8. Then: Batch 2 (L7–L15) normalization in
the Contract's unit (converting spec ID-counts to demands, carrying
the §14 foundation flags), then Arc reconciliation per §18, then the
deferred adversarial Arc review. The L1 redesign / enrichment wave
remains its own founder-gated, smoke-bearing track — nothing here
schedules it.

## 21. Source map

Runtime (ground truth for this batch):
`lemot-app/content/lessons/v1/lesson-000…006.ts` (screen-level
inventory) · `content/itemRegistry.ts` (54 items; R2/R4 annotations;
hygiene commit `9c799d9`) · `content/lessonTypes.ts` (screen/type
unions; unconsumed spec fields) · `app/(tabs)/index.tsx` (Home cap
1..6) · `scripts/tests/v1LessonStructure.test.ts` (learningItems'
only consumer).
Canonical: Item-Counting Contract v1.0 (IC-001…006) · Curriculum
Charter v1.0 (§5 freeze; CC-006/007) · Content Bible v1.0 · Mastery &
Evidence Bible v1.0 · Product Brain v1.0 · Project Register.
Intent layer: `docs/syllabus/L01…L06` full PILOT specs ·
L01–L05 foundation retrospective · `docs/PAYLOAD_ECONOMY_v0.md`
(locked 2026-07-04; SURVIVAL_FORMULAS §4.1; oui §4.2; enrichment §6)
· `docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md` (four holes;
R-A…R-E) · Obsidian 04_SYLLABUS lesson notes and ladders (provenance;
layer-conflation warning per skeleton §9.7) · ADR-0006 (L0 bridge) ·
`CURRICULUM_FOUNDER_RATIFICATION_v0.1.md` FQ-C8 ·
`CAPABILITY_ARCS_v0.1.md` (paused; §18 implications target).

---

*End of Acquisition Batch L1–L6 v0.1. Draft normalization — founder
decisions pending. No lesson, spec, registry, runtime, Arc, validator,
or Canonical change is made or authorized; no mastery semantics are
defined. PRJ-001 remains OPEN; PRJ-015 remains CANONICAL.*
