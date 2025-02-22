# openai

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

- 唤醒

`/help`

## 环境

`alemon.config.yaml`

```yaml
openai:
  baseURL: ''
  apiKey: ''
  model: ''
# 需安装redis进行对话存储
redis:
  host: '127.0.0.1'
  port: '6379'
  password: ''
  db: '1'
```

- 如果使用docker启动redis

```yml
services:
  redis:
    image: redis:6.2-alpine
    container_name: redis-container
    ports:
      - '6379:6379'
```

```sh
# 启动
docker-compose up -d
```

### 使用

> 请确保已安装alemonjs机器人

```sh
yarn add alemonjs-openai @alemonjs/db -W
```

```yaml
apps:
  - 'alemonjs-openai'
```
