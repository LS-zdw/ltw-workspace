import React from "react";
import Card from "../../../components/ui/Card.jsx";

const TEMPLATE_STORAGE_KEY = "proto_workbench_template_library_v1";

const TEMPLATE_TYPES = [
  { key: "all", label: "全部" },
  { key: "table", label: "表格" },
  { key: "list", label: "列表" },
  { key: "approval", label: "审批" },
  { key: "modal", label: "弹窗" }
];

const BASE_TEMPLATES = [
  {
    id: "list-compact-v1",
    name: "列表页-紧凑查询-右侧操作",
    type: "list",
    scene: "台账列表",
    tags: ["查询紧凑", "按钮右侧", "分页"],
    version: "1.0.0",
    status: "published",
    updatedAt: "2026-03-30 10:00:00",
    schema: {
      queryFields: ["计划名称", "所属部门", "日期"],
      toolbarButtons: ["新增", "导出", "模板下载"],
      tableColumns: [
        { title: "计划编号", key: "planNo" },
        { title: "计划名称", key: "planName" },
        { title: "所属部门", key: "dept" },
        { title: "日期", key: "date" }
      ],
      pager: true,
      mockRows: 10
    },
    tokens: {
      primary: "#2f5fb7",
      border: "#d7dde8",
      bg: "#f7faff",
      text: "#1f2a44",
      radius: 6,
      titleSize: 16,
      dense: false
    }
  },
  {
    id: "table-standard-v1",
    name: "表格页-标准台账",
    type: "table",
    scene: "主数据维护",
    tags: ["分页", "主列表"],
    version: "1.0.0",
    status: "published",
    updatedAt: "2026-03-30 10:00:00",
    schema: {
      queryFields: ["关键字", "状态", "日期"],
      toolbarButtons: ["新增", "导入", "导出"],
      tableColumns: [
        { title: "编号", key: "no" },
        { title: "名称", key: "name" },
        { title: "状态", key: "status" },
        { title: "日期", key: "date" }
      ],
      pager: true,
      mockRows: 10
    },
    tokens: {
      primary: "#2f5fb7",
      border: "#d7dde8",
      bg: "#f7faff",
      text: "#1f2a44",
      radius: 6,
      titleSize: 16,
      dense: false
    }
  },
  {
    id: "approval-step-v1",
    name: "审批页-步骤流",
    type: "approval",
    scene: "流程审批",
    tags: ["步骤", "意见区"],
    version: "1.0.0",
    status: "published",
    updatedAt: "2026-03-30 10:00:00",
    schema: {
      steps: ["发起", "部门审批", "会签", "归档"]
    },
    tokens: {
      primary: "#2f5fb7",
      border: "#d7dde8",
      bg: "#f7faff",
      text: "#1f2a44",
      radius: 6,
      titleSize: 16,
      dense: false
    }
  },
  {
    id: "modal-form-v1",
    name: "弹窗页-双栏表单",
    type: "modal",
    scene: "新增编辑",
    tags: ["双栏", "必填"],
    version: "1.0.0",
    status: "published",
    updatedAt: "2026-03-30 10:00:00",
    schema: {
      fields: ["名称", "所属部门", "日期", "说明"]
    },
    tokens: {
      primary: "#2f5fb7",
      border: "#d7dde8",
      bg: "#f7faff",
      text: "#1f2a44",
      radius: 6,
      titleSize: 16,
      dense: false
    }
  }
];

function makeDefaultTokens() {
  return {
    primary: "#2f5fb7",
    border: "#d7dde8",
    bg: "#f7faff",
    text: "#1f2a44",
    radius: 6,
    titleSize: 16,
    dense: false
  };
}

function makeDefaultStyles() {
  return {
    buttonStyle: "standard",
    pagerStyle: "standard"
  };
}

