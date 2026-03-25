import React from "react";
import Card from "/src/components/ui/Card.jsx";

const baseEntries = [
  {
    id: "KB-2026-001",
    title: "风险隐患清单：重点装置隐患排查清单（2026版）",
    category: "风险隐患清单",
    tags: "隐患排查/清单/闭环",
    positions: "安全员/班组长/管理人员",
    downloadCount: 326,
    status: "发布中",
    updateDate: "2026-02-03",
    registerDept: "安全环保数质量部",
    registerUser: "赵丽",
    registerTime: "2026-02-03 09:20:15",
    summary: "适用于重点装置日常巡检、专项检查与复盘，覆盖识别、整改、验收和闭环跟踪要求。",
    attachmentName: "风险隐患清单_重点装置_2026版.pdf"
  },
  {
    id: "KB-2026-002",
    title: "事故事件案例：受限空间窒息事故复盘要点",
    category: "事故事件案例",
    tags: "事故复盘/受限空间/警示",
    positions: "检维修/承包商/班组长",
    downloadCount: 284,
    status: "发布中",
    updateDate: "2026-01-28",
    registerDept: "生产运行部",
    registerUser: "李强",
    registerTime: "2026-01-28 14:12:40",
    summary: "基于典型受限空间事故案例，提炼监护、检测、作业票与应急处置关键控制点。",
    attachmentName: "事故案例复盘_受限空间窒息.pdf"
  },
  {
    id: "KB-2026-003",
    title: "应急预案：危化品泄漏现场处置与上报流程",
    category: "应急预案",
    tags: "应急处置/预案/上报",
    positions: "应急管理/调度/班组长",
    downloadCount: 197,
    status: "发布中",
    updateDate: "2026-01-21",
    registerDept: "应急中心",
    registerUser: "周楠",
    registerTime: "2026-01-21 10:46:08",
    summary: "明确泄漏发现、现场隔离、应急响应、信息上报与协同处置流程，便于一线快速执行。",
    attachmentName: "应急预案_危化品泄漏处置流程.docx"
  },
  {
    id: "KB-2026-004",
    title: "防灾减灾知识：台风暴雨防灾减灾检查要点",
    category: "防灾减灾知识",
    tags: "台风/暴雨/防灾减灾",
    positions: "生产运行/设备/值班人员",
    downloadCount: 158,
    status: "发布中",
    updateDate: "2025-12-18",
    registerDept: "设备管理部",
    registerUser: "王涛",
    registerTime: "2025-12-18 16:30:22",
    summary: "覆盖台风暴雨来临前、中、后阶段的检查与防护要求，包含重点设备和区域核查清单。",
    attachmentName: "防灾减灾检查要点_台风暴雨.xlsx"
  }
];

const tableRows = Array.from({ length: 10 }, (_, idx) => ({
  order: idx + 1,
  ...baseEntries[idx % baseEntries.length]
}));

export default function Page() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(tableRows[0]);

  const closeModal = () => {
    setActiveModal(null);
  };

  const openDetail = (row, order) => {
    if (order !== 1) return;
    setCurrentRow(row);
    setActiveModal("kb-detail");
  };

  const openAttach = (row) => {
    setCurrentRow(row);
    setActiveModal("kb-download");
  };

  return (
    <div className="stack">
      <Card title="知识库概览" desc="">
        <div className="metrics-row">
          <div className="pill">
            <div className="k">总条目</div>
            <div className="v">268</div>
          </div>
          <div className="pill">
            <div className="k">本月新增</div>
            <div className="v">24</div>
          </div>
          <div className="pill">
            <div className="k">热门（近7天）</div>
            <div className="v">18</div>
          </div>
          <div className="pill">
            <div className="k">发布中</div>
            <div className="v">213</div>
          </div>
        </div>
      </Card>

      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item">
              <div className="filterbar-label">分类</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="全部">
                  <option value="全部">全部</option>
                  <option value="风险隐患清单">风险隐患清单</option>
                  <option value="事故事件案例">事故事件案例</option>
                  <option value="应急预案">应急预案</option>
                  <option value="防灾减灾知识">防灾减灾知识</option>
                </select>
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">关键词</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="模糊搜索查询">
                  <option value="模糊搜索查询">模糊搜索查询</option>
                  <option value="风险隐患清单">风险隐患清单</option>
                  <option value="事故事件案例">事故事件案例</option>
                  <option value="应急预案">应急预案</option>
                  <option value="防灾减灾知识">防灾减灾知识</option>
                </select>
              </div>
            </div>
            <div className="filterbar-item">
              <div className="filterbar-label">登记日期</div>
              <div className="filterbar-input">
                <div className="filterbar-range">
                  <input type="text" className="filterbar-control" defaultValue="2026-02-01" />
                  <span className="filterbar-range-sep">-</span>
                  <input type="text" className="filterbar-control" defaultValue="2026-02-11" />
                </div>
              </div>
            </div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">重置</button>
            <button type="button" className="btn">导出</button>
          </div>
        </div>
      </div>

      <Card title="推荐阅读（按分类与岗位匹配）" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th>
                <th>条目标题</th>
                <th>分类</th>
                <th>标签</th>
                <th>适用岗位</th>
                <th>下载量</th>
                <th>附件</th>
                <th>更新时间</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={`${row.id}-${row.order}`}>
                  <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                  <td>{row.order}</td>
                  <td>
                    <button type="button" className="table-link-btn" onClick={() => openDetail(row, row.order)}>
                      {row.title}
                    </button>
                  </td>
                  <td>{row.category}</td>
                  <td>{row.tags}</td>
                  <td>{row.positions}</td>
                  <td>{row.downloadCount}</td>
                  <td>
                    <button type="button" className="table-link-btn" onClick={() => openAttach(row)}>
                      下载
                    </button>
                  </td>
                  <td>{row.updateDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {activeModal === "kb-download" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">附件下载</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              <div>附件已下载。</div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn btn-primary" onClick={closeModal}>关闭</button>
            </div>
          </div>
        </div>
      ) : null}

      {activeModal === "kb-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">条目详情</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-section-title">基础信息</div>
                <div className="cert-form-grid plan-form-two-col">
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>条目ID：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.id} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>分类：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.category} readOnly /></div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label"><span className="required-mark">*</span>条目标题：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.title} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">标签：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.tags} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">适用岗位：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.positions} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">下载量：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={String(currentRow.downloadCount)} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">状态：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.status} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">更新时间：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.updateDate} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记部门：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.registerDept} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记人：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.registerUser} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">登记时间：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.registerTime} readOnly /></div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label">附件：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.attachmentName} readOnly /></div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label">内容摘要：</div>
                    <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" rows={4} value={currentRow.summary} readOnly /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>关闭</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
