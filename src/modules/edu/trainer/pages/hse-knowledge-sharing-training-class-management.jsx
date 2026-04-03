import React from "react";

const TAB_LIST = ["策划", "报名", "报到", "签到", "在线学习", "考试", "培训评价", "课程评价", "档案", "补考", "讨论区", "评审"];

const LIST_ROWS = [
  { id: 1, name: "2026年企业安全培训师资训班", type: "线下", category: "安全培训管理专项培训", session: "2026年度-第2期", publish: "已发布", status: "进行中" },
  { id: 2, name: "2026年直属企业安全管理部门负责人培训班", type: "线下", category: "安全培训管理专项培训", session: "2026年度-第1期", publish: "已发布", status: "已结束" },
  { id: 3, name: "集团公司2025年第二期HSE关键岗位培训班", type: "线下", category: "关键岗位培训", session: "2025年度-第1期", publish: "已发布", status: "已结束" },
  { id: 4, name: "集团公司应急普法知识竞赛集训选拔班", type: "线上", category: "应急管理专项培训", session: "2025年度-第1期", publish: "已发布", status: "已结束" },
  { id: 5, name: "2025年HSE关键岗位人员考核取证班", type: "线上", category: "安全培训管理专项培训", session: "2025年度-第6期", publish: "已发布", status: "已结束" },
  { id: 6, name: "2025年HSE关键岗位人员考核取证班（科研）", type: "线上", category: "安全培训管理专项培训", session: "2025年度-第7期", publish: "已发布", status: "已结束" },
  { id: 7, name: "持续提升员工健康管理", type: "线下", category: "关键岗位培训", session: "2025年度-第8期", publish: "已发布", status: "已结束" },
  { id: 8, name: "直接作业安全管理探讨", type: "线下", category: "关键岗位培训", session: "2025年度-第9期", publish: "已发布", status: "已结束" },
  { id: 9, name: "作业安全分析", type: "线下", category: "关键岗位培训", session: "2025年度-第10期", publish: "已发布", status: "已结束" },
  { id: 10, name: "过程安全管理与安全领导力-2026", type: "线下", category: "关键岗位培训", session: "2025年度-第11期", publish: "已发布", status: "已结束" }
];

const COURSE_ROWS = [
  { id: 1, name: "持续提升员工健康管理", type: "线下", teacher: "陈俊", hours: "4", examFlag: "未添加" },
  { id: 2, name: "直接作业安全管理探讨", type: "线下", teacher: "姜秀峰", hours: "4", examFlag: "未添加" },
  { id: 3, name: "作业安全分析", type: "线下", teacher: "丁晓刚", hours: "4", examFlag: "未添加" },
  { id: 4, name: "过程安全管理与安全领导力-2026", type: "线下", teacher: "王浩水", hours: "4", examFlag: "未添加" },
  { id: 5, name: "筑牢生态防线 践行绿色发展-2026", type: "线下", teacher: "刘春平", hours: "4", examFlag: "未添加" },
  { id: 6, name: "双重预防工作机制及重点工作相关", type: "线下", teacher: "况成承", hours: "4", examFlag: "未添加" },
  { id: 7, name: "如何正确理解危化法规通用规范", type: "线下", teacher: "郝军", hours: "4", examFlag: "未添加" },
  { id: 8, name: "HAZOP及Bow-tie分析方法介绍", type: "线下", teacher: "赵焕省", hours: "4", examFlag: "未添加" }
];

function Field({ label, required, children }) {
  return (
    <div className="hse-ksp-field-item">
      <div className="hse-ksp-field-label">
        {required ? <span className="required-mark">*</span> : null}
        {label}:
      </div>
      <div className="hse-ksp-field-value">{children}</div>
    </div>
  );
}

export default function Page() {
  const [view, setView] = React.useState("list");

  return (
    <div className="hse-ksp-shell">
      <div className="hse-ksp-topbar">
        <div className="hse-ksp-topbar-left">
          <span>中国石化健康安全环保知识共享平台</span>
          <span className="hse-ksp-menu-toggle">☰</span>
        </div>
        <div className="hse-ksp-topbar-right">
          <span>进入学员端</span>
          <span className="hse-ksp-avatar" />
          <span>欢迎您，吕庭玮【智能制造事业部】</span>
          <span>◌ 退出登录</span>
        </div>
      </div>

      <div className="hse-ksp-body">
        <aside className="hse-ksp-rail">
          <button type="button" className="hse-ksp-rail-item">⌂</button>
          <button type="button" className="hse-ksp-rail-item">☰</button>
          <button type="button" className="hse-ksp-rail-item active">⚯</button>
          <button type="button" className="hse-ksp-rail-item">⋯</button>
          <button type="button" className="hse-ksp-rail-item">◫</button>
          <button type="button" className="hse-ksp-rail-item">▦</button>
          <button type="button" className="hse-ksp-rail-item">⊟</button>
          <button type="button" className="hse-ksp-rail-item">⎋</button>
        </aside>

        <main className="hse-ksp-main">
          <div className="hse-ksp-main-tabs">
            <button type="button" className="hse-ksp-main-tab">首页</button>
            <button type="button" className="hse-ksp-main-tab">首页</button>
            <button type="button" className="hse-ksp-main-tab">培训档案查询</button>
            <button type="button" className="hse-ksp-main-tab active">培训班管理</button>
          </div>

          <div className="hse-ksp-page-surface">
            {view === "list" ? (
              <div className="hse-ksp-list-view">
                <div className="hse-ksp-query-row">
                  <div className="hse-ksp-query-item">
                    <span>培训名称:</span>
                    <input className="hse-ksp-input" placeholder="请输入培训名称查询" defaultValue="" />
                  </div>
                  <div className="hse-ksp-query-item">
                    <span>培训类别:</span>
                    <select className="hse-ksp-input" defaultValue="请选择培训类别">
                      <option>请选择培训类别</option>
                      <option>线上</option>
                      <option>线下</option>
                    </select>
                  </div>
                  <div className="hse-ksp-query-item">
                    <span>培训分类:</span>
                    <select className="hse-ksp-input" defaultValue="请选择培训分类">
                      <option>请选择培训分类</option>
                      <option>安全培训管理专项培训</option>
                      <option>关键岗位培训</option>
                      <option>应急管理专项培训</option>
                    </select>
                  </div>
                  <button type="button" className="btn btn-primary hse-ksp-btn-search">⌕ 搜索</button>
                </div>

                <div className="hse-ksp-action-row">
                  <button type="button" className="btn btn-primary" onClick={() => setView("detail")}>新 增</button>
                  <button type="button" className="btn btn-primary">报到码</button>
                  <button type="button" className="btn btn-primary">培训码</button>
                </div>

                <div className="table-wrap hse-ksp-table-wrap">
                  <table className="proto-table hse-ksp-table">
                    <thead>
                      <tr>
                        <th className="table-checkbox"><input type="checkbox" readOnly /></th>
                        <th>培训名称</th>
                        <th>培训类别</th>
                        <th>培训分类</th>
                        <th>期次</th>
                        <th>是否发布</th>
                        <th>状态</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LIST_ROWS.map((row, index) => (
                        <tr key={row.id} className={row.id === 4 ? "is-highlight" : ""}>
                          <td className="table-checkbox"><input type="checkbox" readOnly /></td>
                          <td>
                            <button type="button" className="table-link-btn" onClick={index === 0 ? () => setView("detail") : undefined}>
                              {row.name}
                            </button>
                          </td>
                          <td>{row.type}</td>
                          <td>{row.category}</td>
                          <td>{row.session}</td>
                          <td>{row.publish}</td>
                          <td>{row.status}</td>
                          <td>
                            <div className="hse-ksp-op-wrap">
                              <button type="button" className="table-link-btn">编辑</button>
                              <button type="button" className="table-link-btn">取消发布</button>
                              <button type="button" className="table-link-btn hse-ksp-op-danger">删除</button>
                              <button type="button" className="table-link-btn">复制</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="hse-ksp-detail-view">
                <div className="hse-ksp-subtabs-row">
                  <div className="hse-ksp-subtabs">
                    {TAB_LIST.map((tab, idx) => (
                      <button key={tab} type="button" className={`hse-ksp-subtab${idx === 0 ? " active" : ""}`}>{tab}</button>
                    ))}
                  </div>
                  <button type="button" className="hse-ksp-close" onClick={() => setView("list")}>×</button>
                </div>

                <div className="hse-ksp-cover-row">
                  <div className="hse-ksp-cover-label">封面图:</div>
                  <div className="hse-ksp-cover-preview">
                    <div className="hse-ksp-cover-text">2026年直属企业安全管理部门负责人培训班</div>
                    <div className="hse-ksp-cover-image" />
                  </div>
                </div>

                <div className="hse-ksp-form-grid">
                  <Field label="培训名称" required>
                    <input className="hse-ksp-input" defaultValue="2026年直属企业安全管理部门负责人培训班" readOnly />
                  </Field>
                  <Field label="培训计划">
                    <div className="hse-ksp-input-icon-wrap">
                      <input className="hse-ksp-input" defaultValue="请选择培训计划" readOnly />
                      <span className="hse-ksp-icon">⌕</span>
                    </div>
                  </Field>

                  <Field label="培训类别" required>
                    <select className="hse-ksp-input" defaultValue="线下" disabled><option>线下</option></select>
                  </Field>
                  <Field label="培训分类" required>
                    <select className="hse-ksp-input" defaultValue="安全培训管理专项培训" disabled><option>安全培训管理专项培训</option></select>
                  </Field>

                  <Field label="培训年度" required>
                    <input className="hse-ksp-input" defaultValue="2026" readOnly />
                  </Field>
                  <Field label="培训期次" required>
                    <input className="hse-ksp-input" defaultValue="1" readOnly />
                  </Field>

                  <Field label="初/复训" required>
                    <select className="hse-ksp-input" defaultValue="初训" disabled><option>初训</option></select>
                  </Field>
                  <Field label="培训人数" required>
                    <input className="hse-ksp-input" defaultValue="80" readOnly />
                  </Field>

                  <Field label="开始时间" required>
                    <div className="hse-ksp-input-icon-wrap"><input className="hse-ksp-input" defaultValue="2026-03-12" readOnly /><span className="hse-ksp-icon">◷</span></div>
                  </Field>
                  <Field label="结束时间" required>
                    <div className="hse-ksp-input-icon-wrap"><input className="hse-ksp-input" defaultValue="2026-03-28" readOnly /><span className="hse-ksp-icon">◷</span></div>
                  </Field>

                  <Field label="培训学时" required>
                    <input className="hse-ksp-input" defaultValue="80" readOnly />
                  </Field>
                  <Field label="获取积分" required>
                    <input className="hse-ksp-input" defaultValue="80" readOnly />
                  </Field>

                  <Field label="允许报名" required>
                    <select className="hse-ksp-input" defaultValue="否" disabled><option>否</option></select>
                  </Field>
                  <Field label="公开范围" required>
                    <select className="hse-ksp-input" defaultValue="全部可见" disabled><option>全部可见</option></select>
                  </Field>

                  <Field label="禁止拖动">
                    <select className="hse-ksp-input" defaultValue="关闭" disabled><option>关闭</option></select>
                  </Field>
                  <Field label="备注">
                    <div className="hse-ksp-tip">是否允许培训中的视频课件拖动进度条，如选择是则禁止拖动。</div>
                  </Field>

                  <Field label="培训评价模板" required>
                    <select className="hse-ksp-input" defaultValue="培训班评价" disabled><option>培训班评价</option></select>
                  </Field>
                  <Field label="培训课程评价" required>
                    <select className="hse-ksp-input" defaultValue="课程评价" disabled><option>课程评价</option></select>
                  </Field>

                  <Field label="证书模板111">
                    <select className="hse-ksp-input" defaultValue=""><option /></select>
                  </Field>
                  <Field label="有效期">
                    <div className="hse-ksp-input-icon-wrap"><input className="hse-ksp-input" defaultValue="请选择有效期" readOnly /><span className="hse-ksp-icon">◷</span></div>
                  </Field>

                  <Field label="班主任">
                    <input className="hse-ksp-input" defaultValue="" readOnly />
                  </Field>
                  <Field label="班主任电话">
                    <input className="hse-ksp-input" defaultValue="" readOnly />
                  </Field>

                  <div className="hse-ksp-field-item hse-ksp-field-item-wide">
                    <div className="hse-ksp-field-label"><span className="required-mark">*</span>培训通知附件:</div>
                    <div className="hse-ksp-field-value hse-ksp-attach-row">
                      <input className="hse-ksp-input" defaultValue="" readOnly />
                      <button type="button" className="btn btn-primary">查看</button>
                    </div>
                  </div>
                </div>

                <div className="hse-ksp-divider" />

                <div className="hse-ksp-table-block">
                  <div className="hse-ksp-table-title">培训描述:</div>
                </div>

                <div className="hse-ksp-table-block">
                  <div className="hse-ksp-table-title">培训方案:</div>
                  <div className="table-wrap hse-ksp-nested-wrap">
                    <table className="proto-table hse-ksp-nested-table">
                      <thead><tr><th>方案名称</th><th>上传时间</th><th>操作</th></tr></thead>
                      <tbody><tr><td>培训班封面.png</td><td>2026-03-12 10:43:18</td><td><button type="button" className="table-link-btn">查看</button></td></tr></tbody>
                    </table>
                  </div>
                </div>

                <div className="hse-ksp-table-block">
                  <div className="hse-ksp-table-title">培训课程:</div>
                  <div className="table-wrap hse-ksp-nested-wrap">
                    <table className="proto-table hse-ksp-nested-table">
                      <thead>
                        <tr>
                          <th>课程名称</th>
                          <th>课程类别</th>
                          <th>主讲老师</th>
                          <th>学时</th>
                          <th>是否添加试题</th>
                          <th>上课时间</th>
                          <th>上课地点</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {COURSE_ROWS.map((row) => (
                          <tr key={row.id}>
                            <td>{row.name}</td>
                            <td>{row.type}</td>
                            <td>{row.teacher}</td>
                            <td>{row.hours}</td>
                            <td>{row.examFlag}</td>
                            <td></td>
                            <td></td>
                            <td><button type="button" className="table-link-btn">查看</button><button type="button" className="table-link-btn hse-ksp-op-danger">删除</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="hse-ksp-table-block">
                  <div className="hse-ksp-table-title">考试计划:</div>
                  <div className="table-wrap hse-ksp-nested-wrap">
                    <table className="proto-table hse-ksp-nested-table">
                      <thead><tr><th>计划名称</th><th>考试类别</th><th>开始时间</th><th>结束时间</th><th>状态</th><th>操作</th></tr></thead>
                      <tbody><tr><td colSpan="6" className="hse-ksp-empty-cell">暂无数据</td></tr></tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
