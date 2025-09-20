import React from "react";
import "./product.css";

function Product({ product, children }) {
  const displaySrc =
    (product.image_url && product.image_url.trim()) ||
    `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`;
  return (
    <div className="product-card">
      <img
        src={displaySrc}
        alt={product.name}
        onError={(e) => {
          // avoid infinite loop: swap to local file once
          if (e.currentTarget.dataset.fallback !== "1") {
            e.currentTarget.dataset.fallback = "1";
            e.currentTarget.src = "/placeholder.png";
          }
        }}
      />
      <div className="product-card-content">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <span>{children}</span>
      </div>
    </div>
  );
}

export default Product;
