/**
 * PR-H — runtime re-persist barrier (audit C5, in-memory resurrection gap).
 *
 * A device-local privacy reset clears storage, but live in-memory state in
 * `useStorage` / `useSRS` could re-persist the OLD data on the next write. This
 * verifies the fix: (1) the pure reset-epoch barrier suppresses stale writes;
 * (2) modeled against the real `blobStore`, a stale post-reset write cannot
 * re-create `lm7` and a modeled `lm7_srs` save is likewise suppressed, while
 * fresh post-reset activity persists clean; (3) the real hooks + provider + UI
 * are wired to the barrier (source scan — hooks can't render in this harness).
 */
import { describe, test, assert } from "./harness";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createBlobStore } from "../../lib/blobStore";
import type { StorageData, ErrorEntry } from "../../lib/types";
import {
  bumpPrivacyResetEpoch,
  privacyResetEpoch,
  isPersistSuppressed,
  __resetPrivacyResetEpochForTest,
} from "../../lib/privacyResetEpoch";
import { makeFakeKv, makeEvent } from "./helpers";
import {
  LocalRepository,
  LM_LE_EVENTS_KEY,
} from "../../content/learning-engine/repository/local";
import { LearningSessionController } from "../../content/learning-engine/session-controller";
import {
  TelemetryStore,
  createTelemetryEvent,
  LM_LE_TELEMETRY_KEY,
} from "../../content/learning-engine/telemetry";
import { resetAllLocalPrivacyData } from "../../content/learning-engine/local-privacy-inventory";
import type { ExerciseBlueprint } from "../../content/learning-engine/types";
import type { ErrorTagCode } from "../../content/learning-engine/events";

const EMPTY = (): StorageData => ({ p: {}, err: [], dr: { date: "", count: 0 } });
const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");

describe("PR-H — reset-epoch barrier (pure)", () => {
  test("bump increments; suppression is exactly 'captured older than current'", () => {
    __resetPrivacyResetEpochForTest();
    const captured = privacyResetEpoch();
    assert(!isPersistSuppressed(captured), "no reset yet → not suppressed");
    bumpPrivacyResetEpoch();
    assert(isPersistSuppressed(captured), "after a reset, the stale capture is suppressed");
    assert(!isPersistSuppressed(privacyResetEpoch()), "a store that re-acknowledges is allowed again");
  });
});

/** Model of `useStorage`'s guarded persist over the real blobStore. */
function makeGuardedLm7() {
  const persisted: { value: StorageData | null } = { value: null };
  const ack = { epoch: privacyResetEpoch() };
  const store = createBlobStore(EMPTY(), (next) => {
    if (isPersistSuppressed(ack.epoch)) return; // PR-H barrier
    persisted.value = next;
  });
  const resetLocal = () => {
    store.hydrate(EMPTY());
    ack.epoch = privacyResetEpoch();
  };
  return { store, persisted, resetLocal };
}

describe("PR-H — stale writes cannot resurrect lm7; fresh activity persists", () => {
  test("after reset, a stale pre-reset write cannot re-create lm7 progress/answers", () => {
    __resetPrivacyResetEpochForTest();
    const s = makeGuardedLm7();
    s.store.updateProgress(() => ({ "1-x": true }));
    s.store.updateErrors(() => [{ w: "x", s: "quiz", g: "bonjour", c: "bonjour", l: 1, t: 1 } as ErrorEntry]);
    assert(s.persisted.value?.p["1-x"] === true, "old data persisted before reset");

    bumpPrivacyResetEpoch(); // reset happened; storage cleared elsewhere
    const snapshot = s.persisted.value;
    s.store.updateProgress((p) => ({ ...p, "2-y": true })); // stale in-memory write
    assert(s.persisted.value === snapshot, "stale write is suppressed — lm7 not re-created");
  });

  test("after acknowledging the reset, fresh activity persists clean (no old data)", () => {
    __resetPrivacyResetEpochForTest();
    const s = makeGuardedLm7();
    s.store.updateProgress(() => ({ "1-x": true }));
    s.store.updateErrors(() => [{ w: "x", s: "quiz", g: "bonjour", c: "bonjour", l: 1, t: 1 } as ErrorEntry]);

    bumpPrivacyResetEpoch();
    s.resetLocal(); // clears in-memory + re-acknowledges the epoch

    s.store.updateProgress(() => ({ "3-z": true })); // genuinely new activity
    assert(s.persisted.value?.p["3-z"] === true, "fresh post-reset activity persists");
    assert(!("1-x" in (s.persisted.value?.p ?? {})), "old progress not resurrected");
    assert((s.persisted.value?.err.length ?? 0) === 0, "old saved answers not resurrected");
  });
});

