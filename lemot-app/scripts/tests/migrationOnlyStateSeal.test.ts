/**
 * PR-03 correction: migration-only event states are sealed, and v1 provenance
 * survives the v1 → v2 → v3 chain.
 *
 * Two integrity holes are pinned here.
 *
 * A. `createLearningEvent` — the ordinary application boundary — used to accept
 *    `admissibility: { status: "legacy_admitted" }` and a reveal `legacyGrading`.
 *    Because the mastery reducer treats `admitted` and `legacy_admitted` alike, a
 *    future live caller could have scored an attempt without ever passing through
 *    `resolveEvidenceAdmission`, bypassing the whole attribution layer with one
 *    object literal. Those states now belong to `createMigratedLearningEvent`.
 *
 * B. `migrateV2EventToV3` always stamped `sourceVersion: 2`, so an event
 *    PERSISTED as v1 also claimed v2 origin. The type promised the two eras were
 *    distinguishable; the implementation had already thrown that away.
 *
 * The two questions stay separate throughout: `validateLearningEvent` asks "is
 * this a well-formed v3 event?" (persisted history must keep passing), while the
 * live constructor additionally asks "may this be authored right now?".
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent, makeV1Event, makeV2Event, NO_ASSISTANCE } from "./helpers";
import type { LearningEvent } from "../../content/learning-engine/events";
import {
  ERROR_TAG_CODES,
  EVIDENCE_CLASSES,
  LEARNING_EVENT_SCHEMA_VERSION,
  isAssessedEvent,
} from "../../content/learning-engine/events";
import {
  InvalidLearningEventError,
  MigrationOnlyEventStateError,
  createLearningEvent,
  createMigratedLearningEvent,
  validateLearningEvent,
} from "../../content/learning-engine/event-envelope";
import {
  ASSISTANCE_CAPTURES,
  ATTRIBUTION_SOURCES,
  LEGACY_UNKNOWN_ASSISTANCE,
} from "../../content/learning-engine/evidence-context";
import {
  migrateEventLogToCurrent,
  migrateEventToCurrent,
} from "../../content/learning-engine/event-migration";
import {
  LM_LE_EVENTS_KEY,
  LocalRepository,
} from "../../content/learning-engine/repository/local";
import {
  LearningSessionController,
  type AttemptEvidenceContext,
} from "../../content/learning-engine/session-controller";
import { MASTERY_SNAPSHOT_VERSION } from "../../content/learning-engine/mastery";
import type { ExerciseBlueprint } from "../../content/learning-engine/types";

// ── fixtures ────────────────────────────────────────────────────────────────

const SYNC = { status: "pending" as const, origin: "local" as const, queuedAt: 1_000 };

/** A complete, ordinary live attempt. Every case below varies one thing from it. */
const liveBase = {
  clientEventId: "evt-live",
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
  primitive: "production" as const,
  targetTreatments: ["active" as const],
  evidenceCeiling: "controlled_production" as const,
  evidenceClass: "controlled_production" as const,
  assistance: NO_ASSISTANCE,
  attribution: { status: "resolved", source: "learner" } as const,
  admissibility: { status: "admitted" } as const,
  assessed: true as const,
  result: "correct" as const,
  errorTags: ["correct"] as const,
};

/** A legitimate migrated reveal: everything Part D requires, all at once. */
const migratedRevealInput = {
  ...liveBase,
  clientEventId: "evt-migrated-reveal",
  operation: "recognition" as const,
  primitive: "reveal" as const,
  evidenceCeiling: "comparison_only" as const,
  evidenceClass: "comparison_only" as const,
  assistance: LEGACY_UNKNOWN_ASSISTANCE,
  assessed: false as const,
  result: undefined,
  errorTags: undefined,
  outcome: "completed_unassessed" as const,
  attribution: { status: "not_applicable" } as const,
  admissibility: {
    status: "no_evidence" as const,
    reasons: ["non_assessed_interaction" as const],
  },
  legacyGrading: { result: "correct" as const, errorTags: ["correct" as const] },
};

function expectThrows(fn: () => unknown, what: string): Error {
  let caught: unknown = null;
  try {
    fn();
  } catch (e) {
    caught = e;
  }
  assert(caught instanceof Error, `expected ${what} to throw`);
  return caught as Error;
}

