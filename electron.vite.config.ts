import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import   AutoImport  from 'unplugin-auto-import/vite';
import  Components  from 'unplugin-vue-Components/vite';
import {  ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@assetes': resolve('src/renderer/src/assets'),
        '@components': resolve('src/renderer/src/components'),
        '@router': resolve('src/renderer/src/router'),
        '@store': resolve('src/renderer/src/store'),
        '@views': resolve('src/renderer/src/views'),
        '@utils': resolve('src/renderer/src/utils'),
        '@api': resolve('src/renderer/src/api'),
      
      }
    },
    server: {
 "proxy": {
     '/api': {
       target: 'http://ai-tools.ga.skyvault.cn:38080',
       changeOrigin: true,
       rewrite: (path) => path.replace(/^\/api/, '')
     }
 }
  },
    plugins: [
      vue(),
      AutoImport({
      resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ]
  }

})
