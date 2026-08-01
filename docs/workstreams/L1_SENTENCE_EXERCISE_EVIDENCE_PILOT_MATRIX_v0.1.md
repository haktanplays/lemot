---
title: Cairn L1 Sentence × Exercise × Evidence Pilot Matrix
version: 0.1
status: Draft — vertical-slice interaction planning artifact
canon_status: non-canonical
implementation_status: not-started
owner: founder + curriculum/content review
created: 2026-07-31
scope: bounded pilot pairing selection and evidence contracts over the converged L1 sentence ecosystem
parent_ecosystem: docs/workstreams/L1_SENTENCE_ECOSYSTEM_v0.1.md
contract: docs/workstreams/L1_AUTHORING_CONTRACT_v0.1.md
related:
  - docs/workstreams/EXERCISE_VARIATION_INVENTORY_v0.1.md
  - docs/workstreams/L1_L10_CONTENT_AND_ACQUISITION_MAP_v0.1.md
  - docs/workstreams/L1_L10_VERTICAL_SLICE_CHARTER_v0.1.md
---

# Cairn L1 Sentence × Exercise × Evidence Pilot Matrix v0.1

## 1. Status and authority boundary

**Purpose.** Translate the converged L1 sentence ecosystem (30 core seeds, 8 mini-scenes)
into the **smallest high-value pilot interaction set** that proves the shared Cairn learning
system end-to-end: seeds × exercise variations × learner actions × A/S/R/G treatment ×
assistance state × admissible evidence × error attribution × feedback/reveal × renderer reuse
× Practice Hub × Mon Lexique × Flashcards × Stats × audio/Dictée.

This document:

- is **non-Canonical** and **overrides no governing document** (Curriculum Charter, Content
  Bible, Mastery & Evidence Bible, Lesson Flow Canon, Payload Economy, PRJ-015, Exercise
  Canon);
- **does not authorize implementation**;
- **creates no runtime payloads and no event schemas** — payload cards below are
  documentation sketches, never runtime JSON;
- **registers no sentence, exercise, event, audio, or canonical IDs**;
- uses **draft-local pairing IDs only** (`L1-PM-###`) — document-local handles, never
  runtime, canonical, event, exercise-instance, or analytics IDs;
- is a **bounded pilot-selection and evidence-contract artifact**, not the final L1 exercise
  pool — final authoring is a later, separate step;
- **depends on pending human French QA** for every French surface it references (all seed
  French remains *Illustrative — human French QA required* per the ecosystem §1);
- must **not** be interpreted as the final L1 exercise inventory.

**Anti-Cartesian rule (binding on this document).** No `30 seeds × eligible variations`
product is created. A pairing is selected only when it tests at least one meaningful
dimension (§3); pairings adding only superficial variety are omitted and the omission is
recorded (§3.3, §20).

Labels: **[SOURCE]** cited fact · **[CURRENT REALITY]** implementation fact · **[REC]**
recommendation · **[GAP]** missing capability · **[DECISION NEEDED]** open call.

---

## 2. Executive summary

- **Core seeds considered:** 30 (post-convergence pool; retired IDs 022/029/032 do not
  appear; reserve candidates R-1…R-7 do not enter).
- **Mini-scenes considered:** 8 (SC-1…SC-8, converged form only).
- **Exercise variations considered:** 19 L1 candidates (12 P0 + 7 selected P1 per the
  post-fold inventory), plus EV-060 explicitly assessed and excluded (§5.2).
- **Selected pilot pairings:** **29** (`L1-PM-001`…`L1-PM-029`).
- **Excluded eligible pairings:** ≈59 — the ecosystem's §10 eligibility tags admit ≈88
  seed×variation combinations; 29 were selected; the rest are excluded under the §3.3
  reasons (approximate by construction; eligibility ≠ selection).
- **Placement distribution:** Lesson path **15** · Audio layer **6** · Flashcard projection
  **3** · Practice Hub **2** · Return review **2** · Cross-surface validation **1**
  (Practice Hub + Return review = the 4 hub-surface pairings classified in §14).
- **Non-assessed exposure/reveal mappings:** seeds 012, 027, 028 carry non-assessed roles
  only; 019/020/021(input role)/024/025/026/030/031/033 carry input-only or reveal-only
  roles inside selected pairings; 4 seeds (006, 008, 016, 017) are intentionally excluded
  from the assessed pilot with stated reasons (§4).
- **Renderer primitive coverage:** all six primitives (R1 Choice, R2 Typed Production, R3
  Tile/Board, R4 Stateful Chain, R5 Self-Check, R6 Audio Stem) plus shared R7 Reveal/Compare
  and R8 detail surfaces — each with a legitimate L1 use, none forced (§6).
- **Evidence-class coverage:** exposure · audio exposure · recognition · recall · controlled
  production · supported (assistance-scoped) production · open-production attempt ·
  comparison-only · self-correction · self-report. **Repair evidence and diagnostic evidence
  are intentionally absent at L1** (no authored grammatical target; probes premature) —
  later-lesson dependencies, not gaps (§20).
- **Treatment coverage:** Active-recycled · Active-new · Supported · Recognition-trap ·
  Recognition-ambient · Ghost (input-only) · model-answer-only · meta/phenomenon (register).
- **Error-source coverage:** learner error · authored trap signal · UI/friction · content
  error · validator error · audio error · no-error-signal — all seven paths reachable (§11).
- **Seeds represented in ≥1 selected pairing:** 23 of 30 (as target, trap pole, model, or
  named input role); 3 non-assessed-only; 4 intentionally excluded with reasons; **no seed
  disappears silently** (§4).
- **Payload cards:** 17 (§19).
- **Major runtime gaps [CURRENT REALITY]:** no learning-event spine in the shipped v1
  renderer; no assistance/hint capture; no typed-fill lesson screen; no Dictée runtime; no
  self-check projection (legacy quarantined); no sentence identity registry; no audio
  identity (`entityId → audioId`); TTS-only audio; dual item-ID registries unreconciled; 4
  L1 identities unregistered (§21).
- **Readiness verdict:** READY for founder review; READY WITH BOUNDED GAPS for pilot
  implementation planning; NOT READY for runtime payload authoring, event implementation, or
  audio binding (§23).

---

## 3. Pilot-selection methodology

### 3.1 Selection tests

