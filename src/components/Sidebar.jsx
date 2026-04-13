import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>PawHaven</h2>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/adoption">Adoption Feed</Link></li>
        <li><Link to="/missing">Missing Pets</Link></li>
        <li><Link to="/messages">Messages</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;