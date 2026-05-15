import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [greeting, setGreeting] = useState("Good morning");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  const token = localStorage.getItem("pawhavenToken");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("pawhavenCurrentUser") || "{}");

    if (!user || user.userType !== "Admin") {
      navigate("/dashboard");
      return;
    }

    setAdminName(user.firstName || "Admin");

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    fetchUsers();
  }, [navigate]);

  const fetchUsers = () => {
    const token = localStorage.getItem("pawhavenToken");
    fetch("http://localhost:8080/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // Spring Boot returns an array directly
        setUsers(Array.isArray(data) ? data : data.users || []);
        setLoadingUsers(false);
      })
      .catch(() => setLoadingUsers(false));
  };

  const handleVerify = async (userId, currentStatus) => {
    setVerifyingId(userId);
    const action = currentStatus ? "unverify" : "verify";
    try {
      const res = await fetch(`http://localhost:8080/api/admin/users/${userId}/${action}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        // Update the user in local state
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId ? { ...u, verificationStatus: !currentStatus } : u
          )
        );
      } else {
        alert("Failed to update verification status.");
      }
    } catch {
      alert("Could not connect to server.");
    } finally {
      setVerifyingId(null);
    }
  };

  const statCards = [
    { title: "Total Users", value: users.length, icon: "👥", color: "#1e3a6e", bg: "rgba(59,130,246,0.08)", border: "#3b82f6" },
    { title: "Verified Users", value: users.filter(u => u.verificationStatus === true).length, icon: "✅", color: "#065f46", bg: "rgba(16,185,129,0.08)", border: "#10b981" },
    { title: "Unverified Users", value: users.filter(u => !u.verificationStatus).length, icon: "⏳", color: "#92400e", bg: "rgba(249,115,22,0.08)", border: "#f97316" },
    { title: "Admins", value: users.filter(u => u.role === "ADMIN").length, icon: "🔧", color: "#4c1d95", bg: "rgba(139,92,246,0.08)", border: "#8b5cf6" },
  ];

  const roleColors = {
    ADMIN: { bg: "#fee2e2", color: "#991b1b" },
    USER:  { bg: "#dbeafe", color: "#1e40af" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.main}>

        {/* Banner */}
        <div style={styles.banner}>
          <div>
            <p style={styles.bannerGreeting}>{greeting} 👋</p>
            <h1 style={styles.bannerTitle}>
              Welcome, <span style={{ color: "#f97316" }}>Admin {adminName}</span>
            </h1>
            <p style={styles.bannerSub}>You have full control over the PawHaven system.</p>
          </div>
          <div style={styles.adminBadge}>🔧 System Administrator</div>
        </div>

        {/* Stat Cards */}
        <div style={styles.statsGrid}>
          {statCards.map((card) => (
            <div key={card.title} style={{ ...styles.statCard, borderTop: `4px solid ${card.border}` }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <div style={styles.statHead}>
                <div style={{ ...styles.statIcon, background: card.bg }}>{card.icon}</div>
                <p style={styles.statLabel}>{card.title}</p>
              </div>
              <h3 style={{ ...styles.statValue, color: card.color }}>{card.value}</h3>
            </div>
          ))}
        </div>

        {/* Users Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <div>
              <h3 style={styles.cardTitle}>Registered Users</h3>
              <p style={styles.cardSub}>All accounts in the system</p>
            </div>
            <button onClick={fetchUsers} style={styles.refreshBtn}>🔄 Refresh</button>
          </div>

          {loadingUsers ? (
            <p style={{ color: "#94a3b8", padding: "20px 0" }}>Loading users...</p>
          ) : users.length === 0 ? (
            <p style={{ color: "#94a3b8", padding: "20px 0" }}>No users found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {["ID", "Name", "Email", "Role", "Verification", "Joined", "Action"].map((h) => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => {
                    const isVerified = u.verificationStatus === true;
                    const roleBadge = roleColors[u.role] || roleColors.USER;
                    const isLoading = verifyingId === u.id;
                    return (
                      <tr key={u.id} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                        <td style={styles.td}>{u.id}</td>
                        <td style={styles.td}>{u.firstName} {u.lastName}</td>
                        <td style={styles.td}>{u.email}</td>
                        <td style={styles.td}>
                          <span style={{ ...styles.badge, background: roleBadge.bg, color: roleBadge.color }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={styles.td}>
                          <span style={{
                            ...styles.badge,
                            background: isVerified ? "#dcfce7" : "#fef9c3",
                            color: isVerified ? "#166534" : "#854d0e"
                          }}>
                            {isVerified ? "✅ Verified" : "⏳ Pending"}
                          </span>
                        </td>
                        <td style={styles.td}>
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                        </td>
                        <td style={styles.td}>
                          <button
                            onClick={() => handleVerify(u.id, isVerified)}
                            disabled={isLoading}
                            style={{
                              ...styles.verifyBtn,
                              background: isVerified ? "#fee2e2" : "#dcfce7",
                              color: isVerified ? "#991b1b" : "#166534",
                              border: `1px solid ${isVerified ? "#fca5a5" : "#86efac"}`,
                              opacity: isLoading ? 0.6 : 1,
                              cursor: isLoading ? "not-allowed" : "pointer",
                            }}
                          >
                            {isLoading ? "..." : isVerified ? "Unverify" : "Verify"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f4f6fb", padding: "32px 24px" },
  main: { maxWidth: 1140, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 },
  banner: { background: "linear-gradient(135deg, #1e3a6e 0%, #0f2546 100%)", borderRadius: 20, padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, boxShadow: "0 8px 24px rgba(30,58,110,0.2)" },
  bannerGreeting: { margin: 0, fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 600 },
  bannerTitle: { margin: "6px 0 4px", fontSize: 28, fontWeight: 800, color: "white" },
  bannerSub: { margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)" },
  adminBadge: { background: "rgba(249,115,22,0.2)", color: "#fed7aa", padding: "10px 20px", borderRadius: 30, fontSize: 13, fontWeight: 700, border: "1px solid rgba(249,115,22,0.4)", whiteSpace: "nowrap" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 },
  statCard: { background: "white", borderRadius: 16, padding: "22px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "default" },
  statHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
  statIcon: { width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  statLabel: { margin: 0, fontSize: 13, color: "#64748b", fontWeight: 600 },
  statValue: { margin: 0, fontSize: 38, fontWeight: 800, lineHeight: 1 },
  tableCard: { background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  cardTitle: { margin: 0, fontSize: 18, fontWeight: 700, color: "#0f172a" },
  cardSub: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
  refreshBtn: { background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#475569" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: { textAlign: "left", padding: "12px 16px", background: "#f8fafc", color: "#64748b", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #e2e8f0" },
  td: { padding: "14px 16px", color: "#0f172a", borderBottom: "1px solid #f0f2f7" },
  badge: { padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  verifyBtn: { padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, transition: "opacity 0.2s" },
};

export default AdminDashboard;