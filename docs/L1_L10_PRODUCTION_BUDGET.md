# L1-L10 Production Budget and Gap Matrix

**Status:** live. Regenerate the CURRENT columns with `npm run budget:l1l10` from
`lemot-app/`. Measured at `e1fa45b`, 2026-09-06.

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
