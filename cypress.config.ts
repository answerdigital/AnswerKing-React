import { defineConfig } from 'cypress';
export default defineConfig({
  component: {
    viewportHeight: 1280,
    viewportWidth: 1920,
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
