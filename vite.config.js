import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dinner/',
  plugins: [
    vue(),
    VitePWA({
      // prompt(default) or autoUpdate
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        // when using generateSW the PWA plugin will switch to classic
        // vite 在 dev 模式下會使用瀏覽器原生的 ESModule
        type: 'module'
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'Eat Dinner',
        short_name: 'Eat Dinner',
        description: 'Choose what to eat for dinner!!',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        display: 'standalone'
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/sheets\.googleapis\.com/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'google-sheets-cache'
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
