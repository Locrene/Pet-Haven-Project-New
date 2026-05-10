import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .profile-page {
    min-height: 100vh;
    background: #f0f4f8;
    font-family: 'DM Sans', sans-serif;
    padding: 36px 40px 80px;
  }

  .profile-breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #94a3b8;
    margin-bottom: 12px;
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  .profile-breadcrumb button {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    padding: 0;
    transition: color 0.2s;
  }

  .profile-breadcrumb button:hover {
    color: #2563eb;
  }

  .profile-breadcrumb span {
    color: #cbd5e1;
    font-size: 11px;
  }

  .profile-breadcrumb .current {
    color: #475569;
    font-weight: 500;
  }

  .profile-page-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 600;
    color: #0f172a;
    margin: 0 0 28px 0;
    letter-spacing: -0.02em;
    text-align: left;
  }

  .profile-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 24px;
    max-width: 960px;
  }

  /* Left card — avatar & name */
  .profile-avatar-card {
    background: #fff;
    border-radius: 20px;
    padding: 36px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04);
    align-self: start;
  }

  .avatar-ring {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 8px 24px rgba(37,99,235,0.25);
  }

  .avatar-ring svg {
    color: #fff;
  }

  .avatar-status {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #22c55e;
    border: 2px solid #fff;
  }

  .avatar-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #0f172a;
    text-align: center;
    margin: 0;
  }

  .avatar-email {
    font-size: 13px;
    color: #94a3b8;
    text-align: center;
    margin: -8px 0 0;
  }

  .avatar-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #eff6ff;
    color: #2563eb;
    font-size: 11.5px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 100px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .avatar-badge::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2563eb;
  }

  .avatar-divider {
    width: 100%;
    height: 1px;
    background: #f1f5f9;
  }

  .avatar-stat-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    gap: 8px;
  }

  .avatar-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .avatar-stat-num {
    font-size: 22px;
    font-weight: 600;
    color: #0f172a;
    line-height: 1;
  }

  .avatar-stat-label {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 500;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  /* Right card — details */
  .profile-details-card {
    background: #fff;
    border-radius: 20px;
    padding: 36px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04);
    align-self: start;
  }

  .details-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  .details-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: #0f172a;
    margin: 0;
  }

  .details-card-subtitle {
    font-size: 13px;
    color: #94a3b8;
    margin: 4px 0 0;
  }

  .field-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }

  .field-grid .field-full {
    grid-column: 1 / -1;
  }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .field-input-wrapper {
    position: relative;
    background: #f8fafc;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    transition: border-color 0.2s, background 0.2s;
    overflow: hidden;
  }

  .field-input-wrapper:focus-within {
    border-color: #2563eb;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.08);
  }

  .field-input-wrapper.disabled {
    background: #f8fafc;
    cursor: default;
  }

  .field-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .field-label {
    position: absolute;
    top: 10px;
    left: 44px;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .field-value {
    padding: 30px 14px 12px 44px;
    font-size: 15px;
    font-weight: 500;
    color: #0f172a;
    background: none;
    border: none;
    outline: none;
    width: 100%;
    font-family: 'DM Sans', sans-serif;
    cursor: default;
  }

  .field-value.editable {
    cursor: text;
  }

  /* Edit mode toggle */
  .edit-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #f1f5f9;
    color: #475569;
    border: none;
    border-radius: 10px;
    padding: 9px 16px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }

  .edit-toggle-btn:hover {
    background: #e2e8f0;
    color: #1e293b;
  }

  .edit-toggle-btn.active {
    background: #2563eb;
    color: #fff;
    box-shadow: 0 4px 12px rgba(37,99,235,0.3);
  }

  .edit-toggle-btn.active:hover {
    background: #1d4ed8;
  }

  /* Action row */
  .profile-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24px;
    border-top: 1.5px solid #f1f5f9;
    margin-top: 4px;
  }

  .action-hint {
    font-size: 12.5px;
    color: #94a3b8;
  }

  .action-btns {
    display: flex;
    gap: 10px;
  }

  .btn-save {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 12px 28px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    box-shadow: 0 4px 16px rgba(37,99,235,0.35);
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }

  .btn-save:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(37,99,235,0.45);
  }

  .btn-save:active {
    transform: translateY(0);
  }

  .btn-cancel {
    background: #f1f5f9;
    color: #64748b;
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }

  .btn-cancel:hover {
    background: #e2e8f0;
    color: #1e293b;
  }

  .save-success {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #16a34a;
    font-size: 13.5px;
    font-weight: 600;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 700px) {
    .profile-layout {
      grid-template-columns: 1fr;
    }
    .field-grid {
      grid-template-columns: 1fr;
    }
    .field-grid .field-full {
      grid-column: auto;
    }
  }
