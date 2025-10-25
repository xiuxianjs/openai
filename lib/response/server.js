import OpenAI from 'openai';
import { getConfigValue } from 'alemonjs';
import { getIoRedis } from '@alemonjs/db';

let openai = null;
const clear = () => {
    openai = null;
};
const getOpenAI = () => {
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
const chat = async (key, userMessage) => {
    const ioredis = getIoRedis();
    const exists = await ioredis.exists(key);
    if (!exists) {
        await ioredis.rpush(key, JSON.stringify({ role: 'system', content: '新建对话' }));
    }
    await ioredis.rpush(key, JSON.stringify({ role: 'user', content: userMessage }));
    const messages = await ioredis.lrange(key, 0, -1);
    const parsedMessages = messages.map(msg => JSON.parse(msg));
    const openai = getOpenAI();
    const value = getConfigValue();
    const completion = await openai.chat.completions.create({
        messages: parsedMessages,
        model: value?.openai?.model
    });
    const assistantMessage = completion.choices[0].message;
    if (assistantMessage?.content) {
        await ioredis.rpush(key, JSON.stringify(assistantMessage));
    }
    return assistantMessage;
};
const clearChat = async (key) => {
    const ioredis = getIoRedis();
    await ioredis.del(key);
};

export { chat, clear, clearChat };
