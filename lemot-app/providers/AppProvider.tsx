import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { useStorage } from "@/hooks/useStorage";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useErrors } from "@/hooks/useErrors";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuthContext } from "@/providers/AuthProvider";
import { useProgressSync } from "@/hooks/useProgressSync";
import {
  resetAllLocalPrivacyData,
  hasLocalLearnerData,
} from "@/content/learning-engine/local-privacy-inventory";
import {
  bumpPrivacyResetEpoch,
  privacyResetEpoch,
  isPersistSuppressed,
} from "@/lib/privacyResetEpoch";
import {
  hydrateCloudEraseGuard,
  armCloudErase,
  advanceCloudErasePhase,
  finishCloudErase,
  isCloudSyncAdmitted,
  cloudEraseState,
  cloudEraseGeneration,
  isEraseGenerationStale,
  cloudErasePendingOpId,
  cloudErasePendingUserId,
  cloudErasePendingPhase,
  cloudErasePendingServerGeneration,
} from "@/lib/cloudEraseGuard";
import {
  hydrateSyncGeneration,
  syncGeneration,
  setSyncGeneration,
  blockSyncGeneration,
} from "@/lib/syncGeneration";
import {
  hydrateRemoteEraseRecovery,
  probeRemoteEraseRecovery,
  isRemoteErasePending,
  remoteEraseRecovery,
  remoteEraseStatusFor,
  markRemoteEraseBlocked,
  persistRemoteEraseRecovery,
  clearRemoteEraseRecovery,
  type RemoteEraseStatus,
} from "@/lib/remoteEraseRecovery";
import {
  runDeleteSyncedData,
  type DeleteSyncedStatus,
} from "@/lib/deleteSyncedData";
import { runRemoteEraseConfirm } from "@/lib/remoteEraseConfirm";
import { handleGenerationMismatch } from "@/lib/generationMismatch";
import { makeOperationId } from "@/lib/operationId";
import { isLearnerMutationBlocked } from "@/lib/learnerMutationGate";
import { runPinnedCloudDelete } from "@/lib/pinnedDelete";
import { currentSessionSnapshot } from "@/lib/supabase";
import { resolveGenerationReconcile } from "@/lib/generationReconcile";
import { createSingleFlight, type SingleFlight } from "@/lib/singleFlight";
import type { ErrorEntry, DailyReview } from "@/lib/types";

interface AppContextType {
  // Storage
  prog: Record<string, boolean>;
  errors: ErrorEntry[];
  dailyRev: DailyReview;
  loaded: boolean;
  /**
   * Atomically update the daily-review slice of the shared blob (audit B6) and
   * sync to cloud. Preserves the latest progress + errors.
   */
  updateDailyReview: (fn: (dr: DailyReview) => DailyReview) => void;

  // Progress
  mk: (lessonId: number, sectionKey: string) => void;
  lp: (lessonId: number) => number;

  // Errors
  logErr: (
    word: string,
    section: string,
    given: string,
    correct: string,
    lessonId: number
  ) => void;
  weakSpots: { word: string; count: number }[];

  // Speech
  say: (text: string) => void;
  stopSpeech: () => void;

  /**
   * PR-H: perform a COMPLETE device-local privacy reset. Engages the runtime
   * write-barrier (so stale in-memory state can't re-persist), clears the full
   * local storage inventory (progress, SRS, learning-engine keys, telemetry,
   * privacy state, and every `__corrupt` blob), then clears this provider's live
   * in-memory progress state. Local-only — it does NOT delete cloud data (C1).
   */
  resetLocalData: () => Promise<void>;

  /**
   * PR-I1 (audit C1): delete this signed-in user's SYNCED learning data. Arms a
   * durable erase guard, deletes the user's `user_progress` + `user_errors` cloud
   * rows via the authenticated RPC (ownership = `auth.uid()`), then reuses the
   * PR-H local reset, clearing the guard only on full success. Preserves the auth
   * account, session, `ai_usage`, and profile — it does NOT sign the user out.
   * Returns the operation outcome so the UI can report partial failures honestly.
   */
  deleteSyncedData: () => Promise<DeleteSyncedStatus>;

