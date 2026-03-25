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
        <div className="filterbar-label">选择培训年度</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入选择培训年度" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训项目名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训项目名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">主办单位</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训开始日期</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="2026-02-11" />
        </div></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训截止日期</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="2026-02-11" />
        </div></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">学习状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">考试状态</div>
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

      <Card title="个人培训任务" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>培训项目名称</th><th>主办单位</th><th>培训时间</th><th>学习状态</th><th>学习完成时间</th><th>考试状态</th><th>考试成绩</th><th>考试完成时间</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工安全培训</button></td><td>总部安全培训管理</td><td>2024-10-11 ~ 2024-10-17</td><td>学习中</td><td></td><td>未考试</td><td></td><td></td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训学习</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>总部安全专项在线培训</button></td><td>安环部</td><td>2025-01-10 ~ 2025-01-20</td><td>已完成</td><td>2025-01-18 19:00</td><td>已完成</td><td>合格</td><td>2025-01-20 20:30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工安全培训</button></td><td>总部安全培训管理</td><td>2024-10-11 ~ 2024-10-17</td><td>学习中</td><td></td><td>未考试</td><td></td><td></td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训学习</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>总部安全专项在线培训</button></td><td>安环部</td><td>2025-01-10 ~ 2025-01-20</td><td>已完成</td><td>2025-01-18 19:00</td><td>已完成</td><td>合格</td><td>2025-01-20 20:30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工安全培训</button></td><td>总部安全培训管理</td><td>2024-10-11 ~ 2024-10-17</td><td>学习中</td><td></td><td>未考试</td><td></td><td></td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训学习</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>总部安全专项在线培训</button></td><td>安环部</td><td>2025-01-10 ~ 2025-01-20</td><td>已完成</td><td>2025-01-18 19:00</td><td>已完成</td><td>合格</td><td>2025-01-20 20:30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工安全培训</button></td><td>总部安全培训管理</td><td>2024-10-11 ~ 2024-10-17</td><td>学习中</td><td></td><td>未考试</td><td></td><td></td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训学习</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>总部安全专项在线培训</button></td><td>安环部</td><td>2025-01-10 ~ 2025-01-20</td><td>已完成</td><td>2025-01-18 19:00</td><td>已完成</td><td>合格</td><td>2025-01-20 20:30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼油一部新员工安全培训</button></td><td>总部安全培训管理</td><td>2024-10-11 ~ 2024-10-17</td><td>学习中</td><td></td><td>未考试</td><td></td><td></td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>培训学习</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>总部安全专项在线培训</button></td><td>安环部</td><td>2025-01-10 ~ 2025-01-20</td><td>已完成</td><td>2025-01-18 19:00</td><td>已完成</td><td>合格</td><td>2025-01-20 20:30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>查看</button></td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="功能入口" desc="">
        <div className="tag-row"><span className="tag">培训学习</span><span className="tag">线上考试</span><span className="tag">证书管理</span><span className="tag">统计分析</span><span className="tag">重点工作</span></div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-员工参与培训-个人端详情</div>
                <div className="modal-desc">来源：edu-ep/员工参与培训-个人端.html</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">培训项目名称</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">主办单位</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">培训时间</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">学习状态</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">学习完成时间</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">考试状态</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">考试成绩</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">考试完成时间</div>
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
