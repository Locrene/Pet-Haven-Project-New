import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdoptionFeed from "./pages/AdoptionFeed";
import Landing2 from "./pages/Landing2";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/adoption"
          element={isLoggedIn ? <AdoptionFeed /> : <Navigate to="/login" />}
        />

        {/* OPTIONAL: REDIRECT UNKNOWN ROUTES */}
        <Route path="*" element={<Navigate to="/" />} />


        <Route path="/landing2" element={<Landing2 />} />

      </Routes>
    </Router>
  );
}

export default App;