  /**
   * PR-I1: remote-erase recovery status (Codex P2-2). "own" — this device
   * discovered its synced data was deleted elsewhere (server generation ahead +
   * local learner data present) and holds a valid marker owned by the current
   * user: sync is blocked, the device is NOT auto-wiped, and the user may
   * explicitly confirm clearing it via {@link confirmRemoteErase}. "blocked" —
   * a recovery state exists but is foreign / corrupt / unreadable / could not
   * be durably persisted: sync stays blocked and NO confirmation is possible
   * (the UI must not offer one). "none" — no recovery state.
   */
  remoteEraseStatus: RemoteEraseStatus;

  /**
   * PR-I1: explicit confirmation for the remote-erase recovery. Verifies the
   * recovery marker belongs to the current user, REVALIDATES the current server
   * generation (a further deletion may have advanced it past the recorded
   * target), runs the PR-H reset, acknowledges the freshly fetched generation,
   * clears the marker, and reopens sync. Fails closed on fetch failure or a
   * foreign marker. No-op if no owned recovery is pending.
   */
  confirmRemoteErase: () => Promise<void>;

  /**
   * PR-I1: durable pending-deletion state for the UI. "own" — this user's
   * deletion didn't finish (any phase); a retry resumes from the durable phase.
   * "blocked" — a pending deletion belongs to another account or its marker is
   * unreadable; learning + sync stay paused and only the owning account may
   * complete it. "none" — no deletion pending.
   */
  pendingDeletion: "none" | "own" | "blocked";

