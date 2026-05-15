import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TABS = [
  { id: "general",       icon: "⚙️",  label: "General" },
  { id: "privacy",       icon: "🔒",  label: "Privacy" },
  { id: "notifications", icon: "🔔",  label: "Notifications" },
  { id: "account",       icon: "👤",  label: "Account" },
];

/* ─── tiny reusable components ─── */

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div style={s.settingRow}>
      <div style={s.settingInfo}>
        <span style={s.settingLabel}>{label}</span>
        <span style={s.settingDesc}>{description}</span>
      </div>
      <label style={s.toggle}>
        <input type="checkbox" checked={checked} onChange={onChange} style={{ display: "none" }} />
        <div style={{ ...s.track, background: checked ? "#1e3a6e" : "#cbd5e1" }}>
          <div style={{ ...s.thumb, transform: checked ? "translateX(22px)" : "translateX(2px)" }} />
        </div>
      </label>
    </div>
  );
}

function SelectRow({ label, description, value, onChange, options }) {
  return (
    <div style={s.settingRow}>
      <div style={s.settingInfo}>
        <span style={s.settingLabel}>{label}</span>
        <span style={s.settingDesc}>{description}</span>
      </div>
      <select value={value} onChange={onChange} style={s.select}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function ActionRow({ label, description, btnLabel, btnStyle, onClick }) {
  return (
    <div style={s.settingRow}>
      <div style={s.settingInfo}>
        <span style={s.settingLabel}>{label}</span>
        <span style={s.settingDesc}>{description}</span>
      </div>
      <button onClick={onClick} style={{ ...s.actionBtn, ...btnStyle }}>
        {btnLabel}
      </button>
    </div>
  );
}

/* ─── main component ─── */

function Settings({ theme, onThemeChange }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState("");

  const [settings, setSettings] = useState({
    theme: theme || "light",
    language: "en",
    showProfile: true,
    showPetsPublicly: true,
    allowDMs: true,
    emailNotifications: true,
    adoptionAlerts: true,
    missingPetAlerts: true,
  });

  useEffect(() => {
    setSettings((prev) => ({ ...prev, theme }));
  }, [theme]);

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const select = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    if (key === "theme") onThemeChange(value);
  };

  const showToast = (msg, color = "#1e3a6e") => {
    setToast({ msg, color });
    setTimeout(() => setToast(""), 3000);
  };

  const handleSave = () => showToast("✔ Settings saved successfully!", "#0f766e");
  const handleDelete = () => {
    if (window.confirm("Are you sure? This will permanently delete your account.")) {
      showToast("Account deletion requested.", "#dc2626");
    }
  };

  return (
    <div style={s.page}>

      {/* ── Header ── */}
      <div style={s.header}>
        <div>
          <h1 style={s.pageTitle}>Settings</h1>
          <p style={s.pageSubtitle}>Manage your account preferences and privacy</p>
        </div>
        <button onClick={() => navigate("/dashboard")} style={s.backBtn}>
          ← Back to Dashboard
        </button>
      </div>

      <div style={s.layout}>

        {/* ── Sidebar tabs ── */}
        <aside style={s.sidebar}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...s.tabBtn,
                ...(activeTab === tab.id ? s.tabBtnActive : {}),
              }}
            >
              <span style={s.tabIcon}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && <span style={s.tabIndicator} />}
            </button>
          ))}
        </aside>

        {/* ── Panel ── */}
        <main style={s.panel}>

          {/* GENERAL */}
          {activeTab === "general" && (
            <Section title="General Settings" subtitle="Configure your app experience">
              <SelectRow
                label="Theme"
                description="Choose your preferred appearance"
                value={settings.theme}
                onChange={(e) => select("theme", e.target.value)}
                options={[
                  { value: "light", label: "☀️  Light Mode" },
                  { value: "dark",  label: "🌙  Dark Mode" },
                  { value: "auto",  label: "🖥️  Auto (System)" },
                ]}
              />
              <SelectRow
                label="Language"
                description="Select your preferred language"
                value={settings.language}
                onChange={(e) => select("language", e.target.value)}
                options={[
                  { value: "en",  label: "🇺🇸  English" },
                  { value: "fil", label: "🇵🇭  Filipino" },
                  { value: "es",  label: "🇪🇸  Español" },
                ]}
              />
            </Section>
          )}

          {/* PRIVACY */}
          {activeTab === "privacy" && (
            <Section title="Privacy Settings" subtitle="Control who can see your information">
              <ToggleRow
                label="Show Profile to Others"
                description="Allow other users to view your profile page"
                checked={settings.showProfile}
                onChange={() => toggle("showProfile")}
              />
              <ToggleRow
                label="Show My Pets Publicly"
                description="Your posted pets will be visible to all users"
                checked={settings.showPetsPublicly}
                onChange={() => toggle("showPetsPublicly")}
              />
              <ToggleRow
                label="Allow Direct Messages"
                description="Let other users send you messages"
                checked={settings.allowDMs}
                onChange={() => toggle("allowDMs")}
              />
            </Section>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <Section title="Notification Preferences" subtitle="Choose what updates you receive">
              <ToggleRow
                label="Email Notifications"
                description="Receive important updates directly to your email"
                checked={settings.emailNotifications}
                onChange={() => toggle("emailNotifications")}
              />
              <ToggleRow
                label="Adoption Alerts"
                description="Get notified when a pet matches your preferences"
                checked={settings.adoptionAlerts}
                onChange={() => toggle("adoptionAlerts")}
              />
              <ToggleRow
                label="Missing Pet Alerts"
                description="Be notified about reported missing pets in your area"
                checked={settings.missingPetAlerts}
                onChange={() => toggle("missingPetAlerts")}
              />
            </Section>
          )}

          {/* ACCOUNT */}
          {activeTab === "account" && (
            <>
              <Section title="Account Security" subtitle="Keep your account safe and secure">
                <ActionRow
                  label="Change Password"
                  description="Update your password regularly for better security"
                  btnLabel="Change Password"
                  btnStyle={s.outlineBtn}
                />
                <ActionRow
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your login"
                  btnLabel="Enable 2FA"
                  btnStyle={s.outlineBtn}
                />
                <ActionRow
                  label="Active Sessions"
                  description="View and manage devices logged into your account"
                  btnLabel="View Sessions"
                  btnStyle={s.outlineBtn}
                />
              </Section>

              {/* Danger Zone */}
              <div style={s.dangerZone}>
                <div style={s.dangerHeader}>
                  <span style={s.dangerIcon}>⚠️</span>
                  <div>
                    <p style={s.dangerTitle}>Danger Zone</p>
                    <p style={s.dangerDesc}>These actions are irreversible — proceed with caution</p>
                  </div>
                </div>
                <div style={s.dangerRow}>
                  <div style={s.settingInfo}>
                    <span style={{ ...s.settingLabel, color: "#dc2626" }}>Delete Account</span>
                    <span style={s.settingDesc}>Permanently delete your account and all associated data</span>
                  </div>
                  <button onClick={handleDelete} style={s.deleteBtn}>
                    Delete Account
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── Footer actions ── */}
          <div style={s.footer}>
            <button onClick={handleSave} style={s.saveBtn}>
              💾 Save Changes
            </button>
            <button onClick={() => navigate("/dashboard")} style={s.cancelBtn}>
              Cancel
            </button>
          </div>
        </main>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ ...s.toast, background: toast.color }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ─── Section wrapper ─── */
