# L1-L24 Golden Corpus — Blueprint PLAN

> PLAN ONLY (docs). This document plans the future
> `L1_L24_GOLDEN_CORPUS_BLUEPRINT` — it is NOT the blueprint itself, contains
> NO lesson content, adds NO surfaces or exercises, and authorizes NO
> implementation (no ES1, no runtime, no registry, no validators). Written
> while PR #174 screen review is pending; execution starts only per §6.

## 1. Why L1-L24 is the golden corpus

- **Paywall-promise boundary.** The product's hypothetical paywall sits at
  L24, where Campfire begins (Campfire @ L24 generates practice from owned
  inventory — product canon C1). Everything in L1-L24 is the free-side
  promise the paywall converts on: by L24 the learner must FEEL that the
  method works. L1-L24 is therefore not "the first 24 lessons"; it is the
  argument for paying.
- **The factory's set of rules, taught by example.** Haktan's direction:
  write the first 24 lessons in full detail — proper exercises, wide chip
  pool — so that from L25 on, the instruction can be "here is the topic,
  produce a lesson like these." A generator (human or AI) learns from
  exemplars plus rules. Lesson Skeleton v1 is the rules; the golden corpus
  is the exemplars. Neither is sufficient alone.
- **Measurement calibration set.** Mastery-v0.3 evidence weights, the
  per-lesson measurement floor, lane coverage, and the surface-density
  (fresh_seen) tooling all need a stable, hand-verified corpus to calibrate
  against before anything is auto-generated.

## 2. How Lesson Skeleton v1 governs the corpus

Every L1-L24 teaching lesson is governed by `docs/LESSON_SKELETON_v1.md`
(LOCKED 2026-07-04): 8 mandatory + 3 flexible slots; multi-exercise screens
with the variation rule (sentence never the measured unit; item-level
evidence; sentenceSurfaceHash as QA metadata); the measurement floor;
doorway variant (~9-10 slots, One Step Wider drops first; Repair /
Transfer-Mix / Weave the Moment / Keep It never drop); Keep It ownership
mirror; guardrails G-A (frozen formula exception) and G-B (Open Weave never
mastery evidence). Integration lessons remain exempt from the density
target and follow their own recombination contract.

The corpus equally inherits the standing canons: Payload Economy v0 layers
and Kademe ceiling, the surface-density clarification (per-lesson fresh
seen target, carryover excluded), chip canon (PROTECTED_CHUNKS /
SURVIVAL_FORMULAS frozen), composition canon, W1/W2, and the
banned-language rules.

## 3. Phasing

```text
Phase A  L1-L6   (visible dev-APK; smoke-bearing)
         Already enriched (#174 + seen layer). Skeleton retrofit happens
         AFTER the ES1 pilot proves the shape on an invisible lesson —
         the flagship is never the guinea pig.

Phase B  L7-L15  (authored, not learner-visible)
         L7 is the ES1 pilot lesson. Retrofit proceeds in small batches
         (doorways first: they are the thinnest and gain the most).
         Integrations L10/L13 get a lighter recombination-check pass.

Phase C  L16-L24 (not yet authored)
         Born DIRECTLY in the skeleton — never written in the old
         one-exercise-per-screen shape. Blocked on two inputs:
         (1) ES1 runtime existing, (2) the L16-L24 topic map, which is a
         Haktan canon decision (fed by Core 150 / band map / the L24
         Campfire promise), NOT something the factory invents.
```

## 4. What each blueprint row must contain (one row per lesson, L1-L24)

Identity: number, title, lesson type (system / doorway / integration),
phase, canDo, scene (one line), monolingual mode.

Pedagogy: primary archetype; new engine(s) or none; active-new items (1-3);
supported payload (+2-3); ghost/seen themes (what the world says around
this scene); carryover targets (which prior items get spaced retrieval
here — the corpus-level repetition plan, including survival-formula
returns); model sentence; deferred-trap list (what this lesson must NOT
open).

Skeleton mapping: slot map (which of the 8+3 run, doorway drops named);
per-slot beat budget; focus markers (where single-move ends and mixed
begins); measurement-floor check (planned observations per item, motors
per item, lanes covered).

Product arc: what this lesson contributes to the L24 Campfire promise
(one line); paywall-arc position (early trust / mid competence / late
payoff); audio needs flag (feeds AUDIO_RECORDING_QUEUE).

Status: authored / enriched / retrofitted / born-in-skeleton; validation
state.

## 5. Out of scope for the blueprint (hard list)

No lesson content authoring inside the blueprint (rows describe, never
script). No new surfaces or exercises ahead of ES1. No ES1/runtime/
registry/validator work. No L25+ generation. No paywall implementation
(position and pricing live in product canon). No monolingual-transition
plan (separate, still-unwritten doc — the gap stays named, not solved
here). No Practice Hub. No topic invention for L16-L24 (Haktan input).

## 6. Implementation order (after #174 screen review)

```text
1. #174: Haktan screen review -> fixes if any -> Operator device smoke -> merge
2. Seen-layer batch: PR -> review -> (device look) -> merge
3. PR #175 (Lesson Skeleton v1): ready-for-review -> merge
4. THE BLUEPRINT ITSELF: docs-only, all 24 rows per section 4
   (L16-L24 rows blocked on Haktan's topic map)
5. ES1 runtime spec + build (explicit Haktan go required)
6. L7 pilot in skeleton -> device check -> L1-L6 retrofit (smoke-bearing)
7. Phase B retrofit (L8-L15), then Phase C authoring (L16-L24)
8. Corpus freeze: L1-L24 declared golden; L25+ switches to
   "topic in, lesson out" against the frozen exemplars
```

Nothing in this plan starts before step 1 completes; steps 5+ each require
their own explicit go.
