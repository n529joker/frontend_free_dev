const cards = document.getElementById("cards");
const type = document.getElementById("type");
const categories = document.getElementById("categories");
const categories_div = document.getElementById("categories-div");
const pages = document.getElementById("pages");
const pages_div = document.getElementById("pages-div");

const loadData = async (q = "", page = 0, num = 50) => {
  let URL =
    "https://pink-famous-eel.cyclic.app/data/BDrw56tuSiCp7lmg5K5NA69RBEAKgA08/";
  cards.innerHTML = "";
  categories.innerHTML = "";
  pages.innerHTML = "";
  let data, res;
  if (q !== "") {
    URL = `${URL}?q=${q}`;
    res = await fetch(URL);
    data = await res.json();
    if (!data.Error) {
      type.innerHTML = `for '${q}'`;
      displayCards(data.data);
    } else {
      cards.innerHTML = `Results for '${q}' not found. Try another search term.`;
      categories_div.style.display = "none";
      pages_div.style.display = "none";
    }
  } else {
    if (page >= 1) {
      URL = `${URL}?page=${page}`;
    } else {
      URL = `${URL}?page=4`;
    }
    res = await fetch(URL);
    data = await res.json();
    displayCards(data.data);
    displayPagination(data.pages);
    displayCategories(data.data);
  }
};

const handleQuery = (e) => {
  e.preventDefault();
  let q = e.target.query.value;
  //check for all instances of whitespace, replace with +
  q = q.replace(/\s+/g, "+");
  loadData(q);
};

const displayCards = (data) => {
  for (let item of data) {
    let card = document.createElement("div");
    card.classList.add("card", "info-card", "customers-card");
    card.innerHTML = `
    <div class="card-body">
        <h5 class="card-title text-center">${item.title}</h5>
            <hr/>
            <div class="d-flex align-items-center justify-content-center flex-lg-row flex-sm-row">
                <img class="icon rounded" width="100" src="${item.imgSrc}" onerror="this.src='assets/img/logo2.png'" alt="LOGO" />
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
  let li = document.createElement("li");
  li.classList.add("page-item");
  li.innerHTML = `<a class="page-link" href="#" aria-label="Previous">
  <span aria-hidden="true">&laquo;</span>
</a>`;
  pages.appendChild(li);
  for (let i = 1; i <= data; i++) {
    let li = document.createElement("li");
    li.classList.add("page-item");
    li.innerHTML = `<a class="page-link" href="#" onclick="loadData(${i})">${i}</a>`;
    pages.appendChild(li);
  }
  let li2 = document.createElement("li");
  li2.classList.add("page-item");
  li2.innerHTML = `<a class="page-link" href="#" aria-label="Next">
  <span aria-hidden="true">&raquo;</span>
</a>`;
  pages.appendChild(li2);
};

const displayCategories = (data) => {
  for (let item of data) {
    if (item.tag) {
      if (item.tag.includes(",")) {
        let tags = item.tag.split(",");
        for (let tag of tags) {
          let button = document.createElement("a");
          button.innerHTML = tag;
          button.classList.add("btn", "btn-outline-secondary", "m-1");
          categories.appendChild(button);
        }
      } else {
        let button = document.createElement("a");
        button.classList.add("btn", "btn-outline-secondary", "m-1");
        button.innerHTML = item.tag;
        categories.appendChild(button);
      }
    }
  }
};

const changeIcon = (e) => {
  //change the bi-search icon to bi-x when clicked and vice versa
  const icon = document.getElementById("search-icon");
  if (icon.classList.contains("bi-search")) {
    icon.classList.remove("bi-search");
    icon.classList.add("bi-x");
  } else {
    icon.classList.remove("bi-x");
    icon.classList.add("bi-search");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
