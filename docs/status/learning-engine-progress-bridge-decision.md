# Learning-Engine Progress Bridge Decision

**Date:** 2026-06-09
**Current `main` HEAD:** `d4c06d9` (or newer)
**Status:** Docs-only decision note. No runtime change. Records how learning-engine progress
should eventually connect to Home, Progress, and Daily Review, without extending the frozen v1
surface. Follows [`dev-apk-v1-freeze-checkpoint.md`](./dev-apk-v1-freeze-checkpoint.md) and
[`v1-to-learning-engine-migration-notes.md`](./v1-to-learning-engine-migration-notes.md), and
builds on the merged pure selector `lemot-app/content/learning-engine/lesson-progress.ts`
(`selectLessonProgress`, PR #87).

It sits alongside the learning-engine status notes
([`learning-engine-v0.1-baseline.md`](./learning-engine-v0.1-baseline.md),
[`learning-engine-interactive-baseline.md`](./learning-engine-interactive-baseline.md),
[`learning-engine-l11-l12-l16-chain-smoke-baseline.md`](./learning-engine-l11-l12-l16-chain-smoke-baseline.md)).

---

## 1. Decision

- **Prefer Home, Progress, and Daily Review to read learning-engine projections derived from the
  `lm_le_events` event spine over time.** Projections like `selectLessonProgress` (and, later,
  mastery / review projections) are the intended read path for these surfaces.
- **Avoid writing fake legacy `lm7` bridge markers** unless strictly needed for a temporary
  smoke-only compatibility shim (see section 4).
- **The long-term source of truth is the learning-engine event spine (`lm_le_events`).** The
  legacy `lm7` store is treated as the frozen-v1 surface, not the foundation.

## 2. Current split

- **learning-engine writes `lm_le_events`** (append-only event log; `lm_le_snapshot` is a reserved
  cache, currently unwritten). Everything downstream (mastery, Mon Lexique, Practice Pool, and the
  new `selectLessonProgress`) is a pure projection of that log.
- **v1, Home, Progress, and Daily Review currently read legacy `lm7`** via `useApp` / `AppProvider`
  and the `mk(lessonId, sectionKey)` / `lp(lessonId)` primitives. The frozen v1 renderer writes one
  minimal marker into `lm7` on completion (`mk(lesson.number, "read_listen")`). That marker belongs
  to the frozen v1 smoke surface; it is not a full completion model, and the Home-state smoke still
  recorded limited user-facing reflection after completion.
- **This split is the main integration blocker.** Completing exercises in the engine renderer
  updates `lm_le_events` but nothing Home / Progress / Daily Review reads, and the v1 completion
  marker updates `lm7` but nothing the engine reads. The two stores are disjoint.

## 3. Why not write directly into legacy `lm7`

Writing engine progress straight into `lm7` (beyond the existing frozen-v1 marker) is the wrong
default because it:

- **Hides the two-system debt** by making the legacy surface look populated while the engine spine
  stays separate.
- **Creates duplicate truth.** Progress would then exist in both `lm7` and `lm_le_events`, with no
  single canonical source and a real risk of drift.
- **Makes Progress look correct while engine state remains separate**, masking the fact that the
  engine renderer is not actually wired into the product surfaces.
- **Encourages v1 extension**, because the path of least resistance becomes "teach the legacy store
  more tricks" instead of moving surfaces onto engine projections.
- **Makes migration harder later**, since any eventual cutover must first untangle whatever legacy
  markers were written in the interim.

## 4. When a temporary bridge marker is allowed

A temporary legacy marker (or a thin engine-to-legacy shim) is acceptable only if ALL of the
following hold:

- It is **needed for the Dev APK test path** (not for convenience or polish).
- It is **behind an explicit stage or compatibility guard** (for example a `PRODUCT_STAGE` /
  `FEATURES` gate), never unconditional.
- It is **clearly marked temporary** in code and in this note.
- It **does not become the canonical progress model.** The canonical model stays `lm_le_events`.
- It has a **documented removal path** (when the engine read path lands, the shim is deleted).

Note: the existing v1 completion marker (`mk(lesson.number, "read_listen")`) already satisfies a
narrow version of this for the frozen v1 surface. It stays as-is under freeze. The engine renderer
should NOT replicate that legacy-write pattern as its primary progress path.

## 5. Preferred learning-engine progress path

- **`selectLessonProgress` reads events plus a required exercise-id list** and returns
  `started` / `attempted` / `total` / `completed` / `attemptedExerciseIds` / `remainingExerciseIds`.
  It is pure, deterministic, and storage-free; the caller supplies events (from the repository) and
  the lesson's exercise ids.
- **Renderer completion can use it.** A sandbox-only completion view can call `selectLessonProgress`
  to know when a lesson is fully covered and to show a calm end state, without touching `lm7`.
- **Home can eventually show first-lesson started/completed state from the engine projection**,
  behind a stage flag, instead of inferring it from a legacy marker.
- **Progress should eventually use engine projections, not the legacy 24-lesson / 264-section
  taxonomy** (currently `LESSONS.length * SECS.length` from the legacy data + constants).
- **Daily Review should eventually use engine mastery / review projections** (the item-level
  mastery snapshot and its due / weak signals) rather than the legacy `lm7` review state.

## 6. Implications for next PRs

- **PR-C:** sandbox-only learning-engine renderer completion view that uses `selectLessonProgress`
  for the "lesson fully covered" signal and a calm end state plus a return path. No `lm7` write.
- **PR-D:** a first-run-equivalent engine Lesson 1 fixture (the "Je suis" lesson) so the engine
  renderer can deliver the same first lesson pedagogically, validated, no UI.
- **PR-E:** renderer state-key hardening (include the step index in the card key, optional
  forward-only progression) if still needed after PR-C.
- **Later:** a Home bridge that reads the engine projection for first-lesson started/completed,
  behind an explicit flag, as the actual (reversible) cutover step.
- **Do not touch v1 unless the freeze policy in
  [`dev-apk-v1-freeze-checkpoint.md`](./dev-apk-v1-freeze-checkpoint.md) explicitly allows it**
  (blocker bug, smoke-path break, learner-facing banned-copy leak, or Dev APK test-path issue).

## 7. Non-goals

This note does not authorize, and the next PRs in this track must not include:

- No v1 changes.
- No Home rewrite.
- No Progress rewrite.
- No Daily Review rewrite.
- No `lm7` migration.
- No event schema changes.
- No storage migration.
- No dev-apk cutover (the engine renderer stays sandbox-only until an explicit, flagged step).
- No APK smoke (physical APK smoke remains the pending Operator gate, unchanged by this note).

## 8. Open questions

- **Completion strictness:** should `completed` stay attempt coverage only, or later require
  non-skip attempts (exclude `empty_or_skip`), or eventually require correctness?
- **Recognition reveal:** should a recognition reveal continue to count as an attempt (it currently
  emits an event), or should coverage require a graded production attempt where one exists?
- **Exercise-id source:** what exact fixture / exercise list should the renderer pass to
  `selectLessonProgress` (the lesson's `ExerciseBlueprint[]` filtered by `lessonId`, a resolved
  fixture object, or a precomputed id list)?
- **Home communication:** how should Home convey started vs completed for the first lesson without
  drifting into a dashboard (the freeze checkpoint requires "one calm next step")?
- **Progress cutover timing:** when should Progress stop showing the legacy 24-lesson / 264-section
  taxonomy, and what does it show instead?

## 9. Recommendation

- **Adopt the learning-engine event spine (`lm_le_events`) as the canonical progress source.**
- **Use legacy `lm7` bridge markers only as a last-resort, guarded, clearly-temporary smoke
  compatibility shim**, never as the canonical model, and always with a removal path.
- **Proceed next with the sandbox-only renderer completion view (PR-C) that consumes
  `selectLessonProgress`, not Home integration.** Home / Progress / Daily Review bridging stays a
  later, explicitly flagged, reversible step, and v1 stays frozen throughout.
