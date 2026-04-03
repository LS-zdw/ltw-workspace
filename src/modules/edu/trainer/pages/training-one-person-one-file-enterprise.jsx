import React from "react";
import Card from "/src/components/ui/Card.jsx";

const SCOPE_OPTIONS = [
  { value: "all", label: "全部" },
  { value: "2025", label: "2025年" },
  { value: "2026", label: "2026年" }
];

const PEOPLE_ROWS = [
  { id: 1, org: "安环部", name: "张明", uid: "ZHANGMING320821", phone: "13812345678", post: "安全管理岗", type: "新员工", sex: "男", ethnicity: "汉族" },
  { id: 2, org: "运行三部", name: "刘敏", uid: "LIUMIN420602", phone: "13987651234", post: "运行值班岗", type: "在岗员工", sex: "女", ethnicity: "汉族" },
  { id: 3, org: "安环部", name: "王凯", uid: "WANGKAI330115", phone: "13745211234", post: "工艺技术岗", type: "在岗员工", sex: "男", ethnicity: "回族" },
  { id: 4, org: "生产技术部", name: "周静", uid: "ZHOUJING220907", phone: "13689004567", post: "设备管理岗", type: "在岗员工", sex: "女", ethnicity: "汉族" },
  { id: 5, org: "安全环保部", name: "沈涛", uid: "SHENTAO500721", phone: "13502119876", post: "安全管理岗", type: "新员工", sex: "男", ethnicity: "满族" },
  { id: 6, org: "运行二部", name: "许菲", uid: "XUFEI440312", phone: "13900234567", post: "运行值班岗", type: "在岗员工", sex: "女", ethnicity: "汉族" },
  { id: 7, org: "设备工程部", name: "韩博", uid: "HANBO371201", phone: "13877665544", post: "设备管理岗", type: "在岗员工", sex: "男", ethnicity: "蒙古族" },
  { id: 8, org: "综合管理部", name: "朱琳", uid: "ZHULIN460102", phone: "13799112233", post: "综合管理岗", type: "在岗员工", sex: "女", ethnicity: "汉族" },
  { id: 9, org: "安环部", name: "丁浩", uid: "DINGHAO360226", phone: "13633004567", post: "安全管理岗", type: "在岗员工", sex: "男", ethnicity: "壮族" },
  { id: 10, org: "运行一部", name: "唐悦", uid: "TANGYUE430205", phone: "13756789012", post: "运行值班岗", type: "新员工", sex: "女", ethnicity: "汉族" }
];

const TRAINING_TEMPLATES = [
  { year: 2025, className: "班组长安全提升一期", planName: "2025年班组长能力提升计划", startDate: "2025-03-03", endDate: "2025-03-05", hours: 24 },
  { year: 2025, className: "新员工三级教育（4月）", planName: "2025年新员工安全教育计划", startDate: "2025-04-10", endDate: "2025-04-10", hours: 6 },
  { year: 2025, className: "关键岗位应急处置班", planName: "2025年关键岗位专项培训计划", startDate: "2025-06-11", endDate: "2025-06-12", hours: 16 },
  { year: 2025, className: "风险辨识专题", planName: "2025年专项培训计划", startDate: "2025-09-16", endDate: "2025-09-16", hours: 8 },
  { year: 2026, className: "班组长安全提升二期", planName: "2026年班组长能力提升计划", startDate: "2026-03-03", endDate: "2026-03-05", hours: 24 },
  { year: 2026, className: "新员工三级教育（2月）", planName: "2026年新员工安全教育计划", startDate: "2026-03-04", endDate: "2026-03-04", hours: 6 },
  { year: 2026, className: "关键岗位应急处置能力提升", planName: "2026年关键岗位专项培训计划", startDate: "2026-03-05", endDate: "2026-03-06", hours: 16 },
  { year: 2026, className: "过程安全管理专题", planName: "2026年专项培训计划", startDate: "2026-03-09", endDate: "2026-03-09", hours: 8 },
  { year: 2026, className: "作业安全分析专题", planName: "2026年专项培训计划", startDate: "2026-03-10", endDate: "2026-03-10", hours: 8 },
  { year: 2026, className: "危化法规专题", planName: "2026年专项培训计划", startDate: "2026-03-11", endDate: "2026-03-11", hours: 8 }
];

