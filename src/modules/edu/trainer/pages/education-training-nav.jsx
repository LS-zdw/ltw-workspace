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
    id: "team-ai",
    title: "AI应用-会议模式",
    metric: "班组活动AI",
    count: "9步",
    desc: "会议录音转写 | 纪要生成 | 记录初稿",
    items: ["AI步骤: 2", "人工确认: 1"]
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
    title: "日周月统计分析",
    metric: "日监控 / 周汇报 / 月总结",
    count: "3",
    desc: "集团总部视角教育培训动态分析看板",
    items: ["日动态监控", "周总结汇报", "月汇报分析"]
  }
];

const moduleNames = {
  enterprise: "进入企业级教育培训模块",
  headquarters: "进入总部培训模块",
  operations: "进入运行部模块",
  "trainer-resource": "进入培训师资管理",
  "one-file": "进入培训档案查询",
  team: "进入班组安全活动管理",
  "team-ai": "进入班组安全活动AI应用",
  online: "进入线上培训与考试",
  cert: "进入证书管理",
  stat: "进入日周月统计分析"
};

const moduleRoutes = {
  "trainer-resource": "/edu/trainer/trainer-resource-management",
  "one-file": "/edu/trainer/training-one-person-one-file-enterprise",
  team: "/edu/trainer/team-safety-activity-management",
  "team-ai": "/edu/trainer/team-safety-activity-ai-meeting",
  stat: "/edu/trainer/hq-training-statistics-dwm-updated"
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
                          <div className="label">三态看板</div>
                          <div className="value">{card.count}</div>
                          <div className="hint">来自日周月统计分析看板</div>
                        </div>
                        <div className="edu-training-nav-stat-mini">
                          <div className="label">日动态</div>
                          <div className="value">1</div>
                          <div className="hint">当日培训动态监控</div>
                        </div>
                        <div className="edu-training-nav-stat-mini">
                          <div className="label">周总结 / 月汇报</div>
                          <div className="value">2</div>
                          <div className="hint">周期汇总分析页面</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="edu-training-nav-stat-main">
                    <div className="stat-main-card">
                      <div className="k">日动态</div>
                      <div className="v">4</div>
                      <div className="s">当日核心监控指标</div>
                    </div>
                    <div className="stat-main-card">
                      <div className="k">周总结</div>
                      <div className="v">3</div>
                      <div className="s">周维度分析模块</div>
                    </div>
                    <div className="stat-main-card">
                      <div className="k">月汇报</div>
                      <div className="v">4</div>
                      <div className="s">月维度分析模块</div>
                    </div>
                    <div className="stat-main-card">
                      <div className="k">适用角色</div>
                      <div className="v">总部</div>
                      <div className="s">集团总部教育培训管理</div>
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
