const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const sendEmail = require("../utils/sendEmail");

// ✅ Create Order + Send Email Confirmation
router.post("/", async (req, res) => {
  try {
    const { name, address, paymentMethod, email, cartItems, totalAmount } = req.body;

    console.log("Received order with email:", email);


    const newOrder = new Order({
      name,
      address,
      email,
      paymentMethod,
      cartItems,
      totalAmount,
    });

    await newOrder.save();

    // ✅ Email HTML content
    const htmlContent = `
      <h2>Hi ${name},</h2>
      <p>Thanks for placing your order with <strong>Zingy Bites</strong>!</p>
      <p><strong>Total:</strong> ₹${totalAmount}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p>We’ll deliver it to: ${address}</p>
    `;

    await sendEmail(email, "Order Confirmation - Zingy Bites", htmlContent);

    res.status(201).json({ message: "Order placed and email sent!" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to place order or send email" });
  }
});

// ✅ Get All Orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ Get Order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving order" });
  }
});

// ✅ Delete Order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting order" });
  }
});

module.exports = router;
