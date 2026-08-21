/**
 * Service Worker Registration and Lifecycle Manager
 * GATE AG Prep Web Portal - PWA Offline Capability
 */

const isLocalhost = Boolean(
  typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  )
);

/**
 * Registers the Service Worker located at `./sw.js` with proper lifecycle hooks.
 * @param {Object} [config] Optional configuration callbacks: { onSuccess, onUpdate, onError }
 */
export function registerServiceWorker(config = {}) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.info('[PWA] Service Workers are not supported in this browser environment.');
    return;
  }

  // Setup global network connectivity monitoring
  setupNetworkListeners();

  const registerHandler = () => {
    // Resolve relative sw.js path
    const swUrl = `./sw.js`;

    navigator.serviceWorker
      .register(swUrl, { scope: './' })
      .then((registration) => {
        console.log(`[PWA] ServiceWorker registered with scope: ${registration.scope}`);

        // Check for updates on page load and visibility change
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available (previous controller active)
                console.log('[PWA] New content is available; please refresh to update.');
                window.dispatchEvent(
                  new CustomEvent('sw-updated', { detail: registration })
                );
                if (typeof config.onUpdate === 'function') {
                  config.onUpdate(registration);
                }
              } else {
                // Content cached for offline use for the first time
                console.log('[PWA] Content is cached for offline use.');
                window.dispatchEvent(
                  new CustomEvent('sw-cached', { detail: registration })
                );
                if (typeof config.onSuccess === 'function') {
                  config.onSuccess(registration);
                }
              }
            }
          });
        });

        // Trigger an update check when tab becomes visible again
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update().catch((err) => {
              console.debug('[PWA] Periodic update check skipped:', err);
            });
          }
        });
      })
      .catch((error) => {
        console.error('[PWA] Error during ServiceWorker registration:', error);
        if (typeof config.onError === 'function') {
          config.onError(error);
        }
      });
  };

  // Register only after full page load to prioritize critical initial render
  if (document.readyState === 'complete') {
    registerHandler();
  } else {
    window.addEventListener('load', registerHandler);
  }
}

/**
 * Attaches online/offline event listeners and dispatches app-level events.
 */
function setupNetworkListeners() {
  window.addEventListener('online', () => {
    console.log('[PWA] Network status: ONLINE. Synchronization active.');
    window.dispatchEvent(new CustomEvent('app-online', { detail: { isOnline: true } }));
  });

  window.addEventListener('offline', () => {
    console.log('[PWA] Network status: OFFLINE. Running in offline cache mode.');
    window.dispatchEvent(new CustomEvent('app-offline', { detail: { isOnline: false } }));
  });
}

/**
 * Returns current network connectivity status.
 * @returns {{ isOnline: boolean }}
 */
export function getNetworkStatus() {
  return {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true
  };
}

/**
 * Unregisters any active service workers.
 */
export function unregisterServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister().then(() => {
          console.log('[PWA] ServiceWorker successfully unregistered.');
        });
      })
      .catch((error) => {
        console.error('[PWA] Error unregistering ServiceWorker:', error);
      });
  }
}
