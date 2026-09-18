import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link to="/">
        My Store
      </Link>

      <div className="nav-links">
        <Link to="/">
          Home
        </Link>

        <Link to="/cart">
          Cart ({totalItems})
        </Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;