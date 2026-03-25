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
        <div className="filterbar-label">岗位</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">员工姓名</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入员工姓名" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">人员类型</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入证书管理" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-员工教育培训信息列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>员工姓名</th><th>组织机构</th><th>岗位</th><th>人员类型</th><th>学时</th><th>合格率</th><th>证书个数</th><th>操作</th><th>新员工</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>未完成</button></td><td>已完成</td><td>学习中</td><td>未考试</td><td>合格</td><td>不合格</td><td>培训记录管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>手机号码</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>民族</button></td><td>参训项目数</td><td>合格项目数</td><td>张三</td><td>化工一部</td><td>炼油一部技术员</td><td>汉族</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>王五</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>未完成</button></td><td>已完成</td><td>学习中</td><td>未考试</td><td>合格</td><td>不合格</td><td>培训记录管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>手机号码</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>民族</button></td><td>参训项目数</td><td>合格项目数</td><td>张三</td><td>化工一部</td><td>炼油一部技术员</td><td>汉族</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>王五</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>未完成</button></td><td>已完成</td><td>学习中</td><td>未考试</td><td>合格</td><td>不合格</td><td>培训记录管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>手机号码</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>民族</button></td><td>参训项目数</td><td>合格项目数</td><td>张三</td><td>化工一部</td><td>炼油一部技术员</td><td>汉族</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>王五</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>未完成</button></td><td>已完成</td><td>学习中</td><td>未考试</td><td>合格</td><td>不合格</td><td>培训记录管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>手机号码</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>民族</button></td><td>参训项目数</td><td>合格项目数</td><td>张三</td><td>化工一部</td><td>炼油一部技术员</td><td>汉族</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>王五</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>未完成</button></td><td>已完成</td><td>学习中</td><td>未考试</td><td>合格</td><td>不合格</td><td>培训记录管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>手机号码</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>民族</button></td><td>参训项目数</td><td>合格项目数</td><td>张三</td><td>化工一部</td><td>炼油一部技术员</td><td>汉族</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>导出</button></td><td>王五</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="页面说明" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">页面操作：导出 / 查看 / 查询 / 重置</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">1.培训计划提交后进行工作流审批（审批可配置）</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-员工教育培训信息详情</div>
                <div className="modal-desc">来源：edu-ep/员工教育培训信息.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">员工姓名</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">组织机构</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">岗位</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">人员类型</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">学时</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">合格率</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书个数</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">新员工</div>
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
