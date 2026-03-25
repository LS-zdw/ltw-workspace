const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
// Custom card size (cm -> inches)
const SLIDE_W = 9.71 / 2.54;
const SLIDE_H = 11.52 / 2.54;
pptx.defineLayout({ name: "CARD_CM", width: SLIDE_W, height: SLIDE_H });
pptx.layout = "CARD_CM";

const ENTERPRISE_USERS = "安环部综管室、运行部教育培训负责人、班组负责人";
const HQ_USERS = "健康安全环保部-HSE体系室";

const getUserLabel = (title) => {
  if (title.includes("企业端")) return ENTERPRISE_USERS;
  if (title.includes("总部端")) return HQ_USERS;
  if (title.includes("个人端")) return "员工个人";
  return "各级管理人员";
};

const stripEndTag = (title) => title.replace(/-企业端$|-总部端$/g, "");
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
  "教育培训-一人一档-企业端",
  "教育培训-一人一档-总部端",
  "教育培训-证书管理-企业端",
  "教育培训-总部统计分析",
  "教育培训-线上考试",
  "教育培训-线上学习"
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
    { name: "企业综合指标", effect: "计划完成率、覆盖率与持证率统计" },
    { name: "档案与取证分析", effect: "档案更新率、取证合规情况分析" },
    { name: "专项培训统计", effect: "三级教育、岗位培训与投入统计" }
  ],
  "教育培训-一人一档": [
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
  ],
  "教育培训-线上考试": [
    { name: "考试计划与发布", effect: "考试安排、发布与对象范围配置" },
    { name: "在线考试管理", effect: "考试过程监控、提交与成绩生成" },
    { name: "考试统计分析", effect: "通过率、成绩分布与异常分析" }
  ],
  "教育培训-线上学习": [
    { name: "课程资源管理", effect: "课程上架、章节维护与资料更新" },
    { name: "学习过程管理", effect: "学习进度跟踪与完成率统计" },
    { name: "学习效果评估", effect: "学习反馈、测评结果与改进" }
  ]
};

const featureSummary = {
  "教育培训-班组安全活动管理": "聚焦班组安全活动全流程管理，体现计划落实、过程留痕与整改闭环的执行成效。",
  "教育培训-教育培训管理导航": "汇集教育培训核心入口与关键指标，形成一站式业务总览与快速处置通道。",
  "教育培训-培训计划管理": "围绕年度与临时计划统筹编制与执行监督，支撑计划落地与过程管控。",
  "教育培训-培训记录管理": "规范培训记录登记与质量追踪，保障参训情况、成绩与发证数据完整可溯。",
  "教育培训-培训计划审批": "强化计划审批过程合规与责任闭环，确保计划审核有据、流转可追溯。",
  "教育培训-培训师资管理": "完善师资资源库与授课绩效评价，支撑教学能力建设与资源优化配置。",
  "教育培训-培训需求上报": "集中承接培训需求提报与汇总上报，支撑年度培训资源统筹与计划编制。",
  "教育培训-培训需求管理": "建立需求台账与审核机制，形成需求全生命周期管理与统计分析基础。",
  "教育培训-企业教育培训情况统计": "从企业关键指标出发综合呈现培训成效，为管理决策提供量化支撑。",
  "教育培训-一人一档": "构建员工教育培训档案体系，贯通培训、考试、证书等全链条记录。",
  "教育培训-证书管理": "统一证书台账与预警机制，强化持证合规与复审管理。",
  "教育培训-总部统计分析": "从集团视角开展指标对标与趋势分析，支撑总部统筹管理与考核评估。",
  "教育培训-线上考试": "规范线上考试组织与过程管控，形成成绩可追溯的闭环管理。",
  "教育培训-线上学习": "构建线上学习资源与过程管理体系，提升学习覆盖与效果评估。"
};

