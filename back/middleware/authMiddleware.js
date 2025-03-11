const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // Verify token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).send("User not found.");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(400).send("Invalid token.");
  }
};
