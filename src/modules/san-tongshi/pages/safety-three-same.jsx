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

const stageTaskConfigs = {
  可研阶段: {
    title: "可研阶段任务分发与反馈",
    deadline: "2026-03-18",
    ownerDept: "安全环保部",
    tasks: [
      { id: "ky-1", task: "设计单位资质材料、方案确认意见、适用规范清单", dept: "设计管理部", owner: "李明", dispatchStatus: "已分发", status: "已反馈", due: "03-12", feedback: "已上传营业执照、资质证书、项目负责人授权书", attachments: ["设计单位资质证书.pdf", "方案确认意见.docx", "项目负责人授权书.pdf"] },
      { id: "ky-2", task: "项目可研报告及项目立项目录、投资估算、工艺技术说明", dept: "运行部", owner: "王强", dispatchStatus: "已分发", status: "待补充", due: "03-15", feedback: "已反馈可研报告，工艺路线说明需补充盖章版", missing: "工艺路线说明盖章版", attachments: ["项目可研报告.pdf", "投资估算表.xlsx"] },
      { id: "ky-3", task: "项目危险有害因素识别资料、总图布置及安全间距说明", dept: "工程管理部", owner: "赵敏", dispatchStatus: "已分发", status: "待反馈", due: "03-18", feedback: "等待负责人反馈", attachments: [] },
      { id: "ky-4", task: "周边环境敏感目标、外部安全防护距离基础资料", dept: "属地单位", owner: "陈伟", dispatchStatus: "待分发", status: "待反馈", due: "03-20", feedback: "尚未分发", attachments: [] }
    ]
  },
  基础设计阶段: {
    title: "基础设计阶段任务分发与反馈",
    deadline: "2026-04-10",
    ownerDept: "安全环保部",
    tasks: [
      { id: "sj-1", task: "安全设施设计专篇、HAZOP/SIL分析报告及审查意见", dept: "设计管理部", owner: "李明", dispatchStatus: "已分发", status: "已反馈", due: "04-02", feedback: "专篇预审版已上传，等待专家意见定稿", attachments: ["安全设施设计专篇预审版.pdf", "HAZOP分析报告.pdf", "SIL分析报告.pdf"] },
      { id: "sj-2", task: "重大危险源辨识、总平面布置与安全间距复核材料", dept: "生产技术部", owner: "刘宁", dispatchStatus: "已分发", status: "待补充", due: "04-06", feedback: "安全间距复核表缺少装置边界图附件", missing: "装置边界图附件", attachments: ["重大危险源辨识表.xlsx"] },
      { id: "sj-3", task: "消防、应急、仪表联锁相关基础设计输入资料", dept: "机动部", owner: "陈伟", dispatchStatus: "已分发", status: "待反馈", due: "04-10", feedback: "等待负责人反馈", attachments: [] }
    ]
  },
  试运行阶段: {
    title: "试运行阶段任务分发与反馈",
    deadline: "2026-06-05",
    ownerDept: "安全环保部",
    tasks: [
      { id: "sy-1", task: "试生产方案、操作规程、岗位培训记录", dept: "运行部", owner: "王强", dispatchStatus: "已分发", status: "已反馈", due: "05-24", feedback: "试生产方案已提交，培训记录齐全", attachments: ["试生产方案.pdf", "岗位培训记录.xlsx"] },
      { id: "sy-2", task: "联锁投用证明、设备调试记录、隐患整改闭环清单", dept: "机动部", owner: "陈伟", dispatchStatus: "已分发", status: "已反馈", due: "05-28", feedback: "联锁投用证明已盖章，整改闭环清单已归档", attachments: ["联锁投用证明.pdf", "设备调试记录.zip", "隐患整改闭环清单.xlsx"] },
      { id: "sy-3", task: "应急预案演练记录、现场安全条件确认表", dept: "应急管理部", owner: "周岚", dispatchStatus: "已分发", status: "待补充", due: "06-05", feedback: "演练照片已上传，现场确认表待签字", missing: "现场安全条件确认表签字版", attachments: ["应急预案演练照片.zip"] }
    ]
  },
  竣工验收阶段: {
    title: "竣工验收阶段任务分发与反馈",
    deadline: "2026-08-20",
    ownerDept: "安全环保部",
    tasks: [
      { id: "ys-1", task: "安全设施施工情况报告、监理报告、变更说明", dept: "工程管理部", owner: "刘宁", dispatchStatus: "已分发", status: "待补充", due: "08-10", feedback: "施工情况报告已反馈，监理报告缺少附件目录", missing: "监理报告附件目录", attachments: ["安全设施施工情况报告.pdf", "变更说明.docx"] },
      { id: "ys-2", task: "安全验收评价报告、专家评审意见及整改证明", dept: "评价机构", owner: "孙洁", dispatchStatus: "已分发", status: "待反馈", due: "08-16", feedback: "待评价机构上传", attachments: [] },
      { id: "ys-3", task: "重大危险源备案、操作人员取证及投用前确认材料", dept: "运行部", owner: "王强", dispatchStatus: "已分发", status: "已反馈", due: "08-20", feedback: "已反馈备案证明和取证台账", attachments: ["重大危险源备案证明.pdf", "操作人员取证台账.xlsx"] }
    ]
  }
};

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

