class AuthService {
  constructor() {
    this.currentUser = null;
  }

  // Simulate login - in a real app, this would call an API
  login(username, password) {
    // For demo purposes, accept any non-empty credentials
    if (username && password) {
      this.currentUser = {
        id: 1,
        firstName: username,
        email: `${username}@example.com`
      };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  // Get current user from localStorage
  getCurrentUser() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return this.currentUser;
  }

  // Logout
  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser();
  }
}

const authService = new AuthService();
export default authService;