> **Repo import note (2026-07-02, cloud session).** Imported verbatim from the
> operator's master copy; content unchanged apart from this banner, four
> one-line pointers (§9.3, §9.4, §10.4, §49.5), and the appended §65 Lexique
> Memory v0.1 numeric contract (Faz 4A, operator-approved 2026-07-02). Reading
> guide for agents: §48–§64 are the v1.0 layer and win over the v0.3 addendum
> (§31–§47) wherever they conflict; §47 is explicitly superseded by §64. The
> v0.1 Cairn docs (`CAIRN_PRODUCT_DEFINITION_v0.1.md`,
> `CAIRN_PRODUCT_SYSTEM_MAP_v0.1.md`) are superseded by this document. This
> spec is product/build intent; for anything being built now,
> `docs/DEV_APK_MVP_CANON.md` + `docs/STATUS.md` still win (§64 source-of-truth
> sequence). Execution order lives in `docs/CAIRN_ROADMAP_202607.md`.

# Cairn / Le Mot — Full App One-Shot Build Spec v1.0

**Status:** v1.0 full-app master implementation brief / one-shot build context / product-canon synthesis.  
**Date:** 2026-07-01
**Version:** v1.0 — full+full app spec; supersedes v0.1/v0.2/v0.3 synthesis docs.  
**Audience:** GPT-5.6 Sol / Claude / Codex-class implementation agent.  
**Project:** Cairn / Le Mot — beginner French learning app.  
**Primary goal:** give an implementation agent enough product, pedagogy, app-shell, navigation, data-model, persistence, engine, validator, lesson, exercise, syllabus, telemetry, design, QA, and rollout detail to build the complete Cairn app shape without drifting into a phrasebook, grammar textbook, flashcard app, or uncontrolled AI parser.

> This document is intentionally over-specified. It is not a short canon note. It is the full “build the app in the right shape” map: what the app is, what the learning objects are, how memory works, how exercises measure learning, how content is authored, how errors are handled, how AI is constrained, how L1–L6 currently map, what not to touch, and how to ship safely.


> **v1.0 promise:** this document is meant to reconstruct the app in the product owner’s head as faithfully as possible from the Cairn / Le Mot conversations: learning philosophy, chips, Mon Lexique, micro-lessons, filters, popups, exercise contracts, engines, app shell, persistence, telemetry, design, roadmap, 180-lesson syllabus map, workflow, and hard deferred boundaries. It is intentionally redundant where redundancy prevents drift.

> **Important scope interpretation:** “complete app” means a complete, coherent app architecture and build target with L0–L6 current live content, full Mon Lexique architecture, engine contracts, validators, QA rules, and a 180-lesson syllabus roadmap. It does **not** mean uncontrolled one-shot hallucination of 180 fully authored lessons, runtime AI grammar facts, or future-only systems such as auto chunk parsing and commute mode. Those are recorded as future modules with contracts.

---

## 0. How to use this document as a one-shot prompt

Give the implementation agent this document and instruct it:

```text
You are implementing Cairn / Le Mot from this spec.
Read the entire document before editing.
Do not reinterpret the pedagogy as a phrasebook, Duolingo clone, grammar textbook, or flashcard-only app.
Implement the smallest coherent vertical slice first.
Preserve all canon distinctions.
When unsure, choose deterministic data + validator over AI freedom.
Do not invent grammar explanations unless backed by approved facts/maps.
Do not merge or ship broad changes without validation.
```

If working in the **existing repo**, the agent must first inspect current files and preserve existing architecture. It must not replace the app wholesale.  
If working in a **blank repo**, the agent should build the app around the data models, screens, engines, and tests described here.

---

## 1. Executive product definition

Cairn teaches French through reusable language pieces (“chips”), personal memory, tiny context-rich lessons, and delayed micro-logic.

North-star:

```text
Cairn teaches usable chunks first,
lets the learner use them inside real intent,
reveals logic after contact,
and uses memory state to decide what returns, when, and why.
```

Most important canon lines:

```text
Chip = reusable building block, not sentence memorization.
Whole first → use → notice → unpack → reuse.
Use first. Understand deeply. Return stronger.
No grammar dump before contact.
Lesson chip surface ≠ carryover selection ≠ flashcard review.
Mon Lexique UI ≠ Lexique Memory ≠ Carryover Selector.
Model answer ≠ UI chip.
Sentence ≠ chip.
Old chip may return; old lesson sentence should not mechanically return.
Recycle cannot steal the lesson.
The learned graph grows; the active carryover window rolls.
```

The app should behave like a careful human curriculum writer:

```text
Lesson authoring says: what is today’s main target?
Lexique Memory says: which old chips are worth resurfacing?
Sentence Builder says: how do we combine them naturally?
Validator says: did the target stay dominant, or did recycle/exposure steal the lesson?
```

---

## 2. Hard product boundaries

### 2.1 Cairn is not

```text
- a phrasebook list
- a direct translation drill engine
- a pure flashcard app
- a grammar textbook before contact
- a sentence memorization machine
- an uncontrolled AI grammar explainer
- a “more chips always better” system
- an app that requires perfect native production from beginners
```

### 2.2 Cairn is

```text
- a guided beginner language app
- a chip-based memory flow
- a context-first curriculum
- a “try with what you know” product
- a neutral-compare learning loop
- a system that separates exposure from ownership
- a system that makes logic visible only when useful
```

### 2.3 Learner feeling

The learner should feel:

```text
“I can say something real now.”
“I recognize pieces returning.”
“I can leave unknown words in English and still learn.”
“The app shows me why something happened after I encounter it.”
“I am not punished for partial attempts.”
```

The learner should not feel:

```text
“I am memorizing whole sentences blindly.”
“I am being tested on words I was only exposed to.”
“Every screen is just translate-this.”
“The app keeps dumping old words on me.”
“The grammar is disconnected from use.”
```

---

## 3. Current repo reality / implementation baseline

The current project has two layers.

### 3.1 Live v1 lesson system

This is the current app path for early lessons:

```text
lemot-app/content/lessons/v1/lesson-001.ts ... lesson-006.ts
lemot-app/content/itemRegistry.ts
lemot-app/content/lessonTypes.ts
lemot-app/components/lesson-v1/*
```

Current behavior:

```text
manually authored lesson screens
manual highlights
manual suggestedPieces
manual targetItemIds
manual piecesUsed recap strings
expected answer / compare behavior
recap chip display
```

Not currently implemented in live path:

```text
Lexique Memory Selector
active carryover window
automatic recycle selection
micro-logic engine
exposurePieces field
structured mainPieces field
sentence builder
pedagogical chunk segmenter
flashcard scheduler
```

### 3.2 Learning-engine / planning system

The richer planning vocabulary exists separately:

```text
RawItem
LessonContract
activeNew / supported / recognitionOnly / recycled
allowedProduction / blockedProduction
MasterySnapshot
Mon Lexique selector / projection
```

This is not yet the active renderer path for L1–L6.

### 3.3 Implementation implication

Do not rewrite everything. Build in this order:

```text
1. Canon + docs.
2. Content/data cleanup.
3. Tiny Weave v2 experiment.
4. Manual micro-logic pilot.
5. Structured fields later.
6. Lexique Memory / Carryover Selector later.
7. Sentence Builder + Validator later.
8. Pedagogical Chunk Segmenter later, deterministic-first.
```

---

## 4. Core learning loop

Every meaningful lesson moment should fit this loop:

```text
1. Contact: learner sees or hears a meaningful piece in context.
2. Use: learner tries to use known French pieces.
3. Compare: learner sees natural model answer.
4. Notice: app points to one useful detail if needed.
5. Unpack: app opens a chunk only after the learner has a reason.
6. Reuse: the piece returns later as anchor, refresher, contrast, or context tool.
```

Example:

```text
Contact: Je voudrais de l'eau.
Use: learner tries “je voudrais water”.
Compare: Je voudrais de l'eau.
Notice: French often asks for “some water”: de l'eau.
Unpack later: de l'eau → pas d'eau after pas.
Reuse later: Je ne voudrais pas d'eau maintenant.
```

---

## 5. Glossary / vocabulary

| Term | Definition | Example | Implementation note |
|---|---|---|---|
| Chip | Reusable learning unit | `je voudrais` | Core unit of registry/memory/UI. |
| Accounting chip | Internal tracked unit | `item:je-voudrais` | May be invisible. |
| UI chip | Visible learner pill | `je voudrais` | Must be capped and useful. |
| Inline highlight | Span in text | `Je voudrais` in model | Not automatically a UI chip. |
| Model answer | Natural sentence/response | `Je voudrais un café.` | Full sentence allowed here. |
| Spine chip | Lesson load-bearing unit | `je suis`, `j'ai`, `je voudrais` | Usually active production. |
| Active chip | Expected production target | `j'ai` in L4 | Counted in `piecesUsed` if used. |
| Recognition/passive chip | Seen/understood, not produced | `oui` in L3 | Not in active recap. |
| Ghost/exposure chip | New natural item in model | `pour parler` | Not required for correctness. |
| Carryover chip | Old chip reused in lesson | `bonjour` later | Selected by context/memory. |
| Pattern chip | Slot/frame | `ne ___ pas` | Can be tracked. |
| Formula chunk | Multi-word social/discourse function | `s'il vous plaît` | Learned whole first. |
| Noun/package chip | Natural object/package | `un café`, `de l'eau` | Often kept whole. |
| Unpackable chunk | Whole-first, later explained | `s'il vous plaît` | Has approved unpack map. |
| Main pieces | Lesson’s central pieces | future `mainPieces` | Structured later; currently body prose. |
| Pieces used | Active recap pieces | `j'ai`, `faim` | No full sentences. |
| Exposure pieces | Seen-not-owned pieces | `pour`, `parler` | Future field. |
| Mon Lexique UI | Learner-safe projection | “known / needs practice” | No raw internals. |
| Lexique Memory | Internal chip state | strength, decay, context | Source for selectors. |
| Carryover Selector | Chooses old chips for lessons | shortlist | Not flashcards. |
| Flashcard Scheduler | Explicit review queue | review cards | Separate system. |
| Sentence Builder | Composes examples | target + recycle | Future engine. |
| Validator | Checks content quality | no sentence-chip regression | Future gate. |
| Pedagogical Chunk Segmenter | Splits sentences by learning purpose | `[Je voudrais] [un café]` | Deterministic-first. |

---

## 6. Chip taxonomy

### 6.1 Surface/layer distinction

A language form can appear in multiple layers:

| Layer | Purpose | Allowed content | Example | Rule |
|---|---|---|---|---|
| Accounting chip | Mastery/lifecycle tracking | atoms, chunks, packages, patterns | `item:je-voudrais` | Can be invisible. |
| UI chip | Learner-facing pill | selected useful pieces | `je voudrais` | No full sentence/clause chips. |
| Inline highlight | Span in a sentence | any span tied to itemId/text | `Je voudrais` | Not automatically UI chip. |
| Model answer | Natural response | full sentence allowed | `Je voudrais un café.` | Model sentence is not automatically a chip. |
| Micro-logic object | Explanation target | contrast/unpack | `de l'eau → pas d'eau` | Does not add active mastery alone. |

### 6.2 Hard chip rules

```text
No full sentence chips as primary UI chips.
No full multi-clause chips as primary UI chips.
Model answers may contain full natural sentences.
Formula chunks are allowed if splitting early hurts use.
Noun packages are allowed if retrieved as a natural object.
Pattern chips are allowed.
Ghost/exposure chips are not active production responsibilities.
Bare atoms are not automatically forbidden.
```

### 6.3 Atom correction

Do not blindly ban atoms like:

```text
je
pas
ce
pour
avec
ici
là
```

They may be useful as accounting chips, contrast objects, unpack objects, inline highlights, or small utility UI chips. But they must not become noisy high-prominence chips by default.

### 6.4 Classification examples

| Surface | Verdict | Type | Notes |
|---|---:|---|---|
| `bonjour` | ✅ | formula | Greeting. |
| `merci` | ✅ | formula | Closing/thanks. |
| `je voudrais` | ✅ | spine | Request frame. |
| `s'il vous plaît` | ✅ | formula / unpackable | Whole first; later unpack. |
| `au revoir` | ✅ | formula / unpackable | Whole first. |
| `non merci` | ✅ | formula | Refusal chunk. |
| `un café` | ✅ | noun/package | Natural object. |
| `une question` | ✅ | noun/package | Natural object. |
| `de l'eau` | ✅ | noun/partitive package | Whole first; later contrast. |
| `pas d'eau` | ✅/⚠️ | contrast/package | Depends lesson. |
| `je suis` | ✅ | spine | Incomplete frame, not sentence. |
| `j'ai` | ✅ | spine | Incomplete frame, not sentence. |
| `je ne suis pas` | ✅/⚠️ | negative frame | Allowed if owned as frame. |
| `ce n'est pas` | ✅/⚠️ | negative frame | Allowed if owned as frame. |
| `ne ___ pas` | ✅ | pattern | Productive pattern. |
| `pas` | ⚠️ | atom | Useful but not always UI. |
| `ici` | ⚠️ | atom/location | Legitimate chip, can be tracked. |
| `faim` | ⚠️ | noun/state atom | Legitimate chip if tracked. |
| `je suis ici` | ❌ | sentence | Model answer only; not primary UI chip. |
| `j'ai faim` | ❌/⚠️ | composed phrase | Avoid primary UI chip if `j'ai` + `faim` can carry. |
| `j'ai une question` | ❌ | sentence/clause | Model answer only. |
| `je ne suis pas ici` | ❌ | sentence | Model answer only. |
| `ce n'est pas pour moi` | ❌ | clause | Model answer only. |
| `un petit moment` | ⚠️ | expression/package | Possible, not automatic L6 active spine. |
| `merci beaucoup` | ✅ | formula | Can be exposure/active later. |
| `bonne journée` | ✅ | formula | Closing formula. |
| `en fait` | ✅ | discourse chunk | Whole first. |
| `en vrai` | ✅ | discourse chunk | Whole first. |
| `pour le moment` | ✅ | discourse chunk | Whole first. |
| `en ce moment` | ✅ | discourse chunk | Whole first. |
| `de toute façon` | ✅ | discourse chunk | Whole first. |

---

## 7. Whole-first / unpack-later chunks

### 7.1 Principle

```text
A chunk can be retrieved whole before it is understood internally.
```

This is the app’s anti-overload rule. Useful chunks come first; internal grammar comes later.

### 7.2 Example: `s'il vous plaît`

Early presentation:

```text
s'il vous plaît = please
Use it as one polite piece.
```

Surface unpack later:

```text
s'il vous plaît → [s'il] [vous] [plaît]
```

Deep unpack later:

```text
s'il vous plaît = si + il + vous + plaît
si + il → s'il
literal: if it pleases you
real use: please
```

Do not force a beginner to learn `plaire` conjugation in L1.

### 7.3 Approved unpack examples

| Whole chunk | Retrieval mode | Surface unpack | Deep unpack | Micro-logic note |
|---|---|---|---|---|
| `s'il vous plaît` | `[s'il vous plaît]` | `[s'il] [vous] [plaît]` | `[si] [il] [vous] [plaît]` | `si + il → s'il` |
| `au revoir` | `[au revoir]` | `[au] [revoir]` | `[à/le?] [revoir]` only if approved | “to see again” later. |
| `de l'eau` | `[de l'eau]` | `[de] [l'] [eau]` | approved partitive path | “some water.” |
| `pas d'eau` | `[pas d'eau]` or `[pas] [d'eau]` | `[pas] [d'] [eau]` | contrast with `de l'eau` | After `pas`, often `de/d'`. |
| `pour le moment` | `[pour le moment]` | `[pour] [le] [moment]` | later | Discourse chunk. |

---

## 8. Micro-Logic / Chunk Unpack Interludes

### 8.1 Purpose

Cairn should not hide grammar. It should reveal small logic at the right time.

```text
No grammar dump before contact.
Explanation must attach to something just seen, typed, or compared.
```

### 8.2 Card types

| Card type | Purpose | Example |
|---|---|---|
| Notice Card | “You saw this; no need to produce yet.” | `pour parler` exposure. |
| Micro-Logic Card | One tiny rule attached to contact. | `de l'eau → pas d'eau`. |
| Chunk Unpack Card | Opens an unpackable chunk. | `s'il = si + il`. |
| Contrast Card | Shows two close forms. | `j'ai faim` vs `je suis ici`. |
| Edge Card | Prevents a common trap. | `pas d'eau`, not general `pas l'eau`. |
| Return-to-Moment Card | Returns to communication. | “Now say the whole line naturally.” |

### 8.3 Micro-logic rules

```text
Keep explanation narrow.
Unknown/exposure may trigger notice, not active production.
Full grammar systems are layered over time.
Model answers may surface natural forms before full teaching.
Micro-logic does not add active mastery by itself.
Never introduce a big grammar table where one contrast is enough.
```

### 8.4 Concrete micro-logic examples

#### `de l'eau`

Model:

```text
Je voudrais de l'eau.
```

Notice:

```text
French often asks for “some water”: de l'eau.
For now, keep de l'eau as one package.
```

#### `pas d'eau`

Contrast:

```text
de l'eau → pas d'eau
```

Micro-logic:

```text
After pas, French often uses de / d'.
de l'eau becomes pas d'eau.
```

Guard:

```text
Do not teach “Je ne voudrais pas l'eau” as the general negative.
Natural general negative: Je ne voudrais pas d'eau.
```

#### `s'il vous plaît`

Early:

```text
Use as one piece: please.
```

Later:

```text
vous = formal/plural you
```

Much later:

```text
si + il + vous + plaît
literal: if it pleases you
```

---

## 9. Mon Lexique, Lexique Memory, Carryover, Flashcards

### 9.1 Mandatory separation

```text
Lesson chip surface ≠ carryover selection ≠ flashcard review.
Mon Lexique UI ≠ Lexique Memory ≠ Carryover Selector.
```

### 9.2 Mon Lexique UI Projection

Learner-facing safe view. It may show:

```text
known
needs practice
recently seen
try again soon
used today
```

It must not show:

```text
raw mastery numbers
validator internals
scary weakness labels
hidden engine terms
```

### 9.3 Lexique Memory internal matrix

> v0.1 numeric contract for these fields (formulas, ranges, update rules): **§65**.

This is the internal per-chip state. It can be implemented as local storage, database table, or pure snapshot during tests.

