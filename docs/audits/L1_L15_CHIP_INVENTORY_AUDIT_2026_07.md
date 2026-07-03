# L1-L15 Chip Inventory Audit (2026-07)

**Base**: main `84a5b8e497dd1a29e71a92da3557d20d8ff9ebb4` (post PR #169).
**Scope**: v1 lessons L1-L15 (L0 included in the mechanical CSVs as continuity appendix rows). Audit/report only: no lesson, registry, test, or runtime change.
**Method**: lesson and registry data extracted mechanically from `content/lessons/v1/` and `content/itemRegistry.ts` (read-only script), then classified against the chip canon locked in PRs #164-#169.
**Companion CSVs** (full tables): `docs/audits/l1_l15_chip_inventory/`
- `actual_lesson_inventory.csv` (65 rows: every learningItem per lesson with role + chip presence)
- `item_registry_usage.csv` (52 rows: every registry item, usage map, dormancy, risk notes)
- `candidate_inventory.csv` (448 rows: per-lesson quarry, six categories)
- `not_chip_surfaces.csv` (22 rows)
- `risk_review.csv` (12 rows)

**Canon preserved throughout this audit** (not proposals; recorded as fixed constraints): PROTECTED_CHUNKS stays exactly `je ne suis pas` + `ce n'est pas`; `je ne peux pas` is composed copy, never a chip; `vous pouvez m'aider ?` is never a chunk; `adverb-ou-where` naming; `chunk-c-est-ou` keeps `?`; the L9 pause slice (no cafe-faire slice, no active je fais, no maintenant); `est-ce que` is the wrapper target with intonation as comparison copy; `j'y vais` / `on y va` are chunk-first but never chips or protected chunks; no `il y a`; `il faut` primary / `je dois` supported; `verb-aller` infinitive-support only.

---

## 1. Lesson snapshots (L1-L15)

| L | Title | Learner job | Active chips (new) | Supported (new) | Exposure | Carryover load | Active-new | Risk |
|---|---|---|---|---|---|---|---|---|
| 1 | Survival Kit | greet, request politely, thank | merci (bonjour/je voudrais/un cafe/s'il vous plait seeded in L0) | — | — | 4 (L0 set) | 1 | low |
| 2 | Etre | say I am here | je suis (+ legacy chunk-je-suis-ici) | — | — | bonjour | 1-2 | low (R1 registry note) |
| 3 | Non | say no; ne...pas | non, je ne suis pas, ce n'est pas (+ oui, see R2) | non merci | ne...pas sandwich (frame) | ici, suis | 3-4 | med (R2 oui status) |
| 4 | J'ai | feelings/possession with j'ai | j'ai (+ legacy j'ai-faim / j'ai-une-question) | question (noun) | elision, je suis vs j'ai | bonjour | 1-3 | low (R1) |
| 5 | Un, une | article packages | un cafe, une question (packages) | — | un/une nugget | je voudrais, j'ai | 2 | low |
| 6 | Un petit moment | whole small moment (integration) | au revoir | — | — | 8 (L1-L5 spine) | 1 | low |
| 7 | Je vais | heading home, close the moment | je vais | a la maison | — | au revoir, merci | 1 | low |
| 8 | C'est ou ? | ask where; answer here | c'est ou ? (frozen q) | ou (adverb) | — | c'est, ici, bonjour | 1 | low |
| 9 | Faire une pause | ask for a break politely | faire une pause | pause (noun) | — | je voudrais, s'il vous plait | 1 | low |
| 10 | Une petite journee | full day arc (integration) | — (0 new) | — | vous pouvez / m'aider (L11 seed, meet-only) | 8+ | 0 | low |
| 11 | Je peux | permission + help | je peux | vous pouvez, aider, m'aider | — | faire une pause, ne...pas frame, s'il vous plait | 1 | low-med (R7/R8 watches) |
| 12 | Est-ce que | wrap owned statements into questions | est-ce que | — | — | je peux, c'est, ici, vous pouvez, m'aider | 1 | low |
| 13 | Can-do, asked | chain can-do + asking (integration) | — (0 new lexis) | — | j'y vais (L14 seed, meet-only) | 10 | 0 | low |
| 14 | J'y vais | leave without repeating the place | y (place), j'y vais, on y va | — | — | je vais, a la maison, au revoir | 3 | med (first pronoun; R5/R6 watches) |
| 15 | Il faut | say what must happen | il faut | je dois, aller | — | faire une pause, a la maison, je peux (contrast) | 1 | low-med (R9 watch) |

Model-answer-only surfaces (every lesson): all say-it-your-way screens run deterministic `model-answer-only`; multi-sentence models appear in L6/L10/L13/L15 sayits and are never chips. Traps: every fill carries reasoned traps (notably `veux` L1, `Oui merci` L3, `ou`/`oui` L13, `en` L14, `Il faut que` L15).

---

## 2. Exact piecesUsed audit (all 16 lessons, 80 chips)

Every `piecesUsed` entry, mechanically resolved. There are **no VIOLATIONS**: no full-sentence chip, no full-question chip, no protected-chunk abuse. The only REVIEW class is identity (R3): `ici` and `faim` are produced chips with no registry item behind them.

| Lesson | Chip | Resolved itemId | Type | Role | Verdict |
|---|---|---|---|---|---|
| L0 | Bonjour | chunk-bonjour | chunk | active | OK |
| L0 | je voudrais | chunk-je-voudrais | chunk | active | OK |
| L0 | un café | chunk-un-cafe | chunk | active | OK |
| L0 | s'il vous plaît | chunk-sil-vous-plait | chunk | active | OK |
| L1 | Bonjour | chunk-bonjour | chunk | carryover | OK |
| L1 | je voudrais | chunk-je-voudrais | chunk | carryover | OK |
| L1 | un café | chunk-un-cafe | chunk | active | OK |
| L1 | s'il vous plaît | chunk-sil-vous-plait | chunk | carryover | OK |
| L1 | merci | chunk-merci | chunk | active | OK |
| L2 | je suis | chunk-je-suis | chunk | active | OK |
| L2 | ici | none | - | - | REVIEW (unregistered chip, R3) |
| L2 | Bonjour | chunk-bonjour | chunk | carryover | OK |
| L3 | non | chunk-non | chunk | active | OK |
| L3 | je ne suis pas | chunk-je-ne-suis-pas | chunk | active | OK |
| L3 | ce n'est pas | chunk-ce-n-est-pas | chunk | active | OK |
| L3 | non merci | chunk-non-merci | chunk | supported | OK |
| L4 | j'ai | chunk-j-ai | chunk | active | OK |
| L4 | faim | none | - | - | REVIEW (unregistered chip, R3) |
| L4 | une question | chunk-une-question | chunk | active | OK |
| L4 | Bonjour | chunk-bonjour | chunk | carryover | OK |
| L5 | un café | chunk-un-cafe | chunk | active | OK |
| L5 | une question | chunk-une-question | chunk | active | OK |
| L6 | Bonjour | chunk-bonjour | chunk | carryover | OK |
| L6 | je suis | chunk-je-suis | chunk | carryover | OK |
| L6 | ici | none | - | - | REVIEW (unregistered chip, R3) |
| L6 | j'ai | chunk-j-ai | chunk | carryover | OK |
| L6 | une question | chunk-une-question | chunk | carryover | OK |
| L6 | Merci | chunk-merci | chunk | carryover | OK |
| L6 | Au revoir | chunk-au-revoir | chunk | active | OK |
| L7 | je vais | chunk-je-vais | chunk | active | OK |
| L7 | à la maison | chunk-a-la-maison | chunk | supported | OK |
| L7 | Merci | chunk-merci | chunk | carryover | OK |
| L7 | Au revoir | chunk-au-revoir | chunk | carryover | OK |
| L8 | où | adverb-ou-where | adverb | supported | OK |
| L8 | c'est | chunk-c-est | chunk | supported | OK |
| L8 | ici | none | - | - | REVIEW (unregistered chip, R3) |
| L8 | Bonjour | chunk-bonjour | chunk | carryover | OK |
| L9 | je voudrais | chunk-je-voudrais | chunk | carryover | OK |
| L9 | faire une pause | chunk-faire-une-pause | chunk | active | OK |
| L9 | une pause | noun-pause | noun | supported | OK (article-wrapped chip of noun-pause) |
| L9 | s'il vous plaît | chunk-sil-vous-plait | chunk | carryover | OK |
| L10 | bonjour | chunk-bonjour | chunk | carryover | OK |
| L10 | c'est | chunk-c-est | chunk | carryover | OK |
| L10 | où | adverb-ou-where | adverb | carryover | OK |
| L10 | je voudrais | chunk-je-voudrais | chunk | carryover | OK |
| L10 | faire une pause | chunk-faire-une-pause | chunk | carryover | OK |
| L10 | je vais | chunk-je-vais | chunk | carryover | OK |
| L10 | à la maison | chunk-a-la-maison | chunk | carryover | OK |
| L10 | au revoir | chunk-au-revoir | chunk | carryover | OK |
| L11 | je peux | chunk-je-peux | chunk | active | OK |
| L11 | ne ___ pas | grammar-ne-pas-sandwich | grammar-nugget | frame | OK (frame skeleton of grammar-ne-pas-sandwich) |
| L11 | faire une pause | chunk-faire-une-pause | chunk | carryover | OK |
| L11 | vous pouvez | chunk-vous-pouvez | chunk | carryover | OK |
| L11 | m'aider | chunk-m-aider | chunk | carryover | OK |
| L11 | s'il vous plaît | chunk-sil-vous-plait | chunk | carryover | OK |
| L12 | est-ce que | chunk-est-ce-que | chunk | active | OK |
| L12 | je peux | chunk-je-peux | chunk | carryover | OK |
| L12 | c'est | chunk-c-est | chunk | carryover | OK |
| L12 | ici | none | - | - | REVIEW (unregistered chip, R3) |
| L12 | faire une pause | chunk-faire-une-pause | chunk | carryover | OK |
| L12 | vous pouvez | chunk-vous-pouvez | chunk | carryover | OK |
| L12 | m'aider | chunk-m-aider | chunk | carryover | OK |
| L13 | est-ce que | chunk-est-ce-que | chunk | carryover | OK |
| L13 | je peux | chunk-je-peux | chunk | carryover | OK |
| L13 | vous pouvez | chunk-vous-pouvez | chunk | carryover | OK |
| L13 | m'aider | chunk-m-aider | chunk | carryover | OK |
| L13 | ne ___ pas | grammar-ne-pas-sandwich | grammar-nugget | frame | OK (frame skeleton of grammar-ne-pas-sandwich) |
| L13 | faire une pause | chunk-faire-une-pause | chunk | carryover | OK |
| L13 | je vais | chunk-je-vais | chunk | carryover | OK |
| L13 | à la maison | chunk-a-la-maison | chunk | carryover | OK |
| L13 | s'il vous plaît | chunk-sil-vous-plait | chunk | carryover | OK |
| L14 | y | word-y-place | pronoun | carryover | OK |
| L14 | je vais | chunk-je-vais | chunk | carryover | OK |
| L14 | à la maison | chunk-a-la-maison | chunk | carryover | OK |
| L14 | au revoir | chunk-au-revoir | chunk | carryover | OK |
| L15 | il faut | chunk-il-faut | chunk | active | OK |
| L15 | je dois | chunk-je-dois | chunk | supported | OK |
| L15 | faire une pause | chunk-faire-une-pause | chunk | carryover | OK |
| L15 | aller | verb-aller | verb | supported | OK |
| L15 | à la maison | chunk-a-la-maison | chunk | carryover | OK |

Reading notes: "carryover" means the item was first introduced in an earlier lesson (seed lessons register hook items, so graduated items like `y` in L14 read as carryover from their L13 seed). "une pause" is the article-wrapped chip of `noun-pause` (the L5 package convention). "ne ___ pas" is the frame skeleton chip of `grammar-ne-pas-sandwich` — the approved composition route, not a sentence.

---

## 3. Registry usage audit

Full table: `item_registry_usage.csv`. Summary:

- **52 registry items**; **41 used** somewhere in L0-L15 surfaces.
- Of the used items: **26 active, 11 supported, 4 recognition** by registry status.
- **11 dormant items** (present, never referenced by any v1 lesson surface): `pronoun-je`, `pronoun-tu`, `pronoun-vous`, `verb-etre`, `chunk-tu-es`, `chunk-vous-etes`, `chunk-tu-es-pret`, `chunk-vous-etes-pret`, `sound-liaison`, `grammar-etre-identity`, `noun-idee`. All predate the factory loop (registry seeding around L1-L2 era). Harmless; several (tu/vous family, noun-idee) are natural future material — see candidate inventory. Recommendation: annotate or triage in a dedicated registry pass, no action now.
- **Should-stay-canon check**: every item used by L7-L15 traces to a merged PR decision (#167/#168/#169) and stays canon. The pre-canon L0-L6 items stay canon by usage, with three pattern-level REVIEW notes (R1/R2 below).

---

## 4. Not-chip surfaces

Full table: `not_chip_surfaces.csv` (22 rows). The load-bearing entries:

| Surface | Why not a chip | Composes from |
|---|---|---|
| Je ne peux pas. | PR #168: composed negative; lint forbidden-list pins it | je peux + ne ___ pas |
| Vous pouvez m'aider ? | PR #168: full question never a chunk | vous pouvez + m'aider |
| Est-ce que je peux faire une pause ? / Est-ce que vous pouvez m'aider ? / Est-ce que c'est ici ? | wrapped questions are composed productions | est-ce que + owned clause |
| Je peux faire une pause ? (intonation) | comparison copy only on wrapper-target screens (PR #169) | rising voice |
| J'y vais. | chunk-owned but never a chip; production composes je vais + y; recap anchors it in prose lines | je vais + y |
| On y va ? | frozen formula; weave hint chip only, never a recap chip | frozen whole |
| Il faut faire une pause. / Je dois aller a la maison. | model/expected sentences | il faut / je dois + infinitive |
| je suis ici / j'ai faim / j'ai une question | pre-canon registry chunks whose chip use is lint-forbidden; recaps atomize | je suis + ici, j'ai + faim, j'ai + une question |
| Il faut que / Qu'est-ce que / en / veux / Oui merci / oui / ou (in L13 fill) | trap-only leak guards | — |
| Sentence-level fill options (L4/L6) | recognition choice surfaces, not chips | — |

---

## 5. Candidate item inventory

Full table: `candidate_inventory.csv` — **448 rows** across L1-L15, in six categories (Active / Supported / Exposure / Carryover / Future / Reject). Three layers:
1. **Lesson content** (mechanical): every learningItem classified by its role in that lesson, plus unregistered produced chips.
2. **Owned carryover pool** (mechanical, L6+): every previously-introduced active/supported item available for recombination — the quarry Practice and Daily Review draw from.
3. **Audit backlog** (authored): future/backlog and reject/legacy candidates implied by each lesson's semantic slice, cross-checked against the syllabus specs' deferred lists.

Per-lesson counts: L1 21 · L2 16 · L3 18 · L4 17 · L5 15 · L6 25 · L7 29 · L8 33 · L9 34 · L10 32 · L11 39 · L12 38 · L13 41 · L14 44 · L15 46.

**Natural-limit statement (L1-L7)**: the 30-item floor is not reachable without fabrication for L1-L6 (and L7 sits at 29). The owned pool is simply small that early — L1 has four L0 items plus one new chip, and inventing more service nouns than the slice supports would be filler, not quarry. The counts grow monotonically with the owned pool and pass 30 from L8 onward.

**Quarry discipline**: nothing in this inventory is lesson load. No candidate was added to the registry; `add_to_registry_now` is "no" (or "already-registered") for every row. Reject rows record *why* tempting items are not Cairn-compatible now (paradigms, inversion, il faut que, question words, broad faire, rejected L9 cafe slice, maintenant, moi aider, etc.).

---

## 6. L15 endpoint snapshot — "At the end of L15, the learner can..."

**A. Can produce actively**
- Open, thank, close a moment: Bonjour / merci / s'il vous plait / non merci / au revoir.
- Identity + simple self-state: Je suis (ici); J'ai (faim / une question); negatives Je ne suis pas... / Ce n'est pas...
- Request/order basics: Je voudrais un cafe(, s'il vous plait); un/une packages.
- Movement/leaving: Je vais a la maison; the short exit J'y vais; the invitation On y va ?
- Orientation: C'est ou ? / C'est ici. (and the wrapped Est-ce que c'est ici ?)
- Small actions: (je voudrais / je peux / il faut) faire une pause.
- Permission + help: Je peux ... ? (rising voice); Est-ce que je peux ... ?; Vous pouvez m'aider(, s'il vous plait) ? composed from pieces.
- Yes/no asking: est-ce que + any owned statement.
- Necessity: Il faut + infinitive (faire une pause / aller a la maison).

**B. Can produce with scaffold (supported)**
- Je dois + infinitive (one person-form).
- Composed negatives over the ne ___ pas frame: Je ne peux pas (+ continuation).
- vous pouvez / aider / m'aider as request pieces; a la maison, ou, une pause, aller as slot fillers.

**C. Can recognize / has seen**
- The ne...pas sandwich as a named pattern; elision (j'/c'/m'/j'y) and the un/une package idea.
- Seeds met before owning: vous pouvez m'aider (L10), j'y vais (L13) — both since graduated.
- Trap-side exposure only: en, Il faut que, Qu'est-ce que, oui (as answer word), veux.

**D. Has NOT learned yet (explicit)**
- No full object-pronoun system (m'aider is frozen; no t'aider / l'aider / me-te-le-la-lui-leur).
- No full y system (no productive replacement rule, no multi-verb y like j'y suis / j'y pense, no y+modal chains like je peux y aller / je dois y aller).
- No `il y a`.
- No full aller paradigm (no tu vas / on va / vous allez production; no futur proche).
- No full devoir/falloir paradigm (only je dois; no tu dois / on doit / vous devez) and no `il faut que` (+ no subjunctive, no devrais/faudrait advice register).
- No broad ne ___ pas production beyond the current frames (je ne suis pas, ce n'est pas protected; je ne peux pas composed; nothing else).
- No general `on + y + verb` pattern (on y va is frozen).
- No active `je ne peux pas` chip.
- Also unopened: question words / qu'est-ce que / inversion, past/future tenses, broad pouvoir (pourrais), broad faire senses, definite articles as a system, numbers/time/money.

---

## 7. Chip restriction health check

- **Did we avoid sentence memorization?** Yes. All 80 piecesUsed chips are atoms, two-token engines, packages, or the two protected negation frames + the ne ___ pas skeleton. Every full sentence lives in model/expected/reveal copy. The two places sentence pressure appeared (je ne peux pas, vous pouvez m'aider ?) were resolved by composition, and the lint's forbidden list now pins the first mechanically.
- **Did we over-restrict any useful formula?** One candidate: excluding `j'y vais` / `on y va` from recap chips means the two headline expressions of L14 are only prose-anchored at lesson end. Mitigated (recap lines name both), but if smoke shows learners want them as tappable review chips, that is a deliberate canon decision to revisit — not a lint exemption to sneak in.
- **Did any lesson become too atomized?** No. L14 was the risk (composing j'y vais from je vais + y), but the meet-cards present the whole expression first (whole first -> use -> notice), so composition happens after contact, per canon.
- **Where are formula chunks justified?** s'il vous plait, au revoir, non merci, faire une pause, a la maison, on y va, m'aider — all frozen, high-utility, non-generalizing. This class is healthy and small.
- **What should graduate later?** vous pouvez -> productive requests; je dois -> more persons (paradigm doorway); adverb-ou-where -> ou est + noun frame; noun-pause -> broader noun slots; the dormant tu/vous family when a register lesson opens.
- **Hidden future debts?** (1) R3 identity gap: ici / faim chips carry no itemId, so their mastery events attach to nothing — cheap to fix in a registry pass, annoying later. (2) R1/R2 legacy registry shapes (je-suis-ici / j'ai-faim / j'ai-une-question clause chunks; oui still active) will confuse any future automated status logic. (3) Every new engine re-raises the negative-clause-chip question (R7) — the forbidden calibration list is the standing answer. (4) m'aider's object-pronoun family and on y va's pattern pressure are documented doorways, not surprises.

Special-attention items: `je ne peux pas` (composed only, pinned) OK · `vous pouvez m'aider ?` (split pieces) OK · `j'y vais` (chunk-owned, chip-free) OK-watch · `on y va` (frozen formula) OK-watch · `il faut` (invariable, que-blocked) OK · `je dois` (one form) OK · `m'aider` (frozen seed) OK · `ne ___ pas` (the reusable frame; carries all negative growth) OK · `est-ce que` (wrapper target; intonation policy consistent post-#169) OK.

---

## 8. Future queue (grouped backlog; quarry, not commitments)

- **Object-pronoun-before-infinitive doorway** (seeded by m'aider): t'aider, l'aider; later me/te/lui donner. One narrow lesson, chunk-first, long after L16.
- **Negation expansion** (all COMPOSED over ne ___ pas, no clause chips): je ne sais pas (needs savoir), je ne veux pas (needs vouloir surface), je ne comprends pas (repair slice), je ne vais pas, je n'y vais pas; later il ne faut pas (meaning-shift note), pas encore / pas de probleme as formulas; si (yes-after-negative) with a sense-suffixed id.
- **y expansion**: tu y vas / vous y allez (needs tu/vous aller forms), je n'y vais pas (composed), j'y suis (multi-verb, recognition first); il y a as its OWN later doorway (never merged into place-y); en + y/en contrast (paid-zone).
- **Necessity/modal expansion**: devoir persons (tu dois / on doit / vous devez) recognition-first; il faut + noun / il me faut as separate senses; je dois y aller once y and devoir both settle; je devrais / il faudrait (advice register, much later); il faut que + subjunctive last of all.
- **Location/movement expansion**: ou est + noun frame, tu vas ou, la / la-bas, a gauche / a droite, place nouns (hotel, gare, toilettes) with the definite-article doorway, au + place contraction, chez.
- **Cafe/service expansion**: un the, un croissant, une table, un verre d'eau, l'addition, c'est combien (needs numbers), excusez-moi / pardon, madame / monsieur, merci beaucoup / de rien.
- **Human context / feelings** (toward L16-L17 integration + A Small Moment seeds per the band map): je suis fatigue(e), j'ai soif/froid/chaud, ca va, d'accord, un moment, c'est pas grave, je ne comprends pas + vous pouvez repeter (the repair pair), désolé.

---

## 9. Verdict

**CLEAN_WITH_REVIEW_ITEMS**

No violations: zero sentence/question chips in piecesUsed, zero protected-chunk expansion, all #164-#169 decisions intact in shipped content. Review items (no fixes in this audit): **R1** legacy sentence/clause-shaped registry chunks (chunk-je-suis-ici, chunk-j-ai-faim, chunk-j-ai-une-question) — keep but never replicate; **R2** chunk-oui still `active` vs post-L3 passive/trap canon — demotion candidate; **R3** unregistered chip surfaces `ici` / `faim` — identity gap for mastery events; **R4** 11 dormant registry items — annotate/triage later; plus the standing watches R5-R9 (on y va generalization, j'y vais chip pressure, negative-composition debt, m'aider doorway, infinitive-family growth). Recommended next step: a small, dedicated **registry hygiene pass** (R1-R4) as its own reviewed PR — separate from any content batch.


---

## Conversation-Based Extended Chip / Candidate Inventory — L1-L15

**What Haktan wanted to see**: the broader conversation-derived chip/candidate map, not only the mechanical shipped-chip audit above. The sections above answer "what is in the lessons"; this section answers "what did our pedagogical decisions imply around each lesson" — so it can be judged whether the current chip restriction is too narrow, too loose, or correctly disciplined by L15. Planning/review inventory only: it changes no lesson, adds nothing to itemRegistry, and promotes nothing to active.

**Classification legend**: Active now · Supported now · Exposure/ghost now · Carryover now · Future/backlog · Reject/do-not-chip · Watchlist/canon-sensitive.

**Core surface rule** (from the Haktan discussion): each lesson can carry a broad extended inventory of roughly 30-40 candidates, but the lesson SURFACE stays narrow — active usually 1-3, supported usually 2-5, exposure capped, most of the quarry in future/backlog, and tempting-but-dangerous forms parked as reject/do-not-chip. The full mechanical quarry (including each lesson's owned carryover pool) lives in `candidate_inventory.csv`; the tables below are the conversation layer on top of it.

### Fixed constraints (conversation decisions, restated)

1. **Full sentences are not chips.** Model answers may be full sentences; `piecesUsed` stays atomized.
2. **`je ne peux pas` is not a chip** — composes from `je peux` + `ne ___ pas`.
3. **`vous pouvez m'aider ?` is not a chip** — composes from `vous pouvez` + `m'aider`.
4. **`m'aider` is a seed, not a full object-pronoun lesson.** Future doorway: m'aider / t'aider / l'aider; later me donner / te donner / lui donner.
5. **`j'y vais` is allowed as a chunk-first y-light doorway** — do not widen into a full y system.
6. **`on y va` is a frozen formula only** — not a general on + y + verb pattern.
7. **`il faut` is primary in L15; `je dois` supported; `aller` infinitive support only.**
8. **`oui` is review-sensitive** — registry says active, current canon treats it as passive/trap after L3.
9. **`ici` and `faim` are hygiene-sensitive** — produced as chips without registry identity.
10. **Legacy clause chunks are review-sensitive** — je suis ici / j'ai faim / j'ai une question exist historically; new surfaces atomize.

### Per-lesson extended tables

Columns: surface · proposed class · source of decision (shipped / conversation decision / implied future doorway / rejected temptation / hygiene risk) · reason · active now · registry now · risk note.

#### L1 — Survival Kit
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| bonjour / je voudrais / un cafe / s'il vous plait | Carryover now | shipped | L0 seed set, retrieved here | yes | yes | low |
| merci | Active now | shipped | the one new chip | yes | yes | low |
| je veux | Reject/do-not-chip | rejected temptation | blunt want; trap-only forever at this band | no | no | politeness canon |
| non merci | Future/backlog | shipped (L3) | arrives with negation | no | yes | low |
| un the / un croissant / une table / l'addition / un verre d'eau | Future/backlog | implied future doorway | service-slice quarry | no | no | article/de systems |
| c'est combien | Future/backlog | implied future doorway | price ask; needs numbers | no | no | prerequisites |
| excusez-moi / pardon / madame / monsieur | Future/backlog | implied future doorway | repair + address register | no | no | low |
| merci beaucoup / de rien | Future/backlog | implied future doorway | politeness upgrades | no | no | low |
| salut / s'il te plait | Future/backlog | implied future doorway | tu-register moment first | no | no | register |

#### L2 — Etre
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| je suis | Active now | shipped | first engine | yes | yes | low |
| ici | Supported now | hygiene risk | produced chip, NO registry identity (R3) | yes | **no** | mastery events unattached |
| je suis ici | Watchlist/canon-sensitive | hygiene risk | legacy sentence-shaped registry chunk; surfaces atomize (constraint 10) | no (as chip) | yes (legacy) | do not replicate |
| la / la-bas / c'est moi / voila | Future/backlog | implied future doorway | pointing & presence quarry | no | no | low |
| tu es / vous etes | Future/backlog | shipped-but-dormant | registry items waiting for a register lesson | no | yes (dormant) | R4 |
| il est / elle est | Reject/do-not-chip | rejected temptation | 3rd-person paradigm creep | no | no | no paradigms |
| fatigue / desole / en retard / pret | Future/backlog | implied future doorway | je-suis-state family (L10/L13 specs wanted fatigue) | no | no | agreement |

#### L3 — Non
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| non / je ne suis pas / ce n'est pas | Active now | shipped | negation core; the two frames are the ONLY protected chunks | yes | yes | protected list frozen |
| ne ___ pas | Supported now (frame) | conversation decision | THE reusable negation frame; all future negatives compose over it | yes (as frame chip) | yes (grammar-ne-pas-sandwich) | carries all negative growth |
| non merci | Supported now | shipped | polite decline formula | yes | yes | low |
| oui | Watchlist/canon-sensitive | shipped + conversation decision | registry active, canon passive/trap post-L3; never produced anywhere (constraint 8) | no | yes | R2 demotion candidate |
| je ne veux pas | Future/backlog | implied future doorway | composes vouloir-surface + ne ___ pas; never a clause chip | no | no | composition canon |
| je ne sais pas | Future/backlog | implied future doorway | composes savoir chip + ne ___ pas; never a clause chip | no | no | composition canon |
| je ne comprends pas | Future/backlog | implied future doorway | repair core, composed | no | no | repair slice unshipped |
| pas encore / pas de probleme / c'est pas grave | Future/backlog | implied future doorway | negative formulas; register notes needed | no | no | register |
| si (yes-after-negative) | Future/backlog | implied future doorway | sense-suffixed id when opened | no | no | homograph |
| ne...jamais / ne...rien | Reject/do-not-chip | rejected temptation | second negation system too early | no | no | one frame only |

#### L4 — J'ai
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| j'ai | Active now | shipped | second engine | yes | yes | low |
| faim | Supported now | hygiene risk | produced chip, NO registry identity (R3) | yes | **no** | mastery events unattached |
| une question | Supported now | shipped | noun package | yes | yes | low |
| j'ai faim / j'ai une question | Watchlist/canon-sensitive | hygiene risk | legacy clause chunks; surfaces atomize (constraint 10) | no (as chips) | yes (legacy) | do not replicate |
| j'ai soif / froid / chaud | Future/backlog | implied future doorway | sensation family, composed j'ai + noun | no | no | low |
| j'ai besoin de | Future/backlog | implied future doorway | need+noun bridge (L15 owns the verbal side) | no | no | de-contraction |
| une idee | Future/backlog | shipped-but-dormant | noun-idee waits for a slot | no | yes (dormant) | R4 |
| il y a | Reject/do-not-chip (here) | rejected temptation | existential; separate doorway, never via avoir or L14 y | no | no | constraint + L14 spec |
| avoir paradigm (tu as...) | Reject/do-not-chip | rejected temptation | no paradigms | no | no | canon |

#### L5 — Un, une
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| un cafe / une question | Active now | shipped | article packages | yes | yes | low |
| une pause | Future/backlog (here) | shipped (L9) | the next une-package; arrives with L9 | no | yes | low |
| le / la / les / des | Future/backlog | implied future doorway | definite/plural article system, own lesson | no | no | system |
| gender rule table | Reject/do-not-chip | rejected temptation | package-first canon; no rule tables | no | no | canon |
| plural -s sound note | Future/backlog | implied future doorway | sound pattern | no | no | low |

#### L6 — Un petit moment (integration)
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| au revoir | Active now | shipped | the one new chip; closes the arc | yes | yes | low |
| L1-L5 spine (8 items) | Carryover now | shipped | integration retrieval | yes | yes | recycle must not steal future lessons |
| a bientot / bonne journee / enchante | Future/backlog | implied future doorway | closing/meeting variants | no | no | low |
| entrez / attendez | Reject/do-not-chip | rejected temptation | imperative doorway not opened | no | no | canon |
| new lexis in integrations | Reject/do-not-chip | conversation decision | integration lessons add ~0 lexis (rhythm rule) | no | no | canon |

#### L7 — Je vais
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| je vais | Active now | shipped | moving engine (compact doorway, PR #167) | yes | yes | low |
| a la maison | Supported now | shipped | frozen destination package | yes | yes | low |
| je ne vais pas | Future/backlog | implied future doorway | composes je vais + ne ___ pas; never a clause chip | no | no | composition canon |
| tu vas / vous allez | Future/backlog | implied future doorway | needed later for tu y vas / vous y allez | no | no | register |
| on va | Reject/do-not-chip | rejected temptation | paradigm creep; on lives only in on y va | no | no | constraint 6 |
| au cafe / chez / a Paris | Future/backlog | implied future doorway | destination quarry; a+le contraction doorway | no | no | contraction system |
| je vais + infinitive (futur proche) | Reject/do-not-chip | rejected temptation | tense doorway; recognition at most | no | no | L7 spec |

#### L8 — C'est ou ?
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| c'est ou ? | Active now | shipped | frozen question, keeps its ? (PR #167) | yes | yes | low |
| ou | Supported now | shipped | adverb-ou-where, sense-suffixed id | yes | yes | low |
| c'est / ici | Carryover now | shipped / hygiene risk | ici again unregistered (R3) | yes | c'est yes, ici **no** | R3 |
| ou est + noun / tu vas ou | Future/backlog | implied future doorway | fuller where-frames from the L8 spec | no | no | med |
| la-bas / c'est la / a gauche / a droite | Future/backlog | implied future doorway | answer quarry | no | no | low |
| l'hotel / la gare / les toilettes | Future/backlog | implied future doorway | place nouns; need definite articles | no | no | articles |
| ou est-ce que / comment / quand / pourquoi | Reject/do-not-chip | rejected temptation | wrapper+question-word stack & question words; later band | no | no | canon |

#### L9 — Faire une pause
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| faire une pause | Active now | shipped | the pause slice IS the lesson (PR #167) | yes | yes | low |
| une pause | Supported now | shipped | noun behind the package | yes | yes (noun-pause) | low |
| je fais | Future/backlog | conversation decision | held at supported by spec; NOT active from L9 | no | no | PR #167 |
| faire ca / ca | Future/backlog | implied future doorway | needs ca; deferred with the slice | no | no | med |
| maintenant | Reject/do-not-chip | rejected temptation | from the rejected L9 variant; do not revive unless syllabus reopens | no | no | PR #167 |
| cafe-centric faire slice | Reject/do-not-chip | rejected temptation | rejected slice; pause slice is canon | no | no | PR #167 |
| broad faire (sport/weather/idiom) | Reject/do-not-chip | rejected temptation | split-sense guardrail | no | no | canon |

#### L10 — Une petite journee (integration)
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| (new lexis) | — | conversation decision | 0 new items; day-arc retrieval of L7-L9 | — | — | rhythm rule |
| vous pouvez + m'aider | Exposure/ghost now | conversation decision | recognition-only seed meet-card; split pieces highlighted separately (constraint 3) | no | yes | must not read as one chunk |
| L7-L9 + L1-L6 pool | Carryover now | shipped | the recombination quarry | yes | yes | low |
| je suis fatigue | Future/backlog | implied future doorway | spec's combo, waits on fatigue | no | no | low |
| Une petite journee (title) | — | conversation decision | approved natural title (replaced Un petit jour) | — | — | — |

#### L11 — Je peux
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| je peux | Active now | shipped + conversation decision | the permission engine; a real chip | yes | yes | low |
| ne ___ pas | Carryover now (frame) | conversation decision | composes the negative | yes | yes | low |
| je ne peux pas | Reject/do-not-chip | conversation decision | COMPOSED line only (constraint 2); lint forbidden-list pins it | no (never a chip) | **no** | chip pressure recurs per engine |
| vous pouvez | Supported now | shipped + conversation decision | request piece (split from the question) | yes | yes | low |
| aider | Supported now | shipped | reusable infinitive | yes | yes | low |
| m'aider | Supported now | shipped + conversation decision | frozen elision chunk; the object-pronoun SEED (constraint 4) | yes | yes | family deferred |
| vous pouvez m'aider ? | Reject/do-not-chip | conversation decision | composed question only (constraint 3) | no (never a chip) | **no** | keep split |
| intonation asks (je peux ... ?) | Supported now (production), comparison later | shipped | L11 asks by rising voice ONLY | yes | — | est-ce que deferred to L12 |
| t'aider / l'aider | Future/backlog | implied future doorway | the m'aider family, next doorway | no | no | one narrow lesson later |
| nous aider / vous aider / les aider | Future/backlog | implied future doorway | rest of the aider family | no | no | later still |
| donner / me donner / te donner / lui donner | Future/backlog | implied future doorway | the give+indirect-pronoun doorway m'aider prefigures | no | no | much later |
| nous donner / vous donner / leur donner | Future/backlog | implied future doorway | full indirect set | no | no | much later |
| full object-pronoun table (me/te/le/la/lui/leur) | Reject/do-not-chip (now) | rejected temptation | system lecture; seeds only | no | no | constraint 4 |
| moi aider | Reject/do-not-chip | rejected temptation | non-standard structure; never a learner model | no | no | canon |
| tu peux / on peut / je pourrais | Future or Reject | implied / rejected | persons later; conditionnel deferred | no | no | paradigm/paid-zone |

#### L12 — Est-ce que
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| est-ce que | Active now | shipped + conversation decision | THE wrapper target | yes | yes | low |
| est-ce que je peux ... / est-ce que vous pouvez ... | Supported now (composed lines) | conversation decision | wrapped productions, never chips | yes (composed) | no (as wholes) | fixture-layer ids stay out of house registry |
| intonation question forms | Exposure/ghost now (comparison copy) | conversation decision | valid French, but NOT accepted on wrapper-target screens (PR #169) | no | — | creep-back watch |
| qu'est-ce que | Reject/do-not-chip (now) | rejected temptation | trap-only; own doorway much later | no | no | canon |
| inversion (pouvez-vous ...) | Reject/do-not-chip | rejected temptation | blocked band-wide | no | no | canon |
| est-ce qu'il y a / est-ce que tu ... / n'est-ce pas | Future/backlog | implied future doorway | after il y a / tu material / register lesson | no | no | med |

#### L13 — Can-do, asked (integration)
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| (new lexis) | — | conversation decision | 0 new; chains L11+L12 over L7-L12 | — | — | rhythm rule |
| est-ce que + je peux / vous pouvez / m'aider / ne ___ pas / faire une pause / je vais / a la maison / s'il vous plait | Carryover now | shipped | the chained scene | yes | yes | low |
| je ne peux pas. je vais a la maison. | Supported now (composed line) | conversation decision | composed decline+exit; never a chip | yes (composed) | no | composition canon |
| j'y vais | Exposure/ghost now | shipped + conversation decision | recognition-only L14 seed meet-card | no | yes | must not leak to production in L13 |
| intonation alternatives | Exposure/ghost now (comparison) | conversation decision | sayit reveal copy only; wrapper-required weaves validate the wrapper (PR #169 fix) | no | — | policy line for L16+ |
| je ne comprends pas / vous pouvez repeter / c'est pas grave / d'accord / un moment | Future/backlog | implied future doorway | the repair pair + scene glue from the spec | no | no | repair slice unshipped |

#### L14 — J'y vais (y-light)
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| y | Active now | shipped + conversation decision | ONE sense: the place you named; sense-suffixed id | yes | yes | homograph guard |
| j'y vais | Active now (chunk), never a chip | conversation decision | chunk-first doorway (constraint 5); production composes je vais + y; recap anchors in prose | yes (as chunk) | yes | chip pressure = canon decision, not lint exemption |
| on y va | Active now (frozen formula) | conversation decision | frozen whole (constraint 6); weave hint chip only, never recap chip | yes (as formula) | yes | generalization pressure |
| je vais / a la maison / au revoir | Carryover now | shipped | antecedent + exit frame | yes | yes | low |
| tu y vas / vous y allez | Future/backlog | implied future doorway | need tu/vous aller forms first | no | no | register |
| je n'y vais pas | Future/backlog | conversation decision | NOT current y-light; arrives later as composed copy, never a clause chip | no | no | composition canon |
| il y a | Future/backlog | conversation decision | separate existential doorway; deliberately absent from L14 | no | no | conflation risk |
| j'y suis / j'y pense | Future or Reject (now) | implied / rejected | multi-verb y; recognition later at most | no | no | system creep |
| en | Future/backlog (trap-only now) | shipped + conversation decision | paid-zone pronoun; y/en contrast later | no | no | canon |
| je vais y | Reject/do-not-chip | rejected temptation | word-order error; trap material only | no | no | — |
| generalized on + y + verb (on y mange ...) | Reject/do-not-chip | rejected temptation | constraint 6; any extension is a new doorway | no | no | watchlist |
| je peux y aller / je dois y aller | Future/backlog | implied future doorway | y+modal chains; unstacked for now | no | no | both engines must settle |

#### L15 — Il faut
| Surface | Class | Source | Reason | Active now | Registry now | Risk |
|---|---|---|---|---|---|---|
| il faut | Active now | shipped + conversation decision | primary, impersonal, invariable (constraint 7) | yes | yes | il faut que leak |
| je dois | Supported now | shipped + conversation decision | one person-form, the je peux sibling | yes | yes | paradigm pressure |
| aller | Supported now | shipped + conversation decision | infinitive support ONLY; je vais stays the engine | yes | yes | closed infinitive set |
| il faut faire une pause / il faut aller ... / je dois aller ... | Supported now (composed lines) | conversation decision | model/expected sentences over owned pieces; never chips | yes (composed) | no (as wholes) | low |
| il faut que | Reject/do-not-chip | conversation decision | the number-one leak; TRAP-ONLY today (L15 s03) | no | no | subjunctive door stays shut |
| tu dois / on doit / vous devez | Future/backlog | implied future doorway | devoir persons, recognition-first later | no | no | paradigm |
| il ne faut pas | Future/backlog | implied future doorway | prohibition nuance (meaning shift vs je ne dois pas) | no | no | med |
| il faut + noun / il me faut | Future/backlog | implied future doorway | different sense; own doorway | no | no | sense split |
| je devrais / il faudrait | Reject/do-not-chip (now) | rejected temptation | advice register; deferred | no | no | tone drift |
| devoir = owe | Reject/do-not-chip (now) | rejected temptation | separate sense; sense-suffix if ever opened | no | no | homograph |
| il faut m'aider | Reject/do-not-chip | conversation decision | re-anchors m' outside its frozen chunk; deliberately avoided | no | no | constraint 4 |

### Reading the map

By L15 the discipline holds: 26 active registry items across fifteen lessons (1-3 active-new per teaching lesson, 0 in the three integrations), a supported layer of composition pieces, exposure used only for seeds and traps, and every dangerous temptation parked with a reason. The extended quarry above shows the restriction is NOT starving the syllabus — each doorway (object pronouns, y expansion, devoir persons, repair, service) has a named, ordered backlog waiting on prerequisites rather than an improvised widening of today's chips.
