import React from "react";

const rows = [
  { id: 1, code: "HSE2026001", projectName: "关键岗位培训", target: "新员工", personType: "新员工", people: "120", days: "2", time: "2026-06-18", host: "安全环保部", organizer: "HSE培训中心", place: "第一培训教室", contact: "王强", phone: "13800000001", periods: "2", status: "已提交", linked: true, attachment: "培训方案.pdf", registrar: "王强", registerDept: "安全环保部", registerDate: "2026-05-18", remark: "年度重点" },
  { id: 2, code: "HSE2026002", projectName: "关键岗位培训", target: "基层安全员", personType: "安全员", people: "96", days: "2", time: "2026-06-20", host: "安全环保部", organizer: "HSE培训中心", place: "第二培训教室", contact: "李明", phone: "13800000002", periods: "2", status: "草稿", linked: false, attachment: "", registrar: "李明", registerDept: "安全环保部", registerDate: "2026-05-18", remark: "年度重点" },
  { id: 3, code: "HSE2026003", projectName: "承包商入厂安全培训", target: "安全科长", personType: "安全总监、科长", people: "86", days: "1", time: "2026-06-25", host: "工程管理部", organizer: "安全环保部", place: "承包商培训室", contact: "赵敏", phone: "13800000003", periods: "1", status: "已提交", linked: false, attachment: "", registrar: "赵敏", registerDept: "工程管理部", registerDate: "2026-05-17", remark: "入厂前完成" },
  { id: 4, code: "HSE2026004", projectName: "特殊作业票证管理培训", target: "安全处长", personType: "安全总监、科长", people: "64", days: "1", time: "2026-07-05", host: "生产运行部", organizer: "HSE培训中心", place: "线上培训", contact: "陈伟", phone: "13800000004", periods: "1", status: "已提交", linked: true, attachment: "考试要求.docx", registrar: "陈伟", registerDept: "生产运行部", registerDate: "2026-05-16", remark: "考试合格后上岗" },
  { id: 5, code: "HSE2026005", projectName: "关键岗位培训", target: "安全总监", personType: "安全总监、科长", people: "120", days: "2", time: "2026-07-12", host: "安全环保部", organizer: "HSE培训中心", place: "第一培训教室", contact: "王强", phone: "13800000001", periods: "2", status: "草稿", linked: false, attachment: "", registrar: "王强", registerDept: "安全环保部", registerDate: "2026-05-15", remark: "年度重点" },
  { id: 6, code: "HSE2026006", projectName: "承包商入厂安全培训", target: "基层安全员", personType: "安全员", people: "86", days: "1", time: "2026-07-18", host: "工程管理部", organizer: "安全环保部", place: "承包商培训室", contact: "李明", phone: "13800000002", periods: "1", status: "已提交", linked: false, attachment: "", registrar: "李明", registerDept: "工程管理部", registerDate: "2026-05-15", remark: "入厂前完成" },
  { id: 7, code: "HSE2026007", projectName: "特殊作业票证管理培训", target: "新员工", personType: "新员工", people: "64", days: "1", time: "2026-07-25", host: "生产运行部", organizer: "HSE培训中心", place: "线上培训", contact: "赵敏", phone: "13800000003", periods: "1", status: "已提交", linked: true, attachment: "", registrar: "赵敏", registerDept: "生产运行部", registerDate: "2026-05-14", remark: "考试合格后上岗" },
  { id: 8, code: "HSE2026008", projectName: "关键岗位培训", target: "安全处长", personType: "安全总监、科长", people: "96", days: "2", time: "2026-08-02", host: "安全环保部", organizer: "HSE培训中心", place: "第二培训教室", contact: "陈伟", phone: "13800000004", periods: "2", status: "草稿", linked: false, attachment: "", registrar: "陈伟", registerDept: "安全环保部", registerDate: "2026-05-13", remark: "年度重点" },
  { id: 9, code: "HSE2026009", projectName: "承包商入厂安全培训", target: "安全总监", personType: "安全总监、科长", people: "86", days: "1", time: "2026-08-10", host: "工程管理部", organizer: "安全环保部", place: "承包商培训室", contact: "王强", phone: "13800000001", periods: "1", status: "已提交", linked: false, attachment: "", registrar: "王强", registerDept: "工程管理部", registerDate: "2026-05-12", remark: "入厂前完成" },
  { id: 10, code: "HSE2026010", projectName: "特殊作业票证管理培训", target: "安全科长", personType: "安全总监、科长", people: "64", days: "1", time: "2026-08-18", host: "生产运行部", organizer: "HSE培训中心", place: "线上培训", contact: "李明", phone: "13800000002", periods: "1", status: "已提交", linked: false, attachment: "", registrar: "李明", registerDept: "生产运行部", registerDate: "2026-05-11", remark: "考试合格后上岗" }
];

