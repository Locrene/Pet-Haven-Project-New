import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h2>My Profile</h2>
        <button onClick={() => navigate("/")} className="btn btn-ghost">Back</button>
      </div>

      <div className="profile-card" style={{ marginTop: "30px", maxWidth: "600px" }}>
        <div className="profile-details">
          <h3>User Profile</h3>
          <div className="details-list">
            <div>
              <div className="detail-label">Name</div>
              <strong>John Doe</strong>
            </div>
            <div>
              <div className="detail-label">Email</div>
              <strong>john@example.com</strong>
            </div>
            <div>
              <div className="detail-label">Phone</div>
              <strong>+63 912 345 6789</strong>
            </div>
            <div>
              <div className="detail-label">Location</div>
              <strong>Cebu City, Philippines</strong>
            </div>
          </div>
          <button style={{ marginTop: "20px" }} className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
