/**
 * PR-I1 — remote-erase recovery marker (audit C1, no automatic second-device wipe).
 *
 * The marker is user-bound and blocks sync until the OWNING user explicitly
 * confirms. These verify hydration (absent/own/foreign/corrupt/unreadable),
 * persist/clear, and that a foreign/corrupt marker blocks but is not actionable
 * and is never reinterpreted.
 */
import { describe, test, assert } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  LM_REMOTE_ERASE_RECOVERY_KEY,
  isRemoteErasePending,
  remoteEraseRecovery,
  hydrateRemoteEraseRecovery,
  persistRemoteEraseRecovery,
  clearRemoteEraseRecovery,
  __resetRemoteEraseRecoveryForTest,
} from "../../lib/remoteEraseRecovery";

const rec = (userId: string, targetGeneration: number) =>
  JSON.stringify({ version: 1, userId, targetGeneration });

describe("PR-I1 — remote-erase recovery marker", () => {
  test("absent → no recovery pending", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: makeFakeKv() });
    assert(!isRemoteErasePending(), "no marker → not pending");
    assert(remoteEraseRecovery() === null, "no actionable record");
  });

  test("own valid marker → actionable pending", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-a", 4) }),
    });
    assert(isRemoteErasePending(), "own marker → pending");
    const r = remoteEraseRecovery();
    assert(r != null && r.userId === "user-a" && r.targetGeneration === 4, "actionable record for owner");
  });

  test("foreign marker → pending (blocked) but NOT actionable, not overwritten", async () => {
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: rec("user-b", 7) });
    await hydrateRemoteEraseRecovery({ userId: "user-a", store: kv });
    assert(isRemoteErasePending(), "foreign marker still blocks sync (fail closed)");
    assert(remoteEraseRecovery() === null, "not actionable under a different user");
    assert(kv.map.get(LM_REMOTE_ERASE_RECOVERY_KEY) === rec("user-b", 7), "foreign marker not reinterpreted/overwritten");
  });

  test("corrupt marker → pending (blocked), not actionable", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: makeFakeKv({ [LM_REMOTE_ERASE_RECOVERY_KEY]: "{broken" }),
    });
    assert(isRemoteErasePending() && remoteEraseRecovery() === null, "corrupt → blocked, not actionable");
  });

  test("read failure → pending (fail closed)", async () => {
    __resetRemoteEraseRecoveryForTest();
    await hydrateRemoteEraseRecovery({
      userId: "user-a",
      store: {
        getItem: () => {
          throw new Error("read failed");
        },
        setItem: () => {},
        removeItem: () => {},
      },
    });
    assert(isRemoteErasePending(), "unreadable → fail closed (blocked)");
  });

  test("persist then clear", async () => {
    __resetRemoteEraseRecoveryForTest();
    const kv = makeFakeKv();
    await persistRemoteEraseRecovery({ userId: "user-a", targetGeneration: 2, store: kv });
    assert(isRemoteErasePending(), "persisted → pending");
    assert(kv.map.get(LM_REMOTE_ERASE_RECOVERY_KEY) === rec("user-a", 2), "user-bound marker persisted");
    await clearRemoteEraseRecovery(kv);
    assert(!isRemoteErasePending() && !kv.map.has(LM_REMOTE_ERASE_RECOVERY_KEY), "cleared");
  });
});
