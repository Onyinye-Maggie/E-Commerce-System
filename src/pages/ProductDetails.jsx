import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";


function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null); 

  useEffect(() => {
    const fetchProduct = async () => {
      const snap = await getDoc(doc(db, "products", id));

      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="container">
      <div className="details">
        <img src={product.image} />

        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>₦{product.price}</h2>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;