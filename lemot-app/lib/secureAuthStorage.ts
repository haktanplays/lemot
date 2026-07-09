/**
 * Chunked, migrating auth-token storage (PR-D, audit B19).
 *
 * Supabase persists the auth session — access JWT + refresh token + user — as a
 * single string value through a storage adapter (`getItem`/`setItem`/
 * `removeItem`). Before this change the native adapter was plaintext KV
 * (`expo-sqlite/kv-store`), so tokens sat unencrypted at rest even though
 * `expo-secure-store` is declared. This module wraps an injected SecureStore
 * backend so the session lives in the OS keychain/keystore instead.
 *
 * Two things make that safe in practice:
 *  1. **Chunking.** SecureStore caps a single value at ~2048 bytes, and a session
 *     blob routinely exceeds that. The value is split across `${key}.0..N-1`; a
 *     small manifest under `${key}` records the chunk count. Reads reassemble.
 *  2. **Best-effort migration.** On first read after upgrade, SecureStore is
 *     empty; if a plaintext session still sits in the legacy KV, it is returned
 *     AND copied into SecureStore, then the plaintext copy is removed. If the
 *     secure write fails, the value is still returned and the plaintext is left
 *     for a later retry — migration is NEVER fatal and never traps auth loading.
 *
 * Pure & runtime-agnostic: NO expo / react-native imports, so the Node harness
 * exercises the chunking + migration logic with in-memory fakes. `lib/supabase.ts`
 * supplies the real SecureStore + KV backends on native; web keeps plaintext KV
 * (SecureStore is unavailable on web) and never constructs this adapter.
 *
 * Scope: this is the AUTH-TOKEN adapter only. It does NOT move lesson progress,
 * learning events, telemetry, or any other app data into SecureStore.
 */

/** The async SecureStore surface this adapter needs (expo-secure-store satisfies it). */
export interface SecureBackend {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
}

/** The legacy plaintext KV surface migrated FROM (the app's `kvStorage` satisfies it). */
export interface LegacyKvBackend {
  getItem(key: string): string | null | Promise<string | null>;
  removeItem(key: string): void | Promise<void>;
}

/** The storage adapter Supabase auth consumes (`SupportedStorage`-compatible). */
export interface AuthStorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

/**
 * Per-chunk size. SecureStore's hard per-value limit is 2048 bytes; 1800 leaves
 * headroom for the occasional multi-byte character (tokens themselves are ASCII).
 */
export const SECURE_CHUNK_SIZE = 1800;

/**
 * Prefix marking a `${key}` slot as a chunk-count manifest (vs. a full value a
 * prior non-chunking build may have written directly). Disambiguates cleanly:
 * a real Supabase session value is JSON and never starts with this token.
 */
export const MANIFEST_PREFIX = "__lm_chunks__:";

/** Consecutive absent indices that end a cleanup sweep (tolerates small holes). */
const SWEEP_MISS_TOLERANCE = 4;
/** Absolute index ceiling so a sweep can never loop unbounded on a pathological store. */
const SWEEP_HARD_CAP = 4096;

const chunkKey = (key: string, i: number): string => `${key}.${i}`;

function splitIntoChunks(value: string, size: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < value.length; i += size) out.push(value.slice(i, i + size));
  // An empty value still round-trips as a single empty chunk (count = 1).
  return out.length > 0 ? out : [""];
}

/**
 * Build a chunked, migrating auth-token storage adapter over the given backends.
 * All three methods are fail-soft: `getItem` never throws (so a keychain hiccup
 * can never trap the auth loading state — it degrades to "no session"), and the
 * cleanup / legacy-removal steps swallow their own errors.
 */
