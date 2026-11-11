// ===== Shared header & footer for every page =====
// To add a page: add it to NAV and put <body data-page="key"> in the page.
const NAV={
 main:[["index.html","الرئيسية","home"]],
 services:[["services.html","التحاليل","services"],["offers.html","العروض","offers"],["prepare.html","التحضير للتحليل","prepare"],["faq.html","الأسئلة الشائعة","faq"],["contact.html","الروشتة","rx"]],
 after:[["branches.html","الفروع","branches"],["home-collection.html","الزيارة المنزلية","home-collection"],["contact.html","اتصل بنا","contact","call"],["about.html","عن برفكت","about"]]
};
const PAGE=document.body.dataset.page||"";
const onLangLate=[];
// Old one-page links (index.html#faq) go to the new page
const OLD={"#about":"about.html","#services":"services.html","#home-collection":"home-collection.html","#offers":"offers.html","#branches":"branches.html","#prepare":"prepare.html","#faq":"faq.html","#contact":"contact.html"};
if(PAGE==="home"&&OLD[location.hash])location.replace(OLD[location.hash]);
const ICONS={call:'<svg class="nic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>'};
const navA=([h,t,p,ic])=>`<a class="nb${ic?" nb-ic":""}${p===PAGE?" active":""}" href="${h}"${p===PAGE?' aria-current="page"':""}>${ic?ICONS[ic]:""}<span>${t}</span></a>`;
const svcActive=NAV.services.some(x=>x[2]===PAGE);
document.getElementById("site-header").outerHTML=`<header>
<div class="wrap bar">
<a class="brand" href="index.html" aria-label="Perfect Lab – معامل برفكت لاب"><img class="logo" src="assets/logo.png" alt="" width="45" height="56">
<span class="bname"><span class="bar-ar" lang="ar">معامل برفكت لاب</span><span class="bar-en" lang="en">PERFECT LAB</span></span></a>
<div class="tools">
<a class="nb login" id="loginBtn" href="login.html">تسجيل الدخول</a>
<button class="ib" id="search" type="button" aria-label="بحث" title="بحث" aria-haspopup="dialog"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button>
<button class="ib" id="cart" type="button" aria-label="السلة" title="السلة"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2.8l2.4 11.2a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.8l1.5-7.4H6.2"/></svg></button>
<button class="ib" id="bell" type="button" aria-label="الإشعارات" title="الإشعارات"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9a6 6 0 0 1 12 0c0 5.5 2 6.8 2 6.8H4S6 14.5 6 9z"/><path d="M10 19.5a2.2 2.2 0 0 0 4 0"/></svg></button>
<button class="lang" id="lang" type="button" aria-label="Change language / تغيير اللغة">عربي</button>
<button class="menu" id="menu" aria-label="القائمة" aria-expanded="false">☰</button>
</div>
</div>
<div class="navbar"><div class="wrap">
<nav id="nav">
${NAV.main.map(navA).join("")}
<div class="dd" id="dd">
<a class="nb${svcActive?" active":""}" href="services.html">الخدمات</a>
<button class="nb dd-t" id="ddbtn" type="button" aria-expanded="false" aria-controls="ddm" aria-label="عرض قائمة الخدمات"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
<div class="dd-m" id="ddm">${NAV.services.map(([h,t,p])=>`<a href="${h}"${p===PAGE?' class="cur" aria-current="page"':""}>${t}</a>`).join("")}</div></div>
${NAV.after.map(navA).join("")}
</nav>
</div></div>
</header>`;
document.body.insertAdjacentHTML("beforeend",`<div class="srch" id="srch" role="dialog" aria-modal="true" aria-label="بحث" hidden>
<div class="srch-box"><div class="srch-row"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
<input id="srch-q" type="text" autocomplete="off" placeholder="ابحث عن تحليل أو عرض أو فرع…" aria-label="ابحث في الموقع">
<button type="button" class="srch-x" id="srch-x" aria-label="إغلاق">✕</button></div>
<ul class="srch-res" id="srch-res"></ul><p class="srch-empty" id="srch-empty" hidden>مفيش نتايج. جرّب كلمة تانية أو كلّمنا على واتساب.</p></div></div>`);
document.getElementById("site-footer").outerHTML=`<footer><div class="wrap">
<div class="fg">
<div><h3>🔬 برفكت لاب</h3><p>مختبر تحاليل طبية تحت إدارة د. أحمد فكري.</p></div>
<div><h3>روابط سريعة</h3><a href="about.html">من نحن</a><a href="services.html">خدماتنا</a><a href="offers.html">العروض</a><a href="branches.html">فروعنا</a></div>
<div><h3>تواصل</h3><a href="contact.html">بيانات الاتصال</a><a href="faq.html">الأسئلة الشائعة</a><a href="prepare.html">التحضير للتحليل</a></div>
<div><h3>سياسة الخصوصية</h3><p>تُستخدم البيانات المدخلة للتواصل بخصوص الطلب فقط. (أضف رابط السياسة المعتمدة هنا.)</p></div>
</div>
<small>© <span id="yr"></span> برفكت لاب للتحاليل الطبية. جميع الحقوق محفوظة.</small>
</div></footer>`;

const setHH=()=>document.documentElement.style.setProperty("--hh",document.querySelector("header").offsetHeight+"px");
setHH();addEventListener("resize",setHH);
// Branches page: the map fills exactly the space left on screen under the page title
const fitMap=()=>{const m=document.querySelector(".map-top .mapfull");if(!m)return;
 const top=m.getBoundingClientRect().top+scrollY;m.style.height=Math.max(340,innerHeight-top-6)+"px"};
addEventListener("load",fitMap);addEventListener("resize",fitMap);setTimeout(fitMap);

