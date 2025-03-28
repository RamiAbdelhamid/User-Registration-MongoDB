require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes"); // Import the order routes

const app = express();

// Enable CORS with specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to access the API
    credentials: true, // Enable sending cookies (like JWT)
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
  
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api", authRoutes);
app.use("/api", orderRoutes); // Use the order routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
