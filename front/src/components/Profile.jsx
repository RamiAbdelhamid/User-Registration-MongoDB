
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { axiosInstance } from "../axios";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUser(response.data);
      } catch (err) {
        alert("Error: " + err.response.data);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      // Delete token from cookies by setting an expired date
      await axiosInstance.post("/logout"); // Make sure to create this route in your backend
      navigate("/login"); // Redirect to login page
    } catch (err) {
      alert("Error during logout: " + err.response.data);
    }
  };

  return user ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome, {user.username}!
      </h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
}

export default Profile;