const EXAM_TEMPLATES = [
  { year: 2025, examName: "班组长安全履职能力考核", examType: "结业考核", examTime: "2025-03-06", organizer: "安环部" },
  { year: 2025, examName: "新员工三级教育结业测评", examType: "结业测评", examTime: "2025-04-11", organizer: "安环部" },
  { year: 2025, examName: "关键岗位应急处置考试", examType: "专项考试", examTime: "2025-06-13", organizer: "生产技术部" },
  { year: 2026, examName: "班组长安全履职能力考核", examType: "结业考核", examTime: "2026-03-07", organizer: "安环部" },
  { year: 2026, examName: "新员工三级教育结业测评", examType: "结业测评", examTime: "2026-03-08", organizer: "安环部" },
  { year: 2026, examName: "关键岗位应急处置考试", examType: "专项考试", examTime: "2026-03-09", organizer: "生产技术部" },
  { year: 2026, examName: "HSE知识测评", examType: "在线测评", examTime: "2026-03-11", organizer: "安环部" }
];

const CERT_TEMPLATES = [
  { certName: "焊工证", issuerLevel: "集团公司发证", certType: "特种作业资格证", certSubType: "压力焊作业", effectiveDate: "2024-10-04", expireDate: "2027-10-03", relatedTraining: "安全管理培训" },
  { certName: "注安师证", issuerLevel: "国家/地方政府发证", certType: "HSE关键岗位资格", certSubType: "安全管理类", effectiveDate: "2022-05-01", expireDate: "2027-04-30", relatedTraining: "HSE管理课程" },
  { certName: "登高作业证", issuerLevel: "集团公司发证", certType: "特种作业资格证", certSubType: "高压电工作业", effectiveDate: "2024-10-06", expireDate: "2027-10-05", relatedTraining: "高风险作业培训" },
  { certName: "作业票监护资格证", issuerLevel: "企业内部发证", certType: "作业票监护人资格", certSubType: "安全管理类", effectiveDate: "2025-01-01", expireDate: "2028-12-31", relatedTraining: "作业票管理专项培训" },
  { certName: "应急救援证", issuerLevel: "企业内部发证", certType: "主要负责人安全合格证", certSubType: "安全管理类", effectiveDate: "2025-02-01", expireDate: "2028-01-31", relatedTraining: "应急处置专项培训" }
];

function yearsByScope(scope) {
  if (scope === "2025") return [2025];
  if (scope === "2026") return [2026];
  return [2025, 2026];
}

function yearProfile(personId, year) {
  if (year === 2025) {
    return {
      trainingCount: 3 + (personId % 2),
      trainingFail: personId % 5 === 0 ? 1 : 0,
      examCount: 2 + (personId % 2),
      examFail: personId % 6 === 0 ? 1 : 0,
      certTotal: 3,
      certAbnormal: personId % 4 === 0 ? 1 : 0
    };
  }
  return {
    trainingCount: 5 + (personId % 2),
    trainingFail: personId % 3 === 0 ? 1 : 0,
    examCount: 4 + (personId % 2),
    examFail: personId % 5 === 0 ? 1 : 0,
    certTotal: 4,
    certAbnormal: personId % 3 === 1 ? 1 : 0
  };
}

function composeTrainingRows(personId, scope) {
  const years = yearsByScope(scope);
  const rows = [];
  years.forEach((year) => {
    const p = yearProfile(personId, year);
    const source = TRAINING_TEMPLATES.filter((t) => t.year === year).slice(0, p.trainingCount);
    source.forEach((t, idx) => {
      const failThreshold = source.length - p.trainingFail;
      const qualified = idx >= failThreshold ? "否" : "是";
      rows.push({
        id: `${year}-${idx + 1}`,
        className: t.className,
        planName: t.planName,
        startDate: t.startDate,
        endDate: t.endDate,
        hours: String(t.hours),
        score: qualified === "否" ? "58" : String(86 + ((personId + idx) % 8)),
        qualified,
        issued: qualified === "否" ? "否" : idx % 2 === 0 ? "是" : "否"
      });
    });
  });
  return rows;
}

