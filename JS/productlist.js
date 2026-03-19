//  hovedkategorier og DummyJSON-subkategorier de indeholder
const categoryMap = {
  women: [
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
    "tops",
  ],
  men: ["mens-shirts", "mens-shoes", "mens-watches"],
  "self-care": ["beauty", "fragrances", "skin-care"],
  accessories: [
    "sunglasses",
    "womens-jewellery",
    "womens-watches",
    "mens-watches",
  ],
};

const params = new URLSearchParams(window.location.search);
let category = params.get("category");
const categoriesParam = params.get("categories");
const titleParam = params.get("title");

console.log(category);
const container = document.querySelector("main");
container.classList.add("product-grid");
const subcategoryNav = document.querySelector(".subcategory-nav");

let activeSubcategories = [];
let displayTitle = "Products";

// Hvis index sender en konkret liste af subkategorier, brug den direkte
if (categoriesParam) {
  activeSubcategories = [
    ...new Set(categoriesParam.split(",").filter(Boolean)),
  ];
  displayTitle = titleParam ? titleParam : "Products";
} else {
  if (!category || !categoryMap[category]) {
    category = "women";
  }

  activeSubcategories = categoryMap[category];
  displayTitle = titleParam ? titleParam : formatTitle(category);
}

document.querySelector("h1").textContent = displayTitle;
document.querySelector(".breadcrumbs-category").textContent = displayTitle;

document
  .querySelectorAll("#sorter button")
  .forEach((button) => button.addEventListener("click", sorter));

let allData;
let udsnit;
// Henter data for alle subkategorier og viser dem på siden
function getData() {
  createSubcategoryButtons(activeSubcategories);

  const promises = activeSubcategories.map((subcat) =>
    fetch(`https://dummyjson.com/products/category/${subcat}`)
      .then((res) => res.json())
      .then((data) => data.products),
  );

  // samler alle produkter i ét array
  Promise.all(promises).then((results) => {
    allData = results.flat(); // merges all product arrays into one array

    udsnit = allData;
    showProducts(allData);
  });
}

// Funktion der laver knapper til subkategorierne
function createSubcategoryButtons(subcategories) {
  let markup = "";

  subcategories.forEach((subcat) => {
    markup += `
      <button data-subcategory="${subcat}">
        ${formatSubcategory(subcat)}
      </button>
    `;
  });

  subcategoryNav.innerHTML = markup;

  document
    .querySelectorAll(".subcategory-nav button")
    .forEach((button) => button.addEventListener("click", filter));
}

// Filtrere produkter baseret på subkategori
function filter(e) {
  const valgt = e.target.dataset.subcategory;
  e.target.classList.add("active");
  document
    .querySelectorAll(".subcategory-nav button")
    .forEach((button) => button.classList.remove("active"));
  if (valgt == "all") {
    console.log("Viser alle produkter");
    udsnit = allData;
    showProducts(allData);
  } else {
    udsnit = allData.filter((product) => product.category === valgt);
    console.log(udsnit);
    showProducts(udsnit);
  }
}

function sorter(e) {
  if (e.target.dataset.price) {
    const dir = e.target.dataset.price;
    if (dir == "up") {
      udsnit.sort((a, b) => a.price - b.price); // lav til høj
    } else {
      udsnit.sort((a, b) => b.price - a.price); // høj til lav
    }
  } else if (e.target.dataset.text) {
    const dir = e.target.dataset.text;
    if (dir == "az") {
      udsnit.sort((a, b) => a.title.localeCompare(b.title, "da"));
    } else {
      udsnit.sort((a, b) => b.title.localeCompare(a.title, "da"));
    }
  } else {
    udsnit = allData;
  }
  showProducts(udsnit);
}

function showProducts(products) {
  let markup = "";
  products.forEach((product) => {
    console.log(product);
    const hasDiscount = product.discountPercentage > 10;
    const discount = Math.round(product.discountPercentage);
    const newPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100),
    );
    const soldOut = product.stock === 0;
    const brand = (product.brand || "").trim();
    markup += `
      <a href="productdetails.html?id=${product.id}">
        <article class="product-card">
          ${hasDiscount ? `<span class="sale-badge">${discount}%</span>` : ""}

          <div class="product-card__image-wrap">
            <img
              class="product-card__image"
              src="${product.thumbnail}"
              alt="${product.title}"
            />
          </div>

          <div class="product-card__content">
            <h3 class="product-card__name">${product.title}</h3>
            <h4 class="product-card__brand">${brand || "&nbsp;"}</h4>

            ${
              hasDiscount
                ? `
                  <p class="price-old">${product.price} DKK</p>
                  <p class="price-now price-sale">${newPrice} DKK</p>
                `
                : `<p class="price-regular">${product.price} DKK</p>`
            }
          </div>

          ${
            soldOut
              ? `
                <div class="sold-out">
                  <span class="sold-out__text">UDSOLGT</span>
                </div>
              `
              : ""
          }
        </article>
      </a>
    `;
  });

  container.innerHTML = markup;
}

// Funktion der gør category pænere i h1 og breadcrumb
function formatTitle(category) {
  // Special case til self-care
  if (category === "self-care") return "Self-Care";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// Funktion der gør subkategori-navne pænere på siden
function formatSubcategory(subcat) {
  const customNames = {
    "womens-bags": "Bags",
    "womens-dresses": "Dresses",
    "womens-jewellery": "Jewellery",
    "womens-shoes": "Shoes",
    "womens-watches": "Women's Watches",
    tops: "Tops",
    "mens-shirts": "Shirts",
    "mens-shoes": "Shoes",
    "mens-watches": "Men's Watches",
    beauty: "Beauty",
    fragrances: "Fragrances",
    "skin-care": "Skin Care",
    sunglasses: "Sunglasses",
  };

  // Returnér det pæne navn hvis det findes
  return customNames[subcat] || subcat;
}

getData();
