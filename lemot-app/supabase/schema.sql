-- LE MOT — Sprint 10 Database Schema
-- Run this in Supabase SQL Editor

-- 1. User profiles (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. User progress (synced from local)
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  progress jsonb default '{}'::jsonb not null,
  daily_review jsonb default '{"date":"","count":0}'::jsonb not null,
  updated_at timestamptz default now() not null,
  unique (user_id)
);

-- 3. Error tracking (for adaptive AI)
create table public.user_errors (
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
create index idx_user_errors_user on public.user_errors (user_id);
create index idx_user_errors_word on public.user_errors (user_id, word);

-- 4. RLS Policies (CRITICAL)
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.user_errors enable row level security;

-- Profiles: users can only read/update their own
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Progress: users can only access their own
create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can upsert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Errors: users can only access their own
create policy "Users can view own errors"
  on public.user_errors for select
  using (auth.uid() = user_id);

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

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger update_progress_updated_at
  before update on public.user_progress
  for each row execute function public.update_updated_at();
