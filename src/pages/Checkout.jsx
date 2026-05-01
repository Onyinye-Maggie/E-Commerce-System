import { useState } from "react";
import { useCart } from "../context/CartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  if (!user) {
    return <p>Please login to checkout</p>;
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    await addDoc(collection(db, "orders"), {
  items: cart,
  total: getTotal(),
  customer,
  userId: user.uid,        
  userEmail: user.email,   
  status: "pending",
  createdAt: new Date()
});

    clearCart();
    navigate("/success");
  };

  return (
    <div className="container">
      <h1>Checkout</h1>

      <div className="card">
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <textarea name="address" placeholder="Address" onChange={handleChange} />
      </div>

      {cart.map(item => (
        <div key={item.id} className="card">
          <h3>{item.name}</h3>
          <p>₦{item.price}</p>
        </div>
      ))}

      <h2>Total: ₦{getTotal()}</h2>

      <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="button"
>
        Place Order
      </motion.button>
    </div>
  );
}

export default Checkout;