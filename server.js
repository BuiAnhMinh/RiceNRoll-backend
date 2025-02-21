const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Import routes
const settingsRoutes = require("./routes/settings");
const menuRoutes = require("./routes/enu");
const uploadRoutes = require("./routes/upload");

// Use routes
app.use("/api/settings", settingsRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/upload", uploadRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected!"))
.catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
