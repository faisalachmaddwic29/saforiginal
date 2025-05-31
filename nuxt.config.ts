export default defineNuxtConfig({
	compatibilityDate: '2025-05-15',
	devtools: { enabled: false },
	ssr: true,
	nitro: {
		preset: 'vercel'
	},
	postcss: {
		plugins: {
						tailwindcss: {},
						autoprefixer: {},
		}
	},
	runtimeConfig: {
		apiUrl: process.env.NUXT_API_URL,
		public: {
			api: process.env.NUXT_API_FRONTEND
		},
	},
	modules: [
		'@nuxt/eslint',
		'@nuxt/fonts',
		'@nuxt/icon',
		'@nuxtjs/tailwindcss',
		'@vite-pwa/nuxt',
		'@nuxtjs/color-mode',
		'@nuxt/image'
	],
	// Color Mode
	colorMode: {
		preference: 'system',      // bisa 'dark' atau 'system'
		fallback: 'light',
		storageKey: 'nuxt-color-mode',
		classSuffix: '',           // biar class-nya jadi 'dark', bukan 'dark-mode'
	},
	css: ['~/assets/css/main.css'],
	// Fonts
	fonts: {
		families: [
						// Lato
						{
										name: 'Lato',
										src: '/fonts/Lato/Lato-Regular.ttf',
										weight: 400,
										style: 'normal',
						},
						// Poppins
						{
										name: 'Poppins',
										src: '/fonts/Poppins/Poppins-Regular.ttf',
										weight: 400,
										style: 'normal',
						},
						// Manrope
						{
										name: 'Manrope',
										src: '/fonts/Manrope/Manrope.ttf',
										weight: 400,
										style: 'normal',
						},
		],
		defaults: {
						weights: ['400'],
						styles: ['normal'],
						preload: true,
		}
	},
	pwa: {
		registerType: 'autoUpdate',
		injectRegister: 'auto',
		// includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'splashscreens/apple-splash-640x1136.png'],
		includeAssets: ['favicon.ico'],
		workbox: {
						// navigateFallback: '/offline.html',
						runtimeCaching: [
							{
											urlPattern: '/',
											handler: 'NetworkFirst'
							}
						]
		},
		manifest: {
			name: 'Nuxt Tailwind PWA',
			short_name: 'TailwindPWA',
			lang: 'id',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#A07C4b',
			start_url: '/',
			scope: '/',
			icons: [
				{
					src: '/192.png',
					sizes: '192x192',
					type: 'image/png'
				},
				{
					src: '/512.png',
					sizes: '512x512',
					type: 'image/png'
				},
				{
					src: '/favicon/apple-icon-180x180.png',
					sizes: '180x180',
					type: 'image/png',
					purpose: 'any maskable'
				}
			]
		},
		devOptions: {
			enabled: true,
			suppressWarnings: true,
			type: 'module',
		}
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
							{ name: 'apple-mobile-web-app-capable', content: 'yes' },
							{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
							{ name: 'msapplication-TileColor', content: '#ffffff' },
							{ name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
							{ name: 'theme-color', content: '#A07C4b' }
						],
						link: [
							{ rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
							{ rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
							{ rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
							{ rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
							{ rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
							{ rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
							{ rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
							{ rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
							{ rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
							{ rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
							{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
							{ rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
							{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
							{ rel: 'manifest', href: '/favicon/manifest.json' }
					]
		}
	}
});
