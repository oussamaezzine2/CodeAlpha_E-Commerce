import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems } = useCart();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

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

        {isAuthenticated ? (
          <>
            <Link to="/orders">
              My Orders
            </Link>

            <span>
              Hello, {user.name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;