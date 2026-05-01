import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const { login, signup } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  await login(form.email, form.password);
  navigate("/"); // or "/admin"
};


  const handleSignup = async () => {
    await signup(form.email, form.password);
    alert("Account created!");
  };

  return (
    <div className="container">
      <h1>Login / Sign Up</h1>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="button"
>
        Login
      </motion.button>
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="button"
>
        Sign Up
      </motion.button>
    </div>
  );
}

export default Login;