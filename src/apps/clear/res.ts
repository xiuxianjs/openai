import { createEventName } from '@src/apps/util'
import { Text, useSend } from 'alemonjs'
import { clearChat } from '../server'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)clear/
export default OnResponse(
  async event => {
    const Send = useSend(event)
    if (event.name == 'message.create' && !event.IsMaster) {
      Send(Text('你没有权限'))
      return
    }
    if (event.name == 'message.create') {
      clearChat(event.ChannelId)
    } else {
      clearChat(event.UserKey)
    }
    Send(Text('清除成功'))
    return
  },
  ['message.create', 'private.message.create']
)
