# Lesson Skeleton v1 (Exercise Canon v0.5 delta)

> LOCKED by Haktan, 2026-07-04 (decisions D-SCREEN through D-EVIDENCE and
> guardrails G-A/G-B below). Docs-only: authorizes NO runtime, lesson,
> registry, or validator change by itself. This is the delta on top of
> `docs/EXERCISE_CANON_v0.4.md`; when implemented it folds into a future
> v0.5 revision of that document. The ES1 runtime spec is a separate,
> NOT-yet-started workstream (Haktan instruction, 2026-07-04).

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

## 2. Decision log (Haktan, 2026-07-04 — all LOCKED)

| ID | Decision |
|---|---|
| D-SCREEN | Multi-exercise screens; exercises spread across different sentences; sentence never the measured unit. |
| D-UNIT | Scene-framed screens: the screen's FRAME is a scene moment (unique title); its MEASURED CONTENT is single-move in early/mid lesson and mixed/interleaved in the final 1-2 exercise screens. Authoring metadata: `focus: "single-move" \| "mixed"`. |
| D-MOTOR | Within a screen, exercises use DIFFERENT motors on different sentences (e.g. listen-choose on the the-sentence, repair on the table-sentence, build on the cafe-sentence). |
| D-MODEL | The canonical model sentence is introduced ONCE (Meet/Hear). After that, no scored exercise ever re-asks it verbatim; scored work is always variation. |
| D-POOL | Scored beats draw ONLY from owned + supported inventory. UNSCORED beats (listening/exposure) may use seen-tier material — stronger Weave: the learner keeps meeting French beyond their inventory, without it ever polluting measurement. |
| D-EVIDENCE | Mastery evidence is item/pattern-level, never sentence-level (je voudrais +1, un the +1, bonjour +1). NUANCE: the sentence surface does not vanish — a `sentenceSurfaceHash` is stored as QA/validator METADATA only, to enforce the variation lint and detect repeated sentence drilling. It is never a learning/evidence unit. |

## 3. The skeleton (8 mandatory + 3 flexible slots)

Mandatory core (every teaching lesson): Open, Meet, Hear, Build, Notice,
Repair, Weave the Moment, Keep. Flexible by topic (0-3 of): One Step Wider,
Transfer, Nearby French (Nearby is near-mandatory now that the seen layer
exists). System lessons run 11 slots; doorway lessons run ~9-10.