/** Model of `useSRS`'s guarded save (screen-local; protected by the barrier alone). */
function makeGuardedSrs() {
  const persisted: { value: Record<string, unknown> | null } = { value: null };
  const ack = { epoch: privacyResetEpoch() };
  let data: Record<string, unknown> = {};
  return {
    persisted,
    addCard: (id: string) => {
      data = { ...data, [id]: { box: 1 } };
      if (isPersistSuppressed(ack.epoch)) return; // PR-H barrier
      persisted.value = data;
    },
    resetLocal: () => {
      data = {};
      ack.epoch = privacyResetEpoch();
    },
  };
}

describe("PR-H — stale writes cannot resurrect lm7_srs", () => {
  test("after reset, a stale SRS save is suppressed; fresh review persists after ack", () => {
    __resetPrivacyResetEpochForTest();
    const s = makeGuardedSrs();
    s.addCard("card-a");
    assert(s.persisted.value?.["card-a"] !== undefined, "old SRS card persisted before reset");

    bumpPrivacyResetEpoch();
    const snapshot = s.persisted.value;
    s.addCard("card-b"); // stale save attempt
    assert(s.persisted.value === snapshot, "stale SRS save suppressed — lm7_srs not re-created");

    s.resetLocal();
    s.addCard("card-c"); // fresh post-reset review
    assert(s.persisted.value?.["card-c"] !== undefined, "fresh SRS activity persists");
    assert(s.persisted.value?.["card-a"] === undefined, "old SRS card not resurrected");
  });
});

