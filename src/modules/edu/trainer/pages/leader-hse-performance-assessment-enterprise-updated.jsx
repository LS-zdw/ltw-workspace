import React from "react";
import Card from "/src/components/ui/Card.jsx";

const levels = ["初级", "中级"];
const assessmentMethods = ["考试", "访谈", "HSE业绩评价"];

const assessmentRows = [
  { id: 1, org: "镇海炼化", year: "2026", level: "中级", method: "考试", planCount: 68, actualCount: 66, passCount: 64, interviewCount: 12, reporter: "王敏", reportDept: "安全环保部", reportDate: "2026-12-20" },
  { id: 2, org: "茂名石化", year: "2026", level: "初级", method: "访谈", planCount: 54, actualCount: 53, passCount: 50, interviewCount: 9, reporter: "李倩", reportDept: "人力资源部", reportDate: "2026-12-18" },
  { id: 3, org: "洛阳石化", year: "2026", level: "中级", method: "HSE业绩评价", planCount: 46, actualCount: 45, passCount: 43, interviewCount: 10, reporter: "周凯", reportDept: "党委组织部", reportDate: "2026-12-19" },
  { id: 4, org: "九江石化", year: "2026", level: "初级", method: "考试", planCount: 31, actualCount: 30, passCount: 29, interviewCount: 8, reporter: "陈雪", reportDept: "安全环保部", reportDate: "2026-12-16" },
  { id: 5, org: "广州石化", year: "2026", level: "中级", method: "访谈", planCount: 28, actualCount: 28, passCount: 27, interviewCount: 4, reporter: "肖鹏", reportDept: "教育培训中心", reportDate: "2026-12-15" },
  { id: 6, org: "福建联合", year: "2026", level: "初级", method: "HSE业绩评价", planCount: 36, actualCount: 35, passCount: 33, interviewCount: 7, reporter: "赵丽", reportDept: "综合管理部", reportDate: "2026-12-14" },
  { id: 7, org: "仪征化纤", year: "2026", level: "中级", method: "考试", planCount: 42, actualCount: 41, passCount: 39, interviewCount: 6, reporter: "陈涛", reportDept: "安全环保部", reportDate: "2026-12-13" },
  { id: 8, org: "天津石化", year: "2026", level: "初级", method: "访谈", planCount: 33, actualCount: 32, passCount: 31, interviewCount: 5, reporter: "孙佳", reportDept: "人力资源部", reportDate: "2026-12-12" },
  { id: 9, org: "海南炼化", year: "2026", level: "中级", method: "HSE业绩评价", planCount: 25, actualCount: 25, passCount: 24, interviewCount: 3, reporter: "刘洋", reportDept: "安全督查中心", reportDate: "2026-12-11" },
  { id: 10, org: "扬子石化", year: "2026", level: "初级", method: "考试", planCount: 39, actualCount: 38, passCount: 36, interviewCount: 6, reporter: "王博", reportDept: "党群工作部", reportDate: "2026-12-10" },
  { id: 11, org: "燕山石化", year: "2026", level: "中级", method: "访谈", planCount: 44, actualCount: 43, passCount: 41, interviewCount: 8, reporter: "马骏", reportDept: "教育培训中心", reportDate: "2026-12-09" },
  { id: 12, org: "齐鲁石化", year: "2026", level: "初级", method: "HSE业绩评价", planCount: 52, actualCount: 50, passCount: 47, interviewCount: 9, reporter: "张铭", reportDept: "综合管理部", reportDate: "2026-12-08" }
];

