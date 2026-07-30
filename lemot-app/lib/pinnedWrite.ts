/**
 * Auth-PINNED generation-aware cloud writes (PR-I1, Codex P1 round 4 —
 * cross-account write race).
 *
 * The write RPCs (`upsert_user_progress` / `insert_user_error`) intentionally
 * take no user id — the server writes to `auth.uid()`. If the Supabase session
 * switches from account A to B before React replaces the hook's `userId`
 * callback, a global-client RPC would push A's local payload into B's account
 * (the old direct-table writes carried `user_id`, so RLS rejected that stale-
 * account case; the RPC migration dropped that accidental protection). A check
 * followed by the global client is not enough — the session can switch between
 * check and request.
 *
 * This pure step owns the verify-then-pin sequencing for a single write:
 *   1. the READY local generation must belong to the payload's user
 *      (a generation hydrated for another account is never used);
 *   2. the generation is captured SYNCHRONOUSLY, before any await, so an
 *      account transition cannot substitute a later user's in-memory value;
 *   3. the latest auth session must exist, belong to the payload's user, and
 *      carry an access token;
 *   4. only then does the write execute, PINNED to the captured token and the
 *      captured generation — the mutable global session is never consulted
 *      again, so a post-capture switch cannot redirect the request.
 *
 * Any verification failure SKIPS the write entirely (nothing is sent, no
 * mismatch handoff, local learner data stays authoritative on-device) — a
 * payload created by user A executes as a verified A or not at all.
 */

export type PinnedWriteResult =
  | { kind: "skipped" } // identity/session verification failed — nothing sent
  | { kind: "sent"; errorMessage: string | null };

export interface PinnedWriteDeps {
  /** The user this callback/payload belongs to. */
  expectedUserId: string;
  /** The user the READY local generation is bound to (synchronous module read). */
  generationUserId: () => string | null;
  /** The user-bound generation to stamp (read synchronously before any await). */
  generation: () => number;
  /** Latest auth session snapshot; null when signed out / unreadable. */
  getSession: () => Promise<{ userId: string; accessToken: string } | null>;
  /** Execute the write PINNED to the captured token + captured generation. */
  send: (
    accessToken: string,
    generation: number
  ) => Promise<{ errorMessage: string | null }>;
}

export async function runPinnedCloudWrite(
  deps: PinnedWriteDeps
): Promise<PinnedWriteResult> {
  // A ready generation belonging to another user must never be used — reject
  // locally, before even looking at the session.
  if (deps.generationUserId() !== deps.expectedUserId) return { kind: "skipped" };
  // Capture the user-bound generation SYNCHRONOUSLY (before the session await).
  const generation = deps.generation();

  let session: { userId: string; accessToken: string } | null;
  try {
    session = await deps.getSession();
  } catch {
    session = null;
  }
  if (
    !session ||
    session.userId !== deps.expectedUserId ||
    !session.accessToken
  ) {
    return { kind: "skipped" }; // missing/switched session → drop, send nothing
  }

  // CAPTURED token: from here on the mutable global session is irrelevant to
  // this request — it executes as the verified owner or not at all.
  const token = session.accessToken;
  try {
    const { errorMessage } = await deps.send(token, generation);
    return { kind: "sent", errorMessage };
  } catch (e) {
    return {
      kind: "sent",
      errorMessage: e instanceof Error ? e.message : "network failure",
    };
  }
}
