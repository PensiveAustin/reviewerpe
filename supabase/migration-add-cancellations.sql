-- Run once in Supabase > SQL Editor (only if you ALREADY ran setup.sql before).
-- Adds "cancelled classes": the admin can cancel a subject on one date
-- while the regular weekly schedule stays the same.
create table if not exists public.class_cancellations (
  id          bigint generated always as identity primary key,
  cancel_date date   not null,
  subject     text   not null,                                -- must match the subject name in js/data.js
  lab         text   not null default 'all' check (lab in ('all','A','B')),
  note        text   not null default '',
  created_at  timestamptz not null default now(),
  unique (cancel_date, subject, lab)
);

grant select on public.class_cancellations to anon, authenticated;
grant insert, update, delete on public.class_cancellations to authenticated;
grant usage, select on all sequences in schema public to authenticated;

alter table public.class_cancellations enable row level security;
drop policy if exists "public read" on public.class_cancellations;
drop policy if exists "admin write" on public.class_cancellations;
create policy "public read" on public.class_cancellations for select to anon, authenticated using (true);
create policy "admin write" on public.class_cancellations for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
