# 综合安全原型工作台（Safety Proto Workbench）

## 1. 项目背景与目标
本项目是一个本地维护的前端原型框架，用于快速构建和演示安全“三同时”和安全教育培训模块，服务于方案论证、汇报展示和高保真原型验证，非生产系统。

核心目标：
- 支持多个业务模块（安全三同时 / 教育培训）
- 支持模块下多个页面
- 页面可由最小输入（spec）自动生成
- 支持可更换母版（主题）
- 支持不同角色视角（如培训员 / 被培训员）
- 可离线打包为 HTML，在无 Node 环境下演示

非目标：
- 不实现完整业务逻辑
- 不接真实后端
- 不引入复杂状态管理（Redux 等）

---

## 2. 技术选型与运行约定
- 前端框架：React
- 构建工具：Vite
- 路由：react-router-dom（HashRouter，支持离线演示）
- 样式体系：原生 CSS + CSS Variables（Design Tokens）
- Node 版本：>= 20.19.0（ARM64 麒麟系统已验证）
- 开发模式：Vite polling（规避 EMFILE 文件监听问题）

---

## 3. 工程目录结构约定
```
proto-workbench/
├─ specs/                         # 原型生成器输入（最小输入）
│  ├─ san-tongshi/
│  └─ edu/
│     ├─ trainer/
│     └─ trainee/
├─ src/
│  ├─ theme/                      # 母版与主题系统
│  │  ├─ themes/
│  │  ├─ ThemeProvider.jsx
│  │  └─ tokens.css
│  ├─ layout/                     # 页面壳（顶部栏/背景/容器）
│  ├─ components/ui/              # 统一风格 UI 组件
│  ├─ modules/                    # 业务模块
│  │  ├─ san-tongshi/
│  │  └─ edu/
│  ├─ app/
│  │  └─ routes.generated.jsx
│  ├─ styles/
│  └─ main.jsx
└─ tools/
   ├─ proto-gen.mjs               # 生成器入口（npm run gen）
   └─ proto.mjs                   # spec → 页面/路由生成器实现
```

---

## 4. 母版（Theme / Layout）设计原则
母版用于统一系统观感，包括：
- 顶部栏（如“中国石化 安全管理一体化应用平台”）
- 背景（渐变 / 水印 / 图片）
- 页面容器宽度与留白
- 统一按钮、表格、卡片风格

通过 CSS Variables（tokens.css）实现主题切换，不同母版对应不同 token 集合。

---

## 5. 业务模块设计说明

### 5.1 安全三同时（san-tongshi）
- 面向项目全生命周期
- 典型页面：任务列表、任务详情、审批/会签
- 页面侧重流程、资料包、状态与责任

### 5.2 教育培训（edu）
需明确区分角色视角：

**培训员（trainer）**
- 培训计划制定与管理
- 实施、归档
- 统计分析（总部 / 企业）

路由前缀：
```
/edu/trainer/*
```

**被培训员（trainee）**
- 我的培训任务
- 在线学习 / 考试
- 证书与到期提醒

路由前缀：
```
/edu/trainee/*
```

---

## 6. 原型生成器（Proto Generator）设计目标
生成器用于生成页面骨架，而非完整业务逻辑。

Spec 示例：
```json
{
  "title": "安全三同时-任务详情",
  "blocks": [
    { "type": "info", "title": "基本信息" },
    { "type": "steps", "title": "流程进度" },
    { "type": "table", "title": "资料清单" }
  ]
}
```

生成结果要求：
- 页面不为空白
- 至少包含结构化区块
- 可直接用于演示

---

## 7. 离线演示与交付约定
- 使用 HashRouter
- `npm run build` 生成 dist/
- dist 目录可直接拷贝到其他电脑演示
- 不依赖 Node / npm 环境

---

## 8. 协作与维护约定
- 强调结构清晰、可维护、可演示
- 所有页面必须走统一 Layout
- 禁止在业务页面中直接写散乱样式
- 新增能力优先复用 ui 组件与 token
