# L1-L10 Production Budget and Gap Matrix

**Status:** live. Regenerate the CURRENT columns with `npm run budget:l1l10` from
`lemot-app/`. Measured at `ed9ef9d`, 2026-09-07.

This file is the definition of what "100% complete" means for the first ten
lessons, and the honest distance between that definition and the product today.

Four columns, never blurred:

| column | meaning |
|---|---|
| **FOUNDER TARGET** | what the founder has asked the finished product to be. Not a claim about the corpus. |
| **CURRENT CANON** | what shipped canon and its locks already fix. Changing these needs a founder decision. |
| **CURRENT IMPL** | what the code measurably contains today. |
| **GAP** | target minus implementation. |

---

## 1. The counting taxonomy

Content counts inflate silently unless the layers stay apart. They are:

| layer | example | counts as |
|---|---|---|
| **A. Language item** | `chunk-je-voudrais` | one item |
| **B. Sentence / surface** | `Je voudrais un café.` | one surface |
| **C. Version** | `Je voudrais un thé.` | a version of B, NOT a new architecture |
| **D. Combination / moment** | `Bonjour, je suis ici. Je voudrais un café.` | one surface, built from owned parts |
| **E. Exercise seed** | `p-l1-produce-order-coffee` | one seed |
| **F. Exercise instance** | that seed rendered in today's session | not content |

`Je voudrais un café.` heard, dictated, built, chosen and typed is **one
surface through five operations**, never five surfaces. The Practice pool today
holds 143 seeds over **78 distinct surfaces**; reporting 143 would overstate the
corpus by 83%.

---

## 2. Budgets

Derived from pedagogical role, existing architecture, current density, founder
targets, learner fatigue, and the variation needed to avoid repetition.

| category | FOUNDER TARGET | rationale |
|---|---|---|
| Language items / lesson | **35-40** | founder decision |
| Showcase sentences / lesson | **15-20** | founder decision; breadth, not syllabus |
| Practice surfaces / lesson | **150-160** | founder decision; mastery needs a corpus a learner cannot memorise |
| Pedagogical pages / lesson | **10-14** | measured band; first competence, not mastery |
| Learner actions / lesson | **8-14** | fatigue ceiling at one sitting |
| ActivityChains / lesson | **2-5** | a page is one thought with 2-4 connected actions |
| Weave tiers / lesson | **>= 2, reaching context or open** | see §4 |
| Meaningful production / lesson | **>= 1 say-it** | the payoff must be production |
| Insight cards / lesson | **2-4** | rich product, not trivia; quality rule below |
| Practice seeds / lesson | **60-80** | ~2 operations per surface at target breadth |
| Practice scenes / lesson | **1-3** | later lessons should afford more than L1 |
| Mon Lexique eligible reachable | **100%** | hard gate |
| Practice CORE coverage | **100%** | hard gate |

**Insight card quality rule.** Cards are not typed to a quota. A lesson may
carry two pronunciation notes and no faux ami; another may carry a register
note and a contrast. Faux amis are written only where a real high-value false
friend meets the lesson's language. Zero is a valid answer. Filler is not.

---

## 3. Definition of 100%

A lesson is complete when **all thirteen critical gates hold** AND content
density meets budget. Abundance never substitutes for a gate.

| # | gate |
|---|---|
| 1 | every declared language item resolves in the registry |
| 2 | Showcase within 15-20 sentences |
| 3 | Showcase carries core and exposure roles |
| 4 | lesson arc complete: showcase, work, production, recap |
| 5 | Weave ladder: >= 2 tiers, reaching context or open |
| 6 | at least one meaningful open production |
| 7 | payoff present: production followed by recap |
| 8 | 100% of eligible Mon Lexique inventory reachable |
| 9 | 100% of practisable CORE inventory has a lawful mastery path |
| 10 | Practice offers listening |
| 11 | Practice offers dictation |
| 12 | Practice offers reconstruction |
| 13 | at least two insight cards |

Score is reported as **gates (n/13) + density (%)**, never averaged together.
A lesson at 160 surfaces with a broken Mon Lexique is incomplete.

---

## 4. The Weave contract (locked)

| tier | learner is given | prompt shape |
|---|---|---|
| `supported` | the exact meaning in English, **or** constitutive pieces visible from first render | "Write it in French: X" |
| `mid` | the communicative intention | "Tell them you are not there." |
| `context` | the situation | scene only; learner decides what to say and how |
| `open` | the situation, and no pieces | scene only |

Guarded by `scripts/tests/weaveScaffoldContract.test.ts`.

Two canon rules constrain this and both stay:
- **Translation prompts may not appear after L6** (`corpusClosure`). Beginner
  translation is legitimate and must not still be how the path asks for French
  once the learner owns enough to be handed a situation.
- **L7-L10 tier sequences are pinned** by the founder-usable pass. They are
  identity, not preference.

Consequence, recorded as accepted debt: L8, L9 and L10 have weaves whose prompt
states an intention while the tier says `context`. There is no lawful easy rung
to add there, and the pin forbids re-tiering. Their ladder is context to open,
which is a real progression.

---

## 5. Master matrix

