import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Enables relative paths so dist/index.html works when opened directly in any browser
  server: {
    port: 3000,
    host: true
  }
})
