// ===== FALLBACK CONTENT =====
// Once Supabase is connected (js/config.js), the site reads from the database and you manage
// content at /admin.html instead. This file is only used when Supabase is NOT configured.
const QUIZ_URL = "https://bsit1-2review.vercel.app";  // mock quiz link (also used if the admin quiz link is left empty)
// t = Important | Class | Event   d = date (YYYY-MM-DD)
const ANN = [
 {t:"Important",d:"2026-11-23",h:"[Announcement title]",b:"[Announcement details go here. Keep it short and clear.]",by:"[Officer / Instructor]"},
 {t:"Class",d:"2026-11-20",h:"[Announcement title]",b:"[Announcement details go here.]",by:"[Officer / Instructor]"},
 {t:"Event",d:"2026-11-18",h:"[Announcement title]",b:"[Announcement details go here.]",by:"[Officer / Instructor]"},
 {t:"Class",d:"2026-11-15",h:"[Announcement title]",b:"[Announcement details go here.]",by:"[Officer / Instructor]"}];
// k = ev (activity, blue) | dl (deadline, yellow)
const EV = [
 {d:"2026-11-27",k:"ev",h:"[Activity name]"},{d:"2026-12-04",k:"dl",h:"[Deadline name]"},
 {d:"2026-12-11",k:"ev",h:"[Activity name]"},{d:"2026-12-18",k:"dl",h:"[Deadline name]"},{d:"2026-12-22",k:"ev",h:"[Activity name]"}];
// g = 1 (Due soon) | 2 (Bring / prepare)   id must be unique
const REM = [
 {g:1,id:"a",h:"[Submit requirement]",s:"Due [DATE]"},{g:1,id:"b",h:"[Project deadline]",s:"Due [DATE]"},{g:1,id:"c",h:"[Payment / contribution]",s:"Until [DATE]"},
 {g:2,id:"d",h:"[Item to bring]",s:"For [ACTIVITY]"},{g:2,id:"e",h:"[Uniform / dress code]",s:"On [DATE]"},{g:2,id:"f",h:"[Materials to prepare]",s:"For [SUBJECT]"}];
// ---- WEEKLY CLASS SCHEDULE (BSIT 1-2) ----
// day: 1=Mon ... 6=Sat   s/e = start/end (24h "HH:MM")   lab: "all" (everyone) | "A" | "B"
const SCHED = [
 // Monday
 {day:1,s:"10:00",e:"12:00",h:"PATHFIT 2",r:"Gym",lab:"all"},
 {day:1,s:"13:00",e:"14:00",h:"COMSCI 1200",r:"CLR 221",lab:"all"},
 {day:1,s:"14:30",e:"16:00",h:"INTECH 1200",r:"CLR 221",lab:"all"},
 // Tuesday
 {day:2,s:"08:30",e:"10:00",h:"SOCSI 1100",r:"CLR 205",lab:"all"},
 {day:2,s:"10:00",e:"11:30",h:"ENSCI 1100",r:"CLR 205",lab:"all"},
 {day:2,s:"13:00",e:"16:00",h:"COMSCI 1201 LAB",r:"CLR 213",lab:"A"},
 {day:2,s:"13:00",e:"16:00",h:"COMSCI 1200 LAB",r:"CLR 212",lab:"B"},
 // Wednesday
 {day:3,s:"07:00",e:"10:00",h:"COMSCI 1200 LAB",r:"CLR 212",lab:"A"},
 {day:3,s:"07:00",e:"10:00",h:"COMSCI 1201 LAB",r:"CLR 213",lab:"B"},
 // Thursday
 {day:4,s:"10:00",e:"11:30",h:"COMM 1100",r:"CLR 205",lab:"all"},
 {day:4,s:"13:00",e:"15:00",h:"COMSCI 1201",r:"CLR 202",lab:"all"},
 {day:4,s:"15:00",e:"16:30",h:"INTECH 1200",r:"CLR 202",lab:"all"},
 // Friday
 {day:5,s:"07:00",e:"08:00",h:"COMSCI 1200",r:"Online",lab:"all"},
 {day:5,s:"08:30",e:"10:00",h:"SOCSI 1100",r:"Async",lab:"all"},
 {day:5,s:"11:30",e:"13:00",h:"COMM 1100",r:"Async",lab:"all"},
 {day:5,s:"14:30",e:"16:00",h:"ENSCI 1100",r:"Async",lab:"all"},
 // Saturday
 {day:6,s:"07:30",e:"11:30",h:"NSTP 1200",r:"Field",lab:"all"}];
// ---- CANCELLED CLASSES (only used when Supabase is NOT connected; otherwise use the admin panel) ----
// d = date   h = subject name exactly as in SCHED   lab = "all" | "A" | "B"   note = reason (optional)
const CANCEL = [
 // {d:"2026-12-02",h:"SOCSI 1100",lab:"all",note:"Instructor absent"}
];
// ---- TIME CHANGES for one date (only used when Supabase is NOT connected; otherwise use the admin panel) ----
// d = date   h = subject   lab = "all"|"A"|"B"   s/e = new start/end ("HH:MM")   r = new room (optional)   note = reason (optional)
const CHANGES = [
 // {d:"2026-12-02",h:"SOCSI 1100",lab:"all",s:"10:00",e:"11:30",r:"",note:"Moved"}
];
// ---- NO CLASS DAYS (only used when Supabase is NOT connected; otherwise use the admin panel) ----
// s = first day   e = last day (same as s for one day)   lab = "all"|"A"|"B"   note = reason (optional)
const SUSPEND = [
 // {s:"2026-12-08",e:"2026-12-08",lab:"all",note:"Holiday"}
];
// ==================================
