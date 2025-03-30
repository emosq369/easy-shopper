import React, { useState } from "react";
import "./cart.css";
import apiURL from './apiConfig.js';

function Cart({ cart, setCart, user_id }) {
  const [message, setMessage] = useState("");

  // Remove product from the cart
  const removeFromCart = (product_id) => {
    const updatedCart = cart.filter((item) => item.id !== product_id);
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Update quantity in the cart
  const updateQuantity = (product_id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === product_id ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Submit order to backend
  const submitOrder = async () => {
    if (cart.length === 0) {
      setMessage(
        "Error: Your cart is empty. Please add items before submitting."
      );
      return;
    }

    try {
      const response = await fetch(`${apiURL}/neworder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, cart }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setCart([]); // Clear cart
        sessionStorage.removeItem("cart");
      } else {
        setMessage(data.error || "Error submitting order.");
      }
    } catch (error) {
      setMessage("Server error: Unable to submit order.");
    }
  };

  return (
    <div className="cart-container">
      {/* Back to Home Link */}
      <nav>
        <a href="/home" className="back-to-home">
          ← Back to Home
        </a>
      </nav>

      <h1 className="cart-header">Your Shopping Cart</h1>

      {/* Cart Items */}
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              {/* Product Image */}
              <img
                src={item.image_url || "https://via.placeholder.com/100"}
                alt={item.product_name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                {/* Product Name */}
                <h2>{item.product_name}</h2>
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div>
                {/* Quantity Input */}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
                {/* Remove Button */}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Total and Submit */}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Total: ${calculateTotal()}</h2>
          <button className="cart-submit-btn" onClick={submitOrder}>
            Submit Order
          </button>
        </div>
      )}

      {/* Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Cart;
