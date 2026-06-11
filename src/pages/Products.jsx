import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: ""
  });

  const authHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const load = async () => {
    const res = await axios.get("/api/catalogue/products", authHeaders());
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const payload = {
      name: form.name,
      price: Number(form.price),
      category: form.category
    };

    if (editId) {
      await axios.put(
        `/api/catalogue/products/${editId}`,
        payload,
        authHeaders()
      );
      setEditId(null);
    } else {
      await axios.post(
        "/api/catalogue/products",
        payload,
        authHeaders()
      );
    }

    setForm({ name: "", price: "", category: "" });
    load();
  };

  const editProduct = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category
    });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/api/catalogue/products/${id}`, authHeaders());
    load();
  };

  return (
    <div>
      <h1>Products</h1>

      <div className="panel">
        <h3>{editId ? "Edit Product" : "Add Product"}</h3>

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button className="btn btn-success" onClick={save}>
          {editId ? "Update Product" : "Add Product"}
        </button>

        {editId && (
          <button
            className="btn"
            onClick={() => {
              setEditId(null);
              setForm({ name: "", price: "", category: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      <div className="panel">
        <h3>Your Product List</h3>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => editProduct(p)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteProduct(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="5">No products found for this user.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
