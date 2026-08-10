-- MonkLearning v2: Notes, My doubts, Today's plan, Profile preferences
-- Additive only — safe to run against the existing production database.
-- Paste this whole file into the Supabase SQL editor and run it once.

-- ---------- notes ----------
-- Saved "Learn with Drona" session boards. Nothing writes to this yet —
-- the save-note button on the Learn-with-Drona session is a separate feature.
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  subject text,
  chapter text,
  concept text,
  content text,
  created_at timestamptz not null default now()
);

alter table public.notes enable row level security;

drop policy if exists "notes_select_own" on public.notes;
create policy "notes_select_own" on public.notes
  for select using (auth.uid() = user_id);

drop policy if exists "notes_insert_own" on public.notes;
create policy "notes_insert_own" on public.notes
  for insert with check (auth.uid() = user_id);

drop policy if exists "notes_update_own" on public.notes;
create policy "notes_update_own" on public.notes
  for update using (auth.uid() = user_id);

drop policy if exists "notes_delete_own" on public.notes;
create policy "notes_delete_own" on public.notes
  for delete using (auth.uid() = user_id);

-- ---------- doubts ----------
-- Snapped questions solved by Drona. Nothing writes to this yet —
-- the Snap-a-doubt capture flow is a separate feature.
create table if not exists public.doubts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  subject text,
  chapter text,
  concept text,
  question_text text,
  image_url text,
  explanation text,
  solved boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.doubts enable row level security;

drop policy if exists "doubts_select_own" on public.doubts;
create policy "doubts_select_own" on public.doubts
  for select using (auth.uid() = user_id);

drop policy if exists "doubts_insert_own" on public.doubts;
create policy "doubts_insert_own" on public.doubts
  for insert with check (auth.uid() = user_id);

drop policy if exists "doubts_update_own" on public.doubts;
create policy "doubts_update_own" on public.doubts
  for update using (auth.uid() = user_id);

drop policy if exists "doubts_delete_own" on public.doubts;
create policy "doubts_delete_own" on public.doubts
  for delete using (auth.uid() = user_id);

-- ---------- plan_items ----------
-- Today's plan checklist. Real, user-editable, persists across reloads.
create table if not exists public.plan_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  plan_date date not null default current_date,
  label text not null,
  minutes integer,
  is_done boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.plan_items enable row level security;

drop policy if exists "plan_items_select_own" on public.plan_items;
create policy "plan_items_select_own" on public.plan_items
  for select using (auth.uid() = user_id);

drop policy if exists "plan_items_insert_own" on public.plan_items;
create policy "plan_items_insert_own" on public.plan_items
  for insert with check (auth.uid() = user_id);

drop policy if exists "plan_items_update_own" on public.plan_items;
create policy "plan_items_update_own" on public.plan_items
  for update using (auth.uid() = user_id);

drop policy if exists "plan_items_delete_own" on public.plan_items;
create policy "plan_items_delete_own" on public.plan_items
  for delete using (auth.uid() = user_id);

-- ---------- profiles: learning preferences + notifications ----------
alter table public.profiles add column if not exists teacher_voice text not null default 'drona';
alter table public.profiles add column if not exists read_equations_aloud boolean not null default true;
alter table public.profiles add column if not exists allow_interrupt boolean not null default true;
alter table public.profiles add column if not exists daily_reminder boolean not null default true;
alter table public.profiles add column if not exists notify_new_content boolean not null default true;
alter table public.profiles add column if not exists notify_product_updates boolean not null default false;
