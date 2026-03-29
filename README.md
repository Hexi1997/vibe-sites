# Vibe Sites

A `pnpm` monorepo for experimental website demos where the hub and every demo deploy as independent Cloudflare Worker projects.

## Structure

- `apps/hub`: a standalone Worker project for the directory page
- `apps/demos/*`: standalone Worker projects for individual demos
- `packages/demo-registry`: generated metadata consumed by the hub

## Commands

- `pnpm install`: install workspace dependencies
- `pnpm dev`: generate the registry, then run hub and demo dev servers in parallel
- `pnpm build`: build the hub and all demos independently
- `pnpm deploy`: deploy the hub and all demos
- `pnpm deploy:hub`: deploy only the hub Worker
- `pnpm deploy:demos`: deploy only demo Workers
- `pnpm new:demo <slug> [react|nextjs]`: scaffold a new demo

## Demo Contract

Each demo lives under `apps/demos/<slug>` and must include:

- `demo.config.json` with `slug`, `title`, `description`, `stack`, `status`, `localUrl`, and `productionUrl`
- a framework-specific build config such as `vite.config.ts` or `next.config.ts`
- a `wrangler.jsonc` file so the demo is a complete deployable Worker app
- an app entry point that works from the site root because the demo owns its own domain or workers.dev URL

React demos use Vite plus a small Worker asset handler in `worker/index.ts`.
Next.js demos use OpenNext with `wrangler.jsonc` pointing at `.open-next/worker.js` and `.open-next/assets`.
For Next.js demos, `build` runs `next build`, while `build:worker` prepares the Cloudflare deployable output through OpenNext.

Only demos with `"status": "published"` appear on the hub.

## Publishing Flow

- Deploy each demo independently and copy its live URL into `productionUrl`
- Re-run `pnpm generate:registry`
- Deploy the hub so the directory page links to the updated demo URLs