/** The migration-only states, reached the only way a live caller could: a cast. */
const forgedLegacyAdmitted = (sourceVersion: 1 | 2): Parameters<typeof createLearningEvent>[0] =>
  ({
    ...liveBase,
    admissibility: { status: "legacy_admitted", sourceVersion },
  }) as unknown as Parameters<typeof createLearningEvent>[0];

// ── live construction ───────────────────────────────────────────────────────

describe("live construction — the ordinary boundary", () => {
  test("an admitted live event still succeeds", () => {
    const e = createLearningEvent(liveBase);
    assertEqual(e.admissibility.status, "admitted", "normal path untouched");
    assertEqual(e.schemaVersion, LEARNING_EVENT_SCHEMA_VERSION, "current version");
    assertEqual(validateLearningEvent(e).join(" | "), "", "structurally valid");
  });

  test("a quarantined live event succeeds and carries no mastery evidence", () => {
    const e = createLearningEvent({
      ...liveBase,
      clientEventId: "evt-q",
      evidenceClass: "no_mastery_evidence",
      attribution: { status: "resolved", source: "content" },
      admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
    });
    assertEqual(e.admissibility.status, "quarantined", "quarantine is a LIVE state");
    assertEqual(e.evidenceClass, "no_mastery_evidence", "correctness is not admissibility");
  });

  test("the live constructor rejects legacy_admitted sourceVersion 1", () => {
    const err = expectThrows(
      () => createLearningEvent(forgedLegacyAdmitted(1)),
      "live legacy_admitted (v1)",
    );
    assert(err instanceof MigrationOnlyEventStateError, "must be the migration-only error");
    assert(
      err.message.includes("legacy_admitted"),
      "the message must name the state that was refused",
    );
  });

  test("the live constructor rejects legacy_admitted sourceVersion 2", () => {
    const err = expectThrows(
      () => createLearningEvent(forgedLegacyAdmitted(2)),
      "live legacy_admitted (v2)",
    );
    assert(err instanceof MigrationOnlyEventStateError, "must be the migration-only error");
  });

  test("the live constructor rejects legacyGrading", () => {
    const err = expectThrows(
      () =>
        createLearningEvent(
          migratedRevealInput as unknown as Parameters<typeof createLearningEvent>[0],
        ),
      "live legacyGrading",
    );
    assert(err instanceof MigrationOnlyEventStateError, "must be the migration-only error");
    assert(err.message.includes("legacyGrading"), "the message must name legacyGrading");
  });

  test("a migration-only refusal is still an InvalidLearningEventError for existing handlers", () => {
    const err = expectThrows(() => createLearningEvent(forgedLegacyAdmitted(1)), "refusal");
    assert(
      err instanceof InvalidLearningEventError,
      "subclassing keeps existing instanceof handling working",
    );
  });

  test("rejection happens before anything could be persisted", async () => {
    const clean = JSON.stringify([makeEvent({ result: "correct", clientEventId: "kept" })]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: clean });
    const repo = new LocalRepository(kv);

    // Construction throws SYNCHRONOUSLY, so `appendEvent` is never even called:
    // there is no event object in existence to hand to storage. `reached` proves
    // that, rather than relying on the log looking unchanged afterwards.
    let reached = false;
    expectThrows(() => {
      const forged = createLearningEvent(forgedLegacyAdmitted(1));
      reached = true;
      return repo.appendEvent(forged);
    }, "construction on the way to an append");
    assert(!reached, "the append call must be unreachable once construction throws");

    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), clean, "a clean log must be byte-identical");
    assertEqual((await repo.readAllEvents()).length, 1, "still exactly the one original event");
  });
});

// ── migration construction ──────────────────────────────────────────────────

