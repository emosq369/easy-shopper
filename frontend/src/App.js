import React, { useEffect, useState } from "react";
import AuthenticationForm from "./LoginForm.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AdminHome from "./AdminHome.js";
import CustomerHome from "./CustomerHome.js";
import Orders from "./Orders.js";
import Order from "./Order.js";
import AddProduct from "./AddProduct.js";
import Cart from "./Cart.js";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    const StoredUserId = sessionStorage.getItem("userId");
    console.log("UserId", sessionStorage.getItem("userId"));
    if (StoredUserId && storedRole) {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  function handleLoginsuccess(role, userId) {
    setIsAuthenticated(true);
    setUserRole(role);
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("role", role);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setUserRole("");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("userId");
  }

  return (
    <Router>
      <Routes>
        {/* Log in route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to={userRole === "manager" ? "/admin" : "/home"} />
            ) : (
              <AuthenticationForm onLoginSuccess={handleLoginsuccess} />
            )
          }
        />
        {/* Manager home */}
        <Route
          path="/admin"
          element={
            isAuthenticated && userRole === "manager" ? (
              <AdminHome onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Customer home */}
        <Route
          path="/home"
          element={
            isAuthenticated && userRole === "customer" ? (
              <CustomerHome
                onLogout={handleLogout}
                cart={cart}
                setCart={setCart}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Cart route */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              user_id={sessionStorage.getItem("userId")}
            />
          }
        />
        {/* Orders page */}
        <Route
          path="/orders"
          element={
            isAuthenticated && userRole === "customer" ? (
              <Orders />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Order page */}
        <Route
          path="/order/:orderId"
          element={
            isAuthenticated && userRole === "customer" ? (
              <Order />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* Add product page */}
        <Route
          path="/add-product"
          element={
            isAuthenticated && userRole === "manager" ? (
              <AddProduct />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
