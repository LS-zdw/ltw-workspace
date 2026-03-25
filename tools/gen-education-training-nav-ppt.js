const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
// 1:1 layout
pptx.defineLayout({ name: "SQUARE", width: 10, height: 10 });
pptx.layout = "SQUARE";

const slide = pptx.addSlide();

// Colors
const bg = "F5F7FA";
const cardBg = "FFFFFF";
const cardBorder = "E5EAF3";
const titleColor = "1F2A37";
const subColor = "667085";
const accent = "2B6BE4";

// Background
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 10, h: 10,
  fill: { color: bg },
  line: { color: bg }
});

// Header
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 10, h: 0.65,
  fill: { color: "FFFFFF" },
  line: { color: "E5EAF3" }
});
slide.addText("教育培训管理导航", {
  x: 0.4, y: 0.15, w: 6, h: 0.4,
  fontFace: "Microsoft YaHei", fontSize: 18, color: titleColor, bold: true
});
slide.addText("管理员", {
  x: 8.6, y: 0.2, w: 1, h: 0.3,
  fontFace: "Microsoft YaHei", fontSize: 12, color: "465468", bold: true, align: "right"
});

const marginX = 0.4;
const gapX = 0.4;
const cardW = (10 - marginX * 2 - gapX) / 2; // 4.4
const cardH = 1.45;
const startY = 0.9;
const gapY = 0.25;

function addCard(col, row, data) {
  const x = marginX + col * (cardW + gapX);
  const y = startY + row * (cardH + gapY);
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: cardW, h: cardH,
    fill: { color: cardBg },
    line: { color: cardBorder },
    radius: 0.12
  });
  slide.addText(data.title, {
    x: x + 0.2, y: y + 0.15, w: cardW - 0.4, h: 0.25,
    fontFace: "Microsoft YaHei", fontSize: 12, color: titleColor, bold: true
  });
  slide.addText(data.metric, {
    x: x + 0.2, y: y + 0.4, w: cardW - 0.4, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 9, color: "98A2B3"
  });
  slide.addText(data.count, {
    x: x + 0.2, y: y + 0.63, w: cardW - 0.4, h: 0.3,
    fontFace: "Microsoft YaHei", fontSize: 16, color: "101828", bold: true
  });
  slide.addText(data.desc, {
    x: x + 0.2, y: y + 0.98, w: cardW - 0.4, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 9, color: subColor
  });
  // pills
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.2, y: y + 1.15, w: 1.7, h: 0.25,
    fill: { color: "EDF4FF" },
    line: { color: "DBE7FF" },
    radius: 0.12
  });
  slide.addText(data.items[0], {
    x: x + 0.28, y: y + 1.17, w: 1.55, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 8.5, color: accent
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 2.05, y: y + 1.15, w: 1.7, h: 0.25,
    fill: { color: "EDF4FF" },
    line: { color: "DBE7FF" },
    radius: 0.12
  });
  slide.addText(data.items[1], {
    x: x + 2.13, y: y + 1.17, w: 1.55, h: 0.2,
    fontFace: "Microsoft YaHei", fontSize: 8.5, color: accent
  });
}

const cards = [
  { title: "总部级培训", metric: "计划/反馈", count: "12", desc: "计划通知: 5 | 培训反馈: 7", items: ["待阅通知: 2", "待接收反馈: 3"] },
  { title: "企业级培训", metric: "计划/记录", count: "计划 25 | 记录 28", desc: "企业年度: 10 | 企业临时: 15", items: ["进行中计划: 3", "已登记培训记录: 28"] },
  { title: "运行部级培训", metric: "计划/记录", count: "计划 8 | 记录 12", desc: "运行部年度: 3 | 运行部月度: 5", items: ["进行中计划: 2", "已登记培训记录: 12"] },
  { title: "班组安全活动", metric: "活动计划", count: "10", desc: "活动计划: 10 | 完成率: 50%", items: ["已完成: 5", "超期未开展: 3"] },
  { title: "线上培训与考试", metric: "课程/考试", count: "15", desc: "课程: 10 | 考试: 5", items: ["已上线课程: 7", "待安排考试: 2"] },
  { title: "证书管理", metric: "证书总数", count: "120", desc: "有效证书: 100 | 预警: 20", items: ["即将到期: 12", "已过期: 8"] },
  { title: "培训师资管理", metric: "师资总数", count: "10", desc: "高级: 3 | 中级: 5 | 初级: 2", items: ["总授课课时: 30", "平均满意度: 5"] },
  { title: "一人一档", metric: "档案总数", count: "3200", desc: "人员总数: 1268 | 本年累计学时: 18624", items: ["有效证书: 2396", "待复审证书: 82"] }
];

cards.forEach((c, i) => addCard(i % 2, Math.floor(i / 2), c));

