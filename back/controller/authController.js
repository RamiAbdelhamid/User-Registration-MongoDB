const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// Sign up logic
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send('User created successfully');
  } catch (err) {
    console.error(err);  // Log error to the console
    res.status(500).send('Server error');
  }
};

// Log in logic
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, { httpOnly: true })
      .send("Logged in successfully");
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Get profile logic (Protected route)
exports.profile = async (req, res) => {
  try {
    const user = req.user; // User will be added to the request by the authMiddleware
    res.json({ username: user.username });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
