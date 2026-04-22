import React from "react";

const aiMeetingSteps = [
  { id: 1, title: "制定活动计划", text: "在线制定班组安全活动计划，支持各班组自主制定并支持管理人员深入参加。", isAi: false },
  { id: 2, title: "启动活动会议", text: "在线启动班组安全活动会议，班组可独立发起学习任务。", isAi: false },
  { id: 3, title: "生成签到二维码", text: "系统自动生成签到二维码，供移动端扫码签到。", isAi: false, optional: true },
  { id: 4, title: "人员签到", text: "参会人员扫码签到，或由管理员手动补录参会人员。", isAi: false, optional: true },
  { id: 5, title: "AI转写与纪要", text: "会议录音后进行延时文字转写，再通过长城AI优化成会议纪要。", isAi: true },
  { id: 6, title: "AI生成记录初稿", text: "系统按关键词自动匹配并回填字段，生成班组安全活动记录初稿。", isAi: true },
  { id: 7, title: "人工确认完善", text: "人工核对并完善会议记录初稿，确认形成正式记录。", isAi: false },
  { id: 8, title: "补学安排", text: "针对缺席或未完成人员发起补学并记录完成情况。", isAi: false },
  { id: 9, title: "统计汇总与归档", text: "统计参与率、完成率等指标并完成材料归档，形成流程闭环。", isAi: false }
];

function MeetingFlowCard({ step, status, primaryText, secondaryText, onPrimary, onSecondary, blockedReason }) {
  const statusColor = status === "已完成" ? "#26a65b" : status === "可选跳过" ? "#d08a00" : status === "待归档" ? "#2b7cff" : "#999";
  return (
    <div style={{ border: "1px solid #e8e8e8", borderRadius: 4, padding: 12, background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ fontWeight: 600 }}>{`第${step.id}步 ${step.title}`}</div>
        <div style={{ fontSize: 12, color: statusColor }}>{status}</div>
      </div>
      <div style={{ marginTop: 8, color: "#666", lineHeight: "20px", minHeight: 40 }}>{step.text}</div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
        {step.isAi ? <span className="pill" style={{ margin: 0 }}><span className="k">类型</span><span className="v">AI应用</span></span> : null}
        {step.optional ? <span className="pill" style={{ margin: 0 }}><span className="k">属性</span><span className="v">非必须</span></span> : null}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        {primaryText ? <button type="button" className="btn btn-primary" onClick={onPrimary} disabled={!onPrimary}>{primaryText}</button> : null}
        {secondaryText ? <button type="button" className="btn" onClick={onSecondary} disabled={!onSecondary}>{secondaryText}</button> : null}
      </div>
      {blockedReason ? <div style={{ marginTop: 8, color: "#999", fontSize: 12 }}>{blockedReason}</div> : null}
    </div>
  );
}

