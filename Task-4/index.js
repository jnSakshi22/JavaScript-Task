document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("productContainer");
  const searchInput = document.getElementById("searchInput");
  const messageContainer = document.getElementById("messageContainer");
  let products = [];

  // Fetch data from the API
  async function fetchData() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      products = data.products;
      renderProducts(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Render product cards
  function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <button class="like-btn">Like</button>
                <button class="bookmark-btn">Bookmark</button>
                <button class="cart-btn">Add to Cart</button>
            `;

      productCard
        .querySelector(".like-btn")
        .addEventListener("click", (event) => handleLike(event, product));
      productCard
        .querySelector(".bookmark-btn")
        .addEventListener("click", () => handleBookmark(product));
      productCard
        .querySelector(".cart-btn")
        .addEventListener("click", (event) => handleAddToCart(event, product));

      productContainer.appendChild(productCard);
    });
  }

  // Handle search input
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
  });

  // Display temporary message
  function showMessage(message) {
    messageContainer.innerText = message;
    messageContainer.style.display = "block";
    setTimeout(() => {
      messageContainer.style.display = "none";
    }, 2000);
  }

  // Handle like button
  function handleLike(event, product) {
    event.target.innerText = "Liked";
    event.target.disabled = true;
    showMessage(`You liked ${product.title}`);
  }

  // Handle bookmark button
  function handleBookmark(product) {
    showMessage(`You bookmarked ${product.title}`);
  }

  // Handle add to cart button
  function handleAddToCart(event, product) {
    event.target.innerText = "Added to Cart";
    event.target.disabled = true;
    addToCart(product);
    showMessage(`You added ${product.title} to the cart`);
  }

  // Add product to cart
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Initial fetch
  fetchData();
});
