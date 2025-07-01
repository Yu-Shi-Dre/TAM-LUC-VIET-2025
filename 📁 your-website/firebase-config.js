// firebase-config.js
// Ngọc phải thay bằng cấu hình thật từ Firebase Console
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIza....", // 🔑 thay bằng của bạn
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  appId: "1:xxx:web:xxx"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

