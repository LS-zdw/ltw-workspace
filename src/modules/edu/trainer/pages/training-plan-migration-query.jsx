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
        <div className="filterbar-label">培训班名称</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入关键字" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">年度</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">企业名称</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="安徽石油">安徽石油</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">计划分类</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="年度计划">年度计划</option><option value="临时计划">临时计划</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训级别</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="基层单位级">基层单位级</option><option value="企业级">企业级</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">培训类别</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="在岗">在岗</option><option value="脱产">脱产</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">主办单位</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入主办单位" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">实施状态</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
          <option value="全部">全部</option><option value="已实施">已实施</option><option value="未实施">未实施</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">登记时间</div>
        <div className="filterbar-input"><div className="filterbar-range">
          <input type="text" className="filterbar-control" defaultValue="2026-02-01" />
          <span className="filterbar-range-sep">-</span>
          <input type="text" className="filterbar-control" defaultValue="2026-02-25" />
        </div></div>
      </div></div>
          <div className="filterbar-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">导出</button></div>
        </div>
      </div>

      <Card title="教育培训-培训计划-迁移数据列表" desc="">
        <div className="table-wrap">
          <table className="proto-table">
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>年度</th><th>企业名称</th><th>培训班名称</th><th>计划举办期数</th><th>实际举办期数</th><th>是否外部培训</th><th>计划分类</th><th>专业类别</th><th>培训级别</th><th>培训类别</th><th>计划开班月份</th><th>主办单位</th><th>计划培训学时</th><th>计划培训人数</th><th>计划培训机构</th><th>是否取证</th><th>实施状态</th><th>登记部门</th><th>登记人</th><th>登记时间</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>加油作业、充电作业、卸油作业、洗车机设备培训</button></td><td>1</td><td>0</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>紫华西路油气站</td><td>2.0</td><td>9</td><td></td><td>否</td><td>未实施</td><td>紫华西路油气站</td><td>何群</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>2026年2月厅南加油站综合培训</button></td><td>1</td><td>1</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>厅南加油站</td><td>2.0</td><td>2</td><td></td><td>否</td><td>已实施</td><td>厅南加油站</td><td>陈羽</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>加油作业、充电作业、卸油作业、洗车机设备培训</button></td><td>1</td><td>0</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>紫华西路油气站</td><td>2.0</td><td>9</td><td></td><td>否</td><td>未实施</td><td>紫华西路油气站</td><td>何群</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>2026年2月厅南加油站综合培训</button></td><td>1</td><td>1</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>厅南加油站</td><td>2.0</td><td>2</td><td></td><td>否</td><td>已实施</td><td>厅南加油站</td><td>陈羽</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>加油作业、充电作业、卸油作业、洗车机设备培训</button></td><td>1</td><td>0</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>紫华西路油气站</td><td>2.0</td><td>9</td><td></td><td>否</td><td>未实施</td><td>紫华西路油气站</td><td>何群</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>2026年2月厅南加油站综合培训</button></td><td>1</td><td>1</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>厅南加油站</td><td>2.0</td><td>2</td><td></td><td>否</td><td>已实施</td><td>厅南加油站</td><td>陈羽</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>加油作业、充电作业、卸油作业、洗车机设备培训</button></td><td>1</td><td>0</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>紫华西路油气站</td><td>2.0</td><td>9</td><td></td><td>否</td><td>未实施</td><td>紫华西路油气站</td><td>何群</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>2026年2月厅南加油站综合培训</button></td><td>1</td><td>1</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>厅南加油站</td><td>2.0</td><td>2</td><td></td><td>否</td><td>已实施</td><td>厅南加油站</td><td>陈羽</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>加油作业、充电作业、卸油作业、洗车机设备培训</button></td><td>1</td><td>0</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>紫华西路油气站</td><td>2.0</td><td>9</td><td></td><td>否</td><td>未实施</td><td>紫华西路油气站</td><td>何群</td><td>2026-02-25</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>2026</td><td>安徽石油</td><td><button type="button" className="table-link-btn" onClick={(e) => { if ((e.currentTarget.closest("tr")?.rowIndex || 0) === 1) openModal("drill-detail", ""); }}>2026年2月厅南加油站综合培训</button></td><td>1</td><td>1</td><td>否</td><td>年度计划</td><td></td><td>基层单位级</td><td>在岗</td><td>2026-02</td><td>厅南加油站</td><td>2.0</td><td>2</td><td></td><td>否</td><td>已实施</td><td>厅南加油站</td><td>陈羽</td><td>2026-02-25</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
      {activeModal === "drill-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">教育培训-培训计划-迁移数据详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>返回</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">培训计划录入</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">年度:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="2026">
      <option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">企业名称:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="安徽石油">
      <option value="安徽石油">安徽石油</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训班名称:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2026年2月厅南加油站综合培训" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">计划举办期数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="1" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">实际举办期数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="1" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">是否外部培训:</div>
        <div className="cert-field-value"><div className="cert-radio-group">
      
      <label className="cert-radio-item">
        <input type="radio" name="是否外部培训"  />
        <span>是</span>
      </label>
      <label className="cert-radio-item">
        <input type="radio" name="是否外部培训" defaultChecked />
        <span>否</span>
      </label>
    </div></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">计划分类:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="年度计划">
      <option value="年度计划">年度计划</option><option value="临时计划">临时计划</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">专业类别:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="请选择...">
      <option value="请选择...">请选择...</option><option value="安全管理">安全管理</option><option value="设备管理">设备管理</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训级别:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="基层单位级">
      <option value="基层单位级">基层单位级</option><option value="企业级">企业级</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">培训类别:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="在岗">
      <option value="在岗">在岗</option><option value="脱产">脱产</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">计划开班月份:</div>
        <div className="cert-field-value"><input type="text" className="cert-field-control" defaultValue="2026-02-01" placeholder="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">主办单位:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="紫华西路油气站" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">计划培训学时:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2.0" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">计划培训人数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">计划培训机构:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">是否取证:</div>
        <div className="cert-field-value"><div className="cert-radio-group">
      
      <label className="cert-radio-item">
        <input type="radio" name="是否取证"  />
        <span>是</span>
      </label>
      <label className="cert-radio-item">
        <input type="radio" name="是否取证" defaultChecked />
        <span>否</span>
      </label>
    </div></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">实施状态:</div>
        <div className="cert-field-value"><select className="cert-field-control" defaultValue="已实施">
      <option value="已实施">已实施</option><option value="未实施">未实施</option>
    </select></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">登记部门:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="厅南加油站" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">登记人:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="陈羽" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">登记时间:</div>
        <div className="cert-field-value"><input type="text" className="cert-field-control" defaultValue="2026-02-25" placeholder="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">备注:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">附件:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea cert-field-textarea-large" placeholder="" defaultValue="" /></div>
      </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      ) : null}
  
    </div>
  );
}
