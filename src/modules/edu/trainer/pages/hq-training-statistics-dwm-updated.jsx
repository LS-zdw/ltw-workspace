import React from "react";

const tabs = [
  { key: "day", label: "日动态", period: "统计日期：2025-05-26（星期一）", update: "数据更新：09:30" },
  { key: "week", label: "周总结", period: "统计周期：2025-05-19 至 2025-05-25", update: "数据更新：09:30" },
  { key: "month", label: "月汇报", period: "统计月份：2025年4月", update: "数据更新：09:30" }
];

const blueSeries = ["#0f56e8", "#2f78ff", "#73a8ff", "#c7dcff"];

const dashboardData = {
  day: {
    summary: [
      { icon: "◎", title: "企业级培训计划完成率", value: "86.4", unit: "%", note: "较昨日", delta: "↑ 1.8", deltaUnit: "个百分点", deltaTone: "up" },
      { icon: "◫", title: "过期证书数量", value: "328", unit: "本", note: "较昨日", delta: "↓ 16", deltaUnit: "本", deltaTone: "down" },
      { icon: "▥", title: "当年未完成年度培训备案企业数", value: "7", unit: "家", note: "较昨日", delta: "↓ 1", deltaUnit: "家", deltaTone: "down" },
      { icon: "▤", title: "当日新增培训记录", value: "142", unit: "条", note: "较昨日", delta: "↑ 18", deltaUnit: "条", deltaTone: "up" }
    ],
    sections: [
      {
        no: 1,
        title: "企业级培训计划完成率",
        desc: "显示全集团企业级安全培训的完成率，支持下钻查看企业明细",
        kind: "donutBars",
        donutTotal: "86.4%",
        donutSubtitle: "总完成率",
        donutRows: [
          { label: "已完成", value: 86.4, text: "86.4%", color: "#1f63f3" },
          { label: "未完成", value: 13.6, text: "13.6%", color: "#cfd9ea" }
        ],
        barsTitle: "各企业完成率",
        barsSuffix: "%",
        barsMax: 100,
        bars: [
          { label: "镇海炼化", value: 96.2 },
          { label: "湖南石化", value: 91.8 },
          { label: "扬子石化", value: 88.6 },
          { label: "茂名石化", value: 85.3 },
          { label: "广州石化", value: 82.5 },
          { label: "南化公司", value: 79.4 }
        ]
      },
      {
        no: 2,
        title: "过期证书数量",
        desc: "显示已过期的安全证书数量，按企业排序",
        kind: "statBars",
        statTitle: "已过期证书总数",
        statValue: "328",
        statUnit: "本",
        statFoot: "较昨日 ↓ 16 本",
        barsTitle: "各企业过期证书数量",
        barsSuffix: "",
        barsMax: 80,
        bars: [
          { label: "广州石化", value: 76 },
          { label: "南化公司", value: 65 },
          { label: "茂名石化", value: 58 },
          { label: "扬子石化", value: 49 },
          { label: "湖南石化", value: 43 },
          { label: "镇海炼化", value: 37 }
        ]
      },
      {
        no: 3,
        title: "当年未完成年度培训备案情况",
        desc: "显示当年企业级培训计划未完成总部备案情况",
        kind: "table",
        columns: ["企业名称", "备案状态", "逾期天数", "计划完成截止日", "备注"],
        rows: [
          ["广州石化", "未完成备案", "18天", "2025-05-08", "资料待补充"],
          ["南化公司", "未完成备案", "11天", "2025-05-15", "流程审核中"],
          ["茂名石化", "未完成备案", "8天", "2025-05-18", "待企业提交"],
          ["扬子石化", "未完成备案", "5天", "2025-05-21", "待完善附件"],
          ["湖南石化", "已备案", "0天", "2025-05-20", "-"],
          ["镇海炼化", "已备案", "0天", "2025-05-18", "-"]
        ],
        rowToneColumn: 1,
        rowDelayColumn: 2
      },
      {
        no: 4,
        title: "每日新增培训记录",
        desc: "动态显示当日新产生的安全培训信息",
        kind: "lineTable",
        lineTitle: "近7日新增培训记录趋势（条）",
        lineLabels: ["5/20", "5/21", "5/22", "5/23", "5/24", "5/25", "5/26"],
        lineValues: [96, 104, 112, 118, 121, 124, 142],
        columns: ["企业", "培训主题", "培训方式", "人数", "时间"],
        rows: [
          ["镇海炼化", "受限空间作业安全培训", "线下授课", "28", "09:10"],
          ["湖南石化", "承包商入场安全教育", "线上培训", "22", "10:00"],
          ["扬子石化", "直接作业监护专项培训", "线下授课", "26", "10:45"],
          ["茂名石化", "消防应急处置培训", "线下实操", "18", "14:00"],
          ["广州石化", "危险化学品管理培训", "线上培训", "24", "15:20"],
          ["南化公司", "事故案例警示教育", "线下授课", "24", "16:10"]
        ]
      }
    ]
  },
  week: {
    summary: [
      { icon: "◎", title: "上周企业级安全培训计划及进度", value: "89.2", unit: "%", note: "计划 326 项 | 完成 291 项" },
      { icon: "◉", title: "上周企业安全培训证书取证人数", value: "428", unit: "人", note: "较前周", delta: "↑ 36", deltaUnit: "人", deltaTone: "up" },
      { icon: "▤", title: "上周企业级安全培训完成数量", value: "56", unit: "期", note: "较前周", delta: "↑ 5", deltaUnit: "期", deltaTone: "up" }
    ],
    sections: [
      {
        no: 1,
        title: "上周企业级安全培训计划及进度",
        desc: "显示上周企业级安全培训计划数量及执行进度",
        kind: "donutStackBars",
        donutTotal: "89.2%",
        donutSubtitle: "总完成率",
        donutRows: [
          { label: "已完成", value: 291, text: "291 项", color: "#1658ea" },
          { label: "进行中", value: 23, text: "23 项", color: "#7eb0ff" },
          { label: "未开始", value: 12, text: "12 项", color: "#d5deeb" }
        ],
        barsTitle: "各企业计划与执行进度（项）",
        stackedMax: 80,
        stackedRows: [
          { label: "镇海炼化", parts: [58, 3, 1], total: 62 },
          { label: "湖南石化", parts: [52, 4, 2], total: 58 },
          { label: "扬子石化", parts: [49, 5, 2], total: 56 },
          { label: "茂名石化", parts: [46, 4, 2], total: 52 },
          { label: "广州石化", parts: [44, 3, 1], total: 48 },
          { label: "南化公司", parts: [42, 4, 2], total: 48 }
        ],
        stackedLegend: ["已完成", "进行中", "未开始"]
      },
      {
        no: 2,
        title: "上周企业安全培训证书取证情况",
        desc: "显示上周企业安全培训证书取证数量及证书分类",
        kind: "statDonutBars",
        statTitle: "上周新取证人数",
        statValue: "428",
        statUnit: "人",
        statFoot: "较前周 ↑ 36 人",
        statSecondaryTitle: "覆盖企业数",
        statSecondaryValue: "26",
        statSecondaryUnit: "家",
        donutTitle: "证书分类占比",
        donutRows: [
          { label: "安全管理人员证", value: 36.4, text: "36.4%", color: "#1557e6" },
          { label: "特种作业证", value: 31.5, text: "31.5%", color: "#2e77ff" },
          { label: "直接作业监护证", value: 18.7, text: "18.7%", color: "#75a8ff" },
          { label: "承包商培训证", value: 13.4, text: "13.4%", color: "#c5dafd" }
        ],
        barsTitle: "各企业取证人数TOP5（人）",
        barsSuffix: "",
        barsMax: 100,
        bars: [
          { label: "镇海炼化", value: 82 },
          { label: "湖南石化", value: 76 },
          { label: "扬子石化", value: 71 },
          { label: "茂名石化", value: 64 },
          { label: "广州石化", value: 58 }
        ]
      },
      {
        no: 3,
        title: "上周企业级安全培训信息展示",
        desc: "显示上周已完成企业级安全培训的详细信息清单",
        kind: "table",
        columns: ["企业", "培训主题", "培训方式", "完成人数", "完成日期", "状态"],
        rows: [
          ["镇海炼化", "化工装置作业安全培训", "线下授课", "42", "2025-05-25", "已完成"],
          ["湖南石化", "承包商入场安全教育", "线上培训", "36", "2025-05-24", "已完成"],
          ["扬子石化", "重点作业监护专项培训", "线下授课", "38", "2025-05-24", "已完成"],
          ["茂名石化", "消防应急演练培训", "线下实操", "31", "2025-05-23", "已完成"],
          ["广州石化", "危险化学品管理培训", "线上培训", "29", "2025-05-22", "已完成"],
          ["南化公司", "事故案例警示教育", "线下授课", "27", "2025-05-21", "已完成"]
        ],
        rowToneColumn: 5
      }
    ]
  },
  month: {
    summary: [
      { icon: "◫", title: "上月集团公司安全培训开展情况", value: "68", unit: "场", note: "较3月", delta: "↑ 9", deltaUnit: "场", deltaTone: "up" },
      { icon: "◎", title: "上月企业年度培训计划执行率", value: "91.3", unit: "%", note: "较3月", delta: "↑ 3.4", deltaUnit: "个百分点", deltaTone: "up" },
      { icon: "▣", title: "上月HSE关键岗位人员取证数量", value: "126", unit: "人", note: "较3月", delta: "↑ 14", deltaUnit: "人", deltaTone: "up" },
      { icon: "★", title: "上月企业培训综合得分排名", value: "TOP1", unit: "镇海炼化", note: "综合得分 95.6 分" }
    ],
    sections: [
      {
        no: 1,
        title: "上月集团公司安全培训开展情况",
        desc: "显示上月集团公司安全培训开展内容及总体情况",
        kind: "summaryDonutTable",
        summaryCards: [
          { label: "培训场次", value: "68", unit: "场" },
          { label: "参训人数", value: "4,286", unit: "人" },
          { label: "覆盖企业数", value: "26", unit: "家" },
          { label: "平均满意度", value: "94.8", unit: "分" }
        ],
        donutTitle: "培训类型分布（按场次）",
        donutTotal: "68",
        donutSubtitle: "总场次",
        donutRows: [
          { label: "安全生产法规与制度", value: 29.4, text: "29.4%", color: "#1557e6" },
          { label: "风险识别与隐患排查", value: 25.0, text: "25.0%", color: "#337dff" },
          { label: "应急管理与处置", value: 20.6, text: "20.6%", color: "#77a9ff" },
          { label: "设备操作与维护", value: 14.7, text: "14.7%", color: "#a9c8ff" },
          { label: "职业健康与防护", value: 10.3, text: "10.3%", color: "#d7e2f3" }
        ],
        columns: ["培训类型", "场次", "占比"],
        rows: [
          ["安全生产法规与制度", "20", "29.4%"],
          ["风险识别与隐患排查", "17", "25.0%"],
          ["应急管理与处置", "14", "20.6%"],
          ["设备操作与维护", "10", "14.7%"],
          ["职业健康与防护", "7", "10.3%"]
        ]
      },
      {
        no: 2,
        title: "上月企业年度培训计划执行率",
        desc: "显示上月企业年度培训计划执行完成情况，包括计划数量、完成数量",
        kind: "metricCombo",
        metricCards: [
          { label: "总体计划数量", value: "528", unit: "项" },
          { label: "总体完成数量", value: "482", unit: "项" },
          { label: "总体执行率", value: "91.3", unit: "%" }
        ],
        comboLabels: ["镇海炼化", "湖南石化", "扬子石化", "茂名石化", "广州石化", "南化公司"],
        comboPlan: [92, 86, 82, 78, 96, 94],
        comboDone: [88, 80, 75, 70, 85, 84],
        comboRate: [95.7, 93.0, 91.5, 89.7, 88.5, 89.4]
      },
      {
        no: 3,
        title: "上月HSE关键岗位人员取证情况",
        desc: "显示上月各企业关键岗位人员取证的数量",
        kind: "statBarsPills",
        statTitle: "新增取证人数",
        statValue: "126",
        statUnit: "人",
        statFoot: "较3月 ↑ 14 人",
        barsTitle: "各企业新增取证人数（人）",
        barsMax: 30,
        bars: [
          { label: "镇海炼化", value: 26 },
          { label: "湖南石化", value: 23 },
          { label: "扬子石化", value: 21 },
          { label: "茂名石化", value: 20 },
          { label: "广州石化", value: 19 },
          { label: "南化公司", value: 17 }
        ],
        pills: [
          { label: "安全管理人员", value: "38", unit: "人" },
          { label: "注册安全工程师", value: "29", unit: "人" },
          { label: "特种作业人员", value: "24", unit: "人" },
          { label: "设备管理人员", value: "21", unit: "人" },
          { label: "应急救援人员", value: "14", unit: "人" }
        ]
      },
      {
        no: 4,
        title: "上月企业培训综合得分排名",
        desc: "显示上月各企业培训综合得分排名，按得分高低排序",
        kind: "rankBars",
        rankRows: [
          { rank: 1, company: "镇海炼化", score: 95.6, parts: [28.8, 28.6, 18.9, 19.3] },
          { rank: 2, company: "湖南石化", score: 93.8, parts: [28.2, 27.9, 18.5, 19.2] },
          { rank: 3, company: "扬子石化", score: 91.7, parts: [27.6, 27.1, 18.2, 18.8] },
          { rank: 4, company: "茂名石化", score: 89.4, parts: [26.9, 26.7, 17.8, 18.0] },
          { rank: 5, company: "广州石化", score: 87.9, parts: [26.3, 26.0, 17.4, 18.2] },
          { rank: 6, company: "南化公司", score: 86.5, parts: [25.8, 25.4, 17.1, 18.2] }
        ],
        rankLegend: [
          { label: "计划执行(30分)", color: "#1557e6" },
          { label: "取证率(30分)", color: "#5b8ff9" },
          { label: "覆盖率(20分)", color: "#36b5c8" },
          { label: "满意度(20分)", color: "#ff9d2e" }
        ]
      }
    ]
  }
};

