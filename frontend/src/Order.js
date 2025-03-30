import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./order.css";
import apiURL from './apiConfig.js';


function Order() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`${apiURL}/order/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error("Error fetching order details", err));
  }, [orderId]);

  return (
    <div className="order-container">
      {/* Back to Orders */}
      <nav>
        <Link to="/orders" className="back-to-orders">
          ← Back to Orders
        </Link>
      </nav>

      {/* Order Details */}
      {order ? (
        <div>
          <h1 className="order-header">Order #{order.order_number}</h1>
          <p>
            Status: <strong>{order.status}</strong>
          </p>
          <p>Total: ${order.total_price}</p>

          <h2 className="products-header">Products</h2>
          <ul className="products-list">
            {order.products.map((product) => (
              <li key={product.id} className="product-item">
                <strong>{product.name}</strong>
                <p>Description: {product.description}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Total: ${product.total}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="loading-message">Loading Order details...</p>
      )}
    </div>
  );
}

export default Order;
