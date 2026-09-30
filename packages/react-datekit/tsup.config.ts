import { defineConfig } from 'tsup';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    const distDir = resolve(__dirname, 'dist');
    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }

    const cssFiles = [
      'variables.css',
      'base.css',
      'presets.css',
      'header.css',
      'grid.css',
      'picker.css',
      'time-selector.css',
      'footer.css',
      'responsive.css',
      'input.css',
    ];

    const bundledCss = cssFiles
      .map((f) => readFileSync(resolve(__dirname, 'src/styles', f), 'utf-8'))
      .join('\n\n');

    writeFileSync(resolve(distDir, 'style.css'), bundledCss, 'utf-8');
    console.log('✓ Successfully bundled modular styles into dist/style.css');
  },
});
