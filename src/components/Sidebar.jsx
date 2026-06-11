import React from "react";

export default function Sidebar({ page, setPage }) {
  const items = [
    ["dashboard", "🏠 Dashboard"],
    ["products", "📦 Products"],
    ["users", "👤 Users"],
    ["transactions", "💳 Transactions"],
    ["notifications", "🔔 Notifications"]
  ];

  return (
    <div className="sidebar">
      {items.map(([key, label]) => (
        <button
          key={key}
          className={page === key ? "active" : ""}
          onClick={() => setPage(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
