import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch:{
      usePolling:true,
    },
    proxy: { 
      "/api": {
        target: "http://backend:5000",
        changeOrigin: true,
      }
    },
    hmr: {
      clientPort: 5173,
    }
  }
})
