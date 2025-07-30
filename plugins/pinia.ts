// plugins/pinia.client.ts
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import type { Pinia } from 'pinia'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(nuxtApp => {
	if (import.meta.client) {
		// const pinia = nuxtApp.$pinia as Pinia
		// pinia.use(piniaPluginPersistedstate)
	}
})
