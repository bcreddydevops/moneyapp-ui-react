import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "debit"
  });

  const authHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const load = async () => {
    const res = await axios.get(
      "/api/transaction/transactions",
      authHeaders()
    );
    setTransactions(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const payload = {
      title: form.title,
      amount: Number(form.amount),
      type: form.type
    };

    if (editId) {
      await axios.put(
        `/api/transaction/transactions/${editId}`,
        payload,
        authHeaders()
      );
      setEditId(null);
    } else {
      await axios.post(
        "/api/transaction/transactions",
        payload,
        authHeaders()
      );
    }

    setForm({ title: "", amount: "", type: "debit" });
    load();
  };

  const editTransaction = (transaction) => {
    setEditId(transaction.id);
    setForm({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type
    });
  };

  const deleteTransaction = async (id) => {
    await axios.delete(
      `/api/transaction/transactions/${id}`,
      authHeaders()
    );
    load();
  };

  return (
    <div>
      <h1>Transactions</h1>

      <div className="panel">
        <h3>{editId ? "Edit Transaction" : "Add Transaction"}</h3>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>

        <button className="btn btn-success" onClick={save}>
          {editId ? "Update Transaction" : "Add Transaction"}
        </button>

        {editId && (
          <button
            className="btn"
            onClick={() => {
              setEditId(null);
              setForm({ title: "", amount: "", type: "debit" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="panel">
        <h3>Your Transaction List</h3>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t, index) => (
                <tr key={t.id}>
                <td>{index + 1}</td>
                <td>{t.title}</td>
                <td>{t.amount}</td>
                <td>{t.type}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => editTransaction(t)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteTransaction(t.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {transactions.length === 0 && (
              <tr>
                <td colSpan="5">No transactions found for this user.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
