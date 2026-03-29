import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import { createInterface } from "node:readline/promises";

const allowedTemplates = new Set(["react", "nextjs"]);
const { slug, template } = await resolveInputs();

if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error("Slug must contain only lowercase letters, numbers, and hyphens.");
  process.exit(1);
}

if (!allowedTemplates.has(template)) {
  console.error(`Unsupported template "${template}". Use react or nextjs.`);
  process.exit(1);
}

const demosDir = resolve(process.cwd(), "apps/demos");
const demoDir = resolve(demosDir, slug);

try {
  await access(demoDir, constants.F_OK);
  console.error(`Demo "${slug}" already exists.`);
  process.exit(1);
} catch {
  // Continue when the directory does not exist.
}

const existingEntries = await readdir(demosDir, { withFileTypes: true });
const existingPorts = [];

for (const entry of existingEntries) {
  if (!entry.isDirectory()) {
    continue;
  }

  try {
    const config = JSON.parse(
      await readFile(resolve(demosDir, entry.name, "demo.config.json"), "utf8")
    );
    const match = String(config.localUrl ?? "").match(/:(\d+)$/);

    if (match) {
      existingPorts.push(Number(match[1]));
    }
  } catch {
    // Ignore directories that are not yet valid demos.
  }
}

const nextPort = Math.max(8789, ...existingPorts) + 1;
const inspectorPort = nextPort + 450;
const title = slug
  .split("-")
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join(" ");

const demoConfig = template === "nextjs" ? createNextDemoConfig() : createReactDemoConfig();
const files = template === "nextjs" ? createNextTemplateFiles() : createReactTemplateFiles();

await mkdir(demoDir, { recursive: true });
await Promise.all(
  files.directories.map((directory) => mkdir(resolve(demoDir, directory), { recursive: true }))
);
await Promise.all(
  files.files.map(({ path, content }) => writeFile(resolve(demoDir, path), content))
);

console.log(`Created ${template} demo at apps/demos/${slug}`);

async function resolveInputs() {
  const cliSlug = process.argv[2]?.trim();
  const cliTemplate = process.argv[3]?.trim();

  if (cliSlug && cliTemplate) {
    return {
      slug: cliSlug,
      template: cliTemplate
    };
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error("Usage: pnpm new:demo <slug> [react|nextjs]");
    process.exit(1);
  }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    const slug = cliSlug || (await promptForSlug(readline));
    const template = cliTemplate || (await promptForTemplate(readline));

    return { slug, template };
  } finally {
    readline.close();
  }
}

async function promptForSlug(readline) {
  while (true) {
    const answer = (await readline.question("Demo slug (kebab-case): ")).trim();

    if (!answer) {
      console.log("Slug is required.");
      continue;
    }

    if (!/^[a-z0-9-]+$/.test(answer)) {
      console.log("Use lowercase letters, numbers, and hyphens only.");
      continue;
    }

    return answer;
  }
}

async function promptForTemplate(readline) {
  while (true) {
    const answer = (
      await readline.question("Template [react/nextjs] (default: react): ")
    )
      .trim()
      .toLowerCase();

    const template = answer || "react";

    if (allowedTemplates.has(template)) {
      return template;
    }

    console.log("Choose either react or nextjs.");
  }
}

function createReactDemoConfig() {
  return `{
  "slug": "${slug}",
  "title": "${title}",
  "description": "A new React demo inside the Vibe Sites monorepo.",
  "stack": ["React", "Vite", "Cloudflare Workers"],
  "status": "draft",
  "localUrl": "http://localhost:${nextPort}",
  "productionUrl": ""
}
`;
}

function createNextDemoConfig() {
  return `{
  "slug": "${slug}",
  "title": "${title}",
  "description": "A new Next.js demo with OpenNext and Cloudflare Workers deployment.",
  "stack": ["Next.js", "OpenNext", "Cloudflare Workers", "Tailwind CSS"],
  "status": "draft",
  "localUrl": "http://localhost:${nextPort}",
  "productionUrl": ""
}
`;
}

