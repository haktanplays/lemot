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
 *
 * PR-H P2-2 (audit C5, cloud-pull rollback gap): a cloud pull that STARTED before
 * a privacy reset must not apply its stale result AFTER the reset. This models the
 * `AppProvider` pull/apply guard — capture the epoch before the pull, discard the
 * result if a reset landed mid-flight — and asserts the provider is wired to it.
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
  subscribePrivacyReset,
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

describe("PR-H — reset notifies mounted stores (self-heal, PR review P2-1)", () => {
  test("a subscribed store's resetLocal runs on the reset bump; unsubscribe stops it", () => {
    __resetPrivacyResetEpochForTest();
    let calls = 0;
    const unsubscribe = subscribePrivacyReset(() => {
      calls += 1;
    });
    bumpPrivacyResetEpoch();
    assert(calls === 1, "mounted store is notified to clear its own state on reset");
    unsubscribe();
    bumpPrivacyResetEpoch();
    assert(calls === 1, "after unmount/unsubscribe, no further notifications");
  });

  test("a mounted SRS-like store clears in-memory + re-acknowledges via the subscription", () => {
    __resetPrivacyResetEpochForTest();
    // Model a screen-local useSRS mounted before the reset.
    let data: Record<string, unknown> = { "card-a": { box: 3 } };
    let ack = privacyResetEpoch();
    subscribePrivacyReset(() => {
      data = {};
      ack = privacyResetEpoch();
    });
    bumpPrivacyResetEpoch(); // reset fires while the store is still mounted
    assert(Object.keys(data).length === 0, "mounted store's in-memory schedule is cleared");
    assert(!isPersistSuppressed(ack), "store re-acknowledged → fresh review writes are re-enabled");
  });
});

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

/**
 * Faithful model of `AppProvider`'s cloud pull/apply guard (P2-2). The real
 * effect: capture `pullEpoch = privacyResetEpoch()` before `pullFromCloud()`,
 * then after it resolves, `if (isPersistSuppressed(pullEpoch)) return;` BEFORE any
 * merge / `updateStoredData` / `pushToCloud`. Side effects are spies here.
 */
function simulateCloudPull(sideEffects: {
  merge: () => void;
  writeLocal: () => void;
  push: () => void;
}) {
  // Captured immediately before the (async) pull begins.
  const pullEpoch = privacyResetEpoch();
  // ...pull resolves here (modeled as already-resolved cloud data)...
  return {
    apply() {
      if (isPersistSuppressed(pullEpoch)) return; // PR-H P2-2 guard
      sideEffects.merge();
      sideEffects.writeLocal();
      sideEffects.push();
    },
  };
}

describe("PR-H — in-flight cloud pull is discarded when a reset lands mid-flight (P2-2)", () => {
  test("pull under epoch N + reset before it resolves → no merge / write / push", () => {
    __resetPrivacyResetEpochForTest();
    let merged = 0;
    let wroteLocal = 0;
    let pushed = 0;
    const pull = simulateCloudPull({
      merge: () => (merged += 1),
      writeLocal: () => (wroteLocal += 1),
      push: () => (pushed += 1),
    });

    bumpPrivacyResetEpoch(); // the user resets while the pull is in flight
    pull.apply(); // stale pull now resolves

    assert(merged === 0, "stale pull did not merge cloud into local");
    assert(wroteLocal === 0, "stale pull did not write local storage (no reset undo)");
    assert(pushed === 0, "stale pull did not push anything to cloud");
  });

  test("a pull started AFTER the reset (epoch N+1) applies through the normal path", () => {
    __resetPrivacyResetEpochForTest();
    bumpPrivacyResetEpoch(); // reset first
    let merged = 0;
    let wroteLocal = 0;
    let pushed = 0;
    // Fresh pull captures the post-reset epoch.
    const pull = simulateCloudPull({
      merge: () => (merged += 1),
      writeLocal: () => (wroteLocal += 1),
      push: () => (pushed += 1),
    });

    pull.apply(); // resolves with no intervening reset

    assert(merged === 1 && wroteLocal === 1 && pushed === 1, "post-reset pull runs the normal apply path");
  });

  test("no reset mid-flight → the pull applies normally (guard is inert)", () => {
    __resetPrivacyResetEpochForTest();
    let applied = 0;
    const pull = simulateCloudPull({
      merge: () => (applied += 1),
      writeLocal: () => (applied += 1),
      push: () => (applied += 1),
    });
    pull.apply();
    assert(applied === 3, "with no reset, all apply side effects run");
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

    assert(storage.includes("subscribePrivacyReset(resetLocal)"), "useStorage self-heals on reset");
    assert(srs.includes("subscribePrivacyReset(resetLocal)"), "useSRS self-heals on reset (Practice tab)");

    const provider = read("providers/AppProvider.tsx");
    assert(provider.includes("bumpPrivacyResetEpoch()"), "provider engages the barrier + notifies stores");
    assert(provider.includes("resetAllLocalPrivacyData()"), "provider clears the storage inventory");
    assert(provider.includes("resetLocalData"), "provider exposes resetLocalData");

    // PR-H P2-2: the pull effect must capture the epoch BEFORE the pull and
    // discard the result if a reset landed mid-flight, BEFORE applying it.
    const capture = provider.indexOf("const pullEpoch = privacyResetEpoch()");
    const pull = provider.indexOf("await pullFromCloud()");
    const guard = provider.indexOf("isPersistSuppressed(pullEpoch)");
    const writeLocal = provider.indexOf("s.updateStoredData(");
    assert(capture !== -1 && pull !== -1 && guard !== -1 && writeLocal !== -1, "pull effect has capture + guard + apply");
    assert(capture < pull, "pull epoch is captured BEFORE the cloud pull starts");
    assert(guard > pull, "the reset guard runs AFTER the pull resolves");
    assert(guard < writeLocal, "the reset guard runs BEFORE local storage is written");

    const ui = read("components/learning-engine/PrivacyDataControls.tsx");
    assert(ui.includes("resetLocalData"), "PrivacyDataControls routes reset through the provider");

    const repo = read("content/learning-engine/repository/local.ts");
    assert(repo.includes("isPersistSuppressed"), "LocalRepository consults the barrier");
    assert(repo.includes("this.isStaleWriter()"), "LocalRepository write methods are guarded");

    const telemetry = read("content/learning-engine/telemetry.ts");
    assert(telemetry.includes("isPersistSuppressed(this.ackEpoch)"), "TelemetryStore.appendEvent is guarded");
  });
});
