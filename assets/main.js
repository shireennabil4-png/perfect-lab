// ===== Shared header & footer for every page =====
// To add a page: add it to NAV and put <body data-page="key"> in the page.
const NAV={
 main:[["index.html","الرئيسية","home"]],
 services:[["services.html","التحاليل","services"],["offers.html","العروض","offers"],["prepare.html","التحضير للتحليل","prepare"],["faq.html","الأسئلة الشائعة","faq"],["contact.html","الروشتة","rx"]],
 after:[["branches.html","الفروع","branches"],["home-collection.html","الزيارة المنزلية","home-collection"],["contact.html","اتصل بنا","contact","call"],["about.html","عن برفكت","about"]]
};
const PAGE=document.body.dataset.page||"";
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
<a class="nb login" href="login.html">تسجيل الدخول</a>
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
document.getElementById("site-footer").outerHTML=`<footer><div class="wrap">
<div class="fg">
<div><h3>🔬 برفكت لاب</h3><p>مختبر تحاليل طبية تحت إدارة د. أحمد فكري.</p></div>
<div><h3>روابط سريعة</h3><a href="about.html">من نحن</a><a href="services.html">خدماتنا</a><a href="offers.html">العروض</a><a href="branches.html">فروعنا</a></div>
<div><h3>تواصل</h3><a href="contact.html">بيانات الاتصال</a><a href="faq.html">الأسئلة الشائعة</a><a href="prepare.html">التحضير للتحليل</a></div>
<div><h3>سياسة الخصوصية</h3><p>تُستخدم البيانات المدخلة للتواصل بخصوص الطلب فقط. (أضف رابط السياسة المعتمدة هنا.)</p></div>
</div>
<small>© <span id="yr"></span> برفكت لاب للتحاليل الطبية. جميع الحقوق محفوظة.</small>
</div></footer>`;

// ===== Fill page content (each part runs only if it exists on the page) =====
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fill=(q,html)=>{const el=$(q);if(el)el.innerHTML=html};
const card=(i,t,p)=>`<div class="card"><span class="ic">${i}</span><h3>${esc(t)}</h3>${p?`<p>${p}</p>`:""}</div>`;
const C=CONFIG,tbd="سيُضاف بعد التحقق";
fill("#svc",SV.map(s=>card(s[0],s[1],s[2])).join(""));
fill("#why",WH.map(s=>card(s[0],s[1])).join(""));
fill("#off",C.offers.map(o=>`<div class="card"><span class="tag">${o.discount?esc(o.discount):"قريبًا"}</span><h3>${esc(o.n)}</h3><p>${o.tests?esc(o.tests):"التحاليل المتضمنة تُضاف بعد الاعتماد."}</p><p><b>${o.price?esc(o.price):"السعر عند التواصل"}</b>${o.valid?" · حتى "+esc(o.valid):""}</p></div>`).join(""));
fill("#br",C.branches.map(b=>`<div class="card"><span class="ic">📍</span><h3>فرع ${esc(b.n)}</h3><p>${b.address?esc(b.address):"العنوان يُضاف بعد التحقق."}</p>${b.phone?`<p><a href="tel:${esc(b.phone)}">${esc(b.phone)}</a></p>`:""}${b.hours?`<p>${esc(b.hours)}</p>`:""}${b.map?`<p><a href="${esc(b.map)}" target="_blank" rel="noopener"><b>الاتجاهات على الخريطة</b></a></p>`:""}</div>`).join(""));
if($("#bsel"))$("#bsel").innerHTML+=C.branches.map(b=>`<option>فرع ${esc(b.n)}</option>`).join("");
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
 const v=stage.querySelector(".st-v"),tabs=$("#st-tabs");
 const VQ="?v="+(document.querySelector('script[src*="main.js"]').src.split("v=")[1]||"1");let i=0,paused=false,muted=true,fails=0,retried=false;
 // stage height = visible screen under the header
 const fitH=()=>document.documentElement.style.setProperty("--hh",document.querySelector("header").offsetHeight+"px");
 fitH();addEventListener("resize",fitH);
 const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduce)paused=true;
 const cap=()=>{const x=VLIST[i];$("#st-title").textContent=T(x.title);$("#st-text").textContent=T(x.text);
  tabs.innerHTML=VLIST.map((y,k)=>`<button type="button" role="tab" aria-selected="${k===i}" class="st-tab${k===i?" on":""}" data-k="${k}"><span class="sbar"><i></i></span>${esc(T(y.title))}</button>`).join("")};
 const bar=p=>{const el=tabs.querySelector(".st-tab.on i");if(el)el.style.width=Math.min(100,p*100)+"%"};
 const next=()=>go((i+1)%VLIST.length);
 function onFail(){ // try once more with a fresh copy, then move on quietly
  if(!retried){retried=true;v.src=VLIST[i].src+VQ+"r"+Date.now();if(!paused)v.play().catch(()=>{});return}
  if(++fails>=VLIST.length)return; setTimeout(next,300)}
 function go(k){
  i=k;retried=false;cap();const x=VLIST[i];
  stage.classList.remove("ready");v.src=x.src+VQ;v.muted=muted;
  if(!paused){v.play().catch(()=>{});}
 }
 v.addEventListener("loadedmetadata",()=>{stage.classList.add("ready");fails=0});
 v.addEventListener("error",onFail);
 v.addEventListener("timeupdate",()=>{if(v.duration)bar(v.currentTime/v.duration)});
 v.addEventListener("ended",next);
 tabs.addEventListener("click",e=>{const b=e.target.closest(".st-tab");if(b)go(+b.dataset.k)});
 const prev=()=>go((i-1+VLIST.length)%VLIST.length);
 $("#st-prev").onclick=prev;$("#st-next").onclick=next;
 stage.tabIndex=-1;stage.addEventListener("keydown",e=>{const rtl=document.dir==="rtl";if(e.key==="ArrowRight")(rtl?prev:next)();if(e.key==="ArrowLeft")(rtl?next:prev)()});
 // swipe on phones
 let sx=null;stage.addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});
 stage.addEventListener("touchend",e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)<50)return;const rtl=document.dir==="rtl";(dx<0)!==rtl?next():prev()},{passive:true});
 const pb=$("#st-play"),sb=$("#st-sound");
 const arrowsUi=()=>{$("#st-prev").setAttribute("aria-label",T("الفيديو السابق"));$("#st-next").setAttribute("aria-label",T("الفيديو التالي"))};
 const ui=()=>{arrowsUi();pb.textContent=paused?"▶":"❚❚";pb.setAttribute("aria-label",T(paused?"تشغيل":"إيقاف مؤقت"));sb.textContent=muted?"🔇":"🔊";sb.setAttribute("aria-label",T(muted?"تشغيل الصوت":"كتم الصوت"))};
 pb.onclick=()=>{paused=!paused;if(paused)v.pause();else v.play().catch(()=>{});ui()};
 sb.onclick=()=>{muted=!muted;v.muted=muted;if(!muted&&paused){paused=false;v.play().catch(()=>{})}ui()};
 // pause when the stage is scrolled out of view (saves data/battery)
 if("IntersectionObserver"in window)new IntersectionObserver(([e])=>{if(!stage.classList.contains("ready")||paused)return;e.isIntersecting?v.play().catch(()=>{}):v.pause()}).observe(stage);
 onLang.push(()=>{cap();ui()});
 setTimeout(()=>go(0)); // after translations are ready
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

