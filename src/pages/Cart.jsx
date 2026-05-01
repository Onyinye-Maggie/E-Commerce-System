import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function Cart() {
  const { cart, removeFromCart, getTotal } = useCart();

  return (
    <div className="container">
  <h1>Your Cart</h1>

  {cart.map(item => (
    <div className="card" style={{ marginBottom: "10px" }}>
      <h3>{item.name}</h3>
      <p>₦{item.price}</p>
    </div>
  ))}

  <h2>Total: ₦{getTotal()}</h2>

   <button onClick={checkout}>Checkout</button>
</div>
  );
}

export default Cart;