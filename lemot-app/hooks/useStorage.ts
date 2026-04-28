import { useState, useEffect, useCallback } from "react";
import { kvStorage } from "@/lib/storage";
import type { StorageData, ErrorEntry, DailyReview } from "@/lib/types";

const STORAGE_KEY = "lm7";

export function useStorage() {
  const [prog, setProg] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [dailyRev, setDailyRev] = useState<DailyReview>({
    date: "",
    count: 0,
  });
  const [loaded, setLoaded] = useState(false);

  // Load from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await kvStorage.getItem(STORAGE_KEY);
        if (raw) {
          const d: StorageData = JSON.parse(raw);
          setProg(d.p || {});
          setErrors(d.err || []);
          setDailyRev(d.dr || { date: "", count: 0 });
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
      err: ErrorEntry[],
      dr: DailyReview
    ) => {
      try {
        const data: StorageData = {
          p,
          err: err || [],
          dr: dr || { date: "", count: 0 },
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
    errors,
    setErrors,
    dailyRev,
    setDailyRev,
    loaded,
    save,
  };
}
