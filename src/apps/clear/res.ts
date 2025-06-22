import { createEventName } from '@src/apps/util'
import { Text, useMessage } from 'alemonjs'
import { clearChat } from '../server'
import { selects } from '@src/apps/index'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)ai-clear/
export default onResponse(selects, async event => {
  const [message] = useMessage(event)
  if (event.name == 'message.create' && !event.IsMaster) {
    message.send(format(Text('你没有权限')))
    return
  }
  if (event.name == 'message.create') {
    clearChat(event.ChannelId)
  } else {
    clearChat(event.UserKey)
  }
  message.send(format(Text('清除成功')))
  return
})
