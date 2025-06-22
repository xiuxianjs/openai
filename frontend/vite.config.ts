import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react'
const NODE_ENV = process.env.NODE_ENV === 'development'
import themData from '@alemonjs/react-ui/theme.json'
export default defineConfig({
  define: {
    'process.env.ALEMONJS_CSS_VARIABLES': NODE_ENV
      ? JSON.stringify(themData)
      : '{}'
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      }
    ]
  },
  esbuild: {
    drop: NODE_ENV ? [] : ['console', 'debugger']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    minify: 'terser',
    terserOptions: {
      compress: NODE_ENV
        ? {}
        : {
            drop_console: true,
            drop_debugger: true
          }
    },
    rollupOptions: {
      output: {
        dir: '../dist',
        entryFileNames: `assets/index.js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
})
