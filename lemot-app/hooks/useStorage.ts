import { useState, useEffect, useCallback } from "react";
import { kvStorage } from "@/lib/storage";
import type { StorageData, ErrorEntry, DailyReview } from "@/lib/types";

const STORAGE_KEY = "lm7";

export function useStorage() {
  const [prog, setProg] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState(0);
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [dailyRev, setDailyRev] = useState<DailyReview>({
    date: "",
    count: 0,
  });
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await kvStorage.getItem(STORAGE_KEY);
        if (raw) {
          const d: StorageData = JSON.parse(raw);
          setProg(d.p || {});
          setXp(d.xp || 0);
          setErrors(d.err || []);

          const dr = d.dr || { date: "", count: 0 };
          let str = d.streak || 0;

          const td = new Date().toISOString().slice(0, 10);
          const yd = new Date(Date.now() - 86400000)
            .toISOString()
            .slice(0, 10);
          if (dr.date && dr.date !== td && dr.date !== yd) str = 0;
          if (dr.date === yd && dr.count < 5) str = 0;

          setDailyRev(dr);
          setStreak(str);
        }
      } catch (e) {
        console.warn("[Storage] Load failed:", e);
      }
      setLoaded(true);
    })();
  }, []);

  // Save to AsyncStorage
  const save = useCallback(
    async (
      p: Record<string, boolean>,
      x: number,
      err: ErrorEntry[],
      dr: DailyReview,
      str: number
    ) => {
      try {
        const data: StorageData = {
          p,
          xp: x,
          err: err || [],
          dr: dr || { date: "", count: 0 },
          streak: str || 0,
        };
        await kvStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn("[Storage] Save failed:", e);
      }
    },
    []
  );

  return {
    prog,
    setProg,
    xp,
    setXp,
    errors,
    setErrors,
    dailyRev,
    setDailyRev,
    streak,
    setStreak,
    loaded,
    save,
  };
}
