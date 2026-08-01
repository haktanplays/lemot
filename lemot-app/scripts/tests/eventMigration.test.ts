/**
 * Learning-event migration-chain tests (v1 → v2 → v3; PR-02 + PR-03, YASA 1).
 *
 * The migration's contract is "lose nothing, invent nothing". These tests pin
 * both halves: every v1 fact survives byte-for-byte, and every fact v1 could not
 * know becomes an explicit legacy/unresolved state rather than a confident guess.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeV1Event } from "./helpers";
import {
  LEARNING_EVENT_SCHEMA_VERSION,
  isAssessedEvent,
} from "../../content/learning-engine/events";
import type {
  AssessedLearningEvent,
  LearningEvent,
} from "../../content/learning-engine/events";
import {
  eventMigrationRegistry,
  isLegacyRevealEvent,
  migrateEventLogToCurrent,
  migrateEventToCurrent,
} from "../../content/learning-engine/event-migration";
import { defaultMigrationRegistry } from "../../content/learning-engine/migrations";
import { validateLearningEvent } from "../../content/learning-engine/event-envelope";

/** The exact shape `recordRecognitionReveal` wrote before PR-02. */
const legacyReveal = () =>
  makeV1Event({
    result: "correct",
    operation: "recognition",
    userAnswer: null,
    normalizedAnswer: null,
    expectedAnswer: "je voudrais",
    errorTags: ["correct"],
  });

function migrated(v1: Record<string, unknown>): LearningEvent {
  const res = migrateEventToCurrent(v1);
  if (res.status !== "ok") {
    throw new Error(`expected migration to succeed, got: ${res.reason}`);
  }
  assert(res.migrated, "expected the event to be migrated, not passed through");
  return res.event;
}

