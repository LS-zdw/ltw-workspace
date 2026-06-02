import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "/src/components/ui/Card.jsx";

const importFiles = [
  {
    key: "annex2",
    label: "附件2：总部部门、事业部培训计划",
    fileName: "2-附件2：2026年总部部门、事业部培训计划.xlsx",
    importedAt: "2026-05-25 10:18",
    count: 10
  },
  {
    key: "annex3",
    label: "附件3：健康安全环保培训计划",
    fileName: "3-附件3：2026年健康安全环保培训计划.xlsx",
    importedAt: "2026-05-25 10:26",
    count: 10
  }
];

const planRows = [
  {
    id: 1,
    source: "附件3",
    planCode: "2630001",
    planName: "企业安全总监培训班",
    target: "直属单位安全总监",
    people: 120,
    days: 3,
    planDate: "2月",
    hostDept: "健康安全环保管理部",
    organizer: "集团公司党校",
    location: "北京",
    contact: "吴小毅",
    phone: "010-59969806",
    periods: 1,
    remark: "",
    donePeriods: 1,
    latestRecord: "企业安全总监培训班（第一期）",
    status: "已完成"
  },
  {
    id: 2,
    source: "附件3",
    planCode: "2630003",
    planName: "HSE关键岗位人员取证培训班",
    target: "企业与生产相关的集团公司高级专家、企业首席专家、专业副总师、业务部门负责人等（未取证或未复审人员）",
    people: 100,
    days: 4,
    planDate: "5、7月",
    hostDept: "健康安全环保管理部",
    organizer: "青岛安全工程研究院、江苏油田党校、胜利油田党校",
    location: "扬州、东营",
    contact: "吴小毅",
    phone: "010-59969806",
    periods: 2,
    remark: "",
    donePeriods: 1,
    latestRecord: "HSE关键岗位取证培训班（第一期）",
    status: "执行中"
  },
  {
    id: 3,
    source: "附件3",
    planCode: "2630004",
    planName: "HSE体系高级审核员培训班",
    target: "参加过体系审核的健康、安全、环保、生产、设备、工程部门HSE体系运行管理骨干",
    people: 200,
    days: 4,
    planDate: "4-7月",
    hostDept: "健康安全环保管理部",
    organizer: "青岛安全工程研究院、江苏油田党校、江西石油党校、河南油田党校",
    location: "扬州、南昌、南阳",
    contact: "吴小毅",
    phone: "010-59969806",
    periods: 5,
    remark: "",
    donePeriods: 2,
    latestRecord: "HSE体系高级审核员培训班（第二期）",
    status: "执行中"
  },
  {
    id: 4,
    source: "附件3",
    planCode: "2630009",
    planName: "健康管理能力提升培训班",
    target: "各企业健康管理人员",
    people: 210,
    days: 5,
    planDate: "3-5月",
    hostDept: "健康安全环保管理部",
    organizer: "西南石油局党校、金陵石化党校、湖南石油党校",
    location: "成都、南京、长沙",
    contact: "朱世杰",
    phone: "010-59960581",
    periods: 3,
    remark: "",
    donePeriods: 1,
    latestRecord: "健康管理能力提升培训班（成都班）",
    status: "执行中"
  },
  {
    id: 5,
    source: "附件2",
    planCode: "2620003",
    planName: "办公室业务骨干培训班",
    target: "直属单位、总部各部门办公室（党委办公室、董事会办公室）负责综合文稿、政务信息，国家安全和保密管理，公司治理和董事会建设等业务工作人员",
    people: 260,
    days: 5,
    planDate: "3、5、9月",
    hostDept: "综合管理部",
    organizer: "集团公司党校",
    location: "北京",
    contact: "郭成",
    phone: "010-59969710",
    periods: 3,
    remark: "",
    donePeriods: 2,
    latestRecord: "办公室业务骨干培训班（第二期）",
    status: "执行中"
  },
  {
    id: 6,
    source: "附件2",
    planCode: "2620004",
    planName: "信访稳定业务骨干强基特训班",
    target: "直属单位、总部部门信访稳定工作机构业务骨干",
    people: 260,
    days: 5,
    planDate: "5月",
    hostDept: "综合管理部",
    organizer: "集团公司党校",
    location: "北京",
    contact: "郭成",
    phone: "010-59969710",
    periods: 1,
    remark: "",
    donePeriods: 1,
    latestRecord: "信访稳定业务骨干强基特训班",
    status: "已完成"
  },
  {
    id: 7,
    source: "附件2",
    planCode: "2620007",
    planName: "规划业务能力提升培训班",
    target: "总部部门、事业部、专业公司、研究院规划发展专业相关中层管理人员及业务骨干",
    people: 80,
    days: 5,
    planDate: "9月",
    hostDept: "发展计划部",
    organizer: "集团公司党校",
    location: "北京",
    contact: "黄泽旭",
    phone: "010-59968904",
    periods: 1,
    remark: "",
    donePeriods: 0,
    latestRecord: "-",
    status: "未开始"
  },
  {
    id: 8,
    source: "附件2",
    planCode: "2620010",
    planName: "境外公共安全管理人员培训班",
    target: "境外公共安全工作相关人员、一般外派人员",
    people: 300,
    days: 3,
    planDate: "3-11月",
    hostDept: "国际合作部",
    organizer: "集团公司党校",
    location: "北京",
    contact: "蔡亭亭",
    phone: "010-59968720",
    periods: 5,
    remark: "",
    donePeriods: 2,
    latestRecord: "境外公共安全管理人员培训班（第二期）",
    status: "执行中"
  }
];

