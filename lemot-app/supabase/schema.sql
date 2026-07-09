-- LE MOT — Sprint 10 Database Schema
-- Run this in Supabase SQL Editor

-- 1. User profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. User progress (synced from local)
create table if not exists public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  progress jsonb default '{}'::jsonb not null,
  daily_review jsonb default '{"date":"","count":0}'::jsonb not null,
  updated_at timestamptz default now() not null,
  unique (user_id)
);

-- 3. Error tracking (for adaptive AI)
create table if not exists public.user_errors (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  word text not null,
  section text not null,
  given_answer text not null,
  correct_answer text not null,
  lesson_id int not null,
  created_at timestamptz default now() not null
);

-- Index for weak spot queries
create index if not exists idx_user_errors_user on public.user_errors (user_id);
create index if not exists idx_user_errors_word on public.user_errors (user_id, word);

-- 4. RLS Policies (CRITICAL)
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_errors enable row level security;

-- Profiles: users can only read/update their own
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Progress: users can only access their own
drop policy if exists "Users can view own progress" on public.user_progress;
create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert own progress" on public.user_progress;
create policy "Users can upsert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own progress" on public.user_progress;
create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Errors: users can only access their own
drop policy if exists "Users can view own errors" on public.user_errors;
create policy "Users can view own errors"
  on public.user_errors for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own errors" on public.user_errors;
create policy "Users can insert own errors"
  on public.user_errors for insert
  with check (auth.uid() = user_id);

-- 5. Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6. Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

drop trigger if exists update_progress_updated_at on public.user_progress;
create trigger update_progress_updated_at
  before update on public.user_progress
  for each row execute function public.update_updated_at();

-- 7. AI usage quota (PR-C, audit B4 — server-side per-user rate limiting)
-- DEPLOY REQUIRED: this table + RPC must be applied before AI is enabled;
-- without them, `bump_ai_usage` errors and the Edge Functions fail closed
-- (every AI request is denied), which is the safe default.
create table if not exists public.ai_usage (
  user_id uuid references auth.users on delete cascade not null,
  fn text not null,
  day date not null default current_date,
  count int not null default 0,
  primary key (user_id, fn, day)
);

alter table public.ai_usage enable row level security;

-- Users may read their own usage; writes only ever happen through the
-- SECURITY DEFINER RPC below (no direct client insert/update policy exists).
drop policy if exists "Users can view own ai usage" on public.ai_usage;
create policy "Users can view own ai usage"
  on public.ai_usage for select
  using (auth.uid() = user_id);

-- Atomic per-user daily increment + limit check. SECURITY DEFINER so it can
-- write the counter, but it is keyed STRICTLY by auth.uid(), so a caller can
-- only ever bump their own row (anonymous-auth users included — they are still
-- authenticated). Returns true iff the request is within the daily limit.
create or replace function public.bump_ai_usage(p_fn text, p_limit int)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_count int;
begin
  if v_uid is null then
    return false; -- fail closed: no identity, no allowance
  end if;
  insert into public.ai_usage (user_id, fn, day, count)
    values (v_uid, p_fn, current_date, 1)
  on conflict (user_id, fn, day)
    do update set count = public.ai_usage.count + 1
  returning count into v_count;
  return v_count <= p_limit;
end;
$$;

-- Only authenticated sessions may call it; never anon/unauthenticated.
revoke all on function public.bump_ai_usage(text, int) from public;
grant execute on function public.bump_ai_usage(text, int) to authenticated;
