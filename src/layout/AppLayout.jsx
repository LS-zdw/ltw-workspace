import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import routes from "../app/routes.local.jsx";
import { filterPublishedRoutes, isPublishRestricted, isRouteAllowed } from "../app/publish-guard.jsx";

function groupRoutes(routeItems) {
  return routeItems.reduce((acc, route) => {
    const key = route.moduleGroup || route.module || "other";
    acc[key] = acc[key] || [];
    acc[key].push(route);
    return acc;
  }, {});
}

function groupLabel(groupName) {
  if (groupName === "san-tongshi") return "安全三同时";
  if (groupName === "edu") return "教育培训";
  if (groupName === "home") return "首页";
  return groupName;
}

function isKbRoute(route) {
  const p = String(route.path || "");
  return p.startsWith("/edu/kb") || p.startsWith("/edu/trainer/kb");
}

function isLegacyEduRoute(route) {
  const p = String(route.path || "");
  const t = String(route.title || "");
  return (
    p.includes("migration-query-legacy") ||
    p.endsWith("/training-plan-migration-query") ||
    p.endsWith("/training-record-migration-query") ||
    (t.includes("迁移数据查询") && !t.includes("历史数据迁移"))
  );
}

function isMigrationLedgerRoute(route) {
  return String(route.title || "").includes("历史数据迁移");
}

function isSanMigrationRoute(route) {
  const p = String(route.path || "");
  return p === "/san-tongshi/safety-migration-query" || p === "/san-tongshi/safety-migration-query/detail";
}

function isSanDevRoute(route) {
  const p = String(route.path || "");
  return [
    "/san-tongshi/safety-three-same",
    "/san-tongshi/fire-three-same",
    "/san-tongshi/occupational-health-three-same",
    "/san-tongshi/project-maintenance",
    "/san-tongshi/three-same-dashboard",
    "/san-tongshi/project-maintenance-origin"
  ].includes(p);
}

function isPrototypeCardRoute(route) {
  const p = String(route.path || "");
  return [
    "/san-tongshi/three-same-prototype-cards",
    "/edu/trainer/education-training-prototype-cards"
  ].includes(p);
}

function isEduDevRoute(route) {
  const p = String(route.path || "");
  return [
    "/edu/trainer/team-safety-activity-management",
    "/edu/trainer/trainer-resource-management",
    "/edu/trainer/trainer-resource-management-hq",
    "/edu/trainer/training-demand-report-enterprise",
    "/edu/trainer/training-demand-report-hq",
    "/edu/trainer/training-demand-management-enterprise",
    "/edu/trainer/training-demand-management-hq",
    "/edu/trainer/training-plan-management",
    "/edu/trainer/training-plan-management-enterprise",
    "/edu/trainer/training-record-management",
    "/edu/trainer/training-record-management-enterprise",
    "/edu/trainer/enterprise-training-statistics",
    "/edu/trainer/training-one-person-one-file",
    "/edu/trainer/training-one-person-one-file-enterprise",
    "/edu/trainer/certificate-management-enterprise",
    "/edu/trainer/hq-training-statistics",
    "/edu/trainer/education-training-nav"
  ].includes(p);
}

function isEduDevPath(pathname = "") {
  return isEduDevRoute({ path: pathname });
}

function isDataMigrationPath(pathname = "") {
  return isLegacyEduRoute({ path: pathname }) || isSanMigrationRoute({ path: pathname });
}

function sortRoutesByTitle(items = []) {
  return [...items].sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), "zh-CN"));
}

function sortSanDevRoutes(items = []) {
  const order = [
    "/san-tongshi/project-maintenance-origin",
    "/san-tongshi/project-maintenance",
    "/san-tongshi/safety-three-same",
    "/san-tongshi/occupational-health-three-same",
    "/san-tongshi/fire-three-same",
    "/san-tongshi/three-same-dashboard"
  ];
  const indexMap = new Map(order.map((path, idx) => [path, idx]));
  return [...items].sort((a, b) => {
    const ai = indexMap.has(a.path) ? indexMap.get(a.path) : Number.MAX_SAFE_INTEGER;
    const bi = indexMap.has(b.path) ? indexMap.get(b.path) : Number.MAX_SAFE_INTEGER;
    if (ai !== bi) return ai - bi;
    return String(a.title || "").localeCompare(String(b.title || ""), "zh-CN");
  });
}

function navLabel(title = "") {
  return String(title)
    .replace(/^教育培训-/, "")
    .replace(/^安全三同时-/, "")
    .replace(/^安全培训知识库-/, "")
    .trim();
}

