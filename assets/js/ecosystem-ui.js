function renderNav(){document.body.insertAdjacentHTML("afterbegin",'<nav class="eco-nav"><a class="eco-brand" href="index.html">SilkBridge</a><div class="eco-nav-right"><a href="solutions.html">Solutions</a><a href="ecosystem.html">Partners</a><a href="industries.html">Industries</a><a href="about.html">About</a><a href="insights.html">Insights</a><a href="contact.html">Contact</a></div></nav>')}
function renderFooter(){document.querySelector(".eco-page")?.insertAdjacentHTML("beforeend",'<footer class="eco-footer"><div class="eco-shell" style="display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap"><span>© 2026 SilkBridge</span><span>The bridge between technology and the GCC.</span><a href="contact.html">Start a conversation</a></div></footer>')}
function verticalById(id){return silkBridge.verticals.find(v=>v.id===id)}
function partnerBySlug(slug){return silkBridge.partners.find(p=>p.slug===slug)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function track(name,payload={}){try{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...payload});console.info("[SilkBridge]",name,payload)}catch{}}

export { renderNav, renderFooter, verticalById, partnerBySlug, esc, track };
