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
      
      <Card title="基本信息" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">条目ID</div>
        <div className="v">{resolveDynamic("{{id}}")}</div>
      </div>
      <div className="pill">
        <div className="k">标题</div>
        <div className="v">{resolveDynamic("（示例）受限空间作业安全要点（含典型事故案例）")}</div>
      </div>
      <div className="pill">
        <div className="k">分类</div>
        <div className="v">{resolveDynamic("作业安全")}</div>
      </div>
      <div className="pill">
        <div className="k">标签</div>
        <div className="v">{resolveDynamic("受限空间 / 作业票 / 监护")}</div>
      </div>
      <div className="pill">
        <div className="k">适用岗位</div>
        <div className="v">{resolveDynamic("检维修 / 承包商 / 班组长")}</div>
      </div>
      <div className="pill">
        <div className="k">风险等级</div>
        <div className="v">{resolveDynamic("高")}</div>
      </div>
      <div className="pill">
        <div className="k">法规依据</div>
        <div className="v">{resolveDynamic("（示例）安全生产法 / 行业规范")}</div>
      </div>
      <div className="pill">
        <div className="k">版本</div>
        <div className="v">{resolveDynamic("V1.0")}</div>
      </div>
      <div className="pill">
        <div className="k">发布状态</div>
        <div className="v">{resolveDynamic("发布中")}</div>
      </div>
      <div className="pill">
        <div className="k">发布人</div>
        <div className="v">{resolveDynamic("张宇")}</div>
      </div>
      <div className="pill">
        <div className="k">生效时间</div>
        <div className="v">{resolveDynamic("2026-02-03")}</div>
      </div>
      <div className="pill">
        <div className="k">更新时间</div>
        <div className="v">{resolveDynamic("2026-02-03")}</div>
      </div>
        </div>
      </Card>

      <Card title="正文结构（演示）" desc="此处按知识库条目常见结构展示：要点清单、典型风险、现场核对、案例与复盘。">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">此处按知识库条目常见结构展示：要点清单、典型风险、现场核对、案例与复盘。</div>
        </div>
      </Card>

      <Card title="安全要点" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">进入前：气体检测（氧气/可燃/有毒）并记录</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">作业票：审批、隔离、通风、照明、监护到位</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">监护人：不得离岗，异常立即组织撤离</div>
        <div className="v">（示例值）</div>
      </div>
      <div className="pill">
        <div className="k">应急：救援器材与联络机制提前确认</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>

      <Card title="附件与引用" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>附件名称</th><th>类型</th><th>版本/日期</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>现场核对清单（受限空间）.pdf</button></td><td>PDF</td><td>2026-02-03</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>事故案例汇编（节选）.pdf</button></td><td>PDF</td><td>2026-01-20</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>现场核对清单（受限空间）.pdf</button></td><td>PDF</td><td>2026-02-03</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>事故案例汇编（节选）.pdf</button></td><td>PDF</td><td>2026-01-20</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>现场核对清单（受限空间）.pdf</button></td><td>PDF</td><td>2026-02-03</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>事故案例汇编（节选）.pdf</button></td><td>PDF</td><td>2026-01-20</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>现场核对清单（受限空间）.pdf</button></td><td>PDF</td><td>2026-02-03</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>事故案例汇编（节选）.pdf</button></td><td>PDF</td><td>2026-01-20</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>现场核对清单（受限空间）.pdf</button></td><td>PDF</td><td>2026-02-03</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>事故案例汇编（节选）.pdf</button></td><td>PDF</td><td>2026-01-20</td><td><button type="button" className="table-link-btn" onClick={() => openModal("attach-preview", "")}>预览</button></td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {activeModal === "attach-preview" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">附件预览（演示）</div>
                <div className="modal-desc">原型中通常为新窗口/弹层预览，这里用弹层示意。</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
      <div className="pill">
        <div className="k">文件名</div>
        <div className="v">{resolveDynamic("（示例）现场核对清单（受限空间）.pdf")}</div>
      </div>
      <div className="pill">
        <div className="k">来源条目</div>
        <div className="v">{resolveDynamic("{{id}}")}</div>
      </div>
      <div className="pill">
        <div className="k">说明</div>
        <div className="v">{resolveDynamic("此预览为离线演示，不接文件服务。")}</div>
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
