import tailwindcss from '@tailwindcss/vite'

// import fs from 'fs';
// import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL || 'https://saf-api.mandatech.co.id/api',
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
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
    '@nuxtjs/color-mode',
    'nuxt-lottie'
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
    classSuffix: '',
  },
  lottie: {
    componentName: 'Lottie', // Optional: Customize the component name
    lottieFolder: '/assets/lottie', // Optional: Customize the Lottie folder path
    autoFolderCreation: true, // Optional: Auto create lottie folder (default: true)
    enableLogs: true // Optional: Enable console logs from module (default: true)
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
  components: {
    dirs: ['~/components/Base', 'utils'],
  },
  imports: {
    dirs: ['stores/**'],
    autoImport: true,
  },
  future: {
    typescriptBundlerResolution: true,
  },
  experimental: {
    payloadExtraction: true,
    watcher: 'parcel',
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      routes: ['/'],
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    strategies: 'generateSW',
    // injectManifest: {
    // 	swSrc: 'service-worker/sw.js'
    // },
    // strategies: 'injectManifest',
    // srcDir: 'service-worker',
    // filename: 'sw.ts',
    // ⛔️ BUKAN DI DALAM `workbox`
    // navigateFallback: false, // ✅ Ini wajib ada DI SINI kalau pakai injectManifest
    manifest: {
      id: "SAFORIGINAL",
      name: "SAFORIGINAL",
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
      protocol_handlers: [
        {
          protocol: 'web+saforiginal',
          url: '/handle-protocol?q=%s'
        }
      ],
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
          src: "/favicon/android/android-launchericon-48-48.png",
          sizes: "48x48",
          type: "image/png"
        },
        {
          src: "/favicon/android/android-launchericon-72-72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: "/favicon/android/android-launchericon-96-96.png",
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: "/favicon/ios/144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: "/favicon/android/android-launchericon-192-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        // Tambahkan icon yang lebih besar dan maskable
        {
          src: "/favicon/ios/256.png",
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: "/favicon/android/android-launchericon-512-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/favicon/android/android-launchericon-512-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ],
    },
    workbox: {
      // Kosongin navigateFallback
      navigateFallback: undefined,
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true,
      // globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg,json,webmanifest}'],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      type: 'module',
    }
  },
  // hooks: {
  //   'build:before': () => {
  //     const manifest = {
  //       id: "SAFORIGINAL",
  //       name: "SAFORIGINAL",
  //       short_name: "SAF+",
  //       scope: "/",
  //       description: "SAF ORIGINAL adalah aplikasi untuk mempermudah akses konten.",
  //       categories: ["entertainment", "utilities"],
  //       start_url: "/",
  //       display: "standalone",
  //       orientation: "portrait",
  //       background_color: "#ffffff",
  //       theme_color: "#A07C4b",
  //       lang: "id",
  //       // Tambahkan edge_side_panel untuk pengalaman yang lebih baik
  //       edge_side_panel: {
  //         preferred_width: 412
  //       },
  //       protocol_handlers: [
  //         {
  //           protocol: 'web+saforiginal',
  //           url: '/handle-protocol?q=%s'
  //         }
  //       ],
  //       screenshots: [
  //         {
  //           src: "/favicon/screenshots/home.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           form_factor: "wide",
  //           label: "Homepage SAF Original - Wide"
  //         },
  //         {
  //           src: "/favicon/screenshots/home.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           form_factor: "narrow",
  //           label: "Homepage SAF Original - Mobile"
  //         }
  //       ],
  //       icons: [
  //         // Standard icons
  //         {
  //           src: "/favicon/android/android-launchericon-48-48.png",
  //           sizes: "48x48",
  //           type: "image/png"
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-72-72.png",
  //           sizes: "72x72",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-96-96.png",
  //           sizes: "96x96",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/ios/144.png",
  //           sizes: "144x144",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-192-192.png",
  //           sizes: "192x192",
  //           type: "image/png",
  //         },
  //         // Tambahkan icon yang lebih besar dan maskable
  //         {
  //           src: "/favicon/ios/256.png",
  //           sizes: "256x256",
  //           type: "image/png",
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-512-512.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           purpose: "any"
  //         },
  //         {
  //           src: "/favicon/android/android-launchericon-512-512.png",
  //           sizes: "512x512",
  //           type: "image/png",
  //           purpose: "maskable"
  //         }
  //       ],
  //     };

  //     // Path ke file manifest.json di direktori public
  //     const manifestPath = path.resolve(process.cwd(), './public/manifest.json');

  //     // Buat direktori public jika belum ada
  //     if (!fs.existsSync(path.dirname(manifestPath))) {
  //       fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  //     }

  //     // Tulis manifest.json ke folder public
  //     fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  //     console.log('✅ Manifest generated at ./public/manifest.json');
  //   },
  // },
  app: {
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
        { name: 'msapplication-TileImage', content: '/favicon/android/android-launchericonicon-144-144.png' },
        { name: 'theme-color', content: '#A07C4b' }
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/ios/57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/ios/60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/ios/72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/ios/76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/ios/114x.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/ios/120x.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/ios/144x.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/ios/152x.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/ios/180x.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/ios/16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/ios/32.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon/android/android-launchericonicon-48-48.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/android/android-launchericonicon-96-96.png' },
        { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/favicon/android/android-launchericonicon-144-144.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android/android-launchericonicon-192-192.png' },
        { rel: 'manifest', href: '/manifest.json' } // Pastikan file ini valid!
      ]
    }
  }
})
