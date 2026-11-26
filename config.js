const SUPABASE_URL="https://argaydshyzbaotirthff.supabase.co";
const SUPABASE_KEY="sb_publishable_comq7U7_cg91vZER4eKJhA_ehwR0bvu";
const esc=s=>String(s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const db={
 err:"",
 on:()=>!!(SUPABASE_URL&&SUPABASE_KEY),
 h:()=>({apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json"}),
 async fail(x){let m="";try{const j=await x.json();m=(j.code||"")+" "+(j.message||"")}catch(e){}db.err=x.status+" "+m;console.error("Supabase error:",db.err);return db.err},
 hint(e){e=e||db.err||"";if(!db.on())return"Leaderboard is not set up yet.";
  if(/PGRST205|42P01|404/.test(e))return"Leaderboard table not found. Run supabase.sql (PathFit) and supabase-ensci.sql (Ensci) in the Supabase SQL Editor.";
  if(/42501|401|403/.test(e))return"Permission denied. Run the policy lines in supabase.sql (Row Level Security).";
  if(/network/i.test(e))return"Cannot reach Supabase. Check your internet and the Project URL.";
  return"Supabase error: "+e},
 async add(id,r){if(!db.on())return"off";try{const x=await fetch(SUPABASE_URL+"/rest/v1/scores_"+id,{method:"POST",headers:{...db.h(),Prefer:"return=minimal"},body:JSON.stringify(r)});return x.ok?"":await db.fail(x)}catch(e){db.err="network error";return db.err}},
 async top(id){if(!db.on())return null;try{const x=await fetch(SUPABASE_URL+"/rest/v1/scores_"+id+"?select=name,score,total&order=score.desc,created_at.asc&limit=10",{headers:db.h()});if(x.ok)return await x.json();await db.fail(x);return null}catch(e){db.err="network error";return null}}
};

/* ---- Archived quizzes ----
   A row in quiz_archive = that quiz is archived. Students see archived quizzes under the "Archived quizzes"
   button on each subject page; admin.html is where they get archived / unarchived. */
const ARCH_KEY="quiz_archive_cache";
const archive={
 cached(){try{const a=JSON.parse(localStorage.getItem(ARCH_KEY)||"null");return Array.isArray(a)?a:null}catch(e){return null}},
 async ids(){ // -> array of archived quiz ids, or null if it could not be loaded
  if(!db.on())return null;
  try{const ac=new AbortController(),t=setTimeout(()=>ac.abort(),4000);
   const x=await fetch(SUPABASE_URL+"/rest/v1/quiz_archive?select=quiz_id",{headers:db.h(),signal:ac.signal});clearTimeout(t);
   if(!x.ok){await db.fail(x);return null}
   const a=(await x.json()).map(r=>r.quiz_id);try{localStorage.setItem(ARCH_KEY,JSON.stringify(a))}catch(e){}return a}
  catch(e){return null}}
};

