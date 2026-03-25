import React from "react";

import Card from "/src/components/ui/Card.jsx";

export default function Page() {
  const navigate = null;
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
      <Card title="教育培训-培训记录管理" desc="module=edu/trainer · pageId=ep-13 · path=/edu/trainer/ep-13"
        right={<span className="badge">Generated</span>}
      >
        <div className="pill">
          <div className="k">角色视角</div>
          <div className="v">培训员 / 企业培训管理员</div>
        </div>
        {projectName ? (
          <div className="pill mt-10">
            <div className="k">当前项目</div>
            <div className="v">{projectName}</div>
          </div>
        ) : null}
        
        <div className="pill mt-10">
          <div className="k">原型来源</div>
          <div className="v">edu-ep/培训记录管理.html</div>
        </div>
      </Card>

      
      <Card title="页面定位" desc="来源于 edu-ep 原型页面">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">原型页面：培训记录管理</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">模块归属：edu/trainer</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">接入方式：spec 生成路由</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">状态：已接入，待按原型逐页重建字段</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>

      <Card title="原型接入说明" desc="已纳入教育培训模块。下一步可按页面优先级逐页做 1:1 字段与链路重建。">
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">此块为占位：后续可升级为 Stepper/Tabs/Table/DocsPack 等组件。</div>
        </div>
      </Card>
      
    </div>
  );
}
