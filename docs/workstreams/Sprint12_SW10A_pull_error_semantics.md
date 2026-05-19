# Sprint 12 SW10A — pullFromCloud Error Semantics

## Workstream name
Sprint 12 SW10A — Distinguish new-user vs real Supabase errors in `pullFromCloud`.

## Branch
`claude/sprint12-sw10a-pull-error-semantics` (branched from `origin/main` at `e23c3c2`).

## Tier
LM-2 — small sync safety fix. One file, ~12 net lines, no UI / merge / schema / auth change.

## Problem statement
SW10 Codex review (validated against current `main` at `e23c3c2`) confirmed H2: `pullFromCloud()` in `lemot-app/hooks/useProgressSync.ts` uses Supabase's `.single()` method and collapses **every** failure into `null` via `if (error || !data) return null;`. This means:

- A new user with no `user_progress` row → returns `null` (correct outcome, but indistinguishable from real failure).
- A real Supabase error — RLS denial, network failure, schema mismatch, JWT invalid — also returns `null` with no log line. The caller in `AppProvider.tsx:62-87` has no diagnostic signal.

Result: real failure modes (RLS misconfig, network partition, schema drift) are silently invisible during sign-in. The fix is small but unblocks future debuggability without changing any caller behavior.

## Confirmed finding summary
| Finding | Status | Evidence |
|---|---|---|
| H2 — `pullFromCloud` uses `.single()` | ✅ confirmed | `useProgressSync.ts:39` |
| H2 — collapses any error to `null` | ✅ confirmed | `useProgressSync.ts:41` (`if (error \|\| !data) return null;`) |

Source: SW10 Sync/Auth Codex Review Validation report (this session, post-PR-#6 review).

## Scope
Single product intention: replace `.single()` with `.maybeSingle()` in `pullFromCloud` and add a clear console.warn for real Supabase errors. Caller behavior unchanged — both no-row and real-error paths still return `null`. Only the inner branching and observability change.

## Allowed files
- `lemot-app/hooks/useProgressSync.ts` — primary edit.
- `docs/workstreams/Sprint12_SW10A_pull_error_semantics.md` — this spec.

## Forbidden files
- `lemot-app/providers/AppProvider.tsx` — do NOT change merge logic in this PR.
- `lemot-app/hooks/useAuth.ts` / `lemot-app/providers/AuthProvider.tsx` — anonymous auth is SW10E.
- `lemot-app/supabase/schema.sql` — schema idempotency is SW10C.
- `lemot-app/hooks/useStorage.ts` / `lemot-app/hooks/useErrors.ts` / `lemot-app/lib/storage.ts` / `lemot-app/lib/supabase.ts` — out of scope.
- `lemot-app/config/productStage.ts` — no flag changes.
- `lemot-app/app/**`, `lemot-app/components/**` — no UI changes.
- Lesson content (`content/**`, `data/lessons/**`, `data/pools/**`), item registry, V1_LESSONS — untouched.
- `package.json`, `package-lock.json` — no dependency changes.
- `docs/CLOUD_SYNC_QUEUE.md` — Sync Queue updated in a follow-up backfill round, not in this PR.
- Mon Lexique, Paywall, RevenueCat, Word Graph, V4-B redesign, lesson engine internals, AI behavior, EAS, Supabase Edge Functions, secrets — all untouched.

## Acceptance criteria
1. `pullFromCloud()` in `useProgressSync.ts` uses `.maybeSingle()` instead of `.single()`.
2. Three branches explicit and ordered:
   a. `if (error)` → `console.warn("[sync] pullFromCloud failed:", { code, message, details, hint })`; return `null`.
   b. `if (!data)` → return `null` quietly (expected new-user path).
   c. else → return SyncData with the same shape as today (`progress`, `errors: []`, `dailyReview`).
3. Caller behavior unchanged: `AppProvider.tsx:69` `if (!cloud) return` still does what it does today.
4. `pushToCloud` and `pushError` are untouched.
5. SyncData type and exported hook signature unchanged.
6. No new imports added unless type-safety requires it (the existing `supabase` import already supplies the `.maybeSingle()` method since it's part of the Supabase JS SDK).
7. `npm run typecheck` exits 0.
8. `npm run validate:pools` exits 0 with the same 6 pre-existing legacy warnings (no new warnings).
9. `git diff --check` clean.

## Verification commands
```bash
cd lemot-app
npm run typecheck
npm run validate:pools
```

Plus `git diff --check` and visual diff inspection.

## Manual QA / logging expectations (Operator-only)

Cloud cannot smoke this end-to-end. Operator-side smoke expectations:

- **New user (first sign-in, no `user_progress` row yet):** `pullFromCloud` returns `null` silently. No console.warn. AppProvider proceeds to push on next save. Same end-to-end behavior as before this PR.
- **Existing user with cloud row:** `pullFromCloud` returns SyncData. AppProvider merge effect runs as today. Same end-to-end behavior.
- **RLS denial / network error / schema drift:** console output shows `[sync] pullFromCloud failed: { code, message, details, hint }`. AppProvider exits early (same as today). Operator gains diagnostic visibility that was previously invisible.

If the first APK build after this PR shows new `[sync] pullFromCloud failed` warnings in logs, that is **not a regression** — it is the diagnostic surfacing the previously-silent failure mode.

## Risks
1. **First production runs may surface previously-silent RLS or schema-drift errors.** Expected. The PR description should warn operators that new console.warn lines indicate a pre-existing condition, not a new failure introduced by this PR.
2. **`error.code`, `error.details`, `error.hint` may be `undefined`** for certain error shapes. Logging them as object properties is safe (will show as `undefined`); no crash risk.
3. **`.maybeSingle()` requires Supabase JS SDK v2.0+** — repo uses `@supabase/supabase-js ^2.103.0` per `package.json`, so this is supported. No dependency change needed.
4. **No automated test.** Manual smoke is operator-only. Same situation as WS8 / PR-C / WS9.
5. **The other SW10 findings remain unaddressed** by this PR. H1 (merge policy), H3 (anonymous auth), M1–M4 are tracked separately in the SW10B-G sequence.
6. **`docs/CLOUD_SYNC_QUEUE.md` will need a follow-up row** after SW10A merges, recording the diagnostic surfacing and any new warnings the operator should expect to see. Out of scope for this PR.

## Review status
- Spec: this file, applied to working tree, pending operator approval.
- Code edit: applied to `lemot-app/hooks/useProgressSync.ts`, pending verification + operator approval.
- Verification: typecheck + validate:pools + `git diff --check` to be run before reporting.
- PR: not yet opened.
- Commit: pending operator approval phrase (`devam`, `onaylandı`, `commit`).
