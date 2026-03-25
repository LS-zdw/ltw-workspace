import React from "react";

const demandRows = [
  { id: 1, year: "2026", name: "HSE关键岗位能力提升专项培训", target: "企业HSE关键岗位负责人、风险管理人员", dueDate: "2026-03-04", org: "风险室", undertakeOrg: "金陵石化", status: "待审批", remark: "重点覆盖新任岗位人员", user: "张铭", time: "2026-03-04 17:12:51" },
  { id: 2, year: "2026", name: "直属企业HSE体系审核实务培训", target: "企业体系内审员、HSE体系管理员", dueDate: "2026-03-26", org: "体系室", undertakeOrg: "青岛安工院", status: "审核中", remark: "需结合年度内审计划", user: "李倩", time: "2026-03-03 10:39:07" },
  { id: 3, year: "2026", name: "HSE关键岗位能力提升专项培训", target: "企业HSE关键岗位负责人、风险管理人员", dueDate: "2026-03-04", org: "风险室", undertakeOrg: "金陵石化", status: "待审批", remark: "重点覆盖新任岗位人员", user: "张铭", time: "2026-03-04 17:12:51" },
  { id: 4, year: "2026", name: "直属企业HSE体系审核实务培训", target: "企业体系内审员、HSE体系管理员", dueDate: "2026-03-26", org: "体系室", undertakeOrg: "青岛安工院", status: "审核中", remark: "需结合年度内审计划", user: "李倩", time: "2026-03-03 10:39:07" },
  { id: 5, year: "2026", name: "HSE关键岗位能力提升专项培训", target: "企业HSE关键岗位负责人、风险管理人员", dueDate: "2026-03-04", org: "风险室", undertakeOrg: "金陵石化", status: "待审批", remark: "重点覆盖新任岗位人员", user: "张铭", time: "2026-03-04 17:12:51" },
  { id: 6, year: "2026", name: "直属企业HSE体系审核实务培训", target: "企业体系内审员、HSE体系管理员", dueDate: "2026-03-26", org: "体系室", undertakeOrg: "青岛安工院", status: "审核中", remark: "需结合年度内审计划", user: "李倩", time: "2026-03-03 10:39:07" },
  { id: 7, year: "2026", name: "HSE关键岗位能力提升专项培训", target: "企业HSE关键岗位负责人、风险管理人员", dueDate: "2026-03-04", org: "风险室", undertakeOrg: "金陵石化", status: "待审批", remark: "重点覆盖新任岗位人员", user: "张铭", time: "2026-03-04 17:12:51" },
  { id: 8, year: "2026", name: "直属企业HSE体系审核实务培训", target: "企业体系内审员、HSE体系管理员", dueDate: "2026-03-26", org: "体系室", undertakeOrg: "青岛安工院", status: "审核中", remark: "需结合年度内审计划", user: "李倩", time: "2026-03-03 10:39:07" },
  { id: 9, year: "2026", name: "HSE关键岗位能力提升专项培训", target: "企业HSE关键岗位负责人、风险管理人员", dueDate: "2026-03-04", org: "风险室", undertakeOrg: "金陵石化", status: "待审批", remark: "重点覆盖新任岗位人员", user: "张铭", time: "2026-03-04 17:12:51" },
  { id: 10, year: "2026", name: "直属企业HSE体系审核实务培训", target: "企业体系内审员、HSE体系管理员", dueDate: "2026-03-26", org: "体系室", undertakeOrg: "青岛安工院", status: "审核中", remark: "需结合年度内审计划", user: "李倩", time: "2026-03-03 10:39:07" }
];

const approvalFlowRows = [
  { id: 1, step: "需求发起", user: "张铭", org: "风险室", action: "提交", result: "提交成功", opinion: "无", time: "2026-03-04" },
  { id: 2, step: "体系室确认", user: "李倩", org: "体系室", action: "审核", result: "通过", opinion: "同意", time: "2026-03-05" },
  { id: 3, step: "分管审批", user: "王博", org: "综合管理室", action: "审核", result: "通过", opinion: "同意", time: "2026-03-06" }
];

