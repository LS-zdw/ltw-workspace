import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");
const ROUTES_FILE = path.join(ROOT, "src", "app", "routes.generated.jsx");
const ROUTES_LOCAL_FILE = path.join(ROOT, "src", "app", "routes.local.jsx");

const DEFAULT_PUBLISH_DIR = "/data/pcitc/一体化/教育培训/edu-ep";
const DEFAULT_COMPAT_SOURCE_DIR = "/data/pcitc/一体化/教育培训/edu-ep";
const PUBLISH_DIR = path.resolve(process.env.PUBLISH_DIR || DEFAULT_PUBLISH_DIR);
const SHOULD_CLEAN = process.env.PUBLISH_CLEAN === "true";
const PUBLISH_MODE = (process.env.PUBLISH_MODE || "slim").toLowerCase();
const PUBLISH_NAV_CLICKABLE = String(process.env.PUBLISH_NAV_CLICKABLE || "true").toLowerCase() !== "false";
const PUBLISH_INCLUDE_HOME = String(process.env.PUBLISH_INCLUDE_HOME || "false").toLowerCase() === "true";
const COMPAT_SOURCE_DIR = path.resolve(process.env.PUBLISH_COMPAT_SOURCE_DIR || DEFAULT_COMPAT_SOURCE_DIR);
const FILTER_PATHS = (() => {
  const raw = process.env.PUBLISH_ROUTE_PATHS_JSON;
  if (!raw) return null;
  try {
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return null;
    return new Set(arr.map((v) => String(v)));
  } catch {
    return null;
  }
})();

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function inlineIndexAssets(publishDir) {
  const indexFile = path.join(publishDir, "index.html");
  if (!fs.existsSync(indexFile)) return;

  let html = fs.readFileSync(indexFile, "utf8");

  const cssMatch = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/i);
  if (cssMatch) {
    const cssPath = path.join(publishDir, cssMatch[1].replace(/^\.\//, ""));
    if (fs.existsSync(cssPath)) {
      let cssText = fs.readFileSync(cssPath, "utf8");
      // CSS was emitted for "assets/*.css"; after inlining into index.html,
      // "../" should resolve relative to index.html root.
      cssText = cssText.replace(/url\((['"]?)\.\.\//g, "url($1./");
      html = html.replace(cssMatch[0], () => `<style>\n${cssText}\n</style>`);
    }
  }

  const jsMatch = html.match(/<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/i);
  if (jsMatch) {
    const jsPath = path.join(publishDir, jsMatch[1].replace(/^\.\//, ""));
    if (fs.existsSync(jsPath)) {
      const jsText = fs.readFileSync(jsPath, "utf8");
      html = html.replace(jsMatch[0], () => `<script type="module">\n${jsText}\n</script>`);
    }
  }

  fs.writeFileSync(indexFile, html, "utf8");
}

function mimeTypeOf(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".gif") return "image/gif";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".webp") return "image/webp";
  if (ext === ".ico") return "image/x-icon";
  if (ext === ".woff") return "font/woff";
  if (ext === ".woff2") return "font/woff2";
  if (ext === ".ttf") return "font/ttf";
  return "application/octet-stream";
}

function toDataUri(filePath) {
  const mime = mimeTypeOf(filePath);
  const buf = fs.readFileSync(filePath);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function inlineIndexResourceUrls(publishDir) {
  const indexFile = path.join(publishDir, "index.html");
  if (!fs.existsSync(indexFile)) return;

  let html = fs.readFileSync(indexFile, "utf8");

  html = html.replace(/url\((['"]?)([^'")]+)\1\)/g, (full, quote, rawUrl) => {
    const assetUrl = String(rawUrl || "").trim();
    if (!assetUrl || assetUrl.startsWith("data:") || assetUrl.startsWith("http://") || assetUrl.startsWith("https://") || assetUrl.startsWith("#")) {
      return full;
    }

    const resolved = path.resolve(publishDir, assetUrl);
    if (!resolved.startsWith(path.resolve(publishDir)) || !fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
      return full;
    }

    return `url("${toDataUri(resolved)}")`;
  });

  // Force blank favicon so browser won't fall back to cached old site icon.
  if (/<link[^>]*rel="icon"[^>]*>/i.test(html)) {
    html = html.replace(/<link[^>]*rel="icon"[^>]*>/i, '<link rel="icon" href="data:," />');
  } else {
    html = html.replace(/<\/head>/i, '  <link rel="icon" href="data:," />\n  </head>');
  }

  fs.writeFileSync(indexFile, html, "utf8");
}

function writePublishRouteWhitelist(publishDir, routePaths) {
  const indexFile = path.join(publishDir, "index.html");
  if (!fs.existsSync(indexFile)) return;

  let html = fs.readFileSync(indexFile, "utf8");
  const payload = JSON.stringify((routePaths || []).map((p) => String(p))).replace(/</g, "\\u003c");
  const scriptId = "publish-routes-whitelist";
  const script = `<script id="${scriptId}">window.__PUBLISH_ALLOWED_ROUTES__=${payload};</script>`;

  if (html.includes(`id="${scriptId}"`)) {
    html = html.replace(
      /<script[^>]*id="publish-routes-whitelist"[^>]*>[\s\S]*?<\/script>/i,
      script
    );
  } else {
    html = html.replace(/<\/head>/i, `  ${script}\n  </head>`);
  }

  fs.writeFileSync(indexFile, html, "utf8");
}

function writePublishNavClickableFlag(publishDir, navClickable) {
  const indexFile = path.join(publishDir, "index.html");
  if (!fs.existsSync(indexFile)) return;

  let html = fs.readFileSync(indexFile, "utf8");
  const scriptId = "publish-nav-clickable";
  const script = `<script id="${scriptId}">window.__PUBLISH_NAV_CLICKABLE__=${navClickable ? "true" : "false"};</script>`;

  if (html.includes(`id="${scriptId}"`)) {
    html = html.replace(
      /<script[^>]*id="publish-nav-clickable"[^>]*>[\s\S]*?<\/script>/i,
      script
    );
  } else {
    html = html.replace(/<\/head>/i, `  ${script}\n  </head>`);
  }

  fs.writeFileSync(indexFile, html, "utf8");
}

function sanitizeFilename(name) {
  return String(name || "")
    .replace(/[\\/:*?"<>|]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

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

function readRoutesMerged() {
  const generatedRoutes = fs.existsSync(ROUTES_FILE)
    ? parseRoutes(fs.readFileSync(ROUTES_FILE, "utf8"))
    : [];
  const localRoutes = fs.existsSync(ROUTES_LOCAL_FILE)
    ? parseRoutes(fs.readFileSync(ROUTES_LOCAL_FILE, "utf8"))
    : [];

  const mergedMap = new Map();
  generatedRoutes.forEach((r) => {
    if (!r.path) return;
    mergedMap.set(r.path, r);
  });
  localRoutes.forEach((r) => {
    if (!r.path) return;
    mergedMap.set(r.path, r);
  });

  return Array.from(mergedMap.values());
}

function buildEntryHtml({ title, routePath }) {
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="data:," />
    <title>${title}</title>
  </head>
  <body>
    <p>正在打开：${title}</p>
    <script>
      (function () {
        var target = new URL("./index.html", window.location.href);
        target.hash = ${JSON.stringify(routePath)};
        window.location.replace(target.toString());
      })();
    </script>
    <noscript>
      <a href="./index.html#${routePath}">点击进入页面</a>
    </noscript>
  </body>
</html>
`;
}

function buildNavHtml(routes) {
  const items = routes
    .map(({ title, filename, path: routePath }) => {
      return `<li><a href="./${filename}">${title}</a> <small style="color:#666;">(${routePath})</small></li>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="data:," />
    <title>页面导航</title>
  </head>
  <body>
    <h1>页面导航</h1>
    <p>双击下列 html 文件即可直达对应页面。</p>
    <ul>
      ${items}
    </ul>
    <hr />
    <p><a href="./index.html">打开主页</a></p>
  </body>
</html>
`;
}

function cleanupPublishArtifacts(publishDir) {
  const removeTargets = [
    "assets",
    "proto",
    "vite.svg",
    "_publish-manifest.json",
    "一键隐藏资源-仅Windows.bat",
    "一键显示资源-仅Windows.bat"
  ];

  for (const name of removeTargets) {
    const target = path.join(publishDir, name);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
    }
  }
}

function cleanupCompatArtifacts(publishDir) {
  const removeTargets = ["assets", "proto", "vite.svg"];
  for (const name of removeTargets) {
    const target = path.join(publishDir, name);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
    }
  }
}

function copyCompatScaffold(publishDir) {
  const fromDir = COMPAT_SOURCE_DIR;
  const toDir = path.resolve(publishDir);
  if (!fs.existsSync(fromDir)) return;
  if (fromDir === toDir) return;

  const compatNames = [
    "resources",
    "plugins",
    "images",
    "files",
    "data",
    "start.html",
    "start_with_pages.html",
    "start_c_1.html"
  ];

  for (const name of compatNames) {
    const src = path.join(fromDir, name);
    const dst = path.join(toDir, name);
    if (!fs.existsSync(src)) continue;
    fs.cpSync(src, dst, { recursive: true, force: true });
  }
}

function main() {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error(`dist 目录不存在: ${DIST_DIR}，请先执行 npm run build`);
  }

  if (!fs.existsSync(ROUTES_FILE)) {
    throw new Error(`路由文件不存在: ${ROUTES_FILE}，请先执行 npm run gen`);
  }

  if (SHOULD_CLEAN && fs.existsSync(PUBLISH_DIR)) {
    fs.rmSync(PUBLISH_DIR, { recursive: true, force: true });
  }
  ensureDir(PUBLISH_DIR);
  fs.cpSync(DIST_DIR, PUBLISH_DIR, { recursive: true, force: true });
  inlineIndexAssets(PUBLISH_DIR);
  if (PUBLISH_MODE === "slim" || PUBLISH_MODE === "compat") {
    inlineIndexResourceUrls(PUBLISH_DIR);
  }

  let routes = readRoutesMerged();
  if (FILTER_PATHS && FILTER_PATHS.size > 0) {
    routes = routes.filter((r) => FILTER_PATHS.has(r.path));
  }
  routes = routes.filter((r) => r.path && r.path !== "/");
  routes = routes.filter((r) => !String(r.path).includes(":"));
  if (routes.length === 0) {
    throw new Error("没有可发布的页面，请检查勾选项");
  }
  const usedNames = new Set();
  const withFilenames = routes.map((item) => {
    const base = sanitizeFilename(item.title) || sanitizeFilename(item.path.replace(/\//g, "-")) || "page";
    let name = `${base}.html`;
    let seq = 2;
    while (usedNames.has(name)) {
      name = `${base}-${seq}.html`;
      seq += 1;
    }
    usedNames.add(name);
    return { ...item, filename: name };
  });

  for (const route of withFilenames) {
    const html = buildEntryHtml({ title: route.title, routePath: route.path });
    fs.writeFileSync(path.join(PUBLISH_DIR, route.filename), html, "utf8");
  }
  const allowedRoutePaths = withFilenames.map((r) => r.path);
  if (PUBLISH_INCLUDE_HOME) {
    allowedRoutePaths.unshift("/");
  }
  writePublishRouteWhitelist(PUBLISH_DIR, allowedRoutePaths);
  writePublishNavClickableFlag(PUBLISH_DIR, PUBLISH_NAV_CLICKABLE);

  if (PUBLISH_MODE === "slim") {
    cleanupPublishArtifacts(PUBLISH_DIR);
  } else if (PUBLISH_MODE === "compat") {
    copyCompatScaffold(PUBLISH_DIR);
    cleanupCompatArtifacts(PUBLISH_DIR);
  }

  console.log(`Published to ${PUBLISH_DIR}`);
  console.log(`Generated ${withFilenames.length} html page entries (${PUBLISH_MODE} mode)`);
}

main();
