import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { axiosInstance } from "../axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      try {
        // Fetch user profile
        const profileResponse = await axiosInstance.get("/profile");
        setUser(profileResponse.data);

        // Fetch user's orders after profile is fetched
        const ordersResponse = await axiosInstance.get("/orders"); // Make sure the backend route exists
        setOrders(ordersResponse.data);
      } catch (err) {
        alert("Error: " + err.response?.data);
      }
    };

    fetchProfileAndOrders();
  }, []);

  const handleLogout = async () => {
    try {
      // Logout user by clearing the token
      await axiosInstance.post("/logout"); // Make sure to create this route in your backend
      navigate("/login"); // Redirect to login page
    } catch (err) {
      alert("Error during logout: " + err.response?.data);
    }
  };

  return user ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome, {user.username}!
      </h1>

      <div className="mt-6 w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Your Orders
        </h2>

        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="p-4 border-b border-gray-300">
                <div className="text-lg font-semibold text-gray-700">
                  Order ID: {order._id}
                </div>
                <div className="text-gray-600">Total: ${order.totalAmount}</div>
                <div className="text-gray-600">Status: {order.status}</div>
                <div className="text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="mt-2">
                  <strong>Products:</strong>
                  <ul className="space-y-2">
                    {order.products.map((product, index) => (
                      <li key={index}>
                        {product.name} - ${product.price} x {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You have no orders yet.</p>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
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
