import React from "react";

const activityCategoryOptions = ["法规制度", "事故案例", "开展应急演练", "风险识别", "隐患排查", "安全技能比武"];

const initialRows = [
  { id: 1, name: "班组月度安全活动", team: "常减压一班", planned: 111, brief: "事故案例复盘与班前风险提示", planDate: "2026-03-31", actualDate: "", status: "待开展", registrar: "肖鹏" },
  { id: 2, name: "春季作业安全交底", team: "乙烯运行二班", planned: 98, brief: "季节性作业风险提示", planDate: "2026-02-27", actualDate: "", status: "待开展", registrar: "高杨" },
  { id: 3, name: "受限空间警示教育", team: "检维修三班", planned: 88, brief: "受限空间作业票管理", planDate: "2026-02-28", actualDate: "", status: "超期未开展", registrar: "肖鹏" },
  { id: 4, name: "交接班安全确认", team: "动力站一班", planned: 76, brief: "交接班重点风险确认", planDate: "2026-02-24", actualDate: "2026-02-24", status: "已完成", registrar: "高杨" },
  { id: 5, name: "消防器材实操", team: "消防值守班", planned: 65, brief: "灭火器与消防栓实操", planDate: "2026-02-25", actualDate: "2026-02-25", status: "已完成", registrar: "肖鹏" },
  { id: 6, name: "特殊作业监护培训", team: "加氢装置班", planned: 56, brief: "动火监护要点", planDate: "2026-02-22", actualDate: "", status: "超期未开展", registrar: "肖鹏" },
  { id: 7, name: "作业票证管理专题", team: "工程协同班", planned: 49, brief: "作业票审批要点与风险确认", planDate: "2026-02-21", actualDate: "2026-02-21", status: "已完成", registrar: "高杨" },
  { id: 8, name: "班组隐患闭环演练", team: "机泵保障班", planned: 42, brief: "隐患闭环责任落实", planDate: "2026-02-20", actualDate: "2026-02-20", status: "已完成", registrar: "肖鹏" },
  { id: 9, name: "冬防保温专项", team: "公用工程班", planned: 35, brief: "低温季节风险提示", planDate: "2026-02-19", actualDate: "", status: "超期未开展", registrar: "高杨" },
  { id: 10, name: "班组应急拉练", team: "储运班组", planned: 28, brief: "泄漏应急处置演练", planDate: "2026-02-18", actualDate: "2026-02-18", status: "已完成", registrar: "肖鹏" }
];

const draftPlan = {
  name: "班前风险识别与案例复盘",
  category: "事故案例",
  team: "常减压一班",
  planned: "111",
  date: "2026-02-06",
  content: "围绕近三个月装置异常工况，开展风险识别、案例复盘和岗位互查演练。"
};

const recordDraft = {
  actualTime: "2026-02-06 09:00:00",
  summary: "围绕近三个月装置异常工况，开展风险识别、案例复盘和岗位互查演练。",
  attachmentFile: "班组活动记录与签到-常减压一班-20260206.zip",
  registrar: "肖鹏",
  registerTime: "2026-02-06 10:20:00",
  operationDept: "炼油一部",
  teamName: "常减压一班"
};

function StatBox({ bg, label, value }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: bg, color: "#fff", padding: "10px 16px", borderRadius: 4, minWidth: 190 }}>
      <span>{label}</span><b style={{ fontSize: 34, lineHeight: 1 }}>{value}</b>
    </div>
  );
}

function PlanForm({ title, data, readOnly = false, submitText = "提交", onClose }) {
  return (
    <>
      <div className="modal-hd">
        <div className="modal-title">{title}</div>
        <button type="button" className="modal-close" onClick={onClose}>×</button>
      </div>
      <div className="modal-bd cert-bd">
        <div className="cert-form-grid">
          <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>安全活动名称：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={data.name} placeholder="请输入活动名称" disabled={readOnly} /><span className="tsa-counter">3/30</span></div></div>
          <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>班组名称：</div><div className="cert-field-value"><select className="cert-field-control" defaultValue={data.team} disabled={readOnly}><option>请选择</option><option>常减压一班</option><option>乙烯运行二班</option></select></div></div>

          <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>活动内容分类：</div><div className="cert-field-value"><select className="cert-field-control" defaultValue={data.category} disabled={readOnly}><option>请选择活动内容分类</option>{activityCategoryOptions.map((item) => <option key={item}>{item}</option>)}</select></div></div>
          <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>计划人数：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={data.planned} placeholder="请输入计划人数" disabled={readOnly} /></div></div>

          <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>计划活动日期：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={data.date} placeholder="请选择计划活动日期" disabled={readOnly} /></div></div>
          <div className="cert-field-item" />

          <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label"><span className="required-mark">*</span>班组安全活动内容：</div><div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea cert-field-textarea-large" defaultValue={data.content} placeholder="班组安全活动简述" disabled={readOnly} /><span className="tsa-counter">4/200</span></div></div>
        </div>
      </div>
      <div className="modal-ft">
        <button type="button" className="btn" onClick={onClose}>取消</button>
        {!readOnly ? <button type="button" className="btn btn-primary">{submitText}</button> : null}
      </div>
    </>
  );
}

