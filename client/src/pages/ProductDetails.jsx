import { useEffect, useState } from "react";
import {
  useParams,
  Link
} from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(
          `/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        console.error(error);
        setError("Product not found");
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
    <div>
      <Link to="/">← Back to products</Link>

      <img
        src={product.image}
        alt={product.name}
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>${product.price}</h2>

      <p>Category: {product.category}</p>

      <p>Stock: {product.stock}</p>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;