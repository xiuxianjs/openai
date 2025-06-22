import { Text, useMessage } from 'alemonjs'
import { chat } from '../server'
import { selects } from '@src/apps/index'
export const regular = /^(#|\/)ai/
export default onResponse(selects, async event => {
  const msg = event.MessageText.replace(regular, '').trim()
  if (msg) {
    let key = event.UserKey
    if (event.name == 'message.create') {
      key = event.ChannelId
    }
    const [message] = useMessage(event)
    try {
      const res = await chat(key, msg)
      if (res.content) {
        message.send(format(Text(res.content)))
      } else {
        message.send(format(Text('我不知道你在说什么')))
      }
    } catch (e) {
      // 得到错误信息
      if (e.message) {
        console.error(e.message)
        message.send(format(Text(e.message)))
        return
      }
      console.error(e)
      message.send(format(Text('出错啦')))
    }
  }
  return
})
