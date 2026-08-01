/**
 * Learning-event envelope v2 tests (PR-02).
 *
 * The envelope's job is to make DISHONEST events unrepresentable: no fabricated
 * `correct` on something that was never graded, no outcome that contradicts its
 * grading result, no treatment array silently flattened across mixed targets.
 * These tests pin those guarantees plus the frozen grading taxonomy.
 */
import { describe, test, assert, assertEqual } from "./harness";
import type {
  AssessedLearningEvent,
  ErrorTagCode,
  LearningEvent,
  NonAssessedLearningEvent,
} from "../../content/learning-engine/events";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_SCHEMA_VERSION,
  isAssessedEvent,
} from "../../content/learning-engine/events";
import { NO_ASSISTANCE } from "./helpers";
import {
  InvalidLearningEventError,
  createLearningEvent,
  outcomeForResult,
  validateLearningEvent,
} from "../../content/learning-engine/event-envelope";

const SYNC = { status: "pending" as const, origin: "local" as const, queuedAt: 1_000 };

const baseInput = {
  clientEventId: "evt-1",
  sessionId: "s1",
  lessonId: "l1",
  exerciseId: "ex-1",
  operation: "fill" as const,
  itemIds: ["chunk-bonjour"],
  promptLevel: "PF0" as const,
  attemptNumber: 1,
  timestamp: 1_000,
  contentVersion: "content-v1",
  appBuild: "test",
  deviceInfo: { platform: "test" },
  sync: SYNC,
  placement: "lesson_path" as const,
  targetTreatments: ["active" as const],
  // v3 requires explicit attempt-level evidence context — no defaults exist.
  assistance: NO_ASSISTANCE,
  attribution: { status: "resolved", source: "learner" } as const,
  admissibility: { status: "admitted" } as const,
};

/** Context for a non-assessed event: nothing was graded, nothing is admitted. */
const NON_ASSESSED_CONTEXT = {
  attribution: { status: "not_applicable" } as const,
  admissibility: {
    status: "no_evidence" as const,
    reasons: ["non_assessed_interaction" as const],
  },
};

function expectThrows(fn: () => unknown, what: string): InvalidLearningEventError {
  let caught: unknown = null;
  try {
    fn();
  } catch (e) {
    caught = e;
  }
  assert(caught instanceof InvalidLearningEventError, `expected ${what} to be rejected`);
  return caught as InvalidLearningEventError;
}

describe("event envelope v2 — valid construction", () => {
  test("assessed selection event", () => {
    const e = createLearningEvent({
      ...baseInput,
      assessed: true,
      operation: "build",
      primitive: "selection",
      evidenceCeiling: "recognition",
      evidenceClass: "recognition",
      result: "correct",
      errorTags: ["correct"],
      evId: "EV-010",
    });
    assert(isAssessedEvent(e), "must narrow to the assessed arm");
    assertEqual(e.schemaVersion, LEARNING_EVENT_SCHEMA_VERSION, "schema version stamped");
    assertEqual(e.outcome, "correct", "outcome derived from result");
    assertEqual(e.evId, "EV-010", "EV id kept");
  });

  test("assessed production event", () => {
    const e = createLearningEvent({
      ...baseInput,
      assessed: true,
      primitive: "production",
      evidenceCeiling: "controlled_production",
      evidenceClass: "controlled_production",
      userAnswer: "bonjour",
      expectedAnswer: "bonjour",
      normalizedAnswer: "bonjour",
      result: "accepted_variant",
      errorTags: ["accepted_variant"],
    });
    assertEqual(e.outcome, "acceptable_variant", "accepted_variant maps to acceptable_variant");
  });

  test("exposure, reveal, self-report and issue-report need no grade", () => {
    const cases = [
      { primitive: "exposure" as const, evidenceClass: "exposure" as const },
      { primitive: "reveal" as const, evidenceClass: "comparison_only" as const },
      { primitive: "self_report" as const, evidenceClass: "self_report" as const },
      { primitive: "issue_report" as const, evidenceClass: "no_mastery_evidence" as const },
    ];
    for (const c of cases) {
      const e = createLearningEvent({
        ...baseInput,
        assessed: false,
        ...NON_ASSESSED_CONTEXT,
        primitive: c.primitive,
        evidenceCeiling: c.evidenceClass,
        evidenceClass: c.evidenceClass,
      });
      assert(!isAssessedEvent(e), `${c.primitive} must be non-assessed`);
      assertEqual(e.outcome, "completed_unassessed", `${c.primitive} outcome`);
      const raw = e as unknown as Record<string, unknown>;
      assertEqual(raw.result, undefined, `${c.primitive} must carry no result`);
      assertEqual(raw.errorTags, undefined, `${c.primitive} must carry no error tags`);
    }
  });

  test("ungraded open production is a non-assessed production event", () => {
    const e = createLearningEvent({
      ...baseInput,
      assessed: false,
      ...NON_ASSESSED_CONTEXT,
      primitive: "production",
      evidenceCeiling: "open_production_attempt",
      evidenceClass: "open_production_attempt",
    });
    assert(!isAssessedEvent(e), "W1 open production must not be assessed");
  });

  test("sequence membership is accepted and validated", () => {
    const e = createLearningEvent({
      ...baseInput,
      assessed: false,
      ...NON_ASSESSED_CONTEXT,
      primitive: "exposure",
      evidenceCeiling: "exposure",
      evidenceClass: "exposure",
      sequence: { sequenceId: "seq-1", parentEventId: null, stepIndex: 0, stepCount: 3 },
    });
    assertEqual(e.sequence?.sequenceId, "seq-1", "sequence preserved");
  });

  test("a valid SentenceId is accepted", () => {
    const e = createLearningEvent({
      ...baseInput,
      assessed: false,
      ...NON_ASSESSED_CONTEXT,
      primitive: "exposure",
      evidenceCeiling: "exposure",
      evidenceClass: "exposure",
      sentenceId: "sent:l01-je-voudrais-un-cafe",
    });
    assertEqual(e.sentenceId, "sent:l01-je-voudrais-un-cafe", "sentence id kept");
  });

  test("input is not mutated by construction", () => {
    const items = ["chunk-bonjour"];
    const treatments = ["active" as const];
    const e = createLearningEvent({
      ...baseInput,
      itemIds: items,
      targetTreatments: treatments,
      assessed: true,
      primitive: "production",
      evidenceCeiling: "controlled_production",
      evidenceClass: "controlled_production",
      result: "correct",
      errorTags: ["correct"],
    });
    assertEqual(items.length, 1, "caller's itemIds array must not be mutated");
    assertEqual(treatments.length, 1, "caller's treatments array must not be mutated");
    assert(Object.isFrozen(e), "event should be frozen");
  });
});

