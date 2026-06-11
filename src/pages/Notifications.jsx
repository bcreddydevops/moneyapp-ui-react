import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [health, setHealth] = useState("");

  const authHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const loadNotifications = async () => {
    const res = await axios.get(
      "/api/notification/notifications",
      authHeaders()
    );
    setNotifications(res.data);
  };

  const checkHealth = async () => {
    const res = await axios.get("/api/notification/health");
    setHealth(
      `Service: ${res.data.status}, RabbitMQ: ${res.data.rabbitmq}, Stored: ${res.data.stored_notifications}`
    );
  };

  const clearNotifications = async () => {
    await axios.delete(
      "/api/notification/notifications",
      authHeaders()
    );
    loadNotifications();
  };

  useEffect(() => {
    loadNotifications();
    checkHealth();
  }, []);

  return (
    <div>
      <h1>Notifications</h1>

      <div className="panel">
        <h3>Notification Center</h3>

        <button className="btn btn-primary" onClick={loadNotifications}>
          Refresh Notifications
        </button>

        <button className="btn btn-success" onClick={checkHealth}>
          Check RabbitMQ
        </button>

        <button className="btn btn-danger" onClick={clearNotifications}>
          Clear My Notifications
        </button>

        <p>{health}</p>
      </div>

      <div className="panel">
        <h3>Your Recent Notifications</h3>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Event</th>
              <th>Message</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {notifications.map((n, index) => (
              <tr key={n.id}>
                <td>{index + 1}</td>
                <td>{n.event}</td>
                <td>{n.message}</td>
                <td>{n.created_at}</td>
              </tr>
            ))}

            {notifications.length === 0 && (
              <tr>
                <td colSpan="4">No notifications found for this user.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
