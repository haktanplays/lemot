# Lesson Skeleton v1 (Exercise Canon v0.5 delta)

> DRAFT for Haktan review, 2026-07-04. Docs-only: authorizes NO runtime,
> lesson, registry, or validator change by itself. This is the delta on top
> of `docs/EXERCISE_CANON_v0.4.md`; when accepted, it folds into a future
> v0.5 revision of that document. Decisions below marked LOCKED were given
> by Haktan in conversation (2026-07-04); items marked PROPOSED need his
> explicit tick before implementation.

## 1. The core correction (LOCKED)

A screen is NOT one exercise, and measurement NEVER targets a sentence.

```text
Screen  = a scene-framed moment carrying MULTIPLE scored exercises.
Each scored exercise inside a screen runs on DIFFERENT sentence material.
A screen is never dedicated to one sentence; no sentence is drilled
through stacked mechanics ("Bonjour, je voudrais un cafe" x3 is banned).
Evidence is recorded at ITEM/PATTERN level (je voudrais engine +1,
un cafe package +1), never as "sentence X answered correctly".
```

Why: repeating one sentence through three mechanics measures (and teaches)
that sentence's surface — ezber. The same move verified across different
sentences is real generalization evidence. This generalizes the existing L6
ezber guardrail ("no screen asks the learner to repeat a pre-shown script")
into the exercise model itself.

## 2. Decision log (from Haktan, 2026-07-04)

| ID | Decision | Status |
|---|---|---|
| D-SCREEN | Multi-exercise screens; exercises spread across different sentences; sentence never the measured unit. | LOCKED |
| D-UNIT | Haktan sits between "single move per screen" and "scene moment, mixed moves". Synthesis below (§3). | PROPOSED synthesis |
| D-MOTOR | Within a screen, exercises use DIFFERENT motors on different sentences (e.g. listen-choose on the the-sentence, repair on the table-sentence, build on the cafe-sentence). | LOCKED |
| D-MODEL | The canonical model sentence is introduced ONCE (Meet/Hear). After that, no scored exercise ever re-asks it verbatim; scored work is always variation. | LOCKED |
| D-POOL | Scored beats draw ONLY from owned + supported inventory. UNSCORED beats (listening/exposure) may use seen-tier material — "daha kuvvetli Weave verir": the learner keeps meeting French beyond their inventory, without it ever polluting measurement. | LOCKED |
| D-EVIDENCE | Evidence events are item/pattern-level, never sentence-level. | PROPOSED default (follows from D-SCREEN; needs tick) |

### D-UNIT synthesis (PROPOSED)

The screen's FRAME is scene-anchored (unique title, moment feel — the "c"
instinct). The screen's MEASURED CONTENT is move-focused early in the
lesson and mixed-move in the final stretch (the "a" structure):

```text
Early/mid lesson screens:  focus = single-move
  one move, verified across 2-3 different sentences/cargos
Final 1-2 exercise screens: focus = mixed
  2-3 moves interleaved (research: interleaving strengthens retention;
  product: the lesson ends feeling like a scene, not a drill)
```

Authoring metadata: `focus: "single-move" | "mixed"` per exercise screen.

## 3. The skeleton (8 mandatory + 3 flexible slots)

Mandatory core (every teaching lesson): Open, Meet, Hear, Build, Notice,
Repair, Weave the Moment, Keep. Flexible by topic (0-3 of): Same Move New
Piece, Transfer, Nearby French (Nearby is near-mandatory now that the seen
layer exists). System lessons run 11 slots; doorway lessons run ~9.

