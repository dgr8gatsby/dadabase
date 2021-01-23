const cacheName = 'staledadjokes_v3';

const APPFILES = [
  '/index.html',
  '/index.css',
  //   '/index.js',
  '/favicon.ico',
  '/bundle.js',
  '/svg/mustache.svg',
];

self.addEventListener ('install', e => {
  console.log ('[Service Worker] Install');
  e.waitUntil (
    caches.open (cacheName).then (cache => {
      console.log ('[Service Worker] Caching all: app shell and content');
      console.log (cache);
      console.log (APPFILES);
      return cache.addAll (APPFILES);
    })
  );
});

self.addEventListener ('fetch', e => {
  e.respondWith (
    caches.match (e.request).then (r => {
      console.log ('[Service Worker] Fetching resource: ' + e.request.url);
      return (
        r ||
        fetch (e.request).then (response => {
          return caches.open (cacheName).then (cache => {
            console.log (
              '[Service Worker] Caching new resource: ' + e.request.url
            );
            cache.put (e.request, response.clone ());
            return response;
          });
        })
      );
    })
  );
});
