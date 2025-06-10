// Updated Cart component
// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import Cartitem from './Cartitem';

function Cart() {
  const { cart, deleteCartItem, updateCart } = useCart();
  const [localCart, setLocalCart] = useState([]);
  
  useEffect(() => {
    setLocalCart([...cart]);
  }, [cart]);
  
  const handleQuantity = (index) => {
    setLocalCart(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        Qty: updated[index].Qty + 1
      };
      return updated;
    });
    
    const updatedCart = [...localCart];
    updatedCart[index] = {
      ...updatedCart[index],
      Qty: updatedCart[index].Qty + 1
    };
    updateCart(updatedCart);
  };

  return (
    <div className="max-w-5xl mx-auto p-8 title">
      <h1 className="text-4xl font-bold mb-6 text-[var(--secondary-color)]">Your Cart</h1>
      <div className="bg-white rounded-lg p-6">
        {localCart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          localCart.map((item, index) => (
            <div key={index} className="mb-4">
              <Cartitem
                name={item.name}
                price={item.price}
                img={item.img}
                category={item.category}
                Qty={item.Qty}
                Delete_cartItem={() => deleteCartItem(index)}
                Handle_Qty={() => handleQuantity(index)}
                loading="lazy"
              />
            </div>
          ))
        )}

        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-xl font-bold text-[var(--primary-color)]">
            {localCart.reduce((total, item) => total + (item.price * item.Qty), 0)}$
          </span>
        </div>

        <div className="mt-6 text-right">
          <button className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg cursor-pointer transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
