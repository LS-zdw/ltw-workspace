import React from "react";
import Card from "/src/components/ui/Card.jsx";

const enterpriseName = "镇海炼化";

const recordRows = [
  {
    id: 1,
    planCode: "ZHLH-2026-001",
    planName: "2026年班组长安全履职能力提升计划",
    className: "班组长安全提升一期",
    executePeriod: "1",
    startDate: "2026-02-24",
    endDate: "2026-03-07",
    target: "一线班组长与安全员",
    planType: "企业年度",
    hostDept: "安全环保部",
    undertakeDept: "人力资源部",
    hours: "24",
    traineeCount: "48",
    passCount: "46",
    passRate: "95.8%",
    certFlag: "是",
    recorder: "肖鹏",
    recordTime: "2026-03-07 17:12:51"
  },
  {
    id: 2,
    planCode: "ZHLH-2026-002",
    planName: "直接作业环节安全专项计划",
    className: "直接作业安全培训（二期）",
    executePeriod: "1",
    startDate: "2026-02-10",
    endDate: "2026-02-11",
    target: "作业许可审批人员",
    planType: "企业临时",
    hostDept: "工程管理部",
    undertakeDept: "设备管理部",
    hours: "8",
    traineeCount: "36",
    passCount: "34",
    passRate: "94.4%",
    certFlag: "是",
    recorder: "王敏",
    recordTime: "2026-02-11 16:20:09"
  },
  {
    id: 3,
    planCode: "ZHLH-2026-003",
    planName: "新员工三级安全教育计划",
    className: "新员工三级教育（2月）",
    executePeriod: "1",
    startDate: "2026-02-06",
    endDate: "2026-02-06",
    target: "新入职员工",
    planType: "运行部月度",
    hostDept: "人力资源部",
    undertakeDept: "安全环保部",
    hours: "6",
    traineeCount: "27",
    passCount: "27",
    passRate: "100%",
    certFlag: "否",
    recorder: "高杨",
    recordTime: "2026-02-06 18:03:16"
  },
  {
    id: 4,
    planCode: "ZHLH-2026-004",
    planName: "检维修作业许可管理培训计划",
    className: "检维修许可与隔离专项班",
    executePeriod: "1",
    startDate: "2026-02-01",
    endDate: "2026-02-28",
    target: "检维修作业人员",
    planType: "运行部年度",
    hostDept: "工程管理部",
    undertakeDept: "生产运行部",
    hours: "12",
    traineeCount: "30",
    passCount: "28",
    passRate: "93.3%",
    certFlag: "否",
    recorder: "李卓",
    recordTime: "2026-02-28 19:31:44"
  },
  {
    id: 5,
    planCode: "ZHLH-2026-005",
    planName: "消防应急联动演练培训计划",
    className: "消防器材实操与疏散演练",
    executePeriod: "1",
    startDate: "2026-01-25",
    endDate: "2026-02-04",
    target: "消防应急小组",
    planType: "其他",
    hostDept: "消防保卫部",
    undertakeDept: "安全环保部",
    hours: "10",
    traineeCount: "52",
    passCount: "49",
    passRate: "94.2%",
    certFlag: "否",
    recorder: "周凯",
    recordTime: "2026-02-04 15:09:38"
  },
  {
    id: 6,
    planCode: "ZHLH-2026-006",
    planName: "危化品储运安全管理计划",
    className: "储运岗位专项培训",
    executePeriod: "2",
    startDate: "2026-03-10",
    endDate: "2026-03-21",
    target: "储运岗位人员",
    planType: "企业年度",
    hostDept: "生产运行部",
    undertakeDept: "设备管理部",
    hours: "16",
    traineeCount: "45",
    passCount: "43",
    passRate: "95.6%",
    certFlag: "是",
    recorder: "陈涛",
    recordTime: "2026-03-21 16:55:07"
  },
  {
    id: 7,
    planCode: "ZHLH-2026-007",
    planName: "受限空间作业监护培训",
    className: "作业监护人能力专项班",
    executePeriod: "1",
    startDate: "2026-03-03",
    endDate: "2026-03-04",
    target: "作业监护人员",
    planType: "企业临时",
    hostDept: "安全环保部",
    undertakeDept: "工程管理部",
    hours: "8",
    traineeCount: "40",
    passCount: "38",
    passRate: "95.0%",
    certFlag: "是",
    recorder: "肖鹏",
    recordTime: "2026-03-04 18:12:33"
  },
  {
    id: 8,
    planCode: "ZHLH-2026-008",
    planName: "环保合规与清洁生产培训计划",
    className: "环保法规专题班",
    executePeriod: "1",
    startDate: "2026-03-01",
    endDate: "2026-03-02",
    target: "环保管理人员",
    planType: "运行部月度",
    hostDept: "安全环保部",
    undertakeDept: "生产技术部",
    hours: "6",
    traineeCount: "26",
    passCount: "25",
    passRate: "96.2%",
    certFlag: "否",
    recorder: "王敏",
    recordTime: "2026-03-02 14:06:52"
  },
  {
    id: 9,
    planCode: "ZHLH-2026-009",
    planName: "设备完整性风险识别培训",
    className: "设备风险识别提升班",
    executePeriod: "1",
    startDate: "2026-03-18",
    endDate: "2026-03-19",
    target: "设备管理骨干",
    planType: "运行部月度",
    hostDept: "设备管理部",
    undertakeDept: "工程管理部",
    hours: "8",
    traineeCount: "32",
    passCount: "31",
    passRate: "96.9%",
    certFlag: "否",
    recorder: "李卓",
    recordTime: "2026-03-19 17:40:26"
  },
  {
    id: 10,
    planCode: "ZHLH-2026-010",
    planName: "班组应急处置能力强化计划",
    className: "班组应急处置演练班",
    executePeriod: "1",
    startDate: "2026-03-25",
    endDate: "2026-03-26",
    target: "一线班组成员",
    planType: "其他",
    hostDept: "生产运行部",
    undertakeDept: "消防保卫部",
    hours: "8",
    traineeCount: "54",
    passCount: "51",
    passRate: "94.4%",
    certFlag: "否",
    recorder: "高杨",
    recordTime: "2026-03-26 16:01:05"
  }
];

