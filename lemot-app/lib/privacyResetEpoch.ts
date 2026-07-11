/**
 * Local-privacy reset epoch (PR-H — runtime re-persist barrier).
 *
 * The gap this closes: a device-local privacy reset removes `lm7` / `lm7_srs` /
 * learner data from storage, but live in-memory state in `useStorage` / `useSRS`
 * (and any future runtime store) could still re-persist the OLD data on the next
 * write — silently resurrecting the data the user asked to delete. Clearing keys
 * alone is not enough.
 *
 * Mechanism: a single monotonic epoch, bumped once per explicit reset. Every
 * runtime persister captures the epoch it last ACKNOWLEDGED; a persist whose
 * captured epoch is older than the current epoch is SUPPRESSED. A store
 * acknowledges the reset by clearing its in-memory data to empty AND re-capturing
 * the current epoch (its `resetLocal`), which re-enables writes for genuinely new
 * post-reset activity while old data stays gone. A store that is never
 * acknowledged (e.g. a screen-local `useSRS` that stays mounted across the reset)
 * simply has its stale writes suppressed until it remounts and re-captures the
 * epoch against now-empty storage — safe either way.
 *
 * In-process module singleton (React Native, not SSR). A real app restart resets
 * the counter to 0, which is harmless: storage is already cleared, so there is
 * nothing to resurrect. Pure and framework-free, so the barrier is unit-testable.
 */
let epoch = 0;
const listeners = new Set<() => void>();

/**
 * Bump the epoch once per explicit local-privacy reset and notify subscribers.
 * Subscribers (mounted runtime stores) use the signal to clear their own
 * in-memory state and re-acknowledge the new epoch immediately — so a store that
 * stays mounted across the reset (e.g. a Practice-tab `useSRS`) does not keep
 * showing deleted data or block fresh post-reset writes until it remounts.
 */
export function bumpPrivacyResetEpoch(): number {
  epoch += 1;
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      /* a faulty subscriber must never break the reset */
    }
  }
  return epoch;
}

/**
 * Subscribe to local-privacy resets. Returns an unsubscribe function (call it on
 * unmount). Runtime stores register their `resetLocal` so a reset reaches every
 * mounted store, not just the ones an orchestrator happens to hold a ref to.
 */
export function subscribePrivacyReset(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** The current reset epoch. Runtime stores capture this when they (re)hydrate. */
export function privacyResetEpoch(): number {
  return epoch;
}

/**
 * A persist must be SUPPRESSED when its writer captured an epoch older than the
 * current one — i.e. a reset happened that the writer has not acknowledged, so its
 * in-memory data is stale pre-reset state that must not be written back.
 */
export function isPersistSuppressed(capturedEpoch: number): boolean {
  return capturedEpoch < epoch;
}

/** TEST-ONLY: restore the counter to zero + drop subscribers between tests. */
export function __resetPrivacyResetEpochForTest(): void {
  epoch = 0;
  listeners.clear();
}
