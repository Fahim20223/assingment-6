const categoryContainer = document.getElementById("category-container");
const plantContainer = document.getElementById("plant-container");

// Load categories
fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    displayCategories(data.categories);
  });

const displayCategories = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}"
          class="hover:bg-green-600 hover:text-white p-2 rounded-lg cursor-pointer">
        ${cat.category_name}
      </li>
    `;
  });

  // Handle category click
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => li.classList.remove("bg-green-600"));

    if (e.target.localName == "li") {
      e.target.classList.add("bg-green-600");
      loadAllPlants(e.target.id);
    }
  });
};

// Load plants by category
const loadAllPlants = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlants(data.plants);
    });
};

// Show plants
const displayPlants = (plants) => {
  plantContainer.innerHTML = ""; // clear previous
  plants.forEach((plt) => {
    plantContainer.innerHTML += `
      <div >
        <img src="${plt.image}" />
        <h3 class="mt-2 font-bold">${plt.name}</h3>
      </div>
    `;
  });
};
