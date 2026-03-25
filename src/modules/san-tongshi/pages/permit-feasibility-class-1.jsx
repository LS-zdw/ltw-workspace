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
    const initialByModal = {"project-detail":{"service":"是","gov":"是"}};
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

      <Card title="可研阶段台账" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>所属企业</th><th>项目名称</th><th>项目级别</th><th>安全三同时阶段</th><th>安全评价单位</th><th>设计单位</th><th>项目状态</th><th>登记人</th><th>登记时间</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>海南炼化</td><td><button type="button" className="table-link-btn" onClick={() => openModal("project-detail", "/san-tongshi/task-detail?project=17万吨SBC项目")}>17万吨SBC项目</button></td><td>一类项目</td><td>可研阶段</td><td>中石化安研院</td><td>SEI</td><td>待批复</td><td>张三</td><td>2026-01-15</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="说明" desc="时间字段统一 yyyy-MM-dd，附件支持 office/pdf/压缩包等（演示约束）">
        
        <div className="pill">
          <div className="k">说明</div>
          <div className="v">时间字段统一 yyyy-MM-dd，附件支持 office/pdf/压缩包等（演示约束）</div>
        </div>
      </Card>
      
      {activeModal === "project-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">一类项目可研阶段项目详情</div>
                <div className="modal-desc">对应原型中的“项目详情”动态面板</div>
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
            <div className="detail-meta-key">项目编号</div>
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
            <div className="detail-meta-val">{resolveDynamic("已创建")}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-key">项目创建日期</div>
            <div className="detail-meta-val">{resolveDynamic("2024年2月1日")}</div>
          </div>
                </div>
              </div>

              <div className="detail-stages">
                
                <div className="detail-stage active">
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
                <div className="detail-stage ">
                  <span className="detail-stage-dot"></span>
                  <span>竣工验收阶段</span>
                </div>
              </div>

              
              <div className="detail-section">
                <div className="detail-section-title">条件设置</div>
                <div className="detail-toggle-grid">
                  
              <div className="detail-toggle-item">
                <div className="detail-form-key">是否《建设项目安全设施“三同时”监督管理办法》第七条规定的建设项目</div>
                <div className="detail-toggle-opts">
                  
                  <label className="detail-radio">
                    <input
                      type="radio"
                      name="project-detail-service"
                      checked={(modalFormState["service"] || "是") === "是"}
                      onChange={() => setModalFields({ "service": "是", "gov": "是" })}
                    />
                    <span>是</span>
                  </label>
                  <label className="detail-radio">
                    <input
                      type="radio"
                      name="project-detail-service"
                      checked={(modalFormState["service"] || "是") === "否"}
                      onChange={() => setModalFields({ "service": "否", "gov": "否" })}
                    />
                    <span>否</span>
                  </label>
                </div>
              </div>
              <div className="detail-toggle-item">
                <div className="detail-form-key">是否政府审批</div>
                <div className="detail-toggle-opts">
                  
                  <label className="detail-radio">
                    <input
                      type="radio"
                      name="project-detail-gov"
                      checked={(modalFormState["gov"] || "是") === "是"}
                      onChange={() => setModalFields({ "gov": "是", "service": "是" })}
                    />
                    <span>是</span>
                  </label>
                  <label className="detail-radio">
                    <input
                      type="radio"
                      name="project-detail-gov"
                      checked={(modalFormState["gov"] || "是") === "否"}
                      onChange={() => setModalFields({ "gov": "否", "service": "否" })}
                    />
                    <span>否</span>
                  </label>
                </div>
              </div>
                </div>
              </div>

              
              <div className="detail-section">
                <div className="detail-section-title">可研基本信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">可研上报时间</div>
                <div className="detail-form-val">{resolveDynamic("选择时间")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">可研上报文号</div>
                <div className="detail-form-val">{resolveDynamic("请输入内容")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">可研批复时间</div>
                <div className="detail-form-val">{resolveDynamic("选择时间")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">可研批复文号</div>
                <div className="detail-form-val">{resolveDynamic("请输入内容")}</div>
              </div>
                </div>
                
              </div>
              <div className="detail-section">
                <div className="detail-section-title">专项论证信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">专项论证名称</div>
                <div className="detail-form-val">{resolveDynamic("请输入内容")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">主办部门</div>
                <div className="detail-form-val">{resolveDynamic("请输入内容")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">论证截止日期</div>
                <div className="detail-form-val">{resolveDynamic("请选择时间")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">评估完成日期</div>
                <div className="detail-form-val">{resolveDynamic("请选择时间")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">论证状态</div>
                <div className="detail-form-val">{resolveDynamic("待论证/论证中/已论证")}</div>
              </div>
                </div>
                
              </div>{isVisible({"service":"是"}) ? (
              <div className="detail-section">
                <div className="detail-section-title">安全评价信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">工艺是否国内首次使用</div>
                <div className="detail-form-val">{resolveDynamic("是/否")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">安全可靠性论证意见</div>
                <div className="detail-form-val">{resolveDynamic("点击上传（省级有关部门论证）")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">安全评价单位</div>
                <div className="detail-form-val">{resolveDynamic("请输入评价单位")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">安全评价报告预审稿</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">审查专家组签名表</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">专家评审意见及个人意见</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">专家组评审意见的修改说明</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
                </div>
                
                <div className="detail-form-actions">
                  <button type="button" className="btn btn-primary">保存</button><button type="button" className="btn btn-primary" onClick={() => openModal("confirm-submit", drillTarget)}>提交</button>
                </div>
              </div>) : null}{isVisible({"service":"否"}) ? (
              <div className="detail-section">
                <div className="detail-section-title">内审信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">无需办理安全行政许可书面情况说明</div>
                <div className="detail-form-val">{resolveDynamic("点击上传（需要企业盖章）")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">安全生产条件和设施综合分析报告</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
                </div>
                
                <div className="detail-form-actions">
                  <button type="button" className="btn btn-primary">保存</button><button type="button" className="btn btn-primary" onClick={() => openModal("confirm-submit", drillTarget)}>提交</button>
                </div>
              </div>) : null}{isVisible({"gov":"是"}) ? (
              <div className="detail-section">
                <div className="detail-section-title">政府审批信息</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">安全评价报告终稿</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">政府批复时间</div>
                <div className="detail-form-val">{resolveDynamic("选择时间")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">政府批复（备案）文件</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
              <div className="detail-form-item">
                <div className="detail-form-key">其他附件</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
                </div>
                
                <div className="detail-form-actions">
                  <button type="button" className="btn btn-primary">保存</button><button type="button" className="btn btn-primary" onClick={() => openModal("confirm-submit", drillTarget)}>提交</button>
                </div>
              </div>) : null}{isVisible({"gov":"否"}) ? (
              <div className="detail-section">
                <div className="detail-section-title">非政府审批字段</div>
                <div className="detail-form-grid">
                  
              <div className="detail-form-item">
                <div className="detail-form-key">原因</div>
                <div className="detail-form-val">{resolveDynamic("点击上传")}</div>
              </div>
                </div>
                
                <div className="detail-form-actions">
                  <button type="button" className="btn btn-primary">保存</button><button type="button" className="btn btn-primary" onClick={() => openModal("confirm-submit", drillTarget)}>提交</button>
                </div>
              </div>) : null}
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
                <div className="v">确认后将提交可研阶段行政许可信息。</div>
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
