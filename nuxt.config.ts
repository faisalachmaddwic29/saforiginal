import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

const sw = process.env.SW === 'true'
// console.log(sw);


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: false },
	ssr: true,
	// nitro: {
	// 	preset: process.env.NITRO_PRESET || undefined,
	// },
	runtimeConfig: {
		public: {
			api: process.env.NUXT_API_FRONTEND,
			apiUrl: process.env.NUXT_API_URL,
			apiVersion: process.env.NUXT_API_VERSION,
			sw: process.env.SW || 'false',
		},
	},
	modules: [
		'@nuxt/eslint',
		'@nuxt/icon',
		'@nuxt/image',
		'@pinia/nuxt',
		'shadcn-nuxt',
		['@nuxtjs/google-fonts',
			{
				families: {
					Lato: [100, 200, 300, 400, 500, 600, 700, 800, 900],
					Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
					Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
					Manrope: [100, 200, 300, 400, 500, 600, 700, 800, 900],
				}
			}
		],
		'@vite-pwa/nuxt',
		(_, nuxt) => {
			nuxt.hook('pwa:beforeBuildServiceWorker', (options) => {
				console.log('pwa:beforeBuildServiceWorker: ', options.base)
			})
		},
		'@nuxtjs/color-mode'
	],
	colorMode: {
		preference: 'system',
		fallback: 'light',
		storageKey: 'nuxt-color-mode',
		classSuffix: '',
	},
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui'
	},
	css: ['~/assets/css/tailwind.css', 'vue-sonner/style.css'],
	vite: {
		plugins: [
			tailwindcss(),
		],
		build: {
			sourcemap: false, // Matikan sourcemap untuk build production
		},
	},
	pwa: {
		strategies: sw ? 'injectManifest' : 'generateSW',
		srcDir: sw ? 'service-worker' : undefined,
		filename: sw ? 'sw.ts' : undefined,
		registerType: 'autoUpdate',
		manifest: {
			"id": "/",
			"name": "SAF ORIGINAL",
			"short_name": "SAF+",
			"scope": "/",
			"description": "SAF ORIGINAL adalah aplikasi untuk mempermudah akses konten.",
			"categories": ["entertainment", "utilities"],
			"start_url": "/",
			"display": "standalone",
			"background_color": "#ffffff",
			"theme_color": "#A07C4b",
			"lang": "id",
			"screenshots": [
				{
					"src": "/favicon/screenshots/home.png",
					"sizes": "512x512",
					"type": "image/png",
					"form_factor": "wide"
				},
				{
					"src": "/favicon/screenshots/home.png",
					"sizes": "512x512",
					"type": "image/png",
					"form_factor": "narrow"
				}
			],
			"icons": [
				{
					"src": "/favicon/android/android-icon-36x36.png",
					"sizes": "36x36",
					"type": "image/png",
				},
				{
					"src": "/favicon/android/android-icon-48x48.png",
					"sizes": "48x48",
					"type": "image/png"
				},
				{
					"src": "/favicon/android/android-icon-72x72.png",
					"sizes": "72x72",
					"type": "image/png",
				},
				{
					"src": "/favicon/android/android-icon-96x96.png",
					"sizes": "96x96",
					"type": "image/png",
				},
				{
					"src": "/favicon/android/android-icon-144x144.png",
					"sizes": "144x144",
					"type": "image/png",
				},
				{
					"src": "/favicon/android/android-icon-192x192.png",
					"sizes": "192x192",
					"type": "image/png",
				}
			]
		},
		workbox: {
			cleanupOutdatedCaches: true,
			navigateFallback: '/', // Pastikan fallback ke halaman utama jika URL tidak ditemukan
			globPatterns: ['**/*.{js,css,html,png,svg,ico,json,vue}'], // Tambahkan semua ekstensi file yang dibutuhkan
			additionalManifestEntries: [
				{ url: '/', revision: null }, // Tambahkan root URL
			],
			globIgnores: [
				'**/node_modules/**',  // Abaikan `node_modules`
				'**/.cache/**',        // Abaikan file cache lokal
			],
			runtimeCaching: [
				{
					urlPattern: '/',
					handler: 'NetworkFirst',
				},
			],
		},
		injectManifest: {
			globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
		},
		client: {
			installPrompt: true,
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallback: '/',
			navigateFallbackAllowlist: [/^\/$/],
			type: 'module',
		},
	},
	hooks: {
		'build:before': () => {
			const fs = require('fs');
			const manifest = {
				"id": "/",
				"name": "SAF ORIGINAL",
				"short_name": "SAF+",
				"scope": "/",
				"description": "SAF ORIGINAL adalah aplikasi untuk mempermudah akses konten.",
				"categories": ["entertainment", "utilities"],
				"start_url": "/",
				"display": "standalone",
				"background_color": "#ffffff",
				"theme_color": "#A07C4b",
				"lang": "id",
				"screenshots": [
					{
						"src": "/favicon/screenshots/home.png",
						"sizes": "512x512",
						"type": "image/png",
						"form_factor": "wide"
					},
					{
						"src": "/favicon/screenshots/home.png",
						"sizes": "512x512",
						"type": "image/png",
						"form_factor": "narrow"
					}
				],
				"icons": [
					{
						"src": "/favicon/android/android-icon-36x36.png",
						"sizes": "36x36",
						"type": "image/png",
					},
					{
						"src": "/favicon/android/android-icon-48x48.png",
						"sizes": "48x48",
						"type": "image/png"
					},
					{
						"src": "/favicon/android/android-icon-72x72.png",
						"sizes": "72x72",
						"type": "image/png",
					},
					{
						"src": "/favicon/android/android-icon-96x96.png",
						"sizes": "96x96",
						"type": "image/png",
					},
					{
						"src": "/favicon/android/android-icon-144x144.png",
						"sizes": "144x144",
						"type": "image/png",
					},
					{
						"src": "/favicon/android/android-icon-192x192.png",
						"sizes": "192x192",
						"type": "image/png",
					}
				]
			};
			fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 2));
		},
	},
	components: {
		dirs: ['~/components/Base', 'utils'],
	},
	imports: {
		dirs: ['stores/**'],
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' },
		head: {
			htmlAttrs: { lang: 'id' },
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
				{ name: 'description', content: 'SAF ORIGINAL' },
				{ name: 'mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'application-name', content: 'SAF ORIGINAL' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
				{ name: 'msapplication-TileColor', content: '#ffffff' },
				{ name: 'msapplication-TileImage', content: '/ms/ms-icon-144x144.png' },
				{ name: 'theme-color', content: '#A07C4b' }
			],
			link: [
				{ rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple/apple-icon-57x57.png' },
				{ rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple/apple-icon-60x60.png' },
				{ rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple/apple-icon-72x72.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple/apple-icon-76x76.png' },
				{ rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple/apple-icon-114x114.png' },
				{ rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple/apple-icon-120x120.png' },
				{ rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple/apple-icon-144x144.png' },
				{ rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple/apple-icon-152x152.png' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple/apple-icon-180x180.png' },
				{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
				{ rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/android/android-icon-48x48.png' },
				{ rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/android/favicon-96x96.png' },
				{ rel: 'icon', type: 'image/png', sizes: '144x144', href: '/favicon/android/android-icon-144x144.png' },
				{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android/android-icon-192x192.png' },
				{ rel: 'manifest', href: '/manifest.json' } // Pastikan file ini valid!

			]
		}
	}
})
