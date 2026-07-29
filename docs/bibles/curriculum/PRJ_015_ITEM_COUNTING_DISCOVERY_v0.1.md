---
title: Cairn PRJ-015 Item-Counting Discovery
version: 0.1
status: Discovery — PRJ-015 remains OPEN
authority: None. Maps counting units, conflicts, and candidate models; decides no methodology and authorizes no implementation.
owner: Curriculum
date: 2026-07-29
audited_head: 14fcca5ea38e90456a02f7602519f4f8c0dc1a7e
implementation_authority: none
related:
  - CURRICULUM_CHARTER_v1.0.md
  - CURRICULUM_LAYER_DISCOVERY_v0.1.md
  - ../content/CONTENT_BIBLE_v1.0.md
  - ../mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md
---

# Cairn PRJ-015 Item-Counting Discovery v0.1

> **Discovery only. PRJ-015 remains `OPEN`.** This document maps every
> materially different meaning of "item count" in Cairn, explains why
> different files produce different numbers, and reduces PRJ-015 to a small
> founder decision surface. It **does not** resolve the methodology, does
> not draft the Item-Counting Contract, does not alter the Content Bible's
> active-new **1–4** invariant, does not declare L17 compliant, and
> authorizes no validator, migration, or runtime change. Per Curriculum
> Charter §14, **no numeric counting rule may claim precision before
> PRJ-015 is resolved** — including anything in this discovery.

---

## 1. Executive verdict

**Recommendation: MULTI-LEDGER CONTRACT JUSTIFIED** (three ledgers —
identity, acquisition, presentation/load — plus an optional fourth
lexical-destination ledger; full rationale §12–§13, honest caveats §13.4).

> **Founder review completed 2026-07-29.** FQ-P1…FQ-P6 were **APPROVED** —
> FQ-P1/P2/P3/P5 as recommended; **FQ-P4 and FQ-P6 with revised founder
> wording** (P4: not "one surface → one id" but *"each separately owned
> pedagogical unit or sense has one primary acquisition identity; additional
> representation or analysis granularities may exist as linked
> sub-identities"*; P6: 30–45 becomes a historical non-binding heuristic
> not carried into the Contract; breadth trajectory retired pending
> redefinition). FQ-P1 was approved as a **minimal three-context
> conceptual model** — an accounting distinction, not a technical
> multi-store architecture; no databases, stores, schemas, registry
> unification, or validators are authorized, and no lexical-destination
> ledger is opened. **Lean Contract drafting is authorized**:
> [`PRJ_015_ITEM_COUNTING_CONTRACT_v0.1.md`](PRJ_015_ITEM_COUNTING_CONTRACT_v0.1.md)
> (Draft — awaiting founder sign-off). **PRJ-015 remains `OPEN`** through
> draft and review. This discovery remains non-Canonical provenance; all
> CNT rows, source analysis, and the L17 "3–5 / 5" facts stand unchanged,
> and L17 is still **not** declared runtime-compliant.

The audit's core findings:

1. **"Item" is not one unit.** Forty distinct countable units are in live
   or documented use (§5); only one of them — the **accounting chip /
   registry itemId** — carries runtime identity. Roles (active, supported,
   recognition, ghost) and presentation surfaces (UI chips, highlights,
   model answers) are layers *over* that identity, not identities.
2. **The famous number conflicts mostly dissolve under unit analysis** —
   and the remainder are genuine open decisions:
   - **52/54/56 is fully explained** and is *not* a live conflict (§8):
     52 = the same registry snapshotted one hygiene-commit earlier;
     **56 was never real** (a `grep -c '"'` artifact counting two JSON
     keys); 54 = today's registry ≡ manifest, test-enforced bidirectionally.
   - **1–4 vs 8–15 is a unit clash, not (only) a size clash** (§7): the
     specs' "Active — new" row counts *every listed ID* — chunks, frames,
     `phen:` meta entries, `sent:` anchors, and graduated items alike —
     while the founder-ratified 1–4 governs *learner-facing active
     production*. G4's suspicion — "the numbers may be measuring
     differently" — is **confirmed as fact**, but the precise unit of 1–4
     is still **unratified** (§17, FQ-P2).
   - **L17 plausibly reconciles without payload reduction** under a precise
     ontology (its 5 = 2 frozen chunks + 1 adjective + 2 meta `phen:`
     entries; the spec itself says "≤2 new lexical items") — but this is
     **not declared compliant**, because no ratified rule yet says meta
     entries don't count (§10).
3. **The deepest structural problem is identity, not arithmetic** (§8):
   two disjoint registries (54 hyphen-ID v1 items vs 59 colon-ID
   learning-engine items), a third documented prefix vocabulary, shipped
   split identities (`noun-cafe`/`chunk-un-cafe`) frozen by YASA 2, raw
   `piecesUsed` surface strings with no identity, and a legacy
   string-keyed weakness store. Counting cannot be precise while identity
   is quadruplicated.
4. **One universal count is neither possible nor desirable** (§12-A): the
   Charter's Canonical CC-008 already declares four non-conflatable
   counting layers, "linked, never merged" multi-granularity is a design
   principle, and Product's ~3,000-words band uses a lexical unit no
   registry count can serve.

---

## 2. PRJ-015 scope and authority

PRJ-015 (`OPEN`, Canonical home: Curriculum — Project Register; Content
Bible §20.2; Charter §9/§13) owns: how an "item" is counted toward
budgets; whether frame + fillers count as one or several; how multiword
chunks count; the reconciliation of active-new figures; the counting rule
behind any future validator precision claim. This discovery operates
inside the Charter's Canonical boundary (§2 below = Charter §2 applied):

- **Curriculum** owns the planning counting methodology, budget
  interpretation, introduction/promotion/recycle/exposure accounting
  across the sequence, whether roles need separate ledgers, and the
  planning-to-payload relationship.
- **Content** owns the **1–4 (integrations 0)** learner-facing invariant,
  item roles, protected-chunk policy, prerequisite safety, and what a
  valid content unit may contain. Curriculum may define how units are
  counted but **may not silently weaken 1–4** — nothing here does.
- **Mastery & Evidence** owns evidence attribution identity, what
  evidence attaches to, share-vs-split of mastery state, invalidation and
  provenance. **No counting contract may redefine mastery semantics** —
  this discovery records mastery-identity *consequences* (§11) and decides
  none.
- **Engineering** owns registry representation, ID schemas, validators,
  manifests, runtime identity, migration. Code here is Axis-B fact only.
- **Product** owns planning-band language (~3,000 words) and the promise.
  Nothing here operationalizes the band or turns it into a counter.

---

## 3. Source and classification method

Audited read-only at main `14fcca5`. Canonical/routing: Curriculum Charter
v1.0 (§2, §5, §9, §13, §14, §16), Curriculum Layer Discovery (§10, §12,
§17; CUR-017…019, CUR-027), Content Bible v1.0 + all five supporting
records (G4, CB-13/14/15/22, Q4 ratification text), Mastery & Evidence
Bible v1.0 (§7, §13, §14, §17–§20, §23, §26), Canon Map, Project Register,
Coverage & Gaps, ADR-0004/0011/0012/0013/0018/0022, Lesson Flow Canon §1,
Source of Truth Map, docs/README. Fragments: Syllabus Design Rules,
spec template v1.1, archetypes v1, chip taxonomy v0.3, ID convention v0.1,
Vocabulary/Grammar Progression, Lesson Status Matrix, all L0–L17 specs +
gate reviews, Level and Band Map, Chip Lifecycle, Integration Lesson
Logic, AI generation contract, coverage/lesson matrices, the L1–L15 chip
inventory audit + CSVs, Syllabus delta log, PAYLOAD_ECONOMY_v0. Runtime:
itemRegistry.ts, shipped manifests + their **git history**, all 16 v1
lesson files, learning-engine (types, events, mastery, mon-lexique,
lexique-memory, 8 contracts, items.ts), structure/manifest tests, legacy
v7 identity model. Full map §22.

Method: every claim carries a source; Axis-A intent, Axis-B runtime fact,
and inference are labeled; historical numbers are explained from git
history, not assumption; no generic linguistic convention fills a gap;
nothing is "rescued by assumption" — where no stable interpretation
exists, that is the recorded result.

---

## 4. Existing counting vocabulary

Four parallel type vocabularies name the units — none a superset of
another (a finding in itself):

1. **Doc ID convention (9 prefixes):** `word: chunk: frame: sent: phen:
   sound: trap: culture: cog:` (ID convention v0.1 §3).
