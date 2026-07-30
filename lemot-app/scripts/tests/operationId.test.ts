/**
 * PR-I1 — deletion operation-id generation (audit C1).
 *
 * The server's `p_op_id` / `operation_id` are Postgres `uuid` columns, so every
 * generated id must be a valid RFC4122 UUIDv4 — with NO non-UUID fallback (a
 * malformed source THROWS instead). Also proves the id accepted into the durable
 * pending record is exactly the id a retry reuses.
 */
import { describe, test, assert } from "./harness";
import { randomUUID } from "node:crypto";
import { makeFakeKv } from "./helpers";
import {
  makeOperationId,
  isUuidV4,
  __setUuidSourceForTest,
} from "../../lib/operationId";
import {
  hydrateCloudEraseGuard,
  armCloudErase,
  cloudErasePendingOpId,
  __resetCloudEraseGuardForTest,
} from "../../lib/cloudEraseGuard";

describe("PR-I1 — operation ids are validated RFC4122 UUIDv4", () => {
  test("generated ids satisfy the UUIDv4 shape (version 4, variant 8/9/a/b)", async () => {
    __setUuidSourceForTest(() => randomUUID());
    for (let i = 0; i < 25; i++) {
      const id = await makeOperationId();
      assert(isUuidV4(id), `generated id is a valid UUIDv4 (got ${id})`);
    }
    __setUuidSourceForTest(null);
  });

  test("a source producing a non-UUID THROWS — there is no op-... fallback", async () => {
    __setUuidSourceForTest(() => "op-lznx3-abc12345"); // the removed legacy shape
    let threw = false;
    try {
      await makeOperationId();
    } catch {
      threw = true;
    }
    assert(threw, "non-UUID output fails closed instead of being sent to a uuid column");
    __setUuidSourceForTest(null);
  });

  test("the pattern itself rejects legacy fallback shapes and non-v4 uuids", () => {
    assert(!isUuidV4("op-lznx3-abc12345"), "legacy op-... shape rejected");
    assert(!isUuidV4("12345678-1234-1234-1234-123456789012"), "version nibble must be 4");
    assert(!isUuidV4("12345678-1234-4234-c234-123456789012"), "variant nibble must be 8/9/a/b");
    assert(isUuidV4("12345678-1234-4234-a234-123456789012"), "well-formed v4 accepted");
  });

  test("the id in the durable pending record is exactly the id a retry reuses", async () => {
    __resetCloudEraseGuardForTest();
    __setUuidSourceForTest(() => randomUUID());
    const kv = makeFakeKv();
    await hydrateCloudEraseGuard(kv);
    const opId = await makeOperationId();
    await armCloudErase({ userId: "user-a", opId, store: kv, drainTimeoutMs: 10_000 });
    assert(cloudErasePendingOpId() === opId, "durable record carries the exact generated id");

    // "Restart": rehydrate from storage — the same id is what a retry sends.
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(kv);
    assert(cloudErasePendingOpId() === opId, "retry after restart reuses the identical UUID");
    assert(isUuidV4(cloudErasePendingOpId()!), "and it is still a valid UUIDv4");
    __setUuidSourceForTest(null);
    // Restore the clean baseline for later suites.
    __resetCloudEraseGuardForTest();
    await hydrateCloudEraseGuard(makeFakeKv());
  });
});
