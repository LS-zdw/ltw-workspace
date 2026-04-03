import React from "react";
import { listUsers } from "../lib/three-same-store.js";

const emptyManualForm = {
  projectName: "",
  enterpriseName: "",
  buildUnit: "",
  projectLevel: "",
  projectStage: "",
  buildType: "",
  projectCode: "",
  industry: ""
};

const currentUserProfile = {
  account: "current_user",
  enterpriseName: "海南炼化",
  industry: "炼油"
};

const enterpriseOptions = ["海南炼化", "九江石化", "洛阳石化", "荆门分公司", "茂名分公司"];
const industryOptions = ["石油工程", "炼油", "化工", "销售", "炼化工程", "科研", "其他"];
const emptyPickFilters = {
  keyword: "",
  projectCode: "",
  projectLevel: "",
  projectStage: "",
  buildType: "",
  createdStart: "",
  createdEnd: ""
};

const emptyIdentify = {
  projectType: "",
  specialties: [],
  milestones: {
    designDone: "",
    trialStart: "",
    goLive: "",
    acceptance: ""
  },
  professionalOwners: {
    safeOwner: "",
    healthOwner: "",
    fireOwner: ""
  }
};

const fixedDetailProject = {
  enterpriseName: "海南炼化",
  projectName: "17万吨SBC项目",
  projectCode: "H20018",
  buildUnit: "华东天成工程技术有限公司",
  industry: "炼油",
  projectLevel: "一类项目（集团公司级）",
  projectStage: "可研阶段",
  buildType: "新建",
  createdAt: "2026-03-02"
};

const fixedDetailMilestones = {
  designDone: "2026-03-02",
  goLive: "2026-08-29",
  acceptance: "2026-10-28"
};

const mockProjects = [
  { id: "p1", source: "SUIP", projectCode: "H20018", projectName: "17万吨SBC项目", enterpriseName: "海南炼化", buildUnit: "华东天成工程技术有限公司", projectLevel: "一类项目（集团公司级）", projectStage: "可研阶段", buildType: "新建", industry: "炼油", createdAt: "2026-03-02", updatedAt: "2026-03-02" },
  { id: "p2", source: "SUIP", projectCode: "J20402", projectName: "204泊位苯水路出厂项目", enterpriseName: "九江石化", buildUnit: "中南汇智设计咨询有限公司", projectLevel: "二类项目（事业部级）", projectStage: "可研阶段", buildType: "新建", industry: "销售", createdAt: "2026-03-03", updatedAt: "2026-03-03" },
  { id: "p3", source: "SUIP", projectCode: "LYS033", projectName: "全厂污水系统达标排", enterpriseName: "洛阳石化", buildUnit: "西北恒远工程有限公司", projectLevel: "二类项目（事业部级）", projectStage: "竣工验收阶段", buildType: "改建", industry: "化工", createdAt: "2026-03-04", updatedAt: "2026-03-04" },
  { id: "p4", source: "SUIP", projectCode: "MM2026-01", projectName: "乙烯改造项目", enterpriseName: "茂名分公司", buildUnit: "华南鼎新工程咨询集团有限公司", projectLevel: "二类项目（事业部级）", projectStage: "基础设计阶段", buildType: "改建", industry: "炼化工程", createdAt: "2026-03-05", updatedAt: "2026-03-05" },
  { id: "p5", source: "SUIP", projectCode: "JM2026-08", projectName: "化工罐区优化项目", enterpriseName: "荆门分公司", buildUnit: "联合智建工程股份有限公司", projectLevel: "三类项目（企业级）", projectStage: "可研阶段", buildType: "扩建", industry: "化工", createdAt: "2026-03-06", updatedAt: "2026-03-06" },
  { id: "p6", source: "SUIP", projectCode: "HZ2026-15", projectName: "常减压改造工程", enterpriseName: "海南炼化", buildUnit: "海辰工程设计股份有限公司", projectLevel: "一类项目（集团公司级）", projectStage: "试运行阶段", buildType: "改建", industry: "石油工程", createdAt: "2026-03-07", updatedAt: "2026-03-07" },
  { id: "p7", source: "MANUAL", projectCode: "MAN-2026-0001", projectName: "智能物联网平台建设项目", enterpriseName: "专业公司", buildUnit: "天合工程科技股份有限公司", projectLevel: "二类项目（事业部级）", projectStage: "可研阶段", buildType: "新建", industry: "科研", createdAt: "2026-03-08", updatedAt: "2026-03-08" },
  { id: "p8", source: "MANUAL", projectCode: "MAN-2026-0002", projectName: "安环监测一体化项目", enterpriseName: "企业安环处", buildUnit: "新联工程总承包集团有限公司", projectLevel: "三类项目（企业级）", projectStage: "可研阶段", buildType: "新建", industry: "其他", createdAt: "2026-03-09", updatedAt: "2026-03-09" },
  { id: "p9", source: "SUIP", projectCode: "WH2026-11", projectName: "危险品仓储升级项目", enterpriseName: "海南炼化", buildUnit: "远航建设工程有限公司", projectLevel: "二类项目（事业部级）", projectStage: "基础设计阶段", buildType: "扩建", industry: "销售", createdAt: "2026-03-10", updatedAt: "2026-03-10" },
  { id: "p10", source: "SUIP", projectCode: "LY2026-22", projectName: "动力站节能改造", enterpriseName: "洛阳石化", buildUnit: "卓越工程管理集团有限公司", projectLevel: "三类项目（企业级）", projectStage: "试运行阶段", buildType: "改建", industry: "炼油", createdAt: "2026-03-11", updatedAt: "2026-03-11" }
];

