const CACHE_NAME = 'kbs-calculator-v3';
const STATIC_CACHE = 'kbs-calculator-static-v3';
const DYNAMIC_CACHE = 'kbs-calculator-dynamic-v3';

// Cache ALL app assets immediately - no internet needed after first load
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/calculator-icon.png'
];

// Install event - cache ALL resources immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker installing and caching all resources...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened static cache, adding all resources...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('All static resources cached successfully!');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache resources:', error);
      })
  );
});

// Activate event - take control immediately and clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Take control of all clients immediately
      self.clients.claim(),
      
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Fetch event - serve from cache FIRST, then network (offline-first strategy)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Handle different types of requests
  if (request.method !== 'GET') {
    return;
  }

  // For ALL requests, try cache FIRST, then network (offline-first)
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Serving from cache:', request.url);
          return cachedResponse;
        }
        
        // If not in cache, try network
        return fetch(request)
          .then((fetchResponse) => {
            // Cache the fetched response for next time
            if (fetchResponse && fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return fetchResponse;
          })
          .catch((error) => {
            console.log('Network failed, serving offline fallback:', request.url);
            
            // For HTML requests, return offline page
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
            
            // For other requests, return null (will show as broken image/link)
            return null;
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Background sync triggered');
  // Handle any background sync operations
}

// Message event for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    event.ports[0].postMessage({
      type: 'CACHE_INFO',
      cacheNames: [STATIC_CACHE, DYNAMIC_CACHE]
    });
  }
});
