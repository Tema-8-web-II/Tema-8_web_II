const endpoint = "https://dummyjson.com/products/categories";

const categoryMap = {
  "womens-dresses": {
    title: "Women",
    category: "women",
    image: "IMGS/women.webp",
    categories: [
      "womens-dresses",
      "womens-shoes",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
      "tops",
    ],
  },
  "mens-shirts": {
    title: "Men",
    category: "men",
    image: "IMGS/men.webp",
    categories: ["mens-shirts", "mens-shoes", "mens-watches", "sunglasses"],
  },
  beauty: {
    title: "Selfcare",
    category: "self-care",
    image: "IMGS/self-care.webp",
    categories: ["beauty", "fragrances", "skin-care"],
  },
  "mobile-accessories": {
    title: "Accessories",
    category: "accessories",
    image: "IMGS/accessories.webp",
    categories: [
      "mobile-accessories",
      "sports-accessories",
      "sunglasses",
      "womens-bags",
      "womens-jewellery",
      "mens-watches",
      "womens-watches",
    ],
  },
};

fetch(endpoint)
  .then((res) => res.json())
  .then(showCategories);

function showCategories(categories) {
  const container = document.querySelector(".category_list_container");

  let markup = "";

  categories.forEach((category) => {
    const key = category.slug || category;
    const mapped = categoryMap[key];

    if (mapped) {
      markup += `
        <a 
          class="category-card" 
          href="productlist.html?categories=${encodeURIComponent(mapped.categories.join(","))}&title=${encodeURIComponent(mapped.title)}"
        >
          <img src="${mapped.image}" alt="${mapped.title}">
          <h3>${mapped.title}</h3>
        </a>
      `;
    }
  });

  container.innerHTML = markup;
}
