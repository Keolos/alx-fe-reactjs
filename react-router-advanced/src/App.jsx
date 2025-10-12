import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/post/123">Dynamic Post</Link>

          <button
            onClick={() => setIsAuthenticated(!isAuthenticated)}
            style={{
              marginLeft: "auto",
              backgroundColor: isAuthenticated ? "#e74c3c" : "#2ecc71",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Protected Route for Profile */}
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Dynamic Route for Blog Post */}
          <Route path="/post/:postId" element={<Post />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
