// 1. Import required packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// 2. Load environment variables from .env file
dotenv.config(); // Load the secret settings from the .env file and make them available in the code.

// 3. Create an Express app
const app = express();

// 4. Middleware to parse JSON bodies
app.use(express.json());

// 5. Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 6. Import custom routes
const keyRoutes = require("./routes/keyRoutes");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

// 7. Use the routes
app.use("/api/keys", keyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// 8. Optional: Home route for testing
app.get("/", (req, res) => {
  res.send("🎉 Welcome to the Todo API");
});

// 9. Error-handling middleware (must be last!)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// 10. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