  /**
   * PR-I1 (Codex P2): TRUE while the learner-mutation gate is closed (pending
   * deletion, remote-erase recovery, or blocked/foreign/unreadable control
   * state) — local learner persistence is intentionally rejected, so no
   * progress-producing surface may stay interactive. A reactive React mirror
   * of `isLearnerMutationBlocked()`, refreshed with the other control state;
   * SEPARATE from `loaded`, which stays bootstrap/readiness only (the paused
   * UI must still show the privacy retry/confirm controls, not a spinner).
   */
  learningPaused: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

/**
 * Merge two progress maps as a set-union of completed keys.
 * Section completion is monotonic — once a section is done, it stays done —
 * so a key present in either side survives. Both sides only ever store
 * truthy values (per useLessonProgress.mk), so the spread direction does
 * not matter for collision resolution; local comes last as a tiebreaker.
 */
function mergeProgress(
  local: Record<string, boolean>,
  cloud: Record<string, boolean>
): Record<string, boolean> {
  return { ...cloud, ...local };
}

/**
 * Pick the DailyReview entry with the most recent date.
 * On tie (same date), pick the higher count. On full equality, local wins.
 * ISO `YYYY-MM-DD` date strings are safe to lexicographically compare.
 */
function mergeDailyReview(
  local: DailyReview,
  cloud: DailyReview
): DailyReview {
  if (local.date > cloud.date) return local;
  if (cloud.date > local.date) return cloud;
  return local.count >= cloud.count ? local : cloud;
}

/** Shallow equality on progress maps: same key set + same boolean values. */
function progressEqual(
  a: Record<string, boolean>,
  b: Record<string, boolean>
): boolean {
  const aKeys = Object.keys(a);
  if (aKeys.length !== Object.keys(b).length) return false;
  for (const k of aKeys) {
    if (a[k] !== b[k]) return false;
  }
  return true;
}

/** Shallow equality on DailyReview. */
function dailyReviewEqual(a: DailyReview, b: DailyReview): boolean {
  return a.date === b.date && a.count === b.count;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const storageHook = useStorage();
  const progressHook = useLessonProgress(storageHook);
  const errorsHook = useErrors(storageHook);
  const { say, stop: stopSpeech } = useSpeech();
  // Write-RPC generation-mismatch handoff. A ref breaks the circular dependency
  // (the handler needs fetchSyncGeneration, which the hook itself returns); the
  // latest handler is stamped below once the deps exist.
  const generationMismatchRef = useRef<() => void>(() => {});
  const {
    pushToCloud,
    pullFromCloud,
    pushError,
    deleteSyncedRows,
    fetchSyncGeneration,
  } = useProgressSync(user?.id, () => generationMismatchRef.current());
  const hasPulled = useRef(false);

  // Ref to capture latest storage values for the pull effect
  const storageRef = useRef(storageHook);
  storageRef.current = storageHook;

  // Codex P1: the LIVE auth identity, readable from long-running deletion
  // closures without going stale. A deletion flow captures its owner (`uidNow`)
  // at start and compares against this ref before every irreversible step.
  const latestUserIdRef = useRef<string | null>(null);
  latestUserIdRef.current = user?.id ?? null;

  // PR-I1: hydrate the durable cloud-erase guard once at startup. Until this
  // resolves the guard is fail-closed (sync blocked); after it, sync is allowed
  // only if no erase is pending. Gates the pull effect below so a leftover
  // pending erase (e.g. app killed mid-operation) never pulls/re-pushes.
  const [eraseGuardHydrated, setEraseGuardHydrated] = useState(false);
  const [remoteEraseStatus, setRemoteEraseStatus] = useState<RemoteEraseStatus>("none");
  const [pendingDeletion, setPendingDeletion] = useState<"none" | "own" | "blocked">(
    "none"
  );
  // Codex P2: fail-closed until the first control refresh — the gate itself is
  // closed before hydration, and the pre-`loaded` spinner covers the UI anyway.
  const [learningPaused, setLearningPaused] = useState(true);
  // Bumped after a confirmed recovery to re-run the reconcile/pull once sync is
  // unblocked (does NOT touch B5's hasPulled-by-user model).
  const [syncEpoch, setSyncEpoch] = useState(0);
  const uid = user?.id;

  // Re-derive the UI-facing durable control state from the coordinator modules
  // (after hydration and after every deletion/recovery operation).
  const refreshControlState = useCallback(() => {
    setRemoteEraseStatus(remoteEraseStatusFor(uid));
    // Codex P2: the pause mirror always re-reads the AUTHORITATIVE gate — the
    // business rules stay in learnerMutationGate, never duplicated in screens.
    setLearningPaused(isLearnerMutationBlocked());
    if (cloudEraseState() === "pending") {
      const owner = cloudErasePendingUserId();
      setPendingDeletion(owner && owner === uid ? "own" : "blocked");
    } else {
      setPendingDeletion("none");
    }
  }, [uid]);

  // Mount-time (user-independent, LOCAL-ONLY) hydration of both deletion-control
  // records. The learner-mutation gate fails closed until these resolve, so this
  // must run before any lesson surface renders — and it must NOT wait on auth or
  // network: an ordinary offline startup with clean markers reopens local
  // learning here, while sync admission stays independently fail-closed.
  // `controlHydrated` gates `loaded` so the app never presents a normal writable
  // learning state whose persistence would be silently dropped.
  const [controlHydrated, setControlHydrated] = useState(false);
  useEffect(() => {
    let alive = true;
    void Promise.all([hydrateCloudEraseGuard(), probeRemoteEraseRecovery()]).finally(
      () => {
        if (!alive) return;
        refreshControlState();
        setControlHydrated(true);
      }
    );
    return () => {
      alive = false;
    };
    // refreshControlState is uid-dependent; the user-bound effect below refreshes
    // again once auth resolves — this mount pass only needs the initial resolve.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!uid) {
      setEraseGuardHydrated(false);
      return;
    }
    let alive = true;
    setEraseGuardHydrated(false);
    // Codex P2: the user-bound re-hydration closes the mutation gate (the
    // hydrations reset their modules fail-closed synchronously) — mirror that
    // to the UI BEFORE the async reads, so the previous user's learning
    // surface cannot remain interactive; the finally refresh below re-reads
    // the actual gate once hydration resolves.
    setLearningPaused(true);
    // Hydrate every durable sync control record bound to THIS user before any sync
    // is allowed: the erase guard (incl. its durable PHASE), the acknowledged
    // generation, and any remote-erase recovery marker. User-mismatched / corrupt
    // records fail closed.
    void Promise.all([
      hydrateCloudEraseGuard(),
      hydrateSyncGeneration({ userId: uid }),
      hydrateRemoteEraseRecovery({ userId: uid }),
    ]).finally(() => {
      if (!alive) return;
      refreshControlState();
      setEraseGuardHydrated(true);
    });
    return () => {
      alive = false;
    };
  }, [uid, syncEpoch, refreshControlState]);

