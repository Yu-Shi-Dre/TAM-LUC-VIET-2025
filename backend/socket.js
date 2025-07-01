// socket.js
const User = require("./models/User");

module.exports = (io) => {
  const onlineUsers = {}; // key: userCode, value: socket.id

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    // Nhận userCode và role khi kết nối
    socket.on("join", ({ code, role }) => {
      socket.userCode = code;
      socket.role = role;
      onlineUsers[code] = socket.id;
      console.log(`✅ ${role} ${code} joined.`);

      if (role === "admin") {
        // Admin nhận danh sách nhân viên đang online
        socket.emit("onlineUsers", Object.keys(onlineUsers));
      }
    });

    // Gửi tin nhắn
    socket.on("sendMessage", ({ toCode, message }) => {
      const toSocketId = onlineUsers[toCode];
      if (toSocketId) {
        io.to(toSocketId).emit("receiveMessage", {
          from: socket.userCode,
          message,
          time: new Date().toISOString(),
        });
      }
    });

    // Ngắt kết nối
    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.userCode);
      delete onlineUsers[socket.userCode];
    });
  });
};

