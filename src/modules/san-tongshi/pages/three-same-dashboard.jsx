import React from "react";

const kpiMain = {
  title: "三同时项目总数",
  value: "455",
  stats: [
    { label: "一类项目数", value: "60" },
    { label: "二类项目数", value: "160" },
    { label: "三类项目数", value: "235" }
  ]
};

const kpiSecond = [
  { title: "重点工程建设项目数量", value: "26" },
  { title: "项目专项论证总数", value: "100", sub: [{ label: "未论证", value: "60" }, { label: "已论证", value: "60" }] }
];

const stageLegend = [
  { label: "一类项目", color: "#5b8ff9" },
  { label: "二类项目", color: "#5ad8a6" },
  { label: "三类项目", color: "#9e77ff" }
];

const stageBars = [
  { label: "可行性研究", values: [120, 200, 260] },
  { label: "基础设计", values: [500, 800, 1000] },
  { label: "试运行", values: [100, 320, 420] },
  { label: "竣工验收", values: [80, 260, 360] }
];

const typeBars = [
  { label: "危化品类项目", values: [620, 880, 1020] },
  { label: "非煤矿山类项目", values: [740, 1120, 910] },
  { label: "其他", values: [700, 860, 1180] }
];

const progressBars = [
  { label: "一类项目", value: 88 },
  { label: "二类项目", value: 67 },
  { label: "三类项目", value: 75 }
];

const drillProjectRows = [
  { name: "镇海炼化芳烃装置扩能", type: "一类项目", stage: "可行性研究", dept: "设备管理部", org: "镇海炼化", date: "2025-12-15", status: "推进中" },
  { name: "燕山石化加氢装置改造", type: "二类项目", stage: "基础设计", dept: "生产运行部", org: "燕山石化", date: "2025-12-14", status: "已完成" },
  { name: "齐鲁石化储运系统升级", type: "三类项目", stage: "试运行", dept: "安环部", org: "齐鲁石化", date: "2025-12-14", status: "推进中" },
  { name: "江苏石油管网扩建", type: "二类项目", stage: "竣工验收", dept: "工程管理部", org: "江苏石油", date: "2025-12-13", status: "待会签" },
  { name: "中原油田站场改造", type: "三类项目", stage: "可行性研究", dept: "生产技术部", org: "中原油田", date: "2025-12-13", status: "推进中" },
  { name: "中科炼化催化装置优化", type: "一类项目", stage: "基础设计", dept: "设备管理部", org: "中科炼化", date: "2025-12-12", status: "推进中" },
  { name: "镇海炼化公辅系统改造", type: "二类项目", stage: "试运行", dept: "动力车间", org: "镇海炼化", date: "2025-12-12", status: "待整改" },
  { name: "燕山石化储罐区隐患治理", type: "三类项目", stage: "基础设计", dept: "安环部", org: "燕山石化", date: "2025-12-11", status: "推进中" },
  { name: "齐鲁石化污水站升级", type: "二类项目", stage: "竣工验收", dept: "环保管理部", org: "齐鲁石化", date: "2025-12-11", status: "待会签" },
  { name: "江苏石油加油站改造", type: "三类项目", stage: "试运行", dept: "零售管理部", org: "江苏石油", date: "2025-12-10", status: "推进中" }
];

function StsbGroupedBarChart({ data = [], series = [], max = 1200, ticks = [1200, 900, 600, 300, 0] }) {
  return (
    <div className="stsb-axis-chart">
      <div className="stsb-y-axis">
        {ticks.map((tick) => (
          <div key={tick} className="stsb-y-tick">{tick}</div>
        ))}
      </div>
      <div className="stsb-plot">
        <div className="stsb-grid-lines">
          {ticks.map((tick) => (
            <div key={tick} className="stsb-grid-line" />
          ))}
        </div>
        <div className="stsb-x-groups" style={{ gridTemplateColumns: `repeat(${Math.max(1, data.length)}, minmax(0, 1fr))` }}>
          {data.map((item) => (
            <div key={item.label} className="stsb-x-group">
              <div className="stsb-x-bars">
                {item.values.map((val, idx) => (
                  <div key={`${item.label}-${idx}`} className="stsb-x-bar-wrap">
                    <div
                      className="stsb-bar"
                      style={{
                        height: `${Math.max(4, Math.round((Number(val || 0) / max) * 100))}%`,
                        background: series[idx]?.color || "#5b8ff9"
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="stsb-bar-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StsbDrillModal({ open, config = {}, onClose }) {
  if (!open) return null;
  const filters = config.filters || [];
  const columns = config.columns || [];
  const rows = config.rows || [];

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl stsb-drill-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{config.title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">
          <div className="filterbar">
            <div className="filterbar-row">
              <div className="filterbar-left">
                {filters.map((item) => (
                  <div className="filterbar-item" key={item.label}>
                    <div className="filterbar-label">{item.label}</div>
                    <div className="filterbar-input">
                      {item.type === "select" ? (
                        <select className="filterbar-control" defaultValue={item.defaultValue || ""} style={{ minWidth: item.width || 130 }}>
                          {(item.options || []).map((option) => (
                            <option value={option} key={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input className="filterbar-control" placeholder={item.placeholder || `请输入${item.label}`} style={{ minWidth: item.width || 150 }} />
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
          <div className="table-wrap">
            <table className="proto-table">
              <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>{row.map((value, colIndex) => <td key={colIndex}>{value}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="stsb-drill-pager">
            <span>共 400 条</span>
            <button type="button" className="stsb-pager-btn">&lt;</button>
            <button type="button" className="stsb-pager-btn active">1</button>
            <button type="button" className="stsb-pager-btn">2</button>
            <button type="button" className="stsb-pager-btn">3</button>
            <span>...</span>
            <button type="button" className="stsb-pager-btn">40</button>
            <button type="button" className="stsb-pager-btn">&gt;</button>
            <span>10条/页</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [drillModal, setDrillModal] = React.useState("");
  const commonFilters = [
    { label: "所属企业", type: "select", options: ["全部", "镇海炼化", "燕山石化", "齐鲁石化", "江苏石油", "中原油田", "中科炼化"], defaultValue: "全部", width: 140 },
    { label: "项目类型", type: "select", options: ["全部", "一类项目", "二类项目", "三类项目"], defaultValue: "全部", width: 120 }
  ];
  const drillConfigs = {
    total: {
      title: "三同时项目总数明细",
      filters: [
        ...commonFilters,
        { label: "项目名称", placeholder: "请输入项目名称", width: 160 }
      ],
      columns: ["序号", "项目名称", "项目类型", "当前阶段", "责任部门", "所属企业", "计划日期", "状态"],
      rows: drillProjectRows.slice(0, 6).map((row, index) => [String(index + 1), row.name, row.type, row.stage, row.dept, row.org, row.date, row.status])
    },
    focusProject: {
      title: "重点工程建设项目明细",
      filters: [
        ...commonFilters,
        { label: "状态", type: "select", options: ["全部", "推进中", "已完成", "待会签", "待整改"], defaultValue: "全部", width: 110 }
      ],
      columns: ["序号", "项目名称", "项目类型", "当前阶段", "责任部门", "所属企业", "状态"],
      rows: drillProjectRows.filter((row) => row.type === "一类项目" || row.status === "推进中").slice(0, 5).map((row, index) => [String(index + 1), row.name, row.type, row.stage, row.dept, row.org, row.status])
    },
    argument: {
      title: "项目专项论证明细",
      filters: [
        ...commonFilters,
        { label: "论证状态", type: "select", options: ["全部", "未论证", "已论证"], defaultValue: "全部", width: 110 }
      ],
      columns: ["序号", "项目名称", "所属企业", "项目类型", "论证状态", "责任部门", "计划日期"],
      rows: drillProjectRows.slice(0, 6).map((row, index) => [String(index + 1), row.name, row.org, row.type, index % 2 === 0 ? "未论证" : "已论证", row.dept, row.date])
    },
    type: {
      title: "三同时项目类型统计明细",
      filters: [
        ...commonFilters,
        { label: "项目类别", type: "select", options: ["全部", "危化品类项目", "非煤矿山类项目", "其他"], defaultValue: "全部", width: 140 }
      ],
      columns: ["序号", "项目类别", "一类项目", "二类项目", "三类项目", "合计"],
      rows: typeBars.map((item, index) => [String(index + 1), item.label, ...item.values.map(String), String(item.values.reduce((sum, value) => sum + value, 0))])
    },
    stage: {
      title: "三同时项目各阶段统计明细",
      filters: [
        ...commonFilters,
        { label: "阶段", type: "select", options: ["全部", "可行性研究", "基础设计", "试运行", "竣工验收"], defaultValue: "全部", width: 120 }
      ],
      columns: ["序号", "阶段", "一类项目", "二类项目", "三类项目", "合计"],
      rows: stageBars.map((item, index) => [String(index + 1), item.label, ...item.values.map(String), String(item.values.reduce((sum, value) => sum + value, 0))])
    },
    overdue: {
      title: "久试未验项目信息明细",
      filters: commonFilters,
      columns: ["序号", "项目类型", "项目数量", "项目名称", "所属企业", "当前阶段", "状态"],
      rows: progressBars.map((item, index) => [String(index + 1), item.label, `${item.value}个`, drillProjectRows[index]?.name || "-", drillProjectRows[index]?.org || "-", drillProjectRows[index]?.stage || "-", "待推进"])
    }
  };

  return (
    <div className="stsb-wrap">
      <div className="stsb-main">
        <div className="stsb-content">
          <div className="stsb-kpi-row">
            <div className="stsb-kpi-card">
              <button type="button" className="stsb-title-link" onClick={() => setDrillModal("total")}>{kpiMain.title}</button>
              <div className="stsb-kpi-value">{kpiMain.value}</div>
              <div className="stsb-kpi-mini">
                {kpiMain.stats.map((item) => (
                  <div key={item.label} className="stsb-mini-card">
                    <div className="stsb-mini-title">{item.label}</div>
                    <div className="stsb-mini-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stsb-kpi-card stsb-kpi-card-sm">
              <button type="button" className="stsb-title-link" onClick={() => setDrillModal("focusProject")}>{kpiSecond[0].title}</button>
              <div className="stsb-kpi-value">{kpiSecond[0].value}</div>
            </div>

            <div className="stsb-kpi-card stsb-kpi-card-lg">
              <button type="button" className="stsb-title-link" onClick={() => setDrillModal("argument")}>{kpiSecond[1].title}</button>
              <div className="stsb-kpi-value">{kpiSecond[1].value}</div>
              <div className="stsb-kpi-mini">
                {kpiSecond[1].sub.map((item) => (
                  <div key={item.label} className="stsb-mini-card">
                    <div className="stsb-mini-title">{item.label}</div>
                    <div className="stsb-mini-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="stsb-panel-row">
            <div className="stsb-panel">
              <button type="button" className="stsb-panel-title stsb-title-link" onClick={() => setDrillModal("type")}>三同时项目类型统计</button>
              <div className="stsb-panel-chart">
                <div className="stsb-bar-chart">
                  <div className="stsb-line-legend">
                    {stageLegend.map((item) => (
                      <div key={item.label} className="stsb-legend-item">
                        <span className="stsb-legend-dot" style={{ background: item.color }} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="stsb-bar-area">
                    <StsbGroupedBarChart data={typeBars} series={stageLegend} />
                  </div>
                </div>
              </div>
            </div>
            <div className="stsb-panel">
              <button type="button" className="stsb-panel-title stsb-title-link" onClick={() => setDrillModal("stage")}>三同时项目各阶段统计</button>
              <div className="stsb-panel-chart">
                <div className="stsb-bar-chart">
                  <div className="stsb-line-legend">
                    {stageLegend.map((item) => (
                      <div key={item.label} className="stsb-legend-item">
                        <span className="stsb-legend-dot" style={{ background: item.color }} />
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="stsb-bar-area">
                    <StsbGroupedBarChart data={stageBars} series={stageLegend} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stsb-panel-row">
            <div className="stsb-panel">
              <button type="button" className="stsb-panel-title stsb-title-link" onClick={() => setDrillModal("overdue")}>久试未验项目信息统计</button>
              <div className="stsb-panel-chart">
                {progressBars.map((item) => (
                  <div key={item.label} className="stsb-progress-item">
                    <div className="stsb-progress-label">{item.label}</div>
                    <div className="stsb-progress-track">
                      <div className="stsb-progress-fill" style={{ width: `${item.value}%` }} />
                    </div>
                    <div className="stsb-progress-value">{item.value}个</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
      <StsbDrillModal open={!!drillModal} config={drillModal ? drillConfigs[drillModal] : {}} onClose={() => setDrillModal("")} />
    </div>
  );
}
