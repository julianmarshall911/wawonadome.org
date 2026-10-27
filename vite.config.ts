import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Keep the REACT_APP_ prefix so existing .env files keep working.
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    // firebase.json serves from build/
    outDir: 'build',
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      // Same URL as the old CRA service worker, so existing installs get
      // replaced instead of serving a stale cached app forever.
      filename: 'service-worker.js',
      manifest: false,
      // The inline register script never messages the worker, so activate
      // new versions right away rather than leaving them waiting.
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
