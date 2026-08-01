/**
 * LocalRepository event-log migration tests (PR-02, Part D).
 *
 * The storage key is unchanged (`lm_le_events`) and no data may be destroyed to
 * make migration pass. These tests pin the read/write contract: read migrates in
 * memory without rewriting, the first legitimate append normalizes storage, and
 * anything unreadable fails closed with the bytes preserved.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent, makeV1Event } from "./helpers";
import {
  LM_LE_EVENTS_CORRUPT_KEY,
  LM_LE_EVENTS_KEY,
  LocalRepository,
  UnsupportedEventLogError,
} from "../../content/learning-engine/repository/local";
import { LEARNING_EVENT_SCHEMA_VERSION } from "../../content/learning-engine/events";

const v1Log = (...events: Record<string, unknown>[]) => JSON.stringify(events);

async function expectRejects(p: Promise<unknown>, what: string): Promise<unknown> {
  let caught: unknown = null;
  try {
    await p;
  } catch (e) {
    caught = e;
  }
  assert(caught !== null, `expected ${what} to reject`);
  return caught;
}

describe("event log v1 -> v2 read migration", () => {
  test("absent key still reads as empty", async () => {
    const kv = makeFakeKv();
    const repo = new LocalRepository(kv);
    assertEqual((await repo.readAllEvents()).length, 0, "empty first run");
  });

  test("a v1 log reads as migrated v2 events", async () => {
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: v1Log(
        makeV1Event({ result: "correct", clientEventId: "a" }),
        makeV1Event({ result: "wrong_item", clientEventId: "b" }),
      ),
    });
    const events = await new LocalRepository(kv).readAllEvents();
    assertEqual(events.length, 2, "both events read");
    assert(
      events.every((e) => e.schemaVersion === LEARNING_EVENT_SCHEMA_VERSION),
      "every event is v2 in memory",
    );
    assertEqual(events.map((e) => e.clientEventId).join(","), "a,b", "append order preserved");
  });

  test("reading alone does NOT rewrite the raw key", async () => {
    const raw = v1Log(makeV1Event({ result: "correct", clientEventId: "a" }));
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);
    await repo.readAllEvents();
    await repo.getPending();
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), raw, "storage must be byte-identical after reads");
  });

  test("the first append after a v1 read persists a normalized all-v2 log", async () => {
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: v1Log(makeV1Event({ result: "correct", clientEventId: "old" })),
    });
    const repo = new LocalRepository(kv);
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "new" }));
    const stored = JSON.parse(kv.map.get(LM_LE_EVENTS_KEY) as string) as {
      schemaVersion: number;
      clientEventId: string;
    }[];
    assertEqual(stored.length, 2, "old event retained, new one appended");
    assertEqual(stored.map((e) => e.clientEventId).join(","), "old,new", "append order");
    assert(
      stored.every((e) => e.schemaVersion === LEARNING_EVENT_SCHEMA_VERSION),
      "storage normalized to v2",
    );
  });

  test("a mixed v1/v2 log reads deterministically", async () => {
    const v2 = makeEvent({ result: "correct", clientEventId: "v2evt" });
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: JSON.stringify([
        makeV1Event({ result: "correct", clientEventId: "v1evt" }),
        v2,
      ]),
    });
    const events = await new LocalRepository(kv).readAllEvents();
    assertEqual(events.map((e) => e.clientEventId).join(","), "v1evt,v2evt", "order preserved");
    assert(
      events.every((e) => e.schemaVersion === LEARNING_EVENT_SCHEMA_VERSION),
      "all current-version after read",
    );
  });

  test("duplicate clientEventId remains idempotent across the migration boundary", async () => {
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: v1Log(makeV1Event({ result: "correct", clientEventId: "dup" })),
    });
    const repo = new LocalRepository(kv);
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "dup" }));
    const stored = JSON.parse(kv.map.get(LM_LE_EVENTS_KEY) as string) as unknown[];
    assertEqual(stored.length, 1, "a migrated v1 event still de-duplicates a v2 append");
  });

  test("pending / synced behaviour is unchanged after migration", async () => {
    const kv = makeFakeKv({
      [LM_LE_EVENTS_KEY]: v1Log(
        makeV1Event({ result: "correct", clientEventId: "p1" }),
        makeV1Event({
          result: "correct",
          clientEventId: "s1",
          sync: { status: "synced", origin: "local", queuedAt: 1 },
        }),
      ),
    });
    const repo = new LocalRepository(kv);
    const pending = await repo.getPending();
    assertEqual(pending.map((e) => e.clientEventId).join(","), "p1", "only pending returned");
    await repo.markSynced(["p1"]);
    assertEqual((await repo.getPending()).length, 0, "markSynced still works");
  });
});

describe("event log fail-closed behaviour", () => {
  test("a future-version event makes the log unsupported and preserves it", async () => {
    const raw = JSON.stringify([{ ...makeV1Event({ result: "correct" }), schemaVersion: 99 }]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);

    assertEqual((await repo.readAllEvents()).length, 0, "unreadable log reads as empty, not a crash");
    const err = await expectRejects(
      repo.appendEvent(makeEvent({ result: "correct" })),
      "append against an unsupported log",
    );
    assert(err instanceof UnsupportedEventLogError, "must be the distinct unsupported error");
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), raw, "future log must be preserved byte-for-byte");
  });

  test("an unsupported log is NOT treated as JSON corruption", async () => {
    const raw = JSON.stringify([{ ...makeV1Event({ result: "correct" }), schemaVersion: 99 }]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    await new LocalRepository(kv).readAllEvents();
    assertEqual(
      kv.map.get(LM_LE_EVENTS_CORRUPT_KEY),
      undefined,
      "readable-but-unsupported bytes must not be filed as corruption",
    );
  });

  test("a malformed event inside an otherwise valid log fails closed", async () => {
    const raw = JSON.stringify([
      makeV1Event({ result: "correct", clientEventId: "good" }),
      { clientEventId: "bad" },
    ]);
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(kv);
    assertEqual((await repo.readAllEvents()).length, 0, "no partial history is exposed");
    await expectRejects(
      repo.appendEvent(makeEvent({ result: "correct" })),
      "append against a malformed log",
    );
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), raw, "nothing destroyed");
  });

  test("genuinely corrupt JSON still quarantines as before", async () => {
    const kv = makeFakeKv({ [LM_LE_EVENTS_KEY]: "{not json" });
    const repo = new LocalRepository(kv);
    assertEqual((await repo.readAllEvents()).length, 0, "corrupt reads as empty");

    // The backup is an envelope around the raw blob (safeStorage's existing
    // shape) — PR-02 must not change that, only keep the bytes recoverable.
    const backup = JSON.parse(kv.map.get(LM_LE_EVENTS_CORRUPT_KEY) as string) as {
      key: string;
      reason: string;
      raw: string;
    };
    assertEqual(backup.key, LM_LE_EVENTS_KEY, "backup names the original key");
    assertEqual(backup.raw, "{not json", "the raw blob is recoverable");
    assertEqual(
      backup.reason,
      "event-log-not-array-or-unparseable",
      "corruption reason unchanged",
    );
    assertEqual(kv.map.get(LM_LE_EVENTS_KEY), "{not json", "original preserved");
  });
});
