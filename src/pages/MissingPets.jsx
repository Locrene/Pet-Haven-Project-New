import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";

function MissingPets() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const currentUser = AuthService.getCurrentUser();

  const [form, setForm] = useState({
    petName: "",
    breed: "",
    age: "",
    location: "",
    description: "",
    image: "",
    petStatus: "Missing",
  });

  const loadReports = async () => {
    const res = await fetch("http://localhost:8080/api/missing-pets");
    const data = await res.json();

    const visibleReports = data.filter(
      (report) =>
        report.status === "Accepted" ||
        report.reporterEmail === currentUser?.email
    );

    setReports(visibleReports);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openAddForm = () => {
    setEditingReport(null);
    setForm({
      petName: "",
      breed: "",
      age: "",
      location: "",
      description: "",
      image: "",
      petStatus: "Missing",
    });
    setShowForm(true);
  };

  const openEditForm = (report) => {
    setEditingReport(report);
    setForm({
      petName: report.petName,
      breed: report.breed,
      age: report.age,
      location: report.location,
      description: report.description,
      image: report.image,
      petStatus: report.petStatus || "Missing",
    });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.petName || !form.breed || !form.location || !form.description) {
      alert("Please complete all required fields.");
      return;
    }

    if (!currentUser) {
      alert("Please login first.");
      return;
    }

    const payload = {
      ...form,
      image: form.image || "/images/default.jpg",
      reporterName: `${currentUser.firstName} ${currentUser.lastName}`,
      reporterEmail: currentUser.email,
    };

    const url = editingReport
      ? `http://localhost:8080/api/missing-pets/${editingReport.id}`
      : "http://localhost:8080/api/missing-pets";

    const method = editingReport ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert(
        editingReport
          ? "Missing pet report updated!"
          : "Missing pet report submitted for admin review!"
      );

      setShowForm(false);
      setEditingReport(null);
      loadReports();
    } else {
      alert("Something went wrong.");
    }
  };

  const messageReporter = async (report) => {
    if (!currentUser) {
      alert("Please login first.");
      return;
    }

    await fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: report.reporterName,
        subject: `Message about missing pet ${report.petName}`,
        preview: `Hi, I saw your missing pet report for ${report.petName}.`,
        lastSeen: "Just now",
        messages: [
          {
            sender: `${currentUser.firstName} ${currentUser.lastName}`,
            text: `Hi, I saw your missing pet report for ${report.petName}.`,
            type: "incoming",
          },
        ],
      }),
    });

    alert("Message thread created!");
  };

  const filteredReports = reports.filter(
    (report) =>
      report.petName.toLowerCase().includes(search.toLowerCase()) ||
      report.location.toLowerCase().includes(search.toLowerCase()) ||
      report.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="adoption-feed-page">
      <div className="adoption-feed-container">
        <div className="adoption-feed-header">
          <div className="feed-header-top">
            <h1 className="feed-page-title">Missing Pets</h1>
            <p className="feed-page-subtitle">
              Track and reunite lost pets across the community.
            </p>
          </div>

          <div className="feed-header-controls">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search missing pets by name, breed, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={openAddForm}>
                + Report Missing
              </button>
            </div>
          </div>
        </div>

        <div className="adoption-feed-grid">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => {
              const isOwner = report.reporterEmail === currentUser?.email;

              return (
                <div className="pet-card" key={report.id}>
                  <img
                    src={report.image || "/images/default.jpg"}
                    alt={report.petName}
                    className="pet-card-image"
                  />

                  <div className="pet-card-body">
                    <h3>{report.petName}</h3>
                    <p>{report.breed}</p>
                    <p>{report.location}</p>
                    <p>Status: {report.petStatus}</p>
                    <p>Reported by: {report.reporterName}</p>

                    {report.status === "Pending" && isOwner && (
                      <p style={{ color: "#d97706" }}>
                        Waiting for admin approval
                      </p>
                    )}

                    {isOwner ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => openEditForm(report)}
                      >
                        Edit Report
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => messageReporter(report)}
                      >
                        Message Reporter
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <h3>No missing pets found</h3>
              <p>Use the report button to help reunite pets with owners.</p>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="modal-close" onClick={() => setShowForm(false)}>
              ×
            </button>

            <h2>{editingReport ? "Edit Missing Pet" : "Report Missing Pet"}</h2>

            <input
              name="petName"
              placeholder="Pet name"
              value={form.petName}
              onChange={handleChange}
            />

            <input
              name="breed"
              placeholder="Breed"
              value={form.breed}
              onChange={handleChange}
            />

            <input
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />

            <input
              name="location"
              placeholder="Last seen location"
              value={form.location}
              onChange={handleChange}
            />

            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
            />

            <select
              name="petStatus"
              value={form.petStatus}
              onChange={handleChange}
            >
              <option value="Missing">Still Missing</option>
              <option value="Found">Found</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <button className="btn btn-primary" onClick={handleSubmit}>
              {editingReport ? "Save Changes" : "Submit Report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MissingPets;