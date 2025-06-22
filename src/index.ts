export default defineChildren({
  onCreated() {
    logger.info({
      message: '启动 OpenAI 插件'
    })
  }
})
