import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PetService from "../services/PetService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [pets, setPets] = useState([]);
  const [available, setAvailable] = useState(0);
  const [missing, setMissing] = useState(0);
  const [adopted, setAdopted] = useState(0);

  useEffect(() => {
    const data = PetService.getAllPets();
    setPets(data);

    setAvailable(data.filter(p => p.status === "available").length);
    setMissing(data.filter(p => p.status === "missing").length);
    setAdopted(data.filter(p => p.status === "adopted").length);
  }, []);

  const chartData = [
    { day: "Mon", value: 20 },
    { day: "Tue", value: 40 },
    { day: "Wed", value: 35 },
    { day: "Thu", value: 60 },
    { day: "Fri", value: 80 },
    { day: "Sat", value: 75 },
    { day: "Sun", value: 90 },
  ];

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <div className="header-right">
            <input placeholder="Search pets..." />
            <div className="user-box">👤 Admin</div>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-card">
            <h3>{available}</h3>
            <p>Pets Available</p>
          </div>
          <div className="dashboard-card">
            <h3>{missing}</h3>
            <p>Missing Pets</p>
          </div>
          <div className="dashboard-card">
            <h3>{adopted}</h3>
            <p>Adopted</p>
          </div>
        </div>

        <div className="dashboard-row">

          <div className="dashboard-box large">
            <h3>Adoption Overview</h3>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#0b2c4d" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-box small">
            <h3>Quick Actions</h3>
            <button>+ Post Pet</button>
            <button>⚠ Report Missing</button>
            <button>🔍 Search Pets</button>
            <button>💬 Messages</button>
          </div>

        </div>

        <div className="dashboard-box">
          <h3>Recent Pets</h3>
          <div className="dashboard-pet-grid">
            {pets.map(pet => (
              <div key={pet.id} className="dashboard-pet-card">
                <img
                  src={pet.image}
                  alt={pet.name}
                  onError={(e) => (e.target.src = "/images/default.jpg")}
                />
                <p>{pet.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-box">
          <h3>Notifications</h3>
          <p>📌 New adoption request</p>
          <p>📩 You received a message</p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;