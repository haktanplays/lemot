---
title: Cairn Curriculum Acquisition Skeleton L0–L24
version: 0.1
status: Discovery — global skeleton, no lesson classification ratified
authority: None. Maps likely acquisition continuity and source confidence across L0–L24; only L1–L6 receives detailed normalization in the companion document.
owner: Curriculum
date: 2026-07-30
implementation_authority: none
prj_status: OPEN
source_contract: PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md
arc_context: CAPABILITY_ARCS_v0.1.md
---

# Cairn Curriculum Acquisition Skeleton L0–L24 v0.1

## 1. Executive verdict

1. **The pre-Campfire route is continuous but three-layered.** A shipped,
   frozen, deliberately narrow L1–L6 runtime; a registered-hidden L7–L15
   working sequence; a spec-only L16–L17 pair; a provisional L18–L20
   horizon; an unauthored L21–L23 zone (open decision D2); and the L24
   Campfire landmark whose direction is Canonical (PB-063…065) but whose
   content is uncomposed and, per locked decision C1, generated rather
   than authored.
2. **Acquisition accounting exists in two incompatible units.** The
   L7–L17 specs state "active-new" as **item-ID counts** (5–8 per
   lesson), written before the Item-Counting Contract (DOC-062) fixed
   the unit as **new learner-facing active production demands** (normal
   1–3, hard max 4, integrations 0). This skeleton reports the spec
   numbers as source signals and never treats them as Contract-compliant
   demand counts (§9.1).
3. **The shipped L1–L6 slice is under-loaded, not over-loaded.** Detailed
   normalization (companion document) finds ~7–9 real production demands
   across six lessons — every lesson far below the Contract ceiling —
   while the intent layer wanted ~49 active item-IDs. The intent layer
   and the runtime are frozen in disagreement **by design** (Round-1
   freeze + Payload Economy step 4 unshipped), not by accident.
4. **One acquisition debt dominates the route:** the repair pair
   (`je ne comprends pas` / `vous pouvez répéter ?`) is owned per the
   Canonical ladder, absent from runtime, and assumed owned by L13 —
   the FQ-C8 / CC-006 / CC-007 chain routes it to the L1 redesign, and
   the Arc pause (ARC-δ) already names it the first prerequisite debt.
5. **No unauthored content is invented here.** L18–L20 rows carry only
   provisional roadmap intent; L21–L23 rows are `UNAUTHORED`; L24 is a
   landmark row. No item counts are invented for any of them.

## 2. Scope and authority

- **This is Curriculum discovery.** It ratifies no classification,
  changes no lesson, registry, schema, validator, or runtime file, and
  authorizes no implementation. PRJ-001 remains OPEN; PRJ-015 remains
  CANONICAL and Not Implemented.
- **Counting semantics** are owned by the Item-Counting Contract v1.0
  (DOC-062). This skeleton applies its unit prospectively and marks
  every pre-Contract number as historical signal.
- **Evidence/mastery meaning** stays with the Mastery & Evidence Bible;
  nothing here is a mastery state.
- **Arc composition** is paused in `CAPABILITY_ARCS_v0.1.md`; §11 lists
  reconciliation implications only — no Arc edit is made.
- **L0–L6 are founder-locked, shipped, smoke-accepted, frozen**
  (Charter §5). Every "intended-but-unshipped" observation is blocked
  behind that freeze plus the Payload Economy smoke gate; recording the
  gap does not reopen it.

## 3. Two-axis classification model

**Axis 1 — acquisition role** (one primary role per pedagogical unit):

- **Active** — produced without answer pieces supplying the target.
  Active-new accounting per DOC-062: demands, not IDs; normal 1–3;
  hard max 4 with a short cognitive-load rationale; integrations 0;
  promotion into active counts as a new demand.
- **Supported** — produced with meaningful scaffolding (required chips,
  constrained choices, strong frames, bounded transformation, guided
  assembly). Supported ≠ owned active production.
