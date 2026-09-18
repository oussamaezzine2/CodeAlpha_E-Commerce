import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice
  } = useCart();

  if (cart.length === 0) {
    return (
      <main>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>

        <Link to="/">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div
          className="cart-item"
          key={item._id}
        >
          <img
            src={item.image}
            alt={item.name}
            width="100"
          />

          <div>
            <h2>{item.name}</h2>

            <p>
              ${item.price}
            </p>

            <input
              type="number"
              min="1"
              max={item.stock}
              value={item.quantity}
              onChange={(event) =>
                updateQuantity(
                  item._id,
                  Number(event.target.value)
                )
              }
            />

            <p>
              Subtotal: $
              {(
                item.price *
                item.quantity
              ).toFixed(2)}
            </p>

            <button
              onClick={() =>
                removeFromCart(item._id)
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>
        Total: ${totalPrice.toFixed(2)}
      </h2>

      <Link to="/checkout">
        Proceed to Checkout
      </Link>
    </main>
  );
}

export default Cart;