import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;