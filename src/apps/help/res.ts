import { Text, useMessage } from 'alemonjs'
import { selects } from '..'
export const regular = /^(#|\/)?(help|menu|菜单|帮助)/i

const res = onResponse(selects, (event, next) => {
  const [message] = useMessage(event)
  const messages = [
    '【openAI】助手',
    '/aiXXX 询问ai',
    '/ai-clear 清理对话[公聊需权限]',
    '/ai-set 设置 config.yaml',
    '例: /set model gpt-4o'
  ]
  message.send(format(Text(messages.join('\n'))))
  next()
  return
})

export default res