| Field | Type | Meaning | Notes |
|---|---|---|---|
| `chipId` | string | canonical id | Must be stable. |
| `surface` | string | learner-facing text | May have variants. |
| `locale` | string | language | `fr-FR`. |
| `chipType` | enum | spine/formula/package/pattern/atom/etc. | From taxonomy. |
| `introducedLessonId` | string | first seen | e.g. `lesson-001`. |
| `firstActiveLessonId` | string/null | first required production | nullable. |
| `status` | enum | ghost/recognition/active/supported/recycled/dormant | State machine. |
| `recognitionCount` | number | understood/identified | From exercises. |
| `productionCount` | number | produced attempts | From Fill/Build/Weave/Say It. |
| `successfulProductionCount` | number | accepted/close enough | Calibrated. |
| `repairCount` | number | corrected after feedback | Repair axis. |
| `transferCount` | number | used in new context/structure | Transfer axis. |
| `exposureCount` | number | seen as ghost/model | Not active mastery. |
| `lastSeenAt` | timestamp | last exposure/contact | For decay. |
| `lastProducedAt` | timestamp | last production | For decay. |
| `lastLessonId` | string | last lesson contact | For sequencing. |
| `lastContextTags` | string[] | café, hotel, greeting, etc. | Carryover context. |
| `strengthScore` | 0..1 | internal confidence | Do not expose raw. |
| `weaknessScore` | 0..1 | instability | Drives repair/recycle. |
| `decayScore` | 0..1 | staleness | Drives refresh. |
| `refreshDueScore` | 0..1 | combined refresh need | Not flashcard-only. |
| `recentOveruseScore` | 0..1 | avoid clutter | Penalizes carryover. |
| `contextFitScore` | 0..1 | per current lesson | computed per query. |
| `carryoverEligibility` | enum/score | can return in lesson | separate from flashcards. |
| `flashcardEligibility` | enum/score | explicit review candidate | separate from lesson. |
| `exposurePromotionStatus` | enum | ghost→recognition→active | Future. |
| `blockedForProductionUntil` | lesson/date/null | prevents premature testing | Useful for ghosts. |
| `notes` | string[] | internal authoring notes | optional. |

### 9.4 State machine

> v0.1 numeric transition gates for these states: **§65.5** (note: `recycled` is a
> query-time carryover role in v0.1, not an intrinsic stored state).

```text
unknown
→ ghost/exposure
→ recognition
→ activeNew
→ supported
→ recycled
→ strong
→ dormant
→ refreshDue / weaknessReturn / contextReturn
```

Rules:

```text
Ghost/exposure does not require learner production.
Recognition does not imply production.
ActiveNew means the lesson asks learner to produce.
Supported means nearby lessons can reuse with help.
Recycled means old chip can return contextually.
Dormant means not in active window unless triggered.
RefreshDue means old chip should return as refresher/review.
```

### 9.5 Carryover Selector

Input:

```ts
interface CarryoverSelectorInput {
  currentLessonId: string;
  currentTargets: string[];
  contextTags: string[];
  masterySnapshot: LexiqueMemorySnapshot;
  registry: ChipRegistry;
  budgets: CarryoverBudgets;
  blockedChipIds?: string[];
}
```

Output:

```ts
interface CarryoverSelection {
  selected: SelectedCarryoverChip[];
  rejected: RejectedCarryoverChip[];
  summary: {
    targetLoadProtected: boolean;
    visibleChipCount: number;
    recycleDensity: number;
    exposureCount: number;
  };
}
```

Selection scoring inputs:

Positive:

```text
contextFit
weakness
staleness/decay
refreshDue
spiralImportance
upcomingUsefulness
exposurePromotionPotential
structuralUsefulness
contrastUsefulness
```

Penalties:

```text
recentOveruse
strongMastery
screenClutterRisk
contextIrrelevance
targetStealRisk
tooSoonSinceLastSeen
```

### 9.6 Flashcard Scheduler

Separate future system:

```text
Lexique Memory → Flashcard Scheduler → explicit review cards.
```

Carryover selection is lesson-embedded reuse. Flashcards are explicit review. Both may read Lexique Memory, but outputs and density rules are separate.

Do not let flashcard scheduling dictate lesson examples.

---

## 10. Carryover architecture

### 10.1 Three pools

```text
Global Learned Chip Graph:
All chips seen/learned. Grows indefinitely.

Active Carryover Window:
Current candidate pool for lesson-embedded reuse. Peaks, rolls, and tapers.

Visible Carryover Chips:
Very small UI/screen subset. Always capped.
```

Canon:

```text
The learned graph grows; the active carryover window rolls.
Previous chips are candidates, not defaults.
Visible carryover stays capped.
```

### 10.2 Lifecycle proposal v0.3

| Stage | Offset | Meaning |
|---|---:|---|
| introduced / activeNew | L0 | first active ownership |
| dense supported carry-in | L+1 | high nearby reuse |
| supported/recycled if context-fit | L+2–L+3 | still close |
| light recycled / integration candidate | L+4–L+5 | selective integration |
| dormant unless triggered | L+6 onward | not default |
| recall-needed | any | reactivated by weakness/context/decay |

This is not a hard numeric rule. L11→L16 recombination is precedent, not a five-lesson law.

### 10.3 Return modes

| Mode | Why chip returns | Example |
|---|---|---|
| Structural return | anchors new grammar | `je voudrais` with future/time pressure |
| Refreshment return | stale but useful | `un café` after long absence |
| Context return | current scene requires it | café scene recalls café chips |
| Weakness return | mastery unstable | `je suis` returns if weak |
| Contrast return | new distinction needs old form | `de l'eau` vs `pas d'eau` |
| Formula speed return | social formula speed | `non merci`, `au revoir` |

### 10.4 Recycle Load Protection

> v0.1 numeric caps and priority ordering for this rule: **§65.6**.

```text
Recycle cannot steal the lesson.
Old chips should support the new lesson target, not steal it.
Every sentence has a load budget:
target load must stay dominant,
recycle load must support,
exposure load must stay optional and capped.
```

Worked example:

| Stage | Sentence | Role of old chip | Main load |
|---|---|---|---|
| Early | `Je voudrais un café, s'il vous plaît.` | target/request | request formula |
| Later | `Je voudrais un café, mais je n'ai pas le temps.` | anchor | `mais`, `je n'ai pas le temps` |
| Richer | `Je voudrais prendre un café avec vous, mais je n'aurai pas le temps aujourd'hui.` | anchor/context | future/simple/time expression |
| Refresh | `Je voulais un café, mais je n'avais pas le temps.` | refresh + tense contrast | imparfait context |

Validator must reject or warn when:

```text
old sentence replay is mechanical
target is hidden
recycle density too high
exposure load too high
strong old chips dominate attention
weak old chips are used unintentionally
context is unnatural
```

---

## 11. Measurement system

### 11.1 Measurement axes

| Axis | Measures | Evidence | Examples | Writes to memory? |
|---|---|---|---|---|
| Recognition | understands/identifies | correct choice, notice, match | selects `de l'eau` | yes recognition |
| Production | produces expected chip | typed/spoken answer | `je voudrais` | yes production |
| Transfer | uses known chip in new context | old chip + new structure | `je voudrais` with time pressure | yes transfer |
| Repair | improves/corrects mistake | after feedback | `je suis faim` → `j'ai faim` | yes repair |
| Recombination | combines known parts | builds new line | `j'ai` + `une question` | yes production/transfer |
| Precision | avoids close wrong form | chooses specific form | `pas d'eau` | yes precision |
| Refresh/retention | retrieves after stale gap | old chip resurfaces | `café` after absence | yes seen/produced |
| Exposure promotion | ghost becomes recognized/active | repeated exposure→use | `pour` | yes exposure/promotion |
| Context fit | uses right register/situation | polite/formal context | `vous` | yes context |
| Fluency/speed | fast stable retrieval | timed/quick review | formulas | optional |
| Unpack understanding | sees inner structure | explains/chooses parts | `s'il = si+il` | yes unpack, not active prod |
| Target salience | target remains lesson focus | validator score | target in sentence | validation only |

### 11.2 Status update rules

Pseudo-rules:

```text
If learner sees a chip in model only:
  exposureCount += 1
  status may become ghost/exposure
  do not increase production mastery

If learner recognizes chip correctly:
  recognitionCount += 1
  strengthScore += small

If learner produces chip correctly in target context:
  productionCount += 1
  successfulProductionCount += 1
  strengthScore += medium

If learner uses old chip in new structure/context:
  transferCount += 1
  strengthScore += medium
  carryover confidence += medium

If learner repairs near-miss after feedback:
  repairCount += 1
  weaknessScore -= small/medium
  precisionScore += small

If learner repeats old sentence mechanically when new target changed:
  sentenceReplayFlag += 1
  do not count as transfer
  route to attention/target salience guidance
```

### 11.3 Mastery bands

| Band | Meaning | UI wording | Internal behavior |
|---|---|---|---|
| `ghost` | seen only | not necessarily visible | can appear in Mon Lexique “seen” later |
| `recognizing` | can identify | “you’ve seen this” | can appear in contrast/notice |
| `trying` | early production | “practice again” | supported reuse |
| `stable` | normal production | “known” | can become anchor |
| `strong` | easy old chip | “known” | lower load weight, less frequent |
| `stale` | strong but absent | “refresh soon” | refresh return eligible |
| `weak` | repeated issue | “needs practice” | repair/carryover eligible |

---

## 12. Exercise contracts

Each exercise must declare what it measures and what it must not measure.

### 12.1 Meet Card

Purpose: introduce a chip in a natural example.

Input fields:

```ts
interface MeetCardPayload {
  title: string;
  body?: string;
  example: string;
  translation?: string;
  highlights?: Highlight[];
  audioText?: string;
}
```

Measures:

```text
recognition / contact / exposure
```

Must not:

```text
require production immediately unless followed by practice
count ghost as active mastery
```

### 12.2 Insight Card

Purpose: one narrow explanation after contact.

Measures:

```text
recognition, micro-logic, precision setup
```

Must not:

```text
become a grammar dump
introduce broad tense/conjugation systems too early
```

### 12.3 Fill

Purpose: produce missing chip in constrained context.

Measures:

```text
production, precision
```

Must declare:

```text
targetItemIds
accepted answers
near-miss handling if available
```

### 12.4 Build

Purpose: recombine known pieces.

Measures:

```text
production, recombination, sometimes transfer
```

Must not:

```text
use too many unknown pieces
hide the target
```

### 12.5 Weave v2

Purpose: use known French inside a real intent, with room for English gaps.

Core copy:

```text
Use the French pieces you know. Leave the rest in English for now. Then compare with the model.
```

Contract:

```text
- Prompt should be directive/intention-based, not merely “translate this.”
- Learner may write mixed French/English.
- Unknown exposure is optional.
- Mixed attempts usually route to neutral compare.
- Model answer reveals natural French.
- Correctness does not require exposure words.
```

Example:

```text
Prompt: Say you are not here to talk.
Learner attempt: je ne suis pas ici to talk
Model: Je ne suis pas ici pour parler.
Exposure: pour, parler
```

Measures:

```text
production of known chips
transfer
recombination
optional exposure recognition
repair if near-miss
```

Must not:

```text
punish English gaps
require ghost pieces
turn into sentence memorization
```

### 12.6 Say It Your Way

Purpose: freer controlled production.

Measures:

```text
transfer, context fit, production confidence
```

Must:

```text
have clear model answer
show neutral compare if partial
avoid harsh failure state for reasonable attempts
```

### 12.7 Natural Reveal / Compare

Purpose: show a natural model after learner attempt.

Measures:

```text
repair opportunity, exposure, precision awareness
```

Must not:

```text
automatically mark all differences as failure
```

### 12.8 Recap

Purpose: show active pieces the learner used.

Field:

```ts
piecesUsed: string[]
```

Rules:

```text
Active/produced only.
No full sentences.
No sentence/clause regressions.
Atomic chips, approved formulas, approved noun/packages only.
Ghost/exposure does not appear here.
```

### 12.9 Micro-Logic Card

Purpose: tiny logic after contact.

Measures:

```text
precision, recognition, unpack understanding
```

Must not:

```text
increase active production mastery by itself
```

### 12.10 Repair Loop

Purpose: help learner fix a recurring or important near-miss.

Examples:

```text
je suis faim → j'ai faim
pas de l'eau → pas d'eau
si il vous plaît → s'il vous plaît
previous weave answer repeated → read new target
```

Measures:

```text
repair, precision, attention, target salience
```

---

## 13. Error Engine

### 13.1 Feedback verdicts

| Verdict | Meaning | UI tone |
|---|---|---|
| `accepted` | answer satisfies target | calm success |
| `accepted_with_note` | correct enough + nuance | supportive note |
| `neutral_compare` | partial/mixed/valid learning attempt | no red/error |
| `precision_issue` | specific near-miss | small correction |
| `wrong_target` | answered different prompt | attention redirect |
| `repair_opportunity` | known error worth practice | guided repair |
| `not_yet` | too early/unknown | “not required yet” |

### 13.2 Error taxonomy

| Error id | Example | Diagnosis | Response |
|---|---|---|---|
| `wrong_auxiliary_faim` | `je suis faim` | English transfer | “French uses j'ai with faim: j'ai faim.” |
| `partitive_negative` | `pas de l'eau` | negative partitive edge | show `de l'eau → pas d'eau` |
| `sentence_replay` | repeats previous weave answer | attention/target salience | “New target. Read the situation again.” |
| `target_missing` | no target chip | target not attempted | prompt target/help |
| `exposure_gap_allowed` | English gap in Weave | allowed partial | neutral compare |
| `overliteral_translation` | word-by-word unnatural | translation transfer | model + note |
| `register_mismatch` | `tu` in formal context | context/register | gentle contrast |
| `article_gender_mismatch` | `un question` | gender/article | contrast `une question` |
| `negation_frame_missing` | `je suis pas` | missing `ne` in taught frame | depends level; note/correct |
| `protected_chunk_split` | `si il vous plaît` in production | elision chunk | `si + il → s'il` |
| `ghost_required_by_mistake` | marks missing `pour` wrong | system bug | ghost must not be required |

### 13.3 Weave feedback

In Weave:

```text
French known pieces present + English gaps → neutral compare.
Known target missing → gentle prompt or compare.
Exposure word missing → never error.
Repeated old answer → attention/target reminder.
```

---

## 14. Pedagogical Chunk Segmenter

### 14.1 Purpose

Segment sentences into learning-purpose chunks.

It is **not** a generic grammar parser.

```text
A sentence is segmented by learning purpose, not only by grammar.
```

### 14.2 Architecture

```text
Canonical registry
+ protected chunk list
+ approved unpack maps
+ deterministic longest-match
+ AI proposer, optional
+ validation gate
```

AI may propose, but deterministic validation decides.

```text
AI proposes.
System disposes.
```

### 14.3 Modes

| Mode | Example segmentation | Purpose |
|---|---|---|
| `retrieval` | `[s'il vous plaît]` | use chunk whole |
| `surface-unpack` | `[s'il] [vous] [plaît]` | show visible subparts |
| `deep-unpack` | `[si] [il] [vous] [plaît]` | approved morphology |
| `learner-facing` | `[Je voudrais] [un café] [maintenant]` | UI display |
| `accounting` | item ids | mastery updates |
| `validator` | load/source spans | content checking |

### 14.4 Golden test cases

```text
Input: s'il vous plaît
retrieval → [s'il vous plaît]
surface-unpack → [s'il] [vous] [plaît]
deep-unpack → [si] [il] [vous] [plaît]
approved expansion: s'il = si + il
```

```text
Input: Je voudrais un café, s'il vous plaît.
learner-facing → [Je voudrais] [un café] [s'il vous plaît]
accounting → je-voudrais, package-un-cafe, formula-s-il-vous-plait
```

```text
Input: Je voudrais un café, mais je n'ai pas le temps maintenant.
learner-facing early → [Je voudrais] [un café] [mais] [je n'ai pas le temps] [maintenant]
learner-facing later → [Je voudrais] [un café] [mais] [je n'ai pas] [le temps] [maintenant]
validator → target salience depends lesson target
```

```text
Input: Je suis ici.
learner-chip mode → [je suis] [ici]
reject primary UI chip → [Je suis ici]
```

```text
Input: J'ai une question.
learner-chip mode → [j'ai] [une question]
reject primary UI chip → [J'ai une question]
```

```text
Input: de l'eau
retrieval → [de l'eau]
surface-unpack → [de] [l'] [eau]
```

```text
Input: pas d'eau
micro-logic → [pas] [d'] [eau]
contrast source → de l'eau → pas d'eau
```

### 14.5 Validator for segmentation

Accept a segment only if:

```text
it exists as exact surface span,
or normalized span,
or approved unpack expansion,
or AI-suggested but human/unvalidated-only.
```

Reject if:

```text
protected chunk split in retrieval mode
full sentence chunk proposed as UI chip
useless fragment for level
unknown chip without registry entry in required itemId context
unapproved morphology claim
unpack depth too high for lesson
```

---

## 15. Sentence Builder

### 15.1 Purpose

Compose natural examples that keep the lesson target dominant while using old chips as anchors.

Input:

```ts
interface SentenceBuilderInput {
  lessonTargetChipIds: string[];
  requiredNewLoad: string[];
  allowedRecycleCandidates: SelectedCarryoverChip[];
  allowedExposureCandidates?: ChipCandidate[];
  contextTags: string[];
  maxRecycleWeight: number;
  maxExposureCount: number;
  forbiddenPatterns: string[];
  learnerLevel: string;
}
```

Output:

```ts
interface SentenceBuilderOutput {
  sentence: string;
  translation?: string;
  chunks: SegmentedChunk[];
  targetChipIds: string[];
  recycleChipIds: string[];
  exposureChipIds: string[];
  rationale: string;
  validatorSummary: ValidatorSummary;
}
```

### 15.2 Rules

```text
Target must be present and salient.
Recycle supports target; it does not steal the lesson.
Exposure is optional and capped.
Old full lesson sentences must not replay mechanically.
Sentence must be natural French.
Context must be plausible.
```

### 15.3 Good examples

```text
Target: negative + time constraint
Recycle: je voudrais, un café
Sentence: Je voudrais un café, mais je n'ai pas le temps maintenant.
```

```text
Target: future simple / no time today
Recycle: je voudrais, café, avec vous
Sentence: Je voudrais prendre un café avec vous, mais je n'aurai pas le temps aujourd'hui.
```

```text
Target: imparfait / past context
Recycle: café
Sentence: Je voulais un café, mais je n'avais pas le temps.
```

