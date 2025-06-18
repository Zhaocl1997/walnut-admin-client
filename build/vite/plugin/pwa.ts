import { VitePWA } from 'vite-plugin-pwa'

// https://alexop.dev/posts/create-pwa-vue3-vite-4-steps/
// still got problems, but offline mode seem to work in dev mode
export function createPWAPlugin() {
  return VitePWA({
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    injectRegister: 'auto',
    includeAssets: ['favicon.ico', '/assets/apple-touch-icon-180x180.png', '/pwa/maskable-icon-512x512.png'],
    pwaAssets: {
      preset: 'minimal-2023',
      overrideManifestIcons: true,
    },
    manifest: {
      id: 'walnut-admin',
      name: 'My Awesome PWA',
      short_name: 'MyPWA',
      description: 'A PWA built with Vue 3',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    workbox: {
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === 'style' || request.destination === 'script'
            || request.destination === 'worker',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'static-resources',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            },
          },
        },
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
            },
          },
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: 'module',
      navigateFallback: 'index.html',
      suppressWarnings: true,
    },
  })
}
