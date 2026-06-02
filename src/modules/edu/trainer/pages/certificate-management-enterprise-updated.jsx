import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "/src/components/ui/Card.jsx";

const certificateDict = {
  国家级: {
    "特种作业资格证（电工作业）": ["高压电工作业", "低压电工作业", "防爆电气作业"],
    "特种作业资格证（焊接与热切割作业）": ["熔化焊接与热切割作业", "压力焊作业", "钎焊作业", "电力电缆作业"],
    "特种作业资格证（高处作业）": ["登高架设作业", "高处安装、维护、拆除作业", "继电保护作业"],
    "特种作业资格证（制冷与空调作业）": ["制冷与空调设备运行操作作业", "制冷与空调设备安装修理作业", "电气试验作业"],
    "特种作业资格证（煤矿安全作业）": ["煤矿井下电气作业", "煤矿井下爆破作业", "煤矿安全监测监控作业", "煤矿瓦斯检查作业", "煤矿安全检查作业", "煤矿提升机操作作业", "煤矿采煤机（掘进机）操作作业", "煤矿瓦斯抽采作业", "煤矿防突作业", "煤矿探放水作业"],
    "特种作业资格证（石油天然气安全作业）": ["司钻作业"],
    "特种作业资格证（危险化学品安全作业）": ["光气及光气化工艺作业", "氯碱电解工艺作业", "氯化工艺作业", "硝化工艺作业", "合成氨工艺作业", "裂解（裂化）工艺作业", "氟化工艺作业", "加氢工艺作业", "重氮化工艺作业", "氧化工艺作业", "过氧化工艺作业", "胺基化工艺作业", "磺化工艺作业", "聚合工艺作业", "烷基化工艺作业", "化工自动化控制仪表作业"],
    "特种作业资格证（应急管理部认定的其他作业）": ["无"],
    "安全管理人员资格证": [""],
    "注册安全工程师": ["注册安全工程师（初级)", "注册安全工程师（中级)", "注册安全工程师（高级)"],
    "消防设施操作员证": ["消防设施操作员（初级）", "消防设施操作员（中级）", "消防设施操作员（高级）"],
    "主要负责人安全合格证": [""]
  },
  集团级: {
    HSE关键岗位资格: [""],
    集团公司HSE审核员资格: [""],
    红十字救护员证: [""]
  },
  企业级: {
    作业票监护人资格: [""],
    作业票审批人资格: [""],
    作业票开票人资格: [""]
  }
};

const firstCertificateType = (level) => Object.keys(certificateDict[level] || {})[0] || "";
const firstCertificateSubtype = (level, type) => (certificateDict[level]?.[type] || [""])[0] || "";
const certificateLevelLabels = {
  国家级: "国家/地方政府发证",
  集团级: "集团公司发证",
  企业级: "企业内部发证"
};

