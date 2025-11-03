import { Button, Input } from '@alemonjs/react-ui'
import React, { useEffect, useState } from 'react'

export default function Form() {
  const [formData, setFormData] = useState({
    baseURL: '',
    apiKey: '',
    model: ''
  })

  useEffect(() => {
    if (!window.createDesktopAPI) return
    const API = window.createDesktopAPI()
    // 获取消息
    API.postMessage({
      type: 'get.config'
    })
    // 监听消息
    API.onMessage(e => {
      if (e.type === 'post.config') {
        const db = e.data
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
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const API = window.createDesktopAPI()
    API.postMessage({
      type: 'save.config',
      data: formData
    })
  }

  return (
    <form onSubmit={handleSubmit} className="py-4 space-y-4">
      <div>
        <label
          htmlFor="baseURL"
          className="block text-sm font-medium text-gray-700"
        >
          baseURL
        </label>
        <Input
          type="text"
          id="baseURL"
          name="baseURL"
          value={formData.baseURL}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border  rounded-md focus:outline-none focus:ring "
        />
      </div>
      <div>
        <label
          htmlFor="apiKey"
          className="  block text-sm font-medium text-gray-700"
        >
          apiKey
        </label>
        <Input
          type="text"
          id="apiKey"
          name="apiKey"
          value={formData.apiKey}
          placeholder="sad12345678,kfp12345678,sgs12345678"
          onChange={handleChange}
          className="mt-1 block w-full p-2 border  rounded-md focus:outline-none focus:ring "
        />
      </div>
      <div>
        <label
          htmlFor="model"
          className="  block text-sm font-medium text-gray-700"
        >
          model
        </label>
        <Input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          placeholder="sad12345678,kfp12345678,sgs12345678"
          onChange={handleChange}
          className="mt-1 block w-full p-2 border  rounded-md focus:outline-none focus:ring "
        />
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
