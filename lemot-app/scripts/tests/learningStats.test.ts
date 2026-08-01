/**
 * PR-10 — Learner-safe Stats projection from the learning spine.
 *
 * The claim under test: one pure deterministic selector turns the validated
 * `LearningEvent` history into a small honest summary — activity distinguished
 * from ownership, Supported distinguished from independent without judgment,
 * assistance counted neutrally — while telemetry, legacy Stats stores and raw
 * learner data stay completely outside (D-3 boundary).
 *
 * HONEST SCOPE NOTE. As throughout this repo, there is no React component test
 * renderer (none was added for this PR). The selector, runtime read, telemetry
 * independence, reset behavior and settlement ordering are tested
 * BEHAVIOURALLY; the route, summary component and completion-view wiring are
 * verified at the SOURCE level only, and those tests say so.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent, makeNonAssessedEvent } from "./helpers";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ERROR_TAG_CODES,
  LEARNING_EVENT_SCHEMA_VERSION,
  type AssistanceSnapshot,
  type LearningEvent,
} from "../../content/learning-engine/events";
import { ATTRIBUTION_SOURCES } from "../../content/learning-engine/evidence-context";
import {
  MASTERY_SNAPSHOT_VERSION,
  scoreEvents,
} from "../../content/learning-engine/mastery";
import { COMPACTION_SNAPSHOT_VERSION } from "../../content/learning-engine/compaction";
import {
  LM_LE_TELEMETRY_KEY,
  TELEMETRY_SCHEMA_VERSION,
} from "../../content/learning-engine/telemetry";
import {
  LM_LE_EVENTS_KEY,
  LocalRepository,
} from "../../content/learning-engine/repository/local";
import {
  createLearningEngineRuntime,
  createLearningRuntimeOwner,
  type LearningEngineRuntime,
} from "../../content/learning-engine/runtime";
import type {
  EventSurfaceResolver,
  LearningSessionController,
} from "../../content/learning-engine/session-controller";
import type { LearningRepository } from "../../content/learning-engine/repository/types";
import {
  choiceInteraction,
  openAttemptInteraction,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import {
  LEARNING_STATS_VERSION,
  selectLearningStats,
  type LearningStatsProjection,
} from "../../content/learning-engine/learning-stats";
import { LEARNING_STATS_COPY } from "../../components/learning-stats/learningStatsCopy";
import { createSettledNavigationGate } from "../../components/lesson-v1/settledNavigation";
import { V1_LESSONS } from "../../content/lessons/v1";
import type {
  FillWithTrapsScreen,
  Lesson,
  SayItYourWayScreen,
  WeaveScreen,
} from "../../content/lessonTypes";

const APP_ROOT = process.cwd();
const read = (rel: string): string => readFileSync(join(APP_ROOT, rel), "utf8");
const codeOf = (src: string): string =>
  src
    .split("\n")
    .filter(
      (l) =>
        !l.trim().startsWith("*") && !l.trim().startsWith("//") && !l.trim().startsWith("/*"),
    )
    .join("\n");

const NOW = 1_800_000_000_000;
const lesson001 = V1_LESSONS.find((l) => l.id === "v1-lesson-001") as Lesson;
const fillScreen = lesson001.screens.find(
  (s) => s.id === "s03-fill-polite-verb",
) as FillWithTrapsScreen;
const sayItScreen = lesson001.screens.find(
  (s) => s.type === "say-it-your-way",
) as SayItYourWayScreen;

/**
 * Single-item synthetic weaves (same honest pattern as PR-06/PR-09): no shipped
 * screen declares a constitutive package yet (PR-07-gated), and the shipped
 * weave targets three items at once, so single-item proofs use synthetic
 * payloads over the REAL canonical item — runtime, controller, reducer and
 * selector all real.
 */
const independentWeave: WeaveScreen = {
  id: "syn-independent-cafe",
  type: "weave",
  targetItemIds: ["noun-cafe"],
  payload: {
    weaveType: "supported",
    prompt: "Write it in French: a coffee",
    suggestedPieces: [],
    expectedAnswers: ["un café"],
    reveal: { modelAnswer: "un café" },
  },
};
const supportedWeave: WeaveScreen = {
  id: "syn-supported-cafe",
  type: "weave",
  targetItemIds: ["noun-cafe"],
  payload: {
    weaveType: "supported",
    prompt: "Write it in French: a coffee",
    suggestedPieces: [
      { text: "un café", itemId: "noun-cafe", supportRole: "constitutive" },
    ],
    expectedAnswers: ["un café"],
    reveal: { modelAnswer: "un café" },
  },
};
const statsLesson: Lesson = {
  ...lesson001,
  screens: [...lesson001.screens, independentWeave, supportedWeave],
};

const LESSON_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "lesson_path",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});
const HUB_SURFACE: EventSurfaceResolver = (exercise) => ({
  placement: "practice_hub",
  evId: null,
  payloadId: exercise.id,
  sentenceId: null,
  sequence: null,
});

function runtimeWith(repo: LearningRepository): LearningEngineRuntime {
  return createLearningEngineRuntime({
    repository: repo,
    appBuild: "test",
    deviceInfo: { platform: "test" },
    makeSessionId: () => `sess-${Math.random().toString(36).slice(2, 8)}`,
  });
}

