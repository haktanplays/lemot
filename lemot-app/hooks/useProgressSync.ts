import { useCallback } from "react";
import {
  supabase,
  currentSessionSnapshot,
  rpcDeleteSyncedDataPinned,
  rpcUpsertUserProgressPinned,
  rpcInsertUserErrorPinned,
} from "@/lib/supabase";
import { runPinnedCloudWrite } from "@/lib/pinnedWrite";
import {
  admitCloudWrite,
  releaseCloudWrite,
  isCloudSyncAdmitted,
} from "@/lib/cloudEraseGuard";
import {
  syncGeneration,
  syncGenerationUserId,
  isSyncGenerationReady,
} from "@/lib/syncGeneration";
import { isRemoteErasePending } from "@/lib/remoteEraseRecovery";
import type { ErrorEntry, DailyReview } from "@/lib/types";

interface SyncData {
  progress: Record<string, boolean>;
  errors: ErrorEntry[];
  dailyReview: DailyReview;
}

/**
 * Composite write gate (PR-I1): a cloud WRITE may proceed only when sync is
 * admitted (no erase pending / hydrated), this user's generation is ready
 * (user-bound, not stale/foreign), and no remote-erase recovery is pending.
 * `admitCloudWrite` (called by the caller) additionally enforces erase admission
 * atomically for the drain.
 */
function isWriteAllowed(): boolean {
  return isSyncGenerationReady() && !isRemoteErasePending();
}

/** True when a write-RPC error is the server's stale-generation rejection. */
function isStaleGenerationError(message: string | undefined): boolean {
  return typeof message === "string" && message.includes("stale sync generation");
}

/**
 * @param onGenerationMismatch invoked when a write RPC rejects with a stale
 *   generation — the caller (AppProvider) runs the mismatch recovery (block
 *   admission → fetch → recovery marker or fresh acknowledgement). The rejected
 *   payload is dropped, never restamped or resent. Codex P1: the callback
 *   carries the REJECTED write's userId (captured with the payload), so the
 *   caller can ignore a rejection whose owner is no longer the active account —
 *   an A-bound stale response must never drive recovery for B.
 */
export function useProgressSync(
  userId: string | undefined,
  onGenerationMismatch?: (rejectedUserId: string) => void
) {
  const pushToCloud = useCallback(
    async (data: SyncData) => {
      if (!userId || !isWriteAllowed()) return;
      // Register this write as active BEFORE issuing the request, so an erase
      // that begins mid-flight drains it before deleting. `null` → not admitted.
      const token = admitCloudWrite();
      if (token === null) return;
      try {
        // Codex P1 (round 4): verify-then-PIN. The ready generation must belong
        // to THIS payload's user, the current session must be this user's, and
        // the request executes pinned to the captured token + captured
        // generation — never the mutable global client, so a session switched
        // to another account can never receive this payload. Verification
        // failures SKIP silently (best-effort sync; local data stays intact).
        const result = await runPinnedCloudWrite({
          expectedUserId: userId,
          generationUserId: syncGenerationUserId,
          generation: syncGeneration,
          getSession: currentSessionSnapshot,
          send: (accessToken, generation) =>
            rpcUpsertUserProgressPinned({
              accessToken,
              generation,
              progress: data.progress,
              dailyReview: data.dailyReview,
            }),
        });
        if (result.kind === "sent" && result.errorMessage !== null) {
          console.warn("[Sync] Push failed:", result.errorMessage);
          // A stale-generation rejection means a deletion happened elsewhere:
          // hand off to the mismatch recovery; do NOT restamp/resend this payload.
          if (isStaleGenerationError(result.errorMessage)) onGenerationMismatch?.(userId);
        }
      } finally {
        releaseCloudWrite(token);
      }
    },
    [userId, onGenerationMismatch]
  );

  const pullFromCloud = useCallback(async (): Promise<SyncData | null> => {
    if (!userId) return null;
    // Don't start a pull unless sync is admitted, this user's generation is
    // ready, and no recovery is pending. The apply-boundary generation check in
    // AppProvider additionally discards a pull that raced an erase.
    if (!isCloudSyncAdmitted() || !isWriteAllowed()) return null;

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.warn("[sync] pullFromCloud failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return null;
    }

    if (!data) {
      return null;
    }

    return {
      progress: (data.progress as Record<string, boolean>) ?? {},
      errors: [],
      dailyReview: (data.daily_review as DailyReview) ?? { date: "", count: 0 },
    };
  }, [userId]);

  const pushError = useCallback(
    async (entry: ErrorEntry) => {
      if (!userId || !isWriteAllowed()) return;
      const token = admitCloudWrite();
      if (token === null) return;
      try {
        // Codex P1 (round 4): same verify-then-PIN as pushToCloud.
        const result = await runPinnedCloudWrite({
          expectedUserId: userId,
          generationUserId: syncGenerationUserId,
          generation: syncGeneration,
          getSession: currentSessionSnapshot,
          send: (accessToken, generation) =>
            rpcInsertUserErrorPinned({
              accessToken,
              generation,
              word: entry.w,
              section: entry.s,
              given: entry.g,
              correct: entry.c,
              lessonId: entry.l,
            }),
        });
        if (result.kind === "sent" && result.errorMessage !== null) {
          console.warn("[Sync] Error push failed:", result.errorMessage);
          // Same mismatch handoff as pushToCloud; the payload is never resent.
          if (isStaleGenerationError(result.errorMessage)) onGenerationMismatch?.(userId);
        }
      } finally {
        releaseCloudWrite(token);
      }
    },
    [userId, onGenerationMismatch]
  );

  // PR-I1 (audit C1): erase this user's synced rows via the authenticated,
  // atomic `delete_my_synced_learning_data` RPC. The only payload field is
  // `p_op_id`, an idempotency key (NOT a user identifier) — ownership resolves
  // from auth.uid() server-side. Codex P1: the request is PINNED to the access
  // token the caller verified for the deletion owner (never the mutable global
  // client, which follows whatever session is currently active). NOT gated by
  // the erase guard: it IS the deletion step (armed around by AppProvider).
  const deleteSyncedRows = useCallback(
    async (
      opId: string,
      accessToken: string
    ): Promise<{ ok: boolean; generation?: number }> => {
      if (!userId) return { ok: false };
      const { data, errorMessage } = await rpcDeleteSyncedDataPinned(accessToken, opId);
      if (errorMessage !== null) {
        console.warn("[sync] delete synced data failed:", errorMessage);
        return { ok: false };
      }
      const generation =
        data && typeof (data as { generation?: unknown }).generation === "number"
          ? (data as { generation: number }).generation
          : undefined;
      return { ok: true, generation };
    },
    [userId]
  );

  // PR-I1: read the authoritative server generation. Returns null on ANY
  // uncertainty so the caller FAILS CLOSED — legitimate sync-state rows come only
  // from signup/backfill, so a MISSING row is an anomaly, never baseline 0, and
  // the client never creates the row itself (only the authenticated delete RPC
  // may repair its caller's own row). A malformed generation is also null.
  const fetchSyncGeneration = useCallback(async (): Promise<number | null> => {
    if (!userId) return null;
    const { data, error } = await supabase
      .from("user_sync_state")
      .select("generation")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) return null; // fail closed
    if (!data) return null; // missing row → fail closed (anomaly, not baseline 0)
    return typeof data.generation === "number" && Number.isFinite(data.generation)
      ? data.generation
      : null; // malformed → fail closed
  }, [userId]);

  return {
    pushToCloud,
    pullFromCloud,
    pushError,
    deleteSyncedRows,
    fetchSyncGeneration,
  };
}
