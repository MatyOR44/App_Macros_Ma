const CACHE_NAME = 'app-mama-v2';

self.addEventListener('install', event => {
  self.skipWaiting(); // Obliga a la app a instalarse al instante
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Solo guardamos lo estrictamente necesario para no fallar
      return cache.addAll([
        './',
        './index.html',
        './manifest.json'
      ]);
    }).catch(err => console.log('Error en cache, ignorando...', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('./index.html');
    })
  );
});