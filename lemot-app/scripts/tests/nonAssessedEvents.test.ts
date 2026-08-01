/**
 * Non-assessed event safety tests (PR-02, Parts E/F/G).
 *
 * Three guarantees the pilot depends on:
 *  1. the session controller no longer fabricates a grade for a reveal;
 *  2. a non-assessed event moves NOTHING in the mastery projection;
 *  3. the D-3 boundary holds — telemetry is not a learning-evidence home.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { NO_ASSISTANCE, TEST_SANDBOX_SURFACE } from "./helpers";
import type { AttemptEvidenceContext } from "../../content/learning-engine/session-controller";

/** Explicit attempt context, mirroring what the fixture hook supplies. */
const FIXTURE_CONTEXT: AttemptEvidenceContext = {
  promptLevel: "PF0",
  assistance: NO_ASSISTANCE,
  opportunity: {
    authored: true,
    prerequisitesSafe: true,
    evaluator: "approved_deterministic",
    learnerAuthorship: "verified",
    requiredConstitutiveSupport: [],
    qualityIncident: null,
  },
  treatmentFor: () => "active",
};
import { makeFakeKv, makeEvent, makeNonAssessedEvent } from "./helpers";
import { LocalRepository } from "../../content/learning-engine/repository/local";
import { LearningSessionController } from "../../content/learning-engine/session-controller";
import {
  createEmptyMasterySnapshot,
  scoreEvent,
  scoreEvents,
} from "../../content/learning-engine/mastery";
import { isAssessedEvent } from "../../content/learning-engine/events";
import type { ExerciseBlueprint } from "../../content/learning-engine/types";
import {
  TELEMETRY_EVENT_TYPES,
  createTelemetryEvent,
} from "../../content/learning-engine/telemetry";

function makeController(repo: LocalRepository): LearningSessionController {
  let t = 0;
  let n = 0;
  return new LearningSessionController({
    repository: repo,
    sessionId: "sess-1",
    lessonId: "l1",
    contentVersion: "content-v1",
    now: () => (t += 1_000),
    makeClientEventId: () => `evt-${(n += 1)}`,
    resolveEventSurface: TEST_SANDBOX_SURFACE,
  });
}

const recognitionExercise: ExerciseBlueprint = {
  id: "rec-1",
  lessonId: "l1",
  operation: "recognition",
  targetItemIds: ["chunk-bonjour"],
  prompt: "Meet the piece",
  displayAnswer: "hello",
};

const fillExercise: ExerciseBlueprint = {
  id: "fill-1",
  lessonId: "l1",
  operation: "fill",
  targetItemIds: ["chunk-bonjour"],
  targetText: "bonjour",
};

describe("session controller — recognition reveal correction", () => {
  test("a reveal emits a non-assessed reveal event, never result: correct", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    const controller = makeController(repo);

    controller.recordRecognitionReveal({ exercise: recognitionExercise, context: FIXTURE_CONTEXT });
    await controller.flush();

    const events = await repo.readAllEvents();
    assertEqual(events.length, 1, "one event recorded");
    const e = events[0];
    assert(!isAssessedEvent(e), "a reveal must not be assessed");
    assertEqual(e.primitive, "reveal", "reveal primitive");
    assertEqual(e.evidenceClass, "comparison_only", "comparison only");
    assertEqual(e.outcome, "completed_unassessed", "completed-unassessed outcome");
    const raw = e as unknown as Record<string, unknown>;
    assertEqual(raw.result, undefined, "NO fabricated grading result");
    assertEqual(raw.errorTags, undefined, "NO fabricated error tags");
    assertEqual(e.expectedAnswer, "hello", "the revealed authored text is still recorded");
  });

  test("a revealed exercise gains no recognition success in mastery", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const controller = makeController(repo);
    controller.recordRecognitionReveal({ exercise: recognitionExercise, context: FIXTURE_CONTEXT });
    await controller.flush();

    const snapshot = scoreEvents(await repo.readAllEvents());
    assertEqual(
      Object.keys(snapshot.items).length,
      0,
      "revealing an answer must not create an item row or a success",
    );
  });

  test("assessed attempts still emit v3 and score exactly as before", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const controller = makeController(repo);
    controller.recordGradedAttempt({
      context: FIXTURE_CONTEXT,
      exercise: fillExercise,
      userAnswer: "bonjour",
      expectedAnswer: "bonjour",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "bonjour" },
    });
    await controller.flush();

    const events = await repo.readAllEvents();
    const e = events[0];
    assert(isAssessedEvent(e), "a graded attempt stays assessed");
    assertEqual(e.schemaVersion, 3, "stamped v3");
    assertEqual(e.result, "correct", "grading result unchanged");
    assertEqual(e.primitive, "production", "fill is production");

    const snapshot = scoreEvents(events);
    const m = snapshot.items["chunk-bonjour"];
    assertEqual(m.productionSuccess, 1, "the assessed attempt still credits production");
    assertEqual(m.monLexiqueStatus, "added", "Mon Lexique gate behaves as before");
  });

  test("appends stay serialized and attempt numbering is preserved", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const controller = makeController(repo);
    for (let i = 0; i < 3; i += 1) {
      controller.recordGradedAttempt({
      context: FIXTURE_CONTEXT,
        exercise: fillExercise,
        userAnswer: "bonjour",
        expectedAnswer: "bonjour",
        gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "bonjour" },
      });
    }
    await controller.flush();
    const events = await repo.readAllEvents();
    assertEqual(events.length, 3, "every append landed (serialized, none lost)");
    assertEqual(
      events.map((e) => e.attemptNumber).join(","),
      "1,2,3",
      "attempt numbering preserved",
    );
  });
});

