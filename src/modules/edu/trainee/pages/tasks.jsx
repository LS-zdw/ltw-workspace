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
      
      <Card title="任务总览" desc="展示待学课程、待考科目和证书到期提醒">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">待学课程</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">待考场次</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">当前通过率</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书到期提醒</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>

      <Card title="在线学习与考试" desc="支持学习进度、章节测验、正式考试占位演示">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">支持学习进度、章节测验、正式考试占位演示</div>
        </div>
      </Card>

      <Card title="证书中心" desc="展示个人持证情况、到期预警和复训建议">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">展示个人持证情况、到期预警和复训建议</div>
        </div>
      </Card>
      
    </div>
  );
}