function controllerOn(
  runtime: LearningEngineRuntime,
  surface: EventSurfaceResolver = LESSON_SURFACE,
): LearningSessionController {
  let t = 0;
  let n = 0;
  return runtime.createSessionController({
    lessonId: statsLesson.id,
    contentVersion: statsLesson.version,
    resolveEventSurface: surface,
    now: () => NOW + (t += 1_000),
    makeClientEventId: () => `evt-st-${surface === HUB_SURFACE ? "hub" : "lp"}-${(n += 1)}`,
  });
}

function session(kv = makeFakeKv()) {
  const runtime = runtimeWith(new LocalRepository(kv));
  return { kv, runtime, controller: controllerOn(runtime) };
}

const independentAttempt = (c: LearningSessionController) =>
  c.recordGradedAttempt(
    typedAttemptInteraction(statsLesson, independentWeave, {
      text: "un café",
      hintRung: 0,
      constitutiveSupportRendered: false,
    }),
  );
const supportedAttempt = (c: LearningSessionController) =>
  c.recordGradedAttempt(
    typedAttemptInteraction(statsLesson, supportedWeave, {
      text: "un café",
      hintRung: 0,
      constitutiveSupportRendered: true,
    }),
  );
const missedChoice = (c: LearningSessionController) =>
  c.recordGradedAttempt(
    choiceInteraction(statsLesson, fillScreen, { optionId: "opt-suis" }),
  );

const knownAssistance = (over: {
  hintRung?: 0 | 1 | 2;
  accessibility?: { replayCount: number; slowPlayback: boolean };
}): AssistanceSnapshot => ({
  capture: "known",
  constitutive: [],
  hintRung: over.hintRung ?? 0,
  retryIndex: 0,
  selfCorrection: false,
  priorAnswerExposure: "none",
  accessibility: over.accessibility ?? { replayCount: 0, slowPlayback: false },
});

/** The pinned learner-safe field list — the WHOLE output surface. */
const EXPECTED_FIELDS = [
  "crossSurfacePieces",
  "hasActivity",
  "hintMoments",
  "independentPieces",
  "independentPracticeMoments",
  "openAttempts",
  "piecesPracticed",
  "practiceHubMoments",
  "practiceMoments",
  "readyToRevisitPieces",
  "recognitionMoments",
  "recognitionPieces",
  "replayCount",
  "slowPlaybackMoments",
  "supportedPieces",
  "supportedPracticeMoments",
  "version",
];

// ── Part A/B: pure selector shape and determinism ───────────────────────────

describe("learning stats — pure selector shape", () => {
  test("empty history → all zeros, no activity, pinned version", () => {
    const s = selectLearningStats([]);
    assertEqual(s.version, LEARNING_STATS_VERSION, "version pin");
    assertEqual(s.hasActivity, false, "no manufactured activity");
    for (const key of EXPECTED_FIELDS) {
      if (key === "version" || key === "hasActivity") continue;
      assertEqual(
        (s as unknown as Record<string, number>)[key],
        0,
        `${key} starts at zero`,
      );
    }
  });

  test("the exact output field list is pinned — nothing more, nothing less", () => {
    const s = selectLearningStats([makeEvent({ result: "correct" })]);
    assertEqual(
      Object.keys(s).sort().join(","),
      EXPECTED_FIELDS.join(","),
      "the whole learner-safe surface",
    );
  });

  test("output carries only counts — no arrays, ids, text or timestamps", () => {
    const s = selectLearningStats([
      makeEvent({ result: "correct", userAnswer: "un café secret" }),
    ]);
    for (const [key, value] of Object.entries(s)) {
      if (key === "version") {
        assertEqual(value, LEARNING_STATS_VERSION, "version is the only string");
      } else if (key === "hasActivity") {
        assertEqual(typeof value, "boolean", "hasActivity is the only boolean");
      } else {
        assertEqual(typeof value, "number", `${key} is a plain count`);
      }
    }
    assert(!JSON.stringify(s).includes("un café secret"), "no learner text leaks");
  });

  test("the output is frozen — downstream mutation is loud, not silent", () => {
    const s = selectLearningStats([]);
    assert(Object.isFrozen(s), "projection is frozen");
  });

  test("deterministic replay; input list and events are not mutated", () => {
    const events = [
      makeEvent({ result: "correct", evidenceClass: "recall" }),
      makeNonAssessedEvent({ primitive: "exposure" }),
    ];
    const before = JSON.stringify(events);
    const one = JSON.stringify(selectLearningStats(events));
    const two = JSON.stringify(selectLearningStats(events));
    assertEqual(one, two, "same history → same projection");
    assertEqual(JSON.stringify(events), before, "no input mutation");
  });

  test("a duplicated clientEventId cannot double-count a moment", () => {
    const e = makeEvent({ result: "correct", evidenceClass: "recall" });
    const once = selectLearningStats([e]);
    const twice = selectLearningStats([e, e]);
    assertEqual(JSON.stringify(twice), JSON.stringify(once), "idempotent per event id");
  });

  test("order does not change totals where ordering is semantically irrelevant", () => {
    const list = [
      makeEvent({ result: "correct", evidenceClass: "recall", itemIds: ["a"] }),
      makeEvent({ result: "correct", evidenceClass: "recognition", itemIds: ["b"] }),
      makeNonAssessedEvent({
        primitive: "production",
        evidenceClass: "open_production_attempt",
      }),
    ];
    assertEqual(
      JSON.stringify(selectLearningStats(list)),
      JSON.stringify(selectLearningStats([...list].reverse())),
      "same totals either way",
    );
  });
});

