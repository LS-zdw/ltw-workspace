import React from "react";

const demandRows = [
  { id: 1, name: "加氢装置紧急操作复训", method: "集中面授", content: "加氢反应区紧急处置与联锁切换", type: "事故案例警示教育", target: "工程管理一班44人", dueDate: "2026-03-04", status: "待提交", org: "工程管理一班", user: "肖鹏", time: "2026-03-04 17:12:51" },
  { id: 2, name: "法规更新专项培训", method: "线上培训", content: "新修订法律法规条款宣贯", type: "法规合规类", target: "公用工程部199人", dueDate: "2026-03-26", status: "待提交", org: "工程管理一班", user: "肖鹏", time: "2026-03-03 10:39:07" },
  { id: 3, name: "培训需求上报专项", method: "集中面授", content: "培训计划与执行流程规范", type: "事故案例警示教育", target: "培训岗位包含人事、管理", dueDate: "2026-02-27", status: "待提交", org: "工程管理一班", user: "肖鹏", time: "2026-02-27 14:59:41" },
  { id: 4, name: "事故案例复盘", method: "线上培训", content: "典型事故案例过程复盘", type: "法规合规类", target: "公用工程部", dueDate: "2026-02-10", status: "待提交", org: "公用工程部", user: "肖鹏", time: "2026-02-10 15:01:06" },
  { id: 5, name: "特殊作业监护复训", method: "线上培训", content: "动火、受限空间监护职责与违章案例提示", type: "法规合规类", target: "公用工程部22人", dueDate: "2026-02-06", status: "待提交", org: "公用工程部", user: "肖鹏", time: "2026-02-06 17:22:13" },
  { id: 6, name: "外出研修申请", method: "外出研修", content: "安全管理先进经验学习", type: "法规合规类", target: "公用工程部44人", dueDate: "2026-02-04", status: "待提交", org: "公用工程部", user: "肖鹏", time: "2026-02-06 17:18:08" },
  { id: 7, name: "作业票管理提升", method: "集中面授", content: "作业票审批流程与监护要求", type: "事故案例警示教育", target: "工程管理班组人员", dueDate: "2026-02-03", status: "待提交", org: "公用工程部", user: "肖鹏", time: "2026-02-06 17:13:58" },
  { id: 8, name: "岗位技能补强", method: "外出研修", content: "班组长能力提升", type: "岗位技能类", target: "公用工程部", dueDate: "2026-02-11", status: "审核中", org: "公用工程部", user: "肖鹏", time: "2026-02-02 16:13:53" },
  { id: 9, name: "班组岗位能力演练", method: "集中面授", content: "岗位风险识别与处置演练", type: "事故案例警示教育", target: "班组作业人员", dueDate: "2026-02-01", status: "待提交", org: "公用工程部", user: "肖鹏", time: "2026-02-02 15:19:36" },
  { id: 10, name: "冬季运行专项培训", method: "集中面授", content: "冬季设备运行与防冻防凝要点", type: "事故案例警示教育", target: "建议培训对象人员数量", dueDate: "2026-02-03", status: "待提交", org: "公用工程部", user: "肖鹏", time: "2026-02-02 09:08:20" }
];

const formDefault = {
  name: "",
  method: "",
  type: "",
  content: "",
  target: "",
  budget: "",
  attachment: "",
  dueDate: "",
  user: "肖鹏",
  org: "工程管理一班",
  time: "2026-03-07"
};

