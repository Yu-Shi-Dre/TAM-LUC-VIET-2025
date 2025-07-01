// login.js
import { auth } from "./firebase-config.js";
import {
  signInAnonymously,
  getIdToken
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const code = document.getElementById("code").value;
  if (!/^\d{10}$/.test(code)) {
    alert("Mã code phải đủ 10 chữ số.");
    return;
  }

  try {
    const userCredential = await signInAnonymously(auth);
    const idToken = await getIdToken(userCredential.user, true);

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, idToken })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", idToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("code", code);

      alert("Đăng nhập thành công!");
      if (data.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      alert(data.message || "Lỗi đăng nhập");
    }
  } catch (err) {
    alert("Lỗi Firebase");
    console.error(err);
  }
});