- **Recognition** — identified/interpreted/distinguished when
  encountered (comprehension choices, contrast noticing, meaning
  recognition). Stronger than incidental exposure.
- **Ghost/preview** — encountered with **no current ownership claim**;
  must have a named future destination or a flagged unresolved one,
  plus a reason for appearing now. Incidental appearance alone does not
  justify a ghost classification.
- **Non-acquisition** — meta explanation, trap/distractor, sound or
  writing note, culture note, model-answer-only anchor, phenomenon tag,
  UI-only content. Tracked separately; never an acquisition demand.

**Axis 2 — novelty state** (recorded separately): `new` · `recycled` ·
`promoted` · `demoted` · `unchanged` · `not applicable`. Recycle is
**never** a mutually exclusive tier — `je voudrais` is active+new in
its first demand and active+recycled later; `ne…pas` is
recognition+new before any future promotion.

**Document-local shorthand** (used here and in the companion):
`A-N` active-new · `A-R` active-recycled · `S-N` supported-new ·
`S-R` supported-recycled · `R-N` recognition-new · `R-R`
recognition-repeated · `G-N` ghost/preview new exposure · `NA-N`
non-acquisition new · `—` absent. **These are documentation shorthand
only — not runtime statuses, not schema, not validator vocabulary, not
Mastery states.** (The runtime's own 4-value enum
`active|supported|recognition|recycled` conflates the two axes; see
§9.6.)

## 4. Source precedence

Canon Map routing → Curriculum Charter v1.0 → Item-Counting Contract
v1.0 → Content Bible v1.0 → Mastery & Evidence Bible v1.0 → **current
runtime for implemented reality** → **current lesson specs for intended
design** → founder build matrix / band map / roadmap for provisional
horizon intent → historical specs and archived notes as provenance
only. Where sources disagree the disagreement is shown (§9), never
silently reconciled; runtime reality and intended redesign are kept as
separate columns of fact throughout.

## 5. Lesson-status map

| Tier | Lessons | Status |
|---|---|---|
| Bridge | L0 | Shipped, Home-hidden; first-use bridge, **no formal acquisition ownership** (ADR-0006) |
| Foundation | L1–L6 | Shipped, visible, founder-locked/frozen; detailed normalization in companion |
| Working sequence | L7–L15 | Registered runtime files, Home-hidden (cap `≤6`); full/compact specs + gate reviews |
| Spec-only | L16–L17 | No runtime file; compact specs with locked gates |
| Provisional | L18–L20 | Roadmap/band-map/build-matrix intent only; nothing authored |
| Unauthored | L21–L23 | Open decision D2; candidates only, TBD in every content column |
| Landmark | L24 | Campfire: direction Canonical (PB-063…065), content uncomposed; generated-not-authored (C1) |

## 6. Global L0–L24 skeleton

Signals below are **source signals, not ratified classifications**.
L7–L17 "spec A n" figures are the specs' own item-ID counts
(pre-Contract unit — see §9.1); they are not demand counts. No counts
are invented for L18–L24.

