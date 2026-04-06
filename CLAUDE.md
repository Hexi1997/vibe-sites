# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a pnpm monorepo for experimental website demos. The `hub` is a demo directory page, and each demo is deployed as an independent Cloudflare Worker. The repository uses workspace scripts for registry generation and CI/CD.

## Workspace Structure

- `apps/hub` - Demo directory page (published demos listing)
- `apps/demos/*` - Independent demo projects, each with its own build config and Wrangler config
- `packages/demo-registry` - Generated metadata consumed by the hub
- `scripts/` - Workspace automation scripts
  - `generate-demo-registry.mjs` - Scans `apps/demos/*/demo.config.json` and generates registry
  - `new-demo.mjs` - Interactive scaffolder for creating new demos
  - `detect-deploy-targets.mjs` - CI: detects which demos need deployment
  - `wait-for-path.mjs` - Waits for file existence (used in dev scripts)
  - `clean.mjs` - Cleans build artifacts

## Common Commands

```bash
# Install dependencies
pnpm install

# Start development (runs hub + all demos in parallel with registry watching)
pnpm dev

# Build hub and all demos
pnpm build

# Deploy hub and all published demos
pnpm deploy

# Deploy only demos
pnpm deploy:demos

# Deploy only hub
pnpm deploy:hub

# Regenerate demo registry manually
pnpm run generate:registry

# Create a new demo interactively
pnpm new:demo
# Or with arguments: pnpm new:demo <slug> [react|nextjs]
```

## Demo Configuration

Each demo at `apps/demos/<slug>` must include:
- `demo.config.json` - Metadata source of truth for hub listing and deployment
- Build config (`vite.config.ts` or `next.config.ts`)
- `wrangler.jsonc` - Cloudflare Worker configuration
- Framework-specific entry files

`demo.config.json` fields:
- `slug`, `title`, `description` - Required
- `stack` - Array of tech names
- `status` - `"published"` or `"draft"` (only published appear on hub and deploy in CI)
- `localUrl` - URL for local development
- `productionUrl` - URL for deployed demo

## Available Templates

- `react` - React + Vite + Cloudflare Workers
- `nextjs` - Next.js + OpenNext + Cloudflare Workers + Tailwind CSS

## Key Technical Details

### Demo Registry Generation

The registry at `packages/demo-registry/src/generated.ts` is auto-generated from all `demo.config.json` files. Regenerate after:
- Creating a new demo
- Changing a demo's `status`
- Updating `productionUrl`

Both `pnpm dev` and `pnpm build` automatically regenerate the registry.

### Demo Development Server

Each demo uses a unique port (auto-incremented starting at 8790). Dev scripts use `concurrently` to:
1. Watch build with Vite
2. Wait for `dist/public/index.html` to exist
3. Start Wrangler dev server with unique `--port` and `--inspector-port`

### CI/CD Deployment (GitHub Actions)

Workflow at `.github/workflows/deploy.yml`:
1. `detect-deploy-targets.mjs` extracts affected demos from changed file paths (`apps/demos/<slug>/...`)
2. Filters to only `status: "published"` demos
3. Uses dynamic matrix to deploy only changed demos
4. Deploys hub if hub files or demo metadata changed

Manual full deployment via `workflow_dispatch` with `deploy_all: true`.

### Cloudflare Credentials

Required secrets in GitHub:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

For local deployment, ensure env vars are set:
```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
```

## Tech Stack

- **Package Manager**: pnpm 10.30.0
- **Runtime**: Node.js 22
- **Frameworks**: React 19, Next.js 16 (via OpenNext)
- **Build**: Vite 7+
- **Deploy**: Wrangler 4+, Cloudflare Workers
- **Styling**: Tailwind CSS 4
- **TypeScript**: 5.9+
