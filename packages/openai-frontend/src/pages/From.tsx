import { Button, Input } from '@alemonjs/react-ui'
import { useEffect, useState } from 'react'
export default function Form() {
  const [formData, setFormData] = useState({
    baseURL: '',
    apiKey: '',
    model: ''
  })

  useEffect(() => {
    if (!window.createDesktopAPI) return
    // 获取消息
    window.API.postMessage({
      type: 'openai.init'
    })
    window.API.onMessage(data => {
      console.log('收到消息:', data)
      if (data.type === 'openai.init') {
        const db = data.data
        setFormData({
          baseURL: db?.baseURL ?? '',
          apiKey: db?.apiKey ?? '',
          model: db?.model ?? ''
        })
      }
    })
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? e.target.checked : value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('保存的配置:', formData)
    if (!window.createDesktopAPI) return
    window.API.postMessage({
      type: 'openai.form.save',
      data: formData
    })
  }

  return (
    <form onSubmit={handleSubmit} className="py-4">
      <div>
        <div>baseURL</div>
        <Input
          id="baseURL"
          name="baseURL"
          className="w-full px-2 py-1 rounded-md"
          value={formData.baseURL}
          onChange={handleChange}
        ></Input>
      </div>{' '}
      <div>
        <div>apiKey</div>
        <Input
          id="apiKey"
          name="apiKey"
          className="w-full px-2 py-1 rounded-md"
          value={formData.apiKey}
          onChange={handleChange}
        ></Input>
      </div>
      <div>
        <div>model</div>
        <Input
          id="model"
          name="model"
          value={formData.model}
          className="w-full px-2 py-1 rounded-md"
          placeholder="模型名称"
          onChange={handleChange}
        ></Input>
      </div>
      <Button type="submit" className="px-2 py-1 w-full rounded-md">
        保存
      </Button>
    </form>
  )
}
