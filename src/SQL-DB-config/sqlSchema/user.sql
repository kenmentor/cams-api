CREATE TABLE users (
  id VARCHAR(24) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  userName VARCHAR(255) NOT NULL,
  regNumber INT,
  lastLogin DATETIME DEFAULT CURRENT_TIMESTAMP,
  verifiedEmail BOOLEAN DEFAULT FALSE,
  role VARCHAR(50) DEFAULT 'USER',
  rank INT DEFAULT 1,
  profileImage TEXT,
  forgottonPasswordToken TEXT,
  forgottonPasswordTokenExpireAt DATETIME,
  verifyToken TEXT,
  verificationTokenExpireAt DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