// ===== Fill page content (each part runs only if it exists on the page) =====
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fill=(q,html)=>{const el=$(q);if(el)el.innerHTML=html};
const card=(i,t,p)=>`<div class="card"><span class="ic">${i}</span><h3>${esc(t)}</h3>${p?`<p>${p}</p>`:""}</div>`;
const C=CONFIG,tbd="سيُضاف بعد التحقق";
fill("#svc",SV.map(s=>card(s[0],s[1],s[2])).join(""));
fill("#why",WH.map(s=>card(s[0],s[1])).join(""));
fill("#off",C.offers.map(o=>{const wa=C.whatsapp?`https://wa.me/${C.whatsapp}?text=${encodeURIComponent("عايز أحجز: "+o.n)}`:"contact.html";
 return `<article class="ocard">${o.img?`<a class="oimg" href="assets/offers/${o.img}.jpg" target="_blank" rel="noopener" aria-label="${esc(o.n)}"><img src="assets/offers/${o.img}.jpg" alt="${esc(o.n)}" loading="lazy"></a>`:""}
 <div class="obody"><h3>${esc(o.n)}</h3>
 <p class="oprice">${o.price?`<b>${esc(o.price)}</b> <span>جنيه</span>`:`<b class="odisc">${esc(o.discount||"")}</b>`}${o.old?` <s>${esc(o.old)} <span>جنيه</span></s>`:""}</p>
 ${o.tests&&o.tests.length?`<details><summary>التحاليل المتضمنة</summary><ul>${o.tests.map(t=>`<li>${esc(t)}</li>`).join("")}</ul></details>`:""}
 <a class="btn wa obtn" href="${wa}"${C.whatsapp?' target="_blank" rel="noopener"':""}>احجز على واتساب</a></div></article>`}).join(""));
fill("#br",C.branches.map(b=>`<div class="card"><span class="ic">📍</span><h3>فرع ${esc(b.n)}</h3><p>${b.address?esc(b.address):"العنوان يُضاف بعد التحقق."}</p>${b.phone?`<p><a href="tel:${esc(b.phone)}">${esc(b.phone)}</a></p>`:""}${b.hours?`<p>${esc(b.hours)}</p>`:""}${b.map?`<p><a href="${esc(b.map)}" target="_blank" rel="noopener"><b>الاتجاهات على الخريطة</b></a></p>`:""}</div>`).join(""));
if($("#bsel"))$("#bsel").innerHTML+=C.branches.map(b=>`<option value="فرع ${esc(b.n)}">فرع ${esc(b.n)}</option>`).join("");
fill("#faqs",C.faq.map(f=>`<details><summary>${esc(f[0])}</summary><p>${esc(f[1])}</p></details>`).join(""));
fill("#c-phone",C.phone?`<a href="tel:${esc(C.phone.replace(/^0/,"+20"))}" dir="ltr">${esc(C.phone)}</a>`:tbd);
fill("#c-wa",C.whatsapp?`<a href="https://wa.me/${esc(C.whatsapp)}" target="_blank" rel="noopener" dir="ltr">${esc(C.whatsapp.replace(/^20/,"0"))}</a>`:tbd);
fill("#c-mail",C.email?`<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`:tbd);
if($("#c-hours"))$("#c-hours").textContent=C.hours||tbd;
fill("#c-soc",Object.keys(C.social).length?Object.entries(C.social).map(([k,v])=>`<a href="${esc(v)}" target="_blank" rel="noopener">${esc(k)}</a>`).join(" · "):tbd);
document.querySelectorAll("[data-wa]").forEach(a=>{if(C.whatsapp){a.href="https://wa.me/"+C.whatsapp;a.target="_blank";a.rel="noopener"}});
$("#yr").textContent=new Date().getFullYear();

// ===== Branches page video (shown once loaded) =====
const VLIST=typeof VIDEOS!=="undefined"?VIDEOS:[];
document.querySelectorAll("video[data-vid]").forEach(v=>{
 const box=v.closest(".vbox"),src=(VLIST.find(x=>x.key===v.dataset.vid)||{}).src||"";
 if(!src)return;
 v.addEventListener("loadedmetadata",()=>box.classList.add("ready"));
 v.addEventListener("error",()=>box.classList.remove("ready"));
 v.src=src+"?v="+(document.querySelector('script[src*="main.js"]').src.split("v=")[1]||"1");
});

const onLang=[];
// ===== Home: full-width videos that play one after another =====
const stage=$(".stage");
if(stage&&VLIST.length){
 const v=stage.querySelector(".st-v");
 const VQ="?v="+(document.querySelector('script[src*="main.js"]').src.split("v=")[1]||"1");
 let i=0,fails=0,retried=false;
 const fitH=()=>document.documentElement.style.setProperty("--hh",document.querySelector("header").offsetHeight+"px");
 fitH();addEventListener("resize",fitH);
 const go=k=>{i=k;retried=false;v.src=VLIST[i].src+VQ;v.play().catch(()=>{})};
 const next=()=>go((i+1)%VLIST.length),prev=()=>go((i-1+VLIST.length)%VLIST.length);
 v.addEventListener("loadedmetadata",()=>{fails=0});
 v.addEventListener("ended",next);
 v.addEventListener("error",()=>{ // retry once with a fresh copy, then move on quietly
  if(!retried){retried=true;v.src=VLIST[i].src+VQ+"r"+Date.now();v.play().catch(()=>{});return}
  if(++fails<VLIST.length)setTimeout(next,300)});
 // tap the video to turn sound on/off
 v.addEventListener("click",()=>{v.muted=!v.muted;if(v.paused)v.play().catch(()=>{})});
 $("#st-prev").onclick=prev;$("#st-next").onclick=next;
 const lbl=()=>{$("#st-prev").setAttribute("aria-label",T("الفيديو السابق"));$("#st-next").setAttribute("aria-label",T("الفيديو التالي"))};
 onLang.push(lbl);
 stage.tabIndex=-1;stage.addEventListener("keydown",e=>{const rtl=document.dir==="rtl";if(e.key==="ArrowRight")(rtl?prev:next)();if(e.key==="ArrowLeft")(rtl?next:prev)()});
 let sx=null;stage.addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});
 stage.addEventListener("touchend",e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)<50)return;const rtl=document.dir==="rtl";(dx<0)!==rtl?next():prev()},{passive:true});
 if("IntersectionObserver"in window)new IntersectionObserver(([e])=>{e.isIntersecting?v.play().catch(()=>{}):v.pause()}).observe(stage);
 setTimeout(()=>go(0));
}

