import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Card from "../components/ui/Card.jsx";
import routes from "../app/routes.local.jsx";
import { isPublishRestricted, isRouteAllowed } from "../app/publish-guard.jsx";

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

function isSanLegacyOnlyRoute(route) {
  return String(route?.path || "") === "/san-tongshi/migration-query-legacy";
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

function isEduDevEnterpriseRoute(route) {
  const p = String(route.path || "");
  return [
    "/edu/trainer/team-safety-activity-management",
    "/edu/trainer/trainer-resource-management",
    "/edu/trainer/training-demand-report-enterprise",
    "/edu/trainer/training-demand-management-enterprise",
    "/edu/trainer/training-plan-management-enterprise",
    "/edu/trainer/training-record-management-enterprise",
    "/edu/trainer/enterprise-training-statistics",
    "/edu/trainer/training-one-person-one-file-enterprise",
    "/edu/trainer/certificate-management-enterprise",
    "/edu/trainer/education-training-nav"
  ].includes(p);
}

function isEduDevHeadquartersRoute(route) {
  const p = String(route.path || "");
  return [
    "/edu/trainer/trainer-resource-management-hq",
    "/edu/trainer/training-demand-report-hq",
    "/edu/trainer/training-demand-management-hq",
    "/edu/trainer/training-plan-management",
    "/edu/trainer/training-record-management",
    "/edu/trainer/training-one-person-one-file",
    "/edu/trainer/hq-training-statistics"
  ].includes(p);
}

function isHiddenNavRoute(route) {
  const p = String(route?.path || "");
  return [
    "/edu/trainer/team-safety-activity-plan",
    "/edu/trainer/key-post-maintenance",
    "/edu/trainer/training-prototype-overview",
    "/edu/trainer/dispatched-labor-post-maintenance",
    "/edu/trainer/training-class-create",
    "/edu/trainer/training-class-management",
    "/edu/trainer/training-plan-approval-enterprise",
    "/edu/trainer/training-record-management-alt",
    "/edu/trainer/trainer-resource-management-enterprise",
    "/edu/trainer/intern-info-maintenance",
    "/edu/trainer/special-equipment-post-maintenance",
    "/edu/trainee/tasks",
    "/edu/trainer/new-employee-transfer-maintenance",
    "/edu/trainee/employee-training-participation-personal",
    "/edu/trainer/employee-training-info",
    "/edu/trainee/certificate-management-personal",
    "/edu/trainer/certificate-management-hq",
    "/edu/trainer/principal-post-maintenance"
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

const NAV_CUSTOMIZE_STORAGE_KEY = "proto_workbench_nav_customize_v1";
const DEFAULT_MAJOR_ORDER = ["常用入口", "三同时管理", "教育培训", "其他页面"];
const DEFAULT_TEXT_COLOR = "#1f2a44";
const DEFAULT_MAJOR_TEXT_COLOR = "#0f1b33";

function normalizeNavCustomizeState(raw) {
  const state = raw && typeof raw === "object" ? raw : {};
  const majorMeta =
    state.majorMeta && typeof state.majorMeta === "object" ? state.majorMeta : {};
  const minorMeta =
    state.minorMeta && typeof state.minorMeta === "object" ? state.minorMeta : {};
  const majorOrder = Array.isArray(state.majorOrder) ? state.majorOrder : [];
  const minorOrder =
    state.minorOrder && typeof state.minorOrder === "object" ? state.minorOrder : {};
  const routeOrder =
    state.routeOrder && typeof state.routeOrder === "object" ? state.routeOrder : {};
  const legacyMajorLabels =
    state.majorLabels && typeof state.majorLabels === "object" ? state.majorLabels : {};
  const legacyMinorLabels =
    state.minorLabels && typeof state.minorLabels === "object" ? state.minorLabels : {};
  Object.keys(legacyMajorLabels).forEach((majorKey) => {
    if (!majorMeta[majorKey] || typeof majorMeta[majorKey] !== "object") majorMeta[majorKey] = {};
    if (!majorMeta[majorKey].label) majorMeta[majorKey].label = legacyMajorLabels[majorKey];
  });
  Object.keys(legacyMinorLabels).forEach((sectionKey) => {
    if (!minorMeta[sectionKey] || typeof minorMeta[sectionKey] !== "object") minorMeta[sectionKey] = {};
    if (!minorMeta[sectionKey].label) minorMeta[sectionKey].label = legacyMinorLabels[sectionKey];
  });
  return {
    routeMeta: state.routeMeta && typeof state.routeMeta === "object" ? state.routeMeta : {},
    majorMeta,
    minorMeta,
    majorOrder,
    minorOrder,
    routeOrder
  };
}

function readNavCustomizeState() {
  if (typeof window === "undefined") return normalizeNavCustomizeState(null);
  try {
    const raw = window.localStorage.getItem(NAV_CUSTOMIZE_STORAGE_KEY);
    if (!raw) return normalizeNavCustomizeState(null);
    return normalizeNavCustomizeState(JSON.parse(raw));
  } catch {
    return normalizeNavCustomizeState(null);
  }
}

function writeNavCustomizeState(state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(NAV_CUSTOMIZE_STORAGE_KEY, JSON.stringify(normalizeNavCustomizeState(state)));
  } catch {
    // ignore
  }
}

function getDefaultNavPlacement(route) {
  const p = String(route?.path || "");
  if (p === "/tools/publish-center" || p === "/tools/template-library") {
    return { major: "常用入口", minor: "常用入口" };
  }
  if (p.startsWith("/san-tongshi/")) {
    if (isSanDevRoute(route)) return { major: "三同时管理", minor: "三同时管理" };
    if (isSanLegacyOnlyRoute(route)) return { major: "三同时管理", minor: "安全三同时" };
    return { major: "三同时管理", minor: "其他三同时页面" };
  }
  if (p.startsWith("/edu/")) {
    if (isPrototypeCardRoute(route)) return { major: "教育培训", minor: "原型说明卡" };
    if (isKbRoute(route)) return { major: "教育培训", minor: "安全培训知识库" };
    if (isEduDevEnterpriseRoute(route)) return { major: "教育培训", minor: "教育培训开发页面-企业端" };
    if (isEduDevHeadquartersRoute(route)) return { major: "教育培训", minor: "教育培训开发页面-总部端" };
    if (isMigrationLedgerRoute(route)) return { major: "教育培训", minor: "历史迁移（新系统台账）" };
    if (isLegacyEduRoute(route)) return { major: "教育培训", minor: "数据迁移" };
    return { major: "教育培训", minor: "新系统页面" };
  }
  return { major: "其他页面", minor: "其他页面" };
}

function sectionMinorLabelKey(majorKey, minorKey) {
  return `${majorKey}::${minorKey}`;
}

function RouteMultiPicker({
  options = [],
  selectedPaths = [],
  onChange,
  placeholder = "选择页面"
}) {
  const [open, setOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const rootRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selectedSet = React.useMemo(() => new Set(selectedPaths), [selectedPaths]);
  const filtered = React.useMemo(() => {
    const kw = String(keyword || "").trim().toLowerCase();
    if (!kw) return options;
    return options.filter((item) => String(item?.displayTitle || "").toLowerCase().includes(kw));
  }, [keyword, options]);

  const toggleOne = (path) => {
    const next = new Set(selectedSet);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    onChange(Array.from(next));
  };
  const selectAllFiltered = () => {
    const next = new Set(selectedSet);
    filtered.forEach((item) => next.add(item.path));
    onChange(Array.from(next));
  };
  const clearAll = () => onChange([]);

  return (
    <div className="nav-multi-picker" ref={rootRef}>
      <button type="button" className="btn nav-picker-trigger" onClick={() => setOpen((v) => !v)}>
        {selectedPaths.length > 0 ? `已选 ${selectedPaths.length} 项` : placeholder}
      </button>
      {open ? (
        <div className="nav-picker-panel">
          <input
            className="filterbar-control"
            placeholder="搜索页面名称"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="nav-picker-actions">
            <button type="button" className="btn" onClick={selectAllFiltered}>全选结果</button>
            <button type="button" className="btn" onClick={clearAll}>清空</button>
          </div>
          <div className="nav-picker-list">
            {filtered.map((item) => (
              <label key={item.path} className="nav-picker-item">
                <input
                  type="checkbox"
                  checked={selectedSet.has(item.path)}
                  onChange={() => toggleOne(item.path)}
                />
                <span>{item.displayTitle}</span>
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
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
  const [navCustomize, setNavCustomize] = React.useState(readNavCustomizeState);
  const [isNavEditMode, setIsNavEditMode] = React.useState(false);
  const [addingMajorName, setAddingMajorName] = React.useState("");
  const [addingMajorColor, setAddingMajorColor] = React.useState(DEFAULT_MAJOR_TEXT_COLOR);
  const [majorEditor, setMajorEditor] = React.useState(null);
  const [minorEditor, setMinorEditor] = React.useState(null);
  const [routeEditor, setRouteEditor] = React.useState(null);
  const [majorInlineRename, setMajorInlineRename] = React.useState(null);
  const [minorInlineRename, setMinorInlineRename] = React.useState(null);
  const [routeInlineRename, setRouteInlineRename] = React.useState(null);
  const [quickMinorDraft, setQuickMinorDraft] = React.useState({});
  const [restorePaths, setRestorePaths] = React.useState([]);
  const [dragRoutePath, setDragRoutePath] = React.useState("");
  const [dropTargetKey, setDropTargetKey] = React.useState("");
  const [dragCategory, setDragCategory] = React.useState(null);
  const [dropMajorKey, setDropMajorKey] = React.useState("");
  const [dropMinorKey, setDropMinorKey] = React.useState("");
  const [dropRouteKey, setDropRouteKey] = React.useState("");
  const [dropMajorPos, setDropMajorPos] = React.useState("before");
  const [dropMinorPos, setDropMinorPos] = React.useState("before");
  const [dropRoutePos, setDropRoutePos] = React.useState("before");
  const mainRef = React.useRef(null);
  const visibleRoutes = routes;
  const navVisibleRoutes = visibleRoutes.filter(
    (route) => !String(route.path || "").includes(":") && !isHiddenNavRoute(route)
  );
  const moduleRoutes = navVisibleRoutes.filter((route) => route.path !== "/");
  const updateNavCustomize = React.useCallback((updater) => {
    setNavCustomize((prev) => {
      const base = normalizeNavCustomizeState(prev);
      const next = normalizeNavCustomizeState(
        typeof updater === "function" ? updater(base) : updater
      );
      writeNavCustomizeState(next);
      return next;
    });
  }, []);
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
  const allNavEntries = React.useMemo(() => {
    const entries = [...moduleRoutes];
    if (!isPublishRestricted() && isRouteAllowed("/tools/publish-center")) {
      if (!entries.some((it) => it.path === "/tools/publish-center")) {
        entries.push({
          path: "/tools/publish-center",
          title: "发布中心",
          module: "tools",
          moduleGroup: "other"
        });
      }
    }
    return entries.map((route) => {
      const path = String(route.path || "");
      const meta = navCustomize.routeMeta?.[path] || {};
      const placement = getDefaultNavPlacement(route);
      const majorKey = String(meta.major || placement.major || "其他页面").trim() || "其他页面";
      const minorKey = String(meta.minor || placement.minor || majorKey).trim() || majorKey;
      const customTitle = String(meta.title || "").trim();
      const customColor = String(meta.color || "").trim();
      return {
        ...route,
        majorKey,
        minorKey,
        displayTitle: customTitle || String(route.title || ""),
        hasCustomTitle: !!customTitle,
        displayColor: customColor || DEFAULT_TEXT_COLOR,
        hidden: path === "/tools/template-library" ? false : meta.hidden === true
      };
    });
  }, [moduleRoutes, navCustomize, isPublishRestricted, isRouteAllowed]);
  const navEntries = React.useMemo(
    () => allNavEntries.filter((entry) => !entry.hidden),
    [allNavEntries]
  );

  const navGroups = React.useMemo(() => {
    const majorMap = new Map();
    for (const entry of navEntries) {
      if (!majorMap.has(entry.majorKey)) majorMap.set(entry.majorKey, new Map());
      const minorMap = majorMap.get(entry.majorKey);
      if (!minorMap.has(entry.minorKey)) minorMap.set(entry.minorKey, []);
      minorMap.get(entry.minorKey).push(entry);
    }
    const configuredOrder = Array.isArray(navCustomize.majorOrder) ? navCustomize.majorOrder : [];
    const majorKeysFromMeta = Object.keys(navCustomize.majorMeta || {});
    const majorOrder = [];
    const pushMajor = (majorKey) => {
      const key = String(majorKey || "").trim();
      if (!key || majorOrder.includes(key)) return;
      majorOrder.push(key);
    };
    configuredOrder.forEach(pushMajor);
    DEFAULT_MAJOR_ORDER.forEach(pushMajor);
    Array.from(majorMap.keys())
      .sort((a, b) => a.localeCompare(b, "zh-CN"))
      .forEach(pushMajor);
    majorKeysFromMeta
      .sort((a, b) => a.localeCompare(b, "zh-CN"))
      .forEach(pushMajor);
    return majorOrder.map((majorKey) => {
      const minorMap = majorMap.get(majorKey) || new Map();
      const minorKeys = [];
      const configuredMinorOrder = Array.isArray(navCustomize.minorOrder?.[majorKey])
        ? navCustomize.minorOrder[majorKey]
        : [];
      const pushMinor = (minorKey) => {
        const key = String(minorKey || "").trim();
        if (!key || minorKeys.includes(key)) return;
        minorKeys.push(key);
      };
      configuredMinorOrder.forEach(pushMinor);
      Array.from(minorMap.keys())
        .sort((a, b) => a.localeCompare(b, "zh-CN"))
        .forEach(pushMinor);
      Object.keys(navCustomize.minorMeta || {}).forEach((sectionKey) => {
        if (!sectionKey.startsWith(`${majorKey}::`)) return;
        const minorKey = sectionKey.slice(`${majorKey}::`.length);
        pushMinor(minorKey);
      });
      const sections = minorKeys.map((minorKey) => {
        const sectionKey = sectionMinorLabelKey(majorKey, minorKey);
        const configuredRouteOrder = Array.isArray(navCustomize.routeOrder?.[sectionKey])
          ? navCustomize.routeOrder[sectionKey]
          : [];
        const routeIndexMap = new Map(configuredRouteOrder.map((path, idx) => [path, idx]));
        const routesInSection = [...(minorMap.get(minorKey) || [])].sort((a, b) => {
          const ai = routeIndexMap.has(a.path) ? routeIndexMap.get(a.path) : Number.MAX_SAFE_INTEGER;
          const bi = routeIndexMap.has(b.path) ? routeIndexMap.get(b.path) : Number.MAX_SAFE_INTEGER;
          if (ai !== bi) return ai - bi;
          return String(a.displayTitle || "").localeCompare(String(b.displayTitle || ""), "zh-CN");
        });
        const minorMeta = navCustomize.minorMeta?.[sectionKey] || {};
        return {
          majorKey,
          minorKey,
          minorTitle: String(minorMeta.label || "").trim() || minorKey,
          minorColor: String(minorMeta.color || "").trim() || DEFAULT_TEXT_COLOR,
          routes: routesInSection
        };
      });
      const majorMeta = navCustomize.majorMeta?.[majorKey] || {};
      return {
        majorKey,
        majorTitle: String(majorMeta.label || "").trim() || majorKey,
        majorColor: String(majorMeta.color || "").trim() || DEFAULT_MAJOR_TEXT_COLOR,
        sections
      };
    });
  }, [navEntries, navCustomize]);
  const majorKeyOptions = React.useMemo(
    () => navGroups.map((group) => group.majorKey),
    [navGroups]
  );
  const pageAssignOptions = React.useMemo(
    () =>
      [...allNavEntries].sort((a, b) =>
        String(a.displayTitle || "").localeCompare(String(b.displayTitle || ""), "zh-CN")
      ),
    [allNavEntries]
  );
  const hiddenEntryOptions = React.useMemo(
    () =>
      allNavEntries
        .filter((entry) => entry.hidden)
        .sort((a, b) =>
          String(a.displayTitle || "").localeCompare(String(b.displayTitle || ""), "zh-CN")
        ),
    [allNavEntries]
  );
  const minorKeyOptionsByMajor = React.useMemo(() => {
    const map = {};
    navGroups.forEach((group) => {
      map[group.majorKey] = group.sections.map((section) => section.minorKey);
    });
    return map;
  }, [navGroups]);

  const quickNavSections = React.useMemo(
    () =>
      navGroups
        .flatMap((major) => major.sections)
        .filter((section) => section.routes.length > 0),
    [navGroups]
  );
  const currentQuickNavSection = quickNavSections.find((section) =>
    section.routes.some((route) => route.path === location.pathname)
  );
  const quickNavSectionsToRender = currentQuickNavSection
    ? [currentQuickNavSection]
    : quickNavSections;
  const ensureMajorMeta = React.useCallback((nextState, majorKey) => {
    if (!nextState.majorMeta[majorKey]) nextState.majorMeta[majorKey] = {};
    if (!nextState.majorOrder.includes(majorKey)) nextState.majorOrder.push(majorKey);
  }, []);
  const handleAddMajor = React.useCallback(() => {
    const majorKey = String(addingMajorName || "").trim();
    if (!majorKey) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      ensureMajorMeta(next, majorKey);
      next.majorMeta[majorKey].label = majorKey;
      next.majorMeta[majorKey].color = addingMajorColor || DEFAULT_MAJOR_TEXT_COLOR;
      return next;
    });
    setAddingMajorName("");
  }, [addingMajorName, addingMajorColor, ensureMajorMeta, updateNavCustomize]);
  const handleQuickMinorAdd = React.useCallback(
    (majorKey) => {
      const draft = quickMinorDraft?.[majorKey] || {};
      const minorKey = String(draft.name || "").trim();
      if (!minorKey) return;
      updateNavCustomize((prev) => {
        const next = normalizeNavCustomizeState(prev);
        ensureMajorMeta(next, majorKey);
        const sectionKey = sectionMinorLabelKey(majorKey, minorKey);
        if (!next.minorMeta[sectionKey]) next.minorMeta[sectionKey] = {};
        next.minorMeta[sectionKey].label = minorKey;
        next.minorMeta[sectionKey].color =
          String(draft.color || "").trim() || DEFAULT_TEXT_COLOR;
        return next;
      });
      setQuickMinorDraft((prev) => ({
        ...prev,
        [majorKey]: { show: false, name: "", color: DEFAULT_TEXT_COLOR }
      }));
    },
    [ensureMajorMeta, quickMinorDraft, updateNavCustomize]
  );
  const handleOpenMajorEditor = React.useCallback((majorGroup) => {
    setMinorEditor(null);
    setRouteEditor(null);
    setMajorEditor({
      majorKey: majorGroup.majorKey,
      label: majorGroup.majorTitle,
      color: majorGroup.majorColor || DEFAULT_MAJOR_TEXT_COLOR,
      newMinorName: "",
      newMinorColor: DEFAULT_TEXT_COLOR,
      moveToMajor: majorGroup.majorKey === "其他页面" ? "教育培训" : "其他页面",
      assignPaths: []
    });
  }, []);
  const handleSaveMajorEditor = React.useCallback(() => {
    if (!majorEditor?.majorKey) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      ensureMajorMeta(next, majorEditor.majorKey);
      const label = String(majorEditor.label || "").trim();
      if (label) next.majorMeta[majorEditor.majorKey].label = label;
      else delete next.majorMeta[majorEditor.majorKey].label;
      next.majorMeta[majorEditor.majorKey].color =
        String(majorEditor.color || "").trim() || DEFAULT_MAJOR_TEXT_COLOR;
      return next;
    });
  }, [ensureMajorMeta, majorEditor, updateNavCustomize]);
  const handleAddMinorFromMajorEditor = React.useCallback(() => {
    if (!majorEditor?.majorKey) return;
    const minorKey = String(majorEditor.newMinorName || "").trim();
    if (!minorKey) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      ensureMajorMeta(next, majorEditor.majorKey);
      const sectionKey = sectionMinorLabelKey(majorEditor.majorKey, minorKey);
      if (!next.minorMeta[sectionKey]) next.minorMeta[sectionKey] = {};
      next.minorMeta[sectionKey].label = minorKey;
      next.minorMeta[sectionKey].color =
        String(majorEditor.newMinorColor || "").trim() || DEFAULT_TEXT_COLOR;
      return next;
    });
    setMajorEditor((prev) => (prev ? { ...prev, newMinorName: "" } : prev));
  }, [ensureMajorMeta, majorEditor, updateNavCustomize]);
  const handleDeleteMajorFromEditor = React.useCallback(() => {
    if (!majorEditor?.majorKey) return;
    const sourceMajor = majorEditor.majorKey;
    const targetMajor = String(majorEditor.moveToMajor || "").trim() || "其他页面";
    const relatedEntries = allNavEntries.filter((entry) => entry.majorKey === sourceMajor);
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      ensureMajorMeta(next, targetMajor);
      relatedEntries.forEach((entry) => {
        const path = String(entry.path || "");
        if (!path) return;
        const routeMeta = { ...(next.routeMeta[path] || {}) };
        routeMeta.major = targetMajor;
        routeMeta.minor = targetMajor;
        next.routeMeta[path] = routeMeta;
      });
      delete next.majorMeta[sourceMajor];
      next.majorOrder = next.majorOrder.filter((key) => key !== sourceMajor);
      Object.keys(next.minorMeta).forEach((key) => {
        if (key.startsWith(`${sourceMajor}::`)) delete next.minorMeta[key];
      });
      return next;
    });
    setMajorEditor(null);
  }, [allNavEntries, ensureMajorMeta, majorEditor, updateNavCustomize]);
  const handleAssignPageToMajor = React.useCallback(() => {
    const selectedPaths = Array.isArray(majorEditor?.assignPaths) ? majorEditor.assignPaths : [];
    if (!majorEditor?.majorKey || selectedPaths.length === 0) return;
    const targetMajor = majorEditor.majorKey;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      ensureMajorMeta(next, targetMajor);
      selectedPaths.forEach((path) => {
        const current = { ...(next.routeMeta[path] || {}) };
        current.major = targetMajor;
        current.minor = targetMajor;
        current.hidden = false;
        next.routeMeta[path] = current;
      });
      const sectionKey = sectionMinorLabelKey(targetMajor, targetMajor);
      if (!next.minorMeta[sectionKey]) next.minorMeta[sectionKey] = {};
      return next;
    });
    setMajorEditor((prev) => (prev ? { ...prev, assignPaths: [] } : prev));
  }, [ensureMajorMeta, majorEditor, updateNavCustomize]);
  const handleOpenMinorEditor = React.useCallback((section) => {
    setMajorEditor(null);
    setRouteEditor(null);
    setMinorEditor({
      majorKey: section.majorKey,
      minorKey: section.minorKey,
      label: section.minorTitle,
      color: section.minorColor || DEFAULT_TEXT_COLOR,
      moveToMinor: section.majorKey,
      assignPaths: []
    });
  }, []);
  const handleSaveMinorEditor = React.useCallback(() => {
    if (!minorEditor?.majorKey || !minorEditor?.minorKey) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      const sectionKey = sectionMinorLabelKey(minorEditor.majorKey, minorEditor.minorKey);
      if (!next.minorMeta[sectionKey]) next.minorMeta[sectionKey] = {};
      const label = String(minorEditor.label || "").trim();
      if (label) next.minorMeta[sectionKey].label = label;
      else delete next.minorMeta[sectionKey].label;
      next.minorMeta[sectionKey].color = String(minorEditor.color || "").trim() || DEFAULT_TEXT_COLOR;
      return next;
    });
  }, [minorEditor, updateNavCustomize]);
  const handleDeleteMinorFromEditor = React.useCallback(() => {
    if (!minorEditor?.majorKey || !minorEditor?.minorKey) return;
    const sourceMajor = minorEditor.majorKey;
    const sourceMinor = minorEditor.minorKey;
    const targetMinor = String(minorEditor.moveToMinor || "").trim() || sourceMajor;
    const routesInSection = allNavEntries.filter(
      (entry) => entry.majorKey === sourceMajor && entry.minorKey === sourceMinor
    );
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      routesInSection.forEach((entry) => {
        const path = String(entry.path || "");
        if (!path) return;
        const routeMeta = { ...(next.routeMeta[path] || {}) };
        routeMeta.major = sourceMajor;
        routeMeta.minor = targetMinor;
        next.routeMeta[path] = routeMeta;
      });
      delete next.minorMeta[sectionMinorLabelKey(sourceMajor, sourceMinor)];
      return next;
    });
    setMinorEditor(null);
  }, [allNavEntries, minorEditor, updateNavCustomize]);
  const handleAssignPageToMinor = React.useCallback(() => {
    const selectedPaths = Array.isArray(minorEditor?.assignPaths) ? minorEditor.assignPaths : [];
    if (!minorEditor?.majorKey || !minorEditor?.minorKey || selectedPaths.length === 0) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      selectedPaths.forEach((path) => {
        const current = { ...(next.routeMeta[path] || {}) };
        current.major = minorEditor.majorKey;
        current.minor = minorEditor.minorKey;
        current.hidden = false;
        next.routeMeta[path] = current;
      });
      const sectionKey = sectionMinorLabelKey(minorEditor.majorKey, minorEditor.minorKey);
      if (!next.minorMeta[sectionKey]) next.minorMeta[sectionKey] = {};
      return next;
    });
    setMinorEditor((prev) => (prev ? { ...prev, assignPaths: [] } : prev));
  }, [minorEditor, updateNavCustomize]);
  const handleOpenRouteEditor = React.useCallback((route) => {
    setMajorEditor(null);
    setMinorEditor(null);
    setRouteEditor({
      path: route.path,
      title: route.displayTitle,
      major: route.majorKey,
      minor: route.minorKey,
      color: route.displayColor || DEFAULT_TEXT_COLOR,
      originMajor: route.majorKey,
      originMinor: route.minorKey
    });
  }, []);
  const handleSaveRouteEditor = React.useCallback(() => {
    if (!routeEditor?.path) return;
    const nextMajor = String(routeEditor.major || "").trim() || "其他页面";
    const nextMinor = String(routeEditor.minor || "").trim() || nextMajor;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      ensureMajorMeta(next, nextMajor);
      const current = { ...(next.routeMeta[routeEditor.path] || {}) };
      current.title = String(routeEditor.title || "").trim();
      current.major = nextMajor;
      current.minor = nextMinor;
      current.color = String(routeEditor.color || "").trim() || DEFAULT_TEXT_COLOR;
      next.routeMeta[routeEditor.path] = current;
      const sectionKey = sectionMinorLabelKey(nextMajor, nextMinor);
      if (!next.minorMeta[sectionKey]) next.minorMeta[sectionKey] = {};
      return next;
    });
    setRouteEditor(null);
  }, [ensureMajorMeta, routeEditor, updateNavCustomize]);
  const handleResetRouteCustomize = React.useCallback(
    (path) => {
      updateNavCustomize((prev) => {
        const next = normalizeNavCustomizeState(prev);
        delete next.routeMeta[path];
        return next;
      });
    },
    [updateNavCustomize]
  );
  const handleHideRoute = React.useCallback(
    (path) => {
      if (!path) return;
      updateNavCustomize((prev) => {
        const next = normalizeNavCustomizeState(prev);
        const current = { ...(next.routeMeta[path] || {}) };
        current.hidden = true;
        next.routeMeta[path] = current;
        return next;
      });
      setRouteEditor(null);
    },
    [updateNavCustomize]
  );
  const handleMoveRouteToSection = React.useCallback(
    (path, majorKey, minorKey, anchorPath = "", position = "before") => {
      if (!path || !majorKey || !minorKey) return;
      const sourceEntry = allNavEntries.find((entry) => entry.path === path);
      const sourceSectionKey = sourceEntry
        ? sectionMinorLabelKey(sourceEntry.majorKey, sourceEntry.minorKey)
        : "";
      const targetSectionKey = sectionMinorLabelKey(majorKey, minorKey);
      const targetSection = navGroups
        .find((group) => group.majorKey === majorKey)
        ?.sections?.find((section) => section.minorKey === minorKey);
      const basePaths = (targetSection?.routes || []).map((it) => it.path).filter(Boolean);
      const ordered = basePaths.filter((p) => p !== path);
      if (anchorPath && ordered.includes(anchorPath)) {
        const anchorIdx = ordered.indexOf(anchorPath);
        const insertIdx = position === "after" ? anchorIdx + 1 : anchorIdx;
        ordered.splice(insertIdx, 0, path);
      } else {
        ordered.push(path);
      }
      updateNavCustomize((prev) => {
        const next = normalizeNavCustomizeState(prev);
        ensureMajorMeta(next, majorKey);
        const current = { ...(next.routeMeta[path] || {}) };
        current.major = majorKey;
        current.minor = minorKey;
        current.hidden = false;
        next.routeMeta[path] = current;
        if (!next.minorMeta[targetSectionKey]) next.minorMeta[targetSectionKey] = {};
        next.routeOrder[targetSectionKey] = ordered;
        if (sourceSectionKey && sourceSectionKey !== targetSectionKey) {
          const sourceOrder = Array.isArray(next.routeOrder[sourceSectionKey])
            ? next.routeOrder[sourceSectionKey]
            : [];
          next.routeOrder[sourceSectionKey] = sourceOrder.filter((p) => p !== path);
        }
        return next;
      });
    },
    [allNavEntries, ensureMajorMeta, navGroups, updateNavCustomize]
  );
  const handleDropMinorCategory = React.useCallback(
    (targetMajorKey, targetMinorKey, position = "before") => {
      if (!dragCategory || dragCategory.type !== "minor") return;
      const sourceMajor = dragCategory.majorKey;
      const sourceMinor = dragCategory.minorKey;
      if (!sourceMajor || !sourceMinor || !targetMajorKey || !targetMinorKey) return;
      updateNavCustomize((prev) => {
        const next = normalizeNavCustomizeState(prev);
        ensureMajorMeta(next, targetMajorKey);
        const sourceOrder = Array.isArray(next.minorOrder[sourceMajor])
          ? [...next.minorOrder[sourceMajor]]
          : (navGroups.find((g) => g.majorKey === sourceMajor)?.sections || []).map((s) => s.minorKey);
        const targetBaseOrder = Array.isArray(next.minorOrder[targetMajorKey])
          ? [...next.minorOrder[targetMajorKey]]
          : (navGroups.find((g) => g.majorKey === targetMajorKey)?.sections || []).map((s) => s.minorKey);
        const targetOrder = targetBaseOrder.filter((k) => k !== sourceMinor);
        const anchorIdx = targetOrder.indexOf(targetMinorKey);
        if (anchorIdx < 0) targetOrder.push(sourceMinor);
        else {
          const insertIdx = position === "after" ? anchorIdx + 1 : anchorIdx;
          targetOrder.splice(insertIdx, 0, sourceMinor);
        }
        if (sourceMajor !== targetMajorKey) {
          allNavEntries
            .filter((entry) => entry.majorKey === sourceMajor && entry.minorKey === sourceMinor)
            .forEach((entry) => {
              const path = String(entry.path || "");
              if (!path) return;
              const routeMeta = { ...(next.routeMeta[path] || {}) };
              routeMeta.major = targetMajorKey;
              routeMeta.minor = sourceMinor;
              next.routeMeta[path] = routeMeta;
            });
          const oldKey = sectionMinorLabelKey(sourceMajor, sourceMinor);
          const newKey = sectionMinorLabelKey(targetMajorKey, sourceMinor);
          if (next.minorMeta[oldKey]) {
            if (!next.minorMeta[newKey]) next.minorMeta[newKey] = next.minorMeta[oldKey];
            delete next.minorMeta[oldKey];
          }
          if (next.routeOrder[oldKey]) {
            if (!next.routeOrder[newKey]) next.routeOrder[newKey] = next.routeOrder[oldKey];
            delete next.routeOrder[oldKey];
          }
          next.minorOrder[sourceMajor] = sourceOrder.filter((k) => k !== sourceMinor);
        }
        next.minorOrder[targetMajorKey] = targetOrder;
        return next;
      });
      setDragCategory(null);
      setDropMajorKey("");
      setDropMinorKey("");
      setDropMinorPos("before");
    },
    [allNavEntries, dragCategory, ensureMajorMeta, navGroups, updateNavCustomize]
  );
  const handleDeleteMajorQuick = React.useCallback(
    (majorKey) => {
      const targetMajor = majorKeyOptions.find((key) => key !== majorKey) || "其他页面";
      updateNavCustomize((prev) => {
        const next = normalizeNavCustomizeState(prev);
        ensureMajorMeta(next, targetMajor);
        allNavEntries
          .filter((entry) => entry.majorKey === majorKey)
          .forEach((entry) => {
            const path = String(entry.path || "");
            if (!path) return;
            const routeMeta = { ...(next.routeMeta[path] || {}) };
            routeMeta.major = targetMajor;
            routeMeta.minor = targetMajor;
            next.routeMeta[path] = routeMeta;
          });
        delete next.majorMeta[majorKey];
        next.majorOrder = next.majorOrder.filter((key) => key !== majorKey);
        delete next.minorOrder[majorKey];
        Object.keys(next.minorMeta).forEach((key) => {
          if (key.startsWith(`${majorKey}::`)) delete next.minorMeta[key];
        });
        Object.keys(next.routeOrder).forEach((key) => {
          if (key.startsWith(`${majorKey}::`)) delete next.routeOrder[key];
        });
        return next;
      });
      if (majorEditor?.majorKey === majorKey) setMajorEditor(null);
      if (minorEditor?.majorKey === majorKey) setMinorEditor(null);
      if (routeEditor?.originMajor === majorKey) setRouteEditor(null);
    },
    [allNavEntries, ensureMajorMeta, majorEditor, majorKeyOptions, minorEditor, routeEditor, updateNavCustomize]
  );
  const handleDeleteMinorQuick = React.useCallback(
    (majorKey, minorKey) => {
      const targetMinor = majorKey;
      updateNavCustomize((prev) => {
        const next = normalizeNavCustomizeState(prev);
        allNavEntries
          .filter((entry) => entry.majorKey === majorKey && entry.minorKey === minorKey)
          .forEach((entry) => {
            const path = String(entry.path || "");
            if (!path) return;
            const routeMeta = { ...(next.routeMeta[path] || {}) };
            routeMeta.major = majorKey;
            routeMeta.minor = targetMinor;
            next.routeMeta[path] = routeMeta;
          });
        delete next.minorMeta[sectionMinorLabelKey(majorKey, minorKey)];
        const order = Array.isArray(next.minorOrder[majorKey]) ? next.minorOrder[majorKey] : [];
        next.minorOrder[majorKey] = order.filter((k) => k !== minorKey);
        delete next.routeOrder[sectionMinorLabelKey(majorKey, minorKey)];
        return next;
      });
      if (minorEditor?.majorKey === majorKey && minorEditor?.minorKey === minorKey) setMinorEditor(null);
      if (routeEditor?.originMajor === majorKey && routeEditor?.originMinor === minorKey) setRouteEditor(null);
    },
    [allNavEntries, minorEditor, routeEditor, updateNavCustomize]
  );
  const handleResetAllCustomize = React.useCallback(() => {
    updateNavCustomize(normalizeNavCustomizeState(null));
    setRouteEditor(null);
    setMajorEditor(null);
    setMinorEditor(null);
    setRestorePaths([]);
    setDragCategory(null);
    setDropMajorKey("");
    setDropMinorKey("");
    setDropRouteKey("");
    setDropMajorPos("before");
    setDropMinorPos("before");
    setDropRoutePos("before");
  }, [updateNavCustomize]);
  const handleRestoreSelectedRoutes = React.useCallback(() => {
    const selected = Array.isArray(restorePaths) ? restorePaths : [];
    if (selected.length === 0) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      selected.forEach((path) => {
        const current = { ...(next.routeMeta[path] || {}) };
        current.hidden = false;
        next.routeMeta[path] = current;
      });
      return next;
    });
    setRestorePaths([]);
  }, [restorePaths, updateNavCustomize]);
  const handleRestoreAllRoutes = React.useCallback(() => {
    if (hiddenEntryOptions.length === 0) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      hiddenEntryOptions.forEach((entry) => {
        const path = String(entry.path || "");
        if (!path) return;
        const current = { ...(next.routeMeta[path] || {}) };
        current.hidden = false;
        next.routeMeta[path] = current;
      });
      return next;
    });
    setRestorePaths([]);
  }, [hiddenEntryOptions, updateNavCustomize]);
  const handleDropMajorCategory = React.useCallback(
    (targetMajorKey, position = "before") => {
      if (!dragCategory || !targetMajorKey) return;
      if (dragCategory.type === "major") {
        const sourceMajorKey = dragCategory.majorKey;
        if (!sourceMajorKey || sourceMajorKey === targetMajorKey) return;
        const ordered = navGroups.map((g) => g.majorKey);
        const nextOrder = ordered.filter((k) => k !== sourceMajorKey);
        const anchorIdx = nextOrder.indexOf(targetMajorKey);
        if (anchorIdx < 0) nextOrder.push(sourceMajorKey);
        else {
          const insertIdx = position === "after" ? anchorIdx + 1 : anchorIdx;
          nextOrder.splice(insertIdx, 0, sourceMajorKey);
        }
        updateNavCustomize((prev) => {
          const next = normalizeNavCustomizeState(prev);
          next.majorOrder = nextOrder;
          return next;
        });
      }
      if (dragCategory.type === "minor") {
        const sourceMajor = dragCategory.majorKey;
        const sourceMinor = dragCategory.minorKey;
        if (!sourceMajor || !sourceMinor || sourceMajor === targetMajorKey) return;
        updateNavCustomize((prev) => {
          const next = normalizeNavCustomizeState(prev);
          ensureMajorMeta(next, targetMajorKey);
          allNavEntries
            .filter((entry) => entry.majorKey === sourceMajor && entry.minorKey === sourceMinor)
            .forEach((entry) => {
              const path = String(entry.path || "");
              if (!path) return;
              const routeMeta = { ...(next.routeMeta[path] || {}) };
              routeMeta.major = targetMajorKey;
              routeMeta.minor = sourceMinor;
              next.routeMeta[path] = routeMeta;
            });
          const oldKey = sectionMinorLabelKey(sourceMajor, sourceMinor);
          const newKey = sectionMinorLabelKey(targetMajorKey, sourceMinor);
          if (next.minorMeta[oldKey]) {
            if (!next.minorMeta[newKey]) next.minorMeta[newKey] = next.minorMeta[oldKey];
            delete next.minorMeta[oldKey];
          }
          if (next.routeOrder[oldKey]) {
            if (!next.routeOrder[newKey]) next.routeOrder[newKey] = next.routeOrder[oldKey];
            delete next.routeOrder[oldKey];
          }
          const sourceOrder = Array.isArray(next.minorOrder[sourceMajor])
            ? next.minorOrder[sourceMajor]
            : [];
          const targetOrder = Array.isArray(next.minorOrder[targetMajorKey])
            ? next.minorOrder[targetMajorKey]
            : [];
          next.minorOrder[sourceMajor] = sourceOrder.filter((k) => k !== sourceMinor);
          next.minorOrder[targetMajorKey] = [...targetOrder.filter((k) => k !== sourceMinor), sourceMinor];
          return next;
        });
      }
      setDragCategory(null);
      setDropMajorKey("");
      setDropMinorKey("");
      setDropMajorPos("before");
      setDropMinorPos("before");
    },
    [allNavEntries, dragCategory, ensureMajorMeta, navGroups, updateNavCustomize]
  );
  const handleStartMajorInlineRename = React.useCallback(
    (majorGroup) => {
      if (!isNavEditMode) return;
      setMajorInlineRename({ majorKey: majorGroup.majorKey, value: majorGroup.majorTitle });
      setRouteInlineRename(null);
    },
    [isNavEditMode]
  );
  const handleCommitMajorInlineRename = React.useCallback(() => {
    if (!majorInlineRename?.majorKey) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      ensureMajorMeta(next, majorInlineRename.majorKey);
      const value = String(majorInlineRename.value || "").trim();
      if (value) next.majorMeta[majorInlineRename.majorKey].label = value;
      else delete next.majorMeta[majorInlineRename.majorKey].label;
      return next;
    });
    setMajorInlineRename(null);
  }, [ensureMajorMeta, majorInlineRename, updateNavCustomize]);
  const handleStartRouteInlineRename = React.useCallback(
    (route) => {
      if (!isNavEditMode) return;
      setRouteInlineRename({ path: route.path, value: route.displayTitle });
      setRouteEditor(null);
      setMajorInlineRename(null);
    },
    [isNavEditMode]
  );
  const handleStartMinorInlineRename = React.useCallback(
    (section) => {
      if (!isNavEditMode) return;
      setMinorInlineRename({
        majorKey: section.majorKey,
        minorKey: section.minorKey,
        value: section.minorTitle
      });
      setRouteInlineRename(null);
      setMajorInlineRename(null);
    },
    [isNavEditMode]
  );
  const handleCommitMinorInlineRename = React.useCallback(() => {
    if (!minorInlineRename?.majorKey || !minorInlineRename?.minorKey) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      const sectionKey = sectionMinorLabelKey(
        minorInlineRename.majorKey,
        minorInlineRename.minorKey
      );
      if (!next.minorMeta[sectionKey]) next.minorMeta[sectionKey] = {};
      const value = String(minorInlineRename.value || "").trim();
      if (value) next.minorMeta[sectionKey].label = value;
      else delete next.minorMeta[sectionKey].label;
      return next;
    });
    setMinorInlineRename(null);
  }, [minorInlineRename, updateNavCustomize]);
  const handleCommitRouteInlineRename = React.useCallback(() => {
    if (!routeInlineRename?.path) return;
    updateNavCustomize((prev) => {
      const next = normalizeNavCustomizeState(prev);
      const current = { ...(next.routeMeta[routeInlineRename.path] || {}) };
      const value = String(routeInlineRename.value || "").trim();
      if (value) current.title = value;
      else delete current.title;
      if (Object.keys(current).length > 0) next.routeMeta[routeInlineRename.path] = current;
      else delete next.routeMeta[routeInlineRename.path];
      return next;
    });
    setRouteInlineRename(null);
  }, [routeInlineRename, updateNavCustomize]);

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
                <div key={`${g.majorKey}-${g.minorKey}`} className="quick-nav-group">
                  <div className="quick-nav-title">
                    {g.minorTitle}
                  </div>
                  {g.routes.map((it) => (
                    <NavLink
                      key={`${g.minorKey}-${it.path}`}
                      to={it.path}
                      className={({ isActive }) => `quick-nav-link${isActive ? " active" : ""}`}
                    >
                      {it.hasCustomTitle ? it.displayTitle : navLabel(it.displayTitle)}
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
                <div className="nav-edit-toolbar">
                  <button
                    type="button"
                    className={`btn ${isNavEditMode ? "" : "btn-primary"}`}
                    onClick={() => {
                      setIsNavEditMode((v) => !v);
                      setMajorEditor(null);
                      setMinorEditor(null);
                      setRouteEditor(null);
                      setMinorInlineRename(null);
                    }}
                  >
                    {isNavEditMode ? "完成配置" : "导航配置"}
                  </button>
                  {isNavEditMode ? (
                    <>
                      <input
                        className="filterbar-control nav-config-input"
                        placeholder="新增大类名称"
                        value={addingMajorName}
                        onChange={(e) => setAddingMajorName(e.target.value)}
                      />
                      <input className="nav-color-input" type="color" aria-label="新增大类字体颜色" value={addingMajorColor} onChange={(e) => setAddingMajorColor(e.target.value)} />
                      <button type="button" className="btn" onClick={handleAddMajor}>新增大类</button>
                      <RouteMultiPicker
                        options={hiddenEntryOptions}
                        selectedPaths={restorePaths}
                        onChange={setRestorePaths}
                        placeholder={
                          hiddenEntryOptions.length > 0
                            ? `已删除入口（${hiddenEntryOptions.length}）`
                            : "已删除入口（0）"
                        }
                      />
                      <button type="button" className="btn" onClick={handleRestoreSelectedRoutes}>找回选中</button>
                      <button type="button" className="btn" onClick={handleRestoreAllRoutes}>全部找回</button>
                      <button type="button" className="btn" onClick={handleResetAllCustomize}>恢复默认</button>
                    </>
                  ) : null}
                </div>
                {navGroups.map((majorGroup) => (
                  <div
                    key={majorGroup.majorKey}
                    style={{ marginBottom: 12 }}
                    className={`nav-major-block${dropMajorKey === majorGroup.majorKey ? " active" : ""}${dropMajorKey === majorGroup.majorKey && dropMajorPos === "after" ? " active-after" : ""}`}
                    onDragOver={(e) => {
                      if (!isNavEditMode || !dragCategory) return;
                      e.preventDefault();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDropMajorPos(e.clientY > rect.top + rect.height / 2 ? "after" : "before");
                      setDropMajorKey(majorGroup.majorKey);
                    }}
                    onDrop={(e) => {
                      if (!isNavEditMode || !dragCategory) return;
                      e.preventDefault();
                      handleDropMajorCategory(majorGroup.majorKey, dropMajorPos);
                    }}
                    onDragLeave={() => {
                      if (dropMajorKey === majorGroup.majorKey) setDropMajorKey("");
                    }}
                  >
                    <div className="nav-major-head">
                      {(() => {
                        const majorCount = majorGroup.sections.reduce(
                          (sum, section) => sum + section.routes.length,
                          0
                        );
                        return isNavEditMode && majorInlineRename?.majorKey === majorGroup.majorKey ? (
                          <input
                            className="filterbar-control nav-inline-rename-input"
                            value={majorInlineRename.value}
                            autoFocus
                            onChange={(e) =>
                              setMajorInlineRename((prev) => ({ ...prev, value: e.target.value }))
                            }
                            onBlur={handleCommitMajorInlineRename}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleCommitMajorInlineRename();
                              if (e.key === "Escape") setMajorInlineRename(null);
                            }}
                          />
                        ) : (
                          <div
                            className={`home-major-title${isNavEditMode ? " nav-drag-title" : ""}`}
                            style={{ color: majorGroup.majorColor }}
                            onDoubleClick={() => handleStartMajorInlineRename(majorGroup)}
                            draggable={isNavEditMode}
                            onDragStart={(e) => {
                              if (!isNavEditMode) return;
                              e.dataTransfer.setData("text/nav-category-major", majorGroup.majorKey);
                              setDragCategory({ type: "major", majorKey: majorGroup.majorKey });
                            }}
                            onDragEnd={() => {
                              setDragCategory(null);
                              setDropMajorKey("");
                            }}
                          >
                            {majorGroup.majorTitle}（{majorCount}）
                          </div>
                        );
                      })()}
                      {isNavEditMode ? (
                        <div className="nav-head-actions">
                          <button type="button" className="btn nav-manage-btn" onClick={() => handleOpenMajorEditor(majorGroup)}>管理</button>
                          <button
                            type="button"
                            className="nav-delete-x"
                            aria-label={`删除大类${majorGroup.majorTitle}`}
                            onClick={() => handleDeleteMajorQuick(majorGroup.majorKey)}
                          >
                            ×
                          </button>
                        </div>
                      ) : null}
                    </div>
                    {isNavEditMode && majorEditor?.majorKey === majorGroup.majorKey ? (
                      <div className="nav-inline-editor">
                        <input
                          className="filterbar-control"
                          value={majorEditor.label}
                          onChange={(e) => setMajorEditor((prev) => ({ ...prev, label: e.target.value }))}
                          placeholder="大类名称"
                        />
                        <input
                          className="nav-color-input"
                          type="color"
                          value={majorEditor.color || DEFAULT_MAJOR_TEXT_COLOR}
                          onChange={(e) => setMajorEditor((prev) => ({ ...prev, color: e.target.value }))}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleSaveMajorEditor}>保存</button>
                        <input
                          className="filterbar-control"
                          value={majorEditor.newMinorName}
                          onChange={(e) => setMajorEditor((prev) => ({ ...prev, newMinorName: e.target.value }))}
                          placeholder="新增小类名称"
                        />
                        <input
                          className="nav-color-input"
                          type="color"
                          value={majorEditor.newMinorColor || DEFAULT_TEXT_COLOR}
                          onChange={(e) => setMajorEditor((prev) => ({ ...prev, newMinorColor: e.target.value }))}
                        />
                        <button type="button" className="btn" onClick={handleAddMinorFromMajorEditor}>新增小类</button>
                        <RouteMultiPicker
                          options={pageAssignOptions.filter(
                            (entry) => entry.majorKey !== majorGroup.majorKey || entry.hidden
                          )}
                          selectedPaths={majorEditor.assignPaths || []}
                          onChange={(paths) => setMajorEditor((prev) => ({ ...prev, assignPaths: paths }))}
                          placeholder="选择页面（可多选）"
                        />
                        <button type="button" className="btn" onClick={handleAssignPageToMajor}>放入该大类</button>
                        <select
                          className="filterbar-control"
                          value={majorEditor.moveToMajor}
                          onChange={(e) => setMajorEditor((prev) => ({ ...prev, moveToMajor: e.target.value }))}
                        >
                          {(
                            majorKeyOptions.filter((key) => key !== majorGroup.majorKey).length > 0
                              ? majorKeyOptions.filter((key) => key !== majorGroup.majorKey)
                              : ["其他页面"]
                          ).map((key) => (
                            <option key={key} value={key}>{key}</option>
                          ))}
                        </select>
                        <button type="button" className="btn" onClick={handleDeleteMajorFromEditor}>删除大类</button>
                        <button type="button" className="btn" onClick={() => setMajorEditor(null)}>收起</button>
                      </div>
                    ) : null}
                    {isNavEditMode ? (
                      <div className="nav-quick-add-row">
                        <button
                          type="button"
                          className="nav-add-plus"
                          aria-label={`新增${majorGroup.majorTitle}下小类`}
                          onClick={() =>
                            setQuickMinorDraft((prev) => ({
                              ...prev,
                              [majorGroup.majorKey]: {
                                show: true,
                                name: prev?.[majorGroup.majorKey]?.name || "",
                                color: prev?.[majorGroup.majorKey]?.color || DEFAULT_TEXT_COLOR
                              }
                            }))
                          }
                        >
                          +
                        </button>
                        {quickMinorDraft?.[majorGroup.majorKey]?.show ? (
                          <div className="nav-quick-add-inline">
                            <input
                              className="filterbar-control"
                              placeholder="小类名称"
                              value={quickMinorDraft?.[majorGroup.majorKey]?.name || ""}
                              onChange={(e) =>
                                setQuickMinorDraft((prev) => ({
                                  ...prev,
                                  [majorGroup.majorKey]: {
                                    ...(prev?.[majorGroup.majorKey] || {}),
                                    show: true,
                                    name: e.target.value,
                                    color:
                                      prev?.[majorGroup.majorKey]?.color || DEFAULT_TEXT_COLOR
                                  }
                                }))
                              }
                            />
                            <input
                              className="nav-color-input"
                              type="color"
                              value={quickMinorDraft?.[majorGroup.majorKey]?.color || DEFAULT_TEXT_COLOR}
                              onChange={(e) =>
                                setQuickMinorDraft((prev) => ({
                                  ...prev,
                                  [majorGroup.majorKey]: {
                                    ...(prev?.[majorGroup.majorKey] || {}),
                                    show: true,
                                    name: prev?.[majorGroup.majorKey]?.name || "",
                                    color: e.target.value
                                  }
                                }))
                              }
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleQuickMinorAdd(majorGroup.majorKey)}
                            >
                              添加
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                setQuickMinorDraft((prev) => ({
                                  ...prev,
                                  [majorGroup.majorKey]: {
                                    show: false,
                                    name: "",
                                    color: prev?.[majorGroup.majorKey]?.color || DEFAULT_TEXT_COLOR
                                  }
                                }))
                              }
                            >
                              取消
                            </button>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {majorGroup.sections.length === 0 ? (
                      <div className="nav-empty-tip">暂无入口，可把入口迁移到该大类。</div>
                    ) : (
                      majorGroup.sections.map((section) => (
                        <div
                          key={`${section.majorKey}-${section.minorKey}`}
                          style={{ marginBottom: 10 }}
                          className={`nav-section-drop${dropTargetKey === `${section.majorKey}::${section.minorKey}` ? " active" : ""}${dropMinorKey === `${section.majorKey}::${section.minorKey}` ? " minor-active" : ""}${dropMinorKey === `${section.majorKey}::${section.minorKey}` && dropMinorPos === "after" ? " minor-active-after" : ""}`}
                          onDragOver={(e) => {
                            if (!isNavEditMode) return;
                            e.preventDefault();
                            if (dragCategory?.type === "minor") {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setDropMinorPos(e.clientY > rect.top + rect.height / 2 ? "after" : "before");
                              setDropMinorKey(`${section.majorKey}::${section.minorKey}`);
                            } else {
                              setDropTargetKey(`${section.majorKey}::${section.minorKey}`);
                            }
                          }}
                          onDrop={(e) => {
                            if (!isNavEditMode) return;
                            e.preventDefault();
                            if (dragCategory?.type === "minor") {
                              handleDropMinorCategory(section.majorKey, section.minorKey, dropMinorPos);
                              return;
                            }
                            const path = e.dataTransfer.getData("text/nav-path") || dragRoutePath;
                            handleMoveRouteToSection(path, section.majorKey, section.minorKey, "");
                            setDragRoutePath("");
                            setDropTargetKey("");
                            setDropRouteKey("");
                            setDropRoutePos("before");
                          }}
                          onDragLeave={() => {
                            if (dropTargetKey === `${section.majorKey}::${section.minorKey}`) {
                              setDropTargetKey("");
                            }
                            if (dropMinorKey === `${section.majorKey}::${section.minorKey}`) {
                              setDropMinorKey("");
                            }
                          }}
                        >
                          <div className="nav-minor-head">
                            {isNavEditMode &&
                            minorInlineRename?.majorKey === section.majorKey &&
                            minorInlineRename?.minorKey === section.minorKey ? (
                              <input
                                className="filterbar-control nav-inline-rename-input"
                                value={minorInlineRename.value}
                                autoFocus
                                onChange={(e) =>
                                  setMinorInlineRename((prev) => ({ ...prev, value: e.target.value }))
                                }
                                onBlur={handleCommitMinorInlineRename}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleCommitMinorInlineRename();
                                  if (e.key === "Escape") setMinorInlineRename(null);
                                }}
                              />
                            ) : (
                              <div className="home-minor-title" style={{ color: section.minorColor }}>
                                <span
                                  className={isNavEditMode ? "nav-drag-title" : ""}
                                  draggable={isNavEditMode}
                                  onDoubleClick={(e) => {
                                    if (!isNavEditMode) return;
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleStartMinorInlineRename(section);
                                  }}
                                  onDragStart={(e) => {
                                    if (!isNavEditMode) return;
                                    e.dataTransfer.setData(
                                      "text/nav-category-minor",
                                      `${section.majorKey}::${section.minorKey}`
                                    );
                                    setDragCategory({
                                      type: "minor",
                                      majorKey: section.majorKey,
                                      minorKey: section.minorKey
                                    });
                                  }}
                                  onDragEnd={() => {
                                    setDragCategory(null);
                                    setDropMajorKey("");
                                    setDropMinorKey("");
                                  }}
                                >
                                  {section.minorTitle}（{section.routes.length}）
                                </span>
                              </div>
                            )}
                            {isNavEditMode ? (
                              <div className="nav-head-actions">
                                <button type="button" className="btn nav-manage-btn" onClick={() => handleOpenMinorEditor(section)}>管理</button>
                                <button
                                  type="button"
                                  className="nav-delete-x"
                                  aria-label={`删除小类${section.minorTitle}`}
                                  onClick={() => handleDeleteMinorQuick(section.majorKey, section.minorKey)}
                                >
                                  ×
                                </button>
                              </div>
                            ) : null}
                          </div>
                          {isNavEditMode && minorEditor?.majorKey === section.majorKey && minorEditor?.minorKey === section.minorKey ? (
                            <div className="nav-inline-editor">
                              <input
                                className="filterbar-control"
                                value={minorEditor.label}
                                onChange={(e) => setMinorEditor((prev) => ({ ...prev, label: e.target.value }))}
                                placeholder="小类名称"
                              />
                              <input
                                className="nav-color-input"
                                type="color"
                                value={minorEditor.color || DEFAULT_TEXT_COLOR}
                                onChange={(e) => setMinorEditor((prev) => ({ ...prev, color: e.target.value }))}
                              />
                              <button type="button" className="btn btn-primary" onClick={handleSaveMinorEditor}>保存</button>
                              <RouteMultiPicker
                                options={pageAssignOptions.filter(
                                  (entry) =>
                                    entry.hidden ||
                                    !(entry.majorKey === section.majorKey && entry.minorKey === section.minorKey)
                                )}
                                selectedPaths={minorEditor.assignPaths || []}
                                onChange={(paths) => setMinorEditor((prev) => ({ ...prev, assignPaths: paths }))}
                                placeholder="选择页面（可多选）"
                              />
                              <button type="button" className="btn" onClick={handleAssignPageToMinor}>放入该小类</button>
                              <select
                                className="filterbar-control"
                                value={minorEditor.moveToMinor}
                                onChange={(e) => setMinorEditor((prev) => ({ ...prev, moveToMinor: e.target.value }))}
                              >
                                {Array.from(new Set([section.majorKey, ...(minorKeyOptionsByMajor[section.majorKey] || [])])).map((key) => (
                                  <option key={key} value={key}>{key}</option>
                                ))}
                              </select>
                              <button type="button" className="btn" onClick={handleDeleteMinorFromEditor}>删除小类</button>
                              <button type="button" className="btn" onClick={() => setMinorEditor(null)}>收起</button>
                            </div>
                          ) : null}
                          <div className="nav">
                            {section.routes.map((route) => (
                              <span
                                key={route.path}
                                className={`nav-item-wrap${isNavEditMode ? " edit" : ""}${dropRouteKey === route.path ? " route-drop-active" : ""}${dropRouteKey === route.path && dropRoutePos === "after" ? " route-drop-after" : ""}`}
                                onDragOver={(e) => {
                                  if (!isNavEditMode || dragCategory?.type === "minor") return;
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const rect = e.currentTarget.getBoundingClientRect();
                                  setDropRoutePos(e.clientY > rect.top + rect.height / 2 ? "after" : "before");
                                  setDropRouteKey(route.path);
                                }}
                                onDrop={(e) => {
                                  if (!isNavEditMode || dragCategory?.type === "minor") return;
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const sourcePath = e.dataTransfer.getData("text/nav-path") || dragRoutePath;
                                  handleMoveRouteToSection(
                                    sourcePath,
                                    section.majorKey,
                                    section.minorKey,
                                    route.path,
                                    dropRoutePos
                                  );
                                  setDragRoutePath("");
                                  setDropRouteKey("");
                                  setDropTargetKey("");
                                  setDropRoutePos("before");
                                }}
                                onDragLeave={() => {
                                  if (dropRouteKey === route.path) setDropRouteKey("");
                                }}
                              >
                                {isNavEditMode && routeInlineRename?.path === route.path ? (
                                  <input
                                    className="filterbar-control nav-inline-rename-input"
                                    value={routeInlineRename.value}
                                    autoFocus
                                    onChange={(e) =>
                                      setRouteInlineRename((prev) => ({ ...prev, value: e.target.value }))
                                    }
                                    onBlur={handleCommitRouteInlineRename}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") handleCommitRouteInlineRename();
                                      if (e.key === "Escape") setRouteInlineRename(null);
                                    }}
                                  />
                                ) : (
                                  <Link
                                    to={route.path}
                                    draggable={isNavEditMode}
                                    onDragStart={(e) => {
                                      if (!isNavEditMode) return;
                                      e.dataTransfer.setData("text/nav-path", route.path);
                                      setDragRoutePath(route.path);
                                    }}
                                    onDragEnd={() => {
                                      setDragRoutePath("");
                                      setDropTargetKey("");
                                      setDropRouteKey("");
                                      setDropRoutePos("before");
                                    }}
                                    onClick={(e) => {
                                      if (!isNavEditMode) return;
                                      e.preventDefault();
                                      handleOpenRouteEditor(route);
                                    }}
                                    onDoubleClick={(e) => {
                                      if (!isNavEditMode) return;
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleStartRouteInlineRename(route);
                                    }}
                                    style={{ color: route.displayColor || undefined }}
                                  >
                                    {route.displayTitle}
                                  </Link>
                                )}
                                {isNavEditMode ? (
                                  <button
                                    type="button"
                                    className="nav-delete-x nav-route-delete"
                                    aria-label={`删除页面${route.displayTitle}`}
                                    onClick={() => handleHideRoute(route.path)}
                                  >
                                    ×
                                  </button>
                                ) : null}
                              </span>
                            ))}
                          </div>
                          {isNavEditMode &&
                          routeEditor &&
                          routeEditor.originMajor === section.majorKey &&
                          routeEditor.originMinor === section.minorKey ? (
                            <div className="nav-route-editor">
                              <div className="home-minor-title">入口编辑</div>
                              <div className="nav-route-editor-grid">
                                <input
                                  className="filterbar-control"
                                  value={routeEditor.title}
                                  onChange={(e) => setRouteEditor((prev) => ({ ...prev, title: e.target.value }))}
                                  placeholder="入口名称"
                                />
                                <input
                                  className="filterbar-control"
                                  list="nav-major-options"
                                  value={routeEditor.major}
                                  onChange={(e) =>
                                    setRouteEditor((prev) => ({ ...prev, major: e.target.value }))
                                  }
                                  placeholder="大类"
                                />
                                <input
                                  className="filterbar-control"
                                  list={`nav-minor-options-${routeEditor.major}`}
                                  value={routeEditor.minor}
                                  onChange={(e) =>
                                    setRouteEditor((prev) => ({ ...prev, minor: e.target.value }))
                                  }
                                  placeholder="小类"
                                />
                                <input
                                  className="nav-color-input"
                                  type="color"
                                  value={routeEditor.color || DEFAULT_TEXT_COLOR}
                                  onChange={(e) => setRouteEditor((prev) => ({ ...prev, color: e.target.value }))}
                                />
                                <button type="button" className="btn btn-primary" onClick={handleSaveRouteEditor}>保存入口</button>
                                <button type="button" className="btn" onClick={() => handleHideRoute(routeEditor.path)}>删除入口</button>
                                <button type="button" className="btn" onClick={() => handleResetRouteCustomize(routeEditor.path)}>恢复默认</button>
                                <button type="button" className="btn" onClick={() => setRouteEditor(null)}>收起</button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))
                    )}
                  </div>
                ))}
                <datalist id="nav-major-options">
                  {majorKeyOptions.map((key) => (
                    <option key={key} value={key} />
                  ))}
                </datalist>
                {majorKeyOptions.map((majorKey) => (
                  <datalist key={majorKey} id={`nav-minor-options-${majorKey}`}>
                    {Array.from(new Set([majorKey, ...(minorKeyOptionsByMajor[majorKey] || [])])).map((minorKey) => (
                      <option key={minorKey} value={minorKey} />
                    ))}
                  </datalist>
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
