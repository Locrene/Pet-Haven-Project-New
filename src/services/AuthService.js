const USERS_KEY = "pawhavenUsers";
const CURRENT_USER_KEY = "pawhavenCurrentUser";
const TOKEN_KEY = "pawhavenToken";

const AuthService = {
  // REGISTER USER
  register(firstName, lastName, email, password) {
    const users = this._getUsers();

    // CHECK IF EMAIL ALREADY EXISTS
    if (users.find((u) => u.email === email)) {
      return {
        success: false,
        message: "Email already registered.",
      };
    }

    // CREATE NEW USER
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

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(users)
    );

    return {
      success: true,
    };
  },

  // LOGIN USER
  login(email, password) {
    const users = this._getUsers();

    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      return false;
    }

    // REMOVE PASSWORD BEFORE SAVING SESSION
    const { password: _pw, ...safeUser } = user;

    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(safeUser)
    );

    localStorage.setItem(
      TOKEN_KEY,
      `mock-token-${user.id}-${Date.now()}`
    );

    return true;
  },

  // LOGOUT USER
  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  },

  // CHECK LOGIN STATUS
  isLoggedIn() {
    return !!localStorage.getItem(
      CURRENT_USER_KEY
    );
  },

  // GET CURRENT USER
  getCurrentUser() {
    const raw = localStorage.getItem(
      CURRENT_USER_KEY
    );

    return raw ? JSON.parse(raw) : null;
  },

  // PRIVATE HELPER
  _getUsers() {
    const raw = localStorage.getItem(
      USERS_KEY
    );

    if (raw) {
      return JSON.parse(raw);
    }

    // DEFAULT USERS
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

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(defaults)
    );

    return defaults;
  },
};

export default AuthService;