export default function Page() {
  const [flowState, setFlowState] = React.useState({
    planReady: false,
    meetingStarted: false,
    qrHandled: false,
    signInDone: false,
    aiMinutesReady: false,
    aiDraftReady: false,
    manualReviewed: false,
    remedialDone: false,
    statsDone: false,
    archived: false
  });

  const stepStatus = [
    flowState.planReady ? "已完成" : "未执行",
    flowState.meetingStarted ? "已完成" : "未执行",
    flowState.qrHandled ? "已完成" : "可选跳过",
    flowState.signInDone ? "已完成" : "可选跳过",
    flowState.aiMinutesReady ? "已完成" : "未执行",
    flowState.aiDraftReady ? "已完成" : "未执行",
    flowState.manualReviewed ? "已完成" : "未执行",
    flowState.remedialDone ? "已完成" : "未执行",
    flowState.statsDone && flowState.archived ? "已完成" : flowState.statsDone ? "待归档" : "未执行"
  ];
  const doneCount = stepStatus.filter((item) => item === "已完成").length;
  const progress = `${Math.round((doneCount / 9) * 100)}%`;

  return (
    <div className="stack">
      <div className="cert-section">
        <div className="cert-section-title">班组安全活动功能 - 会议模式 - 流程执行</div>
        <div className="pill">
          <div className="k">闭环进度</div>
          <div className="v">{`已完成 ${doneCount}/9，当前进度 ${progress}`}</div>
        </div>
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
          <MeetingFlowCard
            step={aiMeetingSteps[0]}
            status={stepStatus[0]}
            primaryText="制定计划"
            onPrimary={flowState.planReady ? null : () => setFlowState((prev) => ({ ...prev, planReady: true }))}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[1]}
            status={stepStatus[1]}
            primaryText="启动会议"
            onPrimary={flowState.planReady && !flowState.meetingStarted ? () => setFlowState((prev) => ({ ...prev, meetingStarted: true })) : null}
            blockedReason={!flowState.planReady ? "需先完成第1步：制定活动计划" : ""}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[2]}
            status={stepStatus[2]}
            primaryText="生成二维码"
            secondaryText="跳过"
            onPrimary={flowState.meetingStarted ? () => setFlowState((prev) => ({ ...prev, qrHandled: true })) : null}
            onSecondary={flowState.meetingStarted ? () => setFlowState((prev) => ({ ...prev, qrHandled: false })) : null}
            blockedReason={!flowState.meetingStarted ? "需先完成第2步：启动活动会议" : ""}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[3]}
            status={stepStatus[3]}
            primaryText="扫码签到"
            secondaryText="手动补录"
            onPrimary={flowState.meetingStarted ? () => setFlowState((prev) => ({ ...prev, signInDone: true })) : null}
            onSecondary={flowState.meetingStarted ? () => setFlowState((prev) => ({ ...prev, signInDone: true })) : null}
            blockedReason={!flowState.meetingStarted ? "需先完成第2步：启动活动会议" : ""}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[4]}
            status={stepStatus[4]}
            primaryText="启动AI纪要"
            onPrimary={flowState.meetingStarted && !flowState.aiMinutesReady ? () => setFlowState((prev) => ({ ...prev, aiMinutesReady: true })) : null}
            blockedReason={!flowState.meetingStarted ? "需先完成第2步：启动活动会议" : ""}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[5]}
            status={stepStatus[5]}
            primaryText="生成记录初稿"
            onPrimary={flowState.aiMinutesReady && !flowState.aiDraftReady ? () => setFlowState((prev) => ({ ...prev, aiDraftReady: true })) : null}
            blockedReason={!flowState.aiMinutesReady ? "需先完成第5步：AI转写与纪要" : ""}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[6]}
            status={stepStatus[6]}
            primaryText="人工确认"
            onPrimary={flowState.aiDraftReady && !flowState.manualReviewed ? () => setFlowState((prev) => ({ ...prev, manualReviewed: true })) : null}
            blockedReason={!flowState.aiDraftReady ? "需先完成第6步：AI生成记录初稿" : ""}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[7]}
            status={stepStatus[7]}
            primaryText="发起补学"
            onPrimary={flowState.manualReviewed && !flowState.remedialDone ? () => setFlowState((prev) => ({ ...prev, remedialDone: true })) : null}
            blockedReason={!flowState.manualReviewed ? "需先完成第7步：人工确认完善" : ""}
          />
          <MeetingFlowCard
            step={aiMeetingSteps[8]}
            status={stepStatus[8]}
            primaryText={flowState.statsDone ? "完成归档" : "生成统计"}
            onPrimary={
              !flowState.statsDone
                ? (flowState.manualReviewed ? () => setFlowState((prev) => ({ ...prev, statsDone: true })) : null)
                : !flowState.archived
                  ? () => setFlowState((prev) => ({ ...prev, archived: true }))
                  : null
            }
            blockedReason={!flowState.manualReviewed ? "需先完成第7步：人工确认完善" : ""}
          />
        </div>
        <div className="pill" style={{ marginTop: 10 }}>
          <div className="k">流程闭环说明</div>
          <div className="v">以上9步操作，从发起班组安全活动计划，到过程实施，至材料归档结束，构成完整过程功能应用。</div>
        </div>
      </div>
    </div>
  );
}
