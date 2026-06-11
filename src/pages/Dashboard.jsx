import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const username = localStorage.getItem("username");

  const [counts, setCounts] = useState({
    products: 0,
    transactions: 0,
    rabbitmq: "checking"
  });

  const authHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  useEffect(() => {
    async function load() {
      const products = await axios
        .get("/api/catalogue/products", authHeaders())
        .catch(() => ({ data: [] }));

      const transactions = await axios
        .get("/api/transaction/transactions", authHeaders())
        .catch(() => ({ data: [] }));

      const health = await axios
        .get("/api/notification/health")
        .catch(() => ({ data: { rabbitmq: "not connected" } }));

      setCounts({
        products: products.data.length,
        transactions: transactions.data.length,
        rabbitmq: health.data.rabbitmq
      });
    }

    load();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, <b>{username}</b>. Here is your personal money summary.</p>

      <div className="card-grid">
        <div className="stat-card">
          <h2>{counts.products}</h2>
          <p>Your Products</p>
        </div>

        <div className="stat-card">
          <h2>{counts.transactions}</h2>
          <p>Your Transactions</p>
        </div>

        <div className="stat-card">
          <h2>{counts.rabbitmq}</h2>
          <p>Notification System</p>
        </div>
      </div>
    </div>
  );
}
