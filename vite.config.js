import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RegonPL',
      formats: ['cjs', 'es', 'umd'],
      fileName: 'index',
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
