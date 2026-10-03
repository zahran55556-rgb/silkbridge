import { silkBridge } from "./ecosystem-data.js";
function renderNav(){
  const path=location.pathname.split("/").pop()||"index.html";
  const links=[["ecosystem.html","Partners"],["solutions.html","Solutions"],["industries.html","Industries"],["about.html","About"],["insights.html","Insights"],["contact.html","Contact"]];
  const nav='<nav class="eco-nav" aria-label="Primary navigation"><div class="eco-nav-inner"><a class="eco-brand" href="index.html" aria-label="SilkBridge home"><img src="assets/brand/silkbridge-logo-trim.png" alt="SilkBridge"></a><button class="eco-menu" type="button" aria-expanded="false" aria-controls="ecoNavLinks"><span></span><span></span><span></span><b>Menu</b></button><div class="eco-nav-right" id="ecoNavLinks">'+links.map(([href,label])=>'<a href="'+href+'" class="'+(path===href?"active":"")+'"'+(path===href?' aria-current="page"':'')+'>'+label+'</a>').join("")+'</div></div></nav>';
  document.body.insertAdjacentHTML("afterbegin",nav);
  const button=document.querySelector(".eco-menu"),linksEl=document.getElementById("ecoNavLinks");
  const mobileQuery=window.matchMedia("(max-width:900px)");
  function setNavOpen(open,{returnFocus=false}={}){
    const mobile=mobileQuery.matches;
    const shouldOpen=mobile&&open;
    linksEl?.classList.toggle("open",shouldOpen);
    button?.setAttribute("aria-expanded",String(shouldOpen));
    if(linksEl){
      linksEl.inert=mobile&&!shouldOpen;
      linksEl.setAttribute("aria-hidden",String(mobile&&!shouldOpen));
    }
    if(returnFocus&&mobile) button?.focus();
  }
  function syncNavMode(){
    if(!mobileQuery.matches){
      linksEl?.classList.remove("open");
      button?.setAttribute("aria-expanded","false");
      if(linksEl){linksEl.inert=false;linksEl.setAttribute("aria-hidden","false")}
    }else{
      setNavOpen(linksEl?.classList.contains("open")||false);
    }
  }
  button?.addEventListener("click",()=>setNavOpen(!linksEl.classList.contains("open")));
  linksEl?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setNavOpen(false)));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&linksEl?.classList.contains("open"))setNavOpen(false,{returnFocus:true})});
  mobileQuery.addEventListener?.("change",syncNavMode);
  syncNavMode();
}
function enhanceSEO(){
  const absolute=new URL(location.href);absolute.hash="";
  const page=absolute.pathname.split("/").pop()||"index.html",slug=absolute.searchParams.get("slug");
  absolute.search="";if(slug&&["partner.html","solution.html","insight.html"].includes(page))absolute.searchParams.set("slug",slug);
  const canonical=absolute.href,title=document.title,description=document.querySelector('meta[name="description"]')?.content||"SilkBridge connects global technology with regional opportunities across the GCC.",socialImage="https://silkbridge.eu/assets/photos/10-worldmap-meeting.jpg";
  const add=(name,content)=>{let el=document.querySelector('meta[name="'+name+'"]');if(!el){el=document.createElement("meta");el.name=name;document.head.appendChild(el)}el.content=content};
  const addProp=(property,content)=>{let el=document.querySelector('meta[property="'+property+'"]');if(!el){el=document.createElement("meta");el.setAttribute("property",property);document.head.appendChild(el)}el.content=content};
  let link=document.querySelector('link[rel="canonical"]');if(!link){link=document.createElement("link");link.rel="canonical";document.head.appendChild(link)}link.href=canonical;
  add("theme-color","#0B1220");addProp("og:title",title);addProp("og:description",description);addProp("og:type",page==="insight.html"?"article":"website");addProp("og:url",canonical);addProp("og:site_name","SilkBridge");addProp("og:image",socialImage);addProp("og:image:alt","SilkBridge technology distribution and GCC market access");
  add("twitter:card","summary_large_image");add("twitter:title",title);add("twitter:description",description);add("twitter:image",socialImage);
  let s=document.getElementById("silkbridge-schema");if(!s){s=document.createElement("script");s.id="silkbridge-schema";s.type="application/ld+json";document.head.appendChild(s)}
  const org={"@type":"Organization","@id":"https://silkbridge.eu/#organization","name":"SilkBridge","url":"https://silkbridge.eu/","email":"sales@silkbridge.eu"};
  const pageSchema={"@type":page==="insight.html"?"Article":"WebPage","@id":canonical+"#webpage","url":canonical,"name":title,"description":description,"isPartOf":{"@id":"https://silkbridge.eu/#website"},"about":{"@id":"https://silkbridge.eu/#organization"}};
  if(page==="insight.html")pageSchema.headline=title.replace(/ \| SilkBridge$/,"");
  s.textContent=JSON.stringify({"@context":"https://schema.org","@graph":[org,{"@type":"WebSite","@id":"https://silkbridge.eu/#website","url":"https://silkbridge.eu/","name":"SilkBridge","publisher":{"@id":"https://silkbridge.eu/#organization"}},pageSchema]});
}
function renderFooter(){
  enhanceSEO();
  document.querySelector(".eco-page")?.insertAdjacentHTML("beforeend",'<footer class="eco-footer"><div class="eco-shell"><div class="eco-footer-main"><div><span>© 2026 SilkBridge</span><span>The bridge between technology and the GCC.</span></div><div class="eco-footer-links"><a href="contact.html">Start a conversation</a><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div></div><div class="eco-sister"><div class="eco-sister-logo"><img src="assets/brand/getbuilder-logo.svg" alt="Get Builder"></div><p>Customer service has been handled by Silk Bridge for our Get Builder sister company.</p></div></div></footer>');
}
function verticalById(id){return silkBridge.verticals.find(v=>v.id===id)}
function partnerBySlug(slug){return silkBridge.partners.find(p=>p.slug===slug)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function track(name,payload={}){try{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...payload});console.info("[SilkBridge]",name,payload)}catch{}}
export { renderNav, renderFooter, enhanceSEO, verticalById, partnerBySlug, esc, track };