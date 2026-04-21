import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Landing2 from "./pages/Landing2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdoptionFeed from "./pages/AdoptionFeed";
import MissingPets from "./pages/MissingPets";
import PetProfile from "./pages/PetProfile";
import Messages from "./pages/Messages";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Landing2
              isLoggedIn={isLoggedIn}
              userName={userName}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserName}
            />
          }
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/adoption"
          element={isLoggedIn ? <AdoptionFeed /> : <Navigate to="/login" />}
        />

        <Route
          path="/missing"
          element={isLoggedIn ? <MissingPets /> : <Navigate to="/login" />}
        />

        <Route
          path="/pet"
          element={isLoggedIn ? <PetProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="/messages"
          element={isLoggedIn ? <Messages /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;