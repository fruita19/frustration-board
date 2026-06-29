import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({ preset: 'node-server' }),
    viteReact(),
    tailwindcss(), 
  ],
})