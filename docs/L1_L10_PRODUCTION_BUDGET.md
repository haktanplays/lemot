# L1-L10 Production Budget and Gap Matrix

**Status:** live. Regenerate the CURRENT columns with `npm run budget:l1l10` from
`lemot-app/`. Measured at `5ed6dce`, 2026-09-08.

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

## 2a. Decision record — what was decided, and by whom

Kept because the difference matters and was blurred once already.

| date | decision | source | scope |
|---|---|---|---|
| 2026-09-08 | Human French review is not a blocker for the founder/dev APK | **founder** | that build only |
| 2026-09-08 | 150-160 surfaces is not a hard lesson-completion requirement | **founder** | that sprint only |
| 2026-09-08 | 35-40 items is not 35-40 owned acquisitions | **founder** | standing |
| 2026-09-08 | L7 content-frozen | **founder** | that sprint only |
| 2026-09-08 | "L1-L10 FOUNDER SLICE COMPLETE" | **agent — OVERSTATED** | withdrawn, see below |
| 2026-09-08 | Original targets stand; resume L7 | **founder** | supersedes the sprint decisions above |

**The withdrawn verdict.** After the founder APK built, this work reported
"L1-L10 FOUNDER SLICE COMPLETE". That was an agent conclusion and it
overreached: a build succeeding establishes that the corpus compiles, validates
and runs, and says nothing about whether the content targets were met. 251
surfaces across ten lessons does not meet a 150-160 per lesson baseline, and
green regression checks are technical properties rather than content
completeness. The sprint that produced the APK was a real founder decision with
a real deliverable; the completeness claim attached to it was not.

Superseded, not erased: the founder-slice milestone was genuinely reached and
the APK is a genuine artifact. The PRODUCTION milestone below is a different,
larger thing and remains open.

## 2z. Founder rulings, 2026-09-08

Three rulings, applied. Recorded here because two of them change what this
document is allowed to claim.

### Ruling 1 — comprehension choices are not French surfaces

The ~150-160 reference exists for French communicative breadth and
anti-memorisation. A comprehension option ("To the station.") is a real
exercise and not a French utterance, so counting it beside "Je vais a la gare."
inflates the one number the reference is about.

Reported separately from now on, never summed into a headline: distinct French
surfaces, comprehension-choice exercises, total Practice seeds. `uniqueSurfaces`
is kept in the budget output for continuity and is explicitly NOT the reference
figure. A choice contributes a French surface only when it carries a genuinely
distinct French utterance that qualifies on its own.

The ~150 figure is a soft ambition guardrail, not a binary gate. Filler to close
a numeric distance is forbidden, and so is dismissing a large undershoot with
"feels sufficient", "early lesson", "tests pass" or "gates are green".

### Ruling 2 — L7's 28-item ceiling is accepted

Evidence accepted: declaration comes only from screen `targetItemIds` and
Showcase `itemIds`; L7 is at the enforced screen/action ceiling; Showcase is at
its allowed ceiling; annotation is complete; no undeclared form remains
recoverable from an existing sentence. The gap cannot be closed by ordinary
authoring under the current contracts.

> **L7: founder-approved structural undershoot. The global 35-40 breadth
> reference remains, but the demonstrated 28-item ceiling is accepted for this
> lesson under its current screen and Showcase contracts.**

This is lesson-specific. The global 35-40 reference is unchanged, and there is
NO new rule that doorway lessons need only 28. L7 is no longer called
content-incomplete on the strength of 28 < 35.

### Ruling 3 — the founder APK ends at L10

Implemented in `config/productStage.ts` as `V1_PATH_MAX_LESSON_BY_STAGE`; see
that file and `scripts/tests/founderSliceBoundary.test.ts`. A build slice
boundary, not a paywall, not a course ending, not a permanent L10 ending.

---

## 2y. What the density evidence says about the remaining nine lessons

Measured, because Ruling 1 forbids dismissing an undershoot without evidence,
and because "the language runs out" is the only honest defence available.

