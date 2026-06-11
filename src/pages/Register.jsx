import React, { useState } from "react";
import axios from "axios";

export default function Register({ setPage }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      const res = await axios.post("/api/auth/register", form);
      setMessage(res.data.message);
      setTimeout(() => setPage("login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p>BCReddy Money Application</p>

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn btn-success" onClick={register}>
          Register
        </button>

        <button className="btn" onClick={() => setPage("login")}>
          Already have account? Login
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}
