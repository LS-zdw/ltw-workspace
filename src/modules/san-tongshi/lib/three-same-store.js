const PROJECTS_KEY = "projectsStore";
const TASKS_KEY = "threeSameTasksStore";
const TASK_NEW_WORKING_KEY = "threeSameTaskNewWorking";

const mockUsers = [
  "刘明",
  "周良峰",
  "胡华平",
  "张晓明",
  "王虎",
  "李强"
];

function nowIso() {
  return new Date().toISOString();
}

function yearNow() {
  return new Date().getFullYear();
}

function safeJsonParse(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function readList(key) {
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];
  const parsed = safeJsonParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
}

function writeList(key, list) {
  window.localStorage.setItem(key, JSON.stringify(list || []));
}

function buildMockProjects() {
  const now = nowIso();
  return [
    { id: "P-SUIP-001", source: "SUIP", projectCode: "H20018", projectName: "17万吨SBC项目", enterpriseName: "海南炼化", buildUnit: "海南巴陵化工新材料有限公司", projectLevel: "一类项目（集团公司级）", projectStage: "可研阶段", buildType: "迁建", industry: "化工", createdAt: now, updatedAt: now },
    { id: "P-SUIP-002", source: "SUIP", projectCode: "J20402", projectName: "204泊位苯水路出厂项目", enterpriseName: "九江石化", buildUnit: "九江石化", projectLevel: "二类项目（事业部级）", projectStage: "可研阶段", buildType: "新建", industry: "化工", createdAt: now, updatedAt: now },
    { id: "P-SUIP-003", source: "SUIP", projectCode: "LYS033", projectName: "全厂污水系统达标排", enterpriseName: "洛阳石化", buildUnit: "洛阳石化", projectLevel: "三类项目（企业级）", projectStage: "竣工验收阶段", buildType: "改造", industry: "环保", createdAt: now, updatedAt: now },
    { id: "P-SUIP-004", source: "SUIP", projectCode: "MM2026-01", projectName: "乙烯改造项目", enterpriseName: "茂名分公司", buildUnit: "茂名分公司", projectLevel: "二类项目（事业部级）", projectStage: "基础设计阶段", buildType: "扩建", industry: "石化", createdAt: now, updatedAt: now },
    { id: "P-SUIP-005", source: "SUIP", projectCode: "JM2026-08", projectName: "化工罐区优化项目", enterpriseName: "荆门分公司", buildUnit: "荆门分公司", projectLevel: "三类项目（企业级）", projectStage: "可研阶段", buildType: "改造", industry: "化工", createdAt: now, updatedAt: now },
    { id: "P-SUIP-006", source: "SUIP", projectCode: "HZ2026-15", projectName: "常减压改造工程", enterpriseName: "海南炼化", buildUnit: "海南炼化", projectLevel: "一类项目（集团公司级）", projectStage: "试运行阶段", buildType: "迁建", industry: "炼油", createdAt: now, updatedAt: now },
    { id: "P-MANUAL-001", source: "MANUAL", projectCode: "MAN-2026-0001", projectName: "智能物联网平台建设项目", enterpriseName: "专业公司", buildUnit: "智能科技建设有限公司", projectLevel: "二类项目（事业部级）", projectStage: "可研阶段", buildType: "改造", industry: "信息化", createdAt: now, updatedAt: now },
    { id: "P-MANUAL-002", source: "MANUAL", projectCode: "MAN-2026-0002", projectName: "安环监测一体化项目", enterpriseName: "企业安环处", buildUnit: "信息技术中心", projectLevel: "三类项目（企业级）", projectStage: "可研阶段", buildType: "新建", industry: "信息化", createdAt: now, updatedAt: now }
  ];
}

export function ensureThreeSameStores() {
  // TODO(api): app startup can call project query API and SUIP inbound sync API,
  // then hydrate local cache instead of initializing mock data.
  if (!window.localStorage.getItem(PROJECTS_KEY)) {
    writeList(PROJECTS_KEY, buildMockProjects());
  }
  if (!window.localStorage.getItem(TASKS_KEY)) {
    writeList(TASKS_KEY, []);
  }
}

export function listUsers() {
  return mockUsers;
}

export function listProjects(filters = {}) {
  // TODO(api): replace with GET /projects (query by name/code, enterprise, source, stage).
  ensureThreeSameStores();
  const projects = readList(PROJECTS_KEY);
  const nameCode = String(filters.nameCode || "").trim().toLowerCase();
  const enterpriseName = String(filters.enterpriseName || "").trim().toLowerCase();
  const source = String(filters.source || "").trim();
  const stage = String(filters.projectStage || "").trim();

  return projects.filter((item) => {
    if (nameCode) {
      const hit = String(item.projectName || "").toLowerCase().includes(nameCode) || String(item.projectCode || "").toLowerCase().includes(nameCode);
      if (!hit) return false;
    }
    if (enterpriseName && !String(item.enterpriseName || "").toLowerCase().includes(enterpriseName)) return false;
    if (source && source !== "ALL" && item.source !== source) return false;
    if (stage && stage !== "ALL" && item.projectStage !== stage) return false;
    return true;
  });
}