Every selected pairing satisfies **at least one** of the following (most satisfy several;
the main matrix's Source column plus §20 record which):

1. **Acquisition necessity** — the L1 communicative promise cannot be demonstrated without
   it (e.g. `merci` production, the full request arc).
2. **Evidence-boundary test** — it exercises a line the evidence system must not cross
   (reveal ≠ mastery; recognition ≠ ownership; one miss ≠ weakness).
3. **Assistance test** — it forces assistance/hint state to be captured and to scope the
   claim (FQ-3).
4. **Recognition-vs-production test** — the same target is touched by both a recognition and
   a production interaction so their evidence semantics can be compared.
5. **Ghost non-requirement test** — ghost material is present and must remain unassessed.
6. **Error-attribution test** — it makes a specific error-source path reachable (audio
   defect, validator false rejection, ambiguous distractor…).
7. **Renderer-contract test** — it exercises a renderer primitive contract L1 legitimately
   needs.
8. **Cross-surface projection test** — it proves an interaction's consequences propagate
   (Mon Lexique, Flashcards, Stats, Practice Hub) through shared evidence, not direct
   mutation.
9. **Audio/Dictée test** — it exercises the audio or Dictée contract inside FD-3/FD-6
   boundaries.
10. **Failure-mode test** — it deliberately stages a critical failure mode (missing support,
    bad audio, model-divergence in open production).

### 3.2 Mandatory distinctions (held throughout)

1. **Eligibility** — a seed *can* support a variation (ecosystem §10).
2. **Pilot selection** — a pairing is *deliberately chosen* for this bounded pilot.
3. **Final authoring** — the complete production pool; **not created here**.
4. **Evidence ceiling** — the strongest claim the interaction may *safely* support.
5. **Evidence observation** — what actually happened in one learner attempt.
6. **Curriculum treatment** — Active / Supported / Recognition / Ghost (authored placement).
7. **Learner mastery state** — a separate projection that may strengthen without changing
   curriculum treatment (CA-8).
8. **Error source** — learner, authored trap, content, UI, validator, audio, or no error;
   only verified learner-sourced error may feed weakness, after attribution.

### 3.3 Exclusion reasons (used in §4, §5, §20)

- **duplicate learner action** — same action already piloted on an equivalent target;
- **duplicate evidence semantics** — adds no new evidence interpretation;
- **low learning value** — trivial at L1 scale (e.g. 2-tile builds);
- **unnatural interaction** — fails the ecosystem's naturalness constraints;
- **treatment conflict** — would demand above an item's treatment;
- **renderer-only repetition** — only re-exercises an already-covered renderer;
- **L2+ dependency** — needs grammar, engines, or doorways L1 does not own;
- **audio dependency outside current scope** — needs recorded contours/quality not yet
  available (flagged, one such pairing retained deliberately as gated — PM-018);
- **final-pool volume** — belongs to final authoring volume, not pilot decision value.

---

## 4. Seed and scene coverage ledger

One row per final core seed and per final mini-scene. Roles: **target** (assessed), **trap
pole**, **input-only**, **reveal model**, **span source**, **scenario frame**. No seed
disappears silently.

| Seed/scene | Treatment/role | Selected pilot pairing IDs | Non-assessed destinations | Evidence ceiling | Reason for coverage or non-selection |
|---|---|---|---|---|---|
| L1-SE-001 `Bonjour.` | A-rec opener | PM-002 (frame), PM-006/007 (composition), PM-008 (missing-opener target) | IS-04 culture bite; scene openers | controlled production | opener demand lives inside arc + repair pairings |
| L1-SE-002 `Je voudrais un café.` | A-rec request base | PM-002 (frame), PM-004 (polite pole), PM-019 (span source) | — | controlled production | request base; contrast pole; Dictée span donor |
| L1-SE-003 | A-rec opener+request | PM-002 (reveal surface), PM-008 (landing-omitted shape) | — | controlled production | omission-repair shape of the anchor |
| L1-SE-004 (anchor) | A-rec full arc | PM-001, PM-006, PM-007, PM-016, PM-020, PM-022, PM-026 | meet auto-play; IS-06 sandwich insight | controlled production (full arc) | the anchor — richest justified projection set |
| L1-SE-005 | A-rec mid-exchange | PM-008 (opener-omitted repair shape), PM-023 (hub typed cloze) | — | controlled production | PH-leaning seed; recognition-vs-production pair with PM-002 |
| L1-SE-006 | A-rec casual order | — (intentionally excluded from assessed pilot) | SC-2 learner turn (flow map §13); casual-register display beside 031 | controlled production (final pool) | **duplicate learner action** — same request action as 004/005 pairings; register display value kept non-assessed |
| L1-SE-007 | S (un thé) | PM-011 (supported weave), PM-021 (Guided Dictée, thé given) | SC-4 | supported production | *the* supported-package teaching case, tested in production and in Dictée |
| L1-SE-008 | S (un thé, elliptical) | — (intentionally excluded) | final-pool slot variant | supported production (final pool) | **duplicate evidence semantics** with 007 (same supported boundary) |
| L1-SE-009 `Merci.` | **A-new** | PM-009 (typed recall), PM-013 (closing turn), PM-029 (typed card) | IS-02 cognate bridge | controlled production | A-new demand surface #1 |
| L1-SE-010 `Au revoir.` | **A-new** | PM-010 (function recall→use) | — | controlled production | A-new demand surface #2; distinct action from 009's pairing |
| L1-SE-011 | A-new close pair | PM-024 (return-review exit move) | SC-7 | controlled production | composition + carryover + spacing-return test |
| L1-SE-012 `S'il vous plaît.` | A-rec span/display | — | audio display; Micro-Dictée candidate (final pool); IS-03 elision note | audio exposure; recognition (span) | **final-pool volume** — Micro accent boundary already piloted on the `un café` span (PM-019); elision span deferred to final pool |
| L1-SE-013 | S formula | PM-012 (formula-supplied recall), PM-013 (recovery), PM-027 (scenario card) | rescue displays | supported production | survival formula #1, whole-formula recall |
| L1-SE-014 | S formula | PM-013 (within 015, support visible), PM-027 | contour recording priority (§18); shadowing span (final pool) | supported production | survival formula #2 — produced whole inside the recovery move |
| L1-SE-015 | S combined rescue | PM-013 (required production, both formulas supplied) | — | supported production | the full recovery move, one turn |
| L1-SE-016 | S combination | — (intentionally excluded) | final-pool rescue variant; EV-011 secondary | supported production (final pool) | **duplicate learner action** with PM-012/PM-013 (same supported-formula production semantics) |
| L1-SE-017 `Excusez-moi.` | S opener; carryover | — (intentionally excluded) | L8 carryover opener; hub function recall (final pool) | supported production (final pool) | **duplicate evidence semantics** — supported-boundary evidence already carried by 007/013/014/015 pairings; consequence: excusez-moi earns no Mon Lexique visibility inside the pilot (§15, stated) |
| L1-SE-018 `Je veux un café.` | R-trap register | PM-004 (contrast pole), PM-005 (revision source) | IS-05 register insight | recognition (register discrimination) | the register-signal boundary case — never the expected answer |
| L1-SE-019 / L1-SE-020 | G-bearing greet | PM-011 ([020] scene input), PM-026 (SC-1 frame incl. [019]) — input-only roles | scene greetings; address-color listening (final pool) | exposure / audio recognition (heard-meaning) | input-only scene color; never assessed |
| L1-SE-021 `Un café, madame ?` | G-bearing offer | PM-017 (heard offer), PM-018 (rising pole) — input/listening only | SC-6 | audio recognition (heard-meaning; ghost not assessed) | the offer-heard-never-answered boundary |
| L1-SE-023 `Un café.` | R confirmation echo | PM-003 (function recognition), PM-018 (flat pole) | SC-2 beat | recognition | order-echo function + flat contour pole |
| L1-SE-024 `Un croissant ?` | G-bearing offer | PM-017 (heard offer) — input-only | SC-6 | audio recognition (ghost not assessed) | ghost offer; learner never produces croissant |
| L1-SE-025 `Voilà.` | R ambient handover | PM-013 (slower repeat input), scene beats in PM-011/PM-026 frames — input-only | IS-22 gloss | exposure / recognition | ambient service beat; quick-peek explained, never demanded |
| L1-SE-026 `Voilà, monsieur.` | G-bearing handover | PM-013 (fast-heard repair trigger) — input-only | SC-3 | exposure | the missed-handover trigger; never assessed |
| L1-SE-027 `Merci, madame.` | G-bearing reveal | — | reveal enrichment of thanks (IS-16 kin); address listening (final pool) | exposure | non-assessed reveal-only; retained per ecosystem §18 rationale |
| L1-SE-028 `Au revoir, madame.` | G-bearing reveal | — | SC-7 close input; reveal enrichment | exposure | non-assessed reveal-only |
| L1-SE-030 (formal model) | model-answer-only | PM-014/PM-015 (IS-16 reveal model) | say-it model | comparison only | reveal target for open production; never graded against |
| L1-SE-031 (casual model) | model-answer-only | PM-014/PM-015 (IS-16 "Another Way") | register display beside 006 | comparison only | casual register model; never a chip |
| L1-SE-033 `Merci beaucoup, au revoir !` | model-answer-only | PM-014 (IS-16 enrichment rotation) | warm-close reveal | comparison only | sole warm-close enrichment; `beaucoup` never demanded |
| L1-SC-1 Entering & ordering | scene | PM-026 (scenario frame); production beats piloted via PM-006/007/009 | lesson-path arc | per constituent pairing | flagship scene; its beats are the lesson-path pairings |
| L1-SC-2 Order echo & handover | scene | PM-003 | learner order turn (006) non-assessed in pilot | recognition (echo) | the natural confirmation beat |
| L1-SC-3 Missed handover → repair | scene | PM-013, PM-027 | — | supported production | the recovery scene — required case B |
| L1-SC-4 Supported tea variation | scene | PM-011 | Guided-Dictée context (PM-021 draws on it) | supported production | the supported-boundary scene |
| L1-SC-5 Direct vs polite contrast | scene | PM-004, PM-005 | IS-05 | recognition + self-correction | the register scene |
| L1-SC-6 Offers heard | scene | PM-017 | audio layer | audio recognition | listening-only; no speech turn; no `oui/non` demand |
| L1-SC-7 Closing the exchange | scene | PM-024 (011 return) | [028] close input | controlled production (011) | closing move + carryover framing |
| L1-SC-8 Open production + reveal | scene | PM-014, PM-015 | IS-16 | open-production attempt | the free-production beat (W1) |

**Ledger audit:** 30 seed rows + 8 scene rows; every core seed has a pairing, a named
non-assessed role, or an explicit exclusion reason. Retired IDs 022/029/032 and reserve
candidates R-1…R-7 appear nowhere as pilot material.

---

## 5. Variation disposition for L1

### 5.1 Disposition of the 19 candidates

| EV ID | Variation | L1 disposition | Selected pairings | Placement | Reason |
|---|---|---|---|---|---|
| EV-001 | Meet & Listen | **Selected — lesson path** | PM-001 | Lesson path | first-contact exposure + the no-error case; chip-tap contract |
| EV-003 | Light Piece Hunt | **Selected — Practice Hub** | PM-022 | Practice Hub | chunk-boundary awareness on the anchor; span-tap renderer layout |
| EV-004 | Shadowing | **Selected — audio layer** | PM-016 | Audio layer | ungraded speaking surface; replay/slow capture; no-pronunciation-claim boundary |
| EV-010 | Fill with Traps | **Selected — lesson path** | PM-002 | Lesson path | authored-trap semantics + IS-31; shipped renderer |
| EV-011 | Meaning-in-Context Choice | **Selected — lesson path** | PM-003 | Lesson path | function recognition of the order echo (023) — distinct from form-fill |
| EV-013 | Micro-Contrast | **Selected — lesson path** | PM-004 | Lesson path | the veux/voudrais register boundary — contextual signal, never plain wrong |
| EV-014 | Audio Recognition | **Selected — audio layer** | PM-017, PM-018 | Audio layer | heard-meaning with ghost non-assessed; contour discrimination (recorded-audio-gated) |
| EV-030 | Typed Recall Fill | **Selected — lesson path + cross-surface** | PM-009, PM-023, PM-029 | Lesson path / Return review / Cross-surface | A-new production; hub recall of the frame slot; typed flashcard host |
| EV-031 | Build | **Selected — lesson path** | PM-006 | Lesson path | order evidence + distractor-tile trap; R3 contract |
| EV-033 | Function Recall → Use | **Selected — lesson path + Practice Hub** | PM-010, PM-012, PM-024 | Lesson path / Return review | function→form retrieval for A-new and supported formulas; hub volume core |
| EV-034 | Dictée (Micro + Guided only) | **Selected — audio layer** | PM-019, PM-020, PM-021 | Audio layer | FQ-1 orthography boundary; support boundary mirrored in Dictée; **no Sentence/Context mode** |
| EV-040 | Supported Weave | **Selected — lesson path** | PM-007, PM-011 | Lesson path | the production spine; hint-ladder assistance capture; supported-package boundary |
| EV-041 | Open Mixed Weave | **Selected — lesson path** | PM-014 | Lesson path | W1 ungraded crown mechanic + IS-16 comparison-only |
| EV-042 | Say It Your Way | **Selected — lesson path** | PM-015 | Lesson path | confirm-step self-correction; model-answer-only boundary |
| EV-043 | Choose Your Pieces | **Selected — Practice Hub** | PM-025 | Practice Hub | recombination-under-constraint evidence; tray/board contract |
| EV-052 | Missing Move | **Selected — lesson path** | PM-008 | Lesson path | social-sequence completeness (opener/landing) — L1's real "repair-shaped" need |
| EV-062 | Nudge Revision | **Selected — lesson path** | PM-005 | Lesson path | register upgrade after the contrast moment — **register revision, not grammatical repair** |
| EV-063 | Recovery Sequence | **Selected — lesson path** | PM-013 | Lesson path | supported rescue under calm conditions (FD-7: no pressure); R4 contract |
| EV-070 | Tap-to-Reveal Self-Check | **Selected — cross-surface** | PM-026, PM-027, PM-028 | Flashcard projection | self-report boundary; direction eligibility; projection rebuild target |

### 5.2 EV-060 Grammatical Repair — explicitly excluded from L1

**Inappropriate for L1.** EV-060 requires an authored *wrong owned form* whose fix is
grammatical (the inventory's example: `je suis faim`). L1 owns no grammar system: its
material is whole formulas, one frame, and two packages. The plausible L1 "errors" are:

- **register** (`je veux` with a stranger) — handled by EV-013 (PM-004) + EV-062 (PM-005),
  and deliberately **not** classified as grammatical repair: the direct form is
  understandable and situationally valid; the correction semantics are "smallest upgrade,"
  not "fix the mistake";
- **missing social move** (opener/landing dropped) — handled by EV-052 (PM-008), which is
  social-sequence completeness, not grammar;
- **orthographic near-miss** — precision-class signals under FQ-1, handled inside EV-030/034
  grading, never a repair exercise.

Task-level exclusion "grammatical repair where no actual grammatical target exists" applies
to all of L1. EV-060's first legitimate home is a later lesson with an expected-error list
over owned grammar (L2+ être band or later). Consequence: **repair evidence is absent from
the L1 pilot by design** (§20).

### 5.3 Other explicit exclusions

| EV | Disposition | Reason |
|---|---|---|
| EV-035 Chip Rebuild / EV-036 Chip Decomposition | Deferred | FD-2 pilot starts **L3** on `je ne comprends pas`; L1 is whole-first only |
| EV-034 Sentence / Context Dictée modes | Rejected for this pilot | contract §14 + FD-3: no full L1 Sentence Dictée; Context deferred |
| EV-093 Pronunciation scoring / speech-recognition grading | Rejected | inventory §5.G; shadowing stays ungraded |
| EV-021 Semantic Ranking | Deferred | FD-5 (P2) |
| EV-015 / EV-016 | Deferred | FD-6 (P2; audio-gated) |
| EV-045/046/047/048/049/050/051 | Deferred | L2+ dependency (engines, layers, register doorway, chains beyond one move) |
| EV-002 Micro-Reading | Eligible but not selected | L1 scenes are 3-4-turn service beats, not reading paragraphs; natural home L2+ |
| EV-012 Spot the Mistake | Eligible but not selected | duplicate evidence semantics with EV-013 at L1 (only authored flaw available is the register line) |
| EV-017 What Changed | Eligible but not selected | the 021↔023 melody delta is already carried by PM-018; text-delta pairs need L2+ material |
| EV-032 Starter Fade | Eligible but not selected | assistance-scoping already piloted via the hint ladder in PM-007/PM-011; multi-round fade adds renderer-only repetition at L1 |
| EV-044 Continue the Moment | Eligible but not selected | discourse continuation duplicates SC-flow production beats at L1 scale |
| EV-071 Diagnostic Probe | Deferred | probes presuppose accumulated weak-point candidates; premature before the pilot itself runs |
| EV-072/073/074/075 | Deferred / out of slice | canon homes outside L1 (L16 seed; P2; FD-1) |
| any exercise requiring Ghost production or unsupported Supported production | Rejected | treatment conflict — barred by contract §8 and ecosystem §8 |

---

## 6. Renderer coverage map

Primitives per the inventory §10 (contracts, not components). Each primitive is tested only
where L1 has a legitimate use; none is exercised through invalid pedagogy.

| Renderer primitive | Selected EVs | Pairing IDs | Treatment cases tested | Evidence cases tested | Runtime status [CURRENT REALITY] | Gap |
|---|---|---|---|---|---|---|
| **R1 — Choice Card** | EV-010, EV-011, EV-013, EV-003, EV-014 (choice half) | PM-002, PM-003, PM-004, PM-017, PM-018, PM-022 | A target; R-trap as authored wrong; G never correct; R-ambient as subject | recognition; trap signal; register-signal narrow interpretation | fill-with-traps shipped (v1); span-tap + audio-stem layouts absent | EV-011/EV-003 payload variants; audio-stem composition [GAP] |
| **R2 — Typed Production Card** | EV-030, EV-033, EV-040, EV-041 (ungraded config), EV-042 (confirm config), EV-052 (2-step), EV-062 (revision config), EV-034 (input half) | PM-005, PM-007, PM-008, PM-009, PM-010, PM-011, PM-012, PM-014, PM-015, PM-019, PM-020, PM-021, PM-023, PM-029 | A unscaffolded; S with named scaffold; model-answer-only; W1 ungraded | controlled production; supported production; recall; open attempt; self-correction | Weave + Say-It shipped; **no typed-fill lesson screen** (sandbox FillCard contract exists); repair/revision configs absent | typed-fill screen; revision + 2-step configs; hint-ladder + assistance events [GAP] |
| **R3 — Tile / Board Card** | EV-031, EV-043 | PM-006, PM-025 | A tiles as answer; R distractor tile; G never in bank | controlled production (assembly; recombination); order-error classes | sandbox BuildCard (itemId-graded) adoptable; no constraint-tray board | constraint board (lite) [GAP]; full board (EV-050/051) = later-lesson dependency |
| **R4 — Stateful Chain Wrapper** | EV-063 (sequence mode) | PM-013 | S formulas produced whole inside a staged scene; input-only turns | supported production sequenced with exposure turns | sandbox ContextChainCard exists; **no generic wrapper** | wrapper orchestration + per-step assistance capture [GAP] |
| **R5 — Self-Check Card** | EV-070 | PM-026, PM-027, PM-028 | A recall directions; S with support note; direction eligibility enforced | self-report only; reveal ≠ mastery | legacy scenario deck + `lm7_srs` **quarantined**; no canonical projection | rebuild as projection over shared identities/evidence [GAP] |
| **R6 — Audio Stem module** | EV-001, EV-004, EV-014, EV-034 | PM-001, PM-016, PM-017, PM-018, PM-019, PM-020, PM-021, PM-028 | A/S/R/G audible; G never identified-as-required | exposure; audio exposure; audio recognition | TTS only; no recorded clips; no slow-mode control verified; no `audioId` identity | recorded contour set (PM-018 hard-gated); playback-rate slow; replay/slow event capture [GAP] |
| **R7 — Reveal/Compare** (shared) | IS-15, IS-16, IS-31 across production/choice pairings | feedback layer of PM-002…PM-015, PM-019-021 | model-answer-only surfaces; trap explanations | comparison only; no mastery from viewing | natural-reveal + trapReason shipped in v1 shapes | branch-copy coverage per outcome class |
| **R8 — Interstitial/Detail** (shared) | IS-02/04/05/06/07/16/22/23/29/30/31 per ecosystem §16 | non-assessed layer | meta/phen surfaces | engagement/exposure events only | insight-card shipped; peek/detail partial | IS-29 hint ladder + IS-30 audio controls are P0 assistance surfaces [GAP] |

No primitive lacks an honest L1 use, so no later-lesson placeholder row is needed; the
**full-form** R3 board and R4 multi-payload chains are explicitly later-lesson dependencies.

---

## 7. Main Sentence × Exercise × Evidence pilot matrix

**Legend.** Error-source codes: **LE** learner error possible · **TS** authored trap signal
· **UI** UI/friction signal · **CE** content error possible · **VE** validator error
possible · **AE** audio error possible · **NE** no learner-error signal. Assistance codes:
none · replay · slow · hint(rung) · tray · pkg (supplied package) · reveal · retry · skip.
Cross-surface codes: **M** mastery projection · **PH** Practice Hub scheduling · **ML** Mon
Lexique · **FC** flashcard eligibility · **ST** Stats · **AU** audio-replay analysis — all
are *candidate consequences via shared evidence*; **no single attempt directly mutates any
surface**. All French: pending human French QA. Sources: eco = ecosystem §10/§15 row;
inv = inventory §5 row; ctr = authoring contract §9/§14.

| Pairing ID | Seed/scene | EV | Placement | Learner action | Prompt/payload sketch | Target identity/span | Treatment | Required support | Evidence ceiling | Success evidence | Non-success signal | Error sources | Assistance capture | Feedback/reveal | Renderer | Cross-surface | Priority | Source |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| L1-PM-001 | 004 | EV-001 | Lesson path | hear/read whole anchor; tap chips | meet: `Bonjour, je voudrais un café, s'il vous plaît.` + EN; per-chip highlight+audio | full arc; chips = 4 A-rec items | A-rec | n/a (no demand) | exposure only | `item_seen`-class exposure per chip | none — no wrong exists | NE, AE, CE | replay | none graded; IS-22 peek per tap | R6+R1 tap layer | ML example context; ST exposure; AU | P0 | eco 004; inv EV-001 |
| L1-PM-002 | 003/004 frame | EV-010 | Lesson path | choose filler into blank | `Bonjour, je voudrais ___.` options: `un café` ✔ · `merci` (trap: closes, doesn't name) · `bonjour` (trap: doubled greeting) [SOURCE: L0 s03] | un-cafe slot in frame | A-rec target; traps A-rec in wrong job | n/a | recognition | in-context form selection | trap pick → attributed trap signal + IS-31; **one miss ≠ weakness** | LE, TS, UI, CE, VE | none/retry | trapReason line; natural line reveal (003) | R1 | M (recognition-class); ST | P0 | eco 002/003; inv EV-010 |
| L1-PM-003 | 023 (SC-2) | EV-011 | Lesson path | judge scene function of the echo | server hands cup saying `Un café.` — what happened? ✔ confirming your order · offering another · asking payment | heard-meaning of 023 | R (input line) | replayable audio | recognition | scene-function recognition | wrong pick = recognition miss, attributed | LE, UI, CE, AE | replay | short function gloss; no grading of 006 turn | R1+R6 stem | ST recognition activity | P0 | eco 023; inv EV-011 |
| L1-PM-004 | 018 vs 002 (SC-5) | EV-013 | Lesson path | pick which fits with a stranger | counter scene; `Je veux un café.` vs `Je voudrais un café.` + trapReason on 018 | phen: register contrast | R-trap vs A-rec; meta phen | n/a | recognition (register discrimination) | register-boundary discrimination | picking 018 = **contextual register signal inviting smallest upgrade — never broad failure** | LE(narrow), TS, CE | none | non-punitive copy ("works, but blunt here"); IS-05 | R1 | ST; feeds PM-005 | P0 | eco 018; inv EV-013; ctr §9 |
| L1-PM-005 | 018→002 (SC-5) | EV-062 | Lesson path | revise the blunt line after one nudge | your line `Je veux un café.` + nudge "one small change makes it softer" → type revision | je-voudrais upgrade | A-rec upgrade target | the nudge (exactly one); original visible | self-correction + controlled production (upgrade) | produced register upgrade | declining ≠ error; failed revision = attributed learner error on upgrade only | LE, UI, CE, VE | hint(nudge), retry | reveal 002 + register note; **not framed as error correction** | R2 (revision config) | M; ML example; ST | P0 | inv EV-062; eco §9 |
| L1-PM-006 | 004 | EV-031 | Lesson path | arrange tiles into the arc | EN intent "Hello, I'd like a coffee, please." tiles: Bonjour · je voudrais · un café · s'il vous plaît + distractor `merci` | full arc order | A-rec tiles; A-rec distractor in wrong job | tiles visible (assembly, not recall) | controlled production (assembly) | word-order evidence over the arc | `wrong_order`/`missing_word`/distractor pick, attributed per class | LE, TS, UI, VE | none/retry | order reveal + comma-pause note | R3 | M; PH; ST | P0 | eco 004; inv EV-031 |
| L1-PM-007 | 004 | EV-040 | Lesson path | type the arc from intent | "Order politely, start to finish." pieces tray + hint ladder rungs 0-3; accepted alternatives incl. unaccented variants [SOURCE: shipped weave] | full arc typed | A-rec | tray optional; hint ladder available | controlled production (assistance-scoped) | arc production; **hint rung recorded and scopes the claim (FQ-3)** | near-miss soft; no red on no-match; miss attributed before weakness | LE, UI, CE, VE | hint(rung), tray, retry | model reveal + branch copy (correct/flat/understandable) | R2+IS-29 | M; ML (production for 4 items); FC; ST | P0 | eco 004; inv EV-040 |
| L1-PM-008 | 004-omission (005/003 shapes) | EV-052 | Lesson path | spot + supply the missing move | scene shows exchange missing opener (005-shape) or landing (003-shape): "something's missing — add it" | opener (001) / landing (sil-vous-plait) | A-rec social moves | scene context | recognition + controlled production (social move) | missing-move detection + supply | social-function tag, attributed; not a grammar claim | LE, UI, CE | none/retry | why-the-move-matters line (IS-06 kin) | R2 (2-step) | M; PH weakness-return tag class | P0 | eco 005; inv EV-052 |
| L1-PM-009 | 009 | EV-030 | Lesson path | type thanks from intent | "The coffee arrives. Thank them." → type `Merci` (accept `Merci.` / `Merci !`) | merci (A-new) | **A-new** | none (unscaffolded) | controlled production + recall | A-new production demand #1 | miss = candidate only after attribution; near-miss = precision signal (FQ-1) | LE, UI, VE | none/retry | reveal + IS-02 cognate bridge | R2 | M; **ML visibility candidate (production-gated)**; FC; ST | P0 | eco 009; inv EV-030 |
| L1-PM-010 | 010 | EV-033 | Lesson path | retrieve close from function, then use | "You're leaving. Say goodbye." → retrieve `Au revoir`, then close the mini-exchange with it | au-revoir (A-new) | **A-new** | none | recall + controlled production | function→form retrieval of A-new #2 | miss attributed; **one miss ≠ weakness** | LE, UI, VE | none/retry | reveal + close-pair note (011 preview) | R2 (2-step) | M; ML candidate; FC; ST | P0 | eco 010; inv EV-033 |
| L1-PM-011 | 007 (SC-4) | EV-040 | Lesson path | type the tea request with package supplied | SC-4: server [020] greets; "order a tea politely" — **`un thé` visible in tray as whole package**; frame recallable | un-the (S) + recycled frame | **S** package + A-rec frame | **supplied package `un thé` (visible tray chip)**; hint ladder | **supported production** (assistance-constitutive) | supported-production claim for un-the, **always assistance-scoped**; independent production NOT established | miss with support present = attributed learner error on supported claim only | LE, UI, CE, VE | pkg (**always recorded**), hint, retry | reveal + support boundary stays visible | R2+tray | M (supported claim); **ML candidate via supported production (CA-8)**; ST | P0 | eco 007; ctr §5; inv EV-040 |
| L1-PM-012 | 013 | EV-033 | Lesson path | recall the formula whole, prompted | "You don't understand. Say so." — **formula card `Je ne comprends pas.` just shown**; recall whole, never assembled from words | je-ne-comprends-pas (S formula) | **S** (closed formula) | **whole formula visible or just-prompted** | supported production + recall (formula-whole) | whole-formula supported recall | miss = formula-level tag, assistance-scoped; **no `ne…pas` grammar claim (L3)** | LE, UI, VE | formula prompt (**recorded**), hint, retry | calm reveal; formula never split | R2 | M (supported); ML candidate; FC scenario direction; ST | P0 | eco 013; ctr §6; inv EV-033 |
| L1-PM-013 | SC-3 (026→015→025→009) | EV-063 | Lesson path | run the recovery move in-scene | [026 played fast] → learner produces 015 (**both formulas available as whole chips**) → [025 replayed slower via playback-rate] → learner thanks (009) | 015 (both S formulas); closing 009 | S formulas + A-new close; input-only 026/025 | **both formulas as whole chips**; replay + slow controls; hint ladder; **no timer/pressure (FD-7)** | supported production (recovery sequence) | rescue-move production under calm conditions; replay/slow use recorded | partial-but-functional communication accepted; miss = formula tag, assistance-scoped | LE, UI, CE, VE, AE | tray, replay (**recorded**), slow (**recorded**), hint, retry | staged reveal per turn; repetition leads to thanks, never an unanswerable offer | R4 over R2/R6 | M (supported); PH rescue-return; ML; ST; AU | P0 | eco SC-3; inv EV-063; FD-7 |
| L1-PM-014 | SC-8 | EV-041 | Lesson path | express the intent mixing FR+EN freely | situation (EN): first café visit — say what you want, any mix; **no grading config permitted (W1)** | learner-owned attempt | free (A/R free; G in reveal only, W2) | none; unknown stays English by design | **open-production attempt + comparison only** | attempt + reveal-compare against 030/031 (+033 rotation) | **no learner error may be generated**; English gaps never penalized | NE (by design), UI, CE, VE(grading config = ERROR) | none; skip allowed | IS-16 Natural Reveal: model + Another Way + register notes; difference ≠ failure | R2 (ungraded)+IS-16 | ST attempt count only; **no M** | P0 | eco SC-8; inv EV-041; W1 |
| L1-PM-015 | SC-8 | EV-042 | Lesson path | free-write FR toward the goal; confirm step | goal: greet + request + soften; optional idea pieces; "revise or keep?" then reveal | learner text vs model 030/031 | free; model-answer-only | optional idea pieces | open-production attempt + self-correction (confirm) | attempt + own-revision behavior | no deterministic grammar mastery; no fabricated praise | NE, UI, CE, VE | pieces-shown (recorded), retry(confirm) | IS-16 bands; model-answer-only | R2 (confirm config)+IS-16 | ST; **no M** beyond attempt/self-correction record | P0 | eco 030/031; inv EV-042 |
| L1-PM-016 | 004 | EV-004 | Audio layer | hear the anchor; repeat aloud | anchor clip (human recording later; TTS fallback now); chunked repeat; replay + slow available | sound shape of the arc | A-rec | replay/slow controls | audio exposure (+ speech-attempt completion) | exposure + completion fact; **never pronunciation evidence** | none — ungraded by canon | NE, AE, UI | replay (**recorded**), slow (**recorded**) | none graded; **no praise without target detection** | R6 | ST activity; AU; **no M** | P1 | eco §15; inv EV-004; FD-6 |
| L1-PM-017 | SC-6 (021/024) | EV-014 | Audio layer | listen; identify what is offered | [021] or [024] played → "what's being offered?" choice (coffee / croissant / the bill) | heard-meaning; **ghost items never assessed as vocabulary** | G-bearing input; A-rec skeleton | replay | audio recognition (heard-meaning) | offer comprehension; **no ownership claim on madame/monsieur/croissant** | miss = listening-recognition miss only **after audio-quality attribution**; not answering the offer is never an error | LE, UI, CE, AE | replay (**recorded**) | meaning gloss; no speech turn demanded (no `oui/non`) | R1+R6 | ST recognition; AU | P1 | eco 021/024, SC-6; inv EV-014 |
| L1-PM-018 | 021 vs 023 | EV-014 (contour payload) | Audio layer | hear line; judge offer vs confirmation | rising `Un café, madame ?` vs flat `Un café.` — non-identical texts; **usable only on recorded deliberate contours [GAP: TTS contours unusable]** | prosodic function contrast | R/G-bearing input | verified recorded audio (**hard gate**) | audio recognition (prosodic function) | offer/confirmation discrimination | miss meaningful **only** with verified audio; else audio error | LE(gated), AE, CE | replay, slow | contour gloss ("the melody asks") | R1+R6 | ST; AU | P1 (recorded-audio-gated) | eco §15 contour set; inv EV-014/016 boundary |
| L1-PM-019 | `un café` span (from 002) | EV-034 Micro | Audio layer | hear span; write it | span clip → type `un café`; normalization per §12; `cafe` = **accent near-miss: precision signal, never solo weakness (FQ-1)** | un-cafe orthography span | A-rec span | replay/slow; **post-ownership placement** | audio recognition + controlled written production (span) | segmentation + orthography observation | accent/punctuation-only miss = precision-class; **audio defect = content/audio attribution** | LE, UI, CE, VE, AE | replay (**recorded**), slow | neutral orthography note; no red for accent-only | R6+R2 | M (precision facet only); ST | P1 | eco §15; ctr §14; inv §12; FD-3 |
| L1-PM-020 | 004 | EV-034 Guided | Audio layer | hear full arc; write the missing A span | full 004 audio; written frame shows `Bonjour, je voudrais ___, s'il vous plaît.` — learner writes `un café`; rest given | un-cafe span inside arc | A-rec span; frame given | given frame; replay/slow | audio recognition + recall + controlled written production (cloze) | span extraction from connected speech | miss attributed after audio check; **no full-sentence L1 Dictée exists** | LE, UI, CE, VE, AE | replay, slow | reveal with span highlighted | R6+R2 | M; ST | P1 | ctr §14; inv §12; FD-3 |
| L1-PM-021 | 007 | EV-034 Guided | Audio layer | hear tea request; write the A frame — **thé span GIVEN** | full 007 audio; `___ un thé, ___.` visible with `un thé` printed; learner writes `Je voudrais` and `s'il vous plaît` | A frame spans; un-the **given, never demanded in writing** | S package given; A-rec frame written | **thé span printed (support boundary mirrored in Dictée)**; replay/slow | controlled written production (A spans only) | frame orthography with support boundary intact | demanding thé in writing would be a **validator error**, not learner error | LE, UI, CE, VE, AE | pkg-given (**recorded**), replay, slow | reveal; support boundary visibly held | R6+R2 | M (A spans); ST | P1 | eco §15 row 007; inv §12.7 |
| L1-PM-022 | 004 | EV-003 | Practice Hub | tap the piece doing a named job | anchor shown: "which piece asks softly?" → tap `je voudrais` span | je-voudrais chunk boundary | A-rec | sentence visible | recognition (chunk-boundary) | boundary awareness on the spine chunk | wrong span = recognition miss; ambiguous span = content error | LE, UI, CE | none | boundary highlight + IS-08 optional anatomy peek (evidence-free) | R1 (span layout) | ST; ML containing-pieces display link | P1 | eco 004; inv EV-003 |
| L1-PM-023 | 005 | EV-030 | Return review | type the slot from memory (hub return) | spaced return: `Je voudrais ___, s'il vous plaît.` — type the filler; **recognition-vs-production pair with PM-002's choice-fill** | un-cafe slot recall | A-rec | none | recall + controlled production | typed recall of the slot the learner earlier only selected | miss feeds spacing, attributed; **why-it-returned copy required** | LE, UI, VE | none/hint | reveal; calm return framing | R2 | M; PH spacing-return; ST | P0 | eco 005/§14; inv EV-030 |
| L1-PM-024 | 011 (SC-7) | EV-033 | Return review | retrieve the exit move | "You're done. Thank them and leave." → `Merci, au revoir.` (two-beat accepted alternative) | merci + au-revoir composed close | **A-new ×2** composed | none | recall + controlled production (composed move) | exit-move composition; carryover anchor (→L6/L7 closes) | miss attributed per element, not as pair failure | LE, UI, VE | none/retry | reveal + 033 warmth shown as reveal-only enrichment | R2 | M; PH spacing-return; FC; ST | P1 | eco 011; ctr §13 |
| L1-PM-025 | kit set | EV-043 | Practice Hub | produce a line using only the tray | constraint tray: {Bonjour · je voudrais · un café · s'il vous plaît · merci} — "order politely and thank" | recombination over A set | A-rec + A-new | tray = the constraint (visible by definition) | controlled production (recombination) | proof the pieces combine, not merely recur | constraint violation = neutral redirect, not failure | LE, UI, CE, VE | tray(constitutive), retry | reveal of one natural combination | R3 board / R2+tray | M; PH; ST | P1 | eco §14; inv EV-043 |
| L1-PM-026 | SC-1 / 004 | EV-070 | Flashcard projection | scenario front → mental attempt → reveal → self-grade | front: "You walk into the café (server: *Bonjour, monsieur.*) — order politely." back: 004 + audio | request-arc response | A-rec | reveal; audio on back | **self-report only** | scheduling signal; **reveal viewing produces no mastery**; self-report ≠ assessed correctness | over/under-claim bounded by later real production evidence | NE, UI, CE, AE | reveal (**recorded**), replay | back shows model; no grading | R5 | PH scheduling; ST self-report class; **no M proof** | P0 | eco §13; inv EV-070 |
| L1-PM-027 | SC-3 / 013+014 | EV-070 | Flashcard projection | scenario → recall the rescue move | front: "You didn't catch what they said. What do you say?" — **supported note shown** ("these formulas come with support"); back: 013/014 | survival formulas (S) | **S** — card **never demands unscaffolded recall**; direction-eligibility boundary test | supported note + reveal | self-report only | rescue-move familiarity signal | calm framing mandatory; no formula anxiety | NE, UI, CE | reveal, replay | back = both formulas whole + audio | R5 | PH rescue-return; ST | P1 | eco §13; inv §11; ctr §12 |
| L1-PM-028 | item clips / 021·024 | EV-070 (audio direction) | Flashcard projection | listen → choose meaning | audio front (item clip or offer line) → meaning choice; **TTS classified as fallback, recorded audio required for canon** | heard-meaning | A/R; G audible in context, never the required identification | replay | self-report / audio recognition | ear-training signal across surfaces sharing one audio identity | miss after audio check only; TTS-quality misses never punished | LE, UI, AE, CE | replay (**recorded**) | meaning gloss | R5+R6 | ST; AU; shared `entityId → audioId` test [GAP] | P1 | inv §11 FD-4; eco §15 |
| L1-PM-029 | 009 | EV-030 (card-hosted) | Cross-surface validation | typed recall inside the flashcard surface | intent card "Thank them" hosts the **same typed contract as PM-009** — proves a card surface can produce real controlled-production evidence into the same spine | merci | **A-new** | none | controlled production + recall | **cross-surface evidence equivalence**: same evidence class regardless of hosting surface | miss handled identically to PM-009 | LE, UI, VE | none/retry | reveal identical to PM-009 | R2 hosted in R5 shell | M; ML; ST — must flow through the **same** shared evidence path | P1 | inv §11 (typed host); charter cross-surface intent |

**Matrix audit:** 29 rows; no Cartesian expansion (≈59 eligible pairings deliberately not
selected); every Supported row names its exact material support; no Ghost item is ever a
required target; `je veux` appears only as a contrast pole/revision source.

---

## 8. Required pilot cases — satisfaction map

| Case | Requirement | Satisfied by |
|---|---|---|
| **A. Active unscaffolded production** | request-frame · merci · au revoir · full arc · missing opener/landing | PM-002/PM-023 (frame slot), PM-009 (merci), PM-010 (au revoir), PM-006/PM-007 (full arc), PM-008 (missing move) |
| **B. Supported production** | un thé package · je ne comprends pas whole · vous pouvez répéter ? whole · recovery scene | PM-011 + PM-021 (thé, production + Dictée boundary), PM-012 (013 whole), PM-013 (015 = both formulas whole, support visible), PM-013 (SC-3 recovery) |
| **C. Recognition & authored contrast** | veux vs voudrais · order-confirmation/ambient recognition · ghost-bearing listening, ghost unassessed | PM-004 (register pair), PM-003 (023 echo), PM-017 (021/024 offers heard) |
| **D. Open production** | one open attempt · Natural Reveal comparison-only · no deterministic broad grammar mastery | PM-014 (W1 weave), PM-015 (say-it confirm), IS-16 in both; no-mastery boundary stated per row |
| **E. Audio** | shadowing · audio recognition · replay · slow playback · bad-audio attribution | PM-016 (shadow + replay + slow), PM-017/PM-018 (recognition), PM-013 (slow repeat in-scene), §18 bad-audio rules on PM-019/020/021 |
| **F. Dictée** | one Micro · one Guided · accent/punctuation near-miss · audio-failure boundary · no full Sentence Dictée | PM-019 (Micro + accent boundary), PM-020/PM-021 (Guided ×2 incl. supported boundary), §18; Sentence/Context modes excluded (§5.3) |
| **G. Self-check** | one tap-to-reveal case · reveal ≠ mastery · self-report separate from assessed correctness | PM-026 (plus PM-027/028); PM-029 proves the assessed/typed contrast on the same surface |
| **H. Error attribution** | learner-error · authored register trap · UI/friction · content error · validator error · audio error · no-error exposure | PM-002 et al. (LE), PM-004 (register trap), §11 rows (support missing from UI; ambiguous distractor; validator false rejection), PM-019/020 (audio), PM-001 (no-error) |

---

## 9. Assessed versus non-assessed boundary

| Surface/action | Assessed? | Evidence possible | Mastery implication | Error implication |
|---|---|---|---|---|
| Meet & Listen (PM-001) | No | exposure only | none | none (asset/content errors possible, never learner) |
| Shadowing (PM-016) | No | audio exposure + attempt-completion | **none — never pronunciation evidence** | none; audio-asset errors only |
| Popup opening (any IS) | No | engagement/exposure event | **never mastery (I-27)** | none |
| Piece Quick Peek (IS-22) | No | `lexique_opened`-class | none | none |
| Natural Reveal (IS-16) | No | `answer_compared` | **viewing is never mastery** | difference from model ≠ failure |
| Ghost-bearing input (019-021, 024, 026) | No | exposure / heard-meaning recognition (line level) | no ownership of ghost items ever | ghost not produced / offer not answered ≠ error |
| Tap-to-Reveal self-check (PM-026/027/028) | No (self-graded) | self-report only | scheduling signal, never proof | no learner error; over-claiming bounded by later production |
| Open production (PM-014/015) | No (W1) | open attempt + comparison + self-correction | no deterministic grammar mastery | **no learner error may be generated** |
| Supported formula recall (PM-012/013) | **Yes** | supported production (assistance-scoped) | supported-performance claims only; independent production not established | learner error possible, formula-level, after attribution |
| Dictée (PM-019/020/021) | **Yes** | audio recognition + controlled written production | span/orthography facets; FQ-1 semantics | learner error only after audio-quality attribution; accent-only = precision signal |
| Register contrast (PM-004) | **Yes** (narrowly) | recognition (register discrimination) | register-boundary awareness only | picking `je veux` = contextual signal, never broad grammar failure |

---

## 10. Treatment-specific evidence contract

### Active (recycled + the two new)

- Unscaffolded demand from intent is allowed (the six Active surfaces only).
- Strongest evidence: controlled production (+ recall).
- **Attribution gate**: every miss passes error-source attribution before any weakness
  candidacy (I-8); **weakness requires more than one attributed event**.
- Orthographic/punctuation near-miss = precision-class signal, never concept weakness (FQ-1).

### Supported

- **Scaffold is mandatory and named per pairing** (§7 Required-support column); "Supported"
  without named material support is invalid.
- Evidence is real but **assistance-scoped** (FQ-3): the support used is recorded with the
  evidence and scopes the claim.
- **Independent production is never established** by supported success.
- Learner mastery may strengthen (and Mon Lexique visibility may be earned, CA-8) **without
  any curriculum promotion** — treatment and mastery are separate ledgers.

### Recognition

- Recognition evidence only; **recognition alone never reaches Mon Lexique visibility**
  (I-10) and never the strongest claim (I-31).
- Authored traps are interpreted **narrowly**: the signal is the authored confusion (register
  for `je veux`), nothing broader.

### Ghost

- Exposure events only; **never required, never scored as missing, never a weak-point
  candidate merely from non-production** (I-9); never in `piecesUsed`; exposure never
  promotes.

### Model answer / reveal

- Comparison only; **viewing is not mastery**; no automatic event promotion; model sentences
  never become chips or graded targets.

---

## 11. Error and attribution matrix

Respects the Mastery & Evidence Bible (admissibility → attribution → polarity/strength). No
scoring formula is invented here.

| Pairing/error condition | Possible source | Learner-attributable? | Weak-point eligible? | Required handling | Feedback behavior |
|---|---|---|---|---|---|
| Wrong Active choice (PM-002 filler) | learner; content (bad distractor) | yes, after distractor sanity | candidate after repetition | attribute; log trap if trap picked | trapReason (IS-31); retry offered |
| Missing Active element (PM-006/007 arc) | learner; UI (tile mis-tap) | yes | candidate (element-scoped) | `missing_word` class; attribute | neutral reveal; IS-15 retry invite |
| Supported formula absent from UI (support failed to render) | **UI defect** | **no** | no | evidence inadmissible; UI-friction event; report path | never show learner-facing failure |
| Supported formula miss despite valid support (PM-012/013) | learner | yes (assistance-scoped) | candidate at formula level only | record support state with evidence | calm reveal; formula stays whole |
| `je veux` selected (PM-004) | learner (register) | narrowly | **register-signal only, never broad grammar weakness** | contextual interpretation; invite smallest upgrade | "works, but blunt here" class; IS-05 |
| Ghost not produced (any) | — | **no** | **never** | no event beyond exposure | none |
| Audio clipped/mismatched (PM-016-021, 028) | **audio source** | **no** | no | audio-error attribution; report-issue tap; evidence quarantined | neutral "audio problem" copy; replay |
| Accepted answer rejected by validator (weave normalization miss, e.g. curly apostrophe) | **validator/content** | **no** | no | false-rejection path; accepted-alternative fix queued | IS-15 neutral retry; never red |
| Ambiguous distractor (two defensible options) | **content** | **no** | no | content-error flag; distractor revision | do not penalize; accept both pending fix |
| Hint dependence (rungs used often, PM-007/011) | learner state (assistance) | not an error | no — scopes claims | record rung per attempt (FQ-3) | never punished or mentioned negatively |
| Replay dependence (PM-016/017/019) | learner state | not an error | no | record replay/slow counts | never punished |
| Skip (PM-014 open production; any card) | learner choice | no | no | completion state only | neutral |
| Punctuation-only Dictée miss (PM-019/020) | learner (technical facet) | technical tag only | **no (solo)** | precision-class per FQ-1 | no red; tiny note |
| Accent-only Dictée miss (`cafe`) | learner (technical facet) | technical tag only | **no (solo)** | precision-class per FQ-1 | neutral accent note |
| Meaning-preserving spelling near miss | learner (technical) | technical tag; semantic effect unknown → **neither weakness nor full precision credit** | no (solo) | FQ-1 context rule | soft near-miss copy |
| Open-production variation outside the model (PM-014/015) | — | **no** | **never** | comparison event only (W1) | IS-16 presents difference as another way, never failure |

---

## 12. Feedback and reveal contract

Per selected EV family:

| EV family | Immediate feedback | Retry | Hint behavior | Natural Reveal | Trap explanation | Self-correction | Must NOT say |
|---|---|---|---|---|---|---|---|
| EV-001 / IS surfaces | none (exposure) | n/a | n/a | n/a | n/a | n/a | anything graded; "learned!" |
| EV-010/011/013 (choice) | correct/incorrect + one coach line | yes (IS-15) | none needed | natural full line shown | **IS-31 one line per authored trapReason** | n/a | "wrong!" for `je veux`; punitive register copy |
| EV-030/033 (typed recall) | deterministic match + near-miss softening | yes | hint ladder (IS-29), rung recorded | reveal target + context note | n/a | via retry | accent-only miss framed as failure |
| EV-031/043 (tiles/board) | order/constraint result | yes | reversed-pieces rung | assembled natural line | distractor-tile reason | n/a | "perfect score" language |
| EV-040 (supported weave) | branch copy: correct / correct-but-flat / understandable-but-wrong / missing-piece | yes | full ladder; rung scopes claim | model + pause/register notes | trap chips explained | n/a | red on no-match; support use as failure |
| EV-041/042 (open) | **none graded** | revise-or-keep (042 confirm) | none (idea pieces only) | **IS-16: model + Another Way + register notes; difference = another way** | n/a | confirm step is the mechanism | any correctness verdict; fabricated praise; model-difference as failure |
| EV-052/062 (move/revision) | move-completeness / revision outcome | yes | one nudge max (062) | why-this-works line | n/a | 062 is self-correction by design | framing revision as error correction |
| EV-063 (recovery) | per-turn staged feedback | yes | ladder + replay/slow | scene resolution (repeat → thanks) | n/a | n/a | urgency/pressure copy (FD-7); formula-anxiety framing |
| EV-034 (Dictée) | span match with FQ-1 softening | yes | replay/slow as assistance | span-highlighted transcript | n/a | n/a | orthography-miss = weakness; TTS-defect blame on learner |
| EV-004 (shadowing) | none | replay | slow mode | n/a | n/a | optional self-compare later | **any pronunciation judgment or praise** |
| EV-070 (self-check) | none (self-grade) | n/a | n/a | back of card | n/a | self-grade | treating self-grade as proof; streak/reward copy |

**Globally prohibited feedback patterns:** treating Supported reliance as failure · treating
`je veux` as universal grammar failure · treating Ghost omission as error · claiming mastery
after one correct response · claiming pronunciation correctness from Shadowing · punishing
audio replay or slow mode · presenting model-answer difference as failure in open production
· any XP/streak/level/theatrical-praise language.

---

## 13. Mini-scene pilot flow map

Scenes stay bounded service beats — **not chatbot simulations**. Converged properties held:
stable speakers/addressees; order-echo and handover roles as converged; **no scene requires
`oui/non`**; ghost stays input-only; rescue support visible; **completion ≠ mastery**.

| Scene | Selected pairings | Input turns | Learner actions | Required targets | Supported targets | Input-only | Evidence sequence | Failure/recovery route | Surface destinations |
|---|---|---|---|---|---|---|---|---|---|
| SC-1 | PM-026 (frame); beats via PM-006/007/009 | [019], [025] | order (004-class), thank (009) | 004, 009 | — | 019, 025 | exposure → controlled production ×2 | miss → IS-15 retry; attribution first | lesson arc; scenario card; PH |
| SC-2 | PM-003 | [023 echo], [025] | order (006, non-assessed in pilot), recognize echo | — (recognition only piloted) | — | 023, 025 | production (unpiloted turn) → recognition | echo misread → gloss + replay | lesson beat; audio recognition |
| SC-3 | PM-013, PM-027 | [026 fast], [025 slower] | deploy rescue move, thank | 009 | 013/014/015 (chips visible) | 026, 025 | exposure → supported production → exposure(slow) → controlled production | partial-but-functional accepted; replay/slow logged | rescue beat; EV-063; scenario card |
| SC-4 | PM-011 | [020], [025] | order tea with package, close (011-class) | 011 (close) | 007 (thé supplied) | 020, 025 | exposure → supported production → controlled production | support always visible; miss scoped to supported claim | supported showcase; Guided Dictée context (PM-021) |
| SC-5 | PM-004, PM-005 | display 018 vs 002 | choose register fit; optionally revise | choice; upgrade (062) | — | 018 (display) | recognition → self-correction + upgrade production | decline-to-revise ≠ error | register insight (IS-05); nudge pipeline |
| SC-6 | PM-017 | [021] and/or [024] | identify what was offered (choice) | none (bounded choice) | — | 021, 024 | audio recognition only — **no speech turn** | audio defect → attribution, replay | audio layer; ghost-boundary demo |
| SC-7 | PM-024 | [025], [028] | thank + close | 011 | — | 025, 028 | controlled production (composed close) | element-scoped attribution | closing move; carryover (L6/L7) |
| SC-8 | PM-014, PM-015 | situation prompt (EN) | free attempt; confirm/revise; compare | none (W1 ungraded) | optional idea pieces | 030/031/033 as reveal models | open attempt → self-correction → comparison | no failure route exists by design | IS-16; say-it beat |

---

## 14. Practice Hub pilot selection

Hub rules held: no new vocabulary · no new treatment · no formula fragmentation · no Ghost
production · no generic isolated meaning drill · **no second curriculum** · every return
carries why-it-returned copy where the product contract requires it.

| Pairing | Hub class | Notes |
|---|---|---|
| PM-022 (piece hunt) | authored-only | authored job-description payload on the anchor |
| PM-023 (typed slot return) | safe-template + **spacing-return candidate** | derivation of 004/005 omission family; returns the frame at spaced intervals |
| PM-024 (exit move) | safe-template + **spacing-return + carryover** | close pair returns; feeds L6/L7 recycling |
| PM-025 (constrained production) | safe slot variant / authored constraint | tray limited to owned kit; café↔thé swap is the only slot derivation allowed (thé support shown) |
| PM-013's rescue family | **rescue-return candidate** | recurring calm formula-retrieval prompts (formula supplied); scheduled from the rescue beat, never fragmented |
| PM-008's missing-move family | **weakness-return candidate** | returns only on **attributed** politeness/landing tags |
| PM-026/027/028 (self-check) | scheduling surface | EV-070 cards feed hub scheduling via self-report; not assessed volume |
| Not PH eligible | — | 018 outside EV-012/013 option sets; 019-021/023-026 as production sources; reveal-only 027/028/030/031/033; any un-thé unscaffolded prompt |

---

## 15. Mon Lexique consequences

Constraints held: recognition alone never adds · ghost never adds · `je veux` never adds
from its trap role · supported items may become visible after qualifying **supported**
production or weakness (CA-8) · popup/reveal views never add. [CURRENT REALITY]
`mastery.ts` already gates on production (`productionSuccess > 0` → visible; weakness →
weak) — the pilot exercises exactly this gate plus the **assistance-scoped supported path,
which the current projection does not yet represent [GAP]**.

| Target entry | Pairings | Evidence class | Visibility earnable? | Assistance scopes claim? | Weakness candidate possible? | Example-sentence relation | Parent/linked identity implication |
|---|---|---|---|---|---|---|---|
| bonjour | PM-006/007/008 | controlled production | yes (likely already earned from L0-recycled history) | hint rung if used | yes, after attribution | 001/003/004 (+030 richer) | — |
| je voudrais | PM-002/005/007/022/023 | recognition + controlled production | yes (production pairings) | yes | yes | 002-005 | anatomy display only (IS-08); children never independent rows |
| un café | PM-002/006/007/019/020/023 | controlled production (+span precision facets) | yes | yes | yes | 002-006 | **single entry despite legacy dual ID** (`noun-cafe`/`chunk-un-cafe` debt — §21) |
| s'il vous plaît | PM-006/007/008 (landing) | controlled production | yes | yes | yes | 004-006, 012 | protected whole through L1-L10 |
| **merci** | PM-009/013/024/029 | controlled production | **yes — the pilot's flagship A-new gate test** | no assistance expected | yes | 009, 011 (027/033 reveal richness) | — |
| **au revoir** | PM-010/024 | controlled production | yes | no | yes | 010, 011 (028/033 richness) | protected whole |
| un thé | PM-011/021 | **supported production** | **yes via supported path (CA-8)** — claim carries assistance scope | **always (constitutive)** | yes (supported-scoped) | 007, 008 | primary `chunk-un-the` ↔ linked `noun-the` designation must hold at registration (§21) |
| je ne comprends pas | PM-012/013/027 | supported production | yes via supported path | always | yes (formula-level) | 013, 015 | closed formula; never split |
| vous pouvez répéter ? | PM-013/027 | supported production | yes via supported path | always | yes (formula-level) | 014, 015 | locked surface; never inverted |
| excusez-moi | — (016/017 excluded from pilot) | exposure only within pilot | **no — not earnable inside this bounded pilot** (stated consequence, §4) | n/a | no | 016, 017 (final pool) | restored by final-pool family-C authoring |
| *(never listed)* | je veux (trap role) · madame/monsieur/croissant · voilà · beaucoup | — | never at L1 | — | — | — | — |

---

## 16. Flashcard consequences

All cards are projections of canonical items/sentences/audio/mastery state — **no separate
flashcard store** is created or implied. Decided directions only (FD-4):

| Direction | Pilot pairing(s) | Card eligibility (evidence required first) | Card produces evidence? | Anti-pattern risk | In pilot? |
|---|---|---|---|---|---|
| 1. intent/meaning → FR recall | PM-029 (typed host); PM-026 kin | qualifying production history on the target (merci: PM-009-class) | self-report; **controlled production when typed (PM-029)** | bare-translation framing — intent phrasing mandatory | **Yes** |
| 2. sentence context → missing piece | PM-023's frame as card payload | production history on frame | self-report / recall if typed | gap on supported thé must stay choice-given, never recall-demanded | Yes (via return-review payload) |
| 3. scenario → response recall | PM-026 (order), PM-027 (rescue, supported note shown) | scene exposure + any production history | **self-report only** | grading; formula anxiety; chatbot drift | **Yes** |
| 4. audio → meaning/target recognition | PM-028 | audio identity exists for the entity | self-report / audio recognition | TTS-contour dependence — recorded audio first | **Yes** (TTS-fallback-classified) |
| 5. selective FR → meaning | — | — | — | becomes the generic drill (EV-091) | **No — nothing at L1 genuinely needs it** (no faux ami in pool) |

Direction eligibility is treatment-aware: supported items never appear in unscaffolded
recall directions; recognition-stage material never in production directions.

---

## 17. Stats consequences

Learner-safe projections the pilot's shared evidence can support (no numeric weights, no
final UI copy — both remain downstream):

**Supported projections:** request-frame controlled-production activity (PM-002/006/007/023)
· Active-new recall progress for `merci` and `au revoir` (PM-009/010/024/029) · supported
survival-formula practice, **always displayed with its assistance context** (PM-012/013) ·
recognition activity (PM-002/003/004/017) · open-production attempt counts (PM-014/015) ·
hint/replay/slow usage as **neutral assistance facts** (PM-007/013/016/019) · cross-scene
reuse of the arc (PM-006/007/023/026) · Practice Hub return activity (PM-023/024/025).

**Explicitly excluded projections:** popup/interstitial counts as mastery · lesson or scene
completion as mastery · Ghost exposure as learned vocabulary · one miss as weakness · replay
or slow-mode use as failure · model-answer similarity as a broad grammar score ·
self-report as assessed correctness · any streak/XP-class derivation.

---

## 18. Audio and Dictée pilot contract

Binding rules: human recordings required later for canonical content, **TTS classified as
fallback** everywhere below; slow mode = **playback-rate on the single source recording**
(no duplicate slow clips by default); **no pronunciation scoring**; Shadowing produces no
pronunciation mastery; accent/punctuation misses per FQ-1; **bad audio is never learner
error**; **no Sentence or Context Dictée at L1**.

| Pairing | Seed/span | Audio source requirement | Replay | Slow | Dictée mode | Accepted-answer boundary | Audio failure behavior | Evidence ceiling |
|---|---|---|---|---|---|---|---|---|
| PM-001 | 004 | High-priority human recording later; TTS fallback | ✔ | ✔ | — | n/a | asset error; replay; report tap | exposure |
| PM-016 | 004 | same clip as PM-001 (shared identity) | ✔ (recorded) | ✔ (recorded) | — | n/a (ungraded) | asset error only | audio exposure |
| PM-017 | 021 / 024 | recorded offers preferred; TTS tolerated for meaning-choice | ✔ | ✔ | — | choice only | attribution before any miss counts | audio recognition |
| PM-018 | 021 vs 023 | **recorded deliberate contours — hard gate; TTS contours unusable [GAP]** | ✔ | ✔ | — | choice only | pairing inactive until audio passes | audio recognition (prosodic) |
| PM-019 | `un café` span | recorded span clip preferred | ✔ (recorded) | ✔ | **Micro** | `cafe` = accent near-miss (precision signal); punctuation ignored | defect → content/audio attribution; attempt quarantined | audio recognition + written span production |
| PM-020 | 004 | High-priority full-arc clip | ✔ | ✔ | **Guided** (A span written, frame given) | unaccented variant soft-accepted with note | same | + recall (cloze) |
| PM-021 | 007 | Medium-priority clip | ✔ | ✔ | **Guided** (thé **given**; A frame written) | thé never demanded in writing (validator boundary) | same | controlled written production (A spans) |
| PM-028 | item clips / offers | 10 item clips = High priority (contract §14) | ✔ (recorded) | ✔ | — | meaning choice | TTS-quality misses never punished | self-report / audio recognition |

---

## 19. Pilot payload cards

Seventeen compact documentation sketches (not runtime JSON). Every card: pairing · source ·
prompt · support · action · accepted output · traps · ceiling · error boundary · feedback ·
reveal · destination.

**Card 1 — L1-PM-001 (Meet & Listen, 004).** Prompt: none (encounter). Support: audio
auto-play, chip highlights. Action: listen, tap chips. Accepted: n/a. Traps: none. Ceiling:
exposure. Errors: none learner-attributable. Feedback: none. Reveal: IS-22 per chip.
Destination: lesson opening.

**Card 2 — L1-PM-002 (Fill with Traps).** Prompt: "What completes the request?" —
`Bonjour, je voudrais ___.` Support: options visible. Action: select. Accepted: `un café`.
Traps: `merci` ("closes a moment; doesn't name what you want"), `bonjour` ("you already
greeted — a second bonjour would feel doubled") [SOURCE: shipped L0 s03]. Ceiling:
recognition. Errors: LE/TS; one miss ≠ weakness. Feedback: IS-31 line. Reveal: 003.
Destination: lesson path.

**Card 3 — L1-PM-004 (Micro-Contrast, SC-5).** Prompt: "You don't know the server. Which
asks better here?" Options: `Je veux un café.` / `Je voudrais un café.` Support: scene
line. Action: select. Accepted: 002. Trap: 018, trapReason "understandable — just blunt
with a stranger; voudrais keeps it soft." Ceiling: recognition (register). Errors: register
signal only. Feedback: non-punitive. Reveal: IS-05. Destination: lesson path.

**Card 4 — L1-PM-005 (Nudge Revision).** Prompt: after choosing/typing the blunt line —
"One small change makes this softer. Try it." Support: original visible; exactly one nudge.
Action: type revision. Accepted: `Je voudrais un café.` Traps: none. Ceiling:
self-correction + upgrade production. Errors: declining ≠ error. Feedback: register note.
Reveal: 002 + IS-05. Destination: lesson path (SC-5). *Register revision — not grammatical
repair.*

**Card 5 — L1-PM-006 (Build, 004).** Prompt: EN intent "Hello, I'd like a coffee, please."
Support: tiles `Bonjour` · `je voudrais` · `un café` · `s'il vous plaît` + distractor
`merci`. Action: order tiles. Accepted: 004 order. Trap: distractor tile with reason ("merci
ends the exchange — it can't ask"). Ceiling: controlled production (assembly). Errors:
order/omission classes, attributed. Feedback: per-class. Reveal: assembled 004 + pause note.
Destination: lesson path.

**Card 6 — L1-PM-007 (Supported Weave, 004).** Prompt: "Order politely, start to finish."
Support: optional piece tray; hint ladder rungs 0-3. Action: type. Accepted: 004 (+
alternatives incl. unaccented variants). Traps: none. Ceiling: controlled production,
**rung-scoped**. Errors: LE/VE (normalization). Feedback: branch copy. Reveal: model +
notes. Destination: lesson path.

**Card 7 — L1-PM-008 (Missing Move).** Prompt: scene shows `Je voudrais un café, s'il vous
plaît.` exchange with no greeting — "Something's missing. Add it where it belongs." Support:
scene. Action: identify + supply `Bonjour`. Accepted: opener added (005→004 class).
Landing-variant card mirrors with `s'il vous plaît`. Ceiling: recognition + controlled
production (social move). Errors: social-function tag. Feedback: why-the-move-matters.
Reveal: full arc. Destination: lesson path.

**Card 8 — L1-PM-009 (Typed Recall, merci).** Prompt: "The coffee arrives. Thank them."
Support: none. Action: type. Accepted: `Merci` / `Merci.` / `Merci !`. Traps: none. Ceiling:
controlled production (A-new). Errors: LE; near-miss = precision. Feedback: soft. Reveal:
009 + IS-02 (merci ≈ mercy). Destination: lesson path.

**Card 9 — L1-PM-011 (Supported Weave, thé).** Prompt: SC-4 — "Order a tea politely."
Support: **`un thé` visible as whole tray chip (constitutive)**; hint ladder. Action: type.
Accepted: 007. Traps: none. Ceiling: **supported production — assistance-scoped**. Errors:
LE on supported claim only. Feedback: support boundary stays visible. Reveal: 007.
Destination: lesson path (supported showcase).

**Card 10 — L1-PM-012 (Function Recall, formula).** Prompt: "You don't understand. Say so."
Support: **formula card just shown** (`Je ne comprends pas.` whole). Action: recall whole.
Accepted: 013 exactly (whole). Traps: none. Ceiling: supported production + recall
(formula-whole). Errors: formula-level tag; no grammar claim. Feedback: calm. Reveal: 013 +
IS-02 kin. Destination: lesson path.

**Card 11 — L1-PM-013 (Recovery Sequence, SC-3).** Turns: [026 played fast] → "You missed
that. Recover — stay in French." → learner produces 015 (**both formulas as whole chips in
tray**) → [025 replayed slower] → "Close the moment." → 009. Support: chips, replay, slow,
ladder; **no timer (FD-7)**. Accepted: 015 (or 013→014 staged), then 009. Ceiling: supported
production (sequence). Errors: LE (formula tags) / AE. Feedback: staged, calm. Reveal: scene
resolution. Destination: rescue beat.

**Card 12 — L1-PM-014 (Open Mixed Weave, SC-8).** Prompt (EN): "Your first café visit. Say
what you want — mix English in wherever French is missing." Support: none; skip allowed.
Action: free mixed attempt. Accepted: everything (**no grading config — W1**). Ceiling: open
attempt + comparison. Errors: none learner-attributable. Feedback: none graded. Reveal:
IS-16 — 030 model, 031 Another Way, 033 rotation, register notes. Destination: SC-8.

**Card 13 — L1-PM-016 (Shadowing, 004).** Prompt: "Listen. Then say it aloud — nobody is
scoring." Support: clip, replay, slow. Action: repeat aloud (uncaptured). Accepted: n/a.
Ceiling: audio exposure. Errors: AE only. Feedback: **none — no pronunciation judgment or
praise**. Reveal: none. Destination: audio layer.

**Card 14 — L1-PM-017 (Audio Recognition, SC-6).** Prompt: audio [024] `Un croissant ?` —
"What's being offered?" Options: a croissant ✔ / a coffee / the bill. Support: replay.
Action: choose. Ceiling: audio recognition (heard-meaning); **croissant never assessed as
vocabulary**. Errors: LE after audio check; AE. Feedback: gloss. Reveal: meaning line; no
response turn demanded. Destination: audio layer.

**Card 15 — L1-PM-019 (Micro Dictée).** Prompt: audio span `un café` — "Write what you
heard." Support: replay, slow. Action: type. Accepted: `un café`; `un cafe` = accent
near-miss (precision signal, soft note, never solo weakness). Ceiling: audio recognition +
written span production. Errors: LE (technical facets) / AE (quarantines attempt). Feedback:
neutral orthography note. Reveal: span + é note (IS-03 kin). Destination: audio layer,
post-ownership.

**Card 16 — L1-PM-020 (Guided Dictée, 004).** Prompt: full 004 audio; on screen `Bonjour,
je voudrais ___, s'il vous plaît.` — "Write the missing piece." Support: frame given;
replay/slow. Action: type `un café`. Ceiling: + recall (cloze extraction from connected
speech). Errors: LE after audio attribution; VE if variant wrongly rejected. Feedback: span
highlight. Reveal: full transcript. Destination: audio layer. *(PM-021 mirrors this card
with `un thé` printed and the A frame written — the support boundary held in Dictée.)*

**Card 17 — L1-PM-026 (Tap-to-Reveal, SC-1).** Front: "You walk into the café. The server
looks up: *Bonjour, monsieur.* Order politely." Action: attempt mentally/aloud → reveal →
self-grade ("knew it / not yet"). Back: 004 + audio. Ceiling: **self-report only**; reveal
viewing produces no mastery. Errors: none learner-attributable. Feedback: none. Destination:
flashcard projection / hub scheduling.

---

## 20. Coverage and economy audit

- **Selected pairings:** 29. **Payload cards:** 17.
- **Seeds represented in selected pairings:** 23 of 30 (targets, trap poles, models, or
  named input roles); **non-assessed-only:** 3 (012, 027, 028); **intentionally excluded
  with reasons:** 4 (006, 008, 016, 017). Total 30 ✔ — no silent disappearance.
- **Scenes represented:** 8 of 8 (every scene has ≥1 pairing or constituent-beat mapping).
- **Variations represented:** 19 of 19 candidates selected somewhere legitimate; EV-060
  assessed and excluded with rationale (§5.2); 14 further EVs explicitly dispositioned
  (§5.3).
- **Renderer primitives:** 6/6 + R7/R8 shared — each with an honest L1 use.
- **Evidence classes:** 10 covered; **repair** and **diagnostic** intentionally absent
  (§5.2/§5.3) — later-lesson dependencies, recorded, not oversights.
- **Error-source classes:** all 7 reachable (§11).
- **Treatment categories:** all 8 present (§2).
- **Pairings rejected as redundant (duplicate action/evidence):** 006, 008, 016, 017
  assessed-pairing candidates; 014-standalone shadowing; EV-012/017/032/044 pairing
  candidates (§5.3).
- **Pairings rejected for treatment conflict:** all ghost-production and
  unsupported-supported candidates (categorical, per contract §8).
- **Pairings deferred to later lessons:** EV-035/036 (L3), EV-045-051 (L2+), EV-071,
  Sentence/Context Dictée, EV-015/016 full exercises, EV-060 (first real grammar band).
- **Average pairings per represented assessed seed:** ≈1.5 (anchor 004 justifiably highest
  at 7; no other seed exceeds 4).
- **Quota check:** no pairing exists to satisfy a count or tick a renderer box; the two
  near-redundant Dictée rows (PM-020/PM-021) are retained for a *distinct* boundary (A-span
  writing vs supported-span-given), and PM-029 exists solely to prove cross-surface evidence
  equivalence — each has stated decision value. The set stays bounded.

---

## 21. Runtime and implementation gap map

[CURRENT REALITY] anchors: lesson-v1 ships 7 screen types with no event spine; the
learning-engine package is validation fixtures + `mastery.ts` projection
(`monLexiqueStatus = weak | added | hidden` on `productionSuccess`/`isWeak`); sandbox cards
(FillCard, BuildCard, RegisterSwitchCard, ContextChainCard) exist behind flags; legacy
practice/`lm7_srs` is quarantined; audio is TTS-only; item IDs live in two unreconciled
registries (hyphen runtime / colon fixtures); 4 L1 identities are `PROPOSED — NOT
REGISTERED`; no sentence or audio identity exists.

| Area | Finding | Classification |
|---|---|---|
| LearningEvent emission | no shared event spine in the shipped renderer; fixture types carry no event schema | **blocks pilot implementation** |
| Assistance/hint capture | hint ladder (IS-29) and rung-recorded evidence (FQ-3) unimplemented | **blocks pilot implementation** (constitutive for PM-007/011/012/013) |
| Replay/slow capture | audio controls exist per-surface ad hoc; no replay/slow events; playback-rate slow unverified | blocks pilot implementation (audio pairings); can be mocked without architectural debt for non-audio pairings |
| Admissibility + attribution | no error-source attribution layer; misses today are raw | **blocks pilot implementation** |
| Supported-evidence representation | mastery projection has no assistance-scoped claim distinct from plain production [GAP] | **blocks pilot implementation** (PM-011/012/013/021 and §15 supported rows) |
| Open-production attempt handling | shipped Weave/Say-It are W1-compliant UI-wise but emit nothing | can be mocked without architectural debt |
| Self-check representation | no canonical projection surface; legacy deck quarantined | blocks only full product implementation (PM-026-028 can run on a thin projection) |
| Audio error attribution | no report-issue path; no asset-defect classification | blocks pilot implementation for Dictée/audio-recognition pairings |
| Dictée normalization | no Dictée runtime at all; normalization rules exist only as contract text (§12) | blocks pilot implementation (PM-019/020/021) |
| Mon Lexique projection | production gate exists; supported path + assistance scope missing | blocks pilot implementation (supported entries) |
| Flashcard derivation | no projection architecture; FD-4 directions documented only | blocks only full product implementation |
| Stats projection | none beyond legacy counters | blocks only full product implementation |
| Renderer gaps | typed-fill screen, revision/2-step R2 configs, R4 wrapper, constraint tray, R5 rebuild, R1 span/audio layouts | blocks pilot implementation (subset per §6 Gap column) |
| Sentence identity | no `sent:`-class registry — pairings cannot bind to runtime sentence IDs | **blocks pilot implementation** |
| Audio identity | no `entityId → audioId`; no recorded clips; PM-018 hard-gated on recorded contours | blocks pilot implementation for gated rows; TTS-fallback rows can run flagged |
| Item identity split + 4 unregistered IDs | dual registries; `chunk-excusez-moi`/`chunk-je-ne-comprends-pas`/`chunk-vous-pouvez-repeter`/`chunk-un-the`+`noun-the` unregistered | blocks pilot implementation (registration task prerequisite, per contract §16) |
| French QA | all surfaces pending human sign-off | **blocks pilot implementation** (content gate) |
| This document's selections | pairing set, evidence ceilings, exclusion reasons | documentation-only |

No gap is fixed in this task.

---

## 22. Acceptance tests

Behavior-level cases, not code. "Weakness" always means *candidate after attribution*, never
automatic.

| Test ID | Given | When | Then | Must not happen |
|---|---|---|---|---|
| T-01 | PM-009 card, no assistance | learner types `Merci` | controlled-production success for merci recorded unassisted; Mon Lexique visibility gate satisfiable | instant "mastered" claim; streak/XP copy |
| T-02 | PM-002 | learner picks `merci` trap once | attributed trap signal + IS-31 line; retry offered | weakness created from the single miss |
| T-03 | PM-011, thé chip visible | learner types 007 correctly | **supported** production recorded **with pkg-support state**; supported ML path satisfiable | evidence recorded as independent production |
| T-04 | PM-007, hint rung 2 used | learner completes the arc | success recorded **scoped to rung 2** | rung use hidden or punished |
| T-05 | PM-012 but formula card failed to render | learner misses | **UI-friction attribution; evidence inadmissible** | learner error or weakness recorded |
| T-06 | PM-004 | learner selects `Je veux un café.` | narrow register signal + smallest-upgrade invite (PM-005 path) | broad grammar failure; punitive copy |
| T-07 | PM-017 | learner hears [024], answers correctly | heard-meaning recognition recorded | any croissant/madame ownership claim; any demand to answer the offer |
| T-08 | PM-014 reveal | learner opens IS-16 and reads 030/031 | `answer_compared` engagement only | mastery/production evidence from viewing |
| T-09 | PM-016 | learner completes shadowing | audio exposure + completion fact | pronunciation evidence or praise |
| T-10 | PM-016/PM-019 | learner replays 4×, uses slow | replay/slow counts recorded neutrally | replay treated as failure signal |
| T-11 | PM-019 with a clipped span clip | learner writes wrong span | **audio-error attribution; attempt quarantined; report path offered** | learner error/weakness recorded |
| T-12 | PM-019 | learner writes `un cafe` | precision-class accent signal (FQ-1); soft note | solo weakness; red state |
| T-13 | PM-020 | learner writes `un café` correctly | Guided-Dictée success (recognition+recall+written production) recorded | full-sentence transcription demanded anywhere at L1 |
| T-14 | PM-007 | learner types 004 with curly apostrophe and validator rejects | **validator-error path: false rejection flagged; no learner attribution; alternative queued** | learner miss recorded |
| T-15 | PM-014 | learner writes an intent-preserving line different from 030/031 | comparison-only reveal; difference shown as "another way" | correctness verdict; failure framing; grammar mastery claim |
| T-16 | PM-026 | learner reveals and self-grades "knew it" | self-report recorded as scheduling signal, distinct from assessed evidence | self-report counted as production evidence |
| T-17 | PM-023 after spacing interval | frame returns in hub | why-it-returned copy shown; typed recall evidence flows into the same spine | hub introducing new vocabulary or fragmenting formulas |
| T-18 | PM-013 completed with support and slow replay | scene ends in thanks | supported sequence evidence, assistance-scoped; rescue-return scheduling possible | scene completion recorded as formula mastery; any timer/pressure |
| T-19 | Stats view after all above | projections rendered | only §17 supported projections appear, derived from shared evidence | popup counts, completion, ghost exposure, or model-similarity surfacing as mastery |

---

## 23. Readiness verdict

| Dimension | Verdict | Basis |
|---|---|---|
| Founder/product review | **READY** | bounded, decision-complete pairing set with per-row rationale and exclusion ledger |
| Human French QA dependency | **NOT READY** (external gate) | every French surface pending sign-off (ecosystem §20 review surface stands) |
| Renderer implementation | **READY WITH BOUNDED GAPS** | contracts named per primitive (§6); gaps enumerated (§21); no new lesson screen type required |
| Event/evidence implementation | **NOT READY** | no event spine, no assistance capture, no attribution layer — the pilot's central build |
| L1 Practice Hub implementation | **READY WITH BOUNDED GAPS** | selection + return classes defined (§14); depends on the evidence spine |
| Mon Lexique integration | **READY WITH BOUNDED GAPS** | production gate exists [CURRENT REALITY]; supported/assistance-scoped path missing |
| Flashcard integration | **READY WITH BOUNDED GAPS** | FD-4 directions mapped (§16); projection architecture unbuilt |
| Stats integration | **READY WITH BOUNDED GAPS** | safe projections defined (§17); no runtime |
| Audio implementation | **NOT READY** | TTS-only; no audio identity; PM-018 hard-gated on recorded contours |
| Runtime payload authoring | **NOT READY** | sentence/item registration prerequisites unmet (contract §16); French QA pending |

Completing this matrix does **not** constitute implementation readiness.

---

## 24. Recommended next implementation sequence

[REC] Smallest architecture-valid sequence — do **not** author the final large exercise pool
before the connected pilot works:

1. **Resolve matrix-blocking semantic gaps only**: attribution layer semantics,
   assistance-scoped evidence representation, supported-claim shape (§21 "blocks pilot"
   rows) — as contracts, before code.
2. **Freeze the selected pilot pairings** (founder pass over §7; drop or swap rows with
   stated reasons; French QA proceeds in parallel on the ecosystem §20 surface).
3. **Define/reconcile identity contracts**: sentence identity (`sent:`-class), the four
   unregistered item IDs + `un thé` primary↔linked designation, and the dual-registry
   reconciliation direction.
4. **Implement shared event emission + assistance capture** (hint rung, replay/slow, tray/
   pkg state) across the existing v1 screens first.
5. **Implement the minimum reusable renderers** the selected set needs: typed-fill screen,
   R2 revision/2-step configs, R4 sequence wrapper, R5 projection card, R1 span/audio
   layouts (§6 gap column) — nothing speculative.
6. **Connect mastery projection**: attribution gate + supported path + FQ-1 precision
   facets over the shared events.
7. **Connect Practice Hub** returns (spacing/weakness/rescue classes, why-it-returned copy).
8. **Validate Mon Lexique / Flashcards / Stats projections** against §15-§17 (including
   T-19-class non-inference tests).
9. **Bind approved audio identities** (`entityId → audioId`), record the §18 priority
   clips, then un-gate PM-018.
10. **Run L1 end-to-end accumulation and failure tests** (§22 as the acceptance suite),
    then widen toward final-pool authoring only after the loop holds.

---

*End of L1 Sentence × Exercise × Evidence Pilot Matrix v0.1 — Draft vertical-slice
interaction planning artifact. Non-Canonical; registers nothing; authorizes no
implementation; all French pending human French QA. Next: founder pass over §7/§20 selection,
human French QA over the ecosystem §20 surface, then the §24 sequence.*
