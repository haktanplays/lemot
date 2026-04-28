import { useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { ErrorEntry, DailyReview } from "@/lib/types";

interface SyncData {
  progress: Record<string, boolean>;
  errors: ErrorEntry[];
  dailyReview: DailyReview;
}

export function useProgressSync(userId: string | undefined) {
  const pushToCloud = useCallback(
    async (data: SyncData) => {
      if (!userId) return;

      const { error } = await supabase
        .from("user_progress")
        .upsert(
          {
            user_id: userId,
            progress: data.progress,
            daily_review: data.dailyReview,
          },
          { onConflict: "user_id" }
        );

      if (error) console.warn("[Sync] Push failed:", error.message);
    },
    [userId]
  );

  const pullFromCloud = useCallback(async (): Promise<SyncData | null> => {
    if (!userId) return null;

    const { data, error } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) return null;

    return {
      progress: (data.progress as Record<string, boolean>) ?? {},
      errors: [],
      dailyReview: (data.daily_review as DailyReview) ?? { date: "", count: 0 },
    };
  }, [userId]);

  const pushError = useCallback(
    async (entry: ErrorEntry) => {
      if (!userId) return;

      const { error } = await supabase.from("user_errors").insert({
        user_id: userId,
        word: entry.w,
        section: entry.s,
        given_answer: entry.g,
        correct_answer: entry.c,
        lesson_id: entry.l,
      });

      if (error) console.warn("[Sync] Error push failed:", error.message);
    },
    [userId]
  );

  return { pushToCloud, pullFromCloud, pushError };
}
