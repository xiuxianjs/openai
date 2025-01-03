import { AI, createEventName } from '@src/apps/util'
import { Text, useSend } from 'alemonjs'
import { tags } from '../server'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)set/
export default OnResponse(
  async event => {
    if (!event.IsMaster) return
    const Send = useSend(event)
    const name = event.MessageText.replace(regular, '')
    try {
      const data = await tags()
      const models = data.models.find(model => model.name === name)
      if (!models) {
        Send(Text('没有找到模型'))
        return
      }
      AI.set('model', models.model)
      Send(Text('设置成功'))
    } catch (e) {
      console.error(e)
      Send(Text('获取失败'))
    }
    return
  },
  ['message.create', 'private.message.create']
)
