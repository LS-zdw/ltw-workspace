import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "/src/components/ui/Card.jsx";

export default function Page() {
  const navigate = useNavigate();
  const projectName = new URLSearchParams(window.location.search).get("project");
  const [activeModal, setActiveModal] = React.useState(null);
  const [drillTarget, setDrillTarget] = React.useState("");
  const [drillProject, setDrillProject] = React.useState(projectName || "");
  const [modalStates, setModalStates] = React.useState({});
  const resolveDynamic = (value) => String(value || "").replace(/\{\{project\}\}/g, drillProject || projectName || "");
  const modalFormState = modalStates[activeModal] || {};
  const setModalField = (key, value) => {
    setModalFields({ [key]: value });
  };
  const setModalFields = (patch) => {
    setModalStates((prev) => ({
      ...prev,
      [activeModal]: { ...(prev[activeModal] || {}), ...(patch || {}) }
    }));
  };
  const isVisible = (showWhen) => {
    if (!showWhen) return true;
    return Object.entries(showWhen).every(([k, v]) => (modalFormState[k] || "") === String(v));
  };
  const openModal = (id, target = "") => {
    setDrillTarget(target);
    try {
      const q = target.includes("?") ? target.split("?")[1] : "";
      const p = new URLSearchParams(q).get("project");
      if (p) setDrillProject(p);
    } catch {
      // ignore parse errors
    }
    const initialByModal = {};
    if (initialByModal[id]) {
      setModalStates((prev) => ({ ...prev, [id]: initialByModal[id] }));
    }
    setActiveModal(id);
  };
  const closeModal = () => setActiveModal(null);
  const goto = (target) => {
    closeModal();
    if (navigate) navigate(target || drillTarget || "/");
  };

  return (
    <div className="stack">
      
      <div className="filterbar">
        <div className="filterbar-row">
          <div className="filterbar-left"><div className="filterbar-item">
        <div className="filterbar-label">项目级别</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">项目类型</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">项目名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入项目名称" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">所属板块</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入所属板块" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">项目状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="选项1">选项1</option><option value="选项2">选项2</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">是否重点工程建设项目</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入是否重点工程建设项目" defaultValue="" /></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="竣工验收台账" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>所属企业</th><th>项目名称</th><th>项目级别</th><th>安全三同时阶段</th><th>安全评价单位</th><th>验收评价单位</th><th>安全竣工验收日期</th><th>项目状态</th><th>登记人</th><th>登记时间</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目（集团公司级）</td><td>竣工验收阶段</td><td>国家石化项目风险评估中心</td><td>验收评价单位A</td><td>2026-02-01</td><td>已验收</td><td>张明</td><td>2026-02-01</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>办理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>九江石化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>204泊位苯水路出厂项目</button></td><td>二类项目（事业部级）</td><td>竣工验收阶段</td><td>河南鑫利安全科技股份有限公司</td><td>验收评价单位B</td><td>2026-01-29</td><td>已完成</td><td>张晓明</td><td>2026-01-30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目（集团公司级）</td><td>竣工验收阶段</td><td>国家石化项目风险评估中心</td><td>验收评价单位A</td><td>2026-02-01</td><td>已验收</td><td>张明</td><td>2026-02-01</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>办理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>九江石化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>204泊位苯水路出厂项目</button></td><td>二类项目（事业部级）</td><td>竣工验收阶段</td><td>河南鑫利安全科技股份有限公司</td><td>验收评价单位B</td><td>2026-01-29</td><td>已完成</td><td>张晓明</td><td>2026-01-30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目（集团公司级）</td><td>竣工验收阶段</td><td>国家石化项目风险评估中心</td><td>验收评价单位A</td><td>2026-02-01</td><td>已验收</td><td>张明</td><td>2026-02-01</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>办理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>九江石化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>204泊位苯水路出厂项目</button></td><td>二类项目（事业部级）</td><td>竣工验收阶段</td><td>河南鑫利安全科技股份有限公司</td><td>验收评价单位B</td><td>2026-01-29</td><td>已完成</td><td>张晓明</td><td>2026-01-30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目（集团公司级）</td><td>竣工验收阶段</td><td>国家石化项目风险评估中心</td><td>验收评价单位A</td><td>2026-02-01</td><td>已验收</td><td>张明</td><td>2026-02-01</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>办理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>九江石化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>204泊位苯水路出厂项目</button></td><td>二类项目（事业部级）</td><td>竣工验收阶段</td><td>河南鑫利安全科技股份有限公司</td><td>验收评价单位B</td><td>2026-01-29</td><td>已完成</td><td>张晓明</td><td>2026-01-30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目（集团公司级）</td><td>竣工验收阶段</td><td>国家石化项目风险评估中心</td><td>验收评价单位A</td><td>2026-02-01</td><td>已验收</td><td>张明</td><td>2026-02-01</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>办理</button></td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>九江石化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>204泊位苯水路出厂项目</button></td><td>二类项目（事业部级）</td><td>竣工验收阶段</td><td>河南鑫利安全科技股份有限公司</td><td>验收评价单位B</td><td>2026-01-29</td><td>已完成</td><td>张晓明</td><td>2026-01-30</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=204泊位苯水路出厂项目")}>查看</button></td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="说明" desc="验收意见信息中字段由本系统手动输入；需上传文件字段单个文件大小不超过500M，支持常见办公及压缩格式。">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">验收意见信息中字段由本系统手动输入；需上传文件字段单个文件大小不超过500M，支持常见办公及压缩格式。</div>
        </div>
      </Card>
      
      {activeModal === "project-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">竣工验收阶段项目详情</div>
                <div className="modal-desc">对应原型项目详情弹窗</div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>

            <div className="modal-bd detail">
              <div className="detail-section">
                <div className="detail-section-title">项目基本信息</div>
                <div className="detail-meta-grid">
                  
          <div className="detail-meta-item">
            <div className="detail-meta-key">所属企业</div>
            <div className="detail-meta-val">{resolveDynamic("海南炼化")}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-key">项目名称</div>
            <div className="detail-meta-val">{resolveDynamic("{{project}}")}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-key">项目编码</div>
            <div className="detail-meta-val">{resolveDynamic("H20018")}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-key">项目建设单位</div>
            <div className="detail-meta-val">{resolveDynamic("海南巴陵化工新材料有限公司")}</div>
          </div>
                </div>
              </div>

              <div className="detail-section">
                <div className="detail-section-title">项目建设信息</div>
                <div className="detail-meta-grid">
                  
          <div className="detail-meta-item">
            <div className="detail-meta-key">所属板块</div>
            <div className="detail-meta-val">{resolveDynamic("炼化板块")}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-key">项目级别</div>
            <div className="detail-meta-val">{resolveDynamic("一类项目（集团公司级）")}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-key">项目状态</div>
            <div className="detail-meta-val">{resolveDynamic("已验收")}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-key">项目创建日期</div>
            <div className="detail-meta-val">{resolveDynamic("2024年2月1日")}</div>
          </div>
                </div>
              </div>

              <div className="detail-stages">
                
                <div className="detail-stage ">
                  <span className="detail-stage-dot"></span>
                  <span>可研阶段</span>
                </div>
                <div className="detail-stage ">
                  <span className="detail-stage-dot"></span>
                  <span>基础设计阶段</span>
                </div>
                <div className="detail-stage ">
                  <span className="detail-stage-dot"></span>
                  <span>试运行阶段</span>
                </div>
                <div className="detail-stage active">
                  <span className="detail-stage-dot"></span>
                  <span>竣工验收阶段</span>
                </div>
              </div>

              

              
              <div className="detail-section">
                <div className="detail-section-title">竣工验收基本信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">竣工验收申请时间</div>
                <div className="detail-form-val">{resolveDynamic("选择时间")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">竣工验收时间</div>
                <div className="detail-form-val">{resolveDynamic("选择时间")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">验收评价单位</div>
                <div className="detail-form-val">{resolveDynamic("将输入审查单位")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">竣工验收审查意见书</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
                </div>
                
              </div>
              <div className="detail-section">
                <div className="detail-section-title">验收申请信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">安全设施竣工验收申请</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">建设项目安全设施施工情况报告</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">建设项目安全设施变更报告</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">建设项目安全设施监理报告</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">建设项目安全验收评价报告</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">建设项目安全验收评价报告（终稿）</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
                </div>
                
              </div>
              <div className="detail-section">
                <div className="detail-section-title">验收意见信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">专家评审及竣工验收意见</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">验收组名单</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">安全评价验收评价报告修改说明</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">危险化学品重大危险源备案证明文件</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
                </div>
                
                <div className="detail-form-actions">
                  <button type="button" className="btn btn-primary">保存</button><button type="button" className="btn btn-primary" onClick={() => openModal("confirm-submit", drillTarget)}>提交</button>
                </div>
              </div>
            </div>

            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>
              关闭
            </button>
<button type="button" className="btn btn-primary" onClick={() => openModal("confirm-submit", drillTarget)}>
              提交并确认
            </button>
<button type="button" className="btn btn-primary" onClick={() => goto(drillTarget)}>
              进入任务详情
            </button>
            </div>
          </div>
        </div>
      ) : null}
  

      {activeModal === "confirm-submit" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">确认提交</div>
                <div className="modal-desc"></div>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>x</button>
            </div>
            <div className="modal-bd">
              
              
              <div className="pill">
                <div className="k">说明</div>
                <div className="v">确认后将提交竣工验收阶段资料。</div>
              </div>
            </div>
            <div className="modal-ft">
              <button type="button" className="btn" onClick={closeModal}>
              取消
            </button>
<button type="button" className="btn btn-primary" onClick={() => goto(drillTarget)}>
              确认提交
            </button>
            </div>
          </div>
        </div>
      ) : null}
  
    </div>
  );
}
