import React from "react";

const sampleRecords = [
  {
    year: "2026",
    planName: "HSE关键岗位能力提升年度计划",
    className: "HSE关键岗位履职能力提升专题班（第一期）",
    hostDept: "体系室",
    organizer: "青岛安工院",
    enterprises: "镇海炼化、茂名石化、青岛安工院",
    target: "下属企业HSE关键岗位负责人、体系管理骨干",
    location: "青岛安工院培训基地",
    startDate: "2026-04-10",
    endDate: "2026-04-14",
    hours: "40",
    people: "90",
    passPeople: "86",
    passRate: "95.6%",
    issueCert: "是",
    content: "围绕HSE职责落实、风险分级管控、隐患排查治理和典型案例开展专题培训。"
  },
  {
    year: "2026",
    planName: "双重预防机制建设提升计划",
    className: "双重预防机制实务应用班（第二期）",
    hostDept: "风险室",
    organizer: "金陵石化",
    enterprises: "胜利油田、江汉油田、江苏油田",
    target: "下属企业风险分级管控岗位人员、隐患治理骨干",
    location: "金陵石化培训中心",
    startDate: "2026-06-18",
    endDate: "2026-06-20",
    hours: "24",
    people: "120",
    passPeople: "114",
    passRate: "95.0%",
    issueCert: "否",
    content: "围绕双重预防机制建设标准、现场应用方法与闭环管理要求开展实务培训。"
  }
];

const records = Array.from({ length: 10 }, (_, i) => {
  const sample = sampleRecords[i % 2];
  return {
    id: i + 1,
    ...sample
  };
});

const traineeRows = [
  { id: 1, name: "张明", uid: "ZHANGMING320821", enterprise: "镇海炼化", score: "89", trained: "是", passed: "是" },
  { id: 2, name: "刘敏", uid: "LIUMIN420602", enterprise: "茂名石化", score: "92", trained: "是", passed: "是" },
  { id: 3, name: "陈超", uid: "CHENCHAO340823", enterprise: "青岛安工院", score: "86", trained: "是", passed: "是" }
];

function Field({ label, required = false, children, wide = false }) {
  return (
    <div className={`cert-field-item${wide ? " cert-field-item-wide" : ""}`}>
      <div className="cert-field-label">{required ? <span className="required-mark">*</span> : null}{label}:</div>
      <div className="cert-field-value">{children}</div>
    </div>
  );
}

