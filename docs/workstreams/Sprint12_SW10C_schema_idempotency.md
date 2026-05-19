# Sprint 12 SW10C — Schema Idempotency

## Workstream name
Sprint 12 SW10C — Make `lemot-app/supabase/schema.sql` safe to re-run.

## Branch
`claude/sprint12-sw10c-schema-idempotency` (branched from `origin/main` at `21bf810`).

## Tier
LM-2 — schema-file safety cleanup. No app code change. No deployed database change.

## Problem statement
SW10 Codex review confirmed M4: `lemot-app/supabase/schema.sql` is not idempotent. Re-running it on an existing Supabase database fails on `create table`, `create index`, `create policy`, and `create trigger` statements — only the two `create or replace function` statements survive re-execution. This makes the file unsafe as a documented setup script and forces operator memory ("did I already run this?") instead of file-level guarantees.

The fix is a mechanical idempotency pass: prepend `if not exists` to tables and indexes; prepend `drop if exists` (paired with the existing `create`) for policies and triggers. PostgreSQL does not support `create policy if not exists`, so the drop+create idiom is the standard workaround (per `supabase-postgres-best-practices` skill, `references/schema-constraints.md`).

This PR only updates the file. It does NOT deploy or apply anything to the live database. Deploy is operator-only.

## Confirmed finding summary

| Construct | Pre-PR idempotent? | Statement count |
|---|---|---|
| `create table public.<name>` | ❌ no | 3 (profiles, user_progress, user_errors) |
| `create index <name>` | ❌ no | 2 (idx_user_errors_user, idx_user_errors_word) |
| `create policy "..."` | ❌ no (PG does not support `if not exists` for policies) | 8 (3 profiles + 3 user_progress + 2 user_errors) |
| `create trigger <name>` | ❌ no | 3 (on_auth_user_created, update_profiles_updated_at, update_progress_updated_at) |
| `create or replace function` | ✅ yes | 2 (handle_new_user, update_updated_at) |
| `alter table … enable row level security` | ✅ yes (safe to re-run) | 3 |

## Scope
File-only safety pass. Same schema shape, same column types, same constraints, same RLS policy bodies, same trigger bodies, same function bodies, same `security definer` semantics.

## Allowed files
- `lemot-app/supabase/schema.sql` — convert to idempotent form.
- `docs/workstreams/Sprint12_SW10C_schema_idempotency.md` — this spec.

## Forbidden scope
- **No Supabase deploy or migration apply.** Operator decides when/whether to re-run.
- **No Supabase CLI calls.** No `supabase db push`, no `supabase db reset`, no `supabase migration ...`.
- **No secrets touched.**
- **No app code change.** `useProgressSync.ts`, `AppProvider.tsx`, hooks/providers untouched.
- **No `package.json` / `package-lock.json` change.**
- **No lesson content, item registry, routes, UI, EAS, Mon Lexique, Paywall, RevenueCat, Word Graph, V4-B, AI behavior, or lesson engine internals** touched.
- **`docs/CLOUD_SYNC_QUEUE.md`** intentionally not edited.

## Acceptance criteria
1. All 3 `create table` statements use `if not exists`.
2. All 2 `create index` statements use `if not exists`.
3. All 8 `create policy` statements are paired with a preceding `drop policy if exists "..." on ...;` matching the policy name and table.
4. All 3 `create trigger` statements are paired with a preceding `drop trigger if exists ... on ...;` matching the trigger name and table.
5. Both `create or replace function` statements unchanged.
6. All 3 `alter table ... enable row level security` statements unchanged.
7. Zero change to: table names, column names, column types, default values, primary keys, foreign-key references, `on delete cascade`, `unique` constraints, RLS policy logic (`using` / `with check` clauses), trigger timing (`before`/`after`), trigger target table, function bodies, `security definer` clause, `language plpgsql`.
8. File starts with the same `-- LE MOT — Sprint 10 Database Schema` header comment.
9. Section comment headers (`-- 1. User profiles`, `-- 2. User progress`, etc.) preserved.
10. `npm run typecheck` exits 0 (sanity baseline; schema is not in TS scope).
11. `npm run validate:pools` exits 0 with the same 6 pre-existing legacy warnings.
12. `git diff --check` clean.

## Verification
```bash
git diff --check
cd lemot-app
npm run typecheck
npm run validate:pools
```

Optional, if `psql` is available locally: `psql --no-psqlrc --dry-run-not-supported`. Actual SQL syntax validation requires a real DB connection, which is **out of scope** for this PR — operator decides whether to dry-run in a Supabase branch or local Postgres instance.

## Operator deploy note

**This PR does not deploy.** The schema file edit lands on `main` as documentation/setup-script. To apply the idempotent version to the live Supabase database, the operator must explicitly run:

1. Open Supabase Dashboard → SQL Editor.
2. Paste the new `schema.sql` content.
3. Run.

Because the new statements are idempotent, re-running against a database that already has the current schema **should** be a no-op for tables/indexes (the `if not exists` short-circuits) and a re-create for policies/triggers (the `drop if exists` succeeds even if the policy/trigger isn't there; the subsequent `create` succeeds because the prior one was dropped). This is the standard idempotent setup script pattern.

Important caveats for the operator:
- The `drop policy if exists ... ; create policy ...` pattern **briefly removes** the policy between the drop and the create. In a heavily-loaded prod, that gap is detectable by the query planner. For Le Mot's current scale (Dev APK + sandbox + small public-beta in the future), this is acceptable. For a future high-traffic deploy, consider wrapping each drop+create pair in a transaction (`begin; ... commit;`).
- The new file is **not a migration**. It is the canonical setup script. A future migration workstream may want to introduce numbered migration files (`migrations/0001_...sql`, etc.) — out of scope for SW10C.

## Risks
1. **`drop policy if exists` + `create policy` is not transactional in the new file.** A re-run while production traffic flows could briefly expose data without the RLS policy. Acceptable for current scale; flag for future migration policy. Mitigation: operator can wrap the SW10C script in `begin; ... commit;` manually before applying to a live DB.
2. **No automated SQL syntax check** in this PR. Cloud cannot connect to Supabase. The operator is responsible for verifying the script runs without error against a test DB (Supabase branch, local Postgres) before applying to production.
3. **`create or replace function` already idempotent** for both `handle_new_user` and `update_updated_at`. Not changed.
4. **`alter table ... enable row level security`** is unchanged. Postgres treats this as a no-op when RLS is already enabled. Safe.
5. **No defensive `drop table` added.** Tables stay `if not exists` only. Destructive drops are explicitly out of scope per master pipeline §4.E migration discipline ("Column drops and destructive migrations belong in explicit migration tasks, preferably before public beta, not as incidental sprint edits.").
6. **`react-native-mmkv` phantom dependency** (mentioned in SW10B context) — not touched here, not in scope.
7. **`docs/CLOUD_SYNC_QUEUE.md`** will need a follow-up row after SW10C merges. Out of scope for this PR.

## Review status
- Spec: this file, applied to working tree, pending operator approval.
- Code edit: applied to `lemot-app/supabase/schema.sql`, pending verification + operator approval.
- Verification: `git diff --check`, `npm run typecheck`, `npm run validate:pools` to be run before reporting.
- PR: not yet opened.
- Commit: pending operator approval phrase.
- **Deploy: separate operator step**, not part of this PR.
