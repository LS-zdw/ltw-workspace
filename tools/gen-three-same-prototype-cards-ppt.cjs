const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
// Custom card size (cm -> inches) to match reference
const SLIDE_W = 9.71 / 2.54;
const SLIDE_H = 11.52 / 2.54;
pptx.defineLayout({ name: "CARD_CM", width: SLIDE_W, height: SLIDE_H });
pptx.layout = "CARD_CM";

const colors = {
  blue: "1498D6",
  gray: "9AA3B2",
  border: "B4BAC6",
  text: "1F2A37"
};

const headerTitle = "软件原型设计说明卡-三同时管理";

const cards = [
  {
    feature: "安全三同时",
    summary: "本页展示安全三同时四阶段（可研、基础设计、试运行、竣工验收）的许可信息维护与过程管控方式，支持企业与总部按统一口径进行登记、查询与跟踪，为阶段性审批与验收提供依据（红框区域为页面示意）。",
    points: [
      {
        name: "可研阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        effect: "维护安全三同时可研阶段行政许可相关信息，支持按项目阶段查询与查看明细。"
      },
      {
        name: "基础设计阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        effect: "维护安全三同时基础设计阶段行政许可相关信息，跟踪批复与设计单位数据。"
      },
      {
        name: "试运行阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        effect: "维护安全三同时试运行阶段行政许可相关信息，覆盖试运行批复与登记情况。"
      },
      {
        name: "竣工验收阶段管理",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        effect: "维护安全三同时竣工验收阶段行政许可相关信息，支撑验收查询与归档。"
      }
    ]
  },
  {
    feature: "项目任务启动",
    summary: "本页体现项目任务启动的业务流程：由项目创建识别，进入审批与会签，再完成任务启动与变更管理，确保任务流转可追溯、责任边界清晰，支撑项目有序推进（红框区域为页面示意）。",
    points: [
      {
        name: "任务创建与专业识别",
        user: "企业安环部-安全室三同时业务主管",
        effect: "选择项目后创建任务，识别项目类型与专业类别，配置计划节点与责任人。"
      },
      {
        name: "审批与会签流转",
        user: "总部健康安全环保部三同时主管",
        effect: "完成审批与会签流转，形成任务流转记录与推进状态。"
      },
      {
        name: "任务启动与变更",
        user: "企业安环部-安全室三同时业务主管",
        effect: "审批完成后启动任务，必要时按流程进行任务变更与调整。"
      }
    ]
  },
  {
    feature: "项目信息管理",
    summary: "本页用于承接SUIP系统集成的项目基础信息，统一形成全量项目清单（包含不涉及三同时的项目），作为后续任务启动的标准化数据底座，避免多系统、多口径带来的信息不一致（红框区域为页面示意）。",
    points: [
      {
        name: "SUIP项目清单",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        effect: "展示从SUIP集成的全部项目，包含不涉及三同时的项目，支持查询与查看详情。"
      },
      {
        name: "项目详情查看",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        effect: "查看项目基础信息与建设信息，作为后续任务启动与维护的依据。"
      }
    ]
  },
  {
    feature: "三同时看板",
    summary: "本页展示三同时项目整体态势，通过项目类型、阶段分布、会签进度与久试未验等指标进行综合统计与对比，服务管理层决策研判与风险预警（红框区域为页面示意）。",
    points: [
      {
        name: "三同时数据统计分析",
        user: "企业安环部-安全室三同时业务主管、总部健康安全环保部三同时主管",
        effect: "展示项目总数、类型与阶段分布，掌握整体推进态势。"
      },
      {
        name: "重点工程与会签监控",
        user: "总部健康安全环保部三同时主管",
        effect: "聚焦重点工程数量、会签进度与久试未验情况，强化风险预警。"
      }
    ]
  }
];

const layout = {
  marginX: 0.12,
  marginY: 0.12
};
const cardW = SLIDE_W - layout.marginX * 2;
const cardH = SLIDE_H - layout.marginY * 2;

const addCard = (slide, item, x, y) => {
  slide.addText(item.summary, {
    x, y: y - 0.45, w: cardW, h: 0.34,
    fontFace: "Microsoft YaHei", fontSize: 10.2, color: colors.text
  });
  slide.addShape(pptx.ShapeType.line, {
    x, y: y - 0.1, w: cardW, h: 0,
    line: { color: colors.border, width: 1 }
  });

  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: cardW, h: cardH,
    fill: { color: "FFFFFF" },
    line: { color: colors.border, width: 1 }
  });

  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: cardW, h: 0.32,
    fill: { color: colors.blue },
    line: { color: colors.blue }
  });
  slide.addText(headerTitle, {
    x: x + 0.06, y: y + 0.04, w: cardW - 0.12, h: 0.24,
    fontFace: "Microsoft YaHei", fontSize: 12, color: "FFFFFF", bold: true, align: "center"
  });

  slide.addShape(pptx.ShapeType.rect, {
    x, y: y + 0.32, w: cardW, h: 0.3,
    fill: { color: colors.gray },
    line: { color: colors.border, width: 1 }
  });
  slide.addText(`功能名称：${item.feature}`, {
    x: x + 0.06, y: y + 0.36, w: cardW - 0.12, h: 0.22,
    fontFace: "Microsoft YaHei", fontSize: 10, color: "FFFFFF", bold: true, align: "center",
    shrinkText: true
  });

  let cursorY = y + 0.62;
  item.points.forEach((point, idx) => {
    const lineH = 0.2;
    const padY = 0.06;
    if (idx > 0) {
      slide.addShape(pptx.ShapeType.line, {
        x, y: cursorY, w: cardW, h: 0,
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
    slide.addText(`使用用户：${point.user}`, {
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

cards.forEach((item) => {
  const slide = pptx.addSlide();
  addCard(slide, item, layout.marginX, layout.marginY + 0.5);
});

pptx.writeFile({ fileName: "three-same-prototype-cards.pptx" });
