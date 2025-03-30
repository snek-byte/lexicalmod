import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  base: '/lexicalmod/',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
})