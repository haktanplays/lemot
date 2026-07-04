# Le Mot Exercise & Learning Scale Canon v0.4

**Status:** Working canon / planning document.
**Scope:** Complete exercise catalog + lesson/practice-hub architecture + UI/state model + dynamic engine notes.
**Primary goal:** Keep Le Mot production-first without turning it into a translation app, grammar drill app, or flashcard app.
**Authorizes:** nothing by itself. Runtime, engine, and content changes each ship through their own gated PRs.

## v0.4 change note (alignment with merged canon, PRs #164-#172)

v0.3 was drafted before the L7-L15 batches, the chip canon, the Payload Economy,
and the product Q&A landed. v0.4 aligns it:

1. **Lesson vs Practice Hub split (NEW, Haktan 2026-07):** the lesson teaches the
   concept with examples (exposure, input, logic, first output); the Practice Hub
   carries the volume. Same exercise families, different homes. See §5.
2. `pouvez-vous répéter ?` replaced everywhere with **`vous pouvez répéter ?`** —
   the locked survival formula (PAYLOAD_ECONOMY §4.1); inversion stays
   recognition-only band-wide (#167-#169 canon).
3. `il y a` rows marked **deferred** — it is a separate later doorway (L14 spec,
   PR #169, audit reject). Same Slot / New Job starts with two engines and gains
   the third job when il y a opens.
4. L2 Pattern Snapshot kept but pinned as **exposure-only orientation** — read-only,
   never produced, never quizzed (resolves the no-paradigm-table rule: tables are
   banned as drills, allowed once as a map).
5. L3 updated for the **oui answer-word rehabilitation**; `si` demoted to inline
   seed; tu/vous Decision Probe explicitly gated behind a future tu/vous doorway.
6. §15 matrix rewritten against **shipped L0-L6 + the locked Kademe 2 enrichment
   table** (PAYLOAD_ECONOMY §6). Items outside that table (`de l'eau`, `médecin`,
   `l'école`, productive `j'ai froid/chaud`) are marked later-slot, not core.
7. Evidence weighting (§2) and the event model (§13) are mapped to **gated engine
   versions** (mastery-v0.3, telemetry-v0.2 proposals) — the shipped mastery-v0.2
   reducer is frozen and is not retrofitted.
8. Nudge Engine (§8) split into a **deterministic pre-AI subset** (registry/quarry
   candidates) and an **AI-assisted tier** gated behind spec §66.2 activation.
9. UI patterns (§4) annotated with **runtime status** against the shipped 7-screen
   renderer; new patterns land Hub-first (Exercise System v1 workstream).
10. Natural Reveal (§1.4) carries the locked **look-ahead window** (W2: ~3-4
    lessons ahead, max 5-6, recognition-only).
11. Mechanics tags (§10) map to the shipped **error-engine v0 taxonomy**; new tags
    extend through the error-engine gate, not ad hoc.
12. Validator canon (§16) merged with the shipped structural lint (sentence-chip
    heuristic, PROTECTED_CHUNKS frozen at two, SURVIVAL_FORMULAS as its own set).
    (v0.3 source was truncated mid-§16; reconstructed — Haktan to verify.)

---

# 0. Core product position

Le Mot is **not** a translation app, not a flashcard app, and not a grammar-drill app.

Le Mot teaches learners to build **small human moments** in French:

```text
I can enter a moment.
I can ask softly.
I can recover.
I can continue.
I can repair.
I can carry a French piece into my own life.
```

The core product rule:

```text
Learners should not only recognize French.
They should produce, repair, reuse, and carry French pieces into new moments.
```

This is why production-heavy exercises are prioritized. The learner is a nerd
hobbyist who wants the mechanics, not rote memorization
(`docs/CAIRN_PRODUCT_ANSWERS_2026_07.md`).

---

# 1. Global principles

## 1.1 Metric-first, not exercise-first

Every exercise declares what it measures, what evidence it produces, and why it
belongs in its lesson (ExerciseContract as in v0.3, unchanged):

```ts
ExerciseContract {
  primaryScale: LearningScale
  secondaryScales?: LearningScale[]
  productionRequired: boolean
  weaveAllowed: boolean
  masteryEvidenceWeight: "low" | "medium" | "high" | "very_high"
  practicePoolSeeds?: PracticeSeed[]
  monLexiqueDelta?: MonLexiqueDelta[]
  lessonFitGate: LessonFitGate[]
  uiPattern: UIPattern
  home: "lesson" | "practice_hub" | "both"        // NEW in v0.4
  authoringLoad: "low" | "medium" | "high"
  dynamicTriggers?: DynamicTrigger[]
  validatorWarnings?: ValidatorWarning[]
}
```

## 1.2 Production-first rule

A strong exercise usually ends in: full line production, small moment production,
repair revision, new slot application, Weave output, spoken attempt, or a
follow-up line. Choice-only / recognition-only / blank-only exercises are low
evidence unless they lead to output.

## 1.3 Weave is central

Weave lets learners write mixed French/English:

```text
Bonjour, je voudrais late checkout, s'il vous plaît. Is it possible?
```

This is not failure; it is productive learner-owned output. The app chooses the
smallest useful upgrade (`Is it possible? → C'est possible ?`), never forces the
full translation. **Locked W1:** open mixed Weaves are ungraded — the learner
answers, then a Natural Reveal runs; comparison is the feedback.

## 1.4 Natural Reveal is not expected answer

Reveal statuses: `active / supported / future_seed / reveal_only /
recognition_safe / active_ready / need_queue_candidate`.

**Locked W2 (look-ahead window):** revealed French may sit ~3-4 lessons ahead of
the learner (5-6 at most), recognition-only. Band example: at L3,
`je voudrais but pas today` territory is right-sized; subjunctive is not.

## 1.5 One small nudge, not full correction

```ts
nudgePolicy: {
  maxNudgesPerOutput: 1,
  noNativeRewriteByDefault: true,
  preferActiveOrSupportedItems: true,
  revealOnlyAsPreview: true,
  requireRevisionAfterNudge: true
}
```

## 1.6 Sentence roles matter

Subject / engine / complement / scene / social layer / moment function, as in
v0.3. The three-job example becomes fully available once `il y a` opens:

```text
Same middle: de l'eau
Job 1 (ask):   Je voudrais de l'eau.
Job 2 (have):  J'ai de l'eau.
Job 3 (exist): Il y a de l'eau.        ← after the il y a doorway (deferred)
```

Until then, Same Slot / New Job runs on two owned jobs (ask/have) — which is
already the pedagogically load-bearing contrast.

---

# 2. Evidence weighting

Bands unchanged from v0.3 (low: recognition/choice/reading-only · medium: guided
production, starter fade, visible-hint repair · high: no-hint production,
smallest repair, same-slot/new-job, moment production · very high: learner-owned
Weave, continue-the-moment, delayed reuse, personal transfer, self-repair ·
special: `future_seed_seen`, `need_queue_candidate`).

**Engine mapping (v0.4):** the shipped mastery reducer (`mastery-v0.2`) is frozen
(counts + Leitner + PF0-3 prompt levels) and is NOT retrofitted. Evidence weights
arrive as a **mastery-v0.3 numeric proposal** (docs-first gate, like Faz 4A).
Note that most of the weight signal is already derivable from existing
dimensions: `(exercise family, promptLevel PF0-3, operation)` — hand-tagging
every exercise should be the exception.

---

# 3. Lesson Fit Gate

Unchanged from v0.3: an exercise enters a lesson only through at least one of the
eight gates (owned item · engine · error-risk · moment · recombination · weave ·
mechanics · input-growth→dynamic). Updated example:

```text
Lesson: L4 J'ai
Exercise: Same Slot, New Job (two jobs)
Why here: L4 owns j'ai and contrasts possession/need with je voudrais
          (the exist job joins when il y a opens).
Target slot: une question
Expected errors: je suis faim, je ai
UI: Stateful Exercise Card, 2 states
Evidence: high
```

Additional v0.4 gate rule: **chip canon is upstream of every gate** — no exercise
may surface a sentence/clause chip (lint), expand PROTECTED_CHUNKS (frozen at
`je ne suis pas`, `ce n'est pas`), or bypass the composition rules (`je ne peux
pas` composes; `vous pouvez m'aider ?` composes; survival formulas are the only
whole-sentence chips, via the separate SURVIVAL_FORMULAS set).

---

# 4. UI pattern canon (with runtime status)

The shipped v1 renderer supports 7 screen types: `meet-card`, `insight-card`,
`fill-with-traps`, `weave`, `say-it-your-way`, `natural-reveal`, `recap`.

| Pattern | v0.3 role | Runtime status (v0.4) |
|---|---|---|
| Single Prompt Card | one prompt, one input | **Covered today** by fill / weave / say-it |
| Inline Insight Card | 1 idea + 1 example + 1 action | **Covered today** by insight-card (trigger system = future runtime) |
| Repair Card | smallest useful change | **New runtime.** Nearest today: fill-with-traps on the error form; true repair input = Exercise System v1 |
| Stateful Exercise Card | one card, 2-3 rounds | **New runtime** (Exercise System v1) — highest value/cost; Hub-first |
| Board Card | piece bank + constraints | **New runtime**; Hub-first; nearest today: weave suggestedPieces with trap chips |
| Nudge Revision Card | post-output tiny upgrade | **New runtime**; deterministic tier can ship pre-AI (§8) |
| Speaking Card | capture + self-playback | **New runtime**; waits for the audio pass (hardcoded recordings + shadowing first, per product answers) |

Rule (v0.4): new patterns land **Practice-Hub-first**, not in the lesson path —
the lesson spine keeps working with today's renderer while the hub becomes the
proving ground. Lesson-path adoption of a new pattern is a separate smoke-bearing
decision each time.

Pattern-specific rules from v0.3 kept: Stateful max 3 states early; max 1 board
card per early lesson; inline card = one insight/one example/one action; no
standalone translation drill behind a nudge; no native pronunciation scoring in
MVP (praise requires target detection).

---

# 5. Lesson vs Practice Hub (NEW — replaces the v0.3 screen budget as the primary frame)

**Haktan (2026-07):** 10-12 cards do not take 15-20 minutes. The lesson's job is
that the learner UNDERSTANDS the concept through examples — exposure, input,
logic, and first output. The Practice Hub's only job is to push the learner into
volume practice and production with what they own.

```text
Lesson       = meet it, hear it, see why it works, produce it once or twice.
Practice Hub = the same exercise families, at volume, generated (C1), pushing
               production. Breadth and repetition live HERE.
```

This matches the Payload Economy guardrail (lesson = mastery path, pool =
breadth) and dissolves the old screen-budget anxiety: the lesson does not need
five repair cards, because repair volume is hub work.

## 5.1 Lesson spine (per teaching lesson)

```text
8-12 cards, each beat once:
  1 opening Learn Page block (2-4 orientation cards, §6)
  1-2 meet/input cards (audio-first where possible)
  1-2 logic cards (insight with action)
  1 guided try (fill / stateful when available)
  1-2 productions (weave; one may be open mixed Weave, ungraded W1)
  1 natural reveal (on free production, W2 window)
  1 recap
Max 2 heavy/stateful, max 1 board, max 2 inline insights (as before).
```

## 5.2 Practice Hub (per lesson band)

```text
Generated, not hand-authored per screen (C1 + §14 authoring contract):
  volume retrieval (Function Recall → Use, Starter Fade, Missing Piece)
  volume transfer (Same Slot New Job rounds, Retrieve → Apply)
  volume repair (Wrong Architecture, Smallest Repair, error-replay from
                 the learner's own error tags)
  moment work (Moment Builder Board, Line Bank with Traps, Continue the Moment)
  playful layers (Mayonnaise Game, Keep One Use It Again)
Seeded by §13 events; capped per day by the carryover selector's existing caps.
```

## 5.3 Home assignment (summary)

| Family group | Lesson | Hub |
|---|---|---|
| Meet / input / logic (reading+listening intros, insights) | primary | light |
| First production (guided build, role build, weave, say-it) | primary | echo |
| Retrieval at volume | once | primary |
| Repair at volume / error replay | once (expected error) | primary (dynamic) |
| Transfer (same slot/new job, boundary, scene switch) | once | primary |
| Moment reconstruction boards | payoff (max 1) | primary |
| Speaking / shadowing | optional layer | primary once audio lands |
| Reflection (Keep One, What Helped) | lesson end | recurring |

## 5.4 Progression policy (locked)

The Practice Hub is **optional-but-urged** in MVP/dev-APK. It never gates the
lesson path.

- The lesson path stays calm and linear: finishing a lesson is what unlocks the
  next lesson, nothing else.
- The Hub is strongly invited at lesson end ("Stay with it" / "Practice this
  moment"), but the invitation is never a requirement.
- Hub work feeds the system: it may update mastery evidence, error tags, Daily
  Review selection, nudge choices, and future Hub generation.
- Hub work must NOT hard-lock the next lesson in MVP/dev-APK — no "solve N to
  continue", no L5→L6 gate on hub completion.
- Any future progression gate based on hub completion is a separate product
  decision and its own smoke-bearing PR — it cannot arrive as a side effect of
  Exercise System work.
- Reason: forced hub turns Cairn into homework. Cairn's rhythm is lesson path
  first, practice volume available on demand.

---

# 6. Opening Learn Page canon

Unchanged formula (Anchor · Pattern Snapshot · Big Useful Insight · Tiny Sound
Note · Watch Out · Pattern Family/Future Seed · Quick Recall; 4-5 cards early;
Anchor + example + one insight + one action mandatory).

**v0.4 pin:** the Pattern Snapshot (e.g. the être map `je suis / tu es / il est /
nous sommes / vous êtes / ils sont`) is **exposure-only orientation** — read
once, never produced, never quizzed, never a chip. This is how the snapshot
coexists with the no-conjugation-table rule: tables are banned as drills,
allowed once as a map. The être example's `Je suis médecin` usage insight stays
a Learn Page example only until `médecin` gets a lesson slot (not in Kademe 2).

---

# 7. Inline Insight Cards

Trigger table unchanged (new_pattern_before_first_use · error_triggered ·
future_seed_reward · before_trap · after_contrast · before_production ·
mon_lexique_moment · lesson_end). Guardrails unchanged: max 1 idea, 1 example,
must end in a small action; no grammar paragraph; no open-ended why without
action.

Runtime note: today, inline insights are authored insight-cards placed by the
content author; the TRIGGER system (error_triggered etc.) is Exercise System v1 /
error-engine wiring.

---

# 8. Nudge Engine canon

Pipeline unchanged: output → Segmenter → Candidate Generator → Eligibility
Filter → Priority Ranker → ONE nudge → revision → events.

**v0.4 tiering:**

```text
Tier D (deterministic, pre-AI):
  segmenting against the known registry (active/supported surfaces),
  candidates drawn from the registry + the audit candidate quarry
  (docs/audits/l1_l15_chip_inventory/candidate_inventory.csv),
  cognate-bridge list authored per lesson band.
  Can ship with Exercise System v1. No AI dependency.

Tier A (AI-assisted):
  free candidate generation for arbitrary learner needs,
  need-queue naming, novel upgrades.
  GATED behind the AI activation package (spec §66.2, 7 items).
```

Candidate examples (corrected to canon):

```text
late checkout   → un départ tardif          (reveal_only / need_queue)
Is it possible? → C'est possible ?           (cognate bridge)
Can you repeat? → Vous pouvez répéter ?      (survival formula, non-inverted)
I don't understand → Je ne comprends pas.    (survival formula)
```

Priority order and nudge validator unchanged from v0.3 (one nudge max; no full
native rewrite as expected answer; reveal-only never treated as mastery; nudge
requires revision).

---

# 9. Social function tagging policy

Unchanged: minimal function tags + scene profiles, no numeric softness scores.

```text
bonjour = opening · je voudrais = request_softener ·
s'il vous plaît = politeness_landing · merci = thanks ·
merci beaucoup = warm_close · au revoir = closing ·
excusez-moi = attention_opener (Kademe 2) ·
je ne comprends pas = recovery_statement ·
vous pouvez répéter ? = recovery_request ·
c'est possible ? = possibility_check / follow_up
```

Guardrail unchanged: je voudrais = softer request engine; s'il vous plaît =
politeness landing; never teach bonjour/s'il vous plaît as the softener in the
je veux → je voudrais contrast.

---

# 10. Mechanics Layer canon

Communication first, then ONE tiny surface repair. Tags unchanged
(elision_missing, apostrophe_missing, accent_missing, contraction_missing,
negation_shape_error, question_wrapper_error, agreement_error, liaison_seed,
spacing_punctuation_issue, article_package_error).

**v0.4 mapping:** mechanics tags extend the shipped **error-engine v0 taxonomy**
(11 entries, deterministic + 2 dormant ai_assisted) through the error-engine
gate — new tags are an error-engine PR, not free-floating strings. The
`agreement_error` example (`contente`) follows the locked fatigué(e) treatment:
one micro-note, no agreement system.

Examples table unchanged from v0.3 except: `de le café → du café`
(contraction_missing) and `l'école` (elision) are marked **later-band** — the
partitive/contraction system and l' have no Kademe 2 slot yet.

---

# 11. Complete Exercise Catalog

The v0.3 catalog stands as the exercise-family canon — the families, what they
measure, status (Core/Later/Layer/Risk), production push, best UI, gates,
authoring load, and risk columns are all kept as written in v0.3 §11.1-11.14,
with these global edits applied:

1. **Home column added** (per §5.3): recognition/intro families = lesson-primary;
   volume retrieval/transfer/repair/moment families = hub-primary; production
   families = both (first production in lesson, volume in hub).
2. **`pouvez-vous répéter`** → **`vous pouvez répéter ?`** wherever it appears
   (11.4 Recovery Choice, 11.7 Recovery Reconstruction, 11.12, 12 Survival Mode).
3. **`il y a` rows** (11.6 Same Slot New Job job-3, 11.3 examples) → deferred to
   the il y a doorway; families run on owned engines until then.
4. **Register/tu-vous rows** (Register Fit, Register Shift, Register Transfer,
   Register Card) → hard-gated behind the future tu/vous doorway (already marked
   "gated" in v0.3; the doorway itself is not scheduled yet).
5. **Speaking families** (11.13) → activate with the hardcoded-audio pass;
   shadowing families first (Shadow the Chunk / Shadow the Moment), per S1.
6. **Guided Dictation v2** stays Later/limited; the Mayonnaise Game / spelling
   hypothesis ladder is the preferred playful orthography route.
7. **Removed exercise** confirmed removed: Broken Weave Reconstruction as a
   designed exercise (Weave repair only after real learner output) — this is now
   also a validator ERROR (§16).

(The full v0.3 tables are not duplicated here to keep one source of truth; when
Exercise System v1 implementation starts, each family gets its own contract file
generated from the v0.3 table + these edits.)

---

# 12. Named playful concepts

Kept verbatim as product language: Mayonnaise Game / Five Spellings · Same
Middle, New Job · Moment Builder Board · Good Piece, Wrong Moment · Keep One,
Use It Again · Tiny Door / Future Seed · Smallest Repair Wins · Piece Bench ·
Anchor Break · Line Bank with Traps · Survival Mode · Make It Natural · Two Ways
to Say It. (Survival Mode example corrected: `Je ne comprends pas. Vous pouvez
répéter ?`)

---

# 13. Mon Lexique / Practice Pool events

Item-level, attempt-level, and seed rules kept from v0.3 (item_seen …
need_queue_repeated; attempt_started … conversation_dead_end; seed triggers).

**v0.4 mapping:** the shipped telemetry v0 event schema (`LearningEvent`:
operation, promptLevel, result, errorTags, idempotent clientEventId) already
carries a subset of these. The v0.3 event list lands as a **telemetry-v0.2
proposal** (additive event types; replay-safe; compaction-compatible — the
snapshot invariant must keep holding). No event is added outside that gate.

---

# 14. Authoring contract

Unchanged intent: authors write LessonContracts (owned items/engines, recycled
items, slots, example moments, expected errors, insight cards, production goals,
forbidden forms); the engine generates hub exercises from templates.

**v0.4 note:** the house `Lesson` type + the spec-layer contracts in
`content/learning-engine/lessons/*.contract.ts` are the two existing halves of
this; Exercise System v1 converges them. `selectExercise` (learner state, recent
errors, target scale, card budget) builds on the shipped carryover selector +
error-engine rather than replacing them.

---

# 15. L0-L6 lesson fit matrix (updated to shipped + Kademe 2)

Owned-item lines below follow the LOCKED enrichment table
(`docs/PAYLOAD_ECONOMY_v0.md` §6). Exercises marked (ES1) need Exercise System
v1 runtime; everything else is expressible with today's 7 screen types.

## 15.1 L0 — The First Step
Unchanged from v0.3: Guided Build, Listen then Build, Starter Fade (ES1 for
fade states), Natural Reveal, optional Speak Once (audio pass). No grammar
burden, no board, no far transfer.

## 15.2 L1 — Survival Kit
Owned: `bonjour, je voudrais, un café, s'il vous plaît` (L0 carryover) +
**merci** (active) + **excusez-moi, un thé** (supported) + **je ne comprends
pas, vous pouvez répéter ?** (survival formulas) · ghosts: un croissant,
madame, monsieur.
Core exercises as in v0.3 (Function Recall → Use, Role Build, Small Moment
Production, Continue the Moment, Social Landing Repair (ES1 for true repair
input), Missing Move, Line Bank with Traps (ES1 board; nearest-today: weave
with trap chips), Recovery Choice → Recall). Recovery pair now teachable —
the v0.3 assumption is finally true in shipped content once the enrichment
batch lands.
Dynamic hooks: C'est possible ? future seed; Need Queue (late checkout etc.,
Tier A — AI-gated).

## 15.3 L2 — Être
Owned: `je suis` (+ legacy je-suis-ici atomized) + **ici** (word-ici, now
registered) + **fatigué(e)** (supported; one micro-note for -e, no agreement
system) · ghost: là (+ optional prêt(e)).
Learn Page: être snapshot **exposure-only** (§6); `Je suis médecin` stays a
Learn Page example, no médecin slot yet.
Exercises: Engine Sort + Produce (ES1), Role Build, Same Engine New Layer
(negation arrives L3), Smallest Repair (ES1), Continue the Moment, Pattern
Family seed (c'est bon/vrai/possible — recognition).

## 15.4 L3 — Non
Owned: `non, je ne suis pas, ce n'est pas` + **oui as ANSWER word**
(rehabilitated; wrong-slot trap rule stays) + `ne ___ pas` frame + `non merci`
· seed only: `si` (inline card, no production) · ghost: pas de problème.
tu/vous Decision Probe: **gated out** until the tu/vous doorway opens (not
scheduled). Exercises: Same Engine New Layer (negation), Smallest Repair,
Repair to Continue (accept/decline contrast: Oui, merci. / Non merci.),
Good Piece Wrong Moment, Recovery vs Exit.

## 15.5 L4 — J'ai
Owned: `j'ai, une question` + faim (noun-faim, now registered) + **soif, une
idée** (supported; une idée reuses the dormant noun-idee) · ghosts: j'ai froid /
j'ai chaud (example copy only, no production).
`il y a`: **deferred doorway** — not in L4. Same Slot New Job runs ask/have
(je voudrais / j'ai) on `une question` / `de l'eau`-class slots once the slot
noun exists (de l'eau itself is later-band: partitive).
Exercises: Guided French-shape Build, Engine Sort + Produce (ES1), Same Slot
New Job two-job (ES1 stateful; nearest-today: two linked weaves), Wrong
Architecture Repair (je suis faim → j'ai faim), Role Build, Mechanics Card
(je ai → j'ai), Architecture Weave (J'ai froid ghost stays out of production;
use owned states).

## 15.6 L5 — Un / une
Owned: `un café, une question` packages + **un thé, une table** (supported
gender pair) · ghosts: un restaurant, une maison.
`l'` elision (l'école) and contraction (du) are later-band mechanics.
Exercises: Role Build with package, Engine Sandwich (ES1 stateful), Smallest
Repair (article-only), Line Bank with Traps (ES1), Same Slot New Job carrying
packages across engines.

## 15.7 L6 — Un petit moment
Unchanged role: L1-L5 recombination payoff, no new items; after enrichment the
scenes recombine the new cargo (fatigué, soif, un thé, excusez-moi + survival
formulas) — model answers only, 0 new lexis. Exercises as v0.3: Moment Builder
Board (ES1; payoff, max 1), Continue the Moment, Missing Move, Wrong Line in
Moment, Smallest Repair, optional Speak Own Moment (audio pass), Bon Retour
Retrieval, Keep One Use It Again.

---

# 16. Validator canon

Global rules (v0.3 set, kept):

```text
ERROR: Producing task has no production.
ERROR: Speaking gives praise without target detection.
ERROR: Weave repair used as a designed translation exercise.
ERROR: Reveal-only item treated as active mastery.
ERROR: Engine transform changes to unrelated sentence without shared scene/slot/job.
ERROR: Register shift appears before tu/vous has been opened.
WARNING: Decision Probe ends at multiple choice.
WARNING: Reflecting asks open-ended "why?" without action.
WARNING: Insight card has explanation but no action.
WARNING: Single-use micro tasks that could be card states.
WARNING: Board card more than once in an early lesson.
WARNING: Mechanics interrupts a successful moment with multiple issues.
```

Merged with the shipped/locked lint canon (v0.4):

```text
ERROR: Any piecesUsed chip failing the sentence-chip heuristic outside
       PROTECTED_CHUNKS (frozen: je ne suis pas, ce n'est pas) or
       SURVIVAL_FORMULAS (closed: je ne comprends pas, vous pouvez répéter ?).
ERROR: je ne peux pas (or any negative verb clause) as a chip — composition only.
ERROR: vous pouvez m'aider ? as a chunk — composes from vous pouvez + m'aider.
ERROR: Inverted question forms in production targets (recognition-only band-wide).
ERROR: Reveal content beyond the W2 look-ahead window (max 5-6 lessons ahead).
ERROR: Grading applied to an open mixed Weave (W1: reveal, don't grade).
WARNING: Ghost item appearing outside meet/insight example copy.
WARNING: Supported item appearing fewer than twice in its lesson.
```

(v0.3's scale-specific validator list was truncated in the source after
"Reading: do not turn reading into a translation quiz" — reconstruct and review
the remaining scale-specific rules with Haktan before Exercise System v1.)

---

# 17. Layering & sequencing (v0.4)

```text
Layer 1 — Content (available now, current renderer):
  Lesson Fit Gate discipline, Learn Page structure via insight-cards,
  inline insight formula, W1 open Weaves as model-answer-only screens,
  natural-reveal screens on free production, repair-shaped fills,
  Kademe 2 enrichment content.

Layer 2 — Runtime (Exercise System v1 workstream, Hub-first):
  Stateful Exercise Card, Repair Card, Board Card, Nudge Revision Card
  (Tier D), inline-insight trigger wiring, Practice Hub generation loop.
  Each pattern = its own gated, smoke-bearing PR when it touches visible paths.

Layer 3 — Audio:
  hardcoded recordings, shadowing families, Speaking Card. (Operator recording
  pass + runtime.)

Layer 4 — Engine gates:
  mastery-v0.3 (evidence weights), telemetry-v0.2 (event model),
  error-engine taxonomy extensions (mechanics tags), selectExercise
  (builds on carryover selector), Need Queue.

Layer 5 — AI tier:
  Nudge Engine Tier A, free candidate generation — behind spec §66.2 activation.
```

Nothing in this document overrides: the Home cap (L6), the frozen mastery-v0.2
reducer, PROTECTED_CHUNKS, the composition canon, the Payload Economy ceiling,
or the monolingual ladder (all lessons english-guided until a ladder plan is
locked).
