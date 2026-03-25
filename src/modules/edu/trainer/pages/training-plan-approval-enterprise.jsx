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
        <div className="filterbar-label">功能点</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能点" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">班组安全活动计划</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入班组安全活动计划" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">班组安全活动登记</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入班组安全活动登记" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入证书管理" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-培训计划审批-企业端列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>组织机构</th><th>审批结果</th><th>审批时间</th><th>岗位技能类</th><th>培训计划审批</th><th>提交日期</th><th>计划参与机构</th><th>线上培训</th><th>企业年度</th><th>企业临时</th><th>运行部年度</th><th>姓名</th><th>承包商人员编号</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td><td>执行步骤</td><td>审批人员</td><td>操作说明</td><td>审批意见</td><td>提交需求</td><td>李四</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>提交成功</td><td>集中面授</td><td>线上学习</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>外出研讨</button></td><td>法规合规类</td><td>应急预案类</td><td>安全意识类</td><td>事故案列警示教育</td><td>培训需求名称，30字内</td><td>基本信息</td><td>审批信息</td><td>组织与执行信息</td><td>提交人</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td><td>执行步骤</td><td>审批人员</td><td>操作说明</td><td>审批意见</td><td>提交需求</td><td>李四</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>提交成功</td><td>集中面授</td><td>线上学习</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>外出研讨</button></td><td>法规合规类</td><td>应急预案类</td><td>安全意识类</td><td>事故案列警示教育</td><td>培训需求名称，30字内</td><td>基本信息</td><td>审批信息</td><td>组织与执行信息</td><td>提交人</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td><td>执行步骤</td><td>审批人员</td><td>操作说明</td><td>审批意见</td><td>提交需求</td><td>李四</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>提交成功</td><td>集中面授</td><td>线上学习</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>外出研讨</button></td><td>法规合规类</td><td>应急预案类</td><td>安全意识类</td><td>事故案列警示教育</td><td>培训需求名称，30字内</td><td>基本信息</td><td>审批信息</td><td>组织与执行信息</td><td>提交人</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td><td>执行步骤</td><td>审批人员</td><td>操作说明</td><td>审批意见</td><td>提交需求</td><td>李四</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>提交成功</td><td>集中面授</td><td>线上学习</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>外出研讨</button></td><td>法规合规类</td><td>应急预案类</td><td>安全意识类</td><td>事故案列警示教育</td><td>培训需求名称，30字内</td><td>基本信息</td><td>审批信息</td><td>组织与执行信息</td><td>提交人</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>培训师资管理</td><td>培训资源管理</td><td>培训考试</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训需求上报</button></td><td>培训记录管理</td><td>培训报告管理与评价</td><td>统计分析看板</td><td>执行步骤</td><td>审批人员</td><td>操作说明</td><td>审批意见</td><td>提交需求</td><td>李四</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>提交成功</td><td>集中面授</td><td>线上学习</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>外出研讨</button></td><td>法规合规类</td><td>应急预案类</td><td>安全意识类</td><td>事故案列警示教育</td><td>培训需求名称，30字内</td><td>基本信息</td><td>审批信息</td><td>组织与执行信息</td><td>提交人</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="页面说明" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">页面操作：查看 / 查询 / 保存 / 提交 / 取消</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">1.各级管理员在此页面可新增编辑培训需求。</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">2.管理员在此页面可查询培训需求历史信息，包含企业名称、培训需求内容、附件、所属部门、登记人、登进时间等信息。</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-培训计划审批-企业端详情</div>
                <div className="modal-desc">来源：edu-ep/培训计划审批-企业端.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">组织机构</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">审批结果</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">审批时间</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">岗位技能类</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训计划审批</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">提交日期</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">计划参与机构</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">线上培训</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">企业年度</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">企业临时</div>
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
