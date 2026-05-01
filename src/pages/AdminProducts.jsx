import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

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

  const handleAdd = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert("Name and price required");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: newProduct.name,
        price: Number(newProduct.price),
        description: newProduct.description,
        image: newProduct.image
      });

      console.log("✅ Product added");

      setNewProduct({
        name: "",
        price: "",
        description: "",
        image: ""
      });

    } catch (error) {
      console.error("❌ Add error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      console.log("🗑 Deleted");
    } catch (error) {
      console.error("❌ Delete error:", error);
    }
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm(product);
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "products", editing), {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        image: form.image
      });

      console.log("✏️ Updated");

      setEditing(null);
      setForm({
        name: "",
        price: "",
        description: "",
        image: ""
      });

    } catch (error) {
      console.error("❌ Update error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Admin Products</h1>

      <div className="card">
        <h2>Add Product</h2>

        <input
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="button"
          onClick={handleAdd}
        >
          Add Product
        </motion.button>
      </div>

      {editing && (
        <div className="card">
          <h2>Edit Product</h2>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            value={form.image}
            onChange={(e) =>
              setForm({ ...form, image: e.target.value })
            }
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button"
            onClick={handleUpdate}
          >
            Save Changes
          </motion.button>
        </div>
      )}

      <div className="grid">
        {products.map((p) => (
          <div key={p.id} className="card">
            <img src={p.image} alt={p.name} />

            <h3>{p.name}</h3>
            <p>₦{p.price}</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(p)}
              >
                Edit
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(p.id)}
              >
                Delete
              </motion.button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;