function makeDefaultTemplateDraft() {
  return {
    id: "",
    name: "",
    type: "list",
    scene: "",
    tagsText: "查询紧凑,按钮右侧,分页",
    version: "1.0.0",
    status: "draft",
    queryFieldsText: "计划名称,所属部门,日期",
    toolbarButtonsText: "新增,导出",
    tableColumnsText: "计划编号:planNo\n计划名称:planName\n所属部门:dept\n日期:date",
    pager: true,
    mockRows: 10,
    tokens: makeDefaultTokens(),
    styles: makeDefaultStyles(),
    ruleText: ""
  };
}

function normalizeTemplate(raw) {
  const item = raw && typeof raw === "object" ? raw : {};
  return {
    id: String(item.id || "").trim(),
    name: String(item.name || "").trim() || "未命名模板",
    type: ["table", "list", "approval", "modal"].includes(item.type) ? item.type : "list",
    scene: String(item.scene || "").trim(),
    tags: Array.isArray(item.tags) ? item.tags.map((v) => String(v || "").trim()).filter(Boolean) : [],
    version: String(item.version || "1.0.0").trim() || "1.0.0",
    status: item.status === "published" ? "published" : "draft",
    updatedAt: String(item.updatedAt || "").trim() || new Date().toLocaleString(),
    schema: item.schema && typeof item.schema === "object" ? item.schema : {},
    tokens: {
      ...makeDefaultTokens(),
      ...(item.tokens && typeof item.tokens === "object" ? item.tokens : {})
    },
    styles: {
      ...makeDefaultStyles(),
      ...(item.styles && typeof item.styles === "object" ? item.styles : {})
    },
    ruleText: String(item.ruleText || "").trim()
  };
}

function readTemplates() {
  try {
    const raw = window.localStorage.getItem(TEMPLATE_STORAGE_KEY);
    if (!raw) return BASE_TEMPLATES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return BASE_TEMPLATES;
    const items = parsed.map(normalizeTemplate).filter((it) => it.id);
    return items.length > 0 ? items : BASE_TEMPLATES;
  } catch {
    return BASE_TEMPLATES;
  }
}

function writeTemplates(items) {
  try {
    window.localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(items, null, 2));
  } catch {
    // ignore
  }
}

function parseCsvText(text) {
  return String(text || "")
    .split(/[\n,，]/)
    .map((v) => v.trim())
    .filter(Boolean);
}

