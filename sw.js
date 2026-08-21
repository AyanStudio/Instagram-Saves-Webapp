const CACHE='instasaves-v4-shell';
const ASSETS=['./','./index.html','./manifest.webmanifest','./sw.js','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(u.origin===location.origin && u.pathname.endsWith('/share-target')){
  const target=new URL('./',location.href);
  for(const [k,v] of u.searchParams) target.searchParams.set(k,v);
  e.respondWith(Response.redirect(target.href,303)); return;
 }
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(x=>x.put(e.request,cp));return r;}).catch(()=>caches.match('./index.html'))));
});
