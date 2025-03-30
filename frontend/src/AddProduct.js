import React, { useState } from "react";
import "./addProduct.css";
import apiURL from './apiConfig.js';

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();

    const product = { name, description, price, quantity, image_url: imageUrl };

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.quantity
    ) {
      setMessage("All fields are required");
      return;
    }

    if (product.price < 0 || product.quantity < 0) {
      setMessage("Price and Quantity must be valid positive numbers");
      return;
    }

    try {
      const response = await fetch(`${apiURL}/addproduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImageUrl("");
      } else {
        setMessage(
          data.message || "An error occurred while adding the product"
        );
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }
  };

  return (
    <div className="add-product">
      {/* Page Header */}
      <div className="header">
        <h1>Add New Product</h1>
        <a href="/admin" className="back-link">
          ← Back to Admin Home
        </a>
      </div>

      {/* Notification Message */}
      {message && <div className="message">{message}</div>}

      {/* Product Form */}
      <form onSubmit={addProduct} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
