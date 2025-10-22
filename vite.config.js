import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import express from './src/server/index.js';   // <-- our mini-backend

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'vite-express',
      configureServer(server) {
        // Mount Express API on the same Vite dev server
        server.middlewares.use(express);
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  base: './',
  server: {
    port: 5173,
    strictPort: true,
  },
});