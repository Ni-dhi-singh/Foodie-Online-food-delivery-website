const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const orderRoutes = require("./routes/orderRoutes"); // ✅ Correct filename

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
