(()=>{
"use strict";
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad=n=>String(n).padStart(2,"0");
const today=()=>{const t=new Date();return `${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`};
const nowT=()=>{const t=new Date();return `${pad(t.getHours())}:${pad(t.getMinutes())}`};
const fmtT=t=>{if(!t)return"";const[h,m]=String(t).split(":").map(Number),ap=h>=12?"PM":"AM";return `${h%12||12}:${pad(m)} ${ap}`};
const fmtPosted=iso=>{try{return new Date(iso).toLocaleString("en-PH",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZone:"Asia/Manila"})}catch(e){return""}};
const fmt=iso=>new Date(iso+"T00:00").toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"});
const tt=$("#toast");let tmr;
const toast=m=>{tt.textContent=m;tt.style.display="block";clearTimeout(tmr);tmr=setTimeout(()=>tt.style.display="none",2800)};
const show=id=>{["cfg","login","dash"].forEach(x=>$("#"+x).hidden=x!==id);$("#out").hidden=id!=="dash"};
const okUrl=u=>/^https?:\/\//i.test(u||"");

if(!window.SB){show("cfg");return}

// ---- what each tab edits ----
const TABLE={cancellations:"class_cancellations",changes:"class_changes",suspensions:"class_suspensions"},tbl=k=>TABLE[k]||k;
const TABS={
 announcements:{label:"Announcements",one:"announcement",
  order:q=>q.order("posted_on",{ascending:false}).order("id",{ascending:false}),
  fields:[
   {k:"type",l:"Type",t:"select",o:[["Important","Important"],["Class","Class"],["Event","Event"]],def:"Class"},
   {k:"posted_on",l:"Date",t:"date",def:today,req:1},
   {k:"posted_time",l:"Time posted",t:"time",def:nowT},
   {k:"title",l:"Title",t:"text",req:1},
   {k:"body",l:"Details",t:"textarea"},
   {k:"posted_by",l:"Posted by",t:"text",ph:"Officer / Instructor"}],
  row:r=>`<span class="tag ${{Important:"",Class:"b",Event:"g"}[r.type]||""}">${esc(r.type)}</span> <span class="mut sm-t">${fmt(r.posted_on)}${r.posted_time?" · "+fmtT(r.posted_time):""}</span><h3>${esc(r.title)}</h3>${r.body?`<p class="mut">${esc(r.body)}</p>`:""}${r.posted_by?`<p class="sm-t"><b>${esc(r.posted_by)}</b></p>`:""}`},
 events:{label:"Activities",one:"activity",
  order:q=>q.order("event_date"),
  fields:[
   {k:"event_date",l:"Date",t:"date",def:today,req:1},
   {k:"event_time",l:"Time (optional)",t:"time"},
   {k:"kind",l:"Kind",t:"select",o:[["ev","Activity (blue)"],["dl","Deadline (yellow)"]],def:"ev"},
   {k:"title",l:"Title",t:"text",req:1}],
  row:r=>`<span class="tag ${r.kind==="ev"?"b":""}">${fmt(r.event_date)}</span><h3>${esc(r.title)}</h3><p class="mut sm-t">${r.kind==="ev"?"Activity":"Deadline"}${r.event_time?" · "+fmtT(r.event_time):""}</p>`},
 cancellations:{label:"Cancelled classes",one:"class cancellation",
  order:q=>q.order("cancel_date",{ascending:false}),
  fields:[
   {k:"cancel_date",l:"Date",t:"date",def:today,req:1},
   {k:"subject",l:"Subject",t:"select",o:[...new Set((typeof SCHED!=="undefined"?SCHED:[]).map(c=>c.h))].map(x=>[x,x])},
   {k:"lab",l:"Applies to",t:"select",o:[["all","Everyone"],["A","Lab A only"],["B","Lab B only"]],def:"all"},
   {k:"note",l:"Reason (optional)",t:"text",ph:"Instructor absent"}],
  row:r=>`<span class="tag">${fmt(r.cancel_date)}</span> <span class="mut sm-t">${new Date(r.cancel_date+"T00:00").toLocaleDateString("en-PH",{weekday:"long"})}</span><h3>${esc(r.subject)}</h3><p class="mut sm-t">${{all:"Everyone",A:"Lab A only",B:"Lab B only"}[r.lab]||esc(r.lab)}${r.note?" · "+esc(r.note):""}</p>`},
 changes:{label:"Time changes",one:"time change",
  order:q=>q.order("change_date",{ascending:false}),
  fields:[
   {k:"change_date",l:"Date",t:"date",def:today,req:1},
   {k:"subject",l:"Subject",t:"select",o:[...new Set((typeof SCHED!=="undefined"?SCHED:[]).map(c=>c.h))].map(x=>[x,x])},
   {k:"lab",l:"Applies to",t:"select",o:[["all","Everyone"],["A","Lab A only"],["B","Lab B only"]],def:"all"},
   {k:"new_start",l:"New start time",t:"time",req:1},
   {k:"new_end",l:"New end time",t:"time",req:1},
   {k:"new_room",l:"New room (optional)",t:"text",ph:"Leave blank if same room"},
   {k:"note",l:"Reason (optional)",t:"text",ph:"Instructor moved it"}],
  row:r=>`<span class="tag b">${fmt(r.change_date)}</span> <span class="mut sm-t">${new Date(r.change_date+"T00:00").toLocaleDateString("en-PH",{weekday:"long"})}</span><h3>${esc(r.subject)}</h3><p class="mut sm-t">${fmtT(r.new_start)} – ${fmtT(r.new_end)}${r.new_room?" · "+esc(r.new_room):""} · ${{all:"Everyone",A:"Lab A only",B:"Lab B only"}[r.lab]||esc(r.lab)}${r.note?" · "+esc(r.note):""}</p>`},
 suspensions:{label:"No class days",one:"no-class day",
  order:q=>q.order("start_date",{ascending:false}),
  fields:[
   {k:"start_date",l:"From date",t:"date",def:today,req:1},
   {k:"end_date",l:"To date (leave blank for one day)",t:"date"},
   {k:"lab",l:"Applies to",t:"select",o:[["all","Everyone"],["A","Lab A only"],["B","Lab B only"]],def:"all"},
   {k:"note",l:"Reason (optional)",t:"text",ph:"Holiday, typhoon, etc."}],
  row:r=>`<span class="tag">${fmt(r.start_date)}${r.end_date!==r.start_date?" – "+fmt(r.end_date):""}</span><h3>No classes${r.note?": "+esc(r.note):""}</h3><p class="mut sm-t">${{all:"Everyone",A:"Lab A only",B:"Lab B only"}[r.lab]||esc(r.lab)}${r.end_date!==r.start_date?" · "+(Math.round((new Date(r.end_date+"T00:00")-new Date(r.start_date+"T00:00"))/864e5)+1)+" days":""}</p>`},
 reminders:{label:"Reminders",one:"reminder",
  order:q=>q.order("grp").order("id"),
  fields:[
   {k:"grp",l:"List",t:"select",o:[["1","Due soon"],["2","Bring / prepare"]],def:"1",num:1},
   {k:"title",l:"Title",t:"text",req:1},
   {k:"note",l:"Note",t:"text",ph:"Due Dec 5"},
   {k:"due_time",l:"Due time (optional)",t:"time"}],
  row:r=>`<span class="tag ${r.grp===1?"":"b"}">${r.grp===1?"Due soon":"Bring / prepare"}</span><h3>${esc(r.title)}</h3>${r.note?`<p class="mut sm-t">${esc(r.note)}</p>`:""}<p class="mut sm-t">${[r.due_time?"Due "+fmtT(r.due_time):"","Posted "+fmtPosted(r.created_at)].filter(Boolean).join(" · ")}</p>`}
};

let cur="announcements",rows=[],editing=null;
const sel=new Set();
const pane=$("#pane");

// ---- login / logout ----
async function enter(){
 const {data:ok,error}=await SB.rpc("is_admin");
 if(error||!ok){
  await SB.auth.signOut();show("login");
  $("#lmsg").textContent=error?("Could not verify admin: "+error.message):"This account is not an admin. Ask the site owner to add you.";
  return}
 show("dash");load();
}
$("#lf").addEventListener("submit",async e=>{
 e.preventDefault();const b=$("#lb"),m=$("#lmsg");m.textContent="";
 const email=$("#em").value.trim(),password=$("#pw").value;
 if(!email||!password){m.textContent="Enter your email and password.";return}
 b.disabled=true;
 const {error}=await SB.auth.signInWithPassword({email,password});
 b.disabled=false;
 if(error){m.textContent=error.message;return}
 $("#pw").value="";await enter();
});
$("#gb").addEventListener("click",async()=>{
 const m=$("#lmsg");m.textContent="";
 const {error}=await SB.auth.signInWithOAuth({provider:"google",options:{redirectTo:location.origin+location.pathname}});
 if(error)m.textContent=error.message;
});
$("#out").addEventListener("click",async()=>{await SB.auth.signOut();rows=[];editing=null;sel.clear();show("login")});

// ---- tabs ----
function drawTabs(){
 $("#tabs").innerHTML=[...Object.keys(TABS),"settings"].map(k=>`<button class="chip" type="button" data-tab="${k}" aria-pressed="${k===cur}">${k==="settings"?"Settings":TABS[k].label}</button>`).join("");
}
$("#tabs").addEventListener("click",e=>{const b=e.target.closest("[data-tab]");if(!b||b.dataset.tab===cur)return;cur=b.dataset.tab;editing=null;sel.clear();load()});

async function load(){
 drawTabs();sel.clear();
 if(cur==="settings")return drawSettings();
 const mine=cur;pane.innerHTML='<p class="mut">Loading…</p>';
 const {data,error}=await TABS[mine].order(SB.from(tbl(mine)).select("*"));
 if(mine!==cur)return;
 if(error){pane.innerHTML=`<p class="err">${esc(error.message)}</p>`;return}
 rows=data;drawPane();
}

function fieldHTML(f,v){
 const id="f-"+f.k,val=v==null?"":(f.t==="time"?String(v).slice(0,5):v);
 let c;
 if(f.t==="select")c=`<select id="${id}">${f.o.map(([ov,ol])=>`<option value="${esc(ov)}" ${String(val)===ov?"selected":""}>${esc(ol)}</option>`).join("")}</select>`;
 else if(f.t==="textarea")c=`<textarea id="${id}">${esc(val)}</textarea>`;
 else c=`<input id="${id}" type="${f.t}" value="${esc(val)}" ${f.ph?`placeholder="${esc(f.ph)}"`:""}>`;
 return `<div class="fld"><label for="${id}">${f.l}${f.req?" *":""}</label>${c}</div>`;
}

function drawPane(){
 const T=TABS[cur];
 const list=rows.map(r=>`<div class="item"><label class="pick"><input type="checkbox" data-pick="${r.id}" aria-label="Select" ${sel.has(String(r.id))?"checked":""}></label><div>${T.row(r)}</div><div class="row"><button class="bs sm" type="button" data-edit="${r.id}">Edit</button><button class="bs sm danger" type="button" data-del="${r.id}">Delete</button></div></div>`).join("")||'<p class="mut">Nothing yet. Add your first one.</p>';
 const fields=T.fields.map(f=>{const dv=typeof f.def==="function"?f.def():f.def;return fieldHTML(f,editing?editing[f.k]:dv)}).join("");
 pane.innerHTML=`<section class="box"><div class="hd"><h2>${T.label} (${rows.length})</h2></div>${rows.length?`<div class="bar"><label class="pick"><input type="checkbox" id="selall"> Select all</label><button class="bs sm danger" type="button" id="delsel" disabled>Delete selected</button></div>`:""}${list}</section>
<section class="box" id="formbox"><div class="hd"><h2>${editing?"Edit":"Add"} ${T.one}</h2></div>
<form id="ef" novalidate>${fields}<div class="row"><button class="bp" type="submit" id="sb">${editing?"Save changes":"Add"}</button>${editing?'<button class="bs" type="button" id="cancel">Cancel</button>':""}</div><p class="err" id="fmsg" role="alert"></p></form></section>`;
 syncSel();
}
function syncSel(){
 const all=$("#selall"),btn=$("#delsel");if(!all||!btn)return;
 const n=rows.filter(r=>sel.has(String(r.id))).length;
 all.checked=n>0&&n===rows.length;all.indeterminate=n>0&&n<rows.length;
 btn.disabled=!n;btn.textContent=n?`Delete selected (${n})`:"Delete selected";
}
pane.addEventListener("change",e=>{
 if(cur==="settings")return;
 if(e.target.id==="selall"){
  rows.forEach(r=>e.target.checked?sel.add(String(r.id)):sel.delete(String(r.id)));
  pane.querySelectorAll("[data-pick]").forEach(c=>c.checked=e.target.checked);syncSel();return}
 if(e.target.matches("[data-pick]")){
  e.target.checked?sel.add(e.target.dataset.pick):sel.delete(e.target.dataset.pick);syncSel()}
});

pane.addEventListener("click",async e=>{
 if(cur==="settings")return;
 const ed=e.target.closest("[data-edit]"),dl=e.target.closest("[data-del]");
 if(ed){editing=rows.find(r=>String(r.id)===ed.dataset.edit)||null;drawPane();$("#formbox").scrollIntoView({behavior:"smooth",block:"start"});return}
 if(e.target.id==="cancel"){editing=null;drawPane();return}
 if(e.target.id==="delsel"){
  const ids=rows.filter(r=>sel.has(String(r.id))).map(r=>r.id);if(!ids.length)return;
  if(!confirm(`Delete ${ids.length} selected item${ids.length>1?"s":""}? This can't be undone.`))return;
  e.target.disabled=true;
  const {data,error}=await SB.from(tbl(cur)).delete().in("id",ids).select();
  if(error){e.target.disabled=false;return toast("Error: "+error.message)}
  if(!data.length){e.target.disabled=false;return toast("Nothing was deleted. Is this account set up as an admin?")}
  if(editing&&ids.includes(editing.id))editing=null;
  toast(`Deleted ${data.length}`);load();return}
 if(dl){
  const r=rows.find(x=>String(x.id)===dl.dataset.del);if(!r)return;
  if(!confirm(`Delete "${r.title||r.subject||"this entry"}"? This can't be undone.`))return;
  const {data,error}=await SB.from(tbl(cur)).delete().eq("id",r.id).select();
  if(error)return toast("Error: "+error.message);
  if(!data.length)return toast("Nothing was deleted. Is this account set up as an admin?");
  if(editing&&editing.id===r.id)editing=null;
  toast("Deleted");load();
 }
});

pane.addEventListener("submit",async e=>{
 e.preventDefault();
 if(e.target.id==="ef")return saveItem();
 if(e.target.id==="sf")return saveSettings();
 if(e.target.id==="pf")return savePassword();
});

async function saveItem(){
 const T=TABS[cur],msg=$("#fmsg"),btn=$("#sb");msg.textContent="";
 const vals={};
 for(const f of T.fields){
  let v=$("#f-"+f.k).value.trim();
  if(f.req&&!v){msg.textContent=`"${f.l}" is required.`;$("#f-"+f.k).focus();return}
  vals[f.k]=f.num?Number(v):(f.t==="time"&&!v?null:v);
 }
 if(cur==="suspensions"){if(!vals.end_date)vals.end_date=vals.start_date;if(vals.end_date<vals.start_date){msg.textContent="The last day can't be before the first day.";$("#f-end_date").focus();return}}
 if(cur==="changes"&&vals.new_end<=vals.new_start){msg.textContent="The end time must be after the start time.";$("#f-new_end").focus();return}
 btn.disabled=true;
 const q=editing?SB.from(tbl(cur)).update(vals).eq("id",editing.id):SB.from(tbl(cur)).insert(vals);
 const {data,error}=await q.select();
 btn.disabled=false;
 if(error){msg.textContent=error.message;return}
 if(!data.length){msg.textContent="Nothing was saved. Is this account set up as an admin?";return}
 toast(editing?"Saved":"Added");editing=null;load();
}

// ---- settings tab ----
async function drawSettings(){
 pane.innerHTML='<p class="mut">Loading…</p>';
 const {data,error}=await SB.from("settings").select("value").eq("key","quiz_url").maybeSingle();
 if(cur!=="settings")return;
 if(error){pane.innerHTML=`<p class="err">${esc(error.message)}</p>`;return}
 pane.innerHTML=`<section class="box"><div class="hd"><h2>Mock quiz link</h2></div>
<form id="sf" novalidate><div class="fld"><label for="qu">Quiz URL</label><input id="qu" type="url" value="${esc(data?data.value:"")}" placeholder="https://..."></div>
<p class="mut sm-t" style="margin-bottom:12px">Shown on the yellow "Mock Quiz" button. Leave empty to show "coming soon".</p>
<button class="bp" type="submit" id="sb2">Save link</button><p class="err" id="smsg" role="alert"></p></form></section>
<section class="box"><div class="hd"><h2>Change password</h2></div>
<form id="pf" novalidate><div class="fld"><label for="np">New password</label><input id="np" type="password" autocomplete="new-password"></div>
<button class="bp" type="submit" id="pb">Update password</button><p class="err" id="pmsg" role="alert"></p></form></section>`;
}
async function saveSettings(){
 const m=$("#smsg"),v=$("#qu").value.trim();m.textContent="";
 if(v&&!okUrl(v)){m.textContent="The link must start with http:// or https://";return}
 $("#sb2").disabled=true;
 const {data,error}=await SB.from("settings").upsert({key:"quiz_url",value:v}).select();
 $("#sb2").disabled=false;
 if(error){m.textContent=error.message;return}
 if(!data.length){m.textContent="Nothing was saved. Is this account set up as an admin?";return}
 toast("Quiz link saved");
}
async function savePassword(){
 const m=$("#pmsg"),p=$("#np").value;m.textContent="";
 if(p.length<8){m.textContent="Use at least 8 characters.";return}
 $("#pb").disabled=true;
 const {error}=await SB.auth.updateUser({password:p});
 $("#pb").disabled=false;
 if(error){m.textContent=error.message;return}
 $("#np").value="";toast("Password updated");
}

// ---- start ----
(async()=>{
 const {data}=await SB.auth.getSession();
 if(data&&data.session)await enter();else show("login");
})();
})();