// ── Part C: admission filtering ─────────────────────────────────────────────

describe("learning stats — only trusted evidence counts", () => {
  test("admitted and legacy_admitted count; quarantined/unresolved/no_evidence do not", () => {
    const s = selectLearningStats([
      makeEvent({ result: "correct", evidenceClass: "recall" }),
      makeEvent({
        result: "correct",
        evidenceClass: "recall",
        admissibility: { status: "legacy_admitted", sourceVersion: 1 },
      }),
      makeEvent({
        result: "correct",
        evidenceClass: "recall",
        admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
      }),
      makeEvent({
        result: "correct",
        evidenceClass: "recall",
        admissibility: { status: "unresolved", reasons: ["admission_context_incomplete"] },
      }),
      makeEvent({
        result: "correct",
        evidenceClass: "recall",
        admissibility: {
          status: "no_evidence",
          reasons: ["authored_no_evidence_contract"],
        },
      }),
    ]);
    assertEqual(s.practiceMoments, 2, "exactly the admitted + legacy_admitted pair");
    assertEqual(s.independentPracticeMoments, 2, "same for the class split");
  });

  test("a quarantined assessed event moves NOTHING — however correct it looked", () => {
    const s = selectLearningStats([
      makeEvent({
        result: "correct",
        evidenceClass: "recall",
        itemIds: ["noun-cafe"],
        admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
      }),
    ]);
    assertEqual(s.practiceMoments, 0, "no practice moment");
    assertEqual(s.recognitionMoments, 0, "no recognition");
    assertEqual(s.independentPieces + s.supportedPieces, 0, "no piece claim");
    assertEqual(s.piecesPracticed, 0, "no practiced piece");
    assertEqual(s.readyToRevisitPieces, 0, "no revisit state");
    assertEqual(s.hasActivity, false, "nothing to summarize");
  });
});

// ── Part C: metric classification ───────────────────────────────────────────

describe("learning stats — metric classification", () => {
  test("the evidence class is authoritative — recognition on a build stays recognition", () => {
    const s = selectLearningStats([
      makeEvent({
        result: "correct",
        operation: "build",
        primitive: "selection",
        evidenceClass: "recognition",
        evidenceCeiling: "recognition",
      }),
    ]);
    assertEqual(s.recognitionMoments, 1, "counted by class, not operation");
    assertEqual(s.independentPracticeMoments, 0, "never inferred from operation");
  });

  test("self-correction is a practice moment but neither independent nor Supported", () => {
    const s = selectLearningStats([
      makeEvent({
        result: "correct",
        primitive: "production",
        evidenceClass: "self_correction",
        evidenceCeiling: "self_correction",
      }),
    ]);
    assertEqual(s.practiceMoments, 1, "repair is real practice");
    assertEqual(s.independentPracticeMoments, 0, "not independence");
    assertEqual(s.supportedPracticeMoments, 0, "not Supported production");
  });

  test("exposure, reveal and self-report move no practice metric", () => {
    const s = selectLearningStats([
      makeNonAssessedEvent({ primitive: "exposure" }),
      makeNonAssessedEvent({ primitive: "reveal" }),
      makeNonAssessedEvent({ primitive: "self_report" }),
    ]);
    assertEqual(s.practiceMoments, 0, "contact is not practice");
    assertEqual(s.openAttempts, 0, "and none of these is an open attempt");
    assertEqual(s.hasActivity, false, "no manufactured activity");
  });

  test("an open production attempt counts once, as communicative reach only", () => {
    const s = selectLearningStats([
      makeNonAssessedEvent({
        primitive: "production",
        evidenceClass: "open_production_attempt",
        userAnswer: "Bonjour, un café.",
      }),
      makeNonAssessedEvent({ primitive: "reveal", evidenceClass: "comparison_only" }),
    ]);
    assertEqual(s.openAttempts, 1, "the attempt");
    assertEqual(s.practiceMoments, 0, "never an assessed practice moment");
    assert(!JSON.stringify(s).includes("Bonjour"), "the learner's words stay private");
  });

  test("pieces practiced counts distinct canonical items, never exposes them", () => {
    const s = selectLearningStats([
      makeEvent({ result: "correct", evidenceClass: "recall", itemIds: ["a", "b"] }),
      makeEvent({ result: "wrong_item", evidenceClass: "recall", itemIds: ["a"] }),
    ]);
    assertEqual(s.piecesPracticed, 2, "distinct items");
    assert(!JSON.stringify(s).includes('"a"'), "ids never leave the selector");
  });

  test("cross-surface needs two distinct placements — repetition on one is not reuse", () => {
    const samePlace = selectLearningStats([
      makeEvent({ result: "correct", evidenceClass: "recall", itemIds: ["a"], placement: "lesson_path" }),
      makeEvent({ result: "correct", evidenceClass: "recall", itemIds: ["a"], placement: "lesson_path" }),
    ]);
    assertEqual(samePlace.crossSurfacePieces, 0, "same placement twice ≠ cross-surface");
    const twoPlaces = selectLearningStats([
      makeEvent({ result: "correct", evidenceClass: "recall", itemIds: ["a"], placement: "lesson_path" }),
      makeEvent({ result: "correct", evidenceClass: "recall", itemIds: ["a"], placement: "practice_hub" }),
    ]);
    assertEqual(twoPlaces.crossSurfacePieces, 1, "lesson + hub is genuine reuse");
    assertEqual(twoPlaces.practiceHubMoments, 1, "and the hub moment counted");
  });
});

