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
  LM_LE_EVENTS_KEY,
  LM_LE_SNAPSHOT_KEY,
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
