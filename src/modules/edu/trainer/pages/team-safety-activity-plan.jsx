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
        <div className="filterbar-label">班组安全活动登记</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入班组安全活动登记" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入证书管理" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-班组安全活动计划列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>计划人数</th><th>活动时间</th><th>活动地点</th><th>登记部门</th><th>登记时间</th><th>安全管理培训</th><th>2024年8月安全环保部安全管理培训</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全活动内容简述</button></td><td>登记人</td><td>2024年10月</td><td>整装车间2号会议室</td><td>安全环保部</td><td>张三</td><td>临时计划</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全活动内容简述</button></td><td>登记人</td><td>2024年10月</td><td>整装车间2号会议室</td><td>安全环保部</td><td>张三</td><td>临时计划</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全活动内容简述</button></td><td>登记人</td><td>2024年10月</td><td>整装车间2号会议室</td><td>安全环保部</td><td>张三</td><td>临时计划</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全活动内容简述</button></td><td>登记人</td><td>2024年10月</td><td>整装车间2号会议室</td><td>安全环保部</td><td>张三</td><td>临时计划</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全活动内容简述</button></td><td>登记人</td><td>2024年10月</td><td>整装车间2号会议室</td><td>安全环保部</td><td>张三</td><td>临时计划</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="页面说明" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">页面操作：新增 / 导出 / 删除 / 编辑 / 查询 / 重置 / 保存 / 提交 / 取消</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-班组安全活动计划详情</div>
                <div className="modal-desc">来源：edu-ep/班组安全活动计划.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">计划人数</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">活动时间</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">活动地点</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">登记部门</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">登记时间</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">安全管理培训</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">2024年8月安全环保部安全管理培训</div>
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
