import { defineConfig } from 'lvyjs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const alemonjs = () => import('alemonjs').then(res => res.start('src/index.ts'))
export default defineConfig({
  plugins: [
    () => {
      return alemonjs
    }
  ],
  alias: {
    entries: [{ find: '@src', replacement: join(__dirname, 'src') }]
  },
  build: {
    typescript: {
      removeComments: true
    }
  }
})
