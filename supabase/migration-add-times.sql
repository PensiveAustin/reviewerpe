-- Run once in Supabase > SQL Editor (only if you ALREADY ran setup.sql before).
alter table public.announcements add column if not exists posted_time time;
alter table public.events        add column if not exists event_time  time;
alter table public.reminders     add column if not exists due_time    time;
-- existing announcements: use the moment they were created as the posted time (Philippine time)
update public.announcements
   set posted_time = (created_at at time zone 'Asia/Manila')::time
 where posted_time is null;
