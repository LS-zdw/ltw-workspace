import React from "react";

function HqGroupedBarChart({ categories = [], series = [], yMax = 100 }) {
  const ticks = [100, 80, 60, 40, 20, 0];
  return (
    <div className="hq-barchart">
      <div className="hq-barchart-y">
        {ticks.map((t) => (
          <div key={t} className="hq-barchart-y-tick">{t}</div>
        ))}
      </div>
      <div className="hq-barchart-main">
        <div className="hq-barchart-grid">
          {ticks.map((t) => (
            <div key={t} className="hq-barchart-grid-line"></div>
          ))}
        </div>
        <div className="hq-barchart-cats">
          {categories.map((cat, idx) => (
            <div key={cat + idx} className="hq-barchart-cat">
              <div className="hq-barchart-bars">
                {series.map((s) => {
                  const v = Array.isArray(s.values) ? Number(s.values[idx] || 0) : 0;
                  const h = Math.max(2, Math.round((v / yMax) * 100));
                  return (
                    <div key={s.name + idx} className="hq-barchart-bar-wrap">
                      <div className={`hq-barchart-bar ${s.color || "blue"}`} style={{ height: h + "%" }}></div>
                    </div>
                  );
                })}
              </div>
              <div className="hq-barchart-label">{cat}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HqTopDeptCompletionChart({ items = [], onDrill }) {
  const yTicks = [20, 16, 12, 8, 4, 0];
  const yMax = yTicks[0];
  return (
    <div className="hq-top-dept-chart">
      <button type="button" className="hq-top-dept-title hq-linklike hq-drill-trigger" onClick={onDrill}>
        总部各部室培训完成情况（<span className="hq-top-dept-title-done">12</span>/<span className="hq-top-dept-title-total">20</span>）
      </button>
      <div className="hq-top-dept-legend">
        <span className="hq-top-dept-legend-item"><i className="hq-top-dept-dot total"></i>项目总数</span>
        <span className="hq-top-dept-legend-item"><i className="hq-top-dept-dot done"></i>项目完成数</span>
      </div>
      <div className="hq-top-dept-main">
        <div className="hq-top-dept-left-axis">
          <div className="hq-top-dept-axis-label">项目数</div>
          <div className="hq-top-dept-y">
            {yTicks.map((tick) => (
              <div key={tick} className="hq-top-dept-y-tick">{tick}</div>
            ))}
          </div>
        </div>
        <div className="hq-top-dept-plot">
          <div className="hq-top-dept-grid">
            {yTicks.slice(0, -1).map((tick) => (
              <div key={tick} className="hq-top-dept-grid-line"></div>
            ))}
          </div>
          <div className="hq-top-dept-bars">
            {items.map((item, idx) => {
              const total = Number(item.total || 0);
              const done = Number(item.done || 0);
              const totalHeight = Math.max(2, Math.round((total / yMax) * 100));
              const doneHeight = Math.max(2, Math.round((done / yMax) * 100));
              return (
                <div key={`${item.name}-${idx}`} className="hq-top-dept-col">
                  <div className="hq-top-dept-col-bars">
                    <div className="hq-top-dept-bar-wrap" style={{ height: `${totalHeight}%` }}>
                      <div className="hq-top-dept-bar total"></div>
                      <span className="hq-top-dept-bar-num">{total}</span>
                    </div>
                    <div className="hq-top-dept-bar-wrap" style={{ height: `${doneHeight}%` }}>
                      <div className="hq-top-dept-bar done"></div>
                      <span className="hq-top-dept-bar-num">{done}</span>
                    </div>
                  </div>
                  <div className="hq-top-dept-label">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function HqDrillModal({ open, title, showSearch = false, columns = [], rows = [], onClose }) {
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl hq-drill-modal hq-drill-modal-v5" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-bd">
          {showSearch ? (
            <div className="hq-query">
              <input className="filterbar-control" placeholder="项目代码" defaultValue="" />
              <input className="filterbar-control" placeholder="项目名称" defaultValue="" />
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          ) : null}
          <div className="hq-drill-actions">
            <button type="button" className="btn btn-primary">导出</button>
          </div>
          <div className="table-wrap">
            <table className="proto-table">
              <thead>
                <tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="hq-drill-pager">共 400 条　10条/页　&lt;　1　&gt;</div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>返回</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>确认</button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [drillModal, setDrillModal] = React.useState("");
  const cats = ["油田", "炼化", "销售", "石油工程", "炼化工程", "科研", "其他"];
  const topMetricRanks = [
    { company: "镇海炼化", score: 96 },
    { company: "湖南石化", score: 95 },
    { company: "茂名石化", score: 94 },
    { company: "齐鲁石化", score: 94 },
    { company: "扬子石化", score: 94 }
  ];
  const topDeptItems = [
    { name: "风险室", total: 6, done: 4 },
    { name: "体系室", total: 5, done: 3 },
    { name: "综管室", total: 4, done: 2 },
    { name: "公共安全室", total: 5, done: 3 }
  ];
  const archiveSeries = [
    { name: "培训档案数量", color: "blue", values: [42, 46, 65, 46, 65, 46, 46] },
    { name: "培训总时长", color: "cyan", values: [36, 35, 36, 36, 36, 36, 36] },
    { name: "培训档案更新率", color: "green", values: [52, 54, 72, 54, 72, 54, 54] },
    { name: "培训覆盖率", color: "purple", values: [65, 66, 28, 65, 28, 65, 65] }
  ];
  const evalSeries = [
    { name: "计划评估人数", color: "blue", values: [45, 45, 65, 45, 65, 45, 45] },
    { name: "评估通过人数", color: "cyan", values: [36, 36, 36, 36, 36, 36, 36] },
    { name: "调岗或约谈人数", color: "green", values: [54, 54, 72, 54, 72, 54, 54] }
  ];
  const feeSeries = [
    { name: "总费用", color: "blue", values: [45, 45, 65, 45, 65, 45, 45] },
    { name: "办班相关费用", color: "cyan", values: [36, 36, 36, 36, 36, 36, 36] },
    { name: "购买设备设施及软件开发费", color: "green", values: [52, 52, 72, 52, 72, 52, 52] },
    { name: "培训基地建设费用", color: "purple", values: [65, 65, 28, 65, 28, 65, 65] }
  ];
  const drillConfigs = {
    metric: {
      title: "培训综合指标",
      columns: ["序号", "企业", "培训计划完成率（40%）", "证书失效预警人次（30%）", "关键岗位持证率（20%）", "年度报告评分（10%）", "综合绩效"],
      rows: [
        ["1", "镇海炼化", "100%", "99%", "97%", "98%", "98.89"],
        ["2", "湖南石化", "100%", "99%", "97%", "98%", "98.89"],
        ["3", "茂名石化", "100%", "99%", "97%", "98%", "98.89"]
      ]
    },
    plan: {
      title: "企业培训计划完成情况",
      tip: "点击项目数（12/20），可穿透查看总部层级组织的所有培训项目列表，且可搜索、导出",
      showSearch: true,
      columns: ["序号", "项目代码", "项目名称", "培训对象", "天数", "计划时间", "实施时间", "计划期次", "完成期次", "计划人数", "实际参与人数", "培训合格率", "主办部门", "承办单位"],
      rows: [
        ["1", "PJ202601001", "风险辨识专题培训", "安全管理人员", "2", "2026-01-10", "2026-01-12", "1", "1", "60", "58", "97%", "总部安环部", "培训中心"],
        ["2", "PJ202601002", "体系文件宣贯培训", "内审员", "1", "2026-01-18", "2026-01-18", "1", "1", "45", "45", "100%", "质量管理部", "培训中心"],
        ["3", "PJ202601003", "应急预案演练培训", "应急骨干", "2", "2026-02-03", "2026-02-05", "1", "1", "50", "49", "98%", "公共安全室", "应急中心"],
        ["4", "PJ202601004", "新员工三级安全教育", "新入职员工", "1", "2026-02-10", "2026-02-10", "2", "2", "120", "117", "98%", "人力资源部", "培训中心"],
        ["5", "PJ202601005", "特殊作业票证培训", "作业监护人", "1", "2026-02-17", "2026-02-17", "1", "1", "80", "76", "95%", "生产运行部", "培训中心"],
        ["6", "PJ202601006", "新员工三级教育", "新员工", "3", "2026-03-01", "2026-03-03", "3", "2", "90", "62", "89%", "人力资源部", "培训中心"],
        ["7", "PJ202601007", "危化品管理培训", "仓储岗位", "1", "2026-03-08", "2026-03-08", "1", "1", "36", "36", "100%", "仓储物流部", "培训中心"],
        ["8", "PJ202601008", "高处作业安全培训", "检维修人员", "1", "2026-03-15", "2026-03-15", "2", "1", "72", "40", "90%", "设备管理部", "检维修中心"],
        ["9", "PJ202601009", "事故案例复盘培训", "班组长", "1", "2026-03-20", "2026-03-20", "1", "1", "64", "61", "95%", "综管室", "培训中心"],
        ["10", "PJ202601010", "消防器材实操培训", "消防员", "1", "2026-03-24", "2026-03-24", "1", "1", "28", "28", "100%", "公共安全室", "消防站"]
      ]
    },
    cert: {
      title: "人员取证情况",
      columns: ["序号", "企业", "主要负责人是否持证", "关键岗位持证率", "安全管理人员数量/持证上岗率", "安全管理人员注安师数量/配置率", "特种作业人员数量/持证上岗率"],
      rows: [
        ["1", "镇海炼化", "是", "97%", "1999/100%", "789/100%", "890/100%"],
        ["2", "湖南石化", "是", "97%", "", "", "890/100%"]
      ]
    },
    trainee: {
      title: "新员工三级安全教育和培训情况-新员工",
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "新员工", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "10", "", "", "", "100%"]
      ]
    },
    transfer: {
      title: "新员工三级安全教育和培训情况-转岗人员",
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "16", "转岗人员", "转岗安全适应性培训", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "12", "转岗人员", "岗位变更风险提示培训", "2024年09月18日", "100%"]
      ]
    },
    intern: {
      title: "新员工三级安全教育和培训情况-实习生",
      columns: ["序号", "年度", "企业", "参加人员数量", "人员分类", "培训项目名称", "培训开始日期", "培训完成率"],
      rows: [
        ["1", "2024", "镇海炼化", "10", "实习生", "实习生安全教育", "2024年10月04日", "100%"],
        ["2", "2024", "湖南石化", "10", "", "", "", "100%"]
      ]
    },
    archive: {
      title: "从业人员安全培训档案管理情况",
      columns: ["序号", "企业", "培训档案数量", "培训总时长", "培训档案更新率", "培训覆盖率"],
      rows: [
        ["1", "镇海炼化", "590", "1547", "99%", "88%"],
        ["2", "茂名石化", "612", "1682", "98%", "91%"],
        ["3", "扬子石化", "574", "1498", "97%", "89%"]
      ]
    },
    eval: {
      title: "领导干部HSE履职能力评价情况",
      columns: ["序号", "企业", "计划评估人数", "实际评估人数", "评估通过人数", "调岗或约谈人数"],
      rows: [
        ["1", "镇海炼化", "99", "98", "97", "3"],
        ["2", "茂名石化", "96", "95", "94", "2"],
        ["3", "扬子石化", "92", "91", "90", "2"]
      ]
    },
    fee: {
      title: "安全生产教育和培训经费投入",
      columns: ["序号", "企业", "总费用", "办班相关费用", "购买设备设施及软件开发费", "培训基地建设费用"],
      rows: [
        ["1", "镇海炼化", "10020000", "990000", "680000", "1547000"],
        ["2", "茂名石化", "9680000", "850000", "520000", "1380000"],
        ["3", "扬子石化", "9360000", "810000", "460000", "1290000"]
      ]
    }
  };

  return (
    <div className="hq-shell">
      <aside className="hq-sidebar">
        <div className="hq-sidebar-title">中国石化集团公司</div>
        <div className="hq-menu-group">
          <label className="hq-menu-item active"><input type="radio" name="hq-nav" defaultChecked readOnly /> 总部机关</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 资兴运营部（资兴公司）</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 宁波工程公司</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 镇海炼化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 中石化江汉石油有限公司</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 胜利油田</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 中原油田</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 河南油田</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 江汉油田</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 江苏油田</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 华北石油局</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 华东石油局</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 西南石油局</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 西北油田分公司</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 勘探分公司</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 燕山石化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 齐鲁石化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 金陵石化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 茂名石化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 天津石化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 扬子石化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 湖南石化</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 上海金山石化股份有限公司</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 仪征化纤</label>
          <label className="hq-menu-item"><input type="radio" name="hq-nav" readOnly /> 新疆炼化有限责任公司</label>
        </div>
      </aside>

      <main className="hq-main">
        <div className="hq-content">
          <div className="hq-query">
            <select className="filterbar-control" defaultValue="集团">
              <option value="集团">单位</option>
              <option value="油田">油田</option>
              <option value="炼油">炼油</option>
            </select>
            <select className="filterbar-control" defaultValue="2025">
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">重置</button>
          </div>

          <section className="hq-row">
            <div className="hq-panel hq-score-rank-panel">
              <div className="hq-score-rank-title">企业培训综合指标</div>
              <div className="hq-score-rank-card">
                <div className="hq-score-rank-head">
                  <div className="hq-score-rank-head-title">企业培训绩效排名</div>
                  <button type="button" className="hq-score-rank-detail hq-linklike hq-drill-trigger" onClick={() => setDrillModal("metric")}>详情</button>
                </div>
                <div className="hq-score-rank-list">
                  {topMetricRanks.map((item, index) => (
                    <div key={`${item.company}-${index}`} className="hq-score-rank-row">
                      <span className="hq-score-rank-no">{String.fromCharCode(9312 + index)}</span>
                      <span className="hq-score-rank-name">{item.company}</span>
                      <span className="hq-score-rank-score">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hq-panel hq-bar-panel">
              <HqTopDeptCompletionChart items={topDeptItems} onDrill={() => setDrillModal("plan")} />
            </div>
          </section>

          <section className="hq-row hq-row-4">
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("cert")}>HSE关键岗位人员取证情况</button></div>
              <div className="hq-mini-grid hq-mini-grid-single">
                <div className="hq-mini-card">
                  <div className="hq-mini-label">关键岗位持证率</div>
                  <div className="hq-mini-value">95%</div>
                </div>
                <div className="hq-mini-card">
                  <div className="hq-mini-label">关键岗位取证考试通过率</div>
                  <div className="hq-mini-value">98%</div>
                </div>
              </div>
            </div>
            <div className="hq-panel hq-cert-level-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>企业各级人员取证情况</div>
              <div className="hq-card-stack">
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">安全管理人员数量</div><div className="hq-mini-value">2000</div></div>
                  <div><div className="hq-mini-label">持证上岗率</div><div className="hq-mini-value">80%</div></div>
                </div>
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">安全管理人员注安师数量</div><div className="hq-mini-value">1000</div></div>
                  <div><div className="hq-mini-label">占比</div><div className="hq-mini-value">20%</div></div>
                </div>
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">特种作业人员数量</div><div className="hq-mini-value">1500</div></div>
                  <div><div className="hq-mini-label">持证上岗率</div><div className="hq-mini-value">100%</div></div>
                </div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>新员工三级安全教育和培训情况</div>
              <div className="hq-card-stack">
                <button type="button" className="hq-two-col-card hq-card-btn hq-drill-trigger" onClick={() => setDrillModal("trainee")}>
                  <div><div className="hq-mini-label">新员工数量</div><div className="hq-mini-value">2544</div></div>
                  <div><div className="hq-mini-label">三级教育完成率</div><div className="hq-mini-value">100%</div></div>
                </button>
                <button type="button" className="hq-two-col-card hq-card-btn hq-drill-trigger" onClick={() => setDrillModal("transfer")}>
                  <div><div className="hq-mini-label">转岗人员数量</div><div className="hq-mini-value">254</div></div>
                  <div><div className="hq-mini-label">转岗培训完成率</div><div className="hq-mini-value">96%</div></div>
                </button>
                <button type="button" className="hq-two-col-card hq-card-btn hq-drill-trigger" onClick={() => setDrillModal("intern")}>
                  <div><div className="hq-mini-label">实习生数量</div><div className="hq-mini-value">2544</div></div>
                  <div><div className="hq-mini-label">三级教育完成率</div><div className="hq-mini-value">98%</div></div>
                </button>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>企业培训计划（含临时）完成情况</div>
              <div className="hq-mini-grid hq-mini-grid-single">
                <div className="hq-mini-card">
                  <div className="hq-mini-label">企业培训计划执行率均值（当月/累计）</div>
                  <div className="hq-mini-value">80%/30%</div>
                </div>
                <div className="hq-mini-card">
                  <div className="hq-mini-label">企业临时计划数量均值</div>
                  <div className="hq-mini-value">24</div>
                </div>
              </div>
            </div>
          </section>

          <section className="hq-row hq-row-2">
            <div className="hq-panel hq-archive-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("archive")}>集团从业人员安全培训档案管理情况</button></div>
              <div className="hq-archive-grid">
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训档案数量</div>
                    <div className="hq-archive-value">590</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训档案更新率</div>
                    <div className="hq-archive-value">99%</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训覆盖率</div>
                    <div className="hq-archive-value">88%</div>
                  </div>
                </div>
                <div className="hq-archive-card">
                  <div className="hq-archive-icon"></div>
                  <div>
                    <div className="hq-mini-label">培训总时长</div>
                    <div className="hq-archive-value">1547</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hq-panel hq-eval-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("eval")}>集团领导干部HSE履职能力评价情况</button></div>
              <div className="hq-level-card">
                <div className="hq-level-row-title">中层</div>
                <div className="hq-level-grid">
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">计划评估人数</div></div>
                  <div><div className="hq-level-v">98</div><div className="hq-level-k">实际评估人数</div></div>
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">评估通过人数</div></div>
                  <div><div className="hq-level-v">3</div><div className="hq-level-k">调岗或约谈人数</div></div>
                </div>
              </div>
              <div className="hq-level-card green">
                <div className="hq-level-row-title">基层</div>
                <div className="hq-level-grid">
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">计划评估人数</div></div>
                  <div><div className="hq-level-v">97</div><div className="hq-level-k">实际评估人数</div></div>
                  <div><div className="hq-level-v">99</div><div className="hq-level-k">评估通过人数</div></div>
                  <div><div className="hq-level-v">4</div><div className="hq-level-k">调岗或约谈人数</div></div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <HqDrillModal
        open={!!drillModal}
        title={drillModal ? drillConfigs[drillModal].title : ""}
        showSearch={drillModal ? !!drillConfigs[drillModal].showSearch : false}
        columns={drillModal ? drillConfigs[drillModal].columns : []}
        rows={drillModal ? drillConfigs[drillModal].rows : []}
        onClose={() => setDrillModal("")}
      />
    </div>
  );
}
