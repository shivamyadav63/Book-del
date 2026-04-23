import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://book-del-backend.onrender.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/user/signup`,
        formData
      );

      alert("Signup Successful ✅");

      console.log(res.data);

      setFormData({
        fullname: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message || "Signup failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 p-6 shadow-lg rounded-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Enter Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-700"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;