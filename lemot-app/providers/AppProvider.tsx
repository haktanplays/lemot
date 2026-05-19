import React, { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { useStorage } from "@/hooks/useStorage";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useErrors } from "@/hooks/useErrors";
import { useSpeech } from "@/hooks/useSpeech";
import { useAuthContext } from "@/providers/AuthProvider";
import { useProgressSync } from "@/hooks/useProgressSync";
import type { ErrorEntry, DailyReview } from "@/lib/types";

interface AppContextType {
  // Storage
  prog: Record<string, boolean>;
  errors: ErrorEntry[];
  dailyRev: DailyReview;
  setDailyRev: React.Dispatch<React.SetStateAction<DailyReview>>;
  loaded: boolean;
  save: (
    p: Record<string, boolean>,
    err: ErrorEntry[],
    dr: DailyReview
  ) => void;

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
      const cloud = await pullFromCloud();

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
        if (localProgressDiffers) s.setProg(mergedProgress);
        if (localDailyReviewDiffers) s.setDailyRev(mergedDailyReview);
        s.save(mergedProgress, s.errors, mergedDailyReview);
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

  // Wrap save to also push to cloud
  const saveWithSync = useCallback(
    (p: Record<string, boolean>, err: ErrorEntry[], dr: DailyReview) => {
      storageHook.save(p, err, dr);
      if (user) {
        pushToCloud({ progress: p, errors: err, dailyReview: dr });
      }
    },
    [storageHook.save, user, pushToCloud]
  );

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
    setDailyRev: storageHook.setDailyRev,
    loaded: storageHook.loaded,
    save: saveWithSync,

    // Progress
    mk: progressHook.mk,
    lp: progressHook.lp,

    // Errors
    logErr: logErrWithSync,
    weakSpots: errorsHook.weakSpots,

    // Speech
    say,
    stopSpeech,
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