// ── Part D: neutral assistance facts ────────────────────────────────────────

describe("learning stats — assistance is a neutral fact", () => {
  test("one event with a hint is ONE hint moment — rung 2 does not count twice", () => {
    const s = selectLearningStats([
      makeEvent({ result: "correct", assistance: knownAssistance({ hintRung: 2 }) }),
      makeEvent({ result: "correct", assistance: knownAssistance({ hintRung: 1 }) }),
      makeEvent({ result: "correct", assistance: knownAssistance({ hintRung: 0 }) }),
    ]);
    assertEqual(s.hintMoments, 2, "two events reached for a hint");
  });

  test("replays sum actual counts; slow playback counts moments", () => {
    const s = selectLearningStats([
      makeNonAssessedEvent({
        primitive: "exposure",
        assistance: knownAssistance({
          accessibility: { replayCount: 2, slowPlayback: true },
        }),
      }),
      makeNonAssessedEvent({
        primitive: "exposure",
        assistance: knownAssistance({
          accessibility: { replayCount: 3, slowPlayback: false },
        }),
      }),
    ]);
    assertEqual(s.replayCount, 5, "2 + 3 actual replays");
    assertEqual(s.slowPlaybackMoments, 1, "one slow-listening moment");
    assertEqual(s.readyToRevisitPieces, 0, "accessibility is never weakness");
    assertEqual(s.practiceMoments, 0, "and never practice");
  });

  test("a malformed negative replay count contributes nothing", () => {
    const s = selectLearningStats([
      makeNonAssessedEvent({
        primitive: "exposure",
        assistance: knownAssistance({
          accessibility: { replayCount: -3, slowPlayback: false },
        }),
      }),
    ]);
    assertEqual(s.replayCount, 0, "impossible values are ignored, not summed");
  });

  test("unknown and legacy-unknown assistance invent no facts", () => {
    const s = selectLearningStats([
      makeEvent({ result: "correct", assistance: { capture: "unknown" } }),
      makeEvent({ result: "correct", assistance: { capture: "legacy_unknown" } }),
    ]);
    assertEqual(s.hintMoments, 0, "no fabricated hint");
    assertEqual(s.replayCount, 0, "no fabricated replay");
    assertEqual(s.slowPlaybackMoments, 0, "no fabricated slow playback");
    assertEqual(s.practiceMoments, 2, "the events themselves still count");
  });

  test("quarantined and unresolved events contribute no assistance facts either", () => {
    const s = selectLearningStats([
      makeEvent({
        result: "correct",
        assistance: knownAssistance({
          hintRung: 2,
          accessibility: { replayCount: 4, slowPlayback: true },
        }),
        admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
      }),
    ]);
    assertEqual(s.hintMoments + s.replayCount + s.slowPlaybackMoments, 0, "not trusted");
  });
});

// ── Part F: non-inference ───────────────────────────────────────────────────

describe("learning stats — non-inference", () => {
  test("no field exists for streaks, XP, levels, accuracy, rates, time or scores", () => {
    const s = selectLearningStats([makeEvent({ result: "correct" })]);
    const keys = Object.keys(s).join(",").toLowerCase();
    for (const banned of [
      "streak",
      "xp",
      "level",
      "accuracy",
      "rate",
      "percent",
      "score",
      "time",
      "daily",
      "goal",
      "badge",
      "rank",
      "pronunciation",
      "grammar",
      "error",
      "weak",
      "fail",
      "mastery",
    ]) {
      assert(!keys.includes(banned), `no "${banned}" concept in the projection`);
    }
  });

  test("one admitted miss is not ready-to-revisit; the unchanged threshold is", () => {
    const miss = () =>
      makeEvent({ result: "wrong_item", evidenceClass: "recall", itemIds: ["a"] });
    assertEqual(selectLearningStats([miss()]).readyToRevisitPieces, 0, "one miss ≠ revisit");
    const s = selectLearningStats([miss(), miss(), miss()]);
    assertEqual(s.readyToRevisitPieces, 1, "the existing threshold, unchanged");
    assert(!("wrongCount" in s) && !("errorCount" in s), "no error count exposed");
  });

  test("replay, slow playback and hints never create revisit state or failure", () => {
    const s = selectLearningStats([
      makeEvent({
        result: "correct",
        evidenceClass: "recall",
        itemIds: ["a"],
        assistance: knownAssistance({
          hintRung: 2,
          accessibility: { replayCount: 9, slowPlayback: true },
        }),
      }),
    ]);
    assertEqual(s.readyToRevisitPieces, 0, "support is not failure");
    assertEqual(s.independentPracticeMoments, 1, "the moment itself still counts");
  });

  test("hasActivity is never manufactured from silent exposure", () => {
    const s = selectLearningStats([
      makeNonAssessedEvent({
        primitive: "exposure",
        assistance: knownAssistance({
          accessibility: { replayCount: 0, slowPlayback: false },
        }),
      }),
    ]);
    assertEqual(s.hasActivity, false, "an exposure with no facts leaves Stats empty");
  });
});

