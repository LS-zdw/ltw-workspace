import React from "react";
import { useNavigate } from "react-router-dom";

const stageOrder = ["可研阶段", "基础设计阶段", "试运行阶段", "验收阶段"];

const stageFields = {
  "可研阶段": [
    { section: "安全评价信息", rows: [
      ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "是"],
      ["安全评价单位", "山东海普安全环保技术股份有限公司"],
      ["安全评价报告书初审稿", "中安丁烯异构化预评估案卷.pdf"],
      ["工艺危害分析报告", ""],
      ["定量风险评价报告", ""],
      ["工艺是否国内首次使用", "否"]
    ]},
    { section: "内审评审", rows: [
      ["参加人员签名表", "福建物派AC4异构化专家评审签到表2020.7.18.pdf"],
      ["专家组评审意见及个人意见", "福建物派项目专家评审意见2020.7.18.pdf"],
      ["专家组评审意见的修改说明", "中安丁烯异构化预评估案卷.pdf"]
    ]},
    { section: "政府审批", rows: [
      ["是否政府审批", "是"],
      ["批复时间", "2020-10-28"],
      ["安全评价报告终稿", "中安丁烯异构化预评估案卷.pdf"],
      ["批复（备案）文件", "丁烯-技术改造项目安全条件审查意见书2020.10.30.pdf"]
    ]}
  ],
  "基础设计阶段": [
    { section: "安全设施设计信息", rows: [
      ["是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目", "是"],
      ["设计单位", "中石化上海工程有限公司(镇海)"],
      ["安全设施设计", ["2ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926.pdf", "ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926_1.pdf"]],
      ["HAZOP分析报告及审查意见", "中安联合丁烯-烷基THAZOP分析报告专家审查意见2021.7.28.pdf"],
      ["SIL分析报告及审查意见", "中安联合丁烯-烷基TSIL定级报告专家审查意见2021.7.28.pdf"],
      ["“两重点一重大”风险清单", ""],
      ["定量风险评价报告", ""]
    ]},
    { section: "安全设施审查信息", rows: [
      ["参加人员签名表", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"],
      ["专家组评审意见及个人意见", "中安联合2万吨C4异构化制丁烯-1技术改造安全设施设计审查意见2021.7.17.pdf"],
      ["专家组评审意见的修改说明", "中安联合2万吨丁烯-1项目安全设施设计审查专家认可书面意见.pdf"],
      ["安全设施设计终稿", ["2ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926.pdf", "ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926_2.pdf"]]
    ]},
    { section: "政府审批", rows: [
      ["是否政府审批", "是"],
      ["批复时间", "2021-11-11"],
      ["批复（备案）文件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"],
      ["开工时间", "2021-11-11"],
      ["开工报告附件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"]
    ]}
  ],
  "试运行阶段": [
    { section: "政府审批", rows: [
      ["是否有政府试运行审批", "是"],
      ["试生产时间", "2022-11-13"],
      ["审查组织单位", "中安联合煤化有限责任公司"],
      ["试生产方案", ["2万吨年C4异构化制丁烯-1技术改造项目试生产认证材料（外审）.pdf", "2022.10.24 扩建2500吨丙烯腈项目中试与混试双面同意书.pdf"]],
      ["专家组名单", ["风险管控.zip（删除）", "丁烯-1装置试生产专家论证签到表2022.9.24.pdf（删除）"]],
      ["审查意见", "丁烯-1装置试生产专家论证专家集体意见2022.9.24.pdf（删除）"],
      ["投产前安全检查", ""]
    ]},
    { section: "试生产延期信息", rows: [
      ["是否延期", "否"],
      ["延期原因", ""],
      ["延期截止日期", ""],
      ["延期文件", ""]
    ]}
  ],
  "验收阶段": [
    { section: "验收申请信息", rows: [
      ["安全设施竣工验收申请", "2万吨年C4异构化制丁烯-1技术改造项目安全设施竣工验收申请书.pdf（删除）"],
      ["建设项目安全验收评价报告", "中安联合煤化有限责任公司2万吨/年C4异构化制丁烯-1项目安全设施竣工验收评价报告（备案版）（报告正文+附件+附图）.pdf（删除）"],
      ["施工单位的资质证明文件", "丁烯-1项目安装单位-北京燕华工程建设有限公司.pdf（删除）"],
      ["建设项目安全设施施工情况报告", "2万吨年C4异构化制丁烯-1技术改造项目安全设施竣工验收申请书.pdf（删除）"],
      ["建设项目安全设施监理情况报告", "2万吨年C4异构化制丁烯-1技术改造项目安全设施竣工验收申请书.pdf（删除）"],
      ["试生产（使用）期间发现的问题、采取的防范措施以及整改情况报告", ""],
      ["安全生产管理机构设置或者安全生产管理人员配备情况", ""],
      ["从业人员安全培训教育及发证情况", ""],
      ["危险化学品事故应急预案备案登记表", ""],
      ["危险化学品重大危险源备案证明文件", ""],
      ["风险清单管控措施落实情况报告", ""],
      ["法律、行政法规、规章规定的其他文件资料", ""]
    ]},
    { section: "验收意见", rows: [
      ["竣工验收问题汇总表", ["丁烯-1装置竣工验收专家意见2023.5.7.pdf（删除）", "丁烯-1装置竣工验收专家个人意见2023.5.7.pdf（删除）"]],
      ["建设项目安全验收评价报告（终稿）", "中安联合煤化有限责任公司2万吨/年C4异构化制丁烯-1项目安全设施竣工验收评价报告（备案版）（报告正文+附件+附图）.pdf（删除）"],
      ["专家评审及竣工验收意见", ["丁烯-1装置竣工验收专家个人意见2023.5.7.pdf（删除）", "丁烯-1装置竣工验收专家意见2023.5.7.pdf（删除）"]],
      ["验收组名单", "丁烯-1装置竣工验收评审签到表2023.5.7.pdf（删除）"],
      ["竣工验收审查意见书", "2万吨/年C4异构化制丁烯-1项目专家意见修改说明.pdf（删除）"]
    ]}
  ]
};

const requiredFieldMap = {
  "可研阶段": {
    "安全评价信息": [
      "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
      "安全评价单位",
      "工艺是否国内首次使用"
    ],
    "内审评审": [
      "参加人员签名表",
      "专家组评审意见及个人意见",
      "专家组评审意见的修改说明"
    ],
    "政府审批": [
      "是否政府审批",
      "批复时间",
      "批复（备案）文件"
    ]
  },
  "基础设计阶段": {
    "安全设施设计信息": [
      "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目",
      "设计单位"
    ],
    "安全设施审查信息": [
      "参加人员签名表",
      "专家组评审意见及个人意见",
      "专家组评审意见的修改说明"
    ],
    "政府审批": [
      "是否政府审批",
      "批复时间",
      "批复（备案）文件",
      "开工时间"
    ]
  },
  "试运行阶段": {
    "政府审批": [
      "是否有政府试运行审批",
      "试生产时间",
      "审查组织单位",
      "试生产方案",
      "专家组名单",
      "审查意见"
    ],
    "试生产延期信息": [
      "是否延期"
    ]
  },
  "验收阶段": {
    "验收申请信息": [
      "安全设施竣工验收申请",
      "建设项目安全验收评价报告",
      "施工单位的资质证明文件",
      "建设项目安全设施施工情况报告",
      "建设项目安全设施监理情况报告"
    ],
    "验收意见": [
      "竣工验收问题汇总表",
      "建设项目安全验收评价报告（终稿）",
      "专家评审及竣工验收意见",
      "验收组名单",
      "竣工验收审查意见书"
    ]
  }
};

const tableRows = [
  {
    no: 1,
    company: "镇海炼化",
    name: "智能园区气分改造项目",
    level: "事业部级(二类)",
    projectUnit: "宁波工程有限公司",
    stage: "可研阶段",
    evalUnit: "华东安评技术中心",
    designUnit: "宁波工程有限公司",
    suggestDate: "2025-03-02",
    acceptUnit: "华东安全验收中心",
    finishDate: "2026-01-18",
    creator: "张海川",
    status: "查看"
  },
  {
    no: 2,
    company: "茂名分公司",
    name: "乙烯装置节能提效项目",
    level: "企业级(三类)",
    projectUnit: "华南工程技术有限公司",
    stage: "基础设计阶段",
    evalUnit: "华南安评院",
    designUnit: "华南工程技术有限公司",
    suggestDate: "2025-05-16",
    acceptUnit: "粤西验收评估中心",
    finishDate: "2026-03-09",
    creator: "林佩雯",
    status: "查看"
  },
  {
    no: 3,
    company: "洛阳石化",
    name: "动力站扩容与联锁改造项目",
    level: "事业部级(二类)",
    projectUnit: "中原工程建设有限公司",
    stage: "验收阶段",
    evalUnit: "中原安全技术研究院",
    designUnit: "中原工程建设有限公司",
    suggestDate: "2025-02-11",
    acceptUnit: "河南验收评价中心",
    finishDate: "2026-02-26",
    creator: "王志鹏",
    status: "查看"
  }
];

const businessUnitOptions = [
  "资本运营部",
  "矿区（社区）管理部",
  "油田勘探开发事业部",
  "炼油事业部",
  "化工事业部",
  "油品销售事业部",
  "润滑油有限公司",
  "管道储运有限公司",
  "化工销售有限公司",
  "炼油销售有限公司",
  "催化剂有限公司",
  "长城能源化工有限公司",
  "石油工程公司",
  "炼化工程公司",
  "国际石油勘探开发公司",
  "天然气分公司",
  "新星石油有限责任公司",
  "安全监管局",
  "联合石化公司",
  "总部机关及直属企业",
  "专业公司",
  "其他单位所属事业部（管理部/专业公司）"
];

const projectLevelOptions = ["集团公司级(一类)", "事业部级(二类)", "企业级(三类)"];
const stageOptions = ["未开始", "可研阶段", "设计阶段", "试车阶段", "验收阶段", "已完成"];
const flowRecords = [
  { node: "发起申请", status: "已完成", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:54:37", user: "陈宝宏", stage: "可研阶段" },
  { node: "安环分管审批", status: "已完成", unit: "煤化工分公司.安全环保部", time: "2023-09-22 10:54:49", user: "陈宝宏", stage: "基础设计阶段" },
  { node: "验收审批", status: "审批中", unit: "煤化工分公司.安全环保部", time: "-", user: "陈宝宏", stage: "验收阶段" }
];

export function LegacyDetailView({ open = true, item, onClose, fullPage = false }) {
  if (!fullPage && !open) return null;
  const safetyRuleLabel = "是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目";
  const [kyNeedSafetyPermit, setKyNeedSafetyPermit] = React.useState(true);
  const [kyGovApprove, setKyGovApprove] = React.useState(true);
  const [kyDomesticFirstUse, setKyDomesticFirstUse] = React.useState(false);
  const [basicNeedSafetyPermit, setBasicNeedSafetyPermit] = React.useState(true);
  const [basicGovApprove, setBasicGovApprove] = React.useState(true);
  const [trialGovApprove, setTrialGovApprove] = React.useState(true);
  const [trialDelay, setTrialDelay] = React.useState(false);

  React.useEffect(() => {
    if (open || fullPage) {
      setKyNeedSafetyPermit(true);
      setKyGovApprove(true);
      setKyDomesticFirstUse(false);
      setBasicNeedSafetyPermit(true);
      setBasicGovApprove(true);
      setTrialGovApprove(true);
      setTrialDelay(false);
    }
  }, [open, fullPage]);

  const buildSectionsByStage = (stageName) => {
    if (stageName === "可研阶段") {
      const reviewRows = (stageFields["可研阶段"] || []).find((s) => s.section === "内审评审")?.rows || [];
      const safeRows = kyNeedSafetyPermit
        ? [
            [safetyRuleLabel, "是"],
            ["安全评价单位", "山东海普安全环保技术股份有限公司"],
            ["安全评价报告书初审稿", "中安丁烯异构化预评估案卷.pdf"],
            ["工艺危害分析报告", ""],
            ["定量风险评价报告", ""],
            ["工艺是否国内首次使用", kyDomesticFirstUse ? "是" : "否"],
            ...(kyDomesticFirstUse ? [["安全可靠性论证报告", ""]] : [])
          ]
        : [
            [safetyRuleLabel, "否"],
            ["无需办理安全行政许可的书面情况说明", "功能L.ppt"],
            ["安全生产条件和设施综合分析报告", "功能L.ppt"]
          ];
      const govRows = kyGovApprove
        ? [
            ["是否政府审批", "是"],
            ["批复时间", "2020-10-28"],
            ["安全评价报告终稿", "中安丁烯异构化预评估案卷.pdf"],
            ["批复（备案）文件", "丁烯-技术改造项目安全条件审查意见书2020.10.30.pdf"]
          ]
        : [["是否政府审批", "否"], ["原因", ""]];
      return [
        { section: "安全评价信息", rows: safeRows },
        { section: "内审评审", rows: reviewRows },
        { section: "政府审批", rows: govRows }
      ];
    }

    if (stageName === "基础设计阶段") {
      const reviewRows = (stageFields["基础设计阶段"] || []).find((s) => s.section === "安全设施审查信息")?.rows || [];
      const safeRows = basicNeedSafetyPermit
        ? [
            [safetyRuleLabel, "是"],
            ["设计单位", "中石化上海工程有限公司(镇海)"],
            ["安全设施设计", ["2ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926.pdf", "ZA02-2300-BED-SMT厂煤装置基础设计安全设施设计专篇_202100926_1.pdf"]],
            ["HAZOP分析报告及审查意见", "中安联合丁烯-烷基THAZOP分析报告专家审查意见2021.7.28.pdf"],
            ["SIL分析报告及审查意见", "中安联合丁烯-烷基TSIL定级报告专家审查意见2021.7.28.pdf"],
            ["“两重点一重大”风险清单", ""],
            ["定量风险评价报告", ""]
          ]
        : [
            [safetyRuleLabel, "否"],
            ["安全生产条件和设施综合分析报告所提出的对策措施在基础设计中的落实情况说明", ""]
          ];
      const govRows = basicGovApprove
        ? [
            ["是否政府审批", "是"],
            ["批复时间", "2021-11-11"],
            ["批复（备案）文件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"],
            ["开工时间", "2021-11-11"],
            ["开工报告附件", "丁烯-烷基工艺试罐项目安全设施设计审查意见书2021.11.11.pdf"]
          ]
        : [["是否政府审批", "否"], ["原因", ""]];
      return [
        { section: "安全设施设计信息", rows: safeRows },
        { section: "安全设施审查信息", rows: reviewRows },
        { section: "政府审批", rows: govRows }
      ];
    }

    if (stageName === "试运行阶段") {
      const govRows = trialGovApprove
        ? [
            ["是否有政府试运行审批", "是"],
            ["试生产时间", "2022-11-13"],
            ["审查组织单位", "中安联合煤化有限责任公司"],
            ["试生产方案", ["2万吨年C4异构化制丁烯-1技术改造项目试生产认证材料（外审）.pdf", "2022.10.24 扩建2500吨丙烯腈项目中试与混试双面同意书.pdf"]],
            ["专家组名单", ["风险管控.zip", "丁烯-1装置试生产专家论证签到表2022.9.24.pdf"]],
            ["审查意见", "丁烯-1装置试生产专家论证专家集体意见2022.9.24.pdf"],
            ["投产前安全检查", ""]
          ]
        : [["是否有政府试运行审批", "否"]];
      const delayRows = trialDelay
        ? [["是否延期", "是"], ["延期原因", ""], ["延期截止日期", ""], ["延期文件", ""]]
        : [["是否延期", "否"]];
      return trialGovApprove
        ? [{ section: "政府审批", rows: govRows }, { section: "试生产延期信息", rows: delayRows }]
        : [{ section: "政府审批", rows: govRows }];
    }

    return stageFields[stageName] || [];
  };

  const allStages = stageOrder.map((name) => ({
    stageName: name,
    sections: buildSectionsByStage(name)
  }));

  const isRequiredField = (stageName, sectionName, label) => {
    if (stageName === "可研阶段") {
      if (sectionName === "安全评价信息") {
        const whenYes = [safetyRuleLabel, "安全评价单位", "工艺是否国内首次使用", ...(kyDomesticFirstUse ? ["安全可靠性论证报告"] : [])];
        const whenNo = [safetyRuleLabel, "无需办理安全行政许可的书面情况说明", "安全生产条件和设施综合分析报告"];
        return (kyNeedSafetyPermit ? whenYes : whenNo).includes(label);
      }
      if (sectionName === "政府审批") {
        return (kyGovApprove ? ["是否政府审批", "批复时间", "批复（备案）文件"] : ["是否政府审批", "原因"]).includes(label);
      }
    }
    if (stageName === "基础设计阶段") {
      if (sectionName === "安全设施设计信息") {
        const whenYes = [safetyRuleLabel, "设计单位"];
        const whenNo = [safetyRuleLabel, "安全生产条件和设施综合分析报告所提出的对策措施在基础设计中的落实情况说明"];
        return (basicNeedSafetyPermit ? whenYes : whenNo).includes(label);
      }
      if (sectionName === "政府审批") {
        return (basicGovApprove ? ["是否政府审批", "批复时间", "批复（备案）文件", "开工时间"] : ["是否政府审批", "原因"]).includes(label);
      }
    }
    if (stageName === "试运行阶段") {
      if (sectionName === "政府审批") {
        const whenYes = ["是否有政府试运行审批", "试生产时间", "审查组织单位", "试生产方案", "专家组名单", "审查意见"];
        const whenNo = ["是否有政府试运行审批"];
        return (trialGovApprove ? whenYes : whenNo).includes(label);
      }
      if (sectionName === "试生产延期信息") {
        const whenYes = ["是否延期", "延期原因", "延期截止日期", "延期文件"];
        const whenNo = ["是否延期"];
        return (trialDelay ? whenYes : whenNo).includes(label);
      }
    }
    const requiredSetBySection = requiredFieldMap[stageName] || {};
    return (requiredSetBySection[sectionName] || []).includes(label);
  };

  const toField = (row, stageName, sectionName) => {
    if (Array.isArray(row)) {
      const label = row[0] || "";
      return {
        label,
        value: row[1],
        required: isRequiredField(stageName, sectionName, label)
      };
    }
    return row || { label: "", value: "" };
  };

  const isYesNoField = (label, value) => {
    if (!String(label || "").includes("是否")) return false;
    return value === "是" || value === "否";
  };

  const isToggleField = (stageName, label) => {
    if (stageName === "可研阶段" && (label === safetyRuleLabel || label === "是否政府审批" || label === "工艺是否国内首次使用")) return true;
    if (stageName === "基础设计阶段" && (label === safetyRuleLabel || label === "是否政府审批")) return true;
    if (stageName === "试运行阶段" && (label === "是否有政府试运行审批" || label === "是否延期")) return true;
    return false;
  };

  const onToggleChange = (stageName, label, isYes) => {
    if (stageName === "可研阶段" && label === safetyRuleLabel) setKyNeedSafetyPermit(isYes);
    if (stageName === "可研阶段" && label === "是否政府审批") setKyGovApprove(isYes);
    if (stageName === "可研阶段" && label === "工艺是否国内首次使用") setKyDomesticFirstUse(isYes);
    if (stageName === "基础设计阶段" && label === safetyRuleLabel) setBasicNeedSafetyPermit(isYes);
    if (stageName === "基础设计阶段" && label === "是否政府审批") setBasicGovApprove(isYes);
    if (stageName === "试运行阶段" && label === "是否有政府试运行审批") setTrialGovApprove(isYes);
    if (stageName === "试运行阶段" && label === "是否延期") setTrialDelay(isYes);
  };

  const isUploadField = (label, value) => {
    const t = String(label || "");
    const v = value;
    if (Array.isArray(v)) return true;
    const sv = String(v || "").toLowerCase();
    if (sv.includes(".pdf") || sv.includes(".zip") || sv.includes(".doc") || sv.includes(".docx") || sv.includes(".ppt") || sv.includes(".pptx")) return true;
    return (
      t.includes("报告") ||
      t.includes("文件") ||
      t.includes("申请") ||
      t.includes("附件") ||
      t.includes("意见") ||
      t.includes("名单") ||
      t.includes("签名表") ||
      t.includes("问题汇总表") ||
      t.includes("检查")
    );
  };

  const renderFileText = (txt) => {
    const s = String(txt || "");
    if (!s) return null;
    const clean = s.replaceAll("（删除）", "").trim();
    return (
      <span className="legacy-file-item">
        <button type="button" className="table-link-btn">{clean}</button>
      </span>
    );
  };

  const content = (
    <>
      {allStages.map((stageBlock) => (
        <div key={stageBlock.stageName} className="legacy-section">
          <div className="legacy-section-title">{stageBlock.stageName}</div>
          {stageBlock.sections.map((sec) => (
            <div key={stageBlock.stageName + sec.section} className="legacy-section">
              <div className="legacy-section-title">{sec.section}</div>
              <div className="legacy-form-grid">
                {sec.rows.map((row, i) => {
                  const field = toField(row, stageBlock.stageName, sec.section);
                  const val = field.value;
                      const yesNo = isYesNoField(field.label, val);
                      const toggleField = isToggleField(stageBlock.stageName, field.label);
                  const isAcceptanceEmptyUpload =
                    stageBlock.stageName === "验收阶段" &&
                    sec.section === "验收申请信息" &&
                    !Array.isArray(val) &&
                    String(val || "").trim() === "";
                  return (
                    <React.Fragment key={stageBlock.stageName + sec.section + i}>
                      <div className="legacy-label">
                        {field.label}：{field.required ? <span className="required-mark">*</span> : null}
                      </div>
                      <div className="legacy-value">
                        {yesNo ? (
                          <div className="cert-radio-group">
                            <label className="cert-radio-item">
                              <input
                                type="radio"
                                name={"readonly-" + stageBlock.stageName + "-" + sec.section + "-" + i}
                                checked={val === "是"}
                                readOnly={!toggleField}
                                onChange={toggleField ? () => onToggleChange(stageBlock.stageName, field.label, true) : undefined}
                              />
                              <span>是</span>
                            </label>
                            <label className="cert-radio-item">
                              <input
                                type="radio"
                                name={"readonly-" + stageBlock.stageName + "-" + sec.section + "-" + i}
                                checked={val === "否"}
                                readOnly={!toggleField}
                                onChange={toggleField ? () => onToggleChange(stageBlock.stageName, field.label, false) : undefined}
                              />
                              <span>否</span>
                            </label>
                          </div>
                            ) : (isUploadField(field.label, val) || isAcceptanceEmptyUpload) ? (
                              <div className="legacy-upload-row">
                                <div className="legacy-upload-box">
                              {Array.isArray(val) ? (
                                <div className="legacy-file-list inline">
                                  {val.map((f, k) => <div key={String(f) + k}>{renderFileText(f)}</div>)}
                                </div>
                              ) : String(val || "").trim() ? (
                                renderFileText(val)
                                  ) : (
                                    <span className="legacy-upload-placeholder">上传最大500M(支持图片、文档、压缩文件等)</span>
                                  )}
                                </div>
                              </div>
                        ) : Array.isArray(val) ? (
                          <div className="legacy-file-list">
                            {val.map((f, k) => <button key={String(f) + k} type="button" className="table-link-btn">{String(f || "").replaceAll("（删除）", "").trim()}</button>)}
                          </div>
                        ) : String(val || "").endsWith(".pdf") ? (
                          <button type="button" className="table-link-btn">{String(val || "").replaceAll("（删除）", "").trim()}</button>
                        ) : (
                          <input className="filterbar-control" defaultValue={val || ""} readOnly />
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );

  if (fullPage) {
    return (
      <div className="stack">
        <div className="filterbar">
          <div className="filterbar-row">
            <div className="filterbar-left">
              <div className="filterbar-item">
                <div className="filterbar-label">项目名称</div>
                <div className="filterbar-input">
                  <input className="filterbar-control" value={item?.name || "智能园区气分改造项目"} readOnly />
                </div>
              </div>
            </div>
            <div className="filterbar-actions">
              <button type="button" className="btn" onClick={onClose}>返回</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-bd">
            <div className="legacy-detail-layout">
              <div className="legacy-detail-main">{content}</div>
              <aside className="legacy-detail-flow">
                <div className="legacy-section">
                  <div className="legacy-section-title">流程信息</div>
                  <div className="legacy-flow-list">
                    {flowRecords.map((it, idx) => (
                      <div key={idx} className="legacy-flow-item">
                        <div>{it.node}</div>
                        <div>处理状态：{it.status}</div>
                        <div>处理单位：{it.unit}</div>
                        <div>处理时间：{it.time}</div>
                        <div>处理人：{it.user}</div>
                        <div>处理阶段：{it.stage}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
        <div className="modal-hd">
          <div className="modal-title">项目名称：{item?.name || "智能园区气分改造项目"}</div>
          <button type="button" className="btn" onClick={onClose}>返回</button>
        </div>
        <div className="modal-bd">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const navigate = useNavigate();
  const showAdvanced = true;
  const [showStageDropdown, setShowStageDropdown] = React.useState(false);
  const stageDropdownRef = React.useRef(null);
  React.useEffect(() => {
    if (!showStageDropdown) return;
    const onDocMouseDown = (e) => {
      if (!stageDropdownRef.current) return;
      if (!stageDropdownRef.current.contains(e.target)) setShowStageDropdown(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [showStageDropdown]);
  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item">
              <div className="filterbar-label">项目名称</div>
              <div className="filterbar-input">
                <input className="filterbar-control" placeholder="请输入关键字" />
              </div>
            </div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">高级查询</button>
            <button type="button" className="btn">清空</button>
            <button type="button" className="btn">导出</button>
          </div>
        </div>
      </div>

      {showAdvanced ? (
        <div className="legacy-advanced card">
          <div className="card-bd">
            <div className="legacy-advanced-title">高级查询</div>
            <div className="legacy-advanced-grid">
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">所属事业部（管理部门专业公司）</div>
                <div className="legacy-adv-input">
                  <select className="filterbar-control">
                    <option>-请选择-</option>
                    {businessUnitOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">项目级别</div>
                <div className="legacy-adv-input">
                  <select className="filterbar-control">
                    <option>-请选择-</option>
                    {projectLevelOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">项目阶段</div>
                <div className="legacy-adv-input">
                  <div className="legacy-stage-dropdown" ref={stageDropdownRef}>
                    <button
                      type="button"
                      className="legacy-stage-trigger"
                      onClick={() => setShowStageDropdown((v) => !v)}
                    >
                      验收阶段
                      <span className="legacy-stage-caret">▼</span>
                    </button>
                    {showStageDropdown ? (
                      <div className="legacy-stage-checks">
                        {stageOptions.map((opt) => (
                          <label key={opt} className="legacy-stage-check-item">
                            <input type="checkbox" defaultChecked={opt === "验收阶段"} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">项目所在单位</div>
                <div className="legacy-adv-input"><select className="filterbar-control"><option>-请选择-</option></select></div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">登记人</div>
                <div className="legacy-adv-input"><select className="filterbar-control"><option>-请选择-</option></select></div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">登记部门</div>
                <div className="legacy-adv-input">
                  <select className="filterbar-control">
                    <option>-请选择-</option>
                    {businessUnitOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">所属企业</div>
                <div className="legacy-adv-input"><select className="filterbar-control"><option>-请选择-</option></select></div>
              </div>
              <div className="legacy-adv-item">
                <div className="legacy-adv-label">安全评价单位</div>
                <div className="legacy-adv-input"><input className="filterbar-control" placeholder="请输入安全评价单位" /></div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="card">
        <div className="card-bd table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th>
                <th>所属企业</th>
                <th>项目名称</th>
                <th>项目级别</th>
                <th>项目所在单位</th>
                <th>项目阶段</th>
                <th>安全评价单位</th>
                <th>设计单位</th>
                <th>安全设施设计批复日期</th>
                <th>验收评价单位</th>
                <th>安全竣工验收日期</th>
                <th>登记人</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, idx) => {
                const row = tableRows[idx % tableRows.length];
                return (
                  <tr key={idx}>
                    <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                    <td>{idx + 1}</td>
                    <td>{row.company}</td>
                    <td><button type="button" className="table-link-btn" onClick={() => { if (idx === 0) navigate("/san-tongshi/safety-migration-query/detail"); }}>{row.name}</button></td>
                    <td>{row.level}</td>
                    <td>{row.projectUnit}</td>
                    <td>{row.stage}</td>
                    <td>{row.evalUnit}</td>
                    <td>{row.designUnit}</td>
                    <td>{row.suggestDate}</td>
                    <td>{row.acceptUnit}</td>
                    <td>{row.finishDate}</td>
                    <td>{row.creator}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