const mockTasks = [
  { id: "t1", projectId: "p1", status: "审批完成", createdAt: "2026-03-12", identify: { projectType: "危化品类", specialties: ["安全", "职卫"], milestones: { designDone: "2026-03-02", trialStart: "2026-05-31", goLive: "2026-08-29", acceptance: "2026-10-28" }, professionalOwners: { safeOwner: "赵明", healthOwner: "陈伟", fireOwner: "" } } },
  { id: "t2", projectId: "p2", status: "审批中", createdAt: "2026-03-13", identify: { projectType: "其他", specialties: ["安全"], milestones: { designDone: "2026-03-03", trialStart: "2026-06-01", goLive: "2026-08-30", acceptance: "2026-10-29" }, professionalOwners: { safeOwner: "王强", healthOwner: "", fireOwner: "" } } },
  { id: "t3", projectId: "p3", status: "审批驳回", createdAt: "2026-03-14", identify: { projectType: "非煤矿山类", specialties: ["消防"], milestones: { designDone: "2026-03-04", trialStart: "2026-06-03", goLive: "2026-09-01", acceptance: "2026-10-31" }, professionalOwners: { safeOwner: "", healthOwner: "", fireOwner: "周岚" } } },
  { id: "t4", projectId: "p4", status: "审批中", createdAt: "2026-03-15", identify: { projectType: "其他", specialties: ["安全", "消防"], milestones: { designDone: "2026-03-05", trialStart: "2026-06-04", goLive: "2026-09-02", acceptance: "2026-11-01" }, professionalOwners: { safeOwner: "刘宁", healthOwner: "", fireOwner: "刘洋" } } },
  { id: "t5", projectId: "p5", status: "审批完成", createdAt: "2026-03-16", identify: { projectType: "危化品类", specialties: ["安全"], milestones: { designDone: "2026-03-06", trialStart: "2026-06-05", goLive: "2026-09-03", acceptance: "2026-11-02" }, professionalOwners: { safeOwner: "李敏", healthOwner: "", fireOwner: "" } } },
  { id: "t6", projectId: "p6", status: "审批中", createdAt: "2026-03-17", identify: { projectType: "其他", specialties: ["职卫"], milestones: { designDone: "2026-03-07", trialStart: "2026-06-06", goLive: "2026-09-04", acceptance: "2026-11-03" }, professionalOwners: { safeOwner: "", healthOwner: "高远", fireOwner: "" } } },
  { id: "t7", projectId: "p7", status: "审批完成", createdAt: "2026-03-18", identify: { projectType: "危化品类", specialties: ["消防"], milestones: { designDone: "2026-03-08", trialStart: "2026-06-07", goLive: "2026-09-05", acceptance: "2026-11-04" }, professionalOwners: { safeOwner: "", healthOwner: "", fireOwner: "马超" } } },
  { id: "t8", projectId: "p8", status: "审批驳回", createdAt: "2026-03-19", identify: { projectType: "其他", specialties: ["安全", "职卫", "消防"], milestones: { designDone: "2026-03-09", trialStart: "2026-06-08", goLive: "2026-09-06", acceptance: "2026-11-05" }, professionalOwners: { safeOwner: "赵明", healthOwner: "陈伟", fireOwner: "周岚" } } },
  { id: "t9", projectId: "p9", status: "审批完成", createdAt: "2026-03-20", identify: { projectType: "非煤矿山类", specialties: ["安全"], milestones: { designDone: "2026-03-10", trialStart: "2026-06-09", goLive: "2026-09-07", acceptance: "2026-11-06" }, professionalOwners: { safeOwner: "王强", healthOwner: "", fireOwner: "" } } },
  { id: "t10", projectId: "p10", status: "审批驳回", createdAt: "2026-03-21", identify: { projectType: "其他", specialties: ["职卫", "消防"], milestones: { designDone: "2026-03-11", trialStart: "2026-06-10", goLive: "2026-09-08", acceptance: "2026-11-07" }, professionalOwners: { safeOwner: "", healthOwner: "高远", fireOwner: "刘洋" } } }
];

function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatDate(value) {
  return String(value || "").slice(0, 10) || "-";
}

function addDays(dateStr, days) {
  const base = toDate(dateStr) || new Date();
  const next = new Date(base.getTime());
  next.setDate(next.getDate() + Number(days || 0));
  return next.toISOString().slice(0, 10);
}

function getMilestoneError(m) {
  const { designDone, trialStart, goLive, acceptance } = m || {};
  if (!designDone || !trialStart || !goLive) return "";
  const d1 = toDate(designDone);
  const d2 = toDate(trialStart);
  const d3 = toDate(goLive);
  const d4 = toDate(acceptance);
  if (!d1 || !d2 || !d3) return "日期格式不正确";
  if (d1 > d2 || d2 > d3) return "日期顺序需满足：设计完成 <= 试运行开始 <= 上线日期";
  if (d4 && d3 > d4) return "日期顺序需满足：上线日期 <= 验收日期（若填写）";
  return "";
}

function statusClass(status) {
  if (status === "审批中") return "stpm-status stpm-status-review";
  if (status === "审批完成") return "stpm-status stpm-status-wait";
  if (status === "审批驳回") return "stpm-status stpm-status-reject";
  return "stpm-status";
}

function projectSearchText(project) {
  return [project.projectCode, project.projectName, project.buildUnit].filter(Boolean).join(" ").toLowerCase();
}

