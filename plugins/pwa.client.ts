import { defineNuxtPlugin } from "nuxt/app"
import { registerSW } from 'virtual:pwa-register'


// plugins/sw-error-handler.client.js
export default defineNuxtPlugin(() => {
	if ('serviceWorker' in navigator) {
		window.addEventListener('error', (event) => {
			if (event.error && event.error.message && event.error.message.includes('non-precached-url')) {
				console.warn('SW Cache miss:', event.error.message)
				// Prevent error from bubbling up
				event.preventDefault()
				return false
			}
		})

		window.addEventListener('unhandledrejection', (event) => {
			if (event.reason && event.reason.message && event.reason.message.includes('non-precached-url')) {
				console.warn('SW Promise rejection:', event.reason.message)
				// Prevent unhandled rejection
				event.preventDefault()
				return false
			}
		})
	}

	const updateSW = registerSW({
		immediate: true,
		onNeedRefresh() {
			updateSW(true)
			window.location.reload()
		},
		onOfflineReady() {
			// Kosongin karena kamu gak perlu offline
		}
	})
})

// export default defineNuxtPlugin((nuxtApp) => {
// 	nuxtApp.hook('service-worker:registered', ({ url, registration }) => {
// 		// eslint-disable-next-line no-console
// 		console.log(`service worker registered at ${url}`, registration)
// 	})
// 	nuxtApp.hook('service-worker:registration-failed', ({ error }) => {
// 		console.error(`service worker registration failed`, error)
// 	})
// 	nuxtApp.hook('service-worker:activated', ({ url, registration }) => {
// 		// eslint-disable-next-line no-console
// 		console.log(`service worker activated at ${url}`, registration)
// 	})
// })
