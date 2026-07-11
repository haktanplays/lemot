/**
 * Local mirror of the server sync generation (PR-I1, audit C1 — durable delete),
 * USER-BOUND so one account's acknowledged generation can never be used for
 * another.
 *
 * Stored record: `{ version: 1, userId, generation }`. On hydration:
 *   - absent          → baseline 0 for this user, READY;
 *   - own valid record→ that generation, READY;
 *   - other user's / corrupt record → NOT READY (fail closed). We do NOT
 *     overwrite it; sync stays blocked until the owning user resolves it.
 *
 * A read failure also fails closed (NOT READY). `blockSyncGeneration()` lets the
 * admission layer fail closed on a `local > server` mismatch or a generation
 * fetch failure. Writes stamp `syncGeneration()`, which the server verifies with
 * exact equality — so even a wrong local value cannot resurrect data server-side.
 *
 * Pure + harness-testable: reads are synchronous in-memory; persistence takes an
 * injectable store and lazily loads the real `kvStorage`.
 */

export const LM_SYNC_GENERATION_KEY = "lm_sync_generation";

type SyncGenerationRecord = { version: 1; userId: string; generation: number };

let userId: string | null = null;
let generation = 0;
let ready = false;

export type SyncGenerationKv = {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
};

async function loadKv(): Promise<SyncGenerationKv> {
  const mod = await import("./storage");
  return mod.kvStorage as SyncGenerationKv;
}

function parse(raw: string): SyncGenerationRecord | null {
  try {
    const v = JSON.parse(raw) as Partial<SyncGenerationRecord>;
    if (
      v &&
      v.version === 1 &&
      typeof v.userId === "string" &&
      typeof v.generation === "number" &&
      Number.isFinite(v.generation) &&
      v.generation >= 0
    ) {
      return { version: 1, userId: v.userId, generation: v.generation };
    }
  } catch {
    /* fall through */
  }
  return null;
}

/** The generation to stamp on outgoing cloud writes (meaningful only when ready). */
export function syncGeneration(): number {
  return generation;
}

/** True when hydrated with THIS user's own (or a fresh baseline) generation. */
export function isSyncGenerationReady(): boolean {
  return ready;
}

/** The user id this generation is bound to (or null before hydration). */
export function syncGenerationUserId(): string | null {
  return userId;
}

/**
 * Load the acknowledged generation for `forUserId`. Absent → baseline 0 (ready);
 * own valid → that value (ready); other-user/corrupt/read-failure → NOT ready
 * (fail closed) without overwriting the stored record.
 */
export async function hydrateSyncGeneration(args: {
  userId: string;
  store?: SyncGenerationKv;
}): Promise<{ generation: number; ready: boolean }> {
  userId = args.userId;
  try {
    const kv = args.store ?? (await loadKv());
    const raw = await kv.getItem(LM_SYNC_GENERATION_KEY);
    if (raw == null || raw === "") {
      generation = 0;
      ready = true; // fresh baseline for this user
    } else {
      const rec = parse(raw);
      if (rec && rec.userId === args.userId) {
        generation = rec.generation;
        ready = true;
      } else {
        generation = 0;
        ready = false; // another user's or corrupt record → fail closed
      }
    }
  } catch {
    generation = 0;
    ready = false; // read failure → fail closed
  }
  return { generation, ready };
}

/**
 * Persist + adopt a generation for `forUserId` (AFTER local reset when adopting a
 * higher one — the cleanup-before-acknowledgement invariant is enforced by
 * callers). Persists BEFORE updating memory; a persistence failure throws.
 */
export async function setSyncGeneration(args: {
  userId: string;
  generation: number;
  store?: SyncGenerationKv;
}): Promise<void> {
  const kv = args.store ?? (await loadKv());
  const record: SyncGenerationRecord = {
    version: 1,
    userId: args.userId,
    generation: args.generation,
  };
  await kv.setItem(LM_SYNC_GENERATION_KEY, JSON.stringify(record));
  userId = args.userId;
  generation = args.generation;
  ready = true;
}

/** Fail closed (e.g. local > server, or a generation fetch failed). */
export function blockSyncGeneration(): void {
  ready = false;
}

/** TEST-ONLY: reset to the pre-hydration (fail-closed) state. */
export function __resetSyncGenerationForTest(): void {
  userId = null;
  generation = 0;
  ready = false;
}
