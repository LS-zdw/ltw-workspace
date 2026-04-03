import React from "react";

const stageTabs = ["可研阶段", "基础设计阶段", "试运行阶段", "竣工验收阶段"];

const rows = [
  { id: 1, projectName: "智能物联网平台建设项目1", stage: "可研", evalOrg: "", designOrg: "213", replyDate: "2025-03-02", acceptDate: "", projectStage: "基础设计", creator: "张三", createdAt: "2026-01-05" },
  { id: 2, projectName: "5G网络优化升级项目1", stage: "可研", evalOrg: "", designOrg: "", replyDate: "", acceptDate: "", projectStage: "基础设计", creator: "张三", createdAt: "2026-01-05" },
  { id: 3, projectName: "炼油罐区改造项目", stage: "基础设计", evalOrg: "华东安评", designOrg: "SEI", replyDate: "2025-03-06", acceptDate: "", projectStage: "基础设计", creator: "李四", createdAt: "2026-01-07" },
  { id: 4, projectName: "化工新材料扩建项目", stage: "基础设计", evalOrg: "安评中心", designOrg: "洛阳工程", replyDate: "2025-03-09", acceptDate: "", projectStage: "基础设计", creator: "王五", createdAt: "2026-01-09" },
  { id: 5, projectName: "乙烯改造项目", stage: "试运行", evalOrg: "中石化安研院", designOrg: "广州工程", replyDate: "2025-03-11", acceptDate: "", projectStage: "试运行", creator: "赵敏", createdAt: "2026-01-10" },
  { id: 6, projectName: "常减压改造工程", stage: "试运行", evalOrg: "华中安评", designOrg: "宁波工程", replyDate: "2025-03-12", acceptDate: "", projectStage: "试运行", creator: "刘强", createdAt: "2026-01-11" },
  { id: 7, projectName: "动力站节能改造", stage: "竣工验收", evalOrg: "国家石化评估中心", designOrg: "SEI", replyDate: "2025-03-13", acceptDate: "2025-09-01", projectStage: "竣工验收", creator: "张三", createdAt: "2026-01-12" },
  { id: 8, projectName: "危化品仓储升级项目", stage: "竣工验收", evalOrg: "河南鑫利", designOrg: "洛阳工程", replyDate: "2025-03-16", acceptDate: "2025-09-08", projectStage: "竣工验收", creator: "李四", createdAt: "2026-01-13" },
  { id: 9, projectName: "智能监测一体化项目", stage: "可研", evalOrg: "", designOrg: "213", replyDate: "", acceptDate: "", projectStage: "可研", creator: "王五", createdAt: "2026-01-14" },
  { id: 10, projectName: "公辅系统升级项目", stage: "可研", evalOrg: "", designOrg: "", replyDate: "", acceptDate: "", projectStage: "可研", creator: "赵敏", createdAt: "2026-01-15" }
];

function Section({ title, children, showSubmit = false }) {
  return (
    <div className="detail-section" style={{ marginTop: 12 }}>
      <div className="detail-section-title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>{title}</span>
        {showSubmit ? <button type="button" className="btn btn-primary">提交</button> : null}
      </div>
      <div className="stpm-create-grid" style={{ padding: 12 }}>{children}</div>
    </div>
  );
}

function Field({ label, required = false, value = "", placeholder = "请输入内容", disabled = false, wide = false }) {
  return (
    <div className={`stpm-create-item${wide ? " stpm-create-item-wide" : ""}`}>
      <div className="stpm-create-key">{required ? <span className="required-mark">*</span> : null}{label}</div>
      <div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={value} placeholder={placeholder} readOnly={disabled ? false : true} disabled={disabled} /></div>
    </div>
  );
}

function UploadField({ label, required = false, wide = false, extraText = "", keyWrap = false, hintText = "" }) {
  return (
    <div className={`stpm-create-item${wide ? " stpm-create-item-wide" : ""}`}>
      <div className="stpm-create-key" style={keyWrap ? { whiteSpace: "normal", lineHeight: 1.4 } : undefined}>
        {required ? <span className="required-mark">*</span> : null}
        {label}
      </div>
      <div className="stpm-create-val">
        <div className="filterbar-control stpm-integrated-control" style={{ color: "#8b95a1", textAlign: "center" }}>
          将文件拖到此处或 <span style={{ color: "#1677ff" }}>点击上传</span>{extraText ? <span>（{extraText}）</span> : null}
        </div>
        {hintText ? (
          <div style={{ color: "#6b7280", fontSize: 12, textAlign: "center", marginTop: 4 }}>
            （{hintText}）
          </div>
        ) : null}
      </div>
    </div>
  );
}

