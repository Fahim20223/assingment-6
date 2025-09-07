const categoryContainer = document.getElementById("category-container");

fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    console.log(data.categories);
    const categories = data.categories;
    displayCategories(categories);
  });

const displayCategories = (categories) => {
  categories.forEach((cat) => {
    console.log(cat.category_name);
    categoryContainer.innerHTML += `
      <li id="${cat.id}"
              class="hover:bg-green-600 hover:text-white p-2 rounded-lg cursor-pointer"
            >
              ${cat.category_name}
            </li>
     
     `;
  });
  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-green-600");
    });

    console.log(e.target.localName);
    if ((e.target.localName = "li")) {
      e.target.classList.add("bg-green-600");
      // e.target.classList.add("text-white");
    }
  });
};