| Lesson | Current status | Learner purpose | Active-new signal | Supported signal | Recognition signal | Ghost/preview signal | Recycle signal | Confidence | Unresolved issue |
|---|---|---|---|---|---|---|---|---|---|
| L0 | shipped bridge, hidden | order a coffee politely (first taste) | **none — no formal ownership** | request line assembled from supplied chips | soft-request contrast (voudrais/veux) | `je veux` contrast example | n/a | High | L0-carryover accounting dispute (§9.2) |
| L1 | shipped, frozen | greet, ask politely, thank | ~1 demand (request line; see companion) | merci, s'il vous plaît (optional chips) | register trap (veux) | rescue kit absent (redesign home) | L0 exposure re-demanded formally | High | repair pair absent; can-do clauses "recover/leave" unshipped |
| L2 | shipped, frozen | say I am here | ~1 demand (`je suis ici`) | bonjour chip (ungraded) | engine-slot fill | `Je suis prêt.` (no ratified destination) | bonjour | High | identity/c'est spec layer unshipped; 7 dormant registry items |
| L3 | shipped, frozen | say no; negate with frozen chunks | ~3 demands (two negative frames + non) | non merci (chosen, never typed) | ne…pas sandwich; oui/non contrast | `C'est ici.` (affirmative c'est untaught); `si` absent | je suis ici transform | High | **oui never produced** (rehabilitation locked, unwired); tu/vous absent |
| L4 | shipped, frozen | say how I feel / what I have (j'ai) | ~2 demands (j'ai faim; j'ai une question) | faim, une question (cluster members) | être-vs-avoir discrimination (2 fills) | none rendered (registry examples invisible) | bonjour, je suis contrast | High | soif/besoin/peur layer locked in Payload Economy, unshipped |
| L5 | shipped, frozen | packages: un café, une question | **~0–1 demands (see companion — possibly zero)** | packages supplied whole in weaves | un/une binary fills; package-choice fill | broader article system deferred | je voudrais / j'ai frames re-produced | High | is package-selection a new demand or promotion? (founder card) |
| L6 | shipped, frozen | carry one small moment; integration | **0 required (IC-003) — tension: close ritual demand (§9.4)** | au revoir + merci close (open weave, hint chips) | social micro-choices (decline, right-place) | un café as someone else's offer | whole L1–L5 pool | High | merci/au revoir first-ever production inside an integration |
| L7 | REG-hidden | close a moment, head off (`je vais à la maison`) | compact: 2 owned items (1 A, 1 S) | à la maison | futur-proche frame preview (full spec) | à/au/à la rule; `va` homograph guard | L6 arc, au revoir | High (slot) | full spec SUPERSEDED by compact doorway; Home-cap bump is operator decision |
| L8 | REG-hidden | ask/answer "où ?", recover politely | spec A 7 (ID-count) | tu vas où / vous allez où | est-ce que + inversion previews | là-bas; question-word family | L7 movement; repair patterns **(unshipped!)** | Medium | assumes recovery material L1 never shipped |
| L9 | REG-hidden | faire une pause / faire ça (split-sense) | spec A 8 (ID-count) | pause family | weather/sport faire (met, never produced) | broad faire, du/de la idioms | j'ai besoin de **(unshipped)**, negation | Medium | recycles spec-layer L4 material runtime lacks |
| L10 | REG-hidden | after-class integration | spec A 2, both meta, 0 lexis | 3 | L11 pouvoir preview hook | fatigue combo dropped (not in registry) | L6–L9 engines | Medium | doc patches proposed, not applied |
| L11 | REG-hidden | ask help / permission / say I can't | spec A 8 (ID-count) | vous pouvez, m'aider (frozen seed) | paradigm, je pourrais, puis-je | broad pouvoir/probability | L3 ne…pas composed; L6 aide **(unshipped)** | Medium | — |
| L12 | REG-hidden | est-ce que yes/no wrapper | spec A 5 (ID-count) | 8 | inversion, qu'est-ce que, où est-ce que | question-word est-ce que (trap-only) | owned clause pool | Medium | gate: wrapper only; full question system post-Campfire |
| L13 | REG-hidden | can-do & asking in one flow | spec A 2, meta, 0 lexis | 4 + flow frame | L14 `j'y vais` hook | — | ~26 recycled **incl. repair pair (unshipped — CC-006 defect)** | Medium | the route's one recorded assumed-prerequisite defect |
| L14 | REG-hidden | j'y vais / on y va (place-y) | spec A 5 (ID-count) | je n'y vais pas, tu y vas | j'y suis; en preview blocked | il y a frozen separate | L7 je vais, L8 où | Medium | gate: en / pronoun stacking deferred |
| L15 | REG-hidden | il faut / je dois (asymmetric obligation) | spec A 6 (ID-count) | je dois (one form) | devoir paradigm; il faut que blocked | devoir=owe homograph reserve | L11 contrast, L9 pause, infinitive pool | Medium | — |
| L16 | SPEC-only | read a small situation, respond simply (ASM seed) | spec A 3, all meta, 0 lexis | reading + response sentences | one forward hook (L17 or L18); blocked-recognition set | past/future leak = top gate risk | L11–L15 engines | Medium | model-answer-only locked (5 gates); no runtime file |
| L17 | SPEC-only | ça va? check-in; say how I am; no advice | spec A 5 ("~3–5, NOT band map's 7–9") | ça ne va pas, contente, je comprends promotion | triste, je me sens hook, je vais bien | je vais + inf. (L18 hook); advice register blocked | L2/L4 state pool **(largely unshipped)** | Medium | recycles states (fatigué, peur) runtime never shipped |
| L18 | PROVISIONAL | recognize `je vais + inf.` as "going to" | **"0 active (by design)" — preview, NOT ownership** | ~6–8 supported-recognition | preview framing + boundary | the "#1 temptation" — must not become ownership | movement pool | Low | gate 4 + gate 11 open (when owned; how strong the preview) |
| L19 | PROVISIONAL | integration / weak-point repair; ASM recurrence | ~0–2 meta (roadmap signal) | repair pool ~3 | — | — | L11–L18 | Low | engine-blocked (repair_sentence); ASM real recurrence per L16/L17 gates |
| L20 | PROVISIONAL | pre-Campfire checkpoint: capability proof L1–L19 | ~0–2 (roadmap signal) | curated proof set ~2–3 | reflection view | — | everything owned L1–L19 | Low | gate 10: confirm L20 = on-ramp |
| L21 | **UNAUTHORED** | candidate: review / time-light expansion (D2) | — (no counts invented) | — | — | — | — | None | open decision D2 |
| L22 | **UNAUTHORED** | candidate: human-context expansion (D2) | — | — | — | — | — | None | open decision D2 |
| L23 | **UNAUTHORED** | candidate: Campfire on-ramp consolidation (D2) | — | — | — | — | — | None | open decision D2 |
| L24 | LANDMARK | Campfire — crossing moment; paid-zone promise (full engines) | ~0 new (curated proof; promise previews) | — | promise previews (futur proche, passé composé, full questions) | by definition — the promise IS the preview | owned corpus | Direction: High; content: None | content uncomposed; generated-not-authored (C1); boundary/price tension (§9.8) |

## 7. High-leverage lifecycle map

~24 units/capabilities tracked route-wide. Statuses:
`SOURCE-CONFIRMED` · `PROPOSED` · `CONFLICT` · `UNAUTHORED` ·
`NOT APPLICABLE`.

| Unit / capability | First formal demand | Route lifecycle | Status |
|---|---|---|---|
| `bonjour` | L1 (L0 preview) | A-N in request line → A-R across L2/L4/L6 → ambient everywhere | SOURCE-CONFIRMED |
| `je voudrais` (+ slot frame) | L1 | A-N → A-R L5 → recycled L7+; `je voudrais + inf.` supported at spec-L6 (unshipped) | SOURCE-CONFIRMED |
| `un café` package | L1 (L0 preview) | inside request demand → package identity promoted L5 → ghost in L6 (someone else's offer) | SOURCE-CONFIRMED |
| `s'il vous plaît` | L1 | **never a required slot anywhere L0–L6** — optional softener chip | CONFLICT (ownership level = founder card) |
| `merci` | L1 learningItem | met L1 → distractor L3/L6 → **first required production L6 s08** | CONFLICT (demand-before-foundation) |
| `au revoir` | L6 | met and produced within one integration lesson | CONFLICT (vs IC-003 integration-0) |
| repair pair | — | ladder says owned L1–L2 · runtime absent · L13 assumes owned · home = L1 redesign (FQ-C8/CC-007); SURVIVAL_FORMULAS class locked, unshipped | **CONFLICT** (the route's dominant debt) |
| `excusez-moi` | — | parked future; every L8+ scene wants it (hole #3) | CONFLICT |
| `oui` / `non` / `si` | L3 | non A-N; **oui registered-active, never produced** (rehabilitation locked, unwired); si absent | **CONFLICT** (oui paradox: can ask yes/no by L12, cannot answer yes) |
| `je suis` (+ ici) | L2 | A-N → negated L3 → contrast pivot L4 → recycled L6; identity/c'est expansion unshipped | SOURCE-CONFIRMED (narrow) |
| `c'est` | — | **negative first**: `ce n'est pas` produced L3; affirmative `c'est` untaught in L0–L6, surfaces supported ~L8 | CONFLICT (inverted order) |
| `ne…pas` system | L3 (frozen chunks) | R-N as system; produced only as pre-fused chunks; composed `je ne peux pas` at L11; never assembled | SOURCE-CONFIRMED (chunk-first by design) |
| tu/vous register | — | spec-L3 intent; dormant registry items; unshipped; no ratified landing slot | CONFLICT |
| `j'ai` (+ states) | L4 | A-N (faim, une question) → j'ai besoin de spec-only → recycled L9/L17 spec layer | SOURCE-CONFIRMED (payload thin) |
| être-vs-avoir contrast | L4 | R-N discrimination (only engine-choice operation in L0–L6) → spec contrast sentence impossible (fatigué unshipped) | SOURCE-CONFIRMED / CONFLICT (contrast line) |
| un/une package operation | L5 | R-N discrimination + package promotion; **no productive article selection** | PROPOSED (demand count = founder card) |
| `aller` / `je vais` | L7 | compact doorway: 2 chunks; movement engine deferred | SOURCE-CONFIRMED |
| `où` | L8 | A per spec (ID-count); end-placement shapes only | SOURCE-CONFIRMED |
| `faire une pause` | L9 | split-sense entry; broad faire deferred | SOURCE-CONFIRMED |
| `pouvoir` (help/permission) | L11 | split-sense entry; broad pouvoir deferred | SOURCE-CONFIRMED |
| `est-ce que` wrapper | L12 | recognition preview L8 → active wrapper L12 (owned clauses only) | SOURCE-CONFIRMED |
| place-`y` | L14 | recognition seed L13 → chunk-first entry L14; en blocked | SOURCE-CONFIRMED |
| necessity (`il faut`/`je dois`) | L15 | asymmetric entry; paradigm/subjunctive blocked | SOURCE-CONFIRMED |
| reading-for-action (ASM) | L16 (spec) | optional micro-paragraphs L6–L10 → seed L16 → real recurrence L19 (provisional) → deep version paid-zone | SOURCE-CONFIRMED (spec layer) |
| social check-in (`ça va`) | L17 (spec) | reserved by L1 spec §15 → confirmed home L17; frozen chunk | SOURCE-CONFIRMED (spec layer) |
| futur-proche preview | L18 (provisional) | recognition hook L17 → stronger preview L18 (0 active by design) → ownership post-Campfire (gate 4 open) | PROPOSED (provisional) |
| recount/past (passé composé, imparfait) | — | no entry point anywhere pre-Campfire; Campfire promise material | NOT APPLICABLE (deliberately) |
| communication repair capability | L1 redesign (home) | prerequisite debt first (Arc pause, FQ-A5 correction); L19 repair role provisional | CONFLICT until reconciled |
| Campfire capability proof | L20 → L24 | L20 curated proof (provisional) → L24 crossing moment | UNAUTHORED (content) |

## 8. Batch boundaries

Proposed normalization batches (only Batch 1 executed now):

1. **Batch 1 — L1–L6** (this task's companion): shipped/frozen; runtime
   is the classification ground truth; spec layer recorded as intent.
2. **Batch 2 — L7–L15**: registered-hidden; specs + gate reviews are
   the ground truth; runtime exists but is unshipped to learners.
   Requires re-expressing spec ID-counts as Contract demands.
3. **Batch 3 — L16–L17**: spec-only; classification rides the locked
   gates; no runtime to contradict.
4. **Batch 4 — L18–L20**: provisional; normalization deferred until
   authoring; only boundary rules recorded (L18 = 0 active by design).
5. **Zone 5 — L21–L24**: no normalization possible (D2 open; Campfire
   generated-not-authored). Explicitly out of scope for batching.

## 9. Known contradictions

1. **Unit clash (systemic).** L7–L17 spec "active-new" figures (5–8)
   are item-ID counts predating DOC-062; the Contract counts demands
   (1–3, max 4). Both are true in their own unit. Batch-2 normalization
   must convert, not average. `RUNTIME/SPEC CONFLICT` in unit only.
2. **L0-carryover accounting.** The L1 spec counts 4 items "Active —
   recycled from L0"; ADR-0006 and the vault canon reject L0-carryover
   classification outright ("L0 is a bridge, spine starts at L1").
   Proposed resolution (companion, PROPOSED): L0 exposure = preview;
   L1 issues the first formal demands.
3. **Repair pair three-way conflict.** Canonical ladder: owned L1–L2 ·
   runtime: absent · L13: assumes owned. Resolution path exists
   (FQ-C8 → L1 redesign; CC-006/007; SURVIVAL_FORMULAS class locked in
   Payload Economy v0) but is unshipped. `CONFLICT`, founder-routed.
4. **L6 integration-zero tension.** IC-003: integrations have 0
   active-new. Shipped L6 adds `chunk-au-revoir` and demands the close
   ritual (`Merci, au revoir.`) in its open weave — material never
   demanded before. Companion proposes a classification and a founder
   card; not silently reconciled here.
5. **Intent layer vs frozen runtime (L1–L6).** ~49 spec-intended active
   IDs vs ~7–9 shipped demands; both layers founder-accepted (specs
   authorize nothing; runtime is frozen). This is a **recorded design
   split**, not an error — but every downstream doc must say which
   layer it cites.
6. **Taxonomy collapse.** Spec tiers (ghost, trap-option-only,
   carryover…) have no runtime representation (4-value enum), and the
   runtime enum conflates role with novelty (`recycled` sits beside
   `active`). The two-axis model in §3 is the proposed normalization.
7. **Vault notes conflate layers.** Some Obsidian lesson notes carry
   spec item tables under `implemented / device-verified` headers
   (worst: L6, quoting `word:aide` which no runtime file contains).
   Provenance trap, already known; do not cite vault notes for runtime
   facts.
8. **Campfire boundary/price.** Campfire mechanics Canonical
   (PB-063…065) and band-map paywall "settled ~L24" — while the
   product-level exact boundary and price remain deferred
   (recorded C3 tension). This skeleton treats L24 as a landmark and
   takes no monetization position.
9. **Stale-count traps (resolved, listed to prevent revival).**
   Registry counts: 52 = pre-hygiene snapshot · 54 = current registry ≡
   manifest (bidirectional test-enforced) · 59 = separate
   learning-engine fixture registry; the "56 manifest ids" figure was a
   grep artifact (ADR-0012 clarification, 2026-07-29). A divergence-log
   row still citing 54-vs-56 is stale.

## 10. Unauthored zones

- **L21–L23**: open decision D2. Candidates recorded (review/time-light
  · human-context expansion · on-ramp consolidation) with TBD in every
  content column. **No acquisition claims are possible or made.**
- **L24 content**: landmark Canonical, content uncomposed; C1 locks it
  as generated-not-authored. The skeleton row records the *intention
  shape* (curated proof + promise previews, ~0 new) and nothing more.
- **Post-L17 sequencing as such** remains open (PRJ-001; Arc pause).
  This skeleton's L18–L20 rows restate provisional roadmap intent and
  ratify nothing.

## 11. Arc-reconciliation implications

Recorded for the paused Arc track (no Arc edit made; statuses per the
Arc document's own vocabulary):

- **ARC-α** — entry/extension spine confirmed at runtime (request line
  L1, packages L5); payload thinner than the trace implied.
  `NO ARC CHANGE INDICATED` (maturity "established" holds for the
  spine; record payload thinness).
- **ARC-β** — the L2 **entry** claim rests on the *spec's* identity
  can-do; the shipped L2 teaches a **location statement**
  (`je suis ici`), with the whole identity/c'est layer unshipped.
  `ARC RECHECK REQUIRED` (entry evidence and "established" maturity).
- **ARC-γ** — runtime `ici` (L2) is location material predating the
  L7 doorway that the Arc map does not credit to γ.
  `INSUFFICIENT EVIDENCE` (may be incidental rather than membership;
  decide under the FQ-A3 guardrail after Batch 2).
- **ARC-δ** — foundation debt **confirmed and worse than traced**: L1
  ships no rescue at all; refusal is choice-only; tu/vous absent; oui
  unanswerable. `ARC RECHECK REQUIRED` (maturity statement may need
  strengthening of the debt clause, weakening of "established").
- **ARC-ε** — unchanged (L16 spec-only entry; optional micro-paragraph
  previews). `NO ARC CHANGE INDICATED`.

## 12. Smallest next action

Founder review of the companion batch's decision cards (L1–L6), then:
Batch 2 (L7–L15) demand-unit normalization using the same two-axis
model; then Arc reconciliation (§11) and the deferred adversarial Arc
review. No lesson edit, no promotion, no post-L17 sequencing in any of
these steps.

## 13. Source map

Canonical: Curriculum Charter v1.0 (§5 spine/status/purposes) ·
Item-Counting Contract v1.0 (IC-001…006) · Content Bible v1.0 ·
Mastery & Evidence Bible v1.0 · Product Brain v1.0 (PB-063…065,
DECISION_REGISTER) · Canon Map · Authority Spec · Coverage & Gaps ·
Project Register (PRJ-001/012/015/018/029; D2 via build matrix) ·
Source of Truth Map.
Runtime (Axis B): `lemot-app/content/lessons/v1/lesson-000…015.ts` ·
`content/itemRegistry.ts` (54 items) · `app/(tabs)/index.tsx` Home cap
`1..6` · `content/lessonTypes.ts` · `scripts/shipped-item-ids.json`.
Specs/fragments: `docs/syllabus/` L01–L06 full PILOT specs ·
L01–L05 foundation retrospective · L07 compact doorway (+ superseded
full spec) · L08–L15 specs/compact specs · L12/L14/L15/L16/L17 gate
reviews · L10–L20 band map v0 (Option C; gates 1–11) ·
`docs/architecture/l0-l24-founder-build-matrix-v0.md` (Tables A/B; D1,
D2, D7) · `docs/PAYLOAD_ECONOMY_v0.md` (locked 2026-07-04) ·
`docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md` (four functional
holes; R-A…R-E) · Obsidian 04_SYLLABUS ladders (Vocabulary/Grammar
Progression, Integration Lesson Logic, Lesson Status Matrix, L18-L24
Roadmap, Level and Band Map) · ADR-0006 (L0 bridge) · ADR-0012 note
(count artifacts) · prior discoveries DOC-059/063 ·
`CAPABILITY_ARCS_v0.1.md` (paused Draft).

---

*End of Acquisition Skeleton v0.1. No lesson classification is
ratified; no post-L17 sequence, tense placement, Arc edit, or
implementation is authorized. PRJ-001 remains OPEN; PRJ-015 remains
CANONICAL. Detailed normalization: L1–L6 companion only.*
