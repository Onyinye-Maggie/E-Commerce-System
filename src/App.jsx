import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Success from "./pages/Success";
import MyOrders from "./pages/MyOrders";

import ProtectedRoute from "./components/ProtectedRoute";
import { motion } from "framer-motion";


function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route path="/my-orders" element={<MyOrders />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </motion.div>
    </div>
  );
}

export default App;