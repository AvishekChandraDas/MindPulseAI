# MindPulse AI

Educational mental wellness screening platform.

## Tech stack

- Next.js 15 (App Router)
- React, TypeScript
- Tailwind CSS
- (Planned) Prisma, PostgreSQL, Auth.js, React Hook Form, Zod, OpenAI, Resend, Recharts, Framer Motion

## Prerequisites

- Node.js 20+
- npm

## Getting started

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                       |
| ------------------- | --------------------------------- |
| `npm run dev`       | Start Next.js in development mode |
| `npm run build`     | Production build                  |
| `npm run start`     | Start production server           |
| `npm run lint`      | Run ESLint                        |
| `npm run format`    | Format code with Prettier         |
| `npm run typecheck` | TypeScript check without emit     |

## Project structure

Application code lives under `src/`:

- `app/` — App Router routes, layouts, and global styles
- `components/` — Reusable UI (client and server components)
- `hooks/` — Client-side React hooks
- `lib/` — Shared utilities and helpers
- `server/` — Server-only modules (services, actions)
- `types/` — Shared TypeScript types
- `constants/` — Application constants

Import paths use the `@/*` alias (maps to `src/*`).

## License

Private — all rights reserved.
