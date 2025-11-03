import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getConfig, getConfigValue } from 'alemonjs';
import { Context } from '@alemonjs/process';

// 当前目录
const __dirname = dirname(fileURLToPath(import.meta.url));

const extensionName = 'alemonjs-openai';

const getAppConfig = () => {
  const values = getConfigValue();
  const value = values ? values[extensionName] : null;

  return value ?? {};
};

// 被激活的时候。
export const activate = (context: Context) => {
  // 创建一个 webview。
  const webView = context.createSidebarWebView(context);

  // 当命令被触发的时候。
  context.onCommand('open.openai', () => {
    const dir = join(__dirname, '../', 'dist', 'index.html');
    const scriptReg = /<script.*?src="(.+?)".*?>/;
    const styleReg = /<link.*?rel="stylesheet".*?href="(.+?)".*?>/;
    const iconReg = /<link.*?rel="icon".*?href="(.+?)".*?>/g;
    // 创建 webview 路径
    const styleUri = context.createExtensionDir(join(__dirname, '../', 'dist', 'assets', 'index.css'));
    const scriptUri = context.createExtensionDir(join(__dirname, '../', 'dist', 'assets', 'index.js'));
    // 确保路径存在
    const html = readFileSync(dir, 'utf-8')
      .replace(iconReg, '')
      .replace(scriptReg, `<script type="module" crossorigin src="${scriptUri}"></script>`)
      .replace(styleReg, `<link rel="stylesheet" crossorigin href="${styleUri}">`);

    // 立即渲染 webview
    webView.loadWebView(html);
  });

  // 监听 webview 的消息。
  webView.onMessage(e => {
    try {
      if (e.type === 'get.config') {
        const config = getAppConfig();

        // 发送消息
        webView.postMessage({
          type: 'post.config',
          data: config
        });
      } else if (e.type === 'save.config') {
        const config = getConfig();
        let value = config.value;

        if (!value) {
          value ||= {};
        }
        value[extensionName] = {
          ...(value ?? {}),
          ...(e?.data ?? {})
        };

        config.saveValue(value);
      }
    } catch (e) {
      console.error(e);
    }
  });
};