### 15.4 Bad examples

```text
Bad: Je voudrais un café, s'il vous plaît.
Reason: If target is future or contrast, this only replays old L1 sentence.
```

```text
Bad: Je voudrais un café avec vous pour parler de toute façon maintenant.
Reason: too many exposure/recycle items; target unclear.
```

---

## 16. Validator contract

### 16.1 Severity levels

| Severity | Meaning | Blocks PR/build? |
|---|---|---|
| `BLOCKER` | violates canon / dangerous runtime behavior | yes |
| `WARNING` | likely quality issue / needs review | maybe |
| `INFO` | observation / future debt | no |

### 16.2 Validator rules

| Rule id | Severity | Detect | Bad | Good / fix |
|---|---|---|---|---|
| `sentence_chip_in_pieces_used` | BLOCKER | `piecesUsed` contains full sentence/clause | `Je suis ici` | `je suis`, `ici` |
| `ghost_item_in_pieces_used` | BLOCKER | exposure-only item in recap | `pour` before taught | keep out of recap |
| `missing_registry_item_for_required_itemId` | BLOCKER | itemId referenced but absent | `itemId: ici` without registry | add registry or remove id |
| `protected_chunk_split_in_retrieval` | BLOCKER/WARNING | formula split in retrieval UI | `si`, `il`, `vous`, `plaît` in L1 recap | `s'il vous plaît` |
| `target_load_underrepresented` | BLOCKER/WARNING | target not salient | target appears only tiny | rewrite sentence |
| `recycle_density_too_high` | WARNING | old chips dominate | too many old chips | reduce recycle |
| `exposure_load_high` | WARNING | too many ghosts | 4 unknowns in Weave | cap exposure |
| `full_sentence_ui_chip` | BLOCKER | UI chip is full sentence | `J'ai une question` | `j'ai`, `une question` |
| `identity_split_possible` | INFO/WARNING | same surface multiple ids | `noun-cafe`/`chunk-un-cafe` | plan migration |
| `micro_logic_too_early` | WARNING | grammar dump before contact | plaire conjugation in L1 | whole-first |
| `unapproved_morphology_claim` | BLOCKER | AI invented explanation | `s'il = se + il` | approved map only |
| `mechanical_old_sentence_replay` | WARNING | old model repeated as new exercise | L1 sentence at L20 | make new target salient |
| `context_unnatural` | WARNING | awkward example | coffee causing hunger | rewrite natural context |

### 16.3 Validator outputs

```ts
interface ValidatorIssue {
  ruleId: string;
  severity: 'BLOCKER' | 'WARNING' | 'INFO';
  path: string;
  message: string;
  badExample?: string;
  suggestedFix?: string;
}

interface ValidatorSummary {
  blockers: number;
  warnings: number;
  infos: number;
  issues: ValidatorIssue[];
}
```

---

## 17. Data models / TypeScript sketch

### 17.1 Chip registry

```ts
type ChipType =
  | 'spine'
  | 'formula'
  | 'package'
  | 'pattern'
  | 'atom'
  | 'connector'
  | 'discourse'
  | 'grammar'
  | 'exposure';

type ProductionStatus =
  | 'unknown'
  | 'ghost'
  | 'recognition'
  | 'activeNew'
  | 'supported'
  | 'recycled'
  | 'strong'
  | 'dormant'
  | 'refreshDue';

interface ChipRegistryItem {
  id: string;
  surface: string;
  normalizedSurface: string;
  type: ChipType;
  language: 'fr';
  introducedLessonId?: string;
  firstActiveLessonId?: string;
  allowedAsUiChip: boolean;
  allowedAsPiecesUsed: boolean;
  protectedInRetrieval?: boolean;
  unpackable?: boolean;
  unpackMapId?: string;
  aliases?: string[];
  contextTags?: string[];
  notes?: string;
}
```

### 17.2 Lesson contract

```ts
interface LessonContract {
  id: string;
  level: string;
  title: string;
  contextTags: string[];
  targetItemIds: string[];
  activeNew: string[];
  supported: string[];
  recognitionOnly: string[];
  recycled: string[];
  blockedProduction: string[];
  exposureAllowed: string[];
  carryoverNeeds?: CarryoverNeed[];
  screens: LessonScreen[];
}
```

### 17.3 Screen payloads

```ts
type LessonScreen =
  | GoalScreen
  | MeetScreen
  | InsightScreen
  | FillScreen
  | BuildScreen
  | WeaveScreen
  | SayItScreen
  | RecapScreen
  | MicroLogicScreen
  | ChunkUnpackScreen
  | ContrastScreen;

interface Highlight {
  text: string;
  itemId?: string;
  role?: 'target' | 'support' | 'exposure' | 'contrast' | 'unpack';
}

interface SuggestedPiece {
  text: string;
  itemId?: string;
  role?: 'target' | 'support' | 'carryover' | 'exposure';
}

interface RecapPayload {
  piecesUsed: string[];
}
```

### 17.4 Future structured fields

```ts
interface MainPiece {
  text: string;
  itemId?: string;
  role: 'spine' | 'active' | 'carryover' | 'formula' | 'package' | 'pattern';
}

interface ExposurePiece {
  text: string;
  itemId?: string;
  role: 'ghost' | 'model-only' | 'notice-only';
  requiredForCorrectness: false;
}
```

Rules:

```text
mainPieces is future structured replacement for body prose.
exposurePieces is future list of model-only items.
Do not overload piecesUsed with either.
```

---

## 18. Current L1–L6 item/source map

This section captures current early-lesson reality and known cleanup decisions.

### 18.1 L1 — Café order

Current clean recap:

```text
piecesUsed: ["Bonjour", "je voudrais", "un café", "s'il vous plaît", "merci"]
```

Classification:

```text
Bonjour = formula
je voudrais = spine
un café = package
s'il vous plaît = formula/unpackable
merci = formula
```

Known identity debt:

```text
surface “un café” currently maps through noun-cafe in L1, while L5 uses chunk-un-cafe.
Defer normalization.
```

### 18.2 L2 — Je suis / ici

Current clean recap:

```text
piecesUsed: ["je suis", "ici", "Bonjour"]
```

Classification:

```text
je suis = spine
ici = legitimate atom/location
Bonjour = formula
```

Known identity debt:

```text
ici is text-only; no itemId/registry entry currently.
Defer itemId addition.
```

### 18.3 L3 — Negation / non merci

Current clean recap:

```text
piecesUsed: ["non", "je ne suis pas", "ce n'est pas", "non merci"]
```

Classification:

```text
non = atom
je ne suis pas = owned negative frame, not full sentence
ce n'est pas = negative frame, not full sentence
non merci = formula refusal
```

Important decision:

```text
oui is recognition/passive/trap only in L3 and should not appear in piecesUsed.
```

### 18.4 L4 — J'ai / faim / question

Current violations before cleanup:

```text
Main pieces prose: "je suis ici, j'ai faim, j'ai une question"
piecesUsed: ["j'ai", "j'ai faim", "j'ai une question", "Bonjour"]
```

Canon cleanup:

```text
Main pieces prose → "je suis, ici, j'ai, faim, une question"
piecesUsed → ["j'ai", "faim", "une question", "Bonjour"]
```

Reason:

```text
j'ai faim = composed phrase; split to j'ai + faim.
j'ai une question = sentence/clause; split to j'ai + une question.
```

Known identity debt:

```text
faim is text-only; no itemId currently.
une question may be noun-question in L4 and chunk-une-question in L5.
Defer normalization.
```

### 18.5 L5 — Packages un café / une question

Current clean recap:

```text
piecesUsed: ["un café", "une question"]
```

Classification:

```text
both are approved noun/package chips.
```

Known identity debt:

```text
chunk-un-cafe vs noun-cafe.
chunk-une-question vs noun-question.
```

### 18.6 L6 — Petit moment / integration

Current violations before cleanup:

```text
Main pieces prose: "bonjour, je suis ici, j'ai une question, merci, au revoir"
piecesUsed: ["Bonjour", "Je suis ici", "J'ai une question", "Merci", "Au revoir"]
```

Canon cleanup:

```text
Main pieces prose → "bonjour, je suis, ici, j'ai, une question, merci, au revoir"
piecesUsed → ["Bonjour", "je suis", "ici", "j'ai", "une question", "Merci", "Au revoir"]
```

Reason:

```text
Je suis ici = full sentence; split to je suis + ici.
J'ai une question = sentence/clause; split to j'ai + une question.
```

### 18.7 Rendering/validation facts from discovery

Current live rendering facts:

```text
piecesUsed is rendered as plain text pills.
No itemId.
No registry lookup.
No mastery/progress write.
Editing piecesUsed strings is cosmetic/content-only.

MeetCard highlights render h.text; h.itemId is not used at render time.
If adding itemId, structure tests require registry existence.
validate:pools does not inspect content/lessons/v1/*; v1 tests/typecheck are the relevant gates.
```

---

## 19. UI / UX principles

### 19.1 Visual hierarchy

Lessons should make the current target obvious.

Priority order:

```text
1. Situation / target meaning
2. Learner action
3. Suggested known pieces
4. Model answer / compare
5. Micro-logic / notice
6. Recap
```

### 19.2 Weave UI

Must show:

```text
Weave badge
Say this: label for standard Weaves
Target meaning dominant
Helper: “Use the French pieces you know. Leave the rest in English for now. Then compare with the model.”
Input label: “Your try”
```

Open Weaves may suppress `Say this:` when the prompt is already directive.

### 19.3 Feedback tone

Avoid red/error tone for partial learning attempts.

Use:

```text
Compare with the model answer.
Notice...
Try it this way...
```

Avoid:

```text
Wrong.
Incorrect.
You failed.
```

### 19.4 Main pieces display

Current short-term:

```text
Plain text in goal body can be atomized.
```

Future:

```text
Structured mainPieces field rendered as chips.
```

Do not implement structured field until separate PR/spec.

---

## 20. Content authoring rules

### 20.1 Lesson-level authoring

Each lesson should declare:

```text
local target chips
recognition-only chips
allowed exposure
context tags
blocked production
carryover needs/budget
```

Do not manually dump all previous chips.

### 20.2 Screen-level rules

Each screen should state or imply:

```text
what learner sees
what learner must produce
what is optional exposure
what is model-only
what memory axis is measured
```

### 20.3 `piecesUsed` rules

```text
Active/produced only.
No full sentences.
No ghost/exposure.
Allowed: atoms, spine chunks, approved formula chunks, approved noun/packages, patterns.
Case should be consistent unless formula display demands otherwise.
```

Bad:

```text
Je suis ici
J'ai une question
je ne suis pas ici
ce n'est pas pour moi
```

Good:

```text
je suis
ici
j'ai
une question
non merci
s'il vous plaît
```

### 20.4 Weave authoring rules

Good Weave prompts are intent-based:

```text
Someone is looking for you in the wrong room — tell them you are not here.
Say you are not here to talk.
You're leaving — thank them and say goodbye.
```

Weak Weave prompts are direct translation only:

```text
Write in French: I am not here.
```

Direct translation is not forbidden, but should not dominate.

### 20.5 Exposure authoring rules

Exposure can appear in model answer:

```text
Je ne suis pas ici pour parler.
```

Learner may write:

```text
je ne suis pas ici to talk
```

The missing exposure words `pour parler` are not required for correctness.

---

## 21. L1–L6 sample content blueprint

This is not a replacement for source files; it is a conceptual blueprint.

### L1 — Café order

Target:

```text
bonjour
je voudrais
un café
s'il vous plaît
merci
```

Loop:

```text
Meet: Bonjour.
Meet: Je voudrais un café.
Formula: s'il vous plaît.
Practice: order politely.
Weave: ask for a coffee.
Recap: active pieces.
```

Micro-logic later, not L1:

```text
s'il = si + il
```

### L2 — Being here

Target:

```text
je suis
ici
bonjour carryover
```

Model:

```text
Bonjour, je suis ici.
```

Recap:

```text
je suis, ici, Bonjour
```

### L3 — No / not

Target:

```text
non
je ne suis pas
ce n'est pas
non merci
```

Recognition-only:

```text
oui
```

Recap excludes `oui`.

Weave v2 candidate:

```text
Prompt: Someone is looking for you in the wrong room — tell them you are not here.
Model: Je ne suis pas ici.
```

Exposure candidate:

```text
Prompt: Say you are not here to talk.
Attempt: je ne suis pas ici to talk
Model: Je ne suis pas ici pour parler.
```

### L4 — Having / hunger / question

Target:

```text
j'ai
faim
une question
```

Contrast:

```text
je suis ici
j'ai faim
```

Recap:

```text
j'ai, faim, une question, Bonjour
```

Error:

```text
je suis faim → j'ai faim
```

### L5 — Packages

Target:

```text
un café
une question
```

Goal:

```text
notice packages and reuse them.
```

Identity debt:

```text
normalize noun-cafe/chunk-un-cafe later.
normalize noun-question/chunk-une-question later.
```

### L6 — Integration / small moment

Target:

```text
bonjour
je suis
ici
j'ai
une question
merci
au revoir
```

Open Weave:

```text
Close the moment in French: thank them and say goodbye.
Model: Merci. Au revoir.
```

Possible exposure later:

```text
Merci beaucoup. Bonne journée !
```

---

## 22. Implementation roadmap

### Step 1 — Content/data cleanup, smoke-free

PR goal:

```text
Atomize L4/L6 sentence-like recap/Main Pieces strings.
```

Files:

```text
lesson-004.ts
lesson-006.ts
```

No:

```text
itemRegistry
renderer
schema
Mon Lexique
Weave rewrite
APK
```

Validations:

```text
npm run typecheck
npm run validate:content
npm run validate:pools
npm run test:learning-engine
```

### Step 2 — Weave v2 tiny experiment

PR goal:

```text
Rewrite 2–3 prompts from direct translation to intent/directive.
Add at most one controlled exposure example.
No evaluator change.
```

Candidate lessons:

```text
L3: not here / not here to talk
L6: closing moment
```

Need local/device smoke? Prefer yes, but content-only with validation can be reviewed if no UI layout risk.

### Step 3 — Manual Micro-Logic / Chunk Unpack pilot

PR goal:

```text
Use existing insight/reveal card patterns to pilot manual micro-logic.
```

Examples:

```text
de l'eau
pas d'eau
s'il vous plaît
```

No automatic parser yet.

### Step 4 — Structured fields

PR goal:

```text
Add mainPieces / exposurePieces as structured data.
Renderer support.
Tests.
```

Requires UI smoke.

### Step 5 — Lexique Memory / Carryover Selector design

PR goal:

```text
Pure deterministic selector with tests.
No live UI integration first.
```

### Step 6 — Sentence Builder + Validator

PR goal:

```text
Pure functions first.
Golden tests for load protection, target salience, exposure cap, sentence-chip regression.
```

### Step 7 — Pedagogical Chunk Segmenter

PR goal:

```text
Deterministic longest-match + approved unpack maps.
AI proposer only for authoring suggestions, never ungated runtime.
```

---

## 23. Test plan

### 23.1 Current mandatory validations

```text
npm run typecheck
npm run validate:content
npm run validate:pools
npm run test:learning-engine
```

Known baseline:

```text
validate:pools may show 6 legacy warnings in L7/L9/L13/L16; do not treat as new blocker unless changed.
```

### 23.2 Unit/golden tests to add over time

```text
weaveCopy.test.ts
v1LessonStructure.test.ts
devApkCopyGuard.test.ts
chipTaxonomyValidator.test.ts
piecesUsedValidator.test.ts
chunkSegmenter.golden.test.ts
unpackMap.test.ts
carryoverSelector.test.ts
sentenceBuilderValidator.test.ts
errorEngine.test.ts
lexiqueMemoryReducer.test.ts
```

### 23.3 Validator golden cases

Must catch:

```text
piecesUsed: ["Je suis ici"] → blocker
piecesUsed: ["J'ai une question"] → blocker
s'il vous plaît split in retrieval mode → warning/blocker depending context
un café with duplicate ids → info/warning
missing registry id in targetItemIds → blocker
Weave exposure required for correctness → blocker
recycle density too high → warning
```

### 23.4 Smoke rules

No smoke required for:

```text
docs-only
pure tests
pure selector functions not wired to UI
content-only string cleanup where renderer behavior unchanged
```

Smoke required/preferred for:

```text
renderer changes
schema changes
new fields displayed in UI
lesson flow changes
TTS behavior
answer/evaluator behavior
APK release
```

---

## 24. One-shot build target: coherent MVP

If building from scratch, implement this vertical slice:

### 24.1 Screens

```text
Home / lesson list
Lesson screen renderer
Meet card
Insight card
Fill / simple input card
Weave card with neutral compare
Say It / open attempt card
Recap card
Mon Lexique simple UI projection
```

### 24.2 Data

```text
Chip registry for L1–L6
Lesson data for L1–L6
Expected answers / model answers
piecesUsed
highlights
suggestedPieces
```

### 24.3 Engines

MVP pure functions:

```text
normalizeAnswer
compareAnswer
selectMonLexiqueProjection
validatePiecesUsed
segmentKnownChunks deterministic-only
updateLexiqueMemoryFromEvent simple reducer
```

### 24.4 Do not implement in MVP

```text
AI runtime segmentation
full sentence builder
flashcard scheduler
complex spaced repetition
full grammar parser
speech recognition scoring
production analytics backend
```

### 24.5 MVP acceptance criteria

```text
Learner can complete L1–L6.
Weave supports mixed-language attempt + neutral compare.
Recap never shows full-sentence chips.
Mon Lexique shows safe known/seen items.
Validator catches sentence-chip regressions.
No exposure word is required for correctness.
No grammar dump before contact.
```

---

## 25. One-shot implementation instructions for GPT-5.6 Sol

Use this section directly if assigning a broad build.

