import React from "react";

const planRows = [
  { id: 1, name: "2025年度中国石化集团安全培训计划", year: "2025", type: "年度计划", dept: "", date: "", user: "", status: "待填报", action: "展开填报" },
  { id: 2, name: "2024年度中国石化集团安全培训计划（补充版）", year: "2024", type: "临时计划", dept: "安全监督管理室", date: "2024-10-20", user: "王芳", status: "审批中", action: "查看详情" },
  { id: 3, name: "2024年度中国石化集团安全培训计划", year: "2024", type: "年度计划", dept: "安全监督管理室", date: "2024-01-10", user: "李明", status: "已通过", action: "查看详情" },
  { id: 4, name: "2023年度中国石化集团安全培训计划（修订版）", year: "2023", type: "政府取证", dept: "安全监督管理室", date: "2023-11-15", user: "张强", status: "已退回", action: "重新填报" },
  { id: 5, name: "2023年度总部HSE重点岗位培训计划征集", year: "2023", type: "年度计划", dept: "安全监督管理室", date: "2023-01-18", user: "张强", status: "已关闭", action: "查看详情" }
];

const projectRowsByPlan = {
  1: [
    { id: 1, code: "AZ-2025-001", name: "工程建设安全管理培训", target: "工程管理人员", count: "60", days: "3", date: "2025-05-10", host: "工程部", organizer: "石化管理干部学院", place: "总部培训中心", contact: "李军", periods: "2", remark: "年度重点" },
    { id: 2, code: "AZ-2025-002", name: "环境影响评价技术培训", target: "环评技术人员", count: "40", days: "4", date: "2025-06-01", host: "环境评价室", organizer: "环保技术中心", place: "总部会议室", contact: "刘芳", periods: "2", remark: "专项培训" },
    { id: 3, code: "AZ-2025-003", name: "海上平台安全操作培训", target: "海上作业人员", count: "80", days: "5", date: "2025-07-15", host: "海上监督管理室", organizer: "海洋石油培训中心", place: "深圳培训基地", contact: "陈明", periods: "2", remark: "持证上岗" },
    { id: 4, code: "AZ-2025-004", name: "安全检查与隐患排查培训", target: "安全监督人员", count: "50", days: "3", date: "2025-03-20", host: "安全监督管理室", organizer: "石化管理干部学院", place: "总部培训中心", contact: "王强", periods: "2", remark: "年度重点" },
    { id: 5, code: "AZ-2025-005", name: "双重预防机制建设培训", target: "风险管控人员", count: "50", days: "3", date: "2025-03-15", host: "风险隐患管理室", organizer: "石化管理干部学院", place: "总部培训中心", contact: "赵军", periods: "2", remark: "年度重点" }
  ],
  2: [
    { id: 1, code: "AZ-2024-BC-001", name: "安全文化建设培训", target: "全体员工", count: "200", days: "1", date: "2024-11-15", host: "HSE体系管理室", organizer: "石化管理干部学院", place: "总部报告厅", contact: "张明", periods: "4", remark: "待审批" },
    { id: 2, code: "AZ-2024-BC-002", name: "新员工安全入职培训", target: "新入职员工", count: "50", days: "2", date: "2024-12-01", host: "综合管理室", organizer: "石化管理干部学院", place: "总部培训中心", contact: "赵琳", periods: "2", remark: "待审批" }
  ],
  3: [
    { id: 1, code: "AZ-2024-001", name: "HSE管理体系内审员培训", target: "各单位体系管理员", count: "75", days: "4", date: "2024-04-10", host: "HSE体系管理室", organizer: "石化管理干部学院", place: "总部培训中心", contact: "张明", periods: "2", remark: "已完成" },
    { id: 2, code: "AZ-2024-002", name: "双重预防机制建设培训", target: "风险管控人员", count: "48", days: "3", date: "2024-03-20", host: "风险隐患管理室", organizer: "石化管理干部学院", place: "总部培训中心", contact: "赵军", periods: "2", remark: "已完成" }
  ],
  4: [
    { id: 1, code: "AZ-2023-001", name: "工程建设安全管理培训", target: "工程管理人员", count: "50", days: "3", date: "2023-05-10", host: "工程部", organizer: "石化管理干部学院", place: "总部培训中心", contact: "李军", periods: "2", remark: "待补充培训大纲" }
  ]
};

const contactPhones = {
  李军: "13800000001",
  刘芳: "13800000002",
  陈明: "13800000003",
  王强: "13800000004",
  赵军: "13800000005",
  张明: "13800000006",
  赵琳: "13800000007"
};

function statusClass(status) {
  if (status === "已通过" || status === "已关闭") return "done";
  if (status === "已退回") return "reject";
  if (status === "审批中") return "running";
  return "pending";
}

