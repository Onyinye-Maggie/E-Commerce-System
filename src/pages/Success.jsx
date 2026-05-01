import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>🎉 Order Successful!</h1>
      <p>Your order has been placed successfully.</p>

      <Link to="/">
        <button className="button">Back to Store</button>
      </Link>
    </div>
  );
}

export default Success;