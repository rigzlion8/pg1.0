const mysql = require('mysql2');
const db = require('../config/db');

const WalletSchema = `
  CREATE TABLE IF NOT EXISTS Wallets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users(id)
  )
`;

const TransactionSchema = `
  CREATE TABLE IF NOT EXISTS Transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('credit', 'debit') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
  )
`;

db.query(WalletSchema, (err, result) => {
  if (err) throw err;
  console.log("Wallet table created");
});

db.query(TransactionSchema, (err, result) => {
  if (err) throw err;
  console.log("Transaction table created");
});

module.exports = db;
