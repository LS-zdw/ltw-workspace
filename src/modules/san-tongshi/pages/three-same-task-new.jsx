import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ensureThreeSameStores,
  listProjects,
  listUsers,
  createManualProject,
  findTaskByProjectId,
  getProjectById,
  getTaskById,
  saveDraftTask,
  submitTask,
  saveTaskNewWorking,
  loadTaskNewWorking,
  clearTaskNewWorking
} from "../lib/three-same-store.js";

const modeOptions = [
  { value: "select", label: "从项目库选择（推荐）" },
  { value: "manual", label: "手动新增项目" }
];

const emptyManualForm = {
  projectCode: "",
  projectName: "",
  enterpriseName: "",
  buildUnit: "",
  projectLevel: "",
  projectStage: "",
  buildType: "",
  industry: ""
};

const emptyTaskForm = {
  taskName: "",
  initiatorDept: "企业安环处",
  initiatorName: "当前用户",
  ownerName: "",
  remark: ""
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
  },
  dataClerk: ""
};

function toDate(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function getMilestoneError(milestones) {
  const { designDone, trialStart, goLive, acceptance } = milestones || {};
  if (!designDone || !trialStart || !goLive) return "";
  const d1 = toDate(designDone);
  const d2 = toDate(trialStart);
  const d3 = toDate(goLive);
  const d4 = toDate(acceptance);
  if (!d1 || !d2 || !d3) return "日期格式不正确";
  if (d1 > d2 || d2 > d3) return "日期顺序需满足：设计完成 <= 试运行开始 <= 上线";
  if (d4 && d3 > d4) return "日期顺序需满足：上线 <= 验收（若填写）";
  return "";
}

export default function Page() {
  const navigate = useNavigate();
  const [mode, setMode] = React.useState("select");
  const [projectFilters, setProjectFilters] = React.useState({
    nameCode: "",
    enterpriseName: "",
    source: "ALL",
    projectStage: "ALL"
  });
  const [projectRows, setProjectRows] = React.useState([]);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [existingTask, setExistingTask] = React.useState(null);
  const [draftTaskId, setDraftTaskId] = React.useState("");
  const [manualProjectForm, setManualProjectForm] = React.useState(emptyManualForm);
  const [taskForm, setTaskForm] = React.useState(emptyTaskForm);
  const [identify, setIdentify] = React.useState(emptyIdentify);
  const [errorMsg, setErrorMsg] = React.useState("");
  const users = React.useMemo(() => listUsers(), []);
  const milestoneError = React.useMemo(() => getMilestoneError(identify.milestones), [identify.milestones]);

  // TODO(api): replace with backend project query API.
  const reloadProjects = React.useCallback(() => {
    ensureThreeSameStores();
    setProjectRows(listProjects(projectFilters));
  }, [projectFilters]);

  React.useEffect(() => {
    reloadProjects();
  }, [reloadProjects]);

  React.useEffect(() => {
    const working = loadTaskNewWorking();
    if (!working) return;
    if (working.mode) setMode(working.mode);
    if (working.projectFilters) setProjectFilters(working.projectFilters);
    if (working.manualProjectForm) setManualProjectForm(working.manualProjectForm);
    if (working.taskForm) setTaskForm(working.taskForm);
    if (working.identify) setIdentify(working.identify);

    if (working.taskId) {
      setDraftTaskId(String(working.taskId));
      const draftTask = getTaskById(String(working.taskId));
      if (draftTask?.projectId) {
        const project = getProjectById(draftTask.projectId);
        if (project) {
          setSelectedProject(project);
          if (working.taskForm) {
            setTaskForm(working.taskForm);
          } else {
            setTaskForm({
              taskName: draftTask.taskName || "",
              initiatorDept: draftTask.initiatorDept || "企业安环处",
              initiatorName: draftTask.initiatorName || "当前用户",
              ownerName: draftTask.ownerName || "",
              remark: draftTask.remark || ""
            });
          }
          if (!working.identify && draftTask.identify) setIdentify(draftTask.identify);
          return;
        }
      }
    }

    if (working.selectedProject?.id) {
      const project = getProjectById(working.selectedProject.id) || working.selectedProject;
      setSelectedProject(project);
    }
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modeFromQuery = params.get("mode");
    const projectName = String(params.get("projectName") || "").trim();
    if (modeFromQuery === "manual") {
      setMode("manual");
    }
    if (projectName) {
      const matched = listProjects().find((item) => item.projectName === projectName);
      if (matched) {
        setSelectedProject(matched);
        setMode("select");
      }
    }
  }, []);

  React.useEffect(() => {
    if (!selectedProject) {
      setExistingTask(null);
      return;
    }
    const task = findTaskByProjectId(selectedProject.id);
    setExistingTask(task || null);
    if (!task && !taskForm.taskName) {
      setTaskForm((prev) => ({ ...prev, taskName: `${selectedProject.projectName}-三同时任务` }));
    }
  }, [selectedProject, taskForm.taskName]);

  React.useEffect(() => {
    saveTaskNewWorking({
      mode,
      projectFilters,
      selectedProject,
      manualProjectForm,
      taskForm,
      identify,
      taskId: draftTaskId
    });
  }, [mode, projectFilters, selectedProject, manualProjectForm, taskForm, identify, draftTaskId]);

  const toggleSpecialty = (name) => {
    setIdentify((prev) => {
      const exists = prev.specialties.includes(name);
      const specialties = exists
        ? prev.specialties.filter((item) => item !== name)
        : [...prev.specialties, name];
      return { ...prev, specialties };
    });
  };

  const validateDraft = () => {
    if (!selectedProject) return "请先选择项目";
    if (!taskForm.taskName.trim()) return "任务名称不能为空";
    if (!taskForm.ownerName.trim()) return "三同时负责人不能为空";
    return "";
  };

  const validateFull = () => {
    const draftErr = validateDraft();
    if (draftErr) return draftErr;
    if (!identify.projectType) return "项目类型识别不能为空";
    if (identify.specialties.length === 0) return "至少勾选一个三同时专业分类";

    const { designDone, trialStart, goLive } = identify.milestones;
    if (!designDone || !trialStart || !goLive) return "设计/试运行/上线日期不能为空";
    if (milestoneError) return milestoneError;

    if (identify.specialties.includes("安全") && !identify.professionalOwners.safeOwner.trim()) return "已勾选安全，请填写安全负责人";
    if (identify.specialties.includes("职卫") && !identify.professionalOwners.healthOwner.trim()) return "已勾选职卫，请填写职卫负责人";
    if (identify.specialties.includes("消防") && !identify.professionalOwners.fireOwner.trim()) return "已勾选消防，请填写消防负责人";

    return "";
  };

  const currentPayload = () => ({
    id: draftTaskId || undefined,
    projectId: selectedProject?.id || "",
    taskName: taskForm.taskName.trim(),
    initiatorDept: taskForm.initiatorDept.trim(),
    initiatorName: taskForm.initiatorName.trim(),
    ownerName: taskForm.ownerName.trim(),
    remark: taskForm.remark.trim(),
    identify
  });

  const onSaveDraft = () => {
    const err = validateDraft();
    setErrorMsg(err);
    if (err) return;
    // TODO(api): replace with backend draft save API.
    const saved = saveDraftTask(currentPayload());
    setDraftTaskId(saved.id);
    setErrorMsg("草稿保存成功");
  };

  const onSubmit = () => {
    const err = validateFull();
    setErrorMsg(err);
    if (err) return;
    // TODO(api): replace with backend create-task API.
    const submitted = submitTask(currentPayload());
    clearTaskNewWorking();
    navigate(`/three-same/task/${submitted.id}`);
  };

  const addManualProjectAndSelect = () => {
    const required = ["projectName", "enterpriseName", "buildUnit", "projectLevel", "projectStage", "buildType"];
    const miss = required.find((key) => !String(manualProjectForm[key] || "").trim());
    if (miss) {
      setErrorMsg("请完整填写手动新增项目必填字段");
      return;
    }
    // TODO(api): replace with backend manual project create API.
    const project = createManualProject(manualProjectForm);
    setSelectedProject(project);
    setMode("select");
    reloadProjects();
    setErrorMsg("");
  };

  const duplicatedBlocked = !!(selectedProject && existingTask && existingTask.id !== draftTaskId);
  const submitDisabled = duplicatedBlocked || !!milestoneError;

  return (
    <div className="stack">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">三同时任务创建与识别</div>
            <div className="card-desc">选择项目来源，完成识别信息后提交至待审批</div>
          </div>
        </div>
        <div className="card-bd">
          <div className="filterbar">
            <div className="filterbar-row">
              <div className="filterbar-left">
                <div className="filterbar-item">
                  <div className="filterbar-label">项目来源</div>
                  <div className="filterbar-input stpm-multi">
                    {modeOptions.map((item) => (
                      <label key={item.value}>
                        <input type="radio" checked={mode === item.value} onChange={() => setMode(item.value)} /> {item.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {mode === "select" ? (
            <div className="card mt-10">
              <div className="card-hd">
                <div className="card-title">从项目库选择</div>
              </div>
              <div className="card-bd">
                <div className="filterbar">
                  <div className="filterbar-row">
                    <div className="filterbar-left">
                      <div className="filterbar-item">
                        <div className="filterbar-label">项目名称/编码</div>
                        <div className="filterbar-input">
                          <input className="filterbar-control" value={projectFilters.nameCode} onChange={(e) => setProjectFilters((prev) => ({ ...prev, nameCode: e.target.value }))} />
                        </div>
                      </div>
                      <div className="filterbar-item">
                        <div className="filterbar-label">所属企业</div>
                        <div className="filterbar-input">
                          <input className="filterbar-control" value={projectFilters.enterpriseName} onChange={(e) => setProjectFilters((prev) => ({ ...prev, enterpriseName: e.target.value }))} />
                        </div>
                      </div>
                      <div className="filterbar-item">
                        <div className="filterbar-label">来源</div>
                        <div className="filterbar-input">
                          <select className="filterbar-control" value={projectFilters.source} onChange={(e) => setProjectFilters((prev) => ({ ...prev, source: e.target.value }))}>
                            <option value="ALL">全部</option>
                            <option value="SUIP">SUIP</option>
                            <option value="MANUAL">MANUAL</option>
                          </select>
                        </div>
                      </div>
                      <div className="filterbar-item">
                        <div className="filterbar-label">项目阶段</div>
                        <div className="filterbar-input">
                          <select className="filterbar-control" value={projectFilters.projectStage} onChange={(e) => setProjectFilters((prev) => ({ ...prev, projectStage: e.target.value }))}>
                            <option value="ALL">全部</option>
                            <option value="可研阶段">可研阶段</option>
                            <option value="基础设计阶段">基础设计阶段</option>
                            <option value="试运行阶段">试运行阶段</option>
                            <option value="竣工验收阶段">竣工验收阶段</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="filterbar-actions">
                      <button type="button" className="btn btn-primary" onClick={reloadProjects}>检索</button>
                    </div>
                  </div>
                </div>
                <div className="table-wrap mt-10">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>项目编码</th><th>项目名称</th><th>所属企业</th><th>建设单位</th><th>来源</th><th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectRows.map((row) => (
                        <tr key={row.id}>
                          <td>{row.projectCode}</td>
                          <td>{row.projectName}</td>
                          <td>{row.enterpriseName}</td>
                          <td>{row.buildUnit}</td>
                          <td>{row.source}</td>
                          <td><button type="button" className="table-link-btn" onClick={() => setSelectedProject(row)}>选择该项目</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="card mt-10">
              <div className="card-hd"><div className="card-title">手动新增项目</div></div>
              <div className="card-bd">
                <div className="detail-form-grid">
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目名称</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.projectName} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, projectName: e.target.value }))} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>所属企业</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.enterpriseName} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, enterpriseName: e.target.value }))} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>建设单位</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.buildUnit} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, buildUnit: e.target.value }))} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目级别</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.projectLevel} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, projectLevel: e.target.value }))} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>项目阶段</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.projectStage} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, projectStage: e.target.value }))} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>建设类型</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.buildType} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, buildType: e.target.value }))} /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key">项目编码</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.projectCode} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, projectCode: e.target.value }))} placeholder="不填则系统生成" /></div></div>
                  <div className="detail-form-item"><div className="detail-form-key">行业</div><div className="detail-form-val"><input className="filterbar-control" value={manualProjectForm.industry} onChange={(e) => setManualProjectForm((prev) => ({ ...prev, industry: e.target.value }))} /></div></div>
                </div>
                <div className="modal-ft">
                  <button type="button" className="btn btn-primary" onClick={addManualProjectAndSelect}>保存并选择该项目</button>
                </div>
              </div>
            </div>
          )}

          {selectedProject ? (
            <div className="card mt-10">
              <div className="card-hd"><div className="card-title">项目基础信息（已选）</div></div>
              <div className="card-bd">
                <div className="detail-form-grid">
                  <div className="detail-form-item"><div className="detail-form-key">项目编码</div><div className="detail-form-val">{selectedProject.projectCode}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">项目名称</div><div className="detail-form-val">{selectedProject.projectName}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">来源</div><div className="detail-form-val">{selectedProject.source}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">所属企业</div><div className="detail-form-val">{selectedProject.enterpriseName}</div></div>
                </div>
              </div>
            </div>
          ) : null}

          {duplicatedBlocked ? (
            <div className="pill mt-10">
              <div className="v" style={{ color: "#c62828", fontWeight: 700 }}>
                该项目已存在三同时任务：{existingTask.taskNo || "(草稿未编号)"}，禁止重复创建
              </div>
              <div className="modal-ft" style={{ padding: "8px 0 0 0" }}>
                <button type="button" className="btn btn-primary" onClick={() => navigate(`/three-same/task/${existingTask.id}`)}>查看已有任务</button>
              </div>
            </div>
          ) : null}

          {selectedProject && !duplicatedBlocked ? (
            <>
              <div className="card mt-10">
                <div className="card-hd"><div className="card-title">任务创建信息</div></div>
                <div className="card-bd">
                  <div className="detail-form-grid">
                    <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>任务名称</div><div className="detail-form-val"><input className="filterbar-control" value={taskForm.taskName} onChange={(e) => setTaskForm((prev) => ({ ...prev, taskName: e.target.value }))} /></div></div>
                    <div className="detail-form-item"><div className="detail-form-key">发起部门</div><div className="detail-form-val"><input className="filterbar-control" value={taskForm.initiatorDept} onChange={(e) => setTaskForm((prev) => ({ ...prev, initiatorDept: e.target.value }))} /></div></div>
                    <div className="detail-form-item"><div className="detail-form-key">发起人</div><div className="detail-form-val">{taskForm.initiatorName}</div></div>
                    <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>三同时负责人</div><div className="detail-form-val"><select className="filterbar-control" value={taskForm.ownerName} onChange={(e) => setTaskForm((prev) => ({ ...prev, ownerName: e.target.value }))}><option value="">请选择负责人</option>{users.map((u) => <option key={u} value={u}>{u}</option>)}</select></div></div>
                    <div className="detail-form-item" style={{ gridColumn: "1 / -1" }}><div className="detail-form-key">备注</div><div className="detail-form-val"><input className="filterbar-control" value={taskForm.remark} onChange={(e) => setTaskForm((prev) => ({ ...prev, remark: e.target.value }))} /></div></div>
                  </div>
                </div>
              </div>

              <div className="card mt-10">
                <div className="card-hd"><div className="card-title">识别信息</div></div>
                <div className="card-bd">
                  <div className="detail-form-grid">
                    <div className="detail-form-item">
                      <div className="detail-form-key"><span className="required-mark">*</span>项目类型识别</div>
                      <div className="detail-form-val">
                        <select className="filterbar-control" value={identify.projectType} onChange={(e) => setIdentify((prev) => ({ ...prev, projectType: e.target.value }))}>
                          <option value="">请选择</option>
                          <option value="危化品类">危化品类</option>
                          <option value="非煤矿山类">非煤矿山类</option>
                          <option value="其他">其他</option>
                        </select>
                      </div>
                    </div>
                    <div className="detail-form-item">
                      <div className="detail-form-key"><span className="required-mark">*</span>三同时专业分类</div>
                      <div className="detail-form-val stpm-multi">
                        {["安全", "职卫", "消防"].map((s) => (
                          <label key={s}><input type="checkbox" checked={identify.specialties.includes(s)} onChange={() => toggleSpecialty(s)} /> {s}</label>
                        ))}
                      </div>
                    </div>
                    <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>设计完成</div><div className="detail-form-val"><input className="filterbar-control" type="date" value={identify.milestones.designDone} onChange={(e) => setIdentify((prev) => ({ ...prev, milestones: { ...prev.milestones, designDone: e.target.value } }))} /></div></div>
                    <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>试运行开始</div><div className="detail-form-val"><input className="filterbar-control" type="date" value={identify.milestones.trialStart} onChange={(e) => setIdentify((prev) => ({ ...prev, milestones: { ...prev.milestones, trialStart: e.target.value } }))} /></div></div>
                    <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>上线日期</div><div className="detail-form-val"><input className="filterbar-control" type="date" value={identify.milestones.goLive} onChange={(e) => setIdentify((prev) => ({ ...prev, milestones: { ...prev.milestones, goLive: e.target.value } }))} /></div></div>
                    <div className="detail-form-item"><div className="detail-form-key">验收日期</div><div className="detail-form-val"><input className="filterbar-control" type="date" value={identify.milestones.acceptance} onChange={(e) => setIdentify((prev) => ({ ...prev, milestones: { ...prev.milestones, acceptance: e.target.value } }))} /></div></div>

                    {identify.specialties.includes("安全") ? (
                      <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>安全负责人</div><div className="detail-form-val"><select className="filterbar-control" value={identify.professionalOwners.safeOwner} onChange={(e) => setIdentify((prev) => ({ ...prev, professionalOwners: { ...prev.professionalOwners, safeOwner: e.target.value } }))}><option value="">请选择</option>{users.map((u) => <option key={`safe-${u}`} value={u}>{u}</option>)}</select></div></div>
                    ) : null}
                    {identify.specialties.includes("职卫") ? (
                      <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>职卫负责人</div><div className="detail-form-val"><select className="filterbar-control" value={identify.professionalOwners.healthOwner} onChange={(e) => setIdentify((prev) => ({ ...prev, professionalOwners: { ...prev.professionalOwners, healthOwner: e.target.value } }))}><option value="">请选择</option>{users.map((u) => <option key={`health-${u}`} value={u}>{u}</option>)}</select></div></div>
                    ) : null}
                    {identify.specialties.includes("消防") ? (
                      <div className="detail-form-item"><div className="detail-form-key"><span className="required-mark">*</span>消防负责人</div><div className="detail-form-val"><select className="filterbar-control" value={identify.professionalOwners.fireOwner} onChange={(e) => setIdentify((prev) => ({ ...prev, professionalOwners: { ...prev.professionalOwners, fireOwner: e.target.value } }))}><option value="">请选择</option>{users.map((u) => <option key={`fire-${u}`} value={u}>{u}</option>)}</select></div></div>
                    ) : null}
                    <div className="detail-form-item"><div className="detail-form-key">资料员</div><div className="detail-form-val"><select className="filterbar-control" value={identify.dataClerk} onChange={(e) => setIdentify((prev) => ({ ...prev, dataClerk: e.target.value }))}><option value="">请选择</option>{users.map((u) => <option key={`clerk-${u}`} value={u}>{u}</option>)}</select></div></div>
                  </div>
                </div>
              </div>

              <div className="card mt-10">
                <div className="card-hd"><div className="card-title">生成预览</div></div>
                <div className="card-bd">
                  <div className="table-wrap">
                    <table className="proto-table" style={{ minWidth: "100%" }}>
                      <thead><tr><th>类型</th><th>名称</th><th>说明</th></tr></thead>
                      <tbody>
                        <tr><td>主任务</td><td>{taskForm.taskName || "(未命名任务)"}</td><td>项目主线任务 1 条</td></tr>
                        {identify.specialties.map((item) => (
                          <tr key={item}><td>专业子任务</td><td>{item}三同时子任务</td><td>按专业生成</td></tr>
                        ))}
                        {["可研资料", "基础设计资料", "试运行资料", "竣工验收资料"].map((item) => (
                          <tr key={item}><td>阶段资料</td><td>{item}</td><td>按阶段生成资料清单</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {milestoneError ? (
                <div className="pill mt-10">
                  <div className="v" style={{ color: "#c62828", fontWeight: 700 }}>{milestoneError}</div>
                </div>
              ) : null}

              {errorMsg ? (
                <div className="pill mt-10">
                  <div className="v" style={{ color: "#c62828", fontWeight: 700 }}>{errorMsg}</div>
                </div>
              ) : null}

              <div className="modal-ft">
                <button type="button" className="btn" onClick={onSaveDraft}>保存草稿</button>
                <button type="button" className="btn btn-primary" onClick={onSubmit} disabled={submitDisabled}>提交审批</button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
