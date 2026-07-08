/**
 * Area 5 — LocalRepository safety (injected in-memory store).
 *
 * Guarantees: append is idempotent by clientEventId, corrupt storage reads as
 * `[]`, markSynced ignores unknown ids, and the repository only ever touches
 * `lm_le_events` / `lm_le_snapshot` — never `lm7` / `lm7_srs`.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv, makeEvent } from "./helpers";
import {
  LocalRepository,
  CorruptEventLogError,
  LM_LE_EVENTS_KEY,
  LM_LE_SNAPSHOT_KEY,
  LM_LE_EVENTS_CORRUPT_KEY,
} from "../../content/learning-engine/repository/local";

describe("Area 5 — LocalRepository safety", () => {
  test("appendEvent is idempotent by clientEventId", async () => {
    const repo = new LocalRepository(makeFakeKv());
    const event = makeEvent({ result: "correct", clientEventId: "same" });
    await repo.appendEvent(event);
    await repo.appendEvent(event);
    const all = await repo.readAllEvents();
    assert(all.length === 1, "duplicate clientEventId must not append twice");
  });

  test("corrupt events parse to [] safely", async () => {
    const repo = new LocalRepository(makeFakeKv({ [LM_LE_EVENTS_KEY]: "garbage{" }));
    const all = await repo.readAllEvents();
    assertEqual(all, [], "corrupt storage must read as empty, no throw");
  });

  // --- PR-A (audit B3): corrupt event log must be non-destructive ---

  test("valid empty-array log reads as [] and still appends (distinct from corrupt)", async () => {
    const store = makeFakeKv({ [LM_LE_EVENTS_KEY]: "[]" });
    const repo = new LocalRepository(store);
    assertEqual(await repo.readAllEvents(), [], "an explicit [] is valid-empty, not corrupt");
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "e1" }));
    assert((await repo.readAllEvents()).length === 1, "append works on a valid-empty log");
    assert(store.map.get(LM_LE_EVENTS_CORRUPT_KEY) === undefined, "no backup for valid-empty");
  });

  test("missing log behaves as first-run empty and appends", async () => {
    const store = makeFakeKv();
    const repo = new LocalRepository(store);
    assertEqual(await repo.readAllEvents(), [], "absent log reads as empty");
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "e1" }));
    assert((await repo.readAllEvents()).length === 1, "append works on a first-run log");
  });

  test("reading a corrupt log backs up the raw blob and preserves the original", async () => {
    const raw = "garbage{";
    const store = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(store);
    await repo.readAllEvents();
    assertEqual(store.map.get(LM_LE_EVENTS_KEY), raw, "corrupt original must NOT be overwritten by a read");
    const backup = store.map.get(LM_LE_EVENTS_CORRUPT_KEY);
    assert(backup !== undefined, "corrupt raw must be preserved under the backup key");
    assertEqual(JSON.parse(backup as string).raw, raw, "backup holds the exact raw blob");
  });

  test("appendEvent fails closed on a corrupt log and does NOT overwrite it", async () => {
    const raw = '{"partial": ';
    const store = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(store);
    let threw: unknown = null;
    try {
      await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "e1" }));
    } catch (err) {
      threw = err;
    }
    assert(threw instanceof CorruptEventLogError, "append on corrupt log must fail closed");
    assertEqual(store.map.get(LM_LE_EVENTS_KEY), raw, "the corrupt original must survive the refused append");
    assert(store.map.get(LM_LE_EVENTS_CORRUPT_KEY) !== undefined, "raw blob preserved in backup");
  });

  test("corrupt-log backup is non-overwriting across repeated reads/appends", async () => {
    const raw = "not-an-array-or-json{";
    const store = makeFakeKv({ [LM_LE_EVENTS_KEY]: raw });
    const repo = new LocalRepository(store);
    await repo.readAllEvents();
    const firstBackup = store.map.get(LM_LE_EVENTS_CORRUPT_KEY);
    // A later corrupt read (e.g. new blob) must not clobber the first capture.
    store.map.set(LM_LE_EVENTS_KEY, "different-corrupt{");
    await repo.readAllEvents();
    assertEqual(
      store.map.get(LM_LE_EVENTS_CORRUPT_KEY),
      firstBackup,
      "first-captured corruption backup is retained",
    );
  });

  test("markSynced ignores unknown ids", async () => {
    const repo = new LocalRepository(makeFakeKv());
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "real" }));
    await repo.markSynced(["does-not-exist"]);
    assert((await repo.getPending()).length === 1, "unknown id must leave the event pending");
    await repo.markSynced(["real"]);
    assert((await repo.getPending()).length === 0, "known id must flip the event to synced");
  });

  test("keys remain lm_le_events / lm_le_snapshot only", async () => {
    const store = makeFakeKv();
    const repo = new LocalRepository(store);
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "k" }));
    await repo.writeSnapshot({ ok: true });
    const allowed = new Set([LM_LE_EVENTS_KEY, LM_LE_SNAPSHOT_KEY]);
    for (const key of store.map.keys()) {
      assert(allowed.has(key), `repository wrote an unexpected key: ${key}`);
    }
  });

  test("no lm7 / lm7_srs access", async () => {
    const store = makeFakeKv({ lm7: "legacy-progress", lm7_srs: "legacy-srs" });
    const repo = new LocalRepository(store);
    await repo.appendEvent(makeEvent({ result: "correct", clientEventId: "k" }));
    await repo.markSynced(["k"]);
    await repo.writeSnapshot({ ok: true });
    await repo.readAllEvents();
    assertEqual(store.map.get("lm7"), "legacy-progress", "lm7 must be untouched");
    assertEqual(store.map.get("lm7_srs"), "legacy-srs", "lm7_srs must be untouched");
  });
});
