const $=s=>document.querySelector(s), pad=n=>String(n).padStart(2,"0");
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// D = the content. With Supabase connected it starts empty (or from cache) and is filled by loadRemote().
const D={ann:ANN,ev:EV,rem:REM,quiz:QUIZ_URL,cx:CANCEL,ch:CHANGES,sp:SUSPEND};
if(window.SB){D.ann=[];D.ev=[];D.rem=[];D.cx=[];D.ch=[];D.sp=[];D.quiz="";try{const c=JSON.parse(localStorage.getItem("bsit-cache")||"null");if(c)Object.assign(D,c)}catch(e){}D.quiz=D.quiz||QUIZ_URL}
const fmtT=t=>{if(!t)return"";const[h,m]=String(t).split(":").map(Number),ap=h>=12?"PM":"AM";return `${h%12||12}:${pad(m)} ${ap}`};
const fmtPosted=iso=>{try{return new Date(iso).toLocaleString("en-PH",{month:"short",day:"numeric",hour:"numeric",minute:"2-digit",timeZone:"Asia/Manila"})}catch(e){return""}};
const rel=iso=>{const n=Math.round((new Date(iso+"T00:00")-new Date(todayISO()+"T00:00"))/864e5);return n<0?"":n==0?"Today":n==1?"Tomorrow":"in "+n+" days"};
const fmt=iso=>new Date(iso+"T00:00").toLocaleDateString("en-PH",{month:"short",day:"numeric"});
const TC={Important:"",Class:"b",Event:"g"};
let store={};try{store=JSON.parse(localStorage.getItem("bsit-rem")||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem("bsit-rem",JSON.stringify(store))}catch(e){}};
const annHTML=a=>`<div class="it"><span class="tag ${TC[a.t]||""}">${esc(a.t)}</span> <span class="mut" style="font-size:14px">${fmt(a.d)}${a.tm?" · "+fmtT(a.tm):""}</span><h3>${esc(a.h)}</h3><p class="mut">${esc(a.b)}</p></div>`;
const evHTML=e=>`<div class="it"><span class="tag ${e.k=="ev"?"b":""}">${fmt(e.d)}</span><h3>${esc(e.h)}</h3><p class="mut" style="font-size:14px">${e.k=="ev"?"Activity":"Deadline"}${e.tm?" · "+fmtT(e.tm):""}${rel(e.d)?" · "+rel(e.d):""}</p></div>`;
const remHTML=r=>`<label class="cb"><input type="checkbox" data-id="${esc(r.id)}" ${store[r.id]?"checked":""}><div><b>${esc(r.h)}</b><p class="mut" style="font-size:14px">${esc(r.s)}</p>${(r.tm||r.pa)?`<p class="mut" style="font-size:13px">${[r.tm?"Due "+fmtT(r.tm):"",r.pa?"Posted "+fmtPosted(r.pa):""].filter(Boolean).join(" · ")}</p>`:""}</div></label>`;
const todayISO=()=>{const t=new Date();return `${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`};
function nextClass(){
 const now=new Date(),nm=now.getHours()*60+now.getMinutes(),all=mine();
 for(let k=0;k<14;k++){
  const dt=new Date(now.getFullYear(),now.getMonth(),now.getDate()+k),iso=`${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}`;
  const list=all.filter(c=>c.day==dt.getDay()).map(c=>eff(iso,c)).filter(c=>!cxOf(iso,c)).sort((a,b)=>mins(a.s)-mins(b.s));
  const c=k?list[0]:list.find(c=>mins(c.e)>nm);
  if(c)return{iso,c,now:k==0&&mins(c.s)<=nm};
 }
 return null;
}
function stats(){
 const t=todayISO(),dl=D.ev.find(e=>e.k=="dl"&&e.d>=t),ev=D.ev.find(e=>e.k=="ev"&&e.d>=t),left=D.rem.filter(r=>!store[r.id]).length;
 const sub=e=>e?`${rel(e.d)} · ${fmt(e.d)}${e.tm?" · "+fmtT(e.tm):""}`:"";
 const tile=(c,l,h,s)=>`<div class="tile ${c}"><span>${l}</span><b>${h}</b><i>${s}</i></div>`;
 const nx=nextClass(),nxT=nx?`<a class="tile v" href="#schedule"><span>${nx.now?"Class now":"Next class"} · Lab ${lab}</span><b>${esc(nx.c.h)}</b><i>${nx.now?"Until "+fmtT(nx.c.e):rel(nx.iso)+" · "+fmtT(nx.c.s)} · ${esc(nx.c.r)}</i></a>`:`<a class="tile v" href="#schedule"><span>Next class · Lab ${lab}</span><b>None soon</b><i>No classes coming up</i></a>`;
 $("#stats").innerHTML=nxT+tile("y","Next deadline",dl?esc(dl.h):"None yet",dl?sub(dl):"You're clear")+tile("b","Next activity",ev?esc(ev.h):"None yet",ev?sub(ev):"Nothing planned")+tile("g","To-do left",left,left?"Tick them off as you go":"All caught up!");
}
function render(){
 stats();
 $("#h-ann").innerHTML=D.ann.slice(0,3).map(annHTML).join("")||'<p class="mut">No announcements yet.</p>';
 const up=D.ev.filter(e=>e.d>=todayISO()).slice(0,4);$("#h-ev").innerHTML=up.length?up.map(evHTML).join(""):'<p class="mut">Nothing scheduled yet.</p>';
 $("#h-rem").innerHTML=D.rem.filter(r=>!store[r.id]).slice(0,3).map(remHTML).join("")||'<p class="mut">All caught up!</p>';
 $("#r1").innerHTML=D.rem.filter(r=>r.g==1).map(remHTML).join("")||'<p class="mut">Nothing here.</p>';$("#r2").innerHTML=D.rem.filter(r=>r.g==2).map(remHTML).join("")||'<p class="mut">Nothing here.</p>';
 drawAnn();
}
let filt="All";
function drawAnn(){
 $("#chips").innerHTML=["All","Important","Class","Event"].map(c=>`<button class="chip" aria-pressed="${c==filt}" data-c="${c}">${c}</button>`).join("");
 $("#ann").innerHTML=D.ann.filter(a=>filt=="All"||a.t==filt).map(a=>`<article class="box">${annHTML(a)}${a.by?`<p style="font-size:14px;font-weight:600;margin-top:6px">Posted by ${esc(a.by)}</p>`:""}</article>`).join("")||'<p class="mut">No announcements yet.</p>';
}
document.addEventListener("click",e=>{const c=e.target.closest(".chip");if(c){filt=c.dataset.c;drawAnn()}});
document.addEventListener("change",e=>{if(e.target.matches(".cb input")){store[e.target.dataset.id]=e.target.checked;save();render()}});
let cy=new Date().getFullYear(),cm=new Date().getMonth(),sel=null;
function drawCal(){
 $("#mt").textContent=new Date(cy,cm,1).toLocaleDateString("en-US",{month:"long",year:"numeric"});
 const first=new Date(cy,cm,1).getDay(),n=new Date(cy,cm+1,0).getDate(),today=todayISO();
 let h="Sun Mon Tue Wed Thu Fri Sat".split(" ").map(d=>`<div class="w">${d}</div>`).join("")+'<div class="day x"></div>'.repeat(first);
 for(let i=1;i<=n;i++){const iso=`${cy}-${pad(cm+1)}-${pad(i)}`,e=D.ev.find(x=>x.d==iso);
  h+=`<button class="day ${e?e.k:""} ${iso==today?"td":""} ${iso==sel?"sel":""}" data-d="${iso}">${i}</button>`}
 $("#cal").innerHTML=h;
 const list=sel?D.ev.filter(e=>e.d==sel):D.ev.filter(e=>e.d.startsWith(`${cy}-${pad(cm+1)}`));
 $("#dt").textContent=sel?fmt(sel):"This month";
 $("#de").innerHTML=list.length?list.map(evHTML).join(""):'<p class="mut" style="margin-top:12px">Nothing scheduled.</p>';
}
$("#cal").addEventListener("click",e=>{const b=e.target.closest(".day[data-d]");if(b){sel=sel==b.dataset.d?null:b.dataset.d;drawCal()}});
$("#prev").onclick=()=>{cm--;if(cm<0){cm=11;cy--}sel=null;drawCal()};
$("#next").onclick=()=>{cm++;if(cm>11){cm=0;cy++}sel=null;drawCal()};

