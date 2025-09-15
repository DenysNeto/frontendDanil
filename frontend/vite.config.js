import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: '../static/react-build',
    emptyOutDir: true,
    assetsDir: 'assets'
  },
  base: '/static/react-build/'
})