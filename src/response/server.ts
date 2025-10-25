import OpenAI from 'openai';
import { getConfigValue } from 'alemonjs';
import { getIoRedis } from '@alemonjs/db';

let openai: OpenAI | null = null;

export const clear = () => {
  openai = null;
};

// 获取openai实例
const getOpenAI = (): OpenAI => {
  if (!openai) {
    const value = getConfigValue();
    const openaiConfig = value?.openai;

    if (!openaiConfig) {
      throw new Error('OpenAI not configured');
    }
    openai = new OpenAI({
      baseURL: openaiConfig.baseURL,
      apiKey: openaiConfig.apiKey ?? ''
    });
  }

  return openai;
};

export const chat = async (key: string, userMessage: string) => {
  const ioredis = getIoRedis();

  // 如果不存在的消息，请在redis中初始化消息
  const exists = await ioredis.exists(key);

  if (!exists) {
    await ioredis.rpush(key, JSON.stringify({ role: 'system', content: '新建对话' }));
  }

  // 将用户消息附加到REDIS列表中
  await ioredis.rpush(key, JSON.stringify({ role: 'user', content: userMessage }));

  // 检索整个消息列表
  const messages = await ioredis.lrange(key, 0, -1);
  // 将消息解析为JSON对象
  const parsedMessages = messages.map(msg => JSON.parse(msg));

  // 获取openai实例
  const openai = getOpenAI();

  const value = getConfigValue();

  // 通过openai的chat API获取对话
  const completion = await openai.chat.completions.create({
    messages: parsedMessages,
    model: value?.openai?.model
  });

  // console.log('completion', completion)

  // 将助手消息附加到REDIS列表中
  const assistantMessage = completion.choices[0].message;

  if (assistantMessage?.content) {
    await ioredis.rpush(key, JSON.stringify(assistantMessage));
  }

  // 返回助手消息
  return assistantMessage;
};

// 清理聊天记录的函数
export const clearChat = async (key: string): Promise<void> => {
  const ioredis = getIoRedis();

  await ioredis.del(key);
};
