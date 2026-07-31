---
title: Cairn L1-L10 Exercise Variation Inventory
version: 0.1
status: Draft — vertical-slice planning artifact
canon_status: non-canonical
implementation_status: not-started
owner: founder + product/engineering review
created: 2026-07-31
scope: L1-L10 real-deal vertical slice — normalized learner-facing learning-surface inventory
parent_charter: docs/workstreams/L1_L10_VERTICAL_SLICE_CHARTER_v0.1.md
related:
  - docs/EXERCISE_CANON_v0.4.md
  - docs/bibles/content/CONTENT_BIBLE_v1.0.md
  - docs/bibles/mastery-evidence/MASTERY_EVIDENCE_BIBLE_v1.0.md
  - docs/bibles/curriculum/CURRICULUM_CHARTER_v1.0.md
  - docs/bibles/curriculum/PRJ_015_ITEM_COUNTING_CONTRACT_v1.0.md
  - docs/canon/LESSON_FLOW_CANON_v1.md
  - docs/learning-engine-v1.md
  - docs/syllabus/chip-taxonomy-and-lexique-lifecycle-v0.3.md
  - docs/CONTENT_FACTORY_CONTRACT.md
  - docs/PAYLOAD_ECONOMY_v0.md
  - docs/CAIRN_PRODUCT_ANSWERS_2026_07.md
---

# Cairn L1-L10 Exercise Variation Inventory v0.1

> [!warning] **Status: Draft — vertical-slice planning artifact.**
> This document:
>
> - is **not Canonical** and must not be cited as Canonical authority;
> - **does not override** any Canonical document (Content Bible, Mastery & Evidence Bible,
>   Curriculum Charter, PRJ-015, Lesson Flow Canon, Exercise Canon, Payload Economy,
>   Content Factory Contract) — where this inventory and a Canonical source disagree,
>   the Canonical source wins and the gap must be surfaced;
> - **does not authorize implementation** — no runtime, schema, validator, lesson,
>   feature-flag, registry, or Content Factory change follows from this document;
> - is a **normalized source-and-recommendation inventory** for the L1-L10 real-deal
>   vertical slice (Vertical Slice Charter §7 / §16 deliverable 1, plus the
>   interstitial material feeding deliverable 2).
>
> Facts and recommendations are kept distinguishable throughout: **[SOURCE]** rows cite
> where a mechanic was found; **[REC]** marks this inventory's own recommendation.
> `EV-###` / `IS-###` identifiers are inventory-only draft IDs. **Do not add them to
> runtime schemas, registries, or events.**

---

## 1. Executive summary

- **Raw named mechanics found:** the §4 ledger holds **205 rows** covering **~230 distinct raw
  names** (several rows carry explicit name clusters, e.g. the Dictée family, the 11-type
  product taxonomy, the Insight-Card set). Sources: three parallel runtimes, EXERCISE_CANON
  v0.4, the Obsidian Active Codex + Tasarım Envanteri archive, the Lesson Flow Canon, and the
  task brief's not-in-repo candidates.
- **Normalized exercise variations:** **47** (EV-001…EV-075, non-contiguous), grouped in six
  families (exposure/input 4 · recognition/discrimination 12 · recall/fill/assembly 7 ·
  weave/production 13 · repair/naturalness 5 · review/diagnostic/dialogue/personal 6). The
  count was derived from sources, not forced toward a quota.
- **Interstitial / reveal / popup / detail surfaces:** **31** (IS-01…IS-31), kept strictly
  outside the assessed-exercise count (§9).
- **Aliases and payload modes merged:** **83 ledger rows** resolve into existing variations as
  aliases or payload modes (e.g. French Fill + Weave Fill + Soft Cloze + Context Fill +
  Package Choice → EV-010; Micro/Guided/Sentence/Context Dictée → one EV-034 contract;
  Shadow-the-Chunk/Moment + Speak Once + Listen-and-Repeat → EV-004).
- **Excluded non-exercise material:** selectors/scheduling (SRS, carryover, error replay,
  Readiness Gate, Bon Retour), system states (transitions, outros, caps, offline/empty states,
  thresholds), content-lifecycle behaviors (Progressive Recomposition, Need Queue,
  generated-but-validated variants), and feature surfaces (Practice Hub, Chat, Mon Lexique,
  Stats) — each recorded with a destination, none counted as an exercise.
- **Runtime distribution (ledger rows, approximate):** shipped lesson-v1 ~8%; legacy-hidden or
  legacy-dead ~23%; sandbox learning-engine ~7%; canon-planned (no runtime) ~34%;
  archive/historical ~19%; brief-supplied (not in repo) ~12%. Only **5 variations** have
  learner-visible runtime today (EV-001, EV-010, EV-040, EV-041, EV-042) — the shipped surface
  currently produces **no conforming learning evidence** (Mastery Bible §37).
- **Priority distribution (§15, post-fold):** **P0 = 12** variations · **P1 = 25** (including
  Dictée as selective showcase and the two bounded chip pilots) · **P2 = 10** ·
  **Reject/merge = 6**. Interstitials: 17 of 31 are P0. Totals recomputed from the §5 rows
  after the 2026-07-31 decision fold.
- **Decision fold (2026-07-31, §16):** Dictée is **in** as selective P1 (Micro + Guided +
  selected Sentence; Context mode deferred). Chip Decomposition (EV-036) and Chip Rebuild
  (EV-035) are **P1 bounded pilots** on authored high-reuse structures; Chip Anatomy Reveal
  stays a P0 surface capability. Flashcards ship **four primary directions** (intent/meaning →
  FR recall · sentence context → missing piece · scenario → response recall · audio →
  meaning/target recognition) with FR → meaning as selective support only. Shadowing (EV-004)
  and Audio Recognition (EV-014) are definitive P1; Minimal-Pair (EV-015) and Hear the Shape
  (EV-016) stay P2. Survival Mode (EV-063) is P1 with **no timer/pressure framing**. Le Carnet
  (EV-075) is **out of the slice** (P2/deferred, architecture-compatible).
- **Major evidence and runtime gaps:** (1) no shipped surface emits `LearningEvent`s — the
  entire evidence spine is sandbox-only; (2) no runtime exists for boards, stateful/fading
  cards, repair input, self-check projections, or any audio-recorded mechanic; (3) hint level
  does not reach the evidence layer (FQ-3 gap); (4) attribution/admissibility gates exist as
  ratified semantics with zero implementation; (5) the EXERCISE_CANON **v0.3 family tables are
  absent from the repo**, leaving several named families (Anchor Break, Piece Bench detail)
  under-specified; (6) flashcards/Daily Review/Practice exist only as quarantined legacy that
  must be rebuilt as projections; (7) Dictée, chip decomposition/rebuild, semantic ranking, and
  minimal-pair audio work have no source runtime at all.
- **Founder/product decisions:** all seven surfaced decisions (FD-1…FD-7) were **decided in
  the 2026-07-31 fold** (§16.1); none remains open. What remains is implementation/pilot
  calibration only (§16.2): decomposition-pilot instance placement, per-lesson Dictée counts,
  final human-audio coverage percentage, flashcard selector weights.

---

## 2. Source and authority model

### 2.1 Authority classes used

| Class | Role in this inventory | Sources |
|---|---|---|
| **Canonical authority** | Governs semantics this inventory must respect (evidence, error, A/R/G, chip rules, counting) | `CONTENT_BIBLE_v1.0` · `MASTERY_EVIDENCE_BIBLE_v1.0` · `CURRICULUM_CHARTER_v1.0` · `PRJ_015_ITEM_COUNTING_CONTRACT_v1.0` |
| **Closed design canon / working canon** | Supplies lesson-flow structure, exercise families, named concepts, validator intent | `LESSON_FLOW_CANON_v1` · `EXERCISE_CANON_v0.4` · `PAYLOAD_ECONOMY_v0` · `CAIRN_PRODUCT_ANSWERS_2026_07` (W1/W2/C1/C2/S1) · `chip-taxonomy-and-lexique-lifecycle-v0.3` · `learning-engine-v1` · `CONTENT_FACTORY_CONTRACT` |
| **Workstream contract** | Frames the slice this inventory serves; supplies interstitial list, popup primitives, evidence rule for pop-ups | `L1_L10_VERTICAL_SLICE_CHARTER_v0.1` (Draft, non-canonical) |
| **Active Codex (Obsidian)** | Derived system-spec notes; supply per-exercise runtime status, the Selection/Evidence/Error/Anti-Pattern matrices, the 11-type product taxonomy | `obsidian-product-brain/ACTIVE_CODEX/03_EXERCISES/*`, `02_LEARNING_SYSTEM/*`, `12_RESEARCH_AND_IDEAS/Lesson Mechanics Ideas.md` |
| **Implementation reality (Axis B)** | Establishes what runs today; never establishes what should be canon (Mastery Bible §2.2) | `lemot-app/lib/types.ts` · `constants/sections.ts` · `content/learning-engine/types.ts` + `events.ts` · `content/lessonTypes.ts` · `components/sections/*` · `components/lesson-v1/*` · `components/learning-engine/*` · `DailyReviewOverlay.tsx` · `LessonPractice.tsx` · `app/(tabs)/practice.tsx` · `hooks/useSRS.ts` · validators (`validatePools.ts`, `validateContent.ts`, `canonRules.ts`) · `config/productStage.ts` |
| **Historical / archive** | Supplies names and mechanics only; never overrides active authority | `SOURCE_ARCHIVE/AVAILABLE_INPUTS/Tasarim_Envanteri.md` (§19 Sprint-11 mechanics; header: "mixed historical note — verify against active canon") · `Learning_Engine_and_Exercise_Types.md` · legacy v7 lesson data |
| **Task brief (founder, 2026-07-31)** | Supplies candidate names not present in the repository (Dictée family, chip-decomposition set, several recognition/production aliases, candidate L1 sentences). Evaluated, not assumed approved. | this workstream's commissioning brief |

### 2.2 Which source supplied what

- **Current authority** on evidence/error semantics: Mastery & Evidence Bible (admissibility gates,
  polarity-by-meaning FQ-1, assistance FQ-3, weakness FQ-4, non-signals §8, error-source classes §7).
- **Current authority** on authoring/presentation: Content Bible (7 frozen screen types §6.3,
  Weave W1 §8.3, Natural Reveal §10, Reading rule §11, insight rules §7, chip rules §4).
- **Current authority** on sequence: Curriculum Charter (L0-L17 spine CC-004; L1-L10 =
  L1 Survival Kit … L10 integration "Une petite journée"; repair pair homes in the L1 redesign CC-007).
- **Implementation reality**: the three parallel runtimes — legacy v7 11-section flow
  (dev-apk-hidden), lesson-v1 7-screen renderer (shipped, L1-L6 visible), learning-engine
  renderer (sandbox-gated) — plus legacy Practice/Flashcards/Daily Review/SRS
  (all `FEATURES.* = false` in dev-apk, marked "LEGACY — DO NOT BUILD ON THIS").
- **Historical names**: Tasarım Envanteri §19 (Stay-with-It listening set, Insight Card set,
  Practice expansion set, Pieces mechanics, How Weave Works), EXERCISE_CANON §12/§15 named
  concepts and families, legacy v7 section and review sub-types.

### 2.3 Known conflicts and how they were handled

| Conflict | Handling |
|---|---|
| The full EXERCISE_CANON **v0.3 family tables (§11.1-11.14) are not in the repo**; v0.4 references them as the family canon | Families are inventoried from v0.4's §15 fit-matrix, §12 named concepts, and §5.2 hub composition. Rows relying on the missing v0.3 detail are marked `v0.3-gap`. Reconstructing v0.3 §11 (and the truncated §16 scale-validator list) with the founder remains an open dependency, **not resolved here**. |
| Legacy 11-section flow vs 7 frozen v1 screen types | Content Bible §20.4 supersedes the 11-section flow. Legacy sections appear in the ledger as historical names; normalization maps their pedagogy onto slice variations, not their runtime. |
| Le Carnet: task brief notes historical journey material "around L10"; repo classifies it ARCHIVE/deferred | No repo source places Le Carnet at L10 (closest adjacency: C2 chip-less easy Say It "from ~L10", `CAIRN_PRODUCT_ANSWERS` §6). Conflict surfaced as FD-1 and **decided 2026-07-31 (§16.1): out of the slice**; the historical L10 note stays history. |
| Dictée: task brief mandates evaluation; repo contains only "Guided Dictation v2 stays Later/limited" (EXERCISE_CANON §11 edit 6) | Dictée normalized as one explicit variation (EV-034) with a full contract (§12); slice disposition **decided 2026-07-31 (FD-3, §16.1): in, selective P1** — Micro/Guided/selected Sentence; Context deferred. |
| "Type set frozen at 7" (LESSON_FLOW §12, Content Bible §6.3) vs "~10 (D-32)" (Lesson Mechanics Ideas) | Treated as a naming/count tension in sources; this inventory assumes the Content Bible's **7 frozen lesson screen types** and follows EXERCISE_CANON §4's rule that new patterns land **Practice-Hub-first**, so no recommendation here adds a lesson screen type. |
| Charter expects "~35-40 genuine exercise variations"; task brief expects "~40-50" | Count derived from sources, not forced (result: see §1). No mechanic was invented to reach a number; none was collapsed to shrink one. |
| Legacy runtime variants that exist in types but not in renderers (`truefalse`, `order`, `match`, `scramble`, weave known/sample) | Recorded as Axis-B facts. Existence in code is **not** treated as product approval (per task rule and Mastery Bible §2.2). |

---

## 3. Normalization rules and terminology

### 3.1 Terminology (used consistently below)

| Term | Definition |
|---|---|
| **Exercise family** | A pedagogical grouping of variations sharing a learning purpose (e.g. recognition & discrimination; repair). Families organize; they are not runtime units. |
| **Exercise variation** | A normalized learner-facing mechanic requiring a **materially different learner action, evidence interpretation, or pedagogical contract** from every other variation. The unit of this inventory (`EV-###`). |
| **Renderer** | A reusable runtime component/primitive that can present one or more variations (e.g. a choice card). Many variations : few renderers. |
| **Payload / difficulty mode** | A variation's authored configuration that changes content or difficulty without changing the learner-action/evidence contract (e.g. pure-French vs mixed-scaffold fill; micro vs sentence Dictée). |
| **Interstitial** | A learner-facing insight/exposure surface inside a flow that is **not assessed** (e.g. Faux Ami card). Produces at most exposure/engagement events. |
| **Reveal surface** | A post-attempt or on-demand surface that shows model/natural language and why it works (Natural Reveal, Answer Reveal). Not an exercise. |
| **Feedback surface** | A surface interpreting the learner's attempt (verdict copy, trap explanation, confirm step, "Take another look"). Not an exercise. |
| **Popup / detail surface** | A tap-opened informational surface (quick peek, bottom sheet, detail screen). Opening one is engagement/exposure, never mastery (Charter §6.3). |
| **Selector / scheduling behavior** | Logic choosing *which* instances appear when (SRS due, carryover, error replay, readiness warm-up, Bon Retour). Not a variation. |
| **System state** | Loading/empty/error/offline/cap states, transitions, dialogs, result colors, copy variants. Never counted as exercises. |
| **Content-lifecycle behavior** | Authoring/derivation behavior over time (unpack-later, progressive recomposition, generated-but-validated variants). Content Factory + selector territory, not a renderer. |
| **Feature surface** | A product surface hosting variations/projections (Practice Hub, Flashcards, Daily Review, Mon Lexique, Stats). |

### 3.2 What qualifies as a separate variation

A candidate became its **own EV** only when at least one of these differs materially from every
existing EV: (a) the learner's action class (tap/choose/build/produce/speak/self-grade);
(b) the evidence interpretation (what a success/failure may safely prove under the Mastery Bible);
(c) the pedagogical contract (graded vs ungraded-by-design, constraint type, repair vs naturalness,
recognition vs recall direction).

It stayed a **payload mode** when only content, scaffolding density, or theme differs
(e.g. Soft Cloze = calm 3-option fill; Package Choice = article-package fill; Micro vs Sentence
Dictée). It became an **alias** when sources name the same contract differently
(e.g. Franglais → Weave; Arrange Tiles → Build). It routed to **interstitial/detail** when no
learner answer is assessed; to **selector** when the mechanic is "when/what returns", not "what
the learner does"; to **system state** when it is UI state; to **feature-surface planning** when
it is a host surface, not a mechanic.

Guardrails applied (from the task brief + canon):

- Dictée is **not** collapsed into listening recognition (audio → written French controlled production).
- Chip Decomposition is **not** collapsed into generic Build; Chip Anatomy Reveal is a detail
  surface producing **no mastery evidence**.
- Shadowing is **not** merged with pronunciation scoring; Scene Repair is **not** merged with
  grammatical Error Correction; Scenario Recall (self-check) is **not** merged with scored MCQ;
  semantic ranking is **not** merged with sentence ordering; Open Weave is **not** merged with
  Supported Weave; Say It Your Way is **not** merged with A Small Moment.
- Ghost material never becomes required production anywhere in this inventory (CB §4.10, I-9).
- Aliases are not duplicated as separate exercises; loading states, popup layouts, result colors,
  copy variants, and generic dialogs are excluded from the exercise count.

---

## 4. Raw mechanic ledger

Every source-derived named mechanic, **before** normalization. Status codes:
`shipped-v1` (lesson-v1 renderer, learner-visible) · `legacy-hidden` (implemented, dev-apk-hidden)
· `legacy-dead` (typed/authored but unreachable or unrendered) · `sandbox` (learning-engine,
founder-gated) · `canon-planned` (design canon, no runtime) · `archive` (historical inventory)
· `idea` (research/idea tier) · `brief` (task-brief-supplied, not found in repo) · `rejected`
(explicitly removed by canon). Destinations: `EV-###` (variation), `→EV-### payload` /
`→EV-### alias`, `IS-###` (interstitial/detail), `SEL` (selector), `SYS` (system state),
`LIFE` (content-lifecycle), `FEAT` (feature surface), `REJ` (reject).

### 4.A Runtime — lesson-v1 (shipped 7-screen renderer)

