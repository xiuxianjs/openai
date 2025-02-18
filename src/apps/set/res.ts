import { createEventName } from '@src/apps/util'
import { getConfig, Text, useSend } from 'alemonjs'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)set/
export default OnResponse(
  async event => {
    const Send = useSend(event)
    // if (!event.IsMaster) {
    //   Send(Text('你没有权限'))
    //   return
    // }
    //    /ai set key value
    const msg = event.MessageText.replace(regular, '').split(' ')
    if (msg.length > 3) {
      Send(Text('参数错误'))
      return
    }
    const key = msg[1]
    const value = msg[2]
    const config = getConfig()
    config.value.openai[key] = value
    config.saveValue(config.value)
    Send(Text(`设置成功${key}:${value}`))
    return
  },
  ['message.create', 'private.message.create']
)
