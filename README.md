# openai

必要环境 `nodejs` 、`redis` 、`chrome`

该扩展推荐使用`alemongo`作为生产环境

https://github.com/lemonade-lab/alemongo

## 安装

### alemongo

- 唤醒

`/ai帮助`

地址

```sh
https://github.com/xiuxianjs/openai.git
```

分支

```sh
release
```

### 本地模板

```sh
git clone --depth=1 -b release  https://github.com/xiuxianjs/openai.git ./packages/openai
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

### Redis

将以默认配置连接本地redis,

如需调整，请阅读[@alemonjs/db](https://www.npmjs.com/package/@alemonjs/db)配置连接,

如需使用docker请参考[docker-compose.yml](./docker-compose.yml)

```sh
# 启动
docker-compose up -d
```

```sh
docker-compose down
```

> 机器人全部使用redis存储，请务必启动redis持久化存储
