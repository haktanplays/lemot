/**
 * PR-12 — L1 connected accumulation and failure smoke (code side).
 *
 * ONE cumulative real history: the six pilot proof paths run in sequence
 * against one shared KV, one real LocalRepository, one real runtime, real
 * controllers using the REAL shared surface factory, the real `v1-lesson-001`
 * screens and the real item/sentence/payload registries. Every projection —
 * mastery, Mon Lexique, Practice Hub, learner Stats — is then asserted against
 * the SAME aggregate history, followed by replay/restart equivalence,
 * idempotency, injected failures, the privacy-reset race, settlement ordering
 * and the offline text-path proof.
 *
 * Nothing is synthesized: no PM screen fixture, no synthetic item, sentence or
 * payload identity. PM-023 is proven as the RETURN CAPABILITY only — the exact
 * PM-023 learner payload remains unregistered, and a test pins that.
 *
 * HONEST SCOPE NOTE. This is the automated CODE-SIDE smoke. It proves the
 * connected text-learning spine and its projections; it does NOT claim any
 * Android/device result — the operator pack in
 * docs/workstreams/L1_CONNECTED_ANDROID_SMOKE_RUNBOOK_v0.1.md owns that, and
 * device status stays PENDING until an operator actually runs it. As
 * throughout this repo there is no React component renderer; renderer wiring
 * stays covered by the existing source-level guards.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent, type FakeKv } from "./helpers";
import {
  LEARNING_EVENT_SCHEMA_VERSION,
  type AssessedLearningEvent,
  type LearningEvent,
} from "../../content/learning-engine/events";
import {
  MASTERY_SNAPSHOT_VERSION,
  createEmptyMasterySnapshot,
  scoreEvents,
} from "../../content/learning-engine/mastery";
import {
  LM_LE_EVENTS_KEY,
  LM_LE_EVENTS_CORRUPT_KEY,
  LocalRepository,
} from "../../content/learning-engine/repository/local";
import { LM_LE_TELEMETRY_KEY } from "../../content/learning-engine/telemetry";
import {
  createLearningEngineRuntime,
  type LearningEngineRuntime,
} from "../../content/learning-engine/runtime";
import type { LearningSessionController } from "../../content/learning-engine/session-controller";
import type { LearningRepository } from "../../content/learning-engine/repository/types";
import {
  choiceInteraction,
  declaredConstitutivePieces,
  meetExposureInteraction,
  openAttemptInteraction,
  typedAttemptInteraction,
} from "../../content/lesson-v1-evidence/interactions";
import {
  REGISTERED_LESSON_PAYLOADS,
  makeRegisteredEventSurface,
} from "../../content/identity/payloadRegistry";
import { isHumanFrenchApproved } from "../../content/identity/frenchQaStatus";
import { SENTENCE_REGISTRY } from "../../content/identity/sentenceRegistry";
import { ITEM_REGISTRY } from "../../content/itemRegistry";
import { V1_LESSONS } from "../../content/lessons/v1";
import { selectMonLexiqueEntries } from "../../content/learning-engine/mon-lexique";
import { selectLearningStats } from "../../content/learning-engine/learning-stats";
import { selectPracticeHubSet } from "../../content/lesson-v1-evidence/practiceHub";
import { createSettledNavigationGate } from "../../components/lesson-v1/settledNavigation";
import { createSettledCloseGate } from "../../components/practice-hub/settledClose";
import {
  __resetPrivacyResetEpochForTest,
  bumpPrivacyResetEpoch,
} from "../../lib/privacyResetEpoch";
import type {
  FillWithTrapsScreen,
  Lesson,
  MeetCardScreen,
  SayItYourWayScreen,
  WeaveScreen,
} from "../../content/lessonTypes";

const NOW = 1_800_000_000_000;
const lesson001 = V1_LESSONS.find((l) => l.id === "v1-lesson-001") as Lesson;
const meetMerci = lesson001.screens.find(
  (s) => s.id === "s07-meet-merci",
) as MeetCardScreen;
const fillScreen = lesson001.screens.find(
  (s) => s.id === "s03-fill-polite-verb",
) as FillWithTrapsScreen;
const pm009Screen = lesson001.screens.find(
  (s) => s.id === "s10-weave-merci-thanks",
) as WeaveScreen;
const pm011Screen = lesson001.screens.find(
  (s) => s.id === "s11-weave-the-order",
) as WeaveScreen;
const sayItScreen = lesson001.screens.find(
  (s) => s.type === "say-it-your-way",
) as SayItYourWayScreen;

function runtimeWith(repo: LearningRepository): LearningEngineRuntime {
  return createLearningEngineRuntime({
    repository: repo,
    appBuild: "smoke",
    deviceInfo: { platform: "smoke" },
    makeSessionId: () => `sess-${Math.random().toString(36).slice(2, 8)}`,
  });
}

function controllerOn(
  runtime: LearningEngineRuntime,
  placement: "lesson_path" | "practice_hub",
  baseOffset = 0,
  onUpdate?: (s: { status: string; latestSnapshot: unknown }) => void,
): LearningSessionController {
  let t = 0;
  let n = 0;
  return runtime.createSessionController({
    lessonId: lesson001.id,
    contentVersion: lesson001.version,
    resolveEventSurface: makeRegisteredEventSurface(placement),
    onUpdate,
    now: () => NOW + baseOffset + (t += 1_000),
    makeClientEventId: () => `evt-smoke-${placement}-${baseOffset}-${(n += 1)}`,
  });
}

const pm009Attempt = (c: LearningSessionController, text = "Merci.") =>
  c.recordGradedAttempt(
    typedAttemptInteraction(lesson001, pm009Screen, {
      text,
      hintRung: 0,
      constitutiveSupportRendered: false,
    }),
  );
const pm011Attempt = (c: LearningSessionController, rendered = true) =>
  c.recordGradedAttempt(
    typedAttemptInteraction(lesson001, pm011Screen, {
      text: "Je voudrais un thé, s'il vous plaît.",
      hintRung: 0,
      constitutiveSupportRendered: rendered,
    }),
  );

/**
 * Run the full six-path cumulative sequence against one shared KV.
 * Returns everything later phases need. Offline seam: `fetch` is replaced by a
 * throwing spy for the WHOLE sequence, so any network call would both fail the
 * flow and be counted.
 */
