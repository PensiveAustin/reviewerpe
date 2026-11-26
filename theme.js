/* Light / dark toggle. Both sites already follow the device theme automatically; this adds a button to override it.
   The choice is saved on this device. Until someone presses the button, the site keeps following the device. */
(function(){
var KEY='theme',root=document.documentElement,mq=matchMedia('(prefers-color-scheme:dark)');
function stored(){try{var t=localStorage.getItem(KEY);return t==='light'||t==='dark'?t:null}catch(e){return null}}
var s=stored();if(s)root.setAttribute('data-theme',s);
function cur(){return root.getAttribute('data-theme')||(mq.matches?'dark':'light')}
var SUN='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
var MOON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
function paint(){var d=cur()==='dark',l=d?'Switch to light mode':'Switch to dark mode';
 document.querySelectorAll('.tg').forEach(function(b){b.innerHTML=d?SUN:MOON;b.setAttribute('aria-label',l);b.title=l})}
function mount(){var c=document.querySelector('.top-in,.barin');if(!c||c.querySelector('.tg'))return;
 var b=document.createElement('button');b.type='button';b.className='tg';c.appendChild(b);paint()}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.tg');if(!b)return;
 var n=cur()==='dark'?'light':'dark';root.setAttribute('data-theme',n);try{localStorage.setItem(KEY,n)}catch(_){}paint()});
if(mq.addEventListener)mq.addEventListener('change',function(){if(!stored())paint()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