// ===== Booking form (Contact page) =====
const form=$("#f");
if(form)form.addEventListener("submit",e=>{
 e.preventDefault();const f=e.target,d=Object.fromEntries(new FormData(f));let ok=true;
 const set=(n,m)=>{f[n].parentElement.querySelector(".err").textContent=m;if(m)ok=false};
 set("name",d.name.trim().length<3?T("يرجى إدخال الاسم."):"");
 set("phone",/^[+\d\s-]{8,16}$/.test(d.phone.trim())?"":T("يرجى إدخال رقم هاتف صحيح."));
 set("test",d.test.trim()?"":T("يرجى تحديد التحليل أو الخدمة."));
 $("#e-ok").textContent=f.ok.checked?"":T("الموافقة مطلوبة للمتابعة.");if(!f.ok.checked)ok=false;
 if(!ok)return;
 const m=$("#msg");m.style.display="block";
 if(C.whatsapp){
  const t=`طلب جديد\nالاسم: ${d.name}\nالهاتف: ${d.phone}\nالخدمة: ${d.test}\nالفرع: ${d.branch}\nالتاريخ: ${d.date||"-"}\nملاحظات: ${d.notes||"-"}`;
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
"في ملف":"in the file","الصفحة غير موجودة":"Page not found","الرابط الذي فتحته غير متاح. ارجع للصفحة الرئيسية.":"The link you opened is not available. Go back to the home page.","العودة للرئيسية":"Back to home","الزيارة المنزلية":"Home Visit","جولة في معامل برفكت لاب":"A tour of Perfect Lab","فيديو من داخل معامل برفكت لاب: المعمل والأجهزة والزيارات المنزلية.":"Real footage from inside Perfect Lab: the lab, equipment and home visits.","فرع حلوان 1":"Helwan 1 Branch","فرع حلوان 2":"Helwan 2 Branch","فرع الدواجن":"El Dawagen Branch","فرع المعصرة":"El Maasara Branch","فرع المهندسين":"Mohandessin Branch","التحاليل المتوفرة":"Available tests","كل التحاليل المتوفرة عندنا مصنفة حسب النوع.":"All the tests we offer, grouped by type.","أخصائي من برفكت لاب بييجي لحد بيتك يسحب العينة.":"A Perfect Lab specialist comes to your home to collect the sample.","الفيديو السابق":"Previous video","الفيديو التالي":"Next video","من 9 صباحًا إلى 11 مساءً":"9:00 AM to 11:00 PM","فيسبوك":"Facebook","فيديوهات معامل برفكت لاب":"Perfect Lab videos","إيقاف مؤقت":"Pause","تشغيل":"Play","تشغيل الصوت":"Turn sound on","كتم الصوت":"Mute","شاهد معامل برفكت لاب":"Take a look inside Perfect Lab","الفيديو سيُضاف قريبًا":"Video coming soon",
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
 onLang.forEach(f=>f());
}
lb.onclick=()=>setLang(document.documentElement.lang==="ar"?"en":"ar");
let saved=null;try{saved=localStorage.getItem("lang")}catch(e){}
setLang(saved==="ar"?"ar":"en");
