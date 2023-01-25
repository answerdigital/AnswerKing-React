import {defineConfig} from 'cypress';
import * as fs from 'fs';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    env: {
      headersBlocklist: [
        'access-control-allow-origin',
        'access-control-allow-credentials',
      ],
      ignoreDefaultBlocklist: true,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readFile(filename) {
          console.log(filename);
          return fs.readFileSync(filename, 'utf8')
        }, // implement node event listeners here
      });
    }
  }
});
