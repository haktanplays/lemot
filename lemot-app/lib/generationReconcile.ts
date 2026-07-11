/**
 * Startup generation-reconcile decision (PR-I1, audit C1) — pure.
 *
 * Before the first cloud pull, the device compares the authoritative server
 * generation with its locally acknowledged one:
 *
 *  - `fail_closed`           — the fetch failed / the sync-state row is missing
 *                              or malformed (`serverGeneration === null`), OR the
 *                              local generation is AHEAD of the server (anomaly).
 *                              Block sync generation; no pull, no merge, no local
 *                              write, no push; never silently create the row.
 *  - `recovery`              — server ahead AND this device holds learner data:
 *                              a deletion happened elsewhere → user-bound
 *                              recovery marker + explicit confirmation. No pull.
 *  - `acknowledge_and_pull`  — server ahead AND the device is EMPTY
 *                              (fresh-install shortcut): adopt the current
 *                              generation, then CONTINUE the normal pull under it
 *                              — valid learner data created after the historical
 *                              deletion must still be pulled and merged.
 *  - `proceed`               — generations equal (including a legitimate 0 from
 *                              an existing row) → normal pull + merge.
 */

export type GenerationReconcileDecision =
  | {
      kind: "fail_closed";
      reason: "fetch_failed" | "local_ahead" | "inventory_unreadable";
    }
  | { kind: "recovery"; targetGeneration: number }
  | { kind: "acknowledge_and_pull"; generation: number }
  | { kind: "proceed" };

export function decideGenerationReconcile(args: {
  /** Authoritative server generation; null = fetch failed / row missing / malformed. */
  serverGeneration: number | null;
  /** The generation this device has acknowledged (user-bound). */
  localGeneration: number;
  /** TRUE when the device holds ANY learner content (incl. corrupt blobs). */
  hasLearnerData: boolean;
}): GenerationReconcileDecision {
  const { serverGeneration, localGeneration, hasLearnerData } = args;
  if (serverGeneration === null) {
    return { kind: "fail_closed", reason: "fetch_failed" };
  }
  if (serverGeneration > localGeneration) {
    return hasLearnerData
      ? { kind: "recovery", targetGeneration: serverGeneration }
      : { kind: "acknowledge_and_pull", generation: serverGeneration };
  }
  if (localGeneration > serverGeneration) {
    return { kind: "fail_closed", reason: "local_ahead" }; // never silently downgrade
  }
  return { kind: "proceed" };
}

/**
 * Fail-closed reconcile resolver — the exact startup order:
 *   1. fetch the server generation FIRST; null/throw → fail closed immediately,
 *      WITHOUT touching the local learner inventory;
 *   2. compare server vs local; equal or local-ahead never needs the inventory;
 *   3. scan the learner inventory ONLY when server > local (the only case where
 *      the empty-vs-recovery split matters); a read failure there also fails
 *      closed — no pull, no merge, no local write, no push — and the exception
 *      never escapes to the caller.
 */
export async function resolveGenerationReconcile(deps: {
  fetchServerGeneration: () => Promise<number | null>;
  localGeneration: () => number;
  hasLearnerData: () => Promise<boolean>;
}): Promise<GenerationReconcileDecision> {
  let server: number | null;
  try {
    server = await deps.fetchServerGeneration();
  } catch {
    server = null;
  }
  if (server === null) {
    return { kind: "fail_closed", reason: "fetch_failed" }; // inventory NOT scanned
  }
  const local = deps.localGeneration();
  let hasData = false;
  if (server > local) {
    try {
      hasData = await deps.hasLearnerData();
    } catch {
      return { kind: "fail_closed", reason: "inventory_unreadable" };
    }
  }
  return decideGenerationReconcile({
    serverGeneration: server,
    localGeneration: local,
    hasLearnerData: hasData,
  });
}
