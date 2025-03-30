import React, { useState, useEffect } from "react";
import Product from "./Product.js";
import { Link } from "react-router-dom";
import "./adminHome.css";
import apiURL from './apiConfig.js';


function AdminHome({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products
  const fetchProducts = () => {
    fetch(`${apiURL}/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setMessage("");
      })
      .catch((error) =>
        setMessage("Error fetching products: " + error.message)
      );
  };

  // Delete a product
  const deleteProduct = (productId) => {
    fetch(`${apiURL}/deleteproduct/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        setMessage("Product deleted successfully!");
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      })
      .catch((error) => setMessage("Error deleting product: " + error.message));
  };

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-home">
      {/* Page Header */}
      <div className="header">
        <h1>Admin Product Catalog</h1>
        <div className="navigation-links">
          <Link to="/add-product" className="button-link">
            Add Product
          </Link>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Product List */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product}>
            <button
              className="delete-button"
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </Product>
        ))}
      </div>

      {/* Message Display */}
      {message && <div className="toast-message">{message}</div>}
    </div>
  );
}

export default AdminHome;
