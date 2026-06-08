/**
 * Area 7 — lesson-progress.ts attempt coverage.
 *
 * Guarantees selectLessonProgress is a pure, deterministic attempt-coverage
 * projection over the event log: an exercise counts as attempted once ANY event
 * carries its exerciseId (v1 = coverage, not correctness); a lesson is completed
 * only when every required exercise id has at least one event AND the required
 * list is non-empty. Duplicate events count once; out-of-lesson / unknown events
 * are ignored; output order follows the required id list (event-order
 * independent); inputs are never mutated.
 */
import { describe, test, assert, assertEqual, deepEqual, clone } from "./harness";
import { makeEvent } from "./helpers";
import { selectLessonProgress } from "../../content/learning-engine/lesson-progress";

const A = "L1-ex01";
const B = "L1-ex02";
const C = "L1-ex03";
const THREE = [A, B, C];

describe("Area 7 — lesson-progress.ts attempt coverage", () => {
  test("no events, three exercises -> attempted 0, started/completed false", () => {
    const p = selectLessonProgress({ events: [], lessonId: "L1", exerciseIds: THREE });
    assert(p.attempted === 0, "attempted must be 0");
    assert(p.total === 3, "total must be 3");
    assert(p.started === false, "started must be false");
    assert(p.completed === false, "completed must be false");
    assertEqual(p.attemptedExerciseIds, [], "none attempted");
    assertEqual(p.remainingExerciseIds, THREE, "all three remain");
  });

  test("one matching event -> attempted 1, remaining 2, completed false", () => {
    const p = selectLessonProgress({
      events: [makeEvent({ result: "correct", exerciseId: A })],
      lessonId: "L1",
      exerciseIds: THREE,
    });
    assert(p.attempted === 1, "attempted must be 1");
    assert(p.started === true, "started must be true");
    assert(p.completed === false, "completed must be false");
    assertEqual(p.attemptedExerciseIds, [A], "A attempted");
    assertEqual(p.remainingExerciseIds, [B, C], "B and C remain");
  });

  test("all three exercise ids have events -> completed true", () => {
    const p = selectLessonProgress({
      events: [
        makeEvent({ result: "correct", exerciseId: A }),
        makeEvent({ result: "correct", exerciseId: B }),
        makeEvent({ result: "correct", exerciseId: C }),
      ],
      lessonId: "L1",
      exerciseIds: THREE,
    });
    assert(p.attempted === 3, "attempted must be 3");
    assert(p.completed === true, "completed must be true");
    assertEqual(p.remainingExerciseIds, [], "nothing remains");
  });

  test("duplicate events for the same exercise count once", () => {
    const p = selectLessonProgress({
      events: [
        makeEvent({ result: "correct", exerciseId: A, clientEventId: "e1" }),
        makeEvent({ result: "incorrect_but_understandable", exerciseId: A, clientEventId: "e2" }),
      ],
      lessonId: "L1",
      exerciseIds: THREE,
    });
    assert(p.attempted === 1, "duplicate exercise counts once");
    assertEqual(p.attemptedExerciseIds, [A], "only A attempted");
  });

  test("events from another lesson / unknown exercise are ignored", () => {
    const p = selectLessonProgress({
      events: [
        makeEvent({ result: "correct", exerciseId: A }),
        makeEvent({ result: "correct", exerciseId: "L2-ex99", lessonId: "L2" }),
        makeEvent({ result: "correct", exerciseId: "unknown-ex" }),
      ],
      lessonId: "L1",
      exerciseIds: THREE,
    });
    assert(p.attempted === 1, "only the in-lesson exercise counts");
    assertEqual(p.attemptedExerciseIds, [A], "only A attempted");
  });

  test("empty exercise list -> total 0, started/completed false", () => {
    const p = selectLessonProgress({
      events: [makeEvent({ result: "correct", exerciseId: A })],
      lessonId: "L1",
      exerciseIds: [],
    });
    assert(p.total === 0, "total must be 0");
    assert(p.attempted === 0, "attempted must be 0");
    assert(p.started === false, "started must be false");
    assert(p.completed === false, "empty list must not complete");
  });

  test("out-of-order events still complete; output follows required order", () => {
    const p = selectLessonProgress({
      events: [
        makeEvent({ result: "correct", exerciseId: C, timestamp: 3000 }),
        makeEvent({ result: "correct", exerciseId: A, timestamp: 1000 }),
        makeEvent({ result: "correct", exerciseId: B, timestamp: 2000 }),
      ],
      lessonId: "L1",
      exerciseIds: THREE,
    });
    assert(p.completed === true, "completed regardless of event order");
    assertEqual(p.attemptedExerciseIds, THREE, "order follows required list, not events");
  });

  test("mixed correct / incorrect / skip attempts all count as attempted", () => {
    const p = selectLessonProgress({
      events: [
        makeEvent({ result: "correct", exerciseId: A }),
        makeEvent({ result: "wrong_item", exerciseId: B }),
        makeEvent({ result: "empty_or_skip", exerciseId: C }),
      ],
      lessonId: "L1",
      exerciseIds: THREE,
    });
    assert(p.attempted === 3, "any result counts as an attempt in v1");
    assert(p.completed === true, "all covered -> completed");
  });

  test("caller-supplied duplicate required ids are de-duplicated", () => {
    const p = selectLessonProgress({
      events: [makeEvent({ result: "correct", exerciseId: A })],
      lessonId: "L1",
      exerciseIds: [A, A, B],
    });
    assert(p.total === 2, "duplicate required ids collapse to 2");
    assertEqual(p.attemptedExerciseIds, [A], "A attempted once");
    assertEqual(p.remainingExerciseIds, [B], "B remains once");
  });

  test("pure: does not mutate input arrays", () => {
    const events = [makeEvent({ result: "correct", exerciseId: A })];
    const exerciseIds = [...THREE];
    const eventsBefore = clone(events);
    const idsBefore = clone(exerciseIds);
    selectLessonProgress({ events, lessonId: "L1", exerciseIds });
    assert(deepEqual(events, eventsBefore), "events array unchanged");
    assert(deepEqual(exerciseIds, idsBefore), "exerciseIds array unchanged");
  });
});
