const Cart = require("../Models/Cart.js");

// GET user's cart
const getCart = async (req, res) => {
  try {
      console.log("📦 Getting cart for user ID:", req.user.id);
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD or UPDATE item in cart
const addToCart = async (req, res) => {
  const { bookId, name, price, coverUrl, genre, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.bookId.toString() === bookId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        bookId,
        name,
        price,
        coverUrl,
        genre,
        quantity: quantity || 1,
      });
    }

    await cart.save();
    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// removing an item from the cart 
const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    console.log("Trying to delete bookId:", req.params.bookId);
    console.log("Cart items before:", cart.items.map(i => i.bookId.toString()));

    cart.items = cart.items.filter(
      (item) => !item.bookId.equals(req.params.bookId)
    );

    await cart.save();

    console.log("Cart items after:", cart.items.map(i => i.bookId.toString()));
    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Error in removeFromCart:", err.message);
    res.status(500).json({ error: err.message });
  }
};


// CLEAR cart
const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.bookId.toString() === req.params.bookId
    );
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateItemQuantity
};
