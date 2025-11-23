class User {
  constructor({
    _id,
    userName,
    email,
    regNumber,
    role,
    profileImage,
    createdAt,
    updatedAt,
  }) {
    this.id = _id;
    this.userName = userName;
    this.email = email;
    this.regNumber = regNumber;
    this.role = role;
    this.profileImage = profileImage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isHost() {
    return this.role === "HOST";
  }

  isAdmin() {
    return this.role === "ADMIN";
  }

  promoteToHost() {
    this.role = "HOST";
  }

  promoteToAdmin() {
    this.role = "ADMIN";
  }
}

module.exports = User;
