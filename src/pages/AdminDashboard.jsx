import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [greeting, setGreeting] = useState("Good morning");
  const [users, setUsers] = useState([]);
  const [missingReports, setMissingReports] = useState([]);

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
    fetchMissingReports();
  }, [navigate]);

  const fetchUsers = () => {
    fetch("http://localhost:8080/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data) ? data : data.users || []))
      .catch(() => setUsers([]));
  };

  const fetchMissingReports = () => {
    fetch("http://localhost:8080/api/missing-pets/pending")
      .then((res) => res.json())
      .then((data) => setMissingReports(Array.isArray(data) ? data : []))
      .catch(() => setMissingReports([]));
  };

  const updateMissingStatus = async (id, status) => {
    const res = await fetch(
      `http://localhost:8080/api/missing-pets/${id}/status?status=${status}`,
      {
        method: "PUT",
      }
    );

    if (res.ok) {
      alert(`Missing pet report ${status}`);
      fetchMissingReports();
    } else {
      alert("Failed to update report.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.main}>
        <div style={styles.banner}>
          <div>
            <p style={styles.bannerGreeting}>{greeting} 👋</p>
            <h1 style={styles.bannerTitle}>
              Welcome, <span style={{ color: "#f97316" }}>Admin {adminName}</span>
            </h1>
            <p style={styles.bannerSub}>
              You have full control over the PawHaven system.
            </p>
          </div>
          <div style={styles.adminBadge}>🔧 System Administrator</div>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>Total Users</p>
            <h3 style={styles.statValue}>{users.length}</h3>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>Pending Missing Reports</p>
            <h3 style={styles.statValue}>{missingReports.length}</h3>
          </div>
        </div>

        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <div>
              <h3 style={styles.cardTitle}>Pending Missing Pet Reports</h3>
              <p style={styles.cardSub}>
                Review user-submitted missing pet reports.
              </p>
            </div>

            <button onClick={fetchMissingReports} style={styles.refreshBtn}>
              🔄 Refresh
            </button>
          </div>

          {missingReports.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No pending missing pet reports.</p>
          ) : (
            <div style={styles.reportGrid}>
              {missingReports.map((report) => (
                <div key={report.id} style={styles.reportCard}>
                  <img
                    src={report.image || "/images/default.jpg"}
                    alt={report.petName}
                    style={styles.reportImage}
                  />

                  <div style={styles.reportBody}>
                    <h3>{report.petName}</h3>
                    <p><strong>Breed:</strong> {report.breed}</p>
                    <p><strong>Age:</strong> {report.age || "Unknown"}</p>
                    <p><strong>Last Seen:</strong> {report.location}</p>
                    <p><strong>Status:</strong> {report.petStatus}</p>
                    <p><strong>Reporter:</strong> {report.reporterName}</p>
                    <p><strong>Email:</strong> {report.reporterEmail}</p>
                    <p>{report.description}</p>

                    <div style={styles.actions}>
                      <button
                        style={styles.acceptBtn}
                        onClick={() => updateMissingStatus(report.id, "Accepted")}
                      >
                        Accept
                      </button>

                      <button
                        style={styles.declineBtn}
                        onClick={() => updateMissingStatus(report.id, "Declined")}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <div>
              <h3 style={styles.cardTitle}>Registered Users</h3>
              <p style={styles.cardSub}>All accounts in the system</p>
            </div>

            <button onClick={fetchUsers} style={styles.refreshBtn}>
              🔄 Refresh
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["ID", "Name", "Email", "Role", "Verification"].map((h) => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={styles.td}>{u.id}</td>
                    <td style={styles.td}>{u.firstName} {u.lastName}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>{u.role}</td>
                    <td style={styles.td}>
                      {u.verificationStatus ? "Verified" : "Pending"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f4f6fb", padding: "32px 24px" },
  main: { maxWidth: 1140, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 },
  banner: { background: "linear-gradient(135deg, #1e3a6e 0%, #0f2546 100%)", borderRadius: 20, padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 },
  bannerGreeting: { margin: 0, fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 600 },
  bannerTitle: { margin: "6px 0 4px", fontSize: 28, fontWeight: 800, color: "white" },
  bannerSub: { margin: 0, fontSize: 14, color: "rgba(255,255,255,0.65)" },
  adminBadge: { background: "rgba(249,115,22,0.2)", color: "#fed7aa", padding: "10px 20px", borderRadius: 30, fontSize: 13, fontWeight: 700 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 },
  statCard: { background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  statLabel: { margin: 0, color: "#64748b", fontWeight: 600 },
  statValue: { margin: "12px 0 0", fontSize: 38, color: "#1e3a6e" },
  tableCard: { background: "white", borderRadius: 16, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  cardTitle: { margin: 0, fontSize: 20, color: "#0f172a" },
  cardSub: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
  refreshBtn: { background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 16px", cursor: "pointer" },
  reportGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
  reportCard: { border: "1px solid #e2e8f0", borderRadius: 16, overflow: "hidden", background: "#f8fafc" },
  reportImage: { width: "100%", height: 220, objectFit: "cover" },
  reportBody: { padding: 18, color: "#0f172a", lineHeight: 1.7 },
  actions: { display: "flex", gap: 12, marginTop: 16 },
  acceptBtn: { flex: 1, background: "#16a34a", color: "white", border: "none", padding: 12, borderRadius: 10, cursor: "pointer", fontWeight: 700 },
  declineBtn: { flex: 1, background: "#dc2626", color: "white", border: "none", padding: 12, borderRadius: 10, cursor: "pointer", fontWeight: 700 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: { textAlign: "left", padding: "12px 16px", background: "#f8fafc", color: "#64748b" },
  td: { padding: "14px 16px", borderBottom: "1px solid #f0f2f7" },
};

export default AdminDashboard;