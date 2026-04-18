import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import { resolve } from 'path';
import manifest from './public/manifest.json';
import pkg from './package.json';

// Sync manifest version from package.json (single source of truth)
manifest.version = pkg.version;

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      '@shared': resolve(__dirname, 'src/shared'),
      '@background': resolve(__dirname, 'src/background'),
      '@devtools': resolve(__dirname, 'src/devtools'),
      '@popup': resolve(__dirname, 'src/popup'),
      '@content': resolve(__dirname, 'src/content'),
      '@data': resolve(__dirname, 'src/data'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        devtools: resolve(__dirname, 'src/devtools/panel.html'),
        popup: resolve(__dirname, 'src/popup/popup.html'),
        background: resolve(__dirname, 'src/background/index.ts'),
      },
      output: {
        entryFileNames: '[name]/index.js',
      },
    },
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
  },
});
