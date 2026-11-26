-- Run once in Supabase > SQL Editor.
-- Adds "no class days": suspend ALL classes on a date (or a range of dates), e.g. holidays or typhoons.
create table if not exists public.class_suspensions (
  id          bigint generated always as identity primary key,
  start_date  date   not null,                                -- first day with no classes
  end_date    date   not null,                                -- last day (same as start for a single day)
  lab         text   not null default 'all' check (lab in ('all','A','B')),
  note        text   not null default '',                     -- e.g. "Holiday", "Typhoon"
  created_at  timestamptz not null default now(),
  check (end_date >= start_date)
);

grant select on public.class_suspensions to anon, authenticated;
grant insert, update, delete on public.class_suspensions to authenticated;
grant usage, select on all sequences in schema public to authenticated;

alter table public.class_suspensions enable row level security;
drop policy if exists "public read" on public.class_suspensions;
drop policy if exists "admin write" on public.class_suspensions;
create policy "public read" on public.class_suspensions for select to anon, authenticated using (true);
create policy "admin write" on public.class_suspensions for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