describe("mastery — non-assessed events are a strict no-op", () => {
  const primitives = ["exposure", "reveal", "self_report", "issue_report"] as const;

  test("no primitive creates an item row or moves any counter", () => {
    for (const primitive of primitives) {
      const before = createEmptyMasterySnapshot();
      const after = scoreEvent(before, makeNonAssessedEvent({ primitive }));
      assertEqual(
        Object.keys(after.items).length,
        0,
        `${primitive} must not create an item row`,
      );
      assertEqual(
        JSON.stringify(after.items),
        JSON.stringify(before.items),
        `${primitive} must move no counter`,
      );
    }
  });

  test("a non-assessed event cannot rescue or damage an existing item", () => {
    const graded = scoreEvent(
      createEmptyMasterySnapshot(),
      makeEvent({ result: "correct", itemIds: ["chunk-bonjour"] }),
    );
    const after = scoreEvent(
      graded,
      makeNonAssessedEvent({ primitive: "exposure", itemIds: ["chunk-bonjour"] }),
    );
    assertEqual(
      JSON.stringify(after.items),
      JSON.stringify(graded.items),
      "item mastery must be byte-identical before and after a non-assessed event",
    );
  });

  test("non-assessed events are recorded as processed (idempotency policy)", () => {
    const e = makeNonAssessedEvent({ primitive: "reveal", clientEventId: "rev-1" });
    const once = scoreEvent(createEmptyMasterySnapshot(), e);
    assert(
      once.processedClientEventIds.includes("rev-1"),
      "the decided policy records it as processed so replay is stable",
    );
    assertEqual(once.updatedAt, e.timestamp, "it may advance updatedAt");

    const twice = scoreEvent(once, e);
    assertEqual(
      JSON.stringify(twice),
      JSON.stringify(once),
      "reapplying the same non-assessed event changes nothing",
    );
  });

  test("a mixed log scores only its assessed events", () => {
    const snapshot = scoreEvents([
      makeNonAssessedEvent({ primitive: "exposure", itemIds: ["chunk-bonjour"] }),
      makeEvent({ result: "correct", itemIds: ["chunk-bonjour"] }),
      makeNonAssessedEvent({ primitive: "reveal", itemIds: ["chunk-bonjour"] }),
      makeNonAssessedEvent({ primitive: "self_report", itemIds: ["chunk-bonjour"] }),
    ]);
    const m = snapshot.items["chunk-bonjour"];
    assertEqual(m.seenCount, 1, "only the assessed event counts as seen");
    assertEqual(m.productionSuccess, 1, "exactly one production success");
    assertEqual(m.recognitionAttempts, 0, "no recognition attempt was ever made");
    assertEqual(snapshot.processedClientEventIds.length, 4, "all four are processed");
  });

  test("no supported-production counter or attribution logic was added in PR-02", () => {
    const snapshot = scoreEvent(
      createEmptyMasterySnapshot(),
      makeEvent({ result: "correct", itemIds: ["chunk-bonjour"] }),
    );
    const keys = Object.keys(snapshot.items["chunk-bonjour"]);
    for (const forbidden of [
      "supportedProductionSuccess",
      "assistanceScopedSuccess",
      "attribution",
      "admissible",
    ]) {
      assert(!keys.includes(forbidden), `${forbidden} belongs to PR-03/PR-04, not PR-02`);
    }
  });
});

describe("D-3 telemetry boundary", () => {
  test("the telemetry taxonomy is unchanged by PR-02", () => {
    assertEqual(TELEMETRY_EVENT_TYPES.length, 15, "still the 15 v0 product-funnel types");
    assert(
      !(TELEMETRY_EVENT_TYPES as readonly string[]).includes("self_report"),
      "learning primitives must not leak into telemetry",
    );
  });

  test("telemetry still rejects raw learner text", () => {
    let threw = false;
    try {
      createTelemetryEvent({
        type: "answer_submitted",
        eventId: "t-1",
        timestamp: 1,
        source: "test",
        userAnswer: "bonjour",
      } as never);
    } catch {
      threw = true;
    }
    assert(threw, "a smuggled learner-text key must still be rejected");
  });

  test("a telemetry event is not a learning event and cannot be scored", () => {
    const t = createTelemetryEvent({
      type: "screen_seen",
      eventId: "t-2",
      timestamp: 1,
      source: "test",
    });
    const raw = t as unknown as Record<string, unknown>;
    assertEqual(raw.assessed, undefined, "telemetry has no assessed arm");
    assertEqual(raw.primitive, undefined, "telemetry carries no learning primitive");
    assertEqual(raw.itemIds, undefined, "telemetry references no learner items");
  });
});