TARGET / CURRENT / GAP. `own` = owned language items, `shw` = Showcase
sentences, `surf` = distinct Practice surfaces, `lex` = Mon Lexique
reachable/eligible.

| L | own /35 | shw /15 | pages | actions | chains | E/M/C/O | insight | lex | seeds | surf /150 | scenes | gates | density |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 6 (-29) | 17 ok | 11 | 9 | 3 | 3/1/1/1 | 2 | 6/6 | 16 | 13 (-137) | 1 | 13/13 | 42% |
| 2 | 5 (-30) | 16 ok | 12 | 10 | 3 | 2/0/2/1 | 3 | 5/5 | 14 | 6 (-144) | 0 | 13/13 | 39% |
| 3 | 7 (-28) | 15 ok | 12 | 10 | 3 | 0/3/1/2 | 3 | 7/7 | 14 | 9 (-141) | 0 | 13/13 | 42% |
| 4 | 7 (-28) | 17 ok | 13 | 9 | 2 | 0/1/1/2 | 3 | 7/7 | 14 | 6 (-144) | 0 | 13/13 | 41% |
| 5 | 5 (-30) | 16 ok | 13 | 10 | 2 | 0/2/0/2 | 2 | 5/5 | 14 | 6 (-144) | 0 | 13/13 | 39% |
| 6 | 12 (-23) | 19 ok | 11 | 11 | 4 | 0/2/1/2 | 2 | 12/12 | 15 | 10 (-140) | 0 | 13/13 | 47% |
| 7 | 2 (-33) | 16 ok | 10 | 9 | 2 | 0/1/1/2 | 3 | 2/2 | 14 | 6 (-144) | 1 | 13/13 | 37% |
| 8 | 5 (-30) | 16 ok | 12 | 13 | 5 | 0/0/3/3 | 2 | 5/5 | 15 | 8 (-142) | 0 | 13/13 | 40% |
| 9 | 5 (-30) | 15 ok | 12 | 9 | 2 | 0/0/1/3 | 3 | 5/5 | 14 | 5 (-145) | 1 | 13/13 | 39% |
| 10 | 8 (-27) | 19 ok | 12 | 8 | 3 | 0/0/1/3 | 2 | 8/8 | 13 | 9 (-141) | 1 | 13/13 | 43% |

**Read this as: the machine is finished, the corpus is not.**

- Every critical gate holds on every lesson.
- Showcase is the one category already at budget.
- Language inventory is at ~18% of budget (62 owned across ten lessons, 23 distinct).
- Practice surfaces are at ~5% of budget (78 across ten lessons).
- 6 of 10 lessons have no micro-moment scene of their own.

---

## 6. Practice surface production model

The 150-160 target implies ~1,500 surfaces across L1-L10. That number must not
be reached by generation. Every surface comes from one of seven lawful sources,
and its source is recorded so counts stay honest:

1. **core sentence** — a new architecture the lesson teaches
2. **lexical version** — same architecture, owned payload swapped (`café` / `thé`)
3. **cumulative combination** — two owned surfaces joined into one moment
4. **communicative wrapper** — an owned surface inside an owned opener or closer
5. **context change** — the same utterance where the situation changes what it does
6. **short exchange** — a reply to an owned French line
7. **repair moment** — the same language after something went wrong

Hard rules for every generated surface:
- no form the learner has not reached by that lesson
- no exposure-only material as a required answer
- no answer leakage from the prompt
- natural French a person would actually say
- versions reported as versions, never as new architectures

---

## 7. Remaining gap to 100%, per lesson

Ordered by production value.

| priority | work | lessons | size |
|---|---|---|---|
| 1 | Practice surface expansion to 150-160 | all ten | ~1,420 surfaces |
| 2 | language inventory to 35-40 | all ten, worst L7 (2) and L2/L5 (5) | ~290 items |
| 3 | a micro-moment scene per lesson | L2, L3, L4, L5, L6, L8 | 6 scenes |
| 4 | insight cards to 3-4 where thin | L1, L5, L6, L8, L10 | ~8 cards |
| 5 | typed insight-card taxonomy | all ten | all 25 cards are `unspecified` |

Not debt: Showcase, Mon Lexique, Practice CORE coverage, lesson arc, payoff,
evidence, Journey integration.


---

## 8. L7 production pass — what a completed lesson costs

L7 was the first lesson taken through a full production pass. Its numbers, and
the four rules that decided them, are the repeatable method.

| | before | after |
|---|---|---|
| declared language items | 9 | **31** |
| owned (active, independent-production channel) | 2 | **3** |
| Showcase sentences | 16 | **20** (7 core / 11 supported / 2 exposure) |
| pages / actions | 10 / 9 | **12 / 13** |
| weave ladder | mid, context, open, open | **supported, mid, context, mid, mid, open, open** |
| Practice seeds | 14 | **105** |
| distinct Practice surfaces | 6 | **68** |
| Mon Lexique eligible reachable | 2/2 | **3/3** |
| unservable seeds | 0 | **0** |

### The four rules that cap a lesson

These are not obstacles to route around. Each one refused a version of this
pass, and each was right.