describe("event envelope v2 — deep immutability", () => {
  /** Mutating a frozen structure must either throw or be a silent no-op. */
  function mutationHasNoEffect(mutate: () => void, describeWhat: string): void {
    try {
      mutate();
    } catch {
      return; // strict-mode TypeError is an acceptable outcome
    }
    // Sloppy mode: the write is silently ignored — the caller asserts the value.
    void describeWhat;
  }

  const build = (over: Record<string, unknown> = {}) =>
    createLearningEvent({
      ...baseInput,
      assessed: true,
      primitive: "production",
      evidenceCeiling: "controlled_production",
      evidenceClass: "controlled_production",
      result: "correct",
      errorTags: ["correct"],
      ...over,
    } as never);

  test("mutating the caller's itemIds after construction cannot change the event", () => {
    const items = ["chunk-bonjour"];
    const e = build({ itemIds: items, targetTreatments: ["active"] });
    items.push("chunk-merci");
    assertEqual(e.itemIds.length, 1, "event kept its own copy");
  });

  test("mutating the caller's targetTreatments cannot change the event", () => {
    const treatments = ["active"];
    const e = build({ itemIds: ["chunk-bonjour"], targetTreatments: treatments });
    treatments.push("ghost");
    assertEqual(e.targetTreatments.length, 1, "event kept its own copy");
  });

  test("mutating the caller's errorTags cannot change the event", () => {
    const tags = ["correct"];
    const e = build({ errorTags: tags });
    tags.push("wrong_item");
    assertEqual((e as AssessedLearningEvent).errorTags.length, 1, "event kept its own copy");
  });

  test("mutating the caller's deviceInfo cannot change the event", () => {
    const deviceInfo = { platform: "test" };
    const e = build({ deviceInfo });
    deviceInfo.platform = "mutated";
    assertEqual(e.deviceInfo.platform, "test", "event kept its own copy");
    assert(Object.isFrozen(e.deviceInfo), "deviceInfo is frozen");
    // …and the caller's own object was NOT frozen on their behalf.
    assert(!Object.isFrozen(deviceInfo), "external application objects must not be frozen");
  });

  test("mutating the caller's sync cannot change the event", () => {
    const sync = { status: "pending" as const, origin: "local" as const, queuedAt: 1_000 };
    const e = build({ sync });
    sync.queuedAt = 9_999;
    assertEqual(e.sync.queuedAt, 1_000, "event kept its own copy");
    assert(Object.isFrozen(e.sync), "sync is frozen");
    assert(!Object.isFrozen(sync), "external application objects must not be frozen");
  });

  test("mutating the caller's sequence cannot change the event", () => {
    const sequence = { sequenceId: "seq", parentEventId: null, stepIndex: 0, stepCount: 2 };
    const e = build({ sequence });
    sequence.stepIndex = 1;
    assertEqual(e.sequence?.stepIndex, 0, "event kept its own copy");
    assert(Object.isFrozen(e.sequence), "sequence is frozen");
  });

  test("nested arrays and objects on the returned event are non-mutable", () => {
    const e = build({ itemIds: ["chunk-bonjour"], targetTreatments: ["active"] });
    assert(Object.isFrozen(e.itemIds), "itemIds frozen");
    assert(Object.isFrozen(e.targetTreatments), "targetTreatments frozen");
    assert(Object.isFrozen((e as AssessedLearningEvent).errorTags), "errorTags frozen");

    mutationHasNoEffect(
      () => (e.itemIds as string[]).push("chunk-merci"),
      "push onto frozen itemIds",
    );
    assertEqual(e.itemIds.length, 1, "frozen array must not grow");

    mutationHasNoEffect(
      () => ((e.deviceInfo as { platform: string }).platform = "hacked"),
      "write to frozen deviceInfo",
    );
    assertEqual(e.deviceInfo.platform, "test", "frozen object must not change");
  });

  test("a legacy-grading reveal freezes its nested grading too", () => {
    const tags: ErrorTagCode[] = ["correct"];
    const e = createLearningEvent({
      ...baseInput,
      assessed: false,
      ...NON_ASSESSED_CONTEXT,
      operation: "recognition",
      primitive: "reveal",
      evidenceCeiling: "comparison_only",
      evidenceClass: "comparison_only",
      legacyGrading: { result: "correct", errorTags: tags },
    }) as NonAssessedLearningEvent;
    tags.push("wrong_item");
    assertEqual(e.legacyGrading?.errorTags.length, 1, "event kept its own copy");
    assert(Object.isFrozen(e.legacyGrading), "legacyGrading frozen");
    assert(Object.isFrozen(e.legacyGrading?.errorTags), "legacyGrading.errorTags frozen");
  });
});

