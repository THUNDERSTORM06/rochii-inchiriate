import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Căi relative, ca site-ul să funcționeze pe GitHub Pages indiferent de numele repository-ului.
export default defineConfig({
  base: './',
  plugins: [react()],
})
