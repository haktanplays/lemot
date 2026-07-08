import { useState, useEffect, useCallback, useRef } from "react";
import { kvStorage } from "@/lib/storage";
import { loadOrQuarantine, isPlainObject } from "@/lib/safeStorage";
import type { StorageData, ErrorEntry, DailyReview } from "@/lib/types";

const STORAGE_KEY = "lm7";

/** A save carries real data worth persisting (vs an empty first-run default). */
function isMeaningful(
  p: Record<string, boolean>,
  err: ErrorEntry[],
  dr: DailyReview
): boolean {
  return (
    Object.keys(p).length > 0 ||
    (err?.length ?? 0) > 0 ||
    (dr?.date ?? "") !== ""
  );
}

export function useStorage() {
  const [prog, setProg] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [dailyRev, setDailyRev] = useState<DailyReview>({
    date: "",
    count: 0,
  });
  const [loaded, setLoaded] = useState(false);
  // Set when the load found corrupt data (already backed up). While true, an
  // empty/default save must NOT overwrite the original key — recovery only
  // happens once real progress exists (see save()).
  const corruptUnrecovered = useRef(false);

  // Load from kvStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const { value, corrupt } = await loadOrQuarantine<StorageData>(
          kvStorage,
          STORAGE_KEY,
          isPlainObject,
          "lm7-invalid-json-or-shape"
        );
        if (corrupt) {
          // Raw blob preserved under `${STORAGE_KEY}__corrupt`; keep in-memory
          // safe defaults and block a clean-empty clobber of the original key.
          corruptUnrecovered.current = true;
          console.warn(
            "[Storage] Corrupt lm7 quarantined to backup key; kept raw, not overwriting."
          );
        } else if (value) {
          setProg(value.p || {});
          setErrors(value.err || []);
          setDailyRev(value.dr || { date: "", count: 0 });
        }
      } catch (e) {
        // Any unexpected load failure falls back to safe in-memory defaults.
        console.warn("[Storage] Load failed:", e);
      } finally {
        // Always finish startup — never leave the app stuck unloaded.
        setLoaded(true);
      }
    })();
  }, []);

  // Save to kvStorage
  const save = useCallback(
    async (
      p: Record<string, boolean>,
      err: ErrorEntry[],
      dr: DailyReview
    ) => {
      const meaningful = isMeaningful(p, err, dr);
      // Do not let an empty/default save clobber a still-corrupt original key.
      if (corruptUnrecovered.current && !meaningful) return;
      // A real replacement state completes recovery: allow writes again.
      if (meaningful) corruptUnrecovered.current = false;
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