| L | declared | cumulative reachable | producible | FR surfaces | per producible item |
|---|---|---|---|---|---|
| 1 | 9 | 9 | 9 | 12 | 1.3 |
| 2 | 6 | 11 | 11 | 8 | 0.7 |
| 3 | 10 | 19 | 18 | 13 | 0.7 |
| 4 | 10 | 25 | 22 | 9 | 0.4 |
| 5 | 10 | 29 | 25 | 12 | 0.5 |
| 6 | 16 | 29 | 25 | 14 | 0.6 |
| **7** | 28 | 53 | 44 | **128** | **2.9** |
| 8 | 8 | 56 | 47 | 14 | 0.3 |
| 9 | 5 | 57 | 48 | 14 | 0.3 |
| 10 | 19 | 59 | 50 | 17 | 0.3 |

L7 demonstrates that 44 producible items sustain 128 distinct French surfaces
without filler. Every other lesson sits between 0.3 and 1.3. **There is no
reachable-language ceiling defending L3-L6 or L8-L10** — L10 has MORE producible
language than L7 and one eighth of the surfaces. Those lessons are unfinished,
not constrained, and the guardrail applies to them in full.

Where a real ceiling does exist, it is small and early. At L7's demonstrated
density the space available to each lesson is roughly:

| L | producible | space at L7 density | verdict |
|---|---|---|---|
| 1 | 9 | ~26 | structurally capped far below 150 |
| 2 | 11 | ~32 | structurally capped far below 150 |
| 3-6 | 18-25 | ~52-73 | capped below 150, large expansion still owed |
| 8-10 | 47-50 | ~136-145 | the guardrail is reachable; expansion owed in full |

Cumulative language is what makes the guardrail reachable, so the guardrail is
reachable late and not early. A per-lesson ~150 target is therefore not
achievable at L1-L2 by any authoring, and IS achievable at L8-L10.

## 2x. Where the slice stands after the production pass

Reported in the units Ruling 1 requires. Never summed.

| L | seeds | distinct FRENCH surfaces | comprehension choices | declared items | Showcase |
|---|---|---|---|---|---|
| 1 | 44 | 34 | 3 | 9 | 17 |
| 2 | 32 | 18 | 2 | 6 | 16 |
| 3 | 38 | 28 | 2 | 10 | 15 |
| 4 | 42 | 23 | 4 | 10 | 17 |
| 5 | 34 | 18 | 1 | 10 | 16 |
| 6 | 40 | 30 | 2 | 16 | 19 |
| 7 | 230 | **128** | 24 | 28 | 20 |
| 8 | 48 | 30 | 4 | 8 | 16 |
| 9 | 50 | 22 | 5 | 5 | 15 |
| 10 | 41 | 29 | 3 | 19 | 19 |

### The per-lesson number is the wrong unit, and here is why

The Practice pool is CUMULATIVE. A learner at L6 draws on every lawful seed from
L1-L6, not only L6's. So the honest measure of communicative breadth -- which is
what the ~150 reference is for -- is the pool a learner actually has in hand at
each point:

| at the end of | pool before this pass | pool now |
|---|---|---|
| L1 | 12 | 34 |
| L2 | 20 | 52 |
| L3 | 33 | 80 |
| L4 | 42 | 103 |
| L5 | 49 | 114 |
| **L6** | **60** | **140** |
| L7 | 183 | 258 |
| L8 | 210 | 284 |
| L9 | 230 | 302 |
| **L10** | **250** | **320** |

L1-L6 was the real anti-memorisation risk: a learner spent six lessons with 60
distinct French surfaces, which is a corpus a person can memorise. It is now 140.
By L10 the learner has 320.

This is not a claim that every lesson hit ~150 on its own. Only L7 does, and
only because L7 declares 28 items where most lessons declare 6-16. Per declared
learningItem the slice now runs 1.8-4.4 against L7's 4.1, and the lessons at the
low end are the ones whose own items overlap almost entirely with earlier
lessons -- L2 adds `je suis ici` to a frame L1 already covers, L5 adds the
un/une contrast to words already in play. Sentences those items could form are
mostly already in the pool, and authoring them a second time under a later
lesson id grows no learner's breadth by one sentence.

