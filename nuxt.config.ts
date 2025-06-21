import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

const sw = process.env.SW === 'true'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: false },
	ssr: true,
	nitro: {
		preset: process.env.NITRO_PRESET || undefined,
		// Add static file handling
		publicAssets: [
			{
				baseURL: '/',
				dir: 'public'
			}
		],
		// Handle PWA routes
		routeRules: {
			'/manifest.json': {
				headers: { 'Content-Type': 'application/json' }
			},
			'/sw.js': {
				headers: { 'Content-Type': 'application/javascript' }
			},
			'/workbox-*.js': {
				headers: { 'Content-Type': 'application/javascript' }
			}
		}
	},
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
		(_: any, nuxt: any) => {
			nuxt.hook('pwa:beforeBuildServiceWorker', (options: any) => {
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
		prefix: '',
		componentDir: './components/ui'
	},
	css: ['~/assets/css/tailwind.css', 'vue-sonner/style.css'],
	vite: {
		plugins: [tailwindcss()],
		build: {
			sourcemap: false,
		},
	},
	pwa: {
		strategies: sw ? 'injectManifest' : 'generateSW',
		srcDir: sw ? 'service-worker' : undefined,
		filename: sw ? 'sw.ts' : undefined,
		registerType: 'autoUpdate',
		// Disable PWA in development to avoid issues
		disable: process.env.NODE_ENV === 'development',
		manifest: {
			id: "/",
			name: "SAF ORIGINAL",
			short_name: "SAF+",
			scope: "/",
			description: "SAF ORIGINAL adalah aplikasi untuk mempermudah akses konten.",
			categories: ["entertainment", "utilities"],
			start_url: "/",
			display: "standalone",
			orientation: "portrait",
			background_color: "#ffffff",
			theme_color: "#A07C4b",
			lang: "id",
			// Tambahkan edge_side_panel untuk pengalaman yang lebih baik
			edge_side_panel: {
				preferred_width: 412
			},
			screenshots: [
				{
					src: "/favicon/screenshots/home.png",
					sizes: "512x512",
					type: "image/png",
					form_factor: "wide",
					label: "Homepage SAF Original - Wide"
				},
				{
					src: "/favicon/screenshots/home.png",
					sizes: "512x512",
					type: "image/png",
					form_factor: "narrow",
					label: "Homepage SAF Original - Mobile"
				}
			],
			icons: [
				// Standard icons
				{
					src: "/favicon/android/android-icon-36x36.png",
					sizes: "36x36",
					type: "image/png",
				},
				{
					src: "/favicon/android/android-icon-48x48.png",
					sizes: "48x48",
					type: "image/png"
				},
				{
					src: "/favicon/android/android-icon-72x72.png",
					sizes: "72x72",
					type: "image/png",
				},
				{
					src: "/favicon/android/android-icon-96x96.png",
					sizes: "96x96",
					type: "image/png",
				},
				{
					src: "/favicon/android/android-icon-144x144.png",
					sizes: "144x144",
					type: "image/png",
				},
				{
					src: "/favicon/android/android-icon-192x192.png",
					sizes: "192x192",
					type: "image/png",
				},
				// Tambahkan icon yang lebih besar dan maskable
				{
					src: "/favicon/android/android-icon-256x256.png",
					sizes: "256x256",
					type: "image/png",
				},
				{
					src: "/favicon/android/android-icon-384x384.png",
					sizes: "384x384",
					type: "image/png",
				},
				{
					src: "/favicon/android/android-icon-512x512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "any"
				},
				{
					src: "/favicon/android/android-icon-512x512-maskable.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "maskable"
				}
			],
			// Tambahkan shortcuts untuk quick actions
			shortcuts: [
				{
					name: "Beranda",
					short_name: "Home",
					description: "Kembali ke halaman utama",
					url: "/",
					icons: [
						{
							src: "/favicon/android/android-icon-96x96.png",
							sizes: "96x96"
						}
					]
				}
			]
		},
		workbox: {
			cleanupOutdatedCaches: true,
			skipWaiting: true,
			clientsClaim: true,
			// Add globIgnores to prevent certain files from being precached
			globIgnores: [
				'**/node_modules/**/*',
				'sw.js',
				'workbox-*.js',
				'**/builds/meta/**/*'
			],
			// Runtime caching untuk performa yang lebih baik
			runtimeCaching: [
				{
					urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
					handler: 'CacheFirst',
					options: {
						cacheName: 'google-fonts-cache',
						expiration: {
							maxEntries: 10,
							maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
						}
					}
				},
				{
					urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
					handler: 'CacheFirst',
					options: {
						cacheName: 'gstatic-fonts-cache',
						expiration: {
							maxEntries: 10,
							maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
						}
					}
				},
				{
					urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'images-cache',
						expiration: {
							maxEntries: 50,
							maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
						}
					}
				},
				// Add runtime caching for API calls
				{
					urlPattern: /\/api\/.*/,
					handler: 'NetworkFirst',
					options: {
						cacheName: 'api-cache',
						networkTimeoutSeconds: 3,
						expiration: {
							maxEntries: 50,
							maxAgeSeconds: 60 * 5 // 5 minutes
						}
					}
				},
				// Cache for Nuxt build files
				{
					urlPattern: /\/_nuxt\/.*/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'nuxt-build-cache',
						expiration: {
							maxEntries: 100,
							maxAgeSeconds: 60 * 60 * 24 * 365 // 365 days
						}
					}
				}
			]
		},
		client: {
			installPrompt: true,
			// Tambahkan periodic sync jika diperlukan
			periodicSyncForUpdates: 20,
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			navigateFallback: '/',
			navigateFallbackAllowlist: [/^\/$/],
			type: 'module',
			// Reduce console noise in development
			disableDevLogs: true,
		},
	},
	// Hapus hooks build:before karena sudah ada di pwa.manifest
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
				{ name: 'description', content: 'SAF ORIGINAL - Aplikasi untuk mempermudah akses konten entertainment dan utilities' },
				{ name: 'mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'application-name', content: 'SAF ORIGINAL' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
				{ name: 'apple-mobile-web-app-title', content: 'SAF+' },
				{ name: 'msapplication-TileColor', content: '#A07C4b' },
				{ name: 'msapplication-TileImage', content: '/favicon/ms/ms-icon-144x144.png' },
				{ name: 'theme-color', content: '#A07C4b' },
				// Tambahkan meta untuk SEO dan PWA
				{ name: 'keywords', content: 'SAF, original, entertainment, utilities, aplikasi' },
				{ name: 'author', content: 'SAF Original Team' },
				{ property: 'og:title', content: 'SAF ORIGINAL' },
				{ property: 'og:description', content: 'Aplikasi untuk mempermudah akses konten' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:image', content: '/favicon/android/android-icon-192x192.png' },
			],
			link: [
				// Apple touch icons
				{ rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple/apple-icon-57x57.png' },
				{ rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple/apple-icon-60x60.png' },
				{ rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple/apple-icon-72x72.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple/apple-icon-76x76.png' },
				{ rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple/apple-icon-114x114.png' },
				{ rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple/apple-icon-120x120.png' },
				{ rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple/apple-icon-144x144.png' },
				{ rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple/apple-icon-152x152.png' },
				{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple/apple-icon-180x180.png' },
				// Standard favicons
				{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
				{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
				{ rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/android/android-icon-48x48.png' },
				{ rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/android/favicon-96x96.png' },
				{ rel: 'icon', type: 'image/png', sizes: '144x144', href: '/favicon/android/android-icon-144x144.png' },
				{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android/android-icon-192x192.png' },
				// Manifest
				{ rel: 'manifest', href: '/manifest.json' }
			]
		}
	}
})