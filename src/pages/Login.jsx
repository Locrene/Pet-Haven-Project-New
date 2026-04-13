import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setIsLoggedIn(true);
    navigate("/Landing2");
  };

  return (
    <div>

      {/* NAVBAR */}
      <Navbar variant="public" />

      {/* LOGIN */}
      <div className="login-container">

        {/* BACK BUTTON */}
        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div className="login-card">
          <h2>Welcome Back!</h2>

          <p style={{ color: "#777", marginBottom: "20px" }}>
            Cebu City Pet Adoption
          </p>

          {/* ERROR */}
          {error && <p className="error">{error}</p>}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* LOGIN BUTTON */}
          <button onClick={handleLogin}>Log In</button>

          
          {/* FORGOT */}
          <p className="forgot">Forgot password?</p>


          {/* REGISTER */}
          <p>
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;