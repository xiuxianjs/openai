import { getConfig, Text, useMessage } from 'alemonjs'
import { clear } from '../server'
import { selects } from '@src/apps/index'

export const regular = /^(#|\/)ai-set/

const res = onResponse(selects, async event => {
  const [message] = useMessage(event)

  if (!event.IsMaster) {
    message.send(format(Text('你没有权限')))
    return
  }
  // /ai set key value
  const msg = event.MessageText.replace(regular, '').split(' ')
  if (msg.length > 3) {
    message.send(format(Text('参数错误')))
    return
  }
  const key = msg[1]
  if (key === 'apiKey' || key === 'baseURL') {
    clear()
  }
  const value = msg[2]
  const config = getConfig()
  config.value.openai[key] = value
  config.saveValue(config.value)
  message.send(format(Text(`设置成功${key}:${value}`)))
  return
})

export default res
