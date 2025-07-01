// models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  type: String,         // Chính thức / Thời vụ
  salaryType: String    // Theo ngày / tháng / tuần
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);

