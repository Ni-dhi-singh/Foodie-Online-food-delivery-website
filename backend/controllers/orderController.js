const Order = require('../models/orders');

// @desc    Place a new order
// @route   POST /api/orders
// @access  Public
const placeOrder = async (req, res) => {
  try {
    const { name, address, paymentMethod, cartItems, totalAmount } = req.body;

    if (!name || !address || !paymentMethod || !cartItems || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const order = new Order({
      name,
      address,
      paymentMethod,
      cartItems,
      totalAmount,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Server error while placing order" });
  }
};

module.exports = { placeOrder };
