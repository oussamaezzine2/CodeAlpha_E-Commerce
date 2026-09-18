import { Link } from "react-router-dom";

function ProductCard({
  product,
  onAddToCart
}) {
  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-card-content">
        <h2>{product.name}</h2>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-price">
          ${product.price}
        </p>

        <p>
          Stock: {product.stock}
        </p>

        <div className="product-actions">
          <Link
            to={`/products/${product._id}`}
          >
            View Details
          </Link>

          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;