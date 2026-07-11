/**
 * Remote-erase recovery marker (PR-I1, audit C1 — no automatic second-device wipe).
 *
 * When a device discovers the server generation is AHEAD of its acknowledged
 * generation AND it still holds local learner data, the synced data was deleted
 * on another device/session. We do NOT auto-wipe. Instead we persist a
 * USER-BOUND recovery marker, block all sync, and require explicit user
 * confirmation before running the PR-H reset.
 *
 * Stored record: `{ version: 1, userId, targetGeneration }`. On hydration:
 *   - absent           → no recovery pending;
 *   - own valid record → recovery pending (blocked) for this user;
 *   - other user's / corrupt record → recovery pending (blocked), but with no
 *     actionable record — fail closed; do NOT overwrite or reinterpret it.
 *
 * Confirmation (in AppProvider) must verify the marker belongs to the current
 * user, then PR-H reset → acknowledge the target generation → clear the marker →
 * reopen sync. No automatic remote wipe.
 *
 * Pure + harness-testable: reads synchronous; persistence store injectable.
 */

export const LM_REMOTE_ERASE_RECOVERY_KEY = "lm_remote_erase_recovery";

export type RemoteEraseRecovery = {
  version: 1;
  userId: string;
  targetGeneration: number;
};

let pending: RemoteEraseRecovery | null = null;
/** True when a marker exists but is unreadable/foreign — blocked, not actionable. */
let blockedUnowned = false;
/**
 * True once the marker's presence/absence has been RESOLVED from storage (via
 * `probeRemoteEraseRecovery`, `hydrateRemoteEraseRecovery`, or a persist/clear).
 * Until then the learner-mutation gate must FAIL CLOSED — "no marker seen yet"
 * is not the same as "marker proven absent".
 */
let hydrated = false;

export type RecoveryKv = {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
};

async function loadKv(): Promise<RecoveryKv> {
  const mod = await import("./storage");
  return mod.kvStorage as RecoveryKv;
}

function parse(raw: string): RemoteEraseRecovery | null {
  try {
    const v = JSON.parse(raw) as Partial<RemoteEraseRecovery>;
    if (
      v &&
      v.version === 1 &&
      typeof v.userId === "string" &&
      typeof v.targetGeneration === "number" &&
      Number.isFinite(v.targetGeneration) &&
      v.targetGeneration >= 0
    ) {
      return { version: 1, userId: v.userId, targetGeneration: v.targetGeneration };
    }
  } catch {
    /* fall through */
  }
  return null;
}

/** True while any recovery marker is present — sync must stay blocked. */
export function isRemoteErasePending(): boolean {
  return pending != null || blockedUnowned;
}

/** True once the marker's presence has been resolved from storage. */
export function isRemoteEraseRecoveryHydrated(): boolean {
  return hydrated;
}

/**
 * USER-INDEPENDENT presence probe (runs at provider mount, before auth resolves).
 * Absent → hydrated clear; present → hydrated + blocked-not-actionable until the
 * user-bound {@link hydrateRemoteEraseRecovery} refines ownership; unreadable →
 * hydrated + blocked (fail closed). Local storage only — NO network. Defers to a
 * user-bound hydration that already resolved (never downgrades its result).
 */
export async function probeRemoteEraseRecovery(store?: RecoveryKv): Promise<void> {
  if (hydrated) return; // a user-bound hydration already resolved — keep it
  try {
    const kv = store ?? (await loadKv());
    const raw = await kv.getItem(LM_REMOTE_ERASE_RECOVERY_KEY);
    if (hydrated) return; // resolved while we were reading — keep the refined state
    if (raw != null && raw !== "") {
      blockedUnowned = true; // present; ownership resolved later by the user hydrate
    }
    hydrated = true;
  } catch {
    blockedUnowned = true; // unreadable → fail closed
    hydrated = true;
  }
}

/** The actionable recovery record for the current user, or null. */
export function remoteEraseRecovery(): RemoteEraseRecovery | null {
  return pending;
}

/**
 * Load the recovery marker for `forUserId`. Own valid → actionable pending.
 * Other-user/corrupt/read-failure → blocked (not actionable), fail closed.
 */
export async function hydrateRemoteEraseRecovery(args: {
  userId: string;
  store?: RecoveryKv;
}): Promise<void> {
  pending = null;
  blockedUnowned = false;
  hydrated = false; // re-hydrating → fail closed until resolved
  try {
    const kv = args.store ?? (await loadKv());
    const raw = await kv.getItem(LM_REMOTE_ERASE_RECOVERY_KEY);
    if (raw != null && raw !== "") {
      const rec = parse(raw);
      if (rec && rec.userId === args.userId) {
        pending = rec;
      } else {
        blockedUnowned = true; // foreign/corrupt marker → blocked, not actionable
      }
    }
  } catch {
    blockedUnowned = true; // read failure → fail closed
  } finally {
    hydrated = true; // resolved (possibly as blocked)
  }
}

/** Persist a user-bound recovery marker and block sync. */
export async function persistRemoteEraseRecovery(args: {
  userId: string;
  targetGeneration: number;
  store?: RecoveryKv;
}): Promise<void> {
  const kv = args.store ?? (await loadKv());
  const record: RemoteEraseRecovery = {
    version: 1,
    userId: args.userId,
    targetGeneration: args.targetGeneration,
  };
  await kv.setItem(LM_REMOTE_ERASE_RECOVERY_KEY, JSON.stringify(record));
  pending = record;
  blockedUnowned = false;
  hydrated = true; // we know the state — we just wrote it
}

/** Clear the recovery marker (after a confirmed, owned recovery completes). */
export async function clearRemoteEraseRecovery(store?: RecoveryKv): Promise<void> {
  const kv = store ?? (await loadKv());
  await kv.removeItem(LM_REMOTE_ERASE_RECOVERY_KEY);
  pending = null;
  blockedUnowned = false;
  hydrated = true;
}

/** TEST-ONLY: return to the pre-hydration (fail-closed) state. */
export function __resetRemoteEraseRecoveryForTest(): void {
  pending = null;
  blockedUnowned = false;
  hydrated = false;
}
