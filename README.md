# openai

必要环境 `nodejs` 、`redis` 、`chrome`

该扩展推荐使用 [`alemongo`🔗](https://github.com/lemonade-lab/alemongo/releases) 作为生产环境。

如果你是一名非技术人员，可使用 [`alemondesk`🔗](https://github.com/lemonade-lab/alemondesk/releases) 桌面版。

### 安装

- 方式1: 拉取release分支

地址

```sh
https://github.com/xiuxianjs/xiuxian-plugin.git
```

分支

```sh
release
```

- 方式2: 从npm中安装

```sh
yarn add alemonjs-open -W
```

## 使用

使用 `/ai帮助` 唤醒

### Redis

将以默认配置连接本地redis,

如需调整，请阅读[@alemonjs/db](https://www.npmjs.com/package/@alemonjs/db)配置连接,

如需使用docker请参考[docker-compose.yml](./docker-compose.yml)

```sh
# 启动
docker-compose up -d
```

```sh
# 关闭
docker-compose down
```

## 连接模型

支持连接符合openai接口的模型

- openai

https://platform.openai.com/docs/overview

```yaml
apiKey: ''
model: 'gpt-4o'
```

- deepseek

https://api-docs.deepseek.com

```yaml
baseURL: 'https://api.deepseek.com'
apiKey: ''
model: 'deepseek-chat'
# 可选 deepseek-reasoner (R1)
```

- ollama

> 可本地部署的开源模型

https://ollama.com/

```yaml
baseURL: 'http://localhost:11434/v1/'
apiKey: ''
model: 'llama3.2'
```