const participantRows = [
  { id: 1, enterprise: enterpriseName, unit: "生产运行部", name: "张明", post: "班组长", personType: "新员工", score: "89", pass: "是" },
  { id: 2, enterprise: enterpriseName, unit: "安全环保部", name: "刘敏", post: "安全员", personType: "派遣", score: "82", pass: "是" },
  { id: 3, enterprise: enterpriseName, unit: "设备管理部", name: "陈超", post: "设备工程师", personType: "外包", score: "91", pass: "是" }
];

const certificateTypes = [
  "HSE关键岗位资格",
  "主要负责人安全合格证",
  "特种作业资格证",
  "作业票监护人资格"
];

const planExecuteRows = [
  { id: 1, planCode: "ZHLH-2026-001", className: "班组长安全提升一期", period: "1", month: "2", content: "安全生产责任制与现场风险辨识", type: "集中面授", hostDept: "安全环保部", undertakeDept: "人力资源部", planPeople: "50", realPeople: "48", passPeople: "46", passRate: "95.8%", certFlag: "是", recorder: "肖鹏", recordTime: "2026-03-07 17:12:51" },
  { id: 2, planCode: "ZHLH-2026-001", className: "班组长安全提升二期", period: "2", month: "6", content: "隐患排查闭环与应急处置演练", type: "集中面授", hostDept: "安全环保部", undertakeDept: "人力资源部", planPeople: "40", realPeople: "39", passPeople: "38", passRate: "97.4%", certFlag: "是", recorder: "肖鹏", recordTime: "2026-06-21 16:01:28" },
  { id: 3, planCode: "ZHLH-2026-001", className: "班组长案例复盘专题班", period: "2", month: "7", content: "典型事故案例复盘与风险预控", type: "线上培训", hostDept: "安全环保部", undertakeDept: "人力资源部", planPeople: "30", realPeople: "29", passPeople: "28", passRate: "96.6%", certFlag: "否", recorder: "王敏", recordTime: "2026-07-18 14:22:10" }
];

function calcRecordDays(row) {
  const start = new Date(row.startDate);
  const end = new Date(row.endDate);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "1";
  return String(Math.max(1, Math.round((end - start) / 86400000) + 1));
}

