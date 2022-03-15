import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: '/login' // 默认到登录页面
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@images': path.resolve(__dirname, './src/assets/images'),
      '@css': path.resolve(__dirname, './src/assets/css'),
      '@components': path.resolve(__dirname, './src/components'),
      '@views': path.resolve(__dirname, './src/views'),      
      '@store': path.resolve(__dirname, './src/store'),         
      '@router': path.resolve(__dirname, './src/router'),
      '@dev-data': path.resolve(__dirname, './src/dev-data'),
    },
  }
})
