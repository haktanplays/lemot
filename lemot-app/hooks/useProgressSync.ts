import { useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  admitCloudWrite,
  releaseCloudWrite,
  isCloudSyncAdmitted,
} from "@/lib/cloudEraseGuard";
import { syncGeneration, isSyncGenerationReady } from "@/lib/syncGeneration";
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
 *   payload is dropped, never restamped or resent.
 */
export function useProgressSync(
  userId: string | undefined,
  onGenerationMismatch?: () => void
) {
  const pushToCloud = useCallback(
    async (data: SyncData) => {
      if (!userId || !isWriteAllowed()) return;
      // Register this write as active BEFORE issuing the request, so an erase
      // that begins mid-flight drains it before deleting. `null` → not admitted.
      const token = admitCloudWrite();
      if (token === null) return;
      try {
        // Current clients write via the generation-aware RPC (bypasses the
        // generation-0 direct-write RLS); the server verifies exact generation.
        const { error } = await supabase.rpc("upsert_user_progress", {
          p_generation: syncGeneration(),
          p_progress: data.progress,
          p_daily_review: data.dailyReview,
        });
        if (error) {
          console.warn("[Sync] Push failed:", error.message);
          // A stale-generation rejection means a deletion happened elsewhere:
          // hand off to the mismatch recovery; do NOT restamp/resend this payload.
          if (isStaleGenerationError(error.message)) onGenerationMismatch?.();
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
        const { error } = await supabase.rpc("insert_user_error", {
          p_generation: syncGeneration(),
          p_word: entry.w,
          p_section: entry.s,
          p_given: entry.g,
          p_correct: entry.c,
          p_lesson_id: entry.l,
        });
        if (error) {
          console.warn("[Sync] Error push failed:", error.message);
          // Same mismatch handoff as pushToCloud; the payload is never resent.
          if (isStaleGenerationError(error.message)) onGenerationMismatch?.();
        }
      } finally {
        releaseCloudWrite(token);
      }
    },
    [userId, onGenerationMismatch]
  );

  // PR-I1 (audit C1): erase this user's synced rows via the authenticated,
  // atomic `delete_my_synced_learning_data` RPC. The only argument is `p_op_id`,
  // an idempotency key (NOT a user identifier) — ownership resolves from
  // auth.uid() server-side. The server bumps the per-user generation first, then
  // deletes, logs the operation, and returns the current generation. NOT gated by
  // the erase guard: it IS the deletion step (armed around by AppProvider).
  const deleteSyncedRows = useCallback(
    async (opId: string): Promise<{ ok: boolean; generation?: number }> => {
      if (!userId) return { ok: false };
      const { data, error } = await supabase.rpc("delete_my_synced_learning_data", {
        p_op_id: opId,
      });
      if (error) {
        console.warn("[sync] delete synced data failed:", error.message);
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
