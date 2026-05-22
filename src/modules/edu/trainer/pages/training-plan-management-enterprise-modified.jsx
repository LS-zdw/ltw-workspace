import React from "react";

const planRows = [
  { id: 1, planNo: "PLAN2025001", level: "企业级（1）", category: "上岗培训（一级）", name: "2025新员工一级安全教育", date: "2025-07-01", hours: "24", organizer: "安全环保部", source: "人工制定", status: "无需审批" },
  { id: 2, planNo: "PLAN2025002", level: "二级单位级（2）", category: "上岗培训（二级）", name: "新员工二级安全教育", date: "2025-07-10", hours: "24", organizer: "运行一部", source: "人工制定", status: "已通过" },
  { id: 3, planNo: "AUTO2025001", level: "二级单位级（2）", category: "转岗培训", name: "转岗人员安全培训", date: "2025-04-20", hours: "16", organizer: "设备部", source: "系统自动生成", status: "待审批" },
  { id: 4, planNo: "AUTO2025002", level: "二级单位级（2）", category: "专项培训", name: "证书到期复训计划", date: "2025-05-08", hours: "8", organizer: "储运部", source: "系统自动生成", status: "已通过" },
  { id: 5, planNo: "PLAN2025003", level: "企业级（1）", category: "年度培训", name: "班组长安全能力提升计划", date: "2025-08-15", hours: "12", organizer: "安全环保部", source: "人工制定", status: "无需审批" },
  { id: 6, planNo: "AUTO2025003", level: "二级单位级（2）", category: "月度培训", name: "受限空间监护复训计划", date: "2025-09-03", hours: "8", organizer: "工程管理部", source: "系统自动生成", status: "待审批" },
  { id: 7, planNo: "PLAN2025004", level: "企业级（1）", category: "临时培训", name: "转岗人员三级安全补训", date: "2025-09-20", hours: "16", organizer: "人力资源部", source: "人工制定", status: "无需审批" },
  { id: 8, planNo: "AUTO2025004", level: "二级单位级（2）", category: "上岗培训（三级）", name: "岗位变更人员上岗复训", date: "2025-10-05", hours: "12", organizer: "运行二部", source: "系统自动生成", status: "已通过" },
  { id: 9, planNo: "PLAN2025005", level: "企业级（1）", category: "上岗培训（一级）", name: "作业票管理专项培训", date: "2025-10-26", hours: "10", organizer: "工程管理部", source: "人工制定", status: "待审批" },
  { id: 10, planNo: "AUTO2025005", level: "二级单位级（2）", category: "转岗培训", name: "关键岗位人员转岗复核培训", date: "2025-11-12", hours: "14", organizer: "设备部", source: "系统自动生成", status: "已通过" }
];

const executeRows = [
  { id: 1, org: "化工二部、炼油一部", period: "1", month: "8", className: "2024年HSE关键岗位人员培训", type: "线上培训", planPeople: "10", realPeople: "10", passPeople: "10", passRate: "100%" },
  { id: 2, org: "设备工程部", period: "1", month: "9", className: "设备完整性风险识别与管控培训", type: "集中面授", planPeople: "12", realPeople: "11", passPeople: "11", passRate: "100%" },
  { id: 3, org: "公用工程部", period: "1", month: "10", className: "应急处置流程桌面推演培训", type: "外出研修", planPeople: "8", realPeople: "8", passPeople: "7", passRate: "88%" }
];

function Field({ label, required = false, children, wide = false }) {
  return (
    <div className={`cert-field-item${wide ? " cert-field-item-wide" : ""}`}>
      <div className="cert-field-label">{required ? <span className="required-mark">*</span> : null}{label}:</div>
      <div className="cert-field-value">{children}</div>
    </div>
  );
}

