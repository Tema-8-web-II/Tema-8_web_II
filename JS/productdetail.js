const pageParams = new URLSearchParams(window.location.search);
const productId = pageParams.get("id");

const productContainer = document.querySelector(".product-details");
const similarContainer = document.querySelector(".similar-products");
const endpoint = `https://dummyjson.com/products/${productId}`;
// Find breadcrumb link element
const breadcrumbCategoryLink = document.querySelector(
  '.breadcrumbs a[href="productlist.html"]',
);
const breadcrumbProductName = document.querySelector(".breadcrumbs-product");

// Go back button handler
function goBackToProducts() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }

  window.location.href = "productlist.html";
}

// funktion til at hente data for det valgte produkt og lignende produkter
function getData() {
  fetch(endpoint)
    .then((res) => res.json())
    .then((product) => {
      showProductDetails(product);
      getSimilarProducts(product.category, product.id);
    });
}
function getSimilarProducts(category, currentId) {
  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      const similarProducts = data.products
        .filter((product) => product.id !== currentId)
        .slice(0, 3);

      showSimilarProducts(similarProducts);
    });
}

function showProductDetails(product) {
  const hasDiscount = product.discountPercentage > 10;
  const soldOut = product.stock === 0;
  const newPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100),
  );
  const brand = (product.brand || "").trim();
  const formattedCategory =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  // Update breadcrumb link and product name
  if (breadcrumbCategoryLink) {
    breadcrumbCategoryLink.href =
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin
        ? document.referrer
        : `productlist.html?category=${product.category}`; // Fallback to category page if no referrer or external referrer
    breadcrumbCategoryLink.textContent = formattedCategory; // Opdater linktekst til kategorinavn
  }
  if (breadcrumbProductName) {
    breadcrumbProductName.textContent = product.title; // Opdater breadcrumb med produktnavn
  }

  let markup = `
    <button class="back-link" type="button" aria-label="Go back to products" data-back-button>
      <span class="back-link__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span>Go back</span>
    </button>

    <article class="product-card">
      <div class="product-card__image-wrap">
        <img src="${product.thumbnail}" alt="${product.title}" />
        ${
          soldOut
            ? `
              <div class="sold-out">
                <span class="sold-out__text">UDSOLGT</span>
              </div>
            `
            : ""
        }
      </div>

      <div class="product-card__content">
        <h1>${product.title}</h1>
        <h2 class="product-brand">${brand || "&nbsp;"}</h2>
        <p class="description">${product.description}</p>
        <p class="category"><strong>Category:</strong> ${formattedCategory}</p>

        ${
          hasDiscount
            ? `
              <p class="price-old"><strong>Before:</strong> ${product.price} DKK</p>
              <p class="price-new">Now: ${newPrice} DKK</p>
            `
            : `
              <p class="price-regular"><strong>Price:</strong> ${product.price} DKK</p>
            `
        }
        <div class="product-actions">
          <button class="add-to-basket-btn" type="button">Add to basket</button>
          <button class="wishlist-btn icon icon--wishlist" type="button" aria-label="Add to wishlist">
 <img src="IMGS/heart.webp" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  `;

  productContainer.innerHTML = markup;

  productContainer
    .querySelector("[data-back-button]")
    ?.addEventListener("click", goBackToProducts);
}
function showSimilarProducts(products) {
  if (!similarContainer) return;

  let markup = "";

  products.forEach((product) => {
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

  similarContainer.innerHTML = markup;
}
getData();
