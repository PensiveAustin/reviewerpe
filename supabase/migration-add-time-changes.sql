-- Run once in Supabase > SQL Editor.
-- Adds "time changes": the admin can move a subject to a different time (and room) on one date
-- while the regular weekly schedule stays the same.
create table if not exists public.class_changes (
  id          bigint generated always as identity primary key,
  change_date date   not null,                                -- the day the class is moved
  subject     text   not null,                                -- must match the subject name in js/data.js
  lab         text   not null default 'all' check (lab in ('all','A','B')),
  new_start   time   not null,
  new_end     time   not null,
  new_room    text   not null default '',                     -- optional, blank = same room
  note        text   not null default '',
  created_at  timestamptz not null default now(),
  check (new_end > new_start),
  unique (change_date, subject, lab)
);

grant select on public.class_changes to anon, authenticated;
grant insert, update, delete on public.class_changes to authenticated;
grant usage, select on all sequences in schema public to authenticated;

alter table public.class_changes enable row level security;
drop policy if exists "public read" on public.class_changes;
drop policy if exists "admin write" on public.class_changes;
create policy "public read" on public.class_changes for select to anon, authenticated using (true);
create policy "admin write" on public.class_changes for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
