# Free NanoBanana Template

[![Tencent QQ](https://img.shields.io/badge/Tencent_QQ-%2312B7F5?style=for-the-badge&logo=qq&logoColor=white)](https://qm.qq.com/q/JNKEOfkUcA)[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/pxDeGksA34)

## Overview

A full-stack starter for the Nano Banana image generator. It includes the web UI,
image generation API, Vercel Blob storage, and Payload CMS for managing records.

## Features

- Nano Banana image generation via Gemini (ZenMux / Vertex AI).
- Vercel Blob storage for generated images.
- Payload CMS admin for browsing generated images and metadata.
- Better Auth with email/password and GitHub provider support.
- Next.js App Router with Tailwind + shadcn UI primitives.
- Bun-first scripts for installs and tooling.

## Tech Stack

- Next.js 16 / React 19
- Payload CMS 3 (SQLite adapter)
- Vercel Blob SDK
- Better Auth + Drizzle (Turso / libSQL)
- Tailwind CSS

## Quick Start

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
ZENMUX_API_KEY=your_zenmux_key
# Optional: override the default base URL
ZENMUX_BASE_URL=https://zenmux.ai/api/vertex-ai

# Vercel Blob (required for uploads)
BLOB_READ_WRITE_TOKEN=your_blob_rw_token

# Payload CMS (required)
PAYLOAD_SECRET=your_payload_secret
# Optional: defaults to local sqlite file
DATABASE_URL=file:./payload.db

# Better Auth / Turso (required for auth)
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=your_turso_token

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
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

- Payload uses SQLite via `DATABASE_URL` (defaults to `payload.db`).
- Better Auth uses Turso (libSQL) configured in `lib/auth.ts`.

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
