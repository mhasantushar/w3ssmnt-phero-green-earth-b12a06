// console.log ("connected");
const categListWrapperElem = document.getElementById("lov-categ-wrapper");
const plantCardWrapperElem = document.getElementById("tree-card-wrapper");

//SECTION - common functions
const unselectAllCategories = () => {
  const categs = document.querySelectorAll(".categ");
  // console.log (categs);
  categs.forEach((elem) => {
    elem.classList.remove("selected-categ");
  });

  //dealing with "All Tree" lov, the special category
  document.getElementById("0").classList.remove("selected-categ");
};

const moveCategSelectionById = (categId) => {
  unselectAllCategories();
  const categ = document.getElementById(categId);
  categ.classList.add("selected-categ");
};

const moveCategSelectionByElem = (categElem) => {
  unselectAllCategories();
  categElem.classList.add("selected-categ");
};

const showMainSpinner = (isVisible) => {
  const mainSpinner = document.getElementById("main-spinner");

  if (isVisible) mainSpinner.classList.remove("hidden");
  else mainSpinner.classList.add("hidden");
};
//!SECTION common functions

//SECTION - populating api data
const fetchPlantCategories = () => {
  showMainSpinner(true);
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => listPlantCategories(data.categories))
    .catch((err) => alert("Error:", err));
};

const listPlantCategories = (categCollection) => {
  // console.log (arrCategs);
  // const categListWrapperElem = document.getElementById("lov-categ-wrapper");
  categCollection.forEach((elem) => {
    categListWrapperElem.innerHTML += `
      <li id="${elem.id}" 
        class="categ hover:bg-[#CFF0DC] px-3 py-1 rounded cursor-pointer" 
        title="${elem.small_description}">${elem.category_name}</li>
    `;
  });
  showMainSpinner(false);
};

const fetchAllPlantsData = () => {
  showMainSpinner(true);
  const url = "https://openapi.programming-hero.com/api/plants";

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => popuAllPlantCards(data.plants))
    .catch((err) => alert("Error:", err));
};

const fetchPlantsDataByCateg = (categId) => {
  showMainSpinner(true);

  const url =
    categId == 0
      ? "https://openapi.programming-hero.com/api/plants"
      : "https://openapi.programming-hero.com/api/category/" + categId;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => popuAllPlantCards(data.plants))
    .catch((err) => alert("Error:", err));
};

const popuAllPlantCards = (plantCollection) => {
  // console.log (plantCollection);
  // const plantCardWrapperElem = document.getElementById("tree-card-wrapper");

  const htmlString = plantCollection.map(
    (elem) => `
                <article id="${elem.id}" class="bg-white p-4 rounded-lg">
                  <figure class="bg-[#EDEDED] mb-3 rounded-lg">
                    <img class="rounded-lg h-60 w-full" src="${elem.image}" alt="${elem.name}">
                  </figure>

                  <h3 class="mb-2 font-semibold text-[#1F2937]">${elem.name}</h3>
                  <p class="mb-3 text-[#1F2937] text-xs line-clamp-3">${elem.description}</p>

                  <div class="flex justify-between items-center mb-3">
                    <h4 class="bg-[#DCFCE7] px-3 py-1 rounded-full font-semibold text-[#15803D] text-sm">${elem.category}</h4>
                    <p class="font-semibold text-[#1F2937] text-sm"><i
                        class="fa-solid fa-bangladeshi-taka-sign"></i><span>${elem.price}</span></p>
                  </div>
                  <button class="rounded-full w-full font-medium text-white btn btn-success">Add to Cart</button>
                </article>
    `
  );
  // console.log (htmlString);
  plantCardWrapperElem.innerHTML = htmlString.join(" ");
  showMainSpinner(false);
};
//!SECTION populating api data

//SECTION - first functions
fetchPlantCategories();
fetchPlantsDataByCateg(0);
moveCategSelectionById(0);
//!SECTION first functions

//SECTION - event listeners
categListWrapperElem.addEventListener("click", (e) => {
  // console.log (e);
  // console.log(e,target);
  console.log(e.target.id);
  if (e.target.localName === "li") {
      moveCategSelectionByElem(e.target); // category selection bar
      fetchPlantsDataByCateg(e.target.id);
  }
});
//!SECTION event listeners
