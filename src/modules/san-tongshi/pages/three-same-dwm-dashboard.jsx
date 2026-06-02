import React from "react";

const periodOptions = [
  { key: "day", label: "日监控", range: "统计日期：2026-06-01" },
  { key: "week", label: "周汇报", range: "统计周期：2026-05-26 至 2026-06-01" },
  { key: "month", label: "月总结", range: "统计月份：2026年06月" }
];

const dashboardData = {
  day: {
    summary: [
      { key: "inProgress", title: "当日在办项目总数", value: "486", note: "覆盖 43 家企业", delta: "+12" },
      { key: "keyProject", title: "当日在办重点工程项目数", value: "31", note: "集团一类重点项目 19 个", delta: "占比 6.4%" },
      { key: "suip", title: "当日SUIP系统推送项目数", value: "12", note: "累计 SUIP 项目 126 个", delta: "+3" },
      { key: "newThreeSame", title: "当日新增三同时项目数", value: "8", note: "较昨日增加 2 个", delta: "+2" }
    ],
    narrative: {
      title: "当日监管摘要",
      bullets: [
        "项目盘子主要集中在基础设计和可研阶段，两阶段合计占比超过六成。",
        "重点工程项目主要分布在镇海炼化、海南炼化和九江石化。"
      ]
    },
    stageTitle: "当日在办项目阶段分布",
    stageRows: [
      { stage: "可研阶段", value: 58, ratio: "20.28%" },
      { stage: "设计阶段", value: 96, ratio: "33.57%" },
      { stage: "试生产阶段", value: 88, ratio: "30.77%" },
      { stage: "验收阶段", value: 44, ratio: "15.38%" }
    ],
    topTitle: "在办项目数量靠前企业TOP10",
    topRows: [
      { rank: 1, enterprise: "镇海炼化", value: 26 },
      { rank: 2, enterprise: "湖南石化", value: 24 },
      { rank: 3, enterprise: "扬子石化", value: 22 },
      { rank: 4, enterprise: "茂名石化", value: 20 },
      { rank: 5, enterprise: "广州石化", value: 18 },
      { rank: 6, enterprise: "南京炼化", value: 16 },
      { rank: 7, enterprise: "青岛炼化", value: 14 },
      { rank: 8, enterprise: "金陵石化", value: 13 },
      { rank: 9, enterprise: "九江石化", value: 11 },
      { rank: 10, enterprise: "天津石化", value: 9 }
    ],
    keyStageTitle: "重点工程项目阶段分布",
    keyStageTotal: 38,
    keyStageRows: [
      { stage: "可研", value: 6, ratio: "15.79%", accent: "#2f7cf7" },
      { stage: "设计", value: 11, ratio: "28.95%", accent: "#47c1b0" },
      { stage: "试生产", value: 14, ratio: "36.84%", accent: "#8b5cf6" },
      { stage: "验收", value: 7, ratio: "18.42%", accent: "#fb923c" }
    ],
    warningTitle: "久试未验项目预警",
    warningRows: [
      { enterprise: "镇海炼化", project: "芳烃装置改造项目", start: "2026-03-12", duration: "81天" },
      { enterprise: "湖南石化", project: "标段装置优化项目", start: "2026-03-18", duration: "75天" },
      { enterprise: "扬子石化", project: "乙烯工程净化项目", start: "2026-03-21", duration: "72天" },
      { enterprise: "茂名石化", project: "加氢裂解扩能项目", start: "2026-03-25", duration: "68天" },
      { enterprise: "广州石化", project: "罐区改造项目", start: "2026-03-29", duration: "64天" }
    ],
    monitorTitle: "总部监测解读",
    monitorBullets: [
      "当日在办项目486个，其中当日在办重点工程项目31个。",
      "当日SUIP系统推送项目12个，当日新增三同时项目8个。",
      "当日在办项目主要分布在设计阶段和试生产阶段，重点企业在办项目数排名靠前的为镇海炼化、湖南石化、扬子石化。"
    ]
  },
  week: {
    summary: [
      { key: "newThreeSame", title: "上周新增三同时项目数", value: "12" },
      { key: "accepted", title: "上周完成验收项目数", value: "24" },
      { key: "suip", title: "上周SUIP系统推送项目数", value: "15" }
    ],
    narrative: {
      title: "监测解读",
      bullets: [
        "上周新增三同时项目12个，上周完成验收项目24个。",
        "上周SUIP系统推送项目15个。",
        "上周新增三同时项目主要分布在设计阶段和试生产阶段，企业新增项目数排名靠前的为镇海炼化、湖南石化、扬子石化。"
      ]
    },
    stageTitle: "上周新增项目阶段分布",
    stageRows: [
      { stage: "可研阶段", value: 8, ratio: "22.22%" },
      { stage: "设计阶段", value: 11, ratio: "30.56%" },
      { stage: "试生产阶段", value: 10, ratio: "27.78%" },
      { stage: "验收阶段", value: 7, ratio: "19.44%" }
    ],
    topTitle: "上周新增项目数量靠前企业TOP10",
    topRows: [
      { rank: 1, enterprise: "镇海炼化", value: 6 },
      { rank: 2, enterprise: "湖南石化", value: 5 },
      { rank: 3, enterprise: "扬子石化", value: 4 },
      { rank: 4, enterprise: "茂名石化", value: 4 },
      { rank: 5, enterprise: "广州石化", value: 3 },
      { rank: 6, enterprise: "南京化学", value: 3 },
      { rank: 7, enterprise: "青岛炼化", value: 3 },
      { rank: 8, enterprise: "金陵石化", value: 3 },
      { rank: 9, enterprise: "九江石化", value: 2 },
      { rank: 10, enterprise: "天津石化", value: 2 }
    ],
    donutTitle: "上周新增三同时项目阶段分布",
    donutTotal: 12,
    donutCenterLabel: "新增三同时项目",
    donutRows: [
      { stage: "可研", value: 2, ratio: "16.67%", accent: "#2f7cf7" },
      { stage: "设计", value: 4, ratio: "33.33%", accent: "#47c1b0" },
      { stage: "试生产", value: 4, ratio: "33.33%", accent: "#8b5cf6" },
      { stage: "验收", value: 2, ratio: "16.67%", accent: "#fb923c" }
    ],
    tableTitle: "上周完成验收项目清单",
    tableColumns: ["企业", "项目名称", "验收完成时间", "项目类型", "当前状态"],
    tableRows: [
      ["镇海炼化", "芳烃装置改造项目", "2026-05-26", "改造项目", { text: "已完成验收", color: "#16a34a" }],
      ["湖南石化", "烯烃装置优化项目", "2026-05-27", "优化项目", { text: "已归档", color: "#2563eb" }],
      ["扬子石化", "公用工程升级项目", "2026-05-28", "升级项目", { text: "已完成验收", color: "#16a34a" }],
      ["茂名石化", "加氢装置扩能项目", "2026-05-29", "扩能项目", { text: "已归档", color: "#2563eb" }],
      ["广州石化", "罐区改造项目", "2026-05-30", "改造项目", { text: "已完成验收", color: "#16a34a" }]
    ]
  },
  month: {
    summary: [
      { key: "newThreeSame", title: "本月新增三同时项目数", value: "36" },
      { key: "accepted", title: "本月完成验收项目数", value: "86" },
      { key: "suip", title: "本月SUIP系统推送项目数", value: "42" },
      { key: "delayedAcceptance", title: "久试未验项目数", value: "14" }
    ],
    narrative: {
      title: "监测解读",
      bullets: [
        "本月新增三同时项目36个，本月完成验收项目86个。",
        "本月SUIP系统推送项目42个，本月新增项目类型以危化品类为主，其次为非煤矿山类和其他。",
        "久试未验项目14个，按试运行满6个月仍未验收进行预警，相关企业和项目明细见下方预警信息。"
      ]
    },
    stageTitle: "本月项目阶段分布",
    stageRows: [
      { stage: "可研阶段", value: 64, ratio: "17.58%" },
      { stage: "设计阶段", value: 118, ratio: "32.42%" },
      { stage: "试生产阶段", value: 102, ratio: "28.02%" },
      { stage: "验收阶段", value: 80, ratio: "21.98%" }
    ],
    topTitle: "本月项目数量靠前企业TOP10",
    topRows: [
      { rank: 1, enterprise: "镇海炼化", value: 28 },
      { rank: 2, enterprise: "湖南石化", value: 25 },
      { rank: 3, enterprise: "扬子石化", value: 23 },
      { rank: 4, enterprise: "茂名石化", value: 21 },
      { rank: 5, enterprise: "广州石化", value: 18 },
      { rank: 6, enterprise: "南京化学", value: 16 },
      { rank: 7, enterprise: "青岛炼化", value: 14 },
      { rank: 8, enterprise: "金陵石化", value: 13 },
      { rank: 9, enterprise: "九江石化", value: 11 },
      { rank: 10, enterprise: "天津石化", value: 9 }
    ],
    donutTitle: "本月新增项目类型分布",
    donutTotal: 36,
    donutCenterLabel: "项目总数",
    donutRows: [
      { stage: "危化品类", value: 18, ratio: "50.00%", accent: "#2f7cf7" },
      { stage: "非煤矿山类", value: 10, ratio: "27.78%", accent: "#47c1b0" },
      { stage: "其他", value: 8, ratio: "22.22%", accent: "#8b5cf6" }
    ],
    tableTitle: "久试未验项目预警",
    tableColumns: ["企业", "项目名称", "试生产开始时间", "持续天数"],
    tableRows: [
      ["镇海炼化", "芳烃装置改造项目", "2025-10-28", { text: "217天", color: "#dc2626" }],
      ["湖南石化", "烯烃装置优化项目", "2025-11-05", { text: "209天", color: "#dc2626" }],
      ["扬子石化", "公用工程升级项目", "2025-11-12", { text: "202天", color: "#dc2626" }],
      ["茂名石化", "加氢装置扩能项目", "2025-11-18", { text: "196天", color: "#dc2626" }],
      ["广州石化", "罐区改造项目", "2025-11-24", { text: "190天", color: "#dc2626" }]
    ]
  }
};

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="stsb-btn"
      style={{
        minWidth: 110,
        borderColor: active ? "#1d4ed8" : "#dbe4f0",
        background: active ? "linear-gradient(135deg, #1d4ed8, #2563eb)" : "#fff",
        color: active ? "#fff" : "#1f2937",
        boxShadow: active ? "0 10px 24px rgba(37, 99, 235, 0.18)" : "none"
      }}
    >
      {children}
    </button>
  );
}

