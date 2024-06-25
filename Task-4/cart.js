document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");

  // Render cart products
  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((product) => {
        const cartCard = document.createElement("div");
        cartCard.className = "cart-card";

        cartCard.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <button class="remove-btn">Remove</button>
                `;

        cartCard
          .querySelector(".remove-btn")
          .addEventListener("click", () => handleRemove(product));

        cartContainer.appendChild(cartCard);
      });
    }
  }

  // Handle remove button
  function handleRemove(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((cartItem) => cartItem.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  // Initial render
  renderCart();
});
