// The build replaces the version and asset list with this release's exact files.
const CACHE='untitled-party-1871238d8adefd17';
const PRECACHE=["/","/assets/baseline-1.glb","/assets/baseline-2.glb","/assets/baseline-3.glb","/assets/baseline-4.glb","/assets/baseline-5.glb","/assets/baseline-6.glb","/assets/baseline-7.glb","/assets/dm-sans-latin-ext-wght-normal-BOFOeGcA.woff2","/assets/dm-sans-latin-wght-normal-Xz1IZZA0.woff2","/assets/index-CnHg1kdY.css","/assets/index-Dbbv7gvh.js","/assets/outfit-latin-ext-wght-normal-DdQaqQDo.woff2","/assets/outfit-latin-wght-normal-Bc-8i84L.woff2","/icon.svg","/index.html","/manifest.webmanifest"];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(PRECACHE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('untitled-party-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  // These are same-origin application files; Origin-based Vary headers must not
  // split precached fetches from module/font requests made by the page.
  const cached=await cache.match(event.request,{ignoreVary:true});
  if(cached)return cached;
  try{
   const response=await fetch(event.request);
   if(response.ok)await cache.put(event.request,response.clone());
   return response;
  }catch{
   if(event.request.mode==='navigate'){
    const shell=await cache.match('/');
    if(shell)return shell;
   }
   return new Response('Offline asset unavailable',{status:503});
  }
 }));
});