function MetricCard({ title, value, note, delta }) {
  return (
    <div
      className="stsb-kpi-card"
      style={{
        minHeight: 158,
        background: "linear-gradient(180deg, #ffffff 0%, #f7fbff 100%)",
        border: "1px solid #dce7f5",
        boxShadow: "0 14px 28px rgba(15, 23, 42, 0.06)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div className="stsb-mini-title" style={{ fontSize: 16, color: "#334155", lineHeight: 1.5 }}>{title}</div>
        {delta ? (
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "#e0f2fe",
              color: "#075985",
              fontSize: 12,
              fontWeight: 700,
              whiteSpace: "nowrap"
            }}
          >
            {delta}
          </div>
        ) : null}
      </div>
      <div className="stsb-kpi-value" style={{ marginTop: 18 }}>{value}</div>
      <div style={{ marginTop: 14, fontSize: 13, color: "#64748b" }}>{note}</div>
    </div>
  );
}

function HorizontalBars({ rows = [] }) {
  const max = Math.max(...rows.map((item) => item.value), 1);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {rows.map((item) => (
        <div key={item.stage} style={{ display: "grid", gridTemplateColumns: "120px 1fr 72px 64px", gap: 12, alignItems: "center" }}>
          <div style={{ color: "#334155", fontWeight: 600 }}>{item.stage}</div>
          <div style={{ height: 12, borderRadius: 999, background: "#e8eef6", overflow: "hidden" }}>
            <div
              style={{
                width: `${Math.max(8, Math.round((item.value / max) * 100))}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #2563eb, #38bdf8)"
              }}
            />
          </div>
          <div style={{ textAlign: "right", fontWeight: 700, color: "#0f172a" }}>{item.value}</div>
          <div style={{ textAlign: "right", color: "#64748b" }}>{item.ratio}</div>
        </div>
      ))}
    </div>
  );
}

function SummaryTable({ periodKey, rows = [] }) {
  const isDay = periodKey === "day";
  return (
    <div className="table-wrap">
      <table className="proto-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>所属企业</th>
            <th>项目总数</th>
            <th>{isDay ? "重点工程数" : "本期新增项目数"}</th>
            <th>{isDay ? "主要集中阶段" : "本期完成验收数"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${periodKey}-${row.rank}-${row.enterprise}`}>
              <td>{row.rank}</td>
              <td>{row.enterprise}</td>
              <td>{row.total}</td>
              <td>{row.extA}</td>
              <td>{row.extB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DualTrendChart({ rows = [], primaryLabel = "新增", secondaryLabel = "验收" }) {
  const max = Math.max(
    ...rows.flatMap((item) => [Number(item.value || 0), Number(item.secondary || 0)]),
    1
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 18, marginBottom: 18, color: "#475569", fontSize: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "#2563eb", display: "inline-block" }} />
          {primaryLabel}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: "#93c5fd", display: "inline-block" }} />
          {secondaryLabel}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${rows.length}, minmax(0, 1fr))`, gap: 16, alignItems: "end", minHeight: 220 }}>
        {rows.map((item) => (
          <div key={item.label} style={{ display: "grid", justifyItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "end", gap: 8, height: 180 }}>
              <div
                style={{
                  width: 22,
                  height: `${Math.max(12, Math.round((Number(item.value || 0) / max) * 160))}px`,
                  borderRadius: "10px 10px 0 0",
                  background: item.accent || "#2563eb"
                }}
              />
              <div
                style={{
                  width: 22,
                  height: `${Math.max(12, Math.round((Number(item.secondary || 0) / max) * 160))}px`,
                  borderRadius: "10px 10px 0 0",
                  background: "#93c5fd"
                }}
              />
            </div>
            <div style={{ fontSize: 13, color: "#475569" }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{item.value}/{item.secondary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SingleSeriesChart({ rows = [] }) {
  const max = Math.max(...rows.map((item) => Number(item.value || 0)), 1);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {rows.map((item) => (
        <div key={item.label} style={{ display: "grid", gridTemplateColumns: "88px 1fr 40px", gap: 12, alignItems: "center" }}>
          <div style={{ color: "#475569", fontSize: 13 }}>{item.label}</div>
          <div style={{ height: 12, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
            <div
              style={{
                width: `${Math.max(8, Math.round((Number(item.value || 0) / max) * 100))}%`,
                height: "100%",
                background: item.accent || "#2563eb",
                borderRadius: 999
              }}
            />
          </div>
          <div style={{ textAlign: "right", fontWeight: 700, color: "#0f172a" }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function NarrativeCard({ title, bullets = [] }) {
  return (
    <div
      className="stsb-panel"
      style={{
        minHeight: 220,
        background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 62%)"
      }}
    >
      <div className="stsb-panel-title">{title}</div>
      <div style={{ display: "grid", gap: 12, paddingTop: 8 }}>
        {bullets.map((item) => (
          <div
            key={item}
            style={{
              display: "grid",
              gridTemplateColumns: "14px 1fr",
              gap: 10,
              alignItems: "start",
              color: "#334155",
              lineHeight: 1.8
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#2563eb", marginTop: 8 }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyHeroCard({ item, icon, iconBg = "linear-gradient(135deg, #2f7cf7, #1d4ed8)" }) {
  return (
    <div
      className="stsb-kpi-card"
      style={{
        minHeight: 136,
        display: "grid",
        gridTemplateColumns: "92px 1fr",
        alignItems: "center",
        gap: 18,
        background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        border: "1px solid #dbeafe",
        boxShadow: "0 10px 20px rgba(37, 99, 235, 0.07)",
        borderRadius: 18
      }}
    >
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: iconBg,
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontSize: 34,
          boxShadow: "inset 0 0 0 10px rgba(255,255,255,0.18)"
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 15, color: "#111827", fontWeight: 700, lineHeight: 1.5 }}>{item.title}</div>
        <div style={{ marginTop: 10, display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 54, lineHeight: 1, color: "#2563eb", fontWeight: 800 }}>{item.value}</span>
          <span style={{ fontSize: 16, color: "#111827", fontWeight: 700 }}>个</span>
        </div>
      </div>
    </div>
  );
}

function TopTenBars({ rows = [] }) {
  const max = Math.max(...rows.map((item) => item.value), 1);
  const rankColors = ["#dc2626", "#f97316", "#f59e0b", "#2563eb", "#2563eb", "#2563eb", "#2563eb", "#2563eb", "#2563eb", "#2563eb"];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {rows.map((item, index) => (
        <div key={item.enterprise} style={{ display: "grid", gridTemplateColumns: "32px 118px 1fr 32px", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: rankColors[index] || "#2563eb",
              color: "#fff",
              fontSize: 12,
              display: "grid",
              placeItems: "center",
              fontWeight: 700
            }}
          >
            {item.rank}
          </div>
          <div style={{ color: "#1f2937", fontWeight: 600, whiteSpace: "nowrap" }}>{item.enterprise}</div>
          <div style={{ height: 12, borderRadius: 999, background: "#e5eefb", overflow: "hidden" }}>
            <div
              style={{
                width: `${Math.max(8, Math.round((item.value / max) * 100))}%`,
                height: "100%",
                borderRadius: 999,
                background: "linear-gradient(90deg, #3b82f6, #60a5fa)"
              }}
            />
          </div>
          <div style={{ textAlign: "right", fontWeight: 700, color: "#111827" }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}

function DonutStageCard({ total, rows = [] }) {
  let start = 0;
  const segments = rows.map((item) => {
    const pct = total ? (item.value / total) * 360 : 0;
    const segment = `${item.accent} ${start}deg ${start + pct}deg`;
    start += pct;
    return segment;
  });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 22, alignItems: "center" }}>
      <div style={{ display: "grid", justifyItems: "center", gap: 12 }}>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `conic-gradient(${segments.join(", ")})`,
            display: "grid",
            placeItems: "center"
          }}
        >
          <div
            style={{
              width: 114,
              height: 114,
              borderRadius: "50%",
              background: "#fff",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 2px 16px rgba(37, 99, 235, 0.08)"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: "#2563eb" }}>{total}</div>
              <div style={{ fontSize: 13, color: "#475569" }}>重点工程项目</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {rows.map((item) => (
          <div key={item.stage} style={{ display: "grid", gridTemplateColumns: "18px 62px 28px 1fr", gap: 10, alignItems: "center" }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: item.accent }} />
            <span style={{ color: "#1f2937", fontWeight: 600 }}>{item.stage}</span>
            <span style={{ color: "#111827", fontWeight: 700 }}>{item.value}</span>
            <span style={{ color: "#64748b" }}>（{item.ratio}）</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarningTable({ rows = [] }) {
  return (
    <div style={{ overflow: "visible", maxHeight: "none" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
          fontSize: 14
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px 10px", color: "#1d4ed8", fontWeight: 700, borderBottom: "1px solid #dbeafe" }}>企业</th>
            <th style={{ textAlign: "left", padding: "8px 10px", color: "#1d4ed8", fontWeight: 700, borderBottom: "1px solid #dbeafe" }}>项目名称</th>
            <th style={{ textAlign: "left", padding: "8px 10px", color: "#1d4ed8", fontWeight: 700, borderBottom: "1px solid #dbeafe" }}>试生产开始时间</th>
            <th style={{ textAlign: "right", padding: "8px 10px", color: "#1d4ed8", fontWeight: 700, borderBottom: "1px solid #dbeafe" }}>持续天数</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.enterprise}-${row.project}`}>
              <td style={{ padding: "7px 10px", color: "#1f2937", borderBottom: "1px solid #edf4ff" }}>{row.enterprise}</td>
              <td style={{ padding: "7px 10px", color: "#1f2937", borderBottom: "1px solid #edf4ff" }}>{row.project}</td>
              <td style={{ padding: "7px 10px", color: "#1f2937", borderBottom: "1px solid #edf4ff" }}>{row.start}</td>
              <td style={{ padding: "7px 10px", color: "#dc2626", fontWeight: 700, textAlign: "right", borderBottom: "1px solid #edf4ff" }}>{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DailySectionTitle({ icon = "■", title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: "#1d4ed8",
        fontSize: 18,
        fontWeight: 800,
        paddingBottom: 10,
        borderBottom: "1px solid #dbeafe"
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function DailySummaryCard({ item, icon, iconBg }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 130,
        borderRadius: 18,
        background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        border: "1px solid #dbeafe",
        boxShadow: "0 10px 18px rgba(37, 99, 235, 0.08)",
        padding: "16px 18px",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "88px 1fr",
        gap: 14,
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: iconBg,
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontSize: 38,
          fontWeight: 800,
          boxShadow: "inset 0 0 0 9px rgba(255,255,255,0.22)"
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            color: "#111827",
            fontSize: 17,
            fontWeight: 700,
            lineHeight: 1.35,
            minHeight: 46,
            wordBreak: "keep-all",
            overflowWrap: "normal"
          }}
        >
          {item.title}
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8, whiteSpace: "nowrap" }}>
          <div style={{ color: "#2563eb", fontSize: 64, lineHeight: 1, fontWeight: 900 }}>{item.value}</div>
          <div style={{ color: "#111827", fontSize: 16, fontWeight: 700 }}>个</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 16,
          bottom: 14,
          width: 78,
          height: 54,
          opacity: 0.16,
          background:
            "linear-gradient(180deg, transparent 0 100%), repeating-linear-gradient(90deg, transparent 0 9px, #60a5fa 9px 14px)"
        }}
      />
    </div>
  );
}

