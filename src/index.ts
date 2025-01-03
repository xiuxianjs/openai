import { defineChildren } from 'alemonjs'
export default defineChildren(() => ({
  async onCreated() {
    console.info('ollama')
  }
}))
