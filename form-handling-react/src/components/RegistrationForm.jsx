import React, { useState } from "react";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
      return;
    }

    setErrors({});
    setSuccess("Form submitted successfully!");
    console.log("Submitted data:", { username, email, password });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}  
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}  
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
}

export default RegistrationForm;
