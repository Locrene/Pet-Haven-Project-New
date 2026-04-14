import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login({ setIsLoggedIn, setUserName }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setIsLoggedIn(true);
    setUserName(username);
    navigate("/");
  };

  return (
    <div>
      <Navbar variant="public" />

      <div className="login-container">
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

          {error && <p className="error">{error}</p>}

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Log In</button>

          <p className="forgot">Forgot password?</p>

          <p>
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;