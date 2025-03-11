import React, { useState, useEffect } from "react";
import * as jwt_decode from "jwt-decode";
import Cookies from "js-cookie"; // Import js-cookie
import { axiosInstance } from "../axios"; // Ensure axios is set up correctly

function CreateOrder() {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([ { name: "", price: "", quantity: "" } ]);
  const [message, setMessage] = useState("");

  // Automatically set userId if a valid token is present in cookies
  useEffect(() => {
    const token = Cookies.get("token"); // Get token from cookies
    console.log("Token from cookies:", token); // Log token for debugging

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log("Decoded Token:", decodedToken); // Log the decoded token

        if (decodedToken && decodedToken.userId) {
          setUserId(decodedToken.userId); // Set userId if it's found
        } else {
          console.error("userId not found in decoded token");
        }
      } catch (error) {
        console.error("Error decoding token:", error); // Handle error if decoding fails
      }
    } else {
      console.log("No token found in cookies");
    }
  }, []);

  // Handle changes for product fields
  const handleChangeProduct = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;
    setProducts(newProducts);
  };

  // Add another product input field
  const handleAddProduct = () => {
    setProducts([...products, { name: "", price: "", quantity: "" }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User ID is required.");
      return;
    }

    if (products.some((product) => !product.name || !product.price || !product.quantity)) {
      setMessage("Please provide complete product information.");
      return;
    }

    try {
      const response = await axiosInstance.post("/orders", { userId, products });
      setMessage(response.data.message || "Order created successfully!");
    } catch (err) {
      setMessage("Error: " + (err.response?.data || "An error occurred."));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create an Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">User ID:</label>
          <input
            type="text"
            value={userId}
            readOnly
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {products.map((product, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-2">Product {index + 1}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={(e) => handleChangeProduct(index, "name", e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Price</label>
                <input
                  type="number"
                  placeholder="Enter product price"
                  value={product.price}
                  onChange={(e) => handleChangeProduct(index, "price", e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Quantity</label>
                <input
                  type="number"
                  placeholder="Enter product quantity"
                  value={product.quantity}
                  onChange={(e) => handleChangeProduct(index, "quantity", e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddProduct}
          className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Another Product
        </button>

        <button
          type="submit"
          className="w-full px-6 py-3 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create Order
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg text-red-500">{message}</p>}
    </div>
  );
}

export default CreateOrder;
