import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-content">
        <p className="product-category">
          {product.category}
        </p>

        <h2>{product.name}</h2>

        <p className="product-price">
          ${product.price.toFixed(2)}
        </p>

        <p>
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </p>

        <div className="product-actions">
          <Link
            to={`/products/${product._id}`}
          >
            Details
          </Link>

          <button
            onClick={() =>
              addToCart(product)
            }
            disabled={product.stock === 0}
          >
            {product.stock === 0
              ? "Unavailable"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;