// Stat card full width
const statY = startY + 4 * (cardH + gapY);
const statH = 2.1;
slide.addShape(pptx.ShapeType.roundRect, {
  x: marginX, y: statY, w: 10 - marginX * 2, h: statH,
  fill: { color: "F7F9FC" },
  line: { color: cardBorder },
  radius: 0.14
});
slide.addText("企业教育培训情况统计", {
  x: marginX + 0.2, y: statY + 0.18, w: 5, h: 0.3,
  fontFace: "Microsoft YaHei", fontSize: 14, color: titleColor, bold: true
});
slide.addText("企业核心指标概览", {
  x: marginX + 0.2, y: statY + 0.48, w: 5, h: 0.2,
  fontFace: "Microsoft YaHei", fontSize: 9, color: "8A97AB"
});
// Score box
slide.addShape(pptx.ShapeType.roundRect, {
  x: 6.2, y: statY + 0.15, w: 1.5, h: 0.9,
  fill: { color: "2B6BE4" },
  line: { color: "2B6BE4" },
  radius: 0.14
});
slide.addText("综合指标", {
  x: 6.3, y: statY + 0.22, w: 1.3, h: 0.2,
  fontFace: "Microsoft YaHei", fontSize: 8, color: "DDE7FF", align: "right"
});
slide.addText("98", {
  x: 6.3, y: statY + 0.45, w: 1.3, h: 0.4,
  fontFace: "Microsoft YaHei", fontSize: 20, color: "FFFFFF", bold: true, align: "right"
});
slide.addText("来自企业教育培训情况统计", {
  x: 6.3, y: statY + 0.78, w: 1.3, h: 0.2,
  fontFace: "Microsoft YaHei", fontSize: 7, color: "DDE7FF", align: "right"
});
// Mini boxes
slide.addShape(pptx.ShapeType.roundRect, {
  x: 7.9, y: statY + 0.15, w: 1.6, h: 0.9,
  fill: { color: "FFFFFF" }, line: { color: "E4EBF5" }, radius: 0.14
});
slide.addText("培训计划综合查询", { x: 8.0, y: statY + 0.2, w: 1.4, h: 0.2, fontFace: "Microsoft YaHei", fontSize: 7.5, color: subColor });
slide.addText("33", { x: 8.0, y: statY + 0.45, w: 1.4, h: 0.3, fontFace: "Microsoft YaHei", fontSize: 14, color: titleColor, bold: true });
slide.addText("全部计划数", { x: 8.0, y: statY + 0.72, w: 1.4, h: 0.2, fontFace: "Microsoft YaHei", fontSize: 7, color: "98A2B3" });

slide.addShape(pptx.ShapeType.roundRect, {
  x: 9.6, y: statY + 0.15, w: 1.6, h: 0.9,
  fill: { color: "FFFFFF" }, line: { color: "E4EBF5" }, radius: 0.14
});
slide.addText("培训记录综合查询", { x: 9.7, y: statY + 0.2, w: 1.4, h: 0.2, fontFace: "Microsoft YaHei", fontSize: 7.5, color: subColor });
slide.addText("40", { x: 9.7, y: statY + 0.45, w: 1.4, h: 0.3, fontFace: "Microsoft YaHei", fontSize: 14, color: titleColor, bold: true });
slide.addText("全部记录数", { x: 9.7, y: statY + 0.72, w: 1.4, h: 0.2, fontFace: "Microsoft YaHei", fontSize: 7, color: "98A2B3" });

// Four core metrics
const coreY = statY + 1.2;
const coreW = (10 - marginX * 2 - 0.45 * 3) / 4;
for (let i = 0; i < 4; i++) {
  const x = marginX + i * (coreW + 0.45);
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y: coreY, w: coreW, h: 0.75,
    fill: { color: "FFFFFF" }, line: { color: "E7EDF6" }, radius: 0.12
  });
}
const core = [
  ["计划完成率", "92%", "年度培训计划执行"],
  ["培训覆盖率", "88%", "关键岗位覆盖"],
  ["档案更新率", "99%", "档案维护及时"],
  ["关键岗位持证率", "97%", "取证合规达标"]
];
core.forEach((c, i) => {
  const x = marginX + i * (coreW + 0.45);
  slide.addShape(pptx.ShapeType.rect, { x, y: coreY, w: 0.05, h: 0.75, fill: { color: "2B6BE4" }, line: { color: "2B6BE4" } });
  slide.addText(c[0], { x: x + 0.1, y: coreY + 0.1, w: coreW - 0.2, h: 0.2, fontFace: "Microsoft YaHei", fontSize: 8, color: subColor });
  slide.addText(c[1], { x: x + 0.1, y: coreY + 0.32, w: coreW - 0.2, h: 0.25, fontFace: "Microsoft YaHei", fontSize: 12, color: titleColor, bold: true });
  slide.addText(c[2], { x: x + 0.1, y: coreY + 0.52, w: coreW - 0.2, h: 0.2, fontFace: "Microsoft YaHei", fontSize: 7, color: "98A2B3" });
});

pptx.writeFile({ fileName: "education-training-nav-1x1.pptx" });
