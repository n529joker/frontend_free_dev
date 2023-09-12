const cards = document.getElementById("cards");
const categories = document.getElementById("categories");
const loadData = async () => {
  let res = await fetch(
    "https://pink-famous-eel.cyclic.app/data/BDrw56tuSiCp7lmg5K5NA69RBEAKgA08/?num=30"
  );
  let data = await res.json();
  for (let item of data.data) {
    let card = document.createElement("div");
    card.classList.add("card", "info-card", "customers-card");
    card.innerHTML = `
    <div class="card-body">
        <h5 class="card-title text-center">${item.title}</h5>
            <hr/>
            <div class="d-flex align-items-center justify-content-center flex-lg-row flex-sm-row">
                <img class="icon rounded" width="100" src="${item.imgSrc}" alt="LOGO" />
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
                  <a type="button" class="btn btn-outline-secondary" href="${item.link}">visit site</a>
                </div>
            </div>
        </div>
    `;
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
        button.innerHTML = item.tag
        categories.appendChild(button);
      }
    }
    cards.appendChild(card)
  }
};

document.addEventListener("DOMContentLoaded", loadData);
