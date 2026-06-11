import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const authHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const load = async () => {
    const res = await axios.get("/api/user/users", authHeaders());
    setUsers(res.data);

    if (res.data.length > 0) {
      setForm({
        name: res.data[0].name || "",
        email: res.data[0].email || ""
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    await axios.post("/api/user/users", form, authHeaders());
    setForm({ name: "", email: "" });
    load();
  };

  return (
    <div>
      <h1>My Profile</h1>

      <div className="panel">
        <h3>{users.length > 0 ? "Update Profile" : "Create Profile"}</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button className="btn btn-success" onClick={save}>
          {users.length > 0 ? "Update Profile" : "Create Profile"}
        </button>
      </div>

      <div className="panel">
        <h3>Your Profile</h3>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.username}</td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="3">No profile found. Please create your profile.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
