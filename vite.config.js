import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 👇 MUY IMPORTANTE: debe coincidir EXACTO con el nombre del repo
  base: '/tarea3-form/'
})