function RecordForm({ title = "登记班组安全活动记录", submitText = "提交", onClose, onSubmit }) {
  return (
    <>
      <div className="modal-hd"><div className="modal-title">{title}</div><button type="button" className="modal-close" onClick={onClose}>×</button></div>
      <div className="modal-bd cert-bd">
        <div className="cert-section"><div className="cert-section-title">班组安全活动计划</div>
          <div className="cert-form-grid">
            <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>班组安全活动名称：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={draftPlan.name} disabled /></div></div>
            <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>班组名称：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={draftPlan.team} disabled /></div></div>
            <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>活动内容分类：</div><div className="cert-field-value"><select className="cert-field-control" defaultValue={draftPlan.category} disabled>{activityCategoryOptions.map((item) => <option key={item}>{item}</option>)}</select></div></div>
            <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>计划参加人数：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={draftPlan.planned} disabled /></div></div>
            <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>计划活动日期：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={draftPlan.date} disabled /></div></div>
            <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label"><span className="required-mark">*</span>班组安全活动内容：</div><div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" defaultValue={draftPlan.content} disabled /></div></div>
          </div>
        </div>

        <div className="cert-section"><div className="cert-section-title">班组安全活动记录登记</div>
          <div className="cert-form-grid">
            <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>实际活动时间：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={recordDraft.actualTime} placeholder="请输入实际活动时间" /></div></div>
            <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label"><span className="required-mark">*</span>活动内容简述：</div><div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" defaultValue={recordDraft.summary} placeholder="请输入活动内容简述" /></div></div>
            <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label">记录附件：</div><div className="cert-field-value"><div className="cert-picker"><input className="cert-field-control" defaultValue={recordDraft.attachmentFile} placeholder="请上传记录附件（可含签到）" readOnly /><button type="button" className="btn">上传文件</button></div><div className="tsa-helper">支持扩展名：image/*,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip</div></div></div>
          </div>
        </div>

        <div className="cert-section"><div className="cert-section-title">活动登记信息</div>
          <div className="cert-form-grid">
            <div className="cert-field-item"><div className="cert-field-label">运行部：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={recordDraft.operationDept} disabled /></div></div>
            <div className="cert-field-item"><div className="cert-field-label">班组：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={recordDraft.teamName} disabled /></div></div>
            <div className="cert-field-item"><div className="cert-field-label">登记人：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={recordDraft.registrar} disabled /></div></div>
            <div className="cert-field-item"><div className="cert-field-label">登记时间：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={recordDraft.registerTime} disabled /></div></div>
          </div>
        </div>
      </div>
      <div className="modal-ft"><button type="button" className="btn" onClick={onClose}>取消</button><button type="button" className="btn btn-primary" onClick={onSubmit}>{submitText}</button></div>
    </>
  );
}

