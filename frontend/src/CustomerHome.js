import React, { useState, useEffect } from "react";
import Product from "./Product.js";
import NavBar from "./NavBar.js";
import "./customerHome.css";
import apiURL from './apiConfig.js';

function CustomerHome({ onLogout, cart = [], setCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState({}); // Store quantity for each product separately

  useEffect(() => {
    fetch(`${apiURL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle quantity change for each product
  const handleQuantityChange = (product_id, quantity) => {
    if (quantity > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product_id]: quantity,
      }));
    }
  };

  // Add product to cart using selected quantity
  const addToCart = (product) => {
    const quantityToAdd = quantities[product.id] || 1; // Default to 1 if no quantity is set
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: quantityToAdd }];
      }
    });

    // Reset the quantity input back to 1 after adding to cart
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: 1,
    }));
  };

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="customer-home">
      <NavBar cartCount={cart.length} onLogout={onLogout} />

      {/* Search Bar */}
      <input
        className="search-bar"
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Product List */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product}>
            {/* Quantity Input */}
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={quantities[product.id] || 1} // Default quantity is 1
              onChange={(e) =>
                handleQuantityChange(product.id, parseInt(e.target.value))
              }
              style={{ width: "50px", marginRight: "10px" }}
            />

            <button
              disabled={product.quantity === 0}
              onClick={() => addToCart(product)}
            >
              {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </Product>
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;
