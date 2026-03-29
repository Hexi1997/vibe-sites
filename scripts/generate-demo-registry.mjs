import { readdir, readFile, writeFile } from "node:fs/promises";
import { watch } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const demosDir = resolve(rootDir, "apps/demos");
const outputFile = resolve(rootDir, "packages/demo-registry/src/generated.ts");
const shouldWatch = process.argv.includes("--watch");

async function loadRegistry() {
  const entries = await readdir(demosDir, { withFileTypes: true });
  const demos = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const configPath = resolve(demosDir, entry.name, "demo.config.json");
    const raw = await readFile(configPath, "utf8");
    const config = JSON.parse(raw);

    if (!config.slug || !config.title || !config.description) {
      throw new Error(`Invalid demo config at ${configPath}`);
    }

    demos.push({
      slug: config.slug,
      title: config.title,
      description: config.description,
      stack: Array.isArray(config.stack) ? config.stack : [],
      coverImage: config.coverImage,
      status: config.status ?? "draft",
      sourcePath: `apps/demos/${entry.name}`,
      localUrl: config.localUrl,
      productionUrl: config.productionUrl
    });
  }

  demos.sort((left, right) => left.title.localeCompare(right.title));
  return demos;
}

function toFileContent(demos) {
  const serialized = JSON.stringify(demos, null, 2);
  return `import type { DemoMeta } from "./types";

export const demos: DemoMeta[] = ${serialized} as DemoMeta[];

export const publishedDemos: DemoMeta[] = demos.filter(
  (demo) => demo.status === "published"
);
`;
}

async function writeRegistry() {
  const demos = await loadRegistry();
  await writeFile(outputFile, toFileContent(demos));
  console.log(`[registry] wrote ${demos.length} demos to ${outputFile}`);
}

await writeRegistry();

if (shouldWatch) {
  const debounceMap = new Map();

  const onChange = (filePath) => {
    const normalized = resolve(filePath);
    clearTimeout(debounceMap.get(normalized));
    debounceMap.set(
      normalized,
      setTimeout(() => {
        writeRegistry().catch((error) => {
          console.error("[registry] failed to regenerate", error);
        });
      }, 120)
    );
  };

  watch(demosDir, { recursive: true }, (_eventType, filename) => {
    if (!filename) {
      return;
    }

    if (filename.endsWith("demo.config.json")) {
      onChange(resolve(demosDir, filename));
    }
  });

  console.log(`[registry] watching ${dirname(outputFile)}`);
}
