import { useState, useEffect, useCallback, useRef } from "react";
import { kvStorage } from "@/lib/storage";
import { loadOrQuarantine, isPlainObject } from "@/lib/safeStorage";
import { createBlobStore, type BlobStore } from "@/lib/blobStore";
import { privacyResetEpoch, isPersistSuppressed } from "@/lib/privacyResetEpoch";
import type { StorageData, ErrorEntry, DailyReview } from "@/lib/types";

const STORAGE_KEY = "lm7";

const EMPTY: StorageData = { p: {}, err: [], dr: { date: "", count: 0 } };

/** A save carries real data worth persisting (vs an empty first-run default). */
function isMeaningful(data: StorageData): boolean {
  return (
    Object.keys(data.p).length > 0 ||
    (data.err?.length ?? 0) > 0 ||
    (data.dr?.date ?? "") !== ""
  );
}

/**
 * Shared `lm7` blob storage.
 *
 * All writes go through a single atomic {@link BlobStore} (audit B6): progress,
 * errors, and daily review are updated by slice via functional read-modify-write
 * against the latest blob, so interleaved writers never clobber each other's
 * slice. React state mirrors the store for rendering; the store is the source of
 * truth. The PR-A non-destructive corrupt-storage guard is preserved in the
 * persist path.
 */
export function useStorage() {
  const [prog, setProg] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [dailyRev, setDailyRev] = useState<DailyReview>({
    date: "",
    count: 0,
  });
  const [loaded, setLoaded] = useState(false);
  // PR-A: set when the load found corrupt data (already backed up). While true,
  // an empty/default save must NOT overwrite the original key — recovery only
  // happens once real data exists (see persist()).
  const corruptUnrecovered = useRef(false);
  // PR-H: the reset epoch this hook has acknowledged. If a local privacy reset
  // bumps the epoch past this, `persist` is suppressed so stale in-memory state
  // can never re-create the cleared `lm7` key; `resetLocal` re-acknowledges it.
  const ackEpoch = useRef(privacyResetEpoch());

  // Persist the full blob with the PR-A non-destructive guard + PR-H reset guard.
  const persist = useCallback((next: StorageData) => {
    // PR-H: a reset happened that this store has not acknowledged → its data is
    // stale pre-reset state; do not write it back over the cleared key.
    if (isPersistSuppressed(ackEpoch.current)) return;
    const meaningful = isMeaningful(next);
    if (corruptUnrecovered.current && !meaningful) return;
    if (meaningful) corruptUnrecovered.current = false;
    try {
      kvStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.warn("[Storage] Save failed:", e);
    }
  }, []);

  // Single atomic store (created once). Every writer merges against its latest
  // value, so slice updates never clobber siblings.
  const storeRef = useRef<BlobStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createBlobStore({ ...EMPTY }, (next) => persist(next));
  }

  const syncState = useCallback((next: StorageData) => {
    setProg(next.p);
    setErrors(next.err);
    setDailyRev(next.dr);
  }, []);

  // Load from kvStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const { value, corrupt } = await loadOrQuarantine<StorageData>(
          kvStorage,
          STORAGE_KEY,
          isPlainObject,
          "lm7-invalid-json-or-shape"
        );
        if (corrupt) {
          // Raw blob preserved under `${STORAGE_KEY}__corrupt`; keep in-memory
          // safe defaults and block a clean-empty clobber of the original key.
          corruptUnrecovered.current = true;
          console.warn(
            "[Storage] Corrupt lm7 quarantined to backup key; kept raw, not overwriting."
          );
        } else if (value) {
          const hydrated: StorageData = {
            p: value.p || {},
            err: value.err || [],
            dr: value.dr || { date: "", count: 0 },
          };
          storeRef.current!.hydrate(hydrated);
          syncState(hydrated);
        }
      } catch (e) {
        // Any unexpected load failure falls back to safe in-memory defaults.
        console.warn("[Storage] Load failed:", e);
      } finally {
        // Always finish startup — never leave the app stuck unloaded.
        setLoaded(true);
      }
    })();
  }, [syncState]);

  // Atomic slice updaters — read-modify-write against the latest blob (fix B6).
  // Each syncs React state and returns the resulting full blob (callers that
  // sync to cloud use the returned value; see AppProvider).
  const updateProgress = useCallback(
    (fn: (p: Record<string, boolean>) => Record<string, boolean>) => {
      const next = storeRef.current!.updateProgress(fn);
      syncState(next);
      return next;
    },
    [syncState]
  );

  const updateErrors = useCallback(
    (fn: (err: ErrorEntry[]) => ErrorEntry[]) => {
      const next = storeRef.current!.updateErrors(fn);
      syncState(next);
      return next;
    },
    [syncState]
  );

  const updateDailyReview = useCallback(
    (fn: (dr: DailyReview) => DailyReview) => {
      const next = storeRef.current!.updateDailyReview(fn);
      syncState(next);
      return next;
    },
    [syncState]
  );

  const updateStoredData = useCallback(
    (fn: (cur: StorageData) => StorageData) => {
      const next = storeRef.current!.update(fn);
      syncState(next);
      return next;
    },
    [syncState]
  );

  // PR-H: clear the live in-memory blob to empty and acknowledge the current
  // reset epoch. Called after a local privacy reset has cleared storage, so that
  // (a) no stale pre-reset data remains in memory to be written back, and (b)
  // genuinely new post-reset activity persists fresh (built on empty), without
  // requiring an app restart. Does NOT persist here — it only resets runtime state.
  const resetLocal = useCallback(() => {
    storeRef.current!.hydrate({ p: {}, err: [], dr: { date: "", count: 0 } });
    syncState({ p: {}, err: [], dr: { date: "", count: 0 } });
    corruptUnrecovered.current = false;
    ackEpoch.current = privacyResetEpoch();
  }, [syncState]);

  return {
    prog,
    errors,
    dailyRev,
    loaded,
    updateProgress,
    updateErrors,
    updateDailyReview,
    updateStoredData,
    resetLocal,
  };
}
