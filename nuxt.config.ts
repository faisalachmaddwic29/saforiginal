import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	ssr: true,
	// nitro: {
	// 	preset: process.env.NITRO_PRESET || undefined,
	// },
	runtimeConfig: {
		apiUrl: process.env.NUXT_API_URL,
		apiVersion: process.env.NUXT_API_VERSION,
		public: {
			api: process.env.NUXT_API_FRONTEND,
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
		registerType: 'autoUpdate',
		injectRegister: 'auto',
		includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
		workbox: {
			// navigateFallback: '/',
			// navigateFallbackDenylist: [/^\/\/login-password/, /^\/\/login/], // Menolak rute tertentu
			// globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
			// runtimeCaching: [
			// 	{
			// 		urlPattern: '/',
			// 		handler: 'NetworkFirst',
			// 		options: {
			//       cacheName: 'start-page',
			//     },
			// 	}
			// ]
			navigateFallback: '/', // Fallback ke root hanya untuk rute yang tidak cocok
			// navigateFallbackDenylist: [/^\/\/login-password/, /^\/\/login/], // Tolak fallback pada rute auth
			navigateFallbackDenylist: [/^\/\//], // Tolak fallback pada semua rute di bawah /
			globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
			runtimeCaching: [
				{
					urlPattern: /^\/api\/.*$/, // Contoh: cache API dengan NetworkFirst
					handler: 'NetworkFirst',
					options: {
						cacheName: 'api-cache',
						networkTimeoutSeconds: 10,
						cacheableResponse: {
							statuses: [0, 200],
						},
					},
				},
			],
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			type: 'module',
		}
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
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: 'SAFORIGINAL' },
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
				{ rel: 'manifest', href: '/favicon/manifest.json' } // Pastikan file ini valid!
			]
		}
	}
})
