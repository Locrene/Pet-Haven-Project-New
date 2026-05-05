import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Landing2 from "./pages/Landing2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdoptionFeed from "./pages/AdoptionFeed";
import MissingPets from "./pages/MissingPets";
import PetProfile from "./pages/PetProfile";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import MyPets from "./pages/MyPets";
import Settings from "./pages/Settings";
import About from "./pages/About";
import AuthService from "./services/AuthService";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("pet-haven-theme") || "light";
  });

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUserName("");
  };

  useEffect(() => {
    // Check if user is logged in on app start
    if (AuthService.isLoggedIn()) {
      const user = AuthService.getCurrentUser();
      setIsLoggedIn(true);
      setUserName(user.firstName);
    }

    const applyTheme = (mode) => {
      document.body.classList.remove("theme-light", "theme-dark");
      document.body.classList.add(`theme-${mode}`);
    };

    const resolvedTheme = theme === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

    applyTheme(resolvedTheme);
    localStorage.setItem("pet-haven-theme", theme);
  }, [theme]);

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

        <Route path="/about" element={<About />} />

        <Route
          path="/pet"
          element={isLoggedIn ? <PetProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="/messages"
          element={isLoggedIn ? <Messages /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        <Route
          path="/my-pets"
          element={isLoggedIn ? <MyPets /> : <Navigate to="/login" />}
        />

        <Route
          path="/settings"
          element={isLoggedIn ? <Settings theme={theme} onThemeChange={setTheme} /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;