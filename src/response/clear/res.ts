import { Text, useMessage } from 'alemonjs';
import { clearChat } from '@src/response/server';
import { selects } from '@src/response/index';
export default onResponse(selects, event => {
  const [message] = useMessage(event);

  if (event.name === 'message.create' && !event.IsMaster) {
    void message.send(format(Text('你没有权限')));

    return;
  }
  if (event.name === 'message.create') {
    void clearChat(event.ChannelId);
  } else {
    void clearChat(event.UserKey);
  }
  void message.send(format(Text('清除成功')));
});
