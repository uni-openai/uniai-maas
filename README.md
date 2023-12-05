<!-- @format -->

# <img src="./logo.png" width=31 height=31 /> UniAI

[简体中文说明](./README_CN.md)

![Framework](./framework.png)

## Integrated Models

-   [OpenAI/GPT](https://platform.openai.com)
-   [IFLYTEK/Spark](https://xinghuo.xfyun.cn)
-   [THUDM/ChatGLM-6B](https://github.com/THUDM/ChatGLM3)
-   [ZHIPU/ChatGLM-Turbo](https://github.com/THUDM/ChatGLM3)
-   [Stable Diffusion](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
-   [OpenAI/DALL-E](https://platform.openai.com)
-   [Midjourney](https://github.com/novicezk/midjourney-proxy)

## Samples

Who are using UniAI and where can I experience it?

![wechat miniapps](./miniapp-qrcode.png)

## About UniAI

UniAI is designed to simplify your interactions with multiple and complex AI models.

We aim to provide a united API-based platform that integrates various AI models and utilities.

## Requirements

Before you start, make sure you have:

-   Node.js >= 16 <https://github.com/nvm-sh/nvm>
-   Docker & Docker-compose
-   LibreOffice (libreoffice-convert)
-   pdf-to-img (canvas-node): <https://www.npmjs.com/package/canvas>

## Getting Started

### Configuration

1. Create a `.env` file at the root directory:

```bash
touch ./.env
```

2. Fill in the environment parameters in the `.env` file as follows:

```bash

# APP
ADMIN_TOKEN=    # default admin token, can be modified in config table

# OPENAI GPT
OPENAI_API=http://8.214.93.3                        # OpenAI API URL or proxy
OPENAI_API_VERSION=v1                               # OpenAI API version (no need to modify)
OPENAI_API_KEY=                                     # OpenAI API key

# GLM
GLM_API=http://10.144.1.7:8100              # https://github.com/uni-openai/GLM-API
GLM_API_REMOTE=https://open.bigmodel.cn     # remote ZHIPU chatglm API
GLM_API_KEY=                                # ZHIPU AI api key

# SPARK
SPARK_API=ws://spark-api.xf-yun.com
SPARK_API_KEY=      # IFLYTEK Spark API KEY
SPARK_API_SECRET=   # IFLYTEK Spark API Secret
SPARK_APP_ID=       # IFLYTEK Spark APP ID

# PostgreSQL database
DB_DIALECT=postgres
POSTGRES_HOST=localhost     # postgresql host url
POSTGRES_PORT=5432          # postgresql port
POSTGRES_USER=postgres      # postgresql user
POSTGRES_PASSWORD=postgres  # postgresql password
POSTGRES_DB=uniai           # postgresql db

# Redis cache
REDIS_HOST=localhost        # Redis cache host url
REDIS_PORT=6379             # Redis cache host port
REDIS_PASSWORD=redis
REDIS_DB=0

# WeChat
WX_APP_ID=                      # wechat app id
WX_APP_SECRET=                  # wechat app secret
WX_APP_AUTH_URL=https://api.weixin.qq.com/sns/jscode2session
WX_APP_ACCESS_TOKEN_URL=https://api.weixin.qq.com/cgi-bin/token
WX_APP_PHONE_URL=https://api.weixin.qq.com/wxa/business/getuserphonenumber
WX_APP_MSG_CHECK=https://api.weixin.qq.com/wxa/msg_sec_check

OSS_TYPE=minio

# MINIO storage
MINIO_ACCESS_KEY=
MINIO_SECRET_KEY=
MINIO_END_POINT=localhost
MINIO_PORT=9000
MINIO_BUCKET=uniai

# Google Search
GOOGLE_SEARCH_API_TOKEN=
GOOGLE_SEARCH_ENGINE_ID=

# Stable Diffusion
STABLE_DIFFUSION_API=http://10.144.1.7:3400

MID_JOURNEY_API=        # visit https://github.com/novicezk/midjourney-proxy
MID_JOURNEY_TOKEN=      # mj-proxy token

```

### Installation

We recommend using `yarn` instead of `npm`:

```bash
npm -g install yarn
yarn
```

**Install LibreOffice**

```bash
# ubuntu
sudo apt install libreoffice

# Mac
brew install libreoffice
```

**Install node-canvas support**

<https://www.npmjs.com/package/canvas>

```bash
# For Ubuntu
sudo apt install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

#For Mac OS X,
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```

### Start DB

If you don't have a vector database such as PostgresSQL (pgvector), you can start one using Docker and Docker-compose:

```bash
sudo apt install docker.io docker-compose
```

Docker start up pgvector, redis, minio

```bash
yarn docker up pgvector
yarn docker up redis
yarn docker up minio
```

TIP: Minio is a local deployed OSS server, you should login to config your bucket and access keys after start up minio docker.

Location: <http://localhost:9000>
Default Username: root
Default Password: 12345678

Copy the keys, secrets, bucket to `.env`

## Running UniAI

### Development Mode

The following command also init database! First do it!

```bash
yarn dev
```

### Production Mode

```bash
yarn tsc
yarn start
```

**⚠️ Do not compile TypeScript files in development mode.**
**If you have run `tsc`, use `yarn clean` before `yarn dev`.**

### Cleaning Up

```bash
yarn clean
```

## Documentation

UniAI's APIs are accessed through the common Web HTTP methods including SSE.

Please refer to the documentation at the following address:
[https://documenter.getpostman.com/view/9347507/2s93Y5Pf2J](https://documenter.getpostman.com/view/9347507/2s93Y5Pf2J)

## Models

UniAI continues to integrate more AI models and extend AI utilities. However, UniAI is not a standalone entity. Since it serves as an integration and connection point for various AI models, tools, and plugins, you'll need to deploy specific models you require on your own. We provide download URLs and guides for these models.

### NLP Models

-   OpenAI GPT: [https://platform.openai.com/docs/api-reference](https://platform.openai.com/docs/api-reference)
-   GLM/ChatGLM: [https://github.com/uni-openai/GLM-API](https://github.com/uni-openai/GLM-API)
-   IFLYTEK/SPARK: [https://www.xfyun.cn/doc/spark/Web.html](https://www.xfyun.cn/doc/spark/Web.html)

### CV Models

-   OpenAI DALL-E: [https://platform.openai.com/docs/api-reference](https://platform.openai.com/docs/api-reference)
-   Stable Diffusion: [https://github.com/uni-openai/stable-diffusion-simple](https://github.com/uni-openai/stable-diffusion-simple)
-   MidJourney: [https://github.com/novicezk/midjourney-proxy](https://github.com/novicezk/midjourney-proxy)

## Future Plans

UniAI will offer more AI capabilities across the following key features:

-   Prediction APIs
-   Training APIs
-   Prompting APIs
-   Resource APIs

![future features](./future.png)

## Contributors

Welcome your contributions!

Reach out to Youwei <huangyw@iict.ac.cn> for more development information.

_Powered by [Egg.js](https://www.eggjs.org/) TypeScript_
