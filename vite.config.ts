import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  css: { preprocessorOptions: { scss: { quietDeps: true } } },
  plugins: [react()],
  resolve: {
    alias: {
      assets: resolve(__dirname, 'src/assets'),
      components: resolve(__dirname, 'src/components'),
      dtos: resolve(__dirname, 'src/dtos'),
      hooks: resolve(__dirname, 'src/hooks'),
      pages: resolve(__dirname, 'src/pages'),
      services: resolve(__dirname, 'src/services'),
      style: resolve(__dirname, 'src/style'),
      utilities: resolve(__dirname, 'src/utilities'),
    },
  },
  server: {
    fs: { strict: true },
    proxy: {
      '/api': {
        target: 'https://localhost:44333', //<-- add url for the API here:
        secure: false,
      },
    },
  },
});
