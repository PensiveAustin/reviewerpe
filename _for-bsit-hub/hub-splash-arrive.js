/* hub-splash-arrive.js  --  put this in the BSIT HUB project (not the quiz hub).
   Add it as the FIRST script in <head> of the hub's index page:  <script src="hub-splash-arrive.js"></script>
   When someone presses "BSIT Hub" on the Quiz Hub, the Quiz Hub plays its splash and sends the exact layout in
   the URL hash. This draws the same splash on arrival, then eases it out, so the two sites feel like one page. */
(function(){
var h;try{var m=/^#splash=(.+)$/.exec(location.hash);if(!m)return;
 h=JSON.parse(decodeURIComponent(m[1]));
 if(!['fs','l','tp','bt','lt'].every(function(k){return isFinite(h[k])}))return;
 history.replaceState(null,'',location.pathname+location.search)}catch(_){return}
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var st=document.createElement('style');
st.textContent='.qh-arrive{position:fixed;inset:0;z-index:2147483647;pointer-events:all;transition:opacity .6s ease}'
+'.qh-arrive .t{position:fixed;margin:0;white-space:nowrap;font-family:Silkscreen,monospace;font-weight:700;line-height:1.1;text-transform:uppercase;transition:opacity .4s ease}'
+'.qh-arrive .b{position:fixed;left:50%;width:min(70vw,360px);height:20px;margin-left:calc(min(70vw,360px)/-2);border:2px solid currentColor;border-radius:6px;padding:2px;transition:opacity .3s ease}'
+'.qh-arrive .b i{display:block;height:100%;width:100%;background:currentColor;border-radius:2px}'
+'.qh-arrive .a{position:fixed;left:0;right:0;text-align:center;font:700 13px Silkscreen,monospace;letter-spacing:.12em;text-transform:uppercase;opacity:.85;transition:opacity .3s ease}'
+'.qh-arrive.out{opacity:0}.qh-arrive.out .t,.qh-arrive.out .b,.qh-arrive.out .a{opacity:0}'
+(reduce?'.qh-arrive,.qh-arrive *{transition-duration:.01s!important}':'');
document.documentElement.appendChild(st);
var o=document.createElement('div');o.className='qh-arrive';
o.style.background=h.bg||'#0A1020';o.style.color=h.fg||'#EEF2FF';
o.innerHTML='<h2 class="t"></h2><div class="b"><i></i></div><div class="a">Loading...</div>';
var t=o.firstChild;t.textContent=h.t||'BSIT Hub';t.style.fontSize=(+h.fs)+'px';t.style.left=(+h.l)+'px';t.style.top=(+h.tp)+'px';
o.children[1].style.top=(+h.bt)+'px';o.children[2].style.top=(+h.lt)+'px';
document.documentElement.appendChild(o);
var ready=false,timer=false;
function out(){if(ready&&timer){o.classList.add('out');setTimeout(function(){o.remove();st.remove()},900)}}
setTimeout(function(){timer=true;out()},120);
addEventListener('load',function(){ready=true;out()});
setTimeout(function(){ready=timer=true;out()},4000);
})();
