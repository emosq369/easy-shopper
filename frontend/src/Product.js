import React from "react";
import "./product.css";

function Product({ product, children }) {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />
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
