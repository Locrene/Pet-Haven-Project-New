import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Settings({ theme, onThemeChange }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    adoptionAlerts: true,
    missingPetAlerts: true,
    showProfile: true,
    theme: "light",
    language: "en"
  });
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    setSettings(prev => ({ ...prev, theme }));
  }, [theme]);

  const handleSettingChange = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    if (key === "theme") {
      onThemeChange(value);
    }
  };

  const handleSave = () => {
    setSaveMessage("✓ Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h2>Settings</h2>
        <button onClick={() => navigate("/dashboard")} className="btn btn-ghost">Back</button>
      </div>

      <div style={{ marginTop: "30px", maxWidth: "900px" }}>
        {/* Tabs */}
        <div className="settings-tabs">
          <button 
            className={`tab ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            ⚙️ General
          </button>
          <button 
            className={`tab ${activeTab === "privacy" ? "active" : ""}`}
            onClick={() => setActiveTab("privacy")}
          >
            🔒 Privacy
          </button>
          <button 
            className={`tab ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            🔔 Notifications
          </button>
          <button 
            className={`tab ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            🔐 Account
          </button>
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="settings-panel">
            <h3>General Settings</h3>
            
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Theme</label>
                  <p>Choose your preferred appearance</p>
                </div>
                <select 
                  value={settings.theme}
                  onChange={(e) => handleSelectChange("theme", e.target.value)}
                  className="settings-select"
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Language</label>
                  <p>Select your preferred language</p>
                </div>
                <select 
                  value={settings.language}
                  onChange={(e) => handleSelectChange("language", e.target.value)}
                  className="settings-select"
                >
                  <option value="en">English</option>
                  <option value="fil">Filipino</option>
                  <option value="es">Español</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {activeTab === "privacy" && (
          <div className="settings-panel">
            <h3>Privacy Settings</h3>
            
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Show Profile to Others</label>
                  <p>Allow other users to see your profile</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.showProfile}
                    onChange={() => handleSettingChange("showProfile")}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Show My Pets Publicly</label>
                  <p>Your posted pets will be visible to all users</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Allow Direct Messages</label>
                  <p>Let other users send you messages</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === "notifications" && (
          <div className="settings-panel">
            <h3>Notification Preferences</h3>
            
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Email Notifications</label>
                  <p>Receive updates via email</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={() => handleSettingChange("emailNotifications")}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Adoption Alerts</label>
                  <p>Get notified about new adoption matches</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.adoptionAlerts}
                    onChange={() => handleSettingChange("adoptionAlerts")}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Missing Pet Alerts</label>
                  <p>Notifications for reported missing pets in your area</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.missingPetAlerts}
                    onChange={() => handleSettingChange("missingPetAlerts")}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === "account" && (
          <div className="settings-panel">
            <h3>Account Management</h3>
            
            <div className="settings-group">
              <div className="setting-item full-width">
                <div className="setting-info">
                  <label>Change Password</label>
                  <p>Update your password to keep your account secure</p>
                </div>
                <button className="btn btn-outline" style={{ minWidth: "140px" }}>
                  Change Password
                </button>
              </div>

              <div className="setting-item full-width">
                <div className="setting-info">
                  <label>Two-Factor Authentication</label>
                  <p>Add an extra layer of security to your account</p>
                </div>
                <button className="btn btn-outline" style={{ minWidth: "140px" }}>
                  Enable 2FA
                </button>
              </div>

              <div className="setting-item full-width">
                <div className="setting-info">
                  <label>Session Management</label>
                  <p>View and manage active sessions</p>
                </div>
                <button className="btn btn-outline" style={{ minWidth: "140px" }}>
                  View Sessions
                </button>
              </div>
            </div>

            <hr style={{ margin: "30px 0", border: "none", borderTop: "1px solid #e3ebfa" }} />

            <div className="danger-zone">
              <h3 style={{ color: "#e74c3c" }}>⚠️ Danger Zone</h3>
              <p>Irreversible actions - proceed with caution</p>
              
              <div className="settings-group">
                <div className="setting-item full-width">
                  <div className="setting-info">
                    <label>Delete Account</label>
                    <p>Permanently delete your account and all data</p>
                  </div>
                  <button 
                    className="btn btn-danger"
                    style={{ minWidth: "140px" }}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save Message */}
        {saveMessage && (
          <div style={{
            marginTop: "20px",
            padding: "12px 16px",
            background: "#d4edda",
            color: "#155724",
            borderRadius: "10px",
            textAlign: "center"
          }}>
            {saveMessage}
          </div>
        )}

        {/* Save Button */}
        <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
          <button onClick={handleSave} className="btn btn-primary" style={{ minWidth: "120px" }}>
            💾 Save Changes
          </button>
          <button onClick={() => navigate("/dashboard")} className="btn btn-outline" style={{ minWidth: "120px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