// ===== Branches map (Leaflet + OpenStreetMap) =====
const mapEl=$("#br-map"),listEl=$("#br-list");
if(mapEl&&listEl){
 const BR=C.branches.filter(b=>b.lat&&b.lng);let map=null,marks=[];
 const isEn=()=>document.documentElement.lang==="en";
 const bName=b=>isEn()?`${b.en||b.n} Branch`:`فرع ${b.n}`;
 const bDesc=b=>b.address?(isEn()&&b.address_en?b.address_en:b.address):(isEn()?`Serves the ${b.en||b.n} area and nearby. Full address will be added once verified.`:`يخدم منطقة ${b.n} وما حولها. العنوان التفصيلي يُضاف بعد التحقق.`);
 const pop=b=>`<div class="pop"><b>${esc(bName(b))}</b><p>${esc(bDesc(b))}</p>${b.phone?`<p><a href="tel:${esc(b.phone)}">${esc(b.phone)}</a></p>`:""}${b.hours?`<p>${esc(b.hours)}</p>`:""}<p><a href="${esc(b.map||`https://www.google.com/maps/search/?api=1&query=${b.lat},${b.lng}`)}" target="_blank" rel="noopener">${isEn()?"Open in Google Maps":"افتح في خرائط جوجل"}</a></p></div>`;
 const renderList=()=>{
  listEl.innerHTML=BR.map((b,i)=>`<li><button type="button" data-i="${i}"><span class="pinmini" aria-hidden="true"></span><span><b>${esc(bName(b))}</b><small>${esc(bDesc(b))}</small></span></button></li>`).join("");
  marks.forEach((m,i)=>m.setPopupContent(pop(BR[i])));
 };
 listEl.addEventListener("click",e=>{const btn=e.target.closest("button[data-i]");if(!btn)return;const i=+btn.dataset.i;
  listEl.querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===btn));
  if(map){map.flyTo([BR[i].lat,BR[i].lng],14,{duration:.8});marks[i].openPopup();mapEl.scrollIntoView({behavior:"smooth",block:"center"})}
  else window.open(`https://www.google.com/maps/search/?api=1&query=${BR[i].lat},${BR[i].lng}`,"_blank","noopener")});
 renderList();onLang.push(renderList);
 const css=document.createElement("link");css.rel="stylesheet";css.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";document.head.appendChild(css);
 const sc=document.createElement("script");sc.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
 sc.onload=()=>{
  if(!window.L||!L.map){sc.onerror();return}
  mapEl.innerHTML="";
  map=L.map(mapEl,{scrollWheelZoom:false});
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
  const icon=L.divIcon({className:"pinwrap",html:'<span class="pin"></span>',iconSize:[30,40],iconAnchor:[15,40],popupAnchor:[0,-36]});
  marks=BR.map(b=>L.marker([b.lat,b.lng],{icon,title:b.en||b.n}).addTo(map).bindPopup(pop(b)));
  map.fitBounds(L.latLngBounds(BR.map(b=>[b.lat,b.lng])),{padding:[30,30]});
 };
 sc.onerror=()=>{mapEl.innerHTML=`<div class="mapload">${isEn()?"The map could not be loaded. Tap a branch to open it in Google Maps.":"تعذر تحميل الخريطة. اضغط على أي فرع لفتحه في خرائط جوجل."}</div>`};
 document.head.appendChild(sc);
}

