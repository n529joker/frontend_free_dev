const cards = document.getElementById("cards");
const type = document.getElementById("type");
const categories = document.getElementById("categories");
const categories_div = document.getElementById("categories-div");
const pages = document.getElementById("pages");
const pages_div = document.getElementById("pages-div");

const loadDataParam = async (param) => {
  let URL = `https://pink-famous-eel.cyclic.app/data/BDrw56tuSiCp7lmg5K5NA69RBEAKgA08/${param}`;
  let res = await fetch(URL);
  let data = await res.json();
  type.innerHTML = `for ${param}`;
  getTags(data.data, "tag");
  displayCards(data.data);
  pages_div.innerHTML = "";
  categories_div.innerHTML = "";
};

const handleQuery = (e) => {
  e.preventDefault();
  let q = e.target.query.value;
  q = q.replace(/\s+/g, "+");
  loadDataQuery(q);
};

const loadData = async (Q, page = 0) => {
  page = page === 0 ? Math.round(Math.random() * 10) : page;
  let URL = `https://pink-famous-eel.cyclic.app/data/BDrw56tuSiCp7lmg5K5NA69RBEAKgA08/?page=${page}`;
  let res = await fetch(URL);
  let data = await res.json();
  if (data.Error) {
    cards.innerHTML = data.Error;
  } else {
    displayCards(data.data);
    getTags(data.data, "tag");
    displayPagination(data.pages);
  }
};

const loadDataQuery = async (Q) => {
  let URL = `https://pink-famous-eel.cyclic.app/data/BDrw56tuSiCp7lmg5K5NA69RBEAKgA08/?q=${Q}`;
  let res = await fetch(URL);
  let data = await res.json();
  categories_div.innerHTML = "";
  pages_div.innerHTML = "";
  if (data.Error) {
    cards.innerHTML = data.Error;
  } else {
    displayCards(data.data);
  }
};

const displayCards = (data) => {
  cards.innerHTML = "";
  for (let item of data) {
    let card = document.createElement("div");
    card.classList.add("card", "info-card", "customers-card");
    card.innerHTML = `
      <div class="card-body">
          <h5 class="card-title text-center">${item.title}</h5>
              <hr/>
              <div class="d-flex align-items-center justify-content-center flex-lg-row flex-sm-row">
                  <img class="icon rounded" width="100" src="${item.imgSrc}" onerror="this.src='assets/img/logo.png'"/>
                  </div>
  
                  <div class="ps-3">
                  <div>
                    <p class="text-left small pt-1 fw-bold">Description</p>
                    <p class="text small">${item.description}</p>
                  </div>
                  <div>
                  <p class="text-left small pt-1 fw-bold">Tags</p>
                  <p class="text small">${item.tag}</p>
                  </div>
                    <a type="button" class="btn btn-outline-secondary" href="${item.link}" onerror="this.href='#'">visit site</a>
                  </div>
              </div>
          </div>
      `;
    cards.appendChild(card);
  }
};

const displayPagination = (data) => {
  pages.innerHTML = "";

  const previousLink = `
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;
  pages.insertAdjacentHTML("beforeend", previousLink);

  for (let i = 1; i <= data; i++) {
    const pageLink = `
      <li class="page-item">
        <a class="page-link" href="#" onclick="loadData(${i})">${i}</a>
      </li>
    `;
    pages.insertAdjacentHTML("beforeend", pageLink);
  }

  const nextLink = `
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
  pages.insertAdjacentHTML("beforeend", nextLink);
};

const getTags = (data, tag) => {
  const tags = [];
  let data_ = data.map((item) => item[tag]);
  for (let tag of data_) {
    if (tag !== null) {
      if (tag.includes(",")) {
        let itags = tag.split(",");
        for (let itag of itags) {
          tags.push(itag.trim());
        }
      } else {
        tags.push(tag.trim());
      }
    }
  }
  displayCategories(tags);
};

const displayCategories = (tags) => {
  categories.innerHTML = "";
  for (let tag of tags) {
    let button = document.createElement("a");
    button.innerHTML = tag;
    button.href = "#";
    button.setAttribute("id", tag);
    button.classList.add("btn", "btn-outline-secondary", "m-1");
    button.onclick = () => loadDataParam(tag);
    categories.appendChild(button);
  }
};

const changeIcon = (e) => {
  let elClasses = e.target.classList;
  let elId = e.target.getAttribute("id");
  if (elClasses.contains("bi-x")) {
    let new_class = elId === "bars" ? "bi-bars" : "bi-search";
    elClasses.remove("bi-x");
    elClasses.add(new_class);
  } else {
    elClasses.remove(elId === "bars" ? "bi-bars" : "bi-search");
    elClasses.add("bi-x");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