  // Pull from cloud on first login, then merge.
  // Progress = union(local, cloud) — section completion is monotonic.
  // DailyReview = whichever date is newer (same date => higher count wins).
  // Errors stay local-only here; cloud round-trip is SW10F's scope.
  // hasPulled is set after the async pull/merge resolves so the effect can
  // re-run cleanly if its material dependencies change mid-flight.
  useEffect(() => {
    if (!user || !storageHook.loaded || hasPulled.current) return;
    // PR-I1: wait until the durable records hydrate; skip while an erase is
    // pending or a remote-erase recovery is awaiting the user's confirmation.
    if (!eraseGuardHydrated || !isCloudSyncAdmitted() || isRemoteErasePending()) return;

    (async () => {
      // PR-I1 (durable delete, multi-device) reconcile — NO automatic wipe. The
      // fail-closed order is pure ({@link resolveGenerationReconcile}): server
      // generation is fetched FIRST (null/throw → fail closed with the learner
      // inventory never scanned); the inventory is read ONLY when server > local,
      // and an inventory read failure also fails closed without escaping this
      // effect. A missing/malformed sync-state row surfaces as null (never
      // baseline 0, never client-created).
      const decision = await resolveGenerationReconcile({
        fetchServerGeneration: fetchSyncGeneration,
        localGeneration: syncGeneration,
        hasLearnerData: hasLocalLearnerData,
      });
      if (decision.kind === "fail_closed") {
        blockSyncGeneration(); // no pull, no merge, no local write, no push
        return;
      }
      if (decision.kind === "recovery") {
        // Codex P2-3: fail closed BEFORE the marker write can fail. The server
        // has provably advanced past this device's generation, so the stale
        // local generation must stop being admitted regardless of whether the
        // recovery marker persists.
        blockSyncGeneration();
        try {
          await persistRemoteEraseRecovery({
            userId: user.id,
            targetGeneration: decision.targetGeneration,
          });
          setRemoteEraseStatus("own"); // actionable: explicit confirmation flow
        } catch {
          // Marker persistence failed → no durable owned marker exists, so the
          // state is blocked-NOT-actionable (no "Clear this device"). Sync and
          // learner mutations stay blocked; a restart retries the reconcile.
          markRemoteEraseBlocked();
          setRemoteEraseStatus("blocked");
        }
        setLearningPaused(true); // Codex P2: the gate is closed either way
        hasPulled.current = true;
        return; // recovery UI takes over — no automatic device wipe, no pull
      }
      if (decision.kind === "acknowledge_and_pull") {
        // Fresh-install shortcut: adopt the current server generation, then
        // CONTINUE into the normal pull below under the acknowledged generation —
        // valid learner data created after the historical deletion must still be
        // pulled and merged. hasPulled is set only after the normal pull/apply
        // path completes. Codex P2 (round 2): fail closed WHILE the durable
        // acknowledgement is attempted — block first, and if the persist fails
        // the old baseline generation must not stay admitted.
        blockSyncGeneration();
        try {
          await setSyncGeneration({ userId: user.id, generation: decision.generation });
          // Success: the acknowledged generation is ready — fall through into
          // the normal pull below.
        } catch {
          // No durable acknowledgement → stay blocked: no pull, no merge, no
          // local write, no push. Blocked-NOT-actionable for the UI (no owned
          // recovery marker exists); a restart retries the reconcile.
          markRemoteEraseBlocked();
          setRemoteEraseStatus("blocked");
          setLearningPaused(true); // Codex P2: the gate is closed
          return;
        }
      }
      // decision.kind === "proceed" (or acknowledged) → normal pull + merge below.

      // PR-H P2-2: snapshot the reset epoch BEFORE the pull starts. If a local
      // privacy reset lands while this pull is in flight, its result is stale
      // pre-reset cloud data — applying it would silently undo the reset (C5).
      const pullEpoch = privacyResetEpoch();
      // PR-I1: snapshot the erase generation BEFORE the pull. If a cloud-erase
      // begins while this pull is in flight, its result must be discarded at THIS
      // apply boundary — no merge, no updateStoredData, no follow-up push — so a
      // pre-existing pull can never restore rows the erase is deleting.
      const eraseGen = cloudEraseGeneration();

      const cloud = await pullFromCloud();

      // An erase began mid-flight → discard this pull entirely (apply boundary).
      if (isEraseGenerationStale(eraseGen)) {
        return;
      }

      // A reset happened mid-flight → discard this pull ENTIRELY: no merge, no
      // updateStoredData, no push. `hasPulled` is left unset so a genuinely new
      // pull started after the reset (captured under the new epoch) still runs
      // the normal path. This does not change the merge algorithm below.
      if (isPersistSuppressed(pullEpoch)) {
        return;
      }

      if (!cloud) {
        hasPulled.current = true;
        return;
      }

      // Read storage AFTER pullFromCloud resolves so any in-flight local
      // changes (mk, daily review tap, error log) are reflected in the
      // merge inputs. Capturing before the await would let the merge
      // overwrite fresh local state with stale-snapshot-derived values.
      const s = storageRef.current;

      const mergedProgress = mergeProgress(s.prog, cloud.progress);
      const mergedDailyReview = mergeDailyReview(s.dailyRev, cloud.dailyReview);

      const localProgressDiffers = !progressEqual(mergedProgress, s.prog);
      const localDailyReviewDiffers = !dailyReviewEqual(
        mergedDailyReview,
        s.dailyRev
      );
      const cloudProgressDiffers = !progressEqual(
        mergedProgress,
        cloud.progress
      );
      const cloudDailyReviewDiffers = !dailyReviewEqual(
        mergedDailyReview,
        cloud.dailyReview
      );

      if (localProgressDiffers || localDailyReviewDiffers) {
        // Atomic whole-blob write against the latest store value: apply the
        // merged progress / daily review, preserve the latest errors (audit B6).
        s.updateStoredData((cur) => ({
          p: localProgressDiffers ? mergedProgress : cur.p,
          err: cur.err,
          dr: localDailyReviewDiffers ? mergedDailyReview : cur.dr,
        }));
      }

      if (cloudProgressDiffers || cloudDailyReviewDiffers) {
        pushToCloud({
          progress: mergedProgress,
          errors: s.errors,
          dailyReview: mergedDailyReview,
        });
      }

      if (
        localProgressDiffers ||
        localDailyReviewDiffers ||
        cloudProgressDiffers ||
        cloudDailyReviewDiffers
      ) {
        console.log("[sync] merged progress/dailyReview");
      }

      hasPulled.current = true;
    })();
  }, [
    user,
    storageHook.loaded,
    eraseGuardHydrated,
    syncEpoch,
    pullFromCloud,
    pushToCloud,
    fetchSyncGeneration,
  ]);

