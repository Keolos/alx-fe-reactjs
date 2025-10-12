import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Import global styles if any
import "./index.css";

// Render the root component
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
