import React from "react";

const TRAINING_ROWS = [
  { id: 1, name: "班组长安全提升一期", plan: "2026年班组长安全履职能力提升计划", startDate: "2026-03-03", endDate: "2026-03-05", hours: "24", score: "89", result: "合格", issued: "是" },
  { id: 2, name: "新员工三级教育（2月）", plan: "新员工三级安全教育计划", startDate: "2026-03-04", endDate: "2026-03-04", hours: "6", score: "89", result: "合格", issued: "否" },
  { id: 3, name: "关键岗位应急处置能力提升班", plan: "2026年关键岗位专项培训计划", startDate: "2026-03-05", endDate: "2026-03-06", hours: "16", score: "89", result: "合格", issued: "是" },
  { id: 4, name: "班组长安全提升一期（4月）", plan: "2026年班组长安全履职能力提升计划", startDate: "2026-03-06", endDate: "2026-03-08", hours: "24", score: "89", result: "合格", issued: "否" },
  { id: 5, name: "新员工三级教育（2月）-5", plan: "新员工三级安全教育计划", startDate: "2026-03-07", endDate: "2026-03-07", hours: "6", score: "58", result: "未合格", issued: "否" },
  { id: 6, name: "关键岗位应急处置能力提升班-6", plan: "2026年关键岗位专项培训计划", startDate: "2026-03-08", endDate: "2026-03-10", hours: "16", score: "89", result: "合格", issued: "否" },
  { id: 7, name: "过程安全管理专题", plan: "2026年专项培训计划", startDate: "2026-03-09", endDate: "2026-03-09", hours: "8", score: "90", result: "合格", issued: "否" },
  { id: 8, name: "作业安全分析专题", plan: "2026年专项培训计划", startDate: "2026-03-10", endDate: "2026-03-10", hours: "8", score: "88", result: "合格", issued: "否" },
  { id: 9, name: "危化法规专题", plan: "2026年专项培训计划", startDate: "2026-03-11", endDate: "2026-03-11", hours: "8", score: "91", result: "合格", issued: "否" },
  { id: 10, name: "HSE综合提升", plan: "2026年专项培训计划", startDate: "2026-03-12", endDate: "2026-03-12", hours: "8", score: "87", result: "合格", issued: "否" }
];

const EXAM_ROWS = [
  { id: 1, name: "班组长安全履职能力考核（1）", type: "结业考核", date: "2026-03-07", score: "89", result: "通过", relatedClass: "班组长安全提升一期", organizer: "安环部" },
  { id: 2, name: "新员工三级教育结业测评（2月）", type: "结业测评", date: "2026-03-08", score: "92", result: "通过", relatedClass: "新员工三级教育（2月）", organizer: "安环部" },
  { id: 3, name: "关键岗位应急处置考试（3月）", type: "专项考试", date: "2026-03-09", score: "90", result: "通过", relatedClass: "关键岗位应急处置能力提升班", organizer: "生产技术部" },
  { id: 4, name: "班组长安全履职能力考核（4）", type: "结业考核", date: "2026-03-10", score: "55", result: "未通过", relatedClass: "班组长安全提升一期（4月）", organizer: "安环部" },
  { id: 5, name: "HSE知识测评（5）", type: "在线测评", date: "2026-03-11", score: "88", result: "通过", relatedClass: "HSE综合提升", organizer: "安环部" },
  { id: 6, name: "作业票管理考试（6）", type: "专项考试", date: "2026-03-12", score: "90", result: "通过", relatedClass: "过程安全管理专题", organizer: "生产技术部" },
  { id: 7, name: "关键岗位能力考试（7）", type: "专项考试", date: "2026-03-13", score: "93", result: "通过", relatedClass: "关键岗位应急处置能力提升班-6", organizer: "生产技术部" },
  { id: 8, name: "工艺安全考试（8）", type: "结业考核", date: "2026-03-14", score: "86", result: "通过", relatedClass: "作业安全分析专题", organizer: "安环部" },
  { id: 9, name: "应急处置考试（9）", type: "专项考试", date: "2026-03-15", score: "91", result: "通过", relatedClass: "关键岗位应急处置能力提升班", organizer: "生产技术部" },
  { id: 10, name: "综合知识考试（10）", type: "在线测评", date: "2026-03-16", score: "89", result: "通过", relatedClass: "危化法规专题", organizer: "安环部" }
];

