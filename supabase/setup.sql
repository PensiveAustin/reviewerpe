-- =====================================================================
-- BSIT 1-2 Class Website: Supabase setup
-- Paste this WHOLE file into Supabase > SQL Editor > New query > Run.
--
-- BEFORE running: replace  YOUR_ADMIN_EMAIL@example.com  (last section)
-- with the email of the user you created in Authentication > Users.
-- Safe to run again if something fails halfway.
-- =====================================================================

-- 1) TABLES ------------------------------------------------------------
create table if not exists public.announcements (
  id         bigint generated always as identity primary key,
  type       text   not null check (type in ('Important','Class','Event')),
  posted_on  date   not null default current_date,
  posted_time time,                                       -- time shown with the date (optional)
  title      text   not null,
  body       text   not null default '',
  posted_by  text   not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id         bigint generated always as identity primary key,
  event_date date   not null,
  event_time time,                                         -- optional start time
  kind       text   not null check (kind in ('ev','dl')),  -- ev = activity, dl = deadline
  title      text   not null,
  created_at timestamptz not null default now()
);

create table if not exists public.reminders (
  id         bigint generated always as identity primary key,
  grp        smallint not null check (grp in (1,2)),       -- 1 = Due soon, 2 = Bring / prepare
  title      text   not null,
  note       text   not null default '',
  due_time   time,                                         -- optional due time
  created_at timestamptz not null default now()
);

create table if not exists public.class_cancellations (
  id          bigint generated always as identity primary key,
  cancel_date date   not null,                                -- the day the class is cancelled
  subject     text   not null,                                -- must match the subject name in js/data.js
  lab         text   not null default 'all' check (lab in ('all','A','B')),  -- who is affected
  note        text   not null default '',                     -- optional reason, e.g. "Instructor absent"
  created_at  timestamptz not null default now(),
  unique (cancel_date, subject, lab)
);

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

create table if not exists public.class_suspensions (
  id          bigint generated always as identity primary key,
  start_date  date   not null,                                -- first day with no classes
  end_date    date   not null,                                -- last day (same as start for a single day)
  lab         text   not null default 'all' check (lab in ('all','A','B')),
  note        text   not null default '',                     -- e.g. "Holiday", "Typhoon"
  created_at  timestamptz not null default now(),
  check (end_date >= start_date)
);

create table if not exists public.settings (
  key   text primary key,
  value text not null default ''
);
insert into public.settings (key, value) values ('quiz_url', '')
on conflict (key) do nothing;

-- 2) WHO IS AN ADMIN ---------------------------------------------------
-- Only user ids listed here can edit content. Nobody can read/write this
-- table through the API; the function below checks it safely.
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

-- 3) SECURITY RULES (RLS) ----------------------------------------------
-- Everyone can READ the 7 content tables. Only admins can add/edit/delete.
grant usage on schema public to anon, authenticated;
grant select on public.announcements, public.events, public.reminders, public.settings, public.class_cancellations, public.class_changes, public.class_suspensions
  to anon, authenticated;
grant insert, update, delete on public.announcements, public.events, public.reminders, public.settings, public.class_cancellations, public.class_changes, public.class_suspensions
  to authenticated;
grant usage, select on all sequences in schema public to authenticated;

do $$
declare t text;
begin
  foreach t in array array['announcements','events','reminders','settings','class_cancellations','class_changes','class_suspensions'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read"  on public.%I', t);
    execute format('drop policy if exists "admin write"  on public.%I', t);
    execute format('create policy "public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))', t);
  end loop;
end $$;

-- 4) MAKE YOURSELF ADMIN -----------------------------------------------
-- Replace the email below with the one you used in Authentication > Users.
insert into public.admins (user_id)
select id from auth.users where email = lower('YOUR_ADMIN_EMAIL@example.com')
on conflict do nothing;

-- Check it worked (should return 1 row with your email):
select u.email from public.admins a join auth.users u on u.id = a.user_id;