function OrganizationTree({ readOnly = false }) {
  return (
    <div className="stpm-org-tree">
      <div className="stpm-org-tree-search">
        <span className="stpm-org-tree-label">名称:</span>
        <input className="filterbar-control stpm-org-tree-input" defaultValue="" placeholder="请输入组织名称" readOnly={readOnly} />
        <button type="button" className="btn btn-primary stpm-org-tree-btn" disabled={readOnly}>查找</button>
      </div>
      <div className="stpm-org-tree-body">
        <label className="stpm-org-tree-item"><input type="checkbox" readOnly disabled={readOnly} /> 镇海炼化</label>
        <label className="stpm-org-tree-item level-1"><input type="checkbox" readOnly disabled={readOnly} /> 办公室</label>
        <label className="stpm-org-tree-item level-1"><input type="checkbox" readOnly disabled={readOnly} /> 计划经营部</label>
        <label className="stpm-org-tree-item level-1"><input type="checkbox" readOnly disabled={readOnly} /> 生产技术部</label>
        <label className="stpm-org-tree-item level-1"><input type="checkbox" readOnly disabled={readOnly} /> 安全环保部</label>
        <label className="stpm-org-tree-item level-1"><input type="checkbox" readOnly disabled={readOnly} /> 化工二部</label>
      </div>
    </div>
  );
}

function MonthChecklist({ readOnly = false }) {
  const months = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"
  ];
  const checkedSet = new Set(["3月", "6月"]);
  return (
    <div className="plan-months">
      {months.map((m) => (
        <label className="plan-month-item" key={m}>
          <input type="checkbox" defaultChecked={checkedSet.has(m)} disabled={readOnly} />
          <span>{m}</span>
        </label>
      ))}
    </div>
  );
}

