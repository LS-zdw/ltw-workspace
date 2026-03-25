import React from "react";
import { useNavigate } from "react-router-dom";

const approvalNodes = [
  { node: "科室负责人审批", owner: "风险隐患室科长（刘朔）", status: "已通过", at: "2026-01-11 10:30" },
  { node: "安环部分管审批", owner: "安环部分管（周良峰）", status: "处理中", at: "2026-01-11 14:00" },
  { node: "相关单位会签", owner: "运行/施工/计划处", status: "待处理", at: "-" }
];

export default function Page() {
  const navigate = useNavigate();
  const projectName = new URLSearchParams(window.location.search).get("project") || "";
  const total = approvalNodes.length;
  const page = 1;
  const totalPages = 1;

  return (
    <div className="stack stpm-page">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">项目维护-审批与会签</div>
            <div className="card-desc">第三步：审批节点 + 会签结果</div>
          </div>
        </div>
        <div className="card-bd">
          <div className="pill">
            <div className="k">项目名称</div>
            <div className="v">{projectName || "未选择项目"}</div>
          </div>

          <div className="table-wrap mt-10">
            <table className="proto-table" style={{ minWidth: "100%" }}>
              <thead>
                <tr>
                  <th>节点</th>
                  <th>处理人/会签人</th>
                  <th>状态</th>
                  <th>处理时间</th>
                </tr>
              </thead>
              <tbody>
                {approvalNodes.map((row) => (
                  <tr key={row.node}>
                    <td>{row.node}</td>
                    <td>{row.owner}</td>
                    <td>{row.status}</td>
                    <td>{row.at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="stpm-main-pager">
            <div className="stpm-main-pager-total">共 {total} 条记录 第 {page} / {totalPages} 页</div>
            <div className="stpm-main-pager-controls">
              <button type="button" className="stpm-main-page-btn" disabled>‹</button>
              <button type="button" className="stpm-main-page-btn active">1</button>
              <button type="button" className="stpm-main-page-btn" disabled>›</button>
              <select className="stpm-main-page-size" value={10} onChange={() => {}}>
                <option value={10}>10条/页</option>
              </select>
            </div>
          </div>

          <div className="detail-section mt-10">
            <div className="detail-section-title">审批意见</div>
            <div className="detail-form-grid">
              <div className="detail-form-item" style={{ gridColumn: "1 / -1" }}>
                <div className="detail-form-key"><span className="required-mark">*</span>审批意见</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue="同意，进入会签流程。" /></div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">附件</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue="会签说明.docx" /></div>
              </div>
            </div>
          </div>

          <div className="modal-ft">
            <button type="button" className="btn" onClick={() => navigate("/san-tongshi/project-maintenance")}>返回</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/san-tongshi/project-maintenance")}>审批通过并返回</button>
          </div>
        </div>
      </div>
    </div>
  );
}