describe("PR-H — stale writers cannot re-create lm_le_events (real repository/controller)", () => {
  const OLD_EVENTS = [
    makeEvent({ clientEventId: "old-1", result: "correct", userAnswer: "vieux bonjour" }),
  ];
  const FILL: ExerciseBlueprint = {
    id: "f-1",
    lessonId: "l1",
    operation: "fill",
    targetItemIds: ["a"],
  };
  const graded = (result: ErrorTagCode) => ({
    userAnswer: "nouvelle réponse",
    expectedAnswer: "x",
    gradeResult: { result, errorTags: [] as ErrorTagCode[], normalizedAnswer: "x" },
  });

  test("reset removes lm_le_events; a stale pre-reset controller cannot re-create it", async () => {
    __resetPrivacyResetEpochForTest();
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: JSON.stringify(OLD_EVENTS) });
    // Mounted BEFORE the reset — this is the exact named scenario.
    const staleRepo = new LocalRepository(kv);
    const staleController = new LearningSessionController({
      repository: staleRepo,
      sessionId: "s",
      lessonId: "l1",
      contentVersion: "v1",
      now: () => 1_000,
      makeClientEventId: () => "stale-evt",
    });

    // The user resets: barrier on, full inventory cleared.
    bumpPrivacyResetEpoch();
    await resetAllLocalPrivacyData({ store: kv });
    assert(!kv.map.has(LM_LE_EVENTS_KEY), "reset removed lm_le_events");

    // The still-mounted pre-reset controller records an attempt.
    staleController.recordGradedAttempt({ exercise: FILL, ...graded("correct") });
    await staleController.flush();
    assert(!kv.map.has(LM_LE_EVENTS_KEY), "stale controller write suppressed — key NOT re-created");

    // Direct stale repository append is suppressed too.
    await staleRepo.appendEvent(makeEvent({ clientEventId: "stale-2", result: "correct" }));
    assert(!kv.map.has(LM_LE_EVENTS_KEY), "stale repository append suppressed");
  });

  test("a fresh post-reset repository writes ONLY new events — old answers stay gone", async () => {
    __resetPrivacyResetEpochForTest();
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: JSON.stringify(OLD_EVENTS) });
    bumpPrivacyResetEpoch();
    await resetAllLocalPrivacyData({ store: kv });

    // Remount: a repository created AFTER the reset captures the new epoch.
    const freshRepo = new LocalRepository(kv);
    await freshRepo.appendEvent(
      makeEvent({ clientEventId: "new-1", result: "correct", userAnswer: "réponse fraîche" }),
    );
    const raw = kv.map.get(LM_LE_EVENTS_KEY);
    assert(raw !== undefined, "fresh post-reset writer can persist new events");
    const events = JSON.parse(raw!) as Array<{ clientEventId: string; userAnswer: string }>;
    assert(events.length === 1 && events[0].clientEventId === "new-1", "log contains only the new event");
    assert(!raw!.includes("vieux bonjour"), "old pre-reset answers are not resurrected");
  });

  test("a stale telemetry store cannot re-create lm_le_telemetry; a fresh one can", async () => {
    __resetPrivacyResetEpochForTest();
    const kv = makeFakeKv({ [LM_LE_TELEMETRY_KEY]: "[]" });
    const staleTelemetry = new TelemetryStore(kv);
    bumpPrivacyResetEpoch();
    await resetAllLocalPrivacyData({ store: kv });

    await staleTelemetry.appendEvent(
      createTelemetryEvent({ eventId: "t1", type: "lesson_started", timestamp: 1, source: "test" }),
    );
    assert(!kv.map.has(LM_LE_TELEMETRY_KEY), "stale telemetry append suppressed");

    const freshTelemetry = new TelemetryStore(kv);
    await freshTelemetry.appendEvent(
      createTelemetryEvent({ eventId: "t2", type: "lesson_started", timestamp: 2, source: "test" }),
    );
    assert(kv.map.has(LM_LE_TELEMETRY_KEY), "fresh post-reset telemetry store can write");
  });
});

describe("PR-H — runtime persisters + provider + UI are wired to the barrier", () => {
  test("useStorage / useSRS / AppProvider / PrivacyDataControls consult the barrier", () => {
    const storage = read("hooks/useStorage.ts");
    assert(storage.includes("isPersistSuppressed(ackEpoch.current)"), "useStorage.persist consults the barrier");
    assert(storage.includes("resetLocal"), "useStorage exposes resetLocal");
    assert(/hydrate\(\{ p: \{\}, err: \[\], dr:/.test(storage), "useStorage.resetLocal clears in-memory to empty");

    const srs = read("hooks/useSRS.ts");
    assert(srs.includes("isPersistSuppressed(ackEpoch.current)"), "useSRS.save consults the barrier");
    assert(srs.includes("resetLocal"), "useSRS exposes resetLocal");

    const provider = read("providers/AppProvider.tsx");
    assert(provider.includes("bumpPrivacyResetEpoch()"), "provider engages the barrier");
    assert(provider.includes("resetAllLocalPrivacyData()"), "provider clears the storage inventory");
    assert(provider.includes("storageHook.resetLocal()"), "provider clears live in-memory state");
    assert(provider.includes("resetLocalData"), "provider exposes resetLocalData");

    const ui = read("components/learning-engine/PrivacyDataControls.tsx");
    assert(ui.includes("resetLocalData"), "PrivacyDataControls routes reset through the provider");

    const repo = read("content/learning-engine/repository/local.ts");
    assert(repo.includes("isPersistSuppressed"), "LocalRepository consults the barrier");
    assert(repo.includes("this.isStaleWriter()"), "LocalRepository write methods are guarded");

    const telemetry = read("content/learning-engine/telemetry.ts");
    assert(telemetry.includes("isPersistSuppressed(this.ackEpoch)"), "TelemetryStore.appendEvent is guarded");
  });
});
