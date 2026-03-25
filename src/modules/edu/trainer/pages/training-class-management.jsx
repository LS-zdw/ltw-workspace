import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "/src/components/ui/Card.jsx";

export default function Page() {
  const navigate = useNavigate();
  const projectName = new URLSearchParams(window.location.search).get("project");
  const [activeModal, setActiveModal] = React.useState(null);
  const [drillTarget, setDrillTarget] = React.useState("");
  const [drillProject, setDrillProject] = React.useState(projectName || "");
  const [modalStates, setModalStates] = React.useState({});
  const resolveDynamic = (value) => String(value || "").replace(/\{\{project\}\}/g, drillProject || projectName || "");
  const modalFormState = modalStates[activeModal] || {};
  const setModalField = (key, value) => {
    setModalFields({ [key]: value });
  };
  const setModalFields = (patch) => {
    setModalStates((prev) => ({
      ...prev,
      [activeModal]: { ...(prev[activeModal] || {}), ...(patch || {}) }
    }));
  };
  const isVisible = (showWhen) => {
    if (!showWhen) return true;
    return Object.entries(showWhen).every(([k, v]) => (modalFormState[k] || "") === String(v));
  };
  const openModal = (id, target = "") => {
    setDrillTarget(target);
    try {
      const q = target.includes("?") ? target.split("?")[1] : "";
      const p = new URLSearchParams(q).get("project");
      if (p) setDrillProject(p);
    } catch {
      // ignore parse errors
    }
    const initialByModal = {};
    if (initialByModal[id]) {
      setModalStates((prev) => ({ ...prev, [id]: initialByModal[id] }));
    }
    setActiveModal(id);
  };
  const closeModal = () => setActiveModal(null);
  const goto = (target) => {
    closeModal();
    if (navigate) navigate(target || drillTarget || "/");
  };

  return (
    <div className="stack">
      
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left"><div className="filterbar-item">
        <div className="filterbar-label">年度</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入年度" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训班名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训班名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训计划编号</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训计划编号" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训方式</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训方式" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训开始日期</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="2026-02-11" />
        </div></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训结束日期</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="2026-02-11" />
        </div></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">发布状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">模糊搜索查询</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入模糊搜索查询" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="培训班清单" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>培训班名称</th><th>计划代码</th><th>主办单位</th><th>办班地点</th><th>培训对象</th><th>培训方式</th><th>计划名额</th><th>课时</th><th>发布状态</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工岗前培训</button></td><td>12647843</td><td>化工一部</td><td>教育培训中心</td><td>新员工</td><td>集中面授</td><td>220</td><td>24</td><td>已发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>编辑</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全岗位培训</button></td><td>12647845</td><td>安全环保部</td><td>湖南石化</td><td>管理人员岗位</td><td>线上</td><td>196</td><td>20</td><td>未发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工岗前培训</button></td><td>12647843</td><td>化工一部</td><td>教育培训中心</td><td>新员工</td><td>集中面授</td><td>220</td><td>24</td><td>已发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>编辑</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全岗位培训</button></td><td>12647845</td><td>安全环保部</td><td>湖南石化</td><td>管理人员岗位</td><td>线上</td><td>196</td><td>20</td><td>未发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工岗前培训</button></td><td>12647843</td><td>化工一部</td><td>教育培训中心</td><td>新员工</td><td>集中面授</td><td>220</td><td>24</td><td>已发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>编辑</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全岗位培训</button></td><td>12647845</td><td>安全环保部</td><td>湖南石化</td><td>管理人员岗位</td><td>线上</td><td>196</td><td>20</td><td>未发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工岗前培训</button></td><td>12647843</td><td>化工一部</td><td>教育培训中心</td><td>新员工</td><td>集中面授</td><td>220</td><td>24</td><td>已发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>编辑</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全岗位培训</button></td><td>12647845</td><td>安全环保部</td><td>湖南石化</td><td>管理人员岗位</td><td>线上</td><td>196</td><td>20</td><td>未发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工岗前培训</button></td><td>12647843</td><td>化工一部</td><td>教育培训中心</td><td>新员工</td><td>集中面授</td><td>220</td><td>24</td><td>已发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>编辑</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全岗位培训</button></td><td>12647845</td><td>安全环保部</td><td>湖南石化</td><td>管理人员岗位</td><td>线上</td><td>196</td><td>20</td><td>未发布</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="班级执行说明" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">发布后发送至负责人</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">可进入培训过程模块导入人员名单与培训记录</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">考试多次取最高分</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训地点与计划不一致时要提示</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">课时比计划课时少时要提示</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-培训班管理详情</div>
                <div className="modal-desc">来源：edu-ep/培训班管理.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">培训班名称</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">计划代码</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">主办单位</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">办班地点</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训对象</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训方式</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">计划名额</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">课时</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">发布状态</div>
        <div className="v">（示例值）</div>
      </div>
              
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>
              关闭
            </button>
            </div>
          </div>
        </div>
      ) : null}
  
    </div>
  );
}
