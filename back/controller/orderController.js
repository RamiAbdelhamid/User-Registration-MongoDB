const Order = require("../model/orderModel");
const User = require("../model/userModel");

// Create an order
const createOrder = async (req, res) => {
  const { userId, products } = req.body;

  try {
    // Find the user who is placing the order
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Calculate the total amount
    const totalAmount = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // Create the new order
    const newOrder = new Order({
      user: userId,
      products: products,
      totalAmount: totalAmount,
      status: "Pending", // Default status
    });

    await newOrder.save();
    res.status(201).send("Order created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { createOrder };
