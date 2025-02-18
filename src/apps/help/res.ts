import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?(help|menu|菜单|帮助)/i
export default OnResponse((event, next) => {
  const Send = useSend(event)
  const messages = [
    '【openAI】助手',
    '/aiXXX 询问ai',
    '/clear 清理对话[公聊需权限]',
    '/set 设置 config.yaml',
    '例: /set model gpt-4o'
  ]
  Send(Text(messages.join('\n')))
  next()
  return
}, 'message.create')
