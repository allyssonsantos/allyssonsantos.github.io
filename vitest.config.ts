// <reference types="vitest" />
// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      'contentlayer/generated': path.resolve(
        __dirname,
        './.contentlayer/generated',
      ),
      'contentlayer/client': path.resolve(
        __dirname,
        './node_modules/contentlayer/dist/client',
      ),
      'next-contentlayer2/hooks': path.resolve(
        __dirname,
        './node_modules/next-contentlayer2/dist/hooks',
      ),
      'next-i18next.config': path.resolve(
        __dirname,
        './next-i18next.config.js',
      ),
      src: path.resolve(__dirname, './src'),
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
