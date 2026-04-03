import React from "react";
import Card from "../../../components/ui/Card.jsx";

const QUICK_PROMPTS = [
  "帮我按模板生成一个列表页",
  "把当前页面改成企业端字段",
  "把查询区改成紧凑布局",
  "新增一个审批弹窗原型"
];

function replyByRule(input) {
  const text = String(input || "").trim();
  if (!text) return "可以直接输入需求，例如：生成一个培训记录管理页面。";
  if (text.includes("模板")) return "收到。你可以贴模板ID或调用JSON，我会按模板生成页面并落到指定分类。";
  if (text.includes("导航")) return "收到。请告诉我目标大类/小类，我会按你当前导航配置挂载入口。";
  if (text.includes("分页")) return "收到。可指定标准分页或紧凑分页，我会同步到模板样式。";
  return `收到：${text}。我会按你的规则生成原型页面。`;
}

export default function DialogPage() {
  const [messages, setMessages] = React.useState([
    { role: "assistant", text: "这里是对话页。你可以直接描述页面需求，我会按模板和规则来生成。" }
  ]);
  const [input, setInput] = React.useState("");

  const sendMessage = React.useCallback(
    (text) => {
      const content = String(text || "").trim();
      if (!content) return;
      setMessages((prev) => [
        ...prev,
        { role: "user", text: content },
        { role: "assistant", text: replyByRule(content) }
      ]);
      setInput("");
    },
    []
  );

  return (
    <div className="stack">
      <Card title="对话" desc="可在此输入需求，按模板规则生成页面">
        <div className="pill" style={{ minHeight: 420, display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="pill" style={{ flex: 1, overflowY: "auto", background: "#f8fbff" }}>
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                style={{
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    border: "1px solid #d7dde8",
                    background: msg.role === "user" ? "#e9f6fe" : "#fff",
                    padding: "8px 10px",
                    lineHeight: 1.5
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="pill" style={{ background: "#fff" }}>
            <div className="k" style={{ marginBottom: 6 }}>快捷问题</div>
            <div className="nav">
              {QUICK_PROMPTS.map((item) => (
                <button key={item} type="button" className="btn" onClick={() => sendMessage(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="filterbar">
            <div className="filterbar-row">
              <div className="filterbar-left">
                <div className="filterbar-item" style={{ minWidth: "100%" }}>
                  <div className="filterbar-label">输入需求</div>
                  <div className="filterbar-input">
                    <textarea
                      className="filterbar-control"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="例如：按列表模板生成一个培训记录管理页面，放在教育培训-企业端下面"
                      rows={3}
                      onKeyDown={(e) => {
                        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") sendMessage(input);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="filterbar-actions">
                <button type="button" className="btn btn-primary" onClick={() => sendMessage(input)}>
                  发送
                </button>
                <button type="button" className="btn" onClick={() => setMessages([{ role: "assistant", text: "会话已清空，你可以继续提需求。" }])}>
                  清空会话
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
