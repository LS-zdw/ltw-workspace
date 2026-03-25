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
      
      <Card title="准备情况概览" desc="">
        <div className="metrics-row">
          
      <div className="pill">
        <div className="k">老系统记录总数</div>
        <div className="v">3862</div>
      </div>
      <div className="pill">
        <div className="k">可直接迁移</div>
        <div className="v">3576</div>
      </div>
      <div className="pill">
        <div className="k">需业务确认</div>
        <div className="v">286</div>
      </div>
      <div className="pill">
        <div className="k">待补充关键信息</div>
        <div className="v">173</div>
      </div>
      <div className="pill">
        <div className="k">新系统已导入</div>
        <div className="v">0</div>
      </div>
        </div>
      </Card>

      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left"><div className="filterbar-item">
        <div className="filterbar-label">年度</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训班名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训班名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训计划名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训计划名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">主办单位</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入主办单位" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">准备状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="可直接迁移">可直接迁移</option><option value="需业务确认">需业务确认</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">缺失项类型</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="培训对象">培训对象</option><option value="主办单位">主办单位</option><option value="培训方式">培训方式</option><option value="培训地点">培训地点</option><option value="培训内容">培训内容</option>
        </select></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出问题清单</button><button type="button" className="btn" onClick={() => goto("/edu/trainer/training-record-migration-query")}>查看老系统原样页</button><button type="button" className="btn" onClick={() => goto("/edu/trainer/training-record-management-migration-result")}>迁移</button></div>
        </div>
      </div>

      <Card title="待处理培训记录清单" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>准备状态</th><th>业务处理建议</th><th>年度</th><th>培训班名称</th><th>培训计划名称</th><th>培训开始时间</th><th>培训结束时间</th><th>培训对象</th><th>主办单位</th><th>承办单位</th><th>培训方式</th><th>培训地点</th><th>培训内容</th><th>是否发证</th><th>登记部门</th><th>登记人</th><th>登记时间</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td className="cell-ok">可直接迁移</td><td>按记录迁移</td><td>2026</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>班组长安全提升一期</button></td><td>2026年班组长安全履职能力提升计划</td><td>2026-02-24</td><td>2026-03-07</td><td>一线班组长与安全员</td><td>中科（广东）炼化</td><td>湖南石油</td><td>集中面授</td><td>湛江培训中心A栋301</td><td>班组安全职责、风险辨识、隐患整改闭环</td><td>是</td><td>安环部</td><td>李晓</td><td>2026-02-18</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请补充培训对象，建议同步核对培训方式</td><td>2026</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>承包商入场培训（二期）</button></td><td>承包商高风险作业安全专项计划</td><td>2026-02-10</td><td>2026-02-11</td><td></td><td>西南油气</td><td>江苏油田</td><td></td><td>南京培训中心2号楼</td><td>动火、受限空间作业票证与应急处置流程</td><td>是</td><td>运行三部</td><td>周楠</td><td>2026-02-19</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请补充主办单位与培训地点</td><td>2025</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>环保法规专题班</button></td><td>环保合规与清洁生产培训计划</td><td>2025-09-03</td><td>2025-09-04</td><td>环保管理与运行岗位人员</td><td></td><td>胜利油田</td><td>集中面授</td><td></td><td>危废管理、排放合规与台账管理</td><td>否</td><td>安环部</td><td>王晨</td><td>2025-09-02</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td className="cell-ok">可直接迁移</td><td>按记录迁移</td><td>2026</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>班组长安全提升一期</button></td><td>2026年班组长安全履职能力提升计划</td><td>2026-02-24</td><td>2026-03-07</td><td>一线班组长与安全员</td><td>中科（广东）炼化</td><td>湖南石油</td><td>集中面授</td><td>湛江培训中心A栋301</td><td>班组安全职责、风险辨识、隐患整改闭环</td><td>是</td><td>安环部</td><td>李晓</td><td>2026-02-18</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请补充培训对象，建议同步核对培训方式</td><td>2026</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>承包商入场培训（二期）</button></td><td>承包商高风险作业安全专项计划</td><td>2026-02-10</td><td>2026-02-11</td><td></td><td>西南油气</td><td>江苏油田</td><td></td><td>南京培训中心2号楼</td><td>动火、受限空间作业票证与应急处置流程</td><td>是</td><td>运行三部</td><td>周楠</td><td>2026-02-19</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请补充主办单位与培训地点</td><td>2025</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>环保法规专题班</button></td><td>环保合规与清洁生产培训计划</td><td>2025-09-03</td><td>2025-09-04</td><td>环保管理与运行岗位人员</td><td></td><td>胜利油田</td><td>集中面授</td><td></td><td>危废管理、排放合规与台账管理</td><td>否</td><td>安环部</td><td>王晨</td><td>2025-09-02</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td className="cell-ok">可直接迁移</td><td>按记录迁移</td><td>2026</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>班组长安全提升一期</button></td><td>2026年班组长安全履职能力提升计划</td><td>2026-02-24</td><td>2026-03-07</td><td>一线班组长与安全员</td><td>中科（广东）炼化</td><td>湖南石油</td><td>集中面授</td><td>湛江培训中心A栋301</td><td>班组安全职责、风险辨识、隐患整改闭环</td><td>是</td><td>安环部</td><td>李晓</td><td>2026-02-18</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请补充培训对象，建议同步核对培训方式</td><td>2026</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>承包商入场培训（二期）</button></td><td>承包商高风险作业安全专项计划</td><td>2026-02-10</td><td>2026-02-11</td><td></td><td>西南油气</td><td>江苏油田</td><td></td><td>南京培训中心2号楼</td><td>动火、受限空间作业票证与应急处置流程</td><td>是</td><td>运行三部</td><td>周楠</td><td>2026-02-19</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请补充主办单位与培训地点</td><td>2025</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>环保法规专题班</button></td><td>环保合规与清洁生产培训计划</td><td>2025-09-03</td><td>2025-09-04</td><td>环保管理与运行岗位人员</td><td></td><td>胜利油田</td><td>集中面授</td><td></td><td>危废管理、排放合规与台账管理</td><td>否</td><td>安环部</td><td>王晨</td><td>2025-09-02</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td className="cell-ok">可直接迁移</td><td>按记录迁移</td><td>2026</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>班组长安全提升一期</button></td><td>2026年班组长安全履职能力提升计划</td><td>2026-02-24</td><td>2026-03-07</td><td>一线班组长与安全员</td><td>中科（广东）炼化</td><td>湖南石油</td><td>集中面授</td><td>湛江培训中心A栋301</td><td>班组安全职责、风险辨识、隐患整改闭环</td><td>是</td><td>安环部</td><td>李晓</td><td>2026-02-18</td>
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
                <div className="modal-title">培训记录迁移处理详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={() => navigator?.clipboard?.writeText("老系统记录号=OLD-RECORD-000387; 准备批次=TR-PREP-20260301-01; 年度=2026; 培训班名称=承包商入场培训（二期）; 计划名称=承包商高风险作业安全专项计划; 准备状态=需业务确认; 缺失项=培训对象,培训方式")}>复制工单信息</button><button type="button" className="btn" onClick={closeModal}>关闭</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">处理摘要</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">年度:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2026" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训班名称:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="承包商入场培训（二期）" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训计划名称:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="承包商高风险作业安全专项计划" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训开始时间:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2026-02-10" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训结束时间:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2026-02-11" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训对象:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">主办单位:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="西南油气" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">承办单位:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="江苏油田" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训方式:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训地点:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="南京培训中心2号楼" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训内容:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="动火、受限空间作业票证与应急处置流程" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">当前状态:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="需业务确认" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">业务处理建议:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="请先补充培训对象；培训方式可按历史签到记录补录为集中面授或外出研修。" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>重点核对项</span>
                  
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>核对项</th><th>老系统值</th><th>系统拟导入值</th><th>处理结论</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>培训班名称</td><td>承包商入场培训（二期）</td><td>承包商入场培训（二期）</td><td className="cell-ok">无风险</td></tr><tr><td>培训计划名称</td><td>承包商高风险作业安全专项计划</td><td>承包商高风险作业安全专项计划</td><td className="cell-ok">无风险</td></tr><tr><td>培训开始时间</td><td>2026-02-10</td><td>2026-02-10</td><td className="cell-ok">无风险</td></tr><tr><td>培训结束时间</td><td>2026-02-11</td><td>2026-02-11</td><td className="cell-ok">无风险</td></tr><tr><td>培训对象</td><td></td><td></td><td className="cell-danger">需补充</td></tr><tr><td>主办单位</td><td>西南油气</td><td>西南油气</td><td className="cell-ok">无风险</td></tr><tr><td>培训方式</td><td></td><td></td><td className="cell-warn">建议补充</td></tr><tr><td>培训地点</td><td>南京培训中心2号楼</td><td>南京培训中心2号楼</td><td className="cell-ok">无风险</td></tr>
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
