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
  xp: number;
  errors: ErrorEntry[];
  dailyRev: DailyReview;
  setDailyRev: React.Dispatch<React.SetStateAction<DailyReview>>;
  streak: number;
  setStreak: React.Dispatch<React.SetStateAction<number>>;
  loaded: boolean;
  save: (
    p: Record<string, boolean>,
    x: number,
    err: ErrorEntry[],
    dr: DailyReview,
    str: number
  ) => void;

  // Progress
  gx: (n: number) => void;
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

  // Pull from cloud on first login
  useEffect(() => {
    if (!user || !storageHook.loaded || hasPulled.current) return;
    hasPulled.current = true;

    const s = storageRef.current;
    (async () => {
      const cloud = await pullFromCloud();
      if (!cloud) return;

      // Merge: cloud wins if it has more XP (more progress)
      if (cloud.xp > s.xp) {
        s.setProg(cloud.progress);
        s.setXp(cloud.xp);
        s.setStreak(cloud.streak);
        s.setDailyRev(cloud.dailyReview);
        s.save(cloud.progress, cloud.xp, s.errors, cloud.dailyReview, cloud.streak);
      } else if (s.xp > cloud.xp) {
        // Local has more progress — push to cloud
        pushToCloud({
          progress: s.prog,
          xp: s.xp,
          errors: s.errors,
          dailyReview: s.dailyRev,
          streak: s.streak,
        });
      }
    })();
  }, [user, storageHook.loaded, pullFromCloud, pushToCloud]);

  // Wrap save to also push to cloud
  const saveWithSync = useCallback(
    (p: Record<string, boolean>, x: number, err: ErrorEntry[], dr: DailyReview, str: number) => {
      storageHook.save(p, x, err, dr, str);
      if (user) {
        pushToCloud({ progress: p, xp: x, errors: err, dailyReview: dr, streak: str });
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
    xp: storageHook.xp,
    errors: storageHook.errors,
    dailyRev: storageHook.dailyRev,
    setDailyRev: storageHook.setDailyRev,
    streak: storageHook.streak,
    setStreak: storageHook.setStreak,
    loaded: storageHook.loaded,
    save: saveWithSync,

    // Progress
    gx: progressHook.gx,
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
