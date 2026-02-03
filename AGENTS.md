# Repository Guidelines

## Project Structure & Module Organization

- `app/` contains the Next.js App Router entry points (`layout.tsx`, `page.tsx`) and global styles (`globals.css`). Page sections live in `app/components/` as PascalCase components.
- `components/ui/` hosts shadcn UI primitives (kebab-case files). This directory is excluded from linting, type-checking, and test coverage.
- `hooks/` holds shared React hooks (e.g., `use-mobile.ts`), and `lib/` contains shared utilities (e.g., `lib/utils.ts`).
- `__tests__/` contains Jest tests (`*.test.tsx`). `public/` stores static assets. `coverage/` is generated test output.
- Data/CMS files live in `db/`, `drizzle/`, and `payload/`, with configuration in `drizzle.config.ts` and `payload.config.ts`.

## Build, Test, and Development Commands

Use Bun for installs and scripts:

- `bun install`: install dependencies.
- `bun run dev`: start the local Next.js dev server.
- `bun run build`: create a production build; `bun run start` serves it.
- `bun run lint`: run ESLint; `bun run format`: run Prettier.
- `bun run test`, `bun run test:watch`, `bun run test:coverage`: run Jest in standard, watch, or coverage mode.
- `bunx tsc -p tsconfig.json --noEmit`: type-check only (also run by hooks).

## Coding Style & Naming Conventions

- TypeScript is strict (`tsconfig.json`), with path alias `@/` for the repo root.
- Formatting is handled by Prettier; follow existing 2-space indentation and JSX style.
- ESLint uses Next.js core-web-vitals + TypeScript presets; `components/ui/` is ignored.
- Naming: React components use PascalCase filenames in `app/components/`; hooks start with `use-`; tests use `*.test.tsx` in `__tests__/`.

## Testing Guidelines

- Jest + Testing Library are configured in `jest.config.mjs` and `jest.setup.ts`.
- Place new tests in `__tests__/` and keep unit tests focused on components and utilities.
- `components/ui/` is excluded from test discovery and coverage reporting.

## Commit & Pull Request Guidelines

- Commit messages follow Conventional Commits and are enforced by commitlint: `feat`, `fix`, `docs`, `test`, `ci` (example: `feat: add pricing section`).
- Lefthook runs format/lint/typecheck/test on pre-commit, commitlint on commit-msg, and lint/test/build on pre-push.
- PRs should include a concise description, list of changes, and screenshots for UI updates. Ensure CI (lint/test/build) is green before requesting review.
