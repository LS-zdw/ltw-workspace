import React from "react";
import Card from "../../../components/ui/Card.jsx";

const TEMPLATE_TYPES = [
  { key: "all", label: "全部" },
  { key: "table", label: "表格" },
  { key: "list", label: "列表" },
  { key: "approval", label: "审批" },
  { key: "modal", label: "弹窗" }
];

const BASE_TEMPLATES = [
  { id: "table-standard-v1", name: "表格-标准信息表-v1", type: "table", scene: "台账列表/主数据", tags: ["分页", "查询区紧凑"] },
  { id: "table-compact-v1", name: "表格-紧凑密集-v1", type: "table", scene: "高频运维查询", tags: ["密集行高", "10条/页"] },
  { id: "list-card-v1", name: "列表-卡片摘要-v1", type: "list", scene: "专题入口/看板摘要", tags: ["卡片化", "分组"] },
  { id: "list-task-v1", name: "列表-任务清单-v1", type: "list", scene: "待办/任务中心", tags: ["状态色", "操作列"] },
  { id: "approval-step-v1", name: "审批-横向步骤-v1", type: "approval", scene: "流程推进", tags: ["步骤条", "审批意见"] },
  { id: "approval-detail-v1", name: "审批-详情会签-v1", type: "approval", scene: "会签审批", tags: ["审批记录", "意见区"] },
  { id: "modal-form-v1", name: "弹窗-双栏表单-v1", type: "modal", scene: "新增/编辑", tags: ["双栏", "必填校验"] },
  { id: "modal-detail-v1", name: "弹窗-详情只读-v1", type: "modal", scene: "查看详情", tags: ["只读灰底", "字段分组"] }
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

function PromptBlock({ template, tokens }) {
  const promptText = `模板:${template.name}; 类型:${template.type}; 场景:${template.scene}; 主色:${tokens.primary}; 边框:${tokens.border}; 背景:${tokens.bg}; 圆角:${tokens.radius}px; 标题字号:${tokens.titleSize}px; 紧凑模式:${tokens.dense ? "是" : "否"}`;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="tlib-prompt-box">
      <div className="tlib-subtitle">调用口令</div>
      <textarea className="filterbar-control tlib-prompt-textarea" value={promptText} readOnly />
      <div className="tlib-row">
        <button type="button" className="btn btn-primary" onClick={handleCopy}>复制口令</button>
        <span className="tlib-muted">{copied ? "已复制" : "后续可直接把这段口令发给我套模板"}</span>
      </div>
    </div>
  );
}

