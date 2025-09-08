// console.log ("connected");

const unselectAllCategories = () => {
  const categs = document.querySelectorAll(".categ")
  // console.log (categs);
  categs.forEach(elem => {
    elem.classList.remove("selected-categ");
  })
}

const moveCategSelectorTo = (id) => {
  unselectAllCategories();
  const categ = document.getElementById(id);
  categ.classList.add("selected-categ");
}

const showMainSpinner = (isVisible) => {
  const mainSpinner = document.getElementById("main-spinner");
  // const nextSection = document.getElementById("sect-choose-trees");

  if (isVisible) {
    mainSpinner.classList.remove("hidden");
  } else {
    mainSpinner.classList.add("hidden");
  }
};

const loadPlantCategories = () => {
  showMainSpinner(true);
  const url = "https://openapi.programming-hero.com/api/categories";

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => listPlantCategories(data.categories))
    .catch((err) => alert("Error:", err));
};

const listPlantCategories = (categCollection) => {
  // console.log (arrCategs);
  const categWrapperElem = document.getElementById("lov-categ-wrapper");

  categCollection.forEach((elem) => {
    categWrapperElem.innerHTML += `
      <li id="categId-${elem.id}" 
        class="categ hover:bg-[#CFF0DC] p-2 rounded cursor-pointer" 
        title="${elem.small_description}">${elem.category_name}</li>
    `;
  });
  showMainSpinner(false);
};

const loadAllPlants = () => {
  showMainSpinner(true);
  const url = "https://openapi.programming-hero.com/api/plants";

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => populatePlantCards(data.plants))
    .catch((err) => alert("Error:", err));
};

const populatePlantCards = (plantCollection) => {
  // console.log (plantCollection);
  const plantWrapperElem = document.getElementById("tree-card-wrapper");

  const htmlString = plantCollection.map(elem => `
                <article id="treId-${elem.id}" class="bg-white p-4 rounded-lg">
                  <figure class="bg-[#EDEDED] mb-3 rounded-lg">
                    <img class="rounded-lg h-60 w-full" src="${elem.image}" alt="${elem.name}">
                  </figure>

                  <h3 class="mb-2 font-semibold text-[#1F2937] text-sm">${elem.name}</h3>
                  <p class="mb-3 text-[#1F2937] text-xs h-20">${elem.description}</p>

                  <div class="flex justify-between items-center mb-3">
                    <h4 class="bg-[#DCFCE7] px-3 py-1 rounded-full font-semibold text-[#15803D] text-sm">${elem.category}</h4>
                    <p class="font-semibold text-[#1F2937] text-sm"><i
                        class="fa-solid fa-bangladeshi-taka-sign"></i><span>${elem.price}</span></p>
                  </div>
                  <button class="rounded-full w-full font-medium text-white btn btn-success">Add to Cart</button>
                </article>
    `
  )
  // console.log (htmlString);
  plantWrapperElem.innerHTML = htmlString.join(" ");
  showMainSpinner(false);
}


loadPlantCategories();
loadAllPlants();
moveCategSelectorTo("categId-0");