async function runCumulativeHistory(kv: FakeKv) {
  const g = globalThis as { fetch?: unknown };
  const hadFetch = "fetch" in g;
  const realFetch = g.fetch;
  let networkCalls = 0;
  g.fetch = () => {
    networkCalls += 1;
    throw new Error("offline smoke: network is unavailable");
  };

  try {
    const runtime = runtimeWith(new LocalRepository(kv));
    const lessonC = controllerOn(runtime, "lesson_path");

    // 1 · PM-001 exposure control (real Meet screen, one replay).
    lessonC.recordExposure(
      meetExposureInteraction(lesson001, meetMerci, { ttsPlayCount: 2 }),
    );
    // 2 · PM-002 recognition control: one admitted success…
    lessonC.recordGradedAttempt(
      choiceInteraction(lesson001, fillScreen, { optionId: "opt-voudrais" }),
    );
    // …and the je veux register trap (one narrow miss).
    lessonC.recordGradedAttempt(
      choiceInteraction(lesson001, fillScreen, { optionId: "opt-veux" }),
    );
    // 3 · exact PM-009 independent production.
    pm009Attempt(lessonC);
    // 4 · exact PM-011 Supported production.
    pm011Attempt(lessonC);
    // 5 · PM-014 open production: attempt then comparison reveal, in order.
    const { attempt, reveal } = openAttemptInteraction(lesson001, sayItScreen, {
      text: "Bonjour, un thé s'il vous plaît. Merci !",
      ideaPiecesShown: false,
      revisionCount: 0,
      modelAnswer: sayItScreen.payload.modelAnswer ?? null,
    });
    lessonC.recordOpenProductionAttempt(attempt);
    lessonC.recordComparisonReveal(reveal);
    await lessonC.flush();

    // 6 · PM-023 return capability: the same PM-009 payload through the Hub.
    const hubC = controllerOn(runtime, "practice_hub", 100_000);
    pm009Attempt(hubC);
    await hubC.flush();

    return { runtime, networkCalls };
  } finally {
    if (hadFetch) g.fetch = realFetch;
    else delete (g as Record<string, unknown>).fetch;
  }
}

// Shared cumulative state, built ONCE and asserted across the describes below.
const cumulativeKv = makeFakeKv();
let cumulativeRuntime: LearningEngineRuntime;
let cumulativeNetworkCalls = -1;
let cumulativeLog: LearningEvent[] = [];

