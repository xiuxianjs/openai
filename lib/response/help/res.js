import { useMessage, Text } from 'alemonjs';
import { selects } from '../index.js';

const res = onResponse(selects, event => {
    const [message] = useMessage(event);
    const messages = ['【openAI】助手', '/aiXXX 询问ai', '/ai-clear 清理对话[公聊需权限]', '/ai-set 设置 config.yaml', '例: /set model gpt-4o'];
    void message.send(format(Text(messages.join('\n'))));
});

export { res as default };
