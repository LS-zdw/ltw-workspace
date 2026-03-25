const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pptx.author = 'Codex';
pptx.company = 'PCITC';
pptx.subject = '安全教育培训知识库';
pptx.title = '安全教育培训知识库两页汇报';
pptx.lang = 'zh-CN';

const FONT = 'Microsoft YaHei';
const C = {
  bg: 'F3F6FC',
  panel: 'FFFFFF',
  line: 'D8E3F2',
  title: '0F2E76',
  text: '1E2B44',
  sub: '4F5F7A',
  blue1: '2D7BEA',
  blue2: '0E47B8',
  db1: '3C86F0',
  db2: '1C56C7',
  cyan: '4FC5F7',
  green: '2DAF9B',
  yellow: 'F5AD2E'
};

function bg(slide) {
  slide.background = { color: C.bg };
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.25, y: 0.2, w: 12.83, h: 7.1,
    rectRadius: 0.08,
    line: { color: 'DEE6F2', pt: 1 },
    fill: { color: 'F8FBFF' }
  });
}

function title(slide, t, y = 0.42) {
  slide.addText(t, {
    x: 1.2, y, w: 10.9, h: 0.42,
    align: 'center',
    fontFace: FONT,
    fontSize: 24,
    bold: true,
    color: C.title
  });
}

function subtitle(slide, t, y = 0.9) {
  slide.addText(t, {
    x: 1.7, y, w: 9.9, h: 0.55,
    align: 'center',
    fontFace: FONT,
    fontSize: 11,
    color: C.text
  });
}

function bullet(slide, x, y, txt) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y: y + 0.08, w: 0.08, h: 0.08,
    line: { color: C.blue1, pt: 1 },
    fill: { color: C.blue1 }
  });
  slide.addText(txt, {
    x: x + 0.14, y, w: 3.6, h: 0.25,
    fontFace: FONT, fontSize: 10.5, color: C.text
  });
}

function db(slide, x, y, w, h, text, fs = 14) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y: y + 0.14, w, h: h - 0.14,
    rectRadius: 0.2,
    line: { color: C.db2, pt: 1 },
    fill: { color: C.db2 }
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w, h: 0.34,
    line: { color: '77B7FF', pt: 1 },
    fill: { color: C.db1 }
  });
  slide.addText(text, {
    x, y: y + h * 0.44, w, h: 0.25,
    align: 'center', fontFace: FONT, fontSize: fs, bold: true, color: 'FFFFFF'
  });
}

function roundCard(slide, x, y, w, h, fill, border, r = 0.06) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: r,
    line: { color: border, pt: 1 },
    fill: { color: fill }
  });
}

// Slide 1: 总体架构
{
  const s = pptx.addSlide();
  bg(s);
  title(s, '安全教育培训知识库总体架构');
  subtitle(s, '安全教育培训知识库是教育培训子域的培训内容资源中心，整合综合安全平台各子域安全知识，为培训业务提供统一素材来源。');

  roundCard(s, 0.9, 1.75, 11.55, 3.05, 'FFFFFF', C.line, 0.08);

  roundCard(s, 4.1, 2.05, 5.1, 0.5, C.blue2, C.blue2, 0.05);
  s.addText('综合安全管理平台', {
    x: 4.1, y: 2.19, w: 5.1, h: 0.24,
    align: 'center', fontFace: FONT, fontSize: 16, bold: true, color: 'FFFFFF'
  });

  const domainY = 2.85;
  const domainW = 3.45;
  ['风险隐患子域', '应急管理子域', '公共安全子域'].forEach((d, i) => {
    const x = 1.3 + i * 3.62;
    roundCard(s, x, domainY, domainW, 1.65, 'F2F7FF', 'E1EAF6', 0.04);
    s.addText(d, {
      x, y: domainY + 0.16, w: domainW, h: 0.22,
      align: 'center', fontFace: FONT, fontSize: 12.5, bold: true, color: C.text
    });
  });

  const boxes = [
    { x: 1.35, y: 3.52, w: 2.0, c: 'F5AD2E', t: '风险隐患清单\n隐患案例' },
    { x: 3.52, y: 3.52, w: 2.35, c: '2D7BEA', t: '事故事件分享\n推演案例' },
    { x: 5.98, y: 3.52, w: 2.35, c: '2E8BFF', t: '应急预案\n及拉练训练素材' },
    { x: 8.45, y: 3.52, w: 3.55, c: '1EA89A', t: '各级教育扩展\n防灾知识' }
  ];
  boxes.forEach((b) => {
    roundCard(s, b.x, b.y, b.w, 0.68, b.c, 'FFFFFF', 0.04);
    s.addText(b.t, {
      x: b.x + 0.1, y: b.y + 0.14, w: b.w - 0.2, h: 0.42,
      align: 'center', fontFace: FONT, fontSize: 11, bold: true, color: 'FFFFFF'
    });
  });

  db(s, 2.45, 5.1, 8.45, 1.22, '安全教育培训知识库', 17);
  db(s, 6.2, 4.7, 0.95, 0.56, '', 10);
  s.addText('（统一源东 · 统一检索 · 统一引用）', {
    x: 2.45, y: 5.93, w: 8.45, h: 0.2,
    align: 'center', fontFace: FONT, fontSize: 11, bold: true, color: 'E9F2FF'
  });

  bullet(s, 1.35, 6.56, '汇聚安全知识资源');
  bullet(s, 4.95, 6.56, '形成统一培训素材中心');
  bullet(s, 8.35, 6.56, '支撑培训课程与培训计划');
}

