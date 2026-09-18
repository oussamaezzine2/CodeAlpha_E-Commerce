import { useEffect, useState } from "react";
import api from "../services/api";
import ProductList from "../components/ProductList";

function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <section className="hero">
        <h1>Welcome to My Store</h1>
        <p>Find the products you need.</p>
      </section>

      <section>
        <h2>Products</h2>

        <ProductList
          products={products}
          onAddToCart={onAddToCart}
        />
      </section>
    </main>
  );
}

export default Home;