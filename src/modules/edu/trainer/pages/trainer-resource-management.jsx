import React from "react";

const trainerRows = [
  { id: 1, name: "梁海江", org: "中科炼化", level: "中级", phone: "15001213760", intro: "长期从事安全培训工作", skill: "环境保护、风险辨识", hours: "86", cert: "焊工证、注安师证...", score: "98%" },
  { id: 2, name: "方月蒙", org: "茂名石化", level: "中级", phone: "15537290777", intro: "具备丰富授课经验", skill: "电器安全、设备完整性", hours: "74", cert: "安全管理资格证", score: "97%" },
  { id: 3, name: "张亮", org: "中科炼化", level: "高级", phone: "13681525946", intro: "长期从事现场培训", skill: "高处作业、工艺安全", hours: "103", cert: "43567534、...", score: "99%" },
  { id: 4, name: "尤红玉", org: "中科炼化", level: "高级", phone: "18010180072", intro: "擅长实操授课", skill: "设备完整性、应急管理", hours: "92", cert: "特种作业操作证...", score: "96%" },
  { id: 5, name: "卢伟", org: "华北分公司", level: "中级", phone: "13811220011", intro: "炼化培训讲师", skill: "工艺报警管理", hours: "65", cert: "安全管理证", score: "95%" },
  { id: 6, name: "杨青", org: "西北分公司", level: "初级", phone: "13911330022", intro: "班组培训骨干", skill: "作业许可", hours: "58", cert: "焊接作业证", score: "93%" },
  { id: 7, name: "李卓", org: "华东分公司", level: "中级", phone: "13711440033", intro: "课程开发", skill: "JSA分析", hours: "72", cert: "注册安全工程师", score: "94%" },
  { id: 8, name: "谢峰", org: "华南分公司", level: "高级", phone: "13611550044", intro: "危化专业", skill: "危化品管理", hours: "110", cert: "特种作业证", score: "98%" },
  { id: 9, name: "周凯", org: "西南分公司", level: "中级", phone: "13511660055", intro: "现场实操", skill: "动火作业", hours: "84", cert: "监护人证", score: "96%" },
  { id: 10, name: "陈涛", org: "东北分公司", level: "初级", phone: "13411770066", intro: "新任讲师", skill: "班组活动", hours: "40", cert: "培训讲师证", score: "92%" }
];

const defaultForm = {
  source: "中石化系统内部",
  name: "梁海江",
  org: "中科炼化",
  level: "中级",
  phone: "15001213760",
  city: "自动带出",
  intro: "长期从事安全培训工作",
  skill: ""
};

const certRows = [
  ["焊工证", "集团公司发证", "ZX-2023-00991", "特种作业", "焊接与热切割", "2024-10-04", "2027-10-03", "否", "安全管理培训", "查看"],
  ["注安师证", "国家/地方政府发证", "ZA-2022-10111", "职业资格", "注册安全工程师", "2022-05-01", "2027-04-30", "否", "HSE管理课程", "查看"]
];

const teachRows = [
  ["危化品作业票风险识别", "面授", "8", "2026-01-10", "35", "受限空间作业风险控制", "98%"],
  ["高处作业监护要点", "面授", "4", "2026-02-18", "28", "典型违章案例复盘", "97%"]
];

