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
import type {
  ItemMastery,
  ProductionEvidenceCounts,
} from "../../content/learning-engine/mastery";
import type {
  AdmissibilityState,
  AssistanceSnapshot,
  AttributionState,
} from "../../content/learning-engine/evidence-context";

/** Known assistance with nothing applied — the "clean first attempt" baseline. */
export const NO_ASSISTANCE: AssistanceSnapshot = {
  capture: "known",
  constitutive: [],
  hintRung: 0,
  retryIndex: 0,
  selfCorrection: false,
  priorAnswerExposure: "none",
  accessibility: { replayCount: 0, slowPlayback: false },
};
const ADMITTED: AdmissibilityState = { status: "admitted" };
const LEARNER: AttributionState = { status: "resolved", source: "learner" };
const NOT_APPLICABLE: AttributionState = { status: "not_applicable" };
const NO_EVIDENCE: AdmissibilityState = {
  status: "no_evidence",
  reasons: ["non_assessed_interaction"],
};

/**
 * Scoped production channels for a hand-authored `ItemMastery` fixture that
 * declares only AGGREGATE production counters.
 *
 * Such a fixture states production history with no assistance provenance. PR-03
 * already decided what that means: production of unknown assistance is
 * **Supported**, never independent (FQ-3 / I-19 — the evidence stays valid, it
 * simply cannot establish independent production). Inferring `independent` from
 * an aggregate `productionSuccess` would be exactly the overclaim PR-04 exists
 * to prevent.
 *
 * Deriving the channels from the aggregates also keeps the
 * `aggregate === sum(channels)` invariant true for free as fixtures change.
 * A fixture that genuinely means independent or self-corrected history passes
 * `production` explicitly instead.
 */
export function supportedProductionHistory(
  m: Partial<ItemMastery>,
): ProductionEvidenceCounts {
  const zero = () => ({ attempts: 0, success: 0, failure: 0 });
  return {
    independent: zero(),
    supported: {
      attempts: m.productionAttempts ?? 0,
      success: m.productionSuccess ?? 0,
      failure: m.productionFailure ?? 0,
    },
    selfCorrection: zero(),
  };
}

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
  const itemIds: readonly ItemId[] = over.itemIds ?? ["item-a"];
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
    // Defaults to `[result]`, mirroring what the session controller actually
    // emits. The previous `[]` default produced an assessed event with zero
    // error tags — a shape the envelope contract has never allowed and which
    // the strengthened append-boundary validator correctly rejects.
    errorTags: over.errorTags ?? [over.result],
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
    targetTreatments: over.targetTreatments ?? itemIds.map(() => "active"),
    evidenceCeiling: over.evidenceCeiling ?? evidenceClass,
    evidenceClass,
    outcome: over.outcome ?? outcomeForResult(over.result),
    assistance: over.assistance ?? NO_ASSISTANCE,
    attribution: over.attribution ?? LEARNER,
    admissibility: over.admissibility ?? ADMITTED,
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
  const itemIds: readonly ItemId[] = over.itemIds ?? ["item-a"];
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
    targetTreatments: over.targetTreatments ?? itemIds.map(() => "active"),
    evidenceCeiling: over.evidenceCeiling ?? evidenceClass,
    evidenceClass,
    outcome: over.outcome ?? "completed_unassessed",
    assistance: over.assistance ?? NO_ASSISTANCE,
    attribution: over.attribution ?? NOT_APPLICABLE,
    admissibility: over.admissibility ?? NO_EVIDENCE,
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

/**
 * Build a v2-shaped (post-PR-02, pre-PR-03) event object for migration tests:
 * `schemaVersion: 2` with the scalar assistance/attribution/admissibility seams.
 */
export function makeV2Event(
  over: Partial<Record<string, unknown>> = {},
): Record<string, unknown> {
  seq += 1;
  const assessed = over.assessed !== false;
  const base: Record<string, unknown> = {
    schemaVersion: 2,
    assessed,
    clientEventId: `v2-evt-${seq}`,
    sessionId: "sess-1",
    lessonId: "l1",
    exerciseId: "ex-1",
    operation: "fill",
    itemIds: ["item-a"],
    promptLevel: "PF0",
    attemptNumber: 1,
    userAnswer: assessed ? "bonjour" : null,
    expectedAnswer: "bonjour",
    timestamp: 1_000,
    contentVersion: "content-v1",
    appBuild: "test",
    deviceInfo: { platform: "test" },
    sync: { status: "pending", origin: "local", queuedAt: 1_000 },
    primitive: assessed ? "production" : "reveal",
    placement: "engine_fixture_sandbox",
    evId: null,
    payloadId: "ex-1",
    sentenceId: null,
    targetTreatments: ["legacy_unknown"],
    evidenceCeiling: assessed ? "controlled_production" : "comparison_only",
    evidenceClass: assessed ? "controlled_production" : "comparison_only",
    outcome: assessed ? "correct" : "completed_unassessed",
    assistance: "not_captured",
    attribution: "unresolved",
    admissibility: "legacy_admitted",
    sequence: null,
  };
  if (assessed) {
    base.normalizedAnswer = "bonjour";
    base.result = "correct";
    base.errorTags = ["correct"];
  }
  return { ...base, ...over };
}
