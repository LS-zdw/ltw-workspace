import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

const WATCH_DIRS = [path.join(ROOT, "src"), path.join(ROOT, "specs"), path.join(ROOT, "public")];
const WATCH_FILES = [path.join(ROOT, "index.html"), path.join(ROOT, "vite.config.js"), path.join(ROOT, "tools", "proto.mjs")];
const POLL_INTERVAL_MS = Number(process.env.PUBLISH_POLL_INTERVAL || 1500);

let running = false;
let fileState = new Map();

function walkFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
      continue;
    }
    if (entry.isFile()) out.push(full);
  }
  return out;
}

function scanState() {
  const files = [];
  for (const dir of WATCH_DIRS) {
    walkFiles(dir, files);
  }
  for (const file of WATCH_FILES) {
    if (fs.existsSync(file)) files.push(file);
  }
  files.sort();

  const next = new Map();
  for (const file of files) {
    try {
      const stat = fs.statSync(file);
      next.set(file, `${stat.mtimeMs}:${stat.size}`);
    } catch {
      // Ignore temporary fs race conditions.
    }
  }
  return next;
}

function diffChangedFiles(prev, next) {
  const changed = [];
  for (const [file, sign] of next.entries()) {
    if (prev.get(file) !== sign) changed.push(file);
  }
  for (const file of prev.keys()) {
    if (!next.has(file)) changed.push(file);
  }
  return changed;
}

function runCmd(command, onExit) {
  const child = spawn("/bin/bash", ["-lc", command], {
    cwd: ROOT,
    stdio: "inherit"
  });
  child.on("exit", onExit);
}

function runPublish(needsGen, reason) {
  if (running) return;
  running = true;

  const cmd = needsGen
    ? "npm run publish:once"
    : "npm run build && node tools/publish-static.mjs";

  console.log(`触发发布: ${needsGen ? "gen+build+publish" : "build+publish"} | ${reason}`);

  runCmd(cmd, (code) => {
    running = false;
    if (code !== 0) {
      console.error(`发布失败，退出码 ${code}`);
    } else {
      console.log("发布完成");
    }

    fileState = scanState();
  });
}

function main() {
  console.log("启动自动发布监听...");
  console.log(`目标目录: ${process.env.PUBLISH_DIR || "/data/pcitc/一体化/教育培训/edu-ep"}`);
  console.log(`轮询间隔: ${POLL_INTERVAL_MS}ms`);

  fileState = scanState();
  runPublish(true, "首次启动");

  setInterval(() => {
    if (running) return;

    const next = scanState();
    const changedFiles = diffChangedFiles(fileState, next);
    if (changedFiles.length === 0) return;

    const needsGen = changedFiles.some((file) => file.startsWith(path.join(ROOT, "specs") + path.sep));
    fileState = next;
    runPublish(needsGen, `${changedFiles.length} 个文件发生变化`);
  }, POLL_INTERVAL_MS);
}

main();
