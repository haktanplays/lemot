/**
 * Explicit second-device recovery confirmation (PR-I1, audit C1) — pure.
 *
 * A recovery marker's recorded `targetGeneration` may be STALE by the time the
 * user confirms (another deletion can bump the server generation in between).
 * Acknowledging the stale target would reopen sync one generation behind and get
 * every write rejected — or worse, mask a second deletion. So confirmation
 * REVALIDATES against the server:
 *
 *   1. verify the marker belongs to the current authenticated user (fail closed);
 *   2. fetch the CURRENT server generation — on failure: no reset, no
 *      acknowledgement, no marker clear, no reopen (recovery stays pending);
 *   3. run the PR-H local reset (exactly once per successful pass);
 *   4. acknowledge the freshly fetched generation (never only the recorded one);
 *   5. clear the recovery marker ONLY after the acknowledgement succeeded;
 *   6. the caller then reopens normal activity.
 *
 * Sync and learner mutations remain blocked throughout (the recovery marker
 * itself gates them), so nothing can slip between reset and acknowledgement.
 */

export type RemoteEraseConfirmOutcome =
  | "done"
  | "not_owner"
  | "fetch_failed"
  | "reset_failed"
  | "finalize_failed";

export interface RemoteEraseConfirmDeps {
  /** The hydrated recovery marker (null when none is actionable). */
  recovery: { userId: string; targetGeneration: number } | null;
  /** The currently authenticated user. */
  currentUserId: string;
  /** Authoritative server generation; null = fetch failed (fail closed). */
  fetchServerGeneration: () => Promise<number | null>;
  /** PR-H local reset (reused, not duplicated). */
  resetLocal: () => Promise<void>;
  /** Persist + adopt the fetched generation (user-bound). */
  acknowledgeGeneration: (generation: number) => Promise<void>;
  /** Remove the recovery marker (only after acknowledgement). */
  clearRecovery: () => Promise<void>;
}

export async function runRemoteEraseConfirm(
  deps: RemoteEraseConfirmDeps
): Promise<RemoteEraseConfirmOutcome> {
  const rec = deps.recovery;
  // Owner-only: a foreign / missing marker is never executed under this user.
  if (!rec || rec.userId !== deps.currentUserId) return "not_owner";

  // Revalidate: the recorded target may be stale (a further deletion may have
  // advanced the server). A fetch failure leaves recovery fully pending.
  let server: number | null;
  try {
    server = await deps.fetchServerGeneration();
  } catch {
    server = null;
  }
  if (server === null) return "fetch_failed";
  // The server generation is monotonic; fetching BELOW the recorded target is an
  // anomaly (wrong project / restored DB) — fail closed rather than acknowledge.
  if (server < rec.targetGeneration) return "fetch_failed";

  try {
    await deps.resetLocal();
  } catch {
    return "reset_failed"; // marker intact; retry re-runs the whole confirmation
  }

  // Acknowledge the FRESH generation, then clear the marker. If either fails,
  // recovery stays pending (blocked); a retry re-fetches and re-runs — the
  // repeat reset acts on an already-empty, mutation-gated device.
  try {
    await deps.acknowledgeGeneration(server);
    await deps.clearRecovery();
  } catch {
    return "finalize_failed";
  }
  return "done";
}
