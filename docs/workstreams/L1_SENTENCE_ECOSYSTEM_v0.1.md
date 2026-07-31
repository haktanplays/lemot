---
title: Cairn L1 Sentence Ecosystem
version: 0.1
status: Draft — authored vertical-slice content artifact
canon_status: non-canonical
implementation_status: not-started
owner: founder + human French QA review
created: 2026-07-31
scope: authored L1 sentence/utterance seed pool for the real-deal vertical slice
contract: docs/workstreams/L1_AUTHORING_CONTRACT_v0.1.md
parent_map: docs/workstreams/L1_L10_CONTENT_AND_ACQUISITION_MAP_v0.1.md
related:
  - docs/workstreams/EXERCISE_VARIATION_INVENTORY_v0.1.md
  - docs/workstreams/L1_L10_VERTICAL_SLICE_CHARTER_v0.1.md
---

# Cairn L1 Sentence Ecosystem v0.1

## 1. Status and authority boundary

This is the **authored L1 sentence-ecosystem candidate pool**, written against the frozen
`L1_AUTHORING_CONTRACT_v0.1.md`. It:

- is **non-Canonical** and overrides no governing document;
- **registers nothing** — no runtime identities, no sentence IDs, no audio IDs;
- **authorizes no implementation**;
- contains **authored French candidates for founder review and human French QA** — no sentence
  here is learner-ready merely because it appears here, and **every** surface (including
  directly sourced ones) remains pending human French sign-off before Stage-C exposure;
- uses **draft-local IDs only** (`L1-SE-###`, `L1-SC-#`): document-local handles, never
  canonical/runtime/registry/event/final sentence IDs;
- must not be exposed to learners until human French QA and the later implementation gates
  pass.

Labels: **[SOURCE]** cited fact · **[CURRENT REALITY]** implementation fact · **[REC]**
recommendation. All newly authored French below is *Illustrative — human French QA required*.

---

## 2. Executive summary

- **Source candidates reviewed:** 42 (shipped L0/L1 payloads, L01 spec §4 family + item
  tables, Payload Economy §4/§6, registry examples, legacy `lesson1.ts`, legacy expressions).
- **Pool:** **33 core seeds** (L1-SE-001…033) · **4 reserve** · **12 rejected** · 3 merged as
  accepted alternatives. 15 kept/adapted direct sourced surfaces, 5 source-preserving
  adaptations (incl. every inverted `Pouvez-vous répéter ?` occurrence converted to the
  locked `Vous pouvez répéter ?`), 13 newly authored inside the frozen contract.
- **Family distribution** (assignments 46 over 33 unique seeds): request-arc 7 · opening/
  closing 4 · rescue 4 (+opener) · register contrast 3 · recognition/ghost scene color 5 core
  (+3 reveal kin) · PH reuse 10 relations · reveal models 2 (+2 enrichment) · Dictée/audio 1
  seed + 4 spans · flashcards 0 new (pure reuse) · carryover 2.
- **Production-contract distribution:** unscaffolded-eligible **9** (all-Active) · supported-
  only **7** · recognition-contrast **1** (`je veux`) · ghost-bearing input/reveal **11** ·
  model-answer-only **4** · audio/Dictée-span **1**.
- **Audio priority:** 10 item clips + ~14 high/medium sentence clips (the 022/023 contour
  pair must be recorded together); **Dictée:** 1 Micro seed + 2 Micro spans + 2 Guided cloze
  patterns; no Sentence/Context Dictée at L1.
- **Seeds with >1 product projection:** 31 of 33 (≈3.1 average projections/seed; the two
  single-role seeds are deliberate reveal enrichment).
- **Major authoring risks:** the text-identical offer/confirmation contour pair (022/023)
  works only with recorded audio (High-risk QA item); the exit line `Merci, au revoir.` and
  the newly authored server offers need native confirmation; 031's source punctuation
  inconsistency needs a QA verdict; address-form reveal frequency needs register calibration.
- **Provisional readiness:** READY for founder review and human French QA · READY WITH
  BOUNDED GAPS for the pilot matrix · NOT READY for runtime registration, Content Factory
  implementation, or final audio recording (§22).

---

## 3. Source-harvest ledger

Sources inspected: shipped `lesson-000.ts` / `lesson-001.ts` (v1 payloads), `itemRegistry.ts`
example fields, `docs/syllabus/L01-survival-kit.lesson-spec.md` (§4 sentence family + item
tables), `docs/PAYLOAD_ECONOMY_v0.md` §4/§6, legacy `data/lessons/lesson1.ts` (examples,
fills, builds, combine, weave, sayIt, expressions), legacy pool material. Legacy is a
sentence mine, not authority. Decisions: **Keep** (unchanged) · **Adapt** (source-preserving
change) · **Merge** (accepted alternative of another seed) · **Reserve** · **Reject**.

