class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;