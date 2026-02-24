import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'mask-icon.svg', 'icon.png.png'],
      workbox: {
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/]
      },
      manifest: {
        name: '모든 계산기',
        short_name: '계산기',
        description: '다양한 환경에서 편리하게 사용할 수 있는 스마트 계산기 모음',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon.png.png', // Fallback
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon.png.png', // Fallback for 512
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon.png.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
