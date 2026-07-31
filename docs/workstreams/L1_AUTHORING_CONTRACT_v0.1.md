---
title: Cairn L1 Authoring Contract
version: 0.1
status: Draft — vertical-slice planning artifact
canon_status: non-canonical
implementation_status: not-started
owner: founder + curriculum/content review
created: 2026-07-31
scope: frozen workstream-level authoring inputs for the L1 sentence ecosystem
parent_map: docs/workstreams/L1_L10_CONTENT_AND_ACQUISITION_MAP_v0.1.md
siblings:
  - docs/workstreams/L1_L10_VERTICAL_SLICE_CHARTER_v0.1.md
  - docs/workstreams/EXERCISE_VARIATION_INVENTORY_v0.1.md
---

# Cairn L1 Authoring Contract v0.1

## 1. Purpose and authority boundary

This is the **workstream L1 authoring contract**: it freezes the inputs the next task uses to
author the full L1 sentence ecosystem. It is **non-Canonical**; it **does not override** the
Curriculum Charter, Content Bible, Mastery & Evidence Bible, Lesson Flow Canon, Payload
Economy, or the PRJ-015 Item-Counting Contract; it **registers no runtime identities** and
**authorizes no implementation**. If higher authority changes, this contract **must be
revised** before further authoring. Decision provenance: the 2026-07-31 folds recorded in the
parent map §13 (FP-1, CA-1, CA-8) and the Exercise Variation Inventory §16.1 (FD-1…FD-7).
Newly proposed French anywhere downstream of this contract is *Illustrative — human French QA
required* until the QA gate passes.

## 2. L1 communicative promise (frozen)

The learner can:

1. **enter** a basic café/service interaction politely (`Bonjour`);
2. **request one known item** politely (`je voudrais ___` + `s'il vous plaît`);
3. **thank and close** the interaction (`merci`, `au revoir`);
4. **signal non-understanding** (`Je ne comprends pas.`);
5. **ask for repetition with support** (`Vous pouvez répéter ?`).

Not in scope: travel, table booking, directions (`où est ___`), full restaurant vocabulary, or
any of the FP-1 deferred list (bonsoir, salut, pardon, la gare, réserver une table, baguette,
legacy breadth). Authoring that broadens the promise violates this contract.

## 3. Final L1 acquisition ledger (frozen — FP-1/CA-1)

