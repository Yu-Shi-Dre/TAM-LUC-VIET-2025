const User = require("./models/User");

module.exports = (io) => {
  const onlineUsers = {};

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    socket.on("join", ({ code, role }) => {
      socket.userCode = code;
      socket.role = role;
      onlineUsers[code] = socket.id;
      console.log(`✅ ${role} ${code} joined.`);
    });

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

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected:", socket.userCode);
      delete onlineUsers[socket.userCode];
    });
  });
};