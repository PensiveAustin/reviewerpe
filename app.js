const $=s=>document.querySelector(s),J=a=>a.join(''),L="ABCDEFGH",R=["I","II","III","IV"];
const Q=QUIZZES.find(x=>x.id===new URLSearchParams(location.search).get('q'))||QUIZZES[0];
const norm=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const shuf=a=>{a=[...a];for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
let NAME=(localStorage.getItem("pe_name")||"").trim();
document.title=Q.title+" | PE Quiz Hub";$("#title").textContent=Q.title;$("#sub").textContent=Q.sub;
let done=false,ans=0;
function render(){done=false;$("#result").hidden=true;$("#submit").hidden=false;$("#subhint").hidden=false;
$("#quiz").innerHTML=J(Q.parts.map((p,pi)=>{p.order=shuf(p.items.map((_,i)=>i));
let b=`<section class="part"><h2>Part ${R[pi]}. ${p.name}</h2><p class="ins">${p.ins}</p>`;
if(p.t=="mcq")b+=J(p.items.map((it,i)=>`<div class="q" data-p="${pi}" data-i="${i}"><p class="qt"><b>${i+1}.</b> ${it.q}</p>${J(it.o.map((o,k)=>`<label class="opt"><input type="radio" name="m${pi}_${i}" value="${k}"><span class="l">${L[k]}</span>${o}</label>`))}<div class="fb"></div></div>`));
if(p.t=="match")b+=`<div class="mt"><div>${J(p.items.map((it,i)=>`<div class="q row" data-p="${pi}" data-i="${i}"><span class="qt"><b>${i+1}.</b> ${it[0]}</span><select><option value="">Choose</option>${J(p.order.map((_,k)=>`<option value="${k}">${L[k]}</option>`))}</select><div class="fb"></div></div>`))}</div><ol class="defs">${J(p.order.map((o,k)=>`<li><span class="l">${L[k]}</span>${p.items[o][1]}</li>`))}</ol></div>`;
if(p.t=="id")b+=J(p.items.map((it,i)=>`<div class="q" data-p="${pi}" data-i="${i}"><p class="qt"><b>${i+1}.</b> ${it.q}</p><input class="txt" type="text" autocomplete="off" placeholder="Your answer"><div class="fb"></div></div>`));
if(p.t=="enum")b+=J(p.items.map((it,i)=>`<div class="q" data-p="${pi}" data-i="${i}"><p class="qt"><b>${i+1}.</b> ${it.q}</p><div class="en">${J(it.a.map((_,k)=>`<input class="txt" type="text" autocomplete="off" placeholder="${k+1}">`))}</div><div class="fb"></div></div>`));
return b+"</section>"}));progress()}
function progress(){let n=0;document.querySelectorAll(".q").forEach(q=>{const p=Q.parts[q.dataset.p];
const f=p.t=="mcq"?q.querySelector(":checked"):[...q.querySelectorAll("input.txt,select")].some(e=>e.value.trim());if(f)n++});
ans=n;const t=document.querySelectorAll(".q").length;$("#prog").textContent=n+" of "+t+" answered";$("#fill").style.width=n/t*100+"%"}
document.addEventListener("input",()=>!done&&progress());
function grade(){done=true;let s=0,t=0;
document.querySelectorAll(".q").forEach(q=>{const p=Q.parts[q.dataset.p],it=p.items[q.dataset.i],fb=q.querySelector(".fb");let ok=false,show="";
if(p.t=="mcq"){t++;const c=q.querySelector(":checked");ok=c&&+c.value==it.a;show="Answer: "+it.o[it.a];
q.querySelectorAll(".opt").forEach((l,k)=>{if(k==it.a)l.classList.add("right");else if(l.querySelector(":checked"))l.classList.add("wrong")})}
if(p.t=="match"){t++;const v=q.querySelector("select").value;ok=v!==""&&p.order[+v]==+q.dataset.i;show="Answer: "+L[p.order.indexOf(+q.dataset.i)]}
if(p.t=="id"){t++;const v=norm(q.querySelector("input").value);ok=it.a.includes(v);show="Answer: "+it.a[0]}
if(p.t=="enum"){const used=new Set(),ins=[...q.querySelectorAll("input")];let c=0;t+=it.a.length;
ins.forEach(i=>{const v=norm(i.value),g=it.a.findIndex((x,k)=>!used.has(k)&&x.includes(v));if(v&&g>=0){used.add(g);c++;i.classList.add("right")}else i.classList.add("wrong")});
s+=c;ok=c==it.a.length;const miss=it.a.filter((_,k)=>!used.has(k)).map(x=>x[0]);show=ok?"":"Missing: "+miss.join(", ");
fb.textContent=show;q.classList.add(ok?"ok":"bad");return}
if(ok)s++;q.classList.add(ok?"ok":"bad");fb.textContent=ok?"":show;
q.querySelectorAll("input,select").forEach(e=>e.disabled=true)});
document.querySelectorAll("input,select").forEach(e=>e.disabled=true);
const pc=Math.round(s/t*100);$("#result").hidden=false;$("#submit").hidden=true;$("#subhint").hidden=true;
$("#result").innerHTML=`<p class="big">${s} / ${t}</p><p>${esc(NAME)}, ${pc}% &middot; ${pc>=90?"Excellent. You are ready.":pc>=75?"Good work. Review the items marked red.":pc>=50?"Getting there. Re-read the reviewer, then retake.":"Keep studying. Read the reviewer and try again."}</p><p id="save" class="sv">Submitting to the leaderboard...</p><div class="actions"><button class="btn" onclick="render();scrollTo(0,0)">Retake quiz</button><a class="btn ghost" href="index.html">Home</a><a class="btn ghost" href="index.html#board">Leaderboard</a></div>`;
db.add(Q.id,{name:NAME,score:s,total:t}).then(e=>{const el=$("#save");el.textContent=e===""?"Submitted. Your score is on the leaderboard.":"Not saved. "+db.hint(e);if(e!=="")el.style.color="#ffd966"});
$("#result").scrollIntoView({behavior:"smooth"});scrollTo({top:0,behavior:"smooth"})}
$("#submit").onclick=grade;
const nm=$("#name");nm.value=NAME;nm.focus();
$("#gf").onsubmit=e=>{e.preventDefault();NAME=nm.value.trim();if(!NAME)return;localStorage.setItem("pe_name",NAME);$("#gate").hidden=true;$("#qbody").hidden=false;$("#sub").textContent=Q.sub+" Taking as: "+NAME;render();scrollTo(0,0)};

document.querySelector(".back").onclick=e=>{if(!done&&ans>0&&!confirm("Leave this quiz? Your answers will be lost."))e.preventDefault()};
