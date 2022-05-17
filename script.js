const jobsEl = document.querySelector(".jobs");
let jobArray = [];

// fetching data from data.json
const getJsonData = async function () {
  const response = await fetch("./data.json");
  jobArray = await response.json();
  console.log(jobArray);

  populateDOM(jobArray);
};

// adding job cards to the dom
function addToDom(array) {
  array.forEach((item) => {
    const jobEL = `<div class="job" id=${item.id}>
        <div class="about-job">
          <img src=${item.logo} class="company-img" alt="" />
          <div class="company-name company-name-${item.id}">
            <h3>${item.company}</h3>
            
          </div>
          <h3 class="role">${item.position}</h3>
          <div class="timing">
            <span class="time">${item.postedAt}</span>
            <span class="type">${item.contract}</span>
            <span class="region">${item.location}</span>
          </div>
        </div>
        <div class="job-tags-${item.id} job-tags">
        <span class="tag">${item.role}</span>
        <span class="tag">${item.level}</span>
        </div>
      </div>`;
    jobsEl.insertAdjacentHTML("beforeend", jobEL);
  });
}

getJsonData();

// adding new and featured tag
function addNewFeatured(array) {
  array.forEach((item) => {
    const companyName = document.querySelector(`.company-name-${item.id}`);
    if (item.new) {
      const newEl = `<span class="new">NEW</span>`;
      companyName.insertAdjacentHTML("beforeend", newEl);
    }
    if (item.featured) {
      const featuredEl = `<span class="featured">FEATURED</span>`;
      companyName.insertAdjacentHTML("beforeend", featuredEl);
    }
  });
}

function addTags(array) {}

// calling all the functions together
function populateDOM(array) {
  addToDom(array);
  addNewFeatured(array);
}
