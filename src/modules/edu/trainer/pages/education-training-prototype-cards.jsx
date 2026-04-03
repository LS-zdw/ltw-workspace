import React from "react";
import routes from "/src/app/routes.local.jsx";

const headerTitle = "软件原型设计说明卡-教育培训";

const ENTERPRISE_USERS = "安环部总管室、运行部教育培训负责人、班组负责人";
const HQ_USERS = "健康安全环保部-HSE体系室";

const getUserLabel = (title) => {
  if (title.includes("企业端")) return ENTERPRISE_USERS;
  if (title.includes("总部端")) return HQ_USERS;
  if (title.includes("个人端")) return "员工个人";
  return "各级管理人员";
};

const normalizeTitle = (title) => {
  if (title === "教育培训-培训记录管理") return "教育培训-培训记录管理-总部端";
  if (title === "教育培训-培训档案查询") return "教育培训-培训档案查询-总部端";
  return title;
};

const stripEndTag = (title) =>
  title.replace(/-企业端$|-总部端$/g, "");

const getFeatureName = (title) => title.replace(/^教育培训-/, "").replace(/-/g, " ");

const allowedTitles = [
  "教育培训-班组安全活动管理",
  "教育培训-教育培训管理导航",
  "教育培训-培训计划管理-企业端",
  "教育培训-培训计划管理-总部端",
  "教育培训-培训记录管理-企业端",
  "教育培训-培训记录管理-总部端",
  "教育培训-培训计划审批-企业端",
  "教育培训-培训师资管理-总部端",
  "教育培训-培训需求上报-企业端",
  "教育培训-培训需求管理-企业端",
  "教育培训-培训需求上报-总部端",
  "教育培训-企业教育培训情况统计",
  "教育培训-培训档案查询-企业端",
  "教育培训-培训档案查询-总部端",
  "教育培训-证书管理-企业端",
  "教育培训-总部统计分析"
];

const featurePoints = {
  "教育培训-班组安全活动管理": [
    { name: "安全活动计划维护", effect: "计划新增、编辑、查询与状态管理" },
    { name: "活动记录登记", effect: "活动材料、问题隐患与整改措施闭环" },
    { name: "人员名单管理", effect: "参训人员登记、导入导出与记录补录" }
  ],
  "教育培训-教育培训管理导航": [
    { name: "培训业务入口聚合", effect: "统一导航各模块入口与常用操作" },
    { name: "关键指标总览", effect: "展示计划、记录、证书等核心指标" },
    { name: "异常与待办提醒", effect: "引导用户处理待审批与待补录事项" }
  ],
  "教育培训-培训计划管理": [
    { name: "计划新增与变更", effect: "年度/临时计划维护与变更管理" },
    { name: "计划配置与执行", effect: "参与机构、开班月份、执行期次配置" },
    { name: "计划统计与导出", effect: "执行情况统计、台账查询与导出" }
  ],
  "教育培训-培训记录管理": [
    { name: "培训记录登记", effect: "记录新增、编辑、补录与审核" },
    { name: "参训人员与成绩", effect: "人员名单、成绩合格率与发证管理" },
    { name: "记录查询与导出", effect: "记录检索、批量导入导出与追踪" }
  ],
  "教育培训-培训计划审批": [
    { name: "计划审批流转", effect: "待审计划查看、审批与退回" },
    { name: "审批意见留痕", effect: "流程节点意见记录与审批轨迹" },
    { name: "历史记录查询", effect: "审批记录查询与统计" }
  ],
  "教育培训-培训师资管理": [
    { name: "师资档案维护", effect: "师资来源、等级与擅长领域管理" },
    { name: "授课记录管理", effect: "授课次数、课时与满意度统计" },
    { name: "资质证书关联", effect: "证书信息维护与关联培训项目" }
  ],
  "教育培训-培训需求上报": [
    { name: "培训需求提报", effect: "需求新增、分类与优先级维护" },
    { name: "需求汇总上报", effect: "需求汇总、提交与退回处理" },
    { name: "需求进度跟踪", effect: "上报记录查询与状态跟踪" }
  ],
  "教育培训-培训需求管理": [
    { name: "需求台账维护", effect: "需求清单维护与状态管理" },
    { name: "需求审核反馈", effect: "需求审核、反馈与调整" },
    { name: "需求统计导出", effect: "需求统计分析与导出" }
  ],
  "教育培训-企业教育培训情况统计": [
    { name: "综合指标与排名", effect: "展示企业培训综合得分、集团排名及指标加权明细，支撑管理层快速判断整体培训成效" },
    { name: "运行部计划完成看板", effect: "按运行部展示培训项目总数与完成数，对比计划执行差异并支持穿透查看项目明细" },
    { name: "重点人群与履职统计", effect: "集中展示关键岗位取证、新员工三级教育、领导干部履职评估及档案管理核心指标" }
  ],
  "教育培训-培训档案查询": [
    { name: "人员档案台账", effect: "人员档案检索、台账维护" },
    { name: "学习明细汇总", effect: "培训、考试、证书明细穿透查看" },
    { name: "档案统计导出", effect: "档案统计汇总与导出" }
  ],
  "教育培训-证书管理": [
    { name: "证书台账维护", effect: "证书新增、编辑与人员关联" },
    { name: "到期预警复审", effect: "证书到期预警、复审提醒" },
    { name: "证书附件管理", effect: "证书附件上传与归档" }
  ],
  "教育培训-总部统计分析": [
    { name: "集团指标总览", effect: "集团培训指标汇总与展示" },
    { name: "企业对标分析", effect: "跨企业对标与趋势分析" },
    { name: "报表统计导出", effect: "统计报表查询与导出" }
  ]
};

