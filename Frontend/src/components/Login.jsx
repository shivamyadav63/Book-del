import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  // 🔥 Your Render Backend URL
  const BASE_URL = "https://book-del-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (isSignup && !formData.fullname)
    ) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const endpoint = isSignup ? "/user/signup" : "/user/login";

      const res = await axios.post(
        `${BASE_URL}${endpoint}`,
        formData
      );

      // 👉 Login logic
      if (!isSignup) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthUser(res.data.user);

        alert("Login Successful ✅");

        const modal = document.getElementById("login_modal");
        if (modal) modal.close();

        navigate("/course");
      } 
      // 👉 Signup logic
      else {
        alert("Signup Successful ✅");
        setIsSignup(false);
      }

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        {isSignup ? "Signup" : "Login"}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name (Signup only) */}
        {isSignup && (
          <input
            type="text"
            name="fullname"
            placeholder="Enter Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
        )}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading
            ? isSignup
              ? "Signing up..."
              : "Logging in..."
            : isSignup
            ? "Signup"
            : "Login"}
        </button>
      </form>

      {/* Toggle Login/Signup */}
      <p className="text-center mt-4">
        {isSignup
          ? "Already have an account?"
          : "Don't have an account?"}
        <span
          className="text-blue-500 cursor-pointer ml-1"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Signup"}
        </span>
      </p>
    </div>
  );
};

export default Login;