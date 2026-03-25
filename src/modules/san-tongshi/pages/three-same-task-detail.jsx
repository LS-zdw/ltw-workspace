import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ensureThreeSameStores,
  getTaskById,
  getProjectById
} from "../lib/three-same-store.js";

function formatTime(value) {
  return String(value || "").slice(0, 19).replace("T", " ");
}

function statusLabel(status) {
  if (status === "pending_approval") return "待审批";
  if (status === "draft") return "草稿";
  return status || "-";
}

export default function Page() {
  const { taskId } = useParams();
  const [activeTab, setActiveTab] = React.useState("base");

  React.useEffect(() => {
    ensureThreeSameStores();
  }, []);

  // TODO(api): replace with backend task detail query API.
  const task = getTaskById(taskId);
  // TODO(api): replace with backend project detail query API.
  const project = task?.projectId ? getProjectById(task.projectId) : null;

  if (!task) {
    return (
      <div className="card">
        <div className="card-bd">
          <div className="card-title">任务不存在或已删除</div>
          <div className="card-desc">taskId: {taskId}</div>
          <div style={{ marginTop: 12 }}>
            <Link className="btn btn-primary" to="/three-same/task/new">返回任务创建页</Link>
          </div>
        </div>
      </div>
    );
  }

  const identify = task.identify || {};
  const milestones = identify.milestones || {};
  const professionalOwners = identify.professionalOwners || {};

  return (
    <div className="stack">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">三同时任务详情</div>
            <div className="card-desc">任务号：{task.taskNo || "(草稿未编号)"}</div>
          </div>
          <Link className="btn" to="/three-same/task/new">返回创建页</Link>
        </div>

        <div className="card-bd">
          <div className="pill" style={{ marginBottom: 12 }}>
            <div className="k">状态流转</div>
            <div className="v">
              <span style={{ fontWeight: 700, color: task.status === "draft" ? "#0d47a1" : "#6b7280" }}>已创建</span>
              <span style={{ margin: "0 8px", color: "#9ca3af" }}>→</span>
              <span style={{ fontWeight: 700, color: task.status === "pending_approval" ? "#c62828" : "#6b7280" }}>待审批</span>
            </div>
          </div>

          <div className="pill" style={{ marginBottom: 12 }}>
            <div className="k">关联项目</div>
            <div className="v">
              {project ? `${project.projectName} / ${project.projectCode || "-"} / ${project.source} / ${project.enterpriseName}` : "项目信息缺失"}
            </div>
          </div>

          <div className="hq-tabs" style={{ marginBottom: 12 }}>
            <button type="button" className={`hq-tab ${activeTab === "base" ? "active" : ""}`} onClick={() => setActiveTab("base")}>基础信息</button>
            <button type="button" className={`hq-tab ${activeTab === "identify" ? "active" : ""}`} onClick={() => setActiveTab("identify")}>识别信息</button>
          </div>

          {activeTab === "base" ? (
            <div className="detail-section">
              <div className="detail-section-title">任务基础信息（只读）</div>
              <div className="detail-form-grid">
                <div className="detail-form-item"><div className="detail-form-key">任务ID</div><div className="detail-form-val">{task.id}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">任务号</div><div className="detail-form-val">{task.taskNo || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">任务状态</div><div className="detail-form-val">{statusLabel(task.status)}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">任务名称</div><div className="detail-form-val">{task.taskName || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">发起部门</div><div className="detail-form-val">{task.initiatorDept || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">发起人</div><div className="detail-form-val">{task.initiatorName || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">三同时负责人</div><div className="detail-form-val">{task.ownerName || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">备注</div><div className="detail-form-val">{task.remark || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">创建时间</div><div className="detail-form-val">{formatTime(task.createdAt)}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">更新时间</div><div className="detail-form-val">{formatTime(task.updatedAt)}</div></div>
              </div>
            </div>
          ) : (
            <div className="detail-section">
              <div className="detail-section-title">识别信息（只读）</div>
              <div className="detail-form-grid">
                <div className="detail-form-item"><div className="detail-form-key">项目类型识别</div><div className="detail-form-val">{identify.projectType || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">三同时专业分类</div><div className="detail-form-val">{(identify.specialties || []).join("、") || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">设计完成</div><div className="detail-form-val">{milestones.designDone || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">试运行开始</div><div className="detail-form-val">{milestones.trialStart || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">上线日期</div><div className="detail-form-val">{milestones.goLive || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">验收日期</div><div className="detail-form-val">{milestones.acceptance || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">安全负责人</div><div className="detail-form-val">{professionalOwners.safeOwner || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">职卫负责人</div><div className="detail-form-val">{professionalOwners.healthOwner || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">消防负责人</div><div className="detail-form-val">{professionalOwners.fireOwner || "-"}</div></div>
                <div className="detail-form-item"><div className="detail-form-key">资料员</div><div className="detail-form-val">{identify.dataClerk || "-"}</div></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
