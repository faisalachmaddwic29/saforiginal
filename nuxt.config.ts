export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
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
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    // includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'splashscreens/apple-splash-640x1136.png'],
    includeAssets: ['favicon.ico'],
    workbox: {
      // navigateFallback: '/offline.html',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fakestoreapi\.com\/.*$/,
          handler: 'NetworkFirst',
          method: 'GET',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 300
            }
          }
        },
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
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    devOptions: {
      enabled: true,
      type: 'module',
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Produk sample dengan Nuxt dan Tailwind' },
        // { name: 'apple-mobile-web-app-capable', content: 'yes' },
        // { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/192.png' },
        // { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        // { rel: 'apple-touch-startup-image', href: '/splashscreens/apple-splash-640x1136.png' }
      ]
    }
  }
});
