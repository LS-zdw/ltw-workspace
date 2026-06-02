import React from "react";

const sectorTabs = ["全部", "炼化", "油田", "销售", "工程"];

const riskLegend = [
  { key: "device", label: "装置运行安全风险", color: "#1584ff" },
  { key: "operation", label: "作业安全风险", color: "#53d769" },
  { key: "weather", label: "自然天气风险", color: "#ffca2f" },
  { key: "gas", label: "可燃/有毒气体泄漏风险", color: "#ff625c" }
];

const topTenData = [
  { name: "镇海炼化", sector: "炼化", values: [430, 300, 220, 210] },
  { name: "湖南石化", sector: "炼化", values: [360, 280, 210, 205] },
  { name: "扬子石化", sector: "炼化", values: [300, 260, 210, 195] },
  { name: "茂名石化", sector: "炼化", values: [280, 240, 200, 185] },
  { name: "广州石化", sector: "炼化", values: [220, 230, 210, 190] },
  { name: "南京化学", sector: "工程", values: [190, 210, 200, 185] },
  { name: "巴陵石化", sector: "炼化", values: [170, 205, 190, 175] },
  { name: "燕山石化", sector: "炼化", values: [160, 195, 180, 170] },
  { name: "青岛安工院", sector: "工程", values: [140, 160, 170, 140] },
  { name: "中原油田", sector: "油田", values: [120, 150, 130, 120] }
];

const enterpriseDetailRows = [
  { rank: 1, name: "镇海炼化", sector: "炼化", values: [430, 300, 220, 210] },
  { rank: 2, name: "湖南石化", sector: "炼化", values: [360, 280, 210, 205] },
  { rank: 3, name: "扬子石化", sector: "炼化", values: [300, 260, 210, 195] },
  { rank: 4, name: "茂名石化", sector: "炼化", values: [280, 240, 200, 185] },
  { rank: 5, name: "广州石化", sector: "炼化", values: [220, 230, 210, 190] },
  { rank: 6, name: "南京化学", sector: "工程", values: [190, 210, 200, 185] },
  { rank: 7, name: "巴陵石化", sector: "炼化", values: [170, 205, 190, 175] },
  { rank: 8, name: "燕山石化", sector: "炼化", values: [160, 195, 180, 170] },
  { rank: 9, name: "青岛安工院", sector: "工程", values: [140, 160, 170, 140] },
  { rank: 10, name: "中原油田", sector: "油田", values: [120, 150, 130, 120] },
  { rank: 11, name: "胜利油田", sector: "油田", values: [118, 144, 126, 112] },
  { rank: 12, name: "仪征化纤", sector: "销售", values: [110, 136, 118, 108] },
  { rank: 13, name: "海南炼化", sector: "炼化", values: [108, 132, 116, 102] },
  { rank: 14, name: "天津石化", sector: "炼化", values: [104, 128, 112, 98] },
  { rank: 15, name: "齐鲁石化", sector: "炼化", values: [100, 120, 110, 96] },
  { rank: 16, name: "金陵石化", sector: "炼化", values: [96, 114, 106, 90] },
  { rank: 17, name: "江苏油田", sector: "油田", values: [92, 110, 100, 88] },
  { rank: 18, name: "河南油田", sector: "油田", values: [90, 106, 96, 84] },
  { rank: 19, name: "华北石油局", sector: "油田", values: [84, 100, 90, 80] },
  { rank: 20, name: "西北油田", sector: "油田", values: [82, 96, 86, 78] }
].map((item) => ({
  ...item,
  total: item.values.reduce((sum, value) => sum + value, 0)
}));

const fluctuationCards = [
  { name: "镇海炼化", count: 28 },
  { name: "湖南石化", count: 23 },
  { name: "扬子石化", count: 18 },
  { name: "茂名石化", count: 15 },
  { name: "广州石化", count: 15 },
  { name: "南京化学", count: 13 },
  { name: "巴陵石化", count: 11 },
  { name: "燕山石化", count: 10 },
  { name: "青岛安工院", count: 9 },
  { name: "中原油田", count: 8 },
  { name: "胜利油田", count: 7 },
  { name: "仪征化纤", count: 6 }
];

