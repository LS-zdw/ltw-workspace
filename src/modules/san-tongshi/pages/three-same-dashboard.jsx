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

const ringCards = [
  { label: "暂缓会签项目", value: "189" },
  { label: "未会签项目", value: "100" },
  { label: "已会签项目", value: "266" }
];

const projectRows = [
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

const focusItems = [
  "镇海炼化芳烃装置扩能 - 可研评审",
  "燕山石化加氢装置改造 - 方案会签",
  "齐鲁石化储运系统升级 - 试运行验收",
  "江苏石油管网扩建 - 竣工验收",
  "中原油田站场改造 - 风险评估",
  "中科炼化催化装置优化 - 设计审查"
];

const enterpriseList = [
  "总部机关",
  "资兴运营部（资兴公司）",
  "宁波工程公司",
  "镇海炼化",
  "中石化江汉石油有限公司",
  "胜利油田",
  "中原油田",
  "河南油田",
  "江汉油田",
  "江苏油田",
  "华北石油局",
  "华东石油局",
  "西南石油局",
  "西北油田分公司",
  "勘探分公司"
];

export default function Page() {
  return (
    <div className="stsb-wrap">
      <div className="stsb-main">
        <aside className="stsb-sidebar">
          <div className="stsb-side-title">中国石化集团公司</div>
          <div className="stsb-side-items">
            {enterpriseList.map((item, index) => (
              <div key={item} className={`stsb-side-item ${index === 0 ? "active" : ""}`}>
                <span className="stsb-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="stsb-content">
          <div className="stsb-tabs">
            <div className="stsb-tab active">安全</div>
            <div className="stsb-tab">职业卫生</div>
            <div className="stsb-tab">消防</div>
          </div>

          <div className="stsb-filters">
            <div className="stsb-date-range">2025-12-16至2025-12-16</div>
            <button type="button" className="stsb-btn stsb-btn-primary">查询</button>
            <button type="button" className="stsb-btn">重置</button>
          </div>

          <div className="stsb-kpi-row">
            <div className="stsb-kpi-card">
              <div className="stsb-kpi-title">{kpiMain.title}</div>
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
              <div className="stsb-kpi-title">{kpiSecond[0].title}</div>
              <div className="stsb-kpi-value">{kpiSecond[0].value}</div>
            </div>

            <div className="stsb-kpi-card stsb-kpi-card-lg">
              <div className="stsb-kpi-title">{kpiSecond[1].title}</div>
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
              <div className="stsb-panel-title">三同时项目类型统计</div>
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
                    {typeBars.map((item) => (
                      <div key={item.label} className="stsb-bar-group">
                        <div className="stsb-bar-bars">
                          {item.values.map((val, idx) => (
                            <div
                              key={`${item.label}-${idx}`}
                              className="stsb-bar"
                              style={{ height: `${val / 12}px`, background: stageLegend[idx].color }}
                            />
                          ))}
                        </div>
                        <div className="stsb-bar-label">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="stsb-panel">
              <div className="stsb-panel-title">三同时项目各阶段统计</div>
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
                    {stageBars.map((stage) => (
                      <div key={stage.label} className="stsb-bar-group">
                        <div className="stsb-bar-label">{stage.label}</div>
                        <div className="stsb-bar-bars">
                          {stage.values.map((val, idx) => (
                            <div
                              key={`${stage.label}-${idx}`}
                              className="stsb-bar"
                              style={{ height: `${val / 12}px`, background: stageLegend[idx].color }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stsb-panel-row">
            <div className="stsb-panel">
              <div className="stsb-panel-title">久试未验项目信息统计</div>
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
            <div className="stsb-panel">
              <div className="stsb-panel-title">会签项目信息统计</div>
              <div className="stsb-panel-chart">
                <div className="stsb-ring-total">总数量 555个</div>
                <div className="stsb-ring-row">
                  {ringCards.map((item) => (
                    <div key={item.label} className="stsb-ring-card">
                      <div className="stsb-ring">{item.value}</div>
                      <div className="stsb-ring-label">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="stsb-section">
            <div className="stsb-section-head">
              <div className="stsb-section-title">项目动态</div>
              <div className="stsb-section-actions">
                <button type="button" className="stsb-btn">导出</button>
                <button type="button" className="stsb-btn">模板下载</button>
              </div>
            </div>
            <div className="stsb-section-grid">
              <div className="stsb-panel stsb-panel-clean">
                <div className="stsb-table-wrap">
                  <table className="proto-table stsb-table">
                    <thead>
                      <tr>
                        <th>项目名称</th>
                        <th>项目类型</th>
                        <th>当前阶段</th>
                        <th>责任部门</th>
                        <th>所属企业</th>
                        <th>计划日期</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectRows.map((row) => (
                        <tr key={row.name}>
                          <td>{row.name}</td>
                          <td>{row.type}</td>
                          <td>{row.stage}</td>
                          <td>{row.dept}</td>
                          <td>{row.org}</td>
                          <td>{row.date}</td>
                          <td>{row.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="stsb-pager">
                  <div className="stsb-pager-total">共10条记录 第1/1页</div>
                  <div className="stsb-pager-controls">
                    <button type="button" className="stsb-pager-btn" disabled>上一页</button>
                    <button type="button" className="stsb-pager-btn active">1</button>
                    <button type="button" className="stsb-pager-btn" disabled>下一页</button>
                    <select className="stsb-pager-size" defaultValue="10">
                      <option value="10">10条/页</option>
                      <option value="20">20条/页</option>
                      <option value="50">50条/页</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="stsb-panel">
                <div className="stsb-panel-title">重点关注项目</div>
                <div className="stsb-focus">
                  {focusItems.map((item) => (
                    <div key={item} className="stsb-focus-item">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
