const USERS_KEY = "pawhavenUsers";
const CURRENT_USER_KEY = "pawhavenCurrentUser";
const TOKEN_KEY = "pawhavenToken";

const AuthService = {
  /** Register a new user and persist to localStorage */
  register(firstName, lastName, email, password) {
    const users = this._getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already registered." };
    }
    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      password,
      userType: "User",
      role: "USER",
      verificationStatus: false,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  },

  /** Log in and store the current session */
  login(email, password) {
    const users = this._getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) return false;
    const { password: _pw, ...safeUser } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
    localStorage.setItem(TOKEN_KEY, `mock-token-${user.id}-${Date.now()}`);
    return true;
  },

  /** Clear the current session */
  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  /** Return true if a session exists */
  isLoggedIn() {
    return !!localStorage.getItem(CURRENT_USER_KEY);
  },

  /** Return the current user object, or null */
  getCurrentUser() {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  // ── Private helpers ──────────────────────────────────────────────────────

  _getUsers() {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);

    // Seed a default admin + demo user on first run
    const defaults = [
      {
        id: 1,
        firstName: "Admin",
        lastName: "PawHaven",
        email: "admin@pawhaven.ph",
        password: "admin123",
        userType: "Admin",
        role: "ADMIN",
        verificationStatus: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        firstName: "Demo",
        lastName: "User",
        email: "demo@pawhaven.ph",
        password: "demo123",
        userType: "User",
        role: "USER",
        verificationStatus: true,
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaults));
    return defaults;
  },
};

export default AuthService;
