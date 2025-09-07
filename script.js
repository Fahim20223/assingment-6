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

    if (e.target.localName === "li") {
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
  console.log(plants);
  plantContainer.innerHTML = ""; // clear previous
  plants.forEach((plt) => {
    plantContainer.innerHTML += `
      <div class="card bg-base-100 w-96 shadow-sm h-[500px]">
  <figure>
    <img
      src="${plt.image}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title font-bold">${plt.name}</h2>
    <p class="font-semibold">${plt.description}</p>
   <div class="flex justify-between items-center">
    <div class="card-actions justify-start">
      <button class="btn btn-outline btn-success rounded-xl">${plt.category}</button>
  </div>
  <div class="text-green-700 font-bold text-lg"><p>৳<span>${plt.price}</span></p></div>
   </div>
  <button class="btn bg-green-600 text-white w-full rounded-3xl mt-6">Add to Cart</button>
</div>
    `;
  });
};
