importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log('Workbox loaded successfully.');

  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/matches.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/pages/teams.html', revision: '1' },
    { url: '/pages/favorites.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/styles.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/app.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/ui.js', revision: '1' },
    { url: '/img/noimage.jpg', revision: '1' },
    { url: '/img/icons/icon-72x72.png', revision: '1' },
    { url: '/img/icons/icon-96x96.png', revision: '1' },
    { url: '/img/icons/icon-128x128.png', revision: '1' },
    { url: '/img/icons/icon-144x144.png', revision: '1' },
    { url: '/img/icons/icon-192x192.png', revision: '1' },
    { url: '/img/icons/icon-256x256.png', revision: '1' },
    { url: '/img/icons/icon-384x384.png', revision: '1' },
    { url: '/img/icons/icon-512x512.png', revision: '1' },
  ]);

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ]
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'football'
    })
  );

  workbox.routing.registerRoute(
    /^https:\/\/upload\.wikimedia\.org\/wikipedia\//,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'football-image-team',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ]
    })
  );

  self.addEventListener('push', event => {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }

    let options = {
      body: body,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    }

    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });

} else {
  console.log('Workbox failed to load.');
}