// Empaqueta src/ en www/assets (JS + CSS + fuentes) con esbuild.
import { build } from 'esbuild';
import { rmSync } from 'node:fs';

rmSync('www/assets', { recursive: true, force: true });

await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'chrome100',
  outdir: 'www/assets',
  assetNames: '[name]-[hash]',
  loader: { '.woff2': 'file', '.woff': 'file' },
  logLevel: 'info'
});
