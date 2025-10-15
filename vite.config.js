import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Cambia '/tarea3-form/' si tu repo tiene otro nombre
export default defineConfig({
  plugins: [react()],
  base: '/tarea3-form/'
})
