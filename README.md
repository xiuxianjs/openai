# Ollama AI

开发文档 https://lvyjs.dev/

开发文档 [https://alemonjs.com/](https://alemonjs.com/)

## 使用指南

`alemon.config.yaml`

```yaml
ollama:
  # 地址
  baseURL: ''
  # 默认
  timeout: 60000
```

### 立即启动

```sh
git clone --depth=1 https://github.com/lemonade-lab/ollama.git
cd ollama
```

```sh
npm install yarn@1.19.1 -g --registry=https://registry.npmmirror.com
yarn install
```

```sh
yarn dev
```

### 模块化

> 请确保配置有packages空间，详情请阅读开发文档

```sh
git clone --depth=1 https://github.com/lemonade-lab/ollama.git ./packages/ollama
```

```sh
npx lerna run build
```

## 交流

QQ Group 806943302
