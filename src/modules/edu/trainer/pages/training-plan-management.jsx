import React from "react";
import Card from "/src/components/ui/Card.jsx";

const sampleRows = [
  {
    year: "2026",
    name: "HSE关键岗位能力提升年度计划",
    target: "下属企业HSE关键岗位负责人、体系管理骨干",
    enterprises: "镇海炼化、茂名石化、青岛安工院",
    hostDepartment: "体系室",
    organizer: "青岛安工院",
    location: "青岛安工院培训基地",
    people: "180",
    days: "5",
    planDate: "2026-04, 2026-09",
    progress: "进行中"
  },
  {
    year: "2026",
    name: "双重预防机制建设提升计划",
    target: "下属企业风险分级管控岗位人员、隐患治理骨干",
    enterprises: "胜利油田、江汉油田、江苏油田",
    hostDepartment: "风险室",
    organizer: "金陵石化",
    location: "金陵石化培训中心",
    people: "120",
    days: "3",
    planDate: "2026-06",
    progress: "未开始"
  }
];

const planRows = Array.from({ length: 10 }, (_, i) => {
  const sample = sampleRows[i % 2];
  const index = i + 1;
  return {
    id: index,
    code: `HQ-JH-2026-${String(index).padStart(3, "0")}`,
    ...sample
  };
});

const executeRows = [
  {
    id: 1,
    className: "HSE关键岗位履职能力提升专题班",
    enterprises: "镇海炼化、茂名石化",
    period: "1",
    month: "4",
    type: "集中面授",
    planPeople: "90",
    realPeople: "88",
    passPeople: "86",
    passRate: "97.7%"
  },
  {
    id: 2,
    className: "双重预防机制实务应用班",
    enterprises: "青岛安工院、胜利油田",
    period: "2",
    month: "9",
    type: "线上培训",
    planPeople: "90",
    realPeople: "91",
    passPeople: "89",
    passRate: "97.8%"
  }
];

function Field({ label, required = false, children, wide = false }) {
  return (
    <div className={`cert-field-item${wide ? " cert-field-item-wide" : ""}`}>
      <div className="cert-field-label">{required ? <span className="required-mark">*</span> : null}{label}:</div>
      <div className="cert-field-value">{children}</div>
    </div>
  );
}

function MonthChecklist() {
  const months = [
    "1月", "2月", "3月", "4月", "5月", "6月",
    "7月", "8月", "9月", "10月", "11月", "12月"
  ];
  const checkedSet = new Set(["4月", "9月"]);
  return (
    <div className="plan-months">
      {months.map((m) => (
        <label className="plan-month-item" key={m}>
          <input type="checkbox" defaultChecked={checkedSet.has(m)} disabled />
          <span>{m}</span>
        </label>
      ))}
    </div>
  );
}

