import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;
const ROUTES_FILE = path.join(ROOT, "src", "app", "routes.generated.jsx");
const ROUTES_LOCAL_FILE = path.join(ROOT, "src", "app", "routes.local.jsx");
const PUBLISH_STATE_FILE = path.join(ROOT, ".publish-center-state.json");

function parseRoutes(routesSource) {
  const routes = [];
  const re = /\{\s*path:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(routesSource)) !== null) {
    const routePath = m[1];
    const routeTitle = m[2];
    if (!routePath) continue;
    routes.push({ path: routePath, title: routeTitle });
  }
  return routes;
}

function readRoutes() {
  const generatedRoutes = fs.existsSync(ROUTES_FILE)
    ? parseRoutes(fs.readFileSync(ROUTES_FILE, "utf8"))
    : [];
  const localRoutes = fs.existsSync(ROUTES_LOCAL_FILE)
    ? parseRoutes(fs.readFileSync(ROUTES_LOCAL_FILE, "utf8"))
    : [];

  const mergedMap = new Map();
  generatedRoutes.forEach((r) => {
    if (!r.path || r.path === "/") return;
    mergedMap.set(r.path, r);
  });
  localRoutes.forEach((r) => {
    if (!r.path || r.path === "/") return;
    mergedMap.set(r.path, r);
  });

  return Array.from(mergedMap.values());
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("请求体过大"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("JSON 解析失败"));
      }
    });
    req.on("error", reject);
  });
}

function runCommand(command, args, env = {}) {
  return new Promise((resolve) => {
    execFile(command, args, { cwd: ROOT, env: { ...process.env, ...env } }, (error, stdout, stderr) => {
      resolve({
        ok: !error,
        code: error ? (typeof error.code === "number" ? error.code : 1) : 0,
        stdout: stdout || "",
        stderr: stderr || ""
      });
    });
  });
}

function isInsideRoot(targetPath) {
  const resolved = path.resolve(targetPath);
  return resolved.startsWith(path.sep);
}

function listDirectories(absPath) {
  const current = path.resolve(absPath);
  if (!fs.existsSync(current)) throw new Error("目录不存在");
  const st = fs.statSync(current);
  if (!st.isDirectory()) throw new Error("不是目录");

  const dirs = fs
    .readdirSync(current, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const fullPath = path.join(current, d.name);
      return { name: d.name, path: fullPath };
    })
    .sort((a, b) => a.name.localeCompare(b.name, "zh-CN"));

  return { path: current, dirs };
}

