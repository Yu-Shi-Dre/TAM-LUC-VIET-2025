// script.js

const BASE_URL = "https://tam-luc-viet-2025.onrender.com";
const jobList = document.getElementById("job-listings");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const salaryFilter = document.getElementById("salaryFilter");

let jobs = [];

async function fetchJobs() {
  try {
    const res = await fetch(`${BASE_URL}/api/jobs`);
    if (!res.ok) throw new Error("Không thể tải dữ liệu.");
    jobs = await res.json();

    renderFilterOptions();
    renderJobs(jobs);
  } catch (err) {
    jobList.innerHTML = "<p style='color:red;'>❌ Lỗi khi tải dữ liệu từ máy chủ.</p>";
    console.error("❌ Lỗi:", err);
  }
}

function renderFilterOptions() {
  const locations = [...new Set(jobs.map(job => job.location))];
  const types = [...new Set(jobs.map(job => job.type))];
  const salaries = [...new Set(jobs.map(job => job.salaryType))];

  locationFilter.innerHTML = `<option value="">-- Tất cả khu vực --</option>` +
    locations.map(loc => `<option value="${loc}">${loc}</option>`).join("");

  typeFilter.innerHTML = `<option value="">-- Tất cả loại việc --</option>` +
    types.map(type => `<option value="${type}">${type}</option>`).join("");

  salaryFilter.innerHTML = `<option value="">-- Tất cả hình thức lương --</option>` +
    salaries.map(sal => `<option value="${sal}">${sal}</option>`).join("");
}

function renderJobs(data) {
  jobList.innerHTML = "";

  if (data.length === 0) {
    jobList.innerHTML = "<p>⚠️ Không có công việc phù hợp với bộ lọc hiện tại.</p>";
    return;
  }

  data.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h3>${job.title}</h3>
      <div class="job-meta">📍 ${job.location} | 💼 ${job.type} | 💰 ${job.salaryType}</div>
      <p>${job.description}</p>
    `;
    jobList.appendChild(card);
  });
}

function filterJobs() {
  const selectedLocation = locationFilter.value;
  const selectedType = typeFilter.value;
  const selectedSalary = salaryFilter.value;

  const filtered = jobs.filter(job =>
    (!selectedLocation || job.location === selectedLocation) &&
    (!selectedType || job.type === selectedType) &&
    (!selectedSalary || job.salaryType === selectedSalary)
  );

  renderJobs(filtered);
}

// Gán sự kiện cho bộ lọc
locationFilter.addEventListener("change", filterJobs);
typeFilter.addEventListener("change", filterJobs);
salaryFilter.addEventListener("change", filterJobs);

// Gọi API lần đầu khi trang tải
fetchJobs();