| Authoring handle | Surface | Identity type | Treatment | New/recycled | Counts as Active-new? | Production expectation | Protected/whole-first | Existing ID | Registration status |
|---|---|---|---|---|---|---|---|---|---|
| bonjour | Bonjour | formula chunk (opener) | Active | Recycled (L0) | No | unscaffolded | whole-first | `chunk-bonjour` | registered |
| je-voudrais | je voudrais (+ linked `je voudrais ___` frame) | spine chunk + linked frame | Active | Recycled (L0) | No | unscaffolded, slot-productive | engine whole (`je` Caveat atom) | `chunk-je-voudrais` | registered (frame = linked identity, no separate ID) |
| un-cafe | un café | noun package | Active | Recycled (L0) | No | unscaffolded | package whole | `noun-cafe` / `chunk-un-cafe` (legacy dual — see §16) | registered (dual-identity debt) |
| sil-vous-plait | s'il vous plaît | formula chunk (politeness landing) | Active | Recycled (L0) | No | unscaffolded | **whole through L1-L10** | `chunk-sil-vous-plait` | registered |
| **merci** | merci | formula chunk (thanks) | **Active** | **New** | **Yes (1)** | unscaffolded | whole-first | `chunk-merci` | registered |
| **au-revoir** | au revoir | formula chunk (close) | **Active** | **New (CA-1)** | **Yes (1)** | unscaffolded | **whole through L1-L10**; `revoir` not taught in-slice | `chunk-au-revoir` | registered |
| excusez-moi | excusez-moi | formula chunk (attention opener) | **Supported** | New | No | scaffolded, ≥2 uses | whole-first | — | `chunk-excusez-moi` — **PROPOSED RUNTIME ID — NOT REGISTERED** (pattern-consistent with `chunk-sil-vous-plait` apostrophe handling; hyphen kept as in surface) |
| je-ne-comprends-pas | je ne comprends pas | **survival formula (closed class)** | **Supported (CA-8: through L1-L10)** | New | No | scaffolded whole-formula recall | **never split at acquisition**; anatomy = L3 pilot only | — | `chunk-je-ne-comprends-pas` — **PROPOSED RUNTIME ID — NOT REGISTERED** (pattern: `chunk-je-ne-suis-pas`) |
| vous-pouvez-repeter | vous pouvez répéter ? | **survival formula (closed class; locked surface CB §15.3 — never inverted)** | **Supported (CA-8)** | New | No | scaffolded whole-formula recall | never split; whole through slice | — | `chunk-vous-pouvez-repeter` — **PROPOSED RUNTIME ID — NOT REGISTERED** (ASCII kebab per convention; `?` not encoded, per `chunk-c-est-ou` precedent) |
| un-the | un thé | noun package (service variation; L5 gender-pair role later) | **Supported** | New | No | scaffolded slot filler | package whole | — | **PROPOSED RUNTIME IDs — NOT REGISTERED**: `chunk-un-the` (**primary acquisition identity** per IC-004: the package is what the learner acquires) + `noun-the` (**linked sub-identity**, registered per PE §6's pair note). **Required registration relationship: primary↔linked marked at registration** so the café-style split-mastery hazard is not reproduced. Linking *mechanism* is Engineering (deferred); the designation is contract-level. |
| je-veux (trap) | je veux | chunk (register contrast) | **Recognition / authored trap only** | New | No | none — never a learner-owned production target; selection/production interpreted **contextually** (register signal), never automatic broad failure | — | — | trap string; no registration needed |
| ghost set | un croissant · madame · monsieur | noun package + address forms | **Ghost (scene color)** | New | No | **never required** | — | — | no production IDs needed now |
| meta set | cognates (merci≈mercy, répéter≈repeat), silent finals, register phenomenon (veux/voudrais), bonjour-first culture | phen/sound/cog/culture | Meta | New | No | none | — | partial (`sound-*` items exist for other lessons) | doc-level only |

## 4. Counting audit (PRJ-015)

- **Active-new = 2**: `merci`, `au revoir`. Nothing else counts.
- **Excluded and why**: the four L0 recycled actives (recycled never counts); the four
  Supported-new items (supported never counts); `je veux` (trap/recognition); ghost set
  (ghost never counts); meta set (meta never counts); the `je voudrais ___` frame and
  `phen:polite-request`-class phenomena (linked identities of one recycled concept, IC-003).
- **Linked identities**: je-voudrais chunk ↔ frame ↔ phen (one concept, recycled);
  chunk-un-the ↔ noun-the (one acquisition concept, supported).
- **No silent promotion**: no Recognition/Ghost item may be moved to Active inside L1
  authoring; promotion is an explicit status-marked curriculum event outside this contract.
- **No hidden third demand**: any seed whose correctness requires unscaffolded production of
  anything beyond the six Active surfaces fails the §17 checklist.

## 5. Treatment and evidence contract

| Treatment | Learner may be asked to | Evidence that may be emitted | Never inferred | Mon Lexique visibility |
|---|---|---|---|---|
| **Active (recycled + the 2 new)** | produce unscaffolded from intent | controlled production, recall, transformation-free reuse | single miss ≠ weakness (attribution first, I-8); orthographic near miss ≠ concept weakness (FQ-1) | after qualifying production evidence (or weakness) |
| **Supported** | produce **with scaffold** (pieces, cloze, model nearby, formula prompt) | **real but assistance-scoped evidence** (FQ-3): successful supported production is admissible and may advance supported-performance claims; it **never** establishes independent production | supported success ≠ independent mastery; hint-rung use scopes the claim (recorded, not punished) | possible after qualifying **supported production** evidence or weakness (CA-8) — Active curriculum status is **not** required |
| **Recognition / trap** | recognize, discriminate, judge | recognition evidence; authored-trap signals (contextual interpretation for `je veux`) | recognition alone ≠ ownership (I-30); **recognition alone never adds to Mon Lexique** (I-10) | not visible from recognition alone |
| **Ghost** | nothing — may see/hear in context | exposure events only | ghost not produced ≠ error (I-9) | never visible as "learned" |
| **Meta** | tap/read insights | exposure/engagement events | viewing ≠ mastery (I-6, I-27) | n/a |

Supported vs Active, stated plainly: Active = the lesson may demand it from intent with no
material help; Supported = the lesson always supplies material help and the evidence carries
that assistance context. Curriculum treatment and learner mastery remain separate ledgers
(CA-8): a supported formula can become strong in mastery terms without ever changing its
in-slice curriculum status.

## 6. Protected and decomposition rules (frozen)

- Whole-first at acquisition: every formula chunk and package in §3.
- Closed survival formulas: `je ne comprends pas`, `vous pouvez répéter ?` — additions are
  founder canon events; surfaces locked (never inverted).
- Whole **through L1-L10**: `s'il vous plaît`, `au revoir`, `excusez-moi`, both survival
  formulas.
- Optional, evidence-free **`je voudrais` anatomy reveal** (IS-08) post-contact only.
- **First decomposition pilot = L3** on `je ne comprends pas` (bounded FD-2 pilot) — not L1.
- **No whitespace tokenization** as pedagogy, ever.
- No learner-facing split of apostrophe/elision (`s'il`, `j'`) or discontinuous (`ne…pas`)
  structures without authored, French-QA'd payloads.

## 7. Sentence-family contract

Budgets are unique approved seeds (not screens; one seed feeds multiple projections). Total
frozen band: **28-40** unique approved L1 seeds.

| Family | Purpose | Treatment mix | Eligible variations | Prohibited demands | Seeds |
|---|---|---|---|---|---|
| Request-arc acquisition | own open→ask→land | A-dominant; S slot fillers (un thé) | EV-001, 010, 030, 031, 040, 042 | ghost/R in required slots | 6-8 |
| Polite opening & closing | entry + exit moves (merci/au revoir demands live here) | A | EV-001, 010, 030, 033, 052 (missing-move) | closing without opener framing | 3-4 |
| Rescue pair | formulas under light breakdown | S formulas + A context | EV-063, 033, 011, 004 | hard orthography grading; unscaffolded formula demand | 3-4 |
| Register contrast | je veux vs je voudrais boundary | A + authored trap | EV-013, 012; IS-05 | treating `je veux` as plain error | 2-3 |
| Cognate-rich recognition | comprehensible richness; scene color | R/G-heavy, A skeleton | EV-001, 002, 011, 014 | any required production of R/G | 4-5 |
| Practice Hub slot reuse | volume retrieval | A only (+S given) | EV-033, 010, 030, 043 | new lexis | 6-8 |
| Open-production / Natural Reveal models | reveal targets for free production | model-answer sentences (full sentences allowed here only) | IS-16 for EV-041/042 | model sentences becoming chips | 2-3 |
| Dictée/audio spans | Micro/Guided material | A spans; S given in cloze | EV-034 (Micro/Guided), EV-004 | full-sentence L1 Dictée; R/G spans required | 1-2 |
| Flashcard contexts | direction payloads | projections of existing seeds | §12 directions | isolated meaning drills | 0-1 (mostly reuse) |
| Carryover seeds | L2+ hand-off (je voudrais être preview class) | A + W2-window reveal only | IS-17; reveal-only | producing future forms | 1-2 |

## 8. Composition whitelist

Eligibility is **explicit** — neither authors nor the Content Factory may infer combination
rights from vocabulary presence.

- **Unscaffolded Active composition** (learner-required output may demand these, alone or
  combined): `Bonjour` · `Merci` / `Merci beaucoup`-class close *(beaucoup only if already
  sourced; else plain merci)* · `Au revoir` · `je voudrais + {un café}` (+ `un thé` only with
  scaffold) · `+ s'il vous plaît` tail · the full request arc composed of the above.
- **Scaffolded Supported composition**: `Excusez-moi` + request opener; `Je ne comprends
  pas.`; `Vous pouvez répéter ?` (whole formulas, prompted/scaffolded); `je voudrais un thé`
  with the package supplied.
- **Recognition-only display**: `Je veux un café.` (contrast/trap rendering only).
- **Ghost-only scene color**: croissant/madame/monsieur inside meet/reveal/scene copy.
- **Prohibited combinations**: any learner-required output containing ghost items; survival
  formulas recombined word-by-word or partially; `je veux` as expected answer; inverted
  question surfaces; deferred-list content; two-clause constructions beyond the request arc.

## 9. Exercise eligibility (frozen; EV/IS per the Exercise Variation Inventory)

- **P0 lesson-path**: EV-001 Meet & Listen · EV-010 Fill with Traps · EV-011 Context Choice ·
  EV-013 Micro-Contrast (register pair) · EV-030 Typed Recall Fill (late, A spans) · EV-031
  Build · EV-040 Supported Weave · EV-041 Open Mixed Weave (ungraded, W1) · EV-042 Say It
  Your Way · EV-070 self-check projections.
- **P1 Hub/showcase**: EV-003 Piece Hunt · EV-004 Shadowing · EV-033 Function Recall→Use ·
  EV-043 Constrained Production · EV-052 Missing Move (opener/landing) · EV-062 Nudge
  Revision (cognate-bridge Tier D) · EV-063 Recovery Sequence (no pressure, FD-7).
- **Dictée limits**: EV-034 Micro (merci; un café span) and Guided (`Je voudrais ___ s'il
  vous plaît`) only; **no L1 Sentence Dictée**; Context mode deferred (FD-3).
- **Audio mechanics**: EV-004, EV-014 (P1, FD-6); EV-015/EV-016 stay P2; **no pronunciation
  scoring** (EV-093 rejected).
- **Inappropriate at L1**: EV-035/036 (pilot starts L3) · EV-046/047 (no second engine/layer)
  · EV-048 register-switch production · EV-021 · sentence-level Dictée · any tu/vous payload.
- **Repair/trap semantics**: EV-052 for missing opener/landing; EV-013/EV-062 for the
  register pair (`je veux` → contextual signal + smallest-upgrade invitation, never plain
  "wrong"); traps carry authored `trapReason` + one coach line (IS-31).
- **No new lesson screen types** (frozen 7; richness in payload; new mechanics Hub-first).

## 10. Interstitial and popup contract

Required: IS-02 Cognate Bridge (merci≈mercy, répéter≈repeat) · IS-05 Register/Politeness
(veux/voudrais) · IS-06 Why This Works (politeness sandwich) · IS-07 Notice the Pieces ·
IS-16 Natural Reveal (all free production) · IS-20 How Weave Works (one-time, pre-L1) ·
IS-22 Piece Quick Peek · IS-23 Piece Detail. Optional: IS-03 Sound Pattern (silent finals —
one tiny note) · **one** IS-04 Culture Bite (bonjour-first) · IS-08 `je voudrais` anatomy
(evidence-free, post-contact) · IS-15/IS-31 feedback surfaces as standard. **Opening any of
these produces no mastery evidence** (engagement/exposure events only).

## 11. Mon Lexique and containing-pieces contract

- Eligible entries (after qualifying **production** evidence or weakness): the six Active
  surfaces + the four Supported-new items (via supported production, per CA-8).
- Production gating: `productionSuccess > 0` class evidence or weakness; **recognition alone
  never adds**; ghost never appears as learned; `je veux` never appears.
- Supported items surface with calm learner-safe status copy (never raw counters/enums).
- Parent/child preservation: formulas and packages are the entries; child pieces appear only
  through anatomy/containing-pieces surfaces and never as independent "learned" rows.
- Example relationships: every entry links to its approved family seeds (where-met,
  where-used).
- Word/lemma prototype opportunities: `voudrais → vouloir` (named, not taught); `répéter`
  lemma inside the formula; `un café`/`un thé` package↔noun links.
- **No independent dictionary store** — entries are projections of registry + mastery state.

## 12. Flashcard projection contract

Only the decided directions (FD-4): **intent/meaning → FR recall** (merci, au revoir,
request-arc) · **sentence context → missing piece** (`Bonjour, je voudrais ___, s'il vous
plaît.`) · **scenario → response recall** (stuck → formula; leaving → close) · **audio →
meaning/target recognition** (formulas, packages) · **selective FR → meaning** only where
genuinely useful (none required at L1; cognates are trivial). Isolated generic meaning
drilling ("What does merci mean?") is rejected (EV-091). Direction eligibility follows §5
treatments; supported items never appear in unscaffolded recall directions.

## 13. Practice Hub and carryover contract

- **Generated-safe**: request-arc slot swaps over the approved filler list (`un café`;
  `un thé` scaffold-given); function-recall prompts; missing-move completions.
- **Authored-only**: register contrasts and their trapReasons; rescue mini-scenes; all
  reveal/alternative copy.
- **Rescue-pair retrieval**: recurring hub family (formula recall under calm prompts).
- **Weakness return**: attributed politeness/landing/formula tags only.
- **Spacing return**: full request arc at spaced intervals.
- **Carryover into L2-L10**: je voudrais → L2 (`je voudrais être` preview band) and L9
  (infinitive cargo); formulas → every rescue beat; un café/un thé → L5 packages; merci/au
  revoir → L6/L7/L10 closes; excusez-moi → L8 opener.
- **Must not be generated**: new fillers, ghost production, formula recombination, deferred-
  list content. The Hub is volume over this lesson's identities — never a second curriculum.

## 14. Audio and Dictée contract (no files created here)

- **Item recording priorities** (10): the six Active surfaces + four Supported-new.
- **Sentence-family priorities**: request-arc anchors + rescue pair + close pair (~10-12
  clips).
- **Shadowing (EV-004)**: `Bonjour`; `Bonjour, je voudrais un café, s'il vous plaît.`; both
  formulas (rising contour of `Vous pouvez répéter ?`).
- **Audio Recognition (EV-014)**: formula discrimination; request vs close.
- **Micro Dictée**: `merci`; `un café` span (post-ownership).
- **Guided Dictée**: `Je voudrais ___ s'il vous plaît` (A-span cloze; everything else given).
- **No L1 Sentence Dictée** (Inventory §12.8); Context Dictée deferred.
- **Slow mode = playback-rate** on the single source recording; no duplicate slow recordings
  (sound-teaching clips are the only approved exception class).
- **No pronunciation scoring**; shadowing stays ungraded.
- **Audio failure attribution**: defective/degraded audio is content/audio-source error —
  never learner weakness; report-issue tap available.

## 15. Content Factory contract

- **Allowed templates**: request-arc frame; opener/close moves; rescue mini-scene; register
  contrast pair (display); hub slot-swap.
- **Approved variable slots**: the item slot in `je voudrais ___` over the approved filler
  list only.
- **Treatment-aware generation**: generated demands must respect §3 treatments and the §8
  whitelist; supported material only in scaffolded positions; ghost only in scene copy.
- **Deterministic validation** (typecheck/validate-content/validate-pools class) before any
  review; **French QA** by a named human before approval (AI never self-assigns PASS).
- **Duplicate control**: near-duplicate surface strings collapse to accepted alternatives of
  one seed, not new seeds.
- **Prohibited generation**: new identities, treatment transitions, hidden Active demands,
  mastery promotion, inverted questions, deferred-list content, formula splits, unvalidated
  publication.

## 16. Registration blockers

| Item | Class |
|---|---|
| Register `chunk-excusez-moi`, `chunk-je-ne-comprends-pas`, `chunk-vous-pouvez-repeter`, `chunk-un-the`+`noun-the` (with primary↔linked relationship) — all after French QA | **Blocks runtime content implementation; does NOT block document-level sentence authoring** (seeds may cite the proposed handles marked `PROPOSED RUNTIME ID — NOT REGISTERED`) |
| `un thé` primary/linked designation honored at registration (package primary per IC-004) | blocks registration itself being done right; direction recorded here |
| Sentence IDs (`sent:`-class registry) for approved seeds | blocks Content Factory schema + audio manifest binding; not document authoring |
| Audio IDs (`entityId → audioId`) | later (audio manifest workstream) |
| Event/mastery spine implementation | later (separate implementation gates) |
| Legacy dual identities (`café`, `question`) | non-blocking for L1 authoring (conservative reuse rule); resolve before event-spine work |

## 17. Authoring acceptance checklist (every future L1 seed must pass)

1. Human French QA (naturalness + correctness; feminine/register display per context);
2. treatment eligibility (§3/§5 — no demand above an item's treatment);
3. Active-demand audit (nothing beyond the six Active surfaces required unscaffolded);
4. identity trace (every tracked surface cites a registered or `PROPOSED — NOT REGISTERED`
   handle);
5. Ghost non-requirement (no ghost in required output, options-as-correct, or `piecesUsed`);
6. naturalness (a native would say it; rescue tail present where natural);
7. exercise eligibility (only §9 variations; traps carry reasons);
8. Mon Lexique eligibility consistent with §11;
9. flashcard eligibility consistent with §12;
10. audio eligibility (clean TTS text now; recording priority tagged; no placeholders);
11. duplicate check (accepted-alternative collapse applied);
12. Content Factory derivation safety (template + slot conformance, §15).

## 18. Readiness verdict

**READY WITH BOUNDED REGISTRATION GAPS.**

The next task may author the **full L1 sentence ecosystem** (28-40 seeds) against this frozen
contract: the payload, counts, treatments, families, whitelist, exercise set, and projection
contracts are all decided. The bounded gaps are registration-side only — the four G1
identities (plus the `un thé` primary/linked pair) remain unregistered and must be cited via
their `PROPOSED RUNTIME ID — NOT REGISTERED` handles until a separate, reviewed registration
task (with French QA) lands. No seed becomes runtime content before that registration and its
own gates.

*End of L1 Authoring Contract v0.1 — Draft vertical-slice planning artifact. Revise if the
Curriculum Charter, Content Bible, Mastery & Evidence Bible, Lesson Flow Canon, Payload
Economy, or PRJ-015 changes.*
