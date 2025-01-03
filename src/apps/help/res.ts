import { Text, useSend } from 'alemonjs'
export const regular = /^(#|\/)?(help|menu|菜单|帮助)/i
export default OnResponse((event, next) => {
  const Send = useSend(event)
  const messages = [
    'AI帮助',
    '/aiXXX 询问ai',
    '/list 列出所有AI',
    '/clear 清理对话[公聊需权限]',
    '/setXXX 设置AI模型[需权限]'
  ]
  Send(Text(messages.join('\n')))
  next()
  return
}, 'message.create')
