// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10
  },
  firebaseUID: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["admin", "staff"],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

