import React, { useState } from "react";
import "./authForm.css";
import apiURL from './apiConfig.js';

function AuthenticationForm({ onLoginSuccess }) {
  const [formType, setFormType] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      // console.log('Response data:', data);

      if (response.ok) {
        setMessage("Log in successful!");
        sessionStorage.setItem("userId", data.user.id);
        sessionStorage.setItem("role", data.user.role);
        sessionStorage.setItem("username", data.user.username);
        // console.log('User ID saved:', data.user.id);
        console.log("User ID:", sessionStorage.getItem("userId"));
        onLoginSuccess(data.user.role, data.user.id);
      } else {
        setMessage(data.message || "Log in Failed");
      }
    } catch (error) {
      setMessage("Error login in");
      setUsername("");
      setPassword("");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successfully");
        setUsername("");
        setPassword("");
        setEmail("");

        setFormType("login");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Error Registering");
      console.error(error);
    }
  }

  return (
    <div className="auth-form">
      {/* Left style */}
      <div className="left-side">
        <span>Welcome</span>
        <span>to</span>
        <span>EasyShopper</span>
      </div>
      {/* Right style */}
      <div className="right-side">
        <h2>{formType === "login" ? "Log In" : "Sign Up"}</h2>
        <form onSubmit={formType === "login" ? handleLogin : handleRegister}>
          {/* Username */}
          <label htmlFor="user">Username</label>
          <input
            type="text"
            value={username}
            id="user"
            placeholder="User"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* Email */}
          {formType === "register" && (
            <>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}
          {/* Password */}
          <label htmlFor="pass">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              id="pass"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🔒" : "👁️"}
            </span>
          </div>
          <button type="submit">
            {formType === "login" ? "Sign in" : "Sign Up"}
          </button>
        </form>
        <p>{message}</p>
        {/* {formType === 'login' && message && <p className="error-message">{message}</p>} */}
        <p>
          {formType === "login"
            ? "Don't have an account?"
            : "Already have an account"}{" "}
          <a
            href="#"
            onClick={() =>
              setFormType(formType === "login" ? "register" : "login")
            }
          >
            {formType === "login" ? "Register here" : "Sign in here"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthenticationForm;
