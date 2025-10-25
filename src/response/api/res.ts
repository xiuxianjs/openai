import { Text, useMessage } from 'alemonjs';
import { chat } from '@src/response/server';
import { selects } from '@src/response/index';
export default onResponse(selects, async event => {
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
      } else {
        void message.send(format(Text('我不知道你在说什么')));
      }
    } catch (e) {
      // 得到错误信息
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
