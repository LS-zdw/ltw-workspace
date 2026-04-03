import React from "react";
import { useNavigate } from "react-router-dom";

const projectRows = [
  {
    id: 1,
    company: "海南炼化",
    code: "HNLH-2026-001",
    name: "120万吨/年乙烯装置优化改造项目",
    builder: "海南炼化有限责任公司",
    level: "一类项目（集团公司级）",
    stage: "基础设计阶段",
    status: "进行中",
    category: "安全、职业卫生、消防",
    buildType: "改造",
    projectType: "危化类项目",
    startDate: "2026-03-01",
    endDate: "2027-06-30",
    produceDate: "2027-09-30",
    planningYears: "2",
    block: "炼油",
    keyProject: "是",
    createdAt: "2026-02-18"
  },
  {
    id: 2,
    company: "茂名石化",
    code: "MMSH-2026-007",
    name: "公用工程系统节能提效改造项目",
    builder: "茂名石化公司",
    level: "二类项目（事业部级）",
    stage: "可研前期",
    status: "已创建",
    category: "安全、消防",
    buildType: "改造",
    projectType: "其他",
    startDate: "2026-05-01",
    endDate: "2026-12-31",
    produceDate: "2027-01-20",
    planningYears: "1",
    block: "炼化工程",
    keyProject: "否",
    createdAt: "2026-03-03"
  },
  {
    id: 3,
    company: "镇海炼化",
    code: "ZHLH-2026-015",
    name: "罐区智能巡检及联锁完善项目",
    builder: "镇海炼化分公司",
    level: "三类项目（企业级）",
    stage: "可研前期",
    status: "已拒绝",
    category: "安全、消防",
    buildType: "新建",
    projectType: "其他",
    startDate: "2026-04-15",
    endDate: "2026-11-30",
    produceDate: "2026-12-20",
    planningYears: "1",
    block: "炼油",
    keyProject: "否",
    createdAt: "2026-03-05"
  },
  {
    id: 4,
    company: "扬子石化",
    code: "YZSH-2026-003",
    name: "芳烃装置安全联锁升级项目",
    builder: "扬子石化有限责任公司",
    level: "二类项目（事业部级）",
    stage: "试运行阶段",
    status: "进行中",
    category: "安全、职业卫生",
    buildType: "改造",
    projectType: "危化类项目",
    startDate: "2025-11-20",
    endDate: "2026-08-30",
    produceDate: "2026-09-20",
    planningYears: "1",
    block: "化工",
    keyProject: "是",
    createdAt: "2025-10-28"
  },
  {
    id: 5,
    company: "齐鲁石化",
    code: "QLSH-2026-011",
    name: "危化品仓储能力提升项目",
    builder: "齐鲁石化分公司",
    level: "三类项目（企业级）",
    stage: "竣工验收阶段",
    status: "进行中",
    category: "安全、消防",
    buildType: "迁建",
    projectType: "危化类项目",
    startDate: "2025-07-01",
    endDate: "2026-04-30",
    produceDate: "2026-06-01",
    planningYears: "1",
    block: "化工",
    keyProject: "否",
    createdAt: "2025-06-15"
  },
  {
    id: 6,
    company: "燕山石化",
    code: "YSSH-2026-009",
    name: "检维修作业中心扩建项目",
    builder: "燕山石化公司",
    level: "三类项目（企业级）",
    stage: "基础设计阶段",
    status: "进行中",
    category: "安全、职业卫生",
    buildType: "新建",
    projectType: "其他",
    startDate: "2026-02-10",
    endDate: "2027-02-28",
    produceDate: "2027-03-30",
    planningYears: "2",
    block: "炼化工程",
    keyProject: "否",
    createdAt: "2026-01-26"
  },
  {
    id: 7,
    company: "金陵石化",
    code: "JLSH-2026-004",
    name: "硫磺回收装置升级项目",
    builder: "金陵石化有限责任公司",
    level: "二类项目（事业部级）",
    stage: "可研前期",
    status: "已创建",
    category: "安全、职业卫生、消防",
    buildType: "改造",
    projectType: "危化类项目",
    startDate: "2026-06-01",
    endDate: "2027-03-31",
    produceDate: "2027-05-15",
    planningYears: "2",
    block: "炼油",
    keyProject: "是",
    createdAt: "2026-03-08"
  },
  {
    id: 8,
    company: "九江石化",
    code: "JJSH-2026-006",
    name: "污水处理系统提标改造项目",
    builder: "九江石化公司",
    level: "三类项目（企业级）",
    stage: "基础设计阶段",
    status: "进行中",
    category: "职业卫生、消防",
    buildType: "改造",
    projectType: "其他",
    startDate: "2026-03-18",
    endDate: "2026-12-31",
    produceDate: "2027-01-31",
    planningYears: "1",
    block: "科研",
    keyProject: "否",
    createdAt: "2026-03-10"
  },
  {
    id: 9,
    company: "天津石化",
    code: "TJSH-2026-002",
    name: "加氢裂化装置更新改造项目",
    builder: "天津石化公司",
    level: "一类项目（集团公司级）",
    stage: "试运行阶段",
    status: "进行中",
    category: "安全、职业卫生",
    buildType: "改造",
    projectType: "危化类项目",
    startDate: "2025-09-01",
    endDate: "2026-09-30",
    produceDate: "2026-11-15",
    planningYears: "2",
    block: "炼油",
    keyProject: "是",
    createdAt: "2025-08-20"
  },
  {
    id: 10,
    company: "上海石化",
    code: "SHSH-2026-013",
    name: "化工管廊完整性治理项目",
    builder: "上海石化股份有限公司",
    level: "二类项目（事业部级）",
    stage: "可研前期",
    status: "已创建",
    category: "安全、消防",
    buildType: "改造",
    projectType: "其他",
    startDate: "2026-07-01",
    endDate: "2027-01-31",
    produceDate: "2027-03-01",
    planningYears: "1",
    block: "化工",
    keyProject: "否",
    createdAt: "2026-03-12"
  }
];

