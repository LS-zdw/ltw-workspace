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
        <div className="filterbar-label">使用用户：总部各级管理人员</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：培训课件管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：培训课件管理" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：题库管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：题库管理" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：试卷管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：试卷管理" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能点1： 培训计划增删改查</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能点1： 培训计划增删改查" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：培训计划管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：培训计划管理" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能点1： 培训班增删改查</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能点1： 培训班增删改查" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">使用用户：各级管理人员</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：培训班管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：培训班管理" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：培训学习</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：培训学习" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：线上考试</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：线上考试" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">功能名称：统计分析</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入功能名称：统计分析" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-教育培训原型设计卡列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>承包商人员编号</th><th>身份证号</th><th>承包商人员类别</th><th>岗位/工种</th><th>所在单位</th><th>出生日期</th><th>证书信息</th><th>资格证书信息</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>软件原型设计说明卡-教育培训</button></td><td>新增培训计划</td><td>提 交</td><td>取 消</td><td>计划参与机构</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>上传文件</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>所属承包商</button></td><td>性别</td><td>年龄</td><td>张宇</td><td>中石化工程质量监测有限公司上海分公司</td><td>项目一部</td><td>李飞</td><td>河南第一防腐工程有限公司</td><td>项目二部</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>软件原型设计说明卡-教育培训</button></td><td>新增培训计划</td><td>提 交</td><td>取 消</td><td>计划参与机构</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>上传文件</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>所属承包商</button></td><td>性别</td><td>年龄</td><td>张宇</td><td>中石化工程质量监测有限公司上海分公司</td><td>项目一部</td><td>李飞</td><td>河南第一防腐工程有限公司</td><td>项目二部</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>软件原型设计说明卡-教育培训</button></td><td>新增培训计划</td><td>提 交</td><td>取 消</td><td>计划参与机构</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>上传文件</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>所属承包商</button></td><td>性别</td><td>年龄</td><td>张宇</td><td>中石化工程质量监测有限公司上海分公司</td><td>项目一部</td><td>李飞</td><td>河南第一防腐工程有限公司</td><td>项目二部</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>软件原型设计说明卡-教育培训</button></td><td>新增培训计划</td><td>提 交</td><td>取 消</td><td>计划参与机构</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>上传文件</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>所属承包商</button></td><td>性别</td><td>年龄</td><td>张宇</td><td>中石化工程质量监测有限公司上海分公司</td><td>项目一部</td><td>李飞</td><td>河南第一防腐工程有限公司</td><td>项目二部</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>软件原型设计说明卡-教育培训</button></td><td>新增培训计划</td><td>提 交</td><td>取 消</td><td>计划参与机构</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>上传文件</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>所属承包商</button></td><td>性别</td><td>年龄</td><td>张宇</td><td>中石化工程质量监测有限公司上海分公司</td><td>项目一部</td><td>李飞</td><td>河南第一防腐工程有限公司</td><td>项目二部</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="页面说明" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">页面操作：查询 / 保存 / 提交 / 取消</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-教育培训原型设计卡详情</div>
                <div className="modal-desc">来源：edu-ep/教育培训原型设计卡.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">姓名</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">承包商人员编号</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">身份证号</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">承包商人员类别</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">岗位/工种</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">所在单位</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">出生日期</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">证书信息</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">资格证书信息</div>
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