const CERT_ROWS = [
  { id: 1, name: "焊工证", issuerLevel: "集团公司发证", certNo: "CERT-2026-0191", certType: "特种作业资格证", certSubType: "压力焊作业", effective: "2024-10-04", expiry: "2027-10-03", status: "正常", relatedTraining: "安全管理培训" },
  { id: 2, name: "注安师证", issuerLevel: "国家/地方政府发证", certNo: "CERT-2026-0291", certType: "HSE关键岗位资格", certSubType: "安全管理类", effective: "2022-05-01", expiry: "2027-04-30", status: "正常", relatedTraining: "HSE管理课程" },
  { id: 3, name: "登高作业证", issuerLevel: "集团公司发证", certNo: "CERT-2026-0391", certType: "特种作业资格证", certSubType: "高压电工作业", effective: "2024-10-06", expiry: "2027-10-05", status: "异常", relatedTraining: "高风险作业培训" },
  { id: 4, name: "作业票监护资格证", issuerLevel: "企业内部发证", certNo: "CERT-2026-0491", certType: "作业票监护人资格", certSubType: "安全管理类", effective: "2025-01-01", expiry: "2028-12-31", status: "正常", relatedTraining: "作业票管理专项培训" },
  { id: 5, name: "应急救援证", issuerLevel: "企业内部发证", certNo: "CERT-2026-0591", certType: "主要负责人安全合格证", certSubType: "安全管理类", effective: "2025-02-01", expiry: "2028-01-31", status: "正常", relatedTraining: "应急处置专项培训" },
  { id: 6, name: "高处作业证", issuerLevel: "国家/地方政府发证", certNo: "CERT-2026-0691", certType: "特种作业资格证", certSubType: "防爆电气作业", effective: "2024-07-01", expiry: "2027-06-30", status: "正常", relatedTraining: "高处作业安全培训" },
  { id: 7, name: "危化操作证", issuerLevel: "国家/地方政府发证", certNo: "CERT-2026-0791", certType: "特种作业资格证", certSubType: "高压电工作业", effective: "2023-03-01", expiry: "2026-02-28", status: "异常", relatedTraining: "危化操作专项培训" },
  { id: 8, name: "班组长安全资格证", issuerLevel: "集团公司发证", certNo: "CERT-2026-0891", certType: "HSE关键岗位资格", certSubType: "安全管理类", effective: "2025-03-01", expiry: "2028-02-29", status: "正常", relatedTraining: "班组长安全提升培训" },
  { id: 9, name: "受限空间作业证", issuerLevel: "国家/地方政府发证", certNo: "CERT-2026-0991", certType: "特种作业资格证", certSubType: "压力焊作业", effective: "2023-08-01", expiry: "2026-07-31", status: "正常", relatedTraining: "受限空间专项培训" },
  { id: 10, name: "动火作业证", issuerLevel: "国家/地方政府发证", certNo: "CERT-2026-1091", certType: "特种作业资格证", certSubType: "高压电工作业", effective: "2024-01-01", expiry: "2026-12-31", status: "正常", relatedTraining: "动火作业安全培训" }
];

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("training");
  const [timeFilter, setTimeFilter] = React.useState("all");
  const [trainingFilter, setTrainingFilter] = React.useState("all");
  const [examFilter, setExamFilter] = React.useState("all");
  const [certFilter, setCertFilter] = React.useState("all");
  const [tabPageMap, setTabPageMap] = React.useState({ training: 1, exam: 1, cert: 1 });
  const PAGE_SIZE = 10;

  const trainingRows = React.useMemo(() => {
    if (trainingFilter === "pass") return TRAINING_ROWS.filter((row) => row.result === "合格");
    if (trainingFilter === "fail") return TRAINING_ROWS.filter((row) => row.result === "未合格");
    return TRAINING_ROWS;
  }, [trainingFilter]);

  const examRows = React.useMemo(() => {
    if (examFilter === "pass") return EXAM_ROWS.filter((row) => row.result === "通过");
    if (examFilter === "fail") return EXAM_ROWS.filter((row) => row.result === "未通过");
    return EXAM_ROWS;
  }, [examFilter]);

  const certRows = React.useMemo(() => {
    if (certFilter === "normal") return CERT_ROWS.filter((row) => row.status === "正常");
    if (certFilter === "abnormal") return CERT_ROWS.filter((row) => row.status === "异常");
    return CERT_ROWS;
  }, [certFilter]);

  const rowsByTab = {
    training: trainingRows,
    exam: examRows,
    cert: certRows
  };

  const activeRows = rowsByTab[activeTab];
  const totalPages = Math.max(1, Math.ceil(activeRows.length / PAGE_SIZE));
  const currentPage = Math.min(tabPageMap[activeTab] || 1, totalPages);
  const pageRows = activeRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const fillerCount = Math.max(0, PAGE_SIZE - pageRows.length);
  const fillerColsByTab = {
    training: 8,
    exam: 7,
    cert: 9
  };

  const changePage = (tab, nextPage) => {
    setTabPageMap((prev) => {
      const tabTotal = Math.max(1, Math.ceil((rowsByTab[tab] || []).length / PAGE_SIZE));
      return { ...prev, [tab]: Math.min(Math.max(1, nextPage), tabTotal) };
    });
  };

  const trainingTotal = TRAINING_ROWS.length;
  const examTotal = EXAM_ROWS.length;
  const certTotal = CERT_ROWS.length;
  const totalHours = TRAINING_ROWS.reduce((sum, row) => sum + Number(row.hours || 0), 0);
  const trainingAbnormal = TRAINING_ROWS.filter((row) => row.result === "未合格").length;
  const examAbnormal = EXAM_ROWS.filter((row) => row.result === "未通过").length;
  const certAbnormal = CERT_ROWS.filter((row) => row.status === "异常").length;
  const trainingRate = `${((trainingTotal - trainingAbnormal) / Math.max(trainingTotal, 1) * 100).toFixed(1)}%`;
  const examRate = `${(((examTotal - examAbnormal) / Math.max(examTotal, 1)) * 100).toFixed(1)}%`;
  const certRate = `${(((certTotal - certAbnormal) / Math.max(certTotal, 1)) * 100).toFixed(1)}%`;
  const currentKeyMetric = activeTab === "training"
    ? `合格率 ${trainingRate}`
    : activeTab === "exam"
      ? `通过率 ${examRate}`
      : `有效率 ${certRate}`;
  const scopeLabel =
    timeFilter === "2025"
      ? "2025年"
      : timeFilter === "2026"
        ? "2026年"
        : "全部";

  return (
    <div className="stack personal-archive-page">
      <div className="edu-dev-main">
        <div className="personal-archive-basic">
          <div className="personal-archive-basic-top">
            <div className="personal-archive-basic-row">
              <div className="personal-archive-basic-item"><span>员工姓名：</span><b>张明</b></div>
              <div className="personal-archive-basic-item"><span>统一账号：</span><b>ZHANGMING320821</b></div>
              <div className="personal-archive-basic-item"><span>所属企业：</span><b>镇海炼化</b></div>
              <div className="personal-archive-basic-item"><span>组织机构：</span><b>安环部</b></div>
              <div className="personal-archive-basic-item"><span>手机号码：</span><b>13812345678</b></div>
              <div className="personal-archive-basic-item"><span>岗位：</span><b>安全管理岗</b></div>
              <div className="personal-archive-basic-item"><span>人员类型：</span><b>新员工</b></div>
              <div className="personal-archive-basic-item"><span>民族：</span><b>汉族</b></div>
            </div>
            <button type="button" className="btn btn-primary">导出档案</button>
          </div>
        </div>

        <div className="personal-archive-stats-card">
          <div className="personal-archive-stats-head">
            <div className="personal-archive-section-title">档案统计</div>
            <div className="personal-archive-stats-scope">
              <span>统计范围：</span>
              <select className="filterbar-control" value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
                <option value="all">全部</option>
                <option value="2025">2025年</option>
                <option value="2026">2026年</option>
              </select>
            </div>
          </div>

          <div className="metrics-row personal-archive-metrics">
            <div className="pill"><div className="k">培训记录数（{scopeLabel}）</div><div className="v">{trainingTotal}</div></div>
            <div className="pill"><div className="k">考试记录数（{scopeLabel}）</div><div className="v">{examTotal}</div></div>
            <div className="pill"><div className="k">有效证书数</div><div className="v">{certTotal - certAbnormal}</div></div>
            <div className="pill"><div className="k">累计学时（{scopeLabel}）</div><div className="v">{totalHours}</div></div>
          </div>
        </div>

        <div className="personal-archive-detail-card">
          <div className="personal-archive-detail-tabs">
            <button type="button" className={`personal-archive-tab${activeTab === "training" ? " active" : ""}`} onClick={() => setActiveTab("training")}>培训记录</button>
            <button type="button" className={`personal-archive-tab${activeTab === "exam" ? " active" : ""}`} onClick={() => setActiveTab("exam")}>考试记录</button>
            <button type="button" className={`personal-archive-tab${activeTab === "cert" ? " active" : ""}`} onClick={() => setActiveTab("cert")}>证书档案</button>
          </div>

          <div className="personal-archive-filters">
            <div className="personal-archive-key-metric">{currentKeyMetric}</div>
            <div className="personal-archive-filter-item">
              <div className="filterbar-input">
                {activeTab === "cert" ? (
                  <div className="onefile-quick-filters">
                    <button type="button" className={`onefile-filter-chip${certFilter === "all" ? " active" : ""}`} onClick={() => setCertFilter("all")}>全部</button>
                    <button type="button" className={`onefile-filter-chip${certFilter === "normal" ? " active" : ""}`} onClick={() => { setCertFilter("normal"); changePage("cert", 1); }}>仅正常</button>
                    <button type="button" className={`onefile-filter-chip${certFilter === "abnormal" ? " active" : ""}`} onClick={() => { setCertFilter("abnormal"); changePage("cert", 1); }}>仅异常</button>
                  </div>
                ) : null}

                {activeTab === "training" ? (
                  <div className="onefile-quick-filters">
                    <button type="button" className={`onefile-filter-chip${trainingFilter === "all" ? " active" : ""}`} onClick={() => { setTrainingFilter("all"); changePage("training", 1); }}>全部</button>
                    <button type="button" className={`onefile-filter-chip${trainingFilter === "pass" ? " active" : ""}`} onClick={() => { setTrainingFilter("pass"); changePage("training", 1); }}>仅合格</button>
                    <button type="button" className={`onefile-filter-chip${trainingFilter === "fail" ? " active" : ""}`} onClick={() => { setTrainingFilter("fail"); changePage("training", 1); }}>仅未合格</button>
                  </div>
                ) : null}

                {activeTab === "exam" ? (
                  <div className="onefile-quick-filters">
                    <button type="button" className={`onefile-filter-chip${examFilter === "all" ? " active" : ""}`} onClick={() => { setExamFilter("all"); changePage("exam", 1); }}>全部</button>
                    <button type="button" className={`onefile-filter-chip${examFilter === "pass" ? " active" : ""}`} onClick={() => { setExamFilter("pass"); changePage("exam", 1); }}>仅合格</button>
                    <button type="button" className={`onefile-filter-chip${examFilter === "fail" ? " active" : ""}`} onClick={() => { setExamFilter("fail"); changePage("exam", 1); }}>仅未合格</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {activeTab === "training" ? (
            <div className="onefile-tab-content">
              <div className="table-wrap">
                <table className="proto-table">
                  <thead><tr><th>培训班名称</th><th>培训计划名称</th><th>培训开始日期</th><th>培训结束日期</th><th>培训学时</th><th>成绩</th><th>是否合格</th><th>是否发证</th></tr></thead>
                  <tbody>
                    {pageRows.map((row) => (
                      <tr key={row.id}><td>{row.name}</td><td>{row.plan}</td><td>{row.startDate}</td><td>{row.endDate}</td><td>{row.hours}</td><td>{row.score}</td><td className={row.result === "未合格" ? "onefile-status-abnormal" : ""}>{row.result}</td><td>{row.issued}</td></tr>
                    ))}
                    {Array.from({ length: fillerCount }).map((_, idx) => (
                      <tr key={`training-empty-${idx}`} className="personal-archive-empty-row">
                        {Array.from({ length: fillerColsByTab.training }).map((__, cellIdx) => <td key={cellIdx}>&nbsp;</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {activeTab === "exam" ? (
            <div className="onefile-tab-content">
              <div className="table-wrap">
                <table className="proto-table">
                  <thead><tr><th>考试名称</th><th>考试类别</th><th>考试日期</th><th>成绩</th><th>结果</th><th>关联培训班</th><th>举办单位</th></tr></thead>
                  <tbody>
                    {pageRows.map((row) => (
                      <tr key={row.id}><td>{row.name}</td><td>{row.type}</td><td>{row.date}</td><td>{row.score}</td><td className={row.result === "未通过" ? "onefile-status-abnormal" : ""}>{row.result}</td><td>{row.relatedClass}</td><td>{row.organizer}</td></tr>
                    ))}
                    {Array.from({ length: fillerCount }).map((_, idx) => (
                      <tr key={`exam-empty-${idx}`} className="personal-archive-empty-row">
                        {Array.from({ length: fillerColsByTab.exam }).map((__, cellIdx) => <td key={cellIdx}>&nbsp;</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {activeTab === "cert" ? (
            <div className="onefile-tab-content">
              <div className="table-wrap">
                <table className="proto-table">
                  <thead><tr><th>证书名称</th><th>发证机关级别</th><th>证书编号</th><th>证书种类</th><th>证书小类</th><th>证书生效日期</th><th>证书有效期</th><th>是否异常</th><th>关联培训项目</th></tr></thead>
                  <tbody>
                    {pageRows.map((row) => (
                      <tr key={row.id}><td>{row.name}</td><td>{row.issuerLevel}</td><td>{row.certNo}</td><td>{row.certType}</td><td>{row.certSubType}</td><td>{row.effective}</td><td>{row.expiry}</td><td className={row.status === "异常" ? "onefile-status-abnormal" : ""}>{row.status === "异常" ? "异常" : "否"}</td><td>{row.relatedTraining}</td></tr>
                    ))}
                    {Array.from({ length: fillerCount }).map((_, idx) => (
                      <tr key={`cert-empty-${idx}`} className="personal-archive-empty-row">
                        {Array.from({ length: fillerColsByTab.cert }).map((__, cellIdx) => <td key={cellIdx}>&nbsp;</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}
