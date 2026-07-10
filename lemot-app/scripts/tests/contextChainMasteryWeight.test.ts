/**
 * PR-E2 — context_chain mastery credit is bounded, WITHOUT dropping later-step
 * failures (audit B23 + PR-E2 review P1).
 *
 * A context_chain emits one graded event PER internal step, each carrying the
 * exercise's FULL target set — so an N-step chain over M targets credited each
 * target N times (N×M), "mastering" every item off a single chain. The controller
 * now dedups only REPEATED SUCCESSES within a chain attempt: the first success
 * carries the targets (one bounded box advance); a later success carries none.
 * Every non-success outcome (failure / near-miss / skip) ALWAYS carries the
 * targets, so a failure after a correct step is never dropped. Non-chain
 * operations are unchanged, and the PR-E1 near-miss/skip due-timing is preserved.
 *
 * Exercised end-to-end through the real `LearningSessionController` +
 * `LocalRepository` (in-memory KV) + the pure `scoreEvents` reducer.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import { LocalRepository } from "../../content/learning-engine/repository/local";
import { LearningSessionController } from "../../content/learning-engine/session-controller";
import { scoreEvents } from "../../content/learning-engine/mastery";
import type { ExerciseBlueprint } from "../../content/learning-engine/types";
import type { ErrorTagCode } from "../../content/learning-engine/events";

function makeController(repo: LocalRepository): LearningSessionController {
  let t = 0;
  let n = 0;
  return new LearningSessionController({
    repository: repo,
    sessionId: "sess-1",
    lessonId: "l1",
    contentVersion: "content-v1",
    now: () => (t += 1_000), // deterministic clock
    makeClientEventId: () => `evt-${(n += 1)}`, // deterministic id (no Math.random)
  });
}

const chain = (targetItemIds: string[]): ExerciseBlueprint => ({
  id: "cc-1",
  lessonId: "l1",
  operation: "context_chain",
  targetItemIds,
  prompt: "A small moment",
  steps: [
    { prompt: "s1", answer: "a1" },
    { prompt: "s2", answer: "a2" },
    { prompt: "s3", answer: "a3" },
  ],
});

const fill = (id: string, targetItemIds: string[]): ExerciseBlueprint => ({
  id,
  lessonId: "l1",
  operation: "fill",
  targetItemIds,
});

const graded = (result: ErrorTagCode) => ({
  userAnswer: "x",
  expectedAnswer: "x",
  gradeResult: { result, errorTags: [] as ErrorTagCode[], normalizedAnswer: "x" },
});

describe("PR-E2 B23 — context_chain credit bounded, later failures preserved", () => {
  test("1. all-success multi-step × multiple targets credits each target ONCE (no N×M)", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a", "b"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    await c.flush();

    const events = await repo.readAllEvents();
    assert(events.length === 3, "one event per step is still recorded (history preserved)");
    assertEqual(events[0].itemIds, ["a", "b"], "the first success carries the chain targets");
    assertEqual(events[1].itemIds, [], "a repeated success carries no item attribution");
    assertEqual(events[2].itemIds, [], "a repeated success carries no item attribution");

    const snap = scoreEvents(events);
    assert(Object.keys(snap.items).length === 2, "no item inflation");
    assert(snap.items["a"].productionSuccess === 1, "target a credited once, not 3×");
    assert(snap.items["b"].productionSuccess === 1, "target b credited once, not 3×");
    assert(snap.items["a"].leitnerBox === 1, "box advances once, not to 3");
  });

  test("2. success THEN failure: success credited once AND the later failure is not dropped (P1)", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") }); // step 1 ✓
    c.recordGradedAttempt({ exercise: ex, ...graded("wrong_item") }); // step 2 ✗
    await c.flush();

    const events = await repo.readAllEvents();
    assertEqual(events[0].itemIds, ["a"], "first success carries the target");
    assertEqual(events[1].itemIds, ["a"], "the LATER failure still carries the target (not dropped)");

    const a = scoreEvents(events).items["a"];
    assert(a.productionSuccess === 1, "one bounded success credit");
    assert(a.productionFailure === 1, "the later failure IS recorded");
    assert(a.wrongCount === 1, "wrongCount reflects the failed step");
    assert((a.weakTags.wrong_item ?? 0) === 1, "the failing tag accrues weakness");
  });

  test("3. failure THEN success: the failure registers AND one bounded success is credited", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("wrong_item") }); // step 1 ✗
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") }); // step 2 ✓
    await c.flush();

    const events = await repo.readAllEvents();
    assertEqual(events[0].itemIds, ["a"], "the failure carries the target");
    assertEqual(events[1].itemIds, ["a"], "the first success carries the target");

    const a = scoreEvents(events).items["a"];
    assert(a.productionFailure === 1, "failure registered");
    assert(a.productionSuccess === 1, "one bounded success credit");
    assert((a.weakTags.wrong_item ?? 0) === 1, "weakness registered from the failed step");
  });

  test("4. repeated successes after the first add NO extra mastery success credit", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    await c.flush();

    const events = await repo.readAllEvents();
    assertEqual(events[1].itemIds, [], "second success is dedup'd");
    assertEqual(events[2].itemIds, [], "third success is dedup'd");
    const a = scoreEvents(events).items["a"];
    assert(a.productionSuccess === 1, "only one success credit for the whole chain");
    assert(a.productionAttempts === 1, "only the first success counts as an attempt");
    assert(a.leitnerBox === 1, "the box advances exactly once");
  });

  test("5. non-context_chain operations are unchanged (fill credits every attempt)", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = fill("f-1", ["c"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") });
    await c.flush();

    const events = await repo.readAllEvents();
    assertEqual(events[0].itemIds, ["c"], "fill keeps its target set on every attempt");
    assertEqual(events[1].itemIds, ["c"], "fill keeps its target set on every attempt");
    assert(scoreEvents(events).items["c"].productionAttempts === 2, "fill credits each attempt");
  });

  test("6. PR-E1 skip due-now behavior is preserved through the controller", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    // A fill skip must keep the item due now (PR-E1 B12), unaffected by the B23 change.
    c.recordGradedAttempt({ exercise: fill("f-skip", ["d"]), ...graded("empty_or_skip") });
    await c.flush();

    const events = await repo.readAllEvents();
    const d = scoreEvents(events).items["d"];
    assert(d.skipCount === 1, "skip is counted");
    assert(d.leitnerBox === 0, "skip neither advances nor demotes the box");
    assert(d.dueAt === events[0].timestamp, "skip keeps the item due now (PR-E1 B12 preserved)");
  });

  test("7. a near-miss after a success still registers (targets not dropped)", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    const ex = chain(["a"]);
    c.recordGradedAttempt({ exercise: ex, ...graded("correct") }); // success
    c.recordGradedAttempt({ exercise: ex, ...graded("accent_only") }); // near-miss (precision)
    await c.flush();

    const events = await repo.readAllEvents();
    assertEqual(events[1].itemIds, ["a"], "the later near-miss still carries the target");
    const a = scoreEvents(events).items["a"];
    assert(a.productionSuccess === 1, "the success is credited once");
    assert(a.precisionCount === 1, "the near-miss precision signal is not dropped");
  });
});