```text
You are GPT-5.6 Sol implementing Cairn / Le Mot.

Objective:
Build or upgrade the app into a coherent chip-based beginner French learning vertical slice.
Preserve the canon distinctions in this spec.

Non-negotiables:
- Chip is a reusable building block, not sentence memorization.
- Model answers may be full sentences; UI chips and recap pieces must not be full sentences.
- Whole-first / unpack-later.
- No grammar dump before contact.
- Mon Lexique UI, Lexique Memory, Carryover Selector, and Flashcard Scheduler are separate.
- Carryover is not flashcard scheduling.
- Recycle cannot steal the lesson.
- Exposure is optional and capped.
- AI may propose but deterministic validation gates grammar/chunk facts.

Implementation order:
1. Inspect repo and tests.
2. Preserve existing working app.
3. Add/confirm data models for chips/lessons/memory without broad rewrites.
4. Implement or preserve L1–L6 vertical slice.
5. Add validators for piecesUsed and sentence-chip regressions.
6. Add deterministic chunk segmentation golden tests, but do not wire AI runtime parser.
7. Add Mon Lexique safe projection.
8. Keep Sentence Builder / Carryover Selector pure and test-only if implemented.
9. Run validations.
10. Report exact files changed, risks, non-goals, and validation results.

Do not:
- Rewrite the whole app if existing app works.
- Add flashcard scheduler into lesson carryover.
- Add new itemIds without registry + tests.
- Let AI grammar explanations appear without approved facts.
- Require exposure words for correctness.
- Add UI/schema changes without tests and smoke plan.
```

---

## 26. Open debts / known deferred work

### 26.1 Identity normalization

Deferred:

```text
un café: noun-cafe vs chunk-un-cafe
une question: noun-question vs chunk-une-question
ici: text-only, no registry item
faim: text-only, no registry item
```

This requires registry + lesson references + tests. Do not mix with tiny recap cleanup.

### 26.2 Structured fields

Deferred:

```text
mainPieces
exposurePieces
```

Need schema + renderer + tests + smoke.

### 26.3 Automatic chunk segmenter

Deferred until:

```text
approved unpack maps exist
golden tests exist
validator exists
AI proposer is gated
```

### 26.4 Sentence builder

Deferred until:

```text
carryover selector exists
validator exists
load budgets are encoded
```

---

## 27. Final canon checklist

Before merging any learning-system PR, ask:

```text
Does this preserve chip ≠ sentence?
Does this distinguish UI chip / accounting chip / inline highlight / model answer?
Does this keep exposure optional?
Does this keep piecesUsed active-only?
Does this avoid grammar before contact?
Does this protect target salience?
Does recycle support instead of steal?
Does it avoid conflating carryover and flashcards?
Does it avoid AI hallucination by validation?
Does it have tests or smoke plan appropriate to risk?
```

If any answer is no, stop or split the PR.

---

## 28. Appendix: French correctness notes currently relevant

```text
s'il vous plaît = si + il + vous + plaît; si + il elides to s'il.
“if it pleases you” is literal; “please” is real use.

Je n'ai pas le temps = I don't have time.
Je n'aurai pas le temps aujourd'hui = I won't have time today.

Je ne voudrais pas d'eau = natural general “I would not like any water.”
Do not teach Je ne voudrais pas l'eau as the general negative.

j'avais faim = I was hungry.
j'ai eu faim = I got/became hungry.

Pourquoi est-ce que j'avais faim ? Parce que je n'avais pas mangé.
```

---

## 29. Appendix: Round 1.3A immediate cleanup PR contract

If executing the next tiny PR:

```text
Branch: fix/round1-3a-recap-mainpieces-cleanup
Files only:
- lemot-app/content/lessons/v1/lesson-004.ts
- lemot-app/content/lessons/v1/lesson-006.ts

L4:
Main pieces line:
"Main pieces: je suis, ici, j'ai, faim, une question."
piecesUsed:
["j'ai", "faim", "une question", "Bonjour"]

L6:
Main pieces line:
"Main pieces: bonjour, je suis, ici, j'ai, une question, merci, au revoir."
piecesUsed:
["Bonjour", "je suis", "ici", "j'ai", "une question", "Merci", "Au revoir"]

Do not touch:
itemRegistry.ts
lessonTypes.ts
components
learning-engine
tests
Weave prompts
itemIds
schema
private vault
APK/build
```

Validations:

```text
npm run typecheck
npm run validate:content
npm run validate:pools
npm run test:learning-engine
```

Report:

```text
files changed
exact diff
validations
no non-content changes
no build/smoke
```

---

## 30. End state definition

A correct Cairn implementation is not “many lessons.” It is a system where:

```text
language pieces have stable identity,
lessons know what is active/passive/exposure,
learner attempts are interpreted gently,
old chips return for a reason,
model answers stay natural,
micro-logic appears after contact,
validators prevent sentence-chip drift,
and memory state eventually personalizes the flow.
```

That is the app.


---

# v0.3 Full-App Addendum — Complete One-Shot App Scope

This addendum hardens v0.2 from a learning-system spec into a **full app one-shot build spec**. It adds the app shell, navigation, persistence, telemetry, release constraints, full 180-lesson syllabus map, design system, product surfaces, and explicit deferred items.

Important distinction:

```text
Build the complete app shape now.
Do not build every future research engine now.
```

The app should be complete enough that an implementation agent can build a coherent local-first production-style app with L0/L1–L6 content today, a 180-lesson roadmap, and clean extension points for later systems.

Deferred future systems are documented, not implemented:

```text
- automatic pedagogical chunk parsing / auto chunk segmenter
- commute mode / listening-only mode
- full AI-generated lesson authoring
- full Sentence Builder
- full Carryover Selector automation
- flashcard scheduler
- cloud sync / account system
- speech pronunciation scoring
```

---

## 31. Full App Product Scope

### 31.1 Build target

The app is a local-first French learning app with:

```text
- onboarding
- home / lesson path
- lesson runner
- lesson recap
- progress persistence
- Mon Lexique learner-safe view
- practice/review placeholder surface
- settings
- audio/TTS controls
- dev-only reset/debug tools
- content validation and tests
```

The first complete build may ship only L0/L1–L6 as live content, but the architecture must know that the curriculum is intended to reach L180.

### 31.2 Complete app surfaces

Required app surfaces:

| Surface | Purpose | Required in MVP | Notes |
|---|---|---:|---|
| First Launch / Onboarding | Explain the learning style briefly | Yes | No long account wall. |
| Home / Path | Show next lesson and progress | Yes | Calm, low-gamification path. |
| Lesson Runner | Core screen renderer | Yes | Handles meet/fill/weave/say-it/insight/recap. |
| Lesson Complete | Celebrate useful completion without casino gamification | Yes | Show what returns next. |
| Mon Lexique | Learner-safe known/seen pieces | Yes, read-only | Projection, not raw mastery. |
| Practice Hub | Reserved surface for future review | Yes, minimal | Do not implement flashcard scheduler yet. |
| Settings | Audio, language, reset, privacy | Yes | Include TTS controls. |
| Dev Debug | Reset progress, inspect state | Dev only | Never user-facing in production. |
| Content Admin | Future authoring/editing | No | Must not appear in learner app. |
| Commute Mode | Listening-only mode | Future | Document only. |

### 31.3 MVP live feature rule

MVP must feel like a complete app, not a code demo:

```text
A learner can install, start, complete L0/L1–L6, hear audio, see recap, return later, keep progress, open Mon Lexique, reset in dev, and continue without data loss.
```

MVP must not pretend future systems are complete:

```text
- no fake AI tutor
- no fake flashcard scheduling
- no fake carryover intelligence
- no fake auto parser
- no fake cloud sync
```

---

## 32. App Shell / Navigation Contract

### 32.1 Route map

Canonical app routes:

```text
/app/onboarding
/app/home
/app/lesson/:lessonId
/app/lesson/:lessonId/complete
/app/lexique
/app/practice
/app/settings
/dev/state
/dev/audio
```

If using React Navigation / Expo Router, names may differ, but the route semantics must remain.

### 32.2 Onboarding

Purpose:

```text
Explain that Cairn teaches pieces, not memorized sentences.
Set expectations: try what you know; leave the rest; compare with the model.
```

Required copy principles:

```text
- short
- calm
- no long tutorial
- no promise of fluency in days
- no grammar dump
```

Required actions:

```text
Start first lesson
Skip if already onboarded
Open settings/audio check optional
```

### 32.3 Home / Lesson Path

Home must show:

```text
- current next lesson
- completed lessons
- compact lesson path
- Mon Lexique entry point
- Practice entry point
- Settings entry point
```

Home must not show:

```text
- dozens of badges
- casino reward loops
- leaderboard
- streak pressure as primary motivation
```

Lesson card state:

| State | Meaning |
|---|---|
| locked | Future lesson unavailable until prior completion or explicit dev unlock. |
| next | Recommended next lesson. |
| in_progress | Learner started but did not complete. |
| complete | Lesson completed at least once. |
| review_suggested | Future state; not in MVP scheduler. |

### 32.4 Lesson Runner

Lesson Runner responsibilities:

```text
- load lesson contract/content
- render screens in order
- track screen progress
- accept answers
- evaluate or compare answers
- play TTS if available
- write progress/memory events
- complete lesson
```

Lesson Runner must not:

```text
- create grammar facts dynamically
- create itemIds dynamically
- mutate registry
- call AI directly for learner-facing truth
```

### 32.5 Lesson Complete / Recap

Must show:

```text
- useful pieces used
- short natural summary
- next lesson hint
- Mon Lexique entry point
- continue/home button
```

Recap chips are learner-facing UI chips. They must obey:

```text
No full sentence as primary chip.
Approved formula/package chunks may remain whole.
```

### 32.6 Mon Lexique screen

Purpose:

```text
Learner-safe map of pieces the learner has seen/used/started owning.
```

Must show:

```text
- piece surface
- friendly status: Seen / Tried / Getting stronger / Known
- examples if safe
- no raw mastery percentages
```

Must not show:

```text
- raw internal scores
- hidden weakness labels
- AI confidence scores
- itemIds unless dev mode
```

### 32.7 Practice Hub

MVP behavior:

```text
A simple placeholder or lightweight review entry point.
It may show “Practice is coming soon” or a small manual review list.
It must not implement flashcard scheduling unless the scheduler exists.
```

Future behavior:

```text
Flashcard review, weak chip repair, listening practice, commute mode, targeted repair flows.
```

### 32.8 Settings

Required settings:

```text
- audio/TTS enabled
- speech rate if supported
- reset progress (dev or confirmed destructive action)
- app version/build info
- privacy/info page
```

Development-only settings:

```text
- reset all progress instantly
- unlock all lessons
- show raw state
- audio test screen
```

---

## 33. Persistence / Progress Storage Contract

### 33.1 Storage philosophy

MVP storage must be:

```text
local-first
offline-capable
deterministic
migration-versioned
safe to reset in dev
```

Do not require account login for MVP.

### 33.2 Root persisted state

Suggested persisted state:

```ts
export type CairnAppState = {
  schemaVersion: number;
  onboarding: { completed: boolean; completedAt?: string };
  lessonProgress: Record<LessonId, LessonProgress>;
  currentLessonId?: LessonId;
  lexiqueMemory: LexiqueMemoryState;
  eventLog: LearningEvent[];
  settings: AppSettings;
  dev?: DevState;
};
```

### 33.3 Lesson progress

```ts
export type LessonProgress = {
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  currentScreenId?: string;
  completedScreenIds: string[];
  startedAt?: string;
  completedAt?: string;
  attempts: AttemptRecord[];
};
```

### 33.4 Attempt record

```ts
export type AttemptRecord = {
  lessonId: string;
  screenId: string;
  exerciseType: string;
  rawInput?: string;
  normalizedInput?: string;
  expected?: string | string[];
  verdict: 'accepted' | 'neutral_compare' | 'repair' | 'incorrect' | 'skipped';
  itemIdsTouched: string[];
  timestamp: string;
};
```

### 33.5 Migration rules

Non-negotiable:

```text
Never rename itemIds without migration.
Never delete mastery state silently.
Never change schemaVersion without migration code.
Never store raw AI output as canon.
Never make progress dependent on unstable generated content.
```

### 33.6 Local storage implementation

Acceptable MVP storage options:

```text
React Native AsyncStorage / SecureStore only for non-sensitive progress
SQLite if already available and justified
File-backed JSON in dev only
```

For the existing Expo/RN app, prefer the smallest current storage pattern if one exists.

### 33.7 Future cloud sync

Future, not MVP:

```text
- optional account
- encrypted sync
- delete/export account data
- device merge strategy
- consented analytics
```

Cloud sync must not be required for core learning.

---

## 34. Answer Normalization / Evaluation Contract

### 34.1 Normalization layers

Normalize beginner typed answers with care:

```text
- trim
- lowercase for comparison
- collapse repeated whitespace
- normalize curly/straight apostrophes
- punctuation-insensitive for simple answers
- accent-tolerant in beginner mode
- allow common apostrophe spacing variants
```

Examples that can be equivalent in beginner mode:

```text
s'il vous plaît
s’il vous plait
s il vous plait
```

### 34.2 What normalization must not erase

Do not normalize away meaningful grammatical differences:

```text
je suis faim ≠ j'ai faim
pas de l'eau ≠ pas d'eau, but can trigger partitive repair
je suis ici ≠ je ne suis pas ici
je veux ≠ je voudrais, but may be register feedback rather than wrong in some contexts
```

### 34.3 Verdicts

| Verdict | Meaning | Learner tone |
|---|---|---|
| accepted | Meets target | Calm confirmation |
| neutral_compare | Partial/mixed/close enough to learn | “Compare with the model answer.” |
| repair | Known issue worth targeted feedback | Specific but non-punitive |
| incorrect | Misses required target | Calm retry or reveal |
| exposure_gap_allowed | Unknown part omitted/left in English | Accepted for exposure Weaves |

### 34.4 Weave mixed-language rule

A beginner may write:

```text
Non, je ne suis pas ici to talk.
```

If the target known chips are present, this should route to neutral compare, not red failure:

```text
Model: Non, je ne suis pas ici pour parler.
```

Unknown `pour parler` is exposure, not required ownership.

---

## 35. Runtime AI Policy

### 35.1 Canon

```text
AI can propose learning material; deterministic systems decide what becomes product truth.
```

### 35.2 Runtime AI default

MVP runtime AI is OFF for learner-facing truth.

Runtime AI may not:

```text
- invent grammar facts
- invent itemIds
- decide mastery updates directly
- generate unvalidated corrections
- rewrite lesson content on the fly
- create learner-facing explanations without approved facts/maps
```

### 35.3 Authoring AI

AI may assist authoring by proposing:

```text
- sentence variants
- candidate chunk segmentation
- micro-logic explanation drafts
- Weave prompt rewrites
- distractors
- repair feedback copy
```

Every AI proposal must pass:

```text
registry check
approved unpack map
validator checks
human/source review before shipping
```

### 35.4 Future AI parser

Automatic pedagogical chunk parsing is future work. It must be:

```text
deterministic-first
AI-suggested only when unknown
validator-gated
mode-aware: retrieval vs unpack vs deep-unpack vs validator
```

Do not implement auto parser in MVP.

---

## 36. Telemetry / Learning Analytics Event Schema

### 36.1 Philosophy

Telemetry exists to improve learning, not to surveil.

MVP may store events locally. Remote analytics are optional and must be privacy-safe.

### 36.2 Core events

| Event | When | Payload | May update memory? |
|---|---|---|---|
| app_opened | App start | appVersion, timestamp | No |
| lesson_started | Lesson start | lessonId | Yes: lesson progress |
| screen_seen | Screen displayed | lessonId, screenId, screenType | Yes: seen items |
| item_seen | Item visually/audio exposed | itemId, role | Yes: recognition/seen |
| item_produced | Learner produces item | itemId, context, verdict | Yes: production |
| answer_submitted | User submits answer | normalized verdict metadata | Maybe |
| answer_compared | Model answer shown | modelAnswerId/screenId | No direct mastery unless configured |
| repair_triggered | Error pattern detected | errorId, itemIds | Yes: repair need |
| repair_completed | Learner repairs | errorId, itemIds | Yes: repair strength |
| exposure_seen | Ghost/exposure item seen | itemId/surface | Yes: exposure only |
| micro_logic_seen | Micro-logic card seen | logicId | No active mastery by itself |
| lesson_completed | Lesson completed | lessonId | Yes: lesson status |
| lexique_opened | Mon Lexique opened | timestamp | No |
| settings_changed | Setting changed | settingName only | No |

### 36.3 Privacy rules

```text
Do not send raw free-text answers remotely by default.
Do not include personal data in AI prompts unless strictly necessary.
Allow local progress reset.
Future: export/delete user data.
Analytics must be anonymizable.
```

---

## 37. Design System / Visual Contract

### 37.1 Brand feeling

Cairn should feel:

```text
calm
premium
focused
human
slightly exploratory
low-gamification
```

Visual metaphor:

```text
A cairn: small stones that mark progress through terrain.
Each chip is a stone; each lesson is a short climb; Mon Lexique is the learner's map.
```

### 37.2 UI principles

```text
- card-based lesson flow
- generous whitespace
- tactile chips
- neutral error tone
- visible but non-alert Weave badge
- model answer distinguished but not exam-like
- no red punishment for partial beginner attempts
- no casino animations
```

### 37.3 Component states

Chips:

| State | Meaning |
|---|---|
| neutral | Seen or listed piece |
| active | Current lesson target |
| carryover | Returning known piece |
| exposure | New ghost piece, not required |
| repair | Highlighted for repair |
| disabled | Not interactive |

Feedback states:

| State | Tone |
|---|---|
| accepted | Warm but not childish |
| compare | Neutral curiosity |
| repair | Specific, helpful |
| retry | Calm, no shame |

### 37.4 Accessibility

Required:

```text
- high contrast enough for text/chips
- dynamic font support if practical
- screen-reader labels for audio buttons
- touch targets large enough
- no meaning conveyed by color alone
- haptics optional, not required
```

### 37.5 Copy tone

Use:

```text
Try this.
Compare with the model.
Notice this small piece.
Use the French pieces you know.
Leave the rest in English for now.
```

Avoid:

```text
Wrong!
Fail!
Perfect native translation required.
Memorize this grammar rule.
```

---

## 38. Full 180-Lesson Syllabus Map

This is a topic and progression map, not a fully authored screen-by-screen content file. It tells the app-builder what the complete curriculum shape is. L0 may remain a pre-lesson onboarding/café slice depending on current repo convention; L1–L6 should preserve current shipped content unless explicitly changed by content PR.

Progression rule:

```text
A lesson has one dominant target load, a small number of carryover supports, and optional exposure.
Integration lessons every ~4–6 lessons recombine without dumping new load.
```