const recordMap = {
  "2630001": [{ id: 1, name: "企业安全总监培训班（第一期）", period: "1", date: "2026-02-15 至 2026-02-18", people: 118, status: "已提交" }],
  "2630003": [{ id: 1, name: "HSE关键岗位取证培训班（第一期）", period: "1", date: "2026-05-18 至 2026-05-22", people: 54, status: "已提交" }],
  "2630004": [
    { id: 1, name: "HSE体系高级审核员培训班（第一期）", period: "1", date: "2026-04-10 至 2026-04-13", people: 41, status: "已提交" },
    { id: 2, name: "HSE体系高级审核员培训班（第二期）", period: "2", date: "2026-05-09 至 2026-05-12", people: 40, status: "已提交" }
  ],
  "2630009": [{ id: 1, name: "健康管理能力提升培训班（成都班）", period: "1", date: "2026-03-24 至 2026-03-28", people: 68, status: "已提交" }],
  "2620003": [
    { id: 1, name: "办公室业务骨干培训班（第一期）", period: "1", date: "2026-03-11 至 2026-03-15", people: 88, status: "已提交" },
    { id: 2, name: "办公室业务骨干培训班（第二期）", period: "2", date: "2026-05-12 至 2026-05-16", people: 88, status: "已提交" }
  ],
  "2620004": [{ id: 1, name: "信访稳定业务骨干强基特训班", period: "1", date: "2026-05-16 至 2026-05-20", people: 241, status: "已提交" }],
  "2620010": [
    { id: 1, name: "境外公共安全管理人员培训班（第一期）", period: "1", date: "2026-03-10 至 2026-03-12", people: 58, status: "已提交" },
    { id: 2, name: "境外公共安全管理人员培训班（第二期）", period: "2", date: "2026-05-06 至 2026-05-08", people: 64, status: "已提交" }
  ]
};

function getStatusClass(status) {
  if (status === "已完成") return "done";
  if (status === "执行中") return "running";
  return "draft";
}

