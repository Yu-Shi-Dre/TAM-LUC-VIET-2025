// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const socketIO = require("socket.io");

// Load biến môi trường
dotenv.config();

// Firebase Admin SDK
const admin = require("./config/firebase");

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// Tạo app và server
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Socket.IO
require("./socket")(io); // Khởi động socket logic

// Server khởi chạy
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

