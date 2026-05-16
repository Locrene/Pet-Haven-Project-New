import { useEffect, useState } from "react";
import PetService from "../services/PetService";
import AuthService from "../services/AuthService";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
} from "recharts";

function Dashboard() {
  const [available, setAvailable] = useState(0);
  const [missing, setMissing] = useState(0);
  const [adopted, setAdopted] = useState(0);
  const [userName, setUserName] = useState("");
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [lineData, setLineData] = useState([]);

  const currentUser = AuthService.getCurrentUser();

  const isAdmin =
    currentUser?.role === "ADMIN" ||
    currentUser?.email?.endsWith("@pawhaven.ph");

  const loadDashboard = () => {
    const pets = PetService.getAllPets();

    setAvailable(pets.filter((p) => p.status === "available").length);
    setMissing(pets.filter((p) => p.status === "missing").length);
    setAdopted(pets.filter((p) => p.status === "adopted").length);

    setUserName(currentUser ? currentUser.firstName : "");

    fetch("http://localhost:8080/api/adoption-requests")
      .then((res) => res.json())
      .then((data) => {
        const requests = Array.isArray(data) ? data : [];
        setAdoptionRequests(requests);

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const trend = days.map((day) => ({
          day,
          adoptions: 0,
        }));

        requests
          .filter((request) => request.status === "Accepted")
          .forEach((request) => {
            const date = request.createdAt
              ? new Date(request.createdAt)
              : new Date();

            const dayName = days[date.getDay()];
            const index = trend.findIndex((item) => item.day === dayName);

            if (index !== -1) {
              trend[index].adoptions += 1;
            }
          });

        setLineData(trend);
      })
      .catch(() => {
        setAdoptionRequests([]);
        setLineData([]);
      });
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const updateAdoptionStatus = async (id, status) => {
    const res = await fetch(
      `http://localhost:8080/api/adoption-requests/${id}/status?status=${status}`,
      {
        method: "PUT",
      }
    );

    if (res.ok) {
      alert(`Adoption request ${status}`);
      loadDashboard();
    } else {
      alert("Failed to update adoption request.");
    }
  };

  const totalPets = available + missing + adopted;

  const statCards = [
    {
      title: "Pets Available",
      value: available,
      subtitle: "Available for adoption",
      accent: "#1e3a6e",
      icon: "🐾",
    },
    {
      title: "Missing Pets",
      value: missing,
      subtitle: "Reported missing pets",
      accent: "#64748b",
      icon: "🔍",
    },
    {
      title: "Adopted Pets",
      value: adopted,
      subtitle: "Successfully adopted",
      accent: "#2563eb",
      icon: "✅",
    },
  ];

  const pieData = [
    { name: "Available", value: available, color: "#1e3a6e" },
    { name: "Adopted", value: adopted, color: "#10b981" },
    { name: "Missing", value: missing, color: "#f97316" },
  ];

  const pendingRequests = adoptionRequests.filter(
    (request) => request.status === "Pending"
  );

  const quickActions = [
    {
      title: "List a Pet for Adoption",
      description:
        "Create a new adoption listing and share it with trusted families.",
      button: "List Pet",
      color: "#1e3a6e",
      icon: "🐶",
    },
    {
      title: "Report Missing Pet",
      description:
        "Submit a missing report so the PawHaven community can help.",
      button: "Report Now",
      color: "#f97316",
      icon: "⚠️",
    },
    {
      title: "View All Messages",
      description:
        "Browse conversation threads from adopters and pet seekers.",
      button: "Open Messages",
      color: "#0f766e",
      icon: "💬",
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <div className="dashboard-title">
            <h1>Welcome back, {userName || "User"} 👋</h1>
            <p>Here's what's happening on PawHaven today.</p>
          </div>
        </div>

        <div className="dashboard-stats">
          {statCards.map((card) => (
            <div className="stat-card" key={card.title}>
              <div className="stat-card-head">
                <div
                  className="stat-icon"
                  style={{ background: `${card.accent}1a` }}
                >
                  {card.icon}
                </div>
                <p>{card.title}</p>
              </div>

              <h3>{card.value}</h3>

              <div className="stat-footer">
                <span className="stat-badge">{card.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-charts">
          <section className="chart-card chart-large">
            <div className="card-header">
              <div>
                <h3>Adoption Trend</h3>
                <p>Accepted adoption requests per day.</p>
              </div>
            </div>

            <div className="chart-area">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart
                  data={lineData}
                  margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="adoptionGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#1e3a6e"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor="#1e3a6e"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#e8ecf4"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="adoptions"
                    stroke="#1e3a6e"
                    strokeWidth={3}
                    fill="url(#adoptionGradient)"
                    fillOpacity={0.8}
                    dot={{ r: 4, fill: "#f97316" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="chart-card chart-small">
            <div className="card-header">
              <div>
                <h3>Pet Status</h3>
                <p>Current distribution of all pets.</p>
              </div>
            </div>

            <div className="donut-chart-wrapper">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={72}
                    outerRadius={110}
                    paddingAngle={4}
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="donut-center-label">
                <span>Total Pets</span>
                <strong>{totalPets}</strong>
              </div>
            </div>

            <div className="donut-legend">
              {pieData.map((item) => (
                <div className="legend-item" key={item.name}>
                  <span
                    className="legend-dot"
                    style={{ background: item.color }}
                  ></span>
                  <span>{item.name}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="dashboard-bottom">
          <section className="activity-card">
            <div className="activity-card-header">
              <div>
                <h3>Recent Activity</h3>
                <p>Latest adoption requests from users</p>
              </div>
            </div>

            <div className="activity-list">
              {pendingRequests.length === 0 ? (
                <div className="empty-state">
                  <h3>No pending adoption requests</h3>
                  <p>New requests will appear here.</p>
                </div>
              ) : (
                pendingRequests.map((request) => (
                  <div className="activity-item" key={request.id}>
                    <span className="activity-dot">🟠</span>

                    <p>
                      <strong>{request.requesterName}</strong> requested to
                      adopt <strong>{request.petName}</strong>
                    </p>

                    {isAdmin ? (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          className="btn btn-primary"
                          style={{ minWidth: "90px", padding: "10px" }}
                          onClick={() =>
                            updateAdoptionStatus(request.id, "Accepted")
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="btn btn-outline"
                          style={{ minWidth: "90px", padding: "10px" }}
                          onClick={() =>
                            updateAdoptionStatus(request.id, "Declined")
                          }
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="activity-time">Pending review</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="quick-actions">
            {quickActions.map((action) => (
              <div
                className="action-card"
                key={action.title}
                style={{ background: `${action.color}14` }}
              >
                <div className="action-card-head">
                  <span
                    className="action-card-icon"
                    style={{
                      background: `${action.color}1a`,
                      color: action.color,
                    }}
                  >
                    {action.icon}
                  </span>

                  <div>
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                </div>

                <button
                  className="btn action-button"
                  style={{
                    background: action.color,
                    borderColor: action.color,
                  }}
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

export default Dashboard;