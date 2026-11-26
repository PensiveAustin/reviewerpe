/* Splash transitions: subject cards (colored) and Quiz Hub links (theme color). */
(function(){
var KEY='splash',reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,busy=false;

/* ---------- arrival: matches the splash end state, then eases out ---------- */
var d;try{d=JSON.parse(sessionStorage.getItem(KEY)||'null');sessionStorage.removeItem(KEY)}catch(_){}
/* arriving from the class hub's Mock Quiz button: the hub put the splash layout in the URL hash */
if(!d){try{var m=/^#splash=(.+)$/.exec(location.hash);
 if(m){var h=JSON.parse(decodeURIComponent(m[1])),ok=['fs','l','tp','bt','lt'].every(function(k){return isFinite(h[k])});
  if(ok)d={bg:'var(--bg)',fg:'var(--ink)',t:'Quiz Hub',fs:+h.fs,l:+h.l,tp:+h.tp,bt:+h.bt,lt:+h.lt};
  history.replaceState(null,'',location.pathname+location.search)}}catch(_){}}
if(d){
 var o=document.createElement('div');o.className='arrive';o.style.background=d.bg;o.style.color=d.fg;
 o.innerHTML='<h2 class="atitle"></h2><div class="abar"><i></i></div><div class="aload">Loading...</div>';
 var t=o.firstChild;t.textContent=d.t;
 t.style.fontSize=d.fs+'px';t.style.left=d.l+'px';t.style.top=d.tp+'px';
 o.children[1].style.top=d.bt+'px';o.children[2].style.top=d.lt+'px';
 document.documentElement.appendChild(o);
 var ready=false,timer=false;
 var out=function(){if(ready&&timer){o.classList.add('out');setTimeout(function(){o.remove()},900)}};
 setTimeout(function(){timer=true;out()},120);
 addEventListener('load',function(){ready=true;out()});
 setTimeout(function(){ready=timer=true;out()},4000);
}

/* ---------- departure ---------- */
function go(a,mode){
 if(busy)return;busy=true;
 var vw=innerWidth,vh=innerHeight,r=a.getBoundingClientRect(),bg,fg,title,rad,ghost=null,hr=null;
 if(mode==='card'){
  var cs=getComputedStyle(a),h=a.querySelector('h2');
  bg=cs.backgroundColor;fg=cs.color;title=h.textContent;rad=cs.borderRadius;hr=h.getBoundingClientRect();
  ghost=a.cloneNode(true);ghost.className=a.className+' ghost';ghost.removeAttribute('href');
  ghost.style.cssText='left:'+r.left+'px;top:'+r.top+'px;width:'+r.width+'px;height:'+r.height+'px;min-height:0;grid-column:auto';
 }else{
  var bs=getComputedStyle(document.body);
  bg=bs.backgroundColor;fg=bs.color;title='Quiz Hub';rad='999px';
 }
 var ov=document.createElement('div');ov.className='splash';
 ov.style.cssText='background:'+bg+';color:'+fg+';--t:'+r.top+'px;--l:'+r.left+'px;--r2:'+(vw-r.right)+'px;--b:'+(vh-r.bottom)+'px;--r:'+rad;
 if(ghost)ov.appendChild(ghost);
 var t=document.createElement('h2');t.className='stitle';t.textContent=title;
 if(hr){t.style.left=hr.left+'px';t.style.top=hr.top+'px'}
 ov.appendChild(t);
 var bar=document.createElement('div');bar.className='sbar';bar.innerHTML='<i></i>';
 var ld=document.createElement('div');ld.className='sload';ld.textContent='Loading...';
 ov.appendChild(bar);ov.appendChild(ld);
 document.body.appendChild(ov);
 var w=t.offsetWidth,th=t.offsetHeight,sc=Math.min(Math.min(vw*.84,560)/w,2.4);if(sc<1.15)sc=1.15;
 var fs=parseFloat(getComputedStyle(t).fontSize)*sc,L=(vw-w*sc)/2,T=vh/2-th*sc/2-24,BT=vh/2+th*sc/2+10,LT=vh/2+th*sc/2+44;
 try{sessionStorage.setItem(KEY,JSON.stringify({bg:bg,fg:fg,t:title,fs:fs,l:L,tp:T,bt:BT,lt:LT}))}catch(_){}
 bar.style.top=BT+'px';ld.style.top=LT+'px';
 var tr;
 if(hr){tr='translate('+(L-hr.left)+'px,'+(T-hr.top)+'px) scale('+sc+')'}
 else{t.style.left=L+'px';t.style.top=T+'px';t.style.opacity='0';t.style.transform='scale('+sc*.6+')';tr='scale('+sc+')'}
 void ov.offsetWidth;
 requestAnimationFrame(function(){ov.classList.add('go');t.style.transform=tr;t.style.opacity='1'});
 setTimeout(function(){location.href=a.href},reduce?50:1800);
}
document.addEventListener('click',function(e){
 if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button)return;
 var a=e.target.closest&&e.target.closest('a');if(!a)return;
 var href=a.getAttribute('href')||'',mode=null;
 if(a.classList.contains('sj'))mode='card';
 else if(/^index\.html(#.*)?$/.test(href)&&!/\/(index\.html)?$/.test(location.pathname))mode='hub';
 if(!mode)return;
 e.preventDefault();go(a,mode);
});
addEventListener('pageshow',function(e){if(e.persisted){busy=false;var s=document.querySelector('.splash');if(s)s.remove()}});
})();
