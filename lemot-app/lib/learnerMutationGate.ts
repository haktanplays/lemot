/**
 * Learner-mutation gate (PR-I1, audit C1 — deletion/recovery finalization).
 *
 * While a synced-data deletion is pending on this DEVICE (any durable phase:
 * armed / cloud_deleted / local_reset_done) or a remote-erase recovery awaits
 * explicit confirmation, the app must not create NEW learner state that the
 * required cleanup would erase. Blocking only network sync is not enough — local
 * lesson/practice activity persists progress, SRS, events, and telemetry.
 *
 * This is the narrowest practical gate: every LOCAL learner persister
 * (`useStorage.persist`, `useSRS.save`, `LocalRepository` writes,
 * `TelemetryStore.appendEvent`) consults it, so any lesson/practice action's
 * durable effect is blocked with one check per writer. Derived (no setter, no
 * duplicated state): it reads the erase coordinator's admission state and the
 * remote-erase recovery marker directly.
 *
 * FAIL CLOSED until PROVEN clean: mutations stay blocked while either local
 * control record is unhydrated, unreadable, corrupt, pending, or foreign-owned.
 * "Not yet looked" must never pass for "proven absent" — otherwise a brief
 * restart window (e.g. a completed reset whose `local_reset_done` phase failed
 * to persist) could admit new learner data that the resumed idempotent reset
 * would then destroy. The gate opens only once BOTH records have hydrated and
 * shown no pending deletion and no pending recovery.
 *
 * LOCAL-ONLY hydration: both records live in on-device storage and are hydrated
 * at provider mount (user-independent — `hydrateCloudEraseGuard` +
 * `probeRemoteEraseRecovery`), so ordinary offline startup with clean markers
 * reopens local learning in the first ticks of launch WITHOUT any network or
 * server-generation fetch. Sync admission stays independently fail-closed.
 *
 * A FOREIGN pending marker also blocks (fail closed): whoever armed the deletion,
 * this device's learner data is scheduled for cleanup, and new state written by a
 * different signed-in user would be silently destroyed when the owning account
 * completes it. Blocking is safe; executing under the wrong account never happens
 * (ownership is enforced at the orchestrator, not here).
 */
import { cloudEraseState } from "./cloudEraseGuard";
import {
  isRemoteErasePending,
  isRemoteEraseRecoveryHydrated,
} from "./remoteEraseRecovery";

/** TRUE when new learner state must NOT be persisted (unproven or pending). */
export function isLearnerMutationBlocked(): boolean {
  // Erase marker: only a hydrated-clean "ready" admits. `unknown` (unhydrated or
  // never checked), `arming`, and `pending` (incl. unreadable/corrupt/foreign
  // markers) all fail closed.
  if (cloudEraseState() !== "ready") return true;
  // Recovery marker: its absence must be PROVEN by hydration, not assumed.
  if (!isRemoteEraseRecoveryHydrated()) return true;
  return isRemoteErasePending();
}
