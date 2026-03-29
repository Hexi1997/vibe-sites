# Vibe Sites

[English](./README.md) | [中文](./README-CN.md)

This is **Hexi's Vibe Websites repository**, a `pnpm` monorepo for experimental website demos.  
The `hub` works as the demo directory page, each demo is deployed as an independent Cloudflare Worker project, and the root workspace handles shared scripts, registry generation, and CI/CD.

## What This Repo Does

- Manages multiple website demos in one monorepo
- Allows each demo to use a different tech stack
- Deploys each demo independently to Cloudflare Workers
- Provides one hub page to list and link published demos
- Supports dynamic GitHub Actions deployment without hard-coding demo names

## Structure

- `apps/hub`
  The demo directory page. It reads generated demo metadata and renders the list.
- `apps/demos/*`
  Independent demo projects. Each demo owns its build config, Wrangler config, and deploy command.
- `packages/demo-registry`
  Generated metadata consumed by the hub.
- `scripts/generate-demo-registry.mjs`
  Scans `apps/demos/*/demo.config.json` and generates the registry file.
- `scripts/new-demo.mjs`
  Interactive scaffolder for creating new demos.
- `scripts/detect-deploy-targets.mjs`
  Detects which demos need deployment and whether the hub should deploy in GitHub Actions.
- `.github/workflows/deploy.yml`
  Dynamic CI/CD workflow for hub and demos.

## Common Commands

- `pnpm install`
  Install workspace dependencies.
- `pnpm dev`
  Generate the registry and start local development services for hub and demos in parallel.
- `pnpm build`
  Build the hub and all demos independently.
- `pnpm deploy`
  Deploy currently targeted published demos plus the hub.
- `pnpm deploy:demos`
  Deploy demos only.
- `pnpm deploy:hub`
  Deploy the hub only.
- `pnpm run generate:registry`
  Regenerate the demo registry file.
- `pnpm new:demo`
  Start the interactive demo scaffolder.

## Creating a New Demo

Run:

```bash
pnpm new:demo
```

The script will ask for:

- `slug`
- `template`

Currently supported templates:

- `react`
  React + Vite + Cloudflare Workers
- `nextjs`
  Next.js + OpenNext + Cloudflare Workers + Tailwind CSS

You can also pass arguments directly:

```bash
pnpm new:demo my-demo
pnpm new:demo my-demo react
pnpm new:demo my-next-demo nextjs
```

## Demo Contract

Each demo lives under `apps/demos/<slug>` and should include at least:

- `demo.config.json`
- a framework build config such as `vite.config.ts` or `next.config.ts`
- `wrangler.jsonc`
- the framework-specific app entry files

`demo.config.json` is the source of truth for both hub listing and deployment behavior.

Typical fields:

- `slug`
- `title`
- `description`
- `stack`
- `status`
- `localUrl`
- `productionUrl`

Rules:

- Only demos with `status: "published"` appear on the hub
- Only demos with `status: "published"` are included in automatic CI deployment
- `productionUrl` is the URL used by the hub online
- `localUrl` is the URL used by the hub during local development

## Hub and Registry

The hub consumes generated data from:

- [packages/demo-registry/src/generated.ts](/Users/hexi/OpenSource/vibe-sites/packages/demo-registry/src/generated.ts)

This file is generated from every demo's `demo.config.json`, so it should not be edited manually.

You typically need to regenerate it:

- after creating a new demo
- after changing a demo's `status`
- after updating a demo's `productionUrl`

In normal usage, root `build` and `dev` already run registry generation for you.

## Deployment Model

This repository does not bundle all demos into a single Worker.

Instead:

- each demo is its own Worker project
- the hub is another Worker project
- the hub uses registry metadata to render and link demos

Benefits:

- deployments are isolated per demo
- avoids concentrating everything into one Worker bundle
- adding new demos does not require changing the deployment model

## GitHub Actions Deployment

The built-in workflow lives at:

- [.github/workflows/deploy.yml](/Users/hexi/OpenSource/vibe-sites/.github/workflows/deploy.yml)

Its flow is:

1. `detect-changes` checks which files changed
2. It extracts affected demo slugs from paths like `apps/demos/<slug>/...`
3. It filters to demos with `status: "published"`
4. `deploy-demos` uses a dynamic matrix to deploy only those changed demos
5. If hub-related files or demo metadata changed, `deploy-hub` runs afterward

Why this supports dynamic scaling:

- demo names are not hard-coded in the workflow
- the demo list is calculated from changed paths at runtime
- any new demo under `apps/demos/<slug>` is automatically picked up

Manual full deployment is also supported via `workflow_dispatch`.

## GitHub Secrets

Set these repository secrets in GitHub:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Without them, Wrangler cannot deploy in CI.

## Local Deployment Notes

If you deploy locally with Wrangler, make sure your shell has Cloudflare credentials:

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
```

Then run:

```bash
pnpm run deploy
```

## Current Notes

- If `package.json` changes, remember to commit the updated `pnpm-lock.yaml`
- If you use `git commit --amend` and then `push -f`, the workflow still works because deploy target detection now falls back when the old SHA is unavailable
- Hub visibility depends on `status: "published"`, not just whether `productionUrl` is filled