function normalizeProject(row) {
  return {
    ...row,
    place: row.place || "-",
    contact: row.contact || "-",
    phone: row.phone || contactPhones[row.contact] || "-",
    periods: row.periods || "-",
    remark: row.remark || "-"
  };
}

function ActionConfirmModal({ action, row, onClose, onConfirm }) {
  if (!action || !row) return null;
  const isSubmit = action === "submit";
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal hq-report-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div>
            <div className="modal-title">{isSubmit ? "确认提交" : "确认撤回"}</div>
            <div className="modal-desc">{row.name}</div>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">
          <div className="hq-report-confirm-text">
            {isSubmit ? "提交后将进入审批流程，审批中不可继续编辑。是否确认提交？" : "撤回后计划将回到草稿状态，可继续修改填报内容。是否确认撤回？"}
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>取消</button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>{isSubmit ? "确认提交" : "确认撤回"}</button>
        </div>
      </div>
    </div>
  );
}

function ProjectModal({ mode, row, onClose }) {
  if (!mode) return null;
  const isView = mode === "view";
  const title = mode === "add" ? "新增培训项目" : mode === "edit" ? "编辑培训项目" : "培训项目详情";
  const data = row || {};
  const project = normalizeProject(data);

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal cert-modal hq-report-project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd">
          <div className="cert-section">
            <div className="cert-section-title">项目基本信息</div>
            <div className="cert-form-grid hq-report-form-grid">
              {[
                ["项目代码", ""],
                ["项目名称", project.name || ""],
                ["培训对象", project.target || ""],
                ["培训人数", project.count || ""],
                ["培训天数", project.days || ""],
                ["计划日期", project.date || ""],
                ["主办单位", project.host || ""],
                ["承办单位", project.organizer || ""],
                ["办班地点", project.place || ""],
                ["联系人", project.contact || ""],
                ["联系方式", project.phone || ""],
                ["期数", project.periods || ""],
                ["备注", project.remark || ""]
              ].map(([label, value], idx) => (
                <div className="cert-field-item" key={label}>
                  <div className="cert-field-label">{idx > 0 && idx < 12 ? <span className="required-mark">*</span> : null}{label}：</div>
                  <div className="cert-field-value"><input className="cert-field-control" defaultValue={value} readOnly={isView || idx === 0} disabled={idx === 0} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>{isView ? "关闭" : "取消"}</button>
          {!isView ? <button type="button" className="btn btn-primary" onClick={onClose}>保存</button> : null}
        </div>
      </div>
    </div>
  );
}

function ProjectsPanel({ plan, onOpenProject }) {
  const rows = projectRowsByPlan[plan.id] || [];
  const editable = plan.status === "待填报" || plan.status === "草稿" || plan.status === "已退回";
  return (
    <div className="hq-report-child">
      <div className="hq-report-child-title">{plan.name}项目汇总</div>
      {plan.status === "已退回" ? (
        <div className="hq-report-reject"><b>驳回意见：</b>部分项目未按要求填报，请补充完整培训大纲后重新提交。</div>
      ) : null}
      <div className="hq-report-child-toolbar">
        {editable ? (
          <div className="hq-report-toolbar-left">
            <button type="button" className="btn btn-primary" onClick={() => onOpenProject("add", null)}>新增项目</button>
            <button type="button" className="btn">批量导入</button>
            <button type="button" className="btn">下载模板</button>
          </div>
        ) : <div />}
        <div className="hq-report-toolbar-search">
          <input className="filterbar-control" placeholder="搜索项目名称" />
          <select className="filterbar-control" defaultValue=""><option value="">主办单位</option><option>工程部</option><option>HSE体系管理室</option><option>风险隐患管理室</option></select>
          <select className="filterbar-control" defaultValue=""><option value="">承办单位</option><option>石化管理干部学院</option><option>环保技术中心</option></select>
          <input className="filterbar-control" placeholder="计划日期" />
          <button type="button" className="btn">重置</button>
        </div>
      </div>
      <div className="table-wrap hq-report-inner-wrap" data-pager="manual">
        <table className="proto-table hq-report-project-table">
          <thead>
            <tr>
              <th>序号</th><th>项目代码</th><th>项目名称</th><th>培训对象</th><th>人数</th><th>天数</th><th>计划日期</th><th>主办单位</th><th>承办单位</th><th>办班地点</th><th>联系人</th><th>联系方式</th><th>期数</th><th>备注</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const item = normalizeProject(row);
              return (
              <tr key={item.code}>
                <td>{item.id}</td><td className="edu-project-code-empty"></td><td>{item.name}</td><td>{item.target}</td><td>{item.count}</td><td>{item.days}</td><td>{item.date}</td><td>{item.host}</td><td>{item.organizer}</td><td>{item.place}</td><td>{item.contact}</td><td>{item.phone}</td><td>{item.periods}</td><td>{item.remark}</td>
                <td>
                  <div className="hq-report-actions">
                    <button type="button" className="hq-plan-action-btn" onClick={() => onOpenProject(editable ? "edit" : "view", row)}>{editable ? "编辑" : "查看"}</button>
                    {editable ? <button type="button" className="hq-plan-action-btn hq-plan-danger">删除</button> : null}
                  </div>
                </td>
              </tr>
              );
            })}
            {editable ? (
              <tr className="hq-report-quick-row">
                <td>{rows.length + 1}</td><td><input className="filterbar-control" value="" disabled /></td><td><input className="filterbar-control" placeholder="项目名称" /></td><td><input className="filterbar-control" placeholder="培训对象" /></td><td><input className="filterbar-control" placeholder="人数" /></td><td><input className="filterbar-control" placeholder="天数" /></td><td><input className="filterbar-control" /></td><td><input className="filterbar-control" placeholder="主办单位" /></td><td><input className="filterbar-control" placeholder="承办单位" /></td><td><input className="filterbar-control" placeholder="办班地点" /></td><td><input className="filterbar-control" placeholder="联系人" /></td><td><input className="filterbar-control" placeholder="联系方式" /></td><td><input className="filterbar-control" placeholder="期数" /></td><td><input className="filterbar-control" placeholder="备注" /></td><td><button type="button" className="hq-plan-action-btn">快速添加</button></td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Page() {
  const [expandedId, setExpandedId] = React.useState(null);
  const [projectModal, setProjectModal] = React.useState(null);
  const [actionModal, setActionModal] = React.useState(null);
  const [message, setMessage] = React.useState("");

  function confirmAction() {
    if (!actionModal) return;
    const { action } = actionModal;
    setMessage(action === "submit" ? "提交成功，已进入审批流程。" : "撤回成功，可继续修改后重新提交。");
    setActionModal(null);
    window.setTimeout(() => setMessage(""), 2200);
  }

  return (
    <div className="stack hq-report-page">
      {message ? <div className="hq-report-message">{message}</div> : null}
      <div className="filterbar hq-plan-filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">计划名称：</div><div className="filterbar-input"><input className="filterbar-control" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">年度：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>2025</option><option>2024</option><option>2023</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">计划类型：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>年度计划</option><option>政府取证</option><option>临时计划</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">状态：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>待填报</option><option>草稿</option><option>审批中</option><option>已退回</option><option>已通过</option><option>已关闭</option></select></div></div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary">搜索</button>
            <button type="button" className="btn">重置</button>
          </div>
        </div>
      </div>

      <div className="table-wrap hq-report-main-wrap">
        <table className="proto-table hq-report-main-table">
          <thead>
            <tr><th>序号</th><th>培训计划名称</th><th>年度</th><th>计划类别</th><th>填报部门</th><th>填报日期</th><th>填报人</th><th>状态</th><th>操作</th></tr>
          </thead>
          <tbody>
            {planRows.map((row) => (
              <React.Fragment key={row.id}>
                <tr>
                  <td>{row.id}</td><td>{row.name}</td><td>{row.year}</td><td>{row.type}</td><td>{row.dept || "-"}</td><td>{row.date || "-"}</td><td>{row.user || "-"}</td>
                  <td><span className={`hq-report-status ${statusClass(row.status)}`}>{row.status}</span></td>
                  <td>
                    <div className="hq-report-actions">
                      <button type="button" className="hq-plan-action-btn" onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}>{expandedId === row.id ? "收起" : row.action}</button>
                      {row.status === "待填报" || row.status === "草稿" || row.status === "已退回" ? <button type="button" className="hq-plan-action-btn" onClick={() => setActionModal({ action: "submit", row })}>提交计划</button> : null}
                      {row.status === "审批中" ? <button type="button" className="hq-plan-action-btn hq-plan-danger" onClick={() => setActionModal({ action: "withdraw", row })}>撤回提交</button> : null}
                    </div>
                  </td>
                </tr>
                {expandedId === row.id ? (
                  <tr>
                    <td colSpan={9} className="hq-report-child-cell">
                      <ProjectsPanel plan={row} onOpenProject={(mode, project) => setProjectModal({ mode, row: project })} />
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <ProjectModal mode={projectModal?.mode} row={projectModal?.row} onClose={() => setProjectModal(null)} />
      <ActionConfirmModal action={actionModal?.action} row={actionModal?.row} onClose={() => setActionModal(null)} onConfirm={confirmAction} />
    </div>
  );
}