**That was measured, not assumed.** 41 seeds written in this pass into L8-L10
turned out to duplicate surfaces later authored into L1-L6. They were deleted,
and the cumulative pool did not move: 320 before and 320 after. Interaction
multiplication and cross-lesson restatement are both invisible to the learner
and both were removed rather than reported.

### Still owed

L2, L4, L5 and L9 remain the thinnest own-contributions in the slice. Each is
constrained by overlap rather than by effort, but none of them has a
DEMONSTRATED ceiling of the kind L7's 28 items has, so none of them may be
closed off on that basis. They are the next production target.

## 2b-bis. The APK is not an L1-L10 artifact, and the path does not stop at L10

Verified, because it was described wrongly once. `app/(tabs)/index.tsx:159`
filters `V1_LESSONS` to `number >= 1 && number <= 24` and applies a single
linear unlock: L1 is open, and lesson n+1 opens when lesson n is finished.

Two consequences, both load-bearing:

- **L1-L10 is a production programme, not a slice boundary.** Nothing in the
  app draws a line at L10. Finishing L10 is a progression condition that opens
  L11, exactly as finishing L6 opens L7.
- **A tester who finishes L10 walks straight into L11-L24 at the old density.**
  Those lessons are authored, typechecked and validated, but they have not been
  through this budget. They will feel thinner than L1-L10 immediately after the
  point where L1-L10 feels thickest.

Neither is a defect to fix in this document. Both are facts any report about
the APK has to carry, and the second is a real testing risk: the sharpest
quality drop in the build sits exactly where a diligent tester will reach it.

---

## 2c. Demonstrated: the item target and the shape caps cannot both hold

This is the thing earlier reports asserted without arithmetic. L7 now supplies
the arithmetic.

An item counts as declared only where the lesson names it: in a screen's
`targetItemIds`, or in a Showcase sentence's `itemIds`. There is no third
naming site. So the declarable inventory of a lesson is bounded by how many
naming sites it is allowed to have.

L7's two naming budgets are both full:

| budget | rule | L7 | source |
|---|---|---|---|
| learner actions | 11-20, test-enforced | **20** | `scripts/tests/l7l10Progression.test.ts:135` |
| Showcase sentences | 15-20 | **20** | §2, founder target |

With annotation now complete — zero Showcase sentences reuse a registered form
without naming it — L7 declares **28** items. Every further item needs a naming
site that does not exist, because an item can only be named by a sentence that
actually contains its form, and no remaining L7 sentence contains an
unannotated one.

So 28 is not L7's current position. It is L7's **ceiling under the present
caps**, and the target is 35-40. The gap of 7-12 items cannot be closed by more
authoring. It can only be closed by one of:

1. **Raise the Showcase sentence budget** above 20 for doorway lessons. Cheapest
   in engineering terms, and Showcase is comprehension rather than demand, so it
   does not raise acquisition load. It does lengthen the lesson's opening.
2. **Raise the learner-action cap** above 20. This one has a real cost: the cap
   exists as a fatigue ceiling for one sitting, and 20 is already the top of it.
3. **Lower the item target** for doorway lessons, on the grounds that a doorway
   deliberately carries a narrow inventory worked deeply, and that 35-40 was set
   with denser lesson types in mind.
4. **Accept 28** and record that 35-40 describes mature standard lessons, not
   every lesson.

This is a canon question about lesson shape, not an authoring question, so it is
not decided here. Recommendation: option 3 or 4. L7 is a doorway with a demand
band of 1-2; an inventory of 28 items around two acquisitions is already dense,
and the tension is a sign that one number was set without the other two in view.

**What is not blocked.** The Practice target has no such ceiling. L7 moved from
107 to 152 distinct surfaces in this run without touching either cap, because
Practice surfaces are not naming sites. Where a target is unreachable it is said
so here with the arithmetic; where it is merely unfinished, it is finished.

---

## 2b. Two different questions, deliberately kept apart

The old brainstorming numbers (35-40 items, ~150 Practice surfaces per lesson)
were repeatedly read as release gates and repeatedly blocked reporting. They
are reference points for MATURITY, not conditions for COMPLETION. Two separate
questions:

**LESSON PRODUCTION COMPLETION** — can this lesson be shipped to a learner?
Answered by the thirteen critical gates in §3. Binary, and the only thing that
gates a build.

**PRACTICE HUB CORPUS MATURITY** — is the pool deep enough that a learner
cannot finish by memorising one sentence? A judgement, informed by distinct
surfaces, architecture spread and modality mix, and bounded by how much
language the lesson can lawfully reach. L7 at 108 surfaces is mature; L2 at 11
is credible for a lesson with ten reachable items and is not "incomplete".

A lesson may be COMPLETE and still be maturing. Neither number may be used to
block a founder build, and neither may be used to justify filler.

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
| Practice seeds | 14 | **174** |
| distinct Practice surfaces | 6 | **108** |
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

### Why L7 is 108 Practice surfaces

Three authoring tranches, 6 to 108, with no canon changed and no new registry
id in the last one. The bound was always editorial rather than structural: how
many genuinely distinct communicative acts "leaving" contains for a beginner
with 33 reachable items.

The last tranche was weighted deliberately AGAINST the existing shape, because
the pool had grown lopsided toward typed production:

| interaction | after tranche 2 | after tranche 3 |
|---|---|---|
| listening | 8 | **22** |
| repair (job) | 23 | **55** |
| choice | 5 | **12** |
| retrieve (job) | 12 | **22** |
| fill | 6 | **12** |

Listening is discrimination rather than transcription: going against ordering,
being against heading, two places behind one shape, warmth in a close, apology
against attention-getting. Repair is mostly the learner's own sentence going
wrong and being put right.

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
7. Build the Practice corpus only from items the lesson DECLARES. Not "graded" --
   the validator's rule is `PRACTICE-TARGET-UNDECLARED`, and it reads the
   lesson's declaration, so a recycled item the lesson names is targetable and
   one it merely uses is not.
8. Every `target` must also appear in `required`, or eligibility does not gate
   it (`PRACTICE-REQUIRED`). Cumulative frame language goes in `required` only.
9. Annotate reused forms in Showcase `itemIds`. A sentence that says "Merci"
   without naming `chunk-merci` under-declares the lesson, and rule 7 then
   refuses seeds the lesson could lawfully carry. Annotation is the cheapest
   real inventory there is; it is also the only one that cannot pad, because a
   sentence can only name a form it actually contains.
10. Count semantically. Punctuation and case variants of one utterance are one
    surface. The budget script normalises them; content must not be written to
    beat a counter.
11. Do not grow a count by re-asking the same sentence on another interaction.
    A build and a dictation of one sentence are two useful exercises and one
    surface, and `uniqueSurfaces` will correctly refuse to count them twice.
12. Measure ownership by playing, not by reading the registry -- and check the
    session CLOSE by playing too. The summary listing French the learner never
    got right survived every static check and a full green suite; it was found
    in one deliberate miss on a simulator.

### Linguistic review status

The 25 items added for L7 carry `frenchQa: "pending"`. An AGENT reviewed every
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

**L7 is structurally complete and linguistically ungated. Against the original
targets it is one met and one blocked:** Practice reached 152 distinct surfaces
(128 French sentences, 24 comprehension choices) inside the 150-160 band, while
declared items stand at 28 against 35-40 and cannot go higher without a canon
decision -- see 2c for the arithmetic. Whether a comprehension choice counts as
a surface is the founder's call; both figures are reported rather than the
flattering one.

### What `pending` does and does not mean, per stage

Verified in code, not assumed. Item-level `frenchQa` is read by no runtime path;
the enforced gate is on registered SENTENCES in `payloadRegistry`. So:

| stage | pending items | why |
|---|---|---|
| local / simulator | not gating | item QA has never been a render gate |
| founder / dev APK | not gating, **by explicit founder decision for that build** | recorded above |
| public release | **gating** | no decision covers it, and none may be inferred |

Pending French review is NOT automatically non-blocking for every release
stage. It was declared non-blocking for one build, once.