// ── Part G: runtime read projection ─────────────────────────────────────────

type CountingRepository = LearningRepository & { calls: string[] };
function makeCountingRepository(kv = makeFakeKv()): CountingRepository {
  const inner = new LocalRepository(kv);
  const calls: string[] = [];
  return {
    calls,
    appendEvent: (e) => (calls.push("appendEvent"), inner.appendEvent(e)),
    getPending: () => (calls.push("getPending"), inner.getPending()),
    markSynced: (ids) => (calls.push("markSynced"), inner.markSynced(ids)),
    readAllEvents: () => (calls.push("readAllEvents"), inner.readAllEvents()),
  };
}

describe("learning stats — runtime read", () => {
  test("runtime and controller construction still read nothing", () => {
    const repo = makeCountingRepository();
    const runtime = runtimeWith(repo);
    runtime.createSessionController({
      lessonId: "l",
      contentVersion: "v",
      resolveEventSurface: LESSON_SURFACE,
    });
    assertEqual(repo.calls.length, 0, "zero reads until an explicit projection call");
  });

  test("an explicit stats read reads exactly once and writes nothing", async () => {
    const repo = makeCountingRepository();
    const runtime = runtimeWith(repo);
    const s = await runtime.readLearningStats();
    assertEqual(repo.calls.join(","), "readAllEvents", "one validated read, no write");
    assertEqual(s.hasActivity, false, "empty log → empty summary");
  });

  test("the projection returned exposes no events, repository or telemetry", async () => {
    const { runtime, controller } = session();
    independentAttempt(controller);
    await controller.flush();
    const s = await runtime.readLearningStats();
    for (const value of Object.values(s)) {
      assert(!Array.isArray(value) && typeof value !== "object", "aggregates only");
    }
  });
});

// ── Part H: telemetry independence ──────────────────────────────────────────

describe("learning stats — telemetry independence (D-3)", () => {
  const telemetryBlob = JSON.stringify([
    {
      eventId: "t-1",
      type: "lesson_completed",
      version: TELEMETRY_SCHEMA_VERSION,
      timestamp: NOW,
      source: "test",
      lessonId: "v1-lesson-001",
    },
    {
      eventId: "t-2",
      type: "item_produced",
      version: TELEMETRY_SCHEMA_VERSION,
      timestamp: NOW,
      source: "test",
      itemId: "noun-cafe",
    },
  ]);

  test("stats reflect learning events only; telemetry changes change nothing", async () => {
    const kv = makeFakeKv({ [LM_LE_TELEMETRY_KEY]: telemetryBlob });
    const runtime = runtimeWith(new LocalRepository(kv));
    const controller = controllerOn(runtime);
    independentAttempt(controller);
    await controller.flush();

    const withTelemetry = JSON.stringify(await runtime.readLearningStats());
    assertEqual(
      (JSON.parse(withTelemetry) as LearningStatsProjection).practiceMoments,
      1,
      "the learning event is reflected",
    );
    assertEqual(
      (JSON.parse(withTelemetry) as LearningStatsProjection).practiceHubMoments,
      0,
      "telemetry item_produced/lesson_completed created no learning moment",
    );

    kv.map.set(LM_LE_TELEMETRY_KEY, JSON.stringify([{ eventId: "t-9", type: "weave_attempted", version: 1, timestamp: NOW, source: "test", lessonId: "x" }]));
    assertEqual(
      JSON.stringify(await runtime.readLearningStats()),
      withTelemetry,
      "changing telemetry changes nothing",
    );

    kv.map.delete(LM_LE_TELEMETRY_KEY);
    assertEqual(
      JSON.stringify(await runtime.readLearningStats()),
      withTelemetry,
      "removing telemetry changes nothing",
    );

    independentAttempt(controller);
    await controller.flush();
    assert(
      JSON.stringify(await runtime.readLearningStats()) !== withTelemetry,
      "changing the LEARNING history does change stats",
    );
  });

  test("reading stats writes nothing and copies nothing between stores", async () => {
    const kv = makeFakeKv({ [LM_LE_TELEMETRY_KEY]: telemetryBlob });
    const runtime = runtimeWith(new LocalRepository(kv));
    const controller = controllerOn(runtime);
    independentAttempt(controller);
    await controller.flush();
    const telemetryBefore = kv.map.get(LM_LE_TELEMETRY_KEY);
    const eventsBefore = kv.map.get(LM_LE_EVENTS_KEY);

    await runtime.readLearningStats();
    assertEqual(kv.map.get(LM_LE_TELEMETRY_KEY), telemetryBefore, "telemetry untouched");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), eventsBefore, "event log untouched");
    assertEqual(
      [...kv.map.keys()].sort().join(","),
      [LM_LE_EVENTS_KEY, LM_LE_TELEMETRY_KEY].sort().join(","),
      "no third key ever appears",
    );
  });

  test("the stats module and route import no telemetry surface", () => {
    for (const rel of [
      "content/learning-engine/learning-stats.ts",
      "app/learning-stats.tsx",
      "components/learning-stats/LearningStatsSummary.tsx",
      "components/learning-stats/learningStatsCopy.ts",
    ]) {
      const code = codeOf(read(rel));
      for (const banned of [
        "TelemetryStore",
        "TelemetryEvent",
        "LM_LE_TELEMETRY",
        "lessonCompletionCounts",
        "itemActivityCounts",
        "perScreenSeenCounts",
        "weaveAttemptCounts",
        'from "./telemetry"',
        "learning-engine/telemetry",
      ]) {
        assert(!code.includes(banned), `${rel} must not reference ${banned}`);
      }
    }
  });
});

