import React from "react";

const departments = [
  "工程部",
  "环境评价室",
  "海上监督管理室",
  "综合管理室",
  "安全监督管理室",
  "公共安全室",
  "健康管理室",
  "应急管理室",
  "HSE体系管理室",
  "风险隐患管理室",
  "节能节水室",
  "环境保护室",
  "绿色低碳室",
  "油田事业部-安环处",
  "炼油事业部-安环处",
  "化工事业部-安环处",
  "石油工程公司-安环处",
  "油品销售事业部-安环处",
  "炼化工程公司-安环处",
  "科技部-安环处"
];

const planRows = [
  { id: 1, name: "2025年度HSE全员培训计划征集", type: "年度计划", year: "2025", createdAt: "2025-01-10", status: "待审批", sendScope: "20个部门", sentAt: "2025-01-12", reportStatus: "已提交 12/20", sendDepts: departments },
  { id: 2, name: "安全管理人员取证计划", type: "政府取证", year: "2025", createdAt: "2025-02-15", status: "草稿", sendScope: "-", sentAt: "-", reportStatus: "-", sendDepts: [] },
  { id: 3, name: "2025年度承包商安全专项培训计划征集", type: "临时计划", year: "2025", createdAt: "2025-03-01", status: "征集中", sendScope: "8个部门", sentAt: "2025-03-03", reportStatus: "已提交 0/8", sendDepts: departments.slice(0, 8) },
  { id: 4, name: "2024年度中国石化集团安全培训计划", type: "年度计划", year: "2024", createdAt: "2024-01-10", status: "全部通过", sendScope: "20个部门", sentAt: "2024-01-12", reportStatus: "已通过 20/20", sendDepts: departments },
  { id: 5, name: "2023年度总部HSE重点岗位培训计划征集", type: "年度计划", year: "2023", createdAt: "2023-01-08", status: "已结束", sendScope: "20个部门", sentAt: "2023-01-10", reportStatus: "已通过 20/20", sendDepts: departments }
];

const reportRows = [
  { dept: "工程部", fillStatus: "已提交", approvalStatus: "待审批", currentNode: "培训计划审批", currentHandler: "吴明", time: "2025-01-14", count: "3", projects: [
    ["AZ-2025-001", "工程建设安全管理培训", "工程管理人员", "60", "3", "2025-05-10", "北京", "张强 13800000001", "1", "石化管理干部学院", "年度重点"],
    ["AZ-2025-002", "施工安全规范培训", "施工人员", "80", "2", "2025-04-20", "南京", "李明 13800000002", "2", "石化管理干部学院", ""],
    ["AZ-2025-003", "设备安装安全培训", "设备安装人员", "50", "3", "2025-06-01", "青岛", "王芳 13800000003", "1", "石化管理干部学院", ""]
  ] },
  { dept: "环境保护室", fillStatus: "已提交", approvalStatus: "已退回", currentNode: "退回修改", currentHandler: "赵敏", time: "2025-01-16", count: "2", projects: [
    ["AZ-2025-009", "环境保护法规培训", "环保管理人员", "40", "2", "2025-05-15", "上海", "赵敏 13800000004", "1", "环保技术中心", "已补充培训大纲"],
    ["AZ-2025-010", "污染防治技术培训", "环保技术人员", "30", "3", "2025-06-20", "杭州", "陈伟 13800000005", "1", "环保技术中心", "已补充考核标准"]
  ] },
  { dept: "应急管理室", fillStatus: "已提交", approvalStatus: "已通过", currentNode: "流程结束", currentHandler: "-", time: "2025-01-13", count: "3", projects: [
    ["AZ-2025-005", "应急预案编制培训", "应急管理人员", "50", "3", "2025-04-01", "武汉", "孙磊 13800000006", "1", "石化管理干部学院", "年度重点"],
    ["AZ-2025-006", "应急演练组织培训", "应急骨干", "30", "2", "2025-05-15", "成都", "周楠 13800000007", "2", "石化管理干部学院", ""],
    ["AZ-2025-007", "应急指挥系统培训", "指挥人员", "20", "2", "2025-06-01", "西安", "吴静 13800000008", "1", "石化管理干部学院", "专项培训"]
  ] },
  { dept: "风险隐患管理室", fillStatus: "未填报", approvalStatus: "未提交", currentNode: "-", currentHandler: "-", time: "-", count: "-", projects: [] },
  { dept: "节能节水室", fillStatus: "草稿", approvalStatus: "未提交", currentNode: "填报人保存", currentHandler: "李明", time: "-", count: "-", projects: [] }
];

const allReportedReportRows = departments.map((dept, idx) => ({
  dept,
  fillStatus: "已提交",
  approvalStatus: "已通过",
  currentNode: "流程结束",
  currentHandler: "-",
  time: `2025-01-${String(13 + (idx % 6)).padStart(2, "0")}`,
  count: String((idx % 3) + 1),
  projects: Array.from({ length: (idx % 3) + 1 }).map((_, projectIdx) => [
      `AZ-2025-${String(idx + 21).padStart(3, "0")}-${projectIdx + 1}`,
      `${dept.replace(/-安环处$/, "")}专项安全培训${projectIdx + 1}`,
      projectIdx % 2 === 0 ? "安全管理人员" : "专业技术人员",
      String(30 + idx * 3 + projectIdx * 8),
      String((projectIdx % 3) + 1),
      `2025-${String(4 + ((idx + projectIdx) % 5)).padStart(2, "0")}-${String(8 + ((idx + projectIdx) % 12)).padStart(2, "0")}`,
      ["北京", "上海", "南京", "武汉", "成都"][idx % 5],
      `${["张强", "李明", "赵敏", "陈伟", "孙磊"][idx % 5]} 138000000${String((idx % 9) + 1).padStart(2, "0")}`,
      String(projectIdx + 1),
      idx % 2 === 0 ? "石化管理干部学院" : "HSE培训中心",
      idx < 4 ? "年度重点" : ""
    ])
}));

function getReportRows(row) {
  if (row?.status === "征集中") {
    return row.sendDepts.slice(0, 8).map((dept, idx) => ({
      dept,
      fillStatus: idx < 2 ? "草稿" : "未填报",
      approvalStatus: "未提交",
      currentNode: idx < 2 ? "填报人保存" : "-",
      currentHandler: idx < 2 ? ["张强", "李明"][idx] : "-",
      time: "-",
      count: "-",
      projects: []
    }));
  }
  if (row?.status === "全部通过" || row?.status === "已结束") {
    return allReportedReportRows;
  }
  return reportRows;
}

function getReportSummary(row) {
  const rows = getReportRows(row);
  const submitted = rows.filter((item) => item.fillStatus === "已提交").length;
  const approved = rows.filter((item) => item.approvalStatus === "已通过").length;
  const pending = rows.filter((item) => item.approvalStatus === "待审批" || item.approvalStatus === "审批中").length;
  const rejected = rows.filter((item) => item.approvalStatus === "已退回").length;
  const projectCount = rows.reduce((sum, item) => sum + (item.projects || []).length, 0);
  return { submitted: `${submitted}个部室`, approved: `${approved}个部室`, pending: `${pending}个部室`, rejected: `${rejected}个部室`, projectCount: `${projectCount}项` };
}

function lifecycleStatusClass(status) {
  if (status === "全部通过" || status === "已结束") return "done";
  if (status === "草稿") return "draft";
  if (status === "部分退回") return "reject";
  if (status === "待审批") return "running";
  return "pending";
}

function canExportCollection(row) {
  if (!row) return false;
  if (row.status === "全部通过" || row.status === "已结束") return true;
  const match = String(row.reportStatus || "").match(/已通过\s*(\d+)\s*\/\s*(\d+)/);
  return !!match && Number(match[1]) > 0 && Number(match[1]) === Number(match[2]);
}

function canCloseCollection(row) {
  return row?.status === "全部通过";
}

function normalizeReportProject(project, deptName) {
  const contactText = project[7] || "-";
  const contactParts = contactText === "-" ? [] : String(contactText).trim().split(/\s+/);
  const phone = contactParts.length > 1 ? contactParts.pop() : "-";
  const contact = contactParts.length ? contactParts.join(" ") : contactText;

  return {
    code: project[0] || "-",
    name: project[1] || "-",
    target: project[2] || "-",
    count: project[3] || "-",
    days: project[4] || "-",
    date: project[5] || "-",
    host: deptName || "-",
    location: project[6] || "-",
    contact,
    phone,
    periods: project[8] || "-",
    organizer: project[9] || "-",
    remark: project[10] || "-"
  };
}

function getReportSections(row) {
  const rows = getReportRows(row);
  return [
    { key: "pending", title: "待审批", rows: rows.filter((item) => item.approvalStatus === "待审批" || item.approvalStatus === "审批中") },
    { key: "approved", title: "已通过", rows: rows.filter((item) => item.approvalStatus === "已通过") },
    { key: "rejected", title: "已退回", rows: rows.filter((item) => item.approvalStatus === "已退回") },
    { key: "waiting", title: "未提交", rows: rows.filter((item) => item.approvalStatus === "未提交") }
  ].filter((section) => section.rows.length);
}

function DepartmentPicker({ readOnly = false, selected = [] }) {
  const initialSelected = React.useMemo(() => {
    if (selected.length) return selected;
    return departments.slice(0, 4);
  }, [selected]);
  const [checkedItems, setCheckedItems] = React.useState(initialSelected);
  const allRef = React.useRef(null);
  const checkedSet = new Set(checkedItems);
  const allChecked = checkedItems.length === departments.length;
  const partialChecked = checkedItems.length > 0 && !allChecked;

  React.useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = partialChecked;
  }, [partialChecked]);

  const toggleAll = (checked) => {
    setCheckedItems(checked ? departments : []);
  };

  const toggleOne = (dept, checked) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (checked) next.add(dept);
      else next.delete(dept);
      return departments.filter((item) => next.has(item));
    });
  };

  return (
    <div className="hq-plan-dept-picker">
      {!readOnly ? (
        <label className="hq-plan-dept-select-all">
          <input
            ref={allRef}
            type="checkbox"
            checked={allChecked}
            onChange={(e) => toggleAll(e.target.checked)}
          />
          <span>全选</span>
          <em>已选 {checkedItems.length} / {departments.length}</em>
        </label>
      ) : null}
      <div className={`hq-plan-dept-box${readOnly ? " readonly" : ""}`}>
        {departments.map((dept) => (
            <label className="hq-plan-dept-item" key={dept}>
              <input
                type="checkbox"
                checked={checkedSet.has(dept)}
                disabled={readOnly}
                onChange={(e) => toggleOne(dept, e.target.checked)}
              />
              <span>{dept}</span>
            </label>
          ))}
      </div>
    </div>
  );
}

function PlanModal({ mode, row, onClose }) {
  if (!mode) return null;
  const isView = mode === "view";
  const titleMap = {
    add: "新增培训计划征集",
    edit: "编辑培训计划征集",
    view: "查看培训计划征集"
  };
  const isAdd = mode === "add";

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal cert-modal hq-plan-dist-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{titleMap[mode]}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd">
          <div className="cert-section">
            <div className="cert-section-title">征集基本信息</div>
            <div className="cert-form-grid hq-plan-dist-form">
              <div className="cert-field-item">
                <div className="cert-field-label">征集状态：</div>
                <div className="cert-field-value">
                  <input className="cert-field-control" value={row?.status || "保存后为草稿"} readOnly />
                </div>
              </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>征集名称：</div>
                <div className="cert-field-value">
                  <input className="cert-field-control" defaultValue={row?.name || ""} placeholder="请输入计划名称" readOnly={isView} />
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>征集类别：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" defaultValue={row?.type || "年度计划"} disabled={isView}>
                    <option>年度计划</option>
                    <option>政府取证</option>
                    <option>临时计划</option>
                  </select>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>年度：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" defaultValue={row?.year || "2025"} disabled={isView}>
                    <option>2025</option>
                    <option>2024</option>
                    <option>2023</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="cert-section">
            <div className="cert-section-title">{isView ? "征集部门" : "征集范围"}</div>
            <div className="cert-form-grid hq-plan-dist-form">
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label">{isView ? "已征集部门：" : "选择征集部门："}</div>
                <div className="cert-field-value">
                  {isView ? (
                    <div className="hq-plan-dept-tags">
                      {(row?.sendDepts || []).map((dept) => <span key={dept}>{dept}</span>)}
                    </div>
                  ) : (
                    <DepartmentPicker selected={row?.sendDepts || []} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>{isView ? "关闭" : "取消"}</button>
          {isView ? null : <button type="button" className="btn btn-primary" onClick={onClose}>保存</button>}
          {!isView ? <button type="button" className="btn btn-primary" onClick={onClose}>{isAdd ? "保存并发起征集" : "保存并继续征集"}</button> : null}
        </div>
      </div>
    </div>
  );
}

function SendModal({ row, onClose }) {
  if (!row) return null;

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal cert-modal hq-plan-send-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div>
            <div className="modal-title">发起培训计划征集</div>
            <div className="modal-desc">可多选参与部室，确认后生成部室填报待办。</div>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd">
          <div className="hq-plan-send-tip">
            当前征集保存为“草稿”状态，确认发起后将生成所选部室的填报待办。
          </div>
          <div className="cert-section">
            <div className="cert-section-title">征集信息</div>
            <div className="cert-form-grid hq-plan-dist-form">
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label">当前征集：</div>
                <div className="cert-field-value">
                  <input className="cert-field-control" value={row.name} readOnly />
                </div>
              </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>选择征集部室：</div>
                <div className="cert-field-value">
                  <DepartmentPicker selected={row.sendDepts || []} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>取消</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>确认发起</button>
        </div>
      </div>
    </div>
  );
}

function ReportResultPanel({ row, openGroups, onToggleGroup, openDeptId, onToggleDept, onExport, onCloseCollection }) {
  if (!row) return null;
  const sections = getReportSections(row);
  const summary = getReportSummary(row);
  const exportEnabled = canExportCollection(row);
  return (
    <div className="hq-plan-report-panel">
      <div className="hq-plan-report-title-row">
        <div className="hq-plan-report-title">{row.name} - 征集结果</div>
        <div className="hq-report-actions">
          <button type="button" className="btn btn-primary" disabled={!exportEnabled} onClick={onExport}>导出</button>
          {canCloseCollection(row) ? <button type="button" className="btn" onClick={onCloseCollection}>关闭征集</button> : null}
        </div>
      </div>
      {!exportEnabled ? <div className="hq-plan-export-tip">所有部室审批通过后可导出汇总表。</div> : null}
      <div className="hq-plan-report-summary">
        <span>征集范围：{row.sendScope}</span>
        <span>已提交：{summary.submitted}</span>
        <span>待审批：{summary.pending}</span>
        <span>已通过：{summary.approved}</span>
        <span>已退回：{summary.rejected}</span>
        <span>项目合计：{summary.projectCount}</span>
      </div>
      <div className="hq-plan-report-sections">
        {sections.map((section) => (
          <div className="hq-plan-report-section" key={section.key}>
            <button type="button" className={`hq-plan-report-section-head ${section.key}`} onClick={() => onToggleGroup(section.key)}>
              <span>{section.title}</span>
              <strong>{section.rows.length}个部门</strong>
              <i>{openGroups[section.key] ? "▲" : "▼"}</i>
            </button>
            {openGroups[section.key] ? (
              <div className="hq-plan-report-dept-list">
                {section.rows.map((dept) => {
                  const deptId = `${section.key}-${dept.dept}`;
                  return (
                    <div className={`hq-plan-report-dept-card ${section.key}`} key={dept.dept}>
                      <div className="hq-plan-report-dept-head">
                        <div className="hq-plan-report-dept-info">
                          <strong>{dept.dept}</strong>
                          <span>填报状态：{dept.fillStatus}</span>
                          <span className={`hq-plan-status ${dept.approvalStatus === "已通过" ? "done" : dept.approvalStatus === "已退回" ? "reject" : "pending"}`}>审批状态：{dept.approvalStatus}</span>
                          {dept.currentNode !== "-" ? <span>当前环节：{dept.currentNode}</span> : null}
                          {dept.currentHandler !== "-" ? <span>当前处理人：{dept.currentHandler}</span> : null}
                          {dept.time !== "-" ? <span>提交时间：{dept.time}</span> : null}
                          {dept.count !== "-" ? <span>{dept.count}个项目</span> : null}
                        </div>
                        {dept.projects.length ? (
                          <div className="hq-plan-report-dept-actions">
                            <button type="button" className="hq-plan-action-btn" onClick={() => onToggleDept(deptId)}>{openDeptId === deptId ? "收起" : "查看详情"}</button>
                          </div>
                        ) : null}
                      </div>
                      {openDeptId === deptId ? (
                        <div className="hq-plan-report-project-list">
                          <div className="hq-plan-report-project-head">
                            <span>序号</span><span>项目名称</span><span>培训对象</span><span>人数</span><span>天数</span><span>计划日期</span><span>主办单位</span><span>承办单位</span><span>办班地点</span><span>联系人</span><span>联系方式</span><span>期数</span><span>备注</span>
                          </div>
                          {dept.projects.map((project, projectIdx) => {
                            const item = normalizeReportProject(project, dept.dept);
                            return (
                              <div className="hq-plan-report-project-row" key={`${dept.dept}-${item.code}`}>
                                <span>{projectIdx + 1}</span>
                                <span>{item.name}</span>
                                <span>{item.target}</span>
                                <span>{item.count}</span>
                                <span>{item.days}</span>
                                <span>{item.date}</span>
                                <span>{item.host}</span>
                                <span>{item.organizer}</span>
                                <span>{item.location}</span>
                                <span>{item.contact}</span>
                                <span>{item.phone}</span>
                                <span>{item.periods}</span>
                                <span>{item.remark}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [collectionRows, setCollectionRows] = React.useState(planRows);
  const [planModal, setPlanModal] = React.useState(null);
  const [sendRow, setSendRow] = React.useState(null);
  const [exportMessage, setExportMessage] = React.useState("");
  const [expandedReportId, setExpandedReportId] = React.useState(null);
  const [openReportGroups, setOpenReportGroups] = React.useState({ pending: true, approved: false, rejected: false, waiting: false });
  const [openReportDept, setOpenReportDept] = React.useState("");
  const activeRow = planModal?.row || null;

  function toggleReport(row) {
    const willOpen = expandedReportId !== row.id;
    setExpandedReportId(willOpen ? row.id : null);
    setOpenReportGroups({ pending: true, approved: row.status === "全部通过" || row.status === "已结束", rejected: false, waiting: row.status === "征集中" });
    const firstDept = getReportRows(row).find((item) => item.projects.length);
    const firstKey = firstDept?.approvalStatus === "已通过" ? "approved" : firstDept?.approvalStatus === "已退回" ? "rejected" : firstDept?.approvalStatus === "未提交" ? "waiting" : "pending";
    setOpenReportDept(firstDept ? `${firstKey}-${firstDept.dept}` : "");
  }

  function handleExport(row) {
    setExportMessage(`${row.name} 汇总表已导出`);
    window.setTimeout(() => setExportMessage(""), 2200);
  }

  function handleCloseCollection(row) {
    setCollectionRows((prev) => prev.map((item) => (item.id === row.id ? { ...item, status: "已结束" } : item)));
    setExportMessage(`${row.name} 已关闭，后续仅可查看和导出。`);
    window.setTimeout(() => setExportMessage(""), 2200);
  }

  return (
    <div className="stack hq-plan-dist-page">
      {exportMessage ? <div className="hq-report-message">{exportMessage}</div> : null}
      <div className="filterbar hq-plan-filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item">
              <div className="filterbar-label">征集名称：</div>
              <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入征集名称" /></div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">征集类别：</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="">
                  <option value="">全部</option>
                  <option>年度计划</option>
                  <option>政府取证</option>
                  <option>临时计划</option>
                </select>
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">年度：</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="">
                  <option value="">全部</option>
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">状态：</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="">
                  <option value="">全部</option>
                  <option>草稿</option>
                  <option>征集中</option>
                  <option>待审批</option>
                  <option>部分退回</option>
                  <option>全部通过</option>
                  <option>已结束</option>
                </select>
              </div>
            </div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary" onClick={() => setPlanModal({ mode: "add", row: null })}>新增</button>
            <button type="button" className="btn btn-primary">搜索</button>
            <button type="button" className="btn">重置</button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="proto-table hq-plan-dist-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>征集名称</th>
              <th>征集类别</th>
              <th>年度</th>
              <th>创建时间</th>
              <th>状态</th>
              <th>征集范围</th>
              <th>发起时间</th>
              <th>上报情况</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {collectionRows.map((row) => (
              <React.Fragment key={row.id}>
              <tr>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.type}</td>
                <td>{row.year}</td>
                <td>{row.createdAt}</td>
                <td>
                  <span className={`hq-plan-status ${lifecycleStatusClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td>{row.sendScope}</td>
                <td>{row.sentAt}</td>
                <td>{row.reportStatus}</td>
                <td>
                  <div className="hq-plan-row-actions">
                    {row.status !== "草稿" ? (
                      <>
                        <button type="button" className="hq-plan-action-btn" onClick={() => setPlanModal({ mode: "view", row })}>查看</button>
                        <button type="button" className="hq-plan-action-btn" onClick={() => toggleReport(row)}>{expandedReportId === row.id ? "收起上报" : "征集结果"}</button>
                        {canExportCollection(row) ? (
                          <button type="button" className="hq-plan-action-btn" onClick={() => handleExport(row)}>导出</button>
                        ) : null}
                        {canCloseCollection(row) ? (
                          <button type="button" className="hq-plan-action-btn" onClick={() => handleCloseCollection(row)}>关闭</button>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <button type="button" className="hq-plan-action-btn" onClick={() => setPlanModal({ mode: "edit", row })}>编辑</button>
                        <button type="button" className="hq-plan-action-btn" onClick={() => setSendRow(row)}>发起</button>
                        <button type="button" className="hq-plan-action-btn hq-plan-danger">删除</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
              {expandedReportId === row.id ? (
                <tr>
                  <td colSpan={10} className="hq-plan-report-cell">
                    <ReportResultPanel
                      row={row}
                      openGroups={openReportGroups}
                      onToggleGroup={(key) => setOpenReportGroups((prev) => ({ ...prev, [key]: !prev[key] }))}
                      openDeptId={openReportDept}
                      onToggleDept={(deptId) => setOpenReportDept(openReportDept === deptId ? "" : deptId)}
                      onExport={() => handleExport(row)}
                      onCloseCollection={() => handleCloseCollection(row)}
                    />
                  </td>
                </tr>
              ) : null}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <PlanModal mode={planModal?.mode} row={activeRow} onClose={() => setPlanModal(null)} />
      <SendModal row={sendRow} onClose={() => setSendRow(null)} />
    </div>
  );
}
