// routes/jobs.js
const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

// [GET] /api/jobs - Ai cũng có thể xem
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách công việc." });
  }
});

// [POST] /api/jobs - Chỉ Admin mới thêm được
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ quản trị viên mới có quyền." });
  }

  try {
    const { title, description, location, type, salaryType } = req.body;
    const job = new Job({ title, description, location, type, salaryType });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi thêm công việc." });
  }
});

// [PUT] /api/jobs/:id - Chỉ Admin mới sửa
router.put("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Không có quyền sửa." });
  }

  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Không tìm thấy công việc." });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật công việc." });
  }
});

// [DELETE] /api/jobs/:id - Chỉ Admin mới xoá
router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Không có quyền xoá." });
  }

  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy công việc." });
    res.json({ message: "Đã xoá công việc." });
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi xoá công việc." });
  }
});

module.exports = router;

