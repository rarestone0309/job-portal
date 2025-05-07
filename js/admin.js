const jobForm = document.getElementById("jobForm");
const jobsTable = document.getElementById("jobsTable").querySelector("tbody");

// Load jobs from LocalStorage on page load
document.addEventListener("DOMContentLoaded", loadJobs);

// Add new job
jobForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("jobTitle").value;
  const location = document.getElementById("jobLocation").value;
  const description = document.getElementById("jobDescription").value;

  const job = { title, location, description };

  saveJobToStorage(job);
  addJobToTable(job);

  jobForm.reset();
});

// Save job to LocalStorage
function saveJobToStorage(job) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

// Add job to table
function addJobToTable(job) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${job.title}</td>
    <td>${job.location}</td>
    <td>${job.description}</td>
    <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
  `;
  jobsTable.appendChild(newRow);
}

// Load all jobs
function loadJobs() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.forEach(addJobToTable);
}

// Delete job
jobsTable.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    const title = row.children[0].textContent;

    row.remove();
    deleteJobFromStorage(title);
  }
});

// Delete from LocalStorage
function deleteJobFromStorage(title) {
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs = jobs.filter((job) => job.title !== title);
  localStorage.setItem("jobs", JSON.stringify(jobs));
}
