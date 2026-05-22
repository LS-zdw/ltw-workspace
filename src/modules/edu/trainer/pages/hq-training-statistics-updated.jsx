import React from "react";
import { isPublishRestricted } from "../../../../app/publish-guard.jsx";

const MOSAIC_LAYOUT_STORAGE_KEY = "hq_training_statistics_mosaic_layout_v11";
const MOSAIC_CHILD_STORAGE_KEY = "hq_training_statistics_mosaic_children_v10";
const DEFAULT_MOSAIC_LAYOUT = {
  rank: { x: 0, y: 0, width: 332, height: 522, z: 1, hidden: false },
  plan: { x: 344, y: 0, width: 968, height: 332, z: 2, hidden: false },
  personCert: { x: 344, y: 344, width: 672, height: 192, z: 3, hidden: false },
  cert: { x: 1028, y: 344, width: 284, height: 192, z: 4, hidden: false },
  tempPlan: { x: 0, y: 552, width: 228, height: 176, z: 5, hidden: false },
  employee: { x: 240, y: 552, width: 672, height: 176, z: 6, hidden: false },
  archive: { x: 924, y: 552, width: 388, height: 176, z: 7, hidden: false }
};
const DEFAULT_CHILD_LAYOUT = {
  "rank:title": { panelKey: "rank", x: 12, y: 10, width: 190, height: 28, z: 1, fontSize: 16, color: "#cf2020", hidden: false, kind: "node" },
  "rank:head": { panelKey: "rank", x: 12, y: 44, width: 276, height: 28, z: 2, fontSize: 15, color: "#2f5e9f", hidden: false, kind: "node" },
  "rank:tabs": { panelKey: "rank", x: 12, y: 80, width: 276, height: 44, z: 3, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "rank:note": { panelKey: "rank", x: 12, y: 130, width: 308, height: 32, z: 4, fontSize: 11, color: "#4d5f7f", hidden: false, kind: "node" },
  "rank:list": { panelKey: "rank", x: 12, y: 170, width: 308, height: 338, z: 5, fontSize: 13, color: "#1f2633", hidden: false, kind: "node" },
  "plan:title": { panelKey: "plan", x: 12, y: 10, width: 250, height: 30, z: 1, fontSize: 16, color: "#1f2633", hidden: false, kind: "node" },
  "plan:chart": { panelKey: "plan", x: 12, y: 46, width: 944, height: 274, z: 2, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "cert:title": { panelKey: "cert", x: 12, y: 10, width: 248, height: 30, z: 1, fontSize: 14, color: "#1f2633", hidden: false, kind: "node" },
  "cert:1": { panelKey: "cert", x: 12, y: 48, width: 260, height: 56, z: 2, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "cert:2": { panelKey: "cert", x: 12, y: 116, width: 260, height: 56, z: 3, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "cert:bg:1": { panelKey: "cert", x: 12, y: 48, width: 260, height: 56, z: 20, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "cert:bg:2": { panelKey: "cert", x: 12, y: 116, width: 260, height: 56, z: 21, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "cert:label:1": { panelKey: "cert", x: 22, y: 55, width: 190, height: 16, z: 22, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "cert:value:1": { panelKey: "cert", x: 22, y: 74, width: 112, height: 24, z: 23, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "cert:label:2": { panelKey: "cert", x: 22, y: 123, width: 220, height: 16, z: 24, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "cert:value:2": { panelKey: "cert", x: 22, y: 142, width: 112, height: 24, z: 25, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:title": { panelKey: "personCert", x: 12, y: 10, width: 240, height: 30, z: 1, fontSize: 16, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:1": { panelKey: "personCert", x: 12, y: 46, width: 204, height: 132, z: 2, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:2": { panelKey: "personCert", x: 228, y: 46, width: 204, height: 132, z: 3, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:3": { panelKey: "personCert", x: 444, y: 46, width: 204, height: 132, z: 4, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:bg:1": { panelKey: "personCert", x: 12, y: 46, width: 204, height: 132, z: 20, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "personCert:bg:2": { panelKey: "personCert", x: 228, y: 46, width: 204, height: 132, z: 21, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "personCert:bg:3": { panelKey: "personCert", x: 444, y: 46, width: 204, height: 132, z: 22, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "personCert:label:1a": { panelKey: "personCert", x: 24, y: 56, width: 152, height: 16, z: 23, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "personCert:value:1a": { panelKey: "personCert", x: 24, y: 78, width: 124, height: 24, z: 24, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:label:1b": { panelKey: "personCert", x: 24, y: 116, width: 152, height: 16, z: 25, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "personCert:value:1b": { panelKey: "personCert", x: 24, y: 138, width: 124, height: 24, z: 26, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:label:2a": { panelKey: "personCert", x: 240, y: 56, width: 152, height: 28, z: 27, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "personCert:value:2a": { panelKey: "personCert", x: 240, y: 88, width: 124, height: 24, z: 28, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:label:2b": { panelKey: "personCert", x: 240, y: 116, width: 152, height: 16, z: 29, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "personCert:value:2b": { panelKey: "personCert", x: 240, y: 138, width: 124, height: 24, z: 30, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:label:3a": { panelKey: "personCert", x: 456, y: 56, width: 152, height: 16, z: 31, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "personCert:value:3a": { panelKey: "personCert", x: 456, y: 78, width: 124, height: 24, z: 32, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "personCert:label:3b": { panelKey: "personCert", x: 456, y: 116, width: 152, height: 16, z: 33, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "personCert:value:3b": { panelKey: "personCert", x: 456, y: 138, width: 124, height: 24, z: 34, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "employee:title": { panelKey: "employee", x: 12, y: 10, width: 260, height: 30, z: 1, fontSize: 14, color: "#1f2633", hidden: false, kind: "node" },
  "employee:1": { panelKey: "employee", x: 12, y: 46, width: 204, height: 132, z: 2, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "employee:2": { panelKey: "employee", x: 228, y: 46, width: 204, height: 132, z: 3, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "employee:3": { panelKey: "employee", x: 444, y: 46, width: 204, height: 132, z: 4, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "employee:bg:1": { panelKey: "employee", x: 12, y: 46, width: 204, height: 132, z: 20, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "employee:bg:2": { panelKey: "employee", x: 228, y: 46, width: 204, height: 132, z: 21, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "employee:bg:3": { panelKey: "employee", x: 444, y: 46, width: 204, height: 132, z: 22, fontSize: 12, color: "#1f2633", hidden: false, kind: "background" },
  "employee:1:label-a": { panelKey: "employee", x: 24, y: 56, width: 152, height: 16, z: 23, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "employee:1:value-a": { panelKey: "employee", x: 24, y: 78, width: 124, height: 24, z: 24, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "employee:1:label-b": { panelKey: "employee", x: 24, y: 116, width: 152, height: 16, z: 25, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "employee:1:value-b": { panelKey: "employee", x: 24, y: 138, width: 124, height: 24, z: 26, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "employee:2:label-a": { panelKey: "employee", x: 240, y: 56, width: 152, height: 16, z: 27, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "employee:2:value-a": { panelKey: "employee", x: 240, y: 78, width: 124, height: 24, z: 28, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "employee:2:label-b": { panelKey: "employee", x: 240, y: 116, width: 152, height: 16, z: 29, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "employee:2:value-b": { panelKey: "employee", x: 240, y: 138, width: 124, height: 24, z: 30, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "employee:3:label-a": { panelKey: "employee", x: 456, y: 56, width: 152, height: 16, z: 31, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "employee:3:value-a": { panelKey: "employee", x: 456, y: 78, width: 124, height: 24, z: 32, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "employee:3:label-b": { panelKey: "employee", x: 456, y: 116, width: 152, height: 16, z: 33, fontSize: 11, color: "#5c677d", hidden: false, kind: "node" },
  "employee:3:value-b": { panelKey: "employee", x: 456, y: 138, width: 124, height: 24, z: 34, fontSize: 20, color: "#1f2633", hidden: false, kind: "node" },
  "tempPlan:title": { panelKey: "tempPlan", x: 12, y: 10, width: 300, height: 30, z: 1, fontSize: 14, color: "#1f2633", hidden: false, kind: "node" },
  "tempPlan:1": { panelKey: "tempPlan", x: 12, y: 46, width: 204, height: 92, z: 2, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "archive:title": { panelKey: "archive", x: 12, y: 10, width: 320, height: 30, z: 1, fontSize: 14, color: "#1f2633", hidden: false, kind: "node" },
  "archive:1": { panelKey: "archive", x: 12, y: 46, width: 176, height: 56, z: 2, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "archive:2": { panelKey: "archive", x: 200, y: 46, width: 176, height: 56, z: 3, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "archive:3": { panelKey: "archive", x: 12, y: 114, width: 176, height: 56, z: 4, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" },
  "archive:4": { panelKey: "archive", x: 200, y: 114, width: 176, height: 56, z: 5, fontSize: 12, color: "#1f2633", hidden: false, kind: "node" }
};

function clampLayoutValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeMosaicLayout(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const next = {};
  Object.entries(DEFAULT_MOSAIC_LAYOUT).forEach(([key, defaults]) => {
    const item = src[key] && typeof src[key] === "object" ? src[key] : {};
    next[key] = {
      x: clampLayoutValue(Number.isFinite(Number(item.x)) ? Number(item.x) : defaults.x, -2000, 4000),
      y: clampLayoutValue(Number.isFinite(Number(item.y)) ? Number(item.y) : defaults.y, -2000, 4000),
      width: clampLayoutValue(Number.isFinite(Number(item.width)) ? Number(item.width) : defaults.width, 180, 2400),
      height: clampLayoutValue(Number.isFinite(Number(item.height)) ? Number(item.height) : defaults.height, 120, 2400),
      z: clampLayoutValue(Number.isFinite(Number(item.z)) ? Number(item.z) : defaults.z, 1, 999),
      hidden: Boolean(item.hidden)
    };
  });
  return next;
}

function sanitizeChildLayoutItem(item, defaults = {}) {
  const base = { ...defaults, ...(item && typeof item === "object" ? item : {}) };
  return {
    panelKey: base.panelKey || defaults.panelKey || "",
    x: clampLayoutValue(Number.isFinite(Number(base.x)) ? Number(base.x) : Number(defaults.x || 0), -2000, 4000),
    y: clampLayoutValue(Number.isFinite(Number(base.y)) ? Number(base.y) : Number(defaults.y || 0), -2000, 4000),
    width: clampLayoutValue(Number.isFinite(Number(base.width)) ? Number(base.width) : Number(defaults.width || 180), 60, 2400),
    height: clampLayoutValue(Number.isFinite(Number(base.height)) ? Number(base.height) : Number(defaults.height || 40), 24, 2400),
    z: clampLayoutValue(Number.isFinite(Number(base.z)) ? Number(base.z) : Number(defaults.z || 1), 1, 9999),
    fontSize: clampLayoutValue(Number.isFinite(Number(base.fontSize)) ? Number(base.fontSize) : Number(defaults.fontSize || 14), 10, 72),
    color: typeof base.color === "string" && base.color ? base.color : (defaults.color || "#1f2633"),
    hidden: Boolean(base.hidden),
    kind: base.kind || defaults.kind || "node",
    text: typeof base.text === "string" ? base.text : (defaults.text || "")
  };
}

function normalizeChildLayout(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const next = {};
  Object.entries(DEFAULT_CHILD_LAYOUT).forEach(([key, defaults]) => {
    next[key] = sanitizeChildLayoutItem(src[key], defaults);
  });
  Object.entries(src).forEach(([key, item]) => {
    if (!next[key] && key.includes(":note:")) {
      next[key] = sanitizeChildLayoutItem(item, {
        panelKey: typeof item?.panelKey === "string" ? item.panelKey : key.split(":")[0],
        x: 24,
        y: 24,
        width: 180,
        height: 96,
        z: 99,
        fontSize: 14,
        color: "#8a5b00",
        kind: "note",
        text: "双击或直接编辑备注"
      });
    }
  });
  return next;
}

function readMosaicLayout() {
  if (typeof window === "undefined") return DEFAULT_MOSAIC_LAYOUT;
  try {
    const raw = window.localStorage.getItem(MOSAIC_LAYOUT_STORAGE_KEY);
    return normalizeMosaicLayout(raw ? JSON.parse(raw) : null);
  } catch {
    return DEFAULT_MOSAIC_LAYOUT;
  }
}

function readChildLayout() {
  if (typeof window === "undefined") return DEFAULT_CHILD_LAYOUT;
  try {
    const raw = window.localStorage.getItem(MOSAIC_CHILD_STORAGE_KEY);
    return normalizeChildLayout(raw ? JSON.parse(raw) : null);
  } catch {
    return DEFAULT_CHILD_LAYOUT;
  }
}

const DRAG_START_THRESHOLD = 4;

function HqGroupedBarChart({ categories = [], series = [], yMax = 100 }) {
  const ticks = [100, 80, 60, 40, 20, 0];
  return (
    <div className="hq-barchart">
      <div className="hq-barchart-y">
        {ticks.map((t) => (
          <div key={t} className="hq-barchart-y-tick">{t}</div>
        ))}
      </div>
      <div className="hq-barchart-main">
        <div className="hq-barchart-grid">
          {ticks.map((t) => (
            <div key={t} className="hq-barchart-grid-line"></div>
          ))}
        </div>
        <div className="hq-barchart-cats">
          {categories.map((cat, idx) => (
            <div key={cat + idx} className="hq-barchart-cat">
              <div className="hq-barchart-bars">
                {series.map((s) => {
                  const v = Array.isArray(s.values) ? Number(s.values[idx] || 0) : 0;
                  const h = Math.max(2, Math.round((v / yMax) * 100));
                  return (
                    <div key={s.name + idx} className="hq-barchart-bar-wrap">
                      <div className={`hq-barchart-bar ${s.color || "blue"}`} style={{ height: h + "%" }}></div>
                    </div>
                  );
                })}
              </div>
              <div className="hq-barchart-label">{cat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HqTopDeptCompletionChart({ items = [], scopeName = "总部各单位", canBack = false, onBack, onItemClick }) {
  const maxValue = Math.max(...items.flatMap((item) => [Number(item.total || 0), Number(item.done || 0)]), 0);
  const yMax = Math.max(8, Math.ceil(maxValue / 4) * 4);
  const yStep = yMax / 4;
  const yTicks = [yMax, yMax - yStep, yMax - yStep * 2, yMax - yStep * 3, 0];
  const doneTotal = items.reduce((sum, item) => sum + Number(item.done || 0), 0);
  const totalCount = items.reduce((sum, item) => sum + Number(item.total || 0), 0);
  return (
    <div className="hq-top-dept-chart">
      <div className="hq-top-dept-title-row">
        <div className="hq-top-dept-title">
          {scopeName}培训完成情况（<span className="hq-top-dept-title-done">{doneTotal}</span>/<span className="hq-top-dept-title-total">{totalCount}</span>）
        </div>
        {canBack ? <button type="button" className="hq-chart-back-btn" onClick={onBack}>返回上级</button> : null}
      </div>
      <div className="hq-top-dept-legend">
        <span className="hq-top-dept-legend-item"><i className="hq-top-dept-dot total"></i>项目总数</span>
        <span className="hq-top-dept-legend-item"><i className="hq-top-dept-dot done"></i>项目完成数</span>
      </div>
      <div className="hq-top-dept-main">
        <div className="hq-top-dept-left-axis">
          <div className="hq-top-dept-axis-label">项目数</div>
          <div className="hq-top-dept-y">
            {yTicks.map((tick) => (
              <div key={tick} className="hq-top-dept-y-tick">{tick}</div>
            ))}
          </div>
        </div>
        <div className="hq-top-dept-plot">
          <div className="hq-top-dept-grid">
            {yTicks.slice(0, -1).map((tick) => (
              <div key={tick} className="hq-top-dept-grid-line"></div>
            ))}
          </div>
          <div className="hq-top-dept-bars" style={{ gridTemplateColumns: `repeat(${items.length || 1}, minmax(0, 1fr))` }}>
            {items.map((item, idx) => {
              const total = Number(item.total || 0);
              const done = Number(item.done || 0);
              const totalHeight = Math.max(2, Math.round((total / yMax) * 100));
              const doneHeight = Math.max(2, Math.round((done / yMax) * 100));
              return (
                <button key={`${item.name}-${idx}`} type="button" className="hq-top-dept-col hq-chart-drill-col" onClick={() => onItemClick?.(item)}>
                  <div className="hq-top-dept-col-bars">
                    <div className="hq-top-dept-bar-wrap" style={{ height: `${totalHeight}%` }}>
                      <div className="hq-top-dept-bar total"></div>
                      <span className="hq-top-dept-bar-num">{total}</span>
                    </div>
                    <div className="hq-top-dept-bar-wrap" style={{ height: `${doneHeight}%` }}>
                      <div className="hq-top-dept-bar done"></div>
                      <span className="hq-top-dept-bar-num">{done}</span>
                    </div>
                  </div>
                  <div className="hq-top-dept-label">{item.name}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function HqDrillModal({ open, config = {}, onClose }) {
  if (!open) return null;
  const title = config.title || "";
  const filters = config.filters || [];
  const columns = config.columns || [];
  const rows = config.rows || [];
  const total = config.total || 400;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl hq-drill-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">
          <div className="filterbar">
            <div className="filterbar-row">
              <div className="filterbar-left">
                {filters.map((item) => (
                  <div className="filterbar-item" key={item.label}>
                    <div className="filterbar-label">{item.label}</div>
                    <div className="filterbar-input">
                      {item.type === "select" ? (
                        <select className="filterbar-control" defaultValue={item.defaultValue || ""} style={{ minWidth: item.width || 140 }}>
                          {(item.options || []).map((option) => (
                            <option value={option} key={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input className="filterbar-control" placeholder={item.placeholder || `请输入${item.label}`} defaultValue="" style={{ minWidth: item.width || 150 }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="filterbar-query-actions">
                <button type="button" className="btn btn-primary">查询</button>
                <button type="button" className="btn">重置</button>
                <button type="button" className="btn">导出</button>
              </div>
            </div>
          </div>
          <div className="table-wrap">
            <table className="proto-table">
              <thead>
                <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hq-drill-pager">
            <span>共 {total} 条</span>
            <button type="button" className="hq-pg-btn">&lt;</button>
            <button type="button" className="hq-pg-btn active">1</button>
            <button type="button" className="hq-pg-btn">2</button>
            <button type="button" className="hq-pg-btn">3</button>
            <span className="hq-pg-ellipsis">...</span>
            <button type="button" className="hq-pg-btn">40</button>
            <button type="button" className="hq-pg-btn">&gt;</button>
            <span>10条/页</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FineText({ children, align = "left", tone = "label" }) {
  return <div className={`hq-fine-text ${tone} ${align}`}>{children}</div>;
}

function FineCardBox() {
  return <div className="hq-fine-card-box" />;
}

export default function Page() {
  const historyRef = React.useRef([]);
  const futureRef = React.useRef([]);
  const [drillModal, setDrillModal] = React.useState("");
  const [orgCollapsed, setOrgCollapsed] = React.useState(false);
  const [trainingPlanScope, setTrainingPlanScope] = React.useState("root");
  const [activeRankMetric, setActiveRankMetric] = React.useState("plan");
  const publishRestricted = isPublishRestricted();
  const [layoutEdit, setLayoutEdit] = React.useState(false);
  const [mosaicLayout, setMosaicLayout] = React.useState(() => readMosaicLayout());
  const [childLayout, setChildLayout] = React.useState(() => readChildLayout());
  const [selectedChildKey, setSelectedChildKey] = React.useState("");
  const [historyVersion, setHistoryVersion] = React.useState(0);
  const mosaicGridRef = React.useRef(null);
  const latestMosaicLayoutRef = React.useRef(mosaicLayout);
  const latestChildLayoutRef = React.useRef(childLayout);
  React.useEffect(() => {
    latestMosaicLayoutRef.current = mosaicLayout;
  }, [mosaicLayout]);
  React.useEffect(() => {
    latestChildLayoutRef.current = childLayout;
  }, [childLayout]);
  React.useEffect(() => {
    if (publishRestricted || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(MOSAIC_LAYOUT_STORAGE_KEY, JSON.stringify(mosaicLayout));
    } catch {
      // ignore
    }
  }, [mosaicLayout, publishRestricted]);
  React.useEffect(() => {
    if (publishRestricted || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(MOSAIC_CHILD_STORAGE_KEY, JSON.stringify(childLayout));
    } catch {
      // ignore
    }
  }, [childLayout, publishRestricted]);
  const updatePanelLayout = React.useCallback((key, patch) => {
    setMosaicLayout((prev) => {
      const current = prev[key] || DEFAULT_MOSAIC_LAYOUT[key];
      return normalizeMosaicLayout({ ...prev, [key]: { ...current, ...patch } });
    });
  }, []);
  const updateChildLayout = React.useCallback((key, patch) => {
    setChildLayout((prev) => {
      const current = prev[key] || DEFAULT_CHILD_LAYOUT[key];
      return normalizeChildLayout({ ...prev, [key]: { ...current, ...patch } });
    });
  }, []);
  const pushHistorySnapshot = React.useCallback(() => {
    historyRef.current.push({
      mosaicLayout: latestMosaicLayoutRef.current,
      childLayout: latestChildLayoutRef.current
    });
    if (historyRef.current.length > 80) historyRef.current.shift();
    futureRef.current = [];
    setHistoryVersion((v) => v + 1);
  }, []);
  const applySnapshot = React.useCallback((snapshot) => {
    if (!snapshot) return;
    setMosaicLayout(normalizeMosaicLayout(snapshot.mosaicLayout));
    setChildLayout(normalizeChildLayout(snapshot.childLayout));
    setSelectedChildKey("");
  }, []);
  const undoLayoutChange = React.useCallback(() => {
    const snapshot = historyRef.current.pop();
    if (!snapshot) return;
    futureRef.current.push({
      mosaicLayout: latestMosaicLayoutRef.current,
      childLayout: latestChildLayoutRef.current
    });
    applySnapshot(snapshot);
    setHistoryVersion((v) => v + 1);
  }, [applySnapshot]);
  const redoLayoutChange = React.useCallback(() => {
    const snapshot = futureRef.current.pop();
    if (!snapshot) return;
    historyRef.current.push({
      mosaicLayout: latestMosaicLayoutRef.current,
      childLayout: latestChildLayoutRef.current
    });
    applySnapshot(snapshot);
    setHistoryVersion((v) => v + 1);
  }, [applySnapshot]);
  const bringChildToFront = React.useCallback((childKey) => {
    setChildLayout((prev) => {
      const current = prev[childKey] || DEFAULT_CHILD_LAYOUT[childKey];
      if (!current || current.kind === "background") return prev;
      const panelKey = (prev[childKey] || DEFAULT_CHILD_LAYOUT[childKey])?.panelKey;
      const maxZ = Math.max(
        ...Object.values(prev)
          .filter((item) => item.panelKey === panelKey)
          .map((item) => Number(item?.z || 0)),
        0
      );
      return normalizeChildLayout({ ...prev, [childKey]: { ...current, z: maxZ + 1 } });
    });
  }, []);
  const bringPanelToFront = React.useCallback((key) => {
    setMosaicLayout((prev) => {
      const maxZ = Math.max(...Object.values(prev).map((item) => Number(item?.z || 0)), 0);
      const current = prev[key] || DEFAULT_MOSAIC_LAYOUT[key];
      return normalizeMosaicLayout({ ...prev, [key]: { ...current, z: maxZ + 1 } });
    });
  }, []);
  const beginDragPanel = React.useCallback((event, key) => {
    if (!layoutEdit || publishRestricted) return;
    if (event.target.closest("button, input, select, textarea, .hq-layout-resize-handle, .hq-layout-delete-btn, .hq-child-controls, .hq-child-resize-handle")) return;
    event.preventDefault();
    bringPanelToFront(key);
    const startX = event.clientX;
    const startY = event.clientY;
    const start = mosaicLayout[key] || DEFAULT_MOSAIC_LAYOUT[key];
    let didStart = false;
    const onMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      if (!didStart) {
        if (Math.abs(deltaX) < DRAG_START_THRESHOLD && Math.abs(deltaY) < DRAG_START_THRESHOLD) return;
        pushHistorySnapshot();
        didStart = true;
      }
      updatePanelLayout(key, {
        x: start.x + deltaX,
        y: start.y + deltaY
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  }, [bringPanelToFront, layoutEdit, mosaicLayout, publishRestricted, pushHistorySnapshot, updatePanelLayout]);
  const beginResizePanel = React.useCallback((event, key) => {
    if (!layoutEdit || publishRestricted) return;
    event.preventDefault();
    event.stopPropagation();
    bringPanelToFront(key);
    const startX = event.clientX;
    const startY = event.clientY;
    const start = mosaicLayout[key] || DEFAULT_MOSAIC_LAYOUT[key];
    let didStart = false;
    const onMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      if (!didStart) {
        if (Math.abs(deltaX) < DRAG_START_THRESHOLD && Math.abs(deltaY) < DRAG_START_THRESHOLD) return;
        pushHistorySnapshot();
        didStart = true;
      }
      updatePanelLayout(key, {
        width: start.width + deltaX,
        height: start.height + deltaY
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  }, [bringPanelToFront, layoutEdit, mosaicLayout, publishRestricted, pushHistorySnapshot, updatePanelLayout]);
  const beginDragChild = React.useCallback((event, key) => {
    if (!layoutEdit || publishRestricted) return;
    if (event.target.closest("button, input, textarea, select, .hq-child-controls, .hq-child-resize-handle")) return;
    event.preventDefault();
    event.stopPropagation();
    setSelectedChildKey(key);
    bringChildToFront(key);
    const startX = event.clientX;
    const startY = event.clientY;
    const start = childLayout[key] || DEFAULT_CHILD_LAYOUT[key];
    let didStart = false;
    const onMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      if (!didStart) {
        if (Math.abs(deltaX) < DRAG_START_THRESHOLD && Math.abs(deltaY) < DRAG_START_THRESHOLD) return;
        pushHistorySnapshot();
        didStart = true;
      }
      updateChildLayout(key, {
        x: start.x + deltaX,
        y: start.y + deltaY
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  }, [bringChildToFront, childLayout, layoutEdit, publishRestricted, pushHistorySnapshot, updateChildLayout]);
  const beginResizeChild = React.useCallback((event, key) => {
    if (!layoutEdit || publishRestricted) return;
    event.preventDefault();
    event.stopPropagation();
    setSelectedChildKey(key);
    bringChildToFront(key);
    const startX = event.clientX;
    const startY = event.clientY;
    const start = childLayout[key] || DEFAULT_CHILD_LAYOUT[key];
    let didStart = false;
    const onMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      if (!didStart) {
        if (Math.abs(deltaX) < DRAG_START_THRESHOLD && Math.abs(deltaY) < DRAG_START_THRESHOLD) return;
        pushHistorySnapshot();
        didStart = true;
      }
      updateChildLayout(key, {
        width: start.width + deltaX,
        height: start.height + deltaY
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
  }, [bringChildToFront, childLayout, layoutEdit, publishRestricted, pushHistorySnapshot, updateChildLayout]);
  const layoutPanelProps = React.useCallback((key) => {
    const item = mosaicLayout[key] || DEFAULT_MOSAIC_LAYOUT[key];
    return {
      onPointerDown: (event) => beginDragPanel(event, key),
      style: {
        left: item.x,
        top: item.y,
        width: item.width,
        height: item.height,
        zIndex: item.z,
        display: item.hidden ? "none" : undefined
      }
    };
  }, [beginDragPanel, mosaicLayout]);
  const ResizeHandle = ({ panelKey }) => (
    !publishRestricted && layoutEdit ? (
      <span
        className="hq-layout-resize-handle"
        onPointerDown={(event) => beginResizePanel(event, panelKey)}
        title="拖动调整模块大小"
      />
    ) : null
  );
  const DeleteHandle = ({ panelKey }) => (
    !publishRestricted && layoutEdit ? (
      <button
        type="button"
        className="hq-layout-delete-btn"
        onClick={(event) => {
          event.stopPropagation();
          pushHistorySnapshot();
          updatePanelLayout(panelKey, { hidden: true });
        }}
        title="删除模块"
      >
        ×
      </button>
    ) : null
  );
  const addPageNote = React.useCallback(() => {
    pushHistorySnapshot();
    const noteKey = `__page__:note:${Date.now()}`;
    setChildLayout((prev) => {
      const maxZ = Math.max(...Object.values(prev).map((item) => Number(item?.z || 0)), 4999);
      return normalizeChildLayout({
        ...prev,
        [noteKey]: {
          panelKey: "__page__",
          x: 280,
          y: 40,
          width: 220,
          height: 96,
          z: maxZ + 1,
          fontSize: 14,
          color: "#8a5b00",
          hidden: false,
          kind: "note",
          text: "请输入备注"
        }
      });
    });
  }, [pushHistorySnapshot]);
  const EditableNode = ({ childKey, className = "", children }) => {
    const item = childLayout[childKey] || DEFAULT_CHILD_LAYOUT[childKey];
    const isSelected = selectedChildKey === childKey;
    if (item.hidden) return null;
    return (
      <div
        className={`hq-editable-node${layoutEdit && !publishRestricted ? " is-editing" : ""}${isSelected ? " is-selected" : ""}${className ? ` ${className}` : ""}`}
        style={{
          left: item.x,
          top: item.y,
          width: item.width,
          height: item.height,
          zIndex: item.panelKey === "__page__" ? Math.max(item.z, 5000) : item.z,
          "--hq-child-font-size": `${item.fontSize}px`,
          "--hq-child-color": item.color
        }}
        onPointerDown={(event) => beginDragChild(event, childKey)}
      >
        {item.kind === "note" ? (
          layoutEdit && !publishRestricted ? (
            <div className="hq-editable-note-shell">
              <div
                className="hq-note-dragbar"
                onPointerDown={(event) => beginDragChild(event, childKey)}
              >
                备注
              </div>
              <textarea
                className="hq-editable-note"
                value={item.text}
                onFocus={() => {
                  setSelectedChildKey(childKey);
                  pushHistorySnapshot();
                }}
                onChange={(event) => updateChildLayout(childKey, { text: event.target.value })}
              />
            </div>
          ) : (
            <div className="hq-note-display">{item.text}</div>
          )
        ) : (
          <div className="hq-editable-node-content">{children}</div>
        )}
        {!publishRestricted && layoutEdit && isSelected ? (
          <div className="hq-child-controls">
            <button
              type="button"
              className="hq-child-mini-btn"
              onClick={(event) => {
                event.stopPropagation();
                pushHistorySnapshot();
                updateChildLayout(childKey, { hidden: true });
              }}
              title="删除小模块"
            >
              ×
            </button>
            <button
              type="button"
              className="hq-child-mini-btn"
              onClick={(event) => {
                event.stopPropagation();
                pushHistorySnapshot();
                updateChildLayout(childKey, { fontSize: item.fontSize - 2 });
              }}
              title="缩小字号"
            >
              A-
            </button>
            <button
              type="button"
              className="hq-child-mini-btn"
              onClick={(event) => {
                event.stopPropagation();
                pushHistorySnapshot();
                updateChildLayout(childKey, { fontSize: item.fontSize + 2 });
              }}
              title="放大字号"
            >
              A+
            </button>
            <input
              className="hq-child-color-input"
              type="color"
              value={item.color}
              onClick={(event) => event.stopPropagation()}
              onChange={(event) => {
                pushHistorySnapshot();
                updateChildLayout(childKey, { color: event.target.value });
              }}
              title="设置文字颜色"
            />
          </div>
        ) : null}
        {!publishRestricted && layoutEdit && isSelected ? (
          <span
            className="hq-child-resize-handle"
            onPointerDown={(event) => beginResizeChild(event, childKey)}
            title="拖动放大缩小组件"
          />
        ) : null}
      </div>
    );
  };
  const childNotes = React.useCallback((panelKey) => (
    Object.keys(childLayout)
      .filter((key) => panelKey === "__page__" ? key.startsWith("__page__:note:") : key.startsWith(`${panelKey}:note:`))
      .sort((a, b) => (childLayout[a]?.z || 0) - (childLayout[b]?.z || 0))
  ), [childLayout]);
  const canUndo = historyRef.current.length > 0;
  const canRedo = futureRef.current.length > 0;
  const mosaicCanvasHeight = React.useMemo(() => {
    const visiblePanels = Object.values(mosaicLayout).filter((item) => !item.hidden);
    const maxBottom = visiblePanels.reduce((max, item) => Math.max(max, Number(item.y || 0) + Number(item.height || 0)), 0);
    return Math.max(720, maxBottom + 24);
  }, [mosaicLayout]);
  const cats = ["油田", "炼化", "销售", "石油工程", "炼化工程", "科研", "其他"];
  const metricRankTabs = [
    {
      key: "plan",
      label: "培训计划完成率（40%）",
      shortLabel: "计划完成率",
      unit: "%",
      top: [
        { company: "镇海炼化", value: "100%" },
        { company: "湖南石化", value: "99%" },
        { company: "茂名石化", value: "98%" },
        { company: "齐鲁石化", value: "98%" },
        { company: "扬子石化", value: "97%" }
      ],
      bottom: [
        { company: "华北油田", value: "78%" },
        { company: "中原油田", value: "79%" },
        { company: "江汉油田", value: "80%" },
        { company: "上海石化", value: "81%" },
        { company: "仪征化纤", value: "82%" }
      ]
    },
    {
      key: "certWarning",
      label: "证书失效预警人次（30%）",
      shortLabel: "证书预警",
      unit: "人次",
      top: [
        { company: "镇海炼化", value: "0人次" },
        { company: "齐鲁石化", value: "1人次" },
        { company: "扬子石化", value: "1人次" },
        { company: "湖南石化", value: "2人次" },
        { company: "金陵石化", value: "2人次" }
      ],
      bottom: [
        { company: "西北油田", value: "28人次" },
        { company: "华东石油局", value: "24人次" },
        { company: "河南油田", value: "21人次" },
        { company: "中原油田", value: "19人次" },
        { company: "江汉油田", value: "18人次" }
      ]
    },
    {
      key: "keyCert",
      label: "关键岗位持证率（20%）",
      shortLabel: "持证率",
      unit: "%",
      top: [
        { company: "镇海炼化", value: "99%" },
        { company: "茂名石化", value: "98%" },
        { company: "齐鲁石化", value: "98%" },
        { company: "扬子石化", value: "97%" },
        { company: "燕山石化", value: "97%" }
      ],
      bottom: [
        { company: "胜利油田", value: "82%" },
        { company: "江苏油田", value: "83%" },
        { company: "华北石油局", value: "84%" },
        { company: "仪征化纤", value: "85%" },
        { company: "天津石化", value: "86%" }
      ]
    },
    {
      key: "report",
      label: "年度报告评分（10%）",
      shortLabel: "报告评分",
      unit: "分",
      top: [
        { company: "湖南石化", value: "99分" },
        { company: "镇海炼化", value: "98分" },
        { company: "茂名石化", value: "98分" },
        { company: "齐鲁石化", value: "97分" },
        { company: "扬子石化", value: "97分" }
      ],
      bottom: [
        { company: "河南油田", value: "78分" },
        { company: "华东石油局", value: "80分" },
        { company: "江苏油田", value: "81分" },
        { company: "天津石化", value: "82分" },
        { company: "仪征化纤", value: "83分" }
      ]
    },
    {
      key: "score",
      label: "综合绩效",
      shortLabel: "综合绩效",
      unit: "分",
      top: [
        { company: "镇海炼化", value: "98.89" },
        { company: "湖南石化", value: "98.12" },
        { company: "茂名石化", value: "97.76" },
        { company: "齐鲁石化", value: "97.48" },
        { company: "扬子石化", value: "96.95" }
      ],
      bottom: [
        { company: "华东石油局", value: "79.62" },
        { company: "河南油田", value: "80.15" },
        { company: "中原油田", value: "81.36" },
        { company: "江苏油田", value: "82.08" },
        { company: "天津石化", value: "83.47" }
      ]
    }
  ];
  const currentMetricRank = metricRankTabs.find((item) => item.key === activeRankMetric) || metricRankTabs[0];
  const metricRankRows = [
    ...currentMetricRank.top.map((item, index) => ({ ...item, rank: index + 1, group: "前5名" })),
    ...currentMetricRank.bottom.map((item, index) => ({ ...item, rank: index + 117, group: "后5名", isBottom: true }))
  ];
  const topOrgItems = [
    { name: "健康安全环保部", total: 6, done: 4, scope: "hse" },
    { name: "炼油事业部", total: 5, done: 3, scope: "refining" },
    { name: "化工事业部", total: 5, done: 3, scope: "chemical" },
    { name: "销售事业部", total: 4, done: 2, scope: "sales" },
    { name: "人力资源部", total: 4, done: 3 },
    { name: "生产经营管理部", total: 5, done: 4 },
    { name: "工程部", total: 3, done: 2 },
    { name: "科技部", total: 4, done: 3, scope: "research" }
  ];
  const healthDeptItems = [
    { name: "风险室", total: 6, done: 4 },
    { name: "体系室", total: 5, done: 3 },
    { name: "综管室", total: 4, done: 2 },
    { name: "公共安全室", total: 5, done: 3 }
  ];
  const businessUnitItems = {
    refining: [
      { name: "镇海炼化", total: 6, done: 5 },
      { name: "齐鲁石化", total: 5, done: 4 },
      { name: "茂名石化", total: 5, done: 3 },
      { name: "扬子石化", total: 4, done: 3 }
    ],
    chemical: [
      { name: "上海石化", total: 5, done: 4 },
      { name: "仪征化纤", total: 4, done: 3 },
      { name: "燕山石化", total: 4, done: 3 },
      { name: "天津石化", total: 3, done: 2 }
    ],
    sales: [
      { name: "销售华东", total: 5, done: 3 },
      { name: "销售华南", total: 4, done: 3 },
      { name: "销售华北", total: 4, done: 2 },
      { name: "销售华中", total: 3, done: 2 }
    ],
    research: [
      { name: "石科院", total: 4, done: 3 },
      { name: "北化院", total: 3, done: 2 },
      { name: "上海院", total: 3, done: 2 },
      { name: "青岛安工院", total: 2, done: 1 }
    ]
  };
  const trainingPlanScopeMap = {
    root: { name: "总部各单位", items: topOrgItems },
    hse: { name: "健康安全环保部各室", items: healthDeptItems },
    refining: { name: "炼油事业部企业", items: businessUnitItems.refining },
    chemical: { name: "化工事业部企业", items: businessUnitItems.chemical },
    sales: { name: "销售事业部企业", items: businessUnitItems.sales },
    research: { name: "科研单位", items: businessUnitItems.research }
  };
  const currentTrainingPlanScope = trainingPlanScopeMap[trainingPlanScope] || trainingPlanScopeMap.root;
  const trainingRoleStats = [
    { name: "新员工", count: 2544, rate: "100%" },
    { name: "基层安全员", count: 486, rate: "96%" },
    { name: "安全总监", count: 121, rate: "98%" }
  ];
  const archiveSeries = [
    { name: "培训档案数量", color: "blue", values: [42, 46, 65, 46, 65, 46, 46] },
    { name: "培训总时长", color: "cyan", values: [36, 35, 36, 36, 36, 36, 36] },
    { name: "培训档案更新率", color: "green", values: [52, 54, 72, 54, 72, 54, 54] },
    { name: "培训覆盖率", color: "purple", values: [65, 66, 28, 65, 28, 65, 65] }
  ];
  const feeSeries = [
    { name: "总费用", color: "blue", values: [45, 45, 65, 45, 65, 45, 45] },
    { name: "办班相关费用", color: "cyan", values: [36, 36, 36, 36, 36, 36, 36] },
    { name: "购买设备设施及软件开发费", color: "green", values: [52, 52, 72, 52, 72, 52, 52] },
    { name: "培训基地建设费用", color: "purple", values: [65, 65, 28, 65, 28, 65, 65] }
  ];
  const enterpriseOptions = ["全部", "镇海炼化", "湖南石化", "茂名石化", "齐鲁石化", "扬子石化"];
  const yearFilter = { label: "年度", type: "select", options: ["全部", "2026", "2025", "2024"], defaultValue: "2026", width: 110 };
  const enterpriseFilter = { label: "企业", type: "select", options: enterpriseOptions, defaultValue: "全部", width: 150 };
  const commonEnterpriseFilters = [yearFilter, enterpriseFilter];
  const drillConfigs = {
    metric: {
      title: "企业培训绩效排名情况",
      total: 121,
      filters: [
        yearFilter,
        { label: "板块", type: "select", options: ["全部", "油田", "炼化", "销售", "石油工程", "炼化工程", "科研", "其他"], defaultValue: "全部", width: 120 },
        enterpriseFilter
      ],
      columns: ["排名", "企业", "培训计划完成率（40%）", "证书失效预警人次（30%）", "关键岗位持证率（20%）", "年度报告评分（10%）", "综合绩效"],
      rows: [
        ["1", "镇海炼化", "100%", "0人次", "99%", "98分", "98.89"],
        ["2", "湖南石化", "99%", "2人次", "96%", "99分", "98.12"],
        ["3", "茂名石化", "98%", "3人次", "98%", "98分", "97.76"],
        ["4", "齐鲁石化", "98%", "1人次", "98%", "97分", "97.48"],
        ["5", "扬子石化", "97%", "1人次", "97%", "97分", "96.95"],
        ["6", "燕山石化", "96%", "4人次", "97%", "96分", "96.34"],
        ["7", "金陵石化", "96%", "2人次", "96%", "96分", "95.88"],
        ["8", "上海石化", "81%", "12人次", "88%", "86分", "85.12"],
        ["9", "天津石化", "86%", "15人次", "86%", "82分", "83.47"],
        ["10", "华东石油局", "78%", "24人次", "84%", "80分", "79.62"]
      ]
    },
    plan: {
      title: "企业培训计划完成情况",
      tip: "点击项目数（12/20），可穿透查看总部层级组织的所有培训项目列表，且可搜索、导出",
      filters: [
        yearFilter,
        { label: "主办部门", type: "select", options: ["全部", "总部安环部", "质量管理部", "公共安全室", "人力资源部", "生产运行部", "综管室"], defaultValue: "全部", width: 140 },
        { label: "培训对象", type: "select", options: ["全部", "安全管理人员", "内审员", "应急骨干", "新入职员工", "作业监护人"], defaultValue: "全部", width: 140 },
        { label: "项目代码", placeholder: "请输入项目代码", width: 130 },
        { label: "项目名称", placeholder: "请输入项目名称", width: 150 }
      ],
      columns: ["序号", "项目代码", "项目名称", "培训对象", "天数", "计划时间", "实施时间", "计划期次", "完成期次", "计划人数", "实际参与人数", "培训合格率", "主办部门", "承办单位"],
      rows: [
        ["1", "PJ202601001", "风险辨识专题培训", "安全管理人员", "2", "2026-01-10", "2026-01-12", "1", "1", "60", "58", "97%", "总部安环部", "培训中心"],
        ["2", "PJ202601002", "体系文件宣贯培训", "内审员", "1", "2026-01-18", "2026-01-18", "1", "1", "45", "45", "100%", "质量管理部", "培训中心"],
        ["3", "PJ202601003", "应急预案演练培训", "应急骨干", "2", "2026-02-03", "2026-02-05", "1", "1", "50", "49", "98%", "公共安全室", "应急中心"],
        ["4", "PJ202601004", "新员工三级安全教育", "新入职员工", "1", "2026-02-10", "2026-02-10", "2", "2", "120", "117", "98%", "人力资源部", "培训中心"],
        ["5", "PJ202601005", "特殊作业票证培训", "作业监护人", "1", "2026-02-17", "2026-02-17", "1", "1", "80", "76", "95%", "生产运行部", "培训中心"],
        ["6", "PJ202601006", "新员工三级教育", "新员工", "3", "2026-03-01", "2026-03-03", "3", "2", "90", "62", "89%", "人力资源部", "培训中心"],
        ["7", "PJ202601007", "危化品管理培训", "仓储岗位", "1", "2026-03-08", "2026-03-08", "1", "1", "36", "36", "100%", "仓储物流部", "培训中心"],
        ["8", "PJ202601008", "高处作业安全培训", "检维修人员", "1", "2026-03-15", "2026-03-15", "2", "1", "72", "40", "90%", "设备管理部", "检维修中心"],
        ["9", "PJ202601009", "事故案例复盘培训", "班组长", "1", "2026-03-20", "2026-03-20", "1", "1", "64", "61", "95%", "综管室", "培训中心"],
        ["10", "PJ202601010", "消防器材实操培训", "消防员", "1", "2026-03-24", "2026-03-24", "1", "1", "28", "28", "100%", "公共安全室", "消防站"]
      ]
    },
    cert: {
      title: "HSE关键岗位人员取证情况",
      filters: [
        ...commonEnterpriseFilters,
        { label: "持证状态", type: "select", options: ["全部", "已持证", "未持证"], defaultValue: "全部", width: 110 }
      ],
      columns: ["序号", "企业", "主要负责人是否持证", "关键岗位持证率", "安全管理人员数量/持证上岗率", "安全管理人员注安师数量/配置率", "特种作业人员数量/持证上岗率"],
      rows: [
        ["1", "镇海炼化", "是", "97%", "1999/100%", "789/100%", "890/100%"],
        ["2", "湖南石化", "是", "97%", "", "", "890/100%"]
      ]
    },
    personCert: {
      title: "企业各级人员取证情况",
      filters: [
        ...commonEnterpriseFilters,
        { label: "人员类别", type: "select", options: ["全部", "安全管理人员", "安全管理人员注安师", "特种作业人员"], defaultValue: "全部", width: 150 }
      ],
      columns: ["序号", "企业", "人员类别", "人员数量", "持证人数", "持证上岗率", "注安师数量", "注安师占比", "统计日期"],
      rows: [
        ["1", "镇海炼化", "安全管理人员", "2000", "1600", "80%", "1000", "20%", "2026-05-14"],
        ["2", "湖南石化", "安全管理人员注安师", "1000", "1000", "100%", "200", "20%", "2026-05-14"],
        ["3", "茂名石化", "特种作业人员", "1500", "1500", "100%", "-", "-", "2026-05-14"]
      ]
    },
    employeeTraining: {
      title: "重点人员培训完成明细",
      filters: [
        ...commonEnterpriseFilters,
        { label: "人员类别", type: "select", options: ["全部", "新员工", "基层安全员", "安全总监"], defaultValue: "全部", width: 120 },
        { label: "培训项目", placeholder: "请输入培训项目", width: 150 }
      ],
      columns: ["序号", "年度", "企业", "参加人员数量", "人员类别", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "新员工", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "486", "基层安全员", "基层安全员履职能力培训", "2024年10月04日", "96%"],
        ["3", "2024", "茂名石化", "121", "安全总监", "安全总监履职能力提升", "2024年10月04日", "98%"]
      ]
    },
    trainee: {
      title: "新员工三级安全教育和培训情况-新员工",
      filters: commonEnterpriseFilters,
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "新员工", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "10", "", "", "", "100%"]
      ]
    },
    transfer: {
      title: "新员工三级安全教育和培训情况-转岗人员",
      filters: commonEnterpriseFilters,
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "16", "转岗人员", "转岗安全适应性培训", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "12", "转岗人员", "岗位变更风险提示培训", "2024年09月18日", "100%"]
      ]
    },
    intern: {
      title: "新员工三级安全教育和培训情况-实习生",
      filters: commonEnterpriseFilters,
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "实习生", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "10", "", "", "", "100%"]
      ]
    },
    archive: {
      title: "从业人员安全培训档案管理情况",
      filters: commonEnterpriseFilters,
      columns: ["序号", "企业", "培训档案数量", "培训总时长", "培训档案更新率", "培训覆盖率"],
      rows: [
        ["1", "镇海炼化", "590", "1547", "99%", "88%"],
        ["2", "茂名石化", "612", "1682", "98%", "91%"],
        ["3", "扬子石化", "574", "1498", "97%", "89%"]
      ]
    },
    eval: {
      title: "领导干部HSE履职能力评价情况",
      filters: [
        ...commonEnterpriseFilters,
        { label: "层级", type: "select", options: ["全部", "中层", "基层"], defaultValue: "全部", width: 100 }
      ],
      columns: ["序号", "企业", "计划评估人数", "实际评估人数", "评估通过人数", "调岗或约谈人数"],
      rows: [
        ["1", "镇海炼化", "99", "98", "97", "3"],
        ["2", "茂名石化", "96", "95", "94", "2"],
        ["3", "扬子石化", "92", "91", "90", "2"]
      ]
    },
    fee: {
      title: "安全生产教育和培训经费投入",
      filters: commonEnterpriseFilters,
      columns: ["序号", "企业", "总费用", "办班相关费用", "购买设备设施及软件开发费", "培训基地建设费用"],
      rows: [
        ["1", "镇海炼化", "10020000", "990000", "680000", "1547000"],
        ["2", "茂名石化", "9680000", "850000", "520000", "1380000"],
        ["3", "扬子石化", "9360000", "810000", "460000", "1290000"]
      ]
    },
    tempPlan: {
      title: "企业培训计划完成情况",
      filters: [
        ...commonEnterpriseFilters,
        { label: "计划类型", type: "select", options: ["全部", "年度计划", "临时计划"], defaultValue: "全部", width: 120 }
      ],
      columns: ["序号", "企业", "计划类型", "计划数量", "完成数量", "执行率", "临时计划数量", "统计月份"],
      rows: [
        ["1", "镇海炼化", "年度计划", "40", "32", "80%", "24", "2026年05月"],
        ["2", "湖南石化", "年度计划", "36", "29", "81%", "20", "2026年05月"],
        ["3", "茂名石化", "临时计划", "28", "22", "79%", "26", "2026年05月"]
      ]
    }
  };

  return (
    <div className={`hq-shell hq-training-stat-page enterprise-training-stat-page ${orgCollapsed ? "hq-org-collapsed" : ""}`}>
      <aside className="hq-sidebar">
        <div className="hq-sidebar-head">
          <div className="hq-sidebar-title">中国石化集团公司</div>
          <button type="button" className="hq-org-toggle" onClick={() => setOrgCollapsed((v) => !v)} aria-label={orgCollapsed ? "展开组织树" : "收起组织树"}>
            {orgCollapsed ? "›" : "‹"}
          </button>
        </div>
        {!orgCollapsed ? (
          <div className="hq-menu-group">
            <label className="hq-menu-item active"><input type="radio" name="hq-nav" defaultChecked readOnly /> 总部机关</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 资兴运营部（资兴公司）</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 宁波工程公司</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 镇海炼化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 中石化江汉石油有限公司</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 胜利油田</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 中原油田</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 河南油田</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 江汉油田</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 江苏油田</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 华北石油局</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 华东石油局</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 西南石油局</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 西北油田分公司</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 勘探分公司</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 燕山石化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 齐鲁石化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 金陵石化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 茂名石化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 天津石化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 扬子石化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 湖南石化</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 上海金山石化股份有限公司</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 仪征化纤</label>
            <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 新疆炼化有限责任公司</label>
          </div>
        ) : null}
        {orgCollapsed ? <div className="hq-org-collapsed-label">组织</div> : null}
      </aside>

      <main className="hq-main">
        <div className="hq-content">
          {!publishRestricted ? (
            <div className="hq-layout-toolbar">
              <button type="button" className={`hq-layout-edit-btn${layoutEdit ? " active" : ""}`} onClick={() => setLayoutEdit((v) => !v)}>
                  {layoutEdit ? "完成布局编辑" : "编辑布局"}
                </button>
              {layoutEdit ? (
                <button type="button" className="hq-layout-edit-btn" onClick={undoLayoutChange} disabled={!canUndo}>
                  撤回
                </button>
              ) : null}
              {layoutEdit ? (
                <button type="button" className="hq-layout-edit-btn" onClick={redoLayoutChange} disabled={!canRedo}>
                  重做
                </button>
              ) : null}
              {layoutEdit ? (
                <button type="button" className="hq-layout-edit-btn" onClick={addPageNote}>
                  新增备注
                </button>
              ) : null}
              {layoutEdit ? (
                <button
                  type="button"
                  className="hq-layout-edit-btn"
                  onClick={() => {
                    pushHistorySnapshot();
                    setMosaicLayout(DEFAULT_MOSAIC_LAYOUT);
                    setChildLayout(DEFAULT_CHILD_LAYOUT);
                    setSelectedChildKey("");
                  }}
                >
                  恢复默认
                </button>
              ) : null}
              {layoutEdit ? <span className="hq-layout-tip">先点选组件再编辑；右下角手柄缩放。备注改为页面级新增，可在整页自由拖动并随发布显示。</span> : null}
            </div>
          ) : null}
          <section
            ref={mosaicGridRef}
            className={`hq-mosaic-grid${layoutEdit && !publishRestricted ? " is-editing" : ""}`}
            style={{ minHeight: mosaicCanvasHeight }}
            onPointerDown={(event) => {
              if (!event.target.closest(".hq-editable-node")) {
                setSelectedChildKey("");
              }
            }}
          >
            {childNotes("__page__").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} className="hq-page-note-node" />)}
            <div className="hq-panel hq-score-rank-panel hq-mosaic-rank" {...layoutPanelProps("rank")}>
              <div className="hq-panel-freebody">
                <EditableNode childKey="rank:title"><div className="hq-score-rank-title">企业培训绩效排名</div></EditableNode>
                <EditableNode childKey="rank:head"><div className="hq-score-rank-head"><div className="hq-score-rank-head-title">{currentMetricRank.label}</div><button type="button" className="hq-rank-detail-link hq-linklike" onClick={() => setDrillModal("metric")}>查看更多</button></div></EditableNode>
                <EditableNode childKey="rank:tabs"><div className="hq-rank-tabs">{metricRankTabs.map((item) => (<button key={item.key} type="button" className={`hq-rank-tab${activeRankMetric === item.key ? " active" : ""}`} onClick={() => setActiveRankMetric(item.key)}>{item.shortLabel}</button>))}</div></EditableNode>
                <EditableNode childKey="rank:note"><div className="hq-score-rank-note">{activeRankMetric === "score" ? "综合绩效按 40%/30%/20%/10% 权重折算为综合分" : "当前展示原始指标值，综合绩效页签展示加权分"}</div></EditableNode>
                <EditableNode childKey="rank:list" className="hq-node-card"><div className="hq-score-rank-list">{metricRankRows.map((item) => (<div key={`${item.group}-${item.company}`} className={`hq-score-rank-row${item.isBottom ? " bottom" : ""}`}><span className="hq-score-rank-tag">{item.group}</span><span className="hq-score-rank-no">{item.rank}</span><span className="hq-score-rank-name">{item.company}</span><span className="hq-score-rank-score">{item.value}</span></div>))}</div></EditableNode>
                {childNotes("rank").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} />)}
              </div>
              <DeleteHandle panelKey="rank" />
              <ResizeHandle panelKey="rank" />
            </div>
            <div className="hq-panel hq-bar-panel hq-plan-completion-panel hq-mosaic-plan" {...layoutPanelProps("plan")}>
              <div className="hq-panel-freebody">
                <EditableNode childKey="plan:title"><div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("plan")}>培训计划完成情况</button></div></EditableNode>
                <EditableNode childKey="plan:chart" className="hq-node-card">
                  <HqTopDeptCompletionChart
                    items={currentTrainingPlanScope.items}
                    scopeName={currentTrainingPlanScope.name}
                    canBack={trainingPlanScope !== "root"}
                    onBack={() => setTrainingPlanScope("root")}
                    onItemClick={(item) => {
                      if (trainingPlanScope === "root" && item.scope) setTrainingPlanScope(item.scope);
                    }}
                  />
                </EditableNode>
                {childNotes("plan").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} />)}
              </div>
              <DeleteHandle panelKey="plan" />
              <ResizeHandle panelKey="plan" />
            </div>

            <div className="hq-panel hq-mosaic-cert" {...layoutPanelProps("cert")}>
              <div className="hq-panel-freebody">
                <EditableNode childKey="cert:title"><div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("cert")}>HSE关键岗位人员取证情况</button></div></EditableNode>
                <EditableNode childKey="cert:bg:1"><FineCardBox /></EditableNode>
                <EditableNode childKey="cert:label:1"><FineText tone="label">关键岗位持证率</FineText></EditableNode>
                <EditableNode childKey="cert:value:1"><FineText tone="value">95%</FineText></EditableNode>
                <EditableNode childKey="cert:bg:2"><FineCardBox /></EditableNode>
                <EditableNode childKey="cert:label:2"><FineText tone="label">关键岗位取证考试通过率</FineText></EditableNode>
                <EditableNode childKey="cert:value:2"><FineText tone="value">98%</FineText></EditableNode>
                {childNotes("cert").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} />)}
              </div>
              <DeleteHandle panelKey="cert" />
              <ResizeHandle panelKey="cert" />
            </div>
            <div className="hq-panel hq-cert-level-panel hq-mosaic-person-cert" {...layoutPanelProps("personCert")}>
              <div className="hq-panel-freebody">
                <EditableNode childKey="personCert:title"><div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("personCert")}>企业各级人员取证情况</button></div></EditableNode>
                <EditableNode childKey="personCert:bg:1"><FineCardBox /></EditableNode>
                <EditableNode childKey="personCert:label:1a"><FineText tone="label">安全管理人员数量</FineText></EditableNode>
                <EditableNode childKey="personCert:value:1a"><FineText tone="value">2000</FineText></EditableNode>
                <EditableNode childKey="personCert:label:1b"><FineText tone="label">持证上岗率</FineText></EditableNode>
                <EditableNode childKey="personCert:value:1b"><FineText tone="value">80%</FineText></EditableNode>
                <EditableNode childKey="personCert:bg:2"><FineCardBox /></EditableNode>
                <EditableNode childKey="personCert:label:2a"><FineText tone="label">安全管理人员注安师数量</FineText></EditableNode>
                <EditableNode childKey="personCert:value:2a"><FineText tone="value">1000</FineText></EditableNode>
                <EditableNode childKey="personCert:label:2b"><FineText tone="label">占比</FineText></EditableNode>
                <EditableNode childKey="personCert:value:2b"><FineText tone="value">20%</FineText></EditableNode>
                <EditableNode childKey="personCert:bg:3"><FineCardBox /></EditableNode>
                <EditableNode childKey="personCert:label:3a"><FineText tone="label">特种作业人员数量</FineText></EditableNode>
                <EditableNode childKey="personCert:value:3a"><FineText tone="value">1500</FineText></EditableNode>
                <EditableNode childKey="personCert:label:3b"><FineText tone="label">持证上岗率</FineText></EditableNode>
                <EditableNode childKey="personCert:value:3b"><FineText tone="value">100%</FineText></EditableNode>
                {childNotes("personCert").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} />)}
              </div>
              <DeleteHandle panelKey="personCert" />
              <ResizeHandle panelKey="personCert" />
            </div>
            <div className="hq-panel hq-mosaic-employee" {...layoutPanelProps("employee")}>
              <div className="hq-panel-freebody">
                <EditableNode childKey="employee:title"><div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("employeeTraining")}>重点人员培训完成情况</button></div></EditableNode>
                <EditableNode childKey="employee:bg:1"><FineCardBox /></EditableNode>
                <EditableNode childKey="employee:bg:2"><FineCardBox /></EditableNode>
                <EditableNode childKey="employee:bg:3"><FineCardBox /></EditableNode>
                {trainingRoleStats.map((item, index) => (
                  <React.Fragment key={item.name}>
                    <EditableNode childKey={`employee:${index + 1}:label-a`}><FineText tone="label">{item.name}数量</FineText></EditableNode>
                    <EditableNode childKey={`employee:${index + 1}:value-a`}><FineText tone="value">{item.count}</FineText></EditableNode>
                    <EditableNode childKey={`employee:${index + 1}:label-b`}><FineText tone="label">培训完成率</FineText></EditableNode>
                    <EditableNode childKey={`employee:${index + 1}:value-b`}><FineText tone="value">{item.rate}</FineText></EditableNode>
                  </React.Fragment>
                ))}
                {childNotes("employee").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} />)}
              </div>
              <DeleteHandle panelKey="employee" />
              <ResizeHandle panelKey="employee" />
            </div>
            <div className="hq-panel hq-mosaic-temp-plan" {...layoutPanelProps("tempPlan")}>
              <div className="hq-panel-freebody">
                <EditableNode childKey="tempPlan:title"><div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("tempPlan")}>企业培训计划完成情况</button></div></EditableNode>
                <EditableNode childKey="tempPlan:1"><div className="hq-mini-card"><div className="hq-mini-label">企业培训计划执行率均值</div><div className="hq-mini-label">当月/累计</div><div className="hq-mini-value">80%/30%</div></div></EditableNode>
                {childNotes("tempPlan").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} />)}
              </div>
              <DeleteHandle panelKey="tempPlan" />
              <ResizeHandle panelKey="tempPlan" />
            </div>

            <div className="hq-panel hq-archive-left hq-mosaic-archive" {...layoutPanelProps("archive")}>
              <div className="hq-panel-freebody">
                <EditableNode childKey="archive:title"><div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("archive")}>集团从业人员安全培训档案管理情况</button></div></EditableNode>
                <EditableNode childKey="archive:1"><div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训档案数量</div>
                    <div className="hq-archive-value">590</div>
                  </div>
                </div></EditableNode>
                <EditableNode childKey="archive:2"><div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训档案更新率</div>
                    <div className="hq-archive-value">99%</div>
                  </div>
                </div></EditableNode>
                <EditableNode childKey="archive:3"><div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训覆盖率</div>
                    <div className="hq-archive-value">88%</div>
                  </div>
                </div></EditableNode>
                <EditableNode childKey="archive:4"><div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训总时长</div>
                    <div className="hq-archive-value">1547</div>
                  </div>
                </div></EditableNode>
                {childNotes("archive").map((noteKey) => <EditableNode key={noteKey} childKey={noteKey} />)}
              </div>
              <DeleteHandle panelKey="archive" />
              <ResizeHandle panelKey="archive" />
            </div>
          </section>
        </div>
      </main>

      <HqDrillModal
        open={!!drillModal}
        config={drillModal ? drillConfigs[drillModal] : {}}
        onClose={() => setDrillModal("")}
      />
    </div>
  );
}