// Slide 2: 功能与价值
{
  const s = pptx.addSlide();
  bg(s);
  title(s, '安全教育培训知识库功能与价值');

  // left: 核心功能
  roundCard(s, 0.55, 1.35, 4.75, 5.75, 'FFFFFF', C.line, 0.08);
  s.addShape(pptx.ShapeType.rect, {
    x: 0.72, y: 1.55, w: 0.07, h: 0.22,
    line: { color: C.blue2, transparency: 100 },
    fill: { color: C.blue2 }
  });
  s.addText('核心功能', {
    x: 0.9, y: 1.52, w: 2.0, h: 0.25,
    fontFace: FONT, fontSize: 15, bold: true, color: C.text
  });

  const leftItems = [
    ['资源浏览', '分层展示案例、预案、教材'],
    ['资源检索', '关键词、分类、来源查询'],
    ['资源详情', '展示内容、附件、视频']
  ];
  let ly = 2.02;
  leftItems.forEach((it) => {
    roundCard(s, 0.75, ly, 4.35, 0.95, 'F9FCFF', 'DFE8F5', 0.05);
    roundCard(s, 0.95, ly + 0.2, 0.62, 0.52, C.blue1, C.blue1, 0.04);
    s.addText(it[0], {
      x: 1.8, y: ly + 0.24, w: 1.8, h: 0.2,
      fontFace: FONT, fontSize: 12.5, bold: true, color: C.text
    });
    s.addText(it[1], {
      x: 1.8, y: ly + 0.52, w: 2.8, h: 0.2,
      fontFace: FONT, fontSize: 10.5, color: C.sub
    });
    ly += 1.15;
  });

  bullet(s, 0.92, 5.72, '汇聚安全知识资源');
  bullet(s, 0.92, 6.0, '形成统一培训搜功中心');
  bullet(s, 0.92, 6.28, '支撑培训课程与培训计划');

  // right: 在培训业务中的作用
  roundCard(s, 5.55, 1.35, 7.2, 5.75, 'FFFFFF', C.line, 0.08);
  s.addShape(pptx.ShapeType.rect, {
    x: 5.72, y: 1.55, w: 0.07, h: 0.22,
    line: { color: C.blue2, transparency: 100 },
    fill: { color: C.blue2 }
  });
  s.addText('在培训业务中的作用', {
    x: 5.9, y: 1.52, w: 3.0, h: 0.25,
    fontFace: FONT, fontSize: 15, bold: true, color: C.text
  });

  db(s, 6.15, 2.62, 1.95, 1.45, '安全教育\n培训知识库', 11.5);

  const rightPills = [
    ['培训计划制定', 'F5B333', 'D59019'],
    ['线上培训课程', '45BFD7', '1B99B8'],
    ['班组安全活动', '2E7CE8', '1D56C6'],
    ['培训考试题库', '40B9A5', '248E7F']
  ];
  let py = 2.0;
  rightPills.forEach((p) => {
    roundCard(s, 8.32, py, 3.95, 0.72, p[1], p[2], 0.05);
    s.addText(p[0], {
      x: 8.32, y: py + 0.22, w: 3.95, h: 0.24,
      align: 'center', fontFace: FONT, fontSize: 13, bold: true, color: 'FFFFFF'
    });
    s.addShape(pptx.ShapeType.chevron, {
      x: 7.92, y: py + 0.22, w: 0.26, h: 0.25,
      line: { color: C.cyan, transparency: 100 },
      fill: { color: C.cyan }
    });
    py += 1.0;
  });

  s.addText('知识库为培训业务提供统一素材来源。', {
    x: 6.45, y: 6.34, w: 5.55, h: 0.2,
    align: 'center', fontFace: FONT, fontSize: 12, color: C.text
  });
}

pptx.writeFile({ fileName: 'safety-training-knowledge-2pages-16x9.pptx' });
