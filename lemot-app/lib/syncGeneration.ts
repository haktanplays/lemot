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

/**
 * Codex P1 (stale hydration protection — same pattern as cloudEraseGuard).
 * `hydrationAttempt` increases when a hydration starts (only the newest may
 * apply its result); `mutationRevision` changes synchronously on every OTHER
 * intentional mutation (acknowledge, block, test reset). A hydration result —
 * absent, own, foreign, corrupt, or a read REJECTION — is applied only when
 * both captured values are still current AND the module is still bound to the
 * requested user; otherwise it is discarded without touching state or storage,
 * so an older user's read can never overwrite a newer user's generation/ready
 * state, reopen a blocked generation, or roll back a newer same-user
 * acknowledgement.
 */
let hydrationAttempt = 0;
let mutationRevision = 0;

function touchSyncGeneration(): void {
  mutationRevision += 1;
}

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
 *
 * The rebind is SYNCHRONOUSLY fail-closed: the requested user becomes the bound
 * owner and the previous user's generation stops being usable BEFORE the async
 * read — there is never a window where `syncGenerationUserId()` is the new user
 * while `ready`/`syncGeneration()` still belong to the previous one. STALE
 * results are discarded (Codex P1): the result — including a read rejection —
 * applies only if this is still the newest hydration, the module is still
 * bound to the same requested user, and no other intentional mutation
 * (acknowledge/block/reset) happened while the read was in flight. A discarded
 * hydration changes nothing and returns the current authoritative snapshot.
 */
export async function hydrateSyncGeneration(args: {
  userId: string;
  store?: SyncGenerationKv;
}): Promise<{ generation: number; ready: boolean }> {
  hydrationAttempt += 1;
  const attempt = hydrationAttempt;
  userId = args.userId;
  generation = 0;
  ready = false; // fail closed while the read is in flight
  const revisionAtStart = mutationRevision;
  const isStale = () =>
    attempt !== hydrationAttempt ||
    revisionAtStart !== mutationRevision ||
    userId !== args.userId;
  try {
    const kv = args.store ?? (await loadKv());
    const raw = await kv.getItem(LM_SYNC_GENERATION_KEY);
    if (isStale()) return { generation, ready }; // discard: authoritative snapshot
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
    if (isStale()) return { generation, ready }; // a stale REJECTION is discarded too
    generation = 0;
    ready = false; // read failure → fail closed
  }
  return { generation, ready };
}

/**
 * Persist + adopt a generation for `forUserId` (AFTER local reset when adopting a
 * higher one — the cleanup-before-acknowledgement invariant is enforced by
 * callers). Persists BEFORE updating memory; a persistence failure throws.
 *
 * In-flight hydrations are invalidated TWICE (Codex follow-up): synchronously
 * at START (with `ready` dropped, so an old read resolving mid-persist cannot
 * reopen the previous readiness — the window is fail-closed) and again on
 * successful COMPLETION (so a hydration that started DURING the persist cannot
 * overwrite the adopted result). On failure nothing is adopted, `ready` stays
 * false, and the start-side bump keeps older reads discarded.
 */
export async function setSyncGeneration(args: {
  userId: string;
  generation: number;
  store?: SyncGenerationKv;
}): Promise<void> {
  touchSyncGeneration(); // invalidate reads already in flight
  ready = false; // fail closed while the durable write is unresolved
  const record: SyncGenerationRecord = {
    version: 1,
    userId: args.userId,
    generation: args.generation,
  };
  try {
    const kv = args.store ?? (await loadKv());
    await kv.setItem(LM_SYNC_GENERATION_KEY, JSON.stringify(record));
  } catch (e) {
    // Failure-side invalidation: a hydration that STARTED during the failed
    // persist window must not later apply (it could reopen readiness from a
    // stale durable record). Nothing is adopted; readiness stays closed.
    touchSyncGeneration();
    ready = false;
    throw e;
  }
  touchSyncGeneration(); // invalidate reads that started DURING the persist
  userId = args.userId;
  generation = args.generation;
  ready = true;
}

/** Fail closed (e.g. local > server, or a generation fetch failed). */
export function blockSyncGeneration(): void {
  touchSyncGeneration(); // an in-flight hydration must not later reopen ready
  ready = false;
}

/**
 * TEST-ONLY: reset to the pre-hydration (fail-closed) state. The revision is
 * BUMPED (never rewound — both counters stay monotonic) so hydrations left in
 * flight by a previous test are discarded instead of mutating the fresh state.
 */
export function __resetSyncGenerationForTest(): void {
  touchSyncGeneration();
  userId = null;
  generation = 0;
  ready = false;
}
