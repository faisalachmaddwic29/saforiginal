/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

// Gunakan self.__WB_MANIFEST untuk pre-cache otomatis
precacheAndRoute(self.__WB_MANIFEST)

// Bersihkan aset lama
cleanupOutdatedCaches()

// Konfigurasi navigasi fallback
let allowlist: undefined | RegExp[]
if (import.meta.env.DEV) {
  allowlist = [/^\/$/, /^\/sw.js$/];
}
registerRoute(
  new NavigationRoute(createHandlerBoundToURL('/'), { allowlist })
)

self.skipWaiting()
clientsClaim()
