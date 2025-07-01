// chat.js

const BASE_URL = "https://tam-luc-viet-2025.onrender.com";
const socket = io(BASE_URL, {
  transports: ["websocket"], // đảm bảo dùng WebSocket trên Render
});

const code = localStorage.getItem("code");
const role = localStorage.getItem("role");

// Kiểm tra đăng nhập
if (!code || !role) {
  alert("Bạn cần đăng nhập.");
  window.location.href = "login.html";
}

const messages = document.getElementById("messages");
const toCodeInput = document.getElementById("toCode");
const messageInput = document.getElementById("message");

// Khi kết nối, gửi mã code và vai trò cho server
socket.emit("join", { code, role });

// Gửi tin nhắn
function sendMessage() {
  const toCode = toCodeInput.value.trim();
  const msg = messageInput.value.trim();

  if (!toCode || !msg) {
    alert("Nhập mã người nhận và nội dung.");
    return;
  }

  socket.emit("sendMessage", { toCode, message: msg });
  displayMessage(code, msg, true);
  messageInput.value = "";
}

// Nhận tin nhắn
socket.on("receiveMessage", ({ from, message }) => {
  displayMessage(from, message, false);
});

// Hiển thị tin nhắn lên giao diện
function displayMessage(from, message, isSelf) {
  const div = document.createElement("div");
  div.className = "msg" + (isSelf ? " self" : "");
  div.innerHTML = `
    <p><strong>${isSelf ? "Tôi" : from}:</strong> ${message}</p>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
