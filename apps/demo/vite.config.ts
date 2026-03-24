import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@byte3-it/chantilly': path.resolve(__dirname, '../../packages/sdk/src/index.ts'),
    },
  },
})
