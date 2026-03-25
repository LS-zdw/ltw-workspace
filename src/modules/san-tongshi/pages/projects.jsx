import React from "react";
import {
  ensureThreeSameStores,
  listProjects
} from "../lib/three-same-store.js";

export default function Page() {
  const [filters, setFilters] = React.useState({
    nameCode: "",
    enterpriseName: "",
    source: "ALL",
    projectStage: "ALL"
  });
  const [rows, setRows] = React.useState([]);
  const [viewProject, setViewProject] = React.useState(null);

  const reload = React.useCallback(() => {
    // TODO(api): replace with backend project list query API.
    ensureThreeSameStores();
    setRows(listProjects(filters));
  }, [filters]);

  React.useEffect(() => {
    reload();
  }, [reload]);

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item">
              <div className="filterbar-label">项目名称/编码</div>
              <div className="filterbar-input">
                <input
                  className="filterbar-control"
                  value={filters.nameCode}
                  onChange={(e) => setFilters((prev) => ({ ...prev, nameCode: e.target.value }))}
                  placeholder="请输入项目名称或编码"
                />
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">所属企业</div>
              <div className="filterbar-input">
                <input
                  className="filterbar-control"
                  value={filters.enterpriseName}
                  onChange={(e) => setFilters((prev) => ({ ...prev, enterpriseName: e.target.value }))}
                  placeholder="请输入所属企业"
                />
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">来源</div>
              <div className="filterbar-input">
                <select
                  className="filterbar-control"
                  value={filters.source}
                  onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value }))}
                >
                  <option value="ALL">全部</option>
                  <option value="SUIP">SUIP</option>
                  <option value="MANUAL">手工</option>
                </select>
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">项目阶段</div>
              <div className="filterbar-input">
                <select
                  className="filterbar-control"
                  value={filters.projectStage}
                  onChange={(e) => setFilters((prev) => ({ ...prev, projectStage: e.target.value }))}
                >
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
            <button type="button" className="btn btn-primary" onClick={reload}>查询</button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                const nextFilters = { nameCode: "", enterpriseName: "", source: "ALL", projectStage: "ALL" };
                setFilters(nextFilters);
                setRows(listProjects(nextFilters));
              }}
            >
              重置
            </button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="proto-table">
          <thead>
            <tr>
              <th>项目编码</th>
              <th>项目名称</th>
              <th>所属企业</th>
              <th>建设单位</th>
              <th>项目级别</th>
              <th>项目阶段</th>
              <th>来源</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.projectCode}</td>
                <td>{row.projectName}</td>
                <td>{row.enterpriseName}</td>
                <td>{row.buildUnit}</td>
                <td>{row.projectLevel}</td>
                <td>{row.projectStage}</td>
                <td>
                  <span className={`stpm-status ${row.source === "SUIP" ? "stpm-status-review" : "stpm-status-ready"}`}>
                    {row.source}
                  </span>
                </td>
                <td>{String(row.updatedAt || "").slice(0, 19).replace("T", " ")}</td>
                <td>
                  <button type="button" className="table-link-btn" onClick={() => setViewProject(row)}>查看</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewProject ? (
        <div className="modal-mask" onClick={() => setViewProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">项目详情</div>
                <div className="modal-desc">来源：{viewProject.source}</div>
              </div>
              <button type="button" className="modal-close" onClick={() => setViewProject(null)}>×</button>
            </div>
            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-section-title">项目信息</div>
                <div className="detail-form-grid">
                  <div className="detail-form-item"><div className="detail-form-key">项目ID</div><div className="detail-form-val">{viewProject.id}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">项目编码</div><div className="detail-form-val">{viewProject.projectCode}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">项目名称</div><div className="detail-form-val">{viewProject.projectName}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">所属企业</div><div className="detail-form-val">{viewProject.enterpriseName}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">建设单位</div><div className="detail-form-val">{viewProject.buildUnit}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">项目级别</div><div className="detail-form-val">{viewProject.projectLevel}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">项目阶段</div><div className="detail-form-val">{viewProject.projectStage}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">建设类型</div><div className="detail-form-val">{viewProject.buildType}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">行业</div><div className="detail-form-val">{viewProject.industry || "-"}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">创建时间</div><div className="detail-form-val">{String(viewProject.createdAt || "").slice(0, 19).replace("T", " ")}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">更新时间</div><div className="detail-form-val">{String(viewProject.updatedAt || "").slice(0, 19).replace("T", " ")}</div></div>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={() => setViewProject(null)}>关闭</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
