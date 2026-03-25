import React from "react";

const DEFAULT_OUTPUT_BASE = "/data/pcitc/一体化/教育培训";
const DEFAULT_FOLDER_NAME = "edu-ep";
const LAST_OUTPUT_BASE_KEY = "publish_center_last_output_base";
const FLASH_NOTICE_KEY = "publish_center_flash_notice";
const PENDING_PUBLISH_ID_KEY = "publish_center_pending_publish_id";

function readLastOutputBase() {
  try {
    const v = window.localStorage.getItem(LAST_OUTPUT_BASE_KEY);
    return v && v.trim() ? v.trim() : DEFAULT_OUTPUT_BASE;
  } catch {
    return DEFAULT_OUTPUT_BASE;
  }
}

function saveLastOutputBase(value) {
  try {
    const v = String(value || "").trim();
    if (!v) return;
    window.localStorage.setItem(LAST_OUTPUT_BASE_KEY, v);
  } catch {
    // ignore
  }
}

export default function PublishCenterPage() {
  const [routes, setRoutes] = React.useState([]);
  const [selected, setSelected] = React.useState(new Set());
  const [keyword, setKeyword] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [outputBase, setOutputBase] = React.useState(readLastOutputBase);
  const [folderName, setFolderName] = React.useState(DEFAULT_FOLDER_NAME);
  const [publishMode, setPublishMode] = React.useState("compat");
  const [navClickable, setNavClickable] = React.useState(true);
  const [running, setRunning] = React.useState(false);
  const [logs, setLogs] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");
  const [flashNotice, setFlashNotice] = React.useState("");
  const [targetDir, setTargetDir] = React.useState("");
  const [showPathPicker, setShowPathPicker] = React.useState(false);
  const [browsePath, setBrowsePath] = React.useState(readLastOutputBase);
  const [browseDirs, setBrowseDirs] = React.useState([]);
  const [browseLoading, setBrowseLoading] = React.useState(false);
  const [browseError, setBrowseError] = React.useState("");
  const [routesSyncedAt, setRoutesSyncedAt] = React.useState(0);
  const selectAllRef = React.useRef(null);

  React.useEffect(() => {
    saveLastOutputBase(outputBase);
  }, [outputBase]);

  React.useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(FLASH_NOTICE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const text = String(parsed?.text || "");
      const at = Number(parsed?.at || 0);
      if (!text) return;
      if (Date.now() - at > 10000) {
        window.sessionStorage.removeItem(FLASH_NOTICE_KEY);
        return;
      }
      setFlashNotice(text);
      window.sessionStorage.removeItem(FLASH_NOTICE_KEY);
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    async function recoverPendingPublishNotice() {
      try {
        const pendingId = String(window.sessionStorage.getItem(PENDING_PUBLISH_ID_KEY) || "").trim();
        if (!pendingId) return;
        const res = await fetch("/api/publish/state");
        const data = await res.json();
        if (!data.ok) return;
        const state = data.state || {};
        const stateId = String(state.lastPublishId || "").trim();
        const stateStatus = String(state.lastPublishStatus || "").trim().toLowerCase();
        if (stateId && stateId === pendingId && stateStatus === "success") {
          const noticeText = "发布成功：请检查发布目录并分发 HTML 文件。";
          setFlashNotice(noticeText);
          setMessage("发布成功");
          setMessageType("success");
          window.sessionStorage.removeItem(PENDING_PUBLISH_ID_KEY);
        }
      } catch {
        // ignore
      }
    }
    recoverPendingPublishNotice();
  }, []);

  React.useEffect(() => {
    if (!flashNotice) return;
    const timer = window.setTimeout(() => {
      setFlashNotice("");
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [flashNotice]);

  const isKbRoute = React.useCallback((route) => {
    const p = String(route?.path || "");
    return p.startsWith("/edu/kb") || p.startsWith("/edu/trainer/kb");
  }, []);

  const isLegacyEduRoute = React.useCallback((route) => {
    const p = String(route?.path || "");
    const t = String(route?.title || "");
    return (
      p.includes("migration-query-legacy") ||
      p.endsWith("/training-plan-migration-query") ||
      p.endsWith("/training-record-migration-query") ||
      (t.includes("迁移数据查询") && !t.includes("历史数据迁移"))
    );
  }, []);

  const isMigrationLedgerRoute = React.useCallback((route) => {
    return String(route?.title || "").includes("历史数据迁移");
  }, []);

  const isSanMigrationRoute = React.useCallback((route) => {
    const p = String(route?.path || "");
    return p === "/san-tongshi/safety-migration-query" || p === "/san-tongshi/safety-migration-query/detail";
  }, []);

  const isSanDevRoute = React.useCallback((route) => {
    const p = String(route?.path || "");
    return [
      "/san-tongshi/safety-three-same",
      "/san-tongshi/fire-three-same",
      "/san-tongshi/occupational-health-three-same",
      "/san-tongshi/project-maintenance",
      "/san-tongshi/three-same-dashboard",
      "/san-tongshi/project-maintenance-origin"
    ].includes(p);
  }, []);

  const isPrototypeCardRoute = React.useCallback((route) => {
    const p = String(route?.path || "");
    return [
      "/san-tongshi/three-same-prototype-cards",
      "/edu/trainer/education-training-prototype-cards"
    ].includes(p);
  }, []);

  const isEduDevRoute = React.useCallback((route) => {
    const p = String(route?.path || "");
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
  }, []);

  const classifyRoute = React.useCallback(
    (route) => {
      const p = String(route?.path || "");
      if (p === "/") return "首页";
      const isEdu = p.startsWith("/edu/");
      const isSan = p.startsWith("/san-tongshi/");

      if (isSanDevRoute(route)) return "三同时管理";
      if (isPrototypeCardRoute(route)) return "原型说明卡";
      if (isSan && !isSanMigrationRoute(route)) return "安全三同时";
      if (isKbRoute(route)) return "安全培训知识库";
      if (isEdu && isEduDevRoute(route)) return "教育培训开发页面";
      if (isEdu && isMigrationLedgerRoute(route)) return "历史迁移（新系统台账）";
      if ((isEdu && isLegacyEduRoute(route)) || isSanMigrationRoute(route)) return "数据迁移";
      if (isEdu && !isKbRoute(route) && !isLegacyEduRoute(route) && !isMigrationLedgerRoute(route) && !isEduDevRoute(route)) {
        return "新系统页面";
      }
      return "其他";
    },
    [isEduDevRoute, isKbRoute, isLegacyEduRoute, isMigrationLedgerRoute, isPrototypeCardRoute, isSanDevRoute, isSanMigrationRoute]
  );

  const loadRoutes = React.useCallback(async ({ silent = false } = {}) => {
    try {
      const res = await fetch("/api/publish/routes");
      const data = await res.json();
      if (!data.ok) throw new Error(data.message || "加载失败");
      const nextRoutes = Array.isArray(data.routes) ? data.routes : [];
      setRoutes(nextRoutes);
      setSelected((prev) => {
        const allowed = new Set(nextRoutes.map((r) => r.path));
        const next = new Set();
        prev.forEach((p) => {
          if (allowed.has(p)) next.add(p);
        });
        return next;
      });
      setRoutesSyncedAt(Date.now());
    } catch (e) {
      if (!silent) {
        setMessage(`加载页面列表失败：${e.message}`);
        setMessageType("error");
      }
    }
  }, []);

  React.useEffect(() => {
    async function loadLastState() {
      try {
        const res = await fetch("/api/publish/state");
        const data = await res.json();
        if (!data.ok) return;
        const state = data.state || {};
        const lastOutputBase = String(state.outputBase || "").trim();
        const lastFolderName = String(state.folderName || "").trim();
        const lastPublishMode = String(state.publishMode || "").trim().toLowerCase();
        const lastNavClickable =
          typeof state.navClickable === "boolean" ? state.navClickable : true;
        if (lastOutputBase) {
          setOutputBase(lastOutputBase);
          setBrowsePath(lastOutputBase);
          saveLastOutputBase(lastOutputBase);
        }
        if (lastFolderName) {
          setFolderName(lastFolderName);
        }
        if (lastPublishMode === "slim" || lastPublishMode === "compat") {
          setPublishMode(lastPublishMode);
        }
        setNavClickable(lastNavClickable);
      } catch {
        // ignore
      }
    }
    loadLastState();
    loadRoutes();
  }, [loadRoutes]);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      loadRoutes({ silent: true });
    }, 3000);
    return () => window.clearInterval(timer);
  }, [loadRoutes]);

  const filteredRoutes = React.useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return routes.filter((r) => {
      if (category !== "all" && classifyRoute(r) !== category) return false;
      if (!kw) return true;
      return (
        String(r.title || "").toLowerCase().includes(kw) ||
        String(r.path || "").toLowerCase().includes(kw)
      );
    });
  }, [routes, keyword, category, classifyRoute]);

  const categoryOptions = React.useMemo(() => {
    const counts = routes.reduce((acc, r) => {
      const key = classifyRoute(r);
      acc.set(key, (acc.get(key) || 0) + 1);
      return acc;
    }, new Map());
    return Array.from(counts.entries())
      .sort((a, b) => a[0].localeCompare(b[0], "zh-Hans-CN"))
      .map(([name, count]) => ({ name, count }));
  }, [routes, classifyRoute]);

  const filteredSelectedCount = React.useMemo(() => {
    return filteredRoutes.reduce((count, r) => count + (selected.has(r.path) ? 1 : 0), 0);
  }, [filteredRoutes, selected]);

  React.useEffect(() => {
    if (!selectAllRef.current) return;
    const allCount = filteredRoutes.length;
    selectAllRef.current.indeterminate =
      allCount > 0 && filteredSelectedCount > 0 && filteredSelectedCount < allCount;
  }, [filteredRoutes, filteredSelectedCount]);

  const selectedCount = selected.size;

  const toggleOne = (routePath) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(routePath)) next.delete(routePath);
      else next.add(routePath);
      return next;
    });
  };

  const selectAllFiltered = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      filteredRoutes.forEach((r) => next.add(r.path));
      return next;
    });
  };

  const clearAllFiltered = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      filteredRoutes.forEach((r) => next.delete(r.path));
      return next;
    });
  };

  const toggleAllFiltered = (checked) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) {
        filteredRoutes.forEach((r) => next.add(r.path));
      } else {
        filteredRoutes.forEach((r) => next.delete(r.path));
      }
      return next;
    });
  };

  const loadDirs = async (targetPath) => {
    setBrowseLoading(true);
    setBrowseError("");
    try {
      const res = await fetch(`/api/fs/list-dirs?path=${encodeURIComponent(targetPath)}`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.message || "读取失败");
      setBrowsePath(data.path || targetPath);
      setBrowseDirs(Array.isArray(data.dirs) ? data.dirs : []);
    } catch (e) {
      setBrowseError(e.message);
    } finally {
      setBrowseLoading(false);
    }
  };

  const openPathPicker = () => {
    setShowPathPicker(true);
    loadDirs(outputBase || "/");
  };

  const goParent = () => {
    const parent = browsePath.replace(/\/+$/, "").replace(/\/[^/]*$/, "") || "/";
    loadDirs(parent);
  };

  const chooseCurrentPath = () => {
    setOutputBase(browsePath);
    setShowPathPicker(false);
  };

  const publish = async () => {
    setMessage("");
    setMessageType("");
    setFlashNotice("");
    setLogs("");
    setTargetDir("");

    if (!outputBase.trim()) {
      setMessage("发布路径不能为空");
      setMessageType("error");
      return;
    }
    if (!folderName.trim()) {
      setMessage("文件夹名称不能为空");
      setMessageType("error");
      return;
    }
    if (selectedCount === 0) {
      setMessage("至少选择一个页面");
      setMessageType("error");
      return;
    }

    setRunning(true);
    const publishId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    try {
      window.sessionStorage.setItem(PENDING_PUBLISH_ID_KEY, publishId);
    } catch {
      // ignore
    }
    try {
      const res = await fetch("/api/publish/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          publishId,
          outputBase: outputBase.trim(),
          folderName: folderName.trim(),
          runGen: false,
          publishMode,
          navClickable,
          selectedPaths: Array.from(selected)
        })
      });
      const data = await res.json();
      const finalMsg = data.ok ? "发布成功" : (data.message || "发布失败");
      setMessage(finalMsg);
      setMessageType(data.ok ? "success" : "error");
      setLogs(Array.isArray(data.logs) ? data.logs.join("\n\n") : "");
      setTargetDir(data.targetDir || "");
      if (data.ok) {
        saveLastOutputBase(outputBase);
        const noticeText = "发布成功：请检查发布目录并分发 HTML 文件。";
        setFlashNotice(noticeText);
        try {
          window.sessionStorage.removeItem(PENDING_PUBLISH_ID_KEY);
          window.sessionStorage.setItem(
            FLASH_NOTICE_KEY,
            JSON.stringify({ text: noticeText, at: Date.now() })
          );
        } catch {
          // ignore
        }
      } else {
        try {
          window.sessionStorage.removeItem(PENDING_PUBLISH_ID_KEY);
        } catch {
          // ignore
        }
      }
    } catch (e) {
      setMessage(`发布请求失败：${e.message}`);
      setMessageType("error");
      try {
        window.sessionStorage.removeItem(PENDING_PUBLISH_ID_KEY);
      } catch {
        // ignore
      }
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="stack">
      {flashNotice ? (
        <div
          className="pill"
          style={{
            position: "fixed",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(760px, calc(100vw - 24px))",
            zIndex: 9999,
            border: "1px solid #e4a5a5",
            background: "#fff3f3",
            color: "#c62828",
            fontWeight: 700,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)"
          }}
        >
          {flashNotice}
        </div>
      ) : null}
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">发布中心</div>
            <div className="card-desc">选择页面并发布到自定义目录</div>
          </div>
          <span className="badge">已选 {selectedCount} 项</span>
        </div>
        <div className="card-bd">
          <div className="pill" style={{ border: "1px solid #b8c7df", background: "#f8fbff" }}>
            <div className="k" style={{ fontWeight: 700, marginBottom: 6 }}>发布配置</div>
            <div className="grid grid-2">
              <div className="pill">
                <div className="k">发布路径</div>
                <input
                  className="filterbar-control"
                  style={{ width: "100%", minWidth: 0 }}
                  value={outputBase}
                  onChange={(e) => setOutputBase(e.target.value)}
                  placeholder="/data/pcitc/一体化/教育培训"
                />
                <div className="filterbar-inline-actions" style={{ marginTop: 6, marginLeft: 0 }}>
                  <button type="button" className="btn" onClick={openPathPicker}>选择目录</button>
                </div>
              </div>
              <div className="pill">
                <div className="k">文件夹名称</div>
                <input
                  className="filterbar-control"
                  style={{ width: "100%", minWidth: 0 }}
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="edu-ep"
                />
              </div>
              <div className="pill">
                <div className="k">发布模式</div>
                <select
                  className="filterbar-control"
                  style={{ width: "100%", minWidth: 0 }}
                  value={publishMode}
                  onChange={(e) => setPublishMode(e.target.value)}
                >
                  <option value="slim">精简模式（推荐分发）</option>
                  <option value="compat">兼容模式（保留旧目录结构）</option>
                </select>
              </div>
              <div className="pill">
                <div className="k">页面导航</div>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <input
                    type="checkbox"
                    checked={navClickable}
                    onChange={(e) => setNavClickable(e.target.checked)}
                  />
                  发布后允许点击页面导航
                </label>
              </div>
            </div>
          </div>

          <div className="pill mt-10" style={{ border: "1px solid #b8c7df", background: "#f8fbff" }}>
            <div className="k" style={{ fontWeight: 700, marginBottom: 6 }}>页面筛选</div>
            <div className="filterbar-inline-actions" style={{ marginTop: 6, marginLeft: 0 }}>
              <select
                className="filterbar-control"
                style={{ minWidth: 180 }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">全部分类</option>
                {categoryOptions.map((item) => (
                  <option key={item.name} value={item.name}>{item.name}（{item.count}）</option>
                ))}
              </select>
              <input
                className="filterbar-control"
                style={{ minWidth: 320 }}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="输入页面名称或路由关键字"
              />
              <button type="button" className="btn" onClick={selectAllFiltered}>勾选筛选结果</button>
              <button type="button" className="btn" onClick={clearAllFiltered}>取消筛选结果</button>
              <button type="button" className="btn" onClick={() => loadRoutes()}>刷新页面列表</button>
              <span style={{ color: "#6b7280", fontSize: 12 }}>
                {routesSyncedAt ? `已同步：${new Date(routesSyncedAt).toLocaleTimeString()}` : "未同步"}
              </span>
            </div>
          </div>

          <div
            className="pill mt-10"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 5,
              border: "1px solid #8db7e6",
              background: "#eef6ff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10
            }}
          >
            <div className="k" style={{ fontSize: 13 }}>
              当前筛选：{filteredRoutes.length} 项，已勾选：{filteredSelectedCount} 项（总勾选 {selectedCount} 项）
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button type="button" className="btn btn-primary" onClick={publish} disabled={running}>
                {running ? "发布中..." : "开始发布"}
              </button>
            </div>
          </div>

          {message ? (
            <div
              className="pill mt-10"
              style={{
                border: `1px solid ${messageType === "success" ? "#7ecb98" : "#e4a5a5"}`,
                background: messageType === "success" ? "#edf9f1" : "#fff3f3",
                color: messageType === "success" ? "#0a8f3c" : "#c62828",
                fontWeight: 700
              }}
            >
              {message}
            </div>
          ) : null}

          <div className="table-wrap mt-10" style={{ maxHeight: "70vh", minHeight: 520, overflowY: "auto" }}>
            <table className="proto-table" style={{ minWidth: "100%" }}>
              <thead>
                <tr>
                  <th className="table-checkbox">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      checked={filteredRoutes.length > 0 && filteredSelectedCount === filteredRoutes.length}
                      onChange={(e) => toggleAllFiltered(e.target.checked)}
                    />
                  </th>
                  <th>页面名称</th>
                  <th>路由</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoutes.map((r) => (
                  <tr key={r.path}>
                    <td className="table-checkbox">
                      <input
                        type="checkbox"
                        checked={selected.has(r.path)}
                        onChange={() => toggleOne(r.path)}
                      />
                    </td>
                    <td>{r.title}</td>
                    <td>{r.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {message ? (
            <div className="pill">
              <div className="k">结果</div>
              <div className="v">{message}</div>
              {targetDir ? (
                <div className="v" style={{ marginTop: 6 }}>输出目录：{targetDir}</div>
              ) : null}
            </div>
          ) : null}

          {logs ? (
            <div className="pill mt-10">
              <div className="k">发布日志</div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontSize: 12 }}>{logs}</pre>
            </div>
          ) : null}
        </div>
      </div>

      {showPathPicker ? (
        <div className="modal-mask" onClick={() => setShowPathPicker(false)}>
          <div className="modal" style={{ width: "min(900px, 96vw)" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">选择发布路径</div>
                <div className="modal-desc">{browsePath}</div>
              </div>
              <button type="button" className="modal-close" onClick={() => setShowPathPicker(false)}>x</button>
            </div>
            <div className="modal-bd">
              <div className="filterbar-inline-actions" style={{ marginLeft: 0 }}>
                <button type="button" className="btn" onClick={goParent}>上一级</button>
                <button type="button" className="btn" onClick={() => loadDirs(browsePath)}>刷新</button>
                <button type="button" className="btn btn-primary" onClick={chooseCurrentPath}>选择当前目录</button>
              </div>
              {browseError ? <div className="v">{browseError}</div> : null}
              <div className="table-wrap" style={{ maxHeight: 380, overflowY: "auto" }}>
                <table className="proto-table" style={{ minWidth: "100%" }}>
                  <thead>
                    <tr>
                      <th>目录名</th>
                      <th>完整路径</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {browseLoading ? (
                      <tr><td colSpan={3}>加载中...</td></tr>
                    ) : (
                      browseDirs.map((d) => (
                        <tr key={d.path}>
                          <td>{d.name}</td>
                          <td>{d.path}</td>
                          <td>
                            <button type="button" className="table-link-btn" onClick={() => loadDirs(d.path)}>进入</button>
                            {" / "}
                            <button type="button" className="table-link-btn" onClick={() => { setOutputBase(d.path); setShowPathPicker(false); }}>选中</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