// ── Part N: connected proofs on the real spine ──────────────────────────────

describe("learning stats — connected proofs", () => {
  test("independent production: one moment, one piece, nothing Supported", async () => {
    const { kv, runtime, controller } = session();
    independentAttempt(controller);
    await controller.flush();
    const s = await runtime.readLearningStats();
    assertEqual(s.practiceMoments, 1, "one practice moment");
    assertEqual(s.independentPracticeMoments, 1, "independent moment");
    assertEqual(s.independentPieces, 1, "independent piece");
    assertEqual(s.supportedPieces, 0, "no Supported piece");
    assertEqual(s.piecesPracticed, 1, "one canonical piece");
    assert(!JSON.stringify(s).includes("café"), "no learner/registry text leaks");
    assertEqual([...kv.map.keys()].join(","), LM_LE_EVENTS_KEY, "no second store");
  });

  test("Supported production: honest Supported counts, no mechanism, no failure", async () => {
    const { runtime, controller } = session();
    supportedAttempt(controller);
    await controller.flush();
    const s = await runtime.readLearningStats();
    assertEqual(s.supportedPracticeMoments, 1, "Supported moment");
    assertEqual(s.supportedPieces, 1, "Supported piece");
    assertEqual(s.independentPieces, 0, "no independent claim");
    assertEqual(s.readyToRevisitPieces, 0, "support is not failure");
    // `hintMoments` is a sanctioned NEUTRAL fact field; the ban here is on
    // constitutive-mechanism names, which must never appear in any form.
    const out = JSON.stringify(s);
    for (const mech of ["supplied_package", "tray", "formula", "constitutive", "model"]) {
      assert(!out.includes(mech), `no support mechanism ("${mech}") in the output`);
    }
  });

  test("Supported then independent: strongest claim wins, history preserved", async () => {
    const { runtime, controller } = session();
    supportedAttempt(controller);
    independentAttempt(controller);
    await controller.flush();
    const s = await runtime.readLearningStats();
    assertEqual(s.practiceMoments, 2, "two practice moments");
    assertEqual(s.independentPieces, 1, "one independent piece");
    assertEqual(s.supportedPieces, 0, "no Supported-only piece remains");
    assertEqual(s.piecesPracticed, 1, "still ONE canonical piece — no duplicate");
    const snap = await runtime.readMasterySnapshot();
    assertEqual(
      snap.items["noun-cafe"].production.supported.success,
      1,
      "Supported history preserved underneath",
    );
  });

  test("recognition: activity counted, ownership not implied", async () => {
    const { runtime, controller } = session();
    controller.recordGradedAttempt(
      choiceInteraction(statsLesson, fillScreen, { optionId: "opt-voudrais" }),
    );
    await controller.flush();
    const s = await runtime.readLearningStats();
    assertEqual(s.recognitionMoments, 1, "recognition moment");
    assertEqual(s.recognitionPieces, 1, "recognition piece");
    assertEqual(s.independentPieces + s.supportedPieces, 0, "no production claim");
    const snap = await runtime.readMasterySnapshot();
    assertEqual(
      snap.items["chunk-je-voudrais"].monLexiqueStatus,
      "hidden",
      "Mon Lexique ownership is not implied by recognition",
    );
  });

  test("threshold: one miss shows nothing; the unchanged threshold shows one", async () => {
    const { runtime, controller } = session();
    missedChoice(controller);
    await controller.flush();
    assertEqual((await runtime.readLearningStats()).readyToRevisitPieces, 0, "one miss");
    missedChoice(controller);
    missedChoice(controller);
    await controller.flush();
    const s = await runtime.readLearningStats();
    assertEqual(s.readyToRevisitPieces, 1, "reducer threshold reached");
  });

  test("open attempt + reveal: one communicative attempt, no practice moment", async () => {
    const { runtime, controller } = session();
    const { attempt, reveal } = openAttemptInteraction(statsLesson, sayItScreen, {
      text: "Bonjour, un café.",
      ideaPiecesShown: false,
      revisionCount: 0,
      modelAnswer: sayItScreen.payload.modelAnswer ?? null,
    });
    controller.recordOpenProductionAttempt(attempt);
    controller.recordComparisonReveal(reveal);
    await controller.flush();
    const s = await runtime.readLearningStats();
    assertEqual(s.openAttempts, 1, "the attempt counted once — the reveal did not");
    assertEqual(s.practiceMoments, 0, "not an assessed practice moment");
    assert(!JSON.stringify(s).includes("Bonjour"), "the learner's words stay private");
  });

  test("Practice Hub return: hub moment and genuine cross-surface reuse", async () => {
    const kv = makeFakeKv();
    const runtime = runtimeWith(new LocalRepository(kv));
    const lessonPath = controllerOn(runtime, LESSON_SURFACE);
    independentAttempt(lessonPath);
    await lessonPath.flush();
    const hub = controllerOn(runtime, HUB_SURFACE);
    independentAttempt(hub);
    await hub.flush();
    const s = await runtime.readLearningStats();
    assertEqual(s.practiceMoments, 2, "both surfaces' moments");
    assertEqual(s.practiceHubMoments, 1, "one hub moment");
    assertEqual(s.crossSurfacePieces, 1, "one genuinely cross-surface piece");
    assertEqual(s.piecesPracticed, 1, "one canonical identity throughout");
    assertEqual([...kv.map.keys()].join(","), LM_LE_EVENTS_KEY, "one shared store");
  });
});

