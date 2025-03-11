const express = require("express");
const router = express.Router();
const { createOrder } = require("../controller/orderController");

router.post("/orders", createOrder); // Endpoint to create a new order

module.exports = router;