describe("L1 connected smoke — cumulative six-path history", () => {
  test("the full sequence runs offline: zero network calls, one storage key", async () => {
    const { runtime, networkCalls } = await runCumulativeHistory(cumulativeKv);
    cumulativeRuntime = runtime;
    cumulativeNetworkCalls = networkCalls;
    cumulativeLog = await new LocalRepository(cumulativeKv).readAllEvents();

    assertEqual(networkCalls, 0, "the connected TEXT spine needed no network");
    assertEqual(
      [...cumulativeKv.map.keys()].join(","),
      LM_LE_EVENTS_KEY,
      "one shared lm_le_events history — no second learning store",
    );
  });

  test("event count, order and schema over the shared log", () => {
    assertEqual(cumulativeLog.length, 8, "exposure + 2 choices + PM-009 + PM-011 + open attempt + reveal + hub return");
    assertEqual(
      cumulativeLog.map((e) => e.clientEventId).join(","),
      [
        "evt-smoke-lesson_path-0-1",
        "evt-smoke-lesson_path-0-2",
        "evt-smoke-lesson_path-0-3",
        "evt-smoke-lesson_path-0-4",
        "evt-smoke-lesson_path-0-5",
        "evt-smoke-lesson_path-0-6",
        "evt-smoke-lesson_path-0-7",
        "evt-smoke-practice_hub-100000-1",
      ].join(","),
      "append order preserved exactly as recorded",
    );
    for (const e of cumulativeLog) {
      assertEqual(e.schemaVersion, LEARNING_EVENT_SCHEMA_VERSION, "every event is v3");
    }
  });

  test("PM-001: exposure recorded, nothing assessed, nothing owned", async () => {
    const e = cumulativeLog[0];
    assertEqual(e.assessed, false, "non-assessed");
    assertEqual(e.evidenceClass, "exposure", "exposure class");
    assertEqual(e.primitive, "exposure", "exposure primitive");
    assert(e.result === undefined, "no grading result exists on the arm");
    const snapshot = await cumulativeRuntime.readMasterySnapshot();
    // Exposure moved no counter for its target (merci's counters all come from
    // the assessed PM-009 attempts below, proven by their exact totals there).
    const stats = selectLearningStats(cumulativeLog);
    assertEqual(stats.replayCount, 1, "one actual replay counted neutrally");
    assertEqual(snapshot.version, MASTERY_SNAPSHOT_VERSION, "current projection");
  });

  test("PM-002: recognition counts activity, narrow register tag, no ownership", async () => {
    const correct = cumulativeLog[1] as AssessedLearningEvent;
    const trap = cumulativeLog[2] as AssessedLearningEvent;
    assertEqual(correct.evidenceClass, "recognition", "recognition evidence");
    assertEqual(correct.result, "correct", "admitted success");
    assertEqual(trap.result, "wrong_register", "je veux stays a NARROW register miss");
    assert(trap.errorTags.join(",") === "wrong_register", "not a broad grammar failure");

    const snapshot = await cumulativeRuntime.readMasterySnapshot();
    const jv = snapshot.items["chunk-je-voudrais"];
    assertEqual(jv.recognitionAttempts, 2, "both recognition attempts counted");
    assertEqual(jv.recognitionSuccess, 1, "one success");
    assertEqual(jv.recognitionFailure, 1, "one miss");
    assertEqual(jv.isWeak, false, "one miss is below the unchanged threshold");
    assertEqual(jv.monLexiqueStatus, "hidden", "recognition alone owns nothing");
    assert(
      jv.production.independent.success === 0 && jv.production.supported.success === 0,
      "no production claim from recognition",
    );
  });

  test("exact PM-009: registered identity, independent production", () => {
    const e = cumulativeLog[3] as AssessedLearningEvent;
    assertEqual(e.evId, "EV-030", "EV-030");
    assertEqual(e.sentenceId, "sent:l01-merci", "registered sentence");
    assertEqual(e.payloadId, "v1-lesson-001/s10-weave-merci-thanks", "registered payload");
    assertEqual(e.placement, "lesson_path", "lesson path");
    assertEqual(e.itemIds.join(","), "chunk-merci", "exactly chunk-merci");
    assertEqual(e.targetTreatments.join(","), "active", "active treatment");
    assert(
      e.assistance.capture === "known" &&
        e.assistance.hintRung === 0 &&
        e.assistance.constitutive.length === 0,
      "clean assistance",
    );
    assert(
      e.evidenceClass === "controlled_production" || e.evidenceClass === "recall",
      "independent-class evidence",
    );
    assertEqual(e.admissibility.status, "admitted", "admitted");
    assertEqual(
      e.attribution.status === "resolved" ? e.attribution.source : "?",
      "learner",
      "learner-attributed",
    );
  });

  test("exact PM-011: registered identity, supplied package, Supported only", () => {
    const e = cumulativeLog[4] as AssessedLearningEvent;
    assertEqual(e.evId, "EV-040", "EV-040");
    assertEqual(
      e.sentenceId,
      "sent:l01-je-voudrais-un-the-sil-vous-plait",
      "registered tea sentence",
    );
    assertEqual(e.payloadId, "v1-lesson-001/s11-weave-the-order", "registered payload");
    assertEqual(e.itemIds.join(","), "chunk-un-the", "exactly the primary tea id");
    assertEqual(e.targetTreatments.join(","), "supported", "supported treatment");
    assert(
      e.assistance.capture === "known" &&
        e.assistance.constitutive.join(",") === "supplied_package",
      "the constitutive package was reported rendered",
    );
    assertEqual(e.evidenceClass, "supported_production", "Supported production");
    assertEqual(declaredConstitutivePieces(pm011Screen).length, 1, "declared on the screen");
  });

  test("PM-014: attempt then reveal in order; neither grades nor owns", () => {
    const attempt = cumulativeLog[5];
    const reveal = cumulativeLog[6];
    assertEqual(attempt.evidenceClass, "open_production_attempt", "the attempt first");
    assertEqual(reveal.evidenceClass, "comparison_only", "then the reveal");
    assertEqual(attempt.assessed, false, "never graded");
    assertEqual(reveal.assessed, false, "seeing a model is not a grade");
    const stats = selectLearningStats(cumulativeLog);
    assertEqual(stats.openAttempts, 1, "one communicative attempt in Stats");
    assert(
      !JSON.stringify(stats).includes("Bonjour, un thé"),
      "learner text never leaves the raw event boundary into Stats",
    );
  });

  test("PM-023 return capability proven; exact PM-023 learner payload remains unregistered", () => {
    const hub = cumulativeLog[7] as AssessedLearningEvent;
    assertEqual(hub.placement, "practice_hub", "honest placement change");
    assertEqual(hub.evId, "EV-030", "registered EV preserved through the Hub");
    assertEqual(hub.sentenceId, "sent:l01-merci", "sentence preserved");
    assertEqual(hub.payloadId, "v1-lesson-001/s10-weave-merci-thanks", "payload preserved");
    assertEqual(hub.itemIds.join(","), "chunk-merci", "same canonical item");
    // The capability is proven above; the exact payload registration is NOT:
    assertEqual(
      REGISTERED_LESSON_PAYLOADS.map((p) => p.sourcePairing).sort().join(","),
      "L1-PM-009,L1-PM-011",
      "no PM-023 payload exists in the registry",
    );
  });
});

