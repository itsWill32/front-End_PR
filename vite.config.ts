import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Athlete Band',
        short_name: 'Athlete Band',
        description: 'Aplicación PWA de Athlete Band',
        start_url: '/',
        display: 'standalone',
        background_color: '#1E3545',
        theme_color: '#1E3545',
        icons: [
          {
            src: '/assets/ATHLETEBANDLogo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/ATHLETEBANDLogo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
