import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