describe("v1 -> v3 event migration (through the v2 rung)", () => {
  test("a v1 fill event becomes a valid assessed v3 production event", () => {
    const v1 = makeV1Event({ result: "correct", operation: "fill" });
    const e = migrated(v1);
    assertEqual(validateLearningEvent(e).join(" | "), "", "migrated event must be valid");
    assertEqual(e.schemaVersion, LEARNING_EVENT_SCHEMA_VERSION, "stamped v3");
    assert(isAssessedEvent(e), "a graded fill stays assessed");
    assertEqual(e.primitive, "production", "fill is a production primitive");
    // v3: v1/v2 recorded no assistance, and unknown assistance can never
    // establish independent production (FQ-3), so the observation is capped.
    assertEqual(e.evidenceClass, "supported_production", "capped by unknown assistance");
  });

  test("a v1 build event becomes a selection primitive", () => {
    const e = migrated(makeV1Event({ result: "wrong_order", operation: "build" }));
    assertEqual(e.primitive, "selection", "build is selection");
    assertEqual(e.evidenceClass, "recognition", "recognition stays recognition");
    assertEqual(e.outcome, "incorrect", "wrong_order maps to incorrect");
  });

  test("a graded v1 recognition event stays assessed", () => {
    const e = migrated(
      makeV1Event({ result: "wrong_item", operation: "recognition", userAnswer: "non" }),
    );
    assert(isAssessedEvent(e), "a real recognition attempt is still assessed");
    assertEqual(e.primitive, "selection", "recognition is selection");
  });

  test("a legacy recognition REVEAL becomes a non-assessed reveal", () => {
    const v1 = legacyReveal();
    assert(isLegacyRevealEvent(v1), "precondition: matches the legacy reveal signature");
    const e = migrated(v1);
    assert(!isAssessedEvent(e), "a reveal was never graded");
    assertEqual(e.primitive, "reveal", "reveal primitive");
    assertEqual(e.evidenceClass, "comparison_only", "comparison only");
    assertEqual(e.outcome, "completed_unassessed", "completed-unassessed outcome");
    const raw = e as unknown as Record<string, unknown>;
    assertEqual(raw.result, undefined, "the fabricated 'correct' must be gone from grading");
    assertEqual(raw.errorTags, undefined, "no error tags on a reveal");
    // Nothing is destroyed: the original grading is preserved for recovery.
    assertEqual(
      (e as unknown as { legacyGrading?: { result: string } }).legacyGrading?.result,
      "correct",
      "original v1 grading preserved verbatim for recovery",
    );
    assertEqual(e.expectedAnswer, "je voudrais", "revealed authored text preserved");
  });

  test("every v1 fact is preserved exactly", () => {
    const v1 = makeV1Event({
      result: "accent_only",
      clientEventId: "keep-me",
      timestamp: 12_345,
      sessionId: "sess-x",
      lessonId: "l7",
      exerciseId: "ex-9",
      operation: "fill",
      itemIds: ["chunk-bonjour", "chunk-merci"],
      userAnswer: "cafe",
      expectedAnswer: "café",
      normalizedAnswer: "cafe",
      errorTags: ["accent_only"],
      sync: { status: "synced", origin: "local", queuedAt: 999 },
    });
    const e = migrated(v1) as AssessedLearningEvent;
    assertEqual(e.clientEventId, "keep-me", "clientEventId preserved");
    assertEqual(e.timestamp, 12_345, "timestamp preserved");
    assertEqual(e.sessionId, "sess-x", "sessionId preserved");
    assertEqual(e.lessonId, "l7", "lessonId preserved");
    assertEqual(e.exerciseId, "ex-9", "exerciseId preserved");
    assertEqual(e.operation, "fill", "operation preserved");
    assertEqual(e.itemIds.join(","), "chunk-bonjour,chunk-merci", "item ids preserved");
    assertEqual(e.userAnswer, "cafe", "userAnswer preserved");
    assertEqual(e.expectedAnswer, "café", "expectedAnswer preserved");
    assertEqual(e.normalizedAnswer, "cafe", "normalizedAnswer preserved");
    assertEqual(e.result, "accent_only", "grading result preserved exactly");
    assertEqual(e.errorTags.join(","), "accent_only", "error tags preserved exactly");
    assertEqual(e.sync.status, "synced", "sync metadata preserved");
  });

  test("unknown facts become explicit legacy/unresolved states — never invented", () => {
    const e = migrated(makeV1Event({ result: "correct", itemIds: ["a", "b"] }));
    assertEqual(e.placement, "legacy_unknown", "placement was never recorded in v1");
    assertEqual(e.evId, null, "an EV id must never be fabricated from the operation");
    assertEqual(e.sentenceId, null, "sentence identity must never be fabricated");
    assertEqual(
      e.targetTreatments.join(","),
      "legacy_unknown,legacy_unknown",
      "treatment is unknown per target, one entry per item",
    );
    assertEqual(e.assistance.capture, "legacy_unknown", "v1 captured no assistance");
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : e.attribution.status,
      "learner",
      "history was already scored as the learner's",
    );
    assertEqual(e.admissibility.status, "legacy_admitted", "v1 events were already scored");
    assertEqual(
      e.admissibility.status === "legacy_admitted" ? e.admissibility.sourceVersion : 0,
      2,
      "reached v3 through the v2 rung",
    );
    assertEqual(e.sequence, null, "no sequence membership in v1");
    // v2 kept `controlled_production` here because it had no way to express the
    // distinction. v3 inverts the safeguard: unknown assistance can never
    // establish INDEPENDENT production, so the observation is capped down.
    assert(
      e.evidenceClass !== "recall" && e.evidenceClass !== "controlled_production",
      "unknown assistance must never claim independent production (FQ-3)",
    );
  });

  test("a migration-created event follows the same immutability contract", () => {
    const v1 = makeV1Event({ result: "correct", itemIds: ["a", "b"] });
    const e = migrated(v1);
    assert(Object.isFrozen(e), "migrated event is frozen");
    assert(Object.isFrozen(e.itemIds), "itemIds frozen");
    assert(Object.isFrozen(e.targetTreatments), "targetTreatments frozen");
    assert(Object.isFrozen(e.deviceInfo), "deviceInfo frozen");
    assert(Object.isFrozen(e.sync), "sync frozen");
    if (isAssessedEvent(e)) assert(Object.isFrozen(e.errorTags), "errorTags frozen");

    // The migrated event owns its own copies — mutating the v1 source cannot
    // reach into it.
    (v1.itemIds as string[]).push("c");
    assertEqual(e.itemIds.length, 2, "migrated event kept its own itemIds copy");
    (v1.deviceInfo as { platform: string }).platform = "mutated";
    assertEqual(e.deviceInfo.platform, "test", "migrated event kept its own deviceInfo copy");
  });

  test("a migrated reveal freezes its preserved legacy grading", () => {
    const e = migrated(legacyReveal());
    const lg = (e as unknown as { legacyGrading?: { errorTags: readonly string[] } }).legacyGrading;
    assert(lg !== undefined && Object.isFrozen(lg), "legacyGrading frozen");
    assert(Object.isFrozen(lg?.errorTags), "legacyGrading.errorTags frozen");
  });

  test("migration is deterministic and does not mutate its input", () => {
    const v1 = makeV1Event({ result: "correct" });
    const snapshot = JSON.stringify(v1);
    const a = migrated(v1);
    const b = migrated(v1);
    assertEqual(JSON.stringify(a), JSON.stringify(b), "same input → same output");
    assertEqual(JSON.stringify(v1), snapshot, "input must not be mutated");
  });

  test("an already-v2 event is returned unchanged and not re-migrated", () => {
    const v1 = makeV1Event({ result: "correct" });
    const once = migrateEventToCurrent(v1);
    assert(once.status === "ok", "first migration ok");
    const twice = migrateEventToCurrent(once.status === "ok" ? once.event : null);
    assert(twice.status === "ok" && !twice.migrated, "a v2 event must not be re-migrated");
    assertEqual(
      JSON.stringify(twice.status === "ok" ? twice.event : null),
      JSON.stringify(once.status === "ok" ? once.event : null),
      "already-current event is unchanged",
    );
  });

  test("a future schema version is rejected, original untouched", () => {
    const future = { ...makeV1Event({ result: "correct" }), schemaVersion: 99 };
    const res = migrateEventToCurrent(future);
    assert(res.status === "unsupported", "future version must be unsupported");
    assertEqual(
      res.status === "unsupported" ? res.schemaVersion : null,
      99,
      "reports the version it saw",
    );
  });

  test("a malformed v1 event is rejected, never partially accepted", () => {
    for (const bad of [
      null,
      42,
      [],
      {},
      { ...makeV1Event({ result: "correct" }), clientEventId: 5 },
      { ...makeV1Event({ result: "correct" }), itemIds: "not-an-array" },
      { ...makeV1Event({ result: "correct" }), sync: undefined },
    ]) {
      const res = migrateEventToCurrent(bad);
      assert(res.status === "unsupported", `malformed input must be rejected: ${JSON.stringify(bad)}`);
    }
  });
});

describe("event log migration", () => {
  test("an all-v1 log migrates in order", () => {
    const log = [
      makeV1Event({ result: "correct", clientEventId: "a" }),
      makeV1Event({ result: "wrong_item", clientEventId: "b" }),
    ];
    const res = migrateEventLogToCurrent(log);
    assert(res.status === "ok", "log should migrate");
    if (res.status !== "ok") return;
    assertEqual(res.migratedAny, true, "migration happened");
    assertEqual(res.events.map((e) => e.clientEventId).join(","), "a,b", "append order preserved");
  });

  test("a mixed v1/v2 log is handled deterministically", () => {
    const v1 = makeV1Event({ result: "correct", clientEventId: "old" });
    const upgraded = migrateEventToCurrent(makeV1Event({ result: "correct", clientEventId: "new" }));
    assert(upgraded.status === "ok", "precondition");
    const log = [v1, upgraded.status === "ok" ? upgraded.event : null];
    const res = migrateEventLogToCurrent(log);
    assert(res.status === "ok", "mixed log should read");
    if (res.status !== "ok") return;
    assertEqual(res.events.map((e) => e.clientEventId).join(","), "old,new", "order preserved");
    assert(
      res.events.every((e) => e.schemaVersion === LEARNING_EVENT_SCHEMA_VERSION),
      "every event is v2 after the read",
    );
  });

  test("one unsupported event makes the whole log unsupported (no silent drop)", () => {
    const log = [
      makeV1Event({ result: "correct", clientEventId: "good" }),
      { ...makeV1Event({ result: "correct" }), schemaVersion: 99 },
    ];
    const res = migrateEventLogToCurrent(log);
    assert(res.status === "unsupported", "must fail closed");
    assertEqual(res.status === "unsupported" ? res.index : -1, 1, "reports the offending index");
  });

  test("a non-array log is unsupported", () => {
    assert(
      migrateEventLogToCurrent({ not: "an array" }).status === "unsupported",
      "non-array must be unsupported",
    );
  });
});

describe("migration rails scoping", () => {
  test("the shipped default registry stays empty — event versioning is scoped", () => {
    assertEqual(
      defaultMigrationRegistry.latestVersion(),
      1,
      "registering the event step globally would tell telemetry/compaction they are behind",
    );
    assertEqual(
      eventMigrationRegistry.latestVersion(),
      LEARNING_EVENT_SCHEMA_VERSION,
      "the event registry carries the v1 -> v2 step",
    );
  });
});
