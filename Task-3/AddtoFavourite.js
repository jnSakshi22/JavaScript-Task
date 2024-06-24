document.addEventListener("DOMContentLoaded", function () {
  const productContainer = document.getElementById("product-container");
  const wishlistContainer = document.getElementById("wishlist-container");
  const priceSummary = document.getElementById("price-summary");
  let wishlist = [];

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
      });
    });

  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button id="wishlist-button-${product.id}" onclick="toggleWishlist(${product.id}, '${product.title}', '${product.image}', ${product.price})">
                <span class="heart-icon">❤️</span>
                <span class="cta-text">Add to Favorite</span>
            </button>
        `;

    return card;
  }

  window.toggleWishlist = function (id, title, image, price) {
    const productIndex = wishlist.findIndex((product) => product.id === id);
    const button = document.getElementById(`wishlist-button-${id}`);
    if (productIndex > -1) {
      wishlist.splice(productIndex, 1);
      button.innerHTML = `
                <span class="heart-icon">❤️</span>
                <span class="cta-text">Add to Favorite</span>
            `;
      button.classList.remove("added-to-favorites");
    } else {
      wishlist.push({ id, title, image, price, quantity: 1 });
      button.innerHTML = `
                <span class="heart-icon">❤️</span>
                <span class="cta-text">Remove from Favorite</span>
            `;
      button.classList.add("added-to-favorites");
    }
    updateWishlist();
    updatePriceSummary();
  };

  function updateWishlist() {
    wishlistContainer.innerHTML = "";
    wishlist.forEach((product) => {
      const wishlistCard = document.createElement("div");
      wishlistCard.className = "wishlist-card";
      wishlistCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${product.id}, 'decrease')">-</button>
                    <span>${product.quantity}</span>
                    <button onclick="updateQuantity(${product.id}, 'increase')">+</button>
                </div>
            `;
      wishlistContainer.appendChild(wishlistCard);
    });
  }

  window.updateQuantity = function (id, action) {
    const product = wishlist.find((product) => product.id === id);
    if (product) {
      if (action === "increase") {
        product.quantity++;
      } else if (action === "decrease" && product.quantity > 1) {
        product.quantity--;
      }
      updateWishlist();
      updatePriceSummary();
    }
  };

  function updatePriceSummary() {
    let totalPrice = wishlist.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    priceSummary.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }
});
