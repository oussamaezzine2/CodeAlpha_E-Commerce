import ProductCard from "./ProductCard";

function ProductList({
  products,
  onAddToCart
}) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;