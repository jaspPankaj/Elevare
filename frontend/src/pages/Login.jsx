// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.username, form.password);
    if (result.success) navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={onChange}
          className="w-full p-2 mb-3 border rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange}
          className="w-full p-2 mb-4 border rounded" />
        <button className="w-full py-2 rounded bg-blue-600 text-white">Login</button>
      </form>
    </div>
  );
}
