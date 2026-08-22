const VERSION='v3.1'; // bump this string on every future deploy
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
  const url=new URL(req.url);

  if(req.method==='POST' && url.pathname.endsWith('/share-target/')){
    event.respondWith((async()=>{
      let saved='';
      try{const fd=await req.formData();saved=fd.get('url')||fd.get('text')||fd.get('title')||''}catch{}
      const clientUrl=new URL('./',self.registration.scope);
      if(saved)clientUrl.searchParams.set('shared_url',String(saved));
      return Response.redirect(clientUrl.toString(),303);
    })());
    return;
  }

  // App shell HTML: always try network first so a new deploy shows up right away.
  // Falls back to cache only if offline.
  if(req.mode==='navigate'){
    event.respondWith(
      fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(req,copy));return r})
        .catch(()=>caches.match(req).then(c=>c||caches.match('./index.html')))
    );
    return;
  }

  // Static assets (icons, manifest, etc): cache first is fine, they rarely change.
  event.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));return r}).catch(()=>caches.match('./index.html'))));
});
