import React from "react";
import Card from "/src/components/ui/Card.jsx";

const demandRows = [
  {
    id: 1,
    code: "ZHLH-XQ-2026-001",
    dept: "炼油三部",
    demandName: "班组长HSE履职能力提升培训需求",
    demandType: "岗位技能类",
    method: "集中面授",
    target: "班组长及班组安全员 42人",
    content: "围绕安全生产责任落实、风险辨识和隐患闭环管理开展专题培训。",
    status: "审批通过",
    submitDate: "2026-03-06",
    user: "王敏"
  },
  {
    id: 2,
    code: "ZHLH-XQ-2026-002",
    dept: "公用工程部",
    demandName: "特殊作业监护能力复训需求",
    demandType: "法规合规类",
    method: "线上培训",
    target: "作业监护人 26人",
    content: "聚焦动火、受限空间和高处作业监护职责及违章案例。",
    status: "审核中",
    submitDate: "2026-03-05",
    user: "肖鹏"
  },
  {
    id: 3,
    code: "ZHLH-XQ-2026-003",
    dept: "设备管理部",
    demandName: "设备完整性风险识别培训需求",
    demandType: "岗位技能类",
    method: "集中面授",
    target: "设备技术骨干 18人",
    content: "围绕关键设备点检、腐蚀监测和设备失效案例开展培训。",
    status: "待提交",
    submitDate: "2026-03-04",
    user: "李卓"
  },
  {
    id: 4,
    code: "ZHLH-XQ-2026-004",
    dept: "化工二部",
    demandName: "工艺报警管理专项培训需求",
    demandType: "岗位技能类",
    method: "集中面授",
    target: "主操、副操 36人",
    content: "重点提升报警响应、异常工况处置和联锁管理能力。",
    status: "审批通过",
    submitDate: "2026-03-03",
    user: "陈雪"
  },
  {
    id: 5,
    code: "ZHLH-XQ-2026-005",
    dept: "安全环保部",
    demandName: "事故案例警示教育培训需求",
    demandType: "事故案例警示教育",
    method: "线上培训",
    target: "各运行部管理人员 60人",
    content: "结合集团内部典型事故案例开展警示教育和责任落实宣贯。",
    status: "审批驳回",
    submitDate: "2026-03-02",
    user: "郑宁"
  },
  {
    id: 6,
    code: "ZHLH-XQ-2026-006",
    dept: "储运部",
    demandName: "危化品储运安全管理培训需求",
    demandType: "法规合规类",
    method: "集中面授",
    target: "储运岗位人员 28人",
    content: "围绕罐区运行、装卸作业和异常泄漏应急处置开展培训。",
    status: "审批通过",
    submitDate: "2026-03-01",
    user: "周超"
  },
  {
    id: 7,
    code: "ZHLH-XQ-2026-007",
    dept: "人力资源部",
    demandName: "新员工三级安全教育优化需求",
    demandType: "法规合规类",
    method: "集中面授",
    target: "新入职员工 34人",
    content: "完善厂级、部级、班组级三级教育课程内容与考试标准。",
    status: "审核中",
    submitDate: "2026-02-28",
    user: "高杨"
  },
  {
    id: 8,
    code: "ZHLH-XQ-2026-008",
    dept: "生产技术部",
    demandName: "开停工安全管控培训需求",
    demandType: "岗位技能类",
    method: "外出研修",
    target: "生产技术骨干 12人",
    content: "学习兄弟企业开停工风险评估和关键节点管控经验。",
    status: "待提交",
    submitDate: "2026-02-26",
    user: "陈涛"
  },
  {
    id: 9,
    code: "ZHLH-XQ-2026-009",
    dept: "消防保卫部",
    demandName: "应急指挥与桌面推演培训需求",
    demandType: "岗位技能类",
    method: "集中面授",
    target: "应急骨干 20人",
    content: "围绕泄漏着火、停电停汽等场景开展桌面推演与指挥协同培训。",
    status: "审批通过",
    submitDate: "2026-02-24",
    user: "周凯"
  },
  {
    id: 10,
    code: "ZHLH-XQ-2026-010",
    dept: "炼油一部",
    demandName: "冬季运行防冻防凝复盘培训需求",
    demandType: "事故案例警示教育",
    method: "线上培训",
    target: "装置运行人员 48人",
    content: "复盘冬季运行异常事件，强化设备巡检和处置要求。",
    status: "审批通过",
    submitDate: "2026-02-22",
    user: "王敏"
  }
];

const detailData = {
  code: "ZHLH-XQ-2026-001",
  dept: "炼油三部",
  demandName: "班组长HSE履职能力提升培训需求",
  demandType: "岗位技能类",
  method: "集中面授",
  target: "班组长及班组安全员 42人",
  content: "围绕安全生产责任落实、风险辨识和隐患闭环管理开展专题培训。",
  expectedDate: "2026-04-15",
  budget: "180000",
  attachment: "班组长HSE履职能力提升培训需求说明.docx",
  status: "审批通过",
  approver: "郑宁",
  approveTime: "2026-03-07 10:26:18",
  opinion: "建议纳入二季度重点培训计划，按两期开班组织实施。",
  user: "王敏",
  submitTime: "2026-03-06 16:12:25"
};

export default function Page() {
  const [activeModal, setActiveModal] = React.useState(null);

  const openModal = (id) => {
    setActiveModal(id);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item">
              <div className="filterbar-label">需求编号</div>
              <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入需求编号" defaultValue="" /></div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">需求名称</div>
              <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入需求名称" defaultValue="" /></div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">申报部门</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="请选择申报部门">
                  <option value="请选择申报部门">请选择申报部门</option>
                  <option value="炼油三部">炼油三部</option>
                  <option value="公用工程部">公用工程部</option>
                  <option value="设备管理部">设备管理部</option>
                  <option value="安全环保部">安全环保部</option>
                </select>
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">培训类型</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="请选择培训类型">
                  <option value="请选择培训类型">请选择培训类型</option>
                  <option value="岗位技能类">岗位技能类</option>
                  <option value="法规合规类">法规合规类</option>
                  <option value="事故案例警示教育">事故案例警示教育</option>
                </select>
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">审批状态</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="请选择审批状态">
                  <option value="请选择审批状态">请选择审批状态</option>
                  <option value="待提交">待提交</option>
                  <option value="审核中">审核中</option>
                  <option value="审批通过">审批通过</option>
                  <option value="审批驳回">审批驳回</option>
                </select>
              </div>
            </div>
            <div className="filterbar-query-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-right-actions">
            <button type="button" className="btn btn-primary" onClick={() => openModal("demand-add")}>新增</button>
            <button type="button" className="btn">导出</button>
          </div>
        </div>
      </div>

      <Card title="教育培训-培训需求管理-企业端列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th>
                <th>需求编号</th>
                <th>需求名称</th>
                <th>申报部门</th>
                <th>培训类型</th>
                <th>培训形式</th>
                <th>建议培训对象</th>
                <th>培训需求内容</th>
                <th>审批状态</th>
                <th>提交日期</th>
                <th>申报人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {demandRows.map((row) => (
                <tr key={row.id}>
                  <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                  <td>{row.id}</td>
                  <td>{row.code}</td>
                  <td><button type="button" className="table-link-btn" onClick={() => row.id === 1 && openModal("demand-detail", "")}>{row.demandName}</button></td>
                  <td>{row.dept}</td>
                  <td>{row.demandType}</td>
                  <td>{row.method}</td>
                  <td>{row.target}</td>
                  <td>{row.content}</td>
                  <td>{row.status}</td>
                  <td>{row.submitDate}</td>
                  <td>{row.user}</td>
                  <td>
                    <div className="table-op-inline">
                      <button type="button" className="table-op-link table-op-link-edit" onClick={row.id === 1 ? () => openModal("demand-edit", "") : undefined}>编辑</button>
                      <button type="button" className="table-op-link table-op-link-delete">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="页面说明" desc="">
        <div className="grid grid-2">
          <div className="pill">
            <div className="k">页面用途</div>
            <div className="v">用于企业端汇总、维护和跟踪各部门上报的培训需求信息。</div>
          </div>
          <div className="pill">
            <div className="k">业务范围</div>
            <div className="v">需求内容覆盖新员工三级安全教育、班组能力提升、作业许可管理和专业技能复训等场景。</div>
          </div>
          <div className="pill">
            <div className="k">查询说明</div>
            <div className="v">可按需求编号、需求名称、申报部门、培训类型和审批状态组合筛选。</div>
          </div>
          <div className="pill">
            <div className="k">演示说明</div>
            <div className="v">原型模式仅展示流程和页面关系，不执行真实新增、编辑和删除。</div>
          </div>
        </div>
      </Card>

      {activeModal ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div className="modal-title">
                {activeModal === "demand-detail" ? "培训需求详情" : activeModal === "demand-edit" ? "培训需求编辑" : "培训需求新增"}
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">需求基本信息</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>需求编号：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.code} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>申报部门：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.dept} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label"><span className="required-mark">*</span>需求名称：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.demandName} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>培训类型：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.demandType} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label"><span className="required-mark">*</span>培训形式：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.method} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label">建议培训对象：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.target} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label"><span className="required-mark">*</span>培训需求内容：</div><div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" defaultValue={detailData.content} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label">期望完成日期：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.expectedDate} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label">计划投资金额：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.budget} readOnly={activeModal === "demand-detail"} /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label">需求附件：</div><div className="cert-field-value"><button type="button" className="table-link-btn">上传附件</button></div></div>
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">审批信息</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item"><div className="cert-field-label">审批状态：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.status} readOnly /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label">审批人：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.approver} readOnly /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label">审批时间：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.approveTime} readOnly /></div></div>
                  <div className="cert-field-item cert-field-item-wide"><div className="cert-field-label">审批意见：</div><div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" defaultValue={detailData.opinion} readOnly /></div></div>
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">登记信息</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item"><div className="cert-field-label">登记人：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.user} readOnly /></div></div>
                  <div className="cert-field-item"><div className="cert-field-label">登记时间：</div><div className="cert-field-value"><input className="cert-field-control" defaultValue={detailData.submitTime} readOnly /></div></div>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>{activeModal === "demand-detail" ? "关闭" : "取消"}</button>
              {activeModal === "demand-detail" ? null : <button type="button" className="btn btn-primary" onClick={closeModal}>保存</button>}
              {activeModal === "demand-add" ? <button type="button" className="btn btn-primary" onClick={closeModal}>提交</button> : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
