import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./orders.css";
import apiURL from './apiConfig.js';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("role");

  useEffect(() => {
    if (!userId || userRole !== "customer") {
      setIsAuthenticated(false);
    } else {
      fetch(`${apiURL}/orders/${userId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch orders");
          return response.json();
        })
        .then((data) => setOrders(data))
        .catch((err) => console.error("Error fetching orders", err));
    }
  }, [userId, userRole]);

  return (
    <div className="orders-container">
      {/* Back to Home */}
      <nav>
        <Link to="/home" className="back-to-home">
          ← Back to Home
        </Link>
      </nav>

      <h1 className="orders-header">My Orders</h1>

      {/* Orders List */}
      {orders.length === 0 ? (
        <p className="no-orders">No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <Link to={`/order/${order.id}`} className="order-link">
                <h3>Order #{order.order_number}</h3>
              </Link>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
              <p>Total: ${order.total_price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
