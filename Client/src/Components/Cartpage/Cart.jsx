import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import Cartitem from './Cartitem';
import axios from "axios" ; 

function Cart() {
  const { cart, deleteCartItem, updateItemQuantity , user } = useCart();
  const [UserOrderItems,setUserOrderItems] = useState({}) ; 
  const [TotalAmount,setTotalAmount] = useState(0) ;



  // handle the cart chnages  

  const handleIncreaseQuantity = (item) => {
    const newQty = item.quantity + 1;
    updateItemQuantity(item.bookId, newQty);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const newQty = item.quantity - 1;
      updateItemQuantity(item.bookId, newQty);
    }
  };

  const handleDelete = (item) => {
    console.log("Attempting to delete item:", item); // Debug log
    deleteCartItem(item.bookId);
  };

  const Calculate_TotalCartPrice = () => {
     setTotalAmount( cart.reduce((total, item) => total + item.price * item.quantity, 0))
     return TotalAmount ; 
  }



  // function to submit the user order  
const Submit_UserOrder = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  if (!user || !user.token) {
    alert("🚫 You must be logged in to submit an order.");
    return;
  }

  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const orderData = {
    books: cart,
    totalAmount: total,
  };

  console.log("Submitting order:", orderData); // Debug log

  try {
    const res = await axios.post(
      `http://localhost:5000/api/order/submit`,
       orderData,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    if (res.status === 200 || res.status === 201) {
      alert("✅ Your order has been submitted successfully!");
      console.log("Order response:", res.data);
    // clear the cart now
    }
  } catch (err) {
    console.error("❌ Failed to submit the user order", err);
    alert("❌ Failed to submit your order.");
  }
};


  return (
    <div className="max-w-5xl mx-auto p-8 title mt-40">
      <h1 className="text-6xl font-extrabold mb-6 text-[var(--secondary-color)]">Your Cart</h1>
      <div className="bg-white rounded-lg p-6">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.bookId} className="mb-4">
              <Cartitem
                title={item.title}
                price={item.price}
                img={item.coverUrl}
                category={item.genre}
                Qty={item.quantity}
                Delete_cartItem={() => handleDelete(item)}
                Decrease_Qty={() => handleDecreaseQuantity}
                Handle_Qty={() => handleIncreaseQuantity(item)}
                loading="lazy"
              />
             
            </div>
           
          ))
        )}

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-bold text-[var(--primary-color)]">
            {cart.reduce((total, item) => total + item.price * item.quantity, 0)}$
          </span>
        </div>

        <div className="mt-6 text-right">
          <button className="bg-[var(--secondary-color)] font-bold hover:bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-300"
            onClick={() => Submit_UserOrder(cart)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
