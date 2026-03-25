import React from "react";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();
  const projectName = new URLSearchParams(window.location.search).get("project") || "";

  return (
    <div className="stack stpm-page">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">项目维护-创建识别</div>
            <div className="card-desc">第二步：任务创建与专业识别</div>
          </div>
        </div>
        <div className="card-bd">
          <div className="detail-section">
            <div className="detail-section-title">任务创建与专业识别</div>
            <div className="detail-form-grid">
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>项目名称</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue={projectName} /></div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>项目类型识别</div>
                <div className="detail-form-val">
                  <select className="stpm-yellow">
                    <option>危化类项目</option>
                    <option>非煤矿山类项目</option>
                    <option>其他</option>
                  </select>
                </div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>责任人</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue="刘明" /></div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>可研计划日期</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue="2024-02-01" /></div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>基础设计日期</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue="2024-06-01" /></div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>试运行日期</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue="2025-01-01" /></div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>竣工验收日期</div>
                <div className="detail-form-val"><input className="stpm-yellow" defaultValue="2025-03-01" /></div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key"><span className="required-mark">*</span>三同时专业类型</div>
                <div className="detail-form-val stpm-multi">
                  <label><input type="checkbox" defaultChecked /> 安全</label>
                  <label><input type="checkbox" defaultChecked /> 职业卫生</label>
                  <label><input type="checkbox" defaultChecked /> 消防</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-ft">
            <button type="button" className="btn" onClick={() => navigate("/san-tongshi/project-maintenance")}>返回</button>
            <button type="button" className="btn btn-primary" onClick={() => navigate(`/san-tongshi/task-approval?project=${encodeURIComponent(projectName)}`)}>提交并发起审批</button>
          </div>
        </div>
      </div>
    </div>
  );
}

