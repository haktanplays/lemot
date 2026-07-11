/**
 * Cloud-erase sync coordinator (PR-I1, audit C1 — "delete synced learning data").
 *
 * Deleting a signed-in user's synced rows (`user_progress` / `user_errors`) then
 * clearing local data is a multi-step, multi-writer operation. A start-of-call
 * guard alone is NOT enough: a `pushToCloud` / `pushError` upsert already ON THE
 * WIRE when the erase begins would land AFTER the delete RPC and re-create the
 * rows. So this module is a small sync-operation coordinator, not just a flag:
 *
 *  1. Admission state (synchronous, in-memory): `unhydrated` / `arming` /
 *     `pending` all BLOCK; only `ready` admits new cloud writes and pulls. Fail
 *     closed until hydrated and on any read failure.
 *  2. Active-write tracking: every cloud write registers via `admitCloudWrite`
 *     (atomic check-and-register — no await between the state check and the
 *     increment) and releases in `finally` via `releaseCloudWrite`.
 *  3. Erase generation: a monotonic counter bumped the instant an erase begins.
 *     A pull captures it before starting and its result is discarded at the apply
 *     boundary if the generation advanced (erase began) while it was in flight.
 *  4. Arm sequence (`armCloudErase`): (a) synchronously close admission so no new
 *     sync can start and bump the generation; (b) persist the durable marker; if
 *     that fails, REOPEN admission and abort (no RPC); (c) once persisted, stay
 *     blocked and DRAIN pre-existing in-flight writes; only when they have settled
 *     is the caller cleared to call the delete RPC. If the drain fails/times out,
 *     the marker stays set, sync stays blocked, and the caller reports a
 *     retryable failure — the RPC is never called with a write still in flight.
 *
 * Durability: the marker (`lm_cloud_erase_pending`) survives an app restart, so a
 * kill mid-operation keeps sync blocked until an idempotent retry completes. A
 * restart drops any old in-flight JS promise, so there is nothing left to drain.
 *
 * Deliberately OUTSIDE `ALL_LOCAL_PRIVACY_KEYS`: the PR-H local reset must not
 * remove this marker mid-operation. It is a control flag, not learner data. This
 * is a GLOBAL, operation-specific coordinator — NOT the per-user `hasPulled`
 * account-switch model (B5 / PR-G), which stays separate.
 *
 * Pure + harness-testable: admission/generation reads are synchronous in-memory;
 * persistence takes an injectable store (tests inject an in-memory KV) and only
 * lazily loads the real `kvStorage` when none is injected.
 */

/**
 * Durable marker key. NOT part of `ALL_LOCAL_PRIVACY_KEYS` (must survive reset).
 * Its VALUE is a USER-BOUND, PHASE-AWARE record
 * `{ version: 2, userId, operationId, phase, serverGeneration? }`, so:
 *  - a retry after a crash reuses the same op id (idempotent server replay);
 *  - a pending deletion can never be executed under a different user;
 *  - a retry RESUMES from the durable phase instead of restarting the whole
 *    destructive sequence — after `local_reset_done`, the local reset is never
 *    run again; after `cloud_deleted`, the confirmed server generation travels
 *    with the marker so finalization can acknowledge it across a restart.
 */
export const LM_CLOUD_ERASE_PENDING_KEY = "lm_cloud_erase_pending";

/**
 * Durable deletion phases:
 *  - `armed`            — admission closed, op id persisted, writes drained;
 *                         cloud deletion NOT yet confirmed.
 *  - `cloud_deleted`    — the delete RPC confirmed (server generation recorded);
 *                         local reset not yet done. A retry skips straight to
 *                         the local reset (the same op id would replay anyway).
 *  - `local_reset_done` — device learner data cleared. A retry must NEVER run
 *                         the local reset again: only acknowledge the recorded
 *                         generation, clear the marker, and reopen admission.
 */
export type PendingErasePhase = "armed" | "cloud_deleted" | "local_reset_done";

type PendingEraseRecord = {
  version: 2;
  userId: string;
  operationId: string;
  phase: PendingErasePhase;
  serverGeneration?: number;
};

/** Default bound on how long to wait for in-flight cloud writes to settle. */
export const DEFAULT_DRAIN_MS = 8000;

function parsePending(raw: string): PendingEraseRecord | null {
  try {
    const v = JSON.parse(raw) as Partial<PendingEraseRecord>;
    const phaseOk =
      v.phase === "armed" || v.phase === "cloud_deleted" || v.phase === "local_reset_done";
    // Phases past `armed` MUST carry the confirmed server generation — a record
    // without it cannot be finalized and is treated as corrupt (fail closed).
    const genOk =
      v.phase === "armed"
        ? v.serverGeneration === undefined || typeof v.serverGeneration === "number"
        : typeof v.serverGeneration === "number" && Number.isFinite(v.serverGeneration);
    if (
      v &&
      v.version === 2 &&
      typeof v.userId === "string" &&
      typeof v.operationId === "string" &&
      phaseOk &&
      genOk
    ) {
      return {
        version: 2,
        userId: v.userId,
        operationId: v.operationId,
        phase: v.phase as PendingErasePhase,
        ...(typeof v.serverGeneration === "number"
          ? { serverGeneration: v.serverGeneration }
          : {}),
      };
    }
  } catch {
    /* fall through */
  }
  return null;
}

