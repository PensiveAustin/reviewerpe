/* Paste your Supabase values here (see the setup guide). Leave empty to run without a leaderboard. */
const SUPABASE_URL="";
const SUPABASE_KEY="";
const esc=s=>String(s).replace(/[&<>"']/g,c=>"&#"+c.charCodeAt(0)+";");
const db={
 on:()=>!!(SUPABASE_URL&&SUPABASE_KEY),
 h:()=>({apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json"}),
 async add(r){if(!db.on())return false;try{return(await fetch(SUPABASE_URL+"/rest/v1/scores",{method:"POST",headers:{...db.h(),Prefer:"return=minimal"},body:JSON.stringify(r)})).ok}catch(e){return false}},
 async top(id){if(!db.on())return null;try{const x=await fetch(SUPABASE_URL+"/rest/v1/scores?select=name,score,total&quiz_id=eq."+encodeURIComponent(id)+"&order=score.desc,created_at.asc&limit=10",{headers:db.h()});return x.ok?await x.json():null}catch(e){return null}}
};