// ── Part B: cumulative aggregate state ──────────────────────────────────────

describe("L1 connected smoke — cumulative projections agree with one history", () => {
  test("mastery: independent merci ×2, Supported-only tea, no noun-the, no weakness", async () => {
    const snapshot = await cumulativeRuntime.readMasterySnapshot();
    const merci = snapshot.items["chunk-merci"];
    assertEqual(merci.production.independent.success, 2, "lesson + Hub accumulate on ONE row");
    assertEqual(merci.production.supported.success, 0, "merci never Supported");
    const tea = snapshot.items["chunk-un-the"];
    assertEqual(tea.production.supported.success, 1, "tea Supported only");
    assertEqual(tea.production.independent.success, 0, "independent tea stays zero");
    assertEqual(snapshot.items["noun-the"], undefined, "the linked noun has no row");
    assertEqual(
      Object.values(snapshot.items).filter((m) => m.isWeak).length,
      0,
      "nothing weak in this history",
    );
  });

  test("Mon Lexique: exactly merci (independent) and un thé (supported), once each", async () => {
    const snapshot = await cumulativeRuntime.readMasterySnapshot();
    const entries = selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot });
    assertEqual(
      entries.map((e) => `${e.itemId}:${e.productionClaim}`).sort().join(","),
      "chunk-merci:independent,chunk-un-the:supported",
      "two entries, honest claims, no duplicate concept row",
    );
  });

  test("Stats: the exact semantically-stable aggregate", () => {
    const s = selectLearningStats(cumulativeLog);
    assertEqual(s.practiceMoments, 5, "2 recognition + PM-009 + PM-011 + Hub return");
    assertEqual(s.recognitionMoments, 2, "recognition activity");
    assertEqual(s.independentPracticeMoments, 2, "PM-009 twice (lesson + Hub)");
    assertEqual(s.supportedPracticeMoments, 1, "PM-011 once");
    assertEqual(s.openAttempts, 1, "one open attempt");
    assertEqual(s.practiceHubMoments, 1, "one Hub return");
    assertEqual(s.piecesPracticed, 3, "je-voudrais, merci, un-the");
    assertEqual(s.recognitionPieces, 1, "je-voudrais practised in recognition");
    assertEqual(s.independentPieces, 1, "merci");
    assertEqual(s.supportedPieces, 1, "un thé");
    assertEqual(s.readyToRevisitPieces, 0, "nothing to revisit");
    assertEqual(s.crossSurfacePieces, 1, "merci used on two surfaces");
    assertEqual(s.hintMoments, 0, "no hint used");
    assertEqual(s.replayCount, 1, "one neutral replay");
    assertEqual(s.slowPlaybackMoments, 0, "no slow playback");
  });

  test("Practice Hub: real authored sources return under the EXISTING diversity policy", async () => {
    const snapshot = await cumulativeRuntime.readMasterySnapshot();
    const set = selectPracticeHubSet({
      snapshot,
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW + 500_000,
      budget: 5,
    });
    const byId = new Map(set.entries.map((e) => [e.itemId, e]));
    assert(byId.has("chunk-je-voudrais"), "the recognition item returns (due, Build)");
    assertEqual(byId.get("chunk-merci")?.source.screen, pm009Screen, "merci → real s10, by reference");
    // All three practised items are CHUNK-family, and the pre-existing today's-set
    // policy defers a 3rd consecutive same-family pick with nothing to break the
    // streak — so today's set is exactly two. That is the documented selector
    // behavior, pinned here on purpose; the tea item stays fully ELIGIBLE
    // (stretch) and its Hub reuse with intact support is proven on a dedicated
    // history in pilotPayloadRegistration.test.ts.
    assertEqual(
      set.entries.map((e) => e.itemId).sort().join(","),
      "chunk-je-voudrais,chunk-merci",
      "the ≤2-consecutive-family rule shapes this all-chunk pool",
    );
    assertEqual(
      snapshot.items["chunk-un-the"].practiceEligibility,
      "stretch",
      "the tea item is excluded by diversity, never by eligibility",
    );
  });

  test("Practice Hub tea reuse on this history: the source resolver still preserves support", async () => {
    // Direct source resolution over the cumulative history (independent of the
    // today's-set diversity clamp): the tea item's ONLY safe source is the real
    // s11 screen, with its constitutive package intact.
    const snapshot = await cumulativeRuntime.readMasterySnapshot();
    const soloTea = selectPracticeHubSet({
      snapshot: {
        ...snapshot,
        items: { "chunk-un-the": snapshot.items["chunk-un-the"] },
      },
      items: ITEM_REGISTRY,
      lessons: V1_LESSONS,
      now: NOW + 500_000,
      budget: 5,
    });
    assertEqual(soloTea.entries[0]?.source.screen, pm011Screen, "tea → real s11, by reference");
    assertEqual(
      declaredConstitutivePieces(soloTea.entries[0]!.source.screen as WeaveScreen).length,
      1,
      "the Hub never strips the tea support — no unscaffolded recall",
    );
  });

  test("projections write nothing and telemetry stays independent", async () => {
    const before = cumulativeKv.map.get(LM_LE_EVENTS_KEY);
    await cumulativeRuntime.readMasterySnapshot();
    await cumulativeRuntime.readLearningStats();
    assertEqual(cumulativeKv.map.get(LM_LE_EVENTS_KEY), before, "reads changed nothing");
    assertEqual(
      [...cumulativeKv.map.keys()].join(","),
      LM_LE_EVENTS_KEY,
      "still exactly one key",
    );

    // Same history + arbitrary telemetry → identical Stats (D-3).
    const kv2 = makeFakeKv({
      [LM_LE_EVENTS_KEY]: before as string,
      [LM_LE_TELEMETRY_KEY]: JSON.stringify([
        { eventId: "t-1", type: "lesson_completed", version: 1, timestamp: NOW, source: "test" },
      ]),
    });
    const stats2 = await runtimeWith(new LocalRepository(kv2)).readLearningStats();
    assertEqual(
      JSON.stringify(stats2),
      JSON.stringify(selectLearningStats(cumulativeLog)),
      "telemetry changes nothing",
    );
  });
});

