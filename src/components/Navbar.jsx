import React from "react";

export default function Navbar({ logout }) {
  const username = localStorage.getItem("username");

  return (
    <div className="navbar">
      <div className="logo">💰 BCReddy Money Application</div>
      <div>
        Welcome, <b>{username}</b>{" "}
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