### Unit 1: L1–L15 — A0 Survival Spine — contact, café, identity, tiny moments
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L1 | Bonjour + I would like | Order one item politely | bonjour; je voudrais; un café; merci; s’il vous plaît | whole formulas, polite request frame |
| L2 | I am here | Announce presence and identify location | je suis; ici; bonjour | être as identity/location spine |
| L3 | No / not / not this | Refuse politely and negate simple identity | non; ne...pas; ce n’est pas; non merci | negation frame, yes/no contrast |
| L4 | I have hunger / question | State basic need and ask for help | j’ai; faim; une question | avoir-state contrast, package noun |
| L5 | A coffee / a question | Distinguish package objects from bare nouns | un café; une question | articles as package markers |
| L6 | A small moment | Combine greeting, presence, question, thanks, goodbye | bonjour; je suis; ici; j’ai; une question; merci; au revoir | integration + no sentence-chip regression |
| L7 | I am going | Move toward a place | je vais; à; au café; là-bas | aller as movement spine |
| L8 | Where is it? | Ask where something is | où; c’est où; ici/là; la sortie | question word + location |
| L9 | Doing / making | Say what you do now | je fais; ça; maintenant | faire-light, present action |
| L10 | Integration: arrival | Handle a tiny arrival interaction | bonjour; je suis ici; je voudrais; une question | integration without new grammar load |
| L11 | Can I? | Ask permission/help lightly | je peux; vous pouvez; aider | pouvoir-light |
| L12 | Is it that...? | Use est-ce que as a question wrapper | est-ce que; je peux; c’est | question wrapper whole-first |
| L13 | Integration: request + refusal | Ask, refuse, and repair one tiny service moment | je voudrais; non merci; ce n’est pas; je peux | controlled recombination |
| L14 | There / to there | Use y as a place-return seed | j’y vais; y; là | y-light recognition/use |
| L15 | Need / must light | Say what is needed without grammar dump | il faut; je dois; maintenant | necessity chunks |

### Unit 2: L16–L30 — A1 Social Survival — feelings, food, water, time, service repair
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L16 | Integration + small moment seed | Recombine L11–L15 in a natural short scene | je peux; est-ce que; il faut; j’y vais | integration gate |
| L17 | Ça va? | Check in and answer lightly | ça va; ça ne va pas; je suis content/content(e) | feeling chunks, adjective agreement exposure |
| L18 | Water and partitives | Ask for water naturally | de l’eau; un verre d’eau; je voudrais | partitive notice |
| L19 | No water / not any | Negate partitive naturally | pas d’eau; je ne voudrais pas | de l’eau → pas d’eau contrast |
| L20 | Please unpack | Use and notice s’il vous plaît | s’il vous plaît; si + il; vous; plaît | chunk unpack manual card |
| L21 | Time now | Say now/today/this evening | maintenant; aujourd’hui; ce soir | time anchor chips |
| L22 | I do not have time | Say lack of time | je n’ai pas le temps; maintenant | avoir + negative package |
| L23 | I want / I would like | Contrast want vs polite would like | je veux; je voudrais | register and politeness |
| L24 | At the café | Order food/drink with one modification | avec; sans; sucre; lait | modifier chips |
| L25 | Menu reading | Recognize menu nouns without forcing production | entrée; plat; dessert; boisson | recognition-only content |
| L26 | Can you repeat? | Repair comprehension | répétez; plus lentement; je ne comprends pas | repair phrases |
| L27 | I understand a little | State comprehension level | je comprends; un peu; pas encore | self-assessment |
| L28 | How much? | Ask price | combien; ça coûte; euros | question + commerce |
| L29 | I need help | Ask for help politely | j’ai besoin de; aide; pouvez-vous | need + de |
| L30 | Integration: café repair | Order, ask price, repair misunderstanding | je voudrais; de l’eau; combien; répétez | A1 café integration |

### Unit 3: L31–L45 — A1 Daily Navigation — people, objects, directions, present tense breadth
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L31 | This / that | Point to objects | ceci; cela; ce; cette | demonstratives exposure |
| L32 | My / your | Use basic possession | mon; ma; mes; votre | possessive package |
| L33 | Family basics | Talk about family members | ma mère; mon frère; mes parents | noun gender in packages |
| L34 | Names and introductions | Introduce self and ask name | je m’appelle; vous vous appelez | reflexive formula |
| L35 | Numbers 1–20 | Use small numbers in service contexts | un...vingt | number recognition + production |
| L36 | Days and dates | Say today/tomorrow/day names | demain; lundi; mardi; date | calendar anchors |
| L37 | Directions left/right | Ask and follow directions | à gauche; à droite; tout droit | location formulas |
| L38 | Near/far | Describe distance | près; loin; d’ici | spatial adjectives |
| L39 | There is / there are | Notice existence | il y a; il n’y a pas | existential chunk |
| L40 | I am looking for | Ask where to find something | je cherche; la sortie; les toilettes | chercher + object |
| L41 | Present verbs I | Use regular -er basics | je parle; j’aime; je cherche | -er present pattern notice |
| L42 | I like / I don’t like | State preferences | j’aime; je n’aime pas | preference + negation |
| L43 | Food preferences | Say likes/dislikes in food context | j’aime le café; je n’aime pas le lait | definite article with liking |
| L44 | Simple invitations | Suggest going/doing | on va; on peut; ensemble | on as social subject |
| L45 | Integration: finding a place | Ask directions, clarify, thank | où; je cherche; à gauche; merci | navigation integration |

### Unit 4: L46–L60 — A1+ Daily Life — routines, questions, objects, quantity, polite service
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L46 | Morning routine | Describe a simple routine | je me lève; je prends; le matin | reflexive recognition |
| L47 | I take / I have | Use prendre in food/transport | je prends; un café; le bus | prendre as useful verb |
| L48 | Open/closed | Ask if a place is open | c’est ouvert; c’est fermé; à quelle heure | adjective state |
| L49 | Clock time I | Ask and tell hour | il est deux heures; quelle heure | time formulas |
| L50 | Before/after | Sequence simple events | avant; après; puis | connectors |
| L51 | Too much / enough | Handle quantity feedback | trop; assez; un peu | quantity adverbs |
| L52 | Some / a lot | Describe amounts | du; de la; des; beaucoup de | partitive plural intro |
| L53 | This is good | Give simple opinions | c’est bon; c’est bien; c’est mauvais | bon/bien contrast seed |
| L54 | Problem report I | Say something is not working | ça ne marche pas; problème | service repair |
| L55 | Hotel basics | Ask for room/key/towel | la chambre; la clé; une serviette | hotel nouns |
| L56 | Could I have? | Polite request alternative | est-ce que je pourrais; avoir | conditional formula exposure |
| L57 | Who/what/when | Use basic question words | qui; quoi; quand | question set |
| L58 | Why/because | Ask and answer why | pourquoi; parce que | cause connector |
| L59 | I’m sorry | Apologize and repair | désolé(e); pardon; ce n’est pas grave | social repair |
| L60 | Integration: hotel request | Request help, report problem, thank | j’ai besoin; ça ne marche pas; pourriez-vous | service integration |

### Unit 5: L61–L75 — A2 Past Entry — passé composé, experiences, yesterday, finished actions
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L61 | Yesterday | Anchor past time | hier; ce matin; la semaine dernière | past time adverbs |
| L62 | I went | Use aller in passé composé | je suis allé(e); au café | être auxiliary as chunk |
| L63 | I had / I took | Use avoir past chunks | j’ai eu; j’ai pris | avoir auxiliary pattern |
| L64 | I ate / drank | Talk about meals | j’ai mangé; j’ai bu | past participles |
| L65 | I saw / I did | Describe past activity | j’ai vu; j’ai fait | irregular useful past |
| L66 | Not in the past | Negate passé composé | je n’ai pas pris; je ne suis pas allé | ne...pas around auxiliary |
| L67 | Already / not yet | Talk completion | déjà; pas encore | completion aspect |
| L68 | Today vs yesterday | Contrast present and past | je prends / j’ai pris | tense contrast |
| L69 | Have you ever? | Ask experience lightly | vous avez déjà; est-ce que | experience questions |
| L70 | Travel past | Say where you went | je suis allé à; je suis rentré | movement verbs |
| L71 | Past service issue | Report what happened | il y avait; j’ai demandé | issue narrative seed |
| L72 | Receipt / bill | Ask about payment | l’addition; j’ai payé | commerce past |
| L73 | Short story I | Tell three past events | d’abord; ensuite; enfin | sequence in past |
| L74 | Repair past misunderstanding | Correct what you meant | je voulais dire; pas ça | repair phrase |
| L75 | Integration: yesterday café story | Tell a tiny past café/service story | hier; j’ai pris; c’était; merci | A2 past integration |

### Unit 6: L76–L90 — A2 Description — imparfait, habits, background, people and places
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L76 | It was | Use c’était for evaluation | c’était; bien; bon; difficile | imparfait chunk |
| L77 | I was | State past feeling/location | j’étais; fatigué(e); ici | être imparfait |
| L78 | I had | Past states with avoir | j’avais; faim; le temps | avoir imparfait |
| L79 | There was | Describe background | il y avait; beaucoup de | existential imparfait |
| L80 | Used to / habit | Talk repeated past habit | je prenais; souvent; tous les jours | habitual past |
| L81 | Past contrast I | Passé composé vs imparfait | j’ai pris / je voulais | event vs background |
| L82 | When I was... | Set a background clause | quand j’étais; avant | quand + imparfait |
| L83 | Weather basics | Describe weather now/past | il fait beau; il pleuvait | weather chunks |
| L84 | People description | Describe someone simply | sympa; gentil; occupé | adjectives |
| L85 | Place description | Describe a place | calme; propre; bruyant | place adjectives |
| L86 | Comparisons light | Compare two things | plus...que; moins...que | comparison frame |
| L87 | Best/worst light | Use superlative chunks | le meilleur; le pire | superlative formula |
| L88 | Feelings past | Explain how you felt | j’étais content; j’avais peur | state narrative |
| L89 | Problem background | Describe an issue context | il y avait un problème; ça ne marchait pas | service narrative |
| L90 | Integration: small past story | Combine event + background + feeling | hier; j’ai; il y avait; j’étais | past contrast integration |

### Unit 7: L91–L105 — A2 Future + Plans — futur proche, futur simple seed, arrangements
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L91 | I’m going to | Make near future plan | je vais prendre; je vais aller | futur proche |
| L92 | Tomorrow plans | Say tomorrow/this weekend plans | demain; ce week-end; je vais | future time anchors |
| L93 | We are going to | Plan with someone | on va; nous allons; ensemble | social planning |
| L94 | I will have | Future simple high-utility chunks | j’aurai; je serai | futur simple formula |
| L95 | I won’t have time | Negate future need/time | je n’aurai pas le temps | future negation |
| L96 | Reservation basics | Book a table/room | réserver; une table; pour deux | reservation frame |
| L97 | If possible | Add polite constraints | si possible; de préférence | polite modifiers |
| L98 | Could we? | Suggest politely | est-ce qu’on pourrait | conditional social formula |
| L99 | I would prefer | Express preference politely | je préférerais; plutôt | conditional preference |
| L100 | Availability | Ask if available/free | disponible; libre; complet | availability vocabulary |
| L101 | Schedule changes | Change time/date | changer; déplacer; annuler | admin verbs |
| L102 | Because I can’t | Explain constraints | je ne peux pas; parce que | reason + ability |
| L103 | After that | Plan sequence | après ça; puis; ensuite | planning connectors |
| L104 | Confirmation | Confirm details | c’est confirmé; d’accord; parfait | service confirmation |
| L105 | Integration: reservation change | Make and modify a plan politely | réserver; si possible; je n’aurai pas le temps | future plan integration |

### Unit 8: L106–L120 — B1 Pronouns + Nuance — y/en, object pronouns, relative clauses
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L106 | I go there / I think about it | Use y beyond place | j’y vais; j’y pense | y expansion |
| L107 | I want some / I have some | Use en for quantity | j’en voudrais; j’en ai | en quantity |
| L108 | I don’t have any | Negate en | je n’en ai pas | en + negation |
| L109 | Give it to me | Object pronouns in service chunks | donnez-le-moi; je le prends | le/la object |
| L110 | I know it / I don’t know it | Use le/la in cognition | je le sais; je ne le connais pas | object nuance |
| L111 | To him/her | Introduce lui/leur | je lui ai dit; je leur demande | indirect object |
| L112 | The one that... | Use qui/que relative basics | la personne qui; le café que | relative clauses |
| L113 | What I want | Use ce que / ce qui | ce que je veux; ce qui marche | fused relatives |
| L114 | Where I went | Use où as relative | l’endroit où | relative where |
| L115 | Which one? | Ask and choose | lequel; laquelle; celui-ci | selection pronouns |
| L116 | Same/different | Compare identity | le même; différent | comparison vocabulary |
| L117 | Too/also/either | Use aussi/non plus | moi aussi; moi non plus | agreement/disagreement |
| L118 | Not only | Add nuance | pas seulement; aussi | argument connector |
| L119 | Clarify reference | Repair pronoun confusion | je parle de ça; de lui | repair reference |
| L120 | Integration: explain what you want | Use pronouns/relatives in a service explanation | ce que; en; y; le/la | pronoun integration |

### Unit 9: L121–L135 — B1 Opinions + Needs — subjunctive entry, obligation, emotion, advice
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L121 | I think that | State opinions | je pense que; je crois que | opinion clauses |
| L122 | I don’t think that | Negative opinion seed | je ne pense pas que | subjunctive exposure |
| L123 | It is necessary that | Use il faut que chunks | il faut que je; il faut que vous | subjunctive high-utility |
| L124 | I want you to | Request action with que | je voudrais que vous | subjunctive request formula |
| L125 | I’m happy that | Emotion + clause | je suis content que | emotion trigger |
| L126 | So that | Purpose clauses | pour que | purpose connector |
| L127 | Advice light | Say should / better to | tu devrais; il vaut mieux | advice formulas |
| L128 | Obligation nuance | Must vs should vs need | il faut; devoir; avoir besoin de | modal contrast |
| L129 | Permission nuance | Can/may/allowed | pouvoir; avoir le droit de | permission |
| L130 | Uncertainty | Maybe/probably | peut-être; probablement; il se peut que | uncertainty |
| L131 | Agree/disagree politely | Soft disagreement | je suis d’accord; pas tout à fait | conversation nuance |
| L132 | Preference reasons | Explain why you prefer | je préfère parce que | opinion + cause |
| L133 | Recommendation | Recommend a place/item | je recommande; vous devriez | advice context |
| L134 | Complaint softening | Complain without aggression | désolé, mais; il y a un souci | politeness repair |
| L135 | Integration: advice and request | Ask someone to do something politely | je voudrais que; il faut que; pour que | subjunctive integration |

### Unit 10: L136–L150 — B1+ Work, Travel, Admin — emails, calls, formal repair, documents
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L136 | Formal email opening | Write a simple formal message | Bonjour Madame/Monsieur; je vous écris | email formula |
| L137 | Reason for writing | State purpose | concernant; à propos de; suite à | formal connectors |
| L138 | Request in writing | Ask for information/action | pourriez-vous; je souhaiterais | formal request |
| L139 | Attachments and documents | Mention documents | ci-joint; document; formulaire | admin vocabulary |
| L140 | Phone call basics | Open and clarify a call | allo; je vous entends mal; pouvez-vous répéter | phone repair |
| L141 | Appointment scheduling | Schedule/reschedule formally | rendez-vous; disponible; reporter | admin planning |
| L142 | Travel disruption | Report delay/cancellation | retard; annulé; correspondance | travel issue |
| L143 | Hotel issue detailed | Report problem with specifics | la climatisation; internet; ne fonctionne pas | operational detail |
| L144 | Medical/basic safety | Say symptoms and urgency | j’ai mal; allergie; urgent | safe basic phrases |
| L145 | Bank/payment issue | Explain payment problem | paiement; carte; reçu; facture | commerce admin |
| L146 | Apology + resolution | Receive/give service apology | nous sommes désolés; nous allons | formal response |
| L147 | Follow-up | Ask status | je reviens vers vous; où en est | follow-up formula |
| L148 | Confirmation email | Summarize agreed details | comme convenu; confirmé; cordialement | formal close |
| L149 | Polite escalation | Ask for manager/help | responsable; serait-il possible | escalation without aggression |
| L150 | Integration: formal service repair | Email/call to resolve a problem | je vous écris; souci; pourriez-vous | admin integration |

### Unit 11: L151–L165 — B2 Bridge — argument, narrative depth, hypotheses, indirect speech
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L151 | Argument structure | Make a simple argument | d’abord; en plus; cependant | argument connectors |
| L152 | Concession | Say although/even if | même si; bien que | concession + subjunctive exposure |
| L153 | Hypothesis present | If X, then Y | si + présent; je peux/je vais | condition pattern |
| L154 | Hypothesis past | If I had... | si j’avais; j’aurais | conditionnel passé exposure |
| L155 | Regret | Say what you should have done | j’aurais dû; j’aurais voulu | regret formulas |
| L156 | Plus-que-parfait | Say what had happened before | j’avais déjà; j’étais déjà allé | past-before-past |
| L157 | Reported speech I | Say what someone said | il a dit que; elle m’a demandé | indirect speech |
| L158 | Reported questions | Say what someone asked | il m’a demandé si/où/quand | reported question |
| L159 | Passive / se faire | Describe what was done/happened | ça a été fait; je me suis fait | passive/se faire |
| L160 | Gerund | Say while/by doing | en faisant; en prenant | gérondif |
| L161 | Cause/consequence | Because/therefore | à cause de; grâce à; donc; du coup | cause nuance |
| L162 | Purpose/result | So that / as a result | afin de; pour que; de sorte que | advanced connectors |
| L163 | Nuanced opinion | Qualify stance | il me semble que; à mon avis | opinion nuance |
| L164 | Debate repair | Clarify and disagree | ce que je veux dire; je comprends, mais | conversation repair |
| L165 | Integration: argument + story | Tell a story and defend a viewpoint | cependant; si; j’aurais dû | B2 bridge integration |