describe("migration construction — historical rehydration only", () => {
  test("it accepts a valid legacy_admitted assessed event", () => {
    const e = createMigratedLearningEvent({
      ...liveBase,
      evidenceClass: "supported_production",
      evidenceCeiling: "supported_production",
      assistance: LEGACY_UNKNOWN_ASSISTANCE,
      admissibility: { status: "legacy_admitted", sourceVersion: 1 },
    });
    assertEqual(e.admissibility.status, "legacy_admitted", "historical admission preserved");
    assertEqual(
      e.admissibility.status === "legacy_admitted" ? e.admissibility.sourceVersion : 0,
      1,
      "the origin it was handed",
    );
  });

  test("it accepts a legitimate reveal legacyGrading", () => {
    const e = createMigratedLearningEvent(migratedRevealInput);
    assert(!isAssessedEvent(e), "a reveal was never graded");
    assertEqual(
      (e as { legacyGrading?: { result: string } }).legacyGrading?.result,
      "correct",
      "the fabricated v1 grading is preserved verbatim, not destroyed",
    );
  });

  test("it still rejects malformed legacy state — it is not a weaker constructor", () => {
    // legacy_admitted on a NON-assessed event: nothing was graded, so there is no
    // historical admission to preserve. Structural validation still runs.
    const err = expectThrows(
      () =>
        createMigratedLearningEvent({
          ...migratedRevealInput,
          admissibility: { status: "legacy_admitted", sourceVersion: 1 },
        } as unknown as Parameters<typeof createMigratedLearningEvent>[0]),
      "legacy_admitted on a non-assessed event",
    );
    assert(err instanceof InvalidLearningEventError, "structural validation still applies");
  });

  test("a legacyGrading reveal must agree with the rest of its state (Part D)", () => {
    const incoherent: [string, Record<string, unknown>][] = [
      ["known assistance", { assistance: NO_ASSISTANCE }],
      ["learner attribution", { attribution: { status: "resolved", source: "learner" } }],
      ["admitted", { admissibility: { status: "admitted" } }],
      [
        "wrong no-evidence reason",
        {
          admissibility: {
            status: "no_evidence",
            reasons: ["authored_no_evidence_contract"],
          },
        },
      ],
      ["a non-reveal primitive", { primitive: "exposure", evidenceClass: "exposure", evidenceCeiling: "exposure" }],
    ];
    for (const [label, over] of incoherent) {
      expectThrows(
        () =>
          createMigratedLearningEvent({
            ...migratedRevealInput,
            ...over,
          } as unknown as Parameters<typeof createMigratedLearningEvent>[0]),
        `legacyGrading with ${label}`,
      );
    }
  });

  test("migrated structures are deeply immutable and own their copies", () => {
    const tags = ["correct"] as const;
    const items = ["a", "b"];
    const device = { platform: "test" };
    const e = createMigratedLearningEvent({
      ...migratedRevealInput,
      itemIds: items,
      targetTreatments: ["legacy_unknown", "legacy_unknown"],
      deviceInfo: device,
      legacyGrading: { result: "correct", errorTags: tags },
    });

    assert(Object.isFrozen(e), "event frozen");
    assert(Object.isFrozen(e.itemIds), "itemIds frozen");
    assert(Object.isFrozen(e.targetTreatments), "targetTreatments frozen");
    assert(Object.isFrozen(e.deviceInfo), "deviceInfo frozen");
    assert(Object.isFrozen(e.sync), "sync frozen");
    assert(Object.isFrozen(e.assistance), "assistance frozen");
    assert(Object.isFrozen(e.admissibility), "admissibility frozen");
    const lg = (e as { legacyGrading?: { errorTags: readonly string[] } }).legacyGrading;
    assert(lg !== undefined && Object.isFrozen(lg), "legacyGrading frozen");
    assert(Object.isFrozen(lg?.errorTags), "legacyGrading.errorTags frozen");
  });

  test("caller mutation after construction cannot reach migrated state", () => {
    const items = ["a", "b"];
    const device = { platform: "test" };
    const e = createMigratedLearningEvent({
      ...migratedRevealInput,
      itemIds: items,
      targetTreatments: ["legacy_unknown", "legacy_unknown"],
      deviceInfo: device,
    });
    items.push("c");
    device.platform = "hacked";
    assertEqual(e.itemIds.length, 2, "the event kept its own itemIds copy");
    assertEqual(e.deviceInfo.platform, "test", "the event kept its own deviceInfo copy");
  });
});