const fluctuationHistoryByCompany = {
  镇海炼化: [
    { date: "2024-06-01", rank: 13, riskValue: 680, note: "月初隐患排查专项启动" },
    { date: "2024-07-01", rank: 11, riskValue: 702, note: "装置检修叠加高温天气" },
    { date: "2024-08-01", rank: 9, riskValue: 760, note: "受限空间作业增多" },
    { date: "2024-09-01", rank: 8, riskValue: 788, note: "天然气风险预警上升" },
    { date: "2024-10-01", rank: 6, riskValue: 830, note: "气体泄漏告警增加" },
    { date: "2024-11-01", rank: 4, riskValue: 905, note: "重点装置联锁治理" },
    { date: "2024-12-01", rank: 3, riskValue: 968, note: "年底检维修高峰" },
    { date: "2025-01-01", rank: 5, riskValue: 860, note: "冬季专项整治后回落" },
    { date: "2025-02-01", rank: 4, riskValue: 882, note: "复工复产风险叠加" },
    { date: "2025-03-01", rank: 2, riskValue: 1016, note: "春检期间作业风险上升" },
    { date: "2025-04-01", rank: 1, riskValue: 1112, note: "高风险作业密集" },
    { date: "2025-05-20", rank: 1, riskValue: 1160, note: "连续处于榜首" }
  ],
  湖南石化: [
    { date: "2024-06-01", rank: 18, riskValue: 540, note: "常态运行" },
    { date: "2024-07-01", rank: 15, riskValue: 580, note: "雨季天气风险增加" },
    { date: "2024-08-01", rank: 14, riskValue: 602, note: "高温作业增加" },
    { date: "2024-09-01", rank: 12, riskValue: 650, note: "现场作业票数量增加" },
    { date: "2024-10-01", rank: 10, riskValue: 718, note: "专项治理未闭环事项增加" },
    { date: "2024-11-01", rank: 9, riskValue: 736, note: "装置波动" },
    { date: "2024-12-01", rank: 8, riskValue: 768, note: "冬季防冻任务增加" },
    { date: "2025-01-01", rank: 7, riskValue: 792, note: "春节前安全管控" },
    { date: "2025-02-01", rank: 6, riskValue: 820, note: "复工复产" },
    { date: "2025-03-01", rank: 4, riskValue: 906, note: "重点作业集中" },
    { date: "2025-04-01", rank: 2, riskValue: 990, note: "装置隐患回潮" },
    { date: "2025-05-20", rank: 2, riskValue: 1055, note: "持续高位" }
  ]
};

const defaultFluctuationHistory = [
  { date: "2024-06-01", rank: 31, riskValue: 420, note: "风险平稳" },
  { date: "2024-08-01", rank: 24, riskValue: 468, note: "检维修作业增加" },
  { date: "2024-10-01", rank: 19, riskValue: 512, note: "专项排查启动" },
  { date: "2024-12-01", rank: 15, riskValue: 556, note: "冬季风险上升" },
  { date: "2025-02-01", rank: 13, riskValue: 588, note: "复工复产阶段" },
  { date: "2025-05-20", rank: 10, riskValue: 620, note: "进入前十" }
];

const trendByCompany = {
  镇海炼化: [
    { date: "05-06", value: 420 },
    { date: "05-07", value: 510 },
    { date: "05-08", value: 470 },
    { date: "05-09", value: 580 },
    { date: "05-10", value: 460 },
    { date: "05-11", value: 620 },
    { date: "05-12", value: 540 },
    { date: "05-13", value: 670 },
    { date: "05-14", value: 720 },
    { date: "05-15", value: 650 },
    { date: "05-16", value: 810 },
    { date: "05-17", value: 930 },
    { date: "05-18", value: 840 },
    { date: "05-19", value: 760 },
    { date: "05-20", value: 680 }
  ],
  湖南石化: [
    { date: "05-06", value: 360 },
    { date: "05-07", value: 400 },
    { date: "05-08", value: 430 },
    { date: "05-09", value: 470 },
    { date: "05-10", value: 490 },
    { date: "05-11", value: 520 },
    { date: "05-12", value: 560 },
    { date: "05-13", value: 600 },
    { date: "05-14", value: 630 },
    { date: "05-15", value: 680 },
    { date: "05-16", value: 760 },
    { date: "05-17", value: 790 },
    { date: "05-18", value: 810 },
    { date: "05-19", value: 770 },
    { date: "05-20", value: 740 }
  ],
  扬子石化: [
    { date: "05-06", value: 300 },
    { date: "05-07", value: 320 },
    { date: "05-08", value: 360 },
    { date: "05-09", value: 340 },
    { date: "05-10", value: 390 },
    { date: "05-11", value: 450 },
    { date: "05-12", value: 430 },
    { date: "05-13", value: 470 },
    { date: "05-14", value: 520 },
    { date: "05-15", value: 560 },
    { date: "05-16", value: 610 },
    { date: "05-17", value: 690 },
    { date: "05-18", value: 720 },
    { date: "05-19", value: 700 },
    { date: "05-20", value: 660 }
  ]
};

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

