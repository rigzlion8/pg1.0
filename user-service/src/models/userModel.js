const mysql = require('mysql2');
const db = require('../config/db');

const UserSchema = `
  CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    id_number VARCHAR(20) NOT NULL,
    dob DATE,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
  )
`;

db.query(UserSchema, (err, result) => {
  if (err) throw err;
  console.log("User table created");
});

module.exports = db;
