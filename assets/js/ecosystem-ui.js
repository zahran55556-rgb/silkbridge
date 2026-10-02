function renderNav(){document.body.insertAdjacentHTML("afterbegin",'<nav class="eco-nav"><a class="eco-brand" href="index.html">SilkBridge</a><div class="eco-nav-right"><a href="solutions.html">Solutions</a><a href="ecosystem.html">Partners</a><a href="industries.html">Industries</a><a href="about.html">About</a><a href="insights.html">Insights</a><a href="contact.html">Contact</a></div></nav>')}
function renderFooter(){document.querySelector(".eco-page")?.insertAdjacentHTML("beforeend",'<footer class="eco-footer"><div class="eco-shell"><div class="eco-footer-main"><div><span>© 2026 SilkBridge</span><span>The bridge between technology and the GCC.</span></div><a href="contact.html">Start a conversation</a></div><div class="eco-sister"><div class="eco-sister-logo"><img src="assets/brand/getbuilder-logo.png" alt="Get Builder"></div><p>Customer service has been handled by Silk Bridge for our Get Builder sister company.</p></div></div></footer>')}
function verticalById(id){return silkBridge.verticals.find(v=>v.id===id)}
function partnerBySlug(slug){return silkBridge.partners.find(p=>p.slug===slug)}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function track(name,payload={}){try{window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...payload});console.info("[SilkBridge]",name,payload)}catch{}}

export { renderNav, renderFooter, verticalById, partnerBySlug, esc, track };
