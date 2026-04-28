import { useCallback } from "react";
import { SECS } from "@/constants/sections";
import type { ErrorEntry, DailyReview } from "@/lib/types";

interface UseLessonProgressArgs {
  prog: Record<string, boolean>;
  setProg: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  xp: number;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  errors: ErrorEntry[];
  dailyRev: DailyReview;
  save: (
    p: Record<string, boolean>,
    x: number,
    err: ErrorEntry[],
    dr: DailyReview
  ) => void;
}

export function useLessonProgress({
  prog,
  setProg,
  xp,
  setXp,
  errors,
  dailyRev,
  save,
}: UseLessonProgressArgs) {
  /** Add XP */
  const gx = useCallback(
    (n: number) => {
      setXp((prev) => {
        const next = prev + n;
        save(prog, next, errors, dailyRev);
        return next;
      });
    },
    [prog, errors, dailyRev, save, setXp]
  );

  /** Mark section complete */
  const mk = useCallback(
    (lessonId: number, sectionKey: string) => {
      setProg((prev) => {
        const next = { ...prev, [`${lessonId}-${sectionKey}`]: true };
        save(next, xp, errors, dailyRev);
        return next;
      });
    },
    [xp, errors, dailyRev, save, setProg]
  );

  /** Get lesson progress (completed sections count) */
  const lp = useCallback(
    (lessonId: number): number => {
      let count = 0;
      SECS.forEach((s) => {
        if (prog[`${lessonId}-${s}`]) count++;
      });
      return count;
    },
    [prog]
  );

  return { gx, mk, lp };
}
