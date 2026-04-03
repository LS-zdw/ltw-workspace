import React from "react";
import Card from "../../../components/ui/Card.jsx";

const ROWS = Array.from({ length: 10 }).map((_, idx) => {
  const num = idx + 1;
  const issued = num % 2 === 1 ? "是" : "否";
  return {
    id: `r-${num}`,
    seq: num,
    planName: "安全培训",
    className: "选择培训计划",
    planDays: 12,
    startDate: "2024-10-11",
    endDate: "2024-10-17",
    content: "对炼油一部的新员工进行岗前培训",
    hours: 8,
    totalCount: 20,
    passCount: 20,
    passRate: "100%",
    issueCert: issued
  };
});

export default function TestPage() {
  const [detail, setDetail] = React.useState(null);

  return (
    <div className="stack">
      <Card title="测试" desc="按模板生成：紧凑查询 + 右侧操作按钮 + 列表分页">
        <div className="filterbar">
          <div className="filterbar-row">
            <div className="filterbar-left">
              <div className="filterbar-item">
                <div className="filterbar-label">关键字</div>
                <div className="filterbar-input">
                  <input className="filterbar-control" placeholder="请输入关键字" />
                </div>
              </div>
              <div className="filterbar-item">
                <div className="filterbar-label">状态</div>
                <div className="filterbar-input">
                  <select className="filterbar-control" defaultValue="全部">
                    <option>全部</option>
                    <option>已完成</option>
                    <option>进行中</option>
                  </select>
                </div>
              </div>
              <div className="filterbar-item">
                <div className="filterbar-label">日期</div>
                <div className="filterbar-input">
                  <input className="filterbar-control" defaultValue="2024-10-11" />
                </div>
              </div>
            </div>
            <div className="filterbar-actions">
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
          </div>
          <div className="filterbar-row">
            <div className="filterbar-left" />
            <div className="filterbar-actions">
              <button type="button" className="btn">新增</button>
              <button type="button" className="btn">导出</button>
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                <th>序号</th>
                <th>培训计划名称</th>
                <th>培训班名称</th>
                <th>计划天数</th>
                <th>培训开始日期</th>
                <th>培训结束日期</th>
                <th>培训内容</th>
                <th>培训学时</th>
                <th>培训人员数量</th>
                <th>合格人数</th>
                <th>合格率</th>
                <th>是否发证</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => (
                <tr key={row.id}>
                  <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                  <td>{row.seq}</td>
                  <td>
                    <button
                      type="button"
                      className="table-link-btn"
                      onClick={() => {
                        if (idx === 0) setDetail(row);
                      }}
                    >
                      {row.planName}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="table-link-btn"
                      onClick={() => {
                        if (idx === 0) setDetail(row);
                      }}
                    >
                      {row.className}
                    </button>
                  </td>
                  <td>{row.planDays}</td>
                  <td>{row.startDate}</td>
                  <td>{row.endDate}</td>
                  <td>{row.content}</td>
                  <td>{row.hours}</td>
                  <td>{row.totalCount}</td>
                  <td>{row.passCount}</td>
                  <td>{row.passRate}</td>
                  <td>{row.issueCert}</td>
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
            <select className="stpm-main-page-size" defaultValue="10" aria-label="每页条数">
              <option value="10">10条/页</option>
            </select>
          </div>
        </div>
      </Card>

      {detail ? (
        <div className="modal-mask" onClick={() => setDetail(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">培训记录详情</div>
                <div className="modal-desc">{detail.planName} - {detail.className}</div>
              </div>
              <button type="button" className="modal-close" onClick={() => setDetail(null)}>x</button>
            </div>
            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-form-grid">
                  <div className="detail-form-item"><div className="detail-form-key">培训计划名称</div><div className="detail-form-val">{detail.planName}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">培训班名称</div><div className="detail-form-val">{detail.className}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">计划天数</div><div className="detail-form-val">{detail.planDays}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">培训开始日期</div><div className="detail-form-val">{detail.startDate}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">培训结束日期</div><div className="detail-form-val">{detail.endDate}</div></div>
                  <div className="detail-form-item"><div className="detail-form-key">培训内容</div><div className="detail-form-val">{detail.content}</div></div>
                </div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={() => setDetail(null)}>关闭</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