// ===== Mobile menu & services dropdown =====
const nav=$("#nav"),mb=$("#menu");
mb.onclick=()=>{const o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
const dd=$("#dd"),ddb=$("#ddbtn");
const ddSet=o=>{dd.classList.toggle("open",o);ddb.setAttribute("aria-expanded",o)};
ddb.onclick=e=>{e.stopPropagation();ddSet(!dd.classList.contains("open"))};
document.addEventListener("click",e=>{if(!dd.contains(e.target))ddSet(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape")ddSet(false)});

// ===== Membership (saved on this device only) =====
let MEMBER=null;try{MEMBER=JSON.parse(localStorage.getItem("plMember")||"null")}catch(e){}
if(MEMBER&&MEMBER.name){const lb=$("#loginBtn");lb.innerHTML=`<span class="hi">أهلاً</span> <span class="mname"></span>`;lb.querySelector(".mname").textContent=MEMBER.name.split(" ")[0];lb.classList.add("member")}

// ===== Site search (tests, offers, branches, FAQ, pages) =====
{
 const box=$("#srch"),q=$("#srch-q"),res=$("#srch-res"),empty=$("#srch-empty"),opener=$("#search");
 const norm=x=>String(x).toLowerCase().replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/[ً-ْ]/g,"");
 const idx=()=>{const en=document.documentElement.lang==="en",L=x=>en&&EN[x]?EN[x]:x,out=[];
  const strip=x=>String(x).replace(/<[^>]+>/g,"").trim();
  SV.forEach(x=>{const d=strip(x[2]);out.push({t:L(x[1]),d:L(d)===d?L(x[2]):L(d),a:x[1]+" "+d,h:"services.html",ic:x[0]})});
  C.offers.forEach(o=>out.push({t:L(o.n),d:(o.price?o.price+" "+L("جنيه"):(o.discount?L(o.discount):""))+(o.tests?" · "+o.tests.map(L).join(en?", ":"، "):""),a:o.n+" "+(o.tests||[]).join(" "),h:"offers.html",ic:"🎁"}));
  C.branches.forEach(b=>out.push({t:en?(b.en||b.n)+" Branch":"فرع "+b.n,d:(en&&b.address_en)?b.address_en:(b.address||""),a:"فرع "+b.n+" "+(b.en||"")+" "+(b.address||"")+" "+(b.address_en||""),h:"branches.html",ic:"📍"}));
  C.faq.forEach(f=>out.push({t:L(f[0]),d:L(f[1]),a:f[0]+" "+f[1],h:"faq.html",ic:"❓"}));
  [["home-collection.html","الزيارة المنزلية","🏠"],["prepare.html","التحضير للتحليل","📝"],["contact.html","اتصل بنا","📞"],["about.html","عن برفكت","🔬"]].forEach(([h,t,ic])=>out.push({t:L(t),d:"",a:t,h,ic}));
  return out};
 const draw=()=>{const v=norm(q.value.trim());if(!v){res.innerHTML="";empty.hidden=true;return}
  const words=v.split(/\s+/);const hits=idx().filter(x=>{const hay=norm(x.t+" "+x.d+" "+(x.a||""));return words.every(w=>hay.includes(w))}).slice(0,12);
  res.innerHTML=hits.map(x=>`<li><a href="${x.h}"><span aria-hidden="true">${x.ic}</span><span><b>${esc(x.t)}</b>${x.d?`<small>${esc(x.d)}</small>`:""}</span></a></li>`).join("");
  empty.hidden=hits.length>0};
 const open=()=>{box.hidden=false;document.body.style.overflow="hidden";q.value="";draw();setTimeout(()=>q.focus(),30)};
 const close=()=>{box.hidden=true;document.body.style.overflow="";opener.focus()};
 opener.onclick=open;$("#srch-x").onclick=close;q.addEventListener("input",draw);
 box.addEventListener("click",e=>{if(e.target===box)close()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!box.hidden)close();if(e.key==="/"&&box.hidden&&!/input|textarea|select/i.test(document.activeElement.tagName)){e.preventDefault();open()}});
 onLangLate.push(()=>{q.placeholder=T("ابحث عن تحليل أو عرض أو فرع…");q.setAttribute("aria-label",T("ابحث في الموقع"));opener.setAttribute("aria-label",T("بحث"));opener.title=T("بحث");$("#srch-x").setAttribute("aria-label",T("إغلاق"));draw()});
}

// ===== Join / login page =====
const reg=$("#reg");
if(reg){
 const done=$("#reg-done"),showDone=m=>{reg.hidden=true;done.hidden=false;$("#reg-name").textContent=m.name.split(" ")[0]};
 if(MEMBER&&MEMBER.name)showDone(MEMBER);
 $("#reg-edit").onclick=()=>{done.hidden=true;reg.hidden=false;if(MEMBER)for(const k of["name","phone","birth","area","email"])if(reg[k]&&MEMBER[k])reg[k].value=MEMBER[k];if(MEMBER&&MEMBER.gender)[...reg.gender].forEach(r=>r.checked=r.value===MEMBER.gender);reg.name.focus()};
 $("#reg-out").onclick=()=>{try{localStorage.removeItem("plMember")}catch(e){}location.reload()};
 if(reg.area)reg.area.innerHTML+=C.branches.map(b=>`<option value="فرع ${esc(b.n)}">فرع ${esc(b.n)}</option>`).join("");
 reg.addEventListener("submit",e=>{
  e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));let ok=true;
  const set=(id,m)=>{$("#"+id).textContent=m;if(m)ok=false};
  const ph=(d.phone||"").replace(/[\s-]/g,"").replace(/^\+?20/,"0");
  set("r-name",d.name.trim().length<3?T("يرجى إدخال الاسم."):"");
  set("r-phone",/^01[0125]\d{8}$/.test(ph)?"":T("اكتب رقم موبايل مصري صحيح، مثل 01012345678."));
  set("r-gender",d.gender?"":T("يرجى اختيار الجنس."));
  set("r-ok",f.ok.checked?"":T("الموافقة مطلوبة للمتابعة."));
  if(!ok)return;
  const m={name:d.name.trim(),phone:ph,gender:d.gender,birth:d.birth||"",area:d.area||"",email:(d.email||"").trim(),offers:!!f.offers.checked,at:new Date().toISOString().slice(0,10)};
  try{localStorage.setItem("plMember",JSON.stringify(m))}catch(e){}
  const t=`عضو جديد – برفكت لاب\nالاسم: ${m.name}\nالجنس: ${m.gender}\nرقم الواتساب: ${m.phone}\nتاريخ الميلاد: ${m.birth||"-"}\nأقرب فرع: ${m.area||"-"}\nالبريد: ${m.email||"-"}\nموافق على استقبال العروض على واتساب: ${m.offers?"نعم":"لا"}`;
  if(C.whatsapp){const url="https://wa.me/"+C.whatsapp+"?text="+encodeURIComponent(t);if(!window.open(url,"_blank"))location.href=url}
  MEMBER=m;showDone(m);
 });
}

// ===== Booking form (Contact page) =====
const form=$("#f");
if(form)form.addEventListener("submit",e=>{
 e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));let ok=true;
 const set=(n,m)=>{f[n].parentElement.querySelector(".err").textContent=m;if(m)ok=false};
 set("name",d.name.trim().length<3?T("يرجى إدخال الاسم."):"");
 set("phone",/^[+\d\s-]{8,16}$/.test(d.phone.trim())?"":T("يرجى إدخال رقم هاتف صحيح."));
 set("test",d.test.trim()?"":T("يرجى تحديد التحليل أو الخدمة."));
 $("#e-gender").textContent=d.gender?"":T("يرجى اختيار الجنس.");if(!d.gender)ok=false;
 $("#e-ok").textContent=f.ok.checked?"":T("الموافقة مطلوبة للمتابعة.");if(!f.ok.checked)ok=false;
 if(!ok)return;
 const m=$("#msg");m.style.display="block";
 if(C.whatsapp){
  const t=`طلب جديد\nالاسم: ${d.name}\nالجنس: ${d.gender}\nالهاتف: ${d.phone}\nالخدمة: ${d.test}\nالفرع: ${d.branch}\nالتاريخ: ${d.date||"-"}\nملاحظات: ${d.notes||"-"}`;
  const url="https://wa.me/"+C.whatsapp+"?text="+encodeURIComponent(t);
  if(!window.open(url,"_blank"))location.href=url;
  f.reset();
  m.textContent=T("تم تجهيز طلبك في واتساب؛ أرسل الرسالة لإتمام الطلب. سيؤكد المعمل الموعد معك.");
 }else m.textContent=T("هذا نموذج تجريبي: لم يتم إرسال أي بيانات ولا يوجد حجز. أضف رقم واتساب في CONFIG أو اربط خدمة استقبال فعلية.");
});

