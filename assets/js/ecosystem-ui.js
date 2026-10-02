function renderNav(){
  const path=location.pathname.split("/").pop()||"index.html";
  const links=[["solutions.html","Solutions"],["ecosystem.html","Partners"],["industries.html","Industries"],["about.html","About"],["insights.html","Insights"],["contact.html","Contact"]];
  const nav='<nav class="eco-nav" aria-label="Primary navigation"><div class="eco-nav-inner"><a class="eco-brand" href="index.html" aria-label="SilkBridge home"><img src="assets/brand/silkbridge-logo-trim.png" alt="SilkBridge"></a><button class="eco-menu" type="button" aria-expanded="false" aria-controls="ecoNavLinks"><span></span><span></span><span></span><b>Menu</b></button><div class="eco-nav-right" id="ecoNavLinks">'+links.map(([href,label])=>'<a href="'+href+'" class="'+(path===href?"active":"")+'">'+label+'</a>').join("")+'</div></div></nav>';
  document.body.insertAdjacentHTML("afterbegin",nav);
  const button=document.querySelector(".eco-menu"),linksEl=document.getElementById("ecoNavLinks");
  button?.addEventListener("click",()=>{const open=linksEl.classList.toggle("open");button.setAttribute("aria-expanded",String(open))});
  linksEl?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{linksEl.classList.remove("open");button?.setAttribute("aria-expanded","false")}));
}
function renderFooter(){
  document.querySelector(".eco-page")?.insertAdjacentHTML("beforeend",'<footer class="eco-footer"><div class="eco-shell"><div class="eco-footer-main"><div><span>© 2026 SilkBridge</span><span>The bridge between technology and the GCC.</span></div><a href="contact.html">Start a conversation</a></div><div class="eco-sister"><div class="eco-sister-logo"><img src="assets/brand/getbuilder-logo.svg" alt="Get Builder"></div><p>Customer service has been handled by Silk Bridge for our Get Builder sister company.</p></div></div></footer>');
}
function verticalById(id){return silkBridge.verticals.find(v=>v.id===id)}
function partnerBySlug(slug){return silkBridge.partners.find(p=>p.slug===slug)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function track(name,payload={}){try{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...payload});console.info("[SilkBridge]",name,payload)}catch{}}
export { renderNav, renderFooter, verticalById, partnerBySlug, esc, track };