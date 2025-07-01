// middleware/authMiddleware.js
const admin = require("../config/firebase");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const firebaseUID = decoded.uid;

    const user = await User.findOne({ firebaseUID });
    if (!user) return res.status(401).json({ message: "Người dùng không tồn tại." });

    req.user = {
      uid: user.firebaseUID,
      role: user.role,
      code: user.code
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Token không hợp lệ." });
  }
};

module.exports = authMiddleware;

