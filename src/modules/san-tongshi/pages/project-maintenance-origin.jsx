import React from "react";
import { useNavigate } from "react-router-dom";

const rowData = {
  id: 1,
  name: "智能物联网平台建设项目",
  builder: "智能科技建设有限公司",
  stage: "可研阶段",
  status: "已拒绝",
  category: "安全、职业卫生、消防",
  buildType: "改造",
  projectType: "其他",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  block: "专业公司",
  createdAt: "2026-01-01"
};

export default function Page() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const total = 10;
  const page = 1;
  const totalPages = 1;

  return (
    <div className="stack stpm-page">
      <div className="stpm-filter">
        <div className="stpm-filter-row">
          <label className="stpm-item">
            <span>项目名称：</span>
            <input className="stpm-input" placeholder="请输入项目名称" />
          </label>
          <label className="stpm-item">
            <span>项目级别：</span>
            <select className="stpm-input">
              <option>请选择项目级别</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>项目阶段：</span>
            <select className="stpm-input">
              <option>请选择项目阶段</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>专业分类：</span>
            <select className="stpm-input">
              <option>请选择专业分类</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>建设类型：</span>
            <select className="stpm-input">
              <option>请选择建设类型</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>项目类型：</span>
            <select className="stpm-input">
              <option>请选择项目类型</option>
            </select>
          </label>
          <button type="button" className="btn btn-primary stpm-export-btn">导出</button>
        </div>

        <div className="stpm-filter-row">
          <label className="stpm-item">
            <span>是否重点建设工程项目：</span>
            <select className="stpm-input">
              <option>请选择是否重点工程</option>
            </select>
          </label>
          <label className="stpm-item stpm-range-item">
            <span>项目创建时间：</span>
            <div className="stpm-range">
              <input className="stpm-input" placeholder="开始日期" />
              <span>至</span>
              <input className="stpm-input" placeholder="结束日期" />
            </div>
          </label>
          <button type="button" className="btn btn-primary">查询</button>
          <button type="button" className="btn">重置</button>
          <button type="button" className="btn stpm-link-btn">收起 ^</button>
        </div>
      </div>

      <div className="table-wrap stpm-table-wrap">
        <table className="proto-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th>
              <th>序号</th>
              <th>项目名称</th>
              <th>项目建设单位</th>
              <th>项目阶段</th>
              <th>项目状态</th>
              <th>专业分类</th>
              <th>建设类型</th>
              <th>项目类型</th>
              <th>计划开工日期</th>
              <th>计划完工日期</th>
              <th>所属版块</th>
              <th>项目创建时间</th>
            </tr>
          </thead>
          <tbody>
            <tr className="stpm-row-selected">
              <td className="table-checkbox"><input type="checkbox" readOnly /></td>
              <td>{rowData.id}</td>
              <td>
                <button type="button" className="table-link-btn" onClick={() => setShowModal(true)}>
                  {rowData.name}
                </button>
              </td>
              <td>{rowData.builder}</td>
              <td>{rowData.stage}</td>
              <td>{rowData.status}</td>
              <td>{rowData.category}</td>
              <td>{rowData.buildType}</td>
              <td>{rowData.projectType}</td>
              <td>{rowData.startDate}</td>
              <td>{rowData.endDate}</td>
              <td>{rowData.block}</td>
              <td>{rowData.createdAt}</td>
            </tr>
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

      {showModal ? (
        <div className="modal-mask" onClick={() => setShowModal(false)}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">项目详情</div>
              </div>
              <button type="button" className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-section-title">项目基本信息</div>
                <div className="detail-form-grid">
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>所属企业</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="海南炼化" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目名称</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="17万吨SBC项目" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目编码</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="H20018" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目建设单位</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="海南巴陵化工新材料有限公司" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>所属板块</div><div className="detail-form-val"><select className="stpm-yellow"><option>炼化板块</option><option>专业公司</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目级别</div><div className="detail-form-val"><select className="stpm-yellow"><option>一类项目（集团公司级）</option><option>二类项目（事业部级）</option><option>三类项目（企业级）</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目状态</div><div className="detail-form-val"><select className="stpm-yellow"><option>已创建</option><option>已拒绝</option><option>进行中</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目创建日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="2024年2月1日" /></div></div>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-section-title">项目建设信息</div>
                <div className="detail-form-grid">
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>计划开工日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="2024年2月1日" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>计划完工日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="2025年2月1日" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>计划投产日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="2025年2月1日" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>规划年数</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue="1" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>建设类型</div><div className="detail-form-val"><select className="stpm-yellow"><option>迁建</option><option>改造</option><option>新建</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目类型</div><div className="detail-form-val"><select className="stpm-yellow"><option>非煤矿山类项目</option><option>危化类项目</option><option>其他</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目阶段</div><div className="detail-form-val"><select className="stpm-yellow"><option>可研前期</option><option>基础设计阶段</option><option>试运行阶段</option><option>竣工验收阶段</option></select></div></div>
                  <div className="detail-form-item">
                    <div className="detail-form-key"><span className="required-mark">*</span>是否重点工程建设项目</div>
                    <div className="detail-form-val stpm-yesno">
                      <label><input type="radio" name="origin-key-project" /> 是</label>
                      <label><input type="radio" name="origin-key-project" defaultChecked /> 否</label>
                    </div>
                  </div>
                  <div className="detail-form-item">
                    <div className="detail-form-key"><span className="required-mark">*</span>三同时专业分类</div>
                    <div className="detail-form-val stpm-multi">
                      <label><input type="checkbox" defaultChecked /> 安全</label>
                      <label><input type="checkbox" defaultChecked /> 职业卫生</label>
                      <label><input type="checkbox" defaultChecked /> 消防</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={() => setShowModal(false)}>关闭</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate(`/three-same/task/new?projectName=${encodeURIComponent(rowData.name)}`);
                }}
              >
                按此项目创建任务
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