export default function Page() {
  const eduPages = routes
    .filter(
      (route) =>
        route.moduleGroup === "edu" &&
        route.module === "edu/trainer" &&
        route.title &&
        allowedTitles.includes(normalizeTitle(route.title))
    )
    .map((route) => ({
      title: normalizeTitle(route.title),
      featureKey: stripEndTag(normalizeTitle(route.title))
    }));

  const mergedPages = Array.from(
    eduPages.reduce((acc, item) => {
      const key = item.featureKey;
      const list = acc.get(key) || [];
      list.push(item.title);
      acc.set(key, list);
      return acc;
    }, new Map())
  ).map(([featureKey, titles]) => {
    const featureTitle = featureKey;
    const hasEnterprise = titles.some((t) => t.includes("企业端"));
    const hasHq = titles.some((t) => t.includes("总部端"));
    const userLabel = hasEnterprise && hasHq
      ? `${ENTERPRISE_USERS}、${HQ_USERS}`
      : hasEnterprise
        ? ENTERPRISE_USERS
        : hasHq
          ? HQ_USERS
          : getUserLabel(featureTitle);
    return {
      id: featureTitle,
      title: featureTitle,
      feature: getFeatureName(featureTitle),
      user: userLabel,
      points: featurePoints[featureTitle] || [
        { name: "业务台账维护", effect: "业务台账全流程维护" },
        { name: "数据校验同步", effect: "关键字段校验与数据同步" },
        { name: "统计与穿透", effect: "查询统计、导出与穿透查看" }
      ]
    };
  });

  return (
    <div className="edu-proto-cards">
      <div className="edu-proto-grid">
        {mergedPages.map((item) => (
          <div className="edu-proto-card" key={item.id}>
            <div className="edu-proto-card-header">{headerTitle}</div>
            <div className="edu-proto-card-title">功能名称：{item.feature}</div>
            <div className="edu-proto-card-body">
              {item.points.map((point, idx) => (
                <div className="edu-proto-block" key={`${item.id}-pt-${idx}`}>
                  <div className="edu-proto-line">功能点{idx + 1}：{point.name}</div>
                  <div className="edu-proto-line">使用用户：{item.user}</div>
                  <div className="edu-proto-line">作用：{point.effect}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
