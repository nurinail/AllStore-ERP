import { defineConfig } from 'vite'
import reactPlugin from '@vitejs/plugin-react'

// Manual code-splitting (istəyə bağlı)
export default defineConfig({
  plugins: [reactPlugin()],
  base: '/AllStore-ERP/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd']
        }
      }
    },
    chunkSizeWarningLimit: 1200
  }
})
