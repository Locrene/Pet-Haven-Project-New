import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div>

      {/* NAVBAR */}
      <Navbar variant="public" />

      {/* REGISTER FORM */}
      <div className="login-container">

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div className="login-card">
          <h2>Create Your Account</h2>

          {/* ERROR */}
          {error && <p className="error">{error}</p>}

          {/* INPUTS */}
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />

          {/* BUTTON */}
          <button onClick={handleRegister}>Sign Up</button>

          {/* LOGIN LINK */}
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>

      </div>

    </div>
  );
}

export default Register;