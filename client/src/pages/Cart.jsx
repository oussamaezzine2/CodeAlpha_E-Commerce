import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

function Cart() {
  const {
    cart,
    totalPrice
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>

        <Link to="/">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h2>
          Total: ${totalPrice.toFixed(2)}
        </h2>

        <Link to="/">
          Continue Shopping
        </Link>

        <Link to="/checkout">
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}

export default Cart;