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

export const messages = {
  //
}

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

export const chat = async (key: string, message: string): Promise<Message> => {
  if (!messages[key]) {
    messages[key] = []
    messages[key].push({
      role: 'system',
      content: '新建对话'
    })
  }
  messages[key].push({
    role: 'user',
    content: message
  })
  if (messages[key].length > 30) {
    messages[key].shift()
  }
  const model = AI.get('model') || 'gemma2:latest'
  return await server({
    method: 'post',
    url: '/api/chat',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      model: model,
      messages: messages[key],
      stream: false
    }
  }).then(res => res.data)
}
