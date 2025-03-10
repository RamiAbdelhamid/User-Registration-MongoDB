const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    req.user = user; // Attach the user to the request object
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
