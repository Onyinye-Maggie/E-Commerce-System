import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsub();
  }, [user]);

  if (!user) return <p>Please login to view your orders</p>;

  return (
    <div className="container">
      <h1>My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div key={order.id} className="card">
          <h3>Total: ₦{order.total}</h3>

          <p>Status: {order.status}</p>

          <p><strong>Name:</strong> {order.customer?.name}</p>

          {order.items.map((item, i) => (
            <p key={i}>• {item.name}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;