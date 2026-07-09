/**
 * PR-D (audit B19) — chunked, migrating auth-token storage.
 *
 * The real adapter lives in `lib/secureAuthStorage.ts` and is pure (no expo /
 * react-native), so the chunking + migration logic is exercised here directly
 * with in-memory fakes. `lib/supabase.ts` wires the real SecureStore + KV
 * backends on native (web keeps plaintext KV); that platform wiring is
 * type-checked, not harness-run.
 *
 * Guarantees: round-trip of small and over-cap values; SecureStore's ~2048-byte
 * per-value cap is respected via chunking; a legacy plaintext session is migrated
 * best-effort (copied in, plaintext removed) and migration is NON-FATAL; getItem
 * never throws (so auth loading can't trap); removeItem clears every chunk +
 * manifest + the legacy copy; a shorter overwrite prunes stale chunks.
 */
import { describe, test, assert, assertEqual } from "./harness";
import { makeFakeKv } from "./helpers";
import {
  createChunkedSecureStorage,
  MANIFEST_PREFIX,
  SECURE_CHUNK_SIZE,
  type SecureBackend,
} from "../../lib/secureAuthStorage";

type FakeSecure = SecureBackend & { map: Map<string, string> };

function makeFakeSecure(
  initial?: Record<string, string>,
  opts?: { failWrites?: boolean; failAll?: boolean },
): FakeSecure {
  const map = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    map,
    getItemAsync: async (k: string) => {
      if (opts?.failAll) throw new Error("secure unavailable");
      return map.has(k) ? (map.get(k) as string) : null;
    },
    setItemAsync: async (k: string, v: string) => {
      if (opts?.failWrites || opts?.failAll) throw new Error("secure write failed");
      map.set(k, v);
    },
    deleteItemAsync: async (k: string) => {
      if (opts?.failAll) throw new Error("secure unavailable");
      map.delete(k);
    },
  };
}

const KEY = "sb-abc-auth-token";

describe("PR-D — chunked secure auth storage (B19)", () => {
  test("round-trips a small value through SecureStore", async () => {
    const secure = makeFakeSecure();
    const legacy = makeFakeKv();
    const store = createChunkedSecureStorage({ secure, legacy });
    await store.setItem(KEY, '{"access_token":"jwt"}');
    assert(secure.map.get(KEY) === MANIFEST_PREFIX + "1", "manifest records 1 chunk");
    assert(secure.map.has(`${KEY}.0`), "chunk 0 written");
    assertEqual(await store.getItem(KEY), '{"access_token":"jwt"}', "round-trips exactly");
  });

  test("chunks an over-cap value and reassembles it (respects the 2048B cap)", async () => {
    const secure = makeFakeSecure();
    const legacy = makeFakeKv();
    const store = createChunkedSecureStorage({ secure, legacy, chunkSize: 4 });
    const value = "abcdefghij"; // 10 chars @ size 4 → 3 chunks
    await store.setItem(KEY, value);
    assert(secure.map.get(KEY) === MANIFEST_PREFIX + "3", "manifest records 3 chunks");
    for (const part of ["abcd", "efgh", "ij"]) {
      assert([...secure.map.values()].includes(part), `chunk ${part} stored`);
    }
    // No single stored value exceeds the configured chunk size.
    for (const [k, v] of secure.map) {
      if (k === KEY) continue; // manifest, not a chunk
      assert(v.length <= 4, "no chunk exceeds the size cap");
    }
    assertEqual(await store.getItem(KEY), value, "reassembles the full value");
  });

  test("the default chunk size stays under SecureStore's 2048-byte limit", () => {
    assert(SECURE_CHUNK_SIZE <= 2048, "chunk size must fit SecureStore");
  });

  test("migrates a legacy plaintext session into SecureStore, then removes plaintext", async () => {
    const secure = makeFakeSecure();
    const legacy = makeFakeKv({ [KEY]: '{"refresh_token":"old"}' });
    const store = createChunkedSecureStorage({ secure, legacy });
    const got = await store.getItem(KEY);
    assertEqual(got, '{"refresh_token":"old"}', "returns the migrated value");
    assert(secure.map.get(KEY) === MANIFEST_PREFIX + "1", "value copied into SecureStore");
    assert(!legacy.map.has(KEY), "plaintext copy removed after successful migration");
    // Second read comes straight from SecureStore (legacy already gone).
    assertEqual(await store.getItem(KEY), '{"refresh_token":"old"}', "still readable next launch");
  });

  test("migration is non-fatal: secure write failure keeps plaintext and still returns the value", async () => {
    const secure = makeFakeSecure(undefined, { failWrites: true });
    const legacy = makeFakeKv({ [KEY]: '{"refresh_token":"old"}' });
    const store = createChunkedSecureStorage({ secure, legacy });
    const got = await store.getItem(KEY);
    assertEqual(got, '{"refresh_token":"old"}', "session survives a failed migration");
    assert(legacy.map.has(KEY), "plaintext retained for a later retry");
  });

  test("getItem never throws (fail-soft) so auth loading cannot trap", async () => {
    const secure = makeFakeSecure(undefined, { failAll: true });
    const legacy = makeFakeKv();
    const store = createChunkedSecureStorage({ secure, legacy });
    assertEqual(await store.getItem(KEY), null, "hard secure failure degrades to no session");
  });

  test("absent value reads as null", async () => {
    const store = createChunkedSecureStorage({ secure: makeFakeSecure(), legacy: makeFakeKv() });
    assertEqual(await store.getItem(KEY), null, "no session → null");
  });

  test("removeItem clears every chunk, the manifest, and the legacy copy", async () => {
    const secure = makeFakeSecure();
    const legacy = makeFakeKv({ [KEY]: "leftover" });
    const store = createChunkedSecureStorage({ secure, legacy, chunkSize: 4 });
    await store.setItem(KEY, "abcdefghij");
    await store.removeItem(KEY);
    assert(secure.map.size === 0, "all secure chunks + manifest removed");
    assert(!legacy.map.has(KEY), "legacy copy removed too");
    assertEqual(await store.getItem(KEY), null, "reads as null after removal");
  });

  test("a shorter overwrite prunes stale higher-index chunks", async () => {
    const secure = makeFakeSecure();
    const legacy = makeFakeKv();
    const store = createChunkedSecureStorage({ secure, legacy, chunkSize: 4 });
    await store.setItem(KEY, "abcdefghij"); // 3 chunks
    await store.setItem(KEY, "xy"); // 1 chunk — must drop .1 and .2
    assert(secure.map.get(KEY) === MANIFEST_PREFIX + "1", "manifest shrinks to 1");
    assert(!secure.map.has(`${KEY}.1`), "stale chunk .1 pruned");
    assert(!secure.map.has(`${KEY}.2`), "stale chunk .2 pruned");
    assertEqual(await store.getItem(KEY), "xy", "reads the new shorter value cleanly");
  });

  test("a legacy full value written directly under the key still reads back", async () => {
    // Defensive: a hypothetical prior build that wrote the whole value under the
    // key (no manifest) must not read as a chunk count.
    const secure = makeFakeSecure({ [KEY]: '{"access_token":"direct"}' });
    const store = createChunkedSecureStorage({ secure, legacy: makeFakeKv() });
    assertEqual(await store.getItem(KEY), '{"access_token":"direct"}', "non-manifest value returned as-is");
  });
});
