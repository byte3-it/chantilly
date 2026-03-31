import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@byte3-it/chantilly/export': path.resolve(__dirname, '../../packages/sdk/src/export/index.ts'),
      '@byte3-it/chantilly': path.resolve(__dirname, '../../packages/sdk/src/index.ts'),
    },
  },
  server: {
    proxy: {
      '/api/mailgun-eu': {
        target: 'https://api.eu.mailgun.net',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/mailgun-eu/, ''),
      },
      '/api/mailgun-us': {
        target: 'https://api.mailgun.net',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/mailgun-us/, ''),
      },
    },
  },
})
