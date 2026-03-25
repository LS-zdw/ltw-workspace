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
        <div className="filterbar-label">证书小类包括</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书种类</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书小类</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">登记日期</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="2026-02-11" />
        </div></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">班组安全活动：仅线下，无系统支持</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入班组安全活动：仅线下，无系统支持" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">集团总部要求证书：使用网络学院</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入集团总部要求证书：使用网络学院" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-证书管理-个人端列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>证书名称</th><th>证书编码</th><th>证书种类</th><th>证书小类</th><th>证书生效日期</th><th>证书有效期</th><th>关联培训项目</th><th>证书附件</th><th>安全培训</th><th>培训记录管理</th><th>证书管理</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>消防设施操作员（初、中、高)</button></td><td>注册安全工程师（初、中、高)</td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>注册安全工程师（初、中、高)</button></td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td><td>消防设施操作员（初、中、高)</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>消防设施操作员（初、中、高)</button></td><td>注册安全工程师（初、中、高)</td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>注册安全工程师（初、中、高)</button></td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td><td>消防设施操作员（初、中、高)</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>消防设施操作员（初、中、高)</button></td><td>注册安全工程师（初、中、高)</td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>注册安全工程师（初、中、高)</button></td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td><td>消防设施操作员（初、中、高)</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>消防设施操作员（初、中、高)</button></td><td>注册安全工程师（初、中、高)</td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>注册安全工程师（初、中、高)</button></td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td><td>消防设施操作员（初、中、高)</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>消防设施操作员（初、中、高)</button></td><td>注册安全工程师（初、中、高)</td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>注册安全工程师（初、中、高)</button></td><td>专业技术</td><td>管理</td><td>技能操作</td><td>复审周期</td><td>是否异常</td><td>焊工证</td><td>特种作业</td><td>电工作业</td><td>证书管理-个人端</td><td>消防设施操作员（初、中、高)</td>
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
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-证书管理-个人端详情</div>
                <div className="modal-desc">来源：edu-ep/证书管理-个人端.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">证书名称</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书编码</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书种类</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书小类</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书生效日期</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书有效期</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">关联培训项目</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书附件</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">安全培训</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训记录管理</div>
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
