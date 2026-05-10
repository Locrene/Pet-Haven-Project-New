import { useEffect, useState } from "react";
import PetService from "../services/PetService";
import AuthService from "../services/AuthService";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const [available, setAvailable] = useState(0);
  const [missing, setMissing] = useState(0);
  const [adopted, setAdopted] = useState(0);
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const data = PetService.getAllPets();
    setAvailable(data.filter((p) => p.status === "available").length);
    setMissing(data.filter((p) => p.status === "missing").length);
    setAdopted(data.filter((p) => p.status === "adopted").length);

    const user = AuthService.getCurrentUser();
    setUserName(user ? user.firstName || user.email?.split("@")[0] : "");

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const totalPets = available + missing + adopted;

  const statCards = [
    {
      title: "Pets Available",
      value: available,
      subtitle: "+2 this week",
      accent: "#1e3a6e",
      borderColor: "#3b82f6",
      bg: "rgba(59,130,246,0.08)",
      icon: "🐾",
      trend: "up",
    },
    {
      title: "Missing Pets",
      value: missing,
      subtitle: "No active reports",
      accent: "#92400e",
      borderColor: "#f97316",
      bg: "rgba(249,115,22,0.08)",
      icon: "🔍",
      trend: "neutral",
    },
    {
      title: "Adopted Pets",
      value: adopted,
      subtitle: "Start your first adoption",
      accent: "#065f46",
      borderColor: "#10b981",
      bg: "rgba(16,185,129,0.08)",
      icon: "✅",
      trend: "up",
    },
    {
      title: "Total Pets",
      value: totalPets,
      subtitle: "All registered pets",
      accent: "#4c1d95",
      borderColor: "#8b5cf6",
      bg: "rgba(139,92,246,0.08)",
      icon: "🏠",
      trend: "neutral",
    },
  ];

  const lineData = [
    { day: "Mon", adoptions: 2 },
    { day: "Tue", adoptions: 5 },
    { day: "Wed", adoptions: 3 },
    { day: "Thu", adoptions: 8 },
    { day: "Fri", adoptions: 4 },
    { day: "Sat", adoptions: 6 },
    { day: "Sun", adoptions: 3 },
  ];

  const pieData = [
    { name: "Available", value: available || 13, color: "#1e3a6e" },
    { name: "Adopted", value: adopted || 0, color: "#10b981" },
    { name: "Missing", value: missing || 0, color: "#f97316" },
  ].filter((d) => d.value > 0);

  const activityItems = [
    { id: 1, dot: "🟠", text: "Luna was listed for adoption", time: "2 hrs ago" },
    { id: 2, dot: "🟢", text: "New user registered", time: "5 hrs ago" },
    { id: 3, dot: "🔵", text: "Max was marked as adopted", time: "Yesterday" },
    { id: 4, dot: "🟠", text: "Missing pet report submitted", time: "2 days ago" },
  ];

  const quickActions = [
    {
      title: "List a Pet",
      description: "Create a new adoption listing for a pet.",
      button: "List Pet",
      color: "#1e3a6e",
      icon: "🐶",
    },
    {
      title: "Report Missing",
      description: "Submit a missing report to the community.",
      button: "Report Now",
      color: "#f97316",
      icon: "⚠️",
    },
    {
      title: "Messages",
      description: "Browse conversation threads from adopters.",
      button: "Open Messages",
      color: "#0f766e",
      icon: "💬",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: "10px 16px",
          boxShadow: "0 8px 24px rgba(15,23,42,0.12)",
          fontSize: 13,
        }}>
          <p style={{ color: "#64748b", margin: "0 0 4px" }}>{label}</p>
          <p style={{ color: "#1e3a6e", fontWeight: 700, margin: 0 }}>
            {payload[0].value} adoptions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.page}>
      <div style={styles.main}>

        {/* ── Welcome Banner ── */}
        <div style={styles.banner}>
          <div>
            <p style={styles.bannerGreeting}>{greeting} 👋</p>
            <h1 style={styles.bannerTitle}>
              Welcome back, <span style={{ color: "#f97316" }}>{userName || "User"}</span>
            </h1>
            <p style={styles.bannerSub}>Here's what's happening on PawHaven today.</p>
          </div>
          <div style={styles.bannerDate}>
            📅 {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div style={styles.statsGrid}>
          {statCards.map((card) => (
            <div
              key={card.title}
              style={{
                ...styles.statCard,
                borderTop: `4px solid ${card.borderColor}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
            >
              <div style={styles.statHead}>
                <div style={{ ...styles.statIcon, background: card.bg }}>
                  {card.icon}
                </div>
                <p style={styles.statLabel}>{card.title}</p>
              </div>
              <h3 style={{ ...styles.statValue, color: card.accent }}>{card.value}</h3>
              <div style={styles.statFooter}>
                <span style={{
                  ...styles.statBadge,
                  background: card.bg,
                  color: card.accent,
                }}>
                  {card.trend === "up" ? "↑ " : card.trend === "down" ? "↓ " : ""}
                  {card.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts Row ── */}
        <div style={styles.chartsRow}>

          {/* Area Chart */}
          <div style={styles.chartCard}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardTitle}>Adoption Trend</h3>
                <p style={styles.cardSub}>Pet adoptions over the last 7 days</p>
              </div>
              <span style={styles.chartBadge}>Last 7 days</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="adoptGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a6e" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#1e3a6e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#f0f2f7" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="adoptions"
                  stroke="#1e3a6e"
                  strokeWidth={3}
                  fill="url(#adoptGrad)"
                  dot={{ r: 5, fill: "#f97316", strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 7, fill: "#f97316" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Chart */}
          <div style={styles.chartCard}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardTitle}>Pet Status</h3>
                <p style={styles.cardSub}>Current distribution of all pets</p>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "1px solid #e2e8f0",
                      fontSize: 13,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={styles.donutCenter}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>Total</span>
                <strong style={{ fontSize: 28, color: "#0f172a", lineHeight: 1.1 }}>{totalPets}</strong>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>pets</span>
              </div>
            </div>
            <div style={styles.legend}>
              {pieData.map((item) => {
                const pct = totalPets > 0 ? Math.round((item.value / totalPets) * 100) : 0;
                return (
                  <div key={item.name} style={styles.legendItem}>
                    <span style={{ ...styles.legendDot, background: item.color }} />
                    <span style={{ color: "#475569", fontSize: 13 }}>{item.name}</span>
                    <span style={{ fontWeight: 700, color: "#0f172a", fontSize: 13, marginLeft: "auto" }}>
                      {item.value} <span style={{ color: "#94a3b8", fontWeight: 400 }}>({pct}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div style={styles.bottomRow}>

          {/* Recent Activity */}
          <div style={styles.activityCard}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.cardTitle}>Recent Activity</h3>
                <p style={styles.cardSub}>Latest actions on the platform</p>
              </div>
            </div>
            <div>
              {activityItems.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.activityItem,
                    borderBottom: i < activityItems.length - 1 ? "1px solid #f0f2f7" : "none",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{item.dot}</span>
                  <p style={styles.activityText}>{item.text}</p>
                  <span style={styles.activityTime}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.quickActionsCol}>
            {quickActions.map((action) => (
              <div
                key={action.title}
                style={{
                  ...styles.actionCard,
                  borderLeft: `4px solid ${action.color}`,
                  background: `${action.color}0d`,
                }}
              >
                <div style={styles.actionHead}>
                  <span style={{ ...styles.actionIcon, background: `${action.color}20`, color: action.color }}>
                    {action.icon}
                  </span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 15, color: "#0f172a", fontWeight: 700 }}>{action.title}</h4>
                    <p style={{ margin: "4px 0 0", fontSize: 13, color: "#64748b", lineHeight: 1.4 }}>{action.description}</p>
                  </div>
                </div>
                <button
                  style={{
                    ...styles.actionBtn,
                    background: action.color,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                >
                  {action.button}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6fb",
    padding: "32px 24px",
  },
  main: {
    maxWidth: 1140,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },

  // Banner
  banner: {
    background: "linear-gradient(135deg, #1e3a6e 0%, #0f2546 100%)",
    borderRadius: 20,
    padding: "32px 36px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    boxShadow: "0 8px 24px rgba(30,58,110,0.2)",
  },
  bannerGreeting: {
    margin: 0,
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  bannerTitle: {
    margin: "6px 0 4px",
    fontSize: 28,
    fontWeight: 800,
    color: "white",
    lineHeight: 1.2,
  },
  bannerSub: {
    margin: 0,
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
  },
  bannerDate: {
    background: "rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.9)",
    padding: "10px 20px",
    borderRadius: 30,
    fontSize: 13,
    fontWeight: 600,
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.15)",
    whiteSpace: "nowrap",
  },

  // Stat Cards
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
  },
  statCard: {
    background: "white",
    borderRadius: 16,
    padding: "22px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  statHead: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  statLabel: {
    margin: 0,
    fontSize: 13,
    color: "#64748b",
    fontWeight: 600,
  },
  statValue: {
    margin: 0,
    fontSize: 38,
    fontWeight: 800,
    lineHeight: 1,
  },
  statFooter: {
    marginTop: 12,
  },
  statBadge: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 20,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 600,
  },

  // Charts
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr",
    gap: 20,
  },
  chartCard: {
    background: "white",
    borderRadius: 16,
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#0f172a",
  },
  cardSub: {
    margin: "4px 0 0",
    fontSize: 13,
    color: "#94a3b8",
  },
  chartBadge: {
    background: "#f0f4f8",
    color: "#475569",
    padding: "5px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  donutCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  legend: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 16,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    background: "#f8fafc",
    borderRadius: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  },

  // Bottom
  bottomRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  activityCard: {
    background: "white",
    borderRadius: 16,
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  activityItem: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto",
    alignItems: "center",
    gap: 14,
    padding: "16px 0",
  },
  activityText: {
    margin: 0,
    fontSize: 14,
    color: "#0f172a",
    fontWeight: 600,
  },
  activityTime: {
    fontSize: 12,
    color: "#94a3b8",
    whiteSpace: "nowrap",
  },

  // Quick Actions
  quickActionsCol: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  actionCard: {
    padding: "18px 20px",
    borderRadius: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  actionHead: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flex: 1,
    minWidth: 0,
  },
  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },
  actionBtn: {
    border: "none",
    color: "white",
    padding: "9px 18px",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transition: "opacity 0.2s",
    fontFamily: "inherit",
  },
};

export default Dashboard;