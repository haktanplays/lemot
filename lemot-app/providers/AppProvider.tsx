import React, { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { useStorage } from "@/hooks/useStorage";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useErrors } from "@/hooks/useErrors";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuthContext } from "@/providers/AuthProvider";
import { useProgressSync } from "@/hooks/useProgressSync";
import { resetAllLocalPrivacyData } from "@/content/learning-engine/local-privacy-inventory";
import {
  bumpPrivacyResetEpoch,
  privacyResetEpoch,
  isPersistSuppressed,
} from "@/lib/privacyResetEpoch";
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
  const { pushToCloud, pullFromCloud, pushError } = useProgressSync(user?.id);
  const hasPulled = useRef(false);

  // Ref to capture latest storage values for the pull effect
  const storageRef = useRef(storageHook);
  storageRef.current = storageHook;

  // Pull from cloud on first login, then merge.
  // Progress = union(local, cloud) — section completion is monotonic.
  // DailyReview = whichever date is newer (same date => higher count wins).
  // Errors stay local-only here; cloud round-trip is SW10F's scope.
  // hasPulled is set after the async pull/merge resolves so the effect can
  // re-run cleanly if its material dependencies change mid-flight.
  useEffect(() => {
    if (!user || !storageHook.loaded || hasPulled.current) return;

    (async () => {
      // PR-H P2-2: snapshot the reset epoch BEFORE the pull starts. If a local
      // privacy reset lands while this pull is in flight, its result is stale
      // pre-reset cloud data — applying it would silently undo the reset (C5).
      const pullEpoch = privacyResetEpoch();

      const cloud = await pullFromCloud();

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
  }, [user, storageHook.loaded, pullFromCloud, pushToCloud]);

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
    loaded: storageHook.loaded,
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
