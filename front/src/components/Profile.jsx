import React, { useEffect, useState } from "react";
import { axiosInstance } from "../axios";

function Profile() {
  const [user, setUser] = useState(null);

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

  return user ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome, {user.username}!
      </h1>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );
}

export default Profile;