// ── Part I/O: reset and privacy ─────────────────────────────────────────────

describe("learning stats — privacy reset empties the projection", () => {
  test("reset → empty; new post-reset learning reappears; no new key ever", async () => {
    let fire: () => void = () => {};
    const kvs: ReturnType<typeof makeFakeKv>[] = [];
    const owner = createLearningRuntimeOwner({
      appBuild: "test",
      deviceInfo: { platform: "test" },
      createRepository: () => {
        const kv = makeFakeKv();
        kvs.push(kv);
        return new LocalRepository(kv);
      },
      makeSessionId: () => "sess-reset",
      subscribeToReset: (listener) => {
        fire = listener;
        return () => {};
      },
    });

    const gen0 = owner.current();
    const c0 = controllerOn(gen0.runtime);
    independentAttempt(c0);
    await c0.flush();
    assertEqual((await gen0.runtime.readLearningStats()).hasActivity, true, "visible");

    fire();
    const gen1 = owner.current();
    assertEqual(
      (await gen1.runtime.readLearningStats()).hasActivity,
      false,
      "empty after reset — no restart needed",
    );

    const c1 = controllerOn(gen1.runtime);
    supportedAttempt(c1);
    await c1.flush();
    assertEqual(
      (await gen1.runtime.readLearningStats()).supportedPieces,
      1,
      "new post-reset learning appears normally",
    );

    for (const kv of kvs) {
      for (const key of kv.map.keys()) {
        assertEqual(key, LM_LE_EVENTS_KEY, "the event log is the only key — ever");
      }
    }
    owner.dispose();
  });
});

// ── Part L: completion settlement includes the Stats link ───────────────────

/** A repository whose appendEvent blocks until manually released. */
function makeBlockedRepository(kv = makeFakeKv()) {
  const inner = new LocalRepository(kv);
  let release: (() => void) | null = null;
  const blocked = new Promise<void>((resolve) => {
    release = resolve;
  });
  const repo: LearningRepository = {
    appendEvent: async (e) => {
      await blocked;
      return inner.appendEvent(e);
    },
    getPending: () => inner.getPending(),
    markSynced: (ids) => inner.markSynced(ids),
    readAllEvents: () => inner.readAllEvents(),
  };
  return { repo, release: () => release?.() };
}

const microtasks = async (n = 20) => {
  for (let i = 0; i < n; i += 1) await Promise.resolve();
};

describe("learning stats — settled navigation to the summary", () => {
  test("the Stats destination reads the settled log, never one event short", async () => {
    const { repo, release } = makeBlockedRepository();
    const runtime = runtimeWith(repo);
    const controller = controllerOn(runtime);
    let navigated = 0;
    const gate = createSettledNavigationGate({
      whenSettled: () => controller.flush(),
      isActive: () => true,
    });
    independentAttempt(controller);
    gate.requestSettledNavigation(() => {
      navigated += 1;
    });
    await microtasks();
    assertEqual(navigated, 0, "no navigation while the final event is in flight");
    release();
    await controller.flush();
    await microtasks();
    assertEqual(navigated, 1, "exactly one navigation after settlement");
    const s = await runtime.readLearningStats();
    assertEqual(s.practiceMoments, 1, "the destination summary contains the event");
  });
});

// ── source-level wiring guards (honest: no component renderer exists) ───────

