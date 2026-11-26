BSIT 1-2 Class Website
======================
Public site: index.html    Admin panel: admin.html (login required)

SETUP (one time)
1. Create a Supabase project, then Authentication > Users > Add user (your admin email + password, auto-confirm).
2. Open supabase/setup.sql, replace YOUR_ADMIN_EMAIL@example.com with that email, paste into SQL Editor, Run.
3. Put your Project URL + publishable key in js/config.js.
4. Authentication > turn OFF "Allow new users to sign up".
5. Deploy the whole folder (Vercel / Netlify / GitHub Pages). Log in at /admin.html.

Never put the secret / service_role key in this folder.
If js/config.js is empty, the site shows the fallback content in js/data.js.

Files: index.html | admin.html | css/ | js/config.js | js/supa.js | js/app.js | js/admin.js | js/data.js | supabase/setup.sql

CANCELLING A CLASS FOR ONE DAY
Admin > Cancelled classes > pick the date + subject (+ Lab A / Lab B / Everyone). The regular weekly schedule stays the same.
If you set up Supabase BEFORE this feature, run supabase/migration-add-cancellations.sql once in the SQL Editor.

MOVING A CLASS TO A DIFFERENT TIME FOR ONE DAY
Admin > Time changes > pick the date + subject + new start/end (and room if it changed). Regular schedule stays the same.
Run supabase/migration-add-time-changes.sql once in the SQL Editor.

NO CLASS DAYS (holiday / typhoon)
Admin > No class days > pick the date (or a range) and who it applies to. Every class on those dates shows as cancelled.
Run supabase/migration-add-no-class-days.sql once in the SQL Editor.

INTRO SPLASH
js/splash.js + the "Intro splash" block at the bottom of css/style.css. It plays on every page load (skipped for people who turned on "reduce motion").