// ---- class schedule (weekly, repeats automatically; Lab A / Lab B) ----
const DAYN=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],DAYS=[1,2,3,4,5,6];
let lab="A",scy=new Date().getFullYear(),scm=new Date().getMonth(),ssel=todayISO();
try{const l=localStorage.getItem("bsit-lab");if(l=="A"||l=="B")lab=l}catch(e){}
const mins=t=>{const[h,m]=t.split(":").map(Number);return h*60+m};
const mine=()=>SCHED.filter(c=>c.lab=="all"||c.lab==lab).sort((x,y)=>x.day-y.day||mins(x.s)-mins(y.s));
const dow=iso=>new Date(iso+"T00:00").getDay();
const spOf=iso=>D.sp.find(x=>iso>=x.s&&iso<=x.e&&(x.lab=="all"||x.lab==lab));
const cxOf=(iso,c)=>D.cx.find(x=>x.d==iso&&x.h==c.h&&(x.lab=="all"||x.lab==lab))||(spOf(iso)?{note:spOf(iso).note||"No classes"}:undefined);
const chOf=(iso,c)=>D.ch.find(x=>x.d==iso&&x.h==c.h&&(x.lab=="all"||x.lab==lab));
const eff=(iso,c)=>{const x=chOf(iso,c);return x?{...c,s:x.s,e:x.e,r:x.r||c.r,mv:{s:c.s,e:c.e,note:x.note}}:c};
const clsHTML=(c,st,x)=>`<div class="it cls ${x?"off":st||""}"><span class="tag ${c.lab=="all"?"b":"g"}">${c.lab=="all"?"Everyone":"Lab "+c.lab}</span>${x?' <span class="tag">Cancelled</span>':""}${!x&&c.mv?' <span class="tag b">Moved</span>':""}${!x&&st=="now"?' <span class="tag">Now</span>':!x&&st=="next"?' <span class="tag b">Up next</span>':""}<h3>${esc(c.h)}</h3><p class="mut" style="font-size:14px">${fmtT(c.s)} – ${fmtT(c.e)} · ${esc(c.r)}${c.mv?`<br><span class="was">Usually ${fmtT(c.mv.s)} – ${fmtT(c.mv.e)}</span>`:""}</p>${x&&x.note?`<p style="font-size:14px;font-weight:600">${esc(x.note)}</p>`:!x&&c.mv&&c.mv.note?`<p style="font-size:14px;font-weight:600">${esc(c.mv.note)}</p>`:""}</div>`;
function drawSched(){
 $("#labs").innerHTML='<span class="lbl">My lab group:</span>'+["A","B"].map(l=>`<button class="chip" aria-pressed="${l==lab}" data-lab="${l}">Lab ${l}</button>`).join("")+(SCHED.some(c=>c.lab==lab)?"":`<span class="mut" style="font-size:14px">Lab ${lab} schedule coming soon. Showing shared classes only.</span>`);
 const all=mine(),today=todayISO(),now=new Date(),nm=now.getHours()*60+now.getMinutes();
 $("#smt").textContent=new Date(scy,scm,1).toLocaleDateString("en-US",{month:"long",year:"numeric"});
 const first=new Date(scy,scm,1).getDay(),n=new Date(scy,scm+1,0).getDate();
 let h="Sun Mon Tue Wed Thu Fri Sat".split(" ").map(d=>`<div class="w">${d}</div>`).join("")+'<div class="day x"></div>'.repeat(first);
 for(let i=1;i<=n;i++){const iso=`${scy}-${pad(scm+1)}-${pad(i)}`,dc=all.filter(x=>x.day==dow(iso)),c=dc.filter(x=>!cxOf(iso,x)).length;
  h+=`<button class="day ${dc.length?"cl":""} ${dc.length&&!c?"cx":""} ${iso==today?"td":""} ${iso==ssel?"sel":""}" data-sd="${iso}">${i}${dc.length?`<span class="cn">${c||"✕"}</span>`:""}</button>`}
 $("#scal").innerHTML=h;
 const d=dow(ssel),list=all.filter(c=>c.day==d).map(c=>eff(ssel,c)).sort((x,y)=>mins(x.s)-mins(y.s));
 let nowI=-1,nextI=-1;
 if(ssel==today){nowI=list.findIndex(c=>!cxOf(ssel,c)&&mins(c.s)<=nm&&nm<mins(c.e));nextI=list.findIndex(c=>!cxOf(ssel,c)&&mins(c.s)>nm)}
 $("#sd-t").textContent=DAYN[d]+", "+fmt(ssel)+(ssel==today?" (today)":"")+" · Lab "+lab;
 $("#sd").innerHTML=(spOf(ssel)?`<div class="notice" style="margin:4px 0 6px"><b>No classes${spOf(ssel).note?":":""}</b> ${esc(spOf(ssel).note)}</div>`:"")+(list.length?list.map((c,i)=>clsHTML(c,i==nowI?"now":i==nextI?"next":"",cxOf(ssel,c))).join(""):'<p class="mut" style="margin-top:12px">No classes. Enjoy the free day!</p>');
 const sps=D.sp.filter(x=>x.e>=today&&(x.lab=="all"||x.lab==lab)).slice(0,5);
 $("#cxn").innerHTML=sps.length?`<div class="notice"><b>No classes:</b> ${sps.map(x=>`${fmt(x.s)}${x.e!=x.s?" – "+fmt(x.e):""}${x.note?" ("+esc(x.note)+")":""}`).join(" · ")}</div>`:"";
 const up=D.cx.filter(x=>x.d>=today&&(x.lab=="all"||x.lab==lab)).slice(0,5);
 $("#cxn").innerHTML+=up.length?`<div class="notice"><b>No class:</b> ${up.map(x=>`${esc(x.h)} on ${new Date(x.d+"T00:00").toLocaleDateString("en-PH",{weekday:"short",month:"short",day:"numeric"})}${x.note?" ("+esc(x.note)+")":""}`).join(" · ")}</div>`:"";
 const upc=D.ch.filter(x=>x.d>=today&&(x.lab=="all"||x.lab==lab)).slice(0,5);
 $("#cxn").innerHTML+=upc.length?`<div class="notice b"><b>Time change:</b> ${upc.map(x=>`${esc(x.h)} on ${new Date(x.d+"T00:00").toLocaleDateString("en-PH",{weekday:"short",month:"short",day:"numeric"})} → ${fmtT(x.s)} – ${fmtT(x.e)}${x.r?" · "+esc(x.r):""}`).join(" · ")}</div>`:"";
 const td=now.getDay();
 $("#sw").innerHTML=DAYS.map(d=>{const l=all.filter(c=>c.day==d);return `<div class="wk ${d==td?"tdy":""}"><b>${DAYN[d].slice(0,3)}</b><div>${l.length?l.map(c=>`<p><span class="mut">${fmtT(c.s)}</span> ${esc(c.h)}${c.lab!="all"?` <span class="tag g">Lab ${c.lab}</span>`:""}</p>`).join(""):'<p class="mut">No classes</p>'}</div></div>`}).join("");
}
document.addEventListener("click",e=>{
 const l=e.target.closest("[data-lab]");if(l){lab=l.dataset.lab;try{localStorage.setItem("bsit-lab",lab)}catch(_){}drawSched();stats();return}
 const d=e.target.closest("[data-sd]");if(d){ssel=d.dataset.sd;drawSched()}});
