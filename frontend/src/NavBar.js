import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css"; //

function NavBar({ cartCount, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>🛒 EasyShopper</h1>
      </div>

      <nav className="navbar">
        <Link to="/cart" className="nav-link">
          <div className="cart-icon">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
              alt="cart-icon"
            />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </Link>
        <Link to="/orders" className="nav-link">
          Orders
        </Link>
        <button onClick={handleLogout} className="nav-link logout-button">
          Logout
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
