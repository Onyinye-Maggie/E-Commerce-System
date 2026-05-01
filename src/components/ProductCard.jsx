import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={product.image} />
      <h3>{product.name}</h3>
      <p>₦{product.price}</p>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => addToCart(product)}
        className="button"
      >
        Add to Cart
      </motion.button>
    </div>
  );
}

export default ProductCard;