function YesNo({ label, required = false, value = "否", disabled = false, onChange, name, wide = false }) {
  const groupName = name || `yn-${label}`;
  return (
    <div
      className={`stpm-create-item${wide ? " stpm-create-item-wide" : ""}`}
      style={{ alignItems: "start", gridTemplateColumns: "minmax(260px, 1.1fr) 1fr" }}
    >
      <div className="stpm-create-key" style={{ whiteSpace: "normal", lineHeight: 1.4, paddingTop: 4 }}>
        {required ? <span className="required-mark">*</span> : null}
        {label}
      </div>
      <div className="stpm-create-val stpm-yesno">
        <label><input type="radio" name={groupName} checked={value === "是"} readOnly disabled={disabled} onChange={() => { if (!disabled && onChange) onChange("是"); }} /> 是</label>
        <label><input type="radio" name={groupName} checked={value !== "是"} readOnly disabled={disabled} onChange={() => { if (!disabled && onChange) onChange("否"); }} /> 否</label>
      </div>
    </div>
  );
}

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [projectClass, setProjectClass] = React.useState("1");
  const [stage, setStage] = React.useState("可研阶段");
  const [kyArticle7, setKyArticle7] = React.useState("是");
  const [kyDomesticFirst, setKyDomesticFirst] = React.useState("否");
  const [kyGovApprove, setKyGovApprove] = React.useState("否");
  const [ky23Article7, setKy23Article7] = React.useState("是");
  const [ky23DomesticFirst, setKy23DomesticFirst] = React.useState("否");
  const [ky23GovApprove, setKy23GovApprove] = React.useState("否");
  const [basicArticle7, setBasicArticle7] = React.useState("否");
  const [basicGovApprove, setBasicGovApprove] = React.useState("是");
  const [basic23Article7, setBasic23Article7] = React.useState("否");
  const [basic23GovApprove, setBasic23GovApprove] = React.useState("否");
  const [trialGovApprove, setTrialGovApprove] = React.useState("是");
  const [trialDelay, setTrialDelay] = React.useState("否");

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">项目名称：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入项目名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">项目级别：</div><div className="filterbar-input"><select className="filterbar-control"><option>一级项目（集团公司）</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">安全三同时阶段：</div><div className="filterbar-input"><select className="filterbar-control"><option>请选择安全三同时</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">建设类型：</div><div className="filterbar-input"><select className="filterbar-control"><option>请选择建设类型</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">项目类型：</div><div className="filterbar-input"><select className="filterbar-control"><option>请选择项目类型</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">是否重点建设工程项目：</div><div className="filterbar-input"><select className="filterbar-control"><option>请选择是否重点工程</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">项目创建日期：</div><div className="filterbar-input"><div className="stpm-range"><input className="filterbar-control" placeholder="开始日期" /><span>至</span><input className="filterbar-control" placeholder="结束日期" /></div></div></div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">重置</button>
            <button type="button" className="btn btn-primary">导出</button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <table className="proto-table stpm-main-table">
          <thead>
            <tr>
              <th className="table-checkbox"><input type="checkbox" readOnly /></th>
              <th>序号</th>
              <th>项目名称</th>
              <th>安全三同时阶段</th>
              <th>安全评价单位</th>
              <th>设计单位</th>
              <th>安全设计批复日期</th>
              <th>安全竣工验收日期</th>
              <th>项目阶段</th>
              <th>登记人</th>
              <th>登记日期</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                <td>{row.id}</td>
                <td>
                  <button
                    type="button"
                    className="table-link-btn"
                    onClick={() => {
                      if (row.id === 1 || row.id === 2) {
                        setProjectClass(row.id === 1 ? "1" : "23");
                        setStage("可研阶段");
                        setOpen(true);
                      }
                    }}
                  >
                    {row.projectName}
                  </button>
                </td>
                <td>{row.stage}</td>
                <td>{row.evalOrg}</td>
                <td>{row.designOrg}</td>
                <td>{row.replyDate}</td>
                <td>{row.acceptDate}</td>
                <td>{row.projectStage}</td>
                <td>{row.creator}</td>
                <td>{row.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open ? (
        <div className="modal-mask" onClick={() => setOpen(false)}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()} style={{ width: "calc(100vw - 24px)" }}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">行政许可信息管理</div>
              </div>
              <button type="button" className="modal-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="modal-bd detail" style={{ maxHeight: "78vh", overflow: "auto" }}>
              <Section title="项目基础信息">
                <Field label="所属企业" required value="海南炼化" disabled />
                <Field label="项目名称" required value="17万吨SBC项目" disabled />
                <Field label="项目编号" required value="H20018" disabled />
                <Field label="项目建设单位" required value="海南巴陵化工新材料有限公司" disabled />
                <Field label="所属板块" required value="炼油" disabled />
                <Field label="项目级别" required value="一级项目（集团公司）" disabled />
                <Field label="项目状态" required value="已创建" disabled />
                <Field label="项目创建日期" required value="2026-01-05" disabled />
              </Section>

              <Section title="项目建设信息">
                <Field label="计划开工日期" required value="2026-03-02" disabled />
                <Field label="计划完工日期" required value="2026-08-29" disabled />
                <Field label="计划投产日期" required value="2026-10-28" disabled />
                <Field label="建设类型" required value="新建" disabled />
                <YesNo label="是否重点工程建设项目" required value="否" disabled />
                <div className="stpm-create-item">
                  <div className="stpm-create-key"><span className="required-mark">*</span>三同时的专业分类</div>
                  <div className="stpm-create-val">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 14, minHeight: 30 }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <input type="checkbox" checked readOnly disabled />
                        <span>安全</span>
                      </label>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <input type="checkbox" readOnly disabled />
                        <span>职业卫生</span>
                      </label>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <input type="checkbox" readOnly disabled />
                        <span>消防</span>
                      </label>
                    </div>
                    <div style={{ color: "#ef4444", fontSize: 12, marginTop: 2 }}>
                      注意：一个项目有可能同时属于多个专业域，每个涉及的专业域都打√
                    </div>
                  </div>
                </div>
                <Field label="项目阶段" required value={stage} disabled />
              </Section>

              <div className="detail-stages" style={{ marginTop: 12 }}>
                {stageTabs.map((item, idx) => (
                  <button
                    key={item}
                    type="button"
                    className={`detail-stage ${stage === item ? "active" : ""}`}
                    style={{ cursor: "pointer", border: "none", width: "100%" }}
                    onClick={() => setStage(item)}
                  >
                    <span className="detail-stage-dot">{idx + 1}</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>

              {stage === "可研阶段" ? (
                <>
                  <Section title="可研基本信息">
                    <Field label="可研上报时间" required value="2026-03-05" />
                    <Field label="可研上报文号" required value="HSE-KY-20260305-01" />
                    <Field label="可研批复时间" required value="2026-03-20" />
                    <Field label="可研批复文号" required value="HSE-KY-20260320-08" />
                  </Section>
                  {projectClass === "23" ? (
                    <Section title="安全评价信息">
                      <YesNo
                        label="是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目"
                        required
                        value={ky23Article7}
                        onChange={setKy23Article7}
                        name="ky23-article7"
                        wide
                      />
                      {ky23Article7 === "是" ? (
                        <>
                          <Field label="安全评价单位" required value="请输入评价单位" />
                          <UploadField label="安全评价报告预审稿" />
                        </>
                      ) : (
                        <>
                          <UploadField label="专家意见" required />
                          <UploadField label="安全生产条件和设施综合分析报告" required keyWrap />
                        </>
                      )}
                      <YesNo
                        label="工艺是否国内首次使用"
                        required
                        value={ky23DomesticFirst}
                        onChange={setKy23DomesticFirst}
                        name="ky23-domestic-first"
                        wide
                      />
                      {ky23DomesticFirst === "是" ? (
                        <UploadField label="安全可靠性论证意见" required wide />
                      ) : null}
                      <UploadField label="其他附件" />
                      <UploadField label="审查专家组签名表" required />
                      <UploadField label="专家组评审意见表" required />
                      <UploadField label="安全预评价报告修改说明" />
                      <UploadField label="安全评价报告终稿" />
                      <YesNo
                        label="是否政府审批"
                        required
                        value={ky23GovApprove}
                        onChange={setKy23GovApprove}
                        name="ky23-gov-approve"
                        wide
                      />
                      {ky23GovApprove === "是" ? (
                        <>
                          <Field label="批复时间" required value="请选择时间" />
                          <UploadField label="批复（备案）文件" required />
                        </>
                      ) : (
                        <UploadField label="原因" required wide extraText="需要企业盖章" />
                      )}
                    </Section>
                  ) : (
                    <>
                      <Section title="安全评价及审查信息" showSubmit>
                        <YesNo
                          label="是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目"
                          required
                          value={kyArticle7}
                          onChange={setKyArticle7}
                          name="ky-article7"
                          wide
                        />
                        {kyArticle7 === "是" ? (
                          <>
                            <Field label="安全评价单位" required value="请选择评价单位" />
                            <UploadField label="安全评价报告预审稿" required />
                            <UploadField label="审查专家组签名表" required />
                            <UploadField label="专家组评审意见及个人意见" required />
                            <UploadField label="专家组评审意见的修改说明" required />
                          </>
                        ) : (
                          <>
                            <UploadField label="无需办理安全行政许可书面情况说明" required keyWrap />
                            <UploadField label="安全生产条件和设施综合分析报告" required keyWrap />
                            <UploadField label="审查专家组签名表" required />
                            <UploadField label="专家组评审意见及个人意见" required />
                            <UploadField label="专家组评审意见的修改说明" required />
                          </>
                        )}
                      </Section>
                      <Section title="政府审批信息" showSubmit>
                        <YesNo
                          label="是否政府审批"
                          required
                          value={kyGovApprove}
                          onChange={setKyGovApprove}
                          name="ky-gov-approve"
                          wide
                        />
                        {kyGovApprove === "是" ? (
                          <>
                            <Field label="政府批复时间" required value="请选择时间" />
                            <UploadField label="政府批复（备案）文件" required />
                            <Field label="政府批复文号" required value="请输入政府批复文号" />
                            <UploadField label="安全评价报告终稿" required />
                            <UploadField label="其他附件" />
                          </>
                        ) : (
                          <>
                            <UploadField label="原因" required wide extraText="需要企业盖章" />
                            <UploadField label="安全评价报告终稿" required />
                            <UploadField label="其他附件" />
                          </>
                        )}
                        <YesNo
                          label="工艺是否国内首次使用"
                          required
                          value={kyDomesticFirst}
                          onChange={setKyDomesticFirst}
                          name="ky-domestic-first"
                          wide
                        />
                        {kyDomesticFirst === "是" ? (
                          <UploadField
                            label="安全可靠性论证意见"
                            required
                            wide
                            hintText="省级人民政府有关部门组织的安全可靠性论证"
                          />
                        ) : null}
                      </Section>
                      <Section title="专项论证信息">
                        <Field label="专项论证名称" value="请输入内容" />
                        <Field label="主办部门" value="请输入内容" />
                        <Field label="论证截止日期" value="请选择时间" />
                        <Field label="评估完成日期" value="请选择时间" />
                        <Field label="论证状态" value="待论证" />
                      </Section>
                    </>
                  )}
                </>
              ) : null}

              {stage === "基础设计阶段" ? (
                <>
                  <Section title="基础设计基本信息">
                    <Field label="基础设计上报时间" value="请选择时间" />
                    <Field label="基础设计上报文号" value="请输入内容" />
                    <Field label="基础设计批复时间" value="请选择时间" />
                    <Field label="基础设计批复文号" value="请输入内容" />
                  </Section>
                  {projectClass === "23" ? (
                    <>
                      <Section title="安全设施设计审查信息" showSubmit>
                        <YesNo
                          label="是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目"
                          required
                          value={basic23Article7}
                          onChange={setBasic23Article7}
                          name="basic23-article7"
                          wide
                        />
                        <Field label="设计单位" required value="选择评价单位" />
                        <UploadField label={basic23Article7 === "是" ? "安全设施设计专篇" : "安全设施设计"} required />
                        <UploadField label="其他附件" />
                        <UploadField label="审查专家组签名表" required />
                        <UploadField label="专家组评审意见见表" required />
                        <UploadField label="评审会参加人员签到表" required />
                        <UploadField label="安全设施设计修改说明" />
                      </Section>
                      <Section title="政府审核信息" showSubmit>
                        <YesNo
                          label="是否政府审批"
                          required
                          value={basic23GovApprove}
                          onChange={setBasic23GovApprove}
                          name="basic23-gov-approve"
                          wide
                        />
                        {basic23GovApprove === "是" ? (
                          <>
                            <Field label="批复时间" required value="请选择时间" />
                            <UploadField label="批复（备案）文件" required />
                          </>
                        ) : (
                          <>
                            <UploadField label="专家意见" required />
                            <UploadField label="原因" required />
                          </>
                        )}
                      </Section>
                    </>
                  ) : (
                    <>
                      <Section title="安全设施设计审查信息" showSubmit>
                        <YesNo
                          label="是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目"
                          required
                          value={basicArticle7}
                          onChange={setBasicArticle7}
                          name="basic-article7"
                          wide
                        />
                        <Field label="设计单位" required value="SEI" />
                        <UploadField label={basicArticle7 === "是" ? "安全设施设计专篇" : "安全设施设计"} required />
                        <UploadField label="参加人员签名表" required />
                        <UploadField label="专家组评审意见及个人意见" required />
                        <UploadField label="专家组评审意见的修改说明" />
                      </Section>
                      <Section title="政府审核信息" showSubmit>
                        <YesNo
                          label="是否政府审批"
                          required
                          value={basicGovApprove}
                          onChange={setBasicGovApprove}
                          name="basic-gov-approve"
                          wide
                        />
                        {basicGovApprove === "是" ? (
                          <>
                            <Field label="批复时间" required value="请选择时间" />
                            <UploadField label="批复（备案）文件" required />
                            <UploadField label="安全设施设计专篇" required />
                            <UploadField label="SIL分析报告及审查意见" required />
                            <UploadField label="HAZOP分析报告及审查意见" required />
                          </>
                        ) : (
                          <>
                            <UploadField label="专家意见" required />
                            <UploadField label="安全设施设计" required />
                            <UploadField label="原因" required />
                          </>
                        )}
                      </Section>
                    </>
                  )}
                </>
              ) : null}

              {stage === "试运行阶段" ? (
                <>
                  <Section title="政府审核信息">
                    <YesNo
                      label="是否有政府试运行审批"
                      required
                      value={trialGovApprove}
                      onChange={setTrialGovApprove}
                      name="trial-gov-approve"
                      wide
                    />
                    <Field label="试生产开始时间" required value="请选择时间" />
                    <Field label="审查组织单位" required value="请输入审查单位" />
                    {trialGovApprove === "是" ? (
                      <>
                        <Field label="试生产结束时间" required value="请选择时间" />
                        <UploadField label="试生产备案文件" />
                      </>
                    ) : (
                      <UploadField label="上传原因文件" required />
                    )}
                  </Section>
                  <Section title="试生产延期信息">
                    <YesNo
                      label="是否延期"
                      required
                      value={trialDelay}
                      onChange={setTrialDelay}
                      name="trial-delay"
                      wide
                    />
                    {trialDelay === "是" ? (
                      <>
                        <UploadField label="延期原因" required />
                        <Field label="延期截止时间" required value="请选择时间" />
                        <UploadField label="证明文件" required />
                      </>
                    ) : null}
                  </Section>
                </>
              ) : null}

              {stage === "竣工验收阶段" ? (
                <>
                  <Section title="竣工验收基本信息">
                    <Field label="竣工验收申请时间" required value="请选择时间" />
                    <Field label="竣工验收时间" required value="请选择时间" />
                  </Section>
                  <Section title="验收申请信息">
                    <UploadField label="安全设施竣工验收申请" required />
                    <UploadField label="建设项目安全验收评价报告" required />
                    <UploadField label="建设项目安全设施施工情况报告" />
                    <UploadField label="建设项目安全设施监理报告" />
                    <UploadField label="建设项目安全设施变更报告" />
                    <UploadField label="危险化学品重大危险源备案证明文件" />
                  </Section>
                  <Section title="验收意见信息">
                    <UploadField label="建设项目安全验收评价报告（终稿）" required />
                    <UploadField label="验收组名单" required />
                    <UploadField label="专家评审及竣工验收意见" required />
                    <UploadField label="安全评价验收评价报告修改说明" />
                    <UploadField label="竣工验收审查意见书" required />
                  </Section>
                </>
              ) : null}
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={() => setOpen(false)}>关闭</button>
              <button type="button" className="btn btn-primary">保存</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