function readPublishState() {
  if (!fs.existsSync(PUBLISH_STATE_FILE)) return {};
  try {
    const raw = fs.readFileSync(PUBLISH_STATE_FILE, "utf8");
    const data = JSON.parse(raw);
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
}

function writePublishState(nextState) {
  const prev = readPublishState();
  const merged = { ...prev, ...nextState };
  fs.writeFileSync(PUBLISH_STATE_FILE, JSON.stringify(merged, null, 2), "utf8");
}

function publishApiPlugin() {
  return {
    name: "local-publish-api",
    configureServer(server) {
      server.middlewares.use("/api/publish/routes", (req, res) => {
        if (req.method !== "GET") {
          return sendJson(res, 405, { ok: false, message: "Method Not Allowed" });
        }
        return sendJson(res, 200, { ok: true, routes: readRoutes() });
      });

      server.middlewares.use("/api/publish/state", (req, res) => {
        if (req.method !== "GET") {
          return sendJson(res, 405, { ok: false, message: "Method Not Allowed" });
        }
        return sendJson(res, 200, { ok: true, state: readPublishState() });
      });

      server.middlewares.use("/api/publish/run", async (req, res) => {
        if (req.method !== "POST") {
          return sendJson(res, 405, { ok: false, message: "Method Not Allowed" });
        }

        try {
          const body = await readJsonBody(req);
          const outputBase = String(body.outputBase || "").trim();
          const folderName = String(body.folderName || "").trim();
          const publishMode = String(body.publishMode || "slim").trim().toLowerCase();
          const navClickable = typeof body.navClickable === "boolean" ? body.navClickable : true;
          const includeHome = typeof body.includeHome === "boolean" ? body.includeHome : false;
          const publishId = String(body.publishId || "").trim();
          const selectedPaths = Array.isArray(body.selectedPaths) ? body.selectedPaths.map((v) => String(v)) : [];

          if (!outputBase) return sendJson(res, 400, { ok: false, message: "发布路径不能为空" });
          if (!folderName) return sendJson(res, 400, { ok: false, message: "文件夹名称不能为空" });
          if (selectedPaths.length === 0) return sendJson(res, 400, { ok: false, message: "至少选择一个页面" });
          if (!["slim", "compat"].includes(publishMode)) {
            return sendJson(res, 400, { ok: false, message: "发布模式无效" });
          }

          const targetDir = path.resolve(outputBase, folderName);
          const logs = [];

          logs.push("$ npm run gen\n[skip] 发布中心已禁用 gen，避免覆盖手工维护页面");
          logs.push("$ publish clean\n[on] 发布前自动清理目标目录");

          const buildRes = await runCommand("npm", ["run", "build"]);
          logs.push(`$ npm run build\n${buildRes.stdout}${buildRes.stderr}`);
          if (!buildRes.ok) {
            return sendJson(res, 500, { ok: false, message: "构建失败", logs, targetDir });
          }

          const publishRes = await runCommand("node", ["tools/publish-static.mjs"], {
            PUBLISH_DIR: targetDir,
            PUBLISH_CLEAN: "true",
            PUBLISH_MODE: publishMode,
            PUBLISH_NAV_CLICKABLE: navClickable ? "true" : "false",
            PUBLISH_INCLUDE_HOME: includeHome ? "true" : "false",
            PUBLISH_ROUTE_PATHS_JSON: JSON.stringify(selectedPaths)
          });
          logs.push(`$ node tools/publish-static.mjs\n${publishRes.stdout}${publishRes.stderr}`);

          if (!publishRes.ok) {
            return sendJson(res, 500, { ok: false, message: "发布失败", logs, targetDir });
          }

          writePublishState({
            outputBase,
            folderName,
            publishMode,
            navClickable,
            includeHome,
            lastPublishId: publishId || "",
            lastPublishStatus: "success",
            lastPublishAt: Date.now(),
            updatedAt: new Date().toISOString()
          });

          return sendJson(res, 200, {
            ok: true,
            message: "发布成功",
            logs,
            targetDir,
            pageCount: selectedPaths.length,
            publishId: publishId || ""
          });
        } catch (error) {
          return sendJson(res, 500, {
            ok: false,
            message: error?.message || "发布接口异常"
          });
        }
      });

      server.middlewares.use("/api/fs/list-dirs", (req, res) => {
        if (req.method !== "GET") {
          return sendJson(res, 405, { ok: false, message: "Method Not Allowed" });
        }
        try {
          const url = new URL(req.url || "", "http://localhost");
          const inputPath = String(url.searchParams.get("path") || "/");
          const candidate = path.resolve(inputPath);
          if (!isInsideRoot(candidate)) {
            return sendJson(res, 400, { ok: false, message: "路径不合法" });
          }
          const result = listDirectories(candidate);
          return sendJson(res, 200, { ok: true, ...result });
        } catch (error) {
          return sendJson(res, 500, { ok: false, message: error?.message || "读取目录失败" });
        }
      });
    }
  };
}

// 强制启用 polling
export default defineConfig({
  base: "./",
  plugins: [react(), publishApiPlugin()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,    // 启用 polling 模式
      interval: 1000       // 监听间隔 1000ms
    },
    hmr: { overlay: false }
  }
});
