/// <reference lib="WebWorker" />

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
// import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { clientsClaim, skipWaiting } from 'workbox-core'

// ⚠️ Wajib untuk service worker injectManifest
declare let self: ServiceWorkerGlobalScope

// ✅ Tambahkan root ("/") ke precache agar tidak error fallback
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

skipWaiting()
clientsClaim()

// 🔧 Clean cache lama & klaim control segera
cleanupOutdatedCaches()

// ✅ Fallback untuk semua navigasi page (SPA)
// registerRoute(
//   ({ request }) => request.mode === 'navigate',
//   new NetworkFirst({
//     cacheName: 'page-cache',
//     networkTimeoutSeconds: 3,
//   })
// )

// ✅ Cache HTML root khusus juga (boleh digabung dengan yang atas)
// registerRoute(
//   /^\/$/,
//   new NetworkFirst({
//     cacheName: 'html-cache',
//     networkTimeoutSeconds: 3,
//   })
// )

// ✅ Cache file statis: JS, CSS, dll
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'assets-cache',
  })
)

// ✅ Cache gambar
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'image-cache',
  })
)

// ✅ Cache font
registerRoute(
	({ request }) => request.destination === 'font',
	new StaleWhileRevalidate({
		cacheName: 'font-cache',
	})
)
