import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Calculate the count of unique items in the cart
  const cartItemCount = cart.length;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    if(!item.isAdded){
       item.Qty++ ;
       item.isAdded = true ; 
       setCart((prev) => [...prev, item]);
    }else{
      cart.map( (cake) => (
        cake.name === item.name ? cake.Qty++ : cake )
      ) 
    }
  };

  const deleteCartItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      deleteCartItem, 
      updateCart, 
      cartItemCount // Add this to the context value
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
