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
        <div className="k">老系统证书总数</div>
        <div className="v">40735</div>
      </div>
      <div className="pill">
        <div className="k">可直接迁移</div>
        <div className="v">40211</div>
      </div>
      <div className="pill">
        <div className="k">需业务确认</div>
        <div className="v">524</div>
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
        <div className="filterbar-label">人员姓名</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入人员姓名" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">所属单位</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入所属单位" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">准备状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="可直接迁移">可直接迁移</option><option value="需业务确认">需业务确认</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书类型</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="主要负责人安全合格证">主要负责人安全合格证</option><option value="安全管理人员资格证">安全管理人员资格证</option><option value="特种作业资格证">特种作业资格证</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="有效">有效</option><option value="临期">临期</option><option value="过期">过期</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书有效期</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="date" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="date" className="filterbar-control" defaultValue="2026-02-28" />
        </div></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出问题清单</button><button type="button" className="btn" onClick={() => goto("/edu/trainer/certificate-management-migration-result")}>迁移</button></div>
        </div>
      </div>

      <Card title="待处理证书清单" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>准备状态</th><th>业务处理建议</th><th>人员姓名</th><th>所属单位</th><th>证书名称</th><th>证书编号</th><th>证书类型</th><th>证书有效期</th><th>复审信息</th><th>换证信息</th><th>数据完整性</th><th>登记人</th><th>登记时间</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td className="cell-ok">可直接迁移</td><td>按计划迁移</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>主要负责人安全合格证</td><td>2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td className="cell-ok">完整</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请先确认人员编码</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td>安全管理人员资格证</td><td className="cell-overdue">2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td className="cell-warn">缺人员编码映射</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td className="cell-ok">可直接迁移</td><td>按计划迁移</td><td>高杨</td><td>中科炼化-工程管理一班</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>高级证书测试测试测试</button></td><td>4534324534242</td><td>特种作业资格证</td><td className="cell-warn">2026-02-28</td><td>否 / - / -</td><td>是 / 7年 / 2033-02-26</td><td className="cell-ok">完整</td><td>肖鹏</td><td>2026-02-12</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td className="cell-ok">可直接迁移</td><td>按计划迁移</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>主要负责人安全合格证</td><td>2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td className="cell-ok">完整</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请先确认人员编码</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td>安全管理人员资格证</td><td className="cell-overdue">2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td className="cell-warn">缺人员编码映射</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td className="cell-ok">可直接迁移</td><td>按计划迁移</td><td>高杨</td><td>中科炼化-工程管理一班</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>高级证书测试测试测试</button></td><td>4534324534242</td><td>特种作业资格证</td><td className="cell-warn">2026-02-28</td><td>否 / - / -</td><td>是 / 7年 / 2033-02-26</td><td className="cell-ok">完整</td><td>肖鹏</td><td>2026-02-12</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td className="cell-ok">可直接迁移</td><td>按计划迁移</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>主要负责人安全合格证</td><td>2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td className="cell-ok">完整</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td className="cell-warn">需业务确认</td><td className="cell-warn">请先确认人员编码</td><td>陶红龙</td><td>安徽石油-向山加油站</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产管理资格证书</button></td><td>340503198001019876</td><td>安全管理人员资格证</td><td className="cell-overdue">2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td className="cell-warn">缺人员编码映射</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td className="cell-ok">可直接迁移</td><td>按计划迁移</td><td>高杨</td><td>中科炼化-工程管理一班</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>高级证书测试测试测试</button></td><td>4534324534242</td><td>特种作业资格证</td><td className="cell-warn">2026-02-28</td><td>否 / - / -</td><td>是 / 7年 / 2033-02-26</td><td className="cell-ok">完整</td><td>肖鹏</td><td>2026-02-12</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td className="cell-ok">可直接迁移</td><td>按计划迁移</td><td>牛敬明</td><td>安徽石油-安庆石油</td><td><button type="button" className="table-link-btn" onClick={() => openModal("drill-detail", "")}>安全生产知识和管理能力考核合格证</button></td><td>342301197305001234</td><td>主要负责人安全合格证</td><td>2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td>是 / 3年 / 2026-06-06</td><td className="cell-ok">完整</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="业务说明" desc="">
        <div className="grid grid-2">
          
      <div className="pill">
        <div className="k">本页面用于业务负责人迁移前核对：确认人员、证书、复审换证信息完整后再提交迁移。</div>
        <div className="v">（示例值）</div>
      </div>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">证书迁移处理详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={() => navigator?.clipboard?.writeText("老系统记录号=OLD-CERT-000124; 准备批次=PREP-20260301-01; 人员=陶红龙; 证书编号=340503198001019876; 准备状态=需业务确认; 建议=请先确认人员编码")}>复制工单信息</button><button type="button" className="btn" onClick={closeModal}>关闭</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">处理摘要</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">人员姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="陶红龙" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">证书编号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="340503198001019876" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">当前状态:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="需业务确认" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">业务处理建议:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="请先确认人员编码归属并补全映射关系，确认后再执行迁移。" /></div>
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
                      <tr><td>人员编码</td><td>01081190</td><td></td><td className="cell-danger">需补全</td></tr><tr><td>证书类型</td><td>安全管理人员资格证（安全管理人员）</td><td>安全管理人员资格证</td><td className="cell-warn">建议确认</td></tr><tr><td>人员姓名</td><td>陶红龙</td><td>陶红龙</td><td className="cell-ok">无风险</td></tr><tr><td>所属单位</td><td>安徽石油-向山加油站</td><td>安徽石油-向山加油站</td><td className="cell-ok">无风险</td></tr><tr><td>证书名称</td><td>安全生产管理资格证书</td><td>安全生产管理资格证书</td><td className="cell-ok">无风险</td></tr><tr><td>证书编号</td><td>340503198001019876</td><td>340503198001019876</td><td className="cell-ok">无风险</td></tr><tr><td>证书小类</td><td></td><td></td><td className="cell-ok">空值允许</td></tr><tr><td>发证机关级别</td><td>国家/地方政府发证</td><td>国家/地方政府发证</td><td className="cell-ok">无风险</td></tr><tr><td>发证机关</td><td>马鞍山市应急管理局</td><td>马鞍山市应急管理局</td><td className="cell-ok">无风险</td></tr><tr><td>证书生效日期</td><td>2020-07-10</td><td>2020-07-10</td><td className="cell-ok">无风险</td></tr><tr><td>证书有效期</td><td>2023-07-10</td><td>2023-07-10</td><td className="cell-ok">无风险</td></tr><tr><td>复审信息</td><td>是 / 3年 / 2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td className="cell-ok">无风险</td></tr><tr><td>换证信息</td><td>是 / 3年 / 2023-07-10</td><td>是 / 3年 / 2023-07-10</td><td className="cell-ok">无风险</td></tr>
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
