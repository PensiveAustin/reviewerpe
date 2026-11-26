/* Intro splash: the BSIT 1-2 brand starts in the middle of the screen with a pixel loading bar,
   then flies to the top-left header spot. Skipped when the user prefers reduced motion. */
(function(){
 var root=document.documentElement,sp=document.getElementById("splash"),hb=document.querySelector(".top .brand");
 if(!sp||!hb||!root.classList.contains("intro")){window.introDone=Promise.resolve();return}
 var done,over=false;window.introDone=new Promise(function(r){done=r});
 var clone=null;
 function land(){ // swap the flying copy for the real header brand (same pixels)
  root.classList.add("landed");if(clone){clone.remove();clone=null}done()}
 function finish(){if(over)return;over=true;land();root.classList.remove("intro","landed");sp.remove()}
 try{
  clone=hb.cloneNode(true);clone.removeAttribute("href");clone.removeAttribute("aria-label");
  clone.setAttribute("aria-hidden","true");clone.className="brand sp-brand";
  var bar=document.createElement("div");bar.className="sp-bar";bar.innerHTML="<i></i>";
  var ld=document.createElement("div");ld.className="sp-load";ld.textContent="Loading...";
  sp.appendChild(bar);sp.appendChild(ld);document.body.appendChild(clone);
  var wait=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
  var fontsOk=document.fonts&&document.fonts.load?document.fonts.load(getComputedStyle(hb).font,hb.textContent).catch(function(){}):0;
  Promise.race([fontsOk,wait(1500)]).then(function(){
   var vw=innerWidth,vh=innerHeight,hr=hb.getBoundingClientRect(),w=clone.offsetWidth,h=clone.offsetHeight;
   var sc=Math.max(1.15,Math.min(Math.min(vw*.84,560)/w,2.4));
   var L=(vw-w*sc)/2,T=vh/2-h*sc/2-24,BT=vh/2+h*sc/2+14;
   clone.style.left=hr.left+"px";clone.style.top=hr.top+"px";
   clone.style.opacity="0";clone.style.transform="translate("+(L-hr.left)+"px,"+(T-hr.top)+"px) scale("+sc*.8+")";
   bar.style.top=BT+"px";ld.style.top=(BT+36)+"px";bar.style.opacity=ld.style.opacity="0";
   void clone.offsetWidth;
   // 1) pop in at the centre + fill the loading bar
   clone.style.transition="transform .55s cubic-bezier(.2,.8,.2,1),opacity .4s ease";
   requestAnimationFrame(function(){
    clone.style.opacity="1";clone.style.transform="translate("+(L-hr.left)+"px,"+(T-hr.top)+"px) scale("+sc+")";
    bar.style.opacity="1";ld.style.opacity=".85";bar.firstChild.style.width="100%";
   });
   // 2) once loaded (min 1.6s, max 4s) fly to the top-left
   var loaded=new Promise(function(r){if(document.readyState==="complete")r();else addEventListener("load",r)});
   Promise.all([wait(1600),Promise.race([loaded,wait(4000)])]).then(function(){
    bar.style.opacity=ld.style.opacity="0";
    var fr=hb.getBoundingClientRect(); // re-measure: header may have shifted while fonts loaded
    clone.style.transition="transform .8s cubic-bezier(.65,0,.25,1)";clone.style.transform="translate("+(fr.left-hr.left)+"px,"+(fr.top-hr.top)+"px)";
    setTimeout(function(){sp.classList.add("out")},300);
    setTimeout(land,830);
    setTimeout(finish,1300);
   });
  });
 }catch(e){finish()}
 setTimeout(finish,7000); // safety net
})();
