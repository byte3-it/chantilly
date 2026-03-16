import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['firebase', 'firebase/storage', '@byte3-it/landing-page-builder'],
  treeshake: true,
})