describe("event envelope v2 — rejected construction", () => {
  test("assessed event without a result fails", () => {
    const err = expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          assessed: true,
          primitive: "production",
          evidenceCeiling: "controlled_production",
          evidenceClass: "controlled_production",
          result: "" as never,
          errorTags: [],
        }),
      "assessed event with no result",
    );
    assert(
      err.issues.some((i) => i.includes("grading result")),
      "should name the missing result",
    );
  });

  test("contradictory outcome and grading result fails", () => {
    const err = expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          assessed: true,
          primitive: "production",
          evidenceCeiling: "controlled_production",
          evidenceClass: "controlled_production",
          result: "wrong_item",
          errorTags: ["wrong_item"],
          outcome: "correct",
        }),
      "outcome contradicting result",
    );
    assert(err.issues.some((i) => i.includes("contradicts")), "should name the contradiction");
  });

  test("a non-assessed event may not claim a graded outcome", () => {
    expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          assessed: false,
          ...NON_ASSESSED_CONTEXT,
          primitive: "reveal",
          evidenceCeiling: "comparison_only",
          evidenceClass: "comparison_only",
          outcome: "correct",
        }),
      "non-assessed event claiming 'correct'",
    );
  });

  test("a smuggled grading result on a non-assessed event is rejected", () => {
    // Simulates JSON arriving from storage, where the compiler cannot help.
    const smuggled = {
      ...baseInput,
      schemaVersion: 2,
      assessed: false,
      ...NON_ASSESSED_CONTEXT,
      primitive: "reveal",
      evidenceCeiling: "comparison_only",
      evidenceClass: "comparison_only",
      outcome: "completed_unassessed",
      userAnswer: null,
      expectedAnswer: null,
      evId: null,
      payloadId: null,
      sentenceId: null,
      assistance: "not_captured",
      attribution: "unresolved",
      admissibility: "unresolved",
      sequence: null,
      result: "correct",
      errorTags: ["correct"],
    } as unknown as LearningEvent;
    const issues = validateLearningEvent(smuggled);
    assert(
      issues.some((i) => i.includes("must not carry a grading result")),
      "fabricated grade must be rejected",
    );
  });

  test("exposure / reveal / self-report can never be assessed", () => {
    for (const primitive of ["exposure", "reveal", "self_report", "issue_report"] as const) {
      const bad = {
        ...baseInput,
        schemaVersion: 2,
        assessed: true,
        primitive,
        evidenceCeiling: "no_mastery_evidence",
        evidenceClass: "no_mastery_evidence",
        outcome: "correct",
        result: "correct",
        errorTags: ["correct"],
        userAnswer: null,
        expectedAnswer: null,
        normalizedAnswer: null,
        evId: null,
        payloadId: null,
        sentenceId: null,
        assistance: "not_captured",
        attribution: "unresolved",
        admissibility: "unresolved",
        sequence: null,
      } as unknown as LearningEvent;
      assert(
        validateLearningEvent(bad).some((i) => i.includes("can never be assessed")),
        `${primitive} must not be assessable`,
      );
    }
  });

  test("malformed EV id fails; absent EV id is accepted", () => {
    expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          assessed: false,
          ...NON_ASSESSED_CONTEXT,
          primitive: "exposure",
          evidenceCeiling: "exposure",
          evidenceClass: "exposure",
          evId: "EV-10",
        }),
      "malformed EV id",
    );
    const ok = createLearningEvent({
      ...baseInput,
      assessed: false,
      ...NON_ASSESSED_CONTEXT,
      primitive: "exposure",
      evidenceCeiling: "exposure",
      evidenceClass: "exposure",
    });
    assertEqual(ok.evId, null, "absent EV id becomes null (legacy-honest)");
  });

  test("malformed sentence id fails", () => {
    expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          assessed: false,
          ...NON_ASSESSED_CONTEXT,
          primitive: "exposure",
          evidenceCeiling: "exposure",
          evidenceClass: "exposure",
          sentenceId: "sent:BAD",
        }),
      "malformed sentence id",
    );
  });

  test("treatments must be index-aligned with itemIds", () => {
    const err = expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          itemIds: ["chunk-bonjour", "chunk-merci"],
          targetTreatments: ["active"],
          assessed: true,
          primitive: "production",
          evidenceCeiling: "controlled_production",
          evidenceClass: "controlled_production",
          result: "correct",
          errorTags: ["correct"],
        }),
      "misaligned treatments",
    );
    assert(err.issues.some((i) => i.includes("index-aligned")), "should name the misalignment");
  });

  test("incompatible primitive/evidence pairing fails", () => {
    expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          assessed: false,
          ...NON_ASSESSED_CONTEXT,
          primitive: "exposure",
          evidenceCeiling: "controlled_production",
          evidenceClass: "controlled_production",
        }),
      "exposure claiming controlled production",
    );
  });

  test("malformed sequence fields fail", () => {
    expectThrows(
      () =>
        createLearningEvent({
          ...baseInput,
          assessed: false,
          ...NON_ASSESSED_CONTEXT,
          primitive: "exposure",
          evidenceCeiling: "exposure",
          evidenceClass: "exposure",
          sequence: { sequenceId: "seq", parentEventId: null, stepIndex: 5, stepCount: 3 },
        }),
      "stepIndex beyond stepCount",
    );
  });
});

