import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        toast("Already in cart ⚠️");
        return prev;
      }

      toast.success(`${product.name} added 🛒`);
      return [...prev, product];
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    toast.error("Removed ❌");
  };

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);