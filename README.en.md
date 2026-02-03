# Free NanoBanana Template

[![Tencent QQ](https://img.shields.io/badge/Tencent_QQ-%2312B7F5?style=for-the-badge&logo=qq&logoColor=white)](https://qm.qq.com/q/JNKEOfkUcA)[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/pxDeGksA34)

## Overview

A full-stack starter for the Nano Banana image generator. It includes the web UI,
image generation API, Vercel Blob storage, and Payload CMS for managing records.

## Features

- Nano Banana image generation via Gemini (ZenMux / Vertex AI).
- Vercel Blob storage for generated images.
- Payload CMS admin for browsing generated images and metadata.
- Better Auth with email/password, Google login, and One Tap support.
- Stripe subscriptions for Pro plan billing.
- Next.js App Router with Tailwind + shadcn UI primitives.
- Bun-first scripts for installs and tooling.

## Tech Stack

- Next.js 16 / React 19
- Payload CMS 3 (SQLite adapter)
- Vercel Blob SDK
- Better Auth + Drizzle (Turso / libSQL)
- Tailwind CSS

## Quick Start

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=http://github.com/bestony/free-nanobanana-template&env=VERTEX_AI_APIKEY,PAYLOAD_SECRET,BETTER_AUTH_SECRET,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET&envDescription=Key%20parameters%20for%20payments%20and%20image%20generation.)

> Note: After deploy, enable Vercel Blob in your project and create a `BLOB_READ_WRITE_TOKEN` (Vercel Storage), then add it to Environment Variables.

1. Install dependencies

```
bun install
```

2. Create environment variables (see below).

3. Start the dev server

```
bun run dev
```

4. Open the app

```
http://localhost:3000
```

## Environment Variables

Create `.env` or `.env.local` and set the following:

```
# Image generation (required)
VERTEX_AI_APIKEY=your_zenmux_key
# Optional: override the default base URL
VERTEX_AI_BASE_URL=https://zenmux.ai/api/vertex-ai

# Vercel Blob (required for uploads)
BLOB_READ_WRITE_TOKEN=your_blob_rw_token

# Payload CMS (required)
PAYLOAD_SECRET=your_payload_secret
# database
DATABASE_URL=

# Better Auth / Turso (required for auth)
BETTER_AUTH_SECRET=your_better_auth_secret

# Google OAuth + One Tap (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Stripe Billing (required for subscriptions)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
```

## Scripts

- `bun run dev`: start dev server
- `bun run build`: production build
- `bun run start`: serve production build
- `bun run lint`: ESLint
- `bun run format`: Prettier
- `bun run test`: Jest
- `bun run test:watch`: Jest watch
- `bun run test:coverage`: Jest coverage

## Project Structure

- `app/`: Next.js App Router entry, layouts, pages, and global styles
- `app/components/`: page sections (PascalCase components)
- `components/ui/`: shadcn UI primitives (kebab-case files, excluded from lint/tests)
- `hooks/`: shared React hooks
- `lib/`: shared utilities
- `payload/collections/`: Payload collections
- `__tests__/`: Jest tests
- `public/`: static assets
- `payload.db`: local Payload SQLite database (default)

## Image Generation and Storage

- API endpoint: `POST /api/generate`
- Generates an image via Gemini and returns a base64 `dataUrl`.
- Uploads the image to Vercel Blob (public access, random suffix).
- Creates a Payload CMS record in `image-records` with `title`, `imageUrl`, and `description`.
- API response includes `blobUrl` and `imageRecordId`.

## Payload CMS

- Admin UI: `http://localhost:3000/admin`
- Collection: `image-records`
- Fields: `title`, `imageUrl`, `description`, `tags`, `createdBy`

## Database Notes

- Payload uses `DATABASE_URL` (required).
- Better Auth uses Turso (libSQL) configured in `lib/auth.ts`.

## Billing Notes

- Stripe checkout: `POST /api/billing/checkout`
- Stripe customer portal: `POST /api/billing/portal`
- Stripe webhook: `POST /api/billing/webhook`
- The Pro plan price is read from `STRIPE_PRICE_ID_PRO` (default UI price is $10/month).

## Deployment

- Set the same environment variables in your hosting provider.
- Run `bun run build` and `bun run start` (or use Vercel).
- Make sure the Vercel Blob token is available in the runtime environment.

## Troubleshooting

- Payload init error: `index ... already exists`
  - If you change schema frequently, consider resetting `payload.db`
    or temporarily enabling schema push in `payload.config.ts`.
- Blob upload fails
  - Ensure `BLOB_READ_WRITE_TOKEN` is present and valid.

## LICENSE

[MIT](LICENSE)

> Legal Disclaimer: This project is an independent open-source contribution and is intended for learning purposes only. It has no official connection with Nano Banana. All trademarks belong to their respective owners.
