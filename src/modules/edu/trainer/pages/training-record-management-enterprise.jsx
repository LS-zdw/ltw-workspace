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
  { id: 1, name: "张明", uid: "ZHANGMING320821", dept: "生产运行部", mobile: "13810010001", certNo: "AQ20260224001", score: "89", attend: "是", pass: "是" },
  { id: 2, name: "刘敏", uid: "LIUMIN420602", dept: "安全环保部", mobile: "13810010002", certNo: "AQ20260224002", score: "82", attend: "是", pass: "是" },
  { id: 3, name: "陈超", uid: "CHENCHAO340823", dept: "设备管理部", mobile: "13810010003", certNo: "AQ20260224003", score: "91", attend: "是", pass: "是" }
];

const planExecuteRows = [
  { id: 1, planCode: "ZHLH-2026-001", className: "班组长安全提升一期", period: "1", month: "2", content: "安全生产责任制与现场风险辨识", type: "集中面授", hostDept: "安全环保部", undertakeDept: "人力资源部", planPeople: "50", realPeople: "48", passPeople: "46", passRate: "95.8%", certFlag: "是", recorder: "肖鹏", recordTime: "2026-03-07 17:12:51" },
  { id: 2, planCode: "ZHLH-2026-001", className: "班组长安全提升二期", period: "2", month: "6", content: "隐患排查闭环与应急处置演练", type: "集中面授", hostDept: "安全环保部", undertakeDept: "人力资源部", planPeople: "40", realPeople: "39", passPeople: "38", passRate: "97.4%", certFlag: "是", recorder: "肖鹏", recordTime: "2026-06-21 16:01:28" },
  { id: 3, planCode: "ZHLH-2026-001", className: "班组长案例复盘专题班", period: "2", month: "7", content: "典型事故案例复盘与风险预控", type: "线上培训", hostDept: "安全环保部", undertakeDept: "人力资源部", planPeople: "30", realPeople: "29", passPeople: "28", passRate: "96.6%", certFlag: "否", recorder: "王敏", recordTime: "2026-07-18 14:22:10" }
];

function Field({ label, required = false, children, wide = false }) {
  return (
    <div className={`cert-field-item${wide ? " cert-field-item-wide" : ""}`}>
      <div className="cert-field-label">{required ? <span className="required-mark">*</span> : null}{label}:</div>
      <div className="cert-field-value">{children}</div>
    </div>
  );
}

