const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
// 16:9 layout
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const SX = SLIDE_W / 10;
const SY = SLIDE_H / 10;
const sx = (v) => v * SX;
const sy = (v) => v * SY;
const fs = (v) => v * SY;
pptx.defineLayout({ name: "WIDE_16_9", width: SLIDE_W, height: SLIDE_H });
pptx.layout = "WIDE_16_9";

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
  x: 0, y: 0, w: SLIDE_W, h: SLIDE_H,
  fill: { color: bg },
  line: { color: bg }
});

// Header
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: SLIDE_W, h: sy(0.62),
  fill: { color: "FFFFFF" },
  line: { color: "E5EAF3" }
});
slide.addText("教育培训管理导航", {
  x: sx(0.4), y: sy(0.12), w: sx(6), h: sy(0.4),
  fontFace: "Microsoft YaHei", fontSize: fs(18), color: titleColor, bold: true
});
slide.addText("管理员", {
  x: sx(8.6), y: sy(0.17), w: sx(1), h: sy(0.3),
  fontFace: "Microsoft YaHei", fontSize: fs(12), color: "465468", bold: true, align: "right"
});

const marginX = sx(0.4);
const gapX = sx(0.28);
const colCount = 4;
const cardW = (SLIDE_W - marginX * 2 - gapX * (colCount - 1)) / colCount;
const cardH = sy(1.7);
const startY = sy(0.85);
const gapY = sy(0.28);