function TabBar({ active, onChange }) {
  return (
    <div className="edu-dash-tabs">
      {tabs.map((item) => (
        <button key={item.key} type="button" className={`edu-dash-tab${active === item.key ? " active" : ""}`} onClick={() => onChange(item.key)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

function SummaryCard({ item }) {
  return (
    <div className="edu-dash-summary-card">
      <div className="edu-dash-summary-icon">{item.icon}</div>
      <div className="edu-dash-summary-body">
        <div className="edu-dash-summary-title">{item.title}</div>
        <div className="edu-dash-summary-value-row">
          <span className="edu-dash-summary-value">{item.value}</span>
          <span className="edu-dash-summary-unit">{item.unit}</span>
        </div>
        <div className="edu-dash-summary-note">
          <span>{item.note}</span>
          {item.delta ? <span className={`edu-dash-delta ${item.deltaTone || ""}`}>{item.delta}</span> : null}
          {item.deltaUnit ? <span>{item.deltaUnit}</span> : null}
        </div>
      </div>
    </div>
  );
}

function SectionCard({ no, title, desc, children }) {
  return (
    <section className="edu-dash-panel">
      <div className="edu-dash-panel-head">
        <div className="edu-dash-panel-no">{no}</div>
        <div>
          <div className="edu-dash-panel-title">{title}</div>
          <div className="edu-dash-panel-desc">{desc}</div>
        </div>
      </div>
      {children}
    </section>
  );
}

function DonutChart({ total, subtitle, rows, size = 190, inner = 96 }) {
  const segments = [];
  let start = 0;
  rows.forEach((row) => {
    const end = start + row.value;
    segments.push(`${row.color} ${start}% ${end}%`);
    start = end;
  });
  return (
    <div className="edu-dash-donut-wrap">
      <div className="edu-dash-donut" style={{ width: size, height: size, background: `conic-gradient(${segments.join(", ")})` }}>
        <div className="edu-dash-donut-inner" style={{ width: inner, height: inner }}>
          <div className="edu-dash-donut-total">{total}</div>
          <div className="edu-dash-donut-subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="edu-dash-legend-list">
        {rows.map((row) => (
          <div key={row.label} className="edu-dash-legend-item">
            <span className="edu-dash-legend-dot" style={{ background: row.color }} />
            <span className="edu-dash-legend-label">{row.label}</span>
            <span className="edu-dash-legend-text">{row.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HorizontalBars({ title, items, max, suffix = "" }) {
  return (
    <div className="edu-dash-bars-block">
      <div className="edu-dash-subtitle">{title}</div>
      <div className="edu-dash-bars-list">
        {items.map((item) => (
          <div key={item.label} className="edu-dash-bar-row">
            <div className="edu-dash-bar-label">{item.label}</div>
            <div className="edu-dash-bar-track">
              <div className="edu-dash-bar-fill" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
            <div className="edu-dash-bar-value">{item.value}{suffix}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniStat({ title, value, unit, foot, secondaryTitle, secondaryValue, secondaryUnit }) {
  return (
    <div className="edu-dash-mini-stat">
      <div className="edu-dash-mini-stat-card">
        <div className="edu-dash-mini-stat-title">{title}</div>
        <div className="edu-dash-mini-stat-value-row"><span>{value}</span><em>{unit}</em></div>
        <div className="edu-dash-mini-stat-foot">{foot}</div>
      </div>
      {secondaryTitle ? (
        <div className="edu-dash-mini-stat-secondary">
          <div>{secondaryTitle}</div>
          <div className="edu-dash-mini-stat-secondary-value">{secondaryValue}<em>{secondaryUnit}</em></div>
        </div>
      ) : null}
    </div>
  );
}

function BasicTable({ columns, rows, toneColumn, delayColumn }) {
  return (
    <div className="table-wrap">
      <table className="proto-table edu-dash-table">
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIndex) => {
                const tone = cellIndex === toneColumn ? String(cell) : "";
                const delayTone = cellIndex === delayColumn ? String(cell) : "";
                const className = tone.includes("未完成") ? "danger"
                  : tone.includes("已备案") || tone.includes("已完成") ? "success"
                    : delayTone !== "" && delayTone !== "0天" && delayTone !== "-" ? "warn" : "";
                return <td key={cellIndex} className={className}>{cell}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LineChart({ labels, values, title }) {
  const width = 520;
  const height = 240;
  const padding = { top: 16, right: 24, bottom: 30, left: 28 };
  const max = Math.max(...values, 150);
  const min = Math.min(...values, 0);
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const points = values.map((value, index) => {
    const x = padding.left + (innerWidth * index) / Math.max(values.length - 1, 1);
    const y = padding.top + innerHeight - ((value - min) / Math.max(max - min, 1)) * innerHeight;
    return [x, y];
  });
  const polyline = points.map((point) => point.join(",")).join(" ");
  return (
    <div className="edu-dash-line-card">
      <div className="edu-dash-subtitle">{title}</div>
      <svg viewBox={`0 0 ${width} ${height}`} className="edu-dash-line-svg">
        {[0, 1, 2, 3].map((tick) => {
          const y = padding.top + (innerHeight * tick) / 3;
          return <line key={tick} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#d8e7ff" strokeWidth="1" />;
        })}
        <polyline fill="none" stroke="#2b6fff" strokeWidth="3" points={polyline} />
        {points.map((point, index) => (
          <g key={labels[index]}>
            <circle cx={point[0]} cy={point[1]} r="5" fill="#2b6fff" />
            <text x={point[0]} y={point[1] - 12} textAnchor="middle" fontSize="12" fill="#173873" fontWeight="700">{values[index]}</text>
            <text x={point[0]} y={height - 10} textAnchor="middle" fontSize="12" fill="#506b97">{labels[index]}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function StackedBars({ title, rows, max, legend }) {
  return (
    <div className="edu-dash-bars-block">
      <div className="edu-dash-subtitle">{title}</div>
      <div className="edu-dash-stack-legend">
        {legend.map((item, index) => (
          <span key={item}><i style={{ background: blueSeries[index] }} />{item}</span>
        ))}
        <span className="edu-dash-stack-total">合计</span>
      </div>
      <div className="edu-dash-bars-list">
        {rows.map((row) => {
          const totalWidth = (row.total / max) * 100;
          return (
            <div key={row.label} className="edu-dash-stack-row">
              <div className="edu-dash-bar-label">{row.label}</div>
              <div className="edu-dash-stack-track">
                <div className="edu-dash-stack-fill" style={{ width: `${totalWidth}%` }}>
                  {row.parts.map((part, index) => (
                    <div key={index} className="edu-dash-stack-part" style={{ width: `${(part / row.total) * 100}%`, background: blueSeries[index] }}>
                      {part > 0 ? <span>{part}</span> : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="edu-dash-bar-value">{row.total}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCardsRow({ items }) {
  return (
    <div className="edu-dash-summary-mini-grid">
      {items.map((item) => (
        <div key={item.label} className="edu-dash-summary-mini-card">
          <div className="edu-dash-summary-mini-label">{item.label}</div>
          <div className="edu-dash-summary-mini-value">{item.value}<em>{item.unit}</em></div>
        </div>
      ))}
    </div>
  );
}

function MetricCardsRow({ items }) {
  return (
    <div className="edu-dash-metric-grid">
      {items.map((item) => (
        <div key={item.label} className="edu-dash-metric-card">
          <div className="edu-dash-metric-label">{item.label}</div>
          <div className="edu-dash-metric-value">{item.value}<em>{item.unit}</em></div>
        </div>
      ))}
    </div>
  );
}

function ComboChart({ labels, planValues, doneValues, rateValues }) {
  const width = 760;
  const height = 280;
  const padding = { top: 20, right: 46, bottom: 42, left: 34 };
  const maxBars = Math.max(...planValues, ...doneValues, 100);
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const groupWidth = innerWidth / labels.length;
  const barWidth = 18;
  const ratePoints = rateValues.map((value, index) => {
    const x = padding.left + groupWidth * index + groupWidth / 2;
    const y = padding.top + innerHeight - ((value - 60) / 40) * innerHeight;
    return [x, y];
  });
  return (
    <div className="edu-dash-combo-card">
      <div className="edu-dash-stack-legend">
        <span><i style={{ background: "#b9d0ff" }} />计划数量</span>
        <span><i style={{ background: "#1f63f3" }} />完成数量</span>
        <span><i style={{ background: "#ff8b00" }} />执行率</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="edu-dash-line-svg">
        {[0, 1, 2, 3, 4].map((tick) => {
          const y = padding.top + (innerHeight * tick) / 4;
          return <line key={tick} x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#d8e7ff" strokeWidth="1" />;
        })}
        {labels.map((label, index) => {
          const x = padding.left + groupWidth * index + groupWidth / 2;
          const planHeight = (planValues[index] / maxBars) * innerHeight;
          const doneHeight = (doneValues[index] / maxBars) * innerHeight;
          return (
            <g key={label}>
              <rect x={x - 22} y={padding.top + innerHeight - planHeight} width={barWidth} height={planHeight} rx="4" fill="#b9d0ff" />
              <rect x={x + 2} y={padding.top + innerHeight - doneHeight} width={barWidth} height={doneHeight} rx="4" fill="#1f63f3" />
              <text x={x - 13} y={padding.top + innerHeight - planHeight - 8} textAnchor="middle" fontSize="11" fill="#28487a" fontWeight="700">{planValues[index]}</text>
              <text x={x + 11} y={padding.top + innerHeight - doneHeight - 8} textAnchor="middle" fontSize="11" fill="#0f56e8" fontWeight="700">{doneValues[index]}</text>
              <text x={x} y={height - 14} textAnchor="middle" fontSize="12" fill="#4d6690">{label}</text>
            </g>
          );
        })}
        <polyline fill="none" stroke="#ff8b00" strokeWidth="3" points={ratePoints.map((point) => point.join(",")).join(" ")} />
        {ratePoints.map((point, index) => (
          <g key={`p-${labels[index]}`}>
            <circle cx={point[0]} cy={point[1]} r="4" fill="#ff8b00" />
            <text x={point[0]} y={point[1] + 18} textAnchor="middle" fontSize="11" fill="#ff8b00" fontWeight="700">{rateValues[index]}%</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function VerticalBars({ title, items, max }) {
  return (
    <div className="edu-dash-vertical-card">
      <div className="edu-dash-subtitle">{title}</div>
      <div className="edu-dash-vertical-bars">
        {items.map((item) => (
          <div key={item.label} className="edu-dash-vertical-col">
            <div className="edu-dash-vertical-value">{item.value}</div>
            <div className="edu-dash-vertical-bar-wrap">
              <div className="edu-dash-vertical-bar" style={{ height: `${(item.value / max) * 100}%` }} />
            </div>
            <div className="edu-dash-vertical-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PillsRow({ items }) {
  return (
    <div className="edu-dash-pill-row">
      {items.map((item) => (
        <div key={item.label} className="edu-dash-pill-card">
          <div className="edu-dash-pill-label">{item.label}</div>
          <div className="edu-dash-pill-value">{item.value}<em>{item.unit}</em></div>
        </div>
      ))}
    </div>
  );
}

function RankBars({ rows, legend }) {
  return (
    <div className="edu-dash-rank-layout">
      <div className="table-wrap">
        <table className="proto-table edu-dash-table">
          <thead>
            <tr><th>排名</th><th>企业名称</th><th>综合得分</th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.company}>
                <td className={row.rank <= 3 ? "danger" : ""}>{row.rank}</td>
                <td>{row.company}</td>
                <td>{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="edu-dash-stack-legend">
          {legend.map((item) => <span key={item.label}><i style={{ background: item.color }} />{item.label}</span>)}
        </div>
        <div className="edu-dash-rank-bars">
          {rows.map((row) => {
            const total = row.parts.reduce((sum, part) => sum + part, 0);
            return (
              <div key={row.company} className="edu-dash-rank-bar-row">
                <div className="edu-dash-bar-label">{row.company}</div>
                <div className="edu-dash-rank-track">
                  {row.parts.map((part, index) => (
                    <div key={index} className="edu-dash-rank-part" style={{ width: `${(part / total) * 100}%`, background: legend[index].color }}>
                      <span>{part}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DayView({ sections }) {
  return (
    <>
      <div className="edu-dash-grid-2">
        <SectionCard {...sections[0]}>
          <div className="edu-dash-split">
            <DonutChart total={sections[0].donutTotal} subtitle={sections[0].donutSubtitle} rows={sections[0].donutRows} />
            <HorizontalBars title={sections[0].barsTitle} items={sections[0].bars} max={sections[0].barsMax} suffix={sections[0].barsSuffix} />
          </div>
        </SectionCard>
        <SectionCard {...sections[1]}>
          <div className="edu-dash-split">
            <MiniStat title={sections[1].statTitle} value={sections[1].statValue} unit={sections[1].statUnit} foot={sections[1].statFoot} />
            <HorizontalBars title={sections[1].barsTitle} items={sections[1].bars} max={sections[1].barsMax} suffix={sections[1].barsSuffix} />
          </div>
        </SectionCard>
      </div>
      <div className="edu-dash-grid-2">
        <SectionCard {...sections[2]}>
          <BasicTable columns={sections[2].columns} rows={sections[2].rows} toneColumn={sections[2].rowToneColumn} delayColumn={sections[2].rowDelayColumn} />
        </SectionCard>
        <SectionCard {...sections[3]}>
          <div className="edu-dash-half-grid">
            <LineChart labels={sections[3].lineLabels} values={sections[3].lineValues} title={sections[3].lineTitle} />
            <BasicTable columns={sections[3].columns} rows={sections[3].rows} />
          </div>
        </SectionCard>
      </div>
    </>
  );
}

function WeekView({ sections }) {
  return (
    <>
      <div className="edu-dash-grid-2">
        <SectionCard {...sections[0]}>
          <div className="edu-dash-split">
            <DonutChart total={sections[0].donutTotal} subtitle={sections[0].donutSubtitle} rows={sections[0].donutRows.map((item) => ({ ...item, value: (item.value / 326) * 100 }))} />
            <StackedBars title={sections[0].barsTitle} rows={sections[0].stackedRows} max={sections[0].stackedMax} legend={sections[0].stackedLegend} />
          </div>
        </SectionCard>
        <SectionCard {...sections[1]}>
          <div className="edu-dash-week-cert">
            <MiniStat
              title={sections[1].statTitle}
              value={sections[1].statValue}
              unit={sections[1].statUnit}
              foot={sections[1].statFoot}
              secondaryTitle={sections[1].statSecondaryTitle}
              secondaryValue={sections[1].statSecondaryValue}
              secondaryUnit={sections[1].statSecondaryUnit}
            />
            <DonutChart total="" subtitle={sections[1].donutTitle} rows={sections[1].donutRows} size={168} inner={82} />
            <HorizontalBars title={sections[1].barsTitle} items={sections[1].bars} max={sections[1].barsMax} />
          </div>
        </SectionCard>
      </div>
      <div className="edu-dash-grid-1">
        <SectionCard {...sections[2]}>
          <BasicTable columns={sections[2].columns} rows={sections[2].rows} toneColumn={sections[2].rowToneColumn} />
        </SectionCard>
      </div>
    </>
  );
}

function MonthView({ sections }) {
  return (
    <>
      <div className="edu-dash-grid-2">
        <SectionCard {...sections[0]}>
          <SummaryCardsRow items={sections[0].summaryCards} />
          <div className="edu-dash-split compact">
            <DonutChart total={sections[0].donutTotal} subtitle={sections[0].donutSubtitle} rows={sections[0].donutRows} />
            <BasicTable columns={sections[0].columns} rows={sections[0].rows} />
          </div>
        </SectionCard>
        <SectionCard {...sections[1]}>
          <MetricCardsRow items={sections[1].metricCards} />
          <ComboChart labels={sections[1].comboLabels} planValues={sections[1].comboPlan} doneValues={sections[1].comboDone} rateValues={sections[1].comboRate} />
        </SectionCard>
      </div>
      <div className="edu-dash-grid-2">
        <SectionCard {...sections[2]}>
          <div className="edu-dash-split compact">
            <MiniStat title={sections[2].statTitle} value={sections[2].statValue} unit={sections[2].statUnit} foot={sections[2].statFoot} />
            <VerticalBars title={sections[2].barsTitle} items={sections[2].bars} max={sections[2].barsMax} />
          </div>
          <PillsRow items={sections[2].pills} />
        </SectionCard>
        <SectionCard {...sections[3]}>
          <RankBars rows={sections[3].rankRows} legend={sections[3].rankLegend} />
        </SectionCard>
      </div>
    </>
  );
}

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("day");
  const activeMeta = tabs.find((item) => item.key === activeTab) || tabs[0];
  const activeData = dashboardData[activeTab];

  return (
    <div className="edu-dash-page">
      <style>{`
        .edu-dash-page { min-height: 100%; background: linear-gradient(180deg, #eef5ff 0%, #f7fbff 42%, #eef5ff 100%); padding: 18px 20px 28px; color: #163870; }
        .edu-dash-shell { max-width: 1660px; margin: 0 auto; }
        .edu-dash-hero { position: relative; overflow: hidden; border-radius: 24px; padding: 18px 22px 14px; background:
          radial-gradient(circle at 24% 28%, rgba(68,130,255,0.12), transparent 28%),
          linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,249,255,0.96));
          border: 1px solid #cfe0ff; box-shadow: 0 16px 38px rgba(52, 104, 192, 0.12); }
        .edu-dash-hero::before { content: ""; position: absolute; inset: auto 0 0 46%; height: 126px; background:
          linear-gradient(180deg, rgba(84,140,255,0.08), rgba(84,140,255,0.16)),
          repeating-linear-gradient(90deg, rgba(55,118,241,0.25) 0 2px, transparent 2px 40px);
          clip-path: polygon(0 100%, 6% 72%, 8% 76%, 10% 38%, 12% 76%, 14% 82%, 16% 48%, 18% 84%, 23% 52%, 25% 84%, 27% 68%, 29% 84%, 33% 57%, 35% 84%, 40% 44%, 42% 84%, 46% 62%, 48% 84%, 53% 36%, 55% 84%, 59% 58%, 61% 84%, 66% 40%, 68% 84%, 74% 54%, 76% 84%, 82% 46%, 84% 84%, 90% 62%, 92% 84%, 100% 58%, 100% 100%); opacity: .9; }
        .edu-dash-hero::after { content: ""; position: absolute; left: 32%; right: 0; bottom: 0; height: 88px; background: linear-gradient(180deg, rgba(200,220,255,0.05), rgba(200,220,255,0.25)); clip-path: polygon(0 100%, 8% 72%, 16% 100%, 24% 58%, 36% 100%, 48% 48%, 62% 100%, 78% 42%, 88% 100%, 100% 54%, 100% 100%); opacity: .55; }
        .edu-dash-hero-top { position: relative; z-index: 1; display: flex; justify-content: flex-end; gap: 20px; align-items: flex-start; min-height: 44px; }
        .edu-dash-meta { position: relative; z-index: 1; display: grid; gap: 10px; justify-items: end; padding-top: 6px; min-width: 280px; }
        .edu-dash-meta-item { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; color: #233f72; }
        .edu-dash-meta-icon { width: 28px; height: 28px; border-radius: 8px; border: 2px solid #2a61d9; display: grid; place-items: center; color: #2a61d9; font-size: 14px; }
        .edu-dash-tabs { display: flex; gap: 2px; margin-top: 14px; }
        .edu-dash-tab { width: 180px; height: 56px; border-radius: 14px 14px 0 0; border: 1px solid #d3e4ff; background: linear-gradient(180deg, #fff, #f4f8ff); color: #17366d; font-size: 18px; font-weight: 800; }
        .edu-dash-tab.active { background: linear-gradient(180deg, #1d63f0, #0f56e8); color: #fff; box-shadow: 0 10px 24px rgba(18, 89, 230, 0.28); }
        .edu-dash-summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }
        .edu-dash-summary-grid.week { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .edu-dash-summary-card { display: grid; grid-template-columns: 84px 1fr; gap: 18px; align-items: center; min-height: 120px; border-radius: 18px; background: linear-gradient(180deg, #ffffff, #f6faff); border: 1px solid #d8e6ff; box-shadow: 0 10px 26px rgba(65, 118, 204, 0.12); padding: 18px 20px; }
        .edu-dash-summary-icon { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, #f2f7ff, #dde9ff); color: #1560ea; display: grid; place-items: center; font-size: 34px; font-weight: 900; box-shadow: inset 0 0 0 1px #d7e4ff; }
        .edu-dash-summary-title { color: #253d6a; font-size: 17px; font-weight: 800; line-height: 1.35; }
        .edu-dash-summary-value-row { display: flex; align-items: baseline; gap: 6px; margin-top: 8px; }
        .edu-dash-summary-value { font-size: 58px; line-height: 1; font-weight: 900; color: #1258e6; }
        .edu-dash-summary-unit { font-size: 20px; font-weight: 800; color: #1258e6; }
        .edu-dash-summary-note { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 8px; color: #40597f; font-size: 15px; font-weight: 700; }
        .edu-dash-delta.up { color: #cf2323; }
        .edu-dash-delta.down { color: #16874e; }
        .edu-dash-grid-2, .edu-dash-grid-1 { display: grid; gap: 16px; margin-top: 16px; }
        .edu-dash-grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .edu-dash-panel { border-radius: 18px; background: linear-gradient(180deg, #fff, #f8fbff); border: 1px solid #d8e6ff; box-shadow: 0 14px 30px rgba(58, 110, 198, 0.12); padding: 10px 14px 16px; }
        .edu-dash-panel-head { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
        .edu-dash-panel-no { width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(180deg, #1e67f0, #134fcb); color: #fff; font-weight: 900; font-size: 28px; display: grid; place-items: center; }
        .edu-dash-panel-title { font-size: 18px; font-weight: 900; color: #124ab9; }
        .edu-dash-panel-desc { margin-top: 4px; font-size: 14px; color: #556f96; font-weight: 700; }
        .edu-dash-split { display: grid; grid-template-columns: 330px 1fr; gap: 18px; align-items: start; }
        .edu-dash-split.compact { grid-template-columns: 370px 1fr; }
        .edu-dash-donut-wrap { display: grid; grid-template-columns: auto 1fr; gap: 18px; align-items: center; padding: 6px 8px 10px; }
        .edu-dash-donut { border-radius: 50%; display: grid; place-items: center; margin: 0 auto; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4); }
        .edu-dash-donut-inner { border-radius: 50%; background: #fff; display: grid; place-items: center; box-shadow: 0 8px 24px rgba(62, 113, 201, 0.14); text-align: center; padding: 8px; }
        .edu-dash-donut-total { font-size: 28px; font-weight: 900; color: #1258e6; line-height: 1.05; }
        .edu-dash-donut-subtitle { margin-top: 4px; font-size: 14px; font-weight: 800; color: #476287; }
        .edu-dash-legend-list { display: grid; gap: 10px; }
        .edu-dash-legend-item { display: grid; grid-template-columns: 12px 1fr auto; gap: 8px; align-items: center; font-size: 14px; }
        .edu-dash-legend-dot { width: 12px; height: 12px; border-radius: 3px; }
        .edu-dash-legend-label { font-weight: 800; color: #314c79; }
        .edu-dash-legend-text { font-weight: 800; color: #123d8a; }
        .edu-dash-subtitle { font-size: 16px; font-weight: 900; color: #124ab9; margin-bottom: 10px; }
        .edu-dash-bars-list { display: grid; gap: 10px; }
        .edu-dash-bar-row, .edu-dash-stack-row, .edu-dash-rank-bar-row { display: grid; grid-template-columns: 96px 1fr 52px; gap: 10px; align-items: center; }
        .edu-dash-bar-label { font-size: 14px; font-weight: 800; color: #294572; white-space: nowrap; }
        .edu-dash-bar-track, .edu-dash-stack-track { height: 12px; border-radius: 999px; background: #e8f0ff; overflow: hidden; }
        .edu-dash-bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #1458e6, #5b95ff); }
        .edu-dash-bar-value { text-align: right; font-size: 14px; font-weight: 800; color: #1f3e75; }
        .edu-dash-mini-stat { display: grid; gap: 12px; align-content: start; }
        .edu-dash-mini-stat-card, .edu-dash-mini-stat-secondary { border-radius: 14px; border: 1px solid #d9e7ff; background: linear-gradient(180deg, #fff, #f5f9ff); padding: 20px; text-align: center; }
        .edu-dash-mini-stat-title { font-size: 17px; font-weight: 900; color: #294a7e; }
        .edu-dash-mini-stat-value-row { margin-top: 10px; color: #1258e6; font-size: 46px; font-weight: 900; line-height: 1; }
        .edu-dash-mini-stat-value-row em, .edu-dash-mini-stat-secondary-value em { font-style: normal; font-size: 18px; margin-left: 4px; }
        .edu-dash-mini-stat-foot { margin-top: 12px; font-size: 15px; font-weight: 800; color: #406185; }
        .edu-dash-mini-stat-secondary { display: grid; gap: 8px; color: #406185; font-size: 16px; font-weight: 800; }
        .edu-dash-mini-stat-secondary-value { color: #1258e6; font-size: 42px; font-weight: 900; line-height: 1; }
        .edu-dash-table th { background: linear-gradient(180deg, #f7fbff, #edf4ff); color: #184896; font-weight: 900; }
        .edu-dash-table td.danger { color: #cc2d24; font-weight: 800; }
        .edu-dash-table td.success { color: #118148; font-weight: 800; }
        .edu-dash-table td.warn { color: #ff5a00; font-weight: 800; }
        .edu-dash-half-grid { display: grid; grid-template-columns: 1.02fr 0.98fr; gap: 16px; align-items: start; }
        .edu-dash-line-card { padding-top: 4px; }
        .edu-dash-line-svg { width: 100%; height: auto; display: block; }
        .edu-dash-stack-legend { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; margin-bottom: 12px; color: #3c5f93; font-size: 13px; font-weight: 800; }
        .edu-dash-stack-legend i { display: inline-block; width: 12px; height: 12px; border-radius: 3px; margin-right: 6px; vertical-align: -1px; }
        .edu-dash-stack-total { margin-left: auto; }
        .edu-dash-stack-fill { display: flex; height: 100%; border-radius: 999px; overflow: hidden; }
        .edu-dash-stack-part { position: relative; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; font-weight: 900; }
        .edu-dash-week-cert { display: grid; grid-template-columns: 230px 250px 1fr; gap: 16px; align-items: start; }
        .edu-dash-summary-mini-grid, .edu-dash-metric-grid { display: grid; gap: 12px; margin-bottom: 14px; }
        .edu-dash-summary-mini-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .edu-dash-metric-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .edu-dash-summary-mini-card, .edu-dash-metric-card, .edu-dash-pill-card { border-radius: 14px; border: 1px solid #d8e6ff; background: linear-gradient(180deg, #fff, #f7fbff); padding: 14px 16px; }
        .edu-dash-summary-mini-label, .edu-dash-metric-label, .edu-dash-pill-label { font-size: 14px; font-weight: 800; color: #456288; }
        .edu-dash-summary-mini-value, .edu-dash-metric-value, .edu-dash-pill-value { margin-top: 6px; font-size: 20px; font-weight: 900; color: #1258e6; }
        .edu-dash-summary-mini-value em, .edu-dash-metric-value em, .edu-dash-pill-value em { font-style: normal; margin-left: 4px; font-size: 15px; }
        .edu-dash-combo-card { padding-top: 4px; }
        .edu-dash-vertical-card { padding-top: 4px; }
        .edu-dash-vertical-bars { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px; align-items: end; min-height: 246px; }
        .edu-dash-vertical-col { display: grid; justify-items: center; gap: 8px; }
        .edu-dash-vertical-bar-wrap { width: 30px; height: 180px; border-radius: 8px 8px 0 0; background: #e7efff; display: flex; align-items: end; overflow: hidden; }
        .edu-dash-vertical-bar { width: 100%; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, #4f8eff, #1458e6); }
        .edu-dash-vertical-value { font-size: 14px; font-weight: 800; color: #1d4385; }
        .edu-dash-vertical-label { font-size: 13px; font-weight: 800; color: #476287; }
        .edu-dash-pill-row { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin-top: 14px; }
        .edu-dash-rank-layout { display: grid; grid-template-columns: 300px 1fr; gap: 18px; align-items: start; }
        .edu-dash-rank-bars { display: grid; gap: 12px; margin-top: 10px; }
        .edu-dash-rank-track { display: flex; height: 20px; border-radius: 999px; overflow: hidden; background: #edf4ff; }
        .edu-dash-rank-part { display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; color: #fff; }
        @media (max-width: 1280px) {
          .edu-dash-summary-grid, .edu-dash-summary-grid.week, .edu-dash-grid-2, .edu-dash-half-grid, .edu-dash-week-cert, .edu-dash-split, .edu-dash-split.compact, .edu-dash-rank-layout { grid-template-columns: 1fr; }
          .edu-dash-summary-mini-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .edu-dash-pill-row, .edu-dash-metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .edu-dash-meta { justify-items: start; }
          .edu-dash-hero-top { flex-direction: column; }
          .edu-dash-tab { width: 33.33%; }
        }
      `}</style>
      <div className="edu-dash-shell">
        <div className="edu-dash-hero">
          <div className="edu-dash-hero-top">
            <div className="edu-dash-meta">
              <div className="edu-dash-meta-item"><span className="edu-dash-meta-icon">日</span>{activeMeta.period}</div>
              <div className="edu-dash-meta-item"><span className="edu-dash-meta-icon">时</span>{activeMeta.update}</div>
            </div>
          </div>
          <TabBar active={activeTab} onChange={setActiveTab} />
        </div>

        <div className={`edu-dash-summary-grid${activeTab === "week" ? " week" : ""}`}>
          {activeData.summary.map((item) => <SummaryCard key={item.title} item={item} />)}
        </div>

        {activeTab === "day" ? <DayView sections={activeData.sections} /> : null}
        {activeTab === "week" ? <WeekView sections={activeData.sections} /> : null}
        {activeTab === "month" ? <MonthView sections={activeData.sections} /> : null}
      </div>
    </div>
  );
}
