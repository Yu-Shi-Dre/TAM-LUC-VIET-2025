// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const admin = require("../config/firebase");

// [POST] /api/auth/login
// Client gửi: { code: "1234567890", idToken: "..." }
router.post("/login", async (req, res) => {
  const { code, idToken } = req.body;

  if (!code || !idToken) {
    return res.status(400).json({ message: "Thiếu mã code hoặc idToken." });
  }

  try {
    // Xác thực Firebase token
    const decoded = await admin.auth().verifyIdToken(idToken);
    const firebaseUID = decoded.uid;

    // Tìm user theo mã code
    let user = await User.findOne({ code });

    if (!user) {
      return res.status(404).json({ message: "Mã code không hợp lệ." });
    }

    // Gán Firebase UID cho mã code nếu chưa có
    if (!user.firebaseUID) {
      user.firebaseUID = firebaseUID;
      await user.save();
    } else if (user.firebaseUID !== firebaseUID) {
      return res.status(401).json({ message: "Mã code này đã được dùng bởi tài khoản khác." });
    }

    // Trả về thông tin người dùng và vai trò
    res.json({
      message: "Đăng nhập thành công!",
      role: user.role,
      code: user.code
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn." });
  }
});

module.exports = router;

