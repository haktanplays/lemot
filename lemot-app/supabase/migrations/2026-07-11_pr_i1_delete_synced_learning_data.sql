-- PR-I1 (audit C1): durable authenticated deletion of synced learning data.
--
-- Durability rests on a per-user monotonic sync GENERATION plus an idempotency
-- OPERATION LOG:
--
--   * every learner write carries the generation it was written under;
--   * writes go through generation-aware SECURITY DEFINER RPCs that lock the
--     user's generation row and require EXACT equality (current clients);
--   * legacy direct-table writes are allowed by RLS ONLY while the caller's
--     generation is exactly 0 (never-deleted accounts) — after a deletion every
--     direct write is denied, including an upsert conflict-update against an
--     existing current-generation row (the hole a default column + trigger alone
--     can't close);
--   * a BEFORE trigger remains as defense-in-depth;
--   * the delete RPC BUMPS the generation FIRST under the row lock, deletes, and
--     records the operation in a log keyed by (user_id, operation_id). A retry of
--     ANY past operation id is recognised from the log → no re-bump, no re-delete,
--     and it returns the CURRENT generation so a stale device can clean locally
--     and adopt the current state. Anonymous identities may sync but may NOT
--     delete.
--
-- Operator-only: apply in the Supabase SQL editor / migration pipeline.

-- 1) Per-user monotonic sync generation.
create table if not exists public.user_sync_state (
  user_id uuid references public.profiles on delete cascade primary key,
  generation bigint not null default 0
);
alter table public.user_sync_state enable row level security;

drop policy if exists "Users can view own sync state" on public.user_sync_state;
create policy "Users can view own sync state"
  on public.user_sync_state for select
  using (auth.uid() = user_id);

insert into public.user_sync_state (user_id)
  select id from public.profiles
  on conflict (user_id) do nothing;

-- 2) Idempotency + audit log of completed delete operations (control metadata
-- only — NEVER learner content). Kept until account deletion; no short TTL, so a
-- delayed retry can never become destructive again. No client write policies.
create table if not exists public.user_sync_delete_operations (
  user_id uuid not null references public.profiles on delete cascade,
  operation_id uuid not null,
  operation_generation bigint not null,
  progress_deleted bigint not null,
  errors_deleted bigint not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, operation_id)
);
alter table public.user_sync_delete_operations enable row level security;

drop policy if exists "Users can view own delete operations" on public.user_sync_delete_operations;
create policy "Users can view own delete operations"
  on public.user_sync_delete_operations for select
  using (auth.uid() = user_id);

-- 3) Generation stamped on each learner row (old clients → default 0).
alter table public.user_progress add column if not exists generation bigint not null default 0;
alter table public.user_errors  add column if not exists generation bigint not null default 0;

-- 4) Extend the signup trigger to also create the sync-state row.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  insert into public.user_sync_state (user_id) values (new.id)
    on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

-- 5) Caller's current generation (SECURITY DEFINER so RLS policies can consult it
-- without a recursive select dependency). Returns NULL when no sync-state row
-- exists — legitimate rows come from signup/backfill only, so a missing row must
-- FAIL CLOSED at the RLS check (`= 0` is not true for NULL), never default to 0.
create or replace function public.caller_sync_generation()
returns bigint
language sql
security definer
set search_path = ''
stable
as $$
  select generation from public.user_sync_state where user_id = auth.uid();
$$;
alter function public.caller_sync_generation() owner to postgres;
revoke all on function public.caller_sync_generation() from public;
grant execute on function public.caller_sync_generation() to authenticated;

-- 6) Generation gate trigger (defense-in-depth). The `for update` row lock
-- serializes each write against a concurrent delete's generation bump.
create or replace function public.enforce_sync_generation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_current bigint;
begin
  select generation into v_current
    from public.user_sync_state
    where user_id = NEW.user_id
    for update;
  if v_current is null then
    -- No sync-state row: legitimate rows are created by signup/backfill; a
    -- missing row is an anomaly and must FAIL CLOSED - never default to 0.
    raise exception 'missing sync state for user' using errcode = 'P0001';
  end if;
  if coalesce(NEW.generation, 0) <> v_current then
    raise exception 'stale sync generation (write % <> current %)',
      coalesce(NEW.generation, 0), v_current
      using errcode = 'P0001';
  end if;
  return NEW;
end;
$$;
alter function public.enforce_sync_generation() owner to postgres;

drop trigger if exists trg_user_progress_generation on public.user_progress;
create trigger trg_user_progress_generation
  before insert or update on public.user_progress
  for each row execute function public.enforce_sync_generation();

drop trigger if exists trg_user_errors_generation on public.user_errors;
create trigger trg_user_errors_generation
  before insert or update on public.user_errors
  for each row execute function public.enforce_sync_generation();

-- 7) Tighten direct-table RLS: legacy direct writes are allowed ONLY at
-- generation 0 (never-deleted accounts). After a deletion (generation > 0) every
-- direct insert AND upsert conflict-update is denied; current clients must use
-- the generation-aware RPCs below. Reads are unchanged.
drop policy if exists "Users can upsert own progress" on public.user_progress;
create policy "Users can upsert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id and public.caller_sync_generation() = 0);

drop policy if exists "Users can update own progress" on public.user_progress;
create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id and public.caller_sync_generation() = 0)
  with check (auth.uid() = user_id and public.caller_sync_generation() = 0);

drop policy if exists "Users can insert own errors" on public.user_errors;
create policy "Users can insert own errors"
  on public.user_errors for insert
  with check (auth.uid() = user_id and public.caller_sync_generation() = 0);