function DemandModal({ mode = "add", onClose }) {
  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isDetailMode = isView || isEdit;
  const title = isView ? "培训需求详情" : isEdit ? "培训需求编辑" : "培训需求新增";
  const data = isDetailMode
    ? {
        ...formDefault,
        name: "加氢装置紧急操作复训",
        method: "集中面授",
        type: "事故案例警示教育",
        content: "加氢反应区联锁切换与紧急处置复训",
        target: "工程管理一班44人",
        budget: "280000",
        attachment: "加氢装置紧急操作复训-需求说明.docx",
        dueDate: "2026-03-04",
        time: "2026-03-04"
      }
    : formDefault;

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal demand-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd demand-modal-bd">
          <div className="cert-section">
            <div className="cert-section-title">需求基本信息</div>
            <div className="cert-form-grid plan-form-two-col demand-form-grid">
            <div className="cert-field-item cert-field-item-wide">
              <div className="cert-field-label"><span className="required-mark">*</span>需求名称：</div>
              <div className="cert-field-value">
                <div className="demand-counter-input">
                  <input className="cert-field-control" defaultValue={data.name} placeholder="请输入培训需求名称" readOnly={isView} />
                  <span className="demand-counter">0/30</span>
                </div>
              </div>
            </div>

            <div className="cert-field-item">
              <div className="cert-field-label">培训形式：</div>
              <div className="cert-field-value">
                <select className="cert-field-control" defaultValue={data.method || "请选择培训形式"} disabled={isView}>
                  <option>请选择培训形式</option>
                  <option>集中面授</option>
                  <option>线上培训</option>
                  <option>外出研修</option>
                </select>
              </div>
            </div>
            <div className="cert-field-item">
              <div className="cert-field-label">培训类型：</div>
              <div className="cert-field-value">
                <select className="cert-field-control" defaultValue={data.type || "请选择培训类型"} disabled={isView}>
                  <option>请选择培训类型</option>
                  <option>事故案例警示教育</option>
                  <option>法规合规类</option>
                  <option>岗位技能类</option>
                </select>
              </div>
            </div>

            <div className="cert-field-item cert-field-item-wide">
              <div className="cert-field-label"><span className="required-mark">*</span>培训需求内容：</div>
              <div className="cert-field-value">
                <textarea className="cert-field-control cert-field-textarea" defaultValue={data.content} placeholder="培训内容简述，不超过50字" readOnly={isView} />
                <div className="demand-counter-row"><span className="demand-counter">0/50</span></div>
              </div>
            </div>

            <div className="cert-field-item">
              <div className="cert-field-label">建议培训对象：</div>
              <div className="cert-field-value">
                <div className="demand-counter-input">
                  <input className="cert-field-control" defaultValue={data.target} placeholder="填写岗位名称、人员数量" readOnly={isView} />
                  <span className="demand-counter">0/50</span>
                </div>
              </div>
            </div>
            <div className="cert-field-item" />

            <div className="cert-field-item">
              <div className="cert-field-label">计划投资金额：</div>
              <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.budget} placeholder="最多8位整数+2位小数" readOnly={isView} /></div>
            </div>
            <div className="cert-field-item">
              <div className="cert-field-label">上传附件：</div>
              <div className="cert-field-value">
                <div className="cert-picker">
                  <input className="cert-field-control" defaultValue={data.attachment} readOnly />
                  <button type="button" className="btn">上传文件</button>
                </div>
                <div className="demand-file-hint">支持扩展名：image/*,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip</div>
              </div>
            </div>
            <div className="cert-field-item">
              <div className="cert-field-label">期望完成日期：</div>
              <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.dueDate} placeholder="填写日期" readOnly={isView} /></div>
            </div>

            <div className="cert-field-item">
              <div className="cert-field-label">登记人：</div>
              <div className="cert-field-value"><input className="cert-field-control" value={data.user} readOnly /></div>
            </div>
            <div className="cert-field-item">
              <div className="cert-field-label">登记单位：</div>
              <div className="cert-field-value"><input className="cert-field-control" value={data.org} readOnly /></div>
            </div>
            <div className="cert-field-item">
              <div className="cert-field-label">登记时间：</div>
              <div className="cert-field-value"><input className="cert-field-control" value={data.time} readOnly /></div>
            </div>
            </div>
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>{isView ? "关闭" : "取消"}</button>
          {!isView ? <button type="button" className="btn btn-primary" onClick={onClose}>保存</button> : null}
          {!isView ? <button type="button" className="btn btn-primary" onClick={onClose}>提交</button> : null}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [modalType, setModalType] = React.useState("");

  const openFirstOnly = (id, type) => {
    if (id !== 1) return;
    setModalType(type);
  };

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">需求名称：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入需求名称" defaultValue="" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训需求内容：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训需求内容" defaultValue="" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训类型：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择培训类型"><option>请选择培训类型</option><option>事故案例警示教育</option><option>法规合规类</option><option>岗位技能类</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">建议培训对象：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入建议培训对象" defaultValue="" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">审批情况：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择审批情况"><option>请选择审批情况</option><option>待提交</option><option>审核中</option><option>审批通过</option><option>审批驳回</option></select></div></div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary" onClick={() => setModalType("add")}>新增</button>
            <button type="button" className="btn">导出</button>
          </div>
        </div>

        <div className="filterbar-inline-actions">
          <div className="filterbar-item">
            <div className="filterbar-label">登记日期：</div>
            <div className="filterbar-input">
              <div className="filterbar-range">
                <input className="filterbar-control" defaultValue="2025-09-06" />
                <span className="filterbar-range-sep">至</span>
                <input className="filterbar-control" defaultValue="2026-03-06" />
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary">查询</button>
          <button type="button" className="btn">重置</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="proto-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th>
              <th>序号</th><th>需求名称</th><th>培训形式</th><th>培训需求内容</th><th>培训类型</th><th>建议培训对象</th><th>期望完成日期</th><th>审批情况</th><th>登记单位</th><th>登记人</th><th>登记时间</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            {demandRows.map((row) => (
              <tr key={row.id}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.id}</td>
                <td><button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>{row.name}</button></td>
                <td>{row.method}</td>
                <td>{row.content}</td>
                <td>{row.type}</td>
                <td>{row.target}</td>
                <td>{row.dueDate}</td>
                <td>{row.status}</td>
                <td>{row.org}</td>
                <td>{row.user}</td>
                <td>{row.time}</td>
                <td>
                  <div className="table-op-inline">
                    <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "edit")}>编辑</button>
                    <button type="button" className="table-link-btn danger">删除</button>
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

      {modalType ? <DemandModal mode={modalType} onClose={() => setModalType("")} /> : null}
    </div>
  );
}