function DemandModal({ mode = "view", onClose }) {
  const isApprove = mode === "approve";
  const data = {
    year: "2026",
    name: "HSE关键岗位能力提升专项培训",
    target: "企业HSE关键岗位负责人、风险管理人员",
    dueDate: "2026-03-04",
    org: "风险室",
    undertakeOrg: "金陵石化",
    status: "待审批",
    remark: "重点覆盖新任岗位人员",
    user: "张铭",
    time: "2026-03-04 17:12:51"
  };

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal demand-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{isApprove ? "培训需求审批" : "培训需求详情"}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd demand-modal-bd">
          <div className="cert-section">
            <div className="cert-section-title">需求基本信息</div>
            <div className="cert-form-grid plan-form-two-col demand-form-grid">
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>需求名称：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.name} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>年度：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.year} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>培训对象：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.target} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>计划时间：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.dueDate} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>主办部室：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.org} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>承办单位：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.undertakeOrg} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">审批状态：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.status} readOnly /></div>
              </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label">备注：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.remark} readOnly /></div>
              </div>
            </div>
          </div>

          <div className="cert-section demand-approval-section">
            <div className="cert-section-title">审批及操作流程</div>
            <div className="table-wrap demand-approval-table-wrap">
              <table className="proto-table" style={{ minWidth: "100%" }}>
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>执行步骤</th>
                    <th>审批人员</th>
                    <th>组织机构</th>
                    <th>操作说明</th>
                    <th>审批结果</th>
                    <th>审批意见</th>
                    <th>审批时间</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalFlowRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.step}</td>
                      <td>{row.user}</td>
                      <td>{row.org}</td>
                      <td>{row.action}</td>
                      <td>{row.result}</td>
                      <td>{row.opinion}</td>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {isApprove ? (
            <div className="cert-section">
              <div className="cert-section-title">审批操作</div>
              <div className="cert-form-grid plan-form-two-col demand-form-grid">
                <div className="cert-field-item">
                  <div className="cert-field-label"><span className="required-mark">*</span>审批结论：</div>
                  <div className="cert-field-value">
                    <select className="cert-field-control" defaultValue="审批通过">
                      <option>审批通过</option>
                      <option>审批驳回</option>
                    </select>
                  </div>
                </div>
                <div className="cert-field-item cert-field-item-wide">
                  <div className="cert-field-label"><span className="required-mark">*</span>审批意见：</div>
                  <div className="cert-field-value">
                    <input className="cert-field-control" defaultValue="" placeholder="请输入审批意见" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>{isApprove ? "取消" : "关闭"}</button>
          {isApprove ? <button type="button" className="btn btn-primary">提交审批</button> : null}
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
            <div className="filterbar-item"><div className="filterbar-label">需求名称：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入需求名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">年度：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>2026</option><option>2025</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">主办部室：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>风险室</option><option>体系室</option><option>综合管理室</option><option>过程室</option><option>设备室</option><option>健康室</option><option>督查室</option><option>公共安全室</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">审批状态：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>待审批</option><option>审核中</option><option>审批通过</option><option>审批驳回</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训对象：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训对象" /></div></div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn">导出</button>
          </div>
        </div>
        <div className="filterbar-inline-actions">
          <button type="button" className="btn btn-primary">查询</button>
          <button type="button" className="btn">重置</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="proto-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th>
              <th>序号</th><th>年度</th><th>需求名称</th><th>培训对象</th><th>计划时间</th><th>主办部室</th><th>承办单位</th><th>审批状态</th><th>备注</th><th>登记人</th><th>登记时间</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            {demandRows.map((row) => (
              <tr key={row.id}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.id}</td>
                <td>{row.year}</td>
                <td><button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>{row.name}</button></td>
                <td>{row.target}</td>
                <td>{row.dueDate}</td>
                <td>{row.org}</td>
                <td>{row.undertakeOrg}</td>
                <td>{row.status}</td>
                <td>{row.remark}</td>
                <td>{row.user}</td>
                <td>{row.time}</td>
                <td>
                  <div className="table-op-inline">
                    <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>查看</button>
                    <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "approve")}>审批</button>
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