// ===== Language: English by default, Arabic button =====
const EN={
"برفكت لاب":"Perfect Lab","🔬 برفكت لاب":"🔬 Perfect Lab",
"الرئيسية":"Home","الخدمات":"Services","عن برفكت":"About Perfect","تسجيل الدخول":"Login",
"برفكت لاب للتحاليل الطبية – دقة تثق فيها ورعاية تهمك":"Perfect Medical Laboratory – Accuracy You Can Trust, Care That Matters",
"نقدم مجموعة متكاملة من التحاليل الطبية باستخدام أحدث التقنيات المتاحة، مع الاهتمام بجودة الخدمة وسرعة إصدار النتائج، لتكون رحلتك نحو الاطمئنان على صحتك أكثر سهولة.":"We offer a complete range of medical tests using the latest available technology, with a focus on service quality and fast results, to make your journey to peace of mind about your health easier.",
"احجز تحليلك الآن":"Book your test now","اطلب سحب عينة من المنزل":"Request home sample collection",
"خدمات معملية متكاملة | اهتمام بالجودة | سهولة في التواصل":"Complete lab services | Quality focus | Easy communication",
"عن برفكت لاب":"About Perfect Lab",
"برفكت لاب للتحاليل الطبية، تحت إدارة د. أحمد فكري، يقدم خدمات متكاملة في مجال التحاليل الطبية، مع الحرص على تطبيق إجراءات الجودة، ودقة التعامل مع العينات، وتوفير تجربة مريحة للمرضى من خلال فريق متخصص وخدمة عملاء تهتم باحتياجاتهم.":"Perfect Medical Laboratory, managed by Dr. Ahmed Fikry, provides complete medical testing services, applying quality procedures, handling samples accurately, and offering patients a comfortable experience through a specialized team and attentive customer service.",
"الجودة والدقة":"Quality and accuracy","رعاية المريض":"Patient care","إجراءات معملية احترافية":"Professional lab procedures","خدمة مريحة":"Comfortable service","تواصل واضح وفي الوقت المناسب":"Clear, timely communication",
"خدماتنا الطبية":"Our Medical Services",
"فئات التحاليل وأمثلة عليها. للتأكد من توفر تحليل بعينه ومتطلبات التحضير له، تواصل معنا.":"Test categories with examples. To confirm a specific test is available and how to prepare, contact us.",
"تحاليل الدم وصورة الدم الكاملة":"Blood tests and complete blood count","CBC وتحاليل أمراض الدم الأخرى.":"CBC and other blood disorder tests.",
"تحاليل السكر":"Diabetes tests","سكر صائم، سكر بعد الأكل، السكر التراكمي HbA1c وغيرها.":"Fasting glucose, post-meal glucose, HbA1c and more.",
"تحاليل وظائف الكبد":"Liver function tests","وظائف الكبد.":"Liver function panel.",
"تحاليل وظائف الكلى":"Kidney function tests","وظائف الكلى.":"Kidney function panel.",
"تحاليل الدهون والقلب":"Lipid and heart tests","الدهون الثلاثية والكوليسترول وتحاليل مرتبطة.":"Triglycerides, cholesterol and related tests.",
"تحاليل الغدة الدرقية والهرمونات":"Thyroid and hormone tests","وظائف الغدة الدرقية والهرمونات.":"Thyroid function and hormones.",
"تحاليل الفيتامينات والمعادن":"Vitamin and mineral tests","فيتامين د، ب12، الحديد، الفيريتين وغيرها حسب التوفر.":"Vitamin D, B12, iron, ferritin and more, subject to availability.",
"تحاليل السيولة والتجلط":"Coagulation tests","PT وINR وتحاليل تجلط أخرى حسب التوفر.":"PT, INR and other coagulation tests, subject to availability.",
"تحاليل البول والبراز":"Urine and stool tests","تحليل بول وبراز وما يتصل بها.":"Urine and stool analysis and related tests.",
"التحاليل المناعية":"Immunology tests","تحاليل المناعة والسيرولوجي.":"Immunology and serology tests.",
"تحاليل الميكروبيولوجي والمزارع":"Microbiology and cultures","المزارع وتحاليل الميكروبيولوجي.":"Cultures and microbiology tests.",
"تحاليل الخصوبة والإنجاب":"Fertility tests","هرمونات الخصوبة وفحوصات أخرى حسب التوفر.":"Fertility hormones and other tests, subject to availability.",
"تحاليل الأمراض المعدية":"Infectious disease tests","فحوصات الأمراض المعدية المتاحة.":"Available infectious disease screening.",
"التحاليل المتخصصة والشاملة":"Specialized and comprehensive tests","تحاليل متخصصة وباقات شاملة وفحوصات أخرى متاحة.":"Specialized tests, comprehensive packages and other available checks.",
"الفئات والأمثلة أعلاه لا تعني توفر كل تحليل بعينه؛ يُرجى التواصل لتأكيد التوفر وتعليمات التحضير.":"The categories and examples above do not mean every specific test is available; please contact us to confirm availability and preparation instructions.",
"عرض جميع التحاليل أو الاستفسار عن تحليل معين":"View all tests or ask about a specific test",
"خدمة سحب العينات من المنزل":"Home Sample Collection",
"نوفر إمكانية طلب سحب العينات من المنزل لتسهيل إجراء التحاليل دون الحاجة إلى زيارة الفرع، وفقًا للمناطق المتاحة ومواعيد الخدمة.":"You can request home sample collection to take your tests without visiting a branch, subject to available areas and service hours.",
"احجز سحب العينة":"Book sample collection","تواصل عبر واتساب":"Contact via WhatsApp","احجز تحليلك":"Book your test",
"لماذا برفكت لاب؟":"Why Perfect Lab?",
"الاهتمام بجودة ودقة التحاليل":"Focus on test quality and accuracy","مجموعة متنوعة من الخدمات المعملية":"A wide range of lab services","إمكانية سحب العينات من المنزل":"Home sample collection available","سهولة التواصل والاستفسار":"Easy to reach and ask","الاهتمام براحة المريض":"Patient comfort comes first","الحرص على سرعة إصدار النتائج وفقًا لنوع التحليل":"Fast results, depending on the test type",
"العروض والباقات":"Offers and Packages","فروعنا ومناطق الخدمة":"Our Branches and Service Areas",
"الفروع الفعلية تختلف عن مناطق سحب العينات من المنزل. تُعرض العناوين وأرقام الهاتف والمواعيد وروابط الخرائط بعد إضافتها والتحقق منها.":"Actual branches differ from home collection areas. Addresses, phone numbers, hours and map links are shown once added and verified.",
"كيف تستعد لتحليلك؟":"How to prepare for your test","تختلف متطلبات التحضير من تحليل لآخر.":"Preparation requirements vary from test to test.",
"يعتمد الصيام على التحليل المطلوب تحديدًا.":"Fasting depends on the specific test requested.",
"قد تتطلب بعض التحاليل وقتًا معينًا لسحب العينة.":"Some tests require a specific time of day for sampling.",
"تأكد من تعليمات الأدوية مع الطبيب المعالج أو المعمل.":"Check medication instructions with your doctor or the lab.",
"تواصل معنا قبل التحليل إذا لم تكن متأكدًا من التحضير المطلوب.":"Contact us before your test if you are unsure how to prepare.",
"لا توقف أي دواء موصوف لك من تلقاء نفسك.":"Do not stop any prescribed medication on your own.",
"الأسئلة الشائعة":"Frequently Asked Questions","اتصل بنا":"Contact Us",
"مختبر تحاليل طبية تحت إدارة د. أحمد فكري.":"Medical laboratory managed by Dr. Ahmed Fikry.",
"روابط سريعة":"Quick links","من نحن":"About us","خدماتنا":"Our services","العروض":"Offers","فروعنا":"Branches",
"تواصل":"Contact","اختر إحدى خدماتنا":"Choose one of our services","زيارة منزلية":"Home visit","النتائج":"Results","باقات التحاليل":"Test packages","التحاليل":"Tests","الروشتة":"Prescription","الفروع":"Branches","بيانات الاتصال":"Contact details","التحضير للتحليل":"Test preparation","سياسة الخصوصية":"Privacy policy"
};
Object.assign(EN,{
"تواصل معنا.":"Contact us.","حدد التحاليل والعنوان والموعد المناسب.":"Choose your tests, address and a suitable time.","يتم تأكيد الطلب وفقًا لتوافر الخدمة.":"Your request is confirmed based on service availability.",
"يضيف المعمل الأسعار والتحاليل المتضمنة وتواريخ الصلاحية من قسم":"The lab adds prices, included tests and validity dates from the","في الكود. لا توجد أسعار أو خصومات معروضة قبل اعتمادها.":"section in the code. No prices or discounts are shown before they are approved.",
"قريبًا":"Coming soon","التحاليل المتضمنة تُضاف بعد الاعتماد.":"Included tests will be added once approved.","السعر عند التواصل":"Price on request","حتى":"until",
"باقات الفحص الشامل":"Comprehensive check-up packages","باقات متابعة السكر":"Diabetes follow-up packages","باقات الفيتامينات والمعادن":"Vitamin and mineral packages","باقات الصحة العامة":"General health packages","العروض الموسمية":"Seasonal offers",
"فرع التبين":"El Tebbin Branch","فرع حلوان":"Helwan Branch","فرع حدائق حلوان":"Hadayek Helwan Branch","فرع المعادي":"Maadi Branch","فرع زهراء المعادي":"Zahraa El Maadi Branch","فرع مصر الجديدة":"Heliopolis Branch","فرع فيصل":"Faisal Branch","فرع 6 أكتوبر":"6th of October Branch",
"العنوان يُضاف بعد التحقق.":"Address will be added once verified.","الاتجاهات على الخريطة":"Directions on the map",
"هل يمكن حجز التحاليل من خلال واتساب؟":"Can I book tests through WhatsApp?","يمكنك التواصل معنا عبر واتساب للاستفسار وترتيب الحجز، وسيؤكد فريقنا التفاصيل.":"You can contact us on WhatsApp to ask questions and arrange a booking, and our team will confirm the details.",
"هل توجد خدمة سحب عينات من المنزل؟":"Do you offer home sample collection?","نعم، نوفر إمكانية طلب سحب العينات من المنزل وفقًا للمناطق المتاحة ومواعيد الخدمة.":"Yes, you can request home sample collection, subject to available areas and service hours.",
"كيف أعرف إذا كان التحليل يحتاج إلى صيام؟":"How do I know if a test requires fasting?","يختلف ذلك حسب التحليل. تواصل معنا قبل موعدك لتأكيد التحضير المطلوب.":"It depends on the test. Contact us before your appointment to confirm the required preparation.",
"متى تكون نتائج التحاليل جاهزة؟":"When will my results be ready?","يعتمد ذلك على نوع التحليل. نحرص على إصدار النتائج بأسرع وقت ممكن، ويمكنك الاستفسار عن تحليل بعينه.":"It depends on the type of test. We aim to issue results as quickly as possible, and you can ask about a specific test.",
"هل يمكن الاستفسار عن سعر تحليل معين؟":"Can I ask about the price of a specific test?","نعم، تواصل معنا وسنوافيك بالسعر المعتمد للتحليل المطلوب.":"Yes, contact us and we will give you the approved price for the test you need.",
"ما المناطق التي تغطيها خدمة سحب العينات من المنزل؟":"Which areas does home sample collection cover?","تتحدد المناطق حسب التوفر. تواصل معنا بعنوانك لتأكيد إمكانية الخدمة.":"Areas depend on availability. Contact us with your address to confirm the service is available.",
"الهاتف:":"Phone:","واتساب:":"WhatsApp:","البريد:":"Email:","ساعات العمل:":"Working hours:","التواصل الاجتماعي:":"Social media:","سيُضاف بعد التحقق":"To be added once verified",
"تُعدَّل هذه البيانات من":"These details are edited in","أعلى السكريبت.":"at the top of the script.",
"اسم المريض":"Patient name","رقم الهاتف":"Phone number","التحليل أو الخدمة المطلوبة":"Requested test or service","الفرع المفضل":"Preferred branch","سحب عينة من المنزل":"Home sample collection","التاريخ المفضل":"Preferred date","ملاحظات إضافية":"Additional notes",
"أوافق على استخدام بياناتي للتواصل معي بخصوص طلبي فقط. لا يُطلب منك إدخال معلومات طبية غير ضرورية.":"I agree to my data being used only to contact me about my request. You are not asked to enter unnecessary medical information.",
"إرسال الطلب":"Send request","تُستخدم البيانات المدخلة للتواصل بخصوص الطلب فقط. (أضف رابط السياسة المعتمدة هنا.)":"Submitted data is used only to contact you about your request. (Add the approved policy link here.)",
"برفكت لاب للتحاليل الطبية. جميع الحقوق محفوظة.":"Perfect Medical Laboratory. All rights reserved.",
"يرجى إدخال الاسم.":"Please enter your name.","يرجى إدخال رقم هاتف صحيح.":"Please enter a valid phone number.","يرجى تحديد التحليل أو الخدمة.":"Please specify the test or service.","الموافقة مطلوبة للمتابعة.":"Consent is required to continue.",
"تم تجهيز طلبك في واتساب؛ أرسل الرسالة لإتمام الطلب. سيؤكد المعمل الموعد معك.":"Your request is ready in WhatsApp; send the message to complete it. The lab will confirm your appointment.",
"هذا نموذج تجريبي: لم يتم إرسال أي بيانات ولا يوجد حجز. أضف رقم واتساب في CONFIG أو اربط خدمة استقبال فعلية.":"This is a demo form: no data was sent and no booking was made. Add a WhatsApp number in CONFIG or connect a real submission service.",
"القائمة":"Menu","شعار برفكت لاب – Perfect Lab":"Perfect Lab logo","فيديو فروع برفكت لاب":"Perfect Lab branches video"
});
Object.assign(EN,{
"اتصل بنا":"Contact Us","الأسئلة الشائعة":"Frequently Asked Questions","زيارة منزلية":"Home visit","العروض":"Offers","التحضير للتحليل":"Test preparation","الروشتة":"Prescription","بيانات الاتصال":"Contact details",
"كل ما تحتاجه في مكان واحد":"Everything you need in one place","تصفح أقسام الموقع للوصول إلى الخدمة المناسبة لك بسرعة.":"Browse the site sections to quickly reach the service you need.",
"فئات التحاليل المتاحة وأمثلة عليها.":"Available test categories with examples.","اطلب سحب العينة من بيتك.":"Request sample collection at home.","باقات وعروض التحاليل.":"Test packages and offers.",
"أقرب فرع لك ومناطق الخدمة.":"Your nearest branch and service areas.","تعليمات عامة قبل التحليل.":"General instructions before your test.","إجابات لأكثر الأسئلة تكرارًا.":"Answers to the most common questions.",
"احجز أو استفسر عن تحليل.":"Book or ask about a test.","تعرف على المعمل ورسالته.":"Learn about the lab and its mission.",
"عرض التفاصيل":"View details","احجز الآن":"Book now","هل لديك سؤال آخر؟":"Have another question?","تواصل معنا وسيرد عليك فريقنا في أقرب وقت.":"Contact us and our team will get back to you soon.",
"جاهز تحجز تحليلك؟":"Ready to book your test?","احجز من الفرع أو اطلب سحب العينة من المنزل.":"Book at a branch or request home sample collection.",
"في ملف":"in the file","الصفحة غير موجودة":"Page not found","الرابط الذي فتحته غير متاح. ارجع للصفحة الرئيسية.":"The link you opened is not available. Go back to the home page.","العودة للرئيسية":"Back to home","الزيارة المنزلية":"Home Visit","تسجيل الدخول": "Login", "عضوية برفكت لاب": "Perfect Lab membership", "انضم لعضوية برفكت لاب": "Join Perfect Lab membership", "سجّل بياناتك مرة واحدة، وخلّي فريقنا يتواصل معاك على واتساب بالعروض والتذكيرات ونتايج التحاليل.": "Register once and our team will reach you on WhatsApp with offers, reminders and test results.", "عروض وخصومات للأعضاء أول بأول": "Member offers and discounts first", "تذكير بمواعيد التحاليل الدورية": "Reminders for your routine tests", "حجز أسرع من غير ما تكتب بياناتك كل مرة": "Faster booking without retyping your details", "الاسم بالكامل": "Full name", "رقم الواتساب": "WhatsApp number", "تاريخ الميلاد (اختياري)": "Date of birth (optional)", "أقرب فرع ليك (اختياري)": "Nearest branch (optional)", "اختار الفرع": "Choose a branch", "البريد الإلكتروني (اختياري)": "Email (optional)", "موافق أستقبل العروض والتذكيرات من برفكت لاب على واتساب، وأقدر ألغي في أي وقت.": "I agree to receive offers and reminders from Perfect Lab on WhatsApp, and can opt out at any time.", "أوافق على استخدام بياناتي للتواصل معي بخصوص خدمات المعمل فقط.": "I agree to my data being used only to contact me about the lab's services.", "انضم وابعت بياناتي على واتساب": "Join and send my details on WhatsApp", "بعد الضغط هيتفتح واتساب برسالة فيها بياناتك، اضغط إرسال عشان يكمل تسجيلك.": "WhatsApp will open with a message containing your details. Press send to complete your sign-up.", "، إنت عضو في برفكت لاب": ", you are a Perfect Lab member", "لو ما بعتّش رسالة الواتساب، ارجع لواتساب واضغط إرسال عشان بياناتك توصلنا.": "If you didn't send the WhatsApp message, go back to WhatsApp and press send so your details reach us.", "شوف العروض": "See offers", "احجز تحليل": "Book a test", "تعديل بياناتي": "Edit my details", "تسجيل الخروج": "Sign out", "أهلاً": "Hi", "اكتب رقم موبايل مصري صحيح، مثل 01012345678.": "Enter a valid Egyptian mobile number, e.g. 01012345678.","بحث": "Search", "ابحث عن تحليل أو عرض أو فرع…": "Search for a test, offer or branch…", "ابحث في الموقع": "Search the site", "إغلاق": "Close", "مفيش نتايج. جرّب كلمة تانية أو كلّمنا على واتساب.": "No results. Try another word or message us on WhatsApp.", "الجنس": "Gender", "ذكر": "Male", "أنثى": "Female", "يرجى اختيار الجنس.": "Please choose a gender.","اضغط على صورة أي عرض لعرضها بالحجم الكامل، أو احجز مباشرة على واتساب. العروض متاحة في كل فروعنا مع خدمة السحب المنزلي.": "Tap any offer image to see it full size, or book directly on WhatsApp. Offers are available at all our branches, with home sample collection.", "جنيه": "EGP", "التحاليل المتضمنة": "Included tests", "احجز على واتساب": "Book on WhatsApp", "الباقة الشاملة": "Comprehensive package", "باقة تورم القدمين": "Swollen feet package", "باقة صحة القلب": "Heart health package", "تحليل جرثومة المعدة بالنفس (Urea Breath Test)": "H. pylori breath test (Urea Breath Test)", "باقة الفيتامينات والعناصر": "Vitamins & minerals package", "باقة صحة الكلى": "Kidney health package", "باقة تحاليل السكر": "Diabetes tests package", "عرض فيتامين د": "Vitamin D offer", "تحليل السكر التراكمي (HbA1c)": "HbA1c test", "عرض هشاشة العظام": "Osteoporosis offer", "خصم 50%": "50% off", "صورة دم كاملة (CBC)": "Complete blood count (CBC)", "مخزون الحديد (Ferritin)": "Iron stores (Ferritin)", "سكر صائم (FBS)": "Fasting blood sugar (FBS)", "سكر تراكمي (HbA1c)": "HbA1c", "الكوليسترول الكلي": "Total cholesterol", "الكوليسترول عالي الكثافة (HDL)": "HDL cholesterol", "الكوليسترول منخفض الكثافة (LDL)": "LDL cholesterol", "الدهون الثلاثية (TG)": "Triglycerides (TG)", "اليوريا (Urea)": "Urea", "الكرياتينين (Creatinine)": "Creatinine", "حمض اليوريك": "Uric acid", "وظائف الكبد (GPT – GOT)": "Liver function (GPT – GOT)", "وظائف الغدة (TSH)": "Thyroid (TSH)", "وظائف الكلى (كرياتينين + يوريا)": "Kidney function (creatinine + urea)", "الأملاح (صوديوم + بوتاسيوم)": "Electrolytes (sodium + potassium)", "وظائف الكبد (LFT)": "Liver function (LFT)", "الألبومين": "Albumin", "تحليل البول": "Urine analysis", "سكر صائم + تراكمي (HbA1c)": "Fasting sugar + HbA1c", "الكوليسترول (Cholesterol)": "Cholesterol", "الدهون الثلاثية (Triglycerides)": "Triglycerides", "وظائف الكلى (Creatinine)": "Kidney function (Creatinine)", "وظائف الكبد (GPT)": "Liver function (GPT)", "بدون منظار": "No endoscopy", "آمن وغير مؤلم": "Safe and painless", "سريع في الأداء": "Quick to perform", "فيتامين D": "Vitamin D", "فيتامين B12": "Vitamin B12", "مخزون الحديد": "Iron stores", "صورة الدم الكاملة": "Complete blood count", "كرياتينين (Creatinine)": "Creatinine", "يوريا (Urea)": "Urea", "حمض اليوريك (Uric Acid)": "Uric acid", "تحليل بول كامل": "Complete urine analysis", "سكر فاطر (PPS)": "Post-meal sugar (PPS)", "فيتامين D3": "Vitamin D3", "الكالسيوم (Calcium)": "Calcium", "الفوسفور (Phosphorus)": "Phosphorus","جولة في معامل برفكت لاب":"A tour of Perfect Lab","فيديو من داخل معامل برفكت لاب: المعمل والأجهزة والزيارات المنزلية.":"Real footage from inside Perfect Lab: the lab, equipment and home visits.","فرع حلوان 1":"Helwan 1 Branch","فرع حلوان 2":"Helwan 2 Branch","فرع الدواجن":"El Dawagen Branch","فرع المعصرة":"El Maasara Branch","فرع المهندسين":"Mohandessin Branch","التحاليل المتوفرة":"Available tests","كل التحاليل المتوفرة عندنا مصنفة حسب النوع.":"All the tests we offer, grouped by type.","أخصائي من برفكت لاب بييجي لحد بيتك يسحب العينة.":"A Perfect Lab specialist comes to your home to collect the sample.","الفيديو السابق":"Previous video","الفيديو التالي":"Next video","من 9 صباحًا إلى 11 مساءً":"9:00 AM to 11:00 PM","فيسبوك":"Facebook","فيديوهات معامل برفكت لاب":"Perfect Lab videos","إيقاف مؤقت":"Pause","تشغيل":"Play","تشغيل الصوت":"Turn sound on","كتم الصوت":"Mute","شاهد معامل برفكت لاب":"Take a look inside Perfect Lab","الفيديو سيُضاف قريبًا":"Video coming soon",
"المعمل والأجهزة":"The lab and equipment","جولة داخل معمل برفكت لاب والأجهزة المستخدمة في التحاليل.":"A tour inside Perfect Lab and the equipment used for testing.",
"التحاليل والزيارات المنزلية":"Tests and home visits","تعرف على التحاليل المتاحة وطريقة طلب سحب العينة من المنزل.":"Learn about the available tests and how to request home sample collection.",
"فروعنا":"Our branches","تعرف على فروع برفكت لاب وأماكنها.":"Get to know Perfect Lab branches and where they are.",
"فيديو المعمل والأجهزة":"Lab and equipment video","فيديو التحاليل والزيارات المنزلية":"Tests and home visits video",
"فروعنا على الخريطة":"Our branches on the map","اضغط على أي فرع لعرض مكانه على الخريطة.":"Tap any branch to see where it is on the map.","خريطة فروع برفكت لاب":"Perfect Lab branches map","جاري تحميل الخريطة…":"Loading map…",
"أماكن الفروع على الخريطة تقريبية حسب المنطقة لحين إضافة العناوين الدقيقة.":"Branch locations on the map are approximate by area until exact addresses are added.","عن برفكت":"About Perfect Lab"
});
const TITLE={ar:document.body.dataset.titleAr||document.title,en:document.title};
const tr=[];
const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let tn;
while(tn=tw.nextNode()){const raw=tn.textContent,t=raw.trim();if(t&&EN[t]){const i=raw.indexOf(t);tr.push([tn,raw,raw.slice(0,i)+EN[t]+raw.slice(i+t.length)])}}
const tra=[];document.querySelectorAll("[alt],[aria-label]").forEach(el=>["alt","aria-label"].forEach(a=>{const v=el.getAttribute(a);if(v&&EN[v])tra.push([el,a,v,EN[v]])}));
const T=ar=>document.documentElement.lang==="en"&&EN[ar]?EN[ar]:ar;
const lb=$("#lang");
function setLang(l){
 const en=l==="en";
 document.documentElement.lang=l;document.documentElement.dir=en?"ltr":"rtl";
 tr.forEach(([n,ar,e])=>{n.textContent=en?e:ar});
 tra.forEach(([el,a,ar,e])=>el.setAttribute(a,en?e:ar));
 document.title=TITLE[l];
 lb.textContent=en?"عربي":"English";
 [["#cart","Cart","السلة"],["#ddbtn","Show services menu","عرض قائمة الخدمات"],["#bell","Notifications","الإشعارات"]].forEach(([q,e,a])=>{const b=$(q),t=en?e:a;b.setAttribute("aria-label",t);b.title=t});
 try{localStorage.setItem("lang",l)}catch(e){}
 onLang.forEach(f=>f());onLangLate.forEach(f=>f());
}
lb.onclick=()=>setLang(document.documentElement.lang==="ar"?"en":"ar");
let saved=null;try{saved=localStorage.getItem("lang")}catch(e){}
setLang(saved==="ar"?"ar":"en");
