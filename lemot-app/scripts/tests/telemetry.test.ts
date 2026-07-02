/**
 * Telemetry v0 tests (Faz 6A Slice B; contract in CONTENT_FACTORY_CONTRACT §4).
 *
 * Local-only, deterministic, no raw learner text, never touches mastery.
 */
import { describe, test, assert } from "./harness";
import type { KvLike } from "../../content/learning-engine/repository/local";
import {
  TELEMETRY_SCHEMA_VERSION,
  TELEMETRY_EVENT_TYPES,
  LM_LE_TELEMETRY_KEY,
  createTelemetryEvent,
  TelemetryStore,
  lessonCompletionCounts,
  perScreenSeenCounts,
  itemActivityCounts,
  weaveAttemptCounts,
} from "../../content/learning-engine/telemetry";
import type {
  CreateTelemetryEventInput,
  TelemetryEvent,
} from "../../content/learning-engine/telemetry";

const NOW = 1_800_000_000_000;

function memoryStore(): KvLike & { keys(): string[] } {
  const map = new Map<string, string>();
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => {
      map.set(k, v);
    },
    keys: () => [...map.keys()],
  };
}

function ev(
  id: string,
  type: (typeof TELEMETRY_EVENT_TYPES)[number],
  extra: Partial<CreateTelemetryEventInput> = {},
): TelemetryEvent {
  return createTelemetryEvent({
    eventId: id,
    type,
    timestamp: NOW,
    source: "test",
    ...extra,
  });
}

describe("telemetry › event creation", () => {
  test("15 v0 event types exist; repair_* are not among them", () => {
    assert(TELEMETRY_EVENT_TYPES.length === 15, `got ${TELEMETRY_EVENT_TYPES.length}`);
    assert(
      !(TELEMETRY_EVENT_TYPES as readonly string[]).includes("repair_triggered") &&
        !(TELEMETRY_EVENT_TYPES as readonly string[]).includes("repair_completed"),
      "repair_* stay named FUTURE events in v0",
    );
  });

  test("creation is deterministic and stamps the schema version", () => {
    const a = ev("e1", "lesson_started", { lessonId: "v1-lesson-007" });
    const b = ev("e1", "lesson_started", { lessonId: "v1-lesson-007" });
    assert(JSON.stringify(a) === JSON.stringify(b), "same input → same event");
    assert(a.version === TELEMETRY_SCHEMA_VERSION, "version stamped");
    assert(Object.isFrozen(a), "event is frozen");
  });

  test("unknown event type is rejected", () => {
    let threw = false;
    try {
      createTelemetryEvent({
        eventId: "e2",
        type: "repair_triggered" as never,
        timestamp: NOW,
        source: "test",
      });
    } catch {
      threw = true;
    }
    assert(threw, "future/unknown type must be rejected");
  });

  test("raw learner text is rejected by field name", () => {
    for (const key of ["userAnswer", "rawText", "text", "freeText"]) {
      let threw = false;
      try {
        createTelemetryEvent({
          eventId: "e3",
          type: "answer_submitted",
          timestamp: NOW,
          source: "test",
          [key]: "je ne suis pas ici",
        } as never);
      } catch {
        threw = true;
      }
      assert(threw, `field "${key}" must be rejected`);
    }
  });

  test("unknown extra fields are rejected (allowlist)", () => {
    let threw = false;
    try {
      createTelemetryEvent({
        eventId: "e4",
        type: "screen_seen",
        timestamp: NOW,
        source: "test",
        surprise: "x",
      } as never);
    } catch {
      threw = true;
    }
    assert(threw, "unknown fields must be rejected");
  });

  test("required fields validated; sentence-like resultTag rejected", () => {
    for (const bad of [
      { eventId: "", type: "screen_seen", timestamp: NOW, source: "test" },
      { eventId: "e5", type: "screen_seen", timestamp: Number.NaN, source: "test" },
      { eventId: "e6", type: "screen_seen", timestamp: NOW, source: "" },
    ]) {
      let threw = false;
      try {
        createTelemetryEvent(bad as never);
      } catch {
        threw = true;
      }
      assert(threw, `invalid input ${JSON.stringify(bad)} must be rejected`);
    }
    let threw = false;
    try {
      ev("e7", "answer_submitted", { resultTag: "je ne suis pas ici pour parler" });
    } catch {
      threw = true;
    }
    assert(threw, "free-text-shaped resultTag must be rejected");
    const ok = ev("e8", "answer_submitted", { resultTag: "neutral_compare" });
    assert(ok.resultTag === "neutral_compare", "machine tags pass");
  });

  test("input is not mutated", () => {
    const input = {
      eventId: "e9",
      type: "item_seen" as const,
      timestamp: NOW,
      source: "test" as const,
      itemId: "chunk-je-vais",
    };
    const before = JSON.stringify(input);
    ev("e9", "item_seen", { itemId: "chunk-je-vais" });
    assert(JSON.stringify(input) === before, "input mutated");
  });
});

