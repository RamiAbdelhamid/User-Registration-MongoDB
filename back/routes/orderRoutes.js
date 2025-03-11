const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Protect this route with authMiddleware
router.post("/orders", authMiddleware, createOrder);
// Separate GET route for fetching orders
router.get("/orders", authMiddleware, getOrders);


module.exports = router;