| # | Slot | Motor(s) | Scored | Content rule |
|---|---|---|---|---|
| 1 | Open the Moment | goal card | 0 | breath; scene opens |
| 2 | Meet the Core | meet-card | 0 | model sentence heard ONCE (D-MODEL) |
| 3 | Hear It Around | listen-choice | 2-3 | scored items owned; MAY carry 1 unscored seen-tier line (D-POOL) |
| 4 | Build the Move | guided-weave | 1-2 | variant sentences, never the model verbatim |
| 5 | Notice the Move | insight + 1 try-beat | 1 | the check runs on a NEW sentence |
| 6 | One Step Wider | slot-swap | 2-3 | same frame, different cargo each beat (working label; formerly "Same Move, New Piece") |
| 7 | Repair the Move | repair-line | 2-3 | each repair a different broken sentence |
| 8 | Transfer / Mix | fill / weave, focus: mixed | 2-3 | moves interleaved, new scene corner |
| 9 | Nearby French | seen card | 0 | exposure; unscored listening |
| 10 | Weave the Moment | open-weave | 1-2 | free production; W1 rules (compare, don't grade — see G-B) |
| 11 | Keep It | recap + ownership mirror | 0 | breath; see Keep It rule below |

### Doorway variant (LOCKED)

Doorway lessons (small topics: L7/L8-class) run ~9-10 slots. Drop
preference: **One Step Wider drops first** (when there is no second payload
to swap); if more trimming is needed, cut beat counts, not slots.
**Repair, Transfer/Mix, Weave the Moment, and Keep It are never dropped.**
No padding: if the topic is small, the skeleton stays small.

### Keep It rule (LOCKED)

Keep It is pure breath with an **ownership mirror**: the lesson's pieces
shown calmly under three headings —

```text
Yours now        (produced this lesson)
Seen nearby      (heard around you; not asked of you)
Not yours yet    (waved at for later)
```

Display-only. No tap required, no check, no correct/incorrect, no score,
no mastery event, no XP/streak/reward framing. It must not feel like a
question. An interactive self-check is revisited only when the Mon Lexique
UI arrives.

Counts: system lesson **11-17 scored exercises** across 6 motors; doorway
lesson **8-11**. Every exercise screen carries 2-3 scored exercises, and no
two scored exercises in a lesson share a composed sentence surface (§4).

## 4. The variation rule (mechanical, validator-enforceable)

```text
Within one lesson:
- no scored exercise may reuse the COMPOSED sentence surface of another
  scored exercise, nor the model sentence, verbatim;
- every active-new item is verified across >= 3 different sentences;
- every supported item across >= 2 different sentences.
Enforcement: sentenceSurfaceHash per scored beat (QA metadata, D-EVIDENCE
nuance) — a counter over (scored beat x surface hash x targetItemIds)
fails CI when a composed surface repeats or a variety floor is missed.
```

### G-A. Frozen formula exception (LOCKED)

The no-repeat lint applies to COMPOSED sentence surfaces. Items that ARE
fixed surfaces — **SURVIVAL_FORMULAS** (`je ne comprends pas`,
`vous pouvez repeter ?`) and **PROTECTED_CHUNKS** (`je ne suis pas`,
`ce n'est pas`) — may repeat as item surfaces, because the frozen line is
the item itself. Two limits still bind:

1. The same full line must NOT be drilled through stacked mechanics inside
   one screen (D-SCREEN still applies to formulas).
2. Where possible, frozen formulas appear in DIFFERENT host contexts or
   combined with different surrounding moves (rescue after an order vs
   rescue after a direction answer), so repetition is situational, not
   mechanical.

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
listen-choice.

### G-B. Open Weave evidence (LOCKED)

Open Weave (Weave the Moment) remains **compare-first / W1**: the reveal
compares, it does not grade. It produces **NO normal mastery evidence**.
If a future mastery spec explicitly defines a low-confidence evidence
class, its inclusion is discussed then — not before. It MAY record learner
output for review/debug purposes, but it must never become a correctness
gate for progress, mastery, or unlocks.

Lane metadata (internal only, never learner-facing): each scored beat
carries `lane: input | meaning | pattern | repair | transfer | production`
so the validator can report per-lesson lane coverage.

## 6. ES1 runtime requirements (what the skeleton needs to exist)

> Status: requirements only. The ES1 runtime spec/workstream is NOT
> started (Haktan instruction, 2026-07-04). Nothing below is authorized.

1. Beat container: one screen hosts 2-3 sequential scored interactions.
2. Per-beat evidence event: itemId(s) + motor + lane + correct/incorrect +
   chosen-trap id + sentenceSurfaceHash (QA metadata). Item-level, per
   D-EVIDENCE.
3. New motors: repair-line, listen-choice; slot-swap formalized (today it
   is informal acceptedAlternatives).
4. Unscored beat type (seen-tier listening inside exercise screens).
5. Existing motors (fill-with-traps, guided/open weave) reused as-is;
   open weave stays outside mastery evidence per G-B.
6. Keep It ownership mirror (display-only recap variant).

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
6  Wider     swap cargo: the->cafe in a fresh sentence           1
             close variant: "Merci." tail                        1
7  Repair    "Je veux un cafe, s'il vous plait." -> soften       1
             "Voudrais un cafe." -> restore je                   1
8  Transfer  mixed: rescue pair weave + greet variant            2
9  Nearby    The counter talks back (seen card)                  0
10 Weave     open mixed order (W1, no mastery evidence)          1
11 Keep      recap + ownership mirror                            0
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
(One Step Wider dropped: L7 has one cargo; nothing to swap — per the
doorway drop preference. Repair/Mix/Weave/Keep retained as required.)
```

## 8. Migration path

```text
1. This canon LOCKED (docs-only)                       <- DONE 2026-07-04
2. ES1 runtime core: beats + repair-line + listen-choice + beat events
   <- NOT STARTED; begins only on explicit Haktan go
3. Pilot ONE lesson (L7: small, not learner-visible), then L1 + device smoke
4. L1-L5 retrofit (smoke-bearing batch), then L7-L15
5. L16-L24 born directly in this skeleton (the "topic in, lesson out" factory)
```

Existing L1-L15 material carries ~70% of what the retrofit needs; the work
is re-arrangement plus new repair/hear/mix content, not rewrite.

## 9. Remaining open (deferred, not blockers)

1. Learner-facing beat labels / brand-language pass (Meet it / Notice it /
   Weave it...) — deferred to the ES1 UI phase; internal slot names above
   are working English until then.
2. Low-confidence evidence class for Open Weave — only if a future mastery
   spec defines it (G-B).
3. Interactive Keep It self-check — revisited when Mon Lexique UI arrives.
4. L15-end cumulative metric restatement + fresh_seen tooling — lives in
   the #175 workstream (Step 0), unchanged by this document.
