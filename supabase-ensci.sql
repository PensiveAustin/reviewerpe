-- Ensci leaderboard tables. Run this ONCE in the Supabase SQL Editor.
-- (Don't re-run supabase.sql, those PathFit tables already exist.)

create table public.scores_ensci1 (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 40),
  score int not null check (score >= 0),
  total int not null check (total > 0),
  created_at timestamptz not null default now(),
  check (score <= total)
);
alter table public.scores_ensci1 enable row level security;
create policy "anyone can add" on public.scores_ensci1 for insert to anon with check (true);
create policy "anyone can read" on public.scores_ensci1 for select to anon using (true);

create table public.scores_ensci2 (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 40),
  score int not null check (score >= 0),
  total int not null check (total > 0),
  created_at timestamptz not null default now(),
  check (score <= total)
);
alter table public.scores_ensci2 enable row level security;
create policy "anyone can add" on public.scores_ensci2 for insert to anon with check (true);
create policy "anyone can read" on public.scores_ensci2 for select to anon using (true);
