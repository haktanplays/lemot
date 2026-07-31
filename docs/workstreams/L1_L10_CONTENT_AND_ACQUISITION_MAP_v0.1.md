---
title: Cairn L1-L10 Content & Acquisition Map
version: 0.1
status: Draft — vertical-slice content planning artifact
canon_status: non-canonical
implementation_status: not-started
owner: founder + curriculum/content review
created: 2026-07-31
scope: L1-L10 real-deal vertical slice — lesson-by-lesson acquisition, exposure, recycle, and carryover spine
parent_charter: docs/workstreams/L1_L10_VERTICAL_SLICE_CHARTER_v0.1.md
sibling: docs/workstreams/EXERCISE_VARIATION_INVENTORY_v0.1.md
related:
  - docs/bibles/curriculum/CURRICULUM_CHARTER_v1.0.md
  - docs/bibles/curriculum/PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md
  - docs/bibles/content/CONTENT_BIBLE_v1.0.md
  - docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md
  - docs/canon/LESSON_FLOW_CANON_v1.md
  - docs/EXERCISE_CANON_v0.4.md
  - docs/PAYLOAD_ECONOMY_v0.md
  - docs/CONTENT_FACTORY_CONTRACT.md
  - docs/learning-engine-v1.md
  - docs/syllabus/chip-taxonomy-and-lexique-lifecycle-v0.3.md
  - docs/syllabus/canonical-item-id-convention-v0.1.md
---

# Cairn L1-L10 Content & Acquisition Map v0.1

> [!warning] **Status: Draft — vertical-slice content planning artifact.**
> This document:
>
> - is **non-Canonical**;
> - **does not override** the Curriculum Charter, Content Bible, Mastery & Evidence Bible,
>   Lesson Flow Canon, or the PRJ-015 Item-Counting Contract — where it and a Canonical source
>   disagree, the Canonical source wins and the gap is surfaced, never silently resolved;
> - **does not authorize runtime implementation** — no registry, schema, lesson, validator,
>   flag, audio, or visibility change follows from it;
> - **does not replace individual lesson specifications** — it reconciles and plans above them;
> - is the **source-grounded planning bridge** between existing curriculum authority and the
>   L1-L10 sentence ecosystems (Charter workstream 5, fed by workstreams 1-2).
>
> Labels used throughout: **[SOURCE]** cited fact · **[CURRENT REALITY]** Axis-B implementation
> fact · **[REC]** this map's recommendation · **[GAP]** missing identity/authority ·
> **[DECISION NEEDED]** routed decision. Newly proposed French is marked
> *Illustrative — human French QA required*. No new canonical IDs are assigned here; where an
> identity is needed but absent, rows say `IDENTITY GAP — ID assignment deferred`.

---

## 1. Executive summary

- **Sequence** [SOURCE Curriculum Charter §5]: L1 Survival Kit → L2 Être → L3 Non → L4 J'ai →
  L5 Un, une → **L6 Un petit moment (integration)** → L7 Je vais → L8 C'est où ? → L9 Faire
  une pause → **L10 Une petite journée (integration)**. **8 acquisition lessons, 2 integration
  lessons.**
- **Active-new acquisition demands** [REC, PRJ-015-counted]: L1 **2** · L2 **1** · L3 **3** ·
  L4 **1** · L5 **1** · L6 **0** · L7 **1** · L8 **2** · L9 **2** · L10 **0** — **total 13
  demands across the slice**, every lesson inside the 1-3 normal band, both integrations at
  the binding 0. (The specs' historical "active-new 9/10/10/8/8/…" are identity-context counts
  under the superseded 8-15 band and are recounted, not adopted.)
- **Recognition-new clusters:** ~9 (être-family snapshot; si; tu/register; L3 previews;
  le/la; movement-question frames; faire previews; L6 aller hook; L10 pouvoir hook).
  **Ghost/exposure clusters:** 5 (L1 café-color; L2 là/prêt; L3 pas de problème; L4
  froid/chaud; L5 restaurant/maison).
- **Protected structures:** 4 frozen/closed-class chunks (PROTECTED_CHUNKS ×2 + survival
  formulas ×2) plus ~10 whole-first formula/package/doorway units that stay unsplit through
  the slice. **Chip-anatomy pilot candidates: 4** (L3 formula · L5 package · L8 request-frame,
  QA-gated · L10 cumulative recomposition), per the bounded FD-2 decision.
- **Audio priority** [REC estimate]: ~130-190 sentences (~55-65% of seeds) + ~55-70 item-level
  clips; recorded human audio matters most for L8's question contours and the L1 formulas.
- **Sentence-seed authoring budget** (§7): ≈ **231-305 unique approved seeds** across L1-L10,
  showcase-weighted to L1 (28-40), L5 (30-38), L10 (27-34); 100% human French QA before
  Stage-C exposure.
- **Major curriculum conflicts** (§2, cards): the **L6 four-way conflict** (spec's 4
  active-new vs Payload Economy's "no new items" vs binding integration-0 vs shipped +1);
  Payload-Economy tier demotions vs L1-L5 spec tiers (PE wins); shipped compact de-scopes vs
  spec scope at L1-L6/L8/L9 (restoration = FP-2); shipped L8's `oui`-as-trap-only vs the
  locked oui rehabilitation; the unhomed `j'ai besoin de` cluster.
- **Major identity/registry gaps** (§11): 4 Kademe-2 enrichment identities absent from every
  registry (**blocks L1 authoring**); fatigué/soif/table absent (blocks L2-L5 and the L10
  anchor); dual café/question identities; two-registry split (54 hyphen vs 59 colon IDs, zero
  shared); no sentence registry; no `status_by_lesson`; no audio identity fields.
- **Highest payload-overload risk:** L3 (3 demands atop the documented L2-L3 spike) and L1
  (breadth of formulas — held by supported treatment). **Highest underdevelopment risk:** L2
  (3 shipped payload surfaces until enrichment lands) and L7 (2-item doorway — deliberate,
  hub-compensated).
- **Readiness for sentence-ecosystem authoring** (§12): **L1 READY WITH BOUNDED GAPS** (freeze
  FP-1 + register G1 identities, then author); L2-L10 READY WITH BOUNDED GAPS behind their
  named CA/FP decisions (L7 READY); Content Factory schema and event/mastery implementation
  **NOT READY** (by design — later workstreams). No count in this summary is fabricated; where
  sources cannot support a number, the body says `TBD` or gives a band.

---

## 2. Authority and source map

| Question | Governing authority | Class |
|---|---|---|
| Lesson sequence, titles, purposes, tiered status | Curriculum Charter v1.0 §5 (CC-004: L0-L6 founder-locked/shipped; L7-L15 approved working sequence, runtime-registered, learner-hidden) | **Canonical** |
| Communicative outcomes per lesson | Charter §5 purpose lines + the individual lesson specs (vault-documented working authority under the Charter) | Canonical (purpose) + working spec (detail) |
| Acquisition counting (what counts as Active-new) | PRJ-015 Item-Counting Contract v1.0 (IC-001…IC-006; three contexts; 1-3 normal / 4 max / integrations 0; `8-15 active-new` SUPERSEDED) | **Canonical** |
| Active-new invariant ownership | Content Bible §5.2 (1-4 founder-ratified; integrations 0) — Curriculum consumes, never re-owns | **Canonical** |
| A/R/G semantics; ghost never required; blocked-production | Content Bible §4.7/§4.10/§15.2; Lesson Flow Canon §2; Payload Economy §2-3 | **Canonical / locked design canon** |
| L1-L5 payload enrichment targets (Kademe 2) | Payload Economy v0 §6 (founder-locked 2026-07-04) | **Founder-locked planning canon** |
| Repair-pair curriculum home | Curriculum Charter §8 (CC-007: `je ne comprends pas` + `vous pouvez répéter ?` home in the **L1 Survival Kit redesign**; L13 assumption blocked until it lands) | **Canonical** |
| Survival-formula wording | Content Bible §15.3 (locked: `vous pouvez répéter ?`, never inverted) | **Canonical** — supersedes the L1 spec's `Pouvez-vous répéter ?` surface |
| Chip identity, decomposition, piecesUsed | chip-taxonomy v0.3; Content Bible §4; PROTECTED_CHUNKS/SURVIVAL_FORMULAS (frozen/closed) | Canonical + locked lint |
| Evidence, weakness, admissibility, non-signals | Mastery & Evidence Bible v1.0 (FQ-1…FQ-8; I-1…I-37) | **Canonical** |
| Lesson flow, screen/beat budgets, discovery vs assessment | Lesson Flow Canon v1; Content Bible §6 | Canonical / closed design canon |
| Exercise eligibility and slice priorities | `EXERCISE_VARIATION_INVENTORY_v0.1.md` (post 2026-07-31 decision fold: 12 P0 / 25 P1 / 10 P2 / 6 reject; FD-1…FD-7 decided) | **Workstream (Draft)** |
| Content Factory derivation rules | CONTENT_FACTORY_CONTRACT.md + Charter §4.7 | Operator-approved contract + workstream |
| ID scheme | canonical-item-id-convention v0.1 (prefix:slug design convention) vs runtime kebab (`chunk-je-vais`) — Content Factory Contract §1.3: **runtime kebab is the authoring reality**; migration deferred | Convention (design) vs current reality |
| Implementation reality (registries, payloads, flags, tests) | `content/itemRegistry.ts` (54 frozen IDs), `content/learning-engine/items.ts` (59 fixture IDs), `content/lessons/v1/lesson-000…015`, Home cap ≤ L6, `shipped-item-ids.json` manifest | **[CURRENT REALITY]** — establishes what exists, never product authority |
| Legacy/historical | `data/lessons/lesson1-24.ts` (superseded 24-lesson syllabus), full L07 aller spec (superseded as next PR), archived design notes | Historical only |

**Unresolved-conflict register** (details in the lesson cards and §11): the Payload-Economy
tier demotions vs the L1-L5 spec tiers (PE wins — founder-locked, later); the L6 spec's 4
active-new vs PE's "L6 gets NO new items" + archetype-#10 binding 0 (**genuine conflict, §4.6**);
spec identity-context counts (9/10/10/8/8/4/…) vs PRJ-015 acquisition counting (this map recounts
— PRJ-015 wins); shipped compact de-scopes vs spec scope for L1-L6, L8, L9 (restoration is a
per-lesson decision, §13); shipped L8's `oui`-as-trap-only vs PE §4.2 oui rehabilitation (PE
wins; shipped is non-conforming current reality); legacy L7-L10 titles (Questions/Numbers/Food/
Faire) superseded by the v1 spine.

---

## 3. Current L1-L10 spine

[SOURCE] Sequence and purposes per Curriculum Charter §5 (CC-004). Titles are the current
authoritative ones; shipped runtime titles shown where they differ.