$("#sprev").onclick=()=>{scm--;if(scm<0){scm=11;scy--}drawSched()};
$("#snext").onclick=()=>{scm++;if(scm>11){scm=0;scy++}drawSched()};
setInterval(()=>{stats();if($("#schedule").classList.contains("on"))drawSched()},60000);
function route(){const id=(location.hash||"#home").slice(1),ok=["home","announcements","schedule","calendar","reminders"].includes(id)?id:"home";
 document.querySelectorAll(".view").forEach(v=>v.classList.toggle("on",v.id==ok));
 document.querySelectorAll(".nl").forEach(a=>{if(a.getAttribute("href")=="#"+ok)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
 window.scrollTo(0,0)}
addEventListener("hashchange",route);
const q=$("#quiz"),okUrl=u=>/^https?:\/\//i.test(u||"");
function setQuiz(){if(okUrl(D.quiz)){q.href=D.quiz;q.target="_blank";q.rel="noopener"}else{q.href="#home";q.removeAttribute("target");q.removeAttribute("rel")}}
q.addEventListener("click",e=>{if(!okUrl(D.quiz)){e.preventDefault();const t=$("#toast");t.textContent="Mock quiz link coming soon!";t.style.display="block";setTimeout(()=>t.style.display="none",2200)}});
// ---- load live content from Supabase (falls back to js/data.js if not connected) ----
async function loadRemote(){
 if(!window.SB)return;
 try{
  const [a,e,r,s,cx,ch,sp]=await Promise.all([
   SB.from("announcements").select("*").order("posted_on",{ascending:false}).order("id",{ascending:false}),
   SB.from("events").select("*").order("event_date").order("event_time",{nullsFirst:false}),
   SB.from("reminders").select("*").order("grp").order("id"),
   SB.from("settings").select("*").eq("key","quiz_url"),
   SB.from("class_cancellations").select("*").order("cancel_date"),
   SB.from("class_changes").select("*").order("change_date"),
   SB.from("class_suspensions").select("*").order("start_date")]);
  for(const x of [a,e,r,s])if(x.error)throw x.error;
  D.ann=a.data.map(x=>({t:x.type,d:x.posted_on,h:x.title,b:x.body,by:x.posted_by,tm:x.posted_time}));
  D.ev=e.data.map(x=>({d:x.event_date,k:x.kind,h:x.title,tm:x.event_time}));
  D.rem=r.data.map(x=>({g:x.grp,id:String(x.id),h:x.title,s:x.note,tm:x.due_time,pa:x.created_at}));
  // cancellations are optional: if the SQL hasn't been run yet, the rest of the site still works
  D.cx=cx.error?[]:cx.data.map(x=>({d:x.cancel_date,h:x.subject,lab:x.lab,note:x.note}));
  D.ch=ch.error?[]:ch.data.map(x=>({d:x.change_date,h:x.subject,lab:x.lab,s:String(x.new_start).slice(0,5),e:String(x.new_end).slice(0,5),r:x.new_room,note:x.note}));
  D.sp=sp.error?[]:sp.data.map(x=>({s:x.start_date,e:x.end_date,lab:x.lab,note:x.note}));
  D.quiz=(s.data[0]&&s.data[0].value)||QUIZ_URL;
  try{localStorage.setItem("bsit-cache",JSON.stringify({ann:D.ann,ev:D.ev,rem:D.rem,cx:D.cx,ch:D.ch,sp:D.sp,quiz:D.quiz}))}catch(_){}
  render();drawCal();drawSched();setQuiz();
 }catch(err){console.warn("Could not load live content:",err)}
}
// ---- pixel mascot: types with both hands ----
(function(){
 const ns="http://www.w3.org/2000/svg",kg=$("#keys");
 for(let r=0;r<2;r++)for(let k=0;k<9;k++){const e=document.createElementNS(ns,"rect");e.setAttribute("x",218+k*5);e.setAttribute("y",93+r*5);e.setAttribute("width",3);e.setAttribute("height",3);e.setAttribute("fill",(r+k)%7==3?"#5AA0EB":"#46597D");kg.appendChild(e)}
 const keys=[...kg.children],T=["Welcome BSIT 1-2 Peeps","This is our section hub"],l=[$("#l1"),$("#l2")],cur=$("#cur"),hl=$("#hl"),hr=$("#hr");
 if(matchMedia("(prefers-reduced-motion:reduce)").matches){l[0].textContent=T[0];l[1].textContent=T[1];cur.remove();return}
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const place=i=>{cur.setAttribute("y",i?55:41);cur.setAttribute("x",34+(l[i].getComputedTextLength()||0)+1)};
 let n=0,last=null;
 function press(){const side=n++%2;(side?hr:hl).setAttribute("transform","translate(0,-3)");(side?hl:hr).setAttribute("transform","");
  const k=keys[Math.floor(Math.random()*keys.length)];if(last)last.setAttribute("fill",last.dataset.f);k.dataset.f=k.getAttribute("fill");k.setAttribute("fill","#FFC933");last=k;
  setTimeout(()=>{hl.setAttribute("transform","");hr.setAttribute("transform","")},70)}
 setInterval(()=>{const t=Date.now();cur.style.opacity=(t/450|0)%2?0:1;const b=t%4200<130;for(const id of["e1","e2"])$("#"+id).setAttribute("height",b?1:5);
  $("#clouds").setAttribute("transform",`translate(${(t/400|0)%340-30},0)`);$("#mas").setAttribute("transform",`translate(0,${(t/900|0)%2})`)},100);
 (async function loop(){await window.introDone;for(;;){l[0].textContent=l[1].textContent="";place(0);await wait(700);
  for(let i=0;i<2;i++){for(const ch of T[i]){l[i].textContent+=ch;place(i);press();await wait(85+Math.random()*60)}await wait(i?2800:500);if(!i)place(1)}}})();
})();
render();drawCal();drawSched();route();setQuiz();loadRemote();
