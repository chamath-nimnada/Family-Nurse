import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // If we are running 'npm run dev', base is '/'
    // If we are running 'npm run build', base is your GitHub repo name
    base: command === 'serve' ? '/' : '/Family-Nurse/',
  }
})