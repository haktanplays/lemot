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

/**
 * Codex P2 (stale hydration protection — same pattern as cloudEraseGuard).
 * `hydrationAttempt` increases when a user-bound hydration starts (only the
 * newest may apply; the mount probe reads it WITHOUT incrementing so it can
 * never invalidate a user hydrate, while any user hydrate starting mid-probe
 * makes the probe stale). `mutationRevision` changes synchronously on every
 * OTHER intentional recovery-state mutation (persist, clear, runtime block,
 * test reset). A stale read result — absent, own, foreign, corrupt, or a
 * REJECTION — is discarded without touching state or storage, so an older
 * user's read can never clear/replace an actionable marker, flip own ↔
 * blocked ↔ none, resurrect a cleared marker, or undo a runtime block.
 */
let hydrationAttempt = 0;
let mutationRevision = 0;

function touchRecoveryState(): void {
  mutationRevision += 1;
}

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

/**
 * UI-facing recovery status (Codex P2-2). "own" — a valid marker owned by
 * `userId` (actionable: the explicit clear-this-device confirmation applies).
 * "blocked" — a marker is present but foreign / corrupt / unreadable /
 * owner-unknown, OR the runtime was fail-closed by {@link markRemoteEraseBlocked}
 * — never actionable, never confirmable. "none" — no recovery state.
 */
export type RemoteEraseStatus = "none" | "own" | "blocked";

export function remoteEraseStatusFor(userId: string | undefined): RemoteEraseStatus {
  if (!blockedUnowned && pending != null && userId != null && pending.userId === userId) {
    return "own";
  }
  return isRemoteErasePending() ? "blocked" : "none";
}

/**
 * Runtime fail-closed marker (Codex P2-3): a recovery was REQUIRED (server
 * generation ahead + learner data present) but the durable marker could not be
 * persisted. Blocks sync + learner mutations for this runtime WITHOUT writing,
 * overwriting, or reinterpreting anything durable — there is no owned marker,
 * so the state is blocked-not-actionable. A restart re-runs the normal startup
 * reconcile, which retries the persistence.
 */