### Unit 12: L166–L180 — B2 Capstone — fluency, culture, professional/personal projects
| Lesson | Topic | Communicative goal | Core chips / families | Main logic |
|---|---|---|---|---|
| L166 | Summarize an article | Summarize main idea and detail | il s’agit de; l’auteur explique | summary frame |
| L167 | Compare viewpoints | Present two positions | d’un côté; de l’autre; tandis que | balanced argument |
| L168 | Explain a process | Describe steps clearly | tout d’abord; ensuite; finalement | process explanation |
| L169 | Give feedback | Give constructive feedback | ce qui marche; ce qui pourrait être amélioré | feedback language |
| L170 | Present a project | Pitch a project simply | mon objectif; le problème; la solution | presentation structure |
| L171 | Interview answers | Answer background/goals questions | j’ai travaillé; je souhaite; mon expérience | professional narrative |
| L172 | Cultural comparison | Compare habits/cultures carefully | chez nous; en France; contrairement à | culture discourse |
| L173 | News discussion | Talk about a current issue | actualité; enjeu; conséquence | news vocabulary |
| L174 | Formal complaint letter | Write a complete complaint | je tiens à signaler; je vous remercie de | formal writing |
| L175 | Narrative capstone | Tell a detailed past story | imparfait/passé composé/plus-que-parfait | tense integration |
| L176 | Opinion capstone | Defend a nuanced opinion | bien que; cependant; il faut que | argument integration |
| L177 | Service capstone | Handle complex service scenario | problem; request; escalation; resolution | real-life repair |
| L178 | Travel capstone | Plan, change, and explain a trip | future; conditional; admin vocabulary | travel integration |
| L179 | Personal capstone | Explain who you are and what you want | identity; past; future; reasons | personal fluency |
| L180 | Final integration | Perform a multi-turn life scenario | all prior core chips | B2-ready integration |



---

## 39. Content Authoring System for 180 Lessons

### 39.1 Lesson file contract

Each lesson should eventually declare:

```ts
export type AuthoredLesson = {
  id: string;
  title: string;
  levelBand: 'A0' | 'A1' | 'A2' | 'B1' | 'B2';
  dominantTarget: ItemId[];
  supportedCarryoverNeeds: CarryoverNeed[];
  exposureBudget: ExposureBudget;
  blockedScope: string[];
  screens: LessonScreen[];
  recap: LessonRecap;
};
```

### 39.2 Lesson budget

Recommended default budget:

| Lesson band | Active-new | Supported carryover | Exposure | Screen count |
|---|---:|---:|---:|---:|
| A0 | 2–5 | 2–6 | 0–2 | 8–12 |
| A1 | 4–7 | 4–10 | 1–3 | 10–14 |
| A2 | 5–9 | 6–14 | 1–4 | 12–16 |
| B1 | 6–10 | 8–18 | 2–5 | 14–18 |
| B2 | 6–12 | 10–22 | 3–6 | 14–20 |

Budget is cognitive load, not visible chip count.

### 39.3 Integration lesson rules

Integration lessons:

```text
- add zero or very few new active chips
- recombine recent target families
- reveal weak spots
- do not become giant review dumps
- can include one natural exposure model-answer item
```

---

## 40. Deferred Future Features

These are important but intentionally future. They must be documented so the current build has extension points, but they must not be implemented prematurely.

### 40.1 Automatic Pedagogical Chunk Parser

Future purpose:

```text
Given a sentence, produce mode-aware pedagogical chunks for learner UI, accounting, unpack, and validator modes.
```

Deferred because:

```text
- high hallucination risk if AI-led
- requires approved unpack maps
- requires deterministic validator
- same sentence splits differently by mode and level
```

Future modes:

```text
retrieval: [s'il vous plaît]
surface-unpack: [s'il] [vous] [plaît]
deep-unpack: [si] [il] [vous] [plaît]
validator: spans + itemIds + load weights
```

### 40.2 Commute Mode

Future purpose:

```text
Listening-first / hands-free review mode for learners commuting or walking.
```

Future behavior:

```text
- play known chips in short scenes
- ask mental recall prompts
- reveal model answer audio
- no typing required
- integrate with weak/stale chip queue
```

Deferred because:

```text
- requires stable audio/TTS
- requires review scheduling
- requires safe state updates without typed evidence
```

### 40.3 Flashcard Scheduler

Future purpose:

```text
Explicit spaced review outside lesson flow.
```

Deferred because:

```text
Carryover is lesson-embedded reuse, not flashcard scheduling.
```

### 40.4 Full Sentence Builder + Validator

Future purpose:

```text
Build natural sentences from target + carryover + exposure budgets and validate target salience.
```

Deferred until:

```text
- item registry is stable
- Lexique Memory exists
- measurement axes are implemented
- validator severity checks exist
```

### 40.5 Cloud Sync / Accounts

Future purpose:

```text
Cross-device persistence and backup.
```

Deferred until:

```text
- local state shape is stable
- migration policy is tested
- privacy/KVKK/GDPR choices are clear
```

---

## 41. Full App Implementation Roadmap

### 41.1 Immediate no-smoke-safe work

```text
1. Content-only recap/Main Pieces cleanup for L4/L6.
2. Docs-only refinements.
3. Source audits and implementation plans.
```

### 41.2 Local/device smoke required work

```text
- renderer changes
- schema changes
- new screen types
- audio/TTS behavior changes
- navigation changes
- persistence changes that affect user flow
- APK/release changes
```

### 41.3 Build phases

| Phase | Goal | Smoke needed? |
|---|---|---:|
| P0 | Docs/canon, source audit | No |
| P1 | L0/L1–L6 content cleanup | Usually no if string-only |
| P2 | App shell + persistence | Yes |
| P3 | Mon Lexique read-only projection | Yes |
| P4 | Weave v2 tiny prompt experiment | Focused source + optional visual |
| P5 | Manual micro-logic cards | Yes if new screen type; no if existing insight card |
| P6 | Registry identity normalization | Tests + careful migration review |
| P7 | Carryover Selector design | No for docs; yes for runtime |
| P8 | Sentence Builder/Validator | Heavy tests + smoke |
| P9 | Flashcards/Commute mode | Future |

---

## 42. Definition of Done by PR Type

### 42.1 Docs-only PR

```text
- docs path only
- no runtime files
- no tests required unless docs generator exists
- final status clean
```

### 42.2 Content-only PR

```text
- lesson content files only
- no renderer/schema/registry unless explicitly scoped
- typecheck
- validate:content
- validate:pools
- test:learning-engine
- focused source review
- smoke optional only if screen count/type/flow unchanged
```

### 42.3 Renderer PR

```text
- component tests if available
- typecheck
- content validations
- focused visual smoke
- at least one lesson path run
```

### 42.4 Persistence PR

```text
- migration tests
- reset tests
- fresh install behavior
- upgrade behavior
- corrupted state handling
- local/device smoke required
```

### 42.5 Registry / itemId PR

```text
- no itemId rename without migration
- registry existence tests
- duplicate surface review
- mastery impact report
- Mon Lexique projection review
```

### 42.6 AI-assisted authoring PR

```text
- AI output not accepted as truth by default
- validator proof
- grammar facts sourced/approved
- human review
```

### 42.7 Release/APK PR

```text
- clean main
- validations green
- build succeeds
- install/launch smoke
- core lesson smoke
- TTS quick check
```

---

## 43. Anti-Drift Checklist

Stop and redesign if implementation starts becoming:

| Drift | Symptom | Correction |
|---|---|---|
| Phrasebook | Lists of phrases without memory/reuse | Return to chip + context + use loop |
| Translation app | Every prompt is “translate this” | Use directive/intention Weaves |
| Grammar textbook | Rule before contact | Use contact → notice → unpack |
| Flashcard app | Review scheduler drives lessons | Separate carryover from flashcards |
| Sentence memorization | Whole sentences become chips | Atomize / formula/package only |
| AI tutor chaos | AI invents facts live | Deterministic registry + validator |
| Chip overload | Too many visible pieces | Cap visible carryover and exposure |
| Punitive app | Red failure for partial attempts | Neutral compare / repair tone |

---

## 44. Privacy / KVKK / GDPR Lightweight Product Note

For MVP:

```text
- collect no unnecessary personal data
- local-first progress preferred
- no account required
- no sensitive learner profile unless needed
- no raw learner free-text sent remotely by default
- AI prompts must avoid personal data
- analytics minimal and anonymizable
- future export/delete path
```

This is not legal advice. It is implementation hygiene so the architecture does not create avoidable compliance debt.

---

## 45. Full-App One-Shot Agent Instruction

If an agent is asked to “build the app from this spec,” it must follow this sequence:

```text
1. Inspect existing repo and identify current architecture.
2. Do not rewrite working systems unless explicitly authorized.
3. Implement app shell only around existing lesson runner if it exists.
4. Preserve existing L0/L1–L6 behavior unless a scoped content cleanup says otherwise.
5. Add persistence only with migration-safe local-first state.
6. Add Mon Lexique as learner-safe projection, not raw mastery UI.
7. Keep Practice Hub minimal; do not build flashcards prematurely.
8. Keep AI runtime off for learner-facing truth.
9. Mark auto chunk parser and commute mode as future, not MVP.
10. Use the 180-lesson syllabus as roadmap metadata, not as 180 fully authored lessons.
11. Run validations and report exact files changed.
```

One-shot success means:

```text
The app has the complete product architecture and a credible working early vertical slice, not every future intelligent subsystem fully implemented.
```

---

## 46. Final Full-App Build Checklist

A build is coherent if all are true:

```text
[ ] Onboarding explains Cairn's learning loop.
[ ] Home path shows next lesson and progress.
[ ] Lesson Runner can complete L0/L1–L6.
[ ] Recap shows no forbidden sentence chips.
[ ] Progress persists across app restarts.
[ ] Mon Lexique exists as learner-safe projection.
[ ] Settings include audio controls and reset/dev options.
[ ] Practice Hub exists but does not fake scheduler intelligence.
[ ] Runtime AI does not create learner-facing truth.
[ ] Telemetry/event model exists or is ready locally.
[ ] 180-lesson syllabus map is included as roadmap metadata.
[ ] Deferred features are clearly marked future.
[ ] Tests/validations pass.
[ ] Device smoke is run for shell/persistence/renderer changes.
```

---

## 47. v0.3 Closing Canon (superseded by v1.0 sections below)

```text
Build the whole app shape.
Ship the smallest truthful intelligence.
Do not fake future systems.
Keep language pieces reusable.
Keep memory separate from UI.
Keep carryover separate from flashcards.
Keep AI behind validators.
Keep deferred systems documented but out of the critical path.
```

---

## 48. v1.0 Build-Now vs Future Scope Gate

This section is a hard guard against a one-shot agent building the wrong app.

### 48.1 Build now / app must contain

```text
- a working app shell with onboarding, home/path, lesson runner, recap, Mon Lexique, settings, and dev reset
- L0/L1–L6 lesson flow preserved from current repo or reconstructed from the exact source map
- local-first progress persistence
- learner-safe Mon Lexique projection from registry + Lexique Memory
- Mon Lexique filtering/sorting by status, chip type, lexical category, lesson, topic, and exposure/practice state
- Mon Lexique detail bottom sheets/popups with approved examples, tiny logic, sound notes, common mistakes, and related chips
- neutral compare behavior for partial/mixed answers
- TTS/audio replay where supported by the platform
- answer normalization and evaluator boundaries
- telemetry/event schema for learning memory updates
- content authoring rules and validators
- 180-lesson syllabus map as roadmap/data/spec
- QA/do-not-drift checklist
```

### 48.2 Do not build now / record as future

```text
- automatic chunk parser / full auto pedagogical segmentation
- commute mode / audio-only mode
- full flashcard scheduler with spaced repetition
- cloud sync / accounts / backend dependency
- runtime AI tutor that creates learner-facing grammar facts
- full sentence builder automation
- fully generated 180 lessons screen-by-screen without human review
- payment/subscription system
- social features / leaderboards / streak pressure
- raw mastery dashboard
```

### 48.3 Hard one-shot interpretation

If an implementation agent receives this document and a blank repo, it should build a complete vertical app shell plus data/engine/test foundations. It may create placeholder syllabus entries for future lessons, but must not invent authoritative grammar explanations or final screen-by-screen content beyond approved source/canon without labeling them as draft.

If working in the existing repo, it must preserve the live v1 architecture and implement in small coherent slices rather than replacing the app wholesale.

---

## 49. Mon Lexique v1.0 Acceptance Contract

Mon Lexique is the signature surface of Cairn. It must not degrade into a simple word list, flashcard queue, raw mastery report, or dictionary.

### 49.1 One-sentence definition

```text
Mon Lexique is the learner-safe personal map of French pieces the user has seen, tried, strengthened, or should revisit, derived from Item Registry + Lexique Memory, enriched with filters, examples, tiny logic, sound notes, and contextual micro-cards, without exposing raw mastery or becoming flashcards.
```

### 49.2 Mandatory source-of-truth rule

```text
Item Registry answers: what is this language piece?
Lexique Memory answers: what has this learner experienced with it?
Mon Lexique answers: what safe, motivating view should the learner see?
Carryover Selector answers: should it return inside a lesson?
Flashcard Scheduler answers: should it become explicit review?
```

Mon Lexique must be derived. It must never be hand-authored as a separate independent list.

### 49.3 Mon Lexique must never

```text
- show raw strengthScore / weaknessScore / decayScore
- show scary labels such as Weak, Failed, Decay, Poor recall
- update production mastery simply because the screen was opened
- promote exposure-only items to Known
- treat flashcard eligibility as a visible practice obligation
- invent explanations with runtime AI
- hide item identity splits by duplicating surfaces silently
- show every encountered text fragment as a chip
```

### 49.4 MVP behavior

```text
Opening Mon Lexique: no mastery mutation.
Opening an entry detail card: no production mutation.
Reading a tiny note: may create micro_note_seen, but not Known.
Hearing audio: may create audio_played / sound_note_seen, but not production.
Practice button: optional future; not required in MVP.
Dev mode may show itemId; learner mode must not.
```

### 49.5 Friendly status mapping

> v0.1 lifecycle → friendly-band mapping and hidden-field list: **§65.7**.

| Lexique Memory status | Mon Lexique friendly status | Meaning shown to learner |
|---|---|---|
| `ghost` / `exposure` | Seen | You saw this in a model answer or note. |
| `recognition` | Seen / Starting | You are beginning to recognize it. |
| `activeNew` | Tried | You used it in a lesson. |
| `supported` / `recycled` | Getting stronger | It is returning in new places. |
| `strong` | Known | You can use it reliably in current scope. |
| `refreshDue` / `weaknessReturn` | Try again soon | Worth revisiting gently. |

### 49.6 Default Mon Lexique sections

```text
Try again soon
Getting stronger
Recently seen
Seen in model answers
Known
```

A simpler MVP can combine these into tabs:

```text
All · Known · Growing · Seen · Try soon
```

### 49.7 Entry contract

```ts
export type MonLexiqueFriendlyStatus =
  | 'Seen'
  | 'Tried'
  | 'Getting stronger'
  | 'Known'
  | 'Try again soon'
  | 'Seen in model answers';

export type MonLexiqueEntry = {
  chipId: string;
  surface: string;
  learnerMeaning: string;
  friendlyStatus: MonLexiqueFriendlyStatus;

  chipType: PedagogicalChipType;
  lexicalCategory: LexicalCategory;

  example?: string;
  examples?: string[];
  firstSeenLessonId?: string;
  lastTouchedLessonId?: string;
  topicTags?: string[];

  canPractice?: boolean;
  isExposureOnly?: boolean;
  hasTinyLogic?: boolean;
  hasSoundNote?: boolean;
  hasCommonMistake?: boolean;
  hasChunkUnpack?: boolean;

  // Dev-only; never show in learner UI by default.
  debug?: {
    itemId: string;
    lifecycleStatus: string;
  };
};
```

---

## 50. Mon Lexique Filtering, Sorting, and Lexical Categories

The product owner explicitly wants noun/verb/etc. filtering. This is not optional for the complete Mon Lexique concept.

### 50.1 Core distinction

```text
Chip type ≠ lexical category.
```

Chip type answers: **how should this item be learned?**  
Lexical category answers: **what kind of language piece is this?**

### 50.2 Pedagogical chip type

```ts
export type PedagogicalChipType =
  | 'spine'
  | 'formula'
  | 'package'
  | 'pattern'
  | 'atom'
  | 'exposure'
  | 'carryover'
  | 'unpackableChunk';
```

Examples:

| Surface | Chip type | Why |
|---|---|---|
| `je voudrais` | spine | core reusable request frame |
| `s'il vous plaît` | formula | learned whole as social formula |
| `un café` | package | noun package with article |
| `je ne suis pas` | pattern | negative frame |
| `ici` | atom | small reusable location piece |
| `pour parler` | exposure | may appear before active ownership |

### 50.3 Lexical category

```ts
export type LexicalCategory =
  | 'noun'
  | 'verb'
  | 'verbPhrase'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'connector'
  | 'determiner'
  | 'negation'
  | 'questionWord'
  | 'timeExpression'
  | 'formula'
  | 'expression'
  | 'pattern'
  | 'soundPattern';
```

Examples:

| Surface | Chip type | Lexical category | Notes |
|---|---|---|---|
| `un café` | package | noun | masculine; food/drink topic |
| `une question` | package | noun | feminine; communication topic |
| `je voudrais` | spine | verbPhrase | lemma `vouloir` |
| `je suis` | spine | verbPhrase | lemma `être` |
| `j'ai` | spine | verbPhrase | lemma `avoir`; elision note |
| `faim` | atom | noun | used with `j'ai faim` |
| `ici` | atom | adverb | location |
| `non` | atom | negation | response/negation |
| `s'il vous plaît` | formula | formula | contains verb internally, but primary category remains formula |
| `au revoir` | formula | formula | closing expression |
| `pour` | atom | preposition | usually not prominent UI chip early |
| `mais` | atom | connector | contrast connector |

### 50.4 Registry metadata needed for filtering

```ts
export type ChipRegistryEntry = {
  id: string;
  surface: string;
  learnerMeaning: string;
  chipType: PedagogicalChipType;
  lexicalCategory: LexicalCategory;
  lemma?: string;
  topicTags?: string[];
  lessonIntroduced: string;
  firstActiveLessonId?: string;
  isFormula?: boolean;
  isUnpackable?: boolean;
  isExposureAllowed?: boolean;
  grammar?: {
    gender?: 'masculine' | 'feminine';
    number?: 'singular' | 'plural';
    register?: 'neutral' | 'formal' | 'informal' | 'polite';
    tense?: string;
    mood?: string;
    verbLemma?: string;
    person?: string;
  };
  components?: string[];
  relatedChipIds?: string[];
};
```

### 50.5 User-facing filters

Minimum filters:

```text
All
Words
Phrases
Verbs
Nouns
Formulas
Patterns
Seen only
Try soon
Known
```

Expanded filters:

```text
By status
By lesson
By topic
By chip type
By lexical category
By recent activity
By exposure-only
By practice availability
By sound note availability
By common mistake availability
```

