import React from "react";

const planRows = [
  { id: 1, name: "2025年度中国石化集团安全培训计划", type: "年度计划", year: "2025", createdAt: "2025-01-15", status: "待审批", action: "查看审批详情" },
  { id: 2, name: "2024年度中国石化集团安全培训计划", type: "年度计划", year: "2024", createdAt: "2024-01-10", status: "已通过", action: "查看" }
];

const departments = [
  {
    group: "pending",
    groupName: "待办审批",
    rows: [
      { id: "env", name: "环境保护室", status: "待审批", meta: "2个项目 · 重新提交时间：2025-01-16", tag: "已重新提交", projects: [
        ["AZ-2025-009", "环境保护法规培训", "环保管理人员", "40", "2", "2025-05-15", "环境保护室", "环保技术中心", "已补充培训大纲"],
        ["AZ-2025-010", "污染防治技术培训", "环保技术人员", "30", "3", "2025-06-20", "环境保护室", "环保技术中心", "已补充考核标准"]
      ] },
      { id: "eng", name: "工程部", status: "待审批", meta: "3个项目 · 提交时间：2025-01-14", projects: [
        ["AZ-2025-001", "工程建设安全管理培训", "工程管理人员", "60", "3", "2025-05-10", "工程部", "石化管理干部学院", "年度重点"],
        ["AZ-2025-002", "施工安全规范培训", "施工人员", "80", "2", "2025-04-20", "工程部", "石化管理干部学院", ""],
        ["AZ-2025-003", "设备安装安全培训", "设备安装人员", "50", "3", "2025-06-01", "工程部", "石化管理干部学院", ""]
      ] },
      { id: "eval", name: "环境评价室", status: "待审批", meta: "2个项目 · 提交时间：2025-01-14", projects: [
        ["AZ-2025-011", "环境影响评价技术培训", "环评技术人员", "40", "4", "2025-06-01", "环境评价室", "环保技术中心", "专项培训"]
      ] },
      { id: "marine", name: "海上监督管理室", status: "待审批", meta: "2个项目 · 提交时间：2025-01-14", projects: [
        ["AZ-2025-003", "海上平台安全操作培训", "海上作业人员", "80", "5", "2025-07-15", "海上监督管理室", "海洋石油培训中心", "持证上岗"]
      ] },
      { id: "safety", name: "安全监督管理室", status: "待审批", meta: "2个项目 · 提交时间：2025-01-15", projects: [
        ["AZ-2025-004", "安全检查与隐患排查培训", "安全监督人员", "50", "3", "2025-03-20", "安全监督管理室", "石化管理干部学院", "年度重点"]
      ] },
      { id: "public", name: "公共安全室", status: "待审批", meta: "2个项目 · 提交时间：2025-01-15", projects: [
        ["AZ-2025-012", "公共安全管理培训", "公共安全人员", "35", "2", "2025-08-10", "公共安全室", "石化管理干部学院", ""]
      ] },
      { id: "health", name: "健康管理室", status: "待审批", meta: "1个项目 · 提交时间：2025-01-15", projects: [
        ["AZ-2025-013", "职业健康培训", "职业卫生人员", "35", "2", "2025-07-01", "健康管理室", "职业卫生中心", "已完成"]
      ] }
    ]
  },
  {
    group: "approved",
    groupName: "已办审批",
    rows: [
      { id: "emerg", name: "应急管理室", status: "已通过", meta: "3个项目 · 通过时间：2025-01-13", projects: [
        ["AZ-2025-005", "应急预案编制培训", "应急管理人员", "50", "3", "2025-04-01", "应急管理室", "石化管理干部学院", "年度重点"],
        ["AZ-2025-006", "应急演练组织培训", "应急骨干", "30", "2", "2025-05-15", "应急管理室", "石化管理干部学院", ""],
        ["AZ-2025-007", "应急指挥系统培训", "指挥人员", "20", "2", "2025-06-01", "应急管理室", "石化管理干部学院", "专项培训"]
      ] },
      { id: "hse", name: "HSE体系管理室", status: "已通过", meta: "2个项目 · 通过时间：2025-01-12", projects: [
        ["AZ-2025-008", "HSE体系内审员培训", "体系管理人员", "40", "4", "2025-03-01", "HSE体系管理室", "石化管理干部学院", "年度重点"]
      ] }
    ]
  },
  {
    group: "rejected",
    groupName: "退回记录",
    rows: [
      { id: "equip", name: "设备管理室", status: "已退回", meta: "2个项目 · 退回时间：2025-01-14", rejectText: "培训计划与年度重点工作计划不符，请重新梳理后提交。", projects: [
        ["AZ-2025-014", "设备维护保养培训", "设备维修人员", "60", "3", "2025-02-01", "设备管理室", "设备技术中心", "需重新评估"]
      ] }
    ]
  }
];

const deptContacts = {
  环境保护室: ["赵敏", "13800000004", "上海"],
  工程部: ["张强", "13800000001", "北京"],
  环境评价室: ["刘芳", "13800000002", "总部会议室"],
  海上监督管理室: ["陈明", "13800000003", "深圳培训基地"],
  安全监督管理室: ["王强", "13800000004", "总部培训中心"],
  公共安全室: ["周楠", "13800000005", "总部培训中心"],
  健康管理室: ["吴静", "13800000006", "总部会议室"],
  应急管理室: ["孙磊", "13800000007", "武汉"],
  HSE体系管理室: ["张明", "13800000008", "总部培训中心"],
  设备管理室: ["李军", "13800000009", "总部培训中心"]
};

function planStatusClass(status) {
  if (status === "已通过") return "done";
  if (status === "待审批" || status === "审批中") return "running";
  return "pending";
}

function getApprovalSections(row) {
  if (row.status !== "已通过") return departments;
  return departments
    .flatMap((section) => section.rows)
    .filter((dept) => dept.projects?.length)
    .flatMap((dept, deptIndex) => dept.projects.map((project, projectIndex) => ({
      ...(() => {
        const fallback = deptContacts[dept.name] || ["-", "-", "-"];
        return {
          place: project.length > 9 ? project[8] : fallback[2],
          contact: project.length > 9 ? project[9] : fallback[0],
          phone: project.length > 9 ? project[10] : fallback[1],
          periods: project.length > 9 ? project[11] : "1"
        };
      })(),
      id: `${dept.id}-${projectIndex}`,
      code: project[0],
      name: project[1],
      target: project[2],
      count: project[3],
      days: project[4],
      date: project[5],
      dept: dept.name,
      organizer: project[7],
      approvedAt: `2024-01-${String(12 + deptIndex).padStart(2, "0")}`,
      remark: (project.length > 9 ? project[12] : project[8]) || "-"
    })));
}

function normalizeProject(project, fallbackDept = "") {
  if (!Array.isArray(project)) return project || {};
  const hasFullFields = project.length > 9;
  const fallback = deptContacts[project[6] || fallbackDept] || ["-", "-", "-"];
  return {
    code: project[0],
    name: project[1],
    target: project[2],
    count: project[3],
    days: project[4],
    date: project[5],
    dept: project[6] || fallbackDept,
    organizer: project[7],
    place: hasFullFields ? project[8] : fallback[2],
    contact: hasFullFields ? project[9] : fallback[0],
    phone: hasFullFields ? project[10] : fallback[1],
    periods: hasFullFields ? project[11] : "1",
    remark: (hasFullFields ? project[12] : project[8]) || "-"
  };
}

function Modal({ type, row, dept, onClose, onConfirm }) {
  if (!type) return null;
  const isPlan = type === "view";
  const isApprove = type === "approve";
  const title = isApprove ? "审批通过确认" : type === "reject" ? "退回确认" : "查看培训计划";

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal hq-approval-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div>
            <div className="modal-title">{title}</div>
            {row?.name ? <div className="modal-desc">{row.name}</div> : null}
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">
          {isPlan ? (
            <div className="cert-form-grid hq-approval-form-grid">
              <label className="cert-field-item"><span className="cert-field-label">计划名称：</span><span className="cert-field-value"><input className="cert-field-control" defaultValue={row?.name || ""} readOnly={type === "view"} /></span></label>
              <label className="cert-field-item"><span className="cert-field-label">计划类别：</span><span className="cert-field-value"><select className="cert-field-control" defaultValue={row?.type || "年度计划"} disabled={type === "view"}><option>年度计划</option><option>政府取证</option><option>临时计划</option></select></span></label>
              <label className="cert-field-item"><span className="cert-field-label">年度：</span><span className="cert-field-value"><select className="cert-field-control" defaultValue={row?.year || "2025"} disabled={type === "view"}><option>2025</option><option>2024</option><option>2023</option></select></span></label>
            </div>
          ) : null}
          {isApprove || type === "reject" ? (
            <>
              <label className="cert-field-item hq-approval-full-field"><span className="cert-field-label">{isApprove ? "审批对象" : "退回对象"}：</span><span className="cert-field-value"><input className="cert-field-control" value={dept?.name || ""} readOnly disabled /></span></label>
              <label className="cert-field-item hq-approval-full-field"><span className="cert-field-label">{isApprove ? "审批意见：" : "退回意见："}{!isApprove ? <span className="required-mark">*</span> : null}</span><span className="cert-field-value"><textarea className="hq-approval-textarea" placeholder={isApprove ? "请输入审批意见（选填）" : "请输入退回意见"} /></span></label>
            </>
          ) : null}
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>取消</button>
          {type !== "view" ? <button type="button" className="btn btn-primary" onClick={onConfirm}>{isApprove ? "确认通过" : "确认退回"}</button> : null}
        </div>
      </div>
    </div>
  );
}