2. **Chip taxonomy (13 types):** spine · active · recognition ·
   ghost/exposure · carryover · pattern · formula chunk · noun-package ·
   unpackable chunk · **accounting chip** · UI chip · inline highlight ·
   model answer (chip-taxonomy v0.3 §4). Types 1–9 are *roles*; only #10
   carries an itemId; #11–13 are presentation with **no identity**.
3. **Runtime `LearningItemType` (15 members):** verb · pronoun · chunk ·
   idiom · preposition · connector · noun · adjective · adverb ·
   sound-pattern · grammar-nugget · micro-contrast · culture-bite ·
   faux-ami · cognate — **no `frame`, `sent`, `phen`, or `trap` member**;
   frames/phenomena ship disguised as `grammar-*`/`micro-*`.
4. **Runtime status (4 scalar values):** active · supported · recognition ·
   recycled — one value per item, so the convention's per-lesson
   `status_by_lesson` **has no runtime representation**.

Plus the Canonical presentation vocabulary: **beats ≠ screens** (Content
Bible §6.4; Charter CC-008's four layers), and the Mastery vocabulary
(evidence events, error tags, weakness records, lifecycle statuses —
FQ-5: no universal ladder).

---

## 5. Counting ontology

The twenty audited unit kinds (Phase-3 list), each mapped to what exists.
"RT" = has runtime identity; "DOC" = documented only. Full 40-row detail
is preserved in the inventory (§ CNT table) — this section is the
condensed ontology.

| # | Unit | Definition (sourced) | IDs today | Countable? | Mastery identity | State |
|---|---|---|---|---|---|---|
| 1 | Canonical registry item (accounting chip) | the itemId-carrying identity unit; "may never be shown" | v1: 54 `type-slug`; engine: 59 `prefix:slug` — **disjoint** | yes — the primary count | evidence and weakness are item-keyed; **two ids = two disjoint mastery records** | current, RT, YASA-2-frozen |
| 2 | Lexical lemma / sense | locked ontology: `comprendre` is the lemma; surfaces are realizations, "not automatically a separate accounting chip" | none (no lemma field) | doc-level | shares whatever id exists | current DOC principle, no RT |
| 3 | Surface form | `suis/est/êtes` = "surface realizations of être, NOT separate accounting chips" (locked) | none — except legacy weakness keyed by **answer string** (a de-facto surface identity, frozen non-conforming) | no (by rule) | must share the parent's | current DOC rule; RT violated only by legacy store |
| 4 | Morphosyntactic phenomenon | named pattern/contrast (`phen:negation-ne-pas`) | `phen:` (doc); RT disguised as `grammar-*` | yes | separate id, "linked, never merged" | current; partial RT |
| 5 | Frame | slot structure (`frame:je-voudrais-plus-noun`) | `frame:` (doc); **no RT type** | yes | separate from its chunk by design | current DOC; partial RT via `grammar-*` |
| 6 | Frame filler | noun/adj/place inserted into a slot | none as filler; the filler word may be its own item | **undecided — the G4 question** | n/a | open |
| 7 | Chunk | fixed/semi-fixed multiword unit | `chunk:`/`chunk-` — 34 of the 54 | yes | own id | current, RT |
| 8 | Protected chunk | frozen sentence-shaped exception | literal strings, set of exactly 2 in test code | yes (2) | via their chunk ids | current, RT |
| 9 | Survival formula | closed-set whole formula (`je ne comprends pas`, `vous pouvez répéter ?`) | literal strings; **specified validator set never built** | yes (2) | via chunk ids | current DOC; RT gap |
| 10 | Noun package | article+noun as one unit; "gender enters as a package, not a rule" | `chunk-un-cafe` etc. — **and bare `noun-cafe` coexists: the shipped split** | yes | **SPLITS today** (two ids, one surface) | current, RT, defective |
| 11 | Split-sense doorway | own one narrow sense (aller=movement, faire=small-action) | sense-suffixed id **only on orthographic collision** (`word-y-place`, `adverb-ou-where`); `faire/aller/pouvoir` narrow senses have **no distinct identity** | as lesson property | narrow and future-broad sense **share** one identity for faire/aller/pouvoir | current; identity gap |
| 12 | Pronunciation/orthography phenomenon | `sound:` fact | `sound-elision`, `sound-liaison` | yes | separate | current, RT (2 instances) |
| 13 | Reading/passage unit | A Small Moment read = 2–3 sentences | **no id** — composed of 3 `sent:` ids + a `phen:`; `read:`/`passage:` prefix deliberately not coined | as composition | untracked as a unit | DOC only, open |
| 14 | Presentation occurrence | UI chip / highlight / model answer / screen appearance | optional itemId back-reference; `piecesUsed` = **raw French strings, never registry-checked** | yes, but ≠ identity | none of its own | current, RT (partially unattached) |
| 15 | Pedagogical introduction | first active/supported/recognition/ghost exposure | doc `status_by_lesson`; RT scalar status only; **ghost has no field anywhere** | yes (item × lesson) | n/a — modifies #1 | DOC; RT gap |
| 16 | Promotion event | recognition → supported/active graduation (`status_by_lesson`, "reuse ID, no fork") | doc mechanism; no RT | yes | same identity — explicitly no fork | current DOC |
| 17 | Recycle appearance | carryover role at query time — "a query-time role, not a stored status" | none | per occurrence | n/a | DOC; selector unbuilt |
| 18 | Mastery evidence target | what a LearningEvent credits | `itemIds[]` (plural per event; chain de-dup rule §20) | yes | *is* the identity consumer | current, RT |
| 19 | Mon Lexique entry | learner-facing entry; **collapses N linked ids into one** | derived from itemId; no entry id; N:1 by design | yes — strictly smaller than itemId count | pure projection, never moves mastery | current, RT (sandbox-gated) |
| 20 | Planning item | whatever the 8–15/30–45 layer counted | the specs' "Active — new" row = `len(list)` of **all** listed IDs, meta and anchors included | yes — the historical unit | mixed | current practice, uncodified |

Sixteen documented units have **no runtime identity at all** (ghost
chips, `sent:` items, `trap:` items, frames, `status_by_lesson`, the
SURVIVAL_FORMULAS validator set, structured `mainPieces`, passages,
LessonEvidenceProfile, evidence weights, invalidation records,
attribution fields, beats, the two selectors, non-orthographic split
senses, unpackable-chunk subpieces).

---

## 6. Counting contexts

Audited independently (Phase 4). No single number serves them all.

**A. Learner-facing active-new (Content's 1–4).** What Q4c ratified
(Ratification Pack, verbatim): "confirm **new-active-chips-per-lesson =
1–4** (PAYLOAD '1–3' / LESSON_FLOW '1–4', superseding learning-engine
§7's coarse '8–15'), **with item-counting methodology remaining an open
Curriculum question**." So the invariant's *existence* is founder-locked;
its *unit* ("chip") is not defined; and even 3-vs-4 carries recorded
confidence "High (existence); **Low (3 vs 4)**" against PAYLOAD's
founder-locked "1–3". Candidate units it could count: new active registry
identities · new active production **targets** · new frames · frame+
fillers · newly productive chunks · grammar phenomena. Evidence points
away from "every listed ID": the source metaphor is "chip" (a producible
piece), the archetype rule "Integration **0**" is satisfied by specs that
still list 2–3 `phen:` meta entries as "active (meta)" — meaning practice
already treats meta as not-really-load — and PAYLOAD's rationale is "the
fix is NOT more active chips" (a learner-load argument). **The invariant
is not weakened here; its unit is FQ-P2.**

**B. Curriculum planning budget (8–15 / 30–45).** Established: the specs'
"Active — new" row literally counts list length across **mixed units**
(words, chunks, frames, phenomena, sentence anchors, graduated items,
"light"/"transform" items). Actual counts: L1 9 · L2 10 · L3 10 · L4 8 ·
L5 8 · L6 4 · L7full 8 / L7compact 1 · L8 7 · L9 8 · L10 2 · L11 8 ·
L12 5 · L13 2 · L14 5 · L15 6 · L16 3 · L17 5. The 8–15 band therefore
measures a **broad planning unit that mixes granularities and roles** —
outcome per Phase 4-B: *it uses a broader planning unit AND mixes status
roles AND is internally inconsistent* (the retrospective's own verdict:
"the L1 'active 13' overstates generativity… the single most misleading
number in the spine"; L4 admits its real load is "four moves"; L5 admits
four of eight entries are the real load). It is **superseded for
learner-facing active production** (Content Bible) yet still stands
unbannered as `[CANONICAL]` in Syllabus Design Rules and the spec
template — a live drift risk (§14-F4). The 30–45 total-exposure band is a
distinct exposure measure whose floor is unreachable for L1–L6 "without
fabrication" (audit). **The numbers are not rescued by assumption**: no
single stable interpretation of "8–15 active" exists; the honest
disposition is supersession-plus-recount under the future contract.

**C. Registry inventory (the 54).** The 54 counts **v1 runtime registry
identities** — one implementation inventory, nothing more: not learner
vocabulary (34 of 54 are chunks; packages and bare nouns double-count
some lexemes; `phen:`-like `grammar-*` items are not vocabulary), not
mastery targets in the shipping build (shipping stages emit no engine
evidence), not authored concepts (the engine registry has 59 *different*
ids for overlapping concepts). 52/54/56 explained in §8.

**D. Lesson payload accounting.** Practice is **consistent in form**
(every spec has the same budget table; count = list length) and
**inconsistent in substance**: L1 uniquely splits active-recycled from
active-new; L2's budget row and its §6.1 table contain *different* sets
with the same count; L3 counts transforms of owned items as new; L5
counts re-packagings of L1 items; L9 re-counts `ça` (already active-new
in L3); `phen:integration-review` is counted as active-new **three
times** (L10, L13, L16); L12/L15 count `sent:` anchors — which ADR-0004
says are "model-answer-only, never a chip"; gate reviews and specs
disagree on membership (L15: `je dois` active in review, supported in
spec); production targets are a separate count (sentences, 4–8) that
inverts against active-new in integrations. ID styles split at L6
(hyphen → colon) with sanctioned dual use.

**E. Vocabulary destination (~3,000 words).** PB-012 is a planning band,
"never a counter"; no syllabus-layer document defines its unit. A future
operationalization would have to choose among lemmas / senses / registry
items / chunks / active-only / active+receptive / packages / MWEs — the
audit records the **question**, not an answer, and this discovery does
not operationalize the band. Note only: registry-id counts cannot serve
it (34/54 are chunks; Lexique entries are N:1 collapses).

**F. Mastery identity.** Mechanical rule today: mastery is keyed by
itemId, so **share vs split is decided entirely by ID design** — the
Bible never addresses duplicate ids directly. Worked consequences:
`noun-cafe` vs `chunk-un-cafe` → splits (the known defect, now frozen by
YASA 2 — "one surface → one id" cannot be executed by rename);
one verb, multiple senses → shares for `faire/aller/pouvoir` (no sense
ids), splits for `y/où` (orthographic suffixing); protected negative
chunk vs underlying negation → separate ids by design (chunk vs
frame/phen — linked, never merged); frame vs filled sentence → separate
(frame id vs `sent:` non-identity); recognition form vs active core →
same id, status-graduated ("reuse ID, no fork"). A second identity axis
exists: the legacy weakness store keys by **answer string** (frozen,
non-conforming, not to be modified).

**G. Presentation and screen load.** **Beats ≠ screens is preserved** and
this discovery does not merge load measurement into item identity: beats
(8–12), rendered screens (11–14 budget vs 8–12 shipped), sections (10),
micro-actions, insight quotas, and UI-chip occurrences are a separate
counting family with three residual internal tensions: the Lesson Flow
Canon's "single budget / no uncounted screen" framing vs the Content
Bible's two-layer supersession; §1.4's "doesn't count" carve-outs; and
the Build Spec's per-band screen counts (8–20) that band a number no
other source bands. Two documents both claim to be the "single canonical
home" for the numbers (Content Bible Ch. 19 vs Difficulty & Cognitive
Load 2026-07-18) — flagged, not resolved.

---

## 7. Current numeric claims and what they measure

| Claim | Source | Apparent unit | Actual unit established? | Current authority | Compatible with 1–4? | Disposition |
|---|---|---|---|---|---|---|
| active-new **1–4** (integrations 0) | Content Bible §5.2/§6.8; LFC §1.1 "müfredat disiplini, DEĞİŞMEZ" | "chips" — learner-facing active production | **No — unit unratified (the PRJ-015 core)** | Founder-ratified invariant (Q4c) | — (it is the reference) | Keep; ratify unit via FQ-P2 |
| active-new **1–3** | PAYLOAD §3 ("locked by Haktan"), CB-15 | chips | no | founder-locked in PAYLOAD; ratification chose 1–4 with recorded Low confidence on 3-vs-4 | subsumed | surface to founder inside FQ-P2 (3 vs 4) |
| integrations **0** | Content Bible §6.8; D&CL LOCKED DEFAULT | active-new chips | no | derived, founder-ratified | consistent | keep; note archetype #10's "~0–4" conflicts (F5) |
| planning **8–15 active-new** | Syllabus Design Rules r3 `[CANONICAL]`; template §6; archetypes ~4–14 | mixed-granularity listed IDs (established by §6-D practice) | **partially — a broad mixed unit, internally inconsistent** | superseded for active production (Content Bible); unbannered in fragments | measures differently — confirmed | supersede everywhere + recount under contract (FQ-P6) |
| total exposure **30–45** | same sources | all-tier exposure estimate | partially (exposure incl. recognition) | planning target, "not validator"; floor unreachable L1–L6 | different context | keep only as planning-exposure ledger target, re-based (FQ-P6) |
| per-lesson spec counts (1–10) | L0–L17 specs | list length of "Active — new" row | yes — established as mixed-unit list length | working-spec values | mixed — see §10 for L17 | re-express under the contract; source facts preserved |
| **52 / 54 / 56** | audit / registry+manifest / grep artifact | registry identities | **yes — fully explained (§8)** | Axis-B fact | n/a | close the mystery in docs; **59** (engine registry) is the real second number |
| ~**3,000 words** | Product Brain PB-012 | words (lexical; unit undefined) | no | planning band, never a counter | different unit family | leave un-operationalized; unit decision deferred (contract's optional 4th ledger) |
| L17 **3–5 / 5** | L17 compact spec + operator lock | mixed: 2 chunks + 1 word + 2 phen | yes — composition established | working-spec value, gated by Charter | **plausibly yes at 2–3 learner-facing; NOT declared compliant** (§10) | resolve via FQ-P2 ratification, not payload edit |
| beats **8–12** | Content Bible §6.4/§6.5 | pedagogical steps | yes | `[FL]`/TUNABLE | different family | keep (presentation ledger) |
| screens **11–14** | LFC §1.1; Content Bible §6.4 | rendered screens | yes | TUNABLE (spec-only enforcement) | different family | keep (presentation ledger); reconcile "single budget" framing (F7) |
| shipped screens **8–12** | Charter §9; v1 lesson files | screens[] length | yes | Axis-B fact | different family | record as as-built vs budget divergence |
| Build Spec per-band **2–12 active / 8–20 screens** | §39.2 — "Budget is cognitive load, not visible chip count" | self-declared cognitive load | its own unit, unreconciled | approved-spec intent only; A0 top (5) exceeds 1–4 | conflicts at top end | historical/reference input (already demoted by FQ-C2); never cite as budget |
| production targets **4–8** | every spec | sentences to produce | yes (sentences) | planning target | separate count by design | keep as its own row in the acquisition ledger |
| candidate inventory **15–46/lesson**; **~1.5 payload/engine** | Vocabulary Progression / audit | candidate quarry rows — "no candidate is converted into lesson load" | yes | audit analysis | different context | keep as quarry metric only |
| breadth trajectory **L5 18–22/30–35 · L15 45–55/70–90** | Content Bible Ch. 19 (PAYLOAD §9) | **no stated denominator anywhere** | **no** | planning target (audit metric) | unknown | denominator must be defined by the contract or the metric dropped (FQ-P6) |

---

## 8. Registry and identity reality

- **54** = `itemRegistry.ts` entries ≡ `shipped-item-ids.json` ids,
  enforced equal **bidirectionally** by test; no test asserts the literal
  number. Prefix census: chunk-34 · noun-5 · verb-3 · pronoun-3 ·
  grammar-3 · word-2 · sound-2 · micro-1 · adverb-1. No lemma/sense/
  surface field exists; `relatedItemIds` is a free list, not a linkage
  system.
- **52** = the same registry at commit `84a5b8e` (2026-07-03), the chip
  audit's base — before hygiene commit `9c799d9` added `word-ici` and
  `noun-faim`. The audit's own split: 52 = 41 used + 11 dormant.
- **56 was never real.** The manifest has contained exactly 54 ids in
  both commits that ever touched it; `grep -c '"'` yields 56 by counting
  the `note` and `ids` JSON keys. ADR-0012's "54-vs-56 drift" consequence
  line no longer matches the tree — the drift statement itself is the
  stale artifact. The vault matrices' "cite each source's own number"
  instruction preserved a phantom.
- **59** = the *other* registry: `learning-engine/items.ts`, colon-ID
  fixtures (`chunk` 39 · `grammar_piece` 12 · `error_pattern` 5 ·
  `noun_phrase` 1 · `culture_piece` 1 · `sound_pattern` 1) — **disjoint
  from the 54**, no cross-link, and its 8 lesson contracts' activeNew
  counts match *neither* the specs nor the v1 lessons (L1: fixture 4 /
  spec 9 / v1 `learningItems` 5; L11: 6 / 8 / 7).
- **Identity defects (Axis B):** shipped split identities
  `noun-cafe`/`chunk-un-cafe` and `noun-question`/`chunk-une-question`
  (plus the same pattern in `noun-faim`/`chunk-j-ai-faim`,
  `noun-pause`/`chunk-faire-une-pause`, `verb-etre`/`chunk-je-suis`…);
  v1 lessons disagree with the audit about which id owns "un café";
  `piecesUsed` recap chips are raw strings never checked against the
  registry (including `"ne ___ pas"`, unresolvable in principle);
  sentence-shaped accounting items ship (`chunk-je-suis-ici`,
  `chunk-j-ai-une-question`) — legal under the accounting/UI split, but
  the shipped counterpart of the sentence-chip rule's edge; the legacy
  weakness store keys by answer string. **YASA 2 freezes all shipped
  ids**, so the taxonomy's "one surface → one id" mitigation cannot be
  executed by rename or deletion — only by linking (§14-F1).

---

## 9. Lesson-spec consistency audit

Form is uniform (same budget table everywhere; count = list length).
Substance is not:

1. **Unit mixing:** `phen:` meta entries counted as "active (meta)" in
   L5, L10, L13, L14, L15, L16, L17; `sent:` anchors counted in L12 and
   L15 despite ADR-0004's model-answer rule; graduated items counted as
   new in L3 (×2), L4, L5 (×2), L8, L9, L12, L14.
2. **Re-counting:** `phen:integration-review` is active-new in L10, L13,
   **and** L16; `ça` is active-new in L3 (chunk) and again L9 (word);
   `je ne suis pas` is active-new in L3 (chunk) and L6 (frame);
   `faire une pause` generates fresh active-new entries in L9 and L11.
3. **Membership drift:** L2's budget row vs its §6.1 table (same count,
   different sets); L15 spec vs gate review (`je dois` demoted, count
   back-filled with a `phen:` + a `sent:`); L17 gate review labels
   `j'ai faim` "ACTIVE (recycled)" where the spec's table says
   supported/recycled.
4. **Style split:** hyphen IDs L1–L5, colon IDs L6–L17, deliberate kebab
   reversion in the L7 compact spec — sanctioned by the template
   ("both acceptable until the post-smoke migration") and codified as
   going-forward-only by the convention.
5. **Self-aware honesty:** the corpus repeatedly flags its own inflation
   (retrospective §5: fixed social chunks inflate L1; L4 "four moves";
   L5 "the real load is four"; L8 "cognitively lighter than it looks";
   L11 "the genuinely new load is one modal verb + the mechanic") — the
   raw counts were never trusted as load by their own authors.

---

## 10. L17 worked reconciliation

Facts (all preserved; L17 not edited): operator-locked note "3–5 active";
spec's Active-new = **5**; Canonical constraint 1–4; Charter: "5" not
ratified, implementation blocked pending reconciliation or proof of
different units.

**What the five entries are** (spec §4/§6, verbatim classification):

| Entry | Kind | Genuinely a new active production target? |
|---|---|---|
| `chunk:ca-va-question` (*Ça va ?*) | frozen chunk | **yes** — new, produced |
| `chunk:ca-va` (*Ça va.*) | frozen chunk | **yes** — new, produced (arguably one concept-pair with the question form) |
| `word:content` | adjective | **yes** — the one new slot-usable lexical item |
| `phen:social-check-in` | meta ("active (meta, new)") | **no** — a named move, not a producible piece |
| `phen:human-context-feelings-light` | meta | **no** — lesson framing |

The spec itself asserts "**≤2 new lexical items** (`ça va` chunk-set +
`content`/`contente`)" and "chunks + 1 adjective + meta; **0 system**" in
the same breath as "Active — new = 5".

**Finding:** the conflict **plausibly disappears under a precise
ontology** — if the 1–4 invariant counts *learner-facing new active
production targets* (excluding `phen:` meta and counting the frozen
`ça va` pair as one or two chunks), L17's learner-facing count is **2–3,
inside 1–4**, and **no payload reduction is needed**. This matches the
gate review's intent ("adds ≤2 new lexical items") and the corpus-wide
"active (meta)" practice.

**But L17 is NOT declared compliant here**, for exactly the reason the
Charter states: no ratified rule yet defines the unit — "meta doesn't
count" is an audit-supported *candidate* rule, not canon. Until FQ-P2 is
answered: the "5" stays gated; if the founder instead ratifies
"every listed ID counts", the L17 payload **must later be reduced** (drop
or reclassify the two `phen:` entries — a Content/Curriculum edit under
its own review, not this document).

---

## 11. Mastery and Mon Lexique implications

Recorded consequences only — no semantics redefined:

- Mastery is item-keyed; **counting design IS mastery-identity design**.
  Every split id splits evidence; every merged id merges it. The Bible is
  silent on duplicate ids; the taxonomy's "mastery would split" is the
  correct mechanical inference.
- Ghost/exposure can never create weakness (Canonical) — so a counting
  unit that pulled exposure into production budgets would contradict
  Mastery's attribution firewall. The ledgers must keep exposure separate.
- Chain aggregation already de-duplicates over-crediting (first success
  carries targets) — a precedent for "occurrences ≠ credits".
- Mon Lexique entries collapse N linked ids into one learner entry
  (N:1, no entry id, "a VIEW, not a wordbook") — so **no Lexique count
  can validate a registry count** or vice versa; and no rule yet says
  *which* linked id owns an entry.
- The legacy string-keyed weak-spot store is a frozen, non-conforming
  second identity axis; the contract must not inherit it.
- `LessonEvidenceProfile` is "a multiplier, not an exercise count" —
  evidence *distribution* is not an item count and stays routed to
  Curriculum separately (CUR-034).

---

## 12. Candidate models

**Model A — One universal count** (every context uses one canonical
unit, presumably registry identity).
*Simplicity:* highest. *Validator usefulness:* superficially high.
*Fatal problems:* destroys pedagogically real distinctions the canon
already locks — multi-granularity is "linked, never merged" (one concept
legitimately = chunk + frame + phen = 3 ids, which would triple-count
every concept or force merges YASA 2 forbids); beats/screens/exposure
cannot use item identity (CC-008 Canonical); the 3,000-word band needs a
lexical unit no registry serves; meta/`phen:` entries would either count
as learner load (false) or need exactly the role-exclusion rule that
breaks universality. *Migration:* forces the disjoint-registry merge
immediately. **Rejected by the audit.**

**Model B — One canonical item identity + role-weighted totals** (one
identity ledger; roles layered; each budget defined as a role-filtered
count over identities).
*Can it explain the numbers?* 1–4 = count of identities newly carrying
the `active` role for production (plausibly, once meta/anchors are
excluded); 8–15 = the unfiltered mixed count (explained as bad filtering);
total exposure = all-role count; mastery identity = the same ledger
(clean). *Where it strains:* presentation/load (occurrences, beats,
screens, UI chips) is **not** a role-filtered identity count — it needs
per-occurrence counting; `status_by_lesson` makes role an (item × lesson)
fact, so "role-weighted" already implies a second ledger axis; the
lexical destination still doesn't fit; and phenomena-as-identities
(`phen:`) must either count somewhere or be excluded by role — i.e. B
quietly grows the extra ledgers it claims to avoid. **Viable as the
identity+acquisition core; incomplete as a full contract.**

**Model C — Multi-ledger accounting.**
1. **Identity ledger** — canonical item/phenomenon IDs (one id space,
   linked granularities, sense policy; shared with Mastery — identity is
   *joint* Curriculum/Content/Mastery/Engineering surface, per §2).
2. **Acquisition ledger** — learner-facing introductions and promotions
   per lesson: active-new (the 1–4 home), supported-new, recognition-new,
   graduations, production targets. Keyed (item × lesson) — exactly what
   `status_by_lesson` already documents.
3. **Presentation/load ledger** — occurrences, beats, sections, rendered
   screens, exposure density, UI chips. Already Canonically separate
   (beats ≠ screens; CC-008).
4. *(Optional)* **Lexical destination ledger** — lemma/sense/chunk
   accounting for the ~3,000-word planning band; explicitly deferred.
*Cross-links preserve coherence:* every acquisition row references an
identity-ledger id; every presentation occurrence may back-reference one;
no ledger's total is ever compared to another's without a stated mapping.
*Cost:* three definitions instead of one; authors must know which ledger
a number lives in.

**Other sourced models:** the Build Spec §39.2's per-band "cognitive
load" budget is a materially different model (load-as-unit); it is
already demoted to historical/reference (FQ-C2) and fails traceability
(its unit was never defined). The Difficulty & Cognitive Load ledger
(`activeNewCount + supportedTargetCount + …= totalProductionLoad`) is not
a rival model — it is an early *acquisition-ledger draft* and folds into
Model B/C's acquisition layer.

---

## 13. Comparative evaluation

Against the Phase-8 criteria (✓ = satisfies, ✗ = fails, ~ = partial):

| Criterion | A | B | C |
|---|---|---|---|
| Compatible with 1–4 invariant (no weakening) | ✗ (forces redefinition) | ✓ | ✓ |
| Prerequisite safety | ~ | ✓ | ✓ |
| L17 reconciliation | ✗ | ✓ (role exclusion) | ✓ (acquisition-ledger unit) |
| Frames + fillers | ✗ (triple-count or merge) | ~ (needs linked-concept rule) | ✓ (identity linkage + acquisition rule) |
| Multiword chunks / packages | ~ | ✓ | ✓ |
| Split senses | ✗ | ~ | ✓ (identity-ledger sense policy) |
| Gender/inflection | ✓ (locked ontology holds in all) | ✓ | ✓ |
| Mastery identity | ✓ (trivially shared) | ✓ | ✓ (identity ledger shared) |
| Mon Lexique | ✗ (N:1 collapse breaks it) | ~ | ✓ (projection over identity) |
| Vocabulary planning | ✗ | ✗ | ~ (optional 4th ledger, deferred) |
| Validator feasibility | ~ (precise but wrong) | ✓ | ✓ (per-ledger lints) |
| Migration debt | ✗ (forces registry merge now) | ~ | ~ (identity unification needed eventually either way) |
| Author usability | ✓ (one number) | ~ | ~ (must name the ledger) |
| Cognitive-load usefulness | ✗ | ~ | ✓ (dedicated ledger) |
| Backward compatibility with specs | ✗ | ~ | ✓ (specs already *are* proto-multi-ledger: budget rows + production targets + exposure) |
| Source traceability | ✗ | ✓ | ✓ |
| Risk of false precision | **high** | medium | **lowest** (each number's unit is named) |

**13.4 Honest caveats on the recommendation.** C wins on the audit, not
by richness: the decisive facts are (i) CC-008 already Canonically
mandates ≥2 separate layers, (ii) the specs already run three parallel
counts (active-new / production targets / total exposure), and (iii) the
1–4-vs-8–15 clash is only explicable as two ledgers. The real risks of C
are governance (three definitions to keep coherent; ledger-shopping by
future authors) and the temptation to over-engineer the optional fourth
ledger — the contract should open with the smallest viable version:
**one identity rule-set + one acquisition rule-set + the existing
presentation vocabulary**, nothing more. Model B remains a legitimate
founder fallback: it is C minus the explicit presentation ledger, and the
presentation family is already separately canonized — the difference is
mostly whether the contract *names* that family as a ledger.

---

## 14. Conflicts and failure modes

- **F1 — YASA 2 vs "one surface → one id".** Shipped split identities
  cannot be renamed or deleted; only forward policy + linking can heal
  them. Any contract must define the linking mechanism's semantics
  (Engineering representation; Mastery consequences routed, not decided).
- **F2 — Two disjoint registries (54 vs 59), plus a doc convention
  matching neither.** Counting precision is impossible across systems
  until identity is unified — a migration decision explicitly *not*
  opened here.
- **F3 — Raw `piecesUsed` strings** (80 entries incl. unresolvable
  `"ne ___ pas"`) leave the recap surface uncountable and un-attributable.
- **F4 — Unbannered superseded numbers**: 8–15 still `[CANONICAL]` in
  Syllabus Design Rules and live in the spec template — the same drift
  class as the Charter's N1; an agent authoring L18 from the template
  today would reproduce the mixed count.
- **F5 — Integration active-new: 0 (Canonical) vs ~0–4 (archetype #10)
  vs practiced 2–3 meta entries** — resolved in practice by "active
  (meta)" labeling that no canon defines.
- **F6 — Sense-suffixing only on orthographic collision** leaves
  faire/aller/pouvoir narrow senses mastery-indistinguishable from their
  future broad senses, while convention §11 "leans" the opposite way it
  practices.
- **F7 — Competing "single canonical home" claims** for numbers (Content
  Bible Ch. 19 vs D&CL) and mixed cap denominators (per-lesson /
  per-sentence / per-unit) flattened in Ch. 19's table.
- **F8 — Phantom numbers propagate**: the never-real 56 lives on in
  ADR-0012's consequences and vault matrices; the breadth trajectory has
  no denominator; the Build Spec's load-unit budgets band screens by
  CEFR. Failure mode: future documents citing each other's artifacts.

---

## 15. Ownership and routing

| Decision | Owner | Consulted |
|---|---|---|
| Counting methodology (all ledger definitions) | **Curriculum** (PRJ-015 home) | Content, Mastery, Engineering |
| Unit of the 1–4 invariant | **Content** (the invariant) + **Curriculum** (the counting rule) — joint FQ card | Founder |
| Identity-ledger policy (one id space, linking, sense policy) | Curriculum + Content (definition) / **Engineering** (representation, migration) / **Mastery** (attribution consequences — routed) | Founder for the policy |
| Registry migration / merge of the two id spaces | **Engineering** — explicitly NOT opened by PRJ-015 | — |
| Evidence semantics of linked/split ids | **Mastery & Evidence Bible** — never the counting contract | — |
| ~3,000-word unit | **Product** (band) + Curriculum (future ledger) — deferred | — |
| Presentation budgets (beats/screens) | **Content** (already Canonical) | — |

---

## 16. Decisions already settled (the contract must not re-open)

Active-new 1–4, integrations 0 (founder-ratified; only its *unit* is
open) · beats ≠ screens · no full-sentence chips; model answers are never
chips (ADR-0004) · surface forms are not automatically separate
accounting chips; a sentence is not a chip; noun+article may be one
package; gender enters as a package (locked ontology) · protected chunks
frozen at 2; survival formulas a closed class of 2 · promotion is
explicit, same-ID, status-marked ("reuse ID, no fork") · shipped itemIds
are immutable forever (YASA 2) · error tags frozen (YASA 3) · ghost
exposure can never create weakness · Mon Lexique is a projection that
never moves mastery · multi-granularity IDs are linked, never merged ·
recognition alone never auto-adds to Lexique · evidence is item-keyed and
append-only.

## 17. Decisions genuinely open (the contract's surface)

1. The counting model itself (single / role-layered / multi-ledger).
2. The exact unit of 1–4 (incl. meta/`phen:` exclusion, `sent:` anchors,
   graduated items, and the residual 3-vs-4).
3. Frame + fillers (one, several, or linked-concept-once).
4. Chunks / noun packages / formulas as counting units, and the healing
   policy for shipped split identities under YASA 2.
5. Sense/inflection/gender identity policy beyond orthographic collision.
6. Curriculum accounting vs mastery identity linkage rules (share/split
   defaults — semantics stay Mastery's).
7. Status and fate of 8–15 / 30–45 / breadth-trajectory numbers.
8. (Deferred, recorded) lexical-destination unit for ~3,000 words;
   `read:`/`passage:` identity; `status_by_lesson` runtime representation;
   registry unification — all Engineering/later.

---

## 18. Founder decision cards

Six cards (target 4–7). None asks for an implementation schema; all cite
existing sources only.

> **Founder decisions 2026-07-29:** all six cards **APPROVED** — P1/P2/P3/P5
> as recommended below; **P4 and P6 with revised wording** recorded in the
> §1 banner and folded verbatim into the Contract draft (IC-004, IC-006).
> The original recommendations and alternatives below are preserved as the
> decision trail.

**FQ-P1 — Counting model.** `BLOCKING FOR CONTRACT` — **APPROVED
2026-07-29** (minimal three-context conceptual model; no technical
architecture; no fourth ledger).
*Conflict:* one number (8–15-style) demonstrably served identity,
acquisition, and exposure at once and produced the 1–4 clash; CC-008
already splits layers. *Worked example:* L11's "8 active-new" vs its own
"genuinely new load is one modal verb + the mechanic". *Recommended:*
adopt the **multi-ledger contract** (identity + acquisition +
presentation; lexical ledger deferred), smallest viable version first.
*Alternative:* Model B (role-layered single identity) — accepts the same
identity+acquisition core, leaves presentation implicitly separate.
*Consequence:* every future number must name its ledger; validator
precision becomes possible per-ledger. *Owner:* Curriculum.
*Why founder:* the model choice fixes how every existing founder-ratified
number is read.

**FQ-P2 — The exact unit of active-new 1–4.** `BLOCKING FOR CONTRACT` —
**APPROVED 2026-07-29** (unit = new learner-facing active production
demands; operating rule: normal target 1–3, hard maximum 4 with a
cognitive-load rationale for a fourth; graduations count; integrations 0
with no in-lesson promotion).
*Conflict:* Q4c ratified the number but left the unit open; specs count
meta `phen:` entries and `sent:` anchors as "active"; L17 turns on this.
*Worked example:* L17's 5 = 2 frozen chunks + 1 adjective + 2 meta — the
spec itself claims "≤2 new lexical items". *Recommended:* 1–4 counts
**learner-facing NEW active production targets**: producible units
(chunks, words, frames as one linked concept with their parent chunk —
see FQ-P3) newly required for production this lesson; **`phen:`/meta
entries and `sent:` model-answer anchors never count**; graduations count
(they add new production demand) unless the founder prefers
novelty-only; integrations remain 0 (meta labeling stays legal but
uncounted). Also settle the residual **3 vs 4** (PAYLOAD 1–3 vs ratified
1–4; recorded confidence Low). *Alternative:* every listed ID counts —
then L12/L14/L15/L17 payloads must be reduced or relabeled.
*Consequence:* L17 reconciles at 2–3 without edits (or must be cut);
future specs get a checkable rule. *Owner:* Content (invariant) +
Curriculum (rule). *Why founder:* it interprets a founder-ratified
invariant.

**FQ-P3 — Frames and fillers.** `BLOCKING FOR CONTRACT` — **APPROVED
2026-07-29** (linked concept counts once; extensions count only as
genuinely new productive operations; fillers count only via their own
acquisition role).
*Conflict:* G4's founding question; today a concept ships as chunk +
frame + phen (3 ids, "linked, never merged") and specs count 2–3 of them
separately (L11: `chunk:je-peux` + 3 frames all active-new).
*Worked example:* `je voudrais` = chunk + `frame:je-voudrais-plus-noun` +
`frame:…-plus-infinitive` + `phen:polite-request` — 1 concept, 4 ids;
fillers (`un café`, `une baguette`) are separately countable nouns.
*Recommended:* identity ledger keeps all granularities as separate linked
IDs (settled design); the **acquisition ledger counts a linked
concept-cluster once** toward 1–4 when it first becomes actively
productive, with a later frame-extension of an owned chunk counting as a
new demand only if it opens a genuinely new production pattern; **fillers
never count as part of the frame** — a new filler word is (only) its own
lexical introduction. *Alternative:* frame and chunk always count
separately (arithmetic simplicity, pedagogic double-count).
*Consequence:* resolves most L1–L11 over-counts without touching specs.
*Owner:* Curriculum + Content. *Why founder:* it is the G4 question the
Bible explicitly reserved for ratification.

**FQ-P4 — Chunks, packages, formulas, and the shipped splits.**
`BLOCKING FOR CONTRACT` — **APPROVED 2026-07-29 WITH REVISED WORDING**:
the founder did **not** adopt "one surface → one id"; the approved policy
is *"each separately owned pedagogical unit or sense has one primary
acquisition identity; additional representation or analysis granularities
may exist as linked sub-identities"* — one visible surface may still
represent different identities when meaning, function, or sense genuinely
differs. YASA-2-frozen ids: no rename, no delete, no historical merge;
primary/link relationships are a separate future Engineering task.
*Conflict:* noun packages are the canonical learner unit, but bare-noun +
package ids coexist (`noun-cafe`/`chunk-un-cafe`), split mastery, and are
YASA-2-frozen; survival formulas/protected chunks are sentence-shaped yet
countable. *Worked example:* "un café" — three ids across two styles,
counted as active-new only in L5 as a re-packaging. *Recommended:*
**going forward one surface → one id** (package id primary; bare noun a
linked sub-identity created only when independently needed); shipped
splits healed by **designating a primary id + linking**, never rename;
protected chunks and survival formulas count as single chunks.
*Alternative:* keep dual ids and count both (permanently double-counts
and splits evidence). *Consequence:* counting and mastery converge on one
surface-one-primary-id; Engineering later implements the link (separate
task). *Owner:* Curriculum + Content (policy), Engineering
(representation), Mastery consequences routed. *Why founder:* it sets the
identity policy every ledger depends on.

**FQ-P5 — Sense, inflection, and gender.** `REQUIRED FOR CONTRACT
COMPLETENESS (may trail P1–P4)` — **APPROVED 2026-07-29** (inflections and
gender variants never auto-create identities; `content/contente` one item;
senses split when intentionally separately owned; faire/aller/pouvoir
future sense separation; lesson scoping carries the debt meanwhile;
Mastery & Evidence remains the authority for evidence consequences).
*Conflict:* sense-suffixing exists only where spelling collides
(`ou/la/y`); split-sense doorways (faire, aller, pouvoir — Canonical
curriculum policy) share one identity, so narrow-sense mastery will merge
with future broad-sense mastery; convention §11 "leans" toward
one-ID+metadata, contradicting its own practice. *Worked example:*
`faire` small-action (L9) vs future broad faire — one `word:faire`-class
identity today. *Recommended:* inflections and gendered variants **never**
create identities (locked ontology; `content/contente` = one item, fixed
pair); senses get distinct identities **when pedagogically split-owned**,
applied at the future registry migration — until then lesson-scoping
suffices and the contract records the debt. *Alternative:* one ID + sense
metadata everywhere (convention §11's lean) — simpler ids, weaker mastery
separation. *Consequence:* stable answer to "does `suis` count?" (no) and
"does broad-faire later re-count?" (yes, as its own sense). *Owner:*
Curriculum + Content; Mastery consequences routed. *Why founder:*
share-vs-split of learner evidence across senses is a product-level call.

**FQ-P6 — Fate of the historical numbers.** `REQUIRED CORRECTION
(documentation follow-through)` — **APPROVED 2026-07-29 WITH REVISED
WORDING**: 8–15 `SUPERSEDED`, never a binding authoring rule (banners =
future follow-through, sources not edited now); **30–45 = historical
non-binding heuristic, NOT carried into the Contract as a target**,
reconsidered only after a useful presentation/load unit is defined and
evidenced; **breadth trajectory retired pending redefinition** (may not be
cited until denominator and unit are explicit); registry numbers
52/54/56/59 may not be compared or added without naming registry and
snapshot; integration `0 active-new` binding, meta entries never labeled
active-new to preserve historical totals.
*Conflict:* 8–15 is superseded by the Bible yet `[CANONICAL]` in the
vault rule and live in the template; 30–45's floor is unreachable early;
the breadth trajectory has no denominator; the phantom 56 survives in
ADR-0012's text; archetype #10's "~0–4" contradicts "Integration 0".
*Recommended:* upon contract ratification — mark 8–15 superseded at
source (banner pass, Sync-Queue-able, same class as Charter-N1); keep
30–45 only as the presentation/exposure ledger's planning target,
re-based on defined units; define the breadth-trajectory denominator or
retire the metric; correct ADR-0012's 54-vs-56 line as a stale-artifact
note; align archetype #10 with "Integration 0 (meta labeling uncounted)".
*Alternative:* leave sources as-is and rely on routing (drift risk F4
persists). *Consequence:* removes the last live sources of the mixed
count. *Owner:* Curriculum (numbers) + Operations (banner pass).
*Why founder:* two of the affected figures carry founder-adjacent lock
markers.

---

## 19. Recommended contract shape

The eventual Item-Counting Contract (NOT drafted here) should be small:

1. **Identity rules** (~1 page): one id space (target: the colon
   convention), linked granularities, one-surface-one-primary-id, sense
   policy, the YASA-2-compatible healing mechanism — representation
   delegated to Engineering.
2. **Acquisition rules** (~1 page): the ratified unit of 1–4; what
   counts (per FQ-P2/P3/P4), what never counts (meta, anchors, fillers,
   ghost); graduation accounting; production-targets as its own row;
   supported/recognition introduction counts.
3. **Presentation pointers** (~½ page): name the existing beats/screens/
   exposure family as the presentation ledger; add no new numbers.
4. **Cross-ledger rules** (~½ page): no cross-ledger comparison without a
   stated mapping; every published number names its ledger; validator
   precision claims allowed only per-ledger after ratification.
5. **Explicit deferrals**: lexical-destination ledger; registry
   unification; `status_by_lesson` runtime; passage identity.

---

## 20. Smallest next action

*(Updated 2026-07-29.)* All six cards are answered, so **lean Contract
drafting is authorized and done**:
[`PRJ_015_ITEM_COUNTING_CONTRACT_v0.1.md`](PRJ_015_ITEM_COUNTING_CONTRACT_v0.1.md)
— `Draft — awaiting founder sign-off`. The next action is an independent
sign-off review of that draft, then (and only then) founder promotion may
be considered. **PRJ-015 remains `OPEN` throughout draft and review.**
No validator, no registry or spec edit, no migration, and no PRJ-015
status change in the meantime. L17 stays gated exactly as the Charter
states until the Contract is Canonical.

---

## 21. Appendix: edge-case calculations

Units produced per candidate model. **A** = one universal count (registry
identities touched); **B/C-acq** = acquisition-ledger count toward
learner-facing active-new under the FQ-P2/P3 recommended rules (linked
concept once; meta/anchors/fillers excluded; graduation counts);
**C-id** = identity-ledger ids involved (linked, never merged). Sourced
statuses in parentheses.

| Edge case | A | C-id | B/C-acq (at its introduction lesson) | Why |
|---|---|---|---|---|
| `je voudrais` | 1 | ≥3 (`chunk` + frames + `phen:polite-request`) | 0 at L1 (recycled-active from L0) | active-recycled row, not new |
| `je voudrais + infinitive` | 1 | 1 frame (linked to chunk) | 0 at L6 (introduced **supported**); later active carry-in — never active-new after L1 | supported intro; frame linked to owned chunk |
| `un café` | 2 today (split ids) | should be 1 primary + 1 linked sub-identity (FQ-P4) | 0 (L1 recycled; L5 re-packaging = graduation-of-form, ≤1 if counted as new package demand) | the shipped split; L5 counted it as new |
| noun `café` | 1 (`noun-cafe`) | linked sub-identity | 0 alone | filler/lexical sub-unit |
| `où` | 1 (`adverb-ou-where`) | `word:ou-where` (sense-suffixed) + frames + `phen:where-question` | 1 at L8 (one question-word concept-cluster) | frames linked; phen uncounted |
| `où est ___ ?` | 1 | 1 frame linked to `ou-where` + `être` | inside the L8 cluster (0 extra) | "où est not blindly chip-ified" (locked) |
| `je suis` | 1 | chunk + `frame:je-suis-plus-state` linked; surfaces not ids | 1 at L2 (être-identity cluster: only `je suis` unscaffolded active) | one dominant active core rule |
| `il est` / `vous êtes` | 1 each today (chunks exist) | linked person-form chunks | 0 (supported at L2) | supported intro |
| `je ne suis pas` | 1 | chunk linked to `frame:ne-pas`/`phen:negation` | 1 at L3 (negation transform demand); 0 at L6 (recombination of owned) | L3 new production pattern; L6 recombination |
| `ce n'est pas` | 1 | chunk (protected) linked to negation | 1 at L3 | new transform demand |
| `ne…pas` | 1 (`grammar-ne-pas-sandwich`) | frame/phen linked pair | counted once inside L3's negation cluster | L1 recognition intro = 0 |
| `j'ai faim` / `faim` | 2 today (`chunk-j-ai-faim` + `noun-faim`) | 1 primary chunk + linked noun | 1 at L4 (state-expression demand; `faim` filler uncounted alone) | package/filler rule |
| `ici` | 1 (`word-ici`) | word, formerly inside `chunk-je-suis-ici` | 1 at L8 **if graduation counts** (chunk→word promotion), else 0 | FQ-P2 graduation clause |
| `je vais` | 1 (`chunk-je-vais`) | chunk linked to `word:aller`(unsuffixed sense debt, FQ-P5) | 1 at L7-compact (the doorway) | exactly the "one or two new active items" guardrail |
| `je vais à la maison` | 0 (sentence — never a chip) | `sent:` non-identity / model answer | 0 | ADR-0004 |
| `à la maison` | 1 (`chunk-a-la-maison`) | frozen chunk (compact theory) vs decomposed preps (full-spec theory) — competing, compact shipped | 0 (supported at L7) | supported intro |
| `faire une pause` | 1 | chunk + `word:faire`/`word:pause` linked | 1 at L9 (small-action cluster) | one split-sense doorway |
| `je peux` | 1 | chunk + 3 frames + phen linked | 1 at L11 (pouvoir-help cluster; `je ne peux pas` transform arguably +1 → 2) | cluster-once rule; transform judgment recorded |
| `est-ce que` | 1 | chunk + `frame:est-ce-que-plus-clause` linked | 1 at L12 ("the only genuinely new lexis" + wrapper pattern) | anchors/meta uncounted; graduated L11 frame counts as graduation (+1 if graduations count) |
| `est-ce que je peux` | 1 | graduated frame (same ID L11→L12) | graduation: +1 under the recommended rule | "reuse ID, no fork" |
| `j'y vais` | 1 | chunk, graduated L13→L14 | graduation: +1 at L14 | recognition intro at L13 = 0 |
| place-`y` | 1 (`word-y-place`) | sense-suffixed word + `phen:` linked | 1 at L14 (with the chunk pair: cluster 2 total incl. graduation) | sense-suffix precedent |
| `il faut` | 1 (`chunk-il-faut`) | chunk = surface of lexeme `word:falloir` (recognition) | 1 at L15 | lemma stays recognition |
| `je dois` | 1 (`chunk-je-dois`) | chunk + frame linked | 0 at L15 (supported per spec; the gate review's "active" superseded) | membership drift resolved to spec |
| `je ne comprends pas` | 1 | survival formula (whole) | 1 at L1 (whole-chunk demand); its `ne…pas` content = recognition only | formula counts as one |
| `vous pouvez répéter ?` | 2 today (inverted + non-inverted ids) | 1 function, 2 word-order variants — linking decision (FQ-P4/P5 edge) | 0 (supported at L1/L11) | L17's merged attribution flagged |
| article+noun packages (general) | varies | package primary + linked noun | package counts once when newly productive | FQ-P4 |
| `content` / `contente` | 1 + supported variant | **one** item, fixed gendered pair (no agreement rule) | 1 at L17 | locked ontology: variants aren't identities |
| inflected forms (`suis/est/êtes`) | 0 new ids (by rule) | surfaces of `verb-etre` | 0 | locked ontology |
| homographs (`ou/la/y`) | distinct sense-suffixed ids | distinct by rule | each sense counts on its own introduction | existing practice |
| reading passage (L16) | 0 (no identity) | 3 `sent:` + 1 `phen:` composition | 0 active (all meta/supported-composed) | passage identity deferred |
| pronunciation phenomena | 1 each (`sound-*`) | `sound:` ids | 0 toward 1–4 (never production targets) | exposure family |

*(Under "every listed ID counts" — the FQ-P2 alternative — the L12/L14/
L15/L17 rows exceed or touch the ceiling and would force payload edits;
under the recommended rules, every audited lesson's learner-facing count
lands ≤4. This is reported as arithmetic, not as a compliance ruling.)*

---

## 22. Appendix: source map

**Canonical:** Curriculum Charter v1.0 (§2, §5 incl. L17 payload note,
§9 CC-008, §13, §14, §16); Content Bible v1.0 (§1.3, §5.2, §6.4–6.8,
§7.4, §10.2, Ch. 19, §20) + Decision Matrix (CB-13/14/15/18/22) +
Ratification Pack (Q4/Q5, parameter register, open tensions) +
Founder Read-Through (Cards 3, attention points) + Sign-Off Review (P1,
readiness Q2) + Source Gaps (G4); Mastery & Evidence Bible v1.0 (§4, §7,
§13, §14, §17–§20, §23, §25–§26, §28, FQ-2/4/5/6/8); Canon Map; Project
Register (PRJ-001/012/015/029); Coverage & Gaps; ADR-0004, -0011, -0012,
-0013, -0018, -0022; Lesson Flow Canon §1, §5.5; Source of Truth Map;
docs/README.

**Fragments:** `docs/syllabus/` — all L01–L17 specs + gate reviews,
template v1.1 (§6, §7, §17), archetypes v1 (budgets, 70/20/10, #10/#11),
chip taxonomy v0.3 (§2, §4, §5, §8, §10–§12), ID convention v0.1
(§2–§6, §8, §10–§11), band map v0, retrospective (§4–§6);
`PAYLOAD_ECONOMY_v0.md` (§3, §4.1, §4.3, §9-superseded);
`EXERCISE_CANON_v0.4.md`; vault `04_SYLLABUS` (Design Rules r3/r9,
Vocabulary/Grammar Progression, L1 note locked ontology, Lesson Status
Matrix), `02_LEARNING_SYSTEM` (Difficulty & Cognitive Load 2026-07-18
block, Chip Lifecycle, Mon Lexique, Mastery Model), `05_MATRICES`,
Syllabus_Delta_Log; `docs/audits/L1_L15_CHIP_INVENTORY_AUDIT_2026_07.md`
+ CSVs; Build Spec §39; Product Brain §5 + Decision Register (PB-010/
011/012).

**Runtime (Axis B):** `lemot-app/content/itemRegistry.ts` (54),
`lessonTypes.ts` (LearningItem/Status/Type), `content/lessons/v1/*`
(learningItems / targetItemIds / piecesUsed / highlights),
`scripts/shipped-item-ids.json` + git history (`fd3d29b`, `4b45c86`;
registry history `5f967ec`→`9c799d9`), `shipped-error-tags.json`,
`scripts/tests/` (shippedItemIds, shippedErrorTags, v1LessonStructure
incl. PROTECTED_CHUNKS), `content/learning-engine/` (types.ts ItemId/
LessonContract, events.ts LearningEvent/ERROR_TAG_CODES, mastery.ts
MasterySnapshot/monLexiqueStatus, mon-lexique.ts, lexique-memory.ts,
items.ts (59), lessons/*.contract.ts ×8), legacy `data/lessons/*`
(string-only identity, quarantined).

---

## Inventory

| ID | Counted unit or claim | Definition | Context | Source | Authority | Owner | Current status | Notes |
|---|---|---|---|---|---|---|---|---|
| CNT-001 | Accounting chip / registry itemId | the identity-bearing unit; "may never be shown" | identity | chip taxonomy §4; itemRegistry.ts | doc canon + Axis-B | Content/Engineering | current — **two disjoint id spaces (54 / 59)** | the primary count; YASA-2-frozen |
| CNT-002 | Role statuses (active/supported/recognition/recycled) | per-item pedagogical role | acquisition | taxonomy; lessonTypes | doc + RT (scalar) | Content | current | runtime lacks per-lesson status |
| CNT-003 | `status_by_lesson` (item × lesson status) | per-lesson role incl. graduation | acquisition | ID convention §5–6 | doc convention | Curriculum | DOC only | the acquisition ledger's natural key |
| CNT-004 | Ghost/exposure chip | seen, not owned, never required | exposure | taxonomy §4; Mastery §7 | doc + Mastery invariant | Content/Mastery | DOC only — no runtime field | can never create weakness |
| CNT-005 | Frame | slot structure | identity | ID convention §3 | doc | Content | partial RT (as `grammar-*`) | linked to chunk, never merged |
| CNT-006 | Frame filler | slot content | acquisition question | G4; template §17 | open | Curriculum | **OPEN — the G4 question** | FQ-P3 |
| CNT-007 | Chunk / multiword unit | fixed/semi-fixed produced-as-one | identity | taxonomy; ADR-0004 | doc + RT | Content | current (34 of 54) | |
| CNT-008 | Noun/article package | article+noun as one learner unit; gender-as-package | identity | ADR-0004; locked ontology | founder-locked principle | Content | current — **split-identity defect shipped** | FQ-P4 |
| CNT-009 | Protected chunk (2) / survival formula (2) | frozen sentence-shaped exceptions | identity | PAYLOAD §4.1; CB-06; test code | founder-gated closed sets | Content | current; survival validator set unbuilt | |
| CNT-010 | Split-sense doorway | one narrow sense owned | identity/acquisition | Design Rules r5 | CANONICAL fragment | Curriculum | current — **no identity for non-orthographic senses** | FQ-P5 |
| CNT-011 | Sense-suffixed homograph | distinct id on spelling collision | identity | ID convention §2 | doc + RT (`word-y-place`, `adverb-ou-where`) | Content | current | contradicts §11's "lean" |
| CNT-012 | Surface form / inflection | realization of a lemma; **not** an id | identity (negative rule) | L1 locked ontology | locked principle | Content | current | legacy weakness store violates it (frozen) |
| CNT-013 | Lexical lemma / sense | dictionary-like meaning | lexical destination | locked ontology; PB-012 | principle only | Content/Product | no runtime field | 4th-ledger material, deferred |
| CNT-014 | Morphosyntactic phenomenon (`phen:`) | named pattern/contrast | identity | ID convention | doc | Content | partial RT | counted as "active (meta)" in 7 specs — the L17 crux |
| CNT-015 | `sent:` anchor / model answer | full example sentence; never a chip | presentation | ID convention; ADR-0004 | doc + ADR | Content | DOC only | counted as active-new in L12/L15 (drift) |
| CNT-016 | Reading passage | 2–3-line composed read | identity (deferred) | L16 spec; convention §11 | doc, prefix withheld | Content | open | no passage id |
| CNT-017 | Pronunciation/orthography fact (`sound:`) | phenomenon | exposure | convention | doc + RT (2) | Content | current | never a production target |
| CNT-018 | Presentation occurrence (UI chip / highlight / model answer / screen) | visible surface, no identity of its own | presentation | taxonomy §4/§8/§11 | doc + RT | Content | current — `piecesUsed` = raw strings | F3 |
| CNT-019 | Beat / rendered screen / section | pedagogical step vs display state vs authored section | presentation | Content Bible §6.4; CC-008 | Canonical | Content | current; mapping open | never conflated here |
| CNT-020 | Pedagogical introduction / promotion event | first exposure per role; recognition→active graduation | acquisition | convention §5–6; specs | doc practice | Curriculum | current practice | same-ID, no fork |
| CNT-021 | Recycle appearance / carryover | query-time role | acquisition/exposure | taxonomy §10; Mastery §26 | doc | Curriculum/Mastery | selector unbuilt | cadence ≠ reach preserved |
| CNT-022 | Mastery evidence target / event | itemIds[] per event; chain de-dup | mastery | events.ts; Mastery §20 | Canonical + RT | Mastery | current | occurrences ≠ credits precedent |
| CNT-023 | Weakness record (item-keyed) + legacy string-keyed weak spot | difficulty claim | mastery | Mastery §14 | Canonical + frozen legacy | Mastery | current — **two keys live** | second identity axis |
| CNT-024 | Mon Lexique entry | N:1 collapse of linked ids | presentation/projection | convention §8; mon-lexique.ts | doc + RT (gated) | Product/Mastery | current | never validates a registry count |
| CNT-025 | Planning item (the 8–15/30–45 unit) | list-length of mixed-granularity "Active — new" rows | planning | specs practice; Design Rules r3 | superseded-for-active yet `[CANONICAL]` at source | Curriculum | **CONFLICT — no stable interpretation** | FQ-P6 |
| CNT-026 | Production target | sentences to produce (4–8/lesson) | acquisition | template §6; all specs | planning target | Content/Curriculum | current, consistent | its own ledger row |
| CNT-027 | Total exposure estimate (30–45) | all-tier exposure | exposure | template §6 | planning target; floor unreachable early | Curriculum | current | re-base under contract |
| CNT-028 | `LessonEvidenceProfile` | {listening, production, recognition} multiplier | evidence distribution | LFC §5.5; Mastery §13 | design canon, numbers unratified | Curriculum (distribution) | DOC only | "a multiplier, not an exercise count" |
| CNT-029 | Registry counts 52/54/56/59 | snapshots & artifacts of two registries | identity | git history; audit; manifests | Axis-B established | Engineering | **explained** (§8) | 56 phantom; 59 the real second number |
| CNT-030 | ~3,000 words | lexical planning band | destination | PB-012 | Canonical planning band | Product | current | never a counter; unit undefined |
| CNT-031 | Build-Spec per-band budgets | "cognitive load, not visible chip count" | historical planning | Build Spec §39.2 | historical/reference (FQ-C2) | — | demoted | never cite as budget |
| CNT-032 | Breadth trajectory (L5/L15 pairs) | undefined-denominator audit metric | planning | Ch. 19; PAYLOAD §9 | planning target | Curriculum | **no denominator stated** | define or retire (FQ-P6) |

*(32 rows; discovery IDs only — no Canonical namespace allocated. No
cosmetic rows.)*

---

*End of PRJ-015 Item-Counting Discovery v0.1. PRJ-015 remains OPEN; the
1–4 invariant is untouched; L17 remains gated; nothing here authorizes a
validator, migration, spec edit, or implementation.*