// ── provenance ──────────────────────────────────────────────────────────────

const sourceVersionOf = (e: LearningEvent): number =>
  e.admissibility.status === "legacy_admitted" ? e.admissibility.sourceVersion : 0;

describe("original source version survives the chain", () => {
  test("a raw v1 assessed event reaches v3 as sourceVersion 1", () => {
    const res = migrateEventToCurrent(makeV1Event({ result: "correct" }));
    assert(res.status === "ok", "must migrate");
    if (res.status !== "ok") return;
    assertEqual(res.event.admissibility.status, "legacy_admitted", "history keeps counting");
    assertEqual(sourceVersionOf(res.event), 1, "persisted as v1, so origin is v1");
  });

  test("a raw v2 assessed event reaches v3 as sourceVersion 2", () => {
    const res = migrateEventToCurrent(makeV2Event());
    assert(res.status === "ok", "must migrate");
    if (res.status !== "ok") return;
    assertEqual(sourceVersionOf(res.event), 2, "persisted as v2, so origin is v2");
  });

  test("a raw v1 reveal stays non-assessed and carries its own provenance", () => {
    // The exact pre-PR-02 reveal signature: recognition, no answers, fabricated
    // `result: "correct"`.
    const res = migrateEventToCurrent(
      makeV1Event({
        result: "correct",
        operation: "recognition",
        userAnswer: null,
        normalizedAnswer: null,
      }),
    );
    assert(res.status === "ok", "must migrate");
    if (res.status !== "ok") return;
    const e = res.event;
    assert(!isAssessedEvent(e), "a reveal was never graded");
    assertEqual(e.admissibility.status, "no_evidence", "no evidence, so no legacy admission");
    assertEqual(e.assistance.capture, "legacy_unknown", "v1 recorded no assistance");
    assertEqual(
      (e as { legacyGrading?: { result: string } }).legacyGrading?.result,
      "correct",
      "the fabricated grading is preserved for recovery",
    );
  });

  test("a mixed v1/v2/v3 log preserves the right origin per event", () => {
    const v3 = makeEvent({ result: "correct", clientEventId: "c-v3" });
    const res = migrateEventLogToCurrent([
      makeV1Event({ result: "correct", clientEventId: "a-v1" }),
      makeV2Event({ clientEventId: "b-v2" }),
      v3,
    ]);
    assert(res.status === "ok", "log migrates");
    if (res.status !== "ok") return;

    assertEqual(
      res.events.map((e) => e.clientEventId).join(","),
      "a-v1,b-v2,c-v3",
      "append order is never reordered",
    );
    assertEqual(sourceVersionOf(res.events[0]), 1, "the v1 event keeps v1 origin");
    assertEqual(sourceVersionOf(res.events[1]), 2, "the v2 event keeps v2 origin");
    assertEqual(
      res.events[2].admissibility.status,
      "admitted",
      "a native v3 event is not retro-labelled as legacy",
    );
  });

  test("a valid v3 event is returned unchanged, never re-migrated", () => {
    const v3 = makeEvent({ result: "correct", clientEventId: "native" });
    const res = migrateEventToCurrent(v3);
    assert(res.status === "ok", "accepted");
    if (res.status !== "ok") return;
    assert(!res.migrated, "no migration ran");
    assertEqual(JSON.stringify(res.event), JSON.stringify(v3), "byte-identical");
  });
});