function AssessmentModal({ mode = "add", onClose }) {
  const readOnly = mode === "view";
  const title = mode === "add" ? "领导干部HSE履职能力评估情况新增" : mode === "edit" ? "领导干部HSE履职能力评估情况编辑" : "领导干部HSE履职能力评估情况详情";
  const row = assessmentRows[0];

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd">
          <div className="cert-section">
            <div className="cert-section-title">评估情况</div>
            <div className="cert-form-grid">
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>组织机构:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : row.org} placeholder="请输入组织机构" readOnly={readOnly} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>年度:</div>
                <div className="cert-field-value"><select className="cert-field-control" defaultValue={mode === "add" ? "2026" : row.year} disabled={readOnly}><option>2026</option><option>2025</option><option>2024</option></select></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>层级:</div>
                <div className="cert-field-value"><select className="cert-field-control" defaultValue={mode === "add" ? "初级" : row.level} disabled={readOnly}>{levels.map((item) => <option key={item}>{item}</option>)}</select></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>评估方式:</div>
                <div className="cert-field-value"><select className="cert-field-control" defaultValue={mode === "add" ? "考试" : row.method} disabled={readOnly}>{assessmentMethods.map((item) => <option key={item}>{item}</option>)}</select></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>计划评估人数:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : row.planCount} placeholder="请输入人数" readOnly={readOnly} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>实际评估人数:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : row.actualCount} placeholder="请输入人数" readOnly={readOnly} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>评估通过人数:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : row.passCount} placeholder="请输入人数" readOnly={readOnly} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>调岗或约谈人数:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : row.interviewCount} placeholder="请输入人数" readOnly={readOnly} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记人:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "系统自动带出" : row.reporter} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记部门:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "系统自动带出" : row.reportDept} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记日期:</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "系统自动带出" : row.reportDate} readOnly /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>{readOnly ? "关闭" : "取消"}</button>
          {readOnly ? null : <button type="button" className="btn btn-primary" onClick={onClose}>保存</button>}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [modalType, setModalType] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(assessmentRows.length / pageSize);
  const pageRows = assessmentRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">组织机构</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入组织机构" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">年度</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="2026"><option>2026</option><option>2025</option><option>2024</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">层级</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option>{levels.map((item) => <option key={item}>{item}</option>)}</select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">评估方式</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option>{assessmentMethods.map((item) => <option key={item}>{item}</option>)}</select></div></div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-actions filterbar-actions-left">
            <button type="button" className="btn btn-primary" onClick={() => setModalType("add")}>新增</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        </div>
      </div>

      <Card title="领导干部HSE履职能力评估情况" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th><th>组织机构</th><th>年度</th><th>层级</th><th>评估方式</th><th>计划评估人数</th><th>实际评估人数</th><th>评估通过人数</th><th>调岗或约谈人数</th><th>登记人</th><th>登记部门</th><th>登记日期</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <tr key={row.id}>
                  <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                  <td>{row.id}</td>
                  <td>{row.org}</td>
                  <td>{row.year}</td>
                  <td>{row.level}</td>
                  <td>{row.method}</td>
                  <td>{row.planCount}</td>
                  <td>{row.actualCount}</td>
                  <td>{row.passCount}</td>
                  <td>{row.interviewCount}</td>
                  <td>{row.reporter}</td>
                  <td>{row.reportDept}</td>
                  <td>{row.reportDate}</td>
                  <td>
                    <div className="table-op-inline">
                      <button type="button" className="table-link-btn" onClick={() => setModalType("view")}>查看</button>
                      <button type="button" className="table-link-btn" onClick={() => setModalType("edit")}>编辑</button>
                      <button type="button" className="table-link-btn danger">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="stpm-main-pager">
        <div className="stpm-main-pager-total">共 {assessmentRows.length} 条记录 第 {currentPage} / {totalPages} 页</div>
        <div className="stpm-main-pager-controls">
          <button type="button" className="stpm-main-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>‹</button>
          <button type="button" className={`stpm-main-page-btn${currentPage === 1 ? " active" : ""}`} onClick={() => setCurrentPage(1)}>1</button>
          <button type="button" className={`stpm-main-page-btn${currentPage === 2 ? " active" : ""}`} onClick={() => setCurrentPage(2)}>2</button>
          <button type="button" className="stpm-main-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>›</button>
          <select className="stpm-main-page-size" defaultValue="10"><option value="10">10条/页</option></select>
        </div>
      </div>

      {modalType ? <AssessmentModal mode={modalType} onClose={() => setModalType("")} /> : null}
    </div>
  );
}
