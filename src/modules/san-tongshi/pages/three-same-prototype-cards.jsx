import React from "react";

const cards = [
  {
    title: "安全三同时",
    sections: [
      {
        title: "可研阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        desc: "维护安全三同时可研阶段行政许可相关信息，支持按项目阶段查询与查看明细。"
      },
      {
        title: "基础设计阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        desc: "维护安全三同时基础设计阶段行政许可相关信息，跟踪批复与设计单位数据。"
      },
      {
        title: "试运行阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        desc: "维护安全三同时试运行阶段行政许可相关信息，覆盖试运行批复与登记情况。"
      },
      {
        title: "竣工验收阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        desc: "维护安全三同时竣工验收阶段行政许可相关信息，支撑验收查询与归档。"
      }
    ]
  },
  {
    title: "项目任务启动",
    sections: [
      {
        title: "任务创建与专业识别",
        user: "企业安环部-安全室三同时业务主管",
        desc: "选择项目后创建任务，识别项目类型与专业类别，配置计划节点与责任人。"
      },
      {
        title: "审批与会签流转",
        user: "总部健康安全环保部三同时主管",
        desc: "完成审批与会签流转，形成任务流转记录与推进状态。"
      },
      {
        title: "任务启动与变更",
        user: "企业安环部-安全室三同时业务主管",
        desc: "审批完成后启动任务，必要时按流程进行任务变更与调整。"
      }
    ]
  },
  {
    title: "项目信息管理",
    sections: [
      {
        title: "SUIP项目清单",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        desc: "展示从SUIP集成的全部项目，包含不涉及三同时的项目，支持查询与查看详情。"
      },
      {
        title: "项目详情查看",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        desc: "查看项目基础信息与建设信息，作为后续任务启动与维护的依据。"
      }
    ]
  },
  {
    title: "三同时看板",
    sections: [
      {
        title: "三同时数据统计分析",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        desc: "展示项目总数、类型与阶段分布，掌握整体推进态势。"
      },
      {
        title: "重点工程与会签监控",
        user: "总部健康安全环保部三同时主管",
        desc: "聚焦重点工程数量、会签进度与久试未验情况，强化风险预警。"
      }
    ]
  }
];

export default function Page() {
  return (
    <div className="st-card-page">
      <div className="st-card-surface">
        <div className="st-card-grid">
          {cards.map((card) => (
            <div key={card.title} className="st-card">
              <div className="st-card-title">软件原型设计说明卡-三同时管理</div>
              <div className="st-card-name">功能名称：{card.title}</div>
              <div className="st-card-body">
                {card.sections.map((section, idx) => (
                  <div key={section.title} className="st-card-section">
                    <div className="st-card-section-title">功能点{idx + 1}：{section.title}</div>
                    <div className="st-card-section-row">使用用户：{section.user}</div>
                    <div className="st-card-section-row">作用：{section.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