  // Atomically update the daily-review slice, then push the resulting full blob
  // to cloud (preserves the prior save-then-push cloud behavior, now race-safe).
  const updateDailyReviewWithSync = useCallback(
    (fn: (dr: DailyReview) => DailyReview) => {
      const next = storageHook.updateDailyReview(fn);
      if (user) {
        pushToCloud({
          progress: next.p,
          errors: next.err,
          dailyReview: next.dr,
        });
      }
    },
    [storageHook.updateDailyReview, user, pushToCloud]
  );

  // PR-H: complete device-local privacy reset.
  //  1) bump the reset epoch — this SYNCHRONOUSLY notifies every mounted runtime
  //     store (useStorage here, a screen-local useSRS, etc.) to clear its
  //     in-memory state and re-acknowledge the new epoch, so nothing keeps stale
  //     data and fresh post-reset writes resume without a restart; any store that
  //     is not subscribed stays write-suppressed until it remounts;
  //  2) clear the full on-device inventory (progress, SRS, learning-engine keys,
  //     telemetry, privacy state, and every __corrupt quarantine blob).
  // Cloud rows are intentionally untouched (audit C1, future work).
  const resetLocalData = useCallback(async () => {
    bumpPrivacyResetEpoch();
    await resetAllLocalPrivacyData();
  }, []);

