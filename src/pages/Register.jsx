import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    setForm({ ...form, [e.target.name]: e.target.value });
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

    // Load existing users
    const existingUsers = JSON.parse(localStorage.getItem("pawhavenUsers") || "[]");

    // Block duplicate emails
    if (existingUsers.find((u) => u.email === form.email)) {
      setError("An account with this email already exists");
      return;
    }

    // Save new user
    existingUsers.push({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    localStorage.setItem("pawhavenUsers", JSON.stringify(existingUsers));

    setError("");
    alert("Registered successfully! You can now log in.");
    navigate("/login");
  };

  return (
    <div>
      <div className="login-container">

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>

        <div className="login-card">
          <h2>Create Your Account</h2>

          {error && <p className="error">{error}</p>}

          <input name="firstName" placeholder="First Name" onChange={handleChange} />
          <input name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />

          <button onClick={handleRegister}>Sign Up</button>

          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;