| Candidate surface | Source | Source class | Decision | Destination/core ID | Reason |
|---|---|---|---|---|---|
| `Bonjour.` | L0/L1 shipped meet | shipped v1 | Keep | L1-SE-001 | opener; direct |
| `Je voudrais un café.` | L0/L1 shipped meet | shipped v1 | Keep | L1-SE-002 | request base |
| `Bonjour, je voudrais un café.` | L1 shipped fill reveal | shipped v1 | Keep | L1-SE-003 | opener+request |
| `Bonjour, je voudrais un café, s'il vous plaît.` | L0/L1 shipped weave; spec §4 | shipped v1 + spec | Keep | L1-SE-004 | full arc anchor |
| `Bonjour, un café s'il vous plaît.` | L0 sayIt naturalAlternatives | shipped v1 | Adapt (extend with Merci !) + Keep casual form | L1-SE-031 / feeds L1-SE-006 | casual natural register |
| `Bonjour, je voudrais un café, s'il vous plaît. Merci !` | L1 shipped sayIt model | shipped v1 | Keep | L1-SE-030 | open-production model |
| `S'il vous plaît.` | L0/L1 shipped meet | shipped v1 | Keep | L1-SE-012 | formula display/audio span |
| `Merci.` | L1 shipped meet | shipped v1 | Keep | L1-SE-009 | A-new demand surface |
| `Je ne comprends pas.` | spec §4; PE §4.1 | spec + PE locked | Keep | L1-SE-013 | survival formula (locked) |
| `Pouvez-vous répéter ?` | spec §4; legacy | spec (superseded surface) | **Adapt → locked surface** | L1-SE-014 (`Vous pouvez répéter ?`) | CB §15.3 locks the non-inverted form; inverted form never appears as learner material |
| `Je ne comprends pas. Pouvez-vous répéter ?` | legacy combine; spec | legacy + spec | Adapt (locked surface) | L1-SE-015 | combined rescue move |
| `Merci beaucoup, au revoir !` | legacy examples; spec §4 | legacy + spec supported | Keep (reveal enrichment only) | L1-SE-033 | warm close; `beaucoup` sourced but not an L1 identity → never required |
| `Merci beaucoup` | legacy; spec supported list | legacy + spec | Keep (reveal enrichment only) | L1-SE-032 | same boundary |
| `Au revoir` | legacy vocab; spec active list | legacy + spec | Keep | L1-SE-010 | A-new demand surface |
| `Excusez-moi` (attention opener) | spec item table; PE §6 | spec + PE | Keep | L1-SE-017 | Supported-new opener |
| `Voilà` (service handover) | spec recognition list; legacy expression | spec recognition | Keep (input-only) | L1-SE-025 / L1-SE-026 | ghost/recognition scene color |
| `Bonjour, je voudrais une baguette, s'il vous plaît.` | spec §4; legacy | spec | **Reject** | — | `baguette` deferred by FP-1 |
| `Excusez-moi, où est la gare ?` | spec §4; legacy | spec | **Reject** | — | `où est` + `la gare` deferred breadth |
| `Je voudrais réserver une table.` | spec §4; legacy | spec | **Reject** | — | table-booking deferred |
| `Bonsoir.` / `Bonsoir ! Merci, au revoir.` | spec §4; legacy | spec | **Reject** | — | `bonsoir` deferred by FP-1 |
| `Salut` | legacy vocab | legacy | **Reject** | — | deferred; register trap territory post-slice |
| `Pardon !` / `Pardon ?` | legacy expression/review | legacy | **Reject** | — | `pardon` deferred by FP-1 |
| `Comme ci, comme ça` | legacy expression | legacy | **Reject** | — | already cut by spec; scope drift |
| `Je veux un café.` | spec §4 contrast; L0 insight example | spec + shipped insight | Keep (contrast-only) | L1-SE-018 | register trap; never expected answer |
| `Bonjour ! Bienvenue. Qu'est-ce que vous voulez ?` | legacy miniConv starter | legacy | **Reject** | — | future grammar (`qu'est-ce que`, vouloir present); AI-chat legacy |
| `Bonjour, je voudrais un croissant.` | legacy fill | legacy | **Reject** | — | ghost `croissant` as required production — prohibited |
| Legacy EN+FR weave samples (`Bonjour, je ne comprends pas. Où est the station?` etc.) | legacy weave | legacy | **Reject** | — | mixed-surface exercise artifacts, not seeds; contain deferred breadth |
| `Voilà, monsieur.` (usage line) | legacy expression usage | legacy | Adapt | L1-SE-026 | handover with address color |
| `un thé` service variation | PE §6 | PE locked | **Newly author** | L1-SE-007 / L1-SE-008 | supported slot variation |
| `madame` / `monsieur` address color | PE §6 ghost list | PE locked | **Newly author** (input/reveal only) | L1-SE-019/020/021/026/027/028/029 | ghost scene color |
| `un croissant` offer | PE §6 ghost list | PE locked | **Newly author** (input-only) | L1-SE-024 | ghost listening color |
| Rescue + opener combination | contract §7 family C | contract | **Newly author** | L1-SE-016 | useful excusez-moi combination |
| Offer/confirmation contour pair | S1 intonation pedagogy; EV-014 | canon direction | **Newly author** (input-only) | L1-SE-021/022/023 | question-vs-statement listening |
| Close pair `Merci, au revoir.` | adapted from legacy warm close | legacy-adapted | **Adapt** (de-enriched to frozen scope) | L1-SE-011 | A-only close inside frozen identities |
| `Excusez-moi, vous pouvez répéter ?` | contract family C option | contract | **Reserve** | reserve R-1 | valid; core keeps the je-ne-comprends-pas combination instead |
| `Bonjour, je voudrais un thé.` | slot variant | derivable | **Reserve** | reserve R-2 | derivation of SE-003/007; not a distinct authored need |
| `Un thé ?` (offer) | contour family | derivable | **Reserve** | reserve R-3 | derivable offer variant |
| `Merci, monsieur.` | address family | derivable | **Reserve** | reserve R-4 | SE-027 covers the function; addressee variant |
| `Bonjour !` | punctuation variant | shipped-adjacent | **Merge** | accepted alternative of L1-SE-001 | same surface, exclamative punctuation |
| `Bonjour, je voudrais un café` (no landing, no period variants) | fill scaffolds | shipped | **Merge** | accepted alternatives of SE-003/004 | punctuation-only variants |
| CaReFuL/pronunciation block sentences | legacy grammar section | legacy | **Reject** (as seeds) | → interstitial material only | exposition, not utterances |
| `Voilà, un café.` / `Et voilà…` | authored candidates | new | **Reject** | — | unsourced glue (`et`); SE-023+SE-025 cover the beat |
| `Je vous en prie.` (response to thanks) | authored candidate | new | **Reject** | — | unsourced vocabulary; post-slice politeness material |

**Ledger totals**: 42 candidates reviewed → **33 core seeds** (15 kept/adapted from direct
sources, 5 source-preserving adaptations, 13 newly authored within contract) · **4 reserve** ·
**12 rejected** · 3 merged as accepted alternatives. Legacy breadth (bonsoir/salut/pardon/
gare/baguette/booking) is uniformly rejected; the inverted repetition request is adapted to
the locked surface everywhere; recognition-only retentions are marked input-only.

---

## 4. Ecosystem authoring rules (operational restatement)