  // PR-I1: single-flight locks for the two destructive privacy operations. A
  // second call while one is active JOINS the in-flight promise — no second op
  // id, arm, RPC, reset, or finalization sequence can start. The lock is taken
  // synchronously before any await/marker mutation; UI busy state is UX only.
  const deleteFlightRef = useRef<SingleFlight<DeleteSyncedStatus> | null>(null);
  if (deleteFlightRef.current === null) {
    deleteFlightRef.current = createSingleFlight<DeleteSyncedStatus>();
  }
  const confirmFlightRef = useRef<SingleFlight<void> | null>(null);
  if (confirmFlightRef.current === null) {
    confirmFlightRef.current = createSingleFlight<void>();
  }

  // PR-I1 (audit C1): delete synced learning data. Runs the approved state
  // machine — arm coordinator (close→persist op-id→drain) → authenticated delete
  // RPC (server bumps generation, then deletes) → PR-H local reset → acknowledge
  // the new generation locally (cleanup-before-ack) → clear guard. Reuses
  // `resetLocalData` for local cleanup; never signs out. Requires a session
  // (ownership resolves from auth.uid() server-side). A retry reuses the durable
  // op-id so the server replays idempotently (no double generation bump).
  // SINGLE-FLIGHT: concurrent calls join the same operation.
  const deleteSyncedData = useCallback((): Promise<DeleteSyncedStatus> => {
    return deleteFlightRef.current!.run(async () => {
      if (!user) return "cloud_failed";
      // Codex P2: reflect the closing gate in the UI BEFORE any await — an
      // already-open lesson must become non-interactive as soon as the
      // destructive flow starts. The finally refresh re-reads the actual gate
      // on EVERY outcome (success, failure, or thrown), so an arm that left no
      // blocked state reopens learning without a reload.
      setLearningPaused(true);
      try {
        // A pending deletion owned by ANOTHER user — or one whose marker is corrupt
        // (unknown owner) — must never be executed under this user: the original
        // account must complete its own pending deletion. Fail closed.
        if (cloudEraseState() === "pending" && cloudErasePendingUserId() !== user.id) {
          return "cloud_failed";
        }
        // Reuse a pending op id (crash/retry) so the server replays idempotently,
        // and RESUME from the durable phase so no completed destructive step
        // re-runs. A NEW id is a validated RFC4122 UUIDv4 (the server column is
        // `uuid`). The state machine passes the operation identity to every phase
        // advance / marker clear, so a stale task can never touch another
        // operation's marker.
        const opId = cloudErasePendingOpId() ?? (await makeOperationId());
        const phase = cloudErasePendingPhase();
        const resume = phase
          ? {
              phase,
              serverGeneration: cloudErasePendingServerGeneration() ?? undefined,
            }
          : null;
        const uidNow = user.id;
        // Codex P1: if auth switches mid-operation (sign-out + another sign-in),
        // STOP at the latest durably recorded phase — never run a destructive or
        // finalizing step for `uidNow` under a different active identity. The
        // original owner resumes safely from the retained marker.
        const assertOwnerActive = () => {
          if (latestUserIdRef.current !== uidNow) {
            throw new Error("auth changed during deletion; stopping at the recorded phase");
          }
        };
        const status = await runDeleteSyncedData({
          resume,
          armErase: () => armCloudErase({ opId, userId: uidNow }),
          // Codex P1: verify-then-PIN. The live identity, the fresh session, and
          // the pending marker are all re-verified immediately before the RPC,
          // and the request is pinned to the VERIFIED session's access token —
          // the mutable global client is never consulted for the deletion, so a
          // session switched to another account can never be deleted.
          deleteCloud: () =>
            runPinnedCloudDelete({
              ownerUserId: uidNow,
              operationId: opId,
              latestAuthUserId: () => latestUserIdRef.current,
              getSession: currentSessionSnapshot,
              pendingOwner: cloudErasePendingUserId,
              pendingOpId: cloudErasePendingOpId,
              rpcWithToken: (token, id) => deleteSyncedRows(id, token),
            }),
          markCloudDeleted: (gen) =>
            advanceCloudErasePhase({
              phase: "cloud_deleted",
              serverGeneration: gen,
              expectedUserId: uidNow,
              expectedOperationId: opId,
            }),
          resetLocal: async () => {
            assertOwnerActive();
            await resetLocalData();
          },
          markLocalResetDone: () =>
            advanceCloudErasePhase({
              phase: "local_reset_done",
              expectedUserId: uidNow,
              expectedOperationId: opId,
            }),
          acknowledgeGeneration: async (gen) => {
            assertOwnerActive();
            await setSyncGeneration({ userId: uidNow, generation: gen });
          },
          finishErase: async () => {
            assertOwnerActive();
            await finishCloudErase(undefined, { userId: uidNow, operationId: opId });
          },
        });
        return status;
      } finally {
        refreshControlState();
      }
    });
  }, [user, deleteSyncedRows, resetLocalData, refreshControlState]);