### 50.6 Sorting options

```text
Smart order
Recently seen
Recently used
Lesson order
A–Z
Known first
Try soon first
Verbs first
Nouns first
Formulas first
```

Default Smart order:

```text
1. Try again soon
2. Getting stronger
3. Recently seen
4. Seen in model answers
5. Known
```

### 50.7 Important formula rule

Formula chunks may contain verbs or pronouns internally, but their primary Mon Lexique category remains formula unless the learner is explicitly in an unpack/detail view.

Example:

```text
s'il vous plaît
primary list category: Formula
unpack detail: si + il + vous + plaît
```

It should not appear as a primary “Verb” entry just because `plaît` is a verb form.

---

## 51. Mon Lexique Detail Cards / Pop-up Micro-Lessons

The product owner explicitly wants small pop-up cards and mini explanations inside Mon Lexique, including apostrophe/élision and liaison. This is mandatory for the full app concept.

### 51.1 Detail surface

Tapping a Mon Lexique entry opens a bottom sheet or small pop-up card. It should feel like opening a personal language stone, not a textbook article.

### 51.2 Detail card structure

```ts
export type MonLexiqueDetail = {
  chipId: string;
  surface: string;
  learnerMeaning: string;
  friendlyStatus: MonLexiqueFriendlyStatus;
  chipType: PedagogicalChipType;
  lexicalCategory: LexicalCategory;
  examples: ExampleLine[];
  tinyLogicCards?: TinyLogicCard[];
  soundNotes?: SoundNoteCard[];
  commonMistakes?: CommonMistakeCard[];
  usageNotes?: UsageNoteCard[];
  chunkUnpackCards?: ChunkUnpackCard[];
  relatedChipIds?: string[];
  seenInLessonIds?: string[];
  practiceAvailable?: boolean;
};
```

### 51.3 Card types

```text
Meaning Card — the safe learner meaning.
Example Card — natural examples from known/current scope.
Tiny Logic Card — a small reason, not a full grammar lecture.
Sound Note Card — liaison, silent letters, rhythm, vowel links.
Common Mistake Card — common confusion and repair.
Usage Note Card — register/context/when to use it.
Chunk Unpack Card — whole chunk opened into parts.
Pattern Note Card — small reusable pattern explanation.
Register Note Card — tu/vous, polite/casual, formal/informal.
Memory Anchor Card — “remember this with…” relationship.
```

### 51.4 Canon rules for micro-lessons

```text
Mon Lexique cards explain language the learner has already encountered.
They do not front-load full grammar systems.
They do not make an exposure chip active by themselves.
They must be short, concrete, and attached to examples.
They may be linked to multiple chips.
They use approved facts only; runtime AI cannot invent them.
```

### 51.5 Apostrophe / élision cards

These belong primarily to Tiny Logic / Sound Note cards.

Example: `j'ai`

```text
Tiny logic:
je + ai becomes j'ai.
French often drops the vowel before another vowel.

Use it in:
j'ai faim
j'ai une question
```

Example: `s'il`

```text
Tiny logic:
si + il becomes s'il.
You do not say: si il.
You say: s'il.

Seen in:
s'il vous plaît
```

Example: `l'eau`

```text
Tiny logic:
la + eau becomes l'eau.
Because eau starts with a vowel sound, la shortens to l'.
```

### 51.6 Liaison / sound note cards

Pronunciation notes should be recognition-first and non-punitive.

Example: `vous avez`

```text
Sound note:
vous + avez sounds like vou-z-avez.
The final s in vous is usually quiet, but it can connect before a vowel sound.
```

Example: `les amis`

```text
Sound note:
les + amis sounds like le-z-amis.
You see s, but you hear a z-link.
```

Liaison cards do not require immediate active production. Early learners should be helped to hear better, not punished for not producing perfect liaison.

### 51.7 Common mistake cards

Example: `faim`

```text
Common mistake:
je suis faim ❌
j'ai faim ✅

Tiny logic:
French says “I have hunger,” not “I am hungry.”
```

Example: `de l'eau` / `pas d'eau`

```text
Common pattern:
de l'eau → pas d'eau

After a negative like pas, French often uses de/d'.
```

### 51.8 Detail interaction events

```text
mon_lexique_entry_opened
micro_note_seen
sound_note_seen
chunk_unpack_seen
common_mistake_seen
related_chip_opened
audio_played
```

None of these count as successful production. They may count as seen/notice events.

### 51.9 MVP vs future for cards

MVP:

```text
approved static card content for known early chips
bottom sheet entry detail
examples + tiny logic + sound note + common mistake where available
no AI-generated facts
```

Future:

```text
richer linked concept graph
interactive mini practice from card
validated AI-assisted card drafting
automatic chunk parser support
```

---

## 52. Audio / Pronunciation Contract

Audio is part of the learning product, not decoration.

### 52.1 Audio principles

```text
Audio supports recognition before punitive production.
TTS should be reliable, replayable, and calm.
Pronunciation notes should explain what the learner hears.
Liaison and elision should appear as tiny sound notes, not full phonology lectures.
```

### 52.2 MVP audio behavior

```text
- TTS / Hear it button for model answers and key chips where supported.
- Replay allowed.
- No crash if TTS unavailable.
- Fallback text remains useful.
- Audio state should not block lesson completion.
- Audio play may create audio_played event, not production mastery.
```

### 52.3 Future audio behavior

```text
- slow replay
- listen-only commute mode
- minimal pronunciation practice
- speech recognition only after careful calibration
- audio-first review
```

### 52.4 Do not do early

```text
- do not score learner pronunciation harshly
- do not require perfect liaison production
- do not make speech recognition a blocker
- do not hide text behind audio
```

---

## 53. Accessibility and UX Baseline

Cairn should be calm, readable, and usable by real beginners.

### 53.1 Accessibility basics

```text
- readable font sizes
- sufficient contrast
- large tap targets
- screen reader labels for buttons
- audio controls with text alternatives
- no meaning conveyed by color alone
- avoid tiny overcrowded chips
- bottom sheets should be dismissible
- keyboard input should be reliable
- error/compare feedback should not rely on red-only signaling
```

### 53.2 Cognitive accessibility

```text
- one main target per screen
- visible target salience
- helper copy short and stable
- no paragraph-length grammar dumps in core flow
- pop-up micro-lessons optional, not blocking
- recap chips capped and meaningful
```

---

## 54. Authoring / Content Management Boundary

### 54.1 MVP authoring model

Content is repo-driven and reviewed through PRs. There is no user-facing admin panel in MVP.

```text
Content source: versioned files in repo.
Authoring changes: PR-based.
Validation: deterministic scripts/tests.
Review: product + pedagogy + source diff.
```

### 54.2 No early admin panel

Do not build a user-facing or public admin editor in MVP. It creates security, quality, and validation debt before content primitives are stable.

Future internal admin may exist, but only if it preserves:

```text
- schema validation
- item registry integrity
- preview mode
- diff/review trail
- no direct unvalidated publish
- role separation
```

### 54.3 AI-assisted authoring boundary

AI may draft lessons, examples, segmentations, or explanations. AI output must be treated as proposal until it passes:

```text
- registry check
- grammar fact approval
- validator load check
- no sentence-chip regression
- exposure budget check
- human/source review for canon changes
```

---

## 55. ItemId, Data Migration, and Identity Policy

This is a hard engineering rule because Mon Lexique depends on stable identity.

### 55.1 Rules

```text
Never rename an itemId without migration.
Never merge split identities silently.
Never delete mastery state silently.
Never add highlight/suggestedPieces itemId without registry entry.
Never let same surface split across multiple ids without an explicit reason.
```

### 55.2 Current identity debts

```text
un café:
- L1 side uses noun-cafe behavior
- L5 side uses chunk-un-cafe
- same learner-facing package can split mastery

une question:
- L4 side uses noun-question behavior
- L5 side uses chunk-une-question
- same learner-facing package can split mastery

ici:
- text-only in L2/L3/L6 contexts
- no registry itemId yet

faim:
- text-only in L4 contexts
- no registry itemId yet
```

### 55.3 Migration PR requirements

Any identity-normalization PR must include:

```text
- inventory of old ids and surfaces
- chosen canonical id
- alias/deprecation plan if needed
- migration for stored Lexique Memory/progress
- tests proving old state maps to new state
- content references updated consistently
- no raw loss of mastery data
```

This is not part of the tiny content-only cleanup.

---

## 56. Release, QA Modes, and Smoke Requirements

### 56.1 Change classes

| Change class | Examples | Required checks | Smoke? |
|---|---|---|---|
| Docs-only | canon docs | markdown/source review | no |
| Content-only strings/arrays | piecesUsed copy, body text | typecheck, content validation, tests | usually no |
| Lesson flow/content structure | screen order/type/targets | full validations | focused smoke recommended |
| Renderer/UI | cards, chips, layout | tests + visual review | yes |
| Registry/identity | item ids, registry | migration tests | yes / careful |
| Evaluator/error engine | answer matching | unit tests + focused lesson runs | yes |
| TTS/audio | hear button, playback | platform checks | yes, physical preferred |
| Storage/migration | progress state | migration tests | yes |
| Release/APK | build artifact | build/install/smoke | yes |

### 56.2 Content-only smoke-free example

Round 1.3A discovery established that L4/L6 `piecesUsed` cleanup is smoke-free because `piecesUsed` renders as inert text pills: no itemId, registry lookup, mastery write, or progress mutation. The planned cleanup touches only L4/L6 string arrays/body strings and avoids registry/renderer/schema/evaluator changes.

---

## 57. Agent Output Contract

Any implementation agent working from this spec must end with a report that includes:

```text
- branch name
- base commit
- files changed
- exact behavior implemented
- what is intentionally stubbed/future
- validations run and results
- whether smoke/build was run
- whether any runtime/schema/registry/renderer files changed
- whether itemIds were changed
- known limitations
- next recommended smallest step
```

The agent must not hide core behavior behind vague TODOs.

### 57.1 Forbidden output states

```text
- “Implemented Mon Lexique” but actually hardcoded a word list.
- “Added AI explanations” without approved facts/validator.
- “Built 180 lessons” by hallucinating final lesson screens.
- “Added practice” by mixing flashcards into lesson carryover.
- “Fixed item identity” without migration plan.
- “Improved UI” without preserving low-gamification tone.
```

---

## 58. Mon Lexique Projection Tests

These tests are required before Mon Lexique is considered real.

### 58.1 Status mapping test

Given Lexique Memory:

```ts
const memory = {
  'bonjour': { lifecycleStatus: 'strong', strengthScore: 0.92 },
  'je-voudrais': { lifecycleStatus: 'supported', strengthScore: 0.61 },
  'pour-parler': { lifecycleStatus: 'ghost', exposureOnly: true },
  'faim': { lifecycleStatus: 'refreshDue', weaknessScore: 0.7 },
};
```

Expected projection:

```text
bonjour → Known
je voudrais → Getting stronger
pour parler → Seen / Seen in model answers / exposure-only
faim → Try again soon
```

### 58.2 Raw score hiding test

Projection must not expose:

```text
strengthScore
weaknessScore
decayScore
raw mastery percentages
repairCount unless dev/debug
itemId unless dev/debug
```

### 58.3 No mutation test

```text
Opening Mon Lexique does not mutate Lexique Memory.
Opening a detail card does not count as production.
Playing audio does not count as production.
Reading a tiny note does not promote to Known.
```

### 58.4 Exposure safety test

```text
Exposure-only items never become Known from model-answer exposure alone.
Exposure can become Seen.
Active production requires an exercise that asks for production.
```

### 58.5 Filtering/sorting test

Given mixed entries, filters must correctly return:

```text
Nouns: un café, une question, faim
Verbs / Verb phrases: je voudrais, je suis, j'ai
Formulas: bonjour, merci, s'il vous plaît, au revoir
Patterns: je ne suis pas, ce n'est pas
Seen only: exposure-only / recognition items
Try soon: refreshDue / weaknessReturn items
```

### 58.6 Detail card test

```text
s'il vous plaît detail contains formula meaning and approved unpack note.
j'ai detail contains je + ai → j'ai.
faim detail contains j'ai faim common mistake card.
vous avez detail may contain liaison sound note only if the chip exists/has been encountered.
```

---

## 59. Complete App User Journey v1.0

### 59.1 First launch

```text
User opens app.
Sees calm onboarding: learn French by building reusable pieces.
Chooses beginner path / continues.
No placement-test complexity in MVP unless already built.
```

### 59.2 Home

```text
Shows current path and next lesson.
Shows gentle progress, not streak pressure.
Can enter Lesson Runner.
Can open Mon Lexique.
Can open Settings.
```

### 59.3 Lesson Runner

```text
Screen-by-screen lesson flow.
Meet/Notice/Fill/Weave/Say It/Recap surfaces.
Target is visually clear.
Known chips return in controlled way.
Unknown exposure is optional.
Partial/mixed attempts get neutral compare.
```

### 59.4 Lesson Complete / Recap

```text
Shows active pieces used.
No full sentence chips.
Can play key audio.
Can continue home.
Updates Lexique Memory based on actual events.
```

### 59.5 Mon Lexique

```text
User sees their personal French map.
Filters by noun/verb/formula/pattern/status/lesson/topic.
Sorts by smart order, recent, lesson, A–Z.
Taps entry for bottom sheet.
Reads small examples/tiny logic/sound notes/common mistakes.
No raw score pressure.
```

### 59.6 Settings

```text
Audio/TTS controls.
Display preferences if needed.
Privacy/basic info.
Dev-only reset progress in dev builds.
```

---

## 60. 180-Lesson Syllabus Authoring Policy

The 180-lesson map is part of the complete app vision. It should guide progression to B2-ish scope over time, but lesson content must be authored with quality gates.

### 60.1 What the 180 map should contain

For each lesson:

```text
lesson id
working title
communicative target
target chips / patterns
grammar layer if any
recycle themes
exposure candidates
micro-logic opportunities
Mon Lexique additions
not-before constraints
```

### 60.2 What the 180 map should not pretend

```text
It is not final screen-by-screen content for all lessons.
It is not a guarantee of 3000 mastered words.
It is not permission for AI to invent unvalidated grammar facts.
It is not a hard carryover window.
```

### 60.3 B2 direction

The long path should spiral through:

```text
social openings/closings
identity/location/states
needs/wants/requests
negation/questions
movement/location
avoir/être/faire/pouvoir/devoir/falloir layers
object packages/articles/partitives
past/future/time sequencing
opinions/preferences/justifications
repair/clarification strategies
work/travel/hotel/food/daily life contexts
pronouns y/en/le/la/lui/leur gradually
compound tenses
imparfait/passé composé contrast
conditional politeness and hypotheticals
subjunctive triggers as late layer
B1/B2 discourse connectors and nuance
```

### 60.4 Integration rhythm

Integration lessons roughly every 4–5 lessons are a pacing heuristic. They do not define a fixed carryover memory window.

---

## 61. Final v1.0 One-Shot Prompt Template

Use this when handing the spec to a build agent.

```text
You are building Cairn / Le Mot from CAIRN_FULL_APP_ONE_SHOT_BUILD_SPEC_v1_0.md.

Read the entire file first.
Build the app in the shape described by the spec.
Do not reinterpret it as a phrasebook, grammar course, Duolingo clone, flashcard-first system, or uncontrolled AI tutor.

Hard priorities:
1. Preserve chip-based learning philosophy.
2. Build/keep L0–L6 lesson runner working.
3. Implement local progress and Lexique Memory foundations.
4. Implement learner-safe Mon Lexique projection with filters/sorting/detail cards.
5. Preserve neutral compare and exposure-vs-ownership distinction.
6. Keep future-only modules stubbed/contracted, not falsely implemented.
7. Add tests for Mon Lexique projection, filtering, and no-mutation behavior.
8. Do not invent grammar facts or itemIds.
9. Do not build auto chunk parser, commute mode, full flashcards, or runtime AI tutor now.
10. End with a complete output report.

If working in the existing repo:
- inspect current architecture
- create a small coherent branch
- do not replace the app wholesale
- preserve existing validations
- report every changed file

If working in a blank repo:
- create the app shell, data models, engines, tests, sample L0–L6 content, Mon Lexique, and syllabus map
- clearly label future modules as future
```

---

## 62. Final v1.0 No-Drift Product Truth

```text
Cairn is a calm French learning app where reusable language pieces become a personal, filterable, explainable Mon Lexique. Lessons teach through use, noticing, repair, and reuse rather than grammar dumps, sentence memorization, raw flashcards, or uncontrolled AI. The learner sees what they know, what is growing, what they have only seen, and what to revisit — with tiny contextual explanations such as elision, liaison, chunk unpacking, and common mistakes exactly when useful.
```

If a build, design, or content decision conflicts with that sentence, choose the sentence.

---

## 63. v1.0 Addendum Checklist

A reader should be able to answer yes to every item:

```text
Do I understand what Cairn is and is not?
Do I understand chips, chip types, and lexical categories?
Do I understand why sentence chips are forbidden as primary UI chips?
Do I understand Mon Lexique as personal map, not flashcards?
Do I understand Mon Lexique filters/sorting/detail cards?
Do I understand apostrophe/élision/liaison micro-notes?
Do I understand Lexique Memory vs Carryover vs Flashcards?
Do I understand recycle load protection?
Do I understand Weave v2?
Do I understand the Error Engine and evaluator tolerance?
Do I understand what is build-now and what is future?
Do I understand why auto chunk parser is future?
Do I understand what exact L1–L6 debts exist?
Do I understand the 180-lesson roadmap vs fully authored lesson content distinction?
Do I understand QA/smoke requirements by change type?
Do I understand the agent output contract?
```

If any answer is no, the spec has not been read carefully enough.

---

## 64. v1.0 Closing Canon

This v1.0 document supersedes the prior standalone synthesis docs as a handoff artifact. It preserves the repo canon and extends it with full app requirements. The source-of-truth sequence is:

```text
1. Existing repo and merged docs canon for current implementation truth.
2. This v1.0 document for full app product/build intent.
3. Future PRs for executable implementation changes.
```

Do not treat this document as permission to make broad runtime changes without PR scope, validations, and appropriate smoke. Treat it as the complete map of the app we are building.

---

## 65. Lexique Memory / Mastery v0.1 Numeric Contract (Faz 4A, 2026-07-02)

