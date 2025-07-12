// Add item to cart (using localStorage)
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
  updateCartCount();
}

// Update cart item count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = `(${totalItems})`;
  }
}

// Checkout button click
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  window.location.href = "checkout.html";
}

// Display cart items in cart.html
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartItemsContainer || !cartTotal) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} x ${item.quantity}`;
    cartItemsContainer.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total;
}

// Run on load

window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartItems(); // Only affects cart.html

  // Backend check
  fetch("http://localhost:5000/")
    .then((res) => res.text())
    .then((data) => console.log("Response from backend:", data))
    .catch((err) => console.error("Error connecting to backend:", err));
});








