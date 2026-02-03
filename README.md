# Free NanoBanana Template

[![Tencent QQ](https://img.shields.io/badge/Tencent_QQ-%2312B7F5?style=for-the-badge&logo=qq&logoColor=white)](https://qm.qq.com/q/JNKEOfkUcA)[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/pxDeGksA34)

## 概览

Nano Banana 图像生成器的全栈模板。内置 Web UI、图像生成 API、Vercel Blob 存储，以及用于管理记录的 Payload CMS。

## 功能特性

- 基于 Gemini（ZenMux / Vertex AI）的 Nano Banana 图像生成。
- Vercel Blob 存储生成的图片。
- Payload CMS 后台管理生成记录与元数据。
- Better Auth（邮箱/密码 + GitHub）登录支持。
- Stripe 订阅计费（Pro 计划）。
- Next.js App Router + Tailwind + shadcn UI primitives。
- Bun 优先的脚本与工具链。

## 技术栈

- Next.js 16 / React 19
- Payload CMS 3（SQLite 适配器）
- Vercel Blob SDK
- Better Auth + Drizzle（Turso / libSQL）
- Tailwind CSS

## 快速开始

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=http://github.com/bestony/free-nanobanana-template&env=ZENMUX_API_KEY,BLOB_READ_WRITE_TOKEN,PAYLOAD_SECRET,DATABASE_URL,TURSO_DATABASE_URL,TURSO_AUTH_TOKEN,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,STRIPE_PRICE_ID_PRO&envDescription=Set%20required%20env%20vars%20for%20image%20generation%2C%20storage%2C%20auth%2C%20and%20billing.)

> 提示：部署后请在 Vercel 中启用 Blob，并生成 `BLOB_READ_WRITE_TOKEN`（Vercel Storage），加入环境变量。

1. 安装依赖

```
bun install
```

2. 配置环境变量（见下方）

3. 启动开发服务

```
bun run dev
```

4. 访问应用

```
http://localhost:3000
```

## 环境变量

创建 `.env` 或 `.env.local` 并设置如下变量：

```
# 图像生成（必填）
ZENMUX_API_KEY=your_zenmux_key
# 可选：覆盖默认的 base URL
ZENMUX_BASE_URL=https://zenmux.ai/api/vertex-ai

# Vercel Blob（上传必填）
BLOB_READ_WRITE_TOKEN=your_blob_rw_token

# Payload CMS（必填）
PAYLOAD_SECRET=your_payload_secret
DATABASE_URL=file:./payload.db

# Better Auth / Turso（认证必填）
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=your_turso_token

# GitHub OAuth（可选）
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Stripe 订阅计费（订阅必填）
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
```

## 脚本

- `bun run dev`: 启动开发服务
- `bun run build`: 生产构建
- `bun run start`: 启动生产服务
- `bun run lint`: ESLint
- `bun run format`: Prettier
- `bun run test`: Jest
- `bun run test:watch`: Jest watch
- `bun run test:coverage`: Jest coverage

## 目录结构

- `app/`: Next.js App Router 入口、布局、页面与全局样式
- `app/components/`: 页面区块（PascalCase 组件）
- `components/ui/`: shadcn UI primitives（kebab-case 文件，已排除 lint/tests）
- `hooks/`: 通用 React hooks
- `lib/`: 工具与共享逻辑
- `payload/collections/`: Payload 集合
- `__tests__/`: Jest 测试
- `public/`: 静态资源
- `payload.db`: Payload 本地 SQLite 数据库（默认）

## 图像生成与存储

- API: `POST /api/generate`
- 通过 Gemini 生成图像并返回 base64 `dataUrl`
- 上传到 Vercel Blob（public + random suffix）
- 在 `image-records` 中创建记录（`title`、`imageUrl`、`description`）
- API 响应包含 `blobUrl` 和 `imageRecordId`

## Payload CMS

- 后台：`http://localhost:3000/admin`
- 集合：`image-records`
- 字段：`title`, `imageUrl`, `description`, `tags`, `createdBy`

## 数据库说明

- Payload 使用 `DATABASE_URL`（必填）。
- Better Auth 使用 Turso（libSQL），配置见 `lib/auth.ts`。

## 订阅计费说明

- Stripe Checkout：`POST /api/billing/checkout`
- Stripe 客户门户：`POST /api/billing/portal`
- Stripe Webhook：`POST /api/billing/webhook`
- Pro 计划价格读取 `STRIPE_PRICE_ID_PRO`（UI 默认 $10/月）

## 部署

- 在部署平台设置相同的环境变量。
- 运行 `bun run build` 与 `bun run start`（或使用 Vercel）。
- 确保运行环境中有 `BLOB_READ_WRITE_TOKEN`。

## 常见问题

- Payload 初始化错误：`index ... already exists`
  - 如果频繁修改 schema，可重置 `payload.db`，或临时在 `payload.config.ts` 中启用 schema push
- Blob 上传失败
  - 检查 `BLOB_READ_WRITE_TOKEN` 是否存在且有效

## LICENSE

[MIT](LICENSE)

> 免责声明：该项目为独立的开源学习项目，与 Nano Banana 官方无任何关联。所有商标归各自所有者所有。
