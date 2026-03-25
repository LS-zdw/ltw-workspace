import React from "react";
import Card from "/src/components/ui/Card.jsx";

const baseEntries = [
  {
    id: "KB-2026-001",
    title: "风险隐患清单：重点装置隐患排查清单（2026版）",
    category: "风险隐患清单",
    attachmentName: "风险隐患清单_重点装置_2026版.pdf",
    tags: "隐患排查/清单/闭环",
    positions: "安全员/班组长/管理人员",
    downloadCount: 326,
    status: "发布中",
    updateDate: "2026-02-03",
    registerDept: "安全环保数质量部",
    registerUser: "赵丽",
    registerTime: "2026-02-03 09:20:15",
    summary: "适用于重点装置日常巡检、专项检查与复盘，覆盖识别、整改、验收和闭环跟踪要求。"
  },
  {
    id: "KB-2026-002",
    title: "事故事件案例：受限空间窒息事故复盘要点",
    category: "事故事件案例",
    attachmentName: "事故案例复盘_受限空间窒息.pdf",
    tags: "事故复盘/受限空间/警示",
    positions: "检维修/承包商/班组长",
    downloadCount: 284,
    status: "已作废",
    updateDate: "2026-01-28",
    registerDept: "生产运行部",
    registerUser: "李强",
    registerTime: "2026-01-28 14:12:40",
    summary: "基于典型受限空间事故案例，提炼监护、检测、作业票与应急处置关键控制点。"
  },
  {
    id: "KB-2026-003",
    title: "应急预案：危化品泄漏现场处置与上报流程",
    category: "应急预案",
    attachmentName: "应急预案_危化品泄漏处置流程.docx",
    tags: "应急处置/预案/上报",
    positions: "应急管理/调度/班组长",
    downloadCount: 197,
    status: "发布中",
    updateDate: "2026-01-21",
    registerDept: "应急中心",
    registerUser: "周楠",
    registerTime: "2026-01-21 10:46:08",
    summary: "明确泄漏发现、现场隔离、应急响应、信息上报与协同处置流程，便于一线快速执行。"
  },
  {
    id: "KB-2026-004",
    title: "防灾减灾知识：台风暴雨防灾减灾检查要点",
    category: "防灾减灾知识",
    attachmentName: "防灾减灾检查要点_台风暴雨.xlsx",
    tags: "台风/暴雨/防灾减灾",
    positions: "生产运行/设备/值班人员",
    downloadCount: 158,
    status: "草稿",
    updateDate: "2025-12-18",
    registerDept: "设备管理部",
    registerUser: "王涛",
    registerTime: "2025-12-18 16:30:22",
    summary: "覆盖台风暴雨来临前、中、后阶段的检查与防护要求，包含重点设备和区域核查清单。"
  }
];

const tableRows = Array.from({ length: 10 }, (_, idx) => ({
  order: idx + 1,
  ...baseEntries[idx % baseEntries.length]
}));

export default function Page() {
  const [activeModal, setActiveModal] = React.useState(null);
  const [currentRow, setCurrentRow] = React.useState(tableRows[0]);
  const [pendingAction, setPendingAction] = React.useState(null);

  const closeModal = () => {
    setActiveModal(null);
    setPendingAction(null);
  };

  const openDetailByRow = (row, order) => {
    if (order !== 1) return;
    setCurrentRow(row);
    setActiveModal("kb-detail");
  };

  const openOpsByRow = (row, order, actionLabel) => {
    if (order !== 1) return;
    setCurrentRow(row);
    if (actionLabel === "发布" || actionLabel === "作废" || actionLabel === "取消作废") {
      setPendingAction(actionLabel);
      setActiveModal("kb-op-confirm");
      return;
    }
    setActiveModal("kb-ops");
  };

  const confirmAction = () => closeModal();

  return (
    <div className="stack">
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left">
            <div className="filterbar-item">
              <div className="filterbar-label">关键词</div>
              <div className="filterbar-input"><input className="filterbar-control" placeholder="标题/关键词/分类" defaultValue="" /></div>
            </div>
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
              <div className="filterbar-label">发布状态</div>
              <div className="filterbar-input">
                <select className="filterbar-control" defaultValue="全部">
                  <option value="全部">全部</option>
                  <option value="草稿">草稿</option>
                  <option value="发布中">发布中</option>
                  <option value="已作废">已作废</option>
                </select>
              </div>
            </div>
          </div>
          <div className="filterbar-actions">
            <button type="button" className="btn btn-primary">查询</button>
            <button type="button" className="btn">重置</button>
            <button type="button" className="btn btn-primary" onClick={() => setActiveModal("kb-add")}>新增</button>
            <button type="button" className="btn">导出</button>
          </div>
        </div>
      </div>

      <Card title="条目列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th>
                <th>标题</th>
                <th>分类</th>
                <th>下载量</th>
                <th>状态</th>
                <th>更新时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={`${row.id}-${row.order}`}>
                  <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                  <td>{row.order}</td>
                  <td>
                    <button type="button" className="table-link-btn" onClick={() => openDetailByRow(row, row.order)}>
                      {row.title}
                    </button>
                  </td>
                  <td>{row.category}</td>
                  <td>{row.downloadCount}</td>
                  <td>{row.status}</td>
                  <td>{row.updateDate}</td>
                  <td>
                    <div className="table-op-inline">
                      <button type="button" className="table-link-btn" onClick={() => openOpsByRow(row, row.order, "编辑")}>编辑</button>
                      {row.status === "已作废" ? (
                        <button type="button" className="table-link-btn" onClick={() => openOpsByRow(row, row.order, "取消作废")}>取消作废</button>
                      ) : (
                        <>
                          <button type="button" className="table-link-btn" onClick={() => openOpsByRow(row, row.order, "发布")}>发布</button>
                          <button type="button" className="table-link-btn table-link-danger" onClick={() => openOpsByRow(row, row.order, "作废")}>作废</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {activeModal === "kb-op-confirm" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">{pendingAction === "发布" ? "确认发布" : pendingAction === "取消作废" ? "确认取消作废" : "确认作废"}</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              <div>
                {pendingAction === "发布"
                  ? "确认发布该条目？"
                  : pendingAction === "取消作废"
                    ? "确认取消作废该条目？"
                    : "确认作废该条目？"}
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>取消</button>
              <button type="button" className="btn btn-primary" onClick={confirmAction}>{pendingAction === "发布" ? "确认发布" : pendingAction === "取消作废" ? "确认取消作废" : "确认作废"}</button>
            </div>
          </div>
        </div>
      ) : null}

      {activeModal === "kb-ops" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">编辑条目</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-section-title">条目信息</div>
                <div className="cert-form-grid plan-form-two-col">
                  <div className="cert-field-item">
                    <div className="cert-field-label">条目ID：</div>
                    <div className="cert-field-value"><input className="cert-field-control" value={currentRow.id} readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>状态：</div>
                    <div className="cert-field-value">
                      <select className="cert-field-control" defaultValue={currentRow.status}>
                        <option value="草稿">草稿</option>
                        <option value="发布中">发布中</option>
                        <option value="已作废">已作废</option>
                      </select>
                    </div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label"><span className="required-mark">*</span>条目标题：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue={currentRow.title} /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>分类：</div>
                    <div className="cert-field-value">
                      <select className="cert-field-control" defaultValue={currentRow.category}>
                        <option value="风险隐患清单">风险隐患清单</option>
                        <option value="事故事件案例">事故事件案例</option>
                        <option value="应急预案">应急预案</option>
                        <option value="防灾减灾知识">防灾减灾知识</option>
                      </select>
                    </div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">下载量：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue={String(currentRow.downloadCount)} /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">标签：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue={currentRow.tags} /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">适用岗位：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue={currentRow.positions} /></div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label"><span className="required-mark">*</span>附件：</div>
                    <div className="cert-field-value">
                      <div className="table-op-inline">
                        <button type="button" className="btn">选择文件</button>
                        <input className="cert-field-control" value={currentRow.attachmentName} readOnly />
                      </div>
                    </div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label"><span className="required-mark">*</span>内容摘要：</div>
                    <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" rows={4} defaultValue={currentRow.summary} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>取消</button>
              <button type="button" className="btn btn-primary" onClick={closeModal}>保存</button>
            </div>
          </div>
        </div>
      ) : null}

      {activeModal === "kb-add" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">新增条目</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-section-title">条目信息</div>
                <div className="cert-form-grid plan-form-two-col">
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label"><span className="required-mark">*</span>条目标题：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="请输入条目标题" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>分类：</div>
                    <div className="cert-field-value">
                      <select className="cert-field-control" defaultValue="风险隐患清单">
                        <option value="风险隐患清单">风险隐患清单</option>
                        <option value="事故事件案例">事故事件案例</option>
                        <option value="应急预案">应急预案</option>
                        <option value="防灾减灾知识">防灾减灾知识</option>
                      </select>
                    </div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>状态：</div>
                    <div className="cert-field-value">
                      <select className="cert-field-control" defaultValue="草稿">
                        <option value="草稿">草稿</option>
                        <option value="发布中">发布中</option>
                        <option value="已作废">已作废</option>
                      </select>
                    </div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">标签：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="例如：隐患排查/清单/闭环" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">适用岗位：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="例如：安全员/班组长/管理人员" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">下载量：</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="0" placeholder="请输入数字" /></div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label"><span className="required-mark">*</span>附件：</div>
                    <div className="cert-field-value">
                      <div className="table-op-inline">
                        <button type="button" className="btn">选择文件</button>
                        <input className="cert-field-control" value="未选择任何文件" readOnly />
                      </div>
                    </div>
                  </div>
                  <div className="cert-field-item cert-field-item-wide">
                    <div className="cert-field-label"><span className="required-mark">*</span>内容摘要：</div>
                    <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" rows={4} defaultValue="" placeholder="请输入内容摘要" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>取消</button>
              <button type="button" className="btn btn-primary" onClick={closeModal}>保存</button>
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
                    <div className="cert-field-label">附件名：</div>
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
