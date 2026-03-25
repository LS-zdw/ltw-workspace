import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ensureThreeSameStores,
  listTasks,
  getProjectById
} from "../lib/three-same-store.js";

function statusText(status) {
  if (status === "pending_approval") return "待审批";
  if (status === "draft") return "草稿";
  return status || "-";
}

function formatTime(value) {
  return String(value || "").slice(0, 19).replace("T", " ");
}

export default function Page() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);

  const reload = React.useCallback(() => {
    ensureThreeSameStores();
    // TODO(api): replace with backend task list API and project join query API.
    const tasks = listTasks();
    const nextRows = tasks.map((task) => {
      const project = getProjectById(task.projectId);
      return {
        id: task.id,
        taskNo: task.taskNo || "(草稿未编号)",
        status: statusText(task.status),
        projectName: project?.projectName || "-",
        updatedAt: task.updatedAt
      };
    });
    setRows(nextRows);
  }, []);

  React.useEffect(() => {
    reload();
  }, [reload]);

  return (
    <div className="stack">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">三同时任务列表</div>
            <div className="card-desc">点击行或“查看”进入任务详情</div>
          </div>
          <button type="button" className="btn" onClick={reload}>刷新</button>
        </div>

        <div className="card-bd">
          <div className="table-wrap">
            <table className="proto-table">
              <thead>
                <tr>
                  <th>任务号</th>
                  <th>状态</th>
                  <th>项目名称</th>
                  <th>更新时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/three-same/task/${row.id}`)}
                  >
                    <td>{row.taskNo}</td>
                    <td>{row.status}</td>
                    <td>{row.projectName}</td>
                    <td>{formatTime(row.updatedAt)}</td>
                    <td>
                      <button
                        type="button"
                        className="table-link-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/three-same/task/${row.id}`);
                        }}
                      >
                        查看
                      </button>
                    </td>
                  </tr>
                ))}
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", color: "#6b7280" }}>暂无任务数据</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