function createReactTemplateFiles() {
  const packageJson = `{
  "name": "@vibe-sites/demo-${slug}",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "vite build",
    "dev": "concurrently -k -n build,worker -c magenta,green \\"vite build --watch\\" \\"node ../../../scripts/wait-for-path.mjs dist/public/index.html && wrangler dev --port ${nextPort} --inspector-port ${inspectorPort}\\"",
    "deploy": "pnpm run build && wrangler deploy"
  },
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.2.0",
    "concurrently": "^9.2.1",
    "vite": "^7.3.1",
    "wrangler": "^4.78.0"
  }
}
`;

  const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: resolve(__dirname, "./dist/public"),
    emptyOutDir: false
  }
});
`;

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

  const mainFile = `import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <main className="page">
      <p className="eyebrow">Draft demo</p>
      <h1>${title}</h1>
      <p>This starter was generated with the react template.</p>
    </main>
  );
}

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  const styles = `.page {
  width: min(840px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: 2rem 0 4rem;
  font-family: "Avenir Next", sans-serif;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
}
`;

  const wranglerConfig = `{
  "$schema": "../../../node_modules/wrangler/config-schema.json",
  "name": "vibe-demo-${slug}",
  "main": "./worker/index.ts",
  "compatibility_date": "2026-03-29",
  "assets": {
    "directory": "./dist/public",
    "binding": "ASSETS"
  }
}
`;

  const workerSource = `export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      const assetRequest = new Request(new URL("/index.html", url), request);
      return env.ASSETS.fetch(assetRequest);
    }

    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    return new Response("Not found.", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    });
  }
};
`;

  return {
    directories: ["src", "worker"],
    files: [
      { path: "package.json", content: packageJson },
      { path: "demo.config.json", content: demoConfig },
      { path: "vite.config.ts", content: viteConfig },
      { path: "index.html", content: indexHtml },
      { path: "src/main.tsx", content: mainFile },
      { path: "src/styles.css", content: styles },
      { path: "wrangler.jsonc", content: wranglerConfig },
      { path: "worker/index.ts", content: workerSource }
    ]
  };
}

function createNextTemplateFiles() {
  const packageJson = `{
  "name": "@vibe-sites/demo-${slug}",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port ${nextPort}",
    "build": "next build",
    "start": "next start --port ${nextPort}",
    "lint": "next lint",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "upload": "opennextjs-cloudflare build && opennextjs-cloudflare upload",
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview --port ${nextPort}",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv ./cloudflare-env.d.ts"
  },
  "dependencies": {
    "@opennextjs/cloudflare": "^1.17.1",
    "next": "16.1.5",
    "react": "19.1.5",
    "react-dom": "19.1.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19.1.5",
    "@types/react-dom": "^19.1.5",
    "eslint": "^9",
    "eslint-config-next": "15.4.6",
    "tailwindcss": "^4",
    "typescript": "^5.7.4",
    "wrangler": "^4.65.0"
  }
}
`;

  const tsconfig = `{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`;

  const nextEnv = `/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file is auto-managed by Next.js.
`;

  const nextConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
`;

  const openNextConfig = `import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Uncomment and customize if the demo needs persistent cache storage.
});
`;

  const wranglerConfig = `{
  "$schema": "../../../node_modules/wrangler/config-schema.json",
  "name": "vibe-demo-${slug}",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-03-29",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "binding": "ASSETS",
    "directory": ".open-next/assets"
  },
  "images": {
    "binding": "IMAGES"
  },
  "services": [
    {
      "binding": "WORKER_SELF_REFERENCE",
      "service": "vibe-demo-${slug}"
    }
  ],
  "observability": {
    "enabled": true
  }
}
`;

  const layout = `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "${title}",
  description: "A Next.js demo deployed with OpenNext on Cloudflare Workers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

  const page = `export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,_#f5f8ff_0%,_#eef7f3_100%)] text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 md:px-10">
        <p className="max-w-max rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white">
          Draft Next.js demo
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
          ${title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          This starter was generated with the nextjs template, using Next.js,
          Tailwind CSS, OpenNext, and Cloudflare Workers deployment.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "App Router structure included",
            "Tailwind CSS enabled via globals.css",
            "Wrangler wired to OpenNext output"
          ].map((item) => (
            <article
              key={item}
              className="rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 shadow-sm"
            >
              <p className="text-sm font-medium text-slate-700">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
`;

  const globalsCss = `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: "Satoshi", "Avenir Next", sans-serif;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
`;

  const postcssConfig = `const config = {
  plugins: ["@tailwindcss/postcss"]
};

export default config;
`;

  const cloudflareEnv = `// Generated by \`wrangler types --env-interface CloudflareEnv ./cloudflare-env.d.ts\`
interface CloudflareEnv {
  ASSETS: Fetcher;
  IMAGES: ImagesBinding;
  WORKER_SELF_REFERENCE: Fetcher;
}
`;

  return {
    directories: ["src/app"],
    files: [
      { path: "package.json", content: packageJson },
      { path: "demo.config.json", content: demoConfig },
      { path: "tsconfig.json", content: tsconfig },
      { path: "next-env.d.ts", content: nextEnv },
      { path: "next.config.ts", content: nextConfig },
      { path: "open-next.config.ts", content: openNextConfig },
      { path: "wrangler.jsonc", content: wranglerConfig },
      { path: "cloudflare-env.d.ts", content: cloudflareEnv },
      { path: "postcss.config.mjs", content: postcssConfig },
      { path: "src/app/layout.tsx", content: layout },
      { path: "src/app/page.tsx", content: page },
      { path: "src/app/globals.css", content: globalsCss }
    ]
  };
}
