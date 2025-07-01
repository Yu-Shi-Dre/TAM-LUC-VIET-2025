// chat.js

const socket = io("http://localhost:5000");

const code = localStorage.getItem("code");
const role = localStorage.getItem("role");

if (!code || !role) {
  alert("Bạn cần đăng nhập.");
  window.location.href = "login.html";
}

const messages = document.getElementById("messages");
const toCodeInput = document.getElementById("toCode");
const messageInput = document.getElementById("message");

// Gửi thông tin khi kết nối
socket.emit("join", { code, role });

// Gửi tin nhắn
function sendMessage() {
  const toCode = toCodeInput.value.trim();
  const msg = messageInput.value.trim();
  if (!toCode || !msg) return;

  socket.emit("sendMessage", { toCode, message: msg });

  displayMessage(code, msg, true); // hiển thị tin tự gửi
  messageInput.value = "";
}

// Nhận tin nhắn
socket.on("receiveMessage", ({ from, message, time }) => {
  displayMessage(from, message, false);
});

// Hiển thị tin
function displayMessage(from, message, isSelf) {
  const div = document.createElement("div");
  div.className = "msg" + (isSelf ? " self" : "");
  div.innerHTML = `<strong>${from}:</strong> ${message}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

