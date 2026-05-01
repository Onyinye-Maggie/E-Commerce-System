import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

function Navbar({ darkMode, setDarkMode }) {
  const { cart } = useCart();
  const [openCart, setOpenCart] = useState(false);

  return (
    <div className="navbar">
      <h2>ShopX</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/my-orders">Orders</Link>

        <button onClick={() => setOpenCart(true)}>
          Cart ({cart.length})
        </button>

        <button onClick={() => setDarkMode(!darkMode)}>
          🌙
        </button>
      </div>

      <CartDrawer isOpen={openCart} setIsOpen={setOpenCart} />
    </div>
  );
}

export default Navbar;