describe("frozen grading taxonomy (YASA 3) survives PR-02", () => {
  test("ERROR_TAG_CODES is exactly unchanged", () => {
    assertEqual(
      ERROR_TAG_CODES.join(","),
      [
        "correct",
        "accepted_variant",
        "punctuation_only",
        "accent_only",
        "spelling_near_miss",
        "wrong_item",
        "wrong_order",
        "missing_word",
        "extra_word",
        "wrong_register",
        "meaning_shift",
        "blocked_form_used",
        "recognition_only_form_used",
        "overproduction_unseen_form",
        "incorrect_but_understandable",
        "empty_or_skip",
      ].join(","),
      "the shipped error-tag manifest is frozen forever",
    );
  });

  test("no interaction outcome leaked into the grading taxonomy", () => {
    for (const outcome of [
      "completed_unassessed",
      "abandoned",
      "system_failure",
      "indeterminate",
      "acceptable_variant",
      "near_miss",
    ]) {
      assert(
        !(ERROR_TAG_CODES as readonly string[]).includes(outcome),
        `"${outcome}" is an outcome, not a grading tag — it must not enter ERROR_TAG_CODES`,
      );
    }
  });

  test("every grading result maps to exactly one canonical outcome", () => {
    for (const code of ERROR_TAG_CODES) {
      const outcome = outcomeForResult(code);
      assert(typeof outcome === "string" && outcome.length > 0, `no outcome for ${code}`);
      assertEqual(outcomeForResult(code), outcome, "mapping must be deterministic");
    }
  });
});

describe("envelope type arms", () => {
  test("the assessed arm carries grading; the non-assessed arm cannot", () => {
    const assessed: AssessedLearningEvent = createLearningEvent({
      ...baseInput,
      assessed: true,
      primitive: "production",
      evidenceCeiling: "controlled_production",
      evidenceClass: "controlled_production",
      result: "correct",
      errorTags: ["correct"],
    }) as AssessedLearningEvent;
    assertEqual(assessed.result, "correct", "assessed keeps its result");

    const nonAssessed: NonAssessedLearningEvent = createLearningEvent({
      ...baseInput,
      assessed: false,
      ...NON_ASSESSED_CONTEXT,
      primitive: "reveal",
      evidenceCeiling: "comparison_only",
      evidenceClass: "comparison_only",
    }) as NonAssessedLearningEvent;
    assertEqual(nonAssessed.result, undefined, "non-assessed has no result field at all");
  });
});
