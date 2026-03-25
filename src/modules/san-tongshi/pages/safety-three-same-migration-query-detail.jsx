import React from "react";
import { useNavigate } from "react-router-dom";
import { LegacyDetailView } from "./safety-three-same-migration-query.jsx";

export default function Page() {
  const navigate = useNavigate();
  const projectName = "智能园区气分改造项目";

  return (
    <div className="edu-dev-prototype">
      <LegacyDetailView
        fullPage
        item={{ name: projectName }}
        onClose={() => navigate("/san-tongshi/safety-migration-query")}
      />
    </div>
  );
}
