/**
 * Auth-PINNED cloud deletion (PR-I1, Codex P1 — cross-account deletion race).
 *
 * The deletion RPC must never follow the MUTABLE global auth session: if the
 * user signs out and another account signs in while the erase is arming
 * (marker persist + write drain), a global-client RPC would delete the NEWLY
 * signed-in user's rows (the server deletes `auth.uid()`), while the durable
 * marker and later acknowledgement stay bound to the original owner.
 *
 * This pure step runs immediately before the RPC stage and closes the
 * check-to-use gap:
 *   1. the LIVE auth-context identity must still be the deletion owner;
 *   2. the latest auth session must exist and belong to the owner;
 *   3. the live identity is RE-checked after the async session read;
 *   4. the pending marker must still be this owner's and THIS operation's;
 *   5. only then is the session's access token CAPTURED and the RPC invoked
 *      through a request pinned to that token — the mutable global session is
 *      never consulted again, so a switch after the check cannot redirect the
 *      deletion to another account.
 *
 * Every abort resolves `{ ok: false }`: the state machine reports
 * `cloud_failed`, the armed marker and its operation id are retained for the
 * original owner, and sync/learner mutations stay blocked. No user id is ever
 * sent — server ownership still resolves ONLY from `auth.uid()`.
 */

export type PinnedSession = { userId: string; accessToken: string };
export type DeleteCloudResult = { ok: boolean; generation?: number };

export interface PinnedDeleteDeps {
  /** The user the pending deletion belongs to (captured at operation start). */
  ownerUserId: string;
  /** The durable operation id this flow is executing. */
  operationId: string;
  /** LIVE auth-context user id (read from a ref, never a stale closure). */
  latestAuthUserId: () => string | null;
  /** Latest auth session snapshot; null when signed out / unreadable. */
  getSession: () => Promise<PinnedSession | null>;
  /** Live pending-marker identity (owner / operation id). */
  pendingOwner: () => string | null;
  pendingOpId: () => string | null;
  /** Execute the RPC PINNED to the captured token (never the global client). */
  rpcWithToken: (accessToken: string, opId: string) => Promise<DeleteCloudResult>;
}

export async function runPinnedCloudDelete(
  deps: PinnedDeleteDeps
): Promise<DeleteCloudResult> {
  // Identity switched before verification → abort before any request.
  if (deps.latestAuthUserId() !== deps.ownerUserId) return { ok: false };

  let session: PinnedSession | null;
  try {
    session = await deps.getSession();
  } catch {
    session = null;
  }
  // Missing session, or a session that is not the owner's → abort.
  if (!session || session.userId !== deps.ownerUserId) return { ok: false };
  // Re-check the LIVE identity AFTER the async session read (check-to-use).
  if (deps.latestAuthUserId() !== deps.ownerUserId) return { ok: false };
  // The pending marker must still be this owner's and THIS operation's.
  if (
    deps.pendingOwner() !== deps.ownerUserId ||
    deps.pendingOpId() !== deps.operationId
  ) {
    return { ok: false };
  }

  // CAPTURED token: from here on, changes to the global session are irrelevant
  // to this request — the deletion executes as the verified owner or not at all.
  const token = session.accessToken;
  try {
    return await deps.rpcWithToken(token, deps.operationId);
  } catch {
    // Unusable/expired token or network failure → retryable, nothing deleted
    // under the wrong identity; the armed marker stays with the owner.
    return { ok: false };
  }
}
