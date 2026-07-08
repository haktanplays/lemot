import { RATE_LIMITS } from "./contract.ts";

/**
 * Server-side per-user daily rate limit (audit B4). Calls the atomic
 * `bump_ai_usage` RPC, which increments the caller's counter (keyed strictly by
 * `auth.uid()` inside a SECURITY DEFINER function) and returns whether the
 * request is within the daily limit for `fn`.
 *
 * Fails CLOSED: any missing limit, RPC error, or thrown exception denies the
 * request. Never trusts a client-provided identifier — the user id comes from
 * the authenticated session inside the RPC. Uses the anon-key client bound to
 * the caller's JWT (no service_role).
 */
export async function withinRateLimit(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  fn: string,
): Promise<boolean> {
  const limit = RATE_LIMITS[fn];
  if (limit == null) return false; // unknown function → fail closed
  try {
    const { data, error } = await supabase.rpc("bump_ai_usage", {
      p_fn: fn,
      p_limit: limit,
    });
    if (error) {
      console.error(`[rate-limit] ${fn}: ${error.message}`);
      return false; // fail closed
    }
    return data === true;
  } catch (e) {
    console.error(`[rate-limit] ${fn}: ${e instanceof Error ? e.message : String(e)}`);
    return false; // fail closed
  }
}
