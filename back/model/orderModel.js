const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false } // This disables the creation of a unique ID for each product in the array
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
    products: [productSchema], // Array of products
    totalAmount: { type: Number, required: true }, // Total amount for the order
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending", // Default status is "Pending"
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
