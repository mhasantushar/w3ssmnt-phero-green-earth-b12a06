// console.log ("connected");
const categListWrapperElem = document.getElementById("lov-categ-wrapper");
const plantCardWrapperElem = document.getElementById("tree-card-wrapper");
const plantCartWrapperElem = document.getElementById("tree-cart-wrapper");
const plantCartTotvalueElem = document.getElementById("tree-cart-total");
const plantModalWrapperElem = document.getElementById("tree-modal-wrapper");
const plantModalDialogPopup = document.getElementById("modalPlantDialogbox");

let cartItems = [];

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

const publishCartInfo = () => {
  let cartValue = 0;
  cartItems.forEach((item) => {
    plantCartWrapperElem.innerHTML += `
                  <article class="bg-[#F0FDF4] px-3 py-2 rounded-lg">
                    <div class="flex justify-between items-center">
                      <div>
                        <h3 class="mb-2 font-semibold text-[#1F2937] text-sm">${item.name}</h3>
                        <p class="text-[#1F2937]"><i class="fa-solid fa-bangladeshi-taka-sign">
                          </i><span>${item.rate}</span> x <span>${item.qnty}</span>
                        </p>
                      </div>
                      <span class="text-[#15803D] cursor-pointer hook-cart-drop"><i class="fa-solid fa-square-xmark"></i></span>
                    </div>
                  </article>
    `;
    cartValue = cartValue + item.rate * item.qnty;
  });
  plantCartTotvalueElem.innerText = cartValue;
};

const eraseCartDisplay = () => {
  plantCartWrapperElem.innerHTML = "";
  plantCartTotvalueElem.innerText = 0;
};

const resetCart = () => {
  cartItems = [];
  eraseCartDisplay();
};

const checkIfRecurrentCartPick = (itemId) => {
  const found = cartItems.find((item) => item.id === itemId);
  if (found) {
    found.qnty++;
    return true;
  } else return false;
};

const processCartAddRequest = (atcButton) => {
  // console.log (atcButton.parentNode.children[3].children[1].children[1].innerText);
  const newCartItem = {
    id: atcButton.parentNode.id,
    name: atcButton.parentNode.children[1].innerText,
    rate: atcButton.parentNode.children[3].children[1].children[1].innerText,
    qnty: 1,
  };
  // console.log(newCartItem);
  if (!checkIfRecurrentCartPick(newCartItem.id)) cartItems.unshift(newCartItem);
  // console.log(cartItems);
  eraseCartDisplay();
  publishCartInfo();
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
        class="hook-categ hover:bg-[#CFF0DC] px-3 py-1 rounded cursor-pointer" 
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
    .then((data) => populatePlantCards(data.plants))
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
    .then((data) => populatePlantCards(data.plants))
    .catch((err) => alert("Error:", err));
};

const populatePlantCards = (plantCollection) => {
  // console.log (plantCollection);
  // const plantCardWrapperElem = document.getElementById("tree-card-wrapper");

  const htmlString = plantCollection.map((elem) => `
                <article id="${elem.id}" class="bg-white p-4 rounded-lg">
                  <figure class="bg-[#EDEDED] mb-3 rounded-lg">
                    <img class="hook-plant-img rounded-lg h-60 w-full cursor-pointer" src="${elem.image}" alt="${elem.name}">
                  </figure>

                  <h3 class="hook-plant-name mb-2 font-semibold text-[#1F2937] cursor-pointer">${elem.name}</h3>
                  <p class="mb-3 text-[#1F2937] text-xs line-clamp-3">${elem.description}</p>

                  <div class="flex justify-between items-center mb-3">
                    <h4 class="bg-[#DCFCE7] px-3 py-1 rounded-full font-semibold text-[#15803D] text-sm">${elem.category}</h4>
                    <p class="font-semibold text-[#1F2937] text-sm"><i
                        class="fa-solid fa-bangladeshi-taka-sign"></i><span>${elem.price}</span></p>
                  </div>
                  <button class="hook-plant-tocart rounded-full w-full font-medium text-white btn btn-success">Add to Cart</button>
                </article>
    `
  );
  // console.log (htmlString);
  plantCardWrapperElem.innerHTML = htmlString.join(" ");
  showMainSpinner(false);
};

const fetchPlantDataById = (plantId) => {
  showMainSpinner(true);
  const url = "https://openapi.programming-hero.com/api/plant/" + plantId;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => populatePlantModal(data.plants))
    .catch((err) => alert("Error:", err));
};

const populatePlantModal = (plantObj) => {
  plantModalWrapperElem.innerHTML = `
                <article id="${plantObj.id}" class="bg-white p-4 rounded-lg">
                  <figure class="bg-[#EDEDED] mb-3 rounded-lg">
                    <img class="hook-plant-img rounded-lg h-80 w-full cursor-pointer" src="${plantObj.image}" alt="${plantObj.name}">
                  </figure>

                  <h3 class="hook-plant-name mb-2 font-semibold text-[#1F2937] cursor-pointer">${plantObj.name}</h3>
                  <p class="mb-3 text-[#1F2937] text-xs line-clamp-5">${plantObj.description}</p>

                  <div class="flex justify-between items-center mb-3">
                    <h4 class="bg-[#DCFCE7] px-3 py-1 rounded-full font-semibold text-[#15803D] text-sm">${plantObj.category}</h4>
                    <p class="font-semibold text-[#1F2937] text-sm"><i
                        class="fa-solid fa-bangladeshi-taka-sign"></i><span>${plantObj.price}</span></p>
                  </div>
                  <button class="hook-plant-tocart rounded-full w-full font-medium text-white btn btn-success">Add to Cart</button>
                </article>
  `;
  showMainSpinner(false);
  plantModalDialogPopup.showModal();
};
//!SECTION populating api data

//SECTION - first functions
fetchPlantCategories();
fetchPlantsDataByCateg(0);
moveCategSelectionById(0);
resetCart();
//!SECTION first functions

//SECTION - event listeners
categListWrapperElem.addEventListener("click", (e) => {
  // console.log(e.target);
  // console.log(e.target.id);
  if (e.target.localName === "li") {
    moveCategSelectionByElem(e.target); // category selection bar
    fetchPlantsDataByCateg(e.target.id);
  }
});

plantCardWrapperElem.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("hook-plant-name"))
    fetchPlantDataById(e.target.parentNode.id); //click on plant's name
  if (e.target.classList.contains("hook-plant-img"))
    fetchPlantDataById(e.target.parentNode.parentNode.id); //click on plant's image
  if (e.target.classList.contains("hook-plant-tocart"))
    processCartAddRequest(e.target); //click on plant's image
});

plantModalDialogPopup.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("hook-plant-tocart"))
    processCartAddRequest(e.target);
});

plantCartWrapperElem.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.classList.contains("hook-cart-drop"))
    console.log ("hopefully the last piece remains");
});
//!SECTION event listeners
