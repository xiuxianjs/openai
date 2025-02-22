import { createEventName } from '@src/apps/util'
import { Text, useSend } from 'alemonjs'
import { chat } from '../server'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)ai/
export default OnResponse(
  async event => {
    const msg = event.MessageText.replace(regular, '').trim()
    if (msg) {
      let key = event.UserKey
      if (event.name == 'message.create') {
        key = event.ChannelId
      }
      const Send = useSend(event)
      try {
        const res = await chat(key, msg)
        if (res.content) {
          Send(Text(res.content))
        } else {
          Send(Text('我不知道你在说什么'))
        }
      } catch (e) {
        // 得到错误信息
        if (e.message) {
          console.error(e.message)
          Send(Text(e.message))
          return
        }
        console.error(e)
        Send(Text('出错啦'))
      }
    }
    return
  },
  ['message.create', 'private.message.create']
)