function addCard(col, row, data) {
  const x = marginX + col * (cardW + gapX);
  const y = startY + row * (cardH + gapY);
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: cardW, h: cardH,
    fill: { color: cardBg },
    line: { color: cardBorder },
    radius: sx(0.12)
  });
  slide.addText(data.title, {
    x: x + sx(0.14), y: y + sy(0.12), w: cardW - sx(0.28), h: sy(0.22),
    fontFace: "Microsoft YaHei", fontSize: fs(9), color: titleColor, bold: true,
    shrinkText: true
  });
  slide.addText(data.metric, {
    x: x + sx(0.14), y: y + sy(0.35), w: cardW - sx(0.28), h: sy(0.18),
    fontFace: "Microsoft YaHei", fontSize: fs(7), color: "98A2B3",
    shrinkText: true
  });
  slide.addText(data.count, {
    x: x + sx(0.14), y: y + sy(0.56), w: cardW - sx(0.28), h: sy(0.24),
    fontFace: "Microsoft YaHei", fontSize: fs(11), color: "101828", bold: true,
    shrinkText: true
  });
  slide.addText(data.desc, {
    x: x + sx(0.14), y: y + sy(0.82), w: cardW - sx(0.28), h: sy(0.18),
    fontFace: "Microsoft YaHei", fontSize: fs(6.5), color: subColor,
    shrinkText: true
  });
  // pills (single row)
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + sx(0.14), y: y + sy(1.02), w: cardW * 0.48, h: sy(0.22),
    fill: { color: "EDF4FF" },
    line: { color: "DBE7FF" },
    radius: sx(0.12)
  });
  slide.addText(data.items[0], {
    x: x + sx(0.2), y: y + sy(1.04), w: cardW * 0.44, h: sy(0.18),
    fontFace: "Microsoft YaHei", fontSize: fs(6), color: accent,
    shrinkText: true
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + cardW * 0.54, y: y + sy(1.02), w: cardW * 0.42, h: sy(0.22),
    fill: { color: "EDF4FF" },
    line: { color: "DBE7FF" },
    radius: sx(0.12)
  });
  slide.addText(data.items[1], {
    x: x + cardW * 0.58, y: y + sy(1.04), w: cardW * 0.36, h: sy(0.18),
    fontFace: "Microsoft YaHei", fontSize: fs(6), color: accent,
    shrinkText: true
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

cards.forEach((c, i) => addCard(i % 4, Math.floor(i / 4), c));

// Stat card full width
const statY = startY + 2 * (cardH + gapY);
const statH = sy(2.2);
slide.addShape(pptx.ShapeType.roundRect, {
  x: marginX, y: statY, w: SLIDE_W - marginX * 2, h: statH,
  fill: { color: "F7F9FC" },
  line: { color: cardBorder },
  radius: sx(0.14)
});
slide.addText("企业教育培训情况统计", {
  x: marginX + sx(0.2), y: statY + sy(0.18), w: sx(5), h: sy(0.3),
  fontFace: "Microsoft YaHei", fontSize: fs(13.5), color: titleColor, bold: true
});
slide.addText("企业核心指标概览", {
  x: marginX + sx(0.2), y: statY + sy(0.45), w: sx(5), h: sy(0.2),
  fontFace: "Microsoft YaHei", fontSize: fs(8.5), color: "8A97AB"
});
// Score box + mini cards (fit within slide width)
const statBoxX = sx(5.1);
const statGap = sx(0.2);
const statScoreW = sx(1.4);
const statMiniW = sx(1.4);
slide.addShape(pptx.ShapeType.roundRect, {
  x: statBoxX, y: statY + sy(0.15), w: statScoreW, h: sy(0.9),
  fill: { color: "2B6BE4" },
  line: { color: "2B6BE4" },
  radius: sx(0.14)
});
slide.addText("综合指标", {
  x: statBoxX + sx(0.08), y: statY + sy(0.22), w: statScoreW - sx(0.1), h: sy(0.2),
  fontFace: "Microsoft YaHei", fontSize: fs(8), color: "DDE7FF", align: "right"
});
slide.addText("98", {
  x: statBoxX + sx(0.08), y: statY + sy(0.45), w: statScoreW - sx(0.1), h: sy(0.4),
  fontFace: "Microsoft YaHei", fontSize: fs(20), color: "FFFFFF", bold: true, align: "right"
});
slide.addText("来自企业教育培训情况统计", {
  x: statBoxX + sx(0.08), y: statY + sy(0.78), w: statScoreW - sx(0.1), h: sy(0.2),
  fontFace: "Microsoft YaHei", fontSize: fs(7), color: "DDE7FF", align: "right"
});
// Mini boxes
slide.addShape(pptx.ShapeType.roundRect, {
  x: statBoxX + statScoreW + statGap, y: statY + sy(0.15), w: statMiniW, h: sy(0.9),
  fill: { color: "FFFFFF" }, line: { color: "E4EBF5" }, radius: sx(0.14)
});
slide.addText("培训计划综合查询", { x: statBoxX + statScoreW + statGap + sx(0.08), y: statY + sy(0.2), w: statMiniW - sx(0.12), h: sy(0.2), fontFace: "Microsoft YaHei", fontSize: fs(7.5), color: subColor, shrinkText: true });
slide.addText("33", { x: statBoxX + statScoreW + statGap + sx(0.08), y: statY + sy(0.45), w: statMiniW - sx(0.12), h: sy(0.3), fontFace: "Microsoft YaHei", fontSize: fs(14), color: titleColor, bold: true });
slide.addText("全部计划数", { x: statBoxX + statScoreW + statGap + sx(0.08), y: statY + sy(0.72), w: statMiniW - sx(0.12), h: sy(0.2), fontFace: "Microsoft YaHei", fontSize: fs(7), color: "98A2B3" });

slide.addShape(pptx.ShapeType.roundRect, {
  x: statBoxX + statScoreW + statGap + statMiniW + statGap, y: statY + sy(0.15), w: statMiniW, h: sy(0.9),
  fill: { color: "FFFFFF" }, line: { color: "E4EBF5" }, radius: sx(0.14)
});
slide.addText("培训记录综合查询", { x: statBoxX + statScoreW + statGap + statMiniW + statGap + sx(0.08), y: statY + sy(0.2), w: statMiniW - sx(0.12), h: sy(0.2), fontFace: "Microsoft YaHei", fontSize: fs(7.5), color: subColor, shrinkText: true });
slide.addText("40", { x: statBoxX + statScoreW + statGap + statMiniW + statGap + sx(0.08), y: statY + sy(0.45), w: statMiniW - sx(0.12), h: sy(0.3), fontFace: "Microsoft YaHei", fontSize: fs(14), color: titleColor, bold: true });
slide.addText("全部记录数", { x: statBoxX + statScoreW + statGap + statMiniW + statGap + sx(0.08), y: statY + sy(0.72), w: statMiniW - sx(0.12), h: sy(0.2), fontFace: "Microsoft YaHei", fontSize: fs(7), color: "98A2B3" });

// Four core metrics
const coreY = statY + sy(1.25);
const coreW = (SLIDE_W - marginX * 2 - sx(0.32) * 3) / 4;
const core = [
  ["计划完成率", "92%", "年度培训计划执行"],
  ["培训覆盖率", "88%", "关键岗位覆盖"],
  ["档案更新率", "99%", "档案维护及时"],
  ["关键岗位持证率", "97%", "取证合规达标"]
];
for (let i = 0; i < 4; i++) {
  const x = marginX + i * (coreW + sx(0.32));
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y: coreY, w: coreW, h: sy(0.75),
    fill: { color: "FFFFFF" }, line: { color: "E7EDF6" }, radius: sx(0.12)
  });
  slide.addShape(pptx.ShapeType.rect, { x, y: coreY, w: sx(0.05), h: sy(0.75), fill: { color: "2B6BE4" }, line: { color: "2B6BE4" } });
  slide.addText(core[i][0], { x: x + sx(0.1), y: coreY + sy(0.1), w: coreW - sx(0.2), h: sy(0.2), fontFace: "Microsoft YaHei", fontSize: fs(8), color: subColor });
  slide.addText(core[i][1], { x: x + sx(0.1), y: coreY + sy(0.32), w: coreW - sx(0.2), h: sy(0.25), fontFace: "Microsoft YaHei", fontSize: fs(12), color: titleColor, bold: true });
  slide.addText(core[i][2], { x: x + sx(0.1), y: coreY + sy(0.52), w: coreW - sx(0.2), h: sy(0.2), fontFace: "Microsoft YaHei", fontSize: fs(7), color: "98A2B3" });
}

pptx.writeFile({ fileName: "education-training-nav-1x1.pptx" });
