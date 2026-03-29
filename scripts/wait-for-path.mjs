import { access } from "node:fs/promises";
import process from "node:process";

const targetPath = process.argv[2];

if (!targetPath) {
  console.error("Usage: node scripts/wait-for-path.mjs <path>");
  process.exit(1);
}

const timeoutMs = 20_000;
const start = Date.now();

while (Date.now() - start < timeoutMs) {
  try {
    await access(targetPath);
    process.exit(0);
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}

console.error(`Timed out waiting for ${targetPath}`);
process.exit(1);
