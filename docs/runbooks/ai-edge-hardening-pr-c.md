# PR-C — AI Edge Hardening (audit B4 / B16 / B15)

> **This PR hardens the AI Edge Functions. It does NOT enable AI.** `aiEnabled`
> stage behavior is unchanged: `dev-apk` and `public-beta` stay AI-off; only
> `sandbox` (internal dev) has AI on, and the client still fails closed when
> `aiEnabled` is false. This is defense that must be in place *before* AI can be
> enabled anywhere.

## What changed

- **B16 — `ai-diag` removed.** The unauthenticated debug endpoint that leaked
  auth-header prefix, token length, and email prefix is deleted from source.
  **Operator step required:** deleting the local source does NOT remove an
  already-deployed remote function. Before treating the endpoint as gone, run
  `supabase functions delete ai-diag` (or `supabase functions deploy --prune`)
  against each Supabase project so the live endpoint is actually removed — the
  current deploy docs deploy functions individually
  (`docs/EAS_PREVIEW_BUILD.md`), so a prune is not implicit. Until this runs, the
  deployed `ai-diag` can remain reachable.
- **B4 — server-owned request contract.** `ai-chat` / `ai-evaluate` now validate
  the request in `supabase/functions/_shared/contract.ts`: the chat system prompt
  is a SERVER-OWNED constant chosen by an allowlisted `prompt` mode and contains
  NO client-derived text (any client `system` is ignored; scenario/topic labels
  are sanitized and delivered as a user-role context message, never the system
  prompt); `maxTokens` is clamped (≤300); message count, per-message length, and
  total payload are capped; malformed bodies get a generic `400`.
- **B4 — per-user rate limiting.** Every AI function calls the atomic
  `bump_ai_usage` RPC, keyed by `auth.uid()` (works for anonymous-auth users
  too). Daily caps: `ai-chat` 20, `ai-evaluate` 40, `ai-error` 10. It **fails
  closed** — if the RPC/table is absent or errors, the request is denied.
- **B15 — no leakage + timeouts.** Provider names and upstream body snippets are
  no longer returned to the client (generic fallback only; internals logged
  server-side). Each upstream provider `fetch` has a 10s `AbortSignal.timeout`;
  the client `invoke` now wires its `AbortController.signal` so the 15s client
  timeout actually cancels the request.

## Deploy requirement (before AI is enabled)

Operator deploy steps (cloud sessions do not deploy):

1. Apply `supabase/schema.sql` (`public.ai_usage` + `public.bump_ai_usage(text,
   int)`) to the Supabase project **before enabling AI**. Until it is applied,
   `bump_ai_usage` errors and every AI request is denied (fail-closed — the safe
   default).
2. Deploy the updated Edge Functions (`ai-chat`, `ai-evaluate`, `ai-error`).
3. **Delete the deployed `ai-diag`** (`supabase functions delete ai-diag`, or
   deploy with `--prune`) — removing the source alone does not remove the live
   endpoint.

## Residual notes

- The quota increment + limit check is a single atomic `INSERT … ON CONFLICT …
  RETURNING` inside a `SECURITY DEFINER` function, so there is **no residual
  read-modify-write race** on the counter.
- The counter keeps incrementing on denied (over-limit) requests too; this is
  intentional (blocked attempts still count) and unbounded per day only within a
  single user/fn/day row.
- `service_role` is not used anywhere; the Edge Functions use the anon key bound
  to the caller's JWT, and the RPC is granted to `authenticated` only.
