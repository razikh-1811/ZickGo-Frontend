import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Important for correct routing on Vercel
  plugins: [react()],
  server: {
    // optional: allows network access during local dev
    host: true,
  }
})