/**
 * `unknown` = not hydrated yet → BLOCKED (fail closed).
 * `ready`   = no erase pending → cloud writes + pulls admitted.
 * `arming`  = erase started, marker not yet persisted → BLOCKED.
 * `pending` = marker persisted / erase in progress or interrupted → BLOCKED.
 */
type AdmissionState = "unknown" | "ready" | "arming" | "pending";

let state: AdmissionState = "unknown";
/** Monotonic; bumped the instant an erase begins (for the pull apply-boundary check). */
let generation = 0;
/** The delete operation id of the current pending erase (from arm or hydrate). */
let pendingOpId: string | null = null;
/** The user id a pending erase belongs to (only its owner may execute/retry it). */
let pendingUserId: string | null = null;
/** The durable phase of the pending erase (null when none / corrupt). */
let pendingPhase: PendingErasePhase | null = null;
/** The confirmed server generation (recorded at `cloud_deleted`). */
let pendingServerGeneration: number | null = null;

let nextToken = 0;
const activeWrites = new Set<number>();
type DrainWaiter = (settled: boolean) => void;
const drainWaiters: DrainWaiter[] = [];

/** Minimal storage surface (get/set/remove). The app's `kvStorage` satisfies it. */
export type CloudEraseKv = {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
};

async function loadKv(): Promise<CloudEraseKv> {
  const mod = await import("./storage");
  return mod.kvStorage as CloudEraseKv;
}

/** TRUE only when new cloud sync (pull/push) may start. */
export function isCloudSyncAdmitted(): boolean {
  return state === "ready";
}

/** Current admission state (tests / diagnostics). */
export function cloudEraseState(): AdmissionState {
  return state;
}

/**
 * The delete operation id of the pending erase — set by `armCloudErase` or loaded
 * by `hydrateCloudEraseGuard` from the durable marker, or `null` if none. A retry
 * reuses it so the server RPC replays idempotently (no double generation bump).
 */
export function cloudErasePendingOpId(): string | null {
  return pendingOpId;
}

/**
 * The user id a pending erase belongs to (or null if none / unreadable). Only
 * this user may execute or retry the pending deletion; another signed-in user
 * must not run the RPC under their own identity.
 */
export function cloudErasePendingUserId(): string | null {
  return pendingUserId;
}

/** The durable phase of the pending erase (null when none / corrupt marker). */
export function cloudErasePendingPhase(): PendingErasePhase | null {
  return pendingPhase;
}

/** The confirmed server generation recorded at `cloud_deleted` (null before). */
export function cloudErasePendingServerGeneration(): number | null {
  return pendingServerGeneration;
}

/**
 * Durably advance the pending erase to the next phase. `cloud_deleted` MUST
 * supply the server generation returned by the delete RPC; `local_reset_done`
 * inherits the recorded one. Persists BEFORE updating memory — a persistence
 * failure throws with the durable phase unchanged, so a retry resumes from the
 * last durably recorded step. Throws if no actionable pending erase exists.
 */
export async function advanceCloudErasePhase(args: {
  phase: "cloud_deleted" | "local_reset_done";
  serverGeneration?: number;
  store?: CloudEraseKv;
}): Promise<void> {
  if (pendingUserId === null || pendingOpId === null) {
    throw new Error("no actionable pending erase to advance");
  }
  const generation = args.serverGeneration ?? pendingServerGeneration;
  if (typeof generation !== "number") {
    throw new Error("cannot advance past armed without a confirmed server generation");
  }
  const record: PendingEraseRecord = {
    version: 2,
    userId: pendingUserId,
    operationId: pendingOpId,
    phase: args.phase,
    serverGeneration: generation,
  };
  const kv = args.store ?? (await loadKv());
  await kv.setItem(LM_CLOUD_ERASE_PENDING_KEY, JSON.stringify(record));
  pendingPhase = args.phase;
  pendingServerGeneration = generation;
}

/** The current erase generation. A pull captures this BEFORE it starts. */
export function cloudEraseGeneration(): number {
  return generation;
}

/**
 * TRUE if an erase began after `capturedGeneration` was taken — i.e. a pull that
 * started before the erase must have its result DISCARDED at the apply boundary.
 */
export function isEraseGenerationStale(capturedGeneration: number): boolean {
  return generation !== capturedGeneration;
}

/**
 * Atomically admit + register a cloud WRITE. Returns a release token, or `null`
 * when sync is not admitted (unhydrated / arming / pending). The check and the
 * registration are synchronous with no await between them, so an erase that
 * closes admission can never interleave between a writer's check and its
 * increment. The caller MUST `releaseCloudWrite` in `finally`.
 */
export function admitCloudWrite(): number | null {
  if (state !== "ready") return null;
  const token = nextToken++;
  activeWrites.add(token);
  return token;
}

/** Release a previously admitted write. Idempotent; notifies a pending drain. */
export function releaseCloudWrite(token: number): void {
  if (activeWrites.delete(token)) notifyDrainIfIdle();
}

