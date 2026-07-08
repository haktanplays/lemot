import { useCallback } from "react";
import { SECS } from "@/constants/sections";

interface UseLessonProgressArgs {
  prog: Record<string, boolean>;
  updateProgress: (
    fn: (p: Record<string, boolean>) => Record<string, boolean>
  ) => void;
}

export function useLessonProgress({
  prog,
  updateProgress,
}: UseLessonProgressArgs) {
  /**
   * Mark section complete. Updates only the progress slice via the atomic store,
   * so it preserves the latest errors and daily-review data (audit B6).
   */
  const mk = useCallback(
    (lessonId: number, sectionKey: string) => {
      updateProgress((prev) => ({
        ...prev,
        [`${lessonId}-${sectionKey}`]: true,
      }));
    },
    [updateProgress]
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
