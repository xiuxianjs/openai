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
    if (!window.API) {
      const API = window.createDesktopAPI()
      window.API = API
    }
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="block text-sm font-medium ">baseURL</div>
        <Input
          id="baseURL"
          name="baseURL"
          className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring "
          value={formData.baseURL}
          onChange={handleChange}
        ></Input>
      </div>{' '}
      <div>
        <div className="block text-sm font-medium ">apiKey</div>
        <Input
          id="apiKey"
          name="apiKey"
          className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring "
          value={formData.apiKey}
          onChange={handleChange}
        ></Input>
      </div>
      <div>
        <div className="block text-sm font-medium ">model</div>
        <Input
          id="model"
          name="model"
          value={formData.model}
          className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring "
          placeholder="模型名称"
          onChange={handleChange}
        ></Input>
      </div>
      <Button
        type="submit"
        className="w-full  p-2 rounded-md  transition duration-200"
      >
        保存
      </Button>
    </form>
  )
}