| Raw name | Source | Status | Apparent family | Initial classification | Normalized destination |
|---|---|---|---|---|---|
| meet-card (Meet It) | `content/lessonTypes.ts`; 03_EXERCISES/Meet.md | shipped-v1 | exposure | exercise (discovery) | EV-001 |
| insight-card | `lessonTypes.ts`; Insight and Notice.md | shipped-v1 | interstitial | interstitial | IS-01..IS-06 (by `InsightType`) |
| fill-with-traps | `lessonTypes.ts`; Fill.md | shipped-v1 | recognition | exercise | EV-010 |
| weave (screen) | `lessonTypes.ts`; Weave.md | shipped-v1 | production | exercise | EV-040 / EV-041 |
| weaveType `supported` / `mid` / `context` | `lessonTypes.ts:120-124` | shipped-v1 | production | payload modes | →EV-040 payload |
| weaveType `open` | same; W1 lock | shipped-v1 | production | exercise (ungraded contract) | EV-041 |
| Weave hint ladder (rungs 0-1-2, +reactive 3) | Weave.md; LESSON_FLOW §8 | shipped-v1 (0-2) | assistance | assistance surface | IS-29 |
| hintCloze | `lessonTypes.ts:141` | shipped-v1 | assistance | payload of hint ladder | →IS-29 |
| say-it-your-way | `lessonTypes.ts`; Say It Your Way.md | shipped-v1 | open production | exercise (ungraded) | EV-042 |
| Say It confirm step ("You wrote… revise or keep?") | CB §9.2 | shipped-v1 | feedback | feedback surface | →EV-042 contract; IS-15 kin |
| answerBands minimal/good/natural | CB §9.3 | shipped-v1 | reveal | reveal payload (descriptive, never scores) | →IS-16 |
| natural-reveal | `lessonTypes.ts`; Natural Reveal.md | shipped-v1 | reveal | reveal surface | IS-16 |
| naturalAlternatives ("Another Way") | CB §10.3 | shipped-v1 | reveal | reveal payload | →IS-16 |
| recap ("Pieces you used") | `lessonTypes.ts`; Review.md | shipped-v1 | consolidation | interstitial (consolidation) | IS-18 |
| AnswerReveal (neutral/correct/incorrect) | `lesson-v1/screens/AnswerReveal.tsx` | shipped-v1 | feedback | feedback surface | →IS-16 kin / SYS |
| Lesson Zero beats (scene_meet · weave · reveal · familiar · rebuild · payoff) | `app/lesson-zero.tsx:61-66` | shipped-v1 | onboarding flow | flow composed of EVs | →EV-001/EV-040/IS-16/EV-031 payload |
| How Weave Works (3-card interstitial) | `/how-weave-works`; Tasarim §19.A | shipped-v1 (reachable) | interstitial | interstitial (one-time) | IS-20 |

### 4.B Runtime — legacy v7 sections and sub-mechanics (all dev-apk-hidden)

| Raw name | Source | Status | Apparent family | Initial classification | Normalized destination |
|---|---|---|---|---|---|
| Read & Listen (`read_listen`) | `sections.ts`; ReadListen.tsx | legacy-hidden | exposure | exercise (input) | →EV-001 alias (+IS-22 tap-word) |
| Patterns (`patterns`) + GrammarRenderer | Patterns.tsx | legacy-hidden | insight | interstitial (superseded grammar screen) | →IS-06/IS-13 |
| Quick Recall (patterns quickRecall MCQ) | `lib/types.ts:38-42` | legacy-hidden | recognition | payload (1-item MCQ) | →EV-010 payload |
| Weave Fill (`fill_fg`) | WeaveFill.tsx | legacy-hidden | recognition | payload (mixed-scaffold select-fill) | →EV-010 payload |
| French Fill (`fill_fr`) | FrenchFill.tsx | legacy-hidden | recognition | payload (pure-French select-fill) | →EV-010 payload |
| Build (`build`, arrange tiles + traps) | BuildSentence.tsx | legacy-hidden | assembly | exercise | EV-031 |
| Write (`fill_write`, type from memory) | WriteSection.tsx | legacy-hidden | recall | exercise | EV-030 |
| Quiz (`quiz`) MCQ | Quiz.tsx | legacy-hidden | recognition | exercise (context MCQ) / anti-pattern when isolated | →EV-011 / REJ (EV-091 shape) |
| Quiz `negative` ("SPOT THE MISTAKE") | Quiz.tsx; `types.ts:98` | legacy-hidden | discrimination | exercise | EV-012 |
| Quiz variant `truefalse` | `types.ts:101`; pool1.ts:297 | legacy-dead (renders as MCQ) | recognition | payload (binary judgment) | →EV-011 payload |
| Quiz variant `order` | `types.ts:101`; pool1.ts:311 | legacy-dead (renders as MCQ) | assembly? | payload (ordering-as-MCQ; **not** semantic ranking) | →EV-031 payload note |
| Combine (`combine_fg` phase 1) | CombineWeave.tsx | legacy-hidden | production | exercise (recombination) | EV-045 |
| Combine+Weave phase 2 (per-known-word weave) | CombineWeave.tsx | legacy-hidden | production | payload (early weave scoring shape) | →EV-040 alias |
| Say It (`say_it`) | SayItYourWay.tsx (legacy) | legacy-hidden | open production | exercise | →EV-042 alias |
| Mini Conversation (`mini_conv`, Mini Chat) | MiniConversation.tsx | legacy-unreachable | dialogue | exercise (AI-gated) | EV-074 |
| Review section (`review`, mixed set) | Review.tsx | legacy-hidden | review mix | container of sub-mechanics | rows below |
| Review `listen` (audio → MCQ) | `types.ts:186` | legacy-hidden | listening recognition | exercise | →EV-014 alias |
| Review `odd` (odd one out + reason) | `types.ts:187` | legacy-hidden | discrimination | exercise | EV-019 |
| Review `context` (situation → MCQ) | `types.ts:188` | legacy-hidden | recognition | exercise | →EV-011 alias |
| Review `fill_ctx` (context fill MCQ) | `types.ts:189` | legacy-hidden | recognition | payload | →EV-010 payload |
| Review `weave` (blanks typed) | `types.ts:191` | legacy-hidden | recall | payload (typed blanks) | →EV-030 payload |
| Review `weave` (known/sample) | `types.ts:190` | legacy-dead (no renderer branch) | production | alias | →EV-040 alias |
| Review `match` (pair matching) | `types.ts:192` | legacy-dead (no renderer, unreachable data) | recognition | exercise | EV-018 |
| Review `scramble` (letter unscramble) | `types.ts:193` | legacy-dead | orthography | reject/merge candidate | EV-090 (REJ) |
| Unlock cards (Expression/Nugget/FauxAmi/Culture/Sound ×8 rules) | `app/lesson/[id].tsx:62-116`; UnlockCard.tsx | legacy-hidden | reward overlay | interstitial after de-gamification (Tasarim: REDESIGN → Insight Card) | →IS-01..06 |
| TransitionScreen (pass / below-threshold / chunk complete) | TransitionScreen.tsx | legacy-hidden | system | system state (+ "Take Another Look" microcopy) | SYS / →IS-15 |
| Lesson Outro / completion ceremony | Tasarim §10 | legacy-hidden | system | system state (passive-mirror copy only) | SYS |
| FrText/FrMix tap-word definition | FrText.tsx | legacy-hidden | detail | popup detail | →IS-22 |
| MASTERY_THRESHOLDS per-section pass (0.6-0.7) | `constants/sections.ts:48-60` | legacy-hidden | scoring | system/scoring policy (non-conforming legacy, Mastery Bible §2.1) | SYS |
| Chat modes: Free / Lesson Focus / Error Correction / Scenarios | Tasarim §3; chat tab | legacy-hidden | AI dialogue | feature surface (out of slice: unrestricted AI chat, Charter §3.2) | FEAT / →EV-074 kin |

### 4.C Runtime — learning-engine (sandbox-gated)

| Raw name | Source | Status | Apparent family | Initial classification | Normalized destination |
|---|---|---|---|---|---|
| `recognition` op (RecognitionCard, tap-to-reveal, never graded) | `content/learning-engine/types.ts:99` | sandbox | exposure/recognition | exercise (reveal-recognition) | →EV-001/EV-070 kin (see §5 note) |
| `fill` op (FillCard, typed) | `types.ts:100` | sandbox | recall/production | exercise | →EV-030 alias |
| `build` op (BuildCard, tiles by itemId) | `types.ts:101` | sandbox | assembly | exercise | →EV-031 alias |
| `register_switch` op (direct→polite typed) | `types.ts:102` | sandbox | transformation | exercise | EV-048 |
| `context_chain` op (multi-step chain) | `types.ts:103` | sandbox | controlled production | exercise | EV-049 |
| `open_production` op | `types.ts:104` | sandbox (blocked everywhere; no blueprint/renderer) | open production | contract-level op | →EV-042/EV-041 kin |
| `free_conversation` op | `types.ts:103` | sandbox (blocked; no blueprint/renderer) | dialogue | contract-level op | →EV-074 kin |
| BoundaryLaterFormCard ("a form for later") | `BoundaryLaterFormCard.tsx`; ADR-0016 | sandbox | reveal | interstitial | IS-17 |
| Practice Pool Build / Stretch / Challenge | `practice-pool.ts:27`; CB §16.3 | sandbox | selection tiers | selector/feature framing (not a mechanic) | SEL / FEAT |
| Practice selector ("today's set", SRS due → weakest tag → need list → diversity) | `practice-selector.ts`; LESSON_FLOW §5.2 | sandbox | scheduling | selector | SEL |
| Carryover Selector | `carryover-selector.ts`; chip-taxonomy §9-10 | sandbox | lifecycle | selector | SEL |
| Lexique Memory (decay, weights) | `lexique-memory.ts` | sandbox (unwired) | engine | engine state | SYS/SEL |
| Mon Lexique shells (list + entry card) | `MonLexiqueShell.tsx` | sandbox | feature | feature surface + detail surfaces | FEAT / IS-23..27 |
| ErrorTagCode 16-value grading union | `events.ts:31-47` | sandbox (frozen YASA 3) | grading | evidence vocabulary (not a mechanic) | — (governs §6-§7) |

### 4.D Runtime — Practice tab / Flashcards / Daily Review / SRS (legacy, quarantined)

| Raw name | Source | Status | Apparent family | Initial classification | Normalized destination |
|---|---|---|---|---|---|
| Scenario card tap-to-reveal ("Tap to reveal" → answer + explanation) | `practice.tsx:368-520` | legacy-hidden | review/self-check | exercise (self-graded recall) | EV-070 |
| "Still Learning" / "Know It" self-grade buttons | `practice.tsx:489-503` | legacy-hidden | self-report | feedback behavior inside EV-070 | →EV-070 contract |
| Show me / Got it 2-button SRS feedback | Tasarim §19.G | archive | self-report | feedback behavior (not an exercise) | →EV-070 contract |
| Translate mode (EN → typed FR from FLASH) | `practice.tsx:522-717` | legacy-hidden | translation drill | reject as standalone; direction survives as flashcard projection | EV-095 (REJ) / →§11 |
| Lesson Practice mix (`fill_fg`/`fill_fr`/`quiz`/`typed_weave`) | `LessonPractice.tsx:33-37` | legacy-hidden | practice session | session composition | SEL (+ rows below) |
| Typed Weave (practice; type FR, reveal, not scored) | `lib/types.ts:126-138`; Tasarim §19.C | legacy-hidden ([VALID — in-code]) | production | payload (practice echo of supported weave) | →EV-040 payload |
| Leitner SRS 5-box `[0,1,3,7,30]` (`lm7_srs`) | `hooks/useSRS.ts` | legacy-hidden | scheduling | selector (legacy, non-conforming; do-not-build-on) | SEL |
| Daily Review overlay MCQ (`What does "X" mean?`) | `DailyReviewOverlay.tsx:140` | legacy-hidden | flashcard MCQ | **canon-rejected anti-pattern** | EV-091 (REJ) |
| 5-word daily goal + weak-spot-first sort | `index.tsx:82-128` | legacy-hidden | scheduling | selector | SEL |
| DailyReviewHook `recall` | `lessonTypes.ts:272-278` | legacy-dead (declared, no consumer) | review | hook → variation projection | →EV-033/EV-070 |
| DailyReviewHook `micro-contrast` | same | legacy-dead | review | hook | →EV-013 |
| DailyReviewHook `sound-trap` | same | legacy-dead | review | hook | →EV-015 |
| DailyReviewHook `tiny-reading` | same | legacy-dead | review | hook | →EV-002 |
| DailyReviewHook `mini-weave` | same | legacy-dead | review | hook | →EV-040 payload |
| DailyReviewHook `say-it-mini` | same | legacy-dead | review | hook | →EV-042 payload |
| FlashCard type (fr/en/cat/ex/cog/lessonId) | `lib/types.ts:229-240`; `data/flashcards.ts` (LEGACY quarantined) | legacy-hidden | data | legacy data source — **not** the new architecture | →§11 (projections replace it) |
| ScenarioCard (situation/answer/explanation/lesson/audio) | `lib/types.ts:243-249` | legacy-hidden | data | data shape feeding EV-070 | →EV-070 payload |

### 4.E EXERCISE_CANON v0.4 — named concepts, families, patterns