export function getProjectById(projectId) {
  const projects = listProjects();
  return projects.find((item) => item.id === projectId) || null;
}

export function createManualProject(input) {
  // TODO(api): replace with POST /projects/manual.
  const projects = listProjects();
  const now = nowIso();
  const nextId = `P-MANUAL-${String(projects.filter((item) => item.source === "MANUAL").length + 1).padStart(3, "0")}`;
  const code = String(input.projectCode || "").trim() || nextManualCode(projects);
  const project = {
    id: nextId,
    source: "MANUAL",
    projectCode: code,
    projectName: String(input.projectName || "").trim(),
    enterpriseName: String(input.enterpriseName || "").trim(),
    buildUnit: String(input.buildUnit || "").trim(),
    projectLevel: String(input.projectLevel || "").trim(),
    projectStage: String(input.projectStage || "").trim(),
    buildType: String(input.buildType || "").trim(),
    industry: String(input.industry || "").trim(),
    createdAt: now,
    updatedAt: now
  };
  writeList(PROJECTS_KEY, [project, ...projects]);
  return project;
}

function nextManualCode(projects) {
  const currentYear = String(yearNow());
  const seq = projects
    .map((item) => String(item.projectCode || ""))
    .filter((code) => code.startsWith(`MAN-${currentYear}-`))
    .map((code) => Number(code.split("-")[2] || 0))
    .filter((num) => Number.isFinite(num));
  const next = (seq.length ? Math.max(...seq) : 0) + 1;
  return `MAN-${currentYear}-${String(next).padStart(4, "0")}`;
}

export function listTasks() {
  // TODO(api): replace with GET /three-same/tasks.
  ensureThreeSameStores();
  return readList(TASKS_KEY);
}

export function getTaskById(taskId) {
  return listTasks().find((item) => item.id === taskId) || null;
}

export function findTaskByProjectId(projectId) {
  return listTasks().find((item) => item.projectId === projectId) || null;
}

export function saveDraftTask(payload) {
  // TODO(api): replace with POST/PUT /three-same/tasks/draft.
  const tasks = listTasks();
  const now = nowIso();
  const taskId = payload.id || `TASK-${Date.now()}`;
  const current = tasks.find((item) => item.id === taskId);
  const nextTask = {
    id: taskId,
    taskNo: current?.taskNo || "",
    projectId: payload.projectId,
    status: "draft",
    createdAt: current?.createdAt || now,
    updatedAt: now,
    taskName: payload.taskName,
    initiatorDept: payload.initiatorDept,
    initiatorName: payload.initiatorName,
    ownerName: payload.ownerName,
    remark: payload.remark || "",
    identify: payload.identify
  };
  const nextTasks = current ? tasks.map((item) => (item.id === taskId ? nextTask : item)) : [nextTask, ...tasks];
  writeList(TASKS_KEY, nextTasks);
  return nextTask;
}

export function submitTask(payload) {
  // TODO(api): replace with POST /three-same/tasks/submit.
  const draft = saveDraftTask(payload);
  const tasks = listTasks();
  const now = nowIso();
  const nextTask = {
    ...draft,
    taskNo: draft.taskNo || nextTaskNo(tasks),
    status: "pending_approval",
    updatedAt: now
  };
  writeList(TASKS_KEY, tasks.map((item) => (item.id === draft.id ? nextTask : item)));
  return nextTask;
}

function nextTaskNo(tasks) {
  const yyyy = String(yearNow());
  const nums = tasks
    .map((item) => String(item.taskNo || ""))
    .filter((code) => code.startsWith(`TS-${yyyy}-`))
    .map((code) => Number(code.split("-")[2] || 0))
    .filter((num) => Number.isFinite(num));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `TS-${yyyy}-${String(next).padStart(4, "0")}`;
}

export function saveTaskNewWorking(data) {
  window.localStorage.setItem(TASK_NEW_WORKING_KEY, JSON.stringify(data || {}));
}

export function loadTaskNewWorking() {
  const raw = window.localStorage.getItem(TASK_NEW_WORKING_KEY);
  if (!raw) return null;
  const parsed = safeJsonParse(raw, null);
  return parsed && typeof parsed === "object" ? parsed : null;
}

export function clearTaskNewWorking() {
  window.localStorage.removeItem(TASK_NEW_WORKING_KEY);
}
