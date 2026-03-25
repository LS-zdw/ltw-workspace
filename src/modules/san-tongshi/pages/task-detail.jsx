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
      
      <Card title="项目信息卡片" desc="用于总部在线会签与专项论证">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">项目名称</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">项目编号</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">建设单位</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">当前阶段</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">责任人</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">状态</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>

      <Card title="流程进度" desc="项目创建→创建识别→审批与会签→启动/变更">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">项目创建→创建识别→审批与会签→启动/变更</div>
        </div>
      </Card>

      <Card title="资料包（四阶段）" desc="缺项提示、企业可补齐">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">缺项提示、企业可补齐</div>
        </div>
      </Card>

      <Card title="审批与会签" desc="总部审批+部门会签（演示版）">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">总部审批+部门会签（演示版）</div>
        </div>
      </Card>

      <Card title="启动条件校验" desc="审批+会签+资料齐全后可启动">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">审批+会签+资料齐全后可启动</div>
        </div>
      </Card>
      
    </div>
  );
}
