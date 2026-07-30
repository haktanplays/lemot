import type { StorageData, ErrorEntry, DailyReview } from "./types";

/**
 * Atomic in-memory store for the shared `lm7` blob (audit B6).
 *
 * The bug this fixes: progress, errors, and daily-review all live in one `lm7`
 * blob. When each writer read a stale full snapshot and then saved the whole
 * blob, the last writer clobbered the other slices' recent updates.
 *
 * This store is the single source of truth. Every mutation is a functional
 * read-modify-write against the LATEST `current` value (never a caller-held
 * snapshot), so interleaved slice updates always merge instead of clobbering:
 * updating one slice preserves the other two. JS is single-threaded, so the
 * synchronous read→apply→persist is atomic per call.
 *
 * Pure and framework-free by design (no React), so it is directly testable and
 * so `useStorage` can wrap it with React state + the PR-A persist guard. Uses no
 * storage framework — `persist` is injected.
 */
export type BlobStore = {
  /** The latest full blob. */
  get(): StorageData;
  /** Replace `current` WITHOUT persisting — used by the load path after read. */
  hydrate(next: StorageData): StorageData;
  /** Functional whole-blob update: read latest → apply → persist → return next. */
  update(updater: (cur: StorageData) => StorageData): StorageData;
  /** Update only the progress slice; errors + daily review are preserved. */
  updateProgress(
    fn: (p: Record<string, boolean>) => Record<string, boolean>,
  ): StorageData;
  /** Update only the errors slice; progress + daily review are preserved. */
  updateErrors(fn: (err: ErrorEntry[]) => ErrorEntry[]): StorageData;
  /** Update only the daily-review slice; progress + errors are preserved. */
  updateDailyReview(fn: (dr: DailyReview) => DailyReview): StorageData;
};

export function createBlobStore(
  initial: StorageData,
  persist: (next: StorageData) => void,
  /**
   * PR-I1 (Codex P1): learner-mutation admission predicate. Injected (like
   * `persist`) so this generic store stays framework-free and never imports app
   * policy directly. When it returns true, a learner `update*` is refused BEFORE
   * `current` is touched — the persist-layer guard alone fired too late (after
   * `current` was already contaminated), so a blocked mutation could survive
   * in memory and be resurrected by the next allowed save. `hydrate` is NOT
   * gated: internal load / reset / acknowledged replacement must still apply.
   * Omitted → never blocked (existing callers behave exactly as before).
   */
  isMutationBlocked?: () => boolean,
): BlobStore {
  let current = initial;

  const update = (updater: (cur: StorageData) => StorageData): StorageData => {
    // Refuse a blocked learner mutation before it can alter in-memory state,
    // caller state, or storage; return the unchanged current (no updater run,
    // no persist, no queued replay).
    if (isMutationBlocked?.()) return current;
    current = updater(current);
    persist(current);
    return current;
  };

  return {
    get: () => current,
    hydrate: (next) => {
      current = next;
      return current;
    },
    update,
    updateProgress: (fn) => update((cur) => ({ ...cur, p: fn(cur.p) })),
    updateErrors: (fn) => update((cur) => ({ ...cur, err: fn(cur.err) })),
    updateDailyReview: (fn) => update((cur) => ({ ...cur, dr: fn(cur.dr) })),
  };
}