const targetOptions = [
  "新员工",
  "基层安全员",
  "安全总监",
  "安全处长",
  "安全科长"
];

const personTypeOptions = ["新员工", "安全员", "安全总监、科长", "其他"];

const executeRows = [
  {
    id: 1,
    planCode: "HSE2026001",
    className: "关键岗位培训一期",
    period: "1",
    startDate: "2026-06-18",
    endDate: "2026-06-19",
    actualDays: "2",
    content: "关键岗位安全职责、风险辨识与隐患排查",
    certFlag: "是",
    traineeCount: "58",
    passCount: "56",
    passRate: "96.6%",
    certLevel: "集团公司发证",
    certType: "HSE关键岗位资格",
    certSubtype: "无",
    status: "已提交",
    recorder: "王强",
    recordTime: "2026-06-19 18:26:15"
  },
  {
    id: 2,
    planCode: "HSE2026001",
    className: "关键岗位培训二期",
    period: "2",
    startDate: "2026-06-25",
    endDate: "2026-06-26",
    actualDays: "2",
    content: "事故案例复盘、应急处置与作业许可管控",
    certFlag: "是",
    traineeCount: "62",
    passCount: "60",
    passRate: "96.8%",
    certLevel: "集团公司发证",
    certType: "HSE关键岗位资格",
    certSubtype: "无",
    status: "草稿",
    recorder: "李明",
    recordTime: "2026-06-26 17:03:42"
  },
  {
    id: 3,
    planCode: "HSE2026004",
    className: "特殊作业票证管理专项班",
    period: "1",
    startDate: "2026-07-05",
    endDate: "2026-07-05",
    actualDays: "1",
    content: "特殊作业票证管理、审批流程与监护要求",
    certFlag: "否",
    traineeCount: "64",
    passCount: "61",
    passRate: "95.3%",
    certLevel: "-",
    certType: "-",
    certSubtype: "-",
    status: "已提交",
    recorder: "陈伟",
    recordTime: "2026-07-05 16:18:09"
  }
];

