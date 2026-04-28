import { useCallback } from "react";
import { SECS } from "@/constants/sections";
import type { ErrorEntry, DailyReview } from "@/lib/types";

interface UseLessonProgressArgs {
  prog: Record<string, boolean>;
  setProg: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  errors: ErrorEntry[];
  dailyRev: DailyReview;
  save: (
    p: Record<string, boolean>,
    err: ErrorEntry[],
    dr: DailyReview
  ) => void;
}

export function useLessonProgress({
  prog,
  setProg,
  errors,
  dailyRev,
  save,
}: UseLessonProgressArgs) {
  /** Mark section complete */
  const mk = useCallback(
    (lessonId: number, sectionKey: string) => {
      setProg((prev) => {
        const next = { ...prev, [`${lessonId}-${sectionKey}`]: true };
        save(next, errors, dailyRev);
        return next;
      });
    },
    [errors, dailyRev, save, setProg]
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

  return { mk, lp };
}
