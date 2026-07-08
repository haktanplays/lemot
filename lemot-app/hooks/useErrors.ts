import { useCallback, useMemo } from "react";
import type { ErrorEntry } from "@/lib/types";

interface UseErrorsArgs {
  errors: ErrorEntry[];
  updateErrors: (fn: (err: ErrorEntry[]) => ErrorEntry[]) => void;
}

export function useErrors({ errors, updateErrors }: UseErrorsArgs) {
  /**
   * Log an error. Appends to only the errors slice via the atomic store, so it
   * preserves the latest progress and daily-review data (audit B6).
   */
  const logErr = useCallback(
    (
      word: string,
      section: string,
      given: string,
      correct: string,
      lessonId: number
    ) => {
      const entry: ErrorEntry = {
        w: word,
        s: section,
        g: given,
        c: correct,
        l: lessonId,
        t: Date.now(),
      };
      updateErrors((prev) => [...prev, entry]);
    },
    [updateErrors]
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