| Lesson | Current title | Lesson role | Communicative outcome | Primary scene | Main capability | Authority status | Source |
|---|---|---|---|---|---|---|---|
| L1 | Survival Kit | Acquisition (social-survival + chunk) | Greet, polite request (`je voudrais ___`), rescue, leave | Café / bakery exchange | Polite request engine + survival repair | Founder-locked, shipped, frozen; **redesign named home for repair pair (CC-007)** | CC §5/§8; L01 spec |
| L2 | Être | Acquisition (architecture verb) | Say who/what I am; `c'est`; only `je suis` active | Meeting someone | Identity engine `je suis` | Founder-locked, shipped, frozen | CC §5; L02 spec |
| L3 | Non | Acquisition (negation/social choice) | `ne…pas` productive; yes/no; polite refusal | Conversational control | Negation transform + answer words | Founder-locked, shipped, frozen | CC §5; L03 spec |
| L4 | J'ai | Acquisition (avoir human states) | Say how I feel / what I have with `j'ai`; être↔avoir contrast | Arriving tired/hungry | State engine `j'ai` | Founder-locked, shipped, frozen | CC §5; L04 spec |
| L5 | Un, une | Acquisition (article/noun system) | Articles as noun packages; `le/la` supported | Naming/ordering objects | Gender-package operation | Founder-locked, shipped, frozen | CC §5; L05 spec |
| L6 | Un petit moment | **Integration** (#10) | First integration; 0 new grammar; human-context broadening | Classroom / small-group help | Recombination of L0-L5 | Founder-locked, shipped, frozen (last visible lesson — Home cap) | CC §5; L06 spec |
| L7 | Je vais | Acquisition (**frozen-chunk doorway**) | Say you're heading home; close the moment | Leaving / heading off | `je vais` frozen next-step chunk | Approved working sequence; compact spec supersedes full aller spec; runtime-registered, hidden; **implementation blocked pending smoke** | CC §5; L07 compact spec |
| L8 | C'est où ? | Acquisition (question/location control) | Ask where something is via fixed frames | New place after class | Where-question control | Approved working sequence; registered, hidden; shipped payload is a compact de-scope of the spec | CC §5; L08 spec |
| L9 | Faire une pause | Acquisition (split-sense verb) | Split-sense `faire` — small action / pause only | Rest after class | Small-action `faire` | Approved working sequence; registered, hidden; compact de-scope | CC §5; L09 spec |
| L10 | Une petite journée | **Integration** (#10, "After Class") | Chain L6-L9 engines in one natural human flow; pouvoir preview hook | After class | Engine chaining; recombination payoff | Approved working sequence; registered, hidden; **integration Active-new = 0 binding** | CC §5; L10 spec; PRJ-015 §7 |

[SOURCE] Title drift note: the L10 spec is "After Class (Putting It Together)"; the shipped
runtime titles it "Une petite journée". The Charter's ratified title row is "Une petite journée /
Integration 'After Class'" — both names refer to the same ratified lesson; this map uses the
Charter form.

---

## 4. Lesson-by-lesson acquisition cards

### 4.0 Common contracts (apply to every card; stated once)

- **Counting.** Every "Counts as Active-new?" cell follows PRJ-015: only new learner-facing
  active **production demands** count; meta/`phen:`, sentence anchors, sounds, culture notes,
  traps, recognition-only, supported-only, ghost, and recycled material never count; linked
  sub-identities count once per productive concept (IC-003); promotion to active counts as one
  demand; integrations are 0.
- **A/R/G.** Ghost enriches scenes and reveals only — never required output, never in
  `piecesUsed`, never penalized. Recognition supports meaning and later familiarity — never
  required production. No in-lesson silent promotion; promotion is an explicit status-marked
  event. French correctness and naturalness are never traded for prerequisite convenience; no
  masculine-first default (feminine/masculine display follows the sentence's actual speaker/
  context, CB §15.4).
- **Evidence (card L baseline).** Every lesson supports: exposure (`item_seen`), recognition,
  controlled production, open-production attempt (ungraded Weave/Say-It), self-correction
  (confirm step), hint use (assistance-scoped, FQ-3), recall, and cross-lesson reuse events —
  all on the **shared** event spine; Stats derives from these projections, never a separate
  progress counter. **Never inferred:** popup opened ≠ mastery; audio replay ≠ failure; Ghost
  not produced ≠ error; freeform text ≠ broad grammar mastery; orthographic near miss ≠ concept
  weakness (FQ-1); lesson completion ≠ mastery; interstitial/anatomy viewing produces no mastery
  evidence.
- **Mon Lexique (card I baseline).** Visibility requires production evidence
  (`productionSuccess > 0`) or weakness; recognition/exposure alone never adds an item
  [CURRENT REALITY: `mastery.ts` monLexiqueStatus rule — conforming here]. Ghost items never
  appear as learned. Parent chips remain the primary entries; child pieces appear only through
  anatomy/containing-pieces surfaces, never as independently "learned" rows.
- **Flashcards (card J baseline).** Only the four decided primary directions (intent/meaning →
  FR recall · sentence context → missing piece · scenario → response recall · audio →
  meaning/target recognition) + selective FR→meaning for faux-ami/early-recognition review.
  Direction eligibility follows item state; recognition-stage items are never demanded in recall
  directions; the legacy `data/flashcards.ts` store is not the architecture.
- **Content Factory (card M baseline).** Inputs: approved acquisition ledger + registry IDs +
  approved sentence families + chip taxonomy + this map's constraints. AI may propose sentences,
  distractors, examples, first-pass annotations. AI may **not**: decide curriculum treatment,
  create hidden Active-new demands, promote items, approve its own French (`FrenchQAStatus:
  PASS` requires a named human), invent canonical identities, publish unvalidated sentences, use
  ghost material as required output, or split protected chunks. All generation passes
  deterministic validators (typecheck / validate:content / validate:pools class) + French QA
  gate before approval.
- **Practice Hub (card K baseline).** Hub volume derives from approved sentence families +
  learner state; it is optional-but-urged and never gates the path; it must not become a second
  curriculum — every hub item traces to a lesson-introduced identity.

Card-B ledger column key: Treatment ∈ Active / Recognition / Ghost / Meta / Sentence-context;
"Earliest evidence" = strongest safe class from the Exercise Inventory §6 vocabulary.

---

### 4.1 L1 — Survival Kit

**A. Identity.** Acquisition lesson (social-survival + chunk archetypes, both full-cycle —
deliberate exception). Promise [SOURCE L01 spec]: *"greet someone, ask for what I want politely,
recover when I'm stuck, and leave politely."* Scene: café/bakery exchange (open → ask → change
slot → get stuck → recover → leave). Prerequisites: L0 bridge carry-in (`chunk-bonjour`,
`chunk-je-voudrais`, `noun-cafe`, `chunk-sil-vous-plait`). Why here: the survival/politeness
doorway is the product's first real moment; CC-007 additionally homes the repair pair in this
lesson's redesign. **This card plans the L1 redesign target** (PE Kademe 2 + CC-007), not the
shipped 5-item compact slice, which remains [CURRENT REALITY].

**B. Acquisition ledger.** [REC] reconciled to Payload Economy §6 (founder-locked) over the
older spec tiers; conflicts shown.

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| bonjour | formula chunk (opener) | Active | Recycled (L0) | No (recycled) | unscaffolded | controlled production | whole-first | `chunk-bonjour` | PE §6; shipped |
| je voudrais (+ frame `je voudrais ___`) | spine chunk + linked frame | Active | Recycled (L0) | No | unscaffolded, slot-productive | controlled production | — | `chunk-je-voudrais` (frame = linked identity, no separate ID) | PE; IC-003 example |
| un café | noun package | Active | Recycled (L0) | No | unscaffolded | controlled production | package stays whole | `noun-cafe` / `chunk-un-cafe` (**dual identity — §11**) | shipped; §55.2 debt |
| s'il vous plaît | formula chunk (politeness landing) | Active | Recycled (L0) | No | unscaffolded | controlled production | **whole through slice** | `chunk-sil-vous-plait` | PE; chip-taxonomy §5 |
| **merci** | formula chunk (thanks) | Active | **New** | **Yes (1)** | unscaffolded | controlled production | whole-first | `chunk-merci` | PE §6 (sole PE L1 active) |
| **au revoir** | formula chunk (close) | Active | **New** [REC — move from shipped L6] | **Yes (1)** | unscaffolded | controlled production | whole-first (unpack `revoir` much later) | `chunk-au-revoir` | L01 spec (active); shipped at L6; [DECISION NEEDED → §13 CA-1] |
| excusez-moi | formula chunk (attention opener) | **Supported** (PE demotes spec's active) | New | No | scaffolded ≥2 uses | controlled production (supported) | whole-first | **IDENTITY GAP — ID assignment deferred** | PE §6 vs L01 spec |
| je ne comprends pas | **survival formula** (closed class) | **Supported** | New | No | scaffolded whole-formula | recall (formula) | **yes — never split at acquisition** | **IDENTITY GAP — ID assignment deferred** | PE §4.1/§6; CC-007 |
| vous pouvez répéter ? | **survival formula** (closed class; locked non-inverted surface, CB §15.3) | **Supported** | New | No | scaffolded whole-formula | recall (formula) | **yes** | **IDENTITY GAP — ID assignment deferred** | PE §4.1/§6; CB §15.3 supersedes spec's `Pouvez-vous répéter ?` |
| un thé | noun package (service variation) | **Supported** | New | No | scaffolded slot filler | controlled production (supported) | package whole | **IDENTITY GAP — ID assignment deferred** (`noun-the`+`chunk-un-the` pair planned, PE §6 note) | PE §6 |
| un croissant / madame / monsieur | noun package + address forms | **Ghost** | New | No | none — never required | exposure | — | none (ghost needs no production ID now) | PE §6 (spec had croissant active — PE demotes) |
| je veux | chunk (register trap) | Recognition (trap only; do-not-chip) | New | No | none; wrong-option only | recognition (trap) | — | none (trap string) | PE §6; L01 spec trap |
| cognate/sound set (merci≈mercy, silent finals, CaReFuL, é-ay) | phen/sound/cog cluster | Meta | New | No | none | exposure | — | partial (`sound-elision` etc. exist for later lessons) | L01 spec §recognition |
| register/politeness phenomenon (je veux vs je voudrais) | phen | Meta | New | No | none | exposure (insight) | — | none needed | L01 spec; EXERCISE_CANON §9 |
| bonsoir, salut, pardon, où est ___, la gare, réserver une table, baguette | misc spec material | **Deferred out of slice L1** [REC] | — | No | none | — | — | — | L01 spec items not in PE lock; kept as backlog/Practice-Pool candidates, not L1 payload |

**C. Active-new count audit.** [REC] Computed Active-new = **2** (merci; au revoir) — inside
the 1-3 normal band. The spec's "active-new 9" is an identity-context count under the superseded
8-15 band ([SOURCE] retrospective: "the L1 'active 13' overstates generativity… fixed social
chunks counted as active"); PRJ-015 recounts it. No linked sub-identity is double-counted
(`je voudrais` frame/phen are linked, recycled). Disputed: whether au revoir is L1 (spec) or L6
(shipped) — this map recommends L1 (a survival kit that cannot close politely is incomplete);
routed as CA-1. L10 = 0 confirmed (§4.10).

**D. Protected / unpack-later.** Protected wholes: `s'il vous plaît`, `merci`, `au revoir`,
`excusez-moi`, both survival formulas (closed class), `bonjour`. Earliest anatomy: none in L1 —
whole-first throughout; `je voudrais` anatomy (je + voudrais, lemma vouloir named-not-taught) is
Chip Anatomy Reveal material from L1 **post-contact, optional, evidence-free**; `je ne comprends
pas` decomposition waits for L3 (negation owned). Items whole throughout L1-L10: `s'il vous
plaît`, `au revoir` (unpack `revoir` post-slice), `excusez-moi` (unpack post-slice).

**E. Sentence ecosystem requirements** (families, not pools; budgets in §7):

| Family | Purpose | Treatment mix | Suitable variations | Prohibited | Band |
|---|---|---|---|---|---|
| Acquisition (anchor + slot variations: `Bonjour, je voudrais un café / un thé, s'il vous plaît.` + close `Merci, au revoir !`) | own the request arc | A-dominant, supported slot fillers | EV-001, 010, 030, 031, 040, 042 | ghost in required slots | 8-10 |
| Rescue family (`Je ne comprends pas.` `Vous pouvez répéter ?` in breakdown mini-scenes) | survival formulas under light stress | Supported formulas + A context | EV-063, 033, 011 | grading formula orthography hard | 3-4 |
| Recognition/showcase (cognate-rich café scene lines; `madame/monsieur` ghost color) | comprehensible richness | R/G-heavy, A skeleton | EV-001, 002, 011, 014 | any required production | 5-7 |
| Register contrast (`Je veux un café.` vs `Je voudrais un café.`) | boundary teaching | A + authored trap | EV-013, 012; IS-05 | treating je veux as error when meaning lands | 2-3 |
| Practice Hub reuse (slot swaps, function-recall prompts) | volume retrieval | A only | EV-033, 010, 030, 043 | new lexis | 8-12 |
| Natural Reveal / open-weave models | reveal after free production | model-answer sentences (full sentences allowed here only) | IS-16 targets for EV-041/042 | model sentences becoming chips | 3-4 |
| Dictée/audio spans | Micro Dictée on owned chunks (`merci`, `je voudrais un café` span) | A spans only | EV-034 (Micro), EV-004 | full-sentence dictée; R/G spans | 2-3 |

**F. Exercise eligibility.** P0 path: EV-001, 010, 011, 013, 030 (late), 031, 040, 041, 042,
060 (expected-error `je veux`→upgrade is EV-062 territory, not repair), 070 projections.
P1 hub/showcase: EV-003, 004 (shadowing the formulas), 033, 043, 062 (cognate-bridge nudges),
063 (rescue scene). Inappropriate now: EV-047 (no layers yet), EV-048 (softening pair is
taught as contrast, not switch-production until L2+), EV-035/036 (anatomy pilot starts L3+),
EV-046 (single engine so far), Sentence Dictée. Repair/diagnostic: expected errors `un
baguette`-class gender slips (L5 territory — keep out), missing `bonjour` opener (EV-052
Missing Move), `je veux` register (EV-013). Audio-dependent: EV-004/EV-014 on formulas.

**G. Interstitials.** Required: IS-02 Cognate Bridge (`merci ≈ mercy`; `répéter ≈ repeat`);
IS-05 Register (`je veux` vs `je voudrais` — why softening wins); IS-06 Why This Works (the
politeness sandwich `Bonjour … s'il vous plaît`); IS-07 Notice the Pieces (request-frame slot);
IS-20 How Weave Works (one-time, before L1); IS-16 Natural Reveal (all free production);
IS-22/23 piece peeks. Optional: IS-03 Sound Pattern (silent finals, one tiny note); IS-04
Culture Bite (`bonjour`-first social doorway — the one culture bite this lesson earns); IS-08
anatomy on `je voudrais` (optional, post-contact). None produces mastery evidence.

**H. Audio & Dictée.** Recording priority items: all 6 active + 4 supported surfaces (formulas
recorded whole). Priority sentences: anchor family + rescue pair (~10-12 clips). Shadowing
(P1): `bonjour`, `je voudrais un café, s'il vous plaît`, both survival formulas (rising contour
of `vous pouvez répéter ?` — S1's intonation pedagogy). Audio Recognition: formula vs formula
discrimination. Micro Dictée: `merci`, `un café` span (post-ownership). Guided Dictée: `Je
voudrais ___ s'il vous plaît` cloze (given: everything but the A span). Sentence Dictée: none at
L1 (per Inventory §12.8). Context Dictée: deferred. No slow duplicates; playback-rate.

**I. Mon Lexique.** Eventual entries (production-gated): merci, au revoir, je voudrais, un café,
s'il vous plaît, bonjour; survival formulas appear after supported production with
"getting stronger"-class status; un thé after produced. Hidden despite exposure: croissant,
madame/monsieur (ghost), je veux (trap). Containing-pieces support: `je voudrais` → later
`voudrais`/`vouloir` lemma link; `s'il vous plaît` deliberately unexpanded in slice. Example
links: each entry ties to its acquisition sentences.

**J. Flashcards.** Eligible: intent→FR recall (merci, au revoir, je voudrais-frame); scenario→
response (the entire lesson is the scenario direction's best source: "You're stuck — say so");
audio→meaning (formulas); context→missing piece (`Bonjour, je voudrais ___, s'il vous plaît`).
Ineligible: ghost items in any direction; `je veux` cards; FR→meaning for transparent cognates
(trivial). Anti-pattern risk: isolated `merci = thank you` drilling — always context-frame the
meaning direction.

**K. Practice Hub & carryover.** Contributes: request-frame slot volume, rescue-pair retrieval,
politeness-landing repair (missing `s'il vous plaît` = EV-052). Generated: slot swaps over
approved fillers; authored: register contrasts, trap reasons. Weakness returns: formula recall,
opener omission. Spaced returns: full request arc. Carry-out: `je voudrais` → L2 (`je voudrais
être` supported), L9 (`je voudrais faire une pause`); formulas → every later lesson's rescue
beat; `un café` → L5 package work; `merci/au revoir` → L7/L10 closes.

**L. Evidence & Stats.** Per §4.0. Lesson-specific: formula recall success and request-arc
completion are the headline metrics; register-trap picks feed `politeness` weak-point candidates
(attributed); ghost café-color exposure counts only as exposure events.

**M. Content Factory.** Per §4.0. Lesson-specific: may generate slot variations over approved
fillers (`un café/un thé` + future approved nouns) and rescue mini-scenes from templates; must
not generate address-form (`madame/monsieur`) production, new fillers beyond the approved list,
or any inverted question surface. Survival formulas are template constants, never recombined
word-by-word.

**N. Risks.** Identity: 4 enrichment IDs missing (§11 — **blocks authoring**). Payload: café
centricity ([SOURCE] retrospective) — mitigate via rescue/close families, not more café lines.
Cognate dependence: L1-redesign candidate material (cognate-forward sentences from the
vertical-slice brief) must not push R/G cognates into required production. A/R/G: survival
formulas supported-not-active — production expectations must stay scaffolded. Underdevelopment
risk: low — L1 is the deep-showcase lesson.

---

### 4.2 L2 — Être

**A. Identity.** Acquisition (architecture-verb; one full-cycle engine). Promise: say who/what I
am; `c'est` reaction; **only `je suis` unscaffolded-active** [SOURCE L02 spec §2]. Scene:
meeting someone / self-introduction. Prerequisites: L1 arc + rescue pair. Why here: first
reusable verb engine after the chunk-only survival doorway.

**B. Acquisition ledger** ([REC] PE Kademe 2 over spec tiers):

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| **je suis** (+ linked `je suis ___` frame + `je suis ici` sentence realization) | spine chunk + frame + linked sentence | Active | **New** | **Yes (1)** — one productive concept (IC-003) | unscaffolded slot production | controlled production | engine stays whole (`je` is a Caveat atom) | `chunk-je-suis`, `chunk-je-suis-ici` | PE §6; shipped |
| ici | word (place deictic) | **Supported** | New | No | scaffolded inside frame | controlled production (supported) | — | `word-ici` (supported) [CURRENT REALITY: retro-fitted ID] | PE §6; shipped |
| fatigué(e) | word (state adj; feminine-form note, no agreement system) | **Supported** (PE demotes spec's active) | New | No | scaffolded state filler | controlled production (supported) | — | **IDENTITY GAP — ID assignment deferred** (absent from both registries) | PE §6 vs L02 spec; CB §15.4 gender rule |
| c'est (+ `c'est bon/vrai` reactions) | chunk (pointer) | **Supported** [REC — shipped registry status; spec wanted active promotion] | New | No | scaffolded reaction | controlled production (supported) | — | `chunk-c-est` (supported) | shipped; L02 spec conflict noted |
| là / prêt(e) | word cluster | **Ghost** (PE) | New | No | never required | exposure | — | none needed now (`chunk-tu-es-pret`/`chunk-vous-etes-pret` exist, unused) | PE §6 |
| être family forms (tu es, il/elle est, vous êtes, nous sommes…) | phen/paradigm surfaces | **Recognition** (Pattern Snapshot exposure-only map) | New | No | none — snapshot never quizzed | exposure | — | partial (`chunk-tu-es`, `chunk-vous-etes` exist, unused) | EXERCISE_CANON §6 pin; L02 spec |
| étudiant/médecin/américain, profession no-article, c'est-vs-il-est | lexis + phen cluster | **Deferred out of slice L2** [REC] (no registry slot; PE excludes médecin from Kademe 2) | — | No | — | — | — | — | EXERCISE_CANON §6 ("médecin stays a Learn Page example"); spec backlog |
| je suis vs j'ai contrast seed | phen (micro-contrast) | Meta | New (seed; central at L4) | No | none | exposure | — | `micro-je-suis-vs-j-ai` | L02→L04 anticipatory spine |

**C. Active-new audit.** Computed = **1** (`je suis` engine cluster). Band-compliant. The spec's
10 is identity-context under the superseded band. No sub-identity double-count (`je suis ici` is
a linked realization, not a second demand). No disputes beyond the c'est tier note (supported per
shipped registry + PE silence; spec's promotion not adopted — CA-2 if contested). L10 = 0 stands.

**D. Protected/unpack.** `je suis` whole; anatomy (je · suis; lemma être named) = IS-08
post-contact; Pattern Snapshot shows the map once, exposure-only. `je suis ici` is a **model
answer/sentence composite**, never a primary UI chip (chip-taxonomy verdict). No decomposition
pilot here (pilot starts L3).

**E. Sentence families.** Acquisition (`Je suis ici.` + state variations with fatigué —
*Illustrative — human French QA required*: `Je suis fatigué.` / `Je suis fatiguée.` per speaker
context) 6-8; contrast family (je suis ici / je ne suis pas ici seeds L3, recognition-band
preview within W2) 2-3; recognition/showcase (être-family lines heard/read only) 3-4; PH reuse
(state-slot swaps) 6-8; reveal models 2-3; Dictée spans (Micro: `je suis`; Guided: `Je suis ___`)
1-2. Prohibited: producing non-je forms; agreement drilling.

**F. Exercises.** P0: EV-001, 010, 013 (je suis vs j'ai seed — recognition only until L4),
030, 031, 040, 041, 042. P1: EV-004, 033, 047 seeds deferred to L3 (negation layer not yet
owned). Inappropriate: EV-047 (no layer), EV-046 (one engine), paradigm-shaped anything.
Repair: `je es` elision-class slip → EV-060 with mechanics payload. Audio: EV-014 (silent
`est`-final in later contrast — recognition only).

**G. Interstitials.** Required: IS-06 (why French drops nothing: `je suis` as engine), IS-13
Pattern Snapshot (être map, once), IS-07 (engine + slot display), IS-16. Optional: IS-03
(silent finals on `suis`), IS-02 (étudiant≈student only if the word enters — currently deferred),
IS-08 anatomy (je · suis). No culture bite (nothing earned).

**H. Audio/Dictée.** Record: `je suis`, `ici`, `fatigué(e)` + anchor sentences (~6-8 clips).
Shadowing: `Je suis ici.` Micro Dictée: `je suis`. Guided: `Je suis ___` cloze. No Sentence
Dictée yet. Audio Recognition: `je suis` vs `j'ai` sound contrast deferred to L4 (pair not yet
meaningful).

**I. Mon Lexique.** Entries after production: je suis, ici (supported path), fatigué(e) later.
Hidden: là, prêt(e) (ghost), paradigm forms (recognition). Containing-pieces: `je suis ici` →
`je suis` + `ici`. Example links to acquisition family.

**J. Flashcards.** Intent→FR (say where you are); context→missing piece (`Je suis ___`);
scenario→response ("They ask where you are"); audio→meaning (`ici`). Ineligible: paradigm forms
any direction; là/prêt. Risk: `ici = here` isolated card — context-frame it.

**K. PH & carryover.** Contributes state-slot volume; carry-out: `je suis` → L3 negation base
(first transform target), L6/L10 state returns (`Je suis fatigué` — **requires the fatigué
identity to exist**, else the L10 return collapses, [GAP §11]); `ici` → L8 (`___ est ici/là`
answers); c'est → L8 (`c'est où ?` composition). Weakness returns: engine-choice contrast
(suis/ai) from L4 onward.

**L. Evidence/Stats.** Per §4.0; headline: first transform-ready engine — controlled-production
success on `je suis ___` is the metric Stats should surface as "your first engine".

**M. Content Factory.** May generate state-slot variations over approved fillers only (ici,
fatigué(e) once registered); must not generate other persons, professions, or agreement
variation; feminine display follows sentence speaker context (CB §15.4).

**N. Risks.** fatigué(e) identity missing (**blocks L2 enrichment authoring**); L2-L3 pair is
the documented difficulty spike ([SOURCE] retrospective) — keep L2 payload floor-light;
`chunk-tu-es`/`chunk-vous-etes` registered-but-unused (registry hygiene, non-blocking);
underdevelopment risk if enrichment stalls: L2 currently ships only 3 payload surfaces.

---

### 4.3 L3 — Non

**A. Identity.** Acquisition (negation/question/social-choice archetype). Promise: say no, say
what is not true with `ne…pas`, refuse politely; yes/no by intonation. Scene: conversational
control. Prerequisites: L2 `je suis` (first transform base), L1 politeness/rescue. Why here:
negation is the first transformation layer — proof the engine is generative.

**B. Acquisition ledger:**

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| **negation transform** `ne ___ pas` (realized as `je ne suis pas`) | productive pattern + protected chunk realization | Active | **New** | **Yes (1)** — one productive operation (PRJ-015 §3 worked example) | transform owned lines | controlled production (transformation) | **`je ne suis pas` = PROTECTED_CHUNK (frozen)**; `ne`/`pas` Caveat atoms, never standalone chips | `chunk-je-ne-suis-pas`, `grammar-ne-pas-sandwich` | IC-002; CB §4.6 |
| **ce n'est pas** | protected chunk (c'est negation) | Active | New | **Yes (1)** — protected chunk = one demand (IC-004) | whole-chunk production | controlled production | **PROTECTED_CHUNK (frozen)** | `chunk-ce-n-est-pas` | PE; CB §4.6 |
| **answer-word cluster**: oui (answer), non, non merci | answer words + formula | Active | New | **Yes (1)** — [REC] one linked answer-move concept (IC-003); alternative reading = separate demands would reach 4 and need rationale | produce as answers only; `oui` never slotted inside sentences (PE §4.2 scope) | controlled production (answer move) | `non merci` formula whole | `chunk-oui`, `chunk-non`, `chunk-non-merci` | PE §4.2; L03 spec; [DECISION NEEDED → CA-3 clustering] |
| si (contradicting yes) | word (answer) | **Recognition** [REC — PE "seed only: si (inline card, no production)"] | New | No | none | exposure/recognition | — | none needed now | PE §6 |
| yes/no intonation question | phen | Meta (+ recognition practice) | New | No | intonation recognition only | recognition (audio, later) | — | none | L03 spec |
| tu / tu-vous choice | pronoun + register phen | **Recognition** [REC] — tu/vous register work stays pre-doorway (Decision Probe gated out; shipped L3 defers it) | New | No | none | exposure | — | `pronoun-tu` (registered, unused) | EXERCISE_CANON v0.4 note 5; shipped designNote |
| ne…jamais/plus/rien; est-ce que preview | phen cluster | Recognition | New | No | none | exposure | — | — (est-ce que owns L12) | L03 spec |
| pas de problème | chunk | **Ghost** (PE) | New | No | never required | exposure | — | none needed | PE §6 |
| je suis, c'est, je voudrais, rescue pair, un café | prior engines | Active/Supported | Recycled | No | per prior status | — | — | existing IDs | carry-in |

**C. Active-new audit.** Computed = **3** (negation transform; ce n'est pas; answer-word
cluster) — top of the normal 1-3 band, no rationale-requiring 4. Linked-identity handling:
`ne ___ pas` frame + `je ne suis pas` chunk + `grammar-ne-pas-sandwich` phen = one concept;
oui/non/non-merci clustering is the disputed classification (CA-3: if the founder wants
oui-rehabilitation counted separately, L3 = 4 and needs the cognitive-load rationale — the
retrospective already flags L3 as the spike's second half). L10 = 0 stands.

**D. Protected/unpack.** Both PROTECTED_CHUNKS live here — frozen, whole, never split into
standalone `ne`/`pas` chips. **Chip-decomposition pilot entry point**: `je ne comprends pas`
anatomy (IS-08) becomes available now that `ne…pas` is owned — showing je · comprends · ne…pas
+ lemma `comprendre` (bounded pilot candidate 1, per the folded FD-2). Discontinuous `ne…pas`
requires explicit French QA in any anatomy display. `non merci` stays whole.

**E. Sentence families.** Acquisition/transform pairs (`Je suis ici.` → `Je ne suis pas ici.`;
`C'est bon.` → `Ce n'est pas bon.`) 8-10; answer-move mini-dialogues (`— Un café ? — Oui,
merci. / Non merci.`) 4-5; recognition/showcase (spoken `ne`-drop heard-only line; si-contrast
inline) 3-4; PH transform volume 10-12; reveal models 2-3; Dictée spans (Micro: `non merci`;
Guided: `Je ne ___ pas` shape) 2-3. Prohibited: double-negation strings (validator), producing
si, tu-register production.

**F. Exercises.** P0: EV-010 (negation-shape traps), EV-013 (oui/non/non-merci move choice;
affirm-vs-negate), EV-030, EV-031 (tile-order for the sandwich — `ne`/`pas` as tiles is
**composition**, allowed; chip display is not), EV-040, EV-041, EV-042, EV-047 (**first Same
Engine New Layer** — negation onto `je suis`), EV-060 (`c'est ne pas` → smallest repair).
P1: EV-017 (What Changed: affirmative→negated), EV-035/036 pilot (survival-formula anatomy),
EV-063 (refusal inside recovery scenes). Inappropriate: register switch payloads (tu/vous),
est-ce que production, EV-021. Audio: EV-014 (hear the `ne…pas` sandwich; elision `n'`).

**G. Interstitials.** Required: IS-06 (the sandwich logic — why two pieces), IS-08 (**pilot**:
`je ne comprends pas` anatomy), IS-10 (affirm/negate contrast display), IS-16. Optional: IS-03
(elision `ne → n'`), IS-11 (spoken `ne`-drop edge card — recognition only), IS-14 (throwback to
L1 rescue formula now structurally legible). Culture: none.

**H. Audio/Dictée.** Record: negation pair sentences + answer moves (~8-10 clips). Shadowing:
`Je ne suis pas ici.` (rhythm of the sandwich). Audio Recognition: affirm vs negated (hear the
difference). Micro Dictée: `non merci`. Guided Dictée: `Je ___ suis ___ ici` (sandwich cloze,
elision-safe). Sentence Dictée: not yet. Sound clip: `ne → n'` elision (sound-teaching clip —
allowed exception class).

**I. Mon Lexique.** Entries after production: non, oui, non merci, je ne suis pas, ce n'est pas.
Hidden: si, pas de problème, tu. Containing-pieces: both protected chunks → their anatomy
(post-pilot); parent identity preserved. Relationship: negation phen links je-suis ↔
je-ne-suis-pas.

**J. Flashcards.** Scenario→response (refuse politely; contradict gently); context→missing piece
(sandwich cloze); intent→FR (say it's not true). Ineligible: si (recognition); tu. Risk:
`non = no` isolated cards — always answer-move framing.

**K. PH & carryover.** Contributes transform volume (the hub's first repair-rich family:
`je suis pas`-class slips). Carry-out: `ne…pas` → L4 (`je n'ai pas` supported band), L5
(`pas de` bridge), L9 (`je ne fais pas ça`), L10 returns; answer cluster → L8/L9 dialogue moves
(`On fait une pause ? — Oui / Non merci`) [REC — restores the weak oui path; shipped L8 uses oui
as trap only, non-conforming with PE §4.2]. Weakness: negation-shape tags.

**L. Evidence/Stats.** Transformation evidence debuts here (first `wrong_order`/negation-shape
classes); Stats: "you can now say what is not".

**M. Content Factory.** May generate transform pairs over owned engines only; templates lock
the sandwich; must never generate double negation, si-production, tu-register lines, or split
protected chunks into required sub-parts.

**N. Risks.** L2-L3 spike ([SOURCE] retrospective) — hold at 3 demands, resist 4; oui-cluster
counting dispute (CA-3); negation stays supported-band in L4-L5 and "never becomes fully owned"
([SOURCE] retrospective flag) — the slice must give it L9/L10 productive returns; anatomy pilot
must not leak `ne`/`pas` standalone chips.

---

### 4.4 L4 — J'ai

**A. Identity.** Acquisition (avoir-state archetype). Promise: say how I feel / what I need with
`j'ai` — the French way, not translated `I am`. Scene: arriving tired/hungry. Prerequisites: L2
`je suis` + fatigué seed, L3 negation (supported reuse). Why here: second engine + the
signature être/avoir contrast.

**B. Acquisition ledger:**

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| **j'ai** (+ `j'ai ___` state/possession frame; realizations `j'ai faim`, `j'ai une question`) | spine chunk + frame + linked realizations | Active | **New** | **Yes (1)** | unscaffolded state/possession production | controlled production | elision `j'` never split | `chunk-j-ai`, `chunk-j-ai-faim`, `chunk-j-ai-une-question` | PE §6; shipped |
| faim | word (state noun) | **Supported** | New | No | scaffolded filler | controlled production (supported) | — | `noun-faim` (supported) [CURRENT REALITY: retro-fitted] | PE §6; shipped |
| une question | noun package | **Supported** | New | No | scaffolded filler | controlled production (supported) | — | `noun-question` / `chunk-une-question` (**dual identity — §11**) | PE §6; shipped |
| soif | word (state noun) | **Supported** (PE demotes spec's active) | New | No | scaffolded | controlled production (supported) | — | **IDENTITY GAP — ID assignment deferred** | PE §6 vs L04 spec |
| une idée | noun package | **Supported** (PE; reuses dormant id) | New | No | scaffolded | controlled production (supported) | — | `noun-idee` (registered, dormant) | PE §6 (R4 payoff) |
| j'ai froid / j'ai chaud | chunk cluster | **Ghost** (PE: "example copy only, no production") | New | No | never required | exposure | — | none needed | PE §6 |
| être↔avoir contrast (`je suis faim` trap) | phen (micro-contrast) | Meta (+ authored trap) | Elevated from L2 seed | No | none (trap discrimination is EV-013 work) | recognition (diagnostic-capable) | — | `micro-je-suis-vs-j-ai` | L02/L04 specs |
| j'ai besoin de | chunk + frame | **[DECISION NEEDED → CA-4]** — spec: active-new; PE: not in Kademe 2; shipped: deferred; L9/L10 recombinations assume it owned | — | No (pending) | pending | — | elision `d'` QA | **IDENTITY GAP — ID assignment deferred** | L04 spec vs PE §6 vs L10 spec §2 |
| avoir family forms; j'ai envie de; ne…plus preview; peur/chien/âge | paradigm + backlog cluster | Recognition / deferred out of slice | New | No | none | exposure | — | — | L04 spec; PE excludes |

**C. Active-new audit.** Computed = **1** (`j'ai` engine cluster; faim/question/soif/idée are
supported fillers evaluated through their own status, per the PRJ-015 `un café` example). No
double-counting. Disputed: `j'ai besoin de` (CA-4) — if promoted here as a second demand, L4 = 2
(still in band); this map recommends exactly that resolution but does not decide it. L10 = 0.

**D. Protected/unpack.** `j'ai` = elision unit — anatomy (je · ai, lemma avoir) is IS-08
material **with explicit French QA** (elision display); never whitespace-split. `j'ai faim` is
composition (j'ai + faim), already atomized in recap per chip canon. No new protected chunks.

**E. Sentence families.** Acquisition (`J'ai faim/soif.` `J'ai une question/idée.`) 6-8;
signature contrast family (`J'ai faim.` vs ✗`Je suis faim.`; `Je suis fatigué, mais j'ai faim.`
— `mais` recognition-band connective) 3-4; negation reuse (`Je n'ai pas faim.` supported band)
2-3; showcase/ghost (`j'ai froid/chaud` example copy) 2-3; PH volume (state swaps; suis/ai
discrimination) 8-10; reveal models 2-3; Dictée (Micro: `j'ai faim`; Guided elision cloze) 2-3.
Prohibited: requiring ghost states; `il y a` (deferred doorway); age.

**F. Exercises.** P0: EV-010 (traps: `je suis faim`, `j'ai fatigué`), **EV-013 as the flagship
engine-choice micro-contrast (suis vs ai)**, EV-030, EV-031, EV-040, EV-041, EV-042, EV-060
(**Wrong Architecture Repair: `je suis faim` → `j'ai faim`** — canon's own example). P1:
EV-046 seed (`une question` slot across `j'ai`/`je voudrais` — first two-engine transfer),
EV-017, EV-004, EV-071 (suis/ai diagnostic probe once error data exists). Inappropriate:
possession expansion, paradigm work, EV-048. Audio: EV-014 (`j'ai` vs `je suis` heard).

**G. Interstitials.** Required: IS-06 (why French *has* hunger — the avoir philosophy, one
notch deeper for the nerdy learner), IS-10 (suis/ai contrast), IS-16, IS-31 (trap reasons).
Optional: IS-03 (elision `j'`), IS-01 (faux ami: `j'ai chaud` ≠ "I'm hot" flavor — display
only), IS-08 (`j'ai` anatomy), IS-14 (throwback: fatigué from L2 meets faim). Culture: none.

**H. Audio/Dictée.** Record: state family + contrast pair (~8 clips). Shadowing: `J'ai faim.`
/ `Je suis fatigué, mais j'ai faim.` Audio Recognition: **suis/ai minimal-ish discrimination**
(kept as EV-014 payload; true minimal-pair EV-015 stays P2). Micro Dictée: `j'ai faim` (elision
writing). Guided: `J'___ faim` (elision-focused cloze — sound-teaching clip allowed). Sentence
Dictée: earliest candidate `J'ai une question.` **only after** the L4 material is
production-eligible (selective, integration-checkpoint timing).

**I. Mon Lexique.** Entries after production: j'ai, faim, une question (+soif/idée when
registered). Hidden: froid/chaud (ghost), paradigm forms. Containing-pieces: `j'ai faim` →
j'ai + faim; question package dual-identity must resolve to **one** primary entry (§11).

**J. Flashcards.** Intent→FR (say you're hungry/thirsty); context→missing piece (`J'ai ___`);
scenario→response (arriving hungry); audio→target (suis vs ai heard). Selective FR→meaning:
faux-ami-flavored `j'ai chaud` review card (recognition). Risk: state-noun isolation
(`faim = hunger`) — frame in `j'ai` context always.

**K. PH & carryover.** Contributes the suis/ai discrimination family (highest-value early
repair material) + state volume. Carry-out: `j'ai` → L5 possession frames (`J'ai un café.`),
L10 (`j'ai une question` return; `j'ai besoin d'aide` **if CA-4 lands**); `une question` → L5
package pair; negation-band `je n'ai pas` → L5 `pas de` bridge (kept supported).

**L. Evidence/Stats.** Engine-choice diagnostic evidence debuts (EV-013/EV-071 feed
`avoir-vs-etre` weak-point tags — attributed, not raw). Stats: two engines + a contrast.

**M. Content Factory.** May generate state/possession swaps over approved fillers; contrast
pairs from the authored trap templates only; never `il y a`, never ghost-state production,
never paradigm rows.

**N. Risks.** `soif` and (if CA-4) `besoin-de` identities missing (**blocks L4 enrichment
authoring**); dual `question` identity (mastery-split hazard, §11); ghost froid/chaud leaking
into fills (validator V3 guards); L4 was already lightened once — keep it light.

---

### 4.5 L5 — Un, une

**A. Identity.** Acquisition (object/article/noun-system archetype; the mid-slice structural
checkpoint per Charter §8). Promise: ask for and name objects with the right little word —
articles as **noun packages**, gender enters as package fact, not rule. Scene: café ordering /
naming objects inside known frames. Prerequisites: L1 request engine, L4 `j'ai`, L3 negation
(for `pas de` bridge). Why here: the package operation generalizes every noun the slice will
ever add.

**B. Acquisition ledger:**

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| **article-noun package operation** (`un/une ___` as productive choice, realized over `un café` / `une question`) | productive pattern (phen + frame) over recycled packages | Active | **New (operation)** | **Yes (1)** — packages themselves are recycled and "evaluated through their own acquisition status" (IC-003) | choose/produce correct package | controlled production | packages stay whole (article never detached early) | `grammar-un-une-package`, `chunk-un-cafe`, `chunk-une-question` | PE §6; PRJ-015 §4 |
| un thé | noun package (gender pair with une table) | **Supported** (second L5 role of the L1 item) | New-to-L5 | No | scaffolded | controlled production (supported) | whole | **IDENTITY GAP — ID assignment deferred** (planned `noun-the`+`chunk-un-the` pair) | PE §6 |
| une table | noun package | **Supported** | New | No | scaffolded | controlled production (supported) | whole | **IDENTITY GAP — ID assignment deferred** | PE §6 (spec had it active) |
| le / la | article cluster | **Recognition→Supported** [DECISION NEEDED → CA-5: spec supported vs shipped deferred] | New | No | at most scaffolded identification | recognition | homograph `la`/`là` QA | none | L05 spec vs shipped designNote |
| pas de (negated object) | frame bridge | **Supported** [REC keep, low weight] | New | No | scaffolded | controlled production (supported) | `de/d'` elision QA | none | L05 spec; chip-taxonomy §6 example |
| un restaurant / une maison | noun packages | **Ghost** (PE) | New | No | never required | exposure | — | none needed (maison acquires at L7 as `à la maison` chunk) | PE §6 |
| les/des/partitives; -tion feminine; agreement display | phen cluster | Recognition/Meta | New | No | none | exposure | — | — | L05 spec |
| gender phenomenon | phen | Meta (accumulated recognition — "shown not drilled") | Elevated | No | none | exposure | — | `grammar-un-une-package` | retrospective §hidden-prereq |

**C. Active-new audit.** Computed = **1** (the package operation). The two supported packages
(thé/table) deliberately do not count (supported). Disputed: none internal; CA-5 affects
presentation only. L10 = 0.

**D. Protected/unpack.** Packages stay whole; **chip-decomposition pilot candidate 3** (per
folded FD-2): article/package structure anatomy at L5 — IS-08 shows `un · café` boundary
(gender as package property), EV-036 may probe which split is right (`un-café` vs `u-n café`
nonsense distractors are **not** acceptable — authored linguistic splits only); EV-035 rebuild
(`un` + `café` → `un café`) is the lowest-risk rebuild in the slice. `l'`-elision packages
(l'eau) stay out (later band).

**E. Sentence families.** Acquisition (package choice in owned frames: `Je voudrais une table.`
*Illustrative — human French QA required*) 8-10; gender-pair contrast (un café/un thé vs une
question/une table) 4-5; negated-object bridge (`Je n'ai pas de café.`) 2-3; showcase/ghost
(restaurant/maison color) 3-4; PH volume (package swaps across `je voudrais`/`j'ai`/`c'est`)
10-12; reveal models 2-3; Dictée (Micro: `un thé`, `une table`; Guided package cloze) 2-3.
Prohibited: zero-article production, partitive production, agreement drills.

**F. Exercises.** P0: EV-010 (**package-choice payload is the canonical L5 fill**), EV-013
(un/une discrimination), EV-030, EV-031, EV-040, EV-041, EV-042, EV-060 (article-only smallest
repair). P1: **EV-046 (Same Slot New Job: package across `je voudrais`/`j'ai` — the two-job
transfer)**, EV-035/036 (package anatomy pilot), EV-020 (Mayonnaise on cognate spellings —
P2 but noted), EV-004. Inappropriate: partitives, plurals, EV-048. Audio: EV-014 (un/une heard
— nasal contrast is hard; recognition only, generous).

**G. Interstitials.** Required: IS-06 (package logic — "the noun comes with its word"), IS-08
(**pilot**: package anatomy), IS-16, IS-31. Optional: IS-03 (-tion → la pattern, one note),
IS-02 (table≈table — trivial cognate, use for spelling-delta instead), IS-01 (faux-ami slot
reserved if a real one enters), IS-14 (throwback: un café from L0 now explained). Culture:
none.

**H. Audio/Dictée.** Record: package pairs + acquisition family (~8-10 clips). Shadowing:
package pairs (nasal `un` vs `une`). Audio Recognition: which package did you hear (un/une —
generous, recognition-band). Micro Dictée: `un thé` / `une table` (**the article-spelling
teaching case**). Guided: `Je voudrais ___ table` class. Sentence Dictée: `Je voudrais un café,
s'il vous plaît.` becomes eligible here (all-A span, integration-checkpoint timing). Minimal
pair un/une as scored EV-015: **P2, stays out**.

**I. Mon Lexique.** Entries: packages as package entries (un café, une question, un thé, une
table) — bare nouns become linked sub-identities only when independently needed (IC-004).
Hidden: restaurant/maison, les/des. Containing-pieces: package → article + noun (post-pilot
anatomy). The dual café/question identities must project as **one** entry each (§11).

**J. Flashcards.** Context→missing piece (**package gap is the flagship L5 card**); intent→FR
(ask for a tea); audio→target (un/une heard); scenario→response (ordering variation).
Selective FR→meaning: none needed. Risk: gender-quiz drift ("what gender is table?" is
banned framing — always package-in-use).

**K. PH & carryover.** Contributes package volume + gender-slip repair family. Carry-out:
package operation → every future noun the slice adds (thé/table immediately; L7 `à la maison`
uses the article inside a frozen PP; L8 `le café est ici` if CA-5 lands le/la); `pas de` →
later partitive doorway (post-slice); packages → L10 request returns.

**L. Evidence/Stats.** Package-choice evidence + article weak-point tags (gender/articles,
attributed); Stats: "objects now come packaged".

**M. Content Factory.** May generate package swaps over the approved package list ONLY
(closed list; no new nouns without registration); gender assignment is authored fact — AI
never infers gender; contrast pairs from templates.

**N. Risks.** thé/table identities missing (**blocks L5 enrichment**); dual identities (§11)
make package mastery split — resolve before event spine work; cognate-spelling interference
(table/table) is a feature for Mayonnaise but a Dictée precision-trap — keep FQ-1 semantics;
checkpoint depth (Charter §8) means L5 gets the second-deepest ecosystem — budget reflects it.

---

### 4.6 L6 — Un petit moment

**A. Identity.** **Integration lesson** (archetype #10; shipped as "summit-gate", last visible
lesson). Promise: carry a whole small French moment; recombine L0-L5 as a person, not a
customer. Scene: classroom/small-group help — deliberately non-café. Prerequisites: entire
L0-L5 spine. Why here: settles the documented L2-L3 spike and breaks café-centricity before the
L7-L9 engine run.

**B. Acquisition ledger.** **[GAP — genuine curriculum conflict.]** Three sources disagree:
the L6 spec introduces 4 active-new (`word:aide`, `chunk:j-ai-besoin-d-aide`, a negated-state
frame, an identity-contrast sentence pattern); Payload Economy §6 (founder-locked, later) says
*"L6 gets NO new items"*; archetype #10 is now **binding at Active-new 0** (PRJ-015 §7); the
shipped payload added exactly one new item (`chunk-au-revoir`). This map plans L6 at **0
Active-new** (Canonical counting wins) and routes the displaced material:

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| L0-L5 engine set (bonjour, je voudrais+frame, je suis, j'ai, ne…pas, ce n'est pas, answer cluster, packages, formulas, merci, s'il vous plaît) | recycled spine | Active/Supported | **Recycled** | No | recombination production | controlled production (recombination) | as before | existing IDs | L06 spec §recycled |
| au revoir | formula chunk | Active | Recycled **if CA-1 moves it to L1**; else the shipped L6-new fact stands as a conflict with integration-0 | No under CA-1; **1 if left L6-new (violates binding 0)** | unscaffolded close | controlled production | whole | `chunk-au-revoir` | shipped designNote vs PRJ-015 §7; **CA-1** |
| word:aide / j'ai besoin d'aide / comprendre / je voudrais comprendre / mais | spec's displaced set | **Routed out of L6** [REC]: aide+besoin cluster → CA-4 (acquisition home L4 or a later acquisition lesson); `comprendre` stays inside the survival formula until post-slice; `mais` recognition connective in context | — | No | — | — | — | **IDENTITY GAP** (aide/besoin/mais) | L06 spec vs PE §6; CA-4 |
| integration/recombination skill; human-context phen | phen | Meta | New | No (meta never counts) | none | — | — | none | IC-002 |
| je voudrais aller (L7 hook) | chunk preview | Recognition | New | No | none — preview only | exposure | — | none | L06 spec §recognition |

**C. Active-new audit.** Computed = **0** (binding for integrations) — conditional on CA-1
(au revoir → L1). If CA-1 is rejected, L6 carries a 1-item violation inherited from shipped
reality, which must then be explicitly reconciled by curriculum authority, not silently kept.
Meta phenomena excluded per IC-002. L10 = 0 stands.

**D. Protected/unpack.** No new structures. Recap `piecesUsed` must stay atomic — [CURRENT
REALITY] the earlier L6 sentence-chip regression (`Je suis ici`, `J'ai une question` as recap
chips) is the canonical negative example (chip-taxonomy §2); integration recaps list pieces,
never sentences.

**E. Sentence families.** Integration/recombination scenes (greet → state → not-ready → ask →
refuse politely → recover → close; **zero new lexis, model-answer recombinations**) 8-10;
showcase (contrast: person-not-customer scene) 4-6; PH reuse (mixed-engine retrieval) 8-10;
reveal models 2-3. No acquisition family. Prohibited: any new-lexis smuggling ("payoff pass:
model answers/scenes only, 0 new lexis" — PE §6 note).

**F. Exercises.** P0: EV-001 (scene meets), EV-010/013 (mixed-engine discrimination), EV-030/031
(recombination assembly), EV-040/041/042 (the first **open** mixed Weave shipped here stays),
EV-070. P1 (integration payoff set): **EV-050 Moment Builder Board (the archetype's payoff, max
1)**, EV-044 Continue the Moment, EV-052 Missing Move, EV-045 Combine, EV-063 recovery scene,
EV-073 Keep One. Inappropriate: new-engine anything, EV-071 (no new diagnostics — rehearsal not
test). Audio: EV-014 mixed-engine listening.

**G. Interstitials.** Required: IS-18 recap (atomic), IS-19 SRS announcement (first natural
placement — "these pieces come back"), IS-16. Optional: IS-14 Tiny Throwback (L1 formulas in
new scene), IS-21 session frames. **No new insight cards** — integration explains nothing new.

**H. Audio/Dictée.** Record: recombination scene lines (~8-10 clips). Shadowing: whole small
moment (2-3 line chain). Audio Recognition: which move comes next (discourse listening).
**Sentence Dictée checkpoint**: `Je voudrais un café, s'il vous plaît.`-class all-A sentences
are eligible here (integration-checkpoint timing per FD-3). Micro/Guided continue on formulas.

**I. Mon Lexique.** No new entries; existing entries gain where-used examples from the
non-café scene (breadth of context is the L6 Lexique contribution). Recognition-only preview
(`je voudrais aller`) stays hidden.

**J. Flashcards.** Scenario→response is the L6 flagship direction (whole-moment prompts);
context→missing piece over recombination sentences; no new-item cards. Risk: integration
becoming a quiz — cards stay retrieval-calm.

**K. PH & carryover.** Contributes the first mixed-engine hub family + moment templates.
Carry-out: recombination skill → L10; human-context scene → L8-L10 after-class world;
`je voudrais aller` preview → L7 doorway.

**L. Evidence/Stats.** Recombination evidence (multi-engine controlled production) debuts;
completion is attempt-coverage, never mastery [CURRENT REALITY `selectLessonProgress`]; Stats:
"first whole moment" — from events, not a badge.

**M. Content Factory.** May generate recombination scenes from owned inventory ONLY (C1-style
generation constraint); zero new lexis is a hard generation rule; scene templates authored.

**N. Risks.** The 4-way L6 conflict (spec vs PE vs archetype-0 vs shipped+1) is the slice's
single biggest curriculum conflict — **blocks L6 re-authoring until CA-1/CA-4 resolve**;
aide/besoin displacement leaves "ask for help" thin until L10's recognition hook (acceptable:
`vous pouvez répéter ?` covers rescue); L6 currently carries the Home cap — visibility bump is
a separate smoke-bearing product decision, out of scope here.

---

### 4.7 L7 — Je vais

**A. Identity.** Acquisition (**frozen-chunk doorway** — compact spec is authoritative; full
aller spec superseded-as-next-PR, deferred not cancelled). Promise: close a small moment and
say you're heading off — `Je vais à la maison. Au revoir.` Scene: leaving/heading off.
Prerequisites: L6 moment arc. Why here: first post-integration doorway, deliberately minimal
after the integration beat. [SOURCE] Implementation blocked until L0-L6 device smoke + Round 1
results — an operator gate this map inherits, not re-decides.

**B. Acquisition ledger** ([SOURCE] compact spec; shipped payload honors it exactly):

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| **je vais** | frozen chunk (no conjugation, no futur proche) | Active | **New** | **Yes (1)** | frozen-chunk production; `Je vais.` alone is minimal-acceptable | controlled production | whole; **not** an aller-system opener | `chunk-je-vais` | L07 compact spec |
| à la maison | frozen destination unit (**not** the à/au/à la rule) | **Supported** | New | No | scaffolded destination tail | controlled production (supported) | whole (contraction system closed) | `chunk-a-la-maison` | L07 compact spec |
| au revoir, merci, bonjour, moment set | recycled closes | Active | Recycled | No | unscaffolded | controlled production | — | existing IDs | compact spec |
| aller paradigm, à/au/à la system, futur proche, y, où, ça va, new destinations | deferred systems | **Out of scope — strictly** (not even recognition hooks in the compact form) | — | No | none | — | — | `verb-aller` exists (supported, for L15 infinitive support) | compact spec §out-of-scope |

**C. Active-new audit.** Computed = **1**. Cleanest lesson in the slice; the compact spec is
the PRJ-015 poster child. No disputes. L10 = 0 stands.

**D. Protected/unpack.** Both new units frozen-whole through the slice; `à la maison` anatomy
(à · la · maison) explicitly **deferred post-slice** (opening it opens the contraction system);
IS-08 may show it as "whole for now". No pilot activity here.

**E. Sentence families.** Acquisition (`Je vais à la maison.` + close: `Merci, au revoir !`)
4-6; showcase (leaving-moment mini-scenes) 3-4; PH reuse (close-the-moment volume) 6-8;
reveal models 2; Dictée (Micro: `je vais`; Guided: `Je vais ___` with destination given) 1-2.
Prohibited: destination generation, futur-proche shapes (`je vais faire…` is a **trap**, not
content).

**F. Exercises.** P0: EV-001, 010, 030, 031, 040, 041, 042. P1: EV-044 (Continue: they leave —
close the moment), EV-033, EV-004. Inappropriate: EV-046 with movement (no second movement
engine), any aller-paradigm shape, EV-047 (nothing layers onto a frozen chunk). Trap:
futur-proche leak (`je vais faire une pause`) is an authored **wrong** option with trapReason,
recognition-safe. Audio: EV-014 light.

**G. Interstitials.** Required: IS-06 (one card: "je vais closes a moment" — motion-away
feeling, not tense), IS-16. Optional: IS-17 **Later Form card** (the natural home: "je vais +
action is a form for later" — W2-window, recognition-only), IS-14 (au revoir throwback).
Minimal lesson, minimal interstitials.

**H. Audio/Dictée.** Record: 4-6 clips (chunk, sentence, close pair). Shadowing: `Je vais à la
maison.` (liaison-free, beginner-safe). Micro Dictée: `je vais`. No Sentence Dictée (contains
supported tail). Audio Recognition: je vais vs je suis (heard).

**I. Mon Lexique.** Entries after production: je vais, à la maison. Containing-pieces: `à la
maison` deliberately unexpanded (whole-for-now display). Example links to the close-arc family.

**J. Flashcards.** Intent→FR (say you're heading home); scenario→response (leaving politely);
context→missing piece (`Je vais ___`). Risk: none notable — small clean surface.

**K. PH & carryover.** Contributes close-the-moment family. Carry-out: `je vais` → L8
(`Tu vas où ?` band — spec-level; shipped compact deferred it → CA-6), L10 (`je vais à la
maison` return); `à la maison` → L8 location answers, L10. The frozen chunk seeds the
**post-slice** aller/futur-proche doorway (deferred, not cancelled).

**L. Evidence/Stats.** Standard; headline: the learner can now *exit* an interaction — Stats
narrative "open → ask → recover → close" completes.

**M. Content Factory.** Generation window is tiny by design: close-moment scenes over the
frozen pair + recycled closes; **no destination slot generation** (à la maison is not a frame
yet).

**N. Risks.** Underdevelopment (deliberate: 2-item doorway after integration) — the hub, not
the lesson, carries volume; movement-question coupling with L8 depends on CA-6; futur-proche
leak pressure from learners — trap + Later Form card handle it without teaching.

---

### 4.8 L8 — C'est où ?

**A. Identity.** Acquisition (question/location control; **0 new grammar systems, 0 full
question-formation ownership** [SOURCE L08 spec]). Promise: ask and answer simple where-
questions with fixed frames. Scene: a new place after class. Prerequisites: L2 `c'est`, L7
movement, L1 `excusez-moi` (once enriched). Why here: where-control is the moment L7's movement
becomes navigable.

**B. Acquisition ledger.** [REC] Reconciles the spec's 7 identity-context actives with the
shipped 1-chunk compact; recommends a middle scope:

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| **c'est où ?** | frozen question chunk | Active | **New** | **Yes (1)** | frozen-chunk question production (intonation only) | controlled production | whole; `où` homograph QA | `chunk-c-est-ou` | shipped; L08 spec |
| **où est ___ ?** frame | question frame | Active [REC — restore from spec; shipped deferred it → CA-6] | New | **Yes (1)** | slot question production | controlled production | frame; never inversion | **IDENTITY GAP — ID assignment deferred** (spec: `frame:ou-est-plus-noun`) | L08 spec vs shipped de-scope |
| où (word) | question word | Supported (inside frames only) | New | No | in-frame only | recognition→controlled | homograph (`où` vs `ou`) — disambiguated ID pattern exists | `adverb-ou-where` | shipped |
| c'est | pointer chunk | Supported | Recycled (L2) | No | scaffolded | controlled production | — | `chunk-c-est` | shipped |
| ici / là answers (`___ est ici/là`) | deictic answer frame | **Supported** [REC — là enters supported here; was L2 ghost] | là New-to-supported | No | scaffolded answers | controlled production (supported) | `là` homograph QA | `word-ici`; **là: IDENTITY GAP — ID assignment deferred** | L08 spec; PE L2 ghost |
| tu vas où ? / vous allez où ? | movement-question frames | **Recognition** [REC — spec had supported; shipped deferred; keep recognition in slice, promote post-slice] | New | No | none required | recognition | fixed frames only | none | L08 spec vs shipped; CA-6 |
| où est-ce que…, inversion forms, là-bas | preview cluster | Recognition | New | No | none | exposure | — | none (est-ce que owns L12) | L08 spec |
| oui/non answer moves in dialogues | answer cluster | Active | Recycled (L3) | No | answer production | controlled production | — | `chunk-oui`, `chunk-non` | PE §4.2 [REC restores; shipped trap-only use is non-conforming] |

**C. Active-new audit.** Computed = **2** (c'est où ? chunk; où est ___ ? frame) [REC].
Fallback = 1 (shipped compact, chunk only) if CA-6 keeps the de-scope. Both readings are
band-compliant. The two frames are deliberately **not** clustered into one demand: chunk-frozen
question vs slot-frame question are materially different production demands. L10 = 0 stands.

**D. Protected/unpack.** `c'est où ?` whole; **request-frame anatomy pilot candidate 2**
(folded FD-2: "selected `vous pouvez …` or request-frame anatomy where French QA approves") —
at L8 the parallel `où est ___ ?` frame anatomy (où · est · slot) is the QA-gated candidate;
`où` accent is a spelling-teaching fact (accent distinguishes meaning — FQ-1 meaning-changing
class when dropped in writing).

**E. Sentence families.** Acquisition (`C'est où ?` / `Où est le café ?` / `La maison est là.`
— *Illustrative — human French QA required* for new combinations) 6-8; orientation scenes
(`Excusez-moi, où est ___ ?` — needs L1 enrichment) 3-4; recognition/showcase (est-ce que /
inversion heard-only previews within W2) 2-3; PH volume (place-question swaps over owned
packages) 8-10; reveal models 2-3; Dictée (Micro: `c'est où ?` — **question-mark punctuation
is communicative-act-bearing** per FQ-1 clarification; Guided: `Où est ___ ?` given-slot) 2-3.
Prohibited: inversion production anywhere; preposition dumps; new place nouns beyond owned
packages.

**F. Exercises.** P0: EV-010, EV-011 (situation → which question), EV-030, EV-031, EV-040,
EV-041, EV-042, EV-013 (ici/là; c'est où vs où est). P1: EV-049 (**Context Chain debut: ask →
answer → confirm chain**), EV-036 (frame anatomy pilot, QA-gated), EV-033, EV-004, EV-014.
Inappropriate: EV-048 (no register work), est-ce que production, EV-021. Audio: rising-contour
questions — EV-016 Hear the Shape stays P2, but EV-004 shadowing carries the contour
pedagogically (S1).

**G. Interstitials.** Required: IS-06 (question-by-intonation logic), IS-03 (**où accent — the
one sound/writing note with meaning stakes**), IS-16, IS-31. Optional: IS-17 (est-ce que "form
for later"), IS-08 (frame anatomy pilot), IS-10 (ici/là contrast), IS-22/23. Culture: none.

**H. Audio/Dictée.** Record: question/answer pairs with reliable rising contour (**recorded
human audio matters most here in the slice**) ~8-10 clips. Shadowing: `C'est où ?` (contour).
Audio Recognition: question vs statement (same string, different contour — EV-014 payload with
recorded audio only). Micro Dictée: `c'est où ?` (accent + `?`). Guided: `Où est ___ ?`.
Sentence Dictée: `C'est où ?` eligible (short, all-A). Context Dictée: deferred.

**I. Mon Lexique.** Entries after production: c'est où ?, où (supported path), là (if enriched).
Hidden: est-ce que previews, tu vas où ? (recognition). Containing-pieces: `c'est où ?` →
c'est + où (post-pilot).

**J. Flashcards.** Scenario→response (lost after class — ask where); intent→FR (ask where X
is); audio→meaning (question contour); context→missing piece (`Où est ___ ?`). Selective
FR→meaning: `où` vs `ou` disambiguation review. Risk: place-noun vocabulary drift (no new
places exist — cards use owned packages only).

**K. PH & carryover.** Contributes question volume + ici/là answer family. Carry-out:
where-frames → L10 (`Où est la maison ?` return, `Tu vas où ?` recognition→post-slice
promotion); `c'est où ?` → any future place content; oui/non dialogue restoration → L9/L10.

**L. Evidence/Stats.** Question-production evidence debuts; `ou-accent` writing observations
stay precision-class unless meaning-changing (FQ-1); Stats: "you can ask".

**M. Content Factory.** May generate where-questions **only over owned noun packages**; answer
pairs from ici/là templates; never inversion, never est-ce que, never new place nouns.

**N. Risks.** CA-6 scope decision (restore `où est ___ ?` or keep compact) blocks final L8
authoring; là identity missing; contour-dependent pedagogy needs recorded audio early (FD-6
timing); `oui` restoration conflicts with shipped L8 trap-only use — must be authored
deliberately.

---

### 4.9 L9 — Faire une pause

**A. Identity.** Acquisition (split-sense verb opening: `faire` = small action/pause ONLY; 0
full faire ownership). Promise: ask for a break politely; suggest one; decline a small action.
Scene: rest after class. Prerequisites: L1 `je voudrais` (+ infinitive support), L3 negation,
L4 need-states. Why here: third mini-engine of the L7-L9 run, immediately before the
integration beat (Integration Rhythm Rule satisfied by L10).

**B. Acquisition ledger:**

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| **faire une pause** (via `Je voudrais faire une pause.`) | action package chunk inside owned frame | Active | **New** | **Yes (1)** | produce the request with the action package | controlled production | package whole; `faire` sense-scoped (split-sense, IC-005) | `chunk-faire-une-pause`, `noun-pause` (supported) | shipped; L09 spec |
| **faire ça / je ne fais pas ça** generalization | action slot + negation reuse | Active [REC — restore from spec; shipped deferred → CA-7] | New | **Yes (1)** — generalizing the action slot beyond the pause package is a distinct productive operation | produce/decline small actions | controlled production | `ça` Caveat atom (promoted word per spec) | **IDENTITY GAP — ID assignment deferred** (spec: `word:ca`, `chunk:faire-ca`, `chunk:je-ne-fais-pas-ca`) | L09 spec vs shipped de-scope |
| on fait une pause ? | suggestion frame | **Supported** [REC] | New | No | scaffolded suggestion | controlled production (supported) | frozen frame (no on-paradigm) | **IDENTITY GAP — ID assignment deferred** | L09 spec (demotable to recognition if strained — spec's own mitigation) |
| je fais | verb form | Supported (spec) — **not produced in shipped**; keep supported-band, low salience | New | No | scaffolded at most | recognition→controlled | — | none | L09 spec vs shipped |
| tu fais quoi ? / qu'est-ce que tu fais ? / weather faire / faire du sport / paradigm | preview cluster | Recognition | New | No | none | exposure | — | none | L09 spec |
| je ne veux pas faire ça / vouloir present | boundary cluster | Recognition (**blocked production** — vouloir present unowned) | New | No | never | exposure | — | none | L09 spec form-status |
| j'ai besoin d'une pause | need-frame reuse | Supported (**conditional on CA-4** besoin cluster) | Recycled-frame + new filler | No | scaffolded | controlled production (supported) | `d'` elision QA | pending CA-4 | L09 spec |

**C. Active-new audit.** Computed = **2** (pause request; action-slot generalization) [REC].
Fallback = 1 (shipped compact). Band-compliant either way. Disputed: whether `faire ça` is a
separate demand or a linked extension of the pause chunk — this map argues **separate** (a
genuinely new productive operation per IC-003's "later extension counts only when it creates a
genuinely new productive operation" — it does: open action reference vs fixed package). L10 = 0.

**D. Protected/unpack.** `faire une pause` whole; split-sense discipline: `faire`'s other
senses are recognition previews, and IC-005 records the future sense-separation debt (faire
small-action now; weather/sport/broad faire later senses need distinct identity treatment when
owned). No anatomy pilot here (L10 hosts the cumulative example).

**E. Sentence families.** Acquisition (`Je voudrais faire une pause.` `J'ai besoin d'une
pause.`*(CA-4)* `Je ne fais pas ça.`) 6-8; suggestion dialogues (`On fait une pause ? — Oui. /
Non merci.`) 3-4 [restores answer-cluster reuse]; recognition/showcase (weather/sport faire
color, `Tu fais quoi ?` heard) 2-3; PH volume (action swaps, decline volume) 8-10; reveal
models 2-3; Dictée (Micro: `une pause`; Guided: `Je voudrais faire ___`) 2-3. Prohibited:
faire-paradigm production, weather production, vouloir-present production.

**F. Exercises.** P0: EV-010, EV-011, EV-013 (`je suis faire`-class architecture traps),
EV-030, EV-031, EV-040, EV-041, EV-042, EV-060 (`je voudrais fais` → smallest repair). P1:
EV-046 (**pause package across `je voudrais faire ___` / `j'ai besoin de ___` — two-frame
transfer**), EV-044 (suggestion→answer continuation), EV-049 (pause-negotiation chain), EV-063,
EV-004. Inappropriate: EV-048, paradigm shapes, EV-021. Audio: EV-014.

**G. Interstitials.** Required: IS-06 (split-sense honesty: "faire does many jobs; today,
one"), IS-16, IS-31. Optional: IS-17 (weather-faire "for later"), IS-02 (pause≈pause spelling
delta), IS-14 (je voudrais throwback — L1 engine carrying its third cargo class). Culture:
none.

**H. Audio/Dictée.** Record: request/suggestion/decline family (~8 clips). Shadowing: `Je
voudrais faire une pause.` (longest shadow line yet — chunked). Audio Recognition: fais/fait
silent-final (recognition-band; scored minimal pair stays P2). Micro: `une pause`. Guided:
`Je voudrais faire ___`. Sentence Dictée: `Je ne fais pas ça.` eligible **only if CA-7 lands**
(all-A then). Context: deferred.

**I. Mon Lexique.** Entries after production: faire une pause, (faire ça / je ne fais pas ça
under CA-7), une pause. Hidden: paradigm/preview cluster, je ne veux pas faire ça.
Containing-pieces: `faire une pause` → faire + une pause (package inside package — QA the
display). Sense note: entry must carry the small-action sense only.

**J. Flashcards.** Intent→FR (ask for a break — the single best recall card in the slice);
scenario→response (exhausted after class); context→missing piece (`Je voudrais faire ___`);
audio→meaning. Risk: `faire = to do/make` isolated card is **banned framing** (sense-scoped
entries only).

**K. PH & carryover.** Contributes decline/suggest volume + the `je voudrais + infinitive`
frame's first heavy use. Carry-out: pause/action set → L10 anchor (`Je suis fatigué, je
voudrais faire une pause.`); `faire ça` → post-slice pouvoir doorway (`je peux faire ça` —
L11's planned base); suggestion frame → L10 dialogue.

**L. Evidence/Stats.** Standard; infinitive-chain evidence debuts (`je voudrais faire` —
transformation-type verb chain); Stats: "three engines + chains".

**M. Content Factory.** Action-slot generation over **approved action list only** (currently:
une pause, ça — closed); suggestion/decline templates authored; never paradigm, weather, or
vouloir-present generation.

**N. Risks.** CA-7 scope decision blocks final L9 authoring; `ça`/faire-ça identities missing;
L7-L9 is the documented three-new-engine run — L9 must stay at 2 demands max and lean on the
hub; recycled base (~14) is below the spec's own target (~16-22) — integration families must
compensate.

---

### 4.10 L10 — Une petite journée

**A. Identity.** **Integration lesson** (archetype #10, "After Class"; Charter-ratified role).
Promise: put the whole first arc together in one natural human flow — greet, state, need,
pause, locate, move, decline, recover, close. Scene: after class. Prerequisites: L0-L9. Why
here: first application of the Integration Rhythm Rule after the L7-L9 engine run [SOURCE
learning-engine-v1 §8].

**B. Acquisition ledger:**

| Candidate identity | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Earliest evidence | Protected? | Existing canonical ID | Source/status |
|---|---|---|---|---|---|---|---|---|---|
| `phen:integration-review`, `phen:after-class-human-context` | meta phenomena | Meta | New | **No — meta never counts; L10 = 0** [SOURCE PRJ-015 §7: "L10/L13/L16's 'active (meta)' `phen:` entries — never count; those lessons are 0"] | none | — | — | none | L10 spec §5 + PRJ-015 |
| engine-chain recombinations (`Je suis fatigué, je voudrais faire une pause.` anchor) | sentence-level recombination | **Sentence context only** (supported recombination, not lexis) | New combinations of recycled material | No | recombination production | controlled production (recombination) | sentences are model answers, never chips | sentence IDs: **IDENTITY GAP** (spec's `sent:l10-*` scheme unregistered) | L10 spec §6.6 |
| **vous pouvez m'aider ?** (pouvoir preview hook) | composed model sentence over `chunk-vous-pouvez` + `chunk-m-aider` (**not a chunk** — locked, PR #168 / PE §4.3) | **Recognition — future hook only, never produced** | New (hook) | No | **none — producing it is the authored trap** (`trap:pouvoir-too-early`) | exposure | composition locked; registry-status-vs-lesson-role gap noted (§11) | `chunk-vous-pouvez`, `chunk-m-aider` (both supported — steady-state L11 role) | L10 spec; shipped designNote |
| full L1-L9 recycled set (~26: greeting/close, states, negation, answers, packages, formulas, movement, where-frames, pause set) | recycled spine | Active/Supported/Recognition per prior status | Recycled | No | recombination production | controlled production | as before | existing IDs + the §11 gaps | L10 spec §6.4 |

**C. Active-new audit.** Computed = **0** — **explicitly confirmed**: the spec's "2 (both
meta, 0 new lexis)" equals contract-canonical 0 under PRJ-015; integrations may not promote
items in-lesson; no in-lesson promotion exists here. Binding, undisputed.

**D. Protected/unpack.** No new structures. **Chip-decomposition pilot candidate 4 lands
here**: one cumulative **recomposition** example (folded FD-2) — previously revealed children
(je · ne…pas · comprends; un/une · noun) reappear in an approved recombination display/rebuild
(EV-035 over a known parent + IS-08 cumulative view). Parent identities remain canonical.

**E. Sentence families.** Integration flow scenes (the 12-line after-class arc, all recycled)
10-12; anchor + variations (`Je suis fatigué, je voudrais faire une pause.` class) 3-4;
preview-hook family (`Vous pouvez m'aider ?` heard/read + calm reveal note) 1-2; PH
recombination volume 10-12; reveal models 3-4. **No acquisition family.** Prohibited: pouvoir
production, futur-proche leak, question-system leak (all authored traps with reasons), new
lexis of any kind.

**F. Exercises.** P0: EV-001 (scene), EV-010/011/013 (cross-engine discrimination), EV-030/031,
EV-040/041/042 (open weave + say-it carry the payoff), EV-070. P1 (payoff set): **EV-050
Moment Builder Board (the integration board)**, EV-044, EV-045, EV-052, EV-063 (recovery
inside the flow), EV-049 (after-class chain), EV-035 (cumulative rebuild pilot), EV-073.
Inappropriate: any new-engine mechanic, EV-071 on new material (rehearsal, not test), Dictée
on the preview hook. Audio: EV-014 (which move next), EV-004 (whole-moment shadow).

**G. Interstitials.** Required: IS-16, IS-18 (the arc's recap — atomic pieces only), IS-19
(SRS announcement), IS-17 (**the pouvoir Later-Form card is the archetype's designed preview
surface** — calm copy per the spec's feedback line). Optional: IS-14 (throwbacks are the
lesson's texture), IS-08 (cumulative anatomy), IS-21 (Bon Retour if returning). **No new
insight teaching.**

**H. Audio/Dictée.** Record: the full after-class arc (~10-12 clips — the showcase recording
set). Shadowing: 2-3 line chains. Audio Recognition: flow-order listening. **Sentence Dictée
checkpoint**: all-A recycled sentences (`Je vais à la maison.`) eligible per FD-3
integration-checkpoint placement; the anchor sentence is Guided-only (length). Context Dictée:
deferred (this would be its natural home — revisit post-slice). Preview hook: **never** a
Dictée target (recognition material).

**I. Mon Lexique.** No new entries; every returning identity gains where-used breadth + the
"reuse across lessons" evidence class; `vous pouvez` / `m'aider` stay hidden (no production).
The cumulative containing-pieces view (word → pieces across L1-L10) is the Charter §4.5
prototype's natural demo data.

**J. Flashcards.** Scenario→response over the whole arc (the richest scenario deck);
context→missing piece over recombination sentences; audio→meaning on flow lines. No
preview-hook cards. Risk: cumulative-exam feel — deck stays small, calm, retrieval-first.

**K. PH & carryover.** Contributes the integration recombination pool (the hub's richest
family) + error-replay material from L7-L9 traps. Carry-out (post-slice): pouvoir hook →
L11 production; `faire ça` → `je peux faire ça` (L11); movement/where frames → L11-L15 band;
the after-class scene world continues (L11+ per band map).

**L. Evidence/Stats.** The connected-loop showcase: reuse-across-lessons events, recombination
evidence, repair returns — Stats' "first ten lessons" view derives entirely from these shared
events; completion of L10 is attempt-coverage, never a mastery claim.

**M. Content Factory.** Generation restricted to recombinations of the L1-L9 approved
inventory (C1-style); flow templates authored; hook sentence is a template constant
(recognition-rendered only); zero new lexis is a hard rule; every generated flow passes the
full validator chain + French QA.

**N. Risks.** Integration coverage depends on upstream CA decisions (fatigué, besoin-de,
answer-cluster restoration, faire-ça) — §10 audits this; preview-hook salience must carry the
"is novelty too low?" risk the spec itself flags (strengthen the hook, never add lexis);
registry-status-vs-lesson-role gap (supported pieces used recognition-only by design) needs
`status_by_lesson` modeling before implementation (§11).

---

## 5. Cross-lesson acquisition matrix

Markers: `A+` Active-new (counts toward the budget) · `A` Active-recycled · `S+`/`S`
Supported new/recycled (scaffolded production; never counts) · `R+`/`R` Recognition
new/recycled · `G` Ghost/exposure · `M` Meta/phenomenon · `I` integration use (recycled inside
an integration flow) · `—` absent. Rows are acquisition identities or tightly linked clusters
([REC] reconciled treatment; CA-* where disputed).

| Identity / cluster | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 | Final slice relationship |
|---|---|---|---|---|---|---|---|---|---|---|---|
| bonjour (opener) | A | A | A | A | A | I | A | A | A | I | universal opener; L0-taught |
| je voudrais + frame | A | A | A | A | A | I | — | — | **A (infinitive cargo)** | I | the request spine; 3 cargo classes by L9 |
| un café (package) | A | — | — | — | A | I | — | R | — | I | dual-ID resolve pending (§11) |
| s'il vous plaît | A | — | A | A | A | I | — | — | A | I | politeness landing, whole throughout |
| **merci** | **A+** | — | — | — | — | I | A | — | — | I | close/thanks; L1 demand 1 |
| **au revoir** (CA-1) | **A+** [REC] | — | — | — | — | I *(shipped A+ here — conflict)* | A | — | — | I | close; move-to-L1 recommended |
| excusez-moi | S+ | S | S | — | — | I | — | **S (opener reuse)** | — | I | attention opener; ID gap |
| je ne comprends pas (survival formula) | S+ | S | S (anatomy pilot) | S | S | I | S | S | S | I | rescue; promotion checkpoint open (CA-8) |
| vous pouvez répéter ? (survival formula) | S+ | S | S | S | S | I | S | S | S | I | rescue; locked non-inverted surface |
| un thé (package) | S+ | — | — | — | **S (gender pair)** | I | — | — | — | I | two-role design (PE) |
| croissant / madame / monsieur | G | — | — | — | — | — | — | — | — | — | ghost color; no later path needed |
| **je suis + frame** | — | **A+** | A (transform base) | A (contrast) | — | I | — | — | A | I | engine 1 |
| ici | — | S+ | — | — | — | I | — | **S (answer frame)** | — | I | deictic; retro-fitted ID |
| fatigué(e) | — | S+ | — | S (contrast) | — | I | — | — | S | **I (anchor)** | **ID gap blocks the L10 anchor** |
| c'est | — | S+ | A/S | — | S | I | — | **S (in c'est où ?)** | — | I | pointer; composition base |
| là / prêt(e) | — | G | — | — | — | — | — | **S+ (là promoted — CA-6)** | — | I | ghost→supported path (explicit promotion) |
| être family forms | — | R+ (snapshot) | R | — | — | — | — | — | — | — | exposure-only map; no production path (by design) |
| **negation `ne…pas` + je ne suis pas** | — | R (reveal seed, W2) | **A+** | S (`je n'ai pas`) | S (`pas de`) | I | — | — | **A (je ne fais pas ça — CA-7)** | I | layer engine; L9 gives the productive return the retrospective demanded |
| **ce n'est pas** | — | — | **A+** | — | — | I | — | — | — | I | protected chunk |
| **oui/non/non merci answer cluster** | — | — | **A+** | — | — | I | — | **A (dialogue restore)** | **A (suggestion answers)** | I | answer moves; PE §4.2 rehabilitation |
| si | — | — | R+ | — | — | — | — | — | — | — | seed only; no slice path (by design) |
| tu / tu-vous register | — | — | R+ | — | — | — | — | R | — | — | doorway-gated; no production path (by design) |
| **j'ai + frame** | — | — | — | **A+** | A (possession) | I | — | — | — | I | engine 2 |
| faim / une question | — | — | — | S+ | S (package pair) | I | — | — | — | I | states/fillers; question dual-ID (§11) |
| soif / une idée | — | — | — | S+ | — | I | — | — | — | I | ID gaps (soif) |
| j'ai froid / chaud | — | — | — | G | — | — | — | — | — | — | ghost; example copy only |
| j'ai besoin de (CA-4) | — | — | — | **[home?]** | — | *(spec wanted here)* | — | — | S (une pause) | I (`d'aide`) | **unhomed cluster — decision needed** |
| **article-package operation** | — | — | — | — | **A+** | I | — | — | — | I | generalizes all packages |
| une table | — | — | — | — | S+ | I | — | — | — | I | ID gap |
| le / la (CA-5) | — | — | — | — | R+/S+ | — | — | S (answers) | — | I | tier decision needed |
| restaurant / maison (nouns) | — | — | — | — | G | — | *(maison enters inside chunk)* | — | — | — | ghost→chunk path via L7 |
| **je vais** | — | — | — | — | — | — | **A+** | R (movement questions) | — | I | frozen doorway; post-slice aller seed |
| à la maison | — | — | — | — | — | — | S+ | S (answers) | — | I | frozen destination |
| **c'est où ?** | — | — | — | — | — | — | — | **A+** | — | I | frozen question |
| **où est ___ ? frame** (CA-6) | — | — | — | — | — | — | — | **A+** [REC] | — | I | slot question |
| où (word) | — | — | — | — | — | — | — | S+ | — | I | homograph-safe ID exists |
| tu vas où ? / vous allez où ? | — | — | — | — | — | — | — | R+ | — | R/I | recognition; post-slice promotion |
| est-ce que / inversion previews | — | — | R+ | — | — | — | — | R | R | R | W2-window previews; L12+ territory |
| **faire une pause** | — | — | — | — | — | — | — | — | **A+** | **I (anchor)** | split-sense engine 3 |
| **faire ça / je ne fais pas ça** (CA-7) | — | — | — | — | — | — | — | — | **A+** [REC] | I | action generalization; L11 base |
| on fait une pause ? | — | — | — | — | — | — | — | — | S+ | I | suggestion frame |
| une pause | — | — | — | — | — | — | — | — | S+ | I | supported noun |
| faire previews (weather/sport/paradigm) | — | — | — | — | — | — | — | — | R+ | — | sense-separation debt (IC-005) |
| vous pouvez m'aider ? (pouvoir hook) | — | — | — | — | — | — | — | — | — | **R+ (hook)** | L11 production target (post-slice) |
| integration/recombination phen | — | — | — | — | — | **M** | — | — | — | **M** | meta; never counts |

**What the matrix reveals** (feeding §10, §11, §13):

- **Isolated/no-reuse items:** ghost sets (croissant/madame/monsieur; froid/chaud;
  restaurant) — acceptable by design (atmosphere); `si`, tu-register, être-family forms —
  deliberate dead-ends inside the slice (doorway-gated); **no Active item lacks a later path**
  once CA-1/4/6/7 resolve.
- **Required too early:** nothing after the PE reconciliation (the spec-era 9-13 "active"
  loads were the risk; recounting removes it).
- **Ghost accidentally becoming production:** two watchpoints — là (must be explicitly
  promoted at L8, never silently) and maison (acquires only inside the frozen `à la maison`
  chunk, never as a bare package in-slice).
- **Weak carryover paths:** fatigué (blocked by missing ID — threatens the L10 anchor);
  besoin-de (unhomed); answer cluster between L3 and L8 (shipped reality starves it — restored
  by [REC]); repair pair never grows (CA-8 promotion checkpoint).
- **Overused pieces:** un café / je voudrais (café-centricity, [SOURCE] retrospective) —
  budgeted down in L6-L10 scenes deliberately.
- **L10 coverage:** every engine row reaches `I` at L10 except deliberate dead-ends — §10
  audits the exceptions.

---

## 6. Carryover and recombination graph

Engine lifecycles (first exposure → first production → first recombination → first cross-scene
reuse → L10 role). [REC] reconciled; no grammatical scope beyond current curriculum.

| Engine | First exposure | First production | First recombination | First cross-scene reuse | L10 integration role |
|---|---|---|---|---|---|
| **Survival formulas** (je ne comprends pas · vous pouvez répéter ?) | L1 (whole, supported) | L1 (scaffolded recall) | L3 (anatomy legible post-negation) | every lesson's rescue beat; L6/L8 non-café scenes | recovery move inside the flow |
| **Politeness/register** (bonjour · s'il vous plaît · merci · excusez-moi · je veux contrast) | L0/L1 | L1 | L1 (request arc) | L6 classroom; L8 orientation | opens/closes the day; register ladder recognized (hook copy) |
| **Request engine** (je voudrais + noun / + infinitive) | L0 | L0/L1 | L4-L5 (new cargo classes) | L9 (`faire une pause` infinitive cargo) | anchor sentence second clause |
| **Identity/state** (je suis + states) | L2 | L2 | L4 (contrast with j'ai) | L6 human context | anchor first clause (`Je suis fatigué`) |
| **Negation layer** (ne…pas · ce n'est pas · pas de) | L2 reveal seed (W2) | L3 | L4 (`je n'ai pas` band), L5 (`pas de`) | L9 (`je ne fais pas ça`) | polite decline inside flow |
| **Answer moves** (oui · non · non merci · si-R) | L1 (heard) | L3 | L3 dialogues | L8/L9 dialogue restore | suggestion answers |
| **State engine** (j'ai + states/possession) | L2 seed (micro-contrast) | L4 | L5 (possession packages) | L6; L9 (`j'ai besoin d'une pause`, CA-4) | need move (`j'ai une question` / `d'aide`) |
| **Article/noun packages** (un/une operation; le/la R→S) | L0 (un café whole) | L0-L1 (whole) → L5 (operation) | L5 (across engines) | L8 (place answers) | every object mention |
| **Movement** (je vais · à la maison) | L6 hook (R) | L7 | L8 (question coupling) | L10 | departure move |
| **Where-questions** (c'est où ? · où est ___ ?) | L8 | L8 | L8 (Q→A chains) | L10 | orientation move |
| **Small-action** (faire une pause · faire ça) | L9 | L9 | L9 (negation + suggestion) | L10 | anchor + decline |
| **High-value connectors** (mais — R-band) | L4 (heard in contrast line) | not in slice (recognition) | — | L6/L10 scene copy | texture only; production post-slice |
| **Repair/recovery arc** (formulas + c'est-pas-grave-class softeners) | L1 | L1 (scaffolded) | L3 (refusal+recovery) | L6/L8/L9 | the flow's recovery beat |
| **Pouvoir preview** (vous pouvez m'aider ?) | **L10 (hook)** | **never in slice** | — | — | recognition hook → L11 |

---

## 7. Sentence ecosystem budget

[REC] Authoring budgets (unique approved sentence seeds), **not** screen counts; one approved
seed may feed multiple projections (lesson screen, PH instance, flashcard context, Dictée span,
reveal model); derived exercise instances never count as seeds; duplicate surface strings with
different IDs require justification (accepted-alternative rule, ID convention §4).

| Lesson | Acquisition seeds | Recognition/showcase seeds | Practice Hub seeds | Integration/recombination seeds | Approx unique approved seed band | Rationale |
|---|---|---|---|---|---|---|
| L1 | 13-17 (incl. rescue + register families) | 5-7 | 8-12 | 2-4 | **28-40** | deep showcase (Charter §8); two coupled engines + formulas |
| L2 | 8-11 | 3-4 | 6-8 | 2-3 | **19-26** | one engine; spike-adjacent, kept lean |
| L3 | 12-15 (transform pairs + answers) | 3-4 | 10-12 | 2-3 | **27-34** | 3 demands; contrast-heavy |
| L4 | 11-14 (states + signature contrast) | 2-3 | 8-10 | 2-3 | **23-30** | engine + flagship contrast |
| L5 | 14-18 (packages + pairs + pas-de) | 3-4 | 10-12 | 3-4 | **30-38** | mid-slice checkpoint depth |
| L6 | 0 acquisition | 4-6 | 8-10 | 8-10 | **20-26** | integration: recombination is the product |
| L7 | 4-6 | 3-4 | 6-8 | 2-3 | **15-21** | deliberate 2-item doorway |
| L8 | 9-12 (Q/A pairs) | 2-3 | 8-10 | 2-3 | **21-28** | two question demands; contour work |
| L9 | 9-12 | 2-3 | 8-10 | 2-3 | **21-28** | two demands + suggestion dialogues |
| L10 | 0 acquisition | 5-7 (incl. hook) | 10-12 | 12-15 | **27-34** | integration payoff depth (Charter §8) |
| **Total** | | | | | **≈ 231-305** | |

Supporting estimates: **expected reuse rate** ≥ 2.5 projections per seed (lesson + hub +
flashcard/Dictée/reveal); **human French QA**: 100% of approved seeds before Stage-C exposure
(CB §18.3) — i.e. the full 231-305 band, front-loaded on L1 (freeze first); **audio-priority
sentences**: ~55-65% of seeds (anchors, models, shadowing/Dictée spans, Q-contour lines) ≈
**130-190 sentences**, plus ~55-70 item-level clips (all A/S surfaces incl. enrichment).
Assumptions: CA-1…CA-8 resolve near this map's [REC] positions; PE enrichment identities get
registered; L1/L5/L10 carry showcase depth; other lessons complete-but-lean; no seed
generation happens in this task.

---

## 8. Interstitial distribution map

`●` required · `○` optional/justified · `—` none. Only pedagogically earned placements
(IS-IDs per the Exercise Inventory §9; viewing never produces mastery evidence).

| Interstitial family | L1 | L2 | L3 | L4 | L5 | L6 | L7 | L8 | L9 | L10 | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Faux Ami (IS-01) | — | — | — | ○ (`j'ai chaud` flavor) | ○ (reserved) | — | — | — | — | — | few genuine faux amis in-slice; don't force |
| Cognate Bridge (IS-02) | ● (merci/répéter) | ○ | — | — | ○ (spelling deltas) | — | — | — | ○ (pause) | — | Tier-D nudge list feeds from these |
| Sound Pattern (IS-03) | ○ (silent finals) | ○ (suis) | ● (elision n') | ● (elision j') | ○ (-tion→la) | — | — | ● (où accent) | ○ (fais/fait finals) | — | one tiny note each; may demo contrasts unscored (FD-6) |
| Culture Bite (IS-04) | ● (bonjour-first) | — | — | ○ (avoir philosophy → folded into IS-06) | ○ (gender-as-package) | — | — | — | — | — | sparing by canon |
| Register/Politeness (IS-05) | ● (veux/voudrais) | — | ○ (tu/vous display) | — | — | — | — | — | — | ○ (request ladder in hook copy) | tu/vous stays display-only pre-doorway |
| Why This Works (IS-06) | ● | ● | ● (sandwich) | ● (avoir states) | ● (package logic) | — | ● (one) | ● (intonation) | ● (split-sense) | — | ≤3 level-3 cards/lesson (V5) |
| Notice the Pieces (IS-07) | ● | ● | ● | ● | ● | ○ | ● | ● | ● | ○ | chunk-first display everywhere |
| Chip Anatomy (IS-08) | ○ (je voudrais) | ○ | ● (**pilot: formula**) | ○ (j'ai) | ● (**pilot: package**) | — | ○ (whole-for-now) | ○ (**pilot: frame, QA-gated**) | — | ● (**pilot: cumulative**) | bounded FD-2 pilots only |
| Tiny Throwback (IS-14) | — | — | ○ | ○ | ○ | ● | ○ | — | ○ | ● | integration texture |
| Natural Reveal (IS-16) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | all free production (W1/W2) |
| Take Another Look (IS-15) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | standard retry surface |
| Later Form card (IS-17) | — | ○ (negation seed) | ○ (est-ce que) | — | ○ (les/des) | ○ (aller hook) | ● (futur-proche boundary) | ● (est-ce que) | ● (weather faire) | ● (**pouvoir hook**) | W2-window, recognition-only |
| Piece Quick Peek (IS-22) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● | every tappable FR surface |
| Piece/Word Detail + Containing Pieces (IS-23/24) | ● | ● | ● | ● | ● | ● | ● | ● | ● | ● (**cumulative view**) | Mon Lexique spine |

---

## 9. Surface projection map

One connected loop, per lesson (baselines in §4.0; this table shows the lesson-specific feed):

| Lesson | Lesson evidence (headline) | PH contribution | Mon Lexique candidates | Flashcard directions | Stats contribution | Audio package |
|---|---|---|---|---|---|---|
| L1 | formula recall; request-arc controlled production | request-slot volume; rescue retrieval; landing repair | 6 core + formulas (production-gated) | intent→FR; scenario→response; audio→meaning; context-gap | "first real exchange" | ~10-12 sentence + 10 item clips |
| L2 | first engine slot production | state-slot volume | je suis, ici (+fatigué later) | intent→FR; context-gap | "first engine" | ~6-8 + items |
| L3 | first transformation evidence | transform + answer-move volume; negation repair | negation set + answers | scenario→response; context-gap | "you can say no" | ~8-10 + items |
| L4 | engine-choice discrimination; repair (`je suis faim`) | suis/ai contrast family (top repair source) | j'ai + states | intent→FR; audio→target (suis/ai); selective FR→meaning (chaud) | "two engines + contrast" | ~8 + items |
| L5 | package-choice production | package volume; gender repair | packages (one entry per package) | context-gap (flagship); intent→FR; audio→target | "objects packaged" | ~8-10 + items |
| L6 | recombination (multi-engine) | first mixed-engine family | breadth (where-used), no new entries | scenario→response (whole moment) | "first whole moment" | ~8-10 scene clips |
| L7 | close-the-moment production | close volume | je vais, à la maison | intent→FR; scenario→response | "you can exit" | ~4-6 |
| L8 | question production (contour) | Q/A volume; where repair | c'est où ?, où, là | scenario→response; audio→meaning (contour); context-gap | "you can ask" | ~8-10 (recorded contour priority) |
| L9 | infinitive-chain production | decline/suggest volume | pause set | intent→FR (flagship); scenario→response | "three engines + chains" | ~8 |
| L10 | reuse-across-lessons; recombination payoff | integration pool + error replay | breadth + cumulative containing-pieces demo | scenario→response (arc deck) | the "first ten lessons" view | ~10-12 (showcase set) |

---

## 10. L10 integration coverage audit

- **Active-new = 0** — verified (§4.10.C; PRJ-015 §7 binding; meta phenomena excluded).
- **Engine return audit** (every major L1-L9 engine's opportunity, from §5/§6): greeting/close
  ✔ (bonjour/merci/au revoir) · request ✔ (anchor clause 2) · identity/state ✔ **conditional
  on the fatigué identity existing** — the anchor `Je suis fatigué, je voudrais faire une
  pause.` is currently unbuildable against the shipped registry [GAP §11-G2] · negation ✔ via
  `Je ne fais pas ça.` **conditional on CA-7** (shipped L10 has no negation return — a real
  shipped-coverage hole this map closes) · answer moves ✔ via suggestion dialogue
  **conditional on CA-3/answer restoration** · j'ai-state ✔ (`j'ai une question`; `j'ai besoin
  d'aide` conditional on CA-4) · packages ✔ (requests) · movement ✔ (`Je vais à la maison.`)
  · where-questions ✔ (`Où est la maison ?` / `C'est où ?`) · small-action ✔ (anchor +
  decline) · survival formulas ✔ (recovery beat) · pouvoir hook ✔ (recognition-only).
- **Not everything must return:** ghosts, si, tu-register, être-family forms, est-ce que
  previews deliberately absent — recorded as by-design, not gaps.
- **Small communicative experience, not an exam:** the arc is one scene with 8 production
  targets [SOURCE spec]; rehearsal framing, no diagnostics on new material, board capped at 1,
  calm deck — verified in card F/J.
- **Natural Reveal supportive** ✔ (accompanies the open weave + say-it payoffs); **repair and
  recovery available** ✔ (EV-060/063 inside the flow; struggle ladder per canon).
- **Evidence from action, not completion** ✔ (attempt-coverage rule stands; Stats reads
  events).
- **Surface projections** ✔ (§9 row L10: PH pool, Lexique breadth + containing-pieces demo,
  scenario deck, Stats view, showcase audio set).
- **L1-L9 acquisitions with no credible L10-or-earlier integration path:** none in the [REC]
  plan once CA-1/3/4/6/7 resolve; in **shipped reality**, three holes exist (no negation
  return, no answer-move return, no state-anchor `fatigué`) — these are exactly what the
  re-authoring must fix.

---

## 11. Registry and identity gap report

[CURRENT REALITY] baseline: `content/itemRegistry.ts` = **54 frozen IDs** (manifest-locked,
YASA 2); `content/learning-engine/items.ts` = **59 colon-namespaced fixture IDs**; **zero
shared IDs** between the two; lesson contracts exist only for L1/L2/L11/L12/L14/L15/L16/L18;
no `sent:` IDs registered anywhere; no audio identity fields on shipped items. Nothing is fixed
here. Gap classes: **[B-L1]** blocks L1 sentence authoring · **[B-IMPL]** blocks later
implementation only · **[CLEAN]** non-blocking cleanup · **[DEC]** founder/content decision
required.

| # | Gap | Detail | Class |
|---|---|---|---|
| G1 | **PE Kademe-2 enrichment identities absent** | `excusez-moi`, `je ne comprends pas`, `vous pouvez répéter ?`, `un thé` have **no ID in any registry** — the L1 redesign cannot be authored against the registry without them | **[B-L1]** |
| G2 | **fatigué(e), soif, une table absent** | block L2/L4/L5 enrichment and the L10 anchor (`Je suis fatigué…`) | blocks L2-L5/L10 authoring (same class as B-L1, staged later) |
| G3 | **Dual identities** | `noun-cafe`/`chunk-un-cafe`; `noun-question`/`chunk-une-question` — same surface, two IDs; carryover selector already hard-excludes ambiguous candidates [CURRENT REALITY `carryover-selector.ts:198`] | **[DEC]** (IC-004 primary-identity + linked-sub-identity assignment) → then [B-IMPL] |
| G4 | **Two-registry split** | hyphen vs colon namespaces, zero overlap, different lesson meanings — violates the single-registry direction if left | **[B-IMPL]** (event/mastery spine); not blocking authoring (author against runtime kebab per CFC §1.3) |
| G5 | **Missing parent/child (anatomy) relationships** | no registry representation of authored decompositions (formula → je · comprends · ne…pas; package → article · noun); needed by IS-08/EV-035/036 pilots | **[B-IMPL]** (pilot runtime); authoring can specify in docs |
| G6 | **Missing lemma/token relationships** | comprends→comprendre, voudrais→vouloir, vais→aller named-not-taught links; word/lemma → containing-pieces prototype (Charter §4.5) needs them | **[B-IMPL]** |
| G7 | **Sentence identity gap** | spec-level `sent:l08-*`/`sent:l10-*` IDs exist on paper; **no runtime sentence registry**; Content Factory traceability and audio identity (`entityId → audioId`) require stable sentence IDs | **[B-IMPL]** for factory/audio; sentence *authoring* may proceed with doc-level IDs |
| G8 | **`status_by_lesson` unrepresented** | registry status is static; L10 needs supported pieces rendered recognition-only by lesson design [CURRENT REALITY lesson-010 designNote] — the convention's `status_by_lesson` field is unimplemented | **[B-IMPL]** |
| G9 | **Item-granularity disputes** | oui/non/non-merci cluster counting (CA-3); besoin-de home (CA-4); faire-ça as second demand (CA-7); le/la tier (CA-5) | **[DEC]** (curriculum-author, §13) |
| G10 | **Unsafe whitespace-derived boundaries** | none shipped (recap atomization done); risk lives in future anatomy payloads — French QA gate required for every decomposition (elision `j'`/`n'`/`d'`, discontinuous `ne…pas`, `à la` contraction) | **[CLEAN]** (guard, not defect) |
| G11 | **Identities needing human French QA before registration** | all G1/G2 additions; feminine display forms (fatigué/fatiguée); là/où homograph labels; `qu'est-ce que ça veut dire`-class future formula candidates | **[B-L1]**-adjacent (QA is part of registration) |
| G12 | **Registered-but-unused v1 items** | `pronoun-je/tu/vous`, `verb-etre`, `chunk-tu-es`, `chunk-vous-etes`, `chunk-tu-es-pret`, `chunk-vous-etes-pret`, `sound-liaison`, `grammar-etre-identity`, `noun-idee` (dormant by design) | **[CLEAN]** |
| G13 | **Legacy-only content identities** | the 24-lesson `data/lessons` material (superseded titles L7-L10 etc.) — mine for sentences only; never as identity source | **[CLEAN]** (quarantine holds) |
| G14 | **ID-convention divergence** | spec colon convention vs runtime kebab; migration deferred post-smoke [SOURCE convention §7] — authoring uses runtime kebab now | **[B-IMPL]** (migration), documented |

---

## 12. Readiness gates

| Stage | Verdict | Why |
|---|---|---|
| **L1 sentence ecosystem authoring** | **READY WITH BOUNDED GAPS** | Sequence, promise, ledger, families, and folded exercise decisions are in place; bounded gaps = G1 identity registration (+QA) and CA-1 (au revoir). Both are small, enumerated, and resolvable inside the L1 freeze step. |
| **L2-L4 authoring** | **READY WITH BOUNDED GAPS** | Ledgers stable at 1/3/1 demands; gaps = G2 (fatigué, soif), CA-3 (answer clustering), CA-4 (besoin-de home). |
| **L5 checkpoint authoring** | **READY WITH BOUNDED GAPS** | Package operation clear; gaps = G2 (table/thé IDs), CA-5 (le/la tier), G3 (dual identities should resolve before the package families are frozen, since they define the package entries). |
| **L6-L9 authoring** | **L7 READY; L6/L8/L9 READY WITH BOUNDED GAPS** | L7's compact spec is honored end-to-end (its operator smoke gate is an implementation matter, not an authoring blocker). L6 carries the CA-1/CA-4 conflict (its re-authoring waits on them). L8/L9 wait on the scope decisions CA-6/CA-7 (+ là/ça identities). |
| **L10 integration authoring** | **READY WITH BOUNDED GAPS** | Structure, 0-demand ledger, and coverage plan are firm; blocked only by upstream CA outcomes (anchor needs fatigué; negation/answer returns need CA-3/7) — author last, as §14 sequences anyway. |
| **Content Factory schema work** | **NOT READY** | G7 (sentence identity), G4 (registry unification direction), G8 (status_by_lesson), G3 (primary identities) precede any factory schema; the factory contract itself is stable. |
| **Audio manifest work** | **READY WITH BOUNDED GAPS** | The Audio Asset Contract (Charter deliverable 3) can be drafted now against this map's clip estimates; binding `entityId → audioId` waits on G7 for sentences (item-level mapping can start on the 54 IDs + G1/G2 additions). |
| **Event/mastery implementation** | **NOT READY** | By design: Mastery Bible implementation gates unopened; two-store split (G4) unresolved; admissibility/attribution unimplemented; this map only requires that authoring stay compatible with the shared-spine target. |

---

## 13. Genuine open decisions

Not reopened (settled): the seven folded exercise decisions (FD-1…FD-7); PRJ-015 counting;
integration Active-new = 0; single-registry and single-mastery-spine direction; no legacy
flashcard/Practice/Stats architecture; no Survival-Mode timer; no pronunciation scoring;
bounded chip pilots; selective Dictée; W1/W2; survival-formula non-inverted surface (CB §15.3);
hub-never-gates.

**Founder/product decisions:**

| ID | Decision | Stake |
|---|---|---|
| FP-1 | **Ratify the L1-redesign payload** (PE Kademe 2 + CC-007 repair-pair placement + CA-1 au revoir move) as the slice's L1 | The whole map's L1-L6 ledgers key off it; CC-007 names the home but no payload has been founder-ratified since PE (2026-07-04) |
| FP-2 | **Slice scope for the shipped-vs-spec de-scopes** (bundle: restore L8 `où est ___ ?` frame, L9 `faire ça` set, answer-cluster dialogue restoration) — the "real-deal vs compact" line | Determines L8/L9 demand counts (1 vs 2) and L10 coverage completeness |

**Curriculum-author decisions:** CA-1 au revoir L1-vs-L6 · CA-3 answer-cluster counting (3 vs
4 at L3) · CA-4 `j'ai besoin de` acquisition home (L4 second demand [REC] vs post-slice) ·
CA-5 le/la tier at L5 (recognition vs supported) · CA-6 L8 scope (fold into FP-2) · CA-7 L9
scope (fold into FP-2) · CA-8 survival-formula promotion checkpoint (do the formulas ever
graduate to Active inside the slice, or stay supported throughout — the retrospective's
"never grows" flag).

**French QA decisions:** feminine display defaults per scene/speaker (fatigué/fatiguée
rendering, CB §15.4); anatomy display of elision/discontinuous units (j' · n' · ne…pas · à la);
homograph learner-facing labels (où/ou, là/la); naturalness pass on every new seed
(all newly proposed French in this map is *Illustrative — human French QA required*).

**Implementation calibration (not decisions):** exact seed counts inside the §7 bands; audio
coverage %; decomposition pilot instance counts; Dictée per-lesson counts; flashcard selector
weights — all downstream, per the Exercise Inventory §16.2.

---

## 14. Recommended next authoring sequence

1. **Resolve blocking conflicts only**: FP-1 + FP-2 (with CA-1…CA-7 folded into them), then
   register the G1/G2 identities (with French QA) — nothing else from §11.
2. **Freeze the L1 acquisition ledger** (this map's §4.1.B updated by FP-1) as the authoring
   contract.
3. **Author the full L1 sentence ecosystem** (28-40 seeds per §7; 100% French QA).
4. **Build the L1 Sentence × Exercise × Evidence pilot matrix** (Charter workstream 6 pilot;
   Exercise Inventory IDs × L1 seeds × §4.0 evidence classes).
5. **Validate L1 against every projection**: Mon Lexique entries, flashcard directions, PH
   families, Stats events, interstitial placements, audio clip list — the §9 row made real.
6. **Only then author L2-L10**, in order, using the validated L1 pattern; L10 last, after its
   upstream returns exist. **Do not author all ten pools simultaneously** — the L1 validation
   is the factory's calibration run.

---

## Appendix A — Validation record (pre-commit checks)

1. Exactly ten lesson cards exist (§4.1-§4.10). ✔
2. Every lesson has an explicit computed Active-new count (2 · 1 · 3 · 1 · 1 · 0 · 1 · 2 · 2 · 0). ✔
3. Every count follows PRJ-015 (demands, not IDs; linked identities counted once; meta/ghost/
   recognition/supported/recycled excluded; all ≤ 3; no 4-demand lesson, so no rationale case). ✔
4. L10 Active-new = 0, explicitly confirmed against PRJ-015 §7 and the spec's meta entries. ✔
5. Every acquisition candidate row carries a Treatment (A/R/G/Meta/Sentence-context) or an
   explicit routing (deferred/decision). ✔
6. No Ghost item becomes required production anywhere (ghost rows: never-required; là/maison
   promotion paths are explicit, not silent). ✔
7. Protected chunks whole at first acquisition (PROTECTED_CHUNKS, survival formulas, packages,
   frozen doorway units). ✔
8. Chip-anatomy activity limited to the four bounded FD-2 pilot candidates (L3 formula, L8
   frame QA-gated, L5 package, L10 cumulative); negative cases preserved. ✔
9. Every major Active acquisition has a later carryover/integration path (§5 matrix; §10
   audit; deliberate dead-ends documented as by-design). ✔
10. Interstitial viewing produces no mastery evidence (§4.0; §8 preamble). ✔
11. Mon Lexique visibility requires production evidence; recognition alone never adds (§4.0
    baseline, per-card I sections). ✔
12. Flashcards use only the decided four primary directions + selective FR→meaning (§4.0;
    per-card J sections). ✔
13. Dictée candidates use eligible Active material only (Micro/Guided on owned spans;
    Sentence only where all-A and production-eligible; Context deferred). ✔
14. Stats derives from shared evidence, never completion counters (§4.0; §9; L6/L10 cards). ✔
15. Sentence budgets are authoring-seed bands, not screen counts (§7 rules). ✔
16. Content Factory cannot invent curriculum treatment or canonical IDs (§4.0 M-baseline;
    per-card M sections). ✔
17. All newly proposed French is marked *Illustrative — human French QA required*; sourced
    French is cited from specs/PE. ✔
18. No existing file changed — this document is the only change. ✔
19. No Canonical authority is claimed (banner). ✔
20. `git status` shows only this file before commit. ✔

*End of L1-L10 Content & Acquisition Map v0.1 — Draft vertical-slice content planning
artifact. Next: resolve FP-1/FP-2, freeze the L1 ledger, author the L1 sentence ecosystem
(Charter workstream 5), then the L1 Sentence × Exercise × Evidence pilot matrix (workstream 6).*
