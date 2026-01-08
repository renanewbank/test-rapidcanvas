import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/predict': 'http://127.0.0.1:8000',
      '/model': 'http://127.0.0.1:8000',
      '/categories': 'http://127.0.0.1:8000',
      '/health': 'http://127.0.0.1:8000',
      '/docs': 'http://127.0.0.1:8000',
      '/openapi.json': 'http://127.0.0.1:8000'
    }
  }
})