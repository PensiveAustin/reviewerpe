create table public.scores (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 40),
  quiz_id text not null,
  score int not null check (score >= 0),
  total int not null check (total > 0),
  created_at timestamptz not null default now(),
  check (score <= total)
);
alter table public.scores enable row level security;
create policy "anyone can add scores" on public.scores for insert to anon with check (true);
create policy "anyone can read scores" on public.scores for select to anon using (true);
