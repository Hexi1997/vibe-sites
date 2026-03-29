import { execFileSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const mode = process.env.DEPLOY_MODE === "all" ? "all" : "auto";
const baseSha = process.env.BASE_SHA?.trim();
const headSha = process.env.HEAD_SHA?.trim() || "HEAD";
const outputFile = process.env.GITHUB_OUTPUT;
const demoMetadata = readDemoMetadata();

const changedFiles = mode === "all" ? [] : detectChangedFiles();
const demos =
  mode === "all"
    ? listAllDemoSlugs().filter(isPublishedDemo)
    : [...new Set(changedFiles.flatMap(extractDemoSlug))].filter(isPublishedDemo).sort();

const changedDemoConfigs = changedFiles.filter((file) =>
  /^apps\/demos\/[^/]+\/demo\.config\.json$/.test(file)
);

const deployHub =
  mode === "all" ||
  changedDemoConfigs.length > 0 ||
  changedFiles.some((file) =>
    [
      /^apps\/hub\//,
      /^packages\/demo-registry\//,
      /^scripts\/generate-demo-registry\.mjs$/,
      /^package\.json$/,
      /^pnpm-lock\.yaml$/,
      /^pnpm-workspace\.yaml$/
    ].some((pattern) => pattern.test(file))
  );

writeOutput("demos_json", JSON.stringify(demos));
writeOutput("has_demos", String(demos.length > 0));
writeOutput("deploy_hub", String(deployHub));

console.log(
  JSON.stringify(
    {
      mode,
      changedFiles,
      demos,
      deployHub
    },
    null,
    2
  )
);

function runGit(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    cwd: process.cwd()
  }).trim();
}

function detectChangedFiles() {
  if (baseSha && !/^0+$/.test(baseSha) && gitObjectExists(baseSha)) {
    return splitLines(runGit(["diff", "--name-only", baseSha, headSha]));
  }

  try {
    return splitLines(runGit(["diff", "--name-only", "HEAD~1", headSha]));
  } catch {
    return listTrackedFiles();
  }
}

function listTrackedFiles() {
  return splitLines(runGit(["ls-files"]));
}

function gitObjectExists(revision) {
  try {
    runGit(["rev-parse", "--verify", `${revision}^{commit}`]);
    return true;
  } catch {
    return false;
  }
}

function listAllDemoSlugs() {
  const demosDir = resolve(process.cwd(), "apps/demos");

  try {
    return readdirSync(demosDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
}

function readDemoMetadata() {
  const demosDir = resolve(process.cwd(), "apps/demos");

  try {
    return new Map(
      readdirSync(demosDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .flatMap((entry) => {
          const configPath = resolve(demosDir, entry.name, "demo.config.json");

          try {
            const config = JSON.parse(readFileSync(configPath, "utf8"));
            return [[entry.name, config]];
          } catch {
            return [];
          }
        })
    );
  } catch {
    return new Map();
  }
}

function isPublishedDemo(slug) {
  return demoMetadata.get(slug)?.status === "published";
}

function splitLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function extractDemoSlug(file) {
  const match = file.match(/^apps\/demos\/([^/]+)\//);
  return match ? [match[1]] : [];
}

function writeOutput(key, value) {
  if (outputFile) {
    process.stdout.write(`${key}=${value}\n`);
    appendFileSync(outputFile, `${key}=${value}\n`);
    return;
  }

  process.stdout.write(`${key}=${value}\n`);
}
