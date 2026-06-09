# L0–L24 Founder Build Matrix & Engine Gap Audit (v0)

> **Status:** planning doc, v0. Docs-only — authorizes **no** runtime code, DB, Supabase, UI,
> route, or content-production change. Locked product canon wins on conflict.
> **Base:** `main` @ `a9f1516` (TTS placeholder validator hardening merged; 75/75 engine tests green).
>
> **Sources:** `docs/learning-engine-v1.md`, `docs/syllabus/*` (L1–L17 specs + `L10-L20-band-map-v0.md`
> + `ai-generation-contract-v1.md` + `canonical-item-id-convention-v0.1.md`),
> `docs/status/founder-self-learning-*` checkpoints, `content/learning-engine/*` (code as of base).

---

## 1. Purpose

This document is the **working bridge** from the current learning-engine sandbox
(`/learn/[fixtureId]`, founder-gated, fixture-driven) to a **real L0–L24 Founder Learning Build**:
a build the founder can actually learn French from, end to end, on device, with events, mastery,
Mon Lexique, and review loops running for the full first arc of the course.

It is a **build-driving map**, not a manifesto. It answers four questions:

1. What do the first 25 lessons (L0–L24) need, lesson by lesson?
2. Which exercise engines must exist (and which already do)?
3. What data / events / errors must be captured for those lessons to count?
4. What is explicitly deferred, and what are the next 10 PRs?

**This document is NOT:**

- **not a public launch plan** — Founder Build is sandbox/founder-only; dev-apk stays on frozen v1
- **not the final full course** — L18–L24 rows are provisional; specs do not exist yet
- **not a visual polish spec** — screen behavior is defined as data contracts only
- **not a DB implementation** — remote schema remains a draft-stage deliverable (PR10), deploy is Operator-only
- **not a v1 expansion** — v1 (`content/lessons/v1`, `components/lesson-v1`) stays frozen as the
  temporary Dev APK smoke surface; nothing here adds to it

---

## 2. Current engine inventory

What exists on `main` today, and whether it carries L0–L24.

