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
      
      <Card title="任务视图切换" desc="">
        <div className="tag-row"><span className="tag">我的待办</span><span className="tag">我的任务</span><span className="tag">我的审批</span><span className="tag">审批</span><span className="tag">任务</span><span className="tag">全部</span></div>
      </Card>

      <Card title="处理规则" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">任务流和审批流页签内部细分模块页签</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">处理动作可根据流程节点配置</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">处理并下一步 / 处理并结束 / 退回此任务</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">没有下一级节点时可处理并结束</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">任务节点与处理状态由流程驱动</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>

      <Card title="待办列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>模块名称</th><th>任务内容</th><th>任务类型</th><th>发起人</th><th>发起单位</th><th>接收日期</th><th>任务时限</th><th>任务状态</th><th>处理状态</th><th>任务编号</th><th>任务节点</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>150万吨/年常减压改造试运行资料备案</button></td><td>试运行阶段行政许可信息维护</td><td>张明</td><td>海南炼化</td><td>2025-04-27</td><td>2025-05-22</td><td>待处理</td><td>处理中</td><td>RW-202504-001</td><td>试运行资料审核</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>处理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>竣工验收问题汇总表上传资料</button></td><td>竣工验收阶段信息维护</td><td>王虎</td><td>外部单位发起</td><td>2025-04-28</td><td>2025-05-31</td><td>待审批</td><td>未处理</td><td>RW-202504-008</td><td>竣工验收申请</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>150万吨/年常减压改造试运行资料备案</button></td><td>试运行阶段行政许可信息维护</td><td>张明</td><td>海南炼化</td><td>2025-04-27</td><td>2025-05-22</td><td>待处理</td><td>处理中</td><td>RW-202504-001</td><td>试运行资料审核</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>处理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>竣工验收问题汇总表上传资料</button></td><td>竣工验收阶段信息维护</td><td>王虎</td><td>外部单位发起</td><td>2025-04-28</td><td>2025-05-31</td><td>待审批</td><td>未处理</td><td>RW-202504-008</td><td>竣工验收申请</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>150万吨/年常减压改造试运行资料备案</button></td><td>试运行阶段行政许可信息维护</td><td>张明</td><td>海南炼化</td><td>2025-04-27</td><td>2025-05-22</td><td>待处理</td><td>处理中</td><td>RW-202504-001</td><td>试运行资料审核</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>处理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>竣工验收问题汇总表上传资料</button></td><td>竣工验收阶段信息维护</td><td>王虎</td><td>外部单位发起</td><td>2025-04-28</td><td>2025-05-31</td><td>待审批</td><td>未处理</td><td>RW-202504-008</td><td>竣工验收申请</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>150万吨/年常减压改造试运行资料备案</button></td><td>试运行阶段行政许可信息维护</td><td>张明</td><td>海南炼化</td><td>2025-04-27</td><td>2025-05-22</td><td>待处理</td><td>处理中</td><td>RW-202504-001</td><td>试运行资料审核</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>处理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>竣工验收问题汇总表上传资料</button></td><td>竣工验收阶段信息维护</td><td>王虎</td><td>外部单位发起</td><td>2025-04-28</td><td>2025-05-31</td><td>待审批</td><td>未处理</td><td>RW-202504-008</td><td>竣工验收申请</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>150万吨/年常减压改造试运行资料备案</button></td><td>试运行阶段行政许可信息维护</td><td>张明</td><td>海南炼化</td><td>2025-04-27</td><td>2025-05-22</td><td>待处理</td><td>处理中</td><td>RW-202504-001</td><td>试运行资料审核</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>处理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>三同时管理</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>竣工验收问题汇总表上传资料</button></td><td>竣工验收阶段信息维护</td><td>王虎</td><td>外部单位发起</td><td>2025-04-28</td><td>2025-05-31</td><td>待审批</td><td>未处理</td><td>RW-202504-008</td><td>竣工验收申请</td><td><button type="button" className="table-link-btn" onClick={() => openModal("approve-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {activeModal === "approve-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">详情1</div>
                <div className="modal-desc">对应原型“详情1”动态面板</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">任务编号：{{taskNo}}</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">任务内容：{{project}}</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">模块名称：三同时管理</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">发起人：{{starter}}</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">发起单位：{{org}}</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">接收日期：{{receiveDate}}</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">任务时限：{{deadline}}</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">任务状态：待处理</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">任务节点：{{node}}</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">审批日志：下方显示审批流审批进度</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">任务流处理日志：下方显示任务流处理日志</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">本处理意见：请填写处理意见</div>
        <div className="v">（示例值）</div>
      </div>
              
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>
              关闭
            </button>
<button type="button" className="btn btn-primary" onClick={() => openModal("confirm-approve", drillTarget)}>
              通过
            </button>
<button type="button" className="btn btn-primary" onClick={() => openModal("confirm-approve", drillTarget)}>
              退回
            </button>
<button type="button" className="btn btn-primary" onClick={() => openModal("confirm-approve", drillTarget)}>
              驳回
            </button>
<button type="button" className="btn btn-primary" onClick={() => goto(drillTarget)}>
              项目详情
            </button>
            </div>
          </div>
        </div>
      ) : null}
  

      {activeModal === "confirm-approve" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">DM-确认弹窗</div>
                <div className="modal-desc"></div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
              
              <div className="pill">
                <div className="k">说明</div>
                <div className="v">确认</div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>
              取消
            </button>
<button type="button" className="btn btn-primary" onClick={() => goto(drillTarget)}>
              确认
            </button>
            </div>
          </div>
        </div>
      ) : null}
  
    </div>
  );
}
