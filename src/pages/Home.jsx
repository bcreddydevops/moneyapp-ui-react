import React from "react";

export default function Home({ setPage }) {
  return (
    <div className="home-v3">
      <div className="home-nav">
        <div className="brand">
          <img src="/logo.png" alt="BCReddy DevOps" />
          <span>BCReddy Money Application</span>
        </div>
      </div>

      <div className="hero-v3">
        <div className="hero-text">
          <h1>Manage Your Money Smarter</h1>
          <p>
            Track your products, transactions, profile, and real-time notifications
            in one secure personal finance dashboard.
          </p>

          <div className="hero-actions">
            <button className="btn btn-success" onClick={() => setPage("register")}>
              Create Account
            </button>
            <button className="btn btn-primary" onClick={() => setPage("login")}>
              Login
            </button>
          </div>
        </div>

        <div className="hero-photo-card">
          <img src="/profile.png" alt="BCReddy" />
          <h2>BCReddy DevOps</h2>
          <p>Build • Deploy • Monitor</p>
        </div>
      </div>

      <div className="home-features-v3">
        <div>💳 Transactions</div>
        <div>📦 Products</div>
        <div>👤 Profile</div>
        <div>🔔 Notifications</div>
      </div>
    </div>
  );
}