function RecordModal({ mode, onClose }) {
  const isView = mode === "view";
  const titleMap = {
    add: "培训记录新增",
    edit: "培训记录编辑",
    view: "培训记录详情"
  };

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{titleMap[mode] || "培训记录详情"}</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>

        <div className="modal-bd cert-bd">
          <div className="cert-section">
            <div className="cert-section-title">培训记录基本信息</div>
            <div className="cert-form-grid">
              <Field label="年度">
                <select className="cert-field-control" defaultValue="2026" disabled={isView}>
                  <option>2026</option><option>2025</option><option>2024</option>
                </select>
              </Field>
              <Field label="培训计划名称">
                <input className="cert-field-control" defaultValue="HSE关键岗位能力提升年度计划" readOnly={isView} />
              </Field>
              <Field label="培训计划" required>
                <select className="cert-field-control" defaultValue="HSE关键岗位能力提升年度计划" disabled={isView}>
                  <option>HSE关键岗位能力提升年度计划</option>
                  <option>双重预防机制建设提升计划</option>
                </select>
              </Field>
              <Field label="培训计划名称">
                <input className="cert-field-control" defaultValue="选择培训计划后自动填充" readOnly />
              </Field>
              <Field label="培训班名称" required>
                <input className="cert-field-control" defaultValue="HSE关键岗位履职能力提升专题班（第一期）" readOnly={isView} />
              </Field>
              <Field label="主办部室" required>
                <select className="cert-field-control" defaultValue="体系室" disabled={isView}>
                  <option>风险室</option><option>综合管理室</option><option>体系室</option><option>过程室</option><option>设备室</option><option>健康室</option><option>督查室</option><option>公共安全室</option>
                </select>
              </Field>
              <Field label="承办单位" required>
                <select className="cert-field-control" defaultValue="青岛安工院" disabled={isView}>
                  <option>青岛安工院</option><option>金陵石化</option>
                </select>
              </Field>
              <Field label="参与企业" wide>
                <input className="cert-field-control" defaultValue="镇海炼化、茂名石化、青岛安工院" readOnly={isView} />
              </Field>
              <Field label="培训对象" required>
                <input className="cert-field-control" defaultValue="下属企业HSE关键岗位负责人、体系管理骨干" readOnly={isView} />
              </Field>
              <Field label="培训地点" required>
                <input className="cert-field-control" defaultValue="青岛安工院培训基地" readOnly={isView} />
              </Field>
              <Field label="培训开始日期" required>
                <input className="cert-field-control" defaultValue="2026-04-10" readOnly={isView} />
              </Field>
              <Field label="培训结束日期" required>
                <input className="cert-field-control" defaultValue="2026-04-14" readOnly={isView} />
              </Field>
              <Field label="培训学时">
                <input className="cert-field-control" defaultValue="40" readOnly={isView} />
              </Field>
              <Field label="培训人数">
                <input className="cert-field-control" defaultValue="90" readOnly={isView} />
              </Field>
              <Field label="当前期数">
                <input className="cert-field-control" defaultValue="1" readOnly={isView} />
              </Field>
              <Field label="计划期数">
                <input className="cert-field-control" defaultValue="2" readOnly={isView} />
              </Field>
              <Field label="培训老师" required>
                <select className="cert-field-control" defaultValue="李强" disabled={isView}>
                  <option>李强</option><option>王敏</option><option>赵海</option>
                </select>
              </Field>
              <Field label="培训方式" required>
                <select className="cert-field-control" defaultValue="集中面授" disabled={isView}>
                  <option>集中面授</option><option>外出研修</option><option>线上培训</option>
                </select>
              </Field>
              <Field label="是否发证" required>
                <select className="cert-field-control" defaultValue="是" disabled={isView}>
                  <option>是</option><option>否</option>
                </select>
              </Field>
              <Field label="培训附件">
                <div className="cert-picker">
                  <input className="cert-field-control" defaultValue="HSE关键岗位培训课件.zip" readOnly />
                  <button type="button" className="btn" disabled={isView}>点击上传</button>
                </div>
              </Field>
              <Field label="费用">
                <input className="cert-field-control" defaultValue="26800" readOnly={isView} />
              </Field>
              <Field label="培训内容" required wide>
                <textarea className="cert-field-control cert-field-textarea" defaultValue="围绕HSE职责落实、风险分级管控、隐患排查治理和典型案例开展专题培训。" readOnly={isView} />
              </Field>
              <Field label="参与机构" required wide>
                <div className="tag-row">
                  <span className="tag">镇海炼化</span>
                  <span className="tag">茂名石化</span>
                  <span className="tag">青岛安工院</span>
                </div>
              </Field>
            </div>
          </div>

          <div className="cert-section">
            <div className="cert-section-title">培训人员名单</div>
            {isView ? null : (
              <div className="record-toolbar">
                <button type="button" className="btn btn-primary">新增</button>
                <button type="button" className="btn">编辑</button>
                <button type="button" className="btn">删除</button>
                <button type="button" className="btn">导入</button>
                <button type="button" className="btn">导出</button>
                <button type="button" className="btn">模板下载</button>
              </div>
            )}
            <div className="table-wrap">
              <table className="proto-table">
                <thead>
                  <tr>
                    <th>序号</th><th>姓名</th><th>统一身份账号</th><th>企业名称</th><th>考试成绩</th><th>是否参训</th><th>是否合格</th>
                  </tr>
                </thead>
                <tbody>
                  {traineeRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td><td>{row.name}</td><td>{row.uid}</td><td>{row.enterprise}</td><td>{row.score}</td><td>{row.trained}</td><td>{row.passed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>关闭</button>
          {isView ? null : <button type="button" className="btn btn-primary" onClick={onClose}>保存</button>}
          {mode === "add" ? <button type="button" className="btn btn-primary" onClick={onClose}>提交</button> : null}
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
            <div className="filterbar-item"><div className="filterbar-label">培训计划名称</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训计划名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训班名称</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训班名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">主办部室</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择主办部室"><option>请选择主办部室</option><option>风险室</option><option>综合管理室</option><option>体系室</option><option>过程室</option><option>设备室</option><option>健康室</option><option>督查室</option><option>公共安全室</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">承办单位</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择承办单位"><option>请选择承办单位</option><option>青岛安工院</option><option>金陵石化</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">参与企业</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入参与企业" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训对象</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训对象" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">是否发证</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择是否发证"><option>请选择是否发证</option><option>是</option><option>否</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训开始日期</div><div className="filterbar-input"><div className="filterbar-range"><input className="filterbar-control" defaultValue="2026-01-01" /><span className="filterbar-range-sep">-</span><input className="filterbar-control" defaultValue="2026-12-31" /></div></div></div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-right-actions">
            <button type="button" className="btn btn-primary" onClick={() => setActiveModal("add")}>新增</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-bd">
          <div className="table-wrap trm-hq-list-wrap" data-pager="manual">
            <table className="proto-table trm-hq-main-table">
              <thead>
                <tr>
                  <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                  <th>序号</th><th>年度</th><th>培训计划名称</th><th>培训班名称</th><th>主办部室</th><th>承办单位</th><th>参与企业</th><th>培训对象</th><th>培训地点</th><th>培训开始日期</th><th>培训结束日期</th><th>培训学时</th><th>培训人数</th><th>合格人数</th><th>合格率</th><th>是否发证</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row) => (
                  <tr key={row.id}>
                    <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                    <td>{row.id}</td>
                    <td>{row.year}</td>
                    <td title={row.planName}><button type="button" className="table-link-btn" title={row.planName} onClick={() => openFirstOnly(row.id, "view")}>{row.planName}</button></td>
                    <td title={row.className}><button type="button" className="table-link-btn" title={row.className} onClick={() => openFirstOnly(row.id, "view")}>{row.className}</button></td>
                    <td>{row.hostDept}</td>
                    <td>{row.organizer}</td>
                    <td title={row.enterprises}>{row.enterprises}</td>
                    <td title={row.target}>{row.target}</td>
                    <td title={row.location}>{row.location}</td>
                    <td>{row.startDate}</td>
                    <td>{row.endDate}</td>
                    <td>{row.hours}</td>
                    <td>{row.people}</td>
                    <td>{row.passPeople}</td>
                    <td>{row.passRate}</td>
                    <td>{row.issueCert}</td>
                    <td>
                      <span className="trm-hq-op-inline">
                        <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "edit")}>编辑</button>
                        {" / "}
                        <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "edit")}>删除</button>
                      </span>
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

      {activeModal === "add" ? <RecordModal mode="add" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "edit" ? <RecordModal mode="edit" onClose={() => setActiveModal("")} /> : null}
      {activeModal === "view" ? <RecordModal mode="view" onClose={() => setActiveModal("")} /> : null}
    </div>
  );
}
