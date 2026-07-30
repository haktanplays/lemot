/**
 * Single-flight serializer (PR-I1, audit C1 — deletion/recovery concurrency).
 *
 * Destructive privacy operations (delete-synced-data, remote-erase confirm) must
 * never run twice concurrently in one JS runtime: a second invocation while one
 * is active JOINS the in-flight operation (same Promise) instead of starting
 * another arm/RPC/reset sequence. A React "busy" state is UX only — this is the
 * correctness mechanism.
 *
 * The lock is taken SYNCHRONOUSLY before the task body executes at all (the
 * in-flight promise is registered first, then the task is started), so no
 * interleaving is possible before the first await inside the task. The lock is
 * released when the task settles — success, failure, or a synchronous throw —
 * so a later genuine retry can start a fresh operation.
 */

export type SingleFlight<T> = {
  /** Start the task, or JOIN the currently in-flight one (its promise). */
  run(task: () => Promise<T>): Promise<T>;
  /** True while an operation is in flight (diagnostics/tests). */
  isActive(): boolean;
};

export function createSingleFlight<T>(): SingleFlight<T> {
  let inFlight: Promise<T> | null = null;
  return {
    run(task: () => Promise<T>): Promise<T> {
      if (inFlight) return inFlight; // join — the second caller's task is DISCARDED
      let resolve!: (v: T | PromiseLike<T>) => void;
      let reject!: (e: unknown) => void;
      const p = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
      });
      inFlight = p; // lock BEFORE the task body runs (before any await/mutation)
      let started: Promise<T>;
      try {
        started = task();
      } catch (e) {
        inFlight = null; // a synchronous throw must not wedge the lock
        reject(e);
        return p;
      }
      started.then(
        (v) => {
          inFlight = null; // release BEFORE settling so a .then retry can start
          resolve(v);
        },
        (e) => {
          inFlight = null;
          reject(e);
        },
      );
      return p;
    },
    isActive: () => inFlight !== null,
  };
}
