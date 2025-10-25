import { useMessage, Text } from 'alemonjs';
import { chat } from '../server.js';
import { selects } from '../index.js';

var res = onResponse(selects, async (event) => {
    const msg = event.MessageText.replace(/^(#|\/)ai/, '').trim();
    if (msg) {
        let key = event.UserKey;
        if (event.name === 'message.create') {
            key = event.ChannelId;
        }
        const [message] = useMessage(event);
        try {
            const res = await chat(key, msg);
            if (res.content) {
                void message.send(format(Text(res.content)));
            }
            else {
                void message.send(format(Text('我不知道你在说什么')));
            }
        }
        catch (e) {
            if (e.message) {
                console.error(e.message);
                void message.send(format(Text(e.message)));
                return;
            }
            console.error(e);
            void message.send(format(Text('出错啦')));
        }
    }
});

export { res as default };
