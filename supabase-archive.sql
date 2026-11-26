-- Archived quizzes + admin login. Run this ONCE in the Supabase SQL Editor.
--
-- BEFORE running:
--   1) Supabase > Authentication > Users > Add user (your email + a password, tick "Auto confirm").
--   2) Replace  YOUR_ADMIN_EMAIL@example.com  (last section) with that email.
--   3) Authentication > turn OFF "Allow new users to sign up" so nobody else can make an account.
-- Safe to run again.

-- 1) Which quizzes are archived (a row = archived) --------------------------
create table if not exists public.quiz_archive (
  quiz_id     text primary key check (char_length(quiz_id) between 1 and 60),
  archived_at timestamptz not null default now()
);

-- 2) Who is an admin ---------------------------------------------------------
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- 3) Security rules: everyone can read, only admins can archive/unarchive ----
grant usage on schema public to anon, authenticated;
grant select on public.quiz_archive to anon, authenticated;
grant insert, update, delete on public.quiz_archive to authenticated;

alter table public.quiz_archive enable row level security;
drop policy if exists "public read" on public.quiz_archive;
drop policy if exists "admin write" on public.quiz_archive;
create policy "public read" on public.quiz_archive for select to anon, authenticated using (true);
create policy "admin write" on public.quiz_archive for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- 4) Make yourself admin -----------------------------------------------------
insert into public.admins (user_id)
select id from auth.users where email = lower('YOUR_ADMIN_EMAIL@example.com')
on conflict do nothing;

-- Check it worked (should return 1 row with your email):
select u.email from public.admins a join auth.users u on u.id = a.user_id;