function buildAutoPagerNode() {
  const wrap = document.createElement("div");
  wrap.className = "stpm-main-pager auto-list-pager";
  wrap.innerHTML = `
    <div class="stpm-main-pager-total">共 10 条记录 第 1 / 1 页</div>
    <div class="stpm-main-pager-controls">
      <button type="button" class="stpm-main-page-btn" disabled>‹</button>
      <button type="button" class="stpm-main-page-btn active">1</button>
      <button type="button" class="stpm-main-page-btn" disabled>›</button>
      <select class="stpm-main-page-size" aria-label="每页条数">
        <option value="10" selected>10条/页</option>
      </select>
    </div>
  `;
  return wrap;
}

function ensureAutoPagers(rootEl) {
  if (!rootEl) return;
  const tableWraps = rootEl.querySelectorAll(".table-wrap");
  tableWraps.forEach((tableWrap) => {
    if (tableWrap.dataset.pager === "manual") return;
    const inModal = !!tableWrap.closest(".modal");
    const forcePager = tableWrap.classList.contains("force-pager") || tableWrap.dataset.pager === "force";
    if (inModal && !forcePager) return;
    const host = tableWrap.parentElement;
    if (!host) return;
    if (host.querySelector(":scope > .stpm-main-pager:not(.auto-list-pager)")) return;
    if (tableWrap.nextElementSibling?.classList?.contains("stpm-main-pager")) return;
    tableWrap.insertAdjacentElement("afterend", buildAutoPagerNode());
  });
}

function normalizeEduDevDateInputs(rootEl) {
  if (!rootEl) return;
  const dateInputs = rootEl.querySelectorAll(
    'input[type="date"], input[type="datetime-local"], input[type="month"]'
  );
  dateInputs.forEach((input) => {
    if (input.dataset.calendarNormalized === "1") return;
    const originalType = input.getAttribute("type") || "text";
    input.dataset.originalType = originalType;
    input.setAttribute("type", "text");
    if (!input.placeholder) {
      input.placeholder =
        originalType === "datetime-local" ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
    }
    input.dataset.calendarNormalized = "1";
  });
}