describe("learning stats route, component and completion wiring (source-level)", () => {
  const route = () => read("app/learning-stats.tsx");

  test("the route reads through the runtime projection and owns no store", () => {
    const code = codeOf(route());
    assert(code.includes("readLearningStats"), "explicit runtime projection read");
    assert(code.includes("loadToken"), "stale-read token present");
    assert(code.includes("[load, generation]"), "reset generation re-reads the log");
    assert(code.includes("hasActivity"), "empty state derives from the projection");
    for (const banned of [
      "Date.now",
      "LocalRepository",
      "appendEvent",
      "scoreEvent",
      "selectLearningStats",
      "LM_LE_",
      "createSessionController",
      "useSRS",
      "flashcard",
      "lm7",
      "useApp",
      "MILESTONES",
      "AsyncStorage",
    ]) {
      assert(!code.includes(banned), `app/learning-stats.tsx must not reference ${banned}`);
    }
    assert(!/record[A-Z]/.test(code), "opening the summary emits nothing");
    assert(code.includes('"loading"') && code.includes('"error"') && code.includes('"ready"'), "states");
  });

  test("the copy is calm and complete; no judgment or gamification wording", () => {
    const values = Object.values(LEARNING_STATS_COPY).join(" ").toLowerCase();
    for (const banned of [
      "accuracy",
      "streak",
      "xp",
      "level",
      "%",
      "score",
      "weak",
      "failed",
      "error",
      "mastery",
      "badge",
      "goal",
      "rank",
    ]) {
      assert(!values.includes(banned), `stats copy must not contain "${banned}"`);
    }
    assertEqual(LEARNING_STATS_COPY.title, "Learning in motion", "title");
    assertEqual(
      LEARNING_STATS_COPY.readyToRevisitPieces,
      "Ready for another pass",
      "calm revisit copy",
    );
    assertEqual(LEARNING_STATS_COPY.supportedPieces, "Growing with support", "no mechanism");
  });

  test("the dumb component receives the projection and reaches nothing else", () => {
    const code = codeOf(read("components/learning-stats/LearningStatsSummary.tsx"));
    assert(code.includes("LearningStatsProjection"), "typed on the safe projection");
    for (const banned of [
      "LearningEvent",
      "scoreEvent",
      "readMasterySnapshot",
      "readLearningStats",
      "LocalRepository",
      "learning-engine/mastery",
      "learning-engine/events",
      "onPress",
      "router.",
    ]) {
      assert(!code.includes(banned), `the summary component must not use ${banned}`);
    }
    const copySrc = codeOf(read("components/learning-stats/learningStatsCopy.ts"));
    assert(!copySrc.includes("import "), "the copy module imports nothing");
  });

  test("all three completion projection links route through the one settled gate", () => {
    const src = read("components/lesson-v1/LessonRendererV1.tsx");
    const completion = src.slice(src.indexOf("function CompletionView"));
    for (const dest of ["/practice-hub", "/mon-lexique", "/learning-stats"]) {
      assert(
        completion.includes(`openProjection(() => router.push("${dest}" as never))`),
        `${dest} waits for settlement`,
      );
    }
    assertEqual(
      (completion.match(/router\.push\(/g) ?? []).length,
      3,
      "exactly the three settled projection pushes",
    );
    assertEqual(
      (completion.match(/createSettledNavigationGate/g) ?? []).length,
      1,
      "one gate — no second settlement helper",
    );
    assert(completion.includes("onPress={exitToPrevious}"), "Back to Home stays direct");
    assert(completion.includes("See learning summary"), "the calm entry label");
    assertEqual(
      (src.match(/mk\(lesson\.number, V1_COMPLETION_SECTION_KEY\)/g) ?? []).length,
      1,
      "the legacy completion marker still runs exactly once",
    );
  });

  test("the legacy Stats tab stays quarantined on its frozen stack", () => {
    const legacy = read("app/(tabs)/stats.tsx");
    assert(legacy.includes("useApp"), "legacy tab still reads its legacy provider");
    assert(legacy.includes("FEATURES.progress"), "still behind its unchanged flag");
    assert(legacy.includes("MILESTONES"), "still on legacy milestones");
    for (const banned of [
      "readLearningStats",
      "selectLearningStats",
      "LearningStatsProjection",
      "useLearningEngineRuntime",
      "learning-stats",
      "LocalRepository",
    ]) {
      assert(!legacy.includes(banned), `legacy Stats must not gain ${banned}`);
    }
  });

  test("the selector module is pure — no React, storage, clock or network", () => {
    const code = codeOf(read("content/learning-engine/learning-stats.ts"));
    // Import-specifier checks (`from "react`), not bare substrings — `export`
    // contains "expo", so a naive substring ban would false-positive forever.
    for (const banned of [
      'from "react',
      'from "expo',
      "Date.now",
      "Math.random",
      "fetch(",
      "LocalRepository",
      "kvStorage",
      "setItem",
      "getItem",
      "LM_LE_",
      "AppProvider",
    ]) {
      assert(!code.includes(banned), `learning-stats.ts must not reference ${banned}`);
    }
  });
});

// ── regression: PR-10 changed no frozen contract ────────────────────────────

describe("PR-10 changed no frozen contract", () => {
  test("event, telemetry, mastery, compaction, attribution and tags unchanged", () => {
    assertEqual(LEARNING_EVENT_SCHEMA_VERSION, 3, "event schema");
    assertEqual(TELEMETRY_SCHEMA_VERSION, 1, "telemetry schema");
    assertEqual(MASTERY_SNAPSHOT_VERSION, "mastery-v0.3", "mastery");
    assertEqual(COMPACTION_SNAPSHOT_VERSION, "compaction-v0.2", "compaction");
    assertEqual(ATTRIBUTION_SOURCES.length, 8, "the Canonical eight");
    assertEqual(ERROR_TAG_CODES.length, 16, "frozen tags");
  });

  test("the reducer itself was not conscripted — stats derive, mastery decides", () => {
    // Same events through both: the projection's piece counts agree with the
    // reducer's own claims, because they COME from it — no parallel scoring.
    const events: LearningEvent[] = [
      makeEvent({
        result: "correct",
        evidenceClass: "supported_production",
        evidenceCeiling: "supported_production",
        itemIds: ["x"],
      }),
    ];
    const s = selectLearningStats(events);
    const snap = scoreEvents(events);
    assertEqual(s.supportedPieces, 1, "projection");
    assertEqual(snap.items["x"].production.supported.success, 1, "reducer agrees");
  });

  test("telemetry remains a separate privacy category — not deleted, not merged", () => {
    const privacy = read("content/learning-engine/privacy-data.ts");
    assert(privacy.includes("LM_LE_TELEMETRY_KEY"), "still inventoried separately");
  });
});