| Raw name | Source | Status | Apparent family | Initial classification | Normalized destination |
|---|---|---|---|---|---|
| Mayonnaise Game / Five Spellings | §12 | canon-planned | orthography (playful) | exercise | EV-020 |
| Same Middle, New Job / Same Slot, New Job (two-job) | §12, §15.5 | canon-planned | transfer | exercise | EV-046 |
| Moment Builder Board | §12, §5.2 | canon-planned (ES1 board) | moment assembly | exercise | EV-050 |
| Good Piece, Wrong Moment | §12 | canon-planned | discrimination | exercise | EV-013 |
| Keep One, Use It Again | §12, §5.2 | canon-planned | reflection/lifecycle | exercise (self-selection + delayed reuse) | EV-073 |
| Tiny Door / Future Seed | §12, §1.4 | canon-planned | exposure/reveal | interstitial ("later form") | →IS-17 |
| Smallest Repair Wins | §12 | canon-planned | repair | exercise | EV-060 |
| Piece Bench | §12 | canon-planned (v0.3-gap: definition thin) | constraint production | concept feeding board/constraint variations | →EV-043/EV-050 |
| Anchor Break | §12 | canon-planned (v0.3-gap: mechanics undefined in repo) | unknown | unresolved concept — not normalized; revisit with v0.3 tables | v0.3-gap (no EV) |
| Line Bank with Traps | §12, §15.2 | canon-planned (ES1 board) | line selection | exercise | EV-051 |
| Survival Mode | §12 | canon-planned | recovery production | exercise | EV-063 |
| Make It Natural | §12; Tasarim §19.G | canon-planned | naturalness | exercise | EV-064 |
| Two Ways to Say It | §12; Tasarim §19.G | canon-planned | naturalness | exercise | EV-064 |
| Guided Build / Listen then Build | §15.1 | canon-planned | assembly | payload (audio-prompt build) | →EV-031 payload |
| Starter Fade | §15.1 | canon-planned (ES1 stateful) | fading scaffold | exercise | EV-032 |
| Speak Once / Speak Own Moment | §15.1, §15.7 | canon-planned (audio pass) | speaking | payload (ungraded speak attempt) | →EV-004 payload |
| Function Recall → Use | §15.2, §5.2 | canon-planned | retrieval | exercise | EV-033 |
| Role Build | §15.2, §15.6 | canon-planned | assembly-in-role | payload (scene-role build) | →EV-031 payload |
| Small Moment Production | §15.2 | canon-planned | open production | alias | →EV-042 alias |
| Continue the Moment | §15.2, §5.2 | canon-planned | discourse production | exercise | EV-044 |
| Social Landing Repair | §15.2 | canon-planned (ES1) | social repair | exercise | EV-061 |
| Missing Move | §15.2, §15.7 | canon-planned | discourse discrimination/production | exercise | EV-052 |
| Recovery Choice → Recall | §15.2 | canon-planned | recognition→recall chain | payload (staged recovery pair) | →EV-063 payload |
| Engine Sort + Produce | §15.3, §15.5 | canon-planned (ES1) | discrimination + production | payload (sort stage of contrast → produce) | →EV-013 + EV-033 chain |
| Same Engine, New Layer | §15.3, §15.4 | canon-planned | transformation | exercise | EV-047 |
| Smallest Repair | §15.3-§15.6 | canon-planned (ES1 repair input) | repair | alias | →EV-060 alias |
| Pattern Family seed (c'est bon/vrai/possible) | §15.3 | canon-planned | recognition seed | interstitial/exposure payload | →IS-17/IS-13 |
| Repair to Continue (Oui, merci. / Non merci.) | §15.4 | canon-planned | repair/discourse | payload | →EV-063 payload |
| Good/Recovery vs Exit | §15.4 | canon-planned | discrimination | payload | →EV-013 payload |
| Guided French-shape Build | §15.5 | canon-planned | assembly | payload | →EV-031 payload |
| Wrong Architecture Repair (je suis faim → j'ai faim) | §15.5, §5.2 | canon-planned | repair | alias | →EV-060 alias |
| Mechanics Card (je ai → j'ai) | §15.5, §10 | canon-planned | surface repair | payload (mechanics-tag repair) | →EV-060 payload |
| Architecture Weave | §15.5 | canon-planned | production | payload (engine-focused weave) | →EV-040 payload |
| Engine Sandwich | §15.6 | canon-planned (ES1 stateful) | recombination | exercise | EV-045 |
| Wrong Line in Moment | §15.7 | canon-planned | discrimination | alias | →EV-012 alias |
| Bon Retour Retrieval | §15.7 | canon-planned | comeback retrieval | selector payload over retrieval EVs | SEL (+IS-21) |
| Missing Piece | §5.2 | canon-planned | retrieval | payload | →EV-030/EV-010 payload |
| Retrieve → Apply | §5.2 | canon-planned | transfer | alias | →EV-033 alias |
| Wrong Architecture (hub volume repair) | §5.2 | canon-planned | repair | alias | →EV-060 alias |
| Error replay from learner's own error tags | §5.2 | canon-planned | repair scheduling | selector | SEL |
| Recovery Reconstruction | §11 edit 2 | canon-planned (v0.3-gap) | recovery production | alias | →EV-063 alias |
| Decision Probe (tu/vous) | §11 note, §15.4 | canon-planned, **gated out** (no tu/vous doorway) | register decision | gated reject for slice | EV-094 (REJ-slice) |
| Register Fit / Register Shift / Register Transfer / Register Card | §11 edit 4 | canon-planned, hard-gated (tu/vous doorway) | register | gated payloads of register work | →EV-048 payload (gated) |
| Shadow the Chunk / Shadow the Moment | §11 edit 5; S1 | canon-planned (audio pass) | speaking | payloads | →EV-004 payload |
| Guided Dictation v2 | §11 edit 6 | canon-planned ("stays Later/limited") | dictée | exercise (explicit normalization mandated) | EV-034 |
| Broken Weave Reconstruction | §11 edit 7, §16 | **rejected** (validator ERROR) | pseudo-repair | canon-rejected | EV-092 (REJ) |
| Single Prompt Card | §4 | canon (covered today) | renderer pattern | renderer | §10 R2 |
| Inline Insight Card | §4, §7 | canon (covered today) | renderer pattern | renderer/interstitial | §10 / IS-01..06 |
| Repair Card | §4 | canon-planned (new runtime) | renderer pattern | renderer | §10 R2/R4 |
| Stateful Exercise Card | §4 | canon-planned (Hub-first) | renderer pattern | renderer | §10 R4 |
| Board Card | §4 | canon-planned (Hub-first) | renderer pattern | renderer | §10 R3 |
| Nudge Revision Card | §4, §8 | canon-planned (Tier D pre-AI) | renderer pattern | renderer + exercise contract | §10 R2 / EV-062 |
| Speaking Card (capture + self-playback) | §4 | canon-planned (audio pass) | renderer pattern | renderer | §10 R6 |
| Nudge Engine (one nudge → revision) | §8 | canon-planned | feedback pipeline | feedback system feeding EV-062 | →EV-062 |
| Learn Page: Anchor | §6 | canon-planned | orientation | interstitial | →IS-18 kin (opening frame) |
| Learn Page: Pattern Snapshot | §6 (exposure-only pin) | canon-planned | orientation map | interstitial (read-once, never quizzed) | IS-13 |
| Learn Page: Big Useful Insight / Tiny Sound Note / Watch Out / Pattern Family-Future Seed | §6 | canon-planned | insight | interstitials | →IS-03/IS-06/IS-17 |
| Learn Page: Quick Recall | §6 | canon-planned | recognition | payload | →EV-010 payload |
| Reveal statuses (active/supported/future_seed/reveal_only/recognition_safe/active_ready/need_queue_candidate) | §1.4 | canon | lifecycle vocabulary | content-lifecycle vocabulary | LIFE |
| Need Queue (late checkout → un départ tardif) | §8, §15.2 | canon-planned (Tier A AI-gated) | lifecycle | content-lifecycle | LIFE |

### 4.F Obsidian Codex + archive (product taxonomy, Tasarım Envanteri, micro-logic)

| Raw name | Source | Status | Apparent family | Initial classification | Normalized destination |
|---|---|---|---|---|---|
| 11-type taxonomy: Exposure / Recognition / Guided Production / Open Production / Comparison / Reflection-Recap / Review-Resurfacing / Integration / Diagnostic Drill / Repair-Micro-remediation / Generative-Adaptive Variant | Exercise System Overview.md:110-126 | active codex | taxonomy | family layer (not variations) | families in §5; #9→EV-071, #10→EV-060/061, #11→LIFE |
| Diagnostic Drill | same (#9) | canon-planned (validator-gated) | diagnostic | exercise | EV-071 |
| Repair / Micro-remediation | same (#10) | canon-planned (validator-gated) | repair | instances of repair EVs | →EV-060/EV-061 |
| Generated-but-Validated Variant / Adaptive Review | same (#11) | canon-planned (validator-gated) | lifecycle | content-lifecycle (renders as existing EVs) | LIFE |
| Review Resurfacing | same (#7) | canon-planned | scheduling | selector | SEL |
| Notice Card / Micro-Logic Card / Chunk Unpack Card / Contrast Card / Edge Card / Return-to-Moment Card | chip-taxonomy §6 | canon-planned (reuse insight-card) | micro-logic | interstitials | IS-07/IS-06/IS-09/IS-10/IS-11/IS-12 |
| Pieces Card (chunk-first display) | Tasarim §19.B | archive [KEEP] | chip display | interstitial | →IS-07 |
| Expandable Piece Card (tap: je voudrais → je + voudrais) | Tasarim §19.B | archive [KEEP] | chip anatomy | detail surface | IS-08 |
| Light Piece Hunt | Tasarim §19.B; Charter §3.1 | archive [KEEP] | discovery-recognition | exercise | EV-003 |
| Free Weave Item | Tasarim §19.C | archive [KEEP] | production | alias | →EV-041 alias |
| Choose Your Pieces | Tasarim §19.C | archive [KEEP] | constrained production | exercise | EV-043 |
| Upgrade the Sentence | Tasarim §19.C | archive [KEEP] | revision | exercise | EV-062 |
| Mini Mission (×5 states) | Tasarim §19.D | archive **SUPERSEDED** | production | superseded split | →EV-042 + EV-072 |
| A Small Moment | Tasarim §19.D; Lesson Mechanics Ideas (L16 seed) | canon-planned (L16, model-answer-only) | scenario response | exercise | EV-072 |
| Catch the Moment (audio+meaning) | Tasarim §19.E | archive [RE-HOMED] | listening recognition | payload | →EV-014 payload |
| What Changed? | Tasarim §19.E | archive [RE-HOMED] | A/B discrimination | exercise | EV-017 |
| Wrong Scene Trap | Tasarim §19.E | archive [RE-HOMED] | discrimination | payload | →EV-013 payload |
| Which Pieces Did You Hear? | Tasarim §19.E | archive [RE-HOMED] | listening recognition | payload | →EV-014 payload |
| Hear the Shape (rhythm/landing) | Tasarim §19.E | archive [RE-HOMED] | prosody recognition | exercise | EV-016 |
| Negation Trap | Tasarim §19.E | archive [RE-HOMED] | discrimination | payload | →EV-013 payload |
| Tu/Vous Trap | Tasarim §19.E | archive [RE-HOMED], doorway-gated | register discrimination | gated payload | →EV-013 payload (gated) |
| Listen for Useful Piece | Tasarim §19.E | archive [RE-HOMED] | listening recognition | payload | →EV-014 payload |
| Try It inline trap cards (1-2 per lesson, optional) | Tasarim §19.E | archive [NEW] | recognition | placement rule for EV-010/EV-013 | SEL/placement |
| Insight cards ×7: Expression / Grammar Nugget / Faux Ami / Culture Bite / Sound Pattern / Tiny Throwback / Take Another Look | Tasarim §19.F | archive [KEEP] | insight | interstitials | IS-01..06, IS-14, IS-15 |
| Use What You Have | Tasarim §19.G | archive [RE-SPEC] | constrained production | alias | →EV-043 alias |
| Survival Mode (timed/pressure optional) | Tasarim §19.G | archive [RE-SPEC] — historical timer option **rejected for the slice** (FD-7, 2026-07-31) | recovery production | exercise (no-pressure form only) | →EV-063 (pressure payload rejected) |
| Scene Repair | Tasarim §19.G | archive [RE-SPEC] | social repair | exercise | EV-061 |
| More Stay with It | Tasarim §19.G | archive | container | container label | — |
| Daily Review ritual 01 Fragments (poetic intro) | Tasarim §11 | archive [VALID design] | frame | interstitial | →IS-21 |
| Daily Review ritual 02 Reading (micro-story, tap → peek) | Tasarim §11 | archive [VALID design] | reading | exercise | EV-002 |
| Daily Review ritual 03 Recognition (soft cloze, 3 options) | Tasarim §11 | archive [VALID design] | recognition | payload (calm cloze) | →EV-010 payload |
| Daily Review ritual 04 Outro | Tasarim §11 | archive [REDESIGN] | frame | interstitial/system | →IS-21/SYS |
| Bon retour (soft return) | Tasarim §11 | archive [VALID design] | comeback frame | interstitial + selector | IS-21 / SEL |
| Le Carnet writing mode ("user writes their own sentence") | Tasarim §11 [ARCHIVE — Sprint 12+]; DEV_APK canon "No Le Carnet" | archive/deferred | personal writing | exercise (out of slice per FD-1, decided 2026-07-31) | EV-075 |
| MonLexiqueSuggestion ("Add to Mon Lexique?") | Tasarim §12 | archive | lifecycle prompt | feature/detail behavior | FEAT / →IS-27 |
| Instruction Weave thermostat (english-guided → french-led) | LESSON_FLOW §4; Lesson Mechanics Ideas D-26 | canon-planned, **DEFERRED Phase D** (CB §13.3) | system voice | system behavior (not an exercise) | SYS (deferred) |
| Readiness Gate + warm-up set | LESSON_FLOW §7; D-27 | canon-planned (Faz C) | gate | selector/gate composed of EVs | SEL |
| Unified hint/struggle ladder | LESSON_FLOW §8; D-28 | canon-planned (Faz B) | assistance | assistance surface | IS-29 |
| SRS announcement ("je vais is yours now — back tomorrow") | LESSON_FLOW §9.1 | canon-planned | frame | interstitial line | IS-19 |
| Meet-card tap-to-decompose ("Parçalara dokun") | LESSON_FLOW §1.2, §9.4 | canon-planned (Faz B) | exposure interaction | part of EV-001 contract | →EV-001 |
| Interaction spectrum TAP / CHOOSE / KUR (build) / ÜRET (produce) | LESSON_FLOW §1.2 | canon | action classes | classification vocabulary | §3 |
| Weave carry-over / prompt-salience event (Tester 1) | Weave.md:141-144 | canon-noted | error attribution | UI/friction signal rule (feeds §7) | §7 rule |

### 4.G Task-brief-supplied names not found in the repository

Evaluated on merit; presence in this ledger records the *name*, not approval.

| Raw name (cluster) | Source | Status | Apparent family | Initial classification | Normalized destination |
|---|---|---|---|---|---|
| Dictée / Dictation / Audio Transcription / Micro Dictée / Guided Dictée / Sentence Dictée / Context Dictée | brief (repo: only "Guided Dictation v2", EXERCISE_CANON §11.6) | brief | dictée | one exercise contract + payload modes | EV-034 (modes in §12) |
| Chip Anatomy Reveal / Progressive Chip Anatomy / Whole-to-Parts | brief; Charter §3.1 "progressive piece anatomy" | brief/charter | chip anatomy | detail surface (no mastery evidence) | IS-08 |
| Chip Decomposition / Chunk Boundary Recognition / Component Piece Selection / Internal Pattern Recognition | brief | brief | chip structure | exercise (evaluate) | EV-036 |
| Chip Rebuild / Parent-Chunk Reconstruction / Parts-to-Whole | brief | brief | chip structure | exercise (evaluate) | EV-035 |
| Progressive Recomposition | brief | brief | lifecycle | content-lifecycle + selector + Content Factory capability (see §13.4) | LIFE/SEL |
| Translation Quiz / Meaning Choice / Package Choice / Context Choice | brief (runtime analogues exist) | brief | recognition | aliases/payloads | →EV-011/EV-010; isolated-meaning form → EV-091 (REJ) |
| True / False | brief (+ `types.ts:101`) | brief/legacy-dead | judgment | payload | →EV-011 payload |
| Semantic Order / Ranking | brief | brief | semantic ranking | exercise (evaluate; **not** sentence ordering) | EV-021 |
| Predict the Next Word / Phrase Completion / Soft Cloze / Context Fill | brief | brief | cloze | payloads | →EV-010/EV-030 payload |
| Continue the Thought | brief | brief | discourse | alias (discourse continuation) | →EV-044 alias |
| Scramble | brief (+ `types.ts:193`) | brief/legacy-dead | orthography | reject/merge | EV-090 (REJ) |
| Quick Recall / Targeted Rebuild | brief (+ legacy quickRecall) | brief | retrieval/repair | aliases | →EV-033 / →EV-060 |
| Mid Weave / Context Weave / Open Weave / Typed Weave / Supported Weave | brief (+ weaveType ladder) | brief/runtime | production | ladder modes | →EV-040/EV-041 |
| Recover Without Switching | brief | brief | recovery | alias (stay-in-French recovery) | →EV-063 alias |
| Say the Same Thing Differently | brief | brief | naturalness | alias | →EV-064 alias |
| Scenario Recall | brief | brief | self-check recall | payload (scenario→response direction) | →EV-070 payload |
| Scenario Response | brief | brief | scenario production | alias | →EV-072 alias |
| Error Correction / Reformulation / Targeted Repair / Repair / Micro-remediation | brief | brief | repair | aliases (grammatical vs social kept split) | →EV-060 / EV-061 |
| Take Another Look / Micro Self-Correction | brief (+ Tasarim §19.F, UX.5) | brief/archive | self-correction | feedback surface (retry invite), not an exercise | IS-15 |
| Adaptive Review / Generated but Validated Variant / Review Resurfacing | brief (+ codex #11/#7) | brief/codex | lifecycle/scheduling | lifecycle + selector | LIFE / SEL |
| Listen and Repeat / Read Aloud / Sound Imitation / Replay and Compare / Minimal Sound Contrast | brief (+ S1 shadowing) | brief/canon | speaking/listening | shadowing payloads + minimal-pair exercise | →EV-004 payload / EV-015 |
| Speech Recognition / Pronunciation Scoring | brief (repo: banned in MVP; "graded pronunciation much later", CB §12.2) | brief | speech assessment | reject for slice (no validated contract) | EV-093 (REJ-slice) |
| Le Carnet / Personal Sentence Writing / Own Sentence / Personal Example / Rewrite in Your Own Way | brief (+ Tasarim §11 ARCHIVE row) | brief/archive | personal writing | exercise (deferred; out of slice per FD-1, decided 2026-07-31) | EV-075 |
| Recognition Reading | brief | brief | reading | alias | →EV-002 alias |
| Flashcard directions ×8 (FR→meaning, meaning→FR, audio→meaning, audio→FR, context→piece, scenario→response, chip→example, example→chip) | brief (+ Charter §4.4) | brief/charter | projections | flashcard projection map | §11 |

---

## 5. Normalized exercise variation inventory

One row per normalized variation. Column conventions: **Evidence produced** uses the §6
vocabulary and names the *strongest safe* evidence; **A/R/G** states the role each item class may
play (**A**ctive / **R**ecognition / **G**host) — G is *never* required for correctness anywhere;
**Runtime status** is Axis-B fact; **Priority** uses §15's scale. IDs are inventory-only.

> Note on the learning-engine `recognition` operation: its tap-to-reveal card is runtime kin of
> both EV-001 (exposure) and EV-070 (self-check without self-grade). It is deliberately **not** a
> third variation — the sandbox card is a renderer fact, not a distinct pedagogical contract.

### 5.A Exposure and input family

| ID | Normalized variation | Aliases / source names | Learner action | Learning purpose | Input contract | Expected output | Evidence produced | Error eligibility | A/R/G compatibility | Cognate compatibility | Suitable sentence types | Unsuitable use | Renderer / surface | Runtime status | Vertical-slice priority | Source evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-001 | **Meet & Listen** (whole-first sentence encounter, tap-to-decompose chips) | Meet It, meet-card, Read & Listen, Meet Card | Read/hear whole canon sentence; tap chips (highlight + audio); continue | First contact inside a moment; whole-first before anatomy | Canon sentence + atomic highlights + audio id | Chip taps; no answer | Exposure only (`item_seen`; low weight) | None (discovery: no wrong) | A/R/G all may appear; G held in context, never explained-as-owned | High — cognates lower first-contact load | Anchor, variation, scene sentences | Any grading; sentence-level highlight spans (CB §6.2) | R6 audio + tap layer on meet card | Shipped v1 (static Continue; tap = Faz B planned) | **P0** | CB §6.2; LESSON_FLOW §1.2; Meet.md |
| EV-002 | **Micro-Reading with bounded action** | Reading ritual (Review 02), tiny-reading hook, Recognition Reading, micro-paragraphs L6-L10 | Read a 2-4 line scene; end in one bounded action (select continuation, spot piece, match function) | Reading skill without translation testing | Scene text (prerequisite-safe) + one bounded action payload | One selection/tap | Recognition (bounded action); exposure for G | Learner error only on the bounded action; trap signal if authored | A/R read; G may appear in context; production only when CB §11.3 conditions hold | High — cognate-rich scenes are the natural early reading material | Scene sentences, mini-dialogues | Sentence-by-sentence translation testing; "What does this sentence mean?" default; forced production (CB §11.4) | R1 choice on reading card | Planned (ritual design VALID; no current runtime) | **P1** | CB §11 (FL Q7); Tasarim §11; CC §11 |
| EV-003 | **Light Piece Hunt** | piece identification, Notice-interactive | Find/tap the piece doing a named job in a visible sentence ("which piece asks softly?") | Chunk-boundary awareness inside real lines | Sentence + target piece id + job description | Tap on span | Recognition (chunk-boundary) | Learner error (wrong span); UI-friction if spans ambiguous | A/R targets; G never the required find | Medium — works regardless; cognates ease meaning load | Anchor/variation sentences | Whitespace-token "grammar parsing"; testing G pieces | R1 choice (tappable spans) | Archive design [KEEP]; no runtime | **P1** | Tasarim §19.B; Charter §3.1 |
| EV-004 | **Shadowing (ungraded)** | Listen and Repeat, Shadow the Chunk, Shadow the Moment, Speak Once, Speak Own Moment, Read Aloud, Sound Imitation, Replay and Compare | Hear recorded line; repeat aloud; optionally re-listen/self-compare (later: self-playback) | Sound shape, rhythm, articulation confidence | Recorded audio (human preferred) + line text | Spoken attempt (uncaptured or self-played) | Audio exposure + speech-attempt completion; **no pronunciation evidence** | None (ungraded by canon); audio error possible (asset defect) | A/S lines; G audible in context, never a repeat-target requirement | High — audio exposes FR sound of cognates (anti-eye-pronunciation) | Short anchor/scene lines, chunks | Any grading/praise without target detection (§16 ERROR); pronunciation claims | R6 audio card (+ future capture) | Canon-planned (S1; slice includes recorded audio) | **P1** (decided FD-6) | CB §12.2; CAIRN_PRODUCT_ANSWERS §4; EXERCISE_CANON §11.5 |

### 5.B Recognition and discrimination family

| ID | Normalized variation | Aliases / source names | Learner action | Learning purpose | Input contract | Expected output | Evidence produced | Error eligibility | A/R/G compatibility | Cognate compatibility | Suitable sentence types | Unsuitable use | Renderer / surface | Runtime status | Vertical-slice priority | Source evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-010 | **Fill with Traps** (select into blank) | Fill, fill-with-traps, French Fill (`fill_fr`), Weave Fill (`fill_fg`), `fill_ctx`, Soft Cloze, Context Fill, Quick Recall, Missing Piece (choice), Package Choice, Predict-next-word (choice), Phrase Completion (choice) | Choose one option into a sentence blank; traps carry authored `trapReason` | Form selection **in context**; discrimination against authored confusions | Sentence + blank + options (+trapReason) + clean TTS text | One selection | Recognition | Learner error + authored trap signal + weak-point candidate (attributed); content error if distractor bad | A targets; R as support/distractors; G may be a **wrong** trap, never the correct option (V3) | High — cognate traps (faux-ami distractor) are prime authored traps | Anchor/variation; context scenes | Isolated "What does X mean?"; G as answer; unauthored distractors | R1 choice | Shipped v1 (+3 legacy hidden shapes) | **P0** | CB §14.5; Fill.md; canonRules V3/V4 |
| EV-011 | **Meaning-in-Context Choice** | Multiple Choice, Quiz (context items), Context Choice, Meaning Choice, Scenario Recognition, Recovery Choice, True/False (binary payload), `context` review item | Read a situation/intent; choose the fitting response/meaning (binary = accept/reject) | Map form ↔ communicative function | Situation text + options (or one proposition for T/F) | One selection/judgment | Recognition | Learner error + trap signal + weak-point candidate | A/R options; G never correct answer | High for meaning mapping; beware trivially-guessable cognate MCQs | Scene/social sentences | Isolated vocabulary MCQ; testing G; T/F on trivia | R1 choice | Legacy hidden (Quiz/context); v1 covers via fill-with-traps payloads | **P0** | Multiple Choice.md; Selection Matrix; CB §3.1 |
| EV-012 | **Spot the Mistake** | Quiz `negative`, Wrong Line in Moment | Identify the wrong/unnatural line or element | Error detection as recognition skill | Line set with one authored flaw + reason | Selection of flawed element | Recognition (error-detection) | Learner error + trap signal; content error if "flaw" debatable | A/R material only; G never the flawed target | Medium — faux amis make good authored flaws | Scene lines, known-frame sentences | Flaws requiring untaught grammar to see | R1 choice | Legacy hidden (`negative` badge) | **P1** | Quiz.tsx; Tasarim §19.E kin |
| EV-013 | **Micro-Contrast / Good Piece, Wrong Moment** | Wrong Scene Trap, Negation Trap, Tu/Vous Trap (gated), Recovery vs Exit, Engine Sort (choice stage), micro-contrast hook, Contrast choice | Choose which of 2-3 **owned** pieces fits this scene/structure/register | Boundary-sharpening between confusable owned pieces (je suis vs j'ai; oui vs non merci) | Scene + minimal contrasting option pair + trapReason | One selection | Recognition (discrimination); diagnostic when targeted | Learner error + trap + weak-point candidate; prime diagnostic source | A vs A (or A vs R support); G excluded | Medium — contrasts are usually native-FR pairs, not cognate-driven | Contrast sentences (§6.1 family) | Register payloads before tu/vous doorway (gated); semantic-cluster interference sets | R1 choice | Canon-planned; legacy `odd`/quiz approximations | **P0** | EXERCISE_CANON §12/§15; DailyReviewHook `micro-contrast`; chip-taxonomy §6 Contrast |
| EV-014 | **Audio Recognition** | `listen` review item, Catch the Moment, Listen for Useful Piece, Which Pieces Did You Hear, audio→meaning direction | Hear FR line; select meaning/heard piece/function | Sound→meaning mapping before production | Audio (TTS now, recorded later) + options | One selection | Recognition (audio) | Learner error + trap; **audio error must be distinguishable** (asset/TTS defect ≠ learner) | A/R targets; G may appear in audio context, never the required identification | Medium-high — trains ear against cognate eye-pronunciation | Short scene lines, chunks | Punishing before audio quality assured; testing G | R1 choice + R6 audio stem | Legacy hidden (`listen`); hooks declared | **P1** (decided FD-6) | Review.tsx; Tasarim §19.E; CB §12.1 |
| EV-015 | **Minimal-Pair Discrimination** | Minimal Sound Contrast, sound-trap hook, un/on · le/la · et/est | Hear/see minimal pair; pick which occurred / which fits | Phoneme- and form-level precision where meaning changes | Authored minimal pair + context + audio | One selection | Recognition (sound-form precision) | Learner error + weak-point (sound/writing tag); audio error distinguishable | A/R pairs; G excluded | Low — minimal pairs are FR-internal, cognates irrelevant | Slot sentences isolating the pair | Untaught-pair testing; low-quality TTS pairs | R1 choice + R6 | Planned (DailyReviewHook `sound-trap`); needs quality audio | **P2** (decided FD-6 — Sound Pattern interstitial IS-03 may demo sound contrasts unscored) | lessonTypes hooks; Mastery Bible §15 (B7 pairs) |
| EV-016 | **Hear the Shape** (prosody recognition) | rhythm/landing, question-vs-statement melody | Hear line; judge shape (question? finished? polite?) | Intonation contour recognition (rising question pedagogy) | Recorded audio with reliable contour + binary/ternary options | One judgment | Recognition (prosodic) | Learner error only with verified audio; otherwise audio error | A/R lines; G excluded as target | Low | Intonation-bearing scene lines | TTS-contour dependence (S1: needs real recordings) | R1 + R6 | Archive [RE-HOMED]; audio-gated | **P2** (decided FD-6) | Tasarim §19.E; ANSWERS §4 |
| EV-017 | **What Changed** (A/B contrast spotting) | What Changed?, before/after compare | See/hear two versions; identify the difference and (optionally) what it does | Noticing form deltas (negation inserted, article swapped) | Two authored versions differing by exactly one taught delta | Selection of the delta | Recognition (comparison) | Learner error + trap; content error if delta ambiguous | A deltas; R context; G never the delta | Medium | Variation/contrast pairs | Multi-delta pairs; untaught deltas | R1 choice | Archive [RE-HOMED] | **P1** | Tasarim §19.E; learning-engine §9 transformations |
| EV-018 | **Match Pairs** | `match` review item, pair matching | Map FR↔EN or piece↔function pairs | Bulk association refresh | 3-5 authored pairs | Completed mapping | Recognition | Learner error (weak signal — elimination effects); no single-pair weak-point claim | A/R pairs; G excluded | High but risks trivial cognate matching | Chunks, formulas | Long lists; vocabulary-dump matching; mastery claims per pair | R1 (match layout) | Legacy-dead (typed, unrendered, unreachable data) | **P2** | lib/types.ts:192; pool1.ts |
| EV-019 | **Odd One Out** | `odd` review item | Pick the item that doesn't belong + see reason | Category/function boundary awareness | 3-4 items + authored reason | One selection | Recognition | Learner error (weak); trap signal | A/R items; G excluded | Medium | Function groups (greetings vs requests) | **Semantic-cluster sets of similar words (interference risk — CLAUDE.md ban)**; untaught categories | R1 choice | Legacy hidden | **P2** | lib/types.ts:187; Review.tsx:159 |
| EV-020 | **Mayonnaise Game / Five Spellings** | Five Spellings, spelling hypothesis ladder | Choose the real spelling among plausible misspellings | Playful orthography (preferred route over dictation drills) | One target word/chunk + 3-5 authored misspellings | One selection | Recognition (orthographic) | Learner error → sound/writing tag only; **never** broad grammar weakness | A/S items with production history; G excluded | Interference-aware: FR/EN cognate spelling deltas (réservation/reservation) are the *point* — authored deliberately | Single words/chunks | Accent-only gotchas without pedagogy; untaught words | R1 choice | Canon-planned (§11 edit 6 names it the preferred orthography route) | **P2** | EXERCISE_CANON §11.6, §12 |
| EV-021 | **Semantic Ranking** | Ranking, Semantic Order | Order 3-4 owned items along a meaning/register scale (bluntness, politeness, intensity) | Gradience awareness (je veux < je voudrais) | Authored scale + items with defensible order | An ordering | Recognition (comparison only) | Learner error weak; trap none; content error if scale contestable | A items only; G/R excluded | Low | Register/intensity families | Confusing with sentence ordering (EV-031); scales without one defensible order | R1 (rank layout) or R3 | **Not found in repo** (brief-supplied; legacy `order` variant is *not* this) | **P2** (decided FD-5 — deferred, kept distinct from ordering) | brief; register pedagogy (CB §15) |

### 5.C Recall, fill, and assembly family

| ID | Normalized variation | Aliases / source names | Learner action | Learning purpose | Input contract | Expected output | Evidence produced | Error eligibility | A/R/G compatibility | Cognate compatibility | Suitable sentence types | Unsuitable use | Renderer / surface | Runtime status | Vertical-slice priority | Source evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-030 | **Typed Recall Fill** (write the missing piece) | Write (`fill_write`), engine `fill` op, typed blanks (`weave` blanks review), Missing Piece (typed), Phrase Completion (typed), Targeted Rebuild (partial) | Type the missing piece from memory into a frame | Recall + controlled written production of owned pieces | Frame + expected answer + accepted variants + clean TTS | Typed FR piece | Recall + controlled production | Full grading-tag range (learner error, precision signals per FQ-1, weak-point candidate); near-misses soft | **A only as required answer**; R support in frame; G never required | Interference-aware — cognate spelling deltas produce precision signals, not weakness | Frames with one owned blank | Requiring R/G production (I-9; `recognition_only_form_used` guard); punishing accents as failure | R2 typed | Legacy hidden (Write) + sandbox (FillCard) | **P0** | Write.md; FillCard.tsx; Mastery Bible §15 |
| EV-031 | **Build / Arrange Pieces** | BuildSentence, BuildCard, Arrange Tiles, Sentence Ordering, Guided Build, Listen-then-Build (audio payload), Guided French-shape Build, Role Build, legacy `order` (degenerate MCQ shape) | Tap authored tiles (incl. distractor traps) into the target order | Syntax assembly from known pieces; word-order evidence | Tiles by itemId + answer indexes + distractors + EN intent | Ordered tile sequence | Controlled production (assembly); `wrong_order`/`missing_word`/`extra_word` classes | Learner error + trap (distractor pick) + weak-point candidate | A tiles as answer; R distractors allowed; G never in required sequence | Medium — cognate tiles ease meaning, order stays FR work | Anchor/variation sentences | Whitespace-split tiles violating chip canon; sentence-chips as single tiles; **not** for parent-chunk rebuild (EV-035) or ranking (EV-021) | R3 tiles | Legacy hidden + sandbox (BuildCard, itemId-graded) | **P0** | Build.md; buildSequence.ts; chip-taxonomy §4 |
| EV-032 | **Starter Fade** | fade rounds, prompt-fade staging (PF0-PF3 kin) | Same target across 2-3 rounds with scaffold progressively removed | Independence ramp; assistance-scoped evidence (FQ-3) | Target + per-round scaffold definitions | Per-round answers | Recall → controlled production (per-round assistance recorded) | Learner error; hint level must reach evidence layer (gap today) | A targets; R scaffold; G never | Medium | One frame family per card | Treating aided round success as independent production (I-26/I-28) | R4 stateful over R2 | Canon-planned (ES1 stateful) | **P1** | EXERCISE_CANON §15.1, §4 |
| EV-033 | **Function Recall → Use** | Retrieve → Apply, Quick Recall (function direction), Bon Retour payload | Prompted by intent ("ask softly"), retrieve the piece, then immediately use it in a line | Function→form retrieval, the hub's volume-retrieval core | Intent prompt + expected piece + follow-up frame | Piece + short use | Recall + controlled production | Learner error + weak-point candidate | A pieces; R support; G never | Medium-high (intent prompts language-neutral) | Function-bearing chunks (survival formulas, requests) | Bare translation prompts ("translate: I would like") | R2 typed (2-step) or R4 | Canon-planned (hub-primary) | **P0** | EXERCISE_CANON §5.2, §15.2 |
| EV-034 | **Dictée** (audio → written French) | Dictation, Audio Transcription, Guided Dictation v2, Micro/Guided/Sentence/Context Dictée (payload modes — §12) | Hear FR audio; write what was said (span, cloze, or sentence per mode) | Segmentation + sound-to-orthography mapping + controlled written production | Verified-quality audio + transcript + normalization + accepted variants | Written FR | Audio recognition + segmentation + recall + controlled written production; orthographic observations (precision-class per FQ-1) | Learner error only after audio-quality attribution; spelling/accent/punctuation misses are precision signals, never solo weakness (§12.6) | **A spans only as required writing**; R may appear in audio, cloze-given; **G audible but never required in written output** (§12.8) | **Interference-critical** — cognate spelling deltas (réservation) are the main trap class; authored, not accidental | Short verified-audio sentences with majority-A spans | Collapsing into listening MCQ; full-sentence dictée over R/G-heavy lines; TTS-based grading of orthography | R6 audio + R2 typed | **No runtime; no repo mechanic** ("Guided Dictation v2 stays Later/limited") | **P1 — selective (decided FD-3; Context mode deferred)** | EXERCISE_CANON §11.6; §12 below |
| EV-035 | **Chip Rebuild / Parent-Chunk Reconstruction** | Parts-to-Whole, parent-chunk rebuild | Rebuild one **known parent chip** from its authored child pieces (`je` + `ne…pas` + `comprends` → `je ne comprends pas`) | Guided recall of internal structure; parent-chunk production evidence | Parent chip (already owned whole) + authored children + decoys optional | Ordered child assembly | Controlled production (parent-chunk reconstruction) — **distinct from full-sentence ordering** | Learner error (order/omission) scoped to the chip; no sentence-level claims | Parent must be A (owned); children may be authored sub-pieces (not auto-promoted); G children never required | Low-medium | Survival formulas, unpackable chunks **after** whole-first ownership | Before whole-first contact; on formula chunks that degrade when split early (chip-taxonomy §5); whitespace splits | R3 tiles (chip-scoped) | No runtime; no repo name (brief-supplied; canon-compatible with §5 unpack lifecycle) | **P1 — bounded pilot (decided FD-2)** | chip-taxonomy §5-§6; brief |
| EV-036 | **Chip Decomposition** (identify internal structure) | Chunk Boundary Recognition, Component Piece Selection, Internal Pattern Recognition, Whole-to-Parts | Select/identify the correct authored internal split of a known parent chip (which pieces live inside `je voudrais`?) | Chunk-boundary + internal-pattern recognition; reusable-piece awareness | Parent chip + authored decomposition + wrong-split distractors | One selection | Recognition (chunk-boundary / internal-pattern) — **not grammar mastery, not production** | Learner error weak; trap signal; content error if split linguistically wrong (French QA gate) | Parent A/R; children as displayed anatomy; G children shown, never tested | Medium — cognate stems (comprends/comprehend) make anatomy sticky | Unpackable chunks post-contact | Generic Build collapse; testing anatomy before whole-first use; splitting protected lexical units (`quelqu'un`) | R1 choice (anatomy layout) | No runtime (brief-supplied; canon-compatible with §6 unpack cards) | **P1 — bounded pilot (decided FD-2)** | chip-taxonomy §5-§6; brief; §13 below |

### 5.D Weave and production family

| ID | Normalized variation | Aliases / source names | Learner action | Learning purpose | Input contract | Expected output | Evidence produced | Error eligibility | A/R/G compatibility | Cognate compatibility | Suitable sentence types | Unsuitable use | Renderer / surface | Runtime status | Vertical-slice priority | Source evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-040 | **Supported Weave** (scaffolded typed production) | weaveType `supported`/`mid`/`context`, Typed Weave (practice echo), Architecture Weave, Combine-phase-2 weave, mini-weave hook | Type the FR line from a directive/intent prompt with scaffold (pieces, context); soft match to model + alternatives | Guided production toward owned targets | Directive prompt + target + accepted alternatives + suggestedPieces + hint ladder | Typed FR line | Controlled production (assistance-scoped per hint use) | Full grading range; near-miss soft; hint level scopes claim (FQ-3); no red on no-match | A targets; R support pieces; G excluded from required output | High — directive prompts let cognates carry meaning early | Anchor/variation/scene | "Translate this exact sentence" as dominant mode (CB §8.5); grading G gaps | R2 typed + IS-29 ladder | Shipped v1 (Weave screen) | **P0** | CB §8; Weave.md; weaveMatch tests |
| EV-041 | **Open Mixed Weave (ungraded)** | Free Weave, Open Weave, true Weave, Franglais (superseded name), weaveType `open` | Express the intent mixing FR + EN freely; unknown stays English; then compare with Natural Reveal | Push toward the unknown; learner-owned output; the crown mechanic | Intent prompt; **no grading config permitted** (validator ERROR) | Mixed FR/EN attempt | **Open production attempt + comparison only; no correctness evidence** (W1) | **No learner error may be generated**; English gaps never penalized; carry-over/salience → UI-friction signal, not weakness | A/R free; **G may appear in the reveal within W2 window (recognition-only)** | Core — cognate bridges are the designed upgrade path (Is it possible? → C'est possible ?) | Any real intent | Grading, red states, exact-match; treating reveal exposure as mastery | R2 typed (ungraded config) + IS-16 | Shipped v1 | **P0** | W1 lock (ANSWERS §2); CB §8.2-8.3; Mastery Bible §5 |
| EV-042 | **Say It Your Way** | say-it-your-way, Small Moment Production, chip-less easy Say It (C2 payload), say-it-mini hook, free write | Free-write FR toward a communicative goal; confirm step ("revise or keep?"); reveal bands | Free production + self-revision; "I did it without help" | Goal + optional idea pieces + answerBands + reveal | Free FR text | Open production attempt + self-correction (confirm step); **no deterministic grammar mastery without structured target moves** | No error by default; authored `targetMove` hits may create scoped positive evidence (future); praise without target detection = ERROR | A/R free; G never demanded; C2 payload = deliberately easy, chip-less, ~L10+ | High | Learner-chosen | Scoring, blocking, fabricated praise; merging with A Small Moment (different input contract) | R2 typed (confirm flow) + IS-16 | Shipped v1 | **P0** | CB §9; C2 (ANSWERS §6); Say It Your Way.md |
| EV-043 | **Choose Your Pieces / Constrained Production** | Use What You Have, limited-piece challenge, Piece Bench (concept) | Produce a line using **only** a limited offered piece set | Recombination under constraint; proves pieces are combinable, not memorized | Constraint set (all owned) + intent | FR line from constrained set | Controlled production (recombination) | Learner error; constraint violations are neutral redirects, not failures | A set only; R support display; G excluded | Medium | Recombination scenes | Constraint sets requiring unseen glue words | R3 board or R2 + tray | Archive [KEEP]/[RE-SPEC]; no runtime | **P1** | Tasarim §19.C/G; EXERCISE_CANON §12 (Piece Bench) |
| EV-044 | **Continue the Moment** | Continue the Thought, next-line production | Read/hear a 1-2 line scene start; produce the next natural move | Discourse-level production; moment continuation | Scene start + expected move class + alternatives | FR (or mixed) next line | Controlled → open production (mode-dependent) | Learner error only in controlled mode; open mode = compare only | A moves required; R context; G in scene text only | Medium-high | Mini-scenes | Requiring unseen discourse markers | R2 typed | Canon-planned (hub moment work) | **P1** | EXERCISE_CANON §12/§15.2/§5.2 |
| EV-045 | **Combine / Engine Sandwich** | Combine (`combine_fg` phase 1), Engine Sandwich (stateful) | Merge two owned ideas/engines into one line (je voudrais + un café + s'il vous plaît) | Recombination across engines; syntax growth | Two owned inputs + target + accepted variants | One combined FR line | Controlled production (recombination) | Full grading range; weak-point candidate | A engines; R fillers; G never | Medium | Two-engine sentences | Combining engines that share no scene/slot/job (§16 ERROR) | R2 typed or R4 stateful | Legacy hidden (Combine) + canon ES1 (Sandwich) | **P1** | CombineWeave.tsx; EXERCISE_CANON §15.6 |
| EV-046 | **Same Slot, New Job** | Same Middle New Job, two-job transfer (ask/have) | Carry one slot filler across two owned engines (Je voudrais de l'eau ↔ J'ai de l'eau) | Transfer evidence — the slot is generative, not memorized | Shared slot + two engines + directive prompts | Two linked productions | Controlled production (transfer) — high-value evidence class | Learner error + weak-point; transfer failure ≠ item weakness without attribution | A engines + A/S filler; G never; third job (il y a) **deferred** | Medium | Same-slot sentence pairs | Job-3 before the il y a doorway; unrelated slot pairs | R4 stateful (nearest-today: two linked weaves) | Canon-planned (ES1) | **P1** | EXERCISE_CANON §1.6, §15.5 |
| EV-047 | **Same Engine, New Layer** | negation/question layering, transformation drill (non-tabular) | Transform an owned line by applying a newly owned layer (add `ne…pas`) | Transformation evidence (learning-engine §9) | Base line + layer + expected transform | Transformed FR line | Controlled production (transformation) | Full grading; `wrong_order`/negation-shape tags | Layer must be A; base A/S; G never | Low-medium | Transformable owned lines | Layers not yet taught (blocked_form guard); paradigm-table framing | R2 typed | Canon-planned | **P1** | EXERCISE_CANON §15.3-15.4; learning-engine §9 |
| EV-048 | **Register Switch** | `register_switch` op, Register Shift/Fit/Transfer/Card (tu/vous payloads — **gated**), softening (je veux → je voudrais) | Read the too-direct form; produce the polite/natural one | Register/softening as production (the je voudrais contrast) | directForm + politeForm + register note | Typed polite form | Controlled production (register) | Full grading; `wrong_register` tag exists (never auto-emitted — adapter only) | A both forms (softening pair is taught L1); **tu/vous payloads blocked until doorway** | Low | Request/politeness lines | Any tu/vous payload pre-doorway (§16 ERROR); scoring "politeness" beyond authored pair | R2 typed | **Sandbox runtime exists** (RegisterSwitchCard) | **P1** | types.ts:102; EXERCISE_CANON §11 edit 4 |
| EV-049 | **Context Chain** | `context_chain` op, chained scene steps, staged dialogue completion | Work an ordered prompt→answer chain (2-4 steps) to a controlled outcome | Sustained controlled production across a scene | steps[] (prompt, answer) + targets | Typed answer per step | Controlled production (chained; bounded credit per B23) | Full grading per step; chain de-dup prevents inflated credit | A step answers; R scaffolding; G in prompts only | Medium | Scene sequences | Chains requiring unseen steps; treating chain completion as multi-item mastery without dedup | R4 chain (exists: ContextChainCard) | **Sandbox runtime exists** | **P1** | types.ts:103; Mastery Bible §20 |
| EV-050 | **Moment Builder Board** | Board Card (moment payload) | Assemble a small moment (2-3 moves) from a piece bank under constraints | Moment-level recombination payoff (integration lessons) | Piece bank + scene + move slots + traps | Ordered moves/lines | Controlled production (moment assembly) | Learner error + trap; per-move attribution | A bank core; R few; G never in bank | Medium | Integration scenes (L6/L10 archetype) | >1 board per early lesson (canon cap); free-form boards without authored moves | R3 board | Canon-planned (ES1, hub-first, max 1/lesson) | **P1** | EXERCISE_CANON §4, §12, §15.7 |
| EV-051 | **Line Bank with Traps** | line selection board | Choose the right **lines** (not words) from a bank incl. plausible-but-wrong lines to build a scene | Scene-level discrimination + sequencing | Authored line bank + scene + trapReasons | Ordered line selection | Recognition→controlled (line-level) | Learner error + trap signal | A/R lines; G may be a trap line, never required | Medium | Mini-dialogues | Trap lines using unseen French as the "catch" | R3 board (line mode) | Canon-planned (ES1; nearest-today: weave + trap chips) | **P1** | EXERCISE_CANON §12, §15.2 |
| EV-052 | **Missing Move** | missing social move | Spot **and supply** the missing move in a social sequence (forgot the politeness landing) | Social-sequence completeness (moment function layer) | Scene with an authored gap + expected move | Identification + short production | Recognition + controlled production (social move) | Learner error; social-function tag | A moves; R context; G never | Medium | Politeness/social scenes | Testing culture-knowledge instead of taught moves | R2 typed (2-step) | Canon-planned | **P1** | EXERCISE_CANON §15.2, §15.7 |

### 5.E Repair, naturalness, and feedback-driven production family

| ID | Normalized variation | Aliases / source names | Learner action | Learning purpose | Input contract | Expected output | Evidence produced | Error eligibility | A/R/G compatibility | Cognate compatibility | Suitable sentence types | Unsuitable use | Renderer / surface | Runtime status | Vertical-slice priority | Source evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-060 | **Grammatical Repair / Smallest Repair** | Error Correction, Wrong Architecture Repair, Smallest Repair Wins, Repair Card, Targeted Repair, Mechanics Card (surface payload), Reformulation (grammatical), Micro-remediation instance | See a wrong owned form (je suis faim); make the **smallest** change that fixes it | Repair as first-class skill; weak-point shrinking | Authored wrong form + smallest fix + why-line | Corrected FR | **Repair evidence** (reduces urgency; never instant mastery — I-13/I-33) | Learner error on the repair itself; repair events feed spaced confirmation | A material only (the error must be on owned forms); G never repaired by learner | Low | Known-frame errors (expected-error list per lesson) | Fixing errors the learner never plausibly makes; multi-issue fixes; social fit (that's EV-061) | R2 typed (repair input) | Canon-planned (Repair Card = new runtime; nearest-today fill-on-error-form) | **P0** | EXERCISE_CANON §4/§15.5; Mastery Bible §16 |
| EV-061 | **Scene Repair / Social Landing Repair** | Scene Repair (Tasarim §19.G), Social Landing Repair | Fix a line that is grammatical but socially wrong for the scene (too blunt, missing landing) | Pragmatic/social fit — **distinct from grammatical repair** | Scene + socially-off line + natural fix + register note | Adjusted FR line | Repair evidence (social/register class) | Learner error (register/naturalness tag class); never graded as grammar failure | A social pieces (s'il vous plaît, merci); G never | Low | Social scenes | Merging with EV-060; tu/vous payloads pre-doorway | R2 typed | Canon-planned (ES1) | **P1** | Tasarim §19.G; EXERCISE_CANON §15.2 |
| EV-062 | **Nudge Revision / Upgrade the Sentence** | Upgrade the Sentence, Nudge Revision Card, post-output revision, smallest useful upgrade | After own output + exactly one nudge, revise the sentence (Is it possible? → C'est possible ?) | Convert reveal exposure into a produced upgrade; Tier-D deterministic | Learner's own output + one nudge candidate (registry/cognate-bridge) | Revised line | Self-correction + controlled production of the upgraded piece | No error for declining; revision required after nudge (policy); upgrade piece must be active/supported preferred | Upgrade targets prefer A/S; reveal-only candidates preview-only, never graded | **High — cognate bridge is the flagship Tier-D nudge class** | Learner output | >1 nudge; full native rewrite as expected answer; treating reveal-only as mastery | R2 typed (revision mode) | Canon-planned (Tier D pre-AI shippable) | **P1** | EXERCISE_CANON §1.5, §8 |
| EV-063 | **Survival Mode / Recovery Sequence** | Recovery Reconstruction, Recover Without Switching, Repair to Continue, Recovery Choice → Recall (staged payload) | Run the recovery sequence inside a mini-scene (Je ne comprends pas. Vous pouvez répéter ?) staying in French | Stress-proof survival formulas; recovery as a rehearsed move | Breakdown scene + survival formulas (A) + staged support | Recovery line(s) | Recall + controlled production (survival formulas) | Learner error; formula-level tags; timer/pressure payloads **rejected for the slice** (FD-7) | Survival formulas are A (closed class); G never; R support lines allowed | Low | Breakdown scenes | Any timer, countdown, lives, competitive-speed, or urgency framing (rejected — FD-7); unseen recovery pieces | R4 chain or R2 | Canon-planned; formulas shipped in L1 enrichment | **P1** (decided FD-7 — no pressure; partial-but-functional communication accepted; hint ladder available) | PAYLOAD_ECONOMY §4.1; EXERCISE_CANON §12; CC-007 |
| EV-064 | **Two Ways to Say It / Make It Natural** | Say the Same Thing Differently, naturalness variation | Produce (or select, easier payload) a second natural way to say an intent; compare register/feel | Break the one-correct-answer mindset; naturalness as dimension — **not** error correction | Intent + 2+ authored natural renderings + register notes | Alternative rendering | Controlled production (alternative) or recognition (choice payload); comparison evidence | No "wrong" between valid alternatives; content error if alternatives unnatural (French QA) | A/S renderings; W2-window forms may appear **in reveal only** | Medium-high | Intents with ≥2 owned renderings | Grading one alternative as the answer; unseen alternatives as required | R2 typed / R1 choice | Canon-planned | **P1** | EXERCISE_CANON §12; Tasarim §19.G; CB §10.3 |

### 5.F Review, diagnostic, dialogue, and personal family

| ID | Normalized variation | Aliases / source names | Learner action | Learning purpose | Input contract | Expected output | Evidence produced | Error eligibility | A/R/G compatibility | Cognate compatibility | Suitable sentence types | Unsuitable use | Renderer / surface | Runtime status | Vertical-slice priority | Source evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-070 | **Tap-to-Reveal Self-Check** | Scenario card practice, Scenario Recall (payload), Show Me / Got It, Still Learning / Know It, Context Flashcard, `recall` hook | Read front (scenario/intent/FR); attempt mentally or aloud; reveal; **self-grade** | Low-friction retrieval volume; the flashcard core loop | Canonical projection (see §11) + front/back + audio | Self-report (knew / not yet) | **Self-report evidence only** (weakest class; scheduling signal, never mastery proof) | No learner "error" — self-report; over/under-claiming bounded by later real production evidence | Direction must be eligibility-aware: recognition-stage items **never** demanded in recall direction (Charter §4.4) | High — but cognate-only cards inflate self-confidence; mix required | Scenario→response, FR→meaning, meaning→FR (per §11 eligibility) | Treating self-grade as production evidence; legacy `data/flashcards.ts` as source | R5 self-check | Legacy hidden (scenario deck + `lm7_srs`); **rebuild as projection** | **P0** | practice.tsx; Charter §4.4; Show me/Got it (Tasarim §19.G) |
| EV-071 | **Diagnostic Probe** | Diagnostic Drill (type 9), targeted probe | Answer one narrow authored item that isolates a *suspected* weak point | Confirm/deny weakness before repair (attribution before weakness — I-8/I-24) | Suspected weak tag + authored isolating item | One answer | **Diagnostic evidence** (confirms/denies candidate weakness) | Learner error meaningful only because isolation is authored; validator-gated | A material only | Low | Minimal isolating frames | Free generation of probes (AI cannot self-authorize); probing untaught forms | R1/R2 per payload | Canon-planned (validator-gated future) | **P1** | Exercise System Overview #9; Mastery Bible §14 |
| EV-072 | **Scenario Response / A Small Moment** | A Small Moment (v1 §18), Scenario Response, situation-response | Read a 2-4 line human situation; respond in FR; model-answer-only compare | Reading-into-production bridge; retention ritual ("not a grammar engine, NOT a chatbot") | Situation (prerequisite-safe) + response class + model + alternatives | Short FR response | Open production attempt + comparison; bounded reading evidence | No grading (model-answer-only); scoped target moves may add evidence later | A/S response material; G in scene text only | Medium-high | Small human moments | Chatbot framing; grading; **canonical seed is L16 (outside L1-L10)** — slice use limited to hub payloads if approved | R2 typed + IS-16 | Canon-planned (L16 seed; L19 recur) | **P2** (canon home outside slice) | Lesson Mechanics Ideas; Tasarim §19.D; L16 spec |
| EV-073 | **Keep One, Use It Again** | keep-one reflection | Choose one piece to "keep" at lesson end; it returns in a near-term reuse prompt | Agency + intentional reuse; reflection with a teeth | Owned-piece set + return scheduling | One selection now; one reuse later | Engagement/self-report now; the *return* produces normal production evidence via other EVs | None at selection; reuse graded by its host EV | A pieces only | Any | Lesson-end sets | Treating the selection itself as mastery | R1 choice + SEL return | Canon-planned | **P2** | EXERCISE_CANON §12, §5.2 |
| EV-074 | **Mini Conversation (bounded dialogue)** | Mini Chat, `mini_conv`, `free_conversation` op, AI chat scenario | 3-4 turn topic-locked dialogue; negotiation of meaning | Dialogue confidence (future; AI-gated) | Topic + starter + turn cap + fallback | Multi-turn text | Open production attempt; completion only; **no grading** | None; AI-generator errors must never become learner weakness (§7) | A/S expected; G tolerated in AI lines within exposure rules | High | Scene dialogues | Unrestricted AI chat (out of slice, Charter §3.2); AI as hidden judge | R2 chat shell (future) | Legacy unreachable + blocked op | **P2** (out of slice default) | MiniConversation.tsx; types.ts:103 |
| EV-075 | **Le Carnet / Personal Sentence** | Personal Sentence Writing, Own Sentence, Personal Example, Rewrite in Your Own Way, "Le Carnet yazı modu" | Write your own sentence with a chosen owned piece; kept as personal memory (Mon Lexique "your own sentences") | Personal transfer — highest-value ownership signal in canon's evidence bands ("very high: personal transfer") | Chosen piece + free input + future event/privacy/storage contract (not defined here) | Personal FR/mixed sentence | Open production attempt; personal-transfer signal (contract needed before any mastery use) | No error; raw free-text persistence governed by the future privacy/storage contract | A pieces as seed; G never required | High | Learner's life | Grading; auto-adding to mastery; any slice-scope personal-writing surface, raw free-text cloud persistence, or moderation scope (out per FD-1) | R2 typed + Mon Lexique surface (Mon Lexique stays schema-compatible with future learner-authored examples; no editing UI in slice) | Archive [ARCHIVE — Sprint 12+]; flags off all stages except sandbox | **P2 — out of slice (decided FD-1)** | Tasarim §11; Mon Lexique UI.md; DEV_APK canon |

### 5.G Registered but rejected / merged (not counted as slice variations)

| ID | Name | Reason | Disposition | Source |
|---|---|---|---|---|
| EV-090 | Word Scramble (letter unscramble) | Orthography goal better served by EV-020 (canon names the Mayonnaise route preferred); dead code today | **Reject / merge** → EV-020 | types.ts:193; EXERCISE_CANON §11.6 |
| EV-091 | Isolated "What does X mean?" MCQ | Explicit canon anti-pattern ("the exact pattern the product position rejects") | **Reject** — context-bearing forms live in EV-010/EV-011; flashcard meaning direction governed by §11 eligibility | Exercise Anti-Patterns.md; DailyReviewOverlay.tsx:140 |
| EV-092 | Broken Weave Reconstruction | Canon-removed; validator ERROR ("Weave repair only after real learner output") | **Reject** (do not revive) | EXERCISE_CANON §11 edit 7, §16 |
| EV-093 | Pronunciation Scoring / Speech Recognition | "Graded pronunciation comes much later" (FL); no validated pronunciation contract; praise-without-detection = ERROR | **Reject for slice** — shadowing (EV-004) is the speaking surface | CB §12.2; EXERCISE_CANON §4 |
| EV-094 | Decision Probe (tu/vous) | Hard-gated behind the unopened tu/vous doorway | **Reject for slice** (doorway-gated; not scheduled) | EXERCISE_CANON v0.4 note 5 |
| EV-095 | Standalone Translation Drill (EN→FR quiz mode) | Direct translation must not dominate (CB §8.5); legacy mode quarantined | **Reject as standalone** — the meaning→FR direction survives only as an eligibility-aware flashcard projection (§11) | practice.tsx:522; CB §3.2 |

---

## 6. Evidence classification

Strongest **safe** evidence per variation, using the Mastery & Evidence Bible's frame
(admissibility → attribution → polarity/strength; evidence strength attaches at admission, FQ-2;
assistance scopes the claim, FQ-3). Nothing below authorizes an evidence-pipeline change.

| Evidence class | Variations |
|---|---|
| **Exposure only** | EV-001 (Meet & Listen) |
| **Audio exposure** | EV-004 (Shadowing — plus speech-attempt completion, which is an engagement fact, not mastery) |
| **Recognition** | EV-002, EV-003, EV-010, EV-011, EV-012, EV-013, EV-014, EV-015, EV-016, EV-017, EV-018, EV-019, EV-020, EV-036; EV-021 (comparison-flavored) |
| **Recall** | EV-030, EV-033, EV-063 (formula recall component); EV-032 early rounds |
| **Controlled production** | EV-030, EV-031, EV-032 (late rounds), EV-033, EV-034, EV-035, EV-040, EV-043, EV-044 (controlled mode), EV-045, EV-046, EV-047, EV-048, EV-049, EV-050, EV-051 (line level), EV-052, EV-062 (upgrade), EV-063, EV-064 |
| **Open production attempt** (never deterministic grammar mastery without a structured contract) | EV-041, EV-042, EV-044 (open mode), EV-072, EV-074, EV-075 |
| **Comparison only** | EV-041 (reveal compare), EV-064 (alternative compare), EV-017 (delta compare) |
| **Self-correction** | EV-042 (confirm step), EV-062 |
| **Diagnostic evidence** | EV-071 (and EV-013 when authored as a targeted probe) |
| **Repair evidence** | EV-060, EV-061 (urgency-reducing only; never instant mastery — I-13, I-33) |
| **Self-report only** | EV-070, EV-073 (selection step) |
| **No mastery evidence** | every IS-### surface; EV-001 taps; hint/reveal/model exposure (I-27) |

**Never mastery, restated** (Mastery Bible §8 non-signals + Charter §6.3): opening a popup ·
viewing a reveal · listening once · reading an explanation · seeing chip anatomy (IS-08) ·
typing arbitrary freeform text without structured target moves · lesson/section completion ·
AI praise · time-on-screen.

Cross-cutting rules this inventory carries forward: recognition alone never reaches the longest
interval or strongest claim (I-31); assisted success ≠ independent production (I-26); replayed
easy material is refresh-class, low multiplier (LESSON_FLOW §9.2); no numeric weight anywhere in
this document is ratified (FQ-7 — zero founder-locked numbers).

---

## 7. Error eligibility

Signal classes per the Mastery & Evidence Bible §7 (eight error-source classes; only a verified
**learner-sourced** error may create weakness) and Content Bible §14.6 (error source before
weakness). "Weak-point candidate" = may feed repair scheduling **after** attribution.

| Variation group | Learner error | Authored trap signal | Weak-point candidate | UI/friction signal | Content error | Validator error | Audio error | No error signal |
|---|---|---|---|---|---|---|---|---|
| EV-001, IS-* (exposure/interstitial) | — | — | — | possible (confusing surface) | possible (bad copy) | possible (V2/V4) | possible (asset) | ✔ default |
| EV-002/003 (bounded reading/notice) | ✔ on the bounded action | ✔ if authored | weak (needs repetition before candidacy) | ✔ | ✔ | ✔ | — | — |
| EV-004 (shadowing) | — (ungraded) | — | — | ✔ | ✔ | ✔ (praise guard) | ✔ | ✔ |
| EV-010-021 (recognition/discrimination) | ✔ | ✔ (`trapReason` mandatory for traps) | ✔ (attributed; EV-018/019/021 weak-signal only) | ✔ | ✔ (bad distractor ≠ learner weakness) | ✔ (V3: G-as-answer) | EV-014/015/016: ✔ | — |
| EV-030-036 (recall/assembly/dictée/chip) | ✔ | ✔ (distractor tiles/splits) | ✔ | ✔ | ✔ | ✔ (build tile lints exist) | EV-034: ✔ **must be distinguishable from learner error** | — |
| EV-040 (supported weave) | ✔ (soft; no red) | ✔ (trap chips) | ✔ | ✔ (carry-over/salience rule → UI-attention event, **not** weakness) | ✔ | ✔ (W2 window) | — | — |
| EV-041/042/072/074/075 (open production) | **✖ by design** | — | ✖ (only future authored target-moves may create scoped signals) | ✔ | ✔ | ✔ (grading config = ERROR) | — | ✔ |
| EV-043-052 (constrained/transfer/chain/board) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | — | — |
| EV-060/061 (repair) | ✔ (on the repair act) | ✔ | ✔ (repair outcome updates urgency only) | ✔ | ✔ | ✔ | — | — |
| EV-062 (nudge revision) | ✖ for declining; ✔ on revision content | — | scoped | ✔ | ✔ | ✔ (nudge policy) | — | — |
| EV-063/064 | ✔ | ✔ | ✔ (formula/register tags) | ✔ | ✔ | ✔ | — | — |
| EV-070/071/073 (self-check/diagnostic/reflection) | EV-071 only | EV-071 possible | EV-071 confirms/clears candidates; EV-070 self-report never creates weakness | ✔ | ✔ | ✔ | ✔ (audio cards) | EV-070/073 otherwise |

**Not automatic learner errors** (binding on every variation): Ghost remaining in English ·
recognition material not being produced · popup opening · reveal viewing · freeform production
without structured targets · punctuation-only near miss · accent-only near miss · spelling near
miss without semantic loss (all three are context-dependent technical tags per FQ-1; where the
semantic effect is unknown they establish **neither weakness nor full precision credit**) ·
poor audio playback · misleading distractors · unclear prompts (the last three are content/audio/
UI-source, excluded from learner weakness by I-8/I-21).

---

## 8. A/R/G compatibility

Rules (Content Bible §4.7/§4.10, Payload Economy §2-3, Lesson Flow Canon §2, Mastery Bible I-9):

1. **Production-required targets are normally Active.** Supported items may be produced *with
   scaffolding*; a supported-only item is never an unscaffolded required answer.
2. **Recognition items** appear in support, discrimination, distractor, and contextual
   scaffolding roles; they are never required production (`recognition_only_form_used` guard).
3. **Ghost/exposure** may appear in exposure surfaces, reveals, audio context, scene text, and as
   *wrong* trap options; a ghost is **never** a correct answer, never required for correctness,
   never penalized, never in `piecesUsed`, and ghost production failure can never create weakness.
4. **Curriculum treatment ≠ learner evidence**: an item's A/R/G role is authored placement; what
   an interaction proves is governed separately by §6. Interaction does not promote an item —
   promotion is an explicit, status-marked curriculum event (CC-006), and measurement never
   invents pedagogy.
5. **Blocked-production** forms (e.g. inverted questions, band-wide) may appear in bounded
   context but must never be requested as production — a distinct class from both R and G
   (CB §4.7: the six roles are not interchangeable and must not be collapsed).
6. The **W2 look-ahead window** (~3-4 lessons, max 5-6, recognition-only) governs how far ahead
   reveal surfaces may show French; beyond-window reveal is a validator ERROR.

Per-variation compatibility is recorded in the §5 tables' A/R/G column. The load-bearing cases:
EV-034 Dictée (G audible, never required written — §12.7), EV-041 Open Weave (G only in reveal,
W2), EV-010/EV-013 (G only as wrong trap), EV-035/036 chip work (ghost children never tested),
EV-070 flashcards (direction eligibility — §11).

---

## 9. Interstitial, reveal, popup, and detail-surface inventory

Kept **separate from the assessed-exercise count**. Common properties: none is an assessed
exercise (no learner answer is graded); each may produce at most an engagement/exposure event
(`micro_logic_seen`, `chunk_unpack_seen`, `exposure_seen`, `srs_notice_seen` class); opening one
never creates mastery, ownership, or production evidence (Charter §6.3, I-14, I-27).
Presentation uses the Charter §6.1 primitives: **QP** Quick Peek Popover · **BS** Entity Detail
Bottom Sheet · **IS** Insight Detail Sheet · **FS** Full Entity Detail Screen · **IC** inline
card · **LN** inline line/banner.

| ID | Surface | Why not an assessed exercise | Event it may produce | Where it appears | Presentation | Slice priority |
|---|---|---|---|---|---|---|
| IS-01 | **Faux Ami insight** ("Not this / But this") | Explanation, no answer | insight_seen | Lesson insight slot; word detail | IC / BS | **P0** |
| IS-02 | **Cognate Bridge** (merci ≈ mercy; per-band list) | Display of relationship | insight_seen | Lesson; reveal; nudge candidates; word detail | IC / QP | **P0** |
| IS-03 | **Sound Pattern note** (é→s; tiny, with Listen CTA) | Sound fact, no grading | insight_seen + audio_played | Lesson; word detail | IC | **P0** |
| IS-04 | **Culture Bite** (sparing) | Context knowledge | insight_seen | Lesson; detail | IC | **P1** |
| IS-05 | **Register / Politeness insight** (how it lands) | Register note, no answer | insight_seen | Lesson; reveal; EV-048 support | IC / QP | **P0** |
| IS-06 | **Why This Works** (grammar nugget / micro-logic; one idea + one example + one action) | The "action" is an unscored micro-tap | micro_logic_seen | Level-3 insight card (≤3/lesson); level-2 long-press | IC / QP | **P0** |
| IS-07 | **Notice the Pieces** (chunk-first display; Pieces Card; Notice Card) | Pointing, not testing | item_seen | Lesson opening; meet follow-up | IC | **P0** |
| IS-08 | **Chip Anatomy Reveal / Progressive Piece Anatomy** (tap parent chip → authored internal anatomy: `je ne comprends pas` → `je` · `comprends` · `ne…pas` · lemma `comprendre`) | Detail surface; **opening produces no mastery evidence**; anatomy exposure never promotes | chunk_unpack_seen | Piece detail (post-contact only: whole first, anatomy later) | BS / QP | **P0 — required surface capability** |
| IS-09 | **Chunk Unpack Card** (whole-first formula → noticed subpiece: s'il vous plaît → vous) | Recognition/insight, not production | chunk_unpack_seen | Post-contact insight slot | IC | **P1** |
| IS-10 | **Contrast Card** (display form: de l'eau → pas d'eau) | Side-by-side display (interactive form = EV-013) | insight_seen | Insight slot | IC | **P1** |
| IS-11 | **Edge Card** (one boundary/exception, tightly scoped) | Explanation | insight_seen | Insight slot | IC | **P1** |
| IS-12 | **Return-to-Moment Card** | Re-anchors intent after an aside | screen_seen | After unpack/contrast asides | IC / LN | **P1** |
| IS-13 | **Pattern Snapshot** (exposure-only map, read once) | Never produced, never quizzed, never a chip | exposure_seen | Learn Page (once per engine) | IC | **P1** |
| IS-14 | **Tiny Throwback** (callback to an earlier piece) | Reminder display | insight_seen | Lesson; recap vicinity | IC / LN | **P1** |
| IS-15 | **Take Another Look** (neutral retry invite; self-correction overlay) | Feedback surface — interprets, never scores | retry_offered | After a miss; below-threshold transitions | LN / dialog | **P0** |
| IS-16 | **Natural Reveal** (model + why-natural + **Another Way** alternatives + register notes; branch copy per outcome) | Reveal surface accompanying all free production; comparison is the feedback | answer_compared | After EV-041/EV-042 (and free EV-044/072) | IC (full-width) | **P0** |
| IS-17 | **Later Form card** (Tiny Door / Future Seed / ADR-0016 boundary card: "a form for later") | Recognition-only future form; never gradeable as wrong | exposure_seen | When an untaught form surfaces; reveals within W2 | IC / LN | **P1** |
| IS-18 | **Recap / ownership consolidation** ("place your own stone"; atomic `piecesUsed`) | Consolidation; interactive gathering is unscored | screen_seen | Lesson end | IC | **P0** |
| IS-19 | **SRS announcement line** ("je vais is yours now — it will come back tomorrow") | One-line system transparency; streak-free retention | srs_notice_seen | Lesson end after recap | LN | **P1** |
| IS-20 | **How Weave Works** (3-card one-time interstitial: Permission / Method / Reveal; "No score.") | Method onboarding | screen_seen | Once, before L1 (after Lesson Zero) | FS (3 cards) | **P0** |
| IS-21 | **Session frames**: Fragments intro · ritual outro · **Bon Retour** comeback frame | Poetic/calm frames; no content assessed | screen_seen | Daily Review ritual; comeback | IC | **P1** |
| IS-22 | **Piece Quick Peek** (tap word/chip → meaning + audio) | Lookup | lexique_opened | Any tappable FR text; post-response chips (Charter §4.3) | QP | **P0** |
| IS-23 | **Piece / Chip Detail** (meaning, examples, sound note, common mistake, usage, register, memory anchor — approved facts only) | Reference card | mon_lexique_entry_opened | Mon Lexique; chip taps | BS | **P0** |
| IS-24 | **Word / Lemma Detail + Containing Pieces** (word → canonical pieces containing it; bounded prototype in slice) | Exploration; French-aware decomposition, never whitespace | entry_opened | Mon Lexique | BS / FS | **P0** (charter §4.5) |
| IS-25 | **Encounter Timeline / Where Met** (first-seen lesson; where-used examples) | Memory metadata display | entry_opened | Entry detail | BS | **P1** |
| IS-26 | **Related Pieces** (siblings, transformations) | Relationship display | entry_opened | Entry detail | BS | **P1** |
| IS-27 | **Learner-State Explainer** (calm status: Seen / Tried / Getting stronger…; never raw counters/enums) | Status copy, not measurement | entry_opened | Mon Lexique; flashcard detail | QP / BS | **P1** (band copy OPEN — CB §17.4) |
| IS-28 | **Metric Explainer** (what a Stats metric measures and what it does not) | Transparency copy | metric_explained | Stats drill-down | QP / BS | **P1** |
| IS-29 | **Hint Ladder** (rung 0 silent → 1 reversed pieces → 2 cloze → reactive 3 answer+write-once) | Assistance, not assessment; rung use scopes evidence (FQ-3), never punishes | hint_used {level} | All production screens (V8 expects a ladder) | LN (in-card) | **P0** |
| IS-30 | **Audio Controls** (replay, slow via playback-rate, single source recording) | Playback control | audio_played | Every audio-bearing surface; shared identity `entityId → audioId` | LN (in-card) | **P0** |
| IS-31 | **Trap Explanation** ("why the trap is attractive" — one coach line on first wrong) | Post-answer feedback interpretation | trap_explained | EV-010/EV-013 and kin | LN | **P0** |

Count: **31 surfaces** (of which IS-15/16/31 are feedback/reveal class, IS-29/30 assistance
class, the rest interstitial/detail class). System states (loading, offline, empty, error, caps,
transitions, confirmation dialogs, toasts) are tracked by the Charter's UX contracts and are
deliberately **not** listed as learning surfaces.

---

## 10. Renderer reuse map

**[REC]** Proposed primitive set (contracts, not components — naming is illustrative):

| Primitive | Serves (variations) | Count |
|---|---|---|
| **R1 — Choice Card** (options/spans/pairs/rank layouts; authored traps; optional audio stem) | EV-002, 003, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 020, 021, 036, 073 (choice step), 071 (choice payloads) | 17 |
| **R2 — Typed Production Card** (prompt → input → deterministic match / neutral compare; configs: graded, ungraded-W1, confirm-flow, repair, revision, 2-step retrieve-use) | EV-030, 033, 040, 041, 042, 044, 045, 047, 048, 052, 060, 061, 062, 063, 064, 071 (typed payloads), 072, 075; EV-034 (input half) | 19 |
| **R3 — Tile / Board Card** (piece bank → ordered assembly; word-, chip-, and line-granularity; constraints) | EV-031, 035, 043, 050, 051 | 5 |
| **R4 — Stateful Chain Wrapper** (multi-round/multi-step orchestration over R1-R3 payloads) | EV-032, 045 (sandwich), 046, 049, 063 (sequence mode) | 5 |
| **R5 — Self-Check Card** (front/back + self-grade) | EV-070, EV-073 (return prompt) | 2 |
| **R6 — Audio Stem module** (playback, slow, replay; later capture/self-playback) — composes into R1/R2/R5 | EV-001, 004, 014, 015, 016, 034 | 6 |
| **R7 — Reveal/Compare surface** (Natural Reveal + Answer Reveal + verdict copy) | feedback for all production EVs | — |
| **R8 — Interstitial/Detail primitives** (Charter §6.1: quick peek, bottom sheet, insight sheet, full screen, inline card) | all IS-### | — |

Mapping classes required by the brief:

- **Existing v1 renderer reusable as-is**: EV-001 (meet), EV-010 (fill-with-traps), EV-040/041
  (weave + ladder), EV-042 (say-it + confirm), IS-01..06 (insight-card), IS-16 (natural-reveal),
  IS-18 (recap).
- **Existing renderer requiring payload extension**: EV-001 chip-tap interaction (Faz B);
  EV-011/012/013 as fill-with-traps payload variants; EV-030 (v1 has no typed-fill screen —
  sandbox FillCard contract exists); IS-08 anatomy on the chip-tap surface.
- **Legacy mechanic worth adapting (not building on)**: EV-031 build (sandbox BuildCard is the
  keeper; legacy BuildSentence is reference), EV-070 (scenario tap-to-reveal UX, rebuilt over
  canonical projections), EV-014 (listen-item shape), EV-012 (negative-quiz framing).
- **Sandbox runtime adoptable**: EV-048 (RegisterSwitchCard), EV-049 (ContextChainCard),
  IS-17 (BoundaryLaterFormCard).
- **New reusable renderer required**: R3 board (EV-050/051 full form), R4 stateful wrapper,
  R5 self-check, R6 capture extension (post-audio-pass); R2 repair/revision configs.
- **Selector or logic only (no renderer)**: Bon Retour, error replay, Readiness Gate warm-up,
  Review Resurfacing, carryover, SRS scheduling, Keep-One return leg, Progressive Recomposition.
- **Interstitial/detail primitive**: all IS rows (R8).
- **Deferred**: R6 capture/self-playback (audio pass), any AI-tier surface (Tier A gated),
  EV-074 chat shell.

**Reported ratio**: 47 normalized variations (P0-P2) over **6 exercise primitives** (R1-R6) —
reuse ratio ≈ **7.8 : 1** (plus R7/R8 shared by feedback/detail surfaces). No variation gets a
bespoke one-off component.

---

## 11. Flashcard projection map

Canon frame: Flashcards are **projections from canonical items, sentences, audio identity, and
mastery state** — never a separate vocabulary truth source (Charter §4.4). Legacy
`data/flashcards.ts` + `lm7_srs` are quarantined reference, **not** the architecture. Direction
is **eligibility-aware**: a recognition-stage item is never demanded in a production direction;
generic isolated "What does X mean?" drilling is rejected (EV-091) — meaning-recognition cards
must carry context (sentence, scene, or function). Scheduling belongs to the selector layer;
outcomes contribute only the evidence their §6 class allows (self-report unless a typed variant
is used).

**Decided direction set (FD-4, 2026-07-31)** — four primary slice directions, one selective
support, the rest deferred or merged:

| Projection mode | Source entity | Learner action | Evidence | A/R/G eligibility | Suitable item types | Anti-pattern risks | Slice status (FD-4) |
|---|---|---|---|---|---|---|---|
| **Intent / meaning → FR recall** | item + function tag + example sentence | Produce FR (mental + self-grade; typed = EV-030/033 host) | Self-report; recall/controlled production if typed | **A only** (production demand) | spine chips, formulas, packages | Demanding R/G production; bare-translation framing | **Primary** |
| **Sentence context → missing piece** | canonical sentence + span | See sentence with gap; recall/choose the piece | Self-report / recognition; typed = EV-030 | A gap; R support; G never the gap | frames with owned fillers | Gap on ghost/recognition span | **Primary** |
| **Scenario → response recall** | scenario entity + response (EV-070's home direction) | Read situation; recall response; reveal; self-grade | Self-report (stays self-check unless a structured scoring contract exists) | A responses | survival formulas, requests | Grading; chatbot drift | **Primary** |
| **Audio → meaning / target-piece recognition** | audio identity (`entityId → audioId`) + item | Listen; self-check or choose meaning/heard piece | Self-report / audio recognition | A, R; G audible in context | short chunks, formulas | TTS-quality punishing; audio for En text | **Primary** |
| FR (in sentence context) → meaning | canonical sentence + contained item + mastery state | Read FR in context; self-check or choose meaning | Self-report / recognition | A, R; G only as untested context | early-recognition items; ambiguous/faux-ami review | Becoming the default generic drill; isolated-word meaning quiz (EV-091); cognate-only trivial decks | **Selective support only** |
| Audio → typed FR recall | audio identity + item | Type what you heard | — | — | — | Ungoverned Dictée duplication | **Deferred — merges into Dictée (EV-034 owns this contract)** |
| Chip → example selection | item + where-used examples | Pick the example that uses the chip correctly/naturally | Recognition | A/R | chunks with ≥2 examples | Unnatural authored foils | **Deferred** |
| Example → target chip identification | sentence + contained pieces | Identify which piece does the named job (EV-003 kin) | Recognition | A/R | anchor sentences | Whitespace-parsing feel | **Deferred** |

Rules (unchanged by the fold): all cards derive from canonical item/sentence/audio/mastery
identities; no separate legacy flashcard vocabulary database; direction is selected by item
eligibility and learner state; not every item supports every direction. Directions are card
*payloads* over EV-070 (self-check) or, where typed, over EV-030/EV-033 — they are not new
variations. Isolated generic "What does X mean?" repetition stays rejected (EV-091).
Selector weights = downstream calibration (§16.2).

---

## 12. Dictée contract (EV-034)

**[SOURCE]** The only repo trace is EXERCISE_CANON §11 edit 6: "Guided Dictation v2 stays
Later/limited; the Mayonnaise Game / spelling hypothesis ladder is the preferred playful
orthography route." Dictée is normalized as **one exercise contract**
(`audio → written French controlled production`), explicitly **not** collapsed into listening
recognition (EV-014 selects; EV-034 writes).

**Decided status (FD-3, 2026-07-31):** Dictée is **in the L1-L10 slice as selective P1
showcase depth.** Included modes: **Micro Dictée, Guided Dictée, and selected Sentence
Dictée**. Deferred: **Context Dictée**, paragraph/multi-line Dictée, broad orthography grading,
and high-pressure replay limits.

### 12.1 Payload / difficulty modes (one contract; inclusion per FD-3)

| Mode | Learner writes | Stays one contract because | Slice status |
|---|---|---|---|
| **Micro Dictée** | one chip/short chunk (2-4 syllables) | same action, smaller span | **Included** — begins with short survival chunks |
| **Guided Dictée** | the missing span inside a visible cloze | same action + visible scaffold (assistance-scoped, FQ-3) | **Included** — after sufficient active ownership |
| **Sentence Dictée** | one full short sentence | same action, full span | **Included selectively** — later L1-L10 lessons and integration checkpoints, only when the full written material is production-eligible |
| **Context Dictée** | a span/sentence heard inside a 2-3 line scene | same action + discourse context | **Deferred** |

No mode needs a different renderer (all are R6 audio + R2 typed) or a materially different
evidence interpretation; they remain payload modes. If a future pilot shows Context Dictée
producing distinct discourse-segmentation evidence, split it then — not now. Per-lesson Dictée
counts are downstream calibration (§16.2), not prescribed here.

### 12.2 Playback and hints

- Replay: free replays (count recorded as assistance context, never punished);
  high-pressure replay limits are **deferred** (FD-3).
- Slow playback: **playback-rate on the single source recording first** — no duplicate slow
  recording except for explicitly approved sound-teaching clips (Charter §4.8/§10.2; FD-3).
- Hint behavior: the standard ladder (IS-29) adapted — rung 1 = word-count/shape skeleton,
  rung 2 = cloze with function words given, reactive rung 3 = show transcript + "write it once"
  (low-weight). Hints scope the claim (FQ-3), never invalidate the attempt.

### 12.3 Accepted-answer normalization

Reuse the shipped normalization direction (`normalizeAnswer.ts`): fold case and terminal
punctuation; **keep apostrophes meaningful** (elision is French, not noise); accept authored
variants. Numerals-vs-words and hyphenation variants are authored accepted-variant entries, not
grader heuristics.

### 12.4 Spelling / accent / punctuation handling

Per FQ-1 (meaning-based polarity, binding): a meaning-preserving orthographic slip is a
**precision signal** — no failure, no weakness, no demotion from that slip alone. A
meaning-changing substitution (`un/on`, `ou/où`, `a/à`) **may** be negative evidence — but the
technical tag alone cannot establish which occurred, so an ambiguous event establishes neither
weakness nor full precision credit (I-24). Therefore Dictée **must not infer broad grammar
weakness from a single spelling, accent, punctuation, or segmentation miss** — at most it records
orthographic observations and, on *attributable* meaning-changing misses, a sound/writing-tag
candidate.

### 12.5 Audio-quality failure handling

Dictée admissibility requires **verified recorded audio** (or explicitly QA-passed TTS in
founder-only testing). A miss on unverified/degraded audio is an **audio-source error** (§7
class), never learner weakness; "poor audio" must remain a distinguishable attribution, and the
report-audio-issue tap (Charter §6.2) is the learner-facing escape.

### 12.6 Evidence boundaries

May produce: audio-recognition evidence · segmentation evidence · recall evidence · controlled
written-production evidence · orthographic observations. May not produce: grammar-system
mastery claims, pronunciation evidence, or any evidence on ghost material.

### 12.7 A/R/G rules

Required written spans must be **Active** (or supported-with-scaffold in Guided mode).
Recognition material may occur in the audio and be **given** in the cloze, never demanded.
**Ghost material may be audible in context but must never silently become required written
production** — a sentence whose written target includes G spans is ineligible for Sentence
Dictée and must fall back to Guided/Micro on the A spans.

### 12.8 L1 suitability analysis (mandated cases)

| Sentence | Analysis | Verdict at L1 |
|---|---|---|
| `Vous pouvez confirmer la réservation ?` | `vous pouvez` = A survival-pattern stem; `confirmer` / `la réservation` = cognate-heavy candidate payload (recognition-band at L1 in any plausible redesign); cognate spelling interference (réservation ≠ reservation) is exactly the miss class that must stay precision-scoped | **No full-sentence Dictée.** At most **Micro Dictée on `vous pouvez`** or **Guided cloze** with the cognate spans given. Sentence Dictée becomes plausible only when the cognate payload reaches supported+written status |
| `Allons-y, mais je voudrais d'abord un café.` | `Allons-y` = frozen formula with elision+liaison, chunk-only at L1 (y-analysis is L14 territory); `mais`, `d'abord` = connective/ghost-band; `je voudrais un café` = fully owned A span | **No full-sentence Dictée at L1.** **Selected active span** (`je voudrais un café`) as Micro/Guided Dictée is the ceiling; `Allons-y` written production would silently require ghost/chunk-internal orthography |

**Decided disposition (FD-3, 2026-07-31)**: Dictée is included as **selective P1 showcase
depth** — Micro Dictée first on short survival chunks; Guided Dictée after sufficient active
ownership; selected Sentence Dictée only in later L1-L10 lessons and integration checkpoints,
and never where Recognition or Ghost material would become required written production (the two
L1 analyses above therefore stand: no full-sentence Dictée on either sentence). Context Dictée
is deferred. Per-lesson counts are downstream calibration (§16.2).

---

## 13. Chip-decomposition audit

Four behaviors, kept distinct (per the brief; grounded in chip-taxonomy §4-§6 and CB §4):

1. **Chip Anatomy Reveal → IS-08 (detail surface, P0).** Tap a canonical parent chip; see its
   authored internal anatomy (`je ne comprends pas` → `je` · `comprends` · `ne…pas` · lemma
   `comprendre`). Opening produces **no mastery evidence** (chunk_unpack_seen only).
2. **Chip Decomposition → EV-036 (recognition exercise, P1 bounded pilot per FD-2).** Identify/select the
   correct authored internal structure. Produces chunk-boundary recognition,
   internal-pattern recognition, reusable-piece awareness — **not** grammar mastery, **not**
   open production.
3. **Chip Rebuild / Parent-Chunk Reconstruction → EV-035 (controlled production, P1 bounded
   pilot per FD-2).** Rebuild a known parent chip from authored child pieces. Produces guided recall,
   controlled reconstruction, parent-chunk production evidence. **Distinct from full-sentence
   ordering** (EV-031) — the unit is the chip's interior, not sentence syntax.
4. **Progressive Recomposition → content-lifecycle + Content Factory capability + selector
   behavior, not a new renderer.** Previously revealed child pieces later appear in new approved
   combinations. It is: (a) a Content Factory obligation (authored child identities +
   span/entity links so approved recombinations can be generated and validated), (b) a selector
   behavior (surfacing recombinations when children are warm), (c) rendered entirely through
   existing variations (EV-031/040/043/046). No `EV` is assigned.

**Hard guardrails** (all inherited, binding on any implementation): whole first, anatomy later ·
the parent chip remains canonical and learner-valid after decomposition · child nodes never
replace or flatten the parent · decomposition is **authored and French-specific** — whitespace
tokenization is forbidden as pedagogy (Charter §4.5) · lexical units like `quelqu'un` are never
misleadingly split · contractions, elision, discontinuous structures (`ne…pas`), conjugated
surfaces, articles, and PROTECTED_CHUNKS/SURVIVAL_FORMULAS require explicit French QA (CB §18.3
lists chip segmentation in QA scope) · anatomy exposure does not promote mastery · ghost child
material never silently becomes required production · decomposition appears only when it adds
later reuse or understanding value.

### 13.1 Compatibility checks

Curriculum-stage entries are **[REC]** estimates against the ratified L0-L17 spine (CC-004);
none is a placement decision. "Evidence" = safest producible class.

| Candidate | Valid parent chip? | Useful child pieces | Must NOT split | Earliest suitable stage | Suitable variations | Safe evidence |
|---|---|---|---|---|---|---|
| `je ne comprends pas` | ✔ survival formula (closed class) | `je` · `comprends` (→ lemma `comprendre`) · discontinuous `ne…pas` | `ne…pas` never into bare `ne`/`pas` as standalone UI chips (Caveat atoms) | Anatomy: after L3 (negation owned) — reveal-only earlier is acceptable post-contact; Rebuild: L3+ | IS-08; EV-036; EV-035; EV-063 (usage) | chunk-boundary recognition; parent-chunk reconstruction |
| `je voudrais` | ✔ spine chip / polite-request formula | `je` · `voudrais` (lemma `vouloir`, conditional flavor **named, not taught**) | do not surface a conditional paradigm; `voudrais` not a standalone production chip | Anatomy: L1+ (post-contact); Rebuild: low value (2 pieces) — prefer frame work (`je voudrais ___`) | IS-08; EV-036 (light); frame variations EV-030/040 | anatomy exposure; internal-pattern recognition |
| `pour ce soir` | ✔ as PP package/expression chunk (not in current L1-L10 registry — candidate material) | `pour` (Caveat function word) · `ce soir` (time package) | `ce`+`soir` stays one time-package early; `pour` not promoted to prominent UI chip | Whole use: when a booking/time scene owns it; anatomy: one lesson after contact | IS-08; EV-036; EV-010 (slot: `pour ce soir` vs `pour demain`) | exposure → recognition; package reuse awareness |
| `à la gare` | ✔ place-PP package (candidate; `où` scenes are L8 territory) | `à` (Caveat) · `la gare` (noun package) | `à la` contraction system (au/aux) **not** opened; article never detached from noun early | Whole use: L8-band (`C'est où ?` scenes); anatomy: L8+ post-contact | IS-08; EV-036; EV-046 (place-slot transfer `à la gare`/`à la maison`) | recognition; slot-transfer production (whole package) |
| `qu'est-ce que ça veut dire` | ✔ survival-formula-shaped candidate (would require Haktan approval — closed class) | early: none required; later: `ça` · `veut dire` (lemma `vouloir dire`) | **never** decompose `qu'est-ce que` into wh-machinery pre-doorway (L12 `est-ce que` is the wrapper doorway); elision `qu'` protected | Whole use: L1-band as frozen rescue formula (if approved); anatomy: L12+ (wrapper owned) | EV-063 (usage); IS-08 late; EV-036 only post-L12 | formula recall; usage evidence — anatomy long-deferred |
| `avec quelqu'un` | partial — `avec` (Caveat) + `quelqu'un` (indivisible lexical unit) | `quelqu'un` as one piece; `avec ___` as pattern later | **`quelqu'un` must never be split** (quel/qu'/un is morphology trivia, not pedagogy) | Whole use: mid-band social scenes (beyond current L1-L10 registry); anatomy: only `avec` + `quelqu'un` boundary | EV-010 (slot); IS-08 (boundary display only) | recognition; package awareness |

**Decided priorities (FD-2, 2026-07-31):** Chip Anatomy Reveal = **P0 required surface
capability** (IS-08). Chip Decomposition (EV-036) and Chip Rebuild (EV-035) = **P1 — bounded
showcase pilots**, applied only to authored, high-reuse structures where anatomy has clear
downstream value — never to every decomposable chip. Progressive Recomposition =
**architecture/Content Factory + lifecycle + selector requirement**, not a new renderer or
exercise count.

- **Initial showcase candidates:** `je ne comprends pas`; selected `vous pouvez …` /
  request-frame anatomy where French QA approves it; article/package structures around L5;
  one cumulative recomposition example around L10.
- **Protected negative cases:** `quelqu'un`; `Allons-y` at L1; apostrophe/elision units whose
  decomposition would confuse; frozen/protected chunks without immediate reuse value.
- **Pilot success criteria:** learners understand the whole better; child pieces visibly
  reappear later; decomposition does not increase cognitive noise; parent-chip ownership
  remains intact; no whitespace-tokenization leakage occurs.
- Exact number and placement of pilot instances = downstream calibration (§16.2).

---

## 14. L1 sentence ecosystem compatibility check

The four sentences below are **candidate L1-redesign material supplied by the task brief** (they
are not in any shipped lesson; they presuppose the L1 Survival Kit redesign of CC-007 plus a
cognate-forward payload not yet ratified). This check tests the *inventory* against them; it
authors no lesson content and decides no curriculum placement. Assumed treatment at L1-redesign
time: A = survival formulas + owned engines (`je voudrais`, `vous pouvez ___ ?`, `je ne
comprends pas`, `excusez-moi`, `merci`, `un café`); cognate nouns/verbs (`confirmer`,
`la réservation`, `la situation`, `contacter`, `le responsable`) = recognition/ghost-band
payload; `Allons-y`, `mais`, `d'abord` = frozen-formula / connective / ghost band.

### S1 — `Vous pouvez confirmer la réservation ?`

- **High-value**: EV-001 Meet & Listen (cognate-rich first contact); EV-010 fill on `vous
  pouvez ___ ?` slot (options incl. cognate trap `confirmer`/`confirm`); EV-011 context choice
  (which request fits the hotel scene); EV-040 supported weave ("Ask them to confirm the
  booking" — cognates carry the payload); EV-041 open weave; EV-004 shadowing (rising intonation
  of the non-inverted question — S1's pedagogy).
- **Acceptable, lower value**: EV-014 audio recognition; EV-046 slot transfer
  (`vous pouvez confirmer / répéter ___ ?`); EV-062 nudge upgrade from "Can you confirm?".
- **Invalid**: any variation demanding written/typed production of `confirmer la réservation`
  while cognate payload is R/G (EV-030 gap on it, Sentence Dictée — §12.8); inversion
  (`Pouvez-vous`) anywhere in production (locked: recognition-only band-wide).
- **Evidence targets**: recognition of `vous pouvez ___ ?` frame; controlled production of the
  frame with given payload; cognate-bridge exposure.
- **A/R/G**: `vous pouvez` A · `confirmer`, `la réservation` R/G (context/reveal/options only).
- **Chip anatomy**: IS-08 on `vous pouvez` (later `réservation` → `réserver` lemma link);
  no early decomposition of the question wrapper.
- **Dictée**: no full sentence; Micro on `vous pouvez` at most (§12.8).
- **Flashcards**: scenario→response ("The desk needs to confirm — what do you ask?"); FR-in-
  context→meaning for `la réservation` (cognate: near-free recognition).
- **Popups**: IS-02 cognate bridge (confirmer/confirm, réservation/reservation); IS-05 register
  (why `vous pouvez` not `tu peux` here — display only, pre-doorway); IS-22 piece peeks.

### S2 — `Je ne comprends pas la situation.`

- **High-value**: EV-001; EV-035 chip rebuild of the parent formula (post-L3); IS-08 anatomy
  (`ne…pas` + `comprends`); EV-047 same-engine-new-layer lineage display (affirm ↔ negated);
  EV-063 recovery usage; EV-010 fill (`Je ne ___ pas la situation`, traps `suis`/`comprends`).
- **Acceptable, lower value**: EV-013 contrast (`je ne comprends pas` vs `je ne suis pas` —
  engine choice); EV-030 typed recall of the formula (owned whole).
- **Invalid**: decomposing `ne…pas` into standalone `ne`/`pas` UI chips; grading the extension
  `la situation` as required production while cognate-band; treating formula+object extension as
  a new chip (it is formula + noun-package composition).
- **Evidence targets**: survival-formula recall; negation-frame boundary recognition;
  object-extension exposure.
- **A/R/G**: `je ne comprends pas` A (survival formula) · `la situation` R/G payload.
- **Chip anatomy**: the flagship IS-08 case (§13.1 row 1).
- **Dictée**: Micro Dictée on the formula is the *best* Dictée case in L1-band (owned whole,
  high-frequency); still P2/audio-gated.
- **Flashcards**: meaning→FR recall of the formula (A, eligible); scenario→response ("You're
  lost in the conversation — say so").
- **Popups**: IS-02 (`situation` = situation — free cognate); IS-06 why-this-works (the
  `ne…pas` sandwich); IS-27 status on the formula.

### S3 — `Excusez-moi, vous pouvez contacter le responsable ?`

- **High-value**: EV-052 missing move (drop `Excusez-moi` → learner supplies the opener);
  EV-011 context choice (escalation scene); EV-040 supported weave; EV-051 line bank (build the
  polite escalation exchange); EV-061 scene repair (blunt version → add opener/landing).
- **Acceptable, lower value**: EV-014; EV-033 function recall ("get someone's attention →
  excusez-moi"); EV-064 two-ways (excusez-moi / s'il vous plaît as attention devices — display
  register notes).
- **Invalid**: producing `contacter le responsable` from memory while R/G; faux-ami risk unmanaged
  — `responsable` (noun, person in charge) vs EN "responsible" (adjective) needs IS-01 before any
  trap use; tu/vous decision framing (gated).
- **Evidence targets**: social-opener move evidence; request-frame reuse; cognate-verb exposure.
- **A/R/G**: `excusez-moi`, `vous pouvez` A · `contacter` R (transparent cognate) · `le
  responsable` R/G with faux-ami note.
- **Chip anatomy**: `excusez-moi` unpack (later: `excusez` + `moi`) is IS-09 material, low
  priority.
- **Dictée**: unsuitable beyond Micro (`excusez-moi`) — two-clause length + R/G payload.
- **Flashcards**: scenario→response (P0 direction); chip→example for `excusez-moi`
  (attention-opener vs apology contexts, later).
- **Popups**: IS-01 faux ami (`responsable`); IS-05 politeness; IS-24 containing-pieces
  (`vous pouvez` inside both S1 and S3 — cross-sentence identity display).

### S4 — `Allons-y, mais je voudrais d'abord un café.`

- **High-value**: EV-001 (scene flavor); EV-010 fill on the owned span (`je voudrais ___`);
  EV-045 combine display-case (formula + contrast connective + owned request — as **model
  answer** showcase); EV-044 continue-the-moment ("They say Allons-y — you want coffee first");
  EV-041 open weave ("let's go, but I want a coffee first" → natural mixed attempt).
- **Acceptable, lower value**: EV-014 audio recognition of `Allons-y` as a whole sound-shape;
  IS-17 later-form card for `allons` (nous-form = far-future; `-y` = L14 doorway seed);
  EV-070 scenario card.
- **Invalid**: any production requirement on `Allons-y` at L1 (frozen formula, ghost-band
  analysis; y-machinery is the L14 doorway); requiring `mais`/`d'abord` in output; sentence
  ordering across the clause boundary (two-clause build too heavy for L1).
- **Evidence targets**: owned-span production inside richer ambient sentence; exposure to
  connective flow; formula sound-shape recognition.
- **A/R/G**: `je voudrais`, `un café` A · `mais` R-band connective · `Allons-y`, `d'abord` G/
  frozen-exposure (never required).
- **Chip anatomy**: **negative case** — `Allons-y` must NOT decompose at L1 (elision+`y`); IS-08
  may show it as an unopenable "whole for now" or defer entirely; `d'abord` never split from its
  apostrophe.
- **Dictée**: no full sentence; selected active span `je voudrais d'abord un café` still fails
  (contains G `d'abord`) → `je voudrais un café` Micro span only (§12.8).
- **Flashcards**: meaning→FR on `je voudrais un café` (A); FR-context→meaning card exposing
  `Allons-y` (recognition direction only).
- **Popups**: IS-22 peeks on `Allons-y` (whole-chunk gloss "let's go"); IS-06 why-this-works on
  `d'abord` position (display); IS-30 audio slow-replay (liaison in `Allons-y`).

This check intentionally does **not** generate the full L1 exercise pool; that is workstream 5-6
of the Charter sequence.

---

## 15. Vertical-slice priority recommendation

Classification of all 47 normalized variations (+6 rejected rows), **updated by the 2026-07-31
decision fold (§16.1)** — recommendation and decided status are marked per row above. Principle: P0 =
the connected product loop cannot demonstrate "real deal" without it; P1 = showcase depth at the
L1/L5/L10 checkpoints and hub volume; P2 = architecture-compatible, deferred (audio-deferred,
doorway-gated, or deferred by the §16.1 fold). Broad final-product coverage is achieved without forcing
every sentence into every variation (Charter §8: eligibility-aware derivation, not
"every sentence × every mechanic").

| Priority | Variations | Count |
|---|---|---|
| **P0 — required for the L1-L10 real-deal slice** | EV-001 Meet & Listen · EV-010 Fill with Traps · EV-011 Meaning-in-Context Choice · EV-013 Micro-Contrast · EV-030 Typed Recall Fill · EV-031 Build · EV-033 Function Recall → Use · EV-040 Supported Weave · EV-041 Open Mixed Weave · EV-042 Say It Your Way · EV-060 Grammatical Repair · EV-070 Tap-to-Reveal Self-Check | **12** |
| **P1 — showcase depth** | EV-002 Micro-Reading · EV-003 Light Piece Hunt · EV-004 Shadowing (FD-6) · EV-012 Spot the Mistake · EV-014 Audio Recognition (FD-6) · EV-017 What Changed · EV-032 Starter Fade · EV-034 Dictée — selective, Context deferred (FD-3) · EV-035 Chip Rebuild (bounded pilot, FD-2) · EV-036 Chip Decomposition (bounded pilot, FD-2) · EV-043 Choose Your Pieces · EV-044 Continue the Moment · EV-045 Combine/Engine Sandwich · EV-046 Same Slot New Job · EV-047 Same Engine New Layer · EV-048 Register Switch · EV-049 Context Chain · EV-050 Moment Builder Board · EV-051 Line Bank with Traps · EV-052 Missing Move · EV-061 Scene Repair · EV-062 Nudge Revision · EV-063 Survival Mode (no pressure, FD-7) · EV-064 Two Ways to Say It · EV-071 Diagnostic Probe | **25** |
| **P2 — architecture-compatible, deferred** | EV-015 Minimal-Pair (FD-6) · EV-016 Hear the Shape (FD-6) · EV-018 Match Pairs · EV-019 Odd One Out · EV-020 Mayonnaise Game · EV-021 Semantic Ranking (FD-5) · EV-072 Scenario Response/A Small Moment · EV-073 Keep One Use It Again · EV-074 Mini Conversation · EV-075 Le Carnet (out of slice, FD-1) | **10** |
| **Reject / merge** | EV-090 Scramble · EV-091 Isolated meaning MCQ · EV-092 Broken Weave Reconstruction · EV-093 Pronunciation Scoring · EV-094 Decision Probe (gated) · EV-095 Standalone Translation Drill | **6** |

Interstitial/detail priorities are in §9 (P0: IS-01/02/03/05/06/07/08/15/16/18/20/22/23/24 and
the assistance/feedback surfaces IS-29/30/31; remainder P1).

Sequencing note **[REC]**: per EXERCISE_CANON §4, new interaction patterns land
**Practice-Hub-first**; the lesson path runs on the shipped 7 screen types plus payload
extensions. P0 requires **no new lesson screen type**.

---

## 16. Founder/Product Decision Fold (2026-07-31) and remaining calibration

### 16.1 Decision fold — FD-1…FD-7 all decided

> These are **founder/product decisions folded into this Draft workstream artifact on
> 2026-07-31.** Recording them here does not make this document Canonical, does not amend any
> Canonical file, and **authorizes no implementation** — each disposition is planning direction
> for the slice workstreams. Settled canon was not reopened (W1/W2, hub-never-gates, no
> pronunciation scoring in MVP, 7 frozen screen types, PROTECTED_CHUNKS, integration
> active-new = 0).

| ID | Decision (2026-07-31) | Disposition | Affected rows | Remains deferred | Non-claim |
|---|---|---|---|---|---|
| **FD-1 — decided** | **Le Carnet is out of the L1-L10 slice** | EV-075 stays architecture-compatible, P2/deferred; no separate personal-writing feature surface in the slice; no raw free-text cloud persistence, moderation, or privacy scope created; Mon Lexique stays schema-compatible with future learner-authored examples, with no "Your own sentences" editing UI required; retention of learner-produced responses follows the **future** event/privacy/storage contract, which is **not invented here** | EV-075; §11 note; IS-23/24 unaffected | The personal-writing feature itself; its privacy/storage contract | No implementation; no contract authored |
| **FD-2 — decided** | **Chip decomposition = bounded P1 showcase pilot** | IS-08 Anatomy Reveal stays P0 surface capability; EV-036 Decomposition and EV-035 Rebuild become **P1 bounded pilots** on authored, high-reuse structures only (candidates, negative cases, and success criteria in §13); Progressive Recomposition stays a Content Factory + lifecycle + selector requirement, not a renderer or exercise count | EV-035, EV-036, IS-08, §13 | Applying decomposition beyond the pilot set; exact instance count/placement (§16.2) | Pilot authorization is a later implementation gate, not this doc |
| **FD-3 — decided** | **Dictée is in the slice as selective P1** | EV-034 P2 → **P1 selective**; modes in: Micro + Guided + selected Sentence; deferred: Context Dictée, paragraph/multi-line, broad orthography grading, high-pressure replay limits; no full-sentence Dictée where R/G would become required production; playback-rate slow mode first; FQ-1 orthography semantics binding (§12) | EV-034, §12, §14 S1/S2/S4 analyses | Context Dictée; per-lesson counts (§16.2) | No audio files, no runtime |
| **FD-4 — decided** | **Four primary flashcard directions** | Primary: intent/meaning → FR recall · sentence context → missing piece · scenario → response recall · audio → meaning/target recognition. Selective support: FR → meaning (early recognition / faux-ami review only, never the default drill). Deferred/merged: audio → typed FR recall (merges into EV-034), chip → example, example → chip; isolated generic meaning MCQ stays rejected (EV-091) | §11 map; EV-070 | Deferred directions; selector weights (§16.2) | Projection architecture, not implementation |
| **FD-5 — decided** | **Semantic Ranking stays P2** | EV-021 kept distinct from sentence ordering, architecture-compatible, deferred — neither rejected nor implemented; not needed to prove the connected loop; needs unusually careful distractor/ambiguity authoring | EV-021 | The mechanic itself | None |
| **FD-6 — decided** | **Audio-dependent mechanics split** | Included P1: Shadowing (EV-004), Audio Recognition (EV-014), selective Dictée (per FD-3). Deferred P2: Minimal-Pair (EV-015), Hear the Shape as a separately assessed exercise (EV-016); pronunciation scoring / speech-recognition grading / replay-and-compare **scoring** stay rejected-for-slice (EV-093). Sound Pattern interstitials (IS-03) + audio controls (IS-30) may demonstrate sound differences unscored. Architecture/payloads audio-ready before final recordings; recorded human audio expected for approved canonical content in the feedback build; TTS remains fallback | EV-004, EV-014, EV-015, EV-016, EV-034, EV-093, IS-03, IS-30 | EV-015/016; scored speech of any kind; final audio coverage % (§16.2) | No audio files created in this pass |
| **FD-7 — decided** | **Survival Mode has no timer/pressure** | EV-063 stays P1 as: produce/recover meaning with limited owned pieces, stay in the interaction without switching wholly to English, use available language strategically, accept partial-but-functional communication, optionally use the hint ladder. Rejected for the slice: timers, countdowns, lives, competitive speed, urgency copy. The historical Tasarım §19.G "timed/pressure optional" note is preserved in the ledger **as history, marked rejected** | EV-063; ledger 4.F row | Nothing (the pressure payload is rejected, not deferred) | None |

### 16.2 Remaining downstream calibration (implementation/pilot matters, not founder decisions)

- exact number and placement of chip-decomposition pilot instances (FD-2);
- exact per-lesson Dictée counts and span choices (FD-3);
- final human-audio coverage percentage for the feedback build (FD-6);
- flashcard selector weights and per-direction mix (FD-4).

These are settled by pilot evidence and implementation review, within the decided boundaries
above.

---

## Appendix A — Validation record (pre-commit checks)

- Every normalized variation row carries source evidence (repo path or explicit
  `brief`/`v0.3-gap` marker). ✔
- Every raw ledger row has a normalized destination (EV/IS/SEL/SYS/LIFE/FEAT/REJ or explicit
  `v0.3-gap` with revisit note — 1 row: Anchor Break). ✔
- Aliases are merged into single EVs, never duplicated as separate exercises. ✔
- Dictée (EV-034) is not merged into listening recognition (EV-014). ✔
- Chip Decomposition (EV-036) is not merged into generic Build (EV-031); Chip Rebuild (EV-035)
  is likewise separate. ✔
- Chip Anatomy Reveal (IS-08) is excluded from assessed exercises and from mastery evidence. ✔
- Shadowing (EV-004) is not merged with pronunciation scoring (EV-093, rejected). ✔
- Scene Repair (EV-061) is not merged with grammatical Error Correction (EV-060). ✔
- Scenario Recall (EV-070 payload, self-report) is not merged with scored MCQ (EV-011). ✔
- Semantic Ranking (EV-021) is not merged with sentence ordering (EV-031). ✔
- Ghost is never required production anywhere (§8 rule 3; §12.7; per-row A/R/G columns). ✔
- Free/open production (EV-041/042/072/074/075) claims no deterministic grammar mastery without
  a structured contract (§6). ✔
- Interstitials/popups (31 surfaces) are excluded from the assessed-exercise count. ✔
- Renderer primitive count (6) is substantially smaller than variation count (47). ✔
- No Canonical status claimed; banner states non-canonical, non-overriding, non-authorizing. ✔
- No runtime, schema, validator, lesson, feature-flag, or Canonical file changed — this document
  is the only change in the commit. ✔

Decision-fold checks (2026-07-31 pass):

- Dictée is P1 **selective** (Micro + Guided + selected Sentence); Context Dictée deferred
  (EV-034 row, §12.1, §12.8, §16.1). ✔
- Chip Decomposition (EV-036) and Chip Rebuild (EV-035) are **P1 bounded pilots** with authored
  candidates, protected negative cases, and success criteria (§13, §16.1); Anatomy Reveal stays
  P0 capability with zero mastery evidence. ✔
- Flashcard Projection Map carries exactly **four primary** slice directions + one selective
  support; audio → typed FR recall merged into Dictée; remaining directions deferred; generic
  isolated meaning MCQ still rejected (§11). ✔
- Survival Mode (EV-063) recommendation contains **no timer/countdown/pressure/speed framing**;
  the historical Tasarım §19.G timer option survives only as a ledger history row marked
  rejected (4.F, §16.1 FD-7). ✔
- Le Carnet (EV-075) remains **outside the L1-L10 slice** — P2/deferred,
  architecture-compatible, no privacy/storage contract invented (§16.1 FD-1). ✔
- Audio inclusion/deferral is internally consistent: EV-004/EV-014/EV-034 P1 vs EV-015/EV-016
  P2 vs EV-093 rejected; IS-03/IS-30 remain unscored demonstration surfaces (§16.1 FD-6). ✔
- Every FD-1…FD-7 reference in the document is marked **decided**; none remains open; §16.2
  holds only implementation/pilot calibration items. ✔
- P0/P1/P2/reject totals recomputed from the §5 rows after the fold: **12 / 25 / 10 / 6**
  (47 variations + 6 reject rows unchanged in membership except the decided priority moves). ✔
- This fold pass changed only this document; no runtime, schema, validator, lesson, registry,
  feature-flag, test, audio, or Canonical file was touched. ✔

*End of Exercise Variation Inventory v0.1 — Draft vertical-slice planning artifact. Next
charter deliverables: `INTERSTITIAL_AND_DETAIL_SURFACE_INVENTORY_v0.1.md` (may promote §9),
`AUDIO_ASSET_CONTRACT_v0.1.md`, L1 sentence ecosystem freeze, L1 Sentence × Exercise × Evidence
pilot matrix.*
