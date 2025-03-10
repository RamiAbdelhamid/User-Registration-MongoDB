const express = require("express");
const router = express.Router();
const { signup, login, profile } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Sign up route
router.post("/signup", signup);

// Log in route
router.post("/login", login);

// Profile route (Protected)
router.get("/profile", authMiddleware, profile);

module.exports = router;
