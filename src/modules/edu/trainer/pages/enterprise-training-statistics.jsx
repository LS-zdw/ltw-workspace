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
        <div
          className="hq-barchart-cats"
          style={{ gridTemplateColumns: `repeat(${Math.max(1, categories.length)}, 1fr)` }}
        >
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

function HqPlanCompletionChart({ items = [], onDrill }) {
  const yTicks = [20, 16, 12, 8, 4, 0];
  const yMax = yTicks[0];
  const doneTotal = items.reduce((sum, item) => sum + Number(item.done || 0), 0);
  const totalCount = items.reduce((sum, item) => sum + Number(item.total || 0), 0);

  return (
    <div className="hq-top-dept-chart">
      <button type="button" className="hq-top-dept-title hq-linklike hq-drill-trigger" onClick={onDrill}>
        各部门培训完成情况（<span className="hq-top-dept-title-done">{doneTotal}</span>/<span className="hq-top-dept-title-total">{totalCount}</span>）
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
          <div
            className="hq-top-dept-bars"
            style={{ gridTemplateColumns: `repeat(${Math.max(1, items.length)}, 1fr)` }}
          >
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

function HqDrillModal({ open, title, columns = [], rows = [], onClose }) {
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl hq-drill-modal hq-drill-modal-v5" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">
          <div className="hq-drill-headline">
            <span>{title}</span>
            <div className="hq-drill-actions">
              <button type="button" className="btn btn-primary">导出</button>
            </div>
          </div>
          <div className="table-wrap">
            <table className="proto-table">
              <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{rows.map((r, i) => (<tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>))}</tbody>
            </table>
          </div>
          <div className="hq-drill-pager">
            <span>共 400 条</span>
            <button type="button" className="hq-pg-btn">&lt;</button>
            <button type="button" className="hq-pg-btn active">1</button>
            <button type="button" className="hq-pg-btn">2</button>
            <button type="button" className="hq-pg-btn">3</button>
            <button type="button" className="hq-pg-btn">4</button>
            <button type="button" className="hq-pg-btn">5</button>
            <span className="hq-pg-ellipsis">...</span>
            <button type="button" className="hq-pg-btn">50</button>
            <button type="button" className="hq-pg-btn">&gt;</button>
            <select className="filterbar-control hq-pg-size" defaultValue="5条/页">
              <option value="5条/页">5条/页</option>
              <option value="10条/页">10条/页</option>
              <option value="20条/页">20条/页</option>
            </select>
          </div>
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
  const metricItems = [
    { name: "培训计划完成率", raw: 100, weight: 40 },
    { name: "证书有效率", raw: 99, weight: 30 },
    { name: "关键岗位持证率", raw: 97, weight: 20 },
    { name: "年度报告评分", raw: 98, weight: 10 }
  ];
  const metricTotal = (
    metricItems.reduce((sum, item) => sum + (item.raw * item.weight) / 100, 0)
  ).toFixed(1);

  const planDeptItems = [
    { name: "公司安环部", total: 2, done: 1 },
    { name: "运行一部", total: 3, done: 2 },
    { name: "运行二部", total: 3, done: 2 },
    { name: "运行三部", total: 3, done: 2 },
    { name: "运行四部", total: 3, done: 2 },
    { name: "运行五部", total: 3, done: 1 },
    { name: "运行六部", total: 3, done: 2 }
  ];

  const drillConfigs = {
    metric: {
      title: "企业培训综合指标",
      columns: ["序号", "年度", "培训计划完成率（40%）", "证书失效预警人次（30%）", "关键岗位持证率（20%）", "年度报告评分（10%）", "综合绩效"],
      rows: [
        ["1", "2025", "100%", "99%", "97%", "98%", "98.89"],
        ["2", "2024", "100%", "99%", "97%", "98%", "98.89"],
        ["3", "2023", "100%", "99%", "97%", "98%", "98.89"],
        ["4", "2022", "100%", "99%", "97%", "98%", "98.89"],
        ["5", "2021", "100%", "99%", "97%", "98%", "98.89"]
      ]
    },
    plan: {
      title: "企业培训计划完成情况",
      columns: ["序号", "年度", "组织机构", "计划代码", "培训项目名称", "培训对象", "培训天数", "计划时间", "培训开始日期", "计划期数", "完成期次", "计划人数", "实际参与人数", "考试合格人数", "培训合格率"],
      rows: [
        ["1", "2024", "安环部", "HNHS20241011001", "安全管理培训", "安全管理人员", "10", "2024年10月", "2024年10月04日", "3", "1", "12", "15", "15", "100%"],
        ["2", "2024", "安环部", "HNHS20241011001", "安全管理培训", "HSE关键岗位人员", "", "", "", "", "", "", "", "", ""],
        ["3", "2024", "安环部", "HNHS20241011001", "安全管理培训", "中层领导", "", "", "", "", "", "", "", "", ""]
      ]
    },
    trainee: {
      title: "新员工三级安全教育和培训情况",
      columns: ["序号", "年度", "组织机构", "姓名", "人员分类", "培训项目名称", "培训开始日期", "学习状态", "考试状态", "是否完成"],
      rows: [
        ["1", "2024", "人力资源部", "赵晨曦", "新员工", "新员工三级安全教育", "2024年10月04日", "已完成", "合格", "是"],
        ["2", "2024", "公用工程部", "李沐阳", "转岗人员", "转岗安全适应性培训", "2024年09月18日", "学习中", "未考试", "否"],
        ["3", "2024", "设备管理部", "孙嘉禾", "见习人员", "设备检维修安全基础培训", "2024年08月26日", "已完成", "合格", "是"]
      ]
    },
    cert: {
      title: "人员取证情况",
      columns: ["序号", "年度", "组织机构", "姓名", "人员类型", "证书名称", "证书编码", "证书种类", "证书小类", "证书生效日期", "证书有效期", "是否异常", "证书附件"],
      rows: [
        ["1", "2024", "安全环保部", "梁海江", "安全管理人员", "注册安全工程师职业资格证", "ZCGCS2022A118", "HSE关键岗位资格", "注册安全工程师", "2022年05月01日", "2027年04月30日", "否", "查看"],
        ["2", "2024", "公用工程部", "胡晓磊", "特种作业人员", "特种作业操作证", "TZZYGD202411345", "特种作业", "高压电工作业", "2024年03月20日", "2027年03月19日", "否", "查看"],
        ["3", "2024", "储运部", "陈羽", "作业监护人员", "作业票监护人资格证", "ZYJH20250231", "企业内部证书", "动火作业监护", "2025年05月01日", "2027年04月30日", "否", "查看"]
      ]
    }
  };

  return (
    <div className="hq-shell hq-shell-no-sidebar">
      <main className="hq-main">
        <div className="hq-content">
          <div className="hq-query" style={{ justifyContent: "space-between", width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span>起止日期：</span>
              <input className="filterbar-control" placeholder="开始日期" style={{ width: 120 }} />
              <span>至</span>
              <input className="filterbar-control" placeholder="结束日期" style={{ width: 120 }} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>

          <section className="hq-row">
            <div className="hq-panel hq-score-panel">
              <div className="hq-panel-title"><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("metric")}>企业培训综合指标</button></div>
              <div className="hq-score-top">
                <div className="hq-score-main">
                  <div className="hq-score-unit">总分</div>
                  <button type="button" className="hq-score-value hq-linklike hq-drill-trigger" onClick={() => setDrillModal("metric")}>{metricTotal}</button>
                </div>
                <div className="hq-score-rank">
                  <span>集团排名</span>
                  <b>8</b>
                  <span>/121</span>
                </div>
              </div>
              <div className="hq-score-detail-card">
                <div className="hq-score-calc-grid hq-score-calc-head">
                  <span>指标</span>
                  <span>得分</span>
                  <span>权重</span>
                  <span>加权分</span>
                </div>
                <div className="hq-score-calc-list">
                  {metricItems.map((item) => {
                    const weighted = ((item.raw * item.weight) / 100).toFixed(1);
                    return (
                      <div key={item.name} className="hq-score-calc-grid">
                        <span className="hq-score-calc-name">{item.name}</span>
                        <span>{item.raw}</span>
                        <span>{item.weight}%</span>
                        <span>{weighted}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="hq-panel hq-bar-panel hq-plan-completion-panel">
              <div className="hq-panel-title">培训计划完成情况</div>
              <HqPlanCompletionChart items={planDeptItems} onDrill={() => setDrillModal("plan")} />
            </div>
          </section>

          <section className="hq-row hq-row-3">
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("cert")}>HSE关键岗位人员取证情况</button></div>
              <div className="hq-card-stack">
                <div className="hq-mini-card"><div className="hq-mini-label">关键岗位持证率</div><div className="hq-mini-value">95%</div></div>
                <div className="hq-mini-card"><div className="hq-mini-label">关键岗位取证考试通过率</div><div className="hq-mini-value">98%</div></div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>企业各级人员取证情况</div>
              <div className="hq-card-stack">
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">安全管理人员数量</div><div className="hq-mini-value">2000</div></div>
                  <div><div className="hq-mini-label">持证上岗率</div><div className="hq-mini-value">80%</div></div>
                </div>
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">安全管理人员注安师数量</div><div className="hq-mini-value">1000</div></div>
                  <div><div className="hq-mini-label">注安师占比</div><div className="hq-mini-value">20%</div></div>
                </div>
                <div className="hq-two-col-card">
                  <div><div className="hq-mini-label">特种作业人员数量</div><div className="hq-mini-value">1500</div></div>
                  <div><div className="hq-mini-label">持证上岗率</div><div className="hq-mini-value">100%</div></div>
                </div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("trainee")}>新员工三级安全教育和培训情况</button></div>
              <div className="hq-card-stack">
                <button type="button" className="hq-two-col-card hq-card-btn" onClick={() => setDrillModal("trainee")}>
                  <div><div className="hq-mini-label">新员工数量</div><div className="hq-mini-value">2544</div></div>
                  <div><div className="hq-mini-label">三级教育完成率</div><div className="hq-mini-value">100%</div></div>
                </button>
                <button type="button" className="hq-two-col-card hq-card-btn" onClick={() => setDrillModal("trainee")}>
                  <div><div className="hq-mini-label">转岗人员数量</div><div className="hq-mini-value">254</div></div>
                  <div><div className="hq-mini-label">转岗培训完成率</div><div className="hq-mini-value">96%</div></div>
                </button>
                <button type="button" className="hq-two-col-card hq-card-btn" onClick={() => setDrillModal("trainee")}>
                  <div><div className="hq-mini-label">实习生数量</div><div className="hq-mini-value">2544</div></div>
                  <div><div className="hq-mini-label">三级教育完成率</div><div className="hq-mini-value">98%</div></div>
                </button>
              </div>
            </div>
          </section>

          <section className="hq-row hq-row-2">
            <div className="hq-panel hq-archive-left">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>从业人员安全培训档案管理情况</div>
              <div className="hq-archive-grid">
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训档案数量</div><div className="hq-archive-value">590</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训档案更新率</div><div className="hq-archive-value">99%</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训覆盖率</div><div className="hq-archive-value">88%</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训总时长</div><div className="hq-archive-value">1456</div></div></div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span>领导干部HSE履职能力评估情况</div>
              <div className="ets-eval-card">
                <div className="ets-eval-row-title">中层</div>
                <div className="ets-eval-grid">
                  <div><div className="ets-eval-v">99</div><div className="ets-eval-k">计划评估人数</div></div>
                  <div><div className="ets-eval-v">98</div><div className="ets-eval-k">实际评估人数</div></div>
                  <div><div className="ets-eval-v">99</div><div className="ets-eval-k">评估通过人数</div></div>
                  <div><div className="ets-eval-v">3</div><div className="ets-eval-k">调岗或约谈人数</div></div>
                </div>
              </div>
              <div className="ets-eval-card ets-eval-card-green">
                <div className="ets-eval-row-title">基层</div>
                <div className="ets-eval-grid">
                  <div><div className="ets-eval-v">99</div><div className="ets-eval-k">计划评估人数</div></div>
                  <div><div className="ets-eval-v">97</div><div className="ets-eval-k">实际评估人数</div></div>
                  <div><div className="ets-eval-v">99</div><div className="ets-eval-k">评估通过人数</div></div>
                  <div><div className="ets-eval-v">4</div><div className="ets-eval-k">调岗或约谈人数</div></div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <HqDrillModal
        open={!!drillModal}
        title={drillModal ? drillConfigs[drillModal].title : ""}
        columns={drillModal ? drillConfigs[drillModal].columns : []}
        rows={drillModal ? drillConfigs[drillModal].rows : []}
        onClose={() => setDrillModal("")}
      />
    </div>
  );
}
