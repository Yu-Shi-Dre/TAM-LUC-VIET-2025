// script.js

// Danh sách công việc mẫu (sau này có thể lấy từ backend)
const jobs = [
  {
    title: "Nhân viên bán hàng",
    location: "Bắc Ninh",
    type: "Thời vụ",
    salaryType: "Theo ngày",
    description: "Cần tuyển gấp nhân viên bán hàng tại cửa hàng tiện lợi. Làm việc theo ca, có thưởng."
  },
  {
    title: "Kỹ sư cơ khí",
    location: "Bắc Giang",
    type: "Chính thức",
    salaryType: "Theo tháng",
    description: "Yêu cầu tốt nghiệp đại học chuyên ngành cơ khí. Có kinh nghiệm là một lợi thế."
  },
  {
    title: "Lao động phổ thông",
    location: "Bắc Ninh",
    type: "Thời vụ",
    salaryType: "Theo tuần",
    description: "Tuyển công nhân làm việc tại xưởng. Không yêu cầu kinh nghiệm. Hỗ trợ ăn ở."
  }
];

// DOM elements
const jobList = document.getElementById("job-listings");
const locationFilter = document.getElementById("locationFilter");
const typeFilter = document.getElementById("typeFilter");
const salaryFilter = document.getElementById("salaryFilter");

// Hàm hiển thị danh sách công việc
function renderJobs(filteredJobs) {
  jobList.innerHTML = "";

  if (filteredJobs.length === 0) {
    jobList.innerHTML = "<p>Không có công việc nào phù hợp.</p>";
    return;
  }

  filteredJobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h2>${job.title}</h2>
      <div class="job-meta">📍 ${job.location} | 💼 ${job.type} | 💰 ${job.salaryType}</div>
      <p>${job.description}</p>
    `;
    jobList.appendChild(jobCard);
  });
}

// Hàm lọc
function filterJobs() {
  const location = locationFilter.value;
  const type = typeFilter.value;
  const salary = salaryFilter.value;

  const filtered = jobs.filter(job => {
    return (!location || job.location === location) &&
           (!type || job.type === type) &&
           (!salary || job.salaryType === salary);
  });

  renderJobs(filtered);
}

// Sự kiện lọc
locationFilter.addEventListener("change", filterJobs);
typeFilter.addEventListener("change", filterJobs);
salaryFilter.addEventListener("change", filterJobs);

// Lần đầu hiển thị
renderJobs(jobs);
