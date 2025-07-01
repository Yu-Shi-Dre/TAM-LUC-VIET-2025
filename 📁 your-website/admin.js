// admin.js

const token = localStorage.getItem("token");
if (!token || localStorage.getItem("role") !== "admin") {
  alert("Bạn không có quyền truy cập.");
  window.location.href = "login.html";
}

const api = "http://localhost:5000/api/jobs";

async function fetchJobs() {
  const res = await fetch(api);
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
}

async function createJob() {
  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
  const salaryType = document.getElementById("salaryType").value;
  const description = document.getElementById("description").value;

  const res = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, location, type, salaryType, description }),
  });

  if (res.ok) {
    alert("Đã thêm!");
    fetchJobs();
  } else {
    alert("Lỗi khi thêm.");
  }
}

async function deleteJob(id) {
  if (!confirm("Bạn chắc chắn muốn xoá?")) return;

  const res = await fetch(`${api}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    alert("Đã xoá!");
    fetchJobs();
  } else {
    alert("Không xoá được.");
  }
}

// Gọi ban đầu
fetchJobs();

