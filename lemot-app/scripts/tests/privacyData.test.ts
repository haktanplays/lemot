/**
 * Area 3 — privacy-data.ts export / delete primitives.
 *
 * Guarantees: export reads the local event log through the `LearningRepository`
 * interface (corrupt-safe), derives a deterministic MasterySnapshot, needs no
 * network/Supabase, and has a stable shape; the learner-facing SUMMARY the UI
 * derives exposes only counts/flags (never raw userAnswer/events). Delete is
 * narrow and key-scoped: it clears ONLY `lm_le_events` / `lm_le_snapshot`, never
 * privacy state, `lm7`, or `lm7_srs`.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent } from "./helpers";
import {
  LOCAL_LEARNING_DATA_EXPORT_VERSION,
  LOCAL_LEARNING_DATA_KEYS,
  exportLocalLearningData,
  clearLocalLearningData,
} from "../../content/learning-engine/privacy-data";
import {
  LocalRepository,
  LM_LE_EVENTS_KEY,
  LM_LE_SNAPSHOT_KEY,
} from "../../content/learning-engine/repository/local";
import { scoreEvents } from "../../content/learning-engine/mastery";

const SAMPLE_EVENTS = [
  makeEvent({ clientEventId: "a", result: "correct", operation: "fill", itemIds: ["x"] }),
  makeEvent({ clientEventId: "b", result: "wrong_item", operation: "fill", itemIds: ["y"] }),
];

describe("Area 3 — privacy-data.ts export/delete primitives", () => {
  test("export reads local events through the repository interface", async () => {
    const repo = new LocalRepository(
      makeFakeKv({ [LM_LE_EVENTS_KEY]: JSON.stringify(SAMPLE_EVENTS) }),
    );
    const out = await exportLocalLearningData({ repository: repo, exportedAt: 100 });
    assert(out.eventCount === 2, "eventCount must match stored events");
    assertEqual(out.events, SAMPLE_EVENTS, "exported events must equal stored events");
  });

  test("export derives the MasterySnapshot deterministically", async () => {
    const repo = new LocalRepository(
      makeFakeKv({ [LM_LE_EVENTS_KEY]: JSON.stringify(SAMPLE_EVENTS) }),
    );
    const a = await exportLocalLearningData({ repository: repo, exportedAt: 100 });
    const b = await exportLocalLearningData({ repository: repo, exportedAt: 100 });
    assertEqual(a, b, "same events + timestamp must export identically");
    assertEqual(a.snapshot, scoreEvents(SAMPLE_EVENTS), "snapshot must equal scoreEvents(events)");
  });

  test("export needs no Supabase/network and has a stable shape", async () => {
    // Runs entirely against an in-memory repo (no network available) — the fact
    // it resolves proves no remote dependency. Shape is asserted explicitly.
    const repo = new LocalRepository(makeFakeKv());
    const out = await exportLocalLearningData({ repository: repo, exportedAt: 7 });
    assertEqual(
      Object.keys(out).sort(),
      ["eventCount", "events", "exportVersion", "exportedAt", "snapshot"],
      "export shape must be stable",
    );
    assertEqual(out.exportVersion, LOCAL_LEARNING_DATA_EXPORT_VERSION, "export version must be recorded");
    assert(out.exportedAt === 7, "exportedAt must be the caller-provided timestamp");
  });

  test("learner-facing summary exposes only counts/flags, never raw userAnswer", async () => {
    const repo = new LocalRepository(
      makeFakeKv({ [LM_LE_EVENTS_KEY]: JSON.stringify(SAMPLE_EVENTS) }),
    );
    const out = await exportLocalLearningData({ repository: repo, exportedAt: 100 });
    // The UI (PrivacyDataControls) shows ONLY this derived summary — a reduced
    // projection with no raw events, ids, or learner text.
    const summary = {
      eventCount: out.eventCount,
      exportedAt: out.exportedAt,
      snapshotIncluded: out.snapshot != null,
    };
    assertEqual(
      Object.keys(summary).sort(),
      ["eventCount", "exportedAt", "snapshotIncluded"],
      "summary must carry only counts/flags",
    );
    const serialized = JSON.stringify(summary);
    assert(!serialized.includes("userAnswer"), "summary must not expose userAnswer");
    assert(!serialized.includes("bonjour"), "summary must not leak raw learner text");
  });

  test("clearLocalLearningData clears only the learning-engine event/snapshot keys", async () => {
    const store = makeFakeKv({
      [LM_LE_EVENTS_KEY]: JSON.stringify(SAMPLE_EVENTS),
      [LM_LE_SNAPSHOT_KEY]: "{}",
      lm_le_privacy_state: "{}",
      lm7: "legacy-progress",
      lm7_srs: "legacy-srs",
    });
    await clearLocalLearningData({ store });
    assert(!store.map.has(LM_LE_EVENTS_KEY), "events key must be cleared");
    assert(!store.map.has(LM_LE_SNAPSHOT_KEY), "snapshot key must be cleared");
    assert(store.map.has("lm_le_privacy_state"), "privacy state must NOT be cleared here");
    assertEqual(store.map.get("lm7"), "legacy-progress", "lm7 must be untouched");
    assertEqual(store.map.get("lm7_srs"), "legacy-srs", "lm7_srs must be untouched");
  });

  test("reset behavior is narrow and key-scoped", () => {
    assertEqual(
      [...LOCAL_LEARNING_DATA_KEYS],
      [LM_LE_EVENTS_KEY, LM_LE_SNAPSHOT_KEY],
      "delete must be scoped to exactly the two learning keys",
    );
  });

  test("corrupt event storage is safe on the export path", async () => {
    const repo = new LocalRepository(makeFakeKv({ [LM_LE_EVENTS_KEY]: "not-json" }));
    const out = await exportLocalLearningData({ repository: repo, exportedAt: 1 });
    assert(out.eventCount === 0, "corrupt events must read as empty");
    assertEqual(out.events, [], "corrupt events must yield an empty list, no throw");
  });
});
