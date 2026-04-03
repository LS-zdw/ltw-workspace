import React from "react";

export default function NavCategoryFilter({
  majorValue = "all",
  minorValue = "all",
  majorOptions = [],
  minorOptions = [],
  onMajorChange,
  onMinorChange
}) {
  return (
    <>
      <select
        className="filterbar-control"
        style={{ minWidth: 180 }}
        value={majorValue}
        onChange={(e) => onMajorChange?.(e.target.value)}
      >
        <option value="all">全部大类</option>
        {majorOptions.map((item) => (
          <option key={item.key} value={item.key}>
            {item.label}（{item.count}）
          </option>
        ))}
      </select>
      <select
        className="filterbar-control"
        style={{ minWidth: 220 }}
        value={minorValue}
        onChange={(e) => onMinorChange?.(e.target.value)}
      >
        <option value="all">全部小类</option>
        {minorOptions.map((item) => (
          <option key={`${item.majorKey}::${item.minorKey}`} value={`${item.majorKey}::${item.minorKey}`}>
            {(item.minorLabel || item.label || item.minorKey)}（{item.count}）
          </option>
        ))}
      </select>
    </>
  );
}
