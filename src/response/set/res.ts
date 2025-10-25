import { getConfig, Text, useMessage } from 'alemonjs';
import { clear } from '@src/response/server';
import { selects } from '@src/response/index';

const res = onResponse(selects, event => {
  const [message] = useMessage(event);

  if (!event.IsMaster) {
    void message.send(format(Text('你没有权限')));

    return;
  }
  // /ai set key value
  const msg = event.MessageText.replace(/^(#|\/)ai-set/, '').split(' ');

  if (msg.length > 3) {
    void message.send(format(Text('参数错误')));

    return;
  }
  const key = msg[1];

  if (key === 'apiKey' || key === 'baseURL') {
    clear();
  }
  const value = msg[2];
  const config = getConfig();

  if (config.value) {
    config.value.openai[key] = value;
  }

  config.saveValue(
    config.value
      ? config.value
      : {
          openai: { [key]: value }
        }
  );

  void message.send(format(Text(`设置成功${key}:${value}`)));
});

export default res;
