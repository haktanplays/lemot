/**
 * PR-03 integration: v3 validation, migration chain, treatment resolution,
 * controller context, and the narrow mastery admission gate.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent, makeV1Event, makeV2Event, NO_ASSISTANCE } from "./helpers";
import {
  LEARNING_EVENT_SCHEMA_VERSION,
  isAssessedEvent,
} from "../../content/learning-engine/events";
import type { LearningEvent } from "../../content/learning-engine/events";
import { validateLearningEvent } from "../../content/learning-engine/event-envelope";
import {
  migrateEventLogToCurrent,
  migrateEventToCurrent,
} from "../../content/learning-engine/event-migration";
import { LocalRepository, LM_LE_EVENTS_KEY } from "../../content/learning-engine/repository/local";
import {
  LearningSessionController,
  type AttemptEvidenceContext,
} from "../../content/learning-engine/session-controller";
import {
  createEmptyMasterySnapshot,
  scoreEvent,
} from "../../content/learning-engine/mastery";
import {
  TreatmentResolutionError,
  resolveTargetTreatments,
  resolveTreatmentForItem,
} from "../../content/learning-engine/treatment-resolver";
import type { ExerciseBlueprint, LessonContract } from "../../content/learning-engine/types";

// ── fixtures ────────────────────────────────────────────────────────────────

const contract = {
  id: "l1",
  title: "L1",
  contractSchemaVersion: "1",
  versions: {
    contentVersion: "c",
    lessonVersion: "l",
    itemRegistryVersion: "i",
    errorTaxonomyVersion: null,
    appVersion: null,
  },
  goal: { canDo: "x", notGoal: [] },
  items: {
    activeNew: ["new-a"],
    supported: ["sup-a"],
    recognitionOnly: ["rec-a"],
    recycled: ["old-a"],
  },
  production: {
    allowedProduction: [],
    blockedProduction: [],
    allowedOperations: [],
    blockedOperations: [],
  },
  supportFade: { promptFadeMax: "PF0" },
  answerPolicy: {
    defaultValidationMode: "exact-or-alternative",
    allowAlternatives: true,
    aiMayExplain: false,
    aiMayOverride: false,
  },
  sourceHygiene: {
    origin: "original",
    thirdPartySourceDerived: false,
    disallowedDerivative: false,
    sourceRisk: "none",
    reviewStatus: "passed",
  },
} as unknown as LessonContract;

const context = (over: Partial<AttemptEvidenceContext> = {}): AttemptEvidenceContext => ({
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
  treatmentFor: (id) => resolveTreatmentForItem(id, contract),
  ...over,
});

function makeController(repo: LocalRepository): LearningSessionController {
  let t = 0;
  let n = 0;
  return new LearningSessionController({
    repository: repo,
    sessionId: "s",
    lessonId: "l1",
    contentVersion: "c",
    now: () => (t += 1_000),
    makeClientEventId: () => `evt-${(n += 1)}`,
  });
}

const fill = (targets: string[]): ExerciseBlueprint => ({
  id: "fill-1",
  lessonId: "l1",
  operation: "fill",
  targetItemIds: targets,
  targetText: "x",
});

// ── Part H: treatment resolution ────────────────────────────────────────────

describe("contract → treatment resolution", () => {
  test("every bucket maps to its authored treatment", () => {
    assertEqual(resolveTreatmentForItem("new-a", contract), "active", "activeNew → active");
    assertEqual(resolveTreatmentForItem("old-a", contract), "active", "recycled → active");
    assertEqual(resolveTreatmentForItem("sup-a", contract), "supported", "supported");
    assertEqual(resolveTreatmentForItem("rec-a", contract), "recognition", "recognitionOnly");
  });

  test("a mixed target list stays index-aligned", () => {
    assertEqual(
      resolveTargetTreatments(["sup-a", "new-a", "rec-a"], contract).join(","),
      "supported,active,recognition",
      "order preserved",
    );
  });

  test("an empty target list is valid (bounded context-chain success)", () => {
    assertEqual(resolveTargetTreatments([], contract).length, 0, "no targets, no treatments");
  });

  test("an unknown target fails loudly", () => {
    let caught: unknown = null;
    try {
      resolveTreatmentForItem("nope", contract);
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof TreatmentResolutionError, "unknown ownership must throw");
  });

  test("bucket overlap fails loudly", () => {
    const ambiguous = {
      ...contract,
      items: { ...contract.items, supported: ["sup-a", "new-a"] },
    } as LessonContract;
    let caught: unknown = null;
    try {
      resolveTreatmentForItem("new-a", ambiguous);
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof TreatmentResolutionError, "ambiguous ownership must throw");
  });
});

// ── Part I: controller receives explicit context ────────────────────────────

describe("session controller — explicit attempt context", () => {
  test("no hardcoded PF0 remains in the controller source", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const src = readFileSync(
      join(__dirname, "../../content/learning-engine/session-controller.ts"),
      "utf8",
    );
    const code = src
      .split("\n")
      .filter((l) => !l.trim().startsWith("*") && !l.trim().startsWith("//"))
      .join("\n");
    assert(
      !code.includes('promptLevel: "PF0"'),
      "the controller must not invent a prompt level; the integration layer supplies it",
    );
    assert(
      !code.includes('"legacy_unknown"'),
      "the controller must not stamp legacy_unknown treatments any more",
    );
  });

  test("a normal graded attempt emits learner-attributed, admitted evidence", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    c.recordGradedAttempt({
      exercise: fill(["new-a"]),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: context(),
    });
    await c.flush();
    const e = (await repo.readAllEvents())[0];
    assert(isAssessedEvent(e), "assessed");
    assertEqual(e.schemaVersion, LEARNING_EVENT_SCHEMA_VERSION, "v3");
    assertEqual(e.targetTreatments.join(","), "active", "treatment read from the contract");
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "learner",
      "learner-attributed",
    );
    assertEqual(e.admissibility.status, "admitted", "admitted");
    assertEqual(e.evidenceClass, "controlled_production", "independent claim allowed");
  });

  test("a Supported fixture target emits supported-production evidence", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    c.recordGradedAttempt({
      exercise: fill(["sup-a"]),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: context(),
    });
    await c.flush();
    const e = (await repo.readAllEvents())[0];
    assertEqual(e.targetTreatments.join(","), "supported", "Supported target");
    assertEqual(e.evidenceClass, "supported_production", "capped by treatment");
    assertEqual(e.admissibility.status, "admitted", "still admitted — supported is real evidence");
  });

  test("an injected validator incident emits a quarantined, non-evidentiary event", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    c.recordGradedAttempt({
      exercise: fill(["new-a"]),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "wrong_item", errorTags: ["wrong_item"], normalizedAnswer: "x" },
      context: context({
        opportunity: {
          ...context().opportunity,
          qualityIncident: { source: "validator", reason: "accepted_answer_rejected" },
        },
      }),
    });
    await c.flush();
    const e = (await repo.readAllEvents())[0];
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "validator",
      "validator owns the miss, not the learner",
    );
    assertEqual(e.admissibility.status, "quarantined", "quarantined");
    assertEqual(e.evidenceClass, "no_mastery_evidence", "proves nothing");
  });

  test("missing required support emits a ui_flow quarantine", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    c.recordGradedAttempt({
      exercise: fill(["sup-a"]),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "missing_word", errorTags: ["missing_word"], normalizedAnswer: "x" },
      context: context({
        opportunity: {
          ...context().opportunity,
          requiredConstitutiveSupport: ["visible_tray"],
        },
      }),
    });
    await c.flush();
    const e = (await repo.readAllEvents())[0];
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "ui_flow",
      "the tray was never rendered",
    );
    assertEqual(e.admissibility.status, "quarantined", "quarantined");
  });

  test("a recognition reveal stays non-assessed with no evidence", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const c = makeController(repo);
    c.recordRecognitionReveal({
      exercise: {
        id: "rec-1",
        lessonId: "l1",
        operation: "recognition",
        targetItemIds: ["rec-a"],
        displayAnswer: "hello",
      },
      context: context(),
    });
    await c.flush();
    const e = (await repo.readAllEvents())[0];
    assert(!isAssessedEvent(e), "non-assessed");
    assertEqual(e.attribution.status, "not_applicable", "nothing to attribute");
    assertEqual(e.admissibility.status, "no_evidence", "no evidence");
  });
});

// ── Part K: narrow mastery admission gate ───────────────────────────────────

describe("mastery admission gate", () => {
  const quarantined = () =>
    makeEvent({
      result: "correct",
      clientEventId: "q1",
      evidenceClass: "no_mastery_evidence",
      attribution: { status: "resolved", source: "content" },
      admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
    });

  test("an admitted assessed event still scores exactly as before", () => {
    const s = scoreEvent(createEmptyMasterySnapshot(), makeEvent({ result: "correct" }));
    assertEqual(s.items["item-a"].productionSuccess, 1, "admitted events score");
  });

  test("a legacy-admitted assessed event still scores", () => {
    const s = scoreEvent(
      createEmptyMasterySnapshot(),
      makeEvent({
        result: "correct",
        evidenceClass: "supported_production",
        evidenceCeiling: "supported_production",
        admissibility: { status: "legacy_admitted", sourceVersion: 2 },
      }),
    );
    assertEqual(s.items["item-a"].productionSuccess, 1, "history keeps counting");
  });

  test("a quarantined assessed SUCCESS is a strict no-op", () => {
    const s = scoreEvent(createEmptyMasterySnapshot(), quarantined());
    assertEqual(Object.keys(s.items).length, 0, "no item row — correctness is not admissibility");
    assert(s.processedClientEventIds.includes("q1"), "still marked processed");
  });

  test("a quarantined assessed FAILURE is a strict no-op", () => {
    const e = makeEvent({
      result: "wrong_item",
      clientEventId: "q2",
      evidenceClass: "no_mastery_evidence",
      attribution: { status: "resolved", source: "ui_flow" },
      admissibility: { status: "quarantined", reasons: ["required_support_missing"] },
    });
    const s = scoreEvent(createEmptyMasterySnapshot(), e);
    assertEqual(Object.keys(s.items).length, 0, "a non-learner miss never becomes weakness");
  });

  test("unresolved and no-evidence assessed events are no-ops", () => {
    for (const admissibility of [
      { status: "unresolved" as const, reasons: ["learner_authorship_unresolved" as const] },
      { status: "no_evidence" as const, reasons: ["authored_no_evidence_contract" as const] },
    ]) {
      const s = scoreEvent(
        createEmptyMasterySnapshot(),
        makeEvent({
          result: "correct",
          evidenceClass: "no_mastery_evidence",
          attribution: { status: "unresolved" },
          admissibility,
        }),
      );
      assertEqual(Object.keys(s.items).length, 0, `${admissibility.status} must not score`);
    }
  });

  test("a no-op event replays idempotently", () => {
    const e = quarantined();
    const once = scoreEvent(createEmptyMasterySnapshot(), e);
    const twice = scoreEvent(once, e);
    assertEqual(JSON.stringify(twice), JSON.stringify(once), "stable replay");
  });

  // This test previously asserted that PR-03 had NOT added Supported counters or
  // bumped the snapshot ("PR-04 owns that"). PR-04 has now deliberately done
  // both, so the old expectation is expired rather than violated. What still
  // needs guarding is that PR-04 left PR-03's admission gate alone — the gate is
  // what this describe block is about.
  test("PR-04's scoped counters did not disturb the admission gate", () => {
    const s = scoreEvent(createEmptyMasterySnapshot(), makeEvent({ result: "correct" }));
    assertEqual(s.version, "mastery-v0.3", "PR-04 bumped the snapshot shape");
    assert("production" in s.items["item-a"], "scoped channels are present");

    const blocked = scoreEvent(createEmptyMasterySnapshot(), quarantined());
    assertEqual(
      Object.keys(blocked.items).length,
      0,
      "a quarantined success is still a strict no-op after the routing change",
    );
  });
});

// ── Part G: v2 → v3 migration ───────────────────────────────────────────────

describe("v2 -> v3 migration", () => {
  test("a v2 assessed event reaches valid v3 as legacy-admitted", () => {
    const res = migrateEventToCurrent(makeV2Event());
    assert(res.status === "ok", "must migrate");
    if (res.status !== "ok") return;
    const e = res.event;
    assertEqual(validateLearningEvent(e).join(" | "), "", "valid v3");
    assertEqual(e.schemaVersion, 3, "v3");
    assertEqual(e.admissibility.status, "legacy_admitted", "history preserved");
    assertEqual(
      e.admissibility.status === "legacy_admitted" ? e.admissibility.sourceVersion : 0,
      2,
      "sourceVersion 2",
    );
    assertEqual(e.assistance.capture, "legacy_unknown", "v2 captured no assistance");
  });

  test("a v2 production observation is capped because assistance is legacy-unknown", () => {
    const res = migrateEventToCurrent(makeV2Event({ evidenceClass: "controlled_production" }));
    assert(res.status === "ok", "must migrate");
    if (res.status !== "ok") return;
    assertEqual(res.event.evidenceClass, "supported_production", "capped, never independent");
  });

  test("a v2 recognition event stays recognition", () => {
    const res = migrateEventToCurrent(
      makeV2Event({
        operation: "build",
        primitive: "selection",
        evidenceCeiling: "recognition",
        evidenceClass: "recognition",
      }),
    );
    assert(res.status === "ok", "must migrate");
    if (res.status !== "ok") return;
    assertEqual(res.event.evidenceClass, "recognition", "recognition is not reclassified");
  });

  test("a v2 non-assessed event becomes not-applicable / no-evidence", () => {
    const res = migrateEventToCurrent(makeV2Event({ assessed: false }));
    assert(res.status === "ok", "must migrate");
    if (res.status !== "ok") return;
    assertEqual(res.event.attribution.status, "not_applicable", "nothing graded");
    assertEqual(res.event.admissibility.status, "no_evidence", "no evidence");
  });

  test("a malformed v2 event fails closed", () => {
    for (const bad of [
      makeV2Event({ assistance: "captured" }),
      makeV2Event({ primitive: "telepathy" }),
      makeV2Event({ targetTreatments: [] }),
    ]) {
      assertEqual(
        migrateEventToCurrent(bad).status,
        "unsupported",
        "malformed v2 must not be accepted",
      );
    }
  });

  test("a malformed v3 event fails closed", () => {
    const bad = { ...JSON.parse(JSON.stringify(makeEvent({ result: "correct" }))), assistance: "known" };
    assertEqual(migrateEventToCurrent(bad).status, "unsupported", "malformed v3 rejected");
  });

  test("a future v4 event fails closed", () => {
    const future = { ...JSON.parse(JSON.stringify(makeEvent({ result: "correct" }))), schemaVersion: 4 };
    assertEqual(migrateEventToCurrent(future).status, "unsupported", "future version rejected");
  });

  test("migration does not mutate its input", () => {
    const v2 = makeV2Event();
    const before = JSON.stringify(v2);
    migrateEventToCurrent(v2);
    assertEqual(JSON.stringify(v2), before, "input untouched");
  });

  test("a mixed v1/v2/v3 log preserves append order and normalizes to v3", () => {
    const log = [
      makeV1Event({ result: "correct", clientEventId: "one" }),
      makeV2Event({ clientEventId: "two" }),
      JSON.parse(JSON.stringify(makeEvent({ result: "correct", clientEventId: "three" }))),
    ];
    const res = migrateEventLogToCurrent(log);
    assert(res.status === "ok", "mixed log reads");
    if (res.status !== "ok") return;
    assertEqual(res.events.map((e) => e.clientEventId).join(","), "one,two,three", "order kept");
    assert(
      res.events.every((e: LearningEvent) => e.schemaVersion === 3),
      "all v3 after read",
    );
  });
});

describe("repository normalization at v3", () => {
  test("read leaves bytes unchanged; the first valid append normalizes to all-v3", async () => {
    const raw = JSON.stringify([makeV2Event({ clientEventId: "old" })]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);
    await repo.readAllEvents();
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), raw, "read must not rewrite");

    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "new" }));
    const stored = JSON.parse(kv.map.get(LM_LE_EVENTS_KEY) as string) as { schemaVersion: number }[];
    assertEqual(stored.length, 2, "both events");
    assert(stored.every((e) => e.schemaVersion === 3), "normalized to v3");
  });

  test("privacy: no free-form text field was added to persisted events", () => {
    const json = JSON.stringify(makeEvent({ result: "correct" }));
    for (const forbidden of ["incidentText", "diagnostic", "description", "transcript"]) {
      assert(!json.includes(forbidden), `no "${forbidden}" field may be persisted`);
    }
  });
});