export default function Page() {
  const users = React.useMemo(() => listUsers(), []);
  const [rows, setRows] = React.useState([]);
  const [showCreateEntry, setShowCreateEntry] = React.useState(false);
  const [viewRow, setViewRow] = React.useState(null);
  const [flowRow, setFlowRow] = React.useState(null);
  const [createMode, setCreateMode] = React.useState("origin");
  const [projectRows, setProjectRows] = React.useState([]);
  const [selectedProjectId, setSelectedProjectId] = React.useState("p1");
  const [taskName, setTaskName] = React.useState("");
  const [manualForm, setManualForm] = React.useState(emptyManualForm);
  const [identify, setIdentify] = React.useState(emptyIdentify);
  const [isKeyProject, setIsKeyProject] = React.useState("否");
  const [createErr, setCreateErr] = React.useState("");
  const [pickFiltersForm, setPickFiltersForm] = React.useState(emptyPickFilters);
  const [pickFiltersApplied, setPickFiltersApplied] = React.useState(emptyPickFilters);
  const [ignoredProjectIds, setIgnoredProjectIds] = React.useState(() => new Set());
  const [advancedPage, setAdvancedPage] = React.useState(1);
  const [advancedPageSize, setAdvancedPageSize] = React.useState(10);
  const [mainPage, setMainPage] = React.useState(1);
  const [mainPageSize, setMainPageSize] = React.useState(10);
  const [showPickProjectModal, setShowPickProjectModal] = React.useState(false);
  const [topFiltersForm, setTopFiltersForm] = React.useState({
    projectName: "",
    projectCode: "",
    projectLevel: "",
    projectStage: "",
    specialty: "",
    buildType: "",
    projectType: "",
    taskStatus: "全部",
    isKeyProject: "",
    createdStart: "",
    createdEnd: ""
  });

  const milestoneError = React.useMemo(() => getMilestoneError(identify.milestones), [identify.milestones]);
  const manualCreatedDate = React.useMemo(() => new Date().toISOString().slice(0, 10), []);

  React.useEffect(() => {
    setProjectRows(mockProjects);
    const mapped = mockTasks.map((task, idx) => {
      const project = mockProjects.find((p) => p.id === task.projectId);
      return {
        id: task.id,
        order: idx + 1,
        projectCode: project?.projectCode || "-",
        projectName: project?.projectName || "-",
        enterpriseName: project?.enterpriseName || "-",
        buildOrg: project?.buildUnit || "-",
        projectLevel: project?.projectLevel || "-",
        projectStage: project?.projectStage || "-",
        status: task.status || "-",
        category: (task.identify?.specialties || []).join("、") || "-",
        buildType: project?.buildType || "-",
        projectType: task.identify?.projectType || "-",
        isKeyProject: idx % 2 === 0 ? "是" : "否",
        planStart: task.identify?.milestones?.designDone || "-",
        planEnd: task.identify?.milestones?.goLive || "-",
        acceptanceDate: task.identify?.milestones?.acceptance || "-",
        block: project?.industry || "-",
        createdAt: formatDate(task.createdAt)
      };
    });
    setRows(mapped);
  }, []);

  const selectedProject = React.useMemo(() => projectRows.find((p) => p.id === selectedProjectId) || null, [projectRows, selectedProjectId]);

  React.useEffect(() => {
    if (!showCreateEntry) return;
    setCreateMode("origin");
    setSelectedProjectId("p1");
    setTaskName("");
    setIdentify(emptyIdentify);
    setIsKeyProject("否");
    setCreateErr("");
    setManualForm(emptyManualForm);
    setPickFiltersForm(emptyPickFilters);
    setPickFiltersApplied(emptyPickFilters);
    setAdvancedPage(1);
    setAdvancedPageSize(10);
    setShowPickProjectModal(false);
  }, [showCreateEntry]);

  React.useEffect(() => {
    if (!selectedProject || createMode !== "origin") return;
    const baseDate = formatDate(selectedProject.createdAt);
    setIdentify((prev) => ({
      ...prev,
      milestones: {
        designDone: prev.milestones.designDone || baseDate,
        trialStart: prev.milestones.trialStart || addDays(baseDate, 90),
        goLive: prev.milestones.goLive || addDays(baseDate, 180),
        acceptance: prev.milestones.acceptance || addDays(baseDate, 240)
      }
    }));
  }, [selectedProject, createMode]);

  React.useEffect(() => {
    if (createMode !== "manual") return;
    setManualForm((prev) => ({
      ...prev,
      enterpriseName: prev.enterpriseName || currentUserProfile.enterpriseName,
      industry: prev.industry || currentUserProfile.industry
    }));
  }, [createMode]);

  const levelFilterOptions = React.useMemo(() => Array.from(new Set(projectRows.map((p) => p.projectLevel).filter(Boolean))), [projectRows]);
  const stageFilterOptions = React.useMemo(() => Array.from(new Set(projectRows.map((p) => p.projectStage).filter(Boolean))), [projectRows]);
  const buildTypeFilterOptions = React.useMemo(() => Array.from(new Set(projectRows.map((p) => p.buildType).filter(Boolean))), [projectRows]);

  const displayRows = React.useMemo(() => {
    const q = String(topFiltersForm.projectName || "").trim().toLowerCase();
    const code = String(topFiltersForm.projectCode || "").trim().toLowerCase();
    return rows.filter((r) => {
      if (q && !String(r.projectName || "").toLowerCase().includes(q)) return false;
      if (code && !String(r.projectCode || "").toLowerCase().includes(code)) return false;
      if (topFiltersForm.taskStatus !== "全部" && r.status !== topFiltersForm.taskStatus) return false;
      return true;
    });
  }, [rows, topFiltersForm]);

  const totalMainPages = Math.max(1, Math.ceil(displayRows.length / mainPageSize));
  const mainPageRows = React.useMemo(() => {
    const start = (mainPage - 1) * mainPageSize;
    return displayRows.slice(start, start + mainPageSize);
  }, [displayRows, mainPage, mainPageSize]);

  React.useEffect(() => {
    if (mainPage > totalMainPages) setMainPage(totalMainPages);
  }, [mainPage, totalMainPages]);

  const filteredProjects = React.useMemo(() => {
    const q = String(pickFiltersApplied.keyword || "").trim().toLowerCase();
    const code = String(pickFiltersApplied.projectCode || "").trim().toLowerCase();
    return projectRows.filter((p) => {
      if (ignoredProjectIds.has(p.id)) return false;
      if (q && !projectSearchText(p).includes(q)) return false;
      if (code && !String(p.projectCode || "").toLowerCase().includes(code)) return false;
      if (pickFiltersApplied.projectLevel && p.projectLevel !== pickFiltersApplied.projectLevel) return false;
      if (pickFiltersApplied.projectStage && p.projectStage !== pickFiltersApplied.projectStage) return false;
      if (pickFiltersApplied.buildType && p.buildType !== pickFiltersApplied.buildType) return false;
      const created = formatDate(p.createdAt);
      if (pickFiltersApplied.createdStart && created < pickFiltersApplied.createdStart) return false;
      if (pickFiltersApplied.createdEnd && created > pickFiltersApplied.createdEnd) return false;
      return true;
    });
  }, [projectRows, pickFiltersApplied, ignoredProjectIds]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / advancedPageSize));
  const pageRows = React.useMemo(() => {
    const start = (advancedPage - 1) * advancedPageSize;
    return filteredProjects.slice(start, start + advancedPageSize);
  }, [filteredProjects, advancedPage, advancedPageSize]);

  React.useEffect(() => {
    if (advancedPage > totalPages) setAdvancedPage(totalPages);
  }, [advancedPage, totalPages]);

  const viewTaskDetail = React.useMemo(() => {
    if (!viewRow) return null;
    const task = mockTasks.find((t) => t.id === viewRow.id);
    const project = mockProjects.find((p) => p.id === task?.projectId);
    const info = task?.identify || {};
    const owners = info.professionalOwners || {};
    const ms = info.milestones || {};
    return {
      projectCode: project?.projectCode || "-",
      projectName: project?.projectName || "-",
      enterpriseName: project?.enterpriseName || "-",
      buildUnit: project?.buildUnit || "-",
      industry: project?.industry || "-",
      projectLevel: project?.projectLevel || "-",
      projectStage: project?.projectStage || "-",
      projectStatus: "已创建",
      projectCreatedAt: formatDate(project?.createdAt),
      buildType: project?.buildType || "-",
      isKeyProject: viewRow.isKeyProject || "否",
      taskStatus: viewRow.status || "-",
      projectType: info.projectType || "-",
      specialtyList: info.specialties || [],
      specialties: (info.specialties || []).join("、") || "-",
      safeOwner: owners.safeOwner || "-",
      healthOwner: owners.healthOwner || "-",
      fireOwner: owners.fireOwner || "-",
      designDone: ms.designDone || "-",
      trialStart: ms.trialStart || "-",
      goLive: ms.goLive || "-",
      acceptance: ms.acceptance || "-"
    };
  }, [viewRow]);

  const toggleSpecialty = (value) => {
    setIdentify((prev) => {
      const exists = prev.specialties.includes(value);
      return {
        ...prev,
        specialties: exists ? prev.specialties.filter((s) => s !== value) : [...prev.specialties, value]
      };
    });
  };

  const selectProjectFromPick = (project) => {
    setSelectedProjectId(project.id);
    if (!taskName.trim()) setTaskName(`${project.projectName}-三同时任务`);
  };

  const ignoreProjectInPick = (projectId) => {
    setIgnoredProjectIds((prev) => {
      const next = new Set(prev);
      next.add(projectId);
      return next;
    });
    if (selectedProjectId === projectId) {
      const fallback = projectRows.find((p) => p.id !== projectId && !ignoredProjectIds.has(p.id));
      if (fallback) setSelectedProjectId(fallback.id);
    }
  };

  const onCreateDraftInModal = () => {
    if (createMode === "origin" && !selectedProject) return setCreateErr("请先选择项目");
    if (createMode === "manual") {
      const required = ["projectName", "enterpriseName", "buildUnit", "projectLevel", "projectStage", "buildType"];
      const miss = required.find((k) => !String(manualForm[k] || "").trim());
      if (miss) return setCreateErr("请填写手动新增项目必填字段");
    }

    if (!identify.projectType) return setCreateErr("请选择项目类型");
    if (identify.specialties.length === 0) return setCreateErr("请至少选择1个专业分类");
    if (milestoneError) return setCreateErr(milestoneError);
    if (identify.specialties.includes("安全") && !identify.professionalOwners.safeOwner.trim()) return setCreateErr("已勾选安全，请填写安全负责人");
    if (identify.specialties.includes("职卫") && !identify.professionalOwners.healthOwner.trim()) return setCreateErr("已勾选职卫，请填写职卫负责人");
    if (identify.specialties.includes("消防") && !identify.professionalOwners.fireOwner.trim()) return setCreateErr("已勾选消防，请填写消防负责人");

    setCreateErr("原型模式：当前页面按钮仅演示交互，不新增数据。");
  };

  const mainPagerNumbers = React.useMemo(() => {
    if (totalMainPages <= 5) return Array.from({ length: totalMainPages }, (_, i) => i + 1);
    if (mainPage <= 3) return [1, 2, 3, 4, 5];
    if (mainPage >= totalMainPages - 2) return [totalMainPages - 4, totalMainPages - 3, totalMainPages - 2, totalMainPages - 1, totalMainPages];
    return [mainPage - 2, mainPage - 1, mainPage, mainPage + 1, mainPage + 2];
  }, [mainPage, totalMainPages]);

  return (
    <div className="stack stpm-page">
      <div className="stpm-filter">
        <div className="stpm-filter-row">
          <label className="stpm-item"><span>项目名称：</span><input className="stpm-input" placeholder="请输入项目名称" value={topFiltersForm.projectName} onChange={(e) => setTopFiltersForm((p) => ({ ...p, projectName: e.target.value }))} /></label>
          <label className="stpm-item"><span>项目编码：</span><input className="stpm-input" placeholder="请输入项目编码" value={topFiltersForm.projectCode} onChange={(e) => setTopFiltersForm((p) => ({ ...p, projectCode: e.target.value }))} /></label>
          <label className="stpm-item"><span>项目级别：</span><select className="stpm-input" value={topFiltersForm.projectLevel} onChange={(e) => setTopFiltersForm((p) => ({ ...p, projectLevel: e.target.value }))}><option value="">请选择项目级别</option>{levelFilterOptions.map((it) => <option key={it} value={it}>{it}</option>)}</select></label>
          <label className="stpm-item"><span>项目阶段：</span><select className="stpm-input" value={topFiltersForm.projectStage} onChange={(e) => setTopFiltersForm((p) => ({ ...p, projectStage: e.target.value }))}><option value="">请选择项目阶段</option>{stageFilterOptions.map((it) => <option key={it} value={it}>{it}</option>)}</select></label>
          <label className="stpm-item"><span>专业分类：</span><input className="stpm-input" value={topFiltersForm.specialty} onChange={(e) => setTopFiltersForm((p) => ({ ...p, specialty: e.target.value }))} /></label>
          <label className="stpm-item"><span>建设类型：</span><select className="stpm-input" value={topFiltersForm.buildType} onChange={(e) => setTopFiltersForm((p) => ({ ...p, buildType: e.target.value }))}><option value="">请选择建设类型</option>{buildTypeFilterOptions.map((it) => <option key={it} value={it}>{it}</option>)}</select></label>
          <label className="stpm-item"><span>项目类型：</span><select className="stpm-input" value={topFiltersForm.projectType} onChange={(e) => setTopFiltersForm((p) => ({ ...p, projectType: e.target.value }))}><option value="">请选择项目类型</option><option value="危化品类">危化品类</option><option value="非煤矿山类">非煤矿山类</option><option value="其他">其他</option></select></label>
        </div>
        <div className="stpm-filter-row">
          <label className="stpm-item"><span>任务状态：</span><select className="stpm-input" value={topFiltersForm.taskStatus} onChange={(e) => setTopFiltersForm((p) => ({ ...p, taskStatus: e.target.value }))}><option>全部</option><option>审批中</option><option>审批完成</option><option>审批驳回</option></select></label>
          <label className="stpm-item"><span>是否重点建设工程项目：</span><select className="stpm-input" value={topFiltersForm.isKeyProject} onChange={(e) => setTopFiltersForm((p) => ({ ...p, isKeyProject: e.target.value }))}><option value="">请选择是否重点工程</option><option value="是">是</option><option value="否">否</option></select></label>
          <label className="stpm-item stpm-range-item"><span>项目创建日期：</span><div className="stpm-range"><input className="stpm-input" type="text" value={topFiltersForm.createdStart} onChange={(e) => setTopFiltersForm((p) => ({ ...p, createdStart: e.target.value }))} /><span>至</span><input className="stpm-input" type="text" value={topFiltersForm.createdEnd} onChange={(e) => setTopFiltersForm((p) => ({ ...p, createdEnd: e.target.value }))} /></div></label>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button type="button" className="btn btn-primary" onClick={() => {}}>查询</button>
            <button type="button" className="btn" onClick={() => {}}>重置</button>
            <button type="button" className="btn btn-primary stpm-export-btn" onClick={() => {}}>导出</button>
            <button type="button" className="btn btn-primary stpm-export-btn" onClick={() => setShowCreateEntry(true)}>创建任务</button>
          </div>
        </div>
      </div>

      <div className="table-wrap stpm-table-wrap">
        <table className="proto-table stpm-main-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>项目名称</th><th>项目级别</th><th>项目建设单位</th><th>项目阶段</th><th>是否重点建设工程项目</th><th>任务状态</th><th>专业分类</th><th>建设类型</th><th>项目类型</th><th>计划开工日期</th><th>计划完工日期</th><th>所属版块</th><th>项目创建日期</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            {mainPageRows.map((row) => (
              <tr key={row.id}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.order}</td><td>{row.projectName}</td><td>{row.projectLevel}</td><td>{row.buildOrg}</td><td>{row.projectStage}</td><td>{row.isKeyProject}</td>
                <td><span className={statusClass(row.status)}>{row.status}</span></td>
                <td>{row.category}</td><td>{row.buildType}</td><td>{row.projectType}</td><td>{row.planStart}</td><td>{row.planEnd}</td><td>{row.block}</td><td>{row.createdAt}</td>
                <td><div style={{ display: "flex", gap: 8, alignItems: "center" }}><button type="button" className="table-link-btn" onClick={() => { if (row.order === 1) setViewRow(row); }}>查看</button><button type="button" className="table-link-btn" onClick={() => { if (row.order === 1) setFlowRow(row); }}>审批流程</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stpm-main-pager">
        <div className="stpm-main-pager-total">共 {displayRows.length} 条记录 第 {mainPage} / {totalMainPages} 页</div>
        <div className="stpm-main-pager-controls">
          <button type="button" className="stpm-main-page-btn" disabled={mainPage <= 1} onClick={() => setMainPage((p) => Math.max(1, p - 1))}>‹</button>
          {mainPagerNumbers[0] > 1 ? <button type="button" className="stpm-main-page-btn" onClick={() => setMainPage(1)}>1</button> : null}
          {mainPagerNumbers[0] > 2 ? <span className="stpm-main-page-ellipsis">…</span> : null}
          {mainPagerNumbers.map((n) => (
            <button key={n} type="button" className={`stpm-main-page-btn${n === mainPage ? " active" : ""}`} onClick={() => setMainPage(n)}>
              {n}
            </button>
          ))}
          {mainPagerNumbers[mainPagerNumbers.length - 1] < totalMainPages - 1 ? <span className="stpm-main-page-ellipsis">…</span> : null}
          {mainPagerNumbers[mainPagerNumbers.length - 1] < totalMainPages ? <button type="button" className="stpm-main-page-btn" onClick={() => setMainPage(totalMainPages)}>{totalMainPages}</button> : null}
          <button type="button" className="stpm-main-page-btn" disabled={mainPage >= totalMainPages} onClick={() => setMainPage((p) => Math.min(totalMainPages, p + 1))}>›</button>
          <select className="stpm-main-page-size" value={mainPageSize} onChange={(e) => { setMainPageSize(Number(e.target.value)); setMainPage(1); }}>
            <option value={10}>10条/页</option>
            <option value={20}>20条/页</option>
            <option value={50}>50条/页</option>
          </select>
        </div>
      </div>

      {showCreateEntry ? (
        <div className="modal-mask" onClick={() => setShowCreateEntry(false)}>
          <div className="modal modal-xl stpm-create-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div><div className="modal-title">创建识别</div></div><button type="button" className="modal-close" onClick={() => setShowCreateEntry(false)}>×</button></div>
            <div className="modal-bd detail">
              <div className="detail-section mt-10" style={{ margin: 0 }}>
                <div className="stpm-create-grid">
                  <div className="stpm-create-item stpm-create-item-wide">
                    <div className="stpm-create-key">项目来源</div>
                    <div className="stpm-create-val stpm-yesno">
                      <label><input type="radio" checked={createMode === "origin"} onChange={() => setCreateMode("origin")} /> 从项目信息管理选择</label>
                      <label><input type="radio" checked={createMode === "manual"} onChange={() => setCreateMode("manual")} /> 手动新增项目</label>
                    </div>
                  </div>
                </div>
              </div>
              {createMode === "origin" ? (
                <>
                  <div className="detail-section mt-10" style={{ margin: 0 }}>
                    <div className="detail-section-title">项目选择</div>
                    <div className="stpm-create-grid">
                      <div className="stpm-create-item stpm-create-item-wide">
                        <div className="stpm-create-key"><span className="required-mark">*</span>已选项目</div>
                        <div className="stpm-create-val" style={{ display: "flex", gap: 8 }}>
                          <input className="filterbar-control stpm-integrated-control" value={`${fixedDetailProject.projectCode} / ${fixedDetailProject.projectName}`} disabled />
                          <button type="button" className="btn btn-primary stpm-pick-project-btn" onClick={() => setShowPickProjectModal(true)}>选择项目</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedProject ? (
                    <>
                      <div className="detail-section mt-10" style={{ margin: 0 }}>
                        <div className="detail-section-title">项目基本信息</div>
                        <div className="stpm-create-grid">
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>所属企业</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.enterpriseName} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目名称</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.projectName} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目编码</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.projectCode} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目建设单位</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.buildUnit} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>所属板块</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.industry} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目级别</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.projectLevel} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目状态</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value="已创建" disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目创建日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.createdAt} disabled /></div></div>
                        </div>
                      </div>
                      <div className="detail-section mt-10" style={{ marginBottom: 0 }}>
                        <div className="detail-section-title">项目建设信息</div>
                        <div className="stpm-create-grid">
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划开工日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" type="text" value={fixedDetailMilestones.designDone} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划完工日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" type="text" value={fixedDetailMilestones.goLive} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划投产日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" type="text" value={fixedDetailMilestones.acceptance} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>建设类型</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.buildType} disabled /></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>是否重点工程建设项目</div><div className="stpm-create-val stpm-yesno"><label><input type="radio" checked={isKeyProject === "是"} onChange={() => setIsKeyProject("是")} /> 是</label><label><input type="radio" checked={isKeyProject === "否"} onChange={() => setIsKeyProject("否")} /> 否</label></div></div>
                          <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目阶段</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={fixedDetailProject.projectStage} disabled /></div></div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="detail-section mt-10" style={{ margin: 0 }}>
                    <div className="detail-section-title">项目基本信息</div>
                    <div className="stpm-create-grid">
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>所属企业</div><div className="stpm-create-val"><select className="filterbar-control" value={manualForm.enterpriseName} onChange={(e) => setManualForm((p) => ({ ...p, enterpriseName: e.target.value }))}><option value="">请选择所属企业</option>{enterpriseOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目名称</div><div className="stpm-create-val"><input className="filterbar-control" value={manualForm.projectName} onChange={(e) => { const value = e.target.value; setManualForm((p) => ({ ...p, projectName: value })); if (!taskName.trim()) setTaskName(`${value}-三同时任务`); }} /></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key">项目编码</div><div className="stpm-create-val"><input className="filterbar-control" value={manualForm.projectCode} onChange={(e) => setManualForm((p) => ({ ...p, projectCode: e.target.value }))} placeholder="不填自动生成" /></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目建设单位</div><div className="stpm-create-val"><input className="filterbar-control" value={manualForm.buildUnit} onChange={(e) => setManualForm((p) => ({ ...p, buildUnit: e.target.value }))} /></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>所属板块</div><div className="stpm-create-val"><select className="filterbar-control" value={manualForm.industry} onChange={(e) => setManualForm((p) => ({ ...p, industry: e.target.value }))}><option value="">请选择所属板块</option>{industryOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目级别</div><div className="stpm-create-val"><select className="filterbar-control" value={manualForm.projectLevel} onChange={(e) => setManualForm((p) => ({ ...p, projectLevel: e.target.value }))}><option value="">请选择项目级别</option><option value="一类项目（集团公司级）">一类项目（集团公司级）</option><option value="二类项目（企业级）">二类项目（企业级）</option><option value="三类项目（企业级）">三类项目（企业级）</option></select></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目状态</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value="已创建" disabled /></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目创建日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={manualCreatedDate} disabled /></div></div>
                    </div>
                  </div>
                  <div className="detail-section mt-10" style={{ marginBottom: 0 }}>
                    <div className="detail-section-title">项目建设信息</div>
                    <div className="stpm-create-grid">
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划开工日期</div><div className="stpm-create-val"><input className="filterbar-control" type="text" value={identify.milestones.designDone} onChange={(e) => setIdentify((p) => ({ ...p, milestones: { ...p.milestones, designDone: e.target.value } }))} /></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划完工日期</div><div className="stpm-create-val"><input className="filterbar-control" type="text" value={identify.milestones.goLive} onChange={(e) => setIdentify((p) => ({ ...p, milestones: { ...p.milestones, goLive: e.target.value } }))} /></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划投产日期</div><div className="stpm-create-val"><input className="filterbar-control" type="text" value={identify.milestones.acceptance} onChange={(e) => setIdentify((p) => ({ ...p, milestones: { ...p.milestones, acceptance: e.target.value } }))} /></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>建设类型</div><div className="stpm-create-val"><select className="filterbar-control" value={manualForm.buildType} onChange={(e) => setManualForm((p) => ({ ...p, buildType: e.target.value }))}><option value="">请选择建设类型</option><option value="新建">新建</option><option value="扩建">扩建</option><option value="改建">改建</option><option value="迁建">迁建</option></select></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>是否重点工程建设项目</div><div className="stpm-create-val stpm-yesno"><label><input type="radio" checked={isKeyProject === "是"} onChange={() => setIsKeyProject("是")} /> 是</label><label><input type="radio" checked={isKeyProject === "否"} onChange={() => setIsKeyProject("否")} /> 否</label></div></div>
                      <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目阶段</div><div className="stpm-create-val"><select className="filterbar-control" value={manualForm.projectStage} onChange={(e) => setManualForm((p) => ({ ...p, projectStage: e.target.value }))}><option value="">请选择项目阶段</option><option value="可研阶段">可研阶段</option><option value="基础设计阶段">基础设计阶段</option><option value="试运行阶段">试运行阶段</option><option value="竣工验收阶段">竣工验收阶段</option></select></div></div>
                    </div>
                  </div>
                </>
              )}

              <div className="detail-section mt-10">
                <div className="detail-section-title">创建识别信息</div>
                <div className="stpm-create-grid">
                  <div className="stpm-create-item stpm-create-item-wide"><div className="stpm-create-key"><span className="required-mark">*</span>项目类型</div><div className="stpm-create-val"><select className="filterbar-control" value={identify.projectType} onChange={(e) => setIdentify((p) => ({ ...p, projectType: e.target.value }))}><option value="">请选择项目类型</option><option value="危化品类">危化品类</option><option value="非煤矿山类">非煤矿山类</option><option value="其他">其他</option></select></div></div>
                  <div className="stpm-create-item stpm-create-item-wide"><div className="stpm-create-key"><span className="required-mark">*</span>专业分类</div><div className="stpm-create-val stpm-multi"><label><input type="checkbox" checked={identify.specialties.includes("安全")} onChange={() => toggleSpecialty("安全")} /> 安全</label><label><input type="checkbox" checked={identify.specialties.includes("职卫")} onChange={() => toggleSpecialty("职卫")} /> 职卫</label><label><input type="checkbox" checked={identify.specialties.includes("消防")} onChange={() => toggleSpecialty("消防")} /> 消防</label></div></div>
                  {identify.specialties.includes("安全") ? <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>安全负责人</div><div className="stpm-create-val"><select className="filterbar-control" value={identify.professionalOwners.safeOwner} onChange={(e) => setIdentify((p) => ({ ...p, professionalOwners: { ...p.professionalOwners, safeOwner: e.target.value } }))}><option value="">请选择</option>{users.map((u) => <option key={`safe-${u}`} value={u}>{u}</option>)}</select></div></div> : null}
                  {identify.specialties.includes("职卫") ? <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>职卫负责人</div><div className="stpm-create-val"><select className="filterbar-control" value={identify.professionalOwners.healthOwner} onChange={(e) => setIdentify((p) => ({ ...p, professionalOwners: { ...p.professionalOwners, healthOwner: e.target.value } }))}><option value="">请选择</option>{users.map((u) => <option key={`health-${u}`} value={u}>{u}</option>)}</select></div></div> : null}
                  {identify.specialties.includes("消防") ? <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>消防负责人</div><div className="stpm-create-val"><select className="filterbar-control" value={identify.professionalOwners.fireOwner} onChange={(e) => setIdentify((p) => ({ ...p, professionalOwners: { ...p.professionalOwners, fireOwner: e.target.value } }))}><option value="">请选择</option>{users.map((u) => <option key={`fire-${u}`} value={u}>{u}</option>)}</select></div></div> : null}
                  <div className="stpm-create-item"><div className="stpm-create-key">可研阶段完成日期</div><div className="stpm-create-val"><input className="filterbar-control" type="text" value={identify.milestones.designDone} onChange={(e) => setIdentify((p) => ({ ...p, milestones: { ...p.milestones, designDone: e.target.value } }))} /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">基础设计完成阶段日期</div><div className="stpm-create-val"><input className="filterbar-control" type="text" value={identify.milestones.trialStart} onChange={(e) => setIdentify((p) => ({ ...p, milestones: { ...p.milestones, trialStart: e.target.value } }))} /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">试运行阶段完成日期</div><div className="stpm-create-val"><input className="filterbar-control" type="text" value={identify.milestones.goLive} onChange={(e) => setIdentify((p) => ({ ...p, milestones: { ...p.milestones, goLive: e.target.value } }))} /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">竣工验收阶段完成日期</div><div className="stpm-create-val"><input className="filterbar-control" type="text" value={identify.milestones.acceptance} onChange={(e) => setIdentify((p) => ({ ...p, milestones: { ...p.milestones, acceptance: e.target.value } }))} /></div></div>
                </div>
              </div>

              {milestoneError ? <div className="pill mt-10"><div className="v" style={{ color: "#c62828", fontWeight: 700 }}>{milestoneError}</div></div> : null}
              {createErr ? <div className="pill mt-10"><div className="v" style={{ color: "#c62828", fontWeight: 700 }}>{createErr}</div></div> : null}
            </div>
            <div className="modal-ft"><button type="button" className="btn" onClick={() => setShowCreateEntry(false)}>关闭</button><button type="button" className="btn btn-primary" onClick={onCreateDraftInModal} disabled={!!milestoneError}>创建任务</button></div>
          </div>
        </div>
      ) : null}

      {flowRow ? (
        <div className="modal-mask" onClick={() => setFlowRow(null)}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div><div className="modal-title">审批流程</div><div className="modal-desc">{flowRow.projectName}</div></div><button type="button" className="modal-close" onClick={() => setFlowRow(null)}>×</button></div>
            <div className="modal-bd detail"><div className="detail-section"><div className="detail-section-title">流程节点</div><div className="table-wrap"><table className="proto-table"><thead><tr><th>序号</th><th>节点</th><th>处理人</th><th>状态</th><th>处理时间</th><th>意见</th></tr></thead><tbody><tr><td>1</td><td>发起申请</td><td>张海川</td><td>已完成</td><td>2026-03-12 09:30:00</td><td>提交任务</td></tr><tr><td>2</td><td>科室负责人审批</td><td>王强</td><td>已完成</td><td>2026-03-12 14:20:00</td><td>同意</td></tr><tr><td>3</td><td>安环分管审批</td><td>李敏</td><td>审批中</td><td>-</td><td>-</td></tr></tbody></table></div></div></div>
            <div className="modal-ft"><button type="button" className="btn" onClick={() => setFlowRow(null)}>关闭</button></div>
          </div>
        </div>
      ) : null}

      {showCreateEntry && showPickProjectModal ? (
        <div className="modal-mask" onClick={() => setShowPickProjectModal(false)}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div><div className="modal-title">项目选择</div></div><button type="button" className="modal-close" onClick={() => setShowPickProjectModal(false)}>×</button></div>
            <div className="modal-bd detail">
              <div className="detail-section" style={{ margin: 0 }}>
                <div className="detail-section-title">项目列表</div>
                <div className="stpm-create-grid">
                  <div className="stpm-create-item stpm-create-item-wide"><div className="stpm-create-key">项目检索</div><div className="stpm-create-val"><input className="filterbar-control" value={pickFiltersForm.keyword} placeholder="输入项目编码/项目名称/建设单位" onChange={(e) => setPickFiltersForm((p) => ({ ...p, keyword: e.target.value }))} /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">项目编码</div><div className="stpm-create-val"><input className="filterbar-control" value={pickFiltersForm.projectCode || ""} onChange={(e) => setPickFiltersForm((p) => ({ ...p, projectCode: e.target.value }))} /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">项目级别</div><div className="stpm-create-val"><select className="filterbar-control" value={pickFiltersForm.projectLevel} onChange={(e) => setPickFiltersForm((p) => ({ ...p, projectLevel: e.target.value }))}><option value="">全部</option>{levelFilterOptions.map((it) => <option key={it} value={it}>{it}</option>)}</select></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">项目阶段</div><div className="stpm-create-val"><select className="filterbar-control" value={pickFiltersForm.projectStage} onChange={(e) => setPickFiltersForm((p) => ({ ...p, projectStage: e.target.value }))}><option value="">全部</option>{stageFilterOptions.map((it) => <option key={it} value={it}>{it}</option>)}</select></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">建设类型</div><div className="stpm-create-val"><select className="filterbar-control" value={pickFiltersForm.buildType} onChange={(e) => setPickFiltersForm((p) => ({ ...p, buildType: e.target.value }))}><option value="">全部</option>{buildTypeFilterOptions.map((it) => <option key={it} value={it}>{it}</option>)}</select></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key">项目创建日期</div><div className="stpm-create-val" style={{ display: "flex", gap: 8, alignItems: "center" }}><input className="filterbar-control" type="text" value={pickFiltersForm.createdStart} onChange={(e) => setPickFiltersForm((p) => ({ ...p, createdStart: e.target.value }))} /><span>至</span><input className="filterbar-control" type="text" value={pickFiltersForm.createdEnd} onChange={(e) => setPickFiltersForm((p) => ({ ...p, createdEnd: e.target.value }))} /></div></div>
                  <div className="stpm-create-item stpm-create-item-wide"><div className="stpm-create-key" /><div className="stpm-create-val" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><button type="button" className="btn btn-primary" onClick={() => { setPickFiltersApplied(pickFiltersForm); setAdvancedPage(1); }}>查询</button><button type="button" className="btn" onClick={() => { setPickFiltersForm(emptyPickFilters); setPickFiltersApplied(emptyPickFilters); setAdvancedPage(1); }}>重置</button></div></div>
                </div>
                <div className="table-wrap mt-10"><table className="proto-table"><thead><tr><th style={{ width: 64 }}>选择</th><th>项目编码</th><th>项目名称</th><th>项目级别</th><th>建设单位</th><th>项目阶段</th><th>项目创建日期</th><th style={{ width: 110 }}>操作</th></tr></thead><tbody>{pageRows.map((project) => (<tr key={project.id} style={{ background: selectedProjectId === project.id ? "#f3f4f6" : undefined }}><td><input type="radio" checked={selectedProjectId === project.id} onChange={() => selectProjectFromPick(project)} /></td><td>{project.projectCode}</td><td>{project.projectName}</td><td>{project.projectLevel}</td><td>{project.buildUnit}</td><td>{project.projectStage}</td><td>{formatDate(project.createdAt)}</td><td><button type="button" className="btn" onClick={() => ignoreProjectInPick(project.id)}>忽略此项目</button></td></tr>))}</tbody></table></div>
                <div className="mt-10" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ color: "#8c8c8c", fontSize: 14 }}>共 {filteredProjects.length} 条记录 第 {advancedPage} / {totalPages} 页</div><div style={{ display: "flex", alignItems: "center", gap: 8 }}><button type="button" className="btn" disabled={advancedPage <= 1} onClick={() => setAdvancedPage((p) => Math.max(1, p - 1))}>上一页</button><button type="button" className="btn" disabled={advancedPage >= totalPages} onClick={() => setAdvancedPage((p) => Math.min(totalPages, p + 1))}>下一页</button><select className="filterbar-control" style={{ width: 96, height: 28 }} value={advancedPageSize} onChange={(e) => { setAdvancedPageSize(Number(e.target.value)); setAdvancedPage(1); }}><option value={10}>10条/页</option><option value={20}>20条/页</option><option value={50}>50条/页</option></select></div></div>
              </div>
            </div>
            <div className="modal-ft"><button type="button" className="btn" onClick={() => setShowPickProjectModal(false)}>取消</button><button type="button" className="btn btn-primary" onClick={() => setShowPickProjectModal(false)}>确定</button></div>
          </div>
        </div>
      ) : null}

      {viewRow ? (
        <div className="modal-mask" onClick={() => setViewRow(null)}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div><div className="modal-title">任务详情</div><div className="modal-desc">{viewRow.projectName}<span style={{ marginLeft: 10 }} className={statusClass(viewRow.status)}>{viewRow.status}</span></div></div><button type="button" className="modal-close" onClick={() => setViewRow(null)}>×</button></div>
            <div className="modal-bd detail">
              <div className="detail-section" style={{ margin: 0 }}>
                <div className="detail-section-title">项目基本信息</div>
                <div className="stpm-create-grid">
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>所属企业</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.enterpriseName || "-"} disabled /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目名称</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.projectName || "-"} disabled /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目编码</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.projectCode || "-"} disabled /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目建设单位</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.buildUnit || "-"} disabled /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>所属板块</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.industry || "-"} disabled /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目级别</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.projectLevel || "-"} disabled /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目状态</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.projectStatus || "-"} disabled /></div></div>
                  <div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目创建日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.projectCreatedAt || "-"} disabled /></div></div>
                </div>
              </div>
              <div className="detail-section"><div className="detail-section-title">项目建设信息</div><div className="stpm-create-grid"><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划开工日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.designDone || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划完工日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.goLive || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>计划投产日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.acceptance || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>建设类型</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.buildType || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>是否重点工程建设项目</div><div className="stpm-create-val stpm-yesno"><label><input type="radio" checked={viewTaskDetail?.isKeyProject === "是"} disabled /> 是</label><label><input type="radio" checked={viewTaskDetail?.isKeyProject !== "是"} disabled /> 否</label></div></div><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目阶段</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.projectStage || "-"} disabled /></div></div></div></div>
              <div className="detail-section"><div className="detail-section-title">创建识别信息</div><div className="stpm-create-grid"><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>任务状态</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.taskStatus || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>项目类型</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.projectType || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key"><span className="required-mark">*</span>专业分类</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.specialties || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">任务创建日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewRow.createdAt || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">{viewTaskDetail?.specialtyList?.includes("安全") ? <span className="required-mark">*</span> : null}安全负责人</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.safeOwner || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">{viewTaskDetail?.specialtyList?.includes("职卫") ? <span className="required-mark">*</span> : null}职卫负责人</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.healthOwner || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">{viewTaskDetail?.specialtyList?.includes("消防") ? <span className="required-mark">*</span> : null}消防负责人</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.fireOwner || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">可研阶段完成日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.designDone || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">基础设计完成阶段日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.trialStart || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">试运行阶段完成日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.goLive || "-"} disabled /></div></div><div className="stpm-create-item"><div className="stpm-create-key">竣工验收阶段完成日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={viewTaskDetail?.acceptance || "-"} disabled /></div></div></div></div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
