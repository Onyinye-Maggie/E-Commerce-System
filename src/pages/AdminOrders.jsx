import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  return (
    <div>
      <h1>Orders</h1>

      {orders.map(order => (
        <div key={order.id} className="card" style={{ marginTop: "10px" }}>
          <h3>Total: ₦{order.total}</h3>

          {/* 👤 CUSTOMER INFO */}
          <p><strong>Name:</strong> {order.customer?.name}</p>
          <p><strong>Phone:</strong> {order.customer?.phone}</p>
          <p><strong>Address:</strong> {order.customer?.address}</p>

          <p><strong>Status:</strong> {order.status}</p>

          {/* 🛒 ITEMS */}
          {order.items.map((item, i) => (
            <p key={i}>• {item.name}</p>
          ))}

          {/* 🔄 STATUS BUTTONS */}
          <button onClick={() => updateStatus(order.id, "shipped")}>
            Ship
          </button>

          <button onClick={() => updateStatus(order.id, "delivered")}>
            Deliver
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;