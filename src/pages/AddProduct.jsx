import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

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
    if (!name || !price) {
      alert("Name and price are required");
      return;
    }

    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      image: image || "https://via.placeholder.com/150",
      description
    });

    resetForm();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setDescription(product.description || "");
  };

  const handleUpdate = async () => {
    await updateDoc(doc(db, "products", editingId), {
      name,
      price: Number(price),
      image,
      description
    });

    resetForm();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setEditingId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin - Manage Products</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button onClick={editingId ? handleUpdate : handleAdd}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      <h3>All Products</h3>

      {products.length === 0 ? (
        <p>No products yet</p>
      ) : (
        products.map(product => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <img src={product.image} width="100" />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>₦{product.price}</p>

            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AddProduct;
