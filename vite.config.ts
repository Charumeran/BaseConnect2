import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: '/Assignment/',
  plugins: [react()],
  build: {sourcemap: true,},
  base: process.env.NODE_ENV === "production" ? "/BaseConnect2/" : "/",
})
