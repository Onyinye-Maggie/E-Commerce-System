import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersCol = collection(db, "orders");
      const snapshot = await getDocs(ordersCol);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(list);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;