const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');
const User = require('../Models/Users');
const auth = require('../middleware/auth');

// submit the user orders 
router.post("/submit", auth, async (req, res) => {
  const { books, totalAmount } = req.body;

  if (!books || books.length === 0) {
    return res.status(400).json({ message: "Cart is empty!" });
  }

  try {
    // Get the user details from the database to get the username
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const order = new Order({
      userId: req.user.id,
      username: user.username, // Get username from user document
      totalAmount,
      status: "Pending",
      books: books.map(book => ({
        bookId: book.bookId,
        price: book.price,
        title: book.title || book.name, // Handle both title and name
        quantity: book.quantity,
      })),
    });

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    console.error("Order submission error:", err);
    res.status(500).json({ message: "Failed to submit the order" });
  }
});

// get the users orders 
// GET all orders (for admin or dashboard)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(orders);
  } catch (err) {
    console.error("Failed to fetch all orders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router; 