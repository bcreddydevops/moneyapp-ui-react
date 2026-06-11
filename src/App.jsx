import React, { useState } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState(token ? "dashboard" : "home");

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setPage("home");
  };

  if (!token) {
    if (page === "register") return <Register setPage={setPage} />;
    if (page === "login") return <Login setToken={setToken} setPage={setPage} />;
    return <Home setPage={setPage} />;
  }

  return (
    <div>
      <Navbar logout={logout} />
      <div className="app-layout">
        <Sidebar page={page} setPage={setPage} logout={logout} />
        <main className="main-content">
          {page === "dashboard" && <Dashboard />}
          {page === "products" && <Products />}
          {page === "users" && <Users />}
          {page === "transactions" && <Transactions />}
          {page === "notifications" && <Notifications />}
        </main>
      </div>
    </div>
  );
}
