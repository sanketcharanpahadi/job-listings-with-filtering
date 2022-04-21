const jobs = document.querySelector(".jobs");
let tags;
let jobsArray;

const addCards = async function () {
  const data = await fetch("./data.json");
  jobsArray = await data.json();

  showCards(jobsArray);
};

function showCards(Array) {
  Array.map(function (ele) {
    const jobEl = `<div class="job upper-class-name">
    <div class = "upper">
      <img src="${ele.logo}" alt="" class="company-img" />
      <div class="company flex">
        <span class="company-name">${ele.company}</span>
        <span class="new">${ele.new === true ? "new!" : ""}</span>
        <span class="featured">${ele.featured === true ? "featured" : ""}</span>
      </div>

      <h1 class="role">${ele.position}</h1>

      <div class="job-listing flex">
        <span class="posted">${ele.postedAt}</span>
        <span class="contract">${ele.contract}</span>
        <span class="location">${ele.location}</span>
      </div>
      </div>

      <hr />

      <div class="tags-${ele.id} tags flex">
        
      </div>

    </div>`;
    jobs.insertAdjacentHTML("beforeend", jobEl);
    tags = document.querySelector(`.tags-${ele.id}`);
    roleEle(ele.role, tags);
    levelEl(ele.level, tags);
    spanEle(ele.languages, tags);
    toolEle(ele.tools, tags);
  });

  const newEl = document.querySelectorAll(".new");
  const featureEl = document.querySelectorAll(".featured");
  remove(newEl);
  remove(featureEl);
}

function spanEle(arr, tags) {
  arr.map((ele) => {
    const span = `<span>${ele}</span>`;
    tags.insertAdjacentHTML("beforeend", span);
  });
}

function roleEle(ele, tags) {
  const spanRole = `<span>${ele}</span>`;
  tags.insertAdjacentHTML("beforeend", spanRole);
}

function toolEle(arr, tags) {
  arr.map((ele) => {
    const span = `<span>${ele}</span>`;
    tags.insertAdjacentHTML("beforeend", span);
  });
}

function levelEl(ele, tags) {
  const span = `<span>${ele}</span>`;
  tags.insertAdjacentHTML("beforeend", span);
}

function remove(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].textContent === "") {
      arr[i].style.background = "white";
    }
  }
}

addCards();
