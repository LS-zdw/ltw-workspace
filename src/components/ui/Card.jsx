import React from "react";

export default function Card({ title, desc, right, children }) {
  return (
    <div className="card">
      <div className="card-hd">
        <div>
          <div className="card-title">{title}</div>
          {desc ? <div className="card-desc">{desc}</div> : null}
        </div>
        {right ? <div className="card-right">{right}</div> : null}
      </div>
      <div className="card-bd">{children}</div>
    </div>
  );
}