export default function Page() {
  const navigate = useNavigate();
  const projectName = new URLSearchParams(window.location.search).get("project");
  const [activeModal, setActiveModal] = React.useState(null);
  const [batchReviewRows, setBatchReviewRows] = React.useState([
    {
      id: 1,
      name: "尤红玉",
      org: "中科炼化/储运部",
      certName: "防爆电气证",
      certCode: "TZ-09761",
      certType: "特种作业资格证（电工作业）",
      certSubtype: "防爆电气作业",
      oldValidDate: "2026-06-30",
      oldAttachment: "有",
      newAttachmentName: "",
      isEditingAttachment: false
    }
  ]);
  const [drillTarget, setDrillTarget] = React.useState("");
  const [drillProject, setDrillProject] = React.useState(projectName || "");
  const [modalStates, setModalStates] = React.useState({});
  const [filterCertLevel, setFilterCertLevel] = React.useState("国家级");
  const [filterCertType, setFilterCertType] = React.useState(firstCertificateType("国家级"));
  const [filterCertSubtype, setFilterCertSubtype] = React.useState(firstCertificateSubtype("国家级", firstCertificateType("国家级")));
  const [formCertLevel, setFormCertLevel] = React.useState("国家级");
  const [formCertType, setFormCertType] = React.useState(firstCertificateType("国家级"));
  const [formCertSubtype, setFormCertSubtype] = React.useState(firstCertificateSubtype("国家级", firstCertificateType("国家级")));
  const updateFilterCertLevel = (level) => {
    const nextType = firstCertificateType(level);
    setFilterCertLevel(level);
    setFilterCertType(nextType);
    setFilterCertSubtype(firstCertificateSubtype(level, nextType));
  };
  const updateFilterCertType = (type) => {
    setFilterCertType(type);
    setFilterCertSubtype(firstCertificateSubtype(filterCertLevel, type));
  };
  const updateFormCertLevel = (level) => {
    const nextType = firstCertificateType(level);
    setFormCertLevel(level);
    setFormCertType(nextType);
    setFormCertSubtype(firstCertificateSubtype(level, nextType));
  };
  const updateFormCertType = (type) => {
    setFormCertType(type);
    setFormCertSubtype(firstCertificateSubtype(formCertLevel, type));
  };
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
      
      <div className="filterbar">
        <div className="filterbar-row" style={{ alignItems: "flex-start", justifyContent: "space-between" }}>
          <div className="filterbar-left"><div className="filterbar-item">
        <div className="filterbar-label">姓名</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入姓名" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">组织机构</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入企业或部门" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入证书名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">发证机关级别</div>
        <div className="filterbar-input"><select className="filterbar-control" value={filterCertLevel} onChange={(e) => updateFilterCertLevel(e.target.value)}>
          {Object.keys(certificateDict).map((level) => <option key={level} value={level}>{certificateLevelLabels[level]}</option>)}
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书种类</div>
        <div className="filterbar-input"><select className="filterbar-control" value={filterCertType} onChange={(e) => updateFilterCertType(e.target.value)}>
          {Object.keys(certificateDict[filterCertLevel] || {}).map((type) => <option key={type} value={type}>{type}</option>)}
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书小类</div>
        <div className="filterbar-input"><select className="filterbar-control" value={filterCertSubtype} onChange={(e) => setFilterCertSubtype(e.target.value)}>
          {(certificateDict[filterCertLevel]?.[filterCertType] || [""]).map((subtype) => <option key={subtype || "none"} value={subtype}>{subtype || "无"}</option>)}
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

      <Card title="教育培训-证书管理-企业端列表" desc="">
        <div className="table-wrap">
          <table className="proto-table" onClickCapture={handleMainTableDrillCapture}>
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>组织机构</th><th>岗位</th><th>证书名称</th><th>证书编码</th><th>发证机关级别</th><th>证书种类</th><th>证书小类</th><th>初领日期</th><th>证书有效期</th><th>是否异常</th><th>关联培训项目</th><th>登记部门</th><th>登记人</th><th>登记日期</th><th>证书附件</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>张亮</td><td>中科炼化/炼油三部</td><td>运行班长</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>安全合格证</button></td><td>AQ-01872</td><td>国家/地方政府发证</td><td>主要负责人安全合格证</td><td>无</td><td>2023-08-15</td><td>2026-08-14</td><td>否</td><td>负责人复审</td><td>炼油三部</td><td>王敏</td><td>2023-08-16</td><td>{renderListAttachment("有")}</td><td>{renderRowOps(true)}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>胡晓磊</td><td>中科炼化/公用工程部</td><td>设备工程师</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>高压电工证</button></td><td>TZ-11345</td><td>国家/地方政府发证</td><td>特种作业资格证（电工作业）</td><td>高压电工作业</td><td>2024-03-20</td><td>2027-03-19</td><td>否</td><td>电气取证</td><td>公用工程部</td><td>李倩</td><td>2024-03-21</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>尤红玉</td><td>中科炼化/储运部</td><td>仪表工程师</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>防爆电气证</button></td><td>TZ-09761</td><td>国家/地方政府发证</td><td>特种作业资格证（电工作业）</td><td>防爆电气作业</td><td>2023-07-01</td><td className="cell-warn">2026-06-30</td><td>否</td><td>防爆专项</td><td>储运部</td><td>周超</td><td>2023-07-02</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>高杨</td><td>中科炼化/工程管理一班</td><td>电气技师</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>高压电工证</button></td><td>TZ-05438</td><td>国家/地方政府发证</td><td>特种作业资格证（电工作业）</td><td>高压电工作业</td><td>2021-04-12</td><td className="cell-danger">2024-04-11</td><td className="cell-danger">是</td><td>电气复审</td><td>工程管理一班</td><td>肖鹏</td><td>2024-04-15</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>梁海江</td><td>中科炼化/安全环保部</td><td>安环主管</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>注安资格证</button></td><td>ZA-00658</td><td>国家/地方政府发证</td><td>注册安全工程师</td><td>注册安全工程师（中级)</td><td>2019-11-18</td><td>2029-11-17</td><td>否</td><td>安环提升</td><td>安全环保部</td><td>郑宁</td><td>2024-12-03</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>方月蒙</td><td>中科炼化/化工二部</td><td>化工操作工</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>危化作业证</button></td><td>WH-08119</td><td>国家/地方政府发证</td><td>特种作业资格证（危险化学品安全作业）</td><td>加氢工艺作业</td><td>2022-09-05</td><td>2025-09-04</td><td className="cell-danger">是</td><td>化工提升</td><td>化工二部</td><td>陈雪</td><td>2025-09-10</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>陈羽</td><td>中科炼化/储运部</td><td>储运班长</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>监护人证</button></td><td>JH-0231</td><td>企业内部发证</td><td>作业票监护人资格</td><td>无</td><td>2025-05-01</td><td>2027-04-30</td><td>否</td><td>作业票培训</td><td>储运部</td><td>周超</td><td>2025-05-02</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>王志鹏</td><td>中科炼化/工程管理一班</td><td>作业监护人</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>受限监护证</button></td><td>SX-0112</td><td>企业内部发证</td><td>作业票监护人资格</td><td>无</td><td>2024-01-10</td><td>2026-01-09</td><td className="cell-warn">否</td><td>作业票培训</td><td>工程管理一班</td><td>肖鹏</td><td>2024-01-11</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>刘洋</td><td>中科炼化/炼油三部</td><td>班组长</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>压力焊证</button></td><td>TZ-04672</td><td>国家/地方政府发证</td><td>特种作业资格证（焊接与热切割作业）</td><td>压力焊作业</td><td>2020-11-06</td><td className="cell-danger">2023-11-05</td><td className="cell-danger">是</td><td>焊接复审</td><td>炼油三部</td><td>王敏</td><td>2023-11-10</td><td>{renderListAttachment("无")}</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>赵丽</td><td>中科炼化/人力资源部</td><td>培训管理员</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>内训师证</button></td><td>PX-077</td><td>集团公司发证</td><td>HSE关键岗位资格</td><td>无</td><td>2025-04-18</td><td>2028-04-17</td><td>否</td><td>培训师提升</td><td>人力资源部</td><td>赵丽</td><td>2025-04-19</td><td>{renderListAttachment("有")}</td><td>{renderRowOps()}</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

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
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关级别:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertLevel} onChange={(e) => updateFormCertLevel(e.target.value)}>
                      {Object.keys(certificateDict).map((level) => <option key={level} value={level}>{certificateLevelLabels[level]}</option>)}
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertType} onChange={(e) => updateFormCertType(e.target.value)}>
                      {Object.keys(certificateDict[formCertLevel] || {}).map((type) => <option key={type} value={type}>{type}</option>)}
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书小类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertSubtype} onChange={(e) => setFormCertSubtype(e.target.value)}>
                      {(certificateDict[formCertLevel]?.[formCertType] || [""]).map((subtype) => <option key={subtype || "none"} value={subtype}>{subtype || "无"}</option>)}
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
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="高杨" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>组织机构:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="中科炼化/工程管理一班" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="电气技师" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="高压电工证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编码:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="TZ-05438" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关级别:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertLevel} onChange={(e) => updateFormCertLevel(e.target.value)}>
                      {Object.keys(certificateDict).map((level) => <option key={level} value={level}>{certificateLevelLabels[level]}</option>)}
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertType} onChange={(e) => updateFormCertType(e.target.value)}>
                      {Object.keys(certificateDict[formCertLevel] || {}).map((type) => <option key={type} value={type}>{type}</option>)}
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书小类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" value={formCertSubtype} onChange={(e) => setFormCertSubtype(e.target.value)}>
                      {(certificateDict[formCertLevel]?.[formCertType] || [""]).map((subtype) => <option key={subtype || "none"} value={subtype}>{subtype || "无"}</option>)}
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>初领日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2021-04-12" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书有效期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-04-11" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">是否异常:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="是"><option value="否">否</option><option value="是">是</option></select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">关联培训项目:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="电气复审" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="工程管理一班" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记人:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="肖鹏" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-04-15" readOnly /></div>
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
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="高杨" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>组织机构:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="中科炼化/工程管理一班" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="电气技师" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="高压电工证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编码:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="TZ-05438" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关级别:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="国家/地方政府发证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="特种作业资格证（电工作业）" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书小类:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="高压电工作业" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>初领日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2021-04-12" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书有效期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-04-11" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">是否异常:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="是" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">关联培训项目:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="电气复审" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="工程管理一班" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记人:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="肖鹏" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-04-15" readOnly /></div>
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
                      <tr><td>1</td><td>发证</td><td>肖鹏</td><td>公用工程部</td><td>2026年02月26日</td><td><div className="table-op-inline"><button type="button" className="table-link-btn">预览</button><button type="button" className="table-link-btn">下载</button></div></td></tr><tr><td>2</td><td>换证</td><td>肖鹏</td><td>公用工程部</td><td>2026年02月26日</td><td><div className="table-op-inline"><button type="button" className="table-link-btn">预览</button><button type="button" className="table-link-btn">下载</button></div></td></tr>
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
                        <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>组织机构</th><th>证书名称</th><th>证书编码</th><th>证书种类</th><th>证书小类</th><th>原证书有效期</th><th>原证书附件</th><th>新证附件</th>
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
                          <td>{row.certSubtype}</td>
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
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="肖鹏" readOnly /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="工程管理一班" readOnly /></div>
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
                  <span>常用数据(0)</span>
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
                      <tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>张亮</td><td>0368547</td><td>中科炼化/储运部</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>方月蒙</td><td>90013152</td><td>中科炼化/化工二部</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>胡晓磊</td><td>19038</td><td>中科炼化/炼油三部</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>尤红玉</td><td>00368974</td><td>中科炼化/储运部</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>高杨</td><td>19001</td><td>中科炼化/工程管理一班</td></tr>
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
