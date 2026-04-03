import React from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    id: "headquarters",
    title: "总部级培训",
    metric: "计划/反馈",
    count: "12",
    desc: "计划通知: 5 | 培训反馈: 7",
    items: ["待阅通知: 2", "待接收反馈: 3"]
  },
  {
    id: "enterprise",
    title: "企业级培训",
    metric: "计划/记录",
    count: "计划 25 | 记录 28",
    desc: "企业年度: 10 | 企业临时: 15",
    items: ["进行中计划: 3", "已登记培训记录: 28"]
  },
  {
    id: "operations",
    title: "运行部级培训",
    metric: "计划/记录",
    count: "计划 8 | 记录 12",
    desc: "运行部年度: 3 | 运行部月度: 5",
    items: ["进行中计划: 2", "已登记培训记录: 12"]
  },
  {
    id: "team",
    title: "班组安全活动",
    metric: "活动计划",
    count: "10",
    desc: "活动计划: 10 | 完成率: 50%",
    items: ["已完成: 5", "超期未开展: 3"]
  },
  {
    id: "online",
    title: "线上培训与考试",
    metric: "课程/考试",
    count: "15",
    desc: "课程: 10 | 考试: 5",
    items: ["已上线课程: 7", "待安排考试: 2"]
  },
  {
    id: "cert",
    title: "证书管理",
    metric: "证书总数",
    count: "120",
    desc: "有效证书: 100 | 预警: 20",
    items: ["即将到期: 12", "已过期: 8"]
  },
  {
    id: "trainer-resource",
    title: "培训师资管理",
    metric: "师资总数",
    count: "10",
    desc: "高级: 3 | 中级: 5 | 初级: 2",
    items: ["总授课课时: 30", "平均满意度: 5"]
  },
  {
    id: "one-file",
    title: "培训档案查询",
    metric: "档案总数",
    count: "3200",
    desc: "已建档: 3100 | 待补充: 100",
    items: ["培训记录: 9800", "证书记录: 2600"]
  },
  {
    id: "stat",
    title: "企业教育培训情况统计",
    metric: "综合指标",
    count: "98",
    desc: "关键岗位持证率: 97% | 档案更新率: 99%",
    items: ["培训覆盖率: 88%", "新员工三级教育完成率: 100%"]
  }
];

const moduleNames = {
  enterprise: "进入企业级教育培训模块",
  headquarters: "进入总部培训模块",
  operations: "进入运行部模块",
  "trainer-resource": "进入培训师资管理",
  "one-file": "进入培训档案查询",
  team: "进入班组安全活动管理",
  online: "进入线上培训与考试",
  cert: "进入证书管理",
  stat: "进入企业教育培训情况统计"
};

const moduleRoutes = {
  "trainer-resource": "/edu/trainer/trainer-resource-management",
  "one-file": "/edu/trainer/training-one-person-one-file-enterprise",
  stat: "/edu/trainer/enterprise-training-statistics"
};

export default function Page() {
  const navigate = useNavigate();

  const goModule = (key) => {
    const target = moduleRoutes[key];
    if (target) {
      navigate(target);
      return;
    }
    const text = moduleNames[key] || "进入模块";
    window.alert(text);
  };

  return (
    <div className="edu-training-nav">
      <div className="edu-training-nav-header">
        <div>教育培训管理导航</div>
        <div>管理员</div>
      </div>
      <div className="edu-training-nav-board">
        <div className="edu-training-nav-grid">
          {cards.map((card) => (
            <button
              type="button"
              key={card.id}
              className={`edu-training-nav-card${card.id === "stat" ? " stat-card" : ""}`}
              onClick={() => goModule(card.id)}
            >
              {card.id === "stat" ? (
                <div className="edu-training-nav-stat">
                  <div className="edu-training-nav-stat-head">
                    <div className="edu-training-nav-stat-head-title">
                      <h3>{card.title}</h3>
                      <div className="edu-training-nav-metric">企业核心指标概览</div>
                    </div>
                    <div className="edu-training-nav-stat-head-cards">
                      <div className="edu-training-nav-stat-score-wrap">
                        <div className="edu-training-nav-stat-score">
                          <div className="label">综合指标</div>
                          <div className="value">{card.count}</div>
                          <div className="hint">来自企业教育培训情况统计</div>
                        </div>
                        <div className="edu-training-nav-stat-mini">
                          <div className="label">培训计划综合查询</div>
                          <div className="value">33</div>
                          <div className="hint">全部计划数</div>
                        </div>
                        <div className="edu-training-nav-stat-mini">
                          <div className="label">培训记录综合查询</div>
                          <div className="value">40</div>
                          <div className="hint">全部记录数</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="edu-training-nav-stat-main">
                    <div className="stat-main-card">
                      <div className="k">计划完成率</div>
                      <div className="v">92%</div>
                      <div className="s">年度培训计划执行</div>
                    </div>
                    <div className="stat-main-card">
                      <div className="k">培训覆盖率</div>
                      <div className="v">88%</div>
                      <div className="s">关键岗位覆盖</div>
                    </div>
                    <div className="stat-main-card">
                      <div className="k">档案更新率</div>
                      <div className="v">99%</div>
                      <div className="s">档案维护及时率</div>
                    </div>
                    <div className="stat-main-card">
                      <div className="k">关键岗位持证率</div>
                      <div className="v">97%</div>
                      <div className="s">取证合规达标</div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3>{card.title}</h3>
                  {card.metric ? <div className="edu-training-nav-metric">{card.metric}</div> : null}
                  <div className="edu-training-nav-number">{card.count}</div>
                  <div className="edu-training-nav-desc">{card.desc}</div>
                  {card.items.length ? (
                    <div className="edu-training-nav-subcards">
                      {card.items.map((item) => (
                        <span key={item} className="edu-training-nav-subcard">{item}</span>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