  // PR-I1: explicit second-device recovery. Owner-verified, then the current
  // server generation is REVALIDATED (the recorded target may be stale if a
  // further deletion happened before confirmation) → PR-H reset (once) →
  // acknowledge the FRESH generation → clear the marker → reopen. A fetch
  // failure leaves recovery fully pending (no reset, no acknowledgement, no
  // clear, no reopen). No automatic remote wipe ever happens without this.
  // SINGLE-FLIGHT: concurrent confirmations join the one operation, so fetch /
  // reset / acknowledgement / clear each run once and a delayed second
  // invocation can never reset learner data after recovery has been cleared
  // (a fresh call after completion finds no owned marker → no-op).
  const confirmRemoteErase = useCallback((): Promise<void> => {
    return confirmFlightRef.current!.run(async () => {
      if (!user) return;
      const uidNow = user.id;
      // Codex P2: mirror the (already closed) gate before the async work; the
      // finally refresh re-reads the actual gate on every outcome, so a
      // completed confirmation reopens learning without a reload.
      setLearningPaused(true);
      try {
        // Codex P1 (round 3): same owner revalidation as the delete flow. If auth
        // switches while the confirmation is in flight (e.g. during the server
        // generation fetch), no destructive, acknowledging, or clearing step may
        // run for uidNow under a different active identity — a thrown guard
        // leaves the recovery marker fully pending (no reset / no ack / no clear /
        // no reopen), so the original owner retries later from the same marker.
        const assertOwnerActive = () => {
          if (latestUserIdRef.current !== uidNow) {
            throw new Error("auth changed during recovery; leaving recovery pending");
          }
        };
        const outcome = await runRemoteEraseConfirm({
          recovery: remoteEraseRecovery(),
          currentUserId: uidNow,
          fetchServerGeneration: fetchSyncGeneration,
          resetLocal: async () => {
            assertOwnerActive();
            await resetLocalData();
          },
          acknowledgeGeneration: async (gen) => {
            assertOwnerActive();
            await setSyncGeneration({ userId: uidNow, generation: gen });
          },
          clearRecovery: async () => {
            assertOwnerActive();
            // The shared recovery key must STILL hold this user's actionable
            // marker — never clear whatever happens to occupy it merely because
            // the active auth identity matches (absent / foreign / corrupt →
            // throw: nothing cleared, sync not reopened, recovery stays pending).
            const marker = remoteEraseRecovery();
            if (!marker || marker.userId !== uidNow) {
              throw new Error("recovery marker changed; refusing to clear");
            }
            await clearRemoteEraseRecovery();
          },
        });
        if (outcome === "done") {
          hasPulled.current = false;
          setSyncEpoch((n) => n + 1); // re-run reconcile/pull now that sync is unblocked
        }
      } finally {
        refreshControlState();
      }
    });
  }, [user, fetchSyncGeneration, resetLocalData, refreshControlState]);

