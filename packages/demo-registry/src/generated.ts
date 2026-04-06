import type { DemoMeta } from "./types";

export const demos: DemoMeta[] = [
  {
    "slug": "ogx-claude",
    "title": "Ogx Claude",
    "description": "A new React demo inside the Vibe Sites monorepo.",
    "stack": [
      "React",
      "Vite",
      "Tailwind CSS",
      "Cloudflare Workers"
    ],
    "status": "published",
    "sourcePath": "apps/demos/ogx-claude",
    "localUrl": "http://localhost:8794",
    "productionUrl": ""
  }
] as DemoMeta[];

export const publishedDemos: DemoMeta[] = demos.filter(
  (demo) => demo.status === "published"
);
