import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/REST-Countries-Single-Page-Web-Application/',
  server: {
    host: '0.0.0.0', // Allow external access
    port: 3000,      // This should match the port exposed in docker-compose
  },
  sourcemap: false, // Change to false to prevent eval() usage in dev
})