function DetailModal({ row, onClose, onGotoRecords }) {
  const records = recordMap[row.planCode] || [];

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl cert-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">培训计划执行详情</div>
          <button type="button" className="modal-close" onClick={onClose}>x</button>
        </div>
        <div className="modal-bd cert-bd">
          <div className="cert-section">
            <div className="cert-section-title">导入计划信息</div>
            <div className="cert-form-grid">
              <div className="cert-field-item"><div className="cert-field-label">来源文件:</div><div className="cert-field-value"><input className="cert-field-control" value={row.source} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">培训项目代码:</div><div className="cert-field-value"><input className="cert-field-control" value={row.planCode} readOnly /></div></div>
              <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label">培训项目名称:</div><div className="cert-field-value"><input className="cert-field-control" value={row.planName} readOnly /></div></div>
              <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label">培训对象:</div><div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" value={row.target} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">计划培训人数:</div><div className="cert-field-value"><input className="cert-field-control" value={String(row.people)} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">培训天数:</div><div className="cert-field-value"><input className="cert-field-control" value={String(row.days)} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">开班日期:</div><div className="cert-field-value"><input className="cert-field-control" value={row.planDate} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">主办单位:</div><div className="cert-field-value"><input className="cert-field-control" value={row.hostDept} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">承办单位:</div><div className="cert-field-value"><input className="cert-field-control" value={row.organizer} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">办班地点:</div><div className="cert-field-value"><input className="cert-field-control" value={row.location} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">联系人:</div><div className="cert-field-value"><input className="cert-field-control" value={row.contact} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">联系电话:</div><div className="cert-field-value"><input className="cert-field-control" value={row.phone} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">期数:</div><div className="cert-field-value"><input className="cert-field-control" value={String(row.periods)} readOnly /></div></div>
              <div className="cert-field-item"><div className="cert-field-label">备注:</div><div className="cert-field-value"><input className="cert-field-control" value={row.remark || ""} readOnly /></div></div>
            </div>
          </div>

          <div className="cert-section">
            <div className="cert-section-title">计划执行情况</div>
            <div style={{ marginBottom: 10, color: "#475569", fontSize: 13 }}>
              当前计划共 {row.periods} 期，已完成 {row.donePeriods} 期，执行状态为
              {" "}
              <span className={`hq-plan-status ${getStatusClass(row.status)}`}>{row.status}</span>
              。
            </div>
            <div className="table-wrap">
              <table className="proto-table">
                <thead>
                  <tr>
                    <th>序号</th><th>培训班名称</th><th>期次</th><th>培训日期</th><th>实际培训人数</th><th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {records.length ? records.map((record) => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.name}</td>
                      <td>{record.period}</td>
                      <td>{record.date}</td>
                      <td>{record.people}</td>
                      <td><span className={`hq-plan-status ${record.status === "已提交" ? "done" : "draft"}`}>{record.status}</span></td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", color: "#64748b" }}>当前计划还没有对应培训记录。</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="modal-ft">
          <button type="button" className="btn" onClick={onClose}>关闭</button>
          <button type="button" className="btn btn-primary" onClick={onGotoRecords}>查看培训记录</button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const navigate = useNavigate();
  const [source, setSource] = React.useState("全部");
  const [keyword, setKeyword] = React.useState("");
  const [activeRow, setActiveRow] = React.useState(null);

  const filteredRows = React.useMemo(() => {
    const trimmedKeyword = keyword.trim();
    return planRows.filter((row) => {
      if (source !== "全部" && row.source !== source) return false;
      if (
        trimmedKeyword &&
        !`${row.planCode}${row.planName}${row.hostDept}${row.contact}${row.organizer}`.includes(trimmedKeyword)
      ) return false;
      return true;
    });
  }, [keyword, source]);

  return (
    <div className="stack">
      <style>{`
        .hq-plan-simple-page {
          display: grid;
          gap: 12px;
        }
        .hq-plan-simple-imports {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .hq-plan-simple-import-card {
          border: 1px solid #d9e2ef;
          border-radius: 12px;
          background: #fff;
          padding: 16px;
        }
        .hq-plan-simple-import-title {
          font-size: 16px;
          font-weight: 700;
          color: #16324f;
          margin-bottom: 8px;
        }
        .hq-plan-simple-import-name {
          color: #334155;
          margin-bottom: 10px;
          word-break: break-all;
        }
        .hq-plan-simple-import-meta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          color: #64748b;
          font-size: 12px;
          margin-bottom: 12px;
        }
        .hq-plan-simple-tip {
          border: 1px solid #dbe6f2;
          border-radius: 12px;
          background: #f8fbff;
          padding: 12px 16px;
          color: #52637a;
          font-size: 13px;
          line-height: 1.7;
        }
        @media (max-width: 960px) {
          .hq-plan-simple-imports {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="hq-plan-simple-page">
        <Card title="教育培训（更新）-培训计划执行跟踪-总部端" desc="">
          <div className="hq-plan-simple-imports">
            {importFiles.map((file) => (
              <div key={file.key} className="hq-plan-simple-import-card">
                <div className="hq-plan-simple-import-title">{file.label}</div>
                <div className="hq-plan-simple-import-name">{file.fileName}</div>
                <div className="hq-plan-simple-import-meta">
                  <span>导入时间：{file.importedAt}</span>
                  <span>计划数：{file.count}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button type="button" className="btn btn-primary">导入</button>
                  <button type="button" className="btn">重新导入</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="hq-plan-simple-tip">
          列表字段按 Excel 导入台账展示。点击“查看执行”后，再看这个计划已经对应了哪几期培训记录。
        </div>

        <div className="filterbar">
          <div className="filterbar-row">
            <div className="filterbar-left">
              <div className="filterbar-item">
                <div className="filterbar-label">来源文件</div>
                <div className="filterbar-input">
                  <select className="filterbar-control" value={source} onChange={(event) => setSource(event.target.value)}>
                    <option value="全部">全部</option>
                    <option value="附件2">附件2</option>
                    <option value="附件3">附件3</option>
                  </select>
                </div>
              </div>
              <div className="filterbar-item">
                <div className="filterbar-label">关键字</div>
                <div className="filterbar-input">
                  <input className="filterbar-control" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="代码/名称/主办单位/联系人" />
                </div>
              </div>
              <div className="filterbar-query-actions">
                <button type="button" className="btn btn-primary">查询</button>
                <button type="button" className="btn" onClick={() => { setSource("全部"); setKeyword(""); }}>重置</button>
              </div>
            </div>
          </div>
        </div>

        <Card title="计划导入台账" desc="">
          <div className="table-wrap">
            <table className="proto-table">
              <thead>
                <tr>
                  <th>序号</th><th>来源</th><th>培训项目代码</th><th>培训项目名称</th><th>培训对象</th><th>计划培训人数</th><th>培训天数</th><th>开班日期</th><th>主办单位</th><th>承办单位</th><th>办班地点</th><th>联系人</th><th>联系电话</th><th>期数</th><th>备注</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.source}</td>
                    <td>{row.planCode}</td>
                    <td>
                      <button type="button" className="table-link-btn" onClick={() => setActiveRow(row)}>
                        {row.planName}
                      </button>
                    </td>
                    <td>{row.target}</td>
                    <td>{row.people}</td>
                    <td>{row.days}</td>
                    <td>{row.planDate}</td>
                    <td>{row.hostDept}</td>
                    <td>{row.organizer}</td>
                    <td>{row.location}</td>
                    <td>{row.contact}</td>
                    <td>{row.phone}</td>
                    <td>{row.periods}</td>
                    <td>{row.remark || "-"}</td>
                    <td>
                      <div className="table-op-inline">
                        <button type="button" className="table-link-btn" onClick={() => setActiveRow(row)}>查看执行</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {activeRow ? (
        <DetailModal
          row={activeRow}
          onClose={() => setActiveRow(null)}
          onGotoRecords={() => navigate("/edu/trainer/training-record-management-hq-updated")}
        />
      ) : null}
    </div>
  );
}
