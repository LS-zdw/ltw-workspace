import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "/src/components/ui/Card.jsx";

const certificateTypes = [
  "安全管理人员资格证",
  "注册安全工程师",
  "消防设施操作员",
  "主要负责人安全资格证",
  "HSE关键岗位资格",
  "集团公司HSE审核员资格",
  "其他"
];

const enterpriseTree = [
  {
    name: "中国石化集团",
    children: ["全部企业", "中科炼化", "镇海炼化", "茂名石化", "洛阳石化", "九江石化", "广州石化", "福建联合", "仪征化纤", "天津石化", "海南炼化", "扬子石化"]
  }
];

export default function Page() {
  const navigate = useNavigate();
  const projectName = new URLSearchParams(window.location.search).get("project");
  const [activeModal, setActiveModal] = React.useState(null);
  const [batchReviewRows, setBatchReviewRows] = React.useState([
    {
      id: 1,
      name: "王博",
      org: "总部机关/体系室",
      certName: "集团公司HSE审核员证",
      certCode: "HQ-AUD-2023-026",
      certType: "集团公司HSE审核员资格",
      oldValidDate: "2026-06-30",
      oldAttachment: "有",
      newAttachmentName: "",
      isEditingAttachment: false
    }
  ]);
  const [selectedEnterprise, setSelectedEnterprise] = React.useState("全部企业");
  const [drillTarget, setDrillTarget] = React.useState("");
  const [drillProject, setDrillProject] = React.useState(projectName || "");
  const [modalStates, setModalStates] = React.useState({});
  const [filterCertType, setFilterCertType] = React.useState(certificateTypes[0]);
  const [formCertType, setFormCertType] = React.useState(certificateTypes[0]);
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
  const handleMainTableDrillCapture = (e) => {
    const trigger = e.target.closest(".table-link-btn");
    if (!trigger) return;
    const row = trigger.closest("tbody tr");
    if (!row) return;
    const firstRow = e.currentTarget.querySelector("tbody tr");
    if (row !== firstRow) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const renderRowOps = (firstRow = false) => (
    <div className="table-op-inline">
      <button type="button" className="table-op-link table-op-link-edit" onClick={firstRow ? () => openModal("cert-edit", "") : undefined}>编辑</button>
      <button type="button" className="table-op-link table-op-link-delete">删除</button>
    </div>
  );
  const renderAttachmentTrigger = (label = "点击上传") => (
    <button type="button" className="table-link-btn">{label}</button>
  );
  const renderListAttachment = (value) => (
    value === "有" ? <button type="button" className="table-link-btn">下载</button> : value
  );
  const startBatchAttachmentEdit = (row) => {
    setBatchReviewRows((prev) => prev.map((item) => (
      item.id === row.id
        ? {
            ...item,
            isEditingAttachment: true,
            newAttachmentName: item.newAttachmentName || `${item.certName}-换证附件.pdf`
          }
        : item
    )));
  };
  const cancelBatchAttachmentEdit = (row) => {
    setBatchReviewRows((prev) => prev.map((item) => (
      item.id === row.id ? { ...item, isEditingAttachment: false } : item
    )));
  };
  const updateBatchAttachmentDraft = (row, value) => {
    setBatchReviewRows((prev) => prev.map((item) => (
      item.id === row.id ? { ...item, newAttachmentName: value } : item
    )));
  };
  const saveBatchAttachment = (row) => {
    setBatchReviewRows((prev) => prev.map((item) => (
      item.id === row.id
        ? {
            ...item,
            newAttachmentName: (item.newAttachmentName || `${item.certName}-换证附件.pdf`).trim(),
            isEditingAttachment: false
          }
        : item
    )));
  };
  const renderBatchAttachmentCell = (row) => {
    if (row.isEditingAttachment) {
      return (
        <div style={{ display: "grid", gap: 6, minWidth: 180 }}>
          <input
            className="cert-field-control"
            value={row.newAttachmentName}
            onChange={(e) => updateBatchAttachmentDraft(row, e.target.value)}
            placeholder="请输入附件名称"
          />
          <div className="table-op-inline">
            <button type="button" className="table-link-btn" onClick={() => saveBatchAttachment(row)}>保存</button>
            <button type="button" className="table-link-btn" onClick={() => cancelBatchAttachmentEdit(row)}>取消</button>
          </div>
        </div>
      );
    }
    return (
      <button type="button" className="table-link-btn" onClick={() => startBatchAttachmentEdit(row)}>
        上传
      </button>
    );
  };

  return (
    <div className="stack cert-enterprise-updated">
      <div style={{ display: "grid", gridTemplateColumns: "210px minmax(0, 1fr)", gap: 12, alignItems: "start" }}>
        <div style={{ border: "1px solid #bfc7d5", background: "#f8f8f8", padding: 8, minHeight: 640 }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>所属企业筛选</div>
          <div style={{ display: "grid", gridTemplateColumns: "32px minmax(0, 1fr)", alignItems: "center", gap: 4, marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: "#475569" }}>名称:</div>
            <input className="filterbar-control" placeholder="请输入企业名称" defaultValue="" style={{ height: 24, minHeight: 24, fontSize: 12 }} />
          </div>
          <div style={{ border: "1px solid #b8c8e8", background: "#fff", padding: 8, minHeight: 560, fontSize: 12, lineHeight: 1.55 }}>
            {enterpriseTree.map((group) => (
              <div key={group.name}>
                <label style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontWeight: selectedEnterprise === group.name ? 700 : 400 }}>
                  <input type="radio" name="enterpriseTree" checked={selectedEnterprise === group.name} onChange={() => setSelectedEnterprise(group.name)} />
                  {group.name}
                </label>
                <div style={{ display: "grid", gap: 2, paddingLeft: 26, marginTop: 2 }}>
                  {["风险室", "综合管理室", "体系室", "过程室", "应急室", "健康室", "督查室", "公共安全室"].map((item) => (
                    <label key={item} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontWeight: selectedEnterprise === item ? 700 : 400 }}>
                      <input type="radio" name="enterpriseTree" checked={selectedEnterprise === item} onChange={() => setSelectedEnterprise(item)} />
                      {item}
                    </label>
                  ))}
                </div>
                <div style={{ display: "grid", gap: 2, marginTop: 6 }}>
                  {["宁波工程公司", "镇海炼化", "中石化江汉石油有限公司", "中国石化销售有限公司", "中原油田", "河南油田", "武汉油田", "江苏油田", "华北石油局", "华东油田", "西南油气"].map((item) => (
                    <label key={item} style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontWeight: selectedEnterprise === item ? 700 : 400 }}>
                      <input type="radio" name="enterpriseTree" checked={selectedEnterprise === item} onChange={() => setSelectedEnterprise(item)} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stack">
          <div className="filterbar">
            <div className="filterbar-row" style={{ alignItems: "flex-start", justifyContent: "space-between" }}>
              <div className="filterbar-left"><div className="filterbar-item">
        <div className="filterbar-label">所属企业</div>
        <div className="filterbar-input"><input className="filterbar-control" value={selectedEnterprise} readOnly /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">姓名</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入姓名" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">组织机构</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入企业或部门" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入证书名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书种类</div>
        <div className="filterbar-input"><select className="filterbar-control" value={filterCertType} onChange={(e) => setFilterCertType(e.target.value)}>
          {certificateTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">是否异常</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="否">否</option><option value="是">是</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">登记日期</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="选择日期" defaultValue="" /></div>
      </div></div>
              <div style={{ display: "grid", gap: 8, marginLeft: 12, flex: "0 0 auto", justifyItems: "end" }}>
                <div className="filterbar-query-actions" style={{ marginLeft: 0 }}>
                  <button type="button" className="btn btn-primary">查询</button>
                  <button type="button" className="btn">重置</button>
                </div>
                <div className="filterbar-right-actions" style={{ marginLeft: 0, whiteSpace: "nowrap" }}>
                  <button type="button" className="btn btn-primary" onClick={() => openModal("cert-add", drillTarget)}>新增</button>
                  <button type="button" className="btn">导入</button>
                  <button type="button" className="btn">导出</button>
                  <button type="button" className="btn">模板下载</button>
                  <button type="button" className="btn btn-primary" onClick={() => openModal("batch-review", drillTarget)}>批量换证</button>
                </div>
              </div>
            </div>
          </div>

          <Card title="教育培训（更新）-证书管理-总部端列表" desc="">
            <div className="table-wrap">
              <table className="proto-table" onClickCapture={handleMainTableDrillCapture}>
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>组织机构</th><th>岗位</th><th>证书名称</th><th>证书编码</th><th>证书种类</th><th>初领日期</th><th>证书有效期</th><th>是否异常</th><th>关联培训项目</th><th>登记部门</th><th>登记人</th><th>登记日期</th><th>证书附件</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>张铭</td><td>总部机关/风险室</td><td>安全监管主管</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>主要负责人安全资格证</button></td><td>HQ-AQ-2024-001</td><td>主要负责人安全资格证</td><td>2024-01-15</td><td>2027-01-14</td><td>否</td><td>总部负责人复审</td><td>风险室</td><td>李倩</td><td>2024-01-16</td><td>{renderListAttachment("有")}</td><td>{renderRowOps(true)}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>李倩</td><td>总部机关/综合管理室</td><td>培训管理专员</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>HSE关键岗位资格证</button></td><td>HQ-HSE-2024-018</td><td>HSE关键岗位资格</td><td>2024-03-20</td><td>2027-03-19</td><td>否</td><td>集团HSE关键岗位培训</td><td>综合管理室</td><td>王博</td><td>2024-03-21</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>王博</td><td>总部机关/体系室</td><td>体系审核主管</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>集团公司HSE审核员证</button></td><td>HQ-AUD-2023-026</td><td>集团公司HSE审核员资格</td><td>2023-07-01</td><td className="cell-warn">2026-06-30</td><td>否</td><td>集团HSE审核员复训</td><td>体系室</td><td>赵宁</td><td>2023-07-02</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>赵宁</td><td>总部机关/过程室</td><td>过程安全专家</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>注册安全工程师证</button></td><td>HQ-ZA-2021-054</td><td>注册安全工程师</td><td>2021-04-12</td><td className="cell-danger">2024-04-11</td><td className="cell-danger">是</td><td>注册安全工程师延续登记</td><td>过程室</td><td>肖然</td><td>2024-04-15</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>陈峰</td><td>总部机关/应急室</td><td>应急管理主管</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>安全管理人员资格证</button></td><td>HQ-AM-2022-089</td><td>安全管理人员资格证</td><td>2022-11-18</td><td>2028-11-17</td><td>否</td><td>安全管理人员能力提升</td><td>应急室</td><td>郑宁</td><td>2024-12-03</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>刘洋</td><td>总部机关/健康室</td><td>职业健康专员</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>消防设施操作员证</button></td><td>HQ-XF-2022-119</td><td>消防设施操作员</td><td>2022-09-05</td><td>2025-09-04</td><td className="cell-danger">是</td><td>消防设施操作员复审</td><td>健康室</td><td>陈雪</td><td>2025-09-10</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>周凯</td><td>总部机关/督查室</td><td>安全督查主管</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>集团公司HSE审核员证</button></td><td>HQ-AUD-2025-031</td><td>集团公司HSE审核员资格</td><td>2025-05-01</td><td>2028-04-30</td><td>否</td><td>集团HSE审核员取证</td><td>督查室</td><td>周超</td><td>2025-05-02</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>孙佳</td><td>总部机关/公共安全室</td><td>公共安全专员</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>HSE关键岗位资格证</button></td><td>HQ-HSE-2024-112</td><td>HSE关键岗位资格</td><td>2024-01-10</td><td>2027-01-09</td><td className="cell-warn">否</td><td>公共安全专项培训</td><td>公共安全室</td><td>肖然</td><td>2024-01-11</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>马骏</td><td>总部机关/风险室</td><td>安全分析岗</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>注册安全工程师证</button></td><td>HQ-ZA-2020-672</td><td>注册安全工程师</td><td>2020-11-06</td><td className="cell-danger">2023-11-05</td><td className="cell-danger">是</td><td>注册安全工程师复审</td><td>风险室</td><td>王敏</td><td>2023-11-10</td><td>{renderListAttachment("无")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>赵丽</td><td>总部机关/综合管理室</td><td>培训管理员</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>HSE关键岗位资格证</button></td><td>HQ-HSE-2025-077</td><td>HSE关键岗位资格</td><td>2025-04-18</td><td>2028-04-17</td><td>否</td><td>总部培训管理能力提升</td><td>综合管理室</td><td>赵丽</td><td>2025-04-19</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
            </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      {activeModal === "cert-add" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">证书新增</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书新增</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>姓名:</div>
                    <div className="cert-field-value"><div className="cert-picker">
                    <input className="cert-field-control" defaultValue="点击选择人员" readOnly />
                    <button type="button" className="btn" onClick={() => openModal("person-select", drillTarget)}>选择</button>
                  </div></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>组织机构:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编码:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertType} onChange={(e) => setFormCertType(e.target.value)}>
                      {certificateTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>初领日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书有效期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">是否异常:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="否"><option value="否">否</option><option value="是">是</option></select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">关联培训项目:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="请输入关联培训项目" defaultValue="" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="系统自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记人:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="系统自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="系统自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">证书附件:</div>
                    <div className="cert-field-value">{renderAttachmentTrigger()}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-primary">保存</button>
              </div>

              
            </div>
          </div>
        </div>
      ) : null}

      {activeModal === "cert-edit" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">证书编辑</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书编辑</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>姓名:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="张铭" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>组织机构:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="总部机关/风险室" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="安全监管主管" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="主要负责人安全资格证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编码:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="HQ-AQ-2024-001" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertType} onChange={(e) => setFormCertType(e.target.value)}>
                      {certificateTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>初领日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-01-15" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书有效期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2027-01-14" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">是否异常:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="否"><option value="否">否</option><option value="是">是</option></select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">关联培训项目:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="总部负责人复审" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="风险室" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记人:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="李倩" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-01-16" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">证书附件:</div>
                    <div className="cert-field-value">{renderAttachmentTrigger()}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button type="button" className="btn" onClick={closeModal}>取消</button>
                <button type="button" className="btn btn-primary">保存</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
  

      {activeModal === "cert-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">证书详情</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书详情</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>姓名:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="张铭" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>组织机构:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="总部机关/风险室" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="安全监管主管" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="主要负责人安全资格证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编码:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="HQ-AQ-2024-001" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="主要负责人安全资格证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>初领日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-01-15" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书有效期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2027-01-14" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">是否异常:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="否" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">关联培训项目:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="总部负责人复审" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="风险室" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记人:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="李倩" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-01-16" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">证书附件:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="有" readOnly /></div>
                  </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title">证书登记记录</div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>序号</th><th>登记类型</th><th>登记人</th><th>登记部门</th><th>登记日期</th><th>证书附件</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>1</td><td>发证</td><td>李倩</td><td>风险室</td><td>2024年01月16日</td><td><div className="table-op-inline"><button type="button" className="table-link-btn">预览</button><button type="button" className="table-link-btn">下载</button></div></td></tr><tr><td>2</td><td>换证</td><td>王博</td><td>综合管理室</td><td>2026年02月26日</td><td><div className="table-op-inline"><button type="button" className="table-link-btn">预览</button><button type="button" className="table-link-btn">下载</button></div></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  
      {activeModal === "batch-review" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">批量换证</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>待换证证书</span>
                  <div className="table-op-inline">
                    <button type="button" className="btn btn-danger">移除</button>
                  </div>
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>组织机构</th><th>证书名称</th><th>证书编码</th><th>证书种类</th><th>原证书有效期</th><th>原证书附件</th><th>新证附件</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchReviewRows.map((row, index) => (
                        <tr key={row.id}>
                          <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                          <td>{index + 1}</td>
                          <td>{row.name}</td>
                          <td>{row.org}</td>
                          <td>{row.certName}</td>
                          <td>{row.certCode}</td>
                          <td>{row.certType}</td>
                          <td>{row.oldValidDate}</td>
                          <td>{row.oldAttachment}</td>
                          <td>{renderBatchAttachmentCell(row)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">换证登记</div>
                <div className="cert-form-grid" style={{ gridTemplateColumns: "220px 1fr 220px 1fr 220px 1fr" }}>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label"><span className="required-mark">*</span>新证有效期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2029-03-08" /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label">登记人:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="李倩" readOnly /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="综合管理室" readOnly /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label">登记日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2026-03-09 09:02:22" readOnly /></div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button type="button" className="btn" onClick={closeModal}>取消</button>
                <button type="button" className="btn btn-primary">保存换证登记</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}


      {activeModal === "person-select" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">选择人员</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">选择人员</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">组织机构:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">工号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>总部人员</span>
                  <button type="button" className="btn btn-primary">新增</button>
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>姓名</th><th>员工编号</th><th>组织机构</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>张铭</td><td>HQ0001</td><td>总部机关/风险室</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>李倩</td><td>HQ0002</td><td>总部机关/综合管理室</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>王博</td><td>HQ0003</td><td>总部机关/体系室</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>赵宁</td><td>HQ0004</td><td>总部机关/过程室</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>孙佳</td><td>HQ0005</td><td>总部机关/公共安全室</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button type="button" className="btn" onClick={closeModal}>取消</button>
                <button type="button" className="btn btn-primary">保存</button>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  
    </div>
  );
}