// ── Parts C/D: replay, restart, idempotency ─────────────────────────────────

describe("L1 connected smoke — replay, restart and idempotency", () => {
  test("replaying the raw log through scoreEvents reproduces the runtime snapshot", async () => {
    const derived = await cumulativeRuntime.readMasterySnapshot();
    const replayed = scoreEvents(cumulativeLog);
    assertEqual(JSON.stringify(replayed), JSON.stringify(derived), "deep-equal projection");
  });

  test("a fresh repository/runtime over the same KV (app restart) agrees on everything", async () => {
    const restarted = runtimeWith(new LocalRepository(cumulativeKv));
    assertEqual(
      JSON.stringify(await restarted.readMasterySnapshot()),
      JSON.stringify(await cumulativeRuntime.readMasterySnapshot()),
      "same mastery — no cached snapshot needed",
    );
    assertEqual(
      JSON.stringify(await restarted.readLearningStats()),
      JSON.stringify(await cumulativeRuntime.readLearningStats()),
      "same Stats",
    );
    const snapshot = await restarted.readMasterySnapshot();
    assertEqual(
      JSON.stringify(selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot })),
      JSON.stringify(
        selectMonLexiqueEntries({
          items: ITEM_REGISTRY,
          snapshot: await cumulativeRuntime.readMasterySnapshot(),
        }),
      ),
      "same Mon Lexique",
    );
    assertEqual(
      snapshot.items["chunk-merci"].practiceEligibility,
      "stretch",
      "same practice eligibility",
    );
  });

  test("duplicated history cannot inflate any projection", () => {
    const doubled = [...cumulativeLog, ...cumulativeLog];
    assertEqual(
      JSON.stringify(scoreEvents(doubled)),
      JSON.stringify(scoreEvents(cumulativeLog)),
      "mastery is idempotent by clientEventId",
    );
    assertEqual(
      JSON.stringify(selectLearningStats(doubled)),
      JSON.stringify(selectLearningStats(cumulativeLog)),
      "Stats do not double-count",
    );
    const entries = selectMonLexiqueEntries({
      items: ITEM_REGISTRY,
      snapshot: scoreEvents(doubled),
    });
    assertEqual(entries.length, 2, "no duplicate Mon Lexique row");
  });

  test("the repository itself refuses a duplicate clientEventId append", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    const e = makeEvent({ result: "correct" });
    await repo.appendEvent(e);
    await repo.appendEvent(e);
    assertEqual((await repo.readAllEvents()).length, 1, "append is idempotent");
  });
});

