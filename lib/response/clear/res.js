import { useMessage, Text } from 'alemonjs';
import { clearChat } from '../server.js';
import { selects } from '../index.js';

var res = onResponse(selects, event => {
    const [message] = useMessage(event);
    if (event.name === 'message.create' && !event.IsMaster) {
        void message.send(format(Text('你没有权限')));
        return;
    }
    if (event.name === 'message.create') {
        void clearChat(event.ChannelId);
    }
    else {
        void clearChat(event.UserKey);
    }
    void message.send(format(Text('清除成功')));
});

export { res as default };
