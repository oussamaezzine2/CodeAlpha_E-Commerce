function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
      />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>${product.price}</p>

      <p>Stock: {product.stock}</p>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;