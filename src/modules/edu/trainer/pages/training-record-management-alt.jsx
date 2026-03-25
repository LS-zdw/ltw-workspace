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
        <div className="filterbar-label">证书管理</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入证书管理" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">主办部门</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训班名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训班名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">组织机构选取</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">企业名称</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训对象</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训对象" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">年度</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入年度" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">登记日期</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="2026-02-11" />
        </div></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">资金来源:安保基金、企业培训费</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-培训记录管理_1列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>计划代码</th><th>培训班名称</th><th>计划天数</th><th>培训开始时间</th><th>培训结束时间</th><th>培训内容</th><th>培训学时</th><th>培训人员数量</th><th>合格率</th><th>炼油一部新员工岗前培训</th><th>对炼油一部的新员工进行岗前培训</th><th>选择培训计划</th><th>生成时间</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全环保部</button></td><td>课时</td><td>合格人数</td><td>是否发证</td><td>2024年10月11日</td><td>2024年10月17日</td><td>导入模板下载</td><td>培训班详情</td><td>参与部门</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>负责</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>*是否绑定培训资源</button></td><td>组织与执行信息</td><td>培训资源与考试设置</td><td>选择老师</td><td>选择试卷</td><td>选择培训资源（可以多选）</td><td>考试</td><td>补考次数</td><td>时长</td><td>是否补考</td><td>姓名</td><td>单位</td><td>师资等级</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全环保部</button></td><td>课时</td><td>合格人数</td><td>是否发证</td><td>2024年10月11日</td><td>2024年10月17日</td><td>导入模板下载</td><td>培训班详情</td><td>参与部门</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>负责</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>*是否绑定培训资源</button></td><td>组织与执行信息</td><td>培训资源与考试设置</td><td>选择老师</td><td>选择试卷</td><td>选择培训资源（可以多选）</td><td>考试</td><td>补考次数</td><td>时长</td><td>是否补考</td><td>姓名</td><td>单位</td><td>师资等级</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全环保部</button></td><td>课时</td><td>合格人数</td><td>是否发证</td><td>2024年10月11日</td><td>2024年10月17日</td><td>导入模板下载</td><td>培训班详情</td><td>参与部门</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>负责</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>*是否绑定培训资源</button></td><td>组织与执行信息</td><td>培训资源与考试设置</td><td>选择老师</td><td>选择试卷</td><td>选择培训资源（可以多选）</td><td>考试</td><td>补考次数</td><td>时长</td><td>是否补考</td><td>姓名</td><td>单位</td><td>师资等级</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全环保部</button></td><td>课时</td><td>合格人数</td><td>是否发证</td><td>2024年10月11日</td><td>2024年10月17日</td><td>导入模板下载</td><td>培训班详情</td><td>参与部门</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>负责</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>*是否绑定培训资源</button></td><td>组织与执行信息</td><td>培训资源与考试设置</td><td>选择老师</td><td>选择试卷</td><td>选择培训资源（可以多选）</td><td>考试</td><td>补考次数</td><td>时长</td><td>是否补考</td><td>姓名</td><td>单位</td><td>师资等级</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全环保部</button></td><td>课时</td><td>合格人数</td><td>是否发证</td><td>2024年10月11日</td><td>2024年10月17日</td><td>导入模板下载</td><td>培训班详情</td><td>参与部门</td><td>线上培训</td><td>外出研修</td><td>集中面授</td><td>负责</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>*是否绑定培训资源</button></td><td>组织与执行信息</td><td>培训资源与考试设置</td><td>选择老师</td><td>选择试卷</td><td>选择培训资源（可以多选）</td><td>考试</td><td>补考次数</td><td>时长</td><td>是否补考</td><td>姓名</td><td>单位</td><td>师资等级</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="页面说明" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">页面操作：新增 / 导入 / 导出 / 删除 / 编辑 / 查询 / 重置 / 保存 / 提交 / 取消</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">1.使用本系统培训的自动生成</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">2.使用其它系统培训提供标准接口接入</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">3.线下培训可手动录入</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-培训记录管理_1详情</div>
                <div className="modal-desc">来源：edu-ep/培训记录管理_1.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">计划代码</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训班名称</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">计划天数</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训开始时间</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训结束时间</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训内容</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训学时</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训人员数量</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">合格率</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">炼油一部新员工岗前培训</div>
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