/** Count of cloud writes currently in flight (tests / diagnostics). */
export function activeCloudWriteCount(): number {
  return activeWrites.size;
}

function notifyDrainIfIdle(): void {
  if (activeWrites.size === 0 && drainWaiters.length > 0) {
    const waiters = drainWaiters.splice(0);
    for (const w of waiters) w(true);
  }
}

function drainWrites(timeoutMs: number): Promise<boolean> {
  if (activeWrites.size === 0) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout>;
    const settle = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(ok);
    };
    drainWaiters.push(settle);
    timer = setTimeout(() => settle(false), timeoutMs);
  });
}

/**
 * Load the durable marker into memory. Absent/empty → `ready`. Present →
 * `pending` (a prior erase did not complete). A read failure → `pending`
 * (fail closed). Must run before any pull/push is permitted.
 */
export async function hydrateCloudEraseGuard(
  store?: CloudEraseKv
): Promise<AdmissionState> {
  try {
    const kv = store ?? (await loadKv());
    const raw = await kv.getItem(LM_CLOUD_ERASE_PENDING_KEY);
    if (raw == null || raw === "") {
      state = "ready";
      pendingOpId = null;
      pendingUserId = null;
      pendingPhase = null;
      pendingServerGeneration = null;
    } else {
      // A marker exists → an erase is pending; sync stays blocked. Parse the
      // user-bound record so only its owner can retry it, and restore the durable
      // PHASE so a retry resumes there instead of restarting the destructive
      // sequence. A corrupt marker is NOT reinterpreted or overwritten: pending
      // with no actionable op id / user / phase.
      state = "pending";
      const rec = parsePending(raw);
      pendingOpId = rec?.operationId ?? null;
      pendingUserId = rec?.userId ?? null;
      pendingPhase = rec?.phase ?? null;
      pendingServerGeneration = rec?.serverGeneration ?? null;
    }
  } catch {
    state = "pending"; // cannot read the guard → fail closed
    pendingOpId = null;
    pendingUserId = null;
    pendingPhase = null;
    pendingServerGeneration = null;
  }
  return state;
}

export type ArmResult = "armed" | "persist_failed" | "drain_failed";

/**
 * Begin an erase, in the required order:
 *   1. SYNCHRONOUSLY close admission (`arming`) + bump the generation, so no new
 *      cloud write can start and any in-flight pull will be discarded at apply;
 *   2. persist the durable marker BEFORE any RPC — on failure, REOPEN admission
 *      and return `persist_failed` (caller must not call the RPC);
 *   3. stay blocked (`pending`) and DRAIN pre-existing in-flight writes; if they
 *      do not settle within `drainTimeoutMs`, return `drain_failed` with the
 *      marker still set and sync still blocked (caller must not call the RPC).
 * Only `armed` clears the caller to invoke the deletion RPC.
 */
export async function armCloudErase(opts: {
  opId: string;
  userId: string;
  store?: CloudEraseKv;
  drainTimeoutMs?: number;
}): Promise<ArmResult> {
  // 1) Close admission synchronously (before any await) so no new sync can start.
  state = "arming";
  generation += 1;

  // 2) Persist the durable USER-BOUND marker (phase: armed) BEFORE any RPC.
  const record: PendingEraseRecord = {
    version: 2,
    userId: opts.userId,
    operationId: opts.opId,
    phase: "armed",
  };
  try {
    const kv = opts.store ?? (await loadKv());
    await kv.setItem(LM_CLOUD_ERASE_PENDING_KEY, JSON.stringify(record));
  } catch {
    state = "ready"; // reopen admission — nothing persisted, nothing deleted
    return "persist_failed";
  }
  pendingOpId = opts.opId;
  pendingUserId = opts.userId;
  pendingPhase = "armed";
  pendingServerGeneration = null;
  state = "pending";

  // 3) Drain any writes that were already in flight when admission closed.
  const drained = await drainWrites(opts.drainTimeoutMs ?? DEFAULT_DRAIN_MS);
  if (!drained) return "drain_failed"; // marker stays set; sync stays blocked
  return "armed";
}

/**
 * Clear the durable marker and re-open admission — call ONLY after BOTH the cloud
 * delete and the PR-H local cleanup have succeeded. If removal fails it throws
 * with sync still blocked (the caller reports the op as not fully complete).
 * Idempotent.
 */
export async function finishCloudErase(store?: CloudEraseKv): Promise<void> {
  const kv = store ?? (await loadKv());
  await kv.removeItem(LM_CLOUD_ERASE_PENDING_KEY);
  state = "ready";
  pendingOpId = null;
  pendingUserId = null;
  pendingPhase = null;
  pendingServerGeneration = null;
}

/** TEST-ONLY: return to the pre-hydration (fail-closed) state. */
export function __resetCloudEraseGuardForTest(): void {
  state = "unknown";
  generation = 0;
  pendingOpId = null;
  pendingUserId = null;
  pendingPhase = null;
  pendingServerGeneration = null;
  nextToken = 0;
  activeWrites.clear();
  drainWaiters.splice(0);
}