describe("repository behaviour across the provenance fix", () => {
  test("reading a mixed log does not rewrite storage", async () => {
    const raw = JSON.stringify([
      makeV1Event({ result: "correct", clientEventId: "a-v1" }),
      makeV2Event({ clientEventId: "b-v2" }),
    ]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);
    const events = await repo.readAllEvents();
    assertEqual(sourceVersionOf(events[0]), 1, "v1 origin in memory");
    assertEqual(sourceVersionOf(events[1]), 2, "v2 origin in memory");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), raw, "storage untouched by a read");
  });

  test("the first valid append normalizes to an all-v3 log with origins intact", async () => {
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: JSON.stringify([
        makeV1Event({ result: "correct", clientEventId: "a-v1" }),
        makeV2Event({ clientEventId: "b-v2" }),
      ]),
    });
    const repo = new LocalRepository(kv);
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "c-new" }));

    const stored = JSON.parse(kv.map.get(LM_LE_EVENTS_KEY) as string) as LearningEvent[];
    assertEqual(stored.length, 3, "nothing dropped");
    assertEqual(
      stored.map((e) => e.clientEventId).join(","),
      "a-v1,b-v2,c-new",
      "append order preserved through normalization",
    );
    assert(
      stored.every((e) => e.schemaVersion === LEARNING_EVENT_SCHEMA_VERSION),
      "normalized to all-v3",
    );
    assertEqual(sourceVersionOf(stored[0]), 1, "v1 origin persisted, not flattened to 2");
    assertEqual(sourceVersionOf(stored[1]), 2, "v2 origin persisted");
  });

  test("a persisted migrated event stays readable — validation must not reject history", async () => {
    const migrated = migrateEventToCurrent(makeV1Event({ result: "correct" }));
    assert(migrated.status === "ok", "migrates");
    if (migrated.status !== "ok") return;
    assertEqual(
      validateLearningEvent(migrated.event).join(" | "),
      "",
      "legacy_admitted is STRUCTURALLY valid even though it may not be authored live",
    );

    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: JSON.stringify([migrated.event]) });
    const read = await new LocalRepository(kv).readAllEvents();
    assertEqual(read.length, 1, "history remains readable");
    assertEqual(sourceVersionOf(read[0]), 1, "and keeps its origin on the round trip");
  });

  test("a forged event with incoherent migration state is refused at the append boundary", async () => {
    // A reveal that keeps `legacyGrading` but claims known assistance and learner
    // attribution: that combination cannot have come from history. It reaches the
    // repository only through a cast, which is exactly why the durable boundary
    // validates rather than trusting types.
    const forged = {
      ...makeEvent({ result: "correct", clientEventId: "forged" }),
      assessed: false,
      result: undefined,
      errorTags: undefined,
      normalizedAnswer: undefined,
      outcome: "completed_unassessed",
      primitive: "reveal",
      evidenceCeiling: "comparison_only",
      evidenceClass: "comparison_only",
      attribution: { status: "resolved", source: "learner" },
      admissibility: { status: "no_evidence", reasons: ["non_assessed_interaction"] },
      legacyGrading: { result: "correct", errorTags: ["correct"] },
    } as unknown as LearningEvent;

    const clean = JSON.stringify([makeEvent({ result: "correct", clientEventId: "kept" })]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: clean });
    const repo = new LocalRepository(kv);

    let caught: unknown = null;
    try {
      await repo.appendEvent(forged);
    } catch (e) {
      caught = e;
    }
    assert(caught instanceof InvalidLearningEventError, "the append must be refused");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), clean, "a refused append destroys nothing");
  });
});

// ── the live emitters ───────────────────────────────────────────────────────

