import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";

import api from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response =
          await api.get(
            `/products/${id}`
          );

        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <Link to="/">
        ← Back to products
      </Link>

      <img
        src={product.image}
        alt={product.name}
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        Category: {product.category}
      </p>

      <h2>${product.price}</h2>

      <p>
        Stock: {product.stock}
      </p>

      <button
        onClick={() =>
          addToCart(product)
        }
        disabled={product.stock === 0}
      >
        Add to Cart
      </button>
    </main>
  );
}

export default ProductDetails;