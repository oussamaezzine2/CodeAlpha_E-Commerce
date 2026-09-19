import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const {
    updateQuantity,
    removeFromCart
  } = useCart();

  const handleDecrease = () => {
    updateQuantity(
      item._id,
      item.quantity - 1
    );
  };

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      updateQuantity(
        item._id,
        item.quantity + 1
      );
    }
  };

  const subtotal =
    item.price * item.quantity;

  return (
    <article className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />

      <div className="cart-item-info">
        <h3>{item.name}</h3>

        <p>${item.price}</p>

        <p>
          Stock available: {item.stock}
        </p>
      </div>

      <div className="cart-item-quantity">
        <button
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={handleIncrease}
          disabled={item.quantity >= item.stock}
        >
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        <p>
          Subtotal: ${subtotal.toFixed(2)}
        </p>

        <button
          onClick={() =>
            removeFromCart(item._id)
          }
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;