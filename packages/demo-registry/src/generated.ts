import type { DemoMeta } from "./types";

export const demos: DemoMeta[] = [
  {
    "slug": "ogx-claude",
    "title": "OGX",
    "description": "A new OG Image Generator demo inside the Vibe Sites monorepo.",
    "stack": [
      "React",
      "Vite",
      "Tailwind CSS",
      "Cloudflare Workers"
    ],
    "status": "published",
    "sourcePath": "apps/demos/ogx-claude",
    "localUrl": "http://localhost:8794",
    "productionUrl": "https://vibe-demo-ogx-claude.2437951611.workers.dev"
  }
] as DemoMeta[];

export const publishedDemos: DemoMeta[] = demos.filter(
  (demo) => demo.status === "published"
);