function Field({ label, required = false, children, wide = false }) {
  return (
    <div className={`cert-field-item${wide ? " cert-field-item-wide" : ""}`}>
      <div className="cert-field-label">{required ? <span className="required-mark">*</span> : null}{label}:</div>
      <div className="cert-field-value">{children}</div>
    </div>
  );
}

function RecordForm({ row, readOnly = false }) {
  const [personModalOpen, setPersonModalOpen] = React.useState(false);

  return (
    <>
      <div className="cert-section">
        <div className="cert-section-title">培训记录登记</div>
        <div className="cert-form-grid">
          <Field label="培训项目名称" required>
            <select className="cert-field-control" defaultValue={row.className} disabled={readOnly}>
              {planExecuteRows.map((item) => <option key={item.id}>{item.className}</option>)}
            </select>
          </Field>
          <Field label="期次" required><input className="cert-field-control" defaultValue={row.executePeriod} readOnly={readOnly} placeholder="请输入期次" /></Field>
          <Field label="计划天数"><input className="cert-field-control" defaultValue={calcRecordDays(row)} readOnly /></Field>
          <Field label="实际培训日期" required>
            <div className="filterbar-range">
              <input className="cert-field-control" defaultValue={row.startDate} readOnly={readOnly} placeholder="开始日期" />
              <span className="filterbar-range-sep">-</span>
              <input className="cert-field-control" defaultValue={row.endDate} readOnly={readOnly} placeholder="结束日期" />
            </div>
          </Field>
          <Field label="培训内容" required wide>
            <textarea
              className="cert-field-control cert-field-textarea cert-field-textarea-large"
              defaultValue={row.planName}
              readOnly={readOnly}
              placeholder="请输入培训内容"
            />
          </Field>
          <Field label="参训人数" required><input className="cert-field-control" defaultValue={row.traineeCount} readOnly={readOnly} placeholder="请输入参训人数" /></Field>
          <Field label="是否取证" required>
            <select className="cert-field-control" defaultValue={row.certFlag} disabled={readOnly}>
              <option>是</option>
              <option>否</option>
            </select>
          </Field>
          <Field label="证书类型" required>
            <select className="cert-field-control" defaultValue="HSE关键岗位资格" disabled={readOnly || row.certFlag !== "是"}>
              {certificateTypes.map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
          <Field label="附件" wide>
            <div className="cert-picker">
              <button type="button" className="btn" disabled={readOnly}>选择文件</button>
              <input className="cert-field-control" defaultValue="未上传附件" readOnly />
            </div>
          </Field>
        </div>
      </div>

      <div className="cert-section">
        <div className="cert-section-title">培训人员名单</div>
        {!readOnly ? (
          <div className="record-toolbar">
            <button type="button" className="btn btn-primary" onClick={() => setPersonModalOpen(true)}>新增</button>
            <button type="button" className="btn">编辑</button>
            <button type="button" className="btn btn-danger">删除</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        ) : null}
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>企业</th><th>所在单位</th><th>姓名</th><th>岗位</th><th>人员类型</th><th>成绩</th><th>是否合格</th>
              </tr>
            </thead>
            <tbody>
              {participantRows.map((r) => (
                <tr key={r.id}>
                  <td className="table-checkbox"><input type="checkbox" readOnly /></td><td>{r.id}</td><td>{r.enterprise}</td><td>{r.unit}</td><td>{r.name}</td><td>{r.post}</td><td>{r.personType}</td><td>{r.score}</td><td>{r.pass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {personModalOpen ? (
        <div className="modal-mask" onClick={() => setPersonModalOpen(false)}>
          <div className="modal cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div className="modal-title">培训人员新增</div>
              <button type="button" className="modal-close" onClick={() => setPersonModalOpen(false)}>x</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">人员信息</div>
                <div className="cert-form-grid">
                  <Field label="企业" required><input className="cert-field-control" defaultValue={enterpriseName} readOnly /></Field>
                  <Field label="所在单位" required><input className="cert-field-control" placeholder="请选择所在单位" /></Field>
                  <Field label="姓名" required><input className="cert-field-control" placeholder="请选择或输入姓名" /></Field>
                  <Field label="岗位"><input className="cert-field-control" placeholder="请输入岗位" /></Field>
                  <Field label="人员类型" required>
                    <select className="cert-field-control" defaultValue="新员工">
                      <option>新员工</option>
                      <option>派遣</option>
                      <option>外包</option>
                    </select>
                  </Field>
                  <Field label="成绩"><input className="cert-field-control" placeholder="请输入成绩" /></Field>
                  <Field label="是否合格" required>
                    <select className="cert-field-control" defaultValue="是">
                      <option>是</option>
                      <option>否</option>
                    </select>
                  </Field>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={() => setPersonModalOpen(false)}>取消</button>
              <button type="button" className="btn btn-primary" onClick={() => setPersonModalOpen(false)}>保存</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default function Page() {
  const [activeModal, setActiveModal] = React.useState("");

  const openFirstRowOnly = (rowId, modal) => {
    if (rowId !== 1) return;
    setActiveModal(modal);
  };

  const currentRow = recordRows[0];
  const isRecordFormModal = activeModal === "add-record" || activeModal === "edit-record";
  const isAddRecordModal = activeModal === "add-record";

  return (
    <div className="stack trm-enterprise">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">项目代码</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入项目代码" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">项目名称</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入项目名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">实际培训日期</div><div className="filterbar-input"><div className="filterbar-range"><input className="filterbar-control" defaultValue="2026-02-01" placeholder="开始日期" /><span className="filterbar-range-sep">-</span><input className="filterbar-control" defaultValue="2026-03-31" placeholder="结束日期" /></div></div></div>
            <div className="filterbar-item"><div className="filterbar-label">是否取证</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择是否取证"><option>请选择是否取证</option><option>是</option><option>否</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">证书类型</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择证书类型"><option>请选择证书类型</option>{certificateTypes.map((item) => <option key={item}>{item}</option>)}</select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">登记部门</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择登记部门"><option>请选择登记部门</option><option>安全环保部</option><option>工程管理部</option><option>人力资源部</option><option>生产运行部</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">登记日期</div><div className="filterbar-input"><div className="filterbar-range"><input className="filterbar-control" placeholder="开始日期" /><span className="filterbar-range-sep">-</span><input className="filterbar-control" placeholder="结束日期" /></div></div></div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-right-actions">
            <button type="button" className="btn btn-primary" onClick={() => setActiveModal("add-record")}>新增</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        </div>
      </div>

      <Card title="培训记录管理" desc="">
        <div className="trm-list-surface">
          <div className="table-wrap" data-pager="manual">
            <table className="proto-table">
              <thead>
                <tr>
                  <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                  <th>序号</th><th>项目代码</th><th>项目名称</th><th>期次</th><th>计划天数</th><th>实际天数</th><th>实际培训日期</th><th>培训内容</th><th>参训人数</th><th>合格人数</th><th>合格率</th><th>是否取证</th><th>证书类型</th><th>登记部门</th><th>登记人</th><th>登记日期</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                {recordRows.map((row) => (
                  <tr key={row.id}>
                    <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                    <td>{row.id}</td>
                    <td>{row.planCode}</td>
                    <td><button type="button" className="table-link-btn" onClick={() => openFirstRowOnly(row.id, "record-detail")}>{row.className}</button></td>
                    <td>{row.executePeriod}</td>
                    <td>{calcRecordDays(row)}</td>
                    <td>{calcRecordDays(row)}</td>
                    <td>{row.startDate} 至 {row.endDate}</td>
                    <td>{row.planName}</td>
                    <td>{row.traineeCount}</td>
                    <td>{row.passCount}</td>
                    <td>{row.passRate}</td>
                    <td>{row.certFlag}</td>
                    <td>{row.certFlag === "是" ? "培训合格证" : "无"}</td>
                    <td>{row.hostDept}</td>
                    <td>{row.recorder}</td>
                    <td>{String(row.recordTime || "").slice(0, 10)}</td>
                    <td>
                      <div className="table-op-inline">
                        <button type="button" className="table-link-btn" onClick={() => openFirstRowOnly(row.id, "edit-record")}>编辑</button>
                        <button type="button" className="table-link-btn danger">删除</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {isRecordFormModal ? (
        <div className="modal-mask" onClick={() => setActiveModal("")}> 
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div className="modal-title">{isAddRecordModal ? "培训记录新增" : "培训记录编辑"}</div><button type="button" className="modal-close" onClick={() => setActiveModal("")}>x</button></div>
            <div className="modal-bd cert-bd"><RecordForm row={currentRow} /></div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={() => setActiveModal("")}>取消</button>
              <button type="button" className="btn btn-primary" onClick={() => setActiveModal("")}>保存</button>
              {isAddRecordModal ? <button type="button" className="btn btn-primary" onClick={() => setActiveModal("")}>提交</button> : null}
            </div>
          </div>
        </div>
      ) : null}

      {activeModal === "plan-detail" ? (
        <div className="modal-mask" onClick={() => setActiveModal("")}> 
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div className="modal-title">培训计划详情</div><button type="button" className="modal-close" onClick={() => setActiveModal("")}>x</button></div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">培训计划详情</div>
                <div className="cert-form-grid">
                  <Field label="年度"><input className="cert-field-control" defaultValue="2026" readOnly /></Field>
                  <Field label="计划代码"><input className="cert-field-control" defaultValue="ZHLH-2026-001" readOnly /></Field>
                  <Field label="培训计划名称"><input className="cert-field-control" defaultValue={currentRow.planName} readOnly /></Field>
                  <Field label="培训对象"><input className="cert-field-control" defaultValue={currentRow.target} readOnly /></Field>
                  <Field label="计划类型"><input className="cert-field-control" defaultValue={currentRow.planType} readOnly /></Field>
                  <Field label="主办部门"><input className="cert-field-control" defaultValue={currentRow.hostDept} readOnly /></Field>
                  <Field label="承办部门"><input className="cert-field-control" defaultValue={currentRow.undertakeDept} readOnly /></Field>
                  <Field label="计划培训人数"><input className="cert-field-control" defaultValue="120" readOnly /></Field>
                  <Field label="培训天数"><input className="cert-field-control" defaultValue="6" readOnly /></Field>
                  <Field label="办班地点"><input className="cert-field-control" defaultValue="镇海炼化培训中心A201" readOnly /></Field>
                  <Field label="培训内容" wide><textarea className="cert-field-control cert-field-textarea cert-field-textarea-large" defaultValue="围绕班组安全管理、风险辨识、隐患排查和应急处置开展培训。" readOnly /></Field>
                </div>
                <div className="plan-time-row">
                  <div className="plan-time-left">
                    <div className="plan-time-title">计划时间:</div>
                    <div className="plan-time-year">2026年</div>
                    <div className="plan-months">
                      <label className="plan-month-item"><input type="checkbox" readOnly />1月</label>
                      <label className="plan-month-item"><input type="checkbox" checked readOnly />2月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />3月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />4月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />5月</label>
                      <label className="plan-month-item"><input type="checkbox" checked readOnly />6月</label>
                      <label className="plan-month-item"><input type="checkbox" checked readOnly />7月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />8月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />9月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />10月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />11月</label>
                      <label className="plan-month-item"><input type="checkbox" readOnly />12月</label>
                    </div>
                  </div>
                  <div className="plan-time-right">
                    <div className="plan-time-title">计划参与机构:</div>
                    <div className="tag-row">
                      <span className="tag">安全环保部</span>
                      <span className="tag">人力资源部</span>
                      <span className="tag">生产运行部</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">计划执行情况</div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>序号</th><th>培训班名称</th><th>期次</th><th>开班月份</th><th>培训内容</th><th>培训形式</th><th>计划培训人数</th><th>实际培训人数</th><th>考试合格人员数量</th><th>合格率</th>
                      </tr>
                    </thead>
                    <tbody>
                      {planExecuteRows.map((r) => (
                        <tr key={r.id}>
                          <td>{r.id}</td><td>{r.className}</td><td>{r.period}</td><td>{r.month}</td><td>{r.content}</td><td>{r.type}</td><td>{r.planPeople}</td><td>{r.realPeople}</td><td>{r.passPeople}</td><td>{r.passRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-ft"><button type="button" className="btn" onClick={() => setActiveModal("")}>关闭</button></div>
          </div>
        </div>
      ) : null}

      {activeModal === "record-detail" ? (
        <div className="modal-mask" onClick={() => setActiveModal("")}> 
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div className="modal-title">培训记录详情</div><button type="button" className="modal-close" onClick={() => setActiveModal("")}>x</button></div>
            <div className="modal-bd cert-bd"><RecordForm row={currentRow} readOnly /></div>
            <div className="modal-ft"><button type="button" className="btn" onClick={() => setActiveModal("")}>关闭</button></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