  // Stamp the write-RPC generation-mismatch handler (see useProgressSync wiring):
  // block admission → fetch the current generation → recovery marker when local
  // learner data exists, fresh acknowledgement when the device is empty. The
  // rejected payload is never restamped or resent.
  generationMismatchRef.current = () => {
    if (!user) return;
    const uidNow = user.id;
    void handleGenerationMismatch({
      userId: uidNow,
      localGeneration: syncGeneration(),
      blockGeneration: blockSyncGeneration,
      fetchServerGeneration: fetchSyncGeneration,
      hasLearnerData: () => hasLocalLearnerData(),
      // Codex P2-3: same persistence-failure class as the startup reconcile —
      // if the required marker cannot be persisted, surface a blocked-NOT-
      // actionable state instead of a silently blocked generation. The rethrow
      // keeps the pure machine's outcome "blocked" (admission stays stopped).
      persistRecovery: async (args) => {
        try {
          await persistRemoteEraseRecovery(args);
        } catch (e) {
          markRemoteEraseBlocked();
          throw e;
        }
      },
      acknowledgeGeneration: (gen) =>
        setSyncGeneration({ userId: uidNow, generation: gen }),
    }).then(() => refreshControlState());
  };

  // Wrap logErr to also push error to cloud
  const logErrWithSync = useCallback(
    (word: string, section: string, given: string, correct: string, lessonId: number) => {
      errorsHook.logErr(word, section, given, correct, lessonId);
      if (user) {
        pushError({ w: word, s: section, g: given, c: correct, l: lessonId, t: Date.now() });
      }
    },
    [errorsHook.logErr, user, pushError]
  );

  const value: AppContextType = {
    // Storage
    prog: storageHook.prog,
    errors: storageHook.errors,
    dailyRev: storageHook.dailyRev,
    // PR-I1: the app is "loaded" only once the LOCAL deletion-control records
    // have hydrated too — until then learner-mutation persistence is fail-closed
    // and no normal writable learning state may be presented. Local-only; never
    // waits on network or auth.
    loaded: storageHook.loaded && controlHydrated,
    updateDailyReview: updateDailyReviewWithSync,

    // Progress
    mk: progressHook.mk,
    lp: progressHook.lp,

    // Errors
    logErr: logErrWithSync,
    weakSpots: errorsHook.weakSpots,

    // Speech
    say,
    stopSpeech,

    // Privacy
    resetLocalData,
    deleteSyncedData,
    remoteEraseStatus,
    confirmRemoteErase,
    pendingDeletion,
    learningPaused,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
