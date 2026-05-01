import { useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";

function Admin() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div style={{ display: "flex" }}>
      {/*  Sidebar */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          padding: "20px",
          background: "#111827",
          color: "white"
        }}
      >
        <h2>⚙ Admin</h2>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("products")}
        >
          📦 Products
        </p>

        <p
          style={{ cursor: "pointer" }}
          onClick={() => setActiveTab("orders")}
        >
          🧾 Orders
        </p>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "orders" && <AdminOrders />}
      </div>
    </div>
  );
}

export default Admin;