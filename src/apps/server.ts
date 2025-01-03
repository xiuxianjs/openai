import { AI } from '@src/apps/util'
import axios, { AxiosRequestConfig } from 'axios'
import { ModelList } from './typing'
import { getConfigValue } from 'alemonjs'

const name = 'ollama'

const server = (config?: AxiosRequestConfig) => {
  const value = getConfigValue()
  if (!value) {
    new Error('请配置环境变量')
  } else {
    if (!value[name]) {
      new Error('请配置ollama')
    }
    if (!value[name].baseURL) {
      new Error('请配置ollama.baseURL')
    }
  }
  const api = axios.create({
    baseURL: value[name].baseURL,
    timeout: value[name].timeout ? value[name].timeout : 60000
  })
  return api(config)
}

export const tags = async (): Promise<ModelList> => {
  return await server({
    method: 'get',
    url: '/api/tags',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.data)
}

import { getIoRedis } from 'alemonjs'

const ioredis = getIoRedis()

type Message = {
  model: string
  created_at: string
  message: {
    role: 'assistant'
    content: string
  }
  done_reason: 'stop'
  done: true
  total_duration: number
  load_duration: number
  prompt_eval_count: number
  prompt_eval_duration: number
  eval_count: number
  eval_duration: number
}

export const chat = async (
  key: string,
  userMessage: string
): Promise<Message> => {
  // Initialize the messages in Redis if they do not exist
  const exists = await ioredis.exists(key)
  if (!exists) {
    await ioredis.rpush(
      key,
      JSON.stringify({ role: 'system', content: '新建对话' })
    )
  }

  // Append the user message to the Redis list
  await ioredis.rpush(
    key,
    JSON.stringify({ role: 'user', content: userMessage })
  )

  // Retrieve the entire message list
  const messages = await ioredis.lrange(key, 0, -1)
  const parsedMessages = messages.map(msg => JSON.parse(msg))

  const model = AI.get('model') || 'gemma2:latest'

  const response = await server({
    method: 'post',
    url: '/api/chat',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      model: model,
      messages: parsedMessages,
      stream: false
    }
  })

  const res = response.data

  // Store the assistant's response in messages
  const assistantMessage = res.message
  if (assistantMessage?.content) {
    await ioredis.rpush(key, JSON.stringify(assistantMessage))
  }

  return res
}

// 清理聊天记录的函数
export const clearChat = async (key: string): Promise<void> => {
  await ioredis.del(key)
}