function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;
  const fields = [
    ["项目代码", ""],
    ["项目名称", project.name],
    ["上报部门", project.dept],
    ["培训对象", project.target],
    ["培训人数", project.count],
    ["培训天数", project.days],
    ["计划日期", project.date],
    ["主办单位", project.dept],
    ["承办单位", project.organizer],
    ["办班地点", project.place],
    ["联系人", project.contact],
    ["联系方式", project.phone],
    ["期数", project.periods],
    ["通过时间", project.approvedAt || "-"],
    ["备注", project.remark]
  ];
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal hq-approval-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div>
            <div className="modal-title">项目详情</div>
            <div className="modal-desc">{project.name}</div>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">
          <div className="cert-form-grid hq-approval-form-grid">
            {fields.map(([label, value]) => (
              <div className="cert-field-item" key={label}>
                <div className="cert-field-label">{label}：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={value || "-"} readOnly disabled /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-ft"><button type="button" className="btn" onClick={onClose}>关闭</button></div>
      </div>
    </div>
  );
}

function DeptProjects({ rows = [], deptName = "", onViewProject }) {
  if (!rows.length) return null;
  return (
    <table className="hq-approval-project-table">
      <thead><tr><th>序号</th><th>项目代码</th><th>项目名称</th><th>培训对象</th><th>人数</th><th>天数</th><th>计划日期</th><th>主办单位</th><th>承办单位</th><th>办班地点</th><th>联系人</th><th>联系方式</th><th>期数</th><th>备注</th><th>操作</th></tr></thead>
      <tbody>
        {rows.map((item, index) => {
          const project = normalizeProject(item, deptName);
          return (
            <tr key={`${project.code}-${project.name}`}>
              <td>{index + 1}</td><td className="edu-project-code-empty"></td><td>{project.name}</td><td>{project.target}</td><td>{project.count}</td><td>{project.days}</td><td>{project.date}</td><td>{project.dept}</td><td>{project.organizer}</td><td>{project.place}</td><td>{project.contact}</td><td>{project.phone}</td><td>{project.periods}</td><td>{project.remark}</td>
              <td><button type="button" className="hq-plan-action-btn" onClick={() => onViewProject(project)}>查看详情</button></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function ApprovedProjectSummary({ rows = [], onViewProject }) {
  return (
    <table className="hq-approval-approved-table">
      <thead><tr><th>序号</th><th>项目代码</th><th>项目名称</th><th>上报部门</th><th>培训对象</th><th>人数</th><th>天数</th><th>计划日期</th><th>承办单位</th><th>办班地点</th><th>联系人</th><th>联系方式</th><th>期数</th><th>通过时间</th><th>备注</th><th>操作</th></tr></thead>
      <tbody>
        {rows.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td><td className="edu-project-code-empty"></td><td>{item.name}</td><td>{item.dept}</td><td>{item.target}</td><td>{item.count}</td><td>{item.days}</td><td>{item.date}</td><td>{item.organizer}</td><td>{item.place}</td><td>{item.contact}</td><td>{item.phone}</td><td>{item.periods}</td><td>{item.approvedAt}</td><td>{item.remark}</td><td><button type="button" className="hq-plan-action-btn" onClick={() => onViewProject(item)}>查看详情</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Page() {
  const [expandedPlan, setExpandedPlan] = React.useState(1);
  const [openGroups, setOpenGroups] = React.useState({ pending: true, approved: false, rejected: false });
  const [openDept, setOpenDept] = React.useState("env");
  const [modal, setModal] = React.useState(null);
  const [projectModal, setProjectModal] = React.useState(null);
  const [message, setMessage] = React.useState("");

  function showMessage(text) {
    setMessage(text);
    setModal(null);
    window.setTimeout(() => setMessage(""), 2200);
  }

  function togglePlan(row) {
    setExpandedPlan(expandedPlan === row.id ? null : row.id);
    if (row.status === "已通过") {
      setOpenDept("");
    } else if (row.status === "待审批" || row.status === "审批中") {
      setOpenGroups({ pending: true, approved: false, rejected: false });
      setOpenDept("env");
    }
  }

  return (
    <div className="stack hq-approval-page">
      {message ? <div className="hq-report-message">{message}</div> : null}
      <div className="filterbar hq-plan-filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">计划名称：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入计划名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">计划类别：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue=""><option value="">全部</option><option>年度计划</option><option>政府取证</option><option>临时计划</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">年度：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue=""><option value="">全部</option><option>2025</option><option>2024</option><option>2023</option></select></div></div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary">搜索</button>
            <button type="button" className="btn">重置</button>
          </div>
        </div>
      </div>

      <div className="table-wrap hq-approval-main-wrap">
        <table className="proto-table hq-approval-main-table">
          <thead><tr><th>序号</th><th>培训计划名称</th><th>计划类别</th><th>年度</th><th>创建时间</th><th>状态</th><th>操作</th></tr></thead>
          <tbody>
            {planRows.map((row) => {
              const canExpand = row.status === "待审批" || row.status === "审批中" || row.status === "已通过";
              const approvalSections = getApprovalSections(row);
              return (
              <React.Fragment key={row.id}>
                <tr>
                  <td>{row.id}</td><td>{row.name}</td><td>{row.type}</td><td>{row.year}</td><td>{row.createdAt}</td><td><span className={`hq-report-status ${planStatusClass(row.status)}`}>{row.status}</span></td>
                  <td>
                    <div className="hq-report-actions">
                      <button type="button" className="hq-plan-action-btn" onClick={() => setModal({ type: "view", row })}>查看详情</button>
                      {canExpand ? <button type="button" className="hq-plan-action-btn" onClick={() => togglePlan(row)}>{expandedPlan === row.id ? "收起明细" : row.status === "已通过" ? "查看通过项目" : "查看审批详情"}</button> : null}
                    </div>
                  </td>
                </tr>
                {expandedPlan === row.id ? (
                  <tr><td colSpan={7} className="hq-report-child-cell">
                    <div className="hq-approval-child">
                      <div className="hq-approval-child-title">{row.name} - {row.status === "已通过" ? "通过项目汇总" : "审批状态"}</div>
                      {row.status === "已通过" ? (
                        <ApprovedProjectSummary rows={approvalSections} onViewProject={setProjectModal} />
                      ) : approvalSections.map((section) => (
                        <div className="hq-approval-section" key={section.group}>
                          <button type="button" className={`hq-approval-section-head ${section.group}`} onClick={() => setOpenGroups((prev) => ({ ...prev, [section.group]: !prev[section.group] }))}>
                            <span>{section.groupName}</span><strong>{section.rows.length}个部门</strong><i>{openGroups[section.group] ? "▲" : "▼"}</i>
                          </button>
                          {openGroups[section.group] ? (
                            <div className="hq-approval-dept-list">
                              {section.rows.map((dept) => (
                                <div className={`hq-approval-dept-card ${section.group}`} key={dept.id}>
                                  <div className="hq-approval-dept-head">
                                    <div className="hq-approval-dept-info">
                                      <strong>{dept.name}</strong><span className={`hq-approval-dept-status ${section.group}`}>{dept.status}</span>{dept.meta ? <span>{dept.meta}</span> : null}{dept.tag ? <em>{dept.tag}</em> : null}
                                    </div>
                                    <div className="hq-report-actions">
                                      {dept.projects?.length ? <button type="button" className="hq-plan-action-btn" onClick={() => setOpenDept(openDept === dept.id ? "" : dept.id)}>{openDept === dept.id ? "收起" : "查看详情"}</button> : null}
                                      {(row.status === "待审批" || row.status === "审批中") && (section.group === "pending" || section.group === "rejected") ? <button type="button" className="hq-plan-action-btn" onClick={() => setModal({ type: "approve", dept })}>通过</button> : null}
                                      {(row.status === "待审批" || row.status === "审批中") && section.group === "pending" ? <button type="button" className="hq-plan-action-btn hq-plan-danger" onClick={() => setModal({ type: "reject", dept })}>退回</button> : null}
                                    </div>
                                  </div>
                                  {openDept === dept.id ? <DeptProjects rows={dept.projects} deptName={dept.name} onViewProject={setProjectModal} /> : null}
                                  {dept.rejectText ? <div className="hq-approval-reject"><b>退回意见：</b>{dept.rejectText}</div> : null}
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </td></tr>
                ) : null}
              </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal type={modal?.type} row={modal?.row} dept={modal?.dept} onClose={() => setModal(null)} onConfirm={() => showMessage(modal?.type === "approve" ? `${modal?.dept?.name || ""} 审批通过。` : `${modal?.dept?.name || ""} 已退回。`)} />
      <ProjectDetailModal project={projectModal} onClose={() => setProjectModal(null)} />
    </div>
  );
}
