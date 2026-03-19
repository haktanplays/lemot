import React, { createContext, useContext } from "react";
import { useStorage } from "@/hooks/useStorage";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { useErrors } from "@/hooks/useErrors";
import { useSpeech } from "@/hooks/useSpeech";
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
  const storageHook = useStorage();
  const progressHook = useLessonProgress(storageHook);
  const errorsHook = useErrors(storageHook);
  const { say, stop: stopSpeech } = useSpeech();

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
    save: storageHook.save,

    // Progress
    gx: progressHook.gx,
    mk: progressHook.mk,
    lp: progressHook.lp,

    // Errors
    logErr: errorsHook.logErr,
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
