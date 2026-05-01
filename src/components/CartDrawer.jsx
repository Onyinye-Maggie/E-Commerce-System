import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function CartDrawer({ isOpen, setIsOpen }) {
  const { cart, getTotal } = useCart();

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      className="cart-drawer"
    >
      <h2>Cart</h2>

      {cart.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}

      <h3>Total: ₦{getTotal()}</h3>

      <button onClick={() => setIsOpen(false)}>Close</button>
    </motion.div>
  );
}

export default CartDrawer;