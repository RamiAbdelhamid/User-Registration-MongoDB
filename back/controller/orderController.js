const Order = require("../model/orderModel");
const User = require("../model/userModel");

// Create an order
const createOrder = async (req, res) => {
  try {
    // We only need products from the body since user ID is fetched from token
    const { products } = req.body;

    // The user is set by authMiddleware
    const user = req.user;
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Calculate total amount
    const totalAmount = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // Create the new order
    const newOrder = new Order({
      user: user._id,
      products,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();
    res.status(201).send({ message: "Order created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get orders for the logged-in user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    
    if (!orders || orders.length === 0) {
      return res.status(404).send("No orders found.");
    }

    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Error fetching orders");
  }
};










module.exports = { createOrder, getOrders };
