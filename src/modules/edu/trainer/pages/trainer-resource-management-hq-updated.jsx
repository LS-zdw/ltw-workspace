import React from "react";

const enterpriseOptions = [
  "镇海炼化",
  "茂名石化",
  "洛阳石化",
  "九江石化",
  "广州石化",
  "福建联合",
  "仪征化纤",
  "天津石化",
  "海南炼化",
  "扬子石化"
];

const trainerRows = [
  { id: 1, enterprise: "镇海炼化", dataSource: "镇海炼化", name: "梁海江", gender: "男", org: "安全环保部", position: "安全主管", title: "高级", major: "化工安全", education: "本科", phone: "15001213760", intro: "长期从事安全培训工作", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 2, enterprise: "茂名石化", dataSource: "茂名石化", name: "方月蒙", gender: "女", org: "教育培训中心", position: "设备专员", title: "中级", major: "电气工程", education: "本科", phone: "15537290777", intro: "具备丰富授课经验", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 3, enterprise: "洛阳石化", dataSource: "洛阳石化", name: "张亮", gender: "男", org: "安环部", position: "运行班长", title: "高级", major: "石油化工", education: "大专", phone: "13681525946", intro: "长期从事现场培训", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 4, enterprise: "九江石化", dataSource: "九江石化", name: "尤红玉", gender: "女", org: "设备管理部", position: "仪表工程师", title: "中级", major: "自动化", education: "本科", phone: "18010180072", intro: "擅长实操授课", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 5, enterprise: "广州石化", dataSource: "广州石化", name: "卢伟", gender: "男", org: "安环部", position: "培训讲师", title: "中级", major: "炼油工艺", education: "本科", phone: "13811220011", intro: "炼化培训讲师", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 6, enterprise: "福建联合", dataSource: "福建联合", name: "杨青", gender: "女", org: "生产技术部", position: "班组骨干", title: "初级", major: "安全工程", education: "本科", phone: "13911330022", intro: "班组培训骨干", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 7, enterprise: "仪征化纤", dataSource: "仪征化纤", name: "李卓", gender: "男", org: "教育培训中心", position: "课程开发", title: "中级", major: "安全管理", education: "硕士", phone: "13711440033", intro: "课程开发", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 8, enterprise: "天津石化", dataSource: "天津石化", name: "谢峰", gender: "男", org: "安环部", position: "危化专家", title: "高级", major: "应用化学", education: "本科", phone: "13611550044", intro: "危化专业", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 9, enterprise: "海南炼化", dataSource: "海南炼化", name: "周凯", gender: "男", org: "生产运行部", position: "现场讲师", title: "高级", major: "油气储运", education: "大专", phone: "13511660055", intro: "现场实操", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" },
  { id: 10, enterprise: "集团总部", dataSource: "总部", name: "陈涛", gender: "男", org: "安全监管部", position: "新任讲师", title: "初级", major: "环境工程", education: "本科", phone: "13411770066", intro: "总部自建共享师资", registrant: "李倩", registerDept: "综合管理室", registerDate: "2025-04-19" }
];

const titleOptions = ["无", "初级", "中级", "高级"];
const internalTeacherOptions = trainerRows.map((row) => ({
  name: row.name,
  gender: row.gender,
  org: row.org,
  position: row.position,
  phone: row.phone,
}));

const defaultForm = {
  enterprise: "集团总部",
  dataSource: "总部",
  source: "内聘教师",
  name: "陈涛",
  gender: "男",
  org: "安全监管部",
  position: "新任讲师",
  title: "初级",
  major: "环境工程",
  education: "本科",
  phone: "13411770066",
  intro: "总部自建共享师资",
  registrant: "李倩",
  registerDept: "综合管理室",
  registerDate: "2025-04-19"
};

function TrainerEditModal({ mode = "edit", onClose }) {
  const readOnly = mode === "view";
  const isAddMode = mode === "add" || mode === "add-library";
  const initialAddType = mode === "add-library" ? "library" : "manual";
  const title = isAddMode ? "培训师资新增" : mode === "view" ? "查看培训师资" : "编辑培训师资";
  const [addType, setAddType] = React.useState(initialAddType);
  const isLibraryAdd = isAddMode && addType === "library";
  const [source, setSource] = React.useState(isAddMode ? "内聘教师" : defaultForm.source);
  const [showPersonSelect, setShowPersonSelect] = React.useState(false);
  const [formData, setFormData] = React.useState({
    ...(isAddMode
      ? {
          enterprise: initialAddType === "library" ? enterpriseOptions[0] : "集团总部",
          dataSource: initialAddType === "library" ? enterpriseOptions[0] : "总部",
          source: "内聘教师",
          name: "",
          gender: "",
          org: "",
          position: "",
          title: "",
          major: "",
          education: "",
          phone: "",
          intro: "",
          registrant: "系统自动带出",
          registerDept: "系统自动带出",
          registerDate: "系统自动带出"
        }
      : defaultForm)
  });
  const isInternal = source === "内聘教师";
  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  const libraryTeacherOptions = trainerRows.filter((row) => row.enterprise === formData.enterprise && row.dataSource !== "总部");
  const selectInternalTeacher = (teacher) => {
    setFormData((prev) => ({ ...prev, ...teacher, source: "内聘教师", dataSource: isLibraryAdd ? teacher.enterprise : prev.dataSource }));
    setSource("内聘教师");
    setShowPersonSelect(false);
  };
  const handleAddTypeChange = (nextType) => {
    setAddType(nextType);
    setSource("内聘教师");
    setShowPersonSelect(false);
    setFormData({
      enterprise: nextType === "library" ? enterpriseOptions[0] : "集团总部",
      dataSource: nextType === "library" ? enterpriseOptions[0] : "总部",
      source: "内聘教师",
      name: "",
      gender: "",
      org: "",
      position: "",
      title: "",
      major: "",
      education: "",
      phone: "",
      intro: "",
      registrant: "系统自动带出",
      registerDept: "系统自动带出",
      registerDate: "系统自动带出"
    });
  };
  const handleSourceChange = (nextSource) => {
    setSource(nextSource);
    setFormData((prev) => ({
      ...prev,
      source: nextSource,
      ...(nextSource === "内聘教师"
        ? { name: "", gender: "", org: "", position: "", phone: "" }
        : {})
    }));
  };

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd cert-bd" style={{ maxHeight: "72vh", overflow: "auto" }}>
          <div className="cert-section">
            <div className="cert-section-title">师资基本信息</div>
            <div className="cert-form-grid">
              {isAddMode ? (
                <div className="cert-field-item cert-field-item-wide">
                  <div className="cert-field-label"><span className="required-mark">*</span>新增方式：</div>
                  <div className="cert-field-value">
                    <label className="detail-radio"><input type="radio" name="addType" checked={addType === "manual"} onChange={() => handleAddTypeChange("manual")} /> 手动新增</label>
                    <label className="detail-radio"><input type="radio" name="addType" checked={addType === "library"} onChange={() => handleAddTypeChange("library")} /> 从企业师资库添加</label>
                  </div>
                </div>
              ) : null}
              <div className="cert-field-item">
                  <div className="cert-field-label"><span className="required-mark">*</span>数据来源：</div>
                  <div className="cert-field-value">
                  {isLibraryAdd ? (
                    <select
                      className="cert-field-control"
                      value={formData.dataSource}
                      onChange={(e) => setFormData((prev) => ({ ...prev, enterprise: e.target.value, dataSource: e.target.value, name: "", gender: "", org: "", position: "", phone: "" }))}
                      disabled={readOnly}
                    >
                      {enterpriseOptions.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  ) : (
                    <input className="cert-field-control" value="总部" readOnly />
                  )}
                  </div>
                </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>师资来源：</div>
                <div className="cert-field-value">
                  <label className="detail-radio"><input type="radio" name="source" checked={source === "外聘教师"} onChange={() => handleSourceChange("外聘教师")} disabled={readOnly || isLibraryAdd} /> 外聘教师</label>
                  <label className="detail-radio"><input type="radio" name="source" checked={source === "内聘教师"} onChange={() => handleSourceChange("内聘教师")} disabled={readOnly || isLibraryAdd} /> 内聘教师</label>
                </div>
              </div>

              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>姓名：</div>
                <div className="cert-field-value">
                  {(isInternal || isLibraryAdd) && !readOnly ? (
                    <div className="cert-picker">
                      <input className="cert-field-control" value={formData.name} placeholder={isLibraryAdd ? "请选择企业师资" : "请选择内聘教师"} readOnly />
                      <button type="button" className="btn" onClick={() => setShowPersonSelect(true)}>选择</button>
                    </div>
                  ) : (
                    <input className="cert-field-control" value={formData.name} onChange={(e) => updateField("name", e.target.value)} placeholder={isInternal ? "选择人员自动带出" : "请输入人员姓名"} disabled={readOnly} />
                  )}
                  <span style={{ color: "#98a2b3", marginLeft: 8 }}>0/20</span>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>性别：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" value={formData.gender || "请选择"} onChange={(e) => updateField("gender", e.target.value === "请选择" ? "" : e.target.value)} disabled={readOnly}>
                    <option>请选择</option>
                    <option>男</option>
                    <option>女</option>
                  </select>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>所属单位：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={formData.org} onChange={(e) => updateField("org", e.target.value)} placeholder={isInternal || isLibraryAdd ? "选择人员自动带出" : "输入所属单位"} disabled={readOnly} /><span style={{ color: "#98a2b3", marginLeft: 8 }}>0/30</span></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">职位：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={formData.position} onChange={(e) => updateField("position", e.target.value)} placeholder={isInternal || isLibraryAdd ? "选择人员自动带出" : "请输入职位"} disabled={readOnly} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>职称：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" value={formData.title || "请选择"} onChange={(e) => updateField("title", e.target.value === "请选择" ? "" : e.target.value)} disabled={readOnly}>
                    <option>请选择</option>
                    {titleOptions.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>专业：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={formData.major} onChange={(e) => updateField("major", e.target.value)} placeholder="请输入专业" disabled={readOnly} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">学历：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" value={formData.education || "请选择"} onChange={(e) => updateField("education", e.target.value === "请选择" ? "" : e.target.value)} disabled={readOnly}>
                    <option>请选择</option>
                    <option>大专</option>
                    <option>本科</option>
                    <option>硕士</option>
                    <option>博士</option>
                  </select>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">联系方式：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder={isInternal || isLibraryAdd ? "选择人员自动带出" : "请输入手机号"} disabled={readOnly} /></div>
              </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label">教师简介：</div>
                <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" value={formData.intro} onChange={(e) => updateField("intro", e.target.value)} placeholder="请输入教师简介" disabled={readOnly} /><span style={{ color: "#98a2b3", marginLeft: 8 }}>0/100</span></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记人：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={formData.registrant} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记部门：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={formData.registerDept} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记日期：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={formData.registerDate} readOnly /></div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>关闭</button>
          {readOnly ? null : <button type="button" className="btn btn-primary" onClick={onClose}>保存</button>}
        </div>
        {showPersonSelect ? (
          <div className="modal-mask" onClick={() => setShowPersonSelect(false)}>
            <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-hd">
                <div className="modal-title">选择内聘教师</div>
                <button type="button" className="modal-close" onClick={() => setShowPersonSelect(false)}>×</button>
              </div>
              <div className="modal-bd cert-bd">
                {isLibraryAdd ? (
                  <div className="cert-section">
                    <div className="cert-section-title">企业师资库</div>
                    <div style={{ marginBottom: 8, color: "#666", fontSize: 12 }}>当前数据来源：{formData.dataSource || "未选择"}</div>
                  </div>
                ) : null}
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>姓名</th><th>性别</th><th>所属单位</th><th>职位</th><th>职称</th><th>专业</th><th>联系方式</th><th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isLibraryAdd ? libraryTeacherOptions : internalTeacherOptions).map((teacher) => (
                        <tr key={teacher.name}>
                          <td>{teacher.name}</td><td>{teacher.gender}</td><td>{teacher.org}</td><td>{teacher.position}</td><td>{"title" in teacher ? teacher.title : ""}</td><td>{"major" in teacher ? teacher.major : ""}</td><td>{teacher.phone}</td>
                          <td><button type="button" className="table-link-btn" onClick={() => selectInternalTeacher(teacher)}>选择</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function Page() {
  const [modalType, setModalType] = React.useState("");
  const openFirstOnly = (id, type) => {
    if (id !== 1) return;
    setModalType(type);
  };

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">数据来源：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>总部</option>{enterpriseOptions.map((item) => <option key={item}>{item}</option>)}</select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">姓名：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入姓名" defaultValue="" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">所属单位：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入所属单位" defaultValue="" /></div></div>
            <div className="filterbar-item">
              <div className="filterbar-label">职称：</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="全部">
                  <option>全部</option>
                  {titleOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
            </div>
            <div className="filterbar-item"><div className="filterbar-label">专业：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入专业" defaultValue="" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">学历：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option>全部</option><option>大专</option><option>本科</option><option>硕士</option><option>博士</option></select></div></div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-actions filterbar-actions-left">
            <button type="button" className="btn btn-primary" onClick={() => setModalType("add")}>新增</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="proto-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th>
              <th>序号</th><th>姓名</th><th>性别</th><th>所属单位</th><th>职位</th><th>职称</th><th>专业</th><th>学历</th><th>联系方式</th><th>教师简介</th><th>数据来源</th><th>登记人</th><th>登记部门</th><th>登记日期</th><th>操作</th>
            </tr>
          </thead>
          <tbody>
            {trainerRows.map((row) => (
              <tr key={row.id}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.id}</td>
                <td><button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "view")}>{row.name}</button></td>
                <td>{row.gender}</td><td>{row.org}</td><td>{row.position}</td><td>{row.title}</td><td>{row.major}</td><td>{row.education}</td><td>{row.phone}</td><td>{row.intro}</td><td>{row.dataSource}</td><td>{row.registrant}</td><td>{row.registerDept}</td><td>{row.registerDate}</td>
                <td>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row.id, "edit")}>编辑</button>
                    <button type="button" className="table-link-btn danger">删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stpm-main-pager">
        <div className="stpm-main-pager-total">共 2524 条记录 第 1 / 253 页</div>
        <div className="stpm-main-pager-controls">
          <button type="button" className="stpm-main-page-btn" disabled>‹</button>
          <button type="button" className="stpm-main-page-btn active">1</button>
          <button type="button" className="stpm-main-page-btn">2</button>
          <button type="button" className="stpm-main-page-btn">3</button>
          <button type="button" className="stpm-main-page-btn">›</button>
          <select className="stpm-main-page-size" defaultValue="10"><option value="10">10条/页</option><option value="20">20条/页</option><option value="50">50条/页</option></select>
        </div>
      </div>

      {modalType ? <TrainerEditModal mode={modalType} onClose={() => setModalType("")} /> : null}
    </div>
  );
}
