const jobList = document.getElementById('job-list');
const filters = {
  location: document.getElementById('filter-location'),
  type: document.getElementById('filter-type'),
  salary: document.getElementById('filter-salary'),
  status: document.getElementById('filter-status')
};

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
  const filtered = jobs.filter(job => {
    return (!filters.location.value || job.location === filters.location.value) &&
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
  jobs.forEach(job => {
    const div = document.createElement('div');
    div.className = 'job-card' + (job.status === 'Ngưng tuyển' ? ' closed' : '');
    div.innerHTML = `
      <h3>${job.position} - ${job.company}</h3>
      <p><strong>Khu vực:</strong> ${job.location}</p>
      <p><strong>Loại việc:</strong> ${job.type}</p>
      <p><strong>Lương:</strong> ${job.salary}</p>
      <p><strong>Trạng thái:</strong> ${job.status}</p>
    `;
    jobList.appendChild(div);
  });
}