function Section({ title, subtitle, children }) {
  return (
    <div style={s.section}>
      <div style={s.sectionHeader}>
        <h3 style={s.sectionTitle}>{title}</h3>
        <p style={s.sectionSubtitle}>{subtitle}</p>
      </div>
      <div style={s.sectionBody}>{children}</div>
    </div>
  );
}

/* ─── Styles ─── */
const s = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    padding: "32px 24px",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    maxWidth: 1000,
    margin: "0 auto 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  pageTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    color: "#0f172a",
  },
  pageSubtitle: {
    margin: "4px 0 0",
    fontSize: 14,
    color: "#64748b",
  },
  backBtn: {
    padding: "10px 20px",
    background: "white",
    border: "1.5px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    color: "#1e3a6e",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  layout: {
    maxWidth: 1000,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: 24,
    alignItems: "start",
  },

  // Sidebar
  sidebar: {
    background: "white",
    borderRadius: 16,
    padding: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  tabBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    border: "none",
    borderRadius: 10,
    background: "transparent",
    color: "#475569",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    fontFamily: "inherit",
    transition: "background 0.15s, color 0.15s",
  },
  tabBtnActive: {
    background: "rgba(30,58,110,0.08)",
    color: "#1e3a6e",
  },
  tabIcon: { fontSize: 16 },
  tabIndicator: {
    position: "absolute",
    right: 12,
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#1e3a6e",
  },

  // Panel
  panel: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  // Section
  section: {
    background: "white",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  sectionHeader: {
    padding: "20px 24px 16px",
    borderBottom: "1px solid #f1f5f9",
  },
  sectionTitle: {
    margin: 0,
    fontSize: 17,
    fontWeight: 700,
    color: "#0f172a",
  },
  sectionSubtitle: {
    margin: "4px 0 0",
    fontSize: 13,
    color: "#94a3b8",
  },
  sectionBody: {
    padding: "4px 0",
  },

  // Setting Row
  settingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    padding: "16px 24px",
    borderBottom: "1px solid #f8fafc",
    transition: "background 0.15s",
  },
  settingInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a",
  },
  settingDesc: {
    fontSize: 13,
    color: "#94a3b8",
    lineHeight: 1.5,
  },

  // Toggle
  toggle: { cursor: "pointer" },
  track: {
    width: 46,
    height: 26,
    borderRadius: 13,
    position: "relative",
    transition: "background 0.2s",
    flexShrink: 0,
  },
  thumb: {
    position: "absolute",
    top: 2,
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "white",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
    transition: "transform 0.2s",
  },

  // Select
  select: {
    padding: "9px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 14,
    color: "#0f172a",
    background: "#f8fafc",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: 500,
    minWidth: 180,
    outline: "none",
  },

  // Action button
  actionBtn: {
    padding: "9px 20px",
    border: "1.5px solid #cbd5e1",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  outlineBtn: {
    background: "white",
    color: "#1e3a6e",
    border: "1.5px solid #cbd5e1",
  },

  // Danger zone
  dangerZone: {
    background: "white",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    border: "1.5px solid #fecaca",
  },
  dangerHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "18px 24px",
    background: "#fff5f5",
    borderBottom: "1px solid #fecaca",
  },
  dangerIcon: { fontSize: 22 },
  dangerTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
    color: "#dc2626",
  },
  dangerDesc: {
    margin: "2px 0 0",
    fontSize: 13,
    color: "#ef4444",
  },
  dangerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    padding: "16px 24px",
  },
  deleteBtn: {
    padding: "9px 20px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  // Footer
  footer: {
    display: "flex",
    gap: 12,
    paddingTop: 4,
  },
  saveBtn: {
    padding: "12px 28px",
    background: "linear-gradient(135deg, #1e3a6e 0%, #2c4a7c 100%)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 12px rgba(30,58,110,0.25)",
  },
  cancelBtn: {
    padding: "12px 24px",
    background: "white",
    color: "#475569",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },

  // Toast
  toast: {
    position: "fixed",
    bottom: 28,
    right: 28,
    color: "white",
    padding: "14px 24px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    zIndex: 999,
    animation: "slideUp 0.3s ease",
  },
};

export default Settings;
