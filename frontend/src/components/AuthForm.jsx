// src/components/AuthForm.jsx
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../token";

const AuthForm = ({ route, method }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log("BaseURL:", api.defaults.baseURL);
    console.log("Route:", route);
    console.log("Full URL would be:", api.defaults.baseURL + route);

    try {
      const payload =
        method === "login"
          ? { email, password }
          : { name, email, password, password2 };

      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
        window.location.reload();
      } else {
        setSuccess("✅ Registration successful, please login.");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 401) {
          setError("❌ Invalid credentials.");
        } else if (error.response.status === 400) {
          setError("⚠️ User already exists or invalid data.");
        } else {
          setError("⚠️ Something went wrong. Try again.");
        }
      } else if (error.request) {
        setError("🌐 Network error, check your connection.");
      } else {
        setError("⚠️ Unexpected error. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/accounts/google/login";
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {method === "register" ? "Create an Account" : "Welcome Back"}
        </h2>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {method === "register" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          {method === "register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white font-semibold bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : method === "register"
              ? "Register"
              : "Login"}
          </button>
        </form>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            <img src="/vite.svg" alt="Google" className="w-5 h-5 mr-2" />
            {method === "register"
              ? "Register with Google"
              : "Login with Google"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          {method === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