1. **Active vs Supported**: unscaffolded learner-required output may contain only the six
   Active surfaces (bonjour, je voudrais, un café, s'il vous plaît, merci, au revoir).
   Supported items (excusez-moi, both survival formulas, un thé) appear in required output
   only with explicit material support, and that support is named per seed (§8).
2. **Recognition and Ghost**: `je veux` = contrast/trap display only; ghost
   (croissant/madame/monsieur) and recognition color live in input, scene dialogue,
   listening, and reveals — never required output, never scored as missing.
3. **Whole-first formulas**: formulas and packages appear whole; no fragments; no anatomy in
   this pool (optional `je voudrais` anatomy is an interstitial, not a sentence).
4. **Seed ≠ exercise instance**: one seed = one stable French surface utterance (one
   speaker turn); exercises derive from seeds later. Mini-scenes link seed IDs; they are not
   seeds.
5. **One surface, one seed ID**: punctuation-only and accent-fallback variants are accepted
   alternatives of one seed, never new IDs.
6. **Natural Reveal may exceed required output** (e.g. `Merci beaucoup`, address forms) but
   stays inside L1 comprehensibility; a model sentence never becomes a chip.
7. **No automatic promotion**: nothing in this pool changes any item's treatment.
8. **No unsourced vocabulary becomes required**; the only French glue used anywhere is
   already inside sourced surfaces.
9. **French naturalness overrides quota** — the pool lands at 33 core seeds because that is
   what the frozen scope supports naturally, not because a number demanded it.

---

## 5. Core seed inventory

Treatment key: `[A-rec]` Active-recycled · `[A-new]` Active-new · `[S]` Supported-new ·
`[R-trap]` recognition/contrast · `[G]` ghost. Production contracts per the contract §5.
All French below: *pending human French QA* (including sourced surfaces — sign-off is per
this pool, not per origin).

### 5.A Request arc (acquisition)

| Seed ID | French surface | Learner-facing meaning / intent | Sentence family | Scene role | Identity/treatment composition | Learner production contract | Source status | Relationship group | French-QA notes |
|---|---|---|---|---|---|---|---|---|---|
| L1-SE-001 | Bonjour. | Hello — the polite door into any exchange | request-arc; opening | learner opener | bonjour [A-rec] | Unscaffolded production eligible | Direct sourced surface | opening; request-base | standalone with period; `Bonjour !` accepted alternative |
| L1-SE-002 | Je voudrais un café. | I'd like a coffee | request-arc | learner request | je-voudrais [A-rec] + un-cafe [A-rec] | Unscaffolded production eligible | Direct sourced surface | request-base | — |
| L1-SE-003 | Bonjour, je voudrais un café. | Hello, I'd like a coffee | request-arc | opener + request | bonjour [A-rec] + je-voudrais [A-rec] + un-cafe [A-rec] | Unscaffolded production eligible | Direct sourced surface | request-base | comma pause natural? (shipped copy says yes) |
| L1-SE-004 | Bonjour, je voudrais un café, s'il vous plaît. | Hello, I'd like a coffee, please | request-arc | **anchor** — full polite arc | bonjour [A-rec] + je-voudrais [A-rec] + un-cafe [A-rec] + sil-vous-plait [A-rec] | Unscaffolded production eligible | Direct sourced surface | request-base | double comma rhythm — confirm natural spoken feel |
| L1-SE-005 | Je voudrais un café, s'il vous plaît. | I'd like a coffee, please (opener already given) | request-arc; PH reuse | mid-exchange request | je-voudrais [A-rec] + un-cafe [A-rec] + sil-vous-plait [A-rec] | Unscaffolded production eligible | Source-preserving adaptation | request-base (opener-omission repair target) | — |
| L1-SE-006 | Un café, s'il vous plaît. | A coffee, please (casual/elliptical) | request-arc; register | casual counter order; response to offer | un-cafe [A-rec] + sil-vous-plait [A-rec] | Unscaffolded production eligible | Source-preserving adaptation (from shipped casual alternative) | request-slot-variant; register | elliptical order — natural at a counter? (believed yes) |
| L1-SE-007 | Je voudrais un thé, s'il vous plaît. | I'd like a tea, please | request-arc (supported variation) | tea slot variation | je-voudrais [A-rec] + **un-the [S]** + sil-vous-plait [A-rec] | **Supported production only** (un thé supplied as visible piece/word-bank entry) | Newly authored within frozen contract | request-slot-variant | support boundary must stay visible in every use |
| L1-SE-008 | Un thé, s'il vous plaît. | A tea, please (casual) | request-arc (supported variation) | casual tea order | **un-the [S]** + sil-vous-plait [A-rec] | **Supported production only** (package supplied) | Newly authored within frozen contract | request-slot-variant | — |

### 5.B Opening and closing

| Seed ID | French surface | Meaning / intent | Family | Scene role | Composition | Production contract | Source status | Group | QA notes |
|---|---|---|---|---|---|---|---|---|---|
| L1-SE-009 | Merci. | Thank you | closing; acquisition | learner thanks | **merci [A-new]** | Unscaffolded production eligible | Direct sourced surface | closing | `Merci !` accepted alternative |
| L1-SE-010 | Au revoir. | Goodbye | closing; acquisition | learner close | **au-revoir [A-new]** | Unscaffolded production eligible | Direct sourced surface | closing | — |
| L1-SE-011 | Merci, au revoir. | Thanks, goodbye (leaving) | closing | full polite exit | **merci [A-new]** + **au-revoir [A-new]** | Unscaffolded production eligible | Source-preserving adaptation (de-enriched from `Merci beaucoup, au revoir !`) | closing; carryover | natural as one exit line? (common in shops) |
| L1-SE-012 | S'il vous plaît. | Please (standalone formula) | audio/Dictée span; display | formula display + audio | sil-vous-plait [A-rec] | **Audio/Dictée span only** (standalone production of bare "please" is not a scene demand) | Direct sourced surface | opening/landing | elision + circumflex focus for writing work |

### 5.C Rescue pair (all Supported)

| Seed ID | French surface | Meaning / intent | Family | Scene role | Composition | Production contract | Source status | Group | QA notes |
|---|---|---|---|---|---|---|---|---|---|
| L1-SE-013 | Je ne comprends pas. | I don't understand | rescue | breakdown signal | **je-ne-comprends-pas [S — survival formula, whole]** | **Supported production only** (formula visible/prompted; whole-formula recall) | Direct sourced surface (locked) | rescue | exact locked surface; never split |
| L1-SE-014 | Vous pouvez répéter ? | Can you say that again? | rescue | repetition request | **vous-pouvez-repeter [S — survival formula, whole]** | **Supported production only** | Direct sourced surface (locked, non-inverted) | rescue | rising contour; space before `?` per house convention |
| L1-SE-015 | Je ne comprends pas. Vous pouvez répéter ? | I don't understand — can you say it again? | rescue | full recovery move (one turn) | both survival formulas [S], sequenced whole | **Supported production only** (both formulas available as material) | Source-preserving adaptation (legacy pair, inverted form replaced by locked surface) | rescue | one speaker turn, two sentences — confirm natural pacing |
| L1-SE-016 | Excusez-moi, je ne comprends pas. | Excuse me — I don't understand | rescue | polite interruption + breakdown | **excusez-moi [S]** + **je-ne-comprends-pas [S]** | **Supported production only** (both pieces supplied) | Newly authored within frozen contract | rescue | interjection + formula rhythm natural? |
| L1-SE-017 | Excusez-moi. | Excuse me (getting attention) | rescue; carryover | attention opener | **excusez-moi [S]** | **Supported production only** | Direct sourced surface (spec item) | rescue; carryover (→ L8 opener role) | standalone attention-getting use (not apology) — flag register |

### 5.D Register contrast

| Seed ID | French surface | Meaning / intent | Family | Scene role | Composition | Production contract | Source status | Group | QA notes |
|---|---|---|---|---|---|---|---|---|---|
| L1-SE-018 | Je veux un café. | I want a coffee (understandable, blunt with a stranger) | register-contrast | contrast/trap display vs L1-SE-002 | **je-veux [R-trap]** + un-cafe [A-rec] | **Recognition only** — never the expected answer; selection/production reads as a register signal inviting the smallest upgrade (→ je voudrais), never broad failure | Contrast/trap surface (spec + shipped insight example) | register-contrast | feedback copy must stay non-punitive ("works, but blunt here") |

### 5.E Recognition-rich and Ghost-bearing scene color (all input/reveal only)

| Seed ID | French surface | Meaning / intent | Family | Scene role | Composition | Production contract | Source status | Group | QA notes |
|---|---|---|---|---|---|---|---|---|---|
| L1-SE-019 | Bonjour, monsieur. | Hello, sir (server greets) | recognition-showcase | server greeting | bonjour [A-rec] + **monsieur [G]** | **Ghost-bearing input/reveal only** | Newly authored within frozen contract | recognition-showcase; address-color | service-register address natural |
| L1-SE-020 | Bonjour, madame. | Hello, ma'am (server greets) | recognition-showcase | server greeting | bonjour [A-rec] + **madame [G]** | Ghost-bearing input/reveal only | Newly authored within frozen contract | recognition-showcase; address-color | pairs with SE-019 for address listening |
| L1-SE-021 | Un café, madame ? | A coffee (for you), ma'am? (offer) | recognition-showcase | server offer | un-cafe [A-rec] + **madame [G]**; question contour | Ghost-bearing input/reveal only | Newly authored within frozen contract | recognition-showcase; offer-contour | elliptical offer natural in service context? |
| L1-SE-022 | Un café ? | A coffee? (bare offer — rising) | recognition-showcase | offer (contour pair) | un-cafe [A-rec]; question contour | Ghost-bearing input/reveal only *(recognition listening)* | Newly authored within frozen contract | offer-contour (pairs with SE-023) | works only with recorded rising contour |
| L1-SE-023 | Un café. | One coffee (confirming/handover — flat) | recognition-showcase | confirmation (contour pair) | un-cafe [A-rec]; statement contour | Ghost-bearing input/reveal only *(recognition listening)* | Newly authored within frozen contract | offer-contour | text-identical to SE-022 minus `?` — audio-dependent pair |
| L1-SE-024 | Un croissant ? | A croissant? (offer of the ghost item) | recognition-showcase | ghost offer | **un-croissant [G]**; question contour | Ghost-bearing input/reveal only | Newly authored within frozen contract | recognition-showcase | learner never produces croissant; response is merci / a coffee order |
| L1-SE-025 | Voilà. | There you go (handover) | recognition-showcase | service handover | **voilà [R ambient]** | Ghost-bearing input/reveal only | Direct sourced surface (spec recognition; legacy) | recognition-showcase | one-word service beat |
| L1-SE-026 | Voilà, monsieur. | There you go, sir | recognition-showcase | handover + address | **voilà [R ambient]** + **monsieur [G]** | Ghost-bearing input/reveal only | Source-preserving adaptation (legacy usage line) | recognition-showcase; address-color | justified pair with SE-025 (bare vs addressed) |
| L1-SE-027 | Merci, madame. | Thank you, ma'am (warmer thanks) | recognition-showcase; reveal | reveal enrichment of thanks | merci [A-new] + **madame [G]** | Ghost-bearing input/reveal only (the required core is merci alone) | Reveal-enrichment surface | address-color; reveal | shows native warmth without requiring address forms |
| L1-SE-028 | Au revoir, madame. | Goodbye, ma'am | recognition-showcase; reveal | server/learner-heard close | au-revoir [A-new] + **madame [G]** | Ghost-bearing input/reveal only | Reveal-enrichment surface | address-color; closing | — |
| L1-SE-029 | Excusez-moi, madame. | Excuse me, ma'am (polite attention) | recognition-showcase; reveal | enriched attention opener | **excusez-moi [S]** + **madame [G]** | Ghost-bearing input/reveal only | Reveal-enrichment surface | address-color; rescue | — |

### 5.F Open-production and Natural Reveal models

| Seed ID | French surface | Meaning / intent | Family | Scene role | Composition | Production contract | Source status | Group | QA notes |
|---|---|---|---|---|---|---|---|---|---|
| L1-SE-030 | Bonjour, je voudrais un café, s'il vous plaît. Merci ! | Full polite order + thanks (one turn) | reveal | say-it model answer | all six Active surfaces | **Model answer only** | Direct sourced surface (shipped s08 model) | reveal; request-base | one turn, two sentences; `Merci !` warmth appropriate |
| L1-SE-031 | Bonjour, un café s'il vous plaît. Merci ! | Casual full order + thanks | reveal; register | casual model alternative | bonjour + un-cafe + sil-vous-plait + merci [all A] | **Model answer only** | Direct sourced surface (shipped naturalAlternatives, extended per s08) | reveal; register | no comma before s'il vous plaît in source — confirm preferred typography |
| L1-SE-032 | Merci beaucoup. | Thank you very much | reveal | warmth enrichment | merci [A-new] + **beaucoup [reveal-only, sourced]** | **Model answer only** (beaucoup never required) | Direct sourced surface (spec supported list; legacy) | reveal; closing | reveal-only boundary must be explicit in copy |
| L1-SE-033 | Merci beaucoup, au revoir ! | Thanks so much — goodbye! | reveal | warm exit enrichment | merci + beaucoup [reveal-only] + au-revoir | **Model answer only** | Direct sourced surface (legacy examples; spec §4) | reveal; closing | exclamative warmth — calm tone check |

**Unique core seeds: 33.** Production-contract distribution: Unscaffolded 9 (001-006,
009-011) · Supported 7 (007, 008, 013-017) · Recognition-contrast 1 (018) · Ghost-bearing
input/reveal 11 (019-029) · Model-answer-only 4 (030-033) · Audio/Dictée-span 1 (012).

---

## 6. Sentence-family coverage

One seed may satisfy several families (overlap rule): **unique seeds = 33**, family
**assignments = 46**.

| Family | Target | Assigned seeds | Count | Coverage check |
|---|---|---|---|---|
| A. Request-arc acquisition | 6-8 | 001, 002, 003, **004 (anchor)**, 005, 006, 007 | 7 | polite opening ✔ · je voudrais ✔ · un café ✔ · s'il vous plaît ✔ · full arc ✔ (004) · supported `un thé` variation with visible support boundary ✔ (007) |
| B. Polite opening & closing | 3-4 | 001, 009, 010, 011 | 4 | meaningful production for bonjour/merci/au revoir ✔; no filler copies |
| C. Rescue pair | 3-4 | 013, 014, 015, 016 (+017 opener) | 4 (+1) | exact locked surfaces ✔ (013, 014); excusez-moi combination ✔ (016); all Supported ✔ |
| D. Register contrast | 2-3 | 018 + 002 (polite counterpart) + 031 (casual-register model) | 3 | veux/voudrais contrast ✔; `je veux` recognition/trap only ✔; feedback = "understandable but too direct here → smallest upgrade" ✔ |
| E. Cognate-rich recognition + Ghost scene color | 4-5 | 019-026 (core input set; 027-029 are reveal-enrichment kin) | 5 core functions (greet ×2, offer ×3-way contour set, ghost offer, handover ×2) | only approved Ghost/Recognition material ✔; nothing learner-required ✔ |
| F. Practice Hub reuse | 6-8 | 002, 003, 004, 005, 006, 009, 010, 011, 013, 014 (reuse relations, §14) | 10 relations | retrieval volume from existing seeds; no new curriculum ✔ |
| G. Open-production / Natural Reveal models | 2-3 | 030, 031 (+032/033 enrichment) | 2 (+2) | richer-than-required but L1-comprehensible ✔; ghost/recognition only as non-required richness ✔ |
| H. Dictée / audio spans | 1-2 + spans | 012 (distinct) + spans of 002/004/007/009 (§15) | 1 + 4 spans | Micro + Guided only ✔; no full Sentence Dictée ✔; A-material spans only ✔ |
| I. Flashcard contexts | reuse | projections of 004, 006, 009, 010, 011, 013, 014 + scenes (§13) | 0 new seeds | no card-only sentences ✔ |
| J. Carryover | 1-2 | 011 (close → L6/L7 recycling), 017 (attention opener → L8 opener role) | 2 | natural, source-compatible; **no invented French for future grammar** — `je voudrais + infinitive` carryover is deliberately left to L2+ scene continuity rather than an L1 seed, per the family-J fallback rule |

## 7. Mini-scene map

Bounded, reusable mini-scenes (not chatbot conversations). Seeds in brackets are input-only
server lines; learner-required production is named per scene.

| Scene ID | Scene purpose | Ordered seed IDs | Learner role | Required production | Supported material | Input-only material | Product destinations |
|---|---|---|---|---|---|---|---|
| L1-SC-1 | Entering & ordering | [019] → 004 → [025] → 009 | customer | 004, 009 (unscaffolded) | — | 019, 025 | lesson path (meet→weave arc); PH; scenario flashcards |
| L1-SC-2 | Offer → response | [021] → 006 → [023] → 009 | customer responding to offer | 006, 009 | — | 021, 023 | listening + response; PH; audio recognition |
| L1-SC-3 | Not understanding → repair | [fast line: 021 replayed at pace] → 015 (or 013 → 014) → [021 slower] → 009 | stuck customer recovering | 013/014/015 **with formula support visible** | 013, 014, 015 | 021 | rescue beat; EV-063; scenario flashcards |
| L1-SC-4 | Supported tea variation | [020] → 007 → [026] → 011 | customer ordering the variation | 007 **(un thé supplied)**, 011 | 007 | 020, 026 | supported-production showcase; Guided Dictée context |
| L1-SC-5 | Direct vs polite contrast | display 018 vs 002 → learner chooses/upgrades → reveal | observer → reviser | choice only (EV-013); optional revision to 002 | — | 018 | register insight; EV-062 nudge |
| L1-SC-6 | Ghost offer (recognition) | [024] → learner signals meaning (choice) → 006 or 009 | listener | 006 or 009 | — | 024 | audio recognition; ghost-boundary demo |
| L1-SC-7 | Closing the exchange | [026] → 011 → [028] | leaving customer | 011 | — | 026, 028 | closing move; carryover to L6/L7 closes |
| L1-SC-8 | Open production + reveal | situation prompt (English) → free attempt → reveal 030/031 (+032/033 enrichment) | free producer | open attempt (ungraded, W1) | optional idea pieces | 030-033 as models | EV-041/042 + IS-16; the say-it beat |

## 8. Treatment-boundary audit

**Unscaffolded learner-required output** (every required element Active): 001, 002, 003, 004,
005, 006, 009, 010, 011 — nine seeds; verified compositions contain only the six Active
surfaces.

**Supported learner output** (exact scaffold named):

| Seed | Scaffold required |
|---|---|
| 007 | `un thé` supplied as a visible piece/word-bank entry (or cloze-given); rest of the frame recallable |
| 008 | `un thé` supplied; landing available in tray |
| 013 / 014 | formula visible or just-prompted (formula card, tray chip, or immediately-prior model); whole-formula recall, never assembly from words |
| 015 | both formulas available as whole chips/prompts |
| 016 | both supported pieces supplied (excusez-moi + formula) |
| 017 | excusez-moi available in tray or cloze-given |

**Recognition-only material**: 018 (register contrast display — teaches the veux/voudrais
boundary; appearing in EV-013 options with trapReason); `voilà` (ambient service word inside
025/026 — heard/read, explained via quick peek, never demanded).

**Ghost-bearing material**: 019-029 input/reveal lines carrying madame/monsieur/croissant —
scene, listening, and reveal color only; **never scored as missing** anywhere; never in
`piecesUsed`.

**Prohibited expected output** (hard list): `je veux` (any position as expected answer) ·
madame/monsieur/croissant · `beaucoup` · `voilà` · bonsoir/salut/pardon · où est/la gare/
réserver une table/baguette · `Pouvez-vous répéter ?` (inverted — appears nowhere in this
pool) · formula fragments (`comprends pas`, bare `répéter`) · any unsourced noun · any L2+
grammar.

## 9. Sentence relationship graph

The ecosystem is a graph, not a flat list:

- **Request arc (spine)**: base 002 → opener-joined 003 → **anchor 004** (landing added) →
  mid-exchange 005 (opener omitted — repair target) → casual 006 (ellipsis — register
  variant). Reveal targets: 030 (formal model), 031 (casual model). PH reuse: slot swaps and
  omission variants over 004 (§14). Carryover: the frame itself carries to L2+ (new cargo
  classes later).
- **Café ↔ tea slot relation**: 002/004/006 [A slot] ↔ 007/008 [S slot, supplied]. The pair
  *is* the supported-production teaching case; derivation-safe (§14, §17); L5 will make the
  package operation explicit.
- **Polite opener/landing**: 001 (opener) and 012/landing-in-004 form the "sandwich" —
  omission variants of 004 (drop opener → 005-shaped; drop landing → 003-shaped) are the
  EV-052 Missing-Move repair pair.
- **Thank/close**: 009 → 011 (thanks+close) → 010; reveal enrichment 032/033 (warmth), 027/
  028 (address). Carryover: closes recycle at L6/L7/L10.
- **Rescue pair**: 013 + 014 → combined move 015; polite interruption 016; opener 017. The
  pair returns in every later lesson's rescue beat (Supported throughout, CA-8).
- **veux ↔ voudrais contrast**: 018 ↔ 002 with 031 showing that *casual* ≠ *blunt* (ellipsis
  is the casual route, not `je veux`). Feeds EV-013 (choice), EV-062 (smallest upgrade), and
  the IS-05 register insight.
- **Offer-contour set**: 022 (rising offer) ↔ 023 (flat confirmation) ↔ 021 (addressed
  offer) ↔ 024 (ghost offer) — the audio-recognition micro-family; responses route to 006/
  009.
- **Address-color family**: 019/020 (greet) · 021 (offer) · 026 (handover) · 027-029
  (thanks/close/opener enrichment) — ambient madame/monsieur exposure without production.

---

## 10. Exercise eligibility tags

Frozen boundaries: P0/P1 per the Exercise Variation Inventory; no new lesson screen types;
new mechanics Practice-Hub-first; **no L1 chip-decomposition exercise** (EV-035/036 start
L3+); no full Sentence Dictée; no pronunciation scoring (EV-093); `je veux` only in
contrast/trap mechanics; ghost-bearing seeds never in required production.

| Seed ID | Primary eligible | Secondary eligible | Ineligible/high-risk | Reason |
|---|---|---|---|---|
| 001 | EV-001, EV-030 | EV-004, EV-033, EV-052 (missing opener) | EV-034 Sentence mode | trivial span; micro only |
| 002 | EV-010, EV-030, EV-040 | EV-031, EV-033, EV-070 | EV-013 as "wrong vs 018" scored both-ways | contrast is register, not correctness |
| 003 | EV-040, EV-031 | EV-010, EV-052 (landing omitted) | — | — |
| 004 | EV-040, EV-031, EV-042 (goal) | EV-010 (multi-blank), EV-030, EV-034 **Guided**, EV-004 | EV-034 Sentence mode (length; policy) | anchor; richest projection |
| 005 | EV-030, EV-040 | EV-052 (opener omitted → repair) | EV-001 (redundant meet) | PH-leaning seed |
| 006 | EV-040, EV-011 (offer response) | EV-004, EV-070 | EV-031 (2 tiles — trivial) | casual register display |
| 007 | EV-040 (scaffolded), EV-010 (thé given in options) | EV-034 Guided (thé span **given**, A frame written) | EV-030 unscaffolded; any tray-less demand | supported boundary |
| 008 | EV-040 (scaffolded) | EV-011 | EV-030 unscaffolded | supported boundary |
| 009 | EV-030, EV-033 | EV-034 **Micro**, EV-004, EV-070 | — | A-new demand surface |
| 010 | EV-030, EV-033 | EV-070, EV-004 | — | A-new demand surface |
| 011 | EV-040, EV-033 | EV-070, EV-052 (thanks omitted) | — | exit move |
| 012 | EV-004, EV-034 **Micro** | EV-014 | any production demand | span/display seed |
| 013 | EV-033 (function recall, formula supplied), EV-063 | EV-004, EV-014, EV-070 (scenario direction) | EV-030 unscaffolded; EV-031 word-assembly | formula whole; assembly = fragmentation |
| 014 | EV-033 (scaffolded), EV-063 | EV-004 (contour), EV-014 | same as 013; EV-016 scored | contour shadowed, not scored |
| 015 | EV-063 (recovery sequence) | EV-070 (scenario) | EV-049 multi-step grading of formulas | one supported move, not a graded chain |
| 016 | EV-063 | EV-011 | unscaffolded anything | supported combination |
| 017 | EV-033 (scaffolded) | EV-052 (opener slot) | — | carryover opener |
| 018 | **EV-013 (trap option), EV-012** | EV-062 (upgrade revision), IS-05 support | **any mechanic where it is the correct answer**; EV-030/040 targets | contrast-only |
| 019/020 | EV-014 (address heard) | EV-001 (scene meet) | any production | input-only |
| 021 | EV-014, EV-011 (what's being asked?) | scene input in SC-2/3 | production; EV-034 | input-only |
| 022/023 | **EV-014 (contour pair)** | EV-017 (what changed: melody) | any text-only rendering of the pair; production | audio-dependent by design |
| 024 | EV-014, EV-011 | scene input | production of croissant anywhere | ghost boundary |
| 025/026 | EV-014 light; scene input | IS-22 peek (voilà gloss) | production; flashcard recall | ambient service word |
| 027-029 | reveal/scene input | EV-014 (address color) | production; required identification of madame/monsieur | enrichment only |
| 030/031 | IS-16 targets (EV-041/042 reveals) | EV-004 shadow (whole-turn, advanced) | grading against them (W1); chip-izing | model answers |
| 032/033 | IS-16 enrichment | EV-014 (heard warmth) | production; `beaucoup` demand | reveal-only boundary |

## 11. Evidence eligibility tags

Strongest **safe** evidence per seed (Mastery Bible frame; assistance-scoped per FQ-3).
"Assist" = assistance/hint level must be recorded with the evidence.

| Seeds | Strongest safe evidence | Target identity/span | Assist recorded? | Must not be inferred |
|---|---|---|---|---|
| 001, 002, 003, 004, 005, 006 | controlled production | the A chunks used (per-seed composition); span for 004 = full arc | yes (hint ladder rungs) | fluency/register mastery from one success; weakness from one miss |
| 007, 008 | **supported production** (real, assistance-scoped) | un-the (supported claim only) + recycled frame | **always** (support is constitutive) | independent production of `un thé`; package-gender knowledge (L5 territory) |
| 009, 010, 011 | controlled production + recall | merci; au-revoir | yes | social-register mastery beyond the taught move |
| 012 | audio exposure; recognition (writing span in Micro Dictée) | sil-vous-plait orthography span | yes | broad orthography ability from one span (FQ-1) |
| 013, 014, 015, 016, 017 | **supported production + recall (formula-whole)** | the survival formulas / excusez-moi as wholes | **always** | independent (unscaffolded) formula ownership; grammar knowledge of `ne…pas` (L3) or pouvoir (L11) from formula use |
| 018 | recognition (register discrimination) | phen: register contrast | n/a | grammar error; broad politeness failure — the signal is contextual register only |
| 019-029 | exposure / audio recognition | heard-meaning of the line; address forms **not** individually assessed | n/a | any ownership of ghost items; error from not producing them |
| 030-033 | comparison only (reveal viewed) | — | n/a | **nothing** — reveal viewing is never mastery (I-27) |

## 12. Mon Lexique projection map

Constraints (binding): recognition alone never adds; ghost never becomes learned; `je veux`
never enters from its trap role; supported formulas may become visible after qualifying
**supported** production (CA-8); Mon Lexique stays a projection over shared identities.

| Item entry | Example-relation seeds | Visibility earned via | Evidence required | Stays hidden when |
|---|---|---|---|---|
| bonjour | 001, 003, 004 (030 as richer example) | production in 001/003/004 | controlled production | — |
| je voudrais | 002-007 | production in 002-005 | controlled production | — |
| un café (single entry despite legacy dual ID — §16 note) | 002-006 | production | controlled production | — |
| s'il vous plaît | 004, 005, 006, 012 | production in 004-006 | controlled production | — |
| **merci** | 009, 011 (027/032 as reveal-richness examples) | production | controlled production | — |
| **au revoir** | 010, 011 (028/033 richness) | production | controlled production | — |
| excusez-moi | 016, 017 (029 richness) | **supported** production | supported production (assist-scoped) | only exposed/recognized |
| je ne comprends pas | 013, 015, 016 | supported production | supported production | only seen in rescue displays |
| vous pouvez répéter ? | 014, 015 | supported production | supported production | only heard |
| un thé | 007, 008 | supported production | supported production | only offered/seen |
| *(never listed)* | je veux (018) · madame/monsieur/croissant (019-029) · voilà · beaucoup | — | — | always hidden at L1 |

Containing-pieces potential (display-only, no L1 exercise): je voudrais → je · voudrais
(lemma vouloir named); s'il vous plaît deliberately unexpanded; un café/un thé → package ↔
noun link (primary/linked per contract §3). Parent identities remain the entries.

## 13. Flashcard projection map

Decided directions only; cards are projections of seeds/scenes, never card-only sentences.

| Direction | Source seed/relation | Target identity | Learner action | Evidence | Anti-pattern risk |
|---|---|---|---|---|---|
| Intent/meaning → FR recall | "Thank them" → 009 · "Say goodbye" → 010 · "Order a coffee politely" → 004/006 | merci; au-revoir; request arc | produce (self-grade; typed hosts EV-030) | self-report / controlled if typed | bare-translation framing — keep intent phrasing |
| Sentence context → missing piece | 004 cloze (`Bonjour, je voudrais ___, s'il vous plaît.`) · 003 opener gap · 007 (**thé shown among given options only**) | slot fillers; opener | choose/recall the piece | recognition / recall | gap on supported thé must stay choice-given, never recall-demanded |
| Scenario → response recall | SC-3 ("You didn't catch it — what do you say?" → 013/014) · SC-1 order · SC-7 close | formulas (supported note shown); closes | recall + reveal + self-grade | self-report | grading; formula anxiety — calm framing |
| Audio → meaning/target recognition | 021/022/023 (offer vs confirmation) · 024 (what was offered?) · 013/014 heard | contour; heard meaning | listen + choose | audio recognition | TTS-contour dependence — recorded audio first (§15) |
| Selective FR → meaning | none required at L1 (cognates trivial; no faux ami in pool) | — | — | — | adding them anyway = the rejected generic drill |

## 14. Practice Hub derivation map

| Class | Seeds | Allowed derivations |
|---|---|---|
| Safe-template base | 004 (anchor), 011 (close) | slot swap (café ↔ **thé with support shown**); omission variants (drop opener → 005-shape; drop landing → 003-shape) as EV-052 repair prompts; full-arc reconstruction (EV-031 tiles; EV-040 typed) |
| Safe slot variant | 005, 006, 007, 008 | café↔thé swap only; no other nouns exist |
| Authored-only | 018 + its feedback (register repair: 018 → 002 via EV-062); all trapReasons; 015/016 rescue scenes; 030-033 reveal copy | none generated |
| Rescue-only | 013, 014, 015, 016, 017 | retrieval prompts (function recall: "say you don't understand" — formula supplied); **never** fragment or recombine formulas |
| Contrast-only | 018 | appears only in EV-012/013 option sets |
| Reveal-only | 027-033 | reveal/enrichment surfaces; no drill derivation |
| Not PH eligible | 019-026 as production sources | input/listening use only |

Function-recall set: 009 (thank), 010 (close), 013/014 (rescue), 017 (attention), 004
(order). No derivation may introduce vocabulary, promote treatment, or fragment a formula —
the Hub draws volume from these relations and nothing else (not a second curriculum).

---

## 15. Audio and Dictée manifest candidate list

No files, no final audio IDs. Human recordings later for canonical/static content; TTS
fallback until then; playback-rate slow mode (no duplicate slow recordings by default; the
elision clip class is the approved exception); **no pronunciation scoring**; defective audio
= content/audio attribution, never learner error; **no full L1 Sentence Dictée**.

| Seed/span | Entity type | Human recording priority | Audio use | Shadowing | Audio Recognition | Dictée mode | Notes |
|---|---|---|---|---|---|---|---|
| Items: bonjour, je voudrais, un café, s'il vous plaît, merci, au revoir, excusez-moi, je ne comprends pas, vous pouvez répéter ?, un thé | item clips (10) | **High** | chip taps; meet cards; peeks | formulas + chunks | — | — | shared identity with all surfaces (`entityId → audioId` later) |
| 004 (anchor) | sentence | **High** | meet auto-play; model | ✔ (chunked) | — | Guided (cloze `Bonjour, je voudrais ___, s'il vous plaît.` — A frame written, filler given) | the flagship clip |
| 001, 009, 010, 011 | sentence | High | moves + closes | ✔ (001, 011) | — | Micro: 009 (`merci`) | short clips |
| 013, 014, 015 | sentence | **High** | rescue models | ✔ (contour of 014) | ✔ (heard-meaning) | — (formula orthography via Micro on `merci`-class A spans only; formulas stay recall-not-transcription at L1) | 014 rising contour is a recording priority (S1) |
| 022 vs 023 | sentence pair | **High — pair must be recorded together** | contour discrimination | — | ✔ (the EV-014 contour payload) | — | text-identical pair; unusable on TTS contours |
| 021, 024 | sentence | Medium | offers (listening) | — | ✔ | — | address/ghost color |
| 019, 020, 025, 026 | sentence | Medium | scene beats | — | ✔ (address forms heard) | — | — |
| 006, 007, 008 | sentence | Medium | casual/supported orders | 006 optional | — | Guided (007: thé span **given**, learner writes the A frame) | support boundary in Dictée mirrors production boundary |
| 012 + spans `un café` (from 002), `je voudrais` (from 002) | span clips | Medium | writing-focus spans | 012 | — | **Micro** (012; `un café`) | elision/accent focus; FQ-1 semantics — orthographic misses stay precision-class |
| 030-033 | sentence | Medium-Low | reveal models (heard) | 030 optional advanced | — | — | reveal audio enriches, never tests |
| 027-029 | sentence | Low | reveal warmth | — | optional | — | — |

Totals: **10 item clips + ~14 high/medium-priority sentence clips (+7 lower)**; Dictée
material = 2 Micro spans + 1 Micro seed (012) + 2 Guided cloze patterns (004-, 007-based).

## 16. Interstitial and popup links

Viewing any surface below produces engagement/exposure events only — never mastery.

| Seed or group | Surface | Trigger identity | Placement | Required/optional | Event only | Mastery non-claim |
|---|---|---|---|---|---|---|
| 009 + 032 | IS-02 Cognate Bridge (merci ≈ mercy) | merci | inline card near first merci production | Required | ✔ | ✔ |
| 014 | IS-02 Cognate Bridge (répéter ≈ repeat) | vous-pouvez-repeter | rescue beat | Required | ✔ | ✔ |
| 018 ↔ 002 (+031) | IS-05 Register/Politeness (why voudrais wins; casual = ellipsis, not veux) | phen: register | after the contrast moment (SC-5) | Required | ✔ | ✔ |
| 004 | IS-06 Why This Works (the politeness sandwich: opener → request → landing) | request arc | after first full-arc production | Required | ✔ | ✔ |
| 001-012 set | IS-07 Notice the Pieces (chunk-first display of the kit) | lesson pieces | lesson opening | Required | ✔ | ✔ |
| 030-033 | IS-16 Natural Reveal (models + Another Way + register notes) | free production | after EV-041/042 | Required | ✔ | ✔ |
| all FR text | IS-22 Piece Quick Peek (incl. `voilà` gloss; madame/monsieur gloss) | any tapped piece | everywhere | Required | ✔ | ✔ |
| kit items | IS-23 Piece Detail | items | Mon Lexique / long-press | Required | ✔ | ✔ |
| 012 / 004 | IS-03 Sound Pattern (silent finals; `s'il` elision — one tiny note) | sound facts | near first written work | Optional | ✔ | ✔ |
| 001/019/020 | IS-04 Culture Bite (**the one L1 bite**: bonjour-first — greeting before business) | culture: bonjour-first | near SC-1 | Required (sole culture bite) | ✔ | ✔ |
| 002-007 | IS-08 `je voudrais` anatomy reveal (je · voudrais; lemma vouloir named) | je-voudrais | optional post-contact peek | Optional (evidence-free) | ✔ | ✔ |
| trap picks | IS-31 Trap Explanation (one coach line per trapReason) | authored traps | after first wrong pick | Required | ✔ | ✔ |

No decorative interstitials beyond these.

## 17. Content Factory derivation contract

**Allowed deterministic derivations** (over this pool only): café↔thé slot swap (support
shown for thé) · opener/landing omission variants of 004 (repair prompts) · cloze variants of
003/004/007 on A spans (thé given) · context prompts wrapping SC-1…SC-8 · audio projections
(§15 list) · flashcard projections (§13 directions) · contrast pair rendering (018 vs 002) ·
supported rescue prompts (formula supplied).

**Authored-only**: register contrast + feedback copy; trap explanations; rescue mini-scenes;
all Natural Reveal copy (030-033 branches); culture/register insight copy.

**Prohibited generation**: new vocabulary or glue words; new identities; treatment
assignments or transitions; ghost production anywhere; formula fragmentation or
recombination; the inverted repetition question; unsupported grammar; unvalidated French
reaching learners; near-identical filler sentences; self-approval of French QA. Every
generated artifact passes deterministic validation + named-human French QA before approval.
The factory is not implemented by this document.

## 18. Duplication and economy audit

- **Exact duplicates**: 0 (all 33 surfaces distinct; verified — the closest case, 022 vs
  023, differs in punctuation *and* contour and exists precisely for that contrast).
- **Near-duplicates, justified**: request ladder {002, 003, 004, 005, 006} (scaffolding
  ladder + omission-repair targets, each a distinct communicative state); offer-contour set
  {021, 022, 023}; voilà pair {025, 026} (bare vs addressed); merci pair {009, 032}
  (required vs reveal-enrichment); address-enrichment family {027, 028, 029}; tea pair
  {007, 008} (full vs elliptical, mirroring 004/006).
- **Unjustified variants removed**: `Bonjour, je voudrais un thé.` (→ reserve; pure
  derivation), `Un thé ?`, `Merci, monsieur.`, exclamative/punctuation variants (merged as
  accepted alternatives), `Voilà, un café.` (rejected — unsourced glue).
- **Average product projections per core seed**: ≈ 3.1 (lesson-path, PH, flashcard, audio,
  Dictée, reveal, Lexique-example roles counted per §10-§16; the nine unscaffolded seeds
  average > 4).
- **Single-use seeds**: 029 (reveal-enrichment only) and 032 (reveal warmth) are the
  thinnest — retained deliberately as Natural-Reveal richness (canon: reveal may exceed
  required output); every other seed carries ≥ 2 roles.
- **Quota check**: no seed exists only to fill the band; the pool stopped at 33 because the
  frozen scope was exhausted, not because 33 was targeted.

## 19. Reserve and rejected candidates

| Candidate | Status | Reason | Possible future home |
|---|---|---|---|
| `Excusez-moi, vous pouvez répéter ?` | **Reserve** (R-1) | valid supported combination; core already carries the je-ne-comprends-pas combination (016) | L1 pool v0.2 or Practice Hub authored prompt |
| `Bonjour, je voudrais un thé.` | **Reserve** (R-2) | pure derivation of 003+007 | Content Factory slot swap |
| `Un thé ?` | **Reserve** (R-3) | derivable offer variant | audio-recognition extension |
| `Merci, monsieur.` | **Reserve** (R-4) | addressee variant of 027 | reveal-enrichment rotation |
| `Bonsoir.` / `Salut` / `Pardon !` | Rejected | FP-1 deferred greetings/apology | post-slice L1 breadth or Practice Pool packs |
| `Excusez-moi, où est la gare ?` | Rejected | deferred `où est` + `la gare` | L8 band (adapted) |
| `Je voudrais réserver une table.` | Rejected | table-booking scope | post-slice service band |
| `Bonjour, je voudrais une baguette, s'il vous plaît.` | Rejected | `baguette` deferred (faux-ami care needed) | post-slice slot inventory |
| `Bonjour, je voudrais un croissant.` | Rejected | ghost production — prohibited | croissant stays ghost |
| `Bonjour ! Bienvenue. Qu'est-ce que vous voulez ?` | Rejected | future grammar; legacy AI-chat line | L12+ band, rewritten |
| Legacy mixed EN/FR weave samples | Rejected | exercise artifacts with deferred breadth | none (mechanic lives in EV-041) |
| `Comme ci, comme ça` | Rejected | spec-cut small talk | post-slice |
| `Je vous en prie.` | Rejected | unsourced politeness response | later politeness band |
| `Et voilà, un café.` | Rejected | unsourced glue `et` | — |

## 20. French-QA review surface

All 33 seeds await human sign-off; the table lists the concentrated review questions. Risk:
Low = sourced/simple; Medium = authored or register-sensitive; High = pedagogy depends on the
answer.

| Seed ID | Exact French | QA risk | Question for reviewer | Current recommendation |
|---|---|---|---|---|
| 004 | Bonjour, je voudrais un café, s'il vous plaît. | Low | Does the double-comma rhythm read as natural spoken pacing rather than textbook punctuation? | keep (shipped surface) |
| 006 | Un café, s'il vous plaît. | Low | Natural as a counter order from a customer (not curt)? | keep |
| 007 | Je voudrais un thé, s'il vous plaît. | Low | Any register difference from the café line worth noting? | keep |
| 008 | Un thé, s'il vous plaît. | Low | Same check as 006 | keep |
| 011 | Merci, au revoir. | **Medium** | Is the single-turn `Merci, au revoir.` natural at a counter exit, or would `Merci ! Au revoir.` (two beats) be truer to speech? | keep; offer two-beat as accepted alternative |
| 014 | Vous pouvez répéter ? | Low | Confirm space-before-`?` typography and rising-contour note match house style | keep (locked surface) |
| 015 | Je ne comprends pas. Vous pouvez répéter ? | Low | Natural pacing as one turn? | keep |
| 016 | Excusez-moi, je ne comprends pas. | **Medium** | Newly authored: is the interjection+formula rhythm natural mid-exchange (vs `Pardon, …` which is out of scope)? | keep pending QA |
| 017 | Excusez-moi. | **Medium** | As standalone attention-getter (not apology) — is the L1 framing unambiguous without `pardon` for contrast? | keep; framing note in copy |
| 018 | Je veux un café. | Low | Confirm feedback framing ("understandable, blunt with a stranger") is fair — some contexts make je veux acceptable | keep with contextual feedback |
| 021 | Un café, madame ? | **Medium** | Is the elliptical offer with address natural from a server (vs `Vous désirez ?`-class lines that are out of scope)? | keep pending QA |
| 022/023 | Un café ? / Un café. | **High** | The contour pair is text-identical minus punctuation: is recorded-audio contrast alone sufficient for the discrimination pedagogy, and are both lines natural in the service scene? | keep only with recorded audio; drop EV-014 payload if QA doubts the pair |
| 024 | Un croissant ? | Medium | Natural as an add-on offer? | keep pending QA |
| 025/026 | Voilà. / Voilà, monsieur. | Low | Handover usage natural (it is, per legacy usage line) — confirm gloss wording | keep |
| 027-029 | Merci, madame. / Au revoir, madame. / Excusez-moi, madame. | Medium | Address-form usage: appropriate frequency/register for reveal richness? Any risk of over-formality for a modern café? | keep as reveal-only; QA calibrates frequency |
| 030 | Bonjour, je voudrais un café, s'il vous plaît. Merci ! | Low | Does closing with `Merci !` before receiving the coffee read naturally (thanks-in-advance)? | keep (shipped model); QA may prefer moving merci to handover |
| 031 | Bonjour, un café s'il vous plaît. Merci ! | **Medium** | Source has no comma before `s'il vous plaît` — intended casual typography or inconsistency? | align punctuation per QA verdict |
| 032/033 | Merci beaucoup. / Merci beaucoup, au revoir ! | Low | Reveal-enrichment warmth appropriate to calm tone? | keep, reveal-only |
| 001-003, 005, 009, 010, 012, 013, 019, 020 | (simple sourced surfaces) | Low | Standard naturalness/typography pass | keep |

## 21. Acceptance audit

1. Core unique-seed count = **33** (band 28-40; aim 32-36). ✔
2. L1 Active-new remains exactly **2** (merci, au revoir — seeds 009/010/011 are their demand
   surfaces; no other new Active identity appears). ✔
3. No hidden third Active demand (every required composition audited in §8). ✔
4. All unscaffolded required output uses Active material only (nine seeds, §8). ✔
5. Every Supported-production seed names its scaffold (§8 table). ✔
6. Ghost is never required (019-029 input/reveal only; ghost absent from all required
   compositions and from `piecesUsed`-bound roles). ✔
7. `je veux` is never an expected answer (018 contrast-only; §10 ineligibility row). ✔
8. Repetition request is always `Vous pouvez répéter ?` — the inverted form appears in this
   document only inside the harvest ledger's adaptation record, never as learner material. ✔
9. No full L1 Sentence Dictée (Micro + Guided only, §15). ✔
10. No deferred vocabulary becomes required (rejected list §19; absent from §5). ✔
11. No unsupported grammar becomes required (compositions use frozen identities only). ✔
12. No whitespace-tokenized chip anatomy (only the optional authored je-voudrais reveal,
    §16). ✔
13. Every seed has a source status (§5 column). ✔
14. Every seed has treatment composition (§5 column). ✔
15. Every seed has a relationship group (§5 column; §9 graph). ✔
16. Every seed has ≥1 justified destination (§10-§16; §18 economy audit). ✔
17. Mon Lexique visibility is production/weakness-gated (§12). ✔
18. Flashcards use only the decided directions (§13). ✔
19. PH derivations cannot create new curriculum (§14, §17). ✔
20. Audio failures remain non-learner attribution (§15 preamble). ✔
21. All newly authored French is marked pending human French QA (§1, §5, §20 — sourced
    surfaces also remain pending sign-off per this pool). ✔
22. No runtime or Canonical file changed — this document is the only change. ✔

## 22. Readiness verdict

| Consumer | Verdict | Basis |
|---|---|---|
| Founder content review | **READY** | complete, bounded, decision-consistent pool with review surface (§20) |
| Human French QA | **READY** | §20 gives a concrete per-seed review surface; 5 Medium + 1 High items concentrated |
| L1 Sentence × Exercise × Evidence pilot matrix | **READY WITH BOUNDED GAPS** | §10/§11 pre-tag eligibility; gaps = QA outcomes (esp. 022/023) may remove/adjust rows |
| Runtime sentence registration | **NOT READY** | sentence-ID registry does not exist; the four G1 item identities remain unregistered; draft-local IDs must not leak |
| Content Factory implementation | **NOT READY** | derivation contract defined (§17) but registration + schema prerequisites unmet |
| Audio recording | **NOT READY** | recording follows French sign-off; priority list (§15) is ready to hand to that step |

*End of L1 Sentence Ecosystem v0.1 — Draft authored vertical-slice content artifact. Every
French surface remains pending human French QA. Next: founder + French-QA pass over §20,
then the L1 Sentence × Exercise × Evidence pilot matrix (Charter workstream 6).*
