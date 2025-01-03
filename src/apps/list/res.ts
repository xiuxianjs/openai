import { createEventName, formatSize } from '@src/apps/util'
import { Text, useSend } from 'alemonjs'
import { tags } from '../server'
export const name = createEventName(import.meta.url)
export const regular = /^(#|\/)list/
export default OnResponse(
  async event => {
    const Send = useSend(event)
    try {
      const data = await tags()
      const models = data.models.map(
        model =>
          `${model.name}(${formatSize(model.size)},${model.details.parameter_size})`
      )
      Send(Text(['模型列表', ...models].join('\n')))
    } catch (e) {
      console.error(e)
      Send(Text('获取失败'))
    }
    return
  },
  ['message.create', 'private.message.create']
)
