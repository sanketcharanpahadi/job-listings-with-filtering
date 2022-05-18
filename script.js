const jobsEl = document.querySelector(".jobs");
const filtersEl = document.querySelector(".filters");
let jobArray = [];
let retake = [];

// fetching data from data.json
const getJsonData = async function () {
  const response = await fetch("./data.json");
  jobArray = await response.json();
  retake = [...jobArray];
  populateDOM(jobArray);

  //   console
};

getJsonData();

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

// adding all the tags of each item
function addTags(array) {
  array.forEach((item) => {
    const tagsEl = document.querySelector(`.job-tags-${item.id}`);
    const childTag = [...item.languages, ...item.tools];
    for (let i = 0; i < childTag.length; i++) {
      const tagEl = ` <span class="tag">${childTag[i]}</span>`;
      tagsEl.insertAdjacentHTML("beforeend", tagEl);
    }
  });
}

// calling all the functions together
function populateDOM(array) {
  addToDom(array);
  addNewFeatured(array);
  addTags(array);
}

function addToFiltersDOM(text) {
  const filterEl = `<div class="filter">
    <span>${text}</span>
    <img src="images/icon-remove.svg" class="remove" alt="" />
  </div>`;
  filtersEl.insertAdjacentHTML("beforeend", filterEl);
}

// filtering the jobArray values
function filter(text) {
  jobArray = jobArray.filter((item) => {
    if (
      [...item.languages, ...item.tools, item.level, item.role].includes(text)
    ) {
      return item;
    }
  });
  jobsEl.innerHTML = "";
  populateDOM(jobArray);
}

function updateDOM() {
  jobsEl.innerHTML = "";
  const filterChildEl = filtersEl.querySelectorAll(".filter");
  [...filterChildEl].forEach((item) => {
    filter(item.children[0].textContent);
  });
}

jobsEl.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("tag")) {
    filtersEl.classList.add("active");
    addToFiltersDOM(target.textContent);
    updateDOM();
  }
});

filtersEl.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("remove")) {
    target.parentElement.remove();
    if (filtersEl.childElementCount > 1) {
      jobArray = [...retake];
      const filterChildEl = filtersEl.querySelectorAll(".filter");
      [...filterChildEl].forEach((item) => {
        filter(item.children[0].textContent);
      });
    } else {
      filtersEl.classList.remove("active");
      jobsEl.innerHTML = "";
      getJsonData();
    }
  } else if (target.classList.contains("clear")) {
    const filterChilds = filtersEl.querySelectorAll(".filter");
    [...filterChilds].forEach((item) => item.remove());
    filtersEl.classList.remove("active");
    jobsEl.innerHTML = "";
    getJsonData();
  }
});
