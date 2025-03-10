import React, { useState } from "react";
import { axiosInstance } from "../axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/signup", {
        username,
        password,
      });
      alert("User created!");
    } catch (err) {
      console.error(err); // Log error for debugging
      alert("Error: " + (err.response ? err.response.data : err.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-semibold text-gray-800">
        Create a New Account
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
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