function sumValues(values = []) {
  return values.reduce((sum, value) => sum + Number(value || 0), 0);
}

function RiskDrillModal({ open, title, extra, onClose, children, width = "min(1240px, calc(100vw - 28px))" }) {
  if (!open) return null;
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl risk-drill-modal" style={{ width }} onClick={(event) => event.stopPropagation()}>
        <div className="modal-hd">
          <div>
            <div className="modal-title">{title}</div>
            {extra ? <div className="modal-desc">{extra}</div> : null}
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">{children}</div>
      </div>
    </div>
  );
}

function RiskStackedBarChart({ data, legend, onBarClick }) {
  const maxTotal = Math.max(...data.map((item) => sumValues(item.values)), 0);
  const yMax = Math.max(1200, Math.ceil(maxTotal / 200) * 200);
  const ticks = Array.from({ length: 7 }, (_, index) => yMax - (yMax / 6) * index);

  return (
    <div className="risk-cockpit-bar">
      <div className="risk-cockpit-bar-head">
        <div className="risk-cockpit-axis-title">风险总值</div>
        <div className="risk-cockpit-legend">
          {legend.map((item) => (
            <div key={item.key} className="risk-cockpit-legend-item">
              <span className="risk-cockpit-legend-dot" style={{ background: item.color }} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="risk-cockpit-bar-chart">
        <div className="risk-cockpit-y-axis">
          {ticks.map((tick) => (
            <div key={tick} className="risk-cockpit-y-tick">{formatNumber(Math.round(tick))}</div>
          ))}
        </div>
        <div className="risk-cockpit-plot">
          <div className="risk-cockpit-grid">
            {ticks.map((tick) => (
              <div key={tick} className="risk-cockpit-grid-line" />
            ))}
          </div>
          <div className="risk-cockpit-bars" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
            {data.map((item) => (
              <div key={item.name} className="risk-cockpit-bar-group">
                <button type="button" className="risk-cockpit-bar-btn" onClick={() => onBarClick?.(item)}>
                  <div className="risk-cockpit-stack">
                    {item.values.map((value, index) => (
                      <div
                        key={`${item.name}-${legend[index]?.key || index}`}
                        className="risk-cockpit-stack-segment"
                        style={{
                          height: `${Math.max(8, (value / yMax) * 100)}%`,
                          background: `linear-gradient(180deg, ${legend[index]?.color || "#1584ff"} 0%, rgba(255,255,255,0.12) 100%), ${legend[index]?.color || "#1584ff"}`
                        }}
                      />
                    ))}
                  </div>
                </button>
                <div className="risk-cockpit-bar-label">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskTrendChart({ data }) {
  const width = 1120;
  const height = 240;
  const padding = { top: 22, right: 30, bottom: 48, left: 44 };
  const values = data.map((item) => item.value);
  const max = Math.max(...values, 1000);
  const min = 0;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const points = data.map((item, index) => {
    const x = padding.left + (innerWidth / Math.max(data.length - 1, 1)) * index;
    const y = padding.top + innerHeight - ((item.value - min) / Math.max(max - min, 1)) * innerHeight;
    return { ...item, x, y };
  });
  const areaPath = [
    `M ${points[0]?.x || padding.left} ${padding.top + innerHeight}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1]?.x || padding.left} ${padding.top + innerHeight}`,
    "Z"
  ].join(" ");
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const ticks = [1000, 800, 600, 400, 200, 0];

  return (
    <div className="risk-trend-chart">
      <div className="risk-trend-axis-title">风险值</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="risk-trend-svg" role="img" aria-label="企业15天风险趋势图">
        <defs>
          <linearGradient id="riskTrendArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2f91ff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#2f91ff" stopOpacity="0.05" />
          </linearGradient>
          <filter id="riskTrendGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {ticks.map((tick) => {
          const y = padding.top + innerHeight - ((tick - min) / Math.max(max - min, 1)) * innerHeight;
          return (
            <g key={tick}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} className="risk-trend-grid-line" />
              <text x={padding.left - 12} y={y + 4} className="risk-trend-y-label">{formatNumber(tick)}</text>
            </g>
          );
        })}
        <path d={areaPath} fill="url(#riskTrendArea)" />
        <path d={linePath} className="risk-trend-line" filter="url(#riskTrendGlow)" />
        {points.map((point) => (
          <g key={point.date}>
            <circle cx={point.x} cy={point.y} r="4.5" className="risk-trend-point" />
            <text x={point.x} y={point.y - 12} textAnchor="middle" className="risk-trend-value">{point.value}</text>
            <text x={point.x} y={height - 14} textAnchor="middle" className="risk-trend-x-label">{point.date}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function SectionFrame({ index, title, extra, children }) {
  return (
    <section className="risk-screen-section">
      <div className="risk-screen-section-header">
        <div className="risk-screen-section-title">
          <span className="risk-screen-section-index">{index}</span>
          <span>{title}</span>
        </div>
        {extra ? <div className="risk-screen-section-extra">{extra}</div> : null}
      </div>
      <div className="risk-screen-section-body">{children}</div>
    </section>
  );
}

export default function RiskHazardCockpitPage() {
  const now = "2025-05-20 10:30:45";
  const [activeSector, setActiveSector] = React.useState("全部");
  const [selectedTrendCompany, setSelectedTrendCompany] = React.useState("镇海炼化");
  const [topTenModal, setTopTenModal] = React.useState({ open: false, company: "", sector: "全部" });
  const [fluctuationModal, setFluctuationModal] = React.useState({ open: false, company: "", days: "30" });

  const filteredTopTen = React.useMemo(() => {
    if (activeSector === "全部") return topTenData;
    return topTenData.filter((item) => item.sector === activeSector);
  }, [activeSector]);

  const topTenModalRows = React.useMemo(() => {
    const rows = activeSector === "全部"
      ? enterpriseDetailRows
      : enterpriseDetailRows.filter((item) => item.sector === activeSector);
    return rows.slice(0, 20);
  }, [activeSector]);

  const trendCompanies = React.useMemo(
    () => Object.keys(trendByCompany),
    []
  );

  const selectedTrendData = trendByCompany[selectedTrendCompany] || trendByCompany[trendCompanies[0]] || [];

  const selectedFluctuationRows = React.useMemo(() => {
    const rows = fluctuationHistoryByCompany[fluctuationModal.company] || defaultFluctuationHistory;
    if (fluctuationModal.days === "30") return rows.slice(-2);
    if (fluctuationModal.days === "90") return rows.slice(-4);
    if (fluctuationModal.days === "180") return rows.slice(-6);
    return rows;
  }, [fluctuationModal.company, fluctuationModal.days]);

  return (
    <div className="risk-screen-page">
      <div className="risk-screen-shell">
        <header className="risk-screen-header">
          <div className="risk-screen-header-line left" />
          <div className="risk-screen-title-wrap">
            <div className="risk-screen-title">中国石化安全一体化管理平台</div>
          </div>
          <div className="risk-screen-header-time">
            <span className="risk-screen-clock">◷</span>
            <span>{now}</span>
          </div>
        </header>

        <div className="risk-screen-filterbar">
          <div className="risk-screen-filter-label">板块筛选</div>
          <div className="risk-screen-tab-list">
            {sectorTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`risk-screen-tab${activeSector === tab ? " active" : ""}`}
                onClick={() => setActiveSector(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="risk-screen-filter-note">筛选范围：企业TOP10、企业风险排名波动情况</div>
        </div>

        <SectionFrame
          index="1"
          title="企业TOP10"
          extra={<div className="risk-screen-inline-filter">筛选条件：<strong>{activeSector}</strong>板块，近30天</div>}
        >
          <RiskStackedBarChart
            data={filteredTopTen}
            legend={riskLegend}
            onBarClick={(item) => setTopTenModal({ open: true, company: item.name, sector: activeSector })}
          />
        </SectionFrame>

        <SectionFrame index="2" title="企业风险排名波动情况回溯">
          <div className="risk-company-grid">
            {fluctuationCards.map((item) => (
              <button
                key={item.name}
                type="button"
                className="risk-company-card risk-company-card-btn"
                onClick={() => setFluctuationModal({ open: true, company: item.name, days: "30" })}
              >
                <div className="risk-company-icon" aria-hidden="true">🏢</div>
                <div className="risk-company-content">
                  <div className="risk-company-name">{item.name}</div>
                  <div className="risk-company-count">次数：{item.count}</div>
                </div>
              </button>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame
          index="3"
          title="企业15天风险趋势图"
          extra={
            <div className="risk-screen-inline-filter">
              可切换企业
              <select
                className="risk-screen-select"
                value={selectedTrendCompany}
                onChange={(event) => setSelectedTrendCompany(event.target.value)}
              >
                {trendCompanies.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          }
        >
          <RiskTrendChart data={selectedTrendData} />
        </SectionFrame>
      </div>

      <RiskDrillModal
        open={topTenModal.open}
        title={`企业TOP10穿透明细${topTenModal.company ? ` - ${topTenModal.company}` : ""}`}
        extra={`显示企业排名明细列表，当前筛选板块：${topTenModal.sector || "全部"}`}
        onClose={() => setTopTenModal({ open: false, company: "", sector: activeSector })}
      >
        <div className="risk-modal-toolbar">
          <div className="risk-modal-summary">共 {topTenModalRows.length} 家企业，按风险总值从高到低展示</div>
        </div>
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th>排名</th>
                <th>企业名称</th>
                <th>板块</th>
                <th>风险总值</th>
                <th>装置运行风险值</th>
                <th>作业安全风险值</th>
                <th>自然天气风险值</th>
                <th>可燃/有毒气体泄漏风险值</th>
              </tr>
            </thead>
            <tbody>
              {topTenModalRows.map((row) => (
                <tr key={row.name} className={row.name === topTenModal.company ? "risk-modal-row-active" : ""}>
                  <td>{row.rank}</td>
                  <td>{row.name}</td>
                  <td>{row.sector}</td>
                  <td>{formatNumber(row.total)}</td>
                  <td>{formatNumber(row.values[0])}</td>
                  <td>{formatNumber(row.values[1])}</td>
                  <td>{formatNumber(row.values[2])}</td>
                  <td>{formatNumber(row.values[3])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RiskDrillModal>

      <RiskDrillModal
        open={fluctuationModal.open}
        title={`企业风险排名波动回溯 - ${fluctuationModal.company || ""}`}
        extra="统计过去1年内的排名变化情况，默认近30天"
        onClose={() => setFluctuationModal({ open: false, company: "", days: "30" })}
        width="min(1080px, calc(100vw - 28px))"
      >
        <div className="risk-modal-toolbar">
          <div className="risk-modal-filter-group">
            <span>查询时间</span>
            <select
              className="risk-modal-select"
              value={fluctuationModal.days}
              onChange={(event) => setFluctuationModal((prev) => ({ ...prev, days: event.target.value }))}
            >
              <option value="30">近30天</option>
              <option value="90">近90天</option>
              <option value="180">近180天</option>
              <option value="365">近1年</option>
            </select>
          </div>
          <div className="risk-modal-summary">当前企业：{fluctuationModal.company}</div>
        </div>
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th>统计日期</th>
                <th>企业名称</th>
                <th>风险排名</th>
                <th>风险值</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              {selectedFluctuationRows.map((row) => (
                <tr key={`${fluctuationModal.company}-${row.date}`}>
                  <td>{row.date}</td>
                  <td>{fluctuationModal.company}</td>
                  <td>{row.rank}</td>
                  <td>{formatNumber(row.riskValue)}</td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RiskDrillModal>
    </div>
  );
}