> Appended after the verbatim v1.0 import. This section fills the §9.3/§9.4
> formula gap (KNOWN_GAPS #2) with a deterministic v0.1 contract so two agents
> cannot build two different mastery systems. Where §65 gives a number or gate
> and an earlier section gives only prose, **§65 wins**. Roadmap phase: Faz 4A
> (docs, this section). Implementation: Faz 4B (pure module + tests),
> separately reviewed. Nothing here authorizes renderer/UI or event-schema
> changes.

### 65.1 Decision record — Option A (LOCKED, operator-approved 2026-07-02)

```text
The Lexique Memory scores and lifecycle are a DERIVED LAYER over the frozen
mastery-v0.2 substrate (content/learning-engine/mastery.ts).

- The existing reducer (scoreEvent/scoreEvents) remains the canonical event
  fold. It is not modified, not replaced, not migrated.
- All §9.3 scores and the lifecycle status are pure projections:
  deriveLexiqueMemory(itemMastery, now) → LexiqueMemoryState.
- No stored mutation in v0.1: deriving is a read; nothing is written back.
- `now` is always an explicit argument. No hidden Date.now() in the pure
  engine (house rule shared by mastery.ts, mon-lexique.ts, practice-pool.ts).
- Counters whose source events do not exist yet stay 0/null until the named
  event ships. Nothing is inferred heuristically to fake a signal.
- ItemIds are opaque, stable inputs. No rename/merge/migration behavior in
  this phase (§55 debts stay parked in KNOWN_GAPS).
```

Honesty notes preserved from the proposal review:

```text
1. The §36.2 telemetry vocabulary is NOT implemented. The real event log has
   one shape (LearningEvent: operation + result:ErrorTagCode). §65.8 labels
   every input event [exists] / [new event needed] / [derive, no event].
2. ghost/exposure state is UNREACHABLE in v0.1: model-answer exposure emits no
   event today, so exposure-only items are absent from the snapshot. The state
   is specified now and becomes populated when exposure_seen/item_seen events
   land. Fail-safe: nothing can be over-credited in the meantime.
3. Taxonomy-specific weakness (wrong_auxiliary_faim, protected_chunk_split,
   sentence_replay, …) is DEFERRED until Error Engine taxonomy tags enter the
   event log. v0.1 weakness derives only from what the log carries
   (wrongCount, weakTags). exposure_gap_allowed must never count as weakness.
```

### 65.2 Field contract

Substrate = shipped `ItemMastery` (mastery-v0.2). **[derived]** = computed by
`deriveLexiqueMemory`, never stored. **[v0.1 = 0/null]** = specified now,
frozen at its initial value until the named event exists.

| Field | Meaning | Source | Update / derive rule | Range | Init | Must NOT |
|---|---|---|---|---|---|---|
| `seenCount` | contacts of any kind | substrate `seenCount` | +1 per event touching the itemId; later also `item_seen`/`exposure_seen` | int ≥0 | 0 | feed strength directly |
| `recognitionCount` | correct identifications | substrate `recognitionSuccess` | +1 per successful recognition-op event | int ≥0 | 0 | imply production; be advanced by mere sight |
| `productionCount` | production attempts | substrate `productionAttempts` | +1 per production-op event | int ≥0 | 0 | count reveals/compares as attempts |
| `successfulProductionCount` | accepted productions | substrate `productionSuccess` | +1 when result ∈ {correct, accepted_variant} on a production op | int ≥0 | 0 | count near-misses as success or failure (precision policy) |
| `repairCount` | completed guided repairs | `repair_completed` **[new event needed]** | +1 per completed repair | int ≥0 | **v0.1 = 0** | be inferred from retries without the event |
| `transferCount` | old chip used in a new structure/context | production event with `context:"transfer"` tag **[new event needed]** | +1 per tagged success | int ≥0 | **v0.1 = 0** | be inferred heuristically; count sentence replay (§11.2) |
| `recombinationCount` | known parts combined into a new line | same mechanism, `"recombination"` tag | +1 per tagged success | int ≥0 | **v0.1 = 0** | double-count with transfer on one event |
| `lastSeenAt` | last contact time | substrate | set to event.timestamp per contact | epoch ms / null | null | be set by opening Mon Lexique |
| `lastProducedAt` | last successful production | substrate | set on accepted production | epoch ms / null | null | be set by recognition/exposure |
| `lastRepairedAt` | last completed repair | `repair_completed` **[new event needed]** | set on repair completion | epoch ms / null | **v0.1 = null** | — |
| `strengthScore` | internal ownership confidence | **[derived]** | §65.4 formula | 0..1 | 0 | rise from seen/open/exposure; be shown raw |
| `weaknessScore` | instability signal | **[derived]** | §65.4 formula | 0..1 | 0 | rise from near-misses; drop below floor while everWeak; be shown raw |
| `decayScore` | staleness | **[derived]**, needs `now` | §65.4 formula | 0..1 | 0 | lower strength itself; be shown raw |
| `refreshDueScore` | combined refresh need | **[derived]** | §65.4 formula | 0..1 | 0 | act as a flashcard queue by itself |
| `carryoverEligibility` | may return inside a lesson | **[derived per query]** (needs lesson contextTags input) | §65.6 gate + priority | `excluded` \| `eligible` \| `priority` | `excluded` | be stored; be conflated with flashcards |
| `flashcardEligibility` | explicit review candidate | **[derived]** from shipped `practiceEligibility` + `isItemDue(dueAt, now)` | `none` unless eligibility ≠ none ∧ due | `none` \| `due` \| `eligible` | `none` | drive lesson carryover (separate systems, §9.1) |
| `exposureOnly` | seen but never asked/answered | **[derived]** | `seenCount>0 ∧ productionCount=0 ∧ recognitionCount=0` | bool | false | ever project to "Known"; **empty set in v0.1** until exposure events exist |
| `lifecycleStatus` | intrinsic phase | **[derived]** | §65.5, evaluated top-down | 8 intrinsic states (+ `recycled` role, §65.5) | `unknown` | be a stored mutation; skip production gates |

### 65.3 Numeric constants (v0.1 defaults)

| Constant | Default | Meaning | Lock status |
|---|---|---|---|
| `STRENGTH_K` | 2.5 | saturation constant, strength | provisional |
| `w_production` | 1.0 | strength weight: successful production | provisional |
| `w_transfer` | 0.7 | strength weight: transfer (inactive in v0.1) | provisional |
| `w_recombination` | 0.7 | strength weight: recombination (inactive in v0.1) | provisional |
| `w_repair` | 0.5 | strength weight: successful repair (inactive in v0.1) | provisional |
| `w_recognition` | 0.25 | strength weight: recognition success | **near-locked ordering**: must stay ≪ `w_production` |
| `STRONG_THRESHOLD` | 0.70 | strength for strong / "Known" | provisional |
| `SUPPORTED_THRESHOLD` | 0.40 | strength for supported / "Getting stronger" | provisional |
| `WEAKNESS_K` | 2.0 | saturation constant, weakness | provisional |
| `REPAIR_DISCOUNT` | 0.5 | offset per repair / later success against a failure | provisional |
| `WEAK_RESIDUAL_FLOOR` | 0.15 | weakness floor while everWeak | **near-locked rule**, value tunable |
| `HALF_LIFE_DEFAULT_DAYS` | 5 | decay half-life, non-strong items | provisional |
| `HALF_LIFE_STRONG_DAYS` | 14 | decay half-life, strong items | provisional |
| `REFRESH_DUE_THRESHOLD` | 0.50 | refreshDueScore that surfaces an item | provisional |
| `DORMANT_DECAY_THRESHOLD` | 0.50 | decay at which an unselected strong item rests | provisional |
| `RECENT_USE_DAYS` | 1 | window suppressing refresh right after use | provisional |
| `RECENT_USE_PENALTY` | 0.5 | refresh suppression amount inside that window | provisional |
| `WEAK_THRESHOLD` | 3 | reused from shipped mastery.ts unchanged | **locked (shipped)** |
| `TARGET_LOAD_MIN_SHARE` | 0.50 | target's minimum load share per sentence | **near-locked rule**, value tunable |

### 65.4 Scoring formulas

All pure, clamped to [0,1], `now` as an explicit argument.

**strengthScore** — saturating, monotone in successes only:

```text
W = 1.0·successfulProductionCount
  + 0.7·transferCount            // 0 in v0.1 (no source event)
  + 0.7·recombinationCount       // 0 in v0.1
  + 0.5·repairCount              // 0 in v0.1
  + 0.25·recognitionCount
strengthScore = 1 − exp(−W / 2.5)
```

Anchors: 1 production ≈ 0.33; 3 productions ≈ 0.70 (Known threshold);
1 recognition alone ≈ 0.095 — a single recognition can never cross
SUPPORTED_THRESHOLD. No seen/open/exposure term exists, so those inputs
cannot raise strength.

**weaknessScore** — real errors up, recovery down, floor while ever-weak:

```text
activeFailures = max(0, wrongCount − 0.5·(repairCount + lateSuccessCount))
raw            = 1 − exp(−activeFailures / 2.0)
weaknessScore  = everWeak ? max(raw, 0.15) : raw
```

`wrongCount` already excludes near-misses (shipped precision policy is
inherited unchanged). `lateSuccessCount` = successful productions after the
most recent failure. Taxonomy-weighted boosts are deferred (§65.1 note 3);
`exposure_gap_allowed` must NEVER increase weakness.

**decayScore** — two-bucket exponential; explicitly not a spaced-repetition engine:

```text
H = strengthScore ≥ 0.70 ? 14 : 5     // days
decayScore = lastSeenAt == null ? 0
           : 1 − 0.5^(daysSince(lastSeenAt, now) / H)
```

Starts at 0 on contact; 0.5 at one half-life. Decay never lowers
strengthScore itself — it only feeds refreshDueScore and the dormant gate.
The shipped Leitner `dueAt` clock keeps driving Practice/flashcard due-ness;
decayScore drives LESSON-SIDE refresh only. Two clocks, two jobs — do not
merge them without a new decision.

**refreshDueScore** — item-intrinsic surfacing signal (context fit is applied
later, at carryover selection):

```text
ownedGate       = strengthScore ≥ 0.40 ? 1 : 0
recentPenalty   = daysSince(lastSeenAt, now) < 1 ? 0.5 : 0
refreshDueScore = clamp01( max(weaknessScore, decayScore·ownedGate) − recentPenalty )
```

refreshDue at ≥ 0.50: an owned item has decayed, or weakness is high
regardless of decay. Stays dormant when strong-and-decayed but under
threshold, or just used. Most provisional formula in this contract — expect
tuning once telemetry exists.

### 65.5 Intrinsic lifecycle contract

**Eight intrinsic states** are derivable from `itemMastery + now` alone:
`unknown`, `ghost`, `recognition`, `activeNew`, `supported`, `strong`,
`dormant`, `refreshDue`.

**`recycled` is a query-time carryover role produced by the Carryover
Selector, not a stored mastery mutation in v0.1.** It cannot be derived from
`itemMastery + now` alone because it depends on lesson context (which lesson
is asking, with which contextTags). If a future event makes reuse intrinsic
(e.g. a tagged carryover production event), `recycled` may be promoted to an
intrinsic state in a separately-reviewed contract bump.

Transition gates ("P" = successfulProductionCount, "R" = recognitionCount,
"str/dec/refr" = §65.4 scores):

| From → To | Gate | Production required? | Exposure-only can? |
|---|---|---|---|
| unknown → ghost | seenCount ≥ 1, P=0, R=0 (exposure contact only) | No | **Yes** — this is the exposure path (v0.1: unreachable until exposure events ship) |
| unknown/ghost → recognition | R ≥ 1, P=0 — requires a correct recognition ANSWER | No | No (mere sight is not recognition) |
| recognition → activeNew | first production attempt in the item's active lesson; str < 0.40 | Yes (attempt) | No |
| activeNew → supported | P ≥ 1 and 0.40 ≤ str < 0.70 | Yes | No |
| supported → strong | str ≥ 0.70 | Yes | No |
| strong → dormant | dec ≥ 0.50 and not selected for carryover | No | No |
| owned (str ≥ 0.40) → refreshDue | refr ≥ 0.50 | No | No |
| refreshDue/dormant → strong/supported | later successful production restores str, resets staleness | Yes | No |

Invariants (all by construction):

```text
- Exposure-only tops out at ghost/recognition: the chain to strong gates on
  production, so seen-only can never become Known (§49.4, §58.4).
- deriveLexiqueMemory is a pure read: opening Mon Lexique appends nothing,
  so nothing moves (§49.4).
- Repair improves memory but preserves the weakness signal (WEAK_RESIDUAL_FLOOR).
- Strong items can leave only via time: dormant or refreshDue.
- ItemIds remain stable; no migration behavior in this phase.
```

### 65.6 Carryover budget contract (v0.1)

| Budget | Default | Canon enforced |
|---|---|---|
| Visible carryover chips per screen | ≤ 3 | visible carryover stays capped |
| Recycled items per sentence | ≤ 2 | recycle load must support |
| Exposure items per Weave/model answer | ≤ 2 | exposure optional and capped |
| Weak items deliberately reintroduced per sentence | ≤ 1 | repair never piles onto new load |
| Target load share per sentence | ≥ 0.50 (hard post-check) | **Recycle cannot steal the lesson** |

```text
Recycle cannot steal the lesson.
Target load must stay dominant.
Old chips support the new target; they do not become the lesson.
```

Priority among context-fit candidates (hard gate first, highest score wins):

```text
if !contextFit(item, lessonTags) → excluded
priority = 3·weaknessReturn + 2·refreshDueScore + 1·transferReadyStrong
         + 0.5·recentCarryIn − clutterPenalty
```

Always excluded:

```text
- too recent AND already strong (strong ∧ seen < RECENT_USE_DAYS)
- not context-fit
- exposure-only wherever the slot requires production
  (the Error Engine's ghost_required_by_mistake guard backs this)
- itemIds with known identity ambiguity (noun-cafe/chunk-un-cafe,
  noun-question/chunk-une-question — §55.2 debts)
- full-sentence chips (already lint-blocked at the recap surface; the
  selector must not reintroduce them elsewhere)
```

After selection, if the target's load share is below 0.50, drop the
lowest-priority recycles until it holds — budget arithmetic, not judgment.

### 65.7 Mon Lexique projection (v0.1)

| Intrinsic state | Friendly status |
|---|---|
| ghost | Seen in model answers (v0.1: empty set until exposure events land) |
| recognition | Seen |
| activeNew | Tried |
| supported | Getting stronger |
| strong | Known |
| refreshDue (incl. weakness return) | Try again soon |

`recycled` (query-time role): displays as Getting stronger or Known per the
underlying intrinsic state; may later be annotated "used again" if the UI
supports it; not required for the MVP projection.

Always hidden from learners: raw scores (strength/weakness/decay/refreshDue),
all counts, weakTags, precisionTags, Leitner box, raw dueAt, itemId (dev-only
debug). No percentages; no "weak / failed / decay" wording anywhere
learner-facing. Opening the screen or a detail card emits at most telemetry —
never a mastery-relevant event.

The shipped 2-state `mon-lexique.ts` selector keeps working untouched until a
separately-reviewed, smoke-tested UI PR adopts the 6-band projection.

### 65.8 Event-to-memory update table

| Event | Status today | v0.1 memory effect |
|---|---|---|
| `answer_submitted` (= the one real LearningEvent) | **[exists]** | full scoreEvent fold: counts, Leitner, prompt-fade, weak/precision tags |
| `item_produced` | **[exists]** (production ops) | productionCount / successfulProductionCount, lastProducedAt → strength ↑ |
| `item_recognized` | **[exists]** (`recognition` op) | recognitionCount → strength ↑ (small) |
| `weave_attempted` | **[exists]** (`open_production` / `free_conversation`) | graded via Error Engine verdicts; production credit only for produced targets; exposure_gap_allowed is never weakness |
| `lesson_completed` | **[exists]** (progress layer) | lesson status only; no per-item mastery |
| `screen_seen` / `item_seen` | **[new event needed]** | seenCount+1, lastSeenAt; no mastery |
| `exposure_seen` | **[new event needed]** | seenCount+1; item stays ≤ ghost; **never active mastery** |
| `answer_compared` | **[new event needed]** | none by default (seeing the model ≠ producing) |
| `repair_triggered` / `repair_completed` | **[new event needed]** | repairCount, lastRepairedAt; weakness ↓ with floor; strength ↑ via w_repair |
| `micro_logic_seen` / `chunk_unpack_seen` | **[new event needed]** | seen/notice only; **never production** (§12.9) |
| `sound_note_seen` | **[new event needed]** | listening-awareness flag later; **never production mastery** |
| `lexique_opened` / `mon_lexique_entry_opened` | **[new event needed]** | telemetry only; **zero mastery mutation** |
| transfer / recombination tag | **[new event field needed]** | transferCount / recombinationCount ↑ → strength; requires exercise metadata |

Net: v0.1 scores are computable entirely from events that already exist.
Every not-yet-real input is a named counter frozen at 0/null behind a named
event — nothing is faked, nothing blocks.

### 65.9 Faz 4B test plan (docs-only; tests authored in Faz 4B)

Home: `scripts/tests/lexiqueMemory.test.ts` (+ later
`carryoverSelector.test.ts`), registered in `scripts/tests/run.ts` — both
names already anticipated by §23.2.

```text
- Deterministic units: fixed inputs → fixed outputs per formula, including
  anchors (strength(P=3) ≈ 0.70; decay(daysSince = H) = 0.5).
- Property-style: strength monotone non-decreasing in each success input;
  decay monotone in time; all scores ∈ [0,1]; decay never increases strength;
  a single recognition stays below SUPPORTED_THRESHOLD; seen/open/exposure
  inputs leave strength bit-identical.
- Lifecycle transitions: table-driven over §65.5, plus illegal-jump
  assertions (ghost → strong impossible without production).
- No mastery from Mon Lexique open: derive twice with the same inputs →
  deep-equal; the function takes no event log to append to.
- Exposure-only never Known: for any now, exposure-only input never projects
  to "Known".
- Repair improves but preserves weakness signal: fail×3 → repair → succeed
  leaves weaknessScore ≥ WEAK_RESIDUAL_FLOOR while everWeak.
- Strong-but-stale becomes refreshDue: str ≥ 0.70 with daysSince ≥ ~14
  crosses REFRESH_DUE_THRESHOLD.
- Carryover budget does not steal target: arbitrary candidate sets respect
  all caps and target share ≥ TARGET_LOAD_MIN_SHARE; exposure never fills a
  production slot.
```

