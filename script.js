const categoryContainer = document.getElementById("category-container");
const plantContainer = document.getElementById("plant-container");
const cartContainer = document.getElementById("cart-bg");
let cart = [];
// let total = 0;
const totalContainer = document.getElementById("total-container");
// const totalCount = document.getElementById("total-container");
const spinnerContainer = document.getElementById("loading-container");
const treeDetailsContainer = document.getElementById("tree-details-container");

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
  manageSpinner(true);
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
  <div id="${plt.id}" class="card-body">
    <h2 onclick="loadTreeDetail(${plt.id})" class="card-title font-bold">${plt.name}</h2>
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
  manageSpinner(false);
};

// Showing All Plants

const showAllPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      displayAllPlants(data.plants);
    });
};

const displayAllPlants = (plant) => {
  console.log(plant);
  plant.forEach((plnt) => {
    plantContainer.innerHTML += `
     
 <div class="card bg-base-100 w-96 shadow-sm h-[500px]">
  <figure>
    <img
      src="${plnt.image}" />
  </figure>
  <div id="${plnt.id}" class="card-body">
    <h2 onclick="loadTreeDetail(${plnt.id})" class="card-title font-bold">${plnt.name}</h2>
    <p class="font-semibold">${plnt.description}</p>
   <div class="flex justify-between items-center">
    <div class="card-actions justify-start">
      <button class="btn btn-outline btn-success rounded-xl">${plnt.category}</button>
  </div>
  <div class="text-green-700 font-bold text-lg"><p>৳<span>${plnt.price}</span></p></div>
   </div>
  <button class="btn bg-green-600 text-white w-full rounded-3xl mt-6">Add to Cart</button>
</div>
    `;
  });
};

// plantContainer.addEventListener("click", (e) => {
//   // console.log(e.target.parentNode.children[2].children[1].innerText);
//   // console.log(e.target);
//   if (e.target.innerText === "Add to Cart") {
//     // console.log("add to cart cooked");
//     handleCarts(e);

//     //
//   }
// });
// const handleCarts = (e) => {
//   const paragraph = e.target.parentNode.children[0].innerText;
//   // console.log(paragraph);
//   const id = e.target.parentNode.id;
//   // console.log(id);
//   cart.push({
//     paragraph: paragraph,
//     id: id,
//   });
//   displayAllCarts(cart);
// };

// const displayAllCarts = (cart) => {
//   cart.forEach((crt) => {
//     cartContainer.innerHTML += `

//   <div>
//   <h1>${crt.name}</h1>
//   <p>${crt.price}</p>
//   </div>

//   `;
//   });
// };

plantContainer.addEventListener("click", (e) => {
  const target = e.target.parentNode.children[0].innerText;

  if (e.target.innerText === "Add to Cart") {
    handleCarts(e);
    alert(`${target} has been added to the cart`);
  }
});

const handleCarts = (crt) => {
  // go up from button → card-body
  const cardBody = crt.target.parentNode; // parent of the button = card-body\
  // console.log(cardBody);
  // console.log(cardBody);
  // extract data
  const name = cardBody.children[0].innerText; // h2 is the first child
  const price =
    cardBody.children[2].children[1].children[0].children[0].innerText;
  console.log(price);
  const id = cardBody.id;

  cart.push({
    id: id,
    name: name,
    price: price,
  });

  displayAllCarts(cart);
};

const displayAllCarts = (cart) => {
  // console.log(cart);
  let total = 0;
  cartContainer.innerHTML = "";
  cart.forEach((crt) => {
    // alert(`${crt.name} added`);
    // crt.name = "";

    cartContainer.innerHTML += `
     
      <div class="p-2 rounded-xl  mb-5 bg-[#f0fdf4] shadow-lg flex items-center justify-between">
        <div>
        <h1 class="font-bold">${crt.name}</h1>
        <p class="text-green-600">${crt.price}</p>
        </div>
        <div onclick="handleDeleteCarts('${crt.id}')" class="cursor-pointer">
        ❌
        </div>
      </div>
    `;
    total += Number(crt.price);
  });
  totalContainer.innerHTML = `Total : ৳${total}`;
};

const handleDeleteCarts = (cartsId) => {
  // console.log(cartsId);
  const filteredCarts = cart.filter((crt) => crt.id !== cartsId);
  // console.log(filteredCarts);
  cart = filteredCarts;
  displayAllCarts(cart);
};

const showLoading = () => {
  plantContainer.innerHTML = `
  
  <span class="loading loading-spinner loading-lg"></span>
  
  `;
};

const manageSpinner = (status) => {
  if (status == true) {
    spinnerContainer.classList.remove("hidden");
    plantContainer.classList.add("hidden");
  } else {
    spinnerContainer.classList.add("hidden");
    plantContainer.classList.remove("hidden");
  }
};

const loadTreeDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayTreeDetails(details.plants);
};

const displayTreeDetails = (trees) => {
  console.log(trees);

  treeDetailsContainer.innerHTML = `
   
  <div class"card bg-base-100  shadow-sm>
                <h1 class="text-xl font-bold mb-3 ">${trees.name}</h1>
                <figure class="">
                <img class="w-full h-96 mx-auto rounded-lg" src="${trees.image}"/>
                 </figure>
                <p class="mt-4 mb-2">
                  <span class="text-lg
                  font-semibold">Category: </span><span>${trees.category}</span>
                </p>
                <p class="mt-2 mb-2">
                  <span class="text-lg font-semibold">Price:</span> <span>৳</span>${trees.price}
                </p>
                <p class="mt-2 mb-2">
                  <span class="text-lg
                   font-semibold">Description: </span
                  ><span>${trees.description}</span>
                </p>
              </div>


  `;

  document.getElementById("tree_modal").showModal();
};

showAllPlants();