function composeExamRows(personId, scope) {
  const years = yearsByScope(scope);
  const rows = [];
  years.forEach((year) => {
    const p = yearProfile(personId, year);
    const source = EXAM_TEMPLATES.filter((t) => t.year === year).slice(0, p.examCount);
    source.forEach((t, idx) => {
      const failThreshold = source.length - p.examFail;
      const qualified = idx >= failThreshold ? "否" : "是";
      rows.push({
        id: `${year}-${idx + 1}`,
        examName: `${t.examName}（${idx + 1}）`,
        organizer: t.organizer,
        examTime: t.examTime,
        score: qualified === "否" ? "55" : String(85 + ((personId + idx) % 10)),
        qualified,
        relatedClass: "班组长安全提升二期",
        examType: t.examType
      });
    });
  });
  return rows;
}

function composeCertRows(personId) {
  const total = 3 + (personId % 2);
  const abnormalCount = yearProfile(personId, 2025).certAbnormal + yearProfile(personId, 2026).certAbnormal;
  const rows = CERT_TEMPLATES.slice(0, total).map((t, idx) => {
    const abnormal = idx >= total - abnormalCount ? "是" : "否";
    return {
      id: idx + 1,
      certName: t.certName,
      issuerLevel: t.issuerLevel,
      certNo: `CERT-${personId}${idx + 1}2026`,
      certType: t.certType,
      certSubType: t.certSubType,
      effectiveDate: t.effectiveDate,
      expireDate: t.expireDate,
      abnormal,
      relatedTraining: t.relatedTraining
    };
  });
  return rows;
}

function personScopeSummary(personId, scope) {
  const trainingRows = composeTrainingRows(personId, scope);
  const examRows = composeExamRows(personId, scope);
  const certRows = composeCertRows(personId);
  const trainingFail = trainingRows.filter((r) => r.qualified === "否").length;
  const examFail = examRows.filter((r) => r.qualified === "否").length;
  const certAbnormal = certRows.filter((r) => r.abnormal === "是").length;
  const hours = trainingRows.reduce((sum, r) => sum + Number(r.hours || 0), 0);
  const trainingRate = `${(((trainingRows.length - trainingFail) / Math.max(trainingRows.length, 1)) * 100).toFixed(1)}%`;
  return {
    hours,
    trainingCount: trainingRows.length,
    trainingRate,
    certStatus: certAbnormal > 0 ? "异常" : "正常",
    trainingRows,
    examRows,
    certRows,
    trainingFail,
    examFail,
    certAbnormal
  };
}

function Field({ label, value }) {
  return (
    <div className="cert-field-item">
      <div className="cert-field-label">{label}:</div>
      <div className="cert-field-value"><input className="cert-field-control" defaultValue={value} /></div>
    </div>
  );
}