export function createChunkedSecureStorage(deps: {
  secure: SecureBackend;
  legacy: LegacyKvBackend;
  chunkSize?: number;
}): AuthStorageAdapter {
  const { secure, legacy } = deps;
  const chunkSize = deps.chunkSize && deps.chunkSize > 0 ? deps.chunkSize : SECURE_CHUNK_SIZE;

  /**
   * Delete chunk keys `${key}.i` for i ≥ `start`, walking upward until
   * `SWEEP_MISS_TOLERANCE` consecutive indices are absent (hard-capped).
   *
   * Cleanup deliberately does NOT trust the manifest count: a prior shorter
   * overwrite lowers the manifest before pruning stale higher-index chunks, so
   * an interrupted prune (app killed / a transient delete failure) can leave
   * `.N`, `.N+1`, … fragments with a manifest that undercounts them. Sweeping the
   * contiguous run — with a small tolerance for holes — guarantees a
   * sign-out/overwrite removes every token fragment, never orphaning secrets in
   * the keychain (audit B19 / PR review P2). Best-effort per key; never throws.
   */
  async function sweepChunksFrom(key: string, start: number): Promise<void> {
    let misses = 0;
    for (let i = start; misses < SWEEP_MISS_TOLERANCE && i < SWEEP_HARD_CAP; i++) {
      let existed = false;
      try {
        existed = (await secure.getItemAsync(chunkKey(key, i))) !== null;
      } catch {
        existed = false;
      }
      if (existed) {
        misses = 0;
        try {
          await secure.deleteItemAsync(chunkKey(key, i));
        } catch {
          /* best-effort */
        }
      } else {
        misses += 1;
      }
    }
  }

  /** Write `value` as chunks + manifest, then sweep away any stale higher-index chunks. */
  async function writeChunks(key: string, value: string): Promise<void> {
    const chunks = splitIntoChunks(value, chunkSize);
    // Chunks first, then the manifest: a torn write never leaves a valid count
    // pointing at a missing chunk (a read of missing chunks fails soft anyway).
    for (let i = 0; i < chunks.length; i++) {
      await secure.setItemAsync(chunkKey(key, i), chunks[i]);
    }
    await secure.setItemAsync(key, MANIFEST_PREFIX + String(chunks.length));
    // Robustly drop any stale chunks left by a previous, longer value — the
    // sweep does not rely on the (already-updated) manifest count.
    await sweepChunksFrom(key, chunks.length);
  }

  /** Best-effort one-time migration of a legacy plaintext session into SecureStore. */
  async function migrateFromLegacy(key: string): Promise<string | null> {
    let legacyValue: string | null = null;
    try {
      legacyValue = await legacy.getItem(key);
    } catch {
      legacyValue = null;
    }
    if (legacyValue === null || legacyValue.length === 0) return null;
    try {
      await writeChunks(key, legacyValue);
      // Only drop the plaintext copy once the secure write succeeded.
      try {
        await legacy.removeItem(key);
      } catch {
        /* leave plaintext for a later retry; non-fatal */
      }
    } catch {
      // Secure write failed: keep the plaintext in place and still return the
      // value so the existing session survives this launch.
    }
    return legacyValue;
  }

  return {
    async getItem(key: string): Promise<string | null> {
      try {
        const manifest = await secure.getItemAsync(key);
        if (manifest !== null) {
          if (!manifest.startsWith(MANIFEST_PREFIX)) {
            // A prior build wrote a full value directly under `key`; return as-is.
            return manifest;
          }
          const count = parseInt(manifest.slice(MANIFEST_PREFIX.length), 10);
          if (!Number.isFinite(count) || count < 1) return null;
          let out = "";
          for (let i = 0; i < count; i++) {
            const part = await secure.getItemAsync(chunkKey(key, i));
            if (part === null) return null; // torn/partial write → no session
            out += part;
          }
          return out;
        }
        // Nothing secure yet → try to adopt a legacy plaintext session once.
        return await migrateFromLegacy(key);
      } catch {
        return null; // fail soft: never trap the auth loading state
      }
    },

    async setItem(key: string, value: string): Promise<void> {
      await writeChunks(key, value);
      // Any superseded plaintext copy is best-effort removed.
      try {
        await legacy.removeItem(key);
      } catch {
        /* non-fatal */
      }
    },

    async removeItem(key: string): Promise<void> {
      // Sweep the whole contiguous chunk run (ignoring the manifest count, which
      // may undercount after an interrupted prune) so sign-out leaves no token
      // fragment behind, then drop the manifest and any legacy plaintext copy.
      await sweepChunksFrom(key, 0);
      try {
        await secure.deleteItemAsync(key);
      } catch {
        /* best-effort */
      }
      try {
        await legacy.removeItem(key);
      } catch {
        /* best-effort */
      }
    },
  };
}