function TrainerEditModal({ mode = "edit", onClose }) {
  const readOnly = mode === "view";
  const showTeaching = mode !== "add";
  const title = mode === "add" ? "培训师资新增" : mode === "view" ? "查看培训师资" : "编辑培训师资";
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd" style={{ maxHeight: "72vh", overflow: "auto" }}>
          <div className="cert-section">
            <div className="cert-section-title">师资基本信息</div>
            <div className="cert-form-grid">
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>师资来源：</div>
                <div className="cert-field-value">
                  <label className="detail-radio"><input type="radio" name="source" defaultChecked={defaultForm.source === "中石化系统外部"} disabled={readOnly} /> 中石化系统外部</label>
                  <label className="detail-radio"><input type="radio" name="source" defaultChecked={defaultForm.source === "中石化系统内部"} disabled={readOnly} /> 中石化系统内部</label>
                </div>
              </div>

              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>姓名：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : defaultForm.name} placeholder="请输入人员姓名" disabled={readOnly} /><span style={{ color: "#98a2b3", marginLeft: 8 }}>0/20</span></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">单位：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : defaultForm.org} placeholder="输入工作单位" disabled={readOnly} /><span style={{ color: "#98a2b3", marginLeft: 8 }}>0/30</span></div>
              </div>

              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>师资等级：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" defaultValue={mode === "add" ? "请选择" : defaultForm.level} disabled={readOnly}>
                    <option>请选择</option>
                    <option>初级</option>
                    <option>中级</option>
                    <option>高级</option>
                  </select>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>联系方式：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : defaultForm.phone} placeholder="请输入手机号" disabled={readOnly} /></div>
              </div>

              <div className="cert-field-item">
                <div className="cert-field-label">所在城市：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={mode === "add" ? "" : defaultForm.city} placeholder="自动带出" disabled={readOnly} /></div>
              </div>
              <div className="cert-field-item" />

              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>人员简介：</div>
                <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" defaultValue={mode === "add" ? "" : defaultForm.intro} placeholder="请输入人员简介" disabled={readOnly} /><span style={{ color: "#98a2b3", marginLeft: 8 }}>0/100</span></div>
              </div>

              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>擅长领域：</div>
                <div className="cert-field-value">
                  <div className="cert-checklist">
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 工艺安全（PSM）</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 设备完整性</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 危险化学品管理</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 防火防爆</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 电器安全</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 机械设备安全</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 应急管理</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 动火作业</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 高处作业</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 受限空间</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 职业健康</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 环境保护</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 安全行为（BBS）</label>
                    <label className="cert-check-item"><input type="checkbox" disabled={readOnly} /> 事故调查</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="cert-section">
            <div className="cert-section-title">师资证书信息</div>
            <div className="table-wrap">
              <table className="proto-table">
                <thead>
                  <tr>
                    <th>证书名称</th><th>发证机关级别</th><th>证书编码</th><th>证书种类</th><th>证书小类</th><th>证书生效日期</th><th>证书有效期</th><th>是否异常</th><th>关联培训项目</th><th>证书附件</th>
                  </tr>
                </thead>
                <tbody>
                  {(mode === "add" ? [] : certRows).map((r, i) => (
                    <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>
                  ))}
                  {mode === "add" ? <tr><td colSpan={10} style={{ textAlign: "center", color: "#666" }}>暂无数据</td></tr> : null}
                </tbody>
              </table>
            </div>
          </div>

          {showTeaching ? (
            <div className="cert-section">
              <div className="cert-section-title">授课记录</div>
              <div className="filterbar-inline-actions" style={{ marginBottom: 10 }}>
                <div className="filterbar-item">
                  <div className="filterbar-label">培训开始日期：</div>
                  <div className="filterbar-input">
                    <div className="filterbar-range">
                      <input className="filterbar-control" placeholder="开始日期" defaultValue="" />
                      <span className="filterbar-range-sep">-</span>
                      <input className="filterbar-control" placeholder="结束日期" defaultValue="" />
                    </div>
                  </div>
                </div>
                <button type="button" className="btn btn-primary">查询</button>
                <button type="button" className="btn">重置</button>
              </div>

              <div className="grid grid-4" style={{ marginBottom: 10 }}>
                <div className="pill"><div className="k">总授课次数：</div><div className="v">70</div></div>
                <div className="pill"><div className="k">总授课课时：</div><div className="v">30</div></div>
                <div className="pill"><div className="k">平均满意度：</div><div className="v">5</div></div>
              </div>

              <div className="table-wrap">
                <table className="proto-table">
                  <thead>
                    <tr><th>培训班名称</th><th>培训方式</th><th>课时</th><th>培训开始日期</th><th>学员人数</th><th>培训内容</th><th>学员满意度</th></tr>
                  </thead>
                  <tbody>{teachRows.map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>关闭</button>
          {readOnly ? null : <button type="button" className="btn btn-primary" onClick={onClose}>保存</button>}
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
            <div className="filterbar-item"><div className="filterbar-label">姓名：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入姓名" defaultValue="" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">师资等级：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择"><option>请选择</option><option>初级</option><option>中级</option><option>高级</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">擅长领域：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择"><option>请选择</option><option>环境保护</option><option>设备完整性</option><option>工艺安全</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">按学员满意度排序：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择排序"><option>请选择排序</option><option>从高到低</option><option>从低到高</option></select></div></div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-actions filterbar-actions-left">
            <button type="button" className="btn btn-primary" onClick={() => setModalType("add")}>新增</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="proto-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th>
              <th>序号</th><th>姓名</th><th>单位</th><th>师资等级</th><th>联系方式</th><th>人员简介</th><th>擅长领域</th><th>历史授课课时</th><th>证书</th><th>近一年学员满意度</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            {trainerRows.map((row) => (
              <tr key={row.id}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.id}</td>
                <td><button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>{row.name}</button></td>
                <td>{row.org}</td><td>{row.level}</td><td>{row.phone}</td><td>{row.intro}</td><td>{row.skill}</td><td>{row.hours}</td><td>{row.cert}</td><td>{row.score}</td>
                <td>
                  <div style={{ display: "flex", gap: 10 }}>
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

      {modalType ? <TrainerEditModal mode={modalType} onClose={() => setModalType("")} /> : null}
    </div>
  );
}