export function markRemoteEraseBlocked(): void {
  touchRecoveryState(); // an older in-flight read must not undo this block
  blockedUnowned = true;
  hydrated = true;
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
  // Staleness capture WITHOUT bumping the attempt counter: the probe must never
  // invalidate an in-flight user hydrate, but a user hydrate (or any intentional
  // mutation) landing mid-probe makes this probe's result stale.
  const attemptAtStart = hydrationAttempt;
  const revisionAtStart = mutationRevision;
  const isStale = () =>
    hydrated ||
    attemptAtStart !== hydrationAttempt ||
    revisionAtStart !== mutationRevision;
  try {
    const kv = store ?? (await loadKv());
    const raw = await kv.getItem(LM_REMOTE_ERASE_RECOVERY_KEY);
    if (isStale()) return; // resolved/refined while we were reading — keep it
    if (raw != null && raw !== "") {
      blockedUnowned = true; // present; ownership resolved later by the user hydrate
    }
    hydrated = true;
  } catch {
    if (isStale()) return; // a stale probe REJECTION is discarded too
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
 *
 * The start is SYNCHRONOUSLY fail-closed (previous user's marker stops being
 * actionable and `hydrated` drops, so no false "none" reopens anything while
 * the read is in flight). STALE results are discarded (Codex P2): the result —
 * absent, own, foreign, corrupt, or a read REJECTION — applies only if this is
 * still the newest user-bound hydration and no other intentional recovery
 * mutation (persist/clear/runtime block/reset) happened meanwhile. A discarded
 * hydration makes zero state or storage changes — the newer state stands.
 */
export async function hydrateRemoteEraseRecovery(args: {
  userId: string;
  store?: RecoveryKv;
}): Promise<void> {
  hydrationAttempt += 1;
  const attempt = hydrationAttempt;
  pending = null;
  blockedUnowned = false;
  hydrated = false; // re-hydrating → fail closed until resolved
  const revisionAtStart = mutationRevision;
  const isStale = () =>
    attempt !== hydrationAttempt || revisionAtStart !== mutationRevision;
  try {
    const kv = args.store ?? (await loadKv());
    const raw = await kv.getItem(LM_REMOTE_ERASE_RECOVERY_KEY);
    if (isStale()) return; // discard — the newer state stands untouched
    if (raw != null && raw !== "") {
      const rec = parse(raw);
      if (rec && rec.userId === args.userId) {
        pending = rec;
      } else {
        blockedUnowned = true; // foreign/corrupt marker → blocked, not actionable
      }
    }
    hydrated = true; // resolved (possibly as blocked)
  } catch {
    if (isStale()) return; // a stale REJECTION is discarded too
    blockedUnowned = true; // read failure → fail closed
    hydrated = true;
  }
}

/**
 * Persist a user-bound recovery marker and block sync.
 *
 * In-flight hydrations are invalidated TWICE (Codex follow-up): synchronously
 * at START — where the in-memory state also moves to fail-closed
 * NON-actionable (never a false "none", never a previous user's actionable
 * marker) while the durable write is unresolved — and again on successful
 * COMPLETION, so a read that started DURING the persist cannot overwrite the
 * adopted marker. On failure it throws with the runtime left
 * blocked-not-actionable (no durable marker is fabricated), and the start-side
 * bump keeps older reads from restoring "none" or an old marker.
 */
export async function persistRemoteEraseRecovery(args: {
  userId: string;
  targetGeneration: number;
  store?: RecoveryKv;
}): Promise<void> {
  touchRecoveryState(); // invalidate reads already in flight
  pending = null; // fail closed, NOT actionable, while the write is unresolved
  blockedUnowned = true;
  hydrated = true; // the interim state is KNOWN (blocked), not unresolved
  const record: RemoteEraseRecovery = {
    version: 1,
    userId: args.userId,
    targetGeneration: args.targetGeneration,
  };
  try {
    const kv = args.store ?? (await loadKv());
    await kv.setItem(LM_REMOTE_ERASE_RECOVERY_KEY, JSON.stringify(record));
  } catch (e) {
    // Failure-side invalidation: a hydration that STARTED during the failed
    // persist window must not later apply (it could report a false "none" or
    // an old marker). Re-assert blocked-not-actionable — no durable marker is
    // fabricated; a restart retries the reconcile.
    touchRecoveryState();
    pending = null;
    blockedUnowned = true;
    hydrated = true;
    throw e;
  }
  touchRecoveryState(); // invalidate reads that started DURING the persist
  pending = record;
  blockedUnowned = false;
  hydrated = true; // we know the state — we just wrote it
}

/**
 * Clear the recovery marker (after a confirmed, owned recovery completes).
 *
 * In-flight hydrations are invalidated TWICE (Codex follow-up): synchronously
 * at START — the current in-memory pending/blocked state is KEPT (never
 * reported "none") until the durable removal succeeds — and again on
 * successful COMPLETION, so a read that started DURING the removal cannot
 * resurrect the cleared marker. On failure it throws with the fail-closed
 * pending/blocked state retained, and the start-side bump keeps older reads
 * from clearing, replacing, or downgrading anything.
 */
export async function clearRemoteEraseRecovery(store?: RecoveryKv): Promise<void> {
  touchRecoveryState(); // invalidate reads already in flight (state kept as-is)
  try {
    const kv = store ?? (await loadKv());
    await kv.removeItem(LM_REMOTE_ERASE_RECOVERY_KEY);
  } catch (e) {
    // The durable marker may still exist — FAIL CLOSED. An owned in-memory
    // marker is retained as-is; if a concurrent hydration start had suppressed
    // it, restore at least a blocked-not-actionable state (the next hydration
    // refines it back to "own" from the surviving durable marker). The bump
    // keeps any read that started during the failed removal from applying.
    touchRecoveryState();
    if (pending === null) blockedUnowned = true;
    hydrated = true;
    throw e;
  }
  touchRecoveryState(); // invalidate reads that started DURING the removal
  pending = null;
  blockedUnowned = false;
  hydrated = true;
}

/**
 * TEST-ONLY: return to the pre-hydration (fail-closed) state. The revision is
 * BUMPED (never rewound — both counters stay monotonic) so hydrations left in
 * flight by a previous test are discarded instead of mutating the fresh state.
 */
export function __resetRemoteEraseRecoveryForTest(): void {
  touchRecoveryState();
  pending = null;
  blockedUnowned = false;
  hydrated = false;
}
