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
        <div className="filterbar-label">证书名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入关键字" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="- 请选择 -">
          <option value="- 请选择 -">- 请选择 -</option><option value="有效">有效</option><option value="无效">无效</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">姓名</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入姓名" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">企业名称</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="安徽石油">安徽石油</option><option value="中科炼化">中科炼化</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">工作单位</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入工作单位" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书种类</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="安全管理人员资格证">安全管理人员资格证</option><option value="主要负责人安全合格证">主要负责人安全合格证</option><option value="特种作业资格证">特种作业资格证</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书小类</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="高压电工作业">高压电工作业</option><option value="压力焊作业">压力焊作业</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">发证机构</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入发证机构" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书编号</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入证书编号" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">高级查询</button><button type="button" className="btn">清空</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-证书管理-迁移数据查询列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>企业名称</th><th>工作单位</th><th>证书种类</th><th>证书名称</th><th>发证/复审/换证日期</th><th>状态</th><th>复审周期</th><th>应复审日期</th><th>换证周期</th><th>应换证日期</th><th>证书编号</th><th>证书小类</th><th>发证机构</th><th>现任职务</th><th>行政级别</th><th>备注</th><th>登记部门</th><th>登记人</th><th>登记日期</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>牛敬明</button></td><td>安徽石油</td><td>安庆石油</td><td>安全生产知识和管理能力考核合格证</td><td>安全生产知识和管理能力考核合格证</td><td>2023-06-07</td><td>有效</td><td>3</td><td>2026-06-06</td><td>3</td><td>2026-06-06</td><td>342301197305001234</td><td></td><td>滁州市应急管理局</td><td>主办</td><td>一般管理人员</td><td></td><td>城南加油站</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>陶红龙</button></td><td>安徽石油</td><td>向山加油站</td><td>安全管理人员资格证（安全管理人员）</td><td>安全生产管理资格证书</td><td>2020-07-10</td><td>无效</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>340503198001019876</td><td></td><td>马鞍山市应急管理局</td><td>站长</td><td>一般管理人员</td><td></td><td>城东加油站</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>牛敬明</button></td><td>安徽石油</td><td>安庆石油</td><td>安全生产知识和管理能力考核合格证</td><td>安全生产知识和管理能力考核合格证</td><td>2023-06-07</td><td>有效</td><td>3</td><td>2026-06-06</td><td>3</td><td>2026-06-06</td><td>342301197305001234</td><td></td><td>滁州市应急管理局</td><td>主办</td><td>一般管理人员</td><td></td><td>城南加油站</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>陶红龙</button></td><td>安徽石油</td><td>向山加油站</td><td>安全管理人员资格证（安全管理人员）</td><td>安全生产管理资格证书</td><td>2020-07-10</td><td>无效</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>340503198001019876</td><td></td><td>马鞍山市应急管理局</td><td>站长</td><td>一般管理人员</td><td></td><td>城东加油站</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>牛敬明</button></td><td>安徽石油</td><td>安庆石油</td><td>安全生产知识和管理能力考核合格证</td><td>安全生产知识和管理能力考核合格证</td><td>2023-06-07</td><td>有效</td><td>3</td><td>2026-06-06</td><td>3</td><td>2026-06-06</td><td>342301197305001234</td><td></td><td>滁州市应急管理局</td><td>主办</td><td>一般管理人员</td><td></td><td>城南加油站</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>陶红龙</button></td><td>安徽石油</td><td>向山加油站</td><td>安全管理人员资格证（安全管理人员）</td><td>安全生产管理资格证书</td><td>2020-07-10</td><td>无效</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>340503198001019876</td><td></td><td>马鞍山市应急管理局</td><td>站长</td><td>一般管理人员</td><td></td><td>城东加油站</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>牛敬明</button></td><td>安徽石油</td><td>安庆石油</td><td>安全生产知识和管理能力考核合格证</td><td>安全生产知识和管理能力考核合格证</td><td>2023-06-07</td><td>有效</td><td>3</td><td>2026-06-06</td><td>3</td><td>2026-06-06</td><td>342301197305001234</td><td></td><td>滁州市应急管理局</td><td>主办</td><td>一般管理人员</td><td></td><td>城南加油站</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>陶红龙</button></td><td>安徽石油</td><td>向山加油站</td><td>安全管理人员资格证（安全管理人员）</td><td>安全生产管理资格证书</td><td>2020-07-10</td><td>无效</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>340503198001019876</td><td></td><td>马鞍山市应急管理局</td><td>站长</td><td>一般管理人员</td><td></td><td>城东加油站</td><td>孟芳芳</td><td>2024-04-03</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>牛敬明</button></td><td>安徽石油</td><td>安庆石油</td><td>安全生产知识和管理能力考核合格证</td><td>安全生产知识和管理能力考核合格证</td><td>2023-06-07</td><td>有效</td><td>3</td><td>2026-06-06</td><td>3</td><td>2026-06-06</td><td>342301197305001234</td><td></td><td>滁州市应急管理局</td><td>主办</td><td>一般管理人员</td><td></td><td>城南加油站</td><td>赵丽</td><td>2024-06-11</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>陶红龙</button></td><td>安徽石油</td><td>向山加油站</td><td>安全管理人员资格证（安全管理人员）</td><td>安全生产管理资格证书</td><td>2020-07-10</td><td>无效</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>3</td><td className="cell-overdue">2023-07-10</td><td>340503198001019876</td><td></td><td>马鞍山市应急管理局</td><td>站长</td><td>一般管理人员</td><td></td><td>城东加油站</td><td>孟芳芳</td><td>2024-04-03</td>
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
                <div className="modal-title">教育培训-证书管理-迁移数据详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn btn-primary">保存</button><button type="button" className="btn" onClick={closeModal}>返回</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书发证/复审/换证信息登记</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="陶红龙" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">职工编号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="01081190" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">工作单位:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="安全环保数质量部" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">现任职务/岗位:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="主办">
      <option value="主办">主办</option><option value="加油员">加油员</option><option value="站长">站长</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">行政级别:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="一般管理人员" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">证书名称:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="安全生产知识和管理能力考核合格证" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">证书编号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="140402197903181613" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">发证机关:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="滁州市应急管理局" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">发证机关类别:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="国家/地方政府发证">
      <option value="国家/地方政府发证">国家/地方政府发证</option><option value="集团公司发证">集团公司发证</option><option value="企业内部发证">企业内部发证</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">证书种类:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="安全生产知识和管理能力考核合格证" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">证书小类:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">发证/复审/换证日期:</div>
        <div className="cert-field-value"><input type="text" className="cert-field-control" defaultValue="2023-09-19" placeholder="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">是否复审:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="是">
      <option value="是">是</option><option value="否">否</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">复审周期:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="3年" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">下次复审日期:</div>
        <div className="cert-field-value"><input type="text" className="cert-field-control" defaultValue="2026-09-18" placeholder="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">是否换证:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="是">
      <option value="是">是</option><option value="否">否</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">换证周期:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="3年" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">下次换证日期:</div>
        <div className="cert-field-value"><input type="text" className="cert-field-control" defaultValue="2026-09-18" placeholder="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">备注（可填写证书复制/补发时间）:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">附件:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>发证/复审/换证记录</span>
                  
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>登记种类</th><th>发证/复审/换证日期</th><th>下次复审/换证日期</th><th>证书编号</th><th>登记人</th><th>登记部门/单位</th><th>登记时间</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>发证</td><td>2023-09-19</td><td>2026-09-18</td><td>140402197903181613</td><td>赵丽</td><td>安全环保数质量部</td><td>2024-06-11</td></tr>
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
