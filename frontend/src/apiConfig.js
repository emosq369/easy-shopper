const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://easy-shopper-backend.onrender.com"
    : "http://localhost:4000";

export default apiURL;
