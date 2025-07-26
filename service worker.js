const CACHE_NAME = 'pcsx-emulator-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './pcsx.css',
  './pcsx_ui.js',
  './pcsx_ww.js',
  './pcsx_ww.wasm'
  // Add other files here if needed (like fonts, images, bios, etc.)
];

// Install event — caching essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate event — clean up old caches if needed
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

// Fetch event — serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
      .catch(() => {
        // Optional: fallback if nothing found
      })
  );
});
