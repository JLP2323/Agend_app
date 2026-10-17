import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind v4 se integra como plugin de Vite: no necesita tailwind.config.js
  // ni postcss.config.js. Toda la configuración vive en src/index.css.
  plugins: [react(), tailwindcss()],
})
