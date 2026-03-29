import type { DemoMeta } from "./types";

export const demos: DemoMeta[] = [
  {
    "slug": "landing-page-gsap",
    "title": "Landing Page Gsap",
    "description": "A new React demo inside the Vibe Sites monorepo.",
    "stack": [
      "React",
      "Vite",
      "Cloudflare Workers"
    ],
    "status": "published",
    "sourcePath": "apps/demos/landing-page-gsap",
    "localUrl": "http://localhost:8790",
    "productionUrl": "https://vibe-demo-landing-page-gsap.2437951611.workers.dev"
  },
  {
    "slug": "landing-page-vite-threejs",
    "title": "Landing Page Vite Threejs",
    "description": "A new React demo inside the Vibe Sites monorepo.",
    "stack": [
      "React",
      "Vite",
      "Cloudflare Workers"
    ],
    "status": "published",
    "sourcePath": "apps/demos/landing-page-vite-threejs",
    "localUrl": "http://localhost:8791",
    "productionUrl": "https://vibe-demo-landing-page-vite-threejs.2437951611.workers.dev"
  }
] as DemoMeta[];

export const publishedDemos: DemoMeta[] = demos.filter(
  (demo) => demo.status === "published"
);
