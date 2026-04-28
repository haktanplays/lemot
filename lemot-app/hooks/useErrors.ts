import { useCallback, useMemo } from "react";
import type { ErrorEntry, DailyReview } from "@/lib/types";

interface UseErrorsArgs {
  errors: ErrorEntry[];
  setErrors: React.Dispatch<React.SetStateAction<ErrorEntry[]>>;
  prog: Record<string, boolean>;
  dailyRev: DailyReview;
  save: (
    p: Record<string, boolean>,
    err: ErrorEntry[],
    dr: DailyReview
  ) => void;
}

export function useErrors({
  errors,
  setErrors,
  prog,
  dailyRev,
  save,
}: UseErrorsArgs) {
  /** Log an error */
  const logErr = useCallback(
    (
      word: string,
      section: string,
      given: string,
      correct: string,
      lessonId: number
    ) => {
      setErrors((prev) => {
        const entry: ErrorEntry = {
          w: word,
          s: section,
          g: given,
          c: correct,
          l: lessonId,
          t: Date.now(),
        };
        const next = [...prev, entry];
        save(prog, next, dailyRev);
        return next;
      });
    },
    [prog, dailyRev, save, setErrors]
  );

  /** Compute weak spots (words with 3+ errors) */
  const weakSpots = useMemo(() => {
    const counts: Record<string, number> = {};
    errors.forEach((e) => {
      const k = e.c;
      counts[k] = (counts[k] || 0) + 1;
    });
    return Object.entries(counts)
      .filter(([, c]) => c >= 3)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({ word, count }));
  }, [errors]);

  return { logErr, weakSpots };
}