function TaskDispatchPanel({ config, onTemplate, onDispatch, onView, onRemind }) {
  const statusClass = {
    已反馈: "done",
    待补充: "warn",
    待反馈: "pending"
  };
  const dispatchClass = {
    已分发: "done",
    待分发: "pending"
  };
  const statusCounts = config.tasks.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="stage-task-panel">
      <div className="stage-task-head">
        <div>
          <div className="stage-task-title">{config.title}</div>
          <div className="stage-task-sub">由{config.ownerDept}统一配置材料清单，按阶段分发至实施单位并跟踪反馈。</div>
        </div>
        <div className="stage-task-actions">
          <button type="button" className="btn btn-primary" onClick={() => onDispatch()}>批量分发</button>
          <button type="button" className="btn" onClick={onTemplate}>配置模板</button>
        </div>
      </div>
      <div className="stage-task-summary">
        <div className="stage-task-summary-item">
          <span>发起部门</span>
          <strong>{config.ownerDept}</strong>
        </div>
        <div className="stage-task-summary-item">
          <span>反馈截止</span>
          <strong>{config.deadline}</strong>
        </div>
        <div className="stage-task-summary-item stage-task-counts">
          <span>反馈情况</span>
          <strong>已反馈 {statusCounts.已反馈 || 0}</strong>
          <strong>待补充 {statusCounts.待补充 || 0}</strong>
          <strong>待反馈 {statusCounts.待反馈 || 0}</strong>
        </div>
      </div>
      <table className="stage-task-table">
        <thead>
          <tr>
            <th>工作任务</th>
            <th>实施单位</th>
            <th>负责人</th>
            <th>分发状态</th>
            <th>反馈状态</th>
            <th>截止日期</th>
            <th>已反馈附件</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {config.tasks.map((item) => (
            <tr key={item.id}>
              <td>{item.task}</td>
              <td>{item.dept}</td>
              <td>{item.owner}</td>
              <td><span className={`stage-task-status ${dispatchClass[item.dispatchStatus] || ""}`}>{item.dispatchStatus}</span></td>
              <td><span className={`stage-task-status ${statusClass[item.status] || ""}`}>{item.status}</span></td>
              <td>{item.due}</td>
              <td>
                {item.attachments.length ? (
                  <div className="stage-task-files">
                    {item.attachments.map((file) => (
                      <button key={file} type="button" className="task-download-btn">{file}</button>
                    ))}
                    {item.missing ? <span className="stage-task-missing">缺：{item.missing}</span> : null}
                  </div>
                ) : (
                  <span className="stage-task-empty">暂无</span>
                )}
              </td>
              <td>
                <div className="stage-task-row-actions">
                  {item.dispatchStatus === "待分发" ? <button type="button" onClick={() => onDispatch(item)}>分发</button> : null}
                  {item.status !== "已反馈" && item.dispatchStatus === "已分发" ? <button type="button" onClick={() => onRemind(item)}>催办</button> : null}
                  <button type="button" onClick={() => onView(item)}>查看</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

function UploadControl({ extraText = "" }) {
  return (
    <div className="filterbar-control stpm-integrated-control stpm-upload-control">
      <span className="stpm-upload-placeholder">将文件拖到此处或</span>
      <span className="stpm-upload-actions">
        <button type="button" className="stpm-upload-link-btn">本地上传</button>
        <span className="stpm-upload-divider">|</span>
        <button type="button" className="stpm-upload-link-btn">云盘上传</button>
      </span>
      {extraText ? <span className="stpm-upload-extra">（{extraText}）</span> : null}
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
        <UploadControl extraText={extraText} />
        {hintText ? (
          <div style={{ color: "#6b7280", fontSize: 12, textAlign: "center", marginTop: 4 }}>
            （{hintText}）
          </div>
        ) : null}
      </div>
    </div>
  );
}

function RepeatableFieldGroup({
  label,
  required = false,
  items = [],
  onAdd,
  renderItem,
  hintText = "",
  wide = true,
  keyWrap = false,
  columns = 1
}) {
  return (
    <div
      className={`stpm-create-item${wide ? " stpm-create-item-wide" : ""}`}
      style={{ alignItems: "start", gridTemplateColumns: "1fr" }}
    >
      <div
        className="stpm-create-key"
        style={{
          ...(keyWrap ? { whiteSpace: "normal", lineHeight: 1.4 } : undefined),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8
        }}
      >
        <span>
          {required ? <span className="required-mark">*</span> : null}
          {label}
        </span>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`新增${label}`}
          title={`新增${label}`}
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1px solid #c7d2e4",
            background: "#fff",
            color: "#2563eb",
            fontSize: 16,
            lineHeight: "20px",
            padding: 0,
            cursor: "pointer",
            flex: "0 0 auto"
          }}
        >
          +
        </button>
      </div>
      <div className="stpm-create-val">
        <div
          style={{
            width: "100%",
            border: "1px solid #d9e0ea",
            borderRadius: 8,
            background: "#fff",
            padding: 10
          }}
        >
          <div
            style={{
              display: "grid",
              gap: 10,
              gridTemplateColumns: columns > 1 ? `repeat(${columns}, minmax(0, 1fr))` : "1fr"
            }}
          >
            {items.map((item, index) => (
              <div
                key={item.id || `${label}-${index}`}
                style={{
                  paddingTop: index === 0 ? 0 : 8,
                  borderTop: index < columns ? "none" : "1px solid #e5e7eb",
                  paddingLeft: 0,
                  minWidth: 0
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                  {items.length > 1 ? (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        color: "#64748b",
                        fontSize: 12
                      }}
                    >
                      第{index + 1}组
                    </div>
                  ) : <span />}
                  {typeof item.onRemove === "function" ? (
                    <button
                      type="button"
                      onClick={item.onRemove}
                      aria-label={`删除${label}第${index + 1}组`}
                      title="删除这一组"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#94a3b8",
                        fontSize: 14,
                        lineHeight: 1,
                        cursor: "pointer",
                        padding: 2,
                        flex: "0 0 auto"
                      }}
                    >
                      ×
                    </button>
                  ) : null}
                </div>
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
        {hintText ? <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>（{hintText}）</div> : null}
      </div>
    </div>
  );
}

function DesignUnitGroup({ label, required = false, items = [], onAdd, onRemove, onAssignmentChange }) {
  return (
    <div
      className="stpm-create-item stpm-create-item-wide"
      style={{ alignItems: "start", gridTemplateColumns: "1fr" }}
    >
      <div
        className="stpm-create-key"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}
      >
        <span>
          {required ? <span className="required-mark">*</span> : null}
          {label}
        </span>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`新增${label}`}
          title={`新增${label}`}
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1px solid #c7d2e4",
            background: "#fff",
            color: "#2563eb",
            fontSize: 16,
            lineHeight: "20px",
            padding: 0,
            cursor: "pointer",
            flex: "0 0 auto"
          }}
        >
          +
        </button>
      </div>
      <div className="stpm-create-val">
        <div
          style={{
            width: "100%",
            border: "1px solid #d9e0ea",
            borderRadius: 8,
            background: "#fff",
            padding: 10
          }}
        >
          <div style={{ display: "grid", gap: 10 }}>
            {items.map((item, index) => (
              <div
                key={item.id || `design-unit-${index}`}
                style={{
                  minWidth: 0,
                  paddingTop: index === 0 ? 0 : 8,
                  borderTop: index === 0 ? "none" : "1px solid #e5e7eb"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                  <div style={{ color: "#64748b", fontSize: 12 }}>第{index + 1}组</div>
                  {items.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`删除${label}第${index + 1}组`}
                      title="删除这一组"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#94a3b8",
                        fontSize: 14,
                        lineHeight: 1,
                        cursor: "pointer",
                        padding: 2
                      }}
                    >
                      ×
                    </button>
                  ) : <span />}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 6,
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    overflow: "hidden",
                    background: "#fff"
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <input className="filterbar-control stpm-integrated-control" value={item.value} readOnly />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <input
                      className="filterbar-control"
                      value={item.assignment || ""}
                      placeholder="请输入设计分工"
                      onChange={(event) => onAssignmentChange?.(item.id, event.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RepeatablePairGroup({
  label,
  required = false,
  items = [],
  onAdd,
  onRemove,
  headers = [],
  renderRow
}) {
  const columnCount = Math.max(headers.length, 1);
  return (
    <div
      className="stpm-create-item stpm-create-item-wide"
      style={{ alignItems: "start", gridTemplateColumns: "1fr" }}
    >
      <div
        className="stpm-create-key"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}
      >
        <span>
          {required ? <span className="required-mark">*</span> : null}
          {label}
        </span>
        <button
          type="button"
          onClick={onAdd}
          aria-label={`新增${label}`}
          title={`新增${label}`}
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            border: "1px solid #c7d2e4",
            background: "#fff",
            color: "#2563eb",
            fontSize: 16,
            lineHeight: "20px",
            padding: 0,
            cursor: "pointer",
            flex: "0 0 auto"
          }}
        >
          +
        </button>
      </div>
      <div className="stpm-create-val">
        <div
          style={{
            width: "100%",
            border: "1px solid #d9e0ea",
            borderRadius: 8,
            background: "#fff",
            padding: 10
          }}
        >
          {headers.length ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `80px repeat(${columnCount}, minmax(0, 1fr)) 24px`,
                gap: 10,
                alignItems: "center",
                marginBottom: 8,
                color: "#64748b",
                fontSize: 12
              }}
            >
              <div />
              {headers.map((header) => (
                <div key={header}>{header}</div>
              ))}
              <div />
            </div>
          ) : null}
          <div style={{ display: "grid", gap: 8 }}>
            {items.map((item, index) => (
              <div
                key={item.id || `${label}-${index}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: `80px repeat(${columnCount}, minmax(0, 1fr)) 24px`,
                  gap: 10,
                  alignItems: "start",
                  paddingTop: index === 0 ? 0 : 8,
                  borderTop: index === 0 ? "none" : "1px solid #e5e7eb"
                }}
              >
                <div style={{ color: "#64748b", fontSize: 12, lineHeight: "32px" }}>第{index + 1}组</div>
                {renderRow(item, index)}
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 6 }}>
                  {items.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      aria-label={`删除${label}第${index + 1}组`}
                      title="删除这一组"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#94a3b8",
                        fontSize: 14,
                        lineHeight: 1,
                        cursor: "pointer",
                        padding: 2
                      }}
                    >
                      ×
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RepeatableSubField({ label, value = "请选择时间" }) {
  return (
    <div style={{ display: "grid", gap: 6, width: "100%" }}>
      <div style={{ color: "#475569", fontSize: 12, lineHeight: 1.4 }}>{label}</div>
      <input className="filterbar-control stpm-integrated-control" value={value} readOnly />
    </div>
  );
}

function RepeatableSubUpload({ label, extraText = "" }) {
  return (
    <div style={{ display: "grid", gap: 6, width: "100%" }}>
      <div style={{ color: "#475569", fontSize: 12, lineHeight: 1.4 }}>{label}</div>
      <UploadControl extraText={extraText} />
    </div>
  );
}

function CompactFieldInput({ value = "请选择时间" }) {
  return <input className="filterbar-control stpm-integrated-control" value={value} readOnly />;
}

function CompactUploadInput({ extraText = "" }) {
  return <UploadControl extraText={extraText} />;
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

function TaskActionModal({ action, config, stage, onClose }) {
  if (!action) return null;

  const titleMap = {
    template: "配置任务模板",
    dispatch: action.task ? "分发给负责人" : "批量分发阶段任务",
    detail: "任务反馈详情",
    remind: "催办任务"
  };
  const task = action.task || config.tasks[0];
  const dispatchTasks = action.task ? [action.task] : config.tasks;

  return (
    <div className="modal-mask task-action-mask" onClick={onClose}>
      <div className="modal task-action-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div>
            <div className="modal-title">{titleMap[action.type]}</div>
            <div className="modal-desc">{stage} · {config.ownerDept}</div>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd detail">
          {action.type === "template" ? (
            <>
              <Section title="模板基础配置">
                <div className="stpm-create-item">
                  <div className="stpm-create-key"><span className="required-mark">*</span>模板名称</div>
                  <div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" defaultValue={`${stage}材料收集模板`} /></div>
                </div>
                <div className="stpm-create-item">
                  <div className="stpm-create-key"><span className="required-mark">*</span>适用阶段</div>
                  <div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={stage} readOnly /></div>
                </div>
                <div className="stpm-create-item">
                  <div className="stpm-create-key">默认发起部门</div>
                  <div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={config.ownerDept} readOnly /></div>
                </div>
                <div className="stpm-create-item">
                  <div className="stpm-create-key">反馈时限</div>
                  <div className="stpm-create-val"><select className="filterbar-control stpm-integrated-control" defaultValue="7"><option value="3">3个工作日</option><option value="7">7个工作日</option><option value="10">10个工作日</option></select></div>
                </div>
              </Section>
              <Section title="材料清单配置">
                <div className="task-config-table-wrap">
                  <table className="task-config-table">
                    <thead><tr><th>启用</th><th>工作任务</th><th>默认实施单位</th><th>默认负责人</th><th>反馈方式</th><th>是否必填</th></tr></thead>
                    <tbody>
                      {config.tasks.map((item) => (
                        <tr key={item.id}>
                          <td><input type="checkbox" defaultChecked /></td>
                          <td><input className="filterbar-control" defaultValue={item.task} /></td>
                          <td><select className="filterbar-control" defaultValue={item.dept}><option>{item.dept}</option><option>设计管理部</option><option>运行部</option><option>工程管理部</option><option>机动部</option></select></td>
                          <td><input className="filterbar-control" defaultValue={item.owner} /></td>
                          <td><select className="filterbar-control" defaultValue="附件+说明"><option>附件+说明</option><option>仅附件</option><option>仅说明</option></select></td>
                          <td><input type="checkbox" defaultChecked /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </>
          ) : null}

          {action.type === "dispatch" ? (
            <>
              <Section title="分发设置">
                <div className="stpm-create-item">
                  <div className="stpm-create-key"><span className="required-mark">*</span>任务主题</div>
                  <div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" defaultValue={`请反馈${stage}安全三同时资料`} /></div>
                </div>
                <div className="stpm-create-item">
                  <div className="stpm-create-key"><span className="required-mark">*</span>反馈截止日期</div>
                  <div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" defaultValue={config.deadline} /></div>
                </div>
                <div className="stpm-create-item stpm-create-item-wide">
                  <div className="stpm-create-key">通知说明</div>
                  <div className="stpm-create-val"><textarea className="filterbar-control task-textarea" defaultValue={action.task ? `请${task.owner}负责协调${task.dept}反馈本项材料，上传附件并填写反馈说明。` : "请各实施单位负责人按材料清单上传附件并填写反馈说明，逾期将自动纳入阶段风险提醒。"} /></div>
                </div>
              </Section>
              <Section title="分发对象确认">
                <div className="task-config-table-wrap">
                  <table className="task-config-table">
                    <thead><tr><th>选择</th><th>实施单位</th><th>负责人</th><th>工作任务</th><th>通知方式</th></tr></thead>
                    <tbody>
                      {dispatchTasks.map((item) => (
                        <tr key={item.id}>
                          <td><input type="checkbox" defaultChecked /></td>
                          <td>{item.dept}</td>
                          <td><input className="filterbar-control" defaultValue={item.owner} /></td>
                          <td>{item.task}</td>
                          <td><label className="task-inline-check"><input type="checkbox" defaultChecked /> 待办</label><label className="task-inline-check"><input type="checkbox" defaultChecked /> 短信</label></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </>
          ) : null}

          {action.type === "detail" ? (
            <>
              <Section title="任务信息">
                <div className="stpm-create-item stpm-create-item-wide"><div className="stpm-create-key">工作任务</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.task} readOnly /></div></div>
                <div className="stpm-create-item"><div className="stpm-create-key">实施单位</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.dept} readOnly /></div></div>
                <div className="stpm-create-item"><div className="stpm-create-key">负责人</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.owner} readOnly /></div></div>
                <div className="stpm-create-item"><div className="stpm-create-key">分发状态</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.dispatchStatus} readOnly /></div></div>
                <div className="stpm-create-item"><div className="stpm-create-key">反馈状态</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.status} readOnly /></div></div>
                <div className="stpm-create-item"><div className="stpm-create-key">截止日期</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.due} readOnly /></div></div>
              </Section>
              <Section title="反馈材料">
                <div className="task-file-list">
                  <div><strong>反馈说明</strong><span>{task.feedback}</span></div>
                  <div><strong>附件情况</strong><span>{task.attachments.length ? `已上传 ${task.attachments.length} 个附件，可在表格“已反馈附件”列下载。` : "暂无附件"}</span></div>
                  <div><strong>审核意见</strong><span>{task.status === "待补充" ? `材料不完整，需补充：${task.missing || "相关缺项材料"}。` : "材料已接收，待阶段负责人确认。"}</span></div>
                </div>
              </Section>
              <Section title="处理记录">
                <div className="task-flow">
                  <div><b>发起</b><span>{config.ownerDept} 于 2026-03-08 09:20 分发任务</span></div>
                  <div><b>接收</b><span>{task.owner}（{task.dept}）于 2026-03-08 10:05 接收待办</span></div>
                  <div><b>反馈</b><span>{task.feedback}</span></div>
                </div>
              </Section>
            </>
          ) : null}

          {action.type === "remind" ? (
            <Section title="催办信息">
              <div className="stpm-create-item"><div className="stpm-create-key">催办对象</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.dept} readOnly /></div></div>
              <div className="stpm-create-item"><div className="stpm-create-key">负责人</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.owner} readOnly /></div></div>
              <div className="stpm-create-item"><div className="stpm-create-key">任务状态</div><div className="stpm-create-val"><input className="filterbar-control stpm-integrated-control" value={task.status} readOnly /></div></div>
              <div className="stpm-create-item stpm-create-item-wide"><div className="stpm-create-key">催办内容</div><div className="stpm-create-val"><textarea className="filterbar-control task-textarea" defaultValue={`请尽快反馈“${task.task}”相关材料，如已反馈请补充说明或附件。`} /></div></div>
              <div className="stpm-create-item stpm-create-item-wide"><div className="stpm-create-key">发送方式</div><div className="stpm-create-val task-check-row"><label><input type="checkbox" defaultChecked /> 系统待办</label><label><input type="checkbox" defaultChecked /> 短信提醒</label><label><input type="checkbox" /> 邮件</label></div></div>
            </Section>
          ) : null}

        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>取消</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>{action.type === "detail" ? "确认" : action.type === "dispatch" ? "确认分发" : "保存"}</button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [taskAction, setTaskAction] = React.useState(null);
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
  const [basicDesignUnits, setBasicDesignUnits] = React.useState([{ id: "basic-design-unit-1", value: "SEI", assignment: "" }]);
  const [basicDesignUnitsAlt, setBasicDesignUnitsAlt] = React.useState([{ id: "basic-design-unit-alt-1", value: "SEI", assignment: "" }]);
  const [basicDesignBriefs, setBasicDesignBriefs] = React.useState([{ id: "basic-design-brief-1" }]);
  const [basicGovApprovalGroups, setBasicGovApprovalGroups] = React.useState([{ id: "basic-gov-approval-1" }]);
  const [basicSilHazopGroups, setBasicSilHazopGroups] = React.useState([{ id: "basic-sil-hazop-1" }]);
  const [basicSilHazopOptionalGroups, setBasicSilHazopOptionalGroups] = React.useState([{ id: "basic-sil-hazop-opt-1" }]);
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

              <TaskDispatchPanel
                config={stageTaskConfigs[stage]}
                onTemplate={() => setTaskAction({ type: "template" })}
                onDispatch={(task) => setTaskAction({ type: "dispatch", task })}
                onView={(task) => setTaskAction({ type: "detail", task })}
                onRemind={(task) => setTaskAction({ type: "remind", task })}
              />

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
                          <UploadField label="安全条件审查批复文件" required />
                        </>
                      ) : (
                        <UploadField label="原因" required wide extraText="需要企业盖章" />
                      )}
                      <UploadField label="专家组评审意见以及个人修改意见" required />
                      <UploadField label="专家组评审意见修改说明" />
                      <UploadField label="安全评价报告终稿" />
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
                            <UploadField label="安全条件审查批复文件" required />
                            <Field label="政府批复文号" required value="请输入政府批复文号" />
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
                            <UploadField label="安全评价报告终稿" required />
                            <UploadField label="其他附件" />
                          </>
                        ) : (
                          <>
                            <UploadField label="原因" required wide extraText="需要企业盖章" />
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
                            <UploadField label="安全评价报告终稿" required />
                            <UploadField label="其他附件" />
                          </>
                        )}
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
                        <DesignUnitGroup
                          label="设计单位"
                          required
                          items={basicArticle7 === "是" ? basicDesignUnits : basicDesignUnitsAlt}
                          onAdd={() => {
                            if (basicArticle7 === "是") {
                              setBasicDesignUnits((items) => [...items, { id: `basic-design-unit-${items.length + 1}`, value: `设计单位${items.length + 1}`, assignment: "" }]);
                            } else {
                              setBasicDesignUnitsAlt((items) => [...items, { id: `basic-design-unit-alt-${items.length + 1}`, value: `设计单位${items.length + 1}`, assignment: "" }]);
                            }
                          }}
                          onRemove={(id) => {
                            if (basicArticle7 === "是") {
                              setBasicDesignUnits((items) => items.filter((item) => item.id !== id));
                            } else {
                              setBasicDesignUnitsAlt((items) => items.filter((item) => item.id !== id));
                            }
                          }}
                          onAssignmentChange={(id, value) => {
                            if (basicArticle7 === "是") {
                              setBasicDesignUnits((items) => items.map((item) => (item.id === id ? { ...item, assignment: value } : item)));
                            } else {
                              setBasicDesignUnitsAlt((items) => items.map((item) => (item.id === id ? { ...item, assignment: value } : item)));
                            }
                          }}
                        />
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
                            <RepeatablePairGroup
                              label="安全设施设计专篇"
                              required
                              headers={["安全设施设计专篇"]}
                              items={basicDesignBriefs}
                              onAdd={() => setBasicDesignBriefs((items) => [...items, { id: `basic-design-brief-${items.length + 1}` }])}
                              onRemove={(id) => setBasicDesignBriefs((items) => items.filter((item) => item.id !== id))}
                              renderRow={() => <CompactUploadInput />}
                            />
                            <RepeatablePairGroup
                              label="批复时间 / 安全设施设计批复文件"
                              required
                              headers={["批复时间", "安全设施设计批复文件"]}
                              items={basicGovApprovalGroups}
                              onAdd={() => setBasicGovApprovalGroups((items) => [...items, { id: `basic-gov-approval-${items.length + 1}` }])}
                              onRemove={(id) => setBasicGovApprovalGroups((items) => items.filter((item) => item.id !== id))}
                              renderRow={() => (
                                <>
                                  <CompactFieldInput value="请选择时间" />
                                  <CompactUploadInput />
                                </>
                              )}
                            />
                            <RepeatablePairGroup
                              label="SIL分析报告及审查意见 / HAZOP分析报告及审查意见"
                              required
                              headers={["SIL分析报告及审查意见", "HAZOP分析报告及审查意见"]}
                              items={basicSilHazopGroups}
                              onAdd={() => setBasicSilHazopGroups((items) => [...items, { id: `basic-sil-hazop-${items.length + 1}` }])}
                              onRemove={(id) => setBasicSilHazopGroups((items) => items.filter((item) => item.id !== id))}
                              renderRow={() => (
                                <>
                                  <CompactUploadInput />
                                  <CompactUploadInput />
                                </>
                              )}
                            />
                          </>
                        ) : (
                          <>
                            <UploadField label="专家意见" required />
                            <UploadField label="安全设施设计" required />
                            <UploadField label="原因" required />
                            {basicArticle7 === "否" ? (
                              <RepeatablePairGroup
                                label="SIL分析报告及审查意见 / HAZOP分析报告及审查意见"
                                headers={["SIL分析报告及审查意见", "HAZOP分析报告及审查意见"]}
                                items={basicSilHazopOptionalGroups}
                                onAdd={() => setBasicSilHazopOptionalGroups((items) => [...items, { id: `basic-sil-hazop-opt-${items.length + 1}` }])}
                                onRemove={(id) => setBasicSilHazopOptionalGroups((items) => items.filter((item) => item.id !== id))}
                                renderRow={() => (
                                  <>
                                    <CompactUploadInput />
                                    <CompactUploadInput />
                                  </>
                                )}
                                hintText="第七条规定项目选择“否”时为非必填"
                              />
                            ) : null}
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
                    {trialGovApprove === "是" ? (
                      <>
                        <Field label="审查组织单位" required value="请输入审查单位" />
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
            <TaskActionModal action={taskAction} config={stageTaskConfigs[stage]} stage={stage} onClose={() => setTaskAction(null)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
