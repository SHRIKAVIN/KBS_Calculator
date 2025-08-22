// PWA Utility Functions - Enhanced for Offline-First

export interface PWAInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface PWAInstallPrompt {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Check if the app is running as a PWA
export const isPWAInstalled = (): boolean => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes('android-app://')
  );
};

// Check if the browser supports PWA installation
export const isPWAInstallable = (): boolean => {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
};

// Check if the app is currently offline
export const isOffline = (): boolean => {
  return !navigator.onLine;
};

// Check if the app is fully cached and ready for offline use
export const isAppCached = async (): Promise<boolean> => {
  if (!('caches' in window)) return false;
  
  try {
    const cacheNames = await caches.keys();
    const hasStaticCache = cacheNames.some(name => name.includes('static'));
    const hasDynamicCache = cacheNames.some(name => name.includes('dynamic'));
    
    return hasStaticCache && hasDynamicCache;
  } catch (error) {
    console.error('Error checking cache status:', error);
    return false;
  }
};

// Register service worker with enhanced offline-first support
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully:', registration);
    
    // Wait for the service worker to be ready
    await navigator.serviceWorker.ready;
    console.log('Service Worker is ready and controlling the page');
    
    // Check if this is a new service worker
    if (registration.waiting) {
      console.log('New service worker waiting to activate');
      // Send message to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    return null;
  }
};

// Check if the app needs to be updated
export const checkForAppUpdate = (registration: ServiceWorkerRegistration): void => {
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    if (newWorker) {
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available
          console.log('New version available');
          // You can show a notification to the user here
        }
      });
    }
  });
};

// Reload the app to apply updates
export const reloadApp = (): void => {
  window.location.reload();
};

// Get comprehensive PWA status
export const getPWAStatus = async () => {
  const status = {
    isInstalled: isPWAInstalled(),
    isInstallable: isPWAInstallable(),
    isOffline: isOffline(),
    hasServiceWorker: 'serviceWorker' in navigator,
    isCached: await isAppCached(),
    cacheSize: await getCacheSize(),
  };
  
  return status;
};

// Get total cache size
export const getCacheSize = async (): Promise<number> => {
  if (!('caches' in window)) return 0;
  
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      totalSize += keys.length;
    }
    
    return totalSize;
  } catch (error) {
    console.error('Error calculating cache size:', error);
    return 0;
  }
};

// Enhanced cache management utilities
export const clearAppCache = async (): Promise<void> => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('App cache cleared');
  }
};

// Get detailed cache information
export const getCacheInfo = async (): Promise<{ name: string; size: number; keys: string[] }[]> => {
  if (!('caches' in window)) return [];

  const cacheNames = await caches.keys();
  const cacheInfo = await Promise.all(
    cacheNames.map(async (name) => {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      const keyUrls = keys.map(key => key.url);
      return { name, size: keys.length, keys: keyUrls };
    })
  );

  return cacheInfo;
};

// Force update the service worker
export const forceUpdate = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log('Service Worker update triggered');
    }
  }
};

// Check if the app is ready for offline use
export const isReadyForOffline = async (): Promise<boolean> => {
  const status = await getPWAStatus();
  return status.hasServiceWorker && status.isCached;
};

// Get offline readiness percentage
export const getOfflineReadiness = async (): Promise<number> => {
  if (!('caches' in window)) return 0;
  
  try {
    const cacheNames = await caches.keys();
    const staticCache = cacheNames.find(name => name.includes('static'));
    
    if (!staticCache) return 0;
    
    const cache = await caches.open(staticCache);
    const keys = await cache.keys();
    
    // Calculate readiness based on essential files
    const essentialFiles = ['/', '/index.html', '/manifest.json'];
    const cachedEssential = essentialFiles.filter(file => 
      keys.some(key => key.url.endsWith(file))
    );
    
    return Math.round((cachedEssential.length / essentialFiles.length) * 100);
  } catch (error) {
    console.error('Error calculating offline readiness:', error);
    return 0;
  }
};