function EnterprisePlanModal({ mode = "view", onClose }) {
  const readOnly = mode === "view";
  const isChange = mode === "change";
  const titleMap = {
    add: "培训计划新增",
    edit: "培训计划编辑",
    change: "变更培训计划",
    view: "培训计划详情"
  };

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{titleMap[mode] || "培训计划详情"}</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>

        <div className="modal-bd cert-bd">
          <div className="cert-section">
            <div className="cert-section-title">培训计划基本信息</div>
            <div className="cert-form-grid">
              <Field label="计划来源" required>
                <select className="cert-field-control" defaultValue="人工制定" disabled={readOnly}>
                  <option>人工制定</option>
                  <option>系统自动生成</option>
                </select>
              </Field>
              <Field label="培训层级" required>
                <select className="cert-field-control" defaultValue="企业级（1）" disabled={readOnly}>
                  <option>企业级（1）</option>
                  <option>二级单位级（2）</option>
                </select>
              </Field>
              <Field label="培训类别" required>
                <select className="cert-field-control" defaultValue="上岗培训（一级）" disabled={readOnly}>
                  <option>年度培训</option>
                  <option>临时培训</option>
                  <option>上岗培训（一级）</option>
                  <option>月度培训</option>
                  <option>专项培训</option>
                  <option>上岗培训（二级）</option>
                  <option>上岗培训（三级）</option>
                  <option>转岗培训</option>
                </select>
              </Field>
              <Field label="培训名称" required wide>
                <input className="cert-field-control" defaultValue="自动生成/可修改" readOnly={readOnly} />
              </Field>
              <Field label="计划培训日期" required>
                <input className="cert-field-control" defaultValue="年 / 月 / 日" readOnly={readOnly} />
              </Field>
            </div>
          </div>

          <div className="cert-section">
            <div className="cert-section-title">组织与执行信息</div>
            <div className="cert-form-grid">
              <Field label="培训学时" required>
                <input className="cert-field-control" defaultValue="自动填充：24/16/8" readOnly={readOnly} />
              </Field>
              <Field label="主办单位" required>
                <input className="cert-field-control" defaultValue="自动匹配部门" readOnly={readOnly} />
              </Field>
              <Field label="培训机构">
                <input className="cert-field-control" defaultValue="非必填" readOnly={readOnly} />
              </Field>
              <Field label="培训期数">
                <input className="cert-field-control" defaultValue="0" readOnly={readOnly} />
              </Field>
              <Field label="附件上传" wide>
                <div className="cert-picker">
                  <button type="button" className="btn" disabled={readOnly}>选择文件</button>
                  <input className="cert-field-control" defaultValue="未选择任何文件" readOnly />
                </div>
              </Field>
              {isChange ? (
                <Field label="变更原因" required wide>
                  <textarea className="cert-field-control cert-field-textarea" defaultValue="因自动补充规则调整，需更新培训类别与主办单位。" readOnly={readOnly} placeholder="填写变更原因" />
                </Field>
              ) : null}
            </div>
          </div>

          {mode === "view" ? (
            <div className="cert-section">
              <div className="cert-section-title">计划执行情况</div>
              <div className="table-wrap">
                <table className="proto-table">
                  <thead>
                    <tr>
                      <th>序号</th><th>参与单位</th><th>期次</th><th>开班月份</th><th>培训班名称</th><th>培训形式</th><th>计划培训人数</th><th>实际培训人数</th><th>考试合格人员数量</th><th>合格率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {executeRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td><td>{row.org}</td><td>{row.period}</td><td>{row.month}</td><td>{row.className}</td><td>{row.type}</td><td>{row.planPeople}</td><td>{row.realPeople}</td><td>{row.passPeople}</td><td>{row.passRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>

        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>关闭</button>
          {mode === "view" ? null : <button type="button" className="btn btn-primary" onClick={onClose}>保存</button>}
          {mode === "add" || mode === "change" ? <button type="button" className="btn btn-primary" onClick={onClose}>提交</button> : null}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [activeModal, setActiveModal] = React.useState("");

  const openFirstOnly = (id, modal) => {
    if (id !== 1) return;
    setActiveModal(modal);
  };

  return (
    <div className="stack tp-mod-page">
      <div className="card">
        <div className="card-bd">
          <div className="tp-mod-toolbar">
            <button type="button" className="btn btn-primary" onClick={() => setActiveModal("add")}>+ 新增计划</button>
            <button type="button" className="btn tp-mod-btn-auto">生成自动补充计划</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
          </div>

          <div className="tp-mod-filter-row">
            <select className="filterbar-control" defaultValue="企业级（1）">
              <option>企业级（1）</option><option>二级单位级（2）</option><option>全部层级</option>
            </select>
            <select className="filterbar-control" defaultValue="上岗培训（一级）">
              <option>年度培训</option>
              <option>临时培训</option>
              <option>上岗培训（一级）</option>
              <option>月度培训</option>
              <option>专项培训</option>
              <option>上岗培训（二级）</option>
              <option>上岗培训（三级）</option>
              <option>转岗培训</option>
            </select>
            <select className="filterbar-control" defaultValue="全部来源">
              <option>全部来源</option><option>人工制定</option><option>系统自动生成</option>
            </select>
            <input className="filterbar-control tp-mod-name-input" placeholder="计划名称" />
            <input className="filterbar-control tp-mod-date-input" defaultValue="年 / 月 / 日" />
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">筛选</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>

          <div className="table-wrap stpm-table-wrap" data-pager="manual">
            <table className="proto-table stpm-main-table tp-mod-main-table">
              <thead>
                <tr>
                  <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                  <th>计划编号</th><th>层级</th><th>类别</th><th>培训名称</th><th>计划日期</th><th>学时</th><th>主办单位</th><th>来源</th><th>状态</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                {planRows.map((row) => (
                  <tr key={row.id}>
                    <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                    <td>{row.planNo}</td>
                    <td>{row.level}</td>
                    <td>{row.category}</td>
                    <td>{row.id === 1 ? <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>{row.name}</button> : <span>{row.name}</span>}</td>
                    <td>{row.date}</td>
                    <td>{row.hours}</td>
                    <td>{row.organizer}</td>
                    <td>{row.source}</td>
                    <td><span className={`tp-mod-status ${row.status === "已通过" ? "tp-mod-status-pass" : row.status === "待审批" ? "tp-mod-status-wait" : "tp-mod-status-none"}`}>{row.status}</span></td>
                    <td>
                      {row.id === 1 ? (
                        <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "edit")}>编辑</button>
                      ) : (
                        <span className="tp-mod-op-text">编辑</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="stpm-main-pager">
        <div className="stpm-main-pager-total">共 10 条记录 第 1 / 1 页</div>
        <div className="stpm-main-pager-controls">
          <button type="button" className="stpm-main-page-btn" disabled>‹</button>
          <button type="button" className="stpm-main-page-btn active">1</button>
          <button type="button" className="stpm-main-page-btn" disabled>›</button>
          <select className="stpm-main-page-size" defaultValue="10"><option value="10">10条/页</option></select>
        </div>
      </div>

      {activeModal === "view" ? <EnterprisePlanModal mode="view" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "edit" ? <EnterprisePlanModal mode="edit" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "change" ? <EnterprisePlanModal mode="change" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "add" ? <EnterprisePlanModal mode="add" onClose={() => setActiveModal("")} /> : null}
    </div>
  );
}
