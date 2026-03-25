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
        <div className="v">TP-BATCH-20260301-01</div>
      </div>
      <div className="pill">
        <div className="k">提交迁移数</div>
        <div className="v">1328</div>
      </div>
      <div className="pill">
        <div className="k">导入成功</div>
        <div className="v">1291</div>
      </div>
      <div className="pill">
        <div className="k">需业务处理</div>
        <div className="v">37</div>
      </div>
      <div className="pill">
        <div className="k">已导入待补充</div>
        <div className="v">26</div>
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
        <div className="filterbar-label">计划代码</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入计划代码" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训计划名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训计划名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">执行结果</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="导入成功">导入成功</option><option value="需业务处理">需业务处理</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">缺失项类型</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="主办单位">主办单位</option><option value="培训内容">培训内容</option><option value="承办单位">承办单位</option><option value="附件">附件</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">迁移单号</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入迁移单号" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn" onClick={() => goto("/edu/trainer/training-plan-management-migration-query")}>返回准备台账</button><button type="button" className="btn">导出待处理清单</button></div>
        </div>
      </div>

      <Card title="迁移执行明细" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>执行结果</th><th>待处理原因</th><th>迁移单号</th><th>年度</th><th>计划代码</th><th>培训计划名称</th><th>培训对象</th><th>主办单位</th><th>培训内容</th><th>补充建议</th><th>办班地点</th><th>业务处理状态</th><th>登记人</th><th>登记时间</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td className="cell-ok">导入成功</td><td>-</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260212162324146</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼化企业安全管理人员年度培训计划</button></td><td>安全管理人员</td><td>中科（广东）炼化</td><td>年度安全管理课程与实操演练</td><td>-</td><td>湛江培训中心</td><td>已完成</td><td>李晓</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td className="cell-danger">需业务处理</td><td className="cell-danger">必填缺失: 主办单位</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260206165935562</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>特种作业取证与复审培训计划</button></td><td>特种作业人员</td><td></td><td>特种作业复审与案例分析</td><td>补主办单位，建议同步补承办单位与附件</td><td>成都培训中心</td><td className="cell-warn">待业务确认</td><td>周楠</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td className="cell-ok">导入成功</td><td>-</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260212162324146</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼化企业安全管理人员年度培训计划</button></td><td>安全管理人员</td><td>中科（广东）炼化</td><td>年度安全管理课程与实操演练</td><td>-</td><td>湛江培训中心</td><td>已完成</td><td>李晓</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td className="cell-danger">需业务处理</td><td className="cell-danger">必填缺失: 主办单位</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260206165935562</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>特种作业取证与复审培训计划</button></td><td>特种作业人员</td><td></td><td>特种作业复审与案例分析</td><td>补主办单位，建议同步补承办单位与附件</td><td>成都培训中心</td><td className="cell-warn">待业务确认</td><td>周楠</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td className="cell-ok">导入成功</td><td>-</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260212162324146</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼化企业安全管理人员年度培训计划</button></td><td>安全管理人员</td><td>中科（广东）炼化</td><td>年度安全管理课程与实操演练</td><td>-</td><td>湛江培训中心</td><td>已完成</td><td>李晓</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td className="cell-danger">需业务处理</td><td className="cell-danger">必填缺失: 主办单位</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260206165935562</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>特种作业取证与复审培训计划</button></td><td>特种作业人员</td><td></td><td>特种作业复审与案例分析</td><td>补主办单位，建议同步补承办单位与附件</td><td>成都培训中心</td><td className="cell-warn">待业务确认</td><td>周楠</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td className="cell-ok">导入成功</td><td>-</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260212162324146</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼化企业安全管理人员年度培训计划</button></td><td>安全管理人员</td><td>中科（广东）炼化</td><td>年度安全管理课程与实操演练</td><td>-</td><td>湛江培训中心</td><td>已完成</td><td>李晓</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td className="cell-danger">需业务处理</td><td className="cell-danger">必填缺失: 主办单位</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260206165935562</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>特种作业取证与复审培训计划</button></td><td>特种作业人员</td><td></td><td>特种作业复审与案例分析</td><td>补主办单位，建议同步补承办单位与附件</td><td>成都培训中心</td><td className="cell-warn">待业务确认</td><td>周楠</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td className="cell-ok">导入成功</td><td>-</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260212162324146</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>炼化企业安全管理人员年度培训计划</button></td><td>安全管理人员</td><td>中科（广东）炼化</td><td>年度安全管理课程与实操演练</td><td>-</td><td>湛江培训中心</td><td>已完成</td><td>李晓</td><td>2026-03-01</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td className="cell-danger">需业务处理</td><td className="cell-danger">必填缺失: 主办单位</td><td>TP-BATCH-20260301-01</td><td>2026</td><td>20260206165935562</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>特种作业取证与复审培训计划</button></td><td>特种作业人员</td><td></td><td>特种作业复审与案例分析</td><td>补主办单位，建议同步补承办单位与附件</td><td>成都培训中心</td><td className="cell-warn">待业务确认</td><td>周楠</td><td>2026-03-01</td>
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
                <div className="modal-title">培训计划迁移执行业务详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={() => navigator?.clipboard?.writeText("迁移单号=TP-BATCH-20260301-01; 老系统记录号=OLD-PLAN-000221; 年度=2026; 计划代码=20260206165935562; 计划名称=特种作业取证与复审培训计划; 执行结果=需业务处理; 缺失项=主办单位,承办单位,附件")}>复制排查信息</button><button type="button" className="btn" onClick={closeModal}>关闭</button></div>
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
        <div className="cert-field-label">计划代码:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="20260206165935562" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训计划名称:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="特种作业取证与复审培训计划" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训对象:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="特种作业人员" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训天数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="888" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">主办单位:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训内容:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="特种作业复审与案例分析" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">承办单位:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">附件:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">执行结果:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="需业务处理" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">待处理原因:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="主办单位缺失；承办单位与附件未维护。请补全后重跑该条迁移。" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">业务处理状态:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="待业务确认" /></div>
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
                      <tr><td>年度</td><td>2026</td><td>2026</td><td className="cell-ok">一致</td></tr><tr><td>培训计划名称</td><td>特种作业取证与复审培训计划</td><td>特种作业取证与复审培训计划</td><td className="cell-ok">一致</td></tr><tr><td>培训对象</td><td>特种作业人员</td><td>特种作业人员</td><td className="cell-ok">一致</td></tr><tr><td>培训天数</td><td>888</td><td>888</td><td className="cell-ok">一致</td></tr><tr><td>主办单位</td><td></td><td></td><td className="cell-danger">缺失</td></tr><tr><td>培训内容</td><td>特种作业复审与案例分析</td><td>特种作业复审与案例分析</td><td className="cell-ok">一致</td></tr><tr><td>承办单位</td><td></td><td></td><td className="cell-warn">缺失可补</td></tr><tr><td>附件</td><td></td><td></td><td className="cell-warn">缺失可补</td></tr>
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
