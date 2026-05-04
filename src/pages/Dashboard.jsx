import { useEffect, useState } from "react";
import PetService from "../services/PetService";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const [available, setAvailable] = useState(0);
  const [missing, setMissing] = useState(0);
  const [adopted, setAdopted] = useState(0);


  //displays the total data
  useEffect(() => {
    const data = PetService.getAllPets();
    setAvailable(data.filter(p => p.status === "available").length);
    setMissing(data.filter(p => p.status === "missing").length);
    setAdopted(data.filter(p => p.status === "adopted").length);
  }, []);

  const lineData = [
    { day: "Mon", value: 2 },
    { day: "Tue", value: 4 },
    { day: "Wed", value: 3 },
    { day: "Thu", value: 6 },
    { day: "Fri", value: 8 },
    { day: "Sat", value: 7 },
    { day: "Sun", value: 3 },
  ];

  const pieData = [
    { name: "Available", value: available },
    { name: "Missing", value: missing },
    { name: "Adopted", value: adopted },
  ];

  const COLORS = ["#0b2c4d", "#4f83cc", "#7fb3ff"];

  return (
    <div className="main-content">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Analytics Dashboard</h2>
      </div>

      {/* STATS */}
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
          <p>Adopted Pets</p>
        </div>
      </div>

      {/* Charts */}
      <div className="dashboard-row">

        {/* line*/}
        <div className="dashboard-box large">
          <h3>Adoption Overview</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0b2c4d"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pie */}
        <div className="dashboard-box large">
          <h3>Pet Status Distribution</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;