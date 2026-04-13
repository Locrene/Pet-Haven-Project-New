import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, variant }) {
  return (
    <div className="navbar">
      <h2>PawHaven</h2>

      <ul>
        {isLoggedIn && variant !== "public" && (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/adoption">Adoption</Link></li>
            <li><Link to="/missing">Missing Pets</Link></li>
            <li><Link to="/map">Map</Link></li>
          </>
        )}
      </ul>

      {!isLoggedIn ? (
        <div className="nav-buttons">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Sign Up</button></Link>
        </div>
      ) : (
        <button>Logout</button>
      )}
    </div>
  );
}

export default Navbar;