describe("live emitters never produce migration-only state", () => {
  const controllerContext = (): AttemptEvidenceContext => ({
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
  });

  const fill = (): ExerciseBlueprint => ({
    id: "fill-1",
    lessonId: "l1",
    operation: "fill",
    targetItemIds: ["chunk-bonjour"],
    targetText: "x",
  });

  test("the session controller emits no legacy_admitted and no legacyGrading", async () => {
    const repo = new LocalRepository(makeFakeKv());
    let t = 0;
    let n = 0;
    const c = new LearningSessionController({
      repository: repo,
      sessionId: "s",
      lessonId: "l1",
      contentVersion: "c",
      now: () => (t += 1_000),
      makeClientEventId: () => `evt-${(n += 1)}`,
    });
    c.recordGradedAttempt({
      exercise: fill(),
      userAnswer: "x",
      expectedAnswer: "x",
      gradeResult: { result: "correct", errorTags: ["correct"], normalizedAnswer: "x" },
      context: controllerContext(),
    });
    c.recordRecognitionReveal({
      exercise: {
        id: "rec-1",
        lessonId: "l1",
        operation: "recognition",
        targetItemIds: ["chunk-bonjour"],
        displayAnswer: "hello",
      },
      context: controllerContext(),
    });
    await c.flush();

    for (const e of await repo.readAllEvents()) {
      assert(
        e.admissibility.status !== "legacy_admitted",
        "the controller must resolve admission, never assert historical admission",
      );
      assertEqual(
        (e as { legacyGrading?: unknown }).legacyGrading,
        undefined,
        "a live event has no historical grading to preserve",
      );
    }
  });

  test("only event-migration.ts reaches for the migration constructor", async () => {
    // The hook is React code and cannot run in this harness, so the fixture
    // surface is checked at the SOURCE level — together with every other
    // non-test module, which is the guarantee that actually matters.
    const { readFileSync, readdirSync } = await import("node:fs");
    const { join, relative } = await import("node:path");
    const root = process.cwd();

    const walk = (dir: string, out: string[] = []): string[] => {
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === "node_modules" || entry.name === "tests") continue;
          walk(full, out);
        } else if (/\.tsx?$/.test(entry.name)) {
          out.push(full);
        }
      }
      return out;
    };

    const files = ["app", "components", "content", "hooks", "lib", "providers", "scripts"]
      .flatMap((d) => {
        try {
          return walk(join(root, d));
        } catch {
          return [];
        }
      })
      .filter((f) => !f.endsWith(".test.ts") && !f.endsWith(".test.tsx"));
    assert(files.length > 50, "the scan must actually have found the source tree");

    const callers = files
      .filter((f) => readFileSync(f, "utf8").includes("createMigratedLearningEvent"))
      .map((f) => relative(root, f))
      .sort();

    assertEqual(
      callers.join(", "),
      "content/learning-engine/event-envelope.ts, content/learning-engine/event-migration.ts",
      "only the module that defines it and the migration that needs it may name it",
    );
  });

  test("no non-test module authors migration-only state directly", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const root = process.cwd();
    const stripComments = (src: string): string =>
      src
        .split("\n")
        .filter((l) => !l.trim().startsWith("*") && !l.trim().startsWith("//"))
        .join("\n");

    for (const rel of [
      "content/learning-engine/session-controller.ts",
      "components/learning-engine/useLearningEngineSession.ts",
    ]) {
      const code = stripComments(readFileSync(join(root, rel), "utf8"));
      assert(!code.includes("legacy_admitted"), `${rel} must not stamp legacy_admitted`);
      assert(!code.includes("legacyGrading"), `${rel} must not stamp legacyGrading`);
      assert(
        !code.includes("createMigratedLearningEvent"),
        `${rel} must use the ordinary constructor`,
      );
    }
  });
});

// ── frozen authority ────────────────────────────────────────────────────────

describe("frozen authority is untouched by this correction", () => {
  test("the schema version stays 3", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "no version bump — this is a seal, not a shape change");
  });

  test("attribution sources remain exactly the Canonical eight", () => {
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "eight sources");
    assertEqual(
      [...ATTRIBUTION_SOURCES].join(","),
      "learner,content,validator,ui_flow,tone,ai_generator,system,mastery_mapping",
      "Bible §7, unchanged",
    );
  });

  test("assistance and evidence vocabularies are unchanged", () => {
    assertEqual(
      [...ASSISTANCE_CAPTURES].join(","),
      "known,unknown,legacy_unknown",
      "assistance capture vocabulary",
    );
    assertEqual(EVIDENCE_CLASSES.length, 11, "evidence classes unchanged");
  });

  // "Frozen" here is YASA 3's manifest sense — a closed sixteen-member taxonomy
  // pinned by `shippedErrorTags.test.ts` and by the compile-time exhaustiveness
  // lock in events.ts. It is not `Object.freeze`d at runtime, and this
  // correction does not change that either way.
  test("ERROR_TAG_CODES stays at the frozen sixteen (YASA 3)", () => {
    assertEqual(ERROR_TAG_CODES.length, 16, "the frozen taxonomy");
    assertEqual(ERROR_TAG_CODES[0], "correct", "first member unchanged");
    assertEqual(ERROR_TAG_CODES[15], "empty_or_skip", "last member unchanged");
  });

  test("the mastery snapshot version is unchanged and no weight was added", () => {
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.2", "PR-04 owns the snapshot shape");
  });
});