**1. The demand band caps NEW OWNERSHIP, not vocabulary.**
`acquisitionDemandItemIds` counts "distinct NEW learner-facing active
production demands" and explicitly excludes supported-only use,
recognition-only exposure, recycling and carryover. A `doorway` may declare 1-2;
`standard` 1-4; `integration` 0. L7 declares 2. This is why owned inventory is
3 and not 25, and it is a cognitive-load rule rather than bookkeeping.

**2. Registry `status` is the evidence gate, and ownership is measured at
runtime.** An item whose treatment resolves to `supported` records production
in the SUPPORTED channel however unsupported the learner's attempt was.
Measured after a clean L1-L7 play with the hint never opened: five of six new
items reach Mon Lexique with `stretch` eligibility. They are learner-owned in
the product sense. `chunk-a-la-gare` is `hidden` because it appears only in a
recognition fill — recognition grants no ownership, and that contract holds.

**3. A lesson is 11-20 screens.** The Content Bible band is a fatigue rule.
L7 had 16 and took 4 more. Ten were authored first and did not fit.

**4. Practice gates ITEMS, not sentences.** `seedIsLawfulFor` is exactly
`seed.requiredItemIds.every((id) => reachedItems.has(id))`. A seed may compose
ANY utterance from items the learner owns; nothing requires the sentence to be
one the lesson showed. L7's reachable base is 33 items, and its seeds may
target the 12 the lesson declares while using the rest as `required` frame.

An earlier version of this document read rule 4 as an exact-sentence rule and
reported 26 surfaces as near L7's ceiling. That was an invented constraint. Re-
reading the code took the pool from 26 to 49 with no contract change.

### Why L7 is 68 Practice surfaces and not 150

Not a cap — a distance. The bound is editorial: how many genuinely distinct
communicative acts "leaving" contains for a beginner with 33 reachable items.
68 are authored, up from 6. More are reachable and the next tranche is ordinary
authoring work rather than a blocked target. What would NOT count is the same
utterance per interaction type, or a word swapped for its own sake.

### The three units that are not interchangeable

Reported separately, because conflating them is how a thin lesson looks
finished:

| unit | L7 | what it means |
|---|---|---|
| declared meaningful items | **31** | the lesson names them and can state a treatment |
| items taught in the body | **10** | a screen actually asks for them |
| available for supported production | **10** | a weave supplies the piece |
| demonstrated by independent production | **2** | the declared acquisition demands |
| registry-active among declared | **5** | the independent-production channel is open |
| owned / Lexique-eligible after a clean play | **3 of 3** | measured at runtime |

Showcase exposure is none of these. Nineteen declared items are shown and never
worked, which the readiness matrix now records as its fourth verdict,
**EXPOSURE**: a real surface a lesson shows and does not teach. It asserts the
negative — an exposure item must not resolve to a production source, and no
seed may require it — so Practice can never silently demand independent
production of language that was only ever exposed.

### Why declared stops near 31, verified in code

Not the demand band. The chain is:

1. A Practice seed is lawful only if every `requiredItemIds` entry is REACHED.
2. Reached means `seenCount > 0` or a claim, i.e. mastery evidence.
3. Evidence comes from a graded screen, or from `recordExposure` — which is
   wired for **meet-cards only**.
4. The Showcase emits no evidence at all.
5. Both meet-cards and graded screens are SCREENS, and L7 is at 20/20.

So every additional item L7 could teach costs a screen it does not have, and
every additional item it merely SHOWS costs a Showcase sentence, which is at
20/20 against the 15-20 target. Declared items are bounded by Showcase capacity
times item density, currently 1.55 items per sentence.

### The authoring method, in order

1. Read the demand band for the lesson's `journeyRole`. That is the ownership budget.
2. Author the Showcase as the language WORLD: 15-20 sentences, roles honest.
3. Choose what the lesson body can work inside 11-20 screens. Everything else is exposure.
4. Declare in `learningItems` exactly what the lesson works — an undeclared target throws at runtime.
5. Give supported material a piece, or the Hub cannot reuse the screen without upgrading it.
6. Add each new id through `npm run manifest:add`.
7. Build the Practice corpus only from items the lesson graded.
8. Keep cumulative language in `required`, never in `targets`.
9. Measure ownership by playing, not by reading the registry.

### Linguistic review status

The 20 items added for L7 carry `frenchQa: "pending"`. An AGENT reviewed every
surface and found one defect, since fixed; agent review is provisional evidence
and is not human review, so nothing was promoted. No named human has read this
French and no founder waiver was recorded, so neither `approved` nor
`founder_waived_provisional` would be true.

**What `pending` actually gates, verified in code.** Registered SENTENCES are
enforced: `payloadRegistry` refuses a payload whose sentence is pending. Registry
ITEMS are not — no runtime path reads item-level `frenchQa`. So an unreviewed
item still renders, which is development preview and NOT release clearance.
`scripts/tests/frenchQaGate.test.ts` pins this boundary so it stops being
invisible. Turning item QA into a release gate is a founder decision about the
release path, not an authoring change.

**L7 is structurally complete and linguistically ungated.**
