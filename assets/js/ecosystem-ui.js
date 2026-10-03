import { silkBridge } from "./ecosystem-data.js";
function renderNav(){
  const path=location.pathname.split("/").pop()||"index.html";
  const links=[["ecosystem.html","Partners"],["solutions.html","Solutions"],["industries.html","Industries"],["about.html","About"],["insights.html","Insights"],["contact.html","Contact"]];
  const nav='<nav class="eco-nav" aria-label="Primary navigation"><div class="eco-nav-inner"><a class="eco-brand" href="index.html" aria-label="SilkBridge home"><img src="assets/brand/silkbridge-logo-trim.png" alt="SilkBridge"></a><button class="eco-menu" type="button" aria-expanded="false" aria-controls="ecoNavLinks"><span></span><span></span><span></span><b>Menu</b></button><div class="eco-nav-right" id="ecoNavLinks">'+links.map(([href,label])=>'<a href="'+href+'" class="'+(path===href?"active":"")+'"'+(path===href?' aria-current="page"':'')+'>'+label+'</a>').join("")+'</div></div></nav>';
  document.body.insertAdjacentHTML("afterbegin",nav);
  const button=document.querySelector(".eco-menu"),linksEl=document.getElementById("ecoNavLinks");
  button?.addEventListener("click",()=>{const open=linksEl.classList.toggle("open");button.setAttribute("aria-expanded",String(open))});
  linksEl?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{linksEl.classList.remove("open");button?.setAttribute("aria-expanded","false")}));
}
function enhanceSEO(){
  const absolute=new URL(location.href);
  absolute.hash="";
  const canonical=absolute.href;
  const title=document.title;
  const description=document.querySelector('meta[name="description"]')?.content||"SilkBridge connects global technology with regional opportunities across the GCC.";
  const add=(name,content)=>{let el=document.querySelector('meta[name="'+name+'"]');if(!el){el=document.createElement("meta");el.name=name;document.head.appendChild(el)}el.content=content};
  const addProp=(property,content)=>{let el=document.querySelector('meta[property="'+property+'"]');if(!el){el=document.createElement("meta");el.setAttribute("property",property);document.head.appendChild(el)}el.content=content};
  let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement("link");link.rel="canonical";document.head.appendChild(link)}link.href=canonical;
  add("theme-color","#0B1220");addProp("og:title",title);addProp("og:description",description);addProp("og:type","website");addProp("og:url",canonical);
  add("twitter:card","summary");add("twitter:title",title);add("twitter:description",description);
  if(!document.getElementById("silkbridge-schema")){const s=document.createElement("script");s.id="silkbridge-schema";s.type="application/ld+json";s.textContent=JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"SilkBridge","url":"https://silkbridge.eu/","email":"sales@silkbridge.eu","description":"GCC-focused B2B technology distributor connecting global technology brands with regional opportunities."});document.head.appendChild(s)}
}
function renderFooter(){
  enhanceSEO();
  document.querySelector(".eco-page")?.insertAdjacentHTML("beforeend",'<footer class="eco-footer"><div class="eco-shell"><div class="eco-footer-main"><div><span>© 2026 SilkBridge</span><span>The bridge between technology and the GCC.</span></div><a href="contact.html">Start a conversation</a></div><div class="eco-sister"><div class="eco-sister-logo"><img src="assets/brand/getbuilder-logo.svg" alt="Get Builder"></div><p>Customer service has been handled by Silk Bridge for our Get Builder sister company.</p></div></div></footer>');
}
function verticalById(id){return silkBridge.verticals.find(v=>v.id===id)}
function partnerBySlug(slug){return silkBridge.partners.find(p=>p.slug===slug)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function track(name,payload={}){try{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...payload});console.info("[SilkBridge]",name,payload)}catch{}}
export { renderNav, renderFooter, enhanceSEO, verticalById, partnerBySlug, esc, track };