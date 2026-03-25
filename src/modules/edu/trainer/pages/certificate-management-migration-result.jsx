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
      
      <Card title="执行结果概览" desc="">
        <div className="metrics-row">
          
      <div className="pill">
        <div className="k">本次迁移单号</div>
        <div className="v">BATCH-20260301-01</div>
      </div>
      <div className="pill">
        <div className="k">提交迁移数</div>
        <div className="v">40735</div>
      </div>
      <div className="pill">
        <div className="k">导入成功</div>
        <div className="v">40689</div>
      </div>
      <div className="pill">
        <div className="k">需业务处理</div>
        <div className="v">46</div>
      </div>
        </div>
      </Card>

      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left"><div className="filterbar-item">
        <div className="filterbar-label">人员姓名</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入人员姓名" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">所属单位</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入所属单位" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">执行结果</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="导入成功">导入成功</option><option value="需业务处理">需业务处理</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">迁移单号</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入迁移单号" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn" onClick={() => goto("/edu/trainer/certificate-management-migration-query")}>返回准备台账</button><button type="button" className="btn">导出待处理清单</button></div>
        </div>
      </div>

      <Card title="迁移执行明细" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>执行结果</th><th>待处理原因</th><th>迁移单号</th><th>人员姓名</th><th>所属单位</th><th>证书名称</th><th>证书编号</th><th>证书有效期</th><th>业务处理状态</th><th>登记人</th><th>登记时间</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td className="cell-ok">导入成功</td><td>-</td><td>BATCH-20260301-01</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>2026-06-06</td><td>已完成</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td className="cell-danger">需业务处理</td><td className="cell-danger">人员编码未匹配</td><td>BATCH-20260301-01</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td className="cell-overdue">2023-07-10</td><td className="cell-warn">待业务确认</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td className="cell-ok">导入成功</td><td>-</td><td>BATCH-20260301-01</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>2026-06-06</td><td>已完成</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td className="cell-danger">需业务处理</td><td className="cell-danger">人员编码未匹配</td><td>BATCH-20260301-01</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td className="cell-overdue">2023-07-10</td><td className="cell-warn">待业务确认</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td className="cell-ok">导入成功</td><td>-</td><td>BATCH-20260301-01</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>2026-06-06</td><td>已完成</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td className="cell-danger">需业务处理</td><td className="cell-danger">人员编码未匹配</td><td>BATCH-20260301-01</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td className="cell-overdue">2023-07-10</td><td className="cell-warn">待业务确认</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td className="cell-ok">导入成功</td><td>-</td><td>BATCH-20260301-01</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>2026-06-06</td><td>已完成</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td className="cell-danger">需业务处理</td><td className="cell-danger">人员编码未匹配</td><td>BATCH-20260301-01</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td className="cell-overdue">2023-07-10</td><td className="cell-warn">待业务确认</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td className="cell-ok">导入成功</td><td>-</td><td>BATCH-20260301-01</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>2026-06-06</td><td>已完成</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td className="cell-danger">需业务处理</td><td className="cell-danger">人员编码未匹配</td><td>BATCH-20260301-01</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td className="cell-overdue">2023-07-10</td><td className="cell-warn">待业务确认</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">迁移执行业务详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={() => navigator?.clipboard?.writeText("迁移单号=BATCH-20260301-01; 人员=陶红龙; 证书编号=340503198001019876; 执行结果=需业务处理; 原因=人员编码未匹配")}>复制排查信息</button><button type="button" className="btn" onClick={closeModal}>关闭</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">定位信息</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">老系统记录号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="OLD-CERT-000124" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">新系统记录号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="-" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">迁移单号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="BATCH-20260301-01" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">执行结果:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="需业务处理" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">待处理原因:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="人员编码未匹配：请业务确认人员主数据后，重新执行该条迁移。" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>落库核对（执行后）</span>
                  
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>字段名称</th><th>老系统</th><th>新系统</th><th>校验结论</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>人员姓名</td><td>陶红龙</td><td>陶红龙</td><td className="cell-ok">一致</td></tr><tr><td>人员编码</td><td>01081190</td><td></td><td className="cell-danger">缺失</td></tr><tr><td>证书名称</td><td>安全生产管理资格证书</td><td>安全生产管理资格证书</td><td className="cell-ok">一致</td></tr><tr><td>证书编号</td><td>340503198001019876</td><td>340503198001019876</td><td className="cell-ok">一致</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  
    </div>
  );
}
