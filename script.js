let jobList = document.getElementById('job-list');
const filters = {
  location: document.getElementById('filter-location'),
  type: document.getElementById('filter-type'),
  salary: document.getElementById('filter-salary'),
  status: document.getElementById('filter-status')
};
const searchInput = document.getElementById('search-input');

let jobs = [];

fetch('data/jobs.json')
  .then(res => res.json())
  .then(data => {
    jobs = data;
    populateFilters();
    displayJobs(jobs);
  });

function populateFilters() {
  const locSet = new Set();
  const typeSet = new Set();
  const salarySet = new Set();
  const statusSet = new Set();

  jobs.forEach(job => {
    locSet.add(job.location);
    typeSet.add(job.type);
    salarySet.add(job.salary);
    statusSet.add(job.status);
  });

  populateSelect(filters.location, locSet);
  populateSelect(filters.type, typeSet);
  populateSelect(filters.salary, salarySet);
  populateSelect(filters.status, statusSet);

  Object.values(filters).forEach(filter => filter.addEventListener('change', applyFilters));
  searchInput.addEventListener('input', applyFilters);
}

function populateSelect(select, items) {
  items.forEach(item => {
    const option = document.createElement('option');
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const filtered = jobs.filter(job => {
    const matchKeyword = !keyword ||
      job.company.toLowerCase().includes(keyword) ||
      job.position.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword);

    return matchKeyword &&
           (!filters.location.value || job.location === filters.location.value) &&
           (!filters.type.value || job.type === filters.type.value) &&
           (!filters.salary.value || job.salary === filters.salary.value) &&
           (!filters.status.value || job.status === filters.status.value);
  });
  displayJobs(filtered);
}

function displayJobs(jobs) {
  jobList.innerHTML = '';
  if (jobs.length === 0) {
    jobList.innerHTML = '<p>Không có bài đăng phù hợp.</p>';
    return;
  }
  jobs.forEach((job, index) => {
    const div = document.createElement('div');
    div.className = 'job-card' + (job.status === 'Ngưng tuyển' ? ' closed' : '');
    div.innerHTML = `
      <h3>${job.position} - ${job.company}</h3>
      <p><strong>Khu vực:</strong> ${job.location}</p>
      <p><strong>Loại việc:</strong> ${job.type}</p>
      <p><strong>Lương:</strong> ${job.salary}</p>
      <p><strong>Trạng thái:</strong> <span id="status-${index}">${job.status}</span></p>
      <p><strong>Mô tả:</strong> ${job.description.replace(/\\n/g, '<br>')}</p>

      <button class="status-toggle" onclick="toggleStatus(${index})">Chuyển trạng thái</button>
    `;
    jobList.appendChild(div);
  });
}

function toggleStatus(index) {
  jobs[index].status = jobs[index].status === 'Đang tuyển' ? 'Ngưng tuyển' : 'Đang tuyển';
  displayJobs(jobs);
}

function addJob() {
  const newJob = {
    company: document.getElementById('company').value,
    position: document.getElementById('position').value,
    location: document.getElementById('location').value,
    type: document.getElementById('type').value,
    salary: document.getElementById('salary').value,
    description: document.getElementById('description').value,
    status: 'Đang tuyển'
  };
  jobs.push(newJob);
  displayJobs(jobs);
  document.querySelectorAll('.upload-form input, .upload-form textarea').forEach(input => input.value = '');
}