describe("telemetry › local store", () => {
  test("append/read works against an injected in-memory store; idempotent by eventId", async () => {
    const kv = memoryStore();
    const store = new TelemetryStore(kv);
    await store.appendEvent(ev("t1", "lesson_started", { lessonId: "v1-lesson-007" }));
    await store.appendEvent(ev("t1", "lesson_started", { lessonId: "v1-lesson-007" }));
    await store.appendEvent(ev("t2", "lesson_completed", { lessonId: "v1-lesson-007" }));
    const all = await store.readAllEvents();
    assert(all.length === 2, `idempotency: expected 2, got ${all.length}`);
    assert(all[0].eventId === "t1" && all[1].eventId === "t2", "append order kept");
  });

  test("uses only its own namespaced key (no lm7 / lm_le_events collision)", async () => {
    const kv = memoryStore();
    const store = new TelemetryStore(kv);
    await store.appendEvent(ev("t3", "lexique_opened"));
    assert(
      kv.keys().length === 1 && kv.keys()[0] === LM_LE_TELEMETRY_KEY,
      `keys: ${kv.keys().join(",")}`,
    );
  });

  test("corrupt storage fails safe to empty", async () => {
    const kv = memoryStore();
    kv.setItem(LM_LE_TELEMETRY_KEY, "{not json");
    const store = new TelemetryStore(kv);
    const all = await store.readAllEvents();
    assert(all.length === 0, "corrupt store must read as empty");
  });

  test("store surface has no drain/sync path", () => {
    const store = new TelemetryStore(memoryStore());
    assert(
      !("getPending" in store) && !("markSynced" in store),
      "telemetry is local-only: no pending/synced surface",
    );
  });
});

describe("telemetry › content-debug summaries", () => {
  const sample = [
    ev("s1", "lesson_started", { lessonId: "L7" }),
    ev("s2", "screen_seen", { lessonId: "L7", screenId: "s01" }),
    ev("s3", "screen_seen", { lessonId: "L7", screenId: "s02" }),
    ev("s4", "screen_seen", { lessonId: "L7", screenId: "s01" }),
    ev("s5", "item_seen", { itemId: "chunk-je-vais" }),
    ev("s6", "item_produced", { itemId: "chunk-je-vais" }),
    ev("s7", "item_recognized", { itemId: "chunk-a-la-maison" }),
    ev("s8", "weave_attempted", { lessonId: "L7" }),
    ev("s9", "weave_attempted", { lessonId: "L7" }),
    ev("s10", "lesson_completed", { lessonId: "L7" }),
    ev("s11", "lesson_started", { lessonId: "L8" }),
  ];

  test("lesson completion funnel", () => {
    const f = lessonCompletionCounts(sample);
    assert(f.L7.started === 1 && f.L7.completed === 1, `L7 ${JSON.stringify(f.L7)}`);
    assert(f.L8.started === 1 && f.L8.completed === 0, "L8 started only");
  });

  test("per-screen seen counts (drop-off source)", () => {
    const s = perScreenSeenCounts(sample);
    assert(s.L7.s01 === 2 && s.L7.s02 === 1, JSON.stringify(s));
  });

  test("item activity counts", () => {
    const i = itemActivityCounts(sample);
    assert(i["chunk-je-vais"].seen === 1 && i["chunk-je-vais"].produced === 1, "je-vais");
    assert(i["chunk-a-la-maison"].recognized === 1, "a-la-maison");
  });

  test("weave attempt counts; summaries do not mutate input", () => {
    const before = JSON.stringify(sample);
    const w = weaveAttemptCounts(sample);
    assert(w.L7 === 2 && w.L8 === undefined, JSON.stringify(w));
    assert(JSON.stringify(sample) === before, "summaries mutated events");
  });
});
