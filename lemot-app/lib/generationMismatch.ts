/**
 * Generation-mismatch recovery for the write RPCs (PR-I1, audit C1) — pure.
 *
 * When `upsert_user_progress` / `insert_user_error` reject a write with a stale
 * sync generation, this device just learned — mid-session, without a pull — that
 * a deletion happened elsewhere. Logging and waiting for a future navigation
 * pull is not enough: further writes would keep failing and the device would
 * keep believing its stale generation. Instead:
 *
 *   1. STOP further sync admission immediately (block the local generation);
 *   2. fetch the current server generation — failure: stay blocked;
 *   3. server ahead + local learner data exists → persist the user-bound
 *      remote-erase recovery marker (explicit confirmation flow takes over);
 *   4. server ahead + device empty → safely acknowledge the current generation
 *      (fresh-install shortcut) and resume;
 *   5. fetched BELOW the local generation → stay blocked (never downgrade);
 *   6. the REJECTED payload is never restamped or resent — new activity after a
 *      resume is pushed fresh under the current generation.
 */

export type GenerationMismatchOutcome = "recovery" | "acknowledged" | "blocked";

export interface GenerationMismatchDeps {
  /** The currently authenticated user. */
  userId: string;
  /** The generation this device stamped on the rejected write. */
  localGeneration: number;
  /** Fail closed: stop sync admission NOW (synchronous). */
  blockGeneration: () => void;
  /** Authoritative server generation; null = fetch failed (stay blocked). */
  fetchServerGeneration: () => Promise<number | null>;
  /** TRUE when this device holds any learner content (incl. corrupt blobs). */
  hasLearnerData: () => Promise<boolean>;
  /** Persist the user-bound recovery marker (explicit confirmation required). */
  persistRecovery: (args: { userId: string; targetGeneration: number }) => Promise<void>;
  /** Persist + adopt the fetched generation (empty-device shortcut). */
  acknowledgeGeneration: (generation: number) => Promise<void>;
}

export async function handleGenerationMismatch(
  deps: GenerationMismatchDeps
): Promise<GenerationMismatchOutcome> {
  // 1) Synchronously stop further sync admission before anything async.
  deps.blockGeneration();

  let server: number | null;
  try {
    server = await deps.fetchServerGeneration();
  } catch {
    server = null;
  }
  if (server === null) return "blocked"; // fetch failed → stay blocked
  if (server < deps.localGeneration) return "blocked"; // never silently downgrade

  try {
    if (server > deps.localGeneration && (await deps.hasLearnerData())) {
      await deps.persistRecovery({ userId: deps.userId, targetGeneration: server });
      return "recovery"; // explicit-confirmation flow takes over; stays blocked
    }
    // Device empty (fresh-install shortcut) or generation actually current
    // (transient anomaly): adopt the fetched generation and resume. The rejected
    // payload is NOT resent — only genuinely new activity syncs from here.
    await deps.acknowledgeGeneration(server);
    return "acknowledged";
  } catch {
    return "blocked"; // recovery/acknowledge persistence failed → stay blocked
  }
}
