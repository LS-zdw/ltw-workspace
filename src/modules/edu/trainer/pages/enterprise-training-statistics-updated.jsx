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

function HqPlanCompletionChart({ items = [], title = "培训计划完成情况" }) {
  const maxValue = Math.max(...items.flatMap((item) => [Number(item.total || 0), Number(item.done || 0)]), 0);
  const yMax = Math.max(8, Math.ceil(maxValue / 4) * 4);
  const yStep = yMax / 4;
  const yTicks = [yMax, yMax - yStep, yMax - yStep * 2, yMax - yStep * 3, 0];
  const doneTotal = items.reduce((sum, item) => sum + Number(item.done || 0), 0);
  const totalCount = items.reduce((sum, item) => sum + Number(item.total || 0), 0);

  return (
    <div className="hq-top-dept-chart">
      <div className="hq-top-dept-title">
        {title}（<span className="hq-top-dept-title-done">{doneTotal}</span>/<span className="hq-top-dept-title-total">{totalCount}</span>）
      </div>
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

function HqDrillModal({ open, config, onClose }) {
  if (!open) return null;
  const filters = config.filters || [];
  const columns = config.columns || [];
  const rows = config.rows || [];
  const toolbar = config.toolbar || null;
  const note = config.note || "";
  const total = config.total || 400;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl hq-drill-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{config.title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">
          {toolbar ? <div className="hq-drill-toolbar">{toolbar}</div> : null}
          {note ? <div className="hq-drill-note">{note}</div> : null}
          {filters.length > 0 && (
            <div className="filterbar">
              <div className="filterbar-row">
                <div className="filterbar-left">
                  {filters.map((item) => (
                    <div className="filterbar-item" key={item.label}>
                      <div className="filterbar-label">{item.label}</div>
                      <div className="filterbar-input">
                        {item.type === "select" ? (
                          <select className="filterbar-control" defaultValue={item.defaultValue || ""} style={{ minWidth: item.width || 140 }}>
                            {(item.options || []).map((option) => (
                              <option value={option} key={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input className="filterbar-control" placeholder={item.placeholder || `请输入${item.label}`} style={{ minWidth: item.width || 160 }} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="filterbar-query-actions">
                  <button type="button" className="btn btn-primary">查询</button>
                  <button type="button" className="btn">重置</button>
                  <button type="button" className="btn">导出</button>
                </div>
              </div>
            </div>
          )}
          <div className="table-wrap">
            <table className="proto-table">
              <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>{rows.map((r, i) => (<tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>))}</tbody>
            </table>
          </div>
          <div className="hq-drill-pager">
            <span>共 {total} 条</span>
            <button type="button" className="hq-pg-btn">&lt;</button>
            <button type="button" className="hq-pg-btn active">1</button>
            <button type="button" className="hq-pg-btn">2</button>
            <button type="button" className="hq-pg-btn">3</button>
            <button type="button" className="hq-pg-btn">4</button>
            <button type="button" className="hq-pg-btn">5</button>
            <span className="hq-pg-ellipsis">...</span>
            <button type="button" className="hq-pg-btn">50</button>
            <button type="button" className="hq-pg-btn">&gt;</button>
            <span>5条/页</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [drillModal, setDrillModal] = React.useState("");
  const [planView, setPlanView] = React.useState("month");
  const [planDrillView, setPlanDrillView] = React.useState("month");
  const [planMonth, setPlanMonth] = React.useState("2026-05");
  const [planYear, setPlanYear] = React.useState("2026");
  const metricItems = [
    { name: "培训计划完成率", raw: 100, weight: 40 },
    { name: "证书有效率", raw: 99, weight: 30 },
    { name: "关键岗位持证率", raw: 97, weight: 20 },
    { name: "年度报告评分", raw: 98, weight: 10 }
  ];
  const metricTotal = (
    metricItems.reduce((sum, item) => sum + (item.raw * item.weight) / 100, 0)
  ).toFixed(1);

  const planMonthOptions = [
    { value: "2026-03", label: "2026年03月" },
    { value: "2026-04", label: "2026年04月" },
    { value: "2026-05", label: "2026年05月" },
    { value: "2026-06", label: "2026年06月" }
  ];

  const planYearOptions = ["2026", "2025", "2024", "2023", "2022"];

  const planMonthlyDeptMap = {
    "2026-03": [
      { name: "公司安环部", total: 2, done: 2, plannedPeople: 120, actualPeople: 118, passedPeople: 116 },
      { name: "运行一部", total: 2, done: 2, plannedPeople: 96, actualPeople: 94, passedPeople: 92 },
      { name: "运行二部", total: 1, done: 1, plannedPeople: 48, actualPeople: 48, passedPeople: 47 },
      { name: "运行三部", total: 1, done: 0, plannedPeople: 36, actualPeople: 0, passedPeople: 0 },
      { name: "储运部", total: 0, done: 0, plannedPeople: 0, actualPeople: 0, passedPeople: 0 },
      { name: "设备管理部", total: 0, done: 0, plannedPeople: 0, actualPeople: 0, passedPeople: 0 }
    ],
    "2026-04": [
      { name: "公司安环部", total: 1, done: 1, plannedPeople: 52, actualPeople: 50, passedPeople: 49 },
      { name: "运行一部", total: 4, done: 4, plannedPeople: 360, actualPeople: 360, passedPeople: 360 },
      { name: "运行二部", total: 1, done: 1, plannedPeople: 44, actualPeople: 42, passedPeople: 41 },
      { name: "运行三部", total: 1, done: 1, plannedPeople: 38, actualPeople: 36, passedPeople: 35 },
      { name: "储运部", total: 1, done: 0, plannedPeople: 30, actualPeople: 0, passedPeople: 0 },
      { name: "设备管理部", total: 0, done: 0, plannedPeople: 0, actualPeople: 0, passedPeople: 0 }
    ],
    "2026-05": [
      { name: "公司安环部", total: 2, done: 1, plannedPeople: 210, actualPeople: 206, passedPeople: 201 },
      { name: "运行一部", total: 3, done: 2, plannedPeople: 180, actualPeople: 176, passedPeople: 171 },
      { name: "运行二部", total: 3, done: 2, plannedPeople: 172, actualPeople: 168, passedPeople: 164 },
      { name: "运行三部", total: 3, done: 2, plannedPeople: 160, actualPeople: 154, passedPeople: 151 },
      { name: "运行五部", total: 3, done: 1, plannedPeople: 126, actualPeople: 120, passedPeople: 117 },
      { name: "设备管理部", total: 2, done: 2, plannedPeople: 98, actualPeople: 96, passedPeople: 95 }
    ],
    "2026-06": [
      { name: "公司安环部", total: 1, done: 1, plannedPeople: 56, actualPeople: 54, passedPeople: 53 },
      { name: "运行一部", total: 2, done: 1, plannedPeople: 90, actualPeople: 45, passedPeople: 43 },
      { name: "运行二部", total: 2, done: 2, plannedPeople: 88, actualPeople: 86, passedPeople: 84 },
      { name: "运行三部", total: 1, done: 1, plannedPeople: 42, actualPeople: 41, passedPeople: 40 },
      { name: "储运部", total: 1, done: 0, plannedPeople: 36, actualPeople: 0, passedPeople: 0 },
      { name: "设备管理部", total: 1, done: 0, plannedPeople: 32, actualPeople: 0, passedPeople: 0 }
    ]
  };

  const planYearlyDeptMap = {
    "2026": [
      { name: "公司安环部", total: 18, done: 15, plannedPeople: 1280, actualPeople: 1216, passedPeople: 1189 },
      { name: "运行一部", total: 22, done: 20, plannedPeople: 1640, actualPeople: 1588, passedPeople: 1541 },
      { name: "运行二部", total: 19, done: 17, plannedPeople: 1460, actualPeople: 1408, passedPeople: 1372 },
      { name: "运行三部", total: 20, done: 18, plannedPeople: 1520, actualPeople: 1462, passedPeople: 1425 },
      { name: "储运部", total: 16, done: 14, plannedPeople: 1080, actualPeople: 1030, passedPeople: 1004 },
      { name: "设备管理部", total: 14, done: 12, plannedPeople: 980, actualPeople: 942, passedPeople: 921 }
    ],
    "2025": [
      { name: "公司安环部", total: 17, done: 16, plannedPeople: 1220, actualPeople: 1186, passedPeople: 1154 },
      { name: "运行一部", total: 21, done: 20, plannedPeople: 1580, actualPeople: 1538, passedPeople: 1498 },
      { name: "运行二部", total: 18, done: 17, plannedPeople: 1400, actualPeople: 1364, passedPeople: 1326 },
      { name: "运行三部", total: 19, done: 18, plannedPeople: 1480, actualPeople: 1440, passedPeople: 1407 },
      { name: "储运部", total: 15, done: 14, plannedPeople: 1020, actualPeople: 986, passedPeople: 962 },
      { name: "设备管理部", total: 13, done: 12, plannedPeople: 920, actualPeople: 888, passedPeople: 866 }
    ],
    "2024": [
      { name: "公司安环部", total: 16, done: 15, plannedPeople: 1160, actualPeople: 1122, passedPeople: 1094 },
      { name: "运行一部", total: 20, done: 18, plannedPeople: 1500, actualPeople: 1436, passedPeople: 1398 },
      { name: "运行二部", total: 17, done: 16, plannedPeople: 1340, actualPeople: 1302, passedPeople: 1267 },
      { name: "运行三部", total: 18, done: 17, plannedPeople: 1420, actualPeople: 1380, passedPeople: 1348 },
      { name: "储运部", total: 14, done: 13, plannedPeople: 960, actualPeople: 928, passedPeople: 902 },
      { name: "设备管理部", total: 12, done: 11, plannedPeople: 860, actualPeople: 826, passedPeople: 804 }
    ],
    "2023": [
      { name: "公司安环部", total: 15, done: 14, plannedPeople: 1100, actualPeople: 1062, passedPeople: 1035 },
      { name: "运行一部", total: 18, done: 17, plannedPeople: 1420, actualPeople: 1382, passedPeople: 1349 },
      { name: "运行二部", total: 16, done: 15, plannedPeople: 1280, actualPeople: 1242, passedPeople: 1210 },
      { name: "运行三部", total: 16, done: 15, plannedPeople: 1310, actualPeople: 1278, passedPeople: 1244 },
      { name: "储运部", total: 13, done: 12, plannedPeople: 900, actualPeople: 868, passedPeople: 844 },
      { name: "设备管理部", total: 11, done: 10, plannedPeople: 800, actualPeople: 772, passedPeople: 749 }
    ],
    "2022": [
      { name: "公司安环部", total: 14, done: 13, plannedPeople: 1040, actualPeople: 1006, passedPeople: 979 },
      { name: "运行一部", total: 17, done: 16, plannedPeople: 1360, actualPeople: 1324, passedPeople: 1290 },
      { name: "运行二部", total: 15, done: 14, plannedPeople: 1220, actualPeople: 1184, passedPeople: 1152 },
      { name: "运行三部", total: 15, done: 14, plannedPeople: 1240, actualPeople: 1206, passedPeople: 1171 },
      { name: "储运部", total: 12, done: 11, plannedPeople: 840, actualPeople: 808, passedPeople: 785 },
      { name: "设备管理部", total: 10, done: 9, plannedPeople: 760, actualPeople: 728, passedPeople: 706 }
    ]
  };

  const trainingRoleStats = [
    { name: "新员工", count: 2544, rate: "100%" },
    { name: "安全员", count: 486, rate: "96%" },
    { name: "安全总监、科长", count: 121, rate: "98%" }
  ];

  const orgOptions = ["全部", "公司安环部", "人力资源部", "运行一部", "运行二部", "运行三部", "运行五部", "储运部", "设备管理部"];

  const commonFilters = [
    { label: "年度", type: "select", options: ["全部", "2026", "2025", "2024"], defaultValue: "2026", width: 110 },
    { label: "组织机构", type: "select", options: orgOptions, defaultValue: "全部", width: 150 }
  ];

  const planChartItems = planView === "month"
    ? (planMonthlyDeptMap[planMonth] || [])
    : (planYearlyDeptMap[planYear] || []);
  const selectedPlanMonthLabel = planMonthOptions.find((item) => item.value === planMonth)?.label || planMonth;
  const planChartTitle = planView === "month"
    ? `${selectedPlanMonthLabel}各部门培训完成情况`
    : `${planYear}年各部门培训完成情况`;

  const planDrillSourceItems = planDrillView === "month"
    ? (planMonthlyDeptMap[planMonth] || [])
    : (planYearlyDeptMap[planYear] || []);

  const planDrillRows = planDrillSourceItems.map((item, index) => {
    const rate = item.total > 0 ? `${Math.round((item.done / item.total) * 100)}%` : "0%";
    return planDrillView === "month"
      ? [
          String(index + 1),
          planYear,
          selectedPlanMonthLabel.slice(-3),
          item.name,
          String(item.total),
          String(item.done),
          rate,
          String(item.plannedPeople || 0),
          String(item.actualPeople || 0),
          String(item.passedPeople || 0)
        ]
      : [
          String(index + 1),
          planYear,
          item.name,
          String(item.total),
          String(item.done),
          rate,
          String(item.plannedPeople || 0),
          String(item.actualPeople || 0),
          String(item.passedPeople || 0)
        ];
  });

  const planDrillNote = planDrillView === "month"
    ? "口径：按所选月份统计各部门。计划项目数取培训计划管理中计划时间落在该月的计划数；完成项目数取该月已产生培训记录的计划数；计划人数取计划培训人数汇总；实际参与人数、考试合格人数取培训记录汇总。"
    : "口径：按所选年度统计各部门。计划项目数取培训计划管理中该年度计划数；完成项目数取该年度已产生培训记录的计划数；计划人数取计划培训人数汇总；实际参与人数、考试合格人数取培训记录汇总。";

  const planDrillConfig = planDrillView === "month"
    ? {
        title: "培训计划完成情况明细",
        toolbar: (
          <div className="ets-switch-row">
            <div className="ets-switch-label">统计维度</div>
            <div className="ets-view-switch">
              <button type="button" className={`hq-tab${planDrillView === "month" ? " active" : ""}`} onClick={() => setPlanDrillView("month")}>按月</button>
              <button type="button" className={`hq-tab${planDrillView === "year" ? " active" : ""}`} onClick={() => setPlanDrillView("year")}>按年</button>
            </div>
          </div>
        ),
        filters: [
          { label: "年度", type: "select", options: ["2026", "2025", "2024"], defaultValue: planYear, width: 110 },
          { label: "月份", type: "select", options: planMonthOptions.map((item) => item.label), defaultValue: selectedPlanMonthLabel, width: 110 },
          { label: "组织机构", type: "select", options: orgOptions, defaultValue: "全部", width: 150 }
        ],
        columns: ["序号", "年度", "月份", "组织机构", "计划项目数", "完成项目数", "完成率", "计划人数", "实际参与人数", "考试合格人数"],
        rows: planDrillRows,
        note: planDrillNote,
        total: planDrillRows.length
      }
    : {
        title: "培训计划完成情况明细",
        toolbar: (
          <div className="ets-switch-row">
            <div className="ets-switch-label">统计维度</div>
            <div className="ets-view-switch">
              <button type="button" className={`hq-tab${planDrillView === "month" ? " active" : ""}`} onClick={() => setPlanDrillView("month")}>按月</button>
              <button type="button" className={`hq-tab${planDrillView === "year" ? " active" : ""}`} onClick={() => setPlanDrillView("year")}>按年</button>
            </div>
          </div>
        ),
        filters: [
          { label: "年度", type: "select", options: planYearOptions, defaultValue: planYear, width: 110 },
          { label: "组织机构", type: "select", options: orgOptions, defaultValue: "全部", width: 150 }
        ],
        columns: ["序号", "年度", "组织机构", "计划项目数", "完成项目数", "完成率", "计划人数", "实际参与人数", "考试合格人数"],
        rows: planDrillRows,
        note: planDrillNote,
        total: planDrillRows.length
      };

  const drillConfigs = {
    metric: {
      title: "企业培训综合指标",
      filters: [
        { label: "年度", type: "select", options: ["全部", "2026", "2025", "2024"], defaultValue: "2026", width: 110 }
      ],
      columns: ["序号", "年度", "培训计划完成率（40%）", "证书失效预警人次（30%）", "关键岗位持证率（20%）", "年度报告评分（10%）", "综合绩效"],
      rows: [
        ["1", "2026", "100%", "99%", "97%", "98%", "98.89"],
        ["2", "2025", "99%", "98%", "96%", "98%", "98.10"],
        ["3", "2024", "100%", "98%", "95%", "97%", "97.80"],
        ["4", "2023", "98%", "97%", "94%", "96%", "96.90"],
        ["5", "2022", "98%", "96%", "94%", "96%", "96.60"]
      ]
    },
    plan: planDrillConfig,
    cert: {
      title: "HSE关键岗位人员取证情况",
      filters: [
        ...commonFilters,
        { label: "姓名", placeholder: "请输入姓名", width: 120 },
        { label: "证书种类", type: "select", options: ["全部", "安全管理人员资格证", "注册安全工程师", "HSE关键岗位资格", "集团公司HSE审核员资格"], defaultValue: "全部", width: 170 }
      ],
      columns: ["序号", "年度", "组织机构", "姓名", "岗位类型", "证书名称", "证书编码", "证书种类", "证书生效日期", "证书有效期", "是否异常", "证书附件"],
      rows: [
        ["1", "2026", "公司安环部", "梁海江", "安全管理人员", "注册安全工程师职业资格证", "ZCGCS2022A118", "注册安全工程师", "2022年05月01日", "2027年04月30日", "否", "查看"],
        ["2", "2026", "运行二部", "胡晓磊", "HSE关键岗位人员", "HSE关键岗位资格证", "HSE202401135", "HSE关键岗位资格", "2024年03月20日", "2027年03月19日", "否", "查看"],
        ["3", "2026", "储运部", "陈羽", "集团HSE审核员", "集团公司HSE审核员资格证", "HSEA20250231", "集团公司HSE审核员资格", "2025年05月01日", "2028年04月30日", "否", "查看"]
      ]
    },
    personCert: {
      title: "企业各级人员取证情况",
      filters: [
        ...commonFilters,
        { label: "人员类别", type: "select", options: ["全部", "安全管理人员", "安全管理人员注安师", "特种作业人员"], defaultValue: "全部", width: 150 }
      ],
      columns: ["序号", "年度", "组织机构", "人员类别", "人员数量", "持证人数", "持证上岗率", "注安师人数", "注安师占比", "统计日期"],
      rows: [
        ["1", "2026", "公司安环部", "安全管理人员", "2000", "1600", "80%", "1000", "50%", "2026-05-14"],
        ["2", "2026", "运行一部", "安全管理人员注安师", "480", "480", "100%", "192", "40%", "2026-05-14"],
        ["3", "2026", "运行二部", "特种作业人员", "1500", "1500", "100%", "-", "-", "2026-05-14"]
      ]
    },
    keyPeopleTraining: {
      title: "重点人员培训完成明细",
      filters: [
        ...commonFilters,
        { label: "人员类别", type: "select", options: ["全部", "新员工", "安全员", "安全总监、科长"], defaultValue: "全部", width: 120 },
        { label: "姓名", placeholder: "请输入姓名", width: 120 }
      ],
      columns: ["序号", "年度", "组织机构", "姓名", "人员类别", "培训项目", "培训开始日期", "学习状态", "考试状态", "是否完成"],
      rows: [
        ["1", "2026", "人力资源部", "赵晨曦", "新员工", "新员工三级安全教育", "2026年04月04日", "已完成", "合格", "是"],
        ["2", "2026", "运行一部", "李沐阳", "新员工", "班组级安全教育", "2026年04月12日", "已完成", "合格", "是"],
        ["3", "2026", "设备管理部", "孙嘉禾", "新员工", "岗位安全操作规程培训", "2026年04月18日", "已完成", "合格", "是"],
        ["4", "2026", "运行一部", "王启航", "安全员", "安全员履职能力培训", "2026年03月10日", "已完成", "合格", "是"],
        ["5", "2026", "运行三部", "刘佳宁", "安全员", "隐患排查与班组安全管理", "2026年03月18日", "已完成", "合格", "是"],
        ["6", "2026", "储运部", "周明远", "安全员", "现场作业风险辨识", "2026年04月02日", "学习中", "待考核", "否"],
        ["7", "2026", "公司安环部", "马志强", "安全总监、科长", "安全总监、科长履职能力提升", "2026年05月06日", "已完成", "合格", "是"],
        ["8", "2026", "运行二部", "郑若楠", "安全总监、科长", "重大风险管控专题培训", "2026年05月08日", "已完成", "合格", "是"],
        ["9", "2026", "运行五部", "韩立峰", "安全总监、科长", "承包商安全管理专题培训", "2026年05月13日", "学习中", "待考核", "否"]
      ]
    },
    archive: {
      title: "从业人员安全培训档案管理明细",
      filters: [
        ...commonFilters
      ],
      columns: ["序号", "年度", "组织机构", "培训档案数量", "已更新数量", "培训档案更新率", "培训覆盖率", "培训总时长", "最后更新日期"],
      rows: [
        ["1", "2026", "公司安环部", "590", "584", "99%", "88%", "1456", "2026-05-14"],
        ["2", "2026", "运行一部", "812", "804", "99%", "91%", "2230", "2026-05-13"],
        ["3", "2026", "运行二部", "768", "752", "98%", "89%", "1986", "2026-05-12"]
      ]
    },
    leaderEval: {
      title: "领导干部HSE履职能力评估明细",
      filters: [
        { label: "年度", type: "select", options: ["全部", "2026", "2025", "2024"], defaultValue: "2026", width: 110 },
        { label: "层级", type: "select", options: ["全部", "中层", "基层"], defaultValue: "全部", width: 100 }
      ],
      columns: ["序号", "年度", "组织机构", "层级", "评估方式", "计划评估人数", "实际评估人数", "评估通过人数", "调岗或约谈人数", "登记人", "登记日期"],
      rows: [
        ["1", "2026", "镇海炼化分公司", "中层", "考试", "99", "98", "99", "3", "王启航", "2026-05-14"],
        ["2", "2026", "镇海炼化分公司", "基层", "访谈", "99", "97", "99", "4", "刘佳宁", "2026-05-14"],
        ["3", "2026", "镇海炼化分公司", "基层", "HSE业绩评价", "120", "116", "113", "5", "周明远", "2026-05-13"]
      ]
    }
  };

  return (
    <div className="hq-shell hq-shell-no-sidebar enterprise-training-stat-page">
      <main className="hq-main">
        <div className="hq-content">
          <section className="hq-row">
            <div className="hq-panel hq-score-panel">
              <div className="hq-panel-title"><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("metric")}>企业培训综合指标</button></div>
              <div className="hq-score-top">
                <div className="hq-score-main">
                  <div className="hq-score-unit">总分</div>
                  <div className="hq-score-value">{metricTotal}</div>
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
              <div className="hq-panel-title">
                <span className="hq-title-dot"></span>
                <button
                  type="button"
                  className="hq-linklike hq-drill-trigger"
                  onClick={() => {
                    setPlanDrillView(planView);
                    setDrillModal("plan");
                  }}
                >
                  培训计划完成情况
                </button>
                <div className="ets-view-picker">
                  {planView === "month" ? (
                    <select className="filterbar-control ets-period-select" value={planMonth} onChange={(e) => setPlanMonth(e.target.value)}>
                      {planMonthOptions.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                      ))}
                    </select>
                  ) : (
                    <select className="filterbar-control ets-period-select" value={planYear} onChange={(e) => setPlanYear(e.target.value)}>
                      {planYearOptions.map((item) => (
                        <option key={item} value={item}>{item}年</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="ets-view-switch">
                  <button type="button" className={`hq-tab${planView === "month" ? " active" : ""}`} onClick={() => setPlanView("month")}>按月</button>
                  <button type="button" className={`hq-tab${planView === "year" ? " active" : ""}`} onClick={() => setPlanView("year")}>按年</button>
                </div>
              </div>
              <HqPlanCompletionChart items={planChartItems} title={planChartTitle} />
            </div>
          </section>

          <section className="hq-row hq-row-3">
            <div className="hq-panel ets-key-cert-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("cert")}>HSE关键岗位人员取证情况</button></div>
              <div className="hq-card-stack">
                <div className="hq-mini-card"><div className="hq-mini-label">关键岗位持证率</div><div className="hq-mini-value">95%</div></div>
                <div className="hq-mini-card"><div className="hq-mini-label">关键岗位取证考试通过率</div><div className="hq-mini-value">98%</div></div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("personCert")}>企业各级人员取证情况</button></div>
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
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("keyPeopleTraining")}>重点人员培训完成情况</button></div>
              <div className="hq-card-stack">
                {trainingRoleStats.map((item) => (
                  <div className="hq-two-col-card" key={item.name}>
                    <div><div className="hq-mini-label">{item.name}数量</div><div className="hq-mini-value">{item.count}</div></div>
                    <div><div className="hq-mini-label">培训完成率</div><div className="hq-mini-value">{item.rate}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="hq-row hq-row-2">
            <div className="hq-panel hq-archive-left ets-archive-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("archive")}>从业人员安全培训档案管理情况</button></div>
              <div className="hq-archive-grid">
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训档案数量</div><div className="hq-archive-value">590</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训档案更新率</div><div className="hq-archive-value">99%</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训覆盖率</div><div className="hq-archive-value">88%</div></div></div>
                <div className="hq-archive-card"><div className="hq-archive-icon"></div><div><div className="hq-mini-label">培训总时长</div><div className="hq-archive-value">1456</div></div></div>
              </div>
            </div>
            <div className="hq-panel">
              <div className="hq-panel-title"><span className="hq-title-dot"></span><button type="button" className="hq-linklike hq-drill-trigger" onClick={() => setDrillModal("leaderEval")}>领导干部HSE履职能力评估情况</button></div>
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
        config={drillModal ? drillConfigs[drillModal] : {}}
        onClose={() => setDrillModal("")}
      />
    </div>
  );
}
