import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Create context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Load user and fetch cart
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      console.log("parsed user :" ,parsedUser)    
      fetchCartFromDB(parsedUser.token);
    }
  }, []);

  // Fetch cart from backend if token exists
  const fetchCartFromDB = async (token) => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data.items);
      console.log("the cart for user is ", res.data.items) ;
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
    }
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchCartFromDB(userData.token);
    
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setCart([]);
  };

  const addToCart = async (item) => {
    if (!user) {
      console.warn("🚫 You must be logged in to add items to cart");
      return;
    }
    try {
      console.log("Adding to cart:", item); // Debug log
      console.log("User token:", user.token); // Debug log
      
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { 
          bookId: item._id,
          name: item.title || item.name,
          price: item.price,
          coverUrl: item.coverUrl,
          genre: item.genre,
          quantity: 1 
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setCart(res.data.items);
      console.log(cart) ;
    } catch (err) {
      console.error("❌ Failed to add to cart:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
    }
  };

  const deleteCartItem = async (bookId) => {
        if (!user) {
          console.warn("🚫 You must be logged in to delete cart items");
          return;
        }
        try {
          console.log("Deleting item with ID:", bookId); // Debug log
          const res = await axios.delete(
            `http://localhost:5000/api/cart/remove/${bookId}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setCart(res.data.items);
          console.log("Item deleted successfully:", res.data.items); // Debug log
        } catch (err) {
          console.error("❌ Failed to delete cart item:", err);
        }
  };

  const updateItemQuantity = async (bookId, quantity) => {
      if (!user) {
        console.warn("🚫 You must be logged in to update item quantity");
        return;
      }
      try {
        const res = await axios.put(
          `http://localhost:5000/api/cart/update/${bookId}`,
          { quantity },
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setCart(res.data.items);
      } catch (err) {
        console.error("❌ Failed to update item quantity:", err);
      }
  };

  const cartItemCount = cart.length;

  return (
    <CartContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        deleteCartItem,
        updateItemQuantity,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
