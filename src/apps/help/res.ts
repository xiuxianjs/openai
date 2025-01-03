import { Text, useSend } from 'alemonjs'
// 使用方法合并成一个
export const regular = /^(#|\/)?(help|menu|菜单|帮助)/i
export default OnResponse((event, next) => {
  const Send = useSend(event)
  const messages = ['AI帮助', '/aiXXX 询问ai', '/list 列出所有AI']
  Send(Text(messages.join('\n')))
  next()
  return
}, 'message.create')
