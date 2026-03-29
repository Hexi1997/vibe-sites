import { readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = process.cwd();
const appsDir = resolve(rootDir, "apps");

async function removeDistDirectories(parentDir) {
  const entries = await readdir(parentDir, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      if (!entry.isDirectory()) {
        return;
      }

      const fullPath = resolve(parentDir, entry.name);
      await rm(resolve(fullPath, "dist"), { recursive: true, force: true });
      await rm(resolve(fullPath, ".wrangler"), { recursive: true, force: true });

      if (entry.name === "demos") {
        await removeDistDirectories(fullPath);
      }
    })
  );
}

await removeDistDirectories(appsDir);
