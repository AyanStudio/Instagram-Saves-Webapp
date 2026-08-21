const CACHE='instasaves-v3-shell';
const ASSETS=['./','./index.html','./manifest.webmanifest','./sw.js','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
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
  event.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(req,copy));return r}).catch(()=>caches.match('./index.html'))));
});