| Capability | Where | Current capability | Usable for L0–L24? | Main gaps |
|---|---|---|---|---|
| Lesson contracts / fixtures | `content/learning-engine/types.ts`, `lessons/` | Typed `LessonContract` + `ExerciseBlueprint` union; fixtures for L1, L2, L11, L12, L14, L15, L16, L18; L11→L12→L16 chain smoke-verified | **Partial** | Only 8 of 25 lessons have fixtures; L0, L3–L10, L13, L17, L19–L24 missing; fixture ids (`l1`, `l2`…) don't yet map 1:1 to founder syllabus slots (runtime "L1 Je suis" content belongs at L2 per resolved fork) |
| Item registry | `registry.ts`, `items.ts`, `mergeItemMapsStrict` | Central item map, strict merge (duplicate ids throw), ownership per lesson | **Yes** | Canonical-ID convention v0.1 (`chunk:` / `word:` / `frame:`…) not yet adopted; current ids are provisional hyphen style |
| Recognition | `RecognitionCard.tsx`, `operation: "recognition"` | Match/read card; reveal counts as recognition event | **Yes** | No listen-first variant (audio-before-text); no notice framing (see §4) |
| Listen on recognition | `RecognitionCard.tsx` (#93) | Listen affordance speaks the FR text via TTS | **Yes** | Listen exists only on recognition; fill/build/context_chain have no listen affordance |
| Fill | `FillCard.tsx`, `FillExercise` | Blank fill with deterministic `grade()`; `blankLabel`/`blankCount` | **Partial** | No trap/distractor options — `fill_with_traps` (choose among plausible wrong forms) is a schema + UI gap |
| Build | `BuildCard.tsx`, `BuildTile` | Tile assembly; answer = tile sequence by `answerIndex`; distractor tiles supported; punctuation-insensitive reconstruction | **Yes** | None blocking; register ladder handled by `register_switch` variant |
| Register switch | `RegisterSwitchCard.tsx` | Choose-the-register ladder (direct vs polite form) | **Yes** | — |
| Context chain | `ContextChainCard.tsx`, `operation: "context_chain"` | Scene + sequential fixed-answer steps (A Small Moment seed shape) | **Yes** | Reading-response framing (L16 "A Small Moment" presentation) is copy/shell work, not engine work |
| Boundary later-form | `BoundaryLaterFormCard.tsx` | Soft "a form for later" card; never production-required | **Yes** | — |
| Lesson progress selector | `lesson-progress.ts` `selectLessonProgress` | Pure selector over events → started/completed per exercise | **Yes** | Completion strictness still an open decision (attempt coverage vs correctness) — see §11 |
| Learning events | `events.ts` `LearningEvent`, `ErrorTagCode` | Append-only event with operation, itemIds, promptLevel, attempt, answers, result, errorTags, contentVersion, sync status | **Yes (spine)** | `ErrorTagCode` is answer-shaped (16 codes); the learner-facing error taxonomy in §5 needs a mapping layer, a few new tags, and per-exercise `targetErrorTags` metadata |
| Session controller + local repo | `session-controller.ts`, `repository/` | Serialized append; `LocalRepository` on kvStorage; `readAllEvents → scoreEvents → MasterySnapshot` | **Yes** | `RemoteRepository` intentionally absent (deferred, §9) |
| Mastery + selectors | `mastery.ts` (v0.2), `mon-lexique.ts`, `practice-pool.ts` | Per-item counters → `monLexiqueStatus`, `practiceEligibility`, `leitnerBox`, `dueAt`; near-miss precision policy; Mon Lexique + Practice Pool selectors and shells | **Yes** | Daily Review **seed selector** (today's N items from `dueAt`/weak) does not exist yet |
| Completion view | `LessonCompletionView.tsx` | Calm end-of-lesson view in sandbox renderer | **Yes** | "What you can now do" framing per lesson canDo — copy only |
| TTS placeholder validation | `validate.ts` (#96) | `tts_audio_text_contains_placeholder` catches `___`, `[___]`, `{{…}}`, TODO/TBD/XXX/PLACEHOLDER on audioText + revealed strings | **Yes** | — |
| L2 fixture | `lessons/L2.*`, `/learn/l2` | "Je suis (ici)" — recognition + fill + insight-via-recognition approximation (#94) | **Yes** | The insight approximation is the strongest argument for a real `notice` engine (§4) |
| Privacy/data-rights layer | `privacy-*.ts`, P5 checkpoint | Local-only export/reset, founder disclosure | **Yes** | Remote consent flow deferred with remote sync |

**Inventory verdict:** the spine (events → mastery → projections) and 5 card engines are real and
tested. The bottlenecks for a 25-lesson founder build are: **(a)** lesson coverage (8/25 fixtures),
**(b)** 4–5 missing engine shapes (§4), **(c)** error-tag mapping + per-exercise targeting (§5),
**(d)** Daily Review seed selector, **(e)** a runtime shell that sequences lessons instead of
single deep-linked fixtures (§8).

---

## 3. L0–L24 lesson matrix

Grounding: **L0–L5 locked** (lesson specs), **L6–L17 documented** (specs / compact specs + gate
reviews), **L18–L20 band-map Option C** (provisional), **L21–L23 unspecified** (provisional rows,
open decision D2), **L24 Campfire** settled as landmark (~L24 soft gate; legacy "paywall after
L14" is archive). Item codes: A = active-new, S = supported-new, R = recognition-only (counts are
spec planning targets, not validators).

### Table A — pedagogy

| L | Title / purpose | Primary learner outcome | Main active items | Supported | Recognition-only |
|---|---|---|---|---|---|
| **L0** | First Taste — café onboarding moment | Say one real polite request: «Bonjour, je voudrais un café.» | `chunk:bonjour`, `chunk:je-voudrais`, `word:cafe` (~2–3) | `chunk:sil-vous-plait` | melody/politeness ambient |
| **L1** | Survival Kit — full social exchange | Open, ask politely, recover from breakdown, close | greetings, `je voudrais + N`, `merci`/`au revoir`, rescue chunks (`je ne comprends pas`, `pouvez-vous répéter`) (~9) | politeness frames (~8) | exchange responses (~12) |
| **L2** | Être / Identity («je suis», «je suis ici») | State identity/location: «je suis ___», «c'est ___» | `chunk:je-suis`, `word:ici`, `c'est` frames (~10) | tu/vous forms of être (~11) | il/elle est, plural forms (~13) |
| **L3** | Yes, No & You | Negate («ne…pas»), answer yes/no, choose tu/vous | `phen:negation-ne-pas` on owned verbs, `oui`/`non` (~10) | intonation questions (~10) | `si` (yes-to-negative), est-ce que preview (~11) |
| **L4** | Avoir / Human States | Express states: «j'ai faim/soif/peur», «j'ai besoin de» | avoir-state chunks (~8) | `j'ai besoin de + N` (~8) | il/elle a, age (~10) |
| **L5** | Objects & Articles | Package objects: un/une, le/la | `word:un`/`word:une` + core nouns (~8) | `le`/`la` definite use (~9) | plural `des`/`les` (~8) |
| **L6** | Foundation Integration / Human Context | Recombine L1–L5 in one human scene | ~0–2 meta | recombination (~3–4) | — (recycle-dominant) |
| **L7** | Aller / Movement | Move: «je vais à ___» | `chunk:je-vais`, `à + place` (~6–8) | `on va`, destination slots | `aller` other persons |
| **L8** | Où / Location Control | Ask where: «où est ___ ?», «c'est où ?» | `word:ou-where` frames (~5–7) | `c'est où`, location answers | richer location preps |
| **L9** | Faire / Small Actions / Pause | Do small actions: «faire une pause», «faire ça» | faire-light chunks (~5–7) | activity slots | faire idioms (weather etc.) |
| **L10** | After-Class Integration | Recombine L1–L9 | ~0–2 meta | recombination | — |
| **L11** | Pouvoir-light / Help & Permission | Ask/offer help: «vous pouvez… ?», «je peux… ?», «je ne peux pas» | pouvoir help/permission chunks (~5–7) | infinitive chains | broad pouvoir (held) |
| **L12** | Est-ce que / Question Wrapper | Wrap yes/no questions: «est-ce que…» | `phen:est-ce-que` on owned frames (~4–6) | wrapped variants of L1–L11 | inversion (held) |
| **L13** | Can-Do / Asking Integration | Recombine L1–L12 | ~0–2 meta | recombination | — |
| **L14** | Y-light / Place Pronoun | Use place-y as chunks: «j'y vais», «on y va» | y-chunks (frozen, ~3–5) | y in owned frames | general y (held) |
| **L15** | Devoir / Falloir-light / Obligation | Express obligation: «il faut + inf», «je dois + inf» | obligation chunks (~4–6) | infinitive slots | broader devoir (held) |
| **L16** | Integration + A Small Moment seed | First micro-reading (≤2–3 lines) + 1 scaffolded response | ~1–3 meta | reading-response (~3–4) | reading-only forms (held) |
| **L17** | Human Context / Feelings-light | Social check-in: «ça va ?», «ça ne va pas», «content/contente» | ça-va chunk-set + 1 adjective (~3–5) | feeling recombinations (~4–6) | broader emotion lexis (held) |
| **L18** *(provisional)* | Futur proche stronger preview (NOT owned) | Recognize «je vais + inf» as "going to" | **0 active** (by design) | supported recognition (~6–8) | full futur proche (post-Campfire) |
| **L19** *(provisional)* | Integration / weak-point repair / ASM recurrence | Repair weak items; recombine L11–L18 | ~0–2 meta | repair pool (~3) | — |
| **L20** *(provisional)* | Pre-Campfire checkpoint | Capability proof across L1–L19 | ~0–2 | proof set (~2–3) | — |
| **L21** *(provisional — open D2)* | Candidate: review/Time-light expansion | TBD | TBD | TBD | TBD |
| **L22** *(provisional — open D2)* | Candidate: human-context expansion | TBD | TBD | TBD | TBD |
| **L23** *(provisional — open D2)* | Candidate: Campfire on-ramp consolidation | TBD | TBD | TBD | TBD |
| **L24** *(landmark)* | Campfire — soft promise gate | Crossing moment: see the paid-zone promise (full engines: futur proche, passé composé, full questions) | ~0 new | curated proof | promise previews |

### Table B — build requirements

AI need legend: **det** = deterministic only (model-answer/expected-bank), **AI-light** = optional
AI assist behind flag, **AI-heavy** = requires live AI. Readiness: **now** = can build with current
engines, **engine** = blocked on a §4 engine, **content** = blocked on a content/spec decision.

| L | Required exercise engines | Required error tags (§5) | Mon Lexique hooks | Daily Review hooks | AI need | Production readiness |
|---|---|---|---|---|---|---|
| L0 | recognition, listen_shadow-lite (listen→repeat framing), fill | sound/listening, naturalness | add `chunk:je-voudrais`, `word:cafe` | seed +1d on 2–3 items | none | **now** (listen_shadow can degrade to recognition+Listen) |
| L1 | recognition, fill, build, context_chain (exchange), repair_sentence (rescue) | meaning, naturalness, register, word order | add survival chunks | +1d/+3d on rescue chunks | none/det | **engine** (repair_sentence; degradable to fill) |
| L2 | recognition, **notice**, fill, build | form, verb form, elision (orthography) | add je-suis family | être forms due-cycle | none | **now** (fixture exists; notice currently approximated) |
| L3 | recognition, notice, fill_with_traps (si/oui, negation placement), build | negation, word order, register (tu/vous) | add negation phen | high-frequency weak review | det | **engine** (fill_with_traps) |
| L4 | recognition, fill_with_traps (être/avoir trap), build | form (être-vs-avoir), meaning | add avoir-states | contrast drills due | det | **engine** (fill_with_traps) |
| L5 | recognition, fill_with_traps (gender), build | article/gender, number | add noun+article pairs | gender weak-tags due | det | **engine** (fill_with_traps) |
| L6 | mixed recap set (existing engines), weave_lite seed | cumulative | confidence bumps | recycle-dominant set | det | **now** (weave_lite optional here) |
| L7 | recognition, fill, build, context_chain | meaning, pronoun/particle (à) | add movement chunks | +1d movement | det | **now** (needs fixture) |
| L8 | recognition, fill_with_traps (où/ou), build | meaning, sound/listening | add question frames | question frames due | det | **engine** (fill_with_traps) |
| L9 | recognition, fill, build | meaning, over-literal | add faire chunks | +3d faire | det | **now** (needs fixture) |
| L10 | integration set + weave_lite | cumulative | confidence | recycle set | det | **now**/engine (weave_lite) |
| L11 | recognition, fill, build, register_switch | register, verb form (infinitive chain) | add help chunks | +1d help chunks | det | **now** (fixture exists) |
| L12 | recognition, fill, build (wrapper assembly) | word order, form | add est-ce-que phen | wrapped-question due | det | **now** (fixture exists) |
| L13 | integration set + weave_lite | cumulative | confidence | recycle | det | **now**/engine |
| L14 | recognition, fill (frozen chunks), build | pronoun/particle (y), word order | add y-chunks | y-chunk due | det | **now** (fixture exists) |
| L15 | recognition, fill, build, register_switch | verb form, meaning (il faut vs je dois) | add obligation chunks | obligation due | det | **now** (fixture exists) |
| L16 | context_chain (**mini_reading_response** framing), say_it_your_way_lite (model-answer), natural_reveal_lite | meaning, naturalness, over-literal | reading-met items | ASM recurrence seed | **det (model-answer-only, locked)** | **engine** (SIYW-lite + reveal-lite framing; fixture exists for chain) |
| L17 | recognition, fill, build, say_it_your_way_lite | meaning, register, gender (content/contente) | add ça-va set | check-in due | det → AI-light later | **engine** (SIYW-lite) |
| L18 | recognition (preview framing), boundary | sound/listening | recognition-status entries | preview recurrence | none | **now** (fixture exists; needs preview copy discipline) |
| L19 | repair_sentence, practice-pool reuse, context_chain | weak-tag driven | confidence repair | weak-first review | det | **engine** (repair_sentence) |
| L20 | curated proof set (existing engines) | cumulative | curated proof view | checkpoint set | det | **now** (needs content curation) |
| L21–L23 | TBD (open D2) | TBD | TBD | TBD | TBD | **content** (open decision) |
| L24 | completion/promise view (no new engine) | — | curated milestone | — | none | **content** (Campfire copy + promise set) |

**Matrix verdict:** with `fill_with_traps`, `notice`, `repair_sentence`, `weave_lite`,
`say_it_your_way_lite`/`natural_reveal_lite` framing, and the existing five engines, **every
specified lesson L0–L20 is buildable deterministically** (no live AI required anywhere
pre-Campfire — L16/L17 are locked `model-answer-only`). The blocking work is engines + fixtures,
not AI and not DB.

---

## 4. Engine gap audit

Priority: **P0** = required for Founder Build L0–L24, **P1** = improves it but degradable,
**later** = post-Founder-Build. "Attempt event" = emits a graded `LearningEvent` through the
session controller (vs recognition-style reveal event).

| Engine | Exists today? | Minimum schema needed | Minimum UI behavior | Attempt event | Feedback mode | Error tags emitted | Priority |
|---|---|---|---|---|---|---|---|
| **recognition** | **Yes** (`recognition`) | — | — | reveal event | n/a | — | P0 (done) |
| **fill** | **Yes** (`fill`) | — | — | graded | deterministic `grade()` | answer-shape tags | P0 (done) |
| **fill_with_traps** | **No** — `FillExercise` has no options array | `options: { itemId or text, trapTag? }[]` + `correctIndex` (or reuse `BuildTile`-style item refs); validator: traps must come from lesson trap set, never production-required | tap-one-of-N; wrong pick shows calm contrast line (why the trap tempts) | graded | deterministic | trap's tag (e.g. article/gender, negation, si-vs-oui, être-vs-avoir) | **P0** — L3/L4/L5/L8 depend on it |
| **build** | **Yes** (`build` + tiles + distractors) | — | — | graded | deterministic sequence check | wrong_order, wrong_item, missing/extra | P0 (done) |
| **context_chain** | **Yes** (`context_chain`) | — | — | graded per step | deterministic fixed answers | step-level tags | P0 (done) |
| **notice** | **No** — approximated via recognition (#94) | `operation: "notice"`: `insightText`, `anchorItemIds`, optional contrast pair; never graded | show pattern insight tied to anchor sentence; single "continue" (no right/wrong) | reveal-style event (`notice_shown`) | none (input, not test) | none | **P0** — every full-cycle lesson has a Pattern step; current approximation distorts recognition stats |
| **weave_lite** | **No** | `operation: "weave_lite"`: `mixedPrompt` (EN scaffold + FR slot(s)), `expectedAnswer`, `acceptedAlternatives` | render mixed-language sentence, learner supplies the FR piece; deterministic check | graded | deterministic (expected-bank) | form, meaning, word order | **P1** — integration lessons (L6/L10/L13) want it; degradable to fill until then |
| **say_it_your_way_lite** | **No** (`open_production` exists in `OperationId` but has no blueprint/card — renders `UnsupportedCard`) | `operation: "open_production"` blueprint: `situation`, `targetItemIds`, `modelAnswer`, `acceptedPatterns?`, `validationMode: "model-answer-only"` | free text input → show model answer + self-compare (no grading pretension); log verbatim answer | graded-lite (`result: incorrect_but_understandable` family or self-marked) | **model-answer-only** (locked for free zone) | meaning, naturalness (self/deferred) | **P0** — L16/L17 need it in seed form |
| **natural_reveal_lite** | **No** (static copy exists in v1 only) | per-exercise `reveal?: { literal, natural, why, registerNote?, weakPointTag? }` on existing blueprints (not a new operation) | after answer: one calm card — literal vs natural + one "why" | no (attaches to existing attempt) | static content | tags via weakPointTag | **P0** — cheap (schema + card section), carries the product promise |
| **repair_sentence** | **No** | `operation: "repair_sentence"`: `brokenText`, `correctedText`, `errorTag`, optional tile mode | show flawed sentence; learner fixes (retype or tile-swap); deterministic compare | graded | deterministic | the planted tag (negation, gender, word order…) | **P1** — L1 rescue + L19 repair want it; L19 is the hard dependency, degradable to fill_with_traps before that |
| **listen_shadow** | **Partial** — Listen exists on recognition only | `audioFirst: true` flag on recognition (hide text until after listen), optional `shadowPrompt` | play TTS first; reveal text after; "say it aloud" prompt is honor-system (no ASR) | reveal event | none (no speech recognition in Founder Build) | sound/listening (self-marked later) | **P1** — L0 wants the moment; degradable to recognition+Listen |
| **mini_reading_response / A Small Moment seed** | **Partial** — `context_chain` is the seed shape (L16 fixture exists) | presentation metadata on `context_chain`: `readingText` (≤2–3 lines), `responsePrompt`; known-items-only enforced by existing ownership validation | read short scene → one scaffolded response; calm, no timer | graded (chain steps) | deterministic, model-answer for response | meaning, over-literal | **P0** — framing/copy work on existing engine, locked `model-answer-only` |

**Gap verdict:** **2 new engines are hard P0** (`fill_with_traps`, `notice`), **2 are P0
extensions of existing shapes** (`open_production` blueprint+card for SIYW-lite, `reveal` metadata
for Natural-Reveal-lite), **3 are P1 degradable** (`weave_lite`, `repair_sentence`,
`listen_shadow`). Everything else is content/fixture work on engines that already exist. All P0
feedback stays deterministic — consistent with the locked free-zone `model-answer-only` policy.

---

## 5. Error Tracking Matrix v0

Practical taxonomy for L0–L24 only. Two layers, by design:

- **Existing code layer** (`ErrorTagCode` in `events.ts`): answer-shaped (16 codes:
  `wrong_item`, `wrong_order`, `missing_word`, `extra_word`, `wrong_register`, `meaning_shift`,
  near-miss precision tags, etc.) — stays the **result vocabulary** of every event.
- **Pedagogical layer** (this table): lesson-meaningful categories that map onto one or more
  `ErrorTagCode`s plus a per-exercise `weakPointTag`. The matrix below is the v0 mapping contract;
  it requires **adding a `pedagogicalTags?: string[]` (or widening `errorTags`)** rather than
  replacing the existing enum.

| Category | Learner-facing meaning (calm mirror) | Internal event tag | Early-lesson example | Det vs AI |
|---|---|---|---|---|
| meaning | "This says something different than you meant" | `meaning_shift` | L4: «je suis faim» instead of «j'ai faim» | det (trap/expected-bank); AI-light post-Campfire |
| form | "Right idea, the shape needs adjusting" | `wrong_item` + `ped:form` | L2: «je es» instead of «je suis» | det |
| naturalness | "Correct, but a French speaker would say it differently" | `accepted_variant` + `ped:naturalness` | L1: «je veux un café» vs «je voudrais un café» | det (reveal-lite); AI-light later |
| register | "This is the casual/formal version — context wants the other" | `wrong_register` | L3: «tu» to the café server | det (register_switch) |
| article/gender | "un/une (le/la) pairing" | `ped:gender` | L5: «un baguette» | det (traps) |
| number/plural | "Singular vs plural shape" | `ped:number` | L5: «les café» | det |
| verb form | "Verb doesn't match the subject/slot" | `ped:verb-form` | L2: «vous es» | det |
| pronoun/particle | "Small word (y, à, de) misplaced or missing" | `ped:particle` | L14: «je vais y» instead of «j'y vais» | det |
| word order | "Pieces are right, order isn't" | `wrong_order` | L12: «est-ce que» inside the clause | det (build) |
| negation | "ne…pas placement" | `ped:negation` | L3: «je ne pas comprends» | det |
| accent/orthography | "Spelling/accent precision" (never a failure early) | `accent_only` / `spelling_near_miss` (precision, NOT weak) | L2: «je suis la» vs «là» | det (already implemented in mastery-v0.2) |
| sound/listening | "What you heard vs what was said" | `ped:listening` | L8: «où» vs «ou» by ear | det (listen variants) |
| unknown item / out-of-contract | (never shown to learner as error — content bug) | `overproduction_unseen_form` / `blocked_form_used` / `recognition_only_form_used` | exercise demands an item the lesson doesn't own | det (validator already blocks at content time) |
| over-literal translation | "Word-for-word English shows through" | `ped:over-literal` + `meaning_shift` | L4: «j'ai besoin» dropped «de» — "I have need a coffee" | det early (traps/reveal); AI-light is the long-term home |

**Rules carried from mastery-precision policy (locked):** precision tags (`accent_only`,
`punctuation_only`, `spelling_near_miss`) never increment weakness, never demote Leitner box,
never enable challenge eligibility. `empty_or_skip` is neutral. Learner-facing copy stays a calm
mirror — no "wrong!", no streak/XP language anywhere in feedback.

---

## 6. Example generation needs

What a (future) generation engine must receive — aligned with
`docs/syllabus/ai-generation-contract-v1.md`; restated here as the build-facing contract.
Founder Build itself ships deterministic-only; this section exists so fixtures and the generator
contract (PR9) use the same shape, and AI can be added post-Campfire without re-architecture.

**Required inputs (per generation request):**

- `lessonId` — which lesson owns the output
- `contractVersion` / `contentVersion` — pins what "owned" means at generation time
- `activeItemIds`, `supportedItemIds`, `recognitionOnlyItemIds` — ownership lists from the contract
- `blockedItemIds` / `blockedForms` — the holds (e.g. full futur proche pre-Campfire)
- `operation` — exactly one engine shape from §4 (generator never invents operations)
- `targetErrorTags` — which §5 categories this exercise is allowed to probe (drives trap choice)
- `registerTarget` — tu/vous · polite/casual expectation
- `acceptedAnswerPolicy` — `ValidationMode` (`exact-or-alternative` / `expected-bank` / `model-answer-only`) + alternatives list
- `literalVsNaturalTarget` — separate fields for the literal rendering and the natural rendering (feeds reveal-lite; never collapsed into one "translation")

**The generator must never:**

- require a blocked item or form (validator: `blocked_form_used` family is a content-time hard error)
- introduce unseen production forms (active/supported production only from owned lists; `overproduction_unseen_form` guard)
- ignore item ownership (every produced token must trace to itemIds; no orphan vocabulary)
- collapse Natural Reveal into simple translation (literal and natural targets stay separate fields with a "why")
- generate answers the validator cannot audit (every output must be expressible as a typed `ExerciseBlueprint` that passes `validateContent` 0/0/0 — if the validator can't check it, it doesn't ship)

---

## 7. Data / event needs derived from L0–L24

Minimum objects only — no DB design here. "Exists" = on `main` today.

| Object | Why L0–L24 needs it | Exists now? | Gap |
|---|---|---|---|
| **LearningEvent** | Source of truth for everything (locked architecture) | **Yes** (`events.ts`) | `pedagogicalTags` field (§5); `notice_shown` reveal kind |
| **ExerciseAttempt** | Per-attempt grading record inside an event | **Yes** (folded into `LearningEvent`: `attemptNumber`, answers, `result`) | None for Founder Build — keep folded; split only if remote analytics demands it |
| **ErrorEvent** | Weak-point detection feeding review/repair | **Partial** (`errorTags` on events; `weakTags` aggregated in mastery) | §5 mapping layer; per-exercise `targetErrorTags` metadata so errors are attributable to a probed category |
| **LessonProgress** | Resume + completion + Home communication | **Yes** (`selectLessonProgress`, events-derived) | Completion-strictness decision (D6); multi-lesson course map (which lesson is "next") does not exist |
| **MasterySnapshot** | All projections (Lexique, Pool, Review) read it | **Yes** (mastery-v0.2) | None blocking; staged-strictness stays future |
| **MonLexiqueEntryProjection** | "Becoming yours" surface across 25 lessons | **Yes** (`selectMonLexiqueEntries`) | Canonical-ID adoption (D7) so entries stay stable across lesson re-slots |
| **DailyReviewSeed** | The daily ritual needs "today's N items" | **No** | New pure selector over `MasterySnapshot` (`dueAt` + weak-first + recycle mix); no UI hub needed for Founder Build — a list + existing practice panel suffices |
| **ContentVersion** | Events must pin which contract graded them (re-derivation safety) | **Yes** (field on `LearningEvent`) | Discipline only: bump on every fixture change; consider a per-lesson version map when contracts multiply |

**Data verdict:** the event spine needs **no structural rework** for L0–L24. New work = one
selector (DailyReviewSeed), one field-level extension (pedagogical tags), one convention adoption
(canonical IDs), one discipline (contentVersion bumps).

---

## 8. Modern runtime shell needs

What the founder-facing shell must do for L0–L24. Data contracts and required behavior only — no
visual design. Today's `/learn/[fixtureId]` renders ONE fixture per deep link; the Founder Build
shell adds course-level sequencing on top of the same spine.

| Shell capability | Required behavior (contract level) | Exists today? |
|---|---|---|
| Start lesson | Resolve lesson N from a **course map** (`CourseMap: { slot: number; fixtureId: string; canDo: string }[]`); create session via `LearningSessionController` | Partial (single-fixture route; no course map) |
| Render mixed engine cards | Sequence `ExerciseBlueprint[]` through the card registry; unknown operation → `UnsupportedCard` (never crash) | **Yes** |
| Show feedback | Deterministic grade → calm mirror copy (`feedbackCopy.ts`); reveal-lite card when `reveal` metadata present | Partial (reveal-lite missing) |
| Log attempt | Every graded interaction appends exactly one serialized event (duplicate-guard stays) | **Yes** |
| Progress through lesson | `selectLessonProgress` drives position; advance/skip rules per D6 | **Yes** (within one fixture) |
| Completion | `LessonCompletionView` + write-through so course map unlocks slot N+1 | Partial (view exists; no unlock chain) |
| Lexique update moment | After completion, surface "added to Mon Lexique: …" from `selectMonLexiqueEntries` delta (calm, label-free) | No (selector exists; moment missing) |
| Review hook | Entry point that runs the DailyReviewSeed list through the existing practice panel | No (blocked on §7 seed selector) |
| Exit / resume | Exiting mid-lesson loses nothing (events already persisted); resume = recompute progress from events; no separate resume store | **Yes** by architecture (needs an explicit re-entry path in shell) |
| Debug / founder diagnostics | Existing dev player + a founder-visible "engine state" toggle (event count, snapshot summary) — debug surface stays separate from learner UI (locked boundary) | Partial (dev player exists) |

**Shell verdict:** the shell is a **course-map + sequencing + two moments (lexique delta, review
entry)** layer over an already-working spine — not a rewrite. Biggest new contract: `CourseMap`.

---

## 9. Cut / defer list

Explicitly **out** of Founder Build scope (revisit post-founder-smoke):

- **Word Graph** — post-beta canon; only canonical IDs (D7) keep the door open
- **Full AI chat** — stays off; free zone is deterministic; AI evaluation only post-Campfire behind flag
- **Full paywall implementation** — Campfire @ L24 is a *soft promise gate* in Founder Build (copy + locked previews), no RevenueCat, no purchase flow
- **Full Daily Review hub** — Founder Build ships seed selector + plain list into existing practice panel; the 4-screen ritual is later
- **Full Mon Lexique UI polish** — existing shell + entry cards suffice; deeper note/your-sentences polish later
- **Public onboarding polish** — L0 is the onboarding; no account/marketing surfaces
- **Advanced analytics dashboard** — founder reads local diagnostics; remote dashboard belongs to tester phase
- **Full DB sync (Supabase/RemoteRepository)** — local-first engine is not yet course-complete; remote sync waits until the local engine carries L0–L24 (also Operator-gated: deploy, secrets, RLS) — schema **draft** (PR10) is the only DB artifact in scope
- **APK smoke** — none until a build candidate exists; v1 dev-apk surface stays frozen and untouched

---

## 10. PR roadmap — next 10 PRs

Build-enabling order: unblock the widest lesson band first (traps → events → contracts), defer
abstractions until something consumes them. Revision vs the expected direction: **notice is merged
into PR3** (same schema+card pattern as traps, and L2's approximation is already distorting
recognition data), **reveal-lite rides PR5's fixture work** (schema is trivial, content carries
it), and the **runtime shell moves up to PR7** (nothing proves the course works end-to-end until
lessons chain) — Mon Lexique moment and Daily Review seed follow it instead of preceding it.

| # | Title | Goal | Likely files | Why it unlocks speed | Validation | Risk | Type |
|---|---|---|---|---|---|---|---|
| **PR1** | `docs(architecture): add L0–L24 founder build matrix v0` | Land this document as the working map | `docs/architecture/l0-l24-founder-build-matrix-v0.md` | Shared map; every later PR cites a row instead of re-arguing scope | docs-only: typecheck/tests stay green | none | **docs** |
| **PR2** | `feat(learning-engine): add fill_with_traps blueprint + validation` | Schema + validator rules for trap options (traps from lesson trap set; never production-required; trap tag required) | `content/learning-engine/types.ts`, `validate.ts`, `scripts/tests/` | Unblocks L3/L4/L5/L8 — the biggest specified band currently blocked | typecheck, validate:content 0/0/0, new validator tests | Low — additive union member | code |
| **PR3** | `feat(learning-engine): trap + notice cards in learner renderer` | `FillWithTrapsCard` + `notice` operation (schema'd in same PR) + `NoticeCard`; retire L2's recognition-as-insight approximation | `types.ts` (notice), `components/learning-engine/`, `lessons/L2.*` | Every full-cycle lesson has a Pattern step; recognition stats stop lying | typecheck, tests, sandbox smoke on `/learn/l2` | Med — first new cards since P3; event-kind for notice must not pollute grading | code |
| **PR4** | `feat(learning-engine): pedagogical error tags + targetErrorTags` | Add `pedagogicalTags` to events + per-exercise `targetErrorTags`; map per §5; mastery weak-tags consume them | `events.ts`, `types.ts`, `mastery.ts`, tests | Error data becomes lesson-meaningful before 17 new fixtures start emitting events | typecheck, mastery tests extended | Med — touch event schema early, BEFORE volume (cheap now, costly later) | code |
| **PR5** | `feat(learning-engine): L0+L1 contracts/fixtures + reveal-lite schema` | L0 (first taste) + L1 (survival kit) fixtures with trap/notice/reveal metadata; `reveal` field + completion-card rendering | `lessons/L0.*`, `lessons/L1.*`, `index.ts`, `types.ts` (reveal), card touch-ups | The course finally STARTS at its real start; reveal-lite proves the promise on day one | validate:content 0/0/0, chain smoke l0→l1→l2 | Med — L0/L1 specs are locked but fixture-authoring reveals spec gaps | code (content fixtures) |
| **PR6** | `feat(learning-engine): L3–L5 contracts/fixtures` | The locked foundation spine becomes runnable (traps from PR2/PR3 heavily used) | `lessons/L3.*`–`L5.*`, `index.ts` | Completes L0–L5 locked band → founder can learn the real spine end-to-end | validate:content, chain smoke l0→l5 | Low–med — content volume, engine already proven | code (content fixtures) |
| **PR7** | `feat(learning-engine): course map + founder shell sequencing` | `CourseMap` contract; `/learn` index → next lesson; completion unlocks slot N+1; resume re-entry | `content/learning-engine/course-map.ts`, `app/learn/`, shell components | Turns 6 fixtures into a COURSE; everything after this is testable as a real learning loop | typecheck, progress selector tests, sandbox walkthrough | Med — first multi-lesson state; keep it a pure projection of events | code |
| **PR8** | `feat(learning-engine): daily review seed + lexique delta moment` | `selectDailyReviewSeed` (pure, `now` injected) + post-completion "added to your lexique" delta view | `content/learning-engine/daily-review.ts`, shell, tests | Closes the learn→retain loop; founder starts reviewing on day 2 | selector unit tests, typecheck | Low — selectors over existing snapshot | code |
| **PR9** | `docs(syllabus): generator contract v1.1 + L6–L10 fixture batch` | Align §6 inputs with `ai-generation-contract-v1.md` as typed contract doc; author L6–L10 fixtures (deterministic, integration band) | `docs/syllabus/`, `lessons/L6.*`–`L10.*` | Mid-band coverage; generator contract frozen while still cheap to change | validate:content, chain smoke l0→l10 | Low–med | docs + content fixtures |
| **PR10** | `docs(architecture): remote schema + sync draft v0` | Draft-only Supabase schema for events/snapshots (cohort-ready), consent flow, RLS sketch; NO deploy | `docs/architecture/remote-schema-draft-v0.md` | Lets Operator review/deploy on their own clock while fixtures continue in parallel | docs-only | none (draft) | **docs** |

After PR10 the remaining work is fixture batches (L11–L17 exist; L18–L20 from band map; L21–L24
pending D2) plus P1 engines (`weave_lite`, `repair_sentence`, `listen_shadow`) slotted where their
first consuming lesson lands.

---

## 11. Decision points (user decisions needed before implementation)

| # | Decision | Current state | Needed by |
|---|---|---|---|
| **D1** | **L1 fork** — confirm the syllabus resolution (L0 café taste / L1 Survival Kit / L2 être-identity) as build canon, including re-slotting runtime "Je suis" content to L2 | Resolved in L1 spec canon note; runtime fixture ids still pre-resolution | PR5 (L0/L1 fixtures) |
| **D2** | **L21–L23 lesson content** (and confirmation of L18–L20 band-map Option C as build order) | L18–L20 provisional; L21–L23 unspecified | before L18+ fixtures (post-PR9) |
| **D3** | **Supabase timing** — keep remote sync fully deferred until local engine carries L0–L24 (this doc's assumption), or pull schema deploy earlier for tester cohort | Deferred per P5 checkpoint; draft lands at PR10 | PR10 review |
| **D4** | **Dev APK surface** — stays frozen v1 until engine shell (PR7) survives founder smoke, then cut over? Or keep v1 even longer | v1 frozen per dev-apk-v1-freeze-checkpoint | post-PR7 |
| **D5** | **AI feedback in Founder Build** — confirm free-zone stays deterministic `model-answer-only` end-to-end (this doc's assumption); AI-light enters only post-Campfire behind flag | Locked for L16/L17 seeds; global confirmation pending | PR9 (generator contract) |
| **D6** | **Completion strictness** — attempt coverage vs non-skip vs correctness threshold per lesson; and whether recognition reveals count | Open since P3 checkpoint | PR7 (course map unlock rules) |
| **D7** | **Canonical-ID migration timing** (`chunk:` / `word:` prefix convention v0.1) — adopt at PR5 (new fixtures clean from the start, old fixtures migrate) or defer wholesale | Convention authored, not adopted | PR5 |
| **D8** | **A Small Moment placement in build test** — keep at L16 as spec'd, or trial earlier (e.g. seed at L13 integration) during founder smoke | L16 per locked spec; founder may want earlier exposure to evaluate the ritual | PR9 (L13/L16 fixture authoring) |

---

*End of v0. Expected to revise after PR2–PR5 land and the first L0–L5 founder walkthrough produces real event data.*
