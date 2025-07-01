// admin.js

const BASE_URL = "https://tam-luc-viet-2025.onrender.com";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

// Bảo vệ trang: chỉ admin mới vào được
if (!token || role !== "admin") {
  alert("Bạn không có quyền truy cập.");
  window.location.href = "login.html";
}

const api = `${BASE_URL}/api/jobs`;

async function fetchJobs() {
  try {
    const res = await fetch(api);
    if (!res.ok) throw new Error("Không thể tải danh sách công việc.");
    const jobs = await res.json();

    const listings = document.getElementById("job-listings");
    listings.innerHTML = "<h2>📄 Danh sách công việc</h2>";

    jobs.forEach(job => {
      const div = document.createElement("div");
      div.className = "job-card";
      div.innerHTML = `
        <h3>${job.title}</h3>
        <p>📍 ${job.location} | 💼 ${job.type} | 💰 ${job.salaryType}</p>
        <p>${job.description}</p>
        <button onclick="deleteJob('${job._id}')">❌ Xoá</button>
      `;
      listings.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    document.getElementById("job-listings").innerHTML =
      "<p style='color:red;'>❌ Không thể tải dữ liệu từ máy chủ.</p>";
  }
}

async function createJob() {
  const title = document.getElementById("title").value.trim();
  const location = document.getElementById("location").value.trim();
  const type = document.getElementById("type").value.trim();
  const salaryType = document.getElementById("salaryType").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !location || !type || !salaryType || !description) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  try {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, location, type, salaryType, description }),
    });

    if (res.ok) {
      alert("✅ Đã thêm công việc!");
      fetchJobs();
    } else {
      const err = await res.text();
      alert("❌ Thêm thất bại: " + err);
    }
  } catch (err) {
    console.error("❌ Lỗi tạo bài:", err);
    alert("Không thể kết nối tới máy chủ.");
  }
}

async function deleteJob(id) {
  if (!confirm("Bạn chắc chắn muốn xoá công việc này?")) return;

  try {
    const res = await fetch(`${api}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      alert("🗑️ Đã xoá thành công!");
      fetchJobs();
    } else {
      alert("❌ Không thể xoá công việc này.");
    }
  } catch (err) {
    console.error("❌ Lỗi xoá bài:", err);
    alert("Không thể kết nối tới máy chủ.");
  }
}

// Gọi API ban đầu khi trang tải
fetchJobs();
