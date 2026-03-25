import generatedRoutes from "./routes.generated.jsx";

const localRoutes = [
  {
    path: "/three-same/tasks",
    title: "三同时任务列表",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/three-same-tasks.jsx"
  },
  {
    path: "/projects",
    title: "项目信息管理",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/projects.jsx"
  },
  {
    path: "/three-same/task/new",
    title: "三同时任务创建与识别",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/three-same-task-new.jsx"
  },
  {
    path: "/three-same/task/:taskId",
    title: "三同时任务详情",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/three-same-task-detail.jsx"
  },
  {
    path: "/edu/trainer/trainer-resource-management",
    title: "教育培训-培训师资管理-企业端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/trainer-resource-management.jsx"
  },
  {
    path: "/edu/trainer/trainer-resource-management-hq",
    title: "教育培训-培训师资管理-总部端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/trainer-resource-management-hq.jsx"
  },
  {
    path: "/edu/trainer/training-plan-management-enterprise",
    title: "教育培训-培训计划管理-企业端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/training-plan-management-enterprise.jsx"
  },
  {
    path: "/edu/trainer/training-demand-report-hq",
    title: "教育培训-培训需求上报-总部端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/training-demand-report-hq.jsx"
  },
  {
    path: "/edu/trainer/training-demand-management-hq",
    title: "教育培训-培训需求管理-总部端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/training-demand-management-hq.jsx"
  },
  {
    path: "/edu/trainer/training-record-management",
    title: "教育培训-培训记录管理-总部端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/training-record-management.jsx"
  },
  {
    path: "/edu/trainer/training-record-management-enterprise",
    title: "教育培训-培训记录管理-企业端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/training-record-management-enterprise.jsx"
  },
  {
    path: "/edu/trainer/training-one-person-one-file",
    title: "教育培训-一人一档-总部端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/training-one-person-one-file.jsx"
  },
  {
    path: "/edu/trainer/training-one-person-one-file-enterprise",
    title: "教育培训-一人一档-企业端",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/training-one-person-one-file-enterprise.jsx"
  },
  {
    path: "/edu/trainer/education-training-nav",
    title: "教育培训-教育培训管理导航",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/education-training-nav.jsx"
  },
  {
    path: "/edu/trainer/education-training-prototype-cards",
    title: "教育培训-原型设计卡总览",
    module: "edu/trainer",
    moduleGroup: "edu",
    elementPath: "./modules/edu/trainer/pages/education-training-prototype-cards.jsx"
  },
  {
    path: "/san-tongshi/safety-three-same",
    title: "安全三同时",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/safety-three-same.jsx"
  },
  {
    path: "/san-tongshi/fire-three-same",
    title: "消防三同时",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/fire-three-same.jsx"
  },
  {
    path: "/san-tongshi/occupational-health-three-same",
    title: "职业卫生三同时",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/occupational-health-three-same.jsx"
  },
  {
    path: "/san-tongshi/three-same-dashboard",
    title: "三同时看板",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/three-same-dashboard.jsx"
  },
  {
    path: "/san-tongshi/three-same-prototype-cards",
    title: "三同时管理-原型设计说明卡",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/three-same-prototype-cards.jsx"
  },
  {
    path: "/san-tongshi/project-maintenance",
    title: "三同时任务启动",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/project-maintenance.jsx"
  },
  {
    path: "/san-tongshi/task-init",
    title: "项目维护-创建识别",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/task-init.jsx"
  },
  {
    path: "/san-tongshi/task-approval",
    title: "项目维护-审批会签",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/task-approval.jsx"
  },
  {
    path: "/san-tongshi/project-maintenance-origin",
    title: "三同时项目信息管理",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/project-maintenance-origin.jsx"
  },
  {
    path: "/san-tongshi/safety-migration-query",
    title: "安全三同时-数据迁移查询",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/safety-three-same-migration-query.jsx"
  },
  {
    path: "/san-tongshi/safety-migration-query/detail",
    title: "安全三同时-数据迁移查询-详情",
    module: "san-tongshi",
    moduleGroup: "san-tongshi",
    elementPath: "./modules/san-tongshi/pages/safety-three-same-migration-query-detail.jsx"
  }
];

const localByPath = new Map(localRoutes.map((route) => [route.path, route]));
const mergedRoutes = generatedRoutes
  .map((route) => localByPath.get(route.path) || route)
  .filter((route) => route.path !== "/san-tongshi/task-detail")
  .filter((route) => route.path !== "/edu/trainer/ep-09");

for (const route of localRoutes) {
  if (!generatedRoutes.some((item) => item.path === route.path)) {
    mergedRoutes.push(route);
  }
}

export default mergedRoutes;
