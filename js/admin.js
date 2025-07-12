// admin.js
fetch("http://localhost:5000/api/orders")
  .then(res => res.json())
  .then(data => {
    const tableBody = document.querySelector("#ordersTable tbody");
    tableBody.innerHTML = "";

    data.forEach(order => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${order._id}</td>
        <td>${order.name}</td>
        <td>${order.address}</td>
        <td>${order.paymentMethod}</td>
        <td>₹${order.totalAmount}</td>
        <td>
          <ul>
            ${order.cartItems.map(i => `<li>${i.name} × ${i.quantity}</li>`).join("")}
          </ul>
        </td>
        <td>${new Date(order.createdAt).toLocaleString()}</td>
        <td><button onclick="deleteOrder('${order._id}')">🗑️ Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Failed to fetch orders:", err);
  });

function deleteOrder(id) {
  if (confirm("Are you sure you want to delete this order?")) {
    fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      alert("Order deleted");
      location.reload();
    })
    .catch(err => {
      console.error("Failed to delete:", err);
    });
  }
}
