/**
 * "Delete synced learning data" orchestration (PR-I1, audit C1) — PHASE-AWARE.
 *
 * A pure, dependency-injected state machine that RESUMES from the durable
 * pending-marker phase, so a retry (same session or after a restart) never
 * repeats a destructive step it already completed and never reopens sync with a
 * stale server generation. `AppProvider` wires the real dependencies.
 *
 * Phases and transitions (all durably recorded in the pending marker):
 *
 *   (fresh | armed)
 *     arm      — close admission synchronously, persist the user-bound op-id
 *                marker (phase: armed), drain in-flight cloud writes;
 *     RPC      — authenticated delete (server bumps generation, deletes, logs the
 *                operation id). Retry from `armed` replays the SAME op id, which
 *                the server recognises from the operation log — never a new op.
 *     advance  — persist `cloud_deleted` + the returned server generation BEFORE
 *                the local reset. If this persist fails, abort (retryable): the
 *                idempotent replay will re-confirm and return the current
 *                generation.
 *
 *   (cloud_deleted)   — cloud deletion is CONFIRMED; arm + RPC are skipped on
 *     reset    — run the PR-H local reset;                        resume.
 *     advance  — persist `local_reset_done` (generation carried forward).
 *
 *   (local_reset_done) — the device was cleared; `resetLocal` is NEVER invoked
 *     ack      — acknowledge the recorded server generation;       again.
 *     finish   — clear the marker + reopen admission, ONLY after the
 *                acknowledgement succeeded.
 *
 * Failure statuses:
 *  - `cloud_failed`          — arm/RPC/ambiguous/`cloud_deleted`-persist failure;
 *                              nothing claims success; retry is idempotent.
 *  - `local_reset_failed`    — cloud deleted but the device reset failed; device
 *                              data NOT cleared; marker stays `cloud_deleted`.
 *  - `guard_finalize_failed` — device data WAS cleared; only phase-advance /
 *                              acknowledgement / marker-clear is pending; sync
 *                              and learner mutations stay blocked; retry only
 *                              finalizes (no re-reset once `local_reset_done`
 *                              was durably recorded).
 */
import type { ArmResult, PendingErasePhase } from "./cloudEraseGuard";

export type DeleteSyncedStatus =
  | "success"
  | "cloud_failed"
  | "local_reset_failed"
  | "guard_finalize_failed";

export interface DeleteSyncedDeps {
  /**
   * Durable resume point (from the hydrated pending marker); null = fresh start.
   * Phases past `armed` must carry the confirmed server generation.
   */
  resume: { phase: PendingErasePhase; serverGeneration?: number } | null;
  /**
   * Arm: close admission, persist op-id marker (phase armed), drain writes.
   * Any non-"armed" outcome — incl. "busy" (another arm mid-flight) and
   * "conflict" (a DIFFERENT operation's marker is active) — aborts before the RPC.
   */
  armErase: () => Promise<ArmResult>;
  /** Authenticated cloud deletion (RPC). Resolves `{ ok, generation? }`. */
  deleteCloud: () => Promise<{ ok: boolean; generation?: number }>;
  /** Durably record `cloud_deleted` + the confirmed server generation. */
  markCloudDeleted: (generation: number) => Promise<void>;
  /** PR-H local reset (`resetLocalData`). Reused, not duplicated. */
  resetLocal: () => Promise<void>;
  /** Durably record `local_reset_done` (generation carried forward). */
  markLocalResetDone: () => Promise<void>;
  /** Persist + adopt the server generation locally (AFTER the local reset). */
  acknowledgeGeneration: (generation: number) => Promise<void>;
  /** Clear the durable marker + reopen admission (ONLY after acknowledgement). */
  finishErase: () => Promise<void>;
}

export async function runDeleteSyncedData(
  deps: DeleteSyncedDeps
): Promise<DeleteSyncedStatus> {
  let phase: PendingErasePhase | null = deps.resume?.phase ?? null;
  let generation: number | undefined = deps.resume?.serverGeneration;

  // ── fresh | armed: arm (idempotent re-arm on retry) → RPC → record cloud_deleted
  if (phase === null || phase === "armed") {
    let arm: ArmResult;
    try {
      arm = await deps.armErase();
    } catch {
      return "cloud_failed";
    }
    if (arm !== "armed") return "cloud_failed"; // incl. busy/conflict — no RPC

    let cloudOk = false;
    let rpcGeneration: number | undefined;
    try {
      const res = await deps.deleteCloud();
      cloudOk = res.ok === true;
      rpcGeneration = res.generation;
    } catch {
      cloudOk = false;
    }
    // An OK response WITHOUT a generation is ambiguous — treat as retryable
    // failure; the idempotent op-id replay will return the current generation.
    if (!cloudOk || typeof rpcGeneration !== "number") return "cloud_failed";

    // Durably record cloud_deleted + generation BEFORE any destructive local
    // step. If this persist fails, the marker still says `armed`; the retry
    // replays the same op id (recognised from the server operation log — no
    // re-bump, no re-delete) and lands here again.
    try {
      await deps.markCloudDeleted(rpcGeneration);
    } catch {
      return "cloud_failed";
    }
    generation = rpcGeneration;
    phase = "cloud_deleted";
  }

  // ── cloud_deleted: local reset → record local_reset_done. Arm + RPC skipped
  //    on resume — cloud deletion is already confirmed and must not be treated
  //    as a new operation.
  if (phase === "cloud_deleted") {
    if (typeof generation !== "number") return "cloud_failed"; // corrupt resume — fail closed
    try {
      await deps.resetLocal();
    } catch {
      return "local_reset_failed"; // device NOT cleared; marker stays cloud_deleted
    }
    // If this persist fails, the durable phase stays `cloud_deleted`: a retry
    // re-runs the (now empty-device) reset. Learner mutations are gated the
    // whole time, so no legitimate new state can exist for it to destroy.
    try {
      await deps.markLocalResetDone();
    } catch {
      return "guard_finalize_failed"; // device WAS cleared; finalization pending
    }
    phase = "local_reset_done";
  }

  // ── local_reset_done: finalize ONLY — resetLocal is never invoked from here,
  //    so any state that legitimately exists after the completed reset survives.
  if (typeof generation !== "number") return "guard_finalize_failed"; // corrupt resume
  try {
    await deps.acknowledgeGeneration(generation);
  } catch {
    return "guard_finalize_failed";
  }
  try {
    await deps.finishErase();
  } catch {
    return "guard_finalize_failed";
  }
  return "success";
}