`;

const IconUser = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.93a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconEdit = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+63 912 345 6789",
    location: "Cebu City, Philippines",
  });
  const [draft, setDraft] = useState({ ...form });

  const handleEdit = () => {
    setDraft({ ...form });
    setEditing(true);
    setSaved(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = () => {
    setForm({ ...draft });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field) => (e) => {
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const fields = [
    { key: "name", label: "Full Name", icon: <IconUser />, placeholder: "Your full name", icon2: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { key: "email", label: "Email Address", icon: <IconMail />, placeholder: "Your email", full: false },
    { key: "phone", label: "Phone Number", icon: <IconPhone />, placeholder: "Your phone", full: false },
    { key: "location", label: "Location", icon: <IconPin />, placeholder: "Your city, country", full: true },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="profile-page">
        {/* Breadcrumb */}
        <div className="profile-breadcrumb">
          <button onClick={() => navigate("/")}>Home</button>
          <span>›</span>
          <span className="current">My Profile</span>
        </div>

        <h1 className="profile-page-title">My Profile</h1>

        <div className="profile-layout">
          {/* Left — Avatar card */}
          <div className="profile-avatar-card">
            <div className="avatar-ring">
              <IconUser />
              <div className="avatar-status" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p className="avatar-name">{form.name}</p>
              <p className="avatar-email">{form.email}</p>
            </div>
            <div className="avatar-badge">Verified Member</div>
            <div className="avatar-divider" />
            <div className="avatar-stat-row">
              <div className="avatar-stat">
                <span className="avatar-stat-num">3</span>
                <span className="avatar-stat-label">Adopted</span>
              </div>
              <div className="avatar-stat">
                <span className="avatar-stat-num">7</span>
                <span className="avatar-stat-label">Listed</span>
              </div>
              <div className="avatar-stat">
                <span className="avatar-stat-num">12</span>
                <span className="avatar-stat-label">Saved</span>
              </div>
            </div>
          </div>

          {/* Right — Details card */}
          <div className="profile-details-card">
            <div className="details-card-header">
              <div>
                <h2 className="details-card-title">Personal Information</h2>
                <p className="details-card-subtitle">
                  {editing ? "Make changes and save when done." : "Your profile details and contact info."}
                </p>
              </div>
              {!editing && (
                <button className="edit-toggle-btn" onClick={handleEdit}>
                  <IconEdit size={14} /> Edit Profile
                </button>
              )}
            </div>

            <div className="field-grid">
              {fields.map(({ key, label, icon, placeholder, full }) => (
                <div key={key} className={`field-group${full ? " field-full" : ""}`}>
                  <div className={`field-input-wrapper${!editing ? " disabled" : ""}`}>
                    <span className="field-icon">{icon}</span>
                    <span className="field-label">{label}</span>
                    <input
                      className={`field-value${editing ? " editable" : ""}`}
                      value={editing ? draft[key] : form[key]}
                      onChange={handleChange(key)}
                      readOnly={!editing}
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-actions">
              <div>
                {saved && (
                  <span className="save-success">
                    <IconCheck /> Profile saved successfully
                  </span>
                )}
                {!saved && !editing && (
                  <span className="action-hint">Last updated just now</span>
                )}
              </div>
              {editing && (
                <div className="action-btns">
                  <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                  <button className="btn-save" onClick={handleSave}>Save Changes</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;