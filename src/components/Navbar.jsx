import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar({ isLoggedIn, variant, onLogout }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const isPublic = variant === "public";

  const handleLogout = () => {
    onLogout();
    navigate("/");
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        document.querySelector(".navbar")?.classList.add("scrolled");
      } else {
        document.querySelector(".navbar")?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {isLoggedIn ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/adoption">Adoption</Link></li>
            <li><Link to="/missing">Missing Pets</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/messages">Messages</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/adoption">Adoption</Link></li>
            <li><Link to="/missing">Missing Pets</Link></li>
            <li><Link to="/about">About Us</Link></li>
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
          <div className="profile-menu" ref={dropdownRef}>
            <button className="profile-btn" onClick={toggleDropdown}>
              👤
            </button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" onClick={() => setShowDropdown(false)}>My Profile</Link>
                <Link to="/my-pets" onClick={() => setShowDropdown(false)}>My Pets</Link>
                <Link to="/settings" onClick={() => setShowDropdown(false)}>Settings</Link>
                <hr />
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;