function HqPlanModal({ mode, onClose }) {
  const isView = mode === "view";
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
                <select className="cert-field-control" defaultValue="2026" disabled={isView}>
                  <option>2026</option><option>2025</option><option>2024</option>
                </select>
              </Field>
              <Field label="计划代码" required>
                <input className="cert-field-control" defaultValue="HQ-JH-2026-001" readOnly />
              </Field>
              <Field label="培训计划名称" required>
                <input className="cert-field-control" defaultValue="HSE关键岗位能力提升年度计划" readOnly={isView} />
              </Field>
              <Field label="培训对象" required>
                <input className="cert-field-control" defaultValue="下属企业HSE关键岗位负责人、体系管理骨干" readOnly={isView} />
              </Field>
              <Field label="计划参与企业" required wide>
                <input className="cert-field-control" defaultValue="镇海炼化、茂名石化、青岛安工院" readOnly={isView} />
              </Field>
              <Field label="培训人数">
                <input className="cert-field-control" defaultValue="180" readOnly={isView} />
              </Field>
              <Field label="培训天数" required>
                <input className="cert-field-control" defaultValue="5" readOnly={isView} />
              </Field>
              <Field label="计划期数">
                <input className="cert-field-control" defaultValue="2" readOnly={isView} />
              </Field>
              <Field label="主办部门" required>
                <select className="cert-field-control" defaultValue="体系室" disabled={isView}>
                  <option>风险室</option><option>领导班子</option><option>综合管理室</option><option>体系室</option><option>过程室</option><option>设备室</option><option>健康室</option><option>督查室</option><option>公共安全室</option>
                </select>
              </Field>
              <Field label="承办单位">
                <select className="cert-field-control" defaultValue="青岛安工院" disabled={isView}>
                  <option>青岛安工院</option><option>金陵石化</option>
                </select>
              </Field>
              <Field label="办班地点">
                <input className="cert-field-control" defaultValue="青岛安工院培训基地" readOnly={isView} />
              </Field>
              <Field label="计划开班月份" wide>
                <div>
                  <input className="cert-field-control" defaultValue="2026" readOnly />
                  <div style={{ marginTop: 6 }}>
                    <MonthChecklist />
                  </div>
                </div>
              </Field>
              <Field label="培训内容" required wide>
                <textarea
                  className="cert-field-control cert-field-textarea"
                  defaultValue="围绕总部年度重点任务，面向下属企业关键岗位开展标准化培训，统一培训大纲、实施要求和考核口径。"
                  readOnly={isView}
                />
              </Field>
              {isChange ? (
                <Field label="变更原因" required wide>
                  <textarea
                    className="cert-field-control cert-field-textarea"
                    defaultValue="根据年度重点工程推进安排，调整第二期实施月份并补充参与企业。"
                    readOnly={isView}
                  />
                </Field>
              ) : null}
              <Field label="登记时间">
                <input className="cert-field-control" defaultValue="2026-03-05 14:20:15" readOnly />
              </Field>
            </div>
          </div>

          {isView ? (
            <div className="cert-section">
              <div className="cert-section-title">计划执行情况</div>
              <div className="table-wrap">
                <table className="proto-table">
                  <thead>
                    <tr>
                      <th>序号</th><th>培训班名称</th><th>参与企业</th><th>期次</th><th>开班月份</th><th>培训形式</th><th>计划培训人数</th><th>实际培训人数</th><th>考试合格人数</th><th>合格率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {executeRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.className}</td>
                        <td>{row.enterprises}</td>
                        <td>{row.period}</td>
                        <td>{row.month}</td>
                        <td>{row.type}</td>
                        <td>{row.planPeople}</td>
                        <td>{row.realPeople}</td>
                        <td>{row.passPeople}</td>
                        <td>{row.passRate}</td>
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
          {isView ? null : <button type="button" className="btn btn-primary" onClick={onClose}>保存</button>}
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
      <div className="stpm-hq-layout">
        <aside className="stpm-hq-side-panel">
          <div className="stpm-hq-side-title">所属企业筛选</div>
          <div className="stpm-hq-side-search">
            <span className="stpm-hq-side-label">名称:</span>
            <input className="filterbar-control stpm-hq-side-input" placeholder="请输入企业名称" defaultValue="" />
          </div>
          <div className="stpm-hq-side-list">
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" defaultChecked readOnly /> 总部机关</label>
            <div className="stpm-hq-child-list">
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" defaultChecked readOnly /> 风险室</label>
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" readOnly /> 综合管理室</label>
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" readOnly /> 体系室</label>
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" readOnly /> 过程室</label>
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" readOnly /> 应急室</label>
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" readOnly /> 健康室</label>
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" readOnly /> 督查室</label>
              <label className="stpm-hq-child-item"><input type="radio" name="stpm-hq-dept" readOnly /> 公共安全室</label>
            </div>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 宁波工程公司</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 镇海炼化</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 中石化江汉石油有限公司</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 中国石化销售有限公司</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 中原油田</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 河南油田</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 江汉油田</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 江苏油田</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 华北石油局</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 华东油田</label>
            <label className="stpm-hq-side-item"><input type="radio" name="stpm-hq-org" readOnly /> 西南油气</label>
          </div>
        </aside>
        <div className="stpm-hq-main">
          <div className="filterbar">
            <div className="filterbar-row">
              <div className="filterbar-left">
                <div className="filterbar-item"><div className="filterbar-label">年度</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="2026"><option>2026</option><option>2025</option><option>2024</option></select></div></div>
                <div className="filterbar-item"><div className="filterbar-label">计划代码</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入计划代码" /></div></div>
                <div className="filterbar-item"><div className="filterbar-label">培训计划名称</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训计划名称" /></div></div>
                <div className="filterbar-item"><div className="filterbar-label">承办单位</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择承办单位"><option>请选择承办单位</option><option>青岛安工院</option><option>金陵石化</option></select></div></div>
                <div className="filterbar-item"><div className="filterbar-label">参与企业</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入参与企业" /></div></div>
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

          <Card title="培训计划管理" desc="">
            <div className="table-wrap" data-pager="manual">
              <table className="proto-table">
                <thead>
                  <tr>
                    <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                    <th>序号</th><th>年度</th><th>计划代码</th><th>培训计划名称</th><th>培训对象</th><th>参与企业</th><th>主办部门</th><th>承办单位</th><th>培训地点</th><th>培训人数</th><th>培训天数</th><th>计划时间</th><th>计划进度</th><th>操作</th>
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
                      <td>{row.enterprises}</td>
                      <td>{row.hostDepartment}</td>
                      <td>{row.organizer}</td>
                      <td>{row.location}</td>
                      <td>{row.people}</td>
                      <td>{row.days}</td>
                      <td>{row.planDate}</td>
                      <td>{row.progress}</td>
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
        </div>
      </div>

      {activeModal === "view" ? <HqPlanModal mode="view" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "edit" ? <HqPlanModal mode="edit" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "change" ? <HqPlanModal mode="change" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "add" ? <HqPlanModal mode="add" onClose={() => setActiveModal("")} /> : null}
    </div>
  );
}
