import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SPECS_DIR = path.join(ROOT, "specs");
const MODULES_DIR = path.join(ROOT, "src", "modules");
const ROUTES_FILE = path.join(ROOT, "src", "app", "routes.generated.jsx");
const PROTECTED_GENERATED_PAGES = new Set([
  "san-tongshi/project-maintenance"
]);

function walkJsonFiles(dir) {
  const res = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) res.push(...walkJsonFiles(p));
    else if (st.isFile() && name.endsWith(".json")) res.push(p);
  }
  return res;
}
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function esc(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function cleanSegment(v) { return String(v || "").replace(/^\/+|\/+$/g, ""); }
function fileSafe(v) { return cleanSegment(v).replace(/[^\w/-]/g, "-"); }
function normalizeModule(v) { return fileSafe(v); }
function moduleGroupOf(v) { return cleanSegment(v).split("/")[0] || "other"; }
function labelHtml(v) {
  const raw = String(v || "");
  const m = raw.match(/^\s*\*\s*(.*)$/);
  if (!m) return esc(raw);
  return `<span className="required-mark">*</span>${esc(m[1] || "")}`;
}
function textList(items = []) {
  return items.map((item) => `<span className="tag">${esc(item)}</span>`).join("");
}
function hasModals(spec) {
  if ((spec.modals || []).length > 0) return true;
  return (spec.blocks || []).some((b) =>
    String(b.type || "").toLowerCase() === "table" &&
    (b.rows || []).some((row) =>
      (Array.isArray(row) ? (row || []) : Object.values(row || {}))
        .some((cell) => cell && typeof cell === "object" && cell.modal)
    )
  );
}
function hasTableLinks(blocks = []) {
  return blocks.some((b) =>
    String(b.type || "").toLowerCase() === "table" &&
    (b.rows || []).some((row) =>
      (Array.isArray(row) ? (row || []) : Object.values(row || {}))
        .some((cell) => cell && typeof cell === "object" && cell.to && !cell.modal)
    )
  );
}
function isSelectLike(label = "") {
  const s = String(label || "");
  return /(状态|类别|类型|级别|部门|单位|机构|企业|岗位|分类|种类|小类|人员|职务|角色)/.test(s);
}
function isDateLike(label = "") {
  const s = String(label || "");
  return /(日期|时间|期间|起止|区间)/.test(s);
}
function inferFilterField(field, idx = 0) {
  if (field && typeof field === "object" && !Array.isArray(field)) {
    const label = field.label || field.key || field.name || `条件${idx + 1}`;
    const type = String(field.type || "").toLowerCase();
    if (type) {
      return { ...field, label };
    }
    if (isDateLike(label)) {
      return { ...field, label, type: "daterange", start: field.start || "2026-02-01", end: field.end || "2026-02-11" };
    }
    if (isSelectLike(label)) {
      return { ...field, label, type: "select", options: field.options || ["全部", "选项1", "选项2"] };
    }
    return { ...field, label, type: "text", placeholder: field.placeholder || `请输入${label}` };
  }
  const label = Array.isArray(field) ? String(field[0] || "") : String(field || "");
  if (isDateLike(label)) {
    return { label, type: "daterange", start: "2026-02-01", end: "2026-02-11" };
  }
  if (isSelectLike(label)) {
    return { label, type: "select", options: ["全部", "选项1", "选项2"] };
  }
  return { label, type: "text", placeholder: `请输入${label}` };
}
function normalizeTableData(block) {
  const cols = (block.columns || []).map((c) => (c && typeof c === "object")
    ? { key: c.key || c.label, label: c.label || c.key }
    : { key: c, label: c }
  );
  const hasSel = cols.some((c) => String(c.key || "").toLowerCase() === "_sel" || String(c.label || "").toLowerCase() === "_sel");
  const outCols = hasSel ? cols : [{ key: "_sel", label: "_sel" }, ...cols];
  const srcKeys = cols.map((c) => c.key);
  const srcRows = (block.rows || []).map((row) => {
    const cells = Array.isArray(row) ? row : srcKeys.map((k) => (row || {})[k]);
    return hasSel ? cells : [{ type: "checkbox" }, ...cells];
  });
  const seedRows = srcRows.length > 0 ? srcRows : [
    outCols.map((c, idx) => (idx === 0 ? { type: "checkbox" } : `示例${idx}`))
  ];
  const seqIdx = outCols.findIndex((c) => String(c.key || "") === "序号" || String(c.label || "") === "序号");
  const outRows = [];
  for (let i = 0; i < 10; i += 1) {
    const template = seedRows[i % seedRows.length];
    const row = template.map((cell) => {
      if (cell && typeof cell === "object") return { ...cell };
      return cell;
    });
    if (String(outCols[0].key || "").toLowerCase() === "_sel") {
      const first = row[0];
      const isCheckbox = first && typeof first === "object" && (String(first.type || "").toLowerCase() === "checkbox" || first.checkbox);
      if (!isCheckbox) row[0] = { type: "checkbox" };
    }
    if (seqIdx >= 0) row[seqIdx] = String(i + 1);
    outRows.push(row);
  }
  return { columns: outCols, rows: outRows };
}
function tableCell(cell, withModals) {
  if (cell && typeof cell === "object") {
    const tdClass = cell.className ? ` className="${esc(cell.className)}"` : "";
    if (String(cell.type || "").toLowerCase() === "checkbox" || cell.checkbox) {
      const checked = cell.checked ? "checked" : "";
      return `<td className="table-checkbox"><input type="checkbox" ${checked} readOnly /></td>`;
    }
    const text = esc(cell.text || "");
    if (cell.modal && withModals) {
      return `<td${tdClass}><button type="button" className="table-link-btn" onClick={() => openModal("${esc(cell.modal)}", "${esc(cell.to || "")}")}>${text}</button></td>`;
    }
    if (cell.to) {
      return `<td${tdClass}><Link className="table-link" to="${esc(cell.to)}">${text}</Link></td>`;
    }
    return `<td${tdClass}>${text}</td>`;
  }
  return `<td>${esc(cell)}</td>`;
}
function projectMetaRows(items = []) {
  return (items || []).map((pair) => `
          <div className="detail-meta-item">
            <div className="detail-meta-key">${esc(pair[0] || "")}</div>
            <div className="detail-meta-val">{resolveDynamic("${esc(pair[1] || "")}")}</div>
          </div>`).join("");
}
function projectFormRows(items = []) {
  return (items || []).map((pair) => `
              <div className="detail-form-item">
                <div className="detail-form-key">${esc(pair[0] || "")}</div>
                <div className="detail-form-val">{resolveDynamic("${esc(pair[1] || "")}")}</div>
              </div>`).join("");
}
function projectDetailModal(m) {
  const actions = (m.actions || [{ label: "关闭" }]).map((act) => {
    if (act.to) {
      const target = act.to === "__DRILL__" ? "drillTarget" : `"${esc(act.to)}"`;
      return `<button type="button" className="btn btn-primary" onClick={() => goto(${target})}>\n              ${esc(act.label || "进入")}\n            </button>`;
    }
    if (act.open) {
      return `<button type="button" className="btn btn-primary" onClick={() => openModal("${esc(act.open)}", drillTarget)}>\n              ${esc(act.label || "下一步")}\n            </button>`;
    }
    return `<button type="button" className="btn" onClick={closeModal}>\n              ${esc(act.label || "关闭")}\n            </button>`;
  }).join("\n");

  const toggleRows = (m.toggles || []).map((t) => {
    const syncKeys = Array.from(new Set([
      t.syncWith,
      ...(m.toggles || []).filter((x) => x.syncWith === t.key).map((x) => x.key)
    ].filter(Boolean)));
    const updateEntries = [`"${esc(t.key)}": "${esc((t.options || [])[0] || "")}"`];
    const updateExprByOpt = (opt) => {
      const entries = [`"${esc(t.key)}": "${esc(opt)}"`].concat(
        syncKeys.map((k) => `"${esc(k)}": "${esc(opt)}"`)
      );
      return entries.join(", ");
    };
    return `
              <div className="detail-toggle-item">
                <div className="detail-form-key">${esc(t.label || "")}</div>
                <div className="detail-toggle-opts">
                  ${(t.options || []).map((opt) => `
                  <label className="detail-radio">
                    <input
                      type="radio"
                      name="${esc(m.id)}-${esc(t.key)}"
                      checked={(modalFormState["${esc(t.key)}"] || "${esc(t.default || "")}") === "${esc(opt)}"}
                      onChange={() => setModalFields({ ${updateExprByOpt(opt)} })}
                    />
                    <span>${esc(opt)}</span>
                  </label>`).join("")}
                </div>
              </div>`;
  }).join("");
  const sectionBlocks = (m.formSections || []).map((section) => {
    const sectionActions = (section.actions || []).map((action) => {
      const act = typeof action === "string" ? { label: action } : (action || {});
      const label = esc(act.label || "操作");
      if (act.to) {
        const target = act.to === "__DRILL__" ? "drillTarget" : `"${esc(act.to)}"`;
        return `<button type="button" className="btn btn-primary" onClick={() => goto(${target})}>${label}</button>`;
      }
      if (act.open) {
        return `<button type="button" className="btn btn-primary" onClick={() => openModal("${esc(act.open)}", drillTarget)}>${label}</button>`;
      }
      return `<button type="button" className="btn btn-primary">${label}</button>`;
    }).join("");
    const block = `
              <div className="detail-section">
                <div className="detail-section-title">${esc(section.title || "分段信息")}</div>
                <div className="detail-form-grid">
                  ${projectFormRows(section.fields || [])}
                </div>
                ${sectionActions ? `
                <div className="detail-form-actions">
                  ${sectionActions}
                </div>` : ""}
              </div>`;
    if (section.showWhen) {
      return `{isVisible(${JSON.stringify(section.showWhen)}) ? (${block}) : null}`;
    }
    return block;
  }).join("");

  return `
      {activeModal === "${esc(m.id)}" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">${esc(m.title || "项目详情")}</div>
                <div className="modal-desc">${esc(m.desc || "")}</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>

            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-section-title">项目基本信息</div>
                <div className="detail-meta-grid">
                  ${projectMetaRows(m.basicInfo || [])}
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-section-title">项目建设信息</div>
                <div className="detail-meta-grid">
                  ${projectMetaRows(m.buildInfo || [])}
                </div>
              </div>

              <div className="detail-stages">
                ${(m.stages || []).map((stage) => `
                <div className="detail-stage ${stage === m.activeStage ? "active" : ""}">
                  <span className="detail-stage-dot"></span>
                  <span>${esc(stage)}</span>
                </div>`).join("")}
              </div>

              ${toggleRows ? `
              <div className="detail-section">
                <div className="detail-section-title">条件设置</div>
                <div className="detail-toggle-grid">
                  ${toggleRows}
                </div>
              </div>` : ""}

              ${sectionBlocks}
            </div>

            <div className="modal-ft">
              ${actions}
            </div>
          </div>
        </div>
      ) : null}
  `;
}
function certDetailControl(f = {}, withModals = false, readOnly = false) {
  const type = String(f.type || "text").toLowerCase();
  const value = esc(f.value || "");
  const placeholder = esc(f.placeholder || "");
  const lockAttr = readOnly ? " readOnly" : "";
  const disableAttr = readOnly ? " disabled" : "";
  if (type === "picker" || type === "modal-picker") {
    const targetModal = esc(f.open || f.modal || "");
    const buttonLabel = esc(f.buttonLabel || "选择");
    if (readOnly) {
      return `<input className="cert-field-control" defaultValue="${value}" placeholder="${placeholder}" readOnly />`;
    }
    if (targetModal && withModals) {
      return `<div className="cert-picker">
        <input className="cert-field-control" defaultValue="${value}" readOnly />
        <button type="button" className="btn" onClick={() => openModal("${targetModal}", drillTarget)}>${buttonLabel}</button>
      </div>`;
    }
    return `<div className="cert-picker">
      <input className="cert-field-control" defaultValue="${value}" placeholder="${placeholder}" readOnly />
      <button type="button" className="btn">${buttonLabel}</button>
    </div>`;
  }
  if (type === "radio") {
    const opts = Array.isArray(f.options) ? f.options : ["是", "否"];
    return `<div className="cert-radio-group">
      ${opts.map((o) => `
      <label className="cert-radio-item">
        <input type="radio" name="${esc(f.label || "radio")}" ${String(o) === String(f.value) ? "defaultChecked" : ""} />
        <span>${esc(o)}</span>
      </label>`).join("")}
    </div>`;
  }
  if (type === "select") {
    const opts = Array.isArray(f.options) ? f.options : [f.value || "请选择..."];
    const first = esc(opts[0] || "");
    return `<select className="cert-field-control" defaultValue="${value || first}"${disableAttr}>
      ${opts.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}
    </select>`;
  }
  if (type === "date") {
    return `<input type="date" className="cert-field-control" defaultValue="${value}" placeholder="${placeholder}"${lockAttr} />`;
  }
  if (type === "textarea") {
    const extra = f.large ? " cert-field-textarea-large" : "";
    return `<textarea className="cert-field-control cert-field-textarea${extra}" placeholder="${placeholder}" defaultValue="${value}"${lockAttr} />`;
  }
  return `<input className="cert-field-control" placeholder="${placeholder}" defaultValue="${value}"${lockAttr} />`;
}
function certificateDetailModal(m, withModals) {
  const fields = Array.isArray(m.formFields) ? m.formFields : [];
  const rows = fields.map((f) => `
      <div className="cert-field-item">
        <div className="cert-field-label">${labelHtml(f.label || "")}:</div>
        <div className="cert-field-value">${certDetailControl(f, withModals)}</div>
      </div>`).join("");
  const history = m.historyTable || {};
  const sectionTitle = m.sectionTitle || "证书发证/复审/换证信息登记";
  const hasHistory = Array.isArray(history.columns) && history.columns.length > 0;
  const showHistoryAdd = history.showAdd !== false;
  const historyAddLabel = history.addLabel || "新增";
  const hcols = history.columns || [];
  const hrows = history.rows || [];
  const hrowJsx = hrows.map((row) => {
    const cells = Array.isArray(row) ? row : [];
    return `<tr>${cells.map((cell) => tableCell(cell, withModals)).join("")}</tr>`;
  }).join("");
  const headerActions = (m.headerActions || [{ label: "保存", primary: true }, { label: "返回", close: true }]).map((a) => {
    const cls = a.primary ? "btn btn-primary" : "btn";
    if (a.copy) {
      const payload = esc(a.copy);
      return `<button type="button" className="${cls}" onClick={() => navigator?.clipboard?.writeText("${payload}")}>${esc(a.label || "复制")}</button>`;
    }
    if (a.close || a.label === "返回" || a.label === "关闭") {
      return `<button type="button" className="${cls}" onClick={closeModal}>${esc(a.label || "关闭")}</button>`;
    }
    return `<button type="button" className="${cls}">${esc(a.label || "操作")}</button>`;
  }).join("");

  return `
      {activeModal === "${esc(m.id)}" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">${esc(m.title || "详情")}</div>
              </div>
              <div className="cert-hd-actions">${headerActions}</div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">${esc(sectionTitle)}</div>
                <div className="cert-form-grid">
                  ${rows}
                </div>
              </div>

              ${hasHistory ? `
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>${esc(history.title || "发证/复审/换证记录")}</span>
                  ${showHistoryAdd ? `<button type="button" className="btn btn-primary">${esc(historyAddLabel)}</button>` : ""}
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        ${hcols.map((c) => String(c || "").toLowerCase() === "选择"
                          ? '<th className="table-checkbox"><input type="checkbox" readOnly /></th>'
                          : `<th>${esc(c)}</th>`).join("")}
                      </tr>
                    </thead>
                    <tbody>
                      ${hrowJsx}
                    </tbody>
                  </table>
                </div>
              </div>
              ` : ""}
            </div>
          </div>
        </div>
      ) : null}
  `;
}

function trainingPlanDetailModal(m, withModals) {
  const fields = Array.isArray(m.formFields) ? m.formFields : [];
  const rows = fields.map((f) => `
      <div className="cert-field-item">
        <div className="cert-field-label">${labelHtml(f.label || "")}:</div>
        <div className="cert-field-value">${certDetailControl(f, withModals)}</div>
      </div>`).join("");
  const execTable = m.executionTable || {};
  const ecols = Array.isArray(execTable.columns) ? execTable.columns : [];
  const erows = Array.isArray(execTable.rows) ? execTable.rows : [];
  const erowJsx = erows.map((row) => {
    const cells = Array.isArray(row) ? row : [];
    return `<tr>${cells.map((cell) => tableCell(cell, withModals)).join("")}</tr>`;
  }).join("");
  const monthsCfg = m.planMonths || {};
  const monthsAll = Array.isArray(monthsCfg.months) && monthsCfg.months.length
    ? monthsCfg.months
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthsSel = Array.isArray(monthsCfg.selected) ? monthsCfg.selected : [];
  const monthsJsx = monthsAll.map((month) => `
      <label className="plan-month-item">
        <input type="checkbox" ${monthsSel.includes(month) ? "checked" : ""} readOnly />
        <span>${esc(String(month))}月</span>
      </label>`).join("");
  const partners = Array.isArray(monthsCfg.partners) ? monthsCfg.partners : [];
  const partnerJsx = partners.map((name) => `<span className="tag">${esc(name)}</span>`).join("");

  return `
      {activeModal === "${esc(m.id)}" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div className="modal-title">${esc(m.title || "培训计划详情")}</div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">${esc(m.sectionTitle || "培训计划详情")}</div>
                <div className="cert-form-grid">
                  ${rows}
                </div>
                <div className="plan-time-row">
                  <div className="plan-time-left">
                    <div className="plan-time-title">${esc(monthsCfg.title || "计划时间")}:</div>
                    <div className="plan-time-year">${esc(monthsCfg.year || "")}</div>
                    <div className="plan-months">${monthsJsx}</div>
                  </div>
                  <div className="plan-time-right">
                    <div className="plan-time-title">${esc(monthsCfg.partnerLabel || "计划参与机构")}:</div>
                    <div className="tag-row">${partnerJsx}</div>
                  </div>
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">${esc(execTable.title || "计划执行情况")}</div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        ${ecols.map((c) => `<th>${esc(c)}</th>`).join("")}
                      </tr>
                    </thead>
                    <tbody>
                      ${erowJsx}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>关闭</button>
            </div>
          </div>
        </div>
      ) : null}
  `;
}

function trainingPlanCreateModal(m, withModals) {
  const fields = Array.isArray(m.formFields) ? m.formFields : [];
  const rows = fields.map((f) => `
      <div className="cert-field-item">
        <div className="cert-field-label">${labelHtml(f.label || "")}:</div>
        <div className="cert-field-value">${certDetailControl(f, withModals)}</div>
      </div>`).join("");
  const footerActions = (m.footerActions || [
    { label: "关闭", close: true },
    { label: "保存", primary: true },
    { label: "提交", primary: true }
  ]).map((a) => {
    const cls = a.primary ? "btn btn-primary" : "btn";
    if (a.close) return `<button type="button" className="${cls}" onClick={closeModal}>${esc(a.label || "关闭")}</button>`;
    return `<button type="button" className="${cls}">${esc(a.label || "操作")}</button>`;
  }).join("");

  return `
      {activeModal === "${esc(m.id)}" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div className="modal-title">${esc(m.title || "培训计划信息新增")}</div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">${esc(m.sectionTitle || "新增培训计划")}</div>
                <div className="cert-form-grid">
                  ${rows}
                </div>
              </div>
            </div>
            <div className="modal-ft">
              ${footerActions}
            </div>
          </div>
        </div>
      ) : null}
  `;
}

function trainingRecordCreateModal(m, withModals) {
  const fields = Array.isArray(m.formFields) ? m.formFields : [];
  const readOnly = !!m.readOnly;
  const rows = fields.map((f) => `
      <div className="cert-field-item">
        <div className="cert-field-label">${labelHtml(f.label || "")}:</div>
        <div className="cert-field-value">${certDetailControl(f, withModals, readOnly)}</div>
      </div>`).join("");
  const org = m.orgBlock || {};
  const orgItems = Array.isArray(org.items) ? org.items : [];
  const orgRows = orgItems.map((item) => `
      <label className="record-org-item">
        <input type="checkbox" ${item.checked ? "checked" : ""} readOnly />
        <span>${esc(item.label || "")}</span>
      </label>`).join("");
  const roster = m.rosterTable || {};
  const rosterCols = Array.isArray(roster.columns) ? roster.columns : [];
  const rosterRows = Array.isArray(roster.rows) ? roster.rows : [];
  const rosterActions = (roster.actions || []).map((a) => {
    const act = a || {};
    const cls = act.primary ? "btn btn-primary" : "btn";
    return `<button type="button" className="${cls}">${esc(act.label || "操作")}</button>`;
  }).join("");
  const rosterRowsJsx = rosterRows.map((row) => {
    const cells = Array.isArray(row) ? row : [];
    return `<tr>${cells.map((cell) => tableCell(cell, withModals)).join("")}</tr>`;
  }).join("") || `<tr><td colSpan="${Math.max(1, rosterCols.length)}">暂无数据</td></tr>`;
  const footerActions = (m.footerActions || [
    { label: "关闭", close: true },
    { label: "保存", primary: true },
    { label: "提交", primary: true }
  ]).map((a) => {
    const cls = a.primary ? "btn btn-primary" : "btn";
    if (a.close) return `<button type="button" className="${cls}" onClick={closeModal}>${esc(a.label || "关闭")}</button>`;
    return `<button type="button" className="${cls}">${esc(a.label || "操作")}</button>`;
  }).join("");

  return `
      {activeModal === "${esc(m.id)}" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div className="modal-title">${esc(m.title || "培训记录信息新增")}</div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">${esc(m.sectionTitle || "培训记录基本信息")}</div>
                <div className="cert-form-grid">
                  ${rows}
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">${esc(org.title || "机构所属板块")}</div>
                <div className="record-org-wrap">${orgRows}</div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">${esc(roster.title || "培训人员名单")}</div>
                <div className="record-toolbar">${rosterActions}</div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        ${rosterCols.map((c) => `<th>${esc(c)}</th>`).join("")}
                      </tr>
                    </thead>
                    <tbody>
                      ${rosterRowsJsx}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              ${footerActions}
            </div>
          </div>
        </div>
      ) : null}
  `;
}

function hqTrainingStatisticsPage() {
  return `import React from "react";

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
                      <div className={\`hq-barchart-bar \${s.color || "blue"}\`} style={{ height: h + "%" }}></div>
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

function HqDrillModal({ open, title, columns = [], rows = [], onClose }) {
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl hq-drill-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-bd">
          <div className="hq-drill-headline">
            <span>{title}</span>
          </div>
          <div className="hq-drill-actions">
            <button type="button" className="btn btn-primary">导出</button>
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
          <div className="hq-drill-pager">共 400 条　10条/页　&lt;　1　&gt;</div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>返回</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>确认</button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("集团");
  const [drillModal, setDrillModal] = React.useState("");
  const cats = ["油田", "炼化", "销售", "石油工程", "炼化工程", "科研", "其他"];
  const planSeries = [
    { name: "培训计划总数", color: "blue", values: [68, 86, 52, 67, 85, 53, 52] },
    { name: "培训计划完成数", color: "purple", values: [46, 56, 71, 46, 56, 71, 70] }
  ];
  const archiveSeries = [
    { name: "培训档案数量", color: "blue", values: [42, 46, 65, 46, 65, 46, 46] },
    { name: "培训总时长", color: "cyan", values: [36, 35, 36, 36, 36, 36, 36] },
    { name: "培训档案更新率", color: "green", values: [52, 54, 72, 54, 72, 54, 54] },
    { name: "培训覆盖率", color: "purple", values: [65, 66, 28, 65, 28, 65, 65] }
  ];
  const evalSeries = [
    { name: "计划评估人数", color: "blue", values: [45, 45, 65, 45, 65, 45, 45] },
    { name: "评估通过人数", color: "cyan", values: [36, 36, 36, 36, 36, 36, 36] },
    { name: "调离或被约谈人数", color: "green", values: [54, 54, 72, 54, 72, 54, 54] }
  ];
  const feeSeries = [
    { name: "总费用", color: "blue", values: [45, 45, 65, 45, 65, 45, 45] },
    { name: "办班相关费用", color: "cyan", values: [36, 36, 36, 36, 36, 36, 36] },
    { name: "购买设备设施及软件开发费", color: "green", values: [52, 52, 72, 52, 72, 52, 52] },
    { name: "培训基地建设费用", color: "purple", values: [65, 65, 28, 65, 28, 65, 65] }
  ];
  const drillConfigs = {
    metric: {
      title: "培训综合指标",
      columns: ["序号", "企业", "培训计划完成率（40%）", "证书失效预警人次（30%）", "关键岗位持证率（20%）", "年度报告评分（10%）", "综合绩效"],
      rows: [
        ["1", "镇海炼化", "100%", "99%", "97%", "98%", "98.89"],
        ["2", "湖南石化", "100%", "99%", "97%", "98%", "98.89"],
        ["3", "茂名石化", "100%", "99%", "97%", "98%", "98.89"]
      ]
    },
    plan: {
      title: "企业培训计划完成情况",
      columns: ["序号", "年度", "企业", "计划代码", "培训项目名称", "培训对象", "培训天数", "计划时间", "培训开始日期", "计划期次", "完成期次", "计划人数", "实际参与人数", "培训合格率"],
      rows: [
        ["1", "2024", "茂名石化", "HNSH20241011001", "安全管理培训", "安全管理人员", "10", "2024年10月", "2024年10月04日", "3", "1", "12", "15", "100%"],
        ["2", "2024", "镇海炼化", "HNSH20241011001", "安全管理培训", "HSE关键岗位人员", "", "", "", "", "", "", "", ""]
      ]
    },
    cert: {
      title: "人员取证情况",
      columns: ["序号", "企业", "主要负责人是否持证", "关键岗位持证率", "安全管理人员数量/持证上岗率", "安全管理人员注安师数量/配置率", "特种作业人员数量/持证上岗率"],
      rows: [
        ["1", "镇海炼化", "是", "97%", "1999/100%", "789/100%", "890/100%"],
        ["2", "湖南石化", "是", "97%", "", "", "890/100%"]
      ]
    },
    trainee: {
      title: "新员工三级安全教育和培训情况-新员工",
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "新员工", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "10", "", "", "", "100%"]
      ]
    },
    labor: {
      title: "新员工三级安全教育和培训情况-劳务派遣",
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "劳务派遣", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "10", "", "", "", "100%"]
      ]
    },
    intern: {
      title: "新员工三级安全教育和培训情况-实习生",
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "实习生", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "10", "", "", "", "100%"]
      ]
    },
    archive: {
      title: "从业人员安全培训档案管理情况",
      columns: ["序号", "企业", "培训档案数量", "培训总时长", "培训档案更新率", "培训覆盖率"],
      rows: [
        ["1", "XX炼化", "590", "1547", "99%", "88%"],
        ["2", "XX炼化", "590", "1547", "99%", "88%"],
        ["3", "XX炼化", "590", "1547", "99%", "88%"]
      ]
    },
    eval: {
      title: "领导干部HSE履职能力评价情况",
      columns: ["序号", "企业", "计划评估人数", "评估通过人数", "调离或被约谈人数"],
      rows: [
        ["1", "XX炼化", "99", "99", "99"],
        ["2", "XX炼化", "99", "99", "99"],
        ["3", "XX炼化", "99", "99", "99"]
      ]
    },
    fee: {
      title: "安全生产教育和培训经费投入",
      columns: ["序号", "企业", "总费用", "办班相关费用", "购买设备设施及软件开发费", "培训基地建设费用"],
      rows: [
        ["1", "XX炼化", "10000020", "990000", "88", "1547"],
        ["2", "XX炼化", "10000020", "990000", "88", "1547"],
        ["3", "XX炼化", "10000020", "990000", "88", "1547"]
      ]
    }
  };

  return (
    <div className="hq-shell">
      <aside className="hq-sidebar">
        <div className="hq-sidebar-title">泄漏监测列表</div>
        <div className="hq-menu-group">
          <div className="hq-menu-item active">培训统计分析</div>
          <div className="hq-menu-item">乙烯裂解装置1号机泵...</div>
          <div className="hq-menu-item">乙烯裂解装置2号机泵...</div>
          <div className="hq-menu-item">乙烯裂解装置</div>
          <div className="hq-menu-item">齐鲁石化</div>
          <div className="hq-menu-item">江苏石油</div>
          <div className="hq-menu-item">中原管光</div>
          <div className="hq-menu-item">中科炼化</div>
        </div>
      </aside>

      <main className="hq-main">
        <div className="hq-crumb">首页 / 统计分析</div>

        <div className="hq-content">
          <div className="hq-tabs">
            <button className={\`hq-tab \${activeTab === "集团" ? "active" : ""}\`} onClick={() => setActiveTab("集团")}>集团</button>
            <button className={\`hq-tab \${activeTab === "油田" ? "active" : ""}\`} onClick={() => setActiveTab("油田")}>油田</button>
            <button className={\`hq-tab \${activeTab === "炼油" ? "active" : ""}\`} onClick={() => setActiveTab("炼油")}>炼油</button>
            <button className={\`hq-tab \${activeTab === "化工" ? "active" : ""}\`} onClick={() => setActiveTab("化工")}>化工</button>
            <button className={\`hq-tab \${activeTab === "销售" ? "active" : ""}\`} onClick={() => setActiveTab("销售")}>销售</button>
            <button className={\`hq-tab \${activeTab === "石油工程" ? "active" : ""}\`} onClick={() => setActiveTab("石油工程")}>石油工程</button>
            <button className={\`hq-tab \${activeTab === "炼化工程" ? "active" : ""}\`} onClick={() => setActiveTab("炼化工程")}>炼化工程</button>
            <button className={\`hq-tab \${activeTab === "科研" ? "active" : ""}\`} onClick={() => setActiveTab("科研")}>科研</button>
            <button className={\`hq-tab \${activeTab === "其他" ? "active" : ""}\`} onClick={() => setActiveTab("其他")}>其他</button>
          </div>

          <div className="hq-query">
            <select className="filterbar-control" defaultValue="集团">
              <option value="集团">单位</option>
              <option value="油田">油田</option>
              <option value="炼油">炼油</option>
            </select>
            <select className="filterbar-control" defaultValue="2025">
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">重置</button>
          </div>

          <section className="hq-row">
            <div className="hq-panel hq-score-panel">
              <div className="hq-panel-title">集团培训综合指标平均分</div>
              <button type="button" className="hq-score-value hq-linklike hq-drill-trigger" onClick={() => setDrillModal("metric")}>98</button>
            </div>
            <div className="hq-panel hq-bar-panel">
              <div className="hq-panel-title"><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("plan")}>培训计划完成情况</button></div>
              <HqGroupedBarChart categories={cats} series={planSeries} />
            </div>
          </section>

          <section className="hq-row hq-row-4">
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("cert")}>集团人员取证情况</button></div>
              <div className="hq-mini-grid">
                <div className="hq-mini-card">
                  <div className="hq-mini-label">主要负责人持证</div>
                  <div className="hq-mini-value">是</div>
                </div>
                <div className="hq-mini-card">
                  <div className="hq-mini-label">关键岗位持证率</div>
                  <div className="hq-mini-value">97%</div>
                </div>
                <div className="hq-mini-card">
                  <div className="hq-mini-label">安全管理人员</div>
                  <div className="hq-mini-value">2544</div>
                </div>
                <div className="hq-mini-card">
                  <div className="hq-mini-label">持证上岗率</div>
                  <div className="hq-mini-value">100%</div>
                </div>
                <div className="hq-mini-card">
                  <div className="hq-mini-label">安全管理人员注安师</div>
                  <div className="hq-mini-value">254</div>
                </div>
                <div className="hq-mini-card">
                  <div className="hq-mini-label">配置率</div>
                  <div className="hq-mini-value">20%</div>
                </div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>集团各级人员取证变化情况</div>
              <div className="hq-legend"><span className="dot blue"></span>上期取证人员 <span className="dot green"></span>本期取证人员</div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">注册安全工程师 <b className="down">6% ↓</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "88%"}}></div><span>88</span></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "68%"}}></div><span>68</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">安全管理人员证书 <b className="up">6% ↑</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "88%"}}></div><span>88</span></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "68%"}}></div><span>68</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">特种作业人员证书 <b className="down">6% ↓</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "88%"}}></div><span>88</span></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "68%"}}></div><span>68</span></div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>新员工三级安全教育和培训情况</div>
              <div className="hq-card-stack">
                <button type="button" className="hq-two-col-card hq-card-btn hq-drill-trigger" onClick={() => setDrillModal("trainee")}>
                  <div><div className="hq-mini-label">新员工数量</div><div className="hq-mini-value">2544</div></div>
                  <div><div className="hq-mini-label">三级教育完成率</div><div className="hq-mini-value">100%</div></div>
                </button>
                <button type="button" className="hq-two-col-card hq-card-btn hq-drill-trigger" onClick={() => setDrillModal("labor")}>
                  <div><div className="hq-mini-label">劳务派遣人员数量</div><div className="hq-mini-value">254</div></div>
                  <div><div className="hq-mini-label">岗前培训率</div><div className="hq-mini-value">20%</div></div>
                </button>
                <button type="button" className="hq-two-col-card hq-card-btn hq-drill-trigger" onClick={() => setDrillModal("intern")}>
                  <div><div className="hq-mini-label">实习生数量/三级</div><div className="hq-mini-value">2544</div></div>
                  <div><div className="hq-mini-label">教育完成率</div><div className="hq-mini-value">98%</div></div>
                </button>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>集团三级教育培训情况</div>
              <div className="hq-legend"><span className="dot blue"></span>人员总数 <span className="dot green"></span>培训人员数量</div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">新员工三级安全教育培训 <b className="percent">95%</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "88%"}}></div><span>88</span></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "68%"}}></div><span>68</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">注册安全工程师 <b className="percent">95%</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "88%"}}></div><span>88</span></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "68%"}}></div><span>68</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">注册安全工程师 <b className="percent">95%</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "88%"}}></div><span>88</span></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "68%"}}></div><span>68</span></div>
              </div>
            </div>
          </section>

          <section className="hq-row">
            <div className="hq-panel hq-archive-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("archive")}>集团从业人员安全培训档案管理情况</button></div>
              <div className="hq-archive-grid">
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训档案数量</div>
                    <div className="hq-archive-value">590</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训档案更新率</div>
                    <div className="hq-archive-value">99%</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训覆盖率</div>
                    <div className="hq-archive-value">88%</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训总时长</div>
                    <div className="hq-archive-value">1547</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hq-panel hq-bar-panel">
              <div className="hq-legend">
                <span className="dot blue"></span>培训档案数量
                <span className="dot cyan"></span>培训总时长
                <span className="dot green"></span>培训档案更新率
                <span className="dot purple"></span>培训覆盖率
              </div>
              <HqGroupedBarChart categories={cats} series={archiveSeries} />
            </div>
          </section>

          <section className="hq-row">
            <div className="hq-panel hq-eval-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("eval")}>集团领导干部HSE履职能力评价情况</button></div>
              <div className="hq-level-card">
                <div className="hq-level-row-title">中层</div>
                <div className="hq-level-grid">
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">计划评估人数</div></div>
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">评估通过人数</div></div>
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">调离或被约谈人数</div></div>
                </div>
              </div>
              <div className="hq-level-card green">
                <div className="hq-level-row-title">中层</div>
                <div className="hq-level-grid">
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">计划评估人数</div></div>
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">评估通过人数</div></div>
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">调离或被约谈人数</div></div>
                </div>
              </div>
            </div>
            <div className="hq-panel hq-bar-panel">
              <div className="hq-legend">
                <span className="dot blue"></span>计划评估人数
                <span className="dot cyan"></span>评估通过人数
                <span className="dot green"></span>调离或被约谈人数
              </div>
              <HqGroupedBarChart categories={cats} series={evalSeries} />
            </div>
          </section>

          <section className="hq-row">
            <div className="hq-panel hq-archive-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("fee")}>集团安全生产教育和培训经费投入</button></div>
              <div className="hq-archive-grid">
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">总费用</div>
                    <div className="hq-archive-value">10000020</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">办班相关费用</div>
                    <div className="hq-archive-value">990000</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">购买设备设施及软件开发费</div>
                    <div className="hq-archive-value">88</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训基地建设费用</div>
                    <div className="hq-archive-value">1547</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hq-panel hq-bar-panel">
              <div className="hq-legend">
                <span className="dot blue"></span>总费用
                <span className="dot cyan"></span>办班相关费用
                <span className="dot green"></span>购买设备设施及软件开发费
                <span className="dot purple"></span>培训基地建设费用
              </div>
              <HqGroupedBarChart categories={cats} series={feeSeries} />
            </div>
          </section>
        </div>
      </main>

      <HqDrillModal
        open={!!drillModal}
        title={drillModal ? drillConfigs[drillModal].title : ""}
        columns={drillModal ? drillConfigs[drillModal].columns : []}
        rows={drillModal ? drillConfigs[drillModal].rows : []}
        onClose={() => setDrillModal("")}
      />
    </div>
  );
}
`;
}

function enterpriseTrainingStatisticsPage() {
  return `import React from "react";

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
                      <div className={\`hq-barchart-bar \${s.color || "blue"}\`} style={{ height: h + "%" }}></div>
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

function HqDrillModal({ open, title, columns = [], rows = [], onClose }) {
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl hq-drill-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-bd">
          <div className="hq-drill-headline">
            <span>{title}</span>
          </div>
          <div className="hq-drill-actions">
            <button type="button" className="btn btn-primary">导出</button>
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
          <div className="hq-drill-pager">共 210 条　10条/页　&lt;　1　&gt;</div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>返回</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>确认</button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("本企业");
  const [drillModal, setDrillModal] = React.useState("");
  const cats = ["1月", "2月", "3月", "4月", "5月", "6月", "7月"];
  const planSeries = [
    { name: "计划数量", color: "blue", values: [42, 45, 48, 43, 50, 47, 49] },
    { name: "完成数量", color: "purple", values: [38, 41, 44, 40, 46, 45, 47] }
  ];
  const recordSeries = [
    { name: "记录总数", color: "blue", values: [56, 57, 60, 59, 62, 64, 66] },
    { name: "合格人数", color: "green", values: [52, 53, 56, 55, 58, 60, 62] },
    { name: "证书关联人数", color: "cyan", values: [46, 47, 48, 49, 50, 52, 54] }
  ];
  const drillConfigs = {
    score: {
      title: "企业培训综合指标",
      columns: ["序号", "年度", "培训计划完成率（40%）", "证书失效预警人次（30%）", "关键岗位持证率（20%）", "年度报告评分（10%）", "综合绩效"],
      rows: [
        ["1", "2025", "95%", "98%", "97%", "96%", "96.7"],
        ["2", "2024", "94%", "97%", "96%", "95%", "95.7"]
      ]
    },
    plan: {
      title: "企业培训计划完成情况",
      columns: ["序号", "计划名称", "计划编码", "培训对象", "计划人数", "实际参与", "完成率", "执行状态"],
      rows: [
        ["1", "炼油装置年度复训", "PLN20250001", "班组长/操作岗", "120", "116", "96.7%", "已完成"],
        ["2", "新员工三级教育", "PLN20250002", "新员工", "85", "82", "96.5%", "进行中"]
      ]
    },
    cert: {
      title: "企业关键岗位取证情况",
      columns: ["序号", "人员类别", "应持证人数", "已持证人数", "持证率", "预警人数"],
      rows: [
        ["1", "主要负责人", "25", "25", "100%", "0"],
        ["2", "安全管理人员", "108", "103", "95.4%", "3"],
        ["3", "特种作业人员", "366", "350", "95.6%", "9"]
      ]
    },
    record: {
      title: "培训记录执行明细",
      columns: ["序号", "培训班名称", "开始日期", "结束日期", "培训学时", "培训人数", "合格人数", "合格率"],
      rows: [
        ["1", "硫化氢防护专项班", "2025-03-01", "2025-03-03", "24", "63", "60", "95.2%"],
        ["2", "装置开停工风险识别", "2025-03-12", "2025-03-13", "16", "42", "41", "97.6%"]
      ]
    },
    fund: {
      title: "企业培训经费投入明细",
      columns: ["序号", "月份", "总费用(万元)", "办班费用(万元)", "教材与系统(万元)", "基地建设(万元)"],
      rows: [
        ["1", "2025-01", "186", "73", "46", "21"],
        ["2", "2025-02", "193", "76", "49", "18"],
        ["3", "2025-03", "205", "82", "51", "23"]
      ]
    }
  };

  return (
    <div className="hq-shell">
      <aside className="hq-sidebar">
        <div className="hq-sidebar-title">教育培训导航</div>
        <div className="hq-menu-group">
          <div className="hq-menu-item">培训计划管理</div>
          <div className="hq-menu-item">培训记录管理</div>
          <div className="hq-menu-item">证书管理</div>
          <div className="hq-menu-item active">企业统计分析</div>
          <div className="hq-menu-item">总部统计分析</div>
        </div>
      </aside>

      <main className="hq-main">
        <div className="hq-crumb">首页 / 统计分析 / 企业统计分析</div>
        <div className="hq-content">
          <div className="hq-tabs">
            <button className={\`hq-tab \${activeTab === "本企业" ? "active" : ""}\`} onClick={() => setActiveTab("本企业")}>本企业</button>
            <button className={\`hq-tab \${activeTab === "二级单位" ? "active" : ""}\`} onClick={() => setActiveTab("二级单位")}>二级单位</button>
            <button className={\`hq-tab \${activeTab === "基层单位" ? "active" : ""}\`} onClick={() => setActiveTab("基层单位")}>基层单位</button>
          </div>

          <div className="hq-query">
            <select className="filterbar-control" defaultValue="2025">
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <select className="filterbar-control" defaultValue="炼油一部">
              <option value="炼油一部">炼油一部</option>
              <option value="炼油二部">炼油二部</option>
              <option value="化工运行部">化工运行部</option>
            </select>
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">重置</button>
          </div>

          <section className="hq-row">
            <div className="hq-panel hq-score-panel">
              <div className="hq-panel-title">企业培训综合指标平均分</div>
              <button type="button" className="hq-score-value hq-linklike hq-drill-trigger" onClick={() => setDrillModal("score")}>96.7</button>
            </div>
            <div className="hq-panel hq-bar-panel">
              <div className="hq-panel-title"><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("plan")}>企业培训计划完成情况</button></div>
              <HqGroupedBarChart categories={cats} series={planSeries} />
            </div>
          </section>

          <section className="hq-row hq-row-4">
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("cert")}>关键岗位人员取证情况</button></div>
              <div className="hq-mini-grid">
                <div className="hq-mini-card"><div className="hq-mini-label">主要负责人持证</div><div className="hq-mini-value">100%</div></div>
                <div className="hq-mini-card"><div className="hq-mini-label">安全管理人员持证</div><div className="hq-mini-value">95.4%</div></div>
                <div className="hq-mini-card"><div className="hq-mini-label">特种作业人员持证</div><div className="hq-mini-value">95.6%</div></div>
                <div className="hq-mini-card"><div className="hq-mini-label">证书到期预警</div><div className="hq-mini-value">12</div></div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>培训计划执行状态</div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">已完成 <b className="percent">76%</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "76%"}}></div><span>76</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">进行中 <b className="percent">18%</b></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "18%"}}></div><span>18</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">待开展 <b className="percent">6%</b></div>
                <div className="hq-line-wrap"><div className="hq-line cyan" style={{width: "6%"}}></div><span>6</span></div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("record")}>培训记录质量</button></div>
              <div className="hq-card-stack">
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">记录总数</div><div className="hq-mini-value">1328</div></div>
                  <div><div className="hq-mini-label">关联计划率</div><div className="hq-mini-value">98%</div></div>
                </div>
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">完训人数</div><div className="hq-mini-value">4672</div></div>
                  <div><div className="hq-mini-label">合格率</div><div className="hq-mini-value">96%</div></div>
                </div>
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">异常记录</div><div className="hq-mini-value">21</div></div>
                  <div><div className="hq-mini-label">待修正</div><div className="hq-mini-value">7</div></div>
                </div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>新员工三级教育情况</div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">新员工三级安全教育 <b className="percent">97%</b></div>
                <div className="hq-line-wrap"><div className="hq-line blue" style={{width: "97%"}}></div><span>97</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">劳务派遣岗前培训 <b className="percent">95%</b></div>
                <div className="hq-line-wrap"><div className="hq-line green" style={{width: "95%"}}></div><span>95</span></div>
              </div>
              <div className="hq-progress-group">
                <div className="hq-progress-title">实习生三级教育 <b className="percent">98%</b></div>
                <div className="hq-line-wrap"><div className="hq-line cyan" style={{width: "98%"}}></div><span>98</span></div>
              </div>
            </div>
          </section>

          <section className="hq-row">
            <div className="hq-panel hq-archive-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>培训记录管理概况</div>
              <div className="hq-archive-grid">
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训记录总数</div><div className="hq-archive-value">1328</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训覆盖率</div><div className="hq-archive-value">96%</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">证书关联人数</div><div className="hq-archive-value">912</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">累计学时</div><div className="hq-archive-value">1547</div></div></div>
              </div>
            </div>
            <div className="hq-panel hq-bar-panel">
              <div className="hq-legend">
                <span className="dot blue"></span>记录总数
                <span className="dot green"></span>合格人数
                <span className="dot cyan"></span>证书关联人数
              </div>
              <HqGroupedBarChart categories={cats} series={recordSeries} />
            </div>
          </section>

          <section className="hq-row">
            <div className="hq-panel hq-archive-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("fund")}>培训经费投入概况</button></div>
              <div className="hq-archive-grid">
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">总费用(万元)</div><div className="hq-archive-value">1980</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">办班费用(万元)</div><div className="hq-archive-value">760</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">教材与系统(万元)</div><div className="hq-archive-value">460</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">基地建设(万元)</div><div className="hq-archive-value">210</div></div></div>
              </div>
            </div>
            <div className="hq-panel hq-bar-panel">
              <div className="hq-legend">
                <span className="dot blue"></span>总费用
                <span className="dot cyan"></span>办班费用
                <span className="dot green"></span>教材与系统
                <span className="dot purple"></span>基地建设
              </div>
              <HqGroupedBarChart categories={cats} series={[
                { name: "总费用", color: "blue", values: [45, 52, 62, 56, 64, 61, 66] },
                { name: "办班费用", color: "cyan", values: [35, 39, 42, 41, 44, 46, 49] },
                { name: "教材与系统", color: "green", values: [28, 30, 32, 33, 35, 36, 37] },
                { name: "基地建设", color: "purple", values: [16, 18, 22, 20, 24, 22, 25] }
              ]} />
            </div>
          </section>
        </div>
      </main>

      <HqDrillModal
        open={!!drillModal}
        title={drillModal ? drillConfigs[drillModal].title : ""}
        columns={drillModal ? drillConfigs[drillModal].columns : []}
        rows={drillModal ? drillConfigs[drillModal].rows : []}
        onClose={() => setDrillModal("")}
      />
    </div>
  );
}
`;
}

function sanTongshiLegacyMigrationQueryPage() {
  return `import React from "react";

const stageOrder = ["可研阶段", "基础设计阶段", "试运行阶段", "验收阶段"];

const stageFields = {
  "可研阶段": [
    { section: "安全评价信息", rows: [
      ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "是"],
      ["安全评价单位", "山东海普安全环保技术股份有限公司"],
      ["安全评价报告书初审稿", "中安丁烯异构化预评估案卷.pdf"],
      ["工艺危害分析报告", ""],
      ["定量风险评价报告", ""],
      ["工艺是否国内首次使用", "否"]
    ]},
    { section: "内审评审", rows: [
      ["参加人员签名表", "福建物派AC4异构化专家评审签到表2020.7.18.pdf"],
      ["专家组评审意见及个人意见", "福建物派项目专家评审意见2020.7.18.pdf"],
      ["专家组评审意见的修改说明", "中安丁烯异构化预评估案卷.pdf"]
    ]},
    { section: "政府审批", rows: [
      ["是否政府审批", "是"],
      ["批复时间", "2020-10-28"],
      ["安全评价报告终稿", "中安丁烯异构化预评估案卷.pdf"],
      ["批复（备案）文件", "丁烯-技术改造项目安全条件审查意见书2020.10.30.pdf"]
    ]}
  ],
  "基础设计阶段": [
    { section: "安全设施设计信息", rows: [
      ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "是"],
      ["设计单位", "中石化上海工程有限公司(镇海)"],
      ["安全设施设计", ["2ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926.pdf", "ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926_1.pdf"]],
      ["HAZOP分析报告及审查意见", "中安联合丁烯-烷基THAZOP分析报告专家审查意见2021.7.28.pdf"],
      ["SIL分析报告及审查意见", "中安联合丁烯-烷基TSIL定级报告专家审查意见2021.7.28.pdf"],
      ["“两重点一重大”风险清单", ""],
      ["定量风险评价报告", ""]
    ]},
    { section: "安全设施审查信息", rows: [
      ["参加人员签名表", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"],
      ["专家组评审意见及个人意见", "中安联合2万吨C4异构化制丁烯-1技术改造安全设施设计审查意见2021.7.17.pdf"],
      ["专家组评审意见的修改说明", "中安联合2万吨丁烯-1项目安全设施设计审查专家认可书面意见.pdf"],
      ["安全设施设计终稿", ["2ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926.pdf", "ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926_2.pdf"]]
    ]},
    { section: "政府审批", rows: [
      ["是否政府审批", "是"],
      ["批复时间", "2021-11-11"],
      ["批复（备案）文件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"],
      ["开工时间", "2021-11-11"],
      ["开工报告附件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"]
    ]}
  ],
  "试运行阶段": [
    { section: "政府审批", rows: [
      ["是否有政府试运行审批", "是"],
      ["试生产时间", "2022-11-13"],
      ["审查组织单位", "中安联合煤化有限责任公司"],
      ["试生产方案", ["2万吨年C4异构化制丁烯-1技术改造项目试生产认证材料（外审）.pdf", "2022.10.24 扩建2500吨丙烯腈项目中试与混试双面同意书.pdf"]],
      ["专家组名单", ["风险管控.zip（删除）", "丁烯-1装置试生产专家论证签到表2022.9.24.pdf（删除）"]],
      ["审查意见", "丁烯-1装置试生产专家论证专家集体意见2022.9.24.pdf（删除）"],
      ["投产前安全检查", ""]
    ]},
    { section: "试生产延期信息", rows: [
      ["是否延期", "否"],
      ["延期原因", ""],
      ["延期截止日期", ""],
      ["延期文件", ""]
    ]}
  ],
  "验收阶段": [
    { section: "验收申请信息", rows: [
      ["安全设施竣工验收申请", "2万吨年C4异构化制丁烯-1技术改造项目安全设施竣工验收申请书.pdf（删除）"],
      ["建设项目安全验收评价报告", "中安联合煤化有限责任公司2万吨/年C4异构化制丁烯-1项目安全设施竣工验收评价报告（备案版）（报告正文+附件+附图）.pdf（删除）"],
      ["施工单位的资质证明文件", "丁烯-1项目安装单位-北京燕华工程建设有限公司.pdf（删除）"],
      ["建设项目安全设施施工情况报告", "2万吨年C4异构化制丁烯-1技术改造项目安全设施竣工验收申请书.pdf（删除）"],
      ["建设项目安全设施监理情况报告", "2万吨年C4异构化制丁烯-1技术改造项目安全设施竣工验收申请书.pdf（删除）"],
      ["试生产（使用）期间发现的问题、采取的防范措施以及整改情况报告", ""],
      ["安全生产管理机构设置或者安全生产管理人员配备情况", ""],
      ["从业人员安全培训教育及发证情况", ""],
      ["危险化学品事故应急预案备案登记表", ""],
      ["危险化学品重大危险源备案证明文件", ""],
      ["风险清单管控措施落实情况报告", ""],
      ["法律、行政法规、规章规定的其他文件资料", ""]
    ]},
    { section: "验收意见", rows: [
      ["竣工验收问题汇总表", ["丁烯-1装置竣工验收专家意见2023.5.7.pdf（删除）", "丁烯-1装置竣工验收专家个人意见2023.5.7.pdf（删除）"]],
      ["建设项目安全验收评价报告（终稿）", "中安联合煤化有限责任公司2万吨/年C4异构化制丁烯-1项目安全设施竣工验收评价报告（备案版）（报告正文+附件+附图）.pdf（删除）"],
      ["专家评审及竣工验收意见", ["丁烯-1装置竣工验收专家个人意见2023.5.7.pdf（删除）", "丁烯-1装置竣工验收专家意见2023.5.7.pdf（删除）"]],
      ["验收组名单", "丁烯-1装置竣工验收评审签到表2023.5.7.pdf（删除）"],
      ["竣工验收审查意见书", "2万吨/年C4异构化制丁烯-1项目专家意见修改说明.pdf（删除）"]
    ]}
  ]
};

const requiredFieldMap = {
  "可研阶段": {
    "安全评价信息": [
      "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
      "安全评价单位",
      "工艺是否国内首次使用"
    ],
    "内审评审": [
      "参加人员签名表",
      "专家组评审意见及个人意见",
      "专家组评审意见的修改说明"
    ],
    "政府审批": [
      "是否政府审批",
      "批复时间",
      "批复（备案）文件"
    ]
  },
  "基础设计阶段": {
    "安全设施设计信息": [
      "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
      "设计单位"
    ],
    "安全设施审查信息": [
      "参加人员签名表",
      "专家组评审意见及个人意见",
      "专家组评审意见的修改说明"
    ],
    "政府审批": [
      "是否政府审批",
      "批复时间",
      "批复（备案）文件",
      "开工时间"
    ]
  },
  "试运行阶段": {
    "政府审批": [
      "是否有政府试运行审批",
      "试生产时间",
      "审查组织单位",
      "试生产方案",
      "专家组名单",
      "审查意见"
    ],
    "试生产延期信息": [
      "是否延期"
    ]
  },
  "验收阶段": {
    "验收申请信息": [
      "安全设施竣工验收申请",
      "建设项目安全验收评价报告",
      "施工单位的资质证明文件",
      "建设项目安全设施施工情况报告",
      "建设项目安全设施监理情况报告"
    ],
    "验收意见": [
      "竣工验收问题汇总表",
      "建设项目安全验收评价报告（终稿）",
      "专家评审及竣工验收意见",
      "验收组名单",
      "竣工验收审查意见书"
    ]
  }
};

const tableRows = [
  {
    no: 1,
    company: "中国石化集团公司",
    name: "测试20251024项目",
    level: "事业部级(二类)",
    projectUnit: "中国石化集团公司",
    stage: "未开始",
    evalUnit: "",
    designUnit: "",
    suggestDate: "",
    acceptUnit: "",
    finishDate: "",
    creator: "",
    status: "查看"
  },
  {
    no: 2,
    company: "上海金山巴陵",
    name: "测试20251024项目",
    level: "企业级(三类)",
    projectUnit: "上海金山巴陵新材料有限公司",
    stage: "可研阶段",
    evalUnit: "上海金山安全评价公司",
    designUnit: "",
    suggestDate: "",
    acceptUnit: "",
    finishDate: "",
    creator: "于剑平",
    status: "查看"
  },
  {
    no: 3,
    company: "九江石化",
    name: "浔阳区热电联产项目",
    level: "事业部级(二类)",
    projectUnit: "九江石化",
    stage: "未开始",
    evalUnit: "江西磐安",
    designUnit: "",
    suggestDate: "",
    acceptUnit: "",
    finishDate: "",
    creator: "朱成",
    status: "查看"
  }
];

const businessUnitOptions = [
  "资本运营部",
  "矿区（社区）管理部",
  "油田勘探开发事业部",
  "炼油事业部",
  "化工事业部",
  "油品销售事业部",
  "润滑油有限公司",
  "管道储运有限公司",
  "化工销售有限公司",
  "炼油销售有限公司",
  "催化剂有限公司",
  "长城能源化工有限公司",
  "石油工程公司",
  "炼化工程公司",
  "国际石油勘探开发公司",
  "天然气分公司",
  "新星石油有限责任公司",
  "安全监管局",
  "联合石化公司",
  "总部机关及直属企业",
  "专业公司",
  "其他单位所属事业部（管理部/专业公司）"
];

const projectLevelOptions = ["集团公司级(一类)", "事业部级(二类)", "企业级(三类)"];
const stageOptions = ["未开始", "可研阶段", "设计阶段", "试车阶段", "验收阶段", "已完成"];

function LegacyDetailModal({ open, item, onClose }) {
  const [stage, setStage] = React.useState("可研阶段");
  const [kyNeedSafetyPermit, setKyNeedSafetyPermit] = React.useState(true);
  const [kyGovApprove, setKyGovApprove] = React.useState(true);
  const [kyDomesticFirstUse, setKyDomesticFirstUse] = React.useState(false);
  const [basicNeedSafetyPermit, setBasicNeedSafetyPermit] = React.useState(true);
  const [basicGovApprove, setBasicGovApprove] = React.useState(true);
  const [trialGovApprove, setTrialGovApprove] = React.useState(true);
  const [trialDelay, setTrialDelay] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setStage("可研阶段");
      setKyNeedSafetyPermit(true);
      setKyGovApprove(true);
      setKyDomesticFirstUse(false);
      setBasicNeedSafetyPermit(true);
      setBasicGovApprove(true);
      setTrialGovApprove(true);
      setTrialDelay(false);
    }
  }, [open]);
  if (!open) return null;
  const sections = (() => {
    if (stage === "基础设计阶段") {
      const reviewRows = (stageFields["基础设计阶段"] || []).find((s) => s.section === "安全设施审查信息")?.rows || [];
      const safeRows = basicNeedSafetyPermit
        ? [
            ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "是"],
            ["设计单位", "中石化上海工程有限公司(镇海)"],
            ["安全设施设计", ["2ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926.pdf", "ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926_1.pdf"]],
            ["HAZOP分析报告及审查意见", "中安联合丁烯-烷基THAZOP分析报告专家审查意见2021.7.28.pdf"],
            ["SIL分析报告及审查意见", "中安联合丁烯-烷基TSIL定级报告专家审查意见2021.7.28.pdf"],
            ["“两重点一重大”风险清单", ""],
            ["定量风险评价报告", ""]
          ]
        : [
            ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "否"],
            ["安全生产条件和设施综合分析报告所提出的对策措施在基础设计中的落实情况说明", ""]
          ];
      const govRows = basicGovApprove
        ? [
            ["是否政府审批", "是"],
            ["批复时间", "2021-11-11"],
            ["批复（备案）文件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"],
            ["开工时间", "2021-11-11"],
            ["开工报告附件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"]
          ]
        : [
            ["是否政府审批", "否"],
            ["原因", ""]
          ];
      return [
        { section: "安全设施设计信息", rows: safeRows },
        { section: "安全设施审查信息", rows: reviewRows },
        { section: "政府审批", rows: govRows }
      ];
    }
    if (stage === "试运行阶段") {
      const govRows = trialGovApprove
        ? [
            ["是否有政府试运行审批", "是"],
            ["试生产时间", "2022-11-13"],
            ["审查组织单位", "中安联合煤化有限责任公司"],
            ["试生产方案", ["2万吨年C4异构化制丁烯-1技术改造项目试生产认证材料（外审）.pdf", "2022.10.24 扩建2500吨丙烯腈项目中试与混试双面同意书.pdf"]],
            ["专家组名单", ["风险管控.zip（删除）", "丁烯-1装置试生产专家论证签到表2022.9.24.pdf（删除）"]],
            ["审查意见", "丁烯-1装置试生产专家论证专家集体意见2022.9.24.pdf（删除）"],
            ["投产前安全检查", ""]
          ]
        : [
            ["是否有政府试运行审批", "否"]
          ];
      const delayRows = trialDelay
        ? [
            ["是否延期", "是"],
            ["延期原因", ""],
            ["延期截止日期", ""],
            ["延期文件", ""]
          ]
        : [
            ["是否延期", "否"]
          ];
      return trialGovApprove
        ? [
            { section: "政府审批", rows: govRows },
            { section: "试生产延期信息", rows: delayRows }
          ]
        : [
            { section: "政府审批", rows: govRows }
          ];
    }
    if (stage !== "可研阶段") return stageFields[stage] || [];
    const reviewRows = (stageFields["可研阶段"] || []).find((s) => s.section === "内审评审")?.rows || [];
    const safeRows = kyNeedSafetyPermit
      ? [
          ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "是"],
          ["安全评价单位", "山东海普安全环保技术股份有限公司"],
          ["安全评价报告书初审稿", "中安丁烯异构化预评估案卷.pdf"],
          ["工艺危害分析报告", ""],
          ["定量风险评价报告", ""],
          ["工艺是否国内首次使用", kyDomesticFirstUse ? "是" : "否"],
          ...(kyDomesticFirstUse ? [["安全可靠性论证报告", ""]] : [])
        ]
      : [
          ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "否"],
          ["无需办理安全行政许可的书面情况说明", "功能L.ppt（删除）"],
          ["安全生产条件和设施综合分析报告", "功能L.ppt（删除）"]
        ];
    const govRows = kyGovApprove
      ? [
          ["是否政府审批", "是"],
          ["批复时间", "2020-10-28"],
          ["安全评价报告终稿", "中安丁烯异构化预评估案卷.pdf"],
          ["批复（备案）文件", "丁烯-技术改造项目安全条件审查意见书2020.10.30.pdf"]
        ]
      : [
          ["是否政府审批", "否"],
          ["原因", ""]
        ];
    return [
      { section: "安全评价信息", rows: safeRows },
      { section: "内审评审", rows: reviewRows },
      { section: "政府审批", rows: govRows }
    ];
  })();

  const isRequiredField = (sectionName, label) => {
    if (stage === "可研阶段") {
      if (sectionName === "安全评价信息") {
        const whenYes = [
          "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
          "安全评价单位",
          "工艺是否国内首次使用",
          ...(kyDomesticFirstUse ? ["安全可靠性论证报告"] : [])
        ];
        const whenNo = [
          "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
          "无需办理安全行政许可的书面情况说明",
          "安全生产条件和设施综合分析报告"
        ];
        return (kyNeedSafetyPermit ? whenYes : whenNo).includes(label);
      }
      if (sectionName === "政府审批") {
        const whenYes = ["是否政府审批", "批复时间", "批复（备案）文件"];
        const whenNo = ["是否政府审批", "原因"];
        return (kyGovApprove ? whenYes : whenNo).includes(label);
      }
    }
    if (stage === "基础设计阶段") {
      if (sectionName === "安全设施设计信息") {
        const whenYes = [
          "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
          "设计单位"
        ];
        const whenNo = [
          "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
          "安全生产条件和设施综合分析报告所提出的对策措施在基础设计中的落实情况说明"
        ];
        return (basicNeedSafetyPermit ? whenYes : whenNo).includes(label);
      }
      if (sectionName === "政府审批") {
        const whenYes = ["是否政府审批", "批复时间", "批复（备案）文件", "开工时间"];
        const whenNo = ["是否政府审批", "原因"];
        return (basicGovApprove ? whenYes : whenNo).includes(label);
      }
    }
    if (stage === "试运行阶段") {
      if (sectionName === "政府审批") {
        const whenYes = ["是否有政府试运行审批", "试生产时间", "审查组织单位", "试生产方案", "专家组名单", "审查意见"];
        const whenNo = ["是否有政府试运行审批"];
        return (trialGovApprove ? whenYes : whenNo).includes(label);
      }
      if (sectionName === "试生产延期信息") {
        const whenYes = ["是否延期", "延期原因", "延期截止日期", "延期文件"];
        const whenNo = ["是否延期"];
        return (trialDelay ? whenYes : whenNo).includes(label);
      }
    }
    const requiredSetBySection = requiredFieldMap[stage] || {};
    return (requiredSetBySection[sectionName] || []).includes(label);
  };

  const toField = (row, sectionName) => {
    if (Array.isArray(row)) {
      const label = row[0] || "";
      return {
        label,
        value: row[1],
        required: isRequiredField(sectionName, label)
      };
    }
    return row || { label: "", value: "" };
  };

  const isYesNoField = (label, value) => {
    if (!String(label || "").includes("是否")) return false;
    return value === "是" || value === "否";
  };

  const isUploadField = (label, value) => {
    const t = String(label || "");
    const v = value;
    if (Array.isArray(v)) return true;
    const sv = String(v || "").toLowerCase();
    if (sv.includes(".pdf") || sv.includes(".zip") || sv.includes(".doc") || sv.includes(".docx") || sv.includes(".ppt") || sv.includes(".pptx")) return true;
    return (
      t.includes("报告") ||
      t.includes("文件") ||
      t.includes("申请") ||
      t.includes("附件") ||
      t.includes("意见") ||
      t.includes("名单") ||
      t.includes("签名表") ||
      t.includes("问题汇总表") ||
      t.includes("检查")
    );
  };

  const renderFileText = (txt) => {
    const s = String(txt || "");
    if (!s) return null;
    const withDelete = s.includes("（删除）");
    const clean = s.replace("（删除）", "");
    return (
      <span className="legacy-file-item">
        <a href="#" className="table-link">{clean}</a>
        {withDelete ? <span className="legacy-delete-tag">（删除）</span> : null}
      </span>
    );
  };

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">项目名称：{item?.name || "测试项目"}</div>
          <button type="button" className="btn" onClick={onClose}>返回</button>
        </div>
        <div className="modal-bd">
          <div className="legacy-stage-tabs">
            {stageOrder.map((s) => (
              <button
                key={s}
                type="button"
                className={\`legacy-stage-tab \${s === stage ? "active" : ""}\`}
                onClick={() => setStage(s)}
              >
                {s}
              </button>
            ))}
          </div>

          {sections.map((sec) => (
            <div key={sec.section} className="legacy-section">
              <div className="legacy-section-title">{sec.section}</div>
              <div className="legacy-form-grid">
                {sec.rows.map((row, i) => {
                  const field = toField(row, sec.section);
                  const val = field.value;
                  const yesNo = isYesNoField(field.label, val);
                  const isKyPermitToggle = stage === "可研阶段" && field.label === "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目";
                  const isKyGovToggle = stage === "可研阶段" && field.label === "是否政府审批";
                  const isKyDomesticToggle = stage === "可研阶段" && field.label === "工艺是否国内首次使用";
                  const isBasicPermitToggle = stage === "基础设计阶段" && field.label === "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目";
                  const isBasicGovToggle = stage === "基础设计阶段" && field.label === "是否政府审批";
                  const isTrialGovToggle = stage === "试运行阶段" && field.label === "是否有政府试运行审批";
                  const isTrialDelayToggle = stage === "试运行阶段" && field.label === "是否延期";
                  return (
                  <React.Fragment key={sec.section + i}>
                    <div className="legacy-label">
                      {field.label}：{field.required ? <span className="required-mark">*</span> : null}
                    </div>
                    <div className="legacy-value">
                      {yesNo ? (
                        <div className="cert-radio-group">
                          <label className="cert-radio-item">
                            <input
                              type="radio"
                              name={
                                isKyPermitToggle ? "ky-permit-toggle"
                                : isKyGovToggle ? "ky-gov-toggle"
                                : isKyDomesticToggle ? "ky-domestic-toggle"
                                : isBasicPermitToggle ? "basic-permit-toggle"
                                : isBasicGovToggle ? "basic-gov-toggle"
                                : isTrialGovToggle ? "trial-gov-toggle"
                                : isTrialDelayToggle ? "trial-delay-toggle"
                                : ("readonly-" + sec.section + "-" + i)
                              }
                              checked={val === "是"}
                              readOnly={!isKyPermitToggle && !isKyGovToggle && !isKyDomesticToggle && !isBasicPermitToggle && !isBasicGovToggle && !isTrialGovToggle && !isTrialDelayToggle}
                              onChange={
                                isKyPermitToggle ? () => setKyNeedSafetyPermit(true)
                                : isKyGovToggle ? () => setKyGovApprove(true)
                                : isKyDomesticToggle ? () => setKyDomesticFirstUse(true)
                                : isBasicPermitToggle ? () => setBasicNeedSafetyPermit(true)
                                : isBasicGovToggle ? () => setBasicGovApprove(true)
                                : isTrialGovToggle ? () => setTrialGovApprove(true)
                                : isTrialDelayToggle ? () => setTrialDelay(true)
                                : undefined
                              }
                            />
                            <span>是</span>
                          </label>
                          <label className="cert-radio-item">
                            <input
                              type="radio"
                              name={
                                isKyPermitToggle ? "ky-permit-toggle"
                                : isKyGovToggle ? "ky-gov-toggle"
                                : isKyDomesticToggle ? "ky-domestic-toggle"
                                : isBasicPermitToggle ? "basic-permit-toggle"
                                : isBasicGovToggle ? "basic-gov-toggle"
                                : isTrialGovToggle ? "trial-gov-toggle"
                                : isTrialDelayToggle ? "trial-delay-toggle"
                                : ("readonly-" + sec.section + "-" + i)
                              }
                              checked={val === "否"}
                              readOnly={!isKyPermitToggle && !isKyGovToggle && !isKyDomesticToggle && !isBasicPermitToggle && !isBasicGovToggle && !isTrialGovToggle && !isTrialDelayToggle}
                              onChange={
                                isKyPermitToggle ? () => setKyNeedSafetyPermit(false)
                                : isKyGovToggle ? () => setKyGovApprove(false)
                                : isKyDomesticToggle ? () => setKyDomesticFirstUse(false)
                                : isBasicPermitToggle ? () => setBasicNeedSafetyPermit(false)
                                : isBasicGovToggle ? () => setBasicGovApprove(false)
                                : isTrialGovToggle ? () => setTrialGovApprove(false)
                                : isTrialDelayToggle ? () => setTrialDelay(false)
                                : undefined
                              }
                            />
                            <span>否</span>
                          </label>
                        </div>
                      ) : isUploadField(field.label, val) ? (
                        <div className="legacy-upload-row">
                          <div className="legacy-upload-box">
                            {Array.isArray(val) ? (
                              <div className="legacy-file-list inline">
                                {val.map((f, k) => <div key={String(f) + k}>{renderFileText(f)}</div>)}
                              </div>
                            ) : String(val || "").trim() ? (
                              renderFileText(val)
                            ) : (
                              <span className="legacy-upload-placeholder">上传最大500M(支持图片、文档、压缩文件等)</span>
                            )}
                          </div>
                          <button type="button" className="btn btn-primary legacy-upload-btn">选择文件</button>
                        </div>
                      ) : Array.isArray(val) ? (
                        <div className="legacy-file-list">
                          {val.map((f, k) => <a key={String(f) + k} href="#" className="table-link">{f}</a>)}
                        </div>
                      ) : String(val || "").endsWith(".pdf") ? (
                        <a href="#" className="table-link">{val}</a>
                      ) : (
                        <input className="filterbar-control" defaultValue={val || ""} readOnly />
                      )}
                    </div>
                  </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowModal({ open, onClose }) {
  const flowRecords = [
    { node: "结束", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:54:49", user: "陈宝宏", stage: "验收阶段" },
    { node: "结束", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:54:49", user: "陈宝宏", stage: "验收阶段" },
    { node: "处理中", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:54:37", user: "陈宝宏", stage: "验收阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:54:37", user: "陈宝宏", stage: "验收阶段" },
    { node: "处理中", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:50:30", user: "陈宝宏", stage: "验收阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:50:30", user: "陈宝宏", stage: "验收阶段" },
    { node: "处理中", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2023-08-15 16:50:35", user: "陈宝宏", stage: "试运行阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2023-08-15 16:50:35", user: "陈宝宏", stage: "试运行阶段" },
    { node: "处理中", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2022-05-05 10:00:00", user: "陈宝宏", stage: "基础设计阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2022-05-05 10:00:00", user: "陈宝宏", stage: "基础设计阶段" },
    { node: "处理中", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:57:40", user: "陈宝宏", stage: "基础设计阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:57:40", user: "陈宝宏", stage: "基础设计阶段" },
    { node: "处理中", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:28:03", user: "陈宝宏", stage: "基础设计阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:28:03", user: "陈宝宏", stage: "基础设计阶段" },
    { node: "处理中", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:19:37", user: "陈宝宏", stage: "可研阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:19:37", user: "陈宝宏", stage: "可研阶段" },
    { node: "开始", status: "已提交", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:12:04", user: "陈宝宏", stage: "可研阶段" },
    { node: "处理中", status: "已同意", unit: "煤化工分公司.安全环保部", time: "2022-05-05 09:12:04", user: "陈宝宏", stage: "可研阶段" }
  ];
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">流程信息</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-bd">
          {flowRecords.map((it, idx) => (
            <div key={idx} className="legacy-flow-item">
              <div>{it.node}</div>
              <div>处理状态：{it.status}</div>
              <div>处理单位：{it.unit}</div>
              <div>处理时间：{it.time}</div>
              <div>处理人：{it.user}</div>
              <div>处理阶段：{it.stage}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [detailItem, setDetailItem] = React.useState(null);
  const [showFlow, setShowFlow] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [showStageDropdown, setShowStageDropdown] = React.useState(false);
  const stageDropdownRef = React.useRef(null);
  React.useEffect(() => {
    if (!showStageDropdown) return;
    const onDocMouseDown = (e) => {
      if (!stageDropdownRef.current) return;
      if (!stageDropdownRef.current.contains(e.target)) setShowStageDropdown(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [showStageDropdown]);
  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item">
              <div className="filterbar-label">项目名称</div>
              <div className="filterbar-input">
                <input className="filterbar-control" placeholder="请输入关键字" />
              </div>
            </div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn" onClick={() => setShowAdvanced((v) => !v)}>{showAdvanced ? "收起高级查询" : "高级查询"}</button>
            <button type="button" className="btn">清空</button>
            <button type="button" className="btn">导出</button>
          </div>
        </div>
      </div>

      {showAdvanced ? (
        <div className="legacy-advanced card">
          <div className="card-bd">
            <div className="legacy-advanced-title">高级查询</div>
            <div className="legacy-advanced-grid">
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">所属事业部（管理部门专业公司）</div>
                <div className="legacy-adv-input">
                  <select className="filterbar-control">
                    <option>-请选择-</option>
                    {businessUnitOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">项目级别</div>
                <div className="legacy-adv-input">
                  <select className="filterbar-control">
                    <option>-请选择-</option>
                    {projectLevelOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">项目阶段</div>
                <div className="legacy-adv-input">
                  <div className="legacy-stage-dropdown" ref={stageDropdownRef}>
                    <button
                      type="button"
                      className="legacy-stage-trigger"
                      onClick={() => setShowStageDropdown((v) => !v)}
                    >
                      验收阶段
                      <span className="legacy-stage-caret">▼</span>
                    </button>
                    {showStageDropdown ? (
                      <div className="legacy-stage-checks">
                        {stageOptions.map((opt) => (
                          <label key={opt} className="legacy-stage-check-item">
                            <input type="checkbox" defaultChecked={opt === "验收阶段"} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">项目所在单位</div>
                <div className="legacy-adv-input"><select className="filterbar-control"><option>-请选择-</option></select></div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">登记人</div>
                <div className="legacy-adv-input"><select className="filterbar-control"><option>-请选择-</option></select></div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">登记部门</div>
                <div className="legacy-adv-input">
                  <select className="filterbar-control">
                    <option>-请选择-</option>
                    {businessUnitOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">所属企业</div>
                <div className="legacy-adv-input"><select className="filterbar-control"><option>-请选择-</option></select></div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">安全评价单位</div>
                <div className="legacy-adv-input"><input className="filterbar-control" placeholder="请输入安全评价单位" /></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="card">
        <div className="card-bd table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th>
                <th>所属企业</th>
                <th>项目名称</th>
                <th>项目级别</th>
                <th>项目所在单位</th>
                <th>项目阶段</th>
                <th>安全评价单位</th>
                <th>设计单位</th>
                <th>安全设施设计批复日期</th>
                <th>验收评价单位</th>
                <th>安全竣工验收日期</th>
                <th>登记人</th>
                <th>流程信息</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 15 }).map((_, idx) => {
                const row = tableRows[idx % tableRows.length];
                return (
                  <tr key={idx}>
                    <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                    <td>{idx + 1}</td>
                    <td>{row.company}</td>
                    <td><button type="button" className="table-link-btn" onClick={() => setDetailItem(row)}>{row.name}</button></td>
                    <td>{row.level}</td>
                    <td>{row.projectUnit}</td>
                    <td>{row.stage}</td>
                    <td>{row.evalUnit}</td>
                    <td>{row.designUnit}</td>
                    <td>{row.suggestDate}</td>
                    <td>{row.acceptUnit}</td>
                    <td>{row.finishDate}</td>
                    <td>{row.creator}</td>
                    <td><button type="button" className="table-link-btn" onClick={() => setShowFlow(true)}>查看</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <LegacyDetailModal open={!!detailItem} item={detailItem} onClose={() => setDetailItem(null)} />
      <FlowModal open={showFlow} onClose={() => setShowFlow(false)} />
    </div>
  );
}
`;
}

function genPage(spec) {
  if (spec.pageId === "hq-training-statistics") {
    return hqTrainingStatisticsPage();
  }
  if (spec.pageId === "enterprise-training-statistics") {
    return enterpriseTrainingStatisticsPage();
  }
  if (spec.pageId === "san-tongshi-migration-query-legacy") {
    return sanTongshiLegacyMigrationQueryPage();
  }
  const blocks = spec.blocks || [];
  const withLinks = hasTableLinks(blocks);
  const withModals = hasModals(spec);
  const pill = (k, v) => `
      <div className="pill">
        <div className="k">${esc(k || "")}</div>
        <div className="v">${v ? `{resolveDynamic("${esc(v)}")}` : "（示例值）"}</div>
      </div>`;
  const fieldPills = (items = [], mode = "info") => (items || []).map((f) => {
    if (typeof f === "string") return pill(f, "");
    if (Array.isArray(f)) return pill(f[0] || "", String(f[1] || ""));
    if (f && typeof f === "object") {
      const label = f.label || f.key || f.name || "字段";
      const value = f.value || (mode === "filters" ? (f.placeholder || (Array.isArray(f.options) ? f.options.join(" / ") : "") || f.type || "") : "");
      return pill(label, String(value || ""));
    }
    return pill("字段", "");
  }).join("");
  const metrics = (b) => (b.metrics || []).map((m) => `
      <div className="pill">
        <div className="k">${esc(m.label || "")}</div>
        <div className="v">${esc(m.value || "（示例值）")}</div>
      </div>`).join("");
  const tableColumns = (b) => normalizeTableData(b).columns;
  const rows = (b) => normalizeTableData(b).rows.map((cells) => `
          <tr>
            ${(cells || []).map((cell) => tableCell(cell, withModals)).join("")}
          </tr>`).join("");
  const tagItem = (item) => {
    if (typeof item === "string") return `<span className="tag">${esc(item)}</span>`;
    const it = item || {};
    const text = esc(it.text || it.label || it.name || "");
    if (it.modal && withModals) {
      return `<button type="button" className="tag" onClick={() => openModal("${esc(it.modal)}", "${esc(it.to || "")}")}>${text}</button>`;
    }
    if (it.to) {
      return `<Link className="tag" to="${esc(it.to)}">${text}</Link>`;
    }
    return `<span className="tag">${text}</span>`;
  };
  const filterBar = (b) => {
    const renderFilterAction = (a) => {
      const act = a || {};
      const cls = act.primary ? "btn btn-primary" : "btn";
      if (act.to) {
        return `<button type="button" className="${cls}" onClick={() => goto("${esc(act.to)}")}>${esc(act.label || "操作")}</button>`;
      }
      if (act.open) {
        return `<button type="button" className="${cls}" onClick={() => openModal("${esc(act.open)}", drillTarget)}>${esc(act.label || "操作")}</button>`;
      }
      return `<button type="button" className="${cls}">${esc(act.label || "操作")}</button>`;
    };
    const control = (f) => {
      if (typeof f === "string") {
        return `<input className="filterbar-control" value="${esc(f)}" readOnly />`;
      }
      const it = f || {};
      const type = String(it.type || "text").toLowerCase();
      const placeholder = esc(it.placeholder || "");
      if (type === "select") {
        const opts = Array.isArray(it.options) ? it.options : [];
        const first = opts[0] || "";
        return `<select className="filterbar-control" defaultValue="${esc(first)}">
          ${opts.map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join("")}
        </select>`;
      }
      if (type === "daterange" || type === "date-range") {
        const start = esc(it.start || it.from || "2015-10-02");
        const end = esc(it.end || it.to || "2015-10-10");
        return `<div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="${start}" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="${end}" />
        </div>`;
      }
      return `<input className="filterbar-control" placeholder="${placeholder}" defaultValue="${esc(it.value || it.defaultValue || "")}" />`;
    };
    const items = (b.fields || []).map((f) => {
      const it = (typeof f === "object" && !Array.isArray(f)) ? f : null;
      const label = labelHtml((it && (it.label || it.key)) || "");
      return `<div className="filterbar-item">
        <div className="filterbar-label">${label}</div>
        <div className="filterbar-input">${control(f)}</div>
      </div>`;
    }).join("");
    const topActions = (b.actionsTop || b.actions || []).map(renderFilterAction).join("");
    const inlineActions = (b.actionsInline || b.actionsBottom || []).map(renderFilterAction).join("");
    return `
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">${items}${inlineActions ? `<div className="filterbar-inline-actions">${inlineActions}</div>` : ""}</div>
          <div className="filterbar-actions">${topActions}</div>
        </div>
      </div>`;
  };
  const modalActions = (actions = []) => (actions || []).map((act) => {
    if (act.to) {
      const target = act.to === "__DRILL__" ? "drillTarget" : `"${esc(act.to)}"`;
      return `<button type="button" className="btn btn-primary" onClick={() => goto(${target})}>\n              ${esc(act.label || "进入")}\n            </button>`;
    }
    if (act.open) {
      return `<button type="button" className="btn btn-primary" onClick={() => openModal("${esc(act.open)}", drillTarget)}>\n              ${esc(act.label || "下一步")}\n            </button>`;
    }
    return `<button type="button" className="btn" onClick={closeModal}>\n              ${esc(act.label || "关闭")}\n            </button>`;
  }).join("\n");
  const modalJsx = (spec.modals || []).map((m) => {
    if (m.template === "project-detail-form") {
      return projectDetailModal(m);
    }
    if (m.template === "certificate-detail-form") {
      return certificateDetailModal(m, withModals);
    }
    if (m.template === "training-plan-detail-form") {
      return trainingPlanDetailModal(m, withModals);
    }
    if (m.template === "training-plan-create-form") {
      return trainingPlanCreateModal(m, withModals);
    }
    if (m.template === "training-record-create-form") {
      return trainingRecordCreateModal(m, withModals);
    }
    return `
      {activeModal === "${esc(m.id)}" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">${esc(m.title || "详情")}</div>
                <div className="modal-desc">${esc(m.desc || "")}</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              ${fieldPills(m.fields || [], "info")}
              ${m.note ? `
              <div className="pill">
                <div className="k">说明</div>
                <div className="v">${esc(m.note)}</div>
              </div>` : ""}
            </div>
            <div className="modal-ft">
              ${modalActions(m.actions || [{ label: "关闭", action: "close" }])}
            </div>
          </div>
        </div>
      ) : null}
  `;
  }).join("\n");

  const blockJsx = blocks.map((b) => {
    const type = String(b.type || "").toLowerCase();

    if (type === "infocard" || type === "info") {
      return `
      <Card title="${esc(b.title || "信息")}" desc="${esc(b.desc || "")}">
        <div className="grid grid-2">
          ${fieldPills(b.fields || [], "info")}
        </div>
      </Card>`;
    }

    if (type === "metrics") {
      return `
      <Card title="${esc(b.title || "指标总览")}" desc="${esc(b.desc || "")}">
        <div className="metrics-row">
          ${metrics(b)}
        </div>
      </Card>`;
    }

    if (type === "filters") {
      const fields = (b.fields || []).map((f, i) => inferFilterField(f, i));
      const actions = (b.actions && b.actions.length)
        ? b.actions
        : [{ label: "查询", primary: true }, { label: "重置" }, { label: "导出" }];
      return filterBar({ ...b, fields, actions });
    }

    if (type === "filterbar") {
      return filterBar(b);
    }

    if (type === "steps") {
      return `
      <Card title="${esc(b.title || "流程阶段")}" desc="${esc(b.desc || "")}">
        <div className="step-list">
          ${(b.steps || []).map((step) => `
          <div className="step-item">
            <span className="step-dot"></span>
            <span>${esc(step)}</span>
          </div>`).join("")}
        </div>
      </Card>`;
    }

    if (type === "table") {
      const columns = tableColumns(b);
      return `
      <Card title="${esc(b.title || "数据列表")}" desc="${esc(b.desc || "")}">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                ${columns.map((c) => String(c.label || "").toLowerCase() === "_sel"
                  ? '<th className="table-checkbox"><input type="checkbox" readOnly /></th>'
                  : `<th>${esc(c.label || "")}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${rows(b)}
            </tbody>
          </table>
        </div>
      </Card>`;
    }

    if (type === "tags") {
      return `
      <Card title="${esc(b.title || "标签组")}" desc="${esc(b.desc || "")}">
        <div className="tag-row">${(b.items || []).map(tagItem).join("")}</div>
      </Card>`;
    }

    if (type === "section") {
      return `
      <Card title="${esc(b.title || "说明")}" desc="${esc(b.desc || "")}">
        ${b.desc ? `
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">${esc(b.desc || "")}</div>
        </div>` : ""}
      </Card>`;
    }

    return `
      <Card title="${esc(b.title || "模块")}" desc="${esc(b.desc || "")}">
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">此块为占位：后续可升级为 Stepper/Tabs/Table/DocsPack 等组件。</div>
        </div>
      </Card>`;
  }).join("\n");
  return `import React from "react";
${withLinks ? 'import { Link, useNavigate } from "react-router-dom";' : (withModals ? 'import { useNavigate } from "react-router-dom";' : "")}
import Card from "/src/components/ui/Card.jsx";

export default function Page() {
  const navigate = ${withLinks || withModals ? "useNavigate()" : "null"};
  const projectName = new URLSearchParams(window.location.search).get("project");
  const [activeModal, setActiveModal] = React.useState(null);
  const [drillTarget, setDrillTarget] = React.useState("");
  const [drillProject, setDrillProject] = React.useState(projectName || "");
  const [modalStates, setModalStates] = React.useState({});
  const resolveDynamic = (value) => String(value || "").replace(/\\{\\{project\\}\\}/g, drillProject || projectName || "");
  const modalFormState = modalStates[activeModal] || {};
  const setModalField = (key, value) => {
    setModalFields({ [key]: value });
  };
  const setModalFields = (patch) => {
    setModalStates((prev) => ({
      ...prev,
      [activeModal]: { ...(prev[activeModal] || {}), ...(patch || {}) }
    }));
  };
  const isVisible = (showWhen) => {
    if (!showWhen) return true;
    return Object.entries(showWhen).every(([k, v]) => (modalFormState[k] || "") === String(v));
  };
  const openModal = (id, target = "") => {
    setDrillTarget(target);
    try {
      const q = target.includes("?") ? target.split("?")[1] : "";
      const p = new URLSearchParams(q).get("project");
      if (p) setDrillProject(p);
    } catch {
      // ignore parse errors
    }
    const initialByModal = ${JSON.stringify((spec.modals || []).reduce((acc, m) => {
      if (m.toggles && m.toggles.length) {
        acc[m.id] = m.toggles.reduce((s, t) => {
          s[t.key] = t.default || (t.options && t.options[0]) || "";
          return s;
        }, {});
      }
      return acc;
    }, {}))};
    if (initialByModal[id]) {
      setModalStates((prev) => ({ ...prev, [id]: initialByModal[id] }));
    }
    setActiveModal(id);
  };
  const closeModal = () => setActiveModal(null);
  const goto = (target) => {
    closeModal();
    if (navigate) navigate(target || drillTarget || "/");
  };

  return (
    <div className="stack">
      ${blockJsx}
      ${modalJsx}
    </div>
  );
}
`;
}

function main() {
  const files = walkJsonFiles(SPECS_DIR);
  const specs = [];

  for (const f of files) {
    const raw = fs.readFileSync(f, "utf-8");
    const spec = JSON.parse(raw);
    for (const k of ["module","pageId","title","path"]) {
      if (!spec[k]) throw new Error(`Spec missing "${k}" in ${f}`);
    }
    const normalizedModule = normalizeModule(spec.module);
    const normalizedSpec = { ...spec, module: normalizedModule };
    specs.push(normalizedSpec);

    const outDir = path.join(MODULES_DIR, normalizedModule, "pages");
    ensureDir(outDir);
    const outFile = path.join(outDir, `${fileSafe(spec.pageId)}.jsx`);
    const protectKey = `${normalizedModule}/${fileSafe(spec.pageId)}`;
    if (PROTECTED_GENERATED_PAGES.has(protectKey) && fs.existsSync(outFile)) {
      console.log(`Skip protected page: ${protectKey}`);
    } else {
      fs.writeFileSync(outFile, genPage(normalizedSpec), "utf-8");
    }
  }

  const routes = specs.map((s) => {
    const elementPath = `./modules/${s.module}/pages/${fileSafe(s.pageId)}.jsx`;
    const moduleGroup = moduleGroupOf(s.module);
    return `{ path: "${esc(s.path)}", title: "${esc(s.title)}", module: "${esc(s.module)}", moduleGroup: "${esc(moduleGroup)}", elementPath: "${esc(elementPath)}" }`;
  });

  fs.writeFileSync(ROUTES_FILE, `// AUTO-GENERATED. DO NOT EDIT.
// Generated by: npm run gen
export default [
  { path: "/", title: "首页", module: "home", moduleGroup: "home", elementPath: null },
  ${routes.join(",\n  ")}
];
`, "utf-8");

  console.log(`Generated ${specs.length} pages + routes.`);
}

main();
