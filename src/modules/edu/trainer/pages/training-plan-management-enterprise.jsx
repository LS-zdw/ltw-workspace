import React from "react";
import Card from "/src/components/ui/Card.jsx";

const enterpriseName = "镇海炼化";

const planRows = [
  { id: 1, year: "2026", code: "ZHLH-2026-001", name: "班组长安全履职能力提升计划", target: "基层班组长", planType: "企业年度", dept: "安环部", people: "120", days: "6", planTime: "2026-03,2026-06", location: "镇海炼化培训中心A201", period: "2", progress: "进行中", user: "肖鹏", time: "2026-03-01 09:20:11" },
  { id: 2, year: "2026", code: "ZHLH-2026-002", name: "直接作业环节安全专项培训计划", target: "作业许可审批人员", planType: "企业临时", dept: "工程管理部", people: "80", days: "3", planTime: "2026-04", location: "镇海炼化实训基地", period: "1", progress: "未开始", user: "王敏", time: "2026-03-02 10:13:08" },
  { id: 3, year: "2026", code: "ZHLH-2026-003", name: "新员工三级安全教育计划", target: "新入职员工", planType: "运行部月度", dept: "人力资源部", people: "60", days: "5", planTime: "2026-02,2026-07", location: "一号教学楼B301", period: "2", progress: "进行中", user: "高杨", time: "2026-02-25 15:05:42" },
  { id: 4, year: "2026", code: "ZHLH-2026-004", name: "特种作业复审提升计划", target: "特种作业人员", planType: "运行部年度", dept: "设备管理部", people: "45", days: "4", planTime: "2026-05", location: "设备实训中心", period: "1", progress: "未开始", user: "李卓", time: "2026-03-03 11:24:32" },
  { id: 5, year: "2026", code: "ZHLH-2026-005", name: "消防应急联动演练培训计划", target: "应急小组成员", planType: "其他", dept: "消防保卫部", people: "90", days: "2", planTime: "2026-06", location: "消防演练场", period: "1", progress: "未开始", user: "周凯", time: "2026-03-04 08:58:00" },
  { id: 6, year: "2026", code: "ZHLH-2026-006", name: "危化品储运安全管理计划", target: "储运岗位人员", planType: "企业年度", dept: "生产运行部", people: "70", days: "3", planTime: "2026-04,2026-09", location: "生产运行部会议室", period: "2", progress: "进行中", user: "陈涛", time: "2026-03-04 09:33:21" },
  { id: 7, year: "2026", code: "ZHLH-2026-007", name: "受限空间作业监护培训", target: "作业监护人员", planType: "企业临时", dept: "安环部", people: "55", days: "2", planTime: "2026-08", location: "HSE培训教室", period: "1", progress: "未开始", user: "肖鹏", time: "2026-03-05 13:44:17" },
  { id: 8, year: "2026", code: "ZHLH-2026-008", name: "设备完整性风险识别培训", target: "设备管理骨干", planType: "运行部月度", dept: "设备管理部", people: "38", days: "2", planTime: "2026-07", location: "设备管理部培训室", period: "1", progress: "未开始", user: "王敏", time: "2026-03-05 14:05:06" },
  { id: 9, year: "2026", code: "ZHLH-2026-009", name: "作业票证管理能力提升计划", target: "作业许可审批人员", planType: "运行部年度", dept: "工程管理部", people: "66", days: "3", planTime: "2026-10", location: "综合楼203", period: "1", progress: "未开始", user: "高杨", time: "2026-03-05 16:26:55" },
  { id: 10, year: "2026", code: "ZHLH-2026-010", name: "班组应急处置能力强化计划", target: "一线班组成员", planType: "其他", dept: "生产运行部", people: "130", days: "4", planTime: "2026-11", location: "应急训练中心", period: "1", progress: "未开始", user: "李卓", time: "2026-03-06 09:41:09" }
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
              <Field label="年度" required>
                <select className="cert-field-control" defaultValue="2026" disabled={readOnly}>
                  <option>2026</option><option>2025</option><option>2024</option>
                </select>
              </Field>
              <Field label="计划代码" required>
                <input className="cert-field-control" defaultValue="自动生成" readOnly />
              </Field>
              <Field label="培训计划名称" required>
                <input className="cert-field-control" defaultValue="炼化企业安全管理人员年度培训计划" readOnly={readOnly} placeholder="输入" />
              </Field>
              <Field label="培训对象" required>
                <input className="cert-field-control" defaultValue="安全管理人员" readOnly={readOnly} placeholder="输入培训对象" />
              </Field>
              <Field label="计划培训人数">
                <input className="cert-field-control" defaultValue="120" readOnly={readOnly} placeholder="填写人数/期" />
              </Field>
              <Field label="计划期数">
                <input className="cert-field-control" defaultValue="2" readOnly={readOnly} placeholder="填写数字" />
              </Field>
              <Field label="培训内容" required wide>
                <textarea className="cert-field-control cert-field-textarea" defaultValue="围绕HSE关键岗位职责、风险识别和事故案例开展培训。" readOnly={readOnly} placeholder="培训内容简述" />
              </Field>
              <Field label="计划类型" required>
                <select className="cert-field-control" defaultValue="企业年度" disabled={readOnly}>
                  <option>企业年度</option><option>企业临时</option><option>运行部月度</option><option>运行部年度</option><option>其他</option>
                </select>
              </Field>
              <Field label="计划开班月份" wide>
                <div>
                  <input className="cert-field-control" defaultValue="2026年" readOnly={readOnly} placeholder="计划年份" />
                  <div style={{ marginTop: 6 }}>
                    <MonthChecklist readOnly={readOnly} />
                  </div>
                </div>
              </Field>
            </div>
          </div>

          <div className="cert-section">
            <div className="cert-section-title">组织与执行信息</div>
            <div className="cert-form-grid">
              <Field label="培训天数" required>
                <input className="cert-field-control" defaultValue="6" readOnly={readOnly} placeholder="填写数字" />
              </Field>
              <Field label="培训方式">
                <select className="cert-field-control" defaultValue="线上培训" disabled={readOnly}>
                  <option>线上培训</option><option>集中面授</option><option>外出研修</option>
                </select>
              </Field>
              <Field label="办班地点">
                <input className="cert-field-control" defaultValue="镇海炼化培训中心A201" readOnly={readOnly} placeholder="填写地点" />
              </Field>
              <Field label="主办单位" required>
                <input className="cert-field-control" defaultValue="安全环保部" readOnly={readOnly} placeholder="填写部门" />
              </Field>
              <Field label="承办单位">
                <input className="cert-field-control" defaultValue="人力资源部" readOnly={readOnly} placeholder="填写部门" />
              </Field>
              <Field label="计划费用">
                <input className="cert-field-control" defaultValue="12600" readOnly={readOnly} placeholder="填写费用单位（元）" />
              </Field>
              <Field label="登记部门">
                <input className="cert-field-control" defaultValue="安环部" readOnly />
              </Field>
              <Field label="登记人">
                <input className="cert-field-control" defaultValue="肖鹏" readOnly />
              </Field>
              <Field label="上传附件">
                <div className="cert-picker">
                  <input className="cert-field-control" defaultValue="HSE关键岗位人员年度培训计划.pdf" readOnly />
                  <button type="button" className="btn" disabled={readOnly}>上传文件</button>
                </div>
              </Field>
              {isChange ? (
                <Field label="变更原因" required wide>
                  <textarea className="cert-field-control cert-field-textarea" defaultValue="因组织架构调整，新增参训部门，需调整计划天数与计划月份。" readOnly={readOnly} placeholder="填写变更原因" />
                </Field>
              ) : null}
              <Field label="计划参与机构" wide>
                <OrganizationTree readOnly={readOnly} />
              </Field>
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
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">年度</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="2026"><option>2026</option><option>2025</option><option>2024</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">计划代码</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入计划代码" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训计划名称</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训计划名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">计划类型</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择计划类型"><option>请选择计划类型</option><option>企业年度</option><option>企业临时</option><option>运行部月度</option><option>运行部年度</option><option>其他</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">主办部门</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择主办部门"><option>请选择主办部门</option><option>安环部</option><option>工程管理部</option><option>设备管理部</option><option>生产运行部</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">计划进度</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择计划进度"><option>请选择计划进度</option><option>未开始</option><option>进行中</option><option>已完成</option></select></div></div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-right-actions">
            <button type="button" className="btn btn-primary" onClick={() => setActiveModal("add")}>新增</button>
            <button type="button" className="btn">删除</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        </div>
      </div>

      <Card title="培训计划管理-企业端列表" desc="">
        <div className="table-wrap" data-pager="manual">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th><th>年度</th><th>计划代码</th><th>培训计划名称</th><th>培训对象</th><th>计划类型</th><th>主办部门</th><th>培训人数</th><th>培训天数</th><th>计划时间</th><th>办班地点</th><th>期数</th><th>计划进度</th><th>登记人</th><th>登记时间</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              {planRows.map((row) => (
                <tr key={row.id}>
                  <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                  <td>{row.id}</td>
                  <td>{row.year}</td>
                  <td><button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>{row.code}</button></td>
                  <td><button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>{row.name}</button></td>
                  <td>{row.target}</td>
                  <td>{row.planType}</td>
                  <td>{row.dept}</td>
                  <td>{row.people}</td>
                  <td>{row.days}</td>
                  <td>{row.planTime}</td>
                  <td>{row.location}</td>
                  <td>{row.period}</td>
                  <td>{row.progress}</td>
                  <td>{row.user}</td>
                  <td>{row.time}</td>
                  <td>
                    <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "edit")}>编辑</button>
                    {" / "}
                    <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "change")}>变更</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

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