const rawItems = allowedTitles.map((title) => ({ title, featureKey: stripEndTag(title) }));
const merged = Array.from(
  rawItems.reduce((acc, item) => {
    const list = acc.get(item.featureKey) || [];
    list.push(item.title);
    acc.set(item.featureKey, list);
    return acc;
  }, new Map())
).map(([featureKey, titles]) => {
  const hasEnterprise = titles.some((t) => t.includes("企业端"));
  const hasHq = titles.some((t) => t.includes("总部端"));
  const userLabel = hasEnterprise && hasHq
    ? `${ENTERPRISE_USERS}、${HQ_USERS}`
    : hasEnterprise
      ? ENTERPRISE_USERS
      : hasHq
        ? HQ_USERS
        : getUserLabel(featureKey);
  return {
    title: featureKey,
    feature: getFeatureName(featureKey),
    user: userLabel,
    summary: featureSummary[featureKey] || `围绕${getFeatureName(featureKey)}业务开展统筹管理与成效监控。`,
    points: featurePoints[featureKey] || [
      { name: "业务台账维护", effect: "业务台账全流程维护" },
      { name: "数据校验同步", effect: "关键字段校验与数据同步" },
      { name: "统计与穿透", effect: "查询统计、导出与穿透查看" }
    ]
  };
});

const colors = {
  blue: "3B89D9",
  gray: "E6E6E6",
  border: "9AA4B2",
  text: "1F2A37"
};

const headerTitle = "软件原型设计说明卡-教育培训";

const layout = {
  marginX: 0.12,
  marginY: 0.12
};
const cardW = SLIDE_W - layout.marginX * 2;
const cardH = SLIDE_H - layout.marginY * 2;

const addCard = (slide, item, x, y) => {
  // summary line above card
  slide.addText(`${item.feature}`, {
    x, y: y - 0.5, w: cardW, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 11, color: colors.text, bold: true
  });
  slide.addShape(pptx.ShapeType.line, {
    x, y: y - 0.24, w: cardW, h: 0,
    line: { color: colors.border, width: 1 }
  });
  slide.addText(item.summary, {
    x, y: y - 0.18, w: cardW, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 9.5, color: colors.text
  });
  // card frame
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: cardW, h: cardH,
    fill: { color: "FFFFFF" },
    line: { color: colors.border, width: 1 }
  });
  // header
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: cardW, h: 0.32,
    fill: { color: colors.blue },
    line: { color: colors.blue }
  });
  slide.addText(headerTitle, {
    x: x + 0.06, y: y + 0.04, w: cardW - 0.12, h: 0.24,
    fontFace: "Microsoft YaHei", fontSize: 12, color: "FFFFFF", bold: true, align: "center"
  });
  // feature title bar
  slide.addShape(pptx.ShapeType.rect, {
    x, y: y + 0.32, w: cardW, h: 0.3,
    fill: { color: colors.gray },
    line: { color: colors.border, width: 1 }
  });
  slide.addText(`功能名称：${item.feature}`, {
    x: x + 0.06, y: y + 0.36, w: cardW - 0.12, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 10, color: colors.text, bold: true, align: "center",
    shrinkText: true
  });

  let cursorY = y + 0.62;
  item.points.forEach((point, idx) => {
    const lineH = 0.2;
    const padY = 0.06;
    if (idx > 0) {
      slide.addShape(pptx.ShapeType.line, {
        x: x, y: cursorY, w: cardW, h: 0,
        line: { color: colors.border, width: 1 }
      });
    }
    cursorY += padY;
    slide.addText(`功能点${idx + 1}：${point.name}`, {
      x: x + 0.08, y: cursorY, w: cardW - 0.16, h: lineH,
      fontFace: "Microsoft YaHei", fontSize: 9.5, color: colors.text, bold: true,
      shrinkText: true
    });
    cursorY += lineH + 0.04;
    slide.addText(`使用用户：${item.user}`, {
      x: x + 0.08, y: cursorY, w: cardW - 0.16, h: lineH,
      fontFace: "Microsoft YaHei", fontSize: 8.6, color: colors.text,
      shrinkText: true
    });
    cursorY += lineH + 0.04;
    slide.addText(`作用：${point.effect}`, {
      x: x + 0.08, y: cursorY, w: cardW - 0.16, h: lineH + 0.04,
      fontFace: "Microsoft YaHei", fontSize: 8.6, color: colors.text,
      shrinkText: true
    });
    cursorY += lineH + 0.12;
  });
};

merged.forEach((item) => {
  const slide = pptx.addSlide();
  const x = layout.marginX;
  const y = layout.marginY;
  addCard(slide, item, x, y);
});

pptx.writeFile({ fileName: "education-training-prototype-cards.pptx" });
