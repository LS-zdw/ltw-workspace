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
  const [selectedEnterprise, setSelectedEnterprise] = React.useState("总部机关");
  const enterpriseTree = [
    "总部机关",
    "资兴运营部（资兴公司）",
    "宁波工程公司",
    "镇海炼化",
    "中石化工程建设有限公司",
    "中国石化销售有限公司",
    "中原油田",
    "河南油田",
    "江汉油田",
    "江苏油田",
    "华北石油局",
    "华东油田",
    "西南油气"
  ];
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
  const openDetail = (id) => {
    setDrillTarget("");
    setActiveModal(id);
  };
  const closeModal = () => setActiveModal(null);
  const goto = (target) => {
    closeModal();
    if (navigate) navigate(target || drillTarget || "/");
  };

  return (
    <div className="stack">
      <div className="edu-dev-two-col edu-dev-two-col-left">
        <aside className="edu-dev-side">
          <Card title="所属企业筛选" desc="">
            <div className="stpm-org-tree">
              <div className="stpm-org-tree-search">
                <span className="stpm-org-tree-label">名称:</span>
                <input className="filterbar-control stpm-org-tree-input" defaultValue="" placeholder="请输入企业名称" />
              </div>
              <div className="stpm-org-tree-body">
                {enterpriseTree.map((item) => (
                  <label className="stpm-org-tree-item" key={item}>
                    <input
                      type="radio"
                      name="enterprise-tree"
                      checked={selectedEnterprise === item}
                      onChange={() => setSelectedEnterprise(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>
          </Card>
        </aside>
        <div className="edu-dev-main">
          <div className="filterbar">
            <div className="filterbar-row">
              <div className="filterbar-left"><div className="filterbar-item">
            <div className="filterbar-label">组织机构</div>
            <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入组织机构" defaultValue="" /></div>
          </div><div className="filterbar-item">
            <div className="filterbar-label">员工姓名</div>
            <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入员工姓名" defaultValue="" /></div>
          </div><div className="filterbar-item">
            <div className="filterbar-label">统一身份账号</div>
            <div className="filterbar-input"><input className="filterbar-control" placeholder="请输入统一身份账号" defaultValue="" /></div>
          </div><div className="filterbar-item">
            <div className="filterbar-label">人员类型</div>
            <div className="filterbar-input"><select className="filterbar-control" defaultValue="全部">
              <option value="全部">全部</option><option value="新员工">新员工</option><option value="在岗员工">在岗员工</option><option value="转岗员工">转岗员工</option>
            </select></div>
          </div></div>
              <div className="filterbar-query-actions"><button type="button" className="btn btn-primary">查询</button><button type="button" className="btn">重置</button></div>
              <div className="filterbar-right-actions"><button type="button" className="btn">导出档案</button></div>
            </div>
          </div>

          <Card title="档案统计" desc="">
            <div className="metrics-row">
              
          <div className="pill">
            <div className="k">人员总数</div>
            <div className="v">1268</div>
          </div>
          <div className="pill">
            <div className="k">本年累计学时</div>
            <div className="v">18624</div>
          </div>
          <div className="pill">
            <div className="k">有效证书数</div>
            <div className="v">2396</div>
          </div>
          <div className="pill">
            <div className="k">待复审证书</div>
            <div className="v">82</div>
          </div>
          <div className="pill">
            <div className="k">培训完成率</div>
            <div className="v">96.4%</div>
          </div>
            </div>
          </Card>

          <Card title="人员档案台账" desc="">
            <div className="table-wrap">
              <table className="proto-table">
                <thead>
                  <tr>
                    <th className="table-checkbox"><input type="checkbox" readOnly /></th><th>序号</th><th>所属企业</th><th>组织机构</th><th>用户姓名</th><th>统一账号</th><th>手机号码</th><th>岗位</th><th>人员类型</th><th>性别</th><th>民族</th><th>累计培训学时</th><th>参训项目数</th><th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>1</td><td>镇海炼化</td><td>安环部</td><td><button type="button" className="table-link-btn" onClick={() => openModal("person-archive-detail", "")}>张明</button></td><td>ZHANGMING320821</td><td>13812345678</td><td>安全管理岗</td><td>新员工</td><td>男</td><td>汉族</td><td>86</td><td>12</td><td><button type="button" className="table-link-btn" onClick={() => openModal("person-archive-detail", "")}>学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>2</td><td>西南油气</td><td>运行三部</td><td><button type="button" className="table-link-btn">刘敏</button></td><td>LIUMIN420602</td><td>13987651234</td><td>运行值班岗</td><td>在岗员工</td><td>女</td><td>汉族</td><td>74</td><td>9</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>3</td><td>中科（广东）炼化</td><td>安环部</td><td><button type="button" className="table-link-btn">王凯</button></td><td>WANGKAI330115</td><td>13745211234</td><td>工艺技术岗</td><td>在岗员工</td><td>男</td><td>汉族</td><td>92</td><td>14</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>4</td><td>江汉油田</td><td>生产技术部</td><td><button type="button" className="table-link-btn">周静</button></td><td>ZHOUJING220907</td><td>13689004567</td><td>设备管理岗</td><td>在岗员工</td><td>女</td><td>汉族</td><td>65</td><td>8</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>5</td><td>扬子石化</td><td>安全环保部</td><td><button type="button" className="table-link-btn">沈涛</button></td><td>SHENTAO500721</td><td>13502119876</td><td>安全管理岗</td><td>新员工</td><td>男</td><td>汉族</td><td>51</td><td>6</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>6</td><td>茂名石化</td><td>运行二部</td><td><button type="button" className="table-link-btn">许菲</button></td><td>XUFEI440312</td><td>13900234567</td><td>运行值班岗</td><td>在岗员工</td><td>女</td><td>汉族</td><td>79</td><td>11</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>7</td><td>胜利油田</td><td>设备工程部</td><td><button type="button" className="table-link-btn">韩博</button></td><td>HANBO371201</td><td>13877665544</td><td>设备管理岗</td><td>转岗员工</td><td>男</td><td>汉族</td><td>58</td><td>7</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>8</td><td>海南炼化</td><td>综合管理部</td><td><button type="button" className="table-link-btn">朱琳</button></td><td>ZHULIN460102</td><td>13799112233</td><td>综合管理岗</td><td>在岗员工</td><td>女</td><td>汉族</td><td>73</td><td>10</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>9</td><td>九江石化</td><td>安环部</td><td><button type="button" className="table-link-btn">丁浩</button></td><td>DINGHAO360226</td><td>13633004567</td><td>安全管理岗</td><td>在岗员工</td><td>男</td><td>汉族</td><td>88</td><td>13</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
              <tr>
                <td className="table-checkbox"><input type="checkbox"  readOnly /></td><td>10</td><td>巴陵石化</td><td>运行一部</td><td><button type="button" className="table-link-btn">唐悦</button></td><td>TANGYUE430205</td><td>13756789012</td><td>运行值班岗</td><td>新员工</td><td>女</td><td>汉族</td><td>69</td><td>9</td><td><button type="button" className="table-link-btn">学习详情</button></td>
              </tr>
                </tbody>
              </table>
            </div>
          </Card>

        </div>

      </div>
      
      {activeModal === "person-archive-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">一人一档详情</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>返回页面</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">人员基本信息</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">所属企业:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="镇海炼化" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">组织机构:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="安环部" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">用户姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="张明" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">统一账号:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="ZHANGMING320821" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">手机号码:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="13812345678" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">岗位:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="安全管理岗" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">人员类型:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="新员工" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">累计培训学时:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="86" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">参训项目数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="12" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">合格率:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="96.7%" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">有效证书数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">待复审证书:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="0" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">最新培训情况:</div>
        <div className="cert-field-value"><textarea className="cert-field-control cert-field-textarea" placeholder="" defaultValue="最近完成《班组长安全提升一期》，考试89分，已合格并完成发证。" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>学习详情总览</span>
                  
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>分类</th><th>最新记录</th><th>统计</th><th>状态</th><th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        onClick={() => openDetail("person-training-detail")}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          openDetail("person-training-detail");
                        }}
                      >
                        <td>培训记录</td>
                        <td>班组长安全提升一期</td>
                        <td>12条</td>
                        <td className="cell-ok">正常</td>
                        <td><button type="button" className="table-link-btn" onMouseDown={(e) => { e.preventDefault(); openDetail("person-training-detail"); }} onClick={() => openDetail("person-training-detail")}>查看</button></td>
                      </tr>
                      <tr
                        onClick={() => openDetail("person-exam-detail")}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          openDetail("person-exam-detail");
                        }}
                      >
                        <td>考试记录</td>
                        <td>班组长安全履职能力考核（一期）</td>
                        <td>10条</td>
                        <td className="cell-ok">正常</td>
                        <td><button type="button" className="table-link-btn" onMouseDown={(e) => { e.preventDefault(); openDetail("person-exam-detail"); }} onClick={() => openDetail("person-exam-detail")}>查看</button></td>
                      </tr>
                      <tr
                        onClick={() => openDetail("person-certificate-detail")}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          openDetail("person-certificate-detail");
                        }}
                      >
                        <td>证书档案</td>
                        <td>安全生产知识和管理能力考核合格证</td>
                        <td>2本</td>
                        <td className="cell-ok">全部有效</td>
                        <td><button type="button" className="table-link-btn" onMouseDown={(e) => { e.preventDefault(); openDetail("person-certificate-detail"); }} onClick={() => openDetail("person-certificate-detail")}>查看</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  

      {activeModal === "person-training-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">一人一档-培训记录明细</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>返回页面</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">培训记录</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">员工姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="张明" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">组织机构:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="中科（广东）炼化-安环部" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">累计学时:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="86" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">参训项目数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="12" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>培训记录列表</span>
                  
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>培训班名称</th><th>培训计划名称</th><th>开始时间</th><th>结束时间</th><th>学时</th><th>是否发证</th><th>成绩</th><th>是否合格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>班组长安全提升一期</td><td>2026年班组长安全履职能力提升计划</td><td>2026-02-24</td><td>2026-03-07</td><td>24</td><td>是</td><td>89</td><td className="cell-ok">是</td></tr><tr><td>新员工三级教育（2月）</td><td>新员工三级安全教育计划</td><td>2026-02-06</td><td>2026-02-06</td><td>6</td><td>否</td><td>92</td><td className="cell-ok">是</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  

      {activeModal === "person-exam-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">一人一档-考试记录明细</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>返回页面</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">考试记录</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">员工姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="张明" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">本年考试次数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="10" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">考试合格率:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="100%" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>考试记录列表</span>
                  
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>考试名称</th><th>举办单位</th><th>考试时间</th><th>成绩</th><th>是否合格</th><th>关联培训班</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>班组长安全履职能力考核（一期）</td><td>中科（广东）炼化</td><td>2026-03-07</td><td>89</td><td className="cell-ok">是</td><td>班组长安全提升一期</td></tr><tr><td>新员工三级教育结业测评（2月）</td><td>中科（广东）炼化</td><td>2026-02-06</td><td>92</td><td className="cell-ok">是</td><td>新员工三级教育（2月）</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : null}
  

      {activeModal === "person-certificate-detail" ? (
        <div className="modal-mask" onClick={closeModal}>
          <div className="modal modal-xl cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hd">
              <div>
                <div className="modal-title">一人一档-证书档案明细</div>
              </div>
              <div className="cert-hd-actions"><button type="button" className="btn" onClick={closeModal}>返回页面</button></div>
            </div>
            <div className="modal-bd cert-bd">
              <div className="cert-section">
                <div className="cert-section-title">证书档案</div>
                <div className="cert-form-grid">
                  
      <div className="cert-field-item">
        <div className="cert-field-label">员工姓名:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="张明" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">有效证书数:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="2" /></div>
      </div>
      <div className="cert-field-item">
        <div className="cert-field-label">待复审证书:</div>
        <div className="cert-field-value"><input className="cert-field-control" placeholder="" defaultValue="0" /></div>
      </div>
                </div>
              </div>

              
              <div className="cert-section">
                <div className="cert-section-title cert-section-title-row">
                  <span>证书列表</span>
                  
                </div>
                <div className="table-wrap">
                  <table className="proto-table">
                    <thead>
                      <tr>
                        <th>证书编号</th><th>证书名称</th><th>证书种类</th><th>证书小类</th><th>发证日期</th><th>有效期至</th><th>证书状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>AQ202603070018</td><td>安全生产知识和管理能力考核合格证</td><td>安全管理</td><td>企业主要负责人</td><td>2026-03-07</td><td>2029-03-06</td><td className="cell-ok">有效</td></tr><tr><td>AQ202602060112</td><td>新员工三级教育结业证明</td><td>内部培训</td><td>新员工入职</td><td>2026-02-06</td><td>2027-02-05</td><td className="cell-ok">有效</td></tr>
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