export default function Page() {
  const [rowData, setRowData] = React.useState(initialRows);
  const [modalType, setModalType] = React.useState("");
  const [activeRow, setActiveRow] = React.useState(null);
  const total = rowData.length;
  const done = rowData.filter((r) => r.status === "已完成").length;
  const rate = total > 0 ? `${Math.round((done / total) * 100)}%` : "0%";

  const openIfFirst = (row, type) => {
    if (row.id !== 1) return;
    setActiveRow(row);
    setModalType(type);
  };

  const getRecordActionLabel = (row) => {
    if (row.status === "已完成") return "编辑记录";
    if (row.status === "超期未开展") return "补录记录";
    return "登记记录";
  };

  const canEditPlan = (row) => row.status !== "已完成";

  const handleRecordSubmit = () => {
    if (!activeRow) {
      setModalType("");
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    setRowData((prev) =>
      prev.map((item) =>
        item.id === activeRow.id
          ? {
              ...item,
              status: "已完成",
              actualDate: item.actualDate || today
            }
          : item
      )
    );
    setModalType("");
    setActiveRow(null);
  };

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">安全活动名称：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入安全活动名" defaultValue="" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">运行部：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择运行部"><option value="请选择运行部">请选择运行部</option><option value="炼油一部">炼油一部</option><option value="炼油二部">炼油二部</option><option value="化工运行部">化工运行部</option><option value="公用工程运行部">公用工程运行部</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">班组：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择班组"><option value="请选择班组">请选择班组</option><option value="常减压一班">常减压一班</option><option value="乙烯运行二班">乙烯运行二班</option><option value="检维修三班">检维修三班</option><option value="动力站一班">动力站一班</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">活动日期：</div><div className="filterbar-input"><div className="filterbar-range"><input className="filterbar-control" placeholder="开始日期" defaultValue="" /><span className="filterbar-range-sep">至</span><input className="filterbar-control" placeholder="结束日期" defaultValue="" /></div></div></div>
            <div className="filterbar-item"><div className="filterbar-label">状态：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择状态"><option value="请选择状态">请选择状态</option><option value="待开展">待开展</option><option value="已完成">已完成</option><option value="超期未开展">超期未开展</option></select></div></div>
          </div>
          <div className="filterbar-query-actions">
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">重置</button>
          </div>
          <div className="filterbar-right-actions">
            <button type="button" className="btn btn-primary" onClick={() => setModalType("add")}>新增</button>
            <button type="button" className="btn">导出</button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <select className="filterbar-control" defaultValue="全部" style={{ width: 180 }}><option value="全部">全部</option><option value="本月">本月</option><option value="本周">本周</option><option value="本年度">本年度</option></select>
        <StatBox bg="#6d57c9" label="班组活动计划总数" value={total} />
        <StatBox bg="#25bf68" label="班组活动完成数量" value={done} />
        <StatBox bg="#f05252" label="班组活动完成率" value={rate} />
      </div>

      <div className="table-wrap">
        <table className="proto-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th>
              <th>序号</th><th>安全活动名称</th><th>班组</th><th>计划人数</th><th>安全活动内容简述</th><th>计划活动日期</th><th>实际活动时间</th><th>状态</th><th>登记人</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row) => (
              <tr key={row.id}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.id}</td>
                <td><button type="button" className="table-link-btn" onClick={() => openIfFirst(row, "view")}>{row.name}</button></td>
                <td>{row.team}</td><td>{row.planned}</td><td>{row.brief}</td><td>{row.planDate}</td><td>{row.actualDate || ""}</td><td>{row.status}</td><td>{row.registrar}</td>
                <td>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <button type="button" className="table-link-btn" onClick={() => openIfFirst(row, "record")}>{getRecordActionLabel(row)}</button>
                    {canEditPlan(row) ? <button type="button" className="table-link-btn" onClick={() => openIfFirst(row, "edit")}>编辑计划</button> : null}
                    <button type="button" className="table-link-btn" onClick={() => openIfFirst(row, "delete")}>删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {modalType ? (
        <div className="modal-mask" onClick={() => setModalType("")}> 
          <div className="modal modal-xl cert-modal tsa-modal" onClick={(e) => e.stopPropagation()}>
            {modalType === "add" ? <PlanForm title="班组安全活动计划新增" data={{ name: "", category: "", team: "", planned: "", date: "", content: "" }} onClose={() => setModalType("")} /> : null}
            {modalType === "view" ? <PlanForm title="查看班组安全活动计划" data={draftPlan} readOnly onClose={() => setModalType("")} /> : null}
            {modalType === "edit" ? <PlanForm title="编辑班组安全活动计划" data={draftPlan} onClose={() => setModalType("")} /> : null}
            {modalType === "record" ? (
              <RecordForm
                title={activeRow?.status === "已完成" ? "编辑班组安全活动记录" : activeRow?.status === "超期未开展" ? "补录班组安全活动记录" : "登记班组安全活动记录"}
                submitText={activeRow?.status === "已完成" ? "保存" : "提交"}
                onClose={() => setModalType("")}
                onSubmit={handleRecordSubmit}
              />
            ) : null}
            {modalType === "delete" ? (
              <>
                <div className="modal-hd"><div className="modal-title">删除</div><button type="button" className="modal-close" onClick={() => setModalType("")}>×</button></div>
                <div className="modal-bd"><div className="pill"><div className="k">原型模式提示</div><div className="v">仅演示交互，不删除数据。</div></div></div>
                <div className="modal-ft"><button type="button" className="btn" onClick={() => setModalType("")}>取消</button><button type="button" className="btn btn-primary" onClick={() => setModalType("")}>确定</button></div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