export default function Page() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [activeRow, setActiveRow] = React.useState(projectRows[0]);
  const total = projectRows.length;
  const page = 1;
  const totalPages = 1;
  const canDrill = (id) => id === 1;

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
              <option>一类项目（集团公司级）</option>
              <option>二类项目（事业部级）</option>
              <option>三类项目（企业级）</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>项目阶段：</span>
            <select className="stpm-input">
              <option>请选择项目阶段</option>
              <option>可研前期</option>
              <option>基础设计阶段</option>
              <option>试运行阶段</option>
              <option>竣工验收阶段</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>专业分类：</span>
            <select className="stpm-input">
              <option>请选择专业分类</option>
              <option>安全</option>
              <option>职业卫生</option>
              <option>消防</option>
              <option>安全、职业卫生、消防</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>建设类型：</span>
            <select className="stpm-input">
              <option>请选择建设类型</option>
              <option>新建</option>
              <option>改造</option>
              <option>迁建</option>
            </select>
          </label>
          <label className="stpm-item">
            <span>项目类型：</span>
            <select className="stpm-input">
              <option>请选择项目类型</option>
              <option>危化类项目</option>
              <option>非煤矿山类项目</option>
              <option>其他</option>
            </select>
          </label>
          <button type="button" className="btn btn-primary stpm-export-btn">导出</button>
        </div>

        <div className="stpm-filter-row">
          <label className="stpm-item">
            <span>是否重点建设工程项目：</span>
            <select className="stpm-input">
              <option>请选择是否重点工程</option>
              <option>是</option>
              <option>否</option>
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
            {projectRows.map((row) => (
              <tr key={row.id} className={row.id === 1 ? "stpm-row-selected" : undefined}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.id}</td>
                <td>
                  <button
                    type="button"
                    className="table-link-btn"
                    onClick={() => {
                      if (!canDrill(row.id)) return;
                      setActiveRow(row);
                      setShowModal(true);
                    }}
                  >
                    {row.name}
                  </button>
                </td>
                <td>{row.builder}</td>
                <td>{row.stage}</td>
                <td>{row.status}</td>
                <td>{row.category}</td>
                <td>{row.buildType}</td>
                <td>{row.projectType}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
                <td>{row.block}</td>
                <td>{row.createdAt}</td>
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
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>所属企业</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.company} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目名称</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.name} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目编码</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.code} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目建设单位</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.builder} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>所属板块</div><div className="detail-form-val"><select className="stpm-yellow" value={activeRow.block} onChange={() => {}}><option>石油工程</option><option>炼油</option><option>化工</option><option>销售</option><option>炼化工程</option><option>科研</option><option>其他</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目级别</div><div className="detail-form-val"><select className="stpm-yellow" value={activeRow.level} onChange={() => {}}><option>一类项目（集团公司级）</option><option>二类项目（事业部级）</option><option>三类项目（企业级）</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目状态</div><div className="detail-form-val"><select className="stpm-yellow" value={activeRow.status} onChange={() => {}}><option>已创建</option><option>已拒绝</option><option>进行中</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目创建日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.createdAt} /></div></div>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-section-title">项目建设信息</div>
                <div className="detail-form-grid">
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>计划开工日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.startDate} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>计划完工日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.endDate} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>计划投产日期</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.produceDate} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>规划年数</div><div className="detail-form-val"><input className="stpm-yellow" defaultValue={activeRow.planningYears} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>建设类型</div><div className="detail-form-val"><select className="stpm-yellow" value={activeRow.buildType} onChange={() => {}}><option>迁建</option><option>改造</option><option>新建</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目类型</div><div className="detail-form-val"><select className="stpm-yellow" value={activeRow.projectType} onChange={() => {}}><option>非煤矿山类项目</option><option>危化类项目</option><option>其他</option></select></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目阶段</div><div className="detail-form-val"><select className="stpm-yellow" value={activeRow.stage} onChange={() => {}}><option>可研前期</option><option>基础设计阶段</option><option>试运行阶段</option><option>竣工验收阶段</option></select></div></div>
                  <div className="detail-form-item">
                    <div className="detail-form-key"><span className="required-mark">*</span>是否重点工程建设项目</div>
                    <div className="detail-form-val stpm-yesno">
                      <label><input type="radio" name="origin-key-project" checked={activeRow.keyProject === "是"} readOnly /> 是</label>
                      <label><input type="radio" name="origin-key-project" checked={activeRow.keyProject === "否"} readOnly /> 否</label>
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
                  navigate(`/three-same/task/new?projectName=${encodeURIComponent(activeRow.name)}`);
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