function parseColumnsText(text) {
  const rows = String(text || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return rows.map((line, idx) => {
    const parts = line.split(":");
    const title = String(parts[0] || `字段${idx + 1}`).trim() || `字段${idx + 1}`;
    const key = String(parts[1] || `field${idx + 1}`).trim() || `field${idx + 1}`;
    return { title, key };
  });
}

function columnsToText(columns = []) {
  return columns.map((it) => `${it.title}:${it.key}`).join("\n");
}

function nextPatchVersion(version) {
  const parts = String(version || "1.0.0")
    .split(".")
    .map((n) => Number.parseInt(n, 10));
  const major = Number.isFinite(parts[0]) ? parts[0] : 1;
  const minor = Number.isFinite(parts[1]) ? parts[1] : 0;
  const patch = Number.isFinite(parts[2]) ? parts[2] : 0;
  return `${major}.${minor}.${patch + 1}`;
}

function buildTemplatePrompt(template) {
  return JSON.stringify(
    {
      templateId: template.id,
      templateName: template.name,
      type: template.type,
      version: template.version,
      scene: template.scene,
      tags: template.tags,
      tokens: template.tokens,
      styles: template.styles,
      ruleText: template.ruleText,
      schema: template.schema,
      usage: "请按该模板生成页面，并保留查询区紧凑布局与右侧业务按钮"
    },
    null,
    2
  );
}

function linesFromText(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function slugText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function applyRuleTextToDraft(prev, ruleText) {
  const text = String(ruleText || "");
  const next = {
    ...prev,
    ruleText: text
  };

  if (/查询紧凑/.test(text)) {
    next.tokens = { ...next.tokens, dense: true };
  }
  if (/按钮右侧|右对齐/.test(text)) {
    next.styles = { ...next.styles, buttonStyle: "right-grouped" };
  }
  if (/按钮主色|蓝色按钮/.test(text)) {
    next.styles = { ...next.styles, buttonStyle: "primary-strong" };
  }
  if (/分页必显|显示分页|需要分页/.test(text)) {
    next.pager = true;
  }
  if (/分页简洁|紧凑分页/.test(text)) {
    next.styles = { ...next.styles, pagerStyle: "compact" };
  }
  if (/首行可穿透/.test(text)) {
    next.tagsText = [next.tagsText, "首行可穿透"].filter(Boolean).join(",");
  }
  if (/不落库|仅演示|原型演示/.test(text)) {
    next.tagsText = [next.tagsText, "仅演示不落库"].filter(Boolean).join(",");
  }

  const countMatch = text.match(/(\d+)\s*条/);
  if (countMatch) {
    const count = Number(countMatch[1]);
    if (Number.isFinite(count) && count > 0) next.mockRows = count;
  }

  return next;
}

function TemplatePreview({ template }) {
  const tokens = template.tokens || makeDefaultTokens();
  const styles = template.styles || makeDefaultStyles();
  const schema = template.schema || {};
  const tableColumns = Array.isArray(schema.tableColumns) ? schema.tableColumns : [];
  const rowHeight = tokens.dense ? 30 : 38;
  const boxStyle = {
    border: `1px solid ${tokens.border}`,
    borderRadius: `${tokens.radius}px`,
    background: "#fff",
    color: tokens.text
  };

  if (template.type === "approval") {
    const steps = Array.isArray(schema.steps) && schema.steps.length > 0 ? schema.steps : ["发起", "审批", "归档"];
    return (
      <div className="tlib-preview-card" style={boxStyle}>
        <div className="tlib-preview-head" style={{ background: tokens.bg, fontSize: tokens.titleSize }}>审批流预览</div>
        <div className="tlib-step-row">
          {steps.map((step, idx) => (
            <div key={step + idx} className="tlib-step-item">
              <div className="tlib-step-dot" style={{ background: idx < 2 ? tokens.primary : "#c8d1e2" }} />
              <div>{step}</div>
            </div>
          ))}
        </div>
        <div className="tlib-note-box" style={{ borderColor: tokens.border }}>审批意见区示例</div>
      </div>
    );
  }

  if (template.type === "modal") {
    const fields = Array.isArray(schema.fields) && schema.fields.length > 0 ? schema.fields : ["名称", "日期", "说明"];
    return (
      <div className="tlib-preview-card" style={boxStyle}>
        <div className="tlib-preview-head" style={{ background: tokens.bg, fontSize: tokens.titleSize }}>弹窗预览</div>
        <div className="tlib-form-grid">
          {fields.slice(0, 4).map((field) => (
            <React.Fragment key={field}>
              <label>{field}</label>
              <input className="filterbar-control" value={`示例${field}`} readOnly />
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tlib-preview-card" style={boxStyle}>
      <div className="tlib-preview-head" style={{ background: tokens.bg, fontSize: tokens.titleSize }}>
        {template.type === "table" ? "表格预览" : "列表预览"}
      </div>
      <div className="tlib-row tlib-wrap" style={{ padding: "8px 10px" }}>
        {(schema.queryFields || []).map((field) => (
          <input key={field} className="filterbar-control" value={field} readOnly style={{ minWidth: 120 }} />
        ))}
        <button type="button" className={`btn ${styles.buttonStyle === "primary-strong" ? "btn-primary" : "btn-primary"}`}>查询</button>
        <button type="button" className="btn">重置</button>
      </div>
      <div
        className={`tlib-row ${styles.buttonStyle === "right-grouped" ? "tlib-right" : "tlib-wrap"}`}
        style={{ padding: "0 10px 8px" }}
      >
        {(schema.toolbarButtons || []).map((btn) => (
          <button key={btn} type="button" className="btn">{btn}</button>
        ))}
      </div>
      <table className="tlib-preview-table">
        <thead style={{ background: tokens.bg }}>
          <tr>
            {tableColumns.map((col) => <th key={col.key}>{col.title}</th>)}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map((idx) => (
            <tr key={idx} style={{ height: rowHeight }}>
              {tableColumns.map((col) => <td key={`${col.key}-${idx}`}>{`${col.title}${idx}`}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      {schema.pager ? (
        <div className="tlib-row tlib-right" style={{ padding: "8px 10px 10px" }}>
          <span className="tlib-muted">
            {styles.pagerStyle === "compact"
              ? `${schema.mockRows || 10}条 1/1页`
              : `共 ${schema.mockRows || 10} 条记录 第 1 / 1 页`}
          </span>
        </div>
      ) : null}
    </div>
  );
}

export default function TemplateLibraryPage() {
  const [templates, setTemplates] = React.useState(readTemplates);
  const [type, setType] = React.useState("all");
  const [keyword, setKeyword] = React.useState("");
  const [selectedId, setSelectedId] = React.useState("");
  const [editor, setEditor] = React.useState(makeDefaultTemplateDraft);
  const [message, setMessage] = React.useState("");
  const [deleteConfirmId, setDeleteConfirmId] = React.useState("");
  const [showAdvancedEditor, setShowAdvancedEditor] = React.useState(false);
  const [imageDraft, setImageDraft] = React.useState({
    fileName: "",
    dataUrl: "",
    type: "list",
    scene: "",
    hintsText: ""
  });

  React.useEffect(() => {
    writeTemplates(templates);
  }, [templates]);

  React.useEffect(() => {
    if (!templates.length) return;
    if (!selectedId || !templates.some((it) => it.id === selectedId)) {
      setSelectedId(templates[0].id);
    }
  }, [templates, selectedId]);

  React.useEffect(() => {
    if (!deleteConfirmId) return;
    if (selectedId !== deleteConfirmId) setDeleteConfirmId("");
  }, [selectedId, deleteConfirmId]);

  const filtered = React.useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return templates.filter((item) => {
      if (type !== "all" && item.type !== type) return false;
      if (!kw) return true;
      return `${item.name}${item.scene}${item.tags.join("")}${item.id}`.toLowerCase().includes(kw);
    });
  }, [templates, keyword, type]);

  const selectedTemplate = React.useMemo(
    () => templates.find((item) => item.id === selectedId) || templates[0],
    [templates, selectedId]
  );

  React.useEffect(() => {
    if (!selectedTemplate) return;
    const schema = selectedTemplate.schema || {};
    setEditor({
      id: selectedTemplate.id,
      name: selectedTemplate.name,
      type: selectedTemplate.type,
      scene: selectedTemplate.scene,
      tagsText: (selectedTemplate.tags || []).join(","),
      version: selectedTemplate.version,
      status: selectedTemplate.status,
      queryFieldsText: (schema.queryFields || []).join(","),
      toolbarButtonsText: (schema.toolbarButtons || []).join(","),
      tableColumnsText: columnsToText(schema.tableColumns || []),
      pager: schema.pager !== false,
      mockRows: Number(schema.mockRows || 10),
      tokens: { ...makeDefaultTokens(), ...(selectedTemplate.tokens || {}) },
      styles: { ...makeDefaultStyles(), ...(selectedTemplate.styles || {}) },
      ruleText: String(selectedTemplate.ruleText || "")
    });
  }, [selectedTemplate]);

  const currentPreview = React.useMemo(() => {
    const template = {
      id: editor.id,
      name: editor.name || "未命名模板",
      type: editor.type,
      scene: editor.scene,
      tags: parseCsvText(editor.tagsText),
      version: editor.version,
      status: editor.status,
      updatedAt: new Date().toLocaleString(),
      schema: {
        queryFields: parseCsvText(editor.queryFieldsText),
        toolbarButtons: parseCsvText(editor.toolbarButtonsText),
        tableColumns: parseColumnsText(editor.tableColumnsText),
        pager: !!editor.pager,
        mockRows: Number(editor.mockRows || 10)
      },
      tokens: editor.tokens,
      styles: editor.styles,
      ruleText: editor.ruleText
    };
    return normalizeTemplate(template);
  }, [editor]);

  const saveTemplate = (publish) => {
    const rawName = String(editor.name || "").trim();
    let id = String(editor.id || "").trim();
    const name = String(editor.name || "").trim();
    if (!name) {
      setMessage("模板名称不能为空");
      return;
    }
    if (!id) {
      const suffix = Date.now().toString().slice(-4);
      id = `tpl-${editor.type}-${slugText(rawName || "template")}-${suffix}`;
    }

    const payload = {
      ...currentPreview,
      id,
      name,
      status: publish ? "published" : editor.status,
      updatedAt: new Date().toLocaleString()
    };

    setTemplates((prev) => {
      const exists = prev.some((it) => it.id === id);
      if (exists) return prev.map((it) => (it.id === id ? payload : it));
      return [payload, ...prev];
    });
    setSelectedId(id);
    setEditor((prev) => ({ ...prev, id }));
    setMessage(publish ? "模板已发布" : "模板已保存");
  };

  const createNewTemplate = () => {
    const baseId = `tpl-list-${Date.now()}`;
    setEditor({ ...makeDefaultTemplateDraft(), id: baseId, name: "新列表模板" });
    setSelectedId("");
    setMessage("已创建新模板草稿");
  };

  const duplicateTemplate = () => {
    if (!selectedTemplate) return;
    const nextId = `${selectedTemplate.id}-copy-${Date.now().toString().slice(-4)}`;
    const next = normalizeTemplate({
      ...selectedTemplate,
      id: nextId,
      name: `${selectedTemplate.name}-副本`,
      status: "draft",
      version: "1.0.0",
      updatedAt: new Date().toLocaleString()
    });
    setTemplates((prev) => [next, ...prev]);
    setSelectedId(nextId);
    setMessage("已复制模板");
  };

  const saveAsNewVersion = () => {
    if (!selectedTemplate) return;
    const next = normalizeTemplate({
      ...currentPreview,
      id: selectedTemplate.id,
      name: currentPreview.name,
      version: nextPatchVersion(selectedTemplate.version),
      updatedAt: new Date().toLocaleString()
    });
    setTemplates((prev) => prev.map((it) => (it.id === selectedTemplate.id ? next : it)));
    setSelectedId(next.id);
    setMessage(`已升级版本 ${next.version}`);
  };

  const removeCurrentTemplate = () => {
    if (!selectedTemplate) return;
    setTemplates((prev) => prev.filter((it) => it.id !== selectedTemplate.id));
    setSelectedId("");
    setDeleteConfirmId("");
    setMessage("模板已删除");
  };

  const resetDefaults = () => {
    setTemplates(BASE_TEMPLATES);
    setSelectedId(BASE_TEMPLATES[0].id);
    setMessage("已恢复默认模板");
  };

  const copyPrompt = async () => {
    const text = buildTemplatePrompt(currentPreview);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setMessage("调用JSON已复制");
        return;
      }
    } catch {
      // fallback below
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "true");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      ta.style.top = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      setMessage(ok ? "调用JSON已复制" : "复制失败，请手动复制");
    } catch {
      setMessage("复制失败，请手动复制");
    }
  };

  const applyImageFile = (file) => {
    if (!file || !String(file.type || "").startsWith("image/")) {
      setMessage("仅支持图片文件");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageDraft((prev) => ({
        ...prev,
        fileName: file.name || "粘贴图片",
        dataUrl: typeof reader.result === "string" ? reader.result : "",
        scene: prev.scene || "截图导入模板"
      }));
      setMessage("图片已导入，可补充识别文本后生成草稿");
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    applyImageFile(file);
  };

  const handleImagePaste = (event) => {
    const items = event.clipboardData?.items || [];
    for (const item of items) {
      if (item.kind === "file" && String(item.type || "").startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          event.preventDefault();
          applyImageFile(file);
          return;
        }
      }
    }
    setMessage("未检测到图片，请复制图片后再粘贴");
  };

  const applyImageDraftToEditor = () => {
    const lines = linesFromText(imageDraft.hintsText);
    const queryFields = lines.slice(0, 3);
    const columnsSeed = lines.slice(3, 8);
    const columns = (columnsSeed.length > 0 ? columnsSeed : ["名称", "状态", "日期"]).map((title, idx) => ({
      title,
      key: `field${idx + 1}`
    }));
    const baseName = imageDraft.fileName ? imageDraft.fileName.replace(/\.[^.]+$/, "") : "截图模板";
    const safeName = baseName || "截图模板";
    const nextId = `tpl-${imageDraft.type}-${slugText(safeName)}-${Date.now().toString().slice(-4)}`;

    setEditor((prev) => ({
      ...prev,
      id: nextId,
      name: safeName,
      type: imageDraft.type || "list",
      scene: imageDraft.scene || "截图导入模板",
      tagsText: "图片导入,可编辑,草稿",
      queryFieldsText: (queryFields.length > 0 ? queryFields : ["关键字", "状态", "日期"]).join(","),
      toolbarButtonsText: "查询,重置,新增,导出",
      tableColumnsText: columnsToText(columns),
      pager: true,
      mockRows: 10,
      ruleText: "查询区紧凑、业务按钮右侧、分页必显、10条假数据",
      styles: { ...prev.styles, buttonStyle: "right-grouped", pagerStyle: "standard" }
    }));
    setSelectedId("");
    setMessage("已根据图片生成模板草稿，请继续微调后保存");
  };

  return (
    <Card
      title="原型模板库"
      desc="支持模板新建、版本维护、实时预览；后续可按模板ID直接生成页面"
      right={<span className="badge">{templates.length} 个模板</span>}
    >
      <div className="tlib-layout">
        <aside className="tlib-left">
          <div className="tlib-subtitle">模板管理</div>
          <div className="tlib-row tlib-wrap">
            <button type="button" className="btn btn-primary" onClick={createNewTemplate}>新建模板</button>
            <button type="button" className="btn" onClick={duplicateTemplate}>复制模板</button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                if (!selectedTemplate) return;
                setDeleteConfirmId(selectedTemplate.id);
                setMessage("请点击“确认删除”后再执行删除");
              }}
            >
              删除模板
            </button>
            <button type="button" className="btn" onClick={resetDefaults}>恢复默认</button>
          </div>
          {deleteConfirmId && selectedTemplate?.id === deleteConfirmId ? (
            <div className="v" style={{ marginTop: 4, background: "#fff3f3", borderColor: "#e4a5a5", color: "#c62828" }}>
              <div style={{ marginBottom: 6 }}>确认删除模板：{selectedTemplate.name}</div>
              <div className="tlib-row tlib-wrap">
                <button type="button" className="btn" onClick={removeCurrentTemplate}>确认删除</button>
                <button type="button" className="btn" onClick={() => setDeleteConfirmId("")}>取消</button>
              </div>
            </div>
          ) : null}
          <div className="tlib-row tlib-wrap">
            {TEMPLATE_TYPES.map((it) => (
              <button
                key={it.key}
                type="button"
                className={`btn ${type === it.key ? "btn-primary" : ""}`}
                onClick={() => setType(it.key)}
              >
                {it.label}
              </button>
            ))}
          </div>
          <input
            className="filterbar-control tlib-full"
            placeholder="搜索模板名称"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="tlib-template-list">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`tlib-template-card ${selectedTemplate?.id === item.id ? "active" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="tlib-template-name">{item.name}</div>
                <div className="tlib-muted">{item.scene}</div>
                <div className="tlib-row tlib-wrap">
                  <span className="badge">{item.type}</span>
                  <span className="badge">v{item.version}</span>
                  <span className="badge">{item.status === "published" ? "已发布" : "草稿"}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="tlib-center">
          <TemplatePreview template={currentPreview} />
          {imageDraft.dataUrl ? (
            <div className="tlib-prompt-box">
              <div className="tlib-subtitle">图片草稿预览</div>
              <img
                src={imageDraft.dataUrl}
                alt="模板截图草稿"
                style={{ width: "100%", border: "1px solid #d7dde8", display: "block" }}
              />
            </div>
          ) : null}
          <div className="tlib-prompt-box">
            <div className="tlib-subtitle">模板调用JSON</div>
            <textarea className="filterbar-control tlib-prompt-textarea" value={buildTemplatePrompt(currentPreview)} readOnly />
            <div className="tlib-row">
              <button type="button" className="btn btn-primary" onClick={copyPrompt}>复制调用JSON</button>
              <span className="tlib-muted">后续你发模板ID或这段JSON，我可直接按模板出页面</span>
            </div>
          </div>
        </section>

        <aside className="tlib-right">
          <div className="tlib-subtitle">图片转模板草稿</div>
          <div className="tlib-form-grid">
            <label>上传截图</label>
            <input className="filterbar-control" type="file" accept="image/*" onChange={handleImageUpload} />
            <label>粘贴图片</label>
            <div
              className="v"
              style={{ minHeight: 46, display: "flex", alignItems: "center", background: "#fff", cursor: "text" }}
              tabIndex={0}
              onPaste={handleImagePaste}
            >
              在此点击后按 `Ctrl+V` 粘贴图片
            </div>
            <label>模板类型</label>
            <select
              className="filterbar-control"
              value={imageDraft.type}
              onChange={(e) => setImageDraft((p) => ({ ...p, type: e.target.value }))}
            >
              <option value="list">列表</option>
              <option value="table">表格</option>
              <option value="approval">审批</option>
              <option value="modal">弹窗</option>
            </select>
            <label>场景描述</label>
            <input
              className="filterbar-control"
              value={imageDraft.scene}
              onChange={(e) => setImageDraft((p) => ({ ...p, scene: e.target.value }))}
              placeholder="如：培训计划管理首页"
            />
            <label>识别文本</label>
            <textarea
              className="filterbar-control"
              value={imageDraft.hintsText}
              onChange={(e) => setImageDraft((p) => ({ ...p, hintsText: e.target.value }))}
              placeholder="可粘贴截图中的字段/列名，每行一个"
            />
          </div>
          <div className="tlib-row tlib-wrap">
            <button type="button" className="btn btn-primary" onClick={applyImageDraftToEditor}>生成草稿</button>
          </div>
          <div className="tlib-subtitle">模板编辑</div>
          <div className="tlib-form-grid">
            <label><span className="required-mark">*</span>模板名称</label>
            <input className="filterbar-control" value={editor.name} onChange={(e) => setEditor((p) => ({ ...p, name: e.target.value }))} />
            <label>模板类型</label>
            <select className="filterbar-control" value={editor.type} onChange={(e) => setEditor((p) => ({ ...p, type: e.target.value }))}>
              <option value="list">列表</option>
              <option value="table">表格</option>
              <option value="approval">审批</option>
              <option value="modal">弹窗</option>
            </select>
            <label>规则描述</label>
            <textarea
              className="filterbar-control"
              value={editor.ruleText}
              onChange={(e) => setEditor((p) => ({ ...p, ruleText: e.target.value }))}
              placeholder="例如：查询区紧凑左对齐，业务按钮右侧，分页必显，10条假数据，首行可穿透"
            />
          </div>
          <div className="tlib-row tlib-wrap">
            <button
              type="button"
              className="btn"
              onClick={() => {
                setEditor((prev) => applyRuleTextToDraft(prev, prev.ruleText));
                setMessage("已按规则描述自动生成模板配置");
              }}
            >
              规则转模板
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setShowAdvancedEditor((v) => !v)}
            >
              {showAdvancedEditor ? "收起高级编辑" : "展开高级编辑"}
            </button>
            <button type="button" className="btn" onClick={() => saveTemplate(false)}>保存草稿</button>
            <button type="button" className="btn" onClick={saveAsNewVersion}>保存新版本</button>
            <button type="button" className="btn btn-primary" onClick={() => saveTemplate(true)}>发布模板</button>
          </div>

          {showAdvancedEditor ? (
            <>
              <div className="tlib-subtitle">高级编辑</div>
              <div className="tlib-form-grid">
                <label>模板ID（可选，不填自动生成）</label>
                <input className="filterbar-control" value={editor.id} onChange={(e) => setEditor((p) => ({ ...p, id: e.target.value }))} />
                <label>适用场景</label>
                <input className="filterbar-control" value={editor.scene} onChange={(e) => setEditor((p) => ({ ...p, scene: e.target.value }))} />
                <label>标签</label>
                <input className="filterbar-control" value={editor.tagsText} onChange={(e) => setEditor((p) => ({ ...p, tagsText: e.target.value }))} />
            <label>按钮样式模板</label>
            <select
              className="filterbar-control"
              value={editor.styles.buttonStyle}
              onChange={(e) =>
                setEditor((p) => ({ ...p, styles: { ...p.styles, buttonStyle: e.target.value } }))
              }
            >
              <option value="standard">标准按钮</option>
              <option value="right-grouped">右侧分组按钮</option>
              <option value="primary-strong">强调主按钮</option>
            </select>
            <label>页码样式模板</label>
            <select
              className="filterbar-control"
              value={editor.styles.pagerStyle}
              onChange={(e) =>
                setEditor((p) => ({ ...p, styles: { ...p.styles, pagerStyle: e.target.value } }))
              }
            >
              <option value="standard">标准分页</option>
              <option value="compact">紧凑分页</option>
            </select>
                <label>查询字段</label>
                <input className="filterbar-control" value={editor.queryFieldsText} onChange={(e) => setEditor((p) => ({ ...p, queryFieldsText: e.target.value }))} />
                <label>业务按钮</label>
                <input className="filterbar-control" value={editor.toolbarButtonsText} onChange={(e) => setEditor((p) => ({ ...p, toolbarButtonsText: e.target.value }))} />
                <label>列表列配置</label>
                <textarea className="filterbar-control" value={editor.tableColumnsText} onChange={(e) => setEditor((p) => ({ ...p, tableColumnsText: e.target.value }))} />
                <label>主色</label>
                <input type="color" className="nav-color-input" value={editor.tokens.primary} onChange={(e) => setEditor((p) => ({ ...p, tokens: { ...p.tokens, primary: e.target.value } }))} />
                <label>边框色</label>
                <input type="color" className="nav-color-input" value={editor.tokens.border} onChange={(e) => setEditor((p) => ({ ...p, tokens: { ...p.tokens, border: e.target.value } }))} />
                <label>背景色</label>
                <input type="color" className="nav-color-input" value={editor.tokens.bg} onChange={(e) => setEditor((p) => ({ ...p, tokens: { ...p.tokens, bg: e.target.value } }))} />
                <label>字体色</label>
                <input type="color" className="nav-color-input" value={editor.tokens.text} onChange={(e) => setEditor((p) => ({ ...p, tokens: { ...p.tokens, text: e.target.value } }))} />
                <label>圆角</label>
                <input className="filterbar-control" type="number" min="0" max="16" value={editor.tokens.radius} onChange={(e) => setEditor((p) => ({ ...p, tokens: { ...p.tokens, radius: Number(e.target.value || 0) } }))} />
                <label>标题字号</label>
                <input className="filterbar-control" type="number" min="12" max="24" value={editor.tokens.titleSize} onChange={(e) => setEditor((p) => ({ ...p, tokens: { ...p.tokens, titleSize: Number(e.target.value || 16) } }))} />
                <label>模拟条数</label>
                <input className="filterbar-control" type="number" min="1" max="200" value={editor.mockRows} onChange={(e) => setEditor((p) => ({ ...p, mockRows: Number(e.target.value || 10) }))} />
              </div>
              <div className="tlib-row tlib-wrap">
                <label className="tlib-check">
                  <input type="checkbox" checked={editor.pager} onChange={(e) => setEditor((p) => ({ ...p, pager: e.target.checked }))} />
                  <span>显示分页</span>
                </label>
                <label className="tlib-check">
                  <input type="checkbox" checked={editor.tokens.dense} onChange={(e) => setEditor((p) => ({ ...p, tokens: { ...p.tokens, dense: e.target.checked } }))} />
                  <span>紧凑模式</span>
                </label>
              </div>
            </>
          ) : null}
          {message ? <div className="v" style={{ marginTop: 8 }}>{message}</div> : null}
        </aside>
      </div>
    </Card>
  );
}
