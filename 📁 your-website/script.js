// script.js

const jobList = document.getElementById("job-listings");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const salaryFilter = document.getElementById("salaryFilter");

let jobs = [];

async function fetchJobs() {
  try {
    const res = await fetch("https://tam-luc-viet-2025.onrender.com/api/jobs");

    jobs = await res.json();
    renderFilters();
    renderJobs(jobs);
  } catch (err) {
    jobList.innerHTML = "<p>Lỗi khi tải dữ liệu.</p>";
    console.error(err);
  }
}

function renderFilters() {
  const locations = [...new Set(jobs.map(job => job.location))];
  locationFilter.innerHTML += locations.map(loc => `<option value="${loc}">${loc}</option>`).join("");
}

function renderJobs(data) {
  jobList.innerHTML = "";

  if (data.length === 0) {
    jobList.innerHTML = "<p>Không có công việc phù hợp.</p>";
    return;
  }

  data.forEach(job => {
    const card = document.createElement("div");
    card.className = "job-card";
    card.innerHTML = `
      <h2>${job.title}</h2>
      <div class="job-meta">📍 ${job.location} | 💼 ${job.type} | 💰 ${job.salaryType}</div>
      <p>${job.description}</p>
    `;
    jobList.appendChild(card);
  });
}

function filterJobs() {
  const loc = locationFilter.value;
  const type = typeFilter.value;
  const salary = salaryFilter.value;

  const filtered = jobs.filter(job =>
    (!loc || job.location === loc) &&
    (!type || job.type === type) &&
    (!salary || job.salaryType === salary)
  );

  renderJobs(filtered);
}

// Gán sự kiện bộ lọc
locationFilter.addEventListener("change", filterJobs);
typeFilter.addEventListener("change", filterJobs);
salaryFilter.addEventListener("change", filterJobs);

// Tải lần đầu
fetchJobs();
