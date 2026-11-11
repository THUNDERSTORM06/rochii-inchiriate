import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Căi relative, ca site-ul să funcționeze pe GitHub Pages indiferent de numele repository-ului.
// Fișierele generate primesc doar un hash ca nume (fără „index”, „Admin” etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'r/[hash:12].js',
        chunkFileNames: 'r/[hash:12].js',
        assetFileNames: 'r/[hash:12][extname]',
      },
    },
  },
})
