// routes/cartRoutes.js
const express = require("express");
const { getCart, addToCart, removeFromCart, clearCart ,updateItemQuantity } = require("../Controllers/CartController.js");
const auth = require("../middleware/auth.js"); // middleware to check token

const router = express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.delete("/remove/:bookId", auth, removeFromCart);
router.delete("/clear", auth, clearCart);
router.put("/update/:bookId", auth, updateItemQuantity);
// router.put("/update/:bookId", auth, updateQuantity);

module.exports = router;
