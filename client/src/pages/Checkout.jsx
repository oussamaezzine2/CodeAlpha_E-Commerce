import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!user) {
    return (
      <main>
        <h1>Login Required</h1>

        <p>
          You need to login before placing an order.
        </p>

        <Link to="/login">
          Login
        </Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main>
        <h1>Checkout</h1>

        <p>Your cart is empty.</p>

        <Link to="/">
          Continue Shopping
        </Link>
      </main>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!shippingAddress.trim()) {
      setError(
        "Please enter your shipping address."
      );
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        items: cart.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress:
          shippingAddress.trim(),
      };

      const response = await api.post(
        "/orders",
        orderData
      );

      clearCart();

      navigate(
        `/orders/${response.data._id}`
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      {error && (
        <ErrorMessage message={error} />
      )}

      <section>
        <h2>Customer</h2>

        <p>
          Name: {user.name}
        </p>

        <p>
          Email: {user.email}
        </p>
      </section>

      <section>
        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item._id}
            className="checkout-item"
          >
            <span>
              {item.name}
            </span>

            <span>
              {item.quantity} × $
              {item.price}
            </span>

            <span>
              $
              {(
                item.price *
                item.quantity
              ).toFixed(2)}
            </span>
          </div>
        ))}

        <h2>
          Total: $
          {totalPrice.toFixed(2)}
        </h2>
      </section>

      <form onSubmit={handleSubmit}>
        <label htmlFor="shippingAddress">
          Shipping Address
        </label>

        <textarea
          id="shippingAddress"
          name="shippingAddress"
          value={shippingAddress}
          onChange={(event) =>
            setShippingAddress(
              event.target.value
            )
          }
          placeholder="Enter your full shipping address"
          rows="4"
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Place Order"}
        </button>
      </form>

      {loading && (
        <Loading message="Processing your order..." />
      )}
    </main>
  );
}

export default Checkout;