-- 8) Generation-aware write RPCs (current clients). Ownership from auth.uid();
-- no client-supplied user id; exact generation equality under the row lock;
-- atomic. NOT anonymous-forbidden — anonymous users still sync (only DELETE is
-- anonymous-forbidden). SECURITY DEFINER bypasses the generation-0 RLS above so a
-- current client can write genuinely new post-deletion activity.
create or replace function public.upsert_user_progress(
  p_generation bigint,
  p_progress jsonb,
  p_daily_review jsonb
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_current bigint;
begin
  if v_uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  select generation into v_current
    from public.user_sync_state where user_id = v_uid for update;
  if v_current is null then
    -- No sync-state row: legitimate rows are created by signup/backfill; a
    -- missing row is an anomaly and must FAIL CLOSED - never default to 0.
    raise exception 'missing sync state for user' using errcode = 'P0001';
  end if;
  if p_generation <> v_current then
    raise exception 'stale sync generation (% <> %)', p_generation, v_current
      using errcode = 'P0001';
  end if;
  insert into public.user_progress (user_id, progress, daily_review, generation)
    values (v_uid, p_progress, p_daily_review, v_current)
    on conflict (user_id) do update
      set progress = excluded.progress,
          daily_review = excluded.daily_review,
          generation = excluded.generation;
end;
$$;
alter function public.upsert_user_progress(bigint, jsonb, jsonb) owner to postgres;
revoke all on function public.upsert_user_progress(bigint, jsonb, jsonb) from public;
grant execute on function public.upsert_user_progress(bigint, jsonb, jsonb) to authenticated;

create or replace function public.insert_user_error(
  p_generation bigint,
  p_word text,
  p_section text,
  p_given text,
  p_correct text,
  p_lesson_id int
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_current bigint;
begin
  if v_uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  select generation into v_current
    from public.user_sync_state where user_id = v_uid for update;
  if v_current is null then
    -- No sync-state row: legitimate rows are created by signup/backfill; a
    -- missing row is an anomaly and must FAIL CLOSED - never default to 0.
    raise exception 'missing sync state for user' using errcode = 'P0001';
  end if;
  if p_generation <> v_current then
    raise exception 'stale sync generation (% <> %)', p_generation, v_current
      using errcode = 'P0001';
  end if;
  insert into public.user_errors
    (user_id, word, section, given_answer, correct_answer, lesson_id, generation)
    values (v_uid, p_word, p_section, p_given, p_correct, p_lesson_id, v_current);
end;
$$;
alter function public.insert_user_error(bigint, text, text, text, text, int) owner to postgres;
revoke all on function public.insert_user_error(bigint, text, text, text, text, int) from public;
grant execute on function public.insert_user_error(bigint, text, text, text, text, int) to authenticated;

-- 9) Delete RPC: authenticated + non-anonymous, idempotent by an operation log,
-- bump-before-delete under the per-user row lock. A retry of ANY past operation
-- id (even after a newer deletion) is recognised → no re-bump, no re-delete, and
-- it returns the CURRENT generation so a stale device can clean + adopt.
create or replace function public.delete_my_synced_learning_data(p_op_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_is_anon boolean := coalesce((auth.jwt() ->> 'is_anonymous')::boolean, false);
  v_gen bigint;
  v_existing public.user_sync_delete_operations%rowtype;
  v_progress int := 0;
  v_errors   int := 0;
begin
  if v_uid is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;
  if v_is_anon then
    raise exception 'anonymous identities cannot delete synced data' using errcode = '42501';
  end if;
  if p_op_id is null then
    raise exception 'operation id required' using errcode = '22004';
  end if;

  -- Lock the per-user generation row UP FRONT (bump-before-delete + serialization).
  select generation into v_gen
    from public.user_sync_state where user_id = v_uid for update;

  -- Idempotent replay: this operation id already completed (even if OTHER
  -- operations ran since). Do not bump or delete; return the CURRENT generation.
  select * into v_existing
    from public.user_sync_delete_operations
    where user_id = v_uid and operation_id = p_op_id;
  if found then
    return pg_catalog.jsonb_build_object(
      'progress_deleted', v_existing.progress_deleted,
      'errors_deleted', v_existing.errors_deleted,
      'generation', coalesce(v_gen, 0),
      'idempotent', true
    );
  end if;

  -- New operation: bump the generation FIRST, then delete, then log it.
  -- Bump-before-delete, atomically. Intentionally CREATES/REPAIRS the caller's
  -- own missing sync-state row (authenticated, non-anonymous, same transaction;
  -- the PK upsert serializes concurrent callers): a fresh/repaired row starts at
  -- generation 1, immediately invalidating every generation-0 stale write.
  insert into public.user_sync_state (user_id, generation)
    values (v_uid, 1)
    on conflict (user_id) do update
      set generation = public.user_sync_state.generation + 1
    returning generation into v_gen;

  with deleted_progress as (
    delete from public.user_progress where user_id = v_uid returning 1
  )
  select count(*) into v_progress from deleted_progress;

  with deleted_errors as (
    delete from public.user_errors where user_id = v_uid returning 1
  )
  select count(*) into v_errors from deleted_errors;

  insert into public.user_sync_delete_operations
    (user_id, operation_id, operation_generation, progress_deleted, errors_deleted)
    values (v_uid, p_op_id, v_gen, v_progress, v_errors);

  return pg_catalog.jsonb_build_object(
    'progress_deleted', v_progress,
    'errors_deleted', v_errors,
    'generation', v_gen
  );
end;
$$;
alter function public.delete_my_synced_learning_data(uuid) owner to postgres;
revoke all on function public.delete_my_synced_learning_data(uuid) from public;
grant execute on function public.delete_my_synced_learning_data(uuid) to authenticated;