// ── Part E: failure injection ───────────────────────────────────────────────

const microtasks = async (n = 20) => {
  for (let i = 0; i < n; i += 1) await Promise.resolve();
};

describe("L1 connected smoke — failure injection", () => {
  test("PM-011 with the package NOT rendered quarantines: no mastery, no lexique, no Stats claim", async () => {
    const kv = makeFakeKv();
    const runtime = runtimeWith(new LocalRepository(kv));
    const c = controllerOn(runtime, "lesson_path");
    pm011Attempt(c, false); // declared constitutive support was not rendered
    await c.flush();

    const log = await new LocalRepository(kv).readAllEvents();
    assertEqual(log.length, 1, "the event IS recorded — honestly, as quarantined");
    assertEqual(log[0].admissibility.status, "quarantined", "quarantined");
    const snapshot = await runtime.readMasterySnapshot();
    assertEqual(Object.keys(snapshot.items).length, 0, "no mastery movement");
    assertEqual(
      selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot }).length,
      0,
      "no tea entry",
    );
    const stats = selectLearningStats(log);
    assertEqual(stats.supportedPieces + stats.independentPieces, 0, "no Stats claim");
    assertEqual(stats.readyToRevisitPieces, 0, "and no weakness either");
  });

  test("append failure: controller settles to error, nothing fabricated, no retry write", async () => {
    const kv = makeFakeKv();
    const inner = new LocalRepository(kv);
    let appendCalls = 0;
    const failing: LearningRepository = {
      appendEvent: async () => {
        appendCalls += 1;
        throw new Error("disk full");
      },
      getPending: () => inner.getPending(),
      markSynced: (ids) => inner.markSynced(ids),
      readAllEvents: () => inner.readAllEvents(),
    };
    const states: string[] = [];
    const runtime = runtimeWith(failing);
    const c = controllerOn(runtime, "lesson_path", 0, (s) => states.push(s.status));
    pm009Attempt(c);
    await c.flush();

    assertEqual(states[states.length - 1], "error", "the existing error status surfaced");
    assertEqual(appendCalls, 1, "no invented retry write");
    assertEqual((await failing.readAllEvents()).length, 0, "authoritative history unchanged");
    assertEqual(kv.map.size, 0, "nothing fabricated into storage");
  });

  test("read-after-append failure: event persists; controller surfaces error, fabricates no snapshot; a healthy read recovers it", async () => {
    const kv = makeFakeKv();
    const inner = new LocalRepository(kv);
    let failReads = false;
    const flaky: LearningRepository = {
      appendEvent: (e) => inner.appendEvent(e),
      getPending: () => inner.getPending(),
      markSynced: (ids) => inner.markSynced(ids),
      readAllEvents: () => {
        if (failReads) throw new Error("read failed after append");
        return inner.readAllEvents();
      },
    };
    const updates: Array<{ status: string; latestSnapshot: unknown }> = [];
    const runtime = runtimeWith(flaky);
    const c = controllerOn(runtime, "lesson_path", 0, (s) => updates.push(s));
    failReads = true; // the append itself succeeds; the derive read then fails
    pm009Attempt(c);
    await c.flush();

    const last = updates[updates.length - 1];
    assertEqual(last.status, "error", "current contract: derive failure → error status");
    assertEqual(last.latestSnapshot, null, "no snapshot is fabricated");
    failReads = false;
    const recovered = await new LocalRepository(kv).readAllEvents();
    assertEqual(recovered.length, 1, "the append DID persist — a later healthy read recovers it");
    const snapshot = await runtimeWith(new LocalRepository(kv)).readMasterySnapshot();
    assertEqual(
      snapshot.items["chunk-merci"].production.independent.success,
      1,
      "and mastery derives from it normally",
    );
  });

  test("attribution controls: non-learner and unresolved evidence never becomes weakness or ownership", () => {
    const injected: LearningEvent[] = [
      makeEvent({
        result: "wrong_item",
        itemIds: ["chunk-merci"],
        attribution: { status: "resolved", source: "content" },
        admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
      }),
      makeEvent({
        result: "wrong_item",
        itemIds: ["chunk-merci"],
        attribution: { status: "resolved", source: "validator" },
        admissibility: { status: "quarantined", reasons: ["non_learner_incident"] },
      }),
      makeEvent({
        result: "wrong_item",
        itemIds: ["chunk-un-the"],
        attribution: { status: "resolved", source: "ui_flow" },
        admissibility: { status: "quarantined", reasons: ["required_support_missing"] },
      }),
      makeEvent({
        result: "correct",
        itemIds: ["chunk-un-the"],
        attribution: { status: "unresolved" },
        admissibility: { status: "unresolved", reasons: ["learner_authorship_unresolved"] },
      }),
    ];
    const snapshot = scoreEvents(injected);
    assertEqual(Object.keys(snapshot.items).length, 0, "no item row from any of them");
    assertEqual(
      selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot }).length,
      0,
      "no ownership",
    );
    const stats = selectLearningStats(injected);
    assertEqual(stats.practiceMoments, 0, "no practice moment");
    assertEqual(stats.readyToRevisitPieces, 0, "no weakness");
  });

  test("a future-schema persisted log fails closed: unreadable, uncounted, untouched", async () => {
    const futureBlob = JSON.stringify([
      { schemaVersion: 99, clientEventId: "future-1", note: "written by a later build" },
    ]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: futureBlob });
    const repo = new LocalRepository(kv);
    assertEqual((await repo.readAllEvents()).length, 0, "reads as empty, never partially");
    let threw = false;
    try {
      await repo.appendEvent(makeEvent({ result: "correct" }));
    } catch {
      threw = true;
    }
    assertEqual(threw, true, "append refuses to overwrite an unreadable log");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), futureBlob, "the original bytes are untouched");
    const stats = await runtimeWith(repo).readLearningStats();
    assertEqual(stats.hasActivity, false, "Stats counts none of it");
  });

  test("a corrupt (non-array) log quarantines to the backup key and reads empty", async () => {
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: "not-json{{{" });
    const repo = new LocalRepository(kv);
    assertEqual((await repo.readAllEvents()).length, 0, "crash-free empty read");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), "not-json{{{", "original preserved");
    assertEqual(
      kv.map.get(LM_LE_EVENTS_CORRUPT_KEY) !== undefined,
      true,
      "raw blob backed up for recovery (existing policy)",
    );
  });

  test("privacy-reset race: stale writer suppressed, fresh PM-009 works without restart", async () => {
    __resetPrivacyResetEpochForTest();
    try {
      const kv = makeFakeKv();
      const preRuntime = runtimeWith(new LocalRepository(kv));
      const preC = controllerOn(preRuntime, "lesson_path");
      pm009Attempt(preC);
      await preC.flush();
      assertEqual((await new LocalRepository(kv).readAllEvents()).length, 1, "history exists");

      // The reset: epoch bumps and the cleared key disappears.
      bumpPrivacyResetEpoch();
      kv.map.delete(LM_LE_EVENTS_KEY);

      // The STALE pre-reset controller keeps writing — every write is suppressed.
      pm009Attempt(preC);
      await preC.flush();
      assertEqual(kv.map.has(LM_LE_EVENTS_KEY), false, "stale writer cannot re-create data");

      // A fresh post-reset repository/runtime reads empty and works normally.
      const freshRuntime = runtimeWith(new LocalRepository(kv));
      assertEqual((await freshRuntime.readLearningStats()).hasActivity, false, "empty");
      const freshC = controllerOn(freshRuntime, "lesson_path", 200_000);
      pm009Attempt(freshC);
      await freshC.flush();
      const snapshot = await freshRuntime.readMasterySnapshot();
      assertEqual(
        snapshot.items["chunk-merci"].production.independent.success,
        1,
        "post-reset learning repopulates projections without an app restart",
      );
      assertEqual(
        selectMonLexiqueEntries({ items: ITEM_REGISTRY, snapshot }).length,
        1,
        "Mon Lexique repopulates",
      );
    } finally {
      __resetPrivacyResetEpochForTest();
    }
  });

  test("settlement ordering: the REAL gates still hold on both surfaces", async () => {
    // Completion projection navigation waits for the final lesson event…
    const blockedA = (() => {
      const kv = makeFakeKv();
      const inner = new LocalRepository(kv);
      let release: (() => void) | null = null;
      const gate = new Promise<void>((r) => (release = r));
      const repo: LearningRepository = {
        appendEvent: async (e) => {
          await gate;
          return inner.appendEvent(e);
        },
        getPending: () => inner.getPending(),
        markSynced: (ids) => inner.markSynced(ids),
        readAllEvents: () => inner.readAllEvents(),
      };
      return { repo, release: () => release?.() };
    })();
    const runtimeA = runtimeWith(blockedA.repo);
    const lessonC = controllerOn(runtimeA, "lesson_path");
    let navigated = 0;
    const nav = createSettledNavigationGate({
      whenSettled: () => lessonC.flush(),
      isActive: () => true,
    });
    pm009Attempt(lessonC);
    nav.requestSettledNavigation(() => {
      navigated += 1;
    });
    await microtasks();
    assertEqual(navigated, 0, "no navigation before the final event settles");
    blockedA.release();
    await lessonC.flush();
    await microtasks();
    assertEqual(navigated, 1, "then exactly once");
    assertEqual(
      (await runtimeA.readLearningStats()).independentPracticeMoments,
      1,
      "the destination read sees the settled event",
    );

    // …and the Practice Hub close waits for Hub-event settlement.
    const blockedB = (() => {
      const kv = makeFakeKv();
      const inner = new LocalRepository(kv);
      let release: (() => void) | null = null;
      const gate = new Promise<void>((r) => (release = r));
      const repo: LearningRepository = {
        appendEvent: async (e) => {
          await gate;
          return inner.appendEvent(e);
        },
        getPending: () => inner.getPending(),
        markSynced: (ids) => inner.markSynced(ids),
        readAllEvents: () => inner.readAllEvents(),
      };
      return { repo, release: () => release?.() };
    })();
    const hubC = controllerOn(runtimeWith(blockedB.repo), "practice_hub");
    let closed = 0;
    const close = createSettledCloseGate({
      flush: () => hubC.flush(),
      identity: "id",
      currentIdentity: () => "id",
      isActive: () => true,
      onClose: () => {
        closed += 1;
      },
    });
    pm009Attempt(hubC);
    close.requestSettledClose();
    await microtasks();
    assertEqual(closed, 0, "no close before the Hub event settles");
    blockedB.release();
    await hubC.flush();
    await microtasks();
    assertEqual(closed, 1, "then exactly once");
  });
});

// ── founder-waiver truth, restated on the smoke boundary ────────────────────

describe("L1 connected smoke — QA truth stays honest", () => {
  test("every registered pilot sentence remains provisional — never human-approved", () => {
    for (const record of Object.values(SENTENCE_REGISTRY)) {
      assertEqual(
        isHumanFrenchApproved(record.frenchQa),
        false,
        `${record.id} has no human approval`,
      );
      assertEqual(record.frenchQa, "founder_waived_provisional", "explicit waiver status");
    }
  });

  test("an empty history still projects empty everywhere (nothing at rest)", async () => {
    const runtime = runtimeWith(new LocalRepository(makeFakeKv()));
    assertEqual((await runtime.readLearningStats()).hasActivity, false, "Stats empty");
    assertEqual(
      selectMonLexiqueEntries({
        items: ITEM_REGISTRY,
        snapshot: createEmptyMasterySnapshot(),
      }).length,
      0,
      "Mon Lexique empty",
    );
  });
});