function PlanModal({ mode, row, onClose, onSubmit }) {
  if (!mode) return null;
  const isView = mode === "view";
  const isLocked = isView || row?.status === "已提交";
  const title = mode === "add" ? "新增HSE培训计划" : isView ? "HSE培训计划详情" : "编辑HSE培训计划";
  const data = row || {};
  const planExecuteRows = executeRows.filter((item) => item.planCode === data.code);

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-bd cert-bd">
          <div className="cert-section">
            <div className="cert-section-title">培训计划信息</div>
            <div className="cert-form-grid hse-plan-form-grid">
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>项目代码：</div>
                <div className="cert-field-value"><input className="cert-field-control" value={data.code || "系统自动生成"} disabled /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>项目名称：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.projectName || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label"><span className="required-mark">*</span>培训对象：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" defaultValue={data.target || "新员工"} disabled={isLocked}>
                    {targetOptions.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>培训人员类型：</div>
                <div className="cert-field-value">
                  <select className="cert-field-control" defaultValue={data.personType || "新员工"} disabled={isLocked}>
                    {personTypeOptions.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>培训人数：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.people || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>天数：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.days || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>计划时间：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.time || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>主办单位：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.host || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>承办单位：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.organizer || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>办班地点：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.place || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>联系人：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.contact || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>联系电话：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.phone || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label"><span className="required-mark">*</span>期数：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.periods || ""} readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label">附件：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.attachment || ""} placeholder="可上传附件，非必填" readOnly={isLocked} /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记人：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.registrar || "当前用户"} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记部门：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.registerDept || "当前部门"} readOnly /></div>
              </div>
              <div className="cert-field-item">
                <div className="cert-field-label">登记日期：</div>
                <div className="cert-field-value"><input className="cert-field-control" defaultValue={data.registerDate || "2026-05-18"} readOnly /></div>
              </div>
              <div className="cert-field-item cert-field-item-wide">
                <div className="cert-field-label">备注：</div>
                <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" defaultValue={data.remark || ""} readOnly={isLocked} /></div>
              </div>
            </div>
          </div>
          {isView ? (
            <div className="cert-section">
              <div className="cert-section-title">执行情况</div>
              <div className="table-wrap">
                <table className="proto-table">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>本次期次</th>
                      <th>实际培训日期</th>
                      <th>实际天数</th>
                      <th>培训内容</th>
                      <th>参训人数</th>
                      <th>合格人数</th>
                      <th>合格率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planExecuteRows.length ? (
                      planExecuteRows.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.period}</td>
                          <td>{item.startDate === item.endDate ? item.startDate : `${item.startDate} 至 ${item.endDate}`}</td>
                          <td>{item.actualDays}</td>
                          <td>{item.content}</td>
                          <td>{item.traineeCount}</td>
                          <td>{item.passCount}</td>
                          <td>{item.passRate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ textAlign: "center", color: "#8c8c8c" }}>
                          暂无执行记录
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>{isView ? "关闭" : "取消"}</button>
          {!isLocked ? <button type="button" className="btn btn-primary" onClick={onClose}>保存</button> : null}
          {!isLocked ? <button type="button" className="btn btn-primary" onClick={() => onSubmit(data)}>提交</button> : null}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [planModal, setPlanModal] = React.useState(null);
  const [planRows, setPlanRows] = React.useState(rows);
  const [message, setMessage] = React.useState("");

  const openFirstOnly = (row, mode) => {
    setPlanModal({ mode, row });
  };

  const showMessage = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const submitPlan = (row) => {
    setPlanRows((prev) => prev.map((item) => (item.id === row.id ? { ...item, status: "已提交" } : item)));
    showMessage(`${row.projectName} 已提交，提交后不可编辑。`);
  };

  return (
    <div className="stack hse-plan-page">
      {message ? <div className="hq-report-message">{message}</div> : null}
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">项目代码：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入项目代码" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">项目名称：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入项目名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训人员类型：</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option value="全部">全部</option>{personTypeOptions.map((item) => <option key={item} value={item}>{item}</option>)}</select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">主办单位：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入主办单位" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">承办单位：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入承办单位" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">计划时间：</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入计划时间" /></div></div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-actions filterbar-actions-left">
            <button type="button" className="btn btn-primary" onClick={() => setPlanModal({ mode: "add", row: null })}>新增</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        </div>
      </div>

      <div className="table-wrap hse-plan-table-wrap" data-pager="manual">
        <table className="proto-table hse-plan-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>项目代码</th>
              <th>项目名称</th>
              <th>培训对象</th>
              <th>培训人员类型</th>
              <th>培训人数</th>
              <th>天数</th>
              <th>计划时间</th>
              <th>主办单位</th>
              <th>承办单位</th>
              <th>办班地点</th>
              <th>联系人</th>
              <th>联系方式</th>
              <th>期数</th>
              <th>备注</th>
              <th>状态</th>
              <th>登记人</th>
              <th>登记部门</th>
              <th>登记日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {planRows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.code}</td>
                <td>{row.id === 1 ? <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row, "view")}>{row.projectName}</button> : <span className="hse-plan-fake-link">{row.projectName}</span>}</td>
                <td>{row.target}</td>
                <td>{row.personType}</td>
                <td>{row.people}</td>
                <td>{row.days}</td>
                <td>{row.time}</td>
                <td>{row.host}</td>
                <td>{row.organizer}</td>
                <td>{row.place}</td>
                <td>{row.contact}</td>
                <td>{row.phone}</td>
                <td>{row.periods}</td>
                <td>{row.remark}</td>
                <td><span className={`hq-plan-status ${row.status === "已提交" ? "done" : "draft"}`}>{row.status}</span></td>
                <td>{row.registrar}</td>
                <td>{row.registerDept}</td>
                <td>{row.registerDate}</td>
                <td>
                  <div className="table-op-inline">
                    {row.status === "已提交" ? (
                      <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row, "view")}>查看</button>
                    ) : (
                      <button type="button" className="table-link-btn" onClick={() => openFirstOnly(row, "edit")}>编辑</button>
                    )}
                    {row.status !== "已提交" ? <button type="button" className="table-link-btn" onClick={() => submitPlan(row)}>提交</button> : null}
                    <button type="button" className="table-link-btn danger" disabled={row.linked} title={row.linked ? "已关联记录的计划不能删除" : ""}>删除</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stpm-main-pager">
        <div className="stpm-main-pager-total">共 10 条记录 第 1 / 1 页</div>
        <div className="stpm-main-pager-controls">
          <button type="button" className="stpm-main-page-btn" disabled>‹</button>
          <button type="button" className="stpm-main-page-btn active">1</button>
          <button type="button" className="stpm-main-page-btn" disabled>›</button>
          <select className="stpm-main-page-size" defaultValue="10"><option value="10">10条/页</option></select>
        </div>
      </div>

      <PlanModal
        mode={planModal?.mode}
        row={planModal?.row}
        onClose={() => setPlanModal(null)}
        onSubmit={(row) => {
          const targetRow = row?.id ? row : { id: 0, projectName: "新增HSE培训计划" };
          submitPlan(targetRow);
          setPlanModal(null);
        }}
      />
    </div>
  );
}
