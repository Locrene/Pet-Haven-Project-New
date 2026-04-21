import { Link, useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, variant, onLogout }) {
  const navigate = useNavigate();
  const isPublic = variant === "public";

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          <span className="logo-icon">🐾</span>
          <div className="brand-text">
            <h1>PawHaven</h1>
            <p>Adopt. Care. Connect.</p>
          </div>
        </Link>
      </div>

      <ul className="nav-links">
        {isLoggedIn && !isPublic && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/adoption">Adoption</Link></li>
            <li><Link to="/missing">Missing Pets</Link></li>
            <li><Link to="/messages">Messages</Link></li>
            <li><Link to="/map">Map</Link></li>
          </>
        )}
      </ul>

      <div className="navbar-actions">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        ) : (
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;