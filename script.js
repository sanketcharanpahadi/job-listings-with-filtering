const jobs = document.querySelector(".jobs");
let clearEl;
let removeEl;
let domArray;

window.onload = function () {
  getData();
};

const getData = async function () {
  const response = await fetch("./data.json");
  const data = await response.json();
  domArray = [...data];
  showJobs(domArray);

  const jobTags = document.querySelectorAll(".job-tags");
  [...jobTags].forEach((item) => {
    item.addEventListener("click", function (e) {
      const target = e.target;
      if (target.classList.contains("tag")) {
        addToFilter(target.textContent);
      }
    });
  });

  for (let i = 0; i < data.length; i++) {
    addTags([...data[i].languages, ...data[i].tools], i);
  }

  const newEl = document.querySelectorAll(".new");
  const featuredEl = document.querySelectorAll(".featured");
  removeNew([...newEl]);
  removeNew([...featuredEl]);
};

const showJobs = function (array) {
  array.forEach((item) => {
    const jobEl = ` <div class="job" id=${item.id}>
        <div class="about-job">
          <img src=${item.logo} class="company-img" alt="" />
          <div class="company-name">
            <h3>${item.company}</h3>
            <span class="new">${item.new == true ? "NEW" : ""}</span>
            <span class="featured">${
              item.featured == true ? "FEATURED" : ""
            }</span>
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
    jobs.insertAdjacentHTML("beforeend", jobEl);
  });
};

function addTags(array, i) {
  const tags = document.querySelector(`.job-tags-${i + 1}`);
  array.forEach((item) => {
    const tagEl = `<span class="tag">${item}</span>`;
    tags.insertAdjacentHTML("beforeend", tagEl);
  });
}

function removeNew(arr) {
  arr.forEach((item) => {
    if (item.textContent.trim() == "") {
      item.style.backgroundColor = "#fff";
    }
  });
}

function addToFilter(text) {
  const filtersEl = document.querySelector(".filters");
  const filterEl = `<div class="filter">
    <span>${text}</span>
    <img src="images/icon-remove.svg" class="remove" alt="" />
  </div>`;
  filtersEl.insertAdjacentHTML("beforeend", filterEl);

  clearEl = document.querySelector(".clear");
  clearEl.addEventListener("click", function () {
    clearFilters();
  });

  removeEl = document.querySelectorAll(".remove");
  removeElement([...removeEl]);
}

function clearFilters() {
  document.querySelector(".filters").innerHTML = "";
}

function removeElement(arr) {
  arr.forEach((item) => {
    item.addEventListener("click", function () {
      item.parentElement.remove();
    });
  });
}
