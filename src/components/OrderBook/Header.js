import React from "react";

export default function Header({ order, className }) {
  const keys = order.split(",");
  return (
    <div className={className} role="rowgroup">
      {keys.map((c) => (
        <div className="flex-row" key={c}>
          {c.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
