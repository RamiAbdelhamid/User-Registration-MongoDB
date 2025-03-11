import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { axiosInstance } from "../axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/login", { username, password });
      alert("Logged in successfully!");
      navigate("/profile"); // Navigate to the profile page after successful login
    } catch (err) {
      alert("Error: " + err.response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800">
        Log In to Your Account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-96 mt-6 p-6 bg-white rounded-lg shadow-lg"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
