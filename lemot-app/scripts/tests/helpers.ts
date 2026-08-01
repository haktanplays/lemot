/**
 * Shared test fixtures: an in-memory KV adapter and a LearningEvent factory.
 *
 * The KV adapter satisfies every storage seam the modules under test inject —
 * `KvLike` (LocalRepository: get/set), `KvRemovable` (delete primitive: remove),
 * and `KvFull` (privacy-local: get/set/remove) — so no native storage loads.
 */
import type {
  AssessedLearningEvent,
  ErrorTagCode,
  NonAssessedLearningEvent,
} from "../../content/learning-engine/events";
import { LEARNING_EVENT_SCHEMA_VERSION } from "../../content/learning-engine/events";
import { outcomeForResult } from "../../content/learning-engine/event-envelope";
import type { ItemId, OperationId, PromptFadeLevel } from "../../content/learning-engine/types";

/** Backing map is exposed so tests can assert exactly which keys were touched. */
export type FakeKv = {
  readonly map: Map<string, string>;
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function makeFakeKv(initial?: Record<string, string>): FakeKv {
  const map = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    map,
    getItem: (key) => (map.has(key) ? (map.get(key) as string) : null),
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: (key) => {
      map.delete(key);
    },
  };
}

let seq = 0;

/**
 * Build a full `LearningEvent` with sensible defaults. Only `result` is
 * required; any field can be overridden. `clientEventId` is unique per call
 * unless overridden, so idempotency tests can force collisions deliberately.
 */
export function makeEvent(
  over: Partial<AssessedLearningEvent> & { result: ErrorTagCode },
): AssessedLearningEvent {
  seq += 1;
  const operation: OperationId = over.operation ?? "fill";
  const itemIds: ItemId[] = over.itemIds ?? ["item-a"];
  const promptLevel: PromptFadeLevel = over.promptLevel ?? "PF0";
  const primitive =
    over.primitive ??
    (operation === "build" || operation === "recognition" ? "selection" : "production");
  const evidenceClass =
    over.evidenceClass ?? (primitive === "selection" ? "recognition" : "controlled_production");
  return {
    schemaVersion: over.schemaVersion ?? LEARNING_EVENT_SCHEMA_VERSION,
    assessed: true,
    clientEventId: over.clientEventId ?? `evt-${seq}`,
    sessionId: over.sessionId ?? "sess-1",
    lessonId: over.lessonId ?? "l1",
    exerciseId: over.exerciseId ?? "ex-1",
    operation,
    itemIds,
    promptLevel,
    attemptNumber: over.attemptNumber ?? 1,
    userAnswer: over.userAnswer ?? "bonjour",
    expectedAnswer: over.expectedAnswer ?? "bonjour",
    normalizedAnswer: over.normalizedAnswer ?? "bonjour",
    result: over.result,
    errorTags: over.errorTags ?? [],
    timestamp: over.timestamp ?? 1_000,
    contentVersion: over.contentVersion ?? "content-v1",
    appBuild: over.appBuild ?? "test",
    deviceInfo: over.deviceInfo ?? { platform: "test" },
    sync: over.sync ?? { status: "pending", origin: "local", queuedAt: 1_000 },
    primitive,
    placement: over.placement ?? "engine_fixture_sandbox",
    evId: over.evId ?? null,
    payloadId: over.payloadId ?? null,
    sentenceId: over.sentenceId ?? null,
    targetTreatments: over.targetTreatments ?? itemIds.map(() => "legacy_unknown"),
    evidenceCeiling: over.evidenceCeiling ?? evidenceClass,
    evidenceClass,
    outcome: over.outcome ?? outcomeForResult(over.result),
    assistance: over.assistance ?? "not_captured",
    attribution: over.attribution ?? "unresolved",
    admissibility: over.admissibility ?? "unresolved",
    sequence: over.sequence ?? null,
  };
}

/**
 * Build a NON-assessed v2 event (exposure / reveal / self-report / issue report).
 * There is deliberately no way to give it a grading result.
 */
export function makeNonAssessedEvent(
  over: Partial<NonAssessedLearningEvent> & { primitive: NonAssessedLearningEvent["primitive"] },
): NonAssessedLearningEvent {
  seq += 1;
  const itemIds: ItemId[] = over.itemIds ?? ["item-a"];
  const evidenceClass =
    over.evidenceClass ??
    (over.primitive === "reveal"
      ? "comparison_only"
      : over.primitive === "self_report"
        ? "self_report"
        : over.primitive === "exposure"
          ? "exposure"
          : "no_mastery_evidence");
  return {
    schemaVersion: over.schemaVersion ?? LEARNING_EVENT_SCHEMA_VERSION,
    assessed: false,
    clientEventId: over.clientEventId ?? `evt-${seq}`,
    sessionId: over.sessionId ?? "sess-1",
    lessonId: over.lessonId ?? "l1",
    exerciseId: over.exerciseId ?? "ex-1",
    operation: over.operation ?? "recognition",
    itemIds,
    promptLevel: over.promptLevel ?? "PF0",
    attemptNumber: over.attemptNumber ?? 1,
    userAnswer: over.userAnswer ?? null,
    expectedAnswer: over.expectedAnswer ?? null,
    timestamp: over.timestamp ?? 1_000,
    contentVersion: over.contentVersion ?? "content-v1",
    appBuild: over.appBuild ?? "test",
    deviceInfo: over.deviceInfo ?? { platform: "test" },
    sync: over.sync ?? { status: "pending", origin: "local", queuedAt: 1_000 },
    primitive: over.primitive,
    placement: over.placement ?? "engine_fixture_sandbox",
    evId: over.evId ?? null,
    payloadId: over.payloadId ?? null,
    sentenceId: over.sentenceId ?? null,
    targetTreatments: over.targetTreatments ?? itemIds.map(() => "legacy_unknown"),
    evidenceCeiling: over.evidenceCeiling ?? evidenceClass,
    evidenceClass,
    outcome: over.outcome ?? "completed_unassessed",
    assistance: over.assistance ?? "not_captured",
    attribution: over.attribution ?? "unresolved",
    admissibility: over.admissibility ?? "unresolved",
    sequence: over.sequence ?? null,
  };
}

/**
 * Build a v1-shaped (pre-PR-02) event object for migration tests: no
 * `schemaVersion`, no `assessed`, grading fields always present.
 */
export function makeV1Event(
  over: Partial<Record<string, unknown>> & { result: ErrorTagCode },
): Record<string, unknown> {
  seq += 1;
  return {
    clientEventId: `v1-evt-${seq}`,
    sessionId: "sess-1",
    lessonId: "l1",
    exerciseId: "ex-1",
    operation: "fill",
    itemIds: ["item-a"],
    promptLevel: "PF0",
    attemptNumber: 1,
    userAnswer: "bonjour",
    expectedAnswer: "bonjour",
    normalizedAnswer: "bonjour",
    errorTags: [over.result],
    timestamp: 1_000,
    contentVersion: "content-v1",
    appBuild: "test",
    deviceInfo: { platform: "test" },
    sync: { status: "pending", origin: "local", queuedAt: 1_000 },
    ...over,
  };
}