export default function AppLayout({ children }) {
  const location = useLocation();
  const isEduDevPrototype = isEduDevPath(location.pathname);
  const isDataMigrationPrototype = isDataMigrationPath(location.pathname);
  const isHome = location.pathname === "/";
  const homeAllowed = isRouteAllowed("/");
  const navClickable =
    typeof window !== "undefined" ? window.__PUBLISH_NAV_CLICKABLE__ !== false : true;
  const [showQuickNav, setShowQuickNav] = React.useState(false);
  const mainRef = React.useRef(null);
  const visibleRoutes = filterPublishedRoutes(routes);
  const navVisibleRoutes = visibleRoutes.filter((route) => !String(route.path || "").includes(":"));
  const moduleRoutes = navVisibleRoutes.filter((route) => route.path !== "/");
  const grouped = groupRoutes(moduleRoutes);
  React.useEffect(() => {
    setShowQuickNav(false);
  }, [location.pathname]);
  React.useEffect(() => {
    if (!navClickable && showQuickNav) {
      setShowQuickNav(false);
    }
  }, [navClickable, showQuickNav]);
  React.useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    ensureAutoPagers(root);
    if (isEduDevPrototype || isDataMigrationPrototype) normalizeEduDevDateInputs(root);
    const observer = new MutationObserver(() => {
      ensureAutoPagers(root);
      if (isEduDevPrototype || isDataMigrationPrototype) normalizeEduDevDateInputs(root);
    });
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname, showQuickNav, isEduDevPrototype, isDataMigrationPrototype]);
  const handleEduDevClickCapture = React.useCallback(
    (event) => {
      if (!isEduDevPrototype) return;
      const target = event.target;
      if (!target || typeof target.closest !== "function") return;
      const drillTrigger = target.closest(
        ".proto-table tbody tr .table-link-btn, .proto-table tbody tr .table-link, .proto-table tbody tr a"
      );
      if (!drillTrigger) return;
      const row = drillTrigger.closest("tbody tr");
      if (!row) return;
      const tbody = row.parentElement;
      const firstRow = tbody?.querySelector("tr");
      if (!firstRow || row === firstRow) return;
      event.preventDefault();
      event.stopPropagation();
    },
    [isEduDevPrototype]
  );
  const eduRoutes = moduleRoutes.filter((r) => String(r.path || "").startsWith("/edu/"));
  const sanRoutes = moduleRoutes.filter((r) => String(r.path || "").startsWith("/san-tongshi/"));
  const sanMigrationRoutes = moduleRoutes.filter(isSanMigrationRoute);
  const dataMigrationRoutes = [...eduRoutes.filter(isLegacyEduRoute), ...sanMigrationRoutes];
  const quickNavSections = [
    { title: "三同时管理", routes: sortSanDevRoutes(moduleRoutes.filter(isSanDevRoute)) },
    { title: "原型说明卡", routes: sortRoutesByTitle(moduleRoutes.filter(isPrototypeCardRoute)) },
    {
      title: "安全三同时",
      routes: sortRoutesByTitle(sanRoutes.filter((r) => !isSanMigrationRoute(r) && !isSanDevRoute(r) && !isPrototypeCardRoute(r)))
    },
    { title: "安全培训知识库", routes: sortRoutesByTitle(eduRoutes.filter(isKbRoute)) },
    {
      title: "教育培训开发页面",
      routes: sortRoutesByTitle(eduRoutes.filter((r) => isEduDevRoute(r) && !isPrototypeCardRoute(r)))
    },
    {
      title: "新系统页面",
      routes: sortRoutesByTitle(
        eduRoutes.filter((r) => !isKbRoute(r) && !isLegacyEduRoute(r) && !isMigrationLedgerRoute(r) && !isEduDevRoute(r) && !isPrototypeCardRoute(r))
      )
    },
    {
      title: "历史迁移（新系统台账）",
      routes: sortRoutesByTitle(
        eduRoutes.filter((r) => !isKbRoute(r) && !isLegacyEduRoute(r) && isMigrationLedgerRoute(r))
      )
    },
    {
      title: "数据迁移",
      routes: sortRoutesByTitle(dataMigrationRoutes)
    }
  ].filter((s) => s.routes.length > 0);
  const currentQuickNavSection = quickNavSections.find((section) =>
    section.routes.some((route) => route.path === location.pathname)
  );
  const quickNavSectionsToRender = currentQuickNavSection
    ? [currentQuickNavSection]
    : quickNavSections;

  return (
    <div className="page">
      <div className="wrap">
        <div className="topbar">
          <div />
          <div />
        </div>

        <div className="page-tabs-row">
          <div className="topbar-tabs">
            {homeAllowed ? <Link className="topbar-tab" to="/">首页</Link> : <span className="topbar-tab disabled">首页</span>}
            <button
              type="button"
              className={`topbar-tab ${showQuickNav ? "active" : ""} ${!navClickable ? "disabled" : ""}`}
              onClick={() => {
                if (!navClickable) return;
                setShowQuickNav((v) => !v);
              }}
              disabled={!navClickable}
            >
              页面导航
            </button>
          </div>
        </div>

        <div className={`layout-body ${showQuickNav ? "with-left-nav" : ""}`}>
          {showQuickNav ? (
            <aside className="quick-nav-panel">
              {quickNavSectionsToRender.map((g) => (
                <div key={g.title} className="quick-nav-group">
                  <div className="quick-nav-title">{g.title}</div>
                  {g.routes.map((it) => (
                    <NavLink key={`${g.title}-${it.path}`} to={it.path} className={({ isActive }) => `quick-nav-link${isActive ? " active" : ""}`}>
                      {navLabel(it.title)}
                    </NavLink>
                  ))}
                </div>
              ))}
            </aside>
          ) : null}

          <main
            className={`layout-main${isEduDevPrototype ? " edu-dev-prototype" : ""}${isDataMigrationPrototype ? " data-migration-prototype" : ""}`}
            ref={mainRef}
            onClickCapture={handleEduDevClickCapture}
          >
            {isHome ? (
              <Card
                title="模块导航"
                desc="新增 spec -> npm run gen -> 自动生成页面与路由"
                right={<span className="badge">{visibleRoutes.length} routes</span>}
              >
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 800, marginBottom: 8 }}>常用入口</div>
                  <div className="nav">
                    {isRouteAllowed("/san-tongshi/safety-three-same") ? (
                      <Link to="/san-tongshi/safety-three-same">安全三同时</Link>
                    ) : null}
                    {isRouteAllowed("/san-tongshi/project-maintenance") ? (
                      <Link to="/san-tongshi/project-maintenance">三同时任务启动</Link>
                    ) : null}
                    {isRouteAllowed("/three-same/tasks") ? (
                      <Link to="/three-same/tasks">三同时任务列表</Link>
                    ) : null}
                    {isRouteAllowed("/projects") ? (
                      <Link to="/projects">项目信息管理</Link>
                    ) : null}
                  </div>
                </div>

                {!isPublishRestricted() ? (
                  <div style={{ marginBottom: 12 }}>
                    <div className="nav">
                      <Link to="/tools/publish-center">发布中心</Link>
                    </div>
                  </div>
                ) : null}

                {Object.keys(grouped).sort((a, b) => {
                  const order = ["san-tongshi", "edu", "other"];
                  const ai = order.indexOf(a);
                  const bi = order.indexOf(b);
                  if (ai === -1 && bi === -1) return String(a).localeCompare(String(b));
                  if (ai === -1) return 1;
                  if (bi === -1) return -1;
                  return ai - bi;
                }).map((groupName) => (
                  <div key={groupName} style={{ marginBottom: 12 }}>
                    <div style={{ fontWeight: 800, marginBottom: 8 }}>{groupLabel(groupName)}</div>

                    {groupName === "edu" ? (
                      <>
                        {(() => {
                          const eduRoutes = grouped[groupName] || [];
                          const kbRoutes = sortRoutesByTitle(eduRoutes.filter(isKbRoute));
                          const legacyRoutes = sortRoutesByTitle(eduRoutes.filter(isLegacyEduRoute));
                          const dataMigrationRoutes = sortRoutesByTitle([
                            ...legacyRoutes,
                            ...sanMigrationRoutes
                          ]);
                          const eduDevRoutes = sortRoutesByTitle(eduRoutes.filter((r) => isEduDevRoute(r) && !isPrototypeCardRoute(r)));
                          const prototypeCardRoutes = sortRoutesByTitle(moduleRoutes.filter(isPrototypeCardRoute));
                          const migrationLedgerRoutes = sortRoutesByTitle(
                            eduRoutes.filter((r) => !isKbRoute(r) && !isLegacyEduRoute(r) && isMigrationLedgerRoute(r))
                          );
                          const newSystemRoutes = sortRoutesByTitle(
                            eduRoutes.filter((r) => !isKbRoute(r) && !isLegacyEduRoute(r) && !isMigrationLedgerRoute(r) && !isEduDevRoute(r) && !isPrototypeCardRoute(r))
                          );
                          const sections = [
                            { title: "原型说明卡", routes: prototypeCardRoutes },
                            { title: "安全培训知识库", routes: kbRoutes },
                            { title: "教育培训开发页面", routes: eduDevRoutes },
                            { title: "新系统页面", routes: newSystemRoutes },
                            { title: "历史迁移（新系统台账）", routes: migrationLedgerRoutes },
                            { title: "数据迁移", routes: dataMigrationRoutes }
                          ];
                          return sections
                            .filter((s) => s.routes.length > 0)
                            .map((s) => (
                              <div key={s.title} style={{ marginBottom: 10 }}>
                                <div style={{ fontWeight: 800, marginBottom: 8 }}>{s.title}</div>
                                <div className="nav">
                                  {s.routes.map((route) => (
                                    <Link key={route.path} to={route.path}>
                                      {route.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ));
                        })()}
                      </>
                    ) : groupName === "san-tongshi" ? (
                      <>
                        {(() => {
                          const sanAllRoutes = grouped[groupName] || [];
                          const sanDevRoutes = sortSanDevRoutes(sanAllRoutes.filter(isSanDevRoute));
                          const sanOtherRoutes = sortRoutesByTitle(
                            sanAllRoutes.filter((r) => !isSanMigrationRoute(r) && !isSanDevRoute(r) && !isPrototypeCardRoute(r))
                          );
                          const sections = [
                            { title: "三同时管理", routes: sanDevRoutes },
                            { title: "安全三同时", routes: sanOtherRoutes }
                          ];
                          return sections
                            .filter((s) => s.routes.length > 0)
                            .map((s) => (
                              <div key={s.title} style={{ marginBottom: 10 }}>
                                <div style={{ fontWeight: 800, marginBottom: 8 }}>{s.title}</div>
                                <div className="nav">
                                  {s.routes.map((route) => (
                                    <Link key={route.path} to={route.path}>
                                      {route.title}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ));
                        })()}
                      </>
                    ) : (
                      <div className="nav">
                        {sortRoutesByTitle(
                          groupName === "san-tongshi"
                            ? (grouped[groupName] || []).filter((r) => !isSanMigrationRoute(r) && !isSanDevRoute(r) && !isPrototypeCardRoute(r))
                            : (grouped[groupName] || [])
                        ).map((route) => (
                          <Link key={route.path} to={route.path}>
                            {route.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </Card>
            ) : null}

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