function RecordForm({ row, readOnly = false }) {
  return (
    <>
      <div className="cert-section">
        <div className="cert-section-title">来源培训计划</div>
        <div className="cert-form-grid">
          <Field label="计划代码"><input className="cert-field-control" defaultValue={row.planCode} readOnly /></Field>
          <Field label="培训计划名称"><input className="cert-field-control" defaultValue={row.planName} readOnly /></Field>
          <Field label="执行期次"><input className="cert-field-control" defaultValue={row.executePeriod} readOnly /></Field>
        </div>
      </div>

      <div className="cert-section">
        <div className="cert-section-title">培训记录基本信息</div>
        <div className="cert-form-grid">
          <Field label="培训班名称" required><input className="cert-field-control" defaultValue={row.className} readOnly={readOnly} placeholder="请填写培训班名称" /></Field>
          <Field label="培训计划" required><input className="cert-field-control" defaultValue={row.planName} readOnly={readOnly} placeholder="请选择培训计划" /></Field>
          <Field label="培训对象" required><input className="cert-field-control" defaultValue={row.target} readOnly={readOnly} placeholder="请输入培训对象" /></Field>
          <Field label="计划类型"><input className="cert-field-control" defaultValue={row.planType} readOnly /></Field>
          <Field label="主办部门" required><input className="cert-field-control" defaultValue={row.hostDept} readOnly={readOnly} placeholder="请选择主办部门" /></Field>
          <Field label="承办部门"><input className="cert-field-control" defaultValue={row.undertakeDept} readOnly={readOnly} placeholder="请选择承办部门" /></Field>
          <Field label="培训开始日期" required><input className="cert-field-control" defaultValue={row.startDate} readOnly={readOnly} placeholder="YYYY-MM-DD" /></Field>
          <Field label="培训结束日期" required><input className="cert-field-control" defaultValue={row.endDate} readOnly={readOnly} placeholder="YYYY-MM-DD" /></Field>
          <Field label="培训学时"><input className="cert-field-control" defaultValue={row.hours} readOnly={readOnly} placeholder="请输入培训学时" /></Field>
          <Field label="是否发证" required>
            <select className="cert-field-control" defaultValue={row.certFlag} disabled={readOnly}>
              <option>是</option>
              <option>否</option>
            </select>
          </Field>
          <Field label="登记部门"><input className="cert-field-control" defaultValue={row.hostDept} readOnly /></Field>
          <Field label="登记人"><input className="cert-field-control" defaultValue={row.recorder} readOnly /></Field>
          <Field label="登记时间"><input className="cert-field-control" defaultValue={row.recordTime} readOnly /></Field>
          <Field label="培训地点" required><input className="cert-field-control" defaultValue="镇海炼化培训中心A栋301" readOnly={readOnly} placeholder="请输入培训地点" /></Field>
          <Field label="培训内容" required wide>
            <textarea
              className="cert-field-control cert-field-textarea cert-field-textarea-large"
              defaultValue="围绕安全生产责任制、风险辨识、隐患排查与应急联动开展专题培训。"
              readOnly={readOnly}
              placeholder="请输入培训内容"
            />
          </Field>
        </div>
      </div>

      <div className="cert-section">
        <div className="cert-section-title">培训人员名单</div>
        {!readOnly ? (
          <div className="record-toolbar">
            <button type="button" className="btn btn-primary">新增</button>
            <button type="button" className="btn">编辑</button>
            <button type="button" className="btn">删除</button>
            <button type="button" className="btn">导入</button>
            <button type="button" className="btn">导出</button>
            <button type="button" className="btn">模板下载</button>
          </div>
        ) : null}
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th>序号</th><th>姓名</th><th>统一身份账号</th><th>部门</th><th>联系方式</th><th>证书编号</th><th>考试成绩</th><th>是否参训</th><th>是否合格</th>
              </tr>
            </thead>
            <tbody>
              {participantRows.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td><td>{r.name}</td><td>{r.uid}</td><td>{r.dept}</td><td>{r.mobile}</td><td>{r.certNo}</td><td>{r.score}</td><td>{r.attend}</td><td>{r.pass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  const [activeModal, setActiveModal] = React.useState("");
  const [statMonth, setStatMonth] = React.useState("2026-03");

  const openFirstRowOnly = (rowId, modal) => {
    if (rowId !== 1) return;
    setActiveModal(modal);
  };

  const currentRow = recordRows[0];
  const monthRecords = recordRows.filter((row) => (row.startDate || "").slice(0, 7) === statMonth);
  const completedRecords = monthRecords.filter((row) => (row.endDate || "").slice(0, 7) === statMonth);
  const totalTrainee = monthRecords.reduce((sum, row) => sum + Number(row.traineeCount || 0), 0);
  const totalPass = monthRecords.reduce((sum, row) => sum + Number(row.passCount || 0), 0);
  const avgPassRate = totalTrainee > 0 ? `${Math.round((totalPass / totalTrainee) * 100)}%` : "0%";
  const lowPassCount = monthRecords.filter((row) => Number(String(row.passRate || "0").replace("%", "")) < 90).length;

  return (
    <div className="stack trm-enterprise">
      <div className="trm-summary">
        <div className="trm-summary-header">
          <div className="trm-summary-filter">
            <span>统计范围：</span>
            <select
              className="filterbar-control"
              value={statMonth}
              onChange={(event) => setStatMonth(event.target.value)}
            >
              <option value="2026-01">2026年1月</option>
              <option value="2026-02">2026年2月</option>
              <option value="2026-03">2026年3月</option>
              <option value="2026-04">2026年4月</option>
            </select>
          </div>
        </div>
        <div className="trm-summary-grid">
          <div className="trm-summary-card trm-summary-card-primary">
            <div className="label">平均合格率</div>
            <div className="value-row">
              <div className="value">{avgPassRate}</div>
            </div>
            <div className="hint">按月汇总合格人数与实际参训人数计算</div>
          </div>
          <div className="trm-summary-card">
            <div className="label">已完成培训</div>
            <div className="value-row">
              <div className="value">{completedRecords.length}</div>
              <div className="unit">项</div>
            </div>
            <div className="hint">当前状态为已完成的培训班次</div>
          </div>
          <div className="trm-summary-card">
            <div className="label">本月培训记录</div>
            <div className="value-row">
              <div className="value">{monthRecords.length}</div>
              <div className="unit">项</div>
            </div>
            <div className="hint">统计口径：培训日期落在当前月份内</div>
          </div>
          <div className="trm-summary-card trm-summary-card-warning">
            <div className="label">低合格率培训</div>
            <div className="value-row">
              <div className="value">{lowPassCount}</div>
              <div className="unit">项</div>
            </div>
            <div className="hint">合格率低于 90% 的培训班次</div>
          </div>
        </div>
      </div>
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item"><div className="filterbar-label">计划代码</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入计划代码" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训计划名称</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训计划名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训班名称</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训班名称" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训对象</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入培训对象" /></div></div>
            <div className="filterbar-item"><div className="filterbar-label">计划类型</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择计划类型"><option>请选择计划类型</option><option>企业年度</option><option>企业临时</option><option>运行部月度</option><option>运行部年度</option><option>其他</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">主办部门</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择主办部门"><option>请选择主办部门</option><option>安全环保部</option><option>工程管理部</option><option>设备管理部</option><option>生产运行部</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">承办部门</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择承办部门"><option>请选择承办部门</option><option>人力资源部</option><option>设备管理部</option><option>生产技术部</option><option>消防保卫部</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">是否发证</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择是否发证"><option>请选择是否发证</option><option>是</option><option>否</option></select></div></div>
            <div className="filterbar-item"><div className="filterbar-label">培训日期</div><div className="filterbar-input"><div className="filterbar-range"><input className="filterbar-control" defaultValue="2026-02-01" placeholder="开始日期" /><span className="filterbar-range-sep">-</span><input className="filterbar-control" defaultValue="2026-03-31" placeholder="结束日期" /></div></div></div>
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
                  <th>序号</th><th>计划代码</th><th>培训计划名称</th><th>培训班名称</th><th>执行期次</th><th>培训开始日期</th><th>培训结束日期</th><th>培训对象</th><th>计划类型</th><th>主办部门</th><th>承办部门</th><th>培训学时</th><th>培训人员数量</th><th>合格人数</th><th>合格率</th><th>是否发证</th><th>登记人</th><th>登记时间</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                {recordRows.map((row) => (
                  <tr key={row.id}>
                    <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                    <td>{row.id}</td>
                    <td>{row.planCode}</td>
                    <td><button type="button" className="table-link-btn" onClick={() => openFirstRowOnly(row.id, "plan-detail")}>{row.planName}</button></td>
                    <td><button type="button" className="table-link-btn" onClick={() => openFirstRowOnly(row.id, "record-detail")}>{row.className}</button></td>
                    <td>{row.executePeriod}</td>
                    <td>{row.startDate}</td>
                    <td>{row.endDate}</td>
                    <td>{row.target}</td>
                    <td>{row.planType}</td>
                    <td>{row.hostDept}</td>
                    <td>{row.undertakeDept}</td>
                    <td>{row.hours}</td>
                    <td>{row.traineeCount}</td>
                    <td>{row.passCount}</td>
                    <td>{row.passRate}</td>
                    <td>{row.certFlag}</td>
                    <td>{row.recorder}</td>
                    <td>{row.recordTime}</td>
                    <td><button type="button" className="table-link-btn" onClick={() => openFirstRowOnly(row.id, "add-record")}>编辑 / 删除</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {activeModal === "add-record" ? (
        <div className="modal-mask" onClick={() => setActiveModal("")}> 
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd"><div className="modal-title">培训记录登记</div><button type="button" className="modal-close" onClick={() => setActiveModal("")}>x</button></div>
            <div className="modal-bd cert-bd"><RecordForm row={currentRow} /></div>
            <div className="modal-ft"><button type="button" className="btn" onClick={() => setActiveModal("")}>关闭</button><button type="button" className="btn btn-primary">保存</button><button type="button" className="btn btn-primary">提交</button></div>
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