function DailyStageDistribution({ rows = [] }) {
  const max = Math.max(...rows.map((item) => item.value), 1);
  return (
    <div style={{ paddingTop: 14 }}>
      <DailySectionTitle icon="▥" title="当日在办项目阶段分布" />
      <div style={{ marginTop: 18 }}>
        {rows.map((item) => (
          <div
            key={item.stage}
            style={{
              display: "grid",
              gridTemplateColumns: "88px 1fr 46px 70px",
              gap: 18,
              alignItems: "center",
              marginBottom: 18
            }}
          >
            <div style={{ color: "#111827", fontSize: 16, fontWeight: 600 }}>{item.stage}</div>
            <div style={{ height: 24, borderRadius: 6, background: "#edf4ff", overflow: "hidden" }}>
              <div
                style={{
                  width: `${Math.max(12, Math.round((item.value / max) * 100))}%`,
                  height: "100%",
                  borderRadius: 6,
                  background: "linear-gradient(90deg, #1d72f3, #66a7ff)"
                }}
              />
            </div>
            <div style={{ color: "#111827", fontSize: 18, fontWeight: 700, textAlign: "right" }}>{item.value}</div>
            <div style={{ color: "#3b82f6", fontSize: 16, textAlign: "right" }}>{item.ratio}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "88px 1fr 46px 70px",
          gap: 18,
          color: "#64748b",
          fontSize: 13,
          marginTop: 2,
          alignItems: "center"
        }}
      >
        <div />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 2px 0 0" }}>
          {[0, 30, 60, 90, 120].map((tick) => <span key={tick}>{tick}</span>)}
        </div>
        <div />
        <div style={{ textAlign: "right", lineHeight: 1.2 }}>项目数<br />（个）</div>
      </div>
    </div>
  );
}

function DailyTopTen({ rows = [], title = "重点企业在办项目TOP10" }) {
  const max = Math.max(...rows.map((item) => item.value), 1);
  const rankColors = ["#dc2626", "#f97316", "#f59e0b"];
  return (
    <div style={{ paddingTop: 14 }}>
      <DailySectionTitle icon="🏆" title={title} />
      <div style={{ marginTop: 18 }}>
        {rows.map((item, index) => (
          <div
            key={item.enterprise}
            style={{
              display: "grid",
              gridTemplateColumns: "34px 92px 1fr 34px",
              gap: 12,
              alignItems: "center",
              marginBottom: 11
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: rankColors[index] || "#2563eb",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 700
              }}
            >
              {item.rank}
            </div>
            <div style={{ color: "#111827", fontSize: 15, fontWeight: 600 }}>{item.enterprise}</div>
            <div style={{ height: 12, background: "#edf4ff", borderRadius: 999, overflow: "hidden" }}>
              <div
                style={{
                  width: `${Math.max(10, Math.round((item.value / max) * 100))}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: "linear-gradient(90deg, #2d7ff7, #62a5ff)"
                }}
              />
            </div>
            <div style={{ color: "#111827", fontSize: 15, fontWeight: 700, textAlign: "right" }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, color: "#64748b", fontSize: 13, paddingLeft: 138 }}>
        {[0, 5, 10, 15, 20, 25, 30].map((tick) => <span key={tick}>{tick}</span>)}
      </div>
      <div style={{ color: "#64748b", fontSize: 13, textAlign: "center", marginTop: 4 }}>项目数（个）</div>
    </div>
  );
}

function DailyKeyStage({ total, rows = [] }) {
  let start = 0;
  const segments = rows.map((item) => {
    const pct = total ? (item.value / total) * 360 : 0;
    const segment = `${item.accent} ${start}deg ${start + pct}deg`;
    start += pct;
    return segment;
  });
  return (
    <div style={{ paddingTop: 14 }}>
      <DailySectionTitle icon="◔" title="重点工程项目阶段分布" />
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20, alignItems: "center", marginTop: 16 }}>
        <div style={{ display: "grid", justifyItems: "center" }}>
          <div
            style={{
              width: 206,
              height: 206,
              borderRadius: "50%",
              background: `conic-gradient(${segments.join(", ")})`,
              display: "grid",
              placeItems: "center"
            }}
          >
            <div style={{ width: 112, height: 112, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 42, fontWeight: 900, color: "#2563eb" }}>{total}</div>
                <div style={{ fontSize: 14, color: "#475569" }}>重点工程项目</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {rows.map((item) => (
            <div key={item.stage} style={{ display: "grid", gridTemplateColumns: "18px 40px 20px 1fr", gap: 10, alignItems: "center" }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: item.accent }} />
              <span style={{ fontWeight: 600, color: "#111827" }}>{item.stage}</span>
              <span style={{ fontWeight: 700, color: "#111827" }}>{item.value}</span>
              <span style={{ color: "#475569" }}>（{item.ratio}）</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DailyInterpretation({ bullets = [], title = "监测解读" }) {
  const highlightText = (text) => {
    const parts = String(text).split(/(\d+(?:\.\d+)?个|\d+(?:\.\d+)?天|\d+(?:\.\d+)?%)/g);
    return parts.map((part, index) => {
      if (/^\d+(?:\.\d+)?(个|天|%)$/.test(part)) {
        return (
          <span
            key={`${part}-${index}`}
            style={{
              color: "#1d4ed8",
              fontWeight: 800,
              fontSize: 18,
              padding: "0 2px"
            }}
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
    });
  };

  return (
    <div style={{ paddingTop: 14, height: "100%", position: "relative", overflow: "hidden" }}>
      <DailySectionTitle icon="▣" title={title} />
      <div style={{ marginTop: 18, display: "grid", gap: 18, position: "relative", zIndex: 1 }}>
        {bullets.map((item) => (
          <div key={item} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: 10, color: "#1f2937", lineHeight: 1.9, fontSize: 15 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#2563eb", marginTop: 8 }} />
            <span>{highlightText(item)}</span>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: -18,
          bottom: -16,
          width: 210,
          height: 210,
          opacity: 0.22
        }}
      >
        <div style={{ position: "absolute", right: 24, bottom: 36, width: 116, height: 116, borderRadius: "50%", border: "2px solid #bfdbfe" }} />
        <div style={{ position: "absolute", right: 42, bottom: 54, width: 80, height: 80, borderRadius: "50%", border: "2px solid #bfdbfe" }} />
        <div style={{ position: "absolute", right: 58, bottom: 70, width: 48, height: 48, borderRadius: "50%", border: "2px solid #60a5fa" }} />
        <div style={{ position: "absolute", right: 18, bottom: 12, width: 54, height: 54, borderRadius: "50%", border: "6px solid #1d4ed8" }} />
        <div style={{ position: "absolute", right: -2, bottom: 2, width: 36, height: 8, background: "#1d4ed8", transform: "rotate(42deg)", borderRadius: 999 }} />
      </div>
    </div>
  );
}

function DashboardTabs({ activePeriod, setActivePeriod }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        padding: "16px 18px 0"
      }}
    >
      <div
        style={{
          minWidth: 220,
          padding: "8px 14px",
          border: "1px solid #dbeafe",
          borderRadius: 6,
          background: "#f8fbff",
          color: "#1d4ed8",
          fontSize: 14,
          fontWeight: 700
        }}
      >
        {periodOptions.find((item) => item.key === activePeriod)?.range}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {periodOptions.map((item) => (
          <TabButton key={item.key} active={activePeriod === item.key} onClick={() => setActivePeriod(item.key)}>
            {item.label}
          </TabButton>
        ))}
      </div>
    </div>
  );
}

function GenericStageDistribution({ title, rows = [], axisTicks = [] }) {
  const max = Math.max(...rows.map((item) => item.value), 1);
  return (
    <div style={{ paddingTop: 14 }}>
      <DailySectionTitle icon="▥" title={title} />
      <div style={{ marginTop: 18 }}>
        {rows.map((item) => (
          <div key={item.stage} style={{ display: "grid", gridTemplateColumns: "88px 1fr 46px 70px", gap: 18, alignItems: "center", marginBottom: 18 }}>
            <div style={{ color: "#111827", fontSize: 16, fontWeight: 600 }}>{item.stage}</div>
            <div style={{ height: 24, borderRadius: 6, background: "#edf4ff", overflow: "hidden" }}>
              <div style={{ width: `${Math.max(12, Math.round((item.value / max) * 100))}%`, height: "100%", borderRadius: 6, background: "linear-gradient(90deg, #1d72f3, #66a7ff)" }} />
            </div>
            <div style={{ color: "#111827", fontSize: 18, fontWeight: 700, textAlign: "right" }}>{item.value}</div>
            <div style={{ color: "#3b82f6", fontSize: 16, textAlign: "right" }}>{item.ratio}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "88px 1fr 46px 70px", gap: 18, color: "#64748b", fontSize: 13, marginTop: 2, alignItems: "center" }}>
        <div />
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 2px 0 0" }}>
          {axisTicks.map((tick) => <span key={tick}>{tick}</span>)}
        </div>
        <div />
        <div style={{ textAlign: "right", lineHeight: 1.2 }}>项目数<br />（个）</div>
      </div>
    </div>
  );
}

function GenericDonutCard({ title, total, centerLabel, rows = [] }) {
  let start = 0;
  const segments = rows.map((item) => {
    const pct = total ? (item.value / total) * 360 : 0;
    const segment = `${item.accent} ${start}deg ${start + pct}deg`;
    start += pct;
    return segment;
  });
  return (
    <div style={{ paddingTop: 14 }}>
      <DailySectionTitle icon="◔" title={title} />
      <div style={{ display: "grid", gridTemplateColumns: "272px 1fr", gap: 28, alignItems: "center", marginTop: 24, minHeight: 260 }}>
        <div style={{ display: "grid", justifyItems: "center", alignItems: "center", paddingTop: 12 }}>
          <div style={{ width: 232, height: 232, borderRadius: "50%", background: `conic-gradient(${segments.join(", ")})`, display: "grid", placeItems: "center" }}>
            <div style={{ width: 126, height: 126, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 10px 24px rgba(37, 99, 235, 0.08)" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#2563eb", lineHeight: 1 }}>{total}</div>
                <div style={{ fontSize: 15, color: "#475569", wordBreak: "keep-all", whiteSpace: "nowrap", marginTop: 6 }}>{centerLabel}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gap: 18, alignContent: "center", paddingTop: 12 }}>
          {rows.map((item) => (
            <div key={item.stage} style={{ display: "grid", gridTemplateColumns: "18px minmax(72px, auto) 36px 1fr", gap: 10, alignItems: "center" }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: item.accent }} />
              <span style={{ fontWeight: 600, color: "#111827", whiteSpace: "nowrap", wordBreak: "keep-all" }}>{item.stage}</span>
              <span style={{ fontWeight: 700, color: "#111827" }}>{item.value}</span>
              <span style={{ color: "#475569", whiteSpace: "nowrap" }}>（{item.ratio}）</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GenericLightTable({ title, icon = "▣", columns = [], rows = [] }) {
  return (
    <div style={{ paddingTop: 14 }}>
      <DailySectionTitle icon={icon} title={title} />
      <div style={{ marginTop: 14, overflow: "visible" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", fontSize: 14 }}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={column} style={{ textAlign: index === columns.length - 1 ? "right" : "left", padding: "8px 10px", color: "#1d4ed8", fontWeight: 700, borderBottom: "1px solid #dbeafe" }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const isLast = cellIndex === row.length - 1;
                  const content = typeof cell === "object" && cell !== null ? cell.text : cell;
                  const color = typeof cell === "object" && cell !== null && cell.color ? cell.color : "#1f2937";
                  return (
                    <td key={cellIndex} style={{ padding: "7px 10px", color, fontWeight: typeof cell === "object" && cell !== null ? 700 : 400, textAlign: isLast ? "right" : "left", borderBottom: "1px solid #edf4ff" }}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Page() {
  const [activePeriod, setActivePeriod] = React.useState("day");
  const activeConfig = dashboardData[activePeriod];
  const interpretationBullets = activeConfig.monitorBullets || activeConfig.narrative?.bullets || [];
  const interpretationTitle = activeConfig.monitorTitle || activeConfig.narrative?.title || "监测解读";
  const summaryIcons = activePeriod === "month"
    ? [
        { icon: "▥", iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)" },
        { icon: "▦", iconBg: "linear-gradient(135deg, #60a5fa, #2563eb)" },
        { icon: "◎", iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)" },
        { icon: "!", iconBg: "linear-gradient(135deg, #fb923c, #f97316)" }
      ]
    : [
        { icon: "▥", iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)" },
        { icon: "▦", iconBg: "linear-gradient(135deg, #60a5fa, #2563eb)" },
        { icon: "◎", iconBg: "linear-gradient(135deg, #3b82f6, #2563eb)" },
        { icon: "+", iconBg: "linear-gradient(135deg, #a78bfa, #7c3aed)" }
      ];
  const summaryColumns = `repeat(${Math.max(activeConfig.summary.length, 1)}, minmax(0, 1fr))`;

  if (activePeriod === "day") {
    return (
      <div className="stsb-wrap">
        <div className="stsb-main" style={{ display: "block", padding: 0, background: "#f3f7ff" }}>
          <div className="stsb-content" style={{ padding: 0, background: "transparent", maxWidth: 1672, margin: "0 auto" }}>
            <DashboardTabs activePeriod={activePeriod} setActivePeriod={setActivePeriod} />

            <div style={{ padding: 18 }}>
              <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)", marginBottom: 16 }}>
                <DailyInterpretation bullets={interpretationBullets} title={interpretationTitle} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: summaryColumns, gap: 16, marginBottom: 16 }}>
                {activeConfig.summary.map((item, index) => (
                  <DailySummaryCard
                    key={item.key || item.title || index}
                    item={item}
                    icon={summaryIcons[index]?.icon || "•"}
                    iconBg={summaryIcons[index]?.iconBg || "linear-gradient(135deg, #94a3b8, #64748b)"}
                  />
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 16, marginBottom: 16 }}>
                <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                  <GenericDonutCard
                    title={activeConfig.stageTitle}
                    total={activeConfig.stageRows.reduce((sum, item) => sum + item.value, 0)}
                    centerLabel="当日在办项目"
                    rows={activeConfig.stageRows.map((item, index) => ({
                      stage: item.stage.replace("阶段", ""),
                      value: item.value,
                      ratio: item.ratio,
                      accent: ["#2f7cf7", "#47c1b0", "#8b5cf6", "#fb923c"][index]
                    }))}
                  />
                </div>
                <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                  <DailyTopTen rows={activeConfig.topRows} title={activeConfig.topTitle} />
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="stsb-wrap">
      <div className="stsb-main" style={{ display: "block", padding: 0, background: "#f3f7ff" }}>
        <div className="stsb-content" style={{ padding: 0, background: "transparent", maxWidth: 1672, margin: "0 auto" }}>
          <DashboardTabs activePeriod={activePeriod} setActivePeriod={setActivePeriod} />

          <div style={{ padding: 18 }}>
            <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)", marginBottom: 16 }}>
              <DailyInterpretation bullets={interpretationBullets} title={interpretationTitle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: summaryColumns, gap: 16, marginBottom: 16 }}>
              {activeConfig.summary.map((item, index) => (
                <DailySummaryCard
                  key={item.key || item.title || index}
                  item={item}
                  icon={summaryIcons[index]?.icon || "•"}
                  iconBg={summaryIcons[index]?.iconBg || "linear-gradient(135deg, #94a3b8, #64748b)"}
                />
              ))}
            </div>

            {activePeriod === "week" ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 16, marginBottom: 16 }}>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <GenericLightTable title={activeConfig.tableTitle} icon="▣" columns={activeConfig.tableColumns} rows={activeConfig.tableRows} />
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <DailyTopTen rows={activeConfig.topRows} title={activeConfig.topTitle} />
                  </div>
                </div>
              </>
            ) : activePeriod === "month" ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "0.86fr 1.19fr", gap: 16, marginBottom: 16 }}>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <GenericDonutCard
                      title={activeConfig.donutTitle}
                      total={activeConfig.donutTotal}
                      centerLabel={activeConfig.donutCenterLabel}
                      rows={activeConfig.donutRows}
                    />
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <DailyTopTen rows={activeConfig.topRows} title={activeConfig.topTitle} />
                  </div>
                </div>

                <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                  <GenericLightTable title={activeConfig.tableTitle} icon="⚠" columns={activeConfig.tableColumns} rows={activeConfig.tableRows} />
                </div>
              </>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 16, marginBottom: 16 }}>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <GenericStageDistribution title={activeConfig.stageTitle} rows={activeConfig.stageRows} axisTicks={[0, 30, 60, 90, 120]} />
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <DailyTopTen rows={activeConfig.topRows} title={activeConfig.topTitle} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "0.86fr 2.18fr", gap: 16 }}>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <GenericDonutCard title={activeConfig.donutTitle} total={activeConfig.donutTotal} centerLabel={activeConfig.donutCenterLabel} rows={activeConfig.donutRows} />
                  </div>
                  <div style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 18, padding: "10px 16px 16px", boxShadow: "0 10px 18px rgba(37,99,235,0.06)" }}>
                    <GenericLightTable title={activeConfig.tableTitle} icon="⚠" columns={activeConfig.tableColumns} rows={activeConfig.tableRows} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
