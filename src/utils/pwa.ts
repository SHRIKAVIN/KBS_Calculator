// PWA Utility Functions

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

// Register service worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered successfully:', registration);
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

// Get PWA installation status
export const getPWAStatus = () => {
  return {
    isInstalled: isPWAInstalled(),
    isInstallable: isPWAInstallable(),
    isOffline: isOffline(),
    hasServiceWorker: 'serviceWorker' in navigator,
  };
};

// Cache management utilities
export const clearAppCache = async (): Promise<void> => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('App cache cleared');
  }
};

// Get cache storage info
export const getCacheInfo = async (): Promise<{ name: string; size: number }[]> => {
  if (!('caches' in window)) return [];

  const cacheNames = await caches.keys();
  const cacheInfo = await Promise.all(
    cacheNames.map(async (name) => {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      return { name, size: keys.length };
    })
  );

  return cacheInfo;
};