function TemplatePreview({ template, tokens }) {
  const boxStyle = {
    border: `1px solid ${tokens.border}`,
    borderRadius: `${tokens.radius}px`,
    background: "#fff",
    color: tokens.text
  };
  const titleStyle = { fontSize: `${tokens.titleSize}px`, color: tokens.text };
  const rowHeight = tokens.dense ? 30 : 38;

  if (template.type === "table") {
    return (
      <div className="tlib-preview-card" style={boxStyle}>
        <div className="tlib-preview-head" style={{ ...titleStyle, background: tokens.bg }}>信息列表预览</div>
        <table className="tlib-preview-table">
          <thead style={{ background: tokens.bg }}>
            <tr><th>序号</th><th>名称</th><th>状态</th><th>日期</th><th>操作</th></tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i} style={{ height: rowHeight }}>
                <td>{i}</td><td>模板演示数据{i}</td><td>{i === 1 ? "进行中" : "已完成"}</td><td>2026-03-30</td>
                <td><button type="button" className="btn tlib-mini-btn">查看</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (template.type === "approval") {
    return (
      <div className="tlib-preview-card" style={boxStyle}>
        <div className="tlib-preview-head" style={{ ...titleStyle, background: tokens.bg }}>审批流预览</div>
        <div className="tlib-step-row">
          {["发起", "部门审批", "会签", "归档"].map((step, idx) => (
            <div key={step} className="tlib-step-item">
              <div className="tlib-step-dot" style={{ background: idx < 2 ? tokens.primary : "#c8d1e2" }} />
              <div>{step}</div>
            </div>
          ))}
        </div>
        <div className="tlib-note-box" style={{ borderColor: tokens.border }}>
          审批意见区：同意，按计划推进。
        </div>
      </div>
    );
  }

  if (template.type === "modal") {
    return (
      <div className="tlib-preview-card" style={boxStyle}>
        <div className="tlib-preview-head" style={{ ...titleStyle, background: tokens.bg }}>弹窗预览</div>
        <div className="tlib-form-grid">
          <label><span className="required-mark">*</span>模板名称</label><input className="filterbar-control" value="示例模板" readOnly />
          <label>所属模块</label><input className="filterbar-control" value="教育培训" readOnly />
          <label>说明</label><textarea className="filterbar-control" value="弹窗模板说明示例" readOnly />
        </div>
        <div className="tlib-row tlib-right">
          <button type="button" className="btn">取消</button>
          <button type="button" className="btn btn-primary">确认</button>
        </div>
      </div>
    );
  }

  return (
    <div className="tlib-preview-card" style={boxStyle}>
      <div className="tlib-preview-head" style={{ ...titleStyle, background: tokens.bg }}>列表预览</div>
      <div className="tlib-list-cards">
        {[1, 2, 3].map((i) => (
          <div key={i} className="tlib-list-item" style={{ borderColor: tokens.border }}>
            <div>模板条目 {i}</div>
            <span className="badge" style={{ background: tokens.bg, color: tokens.primary }}>状态正常</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TemplateLibraryPage() {
  const [type, setType] = React.useState("all");
  const [keyword, setKeyword] = React.useState("");
  const [tokens, setTokens] = React.useState(makeDefaultTokens);
  const [selectedId, setSelectedId] = React.useState(BASE_TEMPLATES[0].id);

  const filtered = React.useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    return BASE_TEMPLATES.filter((item) => {
      if (type !== "all" && item.type !== type) return false;
      if (!kw) return true;
      return `${item.name}${item.scene}${item.tags.join("")}`.toLowerCase().includes(kw);
    });
  }, [keyword, type]);

  const selectedTemplate =
    BASE_TEMPLATES.find((item) => item.id === selectedId) || BASE_TEMPLATES[0];

  return (
    <Card
      title="原型模板库"
      desc="统一沉淀表格、列表、审批、弹窗模板；支持变量化样式与调用口令"
      right={<span className="badge">{BASE_TEMPLATES.length} 个模板</span>}
    >
      <div className="tlib-layout">
        <aside className="tlib-left">
          <div className="tlib-subtitle">模板筛选</div>
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
            placeholder="搜索模板名称/场景"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className="tlib-template-list">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`tlib-template-card ${selectedTemplate.id === item.id ? "active" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="tlib-template-name">{item.name}</div>
                <div className="tlib-muted">{item.scene}</div>
                <div className="tlib-row tlib-wrap">
                  {item.tags.map((tag) => <span key={`${item.id}-${tag}`} className="badge">{tag}</span>)}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="tlib-center">
          <TemplatePreview template={selectedTemplate} tokens={tokens} />
          <PromptBlock template={selectedTemplate} tokens={tokens} />
        </section>

        <aside className="tlib-right">
          <div className="tlib-subtitle">样式变量</div>
          <div className="tlib-form-grid">
            <label>主色</label>
            <input type="color" className="nav-color-input" value={tokens.primary} onChange={(e) => setTokens((p) => ({ ...p, primary: e.target.value }))} />
            <label>边框色</label>
            <input type="color" className="nav-color-input" value={tokens.border} onChange={(e) => setTokens((p) => ({ ...p, border: e.target.value }))} />
            <label>背景色</label>
            <input type="color" className="nav-color-input" value={tokens.bg} onChange={(e) => setTokens((p) => ({ ...p, bg: e.target.value }))} />
            <label>文字色</label>
            <input type="color" className="nav-color-input" value={tokens.text} onChange={(e) => setTokens((p) => ({ ...p, text: e.target.value }))} />
            <label>圆角</label>
            <input className="filterbar-control" type="number" min="0" max="16" value={tokens.radius} onChange={(e) => setTokens((p) => ({ ...p, radius: Number(e.target.value || 0) }))} />
            <label>标题字号</label>
            <input className="filterbar-control" type="number" min="12" max="24" value={tokens.titleSize} onChange={(e) => setTokens((p) => ({ ...p, titleSize: Number(e.target.value || 16) }))} />
          </div>
          <div className="tlib-row">
            <label className="tlib-check">
              <input type="checkbox" checked={tokens.dense} onChange={(e) => setTokens((p) => ({ ...p, dense: e.target.checked }))} />
              <span>紧凑模式</span>
            </label>
          </div>
          <div className="tlib-row">
            <button type="button" className="btn" onClick={() => setTokens(makeDefaultTokens())}>重置变量</button>
          </div>
        </aside>
      </div>
    </Card>
  );
}
