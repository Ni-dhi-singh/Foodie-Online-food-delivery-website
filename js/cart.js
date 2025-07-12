const cartTableBody = document.querySelector("#cartItems tbody");
const totalAmountSpan = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  cartTableBody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="4">Your cart is empty.</td></tr>`;
    totalAmountSpan.textContent = "0";
    updateCartCount();
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>
        <button onclick="changeQuantity(${index}, -1)">−</button>
        ${item.quantity}
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </td>
      <td>₹${itemTotal}</td>
      <td><button onclick="removeItem(${index})">❌</button></td>
    `;
    cartTableBody.appendChild(row);
  });

  totalAmountSpan.textContent = total;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountEl) {
    cartCountEl.textContent = `(${totalItems})`;
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

// Initialize on page load
updateCart();
