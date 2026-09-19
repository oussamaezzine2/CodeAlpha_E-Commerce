import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

function Orders() {
  const { id } = useParams();

  const { user } = useAuth();

  const [orders, setOrders] =
    useState([]);

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        if (id) {
          const response =
            await api.get(
              `/orders/${id}`
            );

          setOrder(response.data);
        } else {
          const response =
            await api.get("/orders");

          setOrders(response.data);
        }
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id, user]);

  if (!user) {
    return (
      <main>
        <h1>Orders</h1>

        <p>
          Please login to view your orders.
        </p>

        <Link to="/login">
          Login
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <Loading message="Loading orders..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  if (id) {
    if (!order) {
      return (
        <ErrorMessage message="Order not found." />
      );
    }

    return (
      <main className="order-details">
        <Link to="/orders">
          ← Back to orders
        </Link>

        <h1>
          Order #{order._id}
        </h1>

        <p>
          Status:{" "}
          <strong>
            {order.status}
          </strong>
        </p>

        <p>
          Shipping Address:{" "}
          {order.shippingAddress}
        </p>

        <h2>Items</h2>

        {order.items.map((item, index) => (
          <div
            key={
              item.product?._id ||
              item.product ||
              index
            }
            className="order-item"
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
          {Number(
            order.totalAmount
          ).toFixed(2)}
        </h2>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main>
        <h1>My Orders</h1>

        <p>
          You haven't placed any orders yet.
        </p>

        <Link to="/">
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <h1>My Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <article
            key={order._id}
            className="order-card"
          >
            <h2>
              Order #{order._id}
            </h2>

            <p>
              Total: $
              {Number(
                order.totalAmount
              ).toFixed(2)}
            </p>

            <p>
              Status:{" "}
              <strong>
                {order.status}
              </strong>
            </p>

            <Link
              to={`/orders/${order._id}`}
            >
              View Order
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Orders;