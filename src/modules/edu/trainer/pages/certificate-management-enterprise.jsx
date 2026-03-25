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
  const handleMainTableDrillCapture = (e) => {
    const trigger = e.target.closest(".table-link-btn");
    if (!trigger) return;
    const row = trigger.closest("tbody tr");
    if (!row) return;
    const firstRow = e.currentTarget.querySelector("tbody tr");
    if (row !== firstRow) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const renderRowOps = (firstRow = false) => (
    <div className="table-op-inline">
      <button type="button" className="table-op-link table-op-link-edit" onClick={firstRow ? () => openModal("cert-edit", "") : undefined}>编辑</button>
      <button type="button" className="table-op-link table-op-link-delete">删除</button>
    </div>
  );
  const renderAttachmentTrigger = (label = "点击上传") => (
    <button type="button" className="table-link-btn">{label}</button>
  );

  return (
    <div className="stack">
      
      <div className="filterbar">
        <div className="filterbar-row" style={{ alignItems: "flex-start", justifyContent: "space-between" }}>
          <div className="filterbar-left"><div className="filterbar-item">
        <div className="filterbar-label">人员姓名</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入人员姓名" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">所属部门</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择所属部门">
          <option value="请选择所属部门">请选择所属部门</option><option value="公用工程部">公用工程部</option><option value="工程管理一班">工程管理一班</option><option value="储运部">储运部</option><option value="炼油三部">炼油三部</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">发证机关级别</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择发证机关级别">
          <option value="请选择发证机关级别">请选择发证机关级别</option><option value="集团公司发证">集团公司发证</option><option value="国家/地方政府发证">国家/地方政府发证</option><option value="企业内部发证">企业内部发证</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书种类</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择发证机关">
          <option value="请选择发证机关">请选择发证机关</option><option value="HSE关键岗位资格">HSE关键岗位资格</option><option value="主要负责人安全合格证">主要负责人安全合格证</option><option value="特种作业资格证">特种作业资格证</option><option value="作业票监护人资格">作业票监护人资格</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书小类</div>
        <div className="filterbar-input"><select className="filterbar-control" defaultValue="请选择证书种类">
          <option value="请选择证书种类">请选择证书种类</option><option value="高压电工作业">高压电工作业</option><option value="防爆电气作业">防爆电气作业</option><option value="压力焊作业">压力焊作业</option>
        </select></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书生效日期</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="选择时间" defaultValue="" /></div>
      </div><div className="filterbar-item">
        <div className="filterbar-label">证书有效期</div>
        <div className="filterbar-input"><input className="filterbar-control" placeholder="选择时间" defaultValue="" /></div>
      </div></div>
          <div style={{ display: "grid", gap: 8, marginLeft: 12, flex: "0 0 auto", justifyItems: "end" }}>
            <div className="filterbar-query-actions" style={{ marginLeft: 0 }}>
              <button type="button" className="btn btn-primary">查询</button>
              <button type="button" className="btn">重置</button>
            </div>
            <div className="filterbar-right-actions" style={{ marginLeft: 0, whiteSpace: "nowrap" }}>
              <button type="button" className="btn btn-primary" onClick={() => openModal("cert-add", drillTarget)}>新增</button>
              <button type="button" className="btn">导入</button>
              <button type="button" className="btn">导出</button>
              <button type="button" className="btn">模板下载</button>
              <button type="button" className="btn btn-primary" onClick={() => openModal("batch-review", drillTarget)}>批量复审/换证/注册</button>
            </div>
          </div>
        </div>
      </div>

      <Card title="教育培训-证书管理-企业端列表" desc="">
        <div className="table-wrap">
          <table className="proto-table" onClickCapture={handleMainTableDrillCapture}>
            <thead>
              <tr>
                <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>统一身份</th><th>岗位</th><th>单位名称</th><th>证书名称</th><th>发证机关级别</th><th>证书编号</th><th>证书种类</th><th>证书小类</th><th>证书生效日期</th><th>证书有效期</th><th>是否异常</th><th>关联培训项目</th><th>复审周期</th><th>应复审日期</th><th>换证周期</th><th>应换证日期</th><th>注册周期</th><th>应注册日期</th><th>备注</th><th>登记部门</th><th>登记人</th><th>登记时间</th><th>证书附件</th><th>操作</th>
              </tr>
            </thead>
            <tbody>
              
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>张亮</td><td>ZHANGLIANG320821</td><td>运行班长</td><td>炼油三部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>主要负责人安全生产知识和管理能力考核合格证</button></td><td>国家/地方政府发证</td><td>AQGL-GD-2023-01872</td><td>主要负责人安全合格证</td><td>主要负责人</td><td>2023-08-15</td><td>2026-08-14</td><td>否</td><td>主要负责人取证复审班</td><td>3年</td><td>2026-08-14</td><td>3年</td><td>2026-08-14</td><td>-</td><td></td><td>首次取证</td><td>炼油三部</td><td>王敏</td><td>2023-08-16 09:12:33</td><td>查看</td><td>{renderRowOps(true)}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>胡晓磊</td><td>HUXIAOLEI441203</td><td>设备工程师</td><td>公用工程部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>特种作业操作证（高压电工作业）</button></td><td>国家/地方政府发证</td><td>TZZY-GD-2024-11345</td><td>特种作业资格证</td><td>高压电工作业</td><td>2024-03-20</td><td>2027-03-19</td><td>否</td><td>电气作业取证班</td><td>3年</td><td>2027-03-19</td><td>-</td><td></td><td>-</td><td></td><td>证书状态正常</td><td>公用工程部</td><td>李倩</td><td>2024-03-21 10:26:08</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>尤红玉</td><td>YOUHONGYU003689</td><td>仪表工程师</td><td>储运部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>特种作业操作证（防爆电气作业）</button></td><td>国家/地方政府发证</td><td>TZZY-GD-2023-09761</td><td>特种作业资格证</td><td>防爆电气作业</td><td>2023-07-01</td><td className="cell-warn">2026-06-30</td><td>否</td><td>防爆电气专项培训</td><td>3年</td><td className="cell-warn">2026-06-30</td><td>-</td><td></td><td>-</td><td></td><td>临近复审</td><td>储运部</td><td>周超</td><td>2023-07-02 15:44:52</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>高杨</td><td>GAOYANG19001A7</td><td>电气技师</td><td>工程管理一班</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>特种作业操作证（高压电工作业）</button></td><td>国家/地方政府发证</td><td>TZZY-GD-2021-05438</td><td>特种作业资格证</td><td>高压电工作业</td><td>2021-04-12</td><td className="cell-danger">2024-04-11</td><td className="cell-danger">是</td><td>电气作业安全培训</td><td>3年</td><td className="cell-danger">2024-04-11</td><td>-</td><td></td><td>-</td><td></td><td>证书已过期，限制上岗</td><td>工程管理一班</td><td>肖鹏</td><td>2024-04-15 08:03:26</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>梁海江</td><td>LIANGHAIJIANG82B6</td><td>安环主管</td><td>安全环保部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>注册安全工程师职业资格证（化工安全）</button></td><td>国家/地方政府发证</td><td>ZCGCS-GD-2019-00658</td><td>HSE关键岗位资格</td><td>注册安全工程师</td><td>2019-11-18</td><td>2029-11-17</td><td>否</td><td>安环管理人员能力提升班</td><td>-</td><td></td><td>-</td><td></td><td>5年</td><td>2029-11-17</td><td>注册状态有效</td><td>安全环保部</td><td>郑宁</td><td>2024-12-03 14:20:11</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>方月蒙</td><td>FANGYUEMENG90013</td><td>化工操作工</td><td>化工二部一班</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>危险化学品安全作业证（加氢工艺）</button></td><td>国家/地方政府发证</td><td>WHP-GD-2022-08119</td><td>特种作业资格证</td><td>危险化学品工艺作业</td><td>2022-09-05</td><td>2025-09-04</td><td className="cell-danger">是</td><td>化工装置技能提升班</td><td>3年</td><td className="cell-danger">2025-09-04</td><td>-</td><td></td><td>-</td><td></td><td>复审超期未办理</td><td>化工二部</td><td>陈雪</td><td>2025-09-10 11:37:42</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>陈羽</td><td>CHENYU341502G8</td><td>储运班长</td><td>储运部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>作业票监护人资格证</button></td><td>企业内部发证</td><td>ZYJH-ZKLH-2025-0231</td><td>作业票监护人资格</td><td>动火作业监护</td><td>2025-05-01</td><td>2027-04-30</td><td>否</td><td>作业票管理专项培训</td><td>2年</td><td>2027-04-30</td><td>2年</td><td>2027-04-30</td><td>-</td><td></td><td>内部资格证</td><td>储运部</td><td>周超</td><td>2025-05-02 09:18:20</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>王志鹏</td><td>WANGZHIPENG410823</td><td>作业监护人</td><td>工程管理一班</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>受限空间作业监护资格证</button></td><td>企业内部发证</td><td>SXKJ-ZKLH-2024-0112</td><td>作业票监护人资格</td><td>受限空间监护</td><td>2024-01-10</td><td>2026-01-09</td><td className="cell-warn">否</td><td>作业票管理专项培训</td><td>2年</td><td className="cell-warn">2026-01-09</td><td>2年</td><td className="cell-warn">2026-01-09</td><td>-</td><td></td><td>临近到期</td><td>工程管理一班</td><td>肖鹏</td><td>2024-01-11 13:42:05</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>刘洋</td><td>LIUYANG371102J7</td><td>班组长</td><td>炼油三部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>特种作业操作证（压力焊作业）</button></td><td>国家/地方政府发证</td><td>TZZY-GD-2020-04672</td><td>特种作业资格证</td><td>压力焊作业</td><td>2020-11-06</td><td className="cell-danger">2023-11-05</td><td className="cell-danger">是</td><td>焊接作业取证复审班</td><td>3年</td><td className="cell-danger">2023-11-05</td><td>-</td><td></td><td>-</td><td></td><td>已停用，待补证</td><td>炼油三部</td><td>王敏</td><td>2023-11-10 16:56:31</td><td>未上传</td><td>{renderRowOps()}</td>
          </tr>
          <tr>
            <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>赵丽</td><td>ZHAOLI340824K2</td><td>培训管理员</td><td>人力资源部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("cert-detail", "")}>企业内训师资格证（安全方向）</button></td><td>集团公司发证</td><td>PXSZ-SINOPEC-2025-077</td><td>HSE关键岗位资格</td><td>企业内训师</td><td>2025-04-18</td><td>2028-04-17</td><td>否</td><td>集团培训师提升项目</td><td>3年</td><td>2028-04-17</td><td>3年</td><td>2028-04-17</td><td>-</td><td></td><td>年度复核正常</td><td>人力资源部</td><td>赵丽</td><td>2025-04-19 10:05:47</td><td>查看</td><td>{renderRowOps()}</td>
          </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {activeModal === "cert-add" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">证书新增</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>关闭</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书新增</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>姓名:</div>
                    <div className="cert-field-value"><div className="cert-picker">
                    <input className="cert-field-control" defaultValue="点击选择人员" readOnly />
                    <button type="button" className="btn" onClick={() => openModal("person-select", drillTarget)}>选择</button>
                  </div></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>统一身份:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>企业名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">行政级别:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">二级单位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">员工工号:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>员工单位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="选择人员自动带出" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编号:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关类别:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="请选择发证机关级别">
                      <option value="请选择发证机关级别">请选择发证机关级别</option><option value="国家/地方政府发证">国家/地方政府发证</option><option value="集团公司发证">集团公司发证</option><option value="企业内部发证">企业内部发证</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="请选择发证机关级别">
                      <option value="请选择发证机关级别">请选择发证机关级别</option><option value="HSE关键岗位资格">HSE关键岗位资格</option><option value="主要负责人安全合格证">主要负责人安全合格证</option><option value="特种作业资格证">特种作业资格证</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书小类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="请选择证书种类">
                      <option value="请选择证书种类">请选择证书种类</option><option value="高压电工作业">高压电工作业</option><option value="防爆电气作业">防爆电气作业</option><option value="压力焊作业">压力焊作业</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="请输入发证机关" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书生效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书失效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要复审:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="否">
                      <option value="否">否</option><option value="是">是</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>复审周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="填写年数" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次复审日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要换证:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="否">
                      <option value="否">否</option><option value="是">是</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>换证周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="填写年数" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次换证日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要注册:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="否">
                      <option value="否">否</option><option value="是">是</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">初始注册日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>注册周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="填写年数" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次注册日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="YYYY-MM-DD" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">备注:</div>
                    <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">证书附件:</div>
                    <div className="cert-field-value">{renderAttachmentTrigger()}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-primary">保存</button>
              </div>

              
            </div>
          </div>
        </div>
      ) : null}

      {activeModal === "cert-edit" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">证书编辑</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>关闭</button><button type="button" className="btn btn-primary">保存</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书编辑</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>姓名:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="高杨" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>统一身份:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="GAOYANG8621" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="工艺工程师" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>企业名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="中科炼化" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="工程管理一班" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">行政级别:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="事业部级" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">二级单位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="-" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">员工工号:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="19001" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="高级安全管理资格证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编号:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="ZJ-2024-00876" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关类别:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="集团公司发证">
                      <option value="国家/地方政府发证">国家/地方政府发证</option><option value="集团公司发证">集团公司发证</option><option value="企业内部发证">企业内部发证</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="HSE关键岗位资格">
                      <option value="HSE关键岗位资格">HSE关键岗位资格</option><option value="主要负责人安全合格证">主要负责人安全合格证</option><option value="特种作业资格证">特种作业资格证</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书小类:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="安全管理类">
                      <option value="安全管理类">安全管理类</option><option value="高压电工作业">高压电工作业</option><option value="防爆电气作业">防爆电气作业</option>
                    </select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="浙江省应急管理厅" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书生效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-10-04" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书失效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2027-10-03" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要复审:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="是"><option value="是">是</option><option value="否">否</option></select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>复审周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="1" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次复审日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2025-10-04" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要换证:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="是"><option value="是">是</option><option value="否">否</option></select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>换证周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="7" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次换证日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2031-10-04" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要注册:</div>
                    <div className="cert-field-value"><select className="cert-field-control" defaultValue="否"><option value="否">否</option><option value="是">是</option></select></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">初始注册日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="-" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>注册周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="-" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次注册日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="-" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">备注:</div>
                    <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" defaultValue="证书档案维护记录" /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">证书附件:</div>
                    <div className="cert-field-value">{renderAttachmentTrigger()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
  

      {activeModal === "cert-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">证书详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>关闭</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书详情</div>
                <div className="cert-form-grid">
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>姓名:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="高杨" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>统一身份:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="GAOYANG8621" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>企业名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="中科炼化" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="工程管理一班" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>岗位:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="工艺工程师" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">行政级别:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="事业部级" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书名称:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="高级安全管理资格证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书编号:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="ZJ-2024-00876" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关类别:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="集团公司发证" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书种类:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="HSE关键岗位资格" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书小类:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="安全管理类" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>发证机关:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="浙江省应急管理厅" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书生效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2024-10-04" placeholder="" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>证书失效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2027-10-03" placeholder="" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">是否异常:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="否" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要复审:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="是" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>复审周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="1年" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次复审日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2025-10-04" placeholder="" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要换证:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="是" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>换证周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="7年" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次换证日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2031-10-04" placeholder="" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>是否需要注册:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="否" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>注册周期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="-" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">初始注册日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label"><span className="required-mark">*</span>下次注册日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="" placeholder="" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">备注:</div>
                    <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="证书档案维护记录" readOnly /></div>
                  </div>
                  <div className="cert-field-item">
                    <div className="cert-field-label">证书附件:</div>
                    <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="未上传文件" readOnly /></div>
                  </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title">证书登记记录</div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>序号</th><th>登记种类</th><th>发证/复审/注册/换证日期</th><th>下次复审/注册/换证日期</th><th>登记人</th><th>登记部门/单位</th><th>登记时间</th><th>证书附件</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>1</td><td>续证</td><td>2026年02月26日</td><td>2033年02月26日</td><td>肖鹏</td><td>公用工程部</td><td>2026年02月26日</td><td><div className="table-op-inline"><button type="button" className="table-link-btn">预览</button><button type="button" className="table-link-btn">下载</button></div></td></tr><tr><td>2</td><td>复审</td><td>2026年02月26日</td><td>2027年02月26日</td><td>肖鹏</td><td>公用工程部</td><td>2026年02月26日</td><td><div className="table-op-inline"><button type="button" className="table-link-btn">预览</button><button type="button" className="table-link-btn">下载</button></div></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  
      {activeModal === "batch-review" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">批量换证</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>关闭</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>批量换证</span>
                  <button type="button" className="btn">删除</button>
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>姓名</th><th>统一身份</th><th>证书名称</th><th>证书种类</th><th>证书小类</th><th>是否需要换证</th><th>换证周期</th><th>证书失效期</th><th>证书附件</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="table-checkbox"><input type="checkbox" readOnly /></td><td>1</td><td>尤红玉</td><td>YOUHONGYU20</td><td>特种作业操作证</td><td>特种作业资格证</td><td>高压电工作业</td><td>是</td><td>1年</td><td>2026-02-03</td><td><button type="button" className="table-link-btn">上传附件</button></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="cert-section">
                <div className="cert-section-title">换证登记</div>
                <div className="cert-form-grid" style={{ gridTemplateColumns: "220px 1fr 220px 1fr 220px 1fr" }}>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label"><span className="required-mark">*</span>换证证书生效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2026-03-09" /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label"><span className="required-mark">*</span>下次换证日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2027-03-09" /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label"><span className="required-mark">*</span>证书失效日期:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="自动和下次换证日期一样" readOnly /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label">登记人:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="肖鹏" readOnly /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label">登记部门:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="工程管理一班" readOnly /></div>
                  </div>
                  <div className="cert-field-item" style={{ gridColumn: "span 2" }}>
                    <div className="cert-field-label">登记时间:</div>
                    <div className="cert-field-value"><input className="cert-field-control" defaultValue="2026-03-09 09:02:22" readOnly /></div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-primary">保存</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}


      {activeModal === "person-select" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">选择人员</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>取消</button><button type="button" className="btn btn-primary">保存</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">选择人员</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">机构名称:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">工号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>常用数据(0)</span>
                  <button type="button" className="btn btn-primary">新增</button>
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>姓名</th><th>员工编号</th><th>部门</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>张亮</td><td>0368547</td><td>储运部</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>方月蒙</td><td>90013152</td><td>化工二部一班</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>胡晓磊</td><td>19038</td><td>炼油三部</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>尤红玉</td><td>00368974</td><td>储运部</td></tr><tr><td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>高杨</td><td>19001</td><td>工程管理一班</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  
    </div>
  );
}