| # | Slot | Motor(s) | Scored | Content rule |
|---|---|---|---|---|
| 1 | Open the Moment | goal card | 0 | breath; scene opens |
| 2 | Meet the Core | meet-card | 0 | model sentence heard ONCE (D-MODEL) |
| 3 | Hear It Around | listen-choice | 2-3 | scored items owned; MAY carry 1 unscored seen-tier line (D-POOL) |
| 4 | Build the Move | guided-weave | 1-2 | variant sentences, never the model verbatim |
| 5 | Notice the Move | insight + 1 try-beat | 1 | the check runs on a NEW sentence |
| 6 | Same Move, New Piece | slot-swap | 2-3 | same frame, different cargo each beat |
| 7 | Repair the Move | repair-line | 2-3 | each repair a different broken sentence |
| 8 | Transfer / Mix | fill / weave, focus: mixed | 2-3 | moves interleaved, new scene corner |
| 9 | Nearby French | seen card | 0 | exposure; unscored listening |
| 10 | Weave the Moment | open-weave | 1-2 | free production; W1 rules (compare, don't grade the mix) |
| 11 | Keep It | recap | 0 | breath; optional unscored self-check |

Counts: system lesson **11-17 scored exercises** across 6 motors; doorway
lesson (slot 6 or 8 dropped, beats trimmed) **8-11**. Every exercise screen
carries 2-3 scored exercises — "her ekranda birden fazla egzersiz" — and no
two scored exercises in a lesson share a sentence surface.

## 4. The variation rule (mechanical, validator-enforceable)

```text
Within one lesson:
- no scored exercise may reuse the sentence surface of another scored
  exercise, nor the model sentence, verbatim;
- every active-new item is verified across >= 3 different sentences;
- every supported item across >= 2 different sentences.
```

This is "tek cumleyi olcmeyecegiz" as a lint: a counter over (scored beat
x sentence surface x targetItemIds) that fails CI when a surface repeats
or an item's sentence-variety floor is missed.

## 5. Measurement floor (per lesson, ratios free)

Ratios differ per lesson (L8 listening-heavy, L3 repair-heavy) — the FLOOR
is what every teaching lesson guarantees:

```text
active-new item : >= 3 scored observations, >= 2 motors, >= 3 sentences
supported item  : >= 2 scored observations, >= 2 sentences
lesson total    : >= 10 scored evidence events
seen-tier       : 0 scored observations (deliberately unmeasured)
```

Evidence weights per motor (sketch, decided at the mastery-v0.3 gate, NOT
retrofitted into frozen v0.2): repair > guided-weave > slot-swap > fill >
listen-choice; open-weave stays compare-only per W1.

Lane metadata (internal only, never learner-facing): each scored beat
carries `lane: input | meaning | pattern | repair | transfer | production`
so the validator can report per-lesson lane coverage.

## 6. ES1 runtime requirements (what the skeleton needs to exist)

1. Beat container: one screen hosts 2-3 sequential scored interactions.
2. Per-beat evidence event: itemId(s) + motor + lane + correct/incorrect +
   chosen-trap id. Item-level, per D-EVIDENCE.
3. New motors: repair-line, listen-choice; slot-swap formalized (today it
   is informal acceptedAlternatives).
4. Unscored beat type (seen-tier listening inside exercise screens).
5. Existing motors (fill-with-traps, guided/open weave) reused as-is.

Without ES1, this skeleton degrades to ~7-9 single-shot exercises; the
numbers in §3 are only real once beats exist.

## 7. Paper example maps (no content written; shapes only)

### L1 Survival Kit (system lesson, 11 slots, ~12 scored)

```text
1  Open      Your survival kit                                   0
2  Meet      model: Bonjour, je voudrais un cafe, s'il vous plait (once)
3  Hear      listen-choose meaning: "Je voudrais un the."        1
             listen-pick line you heard: "Merci."                1
             unscored seen line: "Vous desirez ?"                0
4  Build     assemble: "Bonjour, je voudrais un the."            1
             cloze: "Un cafe, s'il vous plait."                  1
5  Notice    politeness insight; try on NEW sentence:
             "Je voudrais un the, s'il vous plait." (vs je veux) 1
6  Same move swap cargo: the->cafe in a fresh sentence           1
             close variant: "Merci." tail                        1
7  Repair    "Je veux un cafe, s'il vous plait." -> soften       1
             "Voudrais un cafe." -> restore je                   1
8  Transfer  mixed: rescue pair weave + greet variant            2
9  Nearby    The counter talks back (seen card)                  0
10 Weave     open mixed order (W1)                               1
11 Keep      recap                                               0
                                              scored total ~12
```

### L7 Je vais (doorway, 9 slots, ~8 scored)

```text
1 Open   2 Meet (model once)   3 Hear (2)   4 Build (1)
5 Notice suis/vais contrast + try (1)
7 Repair ("Je suis a la maison." meaning-repair; "Vais a la maison.") (2)
8 Mix    close-the-moment weave variants (1-2)
9 Nearby Leaving has its own music   10 Weave the Moment (1)   11 Keep
                                              scored total ~8
(slot 6 dropped: L7 has one cargo; swap has nothing to swap)
```

## 8. Migration path (unchanged from conversation)

```text
1. This canon locked (docs-only)            <- you are here
2. ES1 runtime core: beats + repair-line + listen-choice + beat events
3. Pilot ONE lesson (L7: small, not learner-visible), then L1 + device smoke
4. L1-L5 retrofit (smoke-bearing batch), then L7-L15
5. L16-L24 born directly in this skeleton (the "topic in, lesson out" factory)
```

Existing L1-L15 material carries ~70% of what the retrofit needs; the work
is re-arrangement plus new repair/hear/mix content, not rewrite.

## 9. Open for Haktan

1. D-UNIT synthesis (§2-3): scene-framed screens, single-move early /
   mixed late — does this land your a-and-c instinct?
2. D-EVIDENCE default: item-level evidence, never sentence-level — tick?
3. Doorway variant at 9 slots (drop Same-Move or Transfer) — OK?
4. Keep It: allow an optional unscored self-check tap, or pure breath?
5. Naming pass on slot titles (current set is my working English; the
   learner-facing titles stay scene-unique per lesson anyway).
```
