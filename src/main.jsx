import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles/base.css";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import AppLayout from "./layout/AppLayout.jsx";
import routes from "./app/routes.local.jsx";
import { filterPublishedRoutes, isPublishRestricted, isRouteAllowed } from "./app/publish-guard.jsx";
import PublishCenterPage from "./modules/tools/pages/publish-center.jsx";

const pageModules = import.meta.glob("./modules/**/pages/**/*.jsx", { eager: true });
const toolRoutes = [
  { path: "/tools/publish-center", title: "发布中心", element: <PublishCenterPage /> }
];
const publishedRoutes = filterPublishedRoutes(routes);
const activeToolRoutes = isPublishRestricted() ? [] : toolRoutes;

function matchRoute(pathname, routeList) {
  return routeList.find((route) => {
    const routePath = String(route.path || "");
    if (!routePath) return false;
    if (routePath === pathname) return true;
    if (!routePath.includes(":")) return false;
    const routeParts = routePath.split("/");
    const pathParts = String(pathname || "").split("/");
    if (routeParts.length !== pathParts.length) return false;
    return routeParts.every((part, idx) => part.startsWith(":") || part === pathParts[idx]);
  });
}

function LazyPage({ elementPath }) {
  const mod = pageModules[elementPath];
  const Cmp = mod && mod.default;

  if (!Cmp) {
    return (
      <div className="card">
        <div className="card-bd">
          <div style={{ fontWeight: 800 }}>页面未找到</div>
          <div style={{ marginTop: 6, color: "#6b7280", fontSize: 12 }}>
            elementPath: {elementPath}
          </div>
          <div style={{ marginTop: 10, fontSize: 12 }}>
            请确认对应文件存在于 src/modules/*/pages 下，并重新执行 npm run gen。
          </div>
        </div>
      </div>
    );
  }

  return <Cmp />;
}

function Home() {
  return null; // AppLayout 已经展示导航
}

function RouteTitleSync() {
  const location = useLocation();

  React.useEffect(() => {
    const pathname = location.pathname || "/";
    const current = matchRoute(pathname, publishedRoutes) || activeToolRoutes.find((r) => r.path === pathname);
    document.title = current?.title || "proto-workbench";
  }, [location.pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <HashRouter>
        <RouteTitleSync />
        <AppLayout>
          <Routes>
            {isRouteAllowed("/") ? <Route path="/" element={<Home />} /> : null}
            {activeToolRoutes.map((r) => (
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
            {publishedRoutes
              .filter((r) => r.path !== "/")
              .map((r) => (
                <Route
                  key={r.path}
                  path={r.path}
                  element={<LazyPage elementPath={r.elementPath} />}
                />
              ))}
            <Route path="*" element={null} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