export default function Page() {
  const [selectedPerson, setSelectedPerson] = React.useState(PEOPLE_ROWS[0]);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [activeDetailTab, setActiveDetailTab] = React.useState("training");
  const [trainingFilter, setTrainingFilter] = React.useState("all");
  const [examFilter, setExamFilter] = React.useState("all");
  const [certFilter, setCertFilter] = React.useState("all");
  const [scope, setScope] = React.useState("2026");
  const [tabPageMap, setTabPageMap] = React.useState({ training: 1, exam: 1, cert: 1 });
  const PAGE_SIZE = 10;
  const FIXED_SCOPE = "2026";

  const scopeLabel = SCOPE_OPTIONS.find((s) => s.value === scope)?.label || "全部";

  const enrichedPeople = React.useMemo(() => (
    PEOPLE_ROWS.map((p) => {
      const s = personScopeSummary(p.id, FIXED_SCOPE);
      return {
        ...p,
        hours: String(s.hours),
        trainingCount: String(s.trainingCount),
        trainingPassRate: s.trainingRate,
        certStatus: s.certStatus
      };
    })
  ), [FIXED_SCOPE]);

  const selectedScopeSummary = React.useMemo(() => personScopeSummary(selectedPerson.id, FIXED_SCOPE), [selectedPerson.id, FIXED_SCOPE]);

  const filteredTrainingRows = React.useMemo(() => {
    if (trainingFilter === "pass") return selectedScopeSummary.trainingRows.filter((row) => row.qualified === "是");
    if (trainingFilter === "fail") return selectedScopeSummary.trainingRows.filter((row) => row.qualified === "否");
    return selectedScopeSummary.trainingRows;
  }, [trainingFilter, selectedScopeSummary.trainingRows]);

  const filteredExamRows = React.useMemo(() => {
    if (examFilter === "pass") return selectedScopeSummary.examRows.filter((row) => row.qualified === "是");
    if (examFilter === "fail") return selectedScopeSummary.examRows.filter((row) => row.qualified === "否");
    return selectedScopeSummary.examRows;
  }, [examFilter, selectedScopeSummary.examRows]);

  const filteredCertRows = React.useMemo(() => {
    if (certFilter === "normal") return selectedScopeSummary.certRows.filter((row) => row.abnormal === "否");
    if (certFilter === "abnormal") return selectedScopeSummary.certRows.filter((row) => row.abnormal === "是");
    return selectedScopeSummary.certRows;
  }, [certFilter, selectedScopeSummary.certRows]);

  const tabRowsMap = {
    training: filteredTrainingRows,
    exam: filteredExamRows,
    cert: filteredCertRows
  };

  const pageSummary = React.useMemo(() => {
    const peopleCount = enrichedPeople.length;
    const totalHours = enrichedPeople.reduce((sum, p) => sum + Number(p.hours || 0), 0);
    const allTrainingRows = enrichedPeople.reduce((arr, p) => arr + Number(p.trainingCount || 0), 0);
    const allPassRows = enrichedPeople.reduce((arr, p) => arr + Math.round((Number(p.trainingPassRate.replace("%", "")) / 100) * Number(p.trainingCount || 0)), 0);
    const validCerts = enrichedPeople.reduce((sum, p) => sum + (p.certStatus === "异常" ? 3 : 4), 0);
    return {
      peopleCount,
      totalHours,
      validCerts,
      trainingRate: `${((allPassRows / Math.max(allTrainingRows, 1)) * 100).toFixed(1)}%`
    };
  }, [enrichedPeople]);

  const totalPages = Math.max(1, Math.ceil(tabRowsMap[activeDetailTab].length / PAGE_SIZE));
  const currentPage = Math.min(tabPageMap[activeDetailTab] || 1, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageRows = tabRowsMap[activeDetailTab].slice(pageStart, pageStart + PAGE_SIZE);

  const changePage = (tab, nextPage) => {
    setTabPageMap((prev) => {
      const tabTotal = Math.max(1, Math.ceil((tabRowsMap[tab] || []).length / PAGE_SIZE));
      const page = Math.min(Math.max(1, nextPage), tabTotal);
      return { ...prev, [tab]: page };
    });
  };

  const openDetailModal = (person) => {
    setSelectedPerson(person);
    setActiveDetailTab("training");
    setTrainingFilter("all");
    setExamFilter("all");
    setCertFilter("all");
    setTabPageMap({ training: 1, exam: 1, cert: 1 });
    setShowDetailModal(true);
  };

  return (
    <div className="stack onefile-enterprise-page">
      <div className="edu-dev-main">
        <div className="filterbar">
          <div className="filterbar-row">
            <div className="filterbar-left">
              <div className="filterbar-item">
                <div className="filterbar-label">组织机构</div>
                <div className="filterbar-input"><select className="filterbar-control" defaultValue=""><option value="">请选择组织机构</option><option value="安环部">安环部</option><option value="运行三部">运行三部</option></select></div>
              </div>
              <div className="filterbar-item"><div className="filterbar-label">员工姓名</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入员工姓名" defaultValue="" /></div></div>
              <div className="filterbar-item"><div className="filterbar-label">统一身份账号</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入统一身份账号" defaultValue="" /></div></div>
              <div className="filterbar-item"><div className="filterbar-label">人员类型</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option value="全部">全部</option><option value="新员工">新员工</option><option value="在岗员工">在岗员工</option></select></div></div>
              <div className="filterbar-item"><div className="filterbar-label">证书状态</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option value="全部">全部</option><option value="正常">正常</option><option value="异常">异常</option></select></div></div>
              <div className="filterbar-item"><div className="filterbar-label">岗位</div><div className="filterbar-input"><input className="filterbar-control" placeholder="请输入岗位" defaultValue="" /></div></div>
              <div className="filterbar-item"><div className="filterbar-label">培训合格率区间</div><div className="filterbar-input"><select className="filterbar-control" defaultValue="全部"><option value="全部">全部</option><option value="20以下">20以下</option><option value="20-60">20-60</option><option value="60-80">60-80</option><option value="80-100">80-100</option></select></div></div>
            </div>
            <div className="filterbar-query-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button></div>
            <div className="filterbar-right-actions"><button type="button" className="btn">导出档案</button></div>
          </div>
        </div>

        <Card
          title="档案统计"
          desc=""
          right={<div className="onefile-scope-picker"><span>统计范围：</span><select className="filterbar-control" value={scope} onChange={(e) => setScope(e.target.value)}>{SCOPE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>}
        >
          <div className="metrics-row onefile-stats-metrics">
            <div className="pill"><div className="k">人员总数</div><div className="v">{pageSummary.peopleCount}</div></div>
            <div className="pill"><div className="k">累计培训学时</div><div className="v">{pageSummary.totalHours}</div></div>
            <div className="pill"><div className="k">有效证书数</div><div className="v">{pageSummary.validCerts}</div></div>
            <div className="pill"><div className="k">培训合格率</div><div className="v">{pageSummary.trainingRate}</div></div>
          </div>
        </Card>

        <Card title="人员档案台账" desc="">
          <div className="table-wrap">
            <table className="proto-table">
              <thead><tr><th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>组织机构</th><th>用户姓名</th><th>统一账号</th><th>手机号码</th><th>岗位</th><th>人员类型</th><th>性别</th><th>证书状态</th><th>累计培训学时</th><th>培训记录数</th><th>培训合格率</th><th>操作</th></tr></thead>
              <tbody>
                {enrichedPeople.map((row) => (
                  <tr key={row.id}>
                    <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                    <td>{row.id}</td><td>{row.org}</td><td><button type="button" className="table-link-btn" onClick={() => openDetailModal(row)}>{row.name}</button></td><td>{row.uid}</td><td>{row.phone}</td><td>{row.post}</td><td>{row.type}</td><td>{row.sex}</td>
                    <td className={row.certStatus === "异常" ? "onefile-status-abnormal" : ""}>{row.certStatus}</td>
                    <td>{row.hours}</td><td>{row.trainingCount}</td><td>{row.trainingPassRate}</td><td><button type="button" className="table-link-btn" onClick={() => openDetailModal(row)}>查看详情</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {showDetailModal ? (
        <div className="modal-mask" onClick={() => setShowDetailModal(false)}>
          <div className="modal modal-xl cert-modal onefile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div><div className="modal-title">培训档案查询详情</div><div className="modal-desc">口径：按当前员工档案统计（{scopeLabel}）</div></div>
              <div className="cert-hd-actions"><button type="button" className="btn">导出档案</button><button type="button" className="modal-close" onClick={() => setShowDetailModal(false)} aria-label="关闭">×</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">人员基本信息</div>
                <div className="cert-form-grid">
                  <Field label="组织机构" value={selectedPerson.org} /><Field label="用户姓名" value={selectedPerson.name} /><Field label="统一账号" value={selectedPerson.uid} /><Field label="手机号码" value={selectedPerson.phone} />
                  <Field label="岗位" value={selectedPerson.post} /><Field label="人员类型" value={selectedPerson.type} /><Field label="民族" value={selectedPerson.ethnicity} />
                  <Field label="累计培训学时" value={String(selectedScopeSummary.hours)} /><Field label="培训记录数" value={String(selectedScopeSummary.trainingCount)} /><Field label="培训合格率" value={selectedScopeSummary.trainingRate} />
                  <Field label="有效证书数" value={String(selectedScopeSummary.certRows.length - selectedScopeSummary.certAbnormal)} /><Field label="异常证书数" value={String(selectedScopeSummary.certAbnormal)} />
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row"><span>学习详情总览</span></div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead><tr><th>分类</th><th>最新记录</th><th>统计</th><th>关键指标</th><th>状态</th></tr></thead>
                    <tbody>
                      <tr><td><button type="button" className="onefile-overview-link" onClick={() => setActiveDetailTab("training")}>培训记录</button></td><td>{selectedScopeSummary.trainingRows[0]?.className || "-"}</td><td>{selectedScopeSummary.trainingRows.length}条</td><td>{`合格率 ${selectedScopeSummary.trainingRate}`}</td><td className={selectedScopeSummary.trainingFail > 0 ? "onefile-status-abnormal" : ""}>{selectedScopeSummary.trainingFail > 0 ? `异常（未合格${selectedScopeSummary.trainingFail}条）` : "正常"}</td></tr>
                      <tr><td><button type="button" className="onefile-overview-link" onClick={() => setActiveDetailTab("exam")}>考试记录</button></td><td>{selectedScopeSummary.examRows[0]?.examName || "-"}</td><td>{selectedScopeSummary.examRows.length}条</td><td>{`通过率 ${(((selectedScopeSummary.examRows.length - selectedScopeSummary.examFail) / Math.max(selectedScopeSummary.examRows.length, 1)) * 100).toFixed(1)}%`}</td><td className={selectedScopeSummary.examFail > 0 ? "onefile-status-abnormal" : ""}>{selectedScopeSummary.examFail > 0 ? `异常（未通过${selectedScopeSummary.examFail}条）` : "正常"}</td></tr>
                      <tr><td><button type="button" className="onefile-overview-link" onClick={() => setActiveDetailTab("cert")}>证书档案</button></td><td>{selectedScopeSummary.certRows[0]?.certName || "-"}</td><td>{selectedScopeSummary.certRows.length}本</td><td>{`有效率 ${(((selectedScopeSummary.certRows.length - selectedScopeSummary.certAbnormal) / Math.max(selectedScopeSummary.certRows.length, 1)) * 100).toFixed(1)}%`}</td><td className={selectedScopeSummary.certAbnormal > 0 ? "onefile-status-abnormal" : ""}>{selectedScopeSummary.certAbnormal > 0 ? `异常（异常证书${selectedScopeSummary.certAbnormal}本）` : "正常"}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row"><span>明细记录</span></div>
                <div className="onefile-detail-tabs">
                  <button type="button" className={`onefile-detail-tab${activeDetailTab === "training" ? " active" : ""}`} onClick={() => setActiveDetailTab("training")}>培训记录</button>
                  <button type="button" className={`onefile-detail-tab${activeDetailTab === "exam" ? " active" : ""}`} onClick={() => setActiveDetailTab("exam")}>考试记录</button>
                  <button type="button" className={`onefile-detail-tab${activeDetailTab === "cert" ? " active" : ""}`} onClick={() => setActiveDetailTab("cert")}>证书档案</button>
                </div>

                {activeDetailTab === "training" ? (
                  <div className="onefile-tab-content"><div className="onefile-quick-filters"><button type="button" className={`onefile-filter-chip${trainingFilter === "all" ? " active" : ""}`} onClick={() => { setTrainingFilter("all"); changePage("training", 1); }}>全部</button><button type="button" className={`onefile-filter-chip${trainingFilter === "pass" ? " active" : ""}`} onClick={() => { setTrainingFilter("pass"); changePage("training", 1); }}>仅合格</button><button type="button" className={`onefile-filter-chip${trainingFilter === "fail" ? " active" : ""}`} onClick={() => { setTrainingFilter("fail"); changePage("training", 1); }}>仅未合格</button></div><div className="table-wrap"><table className="proto-table"><thead><tr><th>培训班名称</th><th>培训计划名称</th><th>培训开始日期</th><th>培训结束日期</th><th>培训学时</th><th>成绩</th><th>是否合格</th><th>是否发证</th></tr></thead><tbody>{pageRows.map((row) => (<tr key={row.id}><td>{row.className}</td><td>{row.planName}</td><td>{row.startDate}</td><td>{row.endDate}</td><td>{row.hours}</td><td>{row.score}</td><td className={row.qualified === "否" ? "onefile-status-abnormal" : ""}>{row.qualified}</td><td>{row.issued}</td></tr>))}</tbody></table></div></div>
                ) : null}
                {activeDetailTab === "exam" ? (
                  <div className="onefile-tab-content"><div className="onefile-quick-filters"><button type="button" className={`onefile-filter-chip${examFilter === "all" ? " active" : ""}`} onClick={() => { setExamFilter("all"); changePage("exam", 1); }}>全部</button><button type="button" className={`onefile-filter-chip${examFilter === "pass" ? " active" : ""}`} onClick={() => { setExamFilter("pass"); changePage("exam", 1); }}>仅合格</button><button type="button" className={`onefile-filter-chip${examFilter === "fail" ? " active" : ""}`} onClick={() => { setExamFilter("fail"); changePage("exam", 1); }}>仅未合格</button></div><div className="table-wrap"><table className="proto-table"><thead><tr><th>考试名称</th><th>考试类别</th><th>考试时间</th><th>成绩</th><th>是否合格</th><th>关联培训班</th><th>举办单位</th></tr></thead><tbody>{pageRows.map((row) => (<tr key={row.id}><td>{row.examName}</td><td>{row.examType}</td><td>{row.examTime}</td><td>{row.score}</td><td className={row.qualified === "否" ? "onefile-status-abnormal" : ""}>{row.qualified}</td><td>{row.relatedClass}</td><td>{row.organizer}</td></tr>))}</tbody></table></div></div>
                ) : null}
                {activeDetailTab === "cert" ? (
                  <div className="onefile-tab-content"><div className="onefile-quick-filters"><button type="button" className={`onefile-filter-chip${certFilter === "all" ? " active" : ""}`} onClick={() => { setCertFilter("all"); changePage("cert", 1); }}>全部</button><button type="button" className={`onefile-filter-chip${certFilter === "normal" ? " active" : ""}`} onClick={() => { setCertFilter("normal"); changePage("cert", 1); }}>仅正常</button><button type="button" className={`onefile-filter-chip${certFilter === "abnormal" ? " active" : ""}`} onClick={() => { setCertFilter("abnormal"); changePage("cert", 1); }}>仅异常</button></div><div className="table-wrap"><table className="proto-table"><thead><tr><th>证书名称</th><th>发证机关级别</th><th>证书编号</th><th>证书种类</th><th>证书小类</th><th>证书生效日期</th><th>证书有效期</th><th>是否异常</th><th>关联培训项目</th></tr></thead><tbody>{pageRows.map((row) => (<tr key={row.id}><td>{row.certName}</td><td>{row.issuerLevel}</td><td>{row.certNo}</td><td>{row.certType}</td><td>{row.certSubType}</td><td>{row.effectiveDate}</td><td>{row.expireDate}</td><td className={row.abnormal === "是" ? "onefile-status-abnormal" : ""}>{row.abnormal === "是" ? "异常" : "否"}</td><td>{row.relatedTraining}</td></tr>))}</tbody></table></div></div>
                ) : null}

                <div className="stpm-main-pager"><div className="stpm-main-pager-total">共 {tabRowsMap[activeDetailTab].length} 条记录 第 {currentPage} / {totalPages} 页</div><div className="stpm-main-pager-controls"><button type="button" className="btn" onClick={() => changePage(activeDetailTab, currentPage - 1)}>上一页</button><button type="button" className="btn btn-primary">{currentPage}</button><button type="button" className="btn" onClick={() => changePage(activeDetailTab, currentPage + 1)}>下一页</button><select className="stpm-main-page-size" defaultValue="10"><option value="10">10条/页</option></select></div></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
