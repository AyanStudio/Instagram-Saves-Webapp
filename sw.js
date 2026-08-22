const VERSION='v6.1'; // bump this string on every future deploy
const CACHE=`instasaves-${VERSION}-shell`;
const ASSETS=['./','./index.html','./manifest.webmanifest','./sw.js','./icons/icon-192.png','./icons/icon-512.png'];

self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));

self.addEventListener('activate',e=>e.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))); // drop caches left over from old versions
  await self.clients.claim();
})()));

self.addEventListener('fetch',event=>{
  const req=event.request;

  // App shell HTML: this also covers share-target opens now, since GET share_target
  // just navigates straight to "./" with the shared data attached as a query string.
  // Always try the network first so a new deploy shows up immediately.
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).catch(()=>caches.match('./index.html')));
    return;
  }

  // Static assets (icons, manifest, etc): cache first, network fallback.
  event.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));return r}).catch(()=>caches.match